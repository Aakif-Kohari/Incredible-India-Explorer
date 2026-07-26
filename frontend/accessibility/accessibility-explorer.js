/**
 * ACCESSIBILITY EXPLORER — DOM WIRING
 * -----------------------------------
 * Deliberately thin: all scoring/filtering/recommendation logic lives in
 * accessibility-engine.js (pure, unit-tested). This file only reads DOM
 * state, calls the engine, and renders results.
 */

(function () {
    "use strict";

    const { getAccessibilityMeta, hasVerifiedData } = window.AccessibilityData;
    const { computeFinalScore, matchesFilters, generateRecommendation } = window.AccessibilityEngine;
    const Storage = window.AccessibilityStorage;

    // Destination list: reuse the same states/UTs already defined in the
    // site's core map dataset (data.js -> mapData.locations) so this
    // feature never falls out of sync with the rest of the app.
    const destinations = (window.mapData && window.mapData.locations) || [];

    let activeReportStateId = null;

    function getPreferences() {
        return Storage.getPreferences();
    }

    function getFiltersFromForm() {
        return {
            wheelchairAccess: document.getElementById("filter-wheelchair-full").checked ? "full" : undefined,
            accessibleParking: document.getElementById("filter-parking").checked,
            accessibleRestrooms: document.getElementById("filter-restrooms").checked,
            stepFreeEntry: document.getElementById("filter-step-free").checked,
            brailleSignage: document.getElementById("filter-braille").checked,
            audioGuide: document.getElementById("filter-audio").checked,
            signLanguageTours: document.getElementById("filter-sign-language").checked,
            minScore: Number(document.getElementById("filter-min-score").value) || 0
        };
    }

    function confidenceBadgeClass(confidence) {
        if (confidence === "community verified") return "badge-verified";
        if (confidence === "limited data") return "badge-limited";
        return "badge-unknown";
    }

    function renderCard(destination) {
        const meta = getAccessibilityMeta(destination.id);
        const reports = Storage.getReports(destination.id);
        const scoreInfo = computeFinalScore(meta, reports, hasVerifiedData(destination.id));
        const prefs = getPreferences();
        const recommendation = generateRecommendation(destination.name, meta, prefs, scoreInfo);

        const card = document.createElement("article");
        card.className = "destination-card";
        card.dataset.stateId = destination.id;

        card.innerHTML = `
            <div class="card-header">
                <h3>${destination.name}</h3>
                <span class="score-badge" title="Accessibility score">${Math.round(scoreInfo.score)}/100</span>
            </div>
            <span class="confidence-badge ${confidenceBadgeClass(scoreInfo.confidence)}">${scoreInfo.confidence}</span>
            <p class="recommendation">${recommendation}</p>
            <div class="card-facts">
                <span>${meta.wheelchairAccess === "full" ? "✅" : meta.wheelchairAccess === "partial" ? "⚠️" : "❌"} Wheelchair: ${meta.wheelchairAccess}</span>
                <span>${meta.accessibleParking ? "✅" : "❌"} Parking</span>
                <span>${meta.accessibleRestrooms ? "✅" : "❌"} Restrooms</span>
                <span>${meta.stepFreeEntry ? "✅" : "❌"} Step-free</span>
                <span>${meta.brailleSignage ? "✅" : "❌"} Braille</span>
                <span>${meta.audioGuide ? "✅" : "❌"} Audio guide</span>
                <span>${meta.signLanguageTours ? "✅" : "❌"} Sign language</span>
            </div>
            <button type="button" class="btn-secondary report-btn">Report accessibility info (${scoreInfo.reportCount} reports)</button>
        `;

        card.querySelector(".report-btn").addEventListener("click", () => openReportModal(destination));

        return { card, score: scoreInfo.score, meta };
    }

    function renderGrid() {
        const grid = document.getElementById("destination-grid");
        const countEl = document.getElementById("results-count");
        grid.innerHTML = "";

        const filters = getFiltersFromForm();
        let shown = 0;

        const rendered = destinations.map(renderCard);

        // Sort by score, descending, so the most accessible destinations
        // for the applied filters surface first.
        rendered.sort((a, b) => b.score - a.score);

        rendered.forEach(({ card, score, meta }) => {
            if (matchesFilters(meta, filters, score)) {
                grid.appendChild(card);
                shown++;
            }
        });

        countEl.textContent = `Showing ${shown} of ${destinations.length} destinations.`;
    }

    function openReportModal(destination) {
        activeReportStateId = destination.id;
        document.getElementById("report-modal-destination").textContent = destination.name;
        document.getElementById("report-modal").hidden = false;
    }

    function closeReportModal() {
        document.getElementById("report-modal").hidden = true;
        document.getElementById("report-form").reset();
        activeReportStateId = null;
    }

    function init() {
        const prefs = getPreferences();
        document.getElementById("need-mobility").checked = Boolean(prefs.mobility);
        document.getElementById("need-visual").checked = Boolean(prefs.visual);
        document.getElementById("need-hearing").checked = Boolean(prefs.hearing);

        document.getElementById("preferences-form").addEventListener("submit", (e) => {
            e.preventDefault();
            Storage.setPreferences({
                mobility: document.getElementById("need-mobility").checked,
                visual: document.getElementById("need-visual").checked,
                hearing: document.getElementById("need-hearing").checked
            });
            renderGrid();
        });

        document.getElementById("filters-form").addEventListener("change", renderGrid);

        const minScoreInput = document.getElementById("filter-min-score");
        const minScoreOutput = document.getElementById("min-score-output");
        minScoreInput.addEventListener("input", () => {
            minScoreOutput.textContent = minScoreInput.value;
        });

        document.getElementById("report-modal-close").addEventListener("click", closeReportModal);

        document.getElementById("report-form").addEventListener("submit", (e) => {
            e.preventDefault();
            if (!activeReportStateId) return;
            try {
                Storage.submitReport(activeReportStateId, {
                    rating: document.getElementById("report-rating").value,
                    category: document.getElementById("report-category").value,
                    comment: document.getElementById("report-comment").value
                });
                closeReportModal();
                renderGrid();
            } catch (err) {
                alert(err.message);
            }
        });

        renderGrid();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

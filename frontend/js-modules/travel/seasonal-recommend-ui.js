// seasonal-recommend-ui.js
// -----------------------------------------------------------------------------
// DOM wiring for the "Best Time to Visit \u2014 Seasonal Planner" section on
// frontend/travel/travel.html. Pure rendering/event-handling only; all
// ranking logic lives in seasonal-recommend-engine.js so it stays unit
// testable without a browser.
// -----------------------------------------------------------------------------

(function () {
  'use strict';

  if (typeof document === 'undefined') return;

  const engine = window.SeasonalRecommendEngine;
  if (!engine) return;

  function init() {
    const root = document.getElementById('seasonal-planner');
    if (!root) return; // section not on this page

    const destinations = window.TRAVEL_DESTINATIONS || [];
    const events = (window.eventData && window.eventData.events) || [];

    const monthChipsEl = document.getElementById('seasonal-month-chips');
    const interestChipsEl = document.getElementById('seasonal-interest-chips');
    const insightsEl = document.getElementById('seasonal-insights');
    const grid = document.getElementById('seasonal-results-grid');
    const metaLine = document.getElementById('seasonal-meta-line');

    if (!monthChipsEl || !grid) return;

    const currentMonth = new Date().getMonth() + 1;
    const state = { month: currentMonth, interests: [] };

    monthChipsEl.innerHTML = engine.MONTH_NAMES.map((name, i) => {
      const m = i + 1;
      return `<button type="button" class="rec-chip${m === state.month ? ' active' : ''}" data-month="${m}">${name}</button>`;
    }).join('');

    const INTERESTS = (window.TravelRecommendEngine && window.TravelRecommendEngine.INTEREST_OPTIONS) || [];
    if (interestChipsEl) {
      interestChipsEl.innerHTML = INTERESTS.map((opt) =>
        `<button type="button" class="rec-chip" data-key="${opt.key}">${opt.icon ? opt.icon + ' ' : ''}${opt.label}</button>`
      ).join('');
    }

    function renderInsights() {
      if (!insightsEl) return;
      const insights = engine.getSeasonalInsights(destinations, state.month, events);
      const festivalNames = insights.festivals.slice(0, 3).map((f) => f.name);
      const festivalLine = festivalNames.length
        ? ` Happening this month: ${festivalNames.join(', ')}.`
        : '';
      insightsEl.textContent =
        `${insights.monthName}: ${insights.peakCount} destinations at peak season, ` +
        `${insights.goodCount} good to visit, ${insights.offSeasonCount} off-season, ` +
        `${insights.avoidCount} best avoided.${festivalLine}`;
    }

    function alternativesMarkup(dest) {
      const alts = engine.getAlternatives(dest, destinations, state.month, 3);
      if (!alts.length) return '<span class="rec-similar-pill rec-similar-empty">No better-suited alternatives found</span>';
      return alts.map((a) => `<span class="rec-similar-pill">${a.name}</span>`).join('');
    }

    function cardMarkup(entry) {
      const { dest, climate } = entry;
      const reason = engine.buildSeasonalReason(entry);
      const festivalBadges = entry.festivals.map((f) => `<span class="rec-similar-pill">\uD83C\uDF89 ${f.name}</span>`).join('');
      const showAlternatives = climate.score <= 1;
      return `
        <div class="destination-card rec-card" data-id="${dest.id}">
          <img class="destination-img" src="${dest.image}" alt="${dest.name}"/>
          <div class="destination-content">
            <span class="destination-tag">${climate.label}</span>
            <h3 class="destination-title">${dest.name}</h3>
            <p class="destination-desc">${dest.description}</p>
            <p class="rec-reason">\uD83D\uDCA1 ${reason}</p>
            ${festivalBadges ? `<div class="rec-similar-panel">${festivalBadges}</div>` : ''}
            ${showAlternatives ? `
              <button type="button" class="rec-similar-toggle" data-alt-for="${dest.id}">See better-timed alternatives \u25be</button>
              <div class="rec-similar-panel" id="alt-${dest.id}" hidden></div>
            ` : ''}
          </div>
          <button aria-label="Save ${dest.name} to My Journey" aria-pressed="false" class="destination-card-bookmark-btn journey-bookmark-btn" data-bookmark-id="${dest.id}" type="button">\u2661</button>
        </div>
      `;
    }

    function wireAlternativeButtons() {
      grid.querySelectorAll('[data-alt-for]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const destId = btn.dataset.altFor;
          const panel = document.getElementById(`alt-${destId}`);
          if (!panel) return;
          const isHidden = panel.hasAttribute('hidden');
          if (isHidden) {
            const dest = destinations.find((d) => d.id === destId);
            panel.innerHTML = alternativesMarkup(dest);
            panel.removeAttribute('hidden');
            btn.textContent = 'Hide alternatives \u25b4';
          } else {
            panel.setAttribute('hidden', '');
            btn.textContent = 'See better-timed alternatives \u25be';
          }
        });
      });
    }

    function render() {
      const results = engine.rankDestinationsForMonth(destinations, state.month, { interests: state.interests }, events);
      grid.innerHTML = results.map(cardMarkup).join('');
      wireAlternativeButtons();
      renderInsights();
      if (metaLine) {
        metaLine.hidden = false;
        metaLine.textContent = `Showing ${results.length} destinations best suited for ${engine.MONTH_NAMES[state.month - 1]}.`;
      }
      document.dispatchEvent(new Event('app:route-changed'));
    }

    monthChipsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.rec-chip');
      if (!btn) return;
      state.month = Number(btn.dataset.month);
      monthChipsEl.querySelectorAll('.rec-chip').forEach((c) => c.classList.toggle('active', c === btn));
      render();
    });

    if (interestChipsEl) {
      interestChipsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.rec-chip');
        if (!btn) return;
        const key = btn.dataset.key;
        const idx = state.interests.indexOf(key);
        if (idx > -1) state.interests.splice(idx, 1);
        else state.interests.push(key);
        btn.classList.toggle('active');
        render();
      });
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

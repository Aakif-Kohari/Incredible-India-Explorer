// awadhi.js — Awadhi Language Explorer logic

(function () {
    function speak(text) {
        if (!("speechSynthesis" in window)) {
            alert("Speech playback isn't supported in this browser.");
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        // Awadhi has no dedicated browser voice; hi-IN is the closest
        // available Devanagari-script approximation.
        utterance.lang = "hi-IN";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = AWADHI_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderGreeting() {
        const g = AWADHI_GREETING;
        document.getElementById("greeting-devanagari").textContent = g.devanagari;
        document.getElementById("greeting-translit").textContent = `(${g.transliteration})`;
        document.getElementById("greeting-meaning").textContent = g.meaning;
        document.getElementById("audio-disclaimer").textContent = g.note;

        document.getElementById("folk-greeting").innerHTML = `
            <span class="folk-greeting-label">Everyday Folk Variant</span>
            <span class="folk-greeting-word">${g.folkVariant.devanagari}</span>
            <span class="folk-greeting-translit">(${g.folkVariant.transliteration})</span>
            <div class="folk-greeting-meaning">${g.folkVariant.meaning}</div>
        `;

        document.getElementById("pronounce-greeting-btn").addEventListener("click", () => {
            speak(g.devanagari);
        });
    }

    function renderScript() {
        document.getElementById("script-intro").textContent = AWADHI_SCRIPT.intro;
        const grid = document.getElementById("script-facts-grid");
        grid.innerHTML = AWADHI_SCRIPT.facts
            .map(
                (f) => `
            <div class="script-fact-item">
                <div class="script-fact-title">${f.title}</div>
                <div class="script-fact-detail">${f.detail}</div>
            </div>`
            )
            .join("");
    }

    function renderWords() {
        const grid = document.getElementById("words-grid");
        if (!grid) return;
        grid.innerHTML = AWADHI_WORDS.map(
            (w, i) => `
            <div class="word-card">
                <div class="word-top-row">
                    <span class="word-devanagari">${w.devanagari}</span>
                    <button class="word-pronounce-btn" data-index="${i}" aria-label="Pronounce ${w.translit}">🔊</button>
                </div>
                <div class="word-translit">${w.translit}</div>
                <div class="word-meaning">${w.meaning}</div>
                <div class="word-note">${w.note}</div>
            </div>`
        ).join("");

        grid.querySelectorAll(".word-pronounce-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const w = AWADHI_WORDS[Number(btn.dataset.index)];
                speak(w.devanagari);
            });
        });
    }

    function renderClassification() {
        const c = AWADHI_CLASSIFICATION;
        document.getElementById("classification-family").textContent = c.family;
        document.getElementById("sibling-langs").innerHTML = c.siblings
            .map((s) => `<span class="sibling-chip">${s}</span>`)
            .join("");
        document.getElementById("classification-note").textContent = c.note;
    }

    function renderRegion() {
        const r = AWADHI_REGION;
        document.getElementById("region-intro").textContent = r.intro;
        document.getElementById("district-chips").innerHTML = r.districts
            .map((d) => `<span class="district-chip">📍 ${d}</span>`)
            .join("");
    }

    function renderLiterature() {
        const grid = document.getElementById("literature-grid");
        if (!grid) return;
        grid.innerHTML = AWADHI_LITERATURE.map(
            (l) => `
            <div class="literature-item">
                <div class="literature-title">📖 ${l.title}</div>
                <div class="literature-period">${l.period}</div>
                <div class="literature-desc">${l.desc}</div>
            </div>`
        ).join("");
    }

    function renderCulture() {
        const grid = document.getElementById("culture-grid");
        if (!grid) return;
        grid.innerHTML = AWADHI_CULTURE.map(
            (c) => `
            <div class="culture-item">
                <div class="culture-title">${c.title}</div>
                <div class="culture-desc">${c.desc}</div>
            </div>`
        ).join("");
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = AWADHI_REFERENCES.map(
            (r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`
        ).join("");
    }

    function init() {
        renderStats();
        renderGreeting();
        renderScript();
        renderWords();
        renderClassification();
        renderRegion();
        renderLiterature();
        renderCulture();
        renderReferences();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
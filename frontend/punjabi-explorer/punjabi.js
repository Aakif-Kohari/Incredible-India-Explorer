// punjabi.js — Punjabi Language Explorer logic

(function () {
    function speak(text) {
        if (!("speechSynthesis" in window)) {
            alert("Speech playback isn't supported in this browser.");
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        // Prefer an installed Punjabi voice if available; otherwise the
        // browser will fall back to its default handling for pa-IN,
        // typically substituting the closest Hindi voice.
        const voices = window.speechSynthesis.getVoices();
        const punjabiVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("pa"));
        utterance.voice = punjabiVoice || null;
        utterance.lang = "pa-IN";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = PUNJABI_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderGreeting() {
        const g = PUNJABI_GREETING;
        document.getElementById("greeting-gurmukhi").textContent = g.gurmukhi;
        document.getElementById("greeting-translit").textContent = `(${g.transliteration})`;
        document.getElementById("greeting-meaning").textContent = g.meaning;
        document.getElementById("audio-disclaimer").textContent = g.note;

        document.getElementById("folk-greeting").innerHTML = `
            <span class="folk-greeting-label">Casual / Everyday Variant</span>
            <span class="folk-greeting-word">${g.folkVariant.gurmukhi}</span>
            <span class="folk-greeting-translit">(${g.folkVariant.transliteration})</span>
            <div class="folk-greeting-meaning">${g.folkVariant.meaning}</div>
        `;

        document.getElementById("pronounce-greeting-btn").addEventListener("click", () => {
            speak(g.gurmukhi);
        });
    }

    function renderScript() {
        document.getElementById("script-intro").textContent = PUNJABI_SCRIPT.intro;
        const grid = document.getElementById("script-facts-grid");
        grid.innerHTML = PUNJABI_SCRIPT.facts
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
        grid.innerHTML = PUNJABI_WORDS.map(
            (w, i) => `
            <div class="word-card">
                <div class="word-top-row">
                    <span class="word-gurmukhi">${w.gurmukhi}</span>
                    <button class="word-pronounce-btn" data-index="${i}" aria-label="Pronounce ${w.translit}">🔊</button>
                </div>
                <div class="word-translit">${w.translit}</div>
                <div class="word-meaning">${w.meaning}</div>
                <div class="word-note">${w.note}</div>
            </div>`
        ).join("");

        grid.querySelectorAll(".word-pronounce-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const w = PUNJABI_WORDS[Number(btn.dataset.index)];
                speak(w.gurmukhi);
            });
        });
    }

    function renderClassification() {
        const c = PUNJABI_CLASSIFICATION;
        document.getElementById("classification-family").textContent = c.family;
        document.getElementById("sibling-langs").innerHTML = c.siblings
            .map((s) => `<span class="sibling-chip">${s}</span>`)
            .join("");
        document.getElementById("classification-note").textContent = c.note;
    }

    function renderRegion() {
        const r = PUNJABI_REGIONS;
        document.getElementById("region-intro").textContent = r.intro;
        document.getElementById("district-chips").innerHTML = r.areas
            .map((a) => `<span class="district-chip">📍 ${a}</span>`)
            .join("");
    }

    function renderCulture() {
        const grid = document.getElementById("culture-grid");
        if (!grid) return;
        grid.innerHTML = PUNJABI_CULTURE.map(
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
        el.innerHTML = PUNJABI_REFERENCES.map(
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
        renderCulture();
        renderReferences();
        // Ensure voice list is populated before first pronunciation attempt
        if ("speechSynthesis" in window) {
            window.speechSynthesis.getVoices();
        }
    }

    document.addEventListener("DOMContentLoaded", init);
})();
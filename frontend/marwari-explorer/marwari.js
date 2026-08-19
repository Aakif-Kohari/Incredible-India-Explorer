// marwari.js — Marwari Language Explorer logic

(function () {
    function speak(text) {
        if (!("speechSynthesis" in window)) {
            alert("Speech playback isn't supported in this browser.");
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        // No dedicated Marwari voice exists in most browsers; prefer an
        // installed Hindi voice as the closest Devanagari-script approximation.
        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("hi"));
        utterance.voice = hindiVoice || null;
        utterance.lang = "hi-IN";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = MARWARI_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderGreeting() {
        const g = MARWARI_GREETING;
        document.getElementById("greeting-deva").textContent = g.deva;
        document.getElementById("greeting-translit").textContent = `(${g.transliteration})`;
        document.getElementById("greeting-meaning").textContent = g.meaning;
        document.getElementById("audio-disclaimer").textContent = g.note;

        document.getElementById("folk-greeting").innerHTML = `
            <span class="folk-greeting-label">Customary Reply</span>
            <span class="folk-greeting-word">${g.folkVariant.deva}</span>
            <span class="folk-greeting-translit">(${g.folkVariant.transliteration})</span>
            <div class="folk-greeting-meaning">${g.folkVariant.meaning}</div>
        `;

        document.getElementById("pronounce-greeting-btn").addEventListener("click", () => {
            speak(g.deva);
        });
    }

    function renderScript() {
        document.getElementById("script-intro").textContent = MARWARI_SCRIPT.intro;
        const grid = document.getElementById("script-facts-grid");
        grid.innerHTML = MARWARI_SCRIPT.facts
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
        grid.innerHTML = MARWARI_WORDS.map(
            (w, i) => `
            <div class="word-card">
                <div class="word-top-row">
                    <span class="word-deva">${w.deva}</span>
                    <button class="word-pronounce-btn" data-index="${i}" aria-label="Pronounce ${w.translit}">🔊</button>
                </div>
                <div class="word-translit">${w.translit}</div>
                <div class="word-meaning">${w.meaning}</div>
                <div class="word-note">${w.note}</div>
            </div>`
        ).join("");

        grid.querySelectorAll(".word-pronounce-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const w = MARWARI_WORDS[Number(btn.dataset.index)];
                speak(w.deva);
            });
        });
    }

    function renderClassification() {
        const c = MARWARI_CLASSIFICATION;
        document.getElementById("classification-family").textContent = c.family;
        document.getElementById("sibling-langs").innerHTML = c.siblings
            .map((s) => `<span class="sibling-chip">${s}</span>`)
            .join("");
        document.getElementById("classification-note").textContent = c.note;
    }

    function renderRegion() {
        const r = MARWARI_REGIONS;
        document.getElementById("region-intro").textContent = r.intro;
        document.getElementById("district-chips").innerHTML = r.areas
            .map((a) => `<span class="district-chip">📍 ${a}</span>`)
            .join("");
    }

    function renderCulture() {
        const grid = document.getElementById("culture-grid");
        if (!grid) return;
        grid.innerHTML = MARWARI_CULTURE.map(
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
        el.innerHTML = MARWARI_REFERENCES.map(
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
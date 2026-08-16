// script.js — Nepali Language Explorer Controller

document.addEventListener('DOMContentLoaded', () => {
    let voices = [];
    let currentSpeakingBtn = null;

    // Load Speech Synthesis Voices
    function loadVoices() {
        if ('speechSynthesis' in window) {
            voices = window.speechSynthesis.getVoices();
        }
    }

    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }

    // Toast Messenger
    function showToast(message) {
        let toast = document.getElementById('toast-msg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-msg';
            toast.className = 'toast-msg';
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3800);
    }

    // Text to Speech Pronunciation
    function speakText(text, btnElement, label) {
        if (!('speechSynthesis' in window)) {
            showToast("Text-to-speech is not supported in this browser.");
            return;
        }

        // Toggle stop if already playing the same button
        if (currentSpeakingBtn === btnElement && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            resetButton(btnElement);
            currentSpeakingBtn = null;
            return;
        }

        window.speechSynthesis.cancel();
        if (currentSpeakingBtn) {
            resetButton(currentSpeakingBtn);
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;

        // Try finding a native Nepali voice (ne-IN or ne-NP), or fallback to Hindi (hi-IN)
        const nepaliVoice = voices.find(v => v.lang && (v.lang.toLowerCase().startsWith('ne') || v.lang.toLowerCase().includes('nepali')));
        const hindiVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('hi'));
        const fallbackVoice = voices.find(v => v.lang && v.lang.toLowerCase().includes('in'));

        if (nepaliVoice) {
            utterance.voice = nepaliVoice;
            utterance.lang = nepaliVoice.lang;
        } else if (hindiVoice) {
            utterance.voice = hindiVoice;
            utterance.lang = 'hi-IN';
        } else if (fallbackVoice) {
            utterance.voice = fallbackVoice;
            utterance.lang = fallbackVoice.lang;
        } else {
            utterance.lang = 'ne-IN';
        }

        window.currentUtterance = utterance;

        utterance.onstart = () => {
            currentSpeakingBtn = btnElement;
            btnElement.classList.add('playing');
            btnElement.setAttribute('aria-pressed', 'true');
            if (btnElement.classList.contains('audio-btn')) {
                btnElement.innerHTML = `<span>⏸</span> Playing (${label || text})...`;
            }
        };

        utterance.onend = () => {
            resetButton(btnElement);
            currentSpeakingBtn = null;
        };

        utterance.onerror = (e) => {
            if (e.error === 'canceled' || e.error === 'interrupted') return;
            console.warn("Audio playback notice:", e);
            resetButton(btnElement);
            currentSpeakingBtn = null;
        };

        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 40);
    }

    function resetButton(btn) {
        if (!btn) return;
        btn.classList.remove('playing');
        btn.setAttribute('aria-pressed', 'false');
        if (btn.classList.contains('audio-btn')) {
            btn.innerHTML = `<span>🔊</span> Hear Pronunciation`;
        }
    }

    // Render Stats
    function renderStats() {
        const container = document.getElementById('stats-strip');
        if (!container || !window.NEPALI_STATS) return;
        container.innerHTML = NEPALI_STATS.map(s => `
            <div class="stat-box">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
                <div class="stat-detail">${s.detail}</div>
            </div>
        `).join('');
    }

    // Render Greetings
    function renderGreetings() {
        const grid = document.getElementById('greetings-grid');
        if (!grid || !window.NEPALI_GREETINGS) return;

        grid.innerHTML = NEPALI_GREETINGS.map((g, i) => `
            <div class="greeting-card">
                <div>
                    <div class="greeting-header">
                        <span class="greeting-tag">${g.tag}</span>
                    </div>
                    <div class="greeting-nepali">${g.nepali}</div>
                    <div class="greeting-translit">${g.transliteration}</div>
                    <div class="greeting-ipa">IPA: ${g.ipa}</div>
                    <div class="greeting-meaning">${g.meaning}</div>
                </div>
                <button class="audio-btn" data-text="${g.audioText}" data-label="${g.transliteration}" aria-label="Listen to pronunciation of ${g.transliteration}">
                    <span>🔊</span> Hear Pronunciation
                </button>
            </div>
        `).join('');

        grid.querySelectorAll('.audio-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                speakText(btn.dataset.text, btn, btn.dataset.label);
            });
        });
    }

    // Render Script Details
    function renderScript() {
        const matrix = document.getElementById('vowel-matrix');
        if (matrix && window.NEPALI_SCRIPT_DATA) {
            matrix.innerHTML = NEPALI_SCRIPT_DATA.vowels.map(v => `
                <div class="vowel-cell" data-char="${v.char}" title="Click to hear vowel ${v.rom}" role="button" tabindex="0">
                    <div class="vowel-char">${v.char}</div>
                    <div class="vowel-rom">${v.rom}</div>
                    <div class="vowel-ipa">${v.ipa}</div>
                </div>
            `).join('');

            matrix.querySelectorAll('.vowel-cell').forEach(cell => {
                const trigger = () => speakText(cell.dataset.char, cell, cell.dataset.char);
                cell.addEventListener('click', trigger);
                cell.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        trigger();
                    }
                });
            });
        }

        const features = document.getElementById('script-features');
        if (features && window.NEPALI_SCRIPT_DATA) {
            features.innerHTML = NEPALI_SCRIPT_DATA.features.map(f => `
                <div class="script-feature-item">
                    <h4>${f.title}</h4>
                    <p>${f.description}</p>
                </div>
            `).join('');
        }
    }

    // Render Vocabulary Words
    let activeFilter = 'All';
    let searchQuery = '';

    function renderWords() {
        const grid = document.getElementById('vocab-grid');
        if (!grid || !window.NEPALI_WORDS) return;

        let filtered = NEPALI_WORDS.filter(w => {
            const matchesCategory = activeFilter === 'All' || w.category === activeFilter;
            const q = searchQuery.toLowerCase();
            const matchesSearch = !q || 
                w.nepali.toLowerCase().includes(q) || 
                w.translit.toLowerCase().includes(q) || 
                w.meaning.toLowerCase().includes(q) ||
                w.note.toLowerCase().includes(q);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No matching Nepali words found. Try adjusting your search.</div>`;
            return;
        }

        grid.innerHTML = filtered.map((w, i) => `
            <div class="word-card">
                <div>
                    <div class="word-top-bar">
                        <span class="word-nepali">${w.nepali}</span>
                        <button class="word-speak-btn" data-text="${w.nepali}" data-label="${w.translit}" aria-label="Pronounce ${w.translit}">
                            🔊
                        </button>
                    </div>
                    <div class="word-meta">
                        <span class="word-translit">${w.translit}</span> &nbsp;
                        <span class="word-ipa">${w.ipa}</span>
                    </div>
                    <div class="word-meaning">${w.meaning}</div>
                    <span class="word-category-tag">${w.category}</span>
                </div>
                <div class="word-note">${w.note}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.word-speak-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                speakText(btn.dataset.text, btn, btn.dataset.label);
            });
        });
    }

    function initVocabControls() {
        const searchInput = document.getElementById('vocab-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim();
                renderWords();
            });
        }

        const filterPills = document.querySelectorAll('.filter-pill');
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeFilter = pill.dataset.category || 'All';
                renderWords();
            });
        });
    }

    // Render Classification Tree
    function renderClassification() {
        const flow = document.getElementById('tree-flow');
        const sisters = document.getElementById('sister-chips');
        const traits = document.getElementById('linguistic-traits');

        if (flow && window.NEPALI_CLASSIFICATION) {
            const steps = NEPALI_CLASSIFICATION.familyTree.split('➔').map(s => s.trim());
            flow.innerHTML = steps.map((s, idx) => `
                <span class="tree-step">${s}</span>
                ${idx < steps.length - 1 ? '<span class="tree-arrow">➔</span>' : ''}
            `).join('');
        }

        if (sisters && window.NEPALI_CLASSIFICATION) {
            sisters.innerHTML = NEPALI_CLASSIFICATION.sisterLanguages.map(l => `
                <div class="sister-chip">
                    <strong>${l.name}</strong>: <span>${l.relation}</span>
                </div>
            `).join('');
        }

        if (traits && window.NEPALI_CLASSIFICATION) {
            traits.innerHTML = NEPALI_CLASSIFICATION.linguisticTraits.map(t => `
                <li style="margin-bottom: 8px; color: var(--text-secondary);">${t}</li>
            `).join('');
        }
    }

    // Render Regions
    function renderRegions() {
        const grid = document.getElementById('regions-grid');
        if (!grid || !window.NEPALI_INDIAN_REGIONS) return;

        grid.innerHTML = NEPALI_INDIAN_REGIONS.map(r => `
            <div class="region-card">
                <span class="region-badge">${r.badge}</span>
                <h3>${r.state}</h3>
                <div class="region-role">${r.role}</div>
                <p style="color: var(--text-secondary); font-size: 0.92rem;">${r.highlights}</p>
            </div>
        `).join('');
    }

    // Render Literature & Culture
    function renderCulture() {
        const grid = document.getElementById('culture-grid');
        if (!grid || !window.NEPALI_LITERATURE_CULTURE) return;

        const images = [
            { primary: 'assets/images/nepali_bhanu_literature.jpg', altSrc: '../assets/nepali_bhanu_literature.jpg' },
            { primary: 'assets/images/nepali_hero_banner.jpg', altSrc: '../assets/nepali_hero_banner.jpg' },
            { primary: 'assets/images/nepali_cultural_festivals.jpg', altSrc: '../assets/nepali_cultural_festivals.jpg' },
            { primary: 'assets/images/nepali_cultural_festivals.jpg', altSrc: '../assets/nepali_cultural_festivals.jpg' }
        ];

        grid.innerHTML = NEPALI_LITERATURE_CULTURE.map((c, i) => {
            const imgObj = images[i] || images[0];
            return `
            <div class="culture-card">
                <img src="${imgObj.primary}" alt="${c.title}" class="culture-card-img" loading="lazy"
                     onerror="if(this.src.indexOf('../assets/') === -1){this.src='${imgObj.altSrc}';}else if(this.src.indexOf('../../frontend/assets/') === -1){this.src='../../frontend/${imgObj.altSrc}';}">
                <div class="culture-card-body">
                    <div class="culture-category">${c.category}</div>
                    <h3>${c.title}</h3>
                    <p>${c.description}</p>
                </div>
            </div>
            `;
        }).join('');
    }

    // Render Sources
    function renderSources() {
        const list = document.getElementById('sources-list');
        if (!list || !window.NEPALI_SOURCES) return;

        list.innerHTML = NEPALI_SOURCES.map(s => `
            <li class="source-item">
                <a href="${s.link}" target="_blank" rel="noopener noreferrer">
                    <span>📑</span> ${s.title} <span>↗</span>
                </a>
                <p>${s.description}</p>
            </li>
        `).join('');
    }

    // Initialize all components
    renderStats();
    renderGreetings();
    renderScript();
    initVocabControls();
    renderWords();
    renderClassification();
    renderRegions();
    renderCulture();
    renderSources();
});

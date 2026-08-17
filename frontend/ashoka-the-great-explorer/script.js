// Ashoka the Great Profile Page JavaScript (Interactive & Dynamic)

function runInit() {
    const safeExec = (fn, name) => {
        try { fn(); } catch (e) { console.error(`Error in ${name}:`, e); }
    };
    safeExec(initTimeline, 'initTimeline');
    safeExec(initInterestingFacts, 'initInterestingFacts');
    safeExec(initMapInteractivity, 'initMapInteractivity');
    safeExec(initEdictTabs, 'initEdictTabs');
    safeExec(initQuizWidget, 'initQuizWidget');
    safeExec(initThemeToggle, 'initThemeToggle');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
} else {
    runInit();
}

// 1. Chronological Timeline Data & Renderer
function initTimeline() {
    const timelineContainer = document.getElementById('ashoka-timeline');
    if (!timelineContainer) return;

    const timelineEvents = [
        {
            year: "c. 273 BCE",
            title: "Accession & Viceroyships",
            desc: "Prince Ashoka serves as viceroy at Taxila and Ujjain before succeeding Emperor Bindusara."
        },
        {
            year: "c. 268 BCE",
            title: "Coronation at Pataliputra",
            desc: "Formal coronation at Pataliputra as the 3rd Emperor of the Mauryan Empire."
        },
        {
            year: "c. 261 BCE",
            title: "The Kalinga War & Great Transformation",
            desc: "Conquest of Kalinga resulting in massive loss of life. Deeply remorseful, Ashoka renounces armed war (*Digvijaya*) and adopts *Dhamma*."
        },
        {
            year: "c. 257 BCE",
            title: "Engraving of Major Rock Edicts",
            desc: "Orders Major Rock Edicts engraved on rock faces across India, Pakistan, and Afghanistan, proclaiming moral governance and religious tolerance."
        },
        {
            year: "c. 250 BCE",
            title: "Third Buddhist Council & International Envoys",
            desc: "Convenes 3rd Buddhist Council at Pataliputra; sends peace envoys to Sri Lanka (Mahendra & Sanghamitra), Syria, Egypt, and Greece."
        },
        {
            year: "c. 242 BCE",
            title: "Erection of Polished Monolithic Pillars",
            desc: "Erects majestic sandstone pillars (Sarnath, Vaishali, Laurya-Nandangarh) inscribed with Pillar Edicts promoting civic ethics."
        },
        {
            year: "c. 232 BCE",
            title: "Demise & End of 36-Year Reign",
            desc: "Demise of Emperor Ashoka after a transformative 36-year reign that left an indelible mark on Asian history."
        }
    ];

    timelineEvents.forEach(evt => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-year">${evt.year}</div>
            <h3>${evt.title}</h3>
            <p>${evt.desc}</p>
        `;
        timelineContainer.appendChild(item);
    });
}

// 2. Verified Interesting Facts Data & Renderer
function initInterestingFacts() {
    const container = document.getElementById('facts-container');
    if (!container) return;

    const facts = [
        {
            title: "🔍 Decipherment of Brahmi Script (1837)",
            desc: "Ashoka's edicts remained unread for centuries until James Prinsep of the Asiatic Society deciphered Brahmi script in 1837, revealing Ashoka's true historical identity."
        },
        {
            title: "🦁 National Emblem of Modern India",
            desc: "The Sarnath Lion Capital, sculpted under Ashoka's patronage around 250 BCE, was adopted as the official National Emblem of India on January 26, 1950."
        },
        {
            title: "☸️ The Ashoka Chakra on the Flag",
            desc: "The 24-spoked wheel of Dharma sculpted on Ashoka's pillars adorns the center of the Indian National Flag, symbolizing righteousness and progressive motion."
        },
        {
            title: "🌿 Pioneer of Veterinary Medicine & Hospitals",
            desc: "Major Rock Edict II records that Ashoka established the world's earliest documented medical centers and botanical gardens for both humans and animals."
        },
        {
            title: "📜 Multilingual Inscriptions in Greek & Aramaic",
            desc: "In northwestern satrapies like Kandahar, Ashoka's edicts were inscribed in Greek and Aramaic to communicate directly with Hellenistic and Persian subjects."
        },
        {
            title: "🕊️ Diplomatic Missions to Hellenistic Monarchs",
            desc: "Major Rock Edict XIII names contemporary Greek rulers—Antiochus II of Syria, Ptolemy II of Egypt, and Magas of Cyrene—receiving Ashoka's Dhamma envoys."
        }
    ];

    facts.forEach(f => {
        const card = document.createElement('div');
        card.className = 'fact-card';
        card.innerHTML = `
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
        `;
        container.appendChild(card);
    });
}

// 3. Interactive Edicts Tabbed Component
function initEdictTabs() {
    const btns = document.querySelectorAll('.edict-tab-btn');
    const display = document.getElementById('edict-display-content');
    if (!btns.length || !display) return;

    const edictData = {
        sarnath: {
            icon: "🦁",
            title: "Sarnath Lion Capital & Pillar Edict",
            desc: "Erected around 250 BCE at Sarnath, where Lord Buddha gave his first sermon. The polished sandstone pillar features four Asiatic lions standing back-to-back over a drum with 24-spoked wheels (*Ashoka Chakra*). It urges unity within the Sangha and forms modern India's State Emblem.",
            quote: "“No one shall cause division in the Order of Monks and Nuns. Whosoever splits the Order shall be made to wear white clothes and reside outside the monastery.” — Sarnath Pillar Inscription"
        },
        girnar: {
            icon: "🪨",
            title: "Girnar Major Rock Edicts (Gujarat)",
            desc: "Fourteen Major Rock Edicts carved onto a granite boulder at the foot of Mount Girnar in Junagadh, Gujarat. It contains complete edicts proclaiming non-violence (*Ahimsa*), religious harmony, and animal protection.",
            quote: "“Here no living being shall be slaughtered or offered in sacrifice... Formerly, in the kitchen of Beloved-of-the-Gods, many hundred-thousands of animals were slain daily. Now, only three are killed.” — Major Rock Edict I"
        },
        dhauli: {
            icon: "🐘",
            title: "Dhauli Rock Elephant & Kalinga Edict (Odisha)",
            desc: "Carved on a rock face overlooking the Daya River near Bhubaneswar, topped by a rock-cut elephant sculpture. It contains Special Kalinga Edicts instructing imperial officers to treat all subjects as royal children.",
            quote: "“All men are my children. What I desire for my own children—that they be provided with welfare and happiness—that I desire for all men.” — Special Kalinga Rock Edict I"
        },
        kandahar: {
            icon: "📜",
            title: "Kandahar Bilingual Edict (Afghanistan)",
            desc: "Discovered in 1958 near Shar-i-Kuna, Kandahar. Inscribed in both Greek and Aramaic for the Greek and Persian populations of the northwestern Mauryan frontier.",
            quote: "“Ten years having been completed, King Piodasses (Ashoka) showed Piety (Dhamma) to men... All men abstain from slaughter and live in harmony.” — Kandahar Greek Inscription"
        }
    };

    function renderEdict(key) {
        const d = edictData[key];
        if (!d) return;
        display.innerHTML = `
            <div class="edict-header">
                <span class="edict-icon">${d.icon}</span>
                <h3>${d.title}</h3>
            </div>
            <p>${d.desc}</p>
            <div class="edict-quote">${d.quote}</div>
        `;
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEdict(btn.dataset.edict);
        });
    });
}

// 4. Interactive Map Pins Logic
function initMapInteractivity() {
    const pins = document.querySelectorAll('.map-pin-group');
    const infoPanel = document.getElementById('map-region-info');
    if (!pins.length || !infoPanel) return;

    const siteData = {
        sarnath: "<strong>Sarnath (Varanasi, UP):</strong> Site of the Lion Capital Pillar Edict, commemorating Buddha's first sermon. Features the 24-spoked Ashoka Chakra.",
        girnar: "<strong>Girnar (Junagadh, Gujarat):</strong> Granite boulder bearing 14 Major Rock Edicts, including decrees on animal protection and road reservoirs.",
        dhauli: "<strong>Dhauli (Bhubaneswar, Odisha):</strong> Site of the Kalinga War battlefield and Rock Edict XIII expressing Ashoka's remorse.",
        kandahar: "<strong>Kandahar (Afghanistan):</strong> Northwestern frontier site of Greek-Aramaic bilingual inscriptions demonstrating Hellenistic diplomacy.",
        kalsi: "<strong>Kalsi (Dehradun, Uttarakhand):</strong> Quartzite rock inscription site containing all 14 Major Rock Edicts near the Yamuna river."
    };

    pins.forEach(pin => {
        pin.addEventListener('click', () => {
            const site = pin.dataset.site;
            if (siteData[site]) {
                infoPanel.innerHTML = siteData[site];
            }
        });
    });
}

// 5. Interactive Quiz Widget Logic
function initQuizWidget() {
    const optionsBox = document.getElementById('quiz-options-box');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (!optionsBox || !feedbackBox) return;

    const explanation = "Correct! Major Rock Edict XIII expresses Emperor Ashoka's deep remorse for the destruction of Kalinga and proclaims his shift to moral conquest (*Dharmavijaya*).";

    const buttons = optionsBox.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.disabled = true);
            const isCorrect = btn.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                btn.classList.add('correct-ans');
                feedbackBox.style.color = '#10b981';
                feedbackBox.innerHTML = `✅ ${explanation}`;
            } else {
                btn.classList.add('wrong-ans');
                feedbackBox.style.color = '#ef4444';
                feedbackBox.innerHTML = `❌ Incorrect. The correct answer is <strong>Major Rock Edict XIII</strong>.`;
            }
        });
    });
}

// 6. Dark/Light Theme Toggle Logic
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        const themeStr = isLight ? 'light' : 'dark';
        
        try {
            const storage = JSON.parse(localStorage.getItem('iie_storage') || '{}');
            storage.theme = themeStr;
            localStorage.setItem('iie_storage', JSON.stringify(storage));
        } catch(e) {}
        localStorage.setItem('theme', themeStr);
        
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

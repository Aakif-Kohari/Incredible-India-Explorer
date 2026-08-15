// Chandragupta II Vikramaditya Profile Page JavaScript (Interactive & Dynamic)

function runInit() {
    const safeExec = (fn, name) => {
        try { fn(); } catch (e) { console.error(`Error in ${name}:`, e); }
    };
    safeExec(initTimeline, 'initTimeline');
    safeExec(initInterestingFacts, 'initInterestingFacts');
    safeExec(initMapInteractivity, 'initMapInteractivity');
    safeExec(initCoinTabs, 'initCoinTabs');
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
    const timelineContainer = document.getElementById('gupta-timeline');
    if (!timelineContainer) return;

    const timelineEvents = [
        {
            year: "c. 375 CE",
            title: "Accession & Imperial Succession",
            desc: "Chandragupta II ascends the Gupta throne following the illustrious reign of his father, Samudragupta."
        },
        {
            year: "c. 388 CE",
            title: "Vakataka Matrimonial Alliance",
            desc: "Marries his daughter Prabhavatigupta to King Rudrasena II of the Vakataka Dynasty, securing the southern frontier."
        },
        {
            year: "c. 395 CE",
            title: "Conquest of Western Kshatrapas (Sakas)",
            desc: "Defeats Rudrasimha III, ending 300 years of Saka rule in Malwa and Gujarat; adopts the titles Sakari and Vikramaditya."
        },
        {
            year: "c. 399 CE",
            title: "Arrival of Chinese Pilgrim Faxian (Fa-Hien)",
            desc: "Chinese Buddhist monk Faxian arrives in India, documenting a peaceful, prosperous society with mild laws and free hospitals."
        },
        {
            year: "c. 402 CE",
            title: "Erection of the Mehrauli Iron Pillar",
            desc: "Commissions the 7.2-metre rust-resistant iron pillar at Delhi inscribed in Gupta Brahmi script to honor King Chandra."
        },
        {
            year: "c. 405 CE",
            title: "Flowering of the Golden Age & Maritime Trade",
            desc: "Western Arabian Sea ports (Bharuch, Cambay) boost maritime commerce with Rome, Persia, and Southeast Asia."
        },
        {
            year: "c. 415 CE",
            title: "Demise & Succession of Kumaragupta I",
            desc: "Demise of Emperor Chandragupta II after a magnificent 40-year reign; succeeded by his son Kumaragupta I."
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
            title: "🏛️ The Rust-Resistant Mehrauli Iron Pillar",
            desc: "The 7.2-metre iron pillar in Delhi forged under Chandragupta II has stood unrusted for over 1,600 years due to advanced passive oxide film metallurgy."
        },
        {
            title: "⚔️ Sakari: Conqueror of the Western Sakas",
            desc: "His victory over the Western Kshatrapas in Gujarat and Kathiawar earned him the famous title Sakari ('Enemy of the Sakas')."
        },
        {
            title: "📜 Eyewitness Record of Faxian (Fa-Hien)",
            desc: "Faxian recorded that Gupta citizens paid no land tax unless farming royal land, traveled without passports, and lived without fear of harsh capital punishment."
        },
        {
            title: "🏛️ Dual Capitals at Pataliputra & Ujjain",
            desc: "While Pataliputra remained the primary political seat, Ujjain was developed into the imperial cultural capital and western trade hub."
        },
        {
            title: "🎭 Patronage of the Navaratnas (Nine Gems)",
            desc: "Traditional accounts attribute the patronization of the Navaratnas—including Sanskrit dramatist Kalidasa—to Chandragupta II Vikramaditya's court."
        },
        {
            title: "🪙 Introduction of Gupta Silver Coinage",
            desc: "Following the conquest of Malwa and Gujarat, Chandragupta II became the first Gupta emperor to issue silver coins, adapting Saka numismatic standards."
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

// 3. Interactive Coin Gallery Tab Component
function initCoinTabs() {
    const btns = document.querySelectorAll('.coin-tab-btn');
    const display = document.getElementById('coin-display-content');
    if (!btns.length || !display) return;

    const coinData = {
        archer: {
            icon: "🏹",
            title: "Archer Type Gold Dinar",
            desc: "The most popular gold coin type of Chandragupta II's reign. The obverse features the Emperor standing left holding a bow in his left hand and an arrow in his right, with a Garuda banner behind. The reverse depicts Goddess Lakshmi seated on a lotus, holding a lotus flower and cornucopia.",
            quote: "“Deva-Sri-Maharajadhiraja-Sri-Chandragupta” — Brahmi Obverse Legend"
        },
        lion: {
            icon: "🦁",
            title: "Lion-Slayer Type Gold Dinar",
            desc: "Issued to commemorate the conquest of Gujarat and Malwa. The obverse portrays the Emperor hunting a lion with bow and arrow, trampling the lion with his foot. The reverse depicts Goddess Durga seated on a lion (*Simhavahini*).",
            quote: "“Simhavikrama” ('He who possesses the prowess of a lion') — Brahmi Reverse Title"
        },
        chhatra: {
            icon: "☂️",
            title: "Chhatra (Parasol) Type Gold Dinar",
            desc: "Depicts Chandragupta II offering oblations at a fire altar while an attendant behind holds a royal parasol (*Chhatra*) over the monarch, symbolizing universal imperial suzerainty.",
            quote: "“Vikramaditya” ('Sun of Valor') — Brahmi Reverse Legend"
        },
        silver: {
            icon: "🪙",
            title: "Western Kshatrapa Style Silver Coin",
            desc: "First silver coinage issued by a Gupta ruler. Issued in Gujarat after defeating Rudrasimha III. Features the Emperor's bust on the obverse and a peacock with outspread wings or Garuda on the reverse.",
            quote: "“Paramabhagavata-Maharajadhiraja-Sri-Chandragupta-Vikramaditya” — Reverse Legend"
        }
    };

    function renderCoin(key) {
        const d = coinData[key];
        if (!d) return;
        display.innerHTML = `
            <div class="coin-header">
                <span class="coin-icon">${d.icon}</span>
                <h3>${d.title}</h3>
            </div>
            <p>${d.desc}</p>
            <div class="coin-quote">${d.quote}</div>
        `;
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCoin(btn.dataset.coin);
        });
    });
}

// 4. Interactive Map Pins Logic
function initMapInteractivity() {
    const pins = document.querySelectorAll('.map-pin-group');
    const infoPanel = document.getElementById('map-region-info');
    if (!pins.length || !infoPanel) return;

    const siteData = {
        pataliputra: "<strong>Pataliputra (Gangetic Capital):</strong> Primary imperial seat of the Gupta Empire, described by Faxian as a prosperous metropolis with free public hospitals.",
        ujjain: "<strong>Ujjain (Cultural Capital):</strong> Western viceregal seat and intellectual hub of the Golden Age, crossroads for trade and astronomical studies.",
        bharuch: "<strong>Bharuch / Barygaza (Arabian Sea Port):</strong> Strategic trade port annexed after defeating the Sakas, connecting Gupta India to Roman and Persian trade.",
        mathura: "<strong>Mathura (Northern Hub):</strong> Major religious and artistic sculpting center of the Gupta Era, famous for red sandstone Buddha and Hindu sculptures.",
        vidisha: "<strong>Vidisha / Udayagiri (Central Seat):</strong> Site of the famous Udayagiri Cave temples commissioned by Chandragupta II and his ministers."
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

    const explanation = "Correct! Following his victory over the Western Kshatrapas (Sakas) in Malwa and Gujarat, Chandragupta II assumed the title Sakari ('Conqueror of Sakas').";

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
                feedbackBox.innerHTML = `❌ Incorrect. The correct answer is <strong>Sakari ("Conqueror of Sakas")</strong>.`;
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

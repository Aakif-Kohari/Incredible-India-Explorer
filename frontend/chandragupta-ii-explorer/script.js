// Chandragupta II Vikramaditya Profile Page JavaScript (Ultra-Interactive)

function runInit() {
    const safeExec = (fn, name) => {
        try { fn(); } catch (e) { console.error(`Error in ${name}:`, e); }
    };
    safeExec(initHeroCoinFlip, 'initHeroCoinFlip');
    safeExec(initCampaignSimulator, 'initCampaignSimulator');
    safeExec(initNavaratnasGrid, 'initNavaratnasGrid');
    safeExec(initPillarVisualizer, 'initPillarVisualizer');
    safeExec(initTimeline, 'initTimeline');
    safeExec(initInterestingFacts, 'initInterestingFacts');
    safeExec(initMapInteractivity, 'initMapInteractivity');
    safeExec(initCoinTabs, 'initCoinTabs');
    safeExec(initQuizWidget, 'initQuizWidget');
    safeExec(initThemeToggle, 'initThemeToggle');
    safeExec(initImageLightbox, 'initImageLightbox');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
} else {
    runInit();
}

// 1. 3D Coin Flip Logic
function initHeroCoinFlip() {
    const card = document.getElementById('coin-card-inner');
    const btn = document.getElementById('btn-flip-hero-coin');
    if (!card || !btn) return;

    btn.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
}

// 2. Interactive Campaign Simulator Logic
function initCampaignSimulator() {
    const btns = document.querySelectorAll('.stage-btn');
    const display = document.getElementById('sim-display-content');
    const poly = document.getElementById('map-gupta-poly');
    if (!btns.length || !display) return;

    const stageData = {
        '1': {
            icon: '👑',
            title: 'Stage 1: Accession & Gangetic Heartlands (c. 375 CE)',
            desc: 'Chandragupta II ascends the imperial throne at Pataliputra. He inherits Samudragupta\'s central realm spanning Northern India and immediately begins fortifying imperial trade routes.',
            log: '📍 Control Hubs: Pataliputra, Mathura, Prayaga, Varanasi.',
            color: 'rgba(217, 119, 6, 0.25)'
        },
        '2': {
            icon: '🤝',
            title: 'Stage 2: Deccan Matrimonial Alliance (c. 388 CE)',
            desc: 'Marries his daughter Prabhavatigupta to Vakataka King Rudrasena II. Secures the Deccan plateau, neutralizing potential threats on the southern frontier before striking west.',
            log: '📍 Diplomatic Sphere: Vidisha, Nagpur, Deccan Plateau.',
            color: 'rgba(124, 58, 237, 0.3)'
        },
        '3': {
            icon: '⚔️',
            title: 'Stage 3: Western Saka Campaign (c. 395 CE)',
            desc: 'Launches a decisive military invasion of Malwa, Gujarat, and Kathiawar. Vanquishes Sakas ruler Rudrasimha III, ending 300 years of Western Kshatrapas dominance.',
            log: '📍 Conquest Hubs: Ujjain, Junagadh, Kathiawar Peninsula.',
            color: 'rgba(239, 68, 68, 0.35)'
        },
        '4': {
            icon: '🌊',
            title: 'Stage 4: Arabian Sea Maritime Trade Expansion (c. 405 CE)',
            desc: 'Annexes western maritime ports of Bharuch (Barygaza), Cambay, and Sopara. Unlocks lucrative direct sea trade with the Roman Empire, Persia, and Southeast Asia.',
            log: '📍 Maritime Gateway: Bharuch Port, Cambay, Arabian Sea Trade Lanes.',
            color: 'rgba(16, 185, 129, 0.35)'
        }
    };

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const st = stageData[btn.dataset.stage];
            if (!st) return;

            display.innerHTML = `
                <div class="sim-header">
                    <span class="sim-icon">${st.icon}</span>
                    <h3>${st.title}</h3>
                </div>
                <p>${st.desc}</p>
                <div class="sim-log">${st.log}</div>
            `;

            if (poly) {
                poly.setAttribute('fill', st.color);
            }
        });
    });
}

// 3. Navaratnas Interactive Court Grid Logic
function initNavaratnasGrid() {
    const cards = document.querySelectorAll('.gem-card');
    const panel = document.getElementById('gem-detail-content');
    if (!cards.length || !panel) return;

    const gemDetails = {
        kalidasa: "<strong>Selected Luminary: Kalidasa</strong> — Celebrated as India's greatest classical Sanskrit poet. His masterpiece *Abhijnanasakuntalam* was among the first Indian works translated into European languages.",
        varahamihira: "<strong>Selected Luminary: Varahamihira</strong> — Legendary astronomer and polymath of Ujjain. Authored *Brihat Samhita*, covering astronomy, planetary movements, geology, and architecture.",
        dhanvantari: "<strong>Selected Luminary: Dhanvantari</strong> — Royal physician of the Gupta court. Systematized ancient Indian Ayurvedic pharmacology and surgical techniques.",
        amarasimha: "<strong>Selected Luminary: Amarasimha</strong> — Ancient lexicographer who compiled the *Amarakosha*, the oldest surviving Sanskrit thesaurus in verse form.",
        vararuchi: "<strong>Selected Luminary: Vararuchi</strong> — Grammarian and scholar who authored *Prakrita-Prakasa*, establishing the foundational rules of Prakrit dialects.",
        sanku: "<strong>Selected Luminary: Sanku</strong> — Master architect and sculptor who designed civic monuments and rock-cut cave facades in Vidisha and Ujjain."
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const key = card.dataset.gem;
            if (gemDetails[key]) {
                panel.innerHTML = gemDetails[key];
            }
        });
    });
}

// 4. Mehrauli Iron Pillar Metallurgical Breakdown Logic
function initPillarVisualizer() {
    const btns = document.querySelectorAll('.layer-btn');
    const info = document.getElementById('pillar-layer-info');
    if (!btns.length || !info) return;

    const layerTexts = {
        core: "<strong>Wrought Iron Core (98% Purity):</strong> Forged by hammer-welding hot lumps of iron with charcoal fuel, yielding a carbon-free high-phosphorus alloy.",
        film: "<strong>Passive Phosphate Film (Misawite Layer):</strong> Formed naturally by high phosphorus content reacting with atmospheric humidity, forming a protective 50-micron anti-rust shield.",
        inscription: "<strong>Sanskrit Brahmi Inscription:</strong> Six lines of poetic Sanskrit verse in Gupta Brahmi script celebrating King Chandra's triumphs over the Vahlika tribes."
    };

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.dataset.layer;
            if (layerTexts[key]) {
                info.innerHTML = layerTexts[key];
            }
        });
    });
}

// 5. Chronological Timeline Data & Renderer
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

// 6. Verified Interesting Facts Data & Renderer
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

// 7. Interactive Coin Gallery Tab Component
function initCoinTabs() {
    const btns = document.querySelectorAll('.coin-tab-btn');
    const display = document.getElementById('coin-display-content');
    if (!btns.length || !display) return;

    const coinData = {
        archer: {
            icon: "🏹",
            img: "./gupta_gold_coin.jpg",
            title: "Archer Type Gold Dinar",
            desc: "The most popular gold coin type of Chandragupta II's reign. The obverse features the Emperor standing left holding a bow in his left hand and an arrow in his right, with a Garuda banner behind. The reverse depicts Goddess Lakshmi seated on a lotus, holding a lotus flower and cornucopia.",
            quote: "“Deva-Sri-Maharajadhiraja-Sri-Chandragupta” — Brahmi Obverse Legend"
        },
        lion: {
            icon: "🦁",
            img: "./gupta_gold_coin.jpg",
            title: "Lion-Slayer Type Gold Dinar",
            desc: "Issued to commemorate the conquest of Gujarat and Malwa. The obverse portrays the Emperor hunting a lion with bow and arrow, trampling the lion with his foot. The reverse depicts Goddess Durga seated on a lion (*Simhavahini*).",
            quote: "“Simhavikrama” ('He who possesses the prowess of a lion') — Brahmi Reverse Title"
        },
        chhatra: {
            icon: "☂️",
            img: "./gupta_gold_coin.jpg",
            title: "Chhatra (Parasol) Type Gold Dinar",
            desc: "Depicts Chandragupta II offering oblations at a fire altar while an attendant behind holds a royal parasol (*Chhatra*) over the monarch, symbolizing universal imperial suzerainty.",
            quote: "“Vikramaditya” ('Sun of Valor') — Brahmi Reverse Legend"
        },
        silver: {
            icon: "🪙",
            img: "./silver_coin.jpg",
            title: "Western Kshatrapa Style Silver Coin",
            desc: "First silver coinage issued by a Gupta ruler. Issued in Gujarat after defeating Rudrasimha III. Features the Emperor's bust on the obverse and a peacock with outspread wings or Garuda on the reverse.",
            quote: "“Paramabhagavata-Maharajadhiraja-Sri-Chandragupta-Vikramaditya” — Reverse Legend"
        }
    };

    function renderCoin(key) {
        const d = coinData[key];
        if (!d) return;
        display.innerHTML = `
            <div class="section-two-col">
                <div class="coin-text-col">
                    <div class="coin-header">
                        <span class="coin-icon">${d.icon}</span>
                        <h3>${d.title}</h3>
                    </div>
                    <p>${d.desc}</p>
                    <div class="coin-quote">${d.quote}</div>
                </div>
                <div class="col-image-card interactive-img-trigger" data-fullimg="${d.img}" data-caption="${d.title}">
                    <img src="${d.img}" alt="${d.title}" class="feature-img">
                    <div class="img-zoom-badge">🔍 Click to Expand</div>
                </div>
            </div>
        `;
        initImageLightbox();
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCoin(btn.dataset.coin);
        });
    });
}

// 8. Interactive Map Pins Logic
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

// 9. Interactive Quiz Widget Logic
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

// 10. Dark/Light Theme Toggle Logic
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

// 11. Interactive Image Lightbox Modal Logic
function initImageLightbox() {
    const modal = document.getElementById('img-modal-lightbox');
    const modalTarget = document.getElementById('img-modal-target');
    const modalCaption = document.getElementById('img-modal-caption');
    const closeBtn = document.getElementById('img-modal-close');
    const triggers = document.querySelectorAll('.interactive-img-trigger');

    if (!modal || !modalTarget || !modalCaption || !triggers.length) return;

    function openModal(imgSrc, captionText) {
        modalTarget.src = imgSrc;
        modalCaption.textContent = captionText || '';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modalTarget.src = '';
        document.body.style.overflow = '';
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const fullImg = trigger.getAttribute('data-fullimg') || trigger.querySelector('img').src;
            const caption = trigger.getAttribute('data-caption') || trigger.querySelector('.img-caption')?.textContent || '';
            openModal(fullImg, caption);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

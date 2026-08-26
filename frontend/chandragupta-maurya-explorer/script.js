// Chandragupta Maurya Profile Page JavaScript (Interactive & Dynamic)

function runInit() {
    const safeExec = (fn, name) => {
        try { fn(); } catch (e) { console.error(`Error in ${name}:`, e); }
    };
    safeExec(initTimeline, 'initTimeline');
    safeExec(initInterestingFacts, 'initInterestingFacts');
    safeExec(initMapInteractivity, 'initMapInteractivity');
    safeExec(initCampaignSelector, 'initCampaignSelector');
    safeExec(initAdminTabs, 'initAdminTabs');
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
    const timelineContainer = document.getElementById('maurya-timeline');
    if (!timelineContainer) return;

    const timelineEvents = [
        {
            year: "c. 340 BCE",
            title: "Birth & Early Origins",
            desc: "Born in Northern India. Classical traditions record his early upbringing in the Moriya clan of Pipphalivana and his early education."
        },
        {
            year: "c. 326 BCE",
            title: "Meeting Alexander & Chanakya's Mentorship",
            desc: "During Alexander the Great's invasion of the Punjab, Chandragupta meets Chanakya at Taxila. Chanakya trains him in military tactics and statecraft."
        },
        {
            year: "c. 321 BCE",
            title: "Coronation at Pataliputra & Conquest of Nanda Realm",
            desc: "Chandragupta overthrows the tyrannical Dhana Nanda, captures Pataliputra, and is crowned emperor, founding the Mauryan Empire."
        },
        {
            year: "c. 305 BCE",
            title: "Seleucid-Mauryan War & Peace Treaty",
            desc: "Defeats Seleucus I Nicator. The treaty cedes Arachosia, Gedrosia, Paropamisadae, and Aria to the Mauryans in exchange for 500 war elephants."
        },
        {
            year: "c. 300 BCE",
            title: "Megasthenes' Embassy & Compilation of 'Indika'",
            desc: "Greek ambassador Megasthenes arrives at Pataliputra, recording the monumental 64-gate palisade, court protocols, and social administration."
        },
        {
            year: "c. 298–297 BCE",
            title: "Abdication & Pilgrimage to Shravanabelagola",
            desc: "Facing a 12-year famine, Chandragupta abdicates in favor of his son Bindusara. He travels south with Jain Acharya Bhadrabahu and practices Sallekhana on Chandragiri hill."
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
            title: "🐘 500 Elephants Changed Eurasian History",
            desc: "The 500 war elephants Chandragupta gifted to Seleucus I in 305 BCE were deployed at the Battle of Ipsus (301 BCE) in Phrygia, securing Seleucus' victory over Antigonus."
        },
        {
            title: "🏛️ Pataliputra's 64 Gates & 570 Towers",
            desc: "Megasthenes recorded that Pataliputra was surrounded by a massive wooden palisade stretching 14 km long and 2.5 km wide, protected by a 600-foot wide moat."
        },
        {
            title: "🕵️ The 'Gudhavapurusha' Intelligence System",
            desc: "Chanakya's Arthashastra details an elaborate intelligence network of secret agents, code-named Gudhavapurushas, who ensured internal security and administrative integrity."
        },
        {
            title: "⚔️ Pliny's Record of 600,000 Soldiers",
            desc: "Roman historian Pliny the Elder wrote that Chandragupta maintained 600,000 foot soldiers, 30,000 cavalry, and 9,000 war elephants—making it the largest army in the world at the time."
        },
        {
            title: "⛰️ Chandragiri Hill Named in His Memory",
            desc: "The sacred hill at Shravanabelagola in Karnataka, where Chandragupta spent his final ascetic days alongside Bhadrabahu, is named Chandragiri in his honor."
        },
        {
            title: "💰 Punch-Marked Imperial Silver Coinage",
            desc: "The Mauryan state operated centralized mints producing standardized silver punch-marked coins (Pana) bearing sun, crescent-on-hill, and elephant symbols."
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

// 3. Campaign Selector Logic
function initCampaignSelector() {
    const btns = document.querySelectorAll('.campaign-btn');
    const poly = document.getElementById('map-empire-poly');
    const infoPanel = document.getElementById('map-region-info');
    if (!btns.length || !poly || !infoPanel) return;

    const campaignConfigs = {
        all: {
            points: "140,110 320,70 650,150 720,260 620,380 440,360 280,290 160,200",
            text: "<strong>Full Mauryan Extent (c. 300 BCE):</strong> Spanning from Kabul (Afghanistan) and Gedrosia (Balochistan) in the west to Bengal in the east, and from the Himalayas to the Deccan Plateau."
        },
        nanda: {
            points: "360,140 520,130 680,180 660,280 500,290 380,230",
            text: "<strong>Nanda Conquest (321 BCE):</strong> Mobilizing alliances with regional chieftains, Chandragupta besieged the Magadhan heartland and captured Pataliputra, seizing the Nanda treasury and crown."
        },
        seleucid: {
            points: "130,90 280,70 340,160 280,220 140,200",
            text: "<strong>Seleucid Campaign (305 BCE):</strong> Confronting Seleucus I Nicator along the Indus, Chandragupta secured the eastern satrapies of Arachosia, Gedrosia, Paropamisadae, and Aria in exchange for 500 war elephants."
        },
        deccan: {
            points: "320,220 580,210 620,380 440,360 280,290",
            text: "<strong>Western &amp; Deccan Annexations:</strong> Subjugating Avanti (Ujjain), Surashtra (Gujarat), and extending Mauryan suzerainty into northern Karnataka."
        }
    };

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.dataset.campaign;
            if (campaignConfigs[key]) {
                poly.setAttribute('points', campaignConfigs[key].points);
                infoPanel.innerHTML = campaignConfigs[key].text;
            }
        });
    });
}

// 4. Interactive Administration Tabs
function initAdminTabs() {
    const btns = document.querySelectorAll('.admin-tab-btn');
    const display = document.getElementById('admin-tab-content');
    if (!btns.length || !display) return;

    const tabData = {
        central: {
            icon: "🏛️",
            title: "Central Governance & Council of Ministers",
            desc: "The Emperor governed with the assistance of the <strong>Mantriparishad</strong> (Council of Ministers). Executive decisions were executed by specialized departmental heads (<em>Adhyakshas</em>) overseeing state treasuries, customs, agriculture, and public works.",
            quote: "“In the happiness of his subjects lies his happiness; in their welfare his welfare.” — Kautilya's Arthashastra"
        },
        military: {
            icon: "⚔️",
            title: "Military Engine & Six Administrative Boards",
            desc: "According to Pliny and Megasthenes, Chandragupta commanded a standing force of <strong>600,000 infantry, 30,000 cavalry, and 9,000 war elephants</strong>. Military affairs were managed by a war office composed of 30 members divided into 6 specialized boards (Infantry, Cavalry, Elephants, Chariots, Navy, and Commissariat).",
            quote: "“A disciplined army and well-stocked arsenal form the pillar of imperial sovereignty.” — Arthashastra Book VI"
        },
        espionage: {
            icon: "🕵️",
            title: "Gudhavapurusha Spy & Intelligence Network",
            desc: "Chanakya established an advanced intelligence system. Secret agents code-named <strong>Gudhavapurushas</strong> were stationed across towns, foreign embassies, and administrative offices to counter corruption, gather public sentiment, and thwart insurrections.",
            quote: "“The King shall listen to secret intelligence continuously, ensuring no officer acts beyond law.” — Arthashastra Book I"
        },
        economy: {
            icon: "💰",
            title: "Economic System & Silver Punch-Marked Coinage",
            desc: "The state controlled strategic resources including mines, forests, and salt pans. Standardized silver punch-marked coins (<em>Pana</em>) bearing solar and animal motifs facilitated long-distance trade across the Royal Road from Taxila to Pataliputra.",
            quote: "“All administrative measures originate with finance; therefore supreme attention shall be given to the treasury.” — Arthashastra Book II"
        }
    };

    function renderTab(key) {
        const d = tabData[key];
        if (!d) return;
        display.innerHTML = `
            <div class="admin-display-header">
                <span class="admin-display-icon">${d.icon}</span>
                <h3>${d.title}</h3>
            </div>
            <p>${d.desc}</p>
            <div class="arthashastra-quote">${d.quote}</div>
        `;
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTab(btn.dataset.tab);
        });
    });

    // Default load
    renderTab('central');
}

// 5. Interactive Map Pins Logic
function initMapInteractivity() {
    const pins = document.querySelectorAll('.map-pin-group');
    const infoPanel = document.getElementById('map-region-info');
    if (!pins.length || !infoPanel) return;

    const regionData = {
        pataliputra: "<strong>Pataliputra (Imperial Capital):</strong> Situated near modern Patna at the Ganges-Sone confluence. Megasthenes described it as a magnificent city with 64 gates, 570 towers, and royal timber palaces.",
        taxila: "<strong>Taxila (Northwestern Seat):</strong> Ancient university hub where Chanakya taught. Served as the administrative capital for the northwestern frontier satrapies.",
        ujjain: "<strong>Ujjain (Western Province):</strong> Capital of Avanti province regulating overland trade routes between the Gangetic plain and Arabian Sea trade ports.",
        kandahar: "<strong>Arachosia (Kandahar Territory):</strong> Transferred to Mauryan sovereignty following the 305 BCE treaty with Seleucus I Nicator."
    };

    pins.forEach(pin => {
        pin.addEventListener('click', () => {
            const region = pin.dataset.region;
            if (regionData[region]) {
                infoPanel.innerHTML = regionData[region];
            }
        });
    });
}

// 6. Interactive Quiz Widget Logic
function initQuizWidget() {
    const qText = document.getElementById('quiz-question-text');
    const optionsBox = document.getElementById('quiz-options-box');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (!qText || !optionsBox || !feedbackBox) return;

    const explanation = "Correct! Seleucus I Nicator signed the 305 BCE treaty, ceding the eastern satrapies of Arachosia, Gedrosia, and Kabul in exchange for 500 Mauryan war elephants.";

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
                feedbackBox.innerHTML = `❌ Incorrect. The correct answer is <strong>Seleucus I Nicator</strong>.`;
            }
        });
    });
}

// 7. Dark/Light Theme Toggle Logic
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

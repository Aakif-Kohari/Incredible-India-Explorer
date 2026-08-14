// Chandragupta Maurya Profile Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initInterestingFacts();
    initMapInteractivity();
    initThemeToggle();
});

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

// 3. Interactive Map Pins Logic
function initMapInteractivity() {
    const pins = document.querySelectorAll('.map-pin-group');
    const infoPanel = document.getElementById('map-region-info');
    if (!pins.length || !infoPanel) return;

    const regionData = {
        pataliputra: "<strong>Pataliputra (Imperial Capital):</strong> Located near modern Patna at the confluence of the Ganges and Sone rivers. It served as the central administrative hub with royal council halls, state treasury, and imperial mints.",
        taxila: "<strong>Taxila (Northwestern Province):</strong> Seat of the northwestern viceroyalty near modern Islamabad, Pakistan. A premier ancient university city where Chanakya taught and where Chandragupta studied statecraft.",
        ujjain: "<strong>Ujjain (Avanti Province):</strong> Capital of the western province of Avanti. A major commercial crossroads regulating trade routes between Pataliputra and the Arabian Sea ports.",
        kandahar: "<strong>Arachosia (Kandahar & Kabul territories):</strong> Acquired in 305 BCE following the treaty with Seleucus I. Established peaceful diplomatic relations and Greek-Aramaic bilingual inscriptions."
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

// 4. Dark/Light Theme Toggle Logic
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

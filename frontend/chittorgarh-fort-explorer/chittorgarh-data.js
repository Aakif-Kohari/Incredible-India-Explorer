/**
 * Chittorgarh Fort Explorer — Data Module
 * Comprehensive dataset covering Chittorgarh Fort (UNESCO Hill Forts of Rajasthan),
 * Mewar Sisodia dynasty, Vijay Stambh, Kirti Stambh, Padmini Palace, and historic sieges.
 */

const CHITTORGARH_INFO = {
    id: "chittorgarh-fort",
    title: "Chittorgarh Fort (Pride & Legacy of Mewar)",
    location: "Chittorgarh, Rajasthan, India",
    plateauArea: "700 Acres (2.8 sq km) perched atop a 180m hill",
    dynasty: "Guhila & Sisodia Rajput Dynasties of Mewar",
    unescoStatus: "UNESCO World Heritage Site (Hill Forts of Rajasthan, 2013)",
    sacredWaterSource: "Gaumukh Reservoir (Perennial cow-mouth spring)",
    quickStats: [
        { label: "Plateau Area", value: "700 Acres", icon: "🏰" },
        { label: "Elevation", value: "180m Hilltop", icon: "⛰️" },
        { label: "UNESCO Status", value: "World Heritage (2013)", icon: "🏛️" },
        { label: "Tower of Victory", value: "Vijay Stambh (37.2m)", icon: "🗼" },
        { label: "Tower of Fame", value: "Kirti Stambh (22m)", icon: "✨" },
        { label: "State", value: "Rajasthan, India", icon: "📍" }
    ]
};

const ICONIC_MONUMENTS = [
    {
        name: "Vijay Stambh (Tower of Victory)",
        builtBy: "Maharana Kumbha (1448 CE)",
        height: "37.2 Meters (9 Storeys)",
        description: "Exquisite red sandstone and marble tower adorned with intricate Hindu carvings, erected to commemorate victory over Mahmud Khilji of Malwa.",
        icon: "🗼"
    },
    {
        name: "Kirti Stambh (Tower of Fame)",
        builtBy: "Jijaji Kathod (12th Century CE)",
        height: "22 Meters (7 Storeys)",
        description: "Magnificent Solanki-style Jain tower dedicated to Bhagavan Rishabhanatha (Adinatha), the first Jain Tirthankara.",
        icon: "✨"
    },
    {
        name: "Rana Kumbha Palace",
        builtBy: "Maharana Kumbha (15th Century)",
        height: "Multi-level Royal Complex",
        description: "Oldest royal palace within the fort complex; birthplace of Maharana Udai Singh and residence of saint-poetess Meera Bai.",
        icon: "👑"
    },
    {
        name: "Padmini Palace & Water Pavilion",
        builtBy: "Rana Ratan Singh (13th Century)",
        height: "Island Pavilion in Lake",
        description: "Three-storey white pavilion situated in the middle of a lotus pond, associated with the legendary Rani Padmini.",
        icon: "🌊"
    },
    {
        name: "Meera Bai Temple & Kumbha Shyam",
        builtBy: "Maharana Kumbha (1449 CE)",
        height: "Nagara Dravida Temple",
        description: "Temple where saint-poetess Meera Bai composed devotional bhajans to Lord Krishna; features a vaulted sanctum and stone carvings.",
        icon: "🛕"
    },
    {
        name: "Gaumukh Reservoir",
        builtBy: "Ancient Mewar Engineers",
        height: "Perennial Spring Tank",
        description: "Deep sacred water tank fed by a subterranean natural spring emerging through a carved cow-face stone spout.",
        icon: "💧"
    }
];

const HISTORIC_SIEGES = [
    {
        year: "1303 CE",
        invader: "Sultan Alauddin Khilji (Delhi Sultanate)",
        defender: "Rawal Ratan Singh & Rajput Warriors",
        outcome: "After a protracted eight-month siege, Rajput forces fell in battle; Rani Padmini led the historic first Jauhar."
    },
    {
        year: "1535 CE",
        invader: "Sultan Bahadur Shah of Gujarat",
        defender: "Rani Karnavati (Regent of Mewar)",
        outcome: "Fort was defended gallantly under Bagh Singh; Rani Karnavati sent a Rakhi to Mughal Emperor Humayun before leading the second Jauhar."
    },
    {
        year: "1567–1568 CE",
        invader: "Mughal Emperor Akbar",
        defender: "Jaimal Rathore & Patta Sisodia",
        outcome: "Heroic defense immortalized in Rajput folklore; Akbar later erected statues of Jaimal and Patta at Agra Fort in tribute."
    }
];

const TIMELINE_EVENTS = [
    { year: "7th Century CE", title: "Founding of Chitrakoot Fort", description: "Established by the Mori Rajput ruler Chitrangada Mori, naming it Chitrakoot (later Chittor)." },
    { year: "734 CE", title: "Bappa Rawal Captures Chittor", description: "Bappa Rawal defeats the Mori rulers and founds the illustrious Guhila dynasty of Mewar." },
    { year: "1303 CE", title: "First Siege of Chittorgarh", description: "Alauddin Khilji captures the fort; later restored by Rana Hammir Singh, founding the Sisodia dynasty." },
    { year: "1448 CE", title: "Construction of Vijay Stambh", description: "Maharana Kumbha constructs the iconic 9-storey Tower of Victory." },
    { year: "1568 CE", title: "Final Siege & Shift to Udaipur", description: "Akbar sacks Chittorgarh; Maharana Udai Singh II establishes Udaipur as the new capital of Mewar." },
    { year: "2013 CE", title: "UNESCO World Heritage Inscription", description: "Chittorgarh Fort is inscribed as a UNESCO World Heritage Site under the Hill Forts of Rajasthan." }
];

const REFERENCES = [
    { text: "Archaeological Survey of India (ASI) — Chittorgarh Fort Monument Guide.", link: "https://asi.nic.in" },
    { text: "Tod, James (1829). Annals and Antiquities of Rajast'han. London: Smith, Elder & Co.", link: "#" },
    { text: "UNESCO World Heritage Centre — Hill Forts of Rajasthan (No. 247).", link: "https://whc.unesco.org" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHITTORGARH_INFO, ICONIC_MONUMENTS, HISTORIC_SIEGES, TIMELINE_EVENTS, REFERENCES };
}

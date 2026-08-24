/**
 * Golconda Fort Explorer — Data Module
 * Comprehensive dataset covering Golconda Fort (Hyderabad, Telangana),
 * Qutb Shahi dynasty, acoustic engineering, diamond trade capital, and fortifications.
 */

const GOLCONDA_INFO = {
    id: "golconda-fort",
    title: "Golconda Fort (Hyderabad's Historic Fortress)",
    location: "Hyderabad, Telangana, India",
    elevation: "120m Granite Hill (400 ft) surrounded by 10km ramparts",
    dynasty: "Kakatiya Origins & Qutb Shahi Dynasty (1518–1687 CE)",
    diamondHeritage: "Global Trade Hub for Koh-i-Noor, Hope Diamond, & Daria-i-Noor",
    acousticMarvel: "Clap at Fateh Darwaza clearly heard at Bala Hissar (1km away)",
    quickStats: [
        { label: "Founded Era", value: "Kakatiya / Qutb Shahi", icon: "🏰" },
        { label: "Elevation", value: "120m Hilltop", icon: "⛰️" },
        { label: "Gates & Bastions", value: "8 Gates, 87 Bastions", icon: "🚪" },
        { label: "Acoustic Wonder", value: "1km Clap Resonance", icon: "👏" },
        { label: "Diamond Capital", value: "Koh-i-Noor & Hope", icon: "💎" },
        { label: "Location", value: "Hyderabad, Telangana", icon: "📍" }
    ]
};

const ARCHITECTURAL_SECTIONS = [
    {
        name: "Acoustic Communication System",
        category: "Engineering Innovation",
        description: "Sophisticated dome architecture at Fateh Darwaza where a hand clap creates an acoustic echo resonating to the highest Bala Hissar pavilion, serving as an ancient early-warning military alarm.",
        icon: "👏"
    },
    {
        name: "Fateh Darwaza (Victory Gate)",
        category: "Fortification & Defense",
        description: "Massive teakwood gate reinforced with elephant-deterrent steel spikes and defensive machicolations through which molten lead or oil could be poured upon invaders.",
        icon: "🚪"
    },
    {
        name: "Bala Hissar & Baradari",
        category: "Royal Architecture",
        description: "The three-storey royal palace and council pavilion perched atop the summit, offering 360-degree panoramic views across Hyderabad and Secunderabad.",
        icon: "👑"
    },
    {
        name: "Golconda Diamond Vaults (Kollur Mines)",
        category: "Commercial Heritage",
        description: "Vaults that stored raw and cut diamonds from the Krishna River basin mines; birthplace of the Koh-i-Noor, Hope Diamond, and Daria-i-Noor.",
        icon: "💎"
    },
    {
        name: "Ibrahim Mosque & Royal Hammam",
        category: "Qutb Shahi Religious & Civic",
        description: "Constructed during Ibrahim Qutb Shah's reign, featuring Turkish baths (hammam) with intricate clay water heating channels and Persian stucco art.",
        icon: "🕌"
    }
];

const HISTORIC_SIEGES = [
    {
        year: "1687 CE",
        invader: "Mughal Emperor Aurangzeb",
        defender: "Abul Hasan Qana Shah (Tana Shah)",
        outcome: "Mughal army besieged the fort for eight months without success until a bribed general, Abdullah Khan Panni, opened the Fateh Darwaza at night."
    }
];

const TIMELINE_EVENTS = [
    { year: "1143 CE", title: "Kakatiya Mud Fort", description: "First mud fort erected on the hill by the Kakatiya rulers of Warangal, named Golla Konda (Shepherd's Hill)." },
    { year: "1518 CE", title: "Qutb Shahi Capital Established", description: "Sultan Quli Qutb-ul-Mulk declares independence, converting the mud fort into a massive granite citadel." },
    { year: "1591 CE", title: "Expansion to Hyderabad City", description: "Muhammad Quli Qutb Shah expands capital beyond the fort walls, founding the city of Hyderabad and building Charminar." },
    { year: "1687 CE", title: "Mughal Conquest of Golconda", description: "Aurangzeb captures Golconda Fort after an 8-month siege, ending the Qutb Shahi dynasty." },
    { year: "Present Day", title: "ASI Protected Monument", description: "Maintained by Archaeological Survey of India with world-famous Sound & Light shows celebrating Deccan history." }
];

const REFERENCES = [
    { text: "Archaeological Survey of India (ASI) — Golconda Fort Hyderabad.", link: "https://asi.nic.in" },
    { text: "Bilgrami, Syed Ali Asghar (1927). The Landmarks of the Deccan. Government Press, Hyderabad.", link: "#" },
    { text: "Michell, George & Zebrowski, Mark (1999). Architecture and Art of the Deccan Sultanates. Cambridge University Press.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GOLCONDA_INFO, ARCHITECTURAL_SECTIONS, HISTORIC_SIEGES, TIMELINE_EVENTS, REFERENCES };
}

/**
 * Gwalior Fort Explorer — Data Module
 * Comprehensive dataset covering Gwalior Fort (Gopachal Hill, Madhya Pradesh),
 * Tomar Dynasty, Man Singh Palace, Teli Ka Mandir, Sas Bahu Temples, and Gopachal Jain sculptures.
 */

const GWALIOR_INFO = {
    id: "gwalior-fort",
    title: "Gwalior Fort (The Pearl in the Necklace of Hind)",
    location: "Gwalior, Madhya Pradesh, India",
    hilltopSetting: "Gopachal Sandstone Ridge (3km length, 35m cliff walls)",
    royalDynasties: "Pratihara, Kachchhapaghata, Tomar, Mughal, & Scindia",
    baburEpithet: "The Pearl in the necklace of the forts of Hind",
    sikhHeritage: "Gurdwara Data Bandi Chhor (Release of 52 Kings in 1619)",
    quickStats: [
        { label: "Hilltop Elevation", value: "100m High Cliff", icon: "⛰️" },
        { label: "Crown Palace", value: "Man Mandir Palace", icon: "🏰" },
        { label: "Ancient Temple", value: "Teli Ka Mandir (30m)", icon: "🛕" },
        { label: "Jain Colossus", value: "17m Rishabhanatha", icon: "🗿" },
        { label: "Babur Epithet", value: "Pearl of Forts", icon: "✨" },
        { label: "Location", value: "Gwalior, MP", icon: "📍" }
    ]
};

const PALACES_AND_TEMPLES = [
    {
        name: "Man Mandir Palace",
        builtBy: "Raja Man Singh Tomar (1486–1516 CE)",
        architecture: "Tomar Rajput Architecture with Enameled Tiles",
        description: "Four-storey palace famed for its turquoise, yellow, and green glazed ceramic tilework depicting ducks, elephants, tigers, and floral bands.",
        icon: "🏰"
    },
    {
        name: "Gujari Mahal (Archaeological Museum)",
        builtBy: "Raja Man Singh Tomar (15th Century)",
        architecture: "Stone Palace Complex",
        description: "Built for Queen Mrignayani; now houses the Gwalior Archaeological Museum including the celebrated Shalabhanjika yakshi sculpture.",
        icon: "👑"
    },
    {
        name: "Teli Ka Mandir",
        builtBy: "Gurjara-Pratihara Dynasty (8th/9th Century)",
        architecture: "Syncretic Dravidian Valabhi & Nagara",
        description: "30-meter high grand temple boasting a barrel-vaulted Dravidian gopuram roof atop Nagara sanctum walls, dedicated to Shiva and Matrikas.",
        icon: "🛕"
    },
    {
        name: "Sas Bahu Temples (Sahastrabahu)",
        builtBy: "King Mahipala (Kachchhapaghata Dynasty, 1093 CE)",
        architecture: "Intricately Carved Red Sandstone",
        description: "Twin 11th-century Vishnu temples featuring open multi-tier pillared mandapas and deeply carved celestial nymph sculptures.",
        icon: "✨"
    },
    {
        name: "Gopachal Parvat Jain Colossal Sculptures",
        builtBy: "Tomar Dynasty (7th–15th Century CE)",
        architecture: "Monolithic Rock-Cut Statues",
        description: "Nearly 1,500 rock-cut Jain sculptures carved directly into the cliff faces, crowned by the 17-meter (57 ft) tall standing colossus of Bhagavan Adinatha.",
        icon: "🗿"
    },
    {
        name: "Gurdwara Data Bandi Chhor",
        builtBy: "Sikh Community (Honoring Guru Hargobind Ji)",
        architecture: "White Marble Gurdwara",
        description: "Commemorates Guru Hargobind Ji's release from imprisonment by Emperor Jahangir in 1619, successfully negotiating the liberation of 52 imprisoned Rajput princes.",
        icon: "🕊️"
    }
];

const TIMELINE_EVENTS = [
    { year: "6th Century CE", title: "Huna Rule & Sun Temple Inscription", description: "Huna king Toramana and Mihirakula build a Sun Temple on the Gwalior hill recorded in Gwalior stone inscription." },
    { year: "875 CE", title: "Gurjara-Pratihara Period", description: "King Mihira Bhoja's reign oversees Chaturbhuj Temple inscription containing the world's oldest written mathematical zero '0'." },
    { year: "1093 CE", title: "Sas Bahu Temples Completed", description: "Kachchhapaghata king Mahipala consecrates the grand Sahastrabahu twin temple complex." },
    { year: "1486–1516 CE", title: "Golden Era of Raja Man Singh Tomar", description: "Construction of the magnificent Man Mandir Palace and patronage of classical Gwalior Gharana music." },
    { year: "1619 CE", title: "Guru Hargobind Ji & 52 Kings Release", description: "The 6th Sikh Guru secures freedom for 52 royal captives, establishing the Bandi Chhor legacy." },
    { year: "1858 CE", title: "1857 Rebellion & Rani Lakshmibai", description: "Rani Lakshmibai of Jhansi makes her legendary heroic stand against British forces near Gwalior Fort." }
];

const REFERENCES = [
    { text: "Archaeological Survey of India (ASI) — Gwalior Fort Monument Guide.", link: "https://asi.nic.in" },
    { text: "Cunningham, Alexander (1871). Archaeological Survey of India Report for the Year 1862-65 (Vol. II).", link: "#" },
    { text: "Nath, R. (1984). The Art of Gwalior. Heritage Publishers, New Delhi.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GWALIOR_INFO, PALACES_AND_TEMPLES, TIMELINE_EVENTS, REFERENCES };
}

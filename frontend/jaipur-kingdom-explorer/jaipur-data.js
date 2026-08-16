/**
 * Kingdom of Jaipur Explorer — Data Module
 * Comprehensive dataset covering historical overview, timeline, major rulers,
 * planned city architecture, UNESCO astronomical observatories, gallery, and references.
 */

const JAIPUR_INFO = {
    id: "jaipur-kingdom",
    name: "Kingdom of Jaipur (Dhundhar)",
    motto: "Yato Dharmastato Jaya (Where there is Dharma, there is Victory)",
    capital: "Amer (until 1727) / Jaipur (Pink City)",
    period: "1128 – 1949 CE",
    stateRegion: "Eastern Rajasthan (India)",
    dynasty: "Kachwaha Rajput Dynasty",
    architecturalFeat: "First Planned City of Medieval India",
    quickStats: [
        { label: "Founded Era", value: "1128 CE", icon: "👑" },
        { label: "Capital Shift", value: "Jaipur (1727)", icon: "🏛️" },
        { label: "City Planner", value: "Sawai Jai Singh II", icon: "📐" },
        { label: "UNESCO World Heritage", value: "Jantar Mantar & Amer", icon: "🔭" },
        { label: "Iconic Palace", value: "Hawa Mahal", icon: "🏰" },
        { label: "Accession", value: "1949 to India", icon: "🇮🇳" }
    ]
};

const TIMELINE_DATA = [
    { year: "1128 CE", title: "Founding of Dhundhar Kingdom", description: "Dulha Rai establishes the Kachwaha kingdom of Dhundhar in Amber region." },
    { year: "1590–1614 CE", title: "Reign of Raja Man Singh I", description: "Man Singh I serves as chief general of Mughal Empire, expands kingdom wealth, and constructs the magnificent Amer Fort." },
    { year: "1727 CE", title: "Foundation of Jaipur City", description: "Maharaja Sawai Jai Singh II founds Jaipur, designing India's first grid-planned city with architect Vidyadhar Bhattacharya." },
    { year: "1728–1734 CE", title: "Construction of Jantar Mantar", description: "Sawai Jai Singh II erects 19 architectural astronomical instruments in Jaipur, creating the world's largest stone sundial." },
    { year: "1799 CE", title: "Building of Hawa Mahal", description: "Maharaja Sawai Pratap Singh constructs the 5-story honeycomb facade Hawa Mahal (Palace of Winds)." },
    { year: "1876 CE", title: "The Pink City Transformation", description: "Maharaja Sawai Ram Singh II paints the entire city pink to welcome Prince of Wales Albert Edward, giving Jaipur its iconic epithet." },
    { year: "1949 CE", title: "Integration into Rajasthan State", description: "Maharaja Sawai Man Singh II signs accession, making Jaipur the capital city of modern Rajasthan." }
];

const RULERS_DATA = [
    {
        name: "Raja Man Singh I (1589–1614)",
        role: "Grand General & Fort Builder",
        achievements: "Renowned Rajput general who expanded Dhundhar territory, patronized arts, and constructed the original Amber Palace complex."
    },
    {
        name: "Maharaja Sawai Jai Singh II (1699–1743)",
        role: "Astronomer & Master City Planner",
        achievements: "Founded Jaipur in 1727 using Vedic Vastu principles; constructed 5 Jantar Mantar observatories across northern India."
    },
    {
        name: "Maharaja Sawai Ram Singh II (1835–1880)",
        role: "Reformist & Patron of Pink Heritage",
        achievements: "Painted Jaipur pink in 1876, introduced gas streetlights, piped water supply, modern education, and Ram Niwas Garden."
    },
    {
        name: "Maharaja Sawai Man Singh II (1922–1949)",
        role: "Last Ruling Maharaja & Diplomat",
        achievements: "Modernized administration, served as Rajpramukh of Rajasthan state, and international ambassador for Indian sports and culture."
    }
];

const CONTRIBUTIONS_DATA = {
    overview: "The Kingdom of Jaipur was celebrated across Asia for its revolutionary urban grid design, astronomical observatories, textiles, and royal Rajput heritage.",
    plannedCityDesign: "Designed by Vidyadhar Bhattacharya based on Shilpa Shastra, dividing Jaipur into 9 rectangular blocks representing 9 planets (Navagraha).",
    astronomyJantarMantar: "Sawai Jai Singh II created Jantar Mantar (UNESCO site), featuring Vrihat Samrat Yantra — a 27-meter tall sundial accurate to 2 seconds.",
    architectureForts: "Monuments include Amer Fort (UNESCO World Heritage), Jaigarh Fort (housing Jaivana, world's largest cannon on wheels), Nahargarh Fort, and City Palace.",
    handicraftsArts: "Fostered Jaipur's famous craft guilds including Blue Pottery, Jaipuri Block Printing, Kundan Meenakari jewelry, and Ghoomar folk dance."
};

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Hawa_Mahal_Jaipur_2019.jpg/800px-Hawa_Mahal_Jaipur_2019.jpg",
        caption: "Hawa Mahal (Palace of Winds) — 953 intricate jharokhas built in 1799",
        category: "Architecture"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Amber_Fort_Jaipur_India.jpg/800px-Amber_Fort_Jaipur_India.jpg",
        caption: "Amer Fort & Maota Lake — Hilltop fortress of the Kachwaha rulers",
        category: "Heritage"
    }
];

const REFERENCES = [
    { text: "Tillotson, Giles (2006). Jaipur: The Making of an Indian City. Penguin Books India.", link: "#" },
    { text: "Sarkar, Jadunath (1984). A History of Jaipur: c. 1503-1938. Orient Longman.", link: "#" },
    { text: "Sharma, Virendra Nath (1995). Sawai Jai Singh and His Astronomy. Motilal Banarsidass.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JAIPUR_INFO, TIMELINE_DATA, RULERS_DATA, CONTRIBUTIONS_DATA, GALLERY_IMAGES, REFERENCES };
}

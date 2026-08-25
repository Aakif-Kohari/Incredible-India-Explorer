/**
 * Beighton Cup Hockey Explorer — Data Module
 * Comprehensive dataset covering the Beighton Cup (World's Oldest Field Hockey Tournament, Est. 1895),
 * Kolkata hockey heritage, Bengal Hockey Association (BHA), historic winners (Mohun Bagan 14 titles, Dhyan Chand's Jhansi Heroes),
 * and tournament evolution timeline.
 */

const BEIGHTON_INFO = {
    id: "beighton-cup",
    title: "Beighton Cup: World's Oldest Hockey Tournament",
    foundedYear: "1895 CE",
    founder: "T.D. Beighton (Bengal Legal Commissioner, ICS)",
    venue: "Kolkata, West Bengal (Mohun Bagan Ground / SAI Eastern Centre)",
    governingBody: "Bengal Hockey Association (BHA / Hockey Bengal)",
    recordChampions: "Mohun Bagan AC (14 Titles) & Calcutta Customs",
    historicSignificance: "Precedes Olympic hockey by 13 years; graced by hockey wizard Major Dhyan Chand",
    quickStats: [
        { label: "Founded Year", value: "1895", icon: "🏑" },
        { label: "World Status", value: "Oldest Hockey Cup", icon: "🏆" },
        { label: "Record Champion", value: "Mohun Bagan (14x)", icon: "⭐" },
        { label: "Host City", value: "Kolkata, WB", icon: "📍" },
        { label: "Legendary Icon", value: "Major Dhyan Chand", icon: "👑" },
        { label: "Silver Trophy", value: "Handcrafted 1895 Cup", icon: "✨" }
    ]
};

const HISTORIC_CHAMPIONS = [
    {
        club: "Mohun Bagan Athletic Club",
        titles: 14,
        description: "The most successful club in Beighton Cup history, winning across multiple golden eras of Indian club hockey.",
        icon: "🏆"
    },
    {
        club: "Calcutta Customs Club",
        titles: 11,
        description: "Pioneering institutional team that dominated the tournament from the early 1900s through the mid-20th century.",
        icon: "⚓"
    },
    {
        club: "Jhansi Heroes (Dhyan Chand Era)",
        titles: 3,
        description: "Led by hockey wizard Major Dhyan Chand and his brother Roop Singh, mesmerizing Kolkata crowds with artistic stickwork in the 1930s.",
        icon: "⭐"
    },
    {
        club: "Border Security Force (BSF)",
        titles: 6,
        description: "Powerhouse paramilitary squad renowned for physical stamina, clinical penalty corner conversions, and defensive grit.",
        icon: "🛡️"
    },
    {
        club: "Indian Oil Corporation (IOC)",
        titles: 5,
        description: "Modern era powerhouse fielding Indian national team stars like V.R. Raghunath, Deepak Thakur, and Prabhjot Singh.",
        icon: "⚡"
    }
];

const TIMELINE_EVENTS = [
    { year: "1895 CE", title: "Inaugural Tournament in Kolkata", description: "Instituted on the Maidan by T.D. Beighton; Naval Volunteers become the inaugural champions." },
    { year: "1905 CE", title: "First Indian Winner (Calcutta Customs)", description: "Calcutta Customs breaks colonial military dominance, signaling the rise of domestic hockey talent." },
    { year: "1935 CE", title: "Major Dhyan Chand & Jhansi Heroes", description: "Major Dhyan Chand leads Jhansi Heroes to historic Beighton Cup glory before cheering crowds on the Kolkata Maidan." },
    { year: "1960s–1970s", title: "Golden Era of Mohun Bagan", description: "Mohun Bagan strings together historic title runs featuring Olympic gold medalists Leslie Claudius and Gurbux Singh." },
    { year: "2019 CE", title: "123rd Beighton Cup Edition", description: "Indian Oil Corporation clinches the title in a thrilling final against Punjab National Bank at the SAI Eastern Centre." },
    { year: "Present Day", title: "Centuries-Old Living Heritage", description: "Maintained by Hockey Bengal as the crown jewel of Indian domestic field hockey heritage." }
];

const REFERENCES = [
    { text: "Bengal Hockey Association (Hockey Bengal) — Beighton Cup Tournament Roll of Honour.", link: "https://www.hockeybengal.org" },
    { text: "Dhyan Chand (1952). Goal! The Autobiography of Hockey Wizard Dhyan Chand. Sport & Pastime, Chennai.", link: "#" },
    { text: "Sen, Ronojoy (2015). Nation at Play: A History of Sport in India. Columbia University Press.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BEIGHTON_INFO, HISTORIC_CHAMPIONS, TIMELINE_EVENTS, REFERENCES };
}

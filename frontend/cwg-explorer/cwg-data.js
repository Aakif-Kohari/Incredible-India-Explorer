/**
 * Commonwealth Games Explorer — Data Module
 * Comprehensive dataset covering India's sporting journey at the Commonwealth Games (1934–2022),
 * host cities, total medal tally, iconic champions (Milkha Singh, Delhi 2010 glory),
 * top sporting disciplines, and edition-by-edition medal timeline.
 */

const CWG_INFO = {
    id: "cwg-india",
    title: "India at the Commonwealth Games",
    debutYear: "1934 London Games (2nd Edition)",
    allTimeMedals: "564 Medals (203 Gold, 190 Silver, 171 Bronze)",
    bestPerformance: "Delhi 2010 (101 Medals, 38 Gold — Ranked 2nd Overall)",
    firstMedalist: "Rashid Anwar (Bronze, Wrestling, 1934 London)",
    firstGoldMedalist: "Milkha Singh 'The Flying Sikh' (440 Yards, 1958 Cardiff)",
    quickStats: [
        { label: "Debut Edition", value: "1934 London", icon: "🇬🇧" },
        { label: "Total Medals", value: "564 Medals", icon: "🏆" },
        { label: "Gold Medals", value: "203 Golds", icon: "🥇" },
        { label: "Record Finish", value: "101 Medals (2010)", icon: "🌟" },
        { label: "First Gold", value: "Milkha Singh (1958)", icon: "🏃" },
        { label: "Top Disciplines", value: "Shooting & Wrestling", icon: "🎯" }
    ]
};

const CWG_EDITIONS = [
    {
        year: "1934",
        city: "London, England",
        gold: 0,
        silver: 0,
        bronze: 1,
        total: 1,
        highlights: "Rashid Anwar wins India's historic first-ever CWG medal in Welterweight Freestyle Wrestling."
    },
    {
        year: "1958",
        city: "Cardiff, Wales",
        gold: 2,
        silver: 1,
        bronze: 0,
        total: 3,
        highlights: "Milkha Singh wins India's first CWG Gold in 440 yards; Lila Ram wins gold in Heavyweight Wrestling."
    },
    {
        year: "2002",
        city: "Manchester, England",
        gold: 30,
        silver: 22,
        bronze: 17,
        total: 69,
        highlights: "Indian Women's Hockey Team wins unforgettable gold ('Chak De' moment); major haul in shooting and weightlifting."
    },
    {
        year: "2010",
        city: "Delhi, India (Host Nation)",
        gold: 38,
        silver: 27,
        bronze: 36,
        total: 101,
        highlights: "India's greatest performance in CWG history, crossing 100 medals for the first time and finishing 2nd in medal table."
    },
    {
        year: "2018",
        city: "Gold Coast, Australia",
        gold: 26,
        silver: 20,
        bronze: 20,
        total: 66,
        highlights: "Neeraj Chopra wins javelin gold; Saina Nehwal edges PV Sindhu in all-Indian badminton final; Table Tennis cleans up medals."
    },
    {
        year: "2022",
        city: "Birmingham, England",
        gold: 22,
        silver: 16,
        bronze: 23,
        total: 61,
        highlights: "Sharath Kamal wins 4 table tennis medals; historic Lawn Bowls Women's Fours gold; Eldhose Paul gold in Triple Jump."
    }
];

const LEGENDARY_ATHLETES = [
    {
        name: "Milkha Singh",
        sport: "Athletics (440 Yards)",
        medal: "🥇 Gold (Cardiff 1958)",
        description: "The Flying Sikh made history as independent India's first individual gold medalist at the Commonwealth Games.",
        icon: "🏃"
    },
    {
        name: "Abhinav Bindra",
        sport: "Shooting (10m Air Rifle)",
        medal: "🥇 9 CWG Medals (4 Gold)",
        description: "Olympic Champion who dominated international shooting, setting Commonwealth championship records.",
        icon: "🎯"
    },
    {
        name: "Sharath Kamal",
        sport: "Table Tennis",
        medal: "🥇 13 CWG Medals (7 Gold)",
        description: "Legendary table tennis icon with gold medals spanning 16 years from Melbourne 2006 to Birmingham 2022.",
        icon: "🏓"
    },
    {
        name: "Mirabai Chanu",
        sport: "Weightlifting (49kg)",
        medal: "🥇 2 Gold, 1 Silver",
        description: "Dominant world-record holder delivering back-to-back gold medals in Gold Coast 2018 and Birmingham 2022.",
        icon: "🏋️‍♀️"
    }
];

const REFERENCES = [
    { text: "Commonwealth Sport (CGF) — India Commonwealth Games Archive.", link: "https://www.commonwealthsport.com" },
    { text: "Indian Olympic Association (IOA) — Official CWG Participation Records.", link: "https://www.olympic.ind.in" },
    { text: "Majumdar, Boria & Mehta, Nalin (2010). India and the Olympics. Routledge.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CWG_INFO, CWG_EDITIONS, LEGENDARY_ATHLETES, REFERENCES };
}

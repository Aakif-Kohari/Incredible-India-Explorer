/**
 * Incredible India Explorer — Pro Kabaddi League Trophy
 * Data Repository (Issue #2549)
 *
 * Covers the complete PKL archive: trophy, teams, seasons, champions,
 * star players, venues, and major records.
 */

export const pklTrophy = {
  name: "Pro Kabaddi League Trophy",
  inaugurated: 2014,
  governedBy: "Mashal Sports (a Star India subsidiary) & Amateur Kabaddi Federation of India (AKFI)",
  material: "Silver-plated brass with gold accent",
  height: "60 cm",
  awardedTo: "The franchise that wins the PKL Grand Final",
  design: "A polished silver Kabaddi raider mid-lunge, mounted on a teakwood base inscribed with the names of every champion franchise since 2014.",
  significance:
    "The PKL Trophy is the symbol of modern professional Kabaddi in India. Modeled on the raiding pose that defines the sport, it represents the transformation of an indigenous village pastime into a televised league watched by 200+ million viewers. The trophy is hoisted by the winning captain at the end of each season's Grand Final, usually held in Mumbai or Hyderabad.",
};

export const pklTeams = [
  { id: "bengaluru-bulls", name: "Bengaluru Bulls", city: "Bengaluru, Karnataka", founded: 2014, homeVenue: "Shree Kanteerava Indoor Stadium", titles: 1, primaryColor: "#e63946" },
  { id: "bengal-warriors", name: "Bengal Warriors", city: "Kolkata, West Bengal", founded: 2014, homeVenue: "Netaji Indoor Stadium", titles: 1, primaryColor: "#f4a261" },
  { id: "dabang-delhi", name: "Dabang Delhi K.C.", city: "New Delhi", founded: 2014, homeVenue: "Thyagaraj Sports Complex", titles: 1, primaryColor: "#d62828" },
  { id: "jaipur-pink-panthers", name: "Jaipur Pink Panthers", city: "Jaipur, Rajasthan", founded: 2014, homeVenue: "Sawai Mansingh Indoor Stadium", titles: 2, primaryColor: "#ff6f91" },
  { id: "patna-pirates", name: "Patna Pirates", city: "Patna, Bihar", founded: 2014, homeVenue: "Patna Indoor Stadium", titles: 3, primaryColor: "#264653" },
  { id: "puneri-paltan", name: "Puneri Paltan", city: "Pune, Maharashtra", founded: 2014, homeVenue: "Shree Shiv Chhatrapati Sports Complex", titles: 1, primaryColor: "#ffb703" },
  { id: "u-mumba", name: "U Mumba", city: "Mumbai, Maharashtra", founded: 2014, homeVenue: "NSCI Dome", titles: 1, primaryColor: "#fcbf49" },
  { id: "telugu-titans", name: "Telugu Titans", city: "Hyderabad / Visakhapatnam", founded: 2014, homeVenue: "Gachibowli Indoor Stadium", titles: 0, primaryColor: "#7209b7" },
  { id: "haryana-steelers", name: "Haryana Steelers", city: "Panchkula, Haryana", founded: 2017, homeVenue: "Tau Devi Lal Indoor Stadium", titles: 0, primaryColor: "#1d3557" },
  { id: "gujarat-giants", name: "Gujarat Giants", city: "Ahmedabad, Gujarat", founded: 2014, homeVenue: "The Arena by TransStadia", titles: 0, primaryColor: "#06d6a0" },
  { id: "tamil-thalaivas", name: "Tamil Thalaivas", city: "Chennai, Tamil Nadu", founded: 2017, homeVenue: "Jawaharlal Nehru Indoor Stadium", titles: 0, primaryColor: "#bc4749" },
  { id: "up-yoddha", name: "UP Yoddha", city: "Lucknow, Uttar Pradesh", founded: 2017, homeVenue: "Babu Banarasi Das Indoor Stadium", titles: 0, primaryColor: "#577590" },
];

export const pklSeasons = [
  { season: 1, year: 2014, champion: "Jaipur Pink Panthers", runnerUp: "U Mumba", topRaider: "Anup Kumar", topDefender: "Manjeet Chillar", mvp: "Anup Kumar" },
  { season: 2, year: 2015, champion: "U Mumba", runnerUp: "Bengaluru Bulls", topRaider: "Anup Kumar", topDefender: "Manjeet Chillar", mvp: "Anup Kumar" },
  { season: 3, year: 2016, champion: "Patna Pirates", runnerUp: "U Mumba", topRaider: "Pardeep Narwal", topDefender: "Manjeet Chillar", mvp: "Pardeep Narwal" },
  { season: 4, year: 2016, champion: "Patna Pirates", runnerUp: "Jaipur Pink Panthers", topRaider: "Pardeep Narwal", topDefender: "Fazel Atrachali", mvp: "Pardeep Narwal" },
  { season: 5, year: 2017, champion: "Patna Pirates", runnerUp: "Gujarat Giants (Fortunegiants)", topRaider: "Pardeep Narwal", topDefender: "Fazel Atrachali", mvp: "Pardeep Narwal" },
  { season: 6, year: 2018, champion: "Bengaluru Bulls", runnerUp: "Gujarat Giants (Fortunegiants)", topRaider: "Pawan Sehrawat", topDefender: "Sandeep Narwal", mvp: "Pawan Sehrawat" },
  { season: 7, year: 2019, champion: "Bengal Warriors", runnerUp: "Dabang Delhi K.C.", topRaider: "Pawan Sehrawat", topDefender: "Fazel Atrachali", mvp: "Naveen Kumar" },
  { season: 8, year: 2021, champion: "Dabang Delhi K.C.", runnerUp: "Patna Pirates", topRaider: "Naveen Kumar", topDefender: "Mohammadreza Chiyaneh", mvp: "Naveen Kumar" },
  { season: 9, year: 2022, champion: "Jaipur Pink Panthers", runnerUp: "Puneri Paltan", topRaider: "Arjun Deshwal", topDefender: "Mohammadreza Chiyaneh", mvp: "Arjun Deshwal" },
  { season: 10, year: 2023, champion: "Puneri Paltan", runnerUp: "Haryana Steelers", topRaider: "Arjun Deshwal", topDefender: "Mohammadreza Chiyaneh", mvp: "Aslam Inamdar" },
];

export const pklChampions = [
  { team: "Patna Pirates", titles: 3, seasonsWon: [2016, 2016, 2017] },
  { team: "Jaipur Pink Panthers", titles: 2, seasonsWon: [2014, 2022] },
  { team: "Bengaluru Bulls", titles: 1, seasonsWon: [2018] },
  { team: "U Mumba", titles: 1, seasonsWon: [2015] },
  { team: "Bengal Warriors", titles: 1, seasonsWon: [2019] },
  { team: "Dabang Delhi K.C.", titles: 1, seasonsWon: [2021] },
  { team: "Puneri Paltan", titles: 1, seasonsWon: [2023] },
];

export const pklStarPlayers = [
  { id: "pardeep-narwal", name: "Pardeep Narwal", nickname: "'Dubki King'", role: "Raider", team: "Patna Pirates / UP Yoddha", careerPoints: 1690, signatureMove: "Dubki (low-squat dip under defenders)", bio: "Hailing from Sonipat, Haryana, Pardeep redefined raiding in PKL. His signature dubki move — ducking under the chain of defenders — became the league's most-replayed clip. He holds the record for most super-raids (10+ point raids) in PKL history." },
  { id: "anup-kumar", name: "Anup Kumar", nickname: "'Captain Cool'", role: "Raider / Captain", team: "U Mumba / Jaipur Pink Panthers", careerPoints: 931, signatureMove: "Bonus-point specialist", bio: "The first captain to lift the PKL trophy (Season 1, Jaipur Pink Panthers) and again with U Mumba in Season 2. Renowned for ice-cold composure under pressure, Anup was the league's first 'thinking' raider." },
  { id: "pawan-sehrawat", name: "Pawan Sehrawat", nickname: "'Hi-Flyer'", role: "Raider", team: "Bengaluru Bulls", careerPoints: 1340, signatureMove: "Running hand-touch (leap over defenders)", bio: "Bengaluru's talisman from Season 6 onward, Pawan's explosive speed and acrobatic running hand-touch raids made him the league's top raider for three straight seasons (2018, 2019, 2021)." },
  { id: "fazel-atrachali", name: "Fazel Atrachali", nickname: "'Sultan of Iran'", role: "Defender (Left Corner)", team: "Patna Pirates / U Mumba / Puneri Paltan", careerPoints: 510, signatureMove: "Ankle hold from the corner", bio: "Iranian international Fazel is widely regarded as the greatest foreign defender in PKL history. His anticipation and ankle-hold technique earned him the Most Effective Defender award in three seasons." },
  { id: "naveen-kumar", name: "Naveen Kumar", nickname: "'Naveen Express'", role: "Raider", team: "Dabang Delhi K.C.", careerPoints: 1180, signatureMove: "Multi-point raid running hand-touch", bio: "The youngest player to win the MVP award (Season 7), Naveen's explosive raids powered Dabang Delhi to their maiden title in Season 8. Known for his lightning-fast reflexes on the lobby line." },
  { id: "manjeet-chillar", name: "Manjeet Chillar", nickname: "'The All-Rounder'", role: "All-Rounder", team: "Bengaluru Bulls / Jaipur Pink Panthers / Puneri Paltan", careerPoints: 880, signatureMove: "Dash blocks from the cover position", bio: "One of the most versatile players in PKL history. Manjeet was the league's top defender in the first three seasons and the only player to win titles with three different franchises as a core contributor." },
];

export const pklVenues = [
  { id: "nsci-dome", name: "NSCI Dome", city: "Mumbai, Maharashtra", capacity: 5000, hosted: "PKL Season 1 Final + multiple Grand Finals", significance: "The spiritual home of PKL, hosting the league's inaugural auction and the first-ever final in 2014." },
  { id: "gachibowli", name: "Gachibowli Indoor Stadium", city: "Hyderabad, Telangana", capacity: 4000, hosted: "Telugu Titans home leg", significance: "Hosts the Telugu Titans home leg and has witnessed several Fazel Atrachali masterclasses." },
  { id: "kanteerava", name: "Shree Kanteerava Indoor Stadium", city: "Bengaluru, Karnataka", capacity: 4000, hosted: "Bengaluru Bulls home leg + Season 6 Final", significance: "The fortress where Pawan Sehrawat scored his record 39-point raid in a single match." },
  { id: "patna-indoor", name: "Patna Indoor Stadium", city: "Patna, Bihar", capacity: 3000, hosted: "Patna Pirates home leg (3-title dynasty)", significance: "Home to the Patna Pirates dynasty that won three consecutive titles (2016–2017)." },
  { id: "transstadia", name: "The Arena by TransStadia", city: "Ahmedabad, Gujarat", capacity: 4000, hosted: "Gujarat Giants home leg + Season 5 Final", significance: "Hosted the longest PKL match in history during the Season 5 playoffs." },
  { id: "tau-devi-lal", name: "Tau Devi Lal Indoor Stadium", city: "Panchkula, Haryana", capacity: 7000, hosted: "Haryana Steelers home leg + Season 10 Final", significance: "Hosted the Season 10 Grand Final where Puneri Paltan won their maiden title." },
];

export const pklRecords = [
  { id: "most-titles", category: "Team", record: "Most PKL Titles", holder: "Patna Pirates", value: "3 (2016, 2016, 2017)" },
  { id: "most-points-career", category: "Raider", record: "Most Raid Points (Career)", holder: "Pardeep Narwal", value: "1690+" },
  { id: "single-match-raids", category: "Raider", record: "Most Points in a Single Match", holder: "Pawan Sehrawat", value: "39 vs Haryana Steelers (2018)" },
  { id: "most-super-10s", category: "Raider", record: "Most Super 10s in a Season", holder: "Naveen Kumar", value: "22 Super 10s (Season 7)" },
  { id: "tackle-points-career", category: "Defender", record: "Most Tackle Points (Career)", holder: "Fazel Atrachali", value: "510+" },
  { id: "high-5s", category: "Defender", record: "Most High 5s in a Season", holder: "Mohammadreza Chiyaneh", value: "16 High 5s (Season 9)" },
  { id: "longest-unbeaten", category: "Team", record: "Longest Unbeaten Streak", holder: "Patna Pirates", value: "15 matches (Season 5)" },
  { id: "youngest-mvp", category: "Player", record: "Youngest MVP Winner", holder: "Naveen Kumar", value: "20 years old (Season 7)" },
];

export const pklQuizQuestions = [
  {
    id: 1,
    question: "Which franchise has won the most Pro Kabaddi League titles?",
    options: ["Jaipur Pink Panthers", "Patna Pirates", "Bengaluru Bulls", "U Mumba"],
    answer: 1,
    explanation: "Patna Pirates have won 3 titles (Season 3, 4, 5), the only three-peat in PKL history.",
  },
  {
    id: 2,
    question: "Who is known as the 'Dubki King' of Pro Kabaddi?",
    options: ["Anup Kumar", "Naveen Kumar", "Pardeep Narwal", "Pawan Sehrawat"],
    answer: 2,
    explanation: "Pardeep Narwal earned the nickname 'Dubki King' for his signature low-squat dip under defenders' chains.",
  },
  {
    id: 3,
    question: "Which venue hosted the inaugural PKL final in 2014?",
    options: ["Gachibowli Indoor Stadium", "NSCI Dome, Mumbai", "Patna Indoor Stadium", "Shree Kanteerava Indoor Stadium"],
    answer: 1,
    explanation: "The NSCI Dome in Mumbai is considered the spiritual home of PKL, hosting the league's first auction and first final.",
  },
  {
    id: 4,
    question: "Who holds the record for most raid points in a single PKL match (39)?",
    options: ["Pardeep Narwal", "Pawan Sehrawat", "Naveen Kumar", "Anup Kumar"],
    answer: 1,
    explanation: "Pawan Sehrawat scored 39 raid points vs Haryana Steelers in 2018, a record that still stands.",
  },
  {
    id: 5,
    question: "Which Iranian defender is called the 'Sultan of Iran' in PKL?",
    options: ["Mohammadreza Chiyaneh", "Fazel Atrachali", "Abozar Mohajer", "Hadi Oshtorak"],
    answer: 1,
    explanation: "Fazel Atrachali, the left-corner specialist, is widely regarded as the greatest foreign defender in PKL history.",
  },
];

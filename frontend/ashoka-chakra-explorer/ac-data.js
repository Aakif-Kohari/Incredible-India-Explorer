/**
 * Ashoka Chakra Explorer — Comprehensive Data Module
 * Dataset covering Ashoka Chakra history, peacetime heroism significance,
 * medal design, eligibility criteria, key recipients, timeline, and interesting facts.
 */

const AC_INFO = {
    id: "ashoka-chakra",
    name: "Ashoka Chakra Explorer",
    fullTitle: "India's Highest Peacetime Gallantry Award for Extraordinary Courage",
    establishedDate: "4 January 1952 (Instituted as Ashoka Chakra Class I, renamed Ashoka Chakra in 1967)",
    totalRecipients: 90,
    posthumousCount: 68,
    femaleRecipients: 2,
    designer: "India Mint / Government of India Design Bureau",
    symbolism: "The 24-spoked Wheel of Law (Ashoka Chakra) surrounded by a lotus wreath, representing eternal righteousness and valor away from the battlefield",
    ribbonColor: "Green ribbon divided into two equal parts by an orange vertical line (32 mm width)",
    quickStats: [
        { label: "Total Recipients", value: "90 Honorees", icon: "🎖️" },
        { label: "Peacetime Valor Tier", value: "Highest Peacetime Award", icon: "🦁" },
        { label: "Posthumous Citations", value: "68 Awards", icon: "🌹" },
        { label: "Female Recipients", value: "2 Heroes (Neerja & Kamlesh)", icon: "👩" },
        { label: "Civilian Honorees", value: "Multiple Civilians", icon: "🏛️" },
        { label: "Medal Motif", value: "24-Spoke Wheel & Lotus Wreath", icon: "☸️" }
    ]
};

const AC_HISTORY = {
    overview: "The Ashoka Chakra is India's highest peacetime military decoration awarded for the most conspicuous bravery, or some daring or pre-eminent act of valour or self-sacrifice away from the battlefield.",
    evolution: "Instituted on 4 January 1952 as the 'Ashoka Chakra, Class I', it was formally renamed the 'Ashoka Chakra' in 1967 when the three-tier peacetime gallantry awards were reclassified into Ashoka Chakra, Kirti Chakra, and Shaurya Chakra.",
    peacetimeSignificance: "Unlike wartime awards (PVC, MVC, VrC), the Ashoka Chakra honors acts of gallantry performed in counter-terrorism, anti-insurgency, civil defense, hostage rescue, or internal security operations where forces or civilians face enemy combatants or armed threat outside of open declared war."
};

const AC_ELIGIBILITY = {
    title: "Eligibility Criteria",
    description: "The Ashoka Chakra is unique among high military honours because it is open to both military personnel and civilians, men and women alike.",
    categories: [
        { title: "Armed Forces Personnel", detail: "Officers and enlisted personnel of all ranks in the Army, Navy, and Air Force." },
        { title: "Police & Paramilitary", detail: "Members of the Central Reserve Police Force (CRPF), BSF, NSG, Police Forces, and Railway Protection Force." },
        { title: "Civilian Citizens", detail: "Ordinary citizens of all walks of life, including women and youth, who exhibit extraordinary bravery." },
        { title: "Reserve & Auxiliary Services", detail: "Territorial Army, Home Guards, Civil Defence, and emergency response personnel." }
    ]
};

const AC_MEDAL_DESIGN = {
    shape: "Circular gilt bronze disc, 1.375 inches in diameter.",
    obverse: "Embossed replica of the Ashoka Chakra (Wheel of Law) in the center, surrounded by a lotus wreath and an ornamental rim.",
    reverse: "Embossed words 'Ashoka Chakra' in both Hindi ('अशोक चक्र') and English, separated by two lotus flowers.",
    ribbon: "Green silk ribbon, 32 mm in width, divided into two equal halves by a central orange vertical stripe."
};

const AC_HEROISM_TYPES = [
    {
        title: "Counter-Terrorism & Anti-Insurgency",
        icon: "⚡",
        description: "Engaging heavily armed terrorists in urban environments, dense jungles, or high-altitude borders to protect citizens."
    },
    {
        title: "Hostage Rescue & Aircraft Defense",
        icon: "✈️",
        description: "Defending innocent hostages or airline passengers against hijackers at the risk of personal life."
    },
    {
        title: "Capital & Constitutional Protection",
        icon: "🏛️",
        description: "Guarding vital state infrastructure like Parliament, government secretariats, and public landmarks during armed assaults."
    },
    {
        title: "Civilian Courage & Self-Sacrifice",
        icon: "🤝",
        description: "Unarmed citizens sacrificing their safety to thwart bank robberies, dacoit attacks, or violent mobs."
    }
];

const AC_HEROES = [
    {
        id: "neerja-bhanot",
        name: "Neerja Bhanot",
        organization: "Pan Am Airlines (Flight Purser)",
        rank: "Senior Flight Purser",
        year: 1987,
        posthumous: true,
        citation: "Youngest recipient and first female awardee. Saved the lives of 359 passengers aboard hijacked Pan Am Flight 73 at Karachi Airport by shielding children from terrorist bullets.",
        famousWords: "'Do your duty, come what may.' — Shielded three American children from automatic gunfire, taking bullets herself.",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Neerja_Bhanot.jpg/800px-Neerja_Bhanot.jpg"
    },
    {
        id: "hangpan-dada",
        name: "Havildar Hangpan Dada",
        organization: "35th Battalion, Rashtriya Rifles / Assam Regiment",
        rank: "Havildar",
        year: 2017,
        posthumous: true,
        citation: "Neutralized four heavily armed terrorists at 13,000 feet in Shamshabari range of Jammu & Kashmir in close combat, saving his team before succumbing to injuries.",
        famousWords: "Single-handedly pinned down infiltrating terrorists at sub-zero high altitude.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Havildar_Hangpan_Dada_AC.jpg/800px-Havildar_Hangpan_Dada_AC.jpg"
    },
    {
        id: "sandeep-unnikrishnan",
        name: "Major Sandeep Unnikrishnan",
        organization: "51 Special Action Group, National Security Guard (NSG) / Bihar Regiment",
        rank: "Major",
        year: 2009,
        posthumous: true,
        citation: "Led NSG commando operation during the 26/11 Mumbai terror attacks at the Taj Mahal Palace Hotel. Rescued injured commandos and engaged terrorists alone.",
        famousWords: "'Do not come up, I will handle them.' — Famous last directive to his team before charging terrorist strongholds.",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Major_Sandeep_Unnikrishnan.jpg/800px-Major_Sandeep_Unnikrishnan.jpg"
    },
    {
        id: "kamlesh-kumari",
        name: "Constable Kamlesh Kumari",
        organization: "Central Reserve Police Force (CRPF) 88th Mahila Battalion",
        rank: "Constable",
        year: 2002,
        posthumous: true,
        citation: "First female CRPF awardee. Alerted security forces and raised alarm during the 2001 Indian Parliament attack, taking 11 bullets while preventing terrorists from entering.",
        famousWords: "Her instant alertness prevented terrorists from entering Building Gate No. 1 of Parliament House.",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Kamlesh_Kumari.jpg/800px-Kamlesh_Kumari.jpg"
    },
    {
        id: "santosh-babu",
        name: "Colonel B. Santosh Babu",
        organization: "16th Battalion, Bihar Regiment",
        rank: "Colonel",
        year: 2021,
        posthumous: true,
        citation: "Led Indian troops during the violent face-off at Galwan Valley in June 2020. Resisted aggressive enemy forces while holding Indian post line with exemplary composure.",
        famousWords: "Stood firm against aggressive physical attack at Patrol Point 14 in Galwan Valley.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Col_Santosh_Babu.jpg/800px-Col_Santosh_Babu.jpg"
    },
    {
        id: "mohan-chand-sharma",
        name: "Assistant Commandant Mohan Chand Sharma",
        organization: "Delhi Police Special Cell",
        rank: "Inspector / Assistant Commandant",
        year: 2009,
        posthumous: true,
        citation: "Decorated counter-terrorism officer who led the Batla House encounter in September 2008 against Indian Mujahideen terrorists responsible for serial blasts.",
        famousWords: "Led front-line entry into terrorist hideout, neutralizing key operatives.",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Mohan_Chand_Sharma.jpg/800px-Mohan_Chand_Sharma.jpg"
    },
    {
        id: "sudhir-kumar-walia",
        name: "Major Sudhir Kumar Walia",
        organization: "9th Battalion, Parachute Regiment (Special Forces)",
        rank: "Major",
        year: 2000,
        posthumous: true,
        citation: "Kargil war veteran who led a squad into Haphruda forest in Kupwara. Single-handedly killed 4 terrorists despite sustaining fatal injuries, ensuring squad safety.",
        famousWords: "Rallied his commando team under heavy fire, refusing treatment until the hideout was cleared.",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Major_Sudhir_Kumar_Walia.jpg/800px-Major_Sudhir_Kumar_Walia.jpg"
    }
];

const AC_TIMELINE = [
    { year: "1952", title: "Award Instituted", text: "Instituted on 4 January 1952 by President Dr. Rajendra Prasad as Ashoka Chakra Class I." },
    { year: "1967", title: "Renamed to Ashoka Chakra", text: "Reclassified into Ashoka Chakra, Kirti Chakra, and Shaurya Chakra as independent awards." },
    { year: "1987", title: "First Female Awardee", text: "Neerja Bhanot becomes the youngest and first woman to receive the Ashoka Chakra for Pan Am 73 heroism." },
    { year: "2002", title: "Parliament House Heroism", text: "CRPF Constable Kamlesh Kumari awarded posthumously for saving Parliament House." },
    { year: "2009", title: "26/11 Mumbai Attack Honors", text: "Major Sandeep Unnikrishnan, Havildar Gajender Singh, and ATS Chief Hemant Karkare awarded Ashoka Chakra." },
    { year: "2017", title: "High-Altitude Valour", text: "Havildar Hangpan Dada honored for heroic counter-terror combat in Shamshabari Range." },
    { year: "2021", title: "Galwan Valley Heroism", text: "Colonel B. Santosh Babu conferred Ashoka Chakra for supreme leadership in Galwan Valley." }
];

const AC_FACTS = [
    { title: "Highest Peacetime Distinction", detail: "Equivalent in prestige and protocol to the Param Vir Chakra, but awarded for peacetime gallantry." },
    { title: "Civilian Inclusion", detail: "Unlike PVC, civilians and police officers are fully eligible for the Ashoka Chakra." },
    { title: "First Female Recipient", detail: "Neerja Bhanot was the first female recipient and also received international honors from US and Pakistan." },
    { title: "Bar to Ashoka Chakra", detail: "If a recipient again performs an act of gallantry, a Bar is attached to the ribbon." },
    { title: "Allowances & Pension", detail: "Awardees or their surviving spouses receive a monthly pension and travel privileges from the Government of India." },
    { title: "Order of Precedence", detail: "Worn immediately after the Bharat Ratna and Param Vir Chakra on formal dress." }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AC_INFO, AC_HISTORY, AC_ELIGIBILITY, AC_MEDAL_DESIGN, AC_HEROISM_TYPES, AC_HEROES, AC_TIMELINE, AC_FACTS };
}

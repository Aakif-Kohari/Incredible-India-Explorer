/**
 * Vir Chakra Explorer — Comprehensive Data Module
 * Dataset covering Vir Chakra history, medal design, eligibility,
 * military heroism categories, famous awardees, timeline, and interesting facts.
 */

const VR_INFO = {
    id: "vir-chakra",
    name: "Vir Chakra Explorer",
    fullTitle: "India's Third-Highest Wartime Gallantry Decoration",
    establishedDate: "26 January 1950 (Retroactive from 15 August 1947)",
    totalRecipients: 1322,
    posthumousCount: 350,
    designer: "Armed Forces Honours Committee & India Mint",
    symbolism: "Five-pointed silver star featuring the State Emblem of India, worn on a half dark blue and half saffron/orange ribbon",
    ribbonColor: "Half dark blue and half saffron/orange vertical silk ribbon (32 mm width)",
    quickStats: [
        { label: "Total Awardees", value: "1,322 Honorees", icon: "🎖️" },
        { label: "Wartime Valour Tier", value: "3rd Wartime Decoration", icon: "⚔️" },
        { label: "Posthumous Awards", value: "350 Citations", icon: "🌹" },
        { label: "Aerial & Naval", value: "Tri-Service Heroes", icon: "✈️" },
        { label: "Medal Composition", value: "Standard Silver Star", icon: "🛡️" },
        { label: "Ribbon Motif", value: "Half Blue / Half Orange", icon: "🎗️" }
    ]
};

const VR_HISTORY = {
    overview: "The Vir Chakra (VrC) is India's third-highest military decoration awarded for acts of gallantry in the presence of the enemy, whether on land, at sea, or in the air.",
    wartimeSignificance: "Instituted on 26 January 1950, it recognizes acts of conspicuous military bravery during active combat. It ranks third in precedence of wartime awards after Param Vir Chakra and Maha Vir Chakra.",
    motto: "Awarded for exceptional heroism, aggressive combat initiative, and fearless devotion to duty in the face of enemy fire."
};

const VR_ELIGIBILITY = {
    title: "Eligibility Criteria",
    description: "The Vir Chakra is open to officers and enlisted personnel across all branches of the Indian Armed Forces.",
    categories: [
        { title: "Indian Air Force", detail: "Fighter pilots and aircrews engaging enemy aircraft in aerial dogfights or ground attack missions." },
        { title: "Indian Army", detail: "Infantry combatants, tank gunners, artillery spotters, and combat engineers during offensive assaults." },
        { title: "Indian Navy", detail: "Warship captains, submarine crews, and naval aviators carrying out combat strikes on enemy ports and fleets." },
        { title: "Reserve & Auxiliary Services", detail: "Territorial Army personnel and auxiliary defense personnel called into active combat service." }
    ]
};

const VR_MEDAL_DESIGN = {
    shape: "Circular standard silver medal, 1.375 inches in diameter.",
    obverse: "Five-pointed heraldic star embossed on the disc, with a domed center featuring the Ashoka Lion Capital.",
    reverse: "Embossed words 'VIR CHAKRA' in both Hindi ('वीर चक्र') and English, separated by two lotus flowers.",
    ribbon: "Silk ribbon 32 mm wide, divided into half dark blue and half saffron/orange vertical stripes."
};

const VR_HEROISM_TYPES = [
    {
        title: "Aerial Dogfights & Interception",
        icon: "✈️",
        description: "Engaging technologically superior enemy aircraft in dogfights and executing precision air strikes over hostile airspace."
    },
    {
        title: "Mountain Peak Assaults",
        icon: "🏔️",
        description: "Leading infantry charges up heavily fortified mountain peaks under intense artillery bombardment."
    },
    {
        title: "Naval Bombardment & Strikes",
        icon: "⚓",
        description: "Executing daring naval missile strikes on enemy harbor facilities and intercepting warship fleets."
    },
    {
        title: "Armored Cavalry Advances",
        icon: "🚜",
        description: "Commanding tank platoons across minefields to neutralize enemy armor formations."
    }
];

const VR_AWARDEES = [
    {
        id: "abhinandan-varthaman",
        name: "Group Captain Abhinandan Varthaman",
        organization: "No. 51 Squadron, Indian Air Force ('Sword Arms')",
        rank: "Group Captain (then Wing Commander)",
        year: 2019,
        posthumous: false,
        citation: "Flew a MiG-21 Bison during aerial dogfight post-Balakot airstrike, engaged an advancing formation of Pakistani F-16s, and shot down an F-16 before his aircraft was struck.",
        famousWords: "'Am I not supposed to tell you that, sir?' — Exemplary composure under enemy interrogation after ejection.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Wg_Cdr_Abhinandan_Varthaman_VrC.jpg/800px-Wg_Cdr_Abhinandan_Varthaman_VrC.jpg"
    },
    {
        id: "ajjamada-devayya",
        name: "Squadron Leader Ajjamada B. Devayya",
        organization: "No. 1 Squadron, Indian Air Force ('Tigers')",
        rank: "Squadron Leader",
        year: 1965,
        posthumous: true,
        citation: "Flew a Mystere aircraft over Sargodha air base in 1965 war. Though his plane was damaged by an enemy F-104 Starfighter, he shot down the Starfighter before crashing.",
        famousWords: "Single-handedly engaged faster supersonic Starfighter in sub-sonic Mystere fighter aircraft.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Sqn_Ldr_AB_Devayya.jpg/800px-Sqn_Ldr_AB_Devayya.jpg"
    },
    {
        id: "balwan-singh",
        name: "Colonel Balwan Singh",
        organization: "18th Battalion, The Grenadiers",
        rank: "Colonel (then Lieutenant)",
        year: 1999,
        conflict: "1999 Kargil War (Tiger Hill)",
        posthumous: false,
        citation: "Led Ghatak Platoon assault team up Tiger Hill from a steep, unexpected north-eastern direction, surprising enemy bunkers and planting the Indian flag on Tiger Hill top.",
        famousWords: "Sustained bullet injuries while leading assault up vertical cliff to recapture Tiger Hill.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Col_Balwan_Singh_VrC.jpg/800px-Col_Balwan_Singh_VrC.jpg"
    },
    {
        id: "nuduram-soren",
        name: "Naib Subedar Nuduram Soren",
        organization: "16th Battalion, Bihar Regiment",
        rank: "Naib Subedar",
        year: 2021,
        conflict: "2020 Galwan Valley Standoff",
        posthumous: true,
        citation: "Displayed fierce gallantry and tactical leadership during Galwan Valley hand-to-hand clash, defending Indian soldiers against aggressive enemy physical attack.",
        famousWords: "Fought fearlessly in Galwan River waters to protect his platoon soldiers.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Naib_Subedar_Nuduram_Soren.jpg/800px-Naib_Subedar_Nuduram_Soren.jpg"
    },
    {
        id: "chunar-ram",
        name: "Subedar Chunar Ram",
        organization: "13th Battalion, The Grenadiers",
        rank: "Subedar",
        year: 1971,
        conflict: "1971 Indo-Pakistani War (Darapari)",
        posthumous: false,
        citation: "Commanded platoon assault on enemy post at Darapari in Rajasthan sector, clearing enemy medium machine gun bunkers under intense artillery barrage.",
        famousWords: "Led company charge across desert sand dunes to capture fortified border post.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Subedar_Chunar_Ram.jpg/800px-Subedar_Chunar_Ram.jpg"
    }
];

const VR_TIMELINE = [
    { year: "1950", title: "Award Instituted", text: "Established on 26 January 1950 retroactive to 15 August 1947." },
    { year: "1965", title: "Air & Armor Heroism", text: "Conferred on fighter pilots and tank commanders during 1965 Indo-Pak War." },
    { year: "1971", title: "Naval Operation Trident & Bangladesh War", text: "Conferred for historic naval missile attacks on Karachi and Eastern Front liberation." },
    { year: "1999", title: "Kargil Heights Recaptured", text: "Multiple awards conferred on junior officers and jawans who scaled Kargil peaks." },
    { year: "2019", title: "Balakot Dogfight Honor", text: "Group Captain Abhinandan Varthaman awarded Vir Chakra for shooting down enemy F-16." },
    { year: "2021", title: "Galwan Valley Defense", text: "Bravery awards conferred on 16 Bihar heroes for Galwan Valley action." }
];

const VR_FACTS = [
    { title: "Largest Wartime Honor", detail: "With over 1,320 awards, it is the most widely conferred wartime gallantry medal in India." },
    { title: "Aerial Dogfight Legacy", detail: "Famous IAF aerial combat victories from 1965 Mystere battles to 2019 MiG-21 Bison F-16 kill are recognized with Vir Chakra." },
    { title: "Distinctive Ribbon", detail: "Features a striking half dark blue and half saffron/orange silk ribbon." },
    { title: "Bar to Vir Chakra", detail: "Awarded to heroes who perform subsequent acts of wartime bravery matching VrC standards." },
    { title: "Tri-Service Coverage", detail: "Worn by Army infantrymen, Navy submarine commanders, and IAF fighter pilots alike." },
    { title: "Order of Precedence", detail: "Preceded by Param Vir Chakra and Maha Vir Chakra in military honours hierarchy." }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VR_INFO, VR_HISTORY, VR_ELIGIBILITY, VR_MEDAL_DESIGN, VR_HEROISM_TYPES, VR_AWARDEES, VR_TIMELINE, VR_FACTS };
}

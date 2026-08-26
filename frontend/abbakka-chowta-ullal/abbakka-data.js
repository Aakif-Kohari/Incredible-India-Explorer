/**
 * abbakka-data.js
 * Rani Abbakka Chowta & Ullal Maritime Dataset — 16th Century Karnataka Coast
 */

const ABBAKKA_PROFILE_STATS = {
    name: "Rani Abbakka Chowta I",
    title: "Queen of Ullal (Chowta Dynasty)",
    reignPeriod: "c. 1545 – 1570s CE",
    capital: "Ullal (near Mangalore, Karnataka)",
    lineage: "Chowta Dynasty of Tulu Nadu (Matrilineal Aliyasantana Succession)",
    spouse: "Lakshmappa Bangarasa (King of Bangher/Mangalore)",
    opponents: "Portuguese Viceroyal Forces (Commanders Silveira, Melo, and Peixoto)",
    navalAlliances: "Zamorin of Calicut, Mapilla sailors, Mogaveera fishermen, and Adil Shah of Bijapur",
    outcome: "Preserved Ullal's spice trade independence; repelled multiple Portuguese naval blockades; celebrated as 'Abhaya Rani' (The Fearless Queen)."
};

const ABBAKKA_HIGHLIGHTS = [
    {
        id: "pepper-independence",
        title: "Preservation of Pepper Trade",
        category: "Trade Sovereignty",
        icon: "⚓",
        description: "Refused to pay tribute or stop trading spices directly with Arab merchants, defying the Portuguese cartaz (trade license) monopoly."
    },
    {
        id: "silveira-repulsed",
        title: "Defense against Admiral Silveira",
        category: "Military Defense",
        icon: "⚔️",
        description: "Successfully repulsed the first major Portuguese expedition sent against Ullal in 1555 CE, commanded by Dom Álvaro da Silveira."
    },
    {
        id: "moplah-coalition",
        title: "Cross-Religious Alliances",
        category: "Diplomacy",
        icon: "🤝",
        description: "Built a diverse defense force including Tulu, Mogaveera, Billava, and Moplah Muslim soldiers, partnering with Zamorin general Kutty Pokar Ali."
    },
    {
        id: "night-assault-1568",
        title: "Night Assault on João Peixoto",
        category: "Guerilla Counter-Strike",
        icon: "🔥",
        description: "Following Peixoto's capture of Ullal in 1568 CE, she launched a surprise night attack with 200 soldiers, killing the commander and routing the garrison."
    }
];

const ABBAKKA_SECTIONS = [
    {
        id: "dynasty-origins",
        title: "Abbakka and the Chowta Dynasty",
        eyebrow: "Origins & Succession",
        summary: "Rani Abbakka belonged to the Chowta dynasty, who ruled parts of coastal Karnataka (Tulu Nadu) from Ullal and Someshwara.",
        details: [
            "Aliyasantana Tradition: The Chowtas followed Aliyasantana, a matrilineal system of inheritance in which succession passed to the sister's son or daughter. Abbakka was trained in martial arts, archery, and naval strategy.",
            "Uncle's Coronation: Her uncle, Tirumala Raya, crowned her as the ruling queen of Ullal due to her exceptional administrative skills.",
            "Alliance & Separation: Married Lakshmappa Bangarasa, the king of neighboring Bangher (Mangalore). Tensions arose because Bangher aligned with the Portuguese, leading Abbakka to return to Ullal to safeguard her realm's independence."
        ]
    },
    {
        id: "ullal-trade",
        title: "Ullal: Geopolitical Value & Spice Trade",
        eyebrow: "Maritime Geopolitics",
        summary: "Ullal was a strategic port city located south of the Netravati River, serving as a hub for international spice trade.",
        details: [
            "Pepper Monopoly: Ullal exported premium pepper, ginger, and cardamom to the Red Sea, Arabia, and Persia, bypassing Portuguese toll ports.",
            "Zamorin Connection: Maintained close commercial and naval relations with the Zamorin of Calicut, the leading Hindu sovereign of Malabar.",
            "Port Tensions: The Portuguese, established in Goa (1510 CE), sought to enforce trade monopolies, prompting frequent clashes on the Kanara coast."
        ]
    },
    {
        id: "portuguese-monopoly",
        title: "Portuguese Tensions & Cartaz Demand",
        eyebrow: "Monopoly Tensions",
        summary: "The Portuguese Estado da Índia demanded that Ullal pay tribute and trade exclusively through their custom houses.",
        details: [
            "The Cartaz System: The Portuguese required all trade vessels to buy a license (cartaz) and pay custom duties, prohibiting trade with 'unapproved' Arab merchants.",
            "Abbakka's Defiance: She actively rejected these demands, continuing to export spices directly to Calicut and Middle Eastern ports.",
            "Punitive Expeditions: Her defiance prompted the Portuguese authorities in Goa to launch several naval incursions to sack Ullal and enforce compliance."
        ]
    },
    {
        id: "skirmishes-resistance",
        title: "Skirmishes & Tactical Night Guerilla Warfare",
        eyebrow: "Military Campaigns",
        summary: "Rani Abbakka fought off multiple naval expeditions, utilizing local geography and surprise night strikes.",
        details: [
            "1555 Campaign: Álvaro da Silveira led a fleet to Ullal. Abbakka's archers and coastal forces successfully held the beachhead and forced a Portuguese retreat.",
            "1558 Incursion: Luiz de Melo sacked Ullal in a surprise attack. Abbakka retreated to the nearby hills and organized guerilla counter-attacks, making it impossible for Melo to hold the city.",
            "1568 Campaign: João Peixoto captured Ullal. Abbakka escaped to a temple, assembled 200 loyal warriors, and launched a night counter-strike. She killed Peixoto, captured the Portuguese ships, and expelled the occupying troops."
        ]
    },
    {
        id: "naval-coalition",
        title: "Matrilineal Sovereignty & Naval Coalitions",
        eyebrow: "Coalition Statecraft",
        summary: "She forged extensive regional coalitions to sustain her decades-long resistance against Portuguese dominance.",
        details: [
            "Mapilla Collaborations: Recruited local Mogaveera fishermen and Mapilla Muslim sailors who possessed intimate knowledge of the coastal waters.",
            "Zamorin Alliance: Partnered with Kutty Pokar Ali, a prominent naval commander of the Zamorin of Calicut, who coordinated attacks on Portuguese ships.",
            "United Front: Joined the 1570 'League of the Kings' alongside Adil Shah of Bijapur and the Zamorin to challenge Portuguese naval monopoly."
        ]
    }
];

const ABBAKKA_EVIDENCE_VS_RETELLING = [
    {
        topic: "Use of Flaming Arrows (Agnivana)",
        historicalEvidence: "Portuguese logs and regional chronicles confirm that Ullal forces used tactical fires and night guerilla raids on anchored fleets to destroy enemy ships.",
        popularRetelling: "Oral folklore and Tulu songs describe her using magical flaming arrows (Agnivanas) made of coconut shell fibers, which she personally fired to set entire Portuguese fleets ablaze instantly."
    },
    {
        topic: "Betrayal and Final Capture",
        historicalEvidence: "Portuguese records note multiple expeditions and severe battles against Ullal but contain no mention of her capture or imprisonment. Her final fate remains historically unrecorded.",
        popularRetelling: "Popular legends and Yakshagana plays claim that her estranged husband betrayed her to the Portuguese, leading to her capture. She is said to have died in prison, spear in hand, shouting slogans of freedom."
    },
    {
        topic: "Direct Hand-to-Hand Combats",
        historicalEvidence: "Primary accounts show her acting as a military commander and strategist, coordinating coastal troops, archers, and regional allies from secure headquarters.",
        popularRetelling: "Later visual depictions and comic books show her in physical hand-to-hand sword combats with Portuguese generals on the decks of ships."
    }
];

const ABBAKKA_TIMELINE = [
    {
        year: "c. 1525 CE",
        title: "Birth into the Chowta Royal Clan",
        description: "Born in Tulu Nadu; trained in Aliyasantana statecraft and martial arts."
    },
    {
        year: "c. 1545 CE",
        title: "Coronation as Queen of Ullal",
        description: "Assumes sovereignty over the strategic spice port under matrilineal inheritance rules."
    },
    {
        year: "1555 CE",
        title: "Admiral Silveira's Expedition Repelled",
        description: "Repels the Portuguese naval campaign led by Álvaro da Silveira, refusing to pay tribute."
    },
    {
        year: "1558 CE",
        title: "Sacking of Ullal and Guerilla Retreat",
        description: "Luiz de Melo attacks Ullal. Abbakka retreats to the hills and forces a Portuguese withdrawal through guerilla warfare."
    },
    {
        year: "1568 CE",
        title: "João Peixoto's Defeat and Night Strike",
        description: "Peixoto captures Ullal. Abbakka escapes and leads a surprise night raid, killing Peixoto and liberating the port."
    },
    {
        year: "1570 CE",
        title: "Anti-Portuguese Coalition Alliance",
        description: "Joins a league with Bijapur and Calicut to launch coordinated attacks against Portuguese strongholds."
    }
];

const ABBAKKA_SOURCES = [
    {
        citation: "Subrahmanyam, Sanjay. The Portuguese Empire in Asia, 1500–1700: A Political and Economic History. Wiley-Blackwell, 2012.",
        notes: "Provides critical historical context on the pepper trade along the Kanara and Malabar coasts, cartaz enforcement, and regional resistance."
    },
    {
        citation: "Kamath, Suryanath U. A Concise History of Karnataka: From Pre-historic Times to the Present. Archana Prakashana, 1980.",
        notes: "Traces regional histories of coastal dynasties, the Chowta matrilineal system, and Rani Abbakka's military conflicts with the Portuguese."
    },
    {
        citation: "Aigal, M. Ganapathi Rao. Dakshina Kannada Jilleya Ithihasa (History of South Kanara District). Sharada Press, 1928.",
        notes: "Detailed local historical survey compiling regional records, inscriptions, and royal genealogies of the Chowtas of Ullal."
    },
    {
        citation: "Historical Archives of Goa. Documentos Remetidos da Índia (Books of the Monsoons). Selected Volumes.",
        notes: "Primary Portuguese administrative records documenting naval skirmishes, custom duties, and treaties on the Mangalore coast."
    }
];

/**
 * kushan-data.js
 * Comprehensive Data for the Kushan Gold Coinage Explorer (c. 30 CE – 375 CE)
 * Includes rulers, coins, deities, timeline, territory, and academic references.
 */

const KUSHAN_STATS = [
    { label: "Rulers Featured", value: "7" },
    { label: "Gold Coin Types", value: "12+" },
    { label: "Time Span", value: "~340 Years" },
    { label: "Scripts Used", value: "Greek, Bactrian, Kharoshthi" },
    { label: "Deities Depicted", value: "30+" },
    { label: "Primary Mints", value: "Bactra, Kapisa, Mathura" }
];

const KUSHAN_RULERS = [
    {
        id: "kujula",
        name: "Kujula Kadphises",
        period: "c. 30 – 80 CE",
        blurb: "Founder of the Kushan Empire. He unified the Yuezhi tribes and began issuing early coinage imitating Roman and Greco-Bactrian designs, establishing the dynasty's economic foothold.",
        territoryNote: "Bactria & northern Afghanistan"
    },
    {
        id: "vima-takto",
        name: "Vima Takto (Soter Megas)",
        period: "c. 80 – 90 CE",
        blurb: "Often identified as the 'Soter Megas' (Great Savior) of early coins. He expanded Kushan territory into northern India and transitioned coinage from crude imitations to distinct Kushan royal portraits.",
        territoryNote: "Bactria to Kabul Valley"
    },
    {
        id: "vima",
        name: "Vima Kadphises",
        period: "c. 90 – 100 CE",
        blurb: "First Kushan ruler to strike a pure, heavy gold coinage on the Roman weight standard. He expanded the empire deep into northwest India and introduced the iconic 'King at Altar' obverse.",
        territoryNote: "Bactria to Gandhara & Punjab"
    },
    {
        id: "kanishka",
        name: "Kanishka I",
        period: "c. 127 – 150 CE",
        blurb: "The empire's greatest ruler and a major patron of Buddhism. He shifted the coin language from Greek to Bactrian and introduced an unprecedented, syncretic pantheon of Greek, Iranian, Indian, and Buddhist deities.",
        territoryNote: "Central Asia to the Gangetic Plain"
    },
    {
        id: "huvishka",
        name: "Huvishka",
        period: "c. 150 – 180 CE",
        blurb: "Continued Kanishka's diverse religious coinage program. He issued the widest variety of deity types of any Kushan ruler, including unique reclining king portraits and rare astral deities.",
        territoryNote: "Bactria, Gandhara, Mathura"
    },
    {
        id: "vasudeva",
        name: "Vasudeva I",
        period: "c. 190 – 230 CE",
        blurb: "Bore a Sanskrit name. His coinage shifted almost exclusively to the Shaiva deity Oesho (Shiva with bull Nandi), marking the final, highly Indianized phase of classical Kushan gold minting.",
        territoryNote: "Gandhara & northern India"
    },
    {
        id: "kanishka-ii",
        name: "Kanishka II / III",
        period: "c. 230 – 260 CE",
        blurb: "Later rulers who maintained the Kushan name and basic coinage traditions, though with declining gold purity and weight, as the empire faced pressure from the rising Sasanian Empire.",
        territoryNote: "Gandhara & Punjab (contracted)"
    }
];

// NEW: Deities Glossary for enhanced tooltips/modals
const KUSHAN_DEITIES = [
    {
        name: "Oesho",
        origin: "Indian (Shaiva)",
        description: "Identified with Shiva. Depicted standing, holding a trident (trishula), with the bull Nandi at his side. Became the dominant deity under Vasudeva I.",
        rulers: ["vima", "vasudeva"]
    },
    {
        name: "Boddo",
        origin: "Indian (Buddhist)",
        description: "The Buddha. Depicted standing in monastic robes, right hand raised in abhaya mudra (gesture of reassurance). Among the earliest anthropomorphic depictions of the Buddha on any coinage.",
        rulers: ["kanishka", "huvishka"]
    },
    {
        name: "Nana",
        origin: "Iranian-Mesopotamian",
        description: "A mother goddess. Depicted standing, often holding a scepter and a bowl or resting on a lion. Reflects the deep Central Asian roots of the Kushan elite.",
        rulers: ["kanishka", "huvishka"]
    },
    {
        name: "Miiro (Mithra)",
        origin: "Iranian (Zoroastrian)",
        description: "The sun god and god of covenants. Depicted with a radiate crown (sun rays) and holding a spear or barsom (sacred twigs).",
        rulers: ["kanishka", "huvishka"]
    },
    {
        name: "Mao",
        origin: "Iranian",
        description: "The moon god. Depicted with a crescent moon emerging from his shoulders, reflecting the astral religious currents of the Silk Road.",
        rulers: ["huvishka"]
    },
    {
        name: "Herakles",
        origin: "Greek",
        description: "The Greek hero. Depicted standing, holding a club and wearing a lion skin. A holdover from the Greco-Bactrian numismatic tradition, maintained by early Kushans.",
        rulers: ["vima-takto", "kanishka"]
    }
];

const KUSHAN_COINS = [
    {
        id: "kujula-augustus",
        rulerId: "kujula",
        coinType: "Roman Imitation Dinar",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.8g",
        rarity: "Common",
        script: "Greek (blundered)",
        circulation: "Bactria",
        obverse: {
            desc: "Laureate head derived from a Roman Augustus/Tiberius prototype, with blundered Greek legend copied by die-cutters unfamiliar with the script.",
            hotspots: [
                { x: 50, y: 32, label: "Laureate Head", note: "Directly copied from circulating Roman aurei, showing early trade contact with Rome." },
                { x: 72, y: 55, label: "Blundered Legend", note: "Greek letters copied without full comprehension of their meaning, a hallmark of early Kushan imitations." }
            ]
        },
        reverse: {
            desc: "Seated Roman-style figure, sometimes replaced with a Kushan royal figure in later issues.",
            hotspots: [{ x: 50, y: 50, label: "Seated Figure", note: "A holdover motif from the Roman coin being imitated, likely representing a deified emperor." }]
        },
        history: "These earliest Kushan gold issues were direct die-imitations of Roman coins, revealing how deeply Roman trade gold had penetrated Central Asian markets before the Kushans minted their own original designs."
    },
    {
        id: "vima-takto-herakles",
        rulerId: "vima-takto",
        coinType: "King & Herakles Type",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.9g",
        rarity: "Rare",
        script: "Greek",
        circulation: "Kabul Valley, Gandhara",
        obverse: {
            desc: "The king standing at an altar, wearing a diadem and heavy coat, sacrificing. The first clear, non-imitative Kushan royal portrait.",
            hotspots: [
                { x: 50, y: 35, label: "Royal Diadem", note: "Marks the transition from anonymous 'Soter Megas' issues to named Kushan kings." },
                { x: 50, y: 68, label: "Altar", note: "Establishes the 'King at Altar' motif that becomes the standard Kushan obverse for centuries." }
            ]
        },
        reverse: {
            desc: "Herakles standing facing, holding a club in his right hand and a small lion skin in his left.",
            hotspots: [{ x: 50, y: 45, label: "Club & Lion Skin", note: "Classic iconography of Herakles, retained from the Greco-Bactrian numismatic tradition." }]
        },
        history: "Vima Takto's reign marks the crucial bridge between crude Roman imitations and the highly sophisticated, original gold coinage of Vima Kadphises and Kanishka."
    },
    {
        id: "vima-siva",
        rulerId: "vima",
        coinType: "King & Shiva Type",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.9g",
        rarity: "Common",
        script: "Greek",
        circulation: "Gandhara, Punjab",
        obverse: {
            desc: "The king standing at an altar, wearing a heavy coat and pointed cap, flames rising from his shoulders symbolizing divine kingship.",
            hotspots: [
                { x: 50, y: 40, label: "Flaming Shoulders", note: "A Central Asian iconographic marker of royal divinity (khvarenah), adopted from Iranian traditions." },
                { x: 50, y: 68, label: "Altar", note: "Represents the king's role as intermediary performing sacrifice to the gods." }
            ]
        },
        reverse: {
            desc: "Shiva (as Oesho) standing beside his bull Nandi, holding a trident, marking the earliest major Kushan adoption of an Indian deity.",
            hotspots: [
                { x: 42, y: 45, label: "Trident (Trishula)", note: "Identifies the deity as Shiva/Oesho, a fusion of Greek, Iranian and Indian religious imagery." },
                { x: 62, y: 62, label: "Bull Nandi", note: "Shiva's mount, cementing Indian religious motifs into Kushan coin iconography." }
            ]
        },
        history: "Vima Kadphises struck the first pure gold Kushan coinage on the Roman weight standard, and his pairing of the king with Shiva/Oesho set the template that later rulers, especially Vasudeva I, would follow for generations."
    },
    {
        id: "kanishka-nana",
        rulerId: "kanishka",
        coinType: "King & Nana Type",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.9g",
        rarity: "Common",
        script: "Bactrian",
        circulation: "Bactria to Gandhara",
        obverse: {
            desc: "Kanishka standing in Kushan royal dress, sacrificing at an altar, spear in hand, flames at the shoulder.",
            hotspots: [
                { x: 55, y: 30, label: "Royal Kushan Cap", note: "Distinctive pointed headgear marking Central Asian steppe royal identity." },
                { x: 45, y: 70, label: "Sacrificial Altar", note: "Recurs across nearly every Kushan king-type obverse as a symbol of ritual kingship." }
            ]
        },
        reverse: {
            desc: "Nana, an Iranian-Mesopotamian mother goddess, standing holding a scepter and bowl, named in Bactrian script.",
            hotspots: [{ x: 50, y: 45, label: "Goddess Nana", note: "A Central Asian deity imported into the Kushan pantheon, reflecting the empire's Silk Road religious diversity." }]
        },
        history: "Kanishka I switched the coin legend language from Greek to Bactrian (written in Greek script) and introduced an extraordinary range of over thirty deities across his coinage, drawn from Greek, Zoroastrian, Hindu, and Buddhist traditions."
    },
    {
        id: "kanishka-buddha",
        rulerId: "kanishka",
        coinType: "King & Buddha Type",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.9g",
        rarity: "Very Rare",
        script: "Bactrian",
        circulation: "Gandhara",
        obverse: {
            desc: "Kanishka standing at altar in royal dress, identical in style to his other gold issues.",
            hotspots: [{ x: 50, y: 35, label: "Kanishka Standing", note: "Same royal portrait template reused across his diverse deity-reverse coinage to project consistent imperial authority." }]
        },
        reverse: {
            desc: "The Buddha standing in monastic robes, right hand raised in abhaya mudra (gesture of reassurance), labeled 'Boddo' in Bactrian.",
            hotspots: [{ x: 50, y: 48, label: "Abhaya Mudra", note: "Among the earliest anthropomorphic depictions of the Buddha on any coinage, tied to Kanishka's patronage of Buddhism." }]
        },
        history: "This extremely rare type is historically significant as one of the first coin portraits of the Buddha in human form, coinciding with the rise of Gandharan Buddhist art and Kanishka's legendary sponsorship of the Fourth Buddhist Council."
    },
    {
        id: "huvishka-mao",
        rulerId: "huvishka",
        coinType: "King & Mao Type",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.8g",
        rarity: "Rare",
        script: "Bactrian",
        circulation: "Bactria, Gandhara",
        obverse: {
            desc: "Huvishka reclining on a couch, a departure from the standing-king pose of his predecessors, holding an elephant goad and spear.",
            hotspots: [{ x: 50, y: 42, label: "Reclining Pose", note: "A unique regal portrayal distinguishing Huvishka's obverse style from earlier standing-king types, possibly influenced by Roman or Indian royal iconography." }]
        },
        reverse: {
            desc: "Mao, the moon god, shown with crescent shoulders and holding a scepter, one of many deities cycled through Huvishka's mint.",
            hotspots: [{ x: 50, y: 45, label: "Lunar Crescent", note: "Identifies the deity as Mao, part of an Iranian astral pantheon absorbed into Kushan religion." }]
        },
        history: "Huvishka issued the single widest variety of deity types of any Kushan king, cycling through Greek, Iranian, Indian, and Central Asian gods, reflecting the empire's role as a crossroads of Silk Road belief systems."
    },
    {
        id: "huvishka-mithra",
        rulerId: "huvishka",
        coinType: "King & Mithra Type",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.8g",
        rarity: "Uncommon",
        script: "Bactrian",
        circulation: "Gandhara",
        obverse: {
            desc: "Huvishka bust facing forward, wearing an elaborate crested helmet, a stylistic shift from full standing portraits.",
            hotspots: [{ x: 50, y: 35, label: "Crested Helmet", note: "Reflects growing Persian and Central Asian military fashion influence at the Kushan court." }]
        },
        reverse: {
            desc: "Mithra (Miiro), the Iranian sun god, radiate-crowned, holding a spear, legend names the deity in Bactrian.",
            hotspots: [{ x: 50, y: 48, label: "Radiate Crown", note: "Solar iconography marking Mithra/Miiro as a sun deity within the Zoroastrian-derived Kushan pantheon." }]
        },
        history: "Coins depicting Mithra/Miiro highlight the strong Zoroastrian-Iranian religious current running through the Kushan court alongside Buddhist and Hindu imagery, illustrating true Silk Road religious plurality."
    },
    {
        id: "vasudeva-oesho",
        rulerId: "vasudeva",
        coinType: "King & Oesho Type",
        metal: "Gold",
        denomination: "Dinar",
        weight: "~7.5g (declining)",
        rarity: "Common",
        script: "Bactrian",
        circulation: "Gandhara, northern India",
        obverse: {
            desc: "Vasudeva standing at altar in traditional Kushan royal dress, spear in hand, the pose largely unchanged from Kanishka's time.",
            hotspots: [{ x: 50, y: 38, label: "Standing King", note: "Continuity of the century-old royal portrait formula even as the empire's core territory contracted." }]
        },
        reverse: {
            desc: "Oesho (Shiva) standing beside bull Nandi, holding trident, now virtually the sole deity type issued under Vasudeva.",
            hotspots: [
                { x: 42, y: 44, label: "Trishula", note: "Shiva's trident, the single most consistent reverse motif of Vasudeva's entire reign." },
                { x: 60, y: 60, label: "Nandi Bull", note: "Confirms near-total narrowing of the once-vast Kushan pantheon to one Indianized deity." }
            ]
        },
        history: "Vasudeva I's adoption of a Sanskrit royal name and his coinage's near-exclusive focus on Oesho/Shiva mark the final, most Indianized phase of Kushan coinage, just before the empire fragmented under Sasanian and later Kidarite pressure."
    }
];

const KUSHAN_TIMELINE = [
    { year: "c. 30 CE", title: "Kujula Kadphises unifies the Yuezhi", desc: "Founds the Kushan Empire in Bactria, issuing early Roman-imitation gold." },
    { year: "c. 80 CE", title: "Reign of Vima Takto (Soter Megas)", desc: "Transitions coinage from crude imitations to distinct Kushan royal portraits." },
    { year: "c. 90 CE", title: "Vima Kadphises strikes pure gold", desc: "Introduces the first dedicated Kushan gold dinar on the Roman weight standard." },
    { year: "c. 127 CE", title: "Kanishka I ascends the throne", desc: "Empire reaches its territorial peak; coin legends shift definitively from Greek to Bactrian." },
    { year: "c. 130 CE", title: "Pantheon expansion begins", desc: "Greek, Iranian, Indian, and Buddhist deities appear across Kanishka's gold issues." },
    { year: "c. 150 CE", title: "Huvishka's reign", desc: "Widest diversity of deity types minted; empire's religious plurality peaks." },
    { year: "c. 190 CE", title: "Vasudeva I takes the throne", desc: "Coinage narrows almost entirely to Oesho (Shiva), signaling deep Indianization." },
    { year: "c. 230 CE", title: "Sasanian pressure mounts", desc: "Shapur I of Persia conquers western Kushan territories, issuing 'Kushano-Sasanian' coinage." },
    { year: "c. 375 CE", title: "Final fragmentation", desc: "Centralized Kushan gold minting ends, replaced by the Kidarites and later the Hephthalites." }
];

const KUSHAN_TERRITORY = [
    { region: "Bactria (Northern Afghanistan)", note: "Original Kushan homeland; site of earliest mints and Roman-imitation coinage." },
    { region: "Sogdia (Uzbekistan/Tajikistan)", note: "Northern frontier controlling vital Silk Road trade routes to China." },
    { region: "Gandhara (Peshawar Valley, Pakistan)", note: "Major Buddhist artistic center; core of Kanishka and Huvishka's primary mints." },
    { region: "Punjab", note: "Key trade and military corridor linking Central Asia to the Gangetic Plain." },
    { region: "Mathura (Northern India)", note: "Secondary Kushan capital and southern mint under Kanishka and Huvishka, producing distinct red sandstone art." },
    { region: "Tarim Basin (Western China)", note: "Furthest eastern extent of Kushan political and cultural influence, evidenced by coin finds and administrative documents." }
];

const KUSHAN_REFERENCES = [
    { text: "Rosenfield, John M. The Dynastic Arts of the Kushans. University of California Press, 1967.", url: "https://www.jstor.org/" },
    { text: "Göbl, Robert. System und Chronologie der Münzprägung des Kušānreiches. Verlag der Österreichischen Akademie der Wissenschaften, 1984.", url: "https://www.oeaw.ac.at/" },
    { text: "Sims-Williams, Nicholas. Bactrian Documents from Northern Afghanistan. Oxford University Press, 2000.", url: "https://global.oup.com/" },
    { text: "American Numismatic Society — Kushan Coin Collection Records.", url: "https://numismatics.org/" },
    { text: "British Museum — Kushan Empire Coinage Catalogue.", url: "https://www.britishmuseum.org/collection" },
    { text: "Cribb, Joe. 'The Kushan Pantheon' — Silk Road numismatic studies.", url: "https://www.numismatics.org.in/" }
];
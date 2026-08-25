// travancore-data.js
// Data for "Explore Travancore's Conch Coins" (Kingdom of Travancore, c. 1729 CE – 1949 CE)

const TRAVANCORE_STATS = [
    { label: "Rulers Featured", value: "7" },
    { label: "Coin Types", value: "11" },
    { label: "Time Span", value: "~220 Years" },
    { label: "Scripts", value: "Malayalam, Grantha, English" },
];

const TRAVANCORE_RULERS = [
    {
        id: "marthanda-varma",
        name: "Marthanda Varma",
        period: "1729 – 1758 CE",
        blurb: "Founder of the modern Kingdom of Travancore, who unified the smaller Venad principalities and defeated the Dutch East India Company at Colachel in 1741. In 1750 CE he ceremonially dedicated the kingdom to Sree Padmanabhaswamy, ruling afterward as 'Padmanabha Dasa' — an act that fixed the deity's conch (Shankha) at the centre of Travancore's coinage and state identity.",
        territoryNote: "Capital at Padmanabhapuram; core Venad and southern Kerala territories",
    },
    {
        id: "karthika-thirunal",
        name: "Karthika Thirunal Rama Varma (Dharma Raja)",
        period: "1758 – 1798 CE",
        blurb: "Remembered for his religious tolerance and for sheltering refugees during the Mysorean invasions of Kerala. Coinage under his reign continued the conch-and-Sree design established by his predecessor, while administrative activity gradually shifted toward Thiruvananthapuram.",
        territoryNote: "Padmanabhapuram to Thiruvananthapuram; defended by the Nedumkotta line",
    },
    {
        id: "gowri-lakshmi-bayi",
        name: "Gowri Lakshmi Bayi",
        period: "1810 – 1815 CE",
        blurb: "One of the few Travancore rulers to issue coinage in a queen's name, ascending as ruling Maharani during a period of growing British Resident influence. Her fanams retain the conch and Sree character with subtle die variations from earlier reigns.",
        territoryNote: "Thiruvananthapuram as capital; increasing British Resident oversight",
    },
    {
        id: "swathi-thirunal",
        name: "Swathi Thirunal Rama Varma",
        period: "1829 – 1846 CE",
        blurb: "A polymath king, composer, and patron of the arts and sciences, under whom die-cutting for Travancore's gold and silver coins became noticeably more refined, with sharper conch and Sree-character engraving.",
        territoryNote: "Thiruvananthapuram; era of cultural and administrative flourishing",
    },
    {
        id: "ayilyam-thirunal",
        name: "Ayilyam Thirunal Rama Varma",
        period: "1860 – 1880 CE",
        blurb: "An administrative moderniser who expanded roads, postal services, and public works. Minting technology advanced from older hand-struck punches toward machine-struck dies, giving later Chuckrams far more uniform detail.",
        territoryNote: "Thiruvananthapuram; deepening ties with British India's monetary system",
    },
    {
        id: "sri-mulam-thirunal",
        name: "Sri Mulam Thirunal Rama Varma",
        period: "1885 – 1924 CE",
        blurb: "Travancore's longest-reigning Maharaja, who oversaw a major currency reform introducing the machine-struck Travancore Rupee and standardising it against the older Fanam, Chuckram, and Cash denominations. He also established the Sri Mulam Popular Assembly, an early legislative body.",
        territoryNote: "Thiruvananthapuram; currency tied closely to British Indian trade",
    },
    {
        id: "chithira-thirunal",
        name: "Sri Chithira Thirunal Bala Rama Varma",
        period: "1931 – 1949 CE",
        blurb: "The last ruling Maharaja of Travancore. Coinage continued through the Second World War years, including debased-metal Chuckram and Cash issues, before Travancore's 1949 accession to independent India ended royal minting — though the conch motif lived on in the new emblem of Kerala.",
        territoryNote: "Thiruvananthapuram, until integration into the Indian Union",
    },
];

const TRAVANCORE_COINS = [
    {
        id: "marthanda-varma-anantapadmanabha-fanam",
        rulerId: "marthanda-varma",
        coinType: "Anantapadmanabha Gold Fanam",
        metal: "Gold",
        denomination: "Fanam",
        script: "Malayalam / Grantha",
        circulation: "Padmanabhapuram and core Venad territory",
        obverse: {
            desc: "A dextrally-coiled conch shell (Shankha), the emblem of Sree Padmanabhaswamy, struck prominently at the centre of the tiny gold flan.",
            hotspots: [
                { x: 50, y: 42, label: "Conch (Shankha)", note: "The sacred conch of Vishnu-Padmanabha, adopted as Travancore's central emblem after the 1750 CE dedication of the kingdom to the deity." },
                { x: 50, y: 72, label: "Beaded Border", note: "A dotted rim framing the design, typical of the very small punch-struck fanams of the period." },
            ],
        },
        reverse: {
            desc: "The Malayalam/Grantha 'Sree' character, an auspicious glyph invoking prosperity, filling the reverse field.",
            hotspots: [{ x: 50, y: 50, label: "Sree Character", note: "A single ornamental glyph meaning 'auspicious' or 'sacred', used instead of a royal name on many early Travancore gold fanams." }],
        },
        history: "Struck soon after Marthanda Varma's 1750 CE dedication of the kingdom to Sree Padmanabhaswamy, this tiny gold coin is among the earliest to fix the conch as Travancore's defining emblem, a role it would keep for two centuries.",
    },
    {
        id: "marthanda-varma-chuckram",
        rulerId: "marthanda-varma",
        coinType: "Silver Chuckram",
        metal: "Silver",
        denomination: "Chuckram (Chakram)",
        script: "Malayalam / Grantha",
        circulation: "Venad and expanding Travancore territory",
        obverse: {
            desc: "A stylised conch shell flanked by dots, hand-struck slightly off-centre as was common for the irregular flans of the period.",
            hotspots: [{ x: 50, y: 45, label: "Conch (Shankha)", note: "The same conch emblem as the gold fanam, now extended to the silver denomination used for everyday trade." }],
        },
        reverse: {
            desc: "A simple dotted or granulated field, with no royal name — identification relied on the conch alone.",
            hotspots: [{ x: 50, y: 55, label: "Granulated Field", note: "The plain reverse reflects the small size and rapid, high-volume striking of everyday silver Chuckrams." }],
        },
        history: "The Chuckram was the standard silver coin of daily commerce in Travancore, worth a fraction of a gold Fanam; sixteen Cash made one Chuckram, and four Chuckrams made one Fanam.",
    },
    {
        id: "karthika-thirunal-chuckram",
        rulerId: "karthika-thirunal",
        coinType: "Silver Chuckram",
        metal: "Silver",
        denomination: "Chuckram (Chakram)",
        script: "Malayalam / Grantha",
        circulation: "Thiruvananthapuram and Nedumkotta frontier",
        obverse: {
            desc: "The conch shell, now paired with the Sree character above it, a combination that becomes standard on later Travancore coinage.",
            hotspots: [
                { x: 50, y: 36, label: "Sree Character", note: "Added above the conch, this glyph became a near-constant companion symbol on Travancore coins from this reign onward." },
                { x: 50, y: 62, label: "Conch (Shankha)", note: "Retained from Marthanda Varma's coinage as the unbroken royal and state emblem." },
            ],
        },
        reverse: {
            desc: "A plain granulated or dotted field, continuing the earlier reverse convention.",
            hotspots: [{ x: 50, y: 50, label: "Dotted Field", note: "Minimal reverse decoration kept striking fast during a period of frequent Mysorean military pressure on the kingdom's northern frontier." }],
        },
        history: "Struck while the Nedumkotta defensive line was being built against Mysorean incursions, this Chuckram shows the Sree-and-conch pairing that would define Travancore's coin identity for the rest of its history.",
    },
    {
        id: "gowri-lakshmi-bayi-fanam",
        rulerId: "gowri-lakshmi-bayi",
        coinType: "Gold Fanam (Queen's Issue)",
        metal: "Gold",
        denomination: "Fanam",
        script: "Malayalam / Grantha",
        circulation: "Thiruvananthapuram region",
        obverse: {
            desc: "The conch shell rendered with slightly finer, more rounded punch-work than earlier reigns.",
            hotspots: [{ x: 50, y: 44, label: "Conch (Shankha)", note: "One of the rare Travancore coin issues struck under a ruling Maharani rather than a Maharaja." }],
        },
        reverse: {
            desc: "The Sree character, slightly enlarged to fill more of the tiny gold flan.",
            hotspots: [{ x: 50, y: 52, label: "Sree Character", note: "The enlarged glyph reflects small but real stylistic drift in die-cutting between reigns, useful for dating unsigned fanams." }],
        },
        history: "Gowri Lakshmi Bayi's coinage illustrates how Travancore's mint kept its core conch-and-Sree formula unchanged even as rule passed to a queen, prioritising currency continuity over any new royal portrait or name.",
    },
    {
        id: "swathi-thirunal-fanam",
        rulerId: "swathi-thirunal",
        coinType: "Refined Gold Fanam",
        metal: "Gold",
        denomination: "Fanam",
        script: "Malayalam / Grantha",
        circulation: "Thiruvananthapuram and wider Travancore",
        obverse: {
            desc: "A crisply detailed conch shell with visible spiral ridging, reflecting improved die-cutting under Swathi Thirunal's patronage of the arts.",
            hotspots: [{ x: 50, y: 42, label: "Conch (Shankha)", note: "The spiral ridges are engraved with noticeably more precision than on earlier fanams, a hallmark of this artistically inclined reign." }],
        },
        reverse: {
            desc: "The Sree character, now flanked by small decorative dots forming a light border.",
            hotspots: [{ x: 50, y: 50, label: "Sree Character with Border", note: "The added dotted border is a modest but deliberate design refinement typical of Swathi Thirunal-era dies." }],
        },
        history: "Swathi Thirunal is remembered as a composer and scholar-king; his mint's more refined conch and Sree dies mirror the broader artistic flourishing of his court.",
    },
    {
        id: "swathi-thirunal-cash",
        rulerId: "swathi-thirunal",
        coinType: "Copper Cash (Kasu)",
        metal: "Copper",
        denomination: "Cash (Kasu)",
        script: "Malayalam / Grantha",
        circulation: "Local markets across Travancore",
        obverse: {
            desc: "A small conch shell at the centre of a thick copper flan, worn smooth on many surviving examples from heavy circulation.",
            hotspots: [{ x: 50, y: 46, label: "Conch (Shankha)", note: "Even the lowest-value copper Cash carried the conch, ensuring the emblem was seen in everyday small transactions across the kingdom." }],
        },
        reverse: {
            desc: "A plain field, sometimes with faint traces of a Sree character where striking pressure was uneven.",
            hotspots: [{ x: 50, y: 55, label: "Worn Reverse", note: "Copper Cash coins saw the heaviest daily use of any Travancore denomination, so their designs wore down fastest." }],
        },
        history: "Sixteen Cash made one Chuckram; these small copper coins were the everyday currency of Travancore's markets, fairs, and ferry tolls.",
    },
    {
        id: "ayilyam-thirunal-chuckram",
        rulerId: "ayilyam-thirunal",
        coinType: "Machine-Struck Silver Chuckram",
        metal: "Silver",
        denomination: "Chuckram (Chakram)",
        script: "Malayalam / Grantha",
        circulation: "Thiruvananthapuram mint, empire-wide circulation",
        obverse: {
            desc: "A conch shell struck with the sharp, even relief of machine minting, replacing the slightly uneven hand-struck punches of earlier reigns.",
            hotspots: [{ x: 50, y: 40, label: "Conch (Shankha)", note: "The crisp, uniform strike marks the shift from hand punches to mechanised screw-press minting during Ayilyam Thirunal's modernisation drive." }],
        },
        reverse: {
            desc: "The Sree character rendered with new mechanical precision, perfectly centred for the first time in Travancore's coin history.",
            hotspots: [{ x: 50, y: 52, label: "Sree Character", note: "Centring this precise reflects the improved dies and striking equipment introduced as part of broader administrative modernisation." }],
        },
        history: "Ayilyam Thirunal's public-works modernisation extended to the mint itself, where machine striking finally gave Travancore's silver coinage consistent, well-centred designs.",
    },
    {
        id: "sri-mulam-thirunal-rupee",
        rulerId: "sri-mulam-thirunal",
        coinType: "Travancore Rupee",
        metal: "Silver",
        denomination: "Rupee (= 7 Fanams)",
        script: "Malayalam and English",
        circulation: "Thiruvananthapuram mint; state-wide, tied to British Indian trade",
        obverse: {
            desc: "The conch shell at the centre, now surrounded by a Malayalam legend giving the ruler's name and regnal year, framed in a beaded circle.",
            hotspots: [
                { x: 50, y: 40, label: "Conch (Shankha)", note: "Kept as the coin's central device even as the denomination system was overhauled to interlock with British Indian currency." },
                { x: 50, y: 70, label: "Regnal-Year Legend", note: "Travancore dates were given in the Malayalam Era (Kollam Era); a coin dated ME 1000 corresponds to 1825 CE, so later dates like ME 1116 fall in 1940–41 CE." },
            ],
        },
        reverse: {
            desc: "An English-language legend reading 'TRAVANCORE' with the denomination value, reflecting closer integration with British Indian commerce.",
            hotspots: [{ x: 50, y: 50, label: "English Legend", note: "The first widespread use of English lettering on Travancore's own coinage, aimed at easing trade with British India." }],
        },
        history: "Introduced as part of Sri Mulam Thirunal's currency reform, the Travancore Rupee was the kingdom's highest circulating denomination, worth 7 Fanams, each Fanam worth 4 Chuckrams, each Chuckram worth 16 Cash.",
    },
    {
        id: "sri-mulam-thirunal-cash",
        rulerId: "sri-mulam-thirunal",
        coinType: "Copper Cash with English Legend",
        metal: "Copper",
        denomination: "Cash (Kasu)",
        script: "Malayalam and English",
        circulation: "Local markets, state-wide",
        obverse: {
            desc: "A simplified conch shell, now smaller in relation to the coin's face to make room for a numeral value.",
            hotspots: [{ x: 50, y: 42, label: "Conch (Shankha)", note: "Even as new numerals and English text were added, the conch remained the one constant across every Travancore denomination." }],
        },
        reverse: {
            desc: "A numeral indicating the coin's cash value, with a short English abbreviation.",
            hotspots: [{ x: 50, y: 55, label: "Numeral Value", note: "Clear numeral values made the reformed currency easier for both local and British Indian traders to use side by side." }],
        },
        history: "This reformed copper Cash shows how the 1901 currency overhaul modernised even the smallest denomination without displacing the conch from its central place.",
    },
    {
        id: "chithira-thirunal-chuckram",
        rulerId: "chithira-thirunal",
        coinType: "Wartime Bronze Chuckram",
        metal: "Bronze (debased alloy)",
        denomination: "Chuckram (Chakram)",
        script: "Malayalam and English",
        circulation: "Thiruvananthapuram mint; wartime state-wide circulation",
        obverse: {
            desc: "A simplified conch shell struck in a duller bronze alloy, reflecting metal shortages during the Second World War.",
            hotspots: [{ x: 50, y: 42, label: "Conch (Shankha)", note: "Even wartime economising on precious metal did not remove the conch, underlining how central it remained to Travancore's coin identity." }],
        },
        reverse: {
            desc: "The Malayalam Era date and denomination, with a small English numeral for cross-reference.",
            hotspots: [{ x: 50, y: 55, label: "Malayalam Era Date", note: "Late Chithira Thirunal coins carry Malayalam Era dates in the ME 1110s–1120s, corresponding to the 1930s–1940s CE." }],
        },
        history: "Issued during the last two decades of Travancore's existence as an independent kingdom, this coin bridges the wartime economy and the 1949 accession that ended royal minting altogether.",
    },
    {
        id: "chithira-thirunal-final-cash",
        rulerId: "chithira-thirunal",
        coinType: "Final Copper Cash Issue",
        metal: "Copper",
        denomination: "Cash (Kasu)",
        script: "Malayalam and English",
        circulation: "Thiruvananthapuram mint, final years of the kingdom",
        obverse: {
            desc: "A small conch shell within a plain circular border, among the last coin designs struck before Travancore's 1949 accession.",
            hotspots: [{ x: 50, y: 44, label: "Conch (Shankha)", note: "The very last coin device to carry Travancore's conch before royal minting ended — the emblem itself outlived the kingdom, passing into Kerala's state emblem." }],
        },
        reverse: {
            desc: "A minimal numeral and date, with striking quality showing the mint's declining output in its final years.",
            hotspots: [{ x: 50, y: 55, label: "Final-Years Striking", note: "Softer, less precise striking on these last issues reflects the winding down of the royal mint as integration with India approached." }],
        },
        history: "Among the final coins struck at the Thiruvananthapuram mint, this humble copper Cash closes two centuries of continuous conch-marked Travancore coinage.",
    },
];

// Symbol Evolution: Coin → Symbol → Design Variation → Period
const TRAVANCORE_SYMBOLS = [
    {
        id: "conch",
        name: "Conch Shell (Shankha)",
        icon: "🐚",
        meaning: "The dextrally-coiled conch of Sree Padmanabhaswamy (a form of Vishnu) — Travancore's central royal and state emblem after Marthanda Varma's 1750 CE dedication of the kingdom to the deity.",
        timeline: [
            { period: "1729 – 1750 CE", ruler: "Marthanda Varma (early)", coinType: "Early Venad-style Fanam", variation: "A plain, simply punched conch outline, inherited from older Venad coin traditions predating the 1750 dedication." },
            { period: "1750 – 1758 CE", ruler: "Marthanda Varma (post-dedication)", coinType: "Anantapadmanabha Gold Fanam", variation: "The conch becomes the fixed centrepiece of the coin, formally linked to the kingdom's new dedication to Padmanabhaswamy." },
            { period: "1829 – 1846 CE", ruler: "Swathi Thirunal", variation: "Spiral ridging engraved with new precision, reflecting finer die-cutting under an artistically minded court.", coinType: "Refined Gold Fanam" },
            { period: "1860 – 1880 CE", ruler: "Ayilyam Thirunal", coinType: "Machine-Struck Silver Chuckram", variation: "Sharp, uniform machine-struck relief replaces the slightly uneven hand-struck punches of earlier reigns." },
            { period: "1885 – 1949 CE", ruler: "Sri Mulam Thirunal to Chithira Thirunal", coinType: "Travancore Rupee & later Cash issues", variation: "Simplified for smaller, numeral-marked coins, but never dropped — remaining the one constant symbol across every denomination until 1949." },
        ],
    },
    {
        id: "sree-character",
        name: "Sree Character (ஸ்ரீ / ശ്രീ)",
        icon: "🕉️",
        meaning: "An auspicious Malayalam/Grantha glyph meaning 'sacred' or 'prosperous', used on many early fanams instead of a royal name.",
        timeline: [
            { period: "1750 – 1758 CE", ruler: "Marthanda Varma", coinType: "Anantapadmanabha Gold Fanam", variation: "A single plain glyph fills the reverse field, with no accompanying royal name." },
            { period: "1758 – 1798 CE", ruler: "Karthika Thirunal (Dharma Raja)", coinType: "Silver Chuckram", variation: "Paired above the conch on the obverse for the first time, establishing the classic Sree-and-conch combination." },
            { period: "1810 – 1815 CE", ruler: "Gowri Lakshmi Bayi", coinType: "Gold Fanam (Queen's Issue)", variation: "Slightly enlarged glyph, a subtle stylistic shift useful for dating otherwise unsigned fanams." },
            { period: "1829 – 1846 CE", ruler: "Swathi Thirunal", coinType: "Refined Gold Fanam", variation: "Framed with a light dotted border, adding decorative refinement without changing the core glyph." },
        ],
    },
    {
        id: "lotus",
        name: "Lotus (Padma)",
        icon: "🪷",
        meaning: "A recurring Vaishnava motif referencing Padmanabha ('lotus-naveled' Vishnu), sometimes appearing as a border or field ornament on higher-value coins.",
        timeline: [
            { period: "1750 – 1798 CE", ruler: "Marthanda Varma to Karthika Thirunal", coinType: "Ceremonial gold presentation Fanams", variation: "Small lotus-petal borders occasionally frame the conch on presentation-quality gold pieces, though rare on circulating coin." },
            { period: "1885 – 1924 CE", ruler: "Sri Mulam Thirunal", coinType: "Commemorative & assembly medals", variation: "Lotus motifs appear more often on ceremonial medals tied to the Sri Mulam Popular Assembly rather than everyday coinage." },
        ],
    },
    {
        id: "elephant",
        name: "Elephant",
        icon: "🐘",
        meaning: "A royal and auspicious animal in Kerala tradition, later adopted (alongside the conch) as a supporter figure in Travancore's formal coat of arms.",
        timeline: [
            { period: "19th century CE", ruler: "Various", coinType: "State seals and royal insignia (non-circulating)", variation: "Appears on official seals and royal insignia rather than everyday coin faces during most of the 19th century." },
            { period: "20th century CE (from 1949)", ruler: "Post-1949 (Kerala state emblem)", coinType: "State Emblem of Kerala", variation: "Two elephants are added flanking the conch and national emblem in the 1960 Kerala state emblem, derived directly from Travancore's royal coat of arms." },
        ],
    },
    {
        id: "sun-moon",
        name: "Sun and Crescent Moon",
        icon: "☀️",
        meaning: "A pairing symbolising eternal royal legitimacy ('as long as the sun and moon endure'), a convention shared with several other South Indian kingdoms.",
        timeline: [
            { period: "1758 – 1798 CE", ruler: "Karthika Thirunal (Dharma Raja)", coinType: "Ceremonial gold Fanam varieties", variation: "Occasionally struck as tiny field ornaments beside the conch on select ceremonial gold issues." },
            { period: "1829 – 1846 CE", ruler: "Swathi Thirunal", coinType: "Presentation Fanam", variation: "Rendered with finer, smaller punches as part of the era's generally more detailed die work." },
        ],
    },
    {
        id: "palm-leaf",
        name: "Palm Leaf / Coconut Palm",
        icon: "🌴",
        meaning: "A regional motif referencing Kerala's coconut and palm economy, occasionally used as a border decoration on trade-oriented coinage.",
        timeline: [
            { period: "1885 – 1924 CE", ruler: "Sri Mulam Thirunal", coinType: "Trade tokens and commemorative issues", variation: "Appears mainly on commercial tokens and exhibition medals tied to Travancore's coir and coconut trade, rather than on standard state coinage." },
        ],
    },
];

const TRAVANCORE_TIMELINE = [
    { year: "1729 CE", title: "Marthanda Varma's Accession", desc: "Marthanda Varma begins unifying the smaller Venad principalities into the modern Kingdom of Travancore." },
    { year: "1741 CE", title: "Battle of Colachel", desc: "Travancore defeats the Dutch East India Company, cementing regional power and confidence in the kingdom's coinage." },
    { year: "1750 CE", title: "Thripadidanam — Dedication to Padmanabhaswamy", desc: "Marthanda Varma dedicates the kingdom to Sree Padmanabhaswamy, ruling as 'Padmanabha Dasa'; the conch becomes Travancore's fixed royal emblem." },
    { year: "1758 CE", title: "Karthika Thirunal's Reign Begins", desc: "The Sree-and-conch pairing becomes standard on coin dies amid Mysorean military pressure on the northern frontier." },
    { year: "1810 CE", title: "Gowri Lakshmi Bayi Ascends", desc: "One of Travancore's rare ruling-queen coin issues, struck under growing British Resident oversight." },
    { year: "1829 CE", title: "Swathi Thirunal's Artistic Reign", desc: "Die-cutting for gold and silver coinage becomes noticeably more refined under the polymath king's patronage." },
    { year: "c. 1870s CE", title: "Machine Minting Introduced", desc: "Ayilyam Thirunal's modernisation drive replaces hand-struck punches with mechanised screw-press striking." },
    { year: "1901 CE", title: "Sri Mulam Thirunal's Currency Reform", desc: "The Travancore Rupee is introduced: 1 Rupee = 7 Fanams, 1 Fanam = 4 Chuckrams, 1 Chuckram = 16 Cash, with new English-language legends." },
    { year: "1931 CE", title: "Chithira Thirunal's Reign Begins", desc: "Travancore's last ruling Maharaja takes the throne; coinage continues through the difficult wartime economy of the 1940s." },
    { year: "1949 CE", title: "Accession to India", desc: "Travancore joins the Indian Union and royal minting ends; the conch motif is carried forward into the emblem of the new Kerala state." },
];

const TRAVANCORE_TERRITORY = [
    { id: "thiruvananthapuram", region: "Thiruvananthapuram (Trivandrum)", note: "Travancore's capital from the later 18th century and the site of its principal mint, standing beside the Sree Padmanabhaswamy Temple whose conch gave the kingdom its central emblem.", x: 40, y: 90 },
    { id: "padmanabhapuram", region: "Padmanabhapuram", note: "The kingdom's earlier capital under Marthanda Varma, where the earliest conch-marked gold Fanams were struck before the capital moved north.", x: 41, y: 92 },
    { id: "nagercoil", region: "Nagercoil", note: "A key southern administrative and market town, helping circulate Travancore's silver Chuckrams and copper Cash across the far south of the kingdom.", x: 42, y: 93 },
    { id: "kollam", region: "Kollam (Quilon)", note: "An ancient trading port with its own long coinage history, later absorbed into Travancore's monetary network as a major commercial hub.", x: 38, y: 85 },
    { id: "alappuzha", region: "Alappuzha (Alleppey)", note: "A major 19th-century trade port built up under royal patronage, where Travancore's Rupees and Fanams changed hands alongside British Indian currency in the coir and spice trade.", x: 37, y: 80 },
    { id: "kottayam", region: "Kottayam", note: "An inland commercial centre for the spice and plantation trade, where lower-value Chuckram and Cash coins saw the heaviest everyday circulation.", x: 39, y: 78 },
];

const TRAVANCORE_REFERENCES = [
    { text: "Wikipedia — Travancore Fanam: history, denominations, and circulation of Travancore's traditional gold coinage.", url: "https://en.wikipedia.org/wiki/Travancore_fanam" },
    { text: "Wikipedia — Travancore Rupee: the 1901 currency reform and its subdivision into Fanams, Chuckrams, and Cash.", url: "https://en.wikipedia.org/wiki/Travancore_rupee" },
    { text: "Wikipedia — Emblem of Kerala: the conch (Shankha) of Padmanabhaswamy as it passed from Travancore's royal coat of arms into the modern state emblem.", url: "https://en.wikipedia.org/wiki/Emblem_of_Kerala" },
    { text: "Wikipedia — Marthanda Varma: the founder-king's unification of Travancore and 1750 CE dedication of the kingdom to Sree Padmanabhaswamy.", url: "https://en.wikipedia.org/wiki/Marthanda_Varma" },
    { text: "American Numismatic Society — digital collection records for South Indian princely-state coinage.", url: "https://numismatics.org/" },
    { text: "British Museum Collection — holdings of Travancore and other South Indian princely-state coins.", url: "https://www.britishmuseum.org/collection" },
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        TRAVANCORE_STATS,
        TRAVANCORE_RULERS,
        TRAVANCORE_COINS,
        TRAVANCORE_SYMBOLS,
        TRAVANCORE_TIMELINE,
        TRAVANCORE_TERRITORY,
        TRAVANCORE_REFERENCES,
    };
}
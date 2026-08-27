/**
 * Ahilyabai Holkar Explorer — Data Module
 * Comprehensive historical dataset covering Punyashlok Rajmata Ahilyabai Holkar (1725–1795 CE),
 * her reign over the Holkar State (Malwa), administrative justice, pan-Indian temple restorations,
 * Maheshwar capital and weaving industry, diplomatic governance, timeline, map territories, and scholarly sources.
 */

const AHILYABAI_INFO = {
    id: "ahilyabai-holkar",
    title: "Ahilyabai Holkar — The Queen Who Transformed Malwa",
    subtitle: "Philosopher Queen, Administrative Pioneer & Architectural Patron of India",
    reignPeriod: "1767 – 1795 CE (28-Year Reign)",
    dynasty: "Holkar Dynasty (Maratha Empire)",
    capital: "Maheshwar (on the banks of the sacred Narmada River), Malwa",
    titles: "Punyashlok Rajmata, Subhedar of Malwa",
    commanderInChief: "Tukoji Rao Holkar (Military General & Co-Ruler)",
    quickStats: [
        { label: "Lifespan", value: "1725 – 1795 CE", icon: "👑" },
        { label: "Reign as Ruler", value: "1767 – 1795 CE (28 yrs)", icon: "⚖️" },
        { label: "Capital Center", value: "Maheshwar (Narmada)", icon: "🏰" },
        { label: "Public Works", value: "Pan-Indian Restorations", icon: "🛕" },
        { label: "Handloom Heritage", value: "Maheshwari Sarees", icon: "🧵" },
        { label: "Dynastic Realm", value: "Holkar State (Malwa)", icon: "🚩" }
    ]
};

const AHILYABAI_SECTIONS = [
    {
        id: "early-life",
        title: "Early Life & Rise to Prominence",
        icon: "🌱",
        summary: "Born in Chaundi village (Maharashtra) to Mankoji Shinde; discovered by Malhar Rao Holkar for her piety and sharp intellect.",
        details: [
            "Born on 31 May 1725 in the village of Chaundi, Jamkhed (present-day Ahmednagar district, Maharashtra).",
            "Her father Mankoji Rao Shinde, the village head (Patil), personally educated her in literacy and accountancy despite contemporary societal norms.",
            "In 1733, Malhar Rao Holkar, the founder of the Holkar dynasty and top Maratha commander under Peshwa Baji Rao I, noticed the 8-year-old Ahilya feeding the hungry at a temple and arranged her marriage to his son Khande Rao Holkar."
        ]
    },
    {
        id: "holkar-dynasty",
        title: "The Holkar Dynasty & Succession",
        icon: "🏛️",
        summary: "Overcoming personal grief to assume legitimate constitutional and military leadership of the Holkar State.",
        details: [
            "In 1754, her husband Khande Rao was martyred during the siege of Kumher Fort; Malhar Rao dissuaded her from committing sati, recognizing her immense administrative talent.",
            "Following the death of Malhar Rao (1766) and her young son Male Rao (1767), Ahilyabai petitioned Peshwa Madhavrao I to assume direct governance of the Holkar domains.",
            "Supported by the Holkar army and the Peshwa, she appointed trusted military commander Tukoji Rao Holkar to lead external military campaigns while she personally headed internal civil governance, revenue, and justice."
        ]
    },
    {
        id: "administration",
        title: "Administrative Justice & Governance",
        icon: "⚖️",
        summary: "Direct public audiences, progressive taxation, tribal pacification, and humane rule praised by British and Indian historians.",
        details: [
            "Held daily open Darbars accessible to the humblest subjects, personally reviewing petitions, legal disputes, and revenue audits.",
            "Reformed agrarian tax policies, abolishing oppressive levies on peasants and protecting widows' property inheritance rights from state confiscation.",
            "Successfully integrated Bhil and Gond tribal communities by guaranteeing transit protection rights and employing them as security officers (Bhils of Malwa).",
            "English historian Sir John Malcolm described her reign as 'almost a model of good government; for thirty years her country enjoyed uninterrupted peace and prosperity.'"
        ]
    },
    {
        id: "maheshwar-capital",
        title: "Maheshwar: Political & Cultural Epicenter",
        icon: "🏰",
        summary: "Transforming ancient Mahishmati on the Narmada into a thriving fortified capital, arts hub, and textile metropolis.",
        details: [
            "Shifted the Holkar capital from Indore to Maheshwar in 1767, constructing the majestic Ahilya Fort and Ahilya Ghat overlooking the Narmada.",
            "Established the legendary Maheshwari handloom weaving industry by inviting master weavers from Surat, Mandu, and Hyderabad, creating iconic reversible borders (bugdi) and royal turbans.",
            "Patronized scholars, poets (such as Moropant and Shahir Anant Phandi), sculptors, and musicians, establishing a vibrant cultural renaissance in Central India."
        ]
    },
    {
        id: "temple-restorations",
        title: "Pan-Indian Sacred Architecture & Public Works",
        icon: "🛕",
        summary: "A colossal, nation-spanning philanthropy restoring sacred shrines, ghats, wells, and rest houses from the Himalayas to Kanyakumari.",
        details: [
            "Kashi Vishwanath Temple (Varanasi): Rebuilt the iconic Jyotirlinga temple in 1780 after its previous destruction, constructing Manikarnika and Ahilya Ghats.",
            "Somnath Temple (Gujarat): Rebuilt the sacred coastal Jyotirlinga shrine in 1783 with subterranean sanctums for protection.",
            "Vishnupad Temple (Gaya, Bihar): Built the magnificent 100-foot-tall grey granite octagonal temple over the footprint of Lord Vishnu in 1787.",
            "Char Dham & Beyond: Financed construction of ghats, dharamsalas (inns), stepwells, and free drinking water facilities across Kedarnath, Badrinath, Dwarka, Puri, Rameswaram, Ujjain, Ellora (Grishneshwar), and Nashik."
        ]
    },
    {
        id: "legacy",
        title: "Enduring Legacy & Historiography",
        icon: "🌟",
        summary: "Remembered across India as Punyashlok (sacred in reputation) and a towering symbol of ethical leadership.",
        details: [
            "Maintained peaceful co-existence with neighboring Maratha confederates (Scindia, Gaekwad, Peshwa) and regional kingdoms through astute diplomacy.",
            "Honored posthumously across the subcontinent; Indore's university (Devi Ahilya Vishwavidyalaya) and international airport bear her venerable name.",
            "Celebrated by modern historians as an enlightened monarch who channeled royal treasury revenues entirely into public welfare and cultural preservation."
        ]
    }
];

const MAJOR_ARCHITECTURAL_WORKS = [
    {
        site: "Kashi Vishwanath Temple",
        location: "Varanasi, Uttar Pradesh",
        year: "1777–1780 CE",
        contribution: "Rebuilt the sacred Jyotirlinga temple complex and constructed Ahilya Ghat and Manikarnika Ghat renovations."
    },
    {
        site: "Vishnupad Temple",
        location: "Gaya, Bihar",
        year: "1787 CE",
        contribution: "Constructed the monumental 100-foot solid granite temple structure over the sacred footprint of Lord Vishnu."
    },
    {
        site: "Somnath Jyotirlinga Temple",
        location: "Prabhas Patan, Gujarat",
        year: "1783 CE",
        contribution: "Restored and built the historic Ahilyabai Somnath temple with protective subterranean sanctum."
    },
    {
        site: "Grishneshwar Temple",
        location: "Ellora, Maharashtra",
        year: "1780s CE",
        contribution: "Reconstructed the 12th Jyotirlinga temple in red stone near the UNESCO World Heritage Ellora Caves."
    },
    {
        site: "Ahilya Fort & Ahilya Ghat",
        location: "Maheshwar, Madhya Pradesh",
        year: "1767–1795 CE",
        contribution: "Constructed the royal riverside citadel, stone steps, chhatris, and administrative complex along the Narmada."
    },
    {
        site: "Mahakaleshwar & Omkareshwar",
        location: "Ujjain & Mandhata, MP",
        year: "1770s–1780s CE",
        contribution: "Renovated ghats, constructed dharamsalas, daily food-distribution centers (annakshetras), and temple mandapas."
    }
];

const HOLKAR_TERRITORY_MAP_SITES = [
    {
        name: "Maheshwar (Royal Capital)",
        region: "Nimar / Malwa, MP",
        role: "Administrative & Handloom Capital",
        desc: "Seat of governance on the Narmada river, site of Ahilya Fort, court darbars, and thriving handloom ateliers."
    },
    {
        name: "Indore (Commercial Hub)",
        region: "Malwa Plateau, MP",
        role: "Trading Metropolis & Rajwada Palace",
        desc: "Commercial capital developed under Malhar Rao and Ahilyabai, connecting North and Deccan trade routes."
    },
    {
        name: "Chaundi (Birthplace)",
        region: "Ahmednagar, Maharashtra",
        role: "Ancestral Homeland",
        desc: "Birthplace where Ahilyabai grew up and was noticed by Malhar Rao Holkar."
    },
    {
        name: "Varanasi, Gaya & Somnath",
        region: "Uttar Pradesh, Bihar & Gujarat",
        role: "Pan-Indian Philanthropic Outposts",
        desc: "Major sacred centers where Holkar trust funds permanently endowed temple priests, rest houses, and pilgrim amenities."
    }
];

const AHILYABAI_TIMELINE = [
    {
        year: "31 May 1725",
        title: "Birth at Chaundi",
        desc: "Born to Mankoji Shinde in the village of Chaundi, Ahmednagar, Maharashtra."
    },
    {
        year: "1733 CE",
        title: "Marriage to Khande Rao Holkar",
        desc: "Malhar Rao Holkar brings Ahilyabai into the Holkar dynasty as his daughter-in-law."
    },
    {
        year: "1754 CE",
        title: "Martyrdom of Khande Rao & Dissuasion from Sati",
        desc: "Her husband dies at the Siege of Kumher; Malhar Rao convinces her to live and co-administer the realm."
    },
    {
        year: "1767 CE",
        title: "Accession to the Throne of Malwa",
        desc: "Formally assumes rule of the Holkar State with the blessings of Peshwa Madhavrao I; shifts capital to Maheshwar."
    },
    {
        year: "1780 CE",
        title: "Reconstruction of Kashi Vishwanath",
        desc: "Completes the grand rebuilding of the Kashi Vishwanath temple and adjoining Varanasi ghats."
    },
    {
        year: "1787 CE",
        title: "Construction of Vishnupad Temple at Gaya",
        desc: "Dedicates the grand grey granite temple complex at Gaya for millions of annual pilgrims."
    },
    {
        year: "13 Aug 1795",
        title: "Demise & Immortal Legacy",
        desc: "Passes away at age 70 at Maheshwar Fort after an illustrious 28-year reign of uninterrupted peace and prosperity."
    }
];

const AHILYABAI_SOURCES = [
    {
        author: "Sir John Malcolm",
        work: "A Memoir of Central India, Including Malwa and Adjoining Provinces (Vol. I)",
        year: "1823 / 1832",
        note: "Pivotal early 19th-century historical chronicle based on eyewitness accounts, court records, and local folklore across Malwa."
    },
    {
        author: "V. V. Thakur",
        work: "Life of Ahilyabai Holkar",
        year: "1928",
        note: "Detailed Marathi and English historiographical biography drawing from state correspondence and Peshwa archives."
    },
    {
        author: "P. K. Sethi, R. Bhatt, & R. Holkar",
        work: "The Architecture of the Holkars",
        year: "1983",
        note: "Comprehensive documentation of Ahilyabai's architectural commissions, stone carving standards, and temple trusts."
    },
    {
        author: "Stewart Gordon",
        work: "The Marathas 1600–1818 (New Cambridge History of India)",
        year: "1993",
        note: "Scholarly evaluation of the Holkar state within the Maratha confederacy and 18th-century Indian political economy."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AHILYABAI_INFO,
        AHILYABAI_SECTIONS,
        MAJOR_ARCHITECTURAL_WORKS,
        HOLKAR_TERRITORY_MAP_SITES,
        AHILYABAI_TIMELINE,
        AHILYABAI_SOURCES
    };
}

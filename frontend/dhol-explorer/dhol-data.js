/**
 * Dhol Explorer — Data Module
 * Comprehensive dataset covering overview, regional variants, rhythm patterns,
 * festivals, dance traditions, construction steps, anatomy points, gallery, and references.
 */

const DHOL_INFO = {
    id: 'dhol',
    title: 'Dhol — The Beat of Indian Celebrations',
    tagline: 'A double-headed barrel drum whose booming beat has driven Indian weddings, harvests, and festivals for centuries.',
    overview:
        "The dhol is a large, double-headed barrel drum played by striking both membranes with two distinct sticks — a thick, curved wooden stick called the dagga on the bass side, and a thin flexible cane stick called the tilli on the treble side. Slung over the shoulder with a strap and played standing up, its thunderous sound carries across entire streets and open fields, making it the heartbeat of Indian celebration.",
    classification:
        "In the ancient Natyashastra classification of Indian instruments, the dhol belongs to the Avanaddh Vadya (membranophone / percussion) family — instruments whose acoustic resonance comes from a tightly stretched animal skin membrane mounted on a hollow resonant chamber.",
    quickStats: [
        { label: 'Family', value: 'Avanaddh Vadya', icon: '🥁' },
        { label: 'Acoustic Structure', value: 'Double-headed barrel', icon: '🛢️' },
        { label: 'Traditional Sticks', value: 'Dagga & Tilli', icon: '🥢' },
        { label: 'Core Geography', value: 'Pan-India & Global Diaspora', icon: '📍' },
        { label: 'Resonant Timber', value: 'Sheesham / Mango Wood', icon: '🌳' },
        { label: 'Cultural Role', value: 'Festivals, Processions, Folk Dance', icon: '🎉' }
    ]
};

/**
 * Interactive Rhythms for the Virtual Dhol Studio.
 * Real authentic bols and timings for Web Audio sequencer.
 */
const DHOL_RHYTHMS = [
    {
        id: 'chaal',
        name: 'Bhangra Chaal (8 Beats)',
        region: 'Punjab',
        tempo: 128,
        description: 'The iconic 8-beat syncopated heartbeat of Bhangra. Notice the swing on the bass dagga stroke.',
        bols: 'Dha · Ge · Na · Tin · Na · Ke · Dha · Dha',
        pattern: [
            { beat: 0, bass: true, treble: true },
            { beat: 1, bass: false, treble: true },
            { beat: 2, bass: true, treble: false },
            { beat: 3, bass: false, treble: true },
            { beat: 4, bass: true, treble: true },
            { beat: 5, bass: false, treble: true },
            { beat: 6, bass: true, treble: false },
            { beat: 7, bass: false, treble: true }
        ]
    },
    {
        id: 'dhak-aarti',
        name: 'Durga Puja Dhak (6 Beats)',
        region: 'West Bengal',
        tempo: 140,
        description: 'Fast, rolling ceremonial rhythm played during evening Aarti and Dhunuchi Naach in front of Goddess Durga.',
        bols: 'Dha · Kere · Kere · Dha · Tin · Tin',
        pattern: [
            { beat: 0, bass: true, treble: true },
            { beat: 1, bass: false, treble: true },
            { beat: 2, bass: false, treble: true },
            { beat: 3, bass: true, treble: false },
            { beat: 4, bass: false, treble: true },
            { beat: 5, bass: false, treble: true }
        ]
    },
    {
        id: 'dhol-tasha',
        name: 'Ganeshotsav Visarjan (4 Beats)',
        region: 'Maharashtra',
        tempo: 132,
        description: 'Massive, driving 4/4 processional beat played by synchronized pathaks during Ganpati Visarjan.',
        bols: 'Dhum · Dhum · Tasha-Roll · Dha',
        pattern: [
            { beat: 0, bass: true, treble: true },
            { beat: 1, bass: true, treble: false },
            { beat: 2, bass: false, treble: true },
            { beat: 3, bass: true, treble: true }
        ]
    },
    {
        id: 'bihu-groove',
        name: 'Rongali Bihu (7 Beats)',
        region: 'Assam',
        tempo: 144,
        description: 'Lively, joyful folk cadence accompanying the pepa horn during the Assamese springtime festival.',
        bols: 'Dhit · Ta · Dhit · Dhit · Ta · Dhi · Ta',
        pattern: [
            { beat: 0, bass: true, treble: false },
            { beat: 1, bass: false, treble: true },
            { beat: 2, bass: true, treble: true },
            { beat: 3, bass: true, treble: false },
            { beat: 4, bass: false, treble: true },
            { beat: 5, bass: true, treble: false },
            { beat: 6, bass: false, treble: true }
        ]
    }
];

/**
 * Regional variants with rich photography & details
 */
const REGIONAL_VARIANTS = [
    {
        id: 'punjabi-dhol',
        name: 'Punjabi Dhol',
        region: 'Punjab & North India',
        category: 'Folk & Harvest',
        emoji: '🥁',
        image: 'assets/punjabi-dhol.svg',
        fallback: 'assets/dhol-anatomy.svg',
        summary: 'The archetypal dhol — worn on a shoulder strap, driving high-energy Bhangra and Baisakhi processions.',
        details:
            'The Punjabi dhol is the most widely recognized form of the instrument: a cylindrical wooden shell carved from sheesham (Indian rosewood) or mango wood with goat-skin heads on both ends. It is played standing with the curved wooden dagga on the deep bass "nar" side and the light flexible cane tilli on the higher "madeen" side. Its signature syncopated "chaal" rhythm powers Punjabi weddings (baraats) and the Baisakhi harvest festival.',
        rhythmNote: 'Signature rhythm: 8-beat Chaal',
        dimensions: 'Length: 22–26 inches · Bass Diameter: 13–15 inches',
        keyFeatures: 'Curved dagga stick · Goat skin heads with dhol masala tuning paste · Braided shoulder strap'
    },
    {
        id: 'bengali-dhak',
        name: 'Bengali Dhak',
        region: 'West Bengal, Tripura & Odisha',
        category: 'Devotional & Ceremonial',
        emoji: '🪘',
        image: 'assets/bengali-dhak.svg',
        fallback: 'assets/dhol-ensemble.svg',
        summary: 'A towering barrel drum decorated with white crane feathers, played by Dhakis during Durga Puja.',
        details:
            'The dhak is a majestic, large barrel drum synonymous with the soul of Bengal\'s Durga Puja. Master dhakis (drummers) suspend the drum horizontally around their neck and play with two thin, springy cane sticks while performing acrobatic dance moves during the Dhunuchi Naach and Sandhi Puja. Its deep, resonant acoustic boom is considered the sonic manifestation of divine triumph.',
        rhythmNote: 'Signature rhythm: Dhunuchi Naach & Aarti Tala',
        dimensions: 'Length: 30–36 inches · Diameter: 14–16 inches',
        keyFeatures: 'Decorated with feathers and crimson cloth · Played with dual cane sticks · Performed with dramatic dance'
    },
    {
        id: 'dhol-tasha',
        name: 'Maharashtrian Dhol-Tasha',
        region: 'Maharashtra & Goa',
        category: 'Street Procession',
        emoji: '🎶',
        image: 'assets/dhol-tasha.svg',
        fallback: 'assets/dhol-ensemble.svg',
        summary: 'Heavy, high-tension dhols played in synchronized squads (pathaks) of hundreds during Ganeshotsav.',
        details:
            'In Maharashtra, dhol performance is a grand community discipline organized into pathaks (troupes) consisting of hundreds of uniformed men and women. The dhol is paired with the piercing, metallic crack of the Tasha (kettle drum) and the resonant chime of the Tol (cymbal). During the 10-day Ganeshotsav festival in Pune and Mumbai, massed pathaks create a thundering soundscape celebrated globally.',
        rhythmNote: 'Signature rhythm: Ganeshotsav Visarjan Taal',
        dimensions: 'Length: 24–28 inches · Weight: 12–18 kg',
        keyFeatures: 'High-tension rope and bolt tuning · Dual heavy wooden beaters · Synchronized pathak choreography'
    },
    {
        id: 'assam-dhol',
        name: 'Bihu Dhol',
        region: 'Assam & Northeast India',
        category: 'Folk & Spring Harvest',
        emoji: '🌾',
        image: 'assets/bihu-dhol.svg',
        fallback: 'assets/dhol-anatomy.svg',
        summary: 'A slightly conical drum played with bare hand and stick, inspiring the graceful, energetic Bihu dance.',
        details:
            'The Assamese Dhol (Pati Dhol) is central to the springtime Bohag Bihu festival. Made from hollowed jackfruit wood or hollowed timber, it is played with a bamboo stick (dholer kathi) in the right hand and bare fingers on the left head. The drummer (Dhulia) leads the rhythmic dialogue with dancers, matching the trill of the buffalo-horn pepa and the clapping of bamboo gogona.',
        rhythmNote: 'Signature rhythm: Bihu Nachar Tala',
        dimensions: 'Length: 18–22 inches · Slightly asymmetrical ends',
        keyFeatures: 'Played with hand + stick · Paired with Pepa (horn) · Jackfruit wood body'
    },
    {
        id: 'nagara-dhol',
        name: 'Nagara & Nagada',
        region: 'Rajasthan, UP & Gujarat',
        category: 'Royal & Temple Percussion',
        emoji: '🏺',
        image: 'assets/dhol-sticks.svg',
        fallback: 'assets/dhol-sticks.svg',
        summary: 'Conical and hemispherical copper/wood kettle drums, played with curved sticks in royal darbars and temples.',
        details:
            'The nagara (or naqqara) represents the ancient kettle drum lineage in the subcontinent. Historically sounded from the Naubat Khana (drum gates) of palaces to announce royal arrivals, war mobilizations, and dawn prayers, it continues to provide thunderous accompaniment to Rajasthani folk dances (Ghoomar, Kalbelia), Garba, and folk theater like Nautanki.',
        rhythmNote: 'Signature rhythm: Naubat & Garba Theka',
        dimensions: 'Diameter: 18–36 inches (paired high/low drums)',
        keyFeatures: 'Heavy copper or terracotta bowl · Thick leather lacing · Played with curved wooden sticks'
    },
    {
        id: 'koli-dhol',
        name: 'Koli Dhol',
        region: 'Coastal Maharashtra & Konkan',
        category: 'Maritime Folk',
        emoji: '⚓',
        image: 'assets/dhol-construction-shell.svg',
        fallback: 'assets/dhol-construction-shell.svg',
        summary: 'A buoyant, sharp percussion drum driving the coastal fishing songs and Narali Purnima celebrations.',
        details:
            'Played by the indigenous Koli seafaring communities of Mumbai and the Konkan coast, this dhol variant drives vibrant sea songs and rowing dances. At the onset of the fishing season on Narali Purnima (Coconut Day), drummers lead colorful processions to the Arabian Sea to offer prayers for safe sailing and bumper catches.',
        rhythmNote: 'Signature rhythm: Koli Geete Maritime Beat',
        dimensions: 'Length: 20–24 inches · Light, portable frame',
        keyFeatures: 'High-pitch snappy heads · Played during coastal boat launches and weddings'
    }
];

const FESTIVALS = [
    {
        name: 'Baisakhi (Vaisakhi)',
        region: 'Punjab & North India',
        icon: '🌾',
        category: 'Harvest',
        image: 'assets/punjabi-dhol.svg',
        description: 'The golden wheat harvest festival where dhol players lead Bhangra dancers in joyous community thanksgiving across Punjab.'
    },
    {
        name: 'Durga Puja',
        region: 'West Bengal & Kolkata',
        icon: '🪔',
        category: 'Religious',
        image: 'assets/bengali-dhak.svg',
        description: 'Dhakis fill the air with pulsating beats during Aarti and the energetic Dhunuchi dance, creating the unmistakable sonic identity of Puja.'
    },
    {
        name: 'Ganesh Chaturthi (Ganeshotsav)',
        region: 'Maharashtra',
        icon: '🐘',
        category: 'Religious',
        image: 'assets/dhol-tasha.svg',
        description: 'Hundreds of synchronized drummers in Dhol-Tasha Pathaks lead the Visarjan processions, reverberating through city streets.'
    },
    {
        name: 'Bohag Bihu (Rongali Bihu)',
        region: 'Assam',
        icon: '🌱',
        category: 'Harvest',
        image: 'assets/bihu-dhol.svg',
        description: 'The Assamese Spring Festival celebrating fertility and new life, driven by the rhythmic dialogue of the Bihu Dhol and pepa horn.'
    },
    {
        name: 'Indian Wedding Baraat',
        region: 'Pan-India & Diaspora',
        icon: '💍',
        category: 'Wedding',
        image: 'assets/dhol-ensemble.svg',
        description: 'No Indian wedding procession is complete without dhol players guiding the groom\'s baraat party with infectious celebratory beats.'
    },
    {
        name: 'Holi & Spring Fairs',
        region: 'North & Central India',
        icon: '🎨',
        category: 'Harvest',
        image: 'assets/dhol-anatomy.svg',
        description: 'Dhol rhythms echo across village squares and city lanes during the Festival of Colors, uniting crowds in spontaneous folk dance.'
    }
];

const DANCE_TRADITIONS = [
    {
        name: 'Bhangra',
        region: 'Punjab',
        image: 'assets/punjabi-dhol.svg',
        description: 'High-octane athletic folk dance featuring leaps, kicks, and claps structured entirely around the dhol\'s commanding 8-beat chaal rhythm.'
    },
    {
        name: 'Giddha',
        region: 'Punjab',
        image: 'assets/dhol-sticks.svg',
        description: 'The elegant female counterpart to Bhangra, where dholak and dhol beats interplay with boliyan (couplets) and syncopated hand-claps.'
    },
    {
        name: 'Dhol-Tasha Pathak Performance',
        region: 'Maharashtra',
        image: 'assets/dhol-tasha.svg',
        description: 'Mass performance art where drummers execute synchronized stick movements, rhythmic call-and-response, and dynamic tempo escalations.'
    },
    {
        name: 'Bihu Dance',
        region: 'Assam',
        image: 'assets/bihu-dhol.svg',
        description: 'Characterized by brisk steps, rapid hand gestures, and rhythmic swaying of hips, timed to the Dhulia’s intricate dhol changes.'
    },
    {
        name: 'Purulia & Mayurbhanj Chhau',
        region: 'Odisha & West Bengal',
        image: 'assets/bengali-dhak.svg',
        description: 'Martial dance-drama depicting epics like the Ramayana and Mahabharata, where heavy dhol beats simulate clashing armor and thunderous combat.'
    }
];

const CONSTRUCTION_STEPS = [
    {
        step: 1,
        title: 'Shaping the Solid Shell (Dhor)',
        description: 'Artisans hollow out a seasoned single log of Sheesham (Dalbergia sissoo) or Mango wood on a manual lathe to achieve optimal acoustic resonance and structural strength.',
        image: 'assets/dhol-construction-shell.svg',
        details: 'The barrel is thicker in the middle and gently tapers towards both ends, creating two chambers that enhance bass resonance.'
    },
    {
        step: 2,
        title: 'Preparing the Skin Membranes (Chauni)',
        description: 'Two goat-skin hides of varying thickness are scraped, treated, and cured. The bass side receives a special herbal/iron-filings tuning paste (dhol masala) applied to its inner center.',
        image: 'assets/dhol-construction-heads.svg',
        details: 'The added mass of the paste lowers the fundamental pitch on the "nar" head, yielding that deep, booming punch.'
    },
    {
        step: 3,
        title: 'Mounting on Bamboo Rings (Gojra)',
        description: 'Each prepared skin is stretched wet over a flexible bamboo hoop or welded metal ring (gojra), folded back and stitched around the outer edge with durable hemp twine.',
        image: 'assets/dhol-construction-heads.svg',
        details: 'This prevents the hide from slipping or tearing once intense tension is applied by the ropes.'
    },
    {
        step: 4,
        title: 'Criss-Cross Lacing & Tension Rings',
        description: 'High-strength cotton rope is woven in a zigzag geometry between the two head rings. Small steel or brass tuning rings (kadiyan) are slid onto rope pairs for on-the-fly pitch adjustment.',
        image: 'assets/dhol-construction-lacing.svg',
        details: 'Sliding the rings upward tightens the lacing, raising the pitch for crisp treble resonance.'
    },
    {
        step: 5,
        title: 'Polishing & Shoulder Strap Fitting',
        description: 'The exterior wood is sealed with lacquer, decorated with brass studs or decorative tassels, and fitted with an adjustable wide woven shoulder strap (gati) for mobile performance.',
        image: 'assets/dhol-construction-lacing.svg',
        details: 'The finished dhol is balanced to rest at the player\'s hip level for effortless striking with dagga and tilli.'
    }
];

const GALLERY_ITEMS = [
    {
        title: 'Dhol Anatomy & Tuning System',
        caption: 'A complete breakdown of the barrel shell, leather heads, lacing, and tuning rings.',
        image: 'assets/dhol-anatomy.svg'
    },
    {
        title: 'Dagga & Tilli Playing Sticks',
        caption: 'The curved hardwood dagga for booming bass, and the thin flexible cane tilli for crisp slap strokes.',
        image: 'assets/dhol-sticks.svg'
    },
    {
        title: 'Dhol-Tasha Street Ensemble',
        caption: 'Massed drummers creating synchronized rhythm waves during public festivals.',
        image: 'assets/dhol-ensemble.svg'
    },
    {
        title: 'Punjabi Bhangra Dhol',
        caption: 'Traditional Punjabi dhol adorned with bright festive tassels and shoulder strap.',
        image: 'assets/punjabi-dhol.svg'
    },
    {
        title: 'Durga Puja Dhak',
        caption: 'Majestic Bengali dhak decorated with white crane plumage and red gamchha.',
        image: 'assets/bengali-dhak.svg'
    },
    {
        title: 'Assamese Bihu Dhol & Pepa',
        caption: 'Assamese folk drum wrapped in red-white Gamosa alongside buffalo horn Pepa.',
        image: 'assets/bihu-dhol.svg'
    }
];

const CULTURAL_SIGNIFICANCE = [
    {
        title: 'The Voice of Community & Collective Joy',
        description: 'Because a single dhol can be heard for over a kilometer, it has served as the communal beacon that calls villages and neighborhoods together — transforming private moments into shared cultural celebrations.'
    },
    {
        title: 'Oral Heritage & Master-Apprentice Tradition',
        description: 'Dhol bols (verbal rhythmic mnemonics) and intricate finger and wrist techniques are transmitted orally from Ustad to Shagird across generations of hereditary musician families (Mirasis, Dhakis).'
    },
    {
        title: 'Global Musical Impact & Fusion',
        description: 'From UK Punjabi garage and Bhangra pop to Bollywood soundtracks and international festival stages, the dhol is one of India\'s most recognizable musical ambassadors worldwide.'
    }
];

const REFERENCES = [
    { text: 'Chandrakantha.com — Organology, Construction & Playing Styles of Dhol.', link: 'https://chandrakantha.com/music-and-dance/instrumental-music/indian-instruments/dhol/' },
    { text: 'Sangeet Natak Akademi — Folk Music & Percussion Traditions of India.', link: 'https://sangeetnatak.gov.in' },
    { text: 'SikhiWiki — The History & Sacred Role of Dhol in Punjabi Tradition.', link: 'https://www.sikhiwiki.org/index.php/Dhol' },
    { text: 'Sahapedia — Cultural Significance of Bengal’s Dhakis and Durga Puja.', link: 'https://www.sahapedia.org' }
];

const IMAGE_CREDITS = [
    'Original Vector Artwork & Heritage Illustrations: Custom SVG artwork created for Incredible India Explorer.',
    'Organological Data & Performance Traditions: Sangeet Natak Akademi & Indian Folk Music Archives.'
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DHOL_INFO,
        DHOL_RHYTHMS,
        REGIONAL_VARIANTS,
        FESTIVALS,
        DANCE_TRADITIONS,
        CONSTRUCTION_STEPS,
        GALLERY_ITEMS,
        CULTURAL_SIGNIFICANCE,
        REFERENCES,
        IMAGE_CREDITS
    };
}

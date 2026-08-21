/**
 * Dhol Explorer — Data Module
 * Overview, regional variations, festivals, dance traditions,
 * traditional construction, cultural significance, gallery, and references.
 */

const DHOL_INFO = {
    id: 'dhol',
    title: 'Dhol — The Beat of Indian Celebrations',
    tagline: 'A double-headed barrel drum whose booming beat has driven Indian weddings, harvests, and festivals for centuries.',
    overview:
        "The dhol is a large, double-headed barrel drum played by striking both membranes with two different sticks — a thick, curved stick called the dagga on the bass side, and a thin cane stick called the tilli (or tihali) on the treble side. Slung over the shoulder with a strap and played standing up, it is loud enough to lead an entire procession, which is exactly the role it has held in South Asian life for generations: announcing news, leading wedding processions (baraats), driving harvest dances, and powering festival crowds.",
    classification:
        "In the traditional Hindustani classification of instruments, the dhol belongs to the Avanaddh Vadya (membranophone / percussion) family — instruments whose sound comes from a stretched membrane, alongside the tabla and pakhawaj.",
    quickStats: [
        { label: 'Family', value: 'Avanaddh Vadya', icon: '🥁' },
        { label: 'Shape', value: 'Double-headed barrel', icon: '🛢️' },
        { label: 'Sticks', value: 'Dagga & Tilli', icon: '🥢' },
        { label: 'Core Regions', value: 'Punjab & Pan-India', icon: '📍' },
        { label: 'Common Wood', value: 'Mango / Sheesham', icon: '🌳' },
        { label: 'Role', value: 'Festivals, Weddings, Dance', icon: '🎉' }
    ]
};

/**
 * Interactive Regional Instrument Explorer data.
 * Each entry is a dhol-family drum tied to a specific region, rendered as a
 * clickable card grid; selecting one updates the detail panel.
 */
const REGIONAL_VARIANTS = [
    {
        id: 'punjabi-dhol',
        name: 'Punjabi Dhol',
        region: 'Punjab',
        emoji: '🥁',
        summary: 'The archetypal dhol — barrel-shaped, worn on a shoulder strap, driving Bhangra and Baisakhi.',
        details:
            'The Punjabi dhol is the best-known form of the instrument: a cylindrical wooden shell with goat-skin heads on both ends, played with the curved dagga on the deep "nar" side and the light cane tilli on the higher "madeen" side. Its signature eight-beat "chaal" rhythm is the backbone of Bhangra and is played at weddings, Baisakhi harvest celebrations, and Sikh religious processions.',
        rhythmNote: 'Signature rhythm: the 8-beat Chaal'
    },
    {
        id: 'bengali-dhak',
        name: 'Dhak',
        region: 'West Bengal & Odisha',
        emoji: '🪘',
        summary: 'A taller, deeper cousin of the dhol, played with bare hands and sticks during Durga Puja.',
        details:
            'The dhak is a larger, narrower barrel drum associated above all with Durga Puja. Dhakis (dhak players) sling the drum low and play with a stick in one hand while the other keeps a driving pulse, often performing dramatic dance movements themselves in front of the goddess as part of the "dhunuchi" and aarti rituals. Its deep, rolling tone is considered inseparable from the sound of the Puja itself.',
        rhythmNote: 'Central to Durga Puja aarti performances'
    },
    {
        id: 'dhol-tasha',
        name: 'Dhol-Tasha',
        region: 'Maharashtra',
        emoji: '🎶',
        summary: 'A flatter, broader dhol paired with the higher-pitched Tasha kettle drum for street processions.',
        details:
            'In Maharashtra, the dhol is played in large ensembles (pathaks) alongside the Tasha, a bowl-shaped kettle drum played with thin sticks. Thousands of performers in matching uniforms parade through the streets during Ganesh Chaturthi, turning the immersion procession (visarjan) into a thunderous, synchronized performance that has become a cultural phenomenon of its own.',
        rhythmNote: 'Massed street ensembles during Ganeshotsav'
    },
    {
        id: 'nagara-dhol',
        name: 'Nagara',
        region: 'North India',
        emoji: '🏺',
        summary: 'A bowl-shaped percussion cousin, played with curved sticks in temples and royal courts.',
        details:
            'Distinct from the barrel-shaped dhol, the nagara is a large bowl-shaped drum, historically played in pairs from fort ramparts and temple gateways to announce time, mark royal processions, and accompany devotional music. It shares the dhol family\'s role as a loud, public, ceremonial instrument even though its construction is different.',
        rhythmNote: 'Ceremonial and devotional announcements'
    },
    {
        id: 'koli-dhol',
        name: 'Koli Dhol',
        region: 'Coastal Maharashtra & Goa',
        emoji: '⚓',
        summary: 'A fishing-community variant used in Koli folk songs and coastal harvest celebrations.',
        details:
            'Played by Koli fishing communities along the western coast, this dhol variant accompanies energetic Koli folk songs and dances that dramatize the rhythms of the sea and the fishing catch, often performed at community festivals and weddings.',
        rhythmNote: 'Coastal folk songs and harvest dances'
    },
    {
        id: 'assam-dhol',
        name: 'Bihu Dhol',
        region: 'Assam',
        emoji: '🌾',
        summary: 'A slightly conical dhol played with a hand and a stick to power the Bihu dance.',
        details:
            'The Assamese dhol used in Bihu dance is played with one bare hand on one side and a thin stick on the other, alongside the pepa (buffalo-horn wind instrument). Together they drive the fast, energetic footwork of Bihu, performed during Bohag Bihu to welcome the Assamese New Year and the spring harvest.',
        rhythmNote: 'Powers the springtime Bihu dance'
    }
];

const FESTIVALS = [
    {
        name: 'Baisakhi',
        region: 'Punjab',
        icon: '🌾',
        description: 'The Punjabi harvest festival where dhol beats lead Bhangra performances celebrating the wheat harvest and the founding of the Khalsa.'
    },
    {
        name: 'Durga Puja',
        region: 'West Bengal',
        icon: '🪔',
        description: 'Dhak players perform elaborate rhythmic routines during aarti, considered as essential to the Puja atmosphere as the idol itself.'
    },
    {
        name: 'Ganesh Chaturthi',
        region: 'Maharashtra',
        icon: '🐘',
        description: 'Dhol-Tasha pathaks accompany Ganpati processions and the immersion (visarjan), turning the streets into a moving wall of sound.'
    },
    {
        name: 'Bohag Bihu',
        region: 'Assam',
        icon: '🌱',
        description: 'The Assamese New Year and spring harvest festival, where the dhol and pepa drive the energetic Bihu dance.'
    },
    {
        name: 'Punjabi & North Indian Weddings',
        region: 'Pan-India',
        icon: '💍',
        description: 'A dhol player traditionally leads the groom\'s baraat procession and the milni ceremony, setting the celebratory tone for the wedding.'
    },
    {
        name: 'Holi & Village Melas',
        region: 'North & Central India',
        icon: '🎨',
        description: 'Dhol beats accompany color-throwing crowds and village fairs, turning informal street gatherings into spontaneous dance.'
    }
];

const DANCE_TRADITIONS = [
    {
        name: 'Bhangra',
        region: 'Punjab',
        description: 'A vigorous, high-energy folk dance built entirely around the dhol\'s beat, historically performed by farmers celebrating the harvest and now a global Punjabi cultural export.'
    },
    {
        name: 'Giddha',
        region: 'Punjab',
        description: 'A women\'s folk dance often performed alongside or after Bhangra, where dhol rhythms interact with clapping and boliyan (rhythmic couplets).'
    },
    {
        name: 'Dhol-Tasha Processions',
        region: 'Maharashtra',
        description: 'Choreographed, uniformed troupes performing synchronized dhol-tasha rhythm patterns as they march — a modern performance tradition rooted in Ganeshotsav.'
    },
    {
        name: 'Bihu Dance',
        region: 'Assam',
        description: 'Fast, athletic footwork and hand movements performed by young men and women to the beat of the dhol and the call of the pepa horn.'
    },
    {
        name: 'Chhau',
        region: 'Odisha, Jharkhand & West Bengal',
        description: 'A semi-classical masked martial dance-drama where the dhol, alongside dhamsa and shehnai, drives dramatic battle and mythological sequences.'
    }
];

const CONSTRUCTION_STEPS = [
    {
        step: 1,
        title: 'Shaping the Shell (Dhor)',
        description: 'A cylindrical or barrel-shaped shell is carved and hollowed from a single seasoned log — commonly mango or sheesham (rosewood) wood — chosen for strength and resonance.',
        image: 'assets/dhol-construction-shell.svg'
    },
    {
        step: 2,
        title: 'Preparing the Heads (Chauni)',
        description: 'Two goat-skin membranes of different thickness are prepared: a thicker hide for the deep bass side (nar) and a thinner one for the higher treble side (madeen).',
        image: 'assets/dhol-construction-heads.svg'
    },
    {
        step: 3,
        title: 'Mounting on Rings (Gojra)',
        description: 'Each skin is stretched over a bamboo or metal ring so it can be fitted evenly over the open ends of the shell without tearing under tension.',
        image: 'assets/dhol-construction-heads.svg'
    },
    {
        step: 4,
        title: 'Lacing & Tensioning',
        description: 'Rope is threaded in a crisscross zigzag pattern between the two rings, often passing through small metal rings that can be slid along the rope to fine-tune the pitch of each head.',
        image: 'assets/dhol-construction-lacing.svg'
    },
    {
        step: 5,
        title: 'Finishing & Fitting the Strap',
        description: 'The shell is polished and sometimes painted or engraved, and a strap is fitted so the drum can be slung across the player\'s shoulder for standing, mobile performance.',
        image: 'assets/dhol-construction-lacing.svg'
    }
];

const GALLERY_ITEMS = [
    {
        title: 'Dhol Anatomy',
        caption: 'A labeled view of the barrel shell, the two membrane heads, and the lacing that tunes them.',
        image: 'assets/dhol-anatomy.svg'
    },
    {
        title: 'Dagga & Tilli',
        caption: 'The two sticks used to play a dhol: the thick, curved dagga for bass, and the thin cane tilli for treble.',
        image: 'assets/dhol-sticks.svg'
    },
    {
        title: 'Dhol-Tasha Ensemble',
        caption: 'Dhol players performing in a synchronized street ensemble alongside Tasha kettle drums during Ganeshotsav.',
        image: 'assets/dhol-ensemble.svg'
    }
];

const CULTURAL_SIGNIFICANCE = [
    {
        title: 'The Sound of Collective Joy',
        description: 'Because a single dhol can be heard over an entire crowd, it has long served as the instrument that gathers people together — for a wedding procession, a harvest dance, or a festival immersion — making celebration a shared, public event rather than a private one.'
    },
    {
        title: 'A Living Oral Tradition',
        description: 'Dhol rhythms and playing techniques are passed down directly from teacher to student and within families of players, rather than through written notation, keeping the tradition tightly connected to specific communities and regions.'
    },
    {
        title: 'A Global Cultural Ambassador',
        description: 'Through the international spread of Bhangra and Punjabi diaspora communities, the dhol has become one of the most internationally recognizable Indian instruments, appearing in global pop, film soundtracks, and fusion music.'
    }
];

const REFERENCES = [
    { text: 'Chandrakantha.com — construction and playing technique of the dhol.', link: 'https://chandrakantha.com/music-and-dance/instrumental-music/indian-instruments/dhol/' },
    { text: 'SikhiWiki — Dhol construction, tuning, and Bhangra accompaniment.', link: 'https://www.sikhiwiki.org/index.php/Dhol' },
    { text: 'Sangeet Natak Akademi — documentation of Indian folk and classical percussion traditions.', link: 'https://sangeetnatak.gov.in' }
];

const IMAGE_CREDITS = [
    'All illustrations on this page (anatomy diagram, construction steps, sticks, and ensemble scene) are original SVG artwork created for the Incredible India Explorer project and are not copyrighted photographs.',
    'Regional variant and gallery icons use standard Unicode emoji glyphs, rendered by the visitor\'s own device/font, not embedded image files.'
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DHOL_INFO,
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

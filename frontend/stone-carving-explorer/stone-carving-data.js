/**
 * Stone Carving Explorer — Data Module
 * Heritage Sculpture Gallery covering stone carving traditions from
 * Odisha, Rajasthan, Tamil Nadu, Karnataka, and beyond.
 */

/* ── Quick Stats ── */
const SC_INFO = {
    id: 'stone-carving-explorer',
    title: 'Stone Carving Traditions of India',
    tagline: 'Chiseling Eternity — 5,000 Years of Sacred Sculpture',
    quickStats: [
        { label: 'Heritage',      value: '5,000+ Years',        icon: '⏳' },
        { label: 'GI Tagged',     value: '12+ Crafts',          icon: '🏷️' },
        { label: 'Key Regions',   value: '8 States',            icon: '📍' },
        { label: 'Stone Types',   value: 'Sandstone, Granite…', icon: '🪨' },
        { label: 'UNESCO Links',  value: 'Multiple Sites',      icon: '🌐' },
        { label: 'Artisans',      value: '3 Lakh+ Families',    icon: '🧑‍🎨' }
    ]
};

/* ── History Timeline ── */
const SC_TIMELINE = [
    {
        period: '~3000 BCE',
        era: 'Indus Valley',
        title: 'The First Stone Sculptors',
        description: 'Harappan craftsmen carved steatite seals and terracotta figurines with astonishing precision. The famous "Priest-King" torso from Mohenjo-daro is among the earliest known stone sculptures in the subcontinent, revealing mastery of anatomy that would only deepen over millennia.',
        icon: '🏺'
    },
    {
        period: '3rd Century BCE',
        era: 'Maurya Period',
        title: 'Ashoka's Monumental Edicts',
        description: 'Emperor Ashoka commissioned polished sandstone pillars — the finest in the ancient world. The capital from Sarnath (four Asiatic lions atop an abacus) became India's national emblem. Mauryan artisans perfected the "mirror polish" technique on monolithic columns, a secret metallurgical feat not yet fully replicated.',
        icon: '🦁'
    },
    {
        period: '1st–3rd Century CE',
        era: 'Kushan / Satavahana',
        title: 'Gandhara & Amaravati Schools',
        description: 'Two parallel sculptural traditions flourished: Gandhara (northwest), blending Hellenistic realism with Buddhist iconography in grey schist; and Amaravati (Andhra), renowned for white limestone narrative reliefs of extraordinary delicacy. Together they defined the grammar of Indian Buddhist sculpture.',
        icon: '☸️'
    },
    {
        period: '4th–7th Century CE',
        era: 'Gupta Golden Age',
        title: 'Classical Perfection',
        description: 'The Gupta period brought sculptural achievement unmatched in subtlety. Mathura's red sandstone Buddhas displayed "transparent wet drapery" — fabric so thinly carved that the body seems visible through cloth. Ellora's Kailasa Temple (8th century, Rashtrakuta) pushed stone cutting to its structural limit: an entire temple carved from a cliff face, top-down.',
        icon: '✨'
    },
    {
        period: '7th–13th Century CE',
        era: 'Medieval Temple Age',
        title: 'Khajuraho, Konark & Brihadeeswara',
        description: 'The medieval period saw the apex of temple sculpture. Khajuraho's sandstone temples (Chandela dynasty) layered mythological and sensuous carvings across every surface. Konark's Sun Temple used chlorite schite. The Chola Brihadeeswara at Thanjavur used granite in a single 66-metre vimana — an engineering marvel matched by its sculptural programme.',
        icon: '🛕'
    },
    {
        period: '14th–17th Century',
        era: 'Vijayanagara & Sultanate',
        title: 'Hampi's Granite Universe',
        description: 'The Vijayanagara Empire transformed the rocky terrain of Hampi into a city of monolithic wonders — Ugra Narasimha (6.7 m), the stone chariot, and thousands of pillared mandapas. In the North, the Sultanate period introduced Persian-influenced geometric stone lattice (jali) work, reaching perfection in Fatehpur Sikri's red sandstone screens.',
        icon: '🗿'
    },
    {
        period: '18th–21st Century',
        era: 'Colonial to Contemporary',
        title: 'Survival & Revival',
        description: 'Colonial-era demand for decorative stonework sustained craft clusters. Post-Independence, government patronage through institutions like the Crafts Council of India and GI tagging of regional styles (Rajasthan stone carving, Odisha pattachitra-influenced stone work) have helped revive and protect these traditions. Contemporary sculptors now blend classical techniques with modern idioms.',
        icon: '🔄'
    }
];

/* ── Regional Styles ── */
const SC_REGIONS = [
    {
        name: 'Odisha',
        tagline: 'Chlorite Schist Masters',
        stone: 'Khondalite, Chlorite Schist',
        centres: 'Puri, Bhubaneswar, Konark',
        style: 'Kalinga Nagara style — curvilinear shikhara temples densely covered with narrative and erotic friezes. The Sun Temple of Konark is the pinnacle. Pattajoshi and Suarabandha craft clusters produce exquisite miniature temple replicas and Dasavatara panels.',
        unesco: 'Konark Sun Temple (UNESCO)',
        color: '#c0601a',
        icon: '🌅',
        id: 'sc-region-odisha'
    },
    {
        name: 'Rajasthan',
        tagline: 'Makrana Marble & Sandstone Poetry',
        stone: 'Makrana Marble, Dholpur Red Sandstone, Jodhpur Blue Stone',
        centres: 'Jaipur, Jodhpur, Dungarpur',
        style: 'Rajput and Mughal fusion — intricate jali lattice screens, floral arabesques, and portrait sculpture in white marble. The Taj Mahal's marble was quarried at Makrana. Jaipur's silawats carve marble elephants, gods, and architectural panels with hereditary precision.',
        unesco: 'Taj Mahal, Jantar Mantar, Hill Forts of Rajputana (UNESCO)',
        color: '#e8a020',
        icon: '🏰',
        id: 'sc-region-rajasthan'
    },
    {
        name: 'Tamil Nadu',
        tagline: 'Mamallapuram & the Chola Legacy',
        stone: 'Granite, Gneiss',
        centres: 'Mamallapuram, Thanjavur, Tiruchirappalli',
        style: 'Dravidian tradition: monolithic rathas (rock-cut chariots), narrative bas-reliefs, and towering gopurams (temple gateways). Sthapatis of Mamallapuram continue classical Agama-shastra-based sculpture. The Pallava and Chola legacies define South Indian stone art.',
        unesco: 'Mamallapuram Monuments (UNESCO), Brihadeeswara Temple (UNESCO)',
        color: '#1a7c6b',
        icon: '🛕',
        id: 'sc-region-tamilnadu'
    },
    {
        name: 'Karnataka',
        tagline: 'Hoysala Star-Polygon Temples',
        stone: 'Chloritic Schist (Soapstone), Granite',
        centres: 'Halebidu, Belur, Hampi, Shravanabelagola',
        style: 'Hoysala craftsmen used chloritic schist — soft when quarried, hardening with exposure — to create labyrinthine star-polygon temples with thousands of individually sculpted figures. Shravanabelagola's 17-metre monolithic Gommateshvara (Bahubali) statue is the world's largest monolithic free-standing sculpture.',
        unesco: 'Group of Monuments at Hampi (UNESCO)',
        color: '#5a2d82',
        icon: '⭐',
        id: 'sc-region-karnataka'
    },
    {
        name: 'Madhya Pradesh',
        tagline: 'Chandela Sandstone Splendour',
        stone: 'Vindhyan Sandstone',
        centres: 'Khajuraho, Sanchi, Bhimbetka',
        style: 'Chandela-era temples at Khajuraho feature the most elaborate sculptural programme of any temple complex — over 900 figures covering every surface, combining celestial beings, erotic friezes, and mythological scenes in warm sandstone. Sanchi's toranas (gateways) are the finest examples of narrative bas-relief in Buddhist art.',
        unesco: 'Khajuraho (UNESCO), Sanchi (UNESCO), Bhimbetka (UNESCO)',
        color: '#c94a2a',
        icon: '💎',
        id: 'sc-region-mp'
    },
    {
        name: 'Gujarat',
        tagline: 'Solanki Marble Temples',
        stone: 'White Marble, Granite',
        centres: 'Mount Abu, Modhera, Patan',
        style: 'The Solanki dynasty produced the Dilwara Temples at Mount Abu — marble Jain temples with ceilings so intricately carved they resemble frozen lace. Rani ki Vav at Patan is a stepwell whose walls are covered with over 500 principal sculptures in a remarkable seven-storey symphony of carved stone.',
        unesco: 'Rani ki Vav (UNESCO)',
        color: '#1a6e9e',
        icon: '🏛️',
        id: 'sc-region-gujarat'
    }
];

/* ── Sculpture Gallery ── */
const SC_GALLERY = [
    {
        title: 'Nataraja — Lord of the Dance',
        region: 'Tamil Nadu',
        period: '10th–11th Century CE',
        material: 'Bronze (originally stone panels at Chidambaram)',
        description: 'The cosmic dancer Shiva in the ananda-tandava pose — surrounded by a ring of flames, trampling ignorance — is the supreme achievement of Chola iconography. The stone originals at Chidambaram's Nataraja Temple remain among the most refined figurative works in world art.',
        emoji: '💃',
        tag: 'Chola Masterwork',
        color: '#c0601a'
    },
    {
        title: 'Konark Sun Wheel',
        region: 'Odisha',
        period: '13th Century CE',
        material: 'Chlorite Schist',
        description: 'The 24 giant stone wheels of the Sun Temple at Konark serve as a sundial — precise enough to tell the time of day by the shadow of their spokes. Each 3-metre wheel is carved with intricate floral and mythological reliefs and represents the chariot of the sun god Surya.',
        emoji: '☀️',
        tag: 'UNESCO World Heritage',
        color: '#e8a020'
    },
    {
        title: 'Descent of the Ganges (Arjuna's Penance)',
        region: 'Tamil Nadu',
        period: '7th Century CE',
        material: 'Pink Granite (monolithic)',
        description: 'At Mamallapuram, a 27 × 9 metre open-air granite cliff is covered with over 100 figures — gods, humans, animals, and nagas — converging on a natural rock cleft representing the Ganges. It is the largest open-air bas-relief in the world, attributed to Pallava king Mamalla.',
        emoji: '🏔️',
        tag: 'UNESCO — Largest Bas-Relief',
        color: '#1a7c6b'
    },
    {
        title: 'Gommateshvara (Bahubali)',
        region: 'Karnataka',
        period: '981 CE',
        material: 'Monolithic Granite',
        description: 'Carved from a single granite boulder atop Vindyagiri Hill at Shravanabelagola, this 17.7-metre statue of Jain tirthankara Bahubali is the tallest monolithic free-standing sculpture in the world. Creepers carved up his legs symbolize his 12-year penance. Every 12 years, the Mahamastakabhisheka festival bathes him in milk and saffron.',
        emoji: '🗿',
        tag: 'World's Tallest Monolith',
        color: '#5a2d82'
    },
    {
        title: 'Dilwara Marble Ceiling',
        region: 'Gujarat / Rajasthan',
        period: '11th–13th Century CE',
        material: 'White Marble',
        description: 'The Vimala Vasahi and Luna Vasahi temples at Mount Abu feature dome ceilings of pendant marble stalactites so densely carved that no surface is left unadorned. Legend says craftsmen were paid by the weight of marble dust they produced — a perfect economic incentive for ultimate delicacy.',
        emoji: '🌹',
        tag: 'Finest Marble Carving',
        color: '#1a6e9e'
    },
    {
        title: 'Ashoka Lion Capital',
        region: 'Uttar Pradesh (Sarnath)',
        period: '250 BCE',
        material: 'Polished Chunar Sandstone',
        description: 'Four Asiatic lions standing back-to-back atop an abacus decorated with four animals and dharma-chakras — created from a single sandstone block and polished to a mirror sheen. Adopted as India's national emblem in 1950, it remains the most recognized sculptural artifact from ancient India.',
        emoji: '🦁',
        tag: 'National Emblem of India',
        color: '#c94a2a'
    },
    {
        title: 'Khajuraho Apsara Friezes',
        region: 'Madhya Pradesh',
        period: '950–1050 CE',
        material: 'Vindhyan Sandstone',
        description: 'The outer walls of Khajuraho's temples carry a continuous horizontal frieze of apsaras (celestial nymphs), mithunas (amorous couples), and mythological scenes. The warm sandstone allows carvers to achieve almost ivory-like detail. These sculptures represent not just eroticism but the full spectrum of human experience as a metaphor for spiritual union.',
        emoji: '✨',
        tag: 'UNESCO Heritage',
        color: '#e8a020'
    },
    {
        title: 'Hampi Stone Chariot',
        region: 'Karnataka',
        period: '16th Century CE',
        material: 'Granite',
        description: 'Located at the Vijaya Vittala Temple complex, this life-size stone chariot is carved from a single granite block. Its wheels were once movable — they could be rotated. Elephants, horses, and decorative pilasters cover every surface, making it one of the most recognisable architectural sculptures in India.',
        emoji: '🚗',
        tag: 'Vijayanagara Marvel',
        color: '#5a2d82'
    }
];

/* ── Carving Tools ── */
const SC_TOOLS = [
    {
        name: 'Tanka (Chisel)',
        category: 'Primary Cutting',
        icon: '⚒️',
        description: 'The tanka is the fundamental carving instrument — a straight steel chisel used to make initial cuts, define planes, and rough out the basic form of a sculpture. Odisha and Tamil Nadu schools maintain distinct chisel shapes, with Odishan tankas often having a broader cutting edge for work in softer chlorite schist.',
        uses: ['Roughing out blocks', 'Defining major planes', 'Geometric cuts']
    },
    {
        name: 'Karani (Point / Pick)',
        category: 'Roughing Tool',
        icon: '🔨',
        description: 'A pointed steel pick used to remove large chunks of stone in the early stages. The karani is struck with a wooden or iron mallet. Tamil Nadu sthapatis use the karani on granite's extremely hard surface before switching to finer chisels. Its point creates controlled fractures along crystal planes.',
        uses: ['Material removal', 'Initial shaping', 'Hard granite work']
    },
    {
        name: 'Gadi (Flat Chisel)',
        category: 'Surface Work',
        icon: '🔧',
        description: 'A flat-edged tool used for smoothing surfaces, creating flat planes, and undercutting drapery or architectural elements. Rajasthan marble carvers use wide gadi chisels to achieve the paper-thin translucency of jali lattice screens. The edge must be constantly re-tempered to maintain sharpness against marble.',
        uses: ['Surface smoothing', 'Flat planes', 'Jali lattice cutting']
    },
    {
        name: 'Murga (Claw Chisel)',
        category: 'Texturing',
        icon: '✏️',
        description: 'A toothed chisel with multiple cutting points, used to create textured surfaces, rough up areas before final finishing, and carve hair, foliage, and naturalistic textures. The murga is essential for the layered floral friezes of Rajasthan temples and the forest scenes at Khajuraho.',
        uses: ['Surface texturing', 'Hair and foliage', 'Rough finishing']
    },
    {
        name: 'Khoonta (Mallet)',
        category: 'Striking Tool',
        icon: '🪵',
        description: 'Traditional wooden mallets (khoonta) are used to strike chisels in a controlled, bouncing action. Master carvers in Mamallapuram use a specific wrist-flick technique that sends controlled vibrations through the chisel into granite, allowing fine lines to be incised without cracking the stone. Iron mallets are reserved for heavy roughing work.',
        uses: ['Driving chisels', 'Controlled strikes', 'Fine incising']
    },
    {
        name: 'Khamanda (Bow Drill)',
        category: 'Drilling',
        icon: '🌀',
        description: 'An ancient bow-driven drill used to create deep holes, cavities, and rounded depressions in stone. The khamanda uses rotating abrasive grit or a hardened drill tip. It is used in Odisha to hollow out the interiors of temple replica models and in Rajasthan to create the perforated backgrounds of jali lattice panels.',
        uses: ['Deep cavities', 'Perforations', 'Jali backgrounds']
    },
    {
        name: 'Abhrasham (Abrasives)',
        category: 'Finishing',
        icon: '💧',
        description: 'Final finishing in the Indian tradition relies on progressive abrasion using corundum, silicon carbide, and water — a technique dating to at least the Mauryan period. The "Mauryan mirror polish" on Ashoka's pillars was achieved through extended rubbing with increasingly fine abrasives. Makrana marble workers still use this technique for a translucent finish.',
        uses: ['Final polish', 'Surface refinement', 'Mirror finish']
    },
    {
        name: 'Rekhavita (Proportioning Cord)',
        category: 'Measurement',
        icon: '📐',
        description: 'Before a single stroke is made, a master sthapati (temple sculptor) lays out the proportions of a deity using a knotted cord system derived from the Manasara and Mayamata (ancient treatises on sculpture). Each body part bears a precise ratio to the face-length (tala). This ensures that even a 6-metre statue reads correctly from ground level.',
        uses: ['Iconographic proportions', 'Grid laying', 'Canonical ratios']
    }
];

/* ── Artisan Spotlight ── */
const SC_ARTISANS = [
    {
        name: 'The Pattajoshi Silpis of Puri',
        region: 'Odisha',
        tradition: 'Hereditary temple carvers of the Jagannath tradition',
        icon: '🌊',
        specialty: 'Chlorite schist temple replicas, Dasavatara panels, and Navagraha friezes. Each family specialises in a subset of iconography — one family may only carve Vishnu avatars, another only Shiva lingas — a division that has preserved specialist knowledge across generations.',
        recognition: 'National Award, Crafts Mark certification',
        threat: 'Cheaper machine-carved replicas and declining apprenticeship rates',
        color: '#c0601a'
    },
    {
        name: 'The Silawats of Jaipur',
        region: 'Rajasthan',
        tradition: 'Muslim and Hindu marble artisan communities of the Pink City',
        icon: '🌹',
        specialty: 'White Makrana marble inlay (pietra dura), jali lattice screens, and figurative sculpture for temples and palaces. Post-Taj Mahal, Jaipur's silawats became the premier marble artisans of the subcontinent. Today they produce intricate temple panels, garden fountains, and household pietra dura objects.',
        recognition: 'GI Tag (Rajasthan Stone Carving), National Award winners',
        threat: 'Silica dust health hazards and cheap Chinese marble imports',
        color: '#e8a020'
    },
    {
        name: 'The Sthapatis of Mamallapuram',
        region: 'Tamil Nadu',
        tradition: 'Shilpa-shastra trained granite sculptors, hereditary for 1,400+ years',
        icon: '🌊',
        specialty: 'Classical Agama-shastra deity sculpture in granite for temples worldwide. Mamallapuram sthapatis have exported their craft globally — creating sculptures for Hindu temples in the US, UK, Germany, Singapore, and beyond. The tradition uses no power tools for finishing work.',
        recognition: 'UNESCO recognition, Padma Shri awardees, temple commissions globally',
        threat: 'Competition from machine-carved mass production in China',
        color: '#1a7c6b'
    },
    {
        name: 'Shekar Lal — Khajuraho Sandstone Carver',
        region: 'Madhya Pradesh',
        tradition: '4th-generation Chandela-tradition stone carver',
        icon: '🌟',
        specialty: 'Sandstone relief panels replicating the Khajuraho temple frieze style. Works from a small workshop in Rajnagar and trains three apprentices. Each piece takes 3–6 months, with the final surface finished using local sandstone grit and water only.',
        recognition: 'MP State Award, work displayed at National Crafts Museum, Delhi',
        threat: 'Rising sandstone quarry costs and high tariff on workshop export sales',
        color: '#c94a2a'
    },
    {
        name: 'The Gavli Sculptors of Halebidu',
        region: 'Karnataka',
        tradition: 'Hoysala-style chloritic schist carvers',
        icon: '⭐',
        specialty: 'Intricate Hoysala-style panels — star-polygon layouts with dense narratives from the Mahabharata, Ramayana, and Puranas, each figure no taller than 15 cm but possessing jewellery, expression, and posture distinguishable from every other. A single panel of 50 × 50 cm may take 18 months.',
        recognition: 'Karnataka Rajyotsava Award, Shilpa Guru designation',
        threat: 'Only 12 practitioners of true Hoysala-style chlorite work remain',
        color: '#5a2d82'
    }
];

/* ── References ── */
const SC_REFERENCES = [
    {
        text: 'Archaeological Survey of India — Temple Architecture & Sculpture',
        link: 'https://www.asi.nic.in/'
    },
    {
        text: 'UNESCO World Heritage — Monuments at Mamallapuram',
        link: 'https://whc.unesco.org/en/list/249/'
    },
    {
        text: 'UNESCO World Heritage — Konark Sun Temple',
        link: 'https://whc.unesco.org/en/list/246/'
    },
    {
        text: 'UNESCO World Heritage — Khajuraho Group of Monuments',
        link: 'https://whc.unesco.org/en/list/240/'
    },
    {
        text: 'Crafts Council of India — Stone Carving Heritage',
        link: 'https://craftscouncilofindia.org/'
    },
    {
        text: 'National Museum of India — Sculpture Collections',
        link: 'https://www.nationalmuseumindia.gov.in/'
    },
    {
        text: 'Encyclopaedia Britannica — Indian Sculpture',
        link: 'https://www.britannica.com/art/Indian-sculpture'
    },
    {
        text: 'Stella Kramrisch — The Hindu Temple (Princeton University Press)',
        link: 'https://press.princeton.edu/books/hardcover/9780691019635/the-hindu-temple'
    }
];

/**
 * Xylophone & Indian Percussion Traditions — Dataset
 * Defines XYLOPHONE_PERCUSSION_DATA used by xylophone-percussion.js
 *
 * Issue #2938: X: Xylophone & Indian Percussion Traditions
 */

const XYLOPHONE_PERCUSSION_DATA = {

  meta: {
    title: 'Xylophone & Indian Percussion Traditions',
    subtitle: 'Tuned Idiophones, Rhythmic Heritage, and Regional Masterpieces',
    totalInstruments: 12,
    familiesCount: 4,
    regionsCount: 6,
    description: 'In Indian musical organology (as codified in the Natya Shastra and Sangita Ratnakara), percussion instruments are categorized into Ghana Vadya (solid idiophones, including tuned wooden/bamboo bar xylophones, porcelain Jal Tarang bowls, and metal gongs) and Avanaddha Vadya (membranophones with stretched skins). This explorer highlights India\'s rich tuned and rhythmic percussion heritage, distinguishing traditional Indian tuned bar instruments like the Kashta Tarang from Western xylophones.'
  },

  families: [
    'All Families',
    'Tuned Idiophones (Kashta/Jal Tarang)',
    'Other Idiophones (Ghatam/Morsing)',
    'Membranophones (Classical Drums)',
    'Folk & Tribal Percussion'
  ],

  regions: [
    'All Regions',
    'Pan-India',
    'North India',
    'South India',
    'East India',
    'West India',
    'North-East India'
  ],

  materials: [
    'All Materials',
    'Wood & Bamboo',
    'Clay & Ceramic',
    'Metal & Alloy',
    'Leather & Hide'
  ],

  instruments: [
    {
      id: 'kashta-tarang',
      name: 'Kashta Tarang',
      altName: 'Indian Wooden Xylophone / Wooden Marimba',
      emoji: '🪵',
      family: 'Tuned Idiophones (Kashta/Jal Tarang)',
      familyCode: 'tuned-idiophone',
      region: 'Pan-India',
      regionCode: 'pan-india',
      material: 'Wood & Bamboo',
      materialCode: 'wood-bamboo',
      howPlayed: 'Struck with padded wooden mallets or sticks',
      musicalTradition: 'Classical Hindustani & Semi-Classical',
      description: 'India\'s traditional tuned wooden-bar idiophone — a set of acoustically tuned hardwood slats mounted over a frame or resonator box.',
      classificationNote: 'Organologically classified as a Ghana Vadya (tuned idiophone). While Western musicology calls it a "xylophone" (from Greek xylo=wood + phone=sound), Indian tradition names it Kashta Tarang (Kashta = wood, Tarang = waves/notes).',
      playingTechnique: 'The musician sits cross-legged before the wooden frame and strikes tuned rosewood or teak slats with felt-tipped or padded wooden mallets. Rapid tremolos (meend-like oscillations) and melodic patterns are produced across a multi-octave range.',
      culturalSignificance: 'Kashta Tarang represents the ancient Indian principle of extracting melodic scales directly from natural hardwoods. It featured prominently in 20th-century radio orchestra ensembles (All India Radio Vadya Vrinda) and classical solo performances.',
      funFact: 'Hardwoods like Sheesham (Indian Rosewood) and Khair are selected for Kashta Tarang bars because their high density provides clear fundamental pitches with minimal dampening.',
      imageCredit: {
        text: 'Kashta Tarang tuned wooden bar instrument — Sangeet Natak Akademi Archives',
        url: 'https://sangeetnatak.gov.in/'
      }
    },
    {
      id: 'jal-tarang',
      name: 'Jal Tarang',
      altName: 'Jaltarang / Water Bowl Melody',
      emoji: '🥣',
      family: 'Tuned Idiophones (Kashta/Jal Tarang)',
      familyCode: 'tuned-idiophone',
      region: 'Pan-India',
      regionCode: 'pan-india',
      material: 'Clay & Ceramic',
      materialCode: 'clay-ceramic',
      howPlayed: 'Struck lightly on bowl rims with slender bamboo sticks',
      musicalTradition: 'Classical Hindustani & Carnatic',
      description: 'The ancient Indian tuned water-bowl instrument mentioned in the 10th-century Vatsyayana Kama Sutra as one of the 64 fine arts (Chaturshashti Kala).',
      classificationNote: 'Classified as a Ghana Vadya (tuned idiophone). It operates on liquid acoustics: adjusting water levels inside porcelain or bronze bowls alters the vibrating resonant frequency of each vessel.',
      playingTechnique: 'Between 15 to 22 porcelain china bowls of graduated sizes are arranged in a semicircle around the seated artist. The bowls are filled with precise amounts of water to tune each note of a Raga. The player strikes the rims with two slender bamboo sticks (kamtis).',
      culturalSignificance: 'Jal Tarang is one of the world\'s oldest documented acoustic liquid percussion instruments. Ancient texts like the Sangita Parijata describe its soothing, microtonal Gamaka capabilities achieved by lightly touching the water surface while striking.',
      funFact: 'A master Jal Tarang player can fine-tune a note mid-performance simply by dipping a finger in the water or adding a drop from a small pitcher!',
      imageCredit: {
        text: 'Jal Tarang water bowl ensemble — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Jaltarang.jpg'
      }
    },
    {
      id: 'naga-bamboo-xylophone',
      name: 'Naga Bamboo Xylophone',
      altName: 'Kashta Bambu / Tribal Slats',
      emoji: '🎋',
      family: 'Tuned Idiophones (Kashta/Jal Tarang)',
      familyCode: 'tuned-idiophone',
      region: 'North-East India',
      regionCode: 'northeast-india',
      material: 'Wood & Bamboo',
      materialCode: 'wood-bamboo',
      howPlayed: 'Struck with wooden or bamboo mallets',
      musicalTradition: 'Tribal & Indigenous Traditions',
      description: 'Indigenous tuned bamboo-slat bar instrument crafted by tribal communities in Nagaland, Mizoram, and Assam for harvest rituals and folk festivals.',
      classificationNote: 'A true indigenous bamboo xylophone (idiophone). Tuned bamboo slats of varying lengths and nodal thicknesses are laid horizontally across straw or wooden supports.',
      playingTechnique: 'Played by two or more musicians seated opposite each other, striking tuned bamboo bars with heavy wooden mallets to produce rich, resonant pentatonic polyrhythms.',
      culturalSignificance: 'In Nagaland\'s Hornbill Festival and agricultural celebrations, bamboo xylophones accompany folk ballads celebrating harvest abundance, forest spirits, and tribal unity.',
      funFact: 'Green bamboo is aged and smoked over hearth fires for months before shaping to prevent splitting and to lock in pitch stability.',
      imageCredit: {
        text: 'Tribal Bamboo Percussion — IGNCA Cultural Archives',
        url: 'https://ignca.gov.in/'
      }
    },
    {
      id: 'ghatam',
      name: 'Ghatam',
      altName: 'Clay Pot Percussion',
      emoji: '🏺',
      family: 'Other Idiophones (Ghatam/Morsing)',
      familyCode: 'other-idiophone',
      region: 'South India',
      regionCode: 'south-india',
      material: 'Clay & Ceramic',
      materialCode: 'clay-ceramic',
      howPlayed: 'Struck with fingers, palms, thumbs, and fingernails on the body and open neck',
      musicalTradition: 'Classical Carnatic & Laya Ensembles',
      description: 'The ancient South Indian clay pot instrument — one of the oldest percussion vessels of Carnatic classical music ensembles.',
      classificationNote: 'Classified as a Ghana Vadya (Idiophone), because the entire clay vessel body acts as the vibrating acoustic resonator without any attached drumhead membrane.',
      playingTechnique: 'The player places the pot against their stomach. Pressing the neck against the abdomen alters the internal air volume, creating pitch bends (bhum) while striking the outer clay shell with fingers and palms.',
      culturalSignificance: 'Special clay mixed with brass, copper, and iron filings is baked in Manamadurai, Tamil Nadu, to give the Ghatam its metallic ring and exceptional pitch clarity.',
      funFact: 'Manamadurai Ghatams are so dense and heavy that they can withstand intense fast-tempo Solkattu (rhythmic syllable) solos without cracking!',
      imageCredit: {
        text: 'Carnatic Ghatam clay pot — Wikimedia Commons, CC BY-SA 3.0',
        url: 'https://commons.wikimedia.org/wiki/File:Ghatam.jpg'
      }
    },
    {
      id: 'mridangam',
      name: 'Mridangam',
      altName: 'Mridanga / Carnatic Classical Drum',
      emoji: '🥁',
      family: 'Membranophones (Classical Drums)',
      familyCode: 'membranophone',
      region: 'South India',
      regionCode: 'south-india',
      material: 'Leather & Hide',
      materialCode: 'leather-hide',
      howPlayed: 'Struck with fingers, palms, and wrists on both drumheads',
      musicalTradition: 'Classical Carnatic & Temple Tala',
      description: 'The premier percussion instrument of Carnatic classical music — a double-headed wooden barrel drum tuned precisely to the soloist\'s tonic pitch (Sruti).',
      classificationNote: 'An Avanaddha Vadya (Membranophone). The right head features a black permanent tuning spot (Soru/Karanai) made of iron slag, rice flour, and manganese powder.',
      playingTechnique: 'Played horizontally across the lap. The right head produces harmonic overtones (Nam, Dhim, Chapu) tuned to Sruti, while the left head produces low bass tones (Thoppu) softened by applying a moist dough paste.',
      culturalSignificance: 'Considered a divine instrument associated with Lord Ganesha and Nandi. It forms the backbone of Carnatic concerts alongside the Vina, Nadaswaram, or Vocal recitals.',
      funFact: 'A master Mridangist can produce pitch glides on the left drumhead by pressing the heel of the hand while striking with fingers!',
      imageCredit: {
        text: 'South Indian Mridangam drum — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Mridangam.jpg'
      }
    },
    {
      id: 'tabla',
      name: 'Tabla',
      altName: 'Dayan & Bayan Pair',
      emoji: '🪘',
      family: 'Membranophones (Classical Drums)',
      familyCode: 'membranophone',
      region: 'North India',
      regionCode: 'north-india',
      material: 'Leather & Hide',
      materialCode: 'leather-hide',
      howPlayed: 'Struck with fingers, palms, and heel of the hand',
      musicalTradition: 'Classical Hindustani, Ghazal, & Light Music',
      description: 'The iconic pair of North Indian classical hand drums — the wooden treble drum (Dayan/Tabla) and the metal/clay bass drum (Bayan/Dagga).',
      classificationNote: 'An Avanaddha Vadya (Membranophone). Both heads feature a weighted black paste spot (Syahi) that creates harmonic overtones resembling clear bell-like notes.',
      playingTechnique: 'The artist uses intricate finger stroke combinations (Bols such as Ta, Dhin, Dha, Tin, Tete) to perform complex rhythmic cycles (Talas) like Teental, Jhaptal, and Keherwa.',
      culturalSignificance: 'Developed in North India during the 18th century, the Tabla evolved through distinct gharanas (musical lineages) including Delhi, Ajrada, Lucknow, Farrukhabad, Benares, and Punjab.',
      funFact: 'The wooden Dayan is tuned precisely to the soloist\'s fundamental key (Sa) by tapping wooden pegs (gattas) with a heavy brass tuning hammer.',
      imageCredit: {
        text: 'Pair of Tabla drums — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Tabla_pair.jpg'
      }
    },
    {
      id: 'pakhawaj',
      name: 'Pakhawaj',
      altName: 'Mrdanga / Dhrupad Drum',
      emoji: '🪔',
      family: 'Membranophones (Classical Drums)',
      familyCode: 'membranophone',
      region: 'North India',
      regionCode: 'north-india',
      material: 'Leather & Hide',
      materialCode: 'leather-hide',
      howPlayed: 'Struck with open palms, fingers, and hand heel',
      musicalTradition: 'Classical Dhrupad & Temple Haveli Sangeet',
      description: 'The majestic low-frequency barrel drum of ancient Dhrupad vocal and Veena instrumental traditions.',
      classificationNote: 'An Avanaddha Vadya (Membranophone). Direct ancestor of the modern Tabla, constructed from a single block of hollowed Sheesham or Teak wood.',
      playingTechnique: 'Fresh wheat dough is applied to the left head before every performance to create deep, booming bass resonations. Heavy palm strikes yield majestic, resonant Bol patterns.',
      culturalSignificance: 'Pakhawaj rhythm (Parkan) accompanies regal Dhrupad singing, Kathak parans, and temple Haveli Sangeet devotional traditions of North and Central India.',
      funFact: 'The dough applied to the left head is washed off immediately after the concert to preserve the leather membrane!',
      imageCredit: {
        text: 'Pakhawaj barrel drum — Wikimedia Commons, Public Domain',
        url: 'https://commons.wikimedia.org/wiki/File:Pakhawaj.jpg'
      }
    },
    {
      id: 'chenda',
      name: 'Chenda',
      altName: 'Kerala Temple & Kathakali Drum',
      emoji: '🥁',
      family: 'Folk & Tribal Percussion',
      familyCode: 'folk-tribal',
      region: 'South India',
      regionCode: 'south-india',
      material: 'Leather & Hide',
      materialCode: 'leather-hide',
      howPlayed: 'Struck with curved wooden sticks or hand and stick',
      musicalTradition: 'Kerala Temple Rituals, Kathakali, & Melam',
      description: 'The thunderous cylindrical wooden drum of Kerala — central to Chenda Melam percussion ensembles, Theyyam, and Kathakali dance-drama.',
      classificationNote: 'An Avanaddha Vadya (Membranophone) made of hollowed Jackwood (Varikka Plavu) with tightly stretched cowhide heads.',
      playingTechnique: 'Slung vertically over the left shoulder of the standing drummer, struck with curved sticks (Chendakolu) in fast, complex polyrhythmic accelerandos.',
      culturalSignificance: 'In Kerala temples, Chenda Melam ensembles featuring up to 150 drummers perform during annual Utsavam festivals, creating awe-inspiring sonic energy.',
      funFact: 'The Chenda has two sides: the Uruttu Chenda (used for leading rhythmic solos) and the Veekku Chenda (used for keeping fundamental time beats).',
      imageCredit: {
        text: 'Chenda drum performance — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Chenda_melam.jpg'
      }
    },
    {
      id: 'pung',
      name: 'Pung',
      altName: 'Manipuri Sankirtana Drum',
      emoji: '💃',
      family: 'Folk & Tribal Percussion',
      familyCode: 'folk-tribal',
      region: 'North-East India',
      regionCode: 'northeast-india',
      material: 'Leather & Hide',
      materialCode: 'leather-hide',
      howPlayed: 'Struck by hands while performing acrobatic leaps and dances',
      musicalTradition: 'Manipuri Sankirtana & Pung Cholom',
      description: 'The slender wooden hand drum of Manipur, played by dancing drummers in the UNESCO-inscribed Sankirtana ritual singing and dancing tradition.',
      classificationNote: 'An Avanaddha Vadya (Membranophone) with a narrow waist, crafted from softwood and fitted with tuned leather heads.',
      playingTechnique: 'In Pung Cholom (drum dance), performers play complex rhythmic patterns on the Pung while simultaneously executing graceful spins, acrobatic leaps, and synchronized footwork.',
      culturalSignificance: 'Inscribed on the UNESCO Representative List of Intangible Cultural Heritage of Humanity in 2013 as an essential element of Manipur\'s Vaishnava devotional culture.',
      funFact: 'Pung drummers wear traditional white turbans (Feijom) and dhotis, maintaining complete rhythmic precision even while turning mid-air somersaults!',
      imageCredit: {
        text: 'Manipuri Pung Cholom drummers — UNESCO Intangible Cultural Heritage Archives',
        url: 'https://ich.unesco.org/'
      }
    },
    {
      id: 'thavil',
      name: 'Thavil',
      altName: 'Nadaswaram Temple Drum',
      emoji: '🪘',
      family: 'Folk & Tribal Percussion',
      familyCode: 'folk-tribal',
      region: 'South India',
      regionCode: 'south-india',
      material: 'Leather & Hide',
      materialCode: 'leather-hide',
      howPlayed: 'Right head struck with thumb thimbles; left head struck with a short wooden stick',
      musicalTradition: 'South Indian Temple & Wedding Music (Mangala Vaidyam)',
      description: 'The high-impact barrel drum of Tamil Nadu and Andhra Pradesh played alongside the Nadaswaram double-reed pipe in sacred ceremonies.',
      classificationNote: 'An Avanaddha Vadya (Membranophone) carved from solid Jackwood, featuring thick water-buffalo hide heads stretched tightly over hemp ropes.',
      playingTechnique: 'The player wears hard metal or hardened plaster thimbles on their right fingers for sharp, crystalline snare-like rolls, while striking the left head with a short wooden stick.',
      culturalSignificance: 'No auspicious South Indian wedding or temple procession begins without the auspicious sound (Mangala Vaidyam) of Thavil and Nadaswaram.',
      funFact: 'The tension on a Thavil\'s drumheads is so immense that tuning requires heavy wooden pegs driven into the rope lattice with mallets.',
      imageCredit: {
        text: 'Thavil drum player — Wikimedia Commons, CC BY-SA 3.0',
        url: 'https://commons.wikimedia.org/wiki/File:Thavil.jpg'
      }
    },
    {
      id: 'kanjira',
      name: 'Kanjira',
      altName: 'Carnatic Frame Drum',
      emoji: '🪘',
      family: 'Other Idiophones (Ghatam/Morsing)',
      familyCode: 'other-idiophone',
      region: 'South India',
      regionCode: 'south-india',
      material: 'Leather & Hide',
      materialCode: 'leather-hide',
      howPlayed: 'Struck with the fingers and palm of one hand',
      musicalTradition: 'Classical Carnatic Percussion Ensemble',
      description: 'The small South Indian frame drum featuring a single skin head and metal jingle coins embedded in its wooden frame.',
      classificationNote: 'A hybrid Membranophone/Idiophone. The wooden frame is made from Jackwood and historically fitted with Monitor Lizard (or goat) skin.',
      playingTechnique: 'Held in the left hand and struck exclusively with the right hand. Wetting the inner surface of the skin allows the player to produce dramatic bass pitch bends by applying palm pressure.',
      culturalSignificance: 'Brought into classical Carnatic music by Manpoondia Pillai in the late 19th century, the Kanjira now features alongside the Mridangam in Laya Vinyasam percussion duels.',
      funFact: 'Despite having only a single drumhead and being played with one hand, a master Kanjira artist can match the lightning speed of a two-handed Mridangam!',
      imageCredit: {
        text: 'Carnatic Kanjira frame drum — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Kanjira.jpg'
      }
    },
    {
      id: 'morsing',
      name: 'Morsing',
      altName: 'Mukharshing / Indian Jew\'s Harp',
      emoji: '✨',
      family: 'Other Idiophones (Ghatam/Morsing)',
      familyCode: 'other-idiophone',
      region: 'South India',
      regionCode: 'south-india',
      material: 'Metal & Alloy',
      materialCode: 'metal-alloy',
      howPlayed: 'Held between teeth and plucked with index finger while shaping vocal cavity',
      musicalTradition: 'Carnatic Classical & Rajasthani Folk (Morchang)',
      description: 'The metal plucking idiophone held between the teeth — an essential rhythmic texture in South Indian Carnatic concerts and Rajasthani folk music.',
      classificationNote: 'A Ghana Vadya (Idiophone). Consists of a horseshoe-shaped metal ring with a flexible steel tongue (tongue/reed) fixed in the middle.',
      playingTechnique: 'Placed against the front teeth with the mouth acting as a dynamic acoustic resonator. The player plucks the reed tip while modulating breath and tongue movements to produce vocalized Konnakol syllables.',
      culturalSignificance: 'In Carnatic music, Morsing players mimic complex drum solos (Solkattu). In Rajasthan, folk musicians play the Morchang to accompany Chang and Dholak rhythms.',
      funFact: 'The Morsing makes no sound on its own — its pitch and timber are shaped entirely inside the performer\'s mouth and throat cavity!',
      imageCredit: {
        text: 'Morsing jaw harp instrument — Wikimedia Commons, CC BY-SA 3.0',
        url: 'https://commons.wikimedia.org/wiki/File:Morsing.jpg'
      }
    }
  ],

  regionalEnsembles: [
    {
      title: 'Panchavadyam (Kerala)',
      type: 'Temple Orchestra',
      description: 'An orchestra of 5 traditional Kerala instruments: Timila, Maddalam, Ilathalam (cymbals), Idakka, and Kombu (horn). Over 60 drummers perform in synchronized crescendo at temple festivals like Thrissur Pooram.'
    },
    {
      title: 'Pung Cholom (Manipur)',
      type: 'UNESCO Intangible Cultural Heritage',
      description: 'The acrobatic drum dance of Manipur. Dancers leap, turn, and spin while maintaining flawless polyrhythms on the Pung drum during Sankirtana devotional rituals.'
    },
    {
      title: 'Tasha-Dhol & Nashik Dhol (Maharashtra & Goa)',
      type: 'Festive Processional Percussion',
      description: 'High-energy brass Tasha kettledrums paired with massive wooden Nashik Dhols during Ganesh Visarjan and Shigmo street processions.'
    },
    {
      title: 'Langar & Kirtan Dholak (Punjab)',
      type: 'Devotional & Folk Rhythms',
      description: 'Double-headed Dholak and Chimta (iron tongs with brass jingles) accompanying Gurbani Kirtan in Gurudwaras and lively Bhangra celebrations across Punjab.'
    }
  ],

  sources: [
    {
      title: 'Sangeet Natak Akademi — Musical Instruments of India Archive',
      url: 'https://sangeetnatak.gov.in/'
    },
    {
      title: 'UNESCO Intangible Cultural Heritage — Sankirtana, ritual singing, drumming and dancing of Manipur (2013)',
      url: 'https://ich.unesco.org/en/RL/sankirtana-ritual-singing-drumming-and-dancing-of-manipur-00843'
    },
    {
      title: 'IGNCA (Indira Gandhi National Centre for the Arts) — Musical Organology & Ghana Vadya Documentation',
      url: 'https://ignca.gov.in/'
    },
    {
      title: 'Oxford Music Online / Grove Dictionary of Musical Instruments — Indian Percussion Classifications',
      url: 'https://www.oxfordmusiconline.com/'
    },
    {
      title: 'K.S. Kothari — Indian Folk Musical Instruments (Sangeet Natak Akademi, 1968)',
      url: 'https://sangeetnatak.gov.in/'
    }
  ]
};

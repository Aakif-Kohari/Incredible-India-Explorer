/**
 * Indian Utensils Explorer — Dataset
 * Defines INDIAN_UTENSILS_DATA used by indian-utensils.js
 *
 * Issue #2936: Traditional Indian Utensils — Everyday Cultural Heritage
 */

const INDIAN_UTENSILS_DATA = {

  meta: {
    title: 'Traditional Indian Utensils',
    subtitle: 'Everyday Cultural Heritage',
    totalUtensils: 12,
    regionsCount: 6,
    materialsCount: 5,
    description: 'Indian cooking utensils are not just tools — they are living artefacts shaped by centuries of regional cuisine, ritual practice, and craftsmanship. From the iron kadhai sizzling on a Punjabi hearth to the bronze uruli gleaming in a Kerala home, each vessel carries a story of community and culture.'
  },

  materials: ['All Materials', 'Iron', 'Cast Iron', 'Clay', 'Bronze', 'Brass', 'Wood', 'Copper'],

  regions: [
    'All Regions',
    'Pan-India',
    'North India',
    'South India',
    'East India',
    'West India',
    'Rural India'
  ],

  utensils: [
    {
      id: 'kadhai',
      name: 'Kadhai',
      emoji: '🥘',
      material: 'Iron',
      region: 'Pan-India',
      regionCode: 'pan-india',
      materialCode: 'iron',
      description: 'The deep, wok-like vessel at the heart of Indian cooking — from street-side halwai shops to home kitchens across the country.',
      cookingPractices: 'Used for deep-frying, stir-frying, sautéing, and preparing gravies. Its thick bottom and curved sides ensure even heat distribution, making it indispensable for dishes like kadhai paneer, jalebis, and fried snacks.',
      culturalSignificance: 'The kadhai is the most ubiquitous cooking vessel in India, symbolising communal cooking and festive preparation. Large iron kadhais are central to langar (community kitchens) in Sikh gurudwaras and temple prasad cooking, where food is prepared for thousands.',
      funFact: 'Iron kadhais contribute dietary iron to food — traditional wisdom validated by modern nutrition studies showing that cooking acidic foods like tomatoes in iron vessels measurably increases iron content.',
      imageCredit: {
        text: 'Traditional iron kadhai — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Kadai.jpg'
      }
    },
    {
      id: 'tawa',
      name: 'Tawa',
      emoji: '🫓',
      material: 'Cast Iron',
      region: 'North India',
      regionCode: 'north-india',
      materialCode: 'cast-iron',
      description: 'The flat, slightly concave griddle that makes every roti, chapati, and paratha possible — a northern kitchen staple passed down through generations.',
      cookingPractices: 'A well-seasoned cast iron tawa is used to cook flatbreads (roti, paratha, dosa, uttapam) and to roast spices. The high heat retention of cast iron gives breads their characteristic char spots and smoky flavour.',
      culturalSignificance: 'The daily act of rolling and cooking rotis on a tawa is deeply embedded in North Indian domestic life. Grandmothers passing the skill of judging a tawa\'s readiness "by feel" to grandchildren represents a form of embodied cultural transmission.',
      funFact: 'A properly seasoned cast iron tawa improves with every use — the thin layer of polymerised oil (seasoning) builds up over decades, creating a near-non-stick surface that modern cookware attempts to replicate synthetically.',
      imageCredit: {
        text: 'Cast iron tawa — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Indian_griddle_(Tawa).jpg'
      }
    },
    {
      id: 'handi',
      name: 'Handi',
      emoji: '🏺',
      material: 'Clay',
      region: 'North India',
      regionCode: 'north-india',
      materialCode: 'clay',
      description: 'The round-bellied clay pot that slow-cooks biryani, dals, and meats to perfumed perfection — a vessel unchanged in form for millennia.',
      cookingPractices: 'Used for dum cooking — food is sealed inside with dough or foil and cooked on low heat, trapping steam and intensifying flavours. Iconic for Handi biryani, dal makhani, and slow-cooked shorba (broth). Clay naturally adds a subtle mineral earthiness to dishes.',
      culturalSignificance: 'The handi\'s round-bottomed design predates the Harappan civilisation. Miniature clay handis are used in rituals and offerings across Hindu, Muslim, and folk traditions. "Handi phaodna" (breaking the pot) is a ceremonial act at festivals like Dahi Handi on Janmashtami.',
      funFact: 'Unglazed clay handis are porous — they naturally cool water through evaporation, a property exploited in traditional clay matka (water pots) that predate mechanical refrigeration by thousands of years.',
      imageCredit: {
        text: 'Traditional clay handi — Wikimedia Commons, Public Domain',
        url: 'https://commons.wikimedia.org/wiki/File:Earthen_pot.jpg'
      }
    },
    {
      id: 'uruli',
      name: 'Uruli',
      emoji: '🥣',
      material: 'Bronze',
      region: 'South India',
      regionCode: 'south-india',
      materialCode: 'bronze',
      description: 'Kerala\'s wide, shallow bronze vessel — a sacred heirloom used for ritual offerings, temple cooking, and slow-roasted festive delicacies.',
      cookingPractices: 'The shallow, wide-mouthed uruli is used to prepare payasam (kheer), aviyal (mixed vegetable curry), and temple prasad in large quantities. Its wide base allows maximum surface contact with heat, ideal for slow-cooking and reducing liquids evenly.',
      culturalSignificance: 'In Kerala homes, the uruli is a treasured family heirloom. Antique urulis are displayed prominently as decorative objects and used as flower-float vessels (filled with water and petals) during Onam and other ceremonies. They are a central prop in Kerala\'s classical mural painting traditions depicting mythological feasts.',
      funFact: 'Traditional Keral a urulis are made by Moosari (bronze artisan) communities using the lost-wax casting technique — the same method used to create the famous Dancing Girl of Mohenjo-daro (2500 BCE). The UNESCO-recognised craft of Thatheras of Jandiala Guru also uses similar bell-metal techniques.',
      imageCredit: {
        text: 'Bronze uruli from Kerala — Wikimedia Commons, CC BY-SA 3.0',
        url: 'https://commons.wikimedia.org/wiki/File:Uruli.jpg'
      }
    },
    {
      id: 'chatti',
      name: 'Chatti',
      emoji: '🍲',
      material: 'Clay',
      region: 'South India',
      regionCode: 'south-india',
      materialCode: 'clay',
      description: 'Kerala\'s rounded clay cooking pot — the vessel behind fish curry, coconut stews, and toddy-shop cooking that defines the state\'s culinary identity.',
      cookingPractices: 'The chatti\'s thick clay walls conduct heat slowly and evenly, making it ideal for simmering fish curries, puttu (steamed rice cakes), and curries cooked in coconut milk. The clay subtly alters the flavour profile — Kerala chefs insist fish curry is only authentic when cooked in a chatti.',
      culturalSignificance: 'The chatti is inseparable from Kerala\'s toddy-shop (kallu shaap) culture — simple, authentic cooking in unpretentious surroundings. It represents the Kerali philosophy of "kayyambazham" (food made with hands from the earth), connecting cooking directly to nature.',
      funFact: 'The Geographical Indication (GI) for Kerala pottery recognises specific red clay varieties used for chatti production. Artisans in Thrissur and Thrippunithura are among the last traditional chatti potters.',
      imageCredit: {
        text: 'Kerala clay chatti — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Kerala_claypot.jpg'
      }
    },
    {
      id: 'dekchi',
      name: 'Dekchi',
      emoji: '🫕',
      material: 'Brass',
      region: 'Pan-India',
      regionCode: 'pan-india',
      materialCode: 'brass',
      description: 'The large, flat-bottomed brass cooking vessel that anchors Indian commercial kitchens — from wedding caterers to the langar of a gurudwara.',
      cookingPractices: 'The dekchi (also spelled dekhchi or deg) is a heavy, cylindrical vessel used for boiling rice, cooking large-batch curries, and simmering dals for hours. Its flat bottom and straight sides make it stackable — critical for large-scale kitchen operations.',
      culturalSignificance: 'The massive brass "deg" (a supersized dekchi) used in Sikh gurudwara langars can hold thousands of servings. These degs are often donated by devotees as acts of seva (selfless service) and are inscribed with names of benefactors — a living tradition of charitable giving through cookware.',
      funFact: 'Brass is mildly antimicrobial — traditional science recognised that storing water and food in brass vessels reduced bacterial growth. This has been validated by modern microbiological studies showing significant reduction in E. coli and S. aureus in water stored in brass containers.',
      imageCredit: {
        text: 'Traditional brass dekchi — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Brass_pot.jpg'
      }
    },
    {
      id: 'bel-chakla',
      name: 'Bel-Chakla',
      emoji: '🪵',
      material: 'Wood',
      region: 'North India',
      regionCode: 'north-india',
      materialCode: 'wood',
      description: 'The rolling pin and board duo — the essential pair behind every thin roti, flaky paratha, and papdi that rolls out of North Indian kitchens.',
      cookingPractices: 'The chakla (circular board, typically 30–40 cm in diameter) provides the surface for rolling dough, while the bel (rolling pin) flattens it. The smooth hardwood surface and slight weight of the bel distributes pressure evenly, critical for achieving uniform thickness in chapatis and puris.',
      culturalSignificance: 'Learning to roll a perfect round roti on the bel-chakla is a rite of passage in North Indian households. The idiom "ulti khopdi mein bel banana" (trying to roll bread on an upside-down head) describes someone doing something futile — illustrating how deeply the bel-chakla is embedded in everyday language.',
      funFact: 'Traditional chaklas are made from heavy woods like sheesham (Indian rosewood) or teak, which resist moisture absorption and warping. The Banaras (Varanasi) tradition of inlaying chakla surfaces with decorative patterns makes them also prized as art objects.',
      imageCredit: {
        text: 'Wooden bel-chakla set — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Chakla_belan.jpg'
      }
    },
    {
      id: 'chimta',
      name: 'Chimta',
      emoji: '🥢',
      material: 'Iron',
      region: 'North India',
      regionCode: 'north-india',
      materialCode: 'iron',
      description: 'Long iron tongs that lift rotis off the flame, handle charcoal, and feature prominently in Punjabi folk music and Sufi devotional traditions.',
      cookingPractices: 'The chimta (fire tongs) is used to flip rotis directly over an open flame for the characteristic charring, to handle charcoal for the tandoor, and to manage burning wood in traditional chulhas. It is also used to hold lighted incense sticks during rituals.',
      culturalSignificance: 'The chimta transcends the kitchen — it is a musical instrument in Punjab\'s folk tradition. Played by clicking the metal rings threaded through its handle, the chimta provides percussive rhythm in bhangra, giddha, and Sufi qawwali performances. Famous Punjabi folk singer Lal Chand Yamla used the chimta as his signature instrument.',
      funFact: 'The musical chimta is threaded with small brass rings (thallis) along its spine. When struck together rhythmically, the rings jingle — combining the tong\'s practical clattering sound with melodic percussion. It appears in at least two UNESCO-recognised intangible heritage traditions of Punjab.',
      imageCredit: {
        text: 'Iron chimta with musical rings — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Chimta_instrument.jpg'
      }
    },
    {
      id: 'sarai',
      name: 'Sarai (Parat)',
      emoji: '🥗',
      material: 'Brass',
      region: 'East India',
      regionCode: 'east-india',
      materialCode: 'brass',
      description: 'The wide, shallow brass tray used for kneading dough, serving ceremonial feasts, and presenting offerings at Bengali weddings and pujas.',
      cookingPractices: 'The sarai (also called parat in North India) is a large, flat-rimmed brass tray used for kneading large quantities of atta (wheat flour), for serving rice and curries during community feasts, and as a base for preparing sweets like laddoo and barfi. Its wide rim prevents spillage during vigorous kneading.',
      culturalSignificance: 'In Bengal, brass sarai trays are integral to wedding rituals — the bride and groom exchange flower garlands over a sarai, and sweets are presented to guests on polished brass parats. The tradition of gifting a sarai set at weddings persists as a symbol of domestic prosperity.',
      funFact: 'The art of engraving decorative motifs on brass sarais — floral borders, mythological scenes, and geometric patterns — is a living craft tradition in Murshidabad, West Bengal, where artisans use a sharp burin to engrave patterns freehand.',
      imageCredit: {
        text: 'Brass parat/sarai — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Brass_thali.jpg'
      }
    },
    {
      id: 'sigdi',
      name: 'Sigdi (Chulha)',
      emoji: '🔥',
      material: 'Clay',
      region: 'Rural India',
      regionCode: 'rural-india',
      materialCode: 'clay',
      description: 'The traditional clay stove — India\'s original heat source, still fuelling millions of rural kitchens with wood, dung cakes, and agricultural waste.',
      cookingPractices: 'The sigdi (portable clay stove) and chulha (fixed clay hearth) burn biomass fuels to generate intense, controllable heat. They support all forms of Indian cooking — including the slow, smoky heat that gives tandoori food and wood-fire dals their distinctive character. Cooking pots rest in or on the stove\'s recessed mouth.',
      culturalSignificance: 'The chulha (hearth) is the symbolic and spiritual centre of Indian rural domesticity. In many traditions, it is worshipped as a goddess (Chulha Devi). Brides perform rituals at the hearth on arrival in a new home. The phrase "chulha jalana" (lighting the stove) is a metaphor for running a household.',
      funFact: 'The Indian government\'s Pradhan Mantri Ujjwala Yojana (PMUY) scheme, launched in 2016, aimed to replace traditional chulhas with LPG connections for 80 million rural women — recognising that indoor air pollution from biomass burning is a major health hazard, particularly for women who cook on these stoves daily.',
      imageCredit: {
        text: 'Traditional clay chulha in rural India — Wikimedia Commons, CC BY-SA 2.0',
        url: 'https://commons.wikimedia.org/wiki/File:Chulha.jpg'
      }
    },
    {
      id: 'paan-daan',
      name: 'Paan Daan',
      emoji: '🫙',
      material: 'Brass',
      region: 'East India',
      regionCode: 'east-india',
      materialCode: 'brass',
      description: 'The ornate brass container for storing paan (betel leaf) ingredients — a symbol of aristocratic hospitality in Mughal, Nawabi, and Bengali traditions.',
      cookingPractices: 'The paan daan stores separate compartments of betel leaves, areca nut (supari), slaked lime (chuna), catechu (katha), cardamom, and other paan accompaniments. Its compartmentalised interior keeps ingredients fresh and separated. Offering paan from a paan daan to guests was the ultimate act of hospitality in Nawabi courts.',
      culturalSignificance: 'The paan daan is among the most exquisitely crafted brass objects in Indian art history. Nawabi paan dans from Lucknow were inlaid with silver, set with semi-precious stones, and engraved with ghazal poetry. They appear in Mughal miniature paintings as markers of refined social standing.',
      funFact: 'The Raza Library in Rampur holds one of India\'s largest collections of historic paan dans from the Nawabi period. The craft of making ornate paan dans is still alive in Lucknow\'s Chowk district, though numbers of artisans have dwindled sharply.',
      imageCredit: {
        text: 'Antique brass paan daan — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Paan_daan.jpg'
      }
    },
    {
      id: 'copper-lota',
      name: 'Copper Lota',
      emoji: '🪣',
      material: 'Copper',
      region: 'Pan-India',
      regionCode: 'pan-india',
      materialCode: 'copper',
      description: 'The small rounded copper water vessel — an icon of Indian daily ritual, hygiene practice, and spiritual offering found from Himalayan temples to south Indian homes.',
      cookingPractices: 'While not strictly a cooking vessel, the copper lota stores and dispenses water for hand-washing before and after meals, for ritual bathing, and for offerings during puja. Copper\'s antimicrobial properties make it ideal for water storage. It is also used to water tulsi (holy basil) plants in daily morning rituals.',
      culturalSignificance: 'The lota is among India\'s most culturally resonant objects — designer Abram Games called it "a thing of perfect beauty" and it inspired the 1956 "Lota of India" essay by designers Charles and Ray Eames, who used it as a metaphor for design that evolves through generations of use rather than deliberate styling.',
      funFact: 'The Charles and Ray Eames essay "The India Report" (1958), commissioned for India\'s National Institute of Design, features the copper lota as the central example of functional design perfection — a vessel refined over centuries without a single named designer. This essay influenced the founding of NID in Ahmedabad.',
      imageCredit: {
        text: 'Traditional copper lota — Wikimedia Commons, CC BY-SA 4.0',
        url: 'https://commons.wikimedia.org/wiki/File:Copper_lota.jpg'
      }
    }
  ],

  sources: [
    {
      title: 'K.T. Achaya — A Historical Dictionary of Indian Food (Oxford University Press, 1998)',
      url: 'https://global.oup.com/academic/product/a-historical-dictionary-of-indian-food-9780195644265'
    },
    {
      title: 'Charles & Ray Eames — The India Report (1958) / National Institute of Design',
      url: 'https://www.nid.edu/about/the-india-report'
    },
    {
      title: 'UNESCO — Intangible Cultural Heritage: Traditional Brass and Copper Craft of Thatheras of Jandiala Guru',
      url: 'https://ich.unesco.org/en/RL/traditional-brass-and-copper-craft-of-utensil-making-among-the-thatheras-of-jandiala-guru-punjab-india-00698'
    },
    {
      title: 'IGNCA — Encyclopaedia of Indian Folk Culture: Material Culture',
      url: 'https://ignca.gov.in/online-digital-resources/encyclopaedia-of-indian-folk-culture/'
    },
    {
      title: 'Ministry of Tribal Affairs — Dokra Craft and Lost-Wax Casting Traditions',
      url: 'https://tribal.nic.in/content/artisans.aspx'
    },
    {
      title: 'Kerala Pottery GI — Geographical Indications Registry of India',
      url: 'https://ipindia.gov.in/gi.htm'
    }
  ]
};

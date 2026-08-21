/**
 * Comprehensive Dataset for Shina Language Explorer (Dardic Himalayan Heritage of Ladakh)
 * Spoken in Drass Valley (Ladakh), Gurez Valley (Kashmir), and surrounding high-altitude belts (ISO 639-3: scl).
 */

window.SHINA_DATA = {
    overview: {
        title: "Shina Language Explorer",
        nativeName: "شینا / Ṣiṇā / शीना",
        endonym: "Ṣiṇyā / Shina / Dardi",
        romanization: "Shina / Ṣiṇā",
        family: "Indo-European ➔ Indo-Iranian ➔ Indo-Aryan ➔ Dardic Branch (Shina Group)",
        speakers: "approx. 600,000+ (Ladakh: Drass & Kargil; Gurez Valley; Gilgit-Baltistan)",
        primaryRegions: [
            "Drass Valley (Ladakh — Gateway to Ladakh & Coldest Inhabited Place in India)",
            "Kargil District (Batalik Sector, Dah-Hanu Borderlands)",
            "Gurez & Tulail Valleys (Bandipora, Jammu & Kashmir)",
            "Astor, Gilgit, & Kohistan Valleys"
        ],
        writingScripts: [
            "Perso-Arabic (Shina Shahmukhi style with modified retroflex characters: ݜ, ڙ, ݨ, ڇ, ݽ)",
            "Devanagari (शीना - Used in academic and regional cultural documentation)",
            "Latin / Roman IPA (Linguistic surveys & digital dictionaries)"
        ],
        isoCode: "ISO 639-3: scl",
        greeting: "سلام / جے حال ہن؟ (Salām / Je haal hin?)",
        description: "Shina (شینا / Ṣiṇā) is an ancient Dardic Indo-Aryan language spoken across the extreme alpine valleys of the Himalayas, notably Drass in Ladakh (the second coldest inhabited place on Earth) and Gurez Valley. Renowned for its distinctive pitch-accent tonal system, archaic Vedic Sanskrit cognates, traditional mountain polo culture, and heroic Dardi folklore."
    },

    genealogy: {
        root: "Proto-Indo-European ➔ Proto-Indo-Iranian",
        branch: "Indo-Aryan ➔ Dardic Sub-branch",
        subgroup: "Shina Group (Drasi, Gurezi, Gilgiti, Astori, Kohistani)",
        characteristics: [
            {
                title: "Archaic Indo-Aryan Phonology",
                desc: "Shina preserves ancient retroflex fricatives (ṣ, ẓ) and consonant clusters that have disappeared in most modern lowland Indo-Aryan languages (Hindi, Punjabi, Bengali)."
            },
            {
                title: "Pitch-Accent & Tonal System",
                desc: "Unlike standard Hindi, Shina possesses a distinctive high-falling and rising pitch-accent tone contrast on vowels that distinguishes word meanings (e.g. 'bóo' vs 'bòo')."
            },
            {
                title: "Three-way Gender System in Some Dialects",
                desc: "Certain Shina dialects retain masculine, feminine, and neuter grammatical categories, reflecting early Indo-Aryan morphology."
            },
            {
                title: "Glacial Adaptation Vocabulary",
                desc: "Possesses a rich specialized vocabulary for avalanche types, sub-zero snow textures, mountain passes, juniper rites, and Himalayan pony horsemanship."
            }
        ]
    },

    scripts: [
        {
            name: "Perso-Arabic Script (شینا رسم الخط)",
            status: "Primary Literary & Published Script",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Drass_Valley_Ladakh.jpg/640px-Drass_Valley_Ladakh.jpg",
            desc: "Standardized with special modified letters containing extra diacritic dots to represent unique Dardic retroflex sounds (such as ݜ for retroflex 'sh' and ڇ for retroflex 'ch'). Used in poetry collections and Radio Kashmir Drass broadcasts.",
            example: "شینا زباں اسو جان ہنی۔",
            translit: "Shina zabāñ aso jān hanī.",
            meaning: "The Shina language is our sacred breath of life."
        },
        {
            name: "Devanagari Script (देवनागरी)",
            status: "Educational & Cultural Transcription",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Khardung_La_Pass_Ladakh.jpg/640px-Khardung_La_Pass_Ladakh.jpg",
            desc: "Adapted with specialized under-dots for retroflex phonemes and macrons for tone marks in academic grammars and cultural research publications in India.",
            example: "शीना भाषा अस्सो जान हनी।",
            translit: "Shina bhasha asso jan hani.",
            meaning: "The Shina language is our sweet identity."
        }
    ],

    regions: [
        {
            id: "drass",
            name: "Drass Valley (Ladakh)",
            subRegions: ["Drass Town", "Matayan", "Pandrass", "Bimbat", "Mushkoh Valley", "Tololing Base"],
            speakers: "approx. 30,000",
            color: "#0284c7",
            desc: "The famous 'Gateway to Ladakh' located at 3,280m altitude—the second coldest inhabited place in the world. Dras Shina speakers are known for their resilience in sub-zero winters (-40°C) and mountain polo tournaments."
        },
        {
            id: "gurez",
            name: "Gurez & Tulail Valleys (Jammu & Kashmir)",
            subRegions: ["Dawar", "Tulail", "Barnoi", "Habba Khatoon Peak"],
            speakers: "approx. 45,000",
            color: "#16a34a",
            desc: "The pristine high-altitude valley along the Kishanganga river surrounded by alpine meadows and Habba Khatoon peak, preserving lyrical Shina romantic poetry."
        },
        {
            id: "kargil-border",
            name: "Lower Kargil & Dah-Hanu Border",
            subRegions: ["Batalik", "Dah", "Hanu", "Garkone", "Chulichan"],
            speakers: "approx. 15,000",
            color: "#d97706",
            desc: "Where Shina intersects with the Brokskat / Drokpa Buddhist Dardic dialect along the lower Indus River, famous for floral headgear and Aryan folklore."
        },
        {
            id: "gilgit-astor",
            name: "Gilgit, Astor & Diamer Belts",
            subRegions: ["Gilgit Valley", "Astor", "Chilas", "Kohistan"],
            speakers: "approx. 500,000",
            color: "#8b5cf6",
            desc: "The broader Trans-Himalayan Shina linguistic continuum spanning Karakoram and Hindu Kush valleys."
        }
    ],

    greetings: [
        {
            id: "salam",
            category: "Universal Respectful Salutation",
            native: "سلام / السلام علیکم (Salām)",
            transliteration: "Salām / As-Salāmu 'Alaykum",
            ipa: "[səlaːm / əsːəlaːmu ʕaləjkum]",
            phonetic: "sah-LAHM",
            meaning: "Peace be upon you / Warm greetings",
            context: "Universal greeting exchanged across all generations in Drass and Gurez valleys.",
            audioText: "Salam"
        },
        {
            id: "je-haal-hin",
            category: "Well-Being & Health Inquiry",
            native: "جے حال ہن؟ (Je haal hin?)",
            transliteration: "Je haal hin? / Chhe haal hin?",
            ipa: "[d͡ʒeː haːl hin]",
            phonetic: "JAY HAHL hin",
            meaning: "How are you? / How is your health and well-being?",
            context: "Standard polite inquiry asked upon meeting friends, guests, and relatives.",
            audioText: "Je haal hin"
        },
        {
            id: "mishto-han",
            category: "Joyous Positive Response",
            native: "مشٹو ہن / شکر (Mishto han)",
            transliteration: "Mishto han / Shukar",
            ipa: "[miʂʈoː hən]",
            phonetic: "MEESH-toh hahn",
            meaning: "I am doing very well / All is sweet and fine",
            context: "Standard reply affirming good health and spirit.",
            audioText: "Mishto han"
        },
        {
            id: "khuda-hafiz",
            category: "Farewell & Mountain Blessing",
            native: "خدا حافظ / با خرم (Khuda Hafiz)",
            transliteration: "Khuda Hafiz / Bā-Khuram",
            ipa: "[xudaː haːfiz]",
            phonetic: "khoo-DAH HAH-feez",
            meaning: "May God protect your journey over the mountain passes",
            context: "Wished to travelers embarking across Zojila Pass or high snow trails.",
            audioText: "Khuda Hafiz"
        },
        {
            id: "shukriya",
            category: "Gratitude & Hospitality",
            native: "شکریہ / مہربانی (Shukriya)",
            transliteration: "Shukriya / Mehrbani",
            ipa: "[ʃukriːjaː]",
            phonetic: "shook-REE-yah",
            meaning: "Thank you very much / Deep appreciation for warmth",
            context: "Said when receiving warm salt tea (Noon Chai) and hospitality in mountain homes.",
            audioText: "Shukriya"
        }
    ],

    vocabulary: [
        {
            id: "wye",
            concept: "Water",
            native: "وئے / वै (Wye / Wai)",
            transliteration: "Wye / Wai",
            ipa: "/wəi ~ wai/",
            phonetic: "WYE (like 'why')",
            meaning: "Water / Glacial stream water (Drass river)",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Jonha_Falls_Ranchi.jpg/640px-Jonha_Falls_Ranchi.jpg",
            notes: "Ancient Indo-Aryan cognate tracing back to Vedic 'Vāri' / Proto-Indo-European water roots."
        },
        {
            id: "koh",
            concept: "Mountain",
            native: "کوہ / دئی (Kōh / Dēi)",
            transliteration: "Kōh / Dēi",
            ipa: "/koːh ~ deːi/",
            phonetic: "KOH / DAY-ee",
            meaning: "Mountain peak / Rugged Himalayan ridge (e.g. Tololing)",
            category: "Geography & Nature",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Stok_Kangri_from_Leh.jpg/640px-Stok_Kangri_from_Leh.jpg",
            notes: "Refers to both mountain peaks and the high pass ridges enclosing Drass."
        },
        {
            id: "suri",
            concept: "Sun / Daylight",
            native: "سوری / सूरी (Sūri)",
            transliteration: "Sūri",
            ipa: "/suːri/",
            phonetic: "SOO-ree",
            meaning: "Sun / Daylight / Solar warmth",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Sunrise_over_Netarhat_Jharkhand.jpg/640px-Sunrise_over_Netarhat_Jharkhand.jpg",
            notes: "Direct descendant of Sanskrit 'Sūrya', essential in sub-zero winter temperatures."
        },
        {
            id: "hun",
            concept: "Moon / Month",
            native: "ہون / हून (Hūn)",
            transliteration: "Hūn",
            ipa: "/huːn/",
            phonetic: "HOON",
            meaning: "Moon / Lunar month",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Full_Moon_Luc_Viatour.jpg/640px-Full_Moon_Luc_Viatour.jpg",
            notes: "Guides seasonal agricultural calendars and moonlit night watches across the valley."
        },
        {
            id: "got",
            concept: "House / Home",
            native: "گوٹ / गोट (Gōṭ)",
            transliteration: "Gōṭ",
            ipa: "/ɡoːʈ/",
            phonetic: "GOHT (retroflex)",
            meaning: "House / Traditional stone & timber mountain home",
            category: "Homestead & Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leh_Old_Town_houses.jpg/640px-Leh_Old_Town_houses.jpg",
            notes: "Built with thick insulating dry-stone and mud walls, fitted with a central wood-burning Bukhari stove."
        },
        {
            id: "tiki",
            concept: "Bread / Traditional Roti",
            native: "ٹیکی / टीकी (Tīkī)",
            transliteration: "Tīkī",
            ipa: "/tiːki/",
            phonetic: "TEE-kee",
            meaning: "Local flatbread / Traditional barley-wheat loaf",
            category: "Food & Sustenance",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cooked_rice_bowl.jpg/640px-Cooked_rice_bowl.jpg",
            notes: "Baked fresh on iron pans or clay ovens, served with butter tea in freezing mornings."
        },
        {
            id: "hin",
            concept: "Snow / Glacier",
            native: "ہن / हिन (Hin)",
            transliteration: "Hin",
            ipa: "/hin/",
            phonetic: "HIN",
            meaning: "Snow / Winter snow cover / Glacier ice",
            category: "Nature & Glacial Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Drass_Valley_Ladakh.jpg/640px-Drass_Valley_Ladakh.jpg",
            notes: "Direct cognate of Sanskrit 'Hima' (as in Himalaya), representing Drass's heavy 6-foot winter snowfalls."
        },
        {
            id: "goro",
            concept: "Horse / Mountain Pony",
            native: "گورو / गोरो (Gōrō)",
            transliteration: "Gōrō",
            ipa: "/ɡoːroː/",
            phonetic: "GOH-roh",
            meaning: "Mountain horse / Zanskari-Dardi polo pony",
            category: "Fauna & Mountain Sports",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Yak_in_Ladakh.jpg/640px-Yak_in_Ladakh.jpg",
            notes: "Central to Dardi culture and the historic traditional mountain polo matches in Drass."
        },
        {
            id: "angar",
            concept: "Fire / Hearth",
            native: "انگار / अंगार (Angār)",
            transliteration: "Angār",
            ipa: "/əŋɡaːr/",
            phonetic: "ahn-GAHR",
            meaning: "Hearth fire / Embers / Bukhari warmth",
            category: "Homestead & Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ladakhi_traditional_kitchen.jpg/640px-Ladakhi_traditional_kitchen.jpg",
            notes: "Ancient Indo-Aryan word for live embers keeping high-altitude homes warm in winter."
        },
        {
            id: "mush",
            concept: "Man / Person",
            native: "موش / मूश (Mūsh)",
            transliteration: "Mūsh",
            ipa: "/muːʂ/",
            phonetic: "MOOSH (retroflex)",
            meaning: "Man / Human person / Dardi mountaineer",
            category: "Identity & Humanity",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oraon_tribal_dance.jpg/640px-Oraon_tribal_dance.jpg",
            notes: "Classic Dardic term with retroflex 'sh' representing humanity and courage."
        },
        {
            id: "chili",
            concept: "Sacred Juniper",
            native: "چلی / चिली (Chilī)",
            transliteration: "Chilī",
            ipa: "/t͡ʃili/",
            phonetic: "CHEE-lee",
            meaning: "Sacred mountain juniper (Juniperus excelsa)",
            category: "Spiritual Heritage",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sacred_grove_India.jpg/640px-Sacred_grove_India.jpg",
            notes: "Burned as fragrant cleansing incense in Dardi homes and ancient mountain rituals."
        },
        {
            id: "mishto",
            concept: "Good / Sweet / Joyous",
            native: "مشٹو / मिष्टो (Mishto)",
            transliteration: "Mishto",
            ipa: "/miʂʈoː/",
            phonetic: "MEESH-toh",
            meaning: "Good / Sweet / Beautiful / Happy",
            category: "Emotions & Expressions",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hemis_Festival_Ladakh.jpg/640px-Hemis_Festival_Ladakh.jpg",
            notes: "Cognate of Sanskrit 'Miṣṭa' (sweet), used to praise hospitality, tea, and music."
        }
    ],

    culturalHeritage: [
        {
            title: "Drass Valley & Sub-Zero Himalayan Life",
            category: "High-Altitude Heritage",
            icon: "❄️",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Drass_Valley_Ladakh.jpg/640px-Drass_Valley_Ladakh.jpg",
            imageCredit: "Drass Valley Landscape (Wikimedia Commons)",
            content: "Located at 3,280 meters on the Srinagar-Leh highway, Drass is the 'Gateway to Ladakh' and the second coldest inhabited place in the world. Shina speakers have perfected high-altitude cold-desert survival techniques, thick wool weaving (Pattu), and Bukhari hearth engineering for temperatures reaching -40°C."
        },
        {
            title: "Mountain Polo & Horsemanship Heritage",
            category: "Traditional Sports",
            icon: "🐎",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Khardung_La_Pass_Ladakh.jpg/640px-Khardung_La_Pass_Ladakh.jpg",
            imageCredit: "High-Altitude Polo Ground (Wikimedia Commons)",
            content: "Polo in Drass is an indigenous heritage game played on rugged mountain ponies to the acoustic accompaniment of Daman drums and Surna horns, retaining fast-paced traditional free-style rules without chukkers."
        },
        {
            title: "Shina Oral Epics & Bait Poetry",
            category: "Oral Literature",
            icon: "📜",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Thiksey_Monastery_Ladakh_India.jpg/640px-Thiksey_Monastery_Ladakh_India.jpg",
            imageCredit: "Himalayan Bardic Traditions (Wikimedia Commons)",
            content: "The Shina people possess an immense treasure of oral folk epics, ballads of ancient warriors (Rono kings), romantic Bait couplets, and riddles passed down during long winter snowfall nights around the hearth fire."
        },
        {
            title: "Juniper Rites & Dardi Mountain Lore",
            category: "Spiritual Traditions",
            icon: "🌲",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sacred_grove_India.jpg/640px-Sacred_grove_India.jpg",
            imageCredit: "Himalayan Juniper Traditions (Wikimedia Commons)",
            content: "Dardic culture maintains deep reverence for the sacred mountain juniper tree (Chilī), burned as purifying smoke during weddings, harvests, and mountain trail blessings to invite positive spirits."
        }
    ],

    quizQuestions: [
        {
            question: "To which language family does the Shina language belong?",
            options: [
                "Indo-European ➔ Indo-Aryan ➔ Dardic branch",
                "Tibeto-Burman family",
                "Dravidian family",
                "Austroasiatic family"
            ],
            correct: 0,
            explanation: "Shina is a Dardic language of the Indo-Aryan group, preserving ancient retroflex consonants and pitch-accent tones."
        },
        {
            question: "Which high-altitude valley in Ladakh is the primary center of Shina speakers in India?",
            options: [
                "Drass Valley (Second coldest inhabited place in the world)",
                "Nubra Valley",
                "Pangong Tso Basin",
                "Zanskar Valley"
            ],
            correct: 0,
            explanation: "Drass Valley in the Kargil district of Ladakh is the primary homeland of Shina speakers in Ladakh."
        },
        {
            question: "What is the universal respectful greeting in Shina asking 'How are you?'",
            options: ["جے حال ہن؟ (Je haal hin?)", "Julley", "Chibai", "Isk vaa"],
            correct: 0,
            explanation: "'Je haal hin?' is the common Shina greeting asking about one's health and well-being."
        },
        {
            question: "What traditional indigenous equestrian sport is famous among the Shina people of Drass?",
            options: ["Mountain Horse Polo", "Archery Golf", "Bullock Cart Racing", "Kabaddi"],
            correct: 0,
            explanation: "Mountain horse polo on indigenous mountain ponies is an iconic cultural tradition in Drass."
        },
        {
            question: "What ancient sacred tree is revered and burned as purifying smoke in Dardi tradition?",
            options: ["Juniper (Chilī)", "Banyan", "Peepal", "Neem"],
            correct: 0,
            explanation: "The alpine juniper tree (Chilī) is sacred in Dardic tradition and used in purification rituals."
        }
    ],

    sources: [
        {
            title: "Grammar of the Shina Language",
            author: "T. Grahame Bailey (1924), Royal Asiatic Society, London",
            link: "https://en.wikipedia.org/wiki/Shina_language"
        },
        {
            title: "Dardic Languages and Shina Phonology",
            author: "Georg Morgenstierne (1945) & Ruth Laila Schmidt (2008)",
            link: "https://www.jstor.org/topic/dardic-languages"
        },
        {
            title: "The Shina of Drass: Linguistic and Cultural Survey",
            author: "Central Institute of Indian Languages (CIIL), Mysore",
            link: "https://archive.org/details/shina-grammar"
        },
        {
            title: "UNESCO Atlas of the World's Languages in Danger",
            author: "UNESCO Linguistic Monitoring (ISO 639-3: scl)",
            link: "http://www.unesco.org/languages-atlas/"
        }
    ]
};

/**
 * Comprehensive Dataset for Kurukh Language Explorer (Chota Nagpur Plateau & Beyond)
 * Spoken by the Oraon / Kurukh tribal community (ISO 639-3: kru).
 */

window.KURUKH_DATA = {
    overview: {
        title: "Kurukh Language Explorer",
        nativeName: "कुड़ुख़ / 𑒏𑒳𑒛𑒳𑒐",
        endonym: "Kurux / Uraon / Oraon",
        romanization: "Kuṛux / Kurukh",
        family: "Dravidian ➔ North Dravidian (Kurukh–Malto–Brahui Branch)",
        speakers: "approx. 2,500,000+ (Jharkhand, Odisha, Chhattisgarh, West Bengal, Assam, Bihar)",
        primaryRegions: [
            "Jharkhand (Ranchi, Gumla, Lohardaga, Latehar, Simdega)",
            "Chhattisgarh (Jashpur, Surguja, Raigarh)",
            "Odisha (Sundargarh, Sambalpur, Jharsuguda)",
            "West Bengal (Jalpaiguri, Alipurduar)",
            "Assam & Tripura (Tea Garden Belts)"
        ],
        writingScripts: [
            "Tolong Siki (𑒏𑒳𑒛𑒳𑒐 - Official Indigenous Script by Dr. Narayan Oraon, 1999)",
            "Devanagari (कुड़ुख - Widely used in publishing & education)",
            "Latin / Roman Script",
            "Odia & Bengali Scripts (Regional editions)"
        ],
        isoCode: "ISO 639-3: kru",
        greeting: "जय धरमे! / जोहार! (Jai Dharme! / Johar!)",
        description: "Kurukh (कुड़ुख़ / 𑒏𑒳𑒛𑒳𑒐) is a major North Dravidian language spoken by over 2.5 million Oraon indigenous people across the Chota Nagpur plateau and adjoining states. Celebrated for its unique indigenous Tolong Siki script, veneration of nature in festivals like Sarhul and Karam, rich Dhumkuria oral education, and the rhythmic beats of the Mandar drum, Kurukh is a vital pillar of Indian tribal heritage."
    },

    genealogy: {
        root: "Proto-Dravidian",
        branch: "North Dravidian",
        subgroup: "Kurukh–Malto Group",
        characteristics: [
            {
                title: "North Dravidian Linguistic Island",
                desc: "Kurukh is one of the few Northern Dravidian languages spoken in central-eastern India, retaining ancient Dravidian roots while surrounded by Indo-Aryan (Mundari, Sadri, Hindi) and Austroasiatic tongues."
            },
            {
                title: "Tolong Siki Script Heritage",
                desc: "Created in 1999 by physician-linguist Dr. Narayan Oraon, Tolong Siki is an authentic indigenous alphabet officially recognized in Jharkhand and West Bengal for Kurukh education."
            },
            {
                title: "Gender & Number Agreement",
                desc: "Kurukh features a distinct gender agreement system where verbs distinguish masculine and non-masculine (feminine/neuter) subject forms in both singular and plural."
            },
            {
                title: "Rich Onomatopoeia & Echo Words",
                desc: "Kurukh possesses extensive descriptive echo words depicting forest sounds, animal movements, water ripples, and Mandar drum rhythms."
            }
        ]
    },

    scripts: [
        {
            name: "Tolong Siki Script (𑒏𑒳𑒛𑒳𑒐)",
            status: "Official Indigenous Script (1999)",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tolong_Siki_Alphabet_Chart.png/640px-Tolong_Siki_Alphabet_Chart.png",
            desc: "Invented by Dr. Narayan Oraon in 1999 to accurately capture the specific phonemes and glottal stops of Kurukh. Officially taught in primary schools and universities across Jharkhand and West Bengal.",
            example: "𑒏𑒳𑒛𑒳𑒐 𑒏𑒰𑒟𑒰 𑒢𑒰𑒧𑒹 𑒡𑒩𑒧𑒹",
            translit: "Kurux katha name Dharme",
            meaning: "The Kurukh speech is our sacred blessing from Dharmes."
        },
        {
            name: "Devanagari Script (कुड़ुख़)",
            status: "Widely Used Print & Educational Script",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Devanagari_Kurukh_manuscript.jpg/640px-Devanagari_Kurukh_manuscript.jpg",
            desc: "Standardized with special modified diacritics (such as ़ and ऽ) to represent Kurukh retroflex sounds, glottal stops, and vowel lengths in books, dictionaries, and digital media.",
            example: "एड़पा मझी धरमे र'अदस।",
            translit: "Erpa majhi Dharme ra'adas.",
            meaning: "The Supreme Lord Dharmes resides within the household."
        }
    ],

    regions: [
        {
            id: "jharkhand",
            name: "Chota Nagpur Heartland (Jharkhand)",
            subRegions: ["Ranchi", "Gumla", "Lohardaga", "Latehar", "Simdega", "Khunti"],
            speakers: "approx. 1,400,000",
            color: "#16a34a",
            desc: "The ancestral epicenter of the Kurukh/Oraon civilization. Home to vibrant Sarhul and Karam celebrations, traditional Parha panchayats, and Ranchi University Kurukh departments."
        },
        {
            id: "chhattisgarh",
            name: "Jashpur & Northern Hills (Chhattisgarh)",
            subRegions: ["Jashpur", "Surguja", "Raigarh", "Balrampur"],
            speakers: "approx. 600,000",
            color: "#ea580c",
            desc: "Spoken extensively across the forested valleys of Jashpur and Surguja, known for historic tribal music, sacred groves (Sarna), and tea-estate settlements."
        },
        {
            id: "odisha",
            name: "Sundargarh & Western Belt (Odisha)",
            subRegions: ["Sundargarh", "Sambalpur", "Jharsuguda", "Rourkela"],
            speakers: "approx. 350,000",
            color: "#0284c7",
            desc: "A major hub of Oraon cultural institutions with rich folklore, hockey legends, and agricultural harvest dances."
        },
        {
            id: "bengal-assam",
            name: "Dooars, Bengal & Assam Diaspora",
            subRegions: ["Jalpaiguri", "Alipurduar", "Assam Tea Plantations"],
            speakers: "approx. 200,000",
            color: "#8b5cf6",
            desc: "Spoken by migrant Oraon communities in the lush tea garden belts of North Bengal and Assam who preserve Tolong Siki literature and community songs."
        }
    ],

    greetings: [
        {
            id: "jai-dharme",
            category: "Sacred & Supreme Salutation",
            native: "जय धरमे! (𑒖𑒨 𑒡𑒩𑒧𑒹)",
            transliteration: "Jai Dharme!",
            ipa: "[d͡ʒəj dʱəɾmeː]",
            phonetic: "JAI DHAR-may",
            meaning: "Glory to Dharmes (the Supreme Creator) / Blessed Greetings",
            context: "The core traditional greeting acknowledging the presence and grace of Dharmes in every person.",
            audioText: "Jai Dharme"
        },
        {
            id: "johar",
            category: "Universal Adivasi Greeting",
            native: "जोहार! / सेवा जोहार!",
            transliteration: "Johar! / Seva Johar!",
            ipa: "[d͡ʒoːɦaːr / seːvaː d͡ʒoːɦaːr]",
            phonetic: "JOH-haar / SAY-vah JOH-haar",
            meaning: "Heartfelt greetings / Welcome / Reverence to Mother Nature",
            context: "The universal greeting of unity, respect, and mutual brotherhood across the tribal communities of Central & Eastern India.",
            audioText: "Johar"
        },
        {
            id: "eka-se-raada",
            category: "Well-Being Inquiry",
            native: "एका से र'अदा? / बेस र'अदय?",
            transliteration: "Ekā se ra'adā? / Bes ra'aday?",
            ipa: "[eːkaː seː rəʔədaː]",
            phonetic: "AY-kah say rah-dah",
            meaning: "How are you? / Are you doing well?",
            context: "Warm inquiry exchanged when meeting friends, relatives, and neighbors.",
            audioText: "Eka se raada"
        },
        {
            id: "gor-lagna",
            category: "Elders Respectful Salutation",
            native: "गोड़ लागना / पाए लागना",
            transliteration: "Gōṛ lāgnā / Pāye lāgnā",
            ipa: "[ɡoːɽ laːɡnaː]",
            phonetic: "GOHRD LAHG-nah",
            meaning: "I bow to your feet with deep respect (Respect to Elders)",
            context: "Customary greeting offered to parents, elders, village Pahans (priests), and teachers.",
            audioText: "Gor lagna"
        },
        {
            id: "bes-ra'an",
            category: "Response & Goodwill",
            native: "एन बेस र'अन! (𑒋𑒢 𑒥𑒹𑒮 𑒩𑒁𑒢)",
            transliteration: "Ēn bēs ra'an!",
            ipa: "[eːn beːs rəʔən]",
            phonetic: "AYN BAYS rah-an",
            meaning: "I am doing very well! / Everything is peaceful.",
            context: "Standard joyous reply to well-being inquiries.",
            audioText: "En bes ra'an"
        }
    ],

    vocabulary: [
        {
            id: "amm",
            concept: "Water",
            native: "अम्म (𑒁𑒧𑓂𑒧)",
            transliteration: "Amm",
            ipa: "/amː/",
            phonetic: "AHM",
            meaning: "Water / Pure drinking & river water",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Jonha_Falls_Ranchi.jpg/640px-Jonha_Falls_Ranchi.jpg",
            notes: "Direct North Dravidian cognate sharing roots with South Dravidian 'Ambu / Neer'."
        },
        {
            id: "mandi",
            concept: "Cooked Rice / Meal",
            native: "मंडी (𑒧𑒝𑓂𑒛𑒲)",
            transliteration: "Maṇḍī",
            ipa: "/mənɖiː/",
            phonetic: "MAHN-dee",
            meaning: "Cooked rice / Main meal / Daily sustenance",
            category: "Food & Sustenance",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cooked_rice_bowl.jpg/640px-Cooked_rice_bowl.jpg",
            notes: "The staple agricultural diet of the Chota Nagpur plateau, blessed in agricultural rituals."
        },
        {
            id: "biri",
            concept: "Sun / Daylight",
            native: "बीरी (𑒥𑒲𑒩𑒲)",
            transliteration: "Bīrī",
            ipa: "/biːriː/",
            phonetic: "BEE-ree",
            meaning: "Sun / Daylight / Solar morning",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Sunrise_over_Netarhat_Jharkhand.jpg/640px-Sunrise_over_Netarhat_Jharkhand.jpg",
            notes: "Symbolizes light and agricultural vitality, celebrated in morning sun prayers to Biri-Belas (Sun deity)."
        },
        {
            id: "chando",
            concept: "Moon / Month",
            native: "चन्दो (𑒔𑒢𑓂𑒠𑒼)",
            transliteration: "Chandō",
            ipa: "/t͡ʃəndoː/",
            phonetic: "CHAHN-doh",
            meaning: "Moon / Lunar cycle / Month",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Full_Moon_Luc_Viatour.jpg/640px-Full_Moon_Luc_Viatour.jpg",
            notes: "Regulates tribal calendar festivals like Sarhul, Karam, and Sohrai on auspicious full moon nights."
        },
        {
            id: "erpa",
            concept: "House / Homestead",
            native: "एड़पा (𑒋𑒛𑓂𑒣𑒰)",
            transliteration: "Eṛpā",
            ipa: "/eːɽpaː/",
            phonetic: "AYRD-pah",
            meaning: "House / Ancestral home / Hearth",
            category: "Homestead & Community",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Traditional_Tribal_house_Jharkhand.jpg/640px-Traditional_Tribal_house_Jharkhand.jpg",
            notes: "Built with sun-baked mud plaster and earthen tiles, housing the sacred kitchen and granary."
        },
        {
            id: "mann",
            concept: "Tree / Sal Tree",
            native: "मन्न / सखुआ (𑒧𑒢𑓂𑒢)",
            transliteration: "Mann / Sakhuā",
            ipa: "/manː/",
            phonetic: "MAHN",
            meaning: "Tree / Sacred Sal tree (Shorea robusta)",
            category: "Nature & Sacred Groves",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sal_Forest_Saranda.jpg/640px-Sal_Forest_Saranda.jpg",
            notes: "The sacred tree of the Sarna grove whose blossoming is the centerpiece of Sarhul."
        },
        {
            id: "khel",
            concept: "Earth / Soil",
            native: "खेल (𑒐𑒹𑒪)",
            transliteration: "Khēl",
            ipa: "/kʰeːl/",
            phonetic: "KHAYL",
            meaning: "Earth / Soil / Mother Nature (Dharti Aayo)",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Chota_Nagpur_Plateau_Landscape.jpg/640px-Chota_Nagpur_Plateau_Landscape.jpg",
            notes: "Revered as 'Dharti Aayo' (Mother Earth), who nurtures all living beings and crops."
        },
        {
            id: "padda",
            concept: "Village / Settlement",
            native: "पड्डा (𑒣𑒛𑓂𑒛𑒰)",
            transliteration: "Paḍḍā",
            ipa: "/paɖːaː/",
            phonetic: "PAHD-dah",
            meaning: "Village / Tribal settlement / Clan hamlet",
            category: "Homestead & Community",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tribal_village_Jharkhand.jpg/640px-Tribal_village_Jharkhand.jpg",
            notes: "The basic socio-political unit organized into Parha federations led by the village Mahto and Pahan."
        },
        {
            id: "mandar",
            concept: "Mandar Drum",
            native: "मांदर (𑒧𑒰𑒁𑒢𑓂𑒠𑒩)",
            transliteration: "Māndar / Māndar",
            ipa: "/maːnd̪ər/",
            phonetic: "MAHN-dahr",
            meaning: "Traditional earthen two-headed drum",
            category: "Music & Festivals",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mandar_drum_Jharkhand.jpg/640px-Mandar_drum_Jharkhand.jpg",
            notes: "The heartbeat of Oraon dance and song; an acoustic terracotta cylinder with cowhide membranes."
        },
        {
            id: "aalas",
            concept: "Human / Man",
            native: "आलस (𑒂𑒪𑒮)",
            transliteration: "Ālas",
            ipa: "/aːləs/",
            phonetic: "AH-lahs",
            meaning: "Man / Human person / Kurukh member",
            category: "Identity & Humanity",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oraon_tribal_dance.jpg/640px-Oraon_tribal_dance.jpg",
            notes: "Classic Dravidian root for human being, pluralized as 'Aalar' (people)."
        },
        {
            id: "sarna",
            concept: "Sacred Grove",
            native: "सरना (𑒮𑒩𑒢𑒰)",
            transliteration: "Sarnā",
            ipa: "/sərnaː/",
            phonetic: "SAR-nah",
            meaning: "Sacred Sal Grove / Nature Sanctuary",
            category: "Spiritual Heritage",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sacred_grove_India.jpg/640px-Sacred_grove_India.jpg",
            notes: "The inviolable sacred forest grove where the community worships Sarna Burhi and village deities."
        },
        {
            id: "rasa",
            concept: "Joy / Celebration",
            native: "रसा (𑒩𑒮𑒰)",
            transliteration: "Rasā",
            ipa: "/rəsaː/",
            phonetic: "RAH-sah",
            meaning: "Joy / Collective happiness / Festivity",
            category: "Music & Festivals",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Sarhul_festival_dance_Jharkhand.jpg/640px-Sarhul_festival_dance_Jharkhand.jpg",
            notes: "Sung in celebration during moonlit community dances at the Akhra (village dancing ground)."
        }
    ],

    culturalHeritage: [
        {
            title: "Sarhul Festival (Kaddi / Sal Blossom)",
            category: "Sacred Nature Festivals",
            icon: "🌸",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Sarhul_festival_dance_Jharkhand.jpg/640px-Sarhul_festival_dance_Jharkhand.jpg",
            imageCredit: "Sarhul Festival Celebrations (Wikimedia Commons)",
            content: "Sarhul marks the arrival of spring and the blossoming of the sacred Sal (Sakhua) tree. The village priest (Pahan) conducts water-prediction rituals at the Sarna grove, symbolizing the divine marriage between Sun (Biri) and Earth (Dharti Aayo)."
        },
        {
            title: "Karam Festival & Akhra Dances",
            category: "Harvest & Youth Festivals",
            icon: "🌿",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oraon_tribal_dance.jpg/640px-Oraon_tribal_dance.jpg",
            imageCredit: "Karam Dance at the Akhra (Wikimedia Commons)",
            content: "Celebrated on Bhadrapad Shukla Ekadashi, the Karam branch is planted at the village Akhra (dancing ground). Youth dance in synchronized steps through the night, singing Karam epics celebrating sibling affection and agricultural prosperity."
        },
        {
            title: "Dhumkuria (Traditional Youth Academy)",
            category: "Social Education & Governance",
            icon: "🏛️",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Traditional_Tribal_house_Jharkhand.jpg/640px-Traditional_Tribal_house_Jharkhand.jpg",
            imageCredit: "Traditional Oraon Institution (Wikimedia Commons)",
            content: "The Dhumkuria (or Jonkh-Erpa for young men and Pēler-Erpa for women) was the traditional village institution where youth learned tribal history, hunting arts, moral philosophy, songs, and social leadership from village elders."
        },
        {
            title: "Mandar Rhythms & Parha Panchayat",
            category: "Music & Indigenous Democracy",
            icon: "🥁",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mandar_drum_Jharkhand.jpg/640px-Mandar_drum_Jharkhand.jpg",
            imageCredit: "Mandar Drumming (Wikimedia Commons)",
            content: "Kurukh society is federated under the historic Parha Panchayat governance system. Community life is driven by rhythmic beats of the earthen Mandar drum, brass cymbal (Jhanjh), and Sarangi folk melodies."
        }
    ],

    quizQuestions: [
        {
            question: "To which language family does the Kurukh language belong?",
            options: [
                "Dravidian ➔ North Dravidian branch",
                "Indo-Aryan family",
                "Austroasiatic (Munda branch)",
                "Sino-Tibetan family"
            ],
            correct: 0,
            explanation: "Kurukh is a North Dravidian language, grouped with Malto and Brahui, spoken in east-central India."
        },
        {
            question: "What is the name of the official indigenous script created for Kurukh in 1999?",
            options: ["Tolong Siki (𑒏𑒳𑒛𑒳𑒐)", "Ol Chiki", "Warang Citi", "Devanagari"],
            correct: 0,
            explanation: "Tolong Siki was invented in 1999 by Dr. Narayan Oraon and is officially recognized in Jharkhand and West Bengal."
        },
        {
            question: "What is the universal respectful greeting used in Kurukh acknowledging the Supreme Creator?",
            options: ["जय धरमे! (Jai Dharme!) / जोहार! (Johar!)", "नमस्ते (Namaste)", "Julley (ཇུ་ལེགས།)", "Chibai"],
            correct: 0,
            explanation: "'Jai Dharme!' (Glory to Dharmes) and 'Johar!' are the signature greetings in the Kurukh/Oraon community."
        },
        {
            question: "Which major spring festival of the Oraon celebrates the blossoming of the sacred Sal tree?",
            options: ["Sarhul (Kaddi)", "Diwali", "Pongal", "Bihu"],
            correct: 0,
            explanation: "Sarhul (Kaddi) is the foremost spring festival celebrating the flowering of the Sal tree and the bounty of Mother Earth."
        },
        {
            question: "What is the traditional indigenous youth educational institution of the Kurukh community?",
            options: ["Dhumkuria (Jonkh-Erpa)", "Gurukul", "Ghotul", "Tol"],
            correct: 0,
            explanation: "Dhumkuria is the traditional youth dormitory and cultural academy of the Oraon/Kurukh people."
        }
    ],

    sources: [
        {
            title: "Kurukh Grammar and Dictionary",
            author: "Ferdinand Hahn (1900) & Rev. A. Grignard (1924)",
            link: "https://en.wikipedia.org/wiki/Kurukh_language"
        },
        {
            title: "The Oraons of Chota Nagpur",
            author: "Sarat Chandra Roy (1915), Ranchi Tribal Research Institute",
            link: "https://archive.org/details/oraonsofchotanag00roysrich"
        },
        {
            title: "Tolong Siki Script Development & Kurukh Phonology",
            author: "Dr. Narayan Oraon (1999) & Kurukh Literary Society",
            link: "https://www.jstor.org/topic/kurukh-language"
        },
        {
            title: "UNESCO Atlas of the World's Languages in Danger",
            author: "UNESCO Endangered Languages Monitoring (ISO 639-3: kru)",
            link: "http://www.unesco.org/languages-atlas/"
        }
    ]
};

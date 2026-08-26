/**
 * Comprehensive Dataset for Malvi Language Explorer (Heart of Malwa Plateau)
 * Spoken in Madhya Pradesh (Ujjain, Indore, Ratlam, Dewas, Dhar, Mandsaur) and Rajasthan (Jhalawar) (ISO 639-3: mup).
 */

window.MALVI_DATA = {
    overview: {
        title: "Malvi Language Explorer",
        nativeName: "मालवी / 𑂧𑂰𑂪𑂫𑂲",
        endonym: "Mālvī / Malwi",
        romanization: "Malvi / Mālvī",
        family: "Indo-European ➔ Indo-Iranian ➔ Indo-Aryan ➔ Rajasthani-Malvi Subgroup (Western Indo-Aryan)",
        speakers: "approx. 16,000,000+ (Madhya Pradesh & Rajasthan)",
        primaryRegions: [
            "Malwa Plateau Heartland, MP (Ujjain, Indore, Dewas, Dhar, Khargone)",
            "Northern Malwa, MP (Ratlam, Mandsaur, Neemuch, Shajapur, Agar-Malwa)",
            "Southeastern Rajasthan Border (Jhalawar, Pratapgarh, Chittorgarh Border)",
            "Nimar & Bhopal Transition Zones"
        ],
        writingScripts: [
            "Devanagari (देवनागरी - Standardized official and literary script)",
            "Mahajani / Kaithi (Historical mercantile and revenue ledgers)"
        ],
        isoCode: "ISO 639-3: mup",
        greeting: "राम राम सा! / काईं हाल चाल है? (Ram Ram Sa! / Kayi haal chaal hai?)",
        description: "Malvi (मालवी / Mālvī) is a vibrant Western Indo-Aryan language spoken by over 16 million people across the fertile black-soil Malwa plateau of Madhya Pradesh and bordering Rajasthan. Renowned for its melodious intonations, rich folk theatre Maach (माच), colorful Sanjha folk art, Kabir bhajan musical heritage on the Tambura, and heartwarming culinary culture of Daal-Bafla."
    },

    genealogy: {
        root: "Proto-Indo-Aryan ➔ Shauraseni Apabhramsha",
        branch: "Indo-Aryan ➔ Western Indo-Aryan",
        subgroup: "Rajasthani-Malvi Cluster (Ujjaini, Rajawadi, Sondhwadi, Umthawadi dialects)",
        characteristics: [
            {
                title: "Distinctive Auxiliary 'छे / छा' (Chhe / Chha)",
                desc: "Uses the characteristic Western Indo-Aryan copula 'छे' (chhe - is) and 'छा' (chha - was), cognate with Rajasthani and Gujarati rather than Hindi's 'है / था'."
            },
            {
                title: "Melodic Pitch & Vocalic Elongation",
                desc: "Spoken with a gentle, polite lilt and elongated vowels at the end of sentences that convey deep hospitality and respect."
            },
            {
                title: "Rich Kinship & Reverence Terms",
                desc: "Extensive honorific suffixes ('सा' - Sa, 'जी' - Ji, 'भाया' - Bhaya) that permeate everyday casual interactions."
            },
            {
                title: "Transition Bridge Linguistics",
                desc: "Acts as a linguistic crossroads uniting Western Rajasthani, Marwari, Nimadi, and Central Indo-Aryan dialects."
            }
        ]
    },

    scripts: [
        {
            name: "Devanagari Script (देवनागरी लिपि)",
            status: "Standard Literary & Educational Script",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Mahakaleshwar_Temple_Ujjain.jpg/640px-Mahakaleshwar_Temple_Ujjain.jpg",
            desc: "Standardized writing system for Malvi poetry, folk collections, newspaper columns, and university dissertations.",
            example: "मालवा धरती गहन गंभीर, पग-पग रोटी डग-डग नीर।",
            translit: "Malwa dharti gahan gambhir, pag-pag roti dag-dag neer.",
            meaning: "Malwa's land is bountiful and deep: food at every step, sweet water at every pace."
        },
        {
            name: "Historical Mahajani & Kaithi (महाजनी लिपि)",
            status: "Historical Mercantile & Trade Records",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sacred_grove_India.jpg/640px-Sacred_grove_India.jpg",
            desc: "Used for centuries by traders and moneylenders across Ujjain, Indore, and Ratlam markets for rapid accounting and royal decrees.",
            example: "राम राम भाया, सब कुशल मंगल छे।",
            translit: "Ram Ram bhaya, sab kushal mangal chhe.",
            meaning: "Greetings brother, all is peaceful and prosperous."
        }
    ],

    regions: [
        {
            id: "heartland",
            name: "Malwa Heartland (Ujjain, Indore, Dewas & Dhar)",
            subRegions: ["Ujjain (Avanti)", "Indore", "Dewas", "Dhar (Mandu)", "Khargone"],
            speakers: "approx. 8,500,000",
            color: "#d97706",
            desc: "The spiritual and cultural core centered around the sacred Shipra river, Mahakaleshwar temple, historic Mandu fort, and Holkar heritage of Indore."
        },
        {
            id: "north-malwa",
            name: "North Malwa (Ratlam, Mandsaur & Neemuch)",
            subRegions: ["Ratlam", "Mandsaur (Pashupatinath)", "Neemuch", "Jaora", "Agar-Malwa"],
            speakers: "approx. 4,500,000",
            color: "#16a34a",
            desc: "Famous for the historic Pashupatinath temple, fertile poppy and wheat fields, Ratlami Sev food tradition, and Sondhwadi dialect."
        },
        {
            id: "rajasthan-border",
            name: "Southeastern Rajasthan Border (Jhalawar & Pratapgarh)",
            subRegions: ["Jhalawar", "Pirawa", "Aklera", "Pratapgarh Border"],
            speakers: "approx. 2,000,000",
            color: "#0284c7",
            desc: "Where Malvi blends seamlessly with Harauti and Hadoti dialects across the Gagron fort and Chandrabhaga river belt."
        },
        {
            id: "east-malwa",
            name: "East Malwa & Bhopal Fringe (Shajapur & Sehore)",
            subRegions: ["Shajapur", "Sehore", "Rajgarh (Biaora)", "Ashta"],
            speakers: "approx. 1,500,000",
            color: "#8b5cf6",
            desc: "The eastern agricultural plains where Malvi transitions towards Bundeli and standard Hindi."
        }
    ],

    greetings: [
        {
            id: "ram-ram-sa",
            category: "Universal Respectful Salutation",
            native: "राम राम सा! (Ram Ram Sa!)",
            transliteration: "Ram Ram Sa!",
            ipa: "[raːm raːm saː]",
            phonetic: "RAHM RAHM sah",
            meaning: "Divine greetings / Respectful hello to one and all",
            context: "The universal warm greeting used across all villages and towns of Malwa.",
            audioText: "Ram Ram Sa"
        },
        {
            id: "kayi-haal-hai",
            category: "Polite Well-Being Inquiry",
            native: "काईं हाल चाल है भाया? (Kayi haal chal hai?)",
            transliteration: "Kāīñ hāl chāl hai bhāyā?",
            ipa: "[kaːĩː haːl t͡ʃaːl hɛː bʱaːjaː]",
            phonetic: "KAH-een hahl chaal hai BHAH-yah",
            meaning: "How are you doing, brother? / How is life and health?",
            context: "Friendly and affectionate inquiry asked when meeting friends and neighbors.",
            audioText: "Kayi haal chaal hai bhaya"
        },
        {
            id: "badiya-chha",
            category: "Joyous Positive Reply",
            native: "सब बढ़िया छे, कृपा छे भगवान की! (Sab badiya chhe)",
            transliteration: "Sab baṛhiyā chhe, kripā chhe bhagwān kī!",
            ipa: "[səb bəɽʱɪjaː t͡ʃʰeː]",
            phonetic: "Sub buh-dhee-yah CHHAY",
            meaning: "Everything is wonderful, by God's blessings!",
            context: "Heartwarming standard reply confirming all is peaceful and prosperous.",
            audioText: "Sab badiya chhe"
        },
        {
            id: "aao-padharo",
            category: "Traditional Malwa Hospitality",
            native: "आओ पधारो सा! (Aao Padharo Sa!)",
            transliteration: "Āo padhāro sā!",
            ipa: "[aːoː pədʱaːroː saː]",
            phonetic: "AH-oh puh-DHAH-roh sah",
            meaning: "Welcome warmly into our home and hearth!",
            context: "Exclaimed when guests arrive at the doorstep before offering water and sweets.",
            audioText: "Aao padharo sa"
        },
        {
            id: "bhalu-kiyo",
            category: "Heartfelt Gratitude",
            native: "घणो भलू कियो सा! (Ghano bhalu kiyo sa!)",
            transliteration: "Ghaṇō bhalū kiyō sā!",
            ipa: "[ɡʱəɳoː bʱəluː kɪjoː saː]",
            phonetic: "GHAH-noh bhuh-LOO kee-yoh sah",
            meaning: "You did a wonderful kindness / Thank you very deeply",
            context: "Expressing genuine gratitude for help, hospitality, or good deeds.",
            audioText: "Ghano bhalu kiyo sa"
        }
    ],

    vocabulary: [
        {
            id: "paani",
            concept: "Water",
            native: "पाणी (Pāṇī)",
            transliteration: "Pāṇī",
            ipa: "/paːɳiː/",
            phonetic: "PAH-nee (with retroflex 'n')",
            meaning: "Water / Pure well & river water (Shipra / Chambal)",
            category: "Nature & Sustenance",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Jonha_Falls_Ranchi.jpg/640px-Jonha_Falls_Ranchi.jpg",
            notes: "Celebrated in the timeless proverb: 'मालवा धरती गहन गंभीर, डग-डग रोटी पग-पग नीर'."
        },
        {
            id: "daal-bafla",
            concept: "Daal Bafla (Staple Feast)",
            native: "दाल-बाफला (Dāl-Bāflā)",
            transliteration: "Dāl-Bāflā",
            ipa: "/daːl baːpʰlaː/",
            phonetic: "DAHL BAHF-lah",
            meaning: "Boiled and roasted wheat dumplings drenched in pure ghee",
            category: "Cuisine & Culture",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cooked_rice_bowl.jpg/640px-Cooked_rice_bowl.jpg",
            notes: "The quintessential festive feast of Malwa, served with spicy tuvar daal, laddu, and chutney."
        },
        {
            id: "suraj",
            concept: "Sun / Day",
            native: "सूरज / दहाड़ो (Sūraj / Dahāṛō)",
            transliteration: "Sūraj / Dahāṛō",
            ipa: "/suːrəd͡ʒ ~ dəɦaːɽoː/",
            phonetic: "SOO-ruhj / duh-HAH-doh",
            meaning: "Sun / Daylight / The whole day",
            category: "Nature & Time",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Sunrise_over_Netarhat_Jharkhand.jpg/640px-Sunrise_over_Netarhat_Jharkhand.jpg",
            notes: "'दहाड़ो' is the authentic Malvi word for daytime and daily agricultural labor."
        },
        {
            id: "chandrama",
            concept: "Moon / Night",
            native: "चन्द्रमा / रात (Chandramā / Rāt)",
            transliteration: "Chandramā / Rāt",
            ipa: "/t͡ʃənd̪rəmaː/",
            phonetic: "CHUN-druh-mah",
            meaning: "Moon / Nighttime glow over wheat fields",
            category: "Nature & Sky",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Full_Moon_Luc_Viatour.jpg/640px-Full_Moon_Luc_Viatour.jpg",
            notes: "Central to Sanjha folk rituals and evening open-air Maach theatre performances."
        },
        {
            id: "tapro",
            concept: "House / Homestead",
            native: "घर / टापरो (Ghar / Tāprō)",
            transliteration: "Ghar / Tāprō",
            ipa: "/ɡʱər ~ ʈaːproː/",
            phonetic: "TAHP-roh",
            meaning: "Traditional mud-plastered tiled roof house",
            category: "Homestead & Living",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leh_Old_Town_houses.jpg/640px-Leh_Old_Town_houses.jpg",
            notes: "Villages feature courtyards adorned with Sanjha paintings and open verandahs (Osari)."
        },
        {
            id: "dharti",
            concept: "Fertile Mother Earth",
            native: "धरती माता (Dhartī Mātā)",
            transliteration: "Dhartī Mātā",
            ipa: "/d̪ʱərt̪iː maːt̪aː/",
            phonetic: "DHAR-tee MAH-tah",
            meaning: "The rich black cotton soil (Regur) of the Malwa plateau",
            category: "Agriculture & Soil",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Chota_Nagpur_Plateau_Landscape.jpg/640px-Chota_Nagpur_Plateau_Landscape.jpg",
            notes: "Malwa's soil is renowned for yielding world-famous Sharbati wheat, soybean, and cotton."
        },
        {
            id: "khero",
            concept: "Village",
            native: "गाँव / खेड़ो (Gāñv / Khēṛō)",
            transliteration: "Gāñv / Khēṛō",
            ipa: "/ɡaːw̃ ~ kʰeːɽoː/",
            phonetic: "KHEH-doh",
            meaning: "Rural village community / Agricultural hamlet",
            category: "Community & Geography",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tribal_village_Jharkhand.jpg/640px-Tribal_village_Jharkhand.jpg",
            notes: "The center of collective celebrations, Chaupal discussions, and seasonal folk fairs."
        },
        {
            id: "dholak",
            concept: "Dholak & Chang Drums",
            native: "ढोलक / चंग (Ḍhōlak / Chaṅg)",
            transliteration: "Ḍhōlak / Chaṅg",
            ipa: "/ɖʱoːlək ~ t͡ʃəŋɡ/",
            phonetic: "DHOH-luhk / CHUNG",
            meaning: "Folk rhythm drums for Maach theatre and Kabir bhajans",
            category: "Music & Performing Arts",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mandar_drum_Jharkhand.jpg/640px-Mandar_drum_Jharkhand.jpg",
            notes: "Essential accompaniment to Nirguni bhajans and Holi festive dancing."
        },
        {
            id: "neem",
            concept: "Neem Tree / Flora",
            native: "झाड़ / नीम (Jhāṛ / Nīm)",
            transliteration: "Jhāṛ / Nīm",
            ipa: "/d͡ʒʱaːɽ ~ niːm/",
            phonetic: "JHAHD / NEEM",
            meaning: "Sacred medicinal neem tree in village squares",
            category: "Flora & Nature",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sal_Forest_Saranda.jpg/640px-Sal_Forest_Saranda.jpg",
            notes: "Provides cooling shade during hot summer afternoons where village elders gather."
        },
        {
            id: "bhaya",
            concept: "Brother / Dear Friend",
            native: "भाया / भाईजी (Bhāyā / Bhāījī)",
            transliteration: "Bhāyā / Bhāījī",
            ipa: "/bʱaːjaː/",
            phonetic: "BHAH-yah",
            meaning: "Brother / Dear companion / Friendly honorific",
            category: "Kinship & Social Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oraon_tribal_dance.jpg/640px-Oraon_tribal_dance.jpg",
            notes: "The most affectionately ubiquitous term used in conversational Malvi everywhere."
        },
        {
            id: "dhor",
            concept: "Cattle / Sacred Cow",
            native: "गाय / ढोर-डांगर (Gāy / Ḍhōr-Ḍāṅgar)",
            transliteration: "Gāy / Ḍhōr",
            ipa: "/ɡaːj ~ ɖʱoːr/",
            phonetic: "GAHY / DHOHR",
            meaning: "Cattle / Milk-giving cows / Livestock wealth",
            category: "Fauna & Rural Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Yak_in_Ladakh.jpg/640px-Yak_in_Ladakh.jpg",
            notes: "Revered as the foundation of agriculture and dairy in the Malwa countryside."
        },
        {
            id: "chokho",
            concept: "Good / Pure / Fine",
            native: "चोखो / मीठो (Chōkhō / Mīṭhō)",
            transliteration: "Chōkhō / Mīṭhō",
            ipa: "/t͡ʃoːkʰoː ~ miːʈʰoː/",
            phonetic: "CHOH-khoh / MEE-thoh",
            meaning: "Good / Excellent quality / Sweet and sincere",
            category: "Expressions & Adjectives",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hemis_Festival_Ladakh.jpg/640px-Hemis_Festival_Ladakh.jpg",
            notes: "Used to describe everything from a delicious sweet to a pure-hearted human being."
        }
    ],

    culturalHeritage: [
        {
            title: "Maach Folk Theatre (माच)",
            category: "Traditional Performing Arts",
            icon: "🎭",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Mahakaleshwar_Temple_Ujjain.jpg/640px-Mahakaleshwar_Temple_Ujjain.jpg",
            imageCredit: "Maach Folk Theatre of Malwa (Wikimedia Commons)",
            content: "Originating in Ujjain over 200 years ago, Maach is an open-air musical theatre performed on a high wooden stage (Manch). Combining operatic songs, rhythmic dholak beats, dialogues in lyrical Malvi verse, and colorful mythological or historical narratives."
        },
        {
            title: "Sanjha Folk Wall Art (सांझा)",
            category: "Traditional Visual Arts",
            icon: "🎨",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sacred_grove_India.jpg/640px-Sacred_grove_India.jpg",
            imageCredit: "Sanjha Folk Art of Malwa (Wikimedia Commons)",
            content: "During the 16 days of Pitru Paksha, unmarried girls create exquisite geometric wall reliefs using fresh clay and cow dung, decorated with bright marigold petals and colored foil, singing melodious Sanjha folk songs every evening at dusk."
        },
        {
            title: "Kabir Vani & Nirgun Bhajan Heritage",
            category: "Musical Traditions",
            icon: "🪕",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Thiksey_Monastery_Ladakh_India.jpg/640px-Thiksey_Monastery_Ladakh_India.jpg",
            imageCredit: "Malwa Kabir Bhajan Tradition (Wikimedia Commons)",
            content: "Malwa is home to a world-renowned oral tradition of Kabir and Gorakhnath Nirguni bhajans. Mastered on the acoustic Tambura, Manjira, and Dholak by legends like Padma Shri Prahlad Singh Tipanya, uniting spiritual depth with simple folk idioms."
        },
        {
            title: "Daal-Bafla & Malwa Culinary Warmth",
            category: "Food Culture & Hospitality",
            icon: "🍲",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cooked_rice_bowl.jpg/640px-Cooked_rice_bowl.jpg",
            imageCredit: "Malwa Food Traditions (Wikimedia Commons)",
            content: "The iconic cuisine of Malwa revolves around Daal-Bafla, spicy Dal-Paniya, Bhutte Ka Kees, and Ratlami Sev. Food is served with immense generosity under the age-old motto that no guest ever leaves a Malwi threshold without a feast."
        }
    ],

    quizQuestions: [
        {
            question: "To which language subgroup does the Malvi language belong?",
            options: [
                "Indo-Aryan ➔ Rajasthani-Malvi Subgroup (Western Indo-Aryan)",
                "Dravidian family",
                "Austroasiatic family",
                "Tibeto-Burman family"
            ],
            correct: 0,
            explanation: "Malvi is a Western Indo-Aryan language closely related to Rajasthani, spoken across the Malwa plateau."
        },
        {
            question: "What is the famous traditional open-air folk theatre of Malwa performed on high wooden stages?",
            options: ["Maach (माच)", "Kathakali", "Nautanki", "Yakshagana"],
            correct: 0,
            explanation: "Maach (from Sanskrit 'Manch') is the iconic 200-year-old musical folk theatre of the Malwa region."
        },
        {
            question: "What is the universal respectful greeting used throughout the Malwa region?",
            options: ["राम राम सा! (Ram Ram Sa!)", "Julley", "Johar", "Vanakkam"],
            correct: 0,
            explanation: "'Ram Ram Sa!' is the traditional universal greeting of respect and goodwill in Malwa."
        },
        {
            question: "What distinctive auxiliary copula is characteristic of Malvi instead of Hindi's 'है / था'?",
            options: ["छे / छा (Chhe / Chha)", "आहे (Aahe)", "आछे (Aachhe)", "हुई (Hui)"],
            correct: 0,
            explanation: "Malvi characteristically uses 'छे' (chhe - is) and 'छा' (chha - was), reflecting its Western Indo-Aryan heritage."
        },
        {
            question: "What sacred river and city in Malwa is the historic heart of its literature and Maach theatre?",
            options: [
                "Shipra River and Ujjain (Avanti)",
                "Yamuna River and Agra",
                "Hooghly River and Kolkata",
                "Godavari River and Nashik"
            ],
            correct: 0,
            explanation: "Ujjain along the holy Shipra river has been the historical epicenter of Malwa literature, religion, and Maach theatre."
        }
    ],

    sources: [
        {
            title: "Linguistic Survey of India: Malvi and Rajasthani Dialects",
            author: "Sir George A. Grierson (1908), Vol. IX, Part II",
            link: "https://en.wikipedia.org/wiki/Malvi_language"
        },
        {
            title: "Malvi Bhasha aur Sahitya Ka Itihas",
            author: "Dr. Chintamani Upadhyay & Dr. Shyam Parmar (1972)",
            link: "https://archive.org/details/malvi-sahitya"
        },
        {
            title: "Maach: The Folk Theatre of Madhya Pradesh",
            author: "Madhya Pradesh Adivasi Lok Kala Parishad, Bhopal",
            link: "https://mptourism.com/culture-of-madhya-pradesh.html"
        },
        {
            title: "UNESCO Atlas of the World's Languages in Danger",
            author: "UNESCO Language Monitoring (ISO 639-3: mup)",
            link: "http://www.unesco.org/languages-atlas/"
        }
    ]
};

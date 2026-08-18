/**
 * Comprehensive Dataset for Ladakhi Language Explorer (Languages of Ladakh)
 * Spoken across Ladakh (Leh, Kargil, Nubra Valley, Changthang, Zanskar).
 */

window.LADAKHI_DATA = {
    overview: {
        title: "Ladakhi Language Explorer",
        nativeName: "ལ་དྭགས་སྐད།",
        nativeAlternate: "བྷོ་ཊི། (Bhoti)",
        romanization: "La-dwags skad / Ladakhi",
        family: "Sino-Tibetan ➔ Tibeto-Burman ➔ Bodish ➔ Western Archaic Tibetan",
        speakers: "approx. 300,000+ (Ladakh, Himalayan borderlands & Diaspora)",
        primaryRegions: ["Leh District (Central Ladakh)", "Nubra Valley", "Changthang Plateau", "Zanskar Valley", "Kargil (Purik border)"],
        writingScripts: ["Tibetan Uchen (དབུ་ཅན། - Headed formal script)", "Tibetan Yuged/Ume (དབུ་མེད། - Cursive script)"],
        isoCode: "ISO 639-3: lbj",
        greeting: "ཇུ་ལེགས། (Julley / Ju-leh)",
        description: "Ladakhi (ལ་དྭགས་སྐད།) is a celebrated Western Archaic Tibetic language spoken in the high Himalayan plateau of Ladakh. Renowned for preserving ancient 7th-century Old Tibetan consonant prefixes and clusters lost in modern Central Tibetan, Ladakhi embodies the spiritual, oral, and literary heritage of monasteries, the epic of King Gesar, and centuries of Silk Road trade."
    },

    genealogy: {
        root: "Proto-Sino-Tibetan",
        branch: "Tibeto-Burman ➔ Bodish",
        subgroup: "Western Archaic Tibetan (Ladakhi-Balti-Purik cluster)",
        characteristics: [
            {
                title: "Preservation of Archaic Consonants",
                desc: "Ladakhi preserves Old Tibetan prefixes and consonant clusters (like 'br-', 'st-', 'zl-', 'rg-') which became silent or evolved into tone contours in Lhasa Tibetan."
            },
            {
                title: "Non-Tonal / Pitch Accent System",
                desc: "Unlike Central Tibetan which relies on complex high/low tone systems, Ladakhi is non-tonal or governed by melodic pitch accents, making pronunciation closer to ancient liturgical texts."
            },
            {
                title: "Honorific Register (Zhe-sa)",
                desc: "Speech employs rich honorific vocabulary (Zhe-sa) to show reverence toward elders, monks, and guests (e.g., 'Don' vs standard 'Za' for eating)."
            },
            {
                title: "Ergative Case Marking",
                desc: "Subject nouns in transitive sentences are marked by the instrumental-ergative particle ('-is' / '-gyis'), reflecting classic Tibeto-Burman syntax."
            }
        ]
    },

    scripts: [
        {
            name: "Tibetan Uchen Script (དབུ་ཅན།)",
            status: "Primary Formal & Printed Script",
            desc: "Meaning 'with a head', Uchen is the classical block script used for Buddhist scriptures (Kangyur & Tengyur), school textbooks, monastery inscriptions, and official signboards across Ladakh.",
            example: "ལ་དྭགས་སྐད་ཁམས་བཟང་ཡོད།",
            translit: "La-dwags skad khams-bzang yod.",
            meaning: "The Ladakhi language is well and thriving."
        },
        {
            name: "Tibetan Yuged / Ume Script (དབུ་མེད།)",
            status: "Cursive & Administrative Script",
            desc: "Meaning 'headless', Yuged is the flowing cursive handwriting tradition historically used by Ladakhi scribes, local administrators, poets, and monastery ledgers.",
            example: "ཇུ་ལེགས་ཚང་མ།",
            translit: "Ju-leh tshang-ma.",
            meaning: "Warm greetings to everyone."
        }
    ],

    regions: [
        {
            id: "central",
            name: "Central Ladakh & Leh (Shamskat)",
            subRegions: ["Leh City", "Shey", "Thiksey", "Hemis", "Basgo", "Alchi"],
            speakers: "approx. 140,000",
            color: "#eab308",
            desc: "The cultural and administrative heartland along the Indus Valley. Central Ladakhi (Shamskat) is the prestige dialect used in education, broadcasting, and regional literature."
        },
        {
            id: "nubra",
            name: "Nubra Valley (Nubra-skat)",
            subRegions: ["Diskit", "Hunder", "Panamik", "Sumur"],
            speakers: "approx. 45,000",
            color: "#06b6d4",
            desc: "Spoken along the Shyok and Siachen river valleys where double-humped Bactrian camels roam. Features distinctive vowel intonations and close ties to Balti."
        },
        {
            id: "changthang",
            name: "Changthang High Plateau (Stotskat)",
            subRegions: ["Nyoma", "Hanle", "Pangong Tso", "Korzok / Tso Moriri"],
            speakers: "approx. 35,000",
            color: "#10b981",
            desc: "Spoken by the nomadic Changpa pastoralists at altitudes above 4,500m who rear the famous Changthangi Pashmina goats and preserve ancient nomadic idioms."
        },
        {
            id: "zanskar",
            name: "Zanskar Valley (Zanskari)",
            subRegions: ["Padum", "Karsha", "Zangla", "Rangdum"],
            speakers: "approx. 25,000",
            color: "#ec4899",
            desc: "Nestled between the Great Himalayan and Zanskar ranges. Zanskari preserves archaic grammatical endings and unique Buddhist liturgical vocabulary."
        },
        {
            id: "kargil",
            name: "Lower Ladakh & Purik Border",
            subRegions: ["Kargil Town", "Sankoo", "Drass", "Wakha-Mulbekh"],
            speakers: "approx. 55,000",
            color: "#8b5cf6",
            desc: "Where Ladakhi transitions into Purik and Balti, showcasing centuries of harmonious cultural and linguistic synthesis."
        }
    ],

    greetings: [
        {
            id: "julley",
            category: "Universal Respectful Greeting",
            native: "ཇུ་ལེགས།",
            transliteration: "Julley / Ju-leh",
            ipa: "[d͡ʑu.leː]",
            phonetic: "JOO-lay",
            meaning: "Hello / Greetings / Welcome / Thank you / Goodbye",
            context: "The all-encompassing signature Ladakhi greeting expressing goodwill, humility, and warmth across all generations.",
            audioText: "Julley"
        },
        {
            id: "khamzang",
            category: "Well-Being Inquiry",
            native: "ཁམས་བཟང་ཡིན་ནམ།",
            transliteration: "Khamzang yin-nam?",
            ipa: "[kʰam.zaŋ jin.nam]",
            phonetic: "KHAHM-zahng yin-nahm",
            meaning: "How are you? / Are you in good health?",
            context: "Friendly and caring inquiry exchanged between friends, relatives, and travelers.",
            audioText: "Khamzang yin nam"
        },
        {
            id: "sku-khamzang",
            category: "Formal / Honorific Greeting",
            native: "སྐུ་ཁམས་བཟང་པོ་ཡིན་ནམ།",
            transliteration: "Sku-khams bzang-po yin-nam?",
            ipa: "[sku.kʰam.zaŋ.po jin.nam]",
            phonetic: "SKOO-khahm zahng-poh yin-nahm",
            meaning: "Are you in excellent health and spirit? (Honorific)",
            context: "Used to address monks (Lamas), elders, teachers, and dignitaries with profound reverence.",
            audioText: "Sku khams bzang po yin nam"
        },
        {
            id: "thukjeche",
            category: "Gratitude & Thanks",
            native: "ཐུགས་རྗེ་ཆེ།",
            transliteration: "Thuk-je-che / Thug-rje-che",
            ipa: "[tʰuɡ.r̥d͡ʑe.t͡ɕʰe]",
            phonetic: "TOOK-jay-chay",
            meaning: "Thank you very much / Deep gratitude",
            context: "Literally translates to 'Great Compassion'—acknowledging kindness and generous hospitality.",
            audioText: "Thuk je che"
        },
        {
            id: "kaler-phebs",
            category: "Farewell to Departing Person",
            native: "ག་ལེར་ཕེབས།",
            transliteration: "Kaler phebs / Ga-ler phebs",
            ipa: "[ɡa.ler pʰeps]",
            phonetic: "GAH-layr pheb",
            meaning: "Go safely and peacefully (Bon Voyage)",
            context: "Said by the host wishing safe travels over mountain passes to departing visitors.",
            audioText: "Ga ler phebs"
        },
        {
            id: "kaler-zhuks",
            category: "Farewell to Staying Host",
            native: "ག་ལེར་བཞུགས།",
            transliteration: "Kaler zhuks / Ga-ler bzhugs",
            ipa: "[ɡa.ler ʒuks]",
            phonetic: "GAH-layr zhook",
            meaning: "Stay in peace and tranquility",
            context: "Said by the guest to the host who remains at home.",
            audioText: "Ga ler bzhugs"
        }
    ],

    vocabulary: [
        {
            id: "chhu",
            concept: "Water",
            native: "ཆུ།",
            transliteration: "Chhu",
            ipa: "/t͡ɕʰu/",
            phonetic: "CHHOO",
            meaning: "Water / Natural glacial stream water",
            category: "Nature & Elements",
            notes: "Direct preservation of the core Tibetic root for mountain meltwater, vital for desert oases."
        },
        {
            id: "ri",
            concept: "Mountain",
            native: "རི།",
            transliteration: "Ri",
            ipa: "/ri/",
            phonetic: "REE",
            meaning: "Mountain / Himalayan peak",
            category: "Nature & Elements",
            notes: "Refers to both mountain ridges and sacred peaks like Stok Kangri and Nun-Kun."
        },
        {
            id: "nyima",
            concept: "Sun / Day",
            native: "ཉི་མ།",
            transliteration: "Nyi-ma",
            ipa: "/ɲi.ma/",
            phonetic: "NYEE-mah",
            meaning: "Sun / Daylight / Day",
            category: "Nature & Elements",
            notes: "Symbol of boundless warmth in Ladakh's high-altitude cold desert environment."
        },
        {
            id: "zlawa",
            concept: "Moon / Month",
            native: "ཟླ་བ།",
            transliteration: "Zla-ba / Dawa",
            ipa: "/zla.wa ~ da.wa/",
            phonetic: "ZLAH-wah (Arch.) / DAH-wah",
            meaning: "Moon / Calendar month",
            category: "Nature & Elements",
            notes: "Archaic speakers preserve the initial 'zl-' cluster; governs Losar and monastic lunar dates."
        },
        {
            id: "me",
            concept: "Fire / Hearth",
            native: "མེ།",
            transliteration: "Me",
            ipa: "/me/",
            phonetic: "MAY",
            meaning: "Fire / Hearth fire / Warmth",
            category: "Home & Life",
            notes: "Central to the traditional Bukhari stove warming Ladakhi living rooms during sub-zero winters."
        },
        {
            id: "lam",
            concept: "Path / Pass",
            native: "ལམ།",
            transliteration: "Lam",
            ipa: "/lam/",
            phonetic: "LAHM",
            meaning: "Road / Path / High mountain pass",
            category: "Geography",
            notes: "The root in 'La' (pass), as in Khardung La, Chang La, and Ladakh ('Land of High Passes')."
        },
        {
            id: "khangpa",
            concept: "House",
            native: "ཁང་པ།",
            transliteration: "Khang-pa",
            ipa: "/kʰaŋ.pa/",
            phonetic: "KHAHNG-pah",
            meaning: "House / Traditional mud-brick homestead",
            category: "Home & Life",
            notes: "Constructed with sun-dried adobe mud bricks with timber ceilings and insulating flat roofs."
        },
        {
            id: "gyak",
            concept: "Yak",
            native: "གཡག",
            transliteration: "Gyak / Yak",
            ipa: "/jaʔ ~ ɡjak/",
            phonetic: "YAHK / GYAHK",
            meaning: "Tibetan Yak (Bos grunniens)",
            category: "Fauna & Pastoralism",
            notes: "The lifeline of Changthang pastoralists, providing transport, wool, butter, and cheese (Chhurpi)."
        },
        {
            id: "cha",
            concept: "Butter Tea",
            native: "ཇ། / གུར་གུར་ཇ།",
            transliteration: "Cha / Gur-Gur Cha",
            ipa: "/t͡ɕa ~ ɡur.ɡur t͡ɕa/",
            phonetic: "CHAH / GOOR-goor chah",
            meaning: "Traditional salted yak-butter tea",
            category: "Cuisine & Culture",
            notes: "Churned in a wooden cylindrical churner (Gur-Gur) with tea leaves, yak butter, and salt."
        },
        {
            id: "lhakhang",
            concept: "Monastery Temple",
            native: "ལྷ་ཁང།",
            transliteration: "Lha-khang",
            ipa: "/l̥a.kʰaŋ/",
            phonetic: "HLA-khahng",
            meaning: "Temple / Shrine room / Abode of Deities",
            category: "Spiritual Heritage",
            notes: "The sanctum sanctorum within ancient monasteries like Alchi, Thiksey, Diskit, and Hemis."
        },
        {
            id: "tsampa",
            concept: "Roasted Barley Flour",
            native: "རྩམ་པ།",
            transliteration: "Tsampa / Rtsam-pa",
            ipa: "/tsam.pa/",
            phonetic: "TSAHM-pah",
            meaning: "Roasted barley flour staple food",
            category: "Cuisine & Culture",
            notes: "The universal staple energy food of the Himalayas, eaten mixed with butter tea or cheese."
        },
        {
            id: "gamo",
            concept: "Happy / Joyous",
            native: "དགའ་མོ།",
            transliteration: "Gamo / Dga-mo",
            ipa: "/ɡa.mo/",
            phonetic: "GAH-moh",
            meaning: "Happy / Pleased / Joyous",
            category: "Emotions & Expressions",
            notes: "Used in celebratory poetry and folk songs during Losar and harvest festivals."
        }
    ],

    culturalHeritage: [
        {
            title: "Epic of King Gesar (གེ་སར་རྒྱལ་པོ།)",
            category: "Oral & Epic Literature",
            icon: "⚔️",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gesar_of_Ling_Thangka.jpg/440px-Gesar_of_Ling_Thangka.jpg",
            imageCredit: "Gesar of Ling Thangka (Wikimedia Commons)",
            content: "The Gesar Epic is an ancient oral saga recounting the heroic deeds of King Gesar. In Ladakh, traditional bards (Gesar singers) recite poetic verses and sing epic episodes for days during long winter nights, accompanied by the Daman and Surna."
        },
        {
            title: "Monastery & Woodblock Literature",
            category: "Sacred Manuscripts & Printing",
            icon: "📜",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Thiksey_Monastery_Ladakh_India.jpg/640px-Thiksey_Monastery_Ladakh_India.jpg",
            imageCredit: "Thiksey Monastery Library (Wikimedia Commons)",
            content: "Ladakh's ancient Gompas (Thiksey, Hemis, Alchi, Lamayuru) preserve thousands of sacred Pothi manuscripts printed with hand-carved wooden xylograph blocks, safeguarding Buddhist philosophy, medicine (Sowa Rigpa), and astronomy."
        },
        {
            title: "Losar & Folk Song Traditions (Lu)",
            category: "Festivals & Music",
            icon: "🎉",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hemis_Festival_Ladakh.jpg/640px-Hemis_Festival_Ladakh.jpg",
            imageCredit: "Hemis Cham Dance & Festival (Wikimedia Commons)",
            content: "Losar marks the Ladakhi New Year with butter lamps, symbolic flour paintings on kitchen walls, and community Lu folk songs. Royal classical dances like the Shondol celebrate unity and harvest blessings."
        },
        {
            title: "Sowa-Rigpa Traditional Medicine",
            category: "Traditional Science & Knowledge",
            icon: "🌿",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Himalayan_medicinal_herbs_Ladakh.jpg/640px-Himalayan_medicinal_herbs_Ladakh.jpg",
            imageCredit: "Himalayan Medicinal Flora in Ladakh (Wikimedia Commons)",
            content: "The Amchi tradition of Sowa-Rigpa (the science of healing) uses hundreds of high-altitude Himalayan medicinal herbs cataloged in classical Ladakhi and Bodhi medical treatises."
        }
    ],

    quizQuestions: [
        {
            question: "What is the universal respectful greeting used throughout Ladakh?",
            options: ["ཇུ་ལེགས། (Julley!)", "नमस्ते (Namaste)", "வணக்கம் (Vanakkam)", "خدا حافظ (Khuda Hafiz)"],
            correct: 0,
            explanation: "Julley (ཇུ་ལེགས།) is the signature greeting in Ladakh meaning Hello, Welcome, Thank You, and Goodbye."
        },
        {
            question: "Why is Ladakhi considered a 'Western Archaic Tibetan' language?",
            options: [
                "It preserves 7th-century Old Tibetan consonant clusters like 'br-', 'st-', and 'zl-'",
                "It was invented in 1947",
                "It uses Latin script exclusively",
                "It has no vowels"
            ],
            correct: 0,
            explanation: "Ladakhi retains ancient Old Tibetan prefixes and consonant clusters that were lost or evolved into tones in Central Tibetan."
        },
        {
            question: "Which classical script is primarily used for formal printing and religious texts in Ladakh?",
            options: ["Tibetan Uchen (དབུ་ཅན།)", "Devanagari", "Brahmi", "Sharada"],
            correct: 0,
            explanation: "Tibetan Uchen (headed script) is the primary script used for Buddhist scriptures, books, and formal signs in Ladakh."
        },
        {
            question: "What does the word 'Ladakh' (La-dwags) literally mean?",
            options: ["Land of High Mountain Passes", "Land of Cold Deserts", "Valley of Monasteries", "River of Glaciers"],
            correct: 0,
            explanation: "'La' means mountain pass, making Ladakh literally 'Land of High Mountain Passes'."
        },
        {
            question: "What is the famous traditional epic recited by Ladakhi bards during winter nights?",
            options: ["The Epic of King Gesar", "The Odyssey", "Mahabharata", "Silappadikaram"],
            correct: 0,
            explanation: "The Epic of King Gesar is the revered oral epic tradition of Ladakh and the greater Himalayan region."
        }
    ],

    sources: [
        {
            title: "Grammar of the Ladakhi Language",
            author: "A. H. Francke (1901) & Central Institute of Indian Languages (CIIL)",
            link: "https://en.wikipedia.org/wiki/Ladakhi_language"
        },
        {
            title: "Ladakhi Phonology and Grammar Studies",
            author: "Bettina Zeisler (2004) & Sanyukta Koshal (1979)",
            link: "https://www.jstor.org/topic/ladakhi-language"
        },
        {
            title: "UNESCO Atlas of the World's Languages in Danger",
            author: "UNESCO Linguistic Diversity Monitoring",
            link: "http://www.unesco.org/languages-atlas/"
        },
        {
            title: "Himalayan Languages Project & Tibetan Dialectology",
            author: "Nicolas Tournadre & Roland Bielmeier",
            link: "https://en.wikipedia.org/wiki/Tibetic_languages"
        }
    ]
};

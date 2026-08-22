/**
 * Comprehensive Dataset for Ho Language Explorer (Kolhan & Mayurbhanj Regions)
 * Spoken by the Ho tribal community (ISO 639-3: hoc).
 */

window.HO_DATA = {
    overview: {
        title: "Ho Language Explorer",
        nativeName: "𑢹𑣉𑣉 𑣎𑣋𑣜 / हो जागर",
        endonym: "Hō Jagar / Ho",
        romanization: "Ho / Hō",
        family: "Austroasiatic ➔ Munda ➔ North Munda (Kherwarian Subgroup)",
        speakers: "approx. 1,400,000+ (Jharkhand, Odisha, West Bengal, Bihar)",
        primaryRegions: [
            "Kolhan Division, Jharkhand (West Singhbhum, Chaibasa, Saraikela, East Singhbhum)",
            "Mayurbhanj District, Odisha (Baripada, Rairangpur)",
            "Keonjhar District, Odisha",
            "Jhargram & Paschim Medinipur, West Bengal"
        ],
        writingScripts: [
            "Warang Citi (𑢹𑣗𑣜𑣊 𑣏𑣂𑣕𑣂 - Invented by scholar Lako Bodra, c. 1940s-1950s)",
            "Devanagari (हो - Widely used in publishing in Jharkhand)",
            "Odia Script (ହୋ - Extensively used in Mayurbhanj & Keonjhar)",
            "Latin / Roman Script (Linguistic documentation)"
        ],
        isoCode: "ISO 639-3: hoc",
        greeting: "𑢺𑣉𑣖𑣜 / जोहार! (Johar! / Juar!)",
        description: "Ho (𑢹𑣉𑣉 𑣎𑣋𑣜 / Hō Jagar) is an ancient Austroasiatic language of the North Munda group, spoken by over 1.4 million Ho people primarily in the mineral-rich Kolhan division of Jharkhand and Mayurbhanj in Odisha. Celebrated for its unique indigenous alphabet Warang Citi, deep veneration of Singbonga, agricultural festivals like Mage Porob and Baha Porob, and the historic Manki-Munda traditional governance system."
    },

    genealogy: {
        root: "Proto-Austroasiatic",
        branch: "Munda ➔ North Munda",
        subgroup: "Kherwarian Subgroup (Ho-Mundari-Santali Cluster)",
        characteristics: [
            {
                title: "Glottal & Checked Consonants",
                desc: "Ho features distinctive checked consonants / glottal stops (written with 'Orom' 𑣹 in Warang Citi and 'ः' in Devanagari) at the end of words like Da' (water) and Owa' (house)."
            },
            {
                title: "Warang Citi Alphabet System",
                desc: "Unlike Indic abugidas, Warang Citi is a true alphabet system where vowels and consonants are written as distinct independent linear letters, created by community reformer Lako Bodra."
            },
            {
                title: "Complex Agglutinative Morphology",
                desc: "Verbs incorporate subject, direct object, indirect object, tense, and mood inflections into a single multi-morphemic word unit."
            },
            {
                title: "Inclusive vs. Exclusive First Person",
                desc: "Distinguishes between inclusive 'we' (Abu / Abua' - including the listener) and exclusive 'we' (Ale / Aleya' - excluding the listener), common to Austroasiatic tongues."
            }
        ]
    },

    scripts: [
        {
            name: "Warang Citi Script (𑢹𑣗𑣜𑣊 𑣏𑣂𑣕𑣂)",
            status: "Official Indigenous Alphabet (Unicode standard)",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Warang_Citi_script_sample.png/640px-Warang_Citi_script_sample.png",
            desc: "Designed by scholar-philosopher Lako Bodra (Ot Guru Kol Lako Bodra) in the mid-20th century to provide a dedicated alphabet for Ho literature. Taught in Kolhan University and cultural academies across Jharkhand and Odisha.",
            example: "𑢹𑣉𑣉 𑣎𑣋𑣜 𑢶𑣕𑣦 𑢵𑣂𑣞𑣰𑣖 𑢷𑣂𑣊𑣂 𑢠𑣉𑣊𑣋",
            translit: "Ho jagar ote disum Singi bonga",
            meaning: "The Ho language, Mother Earth, and the Supreme Creator Singbonga."
        },
        {
            name: "Devanagari Script (देवनागरी)",
            status: "Commonly Used Print Script in Jharkhand",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Ho_language_book_cover.jpg/640px-Ho_language_book_cover.jpg",
            desc: "Standardized with modified characters to denote checked consonants (e.g. दाः for water and ओवाः for house) for school textbooks, dictionaries, and regional publications in Jharkhand.",
            example: "हो जागर आबुवाः जानम अड़ांः तनाः।",
            translit: "Ho jagar abuwa' janam aṛā' tanā'.",
            meaning: "The Ho language is our sacred mother tongue."
        }
    ],

    regions: [
        {
            id: "kolhan",
            name: "Kolhan Division & Singhbhum (Jharkhand)",
            subRegions: ["Chaibasa", "Saraikela", "Kharsawan", "Jamshedpur / East Singhbhum", "Noamundi"],
            speakers: "approx. 900,000",
            color: "#d97706",
            desc: "The historical heartland of the Ho nation (Kolhan). Famous for the historic Manki-Munda traditional governance, Saranda Sal forest, and Kolhan University's Ho department."
        },
        {
            id: "mayurbhanj",
            name: "Mayurbhanj & Simlipal Belt (Odisha)",
            subRegions: ["Baripada", "Rairangpur", "Karanjia", "Simlipal Hills"],
            speakers: "approx. 350,000",
            color: "#16a34a",
            desc: "Spoken extensively in the northern valleys of Odisha surrounding the Simlipal Biosphere, where Warang Citi literacy societies and Mage Porob celebrations thrive."
        },
        {
            id: "keonjhar",
            name: "Keonjhar Plateau (Odisha)",
            subRegions: ["Keonjhar Town", "Champua", "Joda", "Barbil"],
            speakers: "approx. 150,000",
            color: "#0284c7",
            desc: "A rich cultural region of Ho agricultural communities, traditional copper-working lore, and sacred Jaher groves."
        },
        {
            id: "bengal-border",
            name: "Jhargram & Bengal Borderlands",
            subRegions: ["Jhargram", "Gopiballavpur", "Medinipur Border"],
            speakers: "approx. 50,000",
            color: "#8b5cf6",
            desc: "Communities residing along the Subarnarekha river basin preserving ancient oral folklore and agricultural songs."
        }
    ],

    greetings: [
        {
            id: "johar",
            category: "Universal Reverence & Greeting",
            native: "𑢺𑣉𑣖𑣜 / जोहार! (Juar!)",
            transliteration: "Johar! / Juar!",
            ipa: "[d͡ʒoːɦaːr / d͡ʒuaːr]",
            phonetic: "JOH-haar",
            meaning: "Heartfelt Greetings / Welcome / Respect to Nature and Life",
            context: "The universal greeting of unity, respect, and mutual brotherhood across the Ho community.",
            audioText: "Johar"
        },
        {
            id: "mar-johar",
            category: "Traditional Warm Salutation",
            native: "𑢖𑣰𑣜 𑢺𑣉𑣖𑣜 / मार जोहार!",
            transliteration: "Mār Jōhār! / Mar Johar",
            ipa: "[maːr d͡ʒoːɦaːr]",
            phonetic: "MAHR JOH-haar",
            meaning: "Greetings with utmost warmth and affection!",
            context: "Hearty exchange when welcoming guests into a Ho courtyard or community gathering.",
            audioText: "Mar Johar"
        },
        {
            id: "chilkan-menama",
            category: "Well-Being Inquiry",
            native: "𑣏𑣂𑣚𑣌𑣗𑣝 𑣖𑣦𑣓𑣗𑣖𑣗? / चिल्कान मेनामा?",
            transliteration: "Chilkān menāma?",
            ipa: "[t͡ʃilkaːn meːnaːma]",
            phonetic: "CHIL-kahn may-nah-mah",
            meaning: "How are you? / Are you in good health and spirit?",
            context: "Friendly inquiry exchanged among friends and community members.",
            audioText: "Chilkan menama"
        },
        {
            id: "bugite-menana",
            category: "Joyous Positive Reply",
            native: "𑣠𑣰𑣋𑣂𑣕𑣦 𑣋𑣦 𑣖𑣦𑣓𑣗𑣓 / बुगीते गे मेनाञ",
            transliteration: "Bugītē gē menāña",
            ipa: "[buɡiːteː ɡeː meːnaːɲa]",
            phonetic: "BOO-gee-tay gay may-nahn-ya",
            meaning: "I am doing very well! / Everything is in harmony.",
            context: "Standard joyous reply affirming personal and family well-being.",
            audioText: "Bugite ge menana"
        },
        {
            id: "mage-johar",
            category: "Festival Seasonal Blessing",
            native: "𑢖𑣋𑣦 𑢺𑣉𑣖𑣜 / मागे जोहार!",
            transliteration: "Mage Johar! / Mage Juar!",
            ipa: "[maːɡeː d͡ʒoːɦaːr]",
            phonetic: "MAH-gay JOH-haar",
            meaning: "Happy Mage Festival! / May the harvest season bless you.",
            context: "Special greeting during the grand winter harvest celebration of Mage Porob.",
            audioText: "Mage Johar"
        }
    ],

    vocabulary: [
        {
            id: "dah",
            concept: "Water",
            native: "𑢵𑣁𑣹 / दाः",
            transliteration: "Da' / Dah",
            ipa: "/daʔ/",
            phonetic: "DAH (with glottal stop)",
            meaning: "Water / Pure drinking & mountain spring water",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Jonha_Falls_Ranchi.jpg/640px-Jonha_Falls_Ranchi.jpg",
            notes: "The universal North Munda root for water, featuring the final glottal checked sound."
        },
        {
            id: "mandi",
            concept: "Cooked Rice / Meal",
            native: "𑢖𑣝𑣛𑣂 / मांडी",
            transliteration: "Maṇḍī",
            ipa: "/mənɖiː/",
            phonetic: "MAHN-dee",
            meaning: "Cooked rice / Main staple food",
            category: "Food & Sustenance",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cooked_rice_bowl.jpg/640px-Cooked_rice_bowl.jpg",
            notes: "The central grain of Ho agriculture, harvested in autumn and offered in festival feasts."
        },
        {
            id: "singi",
            concept: "Sun / Daylight",
            native: "𑢷𑣂𑣊𑣂 / सिंगी",
            transliteration: "Singi",
            ipa: "/siŋi/",
            phonetic: "SING-ee",
            meaning: "Sun / Daylight / Solar energy",
            category: "Nature & Spiritual Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Sunrise_over_Netarhat_Jharkhand.jpg/640px-Sunrise_over_Netarhat_Jharkhand.jpg",
            notes: "Root of 'Singbonga', the supreme radiant creator deity of the Munda and Ho pantheon."
        },
        {
            id: "chandu",
            concept: "Moon / Month",
            native: "𑣏𑣝𑣛𑣰𑣹 / चंदुः",
            transliteration: "Chandu'",
            ipa: "/t͡ʃənɖuʔ/",
            phonetic: "CHAHN-doo",
            meaning: "Moon / Lunar month / Night radiance",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Full_Moon_Luc_Viatour.jpg/640px-Full_Moon_Luc_Viatour.jpg",
            notes: "Governs the timing of Mage Porob and Baha Porob based on lunar phases."
        },
        {
            id: "owah",
            concept: "House / Home",
            native: "𑢶𑣗𑣁𑣹 / ओवाः",
            transliteration: "Owa'",
            ipa: "/owaʔ/",
            phonetic: "OH-wah",
            meaning: "House / Homestead / Family hearth (Ading)",
            category: "Homestead & Community",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Traditional_Tribal_house_Jharkhand.jpg/640px-Traditional_Tribal_house_Jharkhand.jpg",
            notes: "Traditional Ho houses feature hand-plastered earthen walls, tiled roofs, and an inner ancestral shrine (Ading)."
        },
        {
            id: "daru",
            concept: "Tree / Sal Timber",
            native: "𑢵𑣜𑣰 / दारु",
            transliteration: "Daru",
            ipa: "/daːru/",
            phonetic: "DAH-roo",
            meaning: "Tree / Timber / Sacred Sal wood",
            category: "Nature & Forests",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sal_Forest_Saranda.jpg/640px-Sal_Forest_Saranda.jpg",
            notes: "Refers to trees of the Saranda forest, especially the sacred Sal (Sarjom)."
        },
        {
            id: "ote",
            concept: "Earth / Soil",
            native: "𑢶𑣕𑣦 / ओते",
            transliteration: "Ote",
            ipa: "/oteː/",
            phonetic: "OH-tay",
            meaning: "Earth / Soil / Land (Ote Disum)",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Chota_Nagpur_Plateau_Landscape.jpg/640px-Chota_Nagpur_Plateau_Landscape.jpg",
            notes: "Revered as 'Ote Disum'—the sacred earth land nurtured by ancestors."
        },
        {
            id: "hatu",
            concept: "Village",
            native: "𑢹𑣕𑣰 / हातु",
            transliteration: "Hatu",
            ipa: "/haːtu/",
            phonetic: "HAH-too",
            meaning: "Village / Ancestral settlement",
            category: "Homestead & Community",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tribal_village_Jharkhand.jpg/640px-Tribal_village_Jharkhand.jpg",
            notes: "Led socially and traditionally by the village headman (Munda) and priest (Deuri)."
        },
        {
            id: "dama",
            concept: "Kettle Drum",
            native: "𑢵𑣖 / दामा",
            transliteration: "Dama / Dama",
            ipa: "/daːmaː/",
            phonetic: "DAH-mah",
            meaning: "Traditional large ceremonial kettle drum",
            category: "Music & Festivals",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mandar_drum_Jharkhand.jpg/640px-Mandar_drum_Jharkhand.jpg",
            notes: "Played along with the Dhumang (cylindrical drum) during Mage and Baha porobs."
        },
        {
            id: "bir",
            concept: "Forest / Jungle",
            native: "𑢠𑣂𑣜 / बीर",
            transliteration: "Bir",
            ipa: "/biːr/",
            phonetic: "BEER",
            meaning: "Forest / Wilderness / Saranda woods",
            category: "Nature & Forests",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sal_Forest_Saranda.jpg/640px-Sal_Forest_Saranda.jpg",
            notes: "The dense pristine forests of Kolhan including Saranda, the 'land of seven hundred hills'."
        },
        {
            id: "jaher",
            concept: "Sacred Grove",
            native: "𑢺𑢹𑣦𑣜 / जाहेर",
            transliteration: "Jaher / Jaherthan",
            ipa: "/d͡ʒaːɦeːr/",
            phonetic: "JAH-hayr",
            meaning: "Sacred Sal grove of Desauli & village deities",
            category: "Spiritual Heritage",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sacred_grove_India.jpg/640px-Sacred_grove_India.jpg",
            notes: "The pristine forest sanctuary at the edge of every Ho village where the Deuri priest worships."
        },
        {
            id: "ho-person",
            concept: "Human / Ho Person",
            native: "𑢹𑣉𑣉 / हो",
            transliteration: "Ho / Hor",
            ipa: "/hoː/",
            phonetic: "HOH",
            meaning: "Human being / Person of the Ho tribe",
            category: "Identity & Humanity",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oraon_tribal_dance.jpg/640px-Oraon_tribal_dance.jpg",
            notes: "Literally means 'human being' in the Ho language, defining the egalitarian tribal ethos."
        }
    ],

    culturalHeritage: [
        {
            title: "Warang Citi Script & Lako Bodra Legacy",
            category: "Literary & Script Heritage",
            icon: "📜",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Warang_Citi_script_sample.png/640px-Warang_Citi_script_sample.png",
            imageCredit: "Warang Citi Script (Wikimedia Commons)",
            content: "Ot Guru Kol Lako Bodra invented the Warang Citi script to awaken cultural consciousness, standardize Ho literature, and establish the Dupub Huda society. The script is now recognized in the International Unicode Standard."
        },
        {
            title: "Mage Porob (Grand Harvest Festival)",
            category: "Seasonal & Agricultural Festivals",
            icon: "🌾",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Oraon_tribal_dance.jpg/640px-Oraon_tribal_dance.jpg",
            imageCredit: "Mage Porob Celebrations (Wikimedia Commons)",
            content: "Celebrated in the month of Magh (January–February), Mage Porob is the greatest festival of the Ho. Village youth dance in colorful rows to the beats of the Dama and Dhumang drums, thanking Singbonga and ancestors for a bountiful harvest."
        },
        {
            title: "Baha Porob (Sal Flower Spring Rites)",
            category: "Nature Reverence",
            icon: "🌸",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Sarhul_festival_dance_Jharkhand.jpg/640px-Sarhul_festival_dance_Jharkhand.jpg",
            imageCredit: "Sal Blossom Festival (Wikimedia Commons)",
            content: "Baha means 'flower'. During spring, the Deuri priest gathers fresh Sal (Sarjom) flowers at the Jaherthan sacred grove and distributes them to every household to be worn in hair and over ears as blessings of renewal."
        },
        {
            title: "Manki-Munda Governance System",
            category: "Traditional Democracy",
            icon: "⚖️",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tribal_village_Jharkhand.jpg/640px-Tribal_village_Jharkhand.jpg",
            imageCredit: "Kolhan Tribal Governance (Wikimedia Commons)",
            content: "The Ho people preserve a centuries-old democratic self-governance model where village heads (Mundas) form clusters under a regional leader (Manki), officially recognized during British rule under the Wilkinson's Rules of 1837."
        }
    ],

    quizQuestions: [
        {
            question: "To which language family does the Ho language belong?",
            options: [
                "Austroasiatic ➔ North Munda (Kherwarian branch)",
                "Dravidian family",
                "Indo-Aryan family",
                "Tibeto-Burman family"
            ],
            correct: 0,
            explanation: "Ho is an Austroasiatic language of the North Munda group, closely related to Mundari and Santali."
        },
        {
            question: "Who created the authentic indigenous Warang Citi script for the Ho language?",
            options: [
                "Ot Guru Kol Lako Bodra",
                "Pandit Raghunath Murmu",
                "Dr. Narayan Oraon",
                "Birsa Munda"
            ],
            correct: 0,
            explanation: "Ot Guru Kol Lako Bodra invented the Warang Citi script in the mid-20th century to document Ho literature."
        },
        {
            question: "What is the primary harvest festival of the Ho people celebrated with Dama drum beats?",
            options: ["Mage Porob", "Onam", "Bihu", "Pongal"],
            correct: 0,
            explanation: "Mage Porob is the greatest annual festival of the Ho celebrating harvest, ancestors, and renewal."
        },
        {
            question: "What does the word 'Ho' (𑢹𑣉𑣉) literally mean in the language?",
            options: ["Human Being / Person", "Mountain Leader", "Forest Warrior", "River Child"],
            correct: 0,
            explanation: "'Ho' literally translates to 'human being' or 'person' in the language."
        },
        {
            question: "In which geographical region is the Ho language most concentrated?",
            options: [
                "Kolhan division of Jharkhand (Chaibasa, Singhbhum) and Mayurbhanj (Odisha)",
                "Thar Desert, Rajasthan",
                "Kashmir Valley",
                "Konkan Coast, Goa"
            ],
            correct: 0,
            explanation: "Ho is primarily spoken in the Kolhan division of Jharkhand (West & East Singhbhum) and Mayurbhanj & Keonjhar districts in Odisha."
        }
    ],

    sources: [
        {
            title: "Ho Grammar and Vocabulary",
            author: "Lionel Burrows (1915) & John Deeney S.J. (1975), Ho Grammar and Dictionary",
            link: "https://en.wikipedia.org/wiki/Ho_language"
        },
        {
            title: "The Kolhan and Ho Social Organization",
            author: "C. P. Singh (1978) & D. N. Majumdar (1950), The Affairs of a Tribe",
            link: "https://archive.org/details/affairsofatribes00maju"
        },
        {
            title: "Warang Citi Script: History, Phonology & Unicode Proposal",
            author: "Michael Everson (2012) & Kolhan University Ho Department",
            link: "https://www.unicode.org/charts/PDF/U118A0.pdf"
        },
        {
            title: "UNESCO Atlas of the World's Languages in Danger",
            author: "UNESCO Endangered Languages Monitoring (ISO 639-3: hoc)",
            link: "http://www.unesco.org/languages-atlas/"
        }
    ]
};

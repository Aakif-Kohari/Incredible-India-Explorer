/**
 * Comprehensive Dataset for Toda Language Explorer (Nilgiri Hills, Tamil Nadu)
 * Spoken by the pastoral Toda community (ISO 639-3: tcx).
 */

window.TODA_DATA = {
    overview: {
        title: "Toda Language Explorer",
        nativeName: "த்தோடா மொழி (Tōda moḻi)",
        endonym: "𐴑𐴡𐴋𐴢 / Ōl / Tōda",
        romanization: "Toda / Tōda",
        family: "Dravidian ➔ South Dravidian ➔ Toda–Kota Subgroup",
        speakers: "approx. 1,600 (Critically Endangered — UNESCO)",
        primaryRegions: ["Nilgiri Hills", "Ooty (Udhagamandalam)", "Pykara", "Glenmorgan", "Toda Munds (Tamil Nadu)"],
        writingScripts: ["Traditionally Oral / Unwritten", "Tamil Script (தமிழ் எழுத்து)", "Latin / IPA Transcription (Emeneau)"],
        isoCode: "ISO 639-3: tcx",
        greeting: "இஸ்க் வா! / நலந்தானா? (Isk vaa! / Nalandāna?)",
        description: "Toda is an archaic South Dravidian language spoken exclusively by the pastoral Toda people in the high meadows of the Nilgiri Hills, Tamil Nadu. Celebrated by linguists for having one of the world's richest inventories of vowels and fricatives, Toda evolved in highland isolation and remains deeply intertwined with sacred buffalo herding, dairy-temple rituals, and GI-tagged Puthukuli embroidery."
    },

    genealogy: {
        root: "Proto-Dravidian",
        branch: "South Dravidian",
        subgroup: "Toda–Kota Subgroup",
        characteristics: [
            {
                title: "16 Vowel Qualities",
                desc: "Toda possesses an extraordinary inventory of 16 vowels (8 distinct vowel qualities in both short and long forms), including centralized and retroflexed vowels."
            },
            {
                title: "Rich Fricatives & Sibilants",
                desc: "Features unvoiced and voiced fricatives across seven places of articulation—more than any other known Dravidian language."
            },
            {
                title: "Multiple Trilled Consonants",
                desc: "Includes multiple dental, alveolar, and retroflex trills and lateral sounds, giving Toda its unique rolling cadence."
            },
            {
                title: "Archaic Dravidian Retention",
                desc: "Because of highland geographical isolation in the Nilgiris, Toda preserves ancient grammatical roots with minimal external language contact."
            }
        ]
    },

    regions: [
        {
            id: "ooty",
            name: "Udhagamandalam (Ooty Highlands)",
            subRegions: ["Muttinad Mund", "Kandal Mund", "Garden Mund"],
            speakers: "approx. 700",
            color: "#a8462f",
            desc: "The central highland plateau surrounding Ooty, home to historic Toda settlements (Munds) and traditional sacred dairy temples."
        },
        {
            id: "pykara",
            name: "Pykara & Western Nilgiris",
            subRegions: ["Pykara Falls Basin", "Wenlock Downs", "Glenmorgan"],
            speakers: "approx. 500",
            color: "#4a6741",
            desc: "Spreading rolling grasslands and Shola forests where Toda pastoralists traditionally pasture sacred long-horned water buffaloes."
        },
        {
            id: "kundah",
            name: "Kundah & Upper Bhavani",
            subRegions: ["Avalanche Valley", "Emerald Basin", "Upper Bhavani"],
            speakers: "approx. 400",
            color: "#c99a3a",
            desc: "High-altitude ridges with ancient barrel-vaulted huts and sacred dairy sanctuaries managed by the Palol priest."
        }
    ],

    greetings: [
        {
            id: "isk-vaa",
            category: "Universal Welcoming Greeting",
            native: "இஸ்க் வா! / ஆன் வா!",
            transliteration: "Isk vaa! / Aan vaa!",
            ipa: "[iʃk vaː / aːn vaː]",
            phonetic: "EESH-k vah / AHN vah",
            meaning: "Welcome / Come in peace / Blessings upon you",
            context: "Traditional warm Toda greeting offered to visitors entering a Toda Mund (hamlet).",
            audioText: "Isk vaa"
        },
        {
            id: "nalandana",
            category: "Well-Being Inquiry",
            native: "நலந்தானா? / எந்நா சவுக்கியமா?",
            transliteration: "Nalandāna? / Ennā saukhyama?",
            ipa: "[nalandaːnaː]",
            phonetic: "NAH-lahn-dah-nah",
            meaning: "Are you well and in good health?",
            context: "Polite inquiry exchanged among community members and neighboring hill clans.",
            audioText: "Nalandana"
        },
        {
            id: "poith-vaa",
            category: "Farewell Blessing",
            native: "போய்த் வா!",
            transliteration: "Poith-vaa! / Poith va",
            ipa: "[poi̯t̪ vaː]",
            phonetic: "POYTH-vah",
            meaning: "Go safely and return in peace (Farewell)",
            context: "Warm departure blessing wished to travelers crossing the Nilgiri ridges.",
            audioText: "Poith vaa"
        },
        {
            id: "nandri",
            category: "Gratitude",
            native: "நன்றி / மொத் நன்றி",
            transliteration: "Nandri / Modh nandri",
            ipa: "[nandri]",
            phonetic: "NAHN-dree",
            meaning: "Thank you / Deep gratitude",
            context: "Expression of heartfelt appreciation for hospitality and sharing of dairy food.",
            audioText: "Nandri"
        }
    ],

    vocabulary: [
        {
            id: "er",
            concept: "Water Buffalo",
            native: "ஏர் / பாஸ்",
            transliteration: "Ēr / Pas",
            ipa: "/eːr ~ pas/",
            phonetic: "AYR / PAHS",
            meaning: "Sacred Water Buffalo (Bubalus bubalis)",
            category: "Pastoral & Sacred Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Toda_Buffaloes_Nilgiris.jpg/640px-Toda_Buffaloes_Nilgiris.jpg",
            notes: "The sacred center of Toda culture and spirituality; buffaloes are named and venerated in dairy rites."
        },
        {
            id: "ti",
            concept: "Dairy Temple",
            native: "தீ / போல்-தீ",
            transliteration: "Tī / Pōl-ti",
            ipa: "/tiː ~ poːlti/",
            phonetic: "TEE / POHL-tee",
            meaning: "Sacred dairy temple sanctum",
            category: "Spiritual Heritage",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Toda_temple_Nilgiris.jpg/640px-Toda_temple_Nilgiris.jpg",
            notes: "The conical dairy temple tended exclusively by the celibate Palol priest who churns holy milk."
        },
        {
            id: "nir",
            concept: "Water",
            native: "நீர்",
            transliteration: "Nīr",
            ipa: "/niːr/",
            phonetic: "NEER",
            meaning: "Water / Pure Shola mountain spring",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Pykara_River_Nilgiris.jpg/640px-Pykara_River_Nilgiris.jpg",
            notes: "Direct Dravidian root conserved across Toda, Tamil, and Malayalam for fresh mountain streams."
        },
        {
            id: "kad",
            concept: "Forest",
            native: "காடு / கார்",
            transliteration: "Kāḍ / Kāṛ",
            ipa: "/kaːɖ ~ kaːr/",
            phonetic: "KAH-du",
            meaning: "Shola forest / Hill woods",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Shola_Forest_Nilgiris.jpg/640px-Shola_Forest_Nilgiris.jpg",
            notes: "The unique high-altitude montane Shola forest ecosystems of the Nilgiri biosphere."
        },
        {
            id: "ol",
            concept: "Toda Person / Hut",
            native: "ஓல் / மோத்",
            transliteration: "Ōl / Mod",
            ipa: "/oːl ~ mod/",
            phonetic: "OHL / MOHD",
            meaning: "Toda person / Barrel-vaulted hut (Mund)",
            category: "Homestead & Identity",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Toda_Hut_Ooty.jpg/640px-Toda_Hut_Ooty.jpg",
            notes: "The indigenous Toda self-appellation (Ōl) and their distinctive barrel-arched dwellings (Mod)."
        },
        {
            id: "ner",
            concept: "Sun / Daylight",
            native: "நேர்",
            transliteration: "Nēr",
            ipa: "/neːr/",
            phonetic: "NAYR",
            meaning: "Sun / Daylight / Solar time",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Nilgiri_Hills_Sunrise.jpg/640px-Nilgiri_Hills_Sunrise.jpg",
            notes: "Associated with sunrise over the Doddabetta peak and daily dairy churning rituals."
        },
        {
            id: "puf",
            concept: "Flower",
            native: "பூப் / பூ",
            transliteration: "Pūf",
            ipa: "/puːf/",
            phonetic: "POOF",
            meaning: "Flower / Wild mountain blossom",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Strobilanthes_kunthiana_Neelakurinji.jpg/640px-Strobilanthes_kunthiana_Neelakurinji.jpg",
            notes: "Includes the famous Neelakurinji flower blooming once every 12 years across Toda grasslands."
        },
        {
            id: "pol",
            concept: "Milk",
            native: "பால் / மோர்",
            transliteration: "Pōl",
            ipa: "/poːl/",
            phonetic: "POHL",
            meaning: "Fresh buffalo milk / Dairy yield",
            category: "Pastoral & Sacred Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Milk_churning_pot.jpg/640px-Milk_churning_pot.jpg",
            notes: "The primary nourishment and ritual medium of Toda daily life and dairy-temple ceremonies."
        },
        {
            id: "mar",
            concept: "Tree",
            native: "மார் / மரம்",
            transliteration: "Māṛ",
            ipa: "/maːr/",
            phonetic: "MAHR",
            meaning: "Tree / Shola timber tree",
            category: "Nature & Elements",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Nilgiri_shola_trees.jpg/640px-Nilgiri_shola_trees.jpg",
            notes: "Timber from selected trees is used to construct the arched frames of traditional Toda huts."
        },
        {
            id: "titt",
            concept: "Hill / Peak",
            native: "திட்டு / பெட்டா",
            transliteration: "Tiṭṭ / Beṭṭ",
            ipa: "/tiʈː ~ beʈː/",
            phonetic: "TIHT / BEHT",
            meaning: "Hill / Nilgiri mountain ridge",
            category: "Geography",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Doddabetta_Peak_Ooty.jpg/640px-Doddabetta_Peak_Ooty.jpg",
            notes: "The high Nilgiri hills (like Doddabetta at 2,637m) bounding Toda ancestral territory."
        },
        {
            id: "puthukuli",
            concept: "Embroidered Shawl",
            native: "புதுக்குளி",
            transliteration: "Puthukuli",
            ipa: "[put̪ukːuḷi]",
            phonetic: "POO-thoo-koo-lee",
            meaning: "GI-tagged Toda embroidered shawl",
            category: "Art & Material Culture",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Toda_Embroidery_Shawl.jpg/640px-Toda_Embroidery_Shawl.jpg",
            notes: "Hand-stitched in bold red and black threads on unbleached white cotton without knots on either side."
        },
        {
            id: "kab",
            concept: "Churning Stick",
            native: "காப்",
            transliteration: "Kāb",
            ipa: "/kaːb/",
            phonetic: "KAHB",
            meaning: "Wooden churner for sacred milk",
            category: "Pastoral & Sacred Life",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Traditional_wooden_churn.jpg/640px-Traditional_wooden_churn.jpg",
            notes: "Sacred churning implement used in the dairy temple to separate holy butter from buttermilk."
        }
    ],

    culturalHeritage: [
        {
            title: "Sacred Buffalo Herding & Dairy Temples",
            category: "Pastoral & Spiritual Life",
            icon: "🐃",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Toda_temple_Nilgiris.jpg/640px-Toda_temple_Nilgiris.jpg",
            imageCredit: "Toda Sacred Temple (Wikimedia Commons)",
            content: "Toda life revolves entirely around their sacred long-horned water buffalo herds. The highest religious authority is the celibate Palol priest who resides in the conical stone-and-thatch dairy temple, performing intricate daily churning rituals."
        },
        {
            title: "Barrel-Vaulted Dog-Arch Huts (Munds)",
            category: "Vernacular Architecture",
            icon: "🛖",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Toda_Hut_Ooty.jpg/640px-Toda_Hut_Ooty.jpg",
            imageCredit: "Traditional Toda Hut (Wikimedia Commons)",
            content: "Toda settlements (Munds) feature iconic barrel-vaulted houses constructed with bent bamboo cane, thatch, and dry stone walls with tiny doorway openings designed to keep out wild predators and retain winter warmth."
        },
        {
            title: "GI-Tagged Puthukuli Embroidery (Poothkuly)",
            category: "Textile & Craft Heritage",
            icon: "🧵",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Toda_Embroidery_Shawl.jpg/640px-Toda_Embroidery_Shawl.jpg",
            imageCredit: "Toda Puthukuli Shawl (Wikimedia Commons)",
            content: "Toda women practice an extraordinary needlework art called Poothkuly. Embroidered with red and black wool onto white cotton, the geometric motifs look identical and knotless on both sides of the fabric, protected under Geographical Indication (GI)."
        },
        {
            title: "Oral Poetic Tradition & Chants",
            category: "Oral Literature & Music",
            icon: "🎶",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Nilgiri_Hills_Sunrise.jpg/640px-Nilgiri_Hills_Sunrise.jpg",
            imageCredit: "Nilgiri Shola Grasslands (Wikimedia Commons)",
            content: "With no traditional writing system, the Toda preserve complex oral poetry, mythological songs, and sacred dairy mantras passed down through generations, masterfully documented in Murray B. Emeneau's linguistic field recordings."
        }
    ],

    quizQuestions: [
        {
            question: "To which language family does the Toda language belong?",
            options: [
                "Dravidian ➔ South Dravidian (Toda–Kota subgroup)",
                "Indo-Aryan (Northwestern group)",
                "Austroasiatic (Munda branch)",
                "Tibeto-Burman (Bodish group)"
            ],
            correct: 0,
            explanation: "Toda is a South Dravidian language forming an ancient subgroup with the neighboring Kota language."
        },
        {
            question: "Why is Toda considered unique among linguists worldwide?",
            options: [
                "It has an extraordinarily rich sound system with 16 vowels and fricatives across 7 places of articulation",
                "It has only three consonants",
                "It was created artificially in 1950",
                "It has no vowels whatsoever"
            ],
            correct: 0,
            explanation: "Toda has 16 vowels (8 short, 8 long) and fricatives across seven places of articulation, studied extensively by Murray B. Emeneau."
        },
        {
            question: "What is the primary animal around which Toda spirituality and language revolve?",
            options: ["Sacred Water Buffalo (Ēr / Pas)", "Himalayan Yak", "Bengal Tiger", "Peacock"],
            correct: 0,
            explanation: "Toda culture and language revolve around sacred water buffalo herds and dairy temple rituals."
        },
        {
            question: "What is the famous GI-tagged textile craft made by Toda women?",
            options: [
                "Puthukuli red-and-black reversible embroidery",
                "Pashmina shawl weaving",
                "Kalamkari block printing",
                "Kasuti needlework"
            ],
            correct: 0,
            explanation: "Puthukuli is the GI-tagged Toda reversible embroidery on unbleached white cotton shawls."
        },
        {
            question: "In which geographical mountain region is the Toda language spoken?",
            options: [
                "Nilgiri Hills, Tamil Nadu (Ooty, Pykara, Glenmorgan)",
                "Aravalli Hills, Rajasthan",
                "Garo Hills, Meghalaya",
                "Cardamom Hills, Kerala"
            ],
            correct: 0,
            explanation: "Toda is native exclusively to the high-altitude plateau of the Nilgiri Hills in Tamil Nadu."
        }
    ],

    sources: [
        {
            title: "Toda Grammar and Texts",
            author: "Murray B. Emeneau (1984), American Philosophical Society",
            link: "https://en.wikipedia.org/wiki/Toda_language"
        },
        {
            title: "The Todas",
            author: "W. H. R. Rivers (1906), Macmillan and Co., London",
            link: "https://archive.org/details/todasrivers00riverich"
        },
        {
            title: "The Dravidian Languages",
            author: "Bhadriraju Krishnamurti (2003), Cambridge University Press",
            link: "https://www.cambridge.org/core/books/dravidian-languages"
        },
        {
            title: "UNESCO Atlas of the World's Languages in Danger",
            author: "UNESCO Endangered Languages Monitoring (ISO 639-3: tcx)",
            link: "http://www.unesco.org/languages-atlas/"
        }
    ]
};

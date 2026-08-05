const architectureData = {
    dravidian: {
        id: "dravidian",
        name: "Dravidian Architecture",
        description: "Primarily found in South India, characterized by towering gopurams (gateways), vast temple enclosures, and pyramid-shaped vimanas over the sanctum.",
        features: [
            {
                id: "gopuram",
                name: "Gopuram",
                description: "The monumental, ornate gateway tower at the entrance of a Hindu temple.",
                function: "Serves as a grand entrance and a visual marker for the temple from a distance.",
                examples: ["Meenakshi Temple, Madurai", "Sri Ranganathaswamy Temple, Srirangam"]
            },
            {
                id: "vimana",
                name: "Vimana",
                description: "The towering, step-pyramidal structure above the main sanctum (garbhagriha).",
                function: "Houses and marks the sacred center where the main deity resides.",
                examples: ["Brihadeeswara Temple, Thanjavur"]
            },
            {
                id: "mandapa",
                name: "Mandapa",
                description: "A pillared hall or pavilion for public rituals.",
                function: "Used for religious dancing, music, and congregation.",
                examples: ["Airavatesvara Temple, Darasuram"]
            },
            {
                id: "prakara",
                name: "Prakara",
                description: "The walled enclosure or ambulatory passageway surrounding the temple.",
                function: "Provides a path for circumambulation (pradakshina) and security.",
                examples: ["Ramanathaswamy Temple, Rameswaram"]
            },
            {
                id: "temple-tank",
                name: "Temple Tank (Kalyani)",
                description: "A stepped water reservoir built within or near the temple complex.",
                function: "Used for ritual bathing and temple festivals.",
                examples: ["Kapaleeshwarar Temple, Chennai"]
            }
        ]
    },
    nagara: {
        id: "nagara",
        name: "Nagara Architecture",
        description: "The predominant temple architectural style of North India, identifiable by its beehive-shaped, curvilinear tower known as the Shikhara.",
        features: [
            {
                id: "shikhara",
                name: "Shikhara",
                description: "The towering, curving spire above the main sanctum.",
                function: "Symbolizes Mount Meru, the cosmic mountain, marking the sacred center.",
                examples: ["Kandariya Mahadeva Temple, Khajuraho", "Lingaraja Temple, Bhubaneswar"]
            },
            {
                id: "amalaka",
                name: "Amalaka",
                description: "A stone disk, often with ridges, that sits atop the Shikhara.",
                function: "Represents a lotus and holds the Kalasha in place.",
                examples: ["Jagannath Temple, Puri"]
            },
            {
                id: "kalasha",
                name: "Kalasha",
                description: "The finial or pointed pot-like structure placed on top of the Amalaka.",
                function: "The highest point of the temple, considered highly sacred and auspicious.",
                examples: ["Konark Sun Temple"]
            },
            {
                id: "mandapa",
                name: "Mandapa",
                description: "The pillared assembly hall leading to the sanctum.",
                function: "Provides space for devotees to gather, pray, and observe rituals.",
                examples: ["Modhera Sun Temple"]
            },
            {
                id: "jagati",
                name: "Jagati",
                description: "A raised platform or plinth upon which the entire temple structure is built.",
                function: "Elevates the sacred space above the ordinary ground and provides an ambulatory path.",
                examples: ["Khajuraho Group of Monuments"]
            }
        ]
    },
    vesara: {
        id: "vesara",
        name: "Vesara Architecture",
        description: "A hybrid style that blends elements of both Nagara and Dravidian architecture, prominent in the Deccan region under the Chalukyas and Hoysalas.",
        features: [
            {
                id: "hybrid-tower",
                name: "Hybrid Tower",
                description: "A vimana that integrates the stepped tiers of the Dravidian style with the curved profile of the Nagara Shikhara.",
                function: "Combines regional aesthetics to form a distinct architectural identity.",
                examples: ["Chennakesava Temple, Belur"]
            },
            {
                id: "star-platform",
                name: "Star-shaped Platform",
                description: "An intricately carved, stellate (star-shaped) jagati or plinth.",
                function: "Increases the wall surface area to allow for more extensive sculptural decoration.",
                examples: ["Hoysaleswara Temple, Halebidu"]
            },
            {
                id: "pillared-hall",
                name: "Pillared Hall",
                description: "A central hall supported by highly polished, lathe-turned stone pillars.",
                function: "Served as a space for dance, music, and congregational worship.",
                examples: ["Keshava Temple, Somanathapura"]
            },
            {
                id: "carvings",
                name: "Decorative Carvings",
                description: "Exceedingly detailed and dense sculptural friezes covering exterior walls.",
                function: "Narrates epics (Ramayana, Mahabharata) and depicts daily life and mythology.",
                examples: ["Ramappa Temple, Palampet"]
            }
        ]
    },
    "indo-islamic": {
        id: "indo-islamic",
        name: "Indo-Islamic Architecture",
        description: "A synthesis of Indian and Islamic architectural elements, characterized by the extensive use of arches, domes, and minarets.",
        features: [
            {
                id: "dome",
                name: "Dome (Gumbad)",
                description: "A hemispherical structure forming the ceiling or roof.",
                function: "Provides a vast, column-free interior space and symbolizes the vault of heaven.",
                examples: ["Taj Mahal, Agra", "Gol Gumbaz, Bijapur"]
            },
            {
                id: "arch",
                name: "Arch (Iwan)",
                description: "A curved symmetrical structure spanning an opening, often pointed or multifoil.",
                function: "Distributes weight effectively and serves as grand, inviting gateways.",
                examples: ["Buland Darwaza, Fatehpur Sikri"]
            },
            {
                id: "minaret",
                name: "Minaret",
                description: "A tall, slender tower, usually attached to a mosque.",
                function: "Used for the call to prayer (Adhan) and adds verticality to the structural composition.",
                examples: ["Qutub Minar, Delhi", "Charminar, Hyderabad"]
            },
            {
                id: "jali",
                name: "Jali",
                description: "An intricately carved, perforated stone or latticework screen.",
                function: "Allows for ventilation and light while maintaining privacy (purdah) and reducing glare.",
                examples: ["Sidi Saiyyed Mosque, Ahmedabad"]
            },
            {
                id: "chhatri",
                name: "Chhatri",
                description: "An elevated, dome-shaped pavilion used as an element in Indian architecture.",
                function: "Provides shade, decorative elegance, and serves as a memorial structure.",
                examples: ["Humayun's Tomb, Delhi", "Fatehpur Sikri"]
            }
        ]
    }
};

export default architectureData;

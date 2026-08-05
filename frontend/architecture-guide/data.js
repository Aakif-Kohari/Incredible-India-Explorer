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
window.architectureData = {
    dravidian: {
        title: "Dravidian",
        description: "The architectural style of South Indian temples, characterized by pyramidal towers and enclosed courtyards.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
                <!-- Base Structure (Simplified) -->
                <rect x="50" y="250" width="400" height="100" fill="#c28e5c" stroke="#36454f" stroke-width="2"/>
                <polygon points="100,250 200,50 300,250" fill="#e5b784" stroke="#36454f" stroke-width="2"/>
                <rect x="300" y="200" width="100" height="50" fill="#d4a373" stroke="#36454f" stroke-width="2"/>
                
                <!-- Hotspots -->
                <circle id="vimana" class="hotspot" cx="200" cy="150" r="15" tabindex="0" aria-label="Vimana architectural feature" />
                <text x="200" y="155" class="hotspot-text" pointer-events="none">V</text>
                
                <circle id="mandapa" class="hotspot" cx="350" cy="225" r="15" tabindex="0" aria-label="Mandapa architectural feature" />
                <text x="350" y="230" class="hotspot-text" pointer-events="none">M</text>

                <circle id="gopuram" class="hotspot" cx="100" cy="250" r="15" tabindex="0" aria-label="Gopuram architectural feature" />
                <text x="100" y="255" class="hotspot-text" pointer-events="none">G</text>
            </svg>
        `,
        features: [
            {
                id: "vimana",
                name: "Vimana",
                description: "The main tower above the sanctum sanctorum in South Indian temples, typically pyramidal in shape.",
                function: "Marks the sacred center of the temple and houses the main deity.",
                examples: ["Brihadeeswara Temple", "Airavatesvara Temple"]
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
                function: "Used for religious dancing, music, and congregations.",
                examples: ["Meenakshi Temple 1000-pillar hall"]
            },
            {
                id: "gopuram",
                name: "Gopuram",
                description: "The monumental entrance tower, usually ornate and taller than the Vimana.",
                function: "Acts as a gateway to the temple enclosure.",
                examples: ["Meenakshi Temple", "Srirangam Temple"]
            }
        ]
    },
    nagara: {
        id: "nagara",
        name: "Nagara Architecture",
        description: "The predominant temple architectural style of North India, identifiable by its beehive-shaped, curvilinear tower known as the Shikhara.",
        title: "Nagara",
        description: "The architectural style of North Indian temples, featuring curved, beehive-shaped towers.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
                <!-- Platform -->
                <rect x="50" y="300" width="400" height="50" fill="#c28e5c" stroke="#36454f" stroke-width="2"/>
                <!-- Shikhara (curved tower) -->
                <path d="M 150 300 Q 200 100 250 50 Q 300 100 350 300 Z" fill="#e5b784" stroke="#36454f" stroke-width="2"/>
                <circle cx="250" cy="40" r="20" fill="#cd7f32" stroke="#36454f" stroke-width="2"/>
                <!-- Mandapa -->
                <polygon points="350,300 400,200 450,300" fill="#d4a373" stroke="#36454f" stroke-width="2"/>

                <!-- Hotspots -->
                <circle id="shikhara" class="hotspot" cx="250" cy="180" r="15" tabindex="0" aria-label="Shikhara architectural feature" />
                <text x="250" y="185" class="hotspot-text" pointer-events="none">S</text>

                <circle id="amalaka" class="hotspot" cx="250" cy="40" r="15" tabindex="0" aria-label="Amalaka and Kalasha architectural feature" />
                <text x="250" y="45" class="hotspot-text" pointer-events="none">A</text>

                <circle id="jagati" class="hotspot" cx="250" cy="325" r="15" tabindex="0" aria-label="Jagati architectural feature" />
                <text x="250" y="330" class="hotspot-text" pointer-events="none">J</text>
            </svg>
        `,
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
                description: "The curvilinear, beehive-shaped tower above the sanctum characteristic of North Indian temple architecture.",
                function: "Symbolizes Mount Meru, the cosmic mountain.",
                examples: ["Khajuraho Temples", "Lingaraja Temple"]
            },
            {
                id: "amalaka",
                name: "Amalaka & Kalasha",
                description: "A stone disc (Amalaka) topped by a finial (Kalasha) sitting at the apex of the Shikhara.",
                function: "Represents the lotus and holds the sacred pot.",
                examples: ["Konark Sun Temple", "Jagannath Temple"]
            },
            {
                id: "jagati",
                name: "Jagati",
                description: "A raised platform or plinth upon which the entire temple structure is built.",
                function: "Elevates the sacred space above the ordinary ground and provides an ambulatory path.",
                description: "A raised platform upon which the entire temple is built.",
                function: "Provides a base for circumambulation and elevates the sacred space.",
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
        title: "Vesara",
        description: "A hybrid style combining features of Nagara (North) and Dravidian (South) architecture.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
                <!-- Star Platform -->
                <polygon points="50,300 450,300 400,320 100,320" fill="#606060" stroke="#36454f" stroke-width="2"/>
                <!-- Tower -->
                <path d="M 200 300 L 220 150 L 250 100 L 280 150 L 300 300 Z" fill="#c28e5c" stroke="#36454f" stroke-width="2"/>
                <!-- Pillared Hall -->
                <rect x="300" y="220" width="100" height="80" fill="#d4a373" stroke="#36454f" stroke-width="2"/>
                
                <!-- Hotspots -->
                <circle id="hybrid-tower" class="hotspot" cx="250" cy="180" r="15" tabindex="0" aria-label="Hybrid Tower architectural feature" />
                <text x="250" y="185" class="hotspot-text" pointer-events="none">T</text>

                <circle id="star-platform" class="hotspot" cx="250" cy="310" r="15" tabindex="0" aria-label="Star-shaped Platform architectural feature" />
                <text x="250" y="315" class="hotspot-text" pointer-events="none">P</text>

                <circle id="pillared-hall" class="hotspot" cx="350" cy="260" r="15" tabindex="0" aria-label="Pillared Hall architectural feature" />
                <text x="350" y="265" class="hotspot-text" pointer-events="none">H</text>
            </svg>
        `,
        features: [
            {
                id: "hybrid-tower",
                name: "Hybrid Tower (Vimana/Shikhara)",
                description: "A tower that blends the pyramidal tiers of Dravidian style with the curvilinear profile of Nagara style.",
                function: "Covers the sanctum and blends regional traditions.",
                examples: ["Chennakesava Temple", "Hoysaleswara Temple"]
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
                description: "An intricately designed stellate (star-shaped) base.",
                function: "Increases the surface area for elaborate sculptural carvings.",
                examples: ["Hoysala Temples at Belur and Halebidu"]
            },
            {
                id: "pillared-hall",
                name: "Pillared Halls",
                description: "Elaborately carved halls featuring lathe-turned pillars.",
                function: "Spaces for gathering and display of intricate stone masonry.",
                examples: ["Somnathpur Temple"]
            }
        ]
    },
    'indo-islamic': {
        title: "Indo-Islamic",
        description: "A synthesis of Indian and Islamic architectural elements, characterized by domes, arches, and minarets.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
                <!-- Base -->
                <rect x="150" y="250" width="200" height="100" fill="#fffff0" stroke="#36454f" stroke-width="2"/>
                <!-- Dome -->
                <path d="M 150 250 A 100 100 0 0 1 350 250 Z" fill="#fffff0" stroke="#36454f" stroke-width="2"/>
                <!-- Arch (Iwan) -->
                <path d="M 210 350 L 210 300 A 40 40 0 0 1 290 300 L 290 350 Z" fill="#606060" stroke="#36454f" stroke-width="2"/>
                <!-- Minarets -->
                <rect x="70" y="150" width="20" height="200" fill="#fffff0" stroke="#36454f" stroke-width="2"/>
                <rect x="410" y="150" width="20" height="200" fill="#fffff0" stroke="#36454f" stroke-width="2"/>
                <polygon points="65,150 95,150 80,130" fill="#cd7f32" stroke="#36454f" stroke-width="2"/>
                <polygon points="405,150 435,150 420,130" fill="#cd7f32" stroke="#36454f" stroke-width="2"/>

                <!-- Hotspots -->
                <circle id="dome" class="hotspot" cx="250" cy="180" r="15" tabindex="0" aria-label="Dome architectural feature" />
                <text x="250" y="185" class="hotspot-text" pointer-events="none">D</text>

                <circle id="arch" class="hotspot" cx="250" cy="310" r="15" tabindex="0" aria-label="Arch/Iwan architectural feature" />
                <text x="250" y="315" class="hotspot-text" pointer-events="none">A</text>

                <circle id="minaret" class="hotspot" cx="80" cy="200" r="15" tabindex="0" aria-label="Minaret architectural feature" />
                <text x="80" y="205" class="hotspot-text" pointer-events="none">M</text>
            </svg>
        `,
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
                description: "A hemispherical structural element serving as a roof, often resting on squinches or pendentives.",
                function: "Creates a vast, unobstructed interior space and represents the vault of heaven.",
                examples: ["Taj Mahal", "Gol Gumbaz"]
            },
            {
                id: "arch",
                name: "Arch & Iwan",
                description: "A curved symmetrical structure (Arch) often framing a large vaulted portal (Iwan).",
                function: "Provides structural support and grand entrances to monuments.",
                examples: ["Jama Masjid", "Humayun's Tomb"]
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
                description: "Tall, slender towers typically adjacent to mosques or tombs.",
                function: "Used for the call to prayer (Adhan) and to enhance structural symmetry.",
                examples: ["Qutub Minar", "Taj Mahal Minarets"]
            }
        ]
    }
};

const architectureData = {
    dravidian: {
        id: "dravidian",
        title: "Dravidian Architecture",
        description: "Primarily found in South India, characterized by towering gopurams (gateways), vast temple enclosures, and pyramid-shaped vimanas over the sanctum.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram" preserveAspectRatio="xMidYMid meet">
                <!-- Base Structure (Simplified) -->
                <rect x="50" y="250" width="400" height="100" fill="#c28e5c" stroke="#36454f" stroke-width="2"/>
                <polygon points="100,250 200,50 300,250" fill="#e5b784" stroke="#36454f" stroke-width="2"/>
                <rect x="300" y="200" width="100" height="50" fill="#d4a373" stroke="#36454f" stroke-width="2"/>
                
                <!-- Hotspots Grouped for Mobile Hit Area (44x44 CSS pixels equivalent) -->
                <!-- Assuming scaling might halve the size on mobile, r=30 makes diameter 60, scaling to 30+, CSS will handle scaling too -->
                
                <g id="vimana" class="hotspot-group" tabindex="0" role="button" aria-label="Vimana architectural feature">
                    <circle class="hotspot-hit-area" cx="200" cy="150" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="200" cy="150" r="15" />
                    <text x="200" y="155" class="hotspot-text" pointer-events="none">V</text>
                </g>
                
                <g id="mandapa" class="hotspot-group" tabindex="0" role="button" aria-label="Mandapa architectural feature">
                    <circle class="hotspot-hit-area" cx="350" cy="225" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="350" cy="225" r="15" />
                    <text x="350" y="230" class="hotspot-text" pointer-events="none">M</text>
                </g>

                <g id="gopuram" class="hotspot-group" tabindex="0" role="button" aria-label="Gopuram architectural feature">
                    <circle class="hotspot-hit-area" cx="100" cy="250" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="100" cy="250" r="15" />
                    <text x="100" y="255" class="hotspot-text" pointer-events="none">G</text>
                </g>
            </svg>
        `,
        features: [
            {
                id: "vimana",
                name: "Vimana",
                description: "The towering, step-pyramidal structure above the main sanctum (garbhagriha) in South Indian temples.",
                function: "Marks the sacred center of the temple and houses the main deity.",
                examples: ["Brihadeeswara Temple, Thanjavur", "Airavatesvara Temple"]
            },
            {
                id: "mandapa",
                name: "Mandapa",
                description: "A pillared hall or pavilion for public rituals.",
                function: "Used for religious dancing, music, and congregational worship.",
                examples: ["Airavatesvara Temple, Darasuram", "Meenakshi Temple 1000-pillar hall"]
            },
            {
                id: "gopuram",
                name: "Gopuram",
                description: "The monumental entrance tower, usually ornate and taller than the Vimana.",
                function: "Acts as a gateway to the temple enclosure.",
                examples: ["Meenakshi Temple, Madurai", "Sri Ranganathaswamy Temple, Srirangam"]
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
        title: "Nagara Architecture",
        description: "The predominant temple architectural style of North India, identifiable by its beehive-shaped, curvilinear tower known as the Shikhara.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram" preserveAspectRatio="xMidYMid meet">
                <!-- Platform -->
                <rect x="50" y="300" width="400" height="50" fill="#c28e5c" stroke="#36454f" stroke-width="2"/>
                <!-- Shikhara (curved tower) -->
                <path d="M 150 300 Q 200 100 250 50 Q 300 100 350 300 Z" fill="#e5b784" stroke="#36454f" stroke-width="2"/>
                <circle cx="250" cy="40" r="20" fill="#cd7f32" stroke="#36454f" stroke-width="2"/>
                <!-- Mandapa -->
                <polygon points="350,300 400,200 450,300" fill="#d4a373" stroke="#36454f" stroke-width="2"/>

                <!-- Hotspots Grouped -->
                <g id="shikhara" class="hotspot-group" tabindex="0" role="button" aria-label="Shikhara architectural feature">
                    <!-- Adjusted hit area y to not overlap with amalaka -->
                    <circle class="hotspot-hit-area" cx="250" cy="180" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="250" cy="180" r="15" />
                    <text x="250" y="185" class="hotspot-text" pointer-events="none">S</text>
                </g>

                <g id="amalaka" class="hotspot-group" tabindex="0" role="button" aria-label="Amalaka and Kalasha architectural feature">
                    <!-- Shifted cy slightly up from 40 to space out -->
                    <circle class="hotspot-hit-area" cx="250" cy="30" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="250" cy="40" r="15" />
                    <text x="250" y="45" class="hotspot-text" pointer-events="none">A</text>
                </g>

                <g id="jagati" class="hotspot-group" tabindex="0" role="button" aria-label="Jagati architectural feature">
                    <circle class="hotspot-hit-area" cx="250" cy="325" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="250" cy="325" r="15" />
                    <text x="250" y="330" class="hotspot-text" pointer-events="none">J</text>
                </g>
                
                <g id="mandapa" class="hotspot-group" tabindex="0" role="button" aria-label="Mandapa architectural feature">
                    <circle class="hotspot-hit-area" cx="400" cy="270" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="400" cy="270" r="15" />
                    <text x="400" y="275" class="hotspot-text" pointer-events="none">M</text>
                </g>
            </svg>
        `,
        features: [
            {
                id: "shikhara",
                name: "Shikhara",
                description: "The curvilinear, beehive-shaped tower above the sanctum characteristic of North Indian temple architecture.",
                function: "Symbolizes Mount Meru, the cosmic mountain, marking the sacred center.",
                examples: ["Kandariya Mahadeva Temple, Khajuraho", "Lingaraja Temple, Bhubaneswar"]
            },
            {
                id: "amalaka",
                name: "Amalaka & Kalasha",
                description: "A stone disc (Amalaka) topped by a finial (Kalasha) sitting at the apex of the Shikhara.",
                function: "Represents the lotus and holds the sacred pot (Kalasha) which is considered auspicious.",
                examples: ["Konark Sun Temple", "Jagannath Temple, Puri"]
            },
            {
                id: "jagati",
                name: "Jagati",
                description: "A raised platform or plinth upon which the entire temple structure is built.",
                function: "Elevates the sacred space above the ordinary ground and provides an ambulatory path for circumambulation.",
                examples: ["Khajuraho Group of Monuments"]
            },
            {
                id: "mandapa",
                name: "Mandapa",
                description: "The pillared assembly hall leading to the sanctum.",
                function: "Provides space for devotees to gather, pray, and observe rituals.",
                examples: ["Modhera Sun Temple"]
            }
        ]
    },
    vesara: {
        id: "vesara",
        title: "Vesara Architecture",
        description: "A hybrid style that blends elements of both Nagara and Dravidian architecture, prominent in the Deccan region under the Chalukyas and Hoysalas.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram" preserveAspectRatio="xMidYMid meet">
                <!-- Star Platform -->
                <polygon points="50,300 450,300 400,320 100,320" fill="#606060" stroke="#36454f" stroke-width="2"/>
                <!-- Tower -->
                <path d="M 200 300 L 220 150 L 250 100 L 280 150 L 300 300 Z" fill="#c28e5c" stroke="#36454f" stroke-width="2"/>
                <!-- Pillared Hall -->
                <rect x="300" y="220" width="100" height="80" fill="#d4a373" stroke="#36454f" stroke-width="2"/>
                
                <!-- Hotspots Grouped -->
                <g id="hybrid-tower" class="hotspot-group" tabindex="0" role="button" aria-label="Hybrid Tower architectural feature">
                    <circle class="hotspot-hit-area" cx="250" cy="180" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="250" cy="180" r="15" />
                    <text x="250" y="185" class="hotspot-text" pointer-events="none">T</text>
                </g>

                <g id="star-platform" class="hotspot-group" tabindex="0" role="button" aria-label="Star-shaped Platform architectural feature">
                    <circle class="hotspot-hit-area" cx="250" cy="310" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="250" cy="310" r="15" />
                    <text x="250" y="315" class="hotspot-text" pointer-events="none">P</text>
                </g>

                <g id="pillared-hall" class="hotspot-group" tabindex="0" role="button" aria-label="Pillared Hall architectural feature">
                    <circle class="hotspot-hit-area" cx="350" cy="260" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="350" cy="260" r="15" />
                    <text x="350" y="265" class="hotspot-text" pointer-events="none">H</text>
                </g>
            </svg>
        `,
        features: [
            {
                id: "hybrid-tower",
                name: "Hybrid Tower (Vimana/Shikhara)",
                description: "A vimana that integrates the stepped tiers of the Dravidian style with the curved profile of the Nagara Shikhara.",
                function: "Combines regional aesthetics to form a distinct architectural identity covering the sanctum.",
                examples: ["Chennakesava Temple, Belur", "Hoysaleswara Temple"]
            },
            {
                id: "star-platform",
                name: "Star-shaped Platform (Jagati)",
                description: "An intricately carved, stellate (star-shaped) jagati or plinth.",
                function: "Increases the wall surface area to allow for more extensive sculptural decoration.",
                examples: ["Hoysaleswara Temple, Halebidu"]
            },
            {
                id: "pillared-hall",
                name: "Pillared Hall",
                description: "A central hall supported by highly polished, lathe-turned stone pillars.",
                function: "Served as a space for dance, music, congregational worship and display of intricate stone masonry.",
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
        title: "Indo-Islamic Architecture",
        description: "A synthesis of Indian and Islamic architectural elements, characterized by the extensive use of domes, arches, and minarets.",
        svg: `
            <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram" preserveAspectRatio="xMidYMid meet">
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

                <!-- Hotspots Grouped -->
                <g id="dome" class="hotspot-group" tabindex="0" role="button" aria-label="Dome architectural feature">
                    <!-- Moved cy up slightly to avoid collision -->
                    <circle class="hotspot-hit-area" cx="250" cy="170" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="250" cy="180" r="15" />
                    <text x="250" y="185" class="hotspot-text" pointer-events="none">D</text>
                </g>

                <g id="arch" class="hotspot-group" tabindex="0" role="button" aria-label="Arch/Iwan architectural feature">
                    <circle class="hotspot-hit-area" cx="250" cy="310" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="250" cy="310" r="15" />
                    <text x="250" y="315" class="hotspot-text" pointer-events="none">A</text>
                </g>

                <g id="minaret" class="hotspot-group" tabindex="0" role="button" aria-label="Minaret architectural feature">
                    <circle class="hotspot-hit-area" cx="80" cy="200" r="35" fill="transparent" />
                    <circle class="hotspot-visual" cx="80" cy="200" r="15" />
                    <text x="80" y="205" class="hotspot-text" pointer-events="none">M</text>
                </g>
            </svg>
        `,
        features: [
            {
                id: "dome",
                name: "Dome (Gumbad)",
                description: "A hemispherical structural element serving as a roof, often resting on squinches or pendentives.",
                function: "Creates a vast, unobstructed interior space and symbolizes the vault of heaven.",
                examples: ["Taj Mahal, Agra", "Gol Gumbaz, Bijapur"]
            },
            {
                id: "arch",
                name: "Arch & Iwan",
                description: "A curved symmetrical structure (Arch) often framing a large vaulted portal (Iwan).",
                function: "Distributes weight effectively and serves as grand, inviting gateways.",
                examples: ["Buland Darwaza, Fatehpur Sikri", "Jama Masjid, Delhi"]
            },
            {
                id: "minaret",
                name: "Minaret",
                description: "A tall, slender tower, usually attached to a mosque or tomb.",
                function: "Used for the call to prayer (Adhan) and to enhance structural symmetry and verticality.",
                examples: ["Qutub Minar, Delhi", "Charminar, Hyderabad", "Taj Mahal Minarets"]
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

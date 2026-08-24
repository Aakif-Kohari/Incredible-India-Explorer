/**
 * Incredible India Explorer — Saura Painting Explorer
 * Data Repository (Issue #1690)
 */

window.SAURA_DATA = {
    symbols: [
        {
            id: "human-figure",
            glyph: "🧍",
            name: "Iconic Human Figure",
            meaning: "The signature motif of Saura art — simplified, stick-like human forms with round heads arranged in rows. These figures represent the Saura people themselves, their ancestors, or the spirits of the forest. The number and arrangement of figures tells the story's scale.",
            significance: "Each figure is painted freehand, with slight variations in posture to indicate activity — dancing, farming, hunting, or ritual. The figures are always painted in profile or frontal pose, never in three-quarter view."
        },
        {
            id: "tree-of-life",
            glyph: "🌳",
            name: "Tree of Life (JheNtana)",
            meaning: "The Tree of Life is the axis mundi in Saura cosmology — the connection between the underworld, the earth, and the heavens. It is often painted as a large, centrally-placed motif with human figures gathered around it.",
            significance: "The tree represents fertility, sustenance, and the cycle of life. Birds, monkeys, and spirits are shown living in its branches. The roots reach into the ancestral world."
        },
        {
            id: "sun-moon",
            glyph: "☀️",
            name: "Sun & Moon (Buru & Chando)",
            meaning: "The sun (Buru) and moon (Chando) are painted as circles with radiating lines. They represent the cosmic order, the passage of time, and the duality of day and night. They appear at the top of paintings to frame the narrative.",
            significance: "The Saura believe celestial bodies are deities who watch over human affairs. The sun is associated with male energy and the moon with female energy."
        },
        {
            id: "fish-scale",
            glyph: "🐟",
            name: "Fish-Scale Border (MachhKata)",
            meaning: "A repeating triangular/scalloped border pattern resembling fish scales. This is the most recognizable decorative element of Saura art and frames every painting.",
            significance: "The border serves both a decorative and a protective function — it is believed to contain the sacred narrative within its boundary and keep evil spirits out. The pattern may originate from the tribe's riverine traditions."
        },
        {
            id: "deity-figure",
            glyph: "🙏",
            name: "Deity Figure (Idital)",
            meaning: "Larger, more elaborately decorated figures representing Saura deities such as Idital (the supreme deity), Mahaprabhu, or ancestral spirits. These figures are always larger than the human figures and are placed in the center or top of the painting.",
            significance: "The Idital figure is the focal point of a ritual painting. The Saura shaman (Kudan) communicates with the deity through the painted image, offering rice beer and animal sacrifices."
        },
        {
            id: "horse-rider",
            glyph: "🐎",
            name: "Horse & Rider",
            meaning: "Horses with riders are symbols of power, movement, and the spirit world. In Saura mythology, ancestral spirits ride horses through the forest at night. Horse-and-rider motifs are painted during funeral ceremonies to guide the deceased's spirit.",
            significance: "The horse is not native to the Saura hills — its presence in the art symbolizes contact with the outside world and the mythic power of warriors who once rode."
        },
        {
            id: "peacock",
            glyph: "🦚",
            name: "Peacock (Mayur)",
            meaning: "The peacock is a symbol of beauty, divine favor, and the monsoon. Its feathers are believed to ward off evil. In Saura paintings, peacocks are often shown near water sources or at the base of the Tree of Life.",
            significance: "The peacock's iridescent tail is rendered with dots and dashes of color, echoing the signature Saura fill technique."
        },
        {
            id: "elephant",
            glyph: "🐘",
            name: "Elephant (Gaja)",
            meaning: "The elephant symbolizes royalty, strength, and the forest's majesty. Elephant motifs are painted during harvest festivals to celebrate the abundance of the forest and the power of the earth deity.",
            significance: "Unlike the small human figures, elephants are painted large and with elaborate patterning — their bodies fill with dots, lines, and cross-hatches that signify spiritual potency."
        }
    ],

    gallery: [
        {
            id: "harvest-festival",
            title: "Harvest Festival Celebration",
            emoji: "🌾",
            description: "A wall painting depicting the post-harvest festival of Magha Parab. Human figures are shown dancing in rows, carrying grain baskets, and offering rice beer to the deity. The Tree of Life anchors the composition.",
            palette: "Earth red, white, and black on ochre wall"
        },
        {
            id: "wedding-procession",
            title: "Wedding Procession",
            emoji: "💒",
            description: "A narrative painting showing a Saura wedding procession. The bride and groom are the two largest figures, flanked by musicians and family. The fish-scale border frames the entire scene.",
            palette: "White and red with black outlines"
        },
        {
            id: "hunting-scene",
            title: "Forest Hunt",
            emoji: "🏹",
            description: "Hunters with bows and arrows pursue deer and wild boar through a stylized forest. The animals are painted with the same dotted fill technique as the humans, blurring the line between the natural and spiritual worlds.",
            palette: "Black and ochre on white-washed wall"
        },
        {
            id: "funeral-rite",
            title: "Ancestral Spirit Journey",
            emoji: "🕯️",
            description: "A funeral painting showing horse riders guiding the deceased's spirit to the ancestor world. The sun and moon watch from above, and the fish-scale border is doubled for extra protection.",
            palette: "White and red — the colors of transition"
        },
        {
            id: "deity-propitiation",
            title: "Idital Deity Propitiation",
            emoji: "🛕",
            description: "A ritual painting centered on a large Idital deity figure. The shaman (Kudan) is shown offering rice beer, and small human figures kneel in supplication. This is the most sacred type of Saura painting.",
            palette: "Earth red on white ground"
        },
        {
            id: "daily-life",
            title: "Daily Village Life",
            emoji: "🏡",
            description: "A panoramic painting showing the full cycle of daily Saura life — women drawing water, children playing, men tending to fields, and elders sitting in council. The composition reads left-to-right like a scroll.",
            palette: "Multi-color with charcoal outlines"
        }
    ],

    palette: [
        { name: "Earth Red (Geru)", hex: "#a0522d", source: "Laterite soil mixed with tree sap", significance: "The primary color representing life, blood, and the earth mother" },
        { name: "White (Dhapan)", hex: "#f5f0e1", source: "River clay / limestone powder", significance: "Purity, the spirit world, and ancestral presence" },
        { name: "Black (Kari)", hex: "#1a1a1a", source: "Charcoal from specific forest woods", significance: "The underworld, protection, and the unknown" },
        { name: "Ochre Yellow", hex: "#cc7722", source: "Ochre earth from hill slopes", significance: "Fertility, turmeric, and the harvest" },
        { name: "Green (Sag)", hex: "#4a7c59", source: "Leaf juice mixed with soil binder", significance: "The forest, growth, and nature's bounty" }
    ],

    materials: [
        {
            name: "Bamboo Brush (Lekhani)",
            desc: "Thin bamboo twigs chewed at one end to create a fine point. The Saura artist holds the twig between the thumb and forefinger and paints with rapid, confident strokes.",
            icon: "🖌️"
        },
        {
            name: "Finger Painting",
            desc: "Many Saura paintings — especially the fill patterns (dots, dashes) inside figures — are applied directly with the fingers. The thumb is used for larger dots, and the little finger for fine lines.",
            icon: "✋"
        },
        {
            name: "Mud Wall Canvas (Italu)",
            desc: "The traditional canvas is the inner wall of a Saura home, made of mud and wattle plastered with cow dung and white clay. The wall is prepared by smoothing it with a flat stone before painting.",
            icon: "🏠"
        },
        {
            name: "Natural Pigments",
            desc: "All colors are derived from the Saura landscape: red from laterite soil, white from river clay, black from burnt wood, and yellow from ochre. The binder is often tree sap or rice water.",
            icon: "🎨"
        },
        {
            name: "Rice Paste (Pitha)",
            desc: "Liquid rice paste is used as both a white pigment and a binder for other colors. It is also applied as a preliminary sketch outline before the final pigments are laid down.",
            icon: "🍚"
        },
        {
            name: "Modern Canvas",
            desc: "Contemporary Saura artists now paint on handmade paper, canvas, and silk, using acrylic and natural pigments. This transition has made the art form portable and commercially viable for tribal artists.",
            icon: "🖼️"
        }
    ],

    quiz: [
        {
            question: "Which Indian state is the primary home of the Saura tribe and their painting tradition?",
            options: ["Madhya Pradesh", "Odisha", "Jharkhand", "Chhattisgarh"],
            answer: 1,
            explanation: "The Saura (Lanjia Saura) tribe lives in the Eastern Ghats of Odisha, primarily in the Rayagada and Gajapati districts."
        },
        {
            question: "What is the signature decorative border pattern in Saura paintings?",
            options: ["Geometric triangles", "Fish-scale (MachhKata)", "Wavy lines", "Dot mandalas"],
            answer: 1,
            explanation: "The fish-scale border (MachhKata) is the most recognizable framing element — it is believed to contain the sacred narrative and keep evil spirits out."
        },
        {
            question: "What natural pigment produces the earth-red color in Saura art?",
            options: ["Turmeric root", "Laterite soil (Geru)", "Burnt wood", "Indigo leaves"],
            answer: 1,
            explanation: "Earth red (Geru) comes from laterite soil, which is abundant in the Saura homeland. It is mixed with tree sap for adhesion."
        },
        {
            question: "What does the large, centrally-placed deity figure in a Saura painting represent?",
            options: ["The village chief", "A war hero", "The deity Idital", "A forest animal"],
            answer: 2,
            explanation: "The Idital figure is the supreme deity in Saura cosmology. The shaman (Kudan) communicates with the deity through the painted image during rituals."
        },
        {
            question: "What traditional tool does a Saura artist use to paint the fine outlines?",
            options: ["Squirrel-hair brush", "Bamboo twig (Lekhani)", "Palm leaf strip", "Iron stylus"],
            answer: 1,
            explanation: "A chewed bamboo twig (Lekhani) creates the fine lines, while dots and fill patterns are applied with the fingers."
        }
    ],

    references: [
        { title: "Tribal Art of India — Saura Painting (IGNCA)", url: "https://ignca.gov.in/", note: "Indira Gandhi National Centre for the Arts archive on Saura wall paintings." },
        { title: "Odisha State Tribal Museum", url: "https://stscodisha.nic.in/", note: "SCSTRTI (Scheduled Castes and Scheduled Tribes Research and Training Institute) exhibits on Lanjia Saura art." },
        { title: "GI Tag Registry — Saura Painting", url: "https://www.ipindia.gov.in/", note: "Official Geographical Indication registration for Saura painting." },
        { title: "Elwin, Verrier (1951). 'The Tribal World of Verrier Elwin'", url: "https://en.wikipedia.org/wiki/Verrier_Elwin", note: "Early anthropological documentation of Saura wall paintings and their ritual context." },
        { title: "UNESCO Intangible Cultural Heritage — Tribal Art of India", url: "https://ich.unesco.org/", note: "Context on the preservation of tribal wall painting traditions in India." }
    ]
};

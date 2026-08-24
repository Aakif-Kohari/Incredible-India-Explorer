// Regional Thalis Data & SVG Definitions

const THALI_DATA = {
    // ----------------- GUJARATI THALI -----------------
    gujarati: {
        title: "Gujarati Thali",
        description: "A harmonious blend of sweet, spicy, and tangy flavors, typically entirely vegetarian.",
        state: "Gujarat",
        mapCoordinates: { x: 18, y: 48 },
        servingTradition: "Served with unlimited refills at most thali restaurants; small katoris (bowls) of dal, kadhi, and shaak are arranged around a central mound of rice and roti, so every flavor — sweet, salty, spicy, and tangy — is tasted in balance across the meal.",
        festivalConnection: "Undhiyu, a mixed-vegetable dish slow-cooked in earthen pots, is closely tied to Uttarayan (Makar Sankranti) in January, when it's traditionally prepared with fresh winter vegetables.",
        culturalSignificance: "The thali's all-vegetarian, sweet-leaning profile reflects the strong Jain and Vaishnav influence across Gujarat, while its generous, ever-refilled servings embody the region's well-known trading-community hospitality.",
        svgId: "gujarati-svg",
        dishes: {
            "kadhi": {
                name: "Gujarati Kadhi",
                ingredients: ["Yogurt", "Gram flour", "Curry leaves", "Mustard seeds", "Jaggery"],
                description: "A mildly spiced, sweet and tangy yogurt-based curry, essential to any Gujarati meal."
            },
            "dhokla": {
                name: "Khaman Dhokla",
                ingredients: ["Gram flour", "Curd", "Green chilies", "Mustard seeds"],
                description: "A soft, spongy, and savory steamed snack made from fermented batter."
            },
            "roti": {
                name: "Phulka / Roti",
                ingredients: ["Whole wheat flour", "Water", "Ghee (clarified butter)"],
                description: "Soft, puffed Indian flatbreads, typically smeared with ghee."
            },
            "shaak": {
                name: "Undhiyu (Mixed Veg Shaak)",
                ingredients: ["Potatoes", "Brinjal", "Muthiya", "Surti Papdi", "Spices"],
                description: "A traditional mixed vegetable dish, slow-cooked with aromatic spices."
            },
            "dal": {
                name: "Khatti Meethi Dal",
                ingredients: ["Toor dal (pigeon peas)", "Jaggery", "Kokum", "Spices"],
                description: "A signature sweet and sour lentil soup."
            },
            "rice": {
                name: "Steamed Rice",
                ingredients: ["Basmati rice", "Water"],
                description: "Plain steamed white rice to balance the flavors of dal and kadhi."
            }
        }
    },

    // ----------------- BENGALI THALI -----------------
    bengali: {
        title: "Bengali Thali",
        description: "Known for subtle yet fiery flavors, heavy use of mustard oil, and a balance of vegetarian and non-vegetarian dishes.",
        state: "West Bengal",
        mapCoordinates: { x: 72, y: 42 },
        servingTradition: "Traditionally served course by course rather than all at once — a bitter shukto starter, then dal, then vegetable and fish curries, and finally chutney and mishti (sweets) — following a deliberate sequence from bitter to sweet.",
        festivalConnection: "Elaborate Bengali thalis with multiple fish preparations mark Poila Boishakh (Bengali New Year) and Durga Puja, when families and community feasts (bhog) centre on machh-bhaat (fish and rice).",
        culturalSignificance: "Fish and rice sit at the heart of Bengali identity, captured in the phrase 'machhe bhate bangali,' and the thali's course-by-course structure reflects a broader Bengali food culture that treats a meal as a considered progression of flavors.",
        svgId: "bengali-svg",
        dishes: {
            "luchi": {
                name: "Luchi",
                ingredients: ["Refined flour (Maida)", "Oil", "Water", "Salt"],
                description: "Deep-fried, puffed flatbreads that are soft and flaky."
            },
            "chholar-dal": {
                name: "Chholar Dal",
                ingredients: ["Chana dal", "Coconut bits", "Cumin", "Ghee"],
                description: "A slightly sweet and thick lentil dish tempered with spices and garnished with fried coconut."
            },
            "begun-bhaja": {
                name: "Begun Bhaja",
                ingredients: ["Eggplant", "Turmeric", "Mustard oil", "Salt"],
                description: "Thick slices of eggplant marinated in spices and shallow fried."
            },
            "machher-jhol": {
                name: "Machher Jhol",
                ingredients: ["Fish (Rohu/Katla)", "Mustard oil", "Potatoes", "Tomatoes", "Spices"],
                description: "A traditional, spicy fish curry that is a staple in a Bengali meal."
            },
            "rice": {
                name: "Bhaat (Rice)",
                ingredients: ["White rice", "Water"],
                description: "Steamed rice, the primary canvas for all the curries."
            },
            "rosogolla": {
                name: "Rosogolla",
                ingredients: ["Chenna (cottage cheese)", "Sugar syrup"],
                description: "Spongy, sweet cheese balls soaked in a light sugar syrup."
            }
        }
    },

    // ----------------- RAJASTHANI THALI -----------------
    rajasthani: {
        title: "Rajasthani Thali",
        description: "Rich, vibrant, and incredibly flavorful, heavily reliant on ghee, dairy, and spices suited for arid climates.",
        state: "Rajasthan",
        mapCoordinates: { x: 25, y: 32 },
        servingTradition: "Baati is served hot and cracked open at the table, doused generously in ghee, alongside dal and churma; buttermilk (chaas) is poured throughout the meal to counter the desert heat and the richness of the ghee.",
        festivalConnection: "Dal Baati Churma is the centrepiece of festive and wedding meals across Rajasthan, and is prepared in large batches during Teej and Gangaur, two major Rajasthani festivals celebrating monsoon and marital harmony.",
        culturalSignificance: "Born of the Thar Desert's scarce water and fresh produce, the thali's reliance on ghee, dried lentils, and hardy desert vegetables like ker and sangri reflects centuries of adaptation to an arid climate, alongside the region's famed Marwari hospitality.",
        svgId: "rajasthani-svg",
        dishes: {
            "dal": {
                name: "Panchmel Dal",
                ingredients: ["Mix of 5 lentils", "Ghee", "Spices"],
                description: "A protein-rich lentil dish made from five varieties of dal, tempered with generous ghee."
            },
            "baati": {
                name: "Baati",
                ingredients: ["Whole wheat flour", "Semolina", "Ghee", "Salt"],
                description: "Hard, unleavened bread balls baked over coals and dipped in ghee."
            },
            "churma": {
                name: "Churma",
                ingredients: ["Crushed baati", "Jaggery or Sugar", "Ghee", "Nuts"],
                description: "A sweet delicacy made by crushing unsalted baati and mixing it with ghee and sugar."
            },
            "gatte": {
                name: "Gatte ki Sabzi",
                ingredients: ["Gram flour (Besan)", "Yogurt", "Spices"],
                description: "Gram flour dumplings cooked in a spicy and tangy yogurt curry."
            },
            "ker-sangri": {
                name: "Ker Sangri",
                ingredients: ["Desert berries (Ker)", "Desert beans (Sangri)", "Mustard oil", "Spices"],
                description: "A traditional, tangy dry sabzi made from indigenous desert plants."
            },
            "garlic-chutney": {
                name: "Lehesun ki Chutney",
                ingredients: ["Garlic", "Red chilies", "Oil"],
                description: "A fiery, vibrant red chutney that adds a massive punch of flavor."
            }
        }
    },

    // ----------------- SOUTH INDIAN THALI -----------------
    "south-indian": {
        title: "South Indian Thali (Meals)",
        description: "Served traditionally on a banana leaf, featuring a sequence of rice-based courses with diverse gravies.",
        state: "Tamil Nadu",
        mapCoordinates: { x: 48, y: 88 },
        servingTradition: "Dishes follow a set arrangement on the banana leaf — rice in the centre, sambar and rasam poured in turn over successive rice portions, curries and poriyal along the top edge, and a sweet payasam in the top-right corner — eaten seated, traditionally with the right hand.",
        festivalConnection: "A full banana-leaf 'meals' thali is served at Pongal, Tamil Nadu's harvest festival, where freshly harvested rice and jaggery-based sweet Pongal mark the occasion, and at temple festivals as prasadam.",
        culturalSignificance: "Serving food on a banana leaf — still common at temples and weddings — reflects an old South Indian practice of eating on biodegradable, easily disposed leaf plates, and the sequential rice-and-gravy structure mirrors a meal built for digestion in a hot, humid climate.",
        svgId: "south-indian-svg",
        dishes: {
            "rice": {
                name: "Ponni Rice",
                ingredients: ["Parboiled rice", "Water"],
                description: "A fluffy, short-grain rice that forms the base of the meal."
            },
            "sambar": {
                name: "Sambar",
                ingredients: ["Toor dal", "Tamarind", "Mixed vegetables", "Sambar powder"],
                description: "A robust, tangy, and spicy lentil stew packed with vegetables."
            },
            "rasam": {
                name: "Rasam",
                ingredients: ["Tamarind juice", "Tomatoes", "Black pepper", "Cumin"],
                description: "A thin, spicy, and tangy soup, excellent for digestion."
            },
            "poriyal": {
                name: "Poriyal",
                ingredients: ["Chopped vegetables", "Grated coconut", "Mustard seeds", "Urad dal"],
                description: "A dry vegetable stir-fry garnished generously with fresh coconut."
            },
            "papadum": {
                name: "Papadum (Appalam)",
                ingredients: ["Lentil flour", "Oil for frying"],
                description: "A crispy, thin, deep-fried disc served as a crunchy accompaniment."
            },
            "payasam": {
                name: "Payasam",
                ingredients: ["Milk", "Jaggery or Sugar", "Vermicelli or Rice", "Cashews"],
                description: "A rich, sweet pudding served as dessert to conclude the meal."
            }
        }
    },

    // ----------------- PUNJABI THALI -----------------
    punjabi: {
        title: "Punjabi Thali",
        description: "Hearty and generous, built around wheat, dairy, and robust spicing that reflects Punjab's farming heartland.",
        state: "Punjab",
        mapCoordinates: { x: 32, y: 18 },
        servingTradition: "Served with a large dollop of white butter or ghee melting over the dal and roti, and always accompanied by a tall glass of lassi; portions are generous, reflecting Punjab's reputation for open-handed hospitality.",
        festivalConnection: "Sarson da Saag with Makki di Roti is closely associated with Lohri and Baisakhi, the winter bonfire and harvest festivals that mark the mustard and wheat seasons in Punjab.",
        culturalSignificance: "The thali's richness in wheat, dairy, and butter mirrors Punjab's identity as India's breadbasket, and its generous, come-again-for-more serving style echoes the community langar tradition of Sikh gurdwaras, where a full free meal is offered to all visitors.",
        svgId: "punjabi-svg",
        dishes: {
            "dal-makhani": {
                name: "Dal Makhani",
                ingredients: ["Black lentils", "Kidney beans", "Butter", "Cream", "Tomato"],
                description: "Slow-simmered black lentils finished with butter and cream for a rich, velvety curry."
            },
            "sarson-saag": {
                name: "Sarson da Saag",
                ingredients: ["Mustard greens", "Spinach", "Maize flour", "Ginger", "Garlic"],
                description: "A slow-cooked mustard-greens curry, traditionally paired with maize flatbread."
            },
            "makki-roti": {
                name: "Makki di Roti",
                ingredients: ["Maize flour", "Water", "Butter"],
                description: "A rustic, hand-pressed flatbread made from maize flour, eaten with saag and butter."
            },
            "paneer": {
                name: "Paneer Makhani",
                ingredients: ["Paneer (cottage cheese)", "Tomato", "Cream", "Butter", "Spices"],
                description: "Cubes of soft cottage cheese in a rich, buttery tomato gravy."
            },
            "chole": {
                name: "Pindi Chole",
                ingredients: ["Chickpeas", "Tea leaves (for colour)", "Pomegranate seed powder", "Spices"],
                description: "A dark, tangy chickpea curry from Rawalpindi, distinctively spiced and slow-cooked."
            },
            "lassi": {
                name: "Lassi",
                ingredients: ["Yogurt", "Water or milk", "Sugar"],
                description: "A thick, chilled yogurt drink served in a tall glass to round off the meal."
            }
        }
    },

    // ----------------- MAHARASHTRIAN THALI -----------------
    maharashtrian: {
        title: "Maharashtrian Thali",
        description: "A vibrant mix of mild and fiery dishes built around jowar and bajra flatbreads, showcasing the state's signature goda masala spice blend.",
        state: "Maharashtra",
        mapCoordinates: { x: 28, y: 58 },
        servingTradition: "Traditionally plated with condiments and salads on the left, rice in the centre, breads at the bottom, and curries and dals on the right — a deliberate arrangement that balances the plate visually as well as nutritionally.",
        festivalConnection: "Puran Poli, a sweet lentil-stuffed flatbread, is the signature dish of Gudi Padwa (the Maharashtrian New Year), while modak — a steamed rice-flour dumpling — is offered during Ganesh Chaturthi.",
        culturalSignificance: "The thali's blend of coastal Konkan influences (coconut, seafood) and inland Deccan flavors (millets, tur dal, goda masala) reflects Maharashtra's geographic diversity, from the Arabian Sea coast to the Deccan plateau.",
        svgId: "maharashtrian-svg",
        dishes: {
            "bhakri": {
                name: "Jowar Bhakri",
                ingredients: ["Sorghum (jowar) flour", "Water", "Salt"],
                description: "A hand-patted, unleavened millet flatbread, a Maharashtrian staple over wheat roti."
            },
            "amti": {
                name: "Varan-Amti",
                ingredients: ["Toor dal", "Goda masala", "Tamarind", "Jaggery"],
                description: "A mildly sweet-and-sour lentil curry spiced with Maharashtra's distinctive goda masala blend."
            },
            "bharli-vangi": {
                name: "Bharli Vangi",
                ingredients: ["Small eggplants", "Peanuts", "Coconut", "Goda masala"],
                description: "Baby eggplants stuffed with a spiced peanut-coconut filling and slow-cooked."
            },
            "pitla": {
                name: "Pitla",
                ingredients: ["Gram flour (besan)", "Onion", "Green chili", "Garlic"],
                description: "A quick, thick gram-flour curry, a humble everyday staple across rural Maharashtra."
            },
            "kothimbir-vadi": {
                name: "Kothimbir Wadi",
                ingredients: ["Gram flour", "Coriander leaves", "Sesame seeds", "Spices"],
                description: "Steamed-then-fried coriander and gram-flour cutlets, a popular savory snack."
            },
            "puran-poli": {
                name: "Puran Poli",
                ingredients: ["Chana dal", "Jaggery", "Whole wheat flour", "Ghee", "Cardamom"],
                description: "A sweet flatbread stuffed with jaggery-lentil filling, central to festive Maharashtrian meals."
            }
        }
    },

    // ----------------- KERALA SADYA -----------------
    "kerala-sadya": {
        title: "Kerala Sadya",
        description: "A grand, entirely vegetarian banana-leaf feast built on Ayurvedic principles of balancing all six tastes in one meal.",
        state: "Kerala",
        mapCoordinates: { x: 38, y: 90 },
        servingTradition: "Served in a fixed order on a banana leaf placed narrow-end to the diner's left: rice takes the centre, with pickles and chips at the top, curries added in sequence around the rice, and payasam served last in a small bowl or directly onto the leaf.",
        festivalConnection: "The Sadya is inseparable from Onam, Kerala's harvest festival, when a full ceremonial version can run to 26 or more dishes; a simpler Sadya is also served at Vishu and temple festivals.",
        culturalSignificance: "Rooted in Ayurvedic food philosophy, the Sadya is designed to balance sweet, sour, salty, bitter, pungent, and astringent tastes within a single meal, and its shared banana-leaf seating is treated as an act of communal hospitality regardless of caste or status.",
        svgId: "kerala-sadya-svg",
        dishes: {
            "rice": {
                name: "Kerala Matta Rice",
                ingredients: ["Parboiled red rice"],
                description: "Nutty, reddish-brown rice that forms the base of the Sadya, served with a dollop of ghee."
            },
            "sambar": {
                name: "Sambar",
                ingredients: ["Toor dal", "Mixed vegetables", "Tamarind", "Coconut", "Sambar powder"],
                description: "A coconut-enriched lentil stew tempered with mustard seeds and curry leaves."
            },
            "avial": {
                name: "Avial",
                ingredients: ["Mixed vegetables", "Coconut", "Yogurt", "Curry leaves", "Coconut oil"],
                description: "A thick medley of vegetables in a coconut-yogurt gravy, a Sadya centrepiece."
            },
            "thoran": {
                name: "Thoran",
                ingredients: ["Shredded vegetables (often cabbage or beans)", "Grated coconut", "Mustard seeds"],
                description: "A dry, coconut-flecked stir-fried vegetable dish."
            },
            "pachadi": {
                name: "Pachadi",
                ingredients: ["Yogurt", "Coconut", "Cucumber or pineapple", "Mustard seeds"],
                description: "A sweet-tart yogurt-based side that cools the palate between spicier dishes."
            },
            "payasam": {
                name: "Payasam",
                ingredients: ["Rice or vermicelli", "Milk or coconut milk", "Jaggery", "Cashews", "Cardamom"],
                description: "A rich milk-and-jaggery pudding served last, marking the close of the feast."
            }
        }
    },

    // ----------------- ASSAMESE THALI -----------------
    assamese: {
        title: "Assamese Thali",
        description: "A clean, mildly spiced meal centred on fresh, local ingredients, mustard oil, and the distinctive tang of khar and tenga preparations.",
        state: "Assam",
        mapCoordinates: { x: 85, y: 38 },
        servingTradition: "Traditionally served in bell-metal utensils (kahi and bati), the meal follows a set order — khar first to aid digestion, then rice with fish or meat curries, and a sour tenga to close, all eaten with the right hand.",
        festivalConnection: "Pitha (rice cakes) and laru (coconut or til sweets) are prepared in abundance for Bihu, Assam's major harvest and New Year festival celebrated three times a year.",
        culturalSignificance: "The thali's emphasis on minimal spicing and fresh, foraged ingredients like banana-skin ash reflects Assam's lush river-valley ecology, and its use of bell-metal serving ware connects to Assam's historic Sarthebari brass and bell-metal craft tradition.",
        svgId: "assamese-svg",
        dishes: {
            "khar": {
                name: "Khar",
                ingredients: ["Raw papaya", "Lentils", "Alkaline filtrate of banana-skin ash"],
                description: "A distinctive alkaline curry that traditionally opens an Assamese meal, believed to aid digestion."
            },
            "tenga": {
                name: "Masor Tenga",
                ingredients: ["Fish (often rohu)", "Tomato or lemon", "Elephant apple", "Mustard oil"],
                description: "A light, tangy fish curry that traditionally closes the meal on a sour note."
            },
            "poitabhat": {
                name: "Poita Bhat",
                ingredients: ["Cooked rice (soaked overnight)", "Mustard oil", "Onion", "Green chili"],
                description: "Fermented overnight rice, garnished simply and eaten as a refreshing dish, especially in summer."
            },
            "pitika": {
                name: "Aloo Pitika",
                ingredients: ["Boiled potato", "Mustard oil", "Onion", "Green chili", "Coriander"],
                description: "A simply mashed potato dish seasoned with raw mustard oil, a comfort-food staple."
            },
            "bor": {
                name: "Bor (Fritters)",
                ingredients: ["Gram flour or rice flour", "Vegetables", "Oil"],
                description: "Light, crisp fritters served as a side to add texture to the meal."
            },
            "laru": {
                name: "Narikolor Laru",
                ingredients: ["Grated coconut", "Jaggery", "Cardamom"],
                description: "Sweet coconut-jaggery balls, a festive treat especially associated with Bihu."
            }
        }
    }
};

/* --- SVG STRINGS --- */
// Storing SVGs here ensures they work in a file:// environment without CORS fetch issues.
const SVG_TEMPLATES = {
    gujarati: `
        <svg viewBox="0 0 400 400" id="gujarati-svg" class="thali-svg" aria-label="Gujarati Thali Illustration">
            <!-- Thali Plate -->
            <circle cx="200" cy="200" r="180" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="8"/>
            <circle cx="200" cy="200" r="170" fill="#f5f5f5"/>
            
            <!-- Dishes -->
            <g id="kadhi" class="dish" tabindex="0" role="button" aria-label="Gujarati Kadhi">
                <circle cx="100" cy="120" r="40" fill="#fff9c4" stroke="#d4c673" stroke-width="4"/>
                <circle cx="100" cy="120" r="30" fill="#ffecb3"/>
                <text x="100" y="125" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#795548">Kadhi</text>
            </g>
            
            <g id="dal" class="dish" tabindex="0" role="button" aria-label="Khatti Meethi Dal">
                <circle cx="180" cy="80" r="40" fill="#ffe0b2" stroke="#d4a36a" stroke-width="4"/>
                <circle cx="180" cy="80" r="30" fill="#ffcc80"/>
                <text x="180" y="85" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#5d4037">Dal</text>
            </g>

            <g id="shaak" class="dish" tabindex="0" role="button" aria-label="Undhiyu (Mixed Veg)">
                <circle cx="280" cy="100" r="40" fill="#c8e6c9" stroke="#8cb38e" stroke-width="4"/>
                <circle cx="280" cy="100" r="30" fill="#a5d6a7"/>
                <text x="280" y="105" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#2e7d32">Shaak</text>
            </g>

            <g id="dhokla" class="dish" tabindex="0" role="button" aria-label="Khaman Dhokla">
                <circle cx="320" cy="190" r="40" fill="#fff9c4" stroke="#d4c673" stroke-width="4"/>
                <rect x="300" y="170" width="40" height="40" rx="4" fill="#ffeb3b"/>
                <text x="320" y="195" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#f57f17">Dhokla</text>
            </g>

            <g id="roti" class="dish" tabindex="0" role="button" aria-label="Roti">
                <circle cx="140" cy="250" r="50" fill="#ffe0b2" stroke="#d4a36a" stroke-width="2"/>
                <circle cx="150" cy="240" r="50" fill="#ffcc80" stroke="#d4a36a" stroke-width="2"/>
                <text x="145" y="245" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif" fill="#5d4037">Roti</text>
            </g>

            <g id="rice" class="dish" tabindex="0" role="button" aria-label="Steamed Rice">
                <ellipse cx="260" cy="280" rx="55" ry="40" fill="#ffffff" stroke="#e0e0e0" stroke-width="4"/>
                <ellipse cx="260" cy="275" rx="45" ry="30" fill="#fafafa"/>
                <text x="260" y="280" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif" fill="#555">Rice</text>
            </g>
        </svg>
    `,

    bengali: `
        <svg viewBox="0 0 400 400" id="bengali-svg" class="thali-svg" aria-label="Bengali Thali Illustration">
            <!-- Thali Plate -->
            <circle cx="200" cy="200" r="180" fill="#eceff1" stroke="#b0bec5" stroke-width="8"/>
            <circle cx="200" cy="200" r="170" fill="#ffffff"/>
            
            <g id="machher-jhol" class="dish" tabindex="0" role="button" aria-label="Machher Jhol">
                <circle cx="100" cy="120" r="45" fill="#ffccbc" stroke="#d88c75" stroke-width="4"/>
                <path d="M 80 120 Q 100 100 120 120 Q 100 140 80 120" fill="#d84315"/>
                <text x="100" y="145" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#bf360c">Fish</text>
            </g>
            
            <g id="chholar-dal" class="dish" tabindex="0" role="button" aria-label="Chholar Dal">
                <circle cx="180" cy="70" r="40" fill="#fff9c4" stroke="#d4c673" stroke-width="4"/>
                <circle cx="180" cy="70" r="30" fill="#fbc02d"/>
                <text x="180" y="75" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#f57f17">Dal</text>
            </g>

            <g id="begun-bhaja" class="dish" tabindex="0" role="button" aria-label="Begun Bhaja">
                <circle cx="280" cy="90" r="40" fill="#d1c4e9" stroke="#9685b8" stroke-width="4"/>
                <circle cx="280" cy="90" r="25" fill="#673ab7"/>
                <text x="280" y="95" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#fff">Begun</text>
            </g>

            <g id="rosogolla" class="dish" tabindex="0" role="button" aria-label="Rosogolla">
                <circle cx="330" cy="180" r="35" fill="#e0f7fa" stroke="#a3c5c9" stroke-width="4"/>
                <circle cx="320" cy="175" r="12" fill="#fff"/>
                <circle cx="340" cy="185" r="12" fill="#fff"/>
                <text x="330" y="210" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#006064">Sweet</text>
            </g>

            <g id="luchi" class="dish" tabindex="0" role="button" aria-label="Luchi">
                <circle cx="120" cy="240" r="45" fill="#fff3e0" stroke="#d2b89d" stroke-width="2"/>
                <circle cx="140" cy="220" r="45" fill="#ffe0b2" stroke="#d2b89d" stroke-width="2"/>
                <text x="130" y="235" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif" fill="#e65100">Luchi</text>
            </g>

            <g id="rice" class="dish" tabindex="0" role="button" aria-label="Steamed Rice">
                <ellipse cx="250" cy="280" rx="60" ry="45" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="4"/>
                <text x="250" y="285" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif" fill="#555">Bhaat</text>
            </g>
        </svg>
    `,

    rajasthani: `
        <svg viewBox="0 0 400 400" id="rajasthani-svg" class="thali-svg" aria-label="Rajasthani Thali Illustration">
            <!-- Thali Plate -->
            <circle cx="200" cy="200" r="180" fill="#f5e0c6" stroke="#c4a57b" stroke-width="8"/>
            <circle cx="200" cy="200" r="170" fill="#faf0e3"/>
            
            <g id="dal" class="dish" tabindex="0" role="button" aria-label="Panchmel Dal">
                <circle cx="90" cy="130" r="40" fill="#ffcc80" stroke="#cca264" stroke-width="4"/>
                <circle cx="90" cy="130" r="30" fill="#ef6c00"/>
                <text x="90" y="135" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#fff">Dal</text>
            </g>

            <g id="baati" class="dish" tabindex="0" role="button" aria-label="Baati">
                <circle cx="160" cy="240" r="45" fill="#fbc02d" stroke="#c49000" stroke-width="2"/>
                <circle cx="140" cy="260" r="45" fill="#f9a825" stroke="#c49000" stroke-width="2"/>
                <text x="150" y="255" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif" fill="#fff">Baati</text>
            </g>

            <g id="churma" class="dish" tabindex="0" role="button" aria-label="Churma">
                <circle cx="170" cy="80" r="40" fill="#ffe0b2" stroke="#cca264" stroke-width="4"/>
                <path d="M 145 80 L 195 80 L 170 60 Z" fill="#ffb300"/>
                <text x="170" y="95" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#e65100">Churma</text>
            </g>

            <g id="gatte" class="dish" tabindex="0" role="button" aria-label="Gatte ki Sabzi">
                <circle cx="270" cy="90" r="40" fill="#fff9c4" stroke="#c7b971" stroke-width="4"/>
                <circle cx="260" cy="85" r="10" fill="#fbc02d"/>
                <circle cx="280" cy="95" r="10" fill="#fbc02d"/>
                <text x="270" y="115" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#f57f17">Gatte</text>
            </g>

            <g id="ker-sangri" class="dish" tabindex="0" role="button" aria-label="Ker Sangri">
                <circle cx="320" cy="180" r="35" fill="#dcedc8" stroke="#9bb385" stroke-width="4"/>
                <rect x="305" y="175" width="30" height="5" fill="#558b2f"/>
                <circle cx="320" cy="170" r="4" fill="#33691e"/>
                <text x="320" y="200" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#33691e">Sabzi</text>
            </g>

            <g id="garlic-chutney" class="dish" tabindex="0" role="button" aria-label="Garlic Chutney">
                <circle cx="270" cy="270" r="30" fill="#ffcdd2" stroke="#c48f95" stroke-width="4"/>
                <circle cx="270" cy="270" r="20" fill="#c62828"/>
                <text x="270" y="274" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#fff">Chutney</text>
            </g>
        </svg>
    `,

    "south-indian": `
        <svg viewBox="0 0 400 400" id="south-indian-svg" class="thali-svg" aria-label="South Indian Meals Illustration">
            <!-- Banana Leaf -->
            <path d="M 20 200 C 50 50, 350 50, 380 200 C 350 350, 50 350, 20 200 Z" fill="#81c784" stroke="#4caf50" stroke-width="4"/>
            <path d="M 20 200 C 150 200, 250 200, 380 200" fill="none" stroke="#4caf50" stroke-width="2"/>
            
            <g id="rice" class="dish" tabindex="0" role="button" aria-label="Ponni Rice">
                <ellipse cx="200" cy="260" rx="80" ry="50" fill="#ffffff" stroke="#f0f0f0" stroke-width="4"/>
                <text x="200" y="265" text-anchor="middle" font-size="16" font-weight="bold" font-family="sans-serif" fill="#555">Rice</text>
            </g>

            <g id="sambar" class="dish" tabindex="0" role="button" aria-label="Sambar">
                <circle cx="100" cy="110" r="35" fill="#ffe0b2" stroke="#cca264" stroke-width="4"/>
                <circle cx="100" cy="110" r="25" fill="#f57c00"/>
                <text x="100" y="114" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#fff">Sambar</text>
            </g>

            <g id="rasam" class="dish" tabindex="0" role="button" aria-label="Rasam">
                <circle cx="180" cy="90" r="35" fill="#ffccbc" stroke="#d19c8f" stroke-width="4"/>
                <circle cx="180" cy="90" r="25" fill="#d84315"/>
                <text x="180" y="94" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#fff">Rasam</text>
            </g>

            <g id="poriyal" class="dish" tabindex="0" role="button" aria-label="Poriyal">
                <circle cx="260" cy="90" r="35" fill="#c8e6c9" stroke="#90af92" stroke-width="4"/>
                <circle cx="260" cy="90" r="25" fill="#4caf50"/>
                <text x="260" y="94" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#fff">Poriyal</text>
            </g>

            <g id="payasam" class="dish" tabindex="0" role="button" aria-label="Payasam">
                <circle cx="320" cy="140" r="30" fill="#fff9c4" stroke="#c7b971" stroke-width="4"/>
                <circle cx="320" cy="140" r="20" fill="#fff59d"/>
                <text x="320" y="144" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#f57f17">Sweet</text>
            </g>

            <g id="papadum" class="dish" tabindex="0" role="button" aria-label="Papadum">
                <circle cx="80" cy="200" r="40" fill="#ffecb3" stroke="#d4bb79" stroke-width="2"/>
                <text x="80" y="204" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#f57f17">Papad</text>
            </g>
        </svg>
    `,

    "punjabi": `
        <svg viewBox="0 0 400 400" id="punjabi-svg" class="thali-svg" aria-label="Punjabi Thali Illustration">
            <circle cx="200" cy="200" r="180" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="8"/>
            <circle cx="200" cy="200" r="170" fill="#f5f5f5"/>

            <g id="dal-makhani" class="dish" tabindex="0" role="button" aria-label="Dal Makhani">
                <ellipse cx="200" cy="260" rx="80" ry="50" fill="#4e342e" stroke="#3e2723" stroke-width="4"/>
                <text x="200" y="265" text-anchor="middle" font-size="13" font-weight="bold" font-family="sans-serif" fill="#fff">Dal Makhani</text>
            </g>

            <g id="sarson-saag" class="dish" tabindex="0" role="button" aria-label="Sarson da Saag">
                <circle cx="100" cy="110" r="38" fill="#c8e6c9" stroke="#7cb342" stroke-width="4"/>
                <circle cx="100" cy="110" r="27" fill="#33691e"/>
                <text x="100" y="114" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#fff">Saag</text>
            </g>

            <g id="makki-roti" class="dish" tabindex="0" role="button" aria-label="Makki di Roti">
                <circle cx="180" cy="85" r="36" fill="#fff9c4" stroke="#c7b971" stroke-width="4"/>
                <text x="180" y="89" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#f57f17">Roti</text>
            </g>

            <g id="paneer" class="dish" tabindex="0" role="button" aria-label="Paneer Makhani">
                <circle cx="270" cy="95" r="36" fill="#ffccbc" stroke="#e64a19" stroke-width="4"/>
                <circle cx="270" cy="95" r="24" fill="#f4511e"/>
                <text x="270" y="99" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Paneer</text>
            </g>

            <g id="chole" class="dish" tabindex="0" role="button" aria-label="Pindi Chole">
                <circle cx="320" cy="180" r="34" fill="#d7ccc8" stroke="#8d6e63" stroke-width="4"/>
                <circle cx="320" cy="180" r="23" fill="#5d4037"/>
                <text x="320" y="184" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Chole</text>
            </g>

            <g id="lassi" class="dish" tabindex="0" role="button" aria-label="Lassi">
                <rect x="255" y="250" width="34" height="44" rx="6" fill="#fffde7" stroke="#e6d97a" stroke-width="3"/>
                <text x="272" y="276" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#f57f17">Lassi</text>
            </g>
        </svg>
    `,

    "maharashtrian": `
        <svg viewBox="0 0 400 400" id="maharashtrian-svg" class="thali-svg" aria-label="Maharashtrian Thali Illustration">
            <circle cx="200" cy="200" r="180" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="8"/>
            <circle cx="200" cy="200" r="170" fill="#f5f5f5"/>

            <g id="bhakri" class="dish" tabindex="0" role="button" aria-label="Jowar Bhakri">
                <circle cx="200" cy="280" r="46" fill="#f5f5dc" stroke="#c7b971" stroke-width="4"/>
                <text x="200" y="284" text-anchor="middle" font-size="12" font-weight="bold" font-family="sans-serif" fill="#8d6e63">Bhakri</text>
            </g>

            <g id="amti" class="dish" tabindex="0" role="button" aria-label="Varan Amti">
                <circle cx="110" cy="120" r="38" fill="#ffe0b2" stroke="#f57c00" stroke-width="4"/>
                <circle cx="110" cy="120" r="27" fill="#ef6c00"/>
                <text x="110" y="124" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Amti</text>
            </g>

            <g id="bharli-vangi" class="dish" tabindex="0" role="button" aria-label="Bharli Vangi">
                <circle cx="190" cy="90" r="35" fill="#d1c4e9" stroke="#5e35b1" stroke-width="4"/>
                <circle cx="190" cy="90" r="24" fill="#4527a0"/>
                <text x="190" y="94" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Vangi</text>
            </g>

            <g id="pitla" class="dish" tabindex="0" role="button" aria-label="Pitla">
                <circle cx="270" cy="95" r="35" fill="#fff9c4" stroke="#c7b971" stroke-width="4"/>
                <circle cx="270" cy="95" r="24" fill="#fbc02d"/>
                <text x="270" y="99" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Pitla</text>
            </g>

            <g id="kothimbir-vadi" class="dish" tabindex="0" role="button" aria-label="Kothimbir Wadi">
                <circle cx="320" cy="170" r="32" fill="#c8e6c9" stroke="#43a047" stroke-width="4"/>
                <text x="320" y="174" text-anchor="middle" font-size="8" font-family="sans-serif" fill="#1b5e20">Wadi</text>
            </g>

            <g id="puran-poli" class="dish" tabindex="0" role="button" aria-label="Puran Poli">
                <circle cx="270" cy="270" r="34" fill="#ffe082" stroke="#ffa000" stroke-width="4"/>
                <text x="270" y="274" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#e65100">Poli</text>
            </g>
        </svg>
    `,

    "kerala-sadya": `
        <svg viewBox="0 0 400 400" id="kerala-sadya-svg" class="thali-svg" aria-label="Kerala Sadya Illustration">
            <path d="M 20 200 C 50 50, 350 50, 380 200 C 350 350, 50 350, 20 200 Z" fill="#81c784" stroke="#4caf50" stroke-width="4"/>
            <path d="M 20 200 C 150 200, 250 200, 380 200" fill="none" stroke="#4caf50" stroke-width="2"/>

            <g id="rice" class="dish" tabindex="0" role="button" aria-label="Kerala Matta Rice">
                <ellipse cx="200" cy="260" rx="80" ry="50" fill="#d7834b" stroke="#a85c2e" stroke-width="4"/>
                <text x="200" y="265" text-anchor="middle" font-size="13" font-weight="bold" font-family="sans-serif" fill="#fff">Matta Rice</text>
            </g>

            <g id="sambar" class="dish" tabindex="0" role="button" aria-label="Sambar">
                <circle cx="100" cy="110" r="35" fill="#ffe0b2" stroke="#cca264" stroke-width="4"/>
                <circle cx="100" cy="110" r="25" fill="#f57c00"/>
                <text x="100" y="114" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#fff">Sambar</text>
            </g>

            <g id="avial" class="dish" tabindex="0" role="button" aria-label="Avial">
                <circle cx="180" cy="90" r="35" fill="#dcedc8" stroke="#7cb342" stroke-width="4"/>
                <circle cx="180" cy="90" r="25" fill="#558b2f"/>
                <text x="180" y="94" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Avial</text>
            </g>

            <g id="thoran" class="dish" tabindex="0" role="button" aria-label="Thoran">
                <circle cx="260" cy="90" r="35" fill="#c8e6c9" stroke="#90af92" stroke-width="4"/>
                <circle cx="260" cy="90" r="25" fill="#2e7d32"/>
                <text x="260" y="94" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Thoran</text>
            </g>

            <g id="pachadi" class="dish" tabindex="0" role="button" aria-label="Pachadi">
                <circle cx="320" cy="140" r="30" fill="#fff9c4" stroke="#c7b971" stroke-width="4"/>
                <text x="320" y="144" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#f57f17">Pachadi</text>
            </g>

            <g id="payasam" class="dish" tabindex="0" role="button" aria-label="Payasam">
                <circle cx="80" cy="200" r="38" fill="#fff3e0" stroke="#d4bb79" stroke-width="2"/>
                <text x="80" y="204" text-anchor="middle" font-size="10" font-weight="bold" font-family="sans-serif" fill="#f57f17">Payasam</text>
            </g>
        </svg>
    `,

    "assamese": `
        <svg viewBox="0 0 400 400" id="assamese-svg" class="thali-svg" aria-label="Assamese Thali Illustration">
            <circle cx="200" cy="200" r="180" fill="#d7ccc8" stroke="#a1887f" stroke-width="8"/>
            <circle cx="200" cy="200" r="170" fill="#f5f5f5"/>

            <g id="poitabhat" class="dish" tabindex="0" role="button" aria-label="Poita Bhat">
                <ellipse cx="200" cy="260" rx="80" ry="50" fill="#ffffff" stroke="#e0e0e0" stroke-width="4"/>
                <text x="200" y="265" text-anchor="middle" font-size="12" font-weight="bold" font-family="sans-serif" fill="#555">Poita Bhat</text>
            </g>

            <g id="khar" class="dish" tabindex="0" role="button" aria-label="Khar">
                <circle cx="100" cy="110" r="36" fill="#dcedc8" stroke="#9ccc65" stroke-width="4"/>
                <circle cx="100" cy="110" r="25" fill="#7cb342"/>
                <text x="100" y="114" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#fff">Khar</text>
            </g>

            <g id="tenga" class="dish" tabindex="0" role="button" aria-label="Masor Tenga">
                <circle cx="180" cy="90" r="35" fill="#fff9c4" stroke="#c7b971" stroke-width="4"/>
                <circle cx="180" cy="90" r="24" fill="#fbc02d"/>
                <text x="180" y="94" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#fff">Tenga</text>
            </g>

            <g id="pitika" class="dish" tabindex="0" role="button" aria-label="Aloo Pitika">
                <circle cx="260" cy="90" r="35" fill="#fff3e0" stroke="#d4bb79" stroke-width="4"/>
                <text x="260" y="94" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#a1887f">Pitika</text>
            </g>

            <g id="bor" class="dish" tabindex="0" role="button" aria-label="Bor">
                <circle cx="320" cy="150" r="30" fill="#ffe0b2" stroke="#f57c00" stroke-width="4"/>
                <text x="320" y="154" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#e65100">Bor</text>
            </g>

            <g id="laru" class="dish" tabindex="0" role="button" aria-label="Narikolor Laru">
                <circle cx="270" cy="270" r="32" fill="#f5f5dc" stroke="#c7b971" stroke-width="4"/>
                <text x="270" y="274" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#8d6e63">Laru</text>
            </g>
        </svg>
    `
};

// Export to window if not using a module system
window.THALI_DATA = THALI_DATA;
window.SVG_TEMPLATES = SVG_TEMPLATES;
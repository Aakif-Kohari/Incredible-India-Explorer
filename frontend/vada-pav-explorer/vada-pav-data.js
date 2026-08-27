/**
 * Vada Pav Explorer Dataset
 * Structured historical, culinary, and street food telemetry for Vada Pav & Mumbai Street Food Explorer.
 */

const VADA_PAV_DATA = {
    title: "Vada Pav — Mumbai's Iconic Street Food",
    subtitle: "The spiced potato fritter in soft pav that fuels millions across Mumbai every day.",
    quickFacts: {
        creator: "Ashok Vaidya",
        originYear: "1966",
        originLocation: "Platform 1, Dadar Railway Station, Mumbai",
        culturalTag: "The Heartbeat & Grab-and-Go Pulse of Mumbai",
        priceRange: "₹15 – ₹35",
        keyComponents: "Batata Vada, Pav, Dry Garlic Chutney, Green Chutney, Fried Green Chili"
    },
    origins: {
        summary: "In 1966, Ashok Vaidya opened a humble food stall outside Dadar Railway Station in Mumbai. Looking for a convenient, affordable meal for hundreds of thousands of commuters and textile mill workers rushing between local trains, he placed a hot, spiced batata vada inside a sliced pav bread bun with a smear of dry garlic chutney.",
        historicalContext: "During the 1960s and 1970s, Mumbai was a thriving industrial hub dominated by textile mills in Girangaon. The closure of textile mills in subsequent decades saw many former workers transition into street food vending. The Shiv Sena political party also actively encouraged local Marathi food stalls during this period, turning Vada Pav into a symbol of local Mumbai identity.",
        reliabilityNote: "While oral street history sometimes attributes early variants to vendor Sudhakar Mhatre in Kalyan around 1967, Ashok Vaidya's Dadar stall is widely documented in culinary archives as the birthplace of the commercial street Vada Pav."
    },
    ingredients: [
        {
            name: "Batata Vada",
            role: "Spiced Potato Fritter Core",
            desc: "Boiled potatoes mashed with turmeric, mustard seeds, curry leaves, green chilies, ginger, garlic, and fresh coriander; coated in chickpea flour (besan) batter seasoned with ajwain and deep-fried until crisp.",
            icon: "🧆"
        },
        {
            name: "Pav",
            role: "Soft Bakery Bun",
            desc: "A soft, fluffy square white bread roll introduced to Mumbai by 18th-century Portuguese bakers (pão) using yeast/hop fermentation.",
            icon: "🍞"
        },
        {
            name: "Dry Garlic Chutney",
            role: "Fiery Crimson Spice Powder",
            desc: "Known as 'Sukhi Lahsun Chutney', made by roasting whole garlic cloves with dried coconut (copra), Kashmiri red chilies, roasted peanuts, and salt.",
            icon: "🧄"
        },
        {
            name: "Green Chutney",
            role: "Fresh Herb Dip",
            desc: "Zesty green sauce blended from fresh coriander, mint leaves, green chilies, lemon juice, and roasted cumin powder.",
            icon: "🌿"
        },
        {
            name: "Salted Fried Green Chili",
            role: "Fiery Accompaniment",
            desc: "Whole green chili slit, lightly flash-fried in hot oil, tossed with sea salt, and served alongside for extra heat.",
            icon: "🌶️"
        },
        {
            name: "Sweet Tamarind Chutney",
            role: "Tangy Contrast (Optional)",
            desc: "Sweet and tangy sauce cooked from tamarind pulp, jaggery (gur), black salt, and roasted cumin.",
            icon: "🍯"
        }
    ],
    preparationSteps: [
        {
            stepNumber: 1,
            title: "Tempering & Potato Masala",
            desc: "Heat oil, crackle mustard seeds and curry leaves, then sauté finely minced garlic, ginger, and green chilies. Stir in turmeric powder and fold in boiled mashed potatoes with fresh coriander and salt."
        },
        {
            stepNumber: 2,
            title: "Shaping the Vada",
            desc: "Allow the potato mixture to cool slightly, then roll into uniform, smooth round spheres (batata vadas) about the size of a golf ball."
        },
        {
            stepNumber: 3,
            title: "Batter & Deep Frying",
            desc: "Whisk chickpea flour (besan), turmeric, pinch of asafoetida (hing), carom seeds (ajwain), and water into a thick, smooth batter. Dip each potato ball to coat evenly and deep fry in hot oil until golden-yellow and crisp."
        },
        {
            stepNumber: 4,
            title: "Pav Preparation & Chutney Slicing",
            desc: "Slice the soft pav roll horizontally while keeping one edge intact. Generously smear fiery dry red garlic chutney on the bottom and green mint chutney on the top inside."
        },
        {
            stepNumber: 5,
            title: "Assembly & Hot Serving",
            desc: "Place the piping-hot batata vada inside the seasoned pav, press down gently so the vada flattens slightly to absorb the chutneys, and serve immediately with a salted fried green chili."
        }
    ],
    streetCulture: {
        headline: "The Everyday Fuel of Maximum City",
        details: [
            {
                title: "Station-Side Staples",
                text: "Vada Pav stalls are positioned outside almost every local railway station across Mumbai—from Churchgate and CSMT to Dadar, Thane, and Borivali."
            },
            {
                title: "Democratic Affordability",
                text: "Costing as little as ₹15–₹30, Vada Pav transcends socio-economic boundaries, enjoyed equally by corporate executives, college students, taxi drivers, and daily wage earners."
            },
            {
                title: "Grab-and-Go Efficiency",
                text: "Served wrapped in a square piece of newspaper or parchment in seconds, perfect for commuters catching fast local trains."
            },
            {
                title: "Social & Cultural Icon",
                text: "Celebrated annually on World Vada Pav Day (August 23), featured in Bollywood cinema, and regarded as the official snack of Mumbai."
            }
        ]
    },
    variations: [
        {
            name: "Classic Dadar Vada Pav",
            type: "Authentic Original",
            desc: "Traditional street style with spicy potato vada, dry garlic chutney, green chili, and unbuttered pav."
        },
        {
            name: "Cheese Vada Pav",
            type: "Modern Street Innovation",
            desc: "Layered with a slice of processed cheddar cheese or melted Amul cheese over the hot vada."
        },
        {
            name: "Schezwan Vada Pav",
            type: "Indo-Chinese Fusion",
            desc: "Spreading punchy garlic-chili Schezwan sauce alongside dry garlic chutney inside the pav."
        },
        {
            name: "Ulta Vada Pav",
            type: "Inverted Deep Fry",
            desc: "The entire assembled stuffed pav is dipped into chickpea batter and deep-fried whole like a pakora."
        },
        {
            name: "Jain Vada Pav",
            type: "Dietary Preference",
            desc: "Made without root vegetables (potatoes) or garlic/onions, using spiced mashed raw bananas (kaccha kela) as the filling."
        },
        {
            name: "Misal-Rassa Dunked Vada Pav",
            type: "Regional Gravy Style",
            desc: "Popular in Kolhapur & Pune, where the vada pav is served submerged in a bowl of spicy red sprout gravy (kat/rassa)."
        }
    ],
    explorerItems: [
        {
            id: "vada-pav",
            name: "Vada Pav",
            tagline: "Mumbai's Iconic Street Burger",
            region: "Mumbai, Maharashtra",
            context: "Dadar Railway Station & Pan-Mumbai Streets",
            connection: "The ultimate fast-food emblem of Mumbai's commuter spirit, created in 1966 by Ashok Vaidya.",
            keyIngredients: ["Batata Vada", "Pav", "Dry Garlic Chutney", "Green Chutney", "Fried Chili"],
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
            alt: "Golden crispy Vada Pav served with dry red garlic chutney and fried green chilies"
        },
        {
            id: "pav-bhaji",
            name: "Pav Bhaji",
            tagline: "Butter-Laden Mashed Vegetable Curry",
            region: "Mumbai, Maharashtra",
            context: "Textile Mill District & Tardeo Stalls",
            connection: "Created in the 1850s as a midnight meal for textile mill workers who needed a quick, hearty dish before late shifts.",
            keyIngredients: ["Mashed Vegetables", "Amul Butter", "Pav Bhaji Masala", "Toasted Pav", "Raw Onion & Lemon"],
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop",
            alt: "Hot sizzled Pav Bhaji garnished with melted butter, coriander, lemon, and golden toasted pav"
        },
        {
            id: "misal-pav",
            name: "Misal Pav",
            tagline: "Fiery Sprouted Bean Curry with Farsan",
            region: "Kolhapur / Nashik / Pune, Maharashtra",
            context: "Traditional Breakfast & Street Stalls",
            connection: "A potent, spicy sprouted moth bean (matki) curry (usrati/kat) blanketed with crunchy farsan mix, served with pav for breakfast.",
            keyIngredients: ["Sprouted Moth Beans", "Fiery Kat (Red Gravy)", "Farsan / Sev", "Chopped Onions", "Pav"],
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
            alt: "Bowl of spicy Misal Pav with bright red tari gravy, crunchy farsan, and sliced pav"
        },
        {
            id: "bhel-puri",
            name: "Bhel Puri",
            tagline: "Crunchy Sweet & Tangy Puffed Rice Chaat",
            region: "Mumbai Coastline (Girgaum Chowpatty)",
            context: "Beachside Food Kiosks & Promenade Stalls",
            connection: "Championed along Mumbai's beaches like Juhu and Chowpatty; a light, crunchy blend of puffed rice, papdi, and tangy chutneys.",
            keyIngredients: ["Puffed Rice (Kurmura)", "Fine Sev", "Papdi", "Tamarind & Mint Chutneys", "Diced Potatoes & Onions"],
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
            alt: "Freshly tossed Bhel Puri chaat with puffed rice, crisp sev, and coriander"
        },
        {
            id: "sev-puri",
            name: "Sev Puri",
            tagline: "Bite-Sized Crispy Puri Delights",
            region: "Mumbai, Maharashtra",
            context: "Street Corners & Beach Counters",
            connection: "Crisp flat papdis topped with spiced potatoes, onions, raw mango, three signature chutneys, and a mountain of fine crispy sev.",
            keyIngredients: ["Flat Papdi Puris", "Mashed Potatoes", "Sweet & Spicy Chutneys", "Nylon Sev", "Raw Mango Bits"],
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
            alt: "Plate of Sev Puri garnished with fine yellow nylon sev and chutneys"
        },
        {
            id: "ragda-pattice",
            name: "Ragda Pattice",
            tagline: "Golden Potato Patties in White Pea Curry",
            region: "Mumbai & Maharashtra",
            context: "Street Food Stalls & Chaat Counters",
            connection: "Pan-fried crispy potato patties (pattice) submerged in a warm, flavorful white pea gravy (ragda) with sweet & spicy chutneys.",
            keyIngredients: ["Pan-Fried Potato Patties", "Spiced White Peas Curry (Ragda)", "Tamarind Chutney", "Green Chutney", "Sev"],
            image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop",
            alt: "Ragda Pattice served hot with white pea curry and chaat toppings"
        }
    ],
    sources: [
        {
            title: "BBC Travel — 'The Indian burger that conquered Mumbai'",
            url: "https://www.bbc.com/travel/article/20180401-the-indian-burger-that-conquered-mumbai"
        },
        {
            title: "Hindustan Times — 'Origin Story: How Ashok Vaidya created Vada Pav at Dadar in 1966'",
            url: "https://www.hindustantimes.com"
        },
        {
            title: "Culinary Heritage Archives of Maharashtra — Street Food Documentation",
            url: "https://www.maharashtratourism.gov.in"
        },
        {
            title: "Wikimedia Commons — Public Domain & Creative Commons Street Food Photography",
            url: "https://commons.wikimedia.org"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = VADA_PAV_DATA;
}

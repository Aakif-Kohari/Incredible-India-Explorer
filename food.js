/* =========================================================
   INCREDIBLE INDIA EXPLORER
   AI-POWERED LOCAL CUISINE RECOMMENDATION ENGINE

   Frontend-only implementation.
   No backend.
   No API keys.
   No external libraries.

   Features:
   - Destination matching
   - Regional cuisine discovery
   - Dietary filtering
   - Allergy safety
   - Budget filtering
   - Meal type filtering
   - Interest matching
   - Rating
   - Distance relevance
   - Personalized scoring
   - AI-style explanations
   - Saved food journey
   - Optional Journey integration
========================================================= */

"use strict";


/* =========================================================
   FOOD DATASET
========================================================= */

const FOOD_DATA = [

    /* =========================
       DELHI
    ========================== */

    {
        id: "delhi-chole-bhature",
        name: "Chole Bhature",
        destination: "delhi",
        region: "Delhi",
        cuisine: "Punjabi / North Indian",
        emoji: "🥘",
        description:
            "A famous Delhi favourite featuring spicy chickpeas served with fluffy deep-fried bhature.",
        type: "vegetarian",
        meals: ["breakfast", "lunch", "snack"],
        budget: "budget",
        price: "₹120–₹250",
        priceValue: 180,
        rating: 4.7,
        distance: 2.1,
        interests: ["street-food", "traditional", "spicy"],
        allergies: ["gluten"],
        tags: ["Delhi classic", "Street favourite", "Spicy"],
        experience:
            "Best enjoyed fresh at a traditional Delhi breakfast or street-food spot.",
        reason:
            "Delhi's iconic comfort food and a strong match for travellers looking for traditional and spicy local flavours."
    },

    {
        id: "delhi-paratha",
        name: "Stuffed Paratha",
        destination: "delhi",
        region: "Delhi",
        cuisine: "North Indian",
        emoji: "🫓",
        description:
            "Crispy stuffed flatbread traditionally served with curd, pickle and chutney.",
        type: "vegetarian",
        meals: ["breakfast", "lunch"],
        budget: "budget",
        price: "₹80–₹220",
        priceValue: 150,
        rating: 4.6,
        distance: 1.4,
        interests: ["traditional", "street-food"],
        allergies: ["gluten", "dairy"],
        tags: ["Breakfast", "Old Delhi", "Traditional"],
        experience:
            "A classic breakfast experience that connects travellers with Delhi's historic food culture.",
        reason:
            "It is inexpensive, traditional and particularly suitable for travellers exploring Delhi's old food streets."
    },

    {
        id: "delhi-kebabs",
        name: "Seekh Kebab",
        destination: "delhi",
        region: "Delhi",
        cuisine: "Mughlai",
        emoji: "🍢",
        description:
            "Smoky minced-meat kebabs seasoned with aromatic spices and grilled over charcoal.",
        type: "non-vegetarian",
        meals: ["lunch", "dinner", "snack"],
        budget: "moderate",
        price: "₹300–₹650",
        priceValue: 450,
        rating: 4.8,
        distance: 2.8,
        interests: ["traditional", "street-food", "spicy"],
        allergies: [],
        tags: ["Mughlai", "Charcoal grilled", "Delhi"],
        experience:
            "Try freshly grilled kebabs in an old Delhi-style food market for a classic Mughlai experience.",
        reason:
            "A highly rated Delhi specialty for travellers interested in Mughlai cuisine and bold flavours."
    },


    /* =========================
       RAJASTHAN
    ========================== */

    {
        id: "rajasthan-dal-baati",
        name: "Dal Baati Churma",
        destination: "rajasthan",
        region: "Rajasthan",
        cuisine: "Rajasthani",
        emoji: "🍛",
        description:
            "Rajasthan's signature combination of baked wheat baati, dal and sweet churma.",
        type: "vegetarian",
        meals: ["lunch", "dinner"],
        budget: "moderate",
        price: "₹250–₹600",
        priceValue: 400,
        rating: 4.9,
        distance: 3.2,
        interests: ["traditional", "royal"],
        allergies: ["gluten", "dairy"],
        tags: ["Rajasthani classic", "Traditional", "Royal"],
        experience:
            "A complete regional meal traditionally eaten with generous amounts of ghee.",
        reason:
            "This is one of Rajasthan's defining dishes and is ideal for travellers seeking an authentic traditional experience."
    },

    {
        id: "rajasthan-gatte",
        name: "Gatte ki Sabzi",
        destination: "rajasthan",
        region: "Rajasthan",
        cuisine: "Rajasthani",
        emoji: "🥣",
        description:
            "Spiced gram-flour dumplings cooked in a rich yoghurt-based curry.",
        type: "vegetarian",
        meals: ["lunch", "dinner"],
        budget: "budget",
        price: "₹180–₹400",
        priceValue: 280,
        rating: 4.6,
        distance: 2.5,
        interests: ["traditional", "spicy"],
        allergies: ["dairy"],
        tags: ["Vegetarian", "Regional", "Spicy"],
        experience:
            "A staple Rajasthani preparation showcasing how local cooks create rich flavours from simple ingredients.",
        reason:
            "Its regional identity and vegetarian profile make it a strong choice for exploring authentic Rajasthan cuisine."
    },


    /* =========================
       PUNJAB
    ========================== */

    {
        id: "punjab-sarson",
        name: "Sarson da Saag & Makki di Roti",
        destination: "punjab",
        region: "Punjab",
        cuisine: "Punjabi",
        emoji: "🌽",
        description:
            "A celebrated Punjabi combination of mustard greens and cornmeal flatbread.",
        type: "vegetarian",
        meals: ["lunch", "dinner"],
        budget: "moderate",
        price: "₹250–₹550",
        priceValue: 380,
        rating: 4.8,
        distance: 2.7,
        interests: ["traditional", "healthy"],
        allergies: ["dairy"],
        tags: ["Punjabi", "Seasonal", "Traditional"],
        experience:
            "A hearty regional meal especially associated with Punjab's winter food culture.",
        reason:
            "Perfect for travellers interested in traditional Punjabi food and regional seasonal cuisine."
    },

    {
        id: "punjab-lassi",
        name: "Punjabi Lassi",
        destination: "punjab",
        region: "Punjab",
        cuisine: "Punjabi",
        emoji: "🥛",
        description:
            "A thick yoghurt-based drink served sweet or lightly flavoured with spices.",
        type: "vegetarian",
        meals: ["breakfast", "snack"],
        budget: "budget",
        price: "₹60–₹180",
        priceValue: 110,
        rating: 4.7,
        distance: 1.5,
        interests: ["traditional", "sweet"],
        allergies: ["dairy"],
        tags: ["Drink", "Sweet", "Punjab"],
        experience:
            "A refreshing traditional drink commonly paired with Punjabi meals.",
        reason:
            "A low-cost local favourite for travellers who want to experience a classic Punjabi drink."
    },


    /* =========================
       GUJARAT
    ========================== */

    {
        id: "gujarat-dhokla",
        name: "Khaman Dhokla",
        destination: "gujarat",
        region: "Gujarat",
        cuisine: "Gujarati",
        emoji: "🍰",
        description:
            "Soft steamed gram-flour cakes finished with mustard seeds, curry leaves and coriander.",
        type: "vegetarian",
        meals: ["breakfast", "snack"],
        budget: "budget",
        price: "₹60–₹180",
        priceValue: 100,
        rating: 4.7,
        distance: 1.9,
        interests: ["traditional", "healthy", "street-food"],
        allergies: [],
        tags: ["Gujarati", "Steamed", "Light"],
        experience:
            "A popular Gujarati snack that is easy to find in local markets and breakfast shops.",
        reason:
            "Light, affordable and strongly associated with Gujarati food culture."
    },

    {
        id: "gujarat-undhiyu",
        name: "Undhiyu",
        destination: "gujarat",
        region: "Gujarat",
        cuisine: "Gujarati",
        emoji: "🥗",
        description:
            "A mixed vegetable preparation made with seasonal vegetables, herbs and spices.",
        type: "vegetarian",
        meals: ["lunch", "dinner"],
        budget: "moderate",
        price: "₹250–₹500",
        priceValue: 350,
        rating: 4.8,
        distance: 2.9,
        interests: ["traditional", "healthy"],
        allergies: ["nuts"],
        tags: ["Seasonal", "Vegetarian", "Gujarati"],
        experience:
            "A celebrated Gujarati preparation traditionally associated with winter and festive meals.",
        reason:
            "An excellent choice for discovering seasonal Gujarati cuisine."
    },


    /* =========================
       MAHARASHTRA
    ========================== */

    {
        id: "maharashtra-vada-pav",
        name: "Vada Pav",
        destination: "maharashtra",
        region: "Maharashtra",
        cuisine: "Maharashtrian",
        emoji: "🍔",
        description:
            "A spicy potato fritter placed inside a soft bun with chutneys and dry garlic masala.",
        type: "vegetarian",
        meals: ["breakfast", "snack"],
        budget: "budget",
        price: "₹30–₹100",
        priceValue: 60,
        rating: 4.8,
        distance: 1.1,
        interests: ["street-food", "spicy"],
        allergies: ["gluten"],
        tags: ["Mumbai classic", "Street Food", "Budget"],
        experience:
            "Grab one from a busy local food stall for a quintessential Mumbai street-food experience.",
        reason:
            "One of India's most recognizable street foods and a great match for budget-conscious food explorers."
    },

    {
        id: "maharashtra-misal",
        name: "Misal Pav",
        destination: "maharashtra",
        region: "Maharashtra",
        cuisine: "Maharashtrian",
        emoji: "🌶️",
        description:
            "A spicy sprouted-lentil curry topped with farsan, onions and coriander and served with pav.",
        type: "vegetarian",
        meals: ["breakfast", "lunch", "snack"],
        budget: "budget",
        price: "₹100–₹250",
        priceValue: 170,
        rating: 4.7,
        distance: 1.8,
        interests: ["street-food", "spicy", "traditional"],
        allergies: ["gluten", "nuts"],
        tags: ["Spicy", "Street Food", "Maharashtra"],
        experience:
            "A popular breakfast and snack with regional variations across Maharashtra.",
        reason:
            "Ideal for travellers who want a spicy, inexpensive and highly local street-food experience."
    },


    /* =========================
       GOA
    ========================== */

    {
        id: "goa-fish-curry",
        name: "Goan Fish Curry",
        destination: "goa",
        region: "Goa",
        cuisine: "Goan",
        emoji: "🐟",
        description:
            "Fish cooked in a tangy coconut-based curry with traditional Goan spices.",
        type: "non-vegetarian",
        meals: ["lunch", "dinner"],
        budget: "moderate",
        price: "₹350–₹700",
        priceValue: 500,
        rating: 4.8,
        distance: 3.4,
        interests: ["traditional", "healthy"],
        allergies: ["seafood"],
        tags: ["Coastal", "Goan", "Coconut"],
        experience:
            "Best enjoyed with steamed rice at a traditional Goan local restaurant.",
        reason:
            "A signature Goan coastal dish for travellers looking for authentic regional seafood."
    },

    {
        id: "goa-bebinca",
        name: "Bebinca",
        destination: "goa",
        region: "Goa",
        cuisine: "Goan",
        emoji: "🍰",
        description:
            "A layered Goan dessert traditionally prepared with coconut milk, eggs and sugar.",
        type: "non-vegetarian",
        meals: ["dessert", "snack"],
        budget: "budget",
        price: "₹100–₹250",
        priceValue: 170,
        rating: 4.6,
        distance: 2.2,
        interests: ["traditional", "sweet"],
        allergies: ["dairy", "eggs"],
        tags: ["Dessert", "Goan", "Traditional"],
        experience:
            "A distinctive Portuguese-influenced Goan dessert worth trying after a coastal meal.",
        reason:
            "Its unique Goan identity makes it especially valuable for travellers interested in cultural food history."
    },


    /* =========================
       KERALA
    ========================== */

    {
        id: "kerala-appam",
        name: "Appam with Stew",
        destination: "kerala",
        region: "Kerala",
        cuisine: "Kerala",
        emoji: "🥞",
        description:
            "Soft-centred fermented rice pancakes served with a fragrant coconut-based stew.",
        type: "vegetarian",
        meals: ["breakfast", "lunch", "dinner"],
        budget: "budget",
        price: "₹150–₹350",
        priceValue: 240,
        rating: 4.8,
        distance: 2.1,
        interests: ["traditional", "healthy"],
        allergies: ["dairy"],
        tags: ["Kerala", "Coconut", "Breakfast"],
        experience:
            "A classic Kerala breakfast that pairs beautifully with vegetable or meat stew.",
        reason:
            "A traditional Kerala staple that works well for travellers seeking a regional breakfast."
    },

    {
        id: "kerala-sadya",
        name: "Kerala Sadya",
        destination: "kerala",
        region: "Kerala",
        cuisine: "Kerala",
        emoji: "🍃",
        description:
            "A festive vegetarian feast served on a banana leaf with numerous regional preparations.",
        type: "vegetarian",
        meals: ["lunch"],
        budget: "moderate",
        price: "₹300–₹700",
        priceValue: 450,
        rating: 4.9,
        distance: 3.0,
        interests: ["traditional", "healthy"],
        allergies: ["dairy", "nuts"],
        tags: ["Banana leaf", "Festive", "Vegetarian"],
        experience:
            "An elaborate banana-leaf meal showcasing the breadth of Kerala's vegetarian cuisine.",
        reason:
            "One of the best choices for experiencing Kerala's food traditions in a single meal."
    },


    /* =========================
       TAMIL NADU
    ========================== */

    {
        id: "tamil-dosa",
        name: "Masala Dosa",
        destination: "tamil-nadu",
        region: "Tamil Nadu",
        cuisine: "South Indian",
        emoji: "🥞",
        description:
            "A crisp fermented rice-and-lentil crepe filled with spiced potatoes and served with chutney and sambar.",
        type: "vegetarian",
        meals: ["breakfast", "lunch", "dinner"],
        budget: "budget",
        price: "₹100–₹250",
        priceValue: 170,
        rating: 4.8,
        distance: 1.5,
        interests: ["traditional", "street-food"],
        allergies: [],
        tags: ["South Indian", "Crispy", "Classic"],
        experience:
            "A reliable local breakfast choice served in restaurants and traditional tiffin centres.",
        reason:
            "Affordable, widely available and deeply connected with South Indian food culture."
    },

    {
        id: "tamil-pongal",
        name: "Ven Pongal",
        destination: "tamil-nadu",
        region: "Tamil Nadu",
        cuisine: "Tamil",
        emoji: "🍚",
        description:
            "A comforting rice and lentil preparation flavoured with pepper, cumin and ghee.",
        type: "vegetarian",
        meals: ["breakfast"],
        budget: "budget",
        price: "₹80–₹180",
        priceValue: 120,
        rating: 4.6,
        distance: 1.2,
        interests: ["traditional", "healthy"],
        allergies: ["dairy"],
        tags: ["Breakfast", "Tamil", "Comfort food"],
        experience:
            "A simple traditional breakfast that showcases everyday Tamil flavours.",
        reason:
            "Excellent for travellers looking for an inexpensive and authentic local breakfast."
    },


    /* =========================
       KARNATAKA
    ========================== */

    {
        id: "karnataka-bisi-bele-bath",
        name: "Bisi Bele Bath",
        destination: "karnataka",
        region: "Karnataka",
        cuisine: "Kannada",
        emoji: "🍲",
        description:
            "A warm rice, lentil and vegetable dish cooked with a distinctive Karnataka spice blend.",
        type: "vegetarian",
        meals: ["lunch", "dinner"],
        budget: "budget",
        price: "₹120–₹280",
        priceValue: 190,
        rating: 4.7,
        distance: 2.0,
        interests: ["traditional", "spicy"],
        allergies: ["dairy"],
        tags: ["Karnataka", "Comfort food", "Spicy"],
        experience:
            "A popular Karnataka meal that combines rice, lentils, vegetables and aromatic spices.",
        reason:
            "A distinctly regional dish for travellers wanting authentic Karnataka flavours."
    },


    /* =========================
       WEST BENGAL
    ========================== */

    {
        id: "bengal-machher-jhol",
        name: "Machher Jhol",
        destination: "west-bengal",
        region: "West Bengal",
        cuisine: "Bengali",
        emoji: "🐟",
        description:
            "A light Bengali fish curry prepared with potatoes, tomatoes and aromatic spices.",
        type: "non-vegetarian",
        meals: ["lunch", "dinner"],
        budget: "moderate",
        price: "₹300–₹650",
        priceValue: 450,
        rating: 4.7,
        distance: 2.4,
        interests: ["traditional", "healthy"],
        allergies: ["seafood"],
        tags: ["Bengali", "Fish", "Traditional"],
        experience:
            "Usually enjoyed with rice as part of a traditional Bengali meal.",
        reason:
            "A classic Bengali preparation for travellers interested in regional seafood traditions."
    },

    {
        id: "bengal-mishti",
        name: "Mishti Doi",
        destination: "west-bengal",
        region: "West Bengal",
        cuisine: "Bengali",
        emoji: "🍮",
        description:
            "Sweetened fermented yoghurt with a rich caramel-like flavour.",
        type: "vegetarian",
        meals: ["dessert", "snack"],
        budget: "budget",
        price: "₹80–₹200",
        priceValue: 130,
        rating: 4.8,
        distance: 1.3,
        interests: ["traditional", "sweet"],
        allergies: ["dairy"],
        tags: ["Dessert", "Bengali", "Sweet"],
        experience:
            "A beloved Bengali dessert commonly served chilled after meals.",
        reason:
            "A highly recognizable Bengali sweet that is inexpensive and easy to add to a food itinerary."
    },


    /* =========================
       UTTAR PRADESH
    ========================== */

    {
        id: "up-kachori",
        name: "Bedmi Puri & Aloo",
        destination: "uttar-pradesh",
        region: "Uttar Pradesh",
        cuisine: "Awadhi / North Indian",
        emoji: "🫓",
        description:
            "Crispy spiced wheat puris served with a flavourful potato curry.",
        type: "vegetarian",
        meals: ["breakfast", "lunch"],
        budget: "budget",
        price: "₹100–₹250",
        priceValue: 160,
        rating: 4.6,
        distance: 2.0,
        interests: ["traditional", "street-food", "spicy"],
        allergies: ["gluten"],
        tags: ["UP", "Breakfast", "Street Food"],
        experience:
            "A hearty North Indian breakfast commonly enjoyed in local markets.",
        reason:
            "Great for travellers who want an inexpensive traditional breakfast experience."
    },

    {
        id: "up-petha",
        name: "Agra Petha",
        destination: "uttar-pradesh",
        region: "Uttar Pradesh",
        cuisine: "Awadhi / Mughlai",
        emoji: "🍬",
        description:
            "A translucent soft sweet traditionally made from ash gourd and sugar.",
        type: "vegetarian",
        meals: ["dessert", "snack"],
        budget: "budget",
        price: "₹100–₹300",
        priceValue: 180,
        rating: 4.5,
        distance: 1.6,
        interests: ["traditional", "sweet"],
        allergies: [],
        tags: ["Agra", "Sweet", "Souvenir"],
        experience:
            "A classic Agra specialty that works both as a dessert and edible souvenir.",
        reason:
            "Especially relevant for travellers visiting Agra who want to take home a regional food specialty."
    },


    /* =========================
       BIHAR
    ========================== */

    {
        id: "bihar-litti",
        name: "Litti Chokha",
        destination: "bihar",
        region: "Bihar",
        cuisine: "Bihari",
        emoji: "🥯",
        description:
            "Roasted wheat balls stuffed with spiced sattu and served with mashed vegetables.",
        type: "vegetarian",
        meals: ["lunch", "dinner", "snack"],
        budget: "budget",
        price: "₹100–₹250",
        priceValue: 160,
        rating: 4.8,
        distance: 1.8,
        interests: ["traditional", "street-food", "spicy"],
        allergies: ["gluten", "dairy"],
        tags: ["Bihar", "Roasted", "Traditional"],
        experience:
            "A distinctive Bihari dish with smoky roasted flavours and rustic preparation.",
        reason:
            "A strong regional specialty for travellers wanting something distinctly Bihari."
    },


    /* =========================
       ODISHA
    ========================== */

    {
        id: "odisha-dalma",
        name: "Dalma",
        destination: "odisha",
        region: "Odisha",
        cuisine: "Odia",
        emoji: "🥣",
        description:
            "Lentils cooked with vegetables and raw papaya using traditional Odia spices.",
        type: "vegetarian",
        meals: ["lunch", "dinner"],
        budget: "budget",
        price: "₹150–₹350",
        priceValue: 230,
        rating: 4.6,
        distance: 2.4,
        interests: ["traditional", "healthy"],
        allergies: [],
        tags: ["Odia", "Healthy", "Traditional"],
        experience:
            "A simple yet deeply regional dish often eaten with rice.",
        reason:
            "A good fit for travellers interested in healthy traditional regional food."
    },


    /* =========================
       ASSAM
    ========================== */

    {
        id: "assam-khar",
        name: "Khar",
        destination: "assam",
        region: "Assam",
        cuisine: "Assamese",
        emoji: "🍲",
        description:
            "A traditional Assamese preparation made with raw papaya or vegetables and alkaline khar.",
        type: "vegetarian",
        meals: ["lunch", "dinner"],
        budget: "moderate",
        price: "₹200–₹450",
        priceValue: 300,
        rating: 4.5,
        distance: 2.7,
        interests: ["traditional", "healthy"],
        allergies: [],
        tags: ["Assamese", "Traditional", "Regional"],
        experience:
            "A distinctive Assamese preparation representing the region's unique culinary traditions.",
        reason:
            "Recommended for travellers who want to go beyond common tourist dishes and explore regional cuisine."
    },


    /* =========================
       SIKKIM
    ========================== */

    {
        id: "sikkim-momos",
        name: "Sikkim Momos",
        destination: "sikkim",
        region: "Sikkim",
        cuisine: "Himalayan",
        emoji: "🥟",
        description:
            "Steamed dumplings filled with vegetables or meat and served with spicy chutney.",
        type: "vegetarian",
        meals: ["lunch", "dinner", "snack"],
        budget: "budget",
        price: "₹100–₹250",
        priceValue: 170,
        rating: 4.8,
        distance: 1.7,
        interests: ["street-food", "spicy", "traditional"],
        allergies: ["gluten"],
        tags: ["Himalayan", "Dumplings", "Street Food"],
        experience:
            "A popular Himalayan snack especially enjoyable with local spicy chutney.",
        reason:
            "Affordable, highly popular and representative of Sikkim's Himalayan food culture."
    }

];


/* =========================================================
   DESTINATION NAMES
========================================================= */

const DESTINATION_NAMES = {
    delhi: "Delhi",
    punjab: "Punjab",
    rajasthan: "Rajasthan",
    "uttar-pradesh": "Uttar Pradesh",
    uttarakhand: "Uttarakhand",
    "himachal-pradesh": "Himachal Pradesh",
    haryana: "Haryana",
    "jammu-kashmir": "Jammu & Kashmir",
    gujarat: "Gujarat",
    maharashtra: "Maharashtra",
    goa: "Goa",
    kerala: "Kerala",
    "tamil-nadu": "Tamil Nadu",
    karnataka: "Karnataka",
    "andhra-pradesh": "Andhra Pradesh",
    telangana: "Telangana",
    "west-bengal": "West Bengal",
    odisha: "Odisha",
    assam: "Assam",
    bihar: "Bihar",
    sikkim: "Sikkim"
};


/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY = "incredibleIndiaFoodJourney";

let currentRecommendations = [];

let preferences = {
    destination: "",
    diet: "any",
    budget: "any",
    meal: "any",
    allergy: "none",
    interests: []
};


/* =========================================================
   DOM REFERENCES
========================================================= */

const form = document.getElementById("foodPreferenceForm");
const destinationSelect = document.getElementById("destination");
const dietSelect = document.getElementById("diet");
const budgetSelect = document.getElementById("budget");
const mealSelect = document.getElementById("meal");
const allergySelect = document.getElementById("allergy");

const recommendationGrid =
    document.getElementById("recommendationGrid");

const resultCount =
    document.getElementById("resultCount");

const resultSummary =
    document.getElementById("resultSummary");

const statusText =
    document.getElementById("statusText");

const resetButton =
    document.getElementById("resetButton");

const journeyList =
    document.getElementById("journeyList");

const clearJourneyButton =
    document.getElementById("clearJourney");

const modal =
    document.getElementById("foodModal");

const modalContent =
    document.getElementById("modalContent");

const closeModal =
    document.getElementById("closeModal");


/* =========================================================
   SAFE HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   GET INTERESTS
========================================================= */

function getSelectedInterests() {

    return Array.from(
        document.querySelectorAll(
            'input[name="interest"]:checked'
        )
    ).map(input => input.value);
}


/* =========================================================
   COLLECT PREFERENCES
========================================================= */

function collectPreferences() {

    preferences = {
        destination: destinationSelect.value,
        diet: dietSelect.value,
        budget: budgetSelect.value,
        meal: mealSelect.value,
        allergy: allergySelect.value,
        interests: getSelectedInterests()
    };

    return preferences;
}


/* =========================================================
   DIETARY COMPATIBILITY
========================================================= */

function isDietCompatible(food, diet) {

    if (diet === "any") {
        return true;
    }

    if (diet === "vegetarian") {
        return food.type === "vegetarian";
    }

    if (diet === "vegan") {

        return (
            food.type === "vegetarian" &&
            !food.allergies.includes("dairy") &&
            !food.allergies.includes("eggs")
        );
    }

    if (diet === "jain") {

        return (
            food.type === "vegetarian" &&
            !food.description.toLowerCase().includes("onion") &&
            !food.description.toLowerCase().includes("garlic")
        );
    }

    if (diet === "non-vegetarian") {
        return food.type === "non-vegetarian";
    }

    return true;
}


/* =========================================================
   ALLERGY SAFETY
========================================================= */

function isAllergySafe(food, allergy) {

    if (allergy === "none") {
        return true;
    }

    return !food.allergies.includes(allergy);
}


/* =========================================================
   BUDGET MATCH
========================================================= */

function getBudgetScore(food, budget) {

    if (budget === "any") {
        return 0;
    }

    if (food.budget === budget) {
        return 20;
    }

    return -5;
}


/* =========================================================
   CALCULATE RECOMMENDATION SCORE
========================================================= */

function calculateScore(food, prefs) {

    let score = 0;

    const reasons = [];


    /* Destination is the strongest signal */
    if (food.destination === prefs.destination) {

        score += 40;

        reasons.push(
            `matches your ${DESTINATION_NAMES[prefs.destination]} destination`
        );
    }


    /* Dietary preference */
    if (prefs.diet !== "any") {

        if (isDietCompatible(food, prefs.diet)) {

            score += 20;

            reasons.push(
                `fits your ${prefs.diet.replace("-", " ")} preference`
            );

        } else {

            return {
                score: -999,
                reasons: []
            };
        }
    }


    /* Allergy */
    if (!isAllergySafe(food, prefs.allergy)) {

        return {
            score: -999,
            reasons: []
        };
    }

    if (prefs.allergy !== "none") {

        score += 10;

        reasons.push("does not contain your selected allergy");
    }


    /* Budget */
    score += getBudgetScore(food, prefs.budget);

    if (
        prefs.budget !== "any" &&
        food.budget === prefs.budget
    ) {
        reasons.push("fits your selected budget");
    }


    /* Meal */
    if (prefs.meal !== "any") {

        if (food.meals.includes(prefs.meal)) {

            score += 15;

            reasons.push(
                `works well for ${prefs.meal}`
            );

        } else {

            score -= 8;
        }
    }


    /* Interests */
    if (prefs.interests.length > 0) {

        let interestMatches = 0;

        prefs.interests.forEach(interest => {

            if (food.interests.includes(interest)) {
                interestMatches++;
            }

        });

        score += interestMatches * 8;

        if (interestMatches > 0) {

            reasons.push(
                `matches ${interestMatches} of your selected interests`
            );
        }
    }


    /* Rating */
    score += food.rating * 3;

    if (food.rating >= 4.7) {
        reasons.push("has a strong traveller rating");
    }


    /* Distance */
    if (food.distance <= 2) {

        score += 5;

        reasons.push(
            "is relatively close to the selected destination area"
        );

    } else if (food.distance <= 5) {

        score += 2;
    }


    return {
        score: Math.round(score),
        reasons
    };
}


/* =========================================================
   GENERATE RECOMMENDATIONS
========================================================= */

function generateRecommendations(prefs) {

    if (!prefs.destination) {
        return [];
    }

    return FOOD_DATA
        .map(food => {

            const result = calculateScore(food, prefs);

            return {
                ...food,
                score: result.score,
                reasons: result.reasons
            };

        })
        .filter(food => food.score > -999)
        .sort((a, b) => {

            if (b.score !== a.score) {
                return b.score - a.score;
            }

            return b.rating - a.rating;
        })
        .slice(0, 9);
}


/* =========================================================
   AI-STYLE EXPLANATION
========================================================= */

function generateExplanation(food, prefs) {

    const destination =
        DESTINATION_NAMES[prefs.destination] || food.region;

    const firstReasons = food.reasons.slice(0, 3);

    if (firstReasons.length === 0) {

        return `A popular ${food.cuisine} choice worth exploring in ${destination}.`;
    }

    const text = firstReasons.join(", ");

    return `Recommended because it ${text}.`;
}


/* =========================================================
   RENDER RESULTS
========================================================= */

function renderRecommendations(results) {

    currentRecommendations = results;

    resultCount.textContent = results.length;

    if (!preferences.destination) {

        resultSummary.textContent =
            "Select your destination to discover local food.";

        recommendationGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🍽️</div>

                <h3>Your food journey starts here</h3>

                <p>
                    Choose a destination and your preferences above.
                    We'll find dishes that match your taste.
                </p>
            </div>
        `;

        return;
    }


    const destinationName =
        DESTINATION_NAMES[preferences.destination];


    resultSummary.textContent =
        `Personalized food recommendations for ${destinationName}.`;


    if (results.length === 0) {

        recommendationGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔎</div>

                <h3>No exact matches found</h3>

                <p>
                    Try changing your dietary, allergy, meal or
                    budget preferences to discover more options.
                </p>
            </div>
        `;

        return;
    }


    recommendationGrid.innerHTML =
        results.map(renderFoodCard).join("");


    attachFoodCardEvents();
}


/* =========================================================
   RENDER FOOD CARD
========================================================= */

function renderFoodCard(food) {

    const saved =
        isFoodSaved(food.id);

    const explanation =
        generateExplanation(food, preferences);

    const tags =
        food.tags
            .slice(0, 3)
            .map(tag =>
                `<span class="food-tag">${escapeHTML(tag)}</span>`
            )
            .join("");


    return `
        <article class="food-card">

            <div class="food-image">

                <span class="food-emoji">
                    ${food.emoji}
                </span>

                <span class="score-badge">
                    ${Math.min(food.score, 100)}% match
                </span>

            </div>


            <div class="food-body">

                <div class="food-title-row">

                    <h3 class="food-title">
                        ${escapeHTML(food.name)}
                    </h3>

                    <span class="rating">
                        ★ ${food.rating}
                    </span>

                </div>


                <div class="food-location">
                    📍 ${escapeHTML(food.region)}
                    · ${escapeHTML(food.cuisine)}
                </div>


                <p class="food-description">
                    ${escapeHTML(food.description)}
                </p>


                <div class="tag-row">
                    ${tags}
                </div>


                <div class="food-meta">

                    <div class="meta-item">
                        <strong>
                            ${escapeHTML(food.price)}
                        </strong>
                        <span>Price</span>
                    </div>

                    <div class="meta-item">
                        <strong>
                            ${food.distance} km
                        </strong>
                        <span>Distance</span>
                    </div>

                    <div class="meta-item">
                        <strong>
                            ${escapeHTML(food.type)}
                        </strong>
                        <span>Food type</span>
                    </div>

                </div>


                <div class="ai-explanation">
                    <strong>✨ Why this?</strong>
                    ${escapeHTML(explanation)}
                </div>


                <div class="food-actions">

                    <button
                        class="save-food ${saved ? "saved" : ""}"
                        data-id="${food.id}"
                    >
                        ${saved ? "✓ Saved" : "+ Add to Journey"}
                    </button>

                    <button
                        class="details-food"
                        data-id="${food.id}"
                    >
                        View Details
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   ATTACH CARD EVENTS
========================================================= */

function attachFoodCardEvents() {

    document
        .querySelectorAll(".save-food")
        .forEach(button => {

            button.addEventListener("click", () => {

                const food =
                    FOOD_DATA.find(
                        item => item.id === button.dataset.id
                    );

                if (food) {
                    toggleSavedFood(food);
                }

            });

        });


    document
        .querySelectorAll(".details-food")
        .forEach(button => {

            button.addEventListener("click", () => {

                const food =
                    FOOD_DATA.find(
                        item => item.id === button.dataset.id
                    );

                if (food) {
                    openFoodModal(food);
                }

            });

        });
}


/* =========================================================
   LOCAL FOOD JOURNEY
========================================================= */

function getSavedFoods() {

    try {

        const data =
            localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.warn(
            "Unable to read food journey:",
            error
        );

        return [];
    }
}


function saveFoods(foods) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(foods)
    );
}


function isFoodSaved(foodId) {

    return getSavedFoods()
        .some(food => food.id === foodId);
}


/* =========================================================
   TOGGLE SAVED FOOD
========================================================= */

function toggleSavedFood(food) {

    const savedFoods = getSavedFoods();

    const existingIndex =
        savedFoods.findIndex(
            item => item.id === food.id
        );


    if (existingIndex >= 0) {

        savedFoods.splice(existingIndex, 1);

        saveFoods(savedFoods);

        updateJourneyUI();

        renderRecommendations(currentRecommendations);

        setStatus(
            `${food.name} removed from your food journey.`
        );

        return;
    }


    const journeyFood = {
        id: food.id,
        name: food.name,
        region: food.region,
        cuisine: food.cuisine,
        emoji: food.emoji,
        price: food.price,
        rating: food.rating,
        savedAt: new Date().toISOString()
    };


    savedFoods.push(journeyFood);

    saveFoods(savedFoods);

    integrateWithExistingJourney(food);

    updateJourneyUI();

    renderRecommendations(currentRecommendations);

    setStatus(
        `${food.name} added to your food journey.`
    );
}


/* =========================================================
   OPTIONAL EXISTING JOURNEY INTEGRATION
========================================================= */

function integrateWithExistingJourney(food) {

    /*
       The repository may expose its existing Journey object
       globally.

       We intentionally check several common method names so
       this page remains compatible with the existing static
       project without requiring its internal implementation.
    */

    try {

        if (
            typeof window.Journey !== "undefined"
        ) {

            const journeyItem = {
                id: `food-${food.id}`,
                type: "food",
                title: food.name,
                name: food.name,
                description: food.description,
                location: food.region,
                category: "Food",
                emoji: food.emoji,
                rating: food.rating
            };


            if (
                typeof window.Journey.addItem === "function"
            ) {

                window.Journey.addItem(journeyItem);
                return;
            }


            if (
                typeof window.Journey.add === "function"
            ) {

                window.Journey.add(journeyItem);
                return;
            }


            if (
                typeof window.Journey.save === "function"
            ) {

                window.Journey.save(journeyItem);
                return;
            }

        }

    } catch (error) {

        console.warn(
            "Existing Journey integration skipped:",
            error
        );
    }
}


/* =========================================================
   RENDER SAVED JOURNEY
========================================================= */

function updateJourneyUI() {

    const savedFoods = getSavedFoods();


    if (savedFoods.length === 0) {

        journeyList.innerHTML = `
            <div class="journey-empty">

                <span>🧳</span>

                <p>
                    No food experiences saved yet.
                </p>

            </div>
        `;

        return;
    }


    journeyList.innerHTML =
        savedFoods
            .map(food => `

                <div class="journey-item">

                    <div class="journey-item-emoji">
                        ${food.emoji}
                    </div>

                    <div class="journey-item-content">

                        <strong>
                            ${escapeHTML(food.name)}
                        </strong>

                        <span>
                            ${escapeHTML(food.region)}
                            · ${escapeHTML(food.cuisine)}
                            · ★ ${food.rating}
                        </span>

                    </div>

                    <button
                        class="remove-food"
                        data-id="${food.id}"
                        aria-label="Remove food"
                    >
                        ×
                    </button>

                </div>

            `)
            .join("");


    document
        .querySelectorAll(".remove-food")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeSavedFood(
                        button.dataset.id
                    );

                }
            );

        });
}


/* =========================================================
   REMOVE SAVED FOOD
========================================================= */

function removeSavedFood(foodId) {

    const savedFoods =
        getSavedFoods()
            .filter(food => food.id !== foodId);

    saveFoods(savedFoods);

    updateJourneyUI();

    renderRecommendations(currentRecommendations);

    setStatus("Food experience removed.");
}


/* =========================================================
   CLEAR JOURNEY
========================================================= */

function clearJourney() {

    const savedFoods = getSavedFoods();

    if (savedFoods.length === 0) {
        return;
    }


    const confirmed =
        window.confirm(
            "Remove all saved food experiences?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(STORAGE_KEY);

    updateJourneyUI();

    renderRecommendations(currentRecommendations);

    setStatus("Your food journey has been cleared.");
}


/* =========================================================
   MODAL
========================================================= */

function openFoodModal(food) {

    modalContent.innerHTML = `

        <div class="modal-food-hero">

            <div class="modal-food-emoji">
                ${food.emoji}
            </div>

            <div>

                <h2>
                    ${escapeHTML(food.name)}
                </h2>

                <p>
                    📍 ${escapeHTML(food.region)}
                    · ${escapeHTML(food.cuisine)}
                </p>

                <p>
                    ⭐ ${food.rating}/5
                </p>

            </div>

        </div>


        <div class="modal-section">

            <h4>About this dish</h4>

            <p>
                ${escapeHTML(food.description)}
            </p>

        </div>


        <div class="modal-facts">

            <div class="modal-fact">

                <strong>
                    ${escapeHTML(food.price)}
                </strong>

                <span>
                    Typical price
                </span>

            </div>

            <div class="modal-fact">

                <strong>
                    ${food.distance} km
                </strong>

                <span>
                    Estimated distance
                </span>

            </div>

            <div class="modal-fact">

                <strong>
                    ${escapeHTML(food.type)}
                </strong>

                <span>
                    Food type
                </span>

            </div>

        </div>


        <div class="modal-section">

            <h4>🍽️ Best time to try it</h4>

            <p>
                ${food.meals
                    .map(
                        meal =>
                            meal.charAt(0).toUpperCase() +
                            meal.slice(1)
                    )
                    .join(" · ")}
            </p>

        </div>


        <div class="modal-section">

            <h4>🇮🇳 Local food experience</h4>

            <p>
                ${escapeHTML(food.experience)}
            </p>

        </div>


        <div class="modal-section">

            <h4>✨ Why our engine recommends it</h4>

            <p>
                ${escapeHTML(
                    generateExplanation(
                        food,
                        preferences
                    )
                )}
            </p>

        </div>


        <div class="modal-section">

            <h4>⚠️ Allergy information</h4>

            <p>
                ${
                    food.allergies.length
                        ? food.allergies
                            .map(
                                allergy =>
                                    allergy
                                        .charAt(0)
                                        .toUpperCase() +
                                    allergy.slice(1)
                            )
                            .join(", ")
                        : "No common allergens recorded in this dataset."
                }
            </p>

        </div>

    `;


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeFoodModal() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   STATUS
========================================================= */

function setStatus(message) {

    statusText.textContent = message;

    window.clearTimeout(
        setStatus.timeout
    );

    setStatus.timeout =
        window.setTimeout(() => {

            statusText.textContent =
                "Ready to recommend";

        }, 3500);
}


/* =========================================================
   RUN RECOMMENDATION
========================================================= */

function runRecommendation() {

    collectPreferences();

    const button =
        form.querySelector(
            ".recommend-button"
        );

    button.classList.add("loading");

    button.innerHTML =
        "<span>✨</span> Finding matches...";


    setStatus(
        "Analyzing your preferences..."
    );


    /*
       Small delay gives the interface a natural
       recommendation-engine feel while everything
       still executes locally.
    */

    window.setTimeout(() => {

        const results =
            generateRecommendations(
                preferences
            );

        renderRecommendations(results);

        button.classList.remove("loading");

        button.innerHTML =
            "<span>✨</span> Find My Food";

        setStatus(
            `${results.length} personalized recommendations found.`
        );


        document
            .getElementById("recommendations")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }, 350);
}


/* =========================================================
   RESET
========================================================= */

function resetForm() {

    form.reset();

    preferences = {
        destination: "",
        diet: "any",
        budget: "any",
        meal: "any",
        allergy: "none",
        interests: []
    };

    currentRecommendations = [];

    renderRecommendations([]);

    setStatus(
        "Preferences reset."
    );
}


/* =========================================================
   QUICK DESTINATION
========================================================= */

function handleQuickDestination(destination) {

    destinationSelect.value = destination;

    /*
       Keep the user's other selections.
    */

    collectPreferences();

    runRecommendation();
}


/* =========================================================
   FORM SUBMISSION
========================================================= */

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        if (!destinationSelect.value) {

            destinationSelect.focus();

            setStatus(
                "Please select a destination first."
            );

            return;
        }

        runRecommendation();
    }
);


/* =========================================================
   RESET BUTTON
========================================================= */

resetButton.addEventListener(
    "click",
    resetForm
);


/* =========================================================
   QUICK CARDS
========================================================= */

document
    .querySelectorAll(".quick-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                handleQuickDestination(
                    button.dataset.destination
                );

            }
        );

    });


/* =========================================================
   CLEAR JOURNEY
========================================================= */

clearJourneyButton.addEventListener(
    "click",
    clearJourney
);


/* =========================================================
   MODAL EVENTS
========================================================= */

closeModal.addEventListener(
    "click",
    closeFoodModal
);


document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        closeFoodModal
    );


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeFoodModal();
        }

    }
);


/* =========================================================
   REGISTER SEARCH ITEMS WITH EXISTING SITE
========================================================= */

function registerFoodSearchItems() {

    try {

        if (
            typeof window.Journey !== "undefined" &&
            typeof window.Journey.registerSearchItems === "function"
        ) {

            const searchItems =
                FOOD_DATA.map(food => ({
                    id: `food-${food.id}`,
                    title: food.name,
                    name: food.name,
                    description: food.description,
                    location: food.region,
                    category: "Food",
                    type: "food",
                    url: "food.html"
                }));


            window.Journey.registerSearchItems(
                searchItems
            );

        }

    } catch (error) {

        console.warn(
            "Food search registration skipped:",
            error
        );
    }
}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateJourneyUI();

        registerFoodSearchItems();

        renderRecommendations([]);

    }
);
/**
 * deomali-data.js
 * Comprehensive dataset for Deomali Trek profile (Odisha's Highest Peak)
 */

const DEOMALI_STATS = {
    name: "Deomali Peak",
    altName: "Highest Peak of Odisha",
    elevationMeters: 1672,
    elevationFeet: 5486,
    location: "Pottangi Block, Koraput District, Odisha",
    range: "Chandragiri-Pottangi Range, Eastern Ghats",
    baseTown: "Semiliguda / Pottangi (~15 km)",
    distanceFromKoraput: "65 km",
    difficulty: "Easy to Moderate",
    ascentTimeHrs: "2 to 3 hours",
    descentTimeHrs: "1.5 to 2 hours",
    trekDistanceKm: "4.5 km (from foothills base)",
    bestSeasons: "October to March (Winter) & July to September (Monsoon)",
    indigenousTribes: "Kandha, Paraja, Gadaba, Bonda"
};

const DEOMALI_TIMELINE = [
    {
        year: "Geological Era",
        title: "Ancient Eastern Ghats Formation",
        badge: "Geology",
        description: "Deomali is part of the Precambrian Eastern Ghats mobile belt, containing ancient charnockite and khondalite rock structures dating back over a billion years."
    },
    {
        year: "Tribal Heritage",
        title: "Sacred Mountain of Indigenous Tribes",
        badge: "Culture",
        description: "For centuries, Deomali has been revered by the Kandha, Paraja, and Gadaba tribal communities. Mountain streams and medicinal plants from Deomali have sustained indigenous livelihoods for generations."
    },
    {
        year: "1936 CE",
        title: "Statehood & Geographical Crown of Odisha",
        badge: "Milestone",
        description: "With the creation of Odisha state in 1936, Deomali was officially recognized as the highest mountain peak in the province at 1,672 meters."
    },
    {
        year: "2010s",
        title: "Discovery by Adventure & Nature Trekkers",
        badge: "Eco-Tourism",
        description: "Deomali transformed into Odisha's premier hill trekking and paragliding destination, celebrated for its rolling velvet green hills, sea of clouds, and cold mountain breeze."
    },
    {
        year: "Present Day",
        title: "OTDC Eco-Tourism & Tribal Heritage Hub",
        badge: "Conservation",
        description: "Odisha Tourism (OTDC) established eco-cottages and nature camps at the foothills, promoting sustainable tribal tourism and nature conservation."
    }
];

const DEOMALI_HIGHLIGHTS = [
    {
        id: "deomali-summit",
        title: "Deomali 1,672m Peak Viewpoint",
        subtitle: "The Crown of Odisha",
        icon: "⛰️",
        tag: "Highest Peak",
        description: "The apex summit point of Odisha offering breathtaking 360-degree views of undulating Eastern Ghats ranges, deep river valleys, and swirling cloud layers."
    },
    {
        id: "rolling-meadows",
        title: "Velvet Green Grasslands",
        subtitle: "Rolling Sahyadri-like Tablelands",
        icon: "🌱",
        tag: "Landscape",
        description: "Expansive high-altitude grassy tablelands that turn lush emerald green during monsoon and golden bronze in winter, ideal for ridge walking and landscape photography."
    },
    {
        id: "kunduli-market",
        title: "Kunduli Weekly Tribal Market",
        subtitle: "Vibrant Indigenous Trade",
        icon: "🧺",
        tag: "Cultural Heritage",
        description: "Located near the base of Deomali, Kunduli hosts South Odisha's largest Friday tribal market where Paraja and Mali tribes trade organic produce, terracotta, and handmade crafts."
    },
    {
        id: "koraput-coffee",
        title: "Koraput Coffee & Spice Valleys",
        subtitle: "Highland Agro-Forestry",
        icon: "☕",
        tag: "Local Specialty",
        description: "The cool climate of Koraput hills surrounding Deomali nurtures premium organic Arabica coffee, black pepper plantations, and silver oak forests."
    },
    {
        id: "cloud-sea",
        title: "Sea of Clouds & Sunrise Point",
        subtitle: "Early Morning Phenomenon",
        icon: "🌅",
        tag: "Natural Phenomenon",
        description: "At dawn, clouds settle into the valleys below the peak, creating a mesmerizing 'sea of clouds' effect where mountain tops appear as islands in a white ocean."
    },
    {
        id: "rani-duduma",
        title: "Rani Duduma & Water Cascades",
        subtitle: "Crystal Mountain Streams",
        icon: "🌊",
        tag: "Water Cascades",
        description: "Perennial hill streams tumbling down the rocky slopes of Deomali, forming scenic cascades like Rani Duduma and feeding the Kolab and Machkund river basins."
    }
];

const DEOMALI_TREK_STEPS = [
    {
        step: 1,
        title: "Deomali Foothills Base to Hill Ridge",
        duration: "45 mins",
        terrain: "Winding soil trail & grassy meadows",
        description: "The trek begins from the nature camp parking area. The trail ascends gently through terraced fields and open grassy slopes with cool mountain air."
    },
    {
        step: 2,
        title: "Ridge Walk Along Eastern Ghats Crest",
        duration: "45 mins",
        terrain: "Open ridge trail & rocky outcrops",
        description: "Walk along the breezy mountain ridge connecting lower knolls to the main Deomali massif. Panoramic views of surrounding valleys open up on both sides."
    },
    {
        step: 3,
        title: "Final Summit Climb to 1,672m Apex",
        duration: "30–45 mins",
        terrain: "Steep stone steps & peak plateau",
        description: "The final stretch ascends carved stone steps leading to the Deomali summit marker. Stand at Odisha's highest point and enjoy unobstructed horizon views."
    },
    {
        step: 4,
        title: "Summit Exploration & Sunset / Sunrise View",
        duration: "45–60 mins",
        terrain: "Flat grassy peak plateau",
        description: "Explore the summit tableland, photograph the swirling cloud carpets, visit the sunrise viewpoint, and soak in the tranquil mountain atmosphere."
    }
];

const DEOMALI_CHECKLIST = [
    { id: "shoes", text: "Comfortable trekking shoes or trail runners with firm rubber grip", category: "Footwear" },
    { id: "warm", text: "Warm jacket / windcheater (temperatures drop sharply at summit & early morning)", category: "Clothing" },
    { id: "water", text: "2 Liters of drinking water & energy drinks", category: "Hydration" },
    { id: "sun", text: "Sunglasses, wide-brim hat, and sunscreen (strong high-altitude sun)", category: "Protection" },
    { id: "camera", text: "Camera or smartphone with extra battery / power bank (stunning vistas)", category: "Gear" },
    { id: "cash", text: "Cash notes for local tribal handicrafts & Kunduli market snacks", category: "Essentials" }
];

const DEOMALI_GALLERY = [
    {
        id: "gallery-deomali-hero",
        title: "Deomali 1,672m Summit Peak",
        emoji: "⛰️",
        caption: "The majestic peak of Deomali rising above Eastern Ghats cloud blankets."
    },
    {
        id: "gallery-cloud-sea",
        title: "Morning Sea of Clouds",
        emoji: "🌅",
        caption: "Spectacular sunrise over a sea of white clouds enveloping Koraput valleys."
    },
    {
        id: "gallery-meadows",
        title: "Rolling Velvet Meadows",
        emoji: "🌱",
        caption: "Expansive green tablelands stretching across Deomali high-altitude ridge."
    },
    {
        id: "gallery-tribal",
        title: "Koraput Tribal Heritage",
        emoji: "🧺",
        caption: "Vibrant cultural colors and organic produce at the Kunduli weekly market."
    },
    {
        id: "gallery-coffee",
        title: "Koraput Coffee Plantations",
        emoji: "☕",
        caption: "Shade-grown organic Arabica coffee plantations in the foothills of Pottangi."
    },
    {
        id: "gallery-sunset",
        title: "Golden Hour Over Eastern Ghats",
        emoji: "🌇",
        caption: "Panoramic evening light illuminating mountain ridges and valleys."
    }
];

/* ==========================================================================
   Itinerary Planner Data
   Comprehensive dataset of Indian states with attractions, foods, and experiences.
   ========================================================================== */

const statesData = [
    {
        id: "rajasthan",
        name: "Rajasthan",
        region: "North India",
        suggestedDays: 4,
        tags: "Forts • Desert • Royalty",
        attractions: ["Amber Fort", "Hawa Mahal", "City Palace", "Jaisalmer Desert"],
        foods: [
            { name: "Dal Baati Churma", category: "Main Course", icon: "🍲" },
            { name: "Ghewar", category: "Dessert", icon: "🍯" },
            { name: "Laal Maas", category: "Non-Veg", icon: "🍖" }
        ],
        experiences: ["Camel Safari in Thar", "Light & Sound Show"],
        bestTime: "October to March",
        tip: "Begin in Jaipur for easier connectivity and gradual acclimatization to the desert climate."
    },
    {
        id: "kerala",
        name: "Kerala",
        region: "South India",
        suggestedDays: 4,
        tags: "Backwaters • Ayurveda • Spices",
        attractions: ["Alleppey Backwaters", "Munnar Tea Gardens", "Fort Kochi"],
        foods: [
            { name: "Appam with Stew", category: "Breakfast", icon: "🥞" },
            { name: "Kerala Sadya", category: "Feast", icon: "🍛" },
            { name: "Karimeen Pollichathu", category: "Seafood", icon: "🐟" }
        ],
        experiences: ["Kathakali Performance", "Houseboat Stay"],
        bestTime: "September to March",
        tip: "Book your Alleppey houseboat at least 2 weeks in advance during peak season."
    },
    {
        id: "gujarat",
        name: "Gujarat",
        region: "West India",
        suggestedDays: 3,
        tags: "Rann Utsav • Temples • Heritage",
        attractions: ["Rann of Kutch", "Somnath Temple", "Sabarmati Ashram"],
        foods: [
            { name: "Dhokla", category: "Snack", icon: "🍰" },
            { name: "Thepla", category: "Bread", icon: "🫓" },
            { name: "Undhiyu", category: "Winter Special", icon: "🥘" }
        ],
        experiences: ["Rann Utsav Cultural Fest", "Asiatic Lion Safari"],
        bestTime: "November to February",
        tip: "Visit the Rann of Kutch on a full moon night for a surreal, glowing white desert experience."
    },
    {
        id: "tamil-nadu",
        name: "Tamil Nadu",
        region: "South India",
        suggestedDays: 4,
        tags: "Temples • Classical Dance • Hills",
        attractions: ["Meenakshi Temple", "Brihadeeswarar Temple", "Ooty"],
        foods: [
            { name: "Chettinad Chicken", category: "Non-Veg", icon: "🍗" },
            { name: "Filter Coffee", category: "Beverage", icon: "☕" },
            { name: "Idli & Sambar", category: "Breakfast", icon: "🥣" }
        ],
        experiences: ["Bharatanatyam Recital", "Temple Chariot Festival"],
        bestTime: "November to February",
        tip: "Hire a local guide at Meenakshi Temple to fully understand the intricate Dravidian architecture."
    },
    {
        id: "maharashtra",
        name: "Maharashtra",
        region: "West India",
        suggestedDays: 3,
        tags: "Caves • Bollywood • Coast",
        attractions: ["Ajanta & Ellora Caves", "Gateway of India", "Marine Drive"],
        foods: [
            { name: "Vada Pav", category: "Street Food", icon: "🍔" },
            { name: "Pav Bhaji", category: "Street Food", icon: "🍲" },
            { name: "Puran Poli", category: "Dessert", icon: "🥞" }
        ],
        experiences: ["Bollywood Studio Tour", "Konkan Railway Journey"],
        bestTime: "October to February",
        tip: "Visit Ajanta and Ellora caves early in the morning to avoid crowds and harsh afternoon heat."
    },
    {
        id: "himachal",
        name: "Himachal Pradesh",
        region: "North India",
        suggestedDays: 4,
        tags: "Mountains • Snow • Monasteries",
        attractions: ["Rohtang Pass", "Shimla Mall Road", "Key Monastery"],
        foods: [
            { name: "Siddu", category: "Bread", icon: "🥟" },
            { name: "Dham", category: "Feast", icon: "🍛" },
            { name: "Madra", category: "Curry", icon: "🥘" }
        ],
        experiences: ["Skiing in Solang Valley", "Toy Train Ride"],
        bestTime: "March to June, December to February",
        tip: "Acclimatize properly in Shimla or Manali before heading to higher altitudes like Rohtang Pass."
    },
    {
        id: "assam",
        name: "Assam",
        region: "Northeast India",
        suggestedDays: 3,
        tags: "Tea • Rhinos • Rivers",
        attractions: ["Kaziranga National Park", "Majuli Island", "Kamakhya Temple"],
        foods: [
            { name: "Masor Tenga", category: "Fish Curry", icon: "🐟" },
            { name: "Pitha", category: "Snack", icon: "🍘" },
            { name: "Assam Tea", category: "Beverage", icon: "🍵" }
        ],
        experiences: ["Jeep Safari in Kaziranga", "River Rafting on Brahmaputra"],
        bestTime: "November to April",
        tip: "Book your Kaziranga safari permits online in advance; they sell out quickly during peak season."
    },
    {
        id: "karnataka",
        name: "Karnataka",
        region: "South India",
        suggestedDays: 4,
        tags: "Ruins • Palaces • Beaches",
        attractions: ["Hampi Ruins", "Mysore Palace", "Gokarna Beach"],
        foods: [
            { name: "Bisi Bele Bath", category: "Rice Dish", icon: "🍚" },
            { name: "Mysore Pak", category: "Dessert", icon: "🍮" },
            { name: "Dharwad Peda", category: "Sweet", icon: "🍬" }
        ],
        experiences: ["Dasara Festival in Mysore", "Coracle Ride in Hampi"],
        bestTime: "October to February",
        tip: "Rent a moped to explore the vast, scattered ruins of Hampi efficiently."
    }
];

/**
 * Logical grouping of states for itinerary optimization.
 * Used to suggest a smooth travel flow and group nearby states.
 * @type {Object}
 */
const stateRegions = {
    "North India": ["rajasthan", "himachal"],
    "West India": ["gujarat", "maharashtra"],
    "South India": ["kerala", "tamil-nadu", "karnataka"],
    "Northeast India": ["assam"]
};

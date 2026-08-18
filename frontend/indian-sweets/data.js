// The Sweet Tooth Explorer Data

const INDIAN_SWEETS_DATA = [
    {
        id: "rasgulla",
        name: "Rasgulla",
        categories: ["milk"],
        state: "West Bengal",
        ingredients: ["Chenna (curdled milk)", "Sugar syrup"],
        festivals: ["Durga Puja", "Diwali"],
        image: "🤍", // Emoji placeholder for image
        bgColor: "#f8f9fa", // Soft white/cream
        color: "#555555"
    },
    {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        categories: ["milk", "flour"],
        state: "North India (Widespread)",
        ingredients: ["Khoya (milk solids)", "Maida (flour)", "Sugar syrup", "Rose water"],
        festivals: ["Diwali", "Eid", "Holi"],
        image: "🧆", // Closest emoji
        bgColor: "#5d4037", // Deep brown
        color: "#ffffff"
    },
    {
        id: "jalebi",
        name: "Jalebi",
        categories: ["flour"],
        state: "North India (Widespread)",
        ingredients: ["Maida (flour)", "Sugar syrup", "Saffron", "Ghee"],
        festivals: ["Dussehra", "Diwali", "Republic Day"],
        image: "🥨",
        bgColor: "#ff9800", // Saffron orange
        color: "#ffffff"
    },
    {
        id: "mysore-pak",
        name: "Mysore Pak",
        categories: ["flour"],
        state: "Karnataka",
        ingredients: ["Besan (gram flour)", "Ghee", "Sugar"],
        festivals: ["Diwali", "Dussehra"],
        image: "🧈",
        bgColor: "#ffd54f", // Yellowish cream
        color: "#5d4037"
    },
    {
        id: "kalakand",
        name: "Kalakand",
        categories: ["milk"],
        state: "Rajasthan",
        ingredients: ["Milk", "Sugar", "Cardamom", "Nuts"],
        festivals: ["Diwali", "Raksha Bandhan"],
        image: "🍰",
        bgColor: "#eeeeee", // Milk white
        color: "#424242"
    },
    {
        id: "malpua",
        name: "Malpua",
        categories: ["flour", "milk"],
        state: "Odisha, Rajasthan",
        ingredients: ["Flour", "Milk", "Fennel seeds", "Sugar syrup"],
        festivals: ["Holi", "Diwali", "Jagannath Rath Yatra"],
        image: "🥞",
        bgColor: "#ffb74d", // Orange-brown
        color: "#3e2723"
    },
    {
        id: "gujiya",
        name: "Gujiya",
        categories: ["flour", "festival"],
        state: "North India",
        ingredients: ["Maida", "Khoya", "Dry fruits", "Sugar"],
        festivals: ["Holi", "Teej"],
        image: "🥟",
        bgColor: "#e0e0e0", // Neutral pastry color
        color: "#333"
    },
    {
        id: "modak",
        name: "Modak",
        categories: ["flour", "festival"],
        state: "Maharashtra",
        ingredients: ["Rice flour", "Coconut", "Jaggery"],
        festivals: ["Ganesh Chaturthi"],
        image: "🥟",
        bgColor: "#ffffff",
        color: "#ff6f00"
    },
    {
        id: "kaju-katli",
        name: "Kaju Katli",
        categories: ["festival"], // Though nut-based, often grouped here
        state: "Widespread",
        ingredients: ["Cashews", "Sugar", "Ghee", "Silver leaf (vark)"],
        festivals: ["Diwali", "Raksha Bandhan"],
        image: "💠",
        bgColor: "#eceff1", // Silver/white
        color: "#37474f"
    },
    {
        id: "sandesh",
        name: "Sandesh",
        categories: ["milk"],
        state: "West Bengal",
        ingredients: ["Chenna", "Sugar or Jaggery", "Cardamom"],
        festivals: ["Durga Puja", "Poila Baisakh"],
        image: "🍮",
        bgColor: "#fff3e0", // Warm cream
        color: "#5d4037"
    }
];

// Export to window
window.INDIAN_SWEETS_DATA = INDIAN_SWEETS_DATA;

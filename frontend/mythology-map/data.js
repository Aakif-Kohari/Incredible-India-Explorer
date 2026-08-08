// data.js - Epic Mythology Map Data

window.mythologyData = [
    // Ramayana Locations
    {
        id: "ayodhya",
        name: "Ayodhya",
        epic: "Ramayana",
        state: "Uttar Pradesh",
        coordinates: { x: 58, y: 38 }, // approximate percentage relative to map container
        image: "assets/ayodhya.jpg",
        characters: ["Rama", "Sita", "Lakshmana", "Dasharatha"],
        significance: "The birthplace of Lord Rama and the capital of the ancient Kosala Kingdom.",
        description: "A major pilgrimage site traditionally revered as the setting for the early and concluding chapters of the Ramayana."
    },
    {
        id: "mithila",
        name: "Mithila",
        epic: "Ramayana",
        state: "Bihar / Nepal border",
        coordinates: { x: 72, y: 39 },
        image: "assets/ayodhya.jpg", // using placeholder
        characters: ["Sita", "Janaka", "Rama"],
        significance: "The birthplace of Goddess Sita and the kingdom of King Janaka.",
        description: "The location where Rama lifted the Shiva Dhanush (bow) to win Sita's hand in marriage."
    },
    {
        id: "chitrakoot",
        name: "Chitrakoot",
        epic: "Ramayana",
        state: "Madhya Pradesh / UP border",
        coordinates: { x: 57, y: 45 },
        image: "assets/ayodhya.jpg",
        characters: ["Rama", "Sita", "Lakshmana", "Bharata"],
        significance: "The serene forest where Rama, Sita, and Lakshmana spent a significant portion of their exile.",
        description: "It was here that Bharata came to persuade Rama to return to Ayodhya, an event known as 'Bharat Milap'."
    },
    {
        id: "panchavati",
        name: "Panchavati",
        epic: "Ramayana",
        state: "Maharashtra (Nashik)",
        coordinates: { x: 30, y: 60 },
        image: "assets/panchavati.jpg",
        characters: ["Rama", "Sita", "Lakshmana", "Ravana", "Surpanakha"],
        significance: "The forest dwelling where the pivotal abduction of Sita by Ravana took place.",
        description: "Situated on the banks of the Godavari river, it was the site of the encounter with the demoness Surpanakha."
    },
    {
        id: "kishkindha",
        name: "Kishkindha",
        epic: "Ramayana",
        state: "Karnataka (Hampi region)",
        coordinates: { x: 35, y: 72 },
        image: "assets/ayodhya.jpg",
        characters: ["Hanuman", "Sugriva", "Vali", "Rama"],
        significance: "The legendary monkey (Vanara) kingdom ruled by King Sugriva.",
        description: "Here, Rama met Hanuman and forged an alliance with Sugriva to search for Sita."
    },
    {
        id: "rameswaram",
        name: "Rameswaram",
        epic: "Ramayana",
        state: "Tamil Nadu",
        coordinates: { x: 42, y: 92 },
        image: "assets/rameswaram.jpg",
        characters: ["Rama", "Shiva", "Hanuman", "Vibhishana"],
        significance: "The point from which the bridge (Rama Setu) was built to Lanka.",
        description: "Traditionally, it is where Rama worshipped Lord Shiva to absolve the sin of killing Ravana (a Brahmin)."
    },

    // Mahabharata Locations
    {
        id: "hastinapur",
        name: "Hastinapur",
        epic: "Mahabharata",
        state: "Uttar Pradesh",
        coordinates: { x: 47, y: 31 },
        image: "assets/hastinapur.jpg",
        characters: ["Dhritarashtra", "Bhishma", "Duryodhana", "Yudhishthira"],
        significance: "The capital of the Kuru Kingdom and the epicenter of the dynastic struggle.",
        description: "The throne of Hastinapur was the primary cause of the great Kurukshetra War between the Kauravas and Pandavas."
    },
    {
        id: "indraprastha",
        name: "Indraprastha",
        epic: "Mahabharata",
        state: "Delhi",
        coordinates: { x: 45, y: 33 },
        image: "assets/kurukshetra.jpg",
        characters: ["Yudhishthira", "Arjuna", "Krishna", "Maya Danava"],
        significance: "The magnificent capital city built by the Pandavas.",
        description: "Renowned for its illusionary palace (Maya Sabha) which humiliated Duryodhana, accelerating the path to war."
    },
    {
        id: "kurukshetra",
        name: "Kurukshetra",
        epic: "Mahabharata",
        state: "Haryana",
        coordinates: { x: 43, y: 28 },
        image: "assets/kurukshetra.jpg",
        characters: ["Krishna", "Arjuna", "Bhishma", "Karna"],
        significance: "Site of the epic Kurukshetra War and the setting for the Bhagavad Gita.",
        description: "A major historical region associated with the 18-day war that forms the climax of the Mahabharata."
    },
    {
        id: "dwaraka",
        name: "Dwaraka",
        epic: "Mahabharata",
        state: "Gujarat",
        coordinates: { x: 12, y: 48 },
        image: "assets/dwaraka.jpg",
        characters: ["Krishna", "Balarama", "Rukmini"],
        significance: "The legendary island city and capital established by Lord Krishna.",
        description: "According to tradition, the city submerged into the Arabian Sea after Krishna's departure from the world."
    },
    {
        id: "mathura",
        name: "Mathura",
        epic: "Mahabharata",
        state: "Uttar Pradesh",
        coordinates: { x: 46, y: 36 },
        image: "assets/kurukshetra.jpg",
        characters: ["Krishna", "Kamsa", "Devaki", "Vasudeva"],
        significance: "The birthplace of Lord Krishna and capital of the Surasena Kingdom.",
        description: "The site where Krishna eventually returned to slay his tyrannical uncle, King Kamsa."
    },
    {
        id: "virata",
        name: "Virata Kingdom",
        epic: "Mahabharata",
        state: "Rajasthan (Matsya)",
        coordinates: { x: 38, y: 35 },
        image: "assets/kurukshetra.jpg",
        characters: ["Pandavas", "Draupadi", "King Virata", "Kichaka"],
        significance: "The kingdom where the Pandavas spent their 13th year of exile in disguise (Agyatavasa).",
        description: "It was from here that the Pandavas finally revealed their identities before the great war."
    }
];

/**
 * UNESCO Heritage Explorer
 * heritage-data.js
 *
 * Structured dataset used by heritage.js.
 */

const HERITAGE_DATA = [
    {
        id: "taj-mahal",
        name: "Taj Mahal",
        state: "Uttar Pradesh",
        location: "Agra, Uttar Pradesh",
        category: "Cultural",
        year: 1983,
        period: "Mughal Era",
        duration: "2–3 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
        description:
            "The Taj Mahal is one of India's most celebrated monuments and a masterpiece of Mughal architecture.",
        significance:
            "Built in the 17th century, the monument is renowned for its white marble architecture, intricate ornamentation and symmetrical garden complex.",
        nearby: [
            "Agra Fort",
            "Mehtab Bagh",
            "Itmad-ud-Daulah"
        ]
    },

    {
        id: "agra-fort",
        name: "Agra Fort",
        state: "Uttar Pradesh",
        location: "Agra, Uttar Pradesh",
        category: "Cultural",
        year: 1983,
        period: "Mughal Era",
        duration: "2–3 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Agra_03-2016_08_Agra-Fort.jpg",
        description:
            "A monumental red sandstone fortress that served as an important imperial residence of the Mughal rulers.",
        significance:
            "The fort represents the architectural and political history of the Mughal Empire and contains palaces, halls and mosques.",
        nearby: [
            "Taj Mahal",
            "Mehtab Bagh",
            "Akbar's Tomb"
        ]
    },

    {
        id: "qutb-minar",
        name: "Qutb Minar and its Monuments",
        state: "Delhi",
        location: "Mehrauli, Delhi",
        category: "Cultural",
        year: 1993,
        period: "Delhi Sultanate",
        duration: "1.5–2 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Qutb_Minar_01.jpg",
        description:
            "A historic architectural complex centered around the famous Qutb Minar tower.",
        significance:
            "The complex demonstrates the development of Indo-Islamic architecture in the Indian subcontinent.",
        nearby: [
            "Mehrauli Archaeological Park",
            "Iron Pillar",
            "Jamali Kamali"
        ]
    },

    {
        id: "red-fort",
        name: "Red Fort Complex",
        state: "Delhi",
        location: "Old Delhi, Delhi",
        category: "Cultural",
        year: 2007,
        period: "Mughal Era",
        duration: "2–3 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Red_Fort_in_Delhi_03-2016_img3.jpg",
        description:
            "The Red Fort is a major Mughal-era fortress and an important symbol of India's history.",
        significance:
            "The fort was built by Shah Jahan and served as the principal residence of Mughal emperors for generations.",
        nearby: [
            "Jama Masjid",
            "Chandni Chowk",
            "Raj Ghat"
        ]
    },

    {
        id: "jaipur-city",
        name: "The Walled City of Jaipur",
        state: "Rajasthan",
        location: "Jaipur, Rajasthan",
        category: "Cultural",
        year: 2019,
        period: "18th Century",
        duration: "Half day",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Hawa_Mahal_2011.jpg",
        description:
            "The historic walled city of Jaipur is known for its planned streets, markets and distinctive architecture.",
        significance:
            "Jaipur represents an early example of a planned Indian city influenced by traditional Hindu and Mughal architectural ideas.",
        nearby: [
            "Hawa Mahal",
            "City Palace",
            "Jantar Mantar"
        ]
    },

    {
        id: "jantar-mantar",
        name: "The Jantar Mantar, Jaipur",
        state: "Rajasthan",
        location: "Jaipur, Rajasthan",
        category: "Cultural",
        year: 2010,
        period: "18th Century",
        duration: "1–2 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Jantar_Mantar_at_Jaipur.jpg",
        description:
            "An astronomical observation site containing monumental instruments designed to measure celestial positions.",
        significance:
            "It demonstrates the scientific and astronomical knowledge of the 18th-century Rajput court.",
        nearby: [
            "City Palace",
            "Hawa Mahal",
            "Albert Hall Museum"
        ]
    },

    {
        id: "ajanta-caves",
        name: "Ajanta Caves",
        state: "Maharashtra",
        location: "Aurangabad region, Maharashtra",
        category: "Cultural",
        year: 1983,
        period: "Ancient India",
        duration: "3–4 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Ajanta_Caves%2C_India.jpg",
        description:
            "A remarkable group of rock-cut Buddhist caves containing sculptures and paintings.",
        significance:
            "The caves preserve important examples of ancient Indian Buddhist art and religious architecture.",
        nearby: [
            "Ellora Caves",
            "Bibi Ka Maqbara",
            "Daulatabad Fort"
        ]
    },

    {
        id: "ellora-caves",
        name: "Ellora Caves",
        state: "Maharashtra",
        location: "Verul, Maharashtra",
        category: "Cultural",
        year: 1983,
        period: "Ancient and Medieval India",
        duration: "3–5 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Kailasa_temple_at_Ellora.jpg",
        description:
            "A spectacular complex of rock-cut temples and monasteries representing Buddhist, Hindu and Jain traditions.",
        significance:
            "Ellora demonstrates religious coexistence and outstanding rock-cut architectural achievement.",
        nearby: [
            "Daulatabad Fort",
            "Grishneshwar Temple",
            "Ajanta Caves"
        ]
    },

    {
        id: "konark-sun-temple",
        name: "Sun Temple, Konark",
        state: "Odisha",
        location: "Konark, Odisha",
        category: "Cultural",
        year: 1984,
        period: "13th Century",
        duration: "1.5–2 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Konarka_Temple.jpg",
        description:
            "A monumental temple designed as a colossal stone chariot dedicated to the Sun God.",
        significance:
            "The temple is celebrated for its architectural design, sculpture and representation of a divine chariot.",
        nearby: [
            "Chandrabhaga Beach",
            "Puri",
            "Jagannath Temple"
        ]
    },

    {
        id: "khajuraho",
        name: "Khajuraho Group of Monuments",
        state: "Madhya Pradesh",
        location: "Khajuraho, Madhya Pradesh",
        category: "Cultural",
        year: 1986,
        period: "Chandela Period",
        duration: "3–4 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Khajuraho_group_of_monuments_3.jpg",
        description:
            "A celebrated group of Hindu and Jain temples decorated with intricate stone carvings.",
        significance:
            "The temples are renowned for their sophisticated architecture and extensive sculptural program.",
        nearby: [
            "Panna National Park",
            "Raneh Falls",
            "Panna"
        ]
    },

    {
        id: "hampi",
        name: "Group of Monuments at Hampi",
        state: "Karnataka",
        location: "Hampi, Karnataka",
        category: "Cultural",
        year: 1986,
        period: "Vijayanagara Empire",
        duration: "Full day",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Hampi_virupaksha_temple.jpg",
        description:
            "The ruins of Hampi preserve the monumental remains of the Vijayanagara Empire.",
        significance:
            "The site contains temples, palaces, markets and public structures that reveal the scale of the historic imperial capital.",
        nearby: [
            "Virupaksha Temple",
            "Vittala Temple",
            "Tungabhadra River"
        ]
    },

    {
        id: "mahabalipuram",
        name: "Group of Monuments at Mahabalipuram",
        state: "Tamil Nadu",
        location: "Mahabalipuram, Tamil Nadu",
        category: "Cultural",
        year: 1984,
        period: "Pallava Period",
        duration: "3–4 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Shore_Temple_-_Mamallapuram_-_India.jpg",
        description:
            "A group of ancient monuments carved in stone along the Coromandel Coast.",
        significance:
            "The monuments represent the artistic achievements of the Pallava dynasty and early Dravidian architecture.",
        nearby: [
            "Shore Temple",
            "Pancha Rathas",
            "Arjuna's Penance"
        ]
    },

    {
        id: "kaziranga",
        name: "Kaziranga National Park",
        state: "Assam",
        location: "Assam",
        category: "Natural",
        year: 1985,
        period: "Modern Conservation Era",
        duration: "Full day",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/One_horned_rhinoceros_Kaziranga.jpg",
        description:
            "A major protected natural landscape famous for its population of the greater one-horned rhinoceros.",
        significance:
            "The park supports important biodiversity and habitats including wetlands, grasslands and forests.",
        nearby: [
            "Orang National Park",
            "Majuli",
            "Guwahati"
        ]
    },

    {
        id: "sundarbans",
        name: "Sundarbans National Park",
        state: "West Bengal",
        location: "Sundarbans, West Bengal",
        category: "Natural",
        year: 1987,
        period: "Modern Conservation Era",
        duration: "1–2 days",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Royal_Bengal_Tiger_Sundarbans.jpg",
        description:
            "A vast mangrove ecosystem forming part of the Sundarbans delta.",
        significance:
            "The area is an important habitat for wildlife including the Bengal tiger and many aquatic and bird species.",
        nearby: [
            "Gosaba",
            "Sajnekhali",
            "Kolkata"
        ]
    },

    {
        id: "western-ghats",
        name: "Western Ghats",
        state: "Multiple States",
        location: "Western India",
        category: "Natural",
        year: 2012,
        period: "Geological and Ecological",
        duration: "Varies",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Western_Ghats.jpg",
        description:
            "A mountain chain running along India's western coast and containing exceptional biodiversity.",
        significance:
            "The Western Ghats are recognized for their high levels of endemic species and important ecological systems.",
        nearby: [
            "Munnar",
            "Goa",
            "Coorg"
        ]
    },

    {
        id: "great-himalayan-national-park",
        name: "Great Himalayan National Park",
        state: "Himachal Pradesh",
        location: "Kullu, Himachal Pradesh",
        category: "Natural",
        year: 2014,
        period: "Modern Conservation Era",
        duration: "1–3 days",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Great_Himalayan_National_Park.jpg",
        description:
            "A protected Himalayan landscape containing forests, alpine meadows and diverse wildlife.",
        significance:
            "The park conserves Himalayan biodiversity and fragile mountain ecosystems.",
        nearby: [
            "Kullu",
            "Manali",
            "Tirthan Valley"
        ]
    },

    {
        id: "ramappa-temple",
        name: "Kakatiya Rudreshwara (Ramappa) Temple",
        state: "Telangana",
        location: "Palampet, Telangana",
        category: "Cultural",
        year: 2021,
        period: "Kakatiya Period",
        duration: "1–2 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Ramappa_Temple.jpg",
        description:
            "A remarkable medieval temple complex associated with the Kakatiya dynasty.",
        significance:
            "The temple is noted for its detailed sculpture, architectural innovation and distinctive building techniques.",
        nearby: [
            "Warangal Fort",
            "Thousand Pillar Temple",
            "Ramappa Lake"
        ]
    },

    {
        id: "dholavira",
        name: "Dholavira: A Harappan City",
        state: "Gujarat",
        location: "Kutch, Gujarat",
        category: "Cultural",
        year: 2021,
        period: "Harappan Civilization",
        duration: "2–3 hours",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Dholavira.jpg",
        description:
            "An important archaeological site representing one of the major urban settlements of the Indus Valley Civilization.",
        significance:
            "The site provides evidence of sophisticated urban planning, water management and craftsmanship.",
        nearby: [
            "Great Rann of Kutch",
            "Bhuj",
            "Kala Dungar"
        ]
    }
];

if (typeof window !== "undefined") {
    window.HERITAGE_DATA = HERITAGE_DATA;
}
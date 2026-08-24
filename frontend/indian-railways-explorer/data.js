const RAILWAY_MILESTONES = [
    {
        year: 1853,
        title: "First Passenger Train",
        description: "The first passenger train in India operated between Bombay (Bori Bunder) and Thane on 16th April 1853, covering a distance of 34 kilometers.",
        location: "Bombay (Mumbai)"
    },
    {
        year: 1854,
        title: "Eastern Network Expansion",
        description: "The first passenger train in the eastern region ran from Howrah to Hooghly. Railway services began expanding beyond the Bombay region.",
        location: "Howrah"
    },
    {
        year: 1881,
        title: "Darjeeling Himalayan Railway",
        description: "The famous narrow-gauge mountain railway began operations, showcasing remarkable engineering across steep Himalayan terrain.",
        location: "Darjeeling, West Bengal"
    },
    {
        year: 1903,
        title: "Kalka–Shimla Railway",
        description: "A major engineering achievement through the Himalayan terrain, this 96km line connected Kalka with Shimla, the summer capital of British India.",
        location: "Himachal Pradesh"
    },
    {
        year: 1925,
        title: "First Electric Train",
        description: "Electric suburban train services began in the Bombay region between Victoria Terminus and Kurla on 3rd February 1925.",
        location: "Bombay (Mumbai)"
    },
    {
        year: 1951,
        title: "Railway Integration",
        description: "Post-independence, the diverse railway systems across the country were reorganized and unified into the single entity known as Indian Railways.",
        location: "India"
    },
    {
        year: 1984,
        title: "First Metro Railway",
        description: "Kolkata became home to India's first metro railway, pioneering urban mass rapid transit in the country.",
        location: "Kolkata"
    },
    {
        year: 1988,
        title: "Shatabdi Express",
        description: "The first Shatabdi Express was introduced between New Delhi and Jhansi, revolutionizing intercity fast-passenger transport.",
        location: "New Delhi"
    },
    {
        year: 2019,
        title: "Vande Bharat Express",
        description: "India's first semi-high-speed, independently designed trainset service was introduced between New Delhi and Varanasi.",
        location: "India"
    },
    {
        year: 2024,
        title: "Ongoing Modernization",
        description: "Indian Railways continues to rapidly modernize its network, stations (Amrit Bharat Station Scheme), trains, and dedicated freight corridors.",
        location: "Pan-India"
    }
];

const MAJOR_ROUTES = [
    {
        id: "delhi-mumbai",
        name: "Delhi → Mumbai",
        cities: ["New Delhi", "Mathura", "Kota", "Ratlam", "Vadodara", "Surat", "Mumbai"],
        region: "North India → Western India",
        description: "A vital passenger and freight corridor connecting the national capital with the financial capital.",
        coordinates: [
            { lat: 28.64, lng: 77.22 }, // Delhi
            { lat: 27.49, lng: 77.67 }, // Mathura
            { lat: 25.18, lng: 75.83 }, // Kota
            { lat: 23.33, lng: 75.03 }, // Ratlam
            { lat: 22.30, lng: 73.18 }, // Vadodara
            { lat: 21.17, lng: 72.83 }, // Surat
            { lat: 18.97, lng: 72.82 }  // Mumbai
        ]
    },
    {
        id: "delhi-kolkata",
        name: "Delhi → Kolkata",
        cities: ["New Delhi", "Kanpur", "Prayagraj", "Deen Dayal Upadhyaya", "Gaya", "Dhanbad", "Howrah"],
        region: "North India → Eastern India",
        description: "The historic Grand Chord route connecting Delhi with Kolkata, known for the fastest train services in the east.",
        coordinates: [
            { lat: 28.64, lng: 77.22 }, // Delhi
            { lat: 26.44, lng: 80.33 }, // Kanpur
            { lat: 25.43, lng: 81.84 }, // Prayagraj
            { lat: 25.28, lng: 83.11 }, // DDU
            { lat: 24.79, lng: 85.00 }, // Gaya
            { lat: 23.79, lng: 86.43 }, // Dhanbad
            { lat: 22.58, lng: 88.34 }  // Howrah
        ]
    },
    {
        id: "delhi-chennai",
        name: "Delhi → Chennai",
        cities: ["New Delhi", "Agra", "Gwalior", "Bhopal", "Nagpur", "Balharshah", "Warangal", "Vijayawada", "Chennai"],
        region: "North India → South India",
        description: "The Grand Trunk route spanning across the center of India to the deep south.",
        coordinates: [
            { lat: 28.64, lng: 77.22 }, // Delhi
            { lat: 27.17, lng: 78.00 }, // Agra
            { lat: 26.21, lng: 78.17 }, // Gwalior
            { lat: 23.25, lng: 77.41 }, // Bhopal
            { lat: 21.14, lng: 79.08 }, // Nagpur
            { lat: 19.84, lng: 79.35 }, // Balharshah
            { lat: 17.96, lng: 79.59 }, // Warangal
            { lat: 16.50, lng: 80.64 }, // Vijayawada
            { lat: 13.08, lng: 80.27 }  // Chennai
        ]
    },
    {
        id: "mumbai-chennai",
        name: "Mumbai → Chennai",
        cities: ["Mumbai", "Pune", "Solapur", "Kalaburagi", "Wadi", "Raichur", "Guntakal", "Renigunta", "Chennai"],
        region: "Western India → South India",
        description: "A major peninsular route connecting the western coast with the eastern coast.",
        coordinates: [
            { lat: 18.97, lng: 72.82 }, // Mumbai
            { lat: 18.52, lng: 73.85 }, // Pune
            { lat: 17.65, lng: 75.90 }, // Solapur
            { lat: 17.32, lng: 76.83 }, // Kalaburagi
            { lat: 17.06, lng: 76.99 }, // Wadi
            { lat: 16.20, lng: 77.36 }, // Raichur
            { lat: 15.16, lng: 77.37 }, // Guntakal
            { lat: 13.63, lng: 79.51 }, // Renigunta
            { lat: 13.08, lng: 80.27 }  // Chennai
        ]
    },
    {
        id: "howrah-mumbai",
        name: "Howrah → Mumbai",
        cities: ["Howrah", "Kharagpur", "Tatanagar", "Rourkela", "Bilaspur", "Raipur", "Nagpur", "Bhusawal", "Kalyan", "Mumbai"],
        region: "Eastern India → Western India",
        description: "Cross-country corridor linking the east coast with the west coast through central India.",
        coordinates: [
            { lat: 22.58, lng: 88.34 }, // Howrah
            { lat: 22.33, lng: 87.32 }, // Kharagpur
            { lat: 22.80, lng: 86.20 }, // Tatanagar
            { lat: 22.22, lng: 84.85 }, // Rourkela
            { lat: 22.07, lng: 82.13 }, // Bilaspur
            { lat: 21.25, lng: 81.62 }, // Raipur
            { lat: 21.14, lng: 79.08 }, // Nagpur
            { lat: 21.04, lng: 75.76 }, // Bhusawal
            { lat: 19.24, lng: 73.12 }, // Kalyan
            { lat: 18.97, lng: 72.82 }  // Mumbai
        ]
    },
    {
        id: "delhi-amritsar",
        name: "Delhi → Amritsar",
        cities: ["New Delhi", "Ambala", "Ludhiana", "Jalandhar", "Amritsar"],
        region: "North India",
        description: "A highly utilized corridor serving the agricultural heartland of Punjab.",
        coordinates: [
            { lat: 28.64, lng: 77.22 }, // Delhi
            { lat: 30.33, lng: 76.80 }, // Ambala
            { lat: 30.90, lng: 75.85 }, // Ludhiana
            { lat: 31.32, lng: 75.57 }, // Jalandhar
            { lat: 31.63, lng: 74.87 }  // Amritsar
        ]
    },
    {
        id: "chennai-bengaluru",
        name: "Chennai → Bengaluru",
        cities: ["Chennai", "Arakkonam", "Katpadi", "Jolarpettai", "Bangarapet", "Bengaluru"],
        region: "South India",
        description: "One of the busiest routes in southern India, frequently served by Shatabdi and Vande Bharat expresses.",
        coordinates: [
            { lat: 13.08, lng: 80.27 }, // Chennai
            { lat: 13.08, lng: 79.66 }, // Arakkonam
            { lat: 12.98, lng: 79.13 }, // Katpadi
            { lat: 12.56, lng: 78.56 }, // Jolarpettai
            { lat: 12.99, lng: 78.18 }, // Bangarapet
            { lat: 12.97, lng: 77.59 }  // Bengaluru
        ]
    },
    {
        id: "kolkata-guwahati",
        name: "Kolkata → Guwahati",
        cities: ["Howrah", "Barddhaman", "Malda Town", "New Jalpaiguri", "New Cooch Behar", "New Bongaigaon", "Guwahati"],
        region: "Eastern India → Northeast India",
        description: "The gateway route connecting the rest of India with the northeastern states.",
        coordinates: [
            { lat: 22.58, lng: 88.34 }, // Howrah
            { lat: 23.23, lng: 87.86 }, // Barddhaman
            { lat: 25.01, lng: 88.14 }, // Malda Town
            { lat: 26.68, lng: 88.43 }, // NJP
            { lat: 26.34, lng: 89.46 }, // New Cooch Behar
            { lat: 26.47, lng: 90.56 }, // New Bongaigaon
            { lat: 26.18, lng: 91.75 }  // Guwahati
        ]
    }
];

const IMPORTANT_STATIONS = [
    {
        id: "csmt",
        name: "Chhatrapati Shivaji Maharaj Terminus",
        city: "Mumbai",
        state: "Maharashtra",
        significance: "UNESCO World Heritage Site. An outstanding example of Victorian Gothic Revival architecture blended with themes deriving from Indian traditional architecture.",
        coordinates: { lat: 18.94, lng: 72.83 }
    },
    {
        id: "howrah",
        name: "Howrah Junction",
        city: "Howrah (Kolkata)",
        state: "West Bengal",
        significance: "The oldest, largest and busiest railway complex in India. One of the primary gateways to Eastern India.",
        coordinates: { lat: 22.58, lng: 88.34 }
    },
    {
        id: "ndls",
        name: "New Delhi Railway Station",
        city: "New Delhi",
        state: "Delhi",
        significance: "The main railway station in Delhi and the busiest in the country in terms of train frequency and passenger movement.",
        coordinates: { lat: 28.64, lng: 77.22 }
    },
    {
        id: "chennai-central",
        name: "Chennai Central",
        city: "Chennai",
        state: "Tamil Nadu",
        significance: "A 146-year-old architectural landmark and the main railway terminus in Chennai, serving as the gateway to the South.",
        coordinates: { lat: 13.08, lng: 80.27 }
    },
    {
        id: "varanasi",
        name: "Varanasi Junction",
        city: "Varanasi",
        state: "Uttar Pradesh",
        significance: "One of the highest revenue generating stations, connecting millions of pilgrims to the spiritual capital of India.",
        coordinates: { lat: 25.33, lng: 82.99 }
    },
    {
        id: "jaipur",
        name: "Jaipur Junction",
        city: "Jaipur",
        state: "Rajasthan",
        significance: "The headquarters of the North Western Railway zone, serving the 'Pink City' and acting as a hub for luxury tourist trains.",
        coordinates: { lat: 26.92, lng: 75.78 }
    }
];

const ICONIC_TRAINS = [
    {
        name: "Palace on Wheels",
        category: "Luxury Tourist Train",
        route: "New Delhi → Rajasthan → New Delhi",
        feature: "Voted among the best luxury trains in the world, featuring saloon cars named after Rajputana states with lavish interiors, ethnic decor, and onboard dining.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Palace_on_Wheels_Dining_Car.jpg/800px-Palace_on_Wheels_Dining_Car.jpg"
    },
    {
        name: "Vande Bharat Express",
        category: "Semi-High-Speed Express",
        route: "Multiple Routes (Pan-India)",
        feature: "India's first indigenous, semi-high-speed, engine-less trainset featuring aerodynamic design, onboard Wi-Fi, bio-vacuum toilets, and automatic doors.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vande_Bharat_Express_2.0.jpg/800px-Vande_Bharat_Express_2.0.jpg"
    },
    {
        name: "Darjeeling Himalayan Railway",
        category: "Mountain Railway (Toy Train)",
        route: "New Jalpaiguri → Darjeeling",
        feature: "A UNESCO World Heritage site known for its use of the vintage 'B-Class' steam locomotives and navigating steep gradients using ingenious loops and zig-zags.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Darjeeling_Himalayan_Railway_Steam_Locomotive.jpg/800px-Darjeeling_Himalayan_Railway_Steam_Locomotive.jpg"
    },
    {
        name: "Rajdhani Express",
        category: "Premium Passenger Train",
        route: "New Delhi → State Capitals",
        feature: "Introduced in 1969, these fully air-conditioned trains revolutionized long-distance travel in India by connecting the national capital with various state capitals at high speeds.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mumbai_Rajdhani_Express.jpg/800px-Mumbai_Rajdhani_Express.jpg"
    },
    {
        name: "Deccan Queen",
        category: "Intercity Express",
        route: "Mumbai → Pune",
        feature: "Introduced in 1930, it was the first deluxe train introduced to serve two important cities, uniquely featuring a dedicated dining car for daily commuters.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Deccan_Queen_Express_Locomotive.jpg/800px-Deccan_Queen_Express_Locomotive.jpg"
    }
];

const HERITAGE_ITEMS = [
    {
        title: "Pamban Bridge",
        type: "Railway Bridge",
        description: "India's first sea bridge, connecting Rameswaram island with the mainland. Built in 1914, it features a unique Scherzer rolling lift span.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Pamban_Bridge_-_Rameswaram_-_India.jpg/800px-Pamban_Bridge_-_Rameswaram_-_India.jpg"
    },
    {
        title: "Fairy Queen",
        type: "Steam Locomotive",
        description: "Built in 1855, the Fairy Queen is the world's oldest working steam locomotive in regular service, recognized by the Guinness Book of Records.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Fairy_Queen_locomotive.jpg/800px-Fairy_Queen_locomotive.jpg"
    },
    {
        title: "Nilgiri Mountain Railway",
        type: "Mountain Railway",
        description: "A UNESCO World Heritage site relying on its fleet of steam locomotives and unique rack-and-pinion system to climb the steep Nilgiri hills.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Nilgiri_Mountain_Railway_train.jpg/800px-Nilgiri_Mountain_Railway_train.jpg"
    },
    {
        title: "National Rail Museum",
        type: "Museum",
        description: "Located in Chanakyapuri, New Delhi, it showcases a fascinating collection of over 100 real-size exhibits of Indian Railways spanning over 160 years.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/National_Rail_Museum_Delhi.jpg/800px-National_Rail_Museum_Delhi.jpg"
    }
];

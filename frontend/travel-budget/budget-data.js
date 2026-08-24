/*
 * Smart Indian Travel Budget Estimator
 * Destination budget dataset
 *
 * Values represent approximate daily costs per person in INR.
 * These are planning estimates, not live prices.
 */

const travelBudgetData = [
    {
        id: "delhi",
        name: "Delhi",
        state: "Delhi",
        tip: "Use the Metro for affordable and convenient travel across Delhi.",
        budget: {
            accommodation: 800,
            food: 400,
            localTransport: 250,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2200,
            food: 900,
            localTransport: 500,
            activities: 600,
            miscellaneous: 300
        },
        premium: {
            accommodation: 5000,
            food: 2000,
            localTransport: 1200,
            activities: 1500,
            miscellaneous: 600
        }
    },

    {
        id: "jaipur",
        name: "Jaipur",
        state: "Rajasthan",
        tip: "Combine heritage attractions in the same area to reduce local transportation costs.",
        budget: {
            accommodation: 700,
            food: 350,
            localTransport: 250,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2000,
            food: 800,
            localTransport: 450,
            activities: 600,
            miscellaneous: 300
        },
        premium: {
            accommodation: 5000,
            food: 1800,
            localTransport: 1200,
            activities: 1400,
            miscellaneous: 600
        }
    },

    {
        id: "mumbai",
        name: "Mumbai",
        state: "Maharashtra",
        tip: "Mumbai's local trains and Metro can significantly reduce transportation expenses.",
        budget: {
            accommodation: 1000,
            food: 450,
            localTransport: 300,
            activities: 250,
            miscellaneous: 200
        },
        standard: {
            accommodation: 2800,
            food: 1000,
            localTransport: 600,
            activities: 700,
            miscellaneous: 350
        },
        premium: {
            accommodation: 6500,
            food: 2200,
            localTransport: 1500,
            activities: 1800,
            miscellaneous: 700
        }
    },

    {
        id: "goa",
        name: "Goa",
        state: "Goa",
        tip: "Renting a scooter can be economical when exploring multiple beaches and attractions.",
        budget: {
            accommodation: 900,
            food: 400,
            localTransport: 300,
            activities: 350,
            miscellaneous: 200
        },
        standard: {
            accommodation: 2500,
            food: 1000,
            localTransport: 650,
            activities: 900,
            miscellaneous: 350
        },
        premium: {
            accommodation: 7000,
            food: 2500,
            localTransport: 1800,
            activities: 2200,
            miscellaneous: 800
        }
    },

    {
        id: "agra",
        name: "Agra",
        state: "Uttar Pradesh",
        tip: "Many major attractions can be covered within a short stay, making Agra suitable for a budget trip.",
        budget: {
            accommodation: 600,
            food: 300,
            localTransport: 200,
            activities: 300,
            miscellaneous: 120
        },
        standard: {
            accommodation: 1800,
            food: 700,
            localTransport: 400,
            activities: 600,
            miscellaneous: 250
        },
        premium: {
            accommodation: 4500,
            food: 1800,
            localTransport: 1100,
            activities: 1400,
            miscellaneous: 500
        }
    },

    {
        id: "varanasi",
        name: "Varanasi",
        state: "Uttar Pradesh",
        tip: "Walking around the old city and ghats is a great way to explore Varanasi economically.",
        budget: {
            accommodation: 600,
            food: 300,
            localTransport: 180,
            activities: 250,
            miscellaneous: 120
        },
        standard: {
            accommodation: 1800,
            food: 700,
            localTransport: 400,
            activities: 550,
            miscellaneous: 250
        },
        premium: {
            accommodation: 4500,
            food: 1700,
            localTransport: 1000,
            activities: 1300,
            miscellaneous: 500
        }
    },

    {
        id: "udaipur",
        name: "Udaipur",
        state: "Rajasthan",
        tip: "Choose accommodation near the old city to stay close to major attractions.",
        budget: {
            accommodation: 700,
            food: 350,
            localTransport: 220,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2200,
            food: 800,
            localTransport: 450,
            activities: 650,
            miscellaneous: 300
        },
        premium: {
            accommodation: 6000,
            food: 2000,
            localTransport: 1300,
            activities: 1600,
            miscellaneous: 600
        }
    },

    {
        id: "jodhpur",
        name: "Jodhpur",
        state: "Rajasthan",
        tip: "Explore the old city on foot and use local transport for attractions farther away.",
        budget: {
            accommodation: 650,
            food: 300,
            localTransport: 200,
            activities: 250,
            miscellaneous: 120
        },
        standard: {
            accommodation: 1900,
            food: 750,
            localTransport: 400,
            activities: 550,
            miscellaneous: 250
        },
        premium: {
            accommodation: 5000,
            food: 1800,
            localTransport: 1200,
            activities: 1400,
            miscellaneous: 550
        }
    },

    {
        id: "amritsar",
        name: "Amritsar",
        state: "Punjab",
        tip: "The Golden Temple area has several affordable food and accommodation options.",
        budget: {
            accommodation: 600,
            food: 300,
            localTransport: 180,
            activities: 200,
            miscellaneous: 120
        },
        standard: {
            accommodation: 1800,
            food: 700,
            localTransport: 350,
            activities: 450,
            miscellaneous: 250
        },
        premium: {
            accommodation: 4500,
            food: 1700,
            localTransport: 1000,
            activities: 1200,
            miscellaneous: 500
        }
    },

    {
        id: "rishikesh",
        name: "Rishikesh",
        state: "Uttarakhand",
        tip: "Adventure activities can increase your budget, so compare packages before booking.",
        budget: {
            accommodation: 600,
            food: 300,
            localTransport: 180,
            activities: 400,
            miscellaneous: 150
        },
        standard: {
            accommodation: 1800,
            food: 750,
            localTransport: 400,
            activities: 900,
            miscellaneous: 300
        },
        premium: {
            accommodation: 5000,
            food: 1800,
            localTransport: 1100,
            activities: 2000,
            miscellaneous: 600
        }
    },

    {
        id: "manali",
        name: "Manali",
        state: "Himachal Pradesh",
        tip: "Travel during the shoulder season for better accommodation prices.",
        budget: {
            accommodation: 800,
            food: 350,
            localTransport: 250,
            activities: 350,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2500,
            food: 850,
            localTransport: 550,
            activities: 800,
            miscellaneous: 300
        },
        premium: {
            accommodation: 6500,
            food: 2200,
            localTransport: 1500,
            activities: 1800,
            miscellaneous: 700
        }
    },

    {
        id: "shimla",
        name: "Shimla",
        state: "Himachal Pradesh",
        tip: "Walking around Shimla's central areas can help reduce local transportation expenses.",
        budget: {
            accommodation: 800,
            food: 350,
            localTransport: 200,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2400,
            food: 850,
            localTransport: 500,
            activities: 600,
            miscellaneous: 300
        },
        premium: {
            accommodation: 6000,
            food: 2000,
            localTransport: 1300,
            activities: 1500,
            miscellaneous: 650
        }
    },

    {
        id: "kolkata",
        name: "Kolkata",
        state: "West Bengal",
        tip: "Kolkata's Metro, buses and trams provide economical ways to explore the city.",
        budget: {
            accommodation: 700,
            food: 300,
            localTransport: 180,
            activities: 250,
            miscellaneous: 120
        },
        standard: {
            accommodation: 2000,
            food: 750,
            localTransport: 400,
            activities: 550,
            miscellaneous: 250
        },
        premium: {
            accommodation: 5000,
            food: 1800,
            localTransport: 1100,
            activities: 1400,
            miscellaneous: 550
        }
    },

    {
        id: "bengaluru",
        name: "Bengaluru",
        state: "Karnataka",
        tip: "Use Bengaluru Metro wherever possible to avoid traffic and control transportation costs.",
        budget: {
            accommodation: 800,
            food: 400,
            localTransport: 250,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2300,
            food: 900,
            localTransport: 500,
            activities: 600,
            miscellaneous: 300
        },
        premium: {
            accommodation: 6000,
            food: 2200,
            localTransport: 1300,
            activities: 1500,
            miscellaneous: 650
        }
    },

    {
        id: "hyderabad",
        name: "Hyderabad",
        state: "Telangana",
        tip: "Metro and app-based transportation provide convenient options for city exploration.",
        budget: {
            accommodation: 700,
            food: 350,
            localTransport: 220,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2000,
            food: 800,
            localTransport: 450,
            activities: 600,
            miscellaneous: 300
        },
        premium: {
            accommodation: 5500,
            food: 2000,
            localTransport: 1200,
            activities: 1500,
            miscellaneous: 600
        }
    },

    {
        id: "chennai",
        name: "Chennai",
        state: "Tamil Nadu",
        tip: "Metro, suburban trains and buses are useful for covering different parts of Chennai.",
        budget: {
            accommodation: 700,
            food: 350,
            localTransport: 220,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2100,
            food: 800,
            localTransport: 450,
            activities: 550,
            miscellaneous: 300
        },
        premium: {
            accommodation: 5500,
            food: 2000,
            localTransport: 1200,
            activities: 1400,
            miscellaneous: 600
        }
    },

    {
        id: "kochi",
        name: "Kochi",
        state: "Kerala",
        tip: "Kochi Metro and water transport can make sightseeing more affordable and enjoyable.",
        budget: {
            accommodation: 700,
            food: 350,
            localTransport: 200,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2200,
            food: 850,
            localTransport: 450,
            activities: 600,
            miscellaneous: 300
        },
        premium: {
            accommodation: 6000,
            food: 2000,
            localTransport: 1200,
            activities: 1500,
            miscellaneous: 650
        }
    },

    {
        id: "ahmedabad",
        name: "Ahmedabad",
        state: "Gujarat",
        tip: "Metro and public buses offer economical options for getting around Ahmedabad.",
        budget: {
            accommodation: 600,
            food: 300,
            localTransport: 180,
            activities: 200,
            miscellaneous: 120
        },
        standard: {
            accommodation: 1800,
            food: 700,
            localTransport: 350,
            activities: 500,
            miscellaneous: 250
        },
        premium: {
            accommodation: 4500,
            food: 1700,
            localTransport: 1000,
            activities: 1200,
            miscellaneous: 500
        }
    },

    {
        id: "pune",
        name: "Pune",
        state: "Maharashtra",
        tip: "Combine public transportation with walking to explore Pune economically.",
        budget: {
            accommodation: 700,
            food: 350,
            localTransport: 220,
            activities: 250,
            miscellaneous: 150
        },
        standard: {
            accommodation: 2000,
            food: 800,
            localTransport: 450,
            activities: 550,
            miscellaneous: 300
        },
        premium: {
            accommodation: 5500,
            food: 2000,
            localTransport: 1200,
            activities: 1400,
            miscellaneous: 600
        }
    },

    {
        id: "mysuru",
        name: "Mysuru",
        state: "Karnataka",
        tip: "Mysuru's major attractions can be explored economically using local buses and autos.",
        budget: {
            accommodation: 600,
            food: 300,
            localTransport: 180,
            activities: 220,
            miscellaneous: 120
        },
        standard: {
            accommodation: 1800,
            food: 700,
            localTransport: 350,
            activities: 500,
            miscellaneous: 250
        },
        premium: {
            accommodation: 4500,
            food: 1700,
            localTransport: 1000,
            activities: 1300,
            miscellaneous: 500
        }
    }
];


// Make the dataset available to other scripts.
if (typeof window !== "undefined") {
    window.travelBudgetData = travelBudgetData;
}
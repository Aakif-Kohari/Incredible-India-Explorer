/**
 * accessibility-data.js
 *
 * Smart Travel Health & Accessibility Information System
 * Data layer for issue #2861.
 *
 * This file contains structured accessibility, medical,
 * transportation and emergency information used by
 * accessibility.js.
 */

const accessibilityDestinations = [
    {
        id: "taj-mahal",
        name: "Taj Mahal",
        city: "Agra",
        state: "Uttar Pradesh",
        category: "heritage",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: false,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: true,
            assistanceAvailable: true
        },

        accessibilityRating: 4.2,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: false,
            bus: true,
            parking: true
        },

        travelTips: [
            "Wheelchair users may require assistance on some pathways.",
            "Accessible entrances are available.",
            "Plan the visit during less crowded hours.",
            "Keep required identification and travel documents available."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "SN Medical College & Hospital",
                distance: "3.5 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "24 Hour Pharmacy",
                distance: "1.2 km",
                emergency: false
            }
        ]
    },

    {
        id: "qutub-minar",
        name: "Qutub Minar",
        city: "New Delhi",
        state: "Delhi",
        category: "heritage",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: false,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 4.0,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: true,
            bus: true,
            parking: true
        },

        travelTips: [
            "The main monument grounds have accessible areas.",
            "Some historic pathways may have uneven surfaces.",
            "Use assistance where required.",
            "Avoid peak afternoon hours during hot weather."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Max Super Speciality Hospital",
                distance: "4.8 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Apollo Pharmacy",
                distance: "2.1 km",
                emergency: false
            }
        ]
    },

    {
        id: "red-fort",
        name: "Red Fort",
        city: "New Delhi",
        state: "Delhi",
        category: "heritage",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: false,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 4.1,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: true,
            bus: true,
            parking: true
        },

        travelTips: [
            "Several visitor areas are accessible.",
            "Historic sections can have uneven surfaces.",
            "Accessible assistance may be requested at the entrance.",
            "Morning visits are recommended for comfortable travel."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Lok Nayak Hospital",
                distance: "2.7 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Apollo Pharmacy",
                distance: "1.5 km",
                emergency: false
            }
        ]
    },

    {
        id: "india-gate",
        name: "India Gate",
        city: "New Delhi",
        state: "Delhi",
        category: "landmark",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: false,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 4.4,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: true,
            bus: true,
            parking: true
        },

        travelTips: [
            "The surrounding open areas are generally wheelchair friendly.",
            "The area can become crowded during evenings.",
            "Use accessible transportation when possible.",
            "Carry water during summer visits."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Dr. Ram Manohar Lohia Hospital",
                distance: "5.2 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Apollo Pharmacy",
                distance: "2.4 km",
                emergency: false
            }
        ]
    },

    {
        id: "gateway-of-india",
        name: "Gateway of India",
        city: "Mumbai",
        state: "Maharashtra",
        category: "landmark",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: false,
            accessibleRestroom: true,
            accessibleParking: false,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 3.9,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: true,
            bus: true,
            parking: false
        },

        travelTips: [
            "The promenade is generally accessible.",
            "Crowds can be heavy during evenings and holidays.",
            "Use a wheelchair-accessible taxi for easier access.",
            "Check local conditions before visiting."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Bombay Hospital",
                distance: "4.0 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Wellness Forever",
                distance: "1.8 km",
                emergency: false
            }
        ]
    },

    {
        id: "mysore-palace",
        name: "Mysore Palace",
        city: "Mysuru",
        state: "Karnataka",
        category: "heritage",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: true,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: true,
            assistanceAvailable: true
        },

        accessibilityRating: 4.5,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: false,
            bus: true,
            parking: true
        },

        travelTips: [
            "Wheelchair assistance is available in supported areas.",
            "Accessible facilities are available for visitors.",
            "Ask staff for assistance when required.",
            "Avoid very crowded visiting periods."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Apollo BGS Hospitals",
                distance: "4.5 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Apollo Pharmacy",
                distance: "2.0 km",
                emergency: false
            }
        ]
    },

    {
        id: "victoria-memorial",
        name: "Victoria Memorial",
        city: "Kolkata",
        state: "West Bengal",
        category: "heritage",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: true,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 4.3,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: true,
            bus: true,
            parking: true
        },

        travelTips: [
            "Accessible routes are available in supported visitor areas.",
            "Museum areas may have specific accessibility routes.",
            "Request assistance from staff if necessary.",
            "Allow additional time for indoor exploration."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "SSKM Hospital",
                distance: "2.8 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Apollo Pharmacy",
                distance: "1.7 km",
                emergency: false
            }
        ]
    },

    {
        id: "charminar",
        name: "Charminar",
        city: "Hyderabad",
        state: "Telangana",
        category: "heritage",

        accessibility: {
            wheelchair: false,
            accessibleEntrance: false,
            ramps: false,
            elevators: false,
            accessibleRestroom: false,
            accessibleParking: false,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 2.8,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: true,
            bus: true,
            parking: false
        },

        travelTips: [
            "The surrounding area can be crowded.",
            "Historic structures may have limited accessibility.",
            "Wheelchair users should plan with assistance.",
            "Consider viewing accessible areas around the monument."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Osmania General Hospital",
                distance: "2.0 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Apollo Pharmacy",
                distance: "2.3 km",
                emergency: false
            }
        ]
    },

    {
        id: "konark-sun-temple",
        name: "Konark Sun Temple",
        city: "Konark",
        state: "Odisha",
        category: "heritage",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: false,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 3.8,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: false,
            bus: true,
            parking: true
        },

        travelTips: [
            "Some pathways are accessible.",
            "Uneven historic surfaces may require assistance.",
            "Plan extra time for movement around the complex.",
            "Avoid extreme heat during afternoon visits."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Community Health Centre Konark",
                distance: "1.5 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Local Pharmacy",
                distance: "1.0 km",
                emergency: false
            }
        ]
    },

    {
        id: "hawamahal",
        name: "Hawa Mahal",
        city: "Jaipur",
        state: "Rajasthan",
        category: "heritage",

        accessibility: {
            wheelchair: true,
            accessibleEntrance: true,
            ramps: true,
            elevators: false,
            accessibleRestroom: true,
            accessibleParking: true,
            wheelchairRental: false,
            assistanceAvailable: true
        },

        accessibilityRating: 3.7,

        transportation: {
            accessibleTransport: true,
            wheelchairTaxi: true,
            metro: true,
            bus: true,
            parking: true
        },

        travelTips: [
            "Ground-level areas are easier to access.",
            "Some historic sections may have stairs.",
            "Ask staff about accessible routes.",
            "Visit during cooler hours."
        ],

        nearbyFacilities: [
            {
                type: "hospital",
                name: "Sawai Man Singh Hospital",
                distance: "3.5 km",
                emergency: true
            },
            {
                type: "pharmacy",
                name: "Apollo Pharmacy",
                distance: "1.9 km",
                emergency: false
            }
        ]
    }
];

/**
 * Accessibility filter definitions.
 * Used by accessibility.js to build filter controls.
 */
const accessibilityFilters = [
    {
        id: "wheelchair",
        label: "Wheelchair Accessible",
        field: "accessibility.wheelchair"
    },
    {
        id: "accessibleEntrance",
        label: "Accessible Entrance",
        field: "accessibility.accessibleEntrance"
    },
    {
        id: "ramps",
        label: "Ramps",
        field: "accessibility.ramps"
    },
    {
        id: "elevators",
        label: "Elevators",
        field: "accessibility.elevators"
    },
    {
        id: "accessibleRestroom",
        label: "Accessible Restroom",
        field: "accessibility.accessibleRestroom"
    },
    {
        id: "accessibleParking",
        label: "Accessible Parking",
        field: "accessibility.accessibleParking"
    },
    {
        id: "wheelchairRental",
        label: "Wheelchair Rental",
        field: "accessibility.wheelchairRental"
    },
    {
        id: "assistanceAvailable",
        label: "Staff Assistance",
        field: "accessibility.assistanceAvailable"
    }
];

/**
 * Transportation filter definitions.
 */
const transportationFilters = [
    {
        id: "accessibleTransport",
        label: "Accessible Transport",
        field: "transportation.accessibleTransport"
    },
    {
        id: "wheelchairTaxi",
        label: "Wheelchair Taxi",
        field: "transportation.wheelchairTaxi"
    },
    {
        id: "metro",
        label: "Metro",
        field: "transportation.metro"
    },
    {
        id: "bus",
        label: "Bus",
        field: "transportation.bus"
    },
    {
        id: "parking",
        label: "Parking",
        field: "transportation.parking"
    }
];

/**
 * Supported accessibility preference profiles.
 */
const accessibilityProfiles = [
    {
        id: "wheelchair-user",
        name: "Wheelchair User",
        preferences: [
            "wheelchair",
            "accessibleEntrance",
            "ramps",
            "accessibleRestroom",
            "accessibleParking"
        ]
    },
    {
        id: "limited-mobility",
        name: "Limited Mobility",
        preferences: [
            "accessibleEntrance",
            "ramps",
            "elevators",
            "accessibleRestroom",
            "assistanceAvailable"
        ]
    },
    {
        id: "family-support",
        name: "Family / Elderly Support",
        preferences: [
            "ramps",
            "elevators",
            "accessibleRestroom",
            "assistanceAvailable"
        ]
    },
    {
        id: "accessible-transport",
        name: "Accessible Transportation",
        preferences: [
            "accessibleTransport",
            "wheelchairTaxi",
            "bus",
            "metro"
        ]
    }
];

/**
 * Emergency service categories.
 */
const emergencyServices = [
    {
        id: "hospital",
        name: "Hospitals",
        icon: "🏥",
        description: "Nearby hospitals and emergency medical services."
    },
    {
        id: "pharmacy",
        name: "Pharmacies",
        icon: "💊",
        description: "Nearby pharmacies for medicines and basic health needs."
    },
    {
        id: "emergency",
        name: "Emergency Services",
        icon: "🚨",
        description: "Emergency assistance and local support."
    }
];

/**
 * Returns all accessibility destinations.
 */
function getAccessibilityDestinations() {
    return accessibilityDestinations;
}

/**
 * Returns destination by ID.
 */
function getAccessibilityDestinationById(destinationId) {
    return accessibilityDestinations.find(
        destination => destination.id === destinationId
    ) || null;
}

/**
 * Returns destinations by city.
 */
function getAccessibilityDestinationsByCity(city) {
    if (!city) {
        return accessibilityDestinations;
    }

    const normalizedCity = city.toLowerCase().trim();

    return accessibilityDestinations.filter(
        destination =>
            destination.city.toLowerCase() === normalizedCity
    );
}

/**
 * Returns destinations by state.
 */
function getAccessibilityDestinationsByState(state) {
    if (!state) {
        return accessibilityDestinations;
    }

    const normalizedState = state.toLowerCase().trim();

    return accessibilityDestinations.filter(
        destination =>
            destination.state.toLowerCase() === normalizedState
    );
}

/**
 * Filters destinations based on accessibility requirements.
 *
 * Every selected requirement must be satisfied.
 */
function filterAccessibleDestinations(preferences = {}) {
    return accessibilityDestinations.filter(destination => {
        const accessibility = destination.accessibility || {};

        return Object.entries(preferences).every(
            ([key, required]) => {
                if (!required) {
                    return true;
                }

                return accessibility[key] === true;
            }
        );
    });
}

/**
 * Returns destinations that have a minimum accessibility rating.
 */
function filterByAccessibilityRating(minRating = 0) {
    return accessibilityDestinations.filter(
        destination =>
            Number(destination.accessibilityRating || 0) >=
            Number(minRating)
    );
}

/**
 * Returns nearby medical facilities for a destination.
 */
function getNearbyMedicalFacilities(destinationId) {
    const destination =
        getAccessibilityDestinationById(destinationId);

    if (!destination) {
        return [];
    }

    return (destination.nearbyFacilities || []).filter(
        facility =>
            facility.type === "hospital" ||
            facility.type === "pharmacy"
    );
}

/**
 * Returns emergency-capable facilities.
 */
function getEmergencyFacilities(destinationId) {
    const destination =
        getAccessibilityDestinationById(destinationId);

    if (!destination) {
        return [];
    }

    return (destination.nearbyFacilities || []).filter(
        facility => facility.emergency === true
    );
}

/**
 * Calculates a simple accessibility score.
 *
 * This is intentionally deterministic and frontend-friendly.
 */
function calculateAccessibilityScore(destination) {
    if (!destination || !destination.accessibility) {
        return 0;
    }

    const values = Object.values(destination.accessibility);

    if (!values.length) {
        return 0;
    }

    const supported = values.filter(Boolean).length;

    return Math.round(
        (supported / values.length) * 100
    );
}

/**
 * Sorts destinations by accessibility score.
 */
function sortByAccessibilityScore(destinations) {
    return [...destinations].sort(
        (a, b) =>
            calculateAccessibilityScore(b) -
            calculateAccessibilityScore(a)
    );
}

/**
 * Global API.
 *
 * accessibility.js can directly access:
 *
 * window.AccessibilityData
 */
window.AccessibilityData = {
    destinations: accessibilityDestinations,
    filters: accessibilityFilters,
    transportationFilters,
    profiles: accessibilityProfiles,
    emergencyServices,

    getAll: getAccessibilityDestinations,
    getById: getAccessibilityDestinationById,
    getByCity: getAccessibilityDestinationsByCity,
    getByState: getAccessibilityDestinationsByState,

    filter: filterAccessibleDestinations,
    filterByRating: filterByAccessibilityRating,

    getMedicalFacilities: getNearbyMedicalFacilities,
    getEmergencyFacilities,

    calculateScore: calculateAccessibilityScore,
    sortByScore: sortByAccessibilityScore
};
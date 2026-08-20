/**
 * Emergency assistance data
 *
 * Essential emergency numbers are stored locally so they remain
 * available when the user has limited or no connectivity.
 */

window.EmergencyData = {

    contacts: [

        {
            id: "national-emergency",
            name: "National Emergency",
            number: "112",
            icon: "🆘",
            description: "Police, ambulance and fire emergency assistance",
            priority: "critical"
        },

        {
            id: "police",
            name: "Police",
            number: "112",
            icon: "👮",
            description: "Police emergency assistance",
            priority: "critical"
        },

        {
            id: "ambulance",
            name: "Ambulance",
            number: "112",
            icon: "🚑",
            description: "Medical emergency assistance",
            priority: "critical"
        },

        {
            id: "fire",
            name: "Fire Services",
            number: "112",
            icon: "🚒",
            description: "Fire and rescue emergency assistance",
            priority: "critical"
        },

        {
            id: "women-helpline",
            name: "Women Helpline",
            number: "181",
            icon: "🛡️",
            description: "Women-focused support and assistance",
            priority: "high"
        },

        {
            id: "child-helpline",
            name: "Child Helpline",
            number: "1098",
            icon: "👧",
            description: "Emergency support for children",
            priority: "high"
        }

    ],

    facilitySearches: {

        hospital: "hospitals near me",

        police: "police stations near me",

        pharmacy: "pharmacies near me",

        fire: "fire stations near me",

        tourist: "tourist information centers near me",

        emergency: "emergency services near me"

    },

    safetyTips: [

        "Keep your phone charged while travelling.",

        "Save important emergency numbers before travelling.",

        "Share your travel plans with a trusted person.",

        "Keep identification and important documents accessible.",

        "When travelling remotely, download important information before leaving network coverage."

    ]

};
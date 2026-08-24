/**
 * agasthya-data.js
 * Agasthyarkoodam Trek Dataset — Thiruvananthapuram, Kerala
 */

const AGASTHYA_TREK_STATS = {
    name: "Agasthyarkoodam Trek",
    localName: "അഗസ്ത്യകൂടം",
    location: "Neyyar Wildlife Sanctuary, Thiruvananthapuram District, Kerala",
    elevationMeters: 1868,
    elevationFeet: 6129,
    difficulty: "Hard / Strenuous",
    distanceKm: 14.0,
    distanceTotalKm: 28.0,
    durationDays: "2 Days (Overnight stay at Athirumala Camp)",
    accessSeason: "Restricted January to March (Makara Jyothi Season)",
    startingPoint: "Bonacaud Forest Checkpost, Thiruvananthapuram",
    nearestTown: "Nedumangad (32 km) / Thiruvananthapuram (61 km)",
    permits: "Strictly Controlled Online Pass via Kerala Forest & Wildlife Department (Max ~100 passes/day)"
};

const AGASTHYA_HIGHLIGHTS = [
    {
        id: "biosphere",
        title: "UNESCO Biosphere Reserve",
        category: "Ecosystem",
        icon: "🌿",
        description: "Part of the UNESCO-designated Agasthyamala Biosphere Reserve, renowned globally as a major plant biodiversity hotspot in the Western Ghats."
    },
    {
        id: "medicinal",
        title: "2,000+ Medicinal Plant Species",
        category: "Flora",
        icon: "🌱",
        description: "Home to over 2,000 documented species of medicinal plants, including the legendary miracle herb 'Arogyapacha' (Trichopus zeylanicus) used by the indigenous Kani tribe."
    },
    {
        id: "athirumala",
        title: "Athirumala High Base Camp",
        category: "Camp Altitude",
        icon: "🏕️",
        description: "An isolated mountain clearing at ~1,000m altitude where trekkers stay overnight in forest huts before the final summit push."
    },
    {
        id: "cultural-lineage",
        title: "Sage Agastya Lineage",
        category: "Heritage",
        icon: "🏔️",
        description: "The peak is reverently named after Sage Agastya, one of the ancient Seven Saptarishis of Indian tradition and pioneer of Siddha and Ayurveda medicine."
    }
];

const AGASTHYA_BIODIVERSITY_INFO = {
    title: "Agasthyamala Plant & Animal Sanctuary",
    totalMedicinalPlants: "Over 2,000 species",
    endemicSpeciesCount: "50+ exclusive endemic plant species",
    keyHerb: "Arogyapacha (Trichopus zeylanicus) — famous anti-fatigue medicinal plant",
    faunaHighlights: [
        "Asian Elephant (Elephas maximus)",
        "Lion-tailed Macaque (Macaca silenus)",
        "Nilgiri Tahr (Nilgiritragus hylocrius)",
        "Tiger & Leopard habitat corridors",
        "Great Hornbill & endemic Travancore avian species"
    ],
    forestTypes: [
        "Tropical Evergreen Rainforest canopy",
        "Semi-evergreen mid-altitude forests",
        "Moist bamboo & reed brakes (Ochlandra scriptoria)",
        "Montane grasslands & windswept peak ridges"
    ]
};

const AGASTHYA_ROUTE_STEPS = [
    {
        day: "Day 1 - Morning",
        step: 1,
        title: "Bonacaud Picket Station Check-in",
        elevation: "320 m",
        distance: "0.0 km",
        time: "7:00 AM",
        description: "Report at Bonacaud Forest Picket Station for mandatory identity verification, luggage screening (strict plastic check), and medical pass inspection."
    },
    {
        day: "Day 1 - Midday",
        step: 2,
        title: "Karamana River Crossing & Bamboo Canopy",
        elevation: "650 m",
        distance: "7.0 km",
        time: "11:30 AM",
        description: "Trek through dense tropical evergreen rainforest canopy, crossing pure mountain streams and bamboo clusters along gentle to steep ascents."
    },
    {
        day: "Day 1 - Afternoon",
        step: 3,
        title: "Athirumala Base Camp (Overnight Stay)",
        elevation: "1,020 m",
        distance: "14.0 km",
        time: "3:30 PM",
        description: "Arrive at Athirumala high-altitude forest clearing. Rest in basic Forest Department eco-huts surrounded by mist-clad peaks."
    },
    {
        day: "Day 2 - Morning",
        step: 4,
        title: "Summit Rope Climb to Agasthyarkoodam Peak",
        elevation: "1,868 m",
        distance: "21.0 km (cumulative)",
        time: "9:00 AM",
        description: "Ascend steep rocky ridges using secured forest ropes to reach the 1,868m summit cone. Experience 360° views across Neyyar reservoir and Tamil Nadu border ranges."
    },
    {
        day: "Day 2 - Afternoon",
        step: 5,
        title: "Descent to Athirumala & Return to Bonacaud",
        elevation: "320 m",
        distance: "28.0 km (total round trip)",
        time: "5:00 PM",
        description: "Descend from summit back to Athirumala base camp, collect equipment, and trek back through rainforest trails to Bonacaud checkpost."
    }
];

const AGASTHYA_PERMITS_SAFETY = [
    {
        title: "Mandatory Forest Pass",
        icon: "🎫",
        description: "Entry is strictly restricted to valid pass holders during the official January–March season. Passes must be booked online through the Kerala Forest Department portal."
    },
    {
        title: "Medical Fitness Certificate",
        icon: "🩺",
        description: "Every trekker must carry a physical fitness certificate signed by a registered medical practitioner due to the strenuous high-altitude terrain."
    },
    {
        title: "Strict Zero-Plastic Policy",
        icon: "🚫",
        description: "Disposable plastic bottles, plastic food covers, alcohol, and smoking are strictly forbidden inside the biosphere reserve. Bags are audited at Bonacaud."
    },
    {
        title: "Mandatory Eco-Guard Escort",
        icon: "👮‍♂️",
        description: "Forest Department eco-guards and tribal VSS guides escort trekking batches to ensure safety and prevent wild animal encounters."
    }
];

const AGASTHYA_CHECKLIST = [
    {
        id: "sturdyboots",
        name: "Ankle-Support Trekking Boots",
        required: true,
        category: "Footwear",
        reason: "Essential for 28km of rough rocky terrain, stream beds, and steep summit rope ascents."
    },
    {
        id: "medicalcert",
        name: "Medical Fitness Certificate & ID",
        required: true,
        category: "Documents",
        reason: "Mandatory requirement verified at Bonacaud Forest Picket Station."
    },
    {
        id: "sleepingbag",
        name: "Light Sleeping Bag / Warm Innerwear",
        required: true,
        category: "Camping",
        reason: "Athirumala base camp at ~1,000m experiences cold, windy nighttime temperatures."
    },
    {
        id: "steelwater",
        name: "Steel / Reusable Water Canteen (2L)",
        required: true,
        category: "Hydration",
        reason: "Single-use plastic bottles are confiscated at the forest checkpost."
    },
    {
        id: "headlamp",
        name: "Headlamp / Torch with Extra Batteries",
        required: true,
        category: "Lighting",
        reason: "No electricity exists at Athirumala base camp deep inside the wildlife sanctuary."
    },
    {
        id: "firstaid",
        name: "Personal First Aid & Salt",
        required: true,
        category: "Health",
        reason: "For muscle cramps, minor scrapes, and leech protection in moist forest sections."
    }
];

const AGASTHYA_GALLERY = [
    {
        id: "img1",
        title: "Agasthyarkoodam Summit Ridge",
        subtitle: "The 1,868m peak cone rising above montane clouds in the Agasthyamala Biosphere Reserve.",
        alt: "Panoramic view of Agasthyarkoodam peak summit emerging above morning clouds and green rainforest canopy",
        credit: "Photo Credit: Kerala Forest & Wildlife Department / Wikimedia Commons (CC BY-SA 4.0)",
        category: "Peak View"
    },
    {
        id: "img2",
        title: "Arogyapacha & Medicinal Flora",
        subtitle: "The famous Trichopus zeylanicus medicinal herb endemic to Agasthyarkoodam hills.",
        alt: "Close-up of green medicinal plant leaves growing in tropical evergreen forest floor",
        credit: "Photo Credit: Tropical Botanical Garden & Research Institute (TBGRI) Archive",
        category: "Biodiversity"
    },
    {
        id: "img3",
        title: "Athirumala Base Camp Plateau",
        subtitle: "The high-altitude forest clearing (1,020m) where trekkers halt overnight.",
        alt: "Forest eco-huts nestled in a green mountain meadow surrounded by misty forest ridges",
        credit: "Photo Credit: Wikimedia Commons / Public Domain",
        category: "Base Camp"
    },
    {
        id: "img4",
        title: "Bonacaud Rainforest Trail",
        subtitle: "Dense tropical canopy trail leading from Bonacaud toward Karamana river streams.",
        alt: "Trekkers walking on a narrow shaded forest trail among giant evergreen trees and bamboo brakes",
        credit: "Photo Credit: Kerala Tourism Official Archive",
        category: "Forest Trail"
    }
];

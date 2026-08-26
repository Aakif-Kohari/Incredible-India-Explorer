/**
 * thekkady-data.js
 * Comprehensive dataset for Kumily–Thekkady Forest Trek (Periyar Tiger Reserve, Kerala)
 */

const THEKKADY_TREK_STATS = {
    name: "Kumily–Thekkady Forest Trek",
    altName: "Periyar Tiger Reserve Border Hiking",
    elevationMeters: 900,
    elevationFeet: 2950,
    location: "Thekkady, Idukki District, Kerala",
    range: "Cardamom Hills, Western Ghats",
    baseVillage: "Forest Information Centre, Thekkady",
    distanceFromKochi: "160 km via NH185",
    difficulty: "Easy to Moderate",
    ascentTimeHrs: "2 to 3 hours (Forest exploration walk)",
    descentTimeHrs: "1.5 hours (Return to entrance checkpost)",
    trekDistanceKm: "10 km (Total guided route loop)",
    bestSeasons: "September to March (Cool winter canopy)",
    sanctuaryPermit: "Compulsory entry permit and guide charges paid at Periyar Reserve checkpost"
};

const THEKKADY_TREK_TIMELINE = [
    {
        year: "1895 CE",
        title: "Mullaperiyar Dam Construction",
        badge: "Lake Reservoir Formation",
        description: "The construction of the Mullaperiyar Dam created the historic Periyar artificial lake reservoir, submerging low-lying forests and transforming the geography into a unique wetland habitat."
    },
    {
        year: "1934 CE",
        title: "Nellikkampetty Game Sanctuary",
        badge: "Royal Conservation",
        description: "The Maharaja of Travancore, Sree Chithira Thirunal, declared the surrounding forest as Nellikkampetty Game Sanctuary to prevent logging and conserve wild elephants."
    },
    {
        year: "1978 CE",
        title: "Project Tiger Status",
        badge: "National Reserve",
        description: "The sanctuary was designated as a Tiger Reserve under Project Tiger, expanding protection to Bengal tigers, evergreen canopy conservation, and guide training programs."
    },
    {
        year: "Present Day",
        title: "Community-Based Eco-Tourism",
        badge: "Responsible Travel",
        description: "Periyar is celebrated globally as a successful model of community-based eco-tourism. Local tribal guides lead the treks, promoting plastic-free trails and forest biodiversity awareness."
    }
];

const THEKKADY_TREK_HIGHLIGHTS = [
    {
        id: "periyar-lake",
        title: "Periyar Lake Shoreline",
        subtitle: "Grassy Elephant Banks",
        icon: "🐘",
        tag: "Hydrology",
        description: "Scenic paths tracing the perimeter of the reservoir lake, offering frequent sightings of wild elephant herds, sambar deer, and otters."
    },
    {
        id: "teak-forest",
        title: "Deciduous Teak & Bamboo canopies",
        subtitle: "Evergreen Western Ghats Forest",
        icon: "🌳",
        tag: "Botanical Wonders",
        description: "Hiking under towering teak, rosewood, and giant bamboo canopies hosting Nilgiri Langurs and Malabar Giant Squirrels."
    },
    {
        id: "border-cliffs",
        title: "Western Ghats Ridge Outlook",
        subtitle: "Earthy Valley Views",
        icon: "🏔️",
        tag: "Summit View",
        description: "Views overlooking the deep valleys of Tamil Nadu border and spice-laden slopes of Cardamom Hills from the ridge trails."
    },
    {
        id: "wild-biodiversity",
        title: "Periyar Wildlife Sanctuary",
        subtitle: "Rich Animal & Bird Habitations",
        icon: "🦜",
        tag: "Fauna & Wildlife",
        description: "Rich habitat home to over 60 mammal species, 320 bird species (like the Malabar Grey Hornbill), and exotic forest butterflies."
    },
    {
        id: "responsible-tourism",
        title: "Eco-Tourism Guidelines",
        subtitle: "Zero-Waste Initiative",
        icon: "♻️",
        tag: "Heritage Landmark",
        description: "Plastic-free guidelines, mandatory local guides, silent trail etiquette, and strict checkpost waste accounting."
    },
    {
        id: "spice-gardens",
        title: "Kumily Cardamom Farms",
        subtitle: "Attractions Gateway",
        icon: "🌿",
        tag: "Base camp",
        description: "Surrounding organic cardamom, pepper, and cinnamon orchards offering authentic spice trails."
    }
];

const THEKKADY_TREK_STEPS = [
    {
        step: 1,
        title: "Reserve Checkpost to Grassland Fringe",
        duration: "45 minutes",
        terrain: "Deciduous forest boundary, flat dirt path",
        description: "Begin the trek from the Periyar Reserve gate. Walk along the edge of deciduous forest pastures, passing tall elephant grass patches."
    },
    {
        step: 2,
        title: "Dense Forest Canopy Ascent",
        duration: "1 hour",
        terrain: "Moist dirt trail under tropical forest cover",
        description: "Enter the deeper evergreen forest trail under the guide's supervision. Climb slopes of moist earth, listening to bird calls and Nilgiri langur chatters."
    },
    {
        step: 3,
        title: "Ridge Crest & Valley Viewpoint",
        duration: "1 hour",
        terrain: "Border ridge ridge-line, rocky terrain",
        description: "Reach the high ridge trail along the Kerala-Tamil Nadu border. Enjoy panoramic views of the plains below and the Cardamom Hill spice estates."
    },
    {
        step: 4,
        title: "Shoreline trail to Forest checkpost",
        duration: "45 minutes",
        terrain: "Lakeside grassy path, flat descent",
        description: "Descend gradually toward the Periyar Lake shore. Walk along the reservoir borders before checking out at the final forest outpost."
    }
];

const THEKKADY_TREK_CHECKLIST = [
    { id: "mutedclothing", text: "Earth-toned or muted clothing (bright colors disturb wildlife; green, brown, or khaki is highly recommended)", category: "Clothing" },
    { id: "leechsocks", text: "High-quality leech socks (essential for wet undergrowth and moist forest trails where leeches are abundant)", category: "Footwear" },
    { id: "binoculars", text: "Muted binocular (for spotting langurs, hornbills, and giant squirrels high in the jungle canopy)", category: "Gear" },
    { id: "ecobottle", text: "Eco-friendly reusable water bottle (disposable plastic bottles are strictly prohibited at the sanctuary gate)", category: "Essentials" },
    { id: "boots", text: "Sturdy trekking shoes with ankle support (for climbing over bamboo roots and wet forest trails)", category: "Footwear" },
    { id: "repellent", text: "Insect repellent & personal first-aid (essential for tropical forest hikes with mosquitoes and bugs)", category: "Protection" }
];

const THEKKADY_TREK_GALLERY = [
    {
        id: "gallery-elephants",
        title: "Elephants near Periyar Lake",
        emoji: "🐘",
        caption: "Wild elephant herds grazing along the banks of the Periyar Lake reservoir."
    },
    {
        id: "gallery-canopy",
        title: "Evergreen Rain Canopy",
        emoji: "🌳",
        caption: "Towering tropical evergreen forest canopies hosting rare Western Ghats wildlife."
    },
    {
        id: "gallery-squirrel",
        title: "Malabar Giant Squirrel",
        emoji: "🐿️",
        caption: "A colorful Malabar Giant Squirrel spotted in the branches of a teak tree."
    },
    {
        id: "gallery-hornbill",
        title: "Malabar Grey Hornbill",
        emoji: "🦜",
        caption: "The signature forest hornbill species nesting in ancient tree hollows."
    },
    {
        id: "gallery-ridge",
        title: "Western Ghats Border Ridge",
        emoji: "🏔️",
        caption: "Stunning valley views overlooking spice plantations along the Kerala border."
    },
    {
        id: "gallery-lake",
        title: "Periyar Lake Outlook",
        emoji: "🛶",
        caption: "Panoramic view of Periyar Lake with submerged tree stumps, typical of the sanctuary water landscape."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { THEKKADY_TREK_STATS, THEKKADY_TREK_TIMELINE, THEKKADY_TREK_HIGHLIGHTS, THEKKADY_TREK_STEPS, THEKKADY_TREK_CHECKLIST, THEKKADY_TREK_GALLERY };
}

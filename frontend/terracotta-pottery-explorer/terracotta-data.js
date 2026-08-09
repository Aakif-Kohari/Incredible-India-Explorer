/**
 * Terracotta Pottery Explorer — Data Module
 * Comprehensive dataset covering history, materials used, regional styles,
 * pottery-making process, gallery, and references.
 */

const TERRACOTTA_INFO = {
    id: "terracotta-pottery",
    title: "Terracotta Pottery (Baked Earth Art)",
    historicalBackground: "Terracotta pottery is one of India's oldest surviving artistic traditions, dating back over 5,000 years to the Indus Valley Civilization (Mohenjo-daro & Harappa). Derived from the Italian 'burnt earth', it represents the sacred element of soil molded by human hands.",
    materialsUsed: "Alluvial Clay, Silt, Rice Husk, Organic Tempering Agents, Natural Mineral Pigments (Geru ochre), & Wood-fired Kilns",
    giTagStatus: "Multiple GI Tags (Gorakhpur Terracotta, Bankura Panchmura Terracotta)",
    quickStats: [
        { label: "Heritage Age", value: "5000+ Years", icon: "🏛️" },
        { label: "Root Material", value: "Alluvial Clay", icon: "🏺" },
        { label: "Firing Temp", value: "800°C – 1000°C", icon: "🔥" },
        { label: "Key Icon", value: "Bankura Horse", icon: "🐎" },
        { label: "GI Status", value: "GI Certified", icon: "🏷️" },
        { label: "Color Tone", value: "Natural Geru Red", icon: "🎨" }
    ]
};

const PROCESS_STEPS = [
    { step: 1, title: "Clay Sourcing & Conditioning", description: "Rich alluvial silt is excavated from riverbeds or village ponds, sun-dried, pulverized, and mixed with rice husk or sand temper to prevent cracking." },
    { step: 2, title: "Wheel Throwing & Hand Sculpting", description: "Potters throw symmetrical vessel bodies on wooden potter wheels (chaak) or hand-sculpt complex hollow limbs, torsos, and animal heads." },
    { step: 3, title: "Assembly & Surface Carving", description: "Individual thrown parts are assembled using slip clay paste; artisans carve intricate surface motifs, ears, and trappings using bamboo needles." },
    { step: 4, title: "Sun Drying & Natural Slip Coating", description: "Assembled terracotta pieces are slowly dried in shade to prevent thermal shock, then burnished and coated with natural red iron oxide slip (geru)." },
    { step: 5, title: "Kiln Firing (Bhatti)", description: "Artifacts are stacked in traditional open-air straw kilns or closed mud bhattis and fired at 800°C–1000°C to achieve the iconic porous red-orange stoneware finish." }
];

const REGIONAL_STYLES = [
    {
        name: "Bankura Panchmura Terracotta (West Bengal)",
        giTag: "GI Tagged",
        description: "Famous for the erect-eared Bankura Horse and elephant vows offered to village deity Dharma Thakur, featuring long slender necks and decorative clay rings."
    },
    {
        name: "Gorakhpur Terracotta (Uttar Pradesh)",
        giTag: "GI Tagged",
        description: "Known for intricate hand-carved terracotta elephants, horses, chandeliers, and Ganesha idols crafted by the Prajapati artisan community."
    },
    {
        name: "Molela Clay Relief Plaques (Rajasthan)",
        giTag: "Heritage Craft",
        description: "Hollow terracotta votive plaques depicting tribal deities (Devnarayan, Nagaraja) handcrafted by Kumhar potters along the Banas river.",
        explorerUrl: "../molela-clay-art-explorer/index.html"
    },
    {
        name: "Asharikandi Terracotta (Assam)",
        giTag: "Cluster Heritage",
        description: "Renowned for traditional Hatima doll (mother holding child) figures, oil lamps, and eco-friendly water pitchers crafted in Dhubri district."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bankura_Horse_Terracotta.jpg/800px-Bankura_Horse_Terracotta.jpg",
        caption: "Iconic Bankura Terracotta Horse from Panchmura, West Bengal",
        category: "Regional Style"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Gorakhpur_terracotta.jpg/800px-Gorakhpur_terracotta.jpg",
        caption: "Hand-carved Gorakhpur terracotta elephant artifact",
        category: "Artistry"
    }
];

const REFERENCES = [
    { text: "Development Commissioner (Handicrafts), Ministry of Textiles — Terracotta Craft Clusters.", link: "https://handicrafts.nic.in" },
    { text: "Dhamija, Jasleen (1970). Indian Handicrafts. National Book Trust, New Delhi.", link: "#" },
    { text: "West Bengal Khadi & Village Industries Board — Panchmura Terracotta GI Documentation.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TERRACOTTA_INFO, PROCESS_STEPS, REGIONAL_STYLES, GALLERY_IMAGES, REFERENCES };
}

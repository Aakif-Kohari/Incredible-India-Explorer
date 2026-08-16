/**
 * Anamalai Flying Frog Explorer — Data Module
 * Comprehensive dataset covering taxonomy, Anamalai Hills endemic range,
 * zebra-striped camouflage, gliding adaptations, protected areas, and gallery.
 */

const ANAMALAI_FROG_INFO = {
    id: "anamalai-flying-frog",
    commonName: "Anamalai Flying Frog",
    scientificName: "Rhacophorus pseudomalabaricus",
    family: "Rhacophoridae",
    genus: "Rhacophorus",
    species: "R. pseudomalabaricus",
    endemicRegion: "Anamalai Hills & High Wavy Mountains (Tamil Nadu & Kerala)",
    iucnStatus: "Critically Endangered (IUCN 3.1)",
    protectionStatus: "Schedule II (Indian Wildlife Protection Act, 1972)",
    habitatType: "High-altitude tropical wet evergreen rainforest, shola-forest edges, stream corridors",
    avgSize: "50 to 70 mm (Females up to 70 mm)",
    lifespan: "5 to 8 years in high-elevation canopy",
    dietType: "Insectivorous (Moths, flies, crickets, beetles, winged ants)",
    quickStats: [
        { label: "Endemic Range", value: "Anamalai Hills Only", icon: "⛰️" },
        { label: "IUCN Red List", value: "Critically Endangered", icon: "🚨" },
        { label: "Dorsal Pattern", value: "Zebra-Striped Camouflage", icon: "🦓" },
        { label: "Altitude Zone", value: "1,000–1,600 meters", icon: "🏔️" },
        { label: "Protected Refuge", value: "Anamalai Tiger Reserve", icon: "🛡️" },
        { label: "Gliding Adaptation", value: "Full Interdigital Webbing", icon: "🪂" }
    ]
};

const TAXONOMY_DATA = {
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Amphibia",
    order: "Anura",
    family: "Rhacophoridae",
    genus: "Rhacophorus",
    species: "Rhacophorus pseudomalabaricus (Vasudevan & Dutta, 2000)"
};

const ECOLOGY_BEHAVIOUR = {
    introduction: "The Anamalai Flying Frog (Rhacophorus pseudomalabaricus) is a stunning, critically endangered arboreal amphibian restricted to high-altitude rainforests of the Anamalai Hills in the Western Ghats.",
    distribution: "Found exclusively in a narrow geographical band of the Anamalai Hills and Meghamalai / High Wavy Mountains across Tamil Nadu (Pollachi / Valparai) and adjacent Kerala.",
    habitat: "Inhabits canopy foliage of primary tropical wet evergreen forests, shola-grassland ecotones, and forest streams at elevations between 1,000 and 1,600 meters.",
    morphology: "Renowned for its striking pattern of blackish-brown zebra-like marbling or stripes across a bright lime-green dorsal surface, accompanied by yellow webbed toes.",
    behaviour: "Nocturnal canopy parachutist. Uses expansive webbed feet to glide between high rainforest branches to evade predators and navigate breeding pools.",
    diet: "Opportunistic canopy hunter preying on soft-bodied insects, moths, crickets, beetles, and midges.",
    reproduction: "Constructs foam nests on vegetation overhanging stagnant water bodies during South-West monsoon rains.",
    protectedAreas: "Protected within Anamalai Tiger Reserve (ATR), Parambikulam Tiger Reserve, and Indira Gandhi Wildlife Sanctuary.",
    conservation: "Critically Endangered due to extreme habitat fragmentation caused by commercial tea, coffee, and cardamom estates, alongside pesticide use and climate warming."
};

const INTERESTING_FACTS = [
    {
        title: "Unique Zebra-Striped Skin",
        description: "Distinguished from all other Indian flying frogs by its elaborate pattern of dark brown zebra stripes across its lime-green body."
    },
    {
        title: "Discovered in Year 2000",
        description: "Relatively new to science, first described in 2000 by Indian herpetologists Karthikeyan Vasudevan and Sushil Kumar Dutta."
    },
    {
        title: "Shola Canopy Specialist",
        description: "Adapted specifically to high-elevation cloud forests and cool shola-grassland ecosystems above 1,000 meters altitude."
    },
    {
        title: "Extreme Range Endemism",
        description: "Occupies an estimated total global range of less than 100 square kilometers in the Anamalai landscape."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Rhacophorus_pseudomalabaricus.jpg/800px-Rhacophorus_pseudomalabaricus.jpg",
        caption: "Anamalai Flying Frog (Rhacophorus pseudomalabaricus) displaying signature zebra pattern",
        category: "Morphology"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Anamalai_Hills_Valparai_Tea_Estates.jpg/800px-Anamalai_Hills_Valparai_Tea_Estates.jpg",
        caption: "Anamalai Hills rainforest canopy — Core range of the species",
        category: "Habitat"
    }
];

const REFERENCES = [
    { text: "Vasudevan, K., & Dutta, S. K. (2000). A new species of Rhacophorus from the Western Ghats, India. Hamadryad.", link: "#" },
    { text: "IUCN Red List of Threatened Species — Rhacophorus pseudomalabaricus assessment.", link: "https://www.iucnredlist.org" },
    { text: "Anamalai Tiger Reserve Conservation Plan — Tamil Nadu Forest Department.", link: "https://forests.tn.gov.in" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ANAMALAI_FROG_INFO, TAXONOMY_DATA, ECOLOGY_BEHAVIOUR, INTERESTING_FACTS, GALLERY_IMAGES, REFERENCES };
}

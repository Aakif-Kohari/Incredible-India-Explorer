/**
 * Malabar Gliding Frog Explorer — Data Module
 * Comprehensive dataset covering taxonomy, Western Ghats rainforest canopy,
 * bright orange webbed aerodynamic adaptations, foam nesting, and gallery.
 */

const MALABAR_FROG_INFO = {
    id: "malabar-gliding-frog",
    commonName: "Malabar Gliding Frog",
    scientificName: "Rhacophorus malabaricus",
    family: "Rhacophoridae",
    genus: "Rhacophorus",
    species: "R. malabaricus",
    endemicRegion: "Western Ghats (Maharashtra, Goa, Karnataka, Kerala, Tamil Nadu)",
    iucnStatus: "Least Concern (IUCN 3.1)",
    protectionStatus: "Schedule IV (Indian Wildlife Protection Act, 1972)",
    habitatType: "Tropical wet evergreen and moist deciduous forest canopy, riparian zones",
    avgSize: "75 to 105 mm (Females up to 105 mm)",
    lifespan: "6 to 10 years in wild rainforest canopy",
    dietType: "Insectivorous (Crone moths, beetles, crickets, flies, winged termites)",
    quickStats: [
        { label: "Endemic Range", value: "Western Ghats", icon: "🌿" },
        { label: "IUCN Red List", value: "Least Concern", icon: "🛡️" },
        { label: "Gliding Distance", value: "Up to 12 meters", icon: "🪂" },
        { label: "Nesting Style", value: "Overhanging Foam Nest", icon: "🫧" },
        { label: "Avg Body Length", value: "75–105 mm", icon: "🐸" },
        { label: "Webbing Color", value: "Vibrant Orange-Yellow", icon: "🎨" }
    ]
};

const TAXONOMY_DATA = {
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Amphibia",
    order: "Anura",
    family: "Rhacophoridae",
    genus: "Rhacophorus",
    species: "Rhacophorus malabaricus (Jerdon, 1853)"
};

const ECOLOGY_BEHAVIOUR = {
    overview: "The Malabar Gliding Frog (Rhacophorus malabaricus) is a charismatic, large tree frog endemic to the rainforest canopy of the Western Ghats mountain chain in India.",
    distribution: "Widespread throughout the Western Ghats from Maharashtra and Goa through Karnataka, Kerala, and western Tamil Nadu (Agumbe, Wayanad, Silent Valley, Kudremukh).",
    habitat: "Inhabits upper forest canopy (10–25 meters), moist deciduous vegetation near streams, plantations, and monsoon-fed ephemeral pools.",
    morphology: "Characterized by vivid emerald-green dorsal coloration, bright crimson or orange-yellow webbing between fingers and toes, and cutaneous dermal fringes along forearm edges.",
    behaviour: "Expert parachutist. When threatened or moving between trees, it leaps into the air and flares its broad webbed feet to glide horizontally up to 12 meters.",
    diet: "Active nocturnal hunter preying upon crickets, moths, beetles, katydids, and swarming termites.",
    reproduction: "During monsoon rains, amplexing pairs construct large lathered foam nests on leaves directly above forest puddles. Eggs hatch and tadpoles wash down during rainstorms.",
    ecologicalImportance: "Serves as an essential bioindicator species for rainforest health and a vital controller of nocturnal insect populations.",
    conservation: "Currently listed as Least Concern, but threatened locally by pesticide runoff, deforestation, and habitat loss from linear infrastructure."
};

const INTERESTING_FACTS = [
    {
        title: "Iconic Parachute Webbing",
        description: "Features crimson and orange interdigital webbing that expands like mini-parachutes to control angle and speed during aerial glides."
    },
    {
        title: "Agumbe Monsoon Symbol",
        description: "Known as the unofficial mascot of the Agumbe Rainforest Research Station in Karnataka during the heavy summer monsoons."
    },
    {
        title: "Rainforest Health Indicator",
        description: "Highly sensitive to humidity and air quality; presence indicates pristine, unpolluted tropical rainforest ecosystems."
    },
    {
        title: "Jerdon Discovery (1853)",
        description: "First described by pioneer British surgeon and naturalist Thomas Caverhill Jerdon from the Malabar coast."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Malabar_gliding_frog_Rhacophorus_malabaricus.jpg/800px-Malabar_gliding_frog_Rhacophorus_malabaricus.jpg",
        caption: "Malabar Gliding Frog (Rhacophorus malabaricus) showcasing vibrant green coloration",
        category: "Morphology"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Foam_nest_of_Malabar_gliding_frog.jpg/800px-Foam_nest_of_Malabar_gliding_frog.jpg",
        caption: "Arboreal foam nest of the Malabar Gliding Frog suspended over forest pool",
        category: "Reproduction"
    }
];

const REFERENCES = [
    { text: "Jerdon, T. C. (1853). Catalogue of Reptiles inhabiting the Peninsula of India. Journal of the Asiatic Society of Bengal.", link: "#" },
    { text: "IUCN Red List of Threatened Species — Rhacophorus malabaricus assessment.", link: "https://www.iucnredlist.org" },
    { text: "Gururaja, K. V. (2012). Pictorial Guide to Frogs and Toads of the Western Ghats. Gubbi Labs.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MALABAR_FROG_INFO, TAXONOMY_DATA, ECOLOGY_BEHAVIOUR, INTERESTING_FACTS, GALLERY_IMAGES, REFERENCES };
}

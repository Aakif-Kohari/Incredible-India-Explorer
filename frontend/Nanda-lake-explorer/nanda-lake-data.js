/**
 * Nanda Lake Explorer Dataset
 * Goa's First and Only Ramsar Site
 */

export const NANDA_LAKE_DATA = {
    id: 'nanda-lake-explorer',
    name: 'Nanda Lake Explorer',
    subtitle: 'Goa\'s First Ramsar Site & a Freshwater Marsh Beside the Zuari',
    location: 'Cacora Village, Quepem Taluka, South Goa',
    ramsarSiteNo: 2471,
    ramsarDeclared: 2022,
    area: '42 ha (0.42 km²)',
    type: 'Intermittent Freshwater Marsh',
    coordinates: { lat: 15.236, lng: 74.109 },

    stats: [
        { label: 'Wetland Area', value: '42 ha', icon: '🌊' },
        { label: 'Ramsar Declared', value: '2022', icon: '🪷' },
        { label: 'Notable Bird Species', value: '8+', icon: '🐦' },
        { label: 'Goa\'s Ramsar Sites', value: '1 of 1', icon: '🏞️' }
    ],

    freshwaterLake: {
        title: 'A Lake That Follows the Rhythm of a Sluice Gate',
        content: 'Nanda Lake sits beside a tributary of the Zuari River in Cacora village, Quepem taluka, and its character changes with the seasons in an unusual way. A sluice gate links the marsh to the adjoining river channel: when the gate is closed, water backs up and floods the marsh into something close to a proper lake; when it is open, the water drains and the site reverts to intermittent freshwater marshland, grasslands, and paddy-adjacent wet ground. That back-and-forth between "marsh" and "lake" is not an accident of engineering gone wrong, but a deliberate, decades-old local water-management practice, one that gives Nanda Lake a genuinely amphibious identity rather than a single fixed shoreline.'
    },

    ramsarSite: {
        title: 'Goa\'s Only Wetland of International Importance',
        content: 'Nanda Lake was designated a Ramsar Site on 8 June 2022, becoming the first, and so far only, Ramsar-recognised wetland in Goa. Covering just 42 hectares, it is a modest site by Ramsar standards, but the designation recognised how tightly the marsh is woven into the ecology of the Western Ghats foothills and into the daily water needs of the villages around it. Its listing came as part of a larger batch of ten new Indian wetlands announced that year, alongside sites such as Thane Creek in Maharashtra, taking India\'s total Ramsar count past 60.'
    },

    aquaticPlants: {
        title: 'Water Lilies, Reeds, and a Green Surface',
        content: 'Nanda Lake is known locally for its abundance of water lilies, which spread across the marsh surface during the wetter months and draw visitors during World Wetlands Day celebrations held at the site. Alongside the lilies, the wetland supports water hyacinth, lotus, and dense stands of reeds, plants that together shape the marsh into a mosaic of open water, floating vegetation, and reed beds. These plant communities do more than add scenery: they slow water flow, trap sediment, and create sheltered feeding and nesting conditions for the birds and amphibians that depend on the lake.'
    },

    birdSpecies: {
        title: 'A Stop on the Central Asian Flyway',
        subtitle: 'Migratory and resident waterbirds share the marsh\'s reeds and open water.',
        content: 'Nanda Lake\'s official Ramsar listing names the black-headed ibis, common kingfisher, wire-tailed swallow, bronze-winged jacana, brahminy kite, intermediate egret, little cormorant, and lesser whistling duck among its notable bird species. Red-wattled lapwings are also regularly sighted along the marsh edges. As part of the Central Asian Flyway, the lake gives migratory waterbirds a reliable freshwater stopover in a state better known for its beaches than its wetlands, making it an easy site for birdwatchers to reach without leaving South Goa.',
        facts: [
            'The black-headed ibis and bronze-winged jacana are two of the more distinctive species regularly recorded here.',
            'Nanda Lake lies on the Central Asian Flyway, a migratory route used by waterbirds across large parts of Asia.',
            'World Wetlands Day is marked each February with a public celebration at the lake in nearby Curchorem.'
        ]
    },

    biodiversity: {
        title: 'More Than Birds: Fish, Amphibians, and a Threatened Species',
        content: 'Beneath the water lilies, Nanda Lake supports a mix of fish and invertebrates that sustain local fishing, along with amphibians and reptiles suited to its seasonally flooded ground. Among the fish recorded here is Pethia setnai, a small barb species listed as threatened by the IUCN, underlining that even a compact 42-hectare marsh can hold conservation significance well beyond its size. The lake\'s combination of open water, reed beds, and adjoining coconut groves and paddy fields creates a layered habitat that few single ecosystems in Goa replicate.'
    },

    conservation: {
        title: 'Balancing Ecology, Livelihoods, and Local Voices',
        content: 'Nanda Lake\'s Ramsar recognition has not been free of friction. Local villagers, who depend on the lake for farming, fishing, and daily water use, have raised concerns that they were not adequately consulted before the designation, and debate has continued around plans for a research and observation centre at the site, with residents worried it could bring disruptive tourism or sideline their role as the lake\'s day-to-day stewards. On the ecological side, the Ramsar authorities list invasive non-native species, garbage and solid waste, and overfishing as active threats, and note that a formal management plan for the site has yet to be put in place — making Nanda Lake as much a live conservation conversation as a finished success story.'
    },

    hotspots: [
        { id: 'sluice-gate', name: 'Nanda Lake Sluice Gate', lat: 15.238, lng: 74.108, desc: 'The control point where the lake\'s water level is regulated between marsh and open-water phases.' },
        { id: 'cacora-village', name: 'Cacora Village Shoreline', lat: 15.236, lng: 74.109, desc: 'The village edge of the lake, where water lilies and reed beds are most visible.' },
        { id: 'ravindra-bhavan', name: 'Ravindra Bhavan, Curchorem', lat: 15.256, lng: 74.106, desc: 'Venue for World Wetlands Day events celebrating the lake\'s designation and biodiversity.' },
        { id: 'quepem-paddy-fields', name: 'Downstream Paddy Fields', lat: 15.230, lng: 74.107, desc: 'Rice paddies that rely on water released from the lake during the growing season.' }
    ],

    gallery: [
        { title: 'Nanda Lake, Curchorem', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nanda_Lake_Curchoten.jpg', caption: 'Wide view across Nanda Lake near Curchorem in South Goa.' },
        { title: 'Nanda Lake, Cacora', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nanda_Lake_Curchorem.jpg', caption: 'The marsh and open water of Nanda Lake, Goa\'s only Ramsar site.' },
        { title: 'Sluice Gate, South Goa', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sluice_Gate_in_Loutolim.jpg', caption: 'A South Goa sluice gate of the kind that regulates Nanda Lake\'s water level.' },
        { title: 'Aquatic Birds, Goa Wetlands', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aquatic_birds._in_Taleigao._Photo_by_JoeGoaUk.jpg', caption: 'Waterbirds typical of Goa\'s freshwater marsh habitats.' }
    ],

    facts: [
        'Nanda Lake is Goa\'s first, and so far only, Ramsar-recognised Wetland of International Importance.',
        'A sluice gate lets the local community switch the site between an open lake and a drained marsh, depending on the season.',
        'The wetland is home to Pethia setnai, a small fish species classified as threatened by the IUCN.',
        'At just 42 hectares, Nanda Lake is one of the smaller entries on India\'s Ramsar list, yet it sits on the Central Asian Flyway.'
    ]
};
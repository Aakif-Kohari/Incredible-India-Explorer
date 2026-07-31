/**
 * Wetlands of India Explorer Dataset
 * Comprehensive dataset covering Ramsar sites, coastal lagoons, freshwater lakes,
 * mangroves, marshes, reservoirs, statistics, and interactive map coordinates.
 */

export const WETLANDS_DATA = {
    stats: [
        { label: 'Total Ramsar Sites', value: '85+', icon: '🪷' },
        { label: 'States & UTs Covered', value: '26', icon: '🗺️' },
        { label: 'Migratory Bird Species', value: '500+', icon: '🦩' },
        { label: 'Protected Wetland Area', value: '1.3M+ ha', icon: '🌊' }
    ],

    types: [
        'All',
        'Lagoon',
        'Lake',
        'Marsh',
        'Mangrove',
        'Estuary',
        'Reservoir',
        'Floodplain'
    ],

    states: [
        'All',
        'Odisha',
        'Manipur',
        'Andhra Pradesh',
        'Punjab',
        'Jammu & Kashmir',
        'West Bengal',
        'Rajasthan',
        'Kerala',
        'Assam',
        'Madhya Pradesh'
    ],

    didYouKnow: [
        {
            title: 'Largest Coastal Lagoon',
            fact: 'Chilika Lake in Odisha is Asia\'s largest brackish water lagoon and home to the endangered Irrawaddy Dolphin.'
        },
        {
            title: 'Only Floating National Park',
            fact: 'Keibul Lamjao National Park on Loktak Lake, Manipur is the world\'s only floating national park on heterogeneous masses of soil and vegetation called Phumdis.'
        },
        {
            title: 'Largest Freshwater Lake in AP',
            fact: 'Kolleru Lake located between the Krishna and Godavari deltas was designated a Ramsar site in 2002 and acts as a natural flood balancing reservoir.'
        },
        {
            title: 'Siberian Crane Winter Refuge',
            fact: 'Keoladeo National Park in Bharatpur is a world-famous man-made bird sanctuary hosting over 370 bird species along the Central Asian Flyway.'
        },
        {
            title: 'Mangrove Carbon Super-Sink',
            fact: 'The Sundarbans delta is the world\'s largest contiguous mangrove forest, storing up to 4 times more carbon than terrestrial rainforests.'
        }
    ],

    wetlands: [
        {
            id: 'chilika-lake',
            name: 'Chilika Lake',
            state: 'Odisha',
            type: 'Lagoon',
            area: '1,165 km²',
            ramsarDeclared: 1981,
            ramsarSiteNo: 229,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Chilika_Lake_Odisha.jpg/960px-Chilika_Lake_Odisha.jpg',
            shortDesc: 'Asia\'s largest brackish water lagoon, sanctuary for Irrawaddy Dolphins and over a million migratory waterfowl at Nalabana Sanctuary.',
            exploreUrl: '../chilika-lake/index.html',
            coordinates: { lat: 19.7, lng: 85.3 },
            keyFauna: ['Irrawaddy Dolphin', 'Flamingo', 'White-bellied Sea Eagle', 'Fishing Cat'],
            isFeatured: true
        },
        {
            id: 'loktak-lake',
            name: 'Loktak Lake',
            state: 'Manipur',
            type: 'Lake',
            area: '287 km²',
            ramsarDeclared: 1990,
            ramsarSiteNo: 463,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Loktak_lake_Manipur.jpg/960px-Loktak_lake_Manipur.jpg',
            shortDesc: 'Famous for floating islands known as Phumdis and the habitat of the endangered Sangai dancing deer in Keibul Lamjao National Park.',
            exploreUrl: '../loktak-lake/index.html',
            coordinates: { lat: 24.55, lng: 93.8 },
            keyFauna: ['Sangai Deer', 'Black-necked Stork', 'Indian Python', 'Water Hen'],
            isFeatured: true
        },
        {
            id: 'kolleru-lake',
            name: 'Kolleru Lake',
            state: 'Andhra Pradesh',
            type: 'Lake',
            area: '901 km²',
            ramsarDeclared: 2002,
            ramsarSiteNo: 1209,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kolleru_Lake_Andhra_Pradesh.jpg/960px-Kolleru_Lake_Andhra_Pradesh.jpg',
            shortDesc: 'One of India\'s largest freshwater lakes located between the Krishna and Godavari deltas, hosting grey pelicans and painted storks.',
            exploreUrl: '../kolleru-lake/index.html',
            coordinates: { lat: 16.63, lng: 81.33 },
            keyFauna: ['Spot-billed Pelican', 'Painted Stork', 'Glossy Ibis', 'Catfish'],
            isFeatured: true
        },
        {
            id: 'pala-wetland',
            name: 'Pala Wetland',
            state: 'Mizoram',
            type: 'Lake',
            area: '1.85 km²',
            ramsarDeclared: 2021,
            ramsarSiteNo: 2460,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White-winged_duck_Asarcornis_scutulata.jpg/800px-White-winged_duck_Asarcornis_scutulata.jpg',
            shortDesc: 'Mizoram\'s first Ramsar Site and largest natural freshwater lake, surrounded by tropical evergreen forest and Mara tribal folklore.',
            exploreUrl: '../pala-wetland-explorer/index.html',
            coordinates: { lat: 22.203, lng: 92.906 },
            keyFauna: ['White-winged Wood Duck', 'Great Hornbill', 'Mizoram Chameleon Fish', 'Asian Emerald Dove'],
            isFeatured: true
        },
        {
            id: 'hygam-wetland',
            name: 'Hygam Wetland Conservation Reserve',
            state: 'Jammu & Kashmir',
            type: 'Floodplain',
            area: '8.02 km²',
            ramsarDeclared: 2022,
            ramsarSiteNo: 2489,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/bf/Mallard_drake_at_St_James%27s_Park.jpg/800px-Mallard_drake_at_St_James%27s_Park.jpg',
            shortDesc: 'Ramsar Site in Kashmir Valley, crucial stopover on the Central Asian Flyway and natural flood sponge for the Jhelum basin.',
            exploreUrl: '../hygam-wetland-explorer/index.html',
            coordinates: { lat: 34.238, lng: 74.521 },
            keyFauna: ['Mallard', 'Gadwall', 'Northern Pintail', 'Common Teal'],
            isFeatured: true
        },
        {
            id: 'shallabug-wetland',
            name: 'Shallabug Wetland Conservation Reserve',
            state: 'Jammu & Kashmir',
            type: 'Marsh',
            area: '16.75 km²',
            ramsarDeclared: 2022,
            ramsarSiteNo: 2490,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Eurasian_Wigeon_male.jpg/800px-Eurasian_Wigeon_male.jpg',
            shortDesc: 'Vast Kashmir marshland Ramsar site supporting 200,000+ waterfowl and traditional wicker willow handicraft heritage.',
            exploreUrl: '../shallabug-wetland-explorer/index.html',
            coordinates: { lat: 34.167, lng: 74.717 },
            keyFauna: ['Eurasian Wigeon', 'Garganey', 'Greylag Goose', 'Ferruginous Pochard'],
            isFeatured: true
        },
        {
            id: 'wular-lake',
            name: 'Wular Lake',
            state: 'Jammu & Kashmir',
            type: 'Lake',
            area: '189 km²',
            ramsarDeclared: 1990,
            ramsarSiteNo: 461,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Wular_Lake_Kashmir.jpg/960px-Wular_Lake_Kashmir.jpg',
            shortDesc: 'One of the largest freshwater lakes in Asia, fed by the Jhelum River in the Kashmir Valley.',
            exploreUrl: '../../wular-lake/wular-lake.html',
            coordinates: { lat: 34.35, lng: 74.6 },
            keyFauna: ['Common Teal', 'Pintail', 'Schizothorax fish', 'Mallard'],
            isFeatured: true
        },
        {
            id: 'wadhvana-wetland',
            name: 'Wadhvana Wetland',
            state: 'Gujarat',
            type: 'Reservoir',
            area: '10.3 km²',
            ramsarDeclared: 2021,
            ramsarSiteNo: 2454,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ferruginous_duck_%28Aythya_nyroca%29_male.jpg/800px-Ferruginous_duck_%28Aythya_nyroca%29_male.jpg',
            shortDesc: 'Century-old reservoir built by Maharaja Sayajirao Gaekwad III, Ramsar Site supporting 80,000+ wintering migratory waterfowl.',
            exploreUrl: '../wadhvana-wetland-explorer/index.html',
            coordinates: { lat: 22.174, lng: 73.483 },
            keyFauna: ['Ferruginous Duck', 'Greylag Goose', 'Greater Flamingo', 'Common Pochard'],
            isFeatured: true
        },
        {
            id: 'pala-wetland',
            name: 'Pala Wetland',
            state: 'Mizoram',
            type: 'Lake',
            area: '1.85 km²',
            ramsarDeclared: 2021,
            ramsarSiteNo: 2460,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White-winged_duck_Asarcornis_scutulata.jpg/800px-White-winged_duck_Asarcornis_scutulata.jpg',
            shortDesc: 'Mizoram\'s first Ramsar Site and largest natural freshwater lake, surrounded by tropical evergreen forest and Mara tribal folklore.',
            exploreUrl: '../pala-wetland-explorer/index.html',
            coordinates: { lat: 22.203, lng: 92.906 },
            keyFauna: ['White-winged Wood Duck', 'Great Hornbill', 'Mizoram Chameleon Fish', 'Asian Emerald Dove'],
            isFeatured: true
        },
        {
            id: 'harike-wetland',
            name: 'Harike Wetland',
            state: 'Punjab',
            type: 'Reservoir',
            area: '41 km²',
            ramsarDeclared: 1990,
            ramsarSiteNo: 462,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Harike_Pattan_Wetland.jpg/960px-Harike_Pattan_Wetland.jpg',
            shortDesc: 'Confluence wetland of the Sutlej and Beas rivers in Punjab, crucial staging site for migratory birds.',
            exploreUrl: '../../harike-wetland/harike-wetland.html',
            coordinates: { lat: 31.15, lng: 74.95 },
            keyFauna: ['Indus River Dolphin', 'Smooth-coated Otter', 'Bar-headed Goose'],
            isFeatured: false
        },
        {
            id: 'shallabug-wetland',
            name: 'Shallabug Wetland Conservation Reserve',
            state: 'Jammu & Kashmir',
            type: 'Marsh',
            area: '16.75 km²',
            ramsarDeclared: 2022,
            ramsarSiteNo: 2490,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Eurasian_Wigeon_male.jpg/800px-Eurasian_Wigeon_male.jpg',
            shortDesc: 'Vast Kashmir marshland Ramsar site supporting 200,000+ waterfowl and traditional wicker willow handicraft heritage.',
            exploreUrl: '../shallabug-wetland-explorer/index.html',
            coordinates: { lat: 34.167, lng: 74.717 },
            keyFauna: ['Eurasian Wigeon', 'Garganey', 'Greylag Goose', 'Ferruginous Pochard'],
            isFeatured: true
        },
        {
            id: 'keshopur-miani-wetland',
            name: 'Keshopur-Miani Community Reserve',
            state: 'Punjab',
            type: 'Marsh',
            area: '3.44 km²',
            ramsarDeclared: 2019,
            ramsarSiteNo: 2408,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sarus_Crane_%28Grus_antigone%29_in_head-up_display.jpg/800px-Sarus_Crane_%28Grus_antigone%29_in_head-up_display.jpg',
            shortDesc: 'Punjab\'s first Ramsar Site, a community-managed freshwater marsh & aquaculture mosaic hosting breeding Sarus Cranes.',
            exploreUrl: '../keshopur-miani-wetland-explorer/index.html',
            coordinates: { lat: 32.091, lng: 75.385 },
            keyFauna: ['Sarus Crane', 'Common Teal', 'Black-headed Ibis', 'Common Pochard'],
            isFeatured: true
        },
        {
            id: 'sundarbans-wetland',
            name: 'Sundarbans Wetland',
            state: 'West Bengal',
            type: 'Mangrove',
            area: '4,230 km²',
            ramsarDeclared: 2019,
            ramsarSiteNo: 2370,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sundarban_Tiger.jpg/960px-Sundarban_Tiger.jpg',
            shortDesc: 'Largest mangrove wetland complex in the world, home to swimming Bengal Tigers and estuarine crocodiles.',
            exploreUrl: '../sundarbans-national-park/index.html',
            coordinates: { lat: 21.94, lng: 88.9 },
            keyFauna: ['Royal Bengal Tiger', 'Estuarine Crocodile', 'Batagur baska Turtle'],
            isFeatured: true
        },
        {
            id: 'keoladeo-national-park',
            name: 'Keoladeo Ghana National Park',
            state: 'Rajasthan',
            type: 'Marsh',
            area: '28.7 km²',
            ramsarDeclared: 1981,
            ramsarSiteNo: 230,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg/960px-Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg',
            shortDesc: 'Man-made duck-shooting preserve turned UNESCO World Heritage wetland and bird sanctuary.',
            exploreUrl: '../keoladeo-national-park-explorer/index.html',
            coordinates: { lat: 27.17, lng: 77.49 },
            keyFauna: ['Siberian Crane', 'Painted Stork', 'Indian Python'],
            isFeatured: false
        },
        {
            id: 'beas-conservation-reserve',
            name: 'Beas Conservation Reserve',
            state: 'Punjab',
            type: 'Floodplain',
            area: '184 km²',
            ramsarDeclared: 2019,
            ramsarSiteNo: 2407,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Beas_River_Punjab.jpg/960px-Beas_River_Punjab.jpg',
            shortDesc: '185-km stretch of the Beas River hosting reintroduced Gharials and the rare Indus River Dolphin.',
            exploreUrl: '../beas-conservation-wetlands-explorer/index.html',
            coordinates: { lat: 31.38, lng: 75.18 },
            keyFauna: ['Gharial', 'Indus River Dolphin', 'Smooth-coated Otter'],
            isFeatured: false
        },
        {
            id: 'wadhvana-wetland',
            name: 'Wadhvana Wetland',
            state: 'Gujarat',
            type: 'Reservoir',
            area: '10.3 km²',
            ramsarDeclared: 2021,
            ramsarSiteNo: 2454,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ferruginous_duck_%28Aythya_nyroca%29_male.jpg/800px-Ferruginous_duck_%28Aythya_nyroca%29_male.jpg',
            shortDesc: 'Century-old reservoir built by Maharaja Sayajirao Gaekwad III, Ramsar Site supporting 80,000+ wintering migratory waterfowl.',
            exploreUrl: '../wadhvana-wetland-explorer/index.html',
            coordinates: { lat: 22.174, lng: 73.483 },
            keyFauna: ['Ferruginous Duck', 'Greylag Goose', 'Greater Flamingo', 'Common Pochard'],
            isFeatured: true
        },
        {
            id: 'ashtamudi-lake',
            name: 'Ashtamudi Lake',
            state: 'Kerala',
            type: 'Estuary',
            area: '61.4 km²',
            ramsarDeclared: 2002,
            ramsarSiteNo: 1214,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Stork-billed_kingfisher_%28Pelargopsis_capensis_capensis%29.jpg/800px-Stork-billed_kingfisher_%28Pelargopsis_capensis_capensis%29.jpg',
            shortDesc: 'Kerala\'s famous 8-armed palm-shaped backwaters, Ramsar Site #1214, home to Kettuvallam houseboats, Munroe mangroves, and MSC certified clam fisheries.',
            exploreUrl: '../ashtamudi-lake-explorer/index.html',
            coordinates: { lat: 8.950, lng: 76.583 },
            keyFauna: ['Stork-billed Kingfisher', 'Malabar Short-neck Clam', 'Indian Cormorant', 'Little Egret'],
          },{  id: 'vembanad-lake',
            name: 'Vembanad Lake',
            state: 'Kerala',
            type: 'Lake',
            area: '2,033 km²',
            ramsarDeclared: 2002,
            ramsarSiteNo: 1215,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pearlspot.jpg/800px-Pearlspot.jpg',
            shortDesc: 'India\'s longest lake (96.5 km) and largest Ramsar Site #1215, featuring Kumarakom Bird Sanctuary, Nehru Trophy snake boat races, and Kettuvallam houseboats.',
            exploreUrl: '../vembanad-lake-explorer/index.html',
            coordinates: { lat: 9.600, lng: 76.400 },
            keyFauna: ['Pearl Spot (Karimeen)', 'Oriental Darter', 'White-throated Kingfisher', 'Spot-billed Duck'],
            isFeatured: true
        }
    ]
};


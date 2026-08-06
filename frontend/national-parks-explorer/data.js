/**
 * National Parks of India Explorer — Landing Data
 * Curated dataset covering India's iconic national parks, tiger reserves,
 * and UNESCO World Heritage Sites with searchable, filterable metadata.
 */

const NATIONAL_PARKS = [
    {
        id: 'jim-corbett', name: 'Jim Corbett National Park', state: 'Uttarakhand', region: 'north',
        established: 1936, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: "India's oldest national park and the birthplace of Project Tiger (1973), teeming with Bengal tigers, elephants, and leopards along the Ramganga.",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jim_Corbett_National_Park_%28India%29.jpg/960px-Jim_Corbett_National_Park_%28India%29.jpg',
        explorerUrl: '../national-parks/jim-corbett-national-park-explorer/index.html',
        coordinates: { lat: 29.53, lng: 78.77 }
    },
    {
        id: 'kaziranga', name: 'Kaziranga National Park', state: 'Assam', region: 'northeast',
        established: 1974, type: 'UNESCO Site', isTigerReserve: true, isUNESCO: true,
        description: 'UNESCO World Heritage Site sheltering two-thirds of the world\'s one-horned rhinoceroses amid vast grasslands and wetlands.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/960px-Elephant_safari_in_Kaziranga.jpg',
        explorerUrl: '../national-parks/kaziranga-national-park-explorer/index.html',
        coordinates: { lat: 26.64, lng: 93.42 }
    },
    {
        id: 'kanha', name: 'Kanha National Park', state: 'Madhya Pradesh', region: 'central',
        established: 1955, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'The inspiration behind Rudyard Kipling\'s Jungle Book, famous for saving the hard-ground barasingha from near-extinction.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Jungle_safari_-_Kanha_National_Park.jpg/960px-Jungle_safari_-_Kanha_National_Park.jpg',
        explorerUrl: '../national-parks/kanha-national-park-explorer/index.html',
        coordinates: { lat: 22.34, lng: 80.61 }
    },
    {
        id: 'ranthambore', name: 'Ranthambore National Park', state: 'Rajasthan', region: 'north',
        established: 1980, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'Wild tigers set against dramatic ruins of Ranthambore Fort, with active day-time tiger sighting on semi-arid landscapes.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Padam_Talao_Lake%2C_Ranthambore_National_Park_%282014%29.jpg/960px-Padam_Talao_Lake%2C_Ranthambore_National_Park_%282014%29.jpg',
        explorerUrl: '../national-parks/ranthambore-national-park/index.html',
        coordinates: { lat: 26.02, lng: 76.5 }
    },
    {
        id: 'periyar', name: 'Periyar National Park', state: 'Kerala', region: 'south',
        established: 1982, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'A scenic reserve centred on an artificial lake in the Cardamom Hills, famed for boat-safari elephant sightings.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Periyar_National_Park_02.jpg/960px-Periyar_National_Park_02.jpg',
        explorerUrl: '../national-parks/periyar-national-park-explorer/index.html',
        coordinates: { lat: 9.46, lng: 77.15 }
    },
    {
        id: 'sundarbans', name: 'Sundarbans National Park', state: 'West Bengal', region: 'east',
        established: 1984, type: 'UNESCO World', isTigerReserve: true, isUNESCO: true,
        description: 'The world\'s largest mangrove delta where royal Bengal tigers have adapted to swimming through saline tidal rivers.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sundarbans_National_Park.jpg/960px-Sundarbans_National_Park.jpg',
        explorerUrl: '../national-parks/sundarbans-national-park/index.html',
        coordinates: { lat: 21.95, lng: 88.95 }
    },
    {
        id: 'gir', name: 'Gir National Park', state: 'Gujarat', region: 'west',
        established: 1965, type: 'Sanctuary', isTigerReserve: false, isUNESCO: false,
        description: 'The only natural home of the Asiatic lion, once reduced to under 20 individuals and now a global conservation success.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Asiatic_Lion.jpg/960px-Asiatic_Lion.jpg',
        explorerUrl: '../national-parks/gir-national-park/index.html',
        coordinates: { lat: 21.14, lng: 70.82 }
    },
    {
        id: 'valley-of-flowers', name: 'Valley of Flowers National Park', state: 'Uttarakhand', region: 'north',
        established: 1982, type: 'UNESCO World', isTigerReserve: false, isUNESCO: true,
        description: 'A UNESCO alpine valley carpeted with 600+ rare flowering species, the Himalayan Blue Poppy, and sacred Brahma Kamal.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Meconopsis_aculeata_in_Valley_of_Flowers.jpg/960px-Meconopsis_aculeata_in_Valley_of_Flowers.jpg',
        explorerUrl: '../national-parks/valley-of-flowers-national-park-explorer/index.html',
        coordinates: { lat: 30.728, lng: 79.605 }
    },
    {
        id: 'bhitarkanika', name: 'Bhitarkanika National Park', state: 'Odisha', region: 'east',
        established: 1998, type: 'National Park', isTigerReserve: false, isUNESCO: false,
        description: 'A Ramsar mangrove wetland hosting the world\'s largest saltwater crocodile population and 240+ bird species.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Bhitarkanika_National_Park.jpg/960px-Bhitarkanika_National_Park.jpg',
        explorerUrl: '../national-parks/bhitarkanika-national-park-explorer/index.html',
        coordinates: { lat: 20.76, lng: 86.95 }
    },
    {
        id: 'hemis', name: 'Hemis National Park', state: 'Ladakh', region: 'north',
        established: 1981, type: 'Sanctuary', isTigerReserve: false, isUNESCO: false,
        description: 'A high-altitude Himalayan reserve, home to the endangered snow leopard, and the largest park in the Trans-Himalayan landscape.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Hemis.htm/960px-Hemis.htm',
        explorerUrl: '../national-parks/hemis-national-park-explorer/index.html',
        coordinates: { lat: 33.84, lng: 77.08 }
    },
    {
        id: 'bandhavgarh', name: 'Bandhavgarh National Park', state: 'Madhya Pradesh', region: 'central',
        established: 1968, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'One of the highest tiger-density parks in India, dense sal and bamboo forests around the ancient Bandhavgarh fort.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Bandhavgarh_Tiger.jpg/960px-Bandhavgarh_Tiger.jpg',
        explorerUrl: '../national-parks/bandhavgarh-national-park-explorer/index.html',
        coordinates: { lat: 23.6, lng: 81.24 }
    },
    {
        id: 'manas', name: 'Manas National Park', state: 'Assam', region: 'northeast',
        established: 1990, type: 'UNESCO World', isTigerReserve: true, isUNESCO: true,
        description: 'A UNESCO site at the Himalayan foothills famous for the endangered golden langur, pygmy hog, and eastern swamp deer.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Manas.jpg/960px-Manas.jpg',
        explorerUrl: '../national-parks/manas-national-park-explorer/index.html',
        coordinates: { lat: 26.75, lng: 91.0 }
    },
    {
        id: 'dudhwa', name: 'Dudhwa National Park', state: 'Uttar Pradesh', region: 'north',
        established: 1977, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'A terai-term forest with tall open sal woods, grassland, and the reintroduction project for the one-horned rhinoceros.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Dudhwa_Tiger.jpg/960px-Dudhwa_Tiger.jpg',
        explorerUrl: '../national-parks/dudhwa-national-park-explorer/index.html',
        coordinates: { lat: 27.66, lng: 80.79 }
    },
    {
        id: 'simlipal', name: 'Simlipal National Park', state: 'Odisha', region: 'east',
        established: 1980, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'A lush biodiverse reserve famed for its melanistic black tigers and its rolling sal forests and waterfalls.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Simlipal.jpg/960px-Simlipal.jpg',
        explorerUrl: '../national-parks/simlipal-national-park-explorer/index.html',
        coordinates: { lat: 21.56, lng: 87.19 }
    },
    {
        id: 'bandipur', name: 'Bandipur National Park', state: 'Karnataka', region: 'south',
        established: 1974, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'A Project Tiger reserve in the Nilgiris with teak forests sheltering tigers, elephants, and gaur.',
        explorerUrl: '../national-parks/bandipur-national-park/index.html',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Bandipur_Elephant.jpg/960px-Bandipur_Elephant.jpg',
        coordinates: { lat: 11.79, lng: 76.64 }
    },
    {
        id: 'namdapha', name: 'Namdapha National Park', state: 'Arunachal Pradesh', region: 'northeast',
        established: 1983, type: 'National Park', isTigerReserve: false, isUNESCO: false,
        description: "India's easternmost great wilderness spanning tropical to alpine habitats, harbouring snow leopards, clouded leopards, and red pandas.",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Namdapha.jpg/960px-Namdapha.jpg',
        explorerUrl: '../national-parks/namdapha-national-park-explorer/index.html',
        coordinates: { lat: 27.2, lng: 96.6 }
    },
    {
        id: 'gulf-of-mannar', name: 'Gulf of Mannar Marine NP', state: 'Tamil Nadu', region: 'south',
        established: 1986, type: 'Marine Reserve', isTigerReserve: false, isUNESCO: false,
        description: 'A chain of coral-fringed islands and 21 marine protected islands supporting dugong, dolphins, and vibrant reefs.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Gulf_of_Mannar.jpg/960px-Gulf_of_Mannar.jpg',
        explorerUrl: '../national-parks/gulf-of-mannar-marine-national-park/index.html',
        coordinates: { lat: 9.03, lng: 78.93 }
    },
    {
        id: 'keoladeo', name: 'Keoladeo National Park', state: 'Rajasthan', region: 'north',
        established: 1981, type: 'UNESCO World', isTigerReserve: false, isUNESCO: true,
        description: 'A UNESCO bird sanctuary where thousands of migratory Siberian cranes and waterfowl winter amid tropical marshland.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Keoladeo_Bharatpur.jpg/960px-Keoladeo_Bharatpur.jpg',
        explorerUrl: '../national-parks/keoladeo-national-park-explorer/index.html',
        coordinates: { lat: 27.13, lng: 77.49 }
    },
    {
        id: 'satpura', name: 'Satpura National Park', state: 'Madhya Pradesh', region: 'central',
        established: 1981, type: 'Tiger Reserve', isTigerReserve: true, isUNESCO: false,
        description: 'A forested reserve offering Europe-wide boating, tracking, and walking safaris amid the Narmada and ancient hills.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Satpura.jpg/960px-Satpura.jpg',
        explorerUrl: '../national-parks/satpura-national-park-explorer/index.html',
        coordinates: { lat: 22.46, lng: 78.24 }
    },
    {
        id: 'kuno', name: 'Kuno National Park', state: 'Madhya Pradesh', region: 'central',
        established: 2018, type: 'National Park', isTigerReserve: false, isUNESCO: false,
        description: 'The newly-minted cheetah reserve that received translocated Cheetahs in 2022, marking a milestone for Indian wildlife.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Kuno_Cheetah.jpg/960px-Kuno_Cheetah.jpg',
        explorerUrl: '../national-parks/kuno-national-park-explorer/index.html',
        coordinates: { lat: 25.53, lng: 77.39 }
    },
    {
        id: 'nokrek', name: 'Nokrek National Park', state: 'Meghalaya', region: 'northeast',
        established: 1986, type: 'UNESCO Site', isTigerReserve: false, isUNESCO: true,
        description: 'A UNESCO biosphere reserve whose cloud forests shelter the wild khasi orange, an ancestor of modern citrus, alongside rare flora and fauna.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Nokrek.jpg/960px-Nokrek.jpg',
        explorerUrl: '../national-parks/nokrek-national-park-explorer/index.html',
        coordinates: { lat: 25.47, lng: 90.34 }
    }
];

const NATIONAL_PARK_FACTS = [
    {
        title: '106 National Parks',
        text: 'India is home to 106 national parks, protecting a tiny fraction of its vast and remarkably varied landscape.',
        icon: '🌳'
    },
    {
        title: '70% of the World\'s Tigers',
        text: 'More than 3,600 wild tigers roam India\'s reserves — roughly 70% of the global wild tiger population.',
        icon: '🐅'
    },
    {
        title: 'Project Tiger (1973)',
        text: 'Launched in 1973, Project Tiger helped grow tiger hubs from barely-tracked hunting grounds into thriving reserves.',
        icon: '🛡️'
    },
    {
        title: 'Only Home of the Asiatic Lion',
        text: 'Gir in Gujarat is the sole natural home of the Asiatic lion in the wild anywhere on Earth.',
        icon: '🦁'
    },
    {
        title: 'The Largest Crocodile Refuge',
        text: 'Bhitarkanika\'s mangroves shelter the largest saltwater — estuarine — crocodile population in the world.',
        icon: '🐊'
    },
    {
        title: 'UNESCO Wild Heritage',
        text: 'India\'s parks include multiple UNESCO World Heritage Sites such as Kaziranga, Keoladeo, Manas, and Valley of Flowers.',
        icon: '🏛️'
    }
];
/**
 * Sakhya Sagar Wetland Explorer Dataset
 * A Ramsar Reservoir Inside Madhav National Park, Shivpuri
 */

export const SAKHYA_SAGAR_DATA = {
    id: 'sakhya-sagar-wetland-explorer',
    name: 'Sakhya Sagar Wetland Explorer',
    subtitle: 'A Scenic Reservoir Ecosystem Inside Madhav National Park',
    location: 'Shivpuri District, Madhya Pradesh',
    ramsarSiteNo: 2483,
    ramsarDeclared: 2022,
    area: '248 ha (Reservoir) / 37,522 ha Catchment',
    type: 'Human-made Shallow Alkaline Reservoir',
    coordinates: { lat: 25.42, lng: 77.65 },

    stats: [
        { label: 'Reservoir Area', value: '248 ha', icon: '🌊' },
        { label: 'Bird Species Recorded', value: '73+', icon: '🦆' },
        { label: 'Fish Species', value: '19', icon: '🐟' },
        { label: 'Full Reservoir Storage', value: '7.78 MCM', icon: '💧' }
    ],

    reservoirEcosystem: {
        title: 'A Maharaja\'s Dam That Became a Living Wetland',
        content: 'Sakhya Sagar was created in 1918, when the Scindia rulers of Gwalior dammed the Manier River to build a scenic reservoir on the edge of Shivpuri, naming it after Maharani Sakhya Raje Scindia. Today it sits inside Madhav National Park, one of three connected lakes in the town along with Madhav Sagar and Jadhav Sagar. The reservoir is shallow, alkaline, and nutrient-rich, with a mosaic of open water, seasonal marsh, plantation edges, and small patches of farmland around its shore. Its north-eastern arm holds water and marsh habitat almost year-round, while the north-western section often dries out between monsoons, giving the wetland two very different faces depending on the season.'
    },

    ramsarSite: {
        title: 'Madhya Pradesh\'s Second Ramsar Wetland',
        content: 'Sakhya Sagar was designated a Wetland of International Importance on 7 January 2022, and the announcement was formally made alongside four other new Indian Ramsar sites in July 2022. It became only the second wetland from Madhya Pradesh on the Ramsar list, two decades after Bhopal\'s Upper Lake was recognised as the state\'s first. The listing acknowledged the reservoir\'s role as a permanent water source for the wildlife of Madhav National Park and its value as a staging ground for dozens of migratory bird species each winter.'
    },

    waterbirds: {
        title: 'A Winter Refuge for Migratory Waterfowl',
        subtitle: 'More than 70 recorded bird species use the lake through the year.',
        content: 'Every winter, Sakhya Sagar fills with visiting waterfowl — geese, pochards, pintails, mallards, shelducks, and gadwalls — feeding alongside resident species such as red-wattled lapwings, Indian pond herons, painted storks, and white-breasted kingfishers. In especially dry years, when other water bodies nearby have gone dry, the lake has drawn tens of thousands of birds at once, including large flocks of demoiselle and common cranes. That dependence on a single reliable water source is also the reservoir\'s vulnerability: when the lake itself is degraded, migratory birds simply stop coming.',
        facts: [
            'During the severe drought of 1987-88, surveys recorded roughly 25,000 waterbirds crowding onto the lake at once.',
            'Bar-headed geese and demoiselle cranes are among the more striking winter visitors recorded here.',
            'A build-up of invasive water hyacinth in recent winters has been linked to noticeably fewer migratory birds arriving.'
        ]
    },

    fisheries: {
        title: 'Marsh and Riverine Fish in a Shallow Lake',
        content: 'The reservoir supports around 19 recorded fish species, a mix of marsh-adapted and riverine fish suited to its shallow, alkaline waters. Local boat clubs and small-scale fishing activity share the lake with recreational boating, and the fish population forms part of the food base that supports the reservoir\'s larger wildlife, including its resident crocodiles and wading birds.'
    },

    biodiversity: {
        title: 'Crocodiles, Reptiles & the Wildlife of Madhav National Park',
        content: 'Sakhya Sagar is best known locally for its abundant population of mugger crocodiles (Crocodylus palustris), often visible basking along the banks and drawing comparisons to a "crocodile safari." Beyond crocodiles, the wetland and its margins support around nine reptile species, including Indian pythons and monitor lizards, and roughly 19 mammal species that use the lake\'s edge for water and cover. The surrounding forest of Madhav National Park, one of Madhya Pradesh\'s oldest protected areas, adds chital, sambar, nilgai, and leopard to the wider ecosystem the wetland anchors.'
    },

    conservation: {
        title: 'A Wetland Fighting an Invasive Plant',
        content: 'Sakhya Sagar\'s conservation is managed under the Shivpuri Management and Conservation Plan, run jointly with the local urban municipality, alongside its protection as part of Madhav National Park. In recent years, however, large sections of the lake have been overrun by invasive water hyacinth, a fast-spreading floating plant that blocks sunlight and lowers oxygen levels in the water beneath it. Local officials and environmental advocates have reported a visible drop in migratory bird numbers during winters when the hyacinth cover was worst, and clean-up work has needed coordination between the forest department, which manages the lake, and the municipal corporation responsible for the streams that feed it — a reminder that even a well-established Ramsar site needs continuous, active upkeep.'
    },

    hotspots: [
        { id: 'boat-club', name: 'Sakhya Sagar Boat Club', lat: 25.415, lng: 77.645, desc: 'Glass-panelled boat club on the shore, connected to the lake by a pier, popular for sunset views.' },
        { id: 'madhav-sagar', name: 'Madhav Sagar Lake', lat: 25.42, lng: 77.66, desc: 'The neighbouring lake built by Madho Rao Scindia, connected to Sakhya Sagar via a spillway.' },
        { id: 'george-castle', name: 'George Castle Viewpoint', lat: 25.44, lng: 77.63, desc: 'Hilltop lodge built for King George V\'s 1911 visit, offering wide views over the park and its lakes.' },
        { id: 'crocodile-basking-zone', name: 'Crocodile Basking Banks', lat: 25.418, lng: 77.648, desc: 'Shoreline stretch where mugger crocodiles are most commonly seen basking in the sun.' }
    ],

    gallery: [
        { title: 'Madhav National Park Landscape', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/This_is_at_Madhav_National_Park_in_Shivpuri.jpg', caption: 'A view within Madhav National Park, home to Sakhya Sagar reservoir.' },
        { title: 'Madhav National Park', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Madhav_Natioinal_Park.JPG', caption: 'Forest and open ground typical of the park surrounding the lake.' },
        { title: 'Vulture and Jackal in the Park', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vulture_and_Jackal_eating_together.jpg', caption: 'Wildlife encounter captured within Madhav National Park.' },
        { title: 'Balari Maiya, Shivpuri', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Balari_Maiya_in_Shivpuri.jpg', caption: 'A local landmark near Shivpuri, close to the Sakhya Sagar wetland.' }
    ],

    facts: [
        'Sakhya Sagar was built by damming the Manier River in 1918, nearly a decade before Indian independence.',
        'The reservoir is named after Maharani Sakhya Raje Scindia, wife of the Gwalior ruler who commissioned it.',
        'In severe drought years, the lake has drawn tens of thousands of birds when every other nearby water source ran dry.',
        'Sakhya Sagar is one of three connected lakes in Shivpuri, alongside Madhav Sagar and Jadhav Sagar.'
    ]
};
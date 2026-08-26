// Sinkholes & Subsidence Data
const subsidenceData = {
    zones: [
        {
            id: 'joshimath',
            name: 'Joshimath Subsidence Zone',
            type: 'subsidence',
            severity: 'severe',
            state: 'Uttarakhand',
            description: 'Pilgrimage town experiencing severe subsidence affecting 700+ buildings. Ground sinking 10-15 cm annually due to hydropower tunneling and unplanned construction.',
            causes: ['Hydropower tunneling', 'Unplanned construction', 'Geological factors', 'Groundwater changes'],
            impacts: ['700+ buildings affected', 'Mass evacuations', 'Pilgrimage disruption', 'Economic losses'],
            mapPosition: { x: 57, y: 37 }
        },
        {
            id: 'jharia',
            name: 'Jharia Coal Field',
            type: 'mining',
            severity: 'severe',
            state: 'Jharkhand',
            description: '80+ underground coal fires burning for over 100 years, causing extensive subsidence across 40 km². 100,000+ people displaced due to ground collapse and toxic emissions.',
            causes: ['Underground coal fires', 'Extensive mining', 'Abandoned mines', 'Subsidence'],
            impacts: ['100,000+ displaced', 'Toxic emissions', 'Ground collapse', 'Infrastructure damage'],
            mapPosition: { x: 62, y: 55 }
        },
        {
            id: 'chennai',
            name: 'Chennai Groundwater Crisis',
            type: 'subsidence',
            severity: 'high',
            state: 'Tamil Nadu',
            description: 'City-wide subsidence due to over-extraction of groundwater. Water table dropped 10-20m causing building damage and infrastructure stress.',
            causes: ['Over-extraction', 'Urban expansion', 'Aquifer depletion', 'Salt water intrusion'],
            impacts: ['Building damage', 'Infrastructure stress', 'Water scarcity', 'Economic impact'],
            mapPosition: { x: 48, y: 75 }
        },
        {
            id: 'raniganj',
            name: 'Raniganj Coal Field',
            type: 'mining',
            severity: 'high',
            state: 'West Bengal',
            description: 'Abandoned underground coal mines causing subsidence across 15 km². Multiple subsidence events affecting residential areas and infrastructure.',
            causes: ['Abandoned mines', 'Groundwater changes', 'Mining legacy', 'Subsurface voids'],
            impacts: ['Building damage', 'Road collapse', 'Resident evacuations', 'Infrastructure damage'],
            mapPosition: { x: 65, y: 58 }
        },
        {
            id: 'rann-kutch',
            name: 'Rann of Kutch',
            type: 'sinkhole',
            severity: 'moderate',
            state: 'Gujarat',
            description: 'Regional subsidence due to salt dissolution and groundwater extraction. Salt karst formation creating sinkholes and unstable ground.',
            causes: ['Salt dissolution', 'Groundwater extraction', 'Tectonic activity', 'Salt karst'],
            impacts: ['Infrastructure damage', 'Salt pan expansion', 'Ground instability'],
            mapPosition: { x: 22, y: 52 }
        },
        {
            id: 'delhi-metro',
            name: 'Delhi Metro Subsidence',
            type: 'subsidence',
            severity: 'moderate',
            state: 'Delhi',
            description: 'Localized subsidence near metro construction sites due to tunnel excavation and groundwater changes affecting adjacent buildings.',
            causes: ['Tunnel excavation', 'Groundwater changes', 'Soil conditions', 'Construction activity'],
            impacts: ['Building damage', 'Construction delays', 'Infrastructure stress'],
            mapPosition: { x: 42, y: 45 }
        },
        {
            id: 'meghalaya-limestone',
            name: 'Meghalaya Limestone Karst',
            type: 'sinkhole',
            severity: 'moderate',
            state: 'Meghalaya',
            description: 'Extensive limestone karst topography creating sinkholes and cave systems. Natural dissolution processes creating unstable ground.',
            causes: ['Limestone dissolution', 'Cave systems', 'Natural karst', 'Groundwater flow'],
            impacts: ['Sinkhole formation', 'Ground instability', 'Infrastructure risks'],
            mapPosition: { x: 72, y: 52 }
        },
        {
            id: 'rajasthan-gypsum',
            name: 'Rajasthan Gypsum Karst',
            type: 'sinkhole',
            severity: 'moderate',
            state: 'Rajasthan',
            description: 'Gypsum dissolution creating sinkholes in arid regions. Soluble gypsum beds dissolving due to groundwater flow.',
            causes: ['Gypsum dissolution', 'Groundwater flow', 'Arid conditions', 'Natural karst'],
            impacts: ['Sinkhole formation', 'Infrastructure damage', 'Ground instability'],
            mapPosition: { x: 32, y: 48 }
        }
    ],
    statistics: {
        sinkholeEventsPerYear: 100,
        majorSubsidenceZones: 50,
        annualDamagesCroreInr: 5000,
        jhariaAffectedAreaKm2: 40,
        displacedPeopleJharia: 100000,
        chennaiWaterTableDropMeters: 15,
        raniganjAffectedAreaKm2: 15
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = subsidenceData;
}

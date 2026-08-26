// Rockfall Hazards Data
const rockfallData = {
    zones: [
        {
            id: 'chamoli-rishikesh',
            name: 'Chamoli-Rishikesh Highway (NH-7)',
            region: 'himalayas',
            risk: 'high',
            elevation: '1,500-3,000 m',
            description: 'One of India\'s most rockfall-prone highways with over 50 active rockfall zones. Annual closures during monsoon affect pilgrimage routes to Badrinath and Kedarnath.',
            triggers: ['Heavy monsoon rainfall', 'Freeze-thaw cycles', 'Seismic activity', 'Road cutting vibrations'],
            impacts: ['Annual highway closures', 'Pilgrim safety risks', 'Economic losses', 'Emergency evacuations'],
            mapPosition: { x: 55, y: 35 }
        },
        {
            id: 'kinnaur-manali',
            name: 'Kinnaur-Manali Corridor',
            region: 'himalayas',
            risk: 'high',
            elevation: '2,000-4,000 m',
            description: 'High-altitude highway experiencing frequent rock avalanches, particularly during winter freeze-thaw cycles and spring snowmelt.',
            triggers: ['Winter freeze-thaw', 'Spring snowmelt', 'Seismic activity', 'Permafrost thaw'],
            impacts: ['Seasonal road closures', 'Tourism disruption', 'Village isolation', 'Supply chain breaks'],
            mapPosition: { x: 48, y: 30 }
        },
        {
            id: 'joshimath',
            name: 'Joshimath Region',
            region: 'himalayas',
            risk: 'high',
            elevation: '1,800-2,200 m',
            description: 'Pilgrimage town experiencing severe subsidence and rockfall threatening 700+ buildings. Hydropower tunneling blamed for destabilization.',
            triggers: ['Hydropower tunneling', 'Subsidence', 'Unplanned construction', 'Groundwater changes'],
            impacts: ['700+ buildings affected', 'Mass evacuations', 'Pilgrimage disruption', 'Economic losses'],
            mapPosition: { x: 57, y: 37 }
        },
        {
            id: 'manali-leh',
            name: 'Manali-Leh Highway',
            region: 'himalayas',
            risk: 'high',
            elevation: '2,500-5,300 m',
            description: 'World\'s highest motorable road experiencing extreme rockfall hazards, particularly at Baralacha La and Tanglang La passes.',
            triggers: ['Extreme altitude weather', 'Permafrost thaw', 'Seismic activity', 'Glacial melt'],
            impacts: ['Seasonal closures', 'Military logistics impact', 'Tourism risks', 'Supply disruptions'],
            mapPosition: { x: 45, y: 28 }
        },
        {
            id: 'munnar-kodaikanal',
            name: 'Munnar-Kodaikanal Ghat Road',
            region: 'western-ghats',
            risk: 'moderate',
            elevation: '1,500-2,200 m',
            description: 'Popular tourist route experiencing rockfalls during monsoon, with laterite rock prone to weathering and saturation.',
            triggers: ['Monsoon rainfall', 'Laterite weathering', 'Road construction', 'Tourism traffic'],
            impacts: ['Tourism disruption', 'Road closures', 'Safety risks', 'Economic impact'],
            mapPosition: { x: 38, y: 75 }
        },
        {
            id: 'mahabaleshwar-lonavala',
            name: 'Mahabaleshwar-Lonavala',
            region: 'western-ghats',
            risk: 'moderate',
            elevation: '1,000-1,400 m',
            description: 'Basalt cliffs subject to seasonal rockfall, threatening hill station tourism and Mumbai-Pune highway.',
            triggers: ['Monsoon saturation', 'Basalt weathering', 'Seismic activity', 'Road vibrations'],
            impacts: ['Tourism disruption', 'Highway closures', 'Safety risks', 'Infrastructure damage'],
            mapPosition: { x: 32, y: 62 }
        },
        {
            id: 'thal-ghat',
            name: 'Thal Ghat (Mumbai-Pune)',
            region: 'western-ghats',
            risk: 'moderate',
            elevation: '500-1,000 m',
            description: 'Major transportation corridor with frequent rockfall during monsoon, affecting critical Mumbai-Pune connectivity.',
            triggers: ['Monsoon rainfall', 'Basalt weathering', 'Heavy traffic vibrations', 'Construction activity'],
            impacts: ['Highway closures', 'Traffic disruption', 'Economic losses', 'Safety hazards'],
            mapPosition: { x: 30, y: 60 }
        },
        {
            id: 'shimla-kufri',
            name: 'Shimla-Kufri Road',
            region: 'himalayas',
            risk: 'moderate',
            elevation: '2,000-2,800 m',
            description: 'Tourist route experiencing rockfall during monsoon and winter, affecting hill station accessibility.',
            triggers: ['Winter freeze-thaw', 'Monsoon rainfall', 'Tourism traffic', 'Construction'],
            impacts: ['Tourism disruption', 'Safety risks', 'Economic impact', 'Infrastructure damage'],
            mapPosition: { x: 52, y: 33 }
        }
    ],
    statistics: {
        annualLandslides: 1400,
        livesLostPerYear: 800,
        landAreaAffected: 1.5,
        himalayanAreaMapped: '0.42M km²',
        highRiskHighways: '1,500 km',
        identifiedSites: 12000,
        himalayanContribution: 15
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = rockfallData;
}

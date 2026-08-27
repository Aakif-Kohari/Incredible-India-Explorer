/**
 * Hazard Data Module
 * Contains comprehensive data for all 12 hazard categories required by the issue.
 */

const HAZARD_CATEGORIES = [
    {
        id: 'earthquake',
        name: 'Earthquake Zones',
        icon: '🌍',
        color: '#ef4444',
        description: 'India is divided into four seismic zones (II, III, IV, V). Zone V is the most active, covering the Himalayas, Northeast, and parts of Gujarat and Kashmir.',
        resources: [
            'NDMA Earthquake Guidelines',
            'Drop, Cover, and Hold On protocol',
            'Identify safe spots in your home'
        ],
        coordinates: [
            { lat: 34.0833, lng: 74.7167, name: 'Kashmir (Zone V)', severity: 'high' },
            { lat: 27.5967, lng: 87.3250, name: 'Sikkim (Zone V)', severity: 'high' },
            { lat: 23.0225, lng: 72.5714, name: 'Gujarat (Zone IV/V)', severity: 'high' }
        ]
    },
    {
        id: 'flood',
        name: 'Flood-Prone Areas',
        icon: '🌊',
        color: '#3b82f6',
        description: 'Over 40 million hectares of land in India is flood-prone, primarily in the Brahmaputra, Ganga, and Godavari river basins.',
        resources: [
            'Move to higher ground immediately',
            'Avoid walking or driving through floodwaters',
            'Keep emergency kits ready'
        ],
        coordinates: [
            { lat: 26.1445, lng: 91.7362, name: 'Assam (Brahmaputra)', severity: 'high' },
            { lat: 25.5941, lng: 85.1376, name: 'Bihar (Ganga)', severity: 'high' },
            { lat: 17.3850, lng: 78.4867, name: 'Telangana (Godavari)', severity: 'medium' }
        ]
    },
    {
        id: 'cyclone',
        name: 'Cyclone-Prone Coast',
        icon: '🌀',
        color: '#8b5cf6',
        description: 'The 7,516 km coastline is vulnerable to cyclones, with the East Coast (Odisha, Andhra Pradesh, West Bengal) facing the highest frequency.',
        resources: [
            'Evacuate when authorities issue orders',
            'Secure windows and doors',
            'Store drinking water and non-perishable food'
        ],
        coordinates: [
            { lat: 20.2961, lng: 85.8245, name: 'Odisha Coast', severity: 'high' },
            { lat: 15.9129, lng: 79.7400, name: 'Andhra Pradesh Coast', severity: 'high' },
            { lat: 21.5139, lng: 87.3120, name: 'West Bengal Coast', severity: 'medium' }
        ]
    },
    {
        id: 'landslide',
        name: 'Landslide-Prone Mountains',
        icon: '⛰️',
        color: '#78716c',
        description: 'The Himalayan region and the Western Ghats are highly susceptible to landslides, especially during heavy monsoon rains.',
        resources: [
            'Avoid travel in hilly areas during heavy rain',
            'Listen for unusual sounds like cracking trees',
            'Move perpendicular to the path of the landslide'
        ],
        coordinates: [
            { lat: 30.0668, lng: 79.0193, name: 'Uttarakhand', severity: 'high' },
            { lat: 10.8505, lng: 76.2711, name: 'Kerala (Western Ghats)', severity: 'high' },
            { lat: 11.1271, lng: 78.6569, name: 'Tamil Nadu (Nilgiris)', severity: 'medium' }
        ]
    },
    {
        id: 'drought',
        name: 'Drought-Prone Regions',
        icon: '🏜️',
        color: '#d97706',
        description: 'Parts of Rajasthan, Gujarat, Maharashtra, and Karnataka face chronic water scarcity and recurring drought conditions.',
        resources: [
            'Practice rainwater harvesting',
            'Use drought-resistant crop varieties',
            'Conserve water in daily activities'
        ],
        coordinates: [
            { lat: 27.0238, lng: 74.2179, name: 'Rajasthan', severity: 'high' },
            { lat: 19.7515, lng: 75.7139, name: 'Marathwada, Maharashtra', severity: 'high' },
            { lat: 15.3173, lng: 75.7139, name: 'North Karnataka', severity: 'medium' }
        ]
    },
    {
        id: 'heatwave',
        name: 'Heatwave-Prone Regions',
        icon: '🔥',
        color: '#f97316',
        description: 'North and Central India, including Rajasthan, Delhi, Haryana, and parts of Andhra Pradesh, experience severe heatwaves during pre-monsoon months.',
        resources: [
            'Stay hydrated and avoid outdoor activities during peak hours',
            'Wear lightweight, light-colored clothing',
            'Check on elderly and vulnerable neighbors'
        ],
        coordinates: [
            { lat: 28.7041, lng: 77.1025, name: 'Delhi NCR', severity: 'high' },
            { lat: 26.9124, lng: 75.7873, name: 'Rajasthan', severity: 'high' },
            { lat: 16.5062, lng: 80.6480, name: 'Andhra Pradesh', severity: 'high' }
        ]
    },
    {
        id: 'wildfire',
        name: 'Wildfire-Prone Areas',
        icon: '🌲',
        color: '#dc2626',
        description: 'Forest fires are common in the Himalayan states, Central India, and the Northeast during the dry season (March to June).',
        resources: [
            'Do not discard lit cigarettes in forest areas',
            'Report smoke or fire immediately to forest authorities',
            'Evacuate if fire approaches your area'
        ],
        coordinates: [
            { lat: 28.2380, lng: 77.6380, name: 'Uttarakhand Forests', severity: 'high' },
            { lat: 21.7679, lng: 78.8718, name: 'Madhya Pradesh', severity: 'medium' },
            { lat: 25.4670, lng: 91.3662, name: 'Meghalaya', severity: 'medium' }
        ]
    },
    {
        id: 'avalanche',
        name: 'Avalanche-Prone Himalayan Areas',
        icon: '🏔️',
        color: '#e2e8f0',
        description: 'High-altitude regions in Jammu & Kashmir, Himachal Pradesh, and Uttarakhand are prone to avalanches, especially in winter and spring.',
        resources: [
            'Check avalanche forecasts before trekking',
            'Carry avalanche safety gear (beacon, probe, shovel)',
            'Travel with experienced local guides'
        ],
        coordinates: [
            { lat: 34.1526, lng: 77.5770, name: 'Ladakh', severity: 'high' },
            { lat: 32.2432, lng: 77.1734, name: 'Himachal Pradesh', severity: 'high' },
            { lat: 30.3165, lng: 78.0322, name: 'Uttarakhand', severity: 'medium' }
        ]
    },
    {
        id: 'tsunami',
        name: 'Tsunami-Risk Coastline',
        icon: '🌊',
        color: '#0ea5e9',
        description: 'The entire Indian coastline is theoretically at risk, with the East Coast and Andaman & Nicobar Islands having experienced significant historical events.',
        resources: [
            'Move to higher ground immediately if a tsunami warning is issued',
            'Do not go to the coast to watch the waves',
            'Follow INCOIS alerts'
        ],
        coordinates: [
            { lat: 11.7401, lng: 92.6586, name: 'Andaman & Nicobar', severity: 'high' },
            { lat: 13.0827, lng: 80.2707, name: 'Tamil Nadu Coast', severity: 'medium' },
            { lat: 15.2993, lng: 74.1240, name: 'Goa Coast', severity: 'low' }
        ]
    },
    {
        id: 'lightning',
        name: 'Lightning-Prone Regions',
        icon: '⚡',
        color: '#fbbf24',
        description: 'Bihar, Jharkhand, Odisha, and West Bengal record the highest number of lightning strikes in India, particularly during pre-monsoon and monsoon seasons.',
        resources: [
            'Stay indoors during thunderstorms',
            'Avoid open fields, tall trees, and water bodies',
            'Unplug electrical appliances'
        ],
        coordinates: [
            { lat: 25.0961, lng: 85.3131, name: 'Bihar', severity: 'high' },
            { lat: 23.6102, lng: 85.2799, name: 'Jharkhand', severity: 'high' },
            { lat: 20.9517, lng: 85.0985, name: 'Odisha', severity: 'high' }
        ]
    }
];

// Export for use in other modules (using global window object for vanilla JS)
window.HAZARD_CATEGORIES = HAZARD_CATEGORIES;

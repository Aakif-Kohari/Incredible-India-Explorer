// Desertification Data
const desertificationData = {
    regions: [
        {
            id: 'rajasthan',
            name: 'Rajasthan',
            severity: 'severe',
            percentage: 57.2,
            area: '196,000 km²',
            description: 'Rajasthan has the highest percentage of degraded land in India, with the Thar Desert expanding eastward at 1 km/year. Over 60% of the state faces desertification.',
            causes: ['Thar Desert expansion', 'Overgrazing', 'Groundwater depletion', 'Deforestation'],
            impacts: ['Loss of agricultural land', 'Water scarcity', 'Migration', 'Dust storms'],
            mapPosition: { x: 30, y: 45 },
            region: 'west'
        },
        {
            id: 'gujarat',
            name: 'Gujarat',
            severity: 'severe',
            percentage: 52.3,
            area: '101,000 km²',
            description: 'Gujarat faces severe desertification in Kutch and Saurashtra regions due to salinity ingress and arid conditions.',
            causes: ['Soil salinization', 'Arid climate', 'Overgrazing', 'Sea water ingress'],
            impacts: ['Agricultural losses', 'Saline soils', 'Livelihood loss', 'Water stress'],
            mapPosition: { x: 25, y: 50 },
            region: 'west'
        },
        {
            id: 'maharashtra',
            name: 'Maharashtra',
            severity: 'moderate',
            percentage: 28.5,
            area: '88,000 km²',
            description: 'Vidarbha and Marathwada regions face moderate to severe degradation due to drought and unsustainable agriculture.',
            causes: ['Drought', 'Over-irrigation', 'Deforestation', 'Unsustainable farming'],
            impacts: ['Farmer distress', 'Water scarcity', 'Crop failures', 'Migration'],
            mapPosition: { x: 40, y: 60 },
            region: 'west'
        },
        {
            id: 'madhya-pradesh',
            name: 'Madhya Pradesh',
            severity: 'moderate',
            percentage: 26.8,
            area: '82,000 km²',
            description: 'Chambal ravines and Bundelkhand region face severe gully erosion and land degradation.',
            causes: ['Gully erosion', 'Deforestation', 'Overgrazing', 'Water erosion'],
            impacts: ['Ravine formation', 'Agricultural loss', 'Soil erosion', 'Livelihood impact'],
            mapPosition: { x: 50, y: 55 },
            region: 'central'
        },
        {
            id: 'karnataka',
            name: 'Karnataka',
            severity: 'moderate',
            percentage: 25.1,
            area: '48,000 km²',
            description: 'Northern Karnataka faces moderate degradation due to drought and unsustainable agriculture.',
            causes: ['Drought', 'Soil erosion', 'Deforestation', 'Overgrazing'],
            impacts: ['Agricultural losses', 'Water stress', 'Crop failures'],
            mapPosition: { x: 45, y: 70 },
            region: 'south'
        },
        {
            id: 'telangana',
            name: 'Telangana',
            severity: 'moderate',
            percentage: 23.4,
            area: '26,000 km²',
            description: 'Telangana faces moderate land degradation in semi-arid regions due to drought and water stress.',
            causes: ['Drought', 'Groundwater depletion', 'Deforestation', 'Overgrazing'],
            impacts: ['Water scarcity', 'Agricultural stress', 'Migration'],
            mapPosition: { x: 50, y: 65 },
            region: 'south'
        },
        {
            id: 'uttar-pradesh',
            name: 'Uttar Pradesh',
            severity: 'moderate',
            percentage: 21.7,
            area: '52,000 km²',
            description: 'Bundelkhand region faces severe drought and land degradation affecting millions.',
            causes: ['Chronic drought', 'Groundwater depletion', 'Deforestation', 'Unsustainable agriculture'],
            impacts: ['Farmer suicides', 'Mass migration', 'Water crisis', 'Poverty'],
            mapPosition: { x: 55, y: 50 },
            region: 'central'
        },
        {
            id: 'tamil-nadu',
            name: 'Tamil Nadu',
            severity: 'low',
            percentage: 18.2,
            area: '24,000 km²',
            description: 'Southern districts face moderate degradation due to groundwater depletion and drought.',
            causes: ['Groundwater depletion', 'Drought', 'Urbanization', 'Industrial pollution'],
            impacts: ['Water scarcity', 'Agricultural stress', 'Industrial pollution'],
            mapPosition: { x: 50, y: 75 },
            region: 'south'
        }
    ],
    statistics: {
        totalDegradedArea: '96.4M ha',
        percentageDegraded: 29.3,
        annualLosses: '₹82,000 Cr',
        drylandPercentage: 68,
        affectedPopulation: '600M+',
        restorationTarget: '26M ha by 2030'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = desertificationData;
}

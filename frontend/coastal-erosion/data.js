// Coastal Erosion Data
const erosionData = {
    regions: [
        {
            id: 'kerala-coast',
            name: 'Kerala Coast',
            state: 'Kerala',
            severity: 'severe',
            erosionRate: '5-8 meters/year',
            description: 'Kerala\'s 590 km coastline is experiencing severe erosion, particularly in districts like Alappuzha, Ernakulam, and Thiruvananthapuram. The state has lost over 150 hectares of land in the last decade.',
            causes: ['Rising sea levels', 'Destruction of mangroves', 'Sand mining', 'Climate change'],
            impacts: ['Loss of 150+ hectares', '200+ families displaced', 'Damage to tourism infrastructure'],
            mapPosition: { x: 28, y: 75 }
        },
        {
            id: 'tamil-nadu-coast',
            name: 'Tamil Nadu Coast',
            state: 'Tamil Nadu',
            severity: 'severe',
            erosionRate: '4-7 meters/year',
            description: 'The 1,076 km Tamil Nadu coastline faces severe erosion, especially in Chennai, Nagapattinam, and Kanyakumari districts. The 2004 tsunami exacerbated the problem.',
            causes: ['Tsunami impact', 'Coastal construction', 'Cyclones', 'Sea level rise'],
            impacts: ['Chennai beach retreat by 50m', 'Fishing villages threatened', 'Historical sites at risk'],
            mapPosition: { x: 45, y: 82 }
        },
        {
            id: 'west-bengal-coast',
            name: 'West Bengal Coast',
            state: 'West Bengal',
            severity: 'severe',
            erosionRate: '6-10 meters/year',
            description: 'The Sundarbans region faces some of India\'s worst erosion. Islands are disappearing, forcing mass migration. Ghoramara and Sagar islands are critically endangered.',
            causes: ['Sea level rise', 'Cyclone Amphan', 'Subsidence', 'Mangrove loss'],
            impacts: ['5 islands submerged', '50,000+ climate refugees', 'Loss of mangrove habitat'],
            mapPosition: { x: 65, y: 68 }
        },
        {
            id: 'odisha-coast',
            name: 'Odisha Coast',
            state: 'Odisha',
            severity: 'moderate',
            erosionRate: '3-5 meters/year',
            description: 'Odisha\'s 480 km coastline experiences moderate to severe erosion, particularly after cyclones. Puri and Ganjam districts are most affected.',
            causes: ['Frequent cyclones', 'Storm surges', 'Sand mining', 'Rising sea levels'],
            impacts: ['Puri beach erosion', 'Fishing community displacement', 'Tourism losses'],
            mapPosition: { x: 58, y: 62 }
        },
        {
            id: 'goa-coast',
            name: 'Goa Coast',
            state: 'Goa',
            severity: 'moderate',
            erosionRate: '2-4 meters/year',
            description: 'Goa\'s 105 km coastline faces moderate erosion, threatening its tourism-dependent economy. Popular beaches like Calangute and Baga are experiencing sand loss.',
            causes: ['Tourism development', 'Sand mining', 'Sea level rise', 'Coastal construction'],
            impacts: ['Beach narrowing', 'Tourism revenue loss', 'Infrastructure damage'],
            mapPosition: { x: 25, y: 65 }
        },
        {
            id: 'maharashtra-coast',
            name: 'Maharashtra Coast',
            state: 'Maharashtra',
            severity: 'moderate',
            erosionRate: '2-4 meters/year',
            description: 'The 720 km Konkan coast faces moderate erosion, particularly in Ratnagiri and Sindhudurg districts. Mumbai\'s beaches also experience seasonal erosion.',
            causes: ['Coastal urbanization', 'Sand extraction', 'Sea level rise', 'Monsoon intensity'],
            impacts: ['Mumbai beach erosion', 'Konkan village displacement', 'Infrastructure damage'],
            mapPosition: { x: 27, y: 58 }
        },
        {
            id: 'andhra-coast',
            name: 'Andhra Pradesh Coast',
            state: 'Andhra Pradesh',
            severity: 'moderate',
            erosionRate: '2-5 meters/year',
            description: 'Andhra Pradesh\'s 974 km coastline experiences moderate erosion, particularly in Visakhapatnam and Krishna districts after cyclones.',
            causes: ['Cyclones', 'Storm surges', 'Coastal aquaculture', 'Sea level rise'],
            impacts: ['Fishing village displacement', 'Aquaculture losses', 'Infrastructure damage'],
            mapPosition: { x: 50, y: 70 }
        },
        {
            id: 'gujarat-coast',
            name: 'Gujarat Coast',
            state: 'Gujarat',
            severity: 'moderate',
            erosionRate: '2-4 meters/year',
            description: 'Gujarat\'s 1,600 km coastline (longest in India) experiences varying erosion rates. Kutch and Saurashtra regions are most affected.',
            causes: ['Industrial development', 'Port expansion', 'Sea level rise', 'Coastal erosion'],
            impacts: ['Fishing community impact', 'Port infrastructure challenges', 'Coastal habitat loss'],
            mapPosition: { x: 20, y: 50 }
        },
        {
            id: 'karnataka-coast',
            name: 'Karnataka Coast',
            state: 'Karnataka',
            severity: 'moderate',
            erosionRate: '2-3 meters/year',
            description: 'Karnataka\'s 320 km coastline experiences moderate erosion, particularly in Udupi and Dakshina Kannada districts.',
            causes: ['Coastal development', 'Sand mining', 'Monsoon intensity', 'Sea level rise'],
            impacts: ['Beach tourism impact', 'Fishing community displacement', 'Coastal habitat loss'],
            mapPosition: { x: 28, y: 70 }
        }
    ],
    caseStudies: [
        {
            title: 'Sundarbans: The Disappearing Islands',
            location: 'West Bengal',
            summary: 'The Sundarbans delta is losing 8 square kilometers annually. Five islands have completely submerged since 2000, displacing over 50,000 people.',
            details: 'Ghoramara island has shrunk from 38 sq km to 5 sq km in two decades. Rising sea levels, frequent cyclones, and land subsidence have created climate refugees. The government has initiated mangrove restoration and coastal embankment projects.',
            year: '2000-2024'
        },
        {
            title: 'Chennai\'s Shrinking Beaches',
            location: 'Tamil Nadu',
            summary: 'Marina Beach, India\'s longest urban beach, has retreated by 50 meters in 15 years. The 2004 tsunami and subsequent development have accelerated erosion.',
            details: 'Chennai\'s coastline has lost significant beach area due to port development, coastal construction, and the 2004 tsunami. The government has implemented beach nourishment projects and coastal regulation zones.',
            year: '2004-2024'
        },
        {
            title: 'Kerala\'s Coastal Crisis',
            location: 'Kerala',
            summary: 'Alappuzha district has lost 40 hectares of land in 10 years. Traditional fishing communities face existential threats from advancing seas.',
            details: 'Kerala\'s backwater regions and coastal areas face severe erosion due to rising sea levels, destruction of mangroves, and sand mining. The state government has initiated coastal protection walls and mangrove restoration programs.',
            year: '2014-2024'
        },
        {
            title: 'Puri Beach: Tourism Under Threat',
            location: 'Odisha',
            summary: 'Puri\'s famous beach, a major pilgrimage and tourist destination, has narrowed by 30 meters in 20 years, threatening the local economy.',
            details: 'Cyclones Fani (2019) and Amphan (2020) caused severe damage to Puri beach. The government has implemented beach nourishment and coastal protection measures to preserve this important cultural and economic asset.',
            year: '2004-2024'
        }
    ],
    statistics: {
        totalCoastline: 7517,
        erosionPercentage: 34,
        erosionLength: 2560,
        seaLevelRise: 3.3,
        affectedVillages: 250,
        economicLoss: 10000
    }
};

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = erosionData;
}

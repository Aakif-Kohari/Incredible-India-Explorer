// Glacial Hazards Data
const glacialData = {
    features: [
        {
            id: 'chorabari-lake',
            name: 'Chorabari Tal (Gandhi Sarovar)',
            type: 'critical',
            state: 'Uttarakhand',
            elevation: '3,900 m',
            description: 'Glacial lake near Kedarnath that caused the devastating 2013 GLOF disaster. The moraine dam failed after extreme rainfall, releasing 25 million m³ of water and debris.',
            hazards: ['GLOF risk', 'Moraine instability', 'Climate change vulnerability'],
            history: '2013 disaster killed 5,700+ people, destroyed Kedarnath town',
            mapPosition: { x: 55, y: 45 },
            region: 'uttarakhand'
        },
        {
            id: 'south-lhonak',
            name: 'South Lhonak Lake',
            type: 'critical',
            state: 'Sikkim',
            elevation: '5,100 m',
            description: 'One of the fastest-growing glacial lakes in Sikkim. Caused the October 2023 GLOF that destroyed Teesta-III dam and killed 40+ people.',
            hazards: ['Rapid expansion', 'GLOF risk', 'Infrastructure threat'],
            history: 'October 2023 GLOF destroyed Teesta-III hydropower dam',
            mapPosition: { x: 65, y: 55 },
            region: 'sikkim'
        },
        {
            id: 'satopanth-glacier',
            name: 'Satopanth Glacier',
            type: 'retreating',
            state: 'Uttarakhand',
            elevation: '4,600 m',
            description: 'Major glacier in Alaknanda basin retreating at 15-20 m/year. Source of Alaknanda River, critical for downstream water supply.',
            hazards: ['Rapid retreat', 'Lake formation', 'Water resource impact'],
            history: 'Retreated 2 km in last century',
            mapPosition: { x: 58, y: 42 },
            region: 'uttarakhand'
        },
        {
            id: 'gangotri-glacier',
            name: 'Gangotri Glacier',
            type: 'retreating',
            state: 'Uttarakhand',
            elevation: '4,255 m',
            description: 'Largest glacier in Himalayas (30 km long), source of Ganges. Retreating at 22 m/year, threatening water security for millions.',
            hazards: ['Major retreat', 'Ganges water supply', 'GLOF potential'],
            history: 'Retreated 1.5 km in last 200 years',
            mapPosition: { x: 52, y: 40 },
            region: 'uttarakhand'
        },
        {
            id: 'siachen-glacier',
            name: 'Siachen Glacier',
            type: 'retreating',
            state: 'Ladakh',
            elevation: '5,753 m',
            description: 'World\'s highest battlefield at 76 km long. Retreating rapidly due to climate change and military activities.',
            hazards: ['Rapid retreat', 'Military impact', 'Transboundary issues'],
            history: 'Lost 1.2 km in length since 1980',
            mapPosition: { x: 40, y: 30 },
            region: 'himachal'
        },
        {
            id: 'bara-shigri',
            name: 'Bara Shigri Glacier',
            type: 'retreating',
            state: 'Himachal Pradesh',
            elevation: '4,500 m',
            description: 'Largest glacier in Himachal Pradesh (25 km). Retreating at 15 m/year, critical for Chenab river basin.',
            hazards: ['Retreat', 'Water supply', 'Hydropower impact'],
            history: 'Retreated 1.3 km since 1960',
            mapPosition: { x: 45, y: 38 },
            region: 'himachal'
        },
        {
            id: 'imja-lake',
            name: 'Imja Tsho',
            type: 'critical',
            state: 'Nepal Border',
            elevation: '5,010 m',
            description: 'Fast-growing glacial lake near Everest region. Mitigation efforts include controlled drainage to reduce GLOF risk.',
            hazards: ['Rapid growth', 'GLOF risk', 'Downstream communities'],
            history: 'Grew from 0 to 2.5 km² in 50 years',
            mapPosition: { x: 70, y: 48 },
            region: 'sikkim'
        },
        {
            id: 'rishi-ganga-site',
            name: 'Chamoli Disaster Site (2021)',
            type: 'disaster',
            state: 'Uttarakhand',
            elevation: '5,600 m',
            description: 'Site of February 2021 ice-rock avalanche that destroyed Rishiganga and Tapovan hydropower projects. 200+ casualties.',
            hazards: ['Ice avalanche', 'Debris flow', 'Infrastructure damage'],
            history: 'February 7, 2021 disaster from Ronti peak',
            mapPosition: { x: 57, y: 44 },
            region: 'uttarakhand'
        }
    ],
    hazards: {
        glof: {
            name: 'Glacial Lake Outburst Flood (GLOF)',
            severity: 'Extreme',
            description: 'Catastrophic release of water when unstable moraine dams fail',
            characteristics: [
                'Discharge: 10,000-30,000 m³/s',
                'Speed: Up to 100 km/h',
                'Reach: 100+ km downstream',
                'Debris: Water, rock, ice mixture'
            ]
        },
        iceAvalanche: {
            name: 'Ice Avalanche',
            severity: 'High',
            description: 'Massive ice masses breaking from glaciers',
            characteristics: [
                'Volume: Millions of m³',
                'Speed: 150+ km/h',
                'Trigger: Warming, earthquakes',
                'Mixed with rock debris'
            ]
        },
        glacierSurge: {
            name: 'Glacier Surge',
            severity: 'Moderate',
            description: 'Rapid glacier advance (100x normal speed)',
            characteristics: [
                'Speed: 10-100 m/day',
                'Duration: Months to years',
                'Threatens infrastructure',
                'Basal water pressure cause'
            ]
        }
    },
    statistics: {
        totalGlaciers: 9575,
        totalLakes: 12000,
        criticalLakes: 200,
        avgRetreatRate: '15-20 m/year'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = glacialData;
}

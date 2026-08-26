/**
 * heatwave-data.js
 * Heatwave Hazards Across Northern India Dataset — Climatic Risk & Preparedness
 */

const HEATWAVE_STATS = {
    affectedPopulation: "400 Million+",
    peakTemperatures: "45°C – 49°C",
    seasonMonths: "April – June",
    primaryWind: "Dry Westerly (Loo)"
};

const HEATWAVE_REGIONS = [
    {
        id: "rajasthan",
        name: "Thar Desert & Rajasthan Plain",
        lat: 26.2724,
        lng: 73.0243,
        risk: "Extreme Risk",
        temp: "47°C – 49°C",
        description: "Dry sandy terrain, low humidity, and high solar radiation generate intense convective heating. Prompts severe dust storms and direct thermal hazards."
    },
    {
        id: "delhi",
        name: "Delhi NCR (Urban Hotspot)",
        lat: 28.6139,
        lng: 77.2090,
        risk: "Extreme Risk (Urban Heat Island)",
        temp: "45°C – 47°C",
        description: "High density of concrete, asphalt, and air-conditioning exhaust traps heat during the day. Prevents nocturnal cooling, leading to severe night-time heat strain."
    },
    {
        id: "punjab-haryana",
        name: "Punjab & Haryana plains",
        lat: 30.7333,
        lng: 76.7794,
        risk: "High Risk (Agricultural Belt)",
        temp: "44°C – 46°C",
        description: "Northern India's agricultural grain bowl. Pre-monsoon dry heatwaves deplete soil moisture, stress summer crops, and dry up irrigation canals."
    },
    {
        id: "uttar-pradesh",
        name: "Indo-Gangetic Plain (Uttar Pradesh)",
        lat: 26.8467,
        lng: 80.9462,
        risk: "Extreme Risk (Wet-Bulb Danger)",
        temp: "44°C – 47°C",
        description: "Densely populated plain. Rising moisture from rivers combined with high temperatures triggers dangerous wet-bulb indices, severely limiting sweat evaporation."
    },
    {
        id: "madhya-pradesh",
        name: "Central Highlands (Madhya Pradesh)",
        lat: 23.2599,
        lng: 77.4126,
        risk: "High Risk (Dry Heat)",
        temp: "43°C – 45°C",
        description: "Rocky and barren plateaus absorb heat rapidly. Strong vertical hot-air plumes (dry convection) lead to prolonged heatwaves across central plains."
    }
];

const HEATWAVE_CHAPTERS = [
    {
        id: "climatic-causes",
        title: "Why Northern India Experiences Extreme Heat",
        eyebrow: "Climatological Drivers",
        summary: "A combination of geographical setting, dry winds, and delayed monsoon onset triggers the extreme heatwave conditions.",
        details: [
            "Thar Desert Influence: Solar heating of the arid Thar Desert creates a vast low-pressure zone that pulls dry, hot air masses across the northern plains.",
            "The 'Loo' Wind: Strong, dusty, westerly winds sweep across Pakistan and Northwest India, raising temperatures rapidly within hours during afternoons.",
            "Delayed Pre-Monsoon Showers: Lack of moisture and pre-monsoon precipitation allows solar radiation to heat the dry soil directly, raising surface temperatures."
        ]
    },
    {
        id: "urban-heat-island",
        title: "The Urban Heat-Island (UHI) Effect",
        eyebrow: "Urbanization Hazards",
        summary: "Modern cities act as heat traps, rendering urban populations highly vulnerable to heat stress.",
        details: [
            "Thermal Mass Trap: Concrete, brick, and asphalt absorb solar radiation during the day and release it slowly at night, keeping nocturnal temperatures high.",
            "Anthropogenic Emissions: Air-conditioning exhaust, vehicle engines, and industrial emissions inject high amounts of direct heat into the city air canopy.",
            "Lack of Green Cover: Rapid urban expansion replaces evapotranspiration-cooling trees and wetlands with dry reflective roofs and pavements."
        ]
    },
    {
        id: "agriculture-impact",
        title: "Agricultural Strains & Crop Dessication",
        eyebrow: "Socio-Economic Threat",
        summary: "Agriculture in Northern India is highly susceptible to spring and summer thermal anomalies.",
        details: [
            "Wheat Terminal Heat Stress: Early heatwaves in March and April accelerate crop maturity, shriveling wheat grains and reducing agricultural yields.",
            "Soil Moisture Depletion: High evapotranspiration drys out topsoil, requiring excessive ground water pumping and stressing local aquifers.",
            "Livestock Stress: High temperatures lower milk yields in cattle, cause dehydration, and increase mortality rates in poultry farms."
        ]
    },
    {
        id: "water-resources",
        title: "Water Resource & Ground Water Depletion",
        eyebrow: "Ecological Strain",
        summary: "Intense heatwaves accelerate municipal and rural water resource depletion.",
        details: [
            "Reservoir Drying: Rapid evaporation reduces water levels in reservoirs, irrigation canals, and community ponds (johads).",
            "Aquifer Stress: Increased crop and municipal pumping lowers groundwater levels, causing wells to dry up across Rajasthan and Haryana.",
            "Drinking Water Scarcity: Prolonged summer droughts lead to acute drinking water shortages, forcing heavy reliance on emergency water tankers."
        ]
    }
];

const HEATWAVE_WARNING_LEVELS = [
    {
        color: "Green",
        label: "Normal",
        threshold: "Temperatures below 40°C on plains",
        action: "No warning. Standard hydration and sun protection."
    },
    {
        color: "Yellow",
        label: "Heat Alert",
        threshold: "Temperatures between 40°C and 43°C",
        action: "Be Updated. Stay hydrated; avoid direct sun during peak hours if possible."
    },
    {
        color: "Orange",
        label: "Severe Heat Alert",
        threshold: "Temperatures between 43°C and 45°C, or persisting for 2+ days",
        action: "Be Prepared. High risk for vulnerable groups (children, elderly). Keep indoors, drink ORS, limit heavy manual work."
    },
    {
        color: "Red",
        label: "Extreme Heat Emergency",
        threshold: "Temperatures exceeding 45°C, or severe heatwave persisting for 4+ days",
        action: "Take Action. High risk of heatstroke. Direct health threat. Strictly avoid outdoor exposure from 12:00 PM to 4:00 PM."
    }
];

const HEATWAVE_PREPAREDNESS = [
    {
        title: "Hydration and Nutrition",
        icon: "🥤",
        steps: [
            "Drink water frequently, even if not feeling thirsty. Keep water bottles during transit.",
            "Consume homemade drinks like Lassi, Torani (rice water), Lemon water, buttermilk, and coconut water.",
            "Avoid high-protein, salty, spicy, and stale foods that can increase metabolic heat."
        ]
    },
    {
        title: "Exposure & Clothing Safety",
        icon: "👒",
        steps: [
            "Limit direct sunlight exposure during peak hours (12:00 PM to 4:00 PM).",
            "Wear lightweight, loose-fitting, light-colored cotton garments to reflect heat.",
            "Use umbrellas, wide-brimmed hats, sunglasses, and damp cloths to cover head and neck when outdoors."
        ]
    },
    {
        title: "Home and Building Cooling",
        icon: "🏠",
        steps: [
            "Apply reflective white cool-roof paints on flat concrete terrace slabs to lower indoor heat.",
            "Use dark curtains, bamboo blinds, or reflective films on windows facing the sun.",
            "Maintain indoor plants and keep wet cloths near open windows to enhance evaporative cooling."
        ]
    },
    {
        title: "Community and First Aid Action",
        icon: "🚨",
        steps: [
            "Establish shaded resting points and public drinking water stands (Pyas) in market blocks.",
            "Know heatstroke symptoms: dry red skin, high body temp, headache, confusion, nausea.",
            "In case of heatstroke, move the patient to a cool shade, apply damp cold sponges, and call emergency services."
        ]
    }
];

const HEATWAVE_SOURCES = [
    {
        citation: "India Meteorological Department (IMD). National Heat Wave Advisory and Alert Matrix. Ministry of Earth Sciences, Govt of India.",
        notes: "Defines scientific heatwave criteria based on deviation from normal temperatures and color-coded advisory thresholds."
    },
    {
        citation: "National Disaster Management Authority (NDMA). National Guidelines for Preparation of Action Plan - Prevention and Management of Heat Wave. Govt of India, 2019.",
        notes: "Outlines inter-agency coordination, early-warning dissemination, public medical preparedness, and local heat action plan templates."
    },
    {
        citation: "Lancet Planetary Health. Temperature-attributable mortality risks and socio-economic vulnerability profiles in urban India. Lancet, 2021.",
        notes: "Provides epidemiological study on heat stress mortality, urban microclimates, and regional vulnerability indices."
    },
    {
        citation: "World Health Organization (WHO) & WMO. Heatwaves and Health: Guidance on Warning-System Development. WMO-No. 1142, 2015.",
        notes: "Scientific guide on the health impacts of extreme heatwaves and development of early-warning heat-health indicators."
    }
];

/**
 * Natural Disasters & Hazards of India Explorer — Dataset
 * Defines DISASTER_DATA used by disasters.js
 *
 * Issue #3535: Natural Disasters & Hazards of India Explorer
 */

const DISASTER_DATA = {

  meta: {
    title: 'Natural Disasters & Hazards of India',
    subtitle: 'An interactive exploration of India\'s natural hazard landscape',
    totalHazardTypes: 11,
    totalStates: 36,
    totalHistoricalEvents: 15,
    seismicZones: 6,
    description: 'India, the seventh-largest country by area, is vulnerable to a wide range of natural hazards due to its diverse geography — from the Himalayan mountain belt to the vast coastal stretches, arid Thar Desert, and fertile river plains.'
  },

  hazardTypes: [
    {
      id: 'floods', name: 'Floods', icon: '\uD83C\uDF0A', color: '#3b82f6', colorLight: '#93c5fd',
      colorBg: 'rgba(59, 130, 246, 0.12)',
      description: 'Flooding is the most frequent and widespread natural disaster in India, caused by heavy monsoon rainfall, river overflow, dam breaches, and urban waterlogging.',
      causes: ['Intense monsoon rainfall', 'River systems overflowing (Ganga, Brahmaputra)', 'Dam and levee failures', 'Urban drainage inadequacy', 'Glacial lake outbursts (GLOFs)'],
      highRiskStates: ['Bihar', 'Assam', 'West Bengal', 'Uttar Pradesh', 'Kerala', 'Maharashtra', 'Odisha'],
      annualAvg: '~25 million people affected annually',
      economicImpact: 'Accounts for ~50% of disaster-related economic losses in India',
      riskLevel: 'Very High', link: '../brahmaputra-flood-hazards/index.html',
      profile: {
        overview: 'Floods are India\'s most frequent natural disaster, affecting millions every year during the monsoon season (June\u2013September). The Brahmaputra and Ganga river basins are the most flood-prone regions.',
        keyStats: { frequency: 'Annual', affected: '~25M people/year', fatalities: '~1,600/year (avg)', peakMonths: 'July\u2013September' },
        caseStudy: 'The 2020 floods in Bihar affected over 10 million people across 16 districts, submerging large parts of North Bihar.',
        mitigation: ['Flood forecasting systems (CWC)', 'Embankment and levee construction', 'Floodplain zoning regulations', 'Watershed management', 'Urban drainage improvement']
      }
    },
    {
      id: 'cyclones', name: 'Cyclones', icon: '\uD83C\uDF2A\uFE0F', color: '#8b5cf6', colorLight: '#c4b5fd',
      colorBg: 'rgba(139, 92, 246, 0.12)',
      description: 'Tropical cyclones form over the Bay of Bengal and Arabian Sea, bringing devastating winds, storm surges, and heavy rainfall to India\'s coasts.',
      causes: ['Warm sea surface temperatures (>26.5\u00B0C)', 'Low vertical wind shear', 'Pre-existing weather disturbances', 'Coriolis effect', 'High moisture availability'],
      highRiskStates: ['Odisha', 'Andhra Pradesh', 'West Bengal', 'Tamil Nadu', 'Gujarat'],
      annualAvg: '~4\u20136 severe cyclones per year',
      economicImpact: 'Cyclone Fani (2019) alone caused $8.1 billion in damages',
      riskLevel: 'High', link: '../cyclone-amphan-2020/index.html',
      profile: {
        overview: 'India\'s 7,517 km coastline is highly vulnerable to tropical cyclones, particularly the Bay of Bengal coast which receives about 5 times more cyclones than the Arabian Sea coast.',
        keyStats: { frequency: '4\u20136 severe/year', affected: '~20M people/year', fatalities: '~400/year (avg)', peakMonths: 'May\u2013June, October\u2013December' },
        caseStudy: 'Cyclone Amphan (2020), the strongest cyclone in the Bay of Bengal, made landfall in West Bengal with winds of 240 km/h, causing $13 billion in damages.',
        mitigation: ['IMD cyclone early warning system', 'Cyclone shelters along coastlines', 'Evacuation planning and drills', 'Mangrove restoration as natural barriers', 'Strict building codes in coastal zones']
      }
    },
    {
      id: 'earthquakes', name: 'Earthquakes', icon: '\uD83C\uDF0F', color: '#ef4444', colorLight: '#fca5a5',
      colorBg: 'rgba(239, 68, 68, 0.12)',
      description: 'India lies on the Indian tectonic plate, making it seismically active. Earthquakes are caused by plate convergence along the Himalayan belt and faults across the subcontinent.',
      causes: ['Indian plate subduction beneath the Eurasian plate', 'Himalayan frontal thrust system', 'Old fault reactivation', 'Reservoir-induced seismicity'],
      highRiskStates: ['Jammu and Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Assam', 'Sikkim', 'Delhi', 'Gujarat'],
      annualAvg: 'Multiple moderate events; occasional devastating ones',
      economicImpact: 'The 2001 Gujarat earthquake caused $5.3 billion in damages',
      riskLevel: 'Very High', link: '../bhuj-earthquake-2001-explorer/index.html',
      profile: {
        overview: 'About 59% of India\'s landmass is prone to moderate to severe earthquakes. The Himalayan region and the Indus-Tsangpo suture zone are the most seismically active.',
        keyStats: { frequency: '30\u201340 felt/year', affected: 'Varies greatly', fatalities: '500+/decade (avg)', peakMonths: 'Year-round' },
        caseStudy: 'The 2001 Gujarat earthquake (magnitude 7.7) devastated Bhuj, killing over 13,800 people and destroying 340,000 buildings.',
        mitigation: ['NBC-compliant earthquake-resistant construction', 'Seismic microzonation of cities', 'Earthquake early warning systems', 'Community preparedness drills', 'Retrofitting of critical infrastructure']
      }
    },
    {
      id: 'landslides', name: 'Landslides', icon: '\u26F0\uFE0F', color: '#f97316', colorLight: '#fdba74',
      colorBg: 'rgba(249, 115, 22, 0.12)',
      description: 'Landslides occur frequently in mountainous terrain, triggered by heavy rainfall, earthquakes, deforestation, and steep terrain instability.',
      causes: ['Intense and prolonged rainfall', 'Steep terrain with weak geological formations', 'Deforestation and land-use changes', 'Earthquake-induced ground shaking', 'Unregulated construction on slopes'],
      highRiskStates: ['Uttarakhand', 'Himachal Pradesh', 'Jammu and Kashmir', 'Kerala', 'Karnataka', 'Sikkim'],
      annualAvg: '~500 landslide incidents per year',
      economicImpact: 'Annual losses estimated at $1\u20132 billion',
      riskLevel: 'High', link: '../landslide-hazards-himalayas/index.html',
      profile: {
        overview: 'Landslides are a recurrent hazard in India\'s hill states. The Western Ghats, Eastern Himalayas, and northeast India are particularly vulnerable.',
        keyStats: { frequency: '~500/year', affected: '~5,000 casualties/decade', fatalities: '~500/year (avg)', peakMonths: 'June\u2013October (monsoon)' },
        caseStudy: 'The 2023 Himachal Pradesh monsoon landslides killed over 400 people and caused damages exceeding \u20B98,000 crore.',
        mitigation: ['Slope stabilization engineering', 'Land-use planning in hilly areas', 'Early warning for rainfall-induced slides', 'Restricting construction on unstable slopes', 'Reforestation and bio-engineering measures']
      }
    },
    {
      id: 'forest-fires', name: 'Forest Fires', icon: '\uD83D\uDD25', color: '#dc2626', colorLight: '#f87171',
      colorBg: 'rgba(220, 38, 38, 0.12)',
      description: 'Forest fires in India are predominantly man-made, occurring during the dry season, destroying vast tracts of forest and biodiversity.',
      causes: ['Human activities (clearing, grazing, arson)', 'Dry season heat and low humidity', 'Accumulation of dry leaf litter', 'Climate change extending fire seasons'],
      highRiskStates: ['Uttarakhand', 'Himachal Pradesh', 'Madhya Pradesh', 'Chhattisgarh', 'Odisha'],
      annualAvg: '~35,000 forest fire incidents per year',
      economicImpact: 'Forest Survey of India estimates \u20B91,000+ crore annual loss',
      riskLevel: 'Moderate to High', link: '../himachal-forest-fire-hazards/index.html',
      profile: {
        overview: 'India has about 24% forest cover. Nearly 35.46% of this forest cover is fire-prone. Sal forests of central India and pine forests of Uttarakhand are particularly vulnerable.',
        keyStats: { frequency: '~35,000/year', affected: '~1.5M hectares/year', fatalities: '~200/year (avg)', peakMonths: 'February\u2013June' },
        caseStudy: 'The 2024 Uttarakhand forest fires burned over 5,000 hectares in a single month, causing severe air quality issues.',
        mitigation: ['Forest fire alert system (NASA FIRMS + FSI)', 'Fire lines and fire breaks', 'Community fire watch programs', 'Controlled burning practices', 'Satellite-based real-time monitoring']
      }
    },
    {
      id: 'droughts', name: 'Droughts', icon: '\uD83C\uDF3E', color: '#d97706', colorLight: '#fcd34d',
      colorBg: 'rgba(217, 119, 6, 0.12)',
      description: 'Droughts result from deficient monsoon rainfall, affecting agriculture, water supply, and livelihoods across rain-fed regions of India.',
      causes: ['Deficient or delayed monsoon rainfall', 'El Ni\u00F1o and positive Indian Ocean Dipole', 'Depleted groundwater reserves', 'Inadequate water storage infrastructure'],
      highRiskStates: ['Rajasthan', 'Gujarat', 'Maharashtra', 'Karnataka', 'Telangana', 'Madhya Pradesh'],
      annualAvg: '~68% of India is drought-prone at various intensities',
      economicImpact: 'Droughts cost India ~$3.5 billion annually in agricultural losses',
      riskLevel: 'High', link: '../rajasthan-drought-hazards/index.html',
      profile: {
        overview: 'About 68% of India\'s net sown area is rain-fed. Droughts in 2002, 2004, 2009, and 2014\u201315 caused widespread distress across multiple states.',
        keyStats: { frequency: 'Every 2\u20133 years (regional)', affected: '~50M people/severe event', fatalities: 'Indirect (malnutrition, migration)', peakMonths: 'August\u2013September' },
        caseStudy: 'The 2015 drought in Maharashtra, Karnataka, and Telangana affected over 330 million people.',
        mitigation: ['Micro-irrigation and drip systems', 'Watershed development programs', 'Drought-resistant crop varieties', 'Water harvesting and conservation', 'MGNREGA for drought relief employment']
      }
    },
    {
      id: 'heatwaves', name: 'Heatwaves', icon: '\uD83C\uDF21\uFE0F', color: '#ea580c', colorLight: '#fb923c',
      colorBg: 'rgba(234, 88, 12, 0.12)',
      description: 'Extreme heat events, particularly in the Indo-Gangetic plain and central India, cause thousands of deaths annually.',
      causes: ['High solar insolation in summer months', 'Blocking high-pressure systems', 'Dry soil conditions', 'Urban heat island effect', 'Climate change intensifying heat extremes'],
      highRiskStates: ['Rajasthan', 'Andhra Pradesh', 'Telangana', 'Madhya Pradesh', 'Odisha', 'Bihar', 'Delhi'],
      annualAvg: '~2,000+ heat-related deaths per year',
      economicImpact: 'Lost labor productivity estimated at $10+ billion annually by 2030',
      riskLevel: 'High', link: '../heatwave-hazards-northern-india/index.html',
      profile: {
        overview: 'India experiences heatwaves primarily from March to July. The IMD declares a heatwave when maximum temperature is \u226545\u00B0C. The 2015 heatwave was the deadliest in a decade.',
        keyStats: { frequency: 'Annual (March\u2013July)', affected: '~1 billion+ exposed', fatalities: '~2,000+/year', peakMonths: 'May\u2013June' },
        caseStudy: 'The 2015 heatwave in Andhra Pradesh and Telangana killed over 2,500 people with temperatures reaching 47\u00B0C.',
        mitigation: ['Heat Action Plans (city-level)', 'Heat wave early warning advisories', 'Cool roofs and urban green spaces', 'Water and ORS distribution centers', 'Adjusted work hours for outdoor laborers']
      }
    },
    {
      id: 'lightning', name: 'Lightning', icon: '\u26A1', color: '#eab308', colorLight: '#fde047',
      colorBg: 'rgba(234, 179, 8, 0.12)',
      description: 'Lightning strikes kill more people in India than any other natural hazard. Over 2,000 deaths occur annually, mostly in eastern and central India.',
      causes: ['Convective thunderstorm activity', 'Monsoon season instability', 'Topographic lifting in hilly areas', 'Climate change increasing thunderstorm frequency'],
      highRiskStates: ['Madhya Pradesh', 'Odisha', 'Bihar', 'Jharkhand', 'West Bengal', 'Chhattisgarh'],
      annualAvg: '~2,500 lightning deaths per year',
      economicImpact: 'Significant loss of human life and livestock',
      riskLevel: 'Moderate to High', link: '../lightning-hazards-india/index.html',
      profile: {
        overview: 'Lightning is the single largest weather-related killer in India. India receives approximately 5\u20136 billion lightning flashes per year.',
        keyStats: { frequency: '~5\u20136 billion flashes/year', affected: '~2,500 deaths/year', fatalities: '2,500+/year', peakMonths: 'April\u2013August' },
        caseStudy: 'In 2020, lightning killed over 70 people in a single week across Uttar Pradesh, Bihar, and Jharkhand.',
        mitigation: ['Lightning detection network (Lightning India)', 'Lightning alert apps and SMS systems', 'Safe shelter awareness campaigns', 'Lightning arrestors on tall structures', 'Avoiding open fields during storms']
      }
    },
    {
      id: 'avalanches', name: 'Avalanches', icon: '\uD83E\uDDCA', color: '#06b6d4', colorLight: '#67e8f9',
      colorBg: 'rgba(6, 182, 212, 0.12)',
      description: 'Avalanches occur in high-altitude Himalayan regions during winter and spring, posing risks to military personnel and villagers.',
      causes: ['Heavy snowfall on steep slopes', 'Rapid temperature rise', 'Wind-loading on leeward slopes', 'Human activity', 'Earthquakes triggering snow release'],
      highRiskStates: ['Jammu and Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Sikkim', 'Arunachal Pradesh', 'Ladakh'],
      annualAvg: '~30+ avalanche incidents per year in monitored zones',
      economicImpact: 'Primarily affects human lives and military operations',
      riskLevel: 'Moderate', link: '../avalanche-hazards-himalayas/index.html',
      profile: {
        overview: 'India\'s Snow and Avalanche Study Establishment (SASE) monitors avalanche-prone areas. Most occur between December and April at elevations above 3,000 meters.',
        keyStats: { frequency: '~30+ incidents/year', affected: 'Military & local populations', fatalities: '~100+/year', peakMonths: 'December\u2013April' },
        caseStudy: 'In January 2023, an avalanche in Uttarakhand buried several BRO workers. Multiple avalanches hit Siachen in 2024.',
        mitigation: ['SASE avalanche forecasting', 'Controlled avalanche triggering', 'Avalanche-resistant shelters', 'GPS-tracked rescue teams', 'Public awareness in high-risk areas']
      }
    },
    {
      id: 'tsunamis', name: 'Tsunamis', icon: '\uD83C\uDF0A', color: '#0891b2', colorLight: '#22d3ee',
      colorBg: 'rgba(8, 145, 178, 0.12)',
      description: 'Tsunamis are rare but devastating for India\'s coastline. The 2004 Indian Ocean tsunami was one of the deadliest natural disasters in recorded history.',
      causes: ['Undersea earthquakes (submarine megathrust)', 'Submarine volcanic eruptions', 'Underwater landslides'],
      highRiskStates: ['Tamil Nadu', 'Andaman and Nicobar Islands', 'Kerala', 'Andhra Pradesh', 'Odisha', 'West Bengal'],
      annualAvg: 'Rare (1\u20132 significant events per century)',
      economicImpact: '2004 tsunami caused $12 billion in damages across India',
      riskLevel: 'Low frequency, very high impact', link: '../indian-ocean-tsunami-2004-explorer/index.html',
      profile: {
        overview: 'India\'s coastline is vulnerable to tsunamis from the Sumatra-Andaman subduction zone and Makran coast. The 2004 tsunami killed over 10,000 people in India.',
        keyStats: { frequency: 'Rare (1\u20132/century)', affected: '10,000+ (2004 event)', fatalities: '10,693 in India (2004)', peakMonths: 'Year-round (earthquake-dependent)' },
        caseStudy: 'The December 26, 2004 Indian Ocean Tsunami, triggered by a magnitude 9.1 earthquake off Sumatra, generated waves up to 15 meters.',
        mitigation: ['INCOIS tsunami early warning system', 'Tsunami-ready coastal communities', 'Vertical evacuation structures', 'Coastal zoning regulations', 'Regular tsunami mock drills']
      }
    },
    {
      id: 'volcanic', name: 'Volcanic Activity', icon: '\uD83C\uDF0B', color: '#a855f7', colorLight: '#d8b4fe',
      colorBg: 'rgba(168, 85, 247, 0.12)',
      description: 'India has active, dormant, and extinct volcanoes. Barren Island in the Andaman Islands is the only confirmed active volcano.',
      causes: ['Tectonic plate interactions', 'Hotspot volcanism (Barren Island)', 'Submarine volcanic vents'],
      highRiskStates: ['Andaman and Nicobar Islands'],
      annualAvg: 'Periodic eruptions at Barren Island (5+ year intervals)',
      economicImpact: 'Minimal current economic impact; primarily affects local fishing communities',
      riskLevel: 'Low (but monitored)', link: '../volcanoes-geology/volcanoes-geology.html',
      profile: {
        overview: 'India has Barren Island (active), Narcondam Island (dormant), and the Deccan Traps (extinct). Barren Island last erupted in 2017\u20132018.',
        keyStats: { frequency: 'Periodic (5+ year intervals)', affected: 'Local fishing communities', fatalities: 'None in recent history', peakMonths: 'Year-round monitoring' },
        caseStudy: 'Barren Island\'s 2017 eruption showed Strombolian activity with lava flows, captured by the Indian Coast Guard.',
        mitigation: ['GSI volcanic monitoring', 'Exclusion zones around Barren Island', 'Satellite-based thermal monitoring', 'Coastal community awareness', 'Research and data collection']
      }
    }
  ],

  states: [
    { id: 'andhra-pradesh', name: 'Andhra Pradesh', region: 'south', hazards: ['cyclones', 'floods', 'droughts', 'heatwaves', 'tsunamis'], capital: 'Amaravati' },
    { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', region: 'northeast', hazards: ['landslides', 'earthquakes', 'avalanches', 'floods'], capital: 'Itanagar' },
    { id: 'assam', name: 'Assam', region: 'northeast', hazards: ['floods', 'earthquakes', 'landslides'], capital: 'Dispur' },
    { id: 'bihar', name: 'Bihar', region: 'east', hazards: ['floods', 'earthquakes', 'heatwaves', 'lightning', 'droughts'], capital: 'Patna' },
    { id: 'chhattisgarh', name: 'Chhattisgarh', region: 'central', hazards: ['floods', 'forest-fires', 'lightning', 'droughts'], capital: 'Raipur' },
    { id: 'goa', name: 'Goa', region: 'west', hazards: ['floods', 'cyclones'], capital: 'Panaji' },
    { id: 'gujarat', name: 'Gujarat', region: 'west', hazards: ['earthquakes', 'cyclones', 'droughts', 'heatwaves', 'floods'], capital: 'Gandhinagar' },
    { id: 'haryana', name: 'Haryana', region: 'north', hazards: ['heatwaves', 'earthquakes', 'floods', 'droughts'], capital: 'Chandigarh' },
    { id: 'himachal-pradesh', name: 'Himachal Pradesh', region: 'north', hazards: ['landslides', 'earthquakes', 'avalanches', 'forest-fires'], capital: 'Shimla' },
    { id: 'jharkhand', name: 'Jharkhand', region: 'east', hazards: ['floods', 'lightning', 'forest-fires', 'droughts'], capital: 'Ranchi' },
    { id: 'karnataka', name: 'Karnataka', region: 'south', hazards: ['floods', 'droughts', 'landslides', 'cyclones'], capital: 'Bengaluru' },
    { id: 'kerala', name: 'Kerala', region: 'south', hazards: ['floods', 'landslides', 'cyclones', 'tsunamis'], capital: 'Thiruvananthapuram' },
    { id: 'madhya-pradesh', name: 'Madhya Pradesh', region: 'central', hazards: ['heatwaves', 'floods', 'lightning', 'forest-fires', 'droughts'], capital: 'Bhopal' },
    { id: 'maharashtra', name: 'Maharashtra', region: 'west', hazards: ['floods', 'landslides', 'droughts', 'cyclones', 'earthquakes'], capital: 'Mumbai' },
    { id: 'manipur', name: 'Manipur', region: 'northeast', hazards: ['earthquakes', 'landslides', 'floods'], capital: 'Imphal' },
    { id: 'meghalaya', name: 'Meghalaya', region: 'northeast', hazards: ['floods', 'landslides', 'earthquakes'], capital: 'Shillong' },
    { id: 'mizoram', name: 'Mizoram', region: 'northeast', hazards: ['landslides', 'floods', 'earthquakes'], capital: 'Aizawl' },
    { id: 'nagaland', name: 'Nagaland', region: 'northeast', hazards: ['landslides', 'earthquakes', 'floods'], capital: 'Kohima' },
    { id: 'odisha', name: 'Odisha', region: 'east', hazards: ['cyclones', 'floods', 'heatwaves', 'lightning', 'droughts'], capital: 'Bhubaneswar' },
    { id: 'punjab', name: 'Punjab', region: 'north', hazards: ['heatwaves', 'earthquakes', 'floods'], capital: 'Chandigarh' },
    { id: 'rajasthan', name: 'Rajasthan', region: 'west', hazards: ['droughts', 'heatwaves', 'lightning', 'floods'], capital: 'Jaipur' },
    { id: 'sikkim', name: 'Sikkim', region: 'northeast', hazards: ['earthquakes', 'landslides', 'avalanches', 'floods'], capital: 'Gangtok' },
    { id: 'tamil-nadu', name: 'Tamil Nadu', region: 'south', hazards: ['cyclones', 'floods', 'tsunamis', 'heatwaves', 'droughts'], capital: 'Chennai' },
    { id: 'telangana', name: 'Telangana', region: 'south', hazards: ['heatwaves', 'floods', 'droughts'], capital: 'Hyderabad' },
    { id: 'tripura', name: 'Tripura', region: 'northeast', hazards: ['floods', 'landslides', 'earthquakes'], capital: 'Agartala' },
    { id: 'uttar-pradesh', name: 'Uttar Pradesh', region: 'north', hazards: ['floods', 'heatwaves', 'lightning', 'earthquakes', 'droughts'], capital: 'Lucknow' },
    { id: 'uttarakhand', name: 'Uttarakhand', region: 'north', hazards: ['landslides', 'earthquakes', 'avalanches', 'forest-fires', 'floods'], capital: 'Dehradun' },
    { id: 'west-bengal', name: 'West Bengal', region: 'east', hazards: ['cyclones', 'floods', 'earthquakes', 'lightning'], capital: 'Kolkata' },
    { id: 'delhi', name: 'Delhi', region: 'north', hazards: ['heatwaves', 'earthquakes', 'floods'], capital: 'New Delhi' },
    { id: 'jammu-kashmir', name: 'Jammu and Kashmir', region: 'north', hazards: ['earthquakes', 'avalanches', 'floods', 'landslides'], capital: 'Srinagar' },
    { id: 'ladakh', name: 'Ladakh', region: 'north', hazards: ['avalanches', 'earthquakes', 'landslides'], capital: 'Leh' },
    { id: 'puducherry', name: 'Puducherry', region: 'south', hazards: ['cyclones', 'floods', 'tsunamis'], capital: 'Puducherry' },
    { id: 'chandigarh', name: 'Chandigarh', region: 'north', hazards: ['heatwaves', 'earthquakes'], capital: 'Chandigarh' },
    { id: 'andaman-nicobar', name: 'Andaman and Nicobar Islands', region: 'south', hazards: ['tsunamis', 'cyclones', 'volcanic'], capital: 'Port Blair' },
    { id: 'dnh-dd', name: 'Dadra and Nagar Haveli and Daman and Diu', region: 'west', hazards: ['floods', 'cyclones'], capital: 'Daman' },
    { id: 'lakshadweep', name: 'Lakshadweep', region: 'south', hazards: ['tsunamis', 'cyclones'], capital: 'Kavaratti' }
  ],

  historicalDisasters: [
    { id: 'bhuj-2001', title: 'Bhuj Earthquake', year: 2001, decade: '2000s', hazardType: 'earthquakes', location: 'Bhuj, Gujarat', casualties: '13,805', displaced: '1.5 million', damage: '$5.3 billion', link: '../bhuj-earthquake-2001-explorer/index.html', description: 'A devastating earthquake struck Gujarat on Republic Day (January 26), flattening entire towns. It was one of the deadliest earthquakes in Indian history.', significance: 'Led to the formation of GSDMA and major advances in earthquake-resistant construction standards.', states: ['gujarat'] },
    { id: 'tsunami-2004', title: 'Indian Ocean Tsunami', year: 2004, decade: '2000s', hazardType: 'tsunamis', location: 'Tamil Nadu, Andaman & Nicobar, Kerala', casualties: '10,693 (in India)', displaced: '650,000+', damage: '$12 billion', link: '../indian-ocean-tsunami-2004-explorer/index.html', description: 'The magnitude 9.1 earthquake off Sumatra triggered a massive tsunami that devastated India\'s eastern coastline with waves up to 15 meters.', significance: 'Resulted in India joining the Indian Ocean Tsunami Warning System (IOTWS).', states: ['tamil-nadu', 'andaman-nicobar', 'kerala', 'andhra-pradesh'] },
    { id: 'kashmir-2014', title: 'Jammu & Kashmir Floods', year: 2014, decade: '2010s', hazardType: 'floods', location: 'Srinagar, Jammu & Kashmir', casualties: '277', displaced: '1.3 million', damage: '$6 billion', link: '../2014-kashmir-floods-explorer/index.html', description: 'Record-breaking rainfall caused the Jhelum River to overflow, submerging large parts of Srinagar. The worst flooding in Kashmir in over a century.', significance: 'Exposed critical gaps in flood management infrastructure in the Himalayan region.', states: ['jammu-kashmir'] },
    { id: 'kedarnath-2013', title: 'Uttarakhand Flash Floods (Kedarnath)', year: 2013, decade: '2010s', hazardType: 'floods', location: 'Kedarnath, Uttarakhand', casualties: '5,748', displaced: '400,000+', damage: '$2.3 billion', link: '../uttarakhand-floods-2013/index.html', description: 'Extreme rainfall and glacial lake outburst caused catastrophic flash floods in the Mandakini valley. Thousands of pilgrims were stranded.', significance: 'Led to the establishment of the GLOF monitoring system.', states: ['uttarakhand'] },
    { id: 'fani-2019', title: 'Cyclone Fani', year: 2019, decade: '2010s', hazardType: 'cyclones', location: 'Puri, Odisha', casualties: '89', displaced: '1.2 million', damage: '$8.1 billion', link: '../storm-surge-hazards/index.html', description: 'The strongest cyclone to hit Odisha since 1999, making landfall near Puri with sustained winds of 240 km/h.', significance: 'Showcased India\'s world-class cyclone early warning and evacuation capability.', states: ['odisha'] },
    { id: 'chennai-2015', title: 'Chennai Floods', year: 2015, decade: '2010s', hazardType: 'floods', location: 'Chennai, Tamil Nadu', casualties: '503', displaced: '1.8 million', damage: '$3 billion', link: '../chennai-floods-2015/index.html', description: 'The heaviest rainfall in over a century (345 mm in 24 hours) paralyzed Chennai. The Adyar River overflowed.', significance: 'Highlighted the critical issue of urban flood management in Indian megacities.', states: ['tamil-nadu'] },
    { id: 'amphan-2020', title: 'Cyclone Amphan', year: 2020, decade: '2020s', hazardType: 'cyclones', location: 'Kolkata, West Bengal & Odisha', casualties: '129', displaced: '3 million', damage: '$13 billion', link: '../cyclone-amphan-2020/index.html', description: 'The strongest cyclone ever recorded in the Bay of Bengal, making landfall with winds of 240 km/h.', significance: 'Led to enhanced super cyclone preparedness protocols.', states: ['west-bengal', 'odisha'] },
    { id: 'wayanad-2024', title: 'Wayanad Landslides', year: 2024, decade: '2020s', hazardType: 'landslides', location: 'Wayanad, Kerala', casualties: '400+', displaced: '10,000+', damage: '$1.2 billion', link: '../landslide-hazards-himalayas/index.html', description: 'Catastrophic landslides triggered by extreme rainfall buried entire villages in Chooralmala and Mundakkai areas.', significance: 'Renewed focus on landslide risk mapping in the Western Ghats.', states: ['kerala'] },
    { id: 'assam-2022', title: 'Assam Floods 2022', year: 2022, decade: '2020s', hazardType: 'floods', location: 'Assam (state-wide)', casualties: '200+', displaced: '7 million+', damage: '$4 billion', link: '../brahmaputra-flood-hazards/index.html', description: 'Monsoon floods affected 33 of 35 districts, submerging Kaziranga National Park and displacing millions.', significance: 'Demonstrated the recurring and intensifying nature of Assam floods.', states: ['assam'] },
    { id: 'heatwave-2015', title: 'AP & Telangana Heatwave', year: 2015, decade: '2010s', hazardType: 'heatwaves', location: 'Andhra Pradesh & Telangana', casualties: '2,500+', displaced: 'N/A', damage: 'Indirect (productivity loss)', link: '../heatwave-hazards-northern-india/index.html', description: 'One of the deadliest heatwaves in Indian history, with temperatures exceeding 47\u00B0C in many districts.', significance: 'Catalyzed the development of state-level Heat Action Plans.', states: ['andhra-pradesh', 'telangana'] },
    { id: 'himachal-2023', title: 'Himachal Pradesh Monsoon Disasters', year: 2023, decade: '2020s', hazardType: 'landslides', location: 'Himachal Pradesh', casualties: '400+', displaced: '50,000+', damage: '$1 billion', link: '../himachal-floods-2023-explorer/index.html', description: 'The most destructive monsoon season for Himachal Pradesh in recent memory with continuous landslides and cloudbursts.', significance: 'Sparked debate over unplanned construction and road widening in Himalayan terrain.', states: ['himachal-pradesh'] },
    { id: 'gujarat-2023', title: 'Gujarat Floods 2023', year: 2023, decade: '2020s', hazardType: 'floods', location: 'Gujarat (multiple districts)', casualties: '100+', displaced: '2 million+', damage: '$2 billion', link: '../brahmaputra-flood-hazards/index.html', description: 'Torrential rainfall from cyclone-related disturbances caused unprecedented flooding in Gujarat.', significance: 'Highlighted vulnerability of western India to rainfall extremes.', states: ['gujarat'] },
    { id: 'super-cyclone-1999', title: 'Odisha Super Cyclone', year: 1999, decade: '1990s', hazardType: 'cyclones', location: 'Paradip, Odisha', casualties: '10,000+', displaced: '13 million', damage: '$5 billion', link: '../storm-surge-hazards/index.html', description: 'The deadliest cyclone in modern Indian history with winds of 260 km/h and a 6-meter storm surge.', significance: 'The turning point for India\'s disaster management. Led to the Disaster Management Act, 2005.', states: ['odisha'] },
    { id: 'uttarakhand-fire-2024', title: 'Uttarakhand Forest Fires 2024', year: 2024, decade: '2020s', hazardType: 'forest-fires', location: 'Uttarakhand', casualties: '12', displaced: '5,000+', damage: '$150 million', link: '../uttarakhand-forest-fire-hazards/index.html', description: 'Devastating forest fires burned over 5,000 hectares in a single month.', significance: 'Intensified calls for better forest fire prevention infrastructure.', states: ['uttarakhand'] },
    { id: 'drought-2016', title: 'Marathwada & Bundelkhand Drought', year: 2016, decade: '2010s', hazardType: 'droughts', location: 'Maharashtra & Madhya Pradesh', casualties: 'Indirect (suicides)', displaced: 'Millions (migration)', damage: '$5 billion (agricultural)', link: '../rajasthan-drought-hazards/index.html', description: 'Severe drought struck following two consecutive years of deficient monsoon.', significance: 'Accelerated investment in micro-irrigation and crop insurance (PMFBY).', states: ['maharashtra', 'madhya-pradesh'] }
  ],

  preparedness: [
    { hazardId: 'floods', title: 'Flood Preparedness', icon: '\uD83C\uDF0A', color: '#3b82f6',
      before: ['Know your flood risk zone', 'Keep an emergency kit with 72 hours of supplies', 'Store important documents in waterproof containers', 'Identify higher ground evacuation routes', 'Keep emergency numbers handy (NDRF: 1070)'],
      during: ['Move to higher ground immediately', 'Never walk or drive through floodwater', 'Avoid contact with electrical equipment in water', 'Listen to official warnings', 'If trapped, go to the roof and signal for help'],
      after: ['Wait for official all-clear before returning', 'Check for structural damage', 'Avoid drinking tap water until declared safe', 'Report damaged infrastructure', 'Seek medical help for waterborne diseases'] },
    { hazardId: 'cyclones', title: 'Cyclone Preparedness', icon: '\uD83C\uDF2A\uFE0F', color: '#8b5cf6',
      before: ['Monitor IMD cyclone warnings', 'Secure loose objects around your home', 'Board up windows', 'Stock 3\u20137 days of food, water, and medicines', 'Know the location of nearest cyclone shelter'],
      during: ['Evacuate immediately when ordered', 'Stay in an interior room away from windows', 'Do not go outside during the eye of the storm', 'Keep emergency radio on', 'Avoid using candles'],
      after: ['Watch for fallen power lines', 'Avoid floodwater', 'Check on neighbors', 'Boil water before drinking', 'Document damage for insurance'] },
    { hazardId: 'earthquakes', title: 'Earthquake Preparedness', icon: '\uD83C\uDF0F', color: '#ef4444',
      before: ['Secure heavy furniture to walls', 'Identify safe spots under sturdy furniture', 'Keep an emergency kit near your bed', 'Practice Drop, Cover, and Hold On drills', 'Know how to shut off gas and electricity'],
      during: ['DROP to the ground immediately', 'Take COVER under sturdy furniture', 'HOLD ON and protect your head and neck', 'Stay indoors until shaking stops', 'If outdoors, move to an open area'],
      after: ['Check for injuries and provide first aid', 'Inspect your home for damage', 'If gas is suspected, leave immediately', 'Expect aftershocks', 'Use text messages to communicate'] },
    { hazardId: 'landslides', title: 'Landslide Preparedness', icon: '\u26F0\uFE0F', color: '#f97316',
      before: ['Know if you live in a landslide-prone area', 'Observe warning signs: cracked ground, tilted trees', 'Ensure proper drainage around property', 'Avoid building on steep slopes', 'Attend community awareness programs'],
      during: ['Move away from landslide path immediately', 'Move to higher ground', 'Listen for unusual sounds', 'Evacuate immediately if advised'],
      after: ['Stay away from the slide area', 'Check for injured people', 'Re-route travel around damaged areas', 'Wait for geological survey clearance'] },
    { hazardId: 'forest-fires', title: 'Forest Fire Preparedness', icon: '\uD83D\uDD25', color: '#dc2626',
      before: ['Create defensible space around property (30m+)', 'Keep fire extinguishers accessible', 'Clear dry leaves and debris near structures', 'Know multiple evacuation routes', 'Sign up for fire alerts (NASA FIRMS, FSI)'],
      during: ['Evacuate immediately if ordered', 'Close all windows and doors before leaving', 'Wear long sleeves and wet cloth over face', 'Drive slowly with headlights on', 'Follow designated evacuation routes'],
      after: ['Do not re-enter until authorities say safe', 'Watch for hot spots', 'Check for structural damage', 'Provide water for displaced wildlife'] },
    { hazardId: 'droughts', title: 'Drought Preparedness', icon: '\uD83C\uDF3E', color: '#d97706',
      before: ['Harvest and store rainwater', 'Plant drought-resistant crops', 'Maintain irrigation systems', 'Diversify income sources', 'Build community water storage'],
      during: ['Implement strict water rationing', 'Use micro-irrigation systems', 'Apply for government drought relief', 'Seek veterinary help for livestock', 'Migrate livestock to better areas'],
      after: ['Participate in watershed development', 'Restock seeds and fertilizers', 'Seek counseling for stress', 'Plan for future water conservation'] },
    { hazardId: 'heatwaves', title: 'Heatwave Preparedness', icon: '\uD83C\uDF21\uFE0F', color: '#ea580c',
      before: ['Stock ORS packets and electrolyte drinks', 'Keep your home cool', 'Plan outdoor activities for early morning/evening', 'Know signs of heat exhaustion', 'Check on vulnerable neighbors'],
      during: ['Stay indoors 12 PM \u2013 4 PM', 'Drink water frequently', 'Wear light-colored loose cotton clothes', 'Avoid alcohol and heavy meals', 'Cool down with wet towels'],
      after: ['Gradually resume normal activities', 'Continue hydrating for 24\u201348 hours', 'Seek medical attention if symptoms persist', 'Update your Heat Action Plan'] },
    { hazardId: 'lightning', title: 'Lightning Preparedness', icon: '\u26A1', color: '#eab308',
      before: ['Install lightning arrestors on tall buildings', 'Know safe shelter locations', 'Monitor weather forecasts', 'Download lightning alert apps', 'Educate family on lightning safety'],
      during: ['Get inside a hard-topped building or car', 'Stay away from windows and doors', 'Avoid tall objects in open areas', 'Do not lie flat \u2014 crouch with feet together', 'Unplug electronics'],
      after: ['Wait 30 minutes after last thunder', 'Administer CPR to lightning victims (safe to touch)', 'Check for fire or structural damage', 'Report fallen power lines'] },
    { hazardId: 'avalanches', title: 'Avalanche Preparedness', icon: '\uD83E\uDDCA', color: '#06b6d4',
      before: ['Check SASE avalanche forecasts', 'Carry avalanche safety gear', 'Travel in groups', 'Learn to recognize avalanche terrain', 'Take avalanche safety training'],
      during: ['Move to the side of the avalanche path', 'Grab onto trees or rocks', 'Swim to the surface if caught', 'Create an air pocket around your face', 'Stay calm and conserve oxygen'],
      after: ['Activate beacon if buried', 'Begin search with beacon if companion buried', 'Clear airway and perform CPR if needed', 'Call for rescue (SASE, ITBP, Army)'] },
    { hazardId: 'tsunamis', title: 'Tsunami Preparedness', icon: '\uD83C\uDF0A', color: '#0891b2',
      before: ['Know if you live in a tsunami zone', 'Know evacuation routes to higher ground', 'Practice evacuation drills', 'Keep emergency supplies in a go-bag', 'Learn natural warning signs'],
      during: ['Strong earthquake near coast \u2192 evacuate IMMEDIATELY', 'Move to 15m+ elevation or 2km inland', 'Do NOT wait for official warning', 'Stay away from coast until all-clear', 'In a boat, move to deep water offshore'],
      after: ['Stay away from coast until safe', 'Expect multiple waves', 'Check for injuries', 'Avoid contaminated water', 'Report missing persons'] },
    { hazardId: 'volcanic', title: 'Volcanic Activity Preparedness', icon: '\uD83C\uDF0B', color: '#a855f7',
      before: ['Know volcanic hazard zones (mainly Andaman)', 'Monitor GSI updates', 'Prepare evacuation kit', 'Understand eruption alert levels', 'Know ashfall safety procedures'],
      during: ['Evacuate if within exclusion zone', 'Protect face with mask from ash', 'Seek shelter in sturdy buildings', 'Do not drive in heavy ashfall', 'Avoid river valleys (lahar risk)'],
      after: ['Stay indoors until ashfall stops', 'Clear ash from roofs', 'Clean ash from water systems', 'Wear N95 masks outdoors', 'Follow official return-to-area guidance'] }
  ],

  sources: [
    { title: 'National Disaster Management Authority (NDMA)', url: 'https://ndma.gov.in/' },
    { title: 'India Meteorological Department (IMD)', url: 'https://mausam.imd.gov.in/' },
    { title: 'National Disaster Response Force (NDRF)', url: 'https://ndrf.gov.in/' },
    { title: 'India-WRIS (Water Resources Information System)', url: 'https://indiawris.gov.in/' },
    { title: 'Forest Survey of India (FSI)', url: 'https://www.fsi.nic.in/' },
    { title: 'Snow and Avalanche Study Establishment (SASE)', url: 'https://sase.drdo.gov.in/' },
    { title: 'Indian National Centre for Ocean Information Services (INCOIS)', url: 'https://incois.gov.in/' },
    { title: 'National Remote Sensing Centre (NRSC) / ISRO', url: 'https://www.nrsc.gov.in/' },
    { title: 'National Center for Seismology (NCS)', url: 'https://www.ncs.gov.in/' },
    { title: 'NASA FIRMS (Fire Information for Resource Management System)', url: 'https://firms.modaps.eosdis.nasa.gov/' }
  ]
};

/* Expose the dataset globally for the explorer controller (disasters.js). */
if (typeof window !== 'undefined') {
  window.DisastersData = DISASTER_DATA;
}

/* CommonJS / ESM export for tests */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DISASTER_DATA;
}

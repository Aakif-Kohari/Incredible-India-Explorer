import {
  HERITAGE_CATEGORIES,
  HISTORICAL_PERIODS,
  REGIONS,
  UNESCO_STATUS,
  TRAIL_TYPES,
} from './heritageTrailTypes.js';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, decimals = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HERITAGE_SITES = [
  { name: 'Taj Mahal', city: 'Agra', state: 'UP', region: 'north', category: 'monument', period: 'mughal', unesco: 'world_heritage', rating: 5, visitors: 8000000, description: 'Ivory-white marble mausoleum, symbol of eternal love.' },
  { name: 'Ajanta Caves', city: 'Aurangabad', state: 'Maharashtra', region: 'west', category: 'cave', period: 'maurya', unesco: 'world_heritage', rating: 5, visitors: 500000, description: 'Rock-cut cave monuments with ancient Buddhist paintings.' },
  { name: 'Ellora Caves', city: 'Aurangabad', state: 'Maharashtra', region: 'west', category: 'cave', period: 'chalukya', unesco: 'world_heritage', rating: 5, visitors: 600000, description: 'Complex of Buddhist, Hindu, and Jain cave temples.' },
  { name: 'Qutub Minar', city: 'Delhi', state: 'Delhi', region: 'north', category: 'monument', period: 'delhi_sultanate', unesco: 'world_heritage', rating: 5, visitors: 3500000, description: '73m tall minaret, masterpiece of Indo-Islamic architecture.' },
  { name: 'Hampi', city: 'Hampi', state: 'Karnataka', region: 'south', category: 'temple', period: 'vijayanagara', unesco: 'world_heritage', rating: 5, visitors: 800000, description: 'Ruins of the Vijayanagara Empire, stunning stone architecture.' },
  { name: 'Khajuraho Temples', city: 'Khajuraho', state: 'MP', region: 'central', category: 'temple', period: 'chandela', unesco: 'world_heritage', rating: 5, visitors: 400000, description: 'Group of Hindu and Jain temples with intricate sculptures.' },
  { name: 'Konark Sun Temple', city: 'Konark', state: 'Odisha', region: 'east', category: 'temple', period: 'ganga', unesco: 'world_heritage', rating: 5, visitors: 600000, description: '13th-century temple shaped like a giant chariot.' },
  { name: 'Sanchi Stupa', city: 'Sanchi', state: 'MP', region: 'central', category: 'stupa', period: 'maurya', unesco: 'world_heritage', rating: 4, visitors: 300000, description: 'Buddhist monument with elaborate carved gateways.' },
  { name: 'Mysore Palace', city: 'Mysore', state: 'Karnataka', region: 'south', category: 'palace', period: 'british', unesco: 'national', rating: 5, visitors: 6000000, description: 'Indo-Saracenic palace, seat of the Wadiyar dynasty.' },
  { name: 'Red Fort', city: 'Delhi', state: 'Delhi', region: 'north', category: 'fort', period: 'mughal', unesco: 'world_heritage', rating: 5, visitors: 2500000, description: 'Mughal-era red sandstone fort, symbol of Indian sovereignty.' },
  { name: 'Charminar', city: 'Hyderabad', state: 'Telangana', region: 'south', category: 'monument', period: 'mughal', unesco: 'national', rating: 4, visitors: 2000000, description: 'Iconic 1591 mosque and monument in the old city.' },
  { name: 'Meenakshi Temple', city: 'Madurai', state: 'Tamil Nadu', region: 'south', category: 'temple', period: 'pandya', unesco: 'tentative', rating: 5, visitors: 1500000, description: 'Historic Hindu temple with towering gopurams.' },
  { name: 'Amer Fort', city: 'Jaipur', state: 'Rajasthan', region: 'north', category: 'fort', period: 'mughal', unesco: 'world_heritage', rating: 5, visitors: 1200000, description: 'Hilltop fort with mirror palace and Sheesh Mahal.' },
  { name: 'Brihadeeswarar Temple', city: 'Thanjavur', state: 'Tamil Nadu', region: 'south', category: 'temple', period: 'chola', unesco: 'world_heritage', rating: 5, visitors: 500000, description: 'Chola-era granite temple, masterpiece of Dravidian architecture.' },
  { name: 'Bodh Gaya', city: 'Gaya', state: 'Bihar', region: 'east', category: 'stupa', period: 'maurya', unesco: 'world_heritage', rating: 5, visitors: 1000000, description: 'Sacred Buddhist site where Buddha attained enlightenment.' },
  { name: 'Mundeshwari Temple', city: 'Kaimur', state: 'Bihar', region: 'east', category: 'temple', period: 'gupta', unesco: 'national', rating: 3, visitors: 50000, description: 'One of the oldest functional Hindu temples in India.' },
  { name: 'Lothal', city: 'Ahmedabad', state: 'Gujarat', region: 'west', category: 'port', period: 'vedic', unesco: 'world_heritage', rating: 4, visitors: 100000, description: 'Indus Valley port city with advanced drainage system.' },
  { name: 'Nalanda', city: 'Nalanda', state: 'Bihar', region: 'east', category: 'university', period: 'gupta', unesco: 'world_heritage', rating: 4, visitors: 200000, description: 'Ancient Buddhist university, one of the oldest in the world.' },
  { name: 'Nalanda Mahavihara', city: 'Nalanda', state: 'Bihar', region: 'east', category: 'university', period: 'gupta', unesco: 'world_heritage', rating: 4, visitors: 200000, description: 'Ruins of the great ancient center of learning.' },
  { name: 'Humayun\'s Tomb', city: 'Delhi', state: 'Delhi', region: 'north', category: 'monument', period: 'mughal', unesco: 'world_heritage', rating: 5, visitors: 1500000, description: 'Garden tomb, precursor to the Taj Mahal.' },
  { name: 'Jantar Mantar', city: 'Jaipur', state: 'Rajasthan', region: 'north', category: 'monument', period: 'mughal', unesco: 'world_heritage', rating: 4, visitors: 800000, description: 'Astronomical observation site with giant instruments.' },
  { name: 'Golconda Fort', city: 'Hyderabad', state: 'Telangana', region: 'south', category: 'fort', period: 'mughal', unesco: 'national', rating: 4, visitors: 700000, description: 'Medieval fort famous for its acoustics and diamonds.' },
  { name: 'Chhatrapati Shivaji Terminus', city: 'Mumbai', state: 'Maharashtra', region: 'west', category: 'monument', period: 'british', unesco: 'world_heritage', rating: 4, visitors: 3000000, description: 'Victorian Gothic railway station, architectural marvel.' },
  { name: 'Rani Ki Vav', city: 'Patan', state: 'Gujarat', region: 'west', category: 'stepwell', period: 'solanki', unesco: 'world_heritage', rating: 5, visitors: 150000, description: 'Ornate stepwell with over 1500 sculptures.' },
  { name: 'Gateway of India', city: 'Mumbai', state: 'Maharashtra', region: 'west', category: 'monument', period: 'british', unesco: 'national', rating: 4, visitors: 4000000, description: 'Indo-Saracenic arch overlooking the Arabian Sea.' },
];

export const generateHeritageSites = (count = 25) => {
  return HERITAGE_SITES.slice(0, count).map((site, i) => {
    const period = HISTORICAL_PERIODS[site.period] || randomChoice(Object.values(HISTORICAL_PERIODS));
    return {
      id: `site-${i}`,
      ...site,
      periodConfig: period,
      categoryConfig: HERITAGE_CATEGORIES[site.category] || randomChoice(Object.values(HERITAGE_CATEGORIES)),
      regionConfig: REGIONS[site.region] || REGIONS.north,
      unescoConfig: UNESCO_STATUS[site.unesco] || UNESCO_STATUS.state,
      latitude: randomFloat(8, 35, 4),
      longitude: randomFloat(72, 92, 4),
      yearBuilt: randomInt(-500, 1947),
      bestTimeToVisit: randomChoice(['Oct-Mar', 'Nov-Feb', 'Sep-Mar', 'Year-round', 'Oct-Jun']),
      entryFee: randomInt(0, 500),
      avgVisitDuration: randomFloat(1, 4),
      nearbySites: randomInt(2, 8),
      photosCount: randomInt(500, 50000),
      reviewsCount: randomInt(100, 10000),
      conservationStatus: randomChoice(['Excellent', 'Good', 'Fair', 'Needs Attention']),
      threats: randomChoice([['Pollution'], ['Urbanization'], ['Tourism pressure'], ['Weather erosion'], ['Neglect'], []]),
    };
  });
};

export const generateTrailRoutes = (sites) => {
  const trails = [
    { name: 'Golden Triangle Heritage Trail', type: 'architectural', sites: ['Taj Mahal', 'Amer Fort', 'Red Fort'], days: 5, description: 'Classic North India heritage circuit.' },
    { name: 'Chola Temple Trail', type: 'spiritual', sites: ['Brihadeeswarar Temple'], days: 3, description: 'Explore the magnificent Chola dynasty temples of Tamil Nadu.' },
    { name: 'Buddhist Pilgrimage Trail', type: 'spiritual', sites: ['Bodh Gaya', 'Sanchi Stupa', 'Nalanda'], days: 7, description: 'Walk in the footsteps of Buddha through sacred sites.' },
    { name: 'Deccan Sultanate Trail', type: 'historical', sites: ['Golconda Fort', 'Charminar'], days: 4, description: 'Discover the rich heritage of the Deccan sultanates.' },
    { name: 'Cave Art Heritage Trail', type: 'art_culture', sites: ['Ajanta Caves', 'Ellora Caves'], days: 4, description: 'Marvel at ancient rock-cut art and architecture.' },
    { name: 'Mughal Legacy Trail', type: 'historical', sites: ['Red Fort', 'Humayun\'s Tomb', 'Taj Mahal'], days: 6, description: 'Trace the architectural legacy of the Mughal Empire.' },
  ];

  return trails.map((trail, i) => ({
    id: `trail-${i}`,
    ...trail,
    typeConfig: TRAIL_TYPES[trail.type] || TRAIL_TYPES.historical,
    totalKm: randomInt(200, 1500),
    difficulty: randomChoice(['Easy', 'Moderate', 'Challenging']),
    rating: randomFloat(4, 5),
    reviews: randomInt(50, 500),
    season: randomChoice(['Oct-Mar', 'Nov-Feb', 'Year-round']),
    costRange: randomChoice(['₹5K-15K', '₹15K-30K', '₹30K-50K', '₹50K+']),
    highlights: randomChoice([
      ['Sunrise at Taj Mahal', 'Amber Fort elephant ride', 'Old Delhi food walk'],
      ['Thanjavur temple dance', 'Chettinad mansion visit', 'Silk weaving demo'],
      ['Meditation at Bodh Gaya', 'Sanchi stupa walk', 'Nalanda ruins tour'],
    ]),
  }));
};

export const generateRegionStats = () => {
  return Object.entries(REGIONS).map(([key, config]) => ({
    region: key,
    ...config,
    totalSites: randomInt(10, 80),
    unescoSites: randomInt(1, 10),
    avgRating: randomFloat(3.5, 5),
    annualVisitors: randomInt(500000, 10000000),
    conservationScore: randomInt(40, 95),
  }));
};

export const generateTimelineData = () => {
  return Object.entries(HISTORICAL_PERIODS).map(([key, config]) => ({
    period: key,
    ...config,
    sitesCount: randomInt(2, 15),
    topSite: randomChoice(HERITAGE_SITES).name,
    significance: randomChoice(['Major', 'Moderate', 'Emerging']),
  }));
};

export const generateVisitorStats = (months = 12) => {
  return Array.from({ length: months }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - i));
    return {
      month: date.toLocaleString('en-US', { month: 'short' }),
      visitors: randomInt(50000, 500000),
      revenue: randomInt(1000000, 20000000),
      avgStay: randomFloat(1.5, 4),
      internationalShare: randomFloat(5, 30),
    };
  });
};

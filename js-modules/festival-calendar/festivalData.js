// Festival Data - Mock data generator for India Festival Calendar
import { FESTIVAL_CATEGORIES, FESTIVAL_SEASONS, CELEBRATION_TYPES, REGIONS, HINDU_MONTHS } from './festivalTypes.js';

export const festivals = [
  {
    id: 1,
    name: 'Diwali',
    englishName: 'Festival of Lights',
    category: 'religious',
    season: 'autumn',
    month: 'October-November',
    hinduMonth: 'Kartik',
    date: '2025-10-20',
    duration: 5,
    description: 'The festival of lights symbolizing the victory of good over evil. Celebrated with diyas, rangoli, fireworks, and sweets.',
    significance: 'Celebrates the return of Lord Rama to Ayodhya after 14 years of exile',
    region: ['north', 'south', 'east', 'west', 'central'],
    celebrations: ['decorations', 'feast', 'gifts', 'bonfire', 'prayer'],
    recipes: ['Gulab Jamun', 'Kaju Katli', 'Rasgulla', 'Jalebi', 'Chakli'],
    traditions: ['Lighting diyas', 'Creating rangoli', 'Exchanging gifts', 'Fireworks', 'Gambling games'],
    images: ['🪔', '✨', '🎆', '🎇'],
    color: '#FFB347'
  },
  {
    id: 2,
    name: 'Holi',
    englishName: 'Festival of Colors',
    category: 'religious',
    season: 'spring',
    month: 'March',
    hinduMonth: 'Phalguna',
    date: '2025-03-14',
    duration: 2,
    description: 'The vibrant festival of colors celebrating the arrival of spring and the love of Radha and Krishna.',
    significance: 'Celebrates the divine love of Radha and Krishna, and the triumph of good over evil',
    region: ['north', 'south', 'east', 'west', 'central'],
    celebrations: ['dancing', 'feast', 'bonfire'],
    recipes: ['Gujiya', 'Thandai', 'Puran Poli', 'Malpua', 'Dahi Vada'],
    traditions: ['Playing with colors', 'Bonfire (Holika Dahan)', 'Thandai drinks', 'Dhulandi dance', 'Water guns'],
    images: ['🎨', '🌈', '💃', '🎵'],
    color: '#FF69B4'
  },
  {
    id: 3,
    name: 'Pongal',
    englishName: 'Harvest Festival',
    category: 'harvest',
    season: 'winter',
    month: 'January',
    hinduMonth: 'Magha',
    date: '2025-01-14',
    duration: 4,
    description: 'Tamil harvest festival dedicated to the Sun God, celebrated with the cooking of Pongal dish.',
    significance: 'Thanksgiving to Sun God for agricultural abundance',
    region: ['south'],
    celebrations: ['feast', 'decorations', 'dancing'],
    recipes: ['Pongal (Sweet)', 'Ven Pongal', 'Sakkarai Pongal', 'Murukku', 'Payasam'],
    traditions: ['Cooking Pongal in clay pots', 'Decorating with kolam', 'Cattle decoration', 'Bhogi fire', 'Sun worship'],
    images: ['🌾', '☀️', '🐄', '🍚'],
    color: '#4ECDC4'
  },
  {
    id: 4,
    name: 'Ganesh Chaturthi',
    englishName: 'Birthday of Lord Ganesha',
    category: 'religious',
    season: 'monsoon',
    month: 'August-September',
    hinduMonth: 'Bhadrapada',
    date: '2025-08-27',
    duration: 10,
    description: 'Celebration of Lord Ganesha\'s birthday with elaborate clay idols and community festivities.',
    significance: 'Birth of Lord Ganesha, remover of obstacles',
    region: ['west', 'south', 'north'],
    celebrations: ['prayer', 'procession', 'dancing', 'feast'],
    recipes: ['Modak', 'Karanji', 'Puran Poli', 'Sundal', 'Ladoo'],
    traditions: ['Ganesh idol installation', 'Daily prayers', 'Cultural programs', 'Immersion procession', 'Modak offerings'],
    images: ['🐘', '🙏', '🎵', '🌧'],
    color: '#FF6B6B'
  },
  {
    id: 5,
    name: 'Navratri',
    englishName: 'Nine Nights Festival',
    category: 'religious',
    season: 'autumn',
    month: 'September-October',
    hinduMonth: 'Ashwin',
    date: '2025-10-02',
    duration: 9,
    description: 'Nine nights of dance, music, and worship dedicated to Goddess Durga.',
    significance: 'Worship of Goddess Durga in nine forms',
    region: ['west', 'north', 'south'],
    celebrations: ['dancing', 'prayer', 'feast', 'decorations'],
    recipes: ['Fafda', 'Jalebi', 'Sabudana Khichdi', 'Kutchi Dabeli', 'Shrikhand'],
    traditions: ['Garba dance', 'Dandiya', 'Fasting', 'Golu display', 'Durga Puja'],
    images: ['💃', '🎵', '🪔', '🙏'],
    color: '#9370DB'
  },
  {
    id: 6,
    name: 'Dussehra',
    englishName: 'Victory of Good over Evil',
    category: 'religious',
    season: 'autumn',
    month: 'October',
    hinduMonth: 'Ashwin',
    date: '2025-10-11',
    duration: 1,
    description: 'Celebrates Lord Rama\'s victory over Ravana, marked by burning of Ravana effigies.',
    significance: 'Victory of Lord Rama over demon king Ravana',
    region: ['north', 'south', 'east', 'west'],
    celebrations: ['bonfire', 'procession', 'dancing', 'feast'],
    recipes: ['Puri', 'Aloo Sabzi', 'Halwa', 'Chole', 'Kheer'],
    traditions: ['Burning Ravana effigy', 'Ramlila performances', 'Processions', 'Weapon worship', 'Temple visits'],
    images: ['🏹', '🔥', '🎭', '⚔️'],
    color: '#D2691E'
  },
  {
    id: 7,
    name: 'Onam',
    englishName: 'Kerala Harvest Festival',
    category: 'harvest',
    season: 'monsoon',
    month: 'August-September',
    hinduMonth: 'Chingam',
    date: '2025-09-05',
    duration: 10,
    description: 'Kerala\'s biggest festival celebrating the homecoming of King Mahabali with flower carpets and feast.',
    significance: 'Welcome of legendary King Mahabali',
    region: ['south'],
    celebrations: ['feast', 'dancing', 'decorations', 'games'],
    recipes: ['Onam Sadya', 'Avial', 'Sambar', 'Payasam', 'Banana Chips'],
    traditions: ['Pookalam (flower carpet)', 'Onam Sadya (feast)', 'Vallam Kali (boat race)', 'Pulikali (tiger dance)', 'Kausthubam dance'],
    images: ['🌸', '🍌', '🚣', '🐯'],
    color: '#32CD32'
  },
  {
    id: 8,
    name: 'Eid ul-Fitr',
    englishName: 'Festival of Breaking Fast',
    category: 'religious',
    season: 'spring',
    month: 'April',
    hinduMonth: null,
    date: '2025-04-01',
    duration: 3,
    description: 'Celebration marking the end of Ramadan holy month of fasting.',
    significance: 'End of Ramadan fasting period',
    region: ['north', 'south', 'east', 'west'],
    celebrations: ['prayer', 'feast', 'gifts', 'decorations'],
    recipes: ['Sheer Khurma', 'Biryani', 'Haleem', 'Seviyan', 'Phirni'],
    traditions: ['Eid prayers', 'Feasting', 'Giving Eidi (gifts)', 'New clothes', 'Charity'],
    images: ['🌙', '🕌', '🍽', '🎁'],
    color: '#2E8B57'
  },
  {
    id: 9,
    name: 'Baisakhi',
    englishName: 'Punjabi New Year',
    category: 'harvest',
    season: 'spring',
    month: 'April',
    hinduMonth: 'Vaishakh',
    date: '2025-04-14',
    duration: 1,
    description: 'Punjabi harvest festival and Sikh New Year with Bhangra and traditional dance.',
    significance: 'Harvest of Rabi crop and Sikh New Year',
    region: ['north'],
    celebrations: ['dancing', 'feast', 'procession'],
    recipes: ['Chole Bhature', 'Makki di Roti', 'Sarson da Saag', 'Lassi', 'Jalebi'],
    traditions: ['Bhangra dance', 'Nagar Kirtan', 'Langar (community kitchen)', 'Fairs', 'Mela'],
    images: ['🌾', '💃', '🎵', '🕺'],
    color: '#FFD700'
  },
  {
    id: 10,
    name: 'Christmas',
    englishName: 'Birth of Jesus Christ',
    category: 'cultural',
    season: 'winter',
    month: 'December',
    hinduMonth: null,
    date: '2025-12-25',
    duration: 1,
    description: 'Celebration of the birth of Jesus Christ with decorations, carols, and feasts.',
    significance: 'Birth of Jesus Christ',
    region: ['north', 'south', 'east', 'west'],
    celebrations: ['decorations', 'feast', 'gifts', 'dancing'],
    recipes: ['Plum Cake', 'Biryani', 'Vindaloo', 'Appam', 'Wine Cake'],
    traditions: ['Christmas tree decoration', 'Midnight mass', 'Gift exchange', 'Carols', 'Santa Claus'],
    images: ['🎄', '⭐', '🎁', '🔔'],
    color: '#DC143C'
  },
  {
    id: 11,
    name: 'Makar Sankranti',
    englishName: 'Sun\'s Transition',
    category: 'harvest',
    season: 'winter',
    month: 'January',
    hinduMonth: 'Pausha',
    date: '2025-01-14',
    duration: 1,
    description: 'Harvest festival marking the sun\'s transition into Capricorn.',
    significance: 'End of winter solstice and start of longer days',
    region: ['north', 'south', 'west'],
    celebrations: ['feast', 'decorations', 'dancing'],
    recipes: ['Til Gul Ladoo', 'Puran Poli', 'Ellu Bella', 'Chikki', 'Gajak'],
    traditions: ['Kite flying', 'Til gul exchange', 'Sun bathing', 'Holy dip in rivers', 'Bonfires'],
    images: ['🪁', '☀️', '🌾', '🍯'],
    color: '#FF8C00'
  },
  {
    id: 12,
    name: 'Raksha Bandhan',
    englishName: 'Bond of Protection',
    category: 'cultural',
    season: 'monsoon',
    month: 'August',
    hinduMonth: 'Shravana',
    date: '2025-08-09',
    duration: 1,
    description: 'Celebration of the bond between brothers and sisters with rakhi tying ceremony.',
    significance: 'Bond of love and protection between siblings',
    region: ['north', 'south', 'east', 'west'],
    celebrations: ['feast', 'gifts', 'prayer'],
    recipes: ['Gulab Jamun', 'Kheer', 'Rasgulla', 'Sandesh', 'Barfi'],
    traditions: ['Tying Rakhi', 'Brother\'s vow of protection', 'Gift exchange', 'Family feasts', 'Sweets'],
    images: ['🎀', '💝', '👨‍👩‍👧‍👦', '🍬'],
    color: '#FF69B4'
  },
  {
    id: 13,
    name: 'Kumbh Mela',
    englishName: 'Festival of the Sacred Pitcher',
    category: 'religious',
    season: 'winter',
    month: 'January-April',
    hinduMonth: 'Magha-Chaitra',
    date: '2025-01-13',
    duration: 45,
    description: 'The world\'s largest religious gathering with holy bathing in sacred rivers.',
    significance: 'Pilgrimage and holy dip in sacred rivers for salvation',
    region: ['north'],
    celebrations: ['prayer', 'procession', 'dancing'],
    recipes: ['Prasad', 'Kadhi Chawal', 'Puri Sabzi', 'Halwa', 'Ladoo'],
    traditions: ['Holy dip in rivers', 'Naga sadhu processions', 'Spiritual discourses', 'Devotional singing', 'Yoga'],
    images: ['🕉', '🏞', '🙏', '🧘'],
    color: '#4169E1'
  },
  {
    id: 14,
    name: 'Bihu',
    englishName: 'Assamese New Year',
    category: 'harvest',
    season: 'spring',
    month: 'April',
    hinduMonth: 'Bohag',
    date: '2025-04-15',
    duration: 7,
    description: 'Assamese festival of joy, dance, and harvest celebration.',
    significance: 'Welcoming the Assamese New Year and spring season',
    region: ['northeast'],
    celebrations: ['dancing', 'feast', 'decorations'],
    recipes: ['Pitha', 'Laru', 'Masor Tenga', 'Khar', 'Pulao'],
    traditions: ['Bihu dance', 'Gamosa wearing', 'Bonfires', 'Feasting', 'Cattle worship'],
    images: ['💃', '🌾', '🎵', '🌺'],
    color: '#32CD32'
  },
  {
    id: 15,
    name: 'Janmashtami',
    englishName: 'Krishna\'s Birthday',
    category: 'religious',
    season: 'monsoon',
    month: 'August',
    hinduMonth: 'Shravana',
    date: '2025-08-16',
    duration: 2,
    description: 'Celebration of Lord Krishna\'s birth with Dahi Handi and devotional songs.',
    significance: 'Birth of Lord Krishna, eighth avatar of Vishnu',
    region: ['north', 'south', 'east', 'west'],
    celebrations: ['prayer', 'dancing', 'feast', 'procession'],
    recipes: ['Makhan Mishri', 'Peda', 'Kheer', 'Butter Milk', 'Panjiri'],
    traditions: ['Dahi Handi', 'Krishna Leela', 'Devotional songs', 'Fasting', 'Midnight celebration'],
    images: ['🦚', '🎵', '🪈', ' butter'],
    color: '#1E90FF'
  }
];

export const festivalStats = {
  totalFestivals: festivals.length,
  byCategory: FESTIVAL_CATEGORIES.map(cat => ({
    ...cat,
    count: festivals.filter(f => f.category === cat.id).length
  })),
  bySeason: FESTIVAL_SEASONS.map(season => ({
    ...season,
    count: festivals.filter(f => f.season === season.id).length
  })),
  avgDuration: Math.round(festivals.reduce((sum, f) => sum + f.duration, 0) / festivals.length),
  upcomingFestivals: festivals.filter(f => new Date(f.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date)),
  monthsDistribution: Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    count: festivals.filter(f => {
      const d = new Date(f.date);
      return d.getMonth() === i;
    }).length
  }))
};

export const getFestivalById = (id) => festivals.find(f => f.id === id);

export const getFestivalsByCategory = (category) => festivals.filter(f => f.category === category);

export const getFestivalsBySeason = (season) => festivals.filter(f => f.season === season);

export const getFestivalsByRegion = (region) => festivals.filter(f => f.region.includes(region));

export const getUpcomingFestivals = (count = 5) => {
  const now = new Date();
  return festivals
    .filter(f => new Date(f.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, count);
};

export const formatCountdown = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = date - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today!';
  if (days === 1) return 'Tomorrow!';
  if (days < 7) return `In ${days} days`;
  if (days < 30) return `In ${Math.floor(days / 7)} weeks`;
  return `In ${Math.floor(days / 30)} months`;
};

export default {
  festivals,
  festivalStats,
  getFestivalById,
  getFestivalsByCategory,
  getFestivalsBySeason,
  getFestivalsByRegion,
  getUpcomingFestivals,
  formatCountdown
};
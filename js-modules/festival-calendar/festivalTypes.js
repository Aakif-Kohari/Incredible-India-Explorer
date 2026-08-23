// Festival Types - Data models and constants for India Festival Calendar
export const FESTIVAL_CATEGORIES = [
  { id: 'religious', name: 'Religious', icon: '🙏', color: '#FF6B6B' },
  { id: 'harvest', name: 'Harvest', icon: '🌾', color: '#4ECDC4' },
  { id: 'cultural', name: 'Cultural', icon: '🎭', color: '#45B7D1' },
  { id: 'national', name: 'National', icon: '🇮🇳', color: '#FFB347' },
  { id: 'seasonal', name: 'Seasonal', icon: '🌸', color: '#DDA0DD' },
  { id: 'regional', name: 'Regional', icon: '🗺', color: '#98D8C8' }
];

export const FESTIVAL_SEASONS = [
  { id: 'spring', name: 'Spring', months: ['March', 'April', 'May'], icon: '🌷', color: '#FF69B4' },
  { id: 'summer', name: 'Summer', months: ['June', 'July', 'August'], icon: '☀️', color: '#FFD700' },
  { id: 'monsoon', name: 'Monsoon', months: ['July', 'August', 'September'], icon: '🌧', color: '#4169E1' },
  { id: 'autumn', name: 'Autumn', months: ['September', 'October', 'November'], icon: '🍂', color: '#D2691E' },
  { id: 'winter', name: 'Winter', months: ['December', 'January', 'February'], icon: '❄️', color: '#87CEEB' },
  { id: 'post-monsoon', name: 'Post-Monsoon', months: ['October', 'November'], icon: '🌈', color: '#9370DB' }
];

export const CELEBRATION_TYPES = [
  { id: 'prayer', name: 'Prayer & Worship', icon: '🙏', description: 'Temple visits and special prayers' },
  { id: 'feast', name: 'Feast & Food', icon: '🍽', description: 'Special traditional dishes and sweets' },
  { id: 'decorations', name: 'Decorations', icon: '✨', description: 'Rangoli, lights, and flower decorations' },
  { id: 'dancing', name: 'Dancing & Music', icon: '💃', description: 'Traditional dances and music performances' },
  { id: 'procession', name: 'Processions', icon: '🚶', description: 'Street processions and parades' },
  { id: 'gifts', name: 'Gift Exchange', icon: '🎁', description: 'Sharing gifts and sweets with loved ones' },
  { id: 'fasting', name: 'Fasting', icon: '🍽', description: 'Religious fasting and penance' },
  { id: 'bonfire', name: 'Bonfire', icon: '🔥', description: 'Lighting bonfires and fireworks' }
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const FESTIVAL_RECIPES_TYPES = [
  { id: 'sweets', name: 'Sweets', icon: '🍬', color: '#FFB347' },
  { id: 'snacks', name: 'Snacks', icon: '🍘', color: '#4ECDC4' },
  { id: 'main-course', name: 'Main Course', icon: '🍛', color: '#FF6B6B' },
  { id: 'drinks', name: 'Drinks', icon: '🥤', color: '#45B7D1' },
  { id: 'savory', name: 'Savory', icon: '🧆', color: '#DDA0DD' }
];

export const REGIONS = [
  { id: 'north', name: 'North India', states: ['Delhi', 'UP', 'Punjab', 'Haryana', 'Rajasthan'], icon: '🏔' },
  { id: 'south', name: 'South India', states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'AP', 'Telangana'], icon: '🌴' },
  { id: 'east', name: 'East India', states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'Assam'], icon: '🌿' },
  { id: 'west', name: 'West India', states: ['Maharashtra', 'Gujarat', 'Goa', 'MP', 'Chhattisgarh'], icon: '🏖' },
  { id: 'central', name: 'Central India', states: ['MP', 'Chhattisgarh', 'Jharkhand'], icon: '🏛' },
  { id: 'northeast', name: 'Northeast India', states: ['Assam', 'Meghalaya', 'Mizoram', 'Nagaland'], icon: '🌺' }
];

export const HINDU_MONTHS = [
  { name: 'Chaitra', english: 'March-April', season: 'spring' },
  { name: 'Vaishakh', english: 'April-May', season: 'spring' },
  { name: 'Jyeshtha', english: 'May-June', season: 'summer' },
  { name: 'Ashadha', english: 'June-July', season: 'monsoon' },
  { name: 'Shravana', english: 'July-August', season: 'monsoon' },
  { name: 'Bhadrapada', english: 'August-September', season: 'monsoon' },
  { name: 'Ashwin', english: 'September-October', season: 'autumn' },
  { name: 'Kartik', english: 'October-November', season: 'autumn' },
  { name: 'Margashirsha', english: 'November-December', season: 'post-monsoon' },
  { name: 'Pausha', english: 'December-January', season: 'winter' },
  { name: 'Magha', english: 'January-February', season: 'winter' },
  { name: 'Phalguna', english: 'February-March', season: 'winter' }
];

export const FORMATTERS = {
  formatDate: (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  },
  formatShortDate: (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  },
  getDaysUntil: (date) => {
    const now = new Date();
    const target = new Date(date);
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },
  getSeasonColor: (season) => {
    const colors = {
      spring: '#FF69B4',
      summer: '#FFD700',
      monsoon: '#4169E1',
      autumn: '#D2691E',
      winter: '#87CEEB'
    };
    return colors[season] || '#94a3b8';
  }
};

export default {
  FESTIVAL_CATEGORIES,
  FESTIVAL_SEASONS,
  CELEBRATION_TYPES,
  MONTHS,
  FESTIVAL_RECIPES_TYPES,
  REGIONS,
  HINDU_MONTHS,
  FORMATTERS
};
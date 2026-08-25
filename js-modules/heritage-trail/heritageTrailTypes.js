export const HERITAGE_CATEGORIES = {
  temple: { label: 'Temple', icon: '🛕', color: '#ef4444', description: 'Sacred religious structures' },
  fort: { label: 'Fort', icon: '🏰', color: '#f97316', description: 'Military fortifications and palaces' },
  monument: { label: 'Monument', icon: '🗿', color: '#8b5cf6', description: 'Memorial structures and tombs' },
  cave: { label: 'Cave Art', icon: '🕳️', color: '#06b6d4', description: 'Ancient cave paintings and sculptures' },
  mosque: { label: 'Mosque', icon: '🕌', color: '#10b981', description: 'Islamic architectural heritage' },
  palace: { label: 'Palace', icon: '👑', color: '#f59e0b', description: 'Royal residences and complexes' },
  stupa: { label: 'Stupa', icon: '☸️', color: '#3b82f6', description: 'Buddhist commemorative monuments' },
  ghat: { label: 'Ghat', icon: '.steps', color: '#ec4899', description: 'Riverfront steps and bathing platforms' },
  port: { label: 'Ancient Port', icon: '⚓', color: '#0ea5e9', description: 'Historic maritime trade centers' },
  university: { label: 'Ancient University', icon: '📚', color: '#a855f7', description: 'Centers of ancient learning' },
};

export const HISTORICAL_PERIODS = {
  vedic: { label: 'Vedic Period', range: '1500-500 BCE', color: '#78350f' },
  maurya: { label: 'Maurya Empire', range: '322-185 BCE', color: '#b45309' },
  gupta: { label: 'Gupta Empire', range: '320-550 CE', color: '#047857' },
  pallava: { label: 'Pallava Dynasty', range: '275-897 CE', color: '#0369a1' },
  chola: { label: 'Chola Dynasty', range: '300-1279 CE', color: '#b91c1c' },
  chalukya: { label: 'Chalukya Dynasty', range: '543-753 CE', color: '#7c3aed' },
  vijayanagara: { label: 'Vijayanagara Empire', range: '1336-1646 CE', color: '#059669' },
  delhi_sultanate: { label: 'Delhi Sultanate', range: '1206-1526 CE', color: '#dc2626' },
  mughal: { label: 'Mughal Empire', range: '1526-1857 CE', color: '#ea580c' },
  british: { label: 'British Colonial', range: '1757-1947 CE', color: '#4338ca' },
  modern: { label: 'Post-Independence', range: '1947-Present', color: '#0d9488' },
};

export const REGIONS = {
  north: { label: 'North India', color: '#ef4444', states: ['Jammu & Kashmir', 'Himachal Pradesh', 'Punjab', 'Uttarakhand', 'Delhi', 'UP', 'Rajasthan', 'Haryana'] },
  south: { label: 'South India', color: '#3b82f6', states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'] },
  east: { label: 'East India', color: '#22c55e', states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'Assam'] },
  west: { label: 'West India', color: '#f59e0b', states: ['Maharashtra', 'Gujarat', 'Goa', 'Madhya Pradesh'] },
  central: { label: 'Central India', color: '#8b5cf6', states: ['Madhya Pradesh', 'Chhattisgarh'] },
  northeast: { label: 'Northeast India', color: '#ec4899', states: ['Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura', 'Arunachal Pradesh', 'Sikkim'] },
};

export const UNESCO_STATUS = {
  world_heritage: { label: 'UNESCO World Heritage', color: '#f59e0b', icon: '🌍' },
  tentative: { label: 'Tentative List', color: '#3b82f6', icon: '📋' },
  national: { label: 'National Importance', color: '#8b5cf6', icon: '🇮🇳' },
  state: { label: 'State Protected', color: '#22c55e', icon: '🏛️' },
};

export const VISITOR_RATINGS = {
  5: { label: 'Must Visit', color: '#22c55e', stars: '⭐⭐⭐⭐⭐' },
  4: { label: 'Highly Recommended', color: '#84cc16', stars: '⭐⭐⭐⭐' },
  3: { label: 'Worth Visiting', color: '#f59e0b', stars: '⭐⭐⭐' },
  2: { label: 'Niche Interest', color: '#f97316', stars: '⭐⭐' },
  1: { label: 'Basic', color: '#94a3b8', stars: '⭐' },
};

export const TRAIL_TYPES = {
  architectural: { label: 'Architectural Trail', icon: '🏛️', color: '#6366f1' },
  spiritual: { label: 'Spiritual Journey', icon: '🕉️', color: '#f59e0b' },
  historical: { label: 'Historical Route', icon: '📜', color: '#8b5cf6' },
  art_culture: { label: 'Art & Culture', icon: '🎨', color: '#ec4899' },
  nature_wildlife: { label: 'Nature & Wildlife', icon: '🌿', color: '#22c55e' },
  culinary: { label: 'Culinary Heritage', icon: '🍛', color: '#f97316' },
  maritime: { label: 'Maritime Heritage', icon: '⚓', color: '#0ea5e9' },
};

export const formatDistance = (km) => {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)} km`;
};

export const formatDuration = (hours) => {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

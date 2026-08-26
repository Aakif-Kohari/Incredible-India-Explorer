import {
  CUISINE_REGIONS,
  DISH_CATEGORIES,
  SPICE_LEVELS,
  DIETARY_TYPES,
  MEAL_OCCASIONS,
  CELEBRATIONS,
  COST_RANGES,
  INGREDIENTS,
} from './cuisineTypes.js';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, decimals = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomSubset = (arr, count) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

const INDIAN_DISHES = [
  { name: 'Butter Chicken', region: 'north_india', category: 'curry', spice: 'medium', dietary: ['non_veg'], state: 'Delhi', description: 'Creamy tomato-based curry with tender chicken pieces, a Mughlai classic.', calories: 480, prepTime: 45, cost: 'moderate', ingredients: ['Chicken', 'Butter', 'Cream', 'Tomatoes', 'Garam Masala', 'Kasuri Methi'], popularity: 95, rating: 4.8 },
  { name: 'Dosa', region: 'south_india', category: 'main_course', spice: 'mild', dietary: ['vegetarian', 'vegan'], state: 'Tamil Nadu', description: 'Crispy fermented rice crepe served with sambar and coconut chutney.', calories: 250, prepTime: 30, cost: 'budget', ingredients: ['Rice', 'Urad Dal', 'Fenugreek', 'Coconut', 'Toor Dal'], popularity: 92, rating: 4.7 },
  { name: 'Biryani', region: 'north_india', category: 'rice', spice: 'medium', dietary: ['non_veg'], state: 'Hyderabad', description: 'Fragrant basmati rice layered with spiced meat, saffron, and fried onions.', calories: 550, prepTime: 90, cost: 'moderate', ingredients: ['Basmati Rice', 'Chicken/Mutton', 'Saffron', 'Fried Onions', 'Whole Spices', 'Yogurt'], popularity: 94, rating: 4.9 },
  { name: 'Rogan Josh', region: 'north_india', category: 'curry', spice: 'hot', dietary: ['non_veg'], state: 'Kashmir', description: 'Aromatic Kashmiri lamb curry with deep red color from Kashmiri chili.', calories: 420, prepTime: 75, cost: 'premium', ingredients: ['Mutton', 'Kashmiri Chili', 'Yogurt', 'Onion', 'Ginger', 'Fennel'], popularity: 82, rating: 4.6 },
  { name: 'Masala Dosa', region: 'south_india', category: 'main_course', spice: 'mild', dietary: ['vegetarian', 'vegan'], state: 'Karnataka', description: 'Crispy dosa filled with spiced potato masala.', calories: 350, prepTime: 35, cost: 'budget', ingredients: ['Rice', 'Urad Dal', 'Potato', 'Onion', 'Mustard Seeds', 'Curry Leaves'], popularity: 90, rating: 4.7 },
  { name: 'Dhokla', region: 'west_india', category: 'snack', spice: 'mild', dietary: ['vegetarian', 'vegan', 'gluten_free'], state: 'Gujarat', description: 'Steamed fermented gram flour cake, light and fluffy.', calories: 180, prepTime: 40, cost: 'budget', ingredients: ['Gram Flour', 'Yogurt', 'Mustard Seeds', 'Curry Leaves', 'Green Chili'], popularity: 78, rating: 4.3 },
  { name: 'Pani Puri', region: 'west_india', category: 'street_food', spice: 'medium', dietary: ['vegetarian', 'vegan'], state: 'Maharashtra', description: 'Crispy hollow puris filled with spiced water, tamarind, and chickpeas.', calories: 150, prepTime: 25, cost: 'budget', ingredients: ['Semolina', 'Tamarind', 'Mint', 'Chickpeas', 'Potato', 'Chili'], popularity: 91, rating: 4.8 },
  { name: 'Sambar', region: 'south_india', category: 'curry', spice: 'medium', dietary: ['vegetarian', 'vegan'], state: 'Tamil Nadu', description: 'Lentil and vegetable stew with tamarind and sambar powder.', calories: 180, prepTime: 40, cost: 'budget', ingredients: ['Toor Dal', 'Tamarind', 'Sambar Powder', 'Vegetables', 'Mustard Seeds'], popularity: 85, rating: 4.5 },
  { name: 'Chole Bhature', region: 'north_india', category: 'main_course', spice: 'medium', dietary: ['vegetarian'], state: 'Punjab', description: 'Spiced chickpea curry served with deep-fried bread.', calories: 520, prepTime: 50, cost: 'moderate', ingredients: ['Chickpeas', 'Onion', 'Tomato', 'Chole Masala', 'Flour', 'Yogurt'], popularity: 88, rating: 4.6 },
  { name: 'Litti Chokha', region: 'east_india', category: 'main_course', spice: 'medium', dietary: ['vegetarian'], state: 'Bihar', description: 'Stuffed whole wheat balls with roasted eggplant and tomato mash.', calories: 400, prepTime: 60, cost: 'budget', ingredients: ['Whole Wheat', 'Sattu', 'Mustard Oil', 'Brinjal', 'Tomato', 'Garlic'], popularity: 72, rating: 4.4 },
  { name: 'Rasgulla', region: 'east_india', category: 'dessert', spice: 'mild', dietary: ['vegetarian'], state: 'West Bengal', description: 'Soft cottage cheese balls soaked in sugar syrup.', calories: 180, prepTime: 45, cost: 'budget', ingredients: ['Chenna (Cottage Cheese)', 'Sugar', 'Cardamom', 'Lemon Juice'], popularity: 80, rating: 4.5 },
  { name: 'Gulab Jamun', region: 'north_india', category: 'dessert', spice: 'mild', dietary: ['vegetarian'], state: 'Delhi', description: 'Deep-fried milk dumplings soaked in rose-flavored sugar syrup.', calories: 250, prepTime: 40, cost: 'budget', ingredients: ['Milk Powder', 'Flour', 'Ghee', 'Sugar', 'Rose Water', 'Cardamom'], popularity: 88, rating: 4.7 },
  { name: 'Vada Pav', region: 'west_india', category: 'street_food', spice: 'hot', dietary: ['vegetarian'], state: 'Maharashtra', description: 'Mumbai\'s iconic spiced potato fritter in a bun with chutneys.', calories: 350, prepTime: 25, cost: 'budget', ingredients: ['Potato', 'Gram Flour', 'Green Chili', 'Pav Bun', 'Garlic Chutney'], popularity: 89, rating: 4.6 },
  { name: 'Thali', region: 'west_india', category: 'sweet_meal', spice: 'medium', dietary: ['vegetarian'], state: 'Gujarat', description: 'Complete meal with multiple dishes served on a steel plate.', calories: 700, prepTime: 90, cost: 'moderate', ingredients: ['Rice', 'Dal', 'Roti', 'Sabzi', 'Pickle', 'Papad', 'Buttermilk'], popularity: 85, rating: 4.8 },
  { name: 'Idli Sambar', region: 'south_india', category: 'main_course', spice: 'mild', dietary: ['vegetarian', 'vegan'], state: 'Tamil Nadu', description: 'Steamed rice cakes served with sambar and chutneys.', calories: 200, prepTime: 35, cost: 'budget', ingredients: ['Rice', 'Urad Dal', 'Toor Dal', 'Vegetables', 'Coconut'], popularity: 86, rating: 4.5 },
  { name: 'Rogan Josh', region: 'north_india', category: 'curry', spice: 'hot', dietary: ['non_veg'], state: 'Kashmir', description: 'Slow-cooked lamb in aromatic Kashmiri spice blend.', calories: 420, prepTime: 75, cost: 'premium', ingredients: ['Lamb', 'Yogurt', 'Kashmiri Chili', 'Fennel', 'Ginger'], popularity: 82, rating: 4.6 },
  { name: 'Hyderabadi Biryani', region: 'south_india', category: 'rice', spice: 'medium', dietary: ['non_veg', 'halal'], state: 'Telangana', description: 'Dum-cooked layered rice and meat with saffron and herbs.', calories: 580, prepTime: 120, cost: 'premium', ingredients: ['Basmati Rice', 'Goat', 'Saffron', 'Mint', 'Fried Onions', 'Yogurt'], popularity: 93, rating: 4.9 },
  { name: 'Momos', region: 'northeast', category: 'appetizer', spice: 'medium', dietary: ['non_veg'], state: 'Sikkim', description: 'Steamed dumplings with spicy dipping sauce.', calories: 280, prepTime: 50, cost: 'budget', ingredients: ['Flour', 'Chicken', 'Cabbage', 'Onion', 'Soy Sauce', 'Garlic'], popularity: 84, rating: 4.5 },
  { name: 'Litti Chokha', region: 'east_india', category: 'main_course', spice: 'medium', dietary: ['vegetarian'], state: 'Jharkhand', description: 'Fire-roasted wheat balls with smoky eggplant mash.', calories: 400, prepTime: 60, cost: 'budget', ingredients: ['Sattu', 'Whole Wheat', 'Brinjal', 'Tomato', 'Mustard Oil'], popularity: 72, rating: 4.4 },
  { name: 'Kerala Fish Curry', region: 'south_india', category: 'sea_food', spice: 'hot', dietary: ['non_veg', 'gluten_free'], state: 'Kerala', description: 'Tangy fish curry cooked in coconut milk and kokum.', calories: 320, prepTime: 40, cost: 'moderate', ingredients: ['Fish', 'Coconut Milk', 'Kokum', 'Curry Leaves', 'Mustard Seeds'], popularity: 80, rating: 4.7 },
  { name: 'Dhokla', region: 'west_india', category: 'snack', spice: 'mild', dietary: ['vegetarian', 'gluten_free'], state: 'Gujarat', description: 'Spongy steamed gram flour cake with mustard tempering.', calories: 180, prepTime: 30, cost: 'budget', ingredients: ['Besan', 'Ginger', 'Green Chili', 'Mustard Seeds', 'Curry Leaves'], popularity: 78, rating: 4.3 },
  { name: 'Butter Naan', region: 'north_india', category: 'bread', spice: 'mild', dietary: ['vegetarian'], state: 'Delhi', description: 'Soft leavened bread brushed with butter, baked in tandoor.', calories: 320, prepTime: 30, cost: 'moderate', ingredients: ['Flour', 'Yogurt', 'Butter', 'Garlic', 'Nigella Seeds'], popularity: 87, rating: 4.6 },
  { name: 'Pongal', region: 'south_india', category: 'main_course', spice: 'mild', dietary: ['vegetarian'], state: 'Tamil Nadu', description: 'Comfort food of rice and moong dal with pepper and ghee.', calories: 300, prepTime: 35, cost: 'budget', ingredients: ['Rice', 'Moong Dal', 'Black Pepper', 'Ghee', 'Cashews', 'Curry Leaves'], popularity: 75, rating: 4.4 },
  { name: 'Thukpa', region: 'northeast', category: 'main_course', spice: 'medium', dietary: ['non_veg'], state: 'Arunachal Pradesh', description: 'Tibetan-style noodle soup with meat and vegetables.', calories: 350, prepTime: 40, cost: 'moderate', ingredients: ['Noodles', 'Chicken', 'Cabbage', 'Ginger', 'Soy Sauce', 'Garlic'], popularity: 68, rating: 4.3 },
  { name: 'Tandoori Chicken', region: 'north_india', category: 'appetizer', spice: 'hot', dietary: ['non_veg', 'gluten_free'], state: 'Delhi', description: 'Marinated chicken roasted in clay oven with yogurt and spices.', calories: 380, prepTime: 45, cost: 'moderate', ingredients: ['Chicken', 'Yogurt', 'Tandoori Masala', 'Lemon', 'Ginger-Garlic'], popularity: 90, rating: 4.7 },
  { name: 'Misal Pav', region: 'west_india', category: 'street_food', spice: 'very_hot', dietary: ['vegetarian'], state: 'Maharashtra', description: 'Spicy sprouted moth bean curry with bread and farsan.', calories: 400, prepTime: 45, cost: 'budget', ingredients: ['Moth Beans', 'Onion', 'Tomato', 'Farsan', 'Pav', 'Lemon'], popularity: 82, rating: 4.5 },
  { name: 'Aloo Paratha', region: 'north_india', category: 'bread', spice: 'medium', dietary: ['vegetarian'], state: 'Punjab', description: 'Stuffed whole wheat flatbread with spiced potato filling.', calories: 350, prepTime: 30, cost: 'budget', ingredients: ['Whole Wheat', 'Potato', 'Onion', 'Green Chili', 'Coriander', 'Ghee'], popularity: 86, rating: 4.6 },
  { name: 'Appam', region: 'south_india', category: 'bread', spice: 'mild', dietary: ['vegetarian', 'vegan', 'gluten_free'], state: 'Kerala', description: 'Lacy rice pancake with soft center, served with stew.', calories: 200, prepTime: 35, cost: 'budget', ingredients: ['Rice', 'Coconut', 'Yeast', 'Sugar'], popularity: 74, rating: 4.4 },
  { name: 'Bisi Bele Bath', region: 'south_india', category: 'rice', spice: 'medium', dietary: ['vegetarian'], state: 'Karnataka', description: 'Spiced rice-lentil dish with vegetables and sambar powder.', calories: 380, prepTime: 40, cost: 'budget', ingredients: ['Rice', 'Toor Dal', 'Vegetables', 'Bisi Bele Bath Powder', 'Ghee'], popularity: 72, rating: 4.5 },
  { name: 'Chole Bhature', region: 'north_india', category: 'main_course', spice: 'medium', dietary: ['vegetarian'], state: 'Delhi', description: 'Spiced chickpea curry with fluffy deep-fried bread.', calories: 520, prepTime: 50, cost: 'moderate', ingredients: ['Chickpeas', 'Onion', 'Tomato', 'Chole Masala', 'Flour'], popularity: 88, rating: 4.6 },
  { name: 'Pav Bhaji', region: 'west_india', category: 'street_food', spice: 'medium', dietary: ['vegetarian'], state: 'Maharashtra', description: 'Spiced mashed vegetable curry with buttered bread rolls.', calories: 420, prepTime: 35, cost: 'budget', ingredients: ['Potato', 'Tomato', 'Onion', 'Capsicum', 'Pav', 'Butter', 'Pav Bhaji Masala'], popularity: 87, rating: 4.7 },
  { name: 'Shrikhand', region: 'west_india', category: 'dessert', spice: 'mild', dietary: ['vegetarian'], state: 'Gujarat', description: 'Sweetened strained yogurt with saffron and cardamom.', calories: 220, prepTime: 15, cost: 'budget', ingredients: ['Yogurt', 'Sugar', 'Saffron', 'Cardamom', 'Pistachio'], popularity: 76, rating: 4.4 },
  { name: 'Malai Kofta', region: 'north_india', category: 'curry', spice: 'mild', dietary: ['vegetarian'], state: 'Delhi', description: 'Paneer and potato dumplings in rich creamy tomato gravy.', calories: 450, prepTime: 50, cost: 'moderate', ingredients: ['Paneer', 'Potato', 'Cream', 'Tomato', 'Cashew', 'Spices'], popularity: 80, rating: 4.5 },
  { name: 'Puchka', region: 'east_india', category: 'street_food', spice: 'hot', dietary: ['vegetarian', 'vegan'], state: 'West Bengal', description: 'Bengali version of pani puri with tangy tamarind water.', calories: 150, prepTime: 30, cost: 'budget', ingredients: ['Semolina', 'Tamarind', 'Potato', 'Chickpeas', 'Chili'], popularity: 85, rating: 4.7 },
  { name: 'Poha', region: 'central_india', category: 'main_course', spice: 'mild', dietary: ['vegetarian', 'vegan', 'gluten_free'], state: 'MP', description: 'Flattened rice with onions, peanuts, and curry leaves.', calories: 220, prepTime: 15, cost: 'budget', ingredients: ['Flattened Rice', 'Onion', 'Peanuts', 'Curry Leaves', 'Mustard Seeds', 'Lemon'], popularity: 80, rating: 4.4 },
  { name: 'Bhutte Ka Kees', region: 'central_india', category: 'main_course', spice: 'medium', dietary: ['vegetarian'], state: 'MP', description: 'Grated corn cooked with milk, spices, and mustard tempering.', calories: 280, prepTime: 25, cost: 'budget', ingredients: ['Corn', 'Milk', 'Green Chili', 'Mustard Seeds', 'Curry Leaves', 'Ghee'], popularity: 65, rating: 4.2 },
  { name: 'Kadhi Chawal', region: 'north_india', category: 'curry', spice: 'medium', dietary: ['vegetarian'], state: 'Haryana', description: 'Tangy yogurt-based curry with pakoras, served with rice.', calories: 380, prepTime: 45, cost: 'budget', ingredients: ['Yogurt', 'Gram Flour', 'Onion', 'Curry Leaves', 'Mustard Seeds', 'Rice'], popularity: 78, rating: 4.4 },
  { name: 'Jalebi', region: 'north_india', category: 'dessert', spice: 'mild', dietary: ['vegetarian'], state: 'Delhi', description: 'Crispy spiral-shaped sweets soaked in saffron sugar syrup.', calories: 300, prepTime: 30, cost: 'budget', ingredients: ['Flour', 'Yogurt', 'Sugar', 'Saffron', 'Ghee'], popularity: 82, rating: 4.5 },
  { name: 'Pani Puri', region: 'central_india', category: 'street_food', spice: 'hot', dietary: ['vegetarian', 'vegan'], state: 'MP', description: 'Local variation with extra spicy mint water.', calories: 150, prepTime: 25, cost: 'budget', ingredients: ['Semolina', 'Tamarind', 'Mint', 'Chickpeas', 'Potato'], popularity: 85, rating: 4.6 },
  { name: 'Dhokla', region: 'west_india', category: 'snack', spice: 'mild', dietary: ['vegetarian', 'gluten_free'], state: 'Goa', description: 'Goan variation with coconut and jaggery tempering.', calories: 190, prepTime: 30, cost: 'budget', ingredients: ['Besan', 'Coconut', 'Jaggery', 'Mustard Seeds', 'Curry Leaves'], popularity: 70, rating: 4.2 },
  { name: 'Thukpa', region: 'northeast', category: 'main_course', spice: 'medium', dietary: ['non_veg'], state: 'Nagaland', description: 'Naga-style noodle soup with smoked meat and bamboo shoots.', calories: 380, prepTime: 45, cost: 'moderate', ingredients: ['Noodles', 'Smoked Meat', 'Bamboo Shoots', 'Ginger', 'Chili'], popularity: 65, rating: 4.3 },
];

export const generateCuisineDishes = (count = 35) => {
  return INDIAN_DISHES.slice(0, count).map((dish, i) => ({
    id: `dish-${i}`,
    ...dish,
    regionConfig: CUISINE_REGIONS[dish.region] || CUISINE_REGIONS.north_india,
    categoryConfig: DISH_CATEGORIES[dish.category] || DISH_CATEGORIES.main_course,
    spiceConfig: SPICE_LEVELS[dish.spice] || SPICE_LEVELS.medium,
    costConfig: COST_RANGES[dish.cost] || COST_RANGES.moderate,
    dietaryConfigs: dish.dietary.map(d => DIETARY_TYPES[d] || DIETARY_TYPES.vegetarian),
    trending: Math.random() > 0.7,
    featured: Math.random() > 0.8,
    regions: randomSubset(Object.keys(CUISINE_REGIONS), randomInt(1, 3)),
  }));
};

export const generateRegionBreakdown = (dishes) => {
  return Object.entries(CUISINE_REGIONS).map(([key, config]) => {
    const regionDishes = dishes.filter(d => d.region === key);
    return {
      region: key,
      ...config,
      dishCount: regionDishes.length,
      avgRating: regionDishes.length > 0 ? (regionDishes.reduce((s, d) => s + d.rating, 0) / regionDishes.length).toFixed(1) : '0',
      avgCalories: regionDishes.length > 0 ? Math.round(regionDishes.reduce((s, d) => s + d.calories, 0) / regionDishes.length) : 0,
      topDish: regionDishes.length > 0 ? regionDishes.sort((a, b) => b.popularity - a.popularity)[0]?.name : 'N/A',
      vegetarianPercent: regionDishes.length > 0 ? Math.round(regionDishes.filter(d => d.dietary.includes('vegetarian')).length / regionDishes.length * 100) : 0,
    };
  }).sort((a, b) => b.dishCount - a.dishCount);
};

export const generateSpiceHeatmap = (dishes) => {
  const regions = Object.keys(CUISINE_REGIONS);
  const spices = Object.keys(SPICE_LEVELS);
  return regions.map(region => {
    const regionDishes = dishes.filter(d => d.region === region);
    const counts = {};
    spices.forEach(s => { counts[s] = regionDishes.filter(d => d.spice === s).length; });
    return { region, ...counts, total: regionDishes.length };
  });
};

export const generateNutritionData = (dishes) => {
  return dishes.slice(0, 15).map(d => ({
    name: d.name,
    calories: d.calories,
    category: d.categoryConfig?.label || d.category,
    color: d.categoryConfig?.color || '#6366f1',
    spiceLevel: Object.keys({ mild: 1, medium: 2, hot: 3, very_hot: 4, extreme: 5 }).indexOf(d.spice) + 1,
  }));
};

export const generateFestivalData = () => {
  return Object.entries(CELEBRATIONS).map(([key, config]) => ({
    festival: key,
    ...config,
    specialDishes: config.dishes.length,
    avgPrepTime: randomInt(30, 120),
    popularity: randomFloat(70, 98),
  }));
};

export const generateIngredientFrequency = (dishes) => {
  const freq = {};
  dishes.forEach(d => {
    d.ingredients.forEach(ing => {
      freq[ing] = (freq[ing] || 0) + 1;
    });
  });
  return Object.entries(freq)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
};

export const CUISINE_REGIONS = {
  north_india: { label: 'North India', icon: '🫓', color: '#ef4444', states: ['Punjab', 'UP', 'Rajasthan', 'Delhi', 'Haryana', 'HP', 'J&K', 'Uttarakhand'] },
  south_india: { label: 'South India', icon: '🥘', color: '#3b82f6', states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'AP', 'Telangana'] },
  east_india: { label: 'East India', icon: '🐟', color: '#22c55e', states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'Assam'] },
  west_india: { label: 'West India', icon: '🍛', color: '#f59e0b', states: ['Maharashtra', 'Gujarat', 'Goa', 'MP'] },
  northeast: { label: 'Northeast India', icon: '🌶️', color: '#ec4899', states: ['Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura', 'Sikkim'] },
  central_india: { label: 'Central India', icon: '🍲', color: '#8b5cf6', states: ['MP', 'Chhattisgarh'] },
};

export const DISH_CATEGORIES = {
  main_course: { label: 'Main Course', icon: '🍛', color: '#ef4444' },
  appetizer: { label: 'Appetizer / Starter', icon: '🥟', color: '#f97316' },
  bread: { label: 'Bread / Roti', icon: '🫓', color: '#f59e0b' },
  rice: { label: 'Rice Dish', icon: '🍚', color: '#84cc16' },
  dessert: { label: 'Dessert / Sweet', icon: '🍮', color: '#ec4899' },
  beverage: { label: 'Beverage', icon: '🍵', color: '#06b6d4' },
  street_food: { label: 'Street Food', icon: '🌮', color: '#f97316' },
  snack: { label: 'Snack / Chaat', icon: '🍘', color: '#8b5cf6' },
  curry: { label: 'Curry / Gravy', icon: '🫕', color: '#ef4444' },
  pickle_condiment: { label: 'Pickle / Condiment', icon: '🫙', color: '#22c55e' },
  sea_food: { label: 'Seafood', icon: '🦐', color: '#0ea5e9' },
  sweet_meal: { label: 'Thali / Full Meal', icon: '🍽️', color: '#a855f7' },
};

export const SPICE_LEVELS = {
  mild: { label: 'Mild', icon: '🌶️', color: '#22c55e', scoville: '< 1,000 SHU' },
  medium: { label: 'Medium', icon: '🌶️🌶️', color: '#f59e0b', scoville: '1,000 - 10,000 SHU' },
  hot: { label: 'Hot', icon: '🌶️🌶️🌶️', color: '#f97316', scoville: '10,000 - 100,000 SHU' },
  very_hot: { label: 'Very Hot', icon: '🔥', color: '#ef4444', scoville: '100,000+ SHU' },
  extreme: { label: 'Extreme', icon: '💀', color: '#dc2626', scoville: '500,000+ SHU' },
};

export const DIETARY_TYPES = {
  vegetarian: { label: 'Vegetarian', icon: '🥬', color: '#22c55e', description: 'No meat, may contain dairy' },
  vegan: { label: 'Vegan', icon: '🌱', color: '#84cc16', description: 'No animal products' },
  jain: { label: 'Jain', icon: '🙏', color: '#a855f7', description: 'No root vegetables, no after sunset' },
  gluten_free: { label: 'Gluten-Free', icon: '🌾', color: '#f59e0b', description: 'No wheat or gluten' },
  non_veg: { label: 'Non-Vegetarian', icon: '🍗', color: '#ef4444', description: 'Contains meat or fish' },
  halal: { label: 'Halal', icon: '☪️', color: '#3b82f6', description: 'Halal certified' },
};

export const MEAL_OCCASIONS = {
  breakfast: { label: 'Breakfast', icon: '🌅', time: '6 AM - 10 AM', color: '#f59e0b' },
  lunch: { label: 'Lunch', icon: '☀️', time: '12 PM - 3 PM', color: '#ef4444' },
  snacks: { label: 'Evening Snacks', icon: '🌆', time: '4 PM - 7 PM', color: '#8b5cf6' },
  dinner: { label: 'Dinner', icon: '🌙', time: '7 PM - 11 PM', color: '#6366f1' },
  festive: { label: 'Festive Special', icon: '🎉', time: 'Celebrations', color: '#ec4899' },
};

export const INGREDIENTS = {
  spices: ['Turmeric', 'Cumin', 'Coriander', 'Cardamom', 'Cloves', 'Cinnamon', 'Mustard Seeds', 'Fenugreek', 'Asafoetida', 'Garam Masala', 'Red Chili', 'Black Pepper', 'Saffron', 'Bay Leaf', 'Fennel'],
  herbs: ['Cilantro', 'Mint', 'Curry Leaves', 'Basil', 'Dill', 'Methi Leaves'],
  staples: ['Rice', 'Wheat', 'Lentils (Dal)', 'Chickpeas', 'Paneer', 'Coconut', 'Tamarind', 'Jaggery', 'Ghee', 'Mustard Oil'],
  proteins: ['Chicken', 'Mutton', 'Fish', 'Prawns', 'Eggs', 'Soya Chunks', 'Paneer', 'Tofu'],
};

export const CELEBRATIONS = {
  diwali: { label: 'Diwali', icon: '🪔', month: 'Oct-Nov', dishes: ['Samosa', 'Gulab Jamun', 'Kheer', 'Chakli', 'Ladoo'] },
  holi: { label: 'Holi', icon: '🎨', month: 'Mar', dishes: ['Gujiya', 'Thandai', 'Dahi Bhalla', 'Puran Poli'] },
  pongal: { label: 'Pongal', icon: '🌾', month: 'Jan', dishes: ['Ven Pongal', 'Sakkarai Pongal', 'Ven Pongal'] },
  onam: { label: 'Onam', icon: '🌺', month: 'Aug-Sep', dishes: ['Sadya', 'Avial', 'Payasam', 'Appam'] },
  eid: { label: 'Eid', icon: '🌙', month: 'Variable', dishes: ['Sheer Khurma', 'Biryani', 'Haleem', 'Kebab'] },
  navratri: { label: 'Navratri', icon: '💃', month: 'Sep-Oct', dishes: ['Sabudana Khichdi', 'Kuttu Ki Puri', 'Singhare Ka Halwa'] },
};

export const COST_RANGES = {
  budget: { label: 'Budget', icon: '💰', range: '₹50-200', color: '#22c55e' },
  moderate: { label: 'Moderate', icon: '💰💰', range: '₹200-500', color: '#f59e0b' },
  premium: { label: 'Premium', icon: '💰💰💰', range: '₹500-1500', color: '#f97316' },
  luxury: { label: 'Luxury', icon: '💰💰💰💰', range: '₹1500+', color: '#ef4444' },
};

export const formatCalories = (cal) => `${cal} kcal`;
export const formatPrepTime = (mins) => mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h ${mins % 60}m`;

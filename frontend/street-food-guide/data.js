const streetFoods = [
  {
    name: "Vada Pav",
    state: "Maharashtra",
    region: "West India",
    origin: "Mumbai, Maharashtra",
    category: "Snacks",
    description: "A spiced potato fritter served inside a pav with chutneys.",
    ingredients: ["Potato", "Gram flour", "Pav", "Green chilli", "Garlic", "Chutneys", "Spices"],
    history: "Often referred to as the Indian burger, Vada Pav was born in the bustling streets of Mumbai in the 1960s to cater to mill workers who needed a quick, cheap, and filling meal."
  },
  {
    name: "Pani Puri / Puchka",
    state: "Multiple States",
    region: "All India",
    origin: "Uttar Pradesh / Bihar",
    category: "Snacks",
    description: "Hollow, crispy puris filled with a mixture of flavored water, tamarind chutney, chilli, chaat masala, potato, onion or chickpeas.",
    ingredients: ["Semolina/Flour Puri", "Tamarind water", "Mint-coriander water", "Potato", "Chickpeas", "Spices"],
    history: "Also known as Golgappa in the North and Puchka in the East, this quintessential street food has origins dating back to ancient India, specifically the Magadha region."
  },
  {
    name: "Chole Bhature",
    state: "Delhi",
    region: "North India",
    origin: "Delhi / Punjab",
    category: "Meals",
    description: "A combination of chana masala (spicy white chickpeas) and bhatura, a fried bread made from maida flour.",
    ingredients: ["White Chickpeas", "Maida (Refined Flour)", "Onion", "Tomato", "Spices", "Ghee/Oil"],
    history: "A staple breakfast dish in Northern India, especially Delhi, it gained popularity after the partition of India when Punjabi refugees set up food stalls."
  },
  {
    name: "Samosa",
    state: "Multiple States",
    region: "North India",
    origin: "Middle East / North India",
    category: "Snacks",
    description: "A fried or baked pastry with a savory filling, including ingredients such as spiced potatoes, onions, peas, or meat.",
    ingredients: ["Maida", "Potato", "Peas", "Spices", "Oil"],
    history: "Introduced to the Indian subcontinent in the 13th or 14th century by traders from Central Asia, it was adapted with local spices to become a beloved Indian snack."
  },
  {
    name: "Pav Bhaji",
    state: "Maharashtra",
    region: "West India",
    origin: "Mumbai, Maharashtra",
    category: "Meals",
    description: "A thick vegetable curry served with a soft bread roll (pav).",
    ingredients: ["Potato", "Tomato", "Peas", "Capsicum", "Pav", "Butter", "Pav Bhaji Masala"],
    history: "Originated in the 1850s as a fast lunchtime dish for textile mill workers in Mumbai. It is now a famous street food across India."
  },
  {
    name: "Kathi Roll",
    state: "West Bengal",
    region: "East India",
    origin: "Kolkata, West Bengal",
    category: "Snacks",
    description: "A street-food dish originating from Kolkata, basically a skewer-roasted kebab wrapped in a paratha bread.",
    ingredients: ["Paratha", "Egg/Paneer/Chicken", "Onion", "Green Chilli", "Sauces"],
    history: "Invented at Nizam's in Kolkata during the early 20th century to serve British patrons a kebab they could eat without dirtying their hands."
  },
  {
    name: "Aloo Tikki",
    state: "Uttar Pradesh",
    region: "North India",
    origin: "North India",
    category: "Snacks",
    description: "A snack made out of boiled potatoes, peas, and various curry spices.",
    ingredients: ["Potato", "Peas", "Spices", "Oil", "Chutneys", "Yogurt"],
    history: "A staple in North Indian chaat stalls, often served with a sweet tamarind-jaggery chutney and green mint chutney."
  },
  {
    name: "Poha Jalebi",
    state: "Madhya Pradesh",
    region: "Central India",
    origin: "Indore, Madhya Pradesh",
    category: "Snacks",
    description: "Flattened rice cooked with spices and onions, served with sweet, crispy jalebis.",
    ingredients: ["Flattened Rice (Poha)", "Onion", "Mustard seeds", "Turmeric", "Jalebi (Sugar, Maida)"],
    history: "A unique combination of sweet and savory that represents the culinary culture of Indore and Bhopal."
  },
  {
    name: "Litti Chokha",
    state: "Bihar",
    region: "East India",
    origin: "Bihar",
    category: "Meals",
    description: "Dough balls made of whole wheat flour and stuffed with sattu, roasted over coal, and served with a mash of potatoes, tomatoes, and eggplant.",
    ingredients: ["Wheat flour", "Sattu (roasted gram flour)", "Eggplant", "Potato", "Tomato", "Mustard oil", "Garlic"],
    history: "A traditional dish of Bihar that requires minimal utensils to prepare, making it a historic staple for travelers and farmers."
  },
  {
    name: "Misal Pav",
    state: "Maharashtra",
    region: "West India",
    origin: "Pune / Kolhapur, Maharashtra",
    category: "Meals",
    description: "A spicy curry usually made of moth beans (misal) topped with farsan or sev, onions, lemon and coriander, served with pav.",
    ingredients: ["Moth beans", "Onion", "Tomato", "Farsan (namkeen)", "Pav", "Spices"],
    history: "A highly popular dish representing the robust and fiery flavors of Maharashtrian cuisine, often served as breakfast."
  },
  {
    name: "Dabeli",
    state: "Gujarat",
    region: "West India",
    origin: "Kutch, Gujarat",
    category: "Snacks",
    description: "A sweet and spicy potato mixture filled in a pav, along with pomegranate, roasted peanuts, and chutneys.",
    ingredients: ["Potato", "Dabeli Masala", "Pav", "Pomegranate", "Peanuts", "Sev", "Tamarind chutney"],
    history: "Invented by Keshavji Gabha Chudasama in Mandvi, Kutch in the 1960s, it translates to 'pressed' in Gujarati."
  },
  {
    name: "Kachori",
    state: "Rajasthan",
    region: "North India",
    origin: "Rajasthan / Uttar Pradesh",
    category: "Snacks",
    description: "A spicy deep-fried snack, often stuffed with a baked mixture of yellow moong dal or urad dal, besan, black pepper, and other spices.",
    ingredients: ["Maida", "Moong Dal/Onion", "Spices", "Oil", "Chutneys"],
    history: "Has ancient origins in the Indian subcontinent. The famous 'Pyaaz Ki Kachori' originated in Jodhpur, Rajasthan."
  },
  {
    name: "Momos",
    state: "Sikkim",
    region: "Northeast India",
    origin: "Tibet / Nepal / Northeast India",
    category: "Snacks",
    description: "Steamed dumplings with meat or vegetable fillings, served with a fiery red chilli chutney.",
    ingredients: ["Flour wrapper", "Cabbage/Carrot/Meat", "Onion", "Garlic", "Spicy Chilli Sauce"],
    history: "Originally a Tibetan dish, momos migrated to India and became incredibly popular across the Himalayan region and eventually nationwide."
  },
  {
    name: "Idli / Medu Vada",
    state: "Tamil Nadu",
    region: "South India",
    origin: "South India",
    category: "Meals",
    description: "Steamed rice cakes (Idli) and deep-fried lentil doughnuts (Vada) served with sambar and coconut chutney.",
    ingredients: ["Rice", "Urad Dal", "Coconut", "Lentils", "Spices", "Tamarind"],
    history: "Idli has been documented in Indian literature since the 10th century. Today, it is the cornerstone of South Indian breakfast and street food."
  },
  {
    name: "Mirchi Bajji",
    state: "Andhra Pradesh",
    region: "South India",
    origin: "Hyderabad / Andhra Pradesh",
    category: "Spicy",
    description: "Large green chillies stuffed with a tangy tamarind mixture, dipped in gram flour batter and deep-fried.",
    ingredients: ["Large Green Chillies", "Gram Flour", "Tamarind", "Spices", "Onion"],
    history: "A popular evening snack across South India, especially famous in coastal Andhra and Hyderabad for its fiery kick."
  },
  {
    name: "Aloo Chaat",
    state: "Delhi",
    region: "North India",
    origin: "North India",
    category: "Snacks",
    description: "Fried potato pieces tossed with spices, chutneys, and lemon juice.",
    ingredients: ["Potato", "Chaat Masala", "Lemon", "Tamarind Chutney", "Mint Chutney"],
    history: "A vibrant street food that captures the essence of Delhi's bustling street markets."
  },
  {
    name: "Jhalmuri",
    state: "West Bengal",
    region: "East India",
    origin: "Kolkata, West Bengal",
    category: "Snacks",
    description: "A spicy and tangy puffed rice snack mixed with mustard oil, onions, tomatoes, green chillies, and spice powders.",
    ingredients: ["Puffed Rice (Muri)", "Mustard Oil", "Onion", "Tomato", "Green Chilli", "Chanachur"],
    history: "A staple snack of Kolkata, sold in paper cones by street vendors, particularly on local trains and outside schools."
  }
];

export { streetFoods };

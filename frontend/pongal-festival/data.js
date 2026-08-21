/* ==========================================================================
   Pongal Festival Data
   Comprehensive dataset for the 4 days, Kolam traditions, and foods.
   ========================================================================== */

const pongalTimeline = [
    {
        day: 'Day 1',
        title: 'Bhogi',
        desc: 'The day of cleansing. Old clothes and materials are discarded and burnt in a bonfire, symbolizing the destruction of evil and the welcoming of new beginnings.'
    },
    { day: 'Day 2', title: 'Thai Pongal', desc: 'The main day of the festival. Fresh rice is boiled in milk and jaggery in a new clay pot outdoors. When it boils over, people shout "Pongalo Pongal!" to invite prosperity.' },
    { day: 'Day 3', title: 'Mattu Pongal', desc: 'Dedicated to cattle. Bulls and cows are bathed, their horns painted, and adorned with flowers and beads to thank them for their role in agriculture.' },
    { day: 'Day 4', title: 'Kaanum Pongal', desc: 'The day of socializing and family reunions. People visit relatives, exchange gifts, and enjoy picnics. In some regions, the traditional bull-taming sport Jallikattu is held.' }
];

const kolamTraditions = [
    { id: 'kolam', title: 'Kolam (Rice Flour Patterns)', desc: 'Intricate geometric and floral patterns drawn at the entrance of homes using rice flour. It is believed to bring prosperity and feed ants and insects.' },
    { id: 'sugarcane', title: 'Sugarcane Stalks', desc: 'Bundles of fresh sugarcane are tied to the entrances of homes, representing the sweetness of life and the harvest season.' },
    { id: 'mango-leaves', title: 'Mango Leaf Torans', desc: 'Garlands of fresh mango leaves are hung across doorways. They are considered auspicious and act as natural air purifiers.' },
    { id: 'clay-pots', title: 'Decorated Clay Pots', desc: 'The Pongal panai (clay pot) is painted with turmeric, adorned with ginger roots and mango leaves, and used to cook the sacred dish.' }
];

const pongalFoods = [
    { name: 'Sakkarai Pongal', type: 'Sweet Dish', desc: 'The signature sweet dish made of freshly harvested rice, roasted moong dal, jaggery, cardamom, and generous amounts of ghee, garnished with cashews and raisins.' },
    { name: 'Ven Pongal', type: 'Savory Dish', desc: 'A comforting, savory version of the dish made with rice, moong dal, cumin, black pepper, and ginger, heavily tempered with ghee and curry leaves.' },
    { name: 'Vadai', type: 'Snack', desc: 'Crispy, savory lentil fritters (Medu Vadai or Masala Vadai) served alongside coconut chutney and sambar.' },
    { name: 'Payasam', type: 'Dessert', desc: 'A rich milk-based dessert made with vermicelli or dal, sweetened with jaggery or sugar, and flavored with cardamom and nuts.' },
    { name: 'Avial', type: 'Mixed Veg', desc: 'A thick, coconut-based vegetable stew made with a variety of local harvest vegetables, tamarind, and curry leaves.' }
];

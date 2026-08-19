/**
 * Indian Culinary Engine
 * Cuisine schemas, spice meter calculators, and food trail builders.
 */

export interface DishItem {
    id: string;
    name: string;
    state: string;
    dietary: 'Veg' | 'Non-Veg' | 'Jain Friendly';
    spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Extra Spicy';
    popularHub: string;
    description: string;
}

export const MOCK_INDIAN_DISHES: DishItem[] = [
    {
        id: "dish_1",
        name: "Chole Bhature & Lassi",
        state: "Punjab / Delhi",
        dietary: "Veg",
        spiceLevel: "Medium",
        popularHub: "Chandni Chowk, Old Delhi",
        description: "Fluffy fried sourdough bread served with spicy chickpea curry, pickled onions, and chilled sweet lassi."
    },
    {
        id: "dish_2",
        name: "Masala Dosa & Filter Coffee",
        state: "Tamil Nadu / Karnataka",
        dietary: "Veg",
        spiceLevel: "Mild",
        popularHub: "Malleswaram, Bengaluru",
        description: "Crispy fermented rice crepe filled with spiced potato mash, served with coconut chutney and hot sambar."
    },
    {
        id: "dish_3",
        name: "Hyderabadi Dum Biryani",
        state: "Telangana",
        dietary: "Non-Veg",
        spiceLevel: "Hot",
        popularHub: "Charminar, Hyderabad",
        description: "Fragrant basmati rice slow-cooked with marinated spiced meat, saffron, and fried onions in sealed clay pots."
    }
];

export const filterDishesByDiet = (dishes: DishItem[], dietary: string): DishItem[] => {
    if (dietary === 'All') return dishes;
    return dishes.filter(d => d.dietary === dietary);
};

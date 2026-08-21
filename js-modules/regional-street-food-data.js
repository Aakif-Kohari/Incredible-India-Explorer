/**
 * regional-street-food-data.js
 * Comprehensive Data Repository for Indian Regional Street Foods
 * Contains state taxonomy maps, culinary history notes, and nutritional profiles.
 */

export const REGIONAL_FOOD_TAXONOMY = {
    "North": ["Delhi NCR", "Punjab", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Uttarakhand", "Uttar Pradesh"],
    "South": ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"],
    "East": ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
    "West": ["Maharashtra", "Gujarat", "Rajasthan", "Goa"],
    "Central": ["Madhya Pradesh", "Chhattisgarh"],
    "North-East": ["Assam", "Sikkim", "Nagaland", "Meghalaya", "Manipur", "Mizoram", "Tripura", "Arunachal Pradesh"]
};

export const CULINARY_HERITAGE_NOTES = [
    {
        region: "West",
        note: "Street food in Maharashtra and Gujarat emphasizes quick portable snacks using fermented batters, roasted pulse powders (besan/sattu), and garlic chutneys."
    },
    {
        region: "North",
        note: "Heavy use of whole spices, slow-simmered legumes (Chole/Rajma), tandoori charcoal roasting, and rich ghee-laden breads."
    },
    {
        region: "East",
        note: "Pungent mustard oil temperings, river fish curries, poppy seed pastes, and sweet milk chhena preparations."
    },
    {
        region: "South",
        note: "Fermented rice-lentil batters, coconut oil temperings, fresh curry leaves, mustard seeds, and sour tamarind broths."
    }
];

export const getTaxonomyByRegion = (regionName) => {
    return REGIONAL_FOOD_TAXONOMY[regionName] || [];
};

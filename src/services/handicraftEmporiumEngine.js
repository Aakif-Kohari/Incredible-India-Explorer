/**
 * Handicraft Emporium Engine
 * Artisan craft schemas, GI tag verifiers, and cart total calculators.
 */

export interface CraftItem {
    id: string;
    name: string;
    state: string;
    category: 'Silk & Textile' | 'Pottery' | 'Woodwork' | 'Metalcraft';
    isGiTagged: boolean;
    artisanCluster: string;
    priceINR: number;
    description: string;
}

export const MOCK_HANDICRAFTS: CraftItem[] = [
    {
        id: "craft_1",
        name: "Pashmina Shawl",
        state: "Jammu & Kashmir",
        category: "Silk & Textile",
        isGiTagged: true,
        artisanCluster: "Srinagar Weavers",
        priceINR: 12500,
        description: "Hand-spun ultra-fine Cashmere wool hand-woven by master Kashmiri artisans using century-old looms."
    },
    {
        id: "craft_2",
        name: "Blue Pottery Craft",
        state: "Rajasthan",
        category: "Pottery",
        isGiTagged: true,
        artisanCluster: "Jaipur Artisans",
        priceINR: 1800,
        description: "Distinctive Turko-Persian glazed pottery made using quartz powder and cobalt oxide dye."
    },
    {
        id: "craft_3",
        name: "Bidriware Metalwork",
        state: "Karnataka",
        category: "Metalcraft",
        isGiTagged: true,
        artisanCluster: "Bidar Metal Guild",
        priceINR: 3400,
        description: "Blackened zinc-copper alloy inlaid with pure silver wire calligraphy and geometric motifs."
    }
];

export const calculateCraftCartTotal = (itemIds: string[], crafts: CraftItem[]): number => {
    return crafts
        .filter(c => itemIds.includes(c.id))
        .reduce((sum, c) => sum + c.priceINR, 0);
};

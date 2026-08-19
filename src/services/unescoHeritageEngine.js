/**
 * UNESCO Heritage Engine
 * Heritage site data schemas, category filters, and itinerary cost calculators.
 */

export interface UnescoSiteItem {
    id: string;
    name: string;
    state: string;
    category: 'Cultural' | 'Natural' | 'Mixed';
    designatedYear: number;
    description: string;
    estimatedCostINR: number;
}

export const MOCK_UNESCO_SITES: UnescoSiteItem[] = [
    {
        id: "site_1",
        name: "Taj Mahal",
        state: "Uttar Pradesh",
        category: "Cultural",
        designatedYear: 1983,
        description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan.",
        estimatedCostINR: 2500
    },
    {
        id: "site_2",
        name: "Kaziranga National Park",
        state: "Assam",
        category: "Natural",
        designatedYear: 1985,
        description: "Home to the world's largest population of great one-horned rhinoceroses and vibrant wetland ecosystems.",
        estimatedCostINR: 4500
    },
    {
        id: "site_3",
        name: "Group of Monuments at Hampi",
        state: "Karnataka",
        category: "Cultural",
        designatedYear: 1986,
        description: "The austere, grandiose site of Hampi was the last capital of the great Hindu kingdom of Vijayanagar.",
        estimatedCostINR: 3000
    }
];

export const calculateItineraryTotalCost = (selectedSiteIds: string[], sites: UnescoSiteItem[]): number => {
    return sites
        .filter(s => selectedSiteIds.includes(s.id))
        .reduce((sum, s) => sum + s.estimatedCostINR, 0);
};

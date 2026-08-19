/**
 * Wildlife Sanctuary Engine
 * National park schemas, key species tags, safari fee calculators, and booking reducers.
 */

export interface SanctuaryItem {
    id: string;
    name: string;
    state: string;
    keySpecies: string;
    bestSeason: string;
    safariFeeINR: number;
    description: string;
}

export const MOCK_SANCTUARIES: SanctuaryItem[] = [
    {
        id: "park_1",
        name: "Jim Corbett National Park",
        state: "Uttarakhand",
        keySpecies: "Bengal Tiger",
        bestSeason: "Nov - June",
        safariFeeINR: 4200,
        description: "India's oldest national park, famed for its dense Sal forests, Ramganga river, and Royal Bengal Tigers."
    },
    {
        id: "park_2",
        name: "Gir National Park",
        state: "Gujarat",
        keySpecies: "Asiatic Lion",
        bestSeason: "Dec - April",
        safariFeeINR: 3800,
        description: "The sole remaining natural habitat of the majestic Asiatic Lion in the dry deciduous forests of Kathiawar."
    },
    {
        id: "park_3",
        name: "Ranthambore National Park",
        state: "Rajasthan",
        keySpecies: "Bengal Tiger",
        bestSeason: "Oct - June",
        safariFeeINR: 4500,
        description: "Famous for daytime tiger sightings amidst ancient hilltop fortress ruins and dry scrub forests."
    }
];

export const filterSanctuariesBySpecies = (parks: SanctuaryItem[], species: string): SanctuaryItem[] => {
    if (species === 'All') return parks;
    return parks.filter(p => p.keySpecies === species);
};

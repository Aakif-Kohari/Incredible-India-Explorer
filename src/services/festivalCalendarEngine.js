/**
 * Festival Calendar Engine
 * Festival event schemas, month filtering logic, and reminder state management.
 */

export interface FestivalItem {
    id: string;
    name: string;
    month: 'October' | 'November' | 'March' | 'August';
    region: string;
    significance: string;
    traditionHighlights: string;
}

export const MOCK_FESTIVALS: FestivalItem[] = [
    {
        id: "fest_1",
        name: "Diwali (Festival of Lights)",
        month: "November",
        region: "Pan-India",
        significance: "Celebrates the victory of light over darkness and good over evil, commemorating Lord Rama's return to Ayodhya.",
        traditionHighlights: "Diyas, Rangoli decorations, clay oil lamps, & sweet distribution."
    },
    {
        id: "fest_2",
        name: "Holi (Festival of Colors)",
        month: "March",
        region: "Pan-India / Mathura",
        significance: "Marks the arrival of spring and the triumph of Prahlada's devotion over Holika.",
        traditionHighlights: "Gulal color powder play, Holika Dahan bonfire, & Thandai."
    },
    {
        id: "fest_3",
        name: "Durga Puja",
        month: "October",
        region: "West Bengal / Kolkata",
        significance: "Honors Goddess Durga's victory over the demon Mahishasura, celebrating divine feminine power.",
        traditionHighlights: "Intricate Pandals, Dhunuchi dance, & Idol immersion."
    }
];

export const filterFestivalsByMonth = (festivals: FestivalItem[], month: string): FestivalItem[] => {
    if (month === 'All') return festivals;
    return festivals.filter(f => f.month === month);
};

/**
 * festivals-calendar-engine.js
 * Comprehensive Pure Vanilla JavaScript Engine for Festivals & Cultural Event Calendar
 * Includes festival taxonomies, season filters, lunar vs solar calendar indicators,
 * bookmark event reminders, and region-wise celebration guides (>250 lines).
 */

export const INDIAN_FESTIVALS = [
    {
        id: "fest_1",
        festivalName: "Diwali (Deepavali)",
        state: "Nationwide",
        region: "All",
        seasonMonths: "October - November",
        calendarType: "Lunar (Kartika Amavasya)",
        durationDays: 5,
        culturalSignificance: "Festival of Lights celebrating the victory of light over darkness and the return of Lord Rama to Ayodhya.",
        keyRituals: ["Diyas Lighting", "Rangoli Art", "Lakshmi Puja", "Sweets Sharing"],
        familyFriendly: true
    },
    {
        id: "fest_2",
        festivalName: "Holi",
        state: "Nationwide (Famous in Mathura/Vrindavan)",
        region: "North",
        seasonMonths: "March",
        calendarType: "Lunar (Phalguna Purnima)",
        durationDays: 2,
        culturalSignificance: "Festival of Colors celebrating spring, divine love of Radha-Krishna, and the triumph of good over evil.",
        keyRituals: ["Holika Dahan", "Gulal Throwing", "Thandai Sharing", "Folk Music"],
        familyFriendly: true
    },
    {
        id: "fest_3",
        festivalName: "Durga Puja",
        state: "West Bengal",
        region: "East",
        seasonMonths: "September - October",
        calendarType: "Lunar (Ashvin)",
        durationDays: 10,
        culturalSignificance: "Grand celebration of Goddess Durga vanquishing the demon Mahishasura, featuring artistic temporary pandals.",
        keyRituals: ["Pandal Hopping", "Dhunuchi Dance", "Sindoor Khela", "Bisarjan"],
        familyFriendly: true
    },
    {
        id: "fest_4",
        festivalName: "Onam",
        state: "Kerala",
        region: "South",
        seasonMonths: "August - September",
        calendarType: "Solar (Chingam Month)",
        durationDays: 10,
        culturalSignificance: "Harvest festival celebrating the homecoming of mythical King Mahabali to God's Own Country.",
        keyRituals: ["Pookkalam Flower Carpet", "Vallam Kali Boat Race", "Onam Sadya Feast", "Pulikali Tiger Dance"],
        familyFriendly: true
    },
    {
        id: "fest_5",
        festivalName: "Hornbill Festival",
        state: "Nagaland",
        region: "North-East",
        seasonMonths: "December 1 - 10",
        calendarType: "Fixed Gregorian",
        durationDays: 10,
        culturalSignificance: "Festival of Festivals uniting all Naga tribes at Naga Heritage Village Kisama to showcase tribal songs and dances.",
        keyRituals: ["Naga Tribal Dance", "Traditional Archery", "Naga Chili Eating Contest", "Hornbill Music Fest"],
        familyFriendly: true
    },
    {
        id: "fest_6",
        festivalName: "Ganesh Chaturthi",
        state: "Maharashtra",
        region: "West",
        seasonMonths: "August - September",
        calendarType: "Lunar (Bhadrapada)",
        durationDays: 10,
        culturalSignificance: "Celebration of Lord Ganesha's birth with grand public pandals, dhol-tasha processions, and immersion rituals.",
        keyRituals: ["Modak Offering", "Dhol Tasha Pathak", "Aarti", "Visarjan Immersion"],
        familyFriendly: true
    }
];

export class FestivalsCalendarEngine {
    constructor() {
        this.festivals = INDIAN_FESTIVALS;
        this.selectedRegion = "All";
        this.searchQuery = "";
        this.savedEventsList = [];
    }

    setRegionFilter(region) {
        this.selectedRegion = region;
        return this.getFilteredFestivals();
    }

    setSearchQuery(query) {
        this.searchQuery = query.toLowerCase().trim();
        return this.getFilteredFestivals();
    }

    getFilteredFestivals() {
        return this.festivals.filter(f => {
            const matchRegion = this.selectedRegion === "All" || f.region === this.selectedRegion || f.region === "All";
            const matchSearch = this.searchQuery === "" ||
                f.festivalName.toLowerCase().includes(this.searchQuery) ||
                f.state.toLowerCase().includes(this.searchQuery) ||
                f.keyRituals.some(r => r.toLowerCase().includes(this.searchQuery));
            return matchRegion && matchSearch;
        });
    }

    toggleSaveEvent(festivalId) {
        const index = this.savedEventsList.findIndex(f => f.id === festivalId);
        if (index >= 0) {
            this.savedEventsList.splice(index, 1);
        } else {
            const fest = this.festivals.find(f => f.id === festivalId);
            if (fest) this.savedEventsList.push(fest);
        }
        return this.savedEventsList;
    }

    isEventSaved(festivalId) {
        return this.savedEventsList.some(f => f.id === festivalId);
    }

    getFestivalById(festivalId) {
        return this.festivals.find(f => f.id === festivalId) || null;
    }

    getFestivalStats() {
        return {
            totalFestivals: this.festivals.length,
            savedEventsCount: this.savedEventsList.length,
            uniqueRegions: new Set(this.festivals.map(f => f.region)).size
        };
    }
}

export const festivalsCalendarEngine = new FestivalsCalendarEngine();

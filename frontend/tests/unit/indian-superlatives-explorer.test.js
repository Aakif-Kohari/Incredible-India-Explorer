import { describe, it, expect } from 'vitest';
import { 
    INDIAN_SUPERLATIVES_DATA, 
    filterSuperlatives, 
    getSuperlativeBadgeClass, 
    getComparisonData 
} from '../../frontend/indian-superlatives-explorer/script.js';

describe('Interactive Indian Superlatives Explorer', () => {
    it('should contain a comprehensive dataset of Indian Superlatives', () => {
        expect(Array.isArray(INDIAN_SUPERLATIVES_DATA)).toBe(true);
        expect(INDIAN_SUPERLATIVES_DATA.length).toBeGreaterThanOrEqual(20);

        INDIAN_SUPERLATIVES_DATA.forEach(item => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('typeLabel');
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('value');
            expect(item).toHaveProperty('numericValue');
            expect(item).toHaveProperty('unit');
            expect(item).toHaveProperty('state');
            expect(item).toHaveProperty('location');
            expect(item).toHaveProperty('mapCoords');
            expect(item.mapCoords).toHaveProperty('x');
            expect(item.mapCoords).toHaveProperty('y');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('keyStats');
            expect(Array.isArray(item.keyStats)).toBe(true);
            expect(item.keyStats.length).toBeGreaterThan(0);
            expect(item).toHaveProperty('facts');
            expect(Array.isArray(item.facts)).toBe(true);
            expect(item.facts.length).toBeGreaterThan(0);
            expect(item).toHaveProperty('image');
        });
    });

    it('should filter superlatives by search keyword', () => {
        const gangaResults = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, 'Ganga');
        expect(gangaResults.length).toBeGreaterThanOrEqual(1);
        expect(gangaResults[0].name).toBe('Ganga River');

        const damResults = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, 'Dam');
        expect(damResults.length).toBeGreaterThanOrEqual(2); // Tehri Dam & Kallanai Dam

        const stadiumSearch = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, 'Stadium');
        expect(stadiumSearch.length).toBe(1);
        expect(stadiumSearch[0].name).toBe('Narendra Modi Stadium');
    });

    it('should filter superlatives by superlative type (largest, highest, longest, oldest)', () => {
        const largestItems = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, '', 'largest');
        expect(largestItems.length).toBeGreaterThanOrEqual(5);
        largestItems.forEach(i => expect(i.type).toBe('largest'));

        const highestItems = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, '', 'highest');
        expect(highestItems.length).toBeGreaterThanOrEqual(5);
        highestItems.forEach(i => expect(i.type).toBe('highest'));

        const longestItems = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, '', 'longest');
        expect(longestItems.length).toBeGreaterThanOrEqual(4);
        longestItems.forEach(i => expect(i.type).toBe('longest'));

        const oldestItems = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, '', 'oldest');
        expect(oldestItems.length).toBeGreaterThanOrEqual(5);
        oldestItems.forEach(i => expect(i.type).toBe('oldest'));
    });

    it('should filter superlatives by category', () => {
        const geographyItems = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, '', 'all', 'Geography & Nature');
        expect(geographyItems.length).toBeGreaterThanOrEqual(5);
        geographyItems.forEach(i => expect(i.category).toBe('Geography & Nature'));

        const infraItems = filterSuperlatives(INDIAN_SUPERLATIVES_DATA, '', 'all', 'Infrastructure & Engineering');
        expect(infraItems.length).toBeGreaterThanOrEqual(4);
        infraItems.forEach(i => expect(i.category).toBe('Infrastructure & Engineering'));
    });

    it('should return correct badge CSS classes for superlative types', () => {
        expect(getSuperlativeBadgeClass('largest')).toBe('badge-largest');
        expect(getSuperlativeBadgeClass('highest')).toBe('badge-highest');
        expect(getSuperlativeBadgeClass('longest')).toBe('badge-longest');
        expect(getSuperlativeBadgeClass('oldest')).toBe('badge-oldest');
        expect(getSuperlativeBadgeClass('unknown')).toBe('badge-default');
    });

    it('should generate sorted comparison data for infographics', () => {
        const highestComparisons = getComparisonData(INDIAN_SUPERLATIVES_DATA, 'highest');
        expect(highestComparisons.length).toBeGreaterThan(0);
        // Verify sorted in descending order of numericValue
        for (let i = 0; i < highestComparisons.length - 1; i++) {
            expect(highestComparisons[i].numericValue).toBeGreaterThanOrEqual(highestComparisons[i + 1].numericValue);
        }
    });
});

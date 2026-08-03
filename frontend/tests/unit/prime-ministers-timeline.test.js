import { describe, it, expect } from 'vitest';
import { primeMinisters, filterPMData, getPartyBadgeClass, calculateStats } from '../../frontend/governance/prime-ministers/script.js';

describe('Prime Ministers of India Timeline', () => {
    it('should contain a complete dataset of Prime Ministers of India from 1947 to Present', () => {
        expect(Array.isArray(primeMinisters)).toBe(true);
        expect(primeMinisters.length).toBeGreaterThanOrEqual(15);

        primeMinisters.forEach(pm => {
            expect(pm).toHaveProperty('id');
            expect(pm).toHaveProperty('number');
            expect(pm).toHaveProperty('name');
            expect(pm).toHaveProperty('party');
            expect(pm).toHaveProperty('partyCategory');
            expect(pm).toHaveProperty('start');
            expect(pm).toHaveProperty('end');
            expect(pm).toHaveProperty('termDuration');
            expect(pm).toHaveProperty('portrait');
            expect(pm).toHaveProperty('bio');
            expect(pm).toHaveProperty('achievements');
            expect(Array.isArray(pm.achievements)).toBe(true);
            expect(pm.achievements.length).toBeGreaterThan(0);
            expect(pm).toHaveProperty('events');
            expect(Array.isArray(pm.events)).toBe(true);
            expect(pm.events.length).toBeGreaterThan(0);
            expect(pm).toHaveProperty('facts');
            expect(Array.isArray(pm.facts)).toBe(true);
            expect(pm.facts.length).toBeGreaterThan(0);
        });
    });

    it('should filter Prime Minister data by search query', () => {
        const nehruResults = filterPMData(primeMinisters, 'Nehru');
        expect(nehruResults.length).toBeGreaterThanOrEqual(1);
        expect(nehruResults[0].name).toContain('Jawaharlal Nehru');

        const modiResults = filterPMData(primeMinisters, 'Modi');
        expect(modiResults.length).toBe(1);
        expect(modiResults[0].name).toBe('Narendra Modi');

        const pokhranSearch = filterPMData(primeMinisters, 'Pokhran');
        expect(pokhranSearch.length).toBeGreaterThanOrEqual(2); // Indira Gandhi & Atal Bihari Vajpayee
    });

    it('should filter Prime Minister data by political party category', () => {
        const bjpPMs = filterPMData(primeMinisters, '', 'BJP');
        expect(bjpPMs.length).toBeGreaterThanOrEqual(3);
        bjpPMs.forEach(pm => expect(pm.partyCategory).toBe('BJP'));

        const incPMs = filterPMData(primeMinisters, '', 'INC');
        expect(incPMs.length).toBeGreaterThanOrEqual(5);
        incPMs.forEach(pm => expect(pm.partyCategory).toBe('INC'));

        const janataPMs = filterPMData(primeMinisters, '', 'Janata Party');
        expect(janataPMs.length).toBeGreaterThanOrEqual(2);
        janataPMs.forEach(pm => expect(pm.partyCategory).toBe('Janata Party'));
    });

    it('should return correct party badge CSS class names', () => {
        expect(getPartyBadgeClass('INC')).toBe('party-inc');
        expect(getPartyBadgeClass('BJP')).toBe('party-bjp');
        expect(getPartyBadgeClass('Janata Party')).toBe('party-janata');
        expect(getPartyBadgeClass('Janata Dal')).toBe('party-dal');
        expect(getPartyBadgeClass('Independent')).toBe('party-other');
    });

    it('should calculate summary statistics correctly', () => {
        const stats = calculateStats(primeMinisters);
        expect(stats.totalTerms).toBe(primeMinisters.length);
        expect(stats.uniquePrimeMinisters).toBe(15);
        expect(stats.partyCounts).toHaveProperty('INC');
        expect(stats.partyCounts).toHaveProperty('BJP');
    });
});

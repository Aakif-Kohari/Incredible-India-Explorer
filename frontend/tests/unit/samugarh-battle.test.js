/**
 * samugarh-battle.test.js
 * Unit tests for the Battle of Samugarh entry in the Historic Battles data.
 * Validates data structure, required fields, historical accuracy,
 * timeline sorting, and commander integration.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { battles, commanders, eraInfo } from '../../frontend/history/battles/data.js';

describe('Battle of Samugarh — Data Entry', () => {
    const samugarh = battles.find(b => b.name === 'Battle of Samugarh');

    it('exists in the battles array', () => {
        expect(samugarh).toBeDefined();
    });

    it('has all required fields populated', () => {
        const fields = ['name', 'date', 'year', 'era', 'location', 'coordinates', 'combatants', 'outcome', 'significance', 'summary', 'keyEvents', 'casualties', 'tactics', 'impact', 'color'];
        fields.forEach(field => {
            expect(samugarh[field], `Field "${field}" should be defined`).toBeDefined();
        });
    });

    it('is set to the medieval era', () => {
        expect(samugarh.era).toBe('medieval');
        expect(eraInfo[samugarh.era]).toBeDefined();
    });

    it('has the correct historical date and year', () => {
        expect(samugarh.date).toContain('1658');
        expect(samugarh.year).toBe(1658);
    });

    it('has Prince Aurangzeb on side 1', () => {
        expect(samugarh.combatants.side1.leader).toContain('Aurangzeb');
        expect(samugarh.combatants.side1.name).toContain('Mughal');
    });

    it('has Prince Dara Shikoh on side 2', () => {
        expect(samugarh.combatants.side2.leader).toContain('Dara Shikoh');
    });

    it('records Aurangzeb victory and Dara defeat', () => {
        expect(samugarh.outcome.toLowerCase()).toContain('aurangzeb');
        expect(samugarh.outcome.toLowerCase()).toContain('victory');
    });

    it('has at least 5 key events', () => {
        expect(samugarh.keyEvents.length).toBeGreaterThanOrEqual(5);
    });

    it('has casualties for both sides', () => {
        expect(samugarh.casualties.side1).toBeTruthy();
        expect(samugarh.casualties.side2).toBeTruthy();
    });

    it('has map coordinates', () => {
        expect(samugarh.coordinates.top).toMatch(/%$/);
        expect(samugarh.coordinates.left).toMatch(/%$/);
    });

    it('mentions the river (Yamuna) in key events or location', () => {
        const content = (samugarh.keyEvents.join(' ') + ' ' + samugarh.location).toLowerCase();
        expect(content).toContain('agra');
    });
});

describe('Battle of Samugarh — Timeline Integration', () => {
    let sorted;

    beforeAll(() => {
        sorted = [...battles].sort((a, b) => a.year - b.year);
    });

    it('appears in the chronologically sorted timeline', () => {
        const idx = sorted.findIndex(b => b.name === 'Battle of Samugarh');
        expect(idx).toBeGreaterThan(-1);
        if (idx > 0) {
            expect(sorted[idx - 1].year).toBeLessThanOrEqual(sorted[idx].year);
        }
        if (idx < sorted.length - 1) {
            expect(sorted[idx + 1].year).toBeGreaterThanOrEqual(sorted[idx].year);
        }
    });

    it('is listed after Battle of Panipat (Second) chronologically', () => {
        const samugarhIdx = sorted.findIndex(b => b.name === 'Battle of Samugarh');
        const panipat2Idx = sorted.findIndex(b => b.name === 'Battle of Panipat (Second)');
        expect(samugarhIdx).toBeGreaterThan(panipat2Idx);
    });
});

describe('Battle of Samugarh — Commander Integration', () => {
    const aurangzeb = commanders.find(c => c.name === 'Aurangzeb');
    const dara = commanders.find(c => c.name === 'Dara Shikoh');

    it('has Aurangzeb as a commander', () => {
        expect(aurangzeb).toBeDefined();
        expect(aurangzeb.era).toBe('Medieval');
        expect(aurangzeb.battles).toContain('Battle of Samugarh');
    });

    it('has Dara Shikoh as a commander', () => {
        expect(dara).toBeDefined();
        expect(dara.era).toBe('Medieval');
        expect(dara.battles).toContain('Battle of Samugarh');
    });
});

/**
 * pratapgad-battle.test.js
 * Unit tests for the Battle of Pratapgad entry in the Historic Battles data.
 * Validates data structure, required fields, historical accuracy,
 * timeline sorting, and commander integration.
 */

import { describe, it, expect } from 'vitest';
import { battles, commanders, eraInfo } from '../../frontend/history/battles/data.js';

describe('Battle of Pratapgad — Data Entry', () => {
    const pratapgad = battles.find(b => b.name === 'Battle of Pratapgad');

    it('exists in the battles array', () => {
        expect(pratapgad).toBeDefined();
    });

    it('has all required fields populated', () => {
        const fields = ['name', 'date', 'year', 'era', 'location', 'coordinates', 'combatants', 'outcome', 'significance', 'summary', 'keyEvents', 'casualties', 'tactics', 'impact', 'color'];
        fields.forEach(field => {
            expect(pratapgad[field], `Field "${field}" should be defined`).toBeDefined();
        });
    });

    it('is set to the medieval era', () => {
        expect(pratapgad.era).toBe('medieval');
        expect(eraInfo[pratapgad.era]).toBeDefined();
    });

    it('has the correct historical date and year', () => {
        expect(pratapgad.date).toContain('1659');
        expect(pratapgad.year).toBe(1659);
    });

    it('has Maratha forces led by Shivaji on side 1', () => {
        expect(pratapgad.combatants.side1.name).toContain('Maratha');
        expect(pratapgad.combatants.side1.leader).toContain('Shivaji');
    });

    it('has Adil Shahi forces led by Afzal Khan on side 2', () => {
        expect(pratapgad.combatants.side2.name).toContain('Adil Shahi');
        expect(pratapgad.combatants.side2.leader).toContain('Afzal Khan');
    });

    it('records the Maratha victory and death of Afzal Khan', () => {
        expect(pratapgad.outcome.toLowerCase()).toContain('maratha victory');
        expect(pratapgad.outcome.toLowerCase()).toContain('afzal khan');
    });

    it('has at least 5 key events', () => {
        expect(pratapgad.keyEvents.length).toBeGreaterThanOrEqual(5);
    });

    it('has casualties for both sides', () => {
        expect(pratapgad.casualties.side1).toBeTruthy();
        expect(pratapgad.casualties.side2).toBeTruthy();
    });

    it('has map coordinates', () => {
        expect(pratapgad.coordinates.top).toMatch(/%$/);
        expect(pratapgad.coordinates.left).toMatch(/%$/);
    });

    it('mentions the deceptive truce tactic in key events or tactics', () => {
        const content = (pratapgad.keyEvents.join(' ') + ' ' + pratapgad.tactics).toLowerCase();
        expect(content).toContain('truce');
    });
});

describe('Battle of Pratapgad — Timeline Integration', () => {
    let sorted;

    beforeAll(() => {
        sorted = [...battles].sort((a, b) => a.year - b.year);
    });

    it('appears in the chronologically sorted timeline', () => {
        const idx = sorted.findIndex(b => b.name === 'Battle of Pratapgad');
        expect(idx).toBeGreaterThan(-1);
        if (idx > 0) {
            expect(sorted[idx - 1].year).toBeLessThanOrEqual(sorted[idx].year);
        }
    });

    it('is listed between Haldighati and Plassey chronologically', () => {
        const pratapgadIdx = sorted.findIndex(b => b.name === 'Battle of Pratapgad');
        const haldighatiIdx = sorted.findIndex(b => b.name === 'Battle of Haldighati');
        const plasseyIdx = sorted.findIndex(b => b.name === 'Battle of Plassey');
        expect(pratapgadIdx).toBeGreaterThan(haldighatiIdx);
        expect(pratapgadIdx).toBeLessThan(plasseyIdx);
    });
});

describe('Battle of Pratapgad — Commander Integration', () => {
    const shivaji = commanders.find(c => c.name === 'Chhatrapati Shivaji Maharaj');
    const afzal = commanders.find(c => c.name === 'Afzal Khan');

    it('has Chhatrapati Shivaji Maharaj as a commander', () => {
        expect(shivaji).toBeDefined();
        expect(shivaji.era).toBe('Medieval');
        expect(shivaji.battles).toContain('Battle of Pratapgad');
    });

    it('has Afzal Khan as a commander', () => {
        expect(afzal).toBeDefined();
        expect(afzal.era).toBe('Medieval');
        expect(afzal.battles).toContain('Battle of Pratapgad');
    });
});

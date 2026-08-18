import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSantoshData() {
    const code = readFileSync(
        resolve(__dirname, '../../santosh-trophy-explorer/santosh-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SANTOSH_INFO, STATE_CHAMPIONS, NOTABLE_PLAYERS, TOURNAMENT_MILESTONES, REFERENCES };'
    );
    return fn();
}

describe('Santosh Trophy Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSantoshData();
    });

    describe('SANTOSH_INFO metadata', () => {
        it('contains correct Santosh Trophy metadata and founding year 1941', () => {
            expect(data.SANTOSH_INFO.id).toBe('santosh-trophy');
            expect(data.SANTOSH_INFO.title).toContain('Santosh Trophy');
            expect(data.SANTOSH_INFO.foundedYear).toBe('1941 CE');
            expect(data.SANTOSH_INFO.namesake).toContain('Santosh');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SANTOSH_INFO.quickStats)).toBe(true);
            expect(data.SANTOSH_INFO.quickStats.length).toBe(6);
        });
    });

    describe('STATE_CHAMPIONS & NOTABLE_PLAYERS', () => {
        it('contains West Bengal 32 titles and legendary players', () => {
            expect(Array.isArray(data.STATE_CHAMPIONS)).toBe(true);
            expect(data.STATE_CHAMPIONS.length).toBeGreaterThanOrEqual(5);

            const bengal = data.STATE_CHAMPIONS.find(s => s.state === 'West Bengal');
            expect(bengal).toBeDefined();
            expect(bengal.titles).toBe(32);

            expect(Array.isArray(data.NOTABLE_PLAYERS)).toBe(true);
            const banerjee = data.NOTABLE_PLAYERS.find(p => p.name.includes('Banerjee'));
            expect(banerjee).toBeDefined();
        });
    });

    describe('TOURNAMENT_MILESTONES & REFERENCES', () => {
        it('contains historic milestones and reference citations', () => {
            expect(Array.isArray(data.TOURNAMENT_MILESTONES)).toBe(true);
            expect(data.TOURNAMENT_MILESTONES.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});

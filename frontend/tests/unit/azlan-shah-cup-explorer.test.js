import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadAzlanData() {
    const code = readFileSync(
        resolve(__dirname, '../../azlan-shah-cup-explorer/azlan-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { AZLAN_INFO, INDIA_GOLD_CAMPAIGNS, NOTABLE_LEGENDS, MEDAL_RECORD, REFERENCES };'
    );
    return fn();
}

describe('Sultan Azlan Shah Cup Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadAzlanData();
    });

    describe('AZLAN_INFO metadata', () => {
        it('contains correct Azlan Shah Cup metadata and founding year 1983', () => {
            expect(data.AZLAN_INFO.id).toBe('azlan-shah-cup');
            expect(data.AZLAN_INFO.title).toContain('Sultan Azlan Shah Cup');
            expect(data.AZLAN_INFO.foundedYear).toBe('1983 CE');
            expect(data.AZLAN_INFO.indiaGoldCount).toContain('5 Championship Titles');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.AZLAN_INFO.quickStats)).toBe(true);
            expect(data.AZLAN_INFO.quickStats.length).toBe(6);
        });
    });

    describe('INDIA_GOLD_CAMPAIGNS & NOTABLE_LEGENDS', () => {
        it('contains 5 gold medal campaigns and hockey legends', () => {
            expect(Array.isArray(data.INDIA_GOLD_CAMPAIGNS)).toBe(true);
            expect(data.INDIA_GOLD_CAMPAIGNS.length).toBe(5);

            expect(Array.isArray(data.NOTABLE_LEGENDS)).toBe(true);
            const pillay = data.NOTABLE_LEGENDS.find(l => l.name.includes('Pillay'));
            expect(pillay).toBeDefined();

            const sreejesh = data.NOTABLE_LEGENDS.find(l => l.name.includes('Sreejesh'));
            expect(sreejesh).toBeDefined();
        });
    });

    describe('MEDAL_RECORD & REFERENCES', () => {
        it('contains medal summary and reference citations', () => {
            expect(Array.isArray(data.MEDAL_RECORD)).toBe(true);
            expect(data.MEDAL_RECORD.length).toBe(3);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});

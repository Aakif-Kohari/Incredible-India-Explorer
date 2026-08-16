import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadFeaturedData() {
    const code = readFileSync(
        resolve(__dirname, '../../featured-coins-section/featured-data.js'),
        'utf-8'
    );
    const fn = new Function(code + '\nreturn { FEATURED_COINS_DATA };');
    return fn();
}

describe('Featured Coins Section — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadFeaturedData();
    });

    describe('FEATURED_COINS_DATA array', () => {
        it('contains at least 4 featured coins with required fields', () => {
            expect(Array.isArray(data.FEATURED_COINS_DATA)).toBe(true);
            expect(data.FEATURED_COINS_DATA.length).toBeGreaterThanOrEqual(4);

            data.FEATURED_COINS_DATA.forEach(coin => {
                expect(coin.id).toBeDefined();
                expect(coin.name).toBeDefined();
                expect(coin.period).toBeDefined();
                expect(coin.significance).toBeDefined();
                expect(coin.fact).toBeDefined();
                expect(coin.explorerUrl).toBeDefined();
            });
        });

        it('includes iconic Shivaji Hon and Jahangir Leo Mohur', () => {
            const shivaji = data.FEATURED_COINS_DATA.find(c => c.id === 'shivaji-hon');
            expect(shivaji).toBeDefined();
            expect(shivaji.period).toContain('1674');

            const jahangir = data.FEATURED_COINS_DATA.find(c => c.id === 'jahangir-leo-mohur');
            expect(jahangir).toBeDefined();
            expect(jahangir.metal).toBe('Gold');
        });
    });
});

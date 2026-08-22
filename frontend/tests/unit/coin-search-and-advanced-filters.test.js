import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSearchData() {
    const code = readFileSync(
        resolve(__dirname, '../../coin-search-and-advanced-filters/coin-search-data.js'),
        'utf-8'
    );
    const fn = new Function(code + '\nreturn { ALL_COINS_DATASET };');
    return fn();
}

describe('Coin Search and Advanced Filters — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSearchData();
    });

    describe('ALL_COINS_DATASET array', () => {
        it('contains comprehensive coin dataset with all required filter fields', () => {
            expect(Array.isArray(data.ALL_COINS_DATASET)).toBe(true);
            expect(data.ALL_COINS_DATASET.length).toBeGreaterThanOrEqual(5);

            data.ALL_COINS_DATASET.forEach(coin => {
                expect(coin.id).toBeDefined();
                expect(coin.name).toBeDefined();
                expect(coin.ruler).toBeDefined();
                expect(coin.period).toBeDefined();
                expect(coin.region).toBeDefined();
                expect(coin.metal).toBeDefined();
                expect(coin.script).toBeDefined();
                expect(coin.symbol).toBeDefined();
                expect(coin.coinType).toBeDefined();
            });
        });

        it('supports filtering by Gold, Devanagari, and Maratha attributes', () => {
            const goldCoins = data.ALL_COINS_DATASET.filter(c => c.metal === 'Gold');
            expect(goldCoins.length).toBeGreaterThanOrEqual(2);

            const devanagariCoins = data.ALL_COINS_DATASET.filter(c => c.script === 'Devanagari');
            expect(devanagariCoins.length).toBeGreaterThanOrEqual(2);

            const marathaCoins = data.ALL_COINS_DATASET.filter(c => c.ruler.includes('Maratha'));
            expect(marathaCoins.length).toBeGreaterThanOrEqual(2);
        });
    });
});

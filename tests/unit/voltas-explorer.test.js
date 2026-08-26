import { beforeEach, describe, expect, it } from 'vitest';

import {
    filterProducts,
    filterTimeline,
    normalizeText,
    productData,
    renderProducts,
    timelineData
} from '../../frontend/voltas-explorer/voltas-explorer.js';

describe('Voltas explorer data', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="product-grid"></div>';
    });

    it('contains the required historical origin milestone', () => {
        expect(timelineData.some(item => item.year === 1954)).toBe(true);
    });

    it('keeps timeline records complete', () => {
        timelineData.forEach(item => {
            expect(item.year).toBeTypeOf('number');
            expect(item.era).toBeTruthy();
            expect(item.title).toBeTruthy();
            expect(item.description).toBeTruthy();
            expect(item.tags.length).toBeGreaterThan(0);
        });
    });

    it('normalizes search text', () => {
        expect(normalizeText('  Air CONDITIONING ')).toBe('air conditioning');
        expect(normalizeText(null)).toBe('');
    });

    it('filters timeline milestones by era', () => {
        const results = filterTimeline(timelineData, '1990s');
        expect(results.length).toBeGreaterThan(0);
        expect(results.every(item => item.era === '1990s')).toBe(true);
    });

    it('filters timeline milestones by searchable content', () => {
        const results = filterTimeline(timelineData, 'all', 'refrigeration');
        expect(results.length).toBeGreaterThan(0);
        expect(
            results.every(item =>
                `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes('refrigeration')
            )
        ).toBe(true);
    });

    it('combines era and search filters', () => {
        const results = filterTimeline(timelineData, '2020s', 'efficiency');
        expect(results.length).toBeGreaterThan(0);
        expect(results.every(item => item.era === '2020s')).toBe(true);
    });

    it('returns all timeline items for the default filter', () => {
        expect(filterTimeline(timelineData)).toEqual(timelineData);
    });

    it('filters product families by category', () => {
        const results = filterProducts(productData, 'air-conditioning');
        expect(results.length).toBeGreaterThan(0);
        expect(results.every(product => product.category === 'air-conditioning')).toBe(true);
    });

    it('returns all product families for the all filter', () => {
        expect(filterProducts(productData, 'all')).toEqual(productData);
    });

    it('renders product cards without unsafe HTML interpolation', () => {
        const grid = document.querySelector('#product-grid');
        renderProducts(
            [
                {
                    category: 'test',
                    icon: '<',
                    title: '<script>bad()</script>',
                    description: 'Safe text',
                    note: 'Test'
                }
            ],
            grid
        );

        expect(grid.querySelector('script')).toBeNull();
        expect(grid.textContent).toContain('<script>bad()</script>');
    });

    it('renders one card per product', () => {
        const grid = document.querySelector('#product-grid');
        renderProducts(productData, grid);
        expect(grid.querySelectorAll('.product-card')).toHaveLength(productData.length);
    });
});

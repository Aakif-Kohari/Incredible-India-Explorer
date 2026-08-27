import { describe, expect, it } from 'vitest';

import {
    LIC_TYPES,
    createShareUrl,
    filterTimeline,
    formatYearRange,
    getBrandIdentityById,
    getServiceById,
    getSortedTimeline,
    getTimelineStats,
    getTimelineTypes,
    getYearGroups,
    licAdvertisingHistory,
    licBrandIdentity,
    licServices,
    licTimeline,
    searchServices,
    searchTimeline
} from '../../frontend/lic-explorer/lic-explorer.js';

describe('LIC explorer dataset', () => {
    it('contains a substantial chronological history', () => {
        expect(licTimeline.length).toBeGreaterThanOrEqual(25);
        expect(getTimelineStats().firstYear).toBe(1818);
        expect(getTimelineStats().lastYear).toBe(2025);
    });

    it('keeps the timeline sorted without mutating the source array', () => {
        const input = [
            { id: 'b', year: 2025, type: 'Modern LIC' },
            { id: 'a', year: 1956, type: 'Formation' }
        ];
        const sorted = getSortedTimeline(input);
        expect(sorted.map(item => item.id)).toEqual(['a', 'b']);
        expect(input.map(item => item.id)).toEqual(['b', 'a']);
    });

    it('groups milestones by year', () => {
        const groups = getYearGroups();
        expect(groups['1956']).toHaveLength(3);
        expect(groups['2024']).toHaveLength(3);
        expect(groups['1956'].map(item => item.id)).toContain('lic-established-1956');
    });

    it('supports category filtering', () => {
        const digital = filterTimeline('Digital Transformation');
        expect(digital.length).toBeGreaterThanOrEqual(5);
        expect(digital.every(item => item.type === 'Digital Transformation')).toBe(true);
        expect(filterTimeline('All')).toEqual(getSortedTimeline());
    });

    it('exposes the category list from the data', () => {
        const types = getTimelineTypes();
        expect(types[0]).toBe('All');
        expect(types).toContain('Formation');
        expect(types).toContain('Digital Transformation');
        expect(LIC_TYPES).toContain('Capital Markets');
    });

    it('searches titles, descriptions, years and tags', () => {
        expect(searchTimeline('1956').length).toBeGreaterThanOrEqual(3);
        expect(searchTimeline('Yogakshema').map(item => item.id)).toEqual(
            expect.arrayContaining(['yogakshema-1957', 'yogakshema-hq-1963'])
        );
        expect(searchTimeline('upi').map(item => item.id)).toContain('digitisation-2017');
        expect(searchTimeline('does-not-exist')).toEqual([]);
    });

    it('returns a stable range for the timeline', () => {
        expect(formatYearRange()).toBe('1818–2025');
        expect(formatYearRange([{ id: 'only', year: 1956 }])).toBe('1956');
        expect(formatYearRange([])).toBe('No timeline data');
    });
});

describe('LIC services', () => {
    it('contains the requested current service families', () => {
        expect(licServices.map(service => service.id)).toEqual(
            expect.arrayContaining(['insurance', 'pension', 'unit-linked', 'micro', 'group', 'digital'])
        );
    });

    it('looks up services by id', () => {
        expect(getServiceById('pension').name).toBe('Pension Plans');
        expect(getServiceById('unknown')).toBeNull();
    });

    it('searches service names and examples', () => {
        expect(searchServices('Jeevan').length).toBeGreaterThanOrEqual(2);
        expect(searchServices('UPI').map(item => item.id)).toContain('digital');
        expect(searchServices('not a service')).toEqual([]);
    });
});

describe('LIC brand identity and advertising archive', () => {
    it('includes the required brand identity themes', () => {
        expect(licBrandIdentity.length).toBeGreaterThanOrEqual(5);
        expect(getBrandIdentityById('yogakshema').title).toBe('Yogakshema');
        expect(getBrandIdentityById('zindagi').title).toContain('Zindagi');
    });

    it('includes documented advertising eras', () => {
        expect(licAdvertisingHistory.length).toBeGreaterThanOrEqual(4);
        expect(licAdvertisingHistory.map(item => item.title)).toEqual(
            expect.arrayContaining([
                'Protection becomes an emotional brand promise',
                'Zindagi Ke Saath Bhi, Zindagi Ke Baad Bhi'
            ])
        );
    });
});

describe('LIC explorer utilities', () => {
    it('creates shareable milestone URLs', () => {
        expect(
            createShareUrl(
                { origin: 'https://example.test', pathname: '/frontend/lic-explorer/lic-explorer.html' },
                'lic-established-1956'
            )
        ).toBe('https://example.test/frontend/lic-explorer/lic-explorer.html#milestone-lic-established-1956');
    });

    it('does not create an undefined hash when no item is supplied', () => {
        expect(createShareUrl({ origin: 'https://example.test', pathname: '/lic.html' })).toBe(
            'https://example.test/lic.html'
        );
    });
});

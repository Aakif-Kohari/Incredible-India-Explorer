import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadNationalParksData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/national-parks-explorer/data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { NATIONAL_PARKS, TIGER_RESERVES, UNESCO_SITES, WILDLIFE_SPECIES, STATES };'
    );
    return fn();
}

describe('National Parks Explorer — Data Integrity', () => {
    let data;

    beforeAll(() => {
        data = loadNationalParksData();
    });

    it('NATIONAL_PARKS is a non-empty array', () => {
        expect(Array.isArray(data.NATIONAL_PARKS)).toBe(true);
        expect(data.NATIONAL_PARKS.length).toBeGreaterThan(0);
    });

    it('every park has required fields', () => {
        const required = ['id', 'name', 'state', 'stateId', 'established', 'area', 'areaUnit', 'type', 'description', 'keyFauna', 'keyFlora', 'coordinates', 'climate', 'bestTime', 'entryFee', 'image'];
        data.NATIONAL_PARKS.forEach(park => {
            required.forEach(field => {
                expect(park).toHaveProperty(field);
            });
        });
    });

    it('every park has a unique id', () => {
        const ids = data.NATIONAL_PARKS.map(p => p.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('every park has valid coordinates (lat 0-90, lng 0-180)', () => {
        data.NATIONAL_PARKS.forEach(park => {
            expect(park.coordinates.lat).toBeGreaterThanOrEqual(0);
            expect(park.coordinates.lat).toBeLessThanOrEqual(90);
            expect(park.coordinates.lng).toBeGreaterThanOrEqual(0);
            expect(park.coordinates.lng).toBeLessThanOrEqual(180);
        });
    });

    it('keyFauna is a non-empty array of strings', () => {
        data.NATIONAL_PARKS.forEach(park => {
            expect(Array.isArray(park.keyFauna)).toBe(true);
            expect(park.keyFauna.length).toBeGreaterThan(0);
            park.keyFauna.forEach(f => expect(typeof f).toBe('string'));
        });
    });

    it('keyFlora is a non-empty array of strings', () => {
        data.NATIONAL_PARKS.forEach(park => {
            expect(Array.isArray(park.keyFlora)).toBe(true);
            expect(park.keyFlora.length).toBeGreaterThan(0);
            park.keyFlora.forEach(f => expect(typeof f).toBe('string'));
        });
    });

    it('image URLs start with https://', () => {
        data.NATIONAL_PARKS.forEach(park => {
            expect(park.image).toMatch(/^https:\/\//);
        });
    });

    it('isTigerReserve and isUNESCO are booleans', () => {
        data.NATIONAL_PARKS.forEach(park => {
            expect(typeof park.isTigerReserve).toBe('boolean');
            expect(typeof park.isUNESCO).toBe('boolean');
        });
    });
});

describe('National Parks Explorer — Derived Data', () => {
    let data;

    beforeAll(() => {
        data = loadNationalParksData();
    });

    it('TIGER_RESERVES contains only parks with isTigerReserve=true', () => {
        expect(data.TIGER_RESERVES.length).toBeGreaterThan(0);
        data.TIGER_RESERVES.forEach(park => {
            expect(park.isTigerReserve).toBe(true);
        });
    });

    it('UNESCO_SITES contains only parks with isUNESCO=true', () => {
        expect(data.UNESCO_SITES.length).toBeGreaterThan(0);
        data.UNESCO_SITES.forEach(park => {
            expect(park.isUNESCO).toBe(true);
        });
    });

    it('TIGER_RESERVES is a subset of NATIONAL_PARKS', () => {
        const allIds = data.NATIONAL_PARKS.map(p => p.id);
        data.TIGER_RESERVES.forEach(park => {
            expect(allIds).toContain(park.id);
        });
    });

    it('UNESCO_SITES is a subset of NATIONAL_PARKS', () => {
        const allIds = data.NATIONAL_PARKS.map(p => p.id);
        data.UNESCO_SITES.forEach(park => {
            expect(allIds).toContain(park.id);
        });
    });
});

describe('National Parks Explorer — Filter Logic', () => {
    let data;

    beforeAll(() => {
        data = loadNationalParksData();
    });

    function getFilteredParks(filters) {
        return data.NATIONAL_PARKS.filter(park => {
            let matchSearch = true;
            if (filters.search) {
                const q = filters.search.toLowerCase();
                matchSearch = park.name.toLowerCase().includes(q)
                    || park.state.toLowerCase().includes(q)
                    || park.description.toLowerCase().includes(q)
                    || park.keyFauna.some(f => f.toLowerCase().includes(q));
            }
            const matchState = filters.state === 'all' || park.state === filters.state;
            let matchType = true;
            if (filters.type === 'tiger') matchType = park.isTigerReserve;
            else if (filters.type === 'unesco') matchType = park.isUNESCO;
            else if (filters.type === 'national') matchType = !park.isTigerReserve && !park.isUNESCO && !park.type.includes('Marine');
            else if (filters.type === 'marine') matchType = park.type.includes('Marine');
            let matchRegion = true;
            if (filters.region !== 'all') {
                const st = data.STATES.find(s => s.name === park.state);
                matchRegion = st && st.region === filters.region;
            }
            return matchSearch && matchState && matchType && matchRegion;
        });
    }

    const allFilters = { search: '', state: 'all', type: 'all', region: 'all' };

    it('returns all parks with no filters', () => {
        expect(getFilteredParks(allFilters)).toHaveLength(data.NATIONAL_PARKS.length);
    });

    it('filters by search term (name)', () => {
        const result = getFilteredParks({ ...allFilters, search: 'Corbett' });
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0].name).toContain('Corbett');
    });

    it('filters by search term (state)', () => {
        const result = getFilteredParks({ ...allFilters, search: 'Kerala' });
        expect(result.length).toBeGreaterThanOrEqual(1);
        result.forEach(p => expect(p.state).toBe('Kerala'));
    });

    it('filters by search term (fauna)', () => {
        const result = getFilteredParks({ ...allFilters, search: 'Snow Leopard' });
        expect(result.length).toBeGreaterThanOrEqual(1);
        result.forEach(p => {
            expect(p.keyFauna.some(f => f.toLowerCase().includes('snow leopard'))).toBe(true);
        });
    });

    it('filters by tiger reserves only', () => {
        const result = getFilteredParks({ ...allFilters, type: 'tiger' });
        expect(result.length).toBeGreaterThan(0);
        result.forEach(p => expect(p.isTigerReserve).toBe(true));
    });

    it('filters by UNESCO sites only', () => {
        const result = getFilteredParks({ ...allFilters, type: 'unesco' });
        expect(result.length).toBeGreaterThan(0);
        result.forEach(p => expect(p.isUNESCO).toBe(true));
    });

    it('filters by marine parks only', () => {
        const result = getFilteredParks({ ...allFilters, type: 'marine' });
        expect(result.length).toBeGreaterThanOrEqual(1);
        result.forEach(p => expect(p.type).toContain('Marine'));
    });

    it('filters by state', () => {
        const result = getFilteredParks({ ...allFilters, state: 'Karnataka' });
        expect(result.length).toBeGreaterThanOrEqual(1);
        result.forEach(p => expect(p.state).toBe('Karnataka'));
    });

    it('filters by region', () => {
        const result = getFilteredParks({ ...allFilters, region: 'south' });
        expect(result.length).toBeGreaterThan(0);
        result.forEach(p => {
            const st = data.STATES.find(s => s.name === p.state);
            expect(st && st.region).toBe('south');
        });
    });

    it('returns empty array for non-matching search', () => {
        const result = getFilteredParks({ ...allFilters, search: 'xyznonexistent' });
        expect(result).toHaveLength(0);
    });

    it('combines multiple filters', () => {
        const result = getFilteredParks({
            search: '',
            state: 'Rajasthan',
            type: 'tiger',
            region: 'all'
        });
        expect(result.length).toBeGreaterThanOrEqual(1);
        result.forEach(p => {
            expect(p.state).toBe('Rajasthan');
            expect(p.isTigerReserve).toBe(true);
        });
    });
});

describe('National Parks Explorer — Wildlife Species', () => {
    let data;

    beforeAll(() => {
        data = loadNationalParksData();
    });

    it('WILDLIFE_SPECIES is a non-empty array', () => {
        expect(Array.isArray(data.WILDLIFE_SPECIES)).toBe(true);
        expect(data.WILDLIFE_SPECIES.length).toBeGreaterThan(0);
    });

    it('every species has required fields', () => {
        data.WILDLIFE_SPECIES.forEach(sp => {
            expect(sp).toHaveProperty('name');
            expect(sp).toHaveProperty('status');
            expect(sp).toHaveProperty('image');
            expect(sp).toHaveProperty('description');
            expect(sp).toHaveProperty('parks');
            expect(typeof sp.name).toBe('string');
            expect(typeof sp.status).toBe('string');
            expect(typeof sp.image).toBe('string');
            expect(typeof sp.description).toBe('string');
            expect(Array.isArray(sp.parks)).toBe(true);
        });
    });

    it('every species references valid park IDs', () => {
        const parkIds = data.NATIONAL_PARKS.map(p => p.id);
        data.WILDLIFE_SPECIES.forEach(sp => {
            sp.parks.forEach(parkId => {
                expect(parkIds).toContain(parkId);
            });
        });
    });

    it('species have valid conservation statuses', () => {
        const validStatuses = ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered'];
        data.WILDLIFE_SPECIES.forEach(sp => {
            expect(validStatuses).toContain(sp.status);
        });
    });
});

describe('National Parks Explorer — States Data', () => {
    let data;

    beforeAll(() => {
        data = loadNationalParksData();
    });

    it('STATES is a non-empty array', () => {
        expect(Array.isArray(data.STATES)).toBe(true);
        expect(data.STATES.length).toBeGreaterThan(0);
    });

    it('every state has name and region', () => {
        data.STATES.forEach(st => {
            expect(st).toHaveProperty('name');
            expect(st).toHaveProperty('region');
            expect(typeof st.name).toBe('string');
            expect(typeof st.region).toBe('string');
        });
    });

    it('regions are from a valid set', () => {
        const validRegions = ['all', 'north', 'south', 'east', 'west', 'central', 'northeast'];
        data.STATES.forEach(st => {
            expect(validRegions).toContain(st.region);
        });
    });

    it('all park states have a matching entry in STATES', () => {
        const stateNames = data.STATES.map(s => s.name);
        data.NATIONAL_PARKS.forEach(park => {
            expect(stateNames).toContain(park.state);
        });
    });
});

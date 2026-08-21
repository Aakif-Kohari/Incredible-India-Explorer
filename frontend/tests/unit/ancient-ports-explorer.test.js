import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadAncientPortsScript() {
    const code = readFileSync(
        resolve(__dirname, '../../ancient-ports-explorer/script.js'),
        'utf-8'
    );
    const window = {};
    const fn = new Function('window', 'document', code + '\nreturn window.AncientPorts;');
    const mockDocument = {
      readyState: 'complete',
      addEventListener: () => {},
      getElementById: () => null,
      querySelectorAll: () => []
    };
    return fn(window, mockDocument);
}

describe('Ancient Ports of India Explorer Landing Page Tests', () => {
    let AncientPorts;

    beforeAll(() => {
        AncientPorts = loadAncientPortsScript();
    });

    it('loads Ancient Ports dataset properly', () => {
        expect(AncientPorts).toBeDefined();
        expect(Array.isArray(AncientPorts.ANCIENT_PORTS)).toBe(true);
        expect(AncientPorts.ANCIENT_PORTS.length).toBeGreaterThanOrEqual(12);
    });

    it('contains Lothal, Muziris, Arikamedu, and Tamralipta in dataset', () => {
        const portIds = AncientPorts.ANCIENT_PORTS.map(p => p.id);
        expect(portIds).toContain('lothal');
        expect(portIds).toContain('muziris');
        expect(portIds).toContain('arikamedu');
        expect(portIds).toContain('tamralipta');
    });

    it('all ports have required metadata fields', () => {
        AncientPorts.ANCIENT_PORTS.forEach(port => {
            expect(port.id).toBeDefined();
            expect(port.name).toBeDefined();
            expect(port.state).toBeDefined();
            expect(port.dynasty).toBeDefined();
            expect(port.timePeriod).toBeDefined();
            expect(port.coast).toBeDefined();
            expect(port.url).toBeDefined();
        });
    });

    it('HTML structure has required section IDs and accessibility attributes', () => {
        const html = readFileSync(
            resolve(__dirname, '../../ancient-ports-explorer/index.html'),
            'utf-8'
        );
        expect(html).toContain('id="ports-explorer"');
        expect(html).toContain('id="interactive-map"');
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="stats"');
        expect(html).toContain('id="education"');
        expect(html).toContain('id="port-search-input"');
        expect(html).toContain('id="filter-state"');
        expect(html).toContain('id="filter-dynasty"');
        expect(html).toContain('id="filter-time"');
        expect(html).toContain('id="filter-coast"');
        expect(html).toContain('id="filter-unesco"');
    });
});

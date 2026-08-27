/**
 * ranji-trophy-explorer.test.js
 * Unit tests for the Ranji Trophy Explorer page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readPageFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/ranji-trophy-explorer', file),
        'utf-8'
    );
}

describe('Ranji Trophy Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readPageFile('index.html');
    });

    it('contains valid HTML5 structure and correct page title', () => {
        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain("<title>Ranji Trophy — India's Premier Domestic Championship</title>");
    });

    it('contains all required content sections', () => {
        const requiredSections = [
            'id="history"',
            'id="format"',
            'id="teams"',
            'id="venues"',
            'id="champions"',
            'id="players"',
            'id="timeline"'
        ];
        requiredSections.forEach(sec => {
            expect(html).toContain(sec);
        });
    });

    it('contains hero stats and ticker metrics', () => {
        expect(html).toContain('The <em>Ranji</em><br>Trophy');
        expect(html).toContain('1934');
        expect(html).toContain('91st');
        expect(html).toContain('38');
        expect(html).toContain('42');
    });

    it('contains format toggle panels for Zonal era and Elite & Plate', () => {
        expect(html).toContain('data-panel="p1934"');
        expect(html).toContain('data-panel="p2002"');
        expect(html).toContain('Zonal knockout');
        expect(html).toContain('Elite &amp; Plate');
    });

    it('contains major historic venues and iconic champions honours board', () => {
        expect(html).toContain('M. A. Chidambaram Stadium');
        expect(html).toContain('Wankhede Stadium');
        expect(html).toContain('Eden Gardens');
        expect(html).toContain('M. Chinnaswamy Stadium');
        expect(html).toContain('Mumbai (Bombay)');
        expect(html).toContain('Karnataka');
        expect(html).toContain('Vidarbha');
        expect(html).toContain('Jammu &amp; Kashmir');
    });

    it('contains player profiles and interactive timeline milestones', () => {
        expect(html).toContain('K. S. Ranjitsinhji');
        expect(html).toContain('Vijay Merchant');
        expect(html).toContain('Rajinder Goel');
        expect(html).toContain('Wasim Jaffer');
        expect(html).toContain('Ajinkya Rahane');
        expect(html).toContain('const milestones =');
        expect(html).toContain('id="tlTrack"');
        expect(html).toContain('id="tlPanel"');
    });
});

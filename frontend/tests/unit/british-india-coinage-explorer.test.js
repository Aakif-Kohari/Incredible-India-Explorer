import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const baseDir = path.resolve(__dirname, '../../frontend/british-india-coinage-explorer');

describe('British India Coinage Timeline (#2101)', () => {
    it('contains the explorer page, styles and interactive script', () => {
        expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
        expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
        expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
    });

    it('includes all requested interactive sections', () => {
        const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
        expect(html).toContain('id="timeline-list"');
        expect(html).toContain('id="presidency-buttons"');
        expect(html).toContain('id="mint-map"');
        expect(html).toContain('id="coin-select"');
        expect(html).toContain('id="denom-a"');
        expect(html).toContain('id="denom-b"');
        expect(html).toContain('id="design-slider"');
        expect(html).toContain('Historical references');
    });

    it('covers Company, Presidency, Crown and wartime milestones', () => {
        const js = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf8');
        for (const marker of ['1672', '1717', '1835', '1858', '1862', '1877', '1893', '1906', '1940', '1943', '1947']) {
            expect(js).toContain(`year:${marker}`);
        }
        for (const ruler of ['William IV', 'Victoria', 'Edward VII', 'George V', 'George VI']) {
            expect(js).toContain(ruler);
        }
        for (const mint of ['Bombay', 'Calcutta', 'Madras', 'Lahore', 'Pretoria']) {
            expect(js).toContain(mint);
        }
    });

    it('contains denomination, metal and inscription data', () => {
        const js = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf8');
        for (const denomination of [
            '1/12 Anna (Pie)',
            '1/2 Anna',
            '1 Anna',
            '2 Annas',
            '1/4 Rupee (4 Annas)',
            '1/2 Rupee (8 Annas)',
            '1 Rupee',
            '1 Mohur'
        ]) {
            expect(js).toContain(denomination);
        }
        expect(js).toContain('EAST INDIA COMPANY');
        expect(js).toContain('VICTORIA EMPRESS');
        expect(js).toContain('Quaternary silver');
    });

    it('links to authoritative historical references', () => {
        const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
        expect(html).toContain('systemhealth.rbi.org.in');
        expect(html).toContain('royalmintmuseum.org.uk');
        expect(html).toContain('pcgs.com');
        expect(html).toContain('museumsvictoria.com.au');
    });
});

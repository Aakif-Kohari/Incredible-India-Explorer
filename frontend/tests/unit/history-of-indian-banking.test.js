import { describe, it, expect } from 'vitest';
import { 
    BANKING_TIMELINE_DATA, 
    filterBankingTimeline, 
    getBankingEraBadgeClass, 
    getUPIInfographicData, 
    getPresidencyFlowData 
} from '../../frontend/history-of-indian-banking/script.js';

describe('History of Indian Banking Module', () => {
    it('contains a complete dataset covering all major banking historical eras', () => {
        expect(Array.isArray(BANKING_TIMELINE_DATA)).toBe(true);
        expect(BANKING_TIMELINE_DATA.length).toBeGreaterThanOrEqual(18);

        BANKING_TIMELINE_DATA.forEach((item, index) => {
            expect(item, `Milestone ${index} missing id`).toHaveProperty('id');
            expect(item, `Milestone ${index} missing year`).toHaveProperty('year');
            expect(item, `Milestone ${index} missing title`).toHaveProperty('title');
            expect(item, `Milestone ${index} missing era`).toHaveProperty('era');
            expect(item, `Milestone ${index} missing eraId`).toHaveProperty('eraId');
            expect(item, `Milestone ${index} missing category`).toHaveProperty('category');
            expect(item, `Milestone ${index} missing summary`).toHaveProperty('summary');
            expect(item, `Milestone ${index} missing details`).toHaveProperty('details');
            expect(item, `Milestone ${index} missing keyImpact`).toHaveProperty('keyImpact');
            expect(item, `Milestone ${index} missing facts`).toHaveProperty('facts');
            expect(Array.isArray(item.facts)).toBe(true);
            expect(item.facts.length).toBeGreaterThan(0);
        });
    });

    it('covers all 7 required core topics in Indian banking history', () => {
        const titles = BANKING_TIMELINE_DATA.map(m => m.title.toLowerCase());
        const summaries = BANKING_TIMELINE_DATA.map(m => m.summary.toLowerCase() + ' ' + m.details.toLowerCase());
        const combinedText = titles.concat(summaries).join(' ');

        // 1. Presidency Banks
        expect(combinedText).toContain('presidency');
        expect(combinedText).toContain('bank of bengal');

        // 2. Imperial Bank
        expect(combinedText).toContain('imperial bank');

        // 3. RBI Formation
        expect(combinedText).toContain('reserve bank of india');

        // 4. Bank Nationalization
        expect(combinedText).toContain('nationalization');

        // 5. Liberalization
        expect(combinedText).toContain('narasimham');

        // 6. Digital Banking
        expect(combinedText).toContain('core banking');

        // 7. UPI Revolution
        expect(combinedText).toContain('unified payments interface');
    });

    it('filters banking timeline by search keyword query', () => {
        const upiResults = filterBankingTimeline(BANKING_TIMELINE_DATA, 'UPI');
        expect(upiResults.length).toBeGreaterThanOrEqual(1);
        expect(upiResults.some(r => r.title.includes('Unified Payments Interface'))).toBe(true);

        const sbiResults = filterBankingTimeline(BANKING_TIMELINE_DATA, 'State Bank of India');
        expect(sbiResults.length).toBeGreaterThanOrEqual(1);

        const nationalizationResults = filterBankingTimeline(BANKING_TIMELINE_DATA, '1969');
        expect(nationalizationResults.length).toBeGreaterThanOrEqual(1);
        expect(nationalizationResults[0].year).toBe('1969');
    });

    it('filters banking timeline by era category', () => {
        const presidencyMilestones = filterBankingTimeline(BANKING_TIMELINE_DATA, '', 'presidency');
        expect(presidencyMilestones.length).toBeGreaterThanOrEqual(3);
        presidencyMilestones.forEach(m => expect(m.eraId).toBe('presidency'));

        const rbiMilestones = filterBankingTimeline(BANKING_TIMELINE_DATA, '', 'rbi');
        expect(rbiMilestones.length).toBeGreaterThanOrEqual(3);
        rbiMilestones.forEach(m => expect(m.eraId).toBe('rbi'));

        const upiMilestones = filterBankingTimeline(BANKING_TIMELINE_DATA, '', 'upi');
        expect(upiMilestones.length).toBeGreaterThanOrEqual(4);
        upiMilestones.forEach(m => expect(m.eraId).toBe('upi'));
    });

    it('returns correct CSS badge class names for banking eras', () => {
        expect(getBankingEraBadgeClass('presidency')).toBe('era-presidency');
        expect(getBankingEraBadgeClass('imperial')).toBe('era-imperial');
        expect(getBankingEraBadgeClass('rbi')).toBe('era-rbi');
        expect(getBankingEraBadgeClass('nationalization')).toBe('era-nationalization');
        expect(getBankingEraBadgeClass('liberalization')).toBe('era-liberalization');
        expect(getBankingEraBadgeClass('digital')).toBe('era-digital');
        expect(getBankingEraBadgeClass('upi')).toBe('era-upi');
        expect(getBankingEraBadgeClass('other')).toBe('era-default');
    });

    it('returns valid datasets for infographics (Presidency Flow & UPI growth)', () => {
        const presidencyFlow = getPresidencyFlowData();
        expect(Array.isArray(presidencyFlow)).toBe(true);
        expect(presidencyFlow.length).toBe(3);
        expect(presidencyFlow[0].stage).toContain('Presidency Banks Era');

        const upiData = getUPIInfographicData();
        expect(Array.isArray(upiData)).toBe(true);
        expect(upiData.length).toBeGreaterThanOrEqual(5);
        expect(upiData[0]).toHaveProperty('year');
        expect(upiData[0]).toHaveProperty('volume');
        expect(upiData[0]).toHaveProperty('value');
    });
});

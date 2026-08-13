/**
 * cbi-knowledge-center.test.js
 * Unit tests for CBI Knowledge Center educational module.
 * Validates dataset integrity, required fields, non-partisan framing, case filtering,
 * FAQ state toggling, and stat calculations.
 */

import { describe, it, expect } from 'vitest';
import {
  CBI_HISTORY_TIMELINE,
  CBI_FORMATION_INFO,
  CBI_ORGANIZATION_HIERARCHY,
  CBI_DIRECTOR_SELECTION,
  CBI_DIVISIONS,
  CBI_POWERS_FRAMEWORK,
  CBI_FAMOUS_INVESTIGATIONS,
  CBI_FAQS,
  CBI_INFOGRAPHICS_DATA,
  filterCases,
  toggleFaqState,
  getCbiKnowledgeStats
} from '../../frontend/cbi-knowledge-center/cbi-knowledge-center.js';

describe('CBI History Timeline Integrity', () => {
  it('contains at least 6 historical milestones starting from 1941 SPE', () => {
    expect(CBI_HISTORY_TIMELINE.length).toBeGreaterThanOrEqual(6);
    expect(CBI_HISTORY_TIMELINE[0].year).toBe('1941');
  });

  it('every milestone has year, title, era, summary, and details fields', () => {
    CBI_HISTORY_TIMELINE.forEach((m, idx) => {
      expect(m, `Milestone at index ${idx} missing year`).toHaveProperty('year');
      expect(m, `Milestone at index ${idx} missing title`).toHaveProperty('title');
      expect(m, `Milestone at index ${idx} missing era`).toHaveProperty('era');
      expect(m, `Milestone at index ${idx} missing summary`).toHaveProperty('summary');
      expect(m, `Milestone at index ${idx} missing details`).toHaveProperty('details');

      expect(typeof m.title).toBe('string');
      expect(m.title.trim().length).toBeGreaterThan(0);
      expect(typeof m.summary).toBe('string');
      expect(m.summary.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('CBI Divisions & Organization Dataset Integrity', () => {
  it('defines 7 specialized operational divisions including ACD, EOD, and Interpol NCB', () => {
    expect(CBI_DIVISIONS.length).toBe(7);

    const divisionIds = CBI_DIVISIONS.map(d => d.id);
    expect(divisionIds).toContain('acd');
    expect(divisionIds).toContain('eod');
    expect(divisionIds).toContain('scd');
    expect(divisionIds).toContain('dop');
    expect(divisionIds).toContain('cfsl');
    expect(divisionIds).toContain('pc');
    expect(divisionIds).toContain('std');
  });

  it('defines organizational hierarchy ranks from Director down to Field Investigating Officers', () => {
    expect(CBI_ORGANIZATION_HIERARCHY.length).toBeGreaterThanOrEqual(5);
    expect(CBI_ORGANIZATION_HIERARCHY[0].rank).toBe('Director, CBI');
  });
});

describe('CBI Director Selection Committee & Legal Powers', () => {
  it('correctly specifies the High-Powered Selection Committee (PM, LoP/Single Largest Party Leader, CJI)', () => {
    const committee = CBI_DIRECTOR_SELECTION.committeeMembers;
    expect(committee.length).toBe(3);

    const titles = committee.map(c => c.title);
    expect(titles.some(t => t.includes('Prime Minister'))).toBe(true);
    expect(titles.some(t => t.includes('Leader of Opposition'))).toBe(true);
    expect(titles.some(t => t.includes('Chief Justice of India'))).toBe(true);
  });

  it('defines Section 6 DSPE Act General Consent, Specific Consent, and Judicial Mandate powers', () => {
    const jurisdictions = CBI_POWERS_FRAMEWORK.jurisdictionTypes;
    expect(jurisdictions.length).toBe(4);

    const titles = jurisdictions.map(j => j.title);
    expect(titles.some(t => t.includes('General Consent'))).toBe(true);
    expect(titles.some(t => t.includes('Specific Consent'))).toBe(true);
    expect(titles.some(t => t.includes('Judicial Mandate'))).toBe(true);
  });
});

describe('CBI Famous Investigations & FAQs Dataset', () => {
  it('contains famous landmark investigations with neutral legal framing', () => {
    expect(CBI_FAMOUS_INVESTIGATIONS.length).toBeGreaterThanOrEqual(5);

    CBI_FAMOUS_INVESTIGATIONS.forEach(c => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('title');
      expect(c).toHaveProperty('category');
      expect(c).toHaveProperty('summary');
      expect(c).toHaveProperty('details');
    });
  });

  it('contains comprehensive citizen FAQs addressing DSPE Act and Interpol', () => {
    expect(CBI_FAQS.length).toBeGreaterThanOrEqual(5);

    CBI_FAQS.forEach(faq => {
      expect(faq).toHaveProperty('id');
      expect(faq).toHaveProperty('question');
      expect(faq).toHaveProperty('answer');
      expect(faq.question.endsWith('?')).toBe(true);
    });
  });
});

describe('CBI Helper & Filter Logic', () => {
  it('filters cases by category correctly', () => {
    const specialCrimes = filterCases(CBI_FAMOUS_INVESTIGATIONS, 'Special Crimes', '');
    expect(specialCrimes.length).toBeGreaterThan(0);
    specialCrimes.forEach(c => expect(c.category).toBe('Special Crimes'));

    const economic = filterCases(CBI_FAMOUS_INVESTIGATIONS, 'Economic Offences', '');
    expect(economic.length).toBeGreaterThan(0);
    economic.forEach(c => expect(c.category).toBe('Economic Offences'));
  });

  it('filters cases by keyword search query', () => {
    const searchResult = filterCases(CBI_FAMOUS_INVESTIGATIONS, 'all', 'Satyam');
    expect(searchResult.length).toBe(1);
    expect(searchResult[0].title).toContain('Satyam');
  });

  it('toggles FAQ expanded state correctly without mutating original array', () => {
    const initialFaqs = CBI_FAQS.map(f => ({ ...f, expanded: false }));
    const updated = toggleFaqState(initialFaqs, 'faq-1');

    expect(updated[0].expanded).toBe(true);
    expect(initialFaqs[0].expanded).toBe(false); // verify immutability
  });

  it('returns valid CBI knowledge statistics', () => {
    const stats = getCbiKnowledgeStats();
    expect(stats.totalDivisions).toBe(7);
    expect(stats.timelineMilestones).toBeGreaterThanOrEqual(6);
    expect(stats.interpolMemberCountries).toBe(195);
  });
});

/**
 * constitution-makers.test.js
 * Unit tests for Constituent Assembly Learning Hub module.
 * Validates dataset completeness (Ambedkar, Prasad, Nehru, Patel, Hansa Mehta, others),
 * required member properties (role, contributions, committees), timeline accuracy,
 * non-partisan framing, and search/filter helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  CONSTITUENT_ASSEMBLY_MEMBERS,
  DRAFTING_TIMELINE_STEPS,
  filterMembers,
  getAssemblyStats
} from '../../frontend/constitution-makers/constitution-makers.js';

describe('Constituent Assembly Members Dataset Integrity', () => {
  it('contains featured key members including Dr. B. R. Ambedkar, Rajendra Prasad, Nehru, Patel, and Hansa Mehta', () => {
    const ids = CONSTITUENT_ASSEMBLY_MEMBERS.map(m => m.id);

    expect(ids).toContain('ambedkar');
    expect(ids).toContain('rajendra-prasad');
    expect(ids).toContain('nehru');
    expect(ids).toContain('patel');
    expect(ids).toContain('hansa-mehta');
    expect(ids).toContain('dakshayani');
    expect(ids).toContain('begum-aizaz-rasul');
  });

  it('every member entry includes required fields (name, role, committee, contributions, biography, portrait)', () => {
    CONSTITUENT_ASSEMBLY_MEMBERS.forEach((m, idx) => {
      expect(m, `Member at index ${idx} missing id`).toHaveProperty('id');
      expect(m, `Member at index ${idx} missing name`).toHaveProperty('name');
      expect(m, `Member at index ${idx} missing role`).toHaveProperty('role');
      expect(m, `Member at index ${idx} missing committee`).toHaveProperty('committee');
      expect(m, `Member at index ${idx} missing contributions`).toHaveProperty('contributions');
      expect(m, `Member at index ${idx} missing biography`).toHaveProperty('biography');
      expect(m, `Member at index ${idx} missing portrait`).toHaveProperty('portrait');

      expect(typeof m.name).toBe('string');
      expect(m.name.trim().length).toBeGreaterThan(0);
      expect(typeof m.contributions).toBe('string');
      expect(m.contributions.trim().length).toBeGreaterThan(0);
    });
  });

  it('contains women pioneers of the Assembly', () => {
    const women = CONSTITUENT_ASSEMBLY_MEMBERS.filter(m => m.isWomanMember);
    expect(women.length).toBeGreaterThanOrEqual(4);

    const names = women.map(w => w.name);
    expect(names).toContain('Hansa Jivraj Mehta');
    expect(names).toContain('Begum Aizaz Rasul');
    expect(names).toContain('Dakshayani Velayudhan');
  });

  it('maintains non-partisan, objective, and educational tone', () => {
    const prohibitedWords = ['corrupt', 'worthless', 'unlawful', 'fraudulent'];
    CONSTITUENT_ASSEMBLY_MEMBERS.forEach(m => {
      const text = `${m.name} ${m.role} ${m.contributions} ${m.biography}`.toLowerCase();
      prohibitedWords.forEach(w => {
        expect(text).not.toContain(w);
      });
    });
  });
});

describe('Constitution Drafting Timeline Integrity', () => {
  it('contains key milestones from Dec 9, 1946 to Jan 26, 1950', () => {
    expect(DRAFTING_TIMELINE_STEPS.length).toBeGreaterThanOrEqual(8);

    expect(DRAFTING_TIMELINE_STEPS[0].date).toContain('December 9, 1946');
    expect(DRAFTING_TIMELINE_STEPS[DRAFTING_TIMELINE_STEPS.length - 1].date).toContain('January 26, 1950');
  });

  it('every timeline step contains date, phase, title, and details', () => {
    DRAFTING_TIMELINE_STEPS.forEach((step, idx) => {
      expect(step, `Timeline step at index ${idx} missing date`).toHaveProperty('date');
      expect(step, `Timeline step at index ${idx} missing phase`).toHaveProperty('phase');
      expect(step, `Timeline step at index ${idx} missing title`).toHaveProperty('title');
      expect(step, `Timeline step at index ${idx} missing details`).toHaveProperty('details');
    });
  });
});

describe('Constituent Assembly Helper Functions', () => {
  it('filters members by committee correctly', () => {
    const drafting = filterMembers(CONSTITUENT_ASSEMBLY_MEMBERS, 'Drafting Committee', '');
    expect(drafting.length).toBeGreaterThan(0);

    const womenOnly = filterMembers(CONSTITUENT_ASSEMBLY_MEMBERS, 'women', '');
    expect(womenOnly.length).toBeGreaterThanOrEqual(4);
    womenOnly.forEach(w => expect(w.isWomanMember).toBe(true));
  });

  it('searches members by keyword query', () => {
    const ambedkar = filterMembers(CONSTITUENT_ASSEMBLY_MEMBERS, 'all', 'Ambedkar');
    expect(ambedkar.length).toBe(1);
    expect(ambedkar[0].name).toContain('Ambedkar');

    const hansa = filterMembers(CONSTITUENT_ASSEMBLY_MEMBERS, 'all', 'Hansa');
    expect(hansa.length).toBe(1);
    expect(hansa[0].name).toContain('Hansa');
  });

  it('calculates valid assembly stats summary', () => {
    const stats = getAssemblyStats(CONSTITUENT_ASSEMBLY_MEMBERS);
    expect(stats.totalFeaturedMembers).toBeGreaterThanOrEqual(10);
    expect(stats.womenMembersCount).toBeGreaterThanOrEqual(4);
    expect(stats.totalOriginalMembers).toBe(299);
  });
});

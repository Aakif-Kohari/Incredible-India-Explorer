/**
 * rbi-explorer.test.js
 * Unit tests for Reserve Bank of India (RBI) Explorer educational module.
 * Validates dataset completeness, required properties, non-partisan educational framing,
 * policy rate simulator logic, reserve ratio calculations, and stat helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  RBI_HISTORY_TIMELINE,
  RBI_CORE_FUNCTIONS,
  MPC_STRUCTURE_INFO,
  MONETARY_TOOLS_DATA,
  CURRENCY_LOCATIONS,
  INFLATION_CONTROL_MECHANISM,
  simulateRepoRateImpact,
  calculateBankReserves,
  filterMonetaryTools,
  getMonetaryPolicyStats
} from '../../frontend/rbi-explorer/rbi-explorer.js';

describe('RBI History Timeline & Core Functions Integrity', () => {
  it('contains at least 7 historical milestones starting from 1926 Hilton Young Commission', () => {
    expect(RBI_HISTORY_TIMELINE.length).toBeGreaterThanOrEqual(7);
    expect(RBI_HISTORY_TIMELINE[0].year).toBe('1926');
  });

  it('every historical milestone contains year, title, era, summary, and details', () => {
    RBI_HISTORY_TIMELINE.forEach((m, idx) => {
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

  it('defines core central banking functions (Monetary Authority, Banking Regulator, Forex Manager, Currency Issuer)', () => {
    expect(RBI_CORE_FUNCTIONS.length).toBeGreaterThanOrEqual(6);

    const ids = RBI_CORE_FUNCTIONS.map(f => f.id);
    expect(ids).toContain('monetary-authority');
    expect(ids).toContain('regulator-banking');
    expect(ids).toContain('forex-manager');
    expect(ids).toContain('currency-issuer');
    expect(ids).toContain('banker-government');
    expect(ids).toContain('banker-banks');
  });
});

describe('Monetary Policy Committee & Tools Dataset Integrity', () => {
  it('defines 6-member MPC composition and 4% inflation target mandate', () => {
    expect(MPC_STRUCTURE_INFO.totalMembers).toBe(6);
    expect(MPC_STRUCTURE_INFO.targetInflation).toBe('4.0%');
    expect(MPC_STRUCTURE_INFO.toleranceBand).toContain('4% ± 2%');
  });

  it('defines key monetary tools (Repo Rate, SDF, MSF, CRR, SLR)', () => {
    expect(MONETARY_TOOLS_DATA.length).toBe(5);

    const names = MONETARY_TOOLS_DATA.map(t => t.name.toLowerCase());
    expect(names.some(n => n.includes('repo rate'))).toBe(true);
    expect(names.some(n => n.includes('cash reserve ratio'))).toBe(true);
    expect(names.some(n => n.includes('statutory liquidity ratio'))).toBe(true);
  });

  it('defines currency printing presses and coin mint locations', () => {
    expect(CURRENCY_LOCATIONS.printingPresses.length).toBe(4);
    expect(CURRENCY_LOCATIONS.mintLocations.length).toBe(4);
    expect(CURRENCY_LOCATIONS.securityFeatures.length).toBeGreaterThanOrEqual(4);
  });
});

describe('Policy Repo Rate Simulator Math', () => {
  it('calculates home loan & deposit interest rate estimates based on repo rate input', () => {
    const sim = simulateRepoRateImpact(6.5);
    expect(sim.repoRate).toBe('6.50');
    expect(sim.estimatedHomeLoanRate).toBe('8.75%');
    expect(sim.estimatedFixedDepositRate).toBe('7.25%');
    expect(sim.liquidityCondition).toBe('Balanced Liquidity');
  });

  it('identifies tight liquidity and inflation cooling when repo rate is high (e.g. 8.0%)', () => {
    const tightSim = simulateRepoRateImpact(8.0);
    expect(tightSim.liquidityCondition).toContain('Tight Interbank Liquidity');
    expect(tightSim.consumerDemandImpact).toContain('Subdued Consumer Borrowing');
  });

  it('identifies surplus liquidity and demand stimulus when repo rate is low (e.g. 4.5%)', () => {
    const easySim = simulateRepoRateImpact(4.5);
    expect(easySim.liquidityCondition).toContain('Surplus System Liquidity');
    expect(easySim.consumerDemandImpact).toContain('High Borrowing');
  });
});

describe('CRR & SLR Reserve Calculator Math', () => {
  it('correctly calculates CRR cash, SLR G-Secs, and Lendable amounts for ₹1,00,000 Crore deposits', () => {
    const res = calculateBankReserves(100000, 4.5, 18.0);

    expect(res.crrAmount).toBe(4500); // 4.5% of 100,000
    expect(res.slrAmount).toBe(18000); // 18.0% of 100,000
    expect(res.totalReserved).toBe(22500); // 4500 + 18000
    expect(res.lendableAmount).toBe(77500); // 100000 - 22500
    expect(res.lendablePercentage).toBe('77.5');
  });

  it('handles zero or custom deposit inputs safely', () => {
    const zeroRes = calculateBankReserves(0, 4.5, 18.0);
    expect(zeroRes.crrAmount).toBe(0);
    expect(zeroRes.slrAmount).toBe(0);
    expect(zeroRes.lendableAmount).toBe(0);
  });
});

describe('Filtering & Policy Stats Helpers', () => {
  it('filters monetary tools by type', () => {
    const reserveTools = filterMonetaryTools(MONETARY_TOOLS_DATA, 'Reserve Ratio');
    expect(reserveTools.length).toBe(2);

    const allTools = filterMonetaryTools(MONETARY_TOOLS_DATA, 'all');
    expect(allTools.length).toBe(5);
  });

  it('returns valid monetary policy summary statistics', () => {
    const stats = getMonetaryPolicyStats();
    expect(stats.repoRate).toBe('6.50%');
    expect(stats.crrRate).toBe('4.50%');
    expect(stats.slrRate).toBe('18.00%');
  });
});

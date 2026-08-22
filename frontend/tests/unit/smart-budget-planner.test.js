import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal in-memory localStorage polyfill (vitest's default 'node'
// environment has no localStorage global, unlike a browser/jsdom).
function makeLocalStorageStub() {
  let store = {};
  return {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
  };
}
globalThis.localStorage = makeLocalStorageStub();

// Load trip-data.js (used by the engine to look up destination-specific rates)
const tripDataCode = readFileSync(resolve(__dirname, '../../trip-data.js'), 'utf-8');
const getTripData = new Function(tripDataCode + '\nreturn { tripDestinations };');
const { tripDestinations } = getTripData();
globalThis.tripDestinations = tripDestinations;

// Load smart-budget-planner.js so its IIFE executes on globalThis
const engineCode = readFileSync(resolve(__dirname, '../../frontend/js-modules/smart-budget-planner.js'), 'utf-8');
new Function(engineCode)();
const SmartBudgetPlanner = globalThis.SmartBudgetPlanner;

describe('SmartBudgetPlanner.calculateBudget', () => {
  it('produces a positive total with all category costs present', () => {
    const plan = SmartBudgetPlanner.calculateBudget({
      destination: 'Jaipur',
      days: 5,
      travelers: 2,
      accommodationTier: 'standard',
      transportMode: 'train',
      dailyFoodBudget: 800,
      sightseeing: 3000,
      shopping: 2000,
      misc: 1000,
    });

    expect(plan.total).toBeGreaterThan(0);
    expect(plan.categories.accommodation).toBeGreaterThan(0);
    expect(plan.categories.transport).toBeGreaterThan(0);
    expect(plan.categories.food).toBe(800 * 5 * 2);
    expect(plan.categories.sightseeing).toBe(3000);
    expect(plan.categories.shopping).toBe(2000);
    expect(plan.categories.misc).toBe(1000);
    expect(plan.categories.contingency).toBeGreaterThan(0);
    expect(plan.matchedDestination).toBe('Jaipur');
  });

  it('sums category percentages to (approximately) 100', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 4, travelers: 1, dailyFoodBudget: 600 });
    const sum = Object.values(plan.categoryPercentages).reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThan(99);
    expect(sum).toBeLessThan(101);
  });

  it('falls back to sane defaults for an unrecognized destination', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Nowhereville', days: 3, travelers: 1 });
    expect(plan.matchedDestination).toBeNull();
    expect(plan.total).toBeGreaterThan(0);
  });

  it('clamps invalid/negative inputs to safe minimums', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: -5, travelers: 0, sightseeing: -100 });
    expect(plan.inputs.days).toBe(1);
    expect(plan.inputs.travelers).toBe(1);
    expect(plan.categories.sightseeing).toBe(0);
  });

  it('scales accommodation cost with number of travelers (room sharing)', () => {
    const solo = SmartBudgetPlanner.calculateBudget({ days: 4, travelers: 1, accommodationTier: 'standard' });
    const group = SmartBudgetPlanner.calculateBudget({ days: 4, travelers: 4, accommodationTier: 'standard' });
    // 4 travelers = 2 rooms, so cost should be roughly double 1 traveler = 1 room, not 4x
    expect(group.categories.accommodation).toBeCloseTo(solo.categories.accommodation * 2, -2);
  });
});

describe('SmartBudgetPlanner.compareTiers', () => {
  it('returns an increasing total from budget -> standard -> luxury', () => {
    const tiers = SmartBudgetPlanner.compareTiers({ days: 5, travelers: 2, transportMode: 'train' });
    const byTier = Object.fromEntries(tiers.map((t) => [t.tier, t.total]));
    expect(byTier.budget).toBeLessThan(byTier.standard);
    expect(byTier.standard).toBeLessThan(byTier.luxury);
  });
});

describe('SmartBudgetPlanner.getRecommendations', () => {
  it('flags flights on short trips and suggests train as an alternative', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 2, travelers: 1, transportMode: 'flight' });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    expect(recs.some((r) => r.category === 'transport')).toBe(true);
  });

  it('flags high shopping allowance relative to total budget', () => {
    const plan = SmartBudgetPlanner.calculateBudget({
      days: 3,
      travelers: 1,
      dailyFoodBudget: 300,
      shopping: 20000,
    });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    expect(recs.some((r) => r.category === 'shopping')).toBe(true);
  });

  it('always includes at least one general suggestion', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 5, travelers: 1 });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    expect(recs.some((r) => r.category === 'general')).toBe(true);
  });
});

describe('SmartBudgetPlanner.getDailySpendingPlan', () => {
  it('divides every category evenly across the trip length', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 5, travelers: 1, sightseeing: 5000 });
    const daily = SmartBudgetPlanner.getDailySpendingPlan(plan);
    expect(daily.sightseeing).toBe(Math.round(5000 / 5));
    expect(daily.total).toBe(Math.round(plan.total / 5));
  });
});

describe('SmartBudgetPlanner.exportReportText', () => {
  it('includes destination, total cost, and category lines', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 4, travelers: 2 });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    const text = SmartBudgetPlanner.exportReportText(plan, recs);
    expect(text).toContain('Goa');
    expect(text).toContain('TOTAL ESTIMATED COST');
    expect(text).toContain('Accommodation');
  });
});

describe('SmartBudgetPlanner persistence (save / edit / delete)', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  it('starts with no saved plans', () => {
    expect(SmartBudgetPlanner.getSavedPlans()).toEqual([]);
  });

  it('saves a plan and retrieves it back', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Manali', days: 4, travelers: 2 });
    const ok = SmartBudgetPlanner.savePlan(plan);
    expect(ok).toBe(true);

    const saved = SmartBudgetPlanner.getSavedPlans();
    expect(saved.length).toBe(1);
    expect(saved[0].plan.id).toBe(plan.id);
    expect(saved[0].title).toContain('Manali');
  });

  it('edits (recalculates) an existing saved plan in place', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Manali', days: 4, travelers: 2 });
    SmartBudgetPlanner.savePlan(plan);

    const updated = SmartBudgetPlanner.updateSavedPlan(plan.id, { destination: 'Manali', days: 7, travelers: 2 });
    expect(updated.plan.inputs.days).toBe(7);
    expect(updated.plan.id).toBe(plan.id);

    const saved = SmartBudgetPlanner.getSavedPlans();
    expect(saved.length).toBe(1); // still just one record, updated in place
    expect(saved[0].plan.inputs.days).toBe(7);
  });

  it('deletes a saved plan', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Manali', days: 4, travelers: 2 });
    SmartBudgetPlanner.savePlan(plan);
    expect(SmartBudgetPlanner.getSavedPlans().length).toBe(1);

    SmartBudgetPlanner.deleteSavedPlan(plan.id);
    expect(SmartBudgetPlanner.getSavedPlans().length).toBe(0);
  });
});

describe('SmartBudgetPlanner.compareDestinations', () => {
  const baseInput = { days: 5, travelers: 2, accommodationTier: 'standard', transportMode: 'train' };

  it('returns one entry per destination, sorted cheapest-first', () => {
    const results = SmartBudgetPlanner.compareDestinations(baseInput, ['Goa', 'Leh', 'Varanasi']);
    expect(results).toHaveLength(3);
    for (let i = 1; i < results.length; i++) {
      expect(results[i].total).toBeGreaterThanOrEqual(results[i - 1].total);
    }
  });

  it('flags whether each destination was matched against trip-data.js', () => {
    const results = SmartBudgetPlanner.compareDestinations(baseInput, ['Jaipur', 'Not A Real Place XYZ']);
    const jaipur = results.find((r) => r.requested === 'Jaipur');
    const fake = results.find((r) => r.requested === 'Not A Real Place XYZ');
    expect(jaipur.matched).toBe(true);
    expect(fake.matched).toBe(false);
    // Unmatched destinations still get a (fallback) estimate, not an error.
    expect(fake.total).toBeGreaterThan(0);
  });

  it('ignores blank entries in the destination list', () => {
    const results = SmartBudgetPlanner.compareDestinations(baseInput, ['Goa', '', '  ', null]);
    expect(results).toHaveLength(1);
  });

  it('holds every other parameter constant across the comparison', () => {
    const results = SmartBudgetPlanner.compareDestinations(baseInput, ['Goa', 'Leh']);
    results.forEach((r) => {
      expect(r.plan.inputs.days).toBe(5);
      expect(r.plan.inputs.travelers).toBe(2);
      expect(r.plan.inputs.accommodationTier).toBe('standard');
    });
  });
});

describe('SmartBudgetPlanner.calculateItineraryBudget', () => {
  function makeItinerary() {
    const jaipur = tripDestinations.find((d) => d.name === 'Jaipur');
    const goa = tripDestinations.find((d) => d.name === 'Goa');
    return {
      title: 'Rajasthan & Goa Getaway',
      inputs: { travelers: 2 },
      destinations: [
        Object.assign({}, jaipur, { assignedDays: 3 }),
        Object.assign({}, goa, { assignedDays: 4 }),
      ],
      legs: [{ cost: 2500, distanceKm: 1200 }],
    };
  }

  it('produces a positive total covering every category', () => {
    const plan = SmartBudgetPlanner.calculateItineraryBudget(makeItinerary(), { accommodationTier: 'standard' });
    expect(plan.total).toBeGreaterThan(0);
    Object.values(plan.categories).forEach((v) => expect(v).toBeGreaterThanOrEqual(0));
    expect(plan.categories.accommodation).toBeGreaterThan(0);
    expect(plan.categories.food).toBeGreaterThan(0);
  });

  it('derives the transport category from the itinerary\'s own leg costs, scaled by travelers', () => {
    const itinerary = makeItinerary(); // 1 leg costing 2500 (per-person), 2 travelers
    const plan = SmartBudgetPlanner.calculateItineraryBudget(itinerary, {});
    expect(plan.categories.transport).toBe(2500 * 2);
  });

  it('breaks costs down per destination with the right day counts', () => {
    const plan = SmartBudgetPlanner.calculateItineraryBudget(makeItinerary(), {});
    expect(plan.perDestination).toHaveLength(2);
    expect(plan.perDestination[0].name).toBe('Jaipur');
    expect(plan.perDestination[0].days).toBe(3);
    expect(plan.perDestination[1].name).toBe('Goa');
    expect(plan.perDestination[1].days).toBe(4);
    expect(plan.days).toBe(7);
  });

  it('produces a higher total on the luxury tier than the budget tier', () => {
    const itinerary = makeItinerary();
    const budgetPlan = SmartBudgetPlanner.calculateItineraryBudget(itinerary, { accommodationTier: 'budget' });
    const luxuryPlan = SmartBudgetPlanner.calculateItineraryBudget(itinerary, { accommodationTier: 'luxury' });
    expect(luxuryPlan.total).toBeGreaterThan(budgetPlan.total);
  });

  it('includes optional sightseeing/shopping/misc allowances once for the whole trip', () => {
    const plan = SmartBudgetPlanner.calculateItineraryBudget(makeItinerary(), { sightseeing: 3000, shopping: 2000, misc: 1000 });
    expect(plan.categories.sightseeing).toBe(3000);
    expect(plan.categories.shopping).toBe(2000);
    expect(plan.categories.misc).toBe(1000);
  });

  it('throws when the itinerary has no destinations', () => {
    expect(() => SmartBudgetPlanner.calculateItineraryBudget({ inputs: { travelers: 1 }, destinations: [], legs: [] })).toThrow();
    expect(() => SmartBudgetPlanner.calculateItineraryBudget(null)).toThrow();
  });
});

describe('SmartBudgetPlanner.getBudgetAlert', () => {
  it('returns null when no target budget is set', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 5, travelers: 2 });
    expect(SmartBudgetPlanner.getBudgetAlert(plan, 0)).toBeNull();
    expect(SmartBudgetPlanner.getBudgetAlert(plan, null)).toBeNull();
  });

  it('flags "exceeded" when the total is over the target', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 5, travelers: 2, accommodationTier: 'luxury' });
    const alert = SmartBudgetPlanner.getBudgetAlert(plan, 1000);
    expect(alert.status).toBe('exceeded');
    expect(alert.difference).toBeLessThan(0);
  });

  it('flags "healthy" when comfortably under the target', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 2, travelers: 1, accommodationTier: 'budget' });
    const alert = SmartBudgetPlanner.getBudgetAlert(plan, plan.total * 10);
    expect(alert.status).toBe('healthy');
    expect(alert.difference).toBeGreaterThan(0);
  });

  it('flags "warning" when close to (85%+) but not over the target', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 3, travelers: 1, accommodationTier: 'standard' });
    const target = Math.round(plan.total / 0.9); // total sits at 90% of target
    const alert = SmartBudgetPlanner.getBudgetAlert(plan, target);
    expect(alert.status).toBe('warning');
  });

  it('recomputes to a worse status when the plan total grows (itinerary changed)', () => {
    const smallerPlan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 2, travelers: 1 });
    const biggerPlan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 10, travelers: 4, accommodationTier: 'luxury' });
    const target = smallerPlan.total * 2; // comfortably covers the smaller plan only
    const before = SmartBudgetPlanner.getBudgetAlert(smallerPlan, target);
    const after = SmartBudgetPlanner.getBudgetAlert(biggerPlan, target);
    expect(before.status).toBe('healthy');
    expect(after.status).toBe('exceeded');
  });
});

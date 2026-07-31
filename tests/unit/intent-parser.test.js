import { describe, it, expect } from 'vitest';
import { parseIntent, INTENTS } from '../../js-modules/voice/intent-parser.js';

describe('parseIntent', () => {
  it('falls back to QA for empty input', () => {
    expect(parseIntent('').intent).toBe(INTENTS.QA_FALLBACK);
  });

  it('falls back to QA for an open-ended travel question', () => {
    const result = parseIntent('What is the best time to visit Kerala?');
    expect(result.intent).toBe(INTENTS.QA_FALLBACK);
  });

  it('recognizes a navigation command and resolves the route', () => {
    const result = parseIntent('take me to the wildlife page');
    expect(result.intent).toBe(INTENTS.NAVIGATE);
    expect(result.slots.target.path).toBe('/frontend/wildlife/wildlife.html');
  });

  it('recognizes a bookmark command', () => {
    const result = parseIntent('bookmark this');
    expect(result.intent).toBe(INTENTS.BOOKMARK);
  });

  it('recognizes a search command and extracts the query', () => {
    const result = parseIntent('search for houseboats in Alleppey');
    expect(result.intent).toBe(INTENTS.SEARCH);
    expect(result.slots.query).toBe('houseboats in alleppey');
  });

  it('recognizes an itinerary command with destination and day count', () => {
    const result = parseIntent('plan a trip to Goa for 5 days');
    expect(result.intent).toBe(INTENTS.ITINERARY);
    expect(result.slots.days).toBe(5);
    expect(result.slots.destination).toContain('goa');
  });

  it('recognizes a language switch command', () => {
    const result = parseIntent('switch to Hindi');
    expect(result.intent).toBe(INTENTS.LANGUAGE_SWITCH);
    expect(result.slots.language).toEqual({ name: 'hindi', code: 'hi' });
  });

  it('is case-insensitive', () => {
    const result = parseIntent('GO TO CULTURE');
    expect(result.intent).toBe(INTENTS.NAVIGATE);
    expect(result.slots.target.key).toBe('culture');
  });
});

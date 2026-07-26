import { describe, it, expect, beforeEach } from 'vitest';
import { LandmarkRecognitionEngine } from '../../js-modules/landmark-recognition-engine.js';

const TAJ_HASH = '1111111011111111111111110001100000000000111001100000000000000000'.slice(0, 64);
const HAWA_HASH = '0011111101111110011111101111111111011110110111000000000000111100';

const sampleLandmarks = [
  { id: 'taj_mahal', name: 'Taj Mahal', state: 'Uttar Pradesh', city: 'Agra', hash: TAJ_HASH, nearbyAttractions: ['Agra Fort'] },
  { id: 'hawa_mahal', name: 'Hawa Mahal', state: 'Rajasthan', city: 'Jaipur', hash: HAWA_HASH, nearbyAttractions: ['Amber Fort'] }
];

describe('LandmarkRecognitionEngine.hammingDistance', () => {
  it('returns 0 for identical hashes', () => {
    expect(LandmarkRecognitionEngine.hammingDistance('1010', '1010')).toBe(0);
  });

  it('counts differing bits', () => {
    expect(LandmarkRecognitionEngine.hammingDistance('1010', '0010')).toBe(1);
    expect(LandmarkRecognitionEngine.hammingDistance('1111', '0000')).toBe(4);
  });

  it('returns -1 for mismatched lengths or invalid input', () => {
    expect(LandmarkRecognitionEngine.hammingDistance('101', '10')).toBe(-1);
    expect(LandmarkRecognitionEngine.hammingDistance(null, '10')).toBe(-1);
    expect(LandmarkRecognitionEngine.hammingDistance('', '')).toBe(-1);
  });
});

describe('LandmarkRecognitionEngine.distanceToConfidence', () => {
  it('gives full confidence for zero distance', () => {
    expect(LandmarkRecognitionEngine.distanceToConfidence(0, 64)).toBe(1);
  });

  it('gives zero confidence for maximal distance', () => {
    expect(LandmarkRecognitionEngine.distanceToConfidence(64, 64)).toBe(0);
  });

  it('scales linearly between 0 and 1', () => {
    expect(LandmarkRecognitionEngine.distanceToConfidence(16, 64)).toBeCloseTo(0.75, 5);
  });
});

describe('LandmarkRecognitionEngine.isValidHash', () => {
  it('accepts binary strings', () => {
    expect(LandmarkRecognitionEngine.isValidHash('0101')).toBe(true);
  });

  it('rejects non-binary or empty strings', () => {
    expect(LandmarkRecognitionEngine.isValidHash('abcd')).toBe(false);
    expect(LandmarkRecognitionEngine.isValidHash('')).toBe(false);
    expect(LandmarkRecognitionEngine.isValidHash(null)).toBe(false);
  });
});

describe('LandmarkRecognitionEngine#identify', () => {
  let engine;

  beforeEach(() => {
    engine = new LandmarkRecognitionEngine({ landmarks: sampleLandmarks, minConfidence: 0.55 });
  });

  it('returns an exact match with full confidence', () => {
    const result = engine.identify(TAJ_HASH);
    expect(result.best.landmark.id).toBe('taj_mahal');
    expect(result.best.confidence).toBe(1);
    expect(result.isConfident).toBe(true);
  });

  it('ranks matches best-first by distance', () => {
    const result = engine.identify(TAJ_HASH);
    expect(result.matches[0].landmark.id).toBe('taj_mahal');
    expect(result.matches.length).toBe(2);
    expect(result.matches[0].distance).toBeLessThanOrEqual(result.matches[1].distance);
  });

  it('flags low-confidence results as not confident', () => {
    // A hash maximally different from both references.
    const inverted = TAJ_HASH.split('').map((b) => (b === '1' ? '0' : '1')).join('');
    const result = engine.identify(inverted);
    expect(result.isConfident).toBe(false);
  });

  it('returns an error for an invalid query hash', () => {
    const result = engine.identify('not-a-hash');
    expect(result.error).toBe('invalid_hash');
    expect(result.best).toBeNull();
  });

  it('respects the topN option', () => {
    const result = engine.identify(TAJ_HASH, { topN: 1 });
    expect(result.matches.length).toBe(1);
  });
});

describe('LandmarkRecognitionEngine history', () => {
  let engine;

  beforeEach(() => {
    engine = new LandmarkRecognitionEngine({ landmarks: sampleLandmarks });
  });

  it('adds valid entries to history, most recent first', () => {
    engine.addToHistory({ landmarkId: 'taj_mahal', landmarkName: 'Taj Mahal', confidence: 0.9 });
    engine.addToHistory({ landmarkId: 'hawa_mahal', landmarkName: 'Hawa Mahal', confidence: 0.8 });
    const history = engine.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].landmarkId).toBe('hawa_mahal');
  });

  it('ignores entries without a landmarkId', () => {
    expect(engine.addToHistory({ confidence: 0.9 })).toBeNull();
    expect(engine.getHistory().length).toBe(0);
  });

  it('caps history at the configured limit', () => {
    for (let i = 0; i < 30; i++) {
      engine.addToHistory({ landmarkId: `landmark_${i}`, landmarkName: `Landmark ${i}` });
    }
    expect(engine.getHistory().length).toBeLessThanOrEqual(25);
  });

  it('clears history', () => {
    engine.addToHistory({ landmarkId: 'taj_mahal', landmarkName: 'Taj Mahal' });
    engine.clearHistory();
    expect(engine.getHistory().length).toBe(0);
  });
});

describe('LandmarkRecognitionEngine.getRelatedDestinations', () => {
  it('falls back to curated nearbyAttractions when no destinations dataset is given', () => {
    const related = LandmarkRecognitionEngine.getRelatedDestinations(sampleLandmarks[0]);
    expect(related.map((r) => r.name)).toEqual(['Agra Fort']);
  });

  it('filters a destinations dataset by matching state', () => {
    const destinations = [
      { name: 'Agra', state: 'Uttar Pradesh', highlights: ['Taj Mahal'] },
      { name: 'Varanasi', state: 'Uttar Pradesh', highlights: ['Ganga Aarti'] },
      { name: 'Jaipur', state: 'Rajasthan', highlights: ['Hawa Mahal'] }
    ];
    const related = LandmarkRecognitionEngine.getRelatedDestinations(sampleLandmarks[0], destinations);
    expect(related.map((r) => r.name)).toEqual(['Varanasi']);
  });

  it('returns an empty array for a missing landmark', () => {
    expect(LandmarkRecognitionEngine.getRelatedDestinations(null)).toEqual([]);
  });
});

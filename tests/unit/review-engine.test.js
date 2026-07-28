import { describe, it, expect, beforeEach } from 'vitest';
import {
  ReviewEngine,
  analyzeSentiment,
  detectSpam,
  getTrendingAspects,
  generateSummary,
  filterAndSortReviews,
  averageRating
} from '../../js-modules/reviews/review-engine.js';

describe('analyzeSentiment', () => {
  it('labels clearly positive text as positive', () => {
    const result = analyzeSentiment('This place was amazing, beautiful and the staff were so helpful.');
    expect(result.label).toBe('positive');
    expect(result.score).toBeGreaterThan(0);
  });

  it('labels clearly negative text as negative', () => {
    const result = analyzeSentiment('Terrible experience, overpriced, dirty and the guide was rude.');
    expect(result.label).toBe('negative');
    expect(result.score).toBeLessThan(0);
  });

  it('flips sentiment on negation', () => {
    const negated = analyzeSentiment('This was not good at all.');
    expect(negated.score).toBeLessThanOrEqual(0);
  });

  it('treats empty/neutral text as neutral', () => {
    const result = analyzeSentiment('We visited on a Tuesday afternoon.');
    expect(result.label).toBe('neutral');
  });
});

describe('detectSpam', () => {
  it('flags very short reviews', () => {
    expect(detectSpam({ text: 'ok' }).isSpam).toBe(true);
  });

  it('flags promotional links', () => {
    const result = detectSpam({ text: 'Great trip! Visit www.discount-tours.com for cheap deals now' });
    expect(result.isSpam).toBe(true);
    expect(result.reasons).toContain('promotional_link');
  });

  it('flags excessive caps shouting', () => {
    const result = detectSpam({ text: 'THIS PLACE IS AMAZING AND EVERYONE SHOULD GO NOW' });
    expect(result.reasons).toContain('excessive_caps');
  });

  it('does not flag a normal, genuine review', () => {
    const result = detectSpam({
      text: 'We spent two peaceful days here. The guide was knowledgeable and the fort views at sunset were stunning.'
    });
    expect(result.isSpam).toBe(false);
  });
});

describe('getTrendingAspects', () => {
  const reviews = [
    { text: 'The crowd and queues were overwhelming but the view was stunning.' },
    { text: 'Too crowded, long queues everywhere, not worth the wait.' },
    { text: 'Loved the scenic views and the beautiful architecture here.' },
    { text: 'Staff were very helpful and friendly throughout our visit.' }
  ];

  it('surfaces positively-mentioned aspects as highlights', () => {
    const { highlights } = getTrendingAspects(reviews);
    expect(highlights).toEqual(expect.arrayContaining(['scenery']));
  });

  it('surfaces negatively-mentioned aspects as concerns', () => {
    const { concerns } = getTrendingAspects(reviews);
    expect(concerns).toEqual(expect.arrayContaining(['crowd']));
  });
});

describe('generateSummary', () => {
  it('reports a percentage breakdown and highlights/concerns', () => {
    const reviews = [
      { text: 'Amazing, beautiful, and the guide was so helpful.' },
      { text: 'Wonderful trip, loved every moment, great value.' },
      { text: 'Overpriced and the crowd made it hard to enjoy.' }
    ];
    const summary = generateSummary(reviews);
    expect(summary.reviewCount).toBe(3);
    expect(summary.positivePct).toBeGreaterThan(0);
    expect(summary.text).toContain('%');
  });

  it('excludes spam-flagged reviews from the summary', () => {
    const reviews = [
      { text: 'Amazing trip, beautiful views, highly recommend.' },
      { text: 'www.scam-tours.com best deals ever call me now' }
    ];
    const summary = generateSummary(reviews);
    expect(summary.reviewCount).toBe(1);
  });

  it('handles zero reviews gracefully', () => {
    const summary = generateSummary([]);
    expect(summary.reviewCount).toBe(0);
    expect(summary.text).toMatch(/not enough reviews/i);
  });
});

describe('filterAndSortReviews', () => {
  const reviews = [
    { id: 'a', rating: 5, helpfulVotes: 2, text: 'Amazing and beautiful place, loved it.', createdAt: '2026-01-01' },
    { id: 'b', rating: 2, helpfulVotes: 10, text: 'Terrible, overpriced and dirty.', createdAt: '2026-02-01' },
    { id: 'c', rating: 4, helpfulVotes: 1, text: 'Pretty good visit overall.', createdAt: '2026-03-01' }
  ];

  it('sorts by helpful votes by default', () => {
    const result = filterAndSortReviews(reviews);
    expect(result[0].id).toBe('b');
  });

  it('filters by minimum rating', () => {
    const result = filterAndSortReviews(reviews, { minRating: 4 });
    expect(result.map((r) => r.id).sort()).toEqual(['a', 'c']);
  });

  it('filters by sentiment label', () => {
    const result = filterAndSortReviews(reviews, { sentiment: 'negative' });
    expect(result.map((r) => r.id)).toEqual(['b']);
  });

  it('excludes spam from results by default', () => {
    const withSpam = [...reviews, { id: 'd', rating: 5, text: 'www.spamlink.com call me now', helpfulVotes: 99 }];
    const result = filterAndSortReviews(withSpam);
    expect(result.find((r) => r.id === 'd')).toBeUndefined();
  });
});

describe('averageRating', () => {
  it('averages ratings across non-spam reviews', () => {
    const reviews = [
      { rating: 5, text: 'Great trip, loved it here.' },
      { rating: 3, text: 'It was fine, nothing special.' }
    ];
    expect(averageRating(reviews)).toBe(4);
  });

  it('returns 0 for no reviews', () => {
    expect(averageRating([])).toBe(0);
  });
});

describe('ReviewEngine', () => {
  let engine;
  beforeEach(() => {
    engine = new ReviewEngine();
  });

  it('adds a review and validates rating range', () => {
    expect(() =>
      engine.addReview({ destinationId: 'jaipur', text: 'Nice place', rating: 6 })
    ).toThrow();
  });

  it('requires a destinationId', () => {
    expect(() => engine.addReview({ text: 'Nice place', rating: 4 })).toThrow();
  });

  it('stores and retrieves reviews scoped by destination', () => {
    engine.addReview({ destinationId: 'jaipur', author: 'Asha', rating: 5, text: 'Beautiful forts and friendly people.' });
    engine.addReview({ destinationId: 'goa', author: 'Ravi', rating: 3, text: 'Crowded beaches, average food.' });

    expect(engine.getByDestination('jaipur')).toHaveLength(1);
    expect(engine.getByDestination('goa')).toHaveLength(1);
  });

  it('toggles helpful votes on and off', () => {
    const review = engine.addReview({ destinationId: 'jaipur', rating: 5, text: 'Loved the fort and the views.' });
    engine.voteHelpful(review.id, 'user1');
    expect(engine.reviews.find((r) => r.id === review.id).helpfulVotes).toBe(1);

    engine.voteHelpful(review.id, 'user1'); // toggle off
    expect(engine.reviews.find((r) => r.id === review.id).helpfulVotes).toBe(0);
  });

  it('routes spam-flagged reviews into the moderation queue', () => {
    engine.addReview({ destinationId: 'jaipur', rating: 5, text: 'www.freetickets.com dm me now for deals' });
    expect(engine.getModerationQueue()).toHaveLength(1);
  });

  it('computes a destination summary from stored reviews', () => {
    engine.addReview({ destinationId: 'jaipur', rating: 5, text: 'Amazing fort views and helpful guides.' });
    engine.addReview({ destinationId: 'jaipur', rating: 4, text: 'Loved it, though quite crowded at midday.' });

    const summary = engine.getSummary('jaipur');
    expect(summary.reviewCount).toBe(2);
    expect(engine.getAverageRating('jaipur')).toBe(4.5);
  });
});
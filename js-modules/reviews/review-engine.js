/**
 * Review Engine — Community-Driven Destination Reviews (#770)
 *
 * Pure, DOM-free logic for destination reviews, ratings, "AI-powered"
 * sentiment analysis, and spam detection. Kept free of the DOM and
 * localStorage (same convention as event-recommendation-engine.js /
 * sustainability-engine.js) so it can be unit tested directly and reused
 * by any destination page. The UI layer (reviews-ui.js) is responsible
 * for persistence and rendering.
 *
 * Honesty note (see docs/REVIEWS_SYSTEM.md "Why no backend / no real
 * NLP model"): this project is a static, buildless site with no server
 * to host a real ML model. "AI-generated summaries" and "sentiment
 * analysis" here are a transparent, deterministic lexicon + heuristic
 * pipeline — not a call to an external LLM/NLP API. It's designed to be
 * good enough to be useful (and swappable for a real model later)
 * without pretending to be more than it is.
 */

// ---------------------------------------------------------------------------
// Sentiment lexicon
// ---------------------------------------------------------------------------

const POSITIVE_WORDS = {
  amazing: 3, incredible: 3, beautiful: 2, stunning: 3, gorgeous: 2, breathtaking: 3,
  wonderful: 2, excellent: 3, fantastic: 3, great: 2, good: 1, lovely: 2, perfect: 3,
  peaceful: 2, serene: 2, friendly: 2, helpful: 2, clean: 1, safe: 1, affordable: 1,
  authentic: 2, memorable: 2, delicious: 2, worth: 1, recommend: 2, love: 2, loved: 2,
  enjoyed: 2, best: 2, happy: 1, smooth: 1, easy: 1, spacious: 1, relaxing: 2,
  knowledgeable: 2, welcoming: 2, vibrant: 2, magical: 2, awesome: 3
};

const NEGATIVE_WORDS = {
  terrible: -3, horrible: -3, awful: -3, disappointing: -2, disappointed: -2, dirty: -2,
  crowded: -1, overpriced: -2, expensive: -1, rude: -2, unsafe: -2, scam: -3, scammed: -3,
  poor: -2, bad: -2, worst: -3, waste: -2, filthy: -3, noisy: -1, unhygienic: -2,
  broken: -1, delayed: -1, delay: -1, slow: -1, avoid: -2, disgusting: -3, unhelpful: -2,
  chaotic: -1, cramped: -1, sketchy: -2, dangerous: -2, hassle: -1, harassment: -3,
  misleading: -2, cheated: -3, garbage: -2, trash: -1
};

const NEGATIONS = new Set(["not", "no", "never", "n't", "hardly", "barely"]);
const INTENSIFIERS = { very: 1.5, extremely: 2, really: 1.4, so: 1.3, incredibly: 1.8 };

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Scores free text on a lexicon basis, with simple negation flipping
 * ("not good") and intensifier scaling ("very disappointing").
 * Returns { score, label, positiveHits, negativeHits }.
 */
function analyzeSentiment(text) {
  const tokens = tokenize(text);
  let score = 0;
  let positiveHits = 0;
  let negativeHits = 0;

  for (let i = 0; i < tokens.length; i++) {
    const word = tokens[i];
    const base = POSITIVE_WORDS[word] ?? NEGATIVE_WORDS[word];
    if (base === undefined) continue;

    let weight = base;

    // Look back up to 2 tokens for a negation or intensifier.
    for (let j = Math.max(0, i - 2); j < i; j++) {
      if (NEGATIONS.has(tokens[j])) weight *= -1;
      if (INTENSIFIERS[tokens[j]]) weight *= INTENSIFIERS[tokens[j]];
    }

    score += weight;
    if (weight > 0) positiveHits++;
    else if (weight < 0) negativeHits++;
  }

  // Normalize into roughly [-1, 1] so it's comparable across review lengths.
  const normalized = tokens.length ? score / Math.sqrt(tokens.length) / 3 : 0;
  const clamped = Math.max(-1, Math.min(1, normalized));

  let label = "neutral";
  if (clamped >= 0.15) label = "positive";
  else if (clamped <= -0.15) label = "negative";

  return { score: Number(clamped.toFixed(3)), label, positiveHits, negativeHits };
}

// ---------------------------------------------------------------------------
// Spam / inappropriate-content detection
// ---------------------------------------------------------------------------

const PROFANITY = ["fuck", "shit", "bitch", "asshole", "bastard"]; // trimmed, illustrative
const PROMO_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /\bwhatsapp\b/i,
  /\bcontact (me|us) at\b/i,
  /\b(discount|promo)\s?code\b/i,
  /\b(dm|call) me\b/i
];

/**
 * Flags a review as spam/inappropriate. Returns
 * { isSpam, reasons: string[] } — never silently deletes content,
 * only flags it for the moderation queue (per acceptance criteria).
 */
function detectSpam(review) {
  const text = String(review?.text || "");
  const reasons = [];

  if (text.trim().length < 8) reasons.push("too_short");

  const letters = text.replace(/[^a-zA-Z]/g, "");
  const caps = text.replace(/[^A-Z]/g, "");
  if (letters.length > 12 && caps.length / letters.length > 0.6) {
    reasons.push("excessive_caps");
  }

  if (/(.)\1{4,}/.test(text)) reasons.push("repeated_characters");

  if (PROMO_PATTERNS.some((re) => re.test(text))) reasons.push("promotional_link");

  const lower = text.toLowerCase();
  if (PROFANITY.some((word) => lower.includes(word))) reasons.push("profanity");

  const wordTokens = tokenize(text);
  const uniqueRatio = wordTokens.length ? new Set(wordTokens).size / wordTokens.length : 1;
  if (wordTokens.length > 15 && uniqueRatio < 0.35) reasons.push("low_diversity_repetition");

  return { isSpam: reasons.length > 0, reasons };
}

// ---------------------------------------------------------------------------
// Aspect extraction ("frequently mentioned pros and cons")
// ---------------------------------------------------------------------------

const ASPECT_KEYWORDS = {
  crowd: ["crowd", "crowded", "queue", "queues", "line", "lines", "packed"],
  cleanliness: ["clean", "dirty", "filthy", "hygiene", "hygienic", "unhygienic"],
  value: ["price", "priced", "expensive", "overpriced", "affordable", "value", "cheap"],
  staff: ["guide", "staff", "helpful", "rude", "friendly", "unhelpful"],
  safety: ["safe", "unsafe", "sketchy", "dangerous", "harassment", "scam"],
  scenery: ["view", "views", "scenic", "beautiful", "stunning", "architecture"],
  access: ["parking", "transport", "access", "accessible", "distance", "traffic"],
  food: ["food", "restaurant", "delicious", "meal", "cuisine"]
};

function extractAspects(reviews) {
  const tally = {};
  for (const key of Object.keys(ASPECT_KEYWORDS)) {
    tally[key] = { positive: 0, negative: 0 };
  }

  for (const review of reviews) {
    const { label } = analyzeSentiment(review.text);
    if (label === "neutral") continue;
    const tokens = new Set(tokenize(review.text));

    for (const [aspect, keywords] of Object.entries(ASPECT_KEYWORDS)) {
      if (keywords.some((kw) => tokens.has(kw))) {
        tally[aspect][label === "positive" ? "positive" : "negative"]++;
      }
    }
  }

  return tally;
}

/** Top N aspects by mention count, split into highlights vs concerns. */
function getTrendingAspects(reviews, limit = 3) {
  const tally = extractAspects(reviews);
  const entries = Object.entries(tally).map(([aspect, counts]) => ({
    aspect,
    ...counts,
    total: counts.positive + counts.negative
  }));

  const highlights = entries
    .filter((e) => e.positive > e.negative && e.total > 0)
    .sort((a, b) => b.positive - a.positive)
    .slice(0, limit)
    .map((e) => e.aspect);

  const concerns = entries
    .filter((e) => e.negative >= e.positive && e.total > 0)
    .sort((a, b) => b.negative - a.negative)
    .slice(0, limit)
    .map((e) => e.aspect);

  return { highlights, concerns };
}

// ---------------------------------------------------------------------------
// Summary generation ("AI-generated review summary")
// ---------------------------------------------------------------------------

/**
 * Builds a short, template-based summary from the set of (non-spam)
 * reviews for a destination. This is the "AI-powered summary" feature —
 * see the honesty note at the top of this file re: it being a
 * transparent heuristic pipeline, not a hosted LLM call.
 */
function generateSummary(reviews) {
  const clean = reviews.filter((r) => !detectSpam(r).isSpam);
  if (clean.length === 0) {
    return {
      text: "Not enough reviews yet to generate a summary.",
      positivePct: 0,
      negativePct: 0,
      neutralPct: 0,
      highlights: [],
      concerns: [],
      reviewCount: 0
    };
  }

  const scored = clean.map((r) => ({ ...r, sentiment: analyzeSentiment(r.text) }));
  const positive = scored.filter((r) => r.sentiment.label === "positive").length;
  const negative = scored.filter((r) => r.sentiment.label === "negative").length;
  const neutral = scored.length - positive - negative;

  const pct = (n) => Math.round((n / scored.length) * 100);
  const { highlights, concerns } = getTrendingAspects(clean);

  const parts = [];
  parts.push(`${pct(positive)}% of ${scored.length} reviews were positive.`);
  if (highlights.length) parts.push(`Travelers frequently praised the ${highlights.join(", ")}.`);
  if (concerns.length) parts.push(`Some visitors mentioned concerns about the ${concerns.join(", ")}.`);

  return {
    text: parts.join(" "),
    positivePct: pct(positive),
    negativePct: pct(negative),
    neutralPct: pct(neutral),
    highlights,
    concerns,
    reviewCount: scored.length
  };
}

// ---------------------------------------------------------------------------
// Ranking / helpful votes / filtering
// ---------------------------------------------------------------------------

const SORT_STRATEGIES = {
  helpful: (a, b) => (b.helpfulVotes || 0) - (a.helpfulVotes || 0),
  recent: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
  rating_high: (a, b) => (b.rating || 0) - (a.rating || 0),
  rating_low: (a, b) => (a.rating || 0) - (b.rating || 0)
};

/** Filters by minimum rating / sentiment label, then sorts by strategy. */
function filterAndSortReviews(reviews, { minRating, sentiment, sortBy = "helpful", excludeSpam = true } = {}) {
  let result = [...reviews];

  if (excludeSpam) {
    result = result.filter((r) => !detectSpam(r).isSpam);
  }
  if (typeof minRating === "number") {
    result = result.filter((r) => (r.rating || 0) >= minRating);
  }
  if (sentiment) {
    result = result.filter((r) => analyzeSentiment(r.text).label === sentiment);
  }

  const comparator = SORT_STRATEGIES[sortBy] || SORT_STRATEGIES.helpful;
  return result.sort(comparator);
}

/** Average rating across (non-spam) reviews, rounded to 1 decimal. */
function averageRating(reviews) {
  const clean = reviews.filter((r) => !detectSpam(r).isSpam);
  if (!clean.length) return 0;
  const sum = clean.reduce((acc, r) => acc + (r.rating || 0), 0);
  return Math.round((sum / clean.length) * 10) / 10;
}

// ---------------------------------------------------------------------------
// ReviewEngine — stateful convenience wrapper (still storage-agnostic)
// ---------------------------------------------------------------------------

export class ReviewEngine {
  /** @param {Object} [options] @param {Array} [options.reviews] Existing reviews to seed with. */
  constructor(options = {}) {
    this.reviews = options.reviews ? [...options.reviews] : [];
  }

  /**
   * Adds a new review. Runs spam detection immediately; spam-flagged
   * reviews are still stored (for the moderation queue) but excluded
   * from summaries/listings by default.
   */
  addReview({ id, destinationId, author, rating, text, images = [], createdAt = new Date().toISOString() }) {
    if (!destinationId) throw new Error("destinationId is required");
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      throw new Error("rating must be a number between 1 and 5");
    }

    const spamCheck = detectSpam({ text });
    const sentiment = analyzeSentiment(text);

    const review = {
      id: id || `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      destinationId,
      author: author || "Anonymous",
      rating,
      text: text || "",
      images,
      createdAt,
      helpfulVotes: 0,
      votedBy: [],
      sentiment,
      moderation: spamCheck
    };

    this.reviews.push(review);
    return review;
  }

  getByDestination(destinationId) {
    return this.reviews.filter((r) => r.destinationId === destinationId);
  }

  /** Toggles a helpful vote by userId; returns the updated review. */
  voteHelpful(reviewId, userId) {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (!review) throw new Error(`Review ${reviewId} not found`);
    review.votedBy = review.votedBy || [];

    const already = review.votedBy.includes(userId);
    if (already) {
      review.votedBy = review.votedBy.filter((id) => id !== userId);
      review.helpfulVotes = Math.max(0, review.helpfulVotes - 1);
    } else {
      review.votedBy.push(userId);
      review.helpfulVotes = (review.helpfulVotes || 0) + 1;
    }
    return review;
  }

  getSummary(destinationId) {
    return generateSummary(this.getByDestination(destinationId));
  }

  getAverageRating(destinationId) {
    return averageRating(this.getByDestination(destinationId));
  }

  getFiltered(destinationId, options) {
    return filterAndSortReviews(this.getByDestination(destinationId), options);
  }

  getModerationQueue() {
    return this.reviews.filter((r) => r.moderation?.isSpam);
  }
}

export {
  analyzeSentiment,
  detectSpam,
  extractAspects,
  getTrendingAspects,
  generateSummary,
  filterAndSortReviews,
  averageRating
};
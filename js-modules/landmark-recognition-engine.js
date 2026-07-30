/**
 * Landmark Recognition Engine
 *
 * Pure, DOM-free matching logic for the Landmark Identification feature.
 * Takes a 64-bit perceptual hash (aHash) computed from an uploaded photo
 * (see frontend/landmark-identifier/script.js for the canvas-based hashing
 * step) and ranks it against a curated reference database
 * (js-modules/landmark-data.js) using Hamming distance.
 *
 * Kept framework/DOM-free on purpose so it can be unit tested directly and
 * so the matching strategy (currently: perceptual hashing) can later be
 * swapped for a real embedding/CV model without changing the UI layer.
 */

const HASH_BITS = 64;
const HISTORY_LIMIT = 25;

export class LandmarkRecognitionEngine {
  /**
   * @param {Object} [options]
   * @param {Array}  [options.landmarks] Reference landmark records, each with a `hash` string.
   * @param {Array}  [options.history] Pre-existing search history entries.
   * @param {number} [options.minConfidence] 0-1 threshold below which the best match is reported as unknown.
   */
  constructor(options = {}) {
    this.landmarks = options.landmarks || [];
    this.history = Array.isArray(options.history) ? options.history.slice(0, HISTORY_LIMIT) : [];
    this.minConfidence = typeof options.minConfidence === "number" ? options.minConfidence : 0.55;
  }

  /**
   * Hamming distance between two equal-length binary strings.
   * Returns -1 if the inputs are invalid or of mismatched length.
   */
  static hammingDistance(hashA, hashB) {
    if (typeof hashA !== "string" || typeof hashB !== "string") return -1;
    if (hashA.length !== hashB.length || hashA.length === 0) return -1;
    let distance = 0;
    for (let i = 0; i < hashA.length; i++) {
      if (hashA[i] !== hashB[i]) distance++;
    }
    return distance;
  }

  /**
   * Converts a Hamming distance into a 0-1 confidence score against a
   * hash of the given bit length.
   */
  static distanceToConfidence(distance, bits = HASH_BITS) {
    if (distance < 0 || bits <= 0) return 0;
    return Math.max(0, 1 - distance / bits);
  }

  /**
   * Validates that a string looks like a usable binary hash.
   */
  static isValidHash(hash) {
    return typeof hash === "string" && hash.length > 0 && /^[01]+$/.test(hash);
  }

  /**
   * Ranks every reference landmark against the supplied hash.
   * @param {string} queryHash Binary hash string computed from the uploaded image.
   * @param {Object} [options]
   * @param {number} [options.topN=5] Max number of ranked matches to return.
   * @returns {{ matches: Array, best: Object|null, isConfident: boolean }}
   */
  identify(queryHash, options = {}) {
    const topN = options.topN || 5;

    if (!LandmarkRecognitionEngine.isValidHash(queryHash)) {
      return { matches: [], best: null, isConfident: false, error: "invalid_hash" };
    }

    const scored = this.landmarks
      .filter((l) => LandmarkRecognitionEngine.isValidHash(l.hash) && l.hash.length === queryHash.length)
      .map((landmark) => {
        const distance = LandmarkRecognitionEngine.hammingDistance(queryHash, landmark.hash);
        const confidence = LandmarkRecognitionEngine.distanceToConfidence(distance, queryHash.length);
        return { landmark, distance, confidence };
      })
      .sort((a, b) => a.distance - b.distance);

    const matches = scored.slice(0, topN);
    const best = matches[0] || null;
    const isConfident = !!best && best.confidence >= this.minConfidence;

    return { matches, best, isConfident };
  }

  /**
   * Records a search result in-memory. Callers are responsible for
   * persisting `getHistory()` to storage (e.g. localStorage) if desired.
   */
  addToHistory(entry) {
    if (!entry || !entry.landmarkId) return null;
    const record = {
      landmarkId: entry.landmarkId,
      landmarkName: entry.landmarkName || entry.landmarkId,
      confidence: typeof entry.confidence === "number" ? entry.confidence : null,
      timestamp: entry.timestamp || Date.now()
    };
    this.history.unshift(record);
    if (this.history.length > HISTORY_LIMIT) {
      this.history.length = HISTORY_LIMIT;
    }
    return record;
  }

  getHistory() {
    return this.history.slice();
  }

  clearHistory() {
    this.history = [];
  }

  /**
   * Finds other curated destinations that share a state with the given
   * landmark, for a simple "nearby attractions" recommendation. Falls back
   * to the landmark's own curated `nearbyAttractions` list if no
   * destinations dataset is supplied.
   */
  static getRelatedDestinations(landmark, destinations = []) {
    if (!landmark) return [];
    if (Array.isArray(destinations) && destinations.length > 0) {
      return destinations
        .filter((d) => d.state === landmark.state && d.name !== landmark.city)
        .slice(0, 5)
        .map((d) => ({ name: d.name, state: d.state, highlights: d.highlights || [] }));
    }
    return (landmark.nearbyAttractions || []).map((name) => ({ name, state: landmark.state, highlights: [] }));
  }
}

export const RECOGNITION_CONSTANTS = { HASH_BITS, HISTORY_LIMIT };

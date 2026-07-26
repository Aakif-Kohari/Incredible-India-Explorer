/**
 * ACCESSIBILITY ENGINE
 * --------------------
 * Pure functions only — no DOM, no storage access — so this file can be
 * unit tested directly with Node (see accessibility-engine.test.js) and
 * reused unchanged in the browser.
 *
 * SCORING METHODOLOGY (see also README.md):
 *
 *   1. BASE SCORE (0-100): a weighted sum of structured metadata fields.
 *      Weights reflect how much each factor typically matters for
 *      independent access, not just "is it present":
 *
 *        wheelchairAccess (full=40, partial=20, none/unknown=0) .... 40%
 *        stepFreeEntry ................................................ 20%
 *        accessibleRestrooms .......................................... 15%
 *        accessibleParking ............................................ 10%
 *        audioGuide ..................................................... 7%
 *        brailleSignage ................................................ 5%
 *        signLanguageTours .............................................. 3%
 *                                                              total = 100
 *
 *   2. COMMUNITY ADJUSTMENT: if user reports exist, the base score is
 *      blended with the average community rating (1-5 stars, rescaled to
 *      0-100), weighted by how many reports exist (more reports = more
 *      trust in the community number), using a simple Bayesian-style
 *      shrinkage so 1-2 outlier reports can't swing the score wildly:
 *
 *        finalScore = (baseScore * priorWeight + communityScore * n)
 *                     / (priorWeight + n)
 *
 *      priorWeight = 5 (equivalent to 5 "average" reports of confidence),
 *      which means it takes a handful of consistent reports to meaningfully
 *      move the score away from the structured-data baseline.
 *
 *   3. CONFIDENCE LABEL:
 *        "unknown"           -> no structured data AND no reports
 *        "limited data"      -> structured data present, < 3 reports
 *        "community verified"-> 3+ reports
 */

const WEIGHTS = {
    wheelchairAccess: 40, // scaled by full=1, partial=0.5, none/unknown=0
    stepFreeEntry: 20,
    accessibleRestrooms: 15,
    accessibleParking: 10,
    audioGuide: 7,
    brailleSignage: 5,
    signLanguageTours: 3
};

const PRIOR_WEIGHT = 5;
const COMMUNITY_VERIFIED_THRESHOLD = 3;

function wheelchairFactor(value) {
    if (value === "full") return 1;
    if (value === "partial") return 0.5;
    return 0; // "none" or "unknown"
}

/**
 * Computes the deterministic base score (0-100) from structured metadata.
 * @param {object} meta - an accessibility metadata object (see accessibility-data.js)
 * @returns {number} score between 0 and 100
 */
function computeBaseScore(meta) {
    if (!meta) return 0;
    let score = 0;
    score += WEIGHTS.wheelchairAccess * wheelchairFactor(meta.wheelchairAccess);
    score += WEIGHTS.stepFreeEntry * (meta.stepFreeEntry ? 1 : 0);
    score += WEIGHTS.accessibleRestrooms * (meta.accessibleRestrooms ? 1 : 0);
    score += WEIGHTS.accessibleParking * (meta.accessibleParking ? 1 : 0);
    score += WEIGHTS.audioGuide * (meta.audioGuide ? 1 : 0);
    score += WEIGHTS.brailleSignage * (meta.brailleSignage ? 1 : 0);
    score += WEIGHTS.signLanguageTours * (meta.signLanguageTours ? 1 : 0);
    return Math.round(score * 100) / 100;
}

/**
 * Aggregates user-submitted reports into an average rating (1-5) and count.
 * @param {Array<{rating: number}>} reports
 */
function aggregateReports(reports) {
    if (!reports || reports.length === 0) {
        return { count: 0, averageRating: null };
    }
    const sum = reports.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    return {
        count: reports.length,
        averageRating: Math.round((sum / reports.length) * 100) / 100
    };
}

/**
 * Blends the base score with community reports using Bayesian shrinkage,
 * and returns a confidence label alongside the final score.
 * @param {object} meta - accessibility metadata (may be the UNKNOWN_META fallback)
 * @param {Array} reports - user-submitted reports for this destination
 * @param {boolean} hasVerifiedData - whether structured metadata exists at all
 */
function computeFinalScore(meta, reports, hasVerifiedData) {
    const baseScore = computeBaseScore(meta);
    const { count, averageRating } = aggregateReports(reports);

    let finalScore = baseScore;
    if (count > 0 && averageRating !== null) {
        const communityScore = (averageRating / 5) * 100;
        finalScore = (baseScore * PRIOR_WEIGHT + communityScore * count) / (PRIOR_WEIGHT + count);
    }

    let confidence = "unknown";
    if (hasVerifiedData || count > 0) {
        confidence = count >= COMMUNITY_VERIFIED_THRESHOLD ? "community verified" : "limited data";
    }

    return {
        score: Math.round(finalScore * 100) / 100,
        confidence,
        reportCount: count,
        averageRating
    };
}

/**
 * Checks whether a destination's metadata satisfies a set of user-selected
 * filters. All provided filters must be true/matched (AND semantics).
 * @param {object} meta
 * @param {object} filters e.g. { wheelchairAccess: "full", accessibleParking: true, minScore: 60 }
 * @param {number} score - the destination's computed final score, needed for minScore filtering
 */
function matchesFilters(meta, filters, score) {
    if (!filters) return true;

    if (filters.wheelchairAccess) {
        if (filters.wheelchairAccess === "full" && meta.wheelchairAccess !== "full") return false;
        if (filters.wheelchairAccess === "partial" && wheelchairFactor(meta.wheelchairAccess) === 0) return false;
    }
    if (filters.accessibleParking && !meta.accessibleParking) return false;
    if (filters.accessibleRestrooms && !meta.accessibleRestrooms) return false;
    if (filters.stepFreeEntry && !meta.stepFreeEntry) return false;
    if (filters.brailleSignage && !meta.brailleSignage) return false;
    if (filters.audioGuide && !meta.audioGuide) return false;
    if (filters.signLanguageTours && !meta.signLanguageTours) return false;
    if (typeof filters.minScore === "number" && score < filters.minScore) return false;

    return true;
}

/**
 * Generates a short, rule-based personalized recommendation blurb.
 * Deterministic (no external AI call needed) so it's fully unit-testable
 * and works with this project's no-backend, static-site architecture.
 * Mirrors the tone of the existing "Bharat AI" chatbot (see chatbot-data.js).
 *
 * @param {string} destinationName
 * @param {object} meta
 * @param {object} userNeeds - e.g. { mobility: true, visual: true, hearing: false }
 * @param {object} scoreInfo - output of computeFinalScore()
 */
function generateRecommendation(destinationName, meta, userNeeds, scoreInfo) {
    const needs = userNeeds || {};
    const notes = [];

    if (needs.mobility) {
        if (meta.wheelchairAccess === "full" && meta.stepFreeEntry) {
            notes.push("step-free routes and full wheelchair access");
        } else if (meta.wheelchairAccess === "partial") {
            notes.push("only partial wheelchair access — expect some steps or uneven terrain");
        } else {
            notes.push("no confirmed wheelchair access yet");
        }
        if (meta.accessibleParking) notes.push("accessible parking available");
    }

    if (needs.visual) {
        notes.push(meta.brailleSignage ? "braille signage present" : "no braille signage reported");
        if (meta.audioGuide) notes.push("audio guides available");
    }

    if (needs.hearing) {
        notes.push(meta.signLanguageTours ? "sign-language tours offered" : "no sign-language tours reported");
    }

    if (needs.mobility && meta.accessibleRestrooms) notes.push("accessible restrooms on site");

    const intro = scoreInfo.confidence === "unknown"
        ? `We don't have verified accessibility data for ${destinationName} yet.`
        : `${destinationName} scores ${Math.round(scoreInfo.score)}/100 for your accessibility needs (${scoreInfo.confidence}).`;

    const detail = notes.length > 0 ? ` Specifically: ${notes.join("; ")}.` : "";
    const cta = meta.notes ? ` Note: ${meta.notes}` : "";

    return `${intro}${detail}${cta}`;
}

// Expose for both the browser and Node (unit tests).
const AccessibilityEngine = {
    computeBaseScore,
    aggregateReports,
    computeFinalScore,
    matchesFilters,
    generateRecommendation,
    WEIGHTS,
    PRIOR_WEIGHT,
    COMMUNITY_VERIFIED_THRESHOLD
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = AccessibilityEngine;
}
if (typeof window !== "undefined") {
    window.AccessibilityEngine = AccessibilityEngine;
}

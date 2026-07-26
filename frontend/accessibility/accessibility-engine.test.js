/**
 * Run with: node frontend/accessibility/accessibility-engine.test.js
 *
 * Plain assertion-based tests — this repo has no build tooling / test
 * framework installed, so these are dependency-free and CI-friendly
 * (exits with code 1 on any failure).
 */

const assert = require("assert");
const {
    computeBaseScore,
    aggregateReports,
    computeFinalScore,
    matchesFilters,
    generateRecommendation
} = require("./accessibility-engine.js");
const { getAccessibilityMeta, hasVerifiedData, UNKNOWN_META } = require("./accessibility-data.js");

let passed = 0;
function test(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  ok - ${name}`);
    } catch (err) {
        console.error(`  FAIL - ${name}`);
        console.error(`    ${err.message}`);
        process.exitCode = 1;
    }
}

console.log("computeBaseScore");
test("full access + everything true = 100", () => {
    const meta = {
        wheelchairAccess: "full",
        stepFreeEntry: true,
        accessibleRestrooms: true,
        accessibleParking: true,
        audioGuide: true,
        brailleSignage: true,
        signLanguageTours: true
    };
    assert.strictEqual(computeBaseScore(meta), 100);
});

test("no access + everything false = 0", () => {
    const meta = {
        wheelchairAccess: "none",
        stepFreeEntry: false,
        accessibleRestrooms: false,
        accessibleParking: false,
        audioGuide: false,
        brailleSignage: false,
        signLanguageTours: false
    };
    assert.strictEqual(computeBaseScore(meta), 0);
});

test("partial wheelchair access counts half its weight", () => {
    const meta = {
        wheelchairAccess: "partial",
        stepFreeEntry: false,
        accessibleRestrooms: false,
        accessibleParking: false,
        audioGuide: false,
        brailleSignage: false,
        signLanguageTours: false
    };
    assert.strictEqual(computeBaseScore(meta), 20); // 40 * 0.5
});

test("unknown metadata falls back to a 0 base score, not a crash", () => {
    assert.strictEqual(computeBaseScore(UNKNOWN_META), 0);
    assert.strictEqual(computeBaseScore(null), 0);
});

console.log("\naggregateReports");
test("empty reports -> count 0, averageRating null", () => {
    const result = aggregateReports([]);
    assert.strictEqual(result.count, 0);
    assert.strictEqual(result.averageRating, null);
});

test("averages multiple reports correctly", () => {
    const result = aggregateReports([{ rating: 4 }, { rating: 2 }, { rating: 3 }]);
    assert.strictEqual(result.count, 3);
    assert.strictEqual(result.averageRating, 3);
});

console.log("\ncomputeFinalScore (Bayesian shrinkage + confidence labels)");
test("no reports -> final score equals base score, confidence reflects verified data", () => {
    const meta = getAccessibilityMeta("up"); // Uttar Pradesh, has verified data
    const result = computeFinalScore(meta, [], hasVerifiedData("up"));
    assert.strictEqual(result.score, computeBaseScore(meta));
    assert.strictEqual(result.confidence, "limited data");
    assert.strictEqual(result.reportCount, 0);
});

test("state with no structured data and no reports is 'unknown'", () => {
    const meta = getAccessibilityMeta("mp"); // not in the seed dataset
    const result = computeFinalScore(meta, [], hasVerifiedData("mp"));
    assert.strictEqual(result.confidence, "unknown");
});

test("a couple of outlier reports don't wildly swing a high base score", () => {
    const meta = getAccessibilityMeta("up"); // base score is high (100)
    const baseScore = computeBaseScore(meta);
    const outlierReports = [{ rating: 1 }, { rating: 1 }];
    const result = computeFinalScore(meta, outlierReports, true);
    // With prior weight 5 vs 2 outlier reports, the score should move
    // toward the outliers but not collapse to the outlier average (20).
    assert.ok(result.score < baseScore, "score should decrease somewhat");
    assert.ok(result.score > 20, "score should not collapse to the raw outlier average");
});

test("3+ reports flips confidence to 'community verified'", () => {
    const meta = getAccessibilityMeta("up");
    const reports = [{ rating: 5 }, { rating: 4 }, { rating: 5 }];
    const result = computeFinalScore(meta, reports, true);
    assert.strictEqual(result.confidence, "community verified");
});

console.log("\nmatchesFilters");
test("filters requiring full wheelchair access exclude partial-access destinations", () => {
    const partialMeta = getAccessibilityMeta("rj"); // Rajasthan = partial
    assert.strictEqual(matchesFilters(partialMeta, { wheelchairAccess: "full" }, 50), false);
});

test("minScore filter excludes destinations below the threshold", () => {
    const meta = getAccessibilityMeta("jk"); // Jammu & Kashmir, all false/none
    const score = computeBaseScore(meta);
    assert.strictEqual(matchesFilters(meta, { minScore: 50 }, score), false);
});

test("empty/undefined filters match everything", () => {
    const meta = getAccessibilityMeta("up");
    assert.strictEqual(matchesFilters(meta, undefined, 100), true);
    assert.strictEqual(matchesFilters(meta, {}, 100), true);
});

console.log("\ngenerateRecommendation");
test("mentions mobility-relevant details when mobility need is set", () => {
    const meta = getAccessibilityMeta("up");
    const scoreInfo = computeFinalScore(meta, [], true);
    const text = generateRecommendation("Uttar Pradesh", meta, { mobility: true }, scoreInfo);
    assert.ok(text.includes("wheelchair") || text.includes("step-free"));
});

test("unknown destinations get an honest 'no verified data' message", () => {
    const meta = UNKNOWN_META;
    const scoreInfo = computeFinalScore(meta, [], false);
    const text = generateRecommendation("Some State", meta, { mobility: true }, scoreInfo);
    assert.ok(text.includes("don't have verified accessibility data"));
});

console.log(`\n${passed} test(s) passed.`);
if (process.exitCode === 1) {
    console.error("Some tests FAILED.");
} else {
    console.log("All tests passed.");
}

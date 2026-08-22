/**
 * national-awards-timeline-quiz-hub.test.js
 * Unit test suite verifying National Awards Timeline & Quiz Hub module functions.
 * Run with: node docs/national-awards-timeline-quiz-hub.test.js
 */

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        passed += 1;
        console.log(`  ✓ ${message}`);
    } else {
        failed += 1;
        console.error(`  ✗ ${message}`);
    }
}

function section(title, fn) {
    console.log(`\n${title}`);
    fn();
}

async function runTests() {
    const { AWARD_ENCYCLOPEDIA, filterAwardsByCategory } = await import('../frontend/js-modules/national-awards.js');

    section("National Awards Encyclopedia Integrity Check", () => {
        const awards = Object.values(AWARD_ENCYCLOPEDIA);
        assert(awards.length >= 10, `AWARD_ENCYCLOPEDIA has ${awards.length} awards (expected >= 10)`);
        assert(AWARD_ENCYCLOPEDIA['bharat-ratna'] !== undefined, "Bharat Ratna exists");
        assert(AWARD_ENCYCLOPEDIA['param-vir-chakra'] !== undefined, "Param Vir Chakra exists");
        assert(AWARD_ENCYCLOPEDIA['khel-ratna'] !== undefined, "Khel Ratna exists");
        assert(AWARD_ENCYCLOPEDIA['jnanpith-award'] !== undefined, "Jnanpith exists");
    });

    section("Category Filtering Test", () => {
        const civilian = filterAwardsByCategory('civilian');
        assert(civilian.length >= 4, `civilian category has ${civilian.length} awards (expected >= 4)`);

        const gallantry = filterAwardsByCategory('gallantry');
        assert(gallantry.length >= 6, `gallantry category has ${gallantry.length} awards (expected >= 6)`);
    });

    console.log(`\nTest Summary: ${passed} passed, ${failed} failed.`);
    if (failed > 0) process.exit(1);
}

runTests();

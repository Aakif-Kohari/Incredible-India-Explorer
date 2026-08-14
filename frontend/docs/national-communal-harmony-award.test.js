/**
 * national-communal-harmony-award.test.js
 * Unit test suite verifying National Communal Harmony Award data integrity and helper functions.
 * Run with: node docs/national-communal-harmony-award.test.js
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
    const { AWARD_ENCYCLOPEDIA, filterAwardsByCategory, searchAwardsAndRecipients } = await import('../frontend/js-modules/national-awards.js');

    section("National Communal Harmony Award Data Check", () => {
        const award = AWARD_ENCYCLOPEDIA['national-communal-harmony-award'];
        assert(award !== undefined, "national-communal-harmony-award entry exists in AWARD_ENCYCLOPEDIA");
        assert(award.id === 'national-communal-harmony-award', "correct ID set");
        assert(award.establishedYear === '1996', "established year is 1996");
        assert(award.category === 'harmony', "category is 'harmony'");
        assert(award.notableWinners.length >= 5, "includes at least 5 notable winners");
        assert(award.interestingFacts.length >= 4, "includes at least 4 interesting facts");
    });

    section("Category Filter Test", () => {
        const harmonyAwards = filterAwardsByCategory('harmony');
        assert(harmonyAwards.length === 1, "filterAwardsByCategory('harmony') returns 1 entry");
        assert(harmonyAwards[0].name === 'National Communal Harmony Award', "correct award returned");
    });

    section("Search Functionality Test", () => {
        const searchResults = searchAwardsAndRecipients('communal harmony');
        assert(searchResults.some(a => a.id === 'national-communal-harmony-award'), "search for 'communal harmony' finds award");

        const winnerSearch = searchAwardsAndRecipients('Asghar Ali Engineer');
        assert(winnerSearch.some(a => a.id === 'national-communal-harmony-award'), "search for winner 'Asghar Ali Engineer' finds award");
    });

    console.log(`\nTest Summary: ${passed} passed, ${failed} failed.`);
    if (failed > 0) process.exit(1);
}

runTests();

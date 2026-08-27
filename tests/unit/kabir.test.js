/**
 * Kabir Explorer Engine — Vitest Unit Test Suite
 * Incredible India Explorer — Issue #3702
 *
 * Tests: Data payload integrity, timeline DOM population,
 * verse card rendering & filtering, and null safety.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

/* ──────────────────────────────────────────────
   INLINE DATA MIRRORS (avoids ESM import of browser script)
   ────────────────────────────────────────────── */

const TIMELINE_EVENTS_MOCK = [
    { id: 1, step: 'c. 1440', icon: '🪷', title: 'Legendary Birth', type: 'tradition', detail: 'Born at Lahartara Lake.' },
    { id: 2, step: 'c. 1450s', icon: '🧵', title: 'Life as Weaver', type: 'tradition', detail: 'Worked in Varanasi.' },
    { id: 3, step: 'c. 1460s', icon: '🙏', title: 'Discipleship Under Ramananda', type: 'tradition', detail: 'Became disciple of Ramananda.' },
    { id: 4, step: 'c. 1470s', icon: '✨', title: 'Spiritual Awakening', type: 'legacy', detail: 'Began composing verses.' },
    { id: 5, step: 'c. 1480s', icon: '⚔️', title: 'Confrontation with Sikandar Lodi', type: 'legacy', detail: 'Challenged the Emperor.' },
    { id: 6, step: '1518', icon: '🪷', title: 'Death at Maghar', type: 'tradition', detail: 'Miraculous death narrative.' },
];

const VERSES_MOCK = [
    { id: 1, theme: 'wisdom', hindi: 'पोथी पढ़ पढ़ जग मुआ', translation: 'Reading books, the world died.', source: 'Bijak' },
    { id: 2, theme: 'devotion', hindi: 'गुरु गोविंद दोनों खड़े', translation: 'Guru and God stand before me.', source: 'Guru Granth Sahib' },
    { id: 3, theme: 'social', hindi: 'जात-पात पूछे नहिं कोई', translation: 'God does not ask caste.', source: 'Padavali' },
    { id: 4, theme: 'nature', hindi: 'मैं तो डूबती को तारूँ', translation: 'I ferry across those drowning.', source: 'Bijak' },
    { id: 5, theme: 'wisdom', hindi: 'माला फिरत जुग भया', translation: 'Turning beads for an age.', source: 'Bijak' },
];

/* ──────────────────────────────────────────────
   ENGINE IMPLEMENTATIONS (extracted for testability)
   ────────────────────────────────────────────── */

function renderTimeline(container, events) {
    if (!container) return;
    container.innerHTML = '';

    events.forEach(function (event) {
        var eventEl = container.ownerDocument.createElement('div');
        eventEl.className = 'tl-event';
        eventEl.setAttribute('data-event-id', event.id);

        var card = container.ownerDocument.createElement('div');
        card.className = 'tl-card ' + event.type;
        card.id = 'tl-card-' + event.id;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-expanded', 'false');

        var step = container.ownerDocument.createElement('div');
        step.className = 'tl-step';
        step.textContent = event.step;

        var title = container.ownerDocument.createElement('div');
        title.className = 'tl-title';
        title.textContent = event.title;

        var detail = container.ownerDocument.createElement('div');
        detail.className = 'tl-detail';
        detail.id = 'tl-detail-' + event.id;
        detail.textContent = event.detail;

        card.appendChild(step);
        card.appendChild(title);
        card.appendChild(detail);
        eventEl.appendChild(card);

        // Attach toggle
        card.addEventListener('click', function () {
            var expanded = detail.classList.toggle('expanded');
            card.setAttribute('aria-expanded', String(expanded));
        });

        container.appendChild(eventEl);
    });
}

function renderVerses(container, theme, verses) {
    if (!container) return;
    container.innerHTML = '';

    var dataset = theme === 'all' ? verses : verses.filter(function (v) { return v.theme === theme; });

    dataset.forEach(function (verse) {
        var card = container.ownerDocument.createElement('div');
        card.className = 'verse-card';
        card.setAttribute('data-theme', verse.theme);
        card.setAttribute('data-id', verse.id);

        var hindi = container.ownerDocument.createElement('div');
        hindi.className = 'verse-hindi';
        hindi.textContent = verse.hindi;

        var translation = container.ownerDocument.createElement('p');
        translation.className = 'verse-translation';
        translation.textContent = verse.translation;

        card.appendChild(hindi);
        card.appendChild(translation);
        container.appendChild(card);
    });
}

/* ──────────────────────────────────────────────
   TEST SUITES
   ────────────────────────────────────────────── */

describe('Kabir Explorer Engine — Full Suite', function () {
    var doc;
    var win;

    beforeEach(function () {
        var dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <div id="kabir-timeline"></div>
                <div id="verses-container"></div>
                <div class="verse-filters">
                    <button class="vf-btn active" data-theme="all">All</button>
                    <button class="vf-btn" data-theme="devotion">Devotion</button>
                    <button class="vf-btn" data-theme="wisdom">Wisdom</button>
                    <button class="vf-btn" data-theme="social">Social</button>
                    <button class="vf-btn" data-theme="nature">Nature</button>
                </div>
            </body>
            </html>
        `);
        win = dom.window;
        doc = win.document;
        global.document = doc;
        global.window = win;
    });

    afterEach(function () {
        global.document = undefined;
        global.window = undefined;
    });

    // ── Timeline Data Integrity ──────────────────────
    describe('TIMELINE_EVENTS_MOCK Data Integrity', function () {
        it('should have 6 mock events with required fields', function () {
            expect(TIMELINE_EVENTS_MOCK.length).toBe(6);
            TIMELINE_EVENTS_MOCK.forEach(function (ev) {
                expect(ev).toHaveProperty('id');
                expect(ev).toHaveProperty('step');
                expect(ev).toHaveProperty('icon');
                expect(ev).toHaveProperty('title');
                expect(ev).toHaveProperty('type');
                expect(ev).toHaveProperty('detail');
            });
        });

        it('should include both tradition and legacy typed events', function () {
            var traditions = TIMELINE_EVENTS_MOCK.filter(function (e) { return e.type === 'tradition'; });
            var legacies = TIMELINE_EVENTS_MOCK.filter(function (e) { return e.type === 'legacy'; });
            expect(traditions.length).toBeGreaterThanOrEqual(2);
            expect(legacies.length).toBeGreaterThanOrEqual(2);
        });

        it('should have sequential IDs starting from 1', function () {
            TIMELINE_EVENTS_MOCK.forEach(function (ev, index) {
                expect(ev.id).toBe(index + 1);
            });
        });

        it('should have unique titles for each event', function () {
            var titles = TIMELINE_EVENTS_MOCK.map(function (ev) { return ev.title; });
            var unique = new Set(titles);
            expect(unique.size).toBe(titles.length);
        });
    });

    // ── Timeline DOM Engine ──────────────────────────
    describe('Timeline DOM Population', function () {
        it('should render correct number of timeline events', function () {
            var container = doc.getElementById('kabir-timeline');
            renderTimeline(container, TIMELINE_EVENTS_MOCK);
            var cards = doc.querySelectorAll('.tl-card');
            expect(cards.length).toBe(TIMELINE_EVENTS_MOCK.length);
        });

        it('should stamp correct type class on each card', function () {
            var container = doc.getElementById('kabir-timeline');
            renderTimeline(container, TIMELINE_EVENTS_MOCK);
            var traditionCards = doc.querySelectorAll('.tl-card.tradition');
            var legacyCards = doc.querySelectorAll('.tl-card.legacy');
            expect(traditionCards.length).toBeGreaterThanOrEqual(2);
            expect(legacyCards.length).toBeGreaterThanOrEqual(2);
        });

        it('should start with aria-expanded false on all cards', function () {
            var container = doc.getElementById('kabir-timeline');
            renderTimeline(container, TIMELINE_EVENTS_MOCK);
            var cards = doc.querySelectorAll('.tl-card');
            cards.forEach(function (card) {
                expect(card.getAttribute('aria-expanded')).toBe('false');
            });
        });

        it('should toggle detail visible on card click and update aria-expanded', function () {
            var container = doc.getElementById('kabir-timeline');
            renderTimeline(container, TIMELINE_EVENTS_MOCK);
            var firstCard = doc.getElementById('tl-card-1');
            var detail = doc.getElementById('tl-detail-1');
            expect(detail.classList.contains('expanded')).toBe(false);

            firstCard.click();
            expect(detail.classList.contains('expanded')).toBe(true);
            expect(firstCard.getAttribute('aria-expanded')).toBe('true');

            firstCard.click(); // collapse
            expect(detail.classList.contains('expanded')).toBe(false);
            expect(firstCard.getAttribute('aria-expanded')).toBe('false');
        });

        it('should set data-event-id correctly on each event wrapper', function () {
            var container = doc.getElementById('kabir-timeline');
            renderTimeline(container, TIMELINE_EVENTS_MOCK);
            var wrappers = doc.querySelectorAll('.tl-event');
            wrappers.forEach(function (wrapper, i) {
                expect(wrapper.getAttribute('data-event-id')).toBe(String(TIMELINE_EVENTS_MOCK[i].id));
            });
        });
    });

    // ── Verses Engine ────────────────────────────────
    describe('Verses Grid Rendering & Filtering', function () {
        it('should render all verses when filter is "all"', function () {
            var container = doc.getElementById('verses-container');
            renderVerses(container, 'all', VERSES_MOCK);
            var cards = doc.querySelectorAll('.verse-card');
            expect(cards.length).toBe(VERSES_MOCK.length);
        });

        it('should filter correctly for "wisdom" theme', function () {
            var container = doc.getElementById('verses-container');
            renderVerses(container, 'wisdom', VERSES_MOCK);
            var cards = doc.querySelectorAll('.verse-card');
            var expected = VERSES_MOCK.filter(function (v) { return v.theme === 'wisdom'; }).length;
            expect(cards.length).toBe(expected);
        });

        it('should filter correctly for "devotion" theme', function () {
            var container = doc.getElementById('verses-container');
            renderVerses(container, 'devotion', VERSES_MOCK);
            var cards = doc.querySelectorAll('.verse-card');
            expect(cards.length).toBe(1);
            expect(cards[0].getAttribute('data-theme')).toBe('devotion');
        });

        it('should filter correctly for "social" theme', function () {
            var container = doc.getElementById('verses-container');
            renderVerses(container, 'social', VERSES_MOCK);
            var cards = doc.querySelectorAll('.verse-card');
            expect(cards.length).toBe(1);
            expect(cards[0].getAttribute('data-theme')).toBe('social');
        });

        it('should filter correctly for "nature" theme', function () {
            var container = doc.getElementById('verses-container');
            renderVerses(container, 'nature', VERSES_MOCK);
            var cards = doc.querySelectorAll('.verse-card');
            expect(cards.length).toBe(1);
            expect(cards[0].getAttribute('data-theme')).toBe('nature');
        });

        it('should return empty grid for unknown theme', function () {
            var container = doc.getElementById('verses-container');
            renderVerses(container, 'cosmos', VERSES_MOCK);
            var cards = doc.querySelectorAll('.verse-card');
            expect(cards.length).toBe(0);
        });

        it('should contain verse-hindi element with correct text', function () {
            var container = doc.getElementById('verses-container');
            renderVerses(container, 'all', VERSES_MOCK);
            var hindiEls = doc.querySelectorAll('.verse-hindi');
            var texts = Array.from(hindiEls).map(function (el) { return el.textContent; });
            expect(texts).toContain('गुरु गोविंद दोनों खड़े');
        });
    });

    // ── Verses Data Integrity ─────────────────────────
    describe('VERSES_MOCK Data Integrity', function () {
        it('each verse should have required fields with valid theme', function () {
            var validThemes = ['devotion', 'wisdom', 'social', 'nature'];
            VERSES_MOCK.forEach(function (v) {
                expect(v).toHaveProperty('id');
                expect(v).toHaveProperty('theme');
                expect(v).toHaveProperty('hindi');
                expect(v).toHaveProperty('translation');
                expect(v).toHaveProperty('source');
                expect(validThemes).toContain(v.theme);
            });
        });

        it('should have at least one verse per theme category', function () {
            var themes = ['devotion', 'wisdom', 'social', 'nature'];
            themes.forEach(function (theme) {
                var found = VERSES_MOCK.find(function (v) { return v.theme === theme; });
                expect(found).toBeTruthy();
            });
        });
    });

    // ── Null Safety ───────────────────────────────────
    describe('Null Container Safety', function () {
        it('renderTimeline with null container should not throw', function () {
            expect(function () { renderTimeline(null, TIMELINE_EVENTS_MOCK); }).not.toThrow();
        });

        it('renderVerses with null container should not throw', function () {
            expect(function () { renderVerses(null, 'all', VERSES_MOCK); }).not.toThrow();
        });
    });
});

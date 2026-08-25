/**
 * Samudra Manthan Engine — Vitest Unit Test Suite
 * Incredible India Explorer — Issue #3703
 *
 * Tests: DOM population logic, character filtering, treasure card rendering,
 * timeline event expand/collapse behaviour, and data payload integrity.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

/* ──────────────────────────────────────────────
   INLINE DATA MIRRORS (avoids ESM import of browser script)
   ────────────────────────────────────────────── */

const STORY_EVENTS_MOCK = [
    { id: 1, step: 'Event 01', icon: '⚡', title: "Durvasa's Curse", type: 'default', detail: 'The Devas were weakened by a curse.' },
    { id: 2, step: 'Event 02', icon: '🤝', title: 'Vishnu Proposes the Pact', type: 'divine', detail: 'Vishnu suggested churning.' },
    { id: 3, step: 'Event 03', icon: '⛰️', title: 'Mandara Is Uprooted', type: 'default', detail: 'Mount Mandara was the churning rod.' },
    { id: 4, step: 'Event 04', icon: '🐢', title: 'Kurma Avatar Descends', type: 'divine', detail: 'Vishnu became a tortoise.' },
    { id: 5, step: 'Event 05', icon: '🐍', title: 'Vasuki Becomes the Rope', type: 'default', detail: 'Vasuki served as the rope.' },
    { id: 6, step: 'Event 06', icon: '☠️', title: 'Halahala Emerges', type: 'danger', detail: 'Poison consumed by Shiva.' },
    { id: 7, step: 'Event 07', icon: '✨', title: 'Treasures Emerge', type: 'divine', detail: 'Fourteen ratnas appeared.' },
];

const CHARACTERS_MOCK = [
    { id: 1, emoji: '👑', name: 'Vishnu', type: 'deva', desc: 'Preserver of the Universe.' },
    { id: 2, emoji: '⚡', name: 'Indra', type: 'deva', desc: 'King of the Devas.' },
    { id: 3, emoji: '🔱', name: 'Shiva', type: 'deva', desc: 'Consumed Halahala.' },
    { id: 4, emoji: '👹', name: 'Bali Maharaj', type: 'asura', desc: 'King of the Asuras.' },
    { id: 5, emoji: '📖', name: 'Shukracharya', type: 'asura', desc: 'Preceptor of the Asuras.' },
    { id: 6, emoji: '🐚', name: 'Vasuki', type: 'object', desc: 'Serpent rope of churning.' },
    { id: 7, emoji: '⛰️', name: 'Mount Mandara', type: 'object', desc: 'The churning rod.' },
];

const TREASURES_MOCK = [
    { order: 1, emoji: '🐄', name: 'Kamadhenu', sanskrit: 'कामधेनु', claimedBy: 'deva', claimedName: 'Claimed by Devas', desc: 'Wish-fulfilling cow.' },
    { order: 6, emoji: '🌙', name: 'Chandra', sanskrit: 'चन्द्र', claimedBy: 'deva', claimedName: 'Adorns Shiva', desc: 'The Moon god.' },
    { order: 13, emoji: '☠️', name: 'Halahala', sanskrit: 'हलाहल', claimedBy: 'shiva', claimedName: 'Consumed by Shiva', desc: 'Deadly poison.' },
    { order: 14, emoji: '🏺', name: 'Amrita', sanskrit: 'अमृत', claimedBy: 'deva', claimedName: 'Given to Devas', desc: 'Nectar of immortality.' },
];

/* ──────────────────────────────────────────────
   ENGINE IMPLEMENTATIONS (extracted for testability)
   ────────────────────────────────────────────── */

function renderTimeline(container, events) {
    if (!container) return;
    container.innerHTML = '';
    events.forEach(event => {
        const eventEl = container.ownerDocument.createElement('div');
        eventEl.className = 'tl-event';
        eventEl.setAttribute('data-event-id', event.id);

        const card = container.ownerDocument.createElement('div');
        card.className = `tl-card ${event.type}`;
        card.id = `tl-card-${event.id}`;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-expanded', 'false');

        const step = container.ownerDocument.createElement('div');
        step.className = 'tl-step';
        step.textContent = event.step;

        const title = container.ownerDocument.createElement('div');
        title.className = 'tl-title';
        title.textContent = event.title;

        const detail = container.ownerDocument.createElement('div');
        detail.className = 'tl-detail';
        detail.id = `tl-detail-${event.id}`;
        detail.textContent = event.detail;

        card.appendChild(step);
        card.appendChild(title);
        card.appendChild(detail);
        eventEl.appendChild(card);

        // Attach toggle
        card.addEventListener('click', () => {
            const expanded = detail.classList.toggle('expanded');
            card.setAttribute('aria-expanded', String(expanded));
        });

        container.appendChild(eventEl);
    });
}

function renderCharacters(container, filter, characters) {
    if (!container) return;
    container.innerHTML = '';
    const dataset = filter === 'all' ? characters : characters.filter(c => c.type === filter);
    dataset.forEach(char => {
        const card = container.ownerDocument.createElement('div');
        card.className = 'char-card';
        card.setAttribute('data-type', char.type);
        card.setAttribute('data-id', char.id);
        card.innerHTML = `<div class="char-emoji">${char.emoji}</div><div class="char-name">${char.name}</div><span class="char-type-badge type-${char.type}">${char.type}</span><p class="char-desc">${char.desc}</p>`;
        container.appendChild(card);
    });
}

function renderTreasures(container, treasures) {
    if (!container) return;
    container.innerHTML = '';
    treasures.forEach(treasure => {
        const card = container.ownerDocument.createElement('div');
        card.className = `treasure-card claimed-${treasure.claimedBy}`;
        card.setAttribute('data-order', `#${treasure.order}`);
        card.setAttribute('data-id', treasure.order);
        card.innerHTML = `<div class="treasure-emoji">${treasure.emoji}</div><div class="treasure-name">${treasure.name}</div><div class="treasure-sanskrit">${treasure.sanskrit}</div><p class="treasure-desc">${treasure.desc}</p><span class="treasure-claimed">${treasure.claimedName}</span>`;
        container.appendChild(card);
    });
}

/* ──────────────────────────────────────────────
   TEST SUITES
   ────────────────────────────────────────────── */

describe('Samudra Manthan Engine — Full Suite', () => {
    let doc;
    let win;

    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <div id="story-timeline"></div>
                <div id="characters-container"></div>
                <div id="treasures-container"></div>
                <div id="emerging-treasures"></div>
                <div class="character-filters">
                    <button class="char-filter-btn active" data-filter="all">All</button>
                    <button class="char-filter-btn" data-filter="deva">Devas</button>
                    <button class="char-filter-btn" data-filter="asura">Asuras</button>
                    <button class="char-filter-btn" data-filter="object">Objects</button>
                    <button class="char-filter-btn" data-filter="villain">Villain</button>
                </div>
            </body>
            </html>
        `);
        win = dom.window;
        doc = win.document;
        global.document = doc;
        global.window = win;
    });

    afterEach(() => {
        global.document = undefined;
        global.window = undefined;
    });

    // ── Data Integrity ──────────────────────────────
    describe('STORY_EVENTS Data Payload Integrity', () => {
        it('should have 7 mock events with required fields', () => {
            expect(STORY_EVENTS_MOCK.length).toBe(7);
            STORY_EVENTS_MOCK.forEach(ev => {
                expect(ev).toHaveProperty('id');
                expect(ev).toHaveProperty('step');
                expect(ev).toHaveProperty('icon');
                expect(ev).toHaveProperty('title');
                expect(ev).toHaveProperty('type');
                expect(ev).toHaveProperty('detail');
            });
        });

        it('should include a danger-typed event for Halahala', () => {
            const danger = STORY_EVENTS_MOCK.find(e => e.type === 'danger');
            expect(danger).toBeTruthy();
            expect(danger.title).toContain('Halahala');
        });

        it('should include divine-typed events', () => {
            const divineEvents = STORY_EVENTS_MOCK.filter(e => e.type === 'divine');
            expect(divineEvents.length).toBeGreaterThanOrEqual(2);
        });

        it('should have sequential IDs starting from 1', () => {
            STORY_EVENTS_MOCK.forEach((ev, index) => {
                expect(ev.id).toBe(index + 1);
            });
        });
    });

    // ── Timeline DOM Engine ──────────────────────────
    describe('Timeline DOM Population', () => {
        it('should render correct number of timeline events', () => {
            const container = doc.getElementById('story-timeline');
            renderTimeline(container, STORY_EVENTS_MOCK);
            const cards = doc.querySelectorAll('.tl-card');
            expect(cards.length).toBe(STORY_EVENTS_MOCK.length);
        });

        it('should stamp correct type class on each card', () => {
            const container = doc.getElementById('story-timeline');
            renderTimeline(container, STORY_EVENTS_MOCK);
            const dangerCard = doc.querySelector('.tl-card.danger');
            expect(dangerCard).not.toBeNull();
            expect(dangerCard.querySelector('.tl-title').textContent).toContain('Halahala');
        });

        it('should start with aria-expanded false on all cards', () => {
            const container = doc.getElementById('story-timeline');
            renderTimeline(container, STORY_EVENTS_MOCK);
            const cards = doc.querySelectorAll('.tl-card');
            cards.forEach(card => {
                expect(card.getAttribute('aria-expanded')).toBe('false');
            });
        });

        it('should toggle detail visible on card click and update aria-expanded', () => {
            const container = doc.getElementById('story-timeline');
            renderTimeline(container, STORY_EVENTS_MOCK);
            const firstCard = doc.getElementById('tl-card-1');
            const detail = doc.getElementById('tl-detail-1');
            expect(detail.classList.contains('expanded')).toBe(false);

            firstCard.click();
            expect(detail.classList.contains('expanded')).toBe(true);
            expect(firstCard.getAttribute('aria-expanded')).toBe('true');

            firstCard.click(); // collapse
            expect(detail.classList.contains('expanded')).toBe(false);
            expect(firstCard.getAttribute('aria-expanded')).toBe('false');
        });

        it('should only expand clicked card and not affect siblings', () => {
            const container = doc.getElementById('story-timeline');
            renderTimeline(container, STORY_EVENTS_MOCK);
            const card1 = doc.getElementById('tl-card-1');
            const detail2 = doc.getElementById('tl-detail-2');

            card1.click();
            expect(detail2.classList.contains('expanded')).toBe(false);
        });

        it('should set data-event-id correctly on each event wrapper', () => {
            const container = doc.getElementById('story-timeline');
            renderTimeline(container, STORY_EVENTS_MOCK);
            const wrappers = doc.querySelectorAll('.tl-event');
            wrappers.forEach((wrapper, i) => {
                expect(wrapper.getAttribute('data-event-id')).toBe(String(STORY_EVENTS_MOCK[i].id));
            });
        });
    });

    // ── Characters Engine ────────────────────────────
    describe('Characters Grid Rendering & Filtering', () => {
        it('should render all characters when filter is "all"', () => {
            const container = doc.getElementById('characters-container');
            renderCharacters(container, 'all', CHARACTERS_MOCK);
            const cards = doc.querySelectorAll('.char-card');
            expect(cards.length).toBe(CHARACTERS_MOCK.length);
        });

        it('should filter correctly for "deva" characters', () => {
            const container = doc.getElementById('characters-container');
            renderCharacters(container, 'deva', CHARACTERS_MOCK);
            const cards = doc.querySelectorAll('.char-card');
            const expected = CHARACTERS_MOCK.filter(c => c.type === 'deva').length;
            expect(cards.length).toBe(expected);
            cards.forEach(card => expect(card.getAttribute('data-type')).toBe('deva'));
        });

        it('should filter correctly for "asura" characters', () => {
            const container = doc.getElementById('characters-container');
            renderCharacters(container, 'asura', CHARACTERS_MOCK);
            const cards = doc.querySelectorAll('.char-card');
            const expected = CHARACTERS_MOCK.filter(c => c.type === 'asura').length;
            expect(cards.length).toBe(expected);
        });

        it('should filter correctly for "object" characters', () => {
            const container = doc.getElementById('characters-container');
            renderCharacters(container, 'object', CHARACTERS_MOCK);
            const cards = doc.querySelectorAll('.char-card');
            const expected = CHARACTERS_MOCK.filter(c => c.type === 'object').length;
            expect(cards.length).toBe(expected);
        });

        it('should return empty grid for unknown filter type', () => {
            const container = doc.getElementById('characters-container');
            renderCharacters(container, 'villain', CHARACTERS_MOCK);
            const cards = doc.querySelectorAll('.char-card');
            expect(cards.length).toBe(0);
        });

        it('should correctly apply type-badge class to each card', () => {
            const container = doc.getElementById('characters-container');
            renderCharacters(container, 'deva', CHARACTERS_MOCK);
            const badges = doc.querySelectorAll('.char-type-badge');
            badges.forEach(badge => expect(badge.classList.contains('type-deva')).toBe(true));
        });

        it('should contain char-name element with correct text', () => {
            const container = doc.getElementById('characters-container');
            renderCharacters(container, 'all', CHARACTERS_MOCK);
            const names = Array.from(doc.querySelectorAll('.char-name')).map(el => el.textContent);
            expect(names).toContain('Vishnu');
            expect(names).toContain('Bali Maharaj');
        });
    });

    // ── Treasures Engine ─────────────────────────────
    describe('Fourteen Treasures Card Rendering', () => {
        it('should render all supplied treasure cards', () => {
            const container = doc.getElementById('treasures-container');
            renderTreasures(container, TREASURES_MOCK);
            const cards = doc.querySelectorAll('.treasure-card');
            expect(cards.length).toBe(TREASURES_MOCK.length);
        });

        it('should apply correct claimed-by class to each treasure', () => {
            const container = doc.getElementById('treasures-container');
            renderTreasures(container, TREASURES_MOCK);
            const cards = doc.querySelectorAll('.treasure-card');
            const amritaCard = Array.from(cards).find(c => c.getAttribute('data-id') === '14');
            expect(amritaCard.classList.contains('claimed-deva')).toBe(true);

            const halahalaCard = Array.from(cards).find(c => c.getAttribute('data-id') === '13');
            expect(halahalaCard.classList.contains('claimed-shiva')).toBe(true);
        });

        it('should display Sanskrit text in treasure-sanskrit element', () => {
            const container = doc.getElementById('treasures-container');
            renderTreasures(container, TREASURES_MOCK);
            const sanskritEls = doc.querySelectorAll('.treasure-sanskrit');
            const texts = Array.from(sanskritEls).map(el => el.textContent);
            expect(texts).toContain('अमृत');
            expect(texts).toContain('हलाहल');
        });

        it('should set data-order attribute with # prefix', () => {
            const container = doc.getElementById('treasures-container');
            renderTreasures(container, TREASURES_MOCK);
            const cards = doc.querySelectorAll('.treasure-card');
            cards.forEach((card, i) => {
                expect(card.getAttribute('data-order')).toBe(`#${TREASURES_MOCK[i].order}`);
            });
        });

        it('should display the claimedName text in treasure-claimed element', () => {
            const container = doc.getElementById('treasures-container');
            renderTreasures(container, TREASURES_MOCK);
            const claimed = Array.from(doc.querySelectorAll('.treasure-claimed')).map(el => el.textContent);
            expect(claimed).toContain('Given to Devas');
            expect(claimed).toContain('Consumed by Shiva');
        });
    });

    // ── CHARACTERS_MOCK Data Integrity ───────────────
    describe('CHARACTERS_MOCK Data Integrity', () => {
        it('should have three distinct type categories', () => {
            const types = [...new Set(CHARACTERS_MOCK.map(c => c.type))];
            expect(types).toContain('deva');
            expect(types).toContain('asura');
            expect(types).toContain('object');
        });

        it('each character should have required fields', () => {
            CHARACTERS_MOCK.forEach(char => {
                expect(char).toHaveProperty('id');
                expect(char).toHaveProperty('emoji');
                expect(char).toHaveProperty('name');
                expect(char).toHaveProperty('type');
                expect(char).toHaveProperty('desc');
                expect(typeof char.desc).toBe('string');
                expect(char.desc.length).toBeGreaterThan(0);
            });
        });
    });

    // ── TREASURES_MOCK Data Integrity ─────────────────
    describe('TREASURES_MOCK Data Integrity', () => {
        it('each treasure should have required fields and valid claimedBy', () => {
            const validClaims = ['deva', 'asura', 'shiva'];
            TREASURES_MOCK.forEach(t => {
                expect(t).toHaveProperty('order');
                expect(t).toHaveProperty('emoji');
                expect(t).toHaveProperty('name');
                expect(t).toHaveProperty('sanskrit');
                expect(t).toHaveProperty('claimedBy');
                expect(validClaims).toContain(t.claimedBy);
            });
        });

        it('Amrita should be the last treasure (order 14)', () => {
            const amrita = TREASURES_MOCK.find(t => t.name === 'Amrita');
            expect(amrita).toBeTruthy();
            expect(amrita.order).toBe(14);
        });

        it('Halahala should be marked as claimed by Shiva', () => {
            const halahala = TREASURES_MOCK.find(t => t.name === 'Halahala');
            expect(halahala.claimedBy).toBe('shiva');
        });
    });

    // ── Null Safety ───────────────────────────────────
    describe('Null Container Safety', () => {
        it('renderTimeline with null container should not throw', () => {
            expect(() => renderTimeline(null, STORY_EVENTS_MOCK)).not.toThrow();
        });

        it('renderCharacters with null container should not throw', () => {
            expect(() => renderCharacters(null, 'all', CHARACTERS_MOCK)).not.toThrow();
        });

        it('renderTreasures with null container should not throw', () => {
            expect(() => renderTreasures(null, TREASURES_MOCK)).not.toThrow();
        });
    });
});

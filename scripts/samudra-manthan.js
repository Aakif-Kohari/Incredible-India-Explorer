/**
 * Samudra Manthan Interactive Engine
 * Incredible India Explorer — Issue #3703
 *
 * Drives the story timeline, character filter grid,
 * fourteen treasures display, and cosmic visualization animation.
 */

'use strict';

/* ──────────────────────────────────────────────
   DATA STORES
   ────────────────────────────────────────────── */

const STORY_EVENTS = [
    {
        id: 1,
        step: 'Event 01',
        icon: '⚡',
        title: "Durvasa's Curse — The Devas Weaken",
        type: 'default',
        detail: "Sage Durvasa, known for his volatile temper, gifted a divine garland to Indra, king of the Devas. Indra carelessly placed it on his elephant, Airavata, who trampled it. Enraged, Durvasa cursed the Devas: their glory, strength, and fortune would vanish. Stripped of power, the Devas were driven from the heavens by the opportunistic Asuras, led by Bali Maharaj."
    },
    {
        id: 2,
        step: 'Event 02',
        icon: '🤝',
        title: 'Lord Vishnu Proposes the Cosmic Pact',
        type: 'divine',
        detail: "The weakened Devas approached Lord Vishnu, the great Preserver of the Universe, for counsel. Vishnu proposed the audacious plan: churn the cosmic milk ocean (Kshira Sagara) using Mount Mandara as the rod and the serpent Vasuki as the rope. He advised the Devas to form a temporary alliance with the Asuras, promising to share the Amrita (nectar of immortality) — though Vishnu secretly intended only the Devas would receive it."
    },
    {
        id: 3,
        step: 'Event 03',
        icon: '⛰️',
        title: 'Mount Mandara Is Uprooted',
        type: 'default',
        detail: "The gods and titans uprooted the colossal Mount Mandara and carried it to the cosmic ocean. However, the mountain was so immensely heavy that it sank into the ocean floor before churning could begin. An emergency arose that required Vishnu to intervene once more."
    },
    {
        id: 4,
        step: 'Event 04',
        icon: '🐢',
        title: 'Vishnu Descends as Kurma — The Cosmic Tortoise',
        type: 'divine',
        detail: "Taking his second Dashavatara form, Vishnu transformed into the giant tortoise Kurma and plunged 30,000 leagues beneath the ocean. He placed Mount Mandara on his back, providing a stable foundation for the churning to begin. This event is celebrated as one of the most significant divine interventions in Vedic cosmology."
    },
    {
        id: 5,
        step: 'Event 05',
        icon: '🐍',
        title: 'Vasuki Is Coiled as the Rope',
        type: 'default',
        detail: "The great serpent king Vasuki consented to serve as the churning rope. The Asuras, claiming the honour of holding the head, actually suffered greatly from the poisonous fumes Vasuki exhaled. The Devas, holding the tail end, were spared this agony — a strategic advantage orchestrated by Vishnu."
    },
    {
        id: 6,
        step: 'Event 06',
        icon: '☠️',
        title: 'Halahala — The Deadly Poison Emerges',
        type: 'danger',
        detail: "The first thing to emerge from the churning ocean was not a treasure but a catastrophe: Halahala, a terrible poison so potent it could destroy all of creation. Terrified, both Devas and Asuras fled. The universe was in peril until Lord Shiva, at the request of both Vishnu and Brahma, stepped forward and consumed the deadly poison himself, holding it in his throat. This turned his throat blue, earning him the eternal name Neelakantha — the Blue-Throated One."
    },
    {
        id: 7,
        step: 'Event 07',
        icon: '✨',
        title: 'The Fourteen Treasures Emerge',
        type: 'divine',
        detail: "With the crisis of Halahala resolved, the churning resumed and the fourteen divine ratnas (treasures) began to emerge in sequence — from the wish-fulfilling cow Kamadhenu to the physician of the gods Dhanvantari bearing the Amrita. Each emergence was a cosmic event that transformed the balance of the universe."
    },
    {
        id: 8,
        step: 'Event 08',
        icon: '🏺',
        title: "Dhanvantari Emerges with the Amrita",
        type: 'divine',
        detail: "The physician of the gods, Dhanvantari, rose from the ocean bearing a white pot (kumbha) filled with Amrita — the nectar of immortality. Dhanvantari is worshipped as the god of Ayurveda (the science of life). His emergence is commemorated as Dhanteras, celebrated two days before Diwali."
    },
    {
        id: 9,
        step: 'Event 09',
        icon: '🦚',
        title: 'Mohini — Vishnu Deceives the Asuras',
        type: 'divine',
        detail: "When the Amrita emerged, the Asuras seized it immediately. Vishnu then took the enchanting female form of Mohini, whose irresistible beauty mesmerised the Asuras. While they were distracted, Mohini distributed the Amrita exclusively to the Devas. The demon Svarbhanu disguised himself as a Deva, but was discovered by the Sun and Moon gods; Vishnu severed his head with the Sudarshana Chakra — creating Rahu and Ketu, the eclipse lords."
    },
    {
        id: 10,
        step: 'Event 10',
        icon: '⚡',
        title: 'Devas Restored — Cosmic Order Returns',
        type: 'default',
        detail: "Revived by the Amrita, the Devas were restored to their full divine power. They fought the Asuras in a decisive battle and reclaimed the three worlds. Vishnu's plans had unfolded perfectly — the cosmic order (Dharma) was re-established, and the Devas ruled from Svarga once more."
    }
];

const CHARACTERS = [
    { id: 1, emoji: '👑', name: 'Vishnu', type: 'deva', desc: 'Preserver of the Universe, architect of the cosmic pact and the Mohini deception.' },
    { id: 2, emoji: '⚡', name: 'Indra', type: 'deva', desc: 'King of the Devas, whose accidental insult of Durvasa triggered the entire event.' },
    { id: 3, emoji: '🔱', name: 'Shiva (Neelakantha)', type: 'deva', desc: 'Consumed Halahala poison to save creation; his throat turned blue from the toxin.' },
    { id: 4, emoji: '🌸', name: 'Lakshmi', type: 'deva', desc: 'Goddess of Fortune, emerged from the ocean and chose Vishnu as her eternal consort.' },
    { id: 5, emoji: '🏺', name: 'Dhanvantari', type: 'deva', desc: 'Divine physician and god of Ayurveda, arose bearing the pot of Amrita.' },
    { id: 6, emoji: '🌙', name: 'Chandra (Moon)', type: 'deva', desc: 'The Moon emerged from the ocean and was placed on Shiva\'s head as an ornament.' },
    { id: 7, emoji: '👹', name: 'Bali Maharaj', type: 'asura', desc: 'Noble king of the Asuras and an incarnation of great virtue, despite being an Asura.' },
    { id: 8, emoji: '📖', name: 'Shukracharya', type: 'asura', desc: 'Preceptor (guru) of the Asuras, provider of divine wisdom and the Mritasanjivani mantra.' },
    { id: 9, emoji: '🐍', name: 'Svarbhanu', type: 'asura', desc: 'The Asura who disguised himself as a Deva; decapitated by Vishnu to form Rahu and Ketu.' },
    { id: 10, emoji: '🐚', name: 'Vasuki', type: 'object', desc: 'The great serpent king who served as the churning rope, exhausting the Asuras with his poison breath.' },
    { id: 11, emoji: '⛰️', name: 'Mount Mandara', type: 'object', desc: 'The mythical mountain used as the cosmic churning rod, supported by Kurma on the ocean floor.' },
    { id: 12, emoji: '🐢', name: 'Kurma Avatar', type: 'object', desc: 'Vishnu\'s tortoise incarnation that supported Mount Mandara preventing it from sinking.' },
];

const TREASURES = [
    { order: 1, emoji: '🐄', name: 'Kamadhenu', sanskrit: 'कामधेनु', claimedBy: 'deva', claimedName: 'Claimed by Devas', desc: 'The divine wish-fulfilling cow who can produce whatever her owner desires.' },
    { order: 2, emoji: '🐴', name: 'Uchhaishravas', sanskrit: 'उच्चैःश्रवस्', claimedBy: 'asura', claimedName: 'Taken by Asuras', desc: 'The seven-headed divine white horse, the king of horses.' },
    { order: 3, emoji: '💎', name: 'Kaustubha', sanskrit: 'कौस्तुभ', claimedBy: 'deva', claimedName: 'Kept by Vishnu', desc: 'The most precious ruby in the universe, which Vishnu wears on his chest.' },
    { order: 4, emoji: '🌳', name: 'Parijata', sanskrit: 'पारिजात', claimedBy: 'deva', claimedName: 'Placed in Svarga', desc: 'The divine flowering tree, whose blossoms never wither, placed in Indra\'s heavenly garden.' },
    { order: 5, emoji: '🧚', name: 'Apsaras', sanskrit: 'अप्सरा', claimedBy: 'deva', claimedName: 'Celestial Court', desc: 'Celestial nymphs of incomparable beauty, who graced the courts of the gods.' },
    { order: 6, emoji: '🌙', name: 'Chandra', sanskrit: 'चन्द्र', claimedBy: 'deva', claimedName: 'Adorns Shiva', desc: 'The Moon god, who was placed on Shiva\'s head as a luminous ornament.' },
    { order: 7, emoji: '🏹', name: 'Sharnga', sanskrit: 'शार्ङ्ग', claimedBy: 'deva', claimedName: 'Taken by Vishnu', desc: 'The divine bow of Vishnu, capable of destroying entire armies with a single arrow.' },
    { order: 8, emoji: '🍇', name: 'Varuni', sanskrit: 'वारुणि', claimedBy: 'asura', claimedName: 'Taken by Asuras', desc: 'The goddess of wine and intoxicating drinks, who went to the Asuras.' },
    { order: 9, emoji: '🐘', name: 'Airavata', sanskrit: 'ऐरावत', claimedBy: 'deva', claimedName: 'Given to Indra', desc: 'The four-tusked white elephant, given to Indra as his divine mount.' },
    { order: 10, emoji: '🐚', name: 'Panchajanya', sanskrit: 'पाञ्चजन्य', claimedBy: 'deva', claimedName: 'Taken by Vishnu', desc: 'Vishnu\'s divine conch shell. Its sound signalled the start of sacred events and battles.' },
    { order: 11, emoji: '🌺', name: 'Lakshmi', sanskrit: 'लक्ष्मी', claimedBy: 'deva', claimedName: 'Chose Vishnu', desc: 'The goddess of wealth and fortune. Emerged resplendent and chose Vishnu as her eternal consort.' },
    { order: 12, emoji: '⚗️', name: 'Dhanvantari', sanskrit: 'धन्वन्तरि', claimedBy: 'deva', claimedName: 'God of Medicine', desc: 'The divine physician and god of Ayurveda, emerged bearing the pot of Amrita.' },
    { order: 13, emoji: '☠️', name: 'Halahala', sanskrit: 'हलाहल', claimedBy: 'shiva', claimedName: 'Consumed by Shiva', desc: 'The deadly cosmic poison — the first emergence — consumed by Shiva to save all creation.' },
    { order: 14, emoji: '🏺', name: 'Amrita', sanskrit: 'अमृत', claimedBy: 'deva', claimedName: 'Given to Devas', desc: 'The nectar of immortality — the ultimate goal of the churning, distributed by Mohini to the Devas.' },
];

const EMERGING_EMOJIS = ['🐄', '🐴', '💎', '🌳', '🌙', '🌺', '🏺', '⚗️'];

/* ──────────────────────────────────────────────
   TIMELINE ENGINE
   ────────────────────────────────────────────── */

/**
 * renderTimeline - Builds the interactive story timeline DOM
 * @param {HTMLElement} container - Target timeline container
 */
function renderTimeline(container) {
    if (!container) return;
    container.innerHTML = '';

    STORY_EVENTS.forEach((event) => {
        const eventEl = document.createElement('div');
        eventEl.className = 'tl-event';
        eventEl.setAttribute('data-event-id', event.id);

        const cardHTML = `
            <div class="tl-badge">
                <div class="tl-card ${event.type}" id="tl-card-${event.id}" role="button" tabindex="0" aria-expanded="false">
                    <div class="tl-step">${event.step}</div>
                    <div class="tl-icon">${event.icon}</div>
                    <div class="tl-title">${event.title}</div>
                    <div class="tl-detail" id="tl-detail-${event.id}">${event.detail}</div>
                    <div class="tl-expand-hint">Click to expand ▾</div>
                </div>
            </div>
            <div class="tl-dot ${event.type}" title="${event.title}"></div>
        `;

        eventEl.innerHTML = cardHTML;
        container.appendChild(eventEl);

        // Attach expand/collapse logic
        const card = eventEl.querySelector(`#tl-card-${event.id}`);
        const detail = eventEl.querySelector(`#tl-detail-${event.id}`);

        if (card && detail) {
            const toggleDetail = () => {
                const expanded = detail.classList.toggle('expanded');
                card.setAttribute('aria-expanded', String(expanded));
            };
            card.addEventListener('click', toggleDetail);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDetail(); }
            });
        }
    });
}

/* ──────────────────────────────────────────────
   CHARACTERS ENGINE
   ────────────────────────────────────────────── */

/**
 * renderCharacters - Populates the characters grid with optional filter
 * @param {HTMLElement} container - Target grid container
 * @param {string} filter - 'all' | 'deva' | 'asura' | 'object'
 */
function renderCharacters(container, filter = 'all') {
    if (!container) return;
    container.innerHTML = '';

    const dataset = filter === 'all'
        ? CHARACTERS
        : CHARACTERS.filter(c => c.type === filter);

    dataset.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.setAttribute('data-type', char.type);
        card.setAttribute('data-id', char.id);

        card.innerHTML = `
            <div class="char-emoji">${char.emoji}</div>
            <div class="char-name">${char.name}</div>
            <span class="char-type-badge type-${char.type}">${char.type.charAt(0).toUpperCase() + char.type.slice(1)}</span>
            <p class="char-desc">${char.desc}</p>
        `;
        container.appendChild(card);
    });
}

/**
 * bindCharacterFilters - Wires up filter button tab UI
 */
function bindCharacterFilters() {
    const btns = document.querySelectorAll('.char-filter-btn');
    const container = document.getElementById('characters-container');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter') || 'all';
            renderCharacters(container, filter);
        });
    });
}

/* ──────────────────────────────────────────────
   TREASURES ENGINE
   ────────────────────────────────────────────── */

/**
 * renderTreasures - Builds the 14 ratna cards
 * @param {HTMLElement} container - Target grid container
 */
function renderTreasures(container) {
    if (!container) return;
    container.innerHTML = '';

    TREASURES.forEach(treasure => {
        const card = document.createElement('div');
        card.className = `treasure-card claimed-${treasure.claimedBy}`;
        card.setAttribute('data-order', `#${treasure.order}`);
        card.setAttribute('data-id', treasure.order);

        card.innerHTML = `
            <div class="treasure-emoji">${treasure.emoji}</div>
            <div class="treasure-name">${treasure.name}</div>
            <div class="treasure-sanskrit">${treasure.sanskrit}</div>
            <p class="treasure-desc">${treasure.desc}</p>
            <span class="treasure-claimed">${treasure.claimedName}</span>
        `;
        container.appendChild(card);
    });
}

/* ──────────────────────────────────────────────
   COSMIC VISUALIZATION ENGINE
   ────────────────────────────────────────────── */

/**
 * animateChurning - Sequentially reveals treasure emojis in the diagram
 */
function animateChurning() {
    const container = document.getElementById('emerging-treasures');
    const btn = document.getElementById('animate-churning');

    if (!container) return;
    container.innerHTML = '';

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Churning...';
    }

    EMERGING_EMOJIS.forEach((emoji, index) => {
        const item = document.createElement('span');
        item.className = 'emerging-item';
        item.textContent = emoji;
        item.setAttribute('aria-hidden', 'true');
        container.appendChild(item);

        setTimeout(() => {
            item.classList.add('rise');
        }, index * 400);
    });

    // Re-enable button after animation completes
    setTimeout(() => {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-redo"></i> Replay Animation';
        }
    }, EMERGING_EMOJIS.length * 400 + 1200);
}

/* ──────────────────────────────────────────────
   SCROLL ANIMATION ENGINE
   ────────────────────────────────────────────── */

/**
 * initScrollObserver - Triggers fade-in animations on scroll
 */
function initScrollObserver() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.scroll-fade-in').forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────
   INITIALISATION
   ────────────────────────────────────────────── */

/**
 * init - Main entry point; wires up all engines on DOMContentLoaded
 */
function init() {
    // Timeline
    const timelineContainer = document.getElementById('story-timeline');
    renderTimeline(timelineContainer);

    // Characters
    const charsContainer = document.getElementById('characters-container');
    renderCharacters(charsContainer, 'all');
    bindCharacterFilters();

    // Treasures
    const treasuresContainer = document.getElementById('treasures-container');
    renderTreasures(treasuresContainer);

    // Visualization animation button
    const animateBtn = document.getElementById('animate-churning');
    if (animateBtn) {
        animateBtn.addEventListener('click', animateChurning);
    }

    // Scroll observer
    initScrollObserver();
}

// Expose key functions for test harness
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderTimeline, renderCharacters, renderTreasures, animateChurning, STORY_EVENTS, CHARACTERS, TREASURES };
}

document.addEventListener('DOMContentLoaded', init);

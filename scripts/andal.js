/**
 * Andal — The Poet-Saint of Tamil Tradition — Interactive Engine
 * Incredible India Explorer — Issue #3699
 *
 * Drives the life story timeline, verse filter engine,
 * and scroll-triggered fade-in animations.
 */

'use strict';

/* ──────────────────────────────────────────────
   DATA STORES
   ────────────────────────────────────────────── */

const VERSES = [
    {
        id: 1,
        theme: 'devotion',
        tamil: 'மால் அருள் புனல் வண்ணன் பேர் பாட\nநீல் மலர் துழாய்ப் பூச்சூடி நேரிழை',
        translation: 'I will sing the name of Vishnu, adorned with tulsi garlands and dark blue lotus flowers — my Lord of divine grace.',
        source: 'Tiruppavai, Verse 1'
    },
    {
        id: 2,
        theme: 'longing',
        tamil: 'தூசி எமக்கு இன்று தோழி வருக\nஏசி எம்மை வெகுளி செய்யாதீர்கள்',
        translation: 'Today my friend has come to me — do not scold me, do not be angry with me. Let me go to my beloved.',
        source: 'Tiruppavai, Verse 15'
    },
    {
        id: 3,
        theme: 'surrender',
        tamil: 'கூடி வாழ்ந்த குலம் தன்னை விட்டு\nபூடி வைத்த புனல் மலர் சூடி',
        translation: 'Leaving the family I was born into, I will wear the garland of divine flowers and unite with my Lord.',
        source: 'Nachiyar Tirumozhi, Verse 1'
    },
    {
        id: 4,
        theme: 'ecstasy',
        tamil: 'திருப்பாவை பாடி நான் இருந்தேன்\nமற்றொரு காரியம் இல்லை',
        translation: 'I sang the Tiruppavai and remained in devotion — there was no other task for me in this world.',
        source: 'Tiruppavai, Verse 30'
    },
    {
        id: 5,
        theme: 'longing',
        tamil: 'வாடி வதங்கி மன்னாத பூவே\nஆடி பரத்தாள் அடிப்பாதம் கண்டேன்',
        translation: 'Like a withered flower I pine — but I have seen the feet of the dancing celestial maiden. My Lord, when will you come to me?',
        source: 'Nachiyar Tirumozhi, Verse 46'
    },
    {
        id: 6,
        theme: 'surrender',
        tamil: 'உன்னை அடிமை கொண்டேன் என்று\nசொல்லி திருவடி சேர்ந்தேன்',
        translation: 'I declared myself your servant and attained your sacred feet — I belong to you alone, my Lord.',
        source: 'Nachiyar Tirumozhi, Verse 100'
    },
    {
        id: 7,
        theme: 'devotion',
        tamil: 'துழாய் மலர் சூடி தொழுது எழுந்தேன்\nசூடிக்கொடுத்த சுடர்க்கிளரி',
        translation: 'Wearing the tulsi garland I rose after worship — O radiant one who adorned and gave me the garland of light.',
        source: 'Tiruppavai, Verse 18'
    },
    {
        id: 8,
        theme: 'ecstasy',
        tamil: 'கூடா நல்ல குருவும் கோவலனும்\nதேடாது தேடி என்னை வந்தான்',
        translation: 'Without seeking, my Lord Krishna himself came searching for me — such is the grace of the divine that he finds the devoted soul.',
        source: 'Nachiyar Tirumozhi, Verse 120'
    }
];

/* ──────────────────────────────────────────────
   VERSES ENGINE
   ────────────────────────────────────────────── */

function renderVerses(container, theme, verses) {
    if (!container) return;
    container.innerHTML = '';

    var dataset = theme === 'all' ? verses : verses.filter(function (v) { return v.theme === theme; });

    dataset.forEach(function (verse) {
        var card = container.ownerDocument.createElement('div');
        card.className = 'verse-card';
        card.setAttribute('data-theme', verse.theme);
        card.setAttribute('data-id', verse.id);

        var badge = container.ownerDocument.createElement('span');
        badge.className = 'verse-theme-badge';
        badge.textContent = verse.theme.charAt(0).toUpperCase() + verse.theme.slice(1);

        var tamil = container.ownerDocument.createElement('div');
        tamil.className = 'verse-tamil';
        tamil.textContent = verse.tamil;

        var translation = container.ownerDocument.createElement('p');
        translation.className = 'verse-translation';
        translation.textContent = verse.translation;

        var source = container.ownerDocument.createElement('div');
        source.className = 'verse-source';
        source.textContent = '— ' + verse.source;

        card.appendChild(badge);
        card.appendChild(tamil);
        card.appendChild(translation);
        card.appendChild(source);
        container.appendChild(card);
    });
}

function bindVerseFilters(container, verses) {
    var btns = document.querySelectorAll('.vf-btn');

    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            btns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var theme = btn.getAttribute('data-theme') || 'all';
            renderVerses(container, theme, verses);
        });
    });
}

/* ──────────────────────────────────────────────
   SCROLL ANIMATION ENGINE
   ────────────────────────────────────────────── */

function initScrollObserver() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.scroll-fade-in').forEach(function (el) {
            el.classList.add('visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-fade-in').forEach(function (el) {
        observer.observe(el);
    });
}

/* ──────────────────────────────────────────────
   INITIALISATION
   ────────────────────────────────────────────── */

function init() {
    // Verses
    var versesContainer = document.getElementById('verses-container');
    renderVerses(versesContainer, 'all', VERSES);
    bindVerseFilters(versesContainer, VERSES);

    // Scroll observer
    initScrollObserver();
}

// Expose key functions for test harness
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderVerses: renderVerses,
        bindVerseFilters: bindVerseFilters,
        VERSES: VERSES
    };
}

document.addEventListener('DOMContentLoaded', init);

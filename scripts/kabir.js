/**
 * Kabir — The Weaver Poet Explorer — Interactive Engine
 * Incredible India Explorer — Issue #3702
 *
 * Drives the story timeline, verse card filter grid,
 * and scroll-triggered fade-in animations.
 */

'use strict';

/* ──────────────────────────────────────────────
   DATA STORES
   ────────────────────────────────────────────── */

const TIMELINE_EVENTS = [
    {
        id: 1,
        step: 'c. 1440',
        icon: '🪷',
        title: 'Legendary Birth at Lahartara Lake',
        type: 'tradition',
        detail: 'According to the Kabir Parachai, a Hindu Brahmin couple, disowned by their families for an interfaith relationship, placed their newborn on a lotus leaf in Lahartara Lake. The child was discovered by the Muslim weaver Niru and his wife Nima, who raised him in the Ansari weaving community of Varanasi. This birth narrative, while cherished, is considered a later traditional account rather than verified history.'
    },
    {
        id: 2,
        step: 'c. 1450s',
        icon: '🧵',
        title: 'Life as a Weaver in Varanasi',
        type: 'tradition',
        detail: 'Kabir grew up working at the loom in the Ansari ward of Varanasi, crafting cotton textiles. This humble occupation became central to his spiritual metaphors — he wove images of thread, cloth, and the shuttle of time into his poetry. The loom became a metaphor for the body as a garment of consciousness, and the act of weaving as the soul's journey through existence.'
    },
    {
        id: 3,
        step: 'c. 1460s',
        icon: '🙏',
        title: 'Discipleship Under Ramananda',
        type: 'tradition',
        detail: 'The hagiographic tradition tells that Kabir sought initiation from Ramananda, the great Bhakti saint and guru of Ramananda\'s lineage. According to the narrative, Ramananda initially refused to accept a Muslim disciple. Kabir then lay on the steps of the ghats at night, and when Ramananda stepped on him at dawn, he exclaimed "Ram! Ram!" — which Kabir took as his initiation. Whether historical or legendary, this story symbolises Kabir\'s bridging of Hindu and Muslim devotional traditions.'
    },
    {
        id: 4,
        step: 'c. 1470s',
        icon: '✨',
        title: 'Spiritual Awakening & Poetry Begins',
        type: 'legacy',
        detail: 'Kabir began composing verses that challenged every religious establishment — Hindu temples, Muslim mosques, Brahmin priests, and Qazi authorities alike. His poems, called Sakhis (witness statements) and Dohe (couplets), spoke of a formless divine beyond all names and forms. He wrote in a vernacular Hindavi that common people could understand, deliberately rejecting Sanskrit and Arabic scholarly languages.'
    },
    {
        id: 5,
        step: 'c. 1480s',
        icon: '⚔️',
        title: 'Confrontation with Emperor Sikandar Lodi',
        type: 'legacy',
        detail: 'Kabir\'s fearless criticism of religious hypocrisy drew the ire of Emperor Sikandar Lodi, who ruled Delhi from 1489 to 1517. According to tradition, the Emperor summoned Kabir to court multiple times, attempted to have him killed through various means — thrown into the Ganges, trampled by elephants, thrown into fire — and each time Kabir survived unharmed. These narratives, while legendary, reflect the real threat his egalitarian message posed to established power structures.'
    },
    {
        id: 6,
        step: 'c. 1490s',
        icon: '🕊️',
        title: 'Gathering of Disciples & the Kabirpanthi Movement',
        type: 'legacy',
        detail: 'Kabir attracted a community of followers from all backgrounds — weavers, artisans, merchants, and even some Brahmins and Sufi devotees. This community, which would become the Kabirpanthi tradition, lived simply, rejected caste distinctions, and practised meditation on the formless divine (Nirguna Bhakti). Kabir\'s son Kamal continued this lineage, establishing the first Kabirpanthi monastery.'
    },
    {
        id: 7,
        step: 'c. 1510s',
        icon: '📜',
        title: 'Major Works Compiled',
        type: 'legacy',
        detail: 'Kabir\'s vast body of poetry was compiled into three major collections: the Bijak (primary scripture of the Kabirpanthis, containing Shabds, Ramainis, and Dohe), entries in the Adi Granth compiled by Guru Arjan Dev (1604), and the Padavali manuscripts from Rajasthan. Together, these represent one of the most remarkable cross-tradition literary preservations in Indian history. The Guru Granth Sahib contains 541 verses by Kabir — more than any non-Sikh contributor.'
    },
    {
        id: 8,
        step: '1518',
        icon: '🪷',
        title: 'Kabir\'s Death & the Miracle at Maghar',
        type: 'tradition',
        detail: 'According to tradition, Kabir died at Maghar in 1518. A dispute arose between Hindu and Muslim followers over his burial — Hindus wanted to cremate him, Muslims wanted to bury him. When they lifted the shroud, they found only flowers beneath. Half were taken to Varanasi (Hindu tradition) and half to Maghar (Muslim tradition). This narrative symbolises Kabir\'s life-long message that he belonged to no single religion. Historically, the exact circumstances of his death remain uncertain.'
    },
    {
        id: 9,
        step: '1604',
        icon: '📖',
        title: 'Inclusion in the Adi Granth',
        type: 'legacy',
        detail: 'Guru Arjan Dev, the fifth Sikh Guru, compiled 541 of Kabir\'s verses into the Adi Granth (now Guru Granth Sahib). This made Kabir the single largest non-Sikh contributor to the Sikh holy scripture, cementing his unique position as a figure revered across Hindu, Muslim, and Sikh traditions. His inclusion acknowledged the universality of his spiritual message.'
    },
    {
        id: 10,
        step: '1915',
        icon: '🌍',
        title: 'Tagore Translates Kabir to English',
        type: 'legacy',
        detail: 'Rabindranath Tagore published the first major English translations of Kabir\'s verses, introducing the weaver-poet to international audiences. Tagore\'s translations, while interpretive, captured the essence of Kabir\'s radical spirituality and brought his poetry to the attention of Western literary and philosophical circles, including the American Transcendentalists and later the Beat Generation poets.'
    }
];

const VERSES = [
    {
        id: 1,
        theme: 'wisdom',
        hindi: 'पोथी पढ़ पढ़ जग मुआ, पंडित भया न कोय।\nढाई आखर प्रेम का, पढ़े सो पंडित होय॥',
        translation: 'Reading books, the whole world died; no one became a scholar. The two-and-a-half letters of Love — whoever reads them becomes truly wise.',
        source: 'Bijak, Kabir'
    },
    {
        id: 2,
        theme: 'devotion',
        hindi: 'गुरु गोविंद दोनों खड़े, काके लागूँ पाय।\nबलिहारी गुरु आपने, गोविंद दियो बताय॥',
        translation: 'The Guru and God stand before me — whose feet shall I touch first? I sacrifice myself to my Guru, for he has revealed God to me.',
        source: 'Guru Granth Sahib, Kabir'
    },
    {
        id: 3,
        theme: 'social',
        hindi: 'जात-पात पूछे नहिं कोई, हरि को भजे सो हरि का होई॥',
        translation: 'God does not ask about caste or lineage. Whoever remembers God belongs to God alone.',
        source: 'Kabir, Padavali'
    },
    {
        id: 4,
        theme: 'wisdom',
        hindi: 'माला फिरत जुग भया, फिर भी मन नहिं रमे।\nमन तो चंचल बहता है, गति कोउ न जाने॥',
        translation: 'Turning beads for an age, yet the mind finds no rest. The mind flows like water — no one knows where it goes.',
        source: 'Bijak, Kabir'
    },
    {
        id: 5,
        theme: 'nature',
        hindi: 'मैं तो डूबती को तारूँ, मेरो साथी है राम।\nबिन बतासे की बतासी, मैं उड़ी परम प्रेम॥',
        translation: 'I ferry across those who are drowning — my companion is Ram. Without the wind\'s breath, I fly on the wings of supreme love.',
        source: 'Bijak, Kabir'
    },
    {
        id: 6,
        theme: 'social',
        hindi: 'बुरा जो देखन मैं चला, बुरा न मिलिया कोय।\nजो दिल खोजा आपना, मुझसे बुरा न कोय॥',
        translation: 'I went searching for the wicked, but found no one truly bad. When I looked into my own heart — no one is worse than I.',
        source: 'Bijak, Kabir'
    },
    {
        id: 7,
        theme: 'devotion',
        hindi: 'साईं इतना दीजिए, जामे कुटुंब समाय।\nमैं भी भूखा न रहूँ, साधु न भूखा जाय॥',
        translation: 'Grant me just enough, Lord, to feed my family. Let me never go hungry, and let no saint ever leave my door unfed.',
        source: 'Kabir, Padavali'
    },
    {
        id: 8,
        theme: 'wisdom',
        hindi: 'खालिक खलक में, खलक में खालिक।\nसैंया के साथ की खेली, हम हैं कपूत असाधिक॥',
        translation: 'The Creator is in the creation, the creation is in the Creator. God plays with His own creation — we are foolish children who cannot see.',
        source: 'Bijak, Kabir'
    },
    {
        id: 9,
        theme: 'nature',
        hindi: 'धरती कहे पुकार के, बीज हमें दो बो।\nसावन में भीगी अक्षी, क्या-क्या फल दो॥',
        translation: 'The earth cries out — give me seeds to sow! Even soaked seeds in monsoon — what fruits shall I bear!',
        source: 'Kabir, Padavali'
    },
    {
        id: 10,
        theme: 'devotion',
        hindi: 'हम न राम की, न रावण की दल में।\nसत्य भाषौँ सबकी, मैं प्रीति की खल में।।',
        translation: 'I belong neither to Rama\'s camp nor Ravana\'s. I speak the truth: I live in the field of love.',
        source: 'Bijak, Kabir'
    }
];

/* ──────────────────────────────────────────────
   TIMELINE ENGINE
   ────────────────────────────────────────────── */

/**
 * renderTimeline - Builds the interactive story timeline DOM
 * @param {HTMLElement} container - Target timeline container
 * @param {Array} events - Array of timeline event objects
 */
function renderTimeline(container, events) {
    if (!container) return;
    container.innerHTML = '';

    events.forEach(function (event) {
        var eventEl = container.ownerDocument.createElement('div');
        eventEl.className = 'tl-event';
        eventEl.setAttribute('data-event-id', event.id);

        var badge = container.ownerDocument.createElement('div');
        badge.className = 'tl-badge';

        var card = container.ownerDocument.createElement('div');
        card.className = 'tl-card ' + event.type;
        card.id = 'tl-card-' + event.id;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-expanded', 'false');

        var step = container.ownerDocument.createElement('div');
        step.className = 'tl-step';
        step.textContent = event.step;

        var icon = container.ownerDocument.createElement('div');
        icon.className = 'tl-icon';
        icon.textContent = event.icon;

        var title = container.ownerDocument.createElement('div');
        title.className = 'tl-title';
        title.textContent = event.title;

        var detail = container.ownerDocument.createElement('div');
        detail.className = 'tl-detail';
        detail.id = 'tl-detail-' + event.id;
        detail.textContent = event.detail;

        var hint = container.ownerDocument.createElement('div');
        hint.className = 'tl-expand-hint';
        hint.textContent = 'Click to expand ▾';

        card.appendChild(step);
        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(detail);
        card.appendChild(hint);
        badge.appendChild(card);

        var dot = container.ownerDocument.createElement('div');
        dot.className = 'tl-dot ' + event.type;
        dot.title = event.title;

        eventEl.appendChild(badge);
        eventEl.appendChild(dot);
        container.appendChild(eventEl);

        // Attach toggle logic
        var toggleDetail = function () {
            var expanded = detail.classList.toggle('expanded');
            card.setAttribute('aria-expanded', String(expanded));
        };

        card.addEventListener('click', toggleDetail);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDetail();
            }
        });
    });
}

/* ──────────────────────────────────────────────
   VERSES ENGINE
   ────────────────────────────────────────────── */

/**
 * renderVerses - Populates the verses grid with optional theme filter
 * @param {HTMLElement} container - Target grid container
 * @param {string} theme - 'all' | 'devotion' | 'wisdom' | 'social' | 'nature'
 * @param {Array} verses - Array of verse objects
 */
function renderVerses(container, theme, verses) {
    if (!container) return;
    container.innerHTML = '';

    var dataset = theme === 'all'
        ? verses
        : verses.filter(function (v) { return v.theme === theme; });

    dataset.forEach(function (verse) {
        var card = container.ownerDocument.createElement('div');
        card.className = 'verse-card';
        card.setAttribute('data-theme', verse.theme);
        card.setAttribute('data-id', verse.id);

        var badge = container.ownerDocument.createElement('span');
        badge.className = 'verse-theme-badge';
        badge.textContent = verse.theme.charAt(0).toUpperCase() + verse.theme.slice(1);

        var hindi = container.ownerDocument.createElement('div');
        hindi.className = 'verse-hindi';
        hindi.textContent = verse.hindi;

        var translation = container.ownerDocument.createElement('p');
        translation.className = 'verse-translation';
        translation.textContent = verse.translation;

        var source = container.ownerDocument.createElement('div');
        source.className = 'verse-source';
        source.textContent = '— ' + verse.source;

        card.appendChild(badge);
        card.appendChild(hindi);
        card.appendChild(translation);
        card.appendChild(source);
        container.appendChild(card);
    });
}

/**
 * bindVerseFilters - Wires up theme filter button tab UI
 * @param {HTMLElement} container - Target verse grid container
 * @param {Array} verses - Array of verse objects
 */
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

/**
 * initScrollObserver - Triggers fade-in animations on scroll
 */
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

/**
 * init - Main entry point; wires up all engines on DOMContentLoaded
 */
function init() {
    // Timeline
    var timelineContainer = document.getElementById('kabir-timeline');
    renderTimeline(timelineContainer, TIMELINE_EVENTS);

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
        renderTimeline: renderTimeline,
        renderVerses: renderVerses,
        bindVerseFilters: bindVerseFilters,
        TIMELINE_EVENTS: TIMELINE_EVENTS,
        VERSES: VERSES
    };
}

document.addEventListener('DOMContentLoaded', init);

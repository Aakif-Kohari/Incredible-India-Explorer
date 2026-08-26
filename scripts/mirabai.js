/**
 * Mirabai — The Poet of Devotion — Interactive Engine
 * Incredible India Explorer — Issue #3700
 *
 * Drives the life story timeline, bhajan poetry filter,
 * and scroll-triggered fade-in animations.
 */

'use strict';

/* ──────────────────────────────────────────────
   DATA STORES
   ────────────────────────────────────────────── */

const TIMELINE_EVENTS = [
    {
        id: 1,
        step: 'c. 1498',
        icon: '👶',
        title: 'Birth in Merta, Rajasthan',
        type: 'tradition',
        detail: 'Mirabai was born into the Chauhan Rajput clan of Chomu in the kingdom of Merta. Her father, Ratan Singh, was a Rajput nobleman. According to hagiographic tradition, she was drawn to Krishna from infancy. Her father gifted her a Krishna idol when she was a child, and she became inseparable from it — a devotion that would define her entire life and scandalise the royal courts of Rajasthan.'
    },
    {
        id: 2,
        step: 'c. 1510',
        icon: '💍',
        title: 'Marriage to Prince Bhojraj of Mewar',
        type: 'tradition',
        detail: 'In a political alliance between the kingdoms of Merta and Mewar, Mirabai was married to Kunwar Bhojraj, the prince of Udaipur. She entered one of the most prestigious courts in Rajputana. However, she refused to worship her husband as God — a Rajput tradition — and instead devoted herself to Krishna. This refusal created immediate conflict with the Mewar royal family, particularly her mother-in-law and brother-in-law.'
    },
    {
        id: 3,
        step: 'c. 1515',
        icon: '🎵',
        title: 'Early Bhajans &amp; Public Singing',
        type: 'legacy',
        detail: 'Mirabai began composing and singing bhajans publicly — a radical act for a Rajput princess. She sang in streets, temples, and courtyards, attracting both devoted followers and hostile critics. Her songs expressed an intimate, personal relationship with Krishna that scandalised orthodox Brahmins and Rajput nobles alike. She gathered a community of devotees from all castes.'
    },
    {
        id: 4,
        step: 'c. 1520',
        icon: '🔥',
        title: 'Persecution by the Mewar Court',
        type: 'tradition',
        detail: 'The Mewar royal family, led by Bhojraj\'s mother and brother Vikram Singh, attempted to eliminate Mirabai. According to tradition, they sent her a cup of poison disguised as an offering. Mirabai, praying to Krishna, drank it unharmed. They tried to make her sit on a bed of burning coals — she walked across it. They even placed her in a room with a cobra — she found a Krishna idol playing with it.'
    },
    {
        id: 5,
        step: 'c. 1530',
        icon: '😢',
        title: 'Death of Bhojraj &amp; Defiance of Sati',
        type: 'legacy',
        detail: 'When Prince Bhojraj died, Mirabai was expected to perform sati — self-immolation on her husband\'s funeral pyre. She refused, declaring that her true husband was Krishna, not a mortal man. This act of defiance was unprecedented and deeply shocking to Rajput society. She was free to devote herself entirely to Krishna, and she left the palace to begin her life as a wandering devotee.'
    },
    {
        id: 6,
        step: 'c. 1530–1540',
        icon: '🚶‍♀️',
        title: 'Wandering Pilgrimage Across India',
        type: 'legacy',
        detail: 'Mirabai wandered through the holy cities of Rajasthan, Gujarat, and northern India — visiting Vrindavan, Mathura, Pushkar, and Dwarka. She lived among saints, performed kirtan (devotional singing), and composed hundreds of bhajans. She was welcomed by devotees of all castes and became a symbol of the Bhakti movement\'s radical egalitarianism.'
    },
    {
        id: 7,
        step: 'c. 1535',
        icon: '🙏',
        title: 'Discipleship Under Guru Raidas',
        type: 'tradition',
        detail: 'Some traditions record Mirabai as a disciple of <strong>Saint Raidas (Ravidas)</strong>, the great Bhakti poet who challenged caste boundaries. This connection links Mirabai to the broader network of Bhakti saints who were contemporaries of Kabir and Ravidas. Raidas\'s influence is visible in Mirabai\'s rejection of caste distinctions and her emphasis on love over ritual.'
    },
    {
        id: 8,
        step: 'c. 1546',
        icon: '🕉️',
        title: 'Divine Absorption at Dwarka',
        type: 'tradition',
        detail: 'The most famous end to Mirabai\'s story: she entered the temple of <strong>Dwarkadheesh (Krishna) at Dwarka</strong> on the western coast. When she did not emerge, her followers broke down the door — only to find the idol of Krishna standing in her place, and Mirabai nowhere to be seen. This divine absorption (sankeerthan) became the ultimate symbol of her complete union with Krishna.'
    },
    {
        id: 9,
        step: 'c. 1546+',
        icon: '📖',
        title: 'Preservation of Her Bhajans',
        type: 'legacy',
        detail: 'Mirabai\'s bhajans were collected and preserved by her followers through the <strong>Rajasthani Padavali</strong> manuscript tradition. Over 1,300 compositions are attributed to her, though scholars debate the authenticity of many. Her most famous bhajan, <em>"Payo Ji Maine Ram Ratan Dhan Payo"</em>, is sung across India. Her compositions also appear in the Guru Granth Sahib and the Bijak.'
    },
    {
        id: 10,
        step: '1546+',
        icon: '🌍',
        title: 'Enduring Cultural Legacy',
        type: 'legacy',
        detail: 'Mirabai\'s influence extends across five centuries. She is celebrated in Rajasthani folk music, Hindustani classical, Bollywood, and international music. Her story has been told through films, ballets, novels, and academic studies. She remains a symbol of women\'s spiritual independence and resistance — one of India\'s most beloved poet-saints whose bhajans continue to inspire millions.'
    }
];

const VERSES = [
    {
        id: 1,
        theme: 'surrender',
        hindi: 'पायो जी मैंने राम रतन धन पायो,\nविष के बीच अमृत पायो।',
        translation: 'I have found the treasure of Ram (God) in this life; amidst poison, I have found nectar.',
        source: 'Mirabai Bhajan'
    },
    {
        id: 2,
        theme: 'ecstasy',
        hindi: 'म्हारो प्रितम प्यारो चैतन्य नाथ,\nपैरीं नंदलाल हमारो।',
        translation: 'My beloved Lord is the consciousness of my soul; my feet belong to Nandalal (Krishna).',
        source: 'Mirabai Bhajan'
    },
    {
        id: 3,
        theme: 'longing',
        hindi: 'चरण पखारूँ मैं तन मन सेवा,\nजीवन बीते श्री गिरिधर प्यारे।',
        translation: 'I wash His feet with my body and mind in service; my life passes in love of Giridhar (Krishna).',
        source: 'Mirabai Bhajan'
    },
    {
        id: 4,
        theme: 'defiance',
        hindi: 'कह मीरा तैं क्या जाणै पिया,\nआँख्याँ में रमायो रे।',
        translation: 'Tell me, O Mirabai, what do you know of your Beloved? He is absorbed in the eyes.',
        source: 'Mirabai Bhajan'
    },
    {
        id: 5,
        theme: 'ecstasy',
        hindi: 'गिरिधर गोपाल दुष्ट की भयो विनाशी,\nनर नारी सुलभ सद्यो मोहि आवै राधे।',
        translation: 'The destroyer of the wicked, Giridhar Gopal — for men and women alike, He is easily accessible, Radhe.',
        source: 'Mirabai Bhajan'
    },
    {
        id: 6,
        theme: 'surrender',
        hindi: 'मेरे तो गिरिधर गोपाल दूसरो न कोय।\nरोके मुझे सती गए रास्त में रोय।',
        translation: 'My Lord is only Giridhar Gopal, none other. They tried to stop me — the sati-women cried on the path.',
        source: 'Mirabai Bhajan'
    },
    {
        id: 7,
        theme: 'longing',
        hindi: 'कृष्णा तुम परनम शरणागती,\nजीवन मौत सुख दुख तुम ही मोरी शरण।',
        translation: 'Krishna, I bow to you, I take refuge in you; life, death, happiness, pain — you are my only shelter.',
        source: 'Mirabai Bhajan'
    },
    {
        id: 8,
        theme: 'defiance',
        hindi: 'कोई मीरा की भगत सजनी ऐसे जिऊये।\nरंग दिन बीते रात गुजरे, कृष्ण चरनन आंगन लिवये।',
        translation: 'No one lives as Mirabai\'s companion in devotion; the day passes in colour, the night in the courtyard of Krishna\'s feet.',
        source: 'Mirabai Padavali'
    }
];

/* ──────────────────────────────────────────────
   TIMELINE ENGINE
   ────────────────────────────────────────────── */

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
    // Timeline
    var timelineContainer = document.getElementById('mirabai-timeline');
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

/**
 * Guru Nanak's Udasis — Interactive Storytelling Engine
 * Incredible India Explorer — Issue #3701
 *
 * Drives the story timeline, interactive journey map,
 * and scroll-triggered fade-in animations.
 */

'use strict';

/* ──────────────────────────────────────────────
   DATA STORES
   ────────────────────────────────────────────── */

const TIMELINE_EVENTS = [
    {
        id: 1,
        step: '1469',
        icon: '🌟',
        title: 'Birth at Talwandi (Nankana Sahib)',
        type: 'tradition',
        detail: 'Guru Nanak was born on 15 April 1469 in Talwandi, now known as Nankana Sahib in Pakistan. The Janamsakhis record miraculous signs at his birth — a meteor shower and a celestial light. His father, Mehta Kalu Chand, was a Hindu Khatri accountant. From childhood, Guru Nanak displayed a profound spiritual awareness, questioning the rituals and divisions of his society.'
    },
    {
        id: 2,
        step: '1485',
        icon: '📚',
        title: 'Marriage & Early Life',
        type: 'tradition',
        detail: 'Around 1485 CE, Guru Nanak married Mata Sulakhani and later had two sons — Sri Chand and Lakhmi Chand. He worked in the local common and even briefly managed a mosque for the local Qazi. However, his spiritual restlessness grew. He spent long hours meditating by the Kali Bein river, contemplating the nature of the divine and the suffering caused by religious division.'
    },
    {
        id: 3,
        step: '1499',
        icon: '✨',
        title: 'Divine Revelation at Kali Bein',
        type: 'tradition',
        detail: 'After meditating in the waters of the Kali Bein river for three days, Guru Nanak emerged with a transformed consciousness. He uttered the immortal words: "There is no Hindu, there is no Muslim" — declaring that before God, all religious labels are meaningless. This marked the beginning of his mission and his first Udasi. His lifelong companion Bhai Mardana, a Muslim musician, joined him on his travels.'
    },
    {
        id: 4,
        step: '1499–1502',
        icon: '🌅',
        title: 'First Udasi — Eastward',
        type: 'legacy',
        detail: 'Guru Nanak journeyed east through Haryana, UP, Bihar, Bengal, and Assam. At Haridwar, he challenged priests performing rituals. In Varanasi, he debated Brahmin scholars. In Bengal, he met Buddhist monks and tribal communities. This first Udasi established his reputation as a fearless spiritual teacher who engaged with every tradition with respect but also critical inquiry.'
    },
    {
        id: 5,
        step: '1502–1506',
        icon: '🏛️',
        title: 'Second Udasi — Southward',
        type: 'legacy',
        detail: 'The second Udasi took Guru Nanak south through Rajasthan, Gujarat, Maharashtra, Karnataka, Kerala, and Tamil Nadu. He visited the great temples of Puri, Rameswaram, and Madurai, and met Jain monks in Shravanabelagola. In Ceylon (Sri Lanka), he climbed Adam\'s Peak. This journey demonstrated his commitment to engaging with Hindu, Jain, and Buddhist traditions across the subcontinent.'
    },
    {
        id: 6,
        step: '1506–1514',
        icon: '🏔️',
        title: 'Third Udasi — Northward & Westward',
        type: 'legacy',
        detail: 'The longest journey took Guru Nanak through Kashmir, Ladakh, Tibet, Central Asia, and possibly Mecca and Medina. He traversed mountain passes, visited Buddhist monasteries, and engaged with Sufi saints. The famous Mecca episode — where his feet magically pointed toward the Kaaba from every direction — symbolised his teaching that God is everywhere and cannot be confined to a single direction of worship.'
    },
    {
        id: 7,
        step: '1514–1521',
        icon: '🏺',
        title: 'Fourth Udasi — Westward',
        type: 'legacy',
        detail: 'The final major journey took Guru Nanak through Sindh, Balochistan, and into Persia and Afghanistan. He visited the Sufi shrines of Multan, engaged with Muslim scholars in Baghdad, and traversed trade routes connecting India to the Islamic world. This Udasi cemented his reputation as a truly universal teacher whose message transcended all geographical and religious boundaries.'
    },
    {
        id: 8,
        step: '1521',
        icon: '⚔️',
        title: 'Encounter with Emperor Babur',
        type: 'legacy',
        detail: 'When Babur\'s Mughal army invaded Punjab in 1520–1521, Guru Nanak was imprisoned along with other captives. His hymns during imprisonment — the Babur Vani — lamented the suffering caused by tyranny. He declared that God\'s justice ultimately prevails over earthly power. This encounter with political violence deepened his message about the futility of worldly aggression.'
    },
    {
        id: 9,
        step: '1521–1532',
        icon: '🏗️',
        title: 'Establishment of Sikh Institutions',
        type: 'legacy',
        detail: 'After his Udasis, Guru Nanak settled in Kartarpur (now in Pakistan) and established the foundations of the Sikh community. He introduced the institutions of Sangat (congregation) and Pangat (communal kitchen), where people of all castes sat and ate together. He also established the town of Kartarpur as a model community built on his principles of equality, honest work, and devotion.'
    },
    {
        id: 10,
        step: '1539',
        icon: '🪷',
        title: 'Guru Nanak\'s Departure',
        type: 'tradition',
        detail: 'Guru Nanak passed away on 22 September 1539 in Kartarpur at the age of 70. Before his death, he passed the Guruship to his successor, Bhai Angad (the second Guru), rather than his own sons — declaring that spiritual leadership should be based on devotion and merit, not blood relation. He was cremated by the Ravi river, and his legacy continues through the Guru Granth Sahib and the Sikh faith.'
    }
];

/* ──────────────────────────────────────────────
   MAP DATA
   ────────────────────────────────────────────── */

const MAP_NODES = [
    // First Udasi — East
    { id: 'haridwar', name: 'Haridwar', udasi: 'east', x: 38, y: 28, desc: 'Guru Nanak challenged priests performing water rituals for ancestors.' },
    { id: 'varanasi', name: 'Varanasi', udasi: 'east', x: 44, y: 30, desc: 'Debated Brahmin scholars about the nature of the divine.' },
    { id: 'patna', name: 'Patna', udasi: 'east', x: 50, y: 30, desc: 'Visited the ancient city and engaged with Hindu scholars.' },
    { id: 'gaya', name: 'Gaya', udasi: 'east', x: 52, y: 32, desc: 'Challenged the practice of Shraddha ceremonies.' },
    { id: 'kolkata', name: 'Kolkata', udasi: 'east', x: 56, y: 33, desc: 'Met Buddhist and Hindu communities in Bengal.' },
    { id: 'assam', name: 'Assam', udasi: 'east', x: 62, y: 28, desc: 'Reached the far-eastern frontier, engaging with tribal communities.' },

    // Second Udasi — South
    { id: 'udaipur', name: 'Udaipur', udasi: 'south', x: 32, y: 38, desc: 'Visited Rajasthan and engaged with Rajput communities.' },
    { id: 'somnath', name: 'Somnath', udasi: 'south', x: 30, y: 44, desc: 'Engaged with Shaivite traditions at the famous Somnath temple.' },
    { id: 'mumbai', name: 'Mumbai', udasi: 'south', x: 32, y: 48, desc: 'Traversed the Konkan coast, meeting Sufi saints.' },
    { id: 'goa', name: 'Goa', udasi: 'south', x: 33, y: 50, desc: 'Engaged with local communities along the western coast.' },
    { id: 'madurai', name: 'Madurai', udasi: 'south', x: 40, y: 58, desc: 'Debated Shaivite priests about the formless divine.' },
    { id: 'rameswaram', name: 'Rameswaram', udasi: 'south', x: 43, y: 60, desc: 'Visited the sacred island temple in Tamil Nadu.' },
    { id: 'srilanka', name: 'Sri Lanka', udasi: 'south', x: 42, y: 65, desc: 'Climbed Adam\'s Peak (Sri Pada), sacred to multiple faiths.' },

    // Third Udasi — North
    { id: 'srinagar', name: 'Srinagar', udasi: 'north', x: 38, y: 20, desc: 'Traversed the beautiful valleys of Kashmir.' },
    { id: 'ladakh', name: 'Ladakh', udasi: 'north', x: 42, y: 14, desc: 'Crossed high mountain passes into Ladakh.' },
    { id: 'tibet', name: 'Tibet', udasi: 'north', x: 48, y: 16, desc: 'Visited Buddhist monasteries in Tibet.' },
    { id: 'mecca', name: 'Mecca', udasi: 'north', x: 22, y: 38, desc: 'The famous Kaaba episode — feet pointed toward it from every direction.' },
    { id: 'baghdad', name: 'Baghdad', udasi: 'north', x: 20, y: 32, desc: 'Engaged with Muslim scholars in Baghdad.' },

    // Fourth Udasi — West
    { id: 'multan', name: 'Multan', udasi: 'west', x: 34, y: 28, desc: 'Visited the Sufi shrines of Multan, engaging with Sufi saints.' },
    { id: 'peshawar', name: 'Peshawar', udasi: 'west', x: 38, y: 22, desc: 'Traversed the Khyber Pass region.' },
    { id: 'kandahar', name: 'Kandahar', udasi: 'west', x: 34, y: 24, desc: 'Engaged with communities in Afghanistan.' },
    { id: 'herat', name: 'Herat', udasi: 'west', x: 30, y: 22, desc: 'Visited the historic city of Herat in present-day Afghanistan.' },
    { id: 'tehran', name: 'Tehran', udasi: 'west', x: 26, y: 24, desc: 'Some traditions record his journey reaching Persia.' },
];

const MAP_CONNECTIONS = [
    // East
    { from: 'haridwar', to: 'varanasi', udasi: 'east' },
    { from: 'varanasi', to: 'patna', udasi: 'east' },
    { from: 'patna', to: 'gaya', udasi: 'east' },
    { from: 'gaya', to: 'kolkata', udasi: 'east' },
    { from: 'kolkata', to: 'assam', udasi: 'east' },
    // South
    { from: 'udaipur', to: 'somnath', udasi: 'south' },
    { from: 'somnath', to: 'mumbai', udasi: 'south' },
    { from: 'mumbai', to: 'goa', udasi: 'south' },
    { from: 'goa', to: 'madurai', udasi: 'south' },
    { from: 'madurai', to: 'rameswaram', udasi: 'south' },
    { from: 'rameswaram', to: 'srilanka', udasi: 'south' },
    // North
    { from: 'srinagar', to: 'ladakh', udasi: 'north' },
    { from: 'ladakh', to: 'tibet', udasi: 'north' },
    { from: 'tibet', to: 'mecca', udasi: 'north' },
    { from: 'mecca', to: 'baghdad', udasi: 'north' },
    // West
    { from: 'multan', to: 'peshawar', udasi: 'west' },
    { from: 'peshawar', to: 'kandahar', udasi: 'west' },
    { from: 'kandahar', to: 'herat', udasi: 'west' },
    { from: 'herat', to: 'tehran', udasi: 'west' },
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
   JOURNEY MAP ENGINE
   ────────────────────────────────────────────── */

/**
 * renderMap - Builds the interactive journey map with nodes and connections
 * @param {HTMLElement} container - Target map container
 * @param {Array} nodes - Array of map node objects
 * @param {Array} connections - Array of connection objects
 */
function renderMap(container, nodes, connections) {
    if (!container) return;
    container.innerHTML = '';

    // Create tooltip element
    var tooltip = container.ownerDocument.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.id = 'map-tooltip';
    container.appendChild(tooltip);

    // Render connections as dashed borders
    connections.forEach(function (conn) {
        var fromNode = nodes.find(function (n) { return n.id === conn.from; });
        var toNode = nodes.find(function (n) { return n.id === conn.to; });
        if (!fromNode || !toNode) return;

        var path = container.ownerDocument.createElement('div');
        path.className = 'map-path map-path--' + conn.udasi;
        path.setAttribute('data-udasi', conn.udasi);

        // Position a line between nodes (simplified — using a small connector)
        var midX = (fromNode.x + toNode.x) / 2;
        var midY = (fromNode.y + toNode.y) / 2;
        path.style.left = Math.min(fromNode.x, toNode.x) + '%';
        path.style.top = Math.min(fromNode.y, toNode.y) + '%';
        path.style.width = Math.abs(fromNode.x - toNode.x) + '%';
        path.style.height = Math.abs(fromNode.y - toNode.y) + '%';

        container.appendChild(path);
    });

    // Render nodes
    nodes.forEach(function (node) {
        var el = container.ownerDocument.createElement('div');
        el.className = 'map-node map-node--' + node.udasi;
        el.setAttribute('data-id', node.id);
        el.setAttribute('data-udasi', node.udasi);
        el.setAttribute('data-name', node.name);
        el.setAttribute('data-desc', node.desc);
        el.style.left = node.x + '%';
        el.style.top = node.y + '%';
        el.title = node.name;

        el.addEventListener('mouseenter', function (e) {
            showMapTooltip(container, node, e);
        });

        el.addEventListener('mouseleave', function () {
            hideMapTooltip(container);
        });

        container.appendChild(el);
    });
}

/**
 * showMapTooltip - Displays tooltip for a map node
 * @param {HTMLElement} container - Map container
 * @param {Object} node - Node data object
 * @param {MouseEvent} e - Mouse event
 */
function showMapTooltip(container, node, e) {
    var tooltip = container.querySelector('#map-tooltip');
    if (!tooltip) return;

    tooltip.innerHTML = '<h5>' + node.name + '</h5><p>' + node.desc + '</p>';
    tooltip.classList.add('active');

    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left + 15;
    var y = e.clientY - rect.top - 10;

    // Keep tooltip within bounds
    if (x + 220 > rect.width) x = x - 240;
    if (y + 80 > rect.height) y = y - 80;

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

/**
 * hideMapTooltip - Hides the map tooltip
 * @param {HTMLElement} container - Map container
 */
function hideMapTooltip(container) {
    var tooltip = container.querySelector('#map-tooltip');
    if (tooltip) tooltip.classList.remove('active');
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
    var timelineContainer = document.getElementById('guru-nanak-timeline');
    renderTimeline(timelineContainer, TIMELINE_EVENTS);

    // Map
    var mapContainer = document.getElementById('udasi-map');
    renderMap(mapContainer, MAP_NODES, MAP_CONNECTIONS);

    // Scroll observer
    initScrollObserver();
}

// Expose key functions for test harness
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderTimeline: renderTimeline,
        renderMap: renderMap,
        showMapTooltip: showMapTooltip,
        hideMapTooltip: hideMapTooltip,
        TIMELINE_EVENTS: TIMELINE_EVENTS,
        MAP_NODES: MAP_NODES,
        MAP_CONNECTIONS: MAP_CONNECTIONS
    };
}

document.addEventListener('DOMContentLoaded', init);

/**
 * Rowlatt Satyagraha Explorer - Interactive Script
 * Handles map interaction, section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Map City Data */
    const cityData = {
        delhi: {
            title: 'Delhi — The First Hartal',
            desc: 'Delhi observed the first hartal on 30 March 1919 (ahead of the national date). The city shut down; a procession of 30,000 moved through Chandni Chowk. A minor clash with police at the railway station left two Indians dead. Swami Shraddhanand led the protests. The hartal demonstrated that even the imperial capital could be paralysed by non-cooperation.'
        },
        bombay: {
            title: 'Bombay — The Launch City',
            desc: 'Bombay was the nerve centre of the movement. Gandhi\'s Satyagraha Sabha was formed here on 24 February. On 6 April, a massive procession of 50,000+ Hindus and Muslims marched together to the seafront for prayers. The Bombay Chronicle editor Horniman was deported by the British, turning him into a national hero.'
        },
        ahmedabad: {
            title: 'Ahmedabad — Textile Workers Strike',
            desc: 'Ahmedabad\'s textile mill workers struck in solidarity, shutting down over 50 mills. Gandhi\'s home city observed a complete hartal with processions, fasting, and prayer. The mill owners supported the movement financially, showing the alliance between nationalists and indigenous industrialists against the Rowlatt Act.'
        },
        amritsar: {
            title: 'Amritsar — The Punjab Epicentre',
            desc: 'Amritsar became the flashpoint of the movement. On 10 April, leaders Dr. Satyapal and Dr. Kitchlew were arrested and deported, triggering riots. British officials were killed, banks burned. On 13 April, Brigadier Dyer fired on 10,000+ people at Jallianwala Bagh, killing hundreds. Amritsar became a symbol of British brutality.'
        },
        lahore: {
            title: 'Lahore — Punjab\'s Political Capital',
            desc: 'Lahore observed massive hartals on 6 April. After Gandhi\'s arrest on 9 April, riots broke out. The British responded with martial law, public floggings, and the infamous "crawling order." The repression in Lahore was among the worst in Punjab.'
        },
        calcutta: {
            title: 'Calcutta — Bengal Responds',
            desc: 'Bengal\'s political culture, shaped by the earlier Swadeshi Movement, ensured Calcutta observed the hartal with passion. The port was shut down for a day. C.R. Das and Subhas Chandra Bose (then a young student) were among those who mobilised the city. The hartal rekindled the Bengali revolutionary spirit.'
        },
        madras: {
            title: 'Madras — Southern Participation',
            desc: 'Madras (Chennai) saw widespread hartal observance. The southern movement was notable for its strong Hindu-Muslim unity. Rajaji (C. Rajagopalachari) and other Tamil leaders organised processions and public meetings against the Act.'
        },
        allahabad: {
            title: 'Allahabad — The Hindi Heartland',
            desc: 'The United Provinces (modern Uttar Pradesh) saw strong participation, particularly in Allahabad where Motilal Nehru and Madan Mohan Malaviya were based. The hartal here demonstrated that the movement was not confined to coastal cities.'
        },
        nagpur: {
            title: 'Nagpur — Central India Awakens',
            desc: 'Nagpur in central India observed the hartal actively. The city would later become the RSS headquarters and a centre of Hindu nationalist politics, but in 1919 it was a Congress stronghold with strong participation in the Rowlatt protests.'
        }
    };

    /* ------------------------------------------------------- Interactive Map */
    function initMap() {
        const markers = document.querySelectorAll('.map-marker');
        const titleEl = document.getElementById('map-info-title');
        const descEl = document.getElementById('map-info-desc');
        if (!titleEl || !descEl) return;

        const updateInfo = (key) => {
            const data = cityData[key];
            if (!data) return;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;
        };

        markers.forEach(m => {
            const key = m.dataset.city;
            m.addEventListener('click', () => updateInfo(key));
            m.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateInfo(key); }
            });
        });
    }

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('rs-section-nav');
        const navLinks = document.querySelectorAll('.rs-nav-link');
        if (!navBar) return;

        const sections = Array.from(navLinks).map(link => {
            const target = link.getAttribute('href').replace('#', '');
            return { link, section: document.getElementById(target) };
        }).filter(item => item.section);

        const setActive = (activeLink) => {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        };

        navLinks.forEach(link => link.addEventListener('click', () => setActive(link)));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const matchingLink = navBar.querySelector(`[href="#${id}"]`);
                    if (matchingLink) setActive(matchingLink);
                }
            });
        }, { rootMargin: '-40% 0px -50% 0px' });

        sections.forEach(item => observer.observe(item.section));
    }

    /* ------------------------------------------------------- Scroll Reveal */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(el => observer.observe(el));
    }

    /* ------------------------------------------------------- Journey Integration */
    function initJourney() {
        if (!window.Journey) return;

        window.Journey.registerSearchItems(
            'frontend/rowlatt-satyagraha-explorer/index.html',
            [
                {
                    id: 'rowlatt-main',
                    title: 'Rowlatt Satyagraha Explorer',
                    description: 'Gandhi\'s first all-India satyagraha (1919) against the Rowlatt Acts — covering the political background, the Act\'s repressive provisions, the nationwide hartals, the Punjab unrest, Jallianwala Bagh, and historical significance.',
                    link: 'frontend/rowlatt-satyagraha-explorer/index.html'
                },
                {
                    id: 'rowlatt-map',
                    title: 'Rowlatt Satyagraha Protest Map',
                    description: 'Interactive map of the nine major cities affected by the Rowlatt Satyagraha — Delhi, Bombay, Ahmedabad, Amritsar, Lahore, Calcutta, Madras, Allahabad, Nagpur.',
                    link: 'frontend/rowlatt-satyagraha-explorer/index.html#map'
                },
                {
                    id: 'rowlatt-timeline',
                    title: 'Rowlatt Satyagraha Timeline (Feb–Apr 1919)',
                    description: 'A chronological timeline from the Rowlatt Report through the Satyagraha Sabha, the 6 April hartal, Gandhi\'s arrest, the Punjab eruption, and Jallianwala Bagh.',
                    link: 'frontend/rowlatt-satyagraha-explorer/index.html#timeline'
                },
                {
                    id: 'rowlatt-jallianwala',
                    title: 'Rowlatt Satyagraha and Jallianwala Bagh',
                    description: 'How the Rowlatt Satyagraha and Punjab unrest led directly to the Jallianwala Bagh massacre of 13 April 1919 — the link between Gandhi\'s protest and Dyer\'s atrocity.',
                    link: 'frontend/rowlatt-satyagraha-explorer/index.html#jallianwala'
                }
            ]
        );
    }

    /* ------------------------------------------------------- Initialize */
    document.addEventListener('DOMContentLoaded', () => {
        initMap();
        initSectionNav();
        initReveal();
        initJourney();
    });
})();

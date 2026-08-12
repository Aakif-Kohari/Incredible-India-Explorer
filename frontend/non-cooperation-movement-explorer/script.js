/**
 * Non-Cooperation Movement Explorer - Interactive Script
 * Handles map interaction, section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Regional Data */
    const regionData = {
        gujarat: {
            title: 'Gujarat — Gandhi\'s Home Base',
            desc: 'Gujarat was the nerve centre of the movement. Gandhi\'s ashram at Sabarmati was the headquarters. Sardar Patel organised the movement across the state. Khadi spinning became a mass activity — every village had charkhas. The Bardoli taluka would later host the 1928 satyagraha that built on this foundation.'
        },
        bengal: {
            title: 'Bengal — Deshbandhu\'s Leadership',
            desc: 'Bengal saw massive participation under C.R. Das. Students left government schools in thousands; the Bengal National College and Jamia Millia Islamia drew students nationwide. The boycott of foreign cloth was particularly effective in Calcutta. After the movement\'s withdrawal, Das formed the Swaraj Party to enter the councils.'
        },
        punjab: {
            title: 'Punjab — Post-Jallianwala Rage',
            desc: 'Punjab\'s participation was fueled by the memory of Jallianwala Bagh. Lala Lajpat Rai led the movement. The Akali movement for Gurudwara reform ran in parallel with Non-Cooperation, with many Sikhs participating in both. The region\'s peasantry was heavily mobilised.'
        },
        up: {
            title: 'United Provinces & Awadh',
            desc: 'The United Provinces (modern Uttar Pradesh) saw strong peasant participation, especially in Awadh. Baba Ramchandra led the Awadh Kisan Sabha, organising peasants against taluqdars. The Chauri Chaura incident that ended the movement occurred in Gorakhpur district of the UP.'
        },
        bihar: {
            title: 'Bihar — Rajendra Prasad\'s Base',
            desc: 'Rajendra Prasad led the movement in Bihar. Building on his Champaran work, he mobilised peasants, students, and lawyers. The Bihar Vidyapith was established as a national educational institution. Swami Vidyanand and Mazharul Haque were other key organisers.'
        },
        andhra: {
            title: 'Andhra — Regional Uprising',
            desc: 'The Andhra region saw strong participation in the form of the "no-tax" campaigns. Prakasam Pantulu and other leaders organised peasants in the coastal districts. The region\'s ryots refused to pay land revenue, marking an escalation of the boycott.'
        },
        tamilnadu: {
            title: 'Tamil Nadu — Rajaji\'s Leadership',
            desc: 'C. Rajagopalachari (Rajaji) led the movement in the Madras Presidency. The boycott of foreign cloth and liquor shops was extensive. Students left Presidency College and other government institutions. The movement reached deep into rural Tamil Nadu for the first time.'
        },
        assam: {
            title: 'Assam — Tea Garden Workers',
            desc: 'Assam saw unique participation from tea garden workers, who left the plantations in large numbers, believing that Gandhi\'s raj was coming. The workers\' exodus was a spontaneous mass movement that surprised even Congress leaders. Many walked hundreds of kilometres to join the struggle.'
        },
        kerala: {
            title: 'Kerala — Moplah Rebellion Context',
            desc: 'Kerala\'s participation was shaped by the Moplah (Mappila) Rebellion of 1921, which began as part of the Khilafat-Non-Cooperation Movement but escalated into anti-Hindu violence in Malabar. The rebellion alienated many Hindus from the movement and damaged Hindu-Muslim unity in the region.'
        },
        maharashtra: {
            title: 'Maharashtra — Tilak\'s Legacy',
            desc: 'Maharashtra, the base of Tilak (who died on 1 August 1920, the day Non-Cooperation was launched), saw widespread participation. The movement was particularly strong in the Marathi-speaking districts. The Tilak Swaraj Fund raised lakhs of rupees for the movement.'
        }
    };

    /* ------------------------------------------------------- Interactive Map */
    function initMap() {
        const markers = document.querySelectorAll('.map-marker');
        const titleEl = document.getElementById('map-info-title');
        const descEl = document.getElementById('map-info-desc');
        if (!titleEl || !descEl) return;

        const updateInfo = (key) => {
            const data = regionData[key];
            if (!data) return;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;
        };

        markers.forEach(m => {
            const key = m.dataset.region;
            m.addEventListener('click', () => updateInfo(key));
            m.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateInfo(key); }
            });
        });
    }

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('nc-section-nav');
        const navLinks = document.querySelectorAll('.nc-nav-link');
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
            'frontend/non-cooperation-movement-explorer/index.html',
            [
                {
                    id: 'non-coop-main',
                    title: 'Non-Cooperation Movement Explorer',
                    description: 'Explore the Non-Cooperation Movement (1920–1922) — India\'s first mass movement under Gandhi, covering boycotts, khadi promotion, regional participation, the Chauri Chaura incident, and the movement\'s withdrawal and long-term impact.',
                    link: 'frontend/non-cooperation-movement-explorer/index.html'
                },
                {
                    id: 'non-coop-map',
                    title: 'Non-Cooperation Movement Map',
                    description: 'Interactive map of regional participation — Gujarat, Bengal, Punjab, UP, Bihar, Andhra, Tamil Nadu, Assam, Kerala, Maharashtra.',
                    link: 'frontend/non-cooperation-movement-explorer/index.html#map'
                },
                {
                    id: 'non-coop-chauri',
                    title: 'Chauri Chaura Incident (5 Feb 1922)',
                    description: 'How the Chauri Chaura violence — protesters burning a police station and killing 22 policemen — led Gandhi to withdraw the entire Non-Cooperation Movement.',
                    link: 'frontend/non-cooperation-movement-explorer/index.html#chauri'
                },
                {
                    id: 'non-coop-timeline',
                    title: 'Non-Cooperation Movement Timeline',
                    description: 'From the 1 August 1920 launch through the Calcutta and Nagpur sessions, peak participation, mass arrests, and the 12 February 1922 withdrawal.',
                    link: 'frontend/non-cooperation-movement-explorer/index.html#timeline'
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

/* ==========================================================================
   NATIONAL COMMUNAL HARMONY AWARD EXPLORER — CLIENT INTERACTION SCRIPT
   Handles tab switching, awardee filtering, timeline rendering, & journey bookmarks.
   ========================================================================== */

(function () {
    'use strict';

    // Sample dataset of notable National Communal Harmony Award recipients
    const AWARDEES_DATA = [
        {
            id: 'ncha-1999-org',
            name: 'Foundation for Amity & National Integration',
            year: 1999,
            type: 'organization',
            typeName: 'Organization Category',
            description: 'Recognized for extensive community-level peace initiatives, interfaith dialogues, and emergency relief operations across sensitive regions.'
        },
        {
            id: 'ncha-2004-ind',
            name: 'Dr. Asghar Ali Engineer',
            year: 2004,
            type: 'individual',
            typeName: 'Individual Category',
            description: 'Pioneering reformist scholar, author, and interfaith activist who devoted decades to advocating secularism, harmony, and peaceful resolution of religious disputes.'
        },
        {
            id: 'ncha-2006-ind',
            name: 'Ram Puniyani',
            year: 2006,
            type: 'individual',
            typeName: 'Individual Category',
            description: 'Prominent social activist, author, and educator honored for his tireless workshops, literature, and lectures countering communal division and promoting secular values.'
        },
        {
            id: 'ncha-2008-ind',
            name: 'Acharya Shri N Mahapragya',
            year: 2008,
            type: 'individual',
            typeName: 'Individual Category',
            description: 'Renowned Jain spiritual leader who led the "Ahimsa Yatra" across India, traveling over 10,000 km on foot to spread non-violence and inter-community goodwill.'
        },
        {
            id: 'ncha-2010-org',
            name: 'Harmony India Foundation',
            year: 2010,
            type: 'organization',
            typeName: 'Organization Category',
            description: 'Honoured for grassroots peace committees, youth reconciliation programs, and cultural exchange festivals fostering mutual respect.'
        },
        {
            id: 'ncha-2012-org',
            name: 'Centre for Study of Society and Secularism',
            year: 2012,
            type: 'organization',
            typeName: 'Organization Category',
            description: 'Premier research and advocacy institution dedicated to scholarly studies, peace workshops, and conflict prevention training across India.'
        },
        {
            id: 'ncha-2015-ind',
            name: 'Khamliana',
            year: 2015,
            type: 'individual',
            typeName: 'Individual Category',
            description: 'Mizoram-based social worker recognized for extraordinary efforts in fostering peace and unity among ethnic groups in the North-East.'
        },
        {
            id: 'ncha-2019-ind',
            name: 'Valerian D’Souza',
            year: 2019,
            type: 'individual',
            typeName: 'Individual Category',
            description: 'Honored for building interfaith bridges, promoting social justice, and establishing educational trusts open to all communities.'
        }
    ];

    const TIMELINE_DATA = [
        { year: '1992', title: 'Inception of NFCH', text: 'Government of India sets up National Foundation for Communal Harmony as an autonomous body under Ministry of Home Affairs.' },
        { year: '1996', title: 'Award Instituted', text: 'National Communal Harmony Award officially launched to honor voluntary efforts promoting unity.' },
        { year: '1999', title: 'First Major Organization Award', text: 'Foundation for Amity & National Integration conferred the institutional honor.' },
        { year: '2004', title: 'Recognition of Scholars', text: 'Dr. Asghar Ali Engineer recognized for lifetime literature and peace research.' },
        { year: '2008', title: 'Ahimsa Yatra Honored', text: 'Acharya Shri N Mahapragya awarded for walking thousands of kilometers promoting non-violence.' },
        { year: '2012', title: 'Research & Fieldwork Expansion', text: 'Centre for Study of Society and Secularism awarded for institutional excellence.' },
        { year: 'Present', title: 'Sustained Legacy', text: 'Annual conferment at Rashtrapati Bhavan, inspiring grassroot peacebuilders nationwide.' }
    ];

    document.addEventListener('DOMContentLoaded', () => {
        initTabs();
        initAwardees();
        initTimeline();
        initThemeToggle();
        initMobileMenu();
        registerJourneySearch();
    });

    // Tab Switching Logic
    function initTabs() {
        const tabs = document.querySelectorAll('.harmony-tab');
        const sections = document.querySelectorAll('.harmony-section');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;

                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                sections.forEach(s => s.classList.remove('active'));

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    // Render & Filter Awardees
    function initAwardees() {
        const container = document.getElementById('awardees-container');
        const searchInput = document.getElementById('awardee-search');
        const catSelect = document.getElementById('awardee-category-select');

        if (!container) return;

        function render() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const category = catSelect ? catSelect.value : 'all';

            const filtered = AWARDEES_DATA.filter(item => {
                const matchesCategory = (category === 'all' || item.type === category);
                const matchesSearch = !query || 
                    item.name.toLowerCase().includes(query) || 
                    item.description.toLowerCase().includes(query) ||
                    item.year.toString().includes(query);

                return matchesCategory && matchesSearch;
            });

            if (filtered.length === 0) {
                container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94A3B8;">No recipients found matching your filter criteria.</div>`;
                return;
            }

            container.innerHTML = filtered.map(item => `
                <div class="awardee-card">
                    <div class="awardee-header">
                        <span class="awardee-name">${item.name}</span>
                        <span class="awardee-year">${item.year}</span>
                    </div>
                    <div class="awardee-type">${item.typeName}</div>
                    <p class="awardee-desc">${item.description}</p>
                </div>
            `).join('');
        }

        render();

        if (searchInput) searchInput.addEventListener('input', render);
        if (catSelect) catSelect.addEventListener('change', render);
    }

    // Render Timeline
    function initTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        container.innerHTML = TIMELINE_DATA.map(item => `
            <div class="timeline-entry">
                <div class="timeline-dot"></div>
                <div class="timeline-year">${item.year} — ${item.title}</div>
                <div class="timeline-text">${item.text}</div>
            </div>
        `).join('');
    }

    // Theme Toggle Handler
    function initThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) return;

        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Mobile Navbar Toggle
    function initMobileMenu() {
        const toggleBtn = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener('click', () => {
            const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
        });
    }

    // Register with My Journey Search Index (if present)
    function registerJourneySearch() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/national-communal-harmony-award-explorer/index.html', [
                {
                    id: 'ncha-explorer-main',
                    title: 'National Communal Harmony Award Explorer',
                    description: 'Explore India’s high national honour recognizing individuals and organizations promoting peace and integration.',
                    link: 'frontend/national-communal-harmony-award-explorer/index.html'
                }
            ]);
        }
    }
})();

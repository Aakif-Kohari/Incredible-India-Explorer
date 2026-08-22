/* ==========================================================================
   Wada Houses Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const roomData = {
        entrance: { title: 'Darwaza (Main Entrance)', desc: 'The grand entrance often features heavy wooden doors with brass spikes and a distinct archway. It acts as a transition space between the public street and the private sanctuary of the home, often featuring a foyer (Osari) for guests to wait.' },
        courtyard: { title: 'Chowk (Central Courtyard)', desc: 'The heart of the Wada. This open-to-sky space provides light and ventilation to all surrounding rooms. It is used for religious rituals, drying grains, and family gatherings. The Tulsi Vrindavan (holy basil plant) is always placed in the center.' },
        diwankhana: { title: 'Diwankhana (Reception Hall)', desc: 'Located near the entrance, this is the formal drawing room where the male head of the household receives guests and conducts business. It is richly decorated with wooden pillars and carved arches.' },
        kitchen: { title: 'Swayampakghar (Kitchen)', desc: 'Traditionally located in the east or southeast corner for auspicious reasons and wind direction. It features a distinct drainage system and is kept strictly pure according to cultural practices.' },
        bedroom: { title: 'Deorudi (Private Quarters)', desc: 'The innermost rooms reserved for the women and children of the joint family. These spaces are highly private, opening only into the inner courtyards, and feature built-in wooden storage cabinets (Khanas).' }
    };

    function init() {
        setupThemeToggle();
        setupBookmark();
        setupFloorPlan();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            toggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
        if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
    }

    function setupBookmark() {
        const btn = document.getElementById('bookmark-btn');
        const id = 'house-wada';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/wada-houses/index.html', title: 'Wada Houses', thumbnail: 'https://placehold.co/100/cd853f/fff', category: 'architecture' });
                updateBtn();
            }
        });
    }

    function setupFloorPlan() {
        const rooms = document.querySelectorAll('.room');
        const titleEl = document.getElementById('info-title');
        const descEl = document.getElementById('info-desc');

        const updateInfo = (key, el) => {
            rooms.forEach(r => r.classList.remove('active'));
            el.classList.add('active');
            if (roomData[key]) {
                titleEl.textContent = roomData[key].title;
                descEl.textContent = roomData[key].desc;
            }
        };

        rooms.forEach(room => {
            const key = room.dataset.room;
            room.addEventListener('click', () => updateInfo(key, room));
            room.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateInfo(key, room); }
            });
        });
    }

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    function setupJourneyIntegration() {
        if (window.Journey && window.Journey.registerSearchItems) {
            window.Journey.registerSearchItems('frontend/wada-houses/index.html', [
                { id: 'house-wada', title: 'Wada Houses', description: 'Traditional courtyard mansions of Maharashtra.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();

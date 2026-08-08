// script.js - Martial Arts of India Logic

(function () {
    'use strict';

    const data = window.martialArtsData;
    if (!data || !data.length) {
        console.error("Martial Arts data is missing.");
        return;
    }

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const tabContainer = document.getElementById('tab-buttons');
    const animatedFigure = document.getElementById('animated-figure');
    
    // Panel Elements
    const artName = document.getElementById('art-name');
    const artOrigin = document.getElementById('art-origin');
    const artDesc = document.getElementById('art-desc');
    const artHistory = document.getElementById('art-history');
    const artTraining = document.getElementById('art-training');
    const artWeapons = document.getElementById('art-weapons');
    const artPhilosophy = document.getElementById('art-philosophy');
    const artModern = document.getElementById('art-modern');

    // Theme Logic
    if (themeBtn) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeBtn.textContent = '☀️';
        }

        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
            }
        });
    }

    // Secure Render Helpers
    function setSafeText(element, text) {
        if(element) element.textContent = text || '';
    }

    function buildTabs() {
        tabContainer.innerHTML = '';
        data.forEach((art, index) => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            if (index === 0) btn.classList.add('active');
            
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            btn.setAttribute('aria-controls', 'martial-content');
            
            setSafeText(btn, art.name);
            
            btn.addEventListener('click', () => loadArt(art.id, btn));
            
            tabContainer.appendChild(btn);
        });
    }

    function loadArt(id, activeBtn) {
        // Update Tabs
        const allTabs = tabContainer.querySelectorAll('.tab-btn');
        allTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        if(activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-selected', 'true');
        }

        // Find Data
        const art = data.find(item => item.id === id);
        if (!art) return;

        // Update Animation Class
        animatedFigure.className = 'animated-character'; // reset
        animatedFigure.classList.add(`anim-${art.illustrationType}`);

        // Securely Update Content
        setSafeText(artName, art.name);
        setSafeText(artOrigin, art.origin);
        setSafeText(artDesc, art.description);
        setSafeText(artHistory, art.historicalPeriod);
        setSafeText(artPhilosophy, art.philosophy);
        setSafeText(artModern, art.modernPractice);

        // Update Training Path
        artTraining.innerHTML = '';
        art.training.forEach((step, index) => {
            const div = document.createElement('div');
            div.className = 'training-step';
            setSafeText(div, step);
            artTraining.appendChild(div);
        });

        // Update Weapons
        artWeapons.innerHTML = '';
        art.weapons.forEach(weapon => {
            const card = document.createElement('div');
            card.className = 'weapon-card';
            
            const h4 = document.createElement('h4');
            setSafeText(h4, weapon.name);
            
            const span = document.createElement('span');
            span.className = 'weapon-type';
            setSafeText(span, `${weapon.type} • ${weapon.material}`);
            
            const p = document.createElement('p');
            p.className = 'weapon-desc';
            setSafeText(p, weapon.description);

            card.appendChild(h4);
            card.appendChild(span);
            card.appendChild(p);
            
            artWeapons.appendChild(card);
        });
    }

    // Initialize
    buildTabs();
    if (data.length > 0) {
        loadArt(data[0].id, tabContainer.firstChild);
    }

})();

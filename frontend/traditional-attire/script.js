// script.js - Traditional Attire Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    const data = window.attireData;
    if (!data || !data.length) {
        console.error("Attire data is missing.");
        return;
    }

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const tabList = document.getElementById('region-tabs');
    const displayContainer = document.querySelector('.attire-display');
    const comparisonTbody = document.getElementById('comparison-tbody');
    
    // Panel Elements
    const elPlaceholderText = document.getElementById('placeholder-text');
    const elRegion = document.getElementById('attire-region');
    const elGarment = document.getElementById('attire-garment');
    const elDesc = document.getElementById('attire-desc');
    const elFabric = document.getElementById('attire-fabric');
    const elDrape = document.getElementById('attire-drape');
    const elOccasions = document.getElementById('attire-occasions');
    const elAccessories = document.getElementById('attire-accessories');
    const infoPanel = document.getElementById('info-panel');

    let currentIndex = 0;

    // --- Theme Logic ---
    if (themeBtn) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
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

    // --- Initialize Tabs ---
    function initTabs() {
        data.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            btn.setAttribute('aria-controls', 'info-panel');
            btn.setAttribute('id', `tab-${item.id}`);
            btn.setAttribute('tabindex', index === 0 ? '0' : '-1');
            btn.textContent = item.region;
            
            btn.addEventListener('click', () => selectTab(index));
            
            // Keyboard Navigation (Arrow Keys)
            btn.addEventListener('keydown', (e) => {
                let nextIndex = index;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    nextIndex = (index + 1) % data.length;
                    e.preventDefault();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    nextIndex = (index - 1 + data.length) % data.length;
                    e.preventDefault();
                } else if (e.key === 'Enter' || e.key === ' ') {
                    selectTab(index);
                    e.preventDefault();
                }

                if (nextIndex !== index) {
                    const nextBtn = tabList.children[nextIndex];
                    nextBtn.focus();
                    selectTab(nextIndex);
                }
            });

            tabList.appendChild(btn);
        });
    }

    // --- Handle Tab Selection ---
    function selectTab(index) {
        if (currentIndex === index && document.querySelector('.tab-btn[aria-selected="true"]')) return;
        
        currentIndex = index;
        const selectedData = data[currentIndex];

        // Update Tab States
        const tabs = tabList.querySelectorAll('.tab-btn');
        tabs.forEach((tab, i) => {
            const isSelected = i === currentIndex;
            tab.setAttribute('aria-selected', isSelected);
            tab.setAttribute('tabindex', isSelected ? '0' : '-1');
        });

        // Trigger animation reset
        displayContainer.classList.add('updating');
        
        // Use a tiny timeout to allow CSS to reset animations
        setTimeout(() => {
            updatePanel(selectedData);
            displayContainer.classList.remove('updating');
            
            // Re-trigger CSS animations
            const placeholder = document.querySelector('.image-placeholder');
            const info = document.querySelector('.attire-info-panel');
            
            placeholder.style.animation = 'none';
            info.style.animation = 'none';
            void placeholder.offsetWidth; // Reflow
            
            // Assuming no prefers-reduced-motion, apply animations
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReduced) {
                placeholder.style.animation = 'fadeIn 0.4s ease forwards';
                info.style.animation = 'fadeInRight 0.4s ease forwards';
            }
        }, 50);
    }

    function updatePanel(item) {
        // We use the region name as the placeholder text since actual images might be missing offline
        elPlaceholderText.textContent = `[ Image: ${item.region} Attire ]`;
        
        elRegion.textContent = item.region;
        elGarment.textContent = item.garment;
        elDesc.textContent = item.description;
        elFabric.textContent = item.fabric;
        elDrape.textContent = item.drape;
        elOccasions.textContent = item.occasions.join(', ');
        elAccessories.textContent = item.accessories.join(', ');
        
        // Update aria-label for screen readers on the panel
        infoPanel.setAttribute('aria-labelledby', `tab-${item.id}`);
    }

    // --- Comparison Table Generation ---
    function generateTable() {
        const rowsHtml = data.map(item => {
            return `
                <tr>
                    <td><strong>${item.region}</strong></td>
                    <td>${item.garment}</td>
                    <td>${item.fabric}</td>
                    <td>${item.occasions[0] || '-'}</td>
                </tr>
            `;
        }).join('');
        
        if (comparisonTbody) {
            comparisonTbody.innerHTML = rowsHtml;
        }
    }

    // --- Boot ---
    initTabs();
    generateTable();
    
    // Select first tab by default
    if (data.length > 0) {
        selectTab(0);
    }

})();

// script.js - Classical Music Accordion Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    const data = window.classicalMusicData;
    if (!data || !data.length) {
        console.error("Classical music data is missing.");
        return;
    }

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const accordionContainer = document.getElementById('accordion-container');

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

    // --- Render Accordions ---
    function renderAccordions() {
        accordionContainer.innerHTML = '';

        data.forEach((item, index) => {
            const headerId = `accordion-header-${index}`;
            const panelId = `accordion-panel-${index}`;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'accordion-item';

            // Button (Header)
            const button = document.createElement('button');
            button.className = 'accordion-header';
            button.id = headerId;
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', panelId);
            
            button.innerHTML = `
                <span>${item.title}</span>
                <span class="accordion-icon" aria-hidden="true">▼</span>
            `;

            // Content Panel
            const contentDiv = document.createElement('div');
            contentDiv.className = 'accordion-content';
            contentDiv.id = panelId;
            contentDiv.setAttribute('role', 'region');
            contentDiv.setAttribute('aria-labelledby', headerId);
            
            contentDiv.innerHTML = `
                <div class="accordion-body">
                    ${item.content}
                </div>
            `;

            itemDiv.appendChild(button);
            itemDiv.appendChild(contentDiv);
            accordionContainer.appendChild(itemDiv);
        });

        initAccordionLogic();
    }

    // --- Accordion Logic & Keyboard Accessibility ---
    function initAccordionLogic() {
        const headers = Array.from(document.querySelectorAll('.accordion-header'));

        headers.forEach((header, index) => {
            // Click Interaction
            header.addEventListener('click', () => {
                toggleAccordion(header, headers);
            });

            // Keyboard Interaction (Space, Enter handled by native <button> click)
            // Arrow Keys for navigation
            header.addEventListener('keydown', (e) => {
                let targetIndex = null;

                switch (e.key) {
                    case 'ArrowDown':
                        targetIndex = index === headers.length - 1 ? 0 : index + 1;
                        break;
                    case 'ArrowUp':
                        targetIndex = index === 0 ? headers.length - 1 : index - 1;
                        break;
                    case 'Home':
                        targetIndex = 0;
                        break;
                    case 'End':
                        targetIndex = headers.length - 1;
                        break;
                    default:
                        return; // Exit if other keys
                }

                if (targetIndex !== null) {
                    e.preventDefault();
                    headers[targetIndex].focus();
                }
            });
        });
    }

    function toggleAccordion(clickedHeader, allHeaders) {
        const isCurrentlyExpanded = clickedHeader.getAttribute('aria-expanded') === 'true';
        const panelId = clickedHeader.getAttribute('aria-controls');
        const currentPanel = document.getElementById(panelId);

        // Single-open behavior: close all others
        allHeaders.forEach(header => {
            if (header !== clickedHeader) {
                header.setAttribute('aria-expanded', 'false');
                const pId = header.getAttribute('aria-controls');
                const panel = document.getElementById(pId);
                panel.style.maxHeight = null;
                panel.classList.remove('is-open');
            }
        });

        // Toggle the clicked one
        if (isCurrentlyExpanded) {
            clickedHeader.setAttribute('aria-expanded', 'false');
            currentPanel.style.maxHeight = null;
            currentPanel.classList.remove('is-open');
        } else {
            clickedHeader.setAttribute('aria-expanded', 'true');
            currentPanel.classList.add('is-open');
            // Calculate dynamic height based on scrollHeight
            currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
        }
    }

    // --- Boot ---
    renderAccordions();

    // Recalculate height on window resize if an accordion is open
    window.addEventListener('resize', () => {
        const openHeader = document.querySelector('.accordion-header[aria-expanded="true"]');
        if (openHeader) {
            const panelId = openHeader.getAttribute('aria-controls');
            const currentPanel = document.getElementById(panelId);
            currentPanel.style.maxHeight = 'none'; // Temporarily unset
            currentPanel.style.maxHeight = currentPanel.scrollHeight + "px"; // Recalculate
        }
    });

})();

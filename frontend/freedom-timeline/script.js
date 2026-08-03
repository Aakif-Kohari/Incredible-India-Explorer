// script.js - Freedom Struggle Timeline Logic
// Encapsulated in IIFE to prevent global namespace pollution

(function () {
    'use strict';

    if (typeof window.FREEDOM_TIMELINE_DATA === 'undefined') {
        console.error('Timeline data not loaded!');
        return;
    }

    const eventsData = window.FREEDOM_TIMELINE_DATA;

    // DOM Elements
    const timelineTrack = document.getElementById('timeline-track');
    const timelineContainer = document.getElementById('timeline-container');
    const themeBtn = document.getElementById('theme-toggle');
    
    // Modal Elements
    const modal = document.getElementById('event-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalYear = document.getElementById('modal-year');
    const modalTitle = document.getElementById('modal-title');
    const modalImagePlaceholder = document.getElementById('modal-image-placeholder');
    const modalLeaders = document.getElementById('modal-leaders');
    const modalLocation = document.getElementById('modal-location');
    const modalDescription = document.getElementById('modal-description');
    const modalSignificance = document.getElementById('modal-significance');

    // --- Theme Logic ---
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
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '🌙';
            themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        }
    });

    // --- Render Timeline ---
    function renderTimeline() {
        // Clear existing nodes except the line
        const existingNodes = timelineTrack.querySelectorAll('.timeline-node');
        existingNodes.forEach(node => node.remove());

        eventsData.forEach((event, index) => {
            const node = document.createElement('div');
            node.className = 'timeline-node';
            
            const marker = document.createElement('div');
            marker.className = 'node-marker';

            const connector = document.createElement('div');
            connector.className = 'node-connector';

            const card = document.createElement('div');
            card.className = 'timeline-card';
            card.tabIndex = 0; // Keyboard accessible
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${event.title}, ${event.year}`);
            
            card.innerHTML = `
                <span class="card-year">${event.year}</span>
                <h3 class="card-title">${event.title}</h3>
                <p class="card-desc">${event.description}</p>
            `;

            // Interactions
            card.addEventListener('click', () => openModal(event));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(event);
                }
            });

            node.appendChild(connector);
            node.appendChild(marker);
            node.appendChild(card);
            
            timelineTrack.appendChild(node);
        });
    }

    // --- Modal Logic ---
    function openModal(event) {
        modalYear.textContent = event.year;
        modalTitle.textContent = event.title;
        modalLeaders.textContent = event.leaders.join(', ');
        modalLocation.textContent = event.location;
        modalDescription.textContent = event.description;
        modalSignificance.textContent = event.significance;
        
        modalImagePlaceholder.textContent = event.imageEmoji;
        modalImagePlaceholder.style.backgroundColor = event.imageColor;

        modal.showModal();
        if (typeof window.setupFocusTrap === 'function') {
            window.setupFocusTrap(modal);
        }
        
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeModal() {
        modal.close();
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Drag and Wheel Scrolling Logic ---
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Dragging
    timelineContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        timelineContainer.classList.add('active');
        startX = e.pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
    });

    timelineContainer.addEventListener('mouseleave', () => {
        isDown = false;
        timelineContainer.classList.remove('active');
    });

    timelineContainer.addEventListener('mouseup', () => {
        isDown = false;
        timelineContainer.classList.remove('active');
    });

    timelineContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timelineContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast multiplier
        timelineContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch Dragging (Mobile)
    timelineContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
    });

    timelineContainer.addEventListener('touchend', () => {
        isDown = false;
    });

    timelineContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - timelineContainer.offsetLeft;
        const walk = (x - startX) * 2;
        timelineContainer.scrollLeft = scrollLeft - walk;
    });

    // Mouse Wheel to Horizontal Scroll
    timelineContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            timelineContainer.scrollLeft += e.deltaY;
        }
    }, { passive: false }); // Needs to be non-passive to call preventDefault

    // Initialize
    renderTimeline();

})();

import { timelineEvents } from './data.js';

(function() {
    const timelineTrack = document.getElementById('timeline-track');
    const dragArea = document.getElementById('timeline-drag-area');
    const modal = document.getElementById('event-modal');
    const modalClose = document.getElementById('modal-close');
    
    // Modal Elements
    const modalImage = document.getElementById('modal-image');
    const modalYear = document.getElementById('modal-year');
    const modalLocation = document.getElementById('modal-location');
    const modalTitle = document.getElementById('modal-title');
    const modalLeadersList = document.getElementById('modal-leaders-list');
    const modalDescription = document.getElementById('modal-description');
    const modalSignificance = document.getElementById('modal-significance');

    // State
    let isDown = false;
    let startX;
    let scrollLeft;
    let focusedNodeIndex = -1;
    let allNodes = [];

    // Utility for secure text rendering
    const setElementText = (element, text) => {
        if (element) {
            element.textContent = text;
        }
    };

    const renderTimeline = () => {
        if (!timelineTrack || !timelineEvents) return;

        // Clear existing (except line)
        const line = timelineTrack.querySelector('.timeline-line');
        timelineTrack.innerHTML = '';
        if (line) timelineTrack.appendChild(line);

        timelineEvents.forEach((event, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = `timeline-node-wrapper ${index % 2 === 0 ? 'top-card' : 'bottom-card'}`;
            
            const dot = document.createElement('div');
            dot.className = 'timeline-dot';
            
            const card = document.createElement('div');
            card.className = 'timeline-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${event.title}, ${event.year}`);
            card.dataset.index = index;

            const yearSpan = document.createElement('span');
            yearSpan.className = 'card-year';
            yearSpan.textContent = event.year;

            const titleSpan = document.createElement('span');
            titleSpan.className = 'card-title';
            titleSpan.textContent = event.title;

            const summarySpan = document.createElement('p');
            summarySpan.className = 'card-summary';
            summarySpan.textContent = event.description;

            card.appendChild(yearSpan);
            card.appendChild(titleSpan);
            card.appendChild(summarySpan);

            wrapper.appendChild(dot);
            wrapper.appendChild(card);
            timelineTrack.appendChild(wrapper);

            // Add to nodes array for keyboard nav
            allNodes.push(card);

            // Event Listeners for Card
            card.addEventListener('click', () => openModal(event));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(event);
                }
            });
        });
    };

    const openModal = (event) => {
        if (!modal) return;
        
        modalImage.src = event.image;
        modalImage.alt = event.title;
        
        setElementText(modalYear, event.year);
        setElementText(modalLocation, event.location);
        setElementText(modalTitle, event.title);
        
        // Render leaders
        modalLeadersList.innerHTML = ''; // safe as we append text nodes
        if (event.leaders && event.leaders.length > 0) {
            event.leaders.forEach(leader => {
                const li = document.createElement('li');
                li.textContent = leader;
                modalLeadersList.appendChild(li);
            });
        }

        setElementText(modalDescription, event.description);
        setElementText(modalSignificance, event.significance);

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modalClose.focus();
        
        // Trap focus inside modal
        trapFocus(modal);
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Return focus to the last focused node if applicable
        if (focusedNodeIndex >= 0 && focusedNodeIndex < allNodes.length) {
            allNodes[focusedNodeIndex].focus();
        } else {
            dragArea.focus();
        }
    };

    // Keyboard navigation within the timeline
    const handleTimelineKeyboardNav = (e) => {
        if (allNodes.length === 0) return;

        // Find currently focused node
        const currentIndex = allNodes.findIndex(node => node === document.activeElement);

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = currentIndex < allNodes.length - 1 ? currentIndex + 1 : 0;
            allNodes[nextIndex].focus();
            focusedNodeIndex = nextIndex;
            scrollToNode(allNodes[nextIndex]);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : allNodes.length - 1;
            allNodes[prevIndex].focus();
            focusedNodeIndex = prevIndex;
            scrollToNode(allNodes[prevIndex]);
        }
    };

    const scrollToNode = (node) => {
        if (!dragArea || !node) return;
        const nodeRect = node.getBoundingClientRect();
        const dragAreaRect = dragArea.getBoundingClientRect();
        
        // Calculate offset to center the node
        const offset = node.offsetLeft - dragAreaRect.width / 2 + nodeRect.width / 2;
        dragArea.scrollTo({
            left: offset,
            behavior: 'smooth'
        });
    };

    // Drag to scroll logic
    const initDragScroll = () => {
        if (!dragArea) return;

        dragArea.addEventListener('mousedown', (e) => {
            isDown = true;
            dragArea.style.cursor = 'grabbing';
            startX = e.pageX - dragArea.offsetLeft;
            scrollLeft = dragArea.scrollLeft;
        });

        dragArea.addEventListener('mouseleave', () => {
            isDown = false;
            dragArea.style.cursor = 'grab';
        });

        dragArea.addEventListener('mouseup', () => {
            isDown = false;
            dragArea.style.cursor = 'grab';
        });

        dragArea.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - dragArea.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast multiplier
            dragArea.scrollLeft = scrollLeft - walk;
        });
    };

    // Simple Focus Trap
    const trapFocus = (element) => {
        const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0) return;

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });
    };

    // Initialize
    const init = () => {
        renderTimeline();
        initDragScroll();

        // Listeners
        if (dragArea) {
            dragArea.addEventListener('keydown', handleTimelineKeyboardNav);
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    };

    document.addEventListener('DOMContentLoaded', init);
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

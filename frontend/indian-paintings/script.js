// script.js - Traditional Paintings Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    const data = window.paintingsData;
    if (!data || !data.length) {
        console.error("Paintings data is missing.");
        return;
    }

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const galleryGrid = document.getElementById('paintings-grid');
    const noResults = document.getElementById('no-results');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    
    const lbImgPlaceholder = document.getElementById('lightbox-img-placeholder');
    const lbTitle = document.getElementById('lightbox-title');
    const lbStyle = document.getElementById('lightbox-style');
    const lbRegion = document.getElementById('lightbox-region');
    const lbDesc = document.getElementById('lightbox-desc');

    // State
    let filteredData = [...data];
    let currentLightboxIndex = -1;
    let previouslyFocusedElement = null;

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

    // --- Filter & Gallery Rendering ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            const target = e.target;
            target.classList.add('active');
            
            const filterValue = target.getAttribute('data-filter');
            
            if (filterValue === 'All') {
                filteredData = [...data];
            } else {
                filteredData = data.filter(item => item.style === filterValue);
            }
            
            renderGallery();
        });
    });

    function renderGallery() {
        galleryGrid.innerHTML = '';
        
        if (filteredData.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        
        filteredData.forEach((painting, index) => {
            const card = document.createElement('article');
            card.className = 'painting-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View ${painting.title}`);
            card.dataset.index = index;

            card.innerHTML = `
                <div class="card-image-wrapper">
                    <!-- Placeholder text simulating the image -->
                    <div class="card-image-placeholder">[ Image: ${painting.title} ]</div>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h2 class="card-title">${painting.title}</h2>
                        <span class="card-style">${painting.style}</span>
                    </div>
                    <span class="card-region">📍 ${painting.region}</span>
                    <p class="card-description">${painting.description}</p>
                </div>
            `;

            // Events to open Lightbox
            card.addEventListener('click', () => openLightbox(index));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            });

            galleryGrid.appendChild(card);
        });
    }

    // --- Lightbox & Focus Trap Logic ---
    function openLightbox(index) {
        currentLightboxIndex = index;
        previouslyFocusedElement = document.activeElement;
        
        updateLightboxContent();
        
        // Show modal
        lightbox.style.display = 'flex';
        // Small delay to allow CSS transition
        setTimeout(() => {
            lightbox.classList.remove('hidden');
            document.body.classList.add('lightbox-open');
            // Move focus to modal
            btnClose.focus();
        }, 10);

        // Add keyboard listener for trap and nav
        document.addEventListener('keydown', handleLightboxKeydown);
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.classList.remove('lightbox-open');
        document.removeEventListener('keydown', handleLightboxKeydown);
        
        // Wait for fade out
        setTimeout(() => {
            lightbox.style.display = 'none';
            if (previouslyFocusedElement) {
                previouslyFocusedElement.focus();
            }
        }, 300);
    }

    function updateLightboxContent() {
        const item = filteredData[currentLightboxIndex];
        
        lbImgPlaceholder.textContent = `[ High-Res Image: ${item.title} ]`;
        lbTitle.textContent = item.title;
        lbStyle.textContent = item.style;
        lbRegion.textContent = item.region;
        lbDesc.textContent = item.description;

        // Manage nav button states
        btnPrev.disabled = currentLightboxIndex === 0;
        btnNext.disabled = currentLightboxIndex === filteredData.length - 1;
        
        btnPrev.style.opacity = btnPrev.disabled ? '0.3' : '1';
        btnNext.style.opacity = btnNext.disabled ? '0.3' : '1';
        btnPrev.style.cursor = btnPrev.disabled ? 'default' : 'pointer';
        btnNext.style.cursor = btnNext.disabled ? 'default' : 'pointer';
    }

    function navPrev() {
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            updateLightboxContent();
        }
    }

    function navNext() {
        if (currentLightboxIndex < filteredData.length - 1) {
            currentLightboxIndex++;
            updateLightboxContent();
        }
    }

    // Lightbox Event Listeners
    btnClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', navPrev);
    btnNext.addEventListener('click', navNext);

    // Focus Trap & Keyboard Nav
    function handleLightboxKeydown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            return;
        }

        if (e.key === 'ArrowLeft') {
            navPrev();
            return;
        }

        if (e.key === 'ArrowRight') {
            navNext();
            return;
        }

        // Focus Trap logic for Tab
        if (e.key === 'Tab') {
            const focusableElements = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }

    // --- Boot ---
    // Ensure Lightbox is strictly hidden on load
    lightbox.style.display = 'none';
    renderGallery();

})();

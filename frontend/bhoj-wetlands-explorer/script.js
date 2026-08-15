/**
 * Bhoj Wetlands Explorer Interactive Logic
 * Handles dynamic rendering of grids, lightbox functionality, and scroll animations.
 */

(function () {
    'use strict';

    // Data for Lake Ecosystem & Biodiversity
    const ecosystemData = [
        { icon: '🌊', title: 'Freshwater Lake', desc: 'One of the oldest artificial freshwater lakes in India, serving as the primary drinking water source for Bhopal.' },
        { icon: '🌿', title: 'Catchment Area', desc: 'Surrounded by a protected catchment area that prevents soil erosion and maintains water quality.' },
        { icon: '🐟', title: 'Aquatic Life', desc: 'Supports diverse fish populations, including indigenous species vital to the local ecosystem balance.' },
        { icon: '🦦', title: 'Mammals & Reptiles', desc: 'Home to smooth-coated otters, monitor lizards, and various amphibian species thriving in the wetland margins.' }
    ];

    // Data for Bird Species
    const birdsData = [
        { icon: '🦆', title: 'Northern Shoveler', desc: 'A common winter visitor, easily identified by its large, spatula-shaped bill.' },
        { icon: '🦢', title: 'Black-headed Ibis', desc: 'A vulnerable species that finds safe roosting grounds in the wetland during migration.' },
        { icon: '🦅', title: 'Pallas Fish Eagle', desc: 'A rare winter visitor that hunts for fish in the shallow waters of the Lower Lake.' },
        { icon: '🦉', title: 'Indian Pond Heron', desc: 'A resident bird commonly seen stalking prey along the muddy shores and reed beds.' }
    ];

    // Data for Interesting Facts
    const factsData = [
        { icon: '📜', fact: 'The Upper Lake is mentioned in historical texts as early as the 11th century, making it over 900 years old.' },
        { icon: '💧', fact: 'The wetland supplies approximately 70% of the drinking water to the city of Bhopal.' },
        { icon: '🌳', fact: 'Van Vihar National Park, located on the shores of the Upper Lake, acts as a crucial buffer zone for the wetland.' },
        { icon: '🚣', fact: 'Boating is regulated to prevent disturbance to bird nesting sites and maintain water quality.' }
    ];

    // Data for Image Gallery
    const galleryData = [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Upper_Lake_Bhopal.jpg/800px-Upper_Lake_Bhopal.jpg', caption: 'The majestic Upper Lake (Bada Talab) at sunset' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lower_Lake_Bhopal.jpg/800px-Lower_Lake_Bhopal.jpg', caption: 'The serene Lower Lake (Chhota Talab)' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Raja_Bhoj_Statue_Bhopal.jpg/800px-Raja_Bhoj_Statue_Bhopal.jpg', caption: 'Statue of Raja Bhoj overlooking the wetland' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Birds_at_Bhoj_Wetland.jpg/800px-Birds_at_Bhoj_Wetland.jpg', caption: 'Migratory birds resting in the shallow waters' }
    ];

    /**
     * Renders a grid of items into a specified container
     * @param {string} containerId - The ID of the container element
     * @param {Array} data - The array of data objects to render
     * @param {Function} templateFn - Function returning HTML string for each item
     */
    function renderGrid(containerId, data, templateFn) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = data.map(templateFn).join('');
    }

    // Initialize Grids
    function initGrids() {
        renderGrid('ecosystem-grid', ecosystemData, item => `
      <div class="info-card animate-on-scroll">
        <div class="icon">${item.icon}</div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `);

        renderGrid('birds-grid', birdsData, item => `
      <div class="info-card animate-on-scroll">
        <div class="icon">${item.icon}</div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `);

        renderGrid('facts-grid', factsData, item => `
      <div class="fact-card animate-on-scroll">
        <div class="fact-icon">${item.icon}</div>
        <p>${item.fact}</p>
      </div>
    `);

        renderGrid('gallery-grid', galleryData, (item, index) => `
      <div class="gallery-item animate-on-scroll" data-index="${index}" role="button" tabindex="0" aria-label="View ${item.caption}">
        <img src="${item.src}" alt="${item.caption}" loading="lazy" />
      </div>
    `);
    }

    /**
     * Lightbox functionality for the image gallery
     */
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            updateLightboxContent();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightboxContent() {
            const item = galleryData[currentIndex];
            lightboxImg.src = item.src;
            lightboxImg.alt = item.caption;
            lightboxCaption.textContent = item.caption;
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryData.length;
            updateLightboxContent();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateLightboxContent();
        }

        // Event Listeners for Gallery Items
        document.getElementById('gallery-grid').addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                openLightbox(parseInt(item.dataset.index, 10));
            }
        });

        document.getElementById('gallery-grid').addEventListener('keydown', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                openLightbox(parseInt(item.dataset.index, 10));
            }
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    /**
     * Intersection Observer for scroll animations
     */
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize all modules when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initGrids();
            initLightbox();
            initScrollAnimations();
        });
    } else {
        initGrids();
        initLightbox();
        initScrollAnimations();
    }

})();

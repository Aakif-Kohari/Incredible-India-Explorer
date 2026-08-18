// Plantations Tour Script
// All logic encapsulated in an IIFE to prevent global namespace pollution

(function () {
    'use strict';

    // Data Structure
    const plantationsData = {
        assam: {
            title: "Assam Tea Gardens",
            famousFor: "Assam Black Tea",
            elevation: "45–120 m",
            harvest: "March–November",
            description: "Known for bold, malty tea produced in the lush Brahmaputra Valley.",
            highlights: [
                "Brahmaputra Valley",
                "Black tea production",
                "Tea plucking",
                "Monsoon landscapes"
            ],
            images: [
                { src: "🍃", caption: "Lush green tea gardens", bg: "#4caf50", color: "#fff" },
                { src: "👩‍🌾", caption: "Tea pluckers at work", bg: "#81c784", color: "#1b5e20" },
                { src: "☕", caption: "Fresh Assam Black Tea", bg: "#ffcc80", color: "#5d4037" }
            ]
        },
        darjeeling: {
            title: "Darjeeling Tea Estates",
            famousFor: "First Flush Tea (Champagne of Teas)",
            elevation: "600–2,000 m",
            harvest: "March–November",
            description: "Nestled in the Himalayan slopes, producing highly prized, aromatic, and floral teas.",
            highlights: [
                "Himalayan slopes",
                "First flush tea",
                "Mist-covered gardens",
                "Heritage tea estates"
            ],
            images: [
                { src: "⛰️", caption: "Himalayan slopes", bg: "#cfd8dc", color: "#37474f" },
                { src: "🌫️", caption: "Mist-covered gardens", bg: "#b0bec5", color: "#263238" },
                { src: "🍵", caption: "Aromatic Darjeeling Tea", bg: "#ffe082", color: "#ff6f00" }
            ]
        },
        coorg: {
            title: "Coorg Coffee Plantations",
            famousFor: "Arabica & Robusta Coffee",
            elevation: "900–1,500 m",
            harvest: "November–March",
            description: "Known as the Scotland of India, famous for its lush forests intertwined with coffee and pepper vines.",
            highlights: [
                "Arabica coffee",
                "Pepper vines",
                "Forest plantations",
                "Plantation bungalows"
            ],
            images: [
                { src: "🌳", caption: "Forest plantations", bg: "#388e3c", color: "#fff" },
                { src: "🌱", caption: "Arabica coffee plants", bg: "#795548", color: "#fff" },
                { src: "🏡", caption: "Plantation bungalows", bg: "#d7ccc8", color: "#4e342e" }
            ]
        },
        chikmagalur: {
            title: "Chikmagalur Coffee Estates",
            famousFor: "Birthplace of Indian Coffee",
            elevation: "1,000–1,900 m",
            harvest: "November–March",
            description: "The scenic Western Ghats where coffee was first cultivated in India by Baba Budan.",
            highlights: [
                "Coffee estates",
                "Western Ghats",
                "Coffee processing",
                "Scenic hill plantations"
            ],
            images: [
                { src: "🏔️", caption: "Western Ghats", bg: "#90a4ae", color: "#fff" },
                { src: "☕", caption: "Freshly brewed coffee", bg: "#5d4037", color: "#fff" },
                { src: "⚙️", caption: "Coffee processing", bg: "#a1887f", color: "#3e2723" }
            ]
        }
    };

    // DOM Elements
    const regionBtns = document.querySelectorAll('.region-btn');
    const infoTitle = document.getElementById('info-title');
    const infoFamous = document.getElementById('info-famous');
    const infoElevation = document.getElementById('info-elevation');
    const infoHarvest = document.getElementById('info-harvest');
    const infoDesc = document.getElementById('info-desc');
    const infoHighlights = document.getElementById('info-highlights');
    
    const carouselImageContainer = document.getElementById('carousel-image-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carouselIndicators = document.getElementById('carousel-indicators');
    const carouselSection = document.getElementById('carousel-container');
    const themeBtn = document.getElementById('theme-toggle');

    // State
    let currentRegion = 'assam';
    let currentSlide = 0;
    let autoPlayInterval;
    let isPaused = false;

    // Theme Toggle
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

    // Update Info Panel
    function updateInfoPanel(regionKey) {
        const data = plantationsData[regionKey];
        infoTitle.textContent = data.title;
        infoFamous.textContent = data.famousFor;
        infoElevation.textContent = data.elevation;
        infoHarvest.textContent = data.harvest;
        infoDesc.textContent = data.description;
        
        infoHighlights.innerHTML = '';
        data.highlights.forEach(hl => {
            const li = document.createElement('li');
            li.textContent = hl;
            infoHighlights.appendChild(li);
        });
    }

    // Carousel Functions
    function renderSlide(index) {
        const images = plantationsData[currentRegion].images;
        
        // Ensure index wraps properly
        if (index >= images.length) currentSlide = 0;
        else if (index < 0) currentSlide = images.length - 1;
        else currentSlide = index;

        const currentImg = images[currentSlide];

        // Fade out
        carouselImageContainer.classList.add('fade');
        
        setTimeout(() => {
            // Update content
            carouselImageContainer.innerHTML = `
                <div aria-hidden="true">${currentImg.src}</div>
                <div class="carousel-caption">${currentImg.caption}</div>
            `;
            carouselImageContainer.style.backgroundColor = currentImg.bg;
            carouselImageContainer.style.color = currentImg.color;
            
            // Fade in
            carouselImageContainer.classList.remove('fade');
            
            // Update Indicators
            updateIndicators();
        }, 300); // Matches transition duration in CSS
    }

    function createIndicators() {
        const images = plantationsData[currentRegion].images;
        carouselIndicators.innerHTML = '';
        
        images.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = 'indicator-dot';
            dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            dot.setAttribute('role', 'tab');
            dot.addEventListener('click', () => {
                renderSlide(idx);
                resetAutoPlay();
            });
            carouselIndicators.appendChild(dot);
        });
    }

    function updateIndicators() {
        const dots = carouselIndicators.querySelectorAll('.indicator-dot');
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });
    }

    function nextSlide() {
        renderSlide(currentSlide + 1);
        resetAutoPlay();
    }

    function prevSlide() {
        renderSlide(currentSlide - 1);
        resetAutoPlay();
    }

    // Auto-Play Logic
    function startAutoPlay() {
        if (!autoPlayInterval && !isPaused) {
            autoPlayInterval = setInterval(() => {
                renderSlide(currentSlide + 1);
            }, 4000); // 4 seconds
        }
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event Listeners for Controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Pause AutoPlay on hover/focus
    carouselSection.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoPlay();
    });
    carouselSection.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoPlay();
    });
    carouselSection.addEventListener('focusin', () => {
        isPaused = true;
        stopAutoPlay();
    });
    carouselSection.addEventListener('focusout', () => {
        isPaused = false;
        startAutoPlay();
    });

    // Keyboard Accessibility for Carousel
    carouselSection.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Region Switching
    regionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active states
            regionBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            // Switch region
            currentRegion = btn.getAttribute('data-region');
            currentSlide = 0; // Reset slide

            updateInfoPanel(currentRegion);
            createIndicators();
            renderSlide(currentSlide);
            resetAutoPlay();
        });
    });

    // Initialization
    function init() {
        updateInfoPanel(currentRegion);
        createIndicators();
        renderSlide(currentSlide);
        startAutoPlay();
    }

    // Kickoff
    init();

})();

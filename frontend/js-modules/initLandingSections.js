/* ==========================================================================
   LANDING PAGE SECTIONS (CUISINE EXPLORER, FESTIVALS, CULTURE SLIDER) MODULE
   ========================================================================== */
const pathPrefix = window.location.pathname.includes('/frontend/') 
    ? (window.location.pathname.split('/frontend/')[1].includes('/') ? '../' : '') 
    : 'frontend/';

function initCuisineExplorer() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (!cuisineGrid || typeof cuisinesData === 'undefined') return;

    if (cuisineGrid.dataset.listenerBound === "true") return;
    cuisineGrid.dataset.listenerBound = "true";

    renderCuisines('all');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const region = btn.getAttribute('data-region');

            cuisineGrid.style.opacity = '0';
            cuisineGrid.style.transform = 'translateY(15px)';
            cuisineGrid.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                renderCuisines(region);
                cuisineGrid.style.opacity = '1';
                cuisineGrid.style.transform = 'translateY(0)';
            }, 250);
        });
    });

    function renderCuisines(regionFilter) {
        cuisineGrid.innerHTML = '';

        const filteredList = regionFilter === 'all'
            ? cuisinesData
            : cuisinesData.filter(item => item.region === regionFilter);

        filteredList.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'cuisine-card glass-card';

            let badgeClass = 'saffron-bg';
            if (dish.region === 'south') badgeClass = 'gold-bg';
            if (dish.region === 'east') badgeClass = 'green-bg';
            if (dish.region === 'west') badgeClass = 'saffron-bg';
            if (dish.region === 'northeast') badgeClass = 'gold-bg';

            const firstLetter = dish.name.charAt(0).toUpperCase();

            // Create a dynamic gradient based on the region
            let gradStart = '#1a1a2e';
            let gradEnd = '#16213e';
            if (dish.region === 'north') { gradStart = '#4a154b'; gradEnd = '#1a0b1b'; }
            if (dish.region === 'south') { gradStart = '#0f3443'; gradEnd = '#34e89e'; }
            if (dish.region === 'east') { gradStart = '#5a3f37'; gradEnd = '#2c7744'; }
            if (dish.region === 'west') { gradStart = '#ff6f00'; gradEnd = '#ffab00'; }
            if (dish.region === 'northeast') { gradStart = '#0f2027'; gradEnd = '#203a43'; }

            card.innerHTML = `
                <div style="background: linear-gradient(135deg, ${gradStart}, ${gradEnd}); padding: 30px; height: 100%; display: flex; flex-direction: column; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -20px; right: -20px; font-size: 15rem; font-weight: 900; color: rgba(255,255,255,0.05); line-height: 1; user-select: none;">${firstLetter}</div>
                    <div style="position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: auto; padding-bottom: 30px;">
                            <span class="cuisine-origin" style="color: #ffcc00;">${dish.state}</span>
                            <span class="cuisine-region-badge ${badgeClass}" style="position: static;">${dish.region} India</span>
                        </div>
                        <h3 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 12px; background: linear-gradient(135deg, #fff, #ddd); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${dish.name}</h3>
                        <p style="color: rgba(255,255,255,0.85); line-height: 1.6; font-size: 1.05rem;">${dish.description}</p>
                    </div>
                </div>
            `;

            cuisineGrid.appendChild(card);
        });
    }
}

function initFestivals() {
    const festivalTimeline = document.getElementById('festival-timeline');

    if (!festivalTimeline || typeof festivalsData === 'undefined') return;

    if (festivalTimeline.dataset.listenerBound === "true") return;
    festivalTimeline.dataset.listenerBound = "true";

    festivalTimeline.innerHTML = '';

    festivalsData.forEach(fest => {
        const card = document.createElement('div');
        card.className = 'festival-card glass-card';
        let icon = '✨';
        if (fest.name.includes('Diwali')) icon = '🪔';
        if (fest.name.includes('Holi')) icon = '🎨';
        if (fest.name.includes('Eid')) icon = '🌙';
        if (fest.name.includes('Navratri')) icon = '💃';
        if (fest.name.includes('Pongal')) icon = '🌾';
        if (fest.name.includes('Bihu')) icon = '🥁';

        card.innerHTML = `
            <div style="font-size: 3.5rem; margin-right: 25px; filter: drop-shadow(0 0 15px rgba(255, 176, 31, 0.4)); flex-shrink: 0;">
                ${icon}
            </div>
            <div class="festival-card-content" style="flex-grow: 1;">
                <span class="subtitle" style="color: #ffab00; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 6px;">${fest.subtitle}</span>
                <h3 style="font-size: 1.7rem; font-weight: 700; color: #fff; margin: 0 0 10px 0;">${fest.name}</h3>
                <p style="color: rgba(255,255,255,0.75); line-height: 1.5; font-size: 0.95rem; margin: 0;">${fest.description}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = 'festivals.html';
        });

        festivalTimeline.appendChild(card);
    });
}

function initCultureSlider() {
    const track = document.getElementById('slider-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');
    const sliderContainer = document.getElementById('slider-container');

    if (!track || typeof cultureData === 'undefined') return;

    if (track.dataset.listenerBound === "true") return;
    track.dataset.listenerBound = "true";

    let currentSlide = 0;

    track.innerHTML = '';
    cultureData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'slider-card';
        let catIcon = '🌟';
        if (item.category.toLowerCase().includes('dance')) catIcon = '🎭';
        if (item.category.toLowerCase().includes('music')) catIcon = '🎼';
        if (item.category.toLowerCase().includes('clothing')) catIcon = '🥻';

        card.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 40px 25px; text-align: center; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s ease;">
                <div style="font-size: 4rem; margin-bottom: 20px; filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.4));">${catIcon}</div>
                <span class="slider-card-category" style="color: #d4af37; font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; text-transform: uppercase;">${item.category}</span>
                <h3 style="font-size: 2rem; margin: 12px 0; background: linear-gradient(135deg, #ffffff, #d4af37); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${item.title}</h3>
                <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">${item.description}</p>
            </div>
        `;
        track.appendChild(card);
    });

    const totalCards = cultureData.length;

    function getVisibleSlidesCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxSlides() {
        return Math.max(0, totalCards - getVisibleSlidesCount());
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const dotsCount = getMaxSlides() + 1;

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentSlide = i;
                moveSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function moveSlider() {
        const maxSlides = getMaxSlides();
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide > maxSlides) currentSlide = maxSlides;

        const cardWidthPercent = 100 / getVisibleSlidesCount();
        const percentTranslation = currentSlide * cardWidthPercent;

        track.style.transform = `translateX(calc(-${percentTranslation}% - ${currentSlide * 20}px))`;

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            moveSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            moveSlider();
        });
    }

    if (sliderContainer) {
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = false;
        }, { passive: true });

        sliderContainer.addEventListener('touchmove', (e) => {
            const deltaX = e.changedTouches[0].screenX - touchStartX;
            const deltaY = e.changedTouches[0].screenY - touchStartY;

            if (!isSwiping && Math.abs(deltaX) > Math.abs(deltaY)) {
                isSwiping = true;
            }

            if (isSwiping) {
                e.preventDefault();
            }
        }, { passive: false });

        sliderContainer.addEventListener('touchend', (e) => {
            if (!isSwiping) return;

            const deltaX = e.changedTouches[0].screenX - touchStartX;
            const SWIPE_THRESHOLD = 50;

            if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
                if (deltaX < 0) {
                    currentSlide++;
                } else {
                    currentSlide--;
                }
                moveSlider();
            }

            isSwiping = false;
        }, { passive: true });
    }

    updateDots();

    window.addEventListener('resize', () => {
        const max = getMaxSlides();
        if (currentSlide > max) {
            currentSlide = max;
        }
        updateDots();
        moveSlider();
    });
}

window.initCuisineExplorer = initCuisineExplorer;
window.initFestivals = initFestivals;
window.initCultureSlider = initCultureSlider;

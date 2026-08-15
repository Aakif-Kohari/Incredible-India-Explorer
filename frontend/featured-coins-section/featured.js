let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    initCarouselControls();
    initThemeToggle();
});

function renderCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track || typeof FEATURED_COINS_DATA === 'undefined') return;

    track.innerHTML = FEATURED_COINS_DATA.map(
        (coin, idx) => `
        <div class="featured-card ${idx === 0 ? 'active' : ''}" id="card-${idx}">
            <div class="featured-card-badge">🪙 ${coin.metal} • ${coin.period}</div>
            <h2>${coin.name}</h2>
            <p class="featured-significance"><strong>Historical Significance:</strong> ${coin.significance}</p>
            <p class="featured-fact">💡 <strong>Interesting Fact:</strong> ${coin.fact}</p>
            <a href="${coin.explorerUrl}" class="btn-explore">Explore ${coin.name} →</a>
        </div>
    `
    ).join('');
}

function initCarouselControls() {
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (!btnPrev || !btnNext || typeof FEATURED_COINS_DATA === 'undefined') return;

    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + FEATURED_COINS_DATA.length) % FEATURED_COINS_DATA.length;
        updateActiveCard();
    });

    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % FEATURED_COINS_DATA.length;
        updateActiveCard();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') btnPrev.click();
        if (e.key === 'ArrowRight') btnNext.click();
    });
}

function updateActiveCard() {
    document.querySelectorAll('.featured-card').forEach((card, idx) => {
        if (idx === currentIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

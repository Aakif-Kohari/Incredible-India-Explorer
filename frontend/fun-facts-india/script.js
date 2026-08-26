import { CULTURAL_DATA } from './cultural-data.js';

let activeLetter = 'A';
let activeFactId = null;

// Category icons mapping
const CATEGORY_ICONS = {
    'Food': '🍲',
    'Festivals': '🎉',
    'Art & Craft': '🎨',
    'Traditions': '🪷',
    'Languages': '🗣️',
    'History': '📚',
    'Nature': '🌿',
    'Music & Dance': '🎭',
    'Architecture': '🏛️',
    'Everyday Life': '👥'
};

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    populateCategoryFilter();
    initFilters();
    initAlphabet();
    initRandomFact();

    renderAlphabet();
    renderFacts();
    renderFeatured();
    renderCategories();
    renderStats();
});


/* =========================================================
   THEME
========================================================= */

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
    }

    const updateThemeIcon = () => {
        const isLight = document.documentElement.classList.contains('light-theme');

        themeToggle.textContent = isLight ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        themeToggle.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    };

    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');

        const isLight = document.documentElement.classList.contains('light-theme');

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon();
    });
}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}


/* =========================================================
   CATEGORY FILTER POPULATION
========================================================= */

function populateCategoryFilter() {
    const select = document.getElementById('category-filter');

    if (!select || !Array.isArray(CULTURAL_DATA.categories)) {
        return;
    }

    CULTURAL_DATA.categories
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
}


/* =========================================================
   FILTERS INITIALIZATION
========================================================= */

function initFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const clearButton = document.getElementById('clear-filters');

    categoryFilter?.addEventListener('change', () => {
        renderFacts();
    });

    clearButton?.addEventListener('click', () => {
        if (categoryFilter) {
            categoryFilter.value = 'all';
        }

        activeLetter = 'A';
        updateActiveAlphabet();
        renderFacts();
    });
}


/* =========================================================
   FILTERING LOGIC
========================================================= */

function getFilteredFacts() {
    if (!Array.isArray(CULTURAL_DATA.facts)) {
        return [];
    }

    const categoryFilter = document.getElementById('category-filter');
    const selectedCategory = categoryFilter?.value || 'all';

    return CULTURAL_DATA.facts.filter((fact) => {
        const factLetter = String(fact.letter || '').toUpperCase();
        const matchesLetter = factLetter === activeLetter;
        const matchesCategory = selectedCategory === 'all' || fact.category === selectedCategory;

        return matchesLetter && matchesCategory;
    });
}


/* =========================================================
   ALPHABET
========================================================= */

function initAlphabet() {
    const alphabetContainer = document.getElementById('alphabet-nav');

    if (!alphabetContainer) return;

    alphabetContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.alphabet-card');

        if (!button) return;

        const letter = button.dataset.letter;

        if (!letter) return;

        activeLetter = letter;
        updateActiveAlphabet();
        renderFacts();

        document.getElementById('facts')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
}

function renderAlphabet() {
    const container = document.getElementById('alphabet-nav');

    if (!container) return;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    container.innerHTML = letters
        .map(
            (letter) => `
                <button
                    type="button"
                    class="alphabet-card ${letter === activeLetter ? 'active' : ''}"
                    data-letter="${letter}"
                    aria-label="Explore facts for letter ${letter}"
                    aria-pressed="${letter === activeLetter}"
                >
                    <span>${letter}</span>
                </button>
            `
        )
        .join('');
}

function updateActiveAlphabet() {
    document.querySelectorAll('.alphabet-card').forEach((button) => {
        const isActive = button.dataset.letter === activeLetter;

        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}


/* =========================================================
   FACT CARDS RENDERING
========================================================= */

function renderFacts() {
    const container = document.getElementById('facts-grid');
    const noResults = document.getElementById('no-results');

    if (!container) return;

    const facts = getFilteredFacts();

    container.innerHTML = '';

    facts.forEach((fact) => {
        container.appendChild(createFactCard(fact));
    });

    if (noResults) {
        noResults.hidden = facts.length !== 0;
    }
}


/* =========================================================
   CREATE FACT CARD
========================================================= */

function createFactCard(fact) {
    const card = document.createElement('article');
    card.className = 'fact-card';
    card.dataset.factId = fact.id;

    const categoryIcon = CATEGORY_ICONS[fact.category] || '🎯';

    card.innerHTML = `
        <div class="fact-card-image-wrap">
            <img
                src="${escapeAttribute(fact.image || '')}"
                alt="${escapeAttribute(fact.title || 'Cultural fact')}"
                class="fact-card-image"
                loading="lazy"
            />
            <div class="fact-card-image-overlay" aria-hidden="true"></div>
            <span class="fact-letter">${escapeHTML(fact.letter || activeLetter)}</span>
        </div>

        <div class="fact-card-content">
            <span class="fact-card-category">
                ${categoryIcon} ${escapeHTML(fact.category || 'Culture')}
            </span>

            <h3>${escapeHTML(fact.title || 'Indian Cultural Fact')}</h3>

            <div class="fact-card-location">
                📍 ${escapeHTML(fact.state || fact.region || 'India')}
            </div>

            <p class="fact-card-description">
                ${escapeHTML(fact.description || fact.explanation || '')}
            </p>

            <button type="button" class="fact-explore-btn" data-fact-id="${escapeAttribute(fact.id)}">
                Discover More →
            </button>
        </div>
    `;

    card.addEventListener('click', (event) => {
        const button = event.target.closest('.fact-explore-btn');

        if (button) {
            showFactDetail(button.dataset.factId);
            return;
        }

        showFactDetail(fact.id);
    });

    return card;
}


/* =========================================================
   FACT DETAIL VIEW
========================================================= */

function showFactDetail(factId) {
    const fact = CULTURAL_DATA.facts.find((item) => item.id === factId);

    if (!fact) return;

    activeFactId = factId;

    const wrapper = document.getElementById('fact-detail-wrapper');

    if (!wrapper) return;

    const relatedTopicsHTML = Array.isArray(fact.relatedTopics)
        ? fact.relatedTopics
            .map((topic) => `<span class="detail-topic">${escapeHTML(topic)}</span>`)
            .join('')
        : '';

    const categoryIcon = CATEGORY_ICONS[fact.category] || '🎯';

    wrapper.innerHTML = `
        <div class="fact-detail-content">
            ${
                fact.image
                    ? `<img class="fact-detail-image" src="${escapeAttribute(fact.image)}" alt="${escapeAttribute(fact.title)}" loading="lazy" />`
                    : ''
            }

            <div class="fact-detail-header">
                <div class="fact-detail-letter">${escapeHTML(fact.letter || '')}</div>
                <div>
                    <span class="fact-detail-category">
                        ${categoryIcon} ${escapeHTML(fact.category || 'Culture')}
                    </span>
                    <div class="fact-detail-location">
                        📍 ${escapeHTML(fact.state || fact.region || 'India')}
                    </div>
                </div>
            </div>

            <h3>${escapeHTML(fact.title)}</h3>

            <p class="fact-detail-description">
                ${escapeHTML(fact.description || '')}
            </p>

            ${
                fact.explanation
                    ? `
                        <div class="fact-explanation">
                            <strong>💡 Did You Know?</strong>
                            <p>${escapeHTML(fact.explanation)}</p>
                        </div>
                    `
                    : ''
            }

            ${
                relatedTopicsHTML
                    ? `
                        <div class="related-topics">
                            <strong>Related Topics</strong>
                            <div>${relatedTopicsHTML}</div>
                        </div>
                    `
                    : ''
            }
        </div>
    `;

    updateActiveFactCard(factId);

    wrapper.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

function updateActiveFactCard(factId) {
    document.querySelectorAll('.fact-card').forEach((card) => {
        card.classList.toggle('active', card.dataset.factId === factId);
    });
}


/* =========================================================
   FEATURED FACTS
========================================================= */

function renderFeatured() {
    const container = document.getElementById('featured-grid');

    if (!container || !Array.isArray(CULTURAL_DATA.facts)) {
        return;
    }

    let featured = CULTURAL_DATA.facts.filter((fact) =>
        CULTURAL_DATA.featured.includes(fact.id)
    );

    if (featured.length === 0) {
        featured = CULTURAL_DATA.facts.slice(0, 3);
    }

    container.innerHTML = featured
        .map((fact) => {
            const categoryIcon = CATEGORY_ICONS[fact.category] || '🎯';

            return `
                <article class="featured-card" data-fact-id="${escapeAttribute(fact.id)}">
                    <img
                        src="${escapeAttribute(fact.image || '')}"
                        alt="${escapeAttribute(fact.title)}"
                        loading="lazy"
                    />

                    <div class="featured-card-overlay">
                        <div class="featured-card-top">
                            <span class="featured-letter">${escapeHTML(fact.letter)}</span>
                            <span class="featured-category">${categoryIcon} ${escapeHTML(fact.category || 'Culture')}</span>
                        </div>

                        <div class="featured-card-bottom">
                            <h3>${escapeHTML(fact.title)}</h3>
                            <p>${escapeHTML(fact.description || '')}</p>

                            <button
                                type="button"
                                class="featured-explore-btn"
                                data-fact-id="${escapeAttribute(fact.id)}"
                            >
                                Discover →
                            </button>
                        </div>
                    </div>
                </article>
            `;
        })
        .join('');

    container.querySelectorAll('.featured-card').forEach((card) => {
        card.addEventListener('click', (event) => {
            const button = event.target.closest('.featured-explore-btn');
            const factId = button?.dataset.factId || card.dataset.factId;

            showFactDetail(factId);
        });
    });
}


/* =========================================================
   CATEGORIES GRID
========================================================= */

function renderCategories() {
    const container = document.getElementById('categories-grid');

    if (!container || !Array.isArray(CULTURAL_DATA.categories)) {
        return;
    }

    container.innerHTML = CULTURAL_DATA.categories
        .map((category) => {
            const icon = CATEGORY_ICONS[category] || '🎯';
            const count = CULTURAL_DATA.facts.filter((f) => f.category === category).length;

            return `
                <div class="category-card">
                    <span class="category-icon">${icon}</span>
                    <h3>${escapeHTML(category)}</h3>
                    <p>${count} ${count === 1 ? 'fact' : 'facts'}</p>
                </div>
            `;
        })
        .join('');

    container.querySelectorAll('.category-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            const category = CULTURAL_DATA.categories[index];
            const select = document.getElementById('category-filter');

            if (select) {
                select.value = category;
                select.dispatchEvent(new Event('change'));
            }

            activeLetter = 'A';
            updateActiveAlphabet();
            renderFacts();

            document.getElementById('facts')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });
}


/* =========================================================
   STATISTICS
========================================================= */

function renderStats() {
    const container = document.getElementById('stats-grid');

    if (!container) return;

    const stats = Array.isArray(CULTURAL_DATA.statistics) ? CULTURAL_DATA.statistics : [];

    container.innerHTML = stats
        .map(
            (stat) => `
                <div class="stat-card">
                    <span class="stat-icon">${escapeHTML(stat.icon || '🎬')}</span>
                    <strong class="stat-value">${escapeHTML(stat.value)}</strong>
                    <span class="stat-label">${escapeHTML(stat.label)}</span>
                </div>
            `
        )
        .join('');
}


/* =========================================================
   RANDOM FACT
========================================================= */

function initRandomFact() {
    const button = document.getElementById('random-fact');

    if (!button) return;

    button.addEventListener('click', showRandomFact);
}

function showRandomFact() {
    if (!Array.isArray(CULTURAL_DATA.facts) || CULTURAL_DATA.facts.length === 0) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * CULTURAL_DATA.facts.length);
    const randomFact = CULTURAL_DATA.facts[randomIndex];

    if (!randomFact) return;

    activeLetter = String(randomFact.letter || 'A').toUpperCase();

    updateActiveAlphabet();
    renderFacts();
    showFactDetail(randomFact.id);
}


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener('keydown', (event) => {
    const target = event.target;

    if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
    ) {
        return;
    }

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = event.key.toUpperCase();

    if (letters.includes(key)) {
        activeLetter = key;
        updateActiveAlphabet();
        renderFacts();
    }
});


/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHTML(value) {
    if (value === undefined || value === null) {
        return '';
    }

    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
    return escapeHTML(value);
}
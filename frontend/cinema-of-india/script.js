import { CINEMA_DATA } from './cinema-data.js';

let activeIndustryId = null;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    populateLanguageFilter();
    populateStateFilter();
    initFilters();
    renderIndustries();
    renderMap();
    renderFeatured();
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
        const isLight =
            document.documentElement.classList.contains('light-theme');

        themeToggle.textContent = isLight ? '🌙' : '☀️';

        themeToggle.setAttribute(
            'aria-label',
            isLight
                ? 'Switch to dark mode'
                : 'Switch to light mode'
        );
    };

    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');

        const isLight =
            document.documentElement.classList.contains('light-theme');

        localStorage.setItem(
            'theme',
            isLight ? 'light' : 'dark'
        );

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
        const expanded =
            menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.setAttribute(
            'aria-expanded',
            String(!expanded)
        );

        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');

            menuToggle.setAttribute(
                'aria-expanded',
                'false'
            );
        });
    });
}

/* =========================================================
   FILTER OPTIONS
========================================================= */

function populateLanguageFilter() {
    const select =
        document.getElementById('language-filter');

    if (
        !select ||
        !Array.isArray(CINEMA_DATA.languages)
    ) {
        return;
    }

    CINEMA_DATA.languages
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .forEach((language) => {
            const option =
                document.createElement('option');

            option.value = language;
            option.textContent = language;

            select.appendChild(option);
        });
}

function populateStateFilter() {
    const select =
        document.getElementById('state-filter');

    if (
        !select ||
        !Array.isArray(CINEMA_DATA.states)
    ) {
        return;
    }

    CINEMA_DATA.states
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .forEach((state) => {
            const option =
                document.createElement('option');

            option.value = state;
            option.textContent = state;

            select.appendChild(option);
        });
}

/* =========================================================
   FILTERS
========================================================= */

function initFilters() {
    const searchInput =
        document.getElementById('cinema-search');

    const languageFilter =
        document.getElementById('language-filter');

    const stateFilter =
        document.getElementById('state-filter');

    const clearButton =
        document.getElementById('clear-filters');

    searchInput?.addEventListener(
        'input',
        renderIndustries
    );

    languageFilter?.addEventListener(
        'change',
        renderIndustries
    );

    stateFilter?.addEventListener(
        'change',
        renderIndustries
    );

    clearButton?.addEventListener('click', () => {
        if (searchInput) {
            searchInput.value = '';
        }

        if (languageFilter) {
            languageFilter.value = 'all';
        }

        if (stateFilter) {
            stateFilter.value = 'all';
        }

        renderIndustries();
    });
}

function getFilteredIndustries() {
    if (!Array.isArray(CINEMA_DATA.industries)) {
        return [];
    }

    const search =
        document
            .getElementById('cinema-search')
            ?.value
            .trim()
            .toLowerCase() || '';

    const selectedLanguage =
        document.getElementById('language-filter')?.value ||
        'all';

    const selectedState =
        document.getElementById('state-filter')?.value ||
        'all';

    return CINEMA_DATA.industries.filter((industry) => {
        const searchableText = [
            industry.name,
            industry.language,
            industry.state,
            industry.city,
            industry.region,
            industry.nickname,
            industry.featuredFilm,
            industry.filmType,
            industry.description,
            ...(industry.tags || []),
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

        const matchesSearch =
            !search ||
            searchableText.includes(search);

        const matchesLanguage =
            selectedLanguage === 'all' ||
            industry.language === selectedLanguage;

        const matchesState =
            selectedState === 'all' ||
            industry.state === selectedState;

        return (
            matchesSearch &&
            matchesLanguage &&
            matchesState
        );
    });
}

/* =========================================================
   INDUSTRY CARDS
========================================================= */

function renderIndustries() {
    const container =
        document.getElementById('industries-grid');

    const noResults =
        document.getElementById('no-results');

    const status =
        document.getElementById('filter-status');

    if (!container) return;

    const industries =
        getFilteredIndustries();

    container.innerHTML = '';

    industries.forEach((industry) => {
        container.appendChild(
            createIndustryCard(industry)
        );
    });

    if (noResults) {
        noResults.hidden =
            industries.length !== 0;
    }

    if (status) {
        status.textContent =
            `${industries.length} ${
                industries.length === 1
                    ? 'industry'
                    : 'industries'
            } found`;
    }

    updateMapMarkers(industries);
}

function createIndustryCard(industry) {
    const card =
        document.createElement('article');

    card.className = 'industry-card';
    card.dataset.industryId = industry.id;

    const tagsHTML =
        (industry.tags || [])
            .map(
                (tag) => `
                    <span class="industry-card-tag">
                        ${escapeHTML(tag)}
                    </span>
                `
            )
            .join('');

    card.innerHTML = `
        <div class="industry-card-image-wrap">
            <img
                src="${escapeAttribute(industry.image)}"
                alt="${escapeAttribute(
                    industry.featuredFilm
                        ? `${industry.name} - ${industry.featuredFilm}`
                        : industry.name
                )}"
                class="industry-card-image"
                loading="lazy"
                onerror="this.style.display='none'"
            />

            <div
                class="industry-card-image-overlay"
                aria-hidden="true"
            ></div>

            ${
                industry.featured
                    ? `
                        <span class="industry-card-featured">
                            ★ Featured
                        </span>
                    `
                    : ''
            }
        </div>

        <div class="industry-card-content">

            <div class="industry-card-location">
                📍 ${escapeHTML(
                    industry.city ||
                    industry.state ||
                    'India'
                )}
                ${
                    industry.state &&
                    industry.city
                        ? `, ${escapeHTML(
                            industry.state
                        )}`
                        : ''
                }
            </div>

            <h3>
                ${escapeHTML(industry.name)}
            </h3>

            ${
                industry.nickname
                    ? `
                        <p class="industry-card-nickname">
                            ${escapeHTML(
                                industry.nickname
                            )}
                        </p>
                    `
                    : ''
            }

            <p class="industry-card-description">
                ${escapeHTML(
                    industry.description || ''
                )}
            </p>

            ${
                industry.featuredFilm
                    ? `
                        <div class="industry-card-film">

                            <strong>
                                🎬 ${escapeHTML(
                                    industry.featuredFilm
                                )}
                            </strong>

                            ${
                                industry.filmYear
                                    ? `
                                        <span>
                                            ${escapeHTML(
                                                industry.filmYear
                                            )}
                                        </span>
                                    `
                                    : ''
                            }

                            ${
                                industry.filmType
                                    ? `
                                        <small>
                                            ${escapeHTML(
                                                industry.filmType
                                            )}
                                        </small>
                                    `
                                    : ''
                            }

                        </div>
                    `
                    : ''
            }

            ${
                tagsHTML
                    ? `
                        <div class="industry-card-meta">
                            ${tagsHTML}
                        </div>
                    `
                    : ''
            }

            <button
                type="button"
                class="industry-explore-btn"
                data-industry-id="${escapeAttribute(
                    industry.id
                )}"
            >
                Explore Industry →
            </button>

        </div>
    `;

    card.addEventListener('click', (event) => {
        const button =
            event.target.closest(
                '.industry-explore-btn'
            );

        if (button) {
            showIndustryDetail(
                button.dataset.industryId
            );

            return;
        }

        showIndustryDetail(industry.id);
    });

    return card;
}

/* =========================================================
   INDUSTRY DETAIL
========================================================= */

function showIndustryDetail(industryId) {
    const industry =
        CINEMA_DATA.industries.find(
            (item) => item.id === industryId
        );

    if (!industry) return;

    activeIndustryId = industryId;

    const detail =
        document.getElementById('map-detail');

    if (!detail) return;

    const tagsHTML =
        (industry.tags || [])
            .map(
                (tag) =>
                    `<span class="industry-language">
                        ${escapeHTML(tag)}
                    </span>`
            )
            .join('');

    detail.innerHTML = `
        <div class="map-detail-content">

            <img
                class="map-detail-image"
                src="${escapeAttribute(
                    industry.image
                )}"
                alt="${escapeAttribute(
                    industry.featuredFilm
                        ? `${industry.name} - ${industry.featuredFilm}`
                        : industry.name
                )}"
                loading="lazy"
                onerror="this.style.display='none'"
            />

            <div class="industry-location">
                📍 ${escapeHTML(
                    industry.city || ''
                )}
                ${
                    industry.state
                        ? `, ${escapeHTML(
                            industry.state
                        )}`
                        : ''
                }
            </div>

            <h3>
                ${escapeHTML(industry.name)}
            </h3>

            ${
                industry.nickname
                    ? `
                        <p class="map-detail-nickname">
                            ${escapeHTML(
                                industry.nickname
                            )}
                        </p>
                    `
                    : ''
            }

            <p class="industry-description">
                ${escapeHTML(
                    industry.description || ''
                )}
            </p>

            ${
                industry.featuredFilm
                    ? `
                        <div class="map-detail-film">

                            <strong>
                                🎬 Featured Film
                            </strong>

                            <span>
                                ${escapeHTML(
                                    industry.featuredFilm
                                )}
                                ${
                                    industry.filmYear
                                        ? ` (${escapeHTML(
                                            industry.filmYear
                                        )})`
                                        : ''
                                }
                            </span>

                            ${
                                industry.filmType
                                    ? `
                                        <small>
                                            ${escapeHTML(
                                                industry.filmType
                                            )}
                                        </small>
                                    `
                                    : ''
                            }

                        </div>
                    `
                    : ''
            }

            ${
                tagsHTML
                    ? `
                        <div class="map-detail-tags">
                            ${tagsHTML}
                        </div>
                    `
                    : ''
            }

        </div>
    `;

    updateActiveMapMarker(industryId);
    updateActiveIndustryCard(industryId);

    const card =
        document.querySelector(
            `.industry-card[data-industry-id="${CSS.escape(
                industryId
            )}"]`
        );

    card?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
}

/* =========================================================
   REAL INDIA SVG MAP
========================================================= */

function renderMap() {
    const map =
        document.getElementById('cinema-map');

    if (
        !map ||
        !Array.isArray(CINEMA_DATA.industries)
    ) {
        return;
    }

    /*
     * in.svg is the actual geographical map.
     * It must be in the same directory as index.html.
     */

    map.innerHTML = `
        <div class="india-map">

            <img
                src="./in.svg"
                class="india-map-svg"
                alt="Map of India"
                draggable="false"
            />

            <div
                class="map-markers"
                id="map-markers"
            ></div>

            <div class="map-label">
                <span>🇮🇳</span>
                <span>Indian Cinema</span>
            </div>

        </div>
    `;

    const markersContainer =
        document.getElementById(
            'map-markers'
        );

    if (!markersContainer) return;

    CINEMA_DATA.industries.forEach(
        (industry) => {
            createMapMarker(
                industry,
                markersContainer
            );
        }
    );
}

function createMapMarker(
    industry,
    container
) {
    const coordinates =
        industry.coordinates;

    if (
        !coordinates ||
        typeof coordinates.x !== 'number' ||
        typeof coordinates.y !== 'number'
    ) {
        return;
    }

    const marker =
        document.createElement('button');

    marker.type = 'button';

    marker.className =
        'cinema-map-marker';

    marker.dataset.industryId =
        industry.id;

    /*
     * x/y are percentages relative to
     * the SVG/map container.
     */

    marker.style.left =
        `${coordinates.x}%`;

    marker.style.top =
        `${coordinates.y}%`;

    marker.setAttribute(
        'aria-label',
        `Explore ${industry.name} in ${
            industry.city || industry.state
        }`
    );

    marker.innerHTML = `
        <span class="marker-dot"></span>

        <span class="marker-label">
            ${escapeHTML(
                industry.nickname ||
                industry.name
            )}
        </span>
    `;

    marker.addEventListener(
        'click',
        () => {
            showIndustryDetail(
                industry.id
            );
        }
    );

    container.appendChild(marker);
}

/* =========================================================
   MAP FILTERING
========================================================= */

function updateMapMarkers(
    filteredIndustries
) {
    const visibleIds =
        new Set(
            filteredIndustries.map(
                (industry) =>
                    industry.id
            )
        );

    document
        .querySelectorAll(
            '.cinema-map-marker'
        )
        .forEach((marker) => {
            const isVisible =
                visibleIds.has(
                    marker.dataset.industryId
                );

            marker.classList.toggle(
                'filtered-out',
                !isVisible
            );

            marker.hidden =
                !isVisible;
        });

    /*
     * If the currently selected industry
     * disappears because of filtering,
     * clear the active state.
     */

    if (
        activeIndustryId &&
        !visibleIds.has(activeIndustryId)
    ) {
        activeIndustryId = null;

        document
            .querySelectorAll(
                '.cinema-map-marker'
            )
            .forEach((marker) => {
                marker.classList.remove(
                    'active'
                );
            });

        document
            .querySelectorAll(
                '.industry-card'
            )
            .forEach((card) => {
                card.classList.remove(
                    'active'
                );
            });
    }
}

/* =========================================================
   ACTIVE MAP / CARD STATE
========================================================= */

function updateActiveMapMarker(
    industryId
) {
    document
        .querySelectorAll(
            '.cinema-map-marker'
        )
        .forEach((marker) => {
            marker.classList.toggle(
                'active',
                marker.dataset.industryId ===
                    industryId
            );
        });
}

function updateActiveIndustryCard(
    industryId
) {
    document
        .querySelectorAll(
            '.industry-card'
        )
        .forEach((card) => {
            card.classList.toggle(
                'active',
                card.dataset.industryId ===
                    industryId
            );
        });
}

/* =========================================================
   FEATURED INDUSTRIES
========================================================= */

function renderFeatured() {
    const container =
        document.getElementById(
            'featured-grid'
        );

    if (
        !container ||
        !Array.isArray(
            CINEMA_DATA.industries
        )
    ) {
        return;
    }

    let featured =
        CINEMA_DATA.industries.filter(
            (industry) =>
                industry.featured === true
        );

    if (featured.length === 0) {
        featured =
            CINEMA_DATA.industries.slice(
                0,
                3
            );
    }

    container.innerHTML =
        featured
            .map(
                (industry) => `
                    <article
                        class="featured-card"
                        data-industry-id="${escapeAttribute(
                            industry.id
                        )}"
                    >

                        <img
                            src="${escapeAttribute(
                                industry.image
                            )}"
                            alt="${escapeAttribute(
                                industry.name
                            )}"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        />

                        <div class="featured-card-overlay">

                            <span
                                class="featured-card-tag"
                            >
                                ${escapeHTML(
                                    industry.region ||
                                    industry.state ||
                                    'India'
                                )}
                            </span>

                            <h3>
                                ${escapeHTML(
                                    industry.name
                                )}
                            </h3>

                            ${
                                industry.nickname
                                    ? `
                                        <p>
                                            ${escapeHTML(
                                                industry.nickname
                                            )}
                                        </p>
                                    `
                                    : ''
                            }

                            ${
                                industry.featuredFilm
                                    ? `
                                        <p>
                                            🎬 ${escapeHTML(
                                                industry.featuredFilm
                                            )}
                                            ${
                                                industry.filmYear
                                                    ? ` · ${escapeHTML(
                                                        industry.filmYear
                                                    )}`
                                                    : ''
                                            }
                                        </p>
                                    `
                                    : ''
                            }

                            <button
                                type="button"
                                class="featured-explore-btn"
                                data-industry-id="${escapeAttribute(
                                    industry.id
                                )}"
                            >
                                Discover →
                            </button>

                        </div>

                    </article>
                `
            )
            .join('');

    container
        .querySelectorAll(
            '.featured-card'
        )
        .forEach((card) => {
            card.addEventListener(
                'click',
                (event) => {
                    const button =
                        event.target.closest(
                            '.featured-explore-btn'
                        );

                    const industryId =
                        button?.dataset
                            .industryId ||
                        card.dataset
                            .industryId;

                    showIndustryDetail(
                        industryId
                    );
                }
            );
        });
}

/* =========================================================
   STATISTICS
========================================================= */

function renderStats() {
    const container =
        document.getElementById(
            'stats-grid'
        );

    if (!container) return;

    const stats =
        Array.isArray(
            CINEMA_DATA.statistics
        )
            ? CINEMA_DATA.statistics
            : [];

    container.innerHTML =
        stats
            .map(
                (stat) => `
                    <div class="stat-card">

                        <span class="stat-icon">
                            ${escapeHTML(
                                stat.icon || '🎬'
                            )}
                        </span>

                        <strong class="stat-value">
                            ${escapeHTML(
                                stat.value
                            )}
                        </strong>

                        <span class="stat-label">
                            ${escapeHTML(
                                stat.label
                            )}
                        </span>

                    </div>
                `
            )
            .join('');
}

/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHTML(value) {
    if (
        value === undefined ||
        value === null
    ) {
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
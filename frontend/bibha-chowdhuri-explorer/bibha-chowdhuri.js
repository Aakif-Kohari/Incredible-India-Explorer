// bibha-chowdhuri.js
// DOM controller for the Bibha Chowdhuri explorer page.

// ---- Theme toggle ----
function toggleTheme() {
    const isLight = document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('bibha_theme', isLight ? 'light' : 'dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = isLight ? '🌙' : '☀️';
}

function initTheme() {
    const saved = localStorage.getItem('bibha_theme') || 'dark';
    if (saved === 'light') {
        document.documentElement.classList.add('light-theme');
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = '🌙';
    }
}

// ---- Biography ----
function renderBiography() {
    const container = document.getElementById('bio-cards-container');
    if (!container) return;
    container.innerHTML = BIBHA_DATA.biographySections.map(function (s) {
        return '<article class="bc-bio-card" id="' + s.id + '">' +
            '<div class="bc-bio-icon">' + s.icon + '</div>' +
            '<h3>' + s.title + '</h3>' +
            '<div class="bc-bio-subtitle">' + s.subtitle + '</div>' +
            '<p>' + s.content + '</p>' +
            '</article>';
    }).join('');
}

// ---- Research simulator ----
function initResearchSimulator() {
    const container = document.getElementById('research-container');
    if (!container) return;
    container.innerHTML = BIBHA_DATA.researchTopics.map(function (r) {
        return '<article class="bc-research-card" id="' + r.id + '">' +
            '<h3 class="bc-research-title">' + r.researchTitle + '</h3>' +
            '<div class="bc-research-finding"><strong>Core Finding</strong>' + r.coreFinding + '</div>' +
            '<div class="bc-research-method"><strong>Methodology</strong>' + r.methodology + '</div>' +
            '<div class="bc-research-impact"><strong>Significance</strong>' + r.impact + '</div>' +
            '</article>';
    }).join('');
}

// ---- Institutions ----
function renderInstitutions() {
    const container = document.getElementById('institutions-container');
    if (!container) return;
    container.innerHTML = BIBHA_DATA.institutions.map(function (i) {
        return '<article class="bc-institution-card">' +
            '<h4>' + i.name + '</h4>' +
            '<div class="bc-inst-location">📍 ' + i.location + '</div>' +
            '<div class="bc-inst-period">' + i.period + '</div>' +
            '<p>' + i.description + '</p>' +
            '<div class="bc-inst-coords">🗺️ ' + i.coords.lat + '°N, ' + i.coords.lng + '°E</div>' +
            '</article>';
    }).join('');
}

// ---- Milestones ----
function renderMilestones() {
    const container = document.getElementById('milestones-container');
    if (!container) return;
    const categories = ['all'].concat(
        Array.from(new Set(BIBHA_DATA.milestonesCatalog.map(function (m) { return m.category; })))
    );

    const filterBtns = categories.map(function (c) {
        const isActive = c === 'all' ? ' active' : '';
        return '<button class="bc-filter-btn' + isActive + '" data-cat="' + c + '">' +
            (c.charAt(0).toUpperCase() + c.slice(1)) +
            '</button>';
    }).join('');

    const cards = BIBHA_DATA.milestonesCatalog.map(function (m) {
        return '<article class="bc-milestone-card" data-cat="' + m.category + '">' +
            '<h4>' + m.topic + '</h4>' +
            '<span class="bc-milestone-category">' + m.category + '</span>' +
            '<span class="bc-milestone-status">' + m.status + '</span>' +
            '<p>' + m.significance + '</p>' +
            '</article>';
    }).join('');

    container.innerHTML =
        '<div class="bc-filter-row">' + filterBtns + '</div>' +
        '<div class="bc-milestones-grid">' + cards + '</div>';

    // Attach filter handlers
    const filterBtnEls = container.querySelectorAll('.bc-filter-btn');
    filterBtnEls.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const cat = btn.getAttribute('data-cat');
            filterBtnEls.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            container.querySelectorAll('.bc-milestone-card').forEach(function (card) {
                if (cat === 'all' || card.getAttribute('data-cat') === cat) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ---- Timeline ----
function renderTimeline() {
    const track = document.getElementById('timeline-track');
    if (!track) return;
    track.innerHTML = BIBHA_DATA.timelineEvents.map(function (e, i) {
        const side = i % 2 === 0 ? 'left' : 'right';
        return '<div class="bc-timeline-item ' + side + '">' +
            '<div class="bc-timeline-year">' + e.year + '</div>' +
            '<div class="bc-timeline-content">' +
            '<h4>' + e.title + '</h4>' +
            '<p>' + e.description + '</p>' +
            '</div>' +
            '</div>';
    }).join('');
}

// ---- Quiz ----
function initQuiz() {
    const body = document.getElementById('quiz-body');
    if (!body) return;
    let currentIdx = 0;
    let score = 0;

    function renderQuestion() {
        const q = BIBHA_DATA.quizQuestions[currentIdx];
        if (!q) {
            body.innerHTML =
                '<div class="bc-quiz-result">' +
                '<h3>Quiz Complete!</h3>' +
                '<p>You scored ' + score + ' / ' + BIBHA_DATA.quizQuestions.length + '</p>' +
                '<button class="bc-quiz-btn" id="quiz-restart">Restart Quiz</button>' +
                '</div>';
            const restart = document.getElementById('quiz-restart');
            if (restart) {
                restart.addEventListener('click', function () {
                    currentIdx = 0;
                    score = 0;
                    renderQuestion();
                });
            }
            return;
        }

        const optionsHtml = q.options.map(function (opt, i) {
            return '<button class="bc-quiz-option" data-idx="' + i + '">' + opt + '</button>';
        }).join('');

        body.innerHTML =
            '<div class="bc-quiz-question">' +
            '<div class="bc-quiz-progress">Question ' + (currentIdx + 1) + ' of ' + BIBHA_DATA.quizQuestions.length + '</div>' +
            '<h3>' + q.question + '</h3>' +
            '<div class="bc-quiz-options">' + optionsHtml + '</div>' +
            '<div class="bc-quiz-explanation" id="quiz-explanation" hidden></div>' +
            '<button class="bc-quiz-btn" id="quiz-next" hidden>Next →</button>' +
            '</div>';

        const optionBtns = body.querySelectorAll('.bc-quiz-option');
        optionBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const chosen = parseInt(btn.getAttribute('data-idx'), 10);
                const correct = q.correctIndex;
                const explanation = document.getElementById('quiz-explanation');

                optionBtns.forEach(function (b, i) {
                    b.disabled = true;
                    if (i === correct) b.classList.add('correct');
                    if (i === chosen && chosen !== correct) b.classList.add('incorrect');
                });

                if (chosen === correct) score++;
                explanation.innerHTML = '<strong>' + (chosen === correct ? '✓ Correct!' : '✗ Not quite.') + '</strong> ' + q.explanation;
                explanation.hidden = false;
                const nextBtn = document.getElementById('quiz-next');
                if (nextBtn) nextBtn.hidden = false;
            });
        });

        const nextBtn = document.getElementById('quiz-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentIdx++;
                renderQuestion();
            });
        }
    }

    renderQuestion();
}

// ---- Sources ----
function renderSources() {
    const container = document.getElementById('sources-container');
    if (!container) return;
    container.innerHTML = BIBHA_DATA.sources.map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="bc-source-card">' +
            '<h4>' + s.title + '</h4>' +
            '<span class="bc-source-url">' + s.url + '</span>' +
            '</a>';
    }).join('');
}

// ---- Navigation ----
function initNavigation() {
    const navBtns = document.querySelectorAll('.bc-nav-btn[data-target]');
    navBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = btn.getAttribute('data-target');
            const el = document.getElementById(target);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            navBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    renderBiography();
    initResearchSimulator();
    renderInstitutions();
    renderMilestones();
    renderTimeline();
    initQuiz();
    renderSources();
    initNavigation();
});

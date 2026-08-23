/**
 * Ramabai Ranade Explorer — Frontend Logic & DOM Controller
 * Handles interactive subnav tabs, vocational program simulator, social reform filters,
 * timeline rendering, quiz evaluation, and theme switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderBiography();
    initProgramSimulator();
    renderSocialReform('all');
    initReformFilters();
    renderTimeline();
    initQuiz();
    initNavigation();
});

/* --- Theme Management --- */
function initTheme() {
    const savedTheme = localStorage.getItem('ramabai_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('ramabai_theme', isLight ? 'light' : 'dark');
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.textContent = isLight ? '🌙' : '☀️';
}

/* --- Smooth Subnav Scroll & Active State --- */
function initNavigation() {
    const navBtns = document.querySelectorAll('.rbr-nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const section = document.getElementById(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* --- Biography Cards Rendering --- */
function renderBiography() {
    const container = document.getElementById('bio-cards-container');
    if (!container || typeof RAMABAI_DATA === 'undefined') return;

    container.innerHTML = RAMABAI_DATA.biographySections.map(sec => `
        <div class="bio-card" id="${sec.id}">
            <div class="bio-card-icon">${sec.icon}</div>
            <h3>${sec.title}</h3>
            <div class="bio-card-subtitle">${sec.subtitle}</div>
            <p>${sec.content}</p>
        </div>
    `).join('');
}

/* --- Vocational Program Simulator --- */
function initProgramSimulator() {
    const selectorContainer = document.getElementById('program-selector-list');
    const displayContainer = document.getElementById('program-display-box');
    if (!selectorContainer || !displayContainer || typeof RAMABAI_DATA === 'undefined') return;

    const programs = RAMABAI_DATA.vocationalTraining;
    if (!programs || programs.length === 0) return;

    selectorContainer.innerHTML = programs.map((p, index) => `
        <button class="program-select-btn ${index === 0 ? 'active' : ''}" data-id="${p.id}">
            <strong>${p.programTitle}</strong>
        </button>
    `).join('');

    const buttons = selectorContainer.querySelectorAll('.program-select-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selected = programs.find(p => p.id === btn.dataset.id);
            if (selected) renderProgramDetail(selected);
        });
    });

    renderProgramDetail(programs[0]);
}

function renderProgramDetail(programObj) {
    const displayContainer = document.getElementById('program-display-box');
    if (!displayContainer) return;

    displayContainer.innerHTML = `
        <h3>${programObj.programTitle}</h3>
        <div class="program-badge-row">
            <span class="badge-tag">🎓 Seva Sadan Training Program</span>
        </div>
        <p style="margin-bottom: 12px;"><strong>Target Audience & Beneficiaries:</strong> ${programObj.targetAudience}</p>
        <p style="margin-bottom: 12px;"><strong>Curriculum & Skills Taught:</strong> ${programObj.skillSet}</p>
        <p><strong>Long-Term Social & Economic Impact:</strong> ${programObj.socialImpact}</p>
    `;
}

/* --- Social Reform Catalog Filtering --- */
function initReformFilters() {
    const filterBtns = document.querySelectorAll('.reform-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-cat');
            renderSocialReform(category);
        });
    });
}

function renderSocialReform(category) {
    const container = document.getElementById('reform-grid');
    if (!container || typeof RAMABAI_DATA === 'undefined') return;

    const data = RAMABAI_DATA.socialReformCatalog;
    const filtered = category === 'all' ? data : data.filter(item => item.category === category);

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No entries found for this category.</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="reform-card">
            <div class="reform-topic">${item.topic}</div>
            <div class="reform-status">${item.status}</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary);"><strong>Historical Significance:</strong> ${item.significance}</p>
        </div>
    `).join('');
}

/* --- Timeline Rendering --- */
function renderTimeline() {
    const container = document.getElementById('timeline-track');
    if (!container || typeof RAMABAI_DATA === 'undefined') return;

    container.innerHTML = RAMABAI_DATA.timelineEvents.map(event => `
        <div class="timeline-node">
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-content">
                <h4>${event.title}</h4>
                <p>${event.description}</p>
            </div>
        </div>
    `).join('');
}

/* --- Interactive Quiz Controller --- */
let currentQuestionIndex = 0;
let quizScore = 0;

function initQuiz() {
    const container = document.getElementById('quiz-body');
    if (!container || typeof RAMABAI_DATA === 'undefined') return;
    currentQuestionIndex = 0;
    quizScore = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const container = document.getElementById('quiz-body');
    if (!container) return;

    const questions = RAMABAI_DATA.quizQuestions;
    if (currentQuestionIndex >= questions.length) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: var(--accent-amber); font-size: 1.8rem; margin-bottom: 12px;">Quiz Completed! 🎉</h3>
                <p style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 20px;">You scored <strong>${quizScore}</strong> out of <strong>${questions.length}</strong>.</p>
                <button class="rbr-nav-btn active" id="restart-quiz-btn">Restart Quiz</button>
            </div>
        `;
        document.getElementById('restart-quiz-btn').addEventListener('click', initQuiz);
        return;
    }

    const q = questions[currentQuestionIndex];
    container.innerHTML = `
        <div style="margin-bottom: 16px; font-weight: 600; color: var(--text-muted);">Question ${currentQuestionIndex + 1} of ${questions.length}</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 20px;">${q.question}</h3>
        <div class="quiz-options-list">
            ${q.options.map((opt, i) => `
                <button class="quiz-option-btn" data-index="${i}">${opt}</button>
            `).join('')}
        </div>
        <div id="quiz-feedback-box"></div>
    `;

    const optionBtns = container.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedIndex = parseInt(btn.dataset.index);
            evaluateAnswer(selectedIndex, q, optionBtns);
        });
    });
}

function evaluateAnswer(selectedIndex, question, optionBtns) {
    optionBtns.forEach(b => b.disabled = true);
    const feedbackBox = document.getElementById('quiz-feedback-box');

    if (selectedIndex === question.correctIndex) {
        quizScore++;
        optionBtns[selectedIndex].classList.add('correct');
        if (feedbackBox) {
            feedbackBox.className = 'quiz-feedback correct-feedback';
            feedbackBox.innerHTML = `<strong>Correct!</strong> ${question.explanation}`;
        }
    } else {
        optionBtns[selectedIndex].classList.add('incorrect');
        optionBtns[question.correctIndex].classList.add('correct');
        if (feedbackBox) {
            feedbackBox.className = 'quiz-feedback incorrect-feedback';
            feedbackBox.innerHTML = `<strong>Incorrect.</strong> ${question.explanation}`;
        }
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'rbr-nav-btn active';
    nextBtn.style.marginTop = '16px';
    nextBtn.textContent = currentQuestionIndex === RAMABAI_DATA.quizQuestions.length - 1 ? 'See Results' : 'Next Question';
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuizQuestion();
    });

    feedbackBox.appendChild(document.createElement('br'));
    feedbackBox.appendChild(nextBtn);
}

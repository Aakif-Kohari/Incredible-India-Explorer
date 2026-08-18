/* ==========================================================================
   INDIAN NATIONAL AWARDS TIMELINE & QUIZ HUB — SCRIPT MODULE
   ========================================================================== */

import { AWARD_ENCYCLOPEDIA } from '../../js-modules/national-awards.js';

(function () {
    'use strict';

    // Master Timeline Milestones
    const TIMELINE_DATA = [
        { year: '1950', category: 'gallantry', award: 'Param Vir Chakra, Maha Vir Chakra, Vir Chakra', title: 'Wartime Gallantry Awards Instituted', desc: 'Instituted on January 26, 1950 (retrospective to August 15, 1947) to honor extreme battlefield valour.' },
        { year: '1952', category: 'gallantry', award: 'Ashoka Chakra, Kirti Chakra, Shaurya Chakra', title: 'Peacetime Gallantry Awards Instituted', desc: 'Established to recognize peacetime bravery and anti-terrorism heroism for military and civilian personnel.' },
        { year: '1954', category: 'civilian', award: 'Bharat Ratna & Padma Awards', title: 'Civilian Honours System Established', desc: 'Instituted by President Rajendra Prasad on January 2, 1954 to recognize outstanding service to the nation.' },
        { year: '1954', category: 'literature', award: 'Sahitya Akademi Award', title: 'National Academy of Letters Established', desc: 'Recognizing premier literary works across 24 Indian languages.' },
        { year: '1958', category: 'science', award: 'Rashtriya Vigyan Puraskar & Bhatnagar Prize', title: 'National Science Awards Instituted', desc: 'Established to encourage and honor pioneering scientific research in physical, chemical, and medical sciences.' },
        { year: '1958', category: 'education', award: 'National Teachers’ Award', title: 'Education & Nation Building Honour', desc: 'Presented annually on September 5th (Teachers’ Day) honoring distinguished educators.' },
        { year: '1961', category: 'sports', award: 'Arjuna Award', title: 'National Sports Recognition', desc: 'Instituted to honor consistent outstanding performance and sportsmanship over 4 years.' },
        { year: '1961', category: 'literature', award: 'Jnanpith Award', title: 'Highest Literary Award Instituted', desc: 'Founded by Bharatiya Jnanpith trust to honor outstanding literature in Indian languages.' },
        { year: '1973', category: 'healthcare', award: 'National Florence Nightingale Award', title: 'Nursing Excellence Recognition', desc: 'Instituted by Health Ministry to honor dedicated nursing professionals.' },
        { year: '1985', category: 'sports', award: 'Dronacharya Award', title: 'Sports Coaching Honour', desc: 'Recognizing legendary sports coaches who produce international champions.' },
        { year: '1991', category: 'sports', award: 'Major Dhyan Chand Khel Ratna', title: 'Highest Sporting Honour', desc: 'First awarded to chess legend Viswanathan Anand for international sporting achievements.' },
        { year: '1995', category: 'children', award: 'National Bal Shree Award & Gandhi Peace Prize', title: 'Children & Peace Honours', desc: 'Bal Shree for young creative minds; Gandhi Peace Prize for global non-violent transformation.' },
        { year: '1996', category: 'peace', award: 'National Communal Harmony Award', title: 'National Integration Honour', desc: 'Instituted by NFCH to honor peacebuilders and interfaith harmony.' },
        { year: '2006', category: 'governance', award: 'Prime Minister’s Public Admin Award', title: 'Civil Services Honour', desc: 'Recognizing innovative governance and public service delivery.' }
    ];

    // Quiz Questions Dataset
    const QUIZ_QUESTIONS = [
        {
            question: 'Which is the highest civilian award of India?',
            options: ['Padma Vibhushan', 'Bharat Ratna', 'Param Vir Chakra', 'Ashoka Chakra'],
            correct: 1,
            explanation: 'Bharat Ratna is India’s 1st highest civilian award, instituted in 1954 for exceptional performance of the highest order in any field.'
        },
        {
            question: 'Who was the first recipient of the Major Dhyan Chand Khel Ratna Award (1991–92)?',
            options: ['Sachin Tendulkar', 'P. T. Usha', 'Viswanathan Anand', 'Abhinav Bindra'],
            correct: 2,
            explanation: 'Grandmaster Viswanathan Anand was the inaugural recipient of the Khel Ratna award in 1991–92.'
        },
        {
            question: 'Who designed the iconic Param Vir Chakra medal?',
            options: ['Savitri Khanolkar', 'Satyajit Ray', 'Rabindranath Tagore', 'Nandalal Bose'],
            correct: 0,
            explanation: 'Savitri Khanolkar (Eve Yvonne Maday de Maros) designed the PVC medallion inspired by Rishi Dadhichi’s Indra Vajra.'
        },
        {
            question: 'Which peacetime gallantry award is the equivalent of the wartime Param Vir Chakra?',
            options: ['Kirti Chakra', 'Shaurya Chakra', 'Ashoka Chakra', 'Vir Chakra'],
            correct: 2,
            explanation: 'Ashoka Chakra is the highest peacetime gallantry award, equivalent in precedence to the wartime Param Vir Chakra.'
        },
        {
            question: 'The Sahitya Akademi Award copper plaque was designed by which famous personality?',
            options: ['Satyajit Ray', 'M. F. Husain', 'R. K. Laxman', 'Jamini Roy'],
            correct: 0,
            explanation: 'Oscar-winning filmmaker Satyajit Ray designed the official engraved copper plaque presented to Sahitya Akademi laureates.'
        }
    ];

    let quizState = {
        currentIndex: 0,
        score: 0,
        answered: false
    };

    document.addEventListener('DOMContentLoaded', () => {
        initTabs();
        initTimeline();
        initCompareTool();
        initQuiz();
        initFaqs();
        initThemeToggle();
        initMobileMenu();
        registerJourneySearch();
    });

    // Tab Navigation
    function initTabs() {
        const tabs = document.querySelectorAll('.hub-tab');
        const sections = document.querySelectorAll('.hub-section');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;

                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                sections.forEach(s => s.classList.remove('active'));

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                const targetSection = document.getElementById(targetId);
                if (targetSection) targetSection.classList.add('active');
            });
        });
    }

    // Timeline Filter & Render
    function initTimeline() {
        const container = document.getElementById('timeline-container');
        const searchInput = document.getElementById('timeline-search');
        const catSelect = document.getElementById('timeline-category-filter');

        if (!container) return;

        function render() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const category = catSelect ? catSelect.value : 'all';

            const filtered = TIMELINE_DATA.filter(item => {
                const matchCat = (category === 'all' || item.category === category);
                const matchQuery = !query ||
                    item.year.includes(query) ||
                    item.title.toLowerCase().includes(query) ||
                    item.award.toLowerCase().includes(query) ||
                    item.desc.toLowerCase().includes(query);
                return matchCat && matchQuery;
            });

            if (filtered.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#94A3B8;">No timeline entries match your search.</div>`;
                return;
            }

            container.innerHTML = filtered.map(item => `
                <div class="t-item">
                    <div class="t-dot"></div>
                    <span class="t-year-badge">${item.year}</span>
                    <h3 class="t-title">${item.title} (${item.award})</h3>
                    <p class="t-desc">${item.desc}</p>
                </div>
            `).join('');
        }

        render();
        if (searchInput) searchInput.addEventListener('input', render);
        if (catSelect) catSelect.addEventListener('change', render);
    }

    // Compare Awards Tool
    function initCompareTool() {
        const select1 = document.getElementById('compare-award-1');
        const select2 = document.getElementById('compare-award-2');
        const container = document.getElementById('compare-result-container');

        if (!select1 || !select2 || !container) return;

        const awards = Object.values(AWARD_ENCYCLOPEDIA);
        const optionsHtml = awards.map(a => `<option value="${a.id}">${a.name}</option>`).join('');

        select1.innerHTML = optionsHtml;
        select2.innerHTML = optionsHtml;
        if (awards.length > 1) select2.selectedIndex = 1;

        function renderCompare() {
            const a1 = AWARD_ENCYCLOPEDIA[select1.value];
            const a2 = AWARD_ENCYCLOPEDIA[select2.value];
            if (!a1 || !a2) return;

            container.innerHTML = `
                <div class="compare-grid">
                    <div class="c-card">
                        <h3>${a1.name}</h3>
                        <div class="c-row"><strong>Category</strong><span>${a1.categoryName}</span></div>
                        <div class="c-row"><strong>Precedence Rank</strong><span>${a1.rank}</span></div>
                        <div class="c-row"><strong>Established Year</strong><span>${a1.establishedYear}</span></div>
                        <div class="c-row"><strong>Eligibility</strong><span>${a1.eligibility}</span></div>
                        <div class="c-row"><strong>Medal / Award Design</strong><span>${a1.medalDesign}</span></div>
                    </div>

                    <div class="c-card">
                        <h3>${a2.name}</h3>
                        <div class="c-row"><strong>Category</strong><span>${a2.categoryName}</span></div>
                        <div class="c-row"><strong>Precedence Rank</strong><span>${a2.rank}</span></div>
                        <div class="c-row"><strong>Established Year</strong><span>${a2.establishedYear}</span></div>
                        <div class="c-row"><strong>Eligibility</strong><span>${a2.eligibility}</span></div>
                        <div class="c-row"><strong>Medal / Award Design</strong><span>${a2.medalDesign}</span></div>
                    </div>
                </div>
            `;
        }

        renderCompare();
        select1.addEventListener('change', renderCompare);
        select2.addEventListener('change', renderCompare);
    }

    // Quiz Logic
    function initQuiz() {
        const questionEl = document.getElementById('quiz-question');
        const optionsEl = document.getElementById('quiz-options');
        const progressEl = document.getElementById('quiz-progress-text');
        const scoreBadge = document.getElementById('quiz-score-badge');
        const explanationEl = document.getElementById('quiz-explanation');
        const expText = document.getElementById('quiz-exp-text');
        const nextBtn = document.getElementById('btn-next-question');
        const quizBox = document.getElementById('quiz-box');
        const resultCard = document.getElementById('quiz-result-card');
        const finalScoreText = document.getElementById('quiz-final-score-text');
        const restartBtn = document.getElementById('btn-restart-quiz');

        if (!questionEl) return;

        function loadQuestion() {
            quizState.answered = false;
            if (explanationEl) explanationEl.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';

            const q = QUIZ_QUESTIONS[quizState.currentIndex];
            if (progressEl) progressEl.textContent = `Question ${quizState.currentIndex + 1} of ${QUIZ_QUESTIONS.length}`;
            if (scoreBadge) scoreBadge.textContent = `Score: ${quizState.score}`;
            if (questionEl) questionEl.textContent = q.question;

            if (optionsEl) {
                optionsEl.innerHTML = q.options.map((opt, idx) => `
                    <button class="quiz-opt-btn" data-index="${idx}">${opt}</button>
                `).join('');

                const btns = optionsEl.querySelectorAll('.quiz-opt-btn');
                btns.forEach(btn => {
                    btn.addEventListener('click', () => handleOptionClick(parseInt(btn.dataset.index), btns));
                });
            }
        }

        function handleOptionClick(selectedIdx, optionBtns) {
            if (quizState.answered) return;
            quizState.answered = true;

            const q = QUIZ_QUESTIONS[quizState.currentIndex];
            optionBtns.forEach((btn, i) => {
                if (i === q.correct) {
                    btn.classList.add('correct');
                } else if (i === selectedIdx) {
                    btn.classList.add('incorrect');
                }
                btn.disabled = true;
            });

            if (selectedIdx === q.correct) {
                quizState.score += 1;
                if (scoreBadge) scoreBadge.textContent = `Score: ${quizState.score}`;
            }

            if (expText && explanationEl) {
                expText.textContent = q.explanation;
                explanationEl.style.display = 'block';
            }

            if (nextBtn) nextBtn.style.display = 'inline-block';
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                quizState.currentIndex += 1;
                if (quizState.currentIndex < QUIZ_QUESTIONS.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            });
        }

        function showResults() {
            if (quizBox) quizBox.style.display = 'none';
            if (resultCard) resultCard.style.display = 'block';
            if (finalScoreText) {
                finalScoreText.textContent = `You scored ${quizState.score} out of ${QUIZ_QUESTIONS.length}!`;
            }
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                quizState.currentIndex = 0;
                quizState.score = 0;
                quizState.answered = false;
                if (resultCard) resultCard.style.display = 'none';
                if (quizBox) quizBox.style.display = 'block';
                loadQuestion();
            });
        }

        loadQuestion();
    }

    // FAQ Accordion
    function initFaqs() {
        const items = document.querySelectorAll('.faq-item');
        items.forEach(item => {
            const btn = item.querySelector('.faq-question');
            if (btn) {
                btn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    items.forEach(i => i.classList.remove('active'));
                    if (!isActive) item.classList.add('active');
                });
            }
        });
    }

    // Theme Toggle
    function initThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) return;
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Mobile Navigation Toggle
    function initMobileMenu() {
        const toggleBtn = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener('click', () => {
            const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
        });
    }

    // Register with Journey Search Index
    function registerJourneySearch() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/national-awards-timeline-quiz-hub/index.html', [
                {
                    id: 'national-awards-quiz-hub',
                    title: 'Indian National Awards Timeline & Interactive Quiz Hub',
                    description: 'Explore award timelines, compare categories, view precedence hierarchy, and test your knowledge.',
                    link: 'frontend/national-awards-timeline-quiz-hub/index.html'
                }
            ]);
        }
    }
})();

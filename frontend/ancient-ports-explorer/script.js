(function() {
    'use strict';

    // Quiz Questions Data
    const quizData = [
        {
            question: "Which is India's highest civilian honour?",
            options: ["Padma Vibhushan", "Bharat Ratna", "Param Vir Chakra", "Khel Ratna"],
            answer: 1,
            explanation: "Bharat Ratna, instituted in 1954, is India's highest civilian honour awarded for exceptional service or performance of the highest order."
        },
        {
            question: "In which year were the Bharat Ratna and Padma Awards instituted?",
            options: ["1947", "1950", "1954", "1962"],
            answer: 2,
            explanation: "The Bharat Ratna and Padma Awards were instituted on 2 January 1954 by President Dr. Rajendra Prasad."
        },
        {
            question: "Which of the following is India's highest military decoration for wartime bravery?",
            options: ["Ashoka Chakra", "Vir Chakra", "Param Vir Chakra", "Shaurya Chakra"],
            answer: 2,
            explanation: "Param Vir Chakra is India's highest military award, given for displaying supreme valour in the presence of the enemy."
        },
        {
            question: "The Shanti Swarup Bhatnagar Prize is awarded for outstanding contribution in which field?",
            options: ["Literature", "Sports", "Science & Technology", "Performing Arts"],
            answer: 2,
            explanation: "Named after CSIR's founder Dr. Shanti Swarup Bhatnagar, this prize honours outstanding Indian scientific research."
        },
        {
            question: "Which award is given for outstanding literary work across 24 Indian languages?",
            options: ["Sahitya Akademi Award", "Sangeet Natak Akademi Award", "Bal Puraskar", "Dronacharya Award"],
            answer: 0,
            explanation: "The Sahitya Akademi Award is conferred annually on outstanding books in 24 major Indian languages recognized by the National Academy of Letters."
        }
    ];

    let currentQuizIndex = 0;
    let quizScore = 0;

    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initSearchAndFilter();
        initQuiz();
    });

    function initNavigation() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !expanded);
                navMenu.classList.toggle('active');
            });
        }
    }

    function initSearchAndFilter() {
        const searchInput = document.getElementById('award-search-input');
        const clearBtn = document.getElementById('clear-search-btn');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const awardCards = document.querySelectorAll('.award-card');
        const noResultsMsg = document.getElementById('no-results-message');

        let activeCategory = 'all';

        function filterCards() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            if (clearBtn) {
                clearBtn.style.display = query.length > 0 ? 'block' : 'none';
            }

            awardCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const cardText = card.textContent.toLowerCase();

                const matchesCategory = (activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase());
                const matchesQuery = query === '' || cardText.includes(query);

                if (matchesCategory && matchesQuery) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResultsMsg) {
                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterCards);
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                searchInput.value = '';
                filterCards();
                searchInput.focus();
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                activeCategory = this.getAttribute('data-category') || 'all';
                filterCards();
            });
        });
    }

    function initQuiz() {
        const questionEl = document.getElementById('quiz-question');
        const optionsEl = document.getElementById('quiz-options');
        const explanationEl = document.getElementById('quiz-explanation');
        const progressEl = document.getElementById('quiz-progress');
        const scoreEl = document.getElementById('quiz-score');
        const nextBtn = document.getElementById('quiz-next-btn');
        const quizContainer = document.getElementById('quiz-container');
        const quizResults = document.getElementById('quiz-results');
        const finalScoreEl = document.getElementById('quiz-final-score');
        const restartBtn = document.getElementById('quiz-restart-btn');

        if (!questionEl || !optionsEl) return;

        function loadQuestion() {
            const q = quizData[currentQuizIndex];
            progressEl.textContent = `Question ${currentQuizIndex + 1} of ${quizData.length}`;
            scoreEl.textContent = `Score: ${quizScore}`;
            questionEl.textContent = q.question;

            optionsEl.innerHTML = '';
            explanationEl.style.display = 'none';
            explanationEl.textContent = '';
            nextBtn.style.display = 'none';

            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option-btn';
                btn.textContent = opt;
                btn.addEventListener('click', function() {
                    selectAnswer(idx);
                });
                optionsEl.appendChild(btn);
            });
        }

        function selectAnswer(selectedIdx) {
            const q = quizData[currentQuizIndex];
            const optionBtns = optionsEl.querySelectorAll('.quiz-option-btn');

            optionBtns.forEach((btn, idx) => {
                btn.disabled = true;
                if (idx === q.answer) {
                    btn.classList.add('correct');
                } else if (idx === selectedIdx) {
                    btn.classList.add('incorrect');
                }
            });

            if (selectedIdx === q.answer) {
                quizScore++;
                scoreEl.textContent = `Score: ${quizScore}`;
            }

            explanationEl.textContent = q.explanation;
            explanationEl.style.display = 'block';

            nextBtn.style.display = 'inline-block';
        }

        nextBtn.addEventListener('click', function() {
            currentQuizIndex++;
            if (currentQuizIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });

        function showResults() {
            quizContainer.style.display = 'none';
            quizResults.style.display = 'block';
            finalScoreEl.textContent = `You scored ${quizScore} out of ${quizData.length}!`;
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', function() {
                currentQuizIndex = 0;
                quizScore = 0;
                quizResults.style.display = 'none';
                quizContainer.style.display = 'block';
                loadQuestion();
            });
        }

        loadQuestion();
    }
})();

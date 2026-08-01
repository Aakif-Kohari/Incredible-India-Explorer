/* ==========================================================================
   FOOD QUIZ GAME MODULE
   ========================================================================== */

function initQuiz() {
    const quizContainer = document.getElementById('quiz');
    const introScreen = document.getElementById('quiz-intro-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultScreen = document.getElementById('quiz-result-screen');

    const startBtn = document.getElementById('btn-start-quiz');
    const restartBtn = document.getElementById('btn-restart-quiz');
    const heroStartBtn = document.getElementById('btn-start-quiz-hero');

    const progressFill = document.getElementById('quiz-progress-fill');
    const questionText = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options') || document.getElementById('quiz-options-grid');
    const resultIcon = document.getElementById('quiz-result-icon');
    const resultMsg = document.getElementById('quiz-result-message');

    if (!introScreen || typeof quizQuestions === 'undefined') return;

    if (introScreen.dataset.listenerBound === "true") return;
    introScreen.dataset.listenerBound = "true";

    let currentQuestionIndex = 0;
    let score = 0;
    let locked = false;

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', startQuiz);

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', () => {
            if (quizContainer) {
                quizContainer.scrollIntoView({ behavior: 'smooth' });
            }
            startQuiz();
        });
    }

    function startQuiz() {
        if (!introScreen) return;
        currentQuestionIndex = 0;
        score = 0;
        locked = false;

        introScreen.classList.add('hidden');
        if (resultScreen) resultScreen.classList.add('hidden');
        if (questionScreen) questionScreen.classList.remove('hidden');

        loadQuestion();
    }

    function loadQuestion() {
        locked = false;
        const q = quizQuestions[currentQuestionIndex];
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        if (progressFill) progressFill.style.width = ((currentQuestionIndex + 1) / quizQuestions.length * 100) + '%';
        if (questionText) questionText.innerText = q.question;

        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            shuffledOptions.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.addEventListener('click', () => selectOption(btn, opt));
                optionsContainer.appendChild(btn);
            });
        }
    }

    function selectOption(clickedBtn, selectedVal) {
        if (locked) return;
        locked = true;

        const q = quizQuestions[currentQuestionIndex];
        const isCorrect = (selectedVal === q.answer);

        const optionBtns = optionsContainer ? optionsContainer.querySelectorAll('.option-btn') : [];
        optionBtns.forEach(btn => {
            btn.classList.add('disabled');
            if (btn.innerText === q.answer) {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            clickedBtn.classList.add('correct');
            score++;
        } else {
            clickedBtn.classList.add('wrong');
        }

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1200);
    }

    function showResults() {
        if (questionScreen) questionScreen.classList.add('hidden');
        if (resultScreen) resultScreen.classList.remove('hidden');

        if (resultIcon) {
            if (score === quizQuestions.length) {
                resultIcon.innerText = '🎉';
            } else if (score >= Math.ceil(quizQuestions.length * 0.6)) {
                resultIcon.innerText = '🎉';
            } else {
                resultIcon.innerText = '🍛';
            }
        }

        if (resultMsg) {
            if (score === quizQuestions.length) {
                resultMsg.innerText = `Incredible Mastermind! 🥳 You scored a perfect ${score}/${quizQuestions.length}! You are an expert on India's vast culinary heritage!`;
            } else if (score >= Math.ceil(quizQuestions.length * 0.6)) {
                resultMsg.innerText = `Great score! 👍 You got ${score}/${quizQuestions.length} correct. You have a solid grasp of Indian cuisine!`;
            } else {
                resultMsg.innerText = `You scored ${score}/${quizQuestions.length}. Keep exploring the interactive map and food lists to discover more flavors! 🍛`;
            }
        }
    }
}

window.initQuiz = initQuiz;

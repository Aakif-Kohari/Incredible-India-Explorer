// Spice Identifier Quiz Script
// Encapsulated in IIFE to prevent global namespace pollution

(function () {
    'use strict';

    // Verify Data exists
    if (typeof window.SPICE_QUIZ_DATA === 'undefined') {
        console.error('Quiz data not loaded!');
        return;
    }

    // --- Private State ---
    const allQuestions = window.SPICE_QUIZ_DATA;
    let shuffledQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;

    // --- DOM Elements ---
    // Views
    const viewStart = document.getElementById('view-start');
    const viewQuestion = document.getElementById('view-question');
    const viewFeedback = document.getElementById('view-feedback');
    const viewResults = document.getElementById('view-results');

    // Start & General
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const themeBtn = document.getElementById('theme-toggle');

    // Question View
    const progressText = document.getElementById('progress-text');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const scoreDisplay = document.getElementById('current-score');
    
    const spiceImageContainer = document.getElementById('spice-image-container');
    const historicalClue = document.getElementById('historical-clue');
    const culinaryClue = document.getElementById('culinary-clue');
    
    const quizForm = document.getElementById('quiz-form');
    const optionsContainer = document.getElementById('options-container');
    const submitBtn = document.getElementById('submit-btn');

    // Feedback View
    const feedbackCard = document.getElementById('feedback-card');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackSubtitle = document.getElementById('feedback-subtitle');
    const educationalFact = document.getElementById('educational-fact');
    const pointAwarded = document.getElementById('point-awarded');
    const nextBtn = document.getElementById('next-btn');

    // Result View
    const finalScore = document.getElementById('final-score');
    const performanceMessage = document.getElementById('performance-message');

    // --- Theme Logic ---
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

    // --- Core Logic ---

    // Utility: Switch views
    function showView(viewElement) {
        const views = [viewStart, viewQuestion, viewFeedback, viewResults];
        views.forEach(v => {
            if (v === viewElement) {
                v.classList.remove('hidden');
                v.classList.add('active');
            } else {
                v.classList.add('hidden');
                v.classList.remove('active');
            }
        });
    }

    // Utility: Shuffle array
    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function initQuiz() {
        shuffledQuestions = shuffleArray(allQuestions);
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        
        scoreDisplay.textContent = score;
        showView(viewQuestion);
        renderQuestion();
    }

    function renderQuestion() {
        const q = shuffledQuestions[currentQuestionIndex];
        
        // Update Progress
        const total = shuffledQuestions.length;
        const current = currentQuestionIndex + 1;
        progressText.textContent = `Question ${current} of ${total}`;
        progressBarFill.style.width = `${(current / total) * 100}%`;

        // Reset Form
        selectedAnswer = null;
        submitBtn.disabled = true;
        optionsContainer.innerHTML = '';

        // Populate Content
        spiceImageContainer.innerHTML = q.image;
        spiceImageContainer.style.backgroundColor = q.imageBg;
        spiceImageContainer.style.color = q.imageColor;

        historicalClue.textContent = q.historicalClue;
        culinaryClue.textContent = q.culinaryClue;

        // Populate Options (shuffled)
        const shuffledOptions = shuffleArray(q.options);
        shuffledOptions.forEach((opt, idx) => {
            const id = `opt-${idx}`;
            const label = document.createElement('label');
            label.className = 'option-label';
            label.setAttribute('for', id);

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'spice-option';
            input.id = id;
            input.value = opt;
            input.className = 'option-input';
            
            // Handle Selection styling
            input.addEventListener('change', (e) => {
                // Remove selected class from all labels
                document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                // Add to this label
                label.classList.add('selected');
                
                selectedAnswer = e.target.value;
                submitBtn.disabled = false;
            });

            const span = document.createElement('span');
            span.className = 'option-text';
            span.textContent = opt;

            label.appendChild(input);
            label.appendChild(span);
            optionsContainer.appendChild(label);
        });
    }

    function handleAnswerSubmit(e) {
        e.preventDefault();
        if (!selectedAnswer) return;

        const q = shuffledQuestions[currentQuestionIndex];
        const isCorrect = (selectedAnswer === q.answer);

        if (isCorrect) {
            score++;
            scoreDisplay.textContent = score;
            feedbackCard.className = 'card feedback-card center-card correct';
            feedbackTitle.textContent = 'Correct!';
            feedbackSubtitle.textContent = `The answer is ${q.answer}.`;
            pointAwarded.style.display = 'block';
        } else {
            feedbackCard.className = 'card feedback-card center-card incorrect';
            feedbackTitle.textContent = 'Incorrect';
            feedbackSubtitle.textContent = `The correct answer is ${q.answer}.`;
            pointAwarded.style.display = 'none';
        }

        educationalFact.textContent = q.fact;
        
        showView(viewFeedback);
    }

    function handleNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            renderQuestion();
            showView(viewQuestion);
        } else {
            showFinalResults();
        }
    }

    function showFinalResults() {
        const total = shuffledQuestions.length;
        finalScore.textContent = `${score} / ${total}`;

        if (score === total) {
            performanceMessage.textContent = 'Flawless! You are a true Spice Master.';
        } else if (score >= total / 2) {
            performanceMessage.textContent = 'Great job! You know your Indian spices well.';
        } else {
            performanceMessage.textContent = 'Good try! Keep exploring the world of spices.';
        }

        showView(viewResults);
    }

    // --- Event Listeners ---
    startBtn.addEventListener('click', initQuiz);
    restartBtn.addEventListener('click', initQuiz);
    quizForm.addEventListener('submit', handleAnswerSubmit);
    nextBtn.addEventListener('click', handleNextQuestion);

})();

/**
 * State Flag & Emblem Quiz - Game Logic
 * Encapsulated via IIFE to prevent global namespace pollution.
 */

(function () {
    // --- Game State Variables ---
    let currentQuestionIndex = 0;
    let score = 0;
    let streak = 0;
    let selectedDifficulty = 'medium';
    let selectedType = 'mixed';
    let activeQuestions = [];
    let correctCount = 0;
    
    // --- DOM Elements ---
    const dom = {
        heroSection: document.getElementById('hero-section'),
        mainQuiz: document.getElementById('main-quiz'),
        resultsSection: document.getElementById('results-section'),
        
        quizTypeSelect: document.getElementById('quiz-type'),
        difficultySelect: document.getElementById('quiz-difficulty'),
        startBtn: document.getElementById('start-quiz-btn'),
        
        progressText: document.getElementById('question-progress-text'),
        progressBar: document.getElementById('progress-bar'),
        scoreDisplay: document.getElementById('score-display'),
        streakDisplay: document.getElementById('streak-display'),
        
        questionCategory: document.getElementById('question-category'),
        questionText: document.getElementById('question-text'),
        imageContainer: document.getElementById('image-container'),
        optionsGrid: document.getElementById('options-grid'),
        
        feedbackPanel: document.getElementById('feedback-panel'),
        feedbackTitle: document.getElementById('feedback-title'),
        feedbackStateInfo: document.getElementById('feedback-state-info'),
        feedbackExplanation: document.getElementById('feedback-explanation'),
        nextQuestionBtn: document.getElementById('next-question-btn'),
        
        finalScore: document.getElementById('final-score'),
        finalAccuracy: document.getElementById('final-accuracy'),
        finalMessage: document.getElementById('final-message'),
        playAgainBtn: document.getElementById('play-again-btn')
    };

    // --- Helper Functions ---
    
    /** Shuffles an array in place using Fisher-Yates */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /** Prepares the question set based on selected filters */
    function prepareQuestions() {
        const rawData = window.QUIZ_DATA || [];
        
        // Filter by type
        let filtered = rawData;
        if (selectedType !== 'mixed') {
            filtered = rawData.filter(q => q.category === selectedType);
        }
        
        // If not enough questions after filtering, fallback to all data
        if (filtered.length < 3) {
            filtered = rawData;
        }

        // Shuffle questions
        shuffleArray(filtered);
        
        // Apply difficulty scaling (e.g. limiting number of questions, or adjusting options later)
        // For simplicity, we just take 10 questions (or all if fewer)
        activeQuestions = filtered.slice(0, 10);
    }

    /** Renders the current question to the DOM */
    function renderQuestion() {
        if (currentQuestionIndex >= activeQuestions.length) {
            showResults();
            return;
        }

        const question = activeQuestions[currentQuestionIndex];
        
        // Update headers
        dom.progressText.textContent = `Question ${currentQuestionIndex + 1} of ${activeQuestions.length}`;
        dom.progressBar.style.width = `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%`;
        dom.scoreDisplay.textContent = score;
        dom.streakDisplay.textContent = streak;
        
        dom.questionCategory.textContent = question.category;
        
        // Question text logic based on category
        switch(question.category) {
            case 'emblem':
                dom.questionText.textContent = "Which state does this emblem belong to?";
                break;
            case 'animal':
                dom.questionText.textContent = "Which state has this as its official animal?";
                break;
            case 'bird':
                dom.questionText.textContent = "Which state has this as its official bird?";
                break;
            case 'tree':
                dom.questionText.textContent = "Which state has this as its official tree?";
                break;
            default:
                dom.questionText.textContent = "Identify the state for this symbol:";
        }

        // Setup image (Remove placeholder styling when image is present)
        dom.imageContainer.innerHTML = '';
        dom.imageContainer.classList.remove('placeholder-image');
        const img = document.createElement('img');
        img.src = question.image;
        img.alt = `Symbol for ${question.category}`;
        img.onerror = () => {
            dom.imageContainer.classList.add('placeholder-image');
            img.style.display = 'none';
        };
        dom.imageContainer.appendChild(img);

        // Setup Options
        dom.optionsGrid.innerHTML = '';
        let currentOptions = [...question.options];
        
        // Adjust options based on difficulty if desired
        // E.g., for easy, maybe fewer options, for hard, more distracting options
        // We will just shuffle the 4 options for now.
        shuffleArray(currentOptions);
        
        currentOptions.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.setAttribute('aria-label', `Select option ${opt}`);
            // Accessibility keyboard support is native on buttons
            btn.addEventListener('click', () => handleOptionSelection(btn, opt, question));
            dom.optionsGrid.appendChild(btn);
        });

        // Hide feedback
        dom.feedbackPanel.classList.add('hidden');
        dom.feedbackPanel.classList.remove('success', 'error');
        
        // Focus first option for keyboard accessibility
        setTimeout(() => {
            if (dom.optionsGrid.firstChild) dom.optionsGrid.firstChild.focus();
        }, 100);
    }

    /** Handles option selection and scoring */
    function handleOptionSelection(selectedBtn, selectedText, question) {
        // Disable all buttons to prevent multiple clicks
        const allBtns = dom.optionsGrid.querySelectorAll('.option-btn');
        allBtns.forEach(btn => btn.disabled = true);

        const isCorrect = (selectedText === question.state);
        
        if (isCorrect) {
            score += 10;
            streak += 1;
            correctCount += 1;
            selectedBtn.classList.add('correct');
            
            dom.feedbackTitle.textContent = "Correct!";
            dom.feedbackPanel.classList.add('success');
        } else {
            streak = 0;
            selectedBtn.classList.add('incorrect');
            
            // Highlight the correct option
            allBtns.forEach(btn => {
                if (btn.textContent === question.state) {
                    btn.classList.add('correct');
                }
            });
            
            dom.feedbackTitle.textContent = "Incorrect";
            dom.feedbackPanel.classList.add('error');
        }
        
        // Update DOM stats immediately
        dom.scoreDisplay.textContent = score;
        dom.streakDisplay.textContent = streak;

        // Show feedback panel
        dom.feedbackStateInfo.textContent = `This is a symbol of ${question.state}.`;
        dom.feedbackExplanation.textContent = question.explanation;
        dom.feedbackPanel.classList.remove('hidden');
        
        // Move focus to Next button for accessibility
        dom.nextQuestionBtn.focus();
    }

    /** Transitions to the results screen */
    function showResults() {
        dom.mainQuiz.classList.add('hidden');
        dom.resultsSection.classList.remove('hidden');
        
        const total = activeQuestions.length;
        const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
        
        dom.resultsTitle.textContent = accuracy >= 80 ? "Excellent!" : (accuracy >= 50 ? "Good Job!" : "Keep Practicing!");
        dom.finalScore.textContent = `${score} / ${total * 10}`;
        dom.finalAccuracy.textContent = `${accuracy}%`;
        dom.finalMessage.textContent = `You correctly identified ${correctCount} out of ${total} state symbols.`;
        
        dom.playAgainBtn.focus();
    }

    /** Resets the game state and starts over */
    function resetGame() {
        currentQuestionIndex = 0;
        score = 0;
        streak = 0;
        correctCount = 0;
        
        selectedType = dom.quizTypeSelect.value;
        selectedDifficulty = dom.difficultySelect.value;
        
        prepareQuestions();
        
        dom.heroSection.classList.add('hidden');
        dom.resultsSection.classList.add('hidden');
        dom.mainQuiz.classList.remove('hidden');
        
        renderQuestion();
    }

    // --- Initialization and Event Listeners ---
    function init() {
        dom.startBtn.addEventListener('click', resetGame);
        
        dom.nextQuestionBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            renderQuestion();
        });
        
        dom.playAgainBtn.addEventListener('click', () => {
            dom.resultsSection.classList.add('hidden');
            dom.heroSection.classList.remove('hidden');
            dom.startBtn.focus();
        });
    }

    // Start
    init();

})();

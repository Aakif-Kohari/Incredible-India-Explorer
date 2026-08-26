document.addEventListener("DOMContentLoaded", () => {
    // State
    let score = 0;
    let totalAnswered = 0;
    let currentQuestion = null;
    let currentDifficulty = "easy";
    
    // Elements
    const diffSelect = document.getElementById("difficulty-select");
    const brandContainer = document.getElementById("brand-image-container");
    const optionsGrid = document.getElementById("options-grid");
    const resultBanner = document.getElementById("result-banner");
    const infoCard = document.getElementById("brand-info-card");
    const scoreCorrect = document.getElementById("score-correct");
    const scoreTotal = document.getElementById("score-total");
    const resetBtn = document.getElementById("reset-score-btn");
    const nextBtn = document.getElementById("next-question-btn");

    // Load Score
    const savedScore = localStorage.getItem("brandQuizScore");
    const savedTotal = localStorage.getItem("brandQuizTotal");
    if (savedScore !== null && savedTotal !== null) {
        score = parseInt(savedScore, 10);
        totalAnswered = parseInt(savedTotal, 10);
        updateScoreDisplay();
    }

    // Handlers
    diffSelect.addEventListener("change", (e) => {
        currentDifficulty = e.target.value;
        loadRandomQuestion();
    });

    resetBtn.addEventListener("click", () => {
        score = 0;
        totalAnswered = 0;
        saveScore();
        updateScoreDisplay();
        loadRandomQuestion();
    });

    nextBtn.addEventListener("click", () => {
        loadRandomQuestion();
    });

    function updateScoreDisplay() {
        scoreCorrect.textContent = score;
        scoreTotal.textContent = totalAnswered;
    }

    function saveScore() {
        localStorage.setItem("brandQuizScore", score.toString());
        localStorage.setItem("brandQuizTotal", totalAnswered.toString());
    }

    function shuffleOptions(options) {
        const arr = [...options];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function loadRandomQuestion() {
        // Hide info and banners
        infoCard.classList.add("hidden");
        resultBanner.classList.add("hidden");
        
        // Pick random question (prevent back-to-back duplicates if possible)
        let newQuestion = currentQuestion;
        while (newQuestion === currentQuestion && brandQuestions.length > 1) {
            newQuestion = brandQuestions[Math.floor(Math.random() * brandQuestions.length)];
        }
        currentQuestion = newQuestion;

        // Render SVG based on difficulty
        brandContainer.innerHTML = currentQuestion.svg;
        
        brandContainer.classList.remove("silhouette-mode");
        brandContainer.style.filter = "none";

        if (currentDifficulty === "easy") {
            // Full image
        } else if (currentDifficulty === "medium") {
            // Blurred or Silhouette
            brandContainer.style.filter = "blur(8px)";
        } else if (currentDifficulty === "hard") {
            brandContainer.classList.add("silhouette-mode");
            brandContainer.style.filter = "none";
        }
        
        renderOptions(shuffleOptions(currentQuestion.options));
        
        // Return focus to first option for accessibility
        const firstOption = optionsGrid.querySelector(".option-btn");
        if(firstOption) {
            firstOption.focus();
        }
    }

    function renderOptions(options) {
        optionsGrid.innerHTML = "";
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            btn.setAttribute("aria-label", `Select brand ${opt}`);
            btn.addEventListener("click", () => handleAnswer(opt, btn));
            optionsGrid.appendChild(btn);
        });
    }

    function handleAnswer(selectedAnswer, btnElement) {
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        
        // Disable all buttons
        const allBtns = optionsGrid.querySelectorAll(".option-btn");
        allBtns.forEach(b => b.disabled = true);

        // Highlight chosen and correct answers
        if (isCorrect) {
            btnElement.classList.add("selected-correct");
            resultBanner.textContent = "✅ Correct Answer!";
            resultBanner.className = "result-banner correct";
            score++;
        } else {
            btnElement.classList.add("selected-incorrect");
            resultBanner.textContent = "❌ Incorrect Answer";
            resultBanner.className = "result-banner incorrect";
            
            // Highlight the correct one
            allBtns.forEach(b => {
                if (b.textContent === currentQuestion.correctAnswer) {
                    b.classList.add("missed-correct");
                }
            });
        }

        totalAnswered++;
        saveScore();
        updateScoreDisplay();

        // Reveal Brand
        brandContainer.classList.remove("silhouette-mode");
        brandContainer.style.filter = "none";
        resultBanner.classList.remove("hidden");

        // Populate Info Card
        document.getElementById("info-name").textContent = currentQuestion.brandName;
        document.getElementById("info-explanation").innerHTML = isCorrect ? 
            `<p class="explanation success">Great job! It is indeed <strong>${currentQuestion.brandName}</strong>.</p>` : 
            `<p class="explanation error">The correct answer was <strong>${currentQuestion.brandName}</strong>.</p>`;
            
        document.getElementById("info-industry").textContent = currentQuestion.industry;
        document.getElementById("info-fact").textContent = currentQuestion.fact;
        document.getElementById("info-credit").textContent = currentQuestion.credit;
        
        infoCard.classList.remove("hidden");
        
        // Accessibility focus on result banner
        resultBanner.focus();
    }

    // Start game
    loadRandomQuestion();
});

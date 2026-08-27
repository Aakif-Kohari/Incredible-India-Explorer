// Simulating SVGs for trophies since we don't have images
// Each trophy has an SVG string
const svgCup = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 20 L80 20 L75 50 Q50 70 50 80 L50 90 L30 90 L30 95 L70 95 L70 90 L50 90 L50 80 Q50 70 25 50 Z" fill="#fbbf24"/><path d="M20 20 C10 20 10 40 25 40 M80 20 C90 20 90 40 75 40" fill="none" stroke="#fbbf24" stroke-width="5"/></svg>`;
const svgShield = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 20 L80 20 L80 50 C80 80 50 95 50 95 C50 95 20 80 20 50 Z" fill="#94a3b8"/><circle cx="50" cy="50" r="15" fill="#facc15"/></svg>`;
const svgBowl = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 40 L90 40 Q50 90 50 90 Z" fill="#e2e8f0"/><rect x="40" y="90" width="20" height="5" fill="#94a3b8"/></svg>`;
const svgStatue = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="80" width="20" height="15" fill="#64748b"/><path d="M45 20 L55 20 L60 80 L40 80 Z" fill="#fbbf24"/><circle cx="50" cy="15" r="10" fill="#fbbf24"/></svg>`;

const trophyQuestions = [
    {
        id: "ranji",
        trophyName: "Ranji Trophy",
        sport: "Cricket",
        tournament: "Ranji Trophy Championship",
        svg: svgCup,
        options: ["Ranji Trophy", "Irani Cup", "Duleep Trophy", "Deodhar Trophy"],
        correctAnswer: "Ranji Trophy",
        credit: "Official BCCI Media Resources"
    },
    {
        id: "santosh",
        trophyName: "Santosh Trophy",
        sport: "Football",
        tournament: "National Football Championship",
        svg: svgShield,
        options: ["Federation Cup", "Durand Cup", "Santosh Trophy", "Super Cup"],
        correctAnswer: "Santosh Trophy",
        credit: "AIFF Media Resources"
    },
    {
        id: "dhyanchand",
        trophyName: "Dhyan Chand Award",
        sport: "Multiple (Lifetime Achievement)",
        tournament: "National Sports Awards",
        svg: svgStatue,
        options: ["Arjuna Award", "Dronacharya Award", "Khel Ratna", "Dhyan Chand Award"],
        correctAnswer: "Dhyan Chand Award",
        credit: "Ministry of Youth Affairs and Sports"
    },
    {
        id: "durand",
        trophyName: "Durand Cup",
        sport: "Football",
        tournament: "Durand Football Tournament",
        svg: svgBowl,
        options: ["Santosh Trophy", "Durand Cup", "I-League Trophy", "Rovers Cup"],
        correctAnswer: "Durand Cup",
        credit: "Durand Football Tournament Society"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // State
    let score = 0;
    let totalAnswered = 0;
    let currentQuestion = null;
    let currentDifficulty = "easy";
    
    // Elements
    const diffSelect = document.getElementById("difficulty-select");
    const trophyContainer = document.getElementById("trophy-image-container");
    const optionsGrid = document.getElementById("options-grid");
    const resultBanner = document.getElementById("result-banner");
    const infoCard = document.getElementById("trophy-info-card");
    const scoreCorrect = document.getElementById("score-correct");
    const scoreTotal = document.getElementById("score-total");
    const resetBtn = document.getElementById("reset-score-btn");
    const nextBtn = document.getElementById("next-question-btn");

    // Load Score
    const savedScore = localStorage.getItem("sportsQuizScore");
    const savedTotal = localStorage.getItem("sportsQuizTotal");
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
    });

    nextBtn.addEventListener("click", () => {
        loadRandomQuestion();
    });

    function updateScoreDisplay() {
        scoreCorrect.textContent = score;
        scoreTotal.textContent = totalAnswered;
    }

    function saveScore() {
        localStorage.setItem("sportsQuizScore", score.toString());
        localStorage.setItem("sportsQuizTotal", totalAnswered.toString());
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
        while (newQuestion === currentQuestion && trophyQuestions.length > 1) {
            newQuestion = trophyQuestions[Math.floor(Math.random() * trophyQuestions.length)];
        }
        currentQuestion = newQuestion;

        // Render SVG based on difficulty
        trophyContainer.innerHTML = currentQuestion.svg;
        
        if (currentDifficulty === "easy") {
            trophyContainer.classList.remove("silhouette-mode");
            renderOptions(shuffleOptions(currentQuestion.options));
        } else if (currentDifficulty === "medium") {
            trophyContainer.classList.add("silhouette-mode");
            renderOptions(shuffleOptions(currentQuestion.options));
        } else if (currentDifficulty === "hard") {
            trophyContainer.classList.add("silhouette-mode");
            // Hard mode might have more confusing options, but we just shuffle standard options for now
            renderOptions(shuffleOptions(currentQuestion.options));
        }
    }

    function renderOptions(options) {
        optionsGrid.innerHTML = "";
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            btn.setAttribute("aria-label", `Choose ${opt}`);
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

        // Reveal Trophy
        trophyContainer.classList.remove("silhouette-mode");
        resultBanner.classList.remove("hidden");

        // Populate Info Card
        document.getElementById("info-name").textContent = currentQuestion.trophyName;
        document.getElementById("info-sport").textContent = currentQuestion.sport;
        document.getElementById("info-tournament").textContent = currentQuestion.tournament;
        document.getElementById("info-credit").textContent = currentQuestion.credit;
        
        infoCard.classList.remove("hidden");
    }

    // Start game
    loadRandomQuestion();
});

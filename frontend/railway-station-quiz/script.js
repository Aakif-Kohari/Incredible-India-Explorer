(function() {
    'use strict';

    // ---------- Station Data (SVG illustrations embedded) ----------
    const stationsData = [
        {
            id: 'cst',
            name: 'Chhatrapati Shivaji Maharaj Terminus (CST)',
            difficulty: 'easy',
            clueType: 'Architecture',
            clue: 'This UNESCO World Heritage site features Victorian Gothic Revival architecture with a massive dome and pointed arches.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#FFF5E6"/>
                <rect x="20" y="50" width="260" height="90" fill="#C49A6C"/>
                <rect x="70" y="20" width="160" height="35" fill="#B07D4B"/>
                <polygon points="70,20 150,0 230,20" fill="#8B5E3C"/>
                <circle cx="150" cy="45" r="12" fill="#FFD700"/>
                <rect x="90" y="55" width="20" height="30" fill="#5C3A1E" rx="5"/>
                <rect x="130" y="55" width="20" height="30" fill="#5C3A1E" rx="5"/>
                <rect x="170" y="55" width="20" height="30" fill="#5C3A1E" rx="5"/>
                <rect x="50" y="100" width="200" height="6" fill="#4A3728"/>
            </svg>`,
            options: ['Chhatrapati Shivaji Maharaj Terminus (CST)', 'New Delhi Railway Station', 'Howrah Junction', 'Chennai Central']
        },
        {
            id: 'howrah',
            name: 'Howrah Junction',
            difficulty: 'easy',
            clueType: 'History',
            clue: 'Opened in 1854, this is the oldest and busiest railway station in India, located on the banks of the Hooghly River.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#E8F0FE"/>
                <rect x="30" y="60" width="240" height="70" fill="#D84315"/>
                <rect x="60" y="35" width="180" height="30" fill="#BF360C"/>
                <polygon points="60,35 150,10 240,35" fill="#8D6E63"/>
                <rect x="90" y="70" width="15" height="25" fill="#FFE082" rx="3"/>
                <rect x="120" y="70" width="15" height="25" fill="#FFE082" rx="3"/>
                <rect x="150" y="70" width="15" height="25" fill="#FFE082" rx="3"/>
                <rect x="180" y="70" width="15" height="25" fill="#FFE082" rx="3"/>
            </svg>`,
            options: ['Howrah Junction', 'Sealdah', 'New Delhi', 'Mumbai Central']
        },
        {
            id: 'newdelhi',
            name: 'New Delhi Railway Station',
            difficulty: 'easy',
            clueType: 'Architecture',
            clue: 'This station features a modern façade with red sandstone and a large clock tower, serving as the capital’s main rail hub.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#F5F5F5"/>
                <rect x="40" y="50" width="220" height="80" fill="#B71C1C"/>
                <rect x="100" y="20" width="100" height="35" fill="#8B0000"/>
                <circle cx="150" cy="35" r="15" fill="#FFFFFF" stroke="#333" stroke-width="2"/>
                <circle cx="150" cy="35" r="2" fill="#000"/>
                <line x1="150" y1="20" x2="150" y2="28" stroke="#000" stroke-width="2"/>
                <rect x="80" y="90" width="20" height="20" fill="#FFE082" rx="3"/>
                <rect x="130" y="90" width="20" height="20" fill="#FFE082" rx="3"/>
                <rect x="180" y="90" width="20" height="20" fill="#FFE082" rx="3"/>
            </svg>`,
            options: ['New Delhi Railway Station', 'Old Delhi Railway Station', 'Hazrat Nizamuddin', 'Anand Vihar Terminal']
        },
        {
            id: 'chennai',
            name: 'Chennai Central',
            difficulty: 'easy',
            clueType: 'History',
            clue: 'Built in 1873, this station’s red brick facade and clock tower are landmarks of Tamil Nadu’s capital.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#FFF3E0"/>
                <rect x="30" y="50" width="240" height="80" fill="#D84315"/>
                <rect x="80" y="20" width="140" height="35" fill="#BF360C"/>
                <circle cx="150" cy="35" r="10" fill="#FFF" stroke="#333"/>
                <rect x="100" y="70" width="15" height="25" fill="#FFCC80"/>
                <rect x="140" y="70" width="15" height="25" fill="#FFCC80"/>
                <rect x="180" y="70" width="15" height="25" fill="#FFCC80"/>
            </svg>`,
            options: ['Chennai Central', 'Chennai Egmore', 'Bangalore City', 'Hyderabad Deccan']
        },
        {
            id: 'jaipur',
            name: 'Jaipur Junction',
            difficulty: 'medium',
            clueType: 'Architecture',
            clue: 'Inspired by Rajasthani havelis, this station features ornate jharokhas (overhanging balconies) and pink sandstone.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#FFE0E0"/>
                <rect x="40" y="50" width="220" height="80" fill="#E91E63"/>
                <rect x="60" y="25" width="40" height="30" fill="#C2185B" rx="5"/>
                <rect x="140" y="25" width="40" height="30" fill="#C2185B" rx="5"/>
                <rect x="100" y="10" width="30" height="20" fill="#AD1457" rx="5"/>
                <rect x="90" y="70" width="15" height="20" fill="#FFB6C1"/>
                <rect x="130" y="70" width="15" height="20" fill="#FFB6C1"/>
                <rect x="170" y="70" width="15" height="20" fill="#FFB6C1"/>
            </svg>`,
            options: ['Jaipur Junction', 'Jodhpur Junction', 'Udaipur City', 'Ajmer Junction']
        },
        {
            id: 'lucknow',
            name: 'Charbagh Railway Station, Lucknow',
            difficulty: 'medium',
            clueType: 'History',
            clue: 'Built in 1914, this station combines Rajput, Awadhi, and Mughal architectural styles, with a large central dome.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#F5F0E6"/>
                <rect x="30" y="50" width="240" height="80" fill="#8D6E63"/>
                <circle cx="150" cy="40" r="25" fill="#FFD54F"/>
                <rect x="60" y="20" width="20" height="35" fill="#5D4037"/>
                <rect x="220" y="20" width="20" height="35" fill="#5D4037"/>
                <rect x="100" y="70" width="15" height="25" fill="#FFF"/>
                <rect x="140" y="70" width="15" height="25" fill="#FFF"/>
                <rect x="180" y="70" width="15" height="25" fill="#FFF"/>
            </svg>`,
            options: ['Charbagh Railway Station', 'Varanasi Junction', 'Agra Cantt', 'Kanpur Central']
        },
        {
            id: 'sealdah',
            name: 'Sealdah Railway Station',
            difficulty: 'medium',
            clueType: 'Architecture',
            clue: 'This Kolkata station has a distinctive colonial-era red-brick structure with tall arched windows and a clock tower.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#FFECDD"/>
                <rect x="30" y="50" width="240" height="80" fill="#A0522D"/>
                <rect x="90" y="25" width="120" height="30" fill="#8B4513"/>
                <circle cx="150" cy="38" r="10" fill="#FFF"/>
                <rect x="80" y="70" width="15" height="20" fill="#FFE4B5"/>
                <rect x="120" y="70" width="15" height="20" fill="#FFE4B5"/>
                <rect x="160" y="70" width="15" height="20" fill="#FFE4B5"/>
            </svg>`,
            options: ['Sealdah', 'Howrah Junction', 'Kolkata Station', 'Shalimar']
        },
        {
            id: 'trivandrum',
            name: 'Thiruvananthapuram Central',
            difficulty: 'hard',
            clueType: 'History',
            clue: 'Established in 1931, this station is a fine example of Travancore architecture with a gabled roof and a prominent clock tower.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#E0F2F1"/>
                <rect x="30" y="50" width="240" height="80" fill="#00695C"/>
                <polygon points="30,50 150,10 270,50" fill="#004D40"/>
                <rect x="120" y="70" width="30" height="25" fill="#FFD54F"/>
                <circle cx="150" cy="30" r="8" fill="#FFF"/>
            </svg>`,
            options: ['Thiruvananthapuram Central', 'Ernakulam Junction', 'Kozhikode', 'Mangalore Central']
        },
        {
            id: 'gorakhpur',
            name: 'Gorakhpur Junction',
            difficulty: 'hard',
            clueType: 'Architecture',
            clue: 'Once holding the world’s longest railway platform, this station’s modern design emphasizes spacious concourses.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#F0F4C3"/>
                <rect x="20" y="50" width="260" height="80" fill="#827717"/>
                <rect x="90" y="20" width="120" height="35" fill="#9E9D24"/>
                <rect x="70" y="70" width="15" height="25" fill="#FFF59D"/>
                <rect x="110" y="70" width="15" height="25" fill="#FFF59D"/>
                <rect x="150" y="70" width="15" height="25" fill="#FFF59D"/>
                <rect x="190" y="70" width="15" height="25" fill="#FFF59D"/>
            </svg>`,
            options: ['Gorakhpur Junction', 'Patna Junction', 'Varanasi Junction', 'Lucknow NR']
        },
        {
            id: 'bikaner',
            name: 'Bikaner Junction',
            difficulty: 'hard',
            clueType: 'History',
            clue: 'Built in 1891 by the Maharaja of Bikaner, this desert station blends Rajput and Victorian styles with intricate stonework.',
            svg: `<svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="160" fill="#FFE0B2"/>
                <rect x="30" y="50" width="240" height="80" fill="#E65100"/>
                <rect x="80" y="20" width="140" height="35" fill="#BF360C"/>
                <polygon points="80,20 150,0 220,20" fill="#8D6E63"/>
                <rect x="100" y="70" width="15" height="20" fill="#FFB74D"/>
                <rect x="140" y="70" width="15" height="20" fill="#FFB74D"/>
            </svg>`,
            options: ['Bikaner Junction', 'Jaisalmer', 'Jodhpur Junction', 'Ajmer Junction']
        }
    ];

    // ---------- State ----------
    let currentDifficulty = null;
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let streak = 0;
    let selectedOption = null;
    let answered = false;
    let userAnswers = []; // store { stationId, correct }

    // ---------- DOM Elements ----------
    const landingScreen = document.getElementById('landing-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const diffButtons = document.querySelectorAll('.diff-btn');
    const startBtn = document.getElementById('start-quiz-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentQNum = document.getElementById('current-q-num');
    const totalQNum = document.getElementById('total-q-num');
    const stationImageContainer = document.getElementById('station-image-container');
    const clueTypeLabel = document.getElementById('clue-type-label');
    const clueText = document.getElementById('clue-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackContent = document.getElementById('feedback-content');
    const nextBtn = document.getElementById('next-btn');
    const currentScoreSpan = document.getElementById('current-score');
    const scoreTotalSpan = document.getElementById('score-total');
    const streakCount = document.getElementById('streak-count');
    const resultsScreenDiv = document.getElementById('results-screen');
    const finalScoreSpan = document.getElementById('final-score');
    const finalTotalSpan = document.getElementById('final-total');
    const resultsMessage = document.getElementById('results-message');
    const resultsBadge = document.getElementById('results-badge');
    const resultsBreakdown = document.getElementById('results-breakdown');
    const trophyEmoji = document.getElementById('trophy-emoji');
    const retrySameBtn = document.getElementById('retry-same-btn');
    const changeDiffBtn = document.getElementById('change-diff-btn');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const ctx = confettiCanvas.getContext('2d');

    // ---------- Helper Functions ----------
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function showScreen(screen) {
        landingScreen.classList.add('hidden');
        quizScreen.classList.add('hidden');
        resultsScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    }

    function resetQuizState() {
        currentQuestionIndex = 0;
        score = 0;
        streak = 0;
        userAnswers = [];
        answered = false;
        selectedOption = null;
        updateStreakDisplay();
        currentScoreSpan.textContent = '0';
    }

    function updateStreakDisplay() {
        streakCount.textContent = streak;
    }

    // ---------- Difficulty Selection ----------
    diffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            diffButtons.forEach(b => b.setAttribute('aria-checked', 'false'));
            btn.setAttribute('aria-checked', 'true');
            currentDifficulty = btn.dataset.difficulty;
            startBtn.disabled = false;
        });
    });

    // ---------- Start Quiz ----------
    function startQuiz() {
        resetQuizState();
        // Filter stations by difficulty, pick 4 random
        const filtered = stationsData.filter(s => s.difficulty === currentDifficulty);
        if (filtered.length === 0) return;
        currentQuestions = shuffleArray([...filtered]).slice(0, 4);
        scoreTotalSpan.textContent = currentQuestions.length;
        totalQNum.textContent = currentQuestions.length;
        showScreen(quizScreen);
        loadQuestion(0);
    }

    startBtn.addEventListener('click', startQuiz);

    // ---------- Load Question ----------
    function loadQuestion(index) {
        if (index >= currentQuestions.length) {
            showResults();
            return;
        }
        currentQuestionIndex = index;
        const q = currentQuestions[index];
        currentQNum.textContent = index + 1;
        progressBar.style.width = ((index) / currentQuestions.length) * 100 + '%';
        
        // Render SVG
        stationImageContainer.innerHTML = q.svg;
        
        // Clue
        clueTypeLabel.textContent = q.clueType + ' Clue';
        clueText.textContent = q.clue;
        
        // Options
        const shuffledOptions = shuffleArray([...q.options]);
        optionsContainer.innerHTML = '';
        shuffledOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.setAttribute('role', 'radio');
            btn.setAttribute('aria-checked', 'false');
            btn.addEventListener('click', () => handleOptionClick(btn, opt, q));
            optionsContainer.appendChild(btn);
        });
        
        // Reset feedback and next button
        feedbackArea.classList.add('hidden');
        nextBtn.classList.add('hidden');
        answered = false;
        selectedOption = null;
        
        // Enable all option buttons
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = false);
    }

    // ---------- Handle Option Click ----------
    function handleOptionClick(btn, selected, question) {
        if (answered) return;
        answered = true;
        selectedOption = selected;
        
        const isCorrect = (selected === question.name);
        
        // Update score & streak
        if (isCorrect) {
            score++;
            streak++;
            currentScoreSpan.textContent = score;
        } else {
            streak = 0;
        }
        updateStreakDisplay();
        userAnswers.push({ stationId: question.id, correct: isCorrect });
        
        // Visual feedback on buttons
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (b.textContent === question.name) {
                b.classList.add('option-btn--correct');
            } else if (b.textContent === selected && !isCorrect) {
                b.classList.add('option-btn--incorrect');
            }
            b.setAttribute('aria-checked', b.textContent === selected ? 'true' : 'false');
        });
        
        // Show feedback text
        feedbackArea.classList.remove('hidden');
        if (isCorrect) {
            feedbackContent.innerHTML = '✅ Correct! ' + question.name;
        } else {
            feedbackContent.innerHTML = '❌ Incorrect. It’s ' + question.name;
        }
        
        // Show next button
        nextBtn.classList.remove('hidden');
        
        // Update progress bar to reflect answered question
        progressBar.style.width = ((currentQuestionIndex + 1) / currentQuestions.length) * 100 + '%';
    }

    // ---------- Next Button ----------
    nextBtn.addEventListener('click', () => {
        loadQuestion(currentQuestionIndex + 1);
    });

    // ---------- Show Results ----------
    function showResults() {
        showScreen(resultsScreen);
        finalScoreSpan.textContent = score;
        finalTotalSpan.textContent = currentQuestions.length;
        
        const percentage = (score / currentQuestions.length) * 100;
        let message = '', badgeText = '', trophy = '🏆';
        
        if (percentage === 100) {
            message = 'Perfect! You’re a true Rail Fan!';
            badgeText = '🚂 Railway Legend';
            trophy = '🏆';
            launchConfetti();
        } else if (percentage >= 75) {
            message = 'Great job! You know your stations.';
            badgeText = '🌟 Station Master';
            trophy = '🥈';
        } else if (percentage >= 50) {
            message = 'Not bad! Keep exploring.';
            badgeText = '🎫 Ticket Collector';
            trophy = '🎟️';
        } else {
            message = 'Time for a rail journey to learn more!';
            badgeText = '🚉 Apprentice';
            trophy = '📚';
        }
        
        resultsMessage.textContent = message;
        resultsBadge.textContent = badgeText;
        trophyEmoji.textContent = trophy;
        
        // Breakdown
        resultsBreakdown.innerHTML = '';
        userAnswers.forEach((ans, idx) => {
            const station = stationsData.find(s => s.id === ans.stationId);
            const item = document.createElement('div');
            item.className = 'breakdown-item';
            item.innerHTML = `${ans.correct ? '✅' : '❌'} ${station ? station.name : 'Unknown'}`;
            resultsBreakdown.appendChild(item);
        });
        
        // Retry & Change
        retrySameBtn.onclick = () => {
            resetQuizState();
            startQuiz();
        };
        changeDiffBtn.onclick = () => {
            resetQuizState();
            currentDifficulty = null;
            diffButtons.forEach(b => b.setAttribute('aria-checked', 'false'));
            startBtn.disabled = true;
            showScreen(landingScreen);
        };
    }

    // ---------- Simple Confetti ----------
    function launchConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        const particles = [];
        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                r: Math.random() * 4 + 2,
                d: Math.random() * 20 + 10,
                color: `hsl(${Math.random() * 360}, 80%, 60%)`,
                tilt: Math.random() * 10 - 5
            });
        }
        let animationId;
        function draw() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            for (let p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                p.y += Math.cos(p.d) + 1 + p.r / 2;
                p.x += Math.sin(p.d * 0.5);
                if (p.y > confettiCanvas.height) p.y = -10;
            }
            animationId = requestAnimationFrame(draw);
        }
        draw();
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }, 4000);
    }

    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });

})();
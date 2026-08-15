// timeline-quiz-hub.js

document.addEventListener('DOMContentLoaded', () => {
    // Make sure fortsData is available from script.js
    if (typeof fortsData === 'undefined') {
        console.error('fortsData is not loaded.');
        return;
    }

    initTabs();
    initTimeline();
    initSearch();
    initCompare();
    initStats();
    initFAQs();
    initQuiz();
});

// ==========================================
// TABS LOGIC
// ==========================================
function initTabs() {
    const tabs = document.querySelectorAll('.hub-tab');
    const sections = document.querySelectorAll('.hub-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
}

// ==========================================
// TIMELINE LOGIC
// ==========================================
function initTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;

    // Simple chronological sort attempt based on 'built' string (very rough approximation)
    const sortedForts = [...fortsData].sort((a, b) => {
        const getYear = (str) => {
            const match = str.match(/\d{2,4}/);
            return match ? parseInt(match[0]) : 9999;
        };
        return getYear(a.built) - getYear(b.built);
    });

    let html = '';
    sortedForts.forEach((fort, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const url = fort.customUrl || '#';
        html += `
            <div class="timeline-item ${side}">
                <div class="timeline-content">
                    <span class="timeline-date">${fort.built}</span>
                    <h3 style="margin-top: 0;">${fort.name}</h3>
                    <p style="font-size: 0.9rem; color: var(--hub-text-muted);">${fort.state} | ${fort.era}</p>
                    <p style="margin-bottom: 1rem;">${fort.history.substring(0, 100)}...</p>
                    <a href="${url}" class="btn-theme-toggle" style="text-decoration:none; padding: 0.3rem 1rem; border-radius: 15px; background: var(--hub-primary); color: white; display: inline-block;">Explore</a>
                </div>
            </div>
        `;
    });

    timelineContainer.innerHTML = html;
}

// ==========================================
// SEARCH & DISCOVER LOGIC
// ==========================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const stateFilter = document.getElementById('stateFilter');
    const dynastyFilter = document.getElementById('dynastyFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput) return;

    // Populate Filters
    const states = [...new Set(fortsData.map(f => f.state))].sort();
    states.forEach(s => stateFilter.add(new Option(s, s)));

    const eras = [...new Set(fortsData.map(f => f.era))].sort();
    eras.forEach(e => dynastyFilter.add(new Option(e, e)));

    const renderResults = () => {
        const q = searchInput.value.toLowerCase();
        const state = stateFilter.value;
        const era = dynastyFilter.value;
        const type = typeFilter.value;

        const filtered = fortsData.filter(fort => {
            const matchText = fort.name.toLowerCase().includes(q) || fort.location.toLowerCase().includes(q);
            const matchState = state === 'all' || fort.state === state;
            const matchEra = era === 'all' || fort.era === era;
            
            let matchType = true;
            if (type !== 'all') {
                const searchSpace = `${fort.architecture} ${fort.history} ${fort.name}`.toLowerCase();
                if (type === 'hill') matchType = searchSpace.includes('hill');
                if (type === 'sea') matchType = searchSpace.includes('sea') || searchSpace.includes('coastal');
                if (type === 'land') matchType = searchSpace.includes('land') || searchSpace.includes('plains');
                if (type === 'unesco') matchType = searchSpace.includes('unesco');
            }

            return matchText && matchState && matchEra && matchType;
        });

        if (filtered.length === 0) {
            searchResults.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--hub-text-muted);">No forts found matching your criteria.</p>';
            return;
        }

        let html = '';
        filtered.forEach(fort => {
            const url = fort.customUrl || '#';
            html += `
                <div class="fort-card glass-panel" style="display: flex; flex-direction: column;">
                    <img src="${fort.image}" alt="${fort.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px 8px 0 0;">
                    <div style="padding: 1.5rem; flex: 1;">
                        <h3 style="margin-top:0; color: var(--hub-primary);">${fort.name}</h3>
                        <p style="font-size: 0.9rem;">📍 ${fort.location}, ${fort.state}</p>
                        <p style="font-size: 0.9rem; margin-bottom: 1rem;">🏛️ ${fort.era}</p>
                        <a href="${url}" style="text-decoration:none; color: var(--hub-primary); font-weight: bold;">View Details &rarr;</a>
                    </div>
                </div>
            `;
        });
        searchResults.innerHTML = html;
    };

    searchInput.addEventListener('input', renderResults);
    stateFilter.addEventListener('change', renderResults);
    dynastyFilter.addEventListener('change', renderResults);
    typeFilter.addEventListener('change', renderResults);

    // Initial render
    renderResults();
}

// ==========================================
// COMPARE FORTS LOGIC
// ==========================================
function initCompare() {
    const selects = [
        document.getElementById('compareSelect1'),
        document.getElementById('compareSelect2'),
        document.getElementById('compareSelect3')
    ];
    const compareTable = document.getElementById('compareTable');
    const compareBody = document.getElementById('compareBody');
    const ths = [
        document.getElementById('th1'),
        document.getElementById('th2'),
        document.getElementById('th3')
    ];

    if (!compareTable) return;

    // Populate selects
    fortsData.forEach(f => {
        selects.forEach(sel => {
            sel.add(new Option(f.name, f.id));
        });
    });

    const renderCompare = () => {
        const selectedIds = selects.map(sel => sel.value);
        const selectedForts = selectedIds.map(id => fortsData.find(f => f.id == id));

        // Hide column 3 if not selected
        if (selectedForts[2]) {
            ths[2].style.display = 'table-cell';
        } else {
            ths[2].style.display = 'none';
        }

        // If at least one is selected, show table
        if (selectedForts[0] || selectedForts[1] || selectedForts[2]) {
            compareTable.style.display = 'table';
            
            // Update Headers
            selectedForts.forEach((f, i) => {
                if (f) ths[i].textContent = f.name;
                else ths[i].textContent = `Fort ${i+1}`;
            });

            // Update Body
            const features = [
                { label: 'Location', key: 'location' },
                { label: 'State', key: 'state' },
                { label: 'Built', key: 'built' },
                { label: 'Era/Dynasty', key: 'era' },
                { label: 'Architecture', key: 'architecture' },
                { label: 'Strategic History', key: 'history' }
            ];

            let html = '';
            features.forEach(feat => {
                html += `<tr><th>${feat.label}</th>`;
                selectedForts.forEach((f, i) => {
                    if (i === 2 && !selectedForts[2]) return;
                    html += `<td>${f ? (f[feat.key] || 'N/A') : '-'}</td>`;
                });
                html += `</tr>`;
            });
            compareBody.innerHTML = html;
        } else {
            compareTable.style.display = 'none';
        }
    };

    selects.forEach(sel => sel.addEventListener('change', renderCompare));
}

// ==========================================
// INTERACTIVE QUIZ LOGIC
// ==========================================
const quizQuestions = [
    {
        q: "Which fort was built by the Portuguese and is located on an island?",
        opts: ["Diu Fort", "Red Fort", "Taragarh Fort", "Bekal Fort"],
        ans: 0
    },
    {
        q: "Which fort is famous for its 'timber-less' Raja Mahal?",
        opts: ["Golconda Fort", "Chandragiri Fort", "Rajmachi Fort", "Devikot Fort"],
        ans: 1
    },
    {
        q: "Rajmachi Fort is a twin-fort complex. What are the names of the two forts?",
        opts: ["Lohagad & Visapur", "Shrivardhan & Manaranjan", "Pratapgad & Raigad", "Sindhudurg & Vijaydurg"],
        ans: 1
    },
    {
        q: "Which fort is famously known as the 'Star Fort' in Rajasthan?",
        opts: ["Mehrangarh Fort", "Chittorgarh Fort", "Taragarh Fort", "Kumbhalgarh Fort"],
        ans: 2
    },
    {
        q: "Bekal Fort in Kerala is primarily classified as what type of fort?",
        opts: ["Hill Fort", "Desert Fort", "Land Fort", "Coastal/Sea Fort"],
        ans: 3
    }
];

let currentQ = 0;
let score = 0;

function initQuiz() {
    const startBtn = document.getElementById('startQuizBtn');
    const restartBtn = document.getElementById('restartQuizBtn');
    const nextBtn = document.getElementById('nextQuizBtn');
    
    if (!startBtn) return;

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
}

function startQuiz() {
    currentQ = 0;
    score = 0;
    document.getElementById('quizIntro').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizActive').style.display = 'block';
    renderQuestion();
}

function renderQuestion() {
    const qObj = quizQuestions[currentQ];
    document.getElementById('quizProgress').textContent = `Question ${currentQ + 1} of ${quizQuestions.length}`;
    document.getElementById('quizQuestion').textContent = qObj.q;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('nextQuizBtn').style.display = 'none';

    let optionsHtml = '';
    qObj.opts.forEach((opt, idx) => {
        optionsHtml += `<div class="quiz-option" data-idx="${idx}">${opt}</div>`;
    });
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = optionsHtml;

    // Attach listeners
    const opts = optionsContainer.querySelectorAll('.quiz-option');
    opts.forEach(opt => {
        opt.addEventListener('click', function() {
            if (document.getElementById('nextQuizBtn').style.display === 'inline-block') return; // already answered
            
            const selectedIdx = parseInt(this.getAttribute('data-idx'));
            const correctIdx = qObj.ans;

            if (selectedIdx === correctIdx) {
                this.classList.add('correct');
                document.getElementById('quizFeedback').textContent = "Correct! Well done.";
                score++;
            } else {
                this.classList.add('incorrect');
                opts[correctIdx].classList.add('correct');
                document.getElementById('quizFeedback').textContent = "Incorrect. The highlighted answer is correct.";
            }

            document.getElementById('nextQuizBtn').style.display = 'inline-block';
        });
    });
}

function nextQuestion() {
    currentQ++;
    if (currentQ < quizQuestions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizFinalScore').textContent = `You scored ${score} out of ${quizQuestions.length}!`;
}

// ==========================================
// STATISTICS LOGIC
// ==========================================
function initStats() {
    const statsContainer = document.getElementById('statsContainer');
    if (!statsContainer) return;

    const totalForts = fortsData.length;
    const statesCount = new Set(fortsData.map(f => f.state)).size;
    const coastalForts = fortsData.filter(f => JSON.stringify(f).toLowerCase().includes('coastal') || JSON.stringify(f).toLowerCase().includes('sea')).length;

    statsContainer.innerHTML = `
        <div class="stat-card glass-panel">
            <h3>${totalForts}</h3>
            <p>Total Forts Explored</p>
        </div>
        <div class="stat-card glass-panel">
            <h3>${statesCount}</h3>
            <p>States Covered</p>
        </div>
        <div class="stat-card glass-panel">
            <h3>${coastalForts}</h3>
            <p>Coastal / Sea Forts</p>
        </div>
        <div class="stat-card glass-panel">
            <h3>50+</h3>
            <p>Centuries of History</p>
        </div>
    `;
}

// ==========================================
// FAQS LOGIC
// ==========================================
function initFAQs() {
    const faqs = document.querySelectorAll('.faq-question');
    faqs.forEach(faq => {
        faq.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                this.querySelector('span').textContent = '▼';
            } else {
                answer.style.display = 'block';
                this.querySelector('span').textContent = '▲';
            }
        });
    });
}

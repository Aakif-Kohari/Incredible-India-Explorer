/**
 * indias-firsts-sports.js
 * India's "Firsts" in Sports Encyclopedia - Dataset, Interactive Timeline, and Quiz Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 * Mirrors the structure of indias-firsts.js so it plugs into the existing site pattern.
 */

// Dataset of India's Major Sporting Firsts (fact-checked, sources noted in `source`)
export const indiasFirstsSportsData = [
  {
    id: "first-olympic-medal",
    title: "First Olympic Medal for India",
    name: "Norman Pritchard",
    year: 1900,
    category: "Olympics",
    icon: "🥈",
    description: "Won two silver medals in athletics (200m and 200m hurdles) at the 1900 Paris Olympics, becoming the first Indian-born athlete to win an Olympic medal.",
    details: "Pritchard competed under the flag of British India; his nationality is still debated by historians, but the IOC credits the medals to India.",
    source: "olympics.com / IOC official results database"
  },
  {
    id: "first-independent-india-medal",
    title: "First Olympic Medal for Independent India",
    name: "K. D. Jadhav",
    year: 1952,
    category: "Olympics",
    icon: "🥉",
    description: "Won bronze in freestyle wrestling (bantamweight) at the 1952 Helsinki Olympics, the first individual Olympic medal won by independent India.",
    details: "Jadhav funded part of his own trip to Helsinki after his college mortgaged property to support him.",
    source: "olympics.com"
  },
  {
    id: "first-olympic-gold",
    title: "First Olympic Gold Medal",
    name: "Indian National Hockey Team",
    year: 1928,
    category: "Hockey",
    icon: "🏑",
    description: "Won gold at the 1928 Amsterdam Olympics without conceding a single goal, opening a golden era in which India won six consecutive hockey gold medals.",
    details: "Dhyan Chand top-scored for the team and became a legend of the sport during this era.",
    source: "olympics.com"
  },
  {
    id: "first-individual-olympic-gold",
    title: "First Individual Olympic Gold Medal",
    name: "Abhinav Bindra",
    year: 2008,
    category: "Olympics",
    icon: "🥇",
    description: "Won gold in the men's 10m air rifle event at the 2008 Beijing Olympics, India's first individual Olympic gold medal.",
    details: "Bindra shot a then-Olympic-record 700.5 to edge out China's Zhu Qinan.",
    source: "olympics.com"
  },
  {
    id: "first-woman-olympic-medal",
    title: "First Woman Olympic Medalist",
    name: "Karnam Malleswari",
    year: 2000,
    category: "Olympics",
    icon: "🏋️‍♀️",
    description: "Won bronze in the 69kg weightlifting category at the 2000 Sydney Olympics, the first Olympic medal by an Indian woman.",
    details: "She remains the only Indian woman to win an Olympic medal in weightlifting.",
    source: "olympics.com"
  },
  {
    id: "first-athletics-olympic-gold",
    title: "First Olympic Gold in Athletics",
    name: "Neeraj Chopra",
    year: 2021,
    category: "Athletics",
    icon: "🥇",
    description: "Won gold in the javelin throw at the Tokyo Olympics (held in 2021), India's first-ever Olympic gold in athletics.",
    details: "His winning throw of 87.58m also ended a 100-plus year wait for an individual Olympic gold outside shooting.",
    source: "olympics.com"
  },
  {
    id: "first-cricket-world-cup",
    title: "First Cricket World Cup Title",
    name: "Kapil Dev's Indian Team",
    year: 1983,
    category: "Cricket",
    icon: "🏏",
    description: "Defeated the two-time defending champions West Indies at Lord's to win the Prudential Cricket World Cup, India's first world title in the sport.",
    details: "The win is widely credited with transforming cricket's popularity and commercial footing in India.",
    source: "ICC official records"
  },
  {
    id: "first-t20-world-cup",
    title: "First T20 World Cup Title",
    name: "M. S. Dhoni's Indian Team",
    year: 2007,
    category: "Cricket",
    icon: "🏆",
    description: "Beat Pakistan in a nail-biting final to win the inaugural ICC World Twenty20 in South Africa.",
    details: "The win launched Dhoni's captaincy career and is often cited as a catalyst for the founding of the IPL.",
    source: "ICC official records"
  },
  {
    id: "first-hockey-world-cup",
    title: "First Hockey World Cup Title",
    name: "Ajitpal Singh's Indian Team",
    year: 1975,
    category: "Hockey",
    icon: "🏑",
    description: "Beat Pakistan 2-1 in the final at Kuala Lumpur to win India's only men's Hockey World Cup title to date.",
    details: "Ashok Kumar scored the winning goal in a tense low-scoring final.",
    source: "International Hockey Federation (FIH) records"
  },
  {
    id: "first-chess-world-champion",
    title: "First Indian World Chess Champion",
    name: "Viswanathan Anand",
    year: 2000,
    category: "Chess",
    icon: "♟️",
    description: "Won the FIDE World Chess Championship in 2000, becoming India's first world chess champion; he went on to become undisputed world champion in 2007.",
    details: "Anand held the undisputed title until 2013 and remains India's first Grandmaster (1988).",
    source: "FIDE official records"
  },
  {
    id: "first-woman-olympic-silver",
    title: "First Indian Woman to Win Olympic Silver",
    name: "P. V. Sindhu",
    year: 2016,
    category: "Badminton",
    icon: "🏸",
    description: "Won the silver medal in women's singles badminton at the Rio Olympics, the best individual Olympic result by an Indian woman at that time.",
    details: "Sindhu went on to win bronze at the 2020 Tokyo Olympics, becoming India's only woman with two individual Olympic medals.",
    source: "olympics.com"
  },
  {
    id: "first-grand-slam-title",
    title: "First Grand Slam Title",
    name: "Mahesh Bhupathi",
    year: 1997,
    category: "Tennis",
    icon: "🎾",
    description: "Won the French Open mixed doubles title partnering Rika Hiraki, becoming the first Indian to win a Grand Slam tennis title.",
    details: "Bhupathi went on to form a celebrated doubles partnership with Leander Paes.",
    source: "ITF / Roland-Garros official records"
  },
  {
    id: "first-badminton-world-championship-gold",
    title: "First Badminton World Championship Gold",
    name: "P. V. Sindhu",
    year: 2019,
    category: "Badminton",
    icon: "🥇",
    description: "Won gold at the BWF World Championships in Basel, becoming the first Indian to win a world championship gold medal in badminton.",
    details: "She defeated Nozomi Okuhara of Japan in straight games in the final.",
    source: "Badminton World Federation (BWF) official records"
  },
  {
    id: "first-paralympic-gold",
    title: "First Paralympic Gold Medal",
    name: "Murlikant Petkar",
    year: 1972,
    category: "Paralympics",
    icon: "🏊",
    description: "Won gold in the men's 50m freestyle (swimming) at the 1972 Heidelberg Paralympics, India's first-ever Paralympic gold medal.",
    details: "Petkar, a former Indian Army soldier injured in the 1965 war, set a world record time in the final.",
    source: "International Paralympic Committee (IPC) official records"
  },
  {
    id: "first-world-athletics-championship-gold",
    title: "First World Athletics Championship Gold",
    name: "Neeraj Chopra",
    year: 2023,
    category: "Athletics",
    icon: "🥇",
    description: "Won gold in the javelin throw at the World Athletics Championships in Budapest, India's first-ever gold at that event.",
    details: "He became the first Indian track-and-field athlete to win a World Championships title.",
    source: "World Athletics official records"
  }
];

// Interactive Quiz Questions Dataset
export const sportsFirstsQuizQuestions = [
  {
    question: "Who won independent India's first individual Olympic medal, a bronze in wrestling at the 1952 Helsinki Olympics?",
    options: ["Sushil Kumar", "K. D. Jadhav", "Khashaba Jadhav's coach", "Milkha Singh"],
    correctIndex: 1,
    explanation: "K. D. Jadhav won bronze in freestyle wrestling at the 1952 Helsinki Olympics."
  },
  {
    question: "Which team won India's first Olympic gold medal, at the 1928 Amsterdam Olympics?",
    options: ["Indian Cricket Team", "Indian National Hockey Team", "Indian Football Team", "Indian Athletics Team"],
    correctIndex: 1,
    explanation: "The Indian hockey team won gold at Amsterdam in 1928 without conceding a goal."
  },
  {
    question: "Who won India's first individual Olympic gold medal, in shooting at the 2008 Beijing Olympics?",
    options: ["Gagan Narang", "Vijay Kumar", "Abhinav Bindra", "Rajyavardhan Singh Rathore"],
    correctIndex: 2,
    explanation: "Abhinav Bindra won gold in the 10m air rifle event at Beijing 2008."
  },
  {
    question: "Who became India's first woman Olympic medalist, winning weightlifting bronze in 2000?",
    options: ["Karnam Malleswari", "P. V. Sindhu", "Mary Kom", "Saina Nehwal"],
    correctIndex: 0,
    explanation: "Karnam Malleswari won bronze in weightlifting at the 2000 Sydney Olympics."
  },
  {
    question: "In what year did India win its first Cricket World Cup, led by Kapil Dev?",
    options: ["1975", "1983", "2007", "2011"],
    correctIndex: 1,
    explanation: "India beat West Indies at Lord's in 1983 to win its first Cricket World Cup."
  },
  {
    question: "Who won India's first Paralympic gold medal, in swimming at the 1972 Heidelberg Games?",
    options: ["Devendra Jhajharia", "Murlikant Petkar", "Deepa Malik", "Avani Lekhara"],
    correctIndex: 1,
    explanation: "Murlikant Petkar won gold in the 50m freestyle at the 1972 Heidelberg Paralympics."
  }
];

/**
 * Get item by ID.
 */
export function getFirstById(id, list = indiasFirstsSportsData) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(item => item.id.toLowerCase() === target || item.name.toLowerCase().includes(target));
}

/**
 * Filter items by search query and category.
 */
export function filterFirsts(query = "", categoryFilter = "all", list = indiasFirstsSportsData) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const cat = categoryFilter.trim().toLowerCase();

  return list.filter(item => {
    const matchesQuery = !q || [
      item.title,
      item.name,
      item.year.toString(),
      item.category,
      item.description,
      item.details
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesCategory = cat === "all" || item.category.toLowerCase().includes(cat);

    return matchesQuery && matchesCategory;
  });
}

/**
 * Get items sorted chronologically for Timeline view.
 */
export function getTimelineFirsts(list = indiasFirstsSportsData) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => a.year - b.year);
}

/**
 * Evaluate quiz question answer.
 */
export function evaluateQuizAnswer(questionIndex, selectedOptionIndex, questions = sportsFirstsQuizQuestions) {
  if (!Array.isArray(questions) || questionIndex < 0 || questionIndex >= questions.length) {
    return { isCorrect: false, explanation: "Invalid question index." };
  }
  const q = questions[questionIndex];
  const isCorrect = selectedOptionIndex === q.correctIndex;

  return {
    isCorrect,
    correctOption: q.options[q.correctIndex],
    explanation: q.explanation
  };
}

/* ==========================================================================
   BROWSER DOM & ENCYCLOPEDIA ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.indiasFirstsSportsData = indiasFirstsSportsData;
  window.sportsFirstsQuizQuestions = sportsFirstsQuizQuestions;
  window.getFirstById = getFirstById;
  window.filterFirsts = filterFirsts;
  window.getTimelineFirsts = getTimelineFirsts;
  window.evaluateQuizAnswer = evaluateQuizAnswer;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const cardsGrid = document.getElementById("firsts-cards-grid");
    const timelineContainer = document.getElementById("timeline-track-container");
    const searchInput = document.getElementById("firsts-search");
    const categoryBtns = document.querySelectorAll(".btn-cat-filter");
    const viewTabs = document.querySelectorAll(".btn-view-tab");

    // Quiz DOM Elements
    const quizCard = document.getElementById("quiz-card-container");
    const quizQuestionText = document.getElementById("quiz-question-text");
    const quizOptionsContainer = document.getElementById("quiz-options-container");
    const quizFeedbackBox = document.getElementById("quiz-feedback-box");
    const quizScoreBadge = document.getElementById("quiz-score-badge");
    const btnNextQuiz = document.getElementById("btn-next-quiz");

    let currentCategory = "all";
    let currentQuizIndex = 0;
    let userScore = 0;
    let quizAnswered = false;

    // Render Cards Grid
    function renderGrid() {
      if (!cardsGrid) return;
      cardsGrid.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterFirsts(query, currentCategory);

      if (filtered.length === 0) {
        cardsGrid.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Firsts Found</h3>
            <p>Try searching for keywords like Bindra, Hockey, Cricket, Sindhu, or Paralympics.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "first-card";

        card.innerHTML = `
          <div class="card-header">
            <span class="item-icon">${item.icon}</span>
            <span class="year-badge">${item.year}</span>
          </div>

          <h3>${item.title}</h3>
          <h4 class="name-highlight">${item.name}</h4>
          <span class="cat-tag">${item.category}</span>

          <p class="item-desc">${item.description}</p>
          <div class="item-details-box">
            <p>${item.details}</p>
            <p class="item-source">Source: ${item.source}</p>
          </div>
        `;

        cardsGrid.appendChild(card);
      });
    }

    // Render Timeline View
    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const timelineItems = getTimelineFirsts();

      timelineItems.forEach(item => {
        const node = document.createElement("div");
        node.className = "timeline-node";

        node.innerHTML = `
          <div class="timeline-year-pill">📅 ${item.year}</div>
          <div class="timeline-card">
            <span class="node-icon">${item.icon}</span>
            <h3>${item.title} — <span>${item.name}</span></h3>
            <span class="cat-tag">${item.category}</span>
            <p>${item.description}</p>
          </div>
        `;

        timelineContainer.appendChild(node);
      });
    }

    // Render Quiz Mode
    function renderQuizQuestion() {
      if (!quizCard || !quizQuestionText || !quizOptionsContainer) return;
      quizFeedbackBox.innerHTML = "";
      quizFeedbackBox.className = "quiz-feedback-box hidden";
      quizAnswered = false;

      if (currentQuizIndex >= sportsFirstsQuizQuestions.length) {
        quizQuestionText.textContent = "🎉 Quiz Completed!";
        quizOptionsContainer.innerHTML = `
          <div class="quiz-results-card">
            <h3>Final Score: ${userScore} / ${sportsFirstsQuizQuestions.length}</h3>
            <p>${userScore >= sportsFirstsQuizQuestions.length - 1 ? "Champion of India's Sporting Firsts!" : "Good effort! Review the encyclopedia and try again."}</p>
            <button type="button" id="btn-restart-quiz" class="btn-restart">🔄 Restart Quiz</button>
          </div>
        `;
        document.getElementById("btn-restart-quiz")?.addEventListener("click", () => {
          currentQuizIndex = 0;
          userScore = 0;
          if (quizScoreBadge) quizScoreBadge.textContent = `Score: 0 / ${sportsFirstsQuizQuestions.length}`;
          renderQuizQuestion();
        });
        if (btnNextQuiz) btnNextQuiz.style.display = "none";
        return;
      }

      const q = sportsFirstsQuizQuestions[currentQuizIndex];
      quizQuestionText.textContent = `Question ${currentQuizIndex + 1} of ${sportsFirstsQuizQuestions.length}: ${q.question}`;
      quizOptionsContainer.innerHTML = "";
      if (btnNextQuiz) btnNextQuiz.style.display = "none";

      q.options.forEach((optText, optIdx) => {
        const optBtn = document.createElement("button");
        optBtn.type = "button";
        optBtn.className = "btn-quiz-option";
        optBtn.textContent = `${String.fromCharCode(65 + optIdx)}. ${optText}`;

        optBtn.addEventListener("click", () => {
          if (quizAnswered) return;
          quizAnswered = true;

          const res = evaluateQuizAnswer(currentQuizIndex, optIdx);
          if (res.isCorrect) {
            optBtn.classList.add("correct");
            userScore++;
            if (quizScoreBadge) quizScoreBadge.textContent = `Score: ${userScore} / ${sportsFirstsQuizQuestions.length}`;
            quizFeedbackBox.innerHTML = `✅ <strong>Correct!</strong> ${res.explanation}`;
            quizFeedbackBox.className = "quiz-feedback-box feedback-correct";
          } else {
            optBtn.classList.add("wrong");
            quizFeedbackBox.innerHTML = `❌ <strong>Not quite.</strong> The correct answer was <strong>${res.correctOption}</strong>. ${res.explanation}`;
            quizFeedbackBox.className = "quiz-feedback-box feedback-wrong";
          }
          if (btnNextQuiz) btnNextQuiz.style.display = "inline-block";
        });

        quizOptionsContainer.appendChild(optBtn);
      });
    }

    // View Tab Switching
    viewTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        viewTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.dataset.view;
        document.querySelectorAll(".view-panel").forEach(panel => panel.classList.add("hidden"));
        document.getElementById(`view-${target}`)?.classList.remove("hidden");

        if (target === "grid") renderGrid();
        if (target === "timeline") renderTimeline();
        if (target === "quiz") renderQuizQuestion();
      });
    });

    // Category Filter
    categoryBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category || "all";
        renderGrid();
      });
    });

    // Search
    if (searchInput) {
      searchInput.addEventListener("input", renderGrid);
    }

    // Next Quiz Button
    if (btnNextQuiz) {
      btnNextQuiz.addEventListener("click", () => {
        currentQuizIndex++;
        renderQuizQuestion();
      });
    }

    // Initial Render
    renderGrid();
  });
}
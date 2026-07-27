/**
 * indias-firsts.js
 * India's "Firsts" Encyclopedia - Dataset, Interactive Timeline, and Quiz Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Dataset of India's Major Firsts
export const indiasFirstsData = [
  {
    id: "first-satellite",
    title: "First Satellite of India",
    name: "Aryabhata",
    year: 1975,
    category: "Science & Technology",
    icon: "🛰️",
    description: "Launched on April 19, 1975, Aryabhata marked India's entry into space exploration, designed by ISRO and launched via a Soviet Kosmos-3M rocket.",
    details: "Named after the 5th-century Indian astronomer, the 360 kg satellite conducted experiments in X-ray astronomy, aeronomics, and solar physics."
  },
  {
    id: "first-woman-pm",
    title: "First Woman Prime Minister",
    name: "Indira Gandhi",
    year: 1966,
    category: "Leadership & Governance",
    icon: "👩‍💼",
    description: "Sworn in on January 24, 1966, Indira Gandhi became India's first female Prime Minister, leading across four terms.",
    details: "Remains the only female Prime Minister in Indian history, known for major economic and green revolution reforms."
  },
  {
    id: "first-metro",
    title: "First Underground Metro Railway",
    name: "Kolkata Metro (Calcutta Metro)",
    year: 1984,
    category: "Infrastructure & Transport",
    icon: "🚇",
    description: "Began commercial operations on October 24, 1984, running between Esplanade and Bhowanipore (Netaji Bhavan).",
    details: "Pioneered underground rapid transit in India and became the 17th operational zone of Indian Railways in 2010."
  },
  {
    id: "first-iit",
    title: "First Indian Institute of Technology",
    name: "IIT Kharagpur",
    year: 1951,
    category: "Education & Research",
    icon: "🎓",
    description: "Inaugurated on August 18, 1951, at the former Hijli Detention Camp in West Bengal by Education Minister Maulana Abul Kalam Azad.",
    details: "Created on the recommendations of the Sarkar Committee to establish premier technical education institutes for post-independence development."
  },
  {
    id: "first-high-court",
    title: "First High Court in India",
    name: "Calcutta High Court",
    year: 1862,
    category: "Law & Justice",
    icon: "⚖️",
    description: "Established on July 1, 1862, under the High Courts Act 1861, making it the oldest High Court in the country.",
    details: "Housed in a neo-Gothic architectural landmark in Kolkata modeled after the Cloth Hall in Ypres, Belgium."
  },
  {
    id: "first-nobel-laureate",
    title: "First Asian & Indian Nobel Laureate",
    name: "Rabindranath Tagore",
    year: 1913,
    category: "Arts & Literature",
    icon: "✒️",
    description: "Awarded the Nobel Prize in Literature in 1913 for his profoundly sensitive poetry collection 'Gitanjali' (Song Offerings).",
    details: "First non-European recipient of a Nobel Prize; composed national anthems for both India and Bangladesh."
  },
  {
    id: "first-national-park",
    title: "First National Park of India",
    name: "Jim Corbett National Park (Hailey)",
    year: 1936,
    category: "Wildlife & Nature",
    icon: "🐅",
    description: "Established in 1936 in the Himalayan foothills of Uttarakhand as Hailey National Park to protect the Bengal tiger.",
    details: "Renamed after legendary hunter-turned-conservationist Jim Corbett; launched Project Tiger in 1973."
  },
  {
    id: "first-indian-space",
    title: "First Indian Citizen in Space",
    name: "Wing Commander Rakesh Sharma",
    year: 1984,
    category: "Science & Technology",
    icon: "👨‍🚀",
    description: "Flew aboard Soviet spacecraft Soyuz T-11 on April 3, 1984, spending nearly 8 days in orbit on Salyut 7.",
    details: "Famous for responding 'Saare Jahan Se Achha' when asked by PM Indira Gandhi how India looked from space."
  },
  {
    id: "first-passenger-train",
    title: "First Commercial Passenger Train",
    name: "Bombay to Thane Railway",
    year: 1853,
    category: "Infrastructure & Transport",
    icon: "🚂",
    description: "Covered 34 kilometers between Bori Bunder (Bombay) and Thane on April 16, 1853, pulled by three steam engines.",
    details: "Inaugurated passenger rail travel in Asia, transporting 400 guests across 14 carriages."
  },
  {
    id: "first-president",
    title: "First President of Independent India",
    name: "Dr. Rajendra Prasad",
    year: 1950,
    category: "Leadership & Governance",
    icon: "🏛️",
    description: "Took office on January 26, 1950, upon the enactment of the Constitution of India, serving until 1962.",
    details: "Presided over the Constituent Assembly of India and remains the longest-serving Indian President."
  }
];

// Interactive Quiz Questions Dataset
export const firstsQuizQuestions = [
  {
    question: "Which was India's first indigenous satellite launched into orbit in 1975?",
    options: ["Rohini RS-1", "Aryabhata", "Bhaskara-I", "INSAT-1A"],
    correctIndex: 1,
    explanation: "Aryabhata was launched on April 19, 1975, marking India's entry into satellite space exploration."
  },
  {
    question: "Where was India's first Indian Institute of Technology (IIT) established in 1951?",
    options: ["IIT Bombay", "IIT Delhi", "IIT Kharagpur", "IIT Madras"],
    correctIndex: 2,
    explanation: "IIT Kharagpur was established in 1951 at the site of the former Hijli Detention Camp in West Bengal."
  },
  {
    question: "Which city operated India's first underground metro railway system in 1984?",
    options: ["Delhi", "Kolkata", "Mumbai", "Chennai"],
    correctIndex: 1,
    explanation: "Kolkata Metro began commercial passenger operations on October 24, 1984."
  },
  {
    question: "Who was the first Indian and first Asian to win a Nobel Prize in 1913?",
    options: ["C.V. Raman", "Rabindranath Tagore", "Mother Teresa", "Amartya Sen"],
    correctIndex: 1,
    explanation: "Rabindranath Tagore won the Nobel Prize in Literature in 1913 for 'Gitanjali'."
  },
  {
    question: "What was India's first National Park initially named when established in 1936?",
    options: ["Kaziranga National Park", "Hailey National Park", "Gir National Park", "Bandipur National Park"],
    correctIndex: 1,
    explanation: "Established in 1936 as Hailey National Park, it was later renamed Jim Corbett National Park."
  }
];

/**
 * Get item by ID.
 */
export function getFirstById(id, list = indiasFirstsData) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(item => item.id.toLowerCase() === target || item.name.toLowerCase().includes(target));
}

/**
 * Filter items by search query and category.
 */
export function filterFirsts(query = "", categoryFilter = "all", list = indiasFirstsData) {
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
export function getTimelineFirsts(list = indiasFirstsData) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => a.year - b.year);
}

/**
 * Evaluate quiz question answer.
 */
export function evaluateQuizAnswer(questionIndex, selectedOptionIndex, questions = firstsQuizQuestions) {
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
  window.indiasFirstsData = indiasFirstsData;
  window.firstsQuizQuestions = firstsQuizQuestions;
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
    let currentViewMode = "grid"; // 'grid' | 'timeline' | 'quiz'
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
            <p>Try searching for keywords like Aryabhata, Indira Gandhi, Metro, IIT, Corbett, or Tagore.</p>
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

      if (currentQuizIndex >= firstsQuizQuestions.length) {
        // Quiz completed
        quizQuestionText.textContent = "🎉 Quiz Completed!";
        quizOptionsContainer.innerHTML = `
          <div class="quiz-results-card">
            <h3>Final Score: ${userScore} / ${firstsQuizQuestions.length}</h3>
            <p>${userScore >= 4 ? "Master of India's Firsts! Outstanding knowledge." : "Good effort! Review the encyclopedia and try again."}</p>
            <button type="button" id="btn-restart-quiz" class="btn-restart">🔄 Restart Quiz</button>
          </div>
        `;
        document.getElementById("btn-restart-quiz")?.addEventListener("click", () => {
          currentQuizIndex = 0;
          userScore = 0;
          if (quizScoreBadge) quizScoreBadge.textContent = `Score: 0 / ${firstsQuizQuestions.length}`;
          renderQuizQuestion();
        });
        if (btnNextQuiz) btnNextQuiz.style.display = "none";
        return;
      }

      const q = firstsQuizQuestions[currentQuizIndex];
      quizQuestionText.textContent = `Question ${currentQuizIndex + 1} of ${firstsQuizQuestions.length}: ${q.question}`;
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
            if (quizScoreBadge) quizScoreBadge.textContent = `Score: ${userScore} / ${firstsQuizQuestions.length}`;
            quizFeedbackBox.innerHTML = `✅ <strong>Correct!</strong> ${res.explanation}`;
            quizFeedbackBox.className = "quiz-feedback-box feedback-correct";
          } else {
            optBtn.classList.add("wrong");
            quizFeedbackBox.innerHTML = `❌ <strong>Incorrect.</strong> Correct answer: <em>${res.correctOption}</em>. ${res.explanation}`;
            quizFeedbackBox.className = "quiz-feedback-box feedback-wrong";
          }

          if (btnNextQuiz) btnNextQuiz.style.display = "inline-block";
        });

        quizOptionsContainer.appendChild(optBtn);
      });
    }

    // View Switcher
    function switchView(mode) {
      currentViewMode = mode;
      viewTabs.forEach(tab => tab.classList.toggle("active", tab.dataset.view === mode));

      document.getElementById("view-grid-section")?.classList.toggle("hidden", mode !== "grid");
      document.getElementById("view-timeline-section")?.classList.toggle("hidden", mode !== "timeline");
      document.getElementById("view-quiz-section")?.classList.toggle("hidden", mode !== "quiz");

      if (mode === "grid") renderGrid();
      if (mode === "timeline") renderTimeline();
      if (mode === "quiz") renderQuizQuestion();
    }

    // Category Filter Listeners
    categoryBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        renderGrid();
      });
    });

    // View Tab Listeners
    viewTabs.forEach(tab => {
      tab.addEventListener("click", () => switchView(tab.dataset.view));
    });

    // Next Quiz Question Listener
    btnNextQuiz?.addEventListener("click", () => {
      currentQuizIndex++;
      renderQuizQuestion();
    });

    // Search Input Listener
    searchInput?.addEventListener("input", renderGrid);

    // Initializations
    renderGrid();
  });
}

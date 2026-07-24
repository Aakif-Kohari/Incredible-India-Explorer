/**
 * border-neighbors-quiz.js
 * Border Neighbors Quiz for Incredible India Explorer
 *
 * Provides Indian state adjacency dataset, multi-select question generator,
 * partial-credit scoring algorithm, and DOM rendering logic.
 */

export const STATE_ADJACENCY_MAP = {
  AP: { id: "AP", name: "Andhra Pradesh", capital: "Amaravati", region: "South", neighbors: ["TN", "KA", "TS", "CT", "OR"] },
  AR: { id: "AR", name: "Arunachal Pradesh", capital: "Itanagar", region: "North-East", neighbors: ["AS", "NL"] },
  AS: { id: "AS", name: "Assam", capital: "Dispur", region: "North-East", neighbors: ["AR", "NL", "MN", "MZ", "TR", "ML", "WB"] },
  BR: { id: "BR", name: "Bihar", capital: "Patna", region: "East", neighbors: ["UP", "JH", "WB"] },
  CT: { id: "CT", name: "Chhattisgarh", capital: "Raipur", region: "Central", neighbors: ["MP", "UP", "JH", "OR", "TS", "MH"] },
  GA: { id: "GA", name: "Goa", capital: "Panaji", region: "West", neighbors: ["MH", "KA"] },
  GJ: { id: "GJ", name: "Gujarat", capital: "Gandhinagar", region: "West", neighbors: ["RJ", "MP", "MH"] },
  HR: { id: "HR", name: "Haryana", capital: "Chandigarh", region: "North", neighbors: ["PB", "HP", "UK", "UP", "RJ"] },
  HP: { id: "HP", name: "Himachal Pradesh", capital: "Shimla", region: "North", neighbors: ["JK", "UK", "UP", "HR", "PB"] },
  JK: { id: "JK", name: "Jammu and Kashmir", capital: "Srinagar", region: "North", neighbors: ["HP", "PB"] },
  JH: { id: "JH", name: "Jharkhand", capital: "Ranchi", region: "East", neighbors: ["BR", "WB", "OR", "CT", "UP"] },
  KA: { id: "KA", name: "Karnataka", capital: "Bengaluru", region: "South", neighbors: ["GA", "MH", "TS", "AP", "TN", "KL"] },
  KL: { id: "KL", name: "Kerala", capital: "Thiruvananthapuram", region: "South", neighbors: ["KA", "TN"] },
  MP: { id: "MP", name: "Madhya Pradesh", capital: "Bhopal", region: "Central", neighbors: ["UP", "RJ", "GJ", "MH", "CT"] },
  MH: { id: "MH", name: "Maharashtra", capital: "Mumbai", region: "West", neighbors: ["GJ", "MP", "CT", "TS", "KA", "GA"] },
  MN: { id: "MN", name: "Manipur", capital: "Imphal", region: "North-East", neighbors: ["AS", "NL", "MZ"] },
  ML: { id: "ML", name: "Meghalaya", capital: "Shillong", region: "North-East", neighbors: ["AS"] },
  MZ: { id: "MZ", name: "Mizoram", capital: "Aizawl", region: "North-East", neighbors: ["AS", "MN", "TR"] },
  NL: { id: "NL", name: "Nagaland", capital: "Kohima", region: "North-East", neighbors: ["AS", "AR", "MN"] },
  OR: { id: "OR", name: "Odisha", capital: "Bhubaneswar", region: "East", neighbors: ["WB", "JH", "CT", "AP"] },
  PB: { id: "PB", name: "Punjab", capital: "Chandigarh", region: "North", neighbors: ["JK", "HP", "HR", "RJ"] },
  RJ: { id: "RJ", name: "Rajasthan", capital: "Jaipur", region: "North-West", neighbors: ["PB", "HR", "UP", "MP", "GJ"] },
  SK: { id: "SK", name: "Sikkim", capital: "Gangtok", region: "North-East", neighbors: ["WB"] },
  TN: { id: "TN", name: "Tamil Nadu", capital: "Chennai", region: "South", neighbors: ["KL", "KA", "AP"] },
  TS: { id: "TS", name: "Telangana", capital: "Hyderabad", region: "South", neighbors: ["MH", "CT", "AP", "KA"] },
  TR: { id: "TR", name: "Tripura", capital: "Agartala", region: "North-East", neighbors: ["AS", "MZ"] },
  UP: { id: "UP", name: "Uttar Pradesh", capital: "Lucknow", region: "North", neighbors: ["UK", "HP", "HR", "RJ", "MP", "CT", "JH", "BR"] },
  UK: { id: "UK", name: "Uttarakhand", capital: "Dehradun", region: "North", neighbors: ["HP", "UP"] },
  WB: { id: "WB", name: "West Bengal", capital: "Kolkata", region: "East", neighbors: ["SK", "AS", "OR", "JH", "BR"] }
};

/**
 * Calculates partial credit score for a user's multi-select neighbor choices.
 *
 * Formula:
 *  - TP (True Positives): Selected choices that are actual neighbors
 *  - FP (False Positives): Selected choices that are NOT actual neighbors
 *  - FN (False Negatives): Actual neighbors that were missed
 *  - Score = max(0, Math.round(((TP - 0.5 * FP) / N) * 100))
 *
 * @param {string} targetStateId - ID of the question target state (e.g., 'MH')
 * @param {Array<string>} selectedIds - Array of state IDs selected by the user
 * @param {Object} map - Adjacency data map (defaults to STATE_ADJACENCY_MAP)
 * @returns {Object} Score breakdown object
 */
export function calculatePartialCredit(targetStateId, selectedIds = [], map = STATE_ADJACENCY_MAP) {
  if (!targetStateId || !map[targetStateId]) {
    return {
      targetStateId: null,
      targetStateName: "Unknown",
      actualNeighbors: [],
      tp: [],
      fp: [],
      fn: [],
      totalCorrect: 0,
      scorePercentage: 0,
      earnedPoints: 0,
      maxPoints: 100,
      isPerfect: false
    };
  }

  const targetState = map[targetStateId];
  const actualNeighbors = new Set(targetState.neighbors || []);
  const selectedSet = new Set(selectedIds || []);

  const tp = [];
  const fp = [];
  const fn = [];

  selectedSet.forEach(id => {
    if (actualNeighbors.has(id)) {
      tp.push(id);
    } else {
      fp.push(id);
    }
  });

  actualNeighbors.forEach(id => {
    if (!selectedSet.has(id)) {
      fn.push(id);
    }
  });

  const totalCorrect = actualNeighbors.size;
  let scorePercentage = 0;

  if (totalCorrect > 0) {
    const rawScore = tp.length - (0.5 * fp.length);
    const fraction = Math.max(0, rawScore / totalCorrect);
    scorePercentage = Math.min(100, Math.round(fraction * 100));
  }

  const isPerfect = tp.length === totalCorrect && fp.length === 0;

  return {
    targetStateId,
    targetStateName: targetState.name,
    actualNeighbors: Array.from(actualNeighbors),
    tp,
    fp,
    fn,
    totalCorrect,
    scorePercentage,
    earnedPoints: scorePercentage,
    maxPoints: 100,
    isPerfect
  };
}

/**
 * Generates options list for a given target state (correct neighbors + distractors).
 *
 * @param {string} targetStateId - Target state ID
 * @param {number} optionCount - Total options to present (default 8)
 * @param {Object} map - Adjacency map
 * @returns {Array<Object>} List of option state objects
 */
export function generateQuestionOptions(targetStateId, optionCount = 8, map = STATE_ADJACENCY_MAP) {
  if (!targetStateId || !map[targetStateId]) return [];

  const target = map[targetStateId];
  const actualNeighborIds = new Set(target.neighbors);

  // All actual neighbors are included
  const options = target.neighbors.map(id => ({
    id,
    name: map[id] ? map[id].name : id,
    capital: map[id] ? map[id].capital : "",
    region: map[id] ? map[id].region : "",
    isNeighbor: true
  }));

  // Potential distractors: all states except target and its neighbors
  const distractorIds = Object.keys(map).filter(id => id !== targetStateId && !actualNeighborIds.has(id));

  // Shuffle distractors
  const shuffledDistractors = [...distractorIds].sort(() => 0.5 - Math.random());
  const neededDistractors = Math.max(2, optionCount - options.length);

  for (let i = 0; i < Math.min(neededDistractors, shuffledDistractors.length); i++) {
    const dId = shuffledDistractors[i];
    options.push({
      id: dId,
      name: map[dId].name,
      capital: map[dId].capital,
      region: map[dId].region,
      isNeighbor: false
    });
  }

  // Shuffle final options
  return options.sort(() => 0.5 - Math.random());
}

/**
 * Verifies mathematical symmetry of the state adjacency map.
 * For every state A with neighbor B, state B must list state A.
 *
 * @param {Object} map - Adjacency map
 * @returns {Object} { isValid: boolean, errors: Array<string> }
 */
export function verifyBorderSymmetry(map = STATE_ADJACENCY_MAP) {
  const errors = [];
  const stateKeys = Object.keys(map);

  stateKeys.forEach(stateId => {
    const state = map[stateId];
    if (!state.neighbors || !Array.isArray(state.neighbors)) {
      errors.push(`State ${stateId} has no valid neighbors array.`);
      return;
    }

    state.neighbors.forEach(neighborId => {
      if (!map[neighborId]) {
        errors.push(`State ${stateId} references non-existent neighbor ${neighborId}.`);
      } else if (!map[neighborId].neighbors.includes(stateId)) {
        errors.push(`Symmetry error: ${stateId} lists ${neighborId}, but ${neighborId} does not list ${stateId}.`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Helper to compute overall quiz performance summary.
 *
 * @param {Array<Object>} questionResults - Array of result objects from calculatePartialCredit
 * @returns {Object} Aggregate summary
 */
export function summarizeQuizPerformance(questionResults = []) {
  if (!questionResults || questionResults.length === 0) {
    return {
      totalQuestions: 0,
      averageScore: 0,
      totalEarnedPoints: 0,
      totalPossiblePoints: 0,
      perfectQuestions: 0,
      grade: "N/A",
      badge: "Novice Traveler"
    };
  }

  let totalEarned = 0;
  let perfectCount = 0;

  questionResults.forEach(res => {
    totalEarned += res.scorePercentage;
    if (res.isPerfect) perfectCount++;
  });

  const totalPossible = questionResults.length * 100;
  const averageScore = Math.round(totalEarned / questionResults.length);

  let grade = "C";
  let badge = "Boundary Explorer";

  if (averageScore >= 90) {
    grade = "A+";
    badge = "Border Master Explorer";
  } else if (averageScore >= 75) {
    grade = "A";
    badge = "Cartography Whiz";
  } else if (averageScore >= 60) {
    grade = "B";
    badge = "Regional Voyager";
  }

  return {
    totalQuestions: questionResults.length,
    averageScore,
    totalEarnedPoints: totalEarned,
    totalPossiblePoints: totalPossible,
    perfectQuestions: perfectCount,
    grade,
    badge
  };
}

/* --- Interactive DOM Controller --- */

class BorderNeighborsQuizApp {
  constructor() {
    this.questionCount = 5;
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.results = [];
    this.selectedOptions = new Set();
    this.hasSubmittedCurrent = false;

    this.initElements();
    this.bindEvents();
    this.startQuiz();
  }

  initElements() {
    this.questionCounterEl = document.getElementById("question-counter");
    this.scoreBadgeEl = document.getElementById("score-badge");
    this.targetStateNameEl = document.getElementById("target-state-name");
    this.targetStateMetaEl = document.getElementById("target-state-meta");
    this.optionsGridEl = document.getElementById("options-grid");
    this.submitBtn = document.getElementById("submit-btn");
    this.nextBtn = document.getElementById("next-btn");
    this.feedbackBannerEl = document.getElementById("feedback-banner");
    this.progressBarEl = document.getElementById("progress-bar-fill");
    this.quizCardEl = document.getElementById("quiz-card");
    this.resultsCardEl = document.getElementById("results-card");
    this.restartBtn = document.getElementById("restart-btn");
  }

  bindEvents() {
    if (this.submitBtn) {
      this.submitBtn.addEventListener("click", () => this.handleSubmit());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.handleNext());
    }
    if (this.restartBtn) {
      this.restartBtn.addEventListener("click", () => this.startQuiz());
    }

    // Theme toggle handler if present in navbar
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
      });
    }
  }

  startQuiz() {
    const allStateIds = Object.keys(STATE_ADJACENCY_MAP);
    const shuffled = [...allStateIds].sort(() => 0.5 - Math.random());
    this.questions = shuffled.slice(0, this.questionCount);

    this.currentQuestionIndex = 0;
    this.results = [];
    this.hasSubmittedCurrent = false;

    if (this.quizCardEl && this.resultsCardEl) {
      this.quizCardEl.style.display = "block";
      this.resultsCardEl.style.display = "none";
    }

    this.renderQuestion();
  }

  renderQuestion() {
    this.selectedOptions.clear();
    this.hasSubmittedCurrent = false;

    const targetId = this.questions[this.currentQuestionIndex];
    const targetState = STATE_ADJACENCY_MAP[targetId];

    if (this.questionCounterEl) {
      this.questionCounterEl.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questionCount}`;
    }

    if (this.progressBarEl) {
      const pct = ((this.currentQuestionIndex) / this.questionCount) * 100;
      this.progressBarEl.style.width = `${pct}%`;
    }

    if (this.targetStateNameEl) {
      this.targetStateNameEl.textContent = targetState.name;
    }

    if (this.targetStateMetaEl) {
      this.targetStateMetaEl.textContent = `Capital: ${targetState.capital} • Region: ${targetState.region} • Select ALL states that share a land border!`;
    }

    if (this.feedbackBannerEl) {
      this.feedbackBannerEl.className = "feedback-banner hidden";
      this.feedbackBannerEl.innerHTML = "";
    }

    if (this.submitBtn && this.nextBtn) {
      this.submitBtn.style.display = "inline-block";
      this.submitBtn.disabled = false;
      this.nextBtn.style.display = "none";
    }

    const options = generateQuestionOptions(targetId, 8, STATE_ADJACENCY_MAP);
    this.renderOptionsGrid(options);
  }

  renderOptionsGrid(options) {
    if (!this.optionsGridEl) return;
    this.optionsGridEl.innerHTML = "";

    options.forEach(opt => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "option-chip";
      card.dataset.stateId = opt.id;
      card.setAttribute("aria-pressed", "false");

      card.innerHTML = `
        <div class="chip-checkbox">
          <svg class="check-icon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div class="chip-content">
          <span class="chip-title">${opt.name}</span>
          <span class="chip-sub">${opt.capital ? opt.capital : "India"}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        if (this.hasSubmittedCurrent) return;

        if (this.selectedOptions.has(opt.id)) {
          this.selectedOptions.delete(opt.id);
          card.classList.remove("selected");
          card.setAttribute("aria-pressed", "false");
        } else {
          this.selectedOptions.add(opt.id);
          card.classList.add("selected");
          card.setAttribute("aria-pressed", "true");
        }
      });

      this.optionsGridEl.appendChild(card);
    });
  }

  handleSubmit() {
    if (this.hasSubmittedCurrent) return;
    this.hasSubmittedCurrent = true;

    const targetId = this.questions[this.currentQuestionIndex];
    const selectedArray = Array.from(this.selectedOptions);
    const scoreResult = calculatePartialCredit(targetId, selectedArray, STATE_ADJACENCY_MAP);

    this.results.push(scoreResult);

    // Disable grid buttons & highlight answers
    const chips = this.optionsGridEl.querySelectorAll(".option-chip");
    chips.forEach(chip => {
      chip.disabled = true;
      const id = chip.dataset.stateId;

      if (scoreResult.tp.includes(id)) {
        chip.classList.add("correct-tp");
      } else if (scoreResult.fp.includes(id)) {
        chip.classList.add("wrong-fp");
      } else if (scoreResult.fn.includes(id)) {
        chip.classList.add("missed-fn");
      }
    });

    // Render feedback banner
    if (this.feedbackBannerEl) {
      this.feedbackBannerEl.className = "feedback-banner visible";
      let statusClass = "partial";
      let statusTitle = "Partial Credit!";

      if (scoreResult.isPerfect) {
        statusClass = "perfect";
        statusTitle = "🎉 Perfect! All Border Neighbors Found!";
      } else if (scoreResult.scorePercentage === 0) {
        statusClass = "zero";
        statusTitle = "❌ No Neighbors Correct!";
      }

      this.feedbackBannerEl.classList.add(statusClass);

      const actualNames = scoreResult.actualNeighbors
        .map(id => STATE_ADJACENCY_MAP[id] ? STATE_ADJACENCY_MAP[id].name : id)
        .join(", ");

      this.feedbackBannerEl.innerHTML = `
        <div class="feedback-header">
          <span class="feedback-title">${statusTitle}</span>
          <span class="feedback-score-pill">${scoreResult.scorePercentage}% (+${scoreResult.earnedPoints} pts)</span>
        </div>
        <p class="feedback-details">
          Correct: ${scoreResult.tp.length}/${scoreResult.totalCorrect} • 
          False Guesses: ${scoreResult.fp.length} • 
          Missed: ${scoreResult.fn.length}
        </p>
        <p class="feedback-actual"><strong>Actual Neighbors:</strong> ${actualNames}</p>
      `;
    }

    if (this.submitBtn) this.submitBtn.style.display = "none";
    if (this.nextBtn) {
      this.nextBtn.style.display = "inline-block";
      this.nextBtn.focus();
    }
  }

  handleNext() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questionCount) {
      this.renderQuestion();
    } else {
      this.renderFinalResults();
    }
  }

  renderFinalResults() {
    if (this.progressBarEl) this.progressBarEl.style.width = "100%";
    if (this.quizCardEl) this.quizCardEl.style.display = "none";
    if (this.resultsCardEl) this.resultsCardEl.style.display = "block";

    const summary = summarizeQuizPerformance(this.results);

    const scorePctEl = document.getElementById("final-score-pct");
    const gradeBadgeEl = document.getElementById("final-grade-badge");
    const titleBadgeEl = document.getElementById("final-title-badge");
    const breakdownEl = document.getElementById("results-breakdown");

    if (scorePctEl) scorePctEl.textContent = `${summary.averageScore}%`;
    if (gradeBadgeEl) gradeBadgeEl.textContent = `Grade: ${summary.grade}`;
    if (titleBadgeEl) titleBadgeEl.textContent = summary.badge;

    if (breakdownEl) {
      breakdownEl.innerHTML = "";
      this.results.forEach((res, idx) => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.innerHTML = `
          <div class="result-item-header">
            <span class="result-q-num">Q${idx + 1}: ${res.targetStateName}</span>
            <span class="result-q-score">${res.scorePercentage}%</span>
          </div>
          <div class="result-item-sub">
            Found ${res.tp.length}/${res.totalCorrect} neighbors • ${res.fp.length} false selections
          </div>
        `;
        breakdownEl.appendChild(item);
      });
    }
  }
}

// Auto-initialize on DOM load in browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.BorderNeighborsQuiz = {
    STATE_ADJACENCY_MAP,
    calculatePartialCredit,
    generateQuestionOptions,
    verifyBorderSymmetry,
    summarizeQuizPerformance,
    BorderNeighborsQuizApp
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("options-grid")) {
      new BorderNeighborsQuizApp();
    }
  });
}

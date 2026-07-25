
document.addEventListener("DOMContentLoaded", () => {
  const allDances = [{"dance": "Bhangra", "state": "Punjab", "region": "North India", "fact": "Bhangra is an energetic harvest dance traditionally associated with Punjab.", "emoji": "🌾", "difficulty": "Easy"}, {"dance": "Garba", "state": "Gujarat", "region": "West India", "fact": "Garba is performed in circular formations, especially during Navratri.", "emoji": "🪔", "difficulty": "Easy"}, {"dance": "Ghoomar", "state": "Rajasthan", "region": "West India", "fact": "Ghoomar is known for graceful twirls and colourful flowing costumes.", "emoji": "💃", "difficulty": "Easy"}, {"dance": "Lavani", "state": "Maharashtra", "region": "West India", "fact": "Lavani is known for powerful rhythm, expressive performance, and dholki beats.", "emoji": "🥁", "difficulty": "Medium"}, {"dance": "Bihu", "state": "Assam", "region": "Northeast India", "fact": "Bihu celebrates Assamese culture and is closely connected with seasonal festivals.", "emoji": "🎋", "difficulty": "Easy"}, {"dance": "Cheraw", "state": "Mizoram", "region": "Northeast India", "fact": "Cheraw is also called the bamboo dance because dancers step between moving bamboo poles.", "emoji": "🎍", "difficulty": "Hard"}, {"dance": "Yakshagana", "state": "Karnataka", "region": "South India", "fact": "Yakshagana blends dance, music, costume, dialogue, and mythological storytelling.", "emoji": "🎭", "difficulty": "Hard"}, {"dance": "Dollu Kunitha", "state": "Karnataka", "region": "South India", "fact": "Dollu Kunitha is a powerful drum dance from Karnataka performed with large drums.", "emoji": "🪘", "difficulty": "Medium"}, {"dance": "Pulikali", "state": "Kerala", "region": "South India", "fact": "Pulikali features performers painted like tigers during festive celebrations.", "emoji": "🐅", "difficulty": "Medium"}, {"dance": "Dalkhai", "state": "Odisha", "region": "East India", "fact": "Dalkhai is a popular folk dance of western Odisha, often performed during festivals.", "emoji": "🌼", "difficulty": "Hard"}, {"dance": "Chhau", "state": "Jharkhand", "region": "East India", "fact": "Chhau is a masked dance tradition associated with martial and mythological themes.", "emoji": "🛡️", "difficulty": "Medium"}, {"dance": "Nati", "state": "Himachal Pradesh", "region": "North India", "fact": "Nati is a group folk dance from Himachal Pradesh known for rhythmic chain formations.", "emoji": "🏔️", "difficulty": "Hard"}];
  const allStates = ["Assam", "Gujarat", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Maharashtra", "Mizoram", "Odisha", "Punjab", "Rajasthan"];
  const saveKey = "incredible-india-folk-dance-match-state";

  let game = {
    score: 0,
    matched: [],
    facts: [],
    attempts: 0,
  };

  let roundDances = [];
  let selectedDance = null;
  let draggedDance = null;
  let timer = 90;
  let timerId = null;

  const danceGrid = document.getElementById("dance-grid");
  const stateGrid = document.getElementById("state-grid");
  const factLog = document.getElementById("fact-log");
  const feedback = document.getElementById("feedback-card");
  const timedToggle = document.getElementById("timed-toggle");
  const difficultySelect = document.getElementById("difficulty-select");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(saveKey) || "null");
      if (saved && Array.isArray(saved.matched) && Array.isArray(saved.facts)) {
        game = saved;
      }
    } catch {
      game = { score: 0, matched: [], facts: [], attempts: 0 };
    }
  }

  function saveState() {
    localStorage.setItem(saveKey, JSON.stringify(game));
  }

  function filteredDances() {
    const difficulty = difficultySelect.value;
    return difficulty === "All"
      ? allDances
      : allDances.filter((item) => item.difficulty === difficulty);
  }

  function startTimer() {
    clearInterval(timerId);
    timer = 90;
    document.getElementById("timer-total").textContent = timer;

    if (!timedToggle.checked) {
      document.getElementById("timer-total").textContent = "∞";
      return;
    }

    timerId = setInterval(() => {
      timer -= 1;
      document.getElementById("timer-total").textContent = timer;

      if (timer <= 0) {
        clearInterval(timerId);
        feedback.innerHTML = "<strong>Time is up!</strong><br>Start a new round and try to match faster.";
        disableUnmatchedCards();
      }
    }, 1000);
  }

  function newRound() {
    selectedDance = null;
    draggedDance = null;
    const pool = filteredDances();
    roundDances = shuffle(pool).slice(0, Math.min(8, pool.length));
    feedback.innerHTML = "Pick a dance card to begin.";
    renderDances();
    renderStates();
    renderFacts();
    updateStats();
    startTimer();
  }

  function updateStats() {
    const roundMatched = roundDances.filter((item) => game.matched.includes(item.dance)).length;
    document.getElementById("score-total").textContent = game.score;
    document.getElementById("matched-total").textContent = `${roundMatched}/${roundDances.length}`;

    const rank = game.matched.length >= allDances.length
      ? "Folk dance master"
      : game.matched.length >= 8
        ? "Culture champion"
        : game.matched.length >= 4
          ? "Rhythm explorer"
          : "Culture learner";

    document.getElementById("rank-label").textContent = rank;
  }

  function renderDances() {
    danceGrid.innerHTML = roundDances.map((item) => {
      const matched = game.matched.includes(item.dance);
      return `
        <button
          class="dance-card ${matched ? "matched" : ""}"
          type="button"
          draggable="${matched ? "false" : "true"}"
          data-dance="${escapeHtml(item.dance)}"
          ${matched ? "disabled" : ""}
        >
          <strong>${escapeHtml(item.emoji)} ${escapeHtml(item.dance)}</strong>
          <span>${escapeHtml(item.region)} · ${escapeHtml(item.difficulty)}</span>
        </button>
      `;
    }).join("");

    danceGrid.querySelectorAll("[data-dance]").forEach((card) => {
      card.addEventListener("click", () => selectDance(card.dataset.dance));
      card.addEventListener("dragstart", () => {
        draggedDance = card.dataset.dance;
        card.classList.add("selected");
      });
      card.addEventListener("dragend", () => {
        draggedDance = null;
        card.classList.remove("selected");
      });
    });
  }

  function renderStates() {
    const states = shuffle([...new Set(roundDances.map((item) => item.state)), ...allStates])
      .filter((state, index, array) => array.indexOf(state) === index)
      .slice(0, Math.max(8, roundDances.length));

    stateGrid.innerHTML = states.map((state) => `
      <button class="state-target" type="button" data-state="${escapeHtml(state)}">
        ${escapeHtml(state)}
      </button>
    `).join("");

    stateGrid.querySelectorAll("[data-state]").forEach((target) => {
      target.addEventListener("click", () => {
        if (selectedDance) checkMatch(selectedDance, target.dataset.state, target);
      });

      target.addEventListener("dragover", (event) => {
        event.preventDefault();
        target.classList.add("drag-over");
      });

      target.addEventListener("dragleave", () => {
        target.classList.remove("drag-over");
      });

      target.addEventListener("drop", (event) => {
        event.preventDefault();
        target.classList.remove("drag-over");
        if (draggedDance) checkMatch(draggedDance, target.dataset.state, target);
      });
    });
  }

  function selectDance(danceName) {
    if (game.matched.includes(danceName)) return;

    selectedDance = danceName;
    document.querySelectorAll(".dance-card").forEach((card) => {
      card.classList.toggle("selected", card.dataset.dance === danceName);
    });

    feedback.innerHTML = `<strong>${escapeHtml(danceName)} selected.</strong><br>Now tap the correct state target.`;
  }

  function checkMatch(danceName, stateName, target) {
    const item = allDances.find((dance) => dance.dance === danceName);
    if (!item || game.matched.includes(item.dance)) return;

    game.attempts += 1;

    if (item.state === stateName) {
      const timedBonus = timedToggle.checked ? Math.max(0, Math.floor(timer / 10)) : 0;
      const earned = 10 + timedBonus;
      game.score += earned;
      game.matched.push(item.dance);

      if (!game.facts.includes(item.fact)) {
        game.facts.unshift(`${item.dance} — ${item.state}: ${item.fact}`);
      }

      target.classList.add("correct");
      feedback.innerHTML = `<strong>Correct! +${earned} points.</strong><br>${escapeHtml(item.dance)} belongs to ${escapeHtml(item.state)}. ${escapeHtml(item.fact)}`;
    } else {
      game.score = Math.max(0, game.score - 2);
      feedback.innerHTML = `<strong>Try again.</strong><br>${escapeHtml(item.dance)} is not from ${escapeHtml(stateName)}.`;
    }

    selectedDance = null;
    saveState();
    renderDances();
    renderFacts();
    updateStats();

    if (roundDances.every((dance) => game.matched.includes(dance.dance))) {
      clearInterval(timerId);
      feedback.innerHTML += "<br><br><strong>Round complete!</strong> Start a new round for more dances.";
    }
  }

  function renderFacts() {
    if (!game.facts.length) {
      factLog.innerHTML = '<div class="fact-item">Match a dance correctly to unlock your first fun fact.</div>';
      return;
    }

    factLog.innerHTML = game.facts
      .slice(0, 10)
      .map((fact) => {
        const [title, text] = fact.split(": ");
        return `<div class="fact-item"><strong>${escapeHtml(title)}:</strong> ${escapeHtml(text)}</div>`;
      })
      .join("");
  }

  function disableUnmatchedCards() {
    document.querySelectorAll(".dance-card:not(.matched)").forEach((card) => {
      card.disabled = true;
      card.draggable = false;
    });
  }

  function resetScore() {
    if (!confirm("Reset Folk Dance Match progress and score?")) return;
    game = { score: 0, matched: [], facts: [], attempts: 0 };
    saveState();
    newRound();
  }

  document.getElementById("new-round").addEventListener("click", newRound);
  document.getElementById("reset-score").addEventListener("click", resetScore);
  difficultySelect.addEventListener("change", newRound);
  timedToggle.addEventListener("change", startTimer);

  loadState();
  newRound();

  window.FolkDanceMatchChallenge = {
    dances: () => [...allDances],
    state: () => ({ ...game }),
    newRound,
  };
});

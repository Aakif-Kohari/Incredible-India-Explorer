// script.js — Spice Route Challenge
// Depends on INDIA_MAP (map-data.js) and SPICES / HISTORIC_PORTS (spice-data.js)

(function () {
  "use strict";

  // Port coordinates projected with the exact same equirectangular projection
  // used to generate INDIA_MAP (see /scripts/build-map-data.py in the PR),
  // so they line up correctly with the state paths.
  const PORT_COORDS = {
    muziris: { x: 165.3, y: 590.56 },
    calicut: { x: 156.74, y: 568.0 },
    surat: { x: 96.55, y: 349.95 },
    masulipatnam: { x: 266.1, y: 459.57 },
    goa: { x: 118.61, y: 474.68 }
  };

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.getElementById("india-svg");
  const statesLayer = document.getElementById("states-layer");
  const routeLayer = document.getElementById("route-layer");
  const portLayer = document.getElementById("port-layer");

  const els = {
    round: document.getElementById("stat-round"),
    score: document.getElementById("stat-score"),
    streak: document.getElementById("stat-streak"),
    restart: document.getElementById("btn-restart"),
    emoji: document.getElementById("spice-emoji"),
    name: document.getElementById("spice-name"),
    local: document.getElementById("spice-local"),
    clue: document.getElementById("spice-clue"),
    difficulty: document.getElementById("spice-difficulty"),
    feedback: document.getElementById("feedback"),
    next: document.getElementById("btn-next"),
    mapHint: document.getElementById("map-hint"),
    routePanel: document.getElementById("route-panel"),
    routeText: document.getElementById("route-text"),
    learnGrid: document.getElementById("learn-grid")
  };

  const TOTAL_ROUNDS = SPICES.length;

  let state = {
    order: [],
    roundIndex: 0,
    score: 0,
    streak: 0,
    locked: false
  };

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- Map rendering ----------
  function renderMap() {
    svg.setAttribute("viewBox", `0 0 ${INDIA_MAP.width} ${INDIA_MAP.height}`);
    statesLayer.innerHTML = "";
    Object.keys(INDIA_MAP.states).forEach((stateName) => {
      const info = INDIA_MAP.states[stateName];
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", info.path);
      path.setAttribute("class", "state-path");
      path.setAttribute("data-state", stateName);
      path.addEventListener("click", () => handleGuess(stateName));
      statesLayer.appendChild(path);
    });
  }

  function getStatePathEl(stateName) {
    return statesLayer.querySelector(`[data-state="${CSS.escape(stateName)}"]`);
  }

  function resetMapColors() {
    statesLayer.querySelectorAll(".state-path").forEach((p) => {
      p.classList.remove("correct", "wrong", "disabled");
    });
  }

  function lockMap() {
    statesLayer.querySelectorAll(".state-path").forEach((p) => p.classList.add("disabled"));
  }

  function drawRouteAndPort(spice) {
    routeLayer.innerHTML = "";
    portLayer.innerHTML = "";

    const originInfo = INDIA_MAP.states[spice.originState];
    const port = HISTORIC_PORTS[spice.port];
    const portXY = PORT_COORDS[spice.port];
    if (!originInfo || !port || !portXY) return;

    // Route line (simple curve from origin centroid to port)
    const x1 = originInfo.cx, y1 = originInfo.cy;
    const x2 = portXY.x, y2 = portXY.y;
    const midX = (x1 + x2) / 2 - (y2 - y1) * 0.15;
    const midY = (y1 + y2) / 2 + (x2 - x1) * 0.15;

    const line = document.createElementNS(NS, "path");
    line.setAttribute("d", `M ${x1},${y1} Q ${midX},${midY} ${x2},${y2}`);
    line.setAttribute("class", "route-line");
    routeLayer.appendChild(line);

    const marker = document.createElementNS(NS, "g");
    marker.setAttribute("class", "port-marker");
    marker.innerHTML = `
      <circle cx="${x2}" cy="${y2}" r="5"></circle>
      <text x="${x2 + 8}" y="${y2 + 4}">${port.name}</text>
    `;
    portLayer.appendChild(marker);
  }

  // ---------- Game flow ----------
  function startGame() {
    state = { order: shuffled(SPICES), roundIndex: 0, score: 0, streak: 0, locked: false };
    updateHud();
    loadRound();
  }

  function updateHud() {
    els.round.textContent = `${Math.min(state.roundIndex + 1, TOTAL_ROUNDS)} / ${TOTAL_ROUNDS}`;
    els.score.textContent = state.score;
    els.streak.textContent = `${state.streak} 🔥`;
  }

  function currentSpice() {
    return state.order[state.roundIndex];
  }

  function loadRound() {
    resetMapColors();
    routeLayer.innerHTML = "";
    portLayer.innerHTML = "";
    els.routePanel.hidden = true;
    els.feedback.className = "feedback";
    els.feedback.textContent = "";
    els.next.hidden = true;
    els.mapHint.textContent = "Click the state where you think this spice originates.";
    state.locked = false;

    const spice = currentSpice();
    if (!spice) {
      finishGame();
      return;
    }
    els.emoji.textContent = spice.emoji;
    els.name.textContent = spice.name;
    els.local.textContent = spice.localNames;
    els.clue.textContent = spice.clue;
    els.difficulty.textContent = spice.difficulty;
    els.difficulty.className = "difficulty-badge " + spice.difficulty;
    updateHud();
  }

  function handleGuess(guessedState) {
    if (state.locked) return;
    const spice = currentSpice();
    if (!spice) return;
    state.locked = true;
    lockMap();

    const correct = guessedState === spice.originState;
    const guessedEl = getStatePathEl(guessedState);
    const correctEl = getStatePathEl(spice.originState);

    if (correct) {
      if (guessedEl) guessedEl.classList.add("correct");
      state.score += spice.difficulty === "hard" ? 15 : spice.difficulty === "medium" ? 10 : 5;
      state.streak += 1;
      showFeedback(true, spice);
    } else {
      if (guessedEl) guessedEl.classList.add("wrong");
      if (correctEl) correctEl.classList.add("correct");
      state.streak = 0;
      showFeedback(false, spice);
    }

    updateHud();
    drawRouteAndPort(spice);
    revealRoutePanel(spice);
    els.next.hidden = false;
    els.mapHint.textContent = "Round complete — read the trade route story, then continue.";
  }

  function showFeedback(correct, spice) {
    els.feedback.classList.add("show", correct ? "correct" : "wrong");
    if (correct) {
      els.feedback.textContent = `✅ Correct! ${spice.name} traces back to ${spice.originState}.`;
    } else {
      els.feedback.textContent = `❌ Not quite. ${spice.name} actually comes from ${spice.originState}.`;
    }
  }

  function revealRoutePanel(spice) {
    const port = HISTORIC_PORTS[spice.port];
    els.routePanel.hidden = false;
    const transplantNote = spice.isTransplant
      ? ` Note: ${spice.name} was originally introduced from elsewhere and later took root here.`
      : "";
    els.routeText.textContent =
      `${spice.history} It reached the wider world through ${port.name} (${port.state}). ${port.note}${transplantNote} ${spice.funFact}`;
  }

  function nextRound() {
    state.roundIndex += 1;
    if (state.roundIndex >= TOTAL_ROUNDS) {
      finishGame();
      return;
    }
    loadRound();
  }

  function finishGame() {
    els.mapHint.textContent = `Game complete! Final score: ${state.score}. Click Restart to play again.`;
    els.next.hidden = true;
    els.clue.textContent = `🏁 You've traced all ${TOTAL_ROUNDS} spices across India's trade routes. Final score: ${state.score}.`;
    els.name.textContent = "Journey Complete";
    els.local.textContent = "";
    els.difficulty.textContent = "";
    els.feedback.className = "feedback";
    els.feedback.textContent = "";
    lockMap();
  }

  // ---------- Learn tab ----------
  function renderLearnCards() {
    els.learnGrid.innerHTML = "";
    SPICES.forEach((spice) => {
      const port = HISTORIC_PORTS[spice.port];
      const card = document.createElement("div");
      card.className = "flip-card";
      card.innerHTML = `
        <div class="flip-inner">
          <div class="flip-front">
            <span class="fc-emoji">${spice.emoji}</span>
            <strong>${spice.name}</strong>
            <span style="color: var(--text-dim); font-size: 0.8rem;">${spice.originState}</span>
          </div>
          <div class="flip-back">
            <h4>${spice.name}</h4>
            <p>${spice.history}</p>
            <p>Trade port: <strong>${port.name}</strong>, ${port.state}.</p>
            <p class="fun-fact">${spice.funFact}</p>
          </div>
        </div>
      `;
      card.addEventListener("click", () => card.classList.toggle("flipped"));
      els.learnGrid.appendChild(card);
    });
  }

  // ---------- Tabs ----------
  function setupTabs() {
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
      });
    });
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    renderMap();
    renderLearnCards();
    setupTabs();
    startGame();
    els.next.addEventListener("click", nextRound);
    els.restart.addEventListener("click", startGame);
  });
})();

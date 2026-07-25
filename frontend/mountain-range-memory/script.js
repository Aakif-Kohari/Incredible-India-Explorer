
document.addEventListener("DOMContentLoaded", () => {
  const peakPairs = [{"peak": "Kangchenjunga", "range": "Himalayas", "state": "Sikkim", "fact": "Kangchenjunga is India's highest mountain peak and stands in the eastern Himalayas."}, {"peak": "Nanda Devi", "range": "Himalayas", "state": "Uttarakhand", "fact": "Nanda Devi is one of India's most iconic Himalayan peaks and part of a famous biosphere reserve."}, {"peak": "Kamet", "range": "Himalayas", "state": "Uttarakhand", "fact": "Kamet is a high Garhwal Himalayan peak near the Indo-Tibetan border region."}, {"peak": "Trisul", "range": "Himalayas", "state": "Uttarakhand", "fact": "Trisul is a group of three Himalayan peaks whose name refers to Lord Shiva's trident."}, {"peak": "Anamudi", "range": "Western Ghats", "state": "Kerala", "fact": "Anamudi is the highest peak in the Western Ghats and South India."}, {"peak": "Doddabetta", "range": "Western Ghats", "state": "Tamil Nadu", "fact": "Doddabetta is the highest peak in the Nilgiri Hills."}, {"peak": "Mullayanagiri", "range": "Western Ghats", "state": "Karnataka", "fact": "Mullayanagiri is Karnataka's highest peak and is part of the Western Ghats."}, {"peak": "Kalsubai", "range": "Western Ghats", "state": "Maharashtra", "fact": "Kalsubai is Maharashtra's highest peak and is often called the Everest of Maharashtra."}, {"peak": "Guru Shikhar", "range": "Aravalli Range", "state": "Rajasthan", "fact": "Guru Shikhar is the highest point of the Aravalli Range near Mount Abu."}, {"peak": "Achalgarh", "range": "Aravalli Range", "state": "Rajasthan", "fact": "Achalgarh is located in the Mount Abu region of the Aravalli Range."}, {"peak": "Dhupgarh", "range": "Satpura Range", "state": "Madhya Pradesh", "fact": "Dhupgarh is the highest point in Madhya Pradesh and lies in the Satpura Range."}, {"peak": "Mahendragiri", "range": "Eastern Ghats", "state": "Odisha", "fact": "Mahendragiri is an important peak of the Eastern Ghats known for biodiversity and mythology."}, {"peak": "Jindhagada Peak", "range": "Eastern Ghats", "state": "Andhra Pradesh", "fact": "Jindhagada is among the highest peaks of the Eastern Ghats in Andhra Pradesh."}, {"peak": "Betlingchhip", "range": "Jampui Hills", "state": "Tripura", "fact": "Betlingchhip is Tripura's highest point, located in the Jampui Hills."}];
  const recordKey = "incredible-india-mountain-range-memory-records";

  let cards = [];
  let flipped = [];
  let matchedPairs = [];
  let moves = 0;
  let seconds = 0;
  let timerId = null;
  let locked = false;
  let gameStarted = false;
  let records = readRecords();

  const board = document.getElementById("memory-board");
  const factLog = document.getElementById("fact-log");
  const feedback = document.getElementById("feedback-card");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function readRecords() {
    try {
      const parsed = JSON.parse(localStorage.getItem(recordKey) || "{}");
      return {
        bestMoves: Number(parsed.bestMoves) || null,
        bestTime: Number(parsed.bestTime) || null,
      };
    } catch {
      return { bestMoves: null, bestTime: null };
    }
  }

  function saveRecords() {
    localStorage.setItem(recordKey, JSON.stringify(records));
  }

  function formatTime(value) {
    const mins = String(Math.floor(value / 60)).padStart(2, "0");
    const secs = String(value % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function buildCards() {
    cards = shuffle(peakPairs.flatMap((pair, index) => [
      {
        id: `${index}-peak`,
        pairId: index,
        type: "Peak",
        label: pair.peak,
        sub: pair.state,
      },
      {
        id: `${index}-range`,
        pairId: index,
        type: "Range",
        label: pair.range,
        sub: "Mountain range",
      },
    ]));
  }

  function startTimer() {
    if (gameStarted) return;
    gameStarted = true;
    timerId = setInterval(() => {
      seconds += 1;
      updateStats();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }

  function updateStats() {
    document.getElementById("moves-total").textContent = moves;
    document.getElementById("moves-count").textContent = moves;
    document.getElementById("timer-total").textContent = formatTime(seconds);
    document.getElementById("time-count").textContent = formatTime(seconds);
    document.getElementById("matches-total").textContent = `${matchedPairs.length}/${peakPairs.length}`;
    document.getElementById("best-moves").textContent = records.bestMoves ? records.bestMoves : "--";
    document.getElementById("best-time").textContent = records.bestTime ? formatTime(records.bestTime) : "--";

    const rank = matchedPairs.length >= peakPairs.length
      ? "Range master"
      : matchedPairs.length >= 9
        ? "Peak expert"
        : matchedPairs.length >= 5
          ? "Mountain mapper"
          : "Range learner";

    document.getElementById("rank-label").textContent = rank;
    document.getElementById("board-status").textContent = `${peakPairs.length - matchedPairs.length} pairs remaining`;
  }

  function renderBoard() {
    board.innerHTML = cards.map((card) => {
      const matched = matchedPairs.includes(card.pairId);
      const isFlipped = flipped.some((item) => item.id === card.id);

      return `
        <button
          class="memory-card ${matched ? "matched" : ""} ${isFlipped ? "flipped" : ""}"
          type="button"
          data-card="${escapeHtml(card.id)}"
          ${matched ? "disabled" : ""}
        >
          <span class="card-inner">
            <span class="card-face card-front">⛰️</span>
            <span class="card-face card-back">
              <span>
                <strong>${escapeHtml(card.label)}</strong>
                <span>${escapeHtml(card.type)} · ${escapeHtml(card.sub)}</span>
              </span>
            </span>
          </span>
        </button>
      `;
    }).join("");

    board.querySelectorAll("[data-card]").forEach((button) => {
      button.addEventListener("click", () => flipCard(button.dataset.card));
    });
  }

  function flipCard(cardId) {
    if (locked) return;
    const card = cards.find((item) => item.id === cardId);
    if (!card || matchedPairs.includes(card.pairId) || flipped.some((item) => item.id === cardId)) {
      return;
    }

    startTimer();
    flipped.push(card);
    renderBoard();

    if (flipped.length === 2) {
      moves += 1;
      checkPair();
    }

    updateStats();
  }

  function checkPair() {
    const [first, second] = flipped;
    locked = true;

    const isMatch = first.pairId === second.pairId && first.type !== second.type;

    if (isMatch) {
      setTimeout(() => {
        matchedPairs.push(first.pairId);
        const pair = peakPairs[first.pairId];
        feedback.innerHTML = `<strong>Matched!</strong><br>${escapeHtml(pair.peak)} belongs to the ${escapeHtml(pair.range)}.`;
        flipped = [];
        locked = false;
        renderBoard();
        renderFacts();
        updateStats();

        if (matchedPairs.length === peakPairs.length) {
          finishGame();
        }
      }, 450);
    } else {
      setTimeout(() => {
        feedback.innerHTML = "<strong>Not a pair.</strong><br>Try matching one peak card with its correct range card.";
        flipped = [];
        locked = false;
        renderBoard();
        updateStats();
      }, 850);
    }
  }

  function renderFacts() {
    const facts = matchedPairs.map((pairId) => peakPairs[pairId]);
    if (!facts.length) {
      factLog.innerHTML = '<div class="fact-item">Match a pair to unlock your first mountain fact.</div>';
      return;
    }

    factLog.innerHTML = facts
      .map((pair) => `
        <div class="fact-item">
          <strong>${escapeHtml(pair.peak)} — ${escapeHtml(pair.range)}</strong><br>
          ${escapeHtml(pair.fact)}
        </div>
      `)
      .join("");
  }

  function finishGame() {
    stopTimer();

    const bestMoveMessage = !records.bestMoves || moves < records.bestMoves
      ? " New best moves!"
      : "";

    const bestTimeMessage = !records.bestTime || seconds < records.bestTime
      ? " New best time!"
      : "";

    if (!records.bestMoves || moves < records.bestMoves) {
      records.bestMoves = moves;
    }

    if (!records.bestTime || seconds < records.bestTime) {
      records.bestTime = seconds;
    }

    saveRecords();
    feedback.innerHTML = `<strong>Game complete!</strong><br>You matched all ${peakPairs.length} peak-range pairs in ${moves} moves and ${formatTime(seconds)}.${bestMoveMessage}${bestTimeMessage}`;
    updateStats();
  }

  function newGame() {
    stopTimer();
    flipped = [];
    matchedPairs = [];
    moves = 0;
    seconds = 0;
    locked = false;
    gameStarted = false;
    buildCards();
    renderBoard();
    renderFacts();
    updateStats();
    feedback.innerHTML = "Flip a peak card and a range card to begin.";
  }

  function peekCards() {
    if (locked) return;
    locked = true;
    board.querySelectorAll(".memory-card").forEach((card) => card.classList.add("flipped"));
    feedback.innerHTML = "<strong>Peek mode!</strong><br>Study the board for 3 seconds.";

    setTimeout(() => {
      locked = false;
      renderBoard();
      feedback.innerHTML = "Peek ended. Continue matching.";
    }, 3000);
  }

  function resetRecords() {
    if (!confirm("Reset best time and best moves?")) return;
    records = { bestMoves: null, bestTime: null };
    saveRecords();
    updateStats();
    feedback.innerHTML = "<strong>Records reset.</strong><br>Your current board is unchanged.";
  }

  document.getElementById("new-game").addEventListener("click", newGame);
  document.getElementById("peek-button").addEventListener("click", peekCards);
  document.getElementById("reset-records").addEventListener("click", resetRecords);

  newGame();

  window.MountainRangeMemory = {
    pairs: () => [...peakPairs],
    newGame,
  };
});

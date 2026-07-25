
document.addEventListener("DOMContentLoaded", () => {
  const places = [{"name": "Kangchenjunga", "type": "Peak", "state": "Sikkim", "range": "Himalayas", "elevation": 8586, "hint": "India's highest peak, shared with the eastern Himalayan region.", "fact": "Kangchenjunga is India's highest peak and one of the world's highest mountains."}, {"name": "Nanda Devi", "type": "Peak", "state": "Uttarakhand", "range": "Himalayas", "elevation": 7816, "hint": "A famous Garhwal Himalayan peak inside a protected biosphere region.", "fact": "Nanda Devi is one of India's most iconic Himalayan peaks and is surrounded by a protected national park landscape."}, {"name": "Kamet", "type": "Peak", "state": "Uttarakhand", "range": "Himalayas", "elevation": 7756, "hint": "A high peak close to the Indo-Tibetan border region.", "fact": "Kamet is one of the tallest peaks in the Garhwal Himalayas."}, {"name": "Saltoro Kangri", "type": "Peak", "state": "Ladakh", "range": "Karakoram", "elevation": 7742, "hint": "A very high Karakoram peak near the Saltoro range.", "fact": "Saltoro Kangri is part of the Karakoram mountain system in Ladakh."}, {"name": "Saser Kangri I", "type": "Peak", "state": "Ladakh", "range": "Karakoram", "elevation": 7672, "hint": "A major Karakoram peak in the Saser Muztagh.", "fact": "Saser Kangri I is among the highest peaks in the Karakoram region of India."}, {"name": "Anamudi", "type": "Peak", "state": "Kerala", "range": "Western Ghats", "elevation": 2695, "hint": "The highest peak of South India and the Western Ghats.", "fact": "Anamudi is the highest peak in the Western Ghats and South India."}, {"name": "Doddabetta", "type": "Peak", "state": "Tamil Nadu", "range": "Nilgiri Hills", "elevation": 2637, "hint": "The highest point of the Nilgiri Hills near Ooty.", "fact": "Doddabetta is the highest peak in the Nilgiri Hills."}, {"name": "Mullayanagiri", "type": "Peak", "state": "Karnataka", "range": "Western Ghats", "elevation": 1930, "hint": "The highest peak in Karnataka.", "fact": "Mullayanagiri is Karnataka's highest peak and a popular trekking destination."}, {"name": "Kalsubai", "type": "Peak", "state": "Maharashtra", "range": "Western Ghats", "elevation": 1646, "hint": "Known as the Everest of Maharashtra.", "fact": "Kalsubai is the highest peak in Maharashtra."}, {"name": "Guru Shikhar", "type": "Peak", "state": "Rajasthan", "range": "Aravalli Range", "elevation": 1722, "hint": "The highest point of Rajasthan and the Aravalli Range.", "fact": "Guru Shikhar is the highest peak in the Aravalli Range."}, {"name": "Dhupgarh", "type": "Peak", "state": "Madhya Pradesh", "range": "Satpura Range", "elevation": 1352, "hint": "The highest point of Madhya Pradesh, near Pachmarhi.", "fact": "Dhupgarh is the highest point in Madhya Pradesh and part of the Satpura Range."}, {"name": "Shillong Plateau", "type": "Plateau", "state": "Meghalaya", "range": "Meghalaya Plateau", "elevation": 1965, "hint": "A high plateau region in Meghalaya, famous for heavy rainfall landscapes.", "fact": "The Shillong Plateau forms a major upland region of Meghalaya."}, {"name": "Deccan Plateau", "type": "Plateau", "state": "Peninsular India", "range": "Deccan Plateau", "elevation": 600, "hint": "A large peninsular plateau covering much of central and southern India.", "fact": "The Deccan Plateau is a vast highland region of peninsular India."}, {"name": "Chota Nagpur Plateau", "type": "Plateau", "state": "Jharkhand region", "range": "Chota Nagpur Plateau", "elevation": 700, "hint": "A mineral-rich plateau region in eastern India.", "fact": "The Chota Nagpur Plateau is known for minerals, forests, and waterfalls."}];
  const leaderboardKey = "incredible-india-highest-point-leaderboard";

  const roundLimit = 10;
  let deck = [];
  let roundIndex = 0;
  let score = 0;
  let guesses = [];
  let current = null;
  let answered = false;
  let leaderboard = readLeaderboard();

  const slider = document.getElementById("guess-slider");
  const numberInput = document.getElementById("guess-number");
  const resultCard = document.getElementById("result-card");
  const leaderboardGrid = document.getElementById("leaderboard-grid");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function readLeaderboard() {
    try {
      const parsed = JSON.parse(localStorage.getItem(leaderboardKey) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveLeaderboard() {
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
  }

  function formatMetres(value) {
    return `${Number(value).toLocaleString("en-IN")} m`;
  }

  function calculateRoundScore(guess, actual) {
    const error = Math.abs(guess - actual);
    const errorPercent = error / Math.max(actual, 1);
    return Math.max(0, Math.round(100 - (errorPercent * 100)));
  }

  function averageError() {
    if (!guesses.length) return null;
    const total = guesses.reduce((sum, item) => sum + item.error, 0);
    return Math.round(total / guesses.length);
  }

  function closestError() {
    if (!guesses.length) return null;
    return Math.min(...guesses.map((item) => item.error));
  }

  function updateGuessReadout() {
    const value = Number(slider.value);
    document.getElementById("guess-value").textContent = formatMetres(value);
    numberInput.value = value;
  }

  function syncNumberToSlider() {
    const clean = Math.max(0, Math.min(9000, Number(numberInput.value) || 0));
    slider.value = clean;
    document.getElementById("guess-value").textContent = formatMetres(clean);
  }

  function updateStats() {
    const avg = averageError();
    const closest = closestError();

    document.getElementById("score-total").textContent = score;
    document.getElementById("score-count").textContent = score;
    document.getElementById("round-total").textContent = `${Math.min(roundIndex + 1, roundLimit)}/${roundLimit}`;
    document.getElementById("round-count").textContent = `${Math.min(roundIndex, roundLimit)}/${roundLimit}`;
    document.getElementById("average-total").textContent = avg === null ? "--" : formatMetres(avg);
    document.getElementById("average-error").textContent = avg === null ? "--" : formatMetres(avg);
    document.getElementById("closest-error").textContent = closest === null ? "--" : formatMetres(closest);

    const rank = score >= 850
      ? "Elevation master"
      : score >= 600
        ? "Mountain mapper"
        : score >= 300
          ? "Altitude explorer"
          : "Elevation rookie";

    document.getElementById("rank-label").textContent = rank;
  }

  function renderPlace() {
    current = deck[roundIndex];

    if (!current || roundIndex >= roundLimit) {
      finishGame();
      return;
    }

    answered = false;
    slider.value = 4500;
    numberInput.value = 4500;
    updateGuessReadout();

    document.getElementById("round-label").textContent = `Round ${roundIndex + 1} of ${roundLimit}`;
    document.getElementById("place-type").textContent = current.type;
    document.getElementById("place-name").textContent = current.name;
    document.getElementById("place-meta").textContent = `${current.state} · ${current.range}`;
    document.getElementById("place-hint").textContent = current.hint;
    resultCard.innerHTML = "Make your elevation estimate, then submit your guess.";
    updateStats();
  }

  function submitGuess() {
    if (answered || !current) return;
    answered = true;

    const guess = Number(numberInput.value);
    const actual = current.elevation;
    const error = Math.abs(guess - actual);
    const roundScore = calculateRoundScore(guess, actual);
    score += roundScore;

    guesses.push({
      name: current.name,
      guess,
      actual,
      error,
      score: roundScore,
    });

    leaderboard.push({
      name: current.name,
      guess,
      actual,
      error,
      score: roundScore,
      date: new Date().toISOString(),
    });

    leaderboard = leaderboard
      .sort((a, b) => a.error - b.error || b.score - a.score)
      .slice(0, 12);

    saveLeaderboard();

    resultCard.innerHTML = `
      <strong>${roundScore} points!</strong><br>
      Your guess: ${formatMetres(guess)}<br>
      Actual elevation: <strong>${formatMetres(actual)}</strong><br>
      Error: ${formatMetres(error)}<br>
      ${escapeHtml(current.fact)}
    `;

    renderLeaderboard();
    updateStats();

    setTimeout(() => {
      roundIndex += 1;
      renderPlace();
    }, 1800);
  }

  function skipPlace() {
    if (!current) return;
    guesses.push({
      name: current.name,
      guess: null,
      actual: current.elevation,
      error: current.elevation,
      score: 0,
    });
    resultCard.innerHTML = `<strong>Skipped.</strong><br>${escapeHtml(current.name)} is ${formatMetres(current.elevation)}. ${escapeHtml(current.fact)}`;
    roundIndex += 1;
    updateStats();
    setTimeout(renderPlace, 900);
  }

  function finishGame() {
    current = null;
    document.getElementById("round-label").textContent = "Game complete";
    document.getElementById("place-type").textContent = "Summary";
    document.getElementById("place-name").textContent = "Challenge Complete";
    document.getElementById("place-meta").textContent = `${guesses.length} guesses completed`;
    document.getElementById("place-hint").textContent = "Start a new game to improve your elevation accuracy.";
    resultCard.innerHTML = `<strong>Final score: ${score}</strong><br>Average error: ${averageError() === null ? "--" : formatMetres(averageError())}. Check the leaderboard for your closest guesses.`;
    updateStats();
  }

  function renderLeaderboard() {
    if (!leaderboard.length) {
      leaderboardGrid.innerHTML = '<div class="leader-card">Submit a guess to create your first local leaderboard entry.</div>';
      return;
    }

    leaderboardGrid.innerHTML = leaderboard.map((entry, index) => `
      <div class="leader-card">
        <strong>#${index + 1} ${escapeHtml(entry.name)}</strong>
        <span>Error: ${formatMetres(entry.error)}</span>
        Guess ${formatMetres(entry.guess)} · Actual ${formatMetres(entry.actual)} · ${entry.score} pts
      </div>
    `).join("");
  }

  function newGame() {
    deck = shuffle(places).slice(0, roundLimit);
    roundIndex = 0;
    score = 0;
    guesses = [];
    current = null;
    answered = false;
    renderPlace();
  }

  function resetLeaderboard() {
    if (!confirm("Reset Highest Point Challenge leaderboard?")) return;
    leaderboard = [];
    saveLeaderboard();
    renderLeaderboard();
    resultCard.innerHTML = "<strong>Leaderboard reset.</strong><br>Your current game is unchanged.";
  }

  slider.addEventListener("input", updateGuessReadout);
  numberInput.addEventListener("input", syncNumberToSlider);
  document.getElementById("submit-guess").addEventListener("click", submitGuess);
  document.getElementById("skip-place").addEventListener("click", skipPlace);
  document.getElementById("new-game").addEventListener("click", newGame);
  document.getElementById("reset-leaderboard").addEventListener("click", resetLeaderboard);

  renderLeaderboard();
  newGame();

  window.HighestPointChallenge = {
    places: () => [...places],
    calculateRoundScore,
    newGame,
  };
});

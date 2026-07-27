
document.addEventListener("DOMContentLoaded", () => {
  const landmarks = [{"id": "taj-mahal", "name": "Taj Mahal", "state": "Uttar Pradesh", "city": "Agra", "image": "../../assets/heritage_monuments.png", "credit": "Existing project asset: assets/heritage_monuments.png", "options": ["Taj Mahal", "India Gate", "Victoria Memorial", "Hawa Mahal"], "fact": "The Taj Mahal in Agra is one of India's most recognised monuments and a UNESCO World Heritage Site."}, {"id": "india-gate", "name": "India Gate", "state": "Delhi", "city": "New Delhi", "image": "../../assets/hero_banner.png", "credit": "Existing project asset: assets/hero_banner.png", "options": ["India Gate", "Gateway of India", "Charminar", "Qutub Minar"], "fact": "India Gate is a war memorial located near Kartavya Path in New Delhi."}, {"id": "hawa-mahal", "name": "Hawa Mahal", "state": "Rajasthan", "city": "Jaipur", "image": "../../assets/heritage_forts.png", "credit": "Existing project asset: assets/heritage_forts.png", "options": ["Hawa Mahal", "Mysore Palace", "Golconda Fort", "Jaisalmer Fort"], "fact": "Hawa Mahal is a famous Jaipur landmark known for its honeycomb-like facade."}, {"id": "qutub-minar", "name": "Qutub Minar", "state": "Delhi", "city": "Delhi", "image": "../../assets/heritage_monuments.png", "credit": "Existing project asset: assets/heritage_monuments.png", "options": ["Qutub Minar", "Sanchi Stupa", "Brihadeeswarar Temple", "Mehrangarh Fort"], "fact": "Qutub Minar is a tall minaret and UNESCO World Heritage Site in Delhi."}, {"id": "charminar", "name": "Charminar", "state": "Telangana", "city": "Hyderabad", "image": "../../assets/heritage_temples.png", "credit": "Existing project asset: assets/heritage_temples.png", "options": ["Charminar", "Konark Sun Temple", "Lotus Temple", "Ajanta Caves"], "fact": "Charminar is a historic monument and mosque in Hyderabad, famous for its four minarets."}, {"id": "gateway-india", "name": "Gateway of India", "state": "Maharashtra", "city": "Mumbai", "image": "../../assets/travel_beaches.png", "credit": "Existing project asset: assets/travel_beaches.png", "options": ["Gateway of India", "India Gate", "Rani ki Vav", "Gol Gumbaz"], "fact": "The Gateway of India is a waterfront landmark in Mumbai overlooking the Arabian Sea."}, {"id": "konark", "name": "Konark Sun Temple", "state": "Odisha", "city": "Konark", "image": "../../assets/heritage_temples.png", "credit": "Existing project asset: assets/heritage_temples.png", "options": ["Konark Sun Temple", "Meenakshi Temple", "Somnath Temple", "Mahabodhi Temple"], "fact": "Konark Sun Temple is designed like a stone chariot dedicated to the Sun God."}, {"id": "mysore-palace", "name": "Mysore Palace", "state": "Karnataka", "city": "Mysuru", "image": "../../assets/heritage_forts.png", "credit": "Existing project asset: assets/heritage_forts.png", "options": ["Mysore Palace", "Amber Fort", "Umaid Bhawan Palace", "City Palace Udaipur"], "fact": "Mysore Palace is known for its Indo-Saracenic architecture and grand illumination."}, {"id": "sanchi", "name": "Sanchi Stupa", "state": "Madhya Pradesh", "city": "Sanchi", "image": "../../assets/heritage_temples.png", "credit": "Existing project asset: assets/heritage_temples.png", "options": ["Sanchi Stupa", "Qutub Minar", "Ajanta Caves", "Victoria Memorial"], "fact": "Sanchi Stupa is an important Buddhist monument and UNESCO World Heritage Site."}, {"id": "vivekananda-rock", "name": "Vivekananda Rock Memorial", "state": "Tamil Nadu", "city": "Kanyakumari", "image": "../../assets/travel_islands.png", "credit": "Existing project asset: assets/travel_islands.png", "options": ["Vivekananda Rock Memorial", "Cellular Jail", "Rameswaram Temple", "Basilica of Bom Jesus"], "fact": "Vivekananda Rock Memorial stands on a rocky island near India's southern tip at Kanyakumari."}];
  const recordKey = "incredible-india-zoom-reveal-records";
  const totalRounds = 10;
  const roundSeconds = 20;

  let deck = [];
  let roundIndex = 0;
  let score = 0;
  let streak = 0;
  let attempts = 0;
  let correct = 0;
  let secondsLeft = roundSeconds;
  let timerId = null;
  let current = null;
  let answered = false;
  let paused = false;
  let records = readRecords();

  const frame = document.querySelector(".zoom-frame");
  const image = document.getElementById("landmark-image");
  const choiceGrid = document.getElementById("choice-grid");
  const feedback = document.getElementById("feedback-card");
  const progress = document.getElementById("zoom-progress");
  const textAnswer = document.getElementById("text-answer");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function normalise(value) {
    return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  function readRecords() {
    try {
      const parsed = JSON.parse(localStorage.getItem(recordKey) || "{}");
      return {
        bestScore: Number(parsed.bestScore) || 0,
        credits: Array.isArray(parsed.credits) ? parsed.credits : [],
      };
    } catch {
      return { bestScore: 0, credits: [] };
    }
  }

  function saveRecords() {
    localStorage.setItem(recordKey, JSON.stringify(records));
  }

  function updateStats() {
    const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
    document.getElementById("score-total").textContent = score;
    document.getElementById("score-count").textContent = score;
    document.getElementById("best-score").textContent = records.bestScore || "--";
    document.getElementById("streak-count").textContent = streak;
    document.getElementById("accuracy-count").textContent = `${accuracy}%`;
    document.getElementById("round-total").textContent = `${Math.min(roundIndex + 1, totalRounds)}/${totalRounds}`;
    document.getElementById("time-total").textContent = `${secondsLeft}s`;
    document.getElementById("timer-badge").textContent = `${secondsLeft}s`;

    const rank = score >= 750
      ? "Reveal master"
      : score >= 500
        ? "Landmark detective"
        : score >= 250
          ? "Visual explorer"
          : "Reveal rookie";

    document.getElementById("rank-label").textContent = rank;
  }

  function renderCredits() {
    const list = document.getElementById("credits-list");
    const credits = records.credits.length
      ? records.credits
      : landmarks.map((landmark) => `${landmark.name}: ${landmark.credit}`);

    list.innerHTML = credits.map((entry) => {
      const [name, credit] = entry.split(": ");
      return `
        <div class="credit-item">
          <strong>${escapeHtml(name || "Image")}</strong>
          ${escapeHtml(credit || entry)}
        </div>
      `;
    }).join("");
  }

  function logCredit(landmark) {
    const entry = `${landmark.name}: ${landmark.credit}`;
    if (!records.credits.includes(entry)) {
      records.credits.unshift(entry);
      records.credits = records.credits.slice(0, 20);
      saveRecords();
      renderCredits();
    }
  }

  function renderChoices() {
    choiceGrid.innerHTML = shuffle(current.options).map((option) => `
      <button class="choice-btn" type="button" data-answer="${escapeHtml(option)}">
        ${escapeHtml(option)}
      </button>
    `).join("");

    choiceGrid.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => checkAnswer(button.dataset.answer, button));
    });
  }

  function startRound() {
    current = deck[roundIndex];

    if (!current || roundIndex >= totalRounds) {
      finishGame();
      return;
    }

    answered = false;
    paused = false;
    secondsLeft = roundSeconds;
    textAnswer.value = "";
    document.getElementById("pause-button").textContent = "Pause zoom";

    frame.classList.remove("is-running", "is-paused");
    void frame.offsetWidth;
    frame.classList.add("is-running");

    image.src = current.image;
    image.alt = `Zoom reveal image for ${current.name}`;
    image.onerror = () => {
      image.src = "../../assets/hero_banner.png";
    };

    document.getElementById("round-label").textContent = `Round ${roundIndex + 1} of ${totalRounds}`;
    document.getElementById("credit-line").textContent = `Image credit: ${current.credit}`;
    progress.style.width = "0%";
    feedback.innerHTML = "Watch the image zoom out and guess quickly.";

    renderChoices();
    updateStats();
    logCredit(current);
    startTimer();
  }

  function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (paused || answered) return;

      secondsLeft -= 1;
      const complete = ((roundSeconds - secondsLeft) / roundSeconds) * 100;
      progress.style.width = `${Math.min(100, complete)}%`;

      if (secondsLeft <= 0) {
        revealAnswer("Time is up!");
      }

      updateStats();
    }, 1000);
  }

  function scoreForTime() {
    return 20 + Math.max(0, secondsLeft * 4) + (streak * 5);
  }

  function checkAnswer(answer, button = null) {
    if (answered || !current) return;

    attempts += 1;
    const isCorrect = normalise(answer) === normalise(current.name);

    if (isCorrect) {
      answered = true;
      correct += 1;
      streak += 1;
      const earned = scoreForTime();
      score += earned;

      if (button) button.classList.add("correct");
      choiceGrid.querySelectorAll("button").forEach((choice) => {
        choice.disabled = true;
        if (normalise(choice.dataset.answer) === normalise(current.name)) {
          choice.classList.add("correct");
        }
      });

      feedback.innerHTML = `
        <strong>Correct! +${earned} points.</strong><br>
        You guessed ${escapeHtml(current.name)} with ${secondsLeft}s left.<br>
        ${escapeHtml(current.fact)}
      `;

      nextAfterDelay();
    } else {
      streak = 0;
      if (button) button.classList.add("wrong");
      feedback.innerHTML = `<strong>Not quite.</strong><br>Keep watching the reveal or try another option.`;
    }

    updateStats();
  }

  function revealAnswer(prefix) {
    if (answered || !current) return;
    answered = true;
    attempts += 1;
    streak = 0;

    choiceGrid.querySelectorAll("button").forEach((choice) => {
      choice.disabled = true;
      if (normalise(choice.dataset.answer) === normalise(current.name)) {
        choice.classList.add("correct");
      }
    });

    feedback.innerHTML = `
      <strong>${escapeHtml(prefix)}</strong><br>
      The landmark was <strong>${escapeHtml(current.name)}</strong> in ${escapeHtml(current.city)}, ${escapeHtml(current.state)}.<br>
      ${escapeHtml(current.fact)}
    `;

    updateStats();
    nextAfterDelay();
  }

  function nextAfterDelay() {
    clearInterval(timerId);
    if (score > records.bestScore) {
      records.bestScore = score;
      saveRecords();
    }

    setTimeout(() => {
      roundIndex += 1;
      startRound();
    }, 1700);
  }

  function finishGame() {
    clearInterval(timerId);
    current = null;
    frame.classList.remove("is-running", "is-paused");

    if (score > records.bestScore) {
      records.bestScore = score;
      saveRecords();
    }

    feedback.innerHTML = `<strong>Game complete!</strong><br>Final score: ${score}. Accuracy: ${attempts ? Math.round((correct / attempts) * 100) : 0}%.`;
    document.getElementById("round-label").textContent = "Game complete";
    updateStats();
  }

  function newGame() {
    deck = shuffle(landmarks).slice(0, totalRounds);
    roundIndex = 0;
    score = 0;
    streak = 0;
    attempts = 0;
    correct = 0;
    clearInterval(timerId);
    startRound();
  }

  function skipRound() {
    revealAnswer("Skipped.");
  }

  function togglePause() {
    paused = !paused;
    frame.classList.toggle("is-paused", paused);
    document.getElementById("pause-button").textContent = paused ? "Resume zoom" : "Pause zoom";
  }

  function resetRecords() {
    if (!confirm("Reset Zoom Reveal best score and credits log?")) return;
    records = { bestScore: 0, credits: [] };
    saveRecords();
    renderCredits();
    updateStats();
    feedback.innerHTML = "<strong>Records reset.</strong><br>Your current round is unchanged.";
  }

  document.getElementById("submit-text").addEventListener("click", () => {
    checkAnswer(textAnswer.value);
  });

  textAnswer.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkAnswer(textAnswer.value);
    }
  });

  document.getElementById("new-game").addEventListener("click", newGame);
  document.getElementById("skip-button").addEventListener("click", skipRound);
  document.getElementById("pause-button").addEventListener("click", togglePause);
  document.getElementById("reset-records").addEventListener("click", resetRecords);

  renderCredits();
  newGame();

  window.ZoomRevealGame = {
    landmarks: () => [...landmarks],
    newGame,
  };
});

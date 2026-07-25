
document.addEventListener("DOMContentLoaded", () => {
  const waterfalls = [{"id": "jog", "name": "Jog Falls", "state": "Karnataka", "region": "South", "river": "Sharavathi River", "height": "253 m", "type": "Segmented plunge", "difficulty": "Easy", "image": "../../assets/travel_forests.png", "clues": ["It is one of India's most dramatic monsoon waterfalls.", "It is formed by the Sharavathi River.", "It is located in Karnataka."], "fact": "Jog Falls is known for its four major drops: Raja, Rani, Roarer, and Rocket."}, {"id": "dudhsagar", "name": "Dudhsagar Falls", "state": "Goa", "region": "West", "river": "Mandovi River", "height": "310 m", "type": "Tiered waterfall", "difficulty": "Medium", "image": "../../assets/travel_mountains.png", "clues": ["Its name means Sea of Milk.", "A railway bridge passes near the falls.", "It is located on the Goa-Karnataka border region."], "fact": "Dudhsagar Falls is famous for its milky-white flow during the monsoon."}, {"id": "nohkalikai", "name": "Nohkalikai Falls", "state": "Meghalaya", "region": "Northeast", "river": "Rain-fed cliff stream", "height": "340 m", "type": "Plunge waterfall", "difficulty": "Medium", "image": "../../assets/travel_hidden.png", "clues": ["It is near Cherrapunji.", "It falls from a very high cliff into a blue-green pool.", "It is in Meghalaya."], "fact": "Nohkalikai is often listed among India's tallest plunge waterfalls."}, {"id": "athirappilly", "name": "Athirappilly Falls", "state": "Kerala", "region": "South", "river": "Chalakudy River", "height": "25 m", "type": "Block waterfall", "difficulty": "Easy", "image": "../../assets/travel_islands.png", "clues": ["It is often called the Niagara of South India.", "It is surrounded by lush forests.", "It is located in Kerala."], "fact": "Athirappilly Falls is a major eco-tourism destination in Kerala."}, {"id": "bhimlat", "name": "Bhimlat Falls", "state": "Rajasthan", "region": "West", "river": "Seasonal stream", "height": "60 m", "type": "Desert waterfall", "difficulty": "Hard", "image": "../../assets/travel_deserts.png", "clues": ["This waterfall is surprising because it appears in a desert state.", "It is near Bundi.", "It is located in Rajasthan."], "fact": "Bhimlat Falls is a hidden monsoon attraction in Rajasthan's Bundi region."}, {"id": "chitrakote", "name": "Chitrakote Falls", "state": "Chhattisgarh", "region": "Central", "river": "Indravati River", "height": "29 m", "type": "Horseshoe waterfall", "difficulty": "Medium", "image": "../../assets/travel_forests.png", "clues": ["It is called the Niagara of India.", "It has a wide horseshoe-shaped drop.", "It is on the Indravati River."], "fact": "Chitrakote Falls is one of India's widest waterfalls during the monsoon."}, {"id": "hogenakkal", "name": "Hogenakkal Falls", "state": "Tamil Nadu", "region": "South", "river": "Kaveri River", "height": "20 m", "type": "Rocky cascade", "difficulty": "Easy", "image": "../../assets/heritage_stepwells.png", "clues": ["It is known for coracle boat rides.", "The water flows through rocky gorges.", "It is on the Kaveri River in Tamil Nadu."], "fact": "Hogenakkal means smoking rocks, referring to the mist created by the falls."}, {"id": "elephant", "name": "Elephant Falls", "state": "Meghalaya", "region": "Northeast", "river": "Mountain stream", "height": "Multi-tiered", "type": "Three-step waterfall", "difficulty": "Easy", "image": "../../assets/travel_forests.png", "clues": ["It is a famous three-step waterfall.", "It is near Shillong.", "It is located in Meghalaya."], "fact": "Elephant Falls is one of the most accessible waterfall attractions near Shillong."}, {"id": "shivanasamudra", "name": "Shivanasamudra Falls", "state": "Karnataka", "region": "South", "river": "Kaveri River", "height": "98 m", "type": "Segmented waterfall", "difficulty": "Medium", "image": "../../assets/heritage_temples.png", "clues": ["It has two major branches: Gaganachukki and Bharachukki.", "It is associated with an early hydroelectric project.", "It is on the Kaveri River in Karnataka."], "fact": "Shivanasamudra is an important waterfall and hydroelectric heritage site."}, {"id": "kempty", "name": "Kempty Falls", "state": "Uttarakhand", "region": "North", "river": "Mountain stream", "height": "40 ft", "type": "Hill waterfall", "difficulty": "Easy", "image": "../../assets/travel_mountains.png", "clues": ["It is a popular hill-station waterfall.", "It is near Mussoorie.", "It is located in Uttarakhand."], "fact": "Kempty Falls is one of the best-known tourist waterfalls near Mussoorie."}, {"id": "talakona", "name": "Talakona Falls", "state": "Andhra Pradesh", "region": "South", "river": "Forest stream", "height": "82 m", "type": "Forest waterfall", "difficulty": "Medium", "image": "../../assets/travel_forests.png", "clues": ["It is located in a forested biosphere region.", "It is one of Andhra Pradesh's highest waterfalls.", "It is near Tirupati district routes."], "fact": "Talakona Falls is surrounded by dense forest and trekking trails."}, {"id": "thoseghar", "name": "Thoseghar Falls", "state": "Maharashtra", "region": "West", "river": "Seasonal streams", "height": "200 m approx.", "type": "Monsoon waterfall", "difficulty": "Medium", "image": "../../assets/heritage_forts.png", "clues": ["It is a scenic monsoon waterfall in the Western Ghats.", "It is near Satara.", "It is located in Maharashtra."], "fact": "Thoseghar Falls becomes especially dramatic during the monsoon season."}];
  const progressKey = "incredible-india-waterfall-explorer-unlocked";
  const scoreKey = "incredible-india-waterfall-explorer-score";

  const image = document.getElementById("waterfall-image");
  const clueList = document.getElementById("clue-list");
  const choiceGrid = document.getElementById("choice-grid");
  const feedback = document.getElementById("feedback-card");
  const waterfallLog = document.getElementById("waterfall-log");

  let unlocked = readArray(progressKey);
  let score = Number(localStorage.getItem(scoreKey) || 0);
  let current = null;
  let round = 0;
  let visibleClues = 1;
  let answered = false;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function readArray(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function saveProgress() {
    localStorage.setItem(progressKey, JSON.stringify(unlocked));
    localStorage.setItem(scoreKey, String(score));
  }

  function updateStats() {
    const progress = Math.round((unlocked.length / waterfalls.length) * 100);
    document.getElementById("waterfall-total").textContent = waterfalls.length;
    document.getElementById("score-total").textContent = score;
    document.getElementById("progress-total").textContent = `${progress}%`;
  }

  function optionSet() {
    return shuffle([
      current.name,
      ...shuffle(waterfalls.map((item) => item.name).filter((name) => name !== current.name)).slice(0, 3),
    ]);
  }

  function renderClues() {
    clueList.innerHTML = current.clues
      .slice(0, visibleClues)
      .map((clue) => `<li>${escapeHtml(clue)}</li>`)
      .join("");

    document.getElementById("reveal-clue").disabled = visibleClues >= current.clues.length;
  }

  function renderChoices() {
    choiceGrid.innerHTML = optionSet()
      .map((option) => `<button class="choice-btn" type="button" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`)
      .join("");

    choiceGrid.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => checkAnswer(button));
    });
  }

  function renderLog() {
    waterfallLog.innerHTML = waterfalls.map((waterfall) => {
      const done = unlocked.includes(waterfall.id);
      return `
        <article class="log-card ${done ? "" : "locked"}">
          <h4>${done ? "✓ " : "🔒 "}${done ? escapeHtml(waterfall.name) : "Locked waterfall"}</h4>
          <p>
            ${done ? `${escapeHtml(waterfall.state)} · ${escapeHtml(waterfall.river)} · ${escapeHtml(waterfall.height)}` : "Guess correctly to unlock this waterfall."}
          </p>
        </article>
      `;
    }).join("");
  }

  function newRound() {
    current = waterfalls[Math.floor(Math.random() * waterfalls.length)];
    round += 1;
    visibleClues = 1;
    answered = false;

    document.getElementById("round-label").textContent = `Round ${round}`;
    document.getElementById("state-clue").textContent = current.region;
    document.getElementById("river-clue").textContent = current.river;
    document.getElementById("difficulty-clue").textContent = current.difficulty;

    image.src = current.image;
    image.alt = `Image hint for ${current.name}`;
    image.onerror = () => {
      image.src = "../../assets/hero_banner.png";
    };

    feedback.className = "feedback-card";
    feedback.innerHTML = "";

    renderClues();
    renderChoices();
    updateStats();
    renderLog();
  }

  function checkAnswer(button) {
    if (answered) return;
    answered = true;

    const correct = button.dataset.answer === current.name;
    choiceGrid.querySelectorAll("button").forEach((item) => {
      item.disabled = true;
      if (item.dataset.answer === current.name) item.classList.add("correct");
    });

    if (!correct) {
      button.classList.add("wrong");
      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Not quite.</strong><br>The correct answer is <strong>${escapeHtml(current.name)}</strong>. ${escapeHtml(current.fact)}`;
    } else {
      const earned = 10 + (current.clues.length - visibleClues) * 5;
      score += earned;
      if (!unlocked.includes(current.id)) unlocked.push(current.id);

      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Correct! +${earned} points.</strong><br>${escapeHtml(current.name)} is in ${escapeHtml(current.state)}. ${escapeHtml(current.fact)}`;
    }

    saveProgress();
    updateStats();
    renderLog();
  }

  document.getElementById("reveal-clue").addEventListener("click", () => {
    visibleClues += 1;
    renderClues();
  });

  document.getElementById("new-waterfall").addEventListener("click", newRound);

  document.getElementById("reset-progress").addEventListener("click", () => {
    if (!confirm("Reset Waterfall Explorer progress?")) return;
    unlocked = [];
    score = 0;
    saveProgress();
    updateStats();
    renderLog();
    feedback.className = "feedback-card visible";
    feedback.innerHTML = "<strong>Progress reset.</strong> Start guessing again!";
  });

  newRound();

  window.WaterfallExplorerGame = {
    waterfalls: () => [...waterfalls],
    newRound,
  };
});

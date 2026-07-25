
document.addEventListener("DOMContentLoaded", () => {
  const islands = [{"id": "swaraj", "name": "Swaraj Dweep", "group": "Andaman & Nicobar", "region": "Bay of Bengal", "ecosystem": "Coral reefs and tropical forest", "species": "Sea turtles, reef fish, dugongs", "threat": "Coral damage and plastic waste", "difficulty": "Easy", "image": "../../assets/travel_islands.png", "clues": ["Formerly known as Havelock Island.", "Known for beaches and coral-rich waters.", "Part of Andaman & Nicobar Islands."], "question": "Which ecosystem is most closely associated with Swaraj Dweep?", "options": ["Coral reefs", "Cold desert", "Alpine meadow", "Salt marsh only"], "answer": "Coral reefs", "fact": "Swaraj Dweep is known for beaches, reefs, and marine biodiversity."}, {"id": "baratang", "name": "Baratang Island", "group": "Andaman & Nicobar", "region": "Bay of Bengal", "ecosystem": "Mangroves and limestone caves", "species": "Mangrove fauna, birds, reptiles", "threat": "Habitat disturbance", "difficulty": "Medium", "image": "../../assets/travel_forests.png", "clues": ["Known for mangrove creeks.", "Also famous for limestone caves.", "Located in the Andaman group."], "question": "Which feature makes Baratang especially distinctive?", "options": ["Mangrove creeks", "Snowfields", "Tea estates", "Salt desert"], "answer": "Mangrove creeks", "fact": "Baratang combines mangrove waterways and limestone formations."}, {"id": "barren", "name": "Barren Island", "group": "Andaman & Nicobar", "region": "Andaman Sea", "ecosystem": "Volcanic island ecosystem", "species": "Marine life around volcanic slopes", "threat": "Natural volcanic activity", "difficulty": "Hard", "image": "../../assets/travel_hidden.png", "clues": ["Famous for volcanic activity.", "Located in the Andaman Sea.", "India's only confirmed active volcano."], "question": "Why is Barren Island unique in India?", "options": ["Active volcano", "Largest coral atoll", "Highest mountain", "Largest mangrove forest"], "answer": "Active volcano", "fact": "Barren Island is India's only confirmed active volcano."}, {"id": "great-nicobar", "name": "Great Nicobar", "group": "Andaman & Nicobar", "region": "Indian Ocean", "ecosystem": "Rainforest, coastal forest, marine zone", "species": "Nicobar megapode, leatherback turtles", "threat": "Coastal development pressure", "difficulty": "Hard", "image": "../../assets/travel_forests.png", "clues": ["India's southernmost point lies here.", "Home to rare birds and turtle nesting sites.", "Part of the Nicobar group."], "question": "Which rare bird is associated with Great Nicobar?", "options": ["Nicobar megapode", "Peacock", "Sarus crane", "Flamingo"], "answer": "Nicobar megapode", "fact": "Great Nicobar supports rare island species and nesting habitats."}, {"id": "kavaratti", "name": "Kavaratti", "group": "Lakshadweep", "region": "Arabian Sea", "ecosystem": "Lagoon and coral atoll", "species": "Reef fish, corals, turtles", "threat": "Coral bleaching", "difficulty": "Easy", "image": "../../assets/travel_islands.png", "clues": ["Administrative capital of Lakshadweep.", "Known for lagoons and coral reefs.", "Located in the Arabian Sea."], "question": "Kavaratti belongs to which island group?", "options": ["Lakshadweep", "Andaman", "Nicobar", "Sundarbans"], "answer": "Lakshadweep", "fact": "Kavaratti is known for calm lagoons and coral reefs."}, {"id": "agatti", "name": "Agatti Island", "group": "Lakshadweep", "region": "Arabian Sea", "ecosystem": "Coral lagoon and sandy island", "species": "Coral fish, rays, turtles", "threat": "Tourism pressure and reef stress", "difficulty": "Medium", "image": "../../assets/travel_beaches.png", "clues": ["Known for a scenic airstrip.", "Surrounded by turquoise lagoons.", "Part of Lakshadweep."], "question": "What is Agatti especially known for?", "options": ["Turquoise lagoon", "Volcano", "Tea gardens", "Glacier lake"], "answer": "Turquoise lagoon", "fact": "Agatti is one of Lakshadweep's best-known lagoon islands."}, {"id": "minicoy", "name": "Minicoy Island", "group": "Lakshadweep", "region": "Arabian Sea", "ecosystem": "Atoll lagoon and coconut island", "species": "Tuna, reef fish, seabirds", "threat": "Marine pollution", "difficulty": "Medium", "image": "../../assets/travel_islands.png", "clues": ["One of Lakshadweep's southernmost islands.", "Known for tuna fishing and a lighthouse.", "Has strong seafaring traditions."], "question": "Which livelihood is strongly associated with Minicoy?", "options": ["Tuna fishing", "Apple farming", "Camel herding", "Tea cultivation"], "answer": "Tuna fishing", "fact": "Minicoy is known for tuna fishing and maritime traditions."}, {"id": "bangaram", "name": "Bangaram Atoll", "group": "Lakshadweep", "region": "Arabian Sea", "ecosystem": "Coral atoll and lagoon", "species": "Reef fish, rays, turtles", "threat": "Coral bleaching and waste", "difficulty": "Easy", "image": "../../assets/travel_beaches.png", "clues": ["A small coral atoll.", "Known for clear lagoons.", "Part of Lakshadweep."], "question": "Bangaram is best described as what?", "options": ["Coral atoll", "River island", "Volcanic plateau", "Mountain valley"], "answer": "Coral atoll", "fact": "Bangaram is a small coral atoll with clear water and marine biodiversity."}];
  const progressKey = "incredible-india-island-explorer-unlocked";
  const scoreKey = "incredible-india-island-explorer-score";

  const islandGrid = document.getElementById("island-grid");
  const progressGrid = document.getElementById("progress-grid");
  const choiceGrid = document.getElementById("choice-grid");
  const feedback = document.getElementById("feedback-card");
  const challengeContent = document.getElementById("challenge-content");
  const emptyState = document.getElementById("empty-state");

  let unlocked = readArray(progressKey);
  let score = Number(localStorage.getItem(scoreKey) || 0);
  let activeGroup = "All";
  let current = null;
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
    const progress = Math.round((unlocked.length / islands.length) * 100);
    document.getElementById("island-total").textContent = islands.length;
    document.getElementById("score-total").textContent = score;
    document.getElementById("progress-total").textContent = `${progress}%`;
  }

  function visibleIslands() {
    return activeGroup === "All"
      ? islands
      : islands.filter((island) => island.group === activeGroup);
  }

  function renderIslandGrid() {
    islandGrid.innerHTML = visibleIslands().map((island) => {
      const done = unlocked.includes(island.id);
      return `
        <article class="island-card ${done ? "unlocked" : ""}">
          <img src="${escapeHtml(island.image)}" alt="${escapeHtml(island.name)}" onerror="this.src='../../assets/hero_banner.png'">
          <div class="island-card-body">
            <h4>${done ? "✓ " : ""}${escapeHtml(island.name)}</h4>
            <p>${escapeHtml(island.group)} · ${escapeHtml(island.region)}<br>${escapeHtml(island.ecosystem)}</p>
            <button type="button" data-island="${escapeHtml(island.id)}">Explore island</button>
          </div>
        </article>`;
    }).join("");

    islandGrid.querySelectorAll("[data-island]").forEach((button) => {
      button.addEventListener("click", () => selectIsland(button.dataset.island));
    });
  }

  function renderProgress() {
    progressGrid.innerHTML = islands.map((island) => {
      const done = unlocked.includes(island.id);
      return `<div class="progress-chip ${done ? "done" : ""}">${done ? "✓ " : "○ "}${escapeHtml(island.name)}</div>`;
    }).join("");
  }

  function renderClues() {
    document.getElementById("clue-list").innerHTML = current.clues
      .slice(0, visibleClues)
      .map((clue) => `<li>${escapeHtml(clue)}</li>`)
      .join("");
    document.getElementById("reveal-clue").disabled = visibleClues >= current.clues.length;
  }

  function renderChoices() {
    choiceGrid.innerHTML = shuffle(current.options).map((option) =>
      `<button class="choice-btn" type="button" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`
    ).join("");

    choiceGrid.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => checkAnswer(button));
    });
  }

  function selectIsland(id) {
    current = islands.find((island) => island.id === id);
    if (!current) return;

    visibleClues = 1;
    answered = false;
    emptyState.hidden = true;
    challengeContent.hidden = false;

    const image = document.getElementById("island-image");
    image.src = current.image;
    image.alt = current.name;
    image.onerror = () => { image.src = "../../assets/hero_banner.png"; };

    document.getElementById("island-group").textContent = current.group;
    document.getElementById("island-name").textContent = current.name;
    document.getElementById("difficulty-badge").textContent = current.difficulty;
    document.getElementById("ecosystem-info").textContent = current.ecosystem;
    document.getElementById("species-info").textContent = current.species;
    document.getElementById("threat-info").textContent = current.threat;
    document.getElementById("quiz-question").textContent = current.question;

    feedback.className = "feedback-card";
    feedback.innerHTML = "";
    renderClues();
    renderChoices();
  }

  function checkAnswer(button) {
    if (!current || answered) return;
    answered = true;

    const correct = button.dataset.answer === current.answer;

    choiceGrid.querySelectorAll("button").forEach((choice) => {
      choice.disabled = true;
      if (choice.dataset.answer === current.answer) {
        choice.classList.add("correct");
      }
    });

    if (!correct) {
      button.classList.add("wrong");
    }

    if (correct) {
      const earned = 10 + (current.clues.length - visibleClues) * 5;
      score += earned;
      if (!unlocked.includes(current.id)) {
        unlocked.push(current.id);
      }

      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Correct! +${earned} points.</strong><br>${escapeHtml(current.fact)}`;
    } else {
      feedback.className = "feedback-card visible";
      feedback.innerHTML = `<strong>Not quite.</strong><br>The correct answer is <strong>${escapeHtml(current.answer)}</strong>. ${escapeHtml(current.fact)}`;
    }

    saveProgress();
    updateStats();
    renderIslandGrid();
    renderProgress();
  }

  document.querySelectorAll("[data-group]").forEach((button) => {
    button.addEventListener("click", () => {
      activeGroup = button.dataset.group;
      document.querySelectorAll("[data-group]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderIslandGrid();
    });
  });

  document.getElementById("reveal-clue").addEventListener("click", () => {
    visibleClues += 1;
    renderClues();
  });

  document.getElementById("reset-progress").addEventListener("click", () => {
    if (!confirm("Reset Island Explorer progress?")) return;
    unlocked = [];
    score = 0;
    saveProgress();
    updateStats();
    renderIslandGrid();
    renderProgress();
    feedback.className = "feedback-card visible";
    feedback.innerHTML = "<strong>Progress reset.</strong> Explore the islands again!";
  });

  updateStats();
  renderIslandGrid();
  renderProgress();

  window.IslandExplorerChallenge = {
    islands: () => [...islands],
    selectIsland,
  };
});

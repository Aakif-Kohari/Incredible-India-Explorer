
document.addEventListener("DOMContentLoaded", () => {
  const coastOrder = [{"id": "gujarat", "name": "Gujarat", "type": "State", "coast": "Arabian Sea", "x": 18, "y": 36, "fact": "Gujarat has India's longest coastline and includes the Gulf of Kachchh and Gulf of Khambhat."}, {"id": "daman-diu", "name": "Dadra & Nagar Haveli and Daman & Diu", "type": "UT", "coast": "Arabian Sea", "x": 23, "y": 47, "fact": "Daman and Diu are small coastal enclaves on India's western coast."}, {"id": "maharashtra", "name": "Maharashtra", "type": "State", "coast": "Arabian Sea", "x": 27, "y": 58, "fact": "Maharashtra's Konkan coast includes Mumbai, beaches, forts, ports, and coastal biodiversity."}, {"id": "goa", "name": "Goa", "type": "State", "coast": "Arabian Sea", "x": 32, "y": 69, "fact": "Goa is India's smallest state and is famous for beaches, estuaries, and coastal heritage."}, {"id": "karnataka", "name": "Karnataka", "type": "State", "coast": "Arabian Sea", "x": 37, "y": 76, "fact": "Coastal Karnataka includes important port towns, beaches, temples, and Western Ghats river mouths."}, {"id": "kerala", "name": "Kerala", "type": "State", "coast": "Arabian Sea", "x": 43, "y": 88, "fact": "Kerala's coast is known for backwaters, beaches, fishing communities, and spice-trade history."}, {"id": "tamil-nadu", "name": "Tamil Nadu", "type": "State", "coast": "Arabian Sea / Indian Ocean / Bay of Bengal", "x": 57, "y": 86, "fact": "Tamil Nadu wraps around India's southern tip and continues north along the Coromandel Coast."}, {"id": "puducherry", "name": "Puducherry", "type": "UT", "coast": "Bay of Bengal", "x": 62, "y": 78, "fact": "Puducherry has coastal enclaves along India's eastern coast, including the famous seaside promenade."}, {"id": "andhra-pradesh", "name": "Andhra Pradesh", "type": "State", "coast": "Bay of Bengal", "x": 70, "y": 66, "fact": "Andhra Pradesh has one of India's longest eastern coastlines and includes major ports and delta regions."}, {"id": "odisha", "name": "Odisha", "type": "State", "coast": "Bay of Bengal", "x": 78, "y": 53, "fact": "Odisha's coast includes Chilika Lake, nesting beaches for Olive Ridley turtles, and historic ports."}, {"id": "west-bengal", "name": "West Bengal", "type": "State", "coast": "Bay of Bengal", "x": 86, "y": 42, "fact": "West Bengal's coast includes the Sundarbans delta, one of the world's largest mangrove ecosystems."}];
  const decoys = [{"id": "rajasthan", "name": "Rajasthan", "type": "Decoy", "x": 23, "y": 27}, {"id": "madhya-pradesh", "name": "Madhya Pradesh", "type": "Decoy", "x": 46, "y": 45}, {"id": "telangana", "name": "Telangana", "type": "Decoy", "x": 55, "y": 61}, {"id": "chhattisgarh", "name": "Chhattisgarh", "type": "Decoy", "x": 63, "y": 48}, {"id": "bihar", "name": "Bihar", "type": "Decoy", "x": 75, "y": 33}];
  const recordKey = "incredible-india-coastline-connect-records";

  let index = 0;
  let mistakes = 0;
  let seconds = 0;
  let timerId = null;
  let started = false;
  let completed = false;
  let showLabels = true;
  let records = readRecords();

  const pinLayer = document.getElementById("pin-layer");
  const pathLayer = document.getElementById("path-layer");
  const map = document.getElementById("india-map");
  const feedback = document.getElementById("feedback-card");
  const orderList = document.getElementById("order-list");

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
        bestTime: Number(parsed.bestTime) || null,
        bestMistakes: Number.isInteger(parsed.bestMistakes) ? parsed.bestMistakes : null,
      };
    } catch {
      return { bestTime: null, bestMistakes: null };
    }
  }

  function saveRecords() {
    localStorage.setItem(recordKey, JSON.stringify(records));
  }

  function formatTime(value) {
    const minutes = String(Math.floor(value / 60)).padStart(2, "0");
    const secs = String(value % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  function startTimer() {
    if (started) return;
    started = true;
    timerId = setInterval(() => {
      seconds += 1;
      updateStats();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }

  function allPins() {
    return [...coastOrder, ...decoys];
  }

  function renderPins() {
    pinLayer.innerHTML = allPins().map((item) => {
      const step = coastOrder.findIndex((coast) => coast.id === item.id);
      const isCoastal = step >= 0;
      const isConnected = isCoastal && step < index;
      const isNext = isCoastal && step === index && !completed;
      const classes = ["coast-pin"];

      if (isConnected) classes.push("connected");
      if (isNext) classes.push("next");
      if (!isCoastal) classes.push("decoy");

      return `
        <button
          class="${classes.join(" ")}"
          type="button"
          style="left:${item.x}%; top:${item.y}%"
          data-id="${escapeHtml(item.id)}"
          aria-label="Select ${escapeHtml(item.name)}"
        >
          ${isConnected ? `<span class="pin-step">${step + 1}</span>` : ""}
          ${escapeHtml(item.name)}
        </button>
      `;
    }).join("");

    pinLayer.querySelectorAll("[data-id]").forEach((pin) => {
      pin.addEventListener("click", () => handleClick(pin.dataset.id, pin));
    });
  }

  function renderPath() {
    const points = coastOrder
      .slice(0, index)
      .map((item) => `${item.x},${item.y}`)
      .join(" ");

    pathLayer.innerHTML = points
      ? `<polyline points="${points}"></polyline>`
      : "";
  }

  function renderOrderList() {
    orderList.innerHTML = coastOrder.map((item, step) => `
      <div class="order-chip ${step < index ? "done" : ""}">
        ${step + 1}. ${escapeHtml(item.name)}
      </div>
    `).join("");
  }

  function updateStats() {
    const connected = `${index}/${coastOrder.length}`;
    const next = coastOrder[index];

    document.getElementById("progress-total").textContent = connected;
    document.getElementById("connected-count").textContent = connected;
    document.getElementById("mistake-total").textContent = mistakes;
    document.getElementById("mistake-count").textContent = mistakes;
    document.getElementById("timer-total").textContent = formatTime(seconds);
    document.getElementById("time-count").textContent = formatTime(seconds);
    document.getElementById("best-time").textContent = records.bestTime ? formatTime(records.bestTime) : "--";

    document.getElementById("next-target").textContent = next ? next.name : "Route complete";
    document.getElementById("target-status");
    document.getElementById("next-helper").textContent = next
      ? `${next.type} on the ${next.coast}.`
      : "You completed the coastal route from Gujarat to West Bengal.";

    document.getElementById("map-status").textContent = next
      ? `Next: ${next.name}`
      : "Coastline completed";

    const rank = index >= coastOrder.length
      ? "Coastline master"
      : index >= 8
        ? "Eastern coast navigator"
        : index >= 4
          ? "Western coast tracker"
          : "Coastline learner";

    document.getElementById("rank-label").textContent = rank;
  }

  function handleClick(id, pin) {
    if (completed) return;
    startTimer();

    const expected = coastOrder[index];

    if (!expected || id !== expected.id) {
      mistakes += 1;
      pin.classList.add("wrong");
      setTimeout(() => pin.classList.remove("wrong"), 360);

      feedback.innerHTML = `<strong>Wrong coastal step.</strong><br>The next correct location is <strong>${escapeHtml(expected.name)}</strong>. Mistakes: ${mistakes}.`;
      updateStats();
      return;
    }

    index += 1;
    feedback.innerHTML = `<strong>Correct!</strong><br>${escapeHtml(expected.name)} connected. ${escapeHtml(expected.fact)}`;

    if (index >= coastOrder.length) {
      finishGame();
    }

    renderAll();
  }

  function finishGame() {
    completed = true;
    stopTimer();

    const newBestTime = !records.bestTime || seconds < records.bestTime;
    const newBestMistakes = records.bestMistakes === null || mistakes < records.bestMistakes;

    if (newBestTime) records.bestTime = seconds;
    if (newBestMistakes) records.bestMistakes = mistakes;

    saveRecords();

    feedback.innerHTML = `
      <strong>Coastline complete!</strong><br>
      You connected ${coastOrder.length} coastal states/UTs in ${formatTime(seconds)} with ${mistakes} mistake(s).
      ${newBestTime ? "<br>New best time!" : ""}
      ${newBestMistakes ? "<br>New best mistake record!" : ""}
    `;
  }

  function showHint() {
    const next = coastOrder[index];
    if (!next) {
      feedback.innerHTML = "<strong>All done!</strong><br>The full coastline route is complete.";
      return;
    }

    feedback.innerHTML = `<strong>Hint:</strong><br>${escapeHtml(next.name)} is a ${escapeHtml(next.type)} on the ${escapeHtml(next.coast)}. It comes at position ${index + 1} in the clockwise route.`;
  }

  function undoLast() {
    if (index <= 0 || completed) {
      feedback.innerHTML = "<strong>Nothing to undo.</strong><br>No completed coastal step can be removed right now.";
      return;
    }

    index -= 1;
    feedback.innerHTML = `<strong>Last step undone.</strong><br>Click ${escapeHtml(coastOrder[index].name)} again to reconnect the route.`;
    renderAll();
  }

  function restartGame() {
    stopTimer();
    index = 0;
    mistakes = 0;
    seconds = 0;
    started = false;
    completed = false;
    feedback.innerHTML = "Begin at Gujarat, then follow the coast clockwise.";
    renderAll();
  }

  function resetRecords() {
    if (!confirm("Reset Coastline Connect best records?")) return;
    records = { bestTime: null, bestMistakes: null };
    saveRecords();
    feedback.innerHTML = "<strong>Records reset.</strong><br>Your current game is unchanged.";
    updateStats();
  }

  function renderAll() {
    renderPins();
    renderPath();
    renderOrderList();
    updateStats();
  }

  document.getElementById("hint-button").addEventListener("click", showHint);
  document.getElementById("undo-button").addEventListener("click", undoLast);
  document.getElementById("restart-button").addEventListener("click", restartGame);
  document.getElementById("reset-records").addEventListener("click", resetRecords);

  document.getElementById("toggle-labels").addEventListener("click", () => {
    showLabels = !showLabels;
    map.classList.toggle("hide-labels", !showLabels);
  });

  renderAll();

  window.CoastlineConnect = {
    coastOrder: () => [...coastOrder],
    restartGame,
  };
});

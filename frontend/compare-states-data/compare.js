(function () {
  "use strict";

  const states = Array.isArray(window.compareStatesData) ? window.compareStatesData : [];
  const fields = [
    ["Capital", "capital"],
    ["Population", "population"],
    ["Area", "area"],
    ["Official Language(s)", "officialLanguages"],
    ["Major Tourist Attractions", "attractions"],
    ["Famous Cuisine", "cuisine"],
    ["UNESCO Heritage Sites", "unesco"],
    ["Wildlife", "wildlife"],
    ["Climate", "climate"],
    ["Popular Festivals", "festivals"]
  ];

  const stateAInput = document.getElementById("state-a-input");
  const stateBInput = document.getElementById("state-b-input");
  const optionsList = document.getElementById("state-options");
  const swapButton = document.getElementById("swap-states");
  const downloadButton = document.getElementById("download-image");
  const printButton = document.getElementById("print-pdf");
  const comparisonCard = document.getElementById("comparison-card");
  const feedback = document.getElementById("compare-feedback");

  if (!stateAInput || !stateBInput || !optionsList || !comparisonCard) return;

  const byName = new Map(states.map((state) => [normalize(state.name), state]));

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderValue(value) {
    if (Array.isArray(value)) {
      return `<div class="tag-list">${value.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
    }

    return escapeHtml(value || "Not available");
  }

  function findState(inputValue) {
    return byName.get(normalize(inputValue));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-IN").format(value);
  }

  function buildOptions() {
    const fragment = document.createDocumentFragment();

    states
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((state) => {
        const option = document.createElement("option");
        option.value = state.name;
        fragment.appendChild(option);
      });

    optionsList.appendChild(fragment);
  }

  function setFeedback(message) {
    feedback.textContent = message || "";
  }

  function getDifferenceNote(stateA, stateB) {
    const populationDifference = Math.abs(stateA.populationNumber - stateB.populationNumber);
    const areaDifference = Math.abs(stateA.areaSqKm - stateB.areaSqKm);
    const largerPopulation = stateA.populationNumber > stateB.populationNumber ? stateA.name : stateB.name;
    const largerArea = stateA.areaSqKm > stateB.areaSqKm ? stateA.name : stateB.name;

    return `${largerPopulation} has the larger 2011 Census population by ${formatNumber(populationDifference)} people. ${largerArea} is larger by ${formatNumber(areaDifference)} sq km.`;
  }

  function renderSummary(state) {
    return `
      <article class="state-summary">
        <h2>${escapeHtml(state.name)}</h2>
        <p>${escapeHtml(state.climate)}</p>
        <div class="quick-stats">
          <div class="quick-stat">
            <span>Capital</span>
            <strong>${escapeHtml(state.capital)}</strong>
          </div>
          <div class="quick-stat">
            <span>Area</span>
            <strong>${escapeHtml(state.area)}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function renderComparison() {
    const stateA = findState(stateAInput.value);
    const stateB = findState(stateBInput.value);

    if (!stateAInput.value && !stateBInput.value) {
      setFeedback("");
      comparisonCard.innerHTML = '<div class="comparison-empty">Choose two different states to begin the comparison.</div>';
      updateUrl("", "");
      return;
    }

    if (!stateA || !stateB) {
      setFeedback("Please choose valid state names from the dropdown list.");
      comparisonCard.innerHTML = '<div class="comparison-empty">The comparison will appear here after both states are selected.</div>';
      return;
    }

    if (stateA.name === stateB.name) {
      setFeedback("Choose two different states for a meaningful comparison.");
      comparisonCard.innerHTML = '<div class="comparison-empty">Select a different second state to compare.</div>';
      return;
    }

    setFeedback("");
    updateUrl(stateA.name, stateB.name);

    const rows = fields
      .map(([label, key]) => `
        <div class="comparison-row">
          <div class="comparison-cell">${renderValue(stateA[key])}</div>
          <div class="metric-cell">${escapeHtml(label)}</div>
          <div class="comparison-cell">${renderValue(stateB[key])}</div>
        </div>
      `)
      .join("");

    comparisonCard.innerHTML = `
      <div class="comparison-heading">
        ${renderSummary(stateA)}
        <div class="versus" aria-hidden="true">VS</div>
        ${renderSummary(stateB)}
      </div>
      <div class="comparison-table">
        ${rows}
      </div>
      <p class="difference-note">${escapeHtml(getDifferenceNote(stateA, stateB))}</p>
    `;
  }

  function updateUrl(stateA, stateB) {
    const url = new URL(window.location.href);

    if (stateA && stateB) {
      url.searchParams.set("stateA", stateA);
      url.searchParams.set("stateB", stateB);
    } else {
      url.searchParams.delete("stateA");
      url.searchParams.delete("stateB");
    }

    window.history.replaceState({}, "", url);
  }

  function loadInitialSelection() {
    const params = new URLSearchParams(window.location.search);
    const stateA = findState(params.get("stateA")) || states.find((state) => state.name === "Rajasthan") || states[0];
    const stateB = findState(params.get("stateB")) || states.find((state) => state.name === "Kerala") || states[1];

    if (stateA) stateAInput.value = stateA.name;
    if (stateB) stateBInput.value = stateB.name;

    renderComparison();
  }

  function swapStates() {
    const previousA = stateAInput.value;
    stateAInput.value = stateBInput.value;
    stateBInput.value = previousA;
    renderComparison();
  }

  function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
    const words = String(text).split(/\s+/);
    let line = "";
    let currentY = y;

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (context.measureText(testLine).width > maxWidth && line) {
        context.fillText(line, x, currentY);
        line = word;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    });

    if (line) context.fillText(line, x, currentY);
    return currentY + lineHeight;
  }

  function compactValue(value) {
    return Array.isArray(value) ? value.join(", ") : String(value || "Not available");
  }

  function downloadComparisonImage() {
    const stateA = findState(stateAInput.value);
    const stateB = findState(stateBInput.value);

    if (!stateA || !stateB || stateA.name === stateB.name) {
      setFeedback("Select two different states before downloading an image.");
      return;
    }

    const canvas = document.createElement("canvas");
    const width = 1400;
    const rowHeight = 116;
    const headerHeight = 190;
    const padding = 48;
    const metricWidth = 250;
    const columnWidth = (width - padding * 2 - metricWidth) / 2;
    const height = headerHeight + fields.length * rowHeight + 80;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.fillStyle = "#fffaf0";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#1f2933";
    context.font = "700 42px Arial";
    context.fillText("Indian State Comparison", padding, 70);
    context.font = "700 30px Arial";
    context.fillText(stateA.name, padding, 130);
    context.fillText(stateB.name, padding + columnWidth + metricWidth, 130);

    fields.forEach(([label, key], index) => {
      const y = headerHeight + index * rowHeight;

      context.fillStyle = index % 2 === 0 ? "#ffffff" : "#f8fafc";
      context.fillRect(padding, y, width - padding * 2, rowHeight);
      context.strokeStyle = "#d7dde5";
      context.strokeRect(padding, y, width - padding * 2, rowHeight);

      context.fillStyle = "#d97706";
      context.font = "700 22px Arial";
      wrapCanvasText(context, label, padding + columnWidth + 22, y + 42, metricWidth - 44, 28);

      context.fillStyle = "#1f2933";
      context.font = "20px Arial";
      wrapCanvasText(context, compactValue(stateA[key]), padding + 18, y + 38, columnWidth - 36, 26);
      wrapCanvasText(context, compactValue(stateB[key]), padding + columnWidth + metricWidth + 18, y + 38, columnWidth - 36, 26);
    });

    const link = document.createElement("a");
    link.download = `${stateA.name}-vs-${stateB.name}.png`.replace(/\s+/g, "-").toLowerCase();
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  buildOptions();
  loadInitialSelection();

  stateAInput.addEventListener("input", renderComparison);
  stateBInput.addEventListener("input", renderComparison);
  swapButton?.addEventListener("click", swapStates);
  downloadButton?.addEventListener("click", downloadComparisonImage);
  printButton?.addEventListener("click", () => window.print());
})();

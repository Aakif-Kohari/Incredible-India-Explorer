
document.addEventListener("DOMContentLoaded", () => {
  const data = [{"year": 1951, "population": 361088090, "growth": 13.31, "note": "First Census after Independence; baseline for the animation."}, {"year": 1961, "population": 439234771, "growth": 21.64, "note": "Population crossed 43.9 crore."}, {"year": 1971, "population": 548159652, "growth": 24.8, "note": "Highest post-1951 decadal growth rate in this chart."}, {"year": 1981, "population": 683329097, "growth": 24.66, "note": "1981 all-India total is published with Census caveats for Assam."}, {"year": 1991, "population": 846421039, "growth": 23.87, "note": "1991 all-India total is published with Census caveats for Jammu & Kashmir."}, {"year": 2001, "population": 1028737436, "growth": 21.54, "note": "India crossed one billion people."}, {"year": 2011, "population": 1210854977, "growth": 17.64, "note": "Latest completed Census population figure currently used as the official Census baseline."}];
  const maxPopulation = Math.max(...data.map((item) => item.population));
  const minPopulation = Math.min(...data.map((item) => item.population));

  let index = -1;
  let timerId = null;
  let paused = false;
  let valuesVisible = false;
  let hasAutoPlayed = false;

  const barGrid = document.getElementById("bar-grid");
  const lineLayer = document.getElementById("line-layer");
  const storyCard = document.getElementById("story-card");
  const chartWrap = document.getElementById("chart-wrap");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function crore(value) {
    return `${(value / 10000000).toFixed(1)}Cr`;
  }

  function lineY(population) {
    const ratio = (population - minPopulation) / (maxPopulation - minPopulation);
    return 92 - (ratio * 82);
  }

  function updateMetrics(item) {
    const base = data[0].population;
    document.getElementById("current-year").textContent = item.year;
    document.getElementById("current-population").textContent = crore(item.population);
    document.getElementById("current-growth").textContent = `${item.growth.toFixed(2)}%`;
    document.getElementById("current-index").textContent = `${(item.population / base).toFixed(2)}×`;
    document.getElementById("chart-status").textContent = `Showing ${item.year} Census`;
    storyCard.innerHTML = `<strong>${item.year}:</strong> ${escapeHtml(item.note)}`;
  }

  function renderBars() {
    barGrid.innerHTML = data.map((item, itemIndex) => {
      const height = (item.population / maxPopulation) * 100;
      const visible = itemIndex <= index;
      const active = itemIndex === index;

      return `
        <div class="bar-column ${visible ? "visible" : ""} ${active ? "active" : ""}">
          <div class="bar-value">${crore(item.population)}</div>
          <div class="bar" style="height:${height}%"></div>
          <div class="bar-year">${item.year}</div>
        </div>
      `;
    }).join("");

    chartWrap.classList.toggle("show-values", valuesVisible);
  }

  function renderLine() {
    const visibleData = data.slice(0, index + 1);
    if (visibleData.length < 2) {
      lineLayer.innerHTML = "";
      return;
    }

    const points = visibleData.map((item, itemIndex) => {
      const x = 6 + ((itemIndex / (data.length - 1)) * 88);
      const y = lineY(item.population);
      return `${x},${y}`;
    }).join(" ");

    const circles = visibleData.map((item, itemIndex) => {
      const x = 6 + ((itemIndex / (data.length - 1)) * 88);
      const y = lineY(item.population);
      return `<circle cx="${x}" cy="${y}" r="1.6"></circle>`;
    }).join("");

    lineLayer.innerHTML = `<polyline points="${points}"></polyline>${circles}`;
  }

  function updateVisuals() {
    renderBars();
    renderLine();
    if (data[index]) {
      updateMetrics(data[index]);
    }
  }

  function nextStep() {
    if (index < data.length - 1) {
      index += 1;
      updateVisuals();
      return true;
    }

    clearInterval(timerId);
    timerId = null;
    document.getElementById("chart-status").textContent = "Animation complete";
    return false;
  }

  function play() {
    if (timerId) return;
    paused = false;

    if (index >= data.length - 1) {
      index = -1;
      updateVisuals();
    }

    nextStep();
    timerId = setInterval(() => {
      if (!paused) nextStep();
    }, 1050);
  }

  function pause() {
    paused = !paused;
    document.getElementById("pause-chart").textContent = paused ? "Resume" : "Pause";
    document.getElementById("chart-status").textContent = paused ? "Paused" : "Playing";
  }

  function replay() {
    clearInterval(timerId);
    timerId = null;
    index = -1;
    lineLayer.innerHTML = "";
    renderBars();
    play();
  }

  function stepOnce() {
    clearInterval(timerId);
    timerId = null;
    if (index >= data.length - 1) index = -1;
    nextStep();
  }

  function renderTimeline() {
    document.getElementById("timeline-list").innerHTML = data.map((item) => `
      <div class="timeline-item">
        <strong>${item.year} · ${crore(item.population)}</strong>
        Growth: ${item.growth.toFixed(2)}%<br>
        ${escapeHtml(item.note)}
      </div>
    `).join("");
  }

  function initialiseHeroNumbers() {
    const first = data[0];
    const last = data[data.length - 1];
    document.getElementById("start-pop").textContent = crore(first.population);
    document.getElementById("end-pop").textContent = crore(last.population);
    document.getElementById("growth-pop").textContent = `${(last.population / first.population).toFixed(2)}×`;
  }

  document.getElementById("play-chart").addEventListener("click", play);
  document.getElementById("pause-chart").addEventListener("click", pause);
  document.getElementById("replay-chart").addEventListener("click", replay);
  document.getElementById("next-decade").addEventListener("click", stepOnce);
  document.getElementById("toggle-values").addEventListener("click", () => {
    valuesVisible = !valuesVisible;
    chartWrap.classList.toggle("show-values", valuesVisible);
  });

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !hasAutoPlayed) {
      hasAutoPlayed = true;
      play();
    }
  }, { threshold: 0.34 });

  observer.observe(document.getElementById("population-infographic"));

  initialiseHeroNumbers();
  renderTimeline();
  renderBars();
  storyCard.innerHTML = "<strong>Ready:</strong> Press Play or scroll here to animate India's Census population growth from 1951 to 2011.";

  window.PopulationGrowthInfographic = {
    data: () => [...data],
    play,
    replay,
  };
});

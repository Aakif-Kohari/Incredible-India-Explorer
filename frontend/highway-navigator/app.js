/* ============================================================
   National Highway Navigator — application logic
   ============================================================ */

(function () {
  "use strict";

  const VB_W = 640, VB_H = 760, PAD = 26;

  /* ---------- Projection: real lat/lon -> SVG coordinates ---------- */
  const lons = INDIA_OUTLINE.map(p => p[0]);
  const lats = INDIA_OUTLINE.map(p => p[1]);
  const lonMin = Math.min(...lons), lonMax = Math.max(...lons);
  const latMin = Math.min(...lats), latMax = Math.max(...lats);
  const latMid = (latMin + latMax) / 2;
  const cosCorrection = Math.cos(latMid * Math.PI / 180); // equirectangular correction

  const spanX = (lonMax - lonMin) * cosCorrection;
  const spanY = (latMax - latMin);
  const scale = Math.min((VB_W - PAD * 2) / spanX, (VB_H - PAD * 2) / spanY);
  const offX = PAD + ((VB_W - PAD * 2) - spanX * scale) / 2;
  const offY = PAD + ((VB_H - PAD * 2) - spanY * scale) / 2;

  function project(lon, lat) {
    const x = offX + (lon - lonMin) * cosCorrection * scale;
    const y = offY + (latMax - lat) * scale; // flip Y (north = up)
    return [x, y];
  }

  /* ---------- Build graph ---------- */
  const cityById = Object.fromEntries(CITIES.map(c => [c.id, c]));
  const graph = Object.fromEntries(CITIES.map(c => [c.id, []]));
  EDGES.forEach(([a, b, hwy, km, speed]) => {
    graph[a].push({ to: b, hwy, km, speed });
    graph[b].push({ to: a, hwy, km, speed });
  });

  /* ---------- Dijkstra ---------- */
  function shortestRoute(startId, endId, metric) {
    const dist = {}, prevEdge = {}, prevNode = {}, visited = new Set();
    CITIES.forEach(c => (dist[c.id] = Infinity));
    dist[startId] = 0;
    const pq = new Set(CITIES.map(c => c.id));

    while (pq.size) {
      let u = null, best = Infinity;
      for (const id of pq) if (dist[id] < best) { best = dist[id]; u = id; }
      if (u === null) break;
      pq.delete(u);
      visited.add(u);
      if (u === endId) break;

      for (const edge of graph[u]) {
        if (visited.has(edge.to)) continue;
        const weight = metric === "time" ? edge.km / edge.speed : edge.km;
        const alt = dist[u] + weight;
        if (alt < dist[edge.to]) {
          dist[edge.to] = alt;
          prevEdge[edge.to] = edge;
          prevNode[edge.to] = u;
        }
      }
    }

    if (dist[endId] === Infinity) return null;

    const segments = [];
    let cur = endId;
    while (cur !== startId) {
      const edge = prevEdge[cur];
      const from = prevNode[cur];
      segments.unshift({ from, to: cur, hwy: edge.hwy, km: edge.km, speed: edge.speed });
      cur = from;
    }
    const totalKm = segments.reduce((s, e) => s + e.km, 0);
    const totalHrs = segments.reduce((s, e) => s + e.km / e.speed, 0);
    const highwaysUsed = [...new Set(segments.map(s => s.hwy))];
    return { segments, totalKm, totalHrs, highwaysUsed };
  }

  /* ---------- SVG helpers ---------- */
  const svg = document.getElementById("map-svg");
  const NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function outlinePath() {
    return INDIA_OUTLINE.map((p, i) => {
      const [x, y] = project(p[0], p[1]);
      return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ") + " Z";
  }

  let highlightedHwy = null;
  let activeRoute = null;

  function renderMap() {
    svg.innerHTML = "";
    svg.setAttribute("viewBox", `0 0 ${VB_W} ${VB_H}`);

    // landmass
    svg.appendChild(el("path", { d: outlinePath(), class: "landmass" }));

    // graticule-ish subtle backdrop dots removed for clarity; draw all edges (faint)
    const edgeLayer = el("g", { class: "edge-layer" });
    EDGES.forEach(([a, b, hwy, km]) => {
      const ca = cityById[a], cb = cityById[b];
      const [x1, y1] = project(ca.lon, ca.lat);
      const [x2, y2] = project(cb.lon, cb.lat);
      const isHighlighted = highlightedHwy && hwy === highlightedHwy;
      const line = el("line", {
        x1, y1, x2, y2,
        class: "edge" + (isHighlighted ? " edge-highlighted" : "")
      });
      edgeLayer.appendChild(line);
    });
    svg.appendChild(edgeLayer);

    // active route (drawn on top, animated)
    if (activeRoute) {
      const routeLayer = el("g", { class: "route-layer" });
      activeRoute.segments.forEach(seg => {
        const ca = cityById[seg.from], cb = cityById[seg.to];
        const [x1, y1] = project(ca.lon, ca.lat);
        const [x2, y2] = project(cb.lon, cb.lat);
        routeLayer.appendChild(el("line", { x1, y1, x2, y2, class: "route-line" }));
      });
      svg.appendChild(routeLayer);
    }

    // city nodes
    const nodeLayer = el("g", { class: "node-layer" });
    CITIES.forEach(c => {
      const [x, y] = project(c.lon, c.lat);
      const onRoute = activeRoute && activeRoute.segments.some(s => s.from === c.id || s.to === c.id);
      const isEndpoint = activeRoute && (activeRoute.segments[0].from === c.id || activeRoute.segments[activeRoute.segments.length - 1].to === c.id);
      const g = el("g", { class: "node" + (onRoute ? " node-on-route" : "") + (isEndpoint ? " node-endpoint" : ""), "data-city": c.id });
      g.appendChild(el("circle", { cx: x, cy: y, r: isEndpoint ? 6.5 : onRoute ? 5 : 3.4 }));
      const label = el("text", { x: x + 7, y: y - 6, class: "node-label" });
      label.textContent = c.name;
      g.appendChild(label);
      g.addEventListener("mouseenter", () => showTooltip(c, x, y));
      g.addEventListener("mouseleave", hideTooltip);
      nodeLayer.appendChild(g);
    });
    svg.appendChild(nodeLayer);
  }

  const tooltip = document.getElementById("map-tooltip");
  function showTooltip(city, x, y) {
    tooltip.innerHTML = `<strong>${city.name}</strong><span>${city.state}</span>`;
    tooltip.style.left = (x / VB_W) * 100 + "%";
    tooltip.style.top = (y / VB_H) * 100 + "%";
    tooltip.classList.add("visible");
  }
  function hideTooltip() { tooltip.classList.remove("visible"); }

  /* ---------- UI wiring ---------- */
  const fromSel = document.getElementById("from-select");
  const toSel = document.getElementById("to-select");
  const metricRadios = document.querySelectorAll('input[name="metric"]');
  const planBtn = document.getElementById("plan-btn");
  const swapBtn = document.getElementById("swap-btn");
  const resultPanel = document.getElementById("result-panel");
  const emptyState = document.getElementById("empty-state");

  const sorted = [...CITIES].sort((a, b) => a.name.localeCompare(b.name));
  sorted.forEach(c => {
    const o1 = document.createElement("option");
    o1.value = c.id; o1.textContent = `${c.name}, ${c.state}`;
    fromSel.appendChild(o1);
    const o2 = o1.cloneNode(true);
    toSel.appendChild(o2);
  });
  fromSel.value = "delhi";
  toSel.value = "bengaluru";

  function currentMetric() {
    return [...metricRadios].find(r => r.checked).value;
  }

  function formatHrs(hrs) {
    const h = Math.floor(hrs);
    const m = Math.round((hrs - h) * 60);
    if (h === 0) return `${m} min`;
    return `${h} h ${m.toString().padStart(2, "0")} m`;
  }

  function planRoute() {
    const from = fromSel.value, to = toSel.value;
    if (from === to) {
      resultPanel.innerHTML = `<p class="notice">Pick two different cities to plan a route.</p>`;
      resultPanel.hidden = false;
      emptyState.hidden = true;
      activeRoute = null;
      renderMap();
      return;
    }
    const route = shortestRoute(from, to, currentMetric());
    if (!route) {
      resultPanel.innerHTML = `<p class="notice">No connected highway path found between these cities in the current network.</p>`;
      resultPanel.hidden = false;
      emptyState.hidden = true;
      activeRoute = null;
      renderMap();
      return;
    }
    activeRoute = route;
    highlightedHwy = null;
    renderMap();

    const fromCity = cityById[from], toCity = cityById[to];
    const segHtml = route.segments.map(s => {
      const a = cityById[s.from], b = cityById[s.to];
      return `<li class="segment">
        <span class="shield">${s.hwy}</span>
        <span class="segment-route">${a.name} <span class="arrow">&rarr;</span> ${b.name}</span>
        <span class="segment-km">${s.km} km</span>
      </li>`;
    }).join("");

    resultPanel.innerHTML = `
      <div class="result-summary">
        <div class="summary-stat">
          <span class="summary-value">${Math.round(route.totalKm)}</span>
          <span class="summary-label">kilometres</span>
        </div>
        <div class="summary-stat">
          <span class="summary-value">${formatHrs(route.totalHrs)}</span>
          <span class="summary-label">est. drive time</span>
        </div>
        <div class="summary-stat">
          <span class="summary-value">${route.highwaysUsed.length}</span>
          <span class="summary-label">highway${route.highwaysUsed.length > 1 ? "s" : ""}</span>
        </div>
      </div>
      <p class="route-caption">${fromCity.name} &rarr; ${toCity.name}, optimised for ${currentMetric() === "time" ? "shortest drive time" : "shortest distance"}.</p>
      <ol class="segment-list">${segHtml}</ol>
      <p class="disclaimer">Distances are approximate road distances for illustrative route planning, not turn-by-turn navigation.</p>
    `;
    resultPanel.hidden = false;
    emptyState.hidden = true;
  }

  planBtn.addEventListener("click", planRoute);
  swapBtn.addEventListener("click", () => {
    const f = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = f;
    if (activeRoute) planRoute();
  });
  metricRadios.forEach(r => r.addEventListener("change", () => { if (activeRoute) planRoute(); }));

  /* ---------- Highway directory (identification) ---------- */
  const directory = document.getElementById("highway-directory");
  HIGHWAYS.forEach(h => {
    const card = document.createElement("button");
    card.className = "hwy-card";
    card.type = "button";
    card.innerHTML = `
      <span class="shield shield-lg">${h.nh}</span>
      <span class="hwy-name">${h.name}</span>
      <span class="hwy-meta">${h.length.toLocaleString("en-IN")} km &middot; ${h.states} states</span>
      <span class="hwy-note">${h.note}</span>
    `;
    card.addEventListener("click", () => {
      const already = highlightedHwy === h.nh;
      document.querySelectorAll(".hwy-card").forEach(c => c.classList.remove("active"));
      activeRoute = null;
      resultPanel.hidden = true;
      emptyState.hidden = false;
      if (already) {
        highlightedHwy = null;
      } else {
        highlightedHwy = h.nh;
        card.classList.add("active");
        emptyState.innerHTML = `<p>Highlighting <strong>${h.nh}</strong> — ${h.name} across the network.</p>`;
      }
      if (!highlightedHwy) {
        emptyState.innerHTML = `<p>Choose a start and destination, then plan a route to see it here.</p>`;
      }
      renderMap();
    });
    directory.appendChild(card);
  });

  /* ---------- init ---------- */
  renderMap();
})();

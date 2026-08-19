document.addEventListener("DOMContentLoaded", () => {
  /* ================= DATA ================= */
  const SITES = [
    { id: "delhi", name: "Delhi Heritage Cluster", short: "Delhi", state: "Delhi", zone: "North", type: "Monuments", x: 46, y: 25, cost: 3200, days: 2, energy: 16, rating: 88, summary: "Red Fort, Qutub Minar, Humayun's Tomb, museums and old-city lanes." },
    { id: "agra", name: "Agra Heritage Loop", short: "Agra", state: "Uttar Pradesh", zone: "North", type: "Monuments", x: 49.5, y: 31, cost: 2800, days: 1, energy: 12, rating: 94, summary: "Taj Mahal, Agra Fort, Mughal gardens, marble craft and Yamuna heritage." },
    { id: "jaipur", name: "Jaipur Fort Circuit", short: "Jaipur", state: "Rajasthan", zone: "West", type: "Forts", x: 39.5, y: 32.5, cost: 3500, days: 2, energy: 18, rating: 90, summary: "Amer Fort, city palace routes, craft bazaars, stepwells and pink city landmarks." },
    { id: "rani-ki-vav", name: "Patan Stepwell Strategy", short: "Rani ki Vav", state: "Gujarat", zone: "West", type: "Stepwell", x: 28, y: 42.5, cost: 2400, days: 1, energy: 10, rating: 80, summary: "A compact high-efficiency stop for stepwell architecture and water systems." },
    { id: "sanchi", name: "Sanchi Buddhist Trail", short: "Sanchi", state: "Madhya Pradesh", zone: "Central", type: "Buddhist", x: 49, y: 43.5, cost: 2200, days: 1, energy: 10, rating: 82, summary: "Ancient stupas, gateways, inscriptions and central Indian Buddhist heritage." },
    { id: "khajuraho", name: "Khajuraho Temple Route", short: "Khajuraho", state: "Madhya Pradesh", zone: "Central", type: "Temples", x: 54.5, y: 41.5, cost: 2500, days: 1, energy: 12, rating: 86, summary: "A sculpture-rich temple circuit with strong art and architecture value." },
    { id: "ellora", name: "Ajanta–Ellora Cave Arc", short: "Ajanta–Ellora", state: "Maharashtra", zone: "West", type: "Caves", x: 41, y: 53.5, cost: 3400, days: 2, energy: 17, rating: 92, summary: "A cave-art strategy route across Buddhist, Hindu and Jain rock-cut monuments." },
    { id: "konark", name: "Konark–Puri Heritage Run", short: "Konark–Puri", state: "Odisha", zone: "East", type: "Temples", x: 66.5, y: 55, cost: 3000, days: 2, energy: 16, rating: 87, summary: "Sun Temple sightseeing with coastal travel, Puri culture, crafts and food stops." },
    { id: "sundarbans", name: "Sundarbans Eco-Heritage", short: "Sundarbans", state: "West Bengal", zone: "East", type: "Nature", x: 73.5, y: 51, cost: 3600, days: 2, energy: 22, rating: 88, summary: "A demanding trail through mangrove ecology, boat routes, wildlife and delta life." },
    { id: "hampi", name: "Hampi Vijayanagara Quest", short: "Hampi", state: "Karnataka", zone: "South", type: "Ruins", x: 46, y: 67, cost: 3000, days: 2, energy: 20, rating: 96, summary: "High-reward trail across temples, markets, boulders and Vijayanagara ruins." },
    { id: "mahabalipuram", name: "Mahabalipuram Shore Trail", short: "Mahabalipuram", state: "Tamil Nadu", zone: "South", type: "Coastal", x: 56.5, y: 75.5, cost: 2600, days: 1, energy: 11, rating: 84, summary: "Shore temples, rock-cut monuments, sculpture panels and Pallava heritage." },
    { id: "thanjavur", name: "Thanjavur Chola Circuit", short: "Thanjavur", state: "Tamil Nadu", zone: "South", type: "Temples", x: 53, y: 81.5, cost: 2800, days: 1, energy: 13, rating: 89, summary: "Chola-era temple architecture, bronze traditions and Tamil classical art." }
  ];
  const BY_ID = Object.fromEntries(SITES.map((s) => [s.id, s]));

  const TYPE_META = {
    Monuments: { icon: "🕌", hue: 28 }, Forts: { icon: "🏰", hue: 8 }, Temples: { icon: "🛕", hue: 40 },
    Buddhist: { icon: "☸️", hue: 48 }, Ruins: { icon: "🏛️", hue: 18 }, Coastal: { icon: "🌊", hue: 195 },
    Nature: { icon: "🌿", hue: 135 }, Stepwell: { icon: "🪜", hue: 205 }, Caves: { icon: "🪨", hue: 355 }
  };

  const DIFFS = {
    yatri:     { label: "Yatri",     tag: "Easy",    budget: 24000, days: 10, energy: 120, mult: 0.9 },
    explorer:  { label: "Explorer",  tag: "Classic", budget: 18000, days: 8,  energy: 95,  mult: 1.0 },
    maharathi: { label: "Maharathi", tag: "Hard",    budget: 14500, days: 6,  energy: 75,  mult: 1.25 }
  };

  const MODES = {
    bus:    { label: "Bus",    icon: "🚌", base: 90,   perKm: 0.5,  eBase: 4, ePerKm: 0.038, hint: "cheapest · tiring" },
    train:  { label: "Train",  icon: "🚆", base: 160,  perKm: 0.85, eBase: 3, ePerKm: 0.02,  hint: "balanced cost & comfort" },
    flight: { label: "Flight", icon: "✈️", base: 1500, perKm: 2.0,  eBase: 4, ePerKm: 0.002, hint: "fast · pricey" }
  };

  const SAVED_KEY = "incredible-india-heritage-trail-best";
  const KM_PER_UNIT = 38;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SVG_NS = "http://www.w3.org/2000/svg";

  const INDIA_PATH = "M40.5 5.5 C44 2.8 50 3.2 53.5 7.5 C55.5 10 56.5 13 58.5 16 C62 21 66.5 24.5 71.5 27 C76.5 28.8 82 28.2 86 30.2 C91 32.5 95 35 93.5 38.2 C92 41 88.5 42 85 41.2 C82 40.6 80.5 43.5 79 46.5 C77.8 49 77.5 51.5 76 54.5 C73 60.5 68.5 66.5 64 72.5 C60 78 56.5 85 53.5 92 C52.8 93.8 51.2 93.9 50.4 92.2 C47.8 86 45.5 80 43 74 C40 66.8 37 61 34 56.5 C32 53.5 30.5 52.5 28 51.8 C22.5 50.8 18.5 48.5 18.5 45 C18.5 41.8 22 40.2 27 40.6 C31 41 33.5 40 35.5 36 C37.2 30.5 37.8 24 39.2 17 C40 12 40.2 8.5 40.5 5.5 Z";

  const state = { route: [], diff: "explorer", mode: "train", best: loadBest() };

  /* ================= ELEMENTS ================= */
  const $ = (id) => document.getElementById(id);
  const mapStage = $("map-stage"), tip = $("map-tooltip"), toastStack = $("toast-stack");
  const itineraryList = $("itinerary-list"), savedRouteEl = $("saved-route");
  let legsGroup = null, pinLayer = null;

  const escapeHtml = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const inr = (n) => "₹" + n.toLocaleString("en-IN");

  /* ================= CORE MODEL ================= */
  const distKm = (a, b) => Math.round(Math.hypot(a.x - b.x, a.y - b.y) * KM_PER_UNIT);

  function legBetween(a, b) {
    const km = distKm(a, b);
    const m = MODES[state.mode];
    return { km, cost: Math.round(m.base + km * m.perKm), energy: Math.round(m.eBase + km * m.ePerKm) };
  }

  function computeTotalsFor(ids) {
    const sel = ids.map((id) => BY_ID[id]).filter(Boolean);
    const lim = DIFFS[state.diff];
    const legs = [];
    for (let i = 1; i < sel.length; i++) legs.push({ from: sel[i - 1], to: sel[i], ...legBetween(sel[i - 1], sel[i]) });

    const budget = sel.reduce((s, x) => s + x.cost, 0) + legs.reduce((s, l) => s + l.cost, 0);
    const days = sel.reduce((s, x) => s + x.days, 0);
    const energy = sel.reduce((s, x) => s + x.energy, 0) + legs.reduce((s, l) => s + l.energy, 0);
    const rating = sel.reduce((s, x) => s + x.rating, 0);
    const distance = legs.reduce((s, l) => s + l.km, 0);
    const zones = new Set(sel.map((x) => x.zone)).size;
    const density = sel.length >= 3 ? Math.round(rating / Math.max(days, 1)) : 0;
    const routing = legs.length ? (distance <= 2000 ? 40 : distance <= 3200 ? 20 : 0) : 0;
    const penalty = Math.round(
      Math.max(0, budget - lim.budget) / 160 + Math.max(0, days - lim.days) * 30 + Math.max(0, energy - lim.energy) * 3
    );
    const mult = lim.mult;
    const score = sel.length >= 3 ? Math.max(0, Math.round((rating + zones * 30 + density + routing - penalty) * mult)) : 0;
    const over = { budget: budget > lim.budget, days: days > lim.days, energy: energy > lim.energy };
    return { sel, legs, budget, days, energy, rating, distance, zones, density, routing, penalty, mult, score, over, anyOver: over.budget || over.days || over.energy, lim };
  }
  const totals = () => computeTotalsFor(state.route);

  function rankFor(score, anyOver, count) {
    if (count < 3) return { icon: "🧭", label: "Awaiting route", tier: 0 };
    if (anyOver) return { icon: "⚠️", label: "Over limits", tier: 1 };
    if (score >= 720) return { icon: "👑", label: "Heritage Maharathi", tier: 6 };
    if (score >= 580) return { icon: "🏵️", label: "Route Raja", tier: 5 };
    if (score >= 420) return { icon: "🔥", label: "Trailblazer", tier: 4 };
    if (score >= 260) return { icon: "🗺️", label: "Pathfinder", tier: 3 };
    return { icon: "🥾", label: "Wanderer", tier: 2 };
  }

  function optimizeOrder(ids) {
    const pts = ids.map((id) => BY_ID[id]).filter(Boolean);
    if (pts.length < 3) return ids;
    let best = null, bestD = Infinity;
    for (const start of pts) {
      const remaining = new Set(pts); remaining.delete(start);
      const order = [start]; let cur = start, d = 0;
      while (remaining.size) {
        let next = null, nd = Infinity;
        for (const s of remaining) { const dd = distKm(cur, s); if (dd < nd) { nd = dd; next = s; } }
        remaining.delete(next); order.push(next); d += nd; cur = next;
      }
      if (d < bestD) { bestD = d; best = order; }
    }
    return best.map((s) => s.id);
  }

  /* ================= MAP ================= */
  function buildMapBase() {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.classList.add("map-svg");
    svg.setAttribute("aria-hidden", "true");

    let grid = "";
    for (let i = 12.5; i < 100; i += 12.5) {
      grid += `<line x1="${i}" y1="0" x2="${i}" y2="100"/><line x1="0" y1="${i}" x2="100" y2="${i}"/>`;
    }
    svg.innerHTML = `
      <g class="graticule">${grid}</g>
      <path class="map-outline" d="${INDIA_PATH}"/>
      <g class="mtn">
        <path d="M58 15 l2.2 -2.8 l2.2 2.8"/><path d="M63 18 l2.2 -2.8 l2.2 2.8"/>
        <path d="M68 21 l2.2 -2.8 l2.2 2.8"/><path d="M60.5 19.5 l1.8 -2.3 l1.8 2.3"/>
      </g>
      <text class="sea-label" x="21" y="66" transform="rotate(-72 21 66)">ARABIAN SEA</text>
      <text class="sea-label" x="80" y="64" transform="rotate(72 80 64)">BAY OF BENGAL</text>
      <text class="sea-label" x="45" y="98.5">INDIAN OCEAN</text>
      <g class="compass" transform="translate(10 13)">
        <circle r="5.4"/><path d="M0 -4.4 L1.4 1 L0 0 L-1.4 1 Z"/><text y="8.4">N</text>
      </g>
      <defs>
        <marker id="trail-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#ffb35c"/>
        </marker>
      </defs>
      <g class="map-legs"></g>`;
    mapStage.prepend(svg);
    legsGroup = svg.querySelector(".map-legs");

    pinLayer = document.createElement("div");
    pinLayer.className = "pin-layer";
    mapStage.append(pinLayer);
    mapStage.append(tip);
  }

  function renderMap() {
    const t = totals();
    legsGroup.innerHTML = "";
    t.legs.forEach((l) => {
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", l.from.x); line.setAttribute("y1", l.from.y);
      line.setAttribute("x2", l.to.x); line.setAttribute("y2", l.to.y);
      line.setAttribute("class", "trail-leg");
      line.setAttribute("marker-end", "url(#trail-arrow)");
      legsGroup.append(line);
    });

    pinLayer.innerHTML = "";
    SITES.forEach((site, i) => {
      const idx = state.route.indexOf(site.id);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "site-pin" + (idx > -1 ? " selected" : "");
      btn.style.left = site.x + "%";
      btn.style.top = site.y + "%";
      btn.style.animationDelay = (i * 0.05) + "s";
      btn.setAttribute("aria-pressed", idx > -1);
      btn.setAttribute("aria-label", `${site.name}, ${inr(site.cost)}, ${site.days} days, energy ${site.energy}, rating ${site.rating}`);
      btn.innerHTML = `<span class="pin-dot">${TYPE_META[site.type].icon}${idx > -1 ? `<span class="pin-order">${idx + 1}</span>` : ""}</span><span class="pin-name">${escapeHtml(site.short)}</span>`;
      btn.addEventListener("click", () => toggleSite(site.id));
      btn.addEventListener("mouseenter", () => showTip(site, btn));
      btn.addEventListener("mouseleave", hideTip);
      btn.addEventListener("focus", () => showTip(site, btn));
      btn.addEventListener("blur", hideTip);
      pinLayer.append(btn);
    });
  }

  function showTip(site, btn) {
    tip.innerHTML = `<strong>${escapeHtml(site.name)}</strong>
      <span class="tip-sub">${escapeHtml(site.state)} · ${site.type} · ${site.zone} zone</span>
      <span class="tip-stats">${inr(site.cost)} · ${site.days}d · ⚡${site.energy} · ★${site.rating}</span>
      <span class="tip-cta">${state.route.includes(site.id) ? "Click to remove from route" : "Click to add to route"}</span>`;
    tip.hidden = false;
    const stage = mapStage.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    let left = b.left - stage.left + b.width / 2 - tw / 2;
    let top = b.top - stage.top - th - 12;
    left = Math.max(8, Math.min(left, stage.width - tw - 8));
    if (top < 8) top = b.bottom - stage.top + 12;
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  const hideTip = () => { tip.hidden = true; };

  /* ================= PANELS ================= */
  function setGauge(prefix, value, limit, fmt) {
    $("fill-" + prefix).style.width = Math.min(100, (value / limit) * 100) + "%";
    $(prefix + "-used").textContent = fmt(value, limit);
    const wrap = $("gauge-" + prefix);
    wrap.classList.toggle("over", value > limit);
    wrap.classList.toggle("warn", value <= limit && value > limit * 0.82);
  }

  function renderGauges(t) {
    setGauge("budget", t.budget, t.lim.budget, (v, l) => `${inr(v)} / ${inr(l)}`);
    setGauge("days", t.days, t.lim.days, (v, l) => `${v} / ${l} days`);
    setGauge("energy", t.energy, t.lim.energy, (v, l) => `${v} / ${l}`);
    $("distance-used").textContent = t.distance.toLocaleString("en-IN") + " km";
  }

  let shownScore = 0;
  function setScoreNumber(el, to) {
    if (REDUCED) { el.textContent = to; shownScore = to; return; }
    const from = shownScore, diff = to - from, t0 = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - t0) / 450);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + diff * eased);
      if (p < 1) requestAnimationFrame(step); else shownScore = to;
    })(t0);
  }

  function statusMessage(t) {
    if (!t.sel.length) return "Click map pins to add heritage stops — order matters.";
    if (t.sel.length < 3) return `Add ${3 - t.sel.length} more stop(s): scoring unlocks at 3 stops.`;
    const over = [];
    if (t.over.budget) over.push(`${inr(t.budget - t.lim.budget)} over budget`);
    if (t.over.days) over.push(`${t.days - t.lim.days} day(s) over`);
    if (t.over.energy) over.push(`fatigue +${t.energy - t.lim.energy}`);
    if (over.length) return `Risky route — ${over.join(" · ")}. Optimize order, switch mode, or drop a stop.`;
    const wins = [];
    if (t.zones >= 3) wins.push("excellent cross-zone mix");
    if (t.routing === 40) wins.push("routing bonus secured");
    if (t.distance > 3200) wins.push("long haul — try Optimize order");
    if (!wins.length) wins.push("compact and clean");
    return `${t.sel.length} stops across ${t.zones} zone(s): ${wins.join(" · ")}.`;
  }

  function renderScore(t) {
    setScoreNumber($("strategy-score"), t.score);
    $("score-count").textContent = t.score;
    $("selected-count").textContent = t.sel.length;
    $("bd-base").textContent = t.rating;
    $("bd-zones").textContent = "+" + t.zones * 30;
    $("bd-density").textContent = "+" + t.density;
    $("bd-routing").textContent = "+" + t.routing;
    $("bd-mult").textContent = "×" + t.mult;
    $("bd-penalty").textContent = "−" + t.penalty;
    const rank = rankFor(t.score, t.anyOver, t.sel.length);
    const chip = $("rank-chip");
    chip.textContent = `${rank.icon} ${rank.label}`;
    chip.className = "rank-chip tier-" + rank.tier;
    $("strategy-message").textContent = statusMessage(t);

    const vs = $("vs-best");
    if (state.best && t.sel.length) {
      const delta = t.score - state.best.score;
      vs.hidden = false;
      vs.classList.toggle("ahead", delta >= 0);
      vs.textContent = `Saved best ${state.best.score} · this run ${delta >= 0 ? "+" + delta : delta}`;
    } else vs.hidden = true;
  }

  function renderItinerary(t) {
    if (!t.sel.length) {
      itineraryList.innerHTML = '<div class="empty-route">No stops selected yet — click map pins to build your trail.</div>';
      $("route-status").textContent = "No route selected";
      return;
    }
    $("route-status").textContent = `${t.sel.length} stops · ${t.days} days · ${t.distance.toLocaleString("en-IN")} km`;
    let html = "", dayCursor = 1;
    t.sel.forEach((site, i) => {
      const d1 = dayCursor, d2 = dayCursor + site.days - 1;
      dayCursor = d2 + 1;
      const tm = TYPE_META[site.type];
      html += `
        <article class="stop-card">
          <div class="stop-head">
            <span class="day-badge">Day ${d1}${d2 > d1 ? "–" + d2 : ""}</span>
            <button class="stop-remove" type="button" data-remove="${site.id}" aria-label="Remove ${escapeHtml(site.name)}">✕</button>
          </div>
          <div class="stop-body">
            <span class="stop-tile" style="--tile:${tm.hue}">${tm.icon}</span>
            <div>
              <h4>${escapeHtml(site.name)}</h4>
              <p>${escapeHtml(site.state)} · ${site.type} · ${site.zone} zone</p>
              <p class="stop-sum">${escapeHtml(site.summary)}</p>
            </div>
          </div>
          <div class="stop-meta"><span>${inr(site.cost)}</span><span>${site.days}d</span><span>⚡ ${site.energy}</span><span>★ ${site.rating}</span></div>
        </article>`;
      if (i < t.legs.length) {
        const l = t.legs[i];
        html += `<div class="leg-chip" aria-label="Travel leg to ${escapeHtml(l.to.short)}"><b>${l.km} km</b><span>${MODES[state.mode].icon} ${inr(l.cost)} · ⚡${l.energy}</span></div>`;
      }
    });
    itineraryList.innerHTML = `<div class="timeline">${html}</div>`;
  }

  function renderControls() {
    document.querySelectorAll("#diff-seg [data-diff]").forEach((b) => b.classList.toggle("active", b.dataset.diff === state.diff));
    document.querySelectorAll("#mode-seg [data-mode]").forEach((b) => b.classList.toggle("active", b.dataset.mode === state.mode));
    $("mode-hint").textContent = "· " + MODES[state.mode].hint;
    const lim = DIFFS[state.diff];
    $("bp-budget").textContent = inr(lim.budget);
    $("bp-days").textContent = lim.days;
    $("bp-energy").textContent = lim.energy;
    $("bp-diff").textContent = `${lim.label} · ${lim.tag}`;
  }

  function renderLegend() {
    $("map-legend").innerHTML = Object.entries(TYPE_META)
      .map(([type, m]) => `<span class="legend-chip"><i style="font-style:normal">${m.icon}</i>${type}</span>`).join("");
  }

  /* ================= SAVED ================= */
  function loadBest() { try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "null"); } catch { return null; } }

  function renderSaved() {
    const b = state.best;
    $("load-saved").disabled = !b;
    if (!b) {
      savedRouteEl.innerHTML = '<div class="empty-route">No route saved yet — craft one and press “Save best”.</div>';
      return;
    }
    savedRouteEl.innerHTML = `
      <div class="saved-card">
        <div class="saved-score-wrap"><strong>${b.score}</strong><span>${escapeHtml(b.rank || "Route")} · ${escapeHtml(b.diffLabel || "")} · ${b.modeIcon || ""} ${escapeHtml(b.modeLabel || "")}</span></div>
        <p class="saved-trail">${b.names.map(escapeHtml).join(" → ")}</p>
        <div class="saved-chips"><span>${inr(b.budget)}</span><span>${b.days} days</span><span>⚡ ${b.energy}</span><span>${b.distance.toLocaleString("en-IN")} km</span></div>
      </div>`;
  }

  function saveRoute() {
    const t = totals();
    if (t.sel.length < 3) return toast("Pick at least 3 stops before saving a route.", "warn");
    const isRecord = !state.best || t.score > state.best.score;
    const rank = rankFor(t.score, t.anyOver, t.sel.length);
    state.best = {
      score: t.score, rank: rank.label, diff: state.diff, diffLabel: DIFFS[state.diff].label,
      mode: state.mode, modeLabel: MODES[state.mode].label, modeIcon: MODES[state.mode].icon,
      budget: t.budget, days: t.days, energy: t.energy, distance: t.distance,
      ids: [...state.route], names: t.sel.map((s) => s.name), savedAt: Date.now()
    };
    localStorage.setItem(SAVED_KEY, JSON.stringify(state.best));
    renderSaved(); renderScore(totals());
    if (isRecord) { confettiBurst(); toast(`New best route saved — ${t.score} pts! 🏆`, "good"); }
    else toast("Route saved to Hall of Trails.", "good");
  }

  function loadSavedRoute() {
    if (!state.best) return;
    state.route = [...(state.best.ids || [])];
    if (DIFFS[state.best.diff]) state.diff = state.best.diff;
    if (MODES[state.best.mode]) state.mode = state.best.mode;
    renderAll();
    toast("Saved route loaded — beat it!", "good");
  }

  /* ================= ACTIONS ================= */
  function toggleSite(id) {
    const idx = state.route.indexOf(id);
    if (idx > -1) state.route.splice(idx, 1);
    else {
      state.route.push(id);
      const t = totals();
      if (state.route.length >= 3 && t.anyOver) {
        const w = [];
        if (t.over.budget) w.push("budget");
        if (t.over.days) w.push("days");
        if (t.over.energy) w.push("energy");
        toast(`Careful — ${w.join(" & ")} over limit.`, "warn");
      }
    }
    renderAll();
  }

  function autoPlan() {
    const lim = DIFFS[state.diff];
    const pool = [...SITES].sort((a, b) => (b.rating / b.days) - (a.rating / a.days));
    const picked = [];
    for (const s of pool) {
      const t = computeTotalsFor([...picked, s.id]);
      if (t.budget <= lim.budget && t.days <= lim.days && t.energy <= lim.energy) picked.push(s.id);
    }
    if (picked.length < 3) return toast("Limits too tight for auto-plan — try Yatri difficulty.", "warn");
    state.route = optimizeOrder(picked);
    renderAll();
    toast(`Auto-planned ${picked.length} stops within ${lim.label} limits. Tweak to beat the score!`, "good");
  }

  function optimize() {
    if (state.route.length < 3) return toast("Need 3+ stops to optimize order.", "warn");
    const before = totals().distance;
    state.route = optimizeOrder(state.route);
    const after = totals().distance;
    renderAll();
    toast(after < before ? `Order optimized — saved ${(before - after).toLocaleString("en-IN")} km.` : "Route order is already tight.");
  }

  /* ================= FX ================= */
  function toast(msg, type = "info") {
    const box = document.createElement("div");
    box.className = "toast " + type;
    box.textContent = msg;
    toastStack.append(box);
    setTimeout(() => { box.classList.add("out"); setTimeout(() => box.remove(), 400); }, 3400);
  }

  function confettiBurst() {
    if (REDUCED) return;
    const colors = ["#ff9933", "#f6c453", "#37a45d", "#ffffff"];
    for (let i = 0; i < 46; i++) {
      const p = document.createElement("i");
      p.className = "confetti";
      p.style.left = 50 + (Math.random() * 34 - 17) + "%";
      p.style.background = colors[i % colors.length];
      p.style.width = 5 + Math.random() * 6 + "px";
      p.style.height = 8 + Math.random() * 8 + "px";
      p.style.setProperty("--dx", (Math.random() * 180 - 90) + "px");
      p.style.setProperty("--rot", (Math.random() * 560 - 280) + "deg");
      p.style.animationDelay = (Math.random() * 0.25) + "s";
      mapStage.append(p);
      setTimeout(() => p.remove(), 2300);
    }
  }

  /* ================= WIRING ================= */
  function renderAll() {
    const t = totals();
    renderControls(); renderMap(); renderGauges(t); renderScore(t); renderItinerary(t); renderSaved();
  }

  $("auto-plan").addEventListener("click", autoPlan);
  $("optimize-order").addEventListener("click", optimize);
  $("clear-route").addEventListener("click", () => { state.route = []; renderAll(); toast("Route cleared."); });
  $("save-route").addEventListener("click", saveRoute);
  $("load-saved").addEventListener("click", loadSavedRoute);
  $("clear-saved").addEventListener("click", () => {
    localStorage.removeItem(SAVED_KEY); state.best = null; renderSaved(); renderScore(totals()); toast("Saved route removed.");
  });
  $("diff-seg").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-diff]"); if (!btn) return;
    state.diff = btn.dataset.diff; renderAll();
  });
  $("mode-seg").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-mode]"); if (!btn) return;
    state.mode = btn.dataset.mode; renderAll();
  });
  itineraryList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (btn) toggleSite(btn.dataset.remove);
  });

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => REDUCED ? el.classList.add("in") : io.observe(el));

  // init
  $("site-count").textContent = SITES.length;
  buildMapBase();
  renderLegend();
  renderAll();

  window.HeritageTrailStrategyGame = {
    sites: () => [...SITES],
    autoPlan,
    optimize,
    clear: () => { state.route = []; renderAll(); }
  };
});
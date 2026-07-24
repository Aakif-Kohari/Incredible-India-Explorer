
document.addEventListener("DOMContentLoaded", () => {
  const states = [{"id": "rajasthan", "name": "Rajasthan", "region": "West", "image": "assets/travel_deserts.png", "appeal": 82, "baseTourists": 920, "specialty": "forts, desert circuits, folk stays", "climateRisk": "Heatwave"}, {"id": "kerala", "name": "Kerala", "region": "South", "image": "assets/travel_islands.png", "appeal": 88, "baseTourists": 980, "specialty": "backwaters, Ayurveda, eco-tourism", "climateRisk": "Monsoon delay"}, {"id": "himachal", "name": "Himachal Pradesh", "region": "North", "image": "assets/travel_mountains.png", "appeal": 84, "baseTourists": 860, "specialty": "mountains, trekking, hill towns", "climateRisk": "Landslide warning"}, {"id": "goa", "name": "Goa", "region": "West", "image": "assets/travel_beaches.png", "appeal": 90, "baseTourists": 1020, "specialty": "beaches, nightlife, heritage streets", "climateRisk": "Beach cleanup alert"}, {"id": "assam", "name": "Assam", "region": "Northeast", "image": "assets/travel_forests.png", "appeal": 76, "baseTourists": 720, "specialty": "tea gardens, wildlife, river cruises", "climateRisk": "Flood watch"}];
  const buildings = {"hotel": {"name": "Hotel", "cost": 18000, "revenue": 2200, "happiness": 6, "cleanliness": -2, "amenities": 8, "capacity": 180}, "airport": {"name": "Airport", "cost": 42000, "revenue": 4500, "happiness": 2, "cleanliness": -5, "amenities": 12, "capacity": 420}, "ecoPark": {"name": "Eco Park", "cost": 22000, "revenue": 1800, "happiness": 10, "cleanliness": 8, "amenities": 5, "capacity": 120}, "transport": {"name": "Local Transport", "cost": 14000, "revenue": 1200, "happiness": 8, "cleanliness": -1, "amenities": 6, "capacity": 260}};
  const events = [{"title": "Monsoon delay", "text": "Heavy rains reduce arrivals this month. Invest in cleanliness to protect satisfaction.", "touristDelta": -160, "cleanlinessDelta": -5, "revenueDelta": -1200}, {"title": "Festival surge", "text": "A cultural festival boosts tourism. Higher amenities convert the rush into revenue.", "touristDelta": 260, "cleanlinessDelta": -2, "revenueDelta": 2200}, {"title": "Influencer spotlight", "text": "A viral travel video increases interest in the destination.", "touristDelta": 190, "cleanlinessDelta": 0, "revenueDelta": 1400}, {"title": "Surge pricing backlash", "text": "Tourists complain about prices. Happiness drops unless amenities are strong.", "touristDelta": -90, "cleanlinessDelta": 0, "revenueDelta": 900}, {"title": "Clean city award", "text": "Good cleanliness attracts family travellers and eco-tourists.", "touristDelta": 130, "cleanlinessDelta": 4, "revenueDelta": 1000}];
  const saveKey = "incredible-india-tourism-tycoon-save";

  let game = {
    cash: 85000,
    month: 1,
    stateId: states[0].id,
    ticketPrice: 100,
    cleanlinessSpend: 4000,
    tourists: states[0].baseTourists,
    happiness: 70,
    cleanliness: 68,
    amenities: 20,
    revenue: 0,
    owned: { hotel: 0, airport: 0, ecoPark: 0, transport: 0 },
    lastEvent: null,
  };

  const stateSelect = document.getElementById("state-select");
  const stateCard = document.getElementById("state-card");
  const buildGrid = document.getElementById("build-grid");
  const eventCard = document.getElementById("event-card");

  const formatCurrency = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  function currentState() {
    return states.find((state) => state.id === game.stateId) || states[0];
  }

  function buildingImpact(key) {
    const config = buildings[key];
    const count = game.owned[key] || 0;
    return {
      revenue: config.revenue * count,
      happiness: config.happiness * count,
      cleanliness: config.cleanliness * count,
      amenities: config.amenities * count,
      capacity: config.capacity * count,
    };
  }

  function totals() {
    const impact = Object.keys(buildings).reduce((sum, key) => {
      const item = buildingImpact(key);
      sum.revenue += item.revenue;
      sum.happiness += item.happiness;
      sum.cleanliness += item.cleanliness;
      sum.amenities += item.amenities;
      sum.capacity += item.capacity;
      return sum;
    }, { revenue: 0, happiness: 0, cleanliness: 0, amenities: 0, capacity: 0 });

    const selected = currentState();
    const pricePenalty = Math.max(0, game.ticketPrice - 105) * 0.35;
    const priceBonus = game.ticketPrice / 100;
    const cleanlinessBoost = game.cleanlinessSpend / 1000;
    const tourists = Math.max(80, Math.round(selected.baseTourists + impact.capacity + selected.appeal * 4 - pricePenalty * 12 + game.amenities * 3));
    const happiness = clamp(Math.round(52 + selected.appeal * 0.22 + impact.happiness + cleanlinessBoost * 0.8 + game.amenities * 0.28 - pricePenalty), 0, 100);
    const cleanliness = clamp(Math.round(55 + impact.cleanliness + cleanlinessBoost * 2.4), 0, 100);
    const amenities = Math.round(20 + impact.amenities);
    const revenue = Math.max(0, Math.round((tourists * 18 * priceBonus) + impact.revenue));

    return { tourists, happiness, cleanliness, amenities, revenue, capacity: impact.capacity };
  }

  function portfolioScore() {
    const t = totals();
    return Math.round((t.happiness * 1.4) + (t.cleanliness * 1.1) + (t.amenities * 1.2) + (game.cash / 3500) + (game.month * 3));
  }

  function renderStateOptions() {
    stateSelect.innerHTML = states.map((state) => `<option value="${escapeHtml(state.id)}">${escapeHtml(state.name)}</option>`).join("");
    stateSelect.value = game.stateId;
  }

  function renderStateCard() {
    const state = currentState();
    stateCard.innerHTML = `
      <img src="${escapeHtml(state.image)}" alt="${escapeHtml(state.name)} tourism" onerror="this.src='assets/hero_banner.png'">
      <div>
        <h3>${escapeHtml(state.name)}</h3>
        <p>${escapeHtml(state.region)} India · Appeal ${state.appeal} · ${escapeHtml(state.specialty)} · Risk: ${escapeHtml(state.climateRisk)}</p>
      </div>
    `;
  }

  function renderBuildings() {
    buildGrid.innerHTML = Object.entries(buildings).map(([key, building]) => `
      <article class="build-card">
        <h4>${escapeHtml(building.name)}</h4>
        <p>Cost ${formatCurrency(building.cost)} · +${building.capacity} capacity · +${building.amenities} amenities · happiness ${building.happiness >= 0 ? "+" : ""}${building.happiness}</p>
        <button type="button" data-build="${escapeHtml(key)}" ${game.cash < building.cost ? "disabled" : ""}>Build (${game.owned[key] || 0})</button>
      </article>
    `).join("");

    buildGrid.querySelectorAll("[data-build]").forEach((button) => {
      button.addEventListener("click", () => buildInfrastructure(button.dataset.build));
    });
  }

  function renderMetrics() {
    const t = totals();
    game.tourists = t.tourists;
    game.happiness = t.happiness;
    game.cleanliness = t.cleanliness;
    game.amenities = t.amenities;
    game.revenue = t.revenue;

    document.getElementById("cash").textContent = formatCurrency(game.cash);
    document.getElementById("tourists").textContent = game.tourists.toLocaleString("en-IN");
    document.getElementById("revenue").textContent = formatCurrency(game.revenue);
    document.getElementById("happiness").textContent = `${game.happiness}%`;
    document.getElementById("cleanliness").textContent = `${game.cleanliness}%`;
    document.getElementById("amenities").textContent = game.amenities;
    document.getElementById("cash-hero").textContent = formatCurrency(game.cash);
    document.getElementById("happiness-hero").textContent = `${game.happiness}%`;
    document.getElementById("month-hero").textContent = game.month;
    document.getElementById("ticket-label").textContent = game.ticketPrice;
    document.getElementById("cleanliness-label").textContent = formatCurrency(game.cleanlinessSpend);
    document.getElementById("portfolio-score").textContent = `Score: ${portfolioScore()}`;
  }

  function renderPortfolio() {
    document.getElementById("portfolio-list").innerHTML = Object.entries(buildings).map(([key, building]) => `
      <div class="portfolio-item">${escapeHtml(building.name)}<strong>${game.owned[key] || 0}</strong></div>
    `).join("");
  }

  function renderAll() {
    stateSelect.value = game.stateId;
    renderStateCard();
    renderMetrics();
    renderBuildings();
    renderPortfolio();
  }

  function buildInfrastructure(key) {
    const building = buildings[key];
    if (!building || game.cash < building.cost) return;
    game.cash -= building.cost;
    game.owned[key] += 1;
    eventCard.className = "event-card visible";
    eventCard.innerHTML = `<strong>Built ${escapeHtml(building.name)}.</strong> Capacity and tourism economy improved.`;
    renderAll();
  }

  function randomEvent() {
    return events[Math.floor(Math.random() * events.length)];
  }

  function nextMonth() {
    const event = randomEvent();
    const t = totals();
    const adjustedTourists = Math.max(60, t.tourists + event.touristDelta);
    const adjustedRevenue = Math.max(0, t.revenue + event.revenueDelta - game.cleanlinessSpend);
    game.cash += adjustedRevenue;
    game.month += 1;
    game.cleanliness = clamp(t.cleanliness + event.cleanlinessDelta, 0, 100);
    game.lastEvent = event.title;

    eventCard.className = "event-card visible";
    eventCard.innerHTML = `
      <strong>${escapeHtml(event.title)}</strong><br>
      ${escapeHtml(event.text)}<br>
      Tourists this month: <strong>${adjustedTourists.toLocaleString("en-IN")}</strong> · Net revenue: <strong>${formatCurrency(adjustedRevenue)}</strong>
    `;
    renderAll();
  }

  function saveGame() {
    localStorage.setItem(saveKey, JSON.stringify(game));
    eventCard.className = "event-card visible";
    eventCard.innerHTML = "<strong>Game saved.</strong> Your tourism portfolio is stored in this browser.";
  }

  function resetGame() {
    if (!confirm("Reset Tourism Tycoon simulation?")) return;
    localStorage.removeItem(saveKey);
    game = {
      cash: 85000,
      month: 1,
      stateId: states[0].id,
      ticketPrice: 100,
      cleanlinessSpend: 4000,
      tourists: states[0].baseTourists,
      happiness: 70,
      cleanliness: 68,
      amenities: 20,
      revenue: 0,
      owned: { hotel: 0, airport: 0, ecoPark: 0, transport: 0 },
      lastEvent: null,
    };
    eventCard.className = "event-card";
    eventCard.innerHTML = "";
    renderAll();
  }

  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(saveKey) || "null");
      if (saved && saved.owned) game = saved;
    } catch {
      // Ignore invalid save data.
    }
  }

  renderStateOptions();
  loadSaved();
  renderAll();

  stateSelect.addEventListener("change", () => {
    game.stateId = stateSelect.value;
    renderAll();
  });

  document.getElementById("ticket-price").addEventListener("input", (event) => {
    game.ticketPrice = Number(event.target.value);
    renderAll();
  });

  document.getElementById("cleanliness-spend").addEventListener("input", (event) => {
    game.cleanlinessSpend = Number(event.target.value);
    renderAll();
  });

  document.getElementById("next-month").addEventListener("click", nextMonth);
  document.getElementById("save-game").addEventListener("click", saveGame);
  document.getElementById("reset-game").addEventListener("click", resetGame);

  window.TourismTycoonSimulation = {
    state: () => ({ ...game }),
    nextMonth,
    saveGame,
    resetGame,
  };
});

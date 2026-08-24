import { festivalData, FESTIVAL_CATEGORIES, FESTIVAL_REGIONS } from "./festival-travel-data.js";

const FAVORITES_KEY = "incredible-india-festival-favorites";

const state = {
  festivals: festivalData,
  filteredFestivals: festivalData,
  selectedFestival: null,
  upcomingOnly: false,
  favorites: loadFavorites()
};

const elements = {
  search: document.querySelector("#searchInput"),
  month: document.querySelector("#monthFilter"),
  state: document.querySelector("#stateFilter"),
  region: document.querySelector("#regionFilter"),
  category: document.querySelector("#categoryFilter"),
  clear: document.querySelector("#clearFilters"),
  emptyReset: document.querySelector("#emptyReset"),
  upcomingOnly: document.querySelector("#upcomingOnlyButton"),
  festivalGrid: document.querySelector("#festivalGrid"),
  upcomingGrid: document.querySelector("#upcomingGrid"),
  emptyState: document.querySelector("#emptyState"),
  resultCount: document.querySelector("#resultCount"),
  favoriteCount: document.querySelector("#favoriteCount"),
  favoritesButton: document.querySelector("#favoritesButton"),
  modal: document.querySelector("#festivalModal"),
  modalContent: document.querySelector("#modalContent"),
  heroFestivalName: document.querySelector("#heroFestivalName"),
  heroFestivalLocation: document.querySelector("#heroFestivalLocation")
};

export function normalizeText(value = "") {
  return value.toLowerCase().trim();
}

export function getFestivalMonth(festival) {
  return new Date(`${festival.startDate}T00:00:00`).getMonth() + 1;
}

export function isUpcoming(festival, today = new Date()) {
  const endDate = new Date(`${festival.endDate}T23:59:59`);
  return endDate >= today;
}

export function filterFestivals(
  festivals,
  {
    search = "",
    month = "all",
    stateName = "all",
    region = "all",
    category = "all",
    upcomingOnly = false
  } = {},
  today = new Date()
) {
  const query = normalizeText(search);

  return festivals.filter((festival) => {
    const searchableText = [
      festival.name,
      festival.state,
      festival.city,
      festival.region,
      festival.description,
      ...festival.category
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);

    const matchesMonth =
      month === "all" ||
      getFestivalMonth(festival) === Number(month);

    const matchesState =
      stateName === "all" ||
      festival.state === stateName;

    const matchesRegion =
      region === "all" ||
      festival.region === region;

    const matchesCategory =
      category === "all" ||
      festival.category.includes(category);

    const matchesUpcoming =
      !upcomingOnly ||
      isUpcoming(festival, today);

    return (
      matchesSearch &&
      matchesMonth &&
      matchesState &&
      matchesRegion &&
      matchesCategory &&
      matchesUpcoming
    );
  });
}

export function generateTravelPlan(festival, options = {}) {
  if (!festival) {
    throw new Error("Festival is required to generate a travel plan.");
  }

  const duration = options.duration || festival.recommendedDuration;

  const activities = festival.activities.slice(0, 4);

  return {
    festivalId: festival.id,
    festival: festival.name,
    destination: `${festival.city}, ${festival.state}`,
    duration,
    travelWindow: `${festival.startDate} to ${festival.endDate}`,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Local Exploration",
        activities: [
          `Arrive in ${festival.city}`,
          "Check into accommodation",
          "Explore nearby attractions"
        ]
      },
      {
        day: 2,
        title: `${festival.name} Experience`,
        activities: activities.slice(0, 2)
      },
      {
        day: 3,
        title: "Culture & Local Experiences",
        activities: [
          activities[2] || "Attend a local cultural event",
          activities[3] || "Explore local markets",
          festival.nearbyAttractions[0]
            ? `Visit ${festival.nearbyAttractions[0]}`
            : "Visit a nearby attraction"
        ]
      },
      {
        day: 4,
        title: "Explore & Depart",
        activities: [
          festival.nearbyAttractions[1]
            ? `Visit ${festival.nearbyAttractions[1]}`
            : "Explore the destination",
          "Try local cuisine",
          "Depart with festival memories"
        ]
      }
    ],
    checklist: [
      "Book transport early",
      "Reserve accommodation",
      "Carry valid identification",
      "Check festival venue timings",
      "Pack weather-appropriate clothing",
      "Carry comfortable walking shoes",
      "Keep cash and digital payment options",
      "Respect local customs and traditions"
    ]
  };
}

function loadFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(state.favorites)
  );

  updateFavoriteCount();
}

function updateFavoriteCount() {
  elements.favoriteCount.textContent = state.favorites.length;
}

function isFavorite(id) {
  return state.favorites.includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    state.favorites = state.favorites.filter(
      (favoriteId) => favoriteId !== id
    );
  } else {
    state.favorites.push(id);
  }

  saveFavorites();
  renderFestivals();
  renderUpcoming();
}

function populateFilters() {
  const states = [...new Set(
    state.festivals.map((festival) => festival.state)
  )].sort();

  states.forEach((stateName) => {
    elements.state.insertAdjacentHTML(
      "beforeend",
      `<option value="${escapeHtml(stateName)}">${escapeHtml(stateName)}</option>`
    );
  });

  FESTIVAL_REGIONS.forEach((region) => {
    elements.region.insertAdjacentHTML(
      "beforeend",
      `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`
    );
  });

  FESTIVAL_CATEGORIES.forEach((category) => {
    elements.category.insertAdjacentHTML(
      "beforeend",
      `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`
    );
  });
}

function applyFilters() {
  state.filteredFestivals = filterFestivals(
    state.festivals,
    {
      search: elements.search.value,
      month: elements.month.value,
      stateName: elements.state.value,
      region: elements.region.value,
      category: elements.category.value,
      upcomingOnly: state.upcomingOnly
    }
  );

  renderFestivals();
}

function renderFestivals() {
  elements.resultCount.textContent =
    state.filteredFestivals.length;

  if (!state.filteredFestivals.length) {
    elements.festivalGrid.innerHTML = "";
    elements.emptyState.classList.remove("hidden");
    return;
  }

  elements.emptyState.classList.add("hidden");

  elements.festivalGrid.innerHTML =
    state.filteredFestivals
      .map(createFestivalCard)
      .join("");
}

function createFestivalCard(festival) {
  const favorite = isFavorite(festival.id);

  return `
    <article class="festival-card">
      <div class="festival-image">
        <img
          src="${festival.image}"
          alt="${escapeHtml(festival.name)}"
          loading="lazy"
        />

        <button
          class="favorite-button ${favorite ? "active" : ""}"
          type="button"
          data-favorite="${festival.id}"
          aria-label="${favorite ? "Remove from favourites" : "Save festival"}"
        >
          ${favorite ? "♥" : "♡"}
        </button>

        <span class="category-badge">
          ${escapeHtml(festival.category[0])}
        </span>
      </div>

      <div class="festival-card-body">
        <div class="festival-date">
          📅 ${formatDateRange(festival.startDate, festival.endDate)}
        </div>

        <h3>${escapeHtml(festival.name)}</h3>

        <p class="festival-location">
          📍 ${escapeHtml(festival.city)}, ${escapeHtml(festival.state)}
        </p>

        <p class="festival-description">
          ${escapeHtml(festival.description)}
        </p>

        <div class="card-tags">
          ${festival.category
            .slice(0, 3)
            .map(
              (category) =>
                `<span>${escapeHtml(category)}</span>`
            )
            .join("")}
        </div>

        <button
          class="details-button"
          type="button"
          data-festival="${festival.id}"
        >
          View Festival & Plan →
        </button>
      </div>
    </article>
  `;
}

function renderUpcoming() {
  const upcoming = state.festivals
    .filter((festival) => isUpcoming(festival))
    .sort(
      (a, b) =>
        new Date(a.startDate) - new Date(b.startDate)
    )
    .slice(0, 4);

  elements.upcomingGrid.innerHTML = upcoming
    .map(
      (festival) => `
        <button
          class="upcoming-card"
          type="button"
          data-festival="${festival.id}"
        >
          <div class="upcoming-date">
            ${formatShortDate(festival.startDate)}
          </div>

          <div>
            <h3>${escapeHtml(festival.name)}</h3>
            <p>
              📍 ${escapeHtml(festival.city)},
              ${escapeHtml(festival.state)}
            </p>
          </div>

          <span>→</span>
        </button>
      `
    )
    .join("");
}

function openFestivalModal(id) {
  const festival = state.festivals.find(
    (item) => item.id === id
  );

  if (!festival) return;

  state.selectedFestival = festival;

  const plan = generateTravelPlan(festival);

  elements.modalContent.innerHTML = `
    <div class="modal-header">
      <img
        src="${festival.image}"
        alt="${escapeHtml(festival.name)}"
      />

      <div>
        <span class="eyebrow">${escapeHtml(festival.category.join(" • "))}</span>
        <h2>${escapeHtml(festival.name)}</h2>
        <p>
          📍 ${escapeHtml(festival.city)}, ${escapeHtml(festival.state)}
        </p>
      </div>
    </div>

    <div class="festival-info-grid">
      <div>
        <span>Dates</span>
        <strong>${formatDateRange(festival.startDate, festival.endDate)}</strong>
      </div>

      <div>
        <span>Duration</span>
        <strong>${escapeHtml(festival.recommendedDuration)}</strong>
      </div>

      <div>
        <span>Best Time</span>
        <strong>${escapeHtml(festival.bestTravelPeriod)}</strong>
      </div>

      <div>
        <span>Region</span>
        <strong>${escapeHtml(festival.region)}</strong>
      </div>
    </div>

    <div class="modal-section">
      <h3>About the Festival</h3>
      <p>${escapeHtml(festival.description)}</p>
    </div>

    <div class="modal-section">
      <h3>Cultural Significance</h3>
      <p>${escapeHtml(festival.significance)}</p>
    </div>

    <div class="modal-columns">
      <div class="modal-section">
        <h3>Major Activities</h3>
        <ul>
          ${festival.activities
            .map(
              (activity) =>
                `<li>${escapeHtml(activity)}</li>`
            )
            .join("")}
        </ul>
      </div>

      <div class="modal-section">
        <h3>Nearby Attractions</h3>
        <ul>
          ${festival.nearbyAttractions
            .map(
              (attraction) =>
                `<li>${escapeHtml(attraction)}</li>`
            )
            .join("")}
        </ul>
      </div>
    </div>

    <div class="plan-section">
      <div class="plan-heading">
        <div>
          <span class="eyebrow">SMART ITINERARY</span>
          <h3>${escapeHtml(plan.festival)} Travel Plan</h3>
        </div>

        <button
          class="secondary-button"
          type="button"
          data-modal-favorite="${festival.id}"
        >
          ${isFavorite(festival.id) ? "♥ Saved" : "♡ Save Festival"}
        </button>
      </div>

      <div class="itinerary-list">
        ${plan.itinerary
          .map(
            (day) => `
              <div class="itinerary-day">
                <div class="day-number">${day.day}</div>
                <div>
                  <h4>${escapeHtml(day.title)}</h4>
                  <ul>
                    ${day.activities
                      .map(
                        (activity) =>
                          `<li>${escapeHtml(activity)}</li>`
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            `
          )
          .join("")}
      </div>

      <div class="checklist">
        <h4>Travel Checklist</h4>

        <div class="checklist-grid">
          ${plan.checklist
            .map(
              (item) => `
                <label>
                  <input type="checkbox" />
                  <span>${escapeHtml(item)}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  elements.modal.classList.remove("hidden");
  elements.modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  elements.modal.classList.add("hidden");
  elements.modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function resetFilters() {
  elements.search.value = "";
  elements.month.value = "all";
  elements.state.value = "all";
  elements.region.value = "all";
  elements.category.value = "all";

  state.upcomingOnly = false;
  elements.upcomingOnly.classList.remove("active");

  applyFilters();
}

function showFavorites() {
  state.filteredFestivals = state.festivals.filter(
    (festival) => isFavorite(festival.id)
  );

  elements.resultCount.textContent =
    state.filteredFestivals.length;

  if (!state.filteredFestivals.length) {
    elements.festivalGrid.innerHTML = "";
    elements.emptyState.classList.remove("hidden");

    elements.emptyState.querySelector("h3").textContent =
      "No favourite festivals yet";

    elements.emptyState.querySelector("p").textContent =
      "Save festivals to quickly access them later.";

    return;
  }

  elements.emptyState.classList.add("hidden");

  elements.festivalGrid.innerHTML =
    state.filteredFestivals.map(createFestivalCard).join("");
}

function formatDateRange(start, end) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);

  const formatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  if (start === end) {
    return formatter.format(startDate);
  }

  return `${formatter.format(startDate)} – ${formatter.format(endDate)}`;
}

function formatShortDate(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short"
  }).format(new Date(`${dateString}T00:00:00`));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initializeHero() {
  const upcoming = state.festivals
    .filter((festival) => isUpcoming(festival))
    .sort(
      (a, b) =>
        new Date(a.startDate) - new Date(b.startDate)
    )[0];

  if (!upcoming) return;

  elements.heroFestivalName.textContent = upcoming.name;

  elements.heroFestivalLocation.textContent =
    `${upcoming.city}, ${upcoming.state} • ${formatDateRange(
      upcoming.startDate,
      upcoming.endDate
    )}`;
}

function setupEvents() {
  elements.search.addEventListener("input", applyFilters);
  elements.month.addEventListener("change", applyFilters);
  elements.state.addEventListener("change", applyFilters);
  elements.region.addEventListener("change", applyFilters);
  elements.category.addEventListener("change", applyFilters);

  elements.clear.addEventListener("click", resetFilters);
  elements.emptyReset.addEventListener("click", resetFilters);

  elements.upcomingOnly.addEventListener("click", () => {
    state.upcomingOnly = !state.upcomingOnly;

    elements.upcomingOnly.classList.toggle(
      "active",
      state.upcomingOnly
    );

    applyFilters();
  });

  elements.favoritesButton.addEventListener(
    "click",
    showFavorites
  );

  elements.festivalGrid.addEventListener("click", (event) => {
    const favoriteButton =
      event.target.closest("[data-favorite]");

    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favorite);
      return;
    }

    const detailsButton =
      event.target.closest("[data-festival]");

    if (detailsButton) {
      openFestivalModal(detailsButton.dataset.festival);
    }
  });

  elements.upcomingGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-festival]");

    if (button) {
      openFestivalModal(button.dataset.festival);
    }
  });

  elements.modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-modal]")) {
      closeModal();
      return;
    }

    const favoriteButton =
      event.target.closest("[data-modal-favorite]");

    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.modalFavorite);

      if (state.selectedFestival) {
        openFestivalModal(state.selectedFestival.id);
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function initialize() {
  populateFilters();
  updateFavoriteCount();
  initializeHero();
  setupEvents();
  applyFilters();
  renderUpcoming();
}

initialize();

export {
  isFavorite,
  generateTravelPlan
};
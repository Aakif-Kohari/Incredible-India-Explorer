const MUSIC_DATA = Array.isArray(window.FOLK_MUSIC_DATA) ? window.FOLK_MUSIC_DATA : [];

export const STORAGE_KEY = "iie-folk-music-favorites";

export function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function searchMusic(data, query) {
  const q = normalize(query);
  if (!q) return [...data];
  return data.filter(item => [
    item.name, item.state, item.region, item.category, item.festival,
    item.significance, item.history, item.performance,
    ...(item.instruments || []), ...(item.instrumentTypes || [])
  ].some(value => normalize(value).includes(q)));
}

export function filterMusic(data, filters = {}) {
  return data.filter(item => {
    const stateMatch = !filters.state || item.state === filters.state;
    const regionMatch = !filters.region || item.region === filters.region;
    const categoryMatch = !filters.category || item.category === filters.category;
    const instrumentMatch = !filters.instrumentType ||
      (item.instrumentTypes || []).includes(filters.instrumentType);
    return stateMatch && regionMatch && categoryMatch && instrumentMatch;
  });
}

export function getFilteredMusic(data, filters = {}) {
  return filterMusic(searchMusic(data, filters.query || ""), filters);
}

export function toggleFavorite(ids, id) {
  const next = new Set(ids);
  next.has(id) ? next.delete(id) : next.add(id);
  return next;
}

export function loadFavorites(storage = window.localStorage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

export function saveFavorites(ids, storage = window.localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function uniqueValues(data, field) {
  return [...new Set(data.flatMap(item => {
    const value = item[field];
    return Array.isArray(value) ? value : [value];
  }).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

let favorites = loadFavorites();
let favoritesOnly = false;

const els = {
  grid: document.getElementById("music-grid"),
  search: document.getElementById("music-search"),
  state: document.getElementById("state-filter"),
  region: document.getElementById("region-filter"),
  category: document.getElementById("category-filter"),
  instrument: document.getElementById("instrument-filter"),
  summary: document.getElementById("results-summary"),
  empty: document.getElementById("empty-state"),
  active: document.getElementById("active-filters"),
  modal: document.getElementById("music-modal"),
  modalBody: document.getElementById("modal-body"),
  favoriteCount: document.getElementById("favorite-count"),
  favoritesFilter: document.getElementById("favorites-filter-btn")
};

function optionList(select, values) {
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function getFilters() {
  return {
    query: els.search.value,
    state: els.state.value,
    region: els.region.value,
    category: els.category.value,
    instrumentType: els.instrument.value
  };
}

function renderActiveFilters(filters) {
  const entries = [
    ["query", filters.query ? `Search: ${filters.query}` : ""],
    ["state", filters.state],
    ["region", filters.region],
    ["category", filters.category],
    ["instrumentType", filters.instrumentType]
  ].filter(([, value]) => value);

  els.active.innerHTML = entries.map(([key, value]) =>
    `<button class="filter-chip" type="button" data-filter-key="${key}">${escapeHtml(value)} ×</button>`
  ).join("");

  els.active.querySelectorAll(".filter-chip").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.filterKey;
      if (key === "query") els.search.value = "";
      else if (key === "instrumentType") els.instrument.value = "";
      else els[key].value = "";
      render();
    });
  });
}

function cardTemplate(item) {
  const favorite = favorites.has(item.id);
  return `
    <article class="music-card">
      <div class="music-card-image">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)} folk music tradition" loading="lazy">
        <button class="favorite-btn ${favorite ? "is-favorite" : ""}" data-favorite="${escapeHtml(item.id)}"
          aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}" aria-pressed="${favorite}">
          ${favorite ? "★" : "☆"}
        </button>
      </div>
      <div class="music-card-body">
        <div class="badges">
          <span class="badge">${escapeHtml(item.region)}</span>
          <span class="badge">${escapeHtml(item.category)}</span>
        </div>
        <h3>${escapeHtml(item.name)}</h3>
        <div class="music-meta">📍 ${escapeHtml(item.state)} · 🎉 ${escapeHtml(item.festival)}</div>
        <p>${escapeHtml(item.significance)}</p>
        <div class="card-actions">
          <button class="fm-btn fm-btn-small" data-details="${escapeHtml(item.id)}">Explore tradition</button>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const filters = getFilters();
  let result = getFilteredMusic(MUSIC_DATA, filters);
  if (favoritesOnly) result = result.filter(item => favorites.has(item.id));

  els.grid.innerHTML = result.map(cardTemplate).join("");
  els.empty.hidden = result.length !== 0;
  els.summary.textContent = `${result.length} tradition${result.length === 1 ? "" : "s"} found${favoritesOnly ? " in your favorites" : ""}.`;
  els.favoriteCount.textContent = favorites.size;
  els.favoritesFilter.classList.toggle("is-active", favoritesOnly);
  els.favoritesFilter.textContent = `${favoritesOnly ? "♥" : "♡"} Favorites ${favorites.size}`;
  renderActiveFilters(filters);

  els.grid.querySelectorAll("[data-favorite]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      favorites = toggleFavorite(favorites, button.dataset.favorite);
      saveFavorites(favorites);
      render();
    });
  });
  els.grid.querySelectorAll("[data-details]").forEach(button => {
    button.addEventListener("click", () => openModal(button.dataset.details));
  });
}

function openModal(id) {
  const item = MUSIC_DATA.find(entry => entry.id === id);
  if (!item) return;

  els.modalBody.innerHTML = `
    <img class="modal-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
    <div class="modal-content">
      <div class="badges">
        <span class="badge">${escapeHtml(item.state)}</span>
        <span class="badge">${escapeHtml(item.category)}</span>
      </div>
      <h2 id="modal-title">${escapeHtml(item.name)}</h2>
      <p>${escapeHtml(item.significance)}</p>
      <div class="detail-grid">
        <div class="detail-box"><strong>Region</strong>${escapeHtml(item.region)}</div>
        <div class="detail-box"><strong>Festival association</strong>${escapeHtml(item.festival)}</div>
        <div class="detail-box"><strong>Performance style</strong>${escapeHtml(item.performance)}</div>
        <div class="detail-box"><strong>Historical background</strong>${escapeHtml(item.history)}</div>
      </div>
      <h3>Traditional instruments</h3>
      <div class="instrument-list">${item.instruments.map(i => `<span class="badge">${escapeHtml(i)}</span>`).join("")}</div>
      ${item.audio ? `<h3>Audio sample</h3><audio class="audio-player" controls preload="none" src="${escapeHtml(item.audio)}"></audio>` : ""}
    </div>
  `;
  els.modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  els.modal.hidden = true;
  document.body.style.overflow = "";
}

function resetFilters() {
  els.search.value = "";
  els.state.value = "";
  els.region.value = "";
  els.category.value = "";
  els.instrument.value = "";
  favoritesOnly = false;
  render();
}

function randomDiscovery() {
  const available = getFilteredMusic(MUSIC_DATA, getFilters());
  const pool = favoritesOnly ? available.filter(item => favorites.has(item.id)) : available;
  if (!pool.length) return;
  const item = pool[Math.floor(Math.random() * pool.length)];
  openModal(item.id);
}

function setupNavigation() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => menu?.classList.remove("active"));
  });

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const light = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", light ? "light" : "dark");
  });
}

function init() {
  if (!els.grid) return;
  optionList(els.state, uniqueValues(MUSIC_DATA, "state"));
  optionList(els.region, uniqueValues(MUSIC_DATA, "region"));
  optionList(els.category, uniqueValues(MUSIC_DATA, "category"));
  optionList(els.instrument, uniqueValues(MUSIC_DATA, "instrumentTypes"));

  [els.search, els.state, els.region, els.category, els.instrument].forEach(control => {
    control.addEventListener("input", render);
    control.addEventListener("change", render);
  });

  document.getElementById("clear-filters")?.addEventListener("click", resetFilters);
  document.getElementById("empty-reset")?.addEventListener("click", resetFilters);
  document.getElementById("random-btn")?.addEventListener("click", randomDiscovery);
  els.favoritesFilter?.addEventListener("click", () => {
    favoritesOnly = !favoritesOnly;
    render();
  });
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  els.modal?.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  setupNavigation();
  render();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}

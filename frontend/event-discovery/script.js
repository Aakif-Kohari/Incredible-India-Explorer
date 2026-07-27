import { EventRecommendationEngine } from "../../js-modules/event-recommendation-engine.js";

const BOOKMARKS_KEY = "eventDiscovery.bookmarks.v1";
const ITINERARY_KEY = "eventDiscovery.itineraryEvents.v1";

const events = (window.eventData && window.eventData.events) || [];
const destinations = window.tripDestinations || [];

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Storage may be unavailable (private browsing, quota); fail silently.
  }
}

const engine = new EventRecommendationEngine({
  events,
  bookmarks: loadJSON(BOOKMARKS_KEY, [])
});

let addedEventIds = new Set(loadJSON(ITINERARY_KEY, []).map((e) => e.eventId));

function persistBookmarks() {
  saveJSON(BOOKMARKS_KEY, engine.getBookmarkIds());
}

function persistItinerary(itinerary) {
  saveJSON(ITINERARY_KEY, itinerary);
}

/**
 * Requests Notification permission (if not already decided) and shows a
 * local browser notification. This is a same-device, page-triggered
 * reminder — not a server push — since the app has no push-notification
 * backend. Falls back to the in-page reminders banner when unsupported or
 * denied.
 */
function tryShowLocalNotification(title, body) {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "../../assets/icon-192x192.png" });
    return true;
  }
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body, icon: "../../assets/icon-192x192.png" });
      }
    });
  }
  return false;
}

function renderInterestChips() {
  const wrap = document.getElementById("interest-chips");
  wrap.innerHTML = "";
  EventRecommendationEngine.CATEGORIES.forEach((category) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "interest-chip";
    chip.textContent = category;
    chip.dataset.category = category;
    chip.addEventListener("click", () => chip.classList.toggle("active"));
    wrap.appendChild(chip);
  });
}

function getSelectedInterests() {
  return Array.from(document.querySelectorAll(".interest-chip.active")).map((el) => el.dataset.category);
}

function populateDestinations() {
  const select = document.getElementById("destination-select");
  destinations
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((dest) => {
      const option = document.createElement("option");
      option.value = dest.id;
      option.textContent = `${dest.name}, ${dest.state}`;
      select.appendChild(option);
    });
}

function eventCardHTML({ event, matchScore, isBookmarked }, { showAddButton = true } = {}) {
  const monthLabel = formatMonthRange(event.startMonth, event.endMonth);
  const added = addedEventIds.has(event.id);
  return `
    <div class="event-card" data-event-id="${event.id}">
      <img src="${event.image}" alt="${event.name}" loading="lazy">
      <div class="event-card-body">
        <div class="event-card-top">
          <span class="event-category-badge">${event.category}</span>
          <button type="button" class="bookmark-toggle ${isBookmarked ? "active" : ""}" data-action="bookmark" aria-label="Toggle bookmark for ${event.name}">${isBookmarked ? "★" : "☆"}</button>
        </div>
        <h3>${event.name}</h3>
        <p class="event-meta">${event.location || event.state} · ${monthLabel} · ${event.durationDays}-day${event.durationDays === 1 ? "" : "s"}</p>
        <p class="event-description">${event.description}</p>
        ${
          typeof matchScore === "number"
            ? `<div class="match-score-bar"><div class="match-score-bar-fill" style="width:${Math.round(matchScore * 100)}%"></div></div>`
            : ""
        }
        ${
          showAddButton
            ? `<div class="event-card-actions">
                <button type="button" data-action="add-to-itinerary" class="${added ? "added" : ""}">${added ? "Added ✓" : "Add to itinerary"}</button>
              </div>`
            : ""
        }
      </div>
    </div>
  `;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatMonthRange(start, end) {
  if (start === end) return MONTH_NAMES[start - 1];
  return `${MONTH_NAMES[start - 1]}–${MONTH_NAMES[end - 1]}`;
}

function renderResults(results) {
  const grid = document.getElementById("event-grid");
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("results-count");

  count.textContent = results.length ? `${results.length} event${results.length === 1 ? "" : "s"}` : "";
  grid.innerHTML = "";

  if (results.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  results.forEach((result) => {
    grid.insertAdjacentHTML("beforeend", eventCardHTML(result));
  });
  wireCardActions(grid, results);
}

function renderBookmarks() {
  const grid = document.getElementById("bookmarks-grid");
  const empty = document.getElementById("bookmarks-empty");
  const bookmarked = engine.getBookmarkedEvents();

  grid.innerHTML = "";
  if (bookmarked.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  const wrapped = bookmarked.map((event) => ({ event, isBookmarked: true }));
  wrapped.forEach((result) => grid.insertAdjacentHTML("beforeend", eventCardHTML(result)));
  wireCardActions(grid, wrapped);

  renderReminders(bookmarked);
}

function wireCardActions(container, results) {
  container.querySelectorAll(".event-card").forEach((card) => {
    const eventId = card.dataset.eventId;
    const result = results.find((r) => r.event.id === eventId);
    if (!result) return;

    const bookmarkBtn = card.querySelector('[data-action="bookmark"]');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener("click", () => {
        const nowBookmarked = engine.toggleBookmark(eventId);
        persistBookmarks();
        bookmarkBtn.classList.toggle("active", nowBookmarked);
        bookmarkBtn.textContent = nowBookmarked ? "★" : "☆";
        renderBookmarks();
      });
    }

    const addBtn = card.querySelector('[data-action="add-to-itinerary"]');
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        if (addedEventIds.has(eventId)) return;
        const itinerary = loadJSON(ITINERARY_KEY, []);
        const updated = EventRecommendationEngine.addEventToItinerary(itinerary, result.event);
        persistItinerary(updated);
        addedEventIds.add(eventId);
        addBtn.textContent = "Added ✓";
        addBtn.classList.add("added");
      });
    }
  });
}

function renderReminders(bookmarkedEvents) {
  const section = document.getElementById("reminders-section");
  const banner = document.getElementById("reminders-banner");
  const upcoming = EventRecommendationEngine.getUpcomingReminders(bookmarkedEvents, new Date(), 1);

  if (upcoming.length === 0) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  const names = upcoming.map((u) => u.event.name).join(", ");
  banner.innerHTML = `<strong>Coming up:</strong> ${names} — starting soon among your bookmarked events.`;

  upcoming
    .filter((u) => u.monthsUntil === 0)
    .forEach((u) => tryShowLocalNotification("Event starting soon", `${u.event.name} is happening this month.`));
}

function runSearch() {
  const destinationId = document.getElementById("destination-select").value || undefined;
  const startDate = document.getElementById("start-date").value || undefined;
  const endDate = document.getElementById("end-date").value || undefined;
  const interests = getSelectedInterests();

  const results = engine.recommend({ destinationId, startDate, endDate, interests, limit: 24 });
  renderResults(results);
}

function init() {
  renderInterestChips();
  populateDestinations();
  renderResults(engine.recommend({ limit: 24 }));
  renderBookmarks();

  document.getElementById("filters-form").addEventListener("submit", (e) => {
    e.preventDefault();
    runSearch();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    document.getElementById("destination-select").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.querySelectorAll(".interest-chip.active").forEach((chip) => chip.classList.remove("active"));
    renderResults(engine.recommend({ limit: 24 }));
  });

  document.getElementById("clear-bookmarks-btn").addEventListener("click", () => {
    engine.getBookmarkIds().forEach((id) => engine.toggleBookmark(id));
    persistBookmarks();
    renderBookmarks();
    renderResults(engine.recommend({ limit: 24 }));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

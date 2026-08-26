/**
 * script.js — Tribal Resistance Movements Explorer
 * Renders the map, movement cards, comparison table, timeline, filters
 * and the leader profile modal from window.TRIBAL_DATA (see data.js).
 */
(function () {
  "use strict";

  const DATA = (window.TRIBAL_DATA && window.TRIBAL_DATA.movements) || [];
  const CAUSES = (window.TRIBAL_DATA && window.TRIBAL_DATA.causesTaxonomy) || [];

  const state = { region: "all", tribe: "all", cause: "all", query: "" };
  const compareIds = [];
  let map, markerLayer;
  const markerById = {};

  function el(tag, opts = {}, children = []) {
    const node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html;
    if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (opts.onClick) node.addEventListener("click", opts.onClick);
    children.forEach((c) => c && node.appendChild(c));
    return node;
  }

  function findMovement(id) {
    return DATA.find((m) => m.id === id);
  }

  function causeMatches(movement, causeId) {
    if (causeId === "all") return true;
    const label = (CAUSES.find((c) => c.id === causeId) || {}).label;
    if (!label) return false;
    return movement.causes.some((c) => c.toLowerCase().includes(label.toLowerCase().split(" ")[0].toLowerCase()));
  }

  function populateFilterOptions() {
    const regions = new Set();
    const tribes = new Set();
    DATA.forEach((m) => {
      regions.add(m.region);
      tribes.add(m.tribe);
    });

    const regionSelect = document.getElementById("tr-region-filter");
    [...regions].sort().forEach((r) => regionSelect.appendChild(el("option", { text: r, attrs: { value: r } })));

    const tribeSelect = document.getElementById("tr-tribe-filter");
    [...tribes].sort().forEach((t) => tribeSelect.appendChild(el("option", { text: t, attrs: { value: t } })));

    const causeSelect = document.getElementById("tr-cause-filter");
    CAUSES.forEach((c) => causeSelect.appendChild(el("option", { text: c.label, attrs: { value: c.id } })));

    const compareSelect = document.getElementById("tr-compare-select");
    DATA.forEach((m) => compareSelect.appendChild(el("option", { text: m.name, attrs: { value: m.id } })));
  }

  function matchesFilters(m) {
    if (state.region !== "all" && m.region !== state.region) return false;
    if (state.tribe !== "all" && m.tribe !== state.tribe) return false;
    if (state.cause !== "all" && !causeMatches(m, state.cause)) return false;
    if (state.query) {
      const haystack = [m.name, ...(m.leaders || [])].join(" ").toLowerCase();
      if (!haystack.includes(state.query)) return false;
    }
    return true;
  }

  function getFiltered() {
    return DATA.filter(matchesFilters);
  }

  /* ---------------- Map ---------------- */

  function initMap() {
    if (typeof L === "undefined") return;
    map = L.map("tr-map", { scrollWheelZoom: false }).setView([21.5, 82], 4.3);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
    renderMarkers(DATA);
  }

  function renderMarkers(list) {
    if (!map) return;
    markerLayer.clearLayers();
    Object.keys(markerById).forEach((k) => delete markerById[k]);

    list.forEach((m) => {
      const marker = L.marker([m.location.lat, m.location.lng]);
      const popupNode = el("div", { className: "tr-popup" }, [
        el("h4", { text: m.name }),
        el("p", { text: `${m.location.name} · ${m.years}` }),
        el("button", { text: "View details", onClick: () => focusCard(m.id) })
      ]);
      marker.bindPopup(popupNode);
      marker.addTo(markerLayer);
      markerById[m.id] = marker;
    });
  }

  function focusCard(id) {
    const card = document.getElementById(`tr-card-${id}`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("tr-card--highlight");
    setTimeout(() => card.classList.remove("tr-card--highlight"), 1800);
  }

  /* ---------------- Cards ---------------- */

  function renderCards() {
    const grid = document.getElementById("tr-cards-grid");
    const noResults = document.getElementById("tr-no-results");
    const countLabel = document.getElementById("tr-result-count");
    grid.innerHTML = "";

    const filtered = getFiltered();
    countLabel.textContent = filtered.length === DATA.length
      ? "Showing all movements"
      : `Showing ${filtered.length} of ${DATA.length} movements`;
    noResults.hidden = filtered.length !== 0;

    filtered.forEach((m) => {
      const leaders = el("div", {
        className: "tr-card-leaders",
        html: `<strong>Leader${m.leaders.length > 1 ? "s" : ""}:</strong> ${m.leaders.join(", ")}`,
        attrs: { tabindex: "0", role: "button" },
        onClick: () => openModal(m)
      });

      const causeTags = el("div", { className: "tr-cause-tags" });
      m.causes.forEach((c) => causeTags.appendChild(el("span", { className: "tr-cause-tag", text: c.split(" (")[0] })));

      const sourcesWrap = el("div", { className: "tr-card-sources" });
      (m.sources || []).forEach((s, i) => {
        if (i > 0) sourcesWrap.appendChild(document.createTextNode(" · "));
        sourcesWrap.appendChild(el("a", { text: s.label, attrs: { href: s.url, target: "_blank", rel: "noopener" } }));
      });

      const children = [
        el("div", { className: "tr-card-top" }, [
          el("h3", { text: m.name }),
          el("span", { className: "tr-badge", text: m.years })
        ]),
        el("div", { className: "tr-card-meta" }, [
          document.createTextNode(`${m.location.name} · ${m.region} · ${m.tribe}`)
        ]),
        el("p", { className: "tr-card-desc", text: m.summary }),
        el("p", { className: "tr-card-desc", html: `<strong>Outcome:</strong> ${m.outcome}` }),
        leaders,
        causeTags
      ];

      if (m.relatedPage) {
        children.push(
          el("div", { className: "tr-related-link" }, [
            el("a", { text: `Read more: ${m.relatedPage.label} →`, attrs: { href: m.relatedPage.url } })
          ])
        );
      }

      children.push(sourcesWrap);
      children.push(
        el("button", {
          className: "tr-compare-add",
          text: compareIds.includes(m.id) ? "✓ Added to compare" : "+ Add to compare",
          onClick: (e) => {
            e.stopPropagation();
            addToCompare(m.id);
          }
        })
      );

      const card = el("article", { className: "tr-card", attrs: { id: `tr-card-${m.id}` } }, children);

      card.addEventListener("click", (e) => {
        if (e.target.closest(".tr-card-leaders") || e.target.closest("a") || e.target.closest(".tr-compare-add")) return;
        const marker = markerById[m.id];
        if (marker && map) {
          map.setView(marker.getLatLng(), 6, { animate: true });
          marker.openPopup();
        }
      });

      grid.appendChild(card);
    });
  }

  /* ---------------- Comparison ---------------- */

  function addToCompare(id) {
    if (compareIds.includes(id)) return;
    if (compareIds.length >= 3) {
      compareIds.shift();
    }
    compareIds.push(id);
    renderCompareTable();
    renderCards();
  }

  function removeFromCompare(id) {
    const idx = compareIds.indexOf(id);
    if (idx !== -1) compareIds.splice(idx, 1);
    renderCompareTable();
    renderCards();
  }

  function renderCompareTable() {
    const wrap = document.getElementById("tr-compare-table-wrap");
    wrap.innerHTML = "";

    if (compareIds.length === 0) {
      wrap.appendChild(el("p", { className: "tr-compare-empty", text: "No movements selected yet. Pick from the dropdown above or use \"Add to compare\" on any card." }));
      return;
    }

    const movements = compareIds.map(findMovement).filter(Boolean);
    const rows = [
      { label: "Years", get: (m) => m.years },
      { label: "Region", get: (m) => m.region },
      { label: "Tribe/community", get: (m) => m.tribe },
      { label: "Leaders", get: (m) => m.leaders.join(", ") },
      { label: "Causes", get: (m) => m.causes.join("; ") },
      { label: "Outcome", get: (m) => m.outcome }
    ];

    const table = el("table", { className: "tr-compare-table" });
    const headRow = el("tr", {}, [
      el("th", { text: "" }),
      ...movements.map((m) =>
        el("th", {}, [
          document.createTextNode(m.name),
          el("br"),
          el("button", { className: "tr-compare-remove", text: "remove", onClick: () => removeFromCompare(m.id) })
        ])
      )
    ]);
    table.appendChild(el("thead", {}, [headRow]));

    const tbody = el("tbody");
    rows.forEach((row) => {
      tbody.appendChild(
        el("tr", {}, [
          el("th", { text: row.label }),
          ...movements.map((m) => el("td", { text: row.get(m) }))
        ])
      );
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
  }

  /* ---------------- Timeline ---------------- */

  function renderTimeline() {
    const wrap = document.getElementById("tr-timeline");
    wrap.innerHTML = "";
    const sorted = [...DATA].sort((a, b) => a.startYear - b.startYear);
    sorted.forEach((m) => {
      wrap.appendChild(
        el("div", { className: "tr-timeline-item" }, [
          el("div", { className: "tr-timeline-year", text: m.years }),
          el("h4", { text: m.name }),
          el("p", { text: `${m.region} · led by ${m.leaders.join(", ")}` })
        ])
      );
    });
  }

  /* ---------------- Modal ---------------- */

  function openModal(m) {
    const modal = document.getElementById("tr-modal");
    const body = document.getElementById("tr-modal-body");
    body.innerHTML = "";
    body.appendChild(el("h3", { text: m.name }));
    body.appendChild(el("div", { className: "tr-modal-role", text: `${m.location.name} · ${m.region} · ${m.years}` }));

    const leaderList = el("ul");
    m.leaders.forEach((l) => leaderList.appendChild(el("li", { text: l })));
    body.appendChild(leaderList);

    body.appendChild(el("p", { text: m.summary }));
    body.appendChild(el("p", { html: `<strong>Outcome:</strong> ${m.outcome}` }));

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    const modal = document.getElementById("tr-modal");
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
  }

  /* ---------------- Filters wiring ---------------- */

  function refresh() {
    renderCards();
    renderMarkers(getFiltered());
  }

  function wireFilters() {
    document.getElementById("tr-region-filter").addEventListener("change", (e) => {
      state.region = e.target.value;
      refresh();
    });
    document.getElementById("tr-tribe-filter").addEventListener("change", (e) => {
      state.tribe = e.target.value;
      refresh();
    });
    document.getElementById("tr-cause-filter").addEventListener("change", (e) => {
      state.cause = e.target.value;
      refresh();
    });
    document.getElementById("tr-search").addEventListener("input", (e) => {
      state.query = e.target.value.trim().toLowerCase();
      refresh();
    });
    document.getElementById("tr-reset").addEventListener("click", () => {
      state.region = "all";
      state.tribe = "all";
      state.cause = "all";
      state.query = "";
      document.getElementById("tr-region-filter").value = "all";
      document.getElementById("tr-tribe-filter").value = "all";
      document.getElementById("tr-cause-filter").value = "all";
      document.getElementById("tr-search").value = "";
      refresh();
    });
    document.getElementById("tr-compare-select").addEventListener("change", (e) => {
      if (e.target.value) {
        addToCompare(e.target.value);
        e.target.value = "";
      }
    });

    document.querySelectorAll("[data-tr-close]").forEach((n) => n.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------------- Init ---------------- */

  document.addEventListener("DOMContentLoaded", () => {
    populateFilterOptions();
    wireFilters();
    initMap();
    renderCards();
    renderCompareTable();
    renderTimeline();

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
      });
    }
  });
})();
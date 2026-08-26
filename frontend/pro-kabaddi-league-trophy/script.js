// Incredible India Explorer — Pro Kabaddi League Trophy
// Main script (Issue #2549)
//
// Renders the trophy, the interactive season-by-season champion
// timeline, the team grid (with search + sort), the season table,
// the star-player cards (with detail modal), the venue cards,
// the records grid, and the quiz engine.

import {
  pklTrophy,
  pklTeams,
  pklSeasons,
  pklChampions,
  pklStarPlayers,
  pklVenues,
  pklRecords,
  pklQuizQuestions,
} from "./pkl-data.js";

// ── Global state ────────────────────────────────────────────────────
let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener("DOMContentLoaded", () => {
  initTrophyDisplay();
  initTimeline();
  initTeams();
  initSeasonsTable();
  initStarPlayers();
  initVenues();
  initRecords();
  initQuiz();
  initSubnav();
  initMobileMenu();
  initModalClose();
});

/* --------------------------------------------------------------------------
   1. Trophy display (clickable card → modal)
   -------------------------------------------------------------------------- */
function initTrophyDisplay() {
  const container = document.getElementById("trophy-display");
  if (!container) return;
  container.innerHTML = `
    <div class="trophy-card" data-testid="trophy-card">
      <div class="trophy-emoji">🏆</div>
      <h3>${pklTrophy.name}</h3>
      <p class="subtitle">Inaugurated in ${pklTrophy.inaugurated} · ${pklTrophy.material}</p>
      <div class="trophy-meta">
        <div class="trophy-meta-item">
          <div class="label">Height</div>
          <div class="value">${pklTrophy.height}</div>
        </div>
        <div class="trophy-meta-item">
          <div class="label">Governed By</div>
          <div class="value" style="font-size:0.78rem;">${pklTrophy.governedBy.split("(")[0].trim()}</div>
        </div>
        <div class="trophy-meta-item">
          <div class="label">Awarded To</div>
          <div class="value" style="font-size:0.78rem;">PKL Grand Final Winner</div>
        </div>
      </div>
    </div>
  `;
  container.querySelector(".trophy-card")?.addEventListener("click", () =>
    openModal(`
      <div style="background: linear-gradient(135deg, #dc2626, #f59e0b); padding: 24px; border-radius: 14px; color: #fff; margin-bottom: 20px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 8px;">🏆</div>
        <h2 style="font-size: 1.8rem; margin: 0 0 4px;">${pklTrophy.name}</h2>
        <p style="opacity: 0.9;">Inaugurated in ${pklTrophy.inaugurated}</p>
      </div>
      <div style="background: rgba(255, 176, 31, 0.1); border-left: 3px solid #ffb01f; padding: 14px; border-radius: 10px; margin-bottom: 20px;">
        <h4 style="color: #ffb01f; margin: 0 0 6px; text-transform: uppercase; font-size: 0.9rem;">Design</h4>
        <p style="color: #cbd5e1; line-height: 1.6; margin: 0;">${pklTrophy.design}</p>
      </div>
      <h4 style="color: #ffb01f; margin-bottom: 8px; font-size: 1.1rem;">Significance</h4>
      <p style="color: #cbd5e1; line-height: 1.6;">${pklTrophy.significance}</p>
      <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 8px;">
          <div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px;">Material</div>
          <div style="color: #fff; font-weight: 600; font-size: 0.9rem;">${pklTrophy.material}</div>
        </div>
        <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 8px;">
          <div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px;">Height</div>
          <div style="color: #fff; font-weight: 600; font-size: 0.9rem;">${pklTrophy.height}</div>
        </div>
      </div>
    `),
  );
}

/* --------------------------------------------------------------------------
   2. Interactive season-by-season champion timeline
   -------------------------------------------------------------------------- */
function initTimeline() {
  const slider = document.getElementById("season-slider");
  const ticks = document.getElementById("timeline-ticks");
  if (!slider) return;

  // Render the year ticks under the slider.
  if (ticks) {
    ticks.innerHTML = pklSeasons
      .map((s) => `<span>${s.year}</span>`)
      .join("");
  }

  const render = () => {
    const idx = Number(slider.value);
    const s = pklSeasons[idx];
    if (!s) return;

    const seasonLabel = document.getElementById("timeline-season-label");
    const yearLabel = document.getElementById("timeline-year-label");
    const detail = document.getElementById("timeline-detail");
    if (seasonLabel) seasonLabel.textContent = s.season;
    if (yearLabel) yearLabel.textContent = s.year;

    if (detail) {
      detail.innerHTML = `
        <h3 class="champion-name">🏆 ${s.champion}</h3>
        <p class="runner-up">Runner-up: ${s.runnerUp}</p>
        <div class="stats-row">
          <div class="stat-block">
            <div class="label">Top Raider</div>
            <div class="value">${s.topRaider}</div>
          </div>
          <div class="stat-block">
            <div class="label">Top Defender</div>
            <div class="value">${s.topDefender}</div>
          </div>
          <div class="stat-block">
            <div class="label">Season MVP</div>
            <div class="value">${s.mvp}</div>
          </div>
        </div>
      `;
    }
  };

  slider.addEventListener("input", render);
  render();
}

/* --------------------------------------------------------------------------
   3. Teams grid (search + sort)
   -------------------------------------------------------------------------- */
function initTeams() {
  const searchInput = document.getElementById("team-search");
  const sortSelect = document.getElementById("team-sort");
  const container = document.getElementById("team-cards-container");
  if (!container) return;

  const render = () => {
    const q = (searchInput?.value || "").toLowerCase().trim();
    const sort = sortSelect?.value || "name-asc";

    let filtered = pklTeams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q),
    );

    filtered.sort((a, b) => {
      switch (sort) {
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "titles-desc":
          return b.titles - a.titles;
        case "founded-asc":
          return a.founded - b.founded;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#94a3b8;">No teams match your search.</div>`;
      return;
    }

    container.innerHTML = filtered
      .map(
        (t) => `
      <div class="team-card" style="--team-color: ${t.primaryColor};" data-id="${t.id}">
        <h3 class="team-name">${t.name}</h3>
        <p class="team-city">📍 ${t.city}</p>
        <div class="team-meta">
          <div><strong>Founded:</strong> ${t.founded}</div>
          <div><strong>Home:</strong> ${t.homeVenue}</div>
        </div>
        ${t.titles > 0 ? `<span class="team-titles">🏆 ${t.titles} ${t.titles === 1 ? "Title" : "Titles"}</span>` : ""}
      </div>
    `,
      )
      .join("");
  };

  searchInput?.addEventListener("input", render);
  sortSelect?.addEventListener("change", render);
  render();
}

/* --------------------------------------------------------------------------
   4. Seasons table
   -------------------------------------------------------------------------- */
function initSeasonsTable() {
  const body = document.getElementById("season-table-body");
  if (!body) return;
  body.innerHTML = pklSeasons
    .map(
      (s) => `
    <tr>
      <td>S${s.season}</td>
      <td>${s.year}</td>
      <td class="champion-cell">${s.champion}</td>
      <td>${s.runnerUp}</td>
      <td>${s.topRaider}</td>
      <td>${s.topDefender}</td>
      <td>${s.mvp}</td>
    </tr>
  `,
    )
    .join("");
}

/* --------------------------------------------------------------------------
   5. Star players grid (card → modal)
   -------------------------------------------------------------------------- */
function initStarPlayers() {
  const container = document.getElementById("star-cards-container");
  if (!container) return;

  container.innerHTML = pklStarPlayers
    .map((p) => {
      const initials = p.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("");
      return `
        <div class="star-card" data-id="${p.id}">
          <div class="star-avatar">${initials}</div>
          <h3 class="star-name">${p.name}</h3>
          <p class="star-nickname">${p.nickname}</p>
          <span class="star-role">${p.role}</span>
          <p class="star-team">👥 ${p.team}</p>
          <p class="star-points">${p.careerPoints.toLocaleString()} career points</p>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll(".star-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      const p = pklStarPlayers.find((x) => x.id === id);
      if (p) {
        const initials = p.name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("");
        openModal(`
          <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #dc2626, #f59e0b); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 800; color: #fff;">${initials}</div>
            <div>
              <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: #fff; margin: 0 0 4px;">${p.name}</h2>
              <p style="color: #ffb01f; font-style: italic; margin: 0;">${p.nickname}</p>
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px;">
            <span style="padding: 4px 12px; border-radius: 12px; background: rgba(255,255,255,0.06); font-size: 0.8rem; color: #cbd5e1;">${p.role}</span>
            <span style="padding: 4px 12px; border-radius: 12px; background: rgba(255,255,255,0.06); font-size: 0.8rem; color: #cbd5e1;">👥 ${p.team}</span>
            <span style="padding: 4px 12px; border-radius: 12px; background: rgba(255,176,31,0.12); font-size: 0.8rem; color: #ffb01f; font-weight: 700;">${p.careerPoints.toLocaleString()} pts</span>
          </div>
          <div style="background: rgba(255,176,31,0.1); border-left: 3px solid #ffb01f; padding: 14px; border-radius: 10px; margin-bottom: 18px;">
            <h4 style="color: #ffb01f; margin: 0 0 6px; text-transform: uppercase; font-size: 0.85rem;">Signature Move</h4>
            <p style="color: #cbd5e1; margin: 0;">${p.signatureMove}</p>
          </div>
          <h4 style="color: #ffb01f; margin-bottom: 8px; font-size: 1.05rem;">Biography</h4>
          <p style="color: #cbd5e1; line-height: 1.7;">${p.bio}</p>
        `);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Venues grid
   -------------------------------------------------------------------------- */
function initVenues() {
  const container = document.getElementById("venue-cards-container");
  if (!container) return;
  container.innerHTML = pklVenues
    .map(
      (v) => `
    <div class="venue-card">
      <div class="venue-emoji">🏟️</div>
      <h3 class="venue-name">${v.name}</h3>
      <p class="venue-city">📍 ${v.city}</p>
      <p class="venue-capacity">👥 Capacity: ${v.capacity.toLocaleString()}</p>
      <p class="venue-hosted"><strong>Hosted:</strong> ${v.hosted}</p>
      <p class="venue-significance">${v.significance}</p>
    </div>
  `,
    )
    .join("");
}

/* --------------------------------------------------------------------------
   7. Records grid
   -------------------------------------------------------------------------- */
function initRecords() {
  const container = document.getElementById("records-container");
  if (!container) return;
  container.innerHTML = pklRecords
    .map(
      (r) => `
    <div class="record-card">
      <div class="record-category">${r.category}</div>
      <div class="record-name">${r.record}</div>
      <div class="record-holder">${r.holder}</div>
      <div class="record-value">${r.value}</div>
    </div>
  `,
    )
    .join("");
}

/* --------------------------------------------------------------------------
   8. Quiz engine
   -------------------------------------------------------------------------- */
function initQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById("quiz-content");
  if (!box) return;

  if (currentQuizIndex >= pklQuizQuestions.length) {
    box.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <h3 style="font-size:1.8rem; color: #ffb01f; margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color: #fff; margin-bottom:20px;">
          Your Final Score: <strong>${quizScore} / ${pklQuizQuestions.length}</strong>
        </p>
        <button class="subnav-btn active" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById("quiz-restart-btn")?.addEventListener("click", initQuiz);
    return;
  }

  const q = pklQuizQuestions[currentQuizIndex];
  box.innerHTML = `
    <div style="font-size:0.9rem; color: #ffb01f; font-weight:700; margin-bottom:10px;">
      Question ${currentQuizIndex + 1} of ${pklQuizQuestions.length}
    </div>
    <h3 style="font-size:1.3rem; margin-bottom:20px; color:#fff; line-height:1.4;">${q.question}</h3>
    <div>
      ${q.options
        .map(
          (opt, i) =>
            `<button class="quiz-option" data-index="${i}">${opt}</button>`,
        )
        .join("")}
    </div>
    <div id="quiz-explanation" style="margin-top:20px; display:none; padding:14px; border-radius:10px; background:rgba(255,176,31,0.1); border-left:3px solid #ffb01f; font-size:0.95rem; color:#cbd5e1;"></div>
  `;

  box.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      handleQuizAnswer(idx, q.answer, q.explanation);
    });
  });
}

function handleQuizAnswer(selectedIdx, correctIdx, explanation) {
  const options = document.querySelectorAll(".quiz-option");
  options.forEach((opt, i) => {
    opt.disabled = true;
    if (i === correctIdx) opt.classList.add("correct");
    if (i === selectedIdx && i !== correctIdx) opt.classList.add("incorrect");
  });

  if (selectedIdx === correctIdx) quizScore++;

  const expBox = document.getElementById("quiz-explanation");
  if (expBox) {
    expBox.style.display = "block";
    expBox.innerHTML = `<strong>${selectedIdx === correctIdx ? "✅ Correct!" : "❌ Incorrect."}</strong> ${explanation}`;
  }

  setTimeout(() => {
    currentQuizIndex++;
    renderQuizQuestion();
  }, 3200);
}

/* --------------------------------------------------------------------------
   9. Sub-nav smooth scroll + active highlight
   -------------------------------------------------------------------------- */
function initSubnav() {
  const btns = document.querySelectorAll(".subnav-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Highlight the active section as the user scrolls.
  const sections = document.querySelectorAll("main .archive-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          btns.forEach((b) => b.classList.remove("active"));
          const matching = document.querySelector(
            `.subnav-btn[data-target="${entry.target.id}"]`,
          );
          matching?.classList.add("active");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  sections.forEach((s) => observer.observe(s));
}

/* --------------------------------------------------------------------------
   10. Mobile menu toggle + modal close
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  menuToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");
  });
}

function initModalClose() {
  const modal = document.getElementById("detail-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target.id === "detail-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal(html) {
  const modal = document.getElementById("detail-modal");
  const body = document.getElementById("modal-body-content");
  if (!modal || !body) return;
  body.innerHTML = html;
  modal.classList.add("active");
  body.scrollTop = 0;
}

function closeModal() {
  document.getElementById("detail-modal")?.classList.remove("active");
}

// Incredible India Explorer — Indian Sports Mascots
// Main script (Issue #2560)
//
// Renders the mascot gallery (with search + sport + decade filters),
// the horizontal timeline, the quiz engine, and the image-credits
// section. Mascot detail opens in a modal.

import { mascotsData } from "./mascot-data.js";

// ── Build the quiz from the mascot dataset at load time ──────────
const mascotQuizQuestions = [
  {
    id: 1,
    question: "Which mascot, a Royal Bengal Tiger, represented the 2010 Commonwealth Games in Delhi?",
    options: ["Stumpy", "Shera", "Kheleo", "Bhaukal"],
    answer: 1,
    explanation: "Shera (Hindi for 'tiger') was the mascot of the 2010 Commonwealth Games held in New Delhi.",
  },
  {
    id: 2,
    question: "Kheleo, the mascot of the 2017 FIFA U-17 World Cup, was modeled on which endangered Indian animal?",
    options: ["Asiatic Lion", "Himalayan Monal", "Clouded Leopard", "Indian Gaur"],
    answer: 2,
    explanation: "Kheleo is a clouded leopard cub, an endangered species native to the forests of northeast India.",
  },
  {
    id: 3,
    question: "Which mascot's name is a Hindi/Gujarati slang word meaning 'swagger' or 'grandeur'?",
    options: ["Gaurav", "Bhaukal", "Savaj", "Ola"],
    answer: 1,
    explanation: "Bhaukal (भौकाल) — the Asiatic Lion mascot of the 2022 National Games in Gujarat — means 'swagger' or 'majestic aura'.",
  },
  {
    id: 4,
    question: "Stumpy, the mascot of the 2011 ICC Cricket World Cup, is which animal?",
    options: ["Tiger", "Elephant", "Leopard", "Lion"],
    answer: 1,
    explanation: "Stumpy is a blue elephant calf, chosen for the elephant's cultural significance in India (Ganesha) and its universal appeal.",
  },
  {
    id: 5,
    question: "Savaj, the mascot of the 2024 National Games in Uttarakhand, is based on which state bird?",
    options: ["Himalayan Monal", "Indian Peacock", "Sarus Crane", "Great Hornbill"],
    answer: 0,
    explanation: "Savaj is the Himalayan Monal (Lophophorus impejanus), the state bird of Uttarakhand, known for its iridescent nine-colour plumage.",
  },
];

// ── Global state ────────────────────────────────────────────────────
let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener("DOMContentLoaded", () => {
  initMascotGallery();
  initTimeline();
  initQuiz();
  initCredits();
  initSubnav();
  initMobileMenu();
  initModalClose();
});

/* --------------------------------------------------------------------------
   1. Mascot gallery (search + sport + decade filters)
   -------------------------------------------------------------------------- */
function initMascotGallery() {
  const searchInput = document.getElementById("mascot-search");
  const sportFilter = document.getElementById("sport-filter");
  const decadeFilter = document.getElementById("decade-filter");
  const container = document.getElementById("mascot-cards-container");
  if (!container) return;

  const render = () => {
    const q = (searchInput?.value || "").toLowerCase().trim();
    const sport = sportFilter?.value || "all";
    const decade = decadeFilter?.value || "all";

    const filtered = mascotsData.filter((m) => {
      // Text search across name, event, hostCity, designer.
      const matchesText =
        m.name.toLowerCase().includes(q) ||
        m.event.toLowerCase().includes(q) ||
        m.hostCity.toLowerCase().includes(q) ||
        m.designer.toLowerCase().includes(q);
      // Sport filter — match exact sport OR Multi-Sport (always shown).
      const matchesSport = sport === "all" || m.sport === sport;
      // Decade filter.
      const matchesDecade =
        decade === "all" ||
        (decade === "2010s" && m.year >= 2010 && m.year <= 2019) ||
        (decade === "2020s" && m.year >= 2020 && m.year <= 2029);
      return matchesText && matchesSport && matchesDecade;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#94a3b8;">No mascots match your filters.</div>`;
      return;
    }

    container.innerHTML = filtered
      .map(
        (m) => `
      <div class="mascot-card" style="--mascot-color: ${m.color};" data-id="${m.id}" data-testid="mascot-card-${m.id}">
        <span class="mascot-emoji">${m.icon}</span>
        <h3 class="mascot-name">${m.name}</h3>
        <p class="mascot-event">${m.event}</p>
        <div class="mascot-meta">
          <div><strong>Year:</strong> ${m.year}</div>
          <div><strong>Host City:</strong> ${m.hostCity}</div>
          <div><strong>Sport:</strong> ${m.sport}</div>
        </div>
        <span class="mascot-view-btn">View Details →</span>
      </div>
    `,
      )
      .join("");

    // Wire up card clicks.
    container.querySelectorAll(".mascot-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const mascot = mascotsData.find((m) => m.id === id);
        if (mascot) openMascotModal(mascot);
      });
    });
  };

  searchInput?.addEventListener("input", render);
  sportFilter?.addEventListener("change", render);
  decadeFilter?.addEventListener("change", render);
  render();
}

/* --------------------------------------------------------------------------
   2. Timeline (horizontal scroll)
   -------------------------------------------------------------------------- */
function initTimeline() {
  const track = document.getElementById("timeline-track");
  if (!track) return;
  const sorted = [...mascotsData].sort((a, b) => a.year - b.year);
  track.innerHTML = sorted
    .map(
      (m) => `
    <div class="timeline-item" data-id="${m.id}" style="border-top: 3px solid ${m.color};">
      <div class="timeline-year">${m.year}</div>
      <div class="timeline-emoji">${m.icon}</div>
      <div class="timeline-name">${m.name}</div>
      <div class="timeline-event">${m.event}<br/>📍 ${m.hostCity}</div>
    </div>
  `,
    )
    .join("");

  track.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      const mascot = mascotsData.find((m) => m.id === id);
      if (mascot) openMascotModal(mascot);
    });
  });
}

/* --------------------------------------------------------------------------
   3. Quiz engine
   -------------------------------------------------------------------------- */
function initQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById("quiz-content");
  if (!box) return;

  if (currentQuizIndex >= mascotQuizQuestions.length) {
    box.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <h3 style="font-size:1.8rem; color: #ffb01f; margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color: #fff; margin-bottom:20px;">
          Your Final Score: <strong>${quizScore} / ${mascotQuizQuestions.length}</strong>
        </p>
        <button class="quiz-restart" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById("quiz-restart-btn")?.addEventListener("click", initQuiz);
    return;
  }

  const q = mascotQuizQuestions[currentQuizIndex];
  box.innerHTML = `
    <div class="quiz-progress">Question ${currentQuizIndex + 1} of ${mascotQuizQuestions.length}</div>
    <h3 class="quiz-question">${q.question}</h3>
    <div>
      ${q.options
        .map(
          (opt, i) =>
            `<button class="quiz-option" data-index="${i}">${opt}</button>`,
        )
        .join("")}
    </div>
    <div class="quiz-explanation" id="quiz-explanation"></div>
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
   4. Image credits
   -------------------------------------------------------------------------- */
function initCredits() {
  const container = document.getElementById("credits-container");
  if (!container) return;
  container.innerHTML = mascotsData
    .map(
      (m) => `
    <div class="credit-item">
      <strong>${m.name}</strong> (${m.event}, ${m.year}): ${m.imageCredit}
    </div>
  `,
    )
    .join("");
}

/* --------------------------------------------------------------------------
   5. Mascot detail modal
   -------------------------------------------------------------------------- */
function openMascotModal(m) {
  const modal = document.getElementById("mascot-modal");
  const body = document.getElementById("modal-body-content");
  if (!modal || !body) return;

  body.innerHTML = `
    <span class="modal-emoji">${m.icon}</span>
    <h2 class="modal-name">${m.name}</h2>
    <p class="modal-event">${m.event} · ${m.year}</p>

    <div class="modal-meta-grid">
      <div class="modal-meta-item">
        <div class="label">Host City</div>
        <div class="value">${m.hostCity}</div>
      </div>
      <div class="modal-meta-item">
        <div class="label">Sport</div>
        <div class="value">${m.sport}</div>
      </div>
      <div class="modal-meta-item">
        <div class="label">Designer</div>
        <div class="value" style="font-size:0.82rem;">${m.designer}</div>
      </div>
      <div class="modal-meta-item">
        <div class="label">Year</div>
        <div class="value">${m.year}</div>
      </div>
    </div>

    <div class="modal-section">
      <h4>Design</h4>
      <p>${m.design}</p>
    </div>

    <div class="modal-section">
      <h4>Meaning</h4>
      <p>${m.meaning}</p>
    </div>

    <div class="modal-section">
      <h4>Cultural Inspiration</h4>
      <p>${m.culturalInspiration}</p>
    </div>

    <div class="modal-credit">
      <strong>Image Credit:</strong> ${m.imageCredit}
    </div>
  `;
  modal.classList.add("active");
  body.scrollTop = 0;
}

function closeModal() {
  document.getElementById("mascot-modal")?.classList.remove("active");
}

/* --------------------------------------------------------------------------
   6. Sub-nav smooth scroll + active highlight
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
   7. Mobile menu toggle + modal close
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  menuToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");
  });
}

function initModalClose() {
  const modal = document.getElementById("mascot-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target.id === "mascot-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

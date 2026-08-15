document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".sy-gallery-item")];
  const leaderCards = [...document.querySelectorAll(".sy-leader-card")];

  const modal = document.getElementById("sy-modal");
  const modalClose = document.getElementById("sy-modal-close");
  const modalTitle = document.getElementById("sy-modal-title");
  const modalRole = document.getElementById("sy-modal-role");
  const modalDescription = document.getElementById("sy-modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Student & Youth Resistance Explorer";
      const thumbnail = "frontend/assets/student_youth_resistance_hero.svg";
      const category = "history";

      const updateBookmarkUI = () => {
        const isSaved = window.Journey.isSaved(id);
        btn.classList.toggle("is-saved", isSaved);
        btn.setAttribute("aria-pressed", String(isSaved));
        btn.innerHTML = isSaved ? "♥ Saved to Journey" : "♡ Save to Journey";
      };

      updateBookmarkUI();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id,
          explorerPage: "frontend/student-youth-resistance-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    window.Journey.registerSearchItems("frontend/student-youth-resistance-explorer/index.html", [
      {
        id: "sy-main",
        title: "Student & Youth Resistance Explorer",
        description: "Explore how students and young people shaped India's freedom movement — Swadeshi, National Education, Non-Cooperation, revolutionary youth, and Quit India.",
        link: "frontend/student-youth-resistance-explorer/index.html"
      },
      {
        id: "sy-movements",
        title: "Movements Led by Students",
        description: "Anti-Partition 1905, Swadeshi, National Education Movement, Non-Cooperation, and Quit India — all led by students and youth.",
        link: "frontend/student-youth-resistance-explorer/index.html#movements"
      },
      {
        id: "sy-map",
        title: "Student Resistance Map",
        description: "Interactive institution-based map showing student activism across Calcutta, Aligarh, Kanpur, Delhi, Bombay, Madras, and more.",
        link: "frontend/student-youth-resistance-explorer/index.html#map"
      },
      {
        id: "sy-leaders",
        title: "Young Leaders of the Resistance",
        description: "Aurobindo Ghosh, Bhagat Singh, Khudiram Bose, Sukhdev, Aruna Asaf Ali, and other young freedom fighters.",
        link: "frontend/student-youth-resistance-explorer/index.html#leaders"
      },
      {
        id: "sy-timeline",
        title: "Timeline of Student Resistance",
        description: "From the 1905 Partition protests to the 1942 Quit India uprising — a chronology of youth-led action.",
        link: "frontend/student-youth-resistance-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Map Filter Logic ---------------------------------------------
  const filterButtons = [...document.querySelectorAll(".sy-filter-btn")];
  const movementLabels = {
    all: "Showing all student resistance locations across India. Click a node for details.",
    swadeshi: "Anti-Partition & Swadeshi (1905): Calcutta, Bombay, Aligarh, and Madras boycott protests.",
    education: "National Education Movement: institutions like BHU, AMU, Presidency College driving indigenous learning.",
    noncoop: "Non-Cooperation (1920–22): student resignations, flag hoisting, and picketing across universities.",
    revolution: "Young Revolutionaries: Kanpur, Delhi, and Lahore as hubs of armed resistance societies.",
    quitindia: "Quit India (1942): campus uprisings, underground presses, and mass arrests in Delhi, Nagpur, Bombay."
  };

  function applyFilter(filterValue) {
    const lines = [...document.querySelectorAll(".sy-map-line")];
    const nodes = [...document.querySelectorAll(".sy-map-node")];

    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === filterValue;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    if (filterValue === "all") {
      lines.forEach((line) => line.classList.remove("sy-line-active", "sy-line-dim"));
      nodes.forEach((node) => node.classList.remove("sy-node-dim"));
    } else {
      lines.forEach((line) => {
        const matches = (line.dataset.movement || "").split(" ").includes(filterValue);
        line.classList.toggle("sy-line-active", matches);
        line.classList.toggle("sy-line-dim", !matches);
      });
      nodes.forEach((node) => {
        const matches = (node.dataset.movement || "").split(" ").includes(filterValue);
        node.classList.toggle("sy-node-dim", !matches);
      });
    }

    const caption = document.getElementById("sy-map-caption");
    if (caption) {
      caption.textContent = movementLabels[filterValue] || movementLabels.all;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });

  // --- Gallery Modal Logic ------------------------------------------
  let lastFocusedElement = null;
  let syModalFocusTrap = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalRole.textContent = "Gallery Highlight";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      syModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (syModalFocusTrap) {
      syModalFocusTrap.deactivate();
      syModalFocusTrap = null;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.setAttribute("aria-controls", "sy-modal");
    item.addEventListener("click", () => openModal(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // --- Leader Modal Logic (reuse same modal) ------------------------
  leaderCards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.querySelector("h3").textContent;
      const role = card.querySelector(".sy-leader-role")?.textContent || "";
      const desc = card.querySelector("p").textContent;

      modalTitle.textContent = name;
      modalRole.textContent = role;
      modalDescription.textContent = desc;

      lastFocusedElement = card;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");

      if (typeof window.setupFocusTrap === "function") {
        syModalFocusTrap = window.setupFocusTrap(modal);
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // --- Scroll to Top Button -------------------------------------------
  const scrollTopBtn = document.getElementById("btn-scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Run initialization
  applyFilter("all");
  initJourney();
});

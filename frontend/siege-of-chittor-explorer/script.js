document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".chittor-gallery-item")];

  const modal = document.getElementById("chittor-modal");
  const modalClose = document.getElementById("chittor-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("chittor-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "chittor-welcome-toast";
    toast.className = "chittor-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Siege of Chittor</strong> — 23 October 1567 to 23 February 1568. The siege that made Jaimal and Patta immortal.";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3200);
  }

  showWelcomeToast();

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Siege of Chittor Explorer";
      const thumbnail = "frontend/assets/travel_deserts.png";
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
          explorerPage: "frontend/siege-of-chittor-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/siege-of-chittor-explorer/index.html", [
      {
        id: "siege-of-chittor-main",
        title: "Siege of Chittor Explorer",
        description: "Explore the Siege of Chittorgarh (1567–1568): Akbar's four-month campaign against the Sisodia capital of Mewar, and the defiant jauhar of its defenders under Jaimal and Patta.",
        link: "frontend/siege-of-chittor-explorer/index.html"
      },
      {
        id: "siege-of-chittor-commanders",
        title: "Major Commanders of the Siege of Chittor",
        description: "Meet the commanders who decided the siege: Emperor Akbar, Jaimal Rathore, Patta Sisodia, and Rana Udai Singh II of Mewar.",
        link: "frontend/siege-of-chittor-explorer/index.html#commanders"
      },
      {
        id: "siege-of-chittor-strategy",
        title: "Battle Strategy of the Siege of Chittor",
        description: "How the Mughals took an impregnable fortress: the siege lines, the sabat covered trench, the mines of 17 December 1567, and the great siege gun.",
        link: "frontend/siege-of-chittor-explorer/index.html#strategy"
      },
      {
        id: "siege-of-chittor-outcome",
        title: "Outcome of the Siege of Chittor",
        description: "The fall of Chittorgarh on 23 February 1568 after jauhar and saka — and the massacre that followed the third sack of the fortress.",
        link: "frontend/siege-of-chittor-explorer/index.html#outcome"
      },
      {
        id: "siege-of-chittor-impact",
        title: "Historical Impact of the Siege of Chittor",
        description: "How the fall of Chittor broke independent Rajput resistance and opened the Rajput alliance, Ranthambhor, Kalinjar, and the road to the Deccan.",
        link: "frontend/siege-of-chittor-explorer/index.html#impact"
      },
      {
        id: "siege-of-chittor-timeline",
        title: "Siege of Chittor Timeline",
        description: "A chronology from the defiance of Mewar and the investment of October 1567 to the mines, the fatal shot of 22 February 1568, and the fall on the day of Holi.",
        link: "frontend/siege-of-chittor-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Bind gallery click events
  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
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

  // Run initialization
  initJourney();
});

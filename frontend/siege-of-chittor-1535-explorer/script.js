document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".chittor1535-gallery-item")];

  const modal = document.getElementById("chittor1535-modal");
  const modalClose = document.getElementById("chittor1535-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("chittor1535-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "chittor1535-welcome-toast";
    toast.className = "chittor1535-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🏰 Siege of Chittorgarh 1535</strong> — 8 March 1535. The second jauhar of Chittor.";
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
      const title = "Siege of Chittorgarh (1535) Explorer";
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
          explorerPage: "frontend/siege-of-chittor-1535-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/siege-of-chittor-1535-explorer/index.html", [
      {
        id: "siege-of-chittor-1535-main",
        title: "Siege of Chittorgarh (1535) Explorer",
        description: "Explore the second jauhar of Chittor (8 March 1535): Rani Karnavati's final sacrifice and the defiance of Mewar against Bahadur Shah's Gujarat Sultanate.",
        link: "frontend/siege-of-chittor-1535-explorer/index.html"
      },
      {
        id: "siege-of-chittor-1535-belligerents",
        title: "Belligerents of the Siege of Chittorgarh",
        description: "Bahadur Shah's artillery-led Gujarat Sultanate against the outnumbered defenders of Mewar under regent Rani Karnavati and Rana Vikramaditya Singh.",
        link: "frontend/siege-of-chittor-1535-explorer/index.html#belligerents"
      },
      {
        id: "siege-of-chittor-1535-outcome",
        title: "Outcome of the Siege of Chittorgarh (1535)",
        description: "A Gujarat Sultanate victory sealed by jauhar and saka: ~13,000 women of Chittor entered the flames while the warriors charged to their deaths.",
        link: "frontend/siege-of-chittor-1535-explorer/index.html#outcome"
      },
      {
        id: "siege-of-chittor-1535-timeline",
        title: "Siege of Chittorgarh (1535) Timeline",
        description: "From Rana Sanga's defeat at Khanwa (1527) and the first siege (1532) to the breach of the walls, the jauhar of 8 March 1535, and the death of Bahadur Shah (1537).",
        link: "frontend/siege-of-chittor-1535-explorer/index.html#timeline"
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

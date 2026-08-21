document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".pavan-gallery-item")];

  const modal = document.getElementById("pavan-modal");
  const modalClose = document.getElementById("pavan-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("pavan-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "pavan-welcome-toast";
    toast.className = "pavan-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Pavan Khind</strong> — 13 July 1660. The day a handful of Maratha warriors held a mountain pass against an army.";
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
      const title = "Battle of Pavan Khind Explorer";
      const thumbnail = "frontend/assets/travel_mountains.png";
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
          explorerPage: "frontend/battle-of-pavan-khind-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-pavan-khind-explorer/index.html", [
      {
        id: "battle-of-pavan-khind-main",
        title: "Battle of Pavan Khind Explorer",
        description: "Explore the Battle of Pavan Khind (13 July 1660): Baji Prabhu Deshpande's heroic rearguard stand that secured Chhatrapati Shivaji Maharaj's escape to Vishalgad.",
        link: "frontend/battle-of-pavan-khind-explorer/index.html"
      },
      {
        id: "battle-of-pavan-khind-figures",
        title: "Key Figures of Pavan Khind",
        description: "Meet the heroes of the pass: Baji Prabhu Deshpande, Chhatrapati Shivaji Maharaj, and the Adilshahi generals who pursued them.",
        link: "frontend/battle-of-pavan-khind-explorer/index.html#figures"
      },
      {
        id: "battle-of-pavan-khind-tactics",
        title: "Battle Tactics at Pavan Khind",
        description: "How a small rearguard used the narrow mountain pass to neutralise a vastly larger Adilshahi army.",
        link: "frontend/battle-of-pavan-khind-explorer/index.html#tactics"
      },
      {
        id: "battle-of-pavan-khind-outcome",
        title: "Outcome of the Battle of Pavan Khind",
        description: "A Maratha strategic victory — Shivaji reached Vishalgad safely, and the sacrifice at the pass preserved the kingdom.",
        link: "frontend/battle-of-pavan-khind-explorer/index.html#outcome"
      },
      {
        id: "battle-of-pavan-khind-timeline",
        title: "Battle of Pavan Khind Timeline",
        description: "A chronology from the killing of Afzal Khan (1659) and the siege of Panhala to the escape and the stand at Pavan Khind (1660).",
        link: "frontend/battle-of-pavan-khind-explorer/index.html#timeline"
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
document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".buxar-gallery-item")];

  const modal = document.getElementById("buxar-modal");
  const modalClose = document.getElementById("buxar-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("buxar-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "buxar-welcome-toast";
    toast.className = "buxar-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Buxar</strong> — 22 October 1764. The day a small Company army routed three kingdoms.";
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
      const title = "Battle of Buxar Explorer";
      const thumbnail = "frontend/assets/Warlitr.png";
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
          explorerPage: "frontend/battle-of-buxar-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-buxar-explorer/index.html", [
      {
        id: "battle-of-buxar-main",
        title: "Battle of Buxar Explorer",
        description: "Explore the Battle of Buxar (22 October 1764): the East India Company's decisive victory over Mir Qasim, Shuja-ud-Daulah, and Mughal Emperor Shah Alam II.",
        link: "frontend/battle-of-buxar-explorer/index.html"
      },
      {
        id: "battle-of-buxar-belligerents",
        title: "Belligerents of Buxar",
        description: "Meet the forces that clashed at Buxar: Major Hector Munro's ~7,000 Company troops against the ~40,000-strong alliance of Bengal, Awadh, and the Mughal Empire.",
        link: "frontend/battle-of-buxar-explorer/index.html#belligerents"
      },
      {
        id: "battle-of-buxar-outcome",
        title: "Outcome of the Battle of Buxar",
        description: "A decisive British victory that broke the triple alliance and made the East India Company the paramount power in northern India.",
        link: "frontend/battle-of-buxar-explorer/index.html#outcome"
      },
      {
        id: "battle-of-buxar-treaty",
        title: "Treaty of Allahabad (1765)",
        description: "The Diwani rights over Bengal, Bihar, and Orissa granted to the Company — the financial foundation of British colonial rule in India.",
        link: "frontend/battle-of-buxar-explorer/index.html#treaty"
      },
      {
        id: "battle-of-buxar-timeline",
        title: "Battle of Buxar Timeline",
        description: "A chronology from Plassey (1757) and the rise of Mir Qasim to the Battle of Buxar (1764), the Treaty of Allahabad (1765), and the enforcement of the Diwani (1772).",
        link: "frontend/battle-of-buxar-explorer/index.html#timeline"
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

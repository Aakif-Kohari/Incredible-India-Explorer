document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".plassey-gallery-item")];

  const modal = document.getElementById("plassey-modal");
  const modalClose = document.getElementById("plassey-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("plassey-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "plassey-welcome-toast";
    toast.className = "plassey-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Plassey</strong> — 23 June 1757. The day a small Company army and a traitor's bargain unlocked the wealth of Bengal.";
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
      const title = "Battle of Plassey Explorer";
      const thumbnail = "frontend/assets/East_India.png";
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
          explorerPage: "frontend/battle-of-plassey-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-plassey-explorer/index.html", [
      {
        id: "battle-of-plassey-main",
        title: "Battle of Plassey Explorer",
        description: "Explore the Battle of Plassey (23 June 1757): Robert Clive's East India Company army against Nawab Siraj-ud-Daulah of Bengal, the conspiracy of Mir Jafar, and the battle that began British rule in India.",
        link: "frontend/battle-of-plassey-explorer/index.html"
      },
      {
        id: "battle-of-plassey-belligerents",
        title: "Belligerents of the Battle of Plassey",
        description: "A compact Company army of about 3,000 under Robert Clive against the vast but divided host of Nawab Siraj-ud-Daulah.",
        link: "frontend/battle-of-plassey-explorer/index.html#belligerents"
      },
      {
        id: "battle-of-plassey-commanders",
        title: "Commanders of the Battle of Plassey",
        description: "Meet the men who decided the day: Robert Clive, the traitor-general Mir Jafar, Nawab Siraj-ud-Daulah, and the loyal Mir Madan.",
        link: "frontend/battle-of-plassey-explorer/index.html#commanders"
      },
      {
        id: "battle-of-plassey-outcome",
        title: "Outcome of the Battle of Plassey",
        description: "A decisive Company victory that deposed Siraj-ud-Daulah, installed Mir Jafar, and placed the treasure of Bengal in British hands.",
        link: "frontend/battle-of-plassey-explorer/index.html#outcome"
      },
      {
        id: "battle-of-plassey-significance",
        title: "Long-Term Significance of the Battle of Plassey",
        description: "From a merchant to a master — how Plassey's control of Bengal's wealth became the foundation of the British Empire in India.",
        link: "frontend/battle-of-plassey-explorer/index.html#significance"
      },
      {
        id: "battle-of-plassey-timeline",
        title: "Battle of Plassey Timeline",
        description: "From Siraj-ud-Daulah's capture of Calcutta (1756) and Clive's secret treaty with Mir Jafar to the rain-soaked battle of 23 June 1757 and the fall of the Nawab.",
        link: "frontend/battle-of-plassey-explorer/index.html#timeline"
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

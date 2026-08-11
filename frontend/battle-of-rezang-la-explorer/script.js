document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".rezang-gallery-item")];

  const modal = document.getElementById("rezang-modal");
  const modalClose = document.getElementById("rezang-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("rezang-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "rezang-welcome-toast";
    toast.className = "rezang-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Rezang La</strong> — 18 November 1962. The day 120 soldiers of the 13th Kumaon held a frozen ridge in Ladakh against thousands.";
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
      const title = "Battle of Rezang La Explorer";
      const thumbnail = "frontend/assets/explorer-images/pangong-lake.png";
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
          explorerPage: "frontend/battle-of-rezang-la-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-rezang-la-explorer/index.html", [
      {
        id: "battle-of-rezang-la-main",
        title: "Battle of Rezang La Explorer",
        description: "Explore the Battle of Rezang La (18 November 1962): the heroic last stand of 120 soldiers of Charlie Company, 13th Kumaon Regiment, under Major Shaitan Singh against thousands of Chinese troops in the Chushul sector of Ladakh.",
        link: "frontend/battle-of-rezang-la-explorer/index.html"
      },
      {
        id: "battle-of-rezang-la-belligerents",
        title: "Belligerents of the Battle of Rezang La",
        description: "A single under-equipped company of the 13th Kumaon Regiment against the massed, artillery-supported battalions of the People's Liberation Army.",
        link: "frontend/battle-of-rezang-la-explorer/index.html#belligerents"
      },
      {
        id: "battle-of-rezang-la-commanders",
        title: "Commanders of the Battle of Rezang La",
        description: "Meet the men who decided the day: Major Shaitan Singh (PVC), Naik Ram Singh, Jemadar Hari Ram, and the Chinese PLA assault columns.",
        link: "frontend/battle-of-rezang-la-explorer/index.html#commanders"
      },
      {
        id: "battle-of-rezang-la-significance",
        title: "Military Significance of the Battle of Rezang La",
        description: "A tactical loss that became a strategic stand — Rezang La blunted the Chinese advance, held the Chushul airfield, and safeguarded Ladakh and Leh.",
        link: "frontend/battle-of-rezang-la-explorer/index.html#significance"
      },
      {
        id: "battle-of-rezang-la-gallantry",
        title: "Gallantry Awards of the Battle of Rezang La",
        description: "Major Shaitan Singh's Param Vir Chakra, four Vir Chakras, and Mentions-in-Despatches for the brave men of Charlie Company.",
        link: "frontend/battle-of-rezang-la-explorer/index.html#gallantry"
      },
      {
        id: "battle-of-rezang-la-timeline",
        title: "Battle of Rezang La Timeline",
        description: "From China's October 1962 offensive and the deployment of Charlie Company to the assault of 18 November, the ceasefire, and the recovery of the fallen.",
        link: "frontend/battle-of-rezang-la-explorer/index.html#timeline"
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

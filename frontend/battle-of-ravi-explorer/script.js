document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".ravi-gallery-item")];

  const modal = document.getElementById("ravi-modal");
  const modalClose = document.getElementById("ravi-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("ravi-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "ravi-welcome-toast";
    toast.className = "ravi-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Ravi</strong> — 1306 CE. The day the last Mongol invasion of India was broken on the banks of the Ravi.";
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
      const title = "Battle of Ravi Explorer";
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
          explorerPage: "frontend/battle-of-ravi-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-ravi-explorer/index.html", [
      {
        id: "battle-of-ravi-main",
        title: "Battle of Ravi Explorer",
        description: "Explore the Battle of Ravi (1306 CE): the last Mongol invasion of India, decisively crushed by Alauddin Khalji's Delhi Sultanate under Malik Kafur on the banks of the Ravi River.",
        link: "frontend/battle-of-ravi-explorer/index.html"
      },
      {
        id: "battle-of-ravi-belligerents",
        title: "Belligerents of the Battle of Ravi",
        description: "The disciplined army of the Delhi Sultanate under Malik Kafur against the Chagatai Mongol horde of Kopek, Iqbalmand, and Tai-Bu.",
        link: "frontend/battle-of-ravi-explorer/index.html#belligerents"
      },
      {
        id: "battle-of-ravi-commanders",
        title: "Commanders of the Battle of Ravi",
        description: "Meet the generals who decided the day: Malik Kafur, Malik Tughluq (future founder of the Tughluq dynasty), Alauddin Khalji, and the Mongol commander Kopek.",
        link: "frontend/battle-of-ravi-explorer/index.html#commanders"
      },
      {
        id: "battle-of-ravi-outcome",
        title: "Outcome of the Battle of Ravi",
        description: "A decisive Sultanate victory that saw Kopek captured and the Mongol threat to India ended for Alauddin Khalji's entire reign.",
        link: "frontend/battle-of-ravi-explorer/index.html#outcome"
      },
      {
        id: "battle-of-ravi-timeline",
        title: "Battle of Ravi Timeline",
        description: "A chronology from the repelled invasions of 1297–1303 and the Battle of Amroha (1305) to the Battle of Ravi (1306) and the raids that carried the war to the Mongol frontier.",
        link: "frontend/battle-of-ravi-explorer/index.html#timeline"
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

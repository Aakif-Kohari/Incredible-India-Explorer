document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".sinhagad-gallery-item")];

  const modal = document.getElementById("sinhagad-modal");
  const modalClose = document.getElementById("sinhagad-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("sinhagad-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "sinhagad-welcome-toast";
    toast.className = "sinhagad-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Sinhagad</strong> — Night of 4 February 1670. The fort was won, but the lion was gone.";
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
      const title = "Battle of Sinhagad Explorer";
      const thumbnail = "frontend/assets/sinhagad_fort_evening.jpg";
      const category = "heritage";

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
          explorerPage: "frontend/battle-of-sinhagad-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-sinhagad-explorer/index.html", [
      {
        id: "battle-of-sinhagad-main",
        title: "Battle of Sinhagad Explorer",
        description: "Explore the Battle of Sinhagad (4 February 1670), the daring night raid by Tanaji Malusare that recaptured Kondhana from the Mughals and made the fort a symbol of Maratha valour.",
        link: "frontend/battle-of-sinhagad-explorer/index.html"
      },
      {
        id: "battle-of-sinhagad-background",
        title: "Battle of Sinhagad - Historical Background",
        description: "The road back to Kondhana: the Treaty of Purandar (1665), the Mughal garrison under Udaybhan Singh Rathore, and Shivaji's reconquest campaign of 1670.",
        link: "frontend/battle-of-sinhagad-explorer/index.html#background"
      },
      {
        id: "battle-of-sinhagad-belligerents",
        title: "Battle of Sinhagad - Belligerents",
        description: "The Mavali warriors of Tanaji Malusare and Suryaji Malusare against the Rajput and Mughal garrison of Udaybhan Singh Rathore.",
        link: "frontend/battle-of-sinhagad-explorer/index.html#belligerents"
      },
      {
        id: "battle-of-sinhagad-timeline",
        title: "Battle of Sinhagad - Timeline",
        description: "Chronology from the Treaty of Purandar and the Agra escape to the night escalade, the duel of the commanders, and the dawn recapture of the fort.",
        link: "frontend/battle-of-sinhagad-explorer/index.html#timeline"
      },
      {
        id: "battle-of-sinhagad-outcome",
        title: "Battle of Sinhagad - Outcome",
        description: "A Maratha victory that recovered the fort, secured Pune, and cost the life of Tanaji Malusare - whose sacrifice renamed Kondhana as Sinhagad.",
        link: "frontend/battle-of-sinhagad-explorer/index.html#outcome"
      },
      {
        id: "battle-of-sinhagad-significance",
        title: "Battle of Sinhagad - Historical Significance",
        description: "The Lion's Fort, the Tanaji powada, and the enduring legacy of the battle as Maharashtra's emblem of sacrifice and Swarajya.",
        link: "frontend/battle-of-sinhagad-explorer/index.html#significance"
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

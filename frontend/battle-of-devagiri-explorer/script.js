function initDevagiriExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".devagiri-gallery-item")];

  const modal = document.getElementById("devagiri-modal");
  const modalClose = document.getElementById("devagiri-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("devagiri-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "devagiri-welcome-toast";
    toast.className = "devagiri-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Devagiri</strong> — 1296 CE. Alauddin Khalji's secret Deccan campaign against King Ramachandra of Devagiri.";
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
      const id = btn.dataset.bookmarkId || "battle-of-devagiri-main";
      const title = "Battle of Devagiri Explorer";
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
          explorerPage: "frontend/battle-of-devagiri-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-devagiri-explorer/index.html", [
      {
        id: "battle-of-devagiri-main",
        title: "Battle of Devagiri Explorer",
        description: "Explore the Battle of Devagiri (1296 CE): Alauddin Khalji's secret campaign across the Vindhyas against the Yadavas of Devagiri.",
        link: "frontend/battle-of-devagiri-explorer/index.html"
      },
      {
        id: "battle-of-devagiri-timeline",
        title: "Battle of Devagiri Timeline",
        description: "Chronology of the 1296 CE campaign from the departure from Kara and Vindhya crossing to the siege, treaty, and Alauddin's coronation.",
        link: "frontend/battle-of-devagiri-explorer/index.html#timeline"
      },
      {
        id: "battle-of-devagiri-belligerents",
        title: "Belligerents of Devagiri",
        description: "Alauddin Khalji's expeditionary force vs the Yadava Kingdom forces under King Ramachandra and Prince Singhana.",
        link: "frontend/battle-of-devagiri-explorer/index.html#belligerents"
      },
      {
        id: "battle-of-devagiri-strategy",
        title: "Military Strategy at Devagiri",
        description: "Secret mountain routes, psychological disinformation, granary encirclement, and tactical reserves.",
        link: "frontend/battle-of-devagiri-explorer/index.html#military-strategy"
      },
      {
        id: "battle-of-devagiri-outcome",
        title: "Outcome & Impact of Devagiri",
        description: "Massive gold plunder, vassalage of Devagiri, funding Alauddin's Delhi throne usurpation, and opening South India to northern campaigns.",
        link: "frontend/battle-of-devagiri-explorer/index.html#outcome"
      }
    ]);
  }

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;

  function openModal(item) {
    lastFocusedElement = item;

    if (modalTitle) modalTitle.textContent = item.dataset.title || "Artifact Highlight";
    if (modalHeading) modalHeading.textContent = item.querySelector("h4")?.textContent || "Gallery Highlight";
    if (modalDescription) modalDescription.textContent = item.dataset.desc || "";

    if (modal) {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

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

  // Run Journey initialization
  initJourney();
}

// Support both standalone DOM loads & SPA route changes
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDevagiriExplorer);
} else {
  initDevagiriExplorer();
}

document.addEventListener("app:route-changed", initDevagiriExplorer);

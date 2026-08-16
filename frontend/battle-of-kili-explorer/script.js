function initKiliExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".kili-gallery-item")];

  const modal = document.getElementById("kili-modal");
  const modalClose = document.getElementById("kili-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("kili-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "kili-welcome-toast";
    toast.className = "kili-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Kili</strong> — 1299 CE. Sultan Alauddin Khalji's defense of Delhi against Qutlugh Khwaja's Chagatai Mongol host.";
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
      const id = btn.dataset.bookmarkId || "battle-of-kili-main";
      const title = "Battle of Kili Explorer";
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
          explorerPage: "frontend/battle-of-kili-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-kili-explorer/index.html", [
      {
        id: "battle-of-kili-main",
        title: "Battle of Kili Explorer",
        description: "Explore the Battle of Kili (1299 CE): Alauddin Khalji's defense of Delhi against the Chagatai Mongol army of Qutlugh Khwaja.",
        link: "frontend/battle-of-kili-explorer/index.html"
      },
      {
        id: "battle-of-kili-timeline",
        title: "Battle of Kili Timeline",
        description: "Chronology of the 1299 CE campaign from the Mongol invasion across the Indus to Zafar Khan's charge and Qutlugh Khwaja's retreat.",
        link: "frontend/battle-of-kili-explorer/index.html#timeline"
      },
      {
        id: "battle-of-kili-commanders",
        title: "Commanders of the Battle of Kili",
        description: "Profiles of Sultan Alauddin Khalji, Zafar Khan, Nusrat Khan, Ulugh Khan, and Chagatai Prince Qutlugh Khwaja.",
        link: "frontend/battle-of-kili-explorer/index.html#commanders"
      },
      {
        id: "battle-of-kili-strategy",
        title: "Battle Strategy at Kili",
        description: "Fortified trench networks, war elephant defenses, and disciplined central reserves vs Mongol flank charges.",
        link: "frontend/battle-of-kili-explorer/index.html#strategy"
      },
      {
        id: "battle-of-kili-outcome",
        title: "Outcome & Impact of Kili",
        description: "Strategic defense of Delhi, death of Zafar Khan, fatal wounding of Qutlugh Khwaja, and withdrawal of Chagatai forces.",
        link: "frontend/battle-of-kili-explorer/index.html#outcome"
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
  document.addEventListener("DOMContentLoaded", initKiliExplorer);
} else {
  initKiliExplorer();
}

document.addEventListener("app:route-changed", initKiliExplorer);

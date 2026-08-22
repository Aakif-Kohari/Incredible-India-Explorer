function initChandawarExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".chandawar-gallery-item")];

  const modal = document.getElementById("chandawar-modal");
  const modalClose = document.getElementById("chandawar-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("chandawar-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "chandawar-welcome-toast";
    toast.className = "chandawar-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Chandawar</strong> — 1194 CE. The decisive clash along the Yamuna between Muhammad Ghori and King Jayachandra.";
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
      const id = btn.dataset.bookmarkId || "battle-of-chandawar-main";
      const title = "Battle of Chandawar Explorer";
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
          explorerPage: "frontend/battle-of-chandawar-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-chandawar-explorer/index.html", [
      {
        id: "battle-of-chandawar-main",
        title: "Battle of Chandawar Explorer",
        description: "Explore the Battle of Chandawar (1194 CE): Muhammad Ghori's clash with King Jayachandra of the Gahadavala Dynasty.",
        link: "frontend/battle-of-chandawar-explorer/index.html"
      },
      {
        id: "battle-of-chandawar-timeline",
        title: "Battle of Chandawar Timeline",
        description: "Chronology of the 1194 CE campaign from Tarain II (1192 CE) to the march on Kannauj, battle at Chandawar, and capture of Asni.",
        link: "frontend/battle-of-chandawar-explorer/index.html#timeline"
      },
      {
        id: "battle-of-chandawar-belligerents",
        title: "Belligerents of Chandawar",
        description: "Ghurid forces under Muhammad Ghori and Qutb al-Din Aibak vs the Gahadavala royal army under King Jayachandra.",
        link: "frontend/battle-of-chandawar-explorer/index.html#belligerents"
      },
      {
        id: "battle-of-chandawar-outcome",
        title: "Outcome of the Battle of Chandawar",
        description: "Fatal arrow strike to King Jayachandra, rout of the Gahadavala army, and Ghurid annexation of Kannauj and Varanasi.",
        link: "frontend/battle-of-chandawar-explorer/index.html#outcome"
      },
      {
        id: "battle-of-chandawar-significance",
        title: "Historical Significance of Chandawar",
        description: "The fall of the premier northern Hindu kingdom, Ghurid control over the Gangetic heartland, and the birth of the Delhi Sultanate.",
        link: "frontend/battle-of-chandawar-explorer/index.html#significance"
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
  document.addEventListener("DOMContentLoaded", initChandawarExplorer);
} else {
  initChandawarExplorer();
}

document.addEventListener("app:route-changed", initChandawarExplorer);

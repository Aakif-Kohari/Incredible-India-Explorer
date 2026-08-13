document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".panipat-gallery-item")];

  const modal = document.getElementById("panipat-modal");
  const modalClose = document.getElementById("panipat-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("panipat-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "panipat-welcome-toast";
    toast.className = "panipat-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ First Battle of Panipat</strong> — 21 April 1526. The day gunpowder and discipline founded the Mughal Empire.";
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
      const title = "First Battle of Panipat Explorer";
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
          explorerPage: "frontend/first-battle-of-panipat-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/first-battle-of-panipat-explorer/index.html", [
      {
        id: "first-battle-of-panipat-main",
        title: "First Battle of Panipat Explorer",
        description: "Explore the First Battle of Panipat (21 April 1526): Babur's gunpowder revolution and the founding of the Mughal Empire at the expense of Ibrahim Lodi's Delhi Sultanate.",
        link: "frontend/first-battle-of-panipat-explorer/index.html"
      },
      {
        id: "first-battle-of-panipat-belligerents",
        title: "Belligerents of Panipat",
        description: "Meet the forces that clashed at Panipat: Babur's compact, gunpowder-armed Mughal army against Ibrahim Lodi's vast Delhi Sultanate host with its war elephants.",
        link: "frontend/first-battle-of-panipat-explorer/index.html#belligerents"
      },
      {
        id: "first-battle-of-panipat-formation",
        title: "Tulughma & Rumi Formations",
        description: "Babur's revolutionary battlefield tactics: the Tulughma flanking formation and the Rumi-style chained-cart artillery line that neutralised the elephant charge.",
        link: "frontend/first-battle-of-panipat-explorer/index.html#formation"
      },
      {
        id: "first-battle-of-panipat-outcome",
        title: "Outcome of the First Battle of Panipat",
        description: "A decisive Mughal victory: Ibrahim Lodi slain on the field, the Delhi Sultanate ended, and the Mughal Empire founded in India.",
        link: "frontend/first-battle-of-panipat-explorer/index.html#outcome"
      },
      {
        id: "first-battle-of-panipat-timeline",
        title: "First Battle of Panipat Timeline",
        description: "A chronology from Babur's rise in Fergana and Kabul to the battle of 21 April 1526, the consolidation at Khanwa and Ghaghra, and Babur's death in 1530.",
        link: "frontend/first-battle-of-panipat-explorer/index.html#timeline"
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
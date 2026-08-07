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
    toast.innerHTML = "<strong>⚔️ Third Battle of Panipat</strong> — 14 January 1761. The day the Maratha dream of a Hindu empire died on the plains of Panipat.";
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
      const title = "Third Battle of Panipat Explorer";
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
          explorerPage: "frontend/third-battle-of-panipat-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/third-battle-of-panipat-explorer/index.html", [
      {
        id: "third-battle-of-panipat-main",
        title: "Third Battle of Panipat Explorer",
        description: "Explore the Third Battle of Panipat (14 January 1761): Ahmad Shah Durrani's decisive victory over the Maratha Confederacy — one of the largest and bloodiest battles in Indian history.",
        link: "frontend/third-battle-of-panipat-explorer/index.html"
      },
      {
        id: "third-battle-of-panipat-belligerents",
        title: "Belligerents of Panipat",
        description: "Meet the forces that clashed at Panipat: Sadashivrao Bhau's Maratha Confederacy against Ahmad Shah Durrani's Afghan empire and their Indian allies.",
        link: "frontend/third-battle-of-panipat-explorer/index.html#belligerents"
      },
      {
        id: "third-battle-of-panipat-strategies",
        title: "Military Strategies at Panipat",
        description: "Contrasting doctrines: Maratha artillery-first offensive with French-trained Gardi corps versus Afghan elastic defence, camel-mounted guns, and cavalry envelopment.",
        link: "frontend/third-battle-of-panipat-explorer/index.html#strategies"
      },
      {
        id: "third-battle-of-panipat-casualties",
        title: "Casualties of the Third Battle of Panipat",
        description: "Catastrophic losses: 30,000–40,000 Maratha dead including top leadership, 15,000–20,000 Afghan allies, and tens of thousands of non-combatants massacred.",
        link: "frontend/third-battle-of-panipat-explorer/index.html#casualties"
      },
      {
        id: "third-battle-of-panipat-impact",
        title: "Historical Impact of Panipat 1761",
        description: "The battle that ended Maratha northern hegemony, enabled Sikh rise in Punjab, and cleared the path for British East India Company supremacy after Buxar.",
        link: "frontend/third-battle-of-panipat-explorer/index.html#impact"
      },
      {
        id: "third-battle-of-panipat-timeline",
        title: "Third Battle of Panipat Timeline",
        description: "Chronology from Maratha capture of Delhi (1757) through the 1760 northern expedition, the two-month blockade, the battle (1761), and the long aftermath to 1803.",
        link: "frontend/third-battle-of-panipat-explorer/index.html#timeline"
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
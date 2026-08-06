document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".saraighat-gallery-item")];

  const modal = document.getElementById("saraighat-modal");
  const modalClose = document.getElementById("saraighat-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("saraighat-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "saraighat-welcome-toast";
    toast.className = "saraighat-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Saraighat</strong> — 1671 CE. The day the Ahom navy broke the Mughal might on the Brahmaputra.";
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
      const title = "Battle of Saraighat Explorer";
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
          explorerPage: "frontend/battle-of-saraighat-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-saraighat-explorer/index.html", [
      {
        id: "battle-of-saraighat-main",
        title: "Battle of Saraighat Explorer",
        description: "Explore the Battle of Saraighat (1671 CE): how the Ahom Kingdom under Lachit Borphukan defended the Brahmaputra against the Mughal Empire and halted Aurangzeb's eastward expansion.",
        link: "frontend/battle-of-saraighat-explorer/index.html"
      },
      {
        id: "battle-of-saraighat-commanders",
        title: "Commanders of Saraighat",
        description: "Meet the commanders of Saraighat: Lachit Borphukan of the Ahom Kingdom against Ram Singh I's Mughal expeditionary force sent by Aurangzeb.",
        link: "frontend/battle-of-saraighat-explorer/index.html#commanders"
      },
      {
        id: "battle-of-saraighat-naval",
        title: "Naval Warfare at Saraighat",
        description: "The river battle on the Brahmaputra: Lachit Borphukan's use of the narrow channel at Saraighat, smaller agile boats, and terrain to negate the Mughal fleet's superiority.",
        link: "frontend/battle-of-saraighat-explorer/index.html#naval"
      },
      {
        id: "battle-of-saraighat-outcome",
        title: "Outcome of the Battle of Saraighat",
        description: "A decisive Ahom victory that checked Mughal expansion into Assam, forced Ram Singh I to retreat, and secured Guwahati for the Ahom Kingdom.",
        link: "frontend/battle-of-saraighat-explorer/index.html#outcome"
      },
      {
        id: "battle-of-saraighat-timeline",
        title: "Battle of Saraighat Timeline",
        description: "A chronology from Mir Jumla's invasion of Assam (1662) and the Treaty of Ghilajharighat (1663) to the reconquest of Guwahati (1667) and the battle of March 1671.",
        link: "frontend/battle-of-saraighat-explorer/index.html#timeline"
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
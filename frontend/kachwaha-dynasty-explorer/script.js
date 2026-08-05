document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".kachwaha-gallery-item")];
  
  const modal = document.getElementById("kachwaha-modal");
  const modalClose = document.getElementById("kachwaha-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Kachwaha Dynasty Explorer";
      const thumbnail = "frontend/assets/kachwaha_amber_fort.svg";
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
          explorerPage: "frontend/kachwaha-dynasty-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/kachwaha-dynasty-explorer/index.html", [
      {
        id: "kachwaha-dynasty-main",
        title: "Kachwaha Dynasty Explorer",
        description: "Explore the Kachwaha Dynasty of Amber and Jaipur (1093–1949 CE): its founding by Dulha Rai, its Mughal alliance under Raja Bharmal and Man Singh I, and Sawai Jai Singh II's founding of Jaipur.",
        link: "frontend/kachwaha-dynasty-explorer/index.html"
      },
      {
        id: "kachwaha-dynasty-rulers",
        title: "Major Rulers of the Kachwaha Line",
        description: "Meet Dulha Rai, Raja Bharmal, Raja Man Singh I, Mirza Raja Jai Singh I, Sawai Jai Singh II, and Sawai Man Singh II — the rulers who built the Kachwaha legacy.",
        link: "frontend/kachwaha-dynasty-explorer/index.html#rulers"
      },
      {
        id: "kachwaha-dynasty-forts",
        title: "Kachwaha Forts & Palaces",
        description: "Discover Amber Fort, Jaigarh Fort and its giant Jaivana cannon, Nahargarh Fort, the City Palace of Jaipur, and the Jantar Mantar observatory.",
        link: "frontend/kachwaha-dynasty-explorer/index.html#forts"
      },
      {
        id: "kachwaha-dynasty-timeline",
        title: "Kachwaha Dynasty Timeline",
        description: "A chronology of the Kachwahas from Dulha Rai's founding of the kingdom in 1093 CE to the end of sovereign rule in 1949.",
        link: "frontend/kachwaha-dynasty-explorer/index.html#timeline"
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
  item.setAttribute("role", "button");
  item.setAttribute("aria-haspopup", "dialog");
  item.setAttribute("aria-controls", "kachwaha-modal");
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
  if (e.key === "Tab" && modal?.classList.contains("open")) {
    const focusable = [...modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )];
    const first = focusable[0];
    const last = focusable.at(-1);

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (e.key === "Escape" && modal && modal.classList.contains("open")) {
    closeModal();
  }
});

  // Run initialization
  initJourney();
});
document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".sanjhi-gallery-item")];

  const modal = document.getElementById("sanjhi-modal");
  const modalClose = document.getElementById("sanjhi-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Sanjhi Art Explorer";
      const thumbnail = "frontend/assets/sanjhi_temple_rangoli.svg";
      const category = "culture";

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
          explorerPage: "frontend/sanjhi-art-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/sanjhi-art-explorer/index.html", [
      {
        id: "sanjhi-art-main",
        title: "Sanjhi Art Explorer",
        description: "Explore Sanjhi, the ancient paper-cut stencil art of Mathura and Vrindavan — intricate Radha-Krishna motifs used to create temple rangolis.",
        link: "frontend/sanjhi-art-explorer/index.html"
      },
      {
        id: "sanjhi-art-technique",
        title: "How a Sanjhi Stencil Is Made",
        description: "From handmade paper to freehand cutting and colour sifting — the artisan's process behind every Sanjhi stencil.",
        link: "frontend/sanjhi-art-explorer/index.html#technique"
      },
      {
        id: "sanjhi-art-themes",
        title: "Themes and Materials of Sanjhi Art",
        description: "Recurring motifs of Radha-Krishna, peacocks, cows and the Yamuna, along with the materials used to bring Sanjhi rangolis to life.",
        link: "frontend/sanjhi-art-explorer/index.html#themes"
      },
      {
        id: "sanjhi-art-gallery",
        title: "Sanjhi Art Visual Gallery",
        description: "Illustrated impressions of Sanjhi motifs, temple rangolis and the artisan's tools behind this paper-cut tradition.",
        link: "frontend/sanjhi-art-explorer/index.html#gallery"
      }
    ]);
  }

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;
  let sanjhiModalFocusTrap = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      sanjhiModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (sanjhiModalFocusTrap) {
      sanjhiModalFocusTrap.deactivate();
      sanjhiModalFocusTrap = null;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Bind gallery click events
  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.setAttribute("aria-controls", "sanjhi-modal");
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
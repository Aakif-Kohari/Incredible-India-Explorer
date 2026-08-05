document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".hoysala-gallery-item")];
  
  const modal = document.getElementById("hoysala-modal");
  const modalClose = document.getElementById("hoysala-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Hoysala Dynasty Explorer";
      const thumbnail = "frontend/assets/Brihadeeswara_Temple.png";
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
          explorerPage: "frontend/hoysala-dynasty-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/hoysala-dynasty-explorer/index.html", [
      {
        id: "hoysala-dynasty-main",
        title: "Hoysala Dynasty Explorer",
        description: "Explore the Hoysala Dynasty of Karnataka (c. 950–1343 CE): the tiger-slayer origin legend, major rulers, and the star-shaped temple masterpieces of Belur, Halebidu, and Somanathapura.",
        link: "frontend/hoysala-dynasty-explorer/index.html"
      },
      {
        id: "hoysala-dynasty-rulers",
        title: "Major Rulers of the Hoysala Line",
        description: "Meet Sala, Nripa Kama II, Vishnuvardhana, Veera Ballala II, Narasimha III, and Veera Ballala III — the kings who built the Hoysala empire.",
        link: "frontend/hoysala-dynasty-explorer/index.html#rulers"
      },
      {
        id: "hoysala-dynasty-architecture",
        title: "Hoysala Architecture",
        description: "Discover the hallmarks of Hoysala temple architecture: star-shaped plans, soapstone carving, lathe-turned pillars, and the UNESCO-listed Sacred Ensembles of the Hoysalas.",
        link: "frontend/hoysala-dynasty-explorer/index.html#architecture"
      },
      {
        id: "hoysala-dynasty-timeline",
        title: "Hoysala Dynasty Timeline",
        description: "A chronology of the Hoysalas from origins in the Malnad around 950 CE to the fall of Dwarasamudra and the end of the dynasty in 1343 CE.",
        link: "frontend/hoysala-dynasty-explorer/index.html#timeline"
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

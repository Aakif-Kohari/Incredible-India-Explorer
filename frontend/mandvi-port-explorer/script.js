document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".mandvi-gallery-item")];

  const modal = document.getElementById("mandvi-modal");
  const modalClose = document.getElementById("mandvi-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- My Journey: bookmarks + cross-explorer search index -------------
  function initJourneyIntegration() {
    if (!window.Journey) return;

    // Bookmark / Save-to-Journey
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Mandvi Ancient Port";
      const thumbnail = "frontend/assets/travel_beaches.png";
      const category = "heritage";

      const setSaved = () => {
        const saved = window.Journey.isSaved(id);
        btn.classList.toggle("is-saved", saved);
        btn.setAttribute("aria-pressed", String(saved));
        btn.innerHTML = saved ? "♥ Saved to Journey" : "♡ Save to Journey";
      };

      setSaved();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id,
          explorerPage: "frontend/mandvi-port-explorer/index.html",
          title,
          thumbnail,
          category
        });
        setSaved();
      });
    });

    // Register this explorer in the global search index
    window.Journey.registerSearchItems("frontend/mandvi-port-explorer/index.html", [
      {
        id: "mandvi-port-main",
        title: "Mandvi Ancient Port Explorer",
        description: "Explore the 400-year-old tradition of wooden dhow shipbuilding, the legacy of Rao Khengarji I, and the merchant routes of Kutch.",
        link: "frontend/mandvi-port-explorer/index.html"
      },
      {
        id: "mandvi-port-shipbuilding",
        title: "Mandvi Shipbuilding Yards",
        description: "Living heritage of handcrafted wooden cargo shipwrights along the Rukmavati river mouth in Kutch.",
        link: "frontend/mandvi-port-explorer/index.html#shipbuilding"
      },
      {
        id: "mandvi-port-trade",
        title: "Kutchi Maritime Trade Routes",
        description: "Historical deep-sea merchant networks connecting Mandvi to Zanzibar, Muscat and Aden.",
        link: "frontend/mandvi-port-explorer/index.html#trade"
      }
    ]);
  }

  // --- Gallery Detail Modal --------------------------------------------
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

  galleryItems.forEach((item) => {
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

  initJourneyIntegration();
});

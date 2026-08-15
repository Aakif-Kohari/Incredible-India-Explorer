document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".ollywood-gallery-item")];

  const modal = document.getElementById("ollywood-modal");
  const modalClose = document.getElementById("ollywood-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Ollywood (Odia Cinema) Explorer";
      const thumbnail = "frontend/assets/ollywood_cinema_hall.svg";
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
          explorerPage: "frontend/odia-cinema-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/odia-cinema-explorer/index.html", [
      {
        id: "ollywood-cinema-main",
        title: "Ollywood (Odia Cinema) Explorer",
        description: "Explore Ollywood, the Odia film industry: its 1936 origins with Sita Bibaha, notable National Award-winning films, and the artists who built its legacy.",
        link: "frontend/odia-cinema-explorer/index.html"
      },
      {
        id: "ollywood-cinema-films",
        title: "Notable Films of Ollywood",
        description: "From Sita Bibaha (1936) to Maya Miriga (1984) — the films that shaped Odia cinema and earned it national and international recognition.",
        link: "frontend/odia-cinema-explorer/index.html#films"
      },
      {
        id: "ollywood-cinema-artists",
        title: "Award-Winning Artists of Ollywood",
        description: "Meet Mohan Sundar Deb Goswami, Prasanta Nanda, Nirad N. Mohapatra and Manmohan Mohapatra — the filmmakers who defined Odia cinema.",
        link: "frontend/odia-cinema-explorer/index.html#artists"
      },
      {
        id: "ollywood-cinema-timeline",
        title: "Ollywood Cinema Timeline",
        description: "A chronology of Odia cinema from Sita Bibaha in 1936 to the founding of the Odisha Film Development Corporation and beyond.",
        link: "frontend/odia-cinema-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;
  let ollywoodModalFocusTrap = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      ollywoodModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (ollywoodModalFocusTrap) {
      ollywoodModalFocusTrap.deactivate();
      ollywoodModalFocusTrap = null;
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
    item.setAttribute("aria-controls", "ollywood-modal");
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
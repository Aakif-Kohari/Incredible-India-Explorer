document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".dhollywood-gallery-item")];

  const modal = document.getElementById("dhollywood-modal");
  const modalClose = document.getElementById("dhollywood-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Gujarati Cinema (Dhollywood) Explorer";
      const thumbnail = "frontend/assets/dhollywood_cinema_hall.svg";
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
          explorerPage: "frontend/gujarati-cinema-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/gujarati-cinema-explorer/index.html", [
      {
        id: "dhollywood-cinema-main",
        title: "Gujarati Cinema (Dhollywood) Explorer",
        description: "Explore Dhollywood, the Gujarati film industry: its 1932 origins with Narsinh Mehta, notable National Award-winning films, and the artists who built its legacy.",
        link: "frontend/gujarati-cinema-explorer/index.html"
      },
      {
        id: "dhollywood-cinema-films",
        title: "Notable Films of Dhollywood",
        description: "From Narsinh Mehta (1932) to Chhello Divas (2015) — the films that shaped Gujarati cinema and defined its modern revival.",
        link: "frontend/gujarati-cinema-explorer/index.html#films"
      },
      {
        id: "dhollywood-cinema-artists",
        title: "Award-Winning Artists of Dhollywood",
        description: "Meet Nanubhai Vakil, Naresh Kanodiya, Upendra Trivedi and Nirupa Roy — the filmmakers who defined Gujarati cinema.",
        link: "frontend/gujarati-cinema-explorer/index.html#artists"
      },
      {
        id: "dhollywood-cinema-timeline",
        title: "Dhollywood Cinema Timeline",
        description: "A chronology of Gujarati cinema from its silent-era roots to the 2010s urban revival.",
        link: "frontend/gujarati-cinema-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;
  let dhollywoodModalFocusTrap = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      dhollywoodModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (dhollywoodModalFocusTrap) {
      dhollywoodModalFocusTrap.deactivate();
      dhollywoodModalFocusTrap = null;
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
    item.setAttribute("aria-controls", "dhollywood-modal");
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
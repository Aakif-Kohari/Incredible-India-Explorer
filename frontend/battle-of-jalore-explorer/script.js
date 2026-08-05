document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".jalore-gallery-item")];

  const modal = document.getElementById("jalore-modal");
  const modalClose = document.getElementById("jalore-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Battle of Jalore Explorer";
      const thumbnail = "frontend/assets/travel_deserts.png";
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
          explorerPage: "frontend/battle-of-jalore-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-jalore-explorer/index.html", [
      {
        id: "battle-of-jalore-main",
        title: "Battle of Jalore Explorer",
        description: "Explore the Battle of Jalore (1311 CE), the final clash between Alauddin Khalji's Delhi Sultanate and the Chauhan rulers of Jalore under Kanhadadeva.",
        link: "frontend/battle-of-jalore-explorer/index.html"
      },
      {
        id: "battle-of-jalore-overview",
        title: "Battle of Jalore - Historical Overview",
        description: "The setting of the siege: Jalore's golden fort of Swarnagiri and its Chauhan rulers, squeezed between the Delhi Sultanate and the desert of Marwar.",
        link: "frontend/battle-of-jalore-explorer/index.html#overview"
      },
      {
        id: "battle-of-jalore-timeline",
        title: "Battle of Jalore - Timeline",
        description: "Chronology of Jalore's fall: from Kirtipala's seizure of the fort in 1181 to the betrayal, jauhar, and last stand of May 1311.",
        link: "frontend/battle-of-jalore-explorer/index.html#timeline"
      },
      {
        id: "battle-of-jalore-figures",
        title: "Battle of Jalore - Key Figures",
        description: "Meet Kanhadadeva, Viramadeva, Maladeva, Alauddin Khalji, Malik Kamaluddin Gurg, and the chronicler Padmanabha.",
        link: "frontend/battle-of-jalore-explorer/index.html#figures"
      },
      {
        id: "battle-of-jalore-outcome",
        title: "Battle of Jalore - Outcome & Legacy",
        description: "The Sultanate victory that ended the Chauhan dynasty of Jalore, and the epic memory of Kanhadade Prabandha.",
        link: "frontend/battle-of-jalore-explorer/index.html#outcome"
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

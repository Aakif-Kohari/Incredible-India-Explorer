document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".sisodia-gallery-item")];

  const modal = document.getElementById("sisodia-modal");
  const modalClose = document.getElementById("sisodia-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Sisodia Dynasty Explorer";
      const thumbnail = "frontend/assets/SISODIA_HERO_BANNER.jpeg";
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
          explorerPage: "frontend/sisodia-dynasty-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/sisodia-dynasty-explorer/index.html", [
      {
        id: "sisodia-dynasty-main",
        title: "Sisodia Dynasty Explorer",
        description: "Explore the Sisodia Dynasty of Mewar — the Rajput warriors of Chittorgarh, Maharana Pratap, Kumbhalgarh Fort, and a legacy of unmatched valour and resistance.",
        link: "frontend/sisodia-dynasty-explorer/index.html"
      },
      {
        id: "sisodia-dynasty-rulers",
        title: "Major Rulers of the Sisodia Line",
        description: "Meet Rana Kumbha, Rana Sanga, Maharana Pratap, Maharana Udai Singh II, Maharana Amar Singh I, and Maharana Raj Singh I — the warrior-kings who defended Mewar.",
        link: "frontend/sisodia-dynasty-explorer/index.html#rulers"
      },
      {
        id: "sisodia-dynasty-military",
        title: "Military Legacy of the Sisodias",
        description: "Discover the forts of Chittorgarh and Kumbhalgarh, the Battle of Haldighati, and the guerrilla warfare tactics that made the Sisodias unconquerable.",
        link: "frontend/sisodia-dynasty-explorer/index.html#military-legacy"
      },
      {
        id: "sisodia-dynasty-timeline",
        title: "Sisodia Dynasty Timeline",
        description: "A chronology of the Sisodias from the founding of Chittorgarh in the 8th century to the integration of Mewar into the Indian Union in 1947.",
        link: "frontend/sisodia-dynasty-explorer/index.html#timeline"
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

  // --- Timeline scroll reveal (enhancement) -------------------------
  const timelineSteps = [...document.querySelectorAll(".sisodia-timeline-step")];

  if (timelineSteps.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
    );

    timelineSteps.forEach((step) => observer.observe(step));
  }

  // Run initialization
  initJourney();
});
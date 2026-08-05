document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".paramara-gallery-item")];

  const modal = document.getElementById("paramara-modal");
  const modalClose = document.getElementById("paramara-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Paramara Dynasty Explorer";
      const thumbnail = "frontend/assets/Central_India.png";
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
          explorerPage: "frontend/paramara-dynasty-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/paramara-dynasty-explorer/index.html", [
      {
        id: "paramara-dynasty-main",
        title: "Paramara Dynasty Explorer",
        description: "Explore the Paramara Dynasty of Malwa (c. 800s–1305 CE): its rise under Siyaka II, the scholarship of Raja Bhoja, and the Bhojeshwar and Udayeshwar temples.",
        link: "frontend/paramara-dynasty-explorer/index.html"
      },
      {
        id: "paramara-dynasty-rulers",
        title: "Major Rulers of the Paramara Line",
        description: "Meet Upendra, Siyaka II, Vakpati Munja, Raja Bhoja, Udayaditya, and Mahalakadeva — the rulers who built and defended the Paramara kingdom of Malwa.",
        link: "frontend/paramara-dynasty-explorer/index.html#rulers"
      },
      {
        id: "paramara-dynasty-culture",
        title: "Paramara Cultural Contributions",
        description: "Discover the Sanskrit scholarship, Bhumija-style temple architecture, and the Bhojshala college founded under the Paramara dynasty of Dhara.",
        link: "frontend/paramara-dynasty-explorer/index.html#culture"
      },
      {
        id: "paramara-dynasty-timeline",
        title: "Paramara Dynasty Timeline",
        description: "A chronology of the Paramaras from Rashtrakuta feudatories in the 800s to the fall of Dhara before the Delhi Sultanate in 1305 CE.",
        link: "frontend/paramara-dynasty-explorer/index.html#timeline"
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
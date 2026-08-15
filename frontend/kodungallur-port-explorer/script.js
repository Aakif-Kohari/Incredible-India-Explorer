document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".port-gallery-item")];

  const modal = document.getElementById("port-modal");
  const modalClose = document.getElementById("port-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Kodungallur Ancient Port (Muziris)";
      const thumbnail = "frontend/assets/kodungallur_port_banner.png";
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
          explorerPage: "frontend/kodungallur-port-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/kodungallur-port-explorer/index.html", [
      {
        id: "kodungallur-port-main",
        title: "Kodungallur Ancient Port Explorer (Muziris)",
        description: "Explore Kodungallur, the ancient port of Muziris in Kerala, its role as the global pepper emporium, Pattanam excavations, and syncretic culture.",
        link: "frontend/kodungallur-port-explorer/index.html"
      },
      {
        id: "kodungallur-port-trade",
        title: "Malabar Pepper & Roman Trade at Muziris",
        description: "Learn how black pepper and spices were traded for Roman gold coins via the Hippalus monsoon navigation route.",
        link: "frontend/kodungallur-port-explorer/index.html#trade"
      },
      {
        id: "kodungallur-port-culture",
        title: "Interfaith Heritage of Kodungallur",
        description: "Discover Cheraman Juma Mosque (629 CE), St. Thomas Church (52 CE), Kodungallur Bhagavathy Temple, and Jewish history.",
        link: "frontend/kodungallur-port-explorer/index.html#culture"
      },
      {
        id: "kodungallur-port-archaeology",
        title: "Pattanam Excavations & Dugout Canoe",
        description: "Explore the 2000-year-old wooden dugout canoe, Roman amphorae, and Mediterranean relics discovered at Pattanam.",
        link: "frontend/kodungallur-port-explorer/index.html#archaeology"
      }
    ]);
  }

  // --- Gallery Lightbox Modal Logic -----------------------------------------
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

  // Bind gallery click and keyboard events
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

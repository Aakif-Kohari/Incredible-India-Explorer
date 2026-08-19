document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".ahom-gallery-item")];

  const modal = document.getElementById("ahom-modal");
  const modalClose = document.getElementById("ahom-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Ahom Dynasty Explorer";
      const thumbnail = "frontend/assets/Ahom_Dynasty_Banner.jpg";
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
          explorerPage: "frontend/ahom-dynasty-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/ahom-dynasty-explorer/index.html", [
      {
        id: "ahom-dynasty-main",
        title: "Ahom Dynasty Explorer",
        description: "Explore the Ahom Dynasty of Assam (c. 1228–1826 CE): the founding by Sukaphaa, the Battle of Saraighat, and six centuries of self-rule.",
        link: "frontend/ahom-dynasty-explorer/index.html"
      },
      {
        id: "ahom-dynasty-rulers",
        title: "Major Rulers of the Ahom Line",
        description: "Meet Sukaphaa, Suhungmung, Pratap Singha, Gadadhar Singha, and Rudra Singha — the rulers who built and defended the Ahom kingdom.",
        link: "frontend/ahom-dynasty-explorer/index.html#rulers"
      },
      {
        id: "ahom-dynasty-culture",
        title: "Ahom Cultural Contributions",
        description: "Discover the Paik administrative system, the Battle of Saraighat, and the Buranji chronicle tradition of the Ahom dynasty.",
        link: "frontend/ahom-dynasty-explorer/index.html#culture"
      },
      {
        id: "ahom-dynasty-timeline",
        title: "Ahom Dynasty Timeline",
        description: "A chronology of the Ahoms from Sukaphaa's founding of the kingdom around 1228 CE to the 1826 Treaty of Yandabo.",
        link: "frontend/ahom-dynasty-explorer/index.html#timeline"
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
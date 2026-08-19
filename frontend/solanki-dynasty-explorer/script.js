document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".solanki-gallery-item")];

  const modal = document.getElementById("solanki-modal");
  const modalClose = document.getElementById("solanki-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Solanki (Chaulukya) Dynasty Explorer";
      const thumbnail = "frontend/assets/Solanki_Dynasty_Banner.jpeg";
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
          explorerPage: "frontend/solanki-dynasty-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/solanki-dynasty-explorer/index.html", [
      {
        id: "solanki-dynasty-main",
        title: "Solanki (Chaulukya) Dynasty Explorer",
        description: "Explore the Solanki Dynasty of Gujarat (c. 940–1244 CE): the founding of Anahilapataka, the stepwell of Rani ki Vav, and the Sun Temple at Modhera.",
        link: "frontend/solanki-dynasty-explorer/index.html"
      },
      {
        id: "solanki-dynasty-rulers",
        title: "Major Rulers of the Solanki Line",
        description: "Meet Mularaja I, Bhima I, Queen Udayamati, Jayasimha Siddharaja, Kumarapala, and Bhima II — the rulers who built and defended the Solanki kingdom of Gujarat.",
        link: "frontend/solanki-dynasty-explorer/index.html#rulers"
      },
      {
        id: "solanki-dynasty-architecture",
        title: "Solanki Architecture",
        description: "Discover the Maru-Gurjara temple style, the stepwell engineering of Rani ki Vav, and the Sun Temple at Modhera, built under the Solanki dynasty.",
        link: "frontend/solanki-dynasty-explorer/index.html#architecture"
      },
      {
        id: "solanki-dynasty-timeline",
        title: "Solanki Dynasty Timeline",
        description: "A chronology of the Solankis from the founding of Anahilapataka around 940 CE to the rise of the Vaghela feudatories in 1244 CE.",
        link: "frontend/solanki-dynasty-explorer/index.html#timeline"
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
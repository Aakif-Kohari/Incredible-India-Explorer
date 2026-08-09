document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".bhopal-gallery-item")];

  const modal = document.getElementById("bhopal-modal");
  const modalClose = document.getElementById("bhopal-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("bhopal-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "bhopal-welcome-toast";
    toast.className = "bhopal-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Bhopal</strong> — 1737–1738. The day Baji Rao's cavalry trapped the Nizam and won Malwa.";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3200);
  }

  showWelcomeToast();

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Battle of Bhopal Explorer";
      const thumbnail = "frontend/assets/Warlitr.png";
      const category = "history";

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
          explorerPage: "frontend/battle-of-bhopal-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-bhopal-explorer/index.html", [
      {
        id: "battle-of-bhopal-main",
        title: "Battle of Bhopal Explorer",
        description: "Explore the Battle of Bhopal (1737–1738): Peshwa Baji Rao I's Maratha campaign that trapped the Nizam of Hyderabad and won Malwa.",
        link: "frontend/battle-of-bhopal-explorer/index.html"
      },
      {
        id: "battle-of-bhopal-commanders",
        title: "Commanders of Bhopal",
        description: "Meet the masters of the field: Peshwa Baji Rao I and the Maratha cavalry against Nizam-ul-Mulk Asaf Jah I and the Mughal army.",
        link: "frontend/battle-of-bhopal-explorer/index.html#commanders"
      },
      {
        id: "battle-of-bhopal-outcome",
        title: "Outcome of the Battle of Bhopal",
        description: "A decisive Maratha victory that ceded Malwa, exposed Mughal weakness, and confirmed Maratha supremacy in central India.",
        link: "frontend/battle-of-bhopal-explorer/index.html#outcome"
      },
      {
        id: "battle-of-bhopal-treaty",
        title: "Treaty of Bhopal (1738)",
        description: "The agreement that ceded Malwa to the Marathas and required a heavy indemnity from the Nizam of Hyderabad.",
        link: "frontend/battle-of-bhopal-explorer/index.html#treaty"
      },
      {
        id: "battle-of-bhopal-timeline",
        title: "Battle of Bhopal Timeline",
        description: "A chronology from the Nizam's rise (1720) and his march north (1736) to the encirclement at Bhopal (1737) and the treaty (1738).",
        link: "frontend/battle-of-bhopal-explorer/index.html#timeline"
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
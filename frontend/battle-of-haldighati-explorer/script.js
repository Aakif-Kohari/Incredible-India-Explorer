document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".haldi-gallery-item")];

  const modal = document.getElementById("haldi-modal");
  const modalClose = document.getElementById("haldi-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("haldi-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "haldi-welcome-toast";
    toast.className = "haldi-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Haldighati</strong> — 18 June 1576. The day Maharana Pratap and Chetak defied the Mughal army in the turmeric-coloured pass.";
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
      const title = "Battle of Haldighati Explorer";
      const thumbnail = "frontend/assets/Maharana.png";
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
          explorerPage: "frontend/battle-of-haldighati-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-haldighati-explorer/index.html", [
      {
        id: "battle-of-haldighati-main",
        title: "Battle of Haldighati Explorer",
        description: "Explore the Battle of Haldighati (18 June 1576): Maharana Pratap's legendary stand against the Mughal army of Akbar led by Man Singh I in the turmeric-coloured pass of Rajasthan.",
        link: "frontend/battle-of-haldighati-explorer/index.html"
      },
      {
        id: "battle-of-haldighati-commanders",
        title: "Commanders of Haldighati",
        description: "Meet the commanders and heroes of the pass: Maharana Pratap, Man Singh I of Amber, Hakim Khan Sur, Bhamashah, Jhala Maan, and the loyal steed Chetak.",
        link: "frontend/battle-of-haldighati-explorer/index.html#figures"
      },
      {
        id: "battle-of-haldighati-strategy",
        title: "Military Strategy at Haldighati",
        description: "How the narrow pass channelled the Rajput charge, and how Man Singh's withheld reserves and flanking attack turned the tide of the battle.",
        link: "frontend/battle-of-haldighati-explorer/index.html#strategy"
      },
      {
        id: "battle-of-haldighati-outcome",
        title: "Outcome of the Battle of Haldighati",
        description: "A Mughal tactical victory from which Mewar never truly fell — Maharana Pratap escaped, Chetak died, and the Rana's guerrilla war carried on.",
        link: "frontend/battle-of-haldighati-explorer/index.html#outcome"
      },
      {
        id: "battle-of-haldighati-timeline",
        title: "Battle of Haldighati Timeline",
        description: "A chronology from the fall of Chittorgarh (1568) and Akbar's overtures to the battle of 18 June 1576 and the Rana's guerrilla recovery.",
        link: "frontend/battle-of-haldighati-explorer/index.html#timeline"
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

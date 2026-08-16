function initSeleucidExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".seleucid-gallery-item")];

  const modal = document.getElementById("seleucid-modal");
  const modalClose = document.getElementById("seleucid-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("seleucid-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "seleucid-welcome-toast";
    toast.className = "seleucid-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Mauryan–Seleucid War</strong> — 305–303 BCE. The clash between Chandragupta Maurya and Seleucus I Nicator that established ancient Greco-Indian diplomacy.";
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
      const id = btn.dataset.bookmarkId || "mauryan-seleucid-war-main";
      const title = "Mauryan–Seleucid War Explorer";
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
          explorerPage: "frontend/mauryan-seleucid-war-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/mauryan-seleucid-war-explorer/index.html", [
      {
        id: "mauryan-seleucid-war-main",
        title: "Mauryan–Seleucid War Explorer",
        description: "Explore the Mauryan–Seleucid War (305–303 BCE): Chandragupta Maurya's clash and treaty with Seleucus I Nicator.",
        link: "frontend/mauryan-seleucid-war-explorer/index.html"
      },
      {
        id: "mauryan-seleucid-war-timeline",
        title: "Mauryan–Seleucid War Timeline",
        description: "Chronology from Alexander's death (323 BCE) to the Indus Treaty (303 BCE), Megasthenes' embassy, and the Battle of Ipsus (301 BCE).",
        link: "frontend/mauryan-seleucid-war-explorer/index.html#timeline"
      },
      {
        id: "mauryan-seleucid-war-commanders",
        title: "Commanders of the Mauryan–Seleucid War",
        description: "Key leaders and strategists: Emperor Chandragupta Maurya, Seleucus I Nicator, Chanakya (Kautilya), and ambassador Megasthenes.",
        link: "frontend/mauryan-seleucid-war-explorer/index.html#commanders"
      },
      {
        id: "mauryan-seleucid-war-territorial",
        title: "Territorial Changes & Treaty of the Indus",
        description: "Ceding of Arachosia, Gedrosia, Paropamisadae, and Aria to the Mauryans; exchange of 500 war elephants and dynastic marriage alliance.",
        link: "frontend/mauryan-seleucid-war-explorer/index.html#territorial-changes"
      }
    ]);
  }

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;

  function openModal(item) {
    lastFocusedElement = item;

    if (modalTitle) modalTitle.textContent = item.dataset.title || "Artifact Highlight";
    if (modalHeading) modalHeading.textContent = item.querySelector("h4")?.textContent || "Gallery Highlight";
    if (modalDescription) modalDescription.textContent = item.dataset.desc || "";

    if (modal) {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

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

  // Run Journey initialization
  initJourney();
}

// Support both standalone DOM loads & SPA route changes
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSeleucidExplorer);
} else {
  initSeleucidExplorer();
}

document.addEventListener("app:route-changed", initSeleucidExplorer);

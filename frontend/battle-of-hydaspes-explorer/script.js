function initHydaspesExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".hydaspes-gallery-item")];

  const modal = document.getElementById("hydaspes-modal");
  const modalClose = document.getElementById("hydaspes-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("hydaspes-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "hydaspes-welcome-toast";
    toast.className = "hydaspes-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of the Hydaspes</strong> — May 326 BCE. Alexander the Great's tactical triumph against King Porus and his war elephants.";
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
      const id = btn.dataset.bookmarkId || "battle-of-hydaspes-main";
      const title = "Battle of the Hydaspes Explorer";
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
          explorerPage: "frontend/battle-of-hydaspes-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/battle-of-hydaspes-explorer/index.html", [
      {
        id: "battle-of-hydaspes-main",
        title: "Battle of the Hydaspes Explorer",
        description: "Explore the Battle of the Hydaspes (May 326 BCE): Alexander the Great's epic encounter with King Porus along the Jhelum River.",
        link: "frontend/battle-of-hydaspes-explorer/index.html"
      },
      {
        id: "battle-of-hydaspes-forces",
        title: "Opposing Forces at the Hydaspes",
        description: "Comparative order of battle: Macedonian phalanx and Companion cavalry vs King Porus's war elephant vanguard, heavy chariots, and infantry.",
        link: "frontend/battle-of-hydaspes-explorer/index.html#opposing-forces"
      },
      {
        id: "battle-of-hydaspes-tactics",
        title: "Military Tactics at the Hydaspes",
        description: "Alexander's night river crossing in a monsoon storm, double cavalry envelopment, and counter-elephant tactics.",
        link: "frontend/battle-of-hydaspes-explorer/index.html#military-tactics"
      },
      {
        id: "battle-of-hydaspes-timeline",
        title: "Battle of the Hydaspes Timeline",
        description: "Chronology of the 326 BCE campaign from the Taxila alliance and river standoff to the storm crossing and surrender of Porus.",
        link: "frontend/battle-of-hydaspes-explorer/index.html#timeline"
      },
      {
        id: "battle-of-hydaspes-aftermath",
        title: "Aftermath of the Hydaspes",
        description: "Alexander's famous dialogue with Porus ('Treat me like a king'), founding of Nicaea and Bucephala, and soldier mutiny at the Beas River.",
        link: "frontend/battle-of-hydaspes-explorer/index.html#aftermath"
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
  document.addEventListener("DOMContentLoaded", initHydaspesExplorer);
} else {
  initHydaspesExplorer();
}

document.addEventListener("app:route-changed", initHydaspesExplorer);

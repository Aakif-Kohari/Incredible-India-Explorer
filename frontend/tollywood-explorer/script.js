/**
 * Tollywood (Telugu Cinema) Explorer - Interactive Logic
 * Handles gallery modal popups, bookmark/journey integration,
 * global search index registration, and scroll utilities.
 *
 * Follows the same architecture as gujarati-cinema-explorer/script.js
 */

document.addEventListener("app:route-changed", () => {
  initTollywoodExplorer();
});

// Also run on direct page load (non-SPA navigation)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTollywoodExplorer);
} else {
  initTollywoodExplorer();
}

function initTollywoodExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".tollywood-gallery-item")];

  const modal = document.getElementById("tollywood-modal");
  const modalClose = document.getElementById("tollywood-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // -----------------------------------------------------------------
  // Journey Integration (Bookmarks & Global Search)
  // -----------------------------------------------------------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Tollywood (Telugu Cinema) Explorer";
      const thumbnail = "frontend/assets/tollywood_banner.svg";
      const category = "culture";

      const updateBookmarkUI = () => {
        const isSaved = window.Journey.isSaved(id);
        btn.classList.toggle("is-saved", isSaved);
        btn.setAttribute("aria-pressed", String(isSaved));
        btn.innerHTML = isSaved ? "&#9829; Saved to Journey" : "&#9825; Save to Journey";
      };

      updateBookmarkUI();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id,
          explorerPage: "frontend/tollywood-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/tollywood-explorer/index.html", [
      {
        id: "tollywood-cinema-main",
        title: "Tollywood (Telugu Cinema) Explorer",
        description: "Explore Tollywood, the Telugu film industry of Andhra Pradesh and Telangana — from Bhakta Prahlada (1931), the first Telugu talkie, to Oscar-winning RRR and globally acclaimed epics like Baahubali.",
        link: "frontend/tollywood-explorer/index.html"
      },
      {
        id: "tollywood-cinema-films",
        title: "Top Films of Tollywood",
        description: "From Bhakta Prahlada (1931) and Maya Bazaar (1957) to Baahubali and RRR — the landmark films that defined Telugu cinema.",
        link: "frontend/tollywood-explorer/index.html#films"
      },
      {
        id: "tollywood-cinema-actors",
        title: "Leading Actors of Tollywood",
        description: "NTR Sr., ANR, Savitri, Chiranjeevi, Prabhas, Jr. NTR, and Ram Charan — the silver screen icons who defined Tollywood across generations.",
        link: "frontend/tollywood-explorer/index.html#actors"
      },
      {
        id: "tollywood-cinema-directors",
        title: "Directors Who Shaped Telugu Cinema",
        description: "From H.M. Reddy who pioneered Tollywood in 1931 to S.S. Rajamouli who took it global with Baahubali and RRR.",
        link: "frontend/tollywood-explorer/index.html#directors"
      },
      {
        id: "tollywood-cinema-timeline",
        title: "Tollywood Cinema Timeline",
        description: "A chronology of Telugu cinema from the 1931 first talkie through the Golden Age, Mass Hero Era, and the global blockbuster phenomenon.",
        link: "frontend/tollywood-explorer/index.html#timeline"
      },
      {
        id: "tollywood-cinema-awards",
        title: "Awards & Recognition — Tollywood",
        description: "Dadasaheb Phalke, National Film Awards, the Academy Award for Naatu Naatu, and Padma honours recognising Telugu cinema excellence.",
        link: "frontend/tollywood-explorer/index.html#awards"
      }
    ]);
  }

  // -----------------------------------------------------------------
  // Gallery Modal Logic
  // -----------------------------------------------------------------
  let lastFocusedElement = null;
  let tollywoodModalFocusTrap = null;

  function openModal(item) {
    if (!modal) return;
    lastFocusedElement = item;

    if (modalTitle) modalTitle.textContent = item.dataset.title || "";
    if (modalHeading) modalHeading.textContent = item.dataset.subtitle || item.querySelector("p")?.textContent || "Gallery Highlight";
    if (modalDescription) modalDescription.textContent = item.dataset.desc || "";

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      tollywoodModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (tollywoodModalFocusTrap) {
      tollywoodModalFocusTrap.deactivate();
      tollywoodModalFocusTrap = null;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Bind gallery item click and keyboard events
  galleryItems.forEach((item) => {
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

  // -----------------------------------------------------------------
  // Smooth scroll for anchor links
  // -----------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Run initialization
  initJourney();
}

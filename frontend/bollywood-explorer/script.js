/**
 * Bollywood (Telugu Cinema) Explorer - Interactive Logic
 * Handles gallery modal popups, bookmark/journey integration,
 * global search index registration, and scroll utilities.
 *
 * Follows the same architecture as gujarati-cinema-explorer/script.js
 */

document.addEventListener("app:route-changed", () => {
  initBollywoodExplorer();
});

// Also run on direct page load (non-SPA navigation)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBollywoodExplorer);
} else {
  initBollywoodExplorer();
}

function initBollywoodExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".bollywood-gallery-item")];

  const modal = document.getElementById("bollywood-modal");
  const modalClose = document.getElementById("bollywood-modal-close");
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
      const title = "Bollywood (Hindi Cinema) Explorer";
      const thumbnail = "frontend/assets/bollywood_banner.svg";
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
          explorerPage: "frontend/bollywood-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/bollywood-explorer/index.html", [
      {
        id: "bollywood-cinema-main",
        title: "Bollywood (Hindi Cinema) Explorer",
        description: "Explore Bollywood, India's Hindi-language film industry headquartered in Mumbai — from Raja Harishchandra (1913) and Alam Ara (1931) to global icons and Oscar-recognised soundtracks.",
        link: "frontend/bollywood-explorer/index.html"
      },
      {
        id: "bollywood-cinema-films",
        title: "Famous Movies of Bollywood",
        description: "From Mother India (1957) and Sholay (1975) to Dilwale Dulhania Le Jayenge (1995) and Dangal (2016) — the landmark films that defined Hindi cinema.",
        link: "frontend/bollywood-explorer/index.html#films"
      },
      {
        id: "bollywood-cinema-actors",
        title: "Legendary Actors of Bollywood",
        description: "Dilip Kumar, Amitabh Bachchan, Sridevi, Shah Rukh Khan, Aamir Khan, and Deepika Padukone — the icons who defined Hindi cinema across generations.",
        link: "frontend/bollywood-explorer/index.html#actors"
      },
      {
        id: "bollywood-cinema-directors",
        title: "Major Directors of Bollywood",
        description: "From Dadasaheb Phalke, the father of Indian cinema, to Raj Kapoor, Yash Chopra, and Zoya Akhtar — the filmmakers who shaped Hindi cinema.",
        link: "frontend/bollywood-explorer/index.html#directors"
      },
      {
        id: "bollywood-cinema-composers",
        title: "Music Composers of Bollywood",
        description: "R.D. Burman, Lata Mangeshkar, A.R. Rahman, and other composers whose scores made Bollywood music a global export in its own right.",
        link: "frontend/bollywood-explorer/index.html#composers"
      },
      {
        id: "bollywood-cinema-timeline",
        title: "Bollywood Cinema Timeline",
        description: "A chronology of Hindi cinema from the 1913 silent-era beginnings through the Golden Age, the Khan-era 1990s, and today's streaming-driven landscape.",
        link: "frontend/bollywood-explorer/index.html#timeline"
      },
      {
        id: "bollywood-cinema-awards",
        title: "Awards & Recognition — Bollywood",
        description: "Dadasaheb Phalke Award, National Film Awards, Filmfare Awards, and international recognition marking Hindi cinema's achievements.",
        link: "frontend/bollywood-explorer/index.html#awards"
      }
    ]);
  }

  // -----------------------------------------------------------------
  // Gallery Modal Logic
  // -----------------------------------------------------------------
  let lastFocusedElement = null;
  let bollywoodModalFocusTrap = null;

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
      bollywoodModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (bollywoodModalFocusTrap) {
      bollywoodModalFocusTrap.deactivate();
      bollywoodModalFocusTrap = null;
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

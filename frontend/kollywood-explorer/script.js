/**
 * Kollywood (Tamil Cinema) Explorer - Interactive Logic
 * Handles gallery modal popups, bookmark/journey integration,
 * global search index registration, and scroll utilities.
 *
 * Follows the same architecture as tollywood-explorer/script.js
 */

document.addEventListener("app:route-changed", () => {
  initKollywoodExplorer();
});

// Also run on direct page load (non-SPA navigation)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initKollywoodExplorer);
} else {
  initKollywoodExplorer();
}

function initKollywoodExplorer() {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".kollywood-gallery-item")];

  const modal = document.getElementById("kollywood-modal");
  const modalClose = document.getElementById("kollywood-modal-close");
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
      const title = "Kollywood (Tamil Cinema) Explorer";
      const thumbnail = "frontend/assets/kollywood_marina_marquee.svg";
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
          explorerPage: "frontend/kollywood-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/kollywood-explorer/index.html", [
      {
        id: "kollywood-cinema-main",
        title: "Kollywood (Tamil Cinema) Explorer",
        description: "Explore Kollywood, the Tamil film industry based in Chennai — from Kalidas (1931), the first Tamil talkie, to globally acclaimed films from Mani Ratnam, Kamal Haasan, and Rajinikanth.",
        link: "frontend/kollywood-explorer/index.html"
      },
      {
        id: "kollywood-cinema-films",
        title: "Top Films of Kollywood",
        description: "From Chandralekha (1948) and Mahanadi to Baasha, Nayakan, and the pan-Indian phenomenon of 2.0 — the landmark films that defined Tamil cinema.",
        link: "frontend/kollywood-explorer/index.html#films"
      },
      {
        id: "kollywood-cinema-actors",
        title: "Legendary Personalities of Kollywood",
        description: "MGR, Sivaji Ganesan, Rajinikanth, Kamal Haasan, and Mani Ratnam — the icons in front of and behind the camera who defined Tamil cinema across generations.",
        link: "frontend/kollywood-explorer/index.html#actors"
      },
      {
        id: "kollywood-cinema-studios",
        title: "Studios of Kollywood",
        description: "AVM Productions, Gemini Studios, Vijaya Vauhini Studios, and Prasad Studios — the historic production houses that built Chennai into a major film hub.",
        link: "frontend/kollywood-explorer/index.html#studios"
      },
      {
        id: "kollywood-cinema-timeline",
        title: "Kollywood Cinema Timeline",
        description: "A chronology of Tamil cinema from the 1931 first talkie through the studio era, the MGR-Sivaji golden age, and today's global streaming success.",
        link: "frontend/kollywood-explorer/index.html#timeline"
      },
      {
        id: "kollywood-cinema-awards",
        title: "Awards & Recognition — Kollywood",
        description: "Dadasaheb Phalke Award, National Film Awards, and international honours at Cannes and Berlin recognising the artistic depth of Tamil cinema.",
        link: "frontend/kollywood-explorer/index.html#awards"
      }
    ]);
  }

  // -----------------------------------------------------------------
  // Gallery Modal Logic
  // -----------------------------------------------------------------
  let lastFocusedElement = null;
  let kollywoodModalFocusTrap = null;

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
      kollywoodModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (kollywoodModalFocusTrap) {
      kollywoodModalFocusTrap.deactivate();
      kollywoodModalFocusTrap = null;
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

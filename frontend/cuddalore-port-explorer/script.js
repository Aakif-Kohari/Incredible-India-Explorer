/**
 * Cuddalore Ancient Port Explorer - Interactive Script Module
 */

function initCuddalorePortExplorer() {
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
      const title = "Cuddalore Ancient Port";
      const thumbnail = "frontend/assets/cuddalore_port_banner.png";
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
          explorerPage: "frontend/cuddalore-port-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/cuddalore-port-explorer/index.html", [
      {
        id: "cuddalore-port-main",
        title: "Cuddalore Ancient Port Explorer",
        description: "Discover Cuddalore (Koodaloor), historic estuarine trading port, Fort St. David, and Coromandel textile exports.",
        link: "frontend/cuddalore-port-explorer/index.html"
      },
      {
        id: "cuddalore-port-trade",
        title: "Coromandel Handloom Textiles & Spice Commerce",
        description: "Explore Cuddalore's weaving legacy, indigo trade, and colonial factory battles between Fort St. David and Pondicherry.",
        link: "frontend/cuddalore-port-explorer/index.html#trade-significance"
      },
      {
        id: "cuddalore-port-heritage",
        title: "Fort St. David & Padaleeswarar Temple Heritage",
        description: "Explore 17th-century Fort St. David, 7th-century Chola temple architecture, Silver Beach, and Pichavaram mangroves.",
        link: "frontend/cuddalore-port-explorer/index.html#heritage-sites"
      }
    ]);
  }

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;

  function openModal(item) {
    if (!modal) return;
    lastFocusedElement = item;

    if (modalTitle) modalTitle.textContent = item.dataset.title || "Gallery Item";
    if (modalHeading) modalHeading.textContent = item.querySelector("p")?.textContent || "Cuddalore Landmark";
    if (modalDescription) modalDescription.textContent = item.dataset.desc || "";

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function setupGalleryModal() {
    galleryItems.forEach((item) => {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", item.dataset.title || "View details");

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
  }

  initJourney();
  setupGalleryModal();
}

// Support both SPA route change events and normal page loads
document.addEventListener("app:route-changed", initCuddalorePortExplorer);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCuddalorePortExplorer);
} else {
  initCuddalorePortExplorer();
}

// Export for module testing environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initCuddalorePortExplorer };
}

document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".revnet-gallery-item")];

  const modal = document.getElementById("revnet-modal");
  const modalClose = document.getElementById("revnet-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Revolutionary Network Explorer";
      const thumbnail = "frontend/assets/revolutionary_network_hero.svg";
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
          explorerPage: "frontend/revolutionary-network-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/revolutionary-network-explorer/index.html", [
      {
        id: "revolutionary-network-main",
        title: "Revolutionary Network Explorer",
        description: "Explore how Anushilan Samiti, Jugantar, the HRA and HSRA connected leaders, organisations and actions across India's revolutionary movement.",
        link: "frontend/revolutionary-network-explorer/index.html"
      },
      {
        id: "revolutionary-network-organizations",
        title: "Organisations of the Revolutionary Movement",
        description: "Anushilan Samiti, Jugantar, the Hindustan Republican Association, and the Hindustan Socialist Republican Association.",
        link: "frontend/revolutionary-network-explorer/index.html#organizations"
      },
      {
        id: "revolutionary-network-map",
        title: "Revolutionary Network Map",
        description: "An interactive diagram tracing connections between revolutionary organisations, leaders and actions.",
        link: "frontend/revolutionary-network-explorer/index.html#network"
      },
      {
        id: "revolutionary-network-timeline",
        title: "Chronology of the Revolutionary Movement",
        description: "From Anushilan Samiti's founding in 1902 to the HSRA's reconstitution in 1928 and its decline in the 1930s.",
        link: "frontend/revolutionary-network-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Network Diagram Filter Logic ---------------------------------
  const filterButtons = [...document.querySelectorAll(".revnet-filter-btn")];
  const orgLabels = {
    all: "Showing the full network. Click a node above to highlight its connections.",
    anushilan: "Anushilan Samiti (1902) and its links to Aurobindo Ghosh, Jugantar, and Sachindra Nath Sanyal.",
    jugantar: "Jugantar (1906), the inner circle within Anushilan Samiti led by Barindra Ghosh and Bhupendranath Datta.",
    hra: "The Hindustan Republican Association (1924), its founders, and the 1925 Kakori Robbery.",
    hsra: "The Hindustan Socialist Republican Association (1928) and the leaders who carried its ideals forward."
  };

  function applyFilter(filterValue) {
    const lines = [...document.querySelectorAll(".revnet-line")];
    const nodes = [...document.querySelectorAll(".revnet-node")];
    const geoLines = [...document.querySelectorAll(".revnet-geo-line")];
    const geoNodes = [...document.querySelectorAll(".revnet-geo-node")];

    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === filterValue;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll(".revnet-node-org").forEach((org) => {
      org.setAttribute("aria-pressed", String(org.dataset.org === filterValue));
    });

    if (filterValue === "all") {
      lines.forEach((line) => line.classList.remove("revnet-line-active", "revnet-line-dim"));
      nodes.forEach((node) => node.classList.remove("revnet-node-dim"));
      geoLines.forEach((line) => line.classList.remove("revnet-line-active", "revnet-line-dim"));
      geoNodes.forEach((node) => node.classList.remove("revnet-node-dim"));
    } else {
      lines.forEach((line) => {
        const matches = (line.dataset.org || "").split(" ").includes(filterValue);
        line.classList.toggle("revnet-line-active", matches);
        line.classList.toggle("revnet-line-dim", !matches);
      });
      nodes.forEach((node) => {
        const matches = (node.dataset.org || "").split(" ").includes(filterValue);
        node.classList.toggle("revnet-node-dim", !matches);
      });
      geoLines.forEach((line) => {
        const matches = (line.dataset.org || "").split(" ").includes(filterValue);
        line.classList.toggle("revnet-line-active", matches);
        line.classList.toggle("revnet-line-dim", !matches);
      });
      geoNodes.forEach((node) => {
        const matches = (node.dataset.org || "").split(" ").includes(filterValue);
        node.classList.toggle("revnet-node-dim", !matches);
      });
    }

    const caption = document.getElementById("revnet-caption");
    if (caption) {
      caption.textContent = orgLabels[filterValue] || orgLabels.all;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });

  document.querySelectorAll(".revnet-node-org").forEach((org) => {
    org.addEventListener("click", () => applyFilter(org.dataset.org));
    org.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        applyFilter(org.dataset.org);
      }
    });
  });

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;
  let revnetModalFocusTrap = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      revnetModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (revnetModalFocusTrap) {
      revnetModalFocusTrap.deactivate();
      revnetModalFocusTrap = null;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.setAttribute("aria-controls", "revnet-modal");
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
  applyFilter("all");
  initJourney();
});
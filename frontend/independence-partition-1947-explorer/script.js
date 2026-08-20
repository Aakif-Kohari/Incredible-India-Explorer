document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".ip-gallery-item")];
  const leaderCards = [...document.querySelectorAll(".ip-leader-card")];
  const journeyCards = [...document.querySelectorAll(".ip-journey-card")];

  const modal = document.getElementById("ip-modal");
  const modalClose = document.getElementById("ip-modal-close");
  const modalTitle = document.getElementById("ip-modal-title");
  const modalRole = document.getElementById("ip-modal-role");
  const modalDescription = document.getElementById("ip-modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Independence & Partition, 1947 Explorer";
      const thumbnail = "frontend/assets/independence_partition_hero.svg";
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
          explorerPage: "frontend/independence-partition-1947-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    window.Journey.registerSearchItems("frontend/independence-partition-1947-explorer/index.html", [
      {
        id: "ip-main",
        title: "Independence & Partition, 1947 Explorer",
        description: "Explore India's Independence and Partition of 1947 — the Indian Independence Act, Radcliffe Line, refugee movements, and the Tryst with Destiny speech.",
        link: "frontend/independence-partition-1947-explorer/index.html"
      },
      {
        id: "ip-timeline",
        title: "Independence & Partition Timeline",
        description: "From the 1946 Cripps Mission to the midnight transfer of power and the mass refugee migration.",
        link: "frontend/independence-partition-1947-explorer/index.html#timeline"
      },
      {
        id: "ip-map",
        title: "Radcliffe Line & Partition Map",
        description: "Interactive before/after map showing the Radcliffe Line boundary and major city markers.",
        link: "frontend/independence-partition-1947-explorer/index.html#map"
      },
      {
        id: "ip-leaders",
        title: "Key Figures of 1947",
        description: "Nehru, Jinnah, Mountbatten, Patel, and Radcliffe — the architects of independence and partition.",
        link: "frontend/independence-partition-1947-explorer/index.html#leaders"
      }
    ]);
  }

  // --- Before/After Map Toggle Logic --------------------------------
  const mapButtons = [...document.querySelectorAll(".ip-map-btn")];
  const mapLayers = [...document.querySelectorAll("[data-view]")];

  function setMapView(view) {
    mapButtons.forEach((btn) => {
      const isActive = btn.dataset.view === view;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll("[data-view]").forEach((el) => {
      if (el.id === "ip-map-before" || el.id === "ip-map-after") {
        el.style.display = el.dataset.view === view ? "" : "none";
      }
    });

    const caption = document.getElementById("ip-map-caption");
    if (caption) {
      if (view === "before") {
        caption.textContent = "Pre-1947: Undivided British India. The boundary that would divide the subcontinent has not yet been drawn.";
      } else {
        caption.textContent = "Post-1947: The Radcliffe Line divides Punjab and Bengal into India and Pakistan. Refugee movement paths shown in gold.";
      }
    }
  }

  mapButtons.forEach((btn) => {
    btn.addEventListener("click", () => setMapView(btn.dataset.view));
  });

  // --- Modal Logic (Gallery + Leaders) ------------------------------
  let lastFocusedElement = null;
  let ipModalFocusTrap = null;

  function openModal(item, type) {
    lastFocusedElement = item;

    modalTitle.textContent = type === "gallery"
      ? item.dataset.title
      : item.querySelector("h3").textContent;
    modalRole.textContent = type === "gallery"
      ? "Gallery Highlight"
      : item.querySelector(".ip-leader-role")?.textContent || "Historical Figure";
    modalDescription.textContent = type === "gallery"
      ? item.dataset.desc
      : item.querySelector("p").textContent;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      ipModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (ipModalFocusTrap) {
      ipModalFocusTrap.deactivate();
      ipModalFocusTrap = null;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.setAttribute("aria-controls", "ip-modal");
    item.addEventListener("click", () => openModal(item, "gallery"));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item, "gallery");
      }
    });
  });

  leaderCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-controls", "ip-modal");
    card.addEventListener("click", () => openModal(card, "leader"));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card, "leader");
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

  // --- Scroll to Top Button -------------------------------------------
  const scrollTopBtn = document.getElementById("btn-scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Run initialization
  setMapView("after");
  initJourney();
});

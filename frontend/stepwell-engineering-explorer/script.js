(function () {
  "use strict";

  document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const structureMarkers = [...document.querySelectorAll(".swe-marker")];
    const legendButtons = [...document.querySelectorAll(".swe-legend-btn")];
    const seasonButtons = [...document.querySelectorAll(".swe-season-btn")];

    const modal = document.getElementById("stepwell-eng-modal");
    const modalClose = document.getElementById("stepwell-eng-modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalHeading = document.getElementById("modal-heading");
    const modalDescription = document.getElementById("modal-description");

    // --- Welcome Toast (auto-dismisses) -------------------------------
    function showWelcomeToast() {
      if (document.getElementById("stepwell-eng-welcome-toast")) return;

      const toast = document.createElement("div");
      toast.id = "stepwell-eng-welcome-toast";
      toast.className = "stepwell-eng-welcome-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      toast.innerHTML = "<strong>💧 Stepwell Engineering Explorer</strong> — a thousand years of water engineering, from Rani ki Vav to Chand Baori.";
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
        const title = "Stepwell Engineering Explorer";
        const thumbnail = "frontend/assets/Rani_ki_Vav.jpg";
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
            explorerPage: "frontend/stepwell-engineering-explorer/index.html",
            title,
            thumbnail,
            category
          });
          updateBookmarkUI();
        });
      });

      // 2. Global search index registration
      window.Journey.registerSearchItems("frontend/stepwell-engineering-explorer/index.html", [
        {
          id: "stepwell-engineering-main",
          title: "Stepwell Engineering Explorer",
          description: "Explore the engineering of India's stepwells: structural anatomy, seasonal water levels, and the ancient principles behind vavs and baolis.",
          link: "frontend/stepwell-engineering-explorer/index.html"
        },
        {
          id: "stepwell-engineering-structure",
          title: "Anatomy of a Stepwell",
          description: "A cross-section of the stepwell: entrance pavilion, stepped terraces, stone shaft walls, water column, and ground level.",
          link: "frontend/stepwell-engineering-explorer/index.html#structure"
        },
        {
          id: "stepwell-engineering-seasons",
          title: "Seasonal Water Levels",
          description: "Watch the water rise in the monsoon and fall through summer in an interactive stepwell cross-section.",
          link: "frontend/stepwell-engineering-explorer/index.html#seasons"
        },
        {
          id: "stepwell-engineering-principles",
          title: "Stepwell Engineering Principles",
          description: "Stepped geometry, aquifer access, evaporation control, gravity recharge, stone masonry, and community engineering.",
          link: "frontend/stepwell-engineering-explorer/index.html#principles"
        },
        {
          id: "stepwell-engineering-references",
          title: "Stepwell References & Further Reading",
          description: "Books and sources on the stepwells of Gujarat, Rani ki Vav, and the engineering of water in ancient India.",
          link: "frontend/stepwell-engineering-explorer/index.html#references"
        }
      ]);
    }

    // --- Structure Diagram Modal -------------------------------------
    const PARTS = {
      pavilion: {
        title: "Entrance Pavilion",
        heading: "The Gateway at Ground Level",
        description: "The pavilion marks the stepwell's mouth at ground level. It sheltered the first steps from sun and rain, announced the monument to travellers, and often carried the inscriptions of the ruler or merchant who commissioned the well."
      },
      steps: {
        title: "Stepped Terraces",
        heading: "The Staircase That Doubles as Galleries",
        description: "The defining feature of a stepwell: a staircase of terraces descending to the water. Each step is wide enough to sit on, and the tiers create shaded galleries where travellers rest. The geometry also slows the descent of monsoon runoff, letting it soak into the ground and recharge the aquifer."
      },
      shaft: {
        title: "Stone Shaft Walls",
        heading: "Load-Bearing Walls That Hold Back the Earth",
        description: "The shaft walls carry the enormous lateral pressure of the surrounding earth. Builders used interlocking stone blocks laid without mortar, so the structure could flex slightly with the ground and survive floods and earthquakes for centuries."
      },
      water: {
        title: "Water Column",
        heading: "The Shaft That Reaches the Aquifer",
        description: "The well shaft is dug below the driest summer water table, so the column never runs dry. In the monsoon the water rises high up the steps; by late summer it retreats to the lowest levels — but it is always reachable."
      },
      ground: {
        title: "Ground Level",
        heading: "The Arid Surface the Stepwell Pierces",
        description: "Stepwells were built where surface water is scarce: the dry plains of Gujarat, Rajasthan, and the Deccan. By piercing the ground, the stepwell turned an invisible aquifer into a public, year-round water supply."
      }
    };

    let lastFocusedElement = null;

    function openModal(partKey) {
      const part = PARTS[partKey];
      if (!part || !modal) return;

      lastFocusedElement = document.activeElement;

      modalTitle.textContent = part.title;
      modalHeading.textContent = part.heading;
      modalDescription.textContent = part.description;

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

    structureMarkers.forEach((marker) => {
      marker.addEventListener("click", () => openModal(marker.dataset.part));
    });

    legendButtons.forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.part));
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

    // --- Seasonal Water Level Visualizer -----------------------------
    const SEASONS = {
      monsoon: { label: "Monsoon", level: 90, note: "The water table rises high up the steps." },
      postmonsoon: { label: "Post-Monsoon", level: 60, note: "The water settles as the rains retreat." },
      summer: { label: "Summer", level: 25, note: "The water sinks to the lowest steps — but never runs dry." }
    };

    const waterEl = document.getElementById("swe-season-water");
    const slider = document.getElementById("swe-level-slider");
    const sliderValue = document.getElementById("swe-slider-value");
    const readout = document.getElementById("swe-level-readout");

    function setWaterLevel(level, label) {
      if (waterEl) {
        waterEl.style.height = level + "%";
      }
      if (slider) {
        slider.value = String(level);
      }
      if (sliderValue) {
        sliderValue.textContent = level + "%";
      }
      if (readout) {
        readout.textContent = "Water level: " + level + "% — " + label;
      }
    }

    seasonButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const season = SEASONS[btn.dataset.season];
        if (!season) return;

        seasonButtons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");

        setWaterLevel(season.level, season.label);
      });
    });

    if (slider) {
      slider.addEventListener("input", () => {
        seasonButtons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        setWaterLevel(Number(slider.value), "Custom");
      });
    }

    // Default: Post-Monsoon
    const defaultSeason = seasonButtons.find((b) => b.dataset.season === "postmonsoon");
    if (defaultSeason) {
      defaultSeason.classList.add("is-active");
      defaultSeason.setAttribute("aria-pressed", "true");
    }
    setWaterLevel(60, "Post-Monsoon");

    // Run initialization
    initJourney();
  });
})();
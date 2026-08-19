document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".celljail-gallery-item")];

  const modal = document.getElementById("celljail-modal");
  const modalClose = document.getElementById("celljail-modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalHeading = document.getElementById("modal-heading");
  const modalDescription = document.getElementById("modal-description");

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Cellular Jail & Colonial Imprisonment Explorer";
      const thumbnail = "frontend/assets/cellular_jail_hero.svg";
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
          explorerPage: "frontend/cellular-jail-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems("frontend/cellular-jail-explorer/index.html", [
      {
        id: "cellular-jail-main",
        title: "Cellular Jail & Colonial Imprisonment Explorer",
        description: "Explore the Cellular Jail and other major colonial prisons — Yerawada, Aga Khan Palace, Alipore, Lahore Central Jail — and the freedom fighters held within them.",
        link: "frontend/cellular-jail-explorer/index.html"
      },
      {
        id: "cellular-jail-locations",
        title: "Major Prisons of the Freedom Struggle",
        description: "An interactive map of Cellular Jail, Yerawada, Aga Khan Palace, Alipore, Lahore Central Jail, and the Red Fort.",
        link: "frontend/cellular-jail-explorer/index.html#locations"
      },
      {
        id: "cellular-jail-timeline",
        title: "Chronology of Colonial Imprisonment",
        description: "From the Cellular Jail's construction in the 1890s to its recognition as a National Memorial in 1979.",
        link: "frontend/cellular-jail-explorer/index.html#timeline"
      }
    ]);
  }

  // --- Prison Map Pin Logic -----------------------------------------
  const pins = [...document.querySelectorAll(".celljail-pin")];
  const cards = [...document.querySelectorAll(".celljail-card")];
  const filterButtons = [...document.querySelectorAll(".celljail-filter-btn")];
  const detailEyebrow = document.getElementById("celljail-detail-eyebrow");
  const detailTitle = document.getElementById("celljail-detail-title");
  const detailDesc = document.getElementById("celljail-detail-desc");
  const detailPrisoners = document.getElementById("celljail-detail-prisoners");

  const locationData = {
    cellular: {
      eyebrow: "Port Blair, Andaman & Nicobar Islands",
      title: "Cellular Jail",
      desc: "Known as Kala Pani (Black Waters), this radial prison was engineered so no inmate could see or communicate with another. It held around 130 political prisoners between 1909 and 1921, rising to 585 revolutionaries by 1938, and was declared a National Memorial in 1979.",
      prisoners: ["Veer Savarkar", "Batukeshwar Dutt", "Fazl-e-Haq Khairabadi"],
      movement: "andaman-detention"
    },
    yerawada: {
      eyebrow: "Pune, Maharashtra",
      title: "Yerawada Central Jail",
      desc: "One of the sites Mahatma Gandhi was repeatedly imprisoned at during the freedom struggle. His fast during detention here in 1932 led directly to the Poona Pact, which reshaped the debate over separate electorates.",
      prisoners: ["Mahatma Gandhi"],
      movement: "gandhi-satyagraha"
    },
    agakhan: {
      eyebrow: "Pune, Maharashtra",
      title: "Aga Khan Palace",
      desc: "Following the 1942 Quit India call, Gandhi, Kasturba Gandhi, and his secretary Mahadev Desai were detained at this palace-turned-prison. Both Kasturba Gandhi and Mahadev Desai died in custody here.",
      prisoners: ["Mahatma Gandhi", "Kasturba Gandhi", "Mahadev Desai"],
      movement: "gandhi-satyagraha"
    },
    alipore: {
      eyebrow: "Kolkata, West Bengal",
      title: "Alipore Jail",
      desc: "Site of the landmark 1908 Alipore Bomb Case trial, in which Aurobindo Ghosh and others were tried and imprisoned for alleged involvement in early revolutionary activity in Bengal.",
      prisoners: ["Aurobindo Ghosh"],
      movement: "revolutionary-trials"
    },
    lahore: {
      eyebrow: "Lahore, Punjab",
      title: "Lahore Central Jail",
      desc: "Following the Lahore Conspiracy Case trial, Bhagat Singh, Rajguru, and Sukhdev were executed here in March 1931 — an event that galvanised public sentiment across India.",
      prisoners: ["Bhagat Singh", "Rajguru", "Sukhdev"],
      movement: "revolutionary-trials"
    },
    redfort: {
      eyebrow: "Delhi",
      title: "Red Fort",
      desc: "Venue of the 1945–46 INA Trials, where Indian National Army officers Shah Nawaz Khan, Prem Kumar Sahgal, and Gurbaksh Singh Dhillon were court-martialled, sparking nationwide protest.",
      prisoners: ["Shah Nawaz Khan", "Prem Kumar Sahgal", "Gurbaksh Singh Dhillon"],
      movement: "ina-trials"
    }
  };

  function selectLocation(loc) {
    const data = locationData[loc];
    if (!data) return;

    pins.forEach((pin) => {
      const isActive = pin.dataset.loc === loc;
      pin.classList.toggle("active", isActive);
      pin.setAttribute("aria-pressed", String(isActive));
    });

    detailEyebrow.textContent = data.eyebrow;
    detailTitle.textContent = data.title;
    detailDesc.textContent = data.desc;
    detailPrisoners.innerHTML = "";
    data.prisoners.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      detailPrisoners.appendChild(li);
    });
  }

  pins.forEach((pin) => {
    pin.addEventListener("click", () => selectLocation(pin.dataset.loc));
  });

  // Selecting a profile card also selects the matching pin
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      selectLocation(card.dataset.loc);
      document.getElementById("locations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // --- Movement Filters (profiles + map pins) ------------------------
  function applyMovementFilter(movement) {
    cards.forEach((card) => {
      const matches = movement === "all" || card.dataset.movement === movement;
      card.classList.toggle("is-filtered-out", !matches);
    });

    pins.forEach((pin) => {
      const data = locationData[pin.dataset.loc];
      const matches = movement === "all" || (data && data.movement === movement);
      pin.classList.toggle("is-filtered-out", !matches);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const movement = btn.dataset.movement;

      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("active", isActive);
        b.setAttribute("aria-pressed", String(isActive));
      });

      applyMovementFilter(movement);
    });
  });

  // --- Timeline-to-Map Linking ----------------------------------------
  document.querySelectorAll(".celljail-timeline-step[data-loc]").forEach((step) => {
    const loc = step.dataset.loc;
    const data = locationData[loc];

    step.setAttribute("tabindex", "0");
    step.setAttribute("role", "button");
    step.setAttribute("aria-label", `View ${data ? data.title : "this location"} on the map`);

    const activateStep = () => {
      selectLocation(loc);
      document.getElementById("locations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    step.addEventListener("click", activateStep);
    step.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateStep();
      }
    });
  });

  // --- Gallery Modal Logic -----------------------------------------
  let lastFocusedElement = null;
  let celljailModalFocusTrap = null;

  function openModal(item) {
    lastFocusedElement = item;

    modalTitle.textContent = item.dataset.title;
    modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
    modalDescription.textContent = item.dataset.desc;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (typeof window.setupFocusTrap === "function") {
      celljailModalFocusTrap = window.setupFocusTrap(modal);
    }

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (celljailModalFocusTrap) {
      celljailModalFocusTrap.deactivate();
      celljailModalFocusTrap = null;
    }

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-haspopup", "dialog");
    item.setAttribute("aria-controls", "celljail-modal");
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
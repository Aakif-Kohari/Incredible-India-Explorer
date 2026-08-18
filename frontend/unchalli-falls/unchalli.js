/* =========================================================
   UNCHALLI FALLS EXPLORER
   All functionality is scoped to this page.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     ELEMENT HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuToggle = $("#unchalli-menu-toggle");
  const navMenu = $("#unchalli-nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    $$("#unchalli-nav-menu a").forEach((link) => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =======================================================
     THEME TOGGLE
  ======================================================= */

  const themeToggle = $("#unchalli-theme-toggle");

  function applySavedTheme() {

    const savedTheme =
      localStorage.getItem("theme") ||
      localStorage.getItem("unchalli-theme");

    if (savedTheme === "light") {

      document.body.classList.add(
        "uf-light-theme"
      );

      if (themeToggle) {
        themeToggle.textContent = "🌙";
      }

    }

  }

  applySavedTheme();


  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      const isLight =
        document.body.classList.toggle(
          "uf-light-theme"
        );

      localStorage.setItem(
        "unchalli-theme",
        isLight ? "light" : "dark"
      );

      themeToggle.textContent =
        isLight ? "🌙" : "☀️";

    });

  }


  /* =======================================================
     HEIGHT VISUALIZATION
  ======================================================= */

  const heightSlider = $("#height-slider");
  const heightValue = $("#height-value");
  const heightDescription = $("#height-description");
  const heightWaterfall = $(".height-waterfall");

  const heightDescriptions = {
    20: "A small comparison scale.",
    30: "Around a 30 metre vertical drop.",
    60: "Halfway towards the documented Unchalli Falls height.",
    90: "A substantial 90 metre vertical drop.",
    116: "Full documented drop of Unchalli Falls."
  };


  function updateHeight(value) {

    const numericValue = Number(value);

    if (heightValue) {
      heightValue.textContent = numericValue;
    }

    if (heightDescription) {

      heightDescription.textContent =
        heightDescriptions[numericValue] ||
        `${numericValue} metre comparison scale.`;

    }

    if (heightWaterfall) {

      /*
        116m = 390px visual height.
        Keep a minimum height so the visual remains visible.
      */

      const visualHeight =
        Math.max(
          70,
          (numericValue / 116) * 390
        );

      heightWaterfall.style.height =
        `${visualHeight}px`;

      heightWaterfall.style.top =
        `${424 - visualHeight}px`;

    }

  }


  if (heightSlider) {

    heightSlider.addEventListener(
      "input",
      (event) => {
        updateHeight(event.target.value);
      }
    );

    updateHeight(heightSlider.value);

  }


  $$(".height-comparisons button").forEach((button) => {

    button.addEventListener("click", () => {

      const value =
        button.dataset.height;

      if (heightSlider) {
        heightSlider.value = value;
        updateHeight(value);
      }

    });

  });


  /* =======================================================
     LANDSCAPE EXPLORER
  ======================================================= */

  const landscapeImage =
    $("#landscape-main-image");

  const landscapeTitle =
    $("#landscape-title");

  const landscapeCategory =
    $("#landscape-category");

  const landscapeText =
    $("#landscape-text");


  $$(".landscape-option").forEach((option) => {

    option.addEventListener("click", () => {

      const image =
        option.dataset.image;

      const title =
        option.dataset.title;

      const category =
        option.dataset.category;

      const text =
        option.dataset.text;


      $$(".landscape-option").forEach((item) => {
        item.classList.remove("active");
      });

      option.classList.add("active");


      if (landscapeImage) {

        landscapeImage.style.opacity = "0";

        setTimeout(() => {

          landscapeImage.src = image;

          landscapeImage.style.opacity = "1";

        }, 180);

      }


      if (landscapeTitle) {
        landscapeTitle.textContent = title;
      }

      if (landscapeCategory) {
        landscapeCategory.textContent = category;
      }

      if (landscapeText) {
        landscapeText.textContent = text;
      }

    });

  });


  /* =======================================================
     SEASONAL COMPARISON
  ======================================================= */

  const seasonData = {

    monsoon: {
      number: "01",
      badge: "MONSOON",
      title: "Monsoon Surge",
      description:
        "Heavy monsoon rainfall increases the flow of the Aghanashini River and dramatically strengthens the waterfall's volume and spray.",
      flow: "HIGH",
      width: "90%",
      image: "../assets/images/unchalli-viewpoint.jpg"
    },

    postmonsoon: {
      number: "02",
      badge: "POST-MONSOON",
      title: "The Ideal Balance",
      description:
        "After the monsoon, the landscape remains lush while the waterfall continues to carry impressive seasonal flow. Karnataka Tourism recommends the post-monsoon period for visiting.",
      flow: "STRONG",
      width: "72%",
      image: "../assets/images/unchalli-cascade.jpg"
    },

    dry: {
      number: "03",
      badge: "DRIER MONTHS",
      title: "A Quieter Valley",
      description:
        "With lower seasonal rainfall, the water flow can be less forceful and the surrounding valley becomes a different kind of landscape to explore.",
      flow: "LOWER",
      width: "42%",
      image: "../assets/images/unchalli-summer.jpg"
    }

  };


  const seasonImage = $("#season-image");
  const seasonBadge = $("#season-badge");
  const seasonNumber = $("#season-number");
  const seasonTitle = $("#season-title");
  const seasonDescription = $("#season-description");
  const flowValue = $("#flow-value");
  const flowFill = $("#flow-fill");


  function updateSeason(seasonName) {

    const data =
      seasonData[seasonName];

    if (!data) {
      return;
    }


    $$(".season-tab").forEach((tab) => {

      tab.classList.toggle(
        "active",
        tab.dataset.season === seasonName
      );

    });


    if (seasonImage) {

      seasonImage.style.opacity = "0";

      setTimeout(() => {

        seasonImage.src = data.image;

        seasonImage.style.opacity = "1";

      }, 180);

    }


    if (seasonBadge) {
      seasonBadge.textContent = data.badge;
    }

    if (seasonNumber) {
      seasonNumber.textContent = data.number;
    }

    if (seasonTitle) {
      seasonTitle.textContent = data.title;
    }

    if (seasonDescription) {
      seasonDescription.textContent =
        data.description;
    }

    if (flowValue) {
      flowValue.textContent = data.flow;
    }

    if (flowFill) {
      flowFill.style.width = data.width;
    }

  }


  $$(".season-tab").forEach((tab) => {

    tab.addEventListener("click", () => {

      updateSeason(
        tab.dataset.season
      );

    });

  });


  /* =======================================================
     GALLERY MODAL
  ======================================================= */

  const modal =
    $("#unchalli-modal");

  const modalImage =
    $("#modal-image");

  const modalTitle =
    $("#modal-title");

  const modalClose =
    $("#unchalli-modal-close");


  function openGalleryModal(image, title) {

    if (!modal || !modalImage) {
      return;
    }

    modalImage.src = image;
    modalImage.alt = title;

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

    if (modalClose) {
      modalClose.focus();
    }

  }


  function closeGalleryModal() {

    if (!modal) {
      return;
    }

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

  }


  $$(".gallery-item").forEach((item) => {

    item.addEventListener("click", () => {

      openGalleryModal(
        item.dataset.image,
        item.dataset.title
      );

    });

  });


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeGalleryModal
    );

  }


  if (modal) {

    modal.addEventListener("click", (event) => {

      if (event.target === modal) {
        closeGalleryModal();
      }

    });

  }


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeGalleryModal();
    }

  });


  /* =======================================================
     SCROLL TOP
  ======================================================= */

  const scrollTop =
    $("#unchalli-scroll-top");


  function updateScrollTop() {

    if (!scrollTop) {
      return;
    }

    if (window.scrollY > 500) {

      scrollTop.classList.add("visible");

    } else {

      scrollTop.classList.remove("visible");

    }

  }


  window.addEventListener(
    "scroll",
    updateScrollTop,
    { passive: true }
  );


  if (scrollTop) {

    scrollTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
  ======================================================= */

  $$('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     IMAGE ERROR HANDLING
     Does not change unrelated project images.
  ======================================================= */

  $$(".unchalli-hero-image, .landscape-main img, .season-image-wrap img, .river-image img, .gallery-item img")
    .forEach((element) => {

      element.addEventListener("error", () => {

        element.classList.add(
          "unchalli-image-error"
        );

      });

    });


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  updateHeight(
    heightSlider
      ? heightSlider.value
      : 116
  );

  updateSeason("monsoon");

  updateScrollTop();

});
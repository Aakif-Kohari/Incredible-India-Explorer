/* =========================================================
   LANGSHIANG FALLS EXPLORER
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navbar =
    document.getElementById("navbar");

  const menuToggle =
    document.getElementById("menu-toggle");

  const navMenu =
    document.getElementById("nav-menu");


  /* ---------- MOBILE MENU ---------- */

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navMenu.classList.toggle("active");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  }


  /* ---------- DROPDOWNS ---------- */

  const dropdowns =
    document.querySelectorAll(".nav-dropdown");


  dropdowns.forEach((dropdown) => {

    const button =
      dropdown.querySelector(".dropdown-toggle");

    if (!button) return;


    button.addEventListener("click", (event) => {

      event.stopPropagation();

      const isOpen =
        dropdown.classList.toggle("open");

      button.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      dropdowns.forEach((other) => {

        if (other !== dropdown) {

          other.classList.remove("open");

          const otherButton =
            other.querySelector(".dropdown-toggle");

          if (otherButton) {

            otherButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }

      });

    });

  });


  /* Close dropdown */

  document.addEventListener("click", () => {

    dropdowns.forEach((dropdown) => {

      dropdown.classList.remove("open");

      const button =
        dropdown.querySelector(".dropdown-toggle");

      if (button) {

        button.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  });


  /* ---------- CLOSE MOBILE MENU ---------- */

  document
    .querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-item")
    .forEach((link) => {

      link.addEventListener("click", () => {

        navMenu?.classList.remove("active");

        menuToggle?.classList.remove("active");

        menuToggle?.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


  /* ---------- NAVBAR SCROLL ---------- */

  window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 30) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  });


  /* =======================================================
     THEME
  ======================================================= */

  const themeToggle =
    document.getElementById("theme-toggle");


  function updateThemeIcon() {

    if (!themeToggle) return;

    const light =
      document.body.classList.contains(
        "light-theme"
      );

    themeToggle.textContent =
      light ? "🌙" : "☀️";

    themeToggle.setAttribute(
      "aria-label",
      light
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

  }


  if (themeToggle) {

    updateThemeIcon();


    themeToggle.addEventListener(
      "click",
      () => {

        document.body.classList.toggle(
          "light-theme"
        );

        const theme =
          document.body.classList.contains(
            "light-theme"
          )
            ? "light"
            : "dark";

        localStorage.setItem(
          "theme",
          theme
        );

        updateThemeIcon();

      }
    );

  }


  /* =======================================================
     HEIGHT VISUALIZATION
  ======================================================= */

  const heightSlider =
    document.getElementById("height-slider");

  const heightValue =
    document.getElementById("height-value");

  const heightFill =
    document.getElementById("height-fill");

  const heightDescription =
    document.getElementById(
      "height-description"
    );


  function updateHeight() {

    if (!heightSlider) return;

    const value =
      Number(heightSlider.value);

    const percentage =
      ((value - 20) / 80) * 100;


    if (heightValue) {

      heightValue.textContent =
        value;

    }


    if (heightFill) {

      heightFill.style.height =
        `${percentage}%`;

    }


    if (heightDescription) {

      if (value < 40) {

        heightDescription.textContent =
          "A lower visual scale representing the valley and lower waterfall zone.";

      } else if (value < 70) {

        heightDescription.textContent =
          "The middle scale highlights the steep transition from hill to valley.";

      } else {

        heightDescription.textContent =
          "A larger scale emphasizes the dramatic vertical character of the waterfall landscape.";

      }

    }

  }


  if (heightSlider) {

    heightSlider.addEventListener(
      "input",
      updateHeight
    );

    updateHeight();

  }


  /* =======================================================
     SEASONAL COMPARISON
  ======================================================= */

  const seasonData = {

    monsoon: {

      badge: "MONSOON",

      eyebrow: "PEAK RAINFALL",

      title: "Lush and powerful",

      text:
        "Heavy rainfall increases stream flow, refreshes the forest and creates a dramatic misty valley atmosphere.",

      flow: 100,

      image:
        "../assets/images/langshiang-monsoon.jpg",

      alt:
        "Langshiang Falls during the monsoon season"

    },


    winter: {

      badge: "WINTER",

      eyebrow: "COOLER LANDSCAPE",

      title: "Clearer valley views",

      text:
        "Cooler conditions can provide clearer views across the Khasi landscape while the waterfall may have less intense flow.",

      flow: 55,

      image:
        "../assets/images/langshiang-postmonsoon.jpg",

      alt:
        "Langshiang Falls and surrounding valley during a cooler season"

    },


    summer: {

      badge: "SUMMER",

      eyebrow: "WARMER PERIOD",

      title: "A quieter character",

      text:
        "Before the strongest monsoon rains, water levels may be lower and the surrounding landscape takes on a different seasonal character.",

      flow: 35,

      image:
        "../assets/images/langshiang-summer.jpg",

      alt:
        "Langshiang valley landscape during a drier season"

    }

  };


  const seasonTabs =
    document.querySelectorAll(".season-tab");

  const seasonImage =
    document.getElementById("season-image");

  const seasonBadge =
    document.getElementById("season-badge");

  const seasonEyebrow =
    document.getElementById("season-eyebrow");

  const seasonTitle =
    document.getElementById("season-title");

  const seasonText =
    document.getElementById("season-text");

  const flowValue =
    document.getElementById("flow-value");

  const flowProgress =
    document.getElementById("flow-progress");


  function updateSeason(season) {

    const data =
      seasonData[season];

    if (!data) return;


    seasonTabs.forEach((tab) => {

      tab.classList.toggle(
        "active",
        tab.dataset.season === season
      );

    });


    if (seasonImage) {

      seasonImage.src =
        data.image;

      seasonImage.alt =
        data.alt;

    }


    if (seasonBadge) {

      seasonBadge.textContent =
        data.badge;

    }


    if (seasonEyebrow) {

      seasonEyebrow.textContent =
        data.eyebrow;

    }


    if (seasonTitle) {

      seasonTitle.textContent =
        data.title;

    }


    if (seasonText) {

      seasonText.textContent =
        data.text;

    }


    if (flowValue) {

      flowValue.textContent =
        `${data.flow}%`;

    }


    if (flowProgress) {

      flowProgress.style.width =
        `${data.flow}%`;

    }

  }


  seasonTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

      updateSeason(
        tab.dataset.season
      );

    });

  });


  /* =======================================================
     LANDSCAPE EXPLORER
  ======================================================= */

  const landscapeData = {

    waterfall: {

      number: "01",

      title: "Waterfall",

      text:
        "The waterfall forms the central visual feature of the valley, connecting flowing water with steep terrain.",

      image:
        "../assets/images/langshiang-view.jpg",

      alt:
        "Full view of Langshiang Falls"

    },


    valley: {

      number: "02",

      title: "Valley",

      text:
        "The surrounding valley creates a dramatic sense of depth, with steep slopes and distant green ridges.",

      image:
        "../assets/images/langshiang-summer.jpg",

      alt:
        "Deep valley landscape surrounding Langshiang Falls"

    },


    forest: {

      number: "03",

      title: "Forest",

      text:
        "Moisture-rich forest vegetation gives the Khasi landscape its characteristic green appearance.",

      image:
        "../assets/images/langshiang-forest.jpg",

      alt:
        "Forest landscape surrounding Langshiang Falls"

    },


    rocks: {

      number: "04",

      title: "Rocky Terrain",

      text:
        "Rock surfaces and erosion features show how water interacts with the rugged Meghalaya landscape.",

      image:
        "../assets/images/langshiang-rocks.jpg",

      alt:
        "Rocky terrain around Langshiang Falls"

    }

  };


  const landscapeButtons =
    document.querySelectorAll(
      ".landscape-button"
    );

  const landscapeImage =
    document.getElementById(
      "landscape-image"
    );

  const landscapeNumber =
    document.getElementById(
      "landscape-number"
    );

  const landscapeTitle =
    document.getElementById(
      "landscape-title"
    );

  const landscapeText =
    document.getElementById(
      "landscape-text"
    );


  function updateLandscape(type) {

    const data =
      landscapeData[type];

    if (!data) return;


    landscapeButtons.forEach(
      (button) => {

        button.classList.toggle(
          "active",
          button.dataset.landscape === type
        );

      }
    );


    if (landscapeImage) {

      landscapeImage.src =
        data.image;

      landscapeImage.alt =
        data.alt;

    }


    if (landscapeNumber) {

      landscapeNumber.textContent =
        data.number;

    }


    if (landscapeTitle) {

      landscapeTitle.textContent =
        data.title;

    }


    if (landscapeText) {

      landscapeText.textContent =
        data.text;

    }

  }


  landscapeButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          updateLandscape(
            button.dataset.landscape
          );

        }
      );

    }
  );


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backTop =
    document.querySelector(
      ".back-top"
    );

  if (backTop) {

    backTop.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  updateSeason("monsoon");

  updateLandscape("waterfall");

});
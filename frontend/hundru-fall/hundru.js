/* =====================================================
   HUNDRU FALLS EXPLORER
===================================================== */

/* =====================================================
   NAVIGATION
===================================================== */

const navbar =
  document.getElementById("navbar");

const menuToggle =
  document.getElementById("menu-toggle");

const navMenu =
  document.getElementById("nav-menu");

const dropdownToggles =
  document.querySelectorAll(
    ".dropdown-toggle"
  );


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuToggle && navMenu) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navMenu.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );

}


/* =====================================================
   DROPDOWN MENUS
===================================================== */

dropdownToggles.forEach(
  (toggle) => {

    toggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        const dropdown =
          toggle.closest(
            ".nav-dropdown"
          );

        const isOpen =
          dropdown.classList.toggle(
            "open"
          );

        toggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );

  }
);


/* =====================================================
   CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
  "click",
  () => {

    document
      .querySelectorAll(
        ".nav-dropdown.open"
      )
      .forEach(
        (dropdown) => {

          dropdown.classList.remove(
            "open"
          );

        }
      );

    dropdownToggles.forEach(
      (toggle) => {

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  }
);


/* =====================================================
   CLOSE MOBILE MENU AFTER LINK CLICK
===================================================== */

document
  .querySelectorAll(
    ".nav-menu a"
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          if (navMenu) {
            navMenu.classList.remove(
              "active"
            );
          }

          if (menuToggle) {

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }
      );

    }
  );


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

window.addEventListener(
  "scroll",
  () => {

    if (!navbar) return;

    if (window.scrollY > 30) {

      navbar.classList.add(
        "scrolled"
      );

    } else {

      navbar.classList.remove(
        "scrolled"
      );

    }

  }
);


/* =====================================================
   THEME TOGGLE
===================================================== */

const themeToggle =
  document.getElementById(
    "theme-toggle"
  );


if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light-theme"
      );

      const isLight =
        document.body.classList.contains(
          "light-theme"
        );

      localStorage.setItem(
        "theme",
        isLight
          ? "light"
          : "dark"
      );

      themeToggle.textContent =
        isLight
          ? "🌙"
          : "☀️";

    }
  );

}

/* =====================================================
   HEIGHT VISUALIZATION
===================================================== */

const heightSlider =
  document.getElementById(
    "height-slider"
  );

const heightNumber =
  document.getElementById(
    "height-number"
  );

const heightDescription =
  document.getElementById(
    "height-description"
  );

const waterfallFill =
  document.getElementById(
    "waterfall-fill"
  );


function updateHeight() {

  if (
    !heightSlider ||
    !heightNumber ||
    !waterfallFill
  ) {
    return;
  }


  const value =
    Number(heightSlider.value);

  const percentage =
    (value / 98) * 100;


  heightNumber.textContent =
    value;


  waterfallFill.style.height =
    `${percentage}%`;


  if (heightDescription) {

    if (value >= 90) {

      heightDescription.textContent =
        "The full approximate height of Hundru Falls — around 98 metres.";

    } else if (value >= 60) {

      heightDescription.textContent =
        "A major portion of the waterfall's dramatic vertical descent.";

    } else {

      heightDescription.textContent =
        "Use the slider to compare the waterfall's scale.";

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


/* =====================================================
   SEASONAL COMPARISON
===================================================== */

const seasonData = {

  monsoon: {

    image:
      "../assets/images/hundru-monsoon.jpg",

    alt:
      "Hundru Falls during the monsoon season",

    badge:
      "MONSOON",

    eyebrow:
      "PEAK FLOW",

    title:
      "Powerful and dramatic",

    text:
      "Monsoon rainfall increases the Subarnarekha's flow, making Hundru Falls particularly powerful and visually spectacular.",

    flow:
      100

  },


  winter: {

    image:
      "../assets/images/hundru-postmonsoon.jpg",

    alt:
      "Hundru Falls during the winter season",

    badge:
      "WINTER",

    eyebrow:
      "CALMER FLOW",

    title:
      "A clearer landscape",

    text:
      "The flow generally becomes calmer after the monsoon, allowing visitors to appreciate the rocks, valley and surrounding landscape.",

    flow:
      55

  },


  summer: {

    image:
      "../assets/images/hundru-summer.jpg",

    alt:
      "Rocky landscape around Hundru Falls during a drier season",

    badge:
      "SUMMER",

    eyebrow:
      "LOWER FLOW",

    title:
      "Rock and river revealed",

    text:
      "Lower seasonal flow can expose more of the rocky terrain and reveal the changing character of the river landscape.",

    flow:
      30

  }

};


const seasonTabs =
  document.querySelectorAll(
    ".season-tab"
  );

const seasonImage =
  document.getElementById(
    "season-image"
  );

const seasonBadge =
  document.getElementById(
    "season-badge"
  );

const seasonEyebrow =
  document.getElementById(
    "season-eyebrow"
  );

const seasonTitle =
  document.getElementById(
    "season-title"
  );

const seasonText =
  document.getElementById(
    "season-text"
  );

const flowValue =
  document.getElementById(
    "flow-value"
  );

const flowProgress =
  document.getElementById(
    "flow-progress"
  );


function showSeason(season) {

  const data =
    seasonData[season];

  if (!data) return;


  seasonTabs.forEach(
    (tab) => {

      tab.classList.toggle(
        "active",
        tab.dataset.season === season
      );

    }
  );


  if (seasonImage) {

    seasonImage.style.opacity = "0";

    setTimeout(() => {

      seasonImage.src =
        data.image;

      seasonImage.alt =
        data.alt;

      seasonImage.style.opacity =
        "1";

    }, 150);

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


seasonTabs.forEach(
  (tab) => {

    tab.addEventListener(
      "click",
      () => {

        showSeason(
          tab.dataset.season
        );

      }
    );

  }
);


/* =====================================================
   VIEWPOINT EXPLORER
===================================================== */

const viewpointData = {

  full: {

    number:
      "01",

    image:
      "../assets/images/hundru-fullview.jpg",

    alt:
      "Full view of Hundru Falls",

    title:
      "Full Waterfall View",

    text:
      "A broad perspective reveals the full vertical descent and the rocky landscape surrounding Hundru Falls."

  },


  rock: {

    number:
      "02",

    image:
      "../assets/images/hundru-rocks.jpg",

    alt:
      "Rocky viewpoint near Hundru Falls",

    title:
      "Rocky Edge",

    text:
      "The rocky viewpoints reveal the geological character of the plateau and the terrain shaped by flowing water."

  },


  river: {

    number:
      "03",

    image:
      "../assets/images/hundru-river.jpg",

    alt:
      "Subarnarekha River near Hundru Falls",

    title:
      "River View",

    text:
      "Follow the Subarnarekha River as it approaches the dramatic change in elevation that creates Hundru Falls."

  }

};


const viewpointButtons =
  document.querySelectorAll(
    ".viewpoint-button"
  );

const viewpointImage =
  document.getElementById(
    "viewpoint-image"
  );

const viewpointNumber =
  document.getElementById(
    "viewpoint-number"
  );

const viewpointTitle =
  document.getElementById(
    "viewpoint-title"
  );

const viewpointText =
  document.getElementById(
    "viewpoint-text"
  );


function showViewpoint(view) {

  const data =
    viewpointData[view];

  if (!data) return;


  viewpointButtons.forEach(
    (button) => {

      button.classList.toggle(
        "active",
        button.dataset.view === view
      );

    }
  );


  if (viewpointImage) {

    viewpointImage.style.opacity =
      "0";

    setTimeout(() => {

      viewpointImage.src =
        data.image;

      viewpointImage.alt =
        data.alt;

      viewpointImage.style.opacity =
        "1";

    }, 150);

  }


  if (viewpointNumber) {
    viewpointNumber.textContent =
      data.number;
  }


  if (viewpointTitle) {
    viewpointTitle.textContent =
      data.title;
  }


  if (viewpointText) {
    viewpointText.textContent =
      data.text;
  }

}


viewpointButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        showViewpoint(
          button.dataset.view
        );

      }
    );

  }
);


/* =====================================================
   IMAGE FALLBACK
===================================================== */

document
  .querySelectorAll("img")
  .forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-missing"
        );

        image.alt =
          image.alt ||
          "Hundru Falls Explorer image";

      }
    );

  });


/* =====================================================
   INITIAL STATE
===================================================== */

showSeason("monsoon");

showViewpoint("full");

activateRiverStep(0);

console.log(
  "Hundru Falls Explorer loaded successfully."
);
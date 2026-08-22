/* =========================================================
   LODH FALLS EXPLORER
   Interactive JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     HEIGHT VISUALIZATION
  ======================================================= */

  const heightSlider =
    document.getElementById("height-slider");

  const heightNumber =
    document.getElementById("height-number");

  const heightDescription =
    document.getElementById("height-description");

  const waterfallFill =
    document.getElementById("waterfall-fill");


  if (
    heightSlider &&
    heightNumber &&
    heightDescription &&
    waterfallFill
  ) {

    function updateHeight() {

      const value =
        Number(heightSlider.value);

      const max =
        Number(heightSlider.max);

      const percentage =
        (value / max) * 100;


      heightNumber.textContent =
        value;


      waterfallFill.style.height =
        `${percentage}%`;


      if (value >= 130) {

        heightDescription.textContent =
          "You are viewing almost the full reported elevation of Lodh Falls.";

      }

      else if (value >= 90) {

        heightDescription.textContent =
          "This represents a substantial section of the waterfall's dramatic descent.";

      }

      else {

        heightDescription.textContent =
          "Explore a smaller section of the waterfall's reported elevation.";

      }

    }


    heightSlider.addEventListener(
      "input",
      updateHeight
    );


    updateHeight();

  }



  /* =======================================================
     RIVER / LANDSCAPE EXPLORER
  ======================================================= */

  const viewpointImage =
    document.getElementById("viewpoint-image");

  const viewpointNumber =
    document.getElementById("viewpoint-number");

  const viewpointTitle =
    document.getElementById("viewpoint-title");

  const viewpointText =
    document.getElementById("viewpoint-text");


  const viewpointButtons =
    document.querySelectorAll(
      ".viewpoint-button"
    );


  const viewpointData = {

    waterfall: {

      image:
        "../assets/images/lodh-cascade.jpg",

      number:
        "01",

      title:
        "Full Waterfall View",

      text:
        "A broad view reveals the dramatic descent of Lodh Falls together with the surrounding forest and rocky landscape.",

      alt:
        "Full view of Lodh Falls surrounded by forest and rocky terrain"

    },


    forest: {

      image:
        "../assets/images/lodh-forest.jpg",

      number:
        "02",

      title:
        "Forest Landscape",

      text:
        "Dense vegetation around the waterfall creates a strong connection between the cascading water and Jharkhand's forest environment.",

      alt:
        "Forest landscape surrounding Lodh Falls in Jharkhand"

    },


    rocks: {

      image:
        "../assets/images/lodh-rocks.jpg",

      number:
        "03",

      title:
        "Rocky Surroundings",

      text:
        "Exposed rock surfaces and uneven terrain illustrate the geological setting through which water has carved its path.",

      alt:
        "Rocky surroundings and geological terrain near Lodh Falls"

    }

  };


  viewpointButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const view =
          button.dataset.view;

        const data =
          viewpointData[view];


        if (!data) {
          return;
        }


        viewpointButtons.forEach(
          item => {
            item.classList.remove(
              "active"
            );
          }
        );


        button.classList.add(
          "active"
        );


        viewpointImage.style.opacity =
          "0";


        setTimeout(() => {

          viewpointImage.src =
            data.image;

          viewpointImage.alt =
            data.alt;

          viewpointNumber.textContent =
            data.number;

          viewpointTitle.textContent =
            data.title;

          viewpointText.textContent =
            data.text;

          viewpointImage.style.opacity =
            "1";

        }, 180);

      }
    );

  });



  /* =======================================================
     SEASONAL COMPARISON
  ======================================================= */

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


  const seasonTabs =
    document.querySelectorAll(
      ".season-tab"
    );


  const seasonData = {

    monsoon: {

      image:
        "../assets/images/lodh-monsoon.jpg",

      badge:
        "MONSOON",

      eyebrow:
        "PEAK FLOW",

      title:
        "Powerful and dramatic",

      text:
        "Monsoon rainfall generally produces the strongest seasonal flow, making the waterfall particularly impressive.",

      flow:
        100,

      alt:
        "Lodh Falls during the monsoon season"

    },


    winter: {

      image:
        "../assets/images/lodh-postmonsoon.jpg",

      badge:
        "WINTER",

      eyebrow:
        "CLEARER CONDITIONS",

      title:
        "Cooler and calmer",

      text:
        "After the monsoon, cooler conditions can provide a more comfortable environment for exploring the surrounding landscape.",

      flow:
        60,

      alt:
        "Lodh Falls surrounded by forest during the winter season"

    },


    summer: {

      image:
        "../assets/images/lodh-summer.jpg",

      badge:
        "SUMMER",

      eyebrow:
        "LOWER FLOW",

      title:
        "A quieter landscape",

      text:
        "Lower seasonal rainfall can reduce water flow, revealing more of the rocky terrain around the waterfall.",

      flow:
        30,

      alt:
        "Rocky landscape around Lodh Falls during a lower-flow season"

    }

  };


  function updateSeason(season) {

    const data =
      seasonData[season];


    if (!data) {
      return;
    }


    seasonTabs.forEach(
      tab => {

        tab.classList.toggle(
          "active",
          tab.dataset.season === season
        );

      }
    );


    seasonImage.style.opacity =
      "0";


    setTimeout(() => {

      seasonImage.src =
        data.image;

      seasonImage.alt =
        data.alt;

      seasonBadge.textContent =
        data.badge;

      seasonEyebrow.textContent =
        data.eyebrow;

      seasonTitle.textContent =
        data.title;

      seasonText.textContent =
        data.text;

      flowValue.textContent =
        `${data.flow}%`;

      flowProgress.style.width =
        `${data.flow}%`;

      seasonImage.style.opacity =
        "1";

    }, 180);

  }


  seasonTabs.forEach(tab => {

    tab.addEventListener(
      "click",
      () => {

        updateSeason(
          tab.dataset.season
        );

      }
    );

  });


  updateSeason("monsoon");



  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }
      );

    });



  /* =======================================================
     IMAGE ERROR HANDLING
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.classList.add(
            "image-load-error"
          );

          console.warn(
            "Lodh Falls image could not be loaded:",
            image.src
          );

        }
      );

    });


});
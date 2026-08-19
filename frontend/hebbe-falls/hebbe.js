/* =====================================================
   HEBBE FALLS EXPLORER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     CASCADE LEVEL VIEWER
  ====================================================== */

  const cascadeData = {

    dodda: {
      number: "LEVEL 01",
      name: "Dodda Hebbe",
      kicker: "BIG FALL",
      image: "../assets/images/hebbe-dodda.jpg",
      description:
        "The larger section of Hebbe Falls, where the Bhadra River makes a dramatic descent through the forested terrain.",
      structure: "Larger cascade",
      character: "Powerful drop",
      setting: "Dense forest"
    },

    chikka: {
      number: "LEVEL 02",
      name: "Chikka Hebbe",
      kicker: "SMALL FALL",
      image: "../assets/images/hebbe-chikka.jpg",
      description:
        "The smaller section of the two-stage waterfall, continuing the descent through the surrounding green mountain landscape.",
      structure: "Smaller cascade",
      character: "Gentler section",
      setting: "Forest valley"
    }

  };


  const cascadeButtons =
    document.querySelectorAll(".cascade-btn");

  const cascadeImage =
    document.getElementById("cascade-image");

  const cascadeNumber =
    document.getElementById("cascade-number");

  const cascadeName =
    document.getElementById("cascade-name");

  const cascadeKicker =
    document.getElementById("cascade-kicker");

  const cascadeTitle =
    document.getElementById("cascade-title");

  const cascadeDescription =
    document.getElementById("cascade-description");

  const cascadeStructure =
    document.getElementById("cascade-structure");

  const cascadeCharacter =
    document.getElementById("cascade-character");

  const cascadeSetting =
    document.getElementById("cascade-setting");


  function updateCascade(level) {

    const data = cascadeData[level];

    if (!data) return;

    cascadeImage.style.opacity = "0";

    setTimeout(() => {

      cascadeImage.src = data.image;
      cascadeImage.alt = data.name + " at Hebbe Falls";

      cascadeNumber.textContent = data.number;
      cascadeName.textContent = data.name;

      cascadeKicker.textContent = data.kicker;
      cascadeTitle.textContent = data.name;
      cascadeDescription.textContent = data.description;

      cascadeStructure.textContent = data.structure;
      cascadeCharacter.textContent = data.character;
      cascadeSetting.textContent = data.setting;

      cascadeImage.style.opacity = "1";

    }, 180);


    cascadeButtons.forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.level === level
      );

    });

  }


  cascadeButtons.forEach(button => {

    button.addEventListener("click", () => {

      updateCascade(
        button.dataset.level
      );

    });

  });



  /* =====================================================
     SEASONAL COMPARISON
  ====================================================== */

  const seasonData = {

    monsoon: {

      badge: "MONSOON",
      period: "JUNE — SEPTEMBER",
      title: "Maximum seasonal energy",
      image: "../assets/images/hebbe-hero.jpg",

      description:
        "Heavy monsoon rainfall can transform the forest into a saturated green landscape and increase waterfall flow.",

      flow: "Very High",
      landscape: "Deep Green",
      trail: "Wet"

    },


    postmonsoon: {

      badge: "POST-MONSOON",
      period: "AUGUST — JANUARY",
      title: "Clearer forest atmosphere",
      image: "../assets/images/hebbe-postmonsson.jpg",

      description:
        "After the peak rains, the landscape can remain lush while conditions gradually become more comfortable for exploration.",

      flow: "High",
      landscape: "Lush",
      trail: "Firmer"

    },


    summer: {

      badge: "SUMMER",
      period: "FEBRUARY — MAY",
      title: "A quieter landscape",
      image: "../assets/images/hebbe-summer.jpg",

      description:
        "Lower seasonal rainfall can reduce water volume and reveal more of the surrounding rocky and forest landscape.",

      flow: "Lower",
      landscape: "Drier",
      trail: "Variable"

    }

  };


  const seasonTabs =
    document.querySelectorAll(".season-tab");

  const seasonImage =
    document.getElementById("season-image");

  const seasonBadge =
    document.getElementById("season-badge");

  const seasonPeriod =
    document.getElementById("season-period");

  const seasonTitle =
    document.getElementById("season-title");

  const seasonDescription =
    document.getElementById("season-description");

  const flowLevel =
    document.getElementById("flow-level");

  const landscapeLevel =
    document.getElementById("landscape-level");

  const trailLevel =
    document.getElementById("trail-level");


  function updateSeason(season) {

    const data = seasonData[season];

    if (!data) return;

    seasonImage.style.opacity = "0";

    setTimeout(() => {

      seasonImage.src = data.image;

      seasonBadge.textContent = data.badge;
      seasonPeriod.textContent = data.period;
      seasonTitle.textContent = data.title;
      seasonDescription.textContent = data.description;

      flowLevel.textContent = data.flow;
      landscapeLevel.textContent = data.landscape;
      trailLevel.textContent = data.trail;

      seasonImage.style.opacity = "1";

    }, 180);


    seasonTabs.forEach(tab => {

      tab.classList.toggle(
        "active",
        tab.dataset.season === season
      );

    });

  }


  seasonTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      updateSeason(
        tab.dataset.season
      );

    });

  });



  /* =====================================================
     NEARBY ATTRACTION EXPLORER
  ====================================================== */

  const placeData = {

    kemmanagundi: {

      category: "HILL STATION",

      title: "Kemmanagundi",

      description:
        "A mountain destination known for misty hills, gardens, valleys and access to Hebbe Falls."

    },


    zpoint: {

      category: "VIEWPOINT",

      title: "Z Point",

      description:
        "A scenic viewpoint around Kemmanagundi offering broad views of the surrounding Western Ghats."

    },


    bhadra: {

      category: "WILDLIFE",

      title: "Bhadra Wildlife Sanctuary",

      description:
        "A protected forest landscape in the Chikkamagaluru region known for rich wildlife and mountain ecosystems."

    },


    kalhatti: {

      category: "WATERFALL",

      title: "Kalhatti Falls",

      description:
        "A waterfall near Kemmanagundi where water cascades beside a temple-associated landscape."

    }

  };


  const nearbyButtons =
    document.querySelectorAll(".nearby-btn");

  const placeCategory =
    document.getElementById("place-category");

  const placeTitle =
    document.getElementById("place-title");

  const placeDescription =
    document.getElementById("place-description");


  function updatePlace(place) {

    const data = placeData[place];

    if (!data) return;

    placeCategory.textContent =
      data.category;

    placeTitle.textContent =
      data.title;

    placeDescription.textContent =
      data.description;


    nearbyButtons.forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.place === place
      );

    });

  }


  nearbyButtons.forEach(button => {

    button.addEventListener("click", () => {

      updatePlace(
        button.dataset.place
      );

    });

  });



  /* =====================================================
     BOOKMARK / JOURNEY
  ====================================================== */

  const bookmarkButton =
    document.getElementById("bookmark-btn");


  if (bookmarkButton) {

    bookmarkButton.addEventListener(
      "click",
      () => {

        const saved =
          bookmarkButton.getAttribute(
            "aria-pressed"
          ) === "true";

        bookmarkButton.setAttribute(
          "aria-pressed",
          String(!saved)
        );

        bookmarkButton.innerHTML =
          saved
            ? "♡ Save to Journey"
            : "♥ Saved to Journey";

      }
    );

  }



  /* =====================================================
     SCROLL TO TOP
  ====================================================== */

  const scrollTop =
    document.getElementById(
      "btn-scroll-top"
    );


  window.addEventListener(
    "scroll",
    () => {

      if (!scrollTop) return;

      if (window.scrollY > 500) {

        scrollTop.classList.add("show");

      } else {

        scrollTop.classList.remove("show");

      }

    }
  );


  if (scrollTop) {

    scrollTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }



  /* =====================================================
     IMAGE FALLBACK
  ====================================================== */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.background =
            "#d9e0d5";

          image.alt =
            "Image unavailable";

        }
      );

    });

});
"use strict";

/* =========================================================
   MAGOD FALLS EXPLORER
   Interactive functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuToggle =
    document.getElementById("menu-toggle");

  const navMenu =
    document.getElementById("nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navMenu.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  }


  /* =======================================================
     NAV DROPDOWNS
     ======================================================= */

  const dropdownButtons =
    document.querySelectorAll(".dropdown-toggle");

  dropdownButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      event.stopPropagation();

      const dropdown =
        button.closest(".nav-dropdown");

      if (!dropdown) {
        return;
      }

      const isOpen =
        dropdown.classList.toggle("open");

      button.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  });


  document.addEventListener("click", () => {

    document
      .querySelectorAll(".nav-dropdown.open")
      .forEach((dropdown) => {

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


  /* =======================================================
     CASCADE EXPLORER
     ======================================================= */

  const cascadeData = {

    1: {
      title: "Upper Flow",
      description:
        "Water gathers and begins its descent through the rocky forest landscape."
    },

    2: {
      title: "Rocky Drop",
      description:
        "The river encounters a change in elevation and accelerates over the rocky terrain."
    },

    3: {
      title: "Middle Cascade",
      description:
        "The central section demonstrates the multi-stage character of the waterfall."
    },

    4: {
      title: "Lower Flow",
      description:
        "The descending water continues toward the lower stream and surrounding valley."
    }

  };


  const cascadeButtons =
    document.querySelectorAll(".cascade-control");

  const cascadeNumber =
    document.getElementById("cascade-number");

  const cascadeTitle =
    document.getElementById("cascade-title");

  const cascadeDescription =
    document.getElementById("cascade-description");


  function activateCascade(stage) {

    const data =
      cascadeData[stage];

    if (!data) {
      return;
    }

    cascadeButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.stage === String(stage)
      );

    });


    document
      .querySelectorAll(".cascade-stage")
      .forEach((element, index) => {

        element.classList.toggle(
          "active",
          index + 1 === Number(stage)
        );

      });


    if (cascadeNumber) {
      cascadeNumber.textContent =
        `CASCADE ${String(stage).padStart(2, "0")}`;
    }

    if (cascadeTitle) {
      cascadeTitle.textContent =
        data.title;
    }

    if (cascadeDescription) {
      cascadeDescription.textContent =
        data.description;
    }

  }


  cascadeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      activateCascade(
        Number(button.dataset.stage)
      );

    });

  });


  /* =======================================================
     SEASONAL COMPARISON
     ======================================================= */

  const seasonData = {

    monsoon: {
      label: "MONSOON",
      title: "Powerful & Full",
      description:
        "Heavy rainfall feeds the streams and creates strong visual flow across the cascade.",
      flow: "Very High",
      meter: 95,
      badge: "HIGH FLOW",
      image:
        "../assets/images/magod-cascade.jpg",
      tip:
        "Expect wet conditions, slippery terrain and rapidly changing water conditions."
    },

    postmonsoon: {
      label: "POST-MONSOON",
      title: "Green & Active",
      description:
        "After the main rains, the surrounding forests remain lush while the waterfall can continue flowing strongly.",
      flow: "High",
      meter: 78,
      badge: "GOOD FLOW",
      image:
        "../assets/images/magod-forest.jpg",
      tip:
        "A good period for combining waterfall views with the surrounding green landscape."
    },

    winter: {
      label: "WINTER",
      title: "Calmer Cascade",
      description:
        "Reduced rainfall generally produces a calmer flow and greater visibility of rocks and individual sections.",
      flow: "Moderate",
      meter: 48,
      badge: "MODERATE FLOW",
      image:
        "../assets/images/magod-stream.jpg",
      tip:
        "Check local conditions before travelling and follow site-specific safety guidance."
    },

    summer: {
      label: "SUMMER",
      title: "Seasonal & Reduced",
      description:
        "With lower rainfall, the stream may become considerably smaller and the waterfall can appear very different.",
      flow: "Low",
      meter: 22,
      badge: "LOW FLOW",
      image:
        "../assets/images/magod-yellapur.jpg",
      tip:
        "Water availability can vary considerably. Verify current local conditions before visiting."
    }

  };


  const seasonButtons =
    document.querySelectorAll(".season-btn");

  const seasonImage =
    document.getElementById("season-image");

  const seasonBadge =
    document.getElementById("season-badge");

  const seasonLabel =
    document.getElementById("season-label");

  const seasonTitle =
    document.getElementById("season-title");

  const seasonDescription =
    document.getElementById("season-description");

  const flowValue =
    document.getElementById("flow-value");

  const flowMeter =
    document.getElementById("flow-meter");

  const seasonTip =
    document.getElementById("season-tip");


  function activateSeason(season) {

    const data =
      seasonData[season];

    if (!data) {
      return;
    }


    seasonButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.season === season
      );

    });


    if (seasonImage) {

      seasonImage.src =
        data.image;

      seasonImage.alt =
        `Magod Falls during ${data.label.toLowerCase()}`;

    }


    if (seasonBadge) {
      seasonBadge.textContent =
        data.badge;
    }

    if (seasonLabel) {
      seasonLabel.textContent =
        data.label;
    }

    if (seasonTitle) {
      seasonTitle.textContent =
        data.title;
    }

    if (seasonDescription) {
      seasonDescription.textContent =
        data.description;
    }

    if (flowValue) {
      flowValue.textContent =
        data.flow;
    }

    if (flowMeter) {
      flowMeter.style.width =
        `${data.meter}%`;
    }

    if (seasonTip) {
      seasonTip.textContent =
        data.tip;
    }

  }


  seasonButtons.forEach((button) => {

    button.addEventListener("click", () => {

      activateSeason(
        button.dataset.season
      );

    });

  });


  /* =======================================================
     GALLERY MODAL
     ======================================================= */

  const modal =
    document.getElementById("magod-modal");

  const modalClose =
    document.getElementById("modal-close");

  const modalImage =
    document.getElementById("modal-image");

  const modalTitle =
    document.getElementById("modal-title");

  const modalDescription =
    document.getElementById("modal-description");

  let lastFocusedElement = null;


  function openModal(card) {

    if (!modal || !card) {
      return;
    }

    const image =
      card.querySelector("img");

    if (!image) {
      return;
    }

    lastFocusedElement =
      document.activeElement;

    modalImage.src =
      image.src;

    modalImage.alt =
      image.alt;

    modalTitle.textContent =
      card.dataset.title || "Magod Falls";

    modalDescription.textContent =
      card.dataset.description || "";

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

    if (modalClose) {
      modalClose.focus();
    }

  }


  function closeModal() {

    if (!modal) {
      return;
    }

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

    if (modalImage) {
      modalImage.src = "";
    }

    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === "function"
    ) {
      lastFocusedElement.focus();
    }

  }


  document
    .querySelectorAll(".gallery-card")
    .forEach((card) => {

      card.addEventListener("click", () => {
        openModal(card);
      });


      card.addEventListener("keydown", (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openModal(card);

        }

      });

    });


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeModal
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      (event) => {

        if (event.target === modal) {
          closeModal();
        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("open")
      ) {
        closeModal();
      }

    }
  );


  /* =======================================================
     SCROLL TO TOP
     ======================================================= */

  const scrollTop =
    document.getElementById(
      "btn-scroll-top"
    );


  function updateScrollButton() {

    if (!scrollTop) {
      return;
    }

    if (window.scrollY > 500) {

      scrollTop.classList.add(
        "visible"
      );

    } else {

      scrollTop.classList.remove(
        "visible"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateScrollButton,
    {
      passive: true
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


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

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


          if (
            navMenu &&
            navMenu.classList.contains("active")
          ) {

            navMenu.classList.remove(
              "active"
            );

            menuToggle?.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }
      );

    });


  /* =======================================================
     IMAGE FALLBACK
     Prevent broken-image visual issues
     ======================================================= */

  document
    .querySelectorAll(
      ".magod-main img"
    )
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          image.classList.add(
            "image-load-error"
          );

        },
        {
          once: true
        }
      );

    });


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  activateCascade(1);

  activateSeason("monsoon");

  updateScrollButton();

});
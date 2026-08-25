/* =========================================================
   YADAVA DYNASTY EXPLORER
   Self-contained page JavaScript
   ========================================================= */

(function () {
  "use strict";


  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = $("#menu-toggle");
  const navMenu = $("#nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navMenu.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    $$(".nav-link", navMenu).forEach((link) => {

      link.addEventListener("click", () => {

        if (window.innerWidth <= 900) {
          navMenu.classList.remove("active");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });

    });

  }


  /* =======================================================
     DROPDOWNS
     ======================================================= */

  const dropdowns = $$(".nav-dropdown");

  dropdowns.forEach((dropdown) => {

    const button = $(".dropdown-toggle", dropdown);

    if (!button) return;

    button.addEventListener("click", (event) => {

      event.stopPropagation();

      const isOpen =
        dropdown.classList.contains("open");

      dropdowns.forEach((item) => {

        item.classList.remove("open");

        const itemButton =
          $(".dropdown-toggle", item);

        if (itemButton) {
          itemButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });

      if (!isOpen) {

        dropdown.classList.add("open");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  document.addEventListener("click", () => {

    dropdowns.forEach((dropdown) => {

      dropdown.classList.remove("open");

      const button =
        $(".dropdown-toggle", dropdown);

      if (button) {
        button.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    });

  });


  /* =======================================================
     THEME
     ======================================================= */

  const themeToggle = $("#theme-toggle");

  function applyTheme(theme) {

    document.body.classList.toggle(
      "light-theme",
      theme === "light"
    );

    if (themeToggle) {

      themeToggle.textContent =
        theme === "light" ? "🌙" : "☀️";

      themeToggle.setAttribute(
        "aria-label",
        theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      );

    }

  }


  const storedTheme =
    localStorage.getItem("theme") || "dark";

  applyTheme(storedTheme);


  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      const newTheme =
        document.body.classList.contains("light-theme")
          ? "dark"
          : "light";

      localStorage.setItem(
        "theme",
        newTheme
      );

      applyTheme(newTheme);

    });

  }


  /* =======================================================
     SAVE TO JOURNEY
     ======================================================= */

  const bookmarkButton =
    $("#bookmark-btn");

  const JOURNEY_KEY =
    "incredibleIndiaJourney";


  function getJourney() {

    try {

      const data =
        localStorage.getItem(JOURNEY_KEY);

      if (!data) return [];

      const parsed =
        JSON.parse(data);

      return Array.isArray(parsed)
        ? parsed
        : [];

    } catch (error) {

      console.warn(
        "Unable to read Journey data.",
        error
      );

      return [];

    }

  }


  function saveJourney(data) {

    try {

      localStorage.setItem(
        JOURNEY_KEY,
        JSON.stringify(data)
      );

      return true;

    } catch (error) {

      console.warn(
        "Unable to save Journey data.",
        error
      );

      return false;

    }

  }


  const journeyItem = {
    id: "yadava-dynasty",
    title: "Yadava (Seuna) Dynasty",
    category: "Historical Dynasty",
    url: "frontend/yadava-dynasty/yadava.html",
    image: "frontend/assets/images/yadava-devagiri.jpg"
  };


  function updateBookmarkState() {

    if (!bookmarkButton) return;

    const journey =
      getJourney();

    const saved =
      journey.some(
        (item) =>
          item.id === journeyItem.id
      );

    bookmarkButton.classList.toggle(
      "saved",
      saved
    );

    bookmarkButton.setAttribute(
      "aria-pressed",
      String(saved)
    );

    bookmarkButton.textContent =
      saved
        ? "♥ Saved to Journey"
        : "♡ Save to Journey";

  }


  if (bookmarkButton) {

    updateBookmarkState();

    bookmarkButton.addEventListener(
      "click",
      () => {

        const journey =
          getJourney();

        const existingIndex =
          journey.findIndex(
            (item) =>
              item.id === journeyItem.id
          );


        if (existingIndex !== -1) {

          journey.splice(
            existingIndex,
            1
          );

        } else {

          journey.push(
            journeyItem
          );

        }


        if (saveJourney(journey)) {

          updateBookmarkState();

          bookmarkButton.animate(
            [
              {
                transform: "scale(1)"
              },
              {
                transform: "scale(1.08)"
              },
              {
                transform: "scale(1)"
              }
            ],
            {
              duration: 250
            }
          );

        }

      }
    );

  }


  /* =======================================================
     MODAL
     ======================================================= */

  const modal =
    $("#yad-modal");

  const modalClose =
    $("#modal-close");

  const modalTitle =
    $("#modal-title");

  const modalCategory =
    $("#modal-category");

  const modalDescription =
    $("#modal-description");

  let lastFocusedElement = null;


  function openModal(
    title,
    category,
    description
  ) {

    if (
      !modal ||
      !modalTitle ||
      !modalCategory ||
      !modalDescription
    ) {
      return;
    }

    lastFocusedElement =
      document.activeElement;

    modalTitle.textContent =
      title;

    modalCategory.textContent =
      category;

    modalDescription.textContent =
      description;

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

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === "function"
    ) {
      lastFocusedElement.focus();
    }

  }


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

        if (
          event.target === modal
        ) {
          closeModal();
        }

      }
    );

  }


  /* =======================================================
     RULER CARDS
     ======================================================= */

  $$(".ruler-card").forEach((card) => {

    const button =
      $(".learn-more", card);

    if (!button) return;

    button.addEventListener(
      "click",
      () => {

        openModal(
          card.dataset.title ||
            "Yadava Ruler",

          card.dataset.category ||
            "Historical Figure",

          card.dataset.description ||
            "Historical information about this Yadava ruler."
        );

      }
    );

  });


  /* =======================================================
     GALLERY
     ======================================================= */

  $$(".gallery-card").forEach((card) => {

    card.setAttribute(
      "tabindex",
      "0"
    );

    card.setAttribute(
      "role",
      "button"
    );

    card.addEventListener(
      "click",
      () => {

        openModal(
          card.dataset.title ||
            "Yadava Heritage",

          "Visual Archive",

          card.dataset.description ||
            "Historical visual reference from the Yadava period."
        );

      }
    );


    card.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          card.click();

        }

      }
    );

  });


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        if (
          modal &&
          modal.classList.contains("open")
        ) {
          closeModal();
        }

        dropdowns.forEach(
          (dropdown) => {
            dropdown.classList.remove(
              "open"
            );
          }
        );

      }

    }
  );


  /* =======================================================
     SCROLL TOP
     ======================================================= */

  const scrollTopButton =
    $("#btn-scroll-top");


  function updateScrollButton() {

    if (!scrollTopButton) return;

    scrollTopButton.classList.toggle(
      "visible",
      window.scrollY > 500
    );

  }


  window.addEventListener(
    "scroll",
    updateScrollButton,
    {
      passive: true
    }
  );


  updateScrollButton();


  if (scrollTopButton) {

    scrollTopButton.addEventListener(
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
     TIMELINE REVEAL
     ======================================================= */

  const timelineItems =
    $$(".timeline-item");


  if (
    timelineItems.length &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "timeline-visible"
              );

              observerInstance.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );


    timelineItems.forEach(
      (item) =>
        observer.observe(item)
    );

  }


  /* =======================================================
     IMAGE ERROR HANDLING
     ======================================================= */

  $$(
    ".yad-main img"
  ).forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-load-error"
        );

        image.setAttribute(
          "aria-label",
          "Historical image unavailable"
        );

      }
    );

  });


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  $$(
    'a[href^="#"]'
  ).forEach((link) => {

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
          $(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(
          null,
          "",
          targetId
        );

      }
    );

  });


})();
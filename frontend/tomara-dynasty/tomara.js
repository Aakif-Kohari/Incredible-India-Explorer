/* =========================================================
   TOMARA DYNASTY EXPLORER
========================================================= */

"use strict";


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
        navMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });


    navMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("click", () => {

          navMenu.classList.remove("open");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
          );

        });

      });

  }


  /* =======================================================
     THEME TOGGLE
  ======================================================= */

  const themeToggle =
    document.getElementById("theme-toggle");


  function updateThemeButton() {

    if (!themeToggle) return;

    const isLight =
      document.body.classList.contains(
        "light-theme"
      );

    themeToggle.textContent =
      isLight ? "🌙" : "☀️";

    themeToggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark theme"
        : "Switch to light theme"
    );

  }


  updateThemeButton();


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        const isLight =
          document.body.classList.toggle(
            "light-theme"
          );

        localStorage.setItem(
          "theme",
          isLight ? "light" : "dark"
        );

        updateThemeButton();

      }
    );

  }


  /* =======================================================
     SAVE TO JOURNEY
  ======================================================= */

  const bookmarkBtn =
    document.getElementById(
      "bookmark-btn"
    );


  if (bookmarkBtn) {

    const saved =
      localStorage.getItem(
        "tomaraJourneySaved"
      ) === "true";


    function updateBookmark() {

      const isSaved =
        bookmarkBtn.classList.contains(
          "saved"
        );


      bookmarkBtn.textContent =
        isSaved
          ? "♥ Saved to Journey"
          : "♡ Save to Journey";


      bookmarkBtn.setAttribute(
        "aria-pressed",
        String(isSaved)
      );

    }


    if (saved) {
      bookmarkBtn.classList.add("saved");
    }


    updateBookmark();


    bookmarkBtn.addEventListener(
      "click",
      () => {

        const isSaved =
          bookmarkBtn.classList.toggle(
            "saved"
          );


        localStorage.setItem(
          "tomaraJourneySaved",
          String(isSaved)
        );


        updateBookmark();

      }
    );

  }


  /* =======================================================
     RULER SEARCH
  ======================================================= */

  const rulerSearch =
    document.getElementById(
      "ruler-search"
    );

  const rulerCards =
    document.querySelectorAll(
      ".ruler-card"
    );

  const rulerCount =
    document.getElementById(
      "ruler-count"
    );

  const rulerEmpty =
    document.getElementById(
      "ruler-empty"
    );


  function filterRulers() {

    if (!rulerSearch) return;


    const query =
      rulerSearch.value
        .trim()
        .toLowerCase();


    let visibleCount = 0;


    rulerCards.forEach((card) => {

      const name =
        card.dataset.name || "";


      const matches =
        name.includes(query);


      card.style.display =
        matches ? "" : "none";


      if (matches) {
        visibleCount++;
      }

    });


    if (rulerCount) {

      rulerCount.textContent =
        `${visibleCount} ${
          visibleCount === 1
            ? "ruler"
            : "rulers"
        }`;

    }


    if (rulerEmpty) {

      rulerEmpty.hidden =
        visibleCount !== 0;

    }

  }


  if (rulerSearch) {

    rulerSearch.addEventListener(
      "input",
      filterRulers
    );

  }


  /* =======================================================
     GALLERY FILTER
  ======================================================= */

  const galleryFilters =
    document.querySelectorAll(
      ".gallery-filter"
    );

  const galleryCards =
    document.querySelectorAll(
      ".gallery-card"
    );


  galleryFilters.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.filter;


        galleryFilters.forEach(
          (item) => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add("active");


        galleryCards.forEach((card) => {

          const category =
            card.dataset.category;


          const shouldShow =
            selected === "all" ||
            category === selected;


          card.classList.toggle(
            "filtered-out",
            !shouldShow
          );

        });

      }
    );

  });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal-card"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "revealed"
              );


              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "revealed"
        );

      }
    );

  }


  /* =======================================================
     TIMELINE PROGRESS
  ======================================================= */

  const progressBar =
    document.getElementById(
      "timeline-progress-bar"
    );


  function updateTimelineProgress() {

    if (!progressBar) return;


    const timeline =
      document.querySelector(
        ".timeline-wrapper"
      );


    if (!timeline) return;


    const rect =
      timeline.getBoundingClientRect();


    const viewportHeight =
      window.innerHeight;


    const totalHeight =
      timeline.offsetHeight;


    const passed =
      viewportHeight * 0.45 -
      rect.top;


    const percentage =
      Math.max(
        0,
        Math.min(
          100,
          (passed / totalHeight) * 100
        )
      );


    progressBar.style.height =
      `${percentage}%`;

  }


  let ticking = false;


  function requestTimelineUpdate() {

    if (ticking) return;


    ticking = true;


    window.requestAnimationFrame(
      () => {

        updateTimelineProgress();

        ticking = false;

      }
    );

  }


  window.addEventListener(
    "scroll",
    requestTimelineUpdate,
    {
      passive: true
    }
  );


  updateTimelineProgress();


  /* =======================================================
     IMAGE FALLBACK
     Does not break the card layout
  ======================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-error"
        );


        image.removeAttribute(
          "src"
        );


        image.setAttribute(
          "alt",
          "Historical image unavailable"
        );

      },
      {
        once: true
      }
    );

  });


  /* =======================================================
     SCROLL TO TOP
  ======================================================= */

  const scrollTop =
    document.getElementById(
      "scroll-top"
    );


  function updateScrollButton() {

    if (!scrollTop) return;


    scrollTop.classList.toggle(
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
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".tomara-navbar .nav-link"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            const id =
              entry.target.id;


            navLinks.forEach((link) => {

              const href =
                link.getAttribute("href");


              link.classList.toggle(
                "active",
                href === `#${id}`
              );

            });

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach((section) => {

      sectionObserver.observe(
        section
      );

    });

  }


  /* =======================================================
     KEYBOARD ESCAPE
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        navMenu &&
        menuToggle
      ) {

        navMenu.classList.remove(
          "open"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


});
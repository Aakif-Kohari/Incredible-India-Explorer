/* =========================================================
   KUNCHIKAL FALLS EXPLORER
   Complete Page JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================= */

  const body = document.body;

  const navbar = document.getElementById("navbar");

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  const themeToggle = document.getElementById("theme-toggle");

  const bookmarkBtn = document.getElementById("bookmark-btn");

  const heightSlider = document.getElementById("height-slider");
  const heightValue = document.getElementById("height-value");
  const heightFill = document.getElementById("height-fill");

  const comparisonPerson =
    document.getElementById("comparison-person");

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

  const flowLevel =
    document.getElementById("flow-level");

  const landscapeLevel =
    document.getElementById("landscape-level");

  const atmosphereLevel =
    document.getElementById("atmosphere-level");

  const scrollTopBtn =
    document.getElementById("btn-scroll-top");


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        navMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });
  }


  /* =======================================================
     DROPDOWN MENUS
  ======================================================= */

  const dropdownToggles =
    document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const parent =
        toggle.closest(".nav-dropdown");

      if (!parent) return;

      const isOpen =
        parent.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document
        .querySelectorAll(".nav-dropdown")
        .forEach((other) => {
          if (other !== parent) {
            other.classList.remove("open");

            const otherToggle =
              other.querySelector(".dropdown-toggle");

            if (otherToggle) {
              otherToggle.setAttribute(
                "aria-expanded",
                "false"
              );
            }
          }
        });
    });
  });


  /* =======================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
  ======================================================= */

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".nav-dropdown")
    ) {
      document
        .querySelectorAll(".nav-dropdown")
        .forEach((dropdown) => {
          dropdown.classList.remove("open");

          const toggle =
            dropdown.querySelector(".dropdown-toggle");

          if (toggle) {
            toggle.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        });
    }

    if (
      navMenu &&
      menuToggle &&
      !event.target.closest(".nav-menu") &&
      !event.target.closest(".menu-toggle")
    ) {
      navMenu.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  });


  /* =======================================================
     CLOSE MOBILE MENU AFTER LINK CLICK
  ======================================================= */

  document
    .querySelectorAll(".nav-menu a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu) {
          navMenu.classList.remove("open");
        }

        if (menuToggle) {
          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });
    });


  /* =======================================================
     THEME TOGGLE
  ======================================================= */

  function updateThemeIcon() {
    if (!themeToggle) return;

    if (body.classList.contains("light-theme")) {
      themeToggle.textContent = "🌙";
      themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );
    } else {
      themeToggle.textContent = "☀️";
      themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
      );
    }
  }

  if (themeToggle) {
    updateThemeIcon();

    themeToggle.addEventListener("click", () => {
      const isLight =
        body.classList.toggle("light-theme");

      localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
      );

      updateThemeIcon();
    });
  }


  /* =======================================================
     BOOKMARK / SAVE TO JOURNEY
  ======================================================= */

  const BOOKMARK_KEY =
    "kunchikal-falls-saved";

  function updateBookmarkUI(saved) {
    if (!bookmarkBtn) return;

    bookmarkBtn.classList.toggle(
      "saved",
      saved
    );

    bookmarkBtn.setAttribute(
      "aria-pressed",
      String(saved)
    );

    bookmarkBtn.innerHTML = saved
      ? "♥ Saved to Journey"
      : "♡ Save to Journey";
  }

  if (bookmarkBtn) {
    const saved =
      localStorage.getItem(BOOKMARK_KEY) === "true";

    updateBookmarkUI(saved);

    bookmarkBtn.addEventListener("click", () => {
      const currentlySaved =
        localStorage.getItem(BOOKMARK_KEY) === "true";

      const newState = !currentlySaved;

      localStorage.setItem(
        BOOKMARK_KEY,
        String(newState)
      );

      updateBookmarkUI(newState);

      if (newState) {
        showToast("Kunchikal Falls saved to your journey.");
      } else {
        showToast("Kunchikal Falls removed from your journey.");
      }
    });
  }


  /* =======================================================
     HEIGHT SLIDER
  ======================================================= */

  function updateHeight(value) {
    const numericValue = Number(value);

    if (heightValue) {
      heightValue.textContent =
        `${numericValue} m`;
    }

    if (heightFill) {
      const percentage =
        (numericValue / 500) * 100;

      heightFill.style.height =
        `${percentage}%`;
    }

    const marker =
      document.querySelector(".height-marker");

    if (marker) {
      const percentage =
        (numericValue / 500) * 100;

      marker.style.bottom =
        `${percentage}%`;
    }

    /*
      Scale the comparison person slightly
      according to selected waterfall height.
    */

    if (comparisonPerson) {
      const scale =
        Math.max(
          0.75,
          Math.min(
            1.8,
            numericValue / 455
          )
        );

      comparisonPerson.style.transform =
        `scaleY(${scale})`;
    }
  }

  if (heightSlider) {
    updateHeight(heightSlider.value);

    heightSlider.addEventListener(
      "input",
      () => {
        updateHeight(heightSlider.value);
      }
    );
  }


  /* =======================================================
     SEASON DATA
  ======================================================= */

  const seasons = {
    monsoon: {
      image:
        "../assets/images/kunchikal-monsson.jpg",

      badge:
        "MONSOON",

      label:
        "JUNE — SEPTEMBER",

      title:
        "Peak water season",

      description:
        "Southwest monsoon rainfall transforms the Western Ghats into a saturated green landscape. Water flow is generally at its strongest during and around the monsoon period.",

      flow:
        "Very High",

      landscape:
        "Lush Green",

      atmosphere:
        "Misty"
    },

    postmonsoon: {
      image:
        "../assets/images/kunchikal-postmonsson.jpg",

      badge:
        "POST-MONSOON",

      label:
        "OCTOBER — NOVEMBER",

      title:
        "A calmer cascade",

      description:
        "After the southwest monsoon retreats, rainfall decreases and the surrounding landscape begins to transition. Streams can remain active while the forest retains much of its green character.",

      flow:
        "High",

      landscape:
        "Green",

      atmosphere:
        "Clearer"
    },

    summer: {
      image:
        "../assets/images/kunchikal-summer.jpg",

      badge:
        "SUMMER",

      label:
        "MARCH — MAY",

      title:
        "A quieter landscape",

      description:
        "The dry season brings lower rainfall and reduced runoff. The waterfall landscape can appear significantly quieter compared with the monsoon months.",

      flow:
        "Lower",

      landscape:
        "Drier",

      atmosphere:
        "Warm"
    }
  };


  /* =======================================================
     SEASON TAB FUNCTION
  ======================================================= */

  function changeSeason(seasonName) {
    const season =
      seasons[seasonName];

    if (!season) return;

    /*
      Small fade effect before changing image.
    */

    if (seasonImage) {
      seasonImage.style.opacity = "0";

      setTimeout(() => {
        seasonImage.src =
          season.image;

        seasonImage.alt =
          `Kunchikal Falls during the ${seasonName} season`;

        seasonImage.style.opacity = "1";
      }, 180);
    }

    if (seasonBadge) {
      seasonBadge.textContent =
        season.badge;
    }

    if (seasonLabel) {
      seasonLabel.textContent =
        season.label;
    }

    if (seasonTitle) {
      seasonTitle.textContent =
        season.title;
    }

    if (seasonDescription) {
      seasonDescription.textContent =
        season.description;
    }

    if (flowLevel) {
      flowLevel.textContent =
        season.flow;
    }

    if (landscapeLevel) {
      landscapeLevel.textContent =
        season.landscape;
    }

    if (atmosphereLevel) {
      atmosphereLevel.textContent =
        season.atmosphere;
    }

    document
      .querySelectorAll(".season-tab")
      .forEach((tab) => {
        tab.classList.toggle(
          "active",
          tab.dataset.season === seasonName
        );
      });
  }


  document
    .querySelectorAll(".season-tab")
    .forEach((tab) => {
      tab.addEventListener("click", () => {
        changeSeason(
          tab.dataset.season
        );
      });
    });


  /* =======================================================
     KEYBOARD ACCESSIBILITY FOR SEASON TABS
  ======================================================= */

  document
    .querySelectorAll(".season-tab")
    .forEach((tab, index, tabs) => {
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;

        if (event.key === "ArrowRight") {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (event.key === "ArrowLeft") {
          nextIndex =
            (index - 1 + tabs.length) %
            tabs.length;
        }

        if (nextIndex !== null) {
          event.preventDefault();

          tabs[nextIndex].focus();

          tabs[nextIndex].click();
        }
      });
    });


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
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

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });


  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
  );

  handleNavbarScroll();


  /* =======================================================
     SCROLL TO TOP
  ======================================================= */

  function handleScrollTopButton() {
    if (!scrollTopBtn) return;

    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  window.addEventListener(
    "scroll",
    handleScrollTopButton,
    { passive: true }
  );

  handleScrollTopButton();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener(
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
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".kun-section-heading, " +
      ".height-visual-card, " +
      ".comparison-card, " +
      ".flow-node, " +
      ".season-explorer, " +
      ".landscape-grid, " +
      ".valley-layout, " +
      ".location-grid, " +
      ".attraction-card, " +
      ".gallery-item, " +
      ".reference-box"
    );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer =
      new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");

              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }


  /* =======================================================
     IMAGE ERROR HANDLING
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((img) => {
      img.addEventListener("error", () => {
        img.style.background =
          "linear-gradient(135deg, #18372b, #07130f)";

        img.style.objectFit =
          "contain";

        console.warn(
          `Image could not be loaded: ${img.src}`
        );
      });
    });


  /* =======================================================
     TOAST MESSAGE
  ======================================================= */

  function showToast(message) {
    let toast =
      document.getElementById(
        "kun-toast"
      );

    if (!toast) {
      toast =
        document.createElement("div");

      toast.id =
        "kun-toast";

      Object.assign(
        toast.style,
        {
          position: "fixed",
          left: "50%",
          bottom: "30px",
          zIndex: "3000",
          transform:
            "translate(-50%, 20px)",
          padding:
            "13px 20px",
          borderRadius:
            "999px",
          background:
            "#d9ad52",
          color:
            "#182019",
          fontFamily:
            "DM Sans, sans-serif",
          fontSize:
            "0.82rem",
          fontWeight:
            "700",
          boxShadow:
            "0 15px 40px rgba(0,0,0,.3)",
          opacity: "0",
          transition:
            "all .3s ease",
          pointerEvents:
            "none"
        }
      );

      document.body.appendChild(toast);
    }

    toast.textContent =
      message;

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform =
        "translate(-50%, 0)";
    });

    clearTimeout(
      toast._timer
    );

    toast._timer =
      setTimeout(() => {
        toast.style.opacity = "0";

        toast.style.transform =
          "translate(-50%, 20px)";
      }, 2500);
  }


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroImage =
    document.querySelector(
      ".hero-image-layer"
    );

  if (
    heroImage &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    window.addEventListener(
      "scroll",
      () => {
        const scroll =
          window.scrollY;

        if (scroll < window.innerHeight) {
          heroImage.style.transform =
            `scale(1.06) translateY(${scroll * 0.12}px)`;
        }
      },
      { passive: true }
    );
  }


  /* =======================================================
     ACTIVE SECTION NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      ".kunchikal-main section[id]"
    );

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          /*
            Highlight any same-page navigation
            link that points to this section.
          */

          document
            .querySelectorAll(
              `.nav-menu a[href="#${entry.target.id}"]`
            )
            .forEach((link) => {
              document
                .querySelectorAll(
                  ".nav-menu a"
                )
                .forEach((item) => {
                  item.classList.remove(
                    "active"
                  );
                });

              link.classList.add(
                "active"
              );
            });
        });
      },
      {
        threshold: 0.35
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  if (heightSlider) {
    updateHeight(
      heightSlider.value
    );
  }

  updateThemeIcon();

  console.log(
    "Kunchikal Falls Explorer initialized successfully."
  );
});
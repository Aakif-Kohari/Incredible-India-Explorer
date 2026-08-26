/* =========================================================
   GAHADAVALA DYNASTY EXPLORER
   Card-based interactions only
========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
      });
    }


    /* =====================================================
       DROPDOWN MENU
    ===================================================== */

    const dropdownButtons =
      document.querySelectorAll(".dropdown-toggle");

    dropdownButtons.forEach(function (button) {

      button.addEventListener("click", function (event) {

        event.preventDefault();

        const parent = button.closest(".nav-dropdown");

        if (!parent) return;

        const isOpen =
          parent.classList.contains("open");

        document
          .querySelectorAll(".nav-dropdown")
          .forEach(function (dropdown) {
            dropdown.classList.remove("open");

            const dropdownButton =
              dropdown.querySelector(".dropdown-toggle");

            if (dropdownButton) {
              dropdownButton.setAttribute(
                "aria-expanded",
                "false"
              );
            }
          });

        if (!isOpen) {
          parent.classList.add("open");

          button.setAttribute(
            "aria-expanded",
            "true"
          );
        }
      });
    });


    /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

      if (!event.target.closest(".nav-dropdown")) {

        document
          .querySelectorAll(".nav-dropdown")
          .forEach(function (dropdown) {

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
      }

    });


    /* =====================================================
       TIMELINE REVEAL
    ===================================================== */

    const timelineItems =
      document.querySelectorAll(".timeline-item");

    if ("IntersectionObserver" in window) {

      const timelineObserver =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "timeline-visible"
                );

                timelineObserver.unobserve(
                  entry.target
                );
              }

            });

          },
          {
            threshold: 0.15
          }
        );

      timelineItems.forEach(function (item) {
        timelineObserver.observe(item);
      });

    } else {

      timelineItems.forEach(function (item) {
        item.classList.add("timeline-visible");
      });

    }


    /* =====================================================
       CARD SCROLL REVEAL
    ===================================================== */

    const cards = document.querySelectorAll(
      ".governance-card, " +
      ".ruler-card, " +
      ".legacy-grid article, " +
      ".gallery-card"
    );

    if ("IntersectionObserver" in window) {

      const cardObserver =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "revealed"
                );

                cardObserver.unobserve(
                  entry.target
                );
              }

            });

          },
          {
            threshold: 0.12
          }
        );

      cards.forEach(function (card) {
        cardObserver.observe(card);
      });

    } else {

      cards.forEach(function (card) {
        card.classList.add("revealed");
      });

    }


    /* =====================================================
       IMAGE ERROR HANDLING
       Prevent broken layout if an image is missing
    ===================================================== */

    const images =
      document.querySelectorAll("img");

    images.forEach(function (image) {

      image.addEventListener("error", function () {

        console.warn(
          "Image not found:",
          image.getAttribute("src")
        );

        image.classList.add("image-error");

      });

    });


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    const scrollTop =
      document.getElementById("btn-scroll-top");

    if (scrollTop) {

      window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {
          scrollTop.classList.add("visible");
        } else {
          scrollTop.classList.remove("visible");
        }

      });

      scrollTop.addEventListener("click", function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      });

    }


    /* =====================================================
       ACTIVE SECTION
    ===================================================== */

    const sections =
      document.querySelectorAll(".gah-section[id]");

    if ("IntersectionObserver" in window) {

      const sectionObserver =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                const id = entry.target.id;

                if (history.replaceState) {

                  history.replaceState(
                    null,
                    "",
                    "#" + id
                  );

                }

              }

            });

          },
          {
            threshold: 0.3
          }
        );

      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });

    }


    /* =====================================================
       IMAGE LOADING CHECK
    ===================================================== */

    images.forEach(function (image) {

      if (image.complete && image.naturalWidth > 0) {
        image.classList.add("image-loaded");
      }

      image.addEventListener("load", function () {
        image.classList.add("image-loaded");
      });

    });

  });

})();
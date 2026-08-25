/* =========================================================
   KAMARUPA DYNASTY EXPLORER
   Page-specific interactions
   ========================================================= */

(function () {
  "use strict";


  /* =======================================================
     MODAL
     ======================================================= */

  const modal = document.getElementById("kam-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDescription = document.getElementById("modal-description");

  let lastFocusedElement = null;


  function openModal(category, title, description, trigger) {

    if (!modal) return;

    modalCategory.textContent =
      category || "Kamarupa";

    modalTitle.textContent =
      title || "";

    modalDescription.textContent =
      description || "";

    lastFocusedElement =
      trigger || document.activeElement;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

    if (modalClose) {
      modalClose.focus();
    }
  }


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

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
      function (event) {

        if (event.target === modal) {
          closeModal();
        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
      ) {
        closeModal();
      }

    }
  );


  /* =======================================================
     TIMELINE RULER MODALS
     ======================================================= */

  document
    .querySelectorAll(".timeline-more")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          openModal(
            button.getAttribute(
              "data-category"
            ),
            button.getAttribute(
              "data-title"
            ),
            button.getAttribute(
              "data-description"
            ),
            button
          );

        }
      );

    });


  /* =======================================================
     RULER PROFILE MODALS
     ======================================================= */

  document
    .querySelectorAll(".ruler-btn")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          openModal(
            button.getAttribute(
              "data-category"
            ),
            button.getAttribute(
              "data-title"
            ),
            button.getAttribute(
              "data-description"
            ),
            button
          );

        }
      );

    });


  /* =======================================================
     GALLERY MODALS
     ======================================================= */

  document
    .querySelectorAll(".kam-gallery-item")
    .forEach(function (item) {

      item.addEventListener(
        "click",
        function () {

          openModal(
            "Visual Archive",
            item.getAttribute(
              "data-title"
            ),
            item.getAttribute(
              "data-description"
            ),
            item
          );

        }
      );

    });


  /* =======================================================
     TIMELINE FILTER
     ======================================================= */

  const timelineFilters =
    document.querySelectorAll(
      ".timeline-filter"
    );

  const timelineItems =
    document.querySelectorAll(
      ".timeline-item"
    );


  timelineFilters.forEach(
    function (filterButton) {

      filterButton.addEventListener(
        "click",
        function () {

          timelineFilters.forEach(
            function (button) {
              button.classList.remove(
                "active"
              );
            }
          );

          filterButton.classList.add(
            "active"
          );

          const selectedFilter =
            filterButton.getAttribute(
              "data-filter"
            );


          timelineItems.forEach(
            function (item) {

              const itemEra =
                item.getAttribute(
                  "data-era"
                );

              if (
                selectedFilter === "all" ||
                itemEra === selectedFilter
              ) {

                item.style.display = "";

                requestAnimationFrame(
                  function () {
                    item.style.opacity = "1";
                  }
                );

              } else {

                item.style.opacity = "0";

                setTimeout(
                  function () {

                    if (
                      item.style.opacity === "0"
                    ) {
                      item.style.display =
                        "none";
                    }

                  },
                  250
                );

              }

            }
          );

        }
      );

    }
  );


  /* =======================================================
     CULTURE TABS
     ======================================================= */

  const cultureTabs =
    document.querySelectorAll(
      ".culture-tab"
    );

  const cultureContents =
    document.querySelectorAll(
      ".culture-content"
    );


  cultureTabs.forEach(
    function (tab) {

      tab.addEventListener(
        "click",
        function () {

          const target =
            tab.getAttribute(
              "data-culture"
            );


          cultureTabs.forEach(
            function (button) {

              button.classList.remove(
                "active"
              );

            }
          );


          cultureContents.forEach(
            function (content) {

              content.classList.remove(
                "active"
              );

            }
          );


          tab.classList.add(
            "active"
          );


          const targetContent =
            document.querySelector(
              '[data-content="' +
              target +
              '"]'
            );


          if (targetContent) {
            targetContent.classList.add(
              "active"
            );
          }

        }
      );

    }
  );


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      function (element) {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      function (element) {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =======================================================
     BOOKMARK
     ======================================================= */

  const bookmarkButton =
    document.getElementById(
      "bookmark-btn"
    );


  if (bookmarkButton) {

    const bookmarkKey =
      "kamarupa-explorer-saved";


    const updateBookmark =
      function () {

        const saved =
          localStorage.getItem(
            bookmarkKey
          ) === "true";


        bookmarkButton.innerHTML =
          saved
            ? "♥ Saved to Journey"
            : "♡ Save Explorer";


        bookmarkButton.setAttribute(
          "aria-pressed",
          String(saved)
        );

      };


    updateBookmark();


    bookmarkButton.addEventListener(
      "click",
      function () {

        const currentlySaved =
          localStorage.getItem(
            bookmarkKey
          ) === "true";


        localStorage.setItem(
          bookmarkKey,
          String(!currentlySaved)
        );


        updateBookmark();

      }
    );

  }


  /* =======================================================
     SMOOTH INTERNAL NAVIGATION
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const targetId =
            link.getAttribute(
              "href"
            );


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


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     ACTIVE SECTION INDICATOR
     ======================================================= */

  const sections =
    document.querySelectorAll(
      ".kam-section[id]"
    );


  const updateActiveSection =
    function () {

      let currentSection = "";


      sections.forEach(
        function (section) {

          const sectionTop =
            section.offsetTop - 180;


          if (
            window.scrollY >=
            sectionTop
          ) {

            currentSection =
              section.id;

          }

        }
      );


      document
        .querySelectorAll(
          'a[href^="#"]'
        )
        .forEach(
          function (link) {

            link.classList.remove(
              "section-active"
            );


            if (
              link.getAttribute(
                "href"
              ) === "#" +
              currentSection
            ) {

              link.classList.add(
                "section-active"
              );

            }

          }
        );

    };


  window.addEventListener(
    "scroll",
    updateActiveSection,
    {
      passive: true
    }
  );


  updateActiveSection();


  /* =======================================================
     IMAGE FALLBACK
     ======================================================= */

  document
    .querySelectorAll(
      "img"
    )
    .forEach(function (image) {

      image.addEventListener(
        "error",
        function () {

          image.classList.add(
            "image-missing"
          );

          image.alt =
            image.alt ||
            "Kamarupa historical image";

        }
      );

    });


})();
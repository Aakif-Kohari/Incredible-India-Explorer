document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".begum-gallery-item")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("begum-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "begum-welcome-toast";
    toast.className = "begum-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>👑 Begum Hazrat Mahal</strong> — c. 1820 – 7 Apr 1879. The Rebel Begum of Awadh who led the Revolt of 1857 and never surrendered.";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3200);
  }

  showWelcomeToast();

  // --- Hero parallax -------------------------------------------------
  function initParallax() {
    const hero = document.querySelector(".begum-hero");
    const backdrop = document.querySelector(".begum-hero-backdrop");
    if (!hero || !backdrop || prefersReducedMotion) return;

    const applyParallax = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = window.scrollY;
      const maxShift = 90;
      const shift = Math.min(Math.max(offset * 0.3, 0), maxShift);
      backdrop.style.transform = `translateY(${shift}px) scale(1.12)`;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        applyParallax();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    applyParallax();
  }

  initParallax();

  // --- Scroll-reveal -------------------------------------------------
  let revealObserver = null;

  function initReveal() {
    const revealEls = [...document.querySelectorAll(".reveal")];

    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  initReveal();

  // --- Sticky section nav active state --------------------------------
  let navObserver = null;

  function initSectionNav() {
    const nav = document.getElementById("begum-section-nav");
    const navLinks = [...document.querySelectorAll(".begum-section-nav-link")];
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!nav || !sections.length) return;

    if (navObserver) navObserver.disconnect();

    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.navTarget === id);
      });
    };

    navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
  }

  initSectionNav();

  // --- Gallery Lightbox ------------------------------------------------
  const lightbox = document.getElementById("begum-lightbox");
  const lightboxImg = document.getElementById("begum-lightbox-img");
  const lightboxCaption = document.getElementById("begum-lightbox-caption");
  const lightboxClose = document.getElementById("begum-lightbox-close");
  const lightboxPrev = document.getElementById("begum-lightbox-prev");
  const lightboxNext = document.getElementById("begum-lightbox-next");

  let currentIndex = 0;
  let lastFocusedElement = null;

  function getFocusableItems() {
    return galleryItems.filter((item) => item.dataset && item.dataset.title);
  }

  function updateLightbox(index) {
    const items = getFocusableItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;

    const item = items[currentIndex];
    const img = item.querySelector("img");
    const captionTitle = item.dataset.title || "";
    const captionDesc = item.querySelector("p")?.textContent || "";

    lightboxImg.src = img ? img.src : "";
    lightboxImg.alt = img ? img.alt : "";
    lightboxCaption.textContent = captionDesc ? `${captionTitle} — ${captionDesc}` : captionTitle;
  }

  function openLightbox(item) {
    if (!lightbox) return;

    const items = getFocusableItems();
    currentIndex = items.indexOf(item);
    lastFocusedElement = item;

    updateLightbox(currentIndex);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("begum-modal-open");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("begum-modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", () => openLightbox(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target.matches("[data-lightbox-close]")) closeLightbox();
    });

    // Trap focus within the lightbox and support keyboard navigation.
    lightbox.addEventListener("keydown", (e) => {
      const focusables = [lightboxClose, lightboxPrev, lightboxNext].filter(Boolean);

      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        updateLightbox(currentIndex - 1);
        if (lightboxPrev) lightboxPrev.focus();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        updateLightbox(currentIndex + 1);
        if (lightboxNext) lightboxNext.focus();
        return;
      }

      if (e.key === "Tab" && focusables.length > 1) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Begum Hazrat Mahal Explorer";
      const thumbnail = "https://placehold.co/100/160b0f/d4a648?text=Begum";
      const category = "history";

      const updateBookmarkUI = () => {
        const isSaved = window.Journey.isSaved(id);
        btn.classList.toggle("is-saved", isSaved);
        btn.setAttribute("aria-pressed", String(isSaved));
        btn.innerHTML = isSaved ? "♥ Saved to Journey" : "♡ Save to Journey";
      };

      updateBookmarkUI();

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id,
          explorerPage: "frontend/begum-hazrat-mahal-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/begum-hazrat-mahal-explorer/index.html",
      [
        {
          id: "begum-hazrat-mahal-main",
          title: "Begum Hazrat Mahal Explorer",
          description: "Explore Begum Hazrat Mahal (c. 1820–1879): the Begum of Awadh who rose from the zenana to lead the Revolt of 1857 in Lucknow, crown her son Birjis Qadr, besiege the British Residency and never surrender to the Raj.",
          link: "frontend/begum-hazrat-mahal-explorer/index.html"
        },
        {
          id: "begum-hazrat-mahal-biography",
          title: "Biography of Begum Hazrat Mahal",
          description: "From her birth as Muhammadi Khanum at Faizabad, her rise through the royal harem of Nawab Wajid Ali Shah, the annexation of Awadh in 1856, and her emergence as regent for her son Birjis Qadr during the Revolt of 1857.",
          link: "frontend/begum-hazrat-mahal-explorer/index.html#biography"
        },
        {
          id: "begum-hazrat-mahal-timeline",
          title: "Begum Hazrat Mahal Timeline",
          description: "From her birth c. 1820 and the annexation of Awadh in 1856, to the seizure of Lucknow on 30 May 1857, the crowning of Birjis Qadr, the siege of the Residency, the fall of Lucknow in March 1858, her rebuttal to Victoria's proclamation, exile in Nepal and death in 1879.",
          link: "frontend/begum-hazrat-mahal-explorer/index.html#timeline"
        },
        {
          id: "begum-hazrat-mahal-revolt",
          title: "The Revolt of 1857 in Awadh",
          description: "Why Awadh rose: the annexation of 1856, the exiled Nawab, the greased-cartridge mutiny, and how Begum Hazrat Mahal gave the rebellion a sovereign, a government and a fighting queen.",
          link: "frontend/begum-hazrat-mahal-explorer/index.html#revolt"
        },
        {
          id: "begum-hazrat-mahal-leadership",
          title: "Military Leadership of Begum Hazrat Mahal",
          description: "How the Rebel Begum commanded armies: the defence of Lucknow, the assaults on the Alambagh, her alliance with Nana Sahib and Maulvi Ahmadullah Shah, the guerrilla campaign after 1858, and her refusal to surrender for a pension of one lakh rupees.",
          link: "frontend/begum-hazrat-mahal-explorer/index.html#leadership"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});

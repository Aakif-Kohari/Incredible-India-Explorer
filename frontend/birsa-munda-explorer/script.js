document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".birsa-gallery-item")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("birsa-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "birsa-welcome-toast";
    toast.className = "birsa-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🪶 Birsa Munda</strong> — 15 Nov 1875 – 9 Jun 1900. The Dharti Aba whose Ulgulan shook the British Empire.";
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
    const hero = document.querySelector(".birsa-hero");
    const backdrop = document.querySelector(".birsa-hero-backdrop");
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
    const nav = document.getElementById("birsa-section-nav");
    const navLinks = [...document.querySelectorAll(".birsa-section-nav-link")];
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
  const lightbox = document.getElementById("birsa-lightbox");
  const lightboxImg = document.getElementById("birsa-lightbox-img");
  const lightboxCaption = document.getElementById("birsa-lightbox-caption");
  const lightboxClose = document.getElementById("birsa-lightbox-close");
  const lightboxPrev = document.getElementById("birsa-lightbox-prev");
  const lightboxNext = document.getElementById("birsa-lightbox-next");

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
    document.body.classList.add("birsa-modal-open");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("birsa-modal-open");

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
      const title = "Birsa Munda Explorer";
      const thumbnail = "https://placehold.co/100/141009/d9a441?text=Birsa";
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
          explorerPage: "frontend/birsa-munda-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/birsa-munda-explorer/index.html",
      [
        {
          id: "birsa-munda-main",
          title: "Birsa Munda Explorer",
          description: "Explore Birsa Munda (1875–1900): the Munda tribal leader whose Ulgulan (Great Tumult) rose against colonial landlords, missionaries and the Raj, and became a folk hero of India's freedom struggle.",
          link: "frontend/birsa-munda-explorer/index.html"
        },
        {
          id: "birsa-munda-biography",
          title: "Biography of Birsa Munda",
          description: "From his birth at Ulihatu, Khunti in 1875, schooling at the German Mission School in Chaibasa, and his vision of 1894–95, to the preacher of the sarna sacred grove and the Birsait faith.",
          link: "frontend/birsa-munda-explorer/index.html#biography"
        },
        {
          id: "birsa-munda-timeline",
          title: "Birsa Munda Timeline",
          description: "From his birth in 1875 and first arrest in 1895 to the start of the Ulgulan in December 1899, the attack on the Khunti police station in January 1900, his capture at Jamkopai on 3 February 1900, and his death in Ranchi Jail on 9 June 1900.",
          link: "frontend/birsa-munda-explorer/index.html#timeline"
        },
        {
          id: "birsa-munda-movement",
          title: "The Ulgulan: Birsa Munda's Tribal Resistance",
          description: "Why the Mundas rose: the loss of khuntkatti land, the diku landlords and moneylenders, forced labour (beth begari), and Birsa's fusion of agrarian revolt, religious revival and guerrilla resistance.",
          link: "frontend/birsa-munda-explorer/index.html#movement"
        },
        {
          id: "birsa-munda-legacy",
          title: "Legacy of Birsa Munda",
          description: "How the Dharti Aba's memory lived on: the Chotanagpur Tenancy Act (1908), the 1988 commemorative stamp, the creation of Jharkhand on 15 November 2000, and Janjatiya Gaurav Divas since 2021.",
          link: "frontend/birsa-munda-explorer/index.html#legacy"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});

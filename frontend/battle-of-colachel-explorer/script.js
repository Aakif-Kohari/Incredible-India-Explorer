document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".colachel-gallery-item")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("colachel-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "colachel-welcome-toast";
    toast.className = "colachel-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>⚔️ Battle of Colachel</strong> — 10 March 1741. The day Travancore ended Dutch ambition in India.";
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
    const hero = document.querySelector(".colachel-hero");
    const backdrop = document.querySelector(".colachel-hero-backdrop");
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
    const nav = document.getElementById("colachel-section-nav");
    const navLinks = [...document.querySelectorAll(".colachel-section-nav-link")];
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
  const lightbox = document.getElementById("colachel-lightbox");
  const lightboxImg = document.getElementById("colachel-lightbox-img");
  const lightboxCaption = document.getElementById("colachel-lightbox-caption");
  const lightboxClose = document.getElementById("colachel-lightbox-close");
  const lightboxPrev = document.getElementById("colachel-lightbox-prev");
  const lightboxNext = document.getElementById("colachel-lightbox-next");

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
    document.body.classList.add("colachel-modal-open");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("colachel-modal-open");

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
      const title = "Battle of Colachel Explorer";
      const thumbnail = "frontend/assets/colachel_battle_painting.jpg";
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
          explorerPage: "frontend/battle-of-colachel-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/battle-of-colachel-explorer/index.html",
      [
        {
          id: "battle-of-colachel-main",
          title: "Battle of Colachel Explorer",
          description: "Explore the Battle of Colachel (10 March 1741): Maharaja Marthanda Varma's Travancore forces defeated the Dutch East India Company, ending Dutch colonial ambition in India.",
          link: "frontend/battle-of-colachel-explorer/index.html"
        },
        {
          id: "battle-of-colachel-belligerents",
          title: "Belligerents of Colachel",
          description: "Compare the two forces on the beach: Maharaja Marthanda Varma's Travancore army against Captain Jan Plaisier's Dutch East India Company expedition, and the captured captain Eustachius De Lannoy.",
          link: "frontend/battle-of-colachel-explorer/index.html#belligerents"
        },
        {
          id: "battle-of-colachel-strategy",
          title: "Military Strategy at Colachel",
          description: "How Marthanda Varma's prepared fortifications, rocket-and-cannon batteries, and disciplined infantry squares broke the Dutch column on the beach.",
          link: "frontend/battle-of-colachel-explorer/index.html#strategy"
        },
        {
          id: "battle-of-colachel-outcome",
          title: "Outcome of the Battle of Colachel",
          description: "A decisive Travancore victory that broke the Dutch column, captured their commander Jan Plaisier, and forced the Company to abandon its Malabar coast factories.",
          link: "frontend/battle-of-colachel-explorer/index.html#outcome"
        },
        {
          id: "battle-of-colachel-significance",
          title: "Significance of the Battle of Colachel",
          description: "The battle ended Dutch East India Company ambitions in India, secured Travancore's rise as a great power, modernised its army, and is remembered today at the Colachel Victory Pillar.",
          link: "frontend/battle-of-colachel-explorer/index.html#significance"
        },
        {
          id: "battle-of-colachel-timeline",
          title: "Battle of Colachel Timeline",
          description: "From Marthanda Varma's rise (1729) and the Dutch expedition (1740) to the battle on 10 March 1741, the surrender of the Dutch officers, and De Lannoy's long service to Travancore (d. 1777).",
          link: "frontend/battle-of-colachel-explorer/index.html#timeline"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});

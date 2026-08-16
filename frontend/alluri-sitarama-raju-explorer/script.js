document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".alluri-gallery-item")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("alluri-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "alluri-welcome-toast";
    toast.className = "alluri-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🏹 Alluri Sitarama Raju</strong> — 4 Jul 1897 – 7 May 1924. The Manyam Veerudu whose Rampa Rebellion shook the British Empire.";
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
    const hero = document.querySelector(".alluri-hero");
    const backdrop = document.querySelector(".alluri-hero-backdrop");
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
    const nav = document.getElementById("alluri-section-nav");
    const navLinks = [...document.querySelectorAll(".alluri-section-nav-link")];
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
  const lightbox = document.getElementById("alluri-lightbox");
  const lightboxImg = document.getElementById("alluri-lightbox-img");
  const lightboxCaption = document.getElementById("alluri-lightbox-caption");
  const lightboxClose = document.getElementById("alluri-lightbox-close");
  const lightboxPrev = document.getElementById("alluri-lightbox-prev");
  const lightboxNext = document.getElementById("alluri-lightbox-next");

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
    document.body.classList.add("alluri-modal-open");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("alluri-modal-open");

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
      const title = "Alluri Sitarama Raju Explorer";
      const thumbnail = "https://placehold.co/100/0e1412/e8892f?text=Alluri";
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
          explorerPage: "frontend/alluri-sitarama-raju-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/alluri-sitarama-raju-explorer/index.html",
      [
        {
          id: "alluri-sitarama-raju-main",
          title: "Alluri Sitarama Raju Explorer",
          description: "Explore Alluri Sitarama Raju (1897–1924): the Manyam Veerudu (Hero of the Jungle) who led the Rampa Rebellion of 1922–24 against colonial forest laws, championing the tribal people of the Eastern Ghats.",
          link: "frontend/alluri-sitarama-raju-explorer/index.html"
        },
        {
          id: "alluri-sitarama-raju-biography",
          title: "Biography of Alluri Sitarama Raju",
          description: "From his birth at Pandrangi, Visakhapatnam in 1897, his sanyasa at eighteen, and his years among the adivasis of the Godavari and Visakhapatnam Agencies, to the leader the tribals came to call the Hero of the Jungle.",
          link: "frontend/alluri-sitarama-raju-explorer/index.html#biography"
        },
        {
          id: "alluri-sitarama-raju-timeline",
          title: "Alluri Sitarama Raju Timeline",
          description: "From his birth in 1897, the Non-Cooperation spark of 1921, the raid on Chintapalli on 22 August 1922 that began the rebellion, the death of officers Scott and Heiter in September 1922, the bounty on his head, and his execution at Koyyuru on 7 May 1924.",
          link: "frontend/alluri-sitarama-raju-explorer/index.html#timeline"
        },
        {
          id: "alluri-sitarama-raju-rebellion",
          title: "The Rampa Rebellion: Alluri Sitarama Raju's Tribal War",
          description: "Why the adivasis rose: the 1882 Madras Forest Act and the ban on podu shifting cultivation, and Alluri's guerrilla war of raids, whistles, drums and bows against the Raj across the Agency tracts.",
          link: "frontend/alluri-sitarama-raju-explorer/index.html#rebellion"
        },
        {
          id: "alluri-sitarama-raju-legacy",
          title: "Legacy of Alluri Sitarama Raju",
          description: "How the Manyam Veerudu's memory lived on: the 1986 commemorative stamp, the 4 July state festival, the statue in Parliament, the Alluri Sitharama Raju district, the Bhogapuram airport, and his story on screen in RRR.",
          link: "frontend/alluri-sitarama-raju-explorer/index.html#legacy"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});

/* Chadar Trek — Issue #3152: progressive enhancement */
(function () {
  "use strict";

  const state = { previousFocus: null, lightboxOpen: false, scrollTicking: false };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function setMenu(open) {
    const button = $(".menu-toggle");
    const navigation = $("#site-nav");
    if (!button || !navigation) return;
    navigation.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "Close" : "Menu";
  }

  function setupNavigation() {
    const button = $(".menu-toggle");
    const navigation = $("#site-nav");
    if (!button || !navigation) return;

    button.addEventListener("click", () => {
      setMenu(button.getAttribute("aria-expanded") !== "true");
    });

    $$("a", navigation).forEach((link) => link.addEventListener("click", () => setMenu(false)));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  function openLightbox(trigger) {
    const root = $("#lightbox");
    const image = $("#lightbox-image");
    const caption = $("#lightbox-caption");
    const source = $("img", trigger);
    if (!root || !image || !caption || !source) return;

    const url = trigger.getAttribute("data-full");
    if (!url) return;

    state.previousFocus = document.activeElement;
    image.src = url;
    image.alt = source.alt || "";
    caption.textContent = trigger.getAttribute("data-caption") || "";
    root.hidden = false;
    document.body.classList.add("modal-open");
    state.lightboxOpen = true;

    const close = $(".lightbox-close", root);
    if (close) close.focus();
  }

  function closeLightbox() {
    const root = $("#lightbox");
    const image = $("#lightbox-image");
    const caption = $("#lightbox-caption");
    if (!root) return;

    root.hidden = true;
    document.body.classList.remove("modal-open");
    state.lightboxOpen = false;
    if (image) {
      image.removeAttribute("src");
      image.alt = "";
    }
    if (caption) caption.textContent = "";

    if (state.previousFocus && typeof state.previousFocus.focus === "function") {
      state.previousFocus.focus();
    }
    state.previousFocus = null;
  }

  function setupGallery() {
    $$(".gallery-button").forEach((button) => {
      button.addEventListener("click", () => openLightbox(button));
    });
    $$("[data-close-lightbox]").forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.lightboxOpen) closeLightbox();
    });
  }

  function setupBackToTop() {
    const button = $("#back-top");
    if (!button) return;

    const update = () => {
      state.scrollTicking = false;
      button.classList.toggle("is-visible", window.scrollY > 500);
    };

    window.addEventListener("scroll", () => {
      if (!state.scrollTicking) {
        window.requestAnimationFrame(update);
        state.scrollTicking = true;
      }
    }, { passive: true });

    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    update();
  }

  function setupInternalLinks() {
    $$("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;

        const target = $(id);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start"
        });

        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        window.history.replaceState(null, "", id);
      });
    });
  }

  function setupChecklist() {
    const boxes = $$(".safety-checklist input[type='checkbox']");
    let storage = false;

    try {
      const testKey = "__chadar_storage_test__";
      sessionStorage.setItem(testKey, "1");
      sessionStorage.removeItem(testKey);
      storage = true;
    } catch (error) {
      storage = false;
    }

    boxes.forEach((box, index) => {
      const key = "chadar-check-" + index;
      if (storage) box.checked = sessionStorage.getItem(key) === "true";
      box.addEventListener("change", () => {
        if (storage) sessionStorage.setItem(key, String(box.checked));
      });
    });
  }

  function setupExternalLinks() {
    $$("a[target='_blank']").forEach((link) => {
      const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      link.setAttribute("rel", Array.from(rel).join(" "));
    });
  }

  function setupFocusTrap() {
    document.addEventListener("keydown", (event) => {
      if (!state.lightboxOpen || event.key !== "Tab") return;

      const root = $("#lightbox");
      if (!root) return;

      const focusable = $$("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])", root)
        .filter((element) => !element.disabled && element.getAttribute("aria-hidden") !== "true");

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function setupImageFallbacks() {
    $$(".gallery-button img").forEach((image) => {
      image.addEventListener("error", () => {
        image.alt = image.alt + " (image unavailable)";
      }, { once: true });
    });
  }

  function initialize() {
    setupNavigation();
    setupGallery();
    setupBackToTop();
    setupInternalLinks();
    setupChecklist();
    setupExternalLinks();
    setupFocusTrap();
    setupImageFallbacks();
    document.documentElement.dataset.chadarReady = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();

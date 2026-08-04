// script.js — Nilgiri Marten Explorer
// Reveals each section with a fade/slide-in animation as the user scrolls,
// matching the .fade-in-section pattern used across the site.
(function () {
  'use strict';

  const sections = document.querySelectorAll('.fade-in-section');

  if (!sections.length) return;

  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();
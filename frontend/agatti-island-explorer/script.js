document.addEventListener("DOMContentLoaded", () => {
  // Smooth-scroll for the cross-section strip's in-page links, and a
  // reduced-motion fallback (app.js's shared behaviors don't cover this
  // page's custom SVG nav, so it's handled locally).
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".cross-section a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  // Lightly highlight the cross-section segment matching the section
  // currently in view, so the diagram doubles as a "you are here" marker.
  const sectionIds = ["airport", "reefs", "beaches", "water-sports", "marine-life", "tourism"];
  const segments = sectionIds
    .map((id) => ({ id, seg: document.querySelector(`.cross-section a[href="#${id}"] .cross-section-seg`) }))
    .filter((entry) => entry.seg);

  if ("IntersectionObserver" in window && segments.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = segments.find((s) => s.id === entry.target.id);
          if (!match) return;
          match.seg.style.opacity = entry.isIntersecting ? "1" : "0.62";
        });
      },
      { threshold: 0.35 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
});

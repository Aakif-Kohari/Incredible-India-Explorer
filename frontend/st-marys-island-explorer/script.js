document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".smi-section a[href^='#']").forEach((link) => {
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

  const sectionIds = ["geological", "environment", "attractions", "visitor", "gallery"];
  const segments = sectionIds
    .map((id) => ({ id, seg: document.querySelector(`.smi-section a[href="#${id}"])` }))
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
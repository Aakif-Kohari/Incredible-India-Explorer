document.addEventListener("DOMContentLoaded", () => {
  // 1. Seasonal Comparison Data & Tab Switching
  const seasonData = {
    monsoon: {
      title: "Monsoon (Jul - Sep): Peak Discharge & Torrential Flow",
      desc: "The Kumaradhara River swells with intense rainfall from the Pushpagiri hills. Mist covers the gorge, creating an awe-inspiring tiered roar. Steps are slippery, and stepping into the river basin is strictly prohibited for safety.",
      flow: "Maximum (100%)",
      safety: "Caution (Leeches & Slippery Stairs)",
      vibe: "Majestic, Foggy & Intense"
    },
    "post-monsoon": {
      title: "Post-Monsoon (Oct - Dec): Ideal Clear Views & Moderate Flow",
      desc: "The skies clear over the Western Ghats while river discharge remains consistently full. Ideal for photography, trekking down the stairs, and bird watching around Pushpagiri.",
      flow: "High & Steady (75%)",
      safety: "Safe & Accessible",
      vibe: "Lush Green & Pleasant"
    },
    summer: {
      title: "Summer (Jan - May): Calm Thin Streams & Dry Boulders",
      desc: "The water volume drops significantly into narrow streams over the stone ledges. Allows clear exploration of the underlying volcanic geological stone structures.",
      flow: "Low (20%)",
      safety: "Very Safe",
      vibe: "Quiet & Rocky"
    }
  };

  const seasonBtns = document.querySelectorAll(".season-btn");
  const seasonTitle = document.getElementById("season-title");
  const seasonDesc = document.getElementById("season-desc");
  const seasonStats = document.querySelector(".season-stats");

  seasonBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      seasonBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const seasonKey = btn.dataset.season;
      const data = seasonData[seasonKey];

      if (data && seasonTitle && seasonDesc && seasonStats) {
        seasonTitle.textContent = data.title;
        seasonDesc.textContent = data.desc;
        seasonStats.innerHTML = `
          <span><strong>Flow Rate:</strong> ${data.flow}</span>
          <span><strong>Trek Safety:</strong> ${data.safety}</span>
          <span><strong>Vibe:</strong> ${data.vibe}</span>
        `;
      }
    });
  });

  // 2. Modal Handler for Cards and Gallery Items
  const modal = document.getElementById("falls-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDesc = document.getElementById("modal-description");

  function openModal(title, category, description) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalCategory.textContent = category || "Mallalli Falls Explorer";
    modalDesc.textContent = description;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.title, btn.dataset.category, btn.dataset.description);
    });
  });

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      openModal(item.dataset.title, "Gallery Preview", item.dataset.description);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // 3. Scroll to top button
  const scrollTopBtn = document.getElementById("btn-scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});


// script.js - Patola Silk Double Ikat Explorer Interactive Controller

document.addEventListener("app:route-changed", () => {
  initVisualizer();
  initJourneyIntegration();
  initTabs();
  initGalleryModal();
});

// Run immediately if loaded outside SPA routing
if (document.readyState !== "loading") {
  initVisualizer();
  initJourneyIntegration();
  initTabs();
  initGalleryModal();
}

/**
 * 1. Interactive Loom Visualizer
 */
function initVisualizer() {
  const canvas = document.getElementById("loom-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const warpSlider = document.getElementById("warp-slider");
  const weftSlider = document.getElementById("weft-slider");
  const warpVal = document.getElementById("warp-val");
  const weftVal = document.getElementById("weft-val");
  const statusLabel = document.getElementById("visualizer-status");
  const observationText = document.getElementById("observation-text");
  const resetBtn = document.getElementById("reset-loom");

  if (!warpSlider || !weftSlider || !ctx) return;

  function drawLoom() {
    const warpOffset = parseInt(warpSlider.value, 10);
    const weftOffset = parseInt(weftSlider.value, 10);

    // Update value labels
    warpVal.textContent = warpOffset === 0 ? "Perfect" : `${warpOffset}px shift`;
    weftVal.textContent = weftOffset === 0 ? "Perfect" : `${weftOffset}px shift`;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Background grid representing warp (vertical) and weft (horizontal) threads
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    
    // Draw Warp Threads
    for (let x = 0; x < canvas.width; x += 8) {
      ctx.beginPath();
      ctx.moveTo(x + (weftOffset * 0.15), 0);
      ctx.lineTo(x + (weftOffset * 0.15), canvas.height);
      ctx.stroke();
    }
    
    // Draw Weft Threads
    for (let y = 0; y < canvas.height; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y + (warpOffset * 0.15));
      ctx.lineTo(canvas.width, y + (warpOffset * 0.15));
      ctx.stroke();
    }

    // 2. Render Patola Motif with digital blur filter to simulate thread misalignment
    const maxOffset = Math.max(warpOffset, weftOffset);
    ctx.save();
    
    if (maxOffset > 0) {
      // Draw shifted "ghost" copies representing warp/weft misalignment
      ctx.filter = `blur(${maxOffset * 0.45}px) contrast(1.1)`;
      
      // Shifted shadow layer
      ctx.fillStyle = "rgba(180, 83, 9, 0.45)"; // Gold
      drawGeometricMotif(canvas.width / 2 + weftOffset * 0.8, canvas.height / 2 + warpOffset * 0.8, 60);

      ctx.fillStyle = "rgba(139, 27, 27, 0.6)"; // Red
      drawGeometricMotif(canvas.width / 2 - weftOffset * 0.4, canvas.height / 2 - warpOffset * 0.4, 60);
    } else {
      ctx.filter = "none";
      // Perfect alignment glow effect
      ctx.shadowColor = "rgba(245, 158, 11, 0.4)";
      ctx.shadowBlur = 15;
    }

    // Main sharp/aligned layer
    ctx.fillStyle = maxOffset === 0 ? "#ef4444" : "rgba(239, 68, 68, 0.85)";
    drawGeometricMotif(canvas.width / 2, canvas.height / 2, 60);

    // Accent elements inside motif
    ctx.fillStyle = maxOffset === 0 ? "#f59e0b" : "rgba(245, 158, 11, 0.75)";
    drawInnerMotif(canvas.width / 2, canvas.height / 2, 30);

    ctx.restore();

    // 3. Update Visualizer status cards
    if (maxOffset === 0) {
      statusLabel.textContent = "Status: Perfect Double Ikat Alignment";
      statusLabel.className = "visualizer-status aligned";
      observationText.innerHTML = "<strong>Loom Aligned!</strong> Warp and weft threads intersect exactly at their dyed intersections. The design is crystal-clear and reversible (identical on front and back).";
    } else {
      statusLabel.textContent = "Status: Threads Misaligned";
      statusLabel.className = "visualizer-status";
      observationText.textContent = "Dyed threads are currently offset, creating a fuzzy, bleeding pattern. Adjust the loom tension sliders to bring warp and weft shifts to 0px.";
    }
  }

  // Draw traditional Patola diamond / basket motif
  function drawGeometricMotif(cx, cy, size) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);          // Top
    ctx.lineTo(cx + size, cy);          // Right
    ctx.lineTo(cx, cy + size);          // Bottom
    ctx.lineTo(cx - size, cy);          // Left
    ctx.closePath();
    ctx.fill();

    // Border lines
    ctx.lineWidth = 4;
    ctx.strokeStyle = ctx.fillStyle;
    
    // Draw outer diamond steps
    ctx.strokeRect(cx - size - 8, cy - size - 8, size * 2 + 16, size * 2 + 16);
  }

  function drawInnerMotif(cx, cy, size) {
    ctx.beginPath();
    ctx.arc(cx, cy, size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Draw traditional eight-pointed star
    ctx.strokeStyle = "#07090d";
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - size, cy);
      ctx.lineTo(cx + size, cy);
      ctx.stroke();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.translate(-cx, -cy);
    }
  }

  warpSlider.addEventListener("input", drawLoom);
  weftSlider.addEventListener("input", drawLoom);
  resetBtn.addEventListener("click", () => {
    warpSlider.value = 15;
    weftSlider.value = 12;
    drawLoom();
  });

  // Initial draw
  drawLoom();
}

/**
 * 2. Save to Journey Bookmarking
 */
function initJourneyIntegration() {
  const bookmarkBtn = document.getElementById("patola-bookmark-btn");
  if (!bookmarkBtn) return;

  const id = "patola-weaving";
  const title = "Patola Silk Weaving Explorer";
  const thumbnail = "frontend/assets/traditional_attires.png";
  const category = "culture";

  function updateUI() {
    if (!window.Journey) return;
    const isSaved = window.Journey.isSaved(id);
    bookmarkBtn.classList.toggle("saved", isSaved);
    bookmarkBtn.setAttribute("aria-pressed", String(isSaved));
    bookmarkBtn.innerHTML = isSaved ? "♥ Saved to Journey" : "☆ Save to Journey";
  }

  if (window.Journey) {
    updateUI();
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.Journey.toggle({
        id,
        explorerPage: "frontend/patola-weaving-explorer/index.html",
        title,
        thumbnail,
        category
      });
      updateUI();
    });
  }

  // Register in Search Index dynamically if needed
  registerSearchItems();
}

function registerSearchItems() {
  if (window.Journey && typeof window.Journey.registerSearchItems === "function") {
    window.Journey.registerSearchItems("frontend/patola-weaving-explorer/index.html", [
      {
        id: "patola-main",
        title: "Patola Silk Weaving Explorer",
        description: "Explore Patola Silk, Gujarat's double-ikat weaving tradition, Solanki dynasty patronage, and interactive loom visualizer.",
        link: "frontend/patola-weaving-explorer/index.html"
      },
      {
        id: "patola-visualizer",
        title: "Patan Loom Alignment Visualizer",
        description: "Interact with the warp and weft slider tools simulating double-ikat thread alignment.",
        link: "frontend/patola-weaving-explorer/index.html#visualizer-section"
      }
    ]);
  }
}

/**
 * 3. Tab Smooth Scrolling
 */
function initTabs() {
  const tabs = [...document.querySelectorAll(".tab-btn")];
  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        tabs.forEach((t) => t.classList.toggle("active", t === tab));
      }
    });
  });

  // Highlight active tab on scroll
  const sections = tabs.map(t => document.getElementById(t.dataset.target)).filter(Boolean);
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    if (current) {
      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.target === current);
      });
    }
  });
}

/**
 * 4. Motif Details Modal
 */
function initGalleryModal() {
  const modal = document.getElementById("patola-modal");
  const modalClose = document.getElementById("patola-modal-close");
  const modalHeading = document.getElementById("modal-heading-text");
  const modalPreview = document.getElementById("modal-visual-preview");
  const modalDesc = document.getElementById("modal-description-text");
  const galleryItems = [...document.querySelectorAll(".patola-gallery-item")];

  if (!modal || galleryItems.length === 0) return;

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.dataset.title;
      const desc = item.dataset.desc;
      const placeholder = item.querySelector(".pattern-placeholder").cloneNode(true);

      modalHeading.textContent = title;
      modalDesc.textContent = desc;
      modalPreview.replaceChildren(placeholder);

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      modalClose.focus();
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

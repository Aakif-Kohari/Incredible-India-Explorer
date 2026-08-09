// script.js - Molela Clay Art Explorer Interactive Controller

// Initialize on load (handles both direct page load and SPA insertions)
initPlaqueCrafter();
initJourneyIntegration();
initTabs();

/**
 * 1. Plaque Crafter State & Drawing Engine
 */
function initPlaqueCrafter() {
  const canvas = document.getElementById("plaque-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const tempGauge = document.getElementById("temp-gauge-container");
  const tempDisplay = document.getElementById("temp-display");
  const tempProgress = document.getElementById("temp-progress");
  const fireOverlay = document.getElementById("bhatti-fire-effect");
  const fireBtn = document.getElementById("fire-bhatti-btn");
  const successMsg = document.getElementById("firing-complete-msg");
  const statusTag = document.getElementById("crafter-status-tag");
  const activeBrushLabel = document.getElementById("active-brush-name");
  const resetBtn = document.getElementById("reset-plaque-btn");

  if (!ctx) return;

  // State
  let state = {
    deity: "devnarayan",
    sculpts: {
      halo: true,
      border: true,
      ornaments: false
    },
    paints: {
      background: "unpainted",
      border: "unpainted",
      deity: "unpainted",
      halo: "unpainted"
    },
    activePigment: "geru",
    fired: false
  };

  // Color mappings before/after firing
  const paintColors = {
    unpainted: {
      wet: "#5c5047",      // Wet organic mud
      fired: "#c2410c"    // Baked terracotta red
    },
    geru: {
      wet: "#8b2512",      // Mud red ochre
      fired: "#d44c28"    // Baked brick red
    },
    yellow: {
      wet: "#b48312",      // Ochre silt
      fired: "#f5b025"    // Bright yellow clay
    },
    white: {
      wet: "#c8c6c4",      // Lime slurry
      fired: "#ecebe9"    // Chalk white
    },
    indigo: {
      wet: "#1c2d42",      // Indigo mud
      fired: "#2b5c8f"    // Clay indigo blue
    }
  };

  function drawPlaque() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const mode = state.fired ? "fired" : "wet";

    // 1. Draw Baseplate Backing Plate
    ctx.fillStyle = paintColors.background[mode] === paintColors.unpainted[mode] 
      ? (state.fired ? "#a33a0c" : "#4e433a") // Background baseplate shade
      : paintColors[state.paints.background][mode];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stamped clay textures inside baseplate
    ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
    ctx.lineWidth = 1;
    for (let i = 10; i < canvas.width; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    // 2. Draw Stamped Border
    if (state.sculpts.border) {
      ctx.fillStyle = state.paints.border === "unpainted"
        ? (state.fired ? "#c2410c" : "#5c5047")
        : paintColors[state.paints.border][mode];
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 4;
      
      // Draw border frame
      ctx.fillRect(15, 15, canvas.width - 30, canvas.height - 30);
      ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);

      // Inner boundary
      ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);

      // Stamped dots on border
      ctx.fillStyle = state.fired ? "#f59e0b" : "#b48312";
      for (let x = 25; x < canvas.width; x += 30) {
        ctx.beginPath(); ctx.arc(x, 25, 4, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, canvas.height - 25, 4, 0, Math.PI*2); ctx.fill();
      }
      for (let y = 25; y < canvas.height; y += 30) {
        ctx.beginPath(); ctx.arc(25, y, 4, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(canvas.width - 25, y, 4, 0, Math.PI*2); ctx.fill();
      }
    }

    // 3. Draw Halo (behind head)
    if (state.sculpts.halo) {
      ctx.fillStyle = state.paints.halo === "unpainted"
        ? (state.fired ? "#ea580c" : "#6b5c50")
        : paintColors[state.paints.halo][mode];
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.arc(200, 150, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Halo rays
      ctx.strokeStyle = state.fired ? "rgba(245,158,11,0.5)" : "rgba(180,131,18,0.3)";
      ctx.lineWidth = 4;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
        ctx.beginPath();
        ctx.moveTo(200 + Math.cos(angle)*70, 150 + Math.sin(angle)*70);
        ctx.lineTo(200 + Math.cos(angle)*85, 150 + Math.sin(angle)*85);
        ctx.stroke();
      }
    }

    // 4. Draw Deity Relief Figure
    ctx.fillStyle = state.paints.deity === "unpainted"
      ? (state.fired ? "#ea580c" : "#716255")
      : paintColors[state.paints.deity][mode];
    ctx.strokeStyle = "rgba(0,0,0,0.45)";
    ctx.lineWidth = 5;

    if (state.deity === "devnarayan") {
      drawDevnarayan(ctx, mode);
    } else if (state.deity === "nagaraja") {
      drawNagaraja(ctx, mode);
    } else if (state.deity === "ganesha") {
      drawGanesha(ctx, mode);
    }
  }

  // Figure Drawings using lines to mimic handmade clay shapes
  function drawDevnarayan(c, mode) {
    c.save();
    c.shadowColor = "rgba(0,0,0,0.3)";
    c.shadowBlur = 8;
    c.shadowOffsetY = 4;

    // Draw horse body (Devnarayan's Black Stallion)
    c.beginPath();
    c.ellipse(200, 340, 80, 45, 0, 0, Math.PI * 2); // Body
    c.fill();
    c.stroke();

    // Horse neck & head
    c.beginPath();
    c.moveTo(140, 320);
    c.lineTo(100, 260); // Neck
    c.lineTo(75, 265);  // Nose
    c.lineTo(85, 290);  // Chin
    c.lineTo(130, 350);
    c.closePath();
    c.fill();
    c.stroke();

    // Horse legs
    c.lineWidth = 7;
    c.beginPath();
    c.moveTo(140, 360); c.lineTo(130, 440); // Front Left
    c.moveTo(160, 360); c.lineTo(155, 435); // Front Right
    c.moveTo(240, 360); c.lineTo(245, 440); // Back Left
    c.moveTo(260, 360); c.lineTo(265, 435); // Back Right
    c.stroke();

    // Devnarayan (Rider torso)
    c.beginPath();
    c.moveTo(170, 300);
    c.lineTo(170, 200); // Torso
    c.lineTo(210, 200);
    c.lineTo(210, 300);
    c.closePath();
    c.fill();
    c.stroke();

    // Head
    c.beginPath();
    c.arc(190, 160, 24, 0, Math.PI * 2); // Head
    c.fill();
    c.stroke();

    // Spear / Lotus (Folk hero attribute)
    c.strokeStyle = state.fired ? "#f59e0b" : "#b48312";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(220, 120);
    c.lineTo(220, 410); // Spear shaft
    c.stroke();
    
    c.fillStyle = state.fired ? "#ef4444" : "#8b2512";
    c.beginPath();
    c.moveTo(220, 100); c.lineTo(230, 120); c.lineTo(210, 120); // Spear tip
    c.closePath();
    c.fill();

    // Ornaments (sculpted clay dots/garlands)
    if (state.sculpts.ornaments) {
      c.fillStyle = "#fff";
      for (let x = 175; x <= 205; x += 10) {
        c.beginPath(); c.arc(x, 230, 3, 0, Math.PI*2); c.fill(); // Necklace
      }
      c.strokeStyle = "#fff";
      c.lineWidth = 3;
      c.beginPath();
      c.arc(190, 160, 30, 0, Math.PI, true); // Crown
      c.stroke();
    }

    c.restore();
  }

  function drawNagaraja(c, mode) {
    c.save();
    c.shadowColor = "rgba(0,0,0,0.3)";
    c.shadowBlur = 8;
    c.shadowOffsetY = 4;

    // Coiled Snake Base
    c.beginPath();
    c.arc(200, 380, 60, 0, Math.PI * 2);
    c.arc(200, 380, 40, 0, Math.PI * 2, true); // Double coil
    c.fill();
    c.stroke();

    // Winding torso rising
    c.beginPath();
    c.moveTo(180, 360);
    c.lineTo(180, 220); // Left neck boundary
    c.bezierCurveTo(180, 190, 220, 190, 220, 220); // Hood dome
    c.lineTo(220, 360);
    c.closePath();
    c.fill();
    c.stroke();

    // Multi-heads (5 hoods)
    c.fillStyle = c.strokeStyle; // Use border color for lines
    for (let i = -2; i <= 2; i++) {
      const offsetX = i * 28;
      const offsetY = -Math.abs(i) * 12;
      
      c.fillStyle = state.paints.deity === "unpainted"
        ? (state.fired ? "#f97316" : "#8c7665")
        : paintColors[state.paints.deity][mode];
        
      c.beginPath();
      c.arc(200 + offsetX, 190 + offsetY, 18, 0, Math.PI * 2);
      c.fill();
      c.stroke();
      
      // Eyes on heads
      c.fillStyle = "#fff";
      c.beginPath();
      c.arc(195 + offsetX, 185 + offsetY, 2, 0, Math.PI*2);
      c.arc(205 + offsetX, 185 + offsetY, 2, 0, Math.PI*2);
      c.fill();
    }

    // Lotus ornaments
    if (state.sculpts.ornaments) {
      c.fillStyle = state.fired ? "#ef4444" : "#8b2512";
      c.beginPath();
      c.arc(200, 280, 12, 0, Math.PI*2); // Center lotus medal
      c.fill();
      c.stroke();
    }

    c.restore();
  }

  function drawGanesha(c, mode) {
    c.save();
    c.shadowColor = "rgba(0,0,0,0.3)";
    c.shadowBlur = 8;
    c.shadowOffsetY = 4;

    // Pot Belly (Ladha)
    c.beginPath();
    c.arc(200, 340, 65, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    // Torso & Shoulders
    c.beginPath();
    c.moveTo(150, 300);
    c.lineTo(160, 220);
    c.lineTo(240, 220);
    c.lineTo(250, 300);
    c.closePath();
    c.fill();
    c.stroke();

    // Head
    c.beginPath();
    c.ellipse(200, 200, 36, 42, 0, 0, Math.PI*2);
    c.fill();
    c.stroke();

    // Elephant Ears
    c.beginPath();
    c.ellipse(155, 190, 26, 32, Math.PI/6, 0, Math.PI*2); // Left ear
    c.fill();
    c.stroke();
    
    c.beginPath();
    c.ellipse(245, 190, 26, 32, -Math.PI/6, 0, Math.PI*2); // Right ear
    c.fill();
    c.stroke();

    // Trunk (coiling to the left)
    c.lineWidth = 7;
    c.beginPath();
    c.moveTo(200, 210);
    c.quadraticCurveTo(210, 270, 180, 280);
    c.stroke();

    // Crown (Mukut)
    c.fillStyle = state.fired ? "#f59e0b" : "#b48312";
    c.beginPath();
    c.moveTo(180, 160);
    c.lineTo(200, 110);
    c.lineTo(220, 160);
    c.closePath();
    c.fill();
    c.stroke();

    // Ornaments (sculpted clay necklace and armlets)
    if (state.sculpts.ornaments) {
      c.fillStyle = "#fff";
      c.beginPath();
      c.arc(200, 310, 10, 0, Math.PI*2); // Modak bowl
      c.fill();
      c.stroke();
    }

    c.restore();
  }

  // Canvas Click / Paint Handler
  canvas.addEventListener("click", (e) => {
    if (state.fired) return; // Cannot paint fired pottery!

    // Get click coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Detect click zones
    let zone = "background";

    if (x < 35 || x > canvas.width - 35 || y < 35 || y > canvas.height - 35) {
      zone = "border";
    } else {
      // Check if click is on deity figure zone
      let isOnDeity = false;
      if (state.deity === "devnarayan") {
        isOnDeity = (y >= 140 && y < 450 && x >= 70 && x < 280);
      } else if (state.deity === "nagaraja") {
        isOnDeity = (y >= 160 && y < 450 && x >= 120 && x < 280);
      } else if (state.deity === "ganesha") {
        isOnDeity = (y >= 110 && y < 420 && x >= 120 && x < 280);
      }

      if (isOnDeity) {
        zone = "deity";
      } else if (state.sculpts.halo && Math.sqrt((x-200)**2 + (y-150)**2) < 75) {
        zone = "halo";
      }
    }

    // Set paint state
    state.paints[zone] = state.activePigment;
    drawPlaque();
  });

  // Wire up Step selectors & Nav
  const stepBtns = [...document.querySelectorAll(".step-nav-btn")];
  const stepPanels = [...document.querySelectorAll(".step-panel")];

  stepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.step;
      stepBtns.forEach((b) => b.classList.toggle("active", b === btn));
      stepPanels.forEach((p) => p.classList.toggle("active", p.id === `panel-step-${step}`));

      // Show/Hide temperature gauge on firing step
      if (step === "4") {
        tempGauge.style.display = "block";
      } else {
        tempGauge.style.display = "none";
      }
    });
  });

  // Deity Choice Click
  const deityCards = [...document.querySelectorAll(".option-card")];
  deityCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (state.fired) return;
      state.deity = card.dataset.deity;
      deityCards.forEach((c) => c.classList.toggle("active", c === card));
      drawPlaque();
    });
  });

  // Sculpting Toggle Click
  const sculptToggles = [...document.querySelectorAll(".sculpt-toggle-btn")];
  sculptToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.fired) return;
      const key = btn.dataset.sculpt;
      state.sculpts[key] = !state.sculpts[key];
      btn.classList.toggle("active", state.sculpts[key]);
      btn.querySelector(".chk-box").textContent = state.sculpts[key] ? "✓" : "✗";
      drawPlaque();
    });
  });

  // Paint Pigment Palette Click
  const pigmentSwatches = [...document.querySelectorAll(".color-swatch")];
  pigmentSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      state.activePigment = swatch.dataset.color;
      pigmentSwatches.forEach((s) => s.classList.toggle("active", s === swatch));
      
      const names = { geru: "Geru Red", yellow: "Pila Yellow", white: "Safed White", indigo: "Neel Indigo" };
      activeBrushLabel.textContent = names[state.activePigment];
    });
  });

  // Bhatti Kiln Firing Action
  fireBtn.addEventListener("click", () => {
    if (state.fired) return;
    
    fireBtn.disabled = true;
    fireOverlay.classList.add("firing");
    statusTag.textContent = "Status: Firing Plaque (30°C)...";
    
    let temp = 30;
    const interval = setInterval(() => {
      temp += 30;
      if (temp > 900) temp = 900;
      
      tempDisplay.textContent = `Furnace Temp (${temp}°C)`;
      tempProgress.style.width = `${(temp / 900) * 100}%`;
      statusTag.textContent = `Status: Firing Plaque (${temp}°C)...`;
      
      if (temp >= 900) {
        clearInterval(interval);
        fireOverlay.classList.remove("firing");
        state.fired = true;
        statusTag.textContent = "Status: Baked Terracotta Plaque";
        statusTag.className = "crafter-status-tag fired";
        
        successMsg.style.display = "block";
        drawPlaque();
      }
    }, 90);
  });

  // Reset Button
  resetBtn.addEventListener("click", () => {
    state = {
      deity: "devnarayan",
      sculpts: { halo: true, border: true, ornaments: false },
      paints: { background: "unpainted", border: "unpainted", deity: "unpainted", halo: "unpainted" },
      activePigment: "geru",
      fired: false
    };

    // Reset controls UI
    deityCards.forEach((c) => c.classList.toggle("active", c.dataset.deity === "devnarayan"));
    sculptToggles.forEach((b) => {
      const key = b.dataset.sculpt;
      b.classList.toggle("active", state.sculpts[key]);
      b.querySelector(".chk-box").textContent = state.sculpts[key] ? "✓" : "✗";
    });
    pigmentSwatches.forEach((s) => s.classList.toggle("active", s.dataset.color === "geru"));
    activeBrushLabel.textContent = "Geru Red";

    successMsg.style.display = "none";
    statusTag.textContent = "Status: Wet Clay Base";
    statusTag.className = "crafter-status-tag";
    tempDisplay.textContent = "Room Temp (30°C)";
    tempProgress.style.width = "0%";
    fireBtn.disabled = false;

    // Scroll back to step 1
    stepBtns[0].click();

    drawPlaque();
  });

  // Draw initial
  drawPlaque();
}

/**
 * 2. Save to Journey Bookmarking
 */
function initJourneyIntegration() {
  const bookmarkBtn = document.getElementById("molela-bookmark-btn");
  if (!bookmarkBtn) return;

  const id = "molela-clay-art";
  const title = "Molela Clay Art Explorer";
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
        explorerPage: "frontend/molela-clay-art-explorer/index.html",
        title,
        thumbnail,
        category
      });
      updateUI();
    });
  }

  registerSearchItems();
}

function registerSearchItems() {
  if (window.Journey && typeof window.Journey.registerSearchItems === "function") {
    window.Journey.registerSearchItems("frontend/molela-clay-art-explorer/index.html", [
      {
        id: "molela-main",
        title: "Molela Clay Art Explorer",
        description: "Explore Rajasthan's handcrafted terracotta relief plaques, Mewar potters, and interactive clay plaque crafter.",
        link: "frontend/molela-clay-art-explorer/index.html"
      },
      {
        id: "molela-crafter",
        title: "Heritage Clay Plaque Crafter",
        description: "Mould deity reliefs, apply slips, and heat fire terracotta in the bhatti kiln simulator.",
        link: "frontend/molela-clay-art-explorer/index.html#crafter-section"
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

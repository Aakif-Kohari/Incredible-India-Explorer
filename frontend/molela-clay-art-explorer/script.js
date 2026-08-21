// script.js - Molela Clay Art Explorer
// Single initialization flag to prevent double-binding
let _molelaInitDone = false;

function runMolelaInit() {
  initPlaqueCrafter();
  initJourneyIntegration();
  initTabs();
}

// Run on script load (direct navigation)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runMolelaInit);
} else {
  runMolelaInit();
}

// Also run on SPA route change (router.js dispatches this)
document.addEventListener("app:route-changed", function () {
  _molelaInitDone = false;
  runMolelaInit();
});

/* =========================================================
   1. PLAQUE CRAFTER
   ========================================================= */
function initPlaqueCrafter() {
  const canvas = document.getElementById("plaque-canvas");
  if (!canvas) return;
  // Guard against double-init on same canvas instance
  if (canvas._molelaInit) { canvas._molelaRedraw && canvas._molelaRedraw(); return; }
  canvas._molelaInit = true;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Fix canvas internal resolution to match its actual dimensions
  const W = 400, H = 500;
  canvas.width = W;
  canvas.height = H;

  const tempGauge    = document.getElementById("temp-gauge-container");
  const tempDisplay  = document.getElementById("temp-display");
  const tempProgress = document.getElementById("temp-progress");
  const fireOverlay  = document.getElementById("bhatti-fire-effect");
  const fireBtn      = document.getElementById("fire-bhatti-btn");
  const successMsg   = document.getElementById("firing-complete-msg");
  const statusTag    = document.getElementById("crafter-status-tag");
  const brushLabel   = document.getElementById("active-brush-name");
  const resetBtn     = document.getElementById("reset-plaque-btn");

  // ── State ──────────────────────────────────────────────
  let state = {
    deity: "devnarayan",
    sculpts: { halo: true, border: true, ornaments: false },
    paints:  { background: "unpainted", border: "unpainted", deity: "unpainted", halo: "unpainted" },
    activePigment: "geru",
    fired: false
  };

  // ── Colors (visibly distinct wet vs fired) ─────────────
  const COLORS = {
    unpainted: { wet: "#b5956a",  fired: "#c2410c" },   // warm tan  → terracotta orange
    geru:      { wet: "#c0392b",  fired: "#e74c3c" },   // deep red  → bright brick red
    yellow:    { wet: "#c98b0a",  fired: "#f1c40f" },   // ochre     → vivid yellow
    white:     { wet: "#d5d2cc",  fired: "#f4f1eb" },   // grey-white→ chalk white
    indigo:    { wet: "#2c3e6b",  fired: "#3a6db5" },   // dark blue → bright clay blue
  };

  // ── Draw ───────────────────────────────────────────────
  function getColor(zone) {
    const m = state.fired ? "fired" : "wet";
    const p = state.paints[zone];
    return COLORS[p] ? COLORS[p][m] : COLORS.unpainted[m];
  }

  function drawPlaque() {
    const m = state.fired ? "fired" : "wet";
    ctx.clearRect(0, 0, W, H);

    // 1. Background plate — warm clay
    ctx.fillStyle = getColor("background");
    ctx.fillRect(0, 0, W, H);

    // Subtle vertical texture lines on background
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }

    // 2. Stamped border frame
    if (state.sculpts.border) {
      ctx.fillStyle = getColor("border");
      ctx.fillRect(12, 12, W - 24, H - 24);
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 3;
      ctx.strokeRect(12, 12, W - 24, H - 24);
      ctx.strokeRect(28, 28, W - 56, H - 56);

      // Stamped dots
      const dotColor = m === "fired" ? "#f59e0b" : "#8b6e36";
      ctx.fillStyle = dotColor;
      for (let x = 22; x < W - 22; x += 25) {
        ctx.beginPath(); ctx.arc(x, 20, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, H - 20, 4, 0, Math.PI * 2); ctx.fill();
      }
      for (let y = 22; y < H - 22; y += 25) {
        ctx.beginPath(); ctx.arc(20, y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(W - 20, y, 4, 0, Math.PI * 2); ctx.fill();
      }
    }

    // 3. Halo (behind deity head)
    if (state.sculpts.halo) {
      ctx.save();
      ctx.fillStyle = getColor("halo");
      ctx.shadowColor = "rgba(0,0,0,0.2)"; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(200, 155, 65, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // Rays
      ctx.strokeStyle = m === "fired" ? "rgba(245,158,11,0.7)" : "rgba(139,110,54,0.5)";
      ctx.lineWidth = 3;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        ctx.beginPath();
        ctx.moveTo(200 + Math.cos(a) * 65, 155 + Math.sin(a) * 65);
        ctx.lineTo(200 + Math.cos(a) * 82, 155 + Math.sin(a) * 82);
        ctx.stroke();
      }
    }

    // 4. Deity figure
    ctx.fillStyle   = getColor("deity");
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth   = 4;

    if (state.deity === "devnarayan")  drawDevnarayan(ctx, m);
    else if (state.deity === "nagaraja") drawNagaraja(ctx, m);
    else if (state.deity === "ganesha")  drawGanesha(ctx, m);
  }

  // ── Deity drawing functions ────────────────────────────
  function fill(c)  { c.fill(); c.stroke(); }

  function drawDevnarayan(c, m) {
    c.save();
    const fc = getColor("deity");
    c.fillStyle   = fc;
    c.strokeStyle = "rgba(0,0,0,0.5)";
    c.lineWidth   = 4;

    // Horse body
    c.beginPath(); c.ellipse(200, 350, 78, 42, 0, 0, Math.PI * 2); fill(c);
    // Horse head & neck
    c.beginPath(); c.moveTo(140, 325); c.lineTo(105, 268); c.lineTo(83, 272);
    c.lineTo(92, 295); c.lineTo(132, 345); c.closePath(); fill(c);
    // Legs
    c.lineWidth = 8;
    [[142,365,132,445],[162,368,158,442],[238,368,244,445],[258,368,263,442]].forEach(([x1,y1,x2,y2]) => {
      c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
    });
    // Rider torso
    c.lineWidth = 4;
    c.beginPath(); c.moveTo(175,310); c.lineTo(175,210); c.lineTo(215,210); c.lineTo(215,310); c.closePath(); fill(c);
    // Rider head
    c.beginPath(); c.arc(195, 170, 26, 0, Math.PI * 2); fill(c);
    // Eyes
    c.fillStyle = "rgba(255,255,255,0.85)";
    c.beginPath(); c.arc(188,166,4,0,Math.PI*2); c.arc(202,166,4,0,Math.PI*2); c.fill();
    c.fillStyle = "rgba(0,0,0,0.8)";
    c.beginPath(); c.arc(189,166,2,0,Math.PI*2); c.arc(203,166,2,0,Math.PI*2); c.fill();
    // Spear
    c.fillStyle = m === "fired" ? "#f59e0b" : "#8b6e36";
    c.strokeStyle = m === "fired" ? "#f59e0b" : "#8b6e36";
    c.lineWidth = 4;
    c.beginPath(); c.moveTo(225,125); c.lineTo(225,415); c.stroke();
    c.fillStyle = m === "fired" ? "#ef4444" : "#c0392b";
    c.beginPath(); c.moveTo(225,108); c.lineTo(235,127); c.lineTo(215,127); c.closePath(); c.fill();
    // Ornaments
    if (state.sculpts.ornaments) {
      c.fillStyle = "rgba(255,255,255,0.9)";
      for (let x = 180; x <= 210; x += 10) { c.beginPath(); c.arc(x, 232, 3.5, 0, Math.PI * 2); c.fill(); }
      c.strokeStyle = "rgba(255,255,255,0.8)"; c.lineWidth = 3;
      c.beginPath(); c.arc(195, 170, 33, 0.8 * Math.PI, 0.2 * Math.PI, true); c.stroke();
    }
    c.restore();
  }

  function drawNagaraja(c, m) {
    c.save();
    c.fillStyle   = getColor("deity");
    c.strokeStyle = "rgba(0,0,0,0.5)";
    c.lineWidth   = 4;
    // Coil base
    c.beginPath(); c.arc(200, 385, 58, 0, Math.PI * 2); c.arc(200, 385, 38, 0, Math.PI * 2, true); fill(c);
    // Body column
    c.beginPath();
    c.moveTo(178, 365); c.lineTo(178, 225);
    c.bezierCurveTo(178, 192, 222, 192, 222, 225);
    c.lineTo(222, 365); c.closePath(); fill(c);
    // Five hood-heads
    for (let i = -2; i <= 2; i++) {
      const ox = i * 27, oy = -Math.abs(i) * 14;
      c.fillStyle = getColor("deity");
      c.beginPath(); c.arc(200 + ox, 190 + oy, 19, 0, Math.PI * 2); fill(c);
      // Eyes
      c.fillStyle = "rgba(255,255,255,0.9)";
      c.beginPath(); c.arc(195 + ox, 186 + oy, 3, 0, Math.PI * 2); c.arc(205 + ox, 186 + oy, 3, 0, Math.PI * 2); c.fill();
      c.fillStyle = "rgba(0,0,0,0.8)";
      c.beginPath(); c.arc(195 + ox, 186 + oy, 1.5, 0, Math.PI * 2); c.arc(205 + ox, 186 + oy, 1.5, 0, Math.PI * 2); c.fill();
    }
    // Lotus ornament
    if (state.sculpts.ornaments) {
      c.fillStyle = m === "fired" ? "#ef4444" : "#c0392b";
      c.beginPath(); c.arc(200, 290, 13, 0, Math.PI * 2); fill(c);
    }
    c.restore();
  }

  function drawGanesha(c, m) {
    c.save();
    c.fillStyle   = getColor("deity");
    c.strokeStyle = "rgba(0,0,0,0.5)";
    c.lineWidth   = 4;
    // Pot belly
    c.beginPath(); c.arc(200, 345, 62, 0, Math.PI * 2); fill(c);
    // Torso
    c.beginPath(); c.moveTo(152,305); c.lineTo(162,222); c.lineTo(238,222); c.lineTo(248,305); c.closePath(); fill(c);
    // Head
    c.beginPath(); c.ellipse(200, 200, 37, 44, 0, 0, Math.PI * 2); fill(c);
    // Ears
    c.beginPath(); c.ellipse(157, 192, 27, 34, Math.PI / 5, 0, Math.PI * 2); fill(c);
    c.beginPath(); c.ellipse(243, 192, 27, 34, -Math.PI / 5, 0, Math.PI * 2); fill(c);
    // Trunk
    c.lineWidth = 8; c.strokeStyle = getColor("deity");
    c.beginPath(); c.moveTo(200, 212); c.quadraticCurveTo(215, 275, 185, 287); c.stroke();
    // Crown
    c.fillStyle = m === "fired" ? "#f59e0b" : "#8b6e36";
    c.strokeStyle = "rgba(0,0,0,0.4)"; c.lineWidth = 3;
    c.beginPath(); c.moveTo(180, 162); c.lineTo(200, 112); c.lineTo(220, 162); c.closePath(); fill(c);
    // Eyes
    c.fillStyle = "rgba(255,255,255,0.9)";
    c.beginPath(); c.arc(186,196,4,0,Math.PI*2); c.arc(214,196,4,0,Math.PI*2); c.fill();
    c.fillStyle = "rgba(0,0,0,0.8)";
    c.beginPath(); c.arc(186,196,2,0,Math.PI*2); c.arc(214,196,2,0,Math.PI*2); c.fill();
    // Ornaments
    if (state.sculpts.ornaments) {
      c.fillStyle = "rgba(255,255,255,0.9)";
      for (let x = 177; x <= 223; x += 12) { c.beginPath(); c.arc(x, 310, 4, 0, Math.PI * 2); c.fill(); }
    }
    c.restore();
  }

  // ── Canvas click → paint zone ──────────────────────────
  canvas.addEventListener("click", (e) => {
    if (state.fired) return;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width  / rect.width;
    const sy = canvas.height / rect.height;
    const x  = (e.clientX - rect.left) * sx;
    const y  = (e.clientY - rect.top)  * sy;

    let zone = "background";
    if (x < 30 || x > W - 30 || y < 30 || y > H - 30) {
      zone = "border";
    } else {
      const onHalo = state.sculpts.halo && Math.hypot(x - 200, y - 155) < 68;
      const onDeity = (state.deity === "devnarayan" && y > 145 && y < 455 && x > 65 && x < 285) ||
                      (state.deity === "nagaraja"   && y > 165 && y < 455 && x > 125 && x < 278) ||
                      (state.deity === "ganesha"    && y > 108 && y < 425 && x > 125 && x < 278);
      if (onDeity)  zone = "deity";
      else if (onHalo) zone = "halo";
    }
    state.paints[zone] = state.activePigment;
    drawPlaque();
  });

  // ── Step navigation inside crafter ────────────────────
  const stepBtns   = [...document.querySelectorAll(".step-nav-btn")];
  const stepPanels = [...document.querySelectorAll(".step-panel")];

  stepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.step;
      stepBtns.forEach  (b => b.classList.toggle("active", b === btn));
      stepPanels.forEach(p => p.classList.toggle("active", p.id === `panel-step-${step}`));
      if (tempGauge) tempGauge.style.display = step === "4" ? "block" : "none";
    });
  });

  // ── Deity card selection ───────────────────────────────
  const deityCards = [...document.querySelectorAll(".option-card")];
  deityCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (state.fired) return;
      state.deity = card.dataset.deity;
      deityCards.forEach(c => c.classList.toggle("active", c === card));
      drawPlaque();
    });
  });

  // ── Sculpt toggles ─────────────────────────────────────
  const sculptBtns = [...document.querySelectorAll(".sculpt-toggle-btn")];
  sculptBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.fired) return;
      const key = btn.dataset.sculpt;
      state.sculpts[key] = !state.sculpts[key];
      btn.classList.toggle("active", state.sculpts[key]);
      const chk = btn.querySelector(".chk-box");
      if (chk) chk.textContent = state.sculpts[key] ? "✓" : "✗";
      drawPlaque();
    });
  });

  // ── Color swatches ─────────────────────────────────────
  const swatches = [...document.querySelectorAll(".color-swatch")];
  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      state.activePigment = swatch.dataset.color;
      swatches.forEach(s => s.classList.toggle("active", s === swatch));
      const names = { geru: "Geru Red", yellow: "Pila Yellow", white: "Safed White", indigo: "Neel Indigo" };
      if (brushLabel) brushLabel.textContent = names[state.activePigment] || state.activePigment;
    });
  });

  // ── Bhatti firing ──────────────────────────────────────
  if (fireBtn) {
    fireBtn.addEventListener("click", () => {
      if (state.fired) return;
      fireBtn.disabled = true;
      if (fireOverlay) fireOverlay.classList.add("firing");
      if (statusTag) statusTag.textContent = "Status: Firing (30°C)…";
      let temp = 30;
      const interval = setInterval(() => {
        temp = Math.min(temp + 30, 900);
        if (tempDisplay)  tempDisplay.textContent  = `Furnace Temp (${temp}°C)`;
        if (tempProgress) tempProgress.style.width = `${(temp / 900) * 100}%`;
        if (statusTag)    statusTag.textContent    = `Status: Firing (${temp}°C)…`;
        if (temp >= 900) {
          clearInterval(interval);
          if (fireOverlay) fireOverlay.classList.remove("firing");
          state.fired = true;
          if (statusTag) { statusTag.textContent = "Status: Baked Terracotta ✓"; statusTag.className = "crafter-status-tag fired"; }
          if (successMsg) successMsg.style.display = "block";
          drawPlaque();
        }
      }, 80);
    });
  }

  // ── Reset ──────────────────────────────────────────────
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state = {
        deity: "devnarayan",
        sculpts: { halo: true, border: true, ornaments: false },
        paints:  { background: "unpainted", border: "unpainted", deity: "unpainted", halo: "unpainted" },
        activePigment: "geru",
        fired: false
      };
      deityCards.forEach(c => c.classList.toggle("active", c.dataset.deity === "devnarayan"));
      sculptBtns.forEach(b => {
        b.classList.toggle("active", state.sculpts[b.dataset.sculpt]);
        const chk = b.querySelector(".chk-box");
        if (chk) chk.textContent = state.sculpts[b.dataset.sculpt] ? "✓" : "✗";
      });
      swatches.forEach(s => s.classList.toggle("active", s.dataset.color === "geru"));
      if (brushLabel)   brushLabel.textContent    = "Geru Red";
      if (successMsg)   successMsg.style.display  = "none";
      if (statusTag)  { statusTag.textContent     = "Status: Wet Clay Base"; statusTag.className = "crafter-status-tag"; }
      if (tempDisplay)  tempDisplay.textContent   = "Room Temp (30°C)";
      if (tempProgress) tempProgress.style.width  = "0%";
      if (fireBtn)      fireBtn.disabled          = false;
      if (tempGauge)    tempGauge.style.display   = "none";
      if (stepBtns[0])  stepBtns[0].click();
      drawPlaque();
    });
  }

  // Expose for SPA redraw
  canvas._molelaRedraw = drawPlaque;

  // Initial render
  drawPlaque();
}

/* =========================================================
   2. SAVE TO JOURNEY
   ========================================================= */
function initJourneyIntegration() {
  const btn = document.getElementById("molela-bookmark-btn");
  if (!btn || btn._journeyInit) return;
  btn._journeyInit = true;

  const ITEM = {
    id:          "molela-clay-art",
    title:       "Molela Clay Art Explorer",
    explorerPage:"frontend/molela-clay-art-explorer/index.html",
    thumbnail:   "frontend/assets/traditional_attires.png",
    category:    "culture",
    description: "Explore Rajasthan's 800-year-old terracotta relief plaque tradition and craft your own votive plaque."
  };

  function syncUI() {
    const saved = window.Journey && window.Journey.isSaved(ITEM.id);
    btn.classList.toggle("saved", !!saved);
    btn.innerHTML = saved
      ? '<span class="bookmark-icon">♥</span> Saved to Journey'
      : '<span class="bookmark-icon">☆</span> Save to Journey';
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!window.Journey) {
      // Polite fallback toast
      showToast("Journey is loading — please try again in a moment.");
      return;
    }
    window.Journey.toggle(ITEM);
    syncUI();
  });

  // Poll for Journey to load then sync state
  let attempts = 30;
  (function poll() {
    if (window.Journey) { syncUI(); registerSearch(); return; }
    if (--attempts > 0) setTimeout(poll, 200);
  })();
}

function registerSearch() {
  if (!window.Journey || typeof window.Journey.registerSearchItems !== "function") return;
  window.Journey.registerSearchItems("frontend/molela-clay-art-explorer/index.html", [
    {
      id: "molela-main",
      title: "Molela Clay Art Explorer",
      description: "Explore Rajasthan's handcrafted terracotta relief plaques, Mewar potters, and the interactive plaque crafter.",
      link: "frontend/molela-clay-art-explorer/index.html"
    },
    {
      id: "molela-crafter",
      title: "Heritage Clay Plaque Crafter",
      description: "Mould deity reliefs, apply mineral slips, and fire terracotta in the bhatti kiln simulator.",
      link: "frontend/molela-clay-art-explorer/index.html#crafter-section"
    }
  ]);
}

/* =========================================================
   3. TAB NAVIGATION (scroll to section)
   ========================================================= */
function initTabs() {
  const tabs = [...document.querySelectorAll(".tab-btn")];
  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    if (tab._molelaTabBound) return;
    tab._molelaTabBound = true;

    tab.addEventListener("click", () => {
      const target = document.getElementById(tab.dataset.target);
      if (!target) return;

      // Update active state
      tabs.forEach(t => t.classList.toggle("active", t === tab));

      // Scroll — try the SPA container first, then fallback to window
      const offset = target.getBoundingClientRect().top + window.scrollY - 100;
      try {
        window.scrollTo({ top: offset, behavior: "smooth" });
      } catch (e) {
        window.scrollTo(0, offset);
      }
    });
  });

  // Scroll spy
  const sections = tabs.map(t => document.getElementById(t.dataset.target)).filter(Boolean);
  if (window._molelaScrollHandler) {
    window.removeEventListener("scroll", window._molelaScrollHandler);
  }
  window._molelaScrollHandler = () => {
    const sy = window.scrollY + 200;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= sy) current = s; });
    if (current) {
      tabs.forEach(t => t.classList.toggle("active", t.dataset.target === current.id));
    }
  };
  window.addEventListener("scroll", window._molelaScrollHandler, { passive: true });
}

/* =========================================================
   HELPERS
   ========================================================= */
function showToast(msg) {
  let toast = document.getElementById("molela-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "molela-toast";
    Object.assign(toast.style, {
      position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
      background: "#c2410c", color: "#fff", padding: "12px 24px", borderRadius: "8px",
      fontWeight: "600", zIndex: "9999", fontSize: "0.95rem",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)", transition: "opacity 0.4s"
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = "0"; }, 3000);
}

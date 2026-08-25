/* ================= DATA ================= */
const TRADE_PORTS = [
  { id: "muziris", name: "Muziris", x: 650, y: 420, type: "muziris", desc: "Legendary port of Kodungallur — gateway to ancient India's spice trade." },
  { id: "berenike", name: "Berenike", x: 280, y: 340, type: "roman", desc: "Roman Red Sea port — ships sailed 40 days to Muziris on monsoon winds." },
  { id: "alexandria", name: "Alexandria", x: 260, y: 280, type: "roman", desc: "Egyptian metropolis — redistributed Indian goods across the Roman Empire." },
  { id: "rome", name: "Rome", x: 200, y: 200, type: "roman", desc: "Imperial capital — consumed vast quantities of Malabar pepper and spices." },
  { id: "aden", name: "Aden", x: 380, y: 380, type: "arab", desc: "Arabian trading hub — intermediary between Rome and India." },
  { id: "hormuz", name: "Hormuz", x: 480, y: 340, type: "arab", desc: "Persian Gulf port — connected Mesopotamia to Indian Ocean trade." },
  { id: "guangzhou", name: "Guangzhou", x: 820, y: 280, type: "china", desc: "Chinese port — source of silk, porcelain, and tea traded westward." }
];

const TRADE_ROUTES = [
  { from: "muziris", to: "berenike", goods: "Pepper, ivory, beryl → Gold, wine, olive oil" },
  { from: "muziris", to: "aden", goods: "Spices, textiles → Frankincense, dates" },
  { from: "muziris", to: "hormuz", goods: "Pepper, gems → Horses, pearls" },
  { from: "muziris", to: "guangzhou", goods: "Spices, cotton → Silk, porcelain" },
  { from: "berenike", to: "alexandria", goods: "Indian goods transshipped" },
  { from: "alexandria", to: "rome", goods: "Spices, gems → Imperial markets" }
];

const TRADE_GOODS = [
  { name: "Black Pepper", icon: "🌶️", origin: "india", era: "sangam", desc: "Malabar's 'black gold' — Rome's most coveted import, worth its weight in silver." },
  { name: "Roman Gold Coins", icon: "🪙", origin: "roman", era: "roman", desc: "Aurei and denarii of Augustus, Tiberius, Nero — thousands found in Kerala hoards." },
  { name: "Cardamom", icon: "🌿", origin: "india", era: "sangam", desc: "Aromatic spice from the Western Ghats — prized in Roman cuisine and medicine." },
  { name: "Amphorae", icon: "🏺", origin: "roman", era: "roman", desc: "Mediterranean pottery vessels for wine and olive oil — thousands of sherds at Pattanam." },
  { name: "Silk", icon: "🧵", origin: "china", era: "medieval", desc: "Chinese luxury fabric transshipped through Muziris to Roman markets." },
  { name: "Ivory", icon: "🦷", origin: "india", era: "sangam", desc: "Elephant tusks from Kerala forests — carved into Roman luxury objects." },
  { name: "Frankincense", icon: "🌳", origin: "arab", era: "sangam", desc: "Arabian resin — burned in Roman temples and traded through Muziris." },
  { name: "Beryl & Gems", icon: "💎", origin: "india", era: "sangam", desc: "Precious stones from South Indian mines — exported to Mediterranean jewelers." },
  { name: "Chinese Celadon", icon: "🫖", origin: "china", era: "medieval", desc: "Song and Ming dynasty porcelain — evidence of East Asian trade connections." },
  { name: "Horses", icon: "🐎", origin: "arab", era: "medieval", desc: "Arabian warhorses — imported by Chera kings for cavalry." },
  { name: "Wine", icon: "🍷", origin: "roman", era: "roman", desc: "Italian wine in amphorae — consumed by Roman merchants and local elites." },
  { name: "Textiles", icon: "🧶", origin: "india", era: "medieval", desc: "Cotton and silk fabrics — Kerala's fine weaves exported across Asia." }
];

const CULTURE_SITES = {
  cheraman: {
    title: "Cheraman Juma Mosque (629 CE)",
    desc: "India's first mosque, built by Malik Dinar during Prophet Muhammad's lifetime. Traditional Kerala gabled architecture with an ancient brass oil lamp that has burned continuously for over 1,400 years. Legend says the Chera king Cheraman Perumal witnessed the splitting of the moon and traveled to Mecca to embrace Islam."
  },
  thomas: {
    title: "St. Thomas Church (52 CE)",
    desc: "Christian tradition holds that St. Thomas the Apostle landed at Azhikode near Kodungallur in 52 CE, establishing seven original churches in Kerala. This makes Indian Christianity 1,500 years older than European missionary activity. The current church stands on the site of the original foundation."
  },
  bhagavathy: {
    title: "Kodungallur Bhagavathy Temple",
    desc: "Ancient shrine dedicated to Goddess Bhadrakali/Kannaki, immortalized in the Tamil epic Silappatikaram by Prince Ilango Adigal. Famous for the vibrant Bharani festival (February–March) and Thalappoli procession, where thousands of women carry ceremonial lamps."
  },
  shiva: {
    title: "Thiruvanchikulam Shiva Temple",
    desc: "The ancestral temple of the Chera emperors and the only Shaivite Paadal Petra Sthalam (sacred shrine sung by Tamil saints) in Kerala. Associated with the great Nayanar saints Sundarar and Cheraman Perumal, who are said to have attained liberation here."
  },
  jewish: {
    title: "Ancient Jewish Quarter",
    desc: "Tradition records Jewish merchants settling in Kodungallur after the destruction of the Second Temple in Jerusalem (70 CE). They created a thriving Judeo-Malayalam culture, with synagogues and copper-plate grants from Chera kings granting trade privileges and religious freedom."
  }
};

const TIMELINE_EVENTS = [
  { year: "c. 300 BCE", title: "Sangam Era Begins", desc: "Muziris emerges as the primary spice port of the Chera dynasty. Tamil poets describe 'beautiful Yavana ships arriving with gold and leaving laden with pepper.'" },
  { year: "52 CE", title: "St. Thomas Arrives", desc: "According to Christian tradition, the Apostle Thomas lands at Azhikode near Kodungallur, establishing Christianity in India 1,500 years before European missionaries." },
  { year: "77 CE", title: "Pliny Writes of Muziris", desc: "Roman naturalist Pliny the Elder calls Muziris 'Primum Inscriptionis Emporium Indiae' (the first emporium of India) in his Natural History, while warning about nearby pirates." },
  { year: "2nd c. CE", title: "Peak Roman Trade", desc: "Massive hoards of Roman gold coins (aurei) and silver denarii flow into Muziris. The Muziris Papyrus documents a contract for goods worth 7 million sesterces." },
  { year: "629 CE", title: "Cheraman Mosque Built", desc: "Malik Dinar builds India's first mosque in Kodungallur during the lifetime of Prophet Muhammad, in traditional Kerala wood-and-tile architecture." },
  { year: "800–1124 CE", title: "Kulasekhara Dynasty", desc: "Kodungallur (Mahodayapuram) serves as the royal capital of the Second Chera Kingdom under patron kings like Kulasekhara Alvar, a great Vaishnava saint." },
  { year: "1341 CE", title: "The Great Periyar Flood", desc: "A catastrophic flood silts Muziris harbour permanently and creates the natural port of Cochin, altering Malabar's trade geography forever." },
  { year: "1523 CE", title: "Portuguese Build Fort", desc: "The Portuguese construct Kottappuram Fort (Cranganore Fort) to control the spice trade, later contested by the Dutch and Tipu Sultan." },
  { year: "2007–Present", title: "Pattanam Excavations", desc: "Kerala Council for Historical Research conducts systematic excavations, unearthing 2000-year-old canoes, Roman amphorae, and artifacts from 40+ maritime regions — confirming Muziris's global footprint." }
];

const GALLERY_ITEMS = [
  { img: "../../frontend/assets/kodungallur_port_banner.png", title: "Muziris Spice Emporium", cat: "Trade", desc: "Reconstruction of Roman galleys and Indian dhows trading spices at the Periyar delta." },
  { img: "../../frontend/assets/cheraman_juma_mosque.png", title: "Cheraman Juma Mosque", cat: "Heritage", desc: "India's first mosque (629 CE) in traditional Kerala gabled timber architecture." },
  { img: "../../frontend/assets/pattanam_excavation_canoe.png", title: "Pattanam Dugout Canoe", cat: "Archaeology", desc: "2000-year-old wooden canoe unearthed by KCHR, demonstrating ancient riverine navigation." }
];

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= STATE ================= */
const state = {
  goodsOrigin: "all",
  goodsEra: "all",
  activePort: null,
  currentCulture: null
};

/* ================= HELPERS ================= */
const $ = (id) => document.getElementById(id);
const escapeHtml = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function countUp(el, target, dur = 1400) {
  if (REDUCED) { el.textContent = target.toLocaleString("en-IN"); return; }
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString("en-IN");
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ================= TRADE MAP ================= */
function renderTradeMap() {
  const routesG = $("map-routes");
  const portsG = $("map-ports");
  
  TRADE_ROUTES.forEach((r) => {
    const from = TRADE_PORTS.find((p) => p.id === r.from);
    const to = TRADE_PORTS.find((p) => p.id === r.to);
    if (!from || !to) return;
    
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const dx = to.x - from.x, dy = to.y - from.y;
    const cx = from.x + dx / 2, cy = from.y + dy / 2 - 50;
    line.setAttribute("d", `M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`);
    line.setAttribute("class", "map-route");
    line.dataset.goods = r.goods;
    line.addEventListener("mouseenter", (e) => showRouteTooltip(e, r.goods));
    line.addEventListener("mouseleave", hideTooltip);
    routesG.appendChild(line);
  });

  TRADE_PORTS.forEach((p) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", `map-port ${p.type}`);
    g.setAttribute("transform", `translate(${p.x}, ${p.y})`);
    g.innerHTML = `<circle r="8"/><text y="-14">${escapeHtml(p.name)}</text>`;
    g.addEventListener("click", () => showPortTooltip(p));
    g.addEventListener("mouseenter", (e) => showPortTooltip(p, e));
    g.addEventListener("mouseleave", hideTooltip);
    portsG.appendChild(g);
  });
}

function showPortTooltip(port, e) {
  const tip = $("map-tooltip");
  tip.innerHTML = `<strong>${escapeHtml(port.name)}</strong><p>${escapeHtml(port.desc)}</p>`;
  tip.hidden = false;
  if (e) {
    const rect = $("trade-map").getBoundingClientRect();
    tip.style.left = (e.clientX - rect.left + 15) + "px";
    tip.style.top = (e.clientY - rect.top - 10) + "px";
  }
}

function showRouteTooltip(e, goods) {
  const tip = $("map-tooltip");
  tip.innerHTML = `<strong>Trade Route</strong><p>${escapeHtml(goods)}</p>`;
  tip.hidden = false;
  const rect = $("trade-map").getBoundingClientRect();
  tip.style.left = (e.clientX - rect.left + 15) + "px";
  tip.style.top = (e.clientY - rect.top - 10) + "px";
}

function hideTooltip() {
  $("map-tooltip").hidden = true;
}

/* ================= TRADE GOODS ================= */
function renderGoods() {
  const grid = $("goods-grid");
  const visible = TRADE_GOODS.filter((g) => {
    const originOk = state.goodsOrigin === "all" || g.origin === state.goodsOrigin;
    const eraOk = state.goodsEra === "all" || g.era === state.goodsEra;
    return originOk && eraOk;
  });

  grid.innerHTML = visible.map((g) => `
    <div class="goods-card">
      <span class="goods-icon">${g.icon}</span>
      <h3>${escapeHtml(g.name)}</h3>
      <p>${escapeHtml(g.desc)}</p>
      <div class="goods-meta">
        <span class="goods-tag">${escapeHtml(g.origin)}</span>
        <span class="goods-tag">${escapeHtml(g.era)}</span>
      </div>
    </div>
  `).join("");
}

/* ================= CULTURE MAP ================= */
function setupCultureMap() {
  document.querySelectorAll(".culture-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const site = pin.dataset.site;
      const info = CULTURE_SITES[site];
      if (!info) return;
      $("culture-title").textContent = info.title;
      $("culture-desc").textContent = info.desc;
      state.currentCulture = site;
    });
  });
}

/* ================= TIMELINE ================= */
function renderTimeline() {
  const axis = $("timeline-axis");
  axis.innerHTML = TIMELINE_EVENTS.map((e) => `
    <div class="tl-event">
      <div class="tl-year">${escapeHtml(e.year)}</div>
      <div class="tl-content">
        <h3>${escapeHtml(e.title)}</h3>
        <p>${escapeHtml(e.desc)}</p>
      </div>
    </div>
  `).join("");

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.2 });
  
  axis.querySelectorAll(".tl-event").forEach((el) => {
    REDUCED ? el.classList.add("in") : io.observe(el);
  });
}

/* ================= GALLERY ================= */
function renderGallery() {
  const grid = $("gallery-grid");
  grid.innerHTML = GALLERY_ITEMS.map((item) => `
    <div class="gallery-item" data-idx="${GALLERY_ITEMS.indexOf(item)}">
      <img src="${item.img}" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="gallery-overlay">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.cat)}</p>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => openLightbox(+item.dataset.idx));
  });
}

function openLightbox(idx) {
  const item = GALLERY_ITEMS[idx];
  if (!item) return;
  $("lightbox-img").src = item.img;
  $("lightbox-cat").textContent = item.cat;
  $("lightbox-title").textContent = item.title;
  $("lightbox-desc").textContent = item.desc;
  $("lightbox").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  $("lightbox").hidden = true;
  document.body.style.overflow = "";
}

/* ================= THEME ================= */
function setupTheme() {
  const btn = $("theme-toggle");
  if (!btn) return;
  const sync = () => { btn.textContent = document.body.classList.contains("light-theme") ? "🌞" : "🌙"; };
  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    try {
      const store = JSON.parse(localStorage.getItem("iie_storage") || "{}");
      store.theme = isLight ? "light" : "dark";
      localStorage.setItem("iie_storage", JSON.stringify(store));
    } catch {}
    sync();
  });
  sync();
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  document.querySelectorAll("[data-count]").forEach((el) => countUp(el, +el.dataset.count));

  renderTradeMap();
  renderGoods();
  setupCultureMap();
  renderTimeline();
  renderGallery();

  // Goods filters
  $("goods-origins").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    $("goods-origins").querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    state.goodsOrigin = btn.dataset.origin;
    renderGoods();
  });

  $("goods-eras").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    $("goods-eras").querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    state.goodsEra = btn.dataset.era;
    renderGoods();
  });

  // Lightbox
  $("lightbox").addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeLightbox();
  });
  addEventListener("keydown", (e) => {
    if ($("lightbox").hidden) return;
    if (e.key === "Escape") closeLightbox();
  });

  // Back to top
  const topBtn = $("btn-top");
  addEventListener("scroll", () => topBtn.classList.toggle("show", scrollY > 600), { passive: true });
  topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));
});
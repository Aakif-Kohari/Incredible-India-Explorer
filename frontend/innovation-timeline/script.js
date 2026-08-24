document.addEventListener("DOMContentLoaded", () => {
  /* ================= DATA ================= */
  const ERAS = {
    ancient:  { label: "Ancient",  sub: "5000 BCE – 700 CE",  color: "#e8833a" },
    medieval: { label: "Medieval", sub: "700 – 1700",          color: "#e2b02f" },
    modern:   { label: "Modern",   sub: "1700s – 1990s",       color: "#4fb86a" },
    space:    { label: "Space",    sub: "1963 – today",        color: "#7fb4ff" },
    digital:  { label: "Digital",  sub: "1990s – today",       color: "#4fd8c4" }
  };

  const DATA = [
    { id: "cotton", year: -5000, label: "c. 5000 BCE", era: "ancient", icon: "🧵", title: "Cotton Cultivation & Weaving",
      desc: "India was the first civilisation to cultivate cotton and spin it into thread — millennia before the rest of the world.",
      full: "Archaeological evidence from Mehrgarh and the Indus Valley shows cotton threads and spindle whorls thousands of years old. For centuries, India remained the world's textile workshop — muslin, calico and chintz sailed to Rome, Arabia and Southeast Asia.",
      facts: ["The oldest known cotton fragments were found at Mohenjo-daro", "Roman traders called Indian muslin 'woven wind'", "Words like 'calico' trace back to Indian ports"] },
    { id: "lothal", year: -2400, label: "c. 2400 BCE", era: "ancient", icon: "⚓", title: "Lothal — The World's First Dockyard",
      desc: "The Harappan port city in Gujarat engineered the earliest known tidal dockyard, linking India to Mesopotamia by sea.",
      full: "Lothal's basin measured roughly 218 × 123 feet, with an inlet channel and lock-like design that kept ships afloat even at low tide. The city also hosted one of the earliest known bead-making workshops.",
      facts: ["Trade routes reached Dilmun (Bahrain) and Mesopotamia", "Persian Gulf–style seals were found at the site", "The inlet was designed to avoid silt deposition"] },
    { id: "ayurveda", year: -1500, label: "c. 1500 BCE", era: "ancient", icon: "🌿", title: "Ayurveda",
      desc: "One of the world's oldest medical systems — a holistic science of body, diet and lifestyle codified in the great Samhitas.",
      full: "Rooted in the Vedic tradition and codified by Charaka and Sushruta, Ayurveda systematised diagnosis, dietetics, surgery and pharmacology. Its eight branches (Ashtanga) covered everything from paediatrics to toxicology.",
      facts: ["The Charaka Samhita catalogued over 1,000 remedies", "It described digestion, immunity and metabolism concepts remarkably early", "Hundreds of millions still practise it today"] },
    { id: "sushruta", year: -600, label: "c. 600 BCE", era: "ancient", icon: "🩺", title: "Sushruta & Plastic Surgery",
      desc: "The 'father of surgery' described 300+ procedures and 120 instruments — including rhinoplasty, still used in essence today.",
      full: "The Sushruta Samhita detailed cataract surgery, fracture treatment and reconstruction of the nose using forehead skin flaps. These techniques travelled to Europe through Arabic translations and influenced modern plastic surgery.",
      facts: ["Modern rhinoplasty still echoes his forehead-flap method", "He described eight kinds of surgical knives", "Trainees practised on fruits and animal bladders first"] },
    { id: "wootz", year: -300, label: "c. 300 BCE", era: "ancient", icon: "⚔️", title: "Wootz Steel",
      desc: "India's crucible-forged ultra-hard steel crossed oceans to become the legendary Damascus blade.",
      full: "Wootz was smelted in sealed clay crucibles to a carbon structure European furnaces could not match for some 1,800 years. Microscopic studies of surviving blades have even revealed carbon nanotubes.",
      facts: ["Exported to Arabia, Rome and China", "Damascus swords were forged from Indian wootz ingots", "A 2006 study found carbon nanotubes inside a 17th-century blade"] },
    { id: "iron-pillar", year: 402, label: "c. 402 CE", era: "ancient", icon: "🏛️", title: "The Iron Pillar of Delhi",
      desc: "A 7-metre, 6-tonne Gupta-era iron pillar that has barely rusted in 1,600 years.",
      full: "Erected near the time of Chandragupta II, the pillar resists corrosion thanks to its high phosphorus content and Delhi's wet–dry cycles, which form a protective crystalline film called misawite — an accidental masterpiece of metallurgy.",
      facts: ["Made of roughly 98% pure wrought iron", "It stands in the Qutub complex at Mehrauli", "Modern metallurgists still study its protective film"] },
    { id: "chaturanga", year: 550, label: "c. 550 CE", era: "ancient", icon: "♟️", title: "Chaturanga — The Birth of Chess",
      desc: "The Gupta-era war game Chaturanga travelled to Persia and beyond, evolving into modern chess.",
      full: "Chaturanga modelled the four divisions of the Indian army — infantry, cavalry, elephants and chariots. It became Persian chatrang, then Arabic shatranj, and reached Europe by the 10th century.",
      facts: ["'Checkmate' descends from Persian 'shah mat' — the king is helpless", "The 8×8 board was already standard", "Dice-driven variants existed even earlier"] },
    { id: "zero", year: 628, label: "628 CE", era: "ancient", icon: "♾️", title: "Zero & the Place-Value System",
      desc: "Brahmagupta gave zero its rules; Indian numerals gave the world the arithmetic it still runs on.",
      full: "Aryabhata's place-value system (499 CE) and Brahmagupta's Brahmasphutasiddhanta (628 CE) — which defined arithmetic with zero and negative numbers — created the number system every calculator and computer inherits.",
      facts: ["Laplace: 'It is India that gave us the ingenious method of expressing all numbers by ten signs'", "The digits travelled via Baghdad to Europe as 'Arabic numerals'", "'Algorithm' honours al-Khwarizmi, who popularised Indian mathematics"] },
    { id: "kailasa", year: 760, label: "c. 760 CE", era: "medieval", icon: "⛰️", title: "Kailasa Temple, Ellora",
      desc: "The world's largest monolithic structure — carved top-down from a single basalt cliff, removing ~200,000 tonnes of rock.",
      full: "Built under Rashtrakuta king Krishna I, Cave 16 was sculpted roof-first, floor-last — a feat of reverse engineering that still amazes architects. Sculpture and architecture fuse at a scale never repeated.",
      facts: ["Carved from one continuous rock mass", "Estimates suggest ~18 years of continuous work", "It remains the largest monolithic monument on Earth"] },
    { id: "numerals", year: 825, label: "c. 825 CE", era: "medieval", icon: "🔢", title: "Indian Numerals Go Global",
      desc: "Al-Khwarizmi's Baghdad treatise carried Indian digits westward; Fibonacci delivered them to Europe in 1202.",
      full: "'On the Calculation with Hindu Numerals' transmitted Indian place-value arithmetic to the Islamic world. Four centuries later, Fibonacci's Liber Abaci persuaded Europe to abandon cumbersome Roman numerals.",
      facts: ["The 0–9 digits you are reading are Indian in origin", "The word 'algorithm' derives from al-Khwarizmi's name", "Liber Abaci helped spark Europe's commercial revolution"] },
    { id: "zinc", year: 1300, label: "c. 12th–14th c.", era: "medieval", icon: "⚗️", title: "Industrial Zinc Smelting at Zawar",
      desc: "Rajasthan's Zawar mines produced zinc at industrial scale centuries before Europe — using ingenious downward distillation.",
      full: "Zinc boils at 907 °C and escapes as vapour, making it notoriously hard to smelt. Zawar metallurgists solved this with sealed crucibles and inverted condensation — a process Europe only replicated in the 18th century.",
      facts: ["The earliest known industrial zinc production anywhere", "Hundreds of smelting retorts were excavated at Zawar", "Mewar zinc was traded across Asia"] },
    { id: "madhava", year: 1400, label: "c. 1400 CE", era: "medieval", icon: "📐", title: "Madhava & the Infinite Series",
      desc: "The Kerala School discovered infinite series for sine, cosine and π — about 250 years before Newton and Leibniz.",
      full: "Madhava of Sangamagrama derived series expansions that Europe later credited to Gregory, Leibniz and Taylor. The Yuktibhasa (c. 1530) supplied rigorous proofs for these results.",
      facts: ["The π series bears his name: Madhava–Leibniz", "Series for sine and cosine appear in the Yuktibhasa", "Kerala's astronomy-mathematics school flourished for 300 years"] },
    { id: "mysorean-rockets", year: 1780, label: "c. 1780", era: "modern", icon: "🎆", title: "Mysorean Iron Rockets",
      desc: "Hyder Ali and Tipu Sultan fielded the world's first iron-cased war rockets — technology the British then copied.",
      full: "Mysorean rockets used hammered iron tubes rather than bamboo, reaching up to ~2 km. After the Anglo-Mysore wars, the British reverse-engineered them into Congreve rockets — later fired on Baltimore and immortalised in the US national anthem.",
      facts: ["Tipu maintained dedicated rocket brigades", "'The rockets' red glare' traces back to Mysore tech", "Originals survive in London's Royal Armouries"] },
    { id: "jc-bose", year: 1895, label: "1894–95", era: "modern", icon: "📡", title: "J.C. Bose & Wireless Waves",
      desc: "Two years before Marconi's fame, Bose publicly demonstrated millimetre-wave radio in Calcutta — and refused to patent it.",
      full: "Bose rang a bell and ignited gunpowder across a room using microwaves, and built crystal detectors that anticipated semiconductor diodes. He then turned to botany, proving that plants respond to stimuli.",
      facts: ["The IEEE lists him among the fathers of radio science", "His 1901 paper foreshadowed semiconductor junctions", "He chose open science over patents"] },
    { id: "raman", year: 1928, label: "1928", era: "modern", icon: "💡", title: "The Raman Effect",
      desc: "C.V. Raman discovered that light can scatter with a changed wavelength — earning Asia's first science Nobel in 1930.",
      full: "The discovery was made in Calcutta with modest instruments. Raman spectroscopy now identifies molecules in chemistry labs, hospitals and even Mars rovers. India marks the discovery every 28 February as National Science Day.",
      facts: ["First Nobel Prize in the sciences for an Asian", "Raman's curiosity began with the blue of the sea, seen from a ship", "The effect rides on Mars missions today"] },
    { id: "kapany", year: 1954, label: "1954", era: "modern", icon: "🔦", title: "Fibre Optics — Narinder Singh Kapany",
      desc: "Kapany demonstrated light bending through glass fibres and coined the term 'fiber optics' — the backbone of today's internet.",
      full: "Working at Imperial College London, Kapany showed that images could travel through bundles of glass fibres. His 1960 Scientific American article ignited worldwide research; today nearly all intercontinental data travels through glass.",
      facts: ["Known worldwide as the 'Father of Fibre Optics'", "His work enabled medical endoscopes", "Undersea cables carry ~99% of international data"] },
    { id: "green-revolution", year: 1966, label: "1960s", era: "modern", icon: "🌾", title: "The Green Revolution",
      desc: "High-yield varieties and scientific farming turned ship-to-mouth India into a food-surplus nation within a decade.",
      full: "Led by M.S. Swaminathan using Norman Borlaug's wheat genetics, the revolution transformed Punjab, Haryana and western UP. Wheat output roughly doubled by the early 1970s, ending dependence on food imports.",
      facts: ["India became self-sufficient in foodgrains by the mid-1970s", "Swaminathan later championed a sustainable 'Evergreen Revolution'", "Today's buffer stocks feed 800 million people under welfare schemes"] },
    { id: "isro", year: 1969, label: "1969", era: "modern", icon: "🚀", title: "ISRO Is Born",
      desc: "Founded on 15 August 1969, ISRO grew from a church-town launch pad into the world's most cost-effective space agency.",
      full: "Under Vikram Sarabhai's vision, space was for the people — telemedicine, village television, weather and navigation. From sounding rockets at Thumba, ISRO now launches satellites for the entire world.",
      facts: ["The first launch pad was a church in Thumba, Kerala", "PSLV's record string of successes made it a global workhorse", "ISRO matches major milestones at a fraction of NASA's budget"] },
    { id: "param", year: 1991, label: "1991", era: "modern", icon: "🖥️", title: "PARAM 8000 — Indigenous Supercomputer",
      desc: "When supercomputers were denied to India, C-DAC built its own in three years — PARAM, the 'supreme'.",
      full: "The Cray embargo became India's opportunity. Vijay Bhatkar's team delivered PARAM 8000 in 1991, benchmarked it in Zurich, and exported machines to Germany and Russia — launching a supercomputing lineage that continues today.",
      facts: ["Built after a Cray import was denied", "'Param' means supreme in Sanskrit", "Successor PARAM Siddhi-AI ranks among the world's top AI supercomputers"] },
    { id: "usb", year: 1996, label: "1996", era: "digital", icon: "🔌", title: "USB — Ajay Bhatt",
      desc: "The universal port on nearly every device was architected by an Intel team led by Indian-born Ajay Bhatt.",
      full: "Bhatt's team designed USB to end the chaos of incompatible cables. USB 1.0 shipped in 1996; today billions of devices — keyboards to spacecraft test rigs — connect through it.",
      facts: ["Ajay Bhatt starred in Intel's 'Rock Star' ad campaign", "USB-C now carries power, video and data in one port", "Billions of USB devices ship every year"] },
    { id: "aryabhata-sat", year: 1975, label: "1975", era: "space", icon: "🛰️", title: "Aryabhata — First Indian Satellite",
      desc: "Named after the astronomer, India's first satellite lifted off from Kapustin Yar, built in a record three years.",
      full: "Aryabhata carried X-ray astronomy and solar physics experiments, giving Indian scientists their first orbital datasets and announcing India's arrival in the space age.",
      facts: ["Launched on 19 April 1975 on a Soviet rocket", "Built at Peenya, Bengaluru", "Its image appeared on Indian stamps"] },
    { id: "rakesh-sharma", year: 1984, label: "1984", era: "space", icon: "👨‍🚀", title: "Rakesh Sharma — First Indian in Space",
      desc: "Aboard Soyuz T-11, Sharma spent 8 days in orbit — and answered the Prime Minister with 'Saare Jahan Se Achha'.",
      full: "The IAF pilot-turned-cosmonaut conducted remote sensing and materials experiments in orbit. His poetic reply when asked how India looked from space became the mission's defining moment.",
      facts: ["The first Indian to travel to space", "India became the 14th nation to send a human to orbit", "He carried out Earth-observation experiments"] },
    { id: "chandrayaan-1", year: 2008, label: "2008", era: "space", icon: "🌙", title: "Chandrayaan-1 — Water on the Moon",
      desc: "India's first lunar probe confirmed water molecules on the Moon's surface, rewriting lunar science.",
      full: "The orbiter's Moon Mineralogy Mapper detected hydroxyl and water signatures across sunlit lunar soil. Chandrayaan-1 operated for 312 days, mapping the entire Moon in high resolution.",
      facts: ["Built on a budget of about ₹386 crore", "NASA confirmed the landmark water finding", "The Moon Impact Probe carried the tricolour to the surface"] },
    { id: "mangalyaan", year: 2013, label: "2013", era: "space", icon: "🔴", title: "Mangalyaan — Mars on a Budget",
      desc: "India reached Mars orbit on the very first attempt, for ₹450 crore — less than the Hollywood film 'Gravity'.",
      full: "The Mars Orbiter Mission made India the first nation to succeed on its maiden interplanetary attempt, and the first Asian nation to reach Martian orbit. Its colour images and methane-sniffing camera made global headlines.",
      facts: ["The '₹7 per km' meme went viral — and it was nearly true", "Designed for six months, it worked for over eight years", "It made India the first nation to reach Mars on attempt one"] },
    { id: "aadhaar", year: 2009, label: "2009", era: "digital", icon: "🆔", title: "Aadhaar — World's Largest ID System",
      desc: "A 12-digit biometric identity for 1.4 billion people — the backbone of India's digital welfare state.",
      full: "Aadhaar turned identity into infrastructure: direct benefit transfers that cut leakage, instant KYC, and the foundation on which UPI's boom was built — all at a per-person cost famously cheaper than a cup of coffee.",
      facts: ["Covers roughly 99% of Indian adults", "Direct benefit transfers have saved over ₹3 lakh crore in leakages", "It is the largest biometric database on Earth"] },
    { id: "digital-india", year: 2015, label: "2015", era: "digital", icon: "📱", title: "Digital India",
      desc: "A national mission to connect villages, digitise governance and build India Stack — the world's largest open digital platform.",
      full: "Built on the Jan Dhan–Aadhaar–Mobile trinity, Digital India powered UPI, DigiLocker and fast digital payments, pulling hundreds of millions of citizens into the formal digital economy.",
      facts: ["India Stack is now open-sourced for other nations", "Internet users in India crossed 800 million", "E-governance services now serve 1.4 billion citizens"] },
    { id: "upi", year: 2016, label: "2016", era: "digital", icon: "💳", title: "UPI — Real-Time Payments for All",
      desc: "The Unified Payments Interface turned every phone into a bank branch — India now runs over half the world's real-time digital payments.",
      full: "Built by NPCI on the rails of Aadhaar and mobile, UPI enabled instant, free account-to-account transfers. From street vendors to temples, it digitised cash at a scale no other nation has matched.",
      facts: ["131 billion transactions were processed in 2023 alone", "UPI-linked systems are being adopted by other countries", "Core transactions remain free for users and merchants"] },
    { id: "chandrayaan-3", year: 2023, label: "2023", era: "space", icon: "🌕", title: "Chandrayaan-3 — Touching the Lunar South Pole",
      desc: "India became the first nation to soft-land near the Moon's south pole — and only the fourth to land at all.",
      full: "Vikram and Pragyan landed at Shiv Shakti Point on 23 August 2023, watched live by a nation. The mission's temperature profiles, hop experiment and planted tricolour made history.",
      facts: ["The mission cost about ₹615 crore", "23 August is now celebrated as National Space Day", "Vikram later 'hopped' across the surface on command"] }
  ].sort((a, b) => a.year - b.year);

  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ================= STATE & ELEMENTS ================= */
  let activeEra = "all", query = "", visible = [], modalIndex = -1, lastFocused = null;

  const $ = (id) => document.getElementById(id);
  const timeline = $("timeline"), progressEl = $("tl-progress"), emptyState = $("empty-state");
  const modal = $("detail-modal");
  const escapeHtml = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const fmtYear = (y) => (y < 0 ? Math.abs(y).toLocaleString("en-IN") + " BCE" : y + " CE");

  /* ================= RENDER ================= */
  function applyFilter() {
    const q = query.trim().toLowerCase();
    visible = DATA.filter((d) =>
      (activeEra === "all" || d.era === activeEra) &&
      (!q || (d.title + " " + d.desc + " " + d.label + " " + ERAS[d.era].label).toLowerCase().includes(q))
    );
  }

  function renderTimeline() {
    applyFilter();
    timeline.querySelectorAll(".t-item").forEach((el) => el.remove());
    emptyState.hidden = visible.length > 0;
    $("result-count").textContent = `${visible.length} / ${DATA.length} shown`;

    visible.forEach((d, i) => {
      const item = document.createElement("article");
      item.className = `t-item era-${d.era} ${i % 2 === 1 ? "right" : ""}`;
      item.style.setProperty("--delay", Math.min(i * 70, 420) + "ms");
      item.innerHTML = `
        <div class="t-node" style="--ec:${ERAS[d.era].color}"><span class="t-dot"></span></div>
        <div class="t-card">
          <div class="t-card-top">
            <span class="t-icon">${d.icon}</span>
            <div><span class="t-year">${escapeHtml(d.label)}</span><span class="t-era">${ERAS[d.era].label} · ${ERAS[d.era].sub}</span></div>
          </div>
          <h3>${escapeHtml(d.title)}</h3>
          <p>${escapeHtml(d.desc)}</p>
          <button class="t-more" data-open="${d.id}">Explore <span>→</span></button>
        </div>`;
      timeline.appendChild(item);
    });
    observeItems();
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  function observeItems() {
    timeline.querySelectorAll(".t-item").forEach((el) => REDUCED ? el.classList.add("in") : io.observe(el));
  }

  /* ================= SPINE PROGRESS ================= */
  function onScroll() {
    const r = timeline.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight * 0.65 - r.top) / Math.max(r.height, 1), 0), 1);
    progressEl.style.height = (p * 100) + "%";
    $("btn-top").classList.toggle("show", scrollY > 600);
  }
  addEventListener("scroll", onScroll, { passive: true });

  /* ================= MODAL ================= */
  function fillModal() {
    const d = visible[modalIndex];
    if (!d) return;
    modal.querySelector(".modal-card").style.setProperty("--ec", ERAS[d.era].color);
    $("modal-icon").textContent = d.icon;
    $("modal-era").textContent = ERAS[d.era].label;
    $("modal-year").textContent = d.label;
    $("modal-title").textContent = d.title;
    $("modal-body").innerHTML = `
      <p>${escapeHtml(d.full)}</p>
      <h4>Key Facts</h4>
      <ul>${d.facts.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}</ul>`;
    $("modal-counter").textContent = `${modalIndex + 1} / ${visible.length}`;
    $("modal-prev").disabled = modalIndex === 0;
    $("modal-next").disabled = modalIndex === visible.length - 1;
  }

  function openModal(id, trigger) {
    modalIndex = visible.findIndex((d) => d.id === id);
    if (modalIndex < 0) return;
    lastFocused = trigger || document.activeElement;
    fillModal();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  timeline.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) openModal(btn.dataset.open, btn);
  });
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  $("modal-prev").addEventListener("click", () => { if (modalIndex > 0) { modalIndex--; fillModal(); } });
  $("modal-next").addEventListener("click", () => { if (modalIndex < visible.length - 1) { modalIndex++; fillModal(); } });
  addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft" && modalIndex > 0) { modalIndex--; fillModal(); }
    if (e.key === "ArrowRight" && modalIndex < visible.length - 1) { modalIndex++; fillModal(); }
  });

  /* ================= CONTROLS ================= */
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeEra = chip.dataset.era;
      renderTimeline();
    });
  });

  let searchTimer;
  $("search-input").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { query = e.target.value; renderTimeline(); }, 160);
  });

  // counts on chips
  $("count-all").textContent = DATA.length;
  Object.keys(ERAS).forEach((era) => {
    const el = $("count-" + era);
    if (el) el.textContent = DATA.filter((d) => d.era === era).length;
  });

  /* ================= HERO ANIMATIONS ================= */
  function countUp(el, to, suffix = "") {
    if (REDUCED) { el.textContent = to.toLocaleString("en-IN") + suffix; return; }
    const t0 = performance.now(), dur = 1600;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function runYearCounter() {
    const el = $("year-counter"), from = -5000, to = 2024;
    if (REDUCED) { el.textContent = fmtYear(to); return; }
    const t0 = performance.now(), dur = 2800;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 2);
      el.textContent = fmtYear(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ================= THEME ================= */
  const themeBtn = $("theme-toggle");
  function syncThemeIcon() { themeBtn.textContent = document.body.classList.contains("light-theme") ? "🌞" : "🌙"; }
  themeBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    try {
      const store = JSON.parse(localStorage.getItem("iie_storage") || "{}");
      store.theme = isLight ? "light" : "dark";
      localStorage.setItem("iie_storage", JSON.stringify(store));
    } catch (e) {}

    
    syncThemeIcon();
  });

  /* ================= BACK TO TOP & INIT ================= */
  $("btn-top").addEventListener("click", () => scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));


  syncThemeIcon();
  renderTimeline();
  onScroll();
  countUp($("stat-items"), DATA.length);
  countUp($("stat-eras"), Object.keys(ERAS).length);
  countUp($("stat-span"), 7000, "+");
  runYearCounter();
});
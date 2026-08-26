/**
 * script.js
 * Indo-Greek Coins & Royal Portraits Explorer Logic (#2078)
 */

(function () {
  'use strict';

  // RULERS & COINS DATASET
  const RULERS_DATA = [
    {
      id: "menander-1",
      name: "Menander I Soter (King Milinda)",
      reign: "c. 165 – 130 BCE",
      capital: "Sagala (Sialkot)",
      bio: "The most celebrated Indo-Greek monarch. He embraced Buddhism after discussions with sage Nagasena (recorded in Milindapanha) and minted bilingual silver & bronze coins across Gandhara and Punjab.",
      denomination: "Silver Drachm",
      metal: "Silver (2.45 grams)",
      region: "Gandhara & Taxila",
      connection: "Greco-Buddhist Patronage",
      greekText: "ΒΑΣΙΛΕΩΣ ΣΩΤΗΡΟΣ ΜΕΝΑΝΔΡΟΥ",
      greekTrans: "\"Of King Menander, the Saviour\"",
      kharosthiText: "Maharajasa Tratarasa Menandrasa",
      kharosthiTrans: "\"Great King Menander, the Saviour (Prakrit in Kharosthi)\"",
      obverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#9ca3af"/><path d="M 60,110 C 60,60 140,60 140,110 C 130,130 110,140 100,140 C 90,140 70,130 60,110 Z" fill="#4b5563"/><path d="M 70,70 L 130,70 L 120,60 L 80,60 Z" fill="#fbbf24"/><text x="100" y="175" font-size="10" font-weight="bold" fill="#1f2937" text-anchor="middle">BASILEOS MENANDROU</text></svg>`,
      reverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#9ca3af"/><path d="M 100,40 L 120,90 L 80,90 Z" fill="#374151"/><line x1="100" y1="90" x2="100" y2="150" stroke="#374151" stroke-width="6"/><circle cx="85" cy="70" r="10" fill="#fbbf24"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#1f2937" text-anchor="middle">Maharajasa Tratarasa</text></svg>`,
      portraitNotes: "Features helmeted bust turned right, showing diadem ties hanging behind hair, sharp Hellenistic jawline, and naturalistic ear details.",
      territoryPoints: "140,70 340,50 500,160 400,320 180,300",
      territoryLabel: "Menander I Realm (Kabul to Punjab & Mathura)",
      territoryMints: "Taxila, Pushkalavati, Sagala, Alexandria in Caucasus"
    },
    {
      id: "demetrius-1",
      name: "Demetrius I Aniketos (The Invincible)",
      reign: "c. 200 – 180 BCE",
      capital: "Bactra / Taxila",
      bio: "Son of Euthydemus I. He led the Greek invasion into northwestern India following the fall of the Mauryan Empire, famous for wearing an elephant-scalp helmet symbolizing conquest of India.",
      denomination: "Silver Tetradrachm",
      metal: "Silver (16.8 grams)",
      region: "Bactria & Arachosia",
      connection: "Initial Indian Expedition",
      greekText: "ΒΑΣΙΛΕΩΣ ΑΝΙΚΗΤΟΥ ΔΗΜΗΤΡΙΟΥ",
      greekTrans: "\"Of Invincible King Demetrius\"",
      kharosthiText: "Maharajasa Aparajitasa Dimetriya",
      kharosthiTrans: "\"Great Invincible King Demetrius\"",
      obverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#d1d5db"/><path d="M 60,110 C 60,60 140,60 140,110 C 130,140 70,140 60,110 Z" fill="#374151"/><path d="M 60,60 Q 100,20 140,60 Q 100,40 60,60 Z" fill="#9a3412"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#111827" text-anchor="middle">DEMETRIOU ANIKETOU</text></svg>`,
      reverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#d1d5db"/><circle cx="100" cy="90" r="30" fill="#4b5563"/><line x1="100" y1="120" x2="100" y2="160" stroke="#374151" stroke-width="8"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#111827" text-anchor="middle">Herakles Standing</text></svg>`,
      portraitNotes: "Famous elephant-scalp cap with trunk curving upward over forelock, representing victory over Indian elephant forces.",
      territoryPoints: "120,40 380,30 460,140 320,260 150,220",
      territoryLabel: "Demetrius I Realm (Bactria to Taxila)",
      territoryMints: "Bactra, Taxila, Kapisa"
    },
    {
      id: "eucratides-1",
      name: "Eucratides I Megas (The Great)",
      reign: "c. 170 – 145 BCE",
      capital: "Ai-Khanoum / Bactra",
      bio: "Usurped the Bactrian throne from Euthydemids. Issued the largest gold coin of antiquity (20-stater medallion weighing 169g) depicting the Dioscuri twins on horseback.",
      denomination: "Gold 20-Stater / Silver Tetradrachm",
      metal: "Gold / Silver",
      region: "Bactria & Paropamisadae",
      connection: "Greco-Bactrian Imperial Power",
      greekText: "ΒΑΣΙΛΕΩΣ ΜΕΓΑΛΟΥ ΕΥΚΡΑΤΙΔΟΥ",
      greekTrans: "\"Of the Great King Eucratides\"",
      kharosthiText: "Maharajasa Mahatakasa Evukratidasa",
      kharosthiTrans: "\"Great King Eucratides\"",
      obverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#fbbf24"/><path d="M 60,110 C 60,60 140,60 140,110 C 130,130 110,140 100,140 Z" fill="#92400e"/><path d="M 50,70 L 150,70 L 100,30 Z" fill="#b45309"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#78350f" text-anchor="middle">EUKRATIDOU MEGALOU</text></svg>`,
      reverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#fbbf24"/><path d="M 60,90 L 140,90 L 120,130 L 80,130 Z" fill="#78350f"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#78350f" text-anchor="middle">Dioscuri on Horseback</text></svg>`,
      portraitNotes: "Helmeted bust wearing crested Boeotian helmet decorated with bull's horn and ear.",
      territoryPoints: "160,30 400,20 440,120 300,200 180,160",
      territoryLabel: "Eucratides Realm (Ai-Khanoum to Gandhara)",
      territoryMints: "Ai-Khanoum, Bactra, Kapisa"
    },
    {
      id: "agathocles",
      name: "Agathocles Dikaios (The Just)",
      reign: "c. 190 – 180 BCE",
      capital: "Taxila / Paropamisadae",
      bio: "Famous for issuing extraordinary bilingual commemorative coins depicting Hindu deities Balarama (with plow & mace) and Vasudeva-Krishna (with conch & chakra) — the earliest known depiction of Hindu gods on coins.",
      denomination: "Silver & Bronze Commemorative",
      metal: "Silver / Nickel",
      region: "Gandhara & Taxila",
      connection: "Earliest Vaishnava Deities on Coinage",
      greekText: "ΒΑΣΙΛΕΩΣ ΑΓΑΘΟΚΛΕΟΥΣ ΔΙΚΑΙΟΥ",
      greekTrans: "\"Of King Agathocles, the Just\"",
      kharosthiText: "Akathukreyasa / Rajane Agathukleyasa",
      kharosthiTrans: "\"King Agathocles (Brahmi & Kharosthi Script)\"",
      obverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#cbd5e1"/><path d="M 80,50 L 120,50 L 120,130 L 80,130 Z" fill="#334155"/><circle cx="100" cy="70" r="15" fill="#f59e0b"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">Vasudeva Krishna with Chakra</text></svg>`,
      reverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#cbd5e1"/><path d="M 70,60 L 130,60 L 100,140 Z" fill="#1e293b"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">Balarama with Gadha & Hala</text></svg>`,
      portraitNotes: "Bilingual coins feature six ancient Indian kings as well as Hindu deities in Indian attire.",
      territoryPoints: "200,80 350,60 420,160 310,240 220,200",
      territoryLabel: "Agathocles Realm (Paropamisadae & Taxila)",
      territoryMints: "Taxila, Pushkalavati"
    },
    {
      id: "antimachus-1",
      name: "Antimachus I Theos (The Divine)",
      reign: "c. 185 – 170 BCE",
      capital: "Bactria",
      bio: "Ruler known for his cheerful portrait wearing a distinctive flat kausia cap (traditional Macedonian sun hat) and issuing silver tetradrachms featuring Poseidon holding a trident.",
      denomination: "Silver Tetradrachm",
      metal: "Silver (16.9 grams)",
      region: "Bactria",
      connection: "Macedonian Kausia Cap Iconography",
      greekText: "ΒΑΣΙΛΕΩΣ ΘΕΟΥ ΑΝΤΙΜΑΧΟΥ",
      greekTrans: "\"Of God-King Antimachus\"",
      kharosthiText: "Maharajasa Dhavasa Antimakhasa",
      kharosthiTrans: "\"Great Divine King Antimachus\"",
      obverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#e2e8f0"/><ellipse cx="100" cy="55" rx="55" ry="15" fill="#475569"/><path d="M 65,70 C 65,120 135,120 135,70 Z" fill="#334155"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">ANTIMACHOU THEOU</text></svg>`,
      reverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="90" fill="#e2e8f0"/><line x1="100" y1="40" x2="100" y2="150" stroke="#0f172a" stroke-width="6"/><path d="M 85,50 L 100,30 L 115,50 Z" fill="#0f172a"/><text x="100" y="175" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">Poseidon with Trident</text></svg>`,
      portraitNotes: "Smiling, lively portraiture with flat Macedonian kausia hat and flowing diadem ends.",
      territoryPoints: "150,50 360,40 400,120 280,180 160,140",
      territoryLabel: "Antimachus Realm (Northern Bactria)",
      territoryMints: "Bactra, Badakhshan"
    },
    {
      id: "apollodotus-1",
      name: "Apollodotus I Soter",
      reign: "c. 180 – 160 BCE",
      capital: "Taxila / Multan",
      bio: "Co-ruler alongside Demetrius I. First king to issue square bilingual silver drachms depicting the sacred Indian Humped Bull (Zebu) and Elephant, designed specifically for Indian trade.",
      denomination: "Square Silver Drachm",
      metal: "Silver (2.4 grams)",
      region: "Punjab & Sindh",
      connection: "Square Indian Coin Standard",
      greekText: "ΒΑΣΙΛΕΩΣ ΑΠΟΛΛΟΔΟΤΟΥ ΣΩΤΗΡΟΣ",
      greekTrans: "\"Of King Apollodotus, the Saviour\"",
      kharosthiText: "Maharajasa Apaladatasa Tratarasa",
      kharosthiTrans: "\"Great King Apollodotus, the Saviour\"",
      obverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><rect x="25" y="25" width="150" height="150" rx="15" fill="#94a3b8"/><path d="M 50,110 Q 100,70 150,110 Q 100,140 50,110 Z" fill="#1e293b"/><circle cx="120" cy="85" r="10" fill="#f59e0b"/><text x="100" y="165" font-size="8" font-weight="bold" fill="#0f172a" text-anchor="middle">Sacred Humped Bull (Zebu)</text></svg>`,
      reverseSvg: `<svg viewBox="0 0 200 200" width="100%" height="100%"><rect x="25" y="25" width="150" height="150" rx="15" fill="#94a3b8"/><path d="M 60,110 Q 100,60 140,110 Z" fill="#0f172a"/><text x="100" y="165" font-size="8" font-weight="bold" fill="#0f172a" text-anchor="middle">Royal Elephant</text></svg>`,
      portraitNotes: "Issued non-portrait civic coins with Indian sacred Zebu bull and royal elephant.",
      territoryPoints: "220,100 380,90 460,200 360,340 240,280",
      territoryLabel: "Apollodotus Realm (Punjab & Sindh)",
      territoryMints: "Taxila, Pushkalavati, Multan"
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    let currentRulerIndex = 0;
    let isObverse = true;
    let isZoomed = false;

    // Elements
    const navContainer = document.getElementById('ruler-pills-nav');
    const coinRender = document.getElementById('coin-inner-render');
    const coinWrapper = document.getElementById('coin-3d-wrapper');
    const faceIndicator = document.getElementById('face-indicator');
    const btnFlip = document.getElementById('btn-flip-coin');
    const btnZoom = document.getElementById('btn-zoom-coin');

    // Details Elements
    const rulerName = document.getElementById('ruler-name');
    const rulerReign = document.getElementById('ruler-reign');
    const rulerBio = document.getElementById('ruler-bio');
    const specDenom = document.getElementById('spec-denomination');
    const specMetal = document.getElementById('spec-metal');
    const specRegion = document.getElementById('spec-region');
    const specConn = document.getElementById('spec-connection');
    const scriptGreek = document.getElementById('script-greek');
    const transGreek = document.getElementById('trans-greek');
    const scriptKharosthi = document.getElementById('script-kharosthi');
    const transKharosthi = document.getElementById('trans-kharosthi');

    // Compare Selectors
    const compareSelect1 = document.getElementById('compare-coin-1');
    const compareSelect2 = document.getElementById('compare-coin-2');
    const compareGrid = document.getElementById('compare-results-grid');

    // Timeline Slider & Map
    const timelineSlider = document.getElementById('timeline-slider');
    const timelineTicks = document.getElementById('timeline-ticks');
    const territoryPoly = document.getElementById('territory-poly');
    const territoryLabel = document.getElementById('territory-label');
    const territoryTitle = document.getElementById('territory-title');
    const territoryDesc = document.getElementById('territory-desc');
    const territoryMints = document.getElementById('territory-mints');

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });
    }

    /**
     * Render Ruler Navigation Buttons
     */
    function renderRulerNav() {
      if (!navContainer) return;
      navContainer.innerHTML = '';

      RULERS_DATA.forEach((ruler, index) => {
        const btn = document.createElement('button');
        btn.className = `ruler-tab-btn ${index === currentRulerIndex ? 'active' : ''}`;
        btn.textContent = ruler.name.split(' (')[0];
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', index === currentRulerIndex ? 'true' : 'false');
        btn.addEventListener('click', () => selectRuler(index));
        navContainer.appendChild(btn);
      });
    }

    /**
     * Select & Display Ruler Details
     */
    function selectRuler(index) {
      currentRulerIndex = index;
      const ruler = RULERS_DATA[index];
      isObverse = true;

      // Update Nav Buttons
      const btns = navContainer.querySelectorAll('.ruler-tab-btn');
      btns.forEach((b, i) => {
        b.classList.toggle('active', i === index);
        b.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      // Update Coin Visual
      updateCoinFace();

      // Update Details
      if (rulerName) rulerName.textContent = ruler.name;
      if (rulerReign) rulerReign.textContent = `Reign: ${ruler.reign} · Capital: ${ruler.capital}`;
      if (rulerBio) rulerBio.textContent = ruler.bio;
      if (specDenom) specDenom.textContent = ruler.denomination;
      if (specMetal) specMetal.textContent = ruler.metal;
      if (specRegion) specRegion.textContent = ruler.region;
      if (specConn) specConn.textContent = ruler.connection;

      if (scriptGreek) scriptGreek.textContent = ruler.greekText;
      if (transGreek) transGreek.textContent = ruler.greekTrans;
      if (scriptKharosthi) scriptKharosthi.textContent = ruler.kharosthiText;
      if (transKharosthi) transKharosthi.textContent = ruler.kharosthiTrans;

      // Sync Timeline Slider
      if (timelineSlider) timelineSlider.value = index;
      updateTerritoryMap(ruler);
    }

    /**
     * Update Obverse / Reverse Face Rendering
     */
    function updateCoinFace() {
      const ruler = RULERS_DATA[currentRulerIndex];
      if (!coinRender) return;

      coinRender.innerHTML = isObverse ? ruler.obverseSvg : ruler.reverseSvg;
      if (faceIndicator) {
        faceIndicator.textContent = `Face: ${isObverse ? 'Obverse (Front Portrait / Emblem)' : 'Reverse (Deity / Script)'}`;
      }
    }

    // Flip Button Listener
    if (btnFlip) {
      btnFlip.addEventListener('click', () => {
        isObverse = !isObverse;
        updateCoinFace();
      });
    }

    // Zoom Button Listener
    if (btnZoom) {
      btnZoom.addEventListener('click', () => {
        isZoomed = !isZoomed;
        if (coinWrapper) coinWrapper.classList.toggle('zoomed', isZoomed);
        btnZoom.textContent = isZoomed ? '🔍 Reset Zoom' : '🔍 Toggle High Zoom';
      });
    }

    /**
     * Setup Coin Comparison Tool
     */
    function setupCompareTool() {
      if (!compareSelect1 || !compareSelect2) return;

      compareSelect1.innerHTML = '';
      compareSelect2.innerHTML = '';

      RULERS_DATA.forEach((r, i) => {
        const opt1 = new Option(r.name, i);
        const opt2 = new Option(r.name, i);
        compareSelect1.add(opt1);
        compareSelect2.add(opt2);
      });

      compareSelect1.value = 0; // Menander I
      compareSelect2.value = 1; // Demetrius I

      compareSelect1.addEventListener('change', renderCompare);
      compareSelect2.addEventListener('change', renderCompare);

      renderCompare();
    }

    function renderCompare() {
      if (!compareGrid) return;
      const r1 = RULERS_DATA[compareSelect1.value];
      const r2 = RULERS_DATA[compareSelect2.value];

      compareGrid.innerHTML = `
        <div class="compare-card">
          <h4>${r1.name}</h4>
          <span style="color: var(--greek-gold); font-size: 0.85rem;">${r1.reign}</span>
          <div style="margin: 16px 0;">${r1.obverseSvg}</div>
          <ul style="list-style: none; padding: 0; font-size: 0.9rem; color: var(--text-secondary);">
            <li style="margin-bottom: 8px;"><strong>Denomination:</strong> ${r1.denomination}</li>
            <li style="margin-bottom: 8px;"><strong>Metal & Weight:</strong> ${r1.metal}</li>
            <li style="margin-bottom: 8px;"><strong>Greek Script:</strong> ${r1.greekText}</li>
            <li style="margin-bottom: 8px;"><strong>Kharosthi:</strong> ${r1.kharosthiText}</li>
          </ul>
        </div>

        <div class="compare-card">
          <h4>${r2.name}</h4>
          <span style="color: var(--greek-gold); font-size: 0.85rem;">${r2.reign}</span>
          <div style="margin: 16px 0;">${r2.obverseSvg}</div>
          <ul style="list-style: none; padding: 0; font-size: 0.9rem; color: var(--text-secondary);">
            <li style="margin-bottom: 8px;"><strong>Denomination:</strong> ${r2.denomination}</li>
            <li style="margin-bottom: 8px;"><strong>Metal & Weight:</strong> ${r2.metal}</li>
            <li style="margin-bottom: 8px;"><strong>Greek Script:</strong> ${r2.greekText}</li>
            <li style="margin-bottom: 8px;"><strong>Kharosthi:</strong> ${r2.kharosthiText}</li>
          </ul>
        </div>
      `;
    }

    /**
     * Timeline & Territory Map Synchronization
     */
    function setupTimeline() {
      if (!timelineSlider) return;

      timelineTicks.innerHTML = '';
      RULERS_DATA.forEach((r, i) => {
        const span = document.createElement('span');
        span.textContent = r.reign.split(' ')[1] || r.reign;
        timelineTicks.appendChild(span);
      });

      timelineSlider.addEventListener('input', (e) => {
        selectRuler(parseInt(e.target.value, 10));
      });
    }

    function updateTerritoryMap(ruler) {
      if (territoryPoly) territoryPoly.setAttribute('points', ruler.territoryPoints);
      if (territoryLabel) territoryLabel.textContent = ruler.territoryLabel;
      if (territoryTitle) territoryTitle.textContent = `Territory of ${ruler.name.split(' (')[0]} (${ruler.reign})`;
      if (territoryDesc) territoryDesc.textContent = ruler.bio;
      if (territoryMints) territoryMints.textContent = ruler.territoryMints;
    }

    // Mobile Nav Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    // Initial Setup
    renderRulerNav();
    selectRuler(0);
    setupCompareTool();
    setupTimeline();
  });
})();

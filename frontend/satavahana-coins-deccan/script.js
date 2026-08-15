/**
 * script.js
 * Satavahana Coins Across the Deccan Explorer Logic (#2081)
 */

(function () {
  'use strict';

  // HOARD & LOCATION DATASET
  const SITE_DATA = {
    paithan: {
      title: "Pratishthana (Paithan Capital)",
      sub: "Primary Imperial Mint & Administrative Seat (c. 1st Century BCE – 2nd Century CE)",
      desc: "Located on the upper Godavari River in Maharashtra, Paithan served as the primary capital of the Satavahana rulers. Excavations yielded numerous potin and lead coins bearing the Ujjain emblem and royal legends of Simuka, Satakarni I, and Pulumavi.",
      ruler: "Simuka, Satakarni I & Gautamiputra Satakarni",
      types: "Potin Elephant, Ujjain Cross, Hill/Stupa Motifs",
      metals: "Potin, Lead, Copper"
    },
    amaravati: {
      title: "Amaravati / Dharanikota (Eastern Capital)",
      sub: "Maritime Hub & Stupa Patronage Site (Andhra Pradesh)",
      desc: "Dharanikota (near Amaravati on the lower Krishna River) was the eastern seat of power. It produced the iconic two-masted ship coins of Yajna Sri Satakarni, marking thriving maritime commerce with Rome, Ceylon, and Southeast Asia.",
      ruler: "Vashishtiputra Pulumavi & Yajna Sri Satakarni",
      types: "Two-Masted Ship Coins, Bilingual Silver Dinaras",
      metals: "Silver, Lead, Bronze"
    },
    nevasa: {
      title: "Nevasa Excavations & Hoard Site",
      sub: "Major Archaeological Discovery Center (Ahmadnagar District)",
      desc: "Scientific excavations at Nevasa uncovered stratified coin layers showing the chronological transition of Satavahana coin metallurgy from early cast copper coins to die-struck lead and potin issues.",
      ruler: "Satakarni II & Gautamiputra Satakarni",
      types: "Three-Arched Hill with Crescent, Bull Motifs",
      metals: "Lead & Potin Alloys"
    },
    kotalingala: {
      title: "Kotalingala Archaeological Site",
      sub: "Earliest Dynastic Mint Site (Karimnagar District, Telangana)",
      desc: "Discoveries at Kotalingala revealed rare early coins inscribed with 'Rano Siri Chimuka Satavahanasa' (King Simuka Satavahana), establishing the origin of the dynasty in Telangana before expansion across the Deccan.",
      ruler: "Simuka (Founder), Kanha, Satakarni I",
      types: "Early Inscribed Copper & Potin Issues",
      metals: "Copper, Potin"
    },
    junnar: {
      title: "Junnar Rock-Cut Pass & Mint Hub",
      sub: "Western Ghats Trade Pass (Pune District, Maharashtra)",
      desc: "Commanding the Naneghat trade pass connecting the Deccan plateau with the Arabian Sea coast. Junnar issued distinct coin types featuring standing lions, humped bulls, and sacred trees inside railings.",
      ruler: "Hala, Gautamiputra Satakarni",
      types: "Lion-Type Coppers, Sacred Tree in Railing",
      metals: "Copper, Potin"
    }
  };

  // SATAVAHANA COIN CATALOG FOR COMPARISON
  const SAT_COINS = [
    {
      id: "ship-lead",
      name: "Yajna Sri Satakarni Ship Lead Coin",
      ruler: "Yajna Sri Satakarni (c. 167–196 CE)",
      metal: "Lead",
      symbol: "Twin-masted ship with rigging",
      script: "Brahmi script reading 'Siri Yajna Satakanisa'",
      region: "Amaravati / Coastal Andhra",
      desc: "Celebrated maritime coin featuring a detailed 2-masted sea vessel with rigging and oars."
    },
    {
      id: "silver-gautamiputra",
      name: "Gautamiputra Silver Drachm (Restruck)",
      ruler: "Gautamiputra Satakarni (c. 106–130 CE)",
      metal: "Silver",
      symbol: "Three-arched hill (Ujjain reverse)",
      script: "Brahmi / Southern Proto-Telugu",
      region: "Jogalthambi Hoard / Nashik",
      desc: "Famous silver coin restruck over Western Kshatrapa (Nahapana) drachms following Gautamiputra's victory."
    },
    {
      id: "potin-elephant",
      name: "Satakarni I Potin Elephant Coin",
      ruler: "Satakarni I (c. 70–60 BCE)",
      metal: "Potin (Copper-Tin Alloy)",
      symbol: "Upright Elephant with raised trunk",
      script: "Early Brahmi script",
      region: "Paithan / Malwa",
      desc: "Heavy potin coin featuring royal elephant on obverse and Ujjain cross emblem on reverse."
    },
    {
      id: "lion-junnar",
      name: "Junnar Solar Lion Copper Coin",
      ruler: "King Hala / Gautamiputra",
      metal: "Copper",
      symbol: "Solar Lion standing right",
      script: "Prakrit in Brahmi",
      region: "Junnar / Western Ghats",
      desc: "Regional coin issue minted for trade along the Naneghat mountain pass."
    }
  ];

  // TIMELINE DATA
  const TIMELINE_DATA = [
    {
      ruler: "Simuka (Founder)",
      period: "c. 120 – 90 BCE",
      desc: "Established Satavahana power in Central Deccan (Kotalingala); issued early inscribed copper Karshapanas."
    },
    {
      ruler: "Satakarni I",
      period: "c. 70 – 60 BCE",
      desc: "Expanded territory into Malwa and Narmada valley; performed Ashvamedha sacrifice recorded in Naneghat inscription; issued potin elephant coins."
    },
    {
      ruler: "Gautamiputra Satakarni",
      period: "c. 106 – 130 CE",
      desc: "Destroyed the Kshaharata Kshatrapa dynasty (Nahapana); restruck thousands of silver coins; consolidated Deccan from sea to sea."
    },
    {
      ruler: "Vashishtiputra Pulumavi",
      period: "c. 130 – 159 CE",
      desc: "Expanded capital to Pratishthana; embellished Amaravati Great Stupa; issued bilingual silver portrait coins."
    },
    {
      ruler: "Yajna Sri Satakarni",
      period: "c. 167 – 196 CE",
      desc: "Re-established control over coastal trade routes; famous for issuing ocean-going ship coins."
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    // Map Elements
    const mapHotspots = document.querySelectorAll('.deccan-hotspot');
    const siteTitle = document.getElementById('site-title');
    const siteSub = document.getElementById('site-sub');
    const siteBody = document.getElementById('site-body');
    const detailRuler = document.getElementById('detail-ruler');
    const detailTypes = document.getElementById('detail-types');
    const detailMetals = document.getElementById('detail-metals');

    // Compare Elements
    const select1 = document.getElementById('sat-coin-1');
    const select2 = document.getElementById('sat-coin-2');
    const compareGrid = document.getElementById('sat-compare-grid');

    // Timeline Element
    const timelineContainer = document.getElementById('sat-timeline');

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
     * Map Hotspot Clicks
     */
    mapHotspots.forEach(function (hotspot) {
      hotspot.addEventListener('click', function () {
        const siteKey = hotspot.getAttribute('data-site');
        const data = SITE_DATA[siteKey];
        if (!data) return;

        if (siteTitle) siteTitle.textContent = data.title;
        if (siteSub) siteSub.textContent = data.sub;
        if (siteBody) siteBody.innerHTML = `<p>${data.desc}</p>`;
        if (detailRuler) detailRuler.textContent = data.ruler;
        if (detailTypes) detailTypes.textContent = data.types;
        if (detailMetals) detailMetals.textContent = data.metals;
      });
    });

    /**
     * Setup Comparison Tool
     */
    function setupCompare() {
      if (!select1 || !select2) return;

      select1.innerHTML = '';
      select2.innerHTML = '';

      SAT_COINS.forEach((c, idx) => {
        select1.add(new Option(c.name, idx));
        select2.add(new Option(c.name, idx));
      });

      select1.value = 0; // Ship Coin
      select2.value = 1; // Silver Gautamiputra

      select1.addEventListener('change', renderCompare);
      select2.addEventListener('change', renderCompare);

      renderCompare();
    }

    function renderCompare() {
      if (!compareGrid) return;
      const c1 = SAT_COINS[select1.value];
      const c2 = SAT_COINS[select2.value];

      compareGrid.innerHTML = `
        <div class="compare-sat-card">
          <h4 style="color: var(--sat-gold); font-size: 1.2rem; margin-bottom: 6px;">${c1.name}</h4>
          <span style="font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 14px;">${c1.ruler}</span>
          <p style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 16px;">${c1.desc}</p>
          <ul style="list-style: none; padding: 0; font-size: 0.85rem; color: var(--text-secondary);">
            <li style="margin-bottom: 6px;"><strong>Metal:</strong> ${c1.metal}</li>
            <li style="margin-bottom: 6px;"><strong>Symbol:</strong> ${c1.symbol}</li>
            <li style="margin-bottom: 6px;"><strong>Inscriptions:</strong> ${c1.script}</li>
            <li style="margin-bottom: 6px;"><strong>Circulation:</strong> ${c1.region}</li>
          </ul>
        </div>

        <div class="compare-sat-card">
          <h4 style="color: var(--sat-gold); font-size: 1.2rem; margin-bottom: 6px;">${c2.name}</h4>
          <span style="font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 14px;">${c2.ruler}</span>
          <p style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 16px;">${c2.desc}</p>
          <ul style="list-style: none; padding: 0; font-size: 0.85rem; color: var(--text-secondary);">
            <li style="margin-bottom: 6px;"><strong>Metal:</strong> ${c2.metal}</li>
            <li style="margin-bottom: 6px;"><strong>Symbol:</strong> ${c2.symbol}</li>
            <li style="margin-bottom: 6px;"><strong>Inscriptions:</strong> ${c2.script}</li>
            <li style="margin-bottom: 6px;"><strong>Circulation:</strong> ${c2.region}</li>
          </ul>
        </div>
      `;
    }

    /**
     * Render Timeline
     */
    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = '';

      TIMELINE_DATA.forEach((t) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
          <h4>${t.ruler}</h4>
          <span class="timeline-date">${t.period}</span>
          <p>${t.desc}</p>
        `;
        timelineContainer.appendChild(item);
      });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    // Initial Execution
    setupCompare();
    renderTimeline();
  });
})();

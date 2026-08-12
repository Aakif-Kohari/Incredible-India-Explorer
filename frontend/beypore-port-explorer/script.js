/**
 * Beypore Ancient Port Explorer - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initUruExplorer();
  initKhalasiCalculator();
  initGalleryModal();
  initBookmarkButton();
  initMobileMenu();
});

/* ==========================================
   1. Interactive Uru Shipbuilding Explorer
   ========================================== */

const uruData = {
  keel: {
    title: "1. Keel Laying (Eratavu)",
    badge: "Structural Backbone",
    desc: "The construction of an Uru begins with the laying of the Eratavu (keel). Carved from a massive, flawless trunk of Nilambur Teak, the keel serves as the primary spine of the entire ship. Master shipwrights (Maistry) perform ritual measurements using wooden rods (kolu) to ensure perfect symmetry.",
    img: "../assets/beypore_uru_shipbuilding.png",
    specs: [
      { label: "Material", val: "Nilambur Teak" },
      { label: "Length Range", val: "60 – 140 Feet" },
      { label: "Joinery", val: "Lap & Mortise" },
      { label: "Est. Lifespan", val: "100+ Years" }
    ]
  },
  hull: {
    title: "2. Hull Planking (Patti)",
    badge: "No Blueprints Required",
    desc: "Planking involves shaping dense teak boards along the keel skeleton. Craftsmen use heat from controlled wood fires and natural fish oil to steam and bend the thick planks. Each plank is secured using hand-forged copper nails, preventing rust and galvanic corrosion in sea water.",
    img: "../assets/beypore_uru_shipbuilding.png",
    specs: [
      { label: "Fastening", val: "Pure Copper Nails" },
      { label: "Shaping Method", val: "Steam & Fish Oil" },
      { label: "Design Blueprint", val: "Oral Precision (Kolu)" },
      { label: "Plank Thickness", val: "2 – 4 Inches" }
    ]
  },
  caulking: {
    title: "3. Caulking & Sealing (Kalapathi)",
    badge: "100% Water Tight",
    desc: "To render the hull completely impermeable, Khalasi artisans drive coconut coir fiber soaked in natural plant resin and boiled sardine oil between every plank seam (Kalapathi). This ancient technique swells when submerged, creating an impenetrable organic seal.",
    img: "../assets/beypore_port_banner.png",
    specs: [
      { label: "Sealing Material", val: "Coir & Resin" },
      { label: "Waterproof Level", val: "Hermetic Seal" },
      { label: "Maintenance", val: "Annual Fish-Oil Coat" },
      { label: "Eco Footprint", val: "Zero Synthetics" }
    ]
  },
  rigging: {
    title: "4. Masts & Sails (Pai & Maram)",
    badge: "Oceanic Trade Propulsion",
    desc: "Once the hull is complete, tall wooden masts (Maram) are stepped into the keelson. Triangular lateen sails (Pai) crafted from heavy cotton canvas are rigged using high-tensile coir ropes, allowing the Uru to navigate monsoon trade winds across the Arabian Sea to the Persian Gulf.",
    img: "../assets/beypore_port_banner.png",
    specs: [
      { label: "Masts Count", val: "2 – 3 Teak Masts" },
      { label: "Sail Pattern", val: "Lateen Dhow Canvas" },
      { label: "Rigging Cordage", val: "Braided Coir" },
      { label: "Sailing Speed", val: "8 – 12 Knots" }
    ]
  },
  khalasi: {
    title: "5. Khalasi River Launch (Tambu)",
    badge: "Legendary Mechanical Engineering",
    desc: "The Beypore Khalasis use wooden winches (Tambu), heavy pulleys, iron cables, and coir ropes to launch massive multi-hundred-ton Urus into the Chaliyar River. Operating solely on physical lever principles, rhythm, and teamwork, they move giant vessels without modern cranes.",
    img: "../assets/beypore_khalasi_rigging.png",
    specs: [
      { label: "Mechanism", val: "Tambu (Wooden Winch)" },
      { label: "Mechanical Gain", val: "10:1 Ratio" },
      { label: "Modern Cranes", val: "Zero Powered Cranes" },
      { label: "Guild Legacy", val: "Centuries Old" }
    ]
  }
};

function initUruExplorer() {
  const tabBtns = document.querySelectorAll('.uru-tab-btn');
  const panelImg = document.getElementById('uru-panel-img');
  const panelTitle = document.getElementById('uru-panel-title');
  const panelBadge = document.getElementById('uru-panel-badge');
  const panelDesc = document.getElementById('uru-panel-desc');
  const panelSpecs = document.getElementById('uru-panel-specs');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const stageKey = btn.getAttribute('data-stage');
      const data = uruData[stageKey];

      if (data) {
        panelTitle.textContent = data.title;
        panelBadge.textContent = data.badge;
        panelDesc.textContent = data.desc;
        panelImg.src = data.img;
        panelImg.alt = data.title;

        panelSpecs.innerHTML = data.specs.map(s => `
          <div class="uru-spec-item">
            <span class="uru-spec-label">${s.label}</span>
            <span class="uru-spec-val">${s.val}</span>
          </div>
        `).join('');
      }
    });
  });
}

/* ==========================================
   2. Khalasi Physics Calculator
   ========================================== */

function initKhalasiCalculator() {
  const weightSlider = document.getElementById('khalasi-weight-slider');
  const weightValSpan = document.getElementById('weight-val');
  const resMen = document.getElementById('res-men');
  const resRatio = document.getElementById('res-ratio');
  const resTension = document.getElementById('res-tension');
  const resTime = document.getElementById('res-time');

  if (!weightSlider) return;

  function updateCalc() {
    const weight = parseInt(weightSlider.value, 10);
    weightValSpan.textContent = `${weight} Tons`;

    const men = Math.round(weight * 0.38) + 12;
    const gearRatio = Math.round(weight / 16) + 4;
    const tension = (weight * 1.75).toFixed(1);
    const launchTime = (weight / 28 + 1.5).toFixed(1);

    resMen.textContent = `${men} Craftsmen`;
    resRatio.textContent = `1:${gearRatio}`;
    resTension.textContent = `${tension} kN`;
    resTime.textContent = `${launchTime} hrs`;
  }

  weightSlider.addEventListener('input', updateCalc);
  updateCalc();
}

/* ==========================================
   3. Gallery Modal Popup
   ========================================== */

function initGalleryModal() {
  const galleryItems = document.querySelectorAll('.port-gallery-item');
  const modal = document.getElementById('port-modal');
  const modalClose = document.getElementById('port-modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalHeading = document.getElementById('modal-heading');
  const modalDesc = document.getElementById('modal-description');

  if (!modal) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title') || 'Beypore Highlight';
      const desc = item.getAttribute('data-desc') || '';
      const heading = item.querySelector('h4') ? item.querySelector('h4').textContent : '';

      modalTitle.textContent = title;
      modalHeading.textContent = heading;
      modalDesc.textContent = desc;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ==========================================
   4. Journey Bookmark Button
   ========================================== */

function initBookmarkButton() {
  const bookmarkBtn = document.querySelector('.journey-bookmark-btn');
  if (!bookmarkBtn) return;

  const bookmarkId = bookmarkBtn.getAttribute('data-bookmark-id') || 'beypore-port-main';
  const savedJourneys = JSON.parse(localStorage.getItem('savedJourneys') || '[]');

  if (savedJourneys.includes(bookmarkId)) {
    bookmarkBtn.setAttribute('aria-pressed', 'true');
    bookmarkBtn.innerHTML = '♥ Saved in Journey';
  }

  bookmarkBtn.addEventListener('click', () => {
    let journeys = JSON.parse(localStorage.getItem('savedJourneys') || '[]');
    if (journeys.includes(bookmarkId)) {
      journeys = journeys.filter(id => id !== bookmarkId);
      bookmarkBtn.setAttribute('aria-pressed', 'false');
      bookmarkBtn.innerHTML = '♡ Save to Journey';
    } else {
      journeys.push(bookmarkId);
      bookmarkBtn.setAttribute('aria-pressed', 'true');
      bookmarkBtn.innerHTML = '♥ Saved in Journey';
    }
    localStorage.setItem('savedJourneys', JSON.stringify(journeys));
  });
}

/* ==========================================
   5. Mobile Navigation Menu Toggle
   ========================================== */

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

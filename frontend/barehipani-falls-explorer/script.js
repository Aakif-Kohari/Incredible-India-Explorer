/**
 * script.js
 * Barehipani Falls Explorer Logic (#2173)
 */

(function () {
  'use strict';

  // 5-STEP JOURNEY DATASET
  // Waterfall -> Height -> Landscape -> Season -> Location
  const JOURNEY_STEPS = {
    waterfall: {
      badge: "Step 1: The Legendary Cascade",
      title: "The Sacred Ribbon of Budhabalanga",
      desc: "Named 'Barehipani' after the local Mayurbhanj term 'Barahi' (twisted rope), the waterfall resembles a colossal braided silver rope descending over dark Meghasani cliff faces into a secluded, cloud-shrouded jungle valley.",
      img: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800",
      caption: "Full-scale view of Barehipani's 399m vertical cascade over dark Precambrian basalt",
      meta: [
        { label: "River", val: "Budhabalanga River" },
        { label: "Type", val: "Two-tiered plunge waterfall" },
        { label: "Rank", val: "2nd Tallest in India (399m / 1,309 ft)" }
      ]
    },
    height: {
      badge: "Step 2: Monumental Vertical Drop",
      title: "399-Meter Dual Tier Descent",
      desc: "The cascade splits cleanly across two sheer cliff drops: a massive upper freefall of 260 meters followed by a 139-meter lower chasm plunge, ranking it higher than Goa's Dudhsagar and Karnataka's Jog Falls.",
      img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
      caption: "Dual tiered plunge basin view showing upper 260m drop and lower 139m spray gorge",
      meta: [
        { label: "Total Height", val: "399 meters (1,309 feet)" },
        { label: "Upper Tier", val: "260 meters direct freefall" },
        { label: "Lower Tier", val: "139 meters plunge chasm" }
      ]
    },
    landscape: {
      badge: "Step 3: Similipal Biosphere Reserve",
      title: "Ancient Sal Canopies & Tiger Habitat",
      desc: "Surrounding the falls is the 2,750 km² Similipal UNESCO Biosphere Reserve, rich in dense Shorea robusta (Sal) forests, 94 species of wild orchids, and the world's only wild melanistic Royal Bengal tigers.",
      img: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=800",
      caption: "Vast pristine Sal canopy of Similipal Tiger Reserve surrounding the waterfall gorge",
      meta: [
        { label: "Protected Area", val: "Similipal Tiger Reserve (UNESCO)" },
        { label: "Key Wildlife", val: "Melanistic tigers, Asian elephants, Gaurs" },
        { label: "Flora", val: "94 Orchid species, moist deciduous Sal" }
      ]
    },
    season: {
      badge: "Step 4: Seasonal Transformation",
      title: "Winter Splendor & Monsoon Fury",
      desc: "November to February offers peak viewing with crisp weather and emerald waters. Monsoon brings colossal volume but park tracks close for public safety. Summer offers golden canopy walks.",
      img: "https://images.unsplash.com/photo-1596773229676-e13d98fb8a76?auto=format&fit=crop&q=80&w=800",
      caption: "Winter morning view of misty Budhabalanga river canyon at peak tourist opening",
      meta: [
        { label: "Best Visiting Season", val: "November to February" },
        { label: "Park Status", val: "Open Nov 1 – June 15 (Closed in Monsoon)" },
        { label: "Temperature", val: "8°C – 24°C in winter" }
      ]
    },
    location: {
      badge: "Step 5: Geographic Setting",
      title: "Heart of Mayurbhanj, Northern Odisha",
      desc: "Situated inside the core zone of Similipal in Mayurbhanj district, 120 km from Baripada and accessible via Jashipur and Pithabata entry gates with authorized forest safaris.",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      caption: "Meghasani mountain range framing the remote core sanctuary of Similipal",
      meta: [
        { label: "District", val: "Mayurbhanj, Odisha" },
        { label: "Entry Gates", val: "Jashipur (NW) & Pithabata (NE)" },
        { label: "Nearest Hub", val: "Baripada (120 km) / Balasore (145 km)" }
      ]
    }
  };

  // SEASONAL DATASET
  const SEASON_DATA = {
    winter: {
      title: "Winter Peak (November to February) — Best Season",
      desc: "The park reopens on November 1st after the monsoons. Temperatures range from a crisp 8°C to 22°C. The Budhabalanga River roars with fresh post-monsoon volume, mist shimmers over the canyon, and safari tracks are completely accessible.",
      flow: "Flow: Massive Silver Cascade & Dense Mist",
      access: "Park Access: Open (Permits required at Jashipur / Pithabata)",
      highlight: "Highlights: Wildlife safaris, orchid flowering, birdwatching"
    },
    summer: {
      title: "Spring & Summer (March to June)",
      desc: "Flow tapers into a slender silver stream. The deciduous sal forest sheds leaves, vastly improving wildlife visibility for spotting tigers, elephants, and barking deer around watering holes.",
      flow: "Flow: Moderate Stream & Crystal Pool",
      access: "Park Access: Open until mid-June",
      highlight: "Highlights: Prime wildlife photography around riverbeds"
    },
    monsoon: {
      title: "Monsoon Deluge (July to October) — Sanctuary Closed",
      desc: "Heavy tropical downpours flood the Budhabalanga River into an impassable torrent. The core biosphere reserve is strictly closed to tourists for wildlife breeding and safety reasons.",
      flow: "Flow: Thunderous Reddish Torrential Flood",
      access: "Park Access: Strictly CLOSED for conservation",
      highlight: "Highlights: Nature regeneration & groundwater replenishment"
    }
  };

  // LOCATION MAP SPOTS DATASET
  const LOCATION_SPOTS = {
    barehipani: {
      title: "Barehipani Falls Overlook Pavilion",
      sub: "Head-On Viewing Terrace (399m Drop)",
      desc: "Constructed on the opposite rim of the canyon, the forest observation terrace offers a panoramic, full-length vantage point of both upper and lower cascading tiers.",
      dist: "Core Zone Overlook",
      vehicle: "Authorized 4x4 Gypsy with eco-guide",
      rail: "Baripada (120 km) / Balasore (145 km)"
    },
    joranda: {
      title: "Joranda Falls (181m)",
      sub: "Single-Drop Companion Cascade",
      desc: "Located just 20 km from Barehipani, Joranda falls perpendicularly off a single 181m cliff, making it an essential pair on the Similipal circuit.",
      dist: "20 km from Barehipani",
      vehicle: "4x4 Safari Track",
      rail: "Baripada (100 km)"
    },
    jashipur: {
      title: "Jashipur Entry Gate & Booking Counter",
      sub: "North-Western Park Gateway",
      desc: "The primary entry gate on NH-49 for tourists arriving from Kolkata, Ranchi, or Rourkela. Forest permits, entry passes, and registered Gypsy safaris start here.",
      dist: "60 km to Barehipani",
      vehicle: "Highway access on NH-49",
      rail: "Tatanagar (105 km)"
    },
    pithabata: {
      title: "Pithabata Entry Gate & Information Centre",
      sub: "North-Eastern Park Gateway near Baripada",
      desc: "The eastern entry point situated 22 km from Baripada town, providing entry passes and eco-guides for visitors exploring the eastern Similipal range.",
      dist: "120 km to Barehipani",
      vehicle: "Paved road from Baripada",
      rail: "Baripada (22 km) / Balasore (85 km)"
    },
    meghasani: {
      title: "Meghasani Peak (1,165 m)",
      sub: "Seat of Clouds & Highest Similipal Summit",
      desc: "The highest mountain summit in Mayurbhanj district ('Meghasani' = Seat of Clouds), functioning as the primary cloud-catcher that feeds the Budhabalanga and Khairi rivers.",
      dist: "Summit overlook ridge",
      vehicle: "Trek route from core stations",
      rail: "Baripada (130 km)"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Stepper Elements
    const stepBtns = document.querySelectorAll('.step-btn');
    const jStepBadge = document.getElementById('j-step-badge');
    const jTitle = document.getElementById('j-title');
    const jDesc = document.getElementById('j-desc');
    const jMeta = document.getElementById('j-meta');
    const jImg = document.getElementById('j-img');
    const jCaption = document.getElementById('j-caption');

    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spAccess = document.getElementById('sp-access');
    const spHighlight = document.getElementById('sp-highlight');

    // Map Elements
    const similipalPins = document.querySelectorAll('.similipal-pin');
    const locTitle = document.getElementById('loc-title');
    const locSub = document.getElementById('loc-sub');
    const locBody = document.getElementById('loc-body');
    const locDist = document.getElementById('loc-dist');
    const locVehicle = document.getElementById('loc-vehicle');
    const locRail = document.getElementById('loc-rail');

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
     * 5-Step Journey Stepper Handler
     */
    stepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        stepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const stepKey = btn.getAttribute('data-step');
        const data = JOURNEY_STEPS[stepKey];
        if (!data) return;

        if (jStepBadge) jStepBadge.textContent = data.badge;
        if (jTitle) jTitle.textContent = data.title;
        if (jDesc) jDesc.textContent = data.desc;
        if (jImg) {
          jImg.src = data.img;
          jImg.alt = data.caption;
        }
        if (jCaption) jCaption.textContent = data.caption;

        if (jMeta) {
          jMeta.innerHTML = data.meta
            .map(m => `<div><strong>${m.label}:</strong> <span>${m.val}</span></div>`)
            .join('');
        }
      });
    });

    /**
     * Seasonal Toggle Handler
     */
    seasonBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        seasonBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const seasonKey = btn.getAttribute('data-season');
        const sdata = SEASON_DATA[seasonKey];
        if (sdata) {
          if (sCardTitle) sCardTitle.textContent = sdata.title;
          if (sCardDesc) sCardDesc.textContent = sdata.desc;
          if (spFlow) spFlow.textContent = sdata.flow;
          if (spAccess) spAccess.textContent = sdata.access;
          if (spHighlight) spHighlight.textContent = sdata.highlight;
        }
      });
    });

    /**
     * Location Map Pin Handler
     */
    similipalPins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        const spotKey = pin.getAttribute('data-spot');
        const data = LOCATION_SPOTS[spotKey];
        if (!data) return;

        if (locTitle) locTitle.textContent = data.title;
        if (locSub) locSub.textContent = data.sub;
        if (locBody) locBody.innerHTML = `<p>${data.desc}</p>`;
        if (locDist) locDist.textContent = data.dist;
        if (locVehicle) locVehicle.textContent = data.vehicle;
        if (locRail) locRail.textContent = data.rail;
      });

      pin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pin.click();
        }
      });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
  });
})();

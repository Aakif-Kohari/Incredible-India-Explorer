/**
 * up-monuments.js
 * Uttar Pradesh Famous Monuments Explorer - Dataset & Interactive Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const monumentEras = [
  "All Eras",
  "Mughal Era (1526–1707)",
  "Awadhi Nawabi Era (1722–1856)",
  "Ancient & Regional (3rd BCE–17th CE)"
];

// Complete Dataset of 7 Mandatory Famous UP Monuments + Supplementary Heritage Landmarks
export const monuments = [
  {
    id: "taj_mahal",
    name: "Taj Mahal",
    city: "Agra",
    builtYear: "1631–1648 CE",
    builtBy: "Emperor Shah Jahan",
    era: "Mughal Era (1526–1707)",
    style: "Mughal Architecture (Indo-Islamic)",
    materials: "Makrana White Marble with Pietra Dura Inlay",
    unesco: true,
    icon: "🕌",
    description: "World-famous white marble mausoleum built by Shah Jahan in memory of his beloved wife Mumtaz Mahal along the banks of the Yamuna River.",
    architectureDetails: {
      domes: "Central onion dome rising to 35 meters surrounded by 4 chhatris",
      minarets: "4 corner minarets tilting slightly outwards for earthquake protection",
      inlay: "Pietra Dura (Parchin Kari) with 28 types of precious & semi-precious stones",
      symmetry: "Near-perfect bilateral symmetry across the central lotus pool",
      keyStructures: ["Main Mausoleum", "Charbagh Garden", "Mughal Mosque", "Jawab (Echo Building)"]
    },
    galleryImages: [
      { caption: "Central Dome & Yamuna Riverfront", icon: "🕌" },
      { caption: "Pietra Dura Marble Floral Inlay", icon: "🌸" },
      { caption: "Charbagh Reflecting Pool Symmetrical View", icon: "🌊" }
    ]
  },
  {
    id: "agra_fort",
    name: "Agra Fort",
    city: "Agra",
    builtYear: "1565–1573 CE",
    builtBy: "Emperor Akbar",
    era: "Mughal Era (1526–1707)",
    style: "Mughal Military & Imperial Palatial",
    materials: "Red Sandstone & White Marble",
    unesco: true,
    icon: "🏰",
    description: "Massive 94-acre red sandstone royal fortress and seat of the Mughal Dynasty until 1638, overlooking the Yamuna River.",
    architectureDetails: {
      fortifications: "70-foot high double-walled red sandstone ramparts spanning 2.5 km",
      palaces: "Blend of Akbar's Jahangiri Mahal and Shah Jahan's white marble Sheesh Mahal",
      symmetry: "Hexagonal ground plan with double curtain walls and semicircular bastions",
      keyStructures: ["Jahangiri Mahal", "Khas Mahal", "Sheesh Mahal (Glass Palace)", "Diwan-i-Aam", "Diwan-i-Khas", "Musamman Burj"]
    },
    galleryImages: [
      { caption: "Amar Singh Gate & Red Sandstone Ramparts", icon: "🏰" },
      { caption: "Sheesh Mahal Mirror Mosaic Vaults", icon: "🪞" },
      { caption: "Musamman Burj Overlooking Taj Mahal", icon: "👑" }
    ]
  },
  {
    id: "fatehpur_sikri",
    name: "Fatehpur Sikri",
    city: "Agra",
    builtYear: "1571–1585 CE",
    builtBy: "Emperor Akbar",
    era: "Mughal Era (1526–1707)",
    style: "Indo-Islamic Synthesis (Mughal-Gujarati-Rajasthani)",
    materials: "Red Sandstone",
    unesco: true,
    icon: "🏛️",
    description: "Short-lived capital city founded by Emperor Akbar to honor Sufi Saint Shaikh Salim Chishti, renowned for the colossal Buland Darwaza.",
    architectureDetails: {
      gateways: "Buland Darwaza - 54m high 'Gate of Magnificence' (highest gateway in the world)",
      planning: "Unified red sandstone complex built atop a rocky ridge",
      elements: "Gujarati-style carved brackets, Panch Mahal 5-tiered pillared pavilion",
      keyStructures: ["Buland Darwaza", "Panch Mahal", "Tomb of Salim Chishti", "Diwan-i-Khas Central Pillar", "Jodha Bai Palace"]
    },
    galleryImages: [
      { caption: "54m High Buland Darwaza Gateway", icon: "🚪" },
      { caption: "Salim Chishti Mother-of-Pearl Canopy", icon: "✨" },
      { caption: "Panch Mahal 5-Tiered Open Pavilion", icon: "🏛️" }
    ]
  },
  {
    id: "bara_imambara",
    name: "Bara Imambara",
    city: "Lucknow",
    builtYear: "1784 CE",
    builtBy: "Nawab Asaf-ud-Daula",
    era: "Awadhi Nawabi Era (1722–1856)",
    style: "Awadhi Indo-Islamic Architecture",
    materials: "Lakhori Bricks, Rice Husk, Bael Fruit & Badami Lime Stucco",
    unesco: false,
    icon: "🕌",
    description: "Grand Awadhi monument built during the devastating 1784 famine as a relief project, featuring the world's largest unsupported arched hall and the intricate Bhool Bhulaiya maze.",
    architectureDetails: {
      vaultedHall: "Central hall (170ft long x 55ft wide x 49ft high) constructed without iron beams or wood pillars",
      maze: "Bhool Bhulaiya - 1,000 interconnected labyrinth passages above the main vault",
      acoustics: "Acoustic whispering galleries where a lit match click travels 170 feet",
      keyStructures: ["Central Vaulted Hall", "Bhool Bhulaiya Maze", "Asfi Mosque", "Shahi Baoli (Stepwell)"]
    },
    galleryImages: [
      { caption: "Central Vaulted Unsupported Hall", icon: "🏛️" },
      { caption: "Bhool Bhulaiya Labyrinth Corridor", icon: "🌀" },
      { caption: "Shahi Baoli 5-Tiered Stepwell", icon: "💧" }
    ]
  },
  {
    id: "chota_imambara",
    name: "Chota Imambara",
    city: "Lucknow",
    builtYear: "1838 CE",
    builtBy: "Nawab Muhammad Ali Shah",
    era: "Awadhi Nawabi Era (1722–1856)",
    style: "Awadhi Nawabi & Indo-European Hybrid",
    materials: "Lakhori Bricks, White Marble & Belgian Chandelier Glass",
    unesco: false,
    icon: "🛕",
    description: "Also known as the Imambara of Husainabad, famous for its glittering Belgian glass chandeliers, gold-plated domes, and calligraphic Islamic tilework.",
    architectureDetails: {
      chandeliers: "Hundreds of gilded Belgian crystal chandeliers & glass lamp globes",
      domes: "Golden dome flanked by miniature replicas of Taj Mahal",
      calligraphy: "Quranic verses in Naskh & Thuluth script adorned with lapis blue tiles",
      keyStructures: ["Main Imambara", "Tomb of Zinat Algiya", "Satkhanda Watchtower", "Golden Dome Chamber"]
    },
    galleryImages: [
      { caption: "Belgian Chandelier Illumination Hall", icon: "💎" },
      { caption: "Golden Dome & Calligraphic Façade", icon: "✨" },
      { caption: "Satkhanda Unfinished 7-Story Tower", icon: "🗼" }
    ]
  },
  {
    id: "rumi_darwaza",
    name: "Rumi Darwaza",
    city: "Lucknow",
    builtYear: "1784 CE",
    builtBy: "Nawab Asaf-ud-Daula",
    era: "Awadhi Nawabi Era (1722–1856)",
    style: "Awadhi Baroque Architecture (Modelled after Sublime Porte of Istanbul)",
    materials: "Lakhori Bricks & Intricate Stucco",
    unesco: false,
    icon: "🏛️",
    description: "Imposing 60-foot tall monumental gateway in Lucknow, inspired by the Sublime Porte in Constantinople (Istanbul), serving as the entrance to Old Lucknow.",
    architectureDetails: {
      archway: "Unique triple-arched structure topped with a carved lotus flower lantern dome",
      carvings: "Elaborate Awadhi stucco floral patterns and miniature arch motifs",
      illumination: "Historical lantern at the top used to light up the entrance at night",
      keyStructures: ["60ft Main Gateway Arch", "Chhatri Flower Crown", "Sublime Porte Arch Facade"]
    },
    galleryImages: [
      { caption: "60ft Awadhi Baroque Gateway Facade", icon: "🚪" },
      { caption: "Intricate Carved Lotus Lantern Dome", icon: "🪷" }
    ]
  },
  {
    id: "jhansi_fort",
    name: "Jhansi Fort (Jhansi ka Kila)",
    city: "Jhansi",
    builtYear: "1613 CE",
    builtBy: "Raja Bir Singh Deo of Orchha",
    era: "Ancient & Regional (3rd BCE–17th CE)",
    style: "Bundela Rajput Military Fortification",
    materials: "Solid Granite Rock & Masonry",
    unesco: false,
    icon: "⚔️",
    description: "Strategic hilltop granite fortress famous for Rani Lakshmibai's heroic defense during the First Indian War of Independence in 1857.",
    architectureDetails: {
      bastions: "10-meter high solid granite walls with 22 massive artillery bastions",
      jumpPoint: "Koodan Spot - Location from where Rani Lakshmibai leaped on horseback with her son",
      cannons: "Historic cannons 'Kadak Bijli' and 'Bhavani Shankar' mounted on walls",
      keyStructures: ["Koodan Spot", "Kadak Bijli Cannon", "Shiva Temple", "Panch Mahal Jhansi", "Execution Tower"]
    },
    galleryImages: [
      { caption: "Granite Hilltop Ramparts & Bastions", icon: "⚔️" },
      { caption: "Rani Lakshmibai Horse Jump Spot", icon: "🐎" },
      { caption: "Kadak Bijli Historic Cannon", icon: "💣" }
    ]
  },
  {
    id: "sarnath_stupa",
    name: "Dhamek Stupa Sarnath",
    city: "Varanasi",
    builtYear: "500 CE (Ashokan origins 249 BCE)",
    builtBy: "Emperor Ashoka / Gupta Dynasty",
    era: "Ancient & Regional (3rd BCE–17th CE)",
    style: "Ancient Buddhist Stupa Architecture",
    materials: "Carved Red Sandstone & Brick Core",
    unesco: false,
    icon: "☸️",
    description: "Cylindrical 43.6m high solid stone stupa marking the exact spot where Lord Buddha preached his first sermon (Dharmachakra Pravartana).",
    architectureDetails: {
      carvings: "Intricate Gupta-era floral scrolls, geometric patterns & human figures",
      dimensions: "43.6 meters height with 28 meters base diameter",
      nandavarta: "Swastika & Lotus motif stone friezes",
      keyStructures: ["Dhamek Stupa", "Ashoka Pillar Capital Base", "Mulagandha Kuti Vihara"]
    },
    galleryImages: [
      { caption: "43.6m High Dhamek Stupa Cylindrical Tower", icon: "☸️" },
      { caption: "Gupta Stone Floral & Geometric Friezes", icon: "🌺" }
    ]
  }
];

/**
 * Get monument profile by ID.
 */
export function getMonumentById(id, list = monuments) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(m => m.id.toLowerCase() === target || m.name.toLowerCase() === target);
}

/**
 * Get monuments filtered by Era.
 */
export function getMonumentsByEra(eraParam, list = monuments) {
  if (!eraParam || !Array.isArray(list)) return [];
  const target = eraParam.trim().toLowerCase();
  if (target === "all" || target === "all eras") return list;
  return list.filter(m => m.era.toLowerCase().includes(target));
}

/**
 * Get monuments filtered by City.
 */
export function getMonumentsByCity(cityName, list = monuments) {
  if (!cityName || !Array.isArray(list)) return [];
  const target = cityName.trim().toLowerCase();
  return list.filter(m => m.city.toLowerCase().includes(target));
}

/**
 * Search and filter monuments.
 */
export function filterMonuments(query = "", eraFilter = "all", cityFilter = "all", list = monuments) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const e = eraFilter.trim().toLowerCase();
  const c = cityFilter.trim().toLowerCase();

  return list.filter(m => {
    const matchesQuery = !q || [
      m.name,
      m.city,
      m.builtBy,
      m.builtYear,
      m.style,
      m.materials,
      m.description,
      ...(m.architectureDetails?.keyStructures || [])
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesEra = e === "all" || e === "all eras" || m.era.toLowerCase().includes(e);
    const matchesCity = c === "all" || m.city.toLowerCase().includes(c);

    return matchesQuery && matchesEra && matchesCity;
  });
}

/* ==========================================================================
   BROWSER DOM & 3D HOVER CARD ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.upMonumentsDataset = monuments;
  window.monumentErasDataset = monumentEras;
  window.getMonumentById = getMonumentById;
  window.getMonumentsByEra = getMonumentsByEra;
  window.getMonumentsByCity = getMonumentsByCity;
  window.filterMonuments = filterMonuments;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const searchInput = document.getElementById("monument-search");
    const eraChips = document.querySelectorAll(".btn-era-chip");
    const citySelect = document.getElementById("city-filter");
    const gridContainer = document.getElementById("monuments-grid");
    const countBadge = document.getElementById("monuments-count-badge");

    // Modal Elements
    const detailModal = document.getElementById("monument-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalTitle = document.getElementById("modal-monument-title");
    const modalLoc = document.getElementById("modal-monument-loc");
    const modalEra = document.getElementById("modal-monument-era");
    const modalBuilder = document.getElementById("modal-monument-builder");
    const modalStyle = document.getElementById("modal-monument-style");
    const modalMaterials = document.getElementById("modal-monument-materials");
    const modalDesc = document.getElementById("modal-monument-desc");
    const modalSpecs = document.getElementById("modal-monument-specs");
    const modalGallery = document.getElementById("modal-monument-gallery");

    let currentSelectedEra = "all";

    // Populate City Select Options
    if (citySelect) {
      const cities = Array.from(new Set(monuments.map(m => m.city))).sort();
      cities.forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    }

    // Render 3D Hover Cards Grid
    function renderMonuments() {
      if (!gridContainer) return;
      gridContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const city = citySelect ? citySelect.value : "all";

      const filtered = filterMonuments(query, currentSelectedEra, city);

      if (countBadge) {
        countBadge.textContent = `${filtered.length} / ${monuments.length} Monuments`;
      }

      if (filtered.length === 0) {
        gridContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Monuments Found</h3>
            <p>Try adjusting your search keywords or era filter.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(m => {
        const card = document.createElement("div");
        card.className = "monument-3d-card";
        card.setAttribute("tabindex", "0");

        card.innerHTML = `
          <div class="card-3d-inner">
            <div class="card-header">
              <span class="icon-3d">${m.icon}</span>
              ${m.unesco ? `<span class="unesco-badge">✨ UNESCO</span>` : ""}
            </div>

            <h3>${m.name}</h3>
            <p class="monument-meta">📍 <strong>${m.city}</strong> · ⏳ ${m.builtYear}</p>
            <p class="monument-builder">👑 <strong>Built By:</strong> ${m.builtBy}</p>
            <p class="monument-desc">${m.description}</p>

            <div class="key-structures">
              ${(m.architectureDetails.keyStructures || []).slice(0, 3).map(s => `<span class="struct-chip">🏛️ ${s}</span>`).join(" ")}
            </div>

            <button type="button" class="btn-inspect-3d">Inspect Architecture ➔</button>
          </div>
        `;

        // 3D Tilt Effect on Mouse Move
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });

        // Click to Open Modal Inspector
        card.addEventListener("click", () => {
          openMonumentModal(m);
        });

        gridContainer.appendChild(card);
      });
    }

    // Modal Inspector Setup
    function openMonumentModal(m) {
      if (!detailModal) return;

      if (modalTitle) modalTitle.textContent = `${m.icon} ${m.name}`;
      if (modalLoc) modalLoc.textContent = `📍 ${m.city}`;
      if (modalEra) modalEra.textContent = `⏳ ${m.era}`;
      if (modalBuilder) modalBuilder.textContent = `👑 Built By: ${m.builtBy} (${m.builtYear})`;
      if (modalStyle) modalStyle.textContent = `🏛️ Style: ${m.style}`;
      if (modalMaterials) modalMaterials.textContent = `🪵 Materials: ${m.materials}`;
      if (modalDesc) modalDesc.textContent = m.description;

      if (modalSpecs) {
        modalSpecs.innerHTML = `
          <ul>
            ${Object.entries(m.architectureDetails).map(([key, val]) => {
              if (Array.isArray(val)) {
                return `<li><strong>${key.toUpperCase()}:</strong> ${val.join(", ")}</li>`;
              }
              return `<li><strong>${key.toUpperCase()}:</strong> ${val}</li>`;
            }).join("")}
          </ul>
        `;
      }

      if (modalGallery) {
        modalGallery.innerHTML = m.galleryImages.map(img => `
          <div class="gallery-card">
            <span class="gallery-icon">${img.icon}</span>
            <p>${img.caption}</p>
          </div>
        `).join("");
      }

      detailModal.classList.add("active");
    }

    modalCloseBtn?.addEventListener("click", () => {
      detailModal?.classList.remove("active");
    });

    // Era Filter Chips Listener
    eraChips.forEach(chip => {
      chip.addEventListener("click", () => {
        eraChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentSelectedEra = chip.dataset.era;
        renderMonuments();
      });
    });

    // Search and City Filter Listeners
    searchInput?.addEventListener("input", renderMonuments);
    citySelect?.addEventListener("change", renderMonuments);

    // Initial Render
    renderMonuments();
  });
}

/**
 * up-festival-calendar.js
 * Uttar Pradesh Festival Calendar - Dataset & Interactive Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

// Complete Dataset for Uttar Pradesh Yearly Festival Calendar
export const festivals = [
  {
    id: "magh_mela",
    name: "Magh Mela",
    month: "January",
    monthIndex: 1,
    city: "Prayagraj",
    locationCoords: { x: 480, y: 310, lat: 25.4358, lng: 81.8463 },
    duration: "45 Days (Jan - Feb)",
    significance: "Annual sacred bath ritual at the Triveni Sangam during the auspicious month of Magha.",
    description: "Millions of pilgrims, Kalpavasis, and sadhus gather at the holy confluence of Ganga, Yamuna, and mythical Saraswati in Prayagraj for a month-long spiritual retreat.",
    rituals: ["Makar Sankranti Holy Dip", "Paush Poornima Bath", "Kalpavas Vrat", "Evening Aarti at Sangam"],
    highlights: ["Triveni Sangam Tent City", "Kalpavasi Ascetic Retreats", "Spiritual Discourse Pandal Assemblies"],
    icon: "🌊",
    imageBadge: "⛺",
    colorTheme: "#06b6d4"
  },
  {
    id: "kumbh_mela",
    name: "Kumbh Mela / Ardh Kumbh",
    month: "January",
    monthIndex: 1,
    city: "Prayagraj",
    locationCoords: { x: 485, y: 315, lat: 25.4358, lng: 81.8463 },
    duration: "45 Days (Every 6 & 12 Years)",
    significance: "UNESCO Intangible Cultural Heritage of Humanity and the world's largest peaceful spiritual gathering.",
    description: "Centuries-old pilgrimage celebration where millions take the sacred Shahi Snan (Royal Bath) at Triveni Sangam during rare astronomical alignments of Jupiter, Sun, and Moon.",
    rituals: ["Akharas Shahi Snan Processions", "Naga Sadhu Grand Processions", "Sangam Snan", "Ganga Puja"],
    highlights: ["Shahi Snan (Royal Bath)", "Akhara Processions", "Mega Cultural Exhibitions"],
    icon: "🪔",
    imageBadge: "👑",
    colorTheme: "#f97316"
  },
  {
    id: "taj_mahotsav",
    name: "Taj Mahotsav",
    month: "February",
    monthIndex: 2,
    city: "Agra",
    locationCoords: { x: 220, y: 190, lat: 27.1751, lng: 78.0421 },
    duration: "10 Days (Feb 18 - Feb 27)",
    significance: "Annual grand carnival showcasing Indian arts, crafts, classical music, dance, and Awadhi Mughlai cuisine against the Taj Mahal backdrop.",
    description: "Organized near Shilpgram by UP Tourism, featuring over 400 master artisans from across India selling handcrafted silk, marble inlay, and brassware.",
    rituals: ["Elephant & Horse Processions", "Classical Kathak Recitals", "Shilpgram Artisan Crafts Fair"],
    highlights: ["Shilpgram Handicrafts Bazaar", "Classical Music & Dance Nights", "Mughlai Food Festival"],
    icon: "🎪",
    imageBadge: "🕌",
    colorTheme: "#eab308"
  },
  {
    id: "lathmar_holi",
    name: "Holi (Barsana & Nandgaon)",
    month: "March",
    monthIndex: 3,
    city: "Barsana / Mathura",
    locationCoords: { x: 195, y: 170, lat: 27.6483, lng: 77.3756 },
    duration: "7 to 10 Days",
    significance: "World-famous legendary Lathmar Holi reenacting the playful courtship of Radha and Lord Krishna.",
    description: "Women of Barsana playfully strike men from Nandgaon with long wooden sticks (lathis) while men protect themselves with shields, amidst heavy showers of natural herbal Gulal colors.",
    rituals: ["Radha Rani Temple Samaj Gayan", "Lathmar Stick Play", "Gulal & Tesu Flower Colors", "Thandai Distribution"],
    highlights: ["Barsana Lathmar Play", "Nandgaon Phoolon Wali Holi", "Radha Rani Temple Celebrations"],
    icon: "🎨",
    imageBadge: "🌺",
    colorTheme: "#ec4899"
  },
  {
    id: "ram_navami",
    name: "Ram Navami",
    month: "April",
    monthIndex: 4,
    city: "Ayodhya",
    locationCoords: { x: 520, y: 220, lat: 26.7922, lng: 82.1998 },
    duration: "9 Days (Chaitra Navratri)",
    significance: "Grand celebration of the birth anniversary of Lord Rama in his sacred birthplace Ayodhya.",
    description: "Millions of devotees gather along the Saryu River for holy dips, grand Ramcharitmanas recitations, and golden chariot processions to Shri Ram Janmabhoomi Mandir.",
    rituals: ["Saryu River Holy Bath", "Shri Ram Birth Abhishek at Noon", "Ram Leela Reenactments", "Rath Yatra Chariot Procession"],
    highlights: ["Shri Ram Janmabhoomi Noon Aarti", "Saryu Mahotsav", "Kanak Bhawan Celebrations"],
    icon: "🏹",
    imageBadge: "🚩",
    colorTheme: "#f97316"
  },
  {
    id: "buddha_purnima",
    name: "Buddha Purnima",
    month: "May",
    monthIndex: 5,
    city: "Kushinagar / Sarnath",
    locationCoords: { x: 680, y: 195, lat: 26.7408, lng: 83.8890 },
    duration: "1 Day (Vaisakha Full Moon)",
    significance: "Triple-sacred day commemorating the Birth, Enlightenment, and Mahaparinirvana of Lord Buddha.",
    description: "Monks and international Buddhist pilgrims assemble at Sarnath's Dhamek Stupa and Kushinagar's Mahaparinirvana Temple for candlelight peace marches and chanting.",
    rituals: ["Bodhi Tree Water Pouring", "Chanting of Mangala Sutta", "Candlelight Peace Chariot March", "Alms Distribution"],
    highlights: ["Sarnath Stupa Lighting", "Kushinagar Reclining Buddha Chanting", "International Monk Procession"],
    icon: "☸️",
    imageBadge: "🕯️",
    colorTheme: "#eab308"
  },
  {
    id: "ganga_dussehra",
    name: "Ganga Dussehra",
    month: "June",
    monthIndex: 6,
    city: "Varanasi / Garhmukteshwar",
    locationCoords: { x: 590, y: 310, lat: 25.3176, lng: 82.9739 },
    duration: "10 Days (Jyeshtha Dashami)",
    significance: "Celebrates the cosmic descent of Goddess Ganga from heaven to Earth due to King Bhagiratha's penance.",
    description: "Sacred ghats across Varanasi, Prayagraj, and Garhmukteshwar glow with thousands of earthen oil lamps floated on the river while priests perform 10-fold Vedic Ganga Pujas.",
    rituals: ["10-Dip Holy Bath", "Floating 10,000 Earthen Lamps", "Maha Ganga Aarti", "Distribution of Chilled Sharbat"],
    highlights: ["Dashashwamedh 10-Priest Aarti", "Ganga Deepdan", "Bhagirathi Katha Recitals"],
    icon: "🌊",
    imageBadge: "🪔",
    colorTheme: "#3b82f6"
  },
  {
    id: "shravan_jhula_mela",
    name: "Shravan Jhula Mela",
    month: "July",
    monthIndex: 7,
    city: "Ayodhya / Vrindavan",
    locationCoords: { x: 520, y: 220, lat: 26.7922, lng: 82.1998 },
    duration: "15 Days (Shravan Month)",
    significance: "Swing festival celebrating Radha-Krishna and Ram-Sita amidst monsoon green lushness.",
    description: "Deities are placed on silver and gold swings (Jhulas) in temples across Ayodhya and Vrindavan while devotional devotional songs echo through temple courtyards.",
    rituals: ["Deity Swing Ritual (Jhula Seva)", "Monsoon Malhar Sangeet", "Mani Parvat Chariot Procession", "Kanwar Yatra Welcome"],
    highlights: ["Mani Parvat Mela Ayodhya", "Banke Bihari Jhula Seva", "Silver Swing Displays"],
    icon: "🎋",
    imageBadge: "🛝",
    colorTheme: "#10b981"
  },
  {
    id: "janmashtami",
    name: "Janmashtami",
    month: "August",
    monthIndex: 8,
    city: "Mathura / Vrindavan",
    locationCoords: { x: 200, y: 175, lat: 27.4924, lng: 77.6737 },
    duration: "2 Days (Bhadrapada Ashtami)",
    significance: "Grand worldwide celebration of the divine birth of Lord Krishna in Mathura.",
    description: "Mathura and Vrindavan transform into glowing divine cities with midnight Abhishekam at Shri Krishna Janmasthan, Dahi Handi human pyramids, and 24-hour Akhand Kirtan.",
    rituals: ["Midnight Milk-Honey Abhishekam", "Dahi Handi Breaking", "Chappan Bhog Offering", "Jhulan Utsav"],
    highlights: ["Janmasthan Midnight Aarti", "Banke Bihari Midnight Darshan", "Dahi Handi Competition"],
    icon: "🪈",
    imageBadge: "🦚",
    colorTheme: "#8b5cf6"
  },
  {
    id: "kajari_teej",
    name: "Kajari Teej & Folk Festival",
    month: "September",
    monthIndex: 9,
    city: "Mirzapur / Varanasi",
    locationCoords: { x: 570, y: 350, lat: 25.1337, lng: 82.5644 },
    duration: "3 Days (Bhadrapada Krishna Tritiya)",
    significance: "Monsoon folk song and marital festival honoring Goddess Parvati and Lord Shiva.",
    description: "Famous for night-long Kajari folk singing competitions in Mirzapur and Varanasi ghats, where folk troupes sing romantic and monsoon ballads.",
    rituals: ["Kajari Sangeet Muqabla", "Neem Tree Worship", "Teej Vrat & Mehndi", "Jhula Songs"],
    highlights: ["Mirzapur Kajari Muqabla", "Varanasi Ghat Folk Performances", "Traditional Swings"],
    icon: "🎶",
    imageBadge: "🌧️",
    colorTheme: "#10b981"
  },
  {
    id: "dewa_mela",
    name: "Dewa Sharif Mela",
    month: "October",
    monthIndex: 10,
    city: "Barabanki",
    locationCoords: { x: 460, y: 210, lat: 26.9248, lng: 81.1834 },
    duration: "10 Days (Post-Dussehra)",
    significance: "Renowned Sufi shrine fair promoting communal harmony, love, and Sufi Qawwali music.",
    description: "Held at the mausoleum of Sufi Saint Haji Waris Ali Shah, featuring spellbinding Qawwali music nights, All-India Mushaira poetry meets, and cattle fairs.",
    rituals: ["Chadar Offering at Dargah", "Night Qawwali Mehfils", "All-India Kavi Sammelan", "Cattle Exhibition"],
    highlights: ["Sufi Qawwali Nights", "All-India Mushaira", "Fireworks Display"],
    icon: "☪️",
    imageBadge: "🕌",
    colorTheme: "#8b5cf6"
  },
  {
    id: "dev_deepawali",
    name: "Dev Deepawali",
    month: "November",
    monthIndex: 11,
    city: "Varanasi",
    locationCoords: { x: 590, y: 310, lat: 25.3176, lng: 82.9739 },
    duration: "1 Day (Kartik Poornima)",
    significance: "Believed to be the day when gods descend to Earth to celebrate Lord Shiva's victory over Tripura demon.",
    description: "All 84 crescent ghats of Varanasi are illuminated with over 1.2 million earthen lamps (diyas), transforming the Ganges riverbank into a spectacular golden amphitheater.",
    rituals: ["Lighting 1.2 Million Diyas", "Ganga Mahotsav Cultural Finale", "Maha Aarti at Dashashwamedh", "Laser & Green Fireworks Show"],
    highlights: ["84 Ghat Illumination", "Dashashwamedh Grand Aarti", "River Boat Parade"],
    icon: "🪔",
    imageBadge: "✨",
    colorTheme: "#f97316"
  },
  {
    id: "ganga_mahotsav",
    name: "Ganga Mahotsav & Bithoor Fest",
    month: "November",
    monthIndex: 11,
    city: "Varanasi / Kanpur",
    locationCoords: { x: 380, y: 250, lat: 26.4499, lng: 80.3319 },
    duration: "5 Days (Pre-Dev Deepawali)",
    significance: "5-day cultural extravaganza celebrating classical Indian art, music, crafts, and river heritage.",
    description: "Organized by UP Tourism along Rajghat in Varanasi and Bithoor ghats in Kanpur, hosting maestro Indian classical music singers, dancers, and boat races.",
    rituals: ["Classical Music Concerts", "Crafts Shilp Mela", "Vintage Boat Race", "Ganga Deepdan"],
    highlights: ["Subah-e-Banaras Recitals", "Bithoor Freedom Trail Fair", "Handicrafts Exhibition"],
    icon: "🎺",
    imageBadge: "🛶",
    colorTheme: "#eab308"
  },
  {
    id: "shakumbhari_mela",
    name: "Shakumbhari Devi Fair",
    month: "December",
    monthIndex: 12,
    city: "Saharanpur",
    locationCoords: { x: 150, y: 60, lat: 29.9640, lng: 77.5460 },
    duration: "15 Days (Navratri / Winter)",
    significance: "Ancient Shakti Peeth winter pilgrimage in the Shivalik foothills of northern UP.",
    description: "Millions of devotees trek through the scenic Shivalik valley to seek blessings at the ancient Shakumbhari Devi Temple.",
    rituals: ["Shivalik Foothill Trekking", "Shakumbhari Devi Abhishekam", "Bhairav Temple Puja"],
    highlights: ["Shivalik Valley Pilgrimage", "Saharanpur Woodcraft Stalls", "Rural Fair"],
    icon: "⛰️",
    imageBadge: "🔱",
    colorTheme: "#10b981"
  }
];

/**
 * Get festival by ID.
 */
export function getFestivalById(id, list = festivals) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(f => f.id.toLowerCase() === target || f.name.toLowerCase() === target);
}

/**
 * Get all festivals occurring in a given month (1 to 12 or Month Name).
 */
export function getFestivalsByMonth(monthParam, list = festivals) {
  if (!Array.isArray(list)) return [];
  if (typeof monthParam === "number") {
    return list.filter(f => f.monthIndex === monthParam);
  }
  if (typeof monthParam === "string") {
    const target = monthParam.trim().toLowerCase();
    return list.filter(f => f.month.toLowerCase() === target);
  }
  return [];
}

/**
 * Get all festivals celebrated in a specific city.
 */
export function getFestivalsByCity(cityName, list = festivals) {
  if (!cityName || !Array.isArray(list)) return [];
  const target = cityName.trim().toLowerCase();
  return list.filter(f => f.city.toLowerCase().includes(target));
}

/**
 * Search and filter festivals by query, month index/name, and city.
 */
export function filterFestivals(query = "", monthFilter = "all", cityFilter = "all", list = festivals) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const m = monthFilter.toString().trim().toLowerCase();
  const c = cityFilter.trim().toLowerCase();

  return list.filter(f => {
    const matchesQuery = !q || [
      f.name,
      f.city,
      f.month,
      f.significance,
      f.description,
      ...(f.rituals || []),
      ...(f.highlights || [])
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesMonth = m === "all" || f.month.toLowerCase() === m || f.monthIndex.toString() === m;
    const matchesCity = c === "all" || f.city.toLowerCase().includes(c);

    return matchesQuery && matchesMonth && matchesCity;
  });
}

/* ==========================================================================
   BROWSER DOM & INTERACTIVE CALENDAR ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.upFestivalsDataset = festivals;
  window.monthsDataset = months;
  window.getFestivalById = getFestivalById;
  window.getFestivalsByMonth = getFestivalsByMonth;
  window.getFestivalsByCity = getFestivalsByCity;
  window.filterFestivals = filterFestivals;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Element References
    const searchInput = document.getElementById("festival-search");
    const monthChips = document.querySelectorAll(".btn-month-chip");
    const citySelect = document.getElementById("city-filter");
    const festivalsGridContainer = document.getElementById("festivals-grid");
    const activeCountBadge = document.getElementById("total-festivals-count");

    // Modal Inspector Elements
    const detailModal = document.getElementById("festival-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalTitle = document.getElementById("modal-fest-title");
    const modalBadge = document.getElementById("modal-fest-badge");
    const modalLoc = document.getElementById("modal-fest-loc");
    const modalDuration = document.getElementById("modal-fest-duration");
    const modalDesc = document.getElementById("modal-fest-desc");
    const modalSignificance = document.getElementById("modal-fest-significance");
    const modalRituals = document.getElementById("modal-fest-rituals");
    const modalHighlights = document.getElementById("modal-fest-highlights");

    let currentSelectedMonth = "all";

    // Populate City Filter Dropdown
    if (citySelect) {
      const cities = Array.from(new Set(festivals.map(f => f.city.split(" / ")[0]))).sort();
      cities.forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    }

    // Render Festival Cards Grid
    function renderFestivals() {
      if (!festivalsGridContainer) return;
      festivalsGridContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const city = citySelect ? citySelect.value : "all";

      const filtered = filterFestivals(query, currentSelectedMonth, city);

      if (activeCountBadge) {
        activeCountBadge.textContent = `${filtered.length} / ${festivals.length} Celebrations`;
      }

      if (filtered.length === 0) {
        festivalsGridContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Festivals Found</h3>
            <p>Try adjusting your search query or month filter.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(fest => {
        const card = document.createElement("article");
        card.className = "festival-card";

        card.innerHTML = `
          <div class="card-header">
            <span class="month-tag">📅 ${fest.month}</span>
            <span class="city-tag">📍 ${fest.city}</span>
          </div>

          <div class="card-title-box">
            <span class="fest-icon">${fest.icon}</span>
            <h3 class="fest-name">${fest.name}</h3>
          </div>

          <p class="fest-duration">⏳ <strong>Duration:</strong> ${fest.duration}</p>
          <p class="fest-desc">${fest.description}</p>

          <div class="fest-highlights">
            ${fest.highlights.map(h => `<span class="hl-chip">✨ ${h}</span>`).join(" ")}
          </div>

          <div class="card-footer">
            <button type="button" class="btn-inspect-fest">Inspect Details ➔</button>
          </div>
        `;

        card.addEventListener("click", () => {
          openFestivalModal(fest);
        });

        festivalsGridContainer.appendChild(card);
      });
    }

    // Open Modal Inspector
    function openFestivalModal(fest) {
      if (!detailModal) return;

      if (modalTitle) modalTitle.textContent = `${fest.icon} ${fest.name}`;
      if (modalBadge) modalBadge.textContent = fest.month;
      if (modalLoc) modalLoc.textContent = `📍 ${fest.city}`;
      if (modalDuration) modalDuration.textContent = `⏳ ${fest.duration}`;
      if (modalDesc) modalDesc.textContent = fest.description;
      if (modalSignificance) modalSignificance.textContent = fest.significance;

      if (modalRituals) {
        modalRituals.innerHTML = fest.rituals.map(r => `<li>🙏 ${r}</li>`).join("");
      }

      if (modalHighlights) {
        modalHighlights.innerHTML = fest.highlights.map(h => `<li>✨ ${h}</li>`).join("");
      }

      detailModal.classList.add("active");
    }

    modalCloseBtn?.addEventListener("click", () => {
      detailModal?.classList.remove("active");
    });

    // Month Chips Click Handler
    monthChips.forEach(chip => {
      chip.addEventListener("click", () => {
        monthChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentSelectedMonth = chip.dataset.month;
        renderFestivals();
      });
    });

    // Search and City Filter Listeners
    searchInput?.addEventListener("input", renderFestivals);
    citySelect?.addEventListener("change", renderFestivals);

    // Initial Full Render
    renderFestivals();
  });
}

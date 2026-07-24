/**
 * up-dashboard.js
 * Uttar Pradesh Tourism Dashboard - Comprehensive Data & Interactive Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Key UP Tourism Dashboard Statistics
export const dashboardMetrics = {
  districtsCount: 75,
  unescoSites: 3,
  annualVisitors: "100M+",
  culturalCircuits: 5,
  featuredItemsCount: 24
};

// 10 Mandatory Dashboard Sections
export const dashboardSections = [
  {
    id: "heritage",
    title: "Heritage Sites",
    icon: "🏛️",
    category: "Heritage",
    description: "Explore UNESCO World Heritage monuments, Mughal fortresses, Nawabi havelis, and ancient ruins.",
    linkUrl: "#heritage-section",
    itemCount: 6
  },
  {
    id: "religious",
    title: "Religious Places",
    icon: "🕌",
    category: "Religious",
    description: "Sacred pilgrimages of Kashi Vishwanath, Ayodhya Ram Mandir, Mathura Krishna Janmasthan, and Sangam.",
    linkUrl: "#religious-section",
    itemCount: 6
  },
  {
    id: "cuisine",
    title: "Famous Foods",
    icon: "🍛",
    category: "Cuisine",
    description: "Savor legendary Awadhi Kebabs, Biryani, Banarasi Paan, Agra Petha, and Mathura Peda.",
    linkUrl: "#cuisine-section",
    itemCount: 6
  },
  {
    id: "festivals",
    title: "Festivals",
    icon: "🎭",
    category: "Festivals",
    description: "Experience Dev Deepawali in Varanasi, Kumbh Mela in Prayagraj, Lathmar Holi, and Ayodhya Deepotsav.",
    linkUrl: "#festivals-section",
    itemCount: 6
  },
  {
    id: "circuits",
    title: "Travel Circuits",
    icon: "🚂",
    category: "Circuits",
    description: "Plan journeys across Ramayana Circuit, Krishna Braj Dham, Buddhist Dhamma Circuit, and Heritage Arc.",
    linkUrl: "../up-pilgrimage/up-pilgrimage.html",
    itemCount: 5
  },
  {
    id: "wildlife",
    title: "Wildlife & Nature",
    icon: "🦜",
    category: "Wildlife",
    description: "Discover Dudhwa National Park tigers, Pilibhit Tiger Reserve, and Katarniaghat sanctuary.",
    linkUrl: "#wildlife-section",
    itemCount: 5
  },
  {
    id: "handicrafts",
    title: "Handicrafts & ODOP",
    icon: "🎨",
    category: "Handicrafts",
    description: "Discover Banarasi Silk, Lucknow Chikankari, Bhadohi Carpets, Moradabad Brass, and Kannauj Attar.",
    linkUrl: "#handicrafts-section",
    itemCount: 6
  },
  {
    id: "history",
    title: "History & Heritage",
    icon: "📚",
    category: "History",
    description: "Immerse in ancient Kashi traditions, Kapilvastu, Mughal history, Nawabi era, and the 1857 freedom struggle.",
    linkUrl: "#history-section",
    itemCount: 4
  },
  {
    id: "games",
    title: "Interactive Games & Media",
    icon: "🎮",
    category: "Games",
    description: "Play Guess the UP District Game and explore iconic UP Bollywood filming locations.",
    linkUrl: "../guess-up-district/guess-up-district.html",
    itemCount: 3
  },
  {
    id: "districts",
    title: "District Explorer",
    icon: "🗺️",
    category: "Districts",
    description: "Interactive SVG map and comprehensive guide for all 75 districts of Uttar Pradesh.",
    linkUrl: "../up-district-explorer/up-district-explorer.html",
    itemCount: 75
  }
];

// Featured Carousel Destinations Dataset
export const featuredDestinations = [
  {
    id: "feat-1",
    title: "Taj Mahal",
    city: "Agra",
    imageIcon: "🕌",
    category: "UNESCO Heritage",
    description: "World-famous white marble mausoleum built by Shah Jahan along the Yamuna River.",
    highlights: ["UNESCO Site", "Mughal Architecture", "Romantic Landmark"]
  },
  {
    id: "feat-2",
    title: "Varanasi Ghats & Kashi Vishwanath",
    city: "Varanasi",
    imageIcon: "🛕",
    category: "Spiritual Capital",
    description: "One of the world's oldest living cities featuring Ganga Aarti and Kashi Vishwanath Dham.",
    highlights: ["Evening Ganga Aarti", "Kashi Vishwanath Temple", "Sarnath Stupa"]
  },
  {
    id: "feat-3",
    title: "Shri Ram Janmabhoomi Mandir",
    city: "Ayodhya",
    imageIcon: "🚩",
    category: "Sacred Pilgrimage",
    description: "Revered birthplace of Lord Rama along the Saryu River, host to record Deepotsav festivities.",
    highlights: ["Ram Mandir", "Saryu River Ghats", "Deepotsav"]
  },
  {
    id: "feat-4",
    title: "Bada Imambara & Rumi Darwaza",
    city: "Lucknow",
    imageIcon: "🏛️",
    category: "Awadhi Architecture",
    description: "Magnificent Nawabi monument famous for its central gravity-defying vaulted hall and Bhool Bhulaiya.",
    highlights: ["Bhool Bhulaiya Maze", "Rumi Darwaza", "Awadhi Cuisine"]
  },
  {
    id: "feat-5",
    title: "Triveni Sangam & Kumbh Grounds",
    city: "Prayagraj",
    imageIcon: "🌊",
    category: "Sacred Confluence",
    description: "Holy confluence of Ganga, Yamuna, and Saraswati, home to the global Kumbh Mela gathering.",
    highlights: ["Triveni Sangam", "Kumbh Mela", "Anand Bhavan"]
  },
  {
    id: "feat-6",
    title: "Dudhwa National Park",
    city: "Lakhimpur Kheri",
    imageIcon: "🐅",
    category: "Wildlife Sanctuary",
    description: "Lush Terai forest sanctuary home to Royal Bengal Tigers, Indian Rhinoceros, and Swamp Deer.",
    highlights: ["Tiger Reserve", "Rhino Rehabilitation", "Terai Eco-Tourism"]
  }
];

// Unified Items Database Across All 10 Categories
export const dashboardItems = [
  // Heritage
  { id: "h-1", title: "Taj Mahal", city: "Agra", category: "Heritage", icon: "🕌", desc: "UNESCO World Heritage marble mausoleum." },
  { id: "h-2", title: "Agra Fort", city: "Agra", category: "Heritage", icon: "🏰", desc: "Red sandstone Mughal fortress." },
  { id: "h-3", title: "Fatehpur Sikri", city: "Agra", category: "Heritage", icon: "🏛️", desc: "Akbar's royal red sandstone city." },
  { id: "h-4", title: "Bada Imambara", city: "Lucknow", category: "Heritage", icon: "🏛️", desc: "Nawabi monument & Bhool Bhulaiya." },
  { id: "h-5", title: "Jhansi Fort", city: "Jhansi", category: "Heritage", icon: "⚔️", desc: "Granite hilltop fort of Rani Lakshmibai." },
  { id: "h-6", title: "Sarnath Dhamek Stupa", city: "Varanasi", category: "Heritage", icon: "☸️", desc: "Site of Lord Buddha's first sermon." },

  // Religious
  { id: "r-1", title: "Kashi Vishwanath Temple", city: "Varanasi", category: "Religious", icon: "🛕", desc: "Sacred Jyotirlinga shrine along Ganga." },
  { id: "r-2", title: "Shri Ram Janmabhoomi", city: "Ayodhya", category: "Religious", icon: "🚩", desc: "Sacred birthplace of Lord Rama." },
  { id: "r-3", title: "Shri Krishna Janmasthan", city: "Mathura", category: "Religious", icon: "🛕", desc: "Birthplace temple complex of Lord Krishna." },
  { id: "r-4", title: "Triveni Sangam", city: "Prayagraj", category: "Religious", icon: "🌊", desc: "Confluence of Ganga, Yamuna & Saraswati." },
  { id: "r-5", title: "Vindhyachal Shakti Peeth", city: "Mirzapur", category: "Religious", icon: "🌺", desc: "Revered Goddess Vindhyavasini shrine." },
  { id: "r-6", title: "Naimisharanya (Neemsar)", city: "Sitapur", category: "Religious", icon: "🌳", desc: "Sacred Puranic forest pilgrimage." },

  // Cuisine
  { id: "c-1", title: "Galouti & Tunday Kebabs", city: "Lucknow", category: "Cuisine", icon: "🍢", desc: "Melt-in-mouth Awadhi spiced meat kebabs." },
  { id: "c-2", title: "Banarasi Paan & Tamatar Chaat", city: "Varanasi", category: "Cuisine", icon: "🍃", desc: "Iconic betel leaf & spicy tomato chaat." },
  { id: "c-3", title: "Agra Petha", city: "Agra", category: "Cuisine", icon: "🍬", desc: "Translucent ash gourd sweet delicacy." },
  { id: "c-4", title: "Mathura Peda", city: "Mathura", category: "Cuisine", icon: "🍮", desc: "Rich condensed milk caramel pedas." },
  { id: "c-5", title: "Kanpur Thaggu Ke Laddu", city: "Kanpur", category: "Cuisine", icon: "🍨", desc: "Famous khoya & dry fruit sweet." },
  { id: "c-6", title: "Bedai & Potato Sabzi", city: "Agra / Mathura", category: "Cuisine", icon: "🥟", desc: "Crispy stuffed poori with spicy curry." },

  // Festivals
  { id: "f-1", title: "Dev Deepawali", city: "Varanasi", category: "Festivals", icon: "🪔", desc: "Million earthen lamps lighting Ganga ghats." },
  { id: "f-2", title: "Kumbh Mela", city: "Prayagraj", category: "Festivals", icon: "🌊", desc: "World's largest spiritual gathering." },
  { id: "f-3", title: "Lathmar Holi", city: "Barsana / Mathura", category: "Festivals", icon: "🎨", desc: "Vibrant traditional Braj Holi celebration." },
  { id: "f-4", title: "Ayodhya Deepotsav", city: "Ayodhya", category: "Festivals", icon: "✨", desc: "Guinness World Record lamp lighting." },
  { id: "f-5", title: "Taj Mahotsav", city: "Agra", category: "Festivals", icon: "🎪", desc: "10-day arts, crafts & cultural carnival." },
  { id: "f-6", title: "Dewa Mela", city: "Barabanki", category: "Festivals", icon: "☪️", desc: "Sufi saint Dewa Sharif communal fair." },

  // Circuits
  { id: "tr-1", title: "Ramayana Sacred Circuit", city: "Ayodhya / Chitrakoot", category: "Circuits", icon: "🏹", desc: "Ayodhya -> Prayagraj -> Chitrakoot." },
  { id: "tr-2", title: "Krishna Braj Dham Circuit", city: "Mathura / Vrindavan", category: "Circuits", icon: "🪈", desc: "Mathura -> Vrindavan -> Govardhan." },
  { id: "tr-3", title: "Buddhist Dhamma Circuit", city: "Sarnath / Kushinagar", category: "Circuits", icon: "☸️", desc: "Sarnath -> Shravasti -> Kushinagar." },

  // Wildlife
  { id: "w-1", title: "Dudhwa National Park", city: "Lakhimpur Kheri", category: "Wildlife", icon: "🐅", desc: "Terai tigers, rhinos & swamp deer." },
  { id: "w-2", title: "Pilibhit Tiger Reserve", city: "Pilibhit", category: "Wildlife", icon: "🐆", desc: "TX2 awarded tiger conservation haven." },
  { id: "w-3", title: "Katarniaghat Sanctuary", city: "Bahraich", category: "Wildlife", icon: "🐊", desc: "Gharial crocodile & river dolphin habitat." },

  // Handicrafts
  { id: "hc-1", title: "Banarasi Silk Sarees", city: "Varanasi", category: "Handicrafts", icon: "👘", desc: "Zari brocade woven silk sarees." },
  { id: "hc-2", title: "Lucknow Chikankari", city: "Lucknow", category: "Handicrafts", icon: "🧵", desc: "Delicate white shadow embroidery." },
  { id: "hc-3", title: "Bhadohi Carpets", city: "Bhadohi", category: "Handicrafts", icon: "🧶", desc: "Hand-knotted woollen carpet weaving." },
  { id: "hc-4", title: "Moradabad Brassware", city: "Moradabad", category: "Handicrafts", icon: "🔔", desc: "Engraved brass metalware handicrafts." },
  { id: "hc-5", title: "Kannauj Attar", city: "Kannauj", category: "Handicrafts", icon: "🧴", desc: "Natural hydro-distilled herbal perfumes." },
  { id: "hc-6", title: "Firozabad Glassware", city: "Firozabad", category: "Handicrafts", icon: "💎", desc: "Colorful glass bangles & chandeliers." },

  // Games & Districts
  { id: "g-1", title: "Guess UP District Game", city: "UP Statewide", category: "Games", icon: "🎮", desc: "Educational quiz game with 4 modes." },
  { id: "g-2", title: "UP Filming Locations", city: "UP Statewide", category: "Games", icon: "🎬", desc: "Bollywood movie cards & BTS trivia." },
  { id: "d-1", title: "75 District Explorer Map", city: "UP Statewide", category: "Districts", icon: "🗺️", desc: "Interactive SVG map & full profile inspector." }
];

/**
 * Get section profile by ID.
 */
export function getSectionById(id, list = dashboardSections) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(s => s.id.toLowerCase() === target || s.category.toLowerCase() === target);
}

/**
 * Get featured destination by ID.
 */
export function getFeaturedDestinationById(id, list = featuredDestinations) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(item => item.id.toLowerCase() === id.toLowerCase());
}

/**
 * Filter dashboard items by search query and category.
 */
export function filterDashboardItems(query = "", category = "all", list = dashboardItems) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const cat = category.trim().toLowerCase();

  return list.filter(item => {
    const matchesQuery = !q || [
      item.title,
      item.city,
      item.category,
      item.desc
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesCategory = cat === "all" || item.category.toLowerCase() === cat;

    return matchesQuery && matchesCategory;
  });
}

/* ==========================================================================
   BROWSER DOM & INTERACTIVE DASHBOARD ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.upDashboardMetrics = dashboardMetrics;
  window.upDashboardSections = dashboardSections;
  window.upFeaturedDestinations = featuredDestinations;
  window.upDashboardItems = dashboardItems;
  window.getSectionById = getSectionById;
  window.getFeaturedDestinationById = getFeaturedDestinationById;
  window.filterDashboardItems = filterDashboardItems;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const searchInput = document.getElementById("dashboard-search");
    const categoryChips = document.querySelectorAll(".btn-cat-chip");
    const itemsGridContainer = document.getElementById("dashboard-items-grid");
    const navCardsGridContainer = document.getElementById("nav-cards-grid");

    // Carousel Elements
    const carouselPrevBtn = document.getElementById("carousel-prev");
    const carouselNextBtn = document.getElementById("carousel-next");
    const carouselTrack = document.getElementById("carousel-track");
    const carouselDotsContainer = document.getElementById("carousel-dots");

    let currentCategoryFilter = "all";
    let activeCarouselIndex = 0;
    let carouselTimer = null;

    // Render Metric Counter Animation
    function animateMetricCounters() {
      const counters = document.querySelectorAll(".metric-num");
      counters.forEach(counter => {
        const target = counter.dataset.target;
        if (!target) return;
        let count = 0;
        const numericVal = parseInt(target, 10);
        if (isNaN(numericVal)) {
          counter.textContent = target;
          return;
        }

        const interval = setInterval(() => {
          count += Math.ceil(numericVal / 20);
          if (count >= numericVal) {
            counter.textContent = target; // preserve original e.g. "100M+"
            clearInterval(interval);
          } else {
            counter.textContent = `${count}+`;
          }
        }, 50);
      });
    }

    // Render Navigation Cards Grid
    function renderNavigationCards() {
      if (!navCardsGridContainer) return;
      navCardsGridContainer.innerHTML = "";

      dashboardSections.forEach(sec => {
        const card = document.createElement("a");
        card.href = sec.linkUrl;
        card.className = "nav-card";
        card.innerHTML = `
          <div class="nav-card-icon">${sec.icon}</div>
          <h3>${sec.title}</h3>
          <p>${sec.description}</p>
          <span class="nav-card-badge">${sec.itemCount}+ Items</span>
        `;
        navCardsGridContainer.appendChild(card);
      });
    }

    // Render Featured Destinations Carousel
    function renderCarousel() {
      if (!carouselTrack) return;
      carouselTrack.innerHTML = "";
      if (carouselDotsContainer) carouselDotsContainer.innerHTML = "";

      featuredDestinations.forEach((dest, index) => {
        const slide = document.createElement("div");
        slide.className = `carousel-slide ${index === activeCarouselIndex ? "active" : ""}`;
        slide.innerHTML = `
          <div class="carousel-slide-content">
            <span class="carousel-icon">${dest.imageIcon}</span>
            <span class="carousel-cat-badge">${dest.category}</span>
            <h2>${dest.title} (${dest.city})</h2>
            <p>${dest.description}</p>
            <div class="carousel-highlights">
              ${dest.highlights.map(h => `<span>✨ ${h}</span>`).join(" ")}
            </div>
          </div>
        `;
        carouselTrack.appendChild(slide);

        // Dot indicator
        if (carouselDotsContainer) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = `carousel-dot ${index === activeCarouselIndex ? "active" : ""}`;
          dot.addEventListener("click", () => {
            activeCarouselIndex = index;
            updateCarousel();
          });
          carouselDotsContainer.appendChild(dot);
        }
      });
    }

    function updateCarousel() {
      const slides = carouselTrack?.querySelectorAll(".carousel-slide");
      const dots = carouselDotsContainer?.querySelectorAll(".carousel-dot");

      slides?.forEach((slide, i) => {
        slide.classList.toggle("active", i === activeCarouselIndex);
      });
      dots?.forEach((dot, i) => {
        dot.classList.toggle("active", i === activeCarouselIndex);
      });
    }

    function nextCarouselSlide() {
      activeCarouselIndex = (activeCarouselIndex + 1) % featuredDestinations.length;
      updateCarousel();
    }

    function prevCarouselSlide() {
      activeCarouselIndex = (activeCarouselIndex - 1 + featuredDestinations.length) % featuredDestinations.length;
      updateCarousel();
    }

    carouselNextBtn?.addEventListener("click", () => {
      nextCarouselSlide();
      resetCarouselAutoTimer();
    });

    carouselPrevBtn?.addEventListener("click", () => {
      prevCarouselSlide();
      resetCarouselAutoTimer();
    });

    function resetCarouselAutoTimer() {
      clearInterval(carouselTimer);
      carouselTimer = setInterval(nextCarouselSlide, 5000);
    }

    // Render Unified Dashboard Items Grid
    function renderDashboardItems() {
      if (!itemsGridContainer) return;
      itemsGridContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterDashboardItems(query, currentCategoryFilter);

      if (filtered.length === 0) {
        itemsGridContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Attractions Found</h3>
            <p>Try adjusting your search query or category filter.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "dashboard-item-card";
        card.innerHTML = `
          <div class="item-card-header">
            <span class="item-icon">${item.icon}</span>
            <span class="item-cat-tag">${item.category}</span>
          </div>
          <h4>${item.title}</h4>
          <p class="item-city">📍 ${item.city}</p>
          <p class="item-desc">${item.desc}</p>
        `;
        itemsGridContainer.appendChild(card);
      });
    }

    // Category Chip Click Listeners
    categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentCategoryFilter = chip.dataset.category;
        renderDashboardItems();
      });
    });

    // Search Listener
    searchInput?.addEventListener("input", renderDashboardItems);

    // Initializations
    animateMetricCounters();
    renderNavigationCards();
    renderCarousel();
    resetCarouselAutoTimer();
    renderDashboardItems();
  });
}

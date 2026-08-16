// Data-driven content for the Trains of India landing page

const trainCategories = [
  {
    id: "express",
    title: "Express Trains",
    description: "Discover important express services connecting India's cities.",
    icon: "🚄"
  },
  {
    id: "luxury",
    title: "Luxury Trains",
    description: "Experience India's heritage through premium railway journeys.",
    icon: "👑"
  },
  {
    id: "mountain",
    title: "Mountain & Toy Trains",
    description: "Explore historic railways travelling through India's mountains.",
    icon: "🏔️"
  },
  {
    id: "heritage",
    title: "Heritage Trains",
    description: "Discover historic railway services and engineering landmarks.",
    icon: "🏛️"
  },
  {
    id: "long-distance",
    title: "Long-Distance Trains",
    description: "Explore services connecting distant regions of India.",
    icon: "🌏"
  },
  {
    id: "scenic",
    title: "Scenic Train Journeys",
    description: "Travel through some of India's most spectacular landscapes.",
    icon: "🌄"
  },
  {
    id: "modern",
    title: "Modern & Semi-High-Speed",
    description: "Discover India's modern railway technology.",
    icon: "⚡"
  },
  {
    id: "regional",
    title: "Regional & Special Trains",
    description: "Explore regional railway experiences across the country.",
    icon: "🚉"
  }
];

const featuredTrains = [
  {
    id: "deccan-odyssey",
    name: "Deccan Odyssey",
    category: "Luxury Train",
    description: "A luxury tourist train exploring destinations across western India.",
    image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=600&auto=format&fit=crop",
    path: "../deccan-odyssey-explorer/index.html"
  },
  {
    id: "tejas-express",
    name: "Tejas Express",
    category: "Modern Express",
    description: "A modern semi-high-speed fully air-conditioned train.",
    image: "https://images.unsplash.com/photo-1594998495048-fb9e30a5d2eb?q=80&w=600&auto=format&fit=crop",
    path: "../tejas-express-explorer/index.html"
  },
  {
    id: "humsafar-express",
    name: "Humsafar Express",
    category: "Long-Distance Express",
    description: "A fully premium AC-3 Tier sleeper train designed for overnight comfort.",
    image: "https://images.unsplash.com/photo-1563810143891-b6840742f8d8?q=80&w=600&auto=format&fit=crop",
    path: "../humsafar-express-explorer/index.html"
  },
  {
    id: "duronto-express",
    name: "Duronto Express",
    category: "Non-Stop Express",
    description: "Non-stop point-to-point express trains connecting major state capitals and metros.",
    image: "https://images.unsplash.com/photo-1601565415267-724d3d8f7b70?q=80&w=600&auto=format&fit=crop",
    path: "../duronto-express-explorer/index.html"
  }
];

const regions = [
  {
    id: "north",
    name: "North India",
    description: "Explore railway journeys across northern India."
  },
  {
    id: "south",
    name: "South India",
    description: "Discover scenic routes and railway heritage in the south."
  },
  {
    id: "east",
    name: "East India",
    description: "Explore historic and scenic eastern railway routes."
  },
  {
    id: "west",
    name: "West India",
    description: "Discover desert, coastal and heritage railway journeys."
  },
  {
    id: "northeast",
    name: "Northeast India",
    description: "Explore railway journeys through India's northeastern landscapes."
  },
  {
    id: "central",
    name: "Central India",
    description: "Discover railway connections across India's heartland."
  }
];

const railwayFacts = [
  {
    title: "Mountain Railways",
    description: "Several historic mountain railway routes form an important part of India's railway heritage and are UNESCO World Heritage Sites."
  },
  {
    title: "Long-Distance Connections",
    description: "Indian railway services connect major cities and regions across the country's diverse geography."
  },
  {
    title: "Railway Tourism",
    description: "Specialised tourist trains combine railway travel with cultural and heritage experiences, often resembling 5-star hotels on wheels."
  }
];

const allTrains = [
  ...featuredTrains,
  // Placeholders for future trains
  {
    id: "palace-on-wheels",
    name: "Palace on Wheels",
    category: "Luxury Train",
    description: "A luxury rail journey showcasing the heritage and landscapes of Rajasthan.",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=600&auto=format&fit=crop",
    path: "#"
  },
  {
    id: "maharajas-express",
    name: "Maharajas' Express",
    category: "Luxury Train",
    description: "A premium railway journey through some of India's renowned cultural destinations.",
    image: "https://images.unsplash.com/photo-1560370487-b64ecf39ccad?q=80&w=600&auto=format&fit=crop",
    path: "#"
  },
  {
    id: "vande-bharat",
    name: "Vande Bharat Express",
    category: "Modern Express",
    description: "A modern semi-high-speed train series developed for intercity travel in India.",
    image: "https://images.unsplash.com/photo-1627918451152-4752c1e7a57c?q=80&w=600&auto=format&fit=crop",
    path: "#"
  },
  {
    id: "darjeeling-himalayan",
    name: "Darjeeling Himalayan Railway",
    category: "Mountain Railway",
    description: "A historic mountain railway travelling through the Himalayan foothills.",
    image: "https://images.unsplash.com/photo-1543789539-ff7c6b9bb7cb?q=80&w=600&auto=format&fit=crop",
    path: "#"
  }
];

const scenicJourneys = [
  {
    name: "Darjeeling Himalayan Railway",
    description: "The famous 'Toy Train' winding its way through the scenic hills and tea gardens of Darjeeling.",
    image: "https://images.unsplash.com/photo-1543789539-ff7c6b9bb7cb?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Nilgiri Mountain Railway",
    description: "A rack railway climbing through the Nilgiri Hills, offering breathtaking views of valleys and forests.",
    image: "https://images.unsplash.com/photo-1596709871181-e221d64c1c91?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Kalka-Shimla Railway",
    description: "A narrow-gauge marvel traversing 102 tunnels to reach the summer capital of British India.",
    image: "https://images.unsplash.com/photo-1598282363161-0dfa0bfd2c38?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Konkan Railway",
    description: "A coastal route between Mumbai and Mangalore featuring spectacular bridges and tunnels along the Arabian Sea.",
    image: "https://images.unsplash.com/photo-1601565415267-724d3d8f7b70?q=80&w=400&auto=format&fit=crop"
  }
];

const heritageItems = [
  { title: "Mountain Railways", icon: "fa-mountain" },
  { title: "Steam Locomotives", icon: "fa-train-tram" },
  { title: "Historic Routes", icon: "fa-route" },
  { title: "Railway Museums", icon: "fa-building-columns" },
  { title: "Heritage Stations", icon: "fa-landmark" },
  { title: "Fairy Queen", icon: "fa-crown" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderFeaturedTrains();
  renderRegions();
  renderHeritage();
  renderScenicJourneys();
  renderFacts();
  renderAllTrains();
});

function renderCategories() {
  const container = document.getElementById("categories-container");
  if (!container) return;
  container.innerHTML = trainCategories.map(cat => `
    <div class="category-card" tabindex="0">
      <span class="category-icon" aria-hidden="true">${cat.icon}</span>
      <h3 class="category-title">${cat.title}</h3>
      <p class="category-desc">${cat.description}</p>
      <span class="category-link">Explore &rarr;</span>
    </div>
  `).join("");
}

function renderFeaturedTrains() {
  const container = document.getElementById("featured-trains-container");
  if (!container) return;
  container.innerHTML = featuredTrains.map(train => `
    <article class="featured-train-card">
      <img src="${train.image}" alt="${train.name} train" class="featured-img" loading="lazy">
      <div class="featured-content">
        <p class="featured-cat">${train.category}</p>
        <h3 class="featured-title">${train.name}</h3>
        <p class="featured-desc">${train.description}</p>
        <a href="${train.path}" class="explore-btn-inline">Explore &rarr;</a>
      </div>
    </article>
  `).join("");
}

function renderRegions() {
  const container = document.getElementById("regions-container");
  if (!container) return;
  container.innerHTML = regions.map(reg => `
    <article class="region-card" tabindex="0">
      <h3 class="region-title">${reg.name}</h3>
      <p class="region-desc">${reg.description}</p>
    </article>
  `).join("");
}

function renderHeritage() {
  const container = document.getElementById("heritage-container");
  if (!container) return;
  container.innerHTML = heritageItems.map(item => `
    <div class="heritage-item">
      <i class="fa-solid ${item.icon} heritage-icon"></i>
      <span class="heritage-title">${item.title}</span>
    </div>
  `).join("");
}

function renderScenicJourneys() {
  const container = document.getElementById("scenic-container");
  if (!container) return;
  container.innerHTML = scenicJourneys.map(journey => `
    <div class="scenic-card">
      <img src="${journey.image}" alt="${journey.name}" loading="lazy">
      <div class="scenic-info">
        <h4>${journey.name}</h4>
        <p>${journey.description}</p>
      </div>
    </div>
  `).join("");
}

function renderFacts() {
  const container = document.getElementById("facts-container");
  if (!container) return;
  container.innerHTML = railwayFacts.map(fact => `
    <div class="fact-card">
      <h4 class="fact-title">${fact.title}</h4>
      <p class="fact-desc">${fact.description}</p>
    </div>
  `).join("");
}

function renderAllTrains() {
  const container = document.getElementById("all-trains-container");
  if (!container) return;
  container.innerHTML = allTrains.map(train => `
    <article class="featured-train-card">
      <img src="${train.image}" alt="${train.name} train" class="featured-img" loading="lazy">
      <div class="featured-content">
        <p class="featured-cat">${train.category}</p>
        <h3 class="featured-title">${train.name}</h3>
        <p class="featured-desc">${train.description}</p>
        <a href="${train.path}" class="explore-btn-inline">Explore &rarr;</a>
      </div>
    </article>
  `).join("");
}

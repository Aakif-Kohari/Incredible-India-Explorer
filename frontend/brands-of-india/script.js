// Brands of India Logic

const brandsData = [
  {
    id: "tata",
    name: "Tata Group",
    logoEmoji: "🏢",
    industry: "Conglomerate",
    year: 1868,
    era: "pre-1900",
    origin: "MH", // Maharashtra
    originName: "Mumbai, Maharashtra",
    desc: "A global conglomerate encompassing salt to software, founded by Jamsetji Tata.",
    link: "#"
  },
  {
    id: "reliance",
    name: "Reliance Industries",
    logoEmoji: "🛢️",
    industry: "Conglomerate",
    year: 1957,
    era: "1948-2000",
    origin: "MH", // Maharashtra
    originName: "Mumbai, Maharashtra",
    desc: "A multinational conglomerate company, playing a massive role in energy, retail, and telecom.",
    link: "#"
  },
  {
    id: "amul",
    name: "Amul",
    logoEmoji: "🥛",
    industry: "Food & Beverages",
    year: 1946,
    era: "1900-1947",
    origin: "GJ", // Gujarat
    originName: "Anand, Gujarat",
    desc: "An Indian dairy cooperative society that sparked India's White Revolution.",
    link: "#"
  },
  {
    id: "mahindra",
    name: "Mahindra & Mahindra",
    logoEmoji: "🚜",
    industry: "Automotive",
    year: 1945,
    era: "1900-1947",
    origin: "PB", // Punjab (Initially Ludhiana), later Mumbai. Using MH for current HQ, but origin is Ludhiana
    originName: "Ludhiana, Punjab",
    desc: "One of the largest vehicle manufacturers by production in India and the largest manufacturer of tractors in the world.",
    link: "#"
  },
  {
    id: "infosys",
    name: "Infosys",
    logoEmoji: "💻",
    industry: "Technology",
    year: 1981,
    era: "1948-2000",
    origin: "MH", // Started in Pune, MH. HQ in Bangalore
    originName: "Pune, Maharashtra",
    desc: "A global leader in next-generation digital services and consulting.",
    link: "#"
  },
  {
    id: "wipro",
    name: "Wipro",
    logoEmoji: "🌻", // Started as Western India Palm Refined Oil
    industry: "Technology",
    year: 1945,
    era: "1900-1947",
    origin: "MH",
    originName: "Amalner, Maharashtra",
    desc: "Started as a vegetable oil manufacturer, now a leading global information technology, consulting and business process services company.",
    link: "#"
  },
  {
    id: "royal-enfield",
    name: "Royal Enfield (India)",
    logoEmoji: "🏍️",
    industry: "Automotive",
    year: 1955,
    era: "1948-2000",
    origin: "TN",
    originName: "Chennai, Tamil Nadu",
    desc: "The oldest global motorcycle brand in continuous production, known for the iconic Bullet.",
    link: "#"
  },
  {
    id: "parle",
    name: "Parle Products",
    logoEmoji: "🍪",
    industry: "FMCG",
    year: 1929,
    era: "1900-1947",
    origin: "MH",
    originName: "Mumbai, Maharashtra",
    desc: "Makers of Parle-G, one of the best-selling biscuit brands in the world.",
    link: "#"
  },
  {
    id: "zee",
    name: "Zee Entertainment",
    logoEmoji: "📺",
    industry: "Media & Entertainment",
    year: 1992,
    era: "1948-2000",
    origin: "MH",
    originName: "Mumbai, Maharashtra",
    desc: "India's first Hindi-language cable and satellite television channel.",
    link: "../zee-media-brand/index.html"
  },
  {
    id: "haldirams",
    name: "Haldiram's",
    logoEmoji: "🥨",
    industry: "Food & Beverages",
    year: 1937,
    era: "1900-1947",
    origin: "RJ",
    originName: "Bikaner, Rajasthan",
    desc: "A major Indian sweets, snacks, and restaurant company.",
    link: "#"
  },
  {
    id: "godrej",
    name: "Godrej Group",
    logoEmoji: "🔐",
    industry: "Conglomerate",
    year: 1897,
    era: "pre-1900",
    origin: "MH",
    originName: "Mumbai, Maharashtra",
    desc: "Started with locks, now spans real estate, consumer products, industrial engineering, appliances, and agriculture.",
    link: "#"
  },
  {
    id: "britannia",
    name: "Britannia Industries",
    logoEmoji: "🍞",
    industry: "Food & Beverages",
    year: 1892,
    era: "pre-1900",
    origin: "WB",
    originName: "Kolkata, West Bengal",
    desc: "One of India's oldest existing companies, best known for its biscuit products.",
    link: "#"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('brands-grid');
  const noResults = document.getElementById('no-results');
  const searchInput = document.getElementById('brand-search');
  const industryFilter = document.getElementById('industry-filter');
  const yearFilter = document.getElementById('year-filter');
  const mapWrapper = document.getElementById('india-map-wrapper');
  const resetMapBtn = document.getElementById('reset-map-btn');
  const timelineContainer = document.getElementById('brands-timeline');

  let activeStateFilter = null;

  // Initialize Map
  if (typeof indiaMapSvg !== 'undefined') {
    mapWrapper.innerHTML = indiaMapSvg;
    
    const paths = mapWrapper.querySelectorAll('path');
    paths.forEach(path => {
      // Add titles for tooltip
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = path.getAttribute('id'); // ID is usually state code
      path.appendChild(title);

      path.addEventListener('click', () => {
        // Toggle active state
        paths.forEach(p => p.classList.remove('active'));
        const stateCode = path.getAttribute('id');
        
        if (activeStateFilter === stateCode) {
          activeStateFilter = null;
          resetMapBtn.style.display = 'none';
        } else {
          path.classList.add('active');
          activeStateFilter = stateCode;
          resetMapBtn.style.display = 'inline-block';
        }
        filterBrands();
      });
    });
  }

  resetMapBtn.addEventListener('click', () => {
    activeStateFilter = null;
    const paths = mapWrapper.querySelectorAll('path');
    paths.forEach(p => p.classList.remove('active'));
    resetMapBtn.style.display = 'none';
    filterBrands();
  });

  // Render Cards
  function renderBrands(brands) {
    grid.innerHTML = '';
    
    if (brands.length === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      brands.forEach(brand => {
        const card = document.createElement('div');
        card.className = 'brand-card';
        card.innerHTML = `
          <div class="brand-logo-container">
            ${brand.logoEmoji}
          </div>
          <div class="brand-info">
            <h3 class="brand-name">${brand.name}</h3>
            <div class="brand-meta">
              <span title="Industry">${brand.industry}</span>
              <span title="Founded Year">${brand.year}</span>
              <span title="Origin">${brand.originName}</span>
            </div>
            <p class="brand-desc">${brand.desc}</p>
            <a href="${brand.link}" class="brand-explore">Explore</a>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  }

  // Filter Logic
  function filterBrands() {
    const searchTerm = searchInput.value.toLowerCase();
    const industry = industryFilter.value;
    const era = yearFilter.value;

    const filtered = brandsData.filter(brand => {
      const matchSearch = brand.name.toLowerCase().includes(searchTerm) || brand.desc.toLowerCase().includes(searchTerm);
      const matchIndustry = industry === 'all' || brand.industry === industry;
      const matchEra = era === 'all' || brand.era === era;
      const matchState = !activeStateFilter || brand.origin === activeStateFilter;

      return matchSearch && matchIndustry && matchEra && matchState;
    });

    renderBrands(filtered);
  }

  // Render Timeline
  function renderTimeline() {
    // Sort by year
    const sortedBrands = [...brandsData].sort((a, b) => a.year - b.year);
    
    sortedBrands.forEach(brand => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-year">${brand.year}</div>
        <div class="timeline-content">
          <div class="timeline-name">${brand.name} ${brand.logoEmoji}</div>
          <p class="timeline-desc">Founded in ${brand.originName}</p>
        </div>
      `;
      timelineContainer.appendChild(item);
    });
  }

  // Event Listeners
  searchInput.addEventListener('input', filterBrands);
  industryFilter.addEventListener('change', filterBrands);
  yearFilter.addEventListener('change', filterBrands);

  // Initial Render
  renderBrands(brandsData);
  renderTimeline();
});

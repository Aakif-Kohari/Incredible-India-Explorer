/**
 * Prehistoric India Explorer Landing Page Core Script
 * Comprehensive paleontological, archaeological, and geological exploration engine
 */

(function () {
  'use strict';

  // Prehistoric Sites Database
  const PREHISTORIC_SITES = [
    {
      id: 'raiyoli',
      name: 'Raiyoli Dinosaur Site',
      location: 'Balasinor, Mahisagar District, Gujarat',
      region: 'West',
      category: 'dinosaur',
      era: 'mesozoic',
      period: 'Late Cretaceous (Maastrichtian, ~68–66 Ma)',
      formation: 'Lameta Formation (Calcareous Sandstone)',
      evidenceType: 'bone',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
      tag: "India's Jurassic Park",
      coords: '22.98° N, 73.35° E',
      desc: 'One of the largest dinosaur fossil fields in the world. Yielded skeletal remains of apex predator Rajasaurus narmadensis, Rahiolisaurus, and thousands of fossilized titanosaur egg clutches.',
      keyFossils: 'Rajasaurus, Rahiolisaurus, Sauropod clutches',
      museum: 'Balasinor Dinosaur Museum & Fossil Park',
      link: '../raiyoli-dinosaur-fossils/index.html'
    },
    {
      id: 'jabalpur',
      name: 'Lameta Ghat & Bara Simla',
      location: 'Jabalpur, Madhya Pradesh',
      region: 'Central',
      category: 'geology',
      era: 'mesozoic',
      period: 'Late Cretaceous (~70–66 Ma)',
      formation: 'Lameta Formation Type Horizon',
      evidenceType: 'bone',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      tag: 'Type Horizon',
      coords: '23.16° N, 79.93° E',
      desc: 'The historic type locality where Captain William Sleeman discovered India’s first dinosaur bones in 1828. Famous for Isisaurus and Titanosaurus indicus.',
      keyFossils: 'Isisaurus colberti, Titanosaurus indicus, Jainosaurus',
      museum: 'GSI Paleontological Gallery & Regional Centers',
      link: '../lameta-formation-dinosaur-record/index.html'
    },
    {
      id: 'dhar',
      name: 'Dhar & Bagh Dinosaur Nesting Beds',
      location: 'Dhar & Narmada Valley, Madhya Pradesh',
      region: 'Central',
      category: 'fossil',
      era: 'mesozoic',
      period: 'Late Cretaceous (~68–66 Ma)',
      formation: 'Lameta & Bagh Beds',
      evidenceType: 'egg',
      image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80',
      tag: '256+ Fossil Eggs',
      coords: '22.60° N, 75.30° E',
      desc: 'Groundbreaking 2023 discoveries uncovered 92 titanosaur nesting colonies holding over 256 fossilized eggs, indicating massive colonial nesting grounds.',
      keyFossils: 'Megaloolithus clutches, oviraptorosaur eggs',
      museum: 'Ashmadha Fossil Park Mandu & National Fossil Park',
      link: '../dinosaur-nesting-sites-india/index.html'
    },
    {
      id: 'bhimbetka',
      name: 'Bhimbetka Rock Shelters',
      location: 'Raisen District, Madhya Pradesh',
      region: 'Central',
      category: 'rock-art',
      era: 'mesolithic-neolithic',
      period: 'Paleolithic to Mesolithic (~100,000 to 10,000 BP)',
      formation: 'Vindhyan Supergroup Sandstone',
      evidenceType: 'rock-art',
      image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=600&q=80',
      tag: 'UNESCO World Heritage',
      coords: '22.93° N, 77.61° E',
      desc: 'Over 750 rock shelters spanning from Lower Paleolithic Acheulean tools to vibrant Mesolithic paintings depicting prehistoric hunting, rituals, and megafauna.',
      keyFossils: 'Rock art pigments, Acheulean bifaces, microliths',
      museum: 'ASI Site Museum Bhimbetka',
      link: '../prehistoric-india-explorer/index.html#bhimbetka'
    },
    {
      id: 'hathnora',
      name: 'Hathnora (Narmada Hominid Site)',
      location: 'Sehore District, Narmada Valley, MP',
      region: 'Central',
      category: 'early-human',
      era: 'cenozoic',
      period: 'Middle Pleistocene (~500,000 to 250,000 BP)',
      formation: 'Narmada Valley Alluvial Quaternary Beds',
      evidenceType: 'bone',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      tag: 'Narmada Man Discovery',
      coords: '22.87° N, 77.88° E',
      desc: 'Site of India’s only fossil hominid calvarium (skull cap) discovered by Dr. Arun Sonakia in 1982, representing archaic Homo erectus / Homo sapiens.',
      keyFossils: 'Narmada hominid skull cap, Stegodon namadicus tusks',
      museum: 'GSI Central Paleontology Lab Kolkata',
      link: '../prehistoric-animals/index.html'
    },
    {
      id: 'attirampakkam',
      name: 'Attirampakkam Acheulean Site',
      location: 'Kortallayar River Basin, Tamil Nadu',
      region: 'South',
      category: 'stone-age',
      era: 'paleolithic',
      period: 'Lower Paleolithic (~1.5 Million Years BP)',
      formation: 'Ferruginous gravel & clay horizons',
      evidenceType: 'tool',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      tag: 'Oldest Tools in S. Asia',
      coords: '13.23° N, 79.88° E',
      desc: 'Pioneering excavation revealing 1.5-million-year-old Acheulean handaxes and cleavers, pushing back early hominid migration into the Indian subcontinent.',
      keyFossils: 'Acheulean bifaces, Levallois stone blades',
      museum: 'Sharma Centre for Heritage Education Chennai',
      link: '../acheulean-stone-technology/index.html'
    },
    {
      id: 'siwalik',
      name: 'Siwalik Fossil Beds (Potwar & Haritalyangar)',
      location: 'Himachal Pradesh, Punjab, & J&K',
      region: 'North',
      category: 'mammal',
      era: 'cenozoic',
      period: 'Miocene to Early Pleistocene (~18 to 2 Ma)',
      formation: 'Siwalik Group (Molasse Sediments)',
      evidenceType: 'bone',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      tag: 'Siwalik Megafauna',
      coords: '31.53° N, 76.65° E',
      desc: 'Extremely rich Cenozoic mammalian graveyard preserving giant giraffids (Sivatherium), four-tusked mastodons, hominoids (Sivapithecus), and giant tortoises.',
      keyFossils: 'Sivatherium, Stegodon, Sivapithecus indicus',
      museum: 'Saketi Fossil Park Himachal Pradesh',
      link: '../prehistoric-animals/index.html'
    },
    {
      id: 'darakichattan',
      name: 'Daraki-Chattan Petroglyphs',
      location: 'Bhanpura, Mandsaur District, MP',
      region: 'Central',
      category: 'rock-art',
      era: 'paleolithic',
      period: 'Lower Paleolithic (~500,000+ BP)',
      formation: 'Rewa Sandstone Escarpment',
      evidenceType: 'rock-art',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      tag: 'Oldest Petroglyphs',
      coords: '24.52° N, 75.73° E',
      desc: 'Recognized as among the oldest rock art in the world, featuring hundreds of hemispherical cupules engraved on hard quartzite rock dating to the Acheulean.',
      keyFossils: 'Quartzite cupules, Acheulean hammerstones',
      museum: 'Bhanpura Museum & MP Archaeology Centre',
      link: '../daraki-chattan-engravings/index.html'
    },
    {
      id: 'isampur',
      name: 'Isampur Acheulean Quarry',
      location: 'Hunsgi Valley, Yadgir District, Karnataka',
      region: 'South',
      category: 'stone-age',
      era: 'paleolithic',
      period: 'Lower Paleolithic (~1.2 Million Years BP)',
      formation: 'Limestone Bedrock Quarries',
      evidenceType: 'tool',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
      tag: 'Ancient Tool Workshop',
      coords: '16.50° N, 76.80° E',
      desc: 'One of the earliest recognized in-situ stone tool manufacturing workshops in Asia, showcasing systematized quarrying of limestone blocks into handaxes.',
      keyFossils: 'Limestone cleavers, handaxes, hammerstones',
      museum: 'Deccan College Archaeological Museum Pune',
      link: '../acheulean-stone-technology/index.html'
    },
    {
      id: 'didwana',
      name: 'Didwana Paleolithic Basin',
      location: 'Nagaur District, Thar Desert, Rajasthan',
      region: 'West',
      category: 'stone-age',
      era: 'paleolithic',
      period: 'Lower to Middle Paleolithic (~800,000–50,000 BP)',
      formation: 'Singi Talav Playas & Calcrete Beds',
      evidenceType: 'tool',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
      tag: 'Thar Desert Sequence',
      coords: '27.40° N, 74.57° E',
      desc: 'Continuous stratified evolutionary sequence in the Thar Desert showing transitions from Early Acheulean tools to Middle Paleolithic flake blades.',
      keyFossils: 'Singi Talav Acheulean bifaces, Quartzite tools',
      museum: 'Central Arid Zone Museum Jodhpur',
      link: '../didwana-stone-age-tools/index.html'
    },
    {
      id: 'ariyalur',
      name: 'Ariyalur & Kallamedu Formation',
      location: 'Ariyalur District, Tamil Nadu',
      region: 'South',
      category: 'fossil',
      era: 'mesozoic',
      period: 'Late Cretaceous (~70–65 Ma)',
      formation: 'Kallamedu & Uttatur Formations',
      evidenceType: 'marine',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      tag: 'Cretaceous Sea & Land',
      coords: '11.14° N, 79.07° E',
      desc: 'A world-famous Cretaceous fossil haven featuring massive ammonites, fossilized marine reptiles, alongside sauropod dinosaur bones and clutches.',
      keyFossils: 'Pachydiscus ammonites, Bruhathkayosaurus bones',
      museum: 'Government Museum Ariyalur & Fossil Park',
      link: '../marine-fossils/index.html'
    },
    {
      id: 'kutch',
      name: 'Kutch Mesozoic Basin',
      location: 'Kutch District, Gujarat',
      region: 'West',
      category: 'fossil',
      era: 'mesozoic',
      period: 'Jurassic to Cretaceous (~165–66 Ma)',
      formation: 'Patcham, Chari, & Katrol Formations',
      evidenceType: 'marine',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80',
      tag: 'Tethys Sea Haven',
      coords: '23.73° N, 69.80° E',
      desc: 'World-renowned geological succession holding pristine ammonites, belemnites, corals, and fossilized marine wood from the ancient Tethys Ocean.',
      keyFossils: 'Macrocephalites ammonites, Trigonia bivalves',
      museum: 'Kutch Fossil Park & Kutch Museum Bhuj',
      link: '../marine-fossils/index.html'
    }
  ];

  // Geological Timeline Milestones
  const TIMELINE_DATA = [
    {
      era: 'Archaean & Proterozoic',
      mya: '3.5 Ga – 1.0 Ga',
      title: 'First Life & Stromatolite Reefs',
      desc: 'Ancient microbial mats form cyanobacterial stromatolites in Vindhyan and Cuddapah basins, producing Earth’s early oxygen.'
    },
    {
      era: 'Permian (Palaeozoic)',
      mya: '290 – 250 Ma',
      title: 'Gondwana Flora & Glaciation',
      desc: 'India is part of southern supercontinent Gondwana. Vast coal deposits form from Glossopteris flora, alongside Talchir glacial tillites.'
    },
    {
      era: 'Early Jurassic (Mesozoic)',
      mya: '180 – 170 Ma',
      title: 'Early Giant Dinosaurs of Godavari Basin',
      desc: 'Kotasaurus and Barapasaurus tagorei emerge in Telangana’s Kota Formation, representing some of the world’s earliest gigantic sauropods.'
    },
    {
      era: 'Late Cretaceous (Mesozoic)',
      mya: '70 – 66 Ma',
      title: 'The Lameta Horizon & Rajasaurus Era',
      desc: 'As India isolates as an island continent, Rajasaurus, Isisaurus, and Jainosaurus dominate riverine valleys with extensive nesting grounds in Raiyoli & Dhar.'
    },
    {
      era: 'Cretaceous-Paleogene Boundary',
      mya: '66 Ma',
      title: 'Deccan Traps Volcanism & K-Pg Mass Extinction',
      desc: 'Immense basaltic eruptions flood central India with over 1 million km³ of lava, playing a crucial role in non-avian dinosaur extinction.'
    },
    {
      era: 'Miocene to Pliocene (Cenozoic)',
      mya: '18 – 2.5 Ma',
      title: 'Himalayan Orogeny & Siwalik Megafauna',
      desc: 'Indian plate slams into Eurasia, raising the Himalayas. Foothill marsh basins support massive fauna including Stegodon, Sivatherium, and Sivapithecus.'
    },
    {
      era: 'Pleistocene (Quaternary)',
      mya: '1.5 Ma – 200,000 BP',
      title: 'Acheulean Hominid Dispersal & Narmada Man',
      desc: 'Early humans manufacture Acheulean handaxes at Attirampakkam and Isampur; Narmada hominid inhabits the river valleys.'
    },
    {
      era: 'Mesolithic & Neolithic (Holocene)',
      mya: '10,000 – 4,000 BP',
      title: 'Rock Art Sanctuaries & First Farming Settlements',
      desc: 'Hunter-gatherers paint sacred rock shelters at Bhimbetka, transitioning to early agriculture and polished stone axes at Mehrgarh and Burzahom.'
    }
  ];

  // Trivia Quiz Questions
  const QUIZ_DATA = [
    {
      question: 'Which carnivorous theropod dinosaur with a distinct single horn on its skull was discovered in the Lameta Formation at Raiyoli, Gujarat?',
      options: ['Barapasaurus tagorei', 'Rajasaurus narmadensis', 'Isisaurus colberti', 'Kotasaurus yamanpalliensis'],
      correct: 1,
      feedback: 'Correct! Rajasaurus narmadensis ("Princely Lizard of Narmada") was excavated at Raiyoli in Gujarat and formally described in 2003.'
    },
    {
      question: 'In 1982, India’s only fossilized hominid skull cap ("Narmada Man") was discovered in Madhya Pradesh at which locality?',
      options: ['Bhimbetka', 'Hathnora', 'Attirampakkam', 'Didwana'],
      correct: 1,
      feedback: 'Spot on! Dr. Arun Sonakia of the Geological Survey of India found the famous Middle Pleistocene skull cap at Hathnora in the Narmada Valley.'
    },
    {
      question: 'Which geological formation in Central and Western India is celebrated globally for its Late Cretaceous dinosaur bones and egg clutches?',
      options: ['Kota Formation', 'Lameta Formation', 'Talchir Boulder Bed', 'Siwalik Group'],
      correct: 1,
      feedback: 'Excellent! The Lameta Formation (Maastrichtian age) is India’s premier dinosaur-bearing sedimentary rock horizon.'
    },
    {
      question: 'How old are the earliest Acheulean stone tools discovered at Attirampakkam in Tamil Nadu?',
      options: ['~50,000 Years BP', '~200,000 Years BP', '~1.5 Million Years BP', '~65 Million Years BP'],
      correct: 2,
      feedback: 'Accurate! Luminescence dating confirmed Acheulean bifaces at Attirampakkam date to approximately 1.5 million years ago.'
    }
  ];

  // DOM Elements
  const categoryPills = document.querySelectorAll('.cat-pill');
  const searchInput = document.getElementById('prehistoric-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterEra = document.getElementById('filter-era');
  const filterRegion = document.getElementById('filter-region');
  const filterType = document.getElementById('filter-type');
  const profilesContainer = document.getElementById('profiles-container');
  const resultsCount = document.getElementById('results-count');
  const noResultsState = document.getElementById('no-results-state');
  const resetFiltersBtn = document.getElementById('reset-all-filters');
  const btnClearEmpty = document.getElementById('btn-clear-empty');
  const timelineStepper = document.getElementById('timeline-stepper');
  const mapPins = document.querySelectorAll('.map-pin');
  const mapFilters = document.querySelectorAll('.btn-map-filter');

  // Map Drawer elements
  const panelBadge = document.getElementById('panel-badge');
  const panelTitle = document.getElementById('panel-title');
  const panelPeriod = document.getElementById('panel-period');
  const panelImg = document.getElementById('panel-img');
  const panelTag = document.getElementById('panel-tag');
  const panelDesc = document.getElementById('panel-desc');
  const panelCoords = document.getElementById('panel-coords');
  const panelFormation = document.getElementById('panel-formation');
  const panelFossils = document.getElementById('panel-fossils');
  const panelMuseum = document.getElementById('panel-museum');
  const panelLink = document.getElementById('panel-link');

  // State Management
  let activeCategory = 'all';
  let activeEra = 'all';
  let activeRegion = 'all';
  let activeType = 'all';
  let searchQuery = '';
  let currentQuizIndex = 0;
  let quizScore = 0;

  // Initialize Page
  function init() {
    renderTimeline();
    renderProfiles();
    setupEventListeners();
    setupThemeToggle();
    setupMobileMenu();
    loadQuizQuestion();
  }

  // Render Profiles Grid
  function renderProfiles() {
    const filtered = PREHISTORIC_SITES.filter(site => {
      // Category filter
      if (activeCategory !== 'all' && site.category !== activeCategory) {
        return false;
      }
      // Era filter
      if (activeEra !== 'all' && site.era !== activeEra) {
        return false;
      }
      // Region filter
      if (activeRegion !== 'all' && site.region !== activeRegion) {
        return false;
      }
      // Discovery type filter
      if (activeType !== 'all' && site.evidenceType !== activeType) {
        return false;
      }
      // Search text filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = site.name.toLowerCase().includes(q);
        const matchesLoc = site.location.toLowerCase().includes(q);
        const matchesDesc = site.desc.toLowerCase().includes(q);
        const matchesFossils = site.keyFossils.toLowerCase().includes(q);
        const matchesFormation = site.formation.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesDesc && !matchesFossils && !matchesFormation) {
          return false;
        }
      }
      return true;
    });

    // Update count display
    resultsCount.textContent = `Showing ${filtered.length} of ${PREHISTORIC_SITES.length} prehistoric discoveries`;

    if (filtered.length === 0) {
      profilesContainer.innerHTML = '';
      noResultsState.style.display = 'block';
      return;
    }

    noResultsState.style.display = 'none';

    profilesContainer.innerHTML = filtered.map(site => `
      <article class="profile-card" data-id="${site.id}">
        <div class="card-media">
          <img src="${site.image}" alt="${site.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80'">
          <span class="card-badge">${getCategoryEmoji(site.category)} ${capitalize(site.category)}</span>
          <span class="card-era-tag">${site.tag}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${site.name}</h3>
          <span class="card-location">📍 ${site.location}</span>
          <p class="card-description">${site.desc}</p>
          
          <div class="card-specs">
            <div><strong>⏳ Age:</strong> ${site.period}</div>
            <div><strong>🪨 Formation:</strong> ${site.formation}</div>
            <div><strong>🔬 Key Finds:</strong> ${site.keyFossils}</div>
          </div>

          <div class="card-footer">
            <a href="${site.link}" class="card-link">
              Explore Site &amp; Fossils ➔
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  function getCategoryEmoji(cat) {
    switch (cat) {
      case 'dinosaur': return '🦖';
      case 'fossil': return '🔍';
      case 'mammal': return '🦣';
      case 'early-human': return '👤';
      case 'rock-art': return '🎨';
      case 'stone-age': return '⛏️';
      case 'geology': return '🪨';
      default: return '🌐';
    }
  }

  function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ');
  }

  // Render Geological Timeline
  function renderTimeline() {
    timelineStepper.innerHTML = TIMELINE_DATA.map((item, idx) => `
      <div class="timeline-node">
        <div class="timeline-marker">${idx + 1}</div>
        <div class="timeline-card">
          <div class="timeline-meta">
            <span class="timeline-era">${item.era}</span>
            <span class="timeline-mya">${item.mya}</span>
          </div>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Map Site Selection Update
  function selectMapSite(siteId) {
    const site = PREHISTORIC_SITES.find(s => s.id === siteId);
    if (!site) return;

    panelBadge.textContent = `${getCategoryEmoji(site.category)} ${capitalize(site.category)}`;
    panelTitle.textContent = site.name;
    panelPeriod.textContent = site.period;
    panelImg.src = site.image;
    panelImg.alt = site.name;
    panelTag.textContent = site.tag;
    panelDesc.textContent = site.desc;
    panelCoords.textContent = site.coords;
    panelFormation.textContent = site.formation;
    panelFossils.textContent = site.keyFossils;
    panelMuseum.textContent = site.museum;
    panelLink.href = site.link;

    // Smooth scroll to side panel on smaller screens
    if (window.innerWidth < 960) {
      document.getElementById('map-site-panel').scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Category pills click
    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        activeCategory = pill.dataset.category;
        renderProfiles();
      });
    });

    // Search Input with Debounce
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim();
        renderProfiles();
      }, 250);
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      renderProfiles();
    });

    // Dropdowns
    filterEra.addEventListener('change', (e) => {
      activeEra = e.target.value;
      renderProfiles();
    });

    filterRegion.addEventListener('change', (e) => {
      activeRegion = e.target.value;
      renderProfiles();
    });

    filterType.addEventListener('change', (e) => {
      activeType = e.target.value;
      renderProfiles();
    });

    // Reset Filters
    function resetAll() {
      activeCategory = 'all';
      activeEra = 'all';
      activeRegion = 'all';
      activeType = 'all';
      searchQuery = '';
      searchInput.value = '';
      filterEra.value = 'all';
      filterRegion.value = 'all';
      filterType.value = 'all';
      categoryPills.forEach((p, i) => {
        p.classList.toggle('active', i === 0);
        p.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      });
      renderProfiles();
    }

    resetFiltersBtn.addEventListener('click', resetAll);
    btnClearEmpty.addEventListener('click', resetAll);

    // Map Pin Interactions
    mapPins.forEach(pin => {
      pin.addEventListener('click', () => {
        selectMapSite(pin.dataset.site);
      });
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectMapSite(pin.dataset.site);
        }
      });
    });

    // Map Category Filter buttons
    mapFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        mapFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.mapFilter;

        mapPins.forEach(pin => {
          const site = PREHISTORIC_SITES.find(s => s.id === pin.dataset.site);
          if (!site) return;

          if (filter === 'all') {
            pin.style.display = 'block';
          } else if (filter === 'dinosaur' && (site.category === 'dinosaur' || site.evidenceType === 'egg')) {
            pin.style.display = 'block';
          } else if (filter === 'early-human' && (site.category === 'early-human' || site.category === 'stone-age')) {
            pin.style.display = 'block';
          } else if (filter === 'rock-art' && site.category === 'rock-art') {
            pin.style.display = 'block';
          } else if (filter === 'mammal' && site.category === 'mammal') {
            pin.style.display = 'block';
          } else {
            pin.style.display = 'none';
          }
        });
      });
    });
  }

  // Quiz / Paleontology Trivia Engine
  function loadQuizQuestion() {
    const q = QUIZ_DATA[currentQuizIndex];
    document.getElementById('quiz-counter').textContent = `Question ${currentQuizIndex + 1} of ${QUIZ_DATA.length}`;
    document.getElementById('quiz-question').textContent = q.question;

    const optContainer = document.getElementById('quiz-options');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-question');

    feedback.style.display = 'none';
    nextBtn.style.display = 'none';

    optContainer.innerHTML = q.options.map((opt, i) => `
      <button class="quiz-opt-btn" data-index="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>
    `).join('');

    optContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = parseInt(btn.dataset.index, 10);
        handleQuizAnswer(chosen);
      });
    });
  }

  function handleQuizAnswer(chosenIndex) {
    const q = QUIZ_DATA[currentQuizIndex];
    const optButtons = document.querySelectorAll('.quiz-opt-btn');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-question');
    const scoreDisplay = document.getElementById('quiz-score-live');

    optButtons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) {
        btn.classList.add('correct');
      } else if (i === chosenIndex) {
        btn.classList.add('wrong');
      }
    });

    feedback.style.display = 'block';
    if (chosenIndex === q.correct) {
      quizScore++;
      feedback.className = 'quiz-feedback success';
      feedback.textContent = `🎉 ${q.feedback}`;
    } else {
      feedback.className = 'quiz-feedback error';
      feedback.textContent = `❌ Not quite. ${q.feedback}`;
    }

    scoreDisplay.textContent = `Score: ${quizScore} / ${QUIZ_DATA.length}`;

    if (currentQuizIndex < QUIZ_DATA.length - 1) {
      nextBtn.textContent = 'Next Question ➔';
      nextBtn.style.display = 'inline-block';
      nextBtn.onclick = () => {
        currentQuizIndex++;
        loadQuizQuestion();
      };
    } else {
      nextBtn.textContent = 'Restart Quiz ↺';
      nextBtn.style.display = 'inline-block';
      nextBtn.onclick = () => {
        currentQuizIndex = 0;
        quizScore = 0;
        scoreDisplay.textContent = `Score: 0 / ${QUIZ_DATA.length}`;
        loadQuizQuestion();
      };
    }
  }

  // Theme Toggle Support
  function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }

  // Mobile Menu Toggle
  function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Bootstrapping
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for Unit Tests
  window.PrehistoricExplorer = {
    sites: PREHISTORIC_SITES,
    timeline: TIMELINE_DATA,
    quiz: QUIZ_DATA
  };
})();

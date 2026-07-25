/**
 * railways-timeline.js
 * History of Indian Railways Animated Timeline - Dataset & Interactive Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const railwayEras = [
  "All Eras",
  "Colonial Expansion (1853–1947)",
  "Post-Independence & Nationalization (1947–1990)",
  "Modernization & High-Speed (1990–Present)"
];

// Verified Historical Milestones Dataset (10 Major Milestones)
export const railwayMilestones = [
  {
    id: "m-1853",
    year: 1853,
    date: "April 16, 1853",
    title: "First Passenger Train in India",
    route: "Bori Bunder (Mumbai) to Thane (34 km)",
    era: "Colonial Expansion (1853–1947)",
    icon: "🚂",
    trainIcon: "🚂",
    trackPositionPercent: 0,
    description: "India's first commercial passenger train departed Bori Bunder station in Mumbai for Thane, covering 34 km with 14 carriages and 400 passengers.",
    significance: "Marked the birth of rail transport in South Asia, revolutionizing passenger movement and inland commerce.",
    neutralContext: "Constructed under the Great Indian Peninsula Railway (GIPR) with British capital investment, primarily aimed at connecting hinterland agricultural markets to Bombay port for global export while opening public transport.",
    techSpecs: {
      locomotives: "3 Steam Engines (Sahib, Sindh, Sultan)",
      gauge: "1676 mm (Broad Gauge)",
      passengers: 400,
      duration: "57 minutes"
    }
  },
  {
    id: "m-1854",
    year: 1854,
    date: "August 15, 1854",
    title: "First Passenger Train in Eastern India",
    route: "Howrah to Hooghly (39 km)",
    era: "Colonial Expansion (1853–1947)",
    icon: "🚂",
    trainIcon: "🚂",
    trackPositionPercent: 11,
    description: "The East Indian Railway (EIR) inaugurated Eastern India's first passenger line operating from Howrah to Hooghly.",
    significance: "Established Calcutta as the primary railway hub for Eastern India, accelerating coal transport from Raniganj mines.",
    neutralContext: "Built to facilitate raw material transport and administrative connectivity between Calcutta capital and interior Bengal provinces.",
    techSpecs: {
      locomotives: "EIR No. 2 'Fairy Queen' era steam engines",
      gauge: "Broad Gauge",
      distance: "39 km"
    }
  },
  {
    id: "m-1856",
    year: 1856,
    date: "July 1, 1856",
    title: "First Railway Line in South India",
    route: "Royapuram (Madras) to Wallajah Road (60 km)",
    era: "Colonial Expansion (1853–1947)",
    icon: "🚉",
    trainIcon: "🚂",
    trackPositionPercent: 22,
    description: "The Madras Railway Company opened the first railway line in Southern India from Royapuram to Veyasarapady & Wallajah Road.",
    significance: "Royapuram Railway Station remains the oldest surviving railway station structure operating in the Indian subcontinent today.",
    neutralContext: "Designed to link Madras presidency port with interior garrison towns and cotton-growing agricultural tracts.",
    techSpecs: {
      operator: "Madras Railway Company",
      station: "Royapuram Terminal",
      distance: "60 km"
    }
  },
  {
    id: "m-1890",
    year: 1890,
    date: "1890",
    title: "Indian Railways Act of 1890",
    route: "Pan-India Regulatory Standardization",
    era: "Colonial Expansion (1853–1947)",
    icon: "📜",
    trainIcon: "🚂",
    trackPositionPercent: 33,
    description: "Enactment of the first comprehensive legislation unifying safety codes, freight tariffs, passenger liability, and construction standards across independent private railway companies.",
    significance: "Laid the legal foundation for a single nationwide integrated network.",
    neutralContext: "Consolidated fragmented private guaranteed railway companies into a regulated state framework, standardizing technical gauge specifications.",
    techSpecs: {
      actName: "Act IX of 1890",
      scope: "Pan-British India Railway Regulation"
    }
  },
  {
    id: "m-1925",
    year: 1925,
    date: "February 3, 1925",
    title: "First Electric Train Service",
    route: "Bombay Victoria Terminus (VT) to Kurla (16 km)",
    era: "Colonial Expansion (1853–1947)",
    icon: "⚡",
    trainIcon: "⚡",
    trackPositionPercent: 44,
    description: "India's first electric passenger train ran on 1500V DC overhead traction between Bombay VT and Kurla on the Harbour Line.",
    significance: "Pioneered suburban electric traction in Asia, easing urban commuting for Greater Bombay.",
    neutralContext: "Engineered by Great Indian Peninsula Railway to handle rapid urban population growth in Mumbai without coal smog in suburban tunnels.",
    techSpecs: {
      voltage: "1500 V DC Overhead Traction",
      stock: "4-Car Cammell Laird Electric Multiple Unit (EMU)",
      distance: "16 km"
    }
  },
  {
    id: "m-1951",
    year: 1951,
    date: "1951–1952",
    title: "Nationalization & Reorganization into Zones",
    route: "State-Owned National Network",
    era: "Post-Independence & Nationalization (1947–1990)",
    icon: "🇮🇳",
    trainIcon: "🚋",
    trackPositionPercent: 55,
    description: "Integration of 42 separate princely state and private railway networks into a single unified state enterprise—Indian Railways—organized into 6 administrative zones.",
    significance: "Created one of the world's largest public sector transportation employers and lifelines for independent India.",
    neutralContext: "Post-independence government unified fragmented systems under public ownership to ensure affordable passenger fares and balanced regional development.",
    techSpecs: {
      initialZones: "6 Zonal Railways (Southern, Central, Western, Northern, Eastern, North Eastern)",
      networkSize: "53,000+ Route Kilometers"
    }
  },
  {
    id: "m-1984",
    year: 1984,
    date: "October 24, 1984",
    title: "India's First Underground Metro System",
    route: "Esplanade to Bhowanipore (Kolkata Metro)",
    era: "Post-Independence & Nationalization (1947–1990)",
    icon: "🚇",
    trainIcon: "🚇",
    trackPositionPercent: 66,
    description: "Kolkata Metro began operation as India's first underground rapid transit rail system running between Esplanade and Bhowanipore.",
    significance: "Introduced modern rapid transit technology to Indian urban cities, paving the way for future metro networks.",
    neutralContext: "Built directly by Indian Railways to relieve severe road congestion in Kolkata's dense urban core.",
    techSpecs: {
      line: "Kolkata Line 1 (North-South Corridor)",
      type: "Underground Third-Rail Electric Transit"
    }
  },
  {
    id: "m-1986",
    year: 1986,
    date: "1986",
    title: "Computerized Passenger Reservation System (PRS)",
    route: "New Delhi Pilot Launch",
    era: "Post-Independence & Nationalization (1947–1990)",
    icon: "💻",
    trainIcon: "🚋",
    trackPositionPercent: 77,
    description: "Indian Railways introduced the first IMPRESS computerized passenger reservation system at New Delhi, replacing manual ledger booking.",
    significance: "Eliminated day-long booking queues and enabled nationwide any-station-to-any-station electronic ticketing.",
    neutralContext: "Designed in partnership with BARC and CMC to handle over 10 million daily reservation transactions nationwide.",
    techSpecs: {
      systemName: "IMPRESS (Integrated Multi-train Passenger Reservation System)",
      nodes: "New Delhi, Mumbai, Kolkata, Chennai, Secunderabad"
    }
  },
  {
    id: "m-2019",
    year: 2019,
    date: "February 15, 2019",
    title: "Vande Bharat Express (Train 18) Launch",
    route: "New Delhi to Varanasi Junction",
    era: "Modernization & High-Speed (1990–Present)",
    icon: "🚅",
    trainIcon: "🚅",
    trackPositionPercent: 88,
    description: "India's first self-propelled indigenous semi-high-speed train, Vande Bharat Express (Train 18), inaugurated between New Delhi and Varanasi.",
    significance: "Demonstrated indigenous engineering capability at ICF Chennai with 160 km/h operational speeds, bio-vacuum toilets, and automatic doors.",
    neutralContext: "Developed under Make in India initiative to upgrade trunk intercity corridors with distributed power electric traction.",
    techSpecs: {
      topSpeed: "180 km/h (Test) / 160 km/h (Operational)",
      features: "Distributed Traction, Regenerative Braking, Automatic Doors, Onboard Wi-Fi"
    }
  },
  {
    id: "m-2023",
    year: 2023,
    date: "2023–Present",
    title: "100% Broad Gauge Electrification & Bullet Train (MAHSR)",
    route: "Mumbai–Ahmedabad High Speed Rail Corridor",
    era: "Modernization & High-Speed (1990–Present)",
    icon: "🚄",
    trainIcon: "🚄",
    trackPositionPercent: 100,
    description: "Achieved over 95%+ broad-gauge electrification target while advancing construction of India's first Shinkansen-based 320 km/h High-Speed Rail Corridor.",
    significance: "Transforms Indian Railways into a zero-carbon eco-friendly transport system while bridging top metro economies.",
    neutralContext: "Joint partnership between Ministry of Railways and Japan International Cooperation Agency (JICA) for Shinkansen E5 technology transfer.",
    techSpecs: {
      electrification: "95%+ Broad Gauge Electrified (25kV AC)",
      bulletTrainSpeed: "320 km/h Design Speed"
    }
  }
];

/**
 * Get milestone by ID or Year.
 */
export function getMilestoneById(id, list = railwayMilestones) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.toString().trim().toLowerCase();
  return list.find(m => m.id.toLowerCase() === target || m.year.toString() === target);
}

/**
 * Filter milestones by Era.
 */
export function getMilestonesByEra(eraParam, list = railwayMilestones) {
  if (!eraParam || !Array.isArray(list)) return [];
  const target = eraParam.trim().toLowerCase();
  if (target === "all" || target === "all eras") return list;
  return list.filter(m => m.era.toLowerCase().includes(target));
}

/**
 * Search and filter milestones by query and era.
 */
export function filterMilestones(query = "", eraFilter = "all", list = railwayMilestones) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const e = eraFilter.trim().toLowerCase();

  return list.filter(m => {
    const matchesQuery = !q || [
      m.title,
      m.year.toString(),
      m.date,
      m.route,
      m.description,
      m.significance,
      m.neutralContext
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesEra = e === "all" || e === "all eras" || m.era.toLowerCase().includes(e);

    return matchesQuery && matchesEra;
  });
}

/**
 * Calculate train track position percentage (0% to 100%).
 */
export function calculateTrainTrackPosition(index, total) {
  if (total <= 1) return 0;
  const clampedIndex = Math.max(0, Math.min(index, total - 1));
  return Math.round((clampedIndex / (total - 1)) * 100);
}

/* ==========================================================================
   BROWSER DOM & ANIMATED TIMELINE ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.railwayMilestones = railwayMilestones;
  window.railwayEras = railwayEras;
  window.getMilestoneById = getMilestoneById;
  window.getMilestonesByEra = getMilestonesByEra;
  window.filterMilestones = filterMilestones;
  window.calculateTrainTrackPosition = calculateTrainTrackPosition;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const searchInput = document.getElementById("timeline-search");
    const eraChips = document.querySelectorAll(".btn-era-chip");
    const trackLine = document.getElementById("timeline-track-progress");
    const trainIconEl = document.getElementById("animated-train-icon");
    const milestoneNodesContainer = document.getElementById("milestone-nodes");
    const activeMilestoneCard = document.getElementById("active-milestone-card");
    const prevBtn = document.getElementById("btn-prev-milestone");
    const nextBtn = document.getElementById("btn-next-milestone");

    let currentSelectedEra = "all";
    let activeMilestoneIndex = 0;
    let currentFilteredList = [...railwayMilestones];

    // Render Milestone Nodes along horizontal track
    function renderMilestoneTrack() {
      if (!milestoneNodesContainer) return;
      milestoneNodesContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      currentFilteredList = filterMilestones(query, currentSelectedEra);

      if (currentFilteredList.length === 0) {
        if (activeMilestoneCard) {
          activeMilestoneCard.innerHTML = `
            <div class="empty-msg-card">
              <h3>No Rail Milestones Found</h3>
              <p>Try adjusting your search query or era filter.</p>
            </div>
          `;
        }
        return;
      }

      if (activeMilestoneIndex >= currentFilteredList.length) {
        activeMilestoneIndex = 0;
      }

      currentFilteredList.forEach((m, idx) => {
        const node = document.createElement("button");
        node.type = "button";
        node.className = `milestone-node ${idx === activeMilestoneIndex ? "active" : ""}`;
        const posPercent = calculateTrainTrackPosition(idx, currentFilteredList.length);
        node.style.left = `${posPercent}%`;

        node.innerHTML = `
          <span class="node-year">${m.year}</span>
          <span class="node-dot">${m.icon}</span>
        `;

        node.addEventListener("click", () => {
          activeMilestoneIndex = idx;
          updateTimelineView();
        });

        milestoneNodesContainer.appendChild(node);
      });

      updateTimelineView();
    }

    // Update Animated Train Position & Active Card View
    function updateTimelineView() {
      if (currentFilteredList.length === 0) return;

      const currentItem = currentFilteredList[activeMilestoneIndex];
      const posPercent = calculateTrainTrackPosition(activeMilestoneIndex, currentFilteredList.length);

      // Animate Progress Bar & Train Icon along track
      if (trackLine) {
        trackLine.style.width = `${posPercent}%`;
      }

      if (trainIconEl) {
        trainIconEl.style.left = `${posPercent}%`;
        trainIconEl.textContent = currentItem.trainIcon || "🚂";
      }

      // Update Node active state
      const nodes = milestoneNodesContainer?.querySelectorAll(".milestone-node");
      nodes?.forEach((n, idx) => {
        n.classList.toggle("active", idx === activeMilestoneIndex);
      });

      // Render Active Milestone Inspector Card
      if (activeMilestoneCard && currentItem) {
        activeMilestoneCard.innerHTML = `
          <div class="inspector-card-header">
            <span class="era-badge">${currentItem.era}</span>
            <span class="date-badge">📅 ${currentItem.date}</span>
          </div>

          <h2>${currentItem.icon} ${currentItem.title}</h2>
          <p class="route-info">📍 <strong>Route / Corridor:</strong> ${currentItem.route}</p>

          <div class="inspector-body">
            <div class="desc-box">
              <h4>📖 Historical Overview</h4>
              <p>${currentItem.description}</p>
            </div>

            <div class="significance-box">
              <h4>✨ Cultural & Economic Significance</h4>
              <p>${currentItem.significance}</p>
            </div>

            <div class="neutral-box">
              <h4>⚖️ Historical Context & Factual Analysis</h4>
              <p>${currentItem.neutralContext}</p>
            </div>

            <div class="tech-specs-box">
              <h4>🛠️ Technical Specifications</h4>
              <ul>
                ${Object.entries(currentItem.techSpecs || {}).map(([k, v]) => `<li><strong>${k.toUpperCase()}:</strong> ${v}</li>`).join("")}
              </ul>
            </div>
          </div>
        `;
      }
    }

    // Controls Navigation
    prevBtn?.addEventListener("click", () => {
      if (currentFilteredList.length === 0) return;
      activeMilestoneIndex = (activeMilestoneIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
      updateTimelineView();
    });

    nextBtn?.addEventListener("click", () => {
      if (currentFilteredList.length === 0) return;
      activeMilestoneIndex = (activeMilestoneIndex + 1) % currentFilteredList.length;
      updateTimelineView();
    });

    // Era Filter Chips Listener
    eraChips.forEach(chip => {
      chip.addEventListener("click", () => {
        eraChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentSelectedEra = chip.dataset.era;
        activeMilestoneIndex = 0;
        renderMilestoneTrack();
      });
    });

    // Search Listener
    searchInput?.addEventListener("input", () => {
      activeMilestoneIndex = 0;
      renderMilestoneTrack();
    });

    // Initial Render
    renderMilestoneTrack();
  });
}

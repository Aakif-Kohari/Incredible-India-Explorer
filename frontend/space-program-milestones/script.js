/**
 * space-program-milestones script.js
 * Interactive Animated Explainer for ISRO's Evolution and Space Program Milestones.
 * Uses SVG dynamic orbital trajectories, scroll/click telemetry, and responsive animations.
 */

const SPACE_MILESTONES_DATA = [
  {
    id: "founding-aryabhata",
    year: 1975,
    foundingYear: 1969,
    title: "ISRO Founding & Aryabhata",
    subtitle: "Birth of India's Space Age",
    category: "Satellite Pioneer",
    date: "April 19, 1975",
    vehicle: "Kosmos-3M",
    launchSite: "Kapustin Yar, USSR",
    orbitType: "LEO",
    altitude: "563 km x 619 km",
    inclination: "50.7°",
    description: "Formed in 1969 under Vikram Sarabhai's vision, ISRO designed India's first satellite, Aryabhata. Named after the ancient astronomer, it conducted X-ray astronomy and solar physics experiments.",
    keyAchievments: [
      "Established indigenous satellite engineering capability",
      "Pioneered telemetry, tracking, and command (TTC) networks",
      "Laid foundation for satellite-based rural education (SITE)"
    ],
    orbitSpec: {
      type: "LEO",
      color: "#38bdf8",
      radiusX: 180,
      radiusY: 60,
      rotation: -10,
      animationSpeed: "4s"
    }
  },
  {
    id: "slv3-rohini",
    year: 1980,
    title: "SLV-3 & Rohini RS-1",
    subtitle: "First Indigenous Satellite Launch Vehicle",
    category: "Rocketry Pioneer",
    date: "July 18, 1980",
    vehicle: "SLV-3 (Project Director: Dr. A.P.J. Abdul Kalam)",
    launchSite: "SDSC SHAR, Sriharikota",
    orbitType: "LEO",
    altitude: "305 km x 919 km",
    inclination: "44.7°",
    description: "With the successful launch of Rohini RS-1 aboard SLV-3, India became the 6th spacefaring nation capable of placing a satellite into orbit using an indigenous launch vehicle.",
    keyAchievments: [
      "First successful four-stage solid propellant rocket launch",
      "In-orbit verification of spin-stabilized satellite payload",
      "Catalyzed India's launch vehicle development roadmap"
    ],
    orbitSpec: {
      type: "LEO",
      color: "#4ade80",
      radiusX: 200,
      radiusY: 70,
      rotation: 5,
      animationSpeed: "3.5s"
    }
  },
  {
    id: "insat-1b",
    year: 1983,
    title: "INSAT-1B Communications",
    subtitle: "Geostationary Telecommunications Revolution",
    category: "Communication & Weather",
    date: "August 30, 1983",
    vehicle: "Space Shuttle Challenger / Delta 3914",
    launchSite: "Cape Canaveral, USA",
    orbitType: "GEO",
    altitude: "35,786 km",
    inclination: "0.0°",
    description: "INSAT-1B revolutionized India's telecommunications, television broadcasting, and meteorological warning networks, connecting remote islands and rural villages to national infrastructure.",
    keyAchievments: [
      "Multipurpose satellite combining telecom, TV, and weather radar",
      "Drastically improved cyclone early warning capabilities",
      "Expanded national Doordarshan coverage to over 70% population"
    ],
    orbitSpec: {
      type: "GEO",
      color: "#facc15",
      radiusX: 260,
      radiusY: 100,
      rotation: 0,
      animationSpeed: "6s"
    }
  },
  {
    id: "chandrayaan-1",
    year: 2008,
    title: "Chandrayaan-1 Moon Mission",
    subtitle: "Discovery of Water Molecules on the Moon",
    category: "Deep Space Exploration",
    date: "October 22, 2008",
    vehicle: "PSLV-C11",
    launchSite: "SDSC SHAR, Sriharikota",
    orbitType: "Lunar Polar Orbit",
    altitude: "100 km Lunar Orbit",
    inclination: "90° Lunar",
    description: "India's maiden lunar probe carried the Moon Impact Probe (MIP) and NASA's M3 payload, leading to the epochal scientific confirmation of water molecules (H2O and OH) on the lunar surface.",
    keyAchievments: [
      "Confirmed presence of hydroxyl and water molecules on lunar regolith",
      "High-resolution 3D atlas of lunar topography and mineralogy",
      "First deep-space probe operated by ISRO using Indian Deep Space Network"
    ],
    orbitSpec: {
      type: "Lunar Transfer",
      color: "#e879f9",
      radiusX: 310,
      radiusY: 120,
      rotation: -25,
      animationSpeed: "5s"
    }
  },
  {
    id: "mangalyaan-mom",
    year: 2013,
    title: "Mangalyaan (Mars Orbiter Mission)",
    subtitle: "Maiden Interplanetary Triumph",
    category: "Interplanetary Exploration",
    date: "November 5, 2013",
    vehicle: "PSLV-C25",
    launchSite: "SDSC SHAR, Sriharikota",
    orbitType: "Mars Orbit",
    altitude: "421 km x 76,993 km",
    inclination: "150.0°",
    description: "India became the first nation in the world to reach Martian orbit on its maiden attempt, and the fourth space agency globally. Built at record frugality ($74 million), it operated for nearly 8 years.",
    keyAchievments: [
      "100% success on maiden interplanetary mission",
      "Demonstrated complex Trans-Mars Injection maneuver physics",
      "Captured full-disc Martian imagery and exospheric methane metrics"
    ],
    orbitSpec: {
      type: "Mars Transfer",
      color: "#f87171",
      radiusX: 350,
      radiusY: 140,
      rotation: 20,
      animationSpeed: "7s"
    }
  },
  {
    id: "chandrayaan-3",
    year: 2023,
    title: "Chandrayaan-3 South Pole Landing",
    subtitle: "Historic Lunar South Pole Soft Landing",
    category: "Lunar Exploration & Landing",
    date: "August 23, 2023 (Touchdown)",
    vehicle: "LVM3-M4",
    launchSite: "SDSC SHAR, Sriharikota",
    orbitType: "Lunar Polar Landing",
    altitude: "Surface (69.37°S, 32.35°E)",
    inclination: "Lunar South Pole",
    description: "India made history as the first nation to soft-land near the lunar South Pole with Vikram Lander and Pragyan Rover, performing in-situ elemental analysis of lunar soil.",
    keyAchievments: [
      "First spacecraft to touch down near Moon's South Pole (Shiv Shakti Point)",
      "Detected Sulphur (S) and minerals using LIBS and APXS on Pragyan rover",
      "Successful lunar hop experiment demonstrating future sample return physics"
    ],
    orbitSpec: {
      type: "Lunar Polar Landing",
      color: "#60a5fa",
      radiusX: 290,
      radiusY: 110,
      rotation: -15,
      animationSpeed: "4.5s"
    }
  },
  {
    id: "aditya-l1",
    year: 2023,
    title: "Aditya-L1 Solar Observatory",
    subtitle: "Unlocking Sun's Coronal Dynamics from L1",
    category: "Space Astronomy",
    date: "September 2, 2023",
    vehicle: "PSLV-C57",
    launchSite: "SDSC SHAR, Sriharikota",
    orbitType: "Lagrange L1 Halo",
    altitude: "1.5 Million km from Earth",
    inclination: "Halo Path",
    description: "Placed in a halo orbit around the Sun-Earth Lagrange Point 1 (L1), Aditya-L1 provides uninterrupted observation of the Sun without occultation or eclipses to study coronal heating and solar wind.",
    keyAchievments: [
      "India's first dedicated solar observatory mission",
      "Continuous tracking of Coronal Mass Ejections (CMEs) and solar flares",
      "Advanced complex 3D halo orbit insertion maneuvers"
    ],
    orbitSpec: {
      type: "Lagrange L1 Halo",
      color: "#fb923c",
      radiusX: 380,
      radiusY: 150,
      rotation: 10,
      animationSpeed: "8s"
    }
  },
  {
    id: "gaganyaan-program",
    year: 2025,
    title: "Gaganyaan Human Spaceflight",
    subtitle: "Pioneering Indian Human Spaceflight Capability",
    category: "Human Spaceflight",
    date: "Targeted 2025-2026",
    vehicle: "LVM3-Gaganyaan (HLVM3)",
    launchSite: "SDSC SHAR, Sriharikota",
    orbitType: "Human Rated LEO",
    altitude: "400 km LEO",
    inclination: "51.6°",
    description: "Gaganyaan will demonstrate human spaceflight capability by launching a crew of 3 astronauts into a 400 km orbit for a 3-day mission, safely returning via ocean splashdown in Indian waters.",
    keyAchievments: [
      "Human-rated launch vehicle (HLVM3) with emergency escape system",
      "Indigenous Orbital Module (Crew Module + Service Module) life support",
      "Foundation for Bharatiya Antariksha Station (BAS) space station"
    ],
    orbitSpec: {
      type: "Human Rated LEO",
      color: "#a855f7",
      radiusX: 220,
      radiusY: 80,
      rotation: -5,
      animationSpeed: "3s"
    }
  }
];

/**
 * Validates dataset structure.
 */
function validateSpaceMilestonesData(data) {
  if (!Array.isArray(data)) return { isValid: false, errors: ["Data is not an array"] };
  const errors = [];
  data.forEach((item, index) => {
    if (!item.id) errors.push(`Item at ${index} missing id`);
    if (!item.year || typeof item.year !== 'number') errors.push(`Item ${item.id || index} missing valid year`);
    if (!item.title) errors.push(`Item ${item.id || index} missing title`);
    if (!item.orbitSpec || !item.orbitSpec.type) errors.push(`Item ${item.id || index} missing orbitSpec`);
    if (!Array.isArray(item.keyAchievments) || item.keyAchievments.length === 0) {
      errors.push(`Item ${item.id || index} missing keyAchievments`);
    }
  });
  return { isValid: errors.length === 0, errors };
}

/**
 * Retrieves milestone by ID.
 */
function getMilestoneById(id, dataset = SPACE_MILESTONES_DATA) {
  if (!id) return dataset[0];
  const found = dataset.find(m => m.id.toLowerCase() === id.toLowerCase().trim());
  return found || dataset[0];
}

/**
 * Calculates SVG path stroke-dashoffset based on progress (0-100%).
 */
function calculateOrbitPathDashOffset(progressPercentage, pathLength = 1000) {
  const boundedProgress = Math.max(0, Math.min(100, progressPercentage));
  const offset = pathLength - (pathLength * (boundedProgress / 100));
  return Math.round(offset * 100) / 100;
}

/**
 * Returns color hex code for orbit type.
 */
function getOrbitColorByClass(orbitType) {
  switch ((orbitType || '').toUpperCase()) {
    case 'LEO':
      return '#38bdf8';
    case 'GEO':
      return '#facc15';
    case 'LUNAR POLAR ORBIT':
    case 'LUNAR TRANSFER':
    case 'LUNAR POLAR LANDING':
      return '#e879f9';
    case 'MARS ORBIT':
    case 'MARS TRANSFER':
      return '#f87171';
    case 'LAGRANGE L1 HALO':
      return '#fb923c';
    case 'HUMAN RATED LEO':
      return '#a855f7';
    default:
      return '#38bdf8';
  }
}

// Browser UI Controller logic
let activeMilestoneIndex = 0;

function renderMilestoneUI(index) {
  const milestone = SPACE_MILESTONES_DATA[index];
  if (!milestone) return;

  const cardContainer = document.getElementById('milestone-detail-card');
  const orbitTitle = document.getElementById('orbit-title');
  const orbitSubtitle = document.getElementById('orbit-subtitle');
  const telemetryOrbit = document.getElementById('telemetry-orbit');
  const telemetryAltitude = document.getElementById('telemetry-altitude');
  const telemetryVehicle = document.getElementById('telemetry-vehicle');
  const orbitSvgPath = document.getElementById('orbit-svg-path');
  const orbitCraftDot = document.getElementById('orbit-craft-dot');

  if (orbitTitle) orbitTitle.textContent = milestone.title;
  if (orbitSubtitle) orbitSubtitle.textContent = milestone.subtitle;
  if (telemetryOrbit) telemetryOrbit.textContent = milestone.orbitType;
  if (telemetryAltitude) telemetryAltitude.textContent = milestone.altitude;
  if (telemetryVehicle) telemetryVehicle.textContent = milestone.vehicle;

  // Update card content
  if (cardContainer) {
    cardContainer.innerHTML = `
      <div class="milestone-badge" style="background: ${milestone.orbitSpec.color}22; color: ${milestone.orbitSpec.color}; border: 1px solid ${milestone.orbitSpec.color}55;">
        <span>${milestone.year}</span> • <span>${milestone.category}</span>
      </div>
      <h2 class="milestone-card-title">${milestone.title}</h2>
      <p class="milestone-card-subtitle">${milestone.subtitle}</p>
      
      <div class="milestone-meta-grid">
        <div class="meta-item"><span class="meta-label">Launch Date:</span> <span class="meta-value">${milestone.date}</span></div>
        <div class="meta-item"><span class="meta-label">Launch Vehicle:</span> <span class="meta-value">${milestone.vehicle}</span></div>
        <div class="meta-item"><span class="meta-label">Orbit Regime:</span> <span class="meta-value">${milestone.orbitType}</span></div>
        <div class="meta-item"><span class="meta-label">Altitude:</span> <span class="meta-value">${milestone.altitude}</span></div>
      </div>

      <p class="milestone-description">${milestone.description}</p>

      <div class="achievements-section">
        <h3>Key Mission Accomplishments</h3>
        <ul>
          ${milestone.keyAchievments.map(ach => `<li><i class="fas fa-check-circle" style="color: ${milestone.orbitSpec.color}"></i> ${ach}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Update SVG Orbit animation path
  if (orbitSvgPath) {
    const spec = milestone.orbitSpec;
    const pathD = `M ${400 - spec.radiusX} 250 A ${spec.radiusX} ${spec.radiusY} ${spec.rotation} 1 0 ${400 + spec.radiusX} 250 A ${spec.radiusX} ${spec.radiusY} ${spec.rotation} 1 0 ${400 - spec.radiusX} 250`;
    orbitSvgPath.setAttribute('d', pathD);
    orbitSvgPath.setAttribute('stroke', spec.color);
    orbitSvgPath.style.strokeDasharray = '1000';
    orbitSvgPath.style.strokeDashoffset = '0';
  }

  if (orbitCraftDot) {
    orbitCraftDot.setAttribute('fill', milestone.orbitSpec.color);
  }

  // Update nav buttons active states
  const buttons = document.querySelectorAll('.timeline-step-btn');
  buttons.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });
}

function initSpaceMilestonesApp() {
  const timelineNav = document.getElementById('timeline-stepper');
  if (timelineNav) {
    timelineNav.innerHTML = SPACE_MILESTONES_DATA.map((item, idx) => `
      <button class="timeline-step-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to ${item.title}">
        <span class="step-year">${item.year}</span>
        <span class="step-title">${item.title.split(' ')[0]}</span>
      </button>
    `).join('');

    timelineNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.timeline-step-btn');
      if (btn) {
        const index = parseInt(btn.dataset.index, 10);
        activeMilestoneIndex = index;
        renderMilestoneUI(index);
      }
    });
  }

  const prevBtn = document.getElementById('prev-milestone-btn');
  const nextBtn = document.getElementById('next-milestone-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeMilestoneIndex > 0) {
        activeMilestoneIndex--;
        renderMilestoneUI(activeMilestoneIndex);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeMilestoneIndex < SPACE_MILESTONES_DATA.length - 1) {
        activeMilestoneIndex++;
        renderMilestoneUI(activeMilestoneIndex);
      }
    });
  }

  // Scroll listener to update orbit progress
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const orbitSvgPath = document.getElementById('orbit-svg-path');
    if (orbitSvgPath) {
      const offset = calculateOrbitPathDashOffset(scrollPercent, 1000);
      orbitSvgPath.style.strokeDashoffset = offset.toString();
    }
  }, { passive: true });

  renderMilestoneUI(0);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initSpaceMilestonesApp);
}

export {
  SPACE_MILESTONES_DATA,
  validateSpaceMilestonesData,
  getMilestoneById,
  calculateOrbitPathDashOffset,
  getOrbitColorByClass
};

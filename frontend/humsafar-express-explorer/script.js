// Humsafar Express Data
const routes = [
  {
    origin: "Gorakhpur",
    destination: "Anand Vihar (Delhi)",
    importantStations: ["Gonda", "Lucknow", "Kanpur", "Moradabad"],
    regions: ["Uttar Pradesh", "Delhi"]
  },
  {
    origin: "Bandra Terminus",
    destination: "Saharsa",
    importantStations: ["Surat", "Bhusaval", "Jabalpur", "Patna"],
    regions: ["Maharashtra", "Gujarat", "Madhya Pradesh", "Bihar"]
  },
  {
    origin: "Kamakhya (Guwahati)",
    destination: "Bengaluru Cantt",
    importantStations: ["New Jalpaiguri", "Howrah", "Bhubaneswar", "Vijayawada"],
    regions: ["Assam", "West Bengal", "Odisha", "Andhra Pradesh", "Karnataka"]
  },
  {
    origin: "Ajmer",
    destination: "Sealdah (Kolkata)",
    importantStations: ["Jaipur", "Agra Fort", "Kanpur", "Dhanbad"],
    regions: ["Rajasthan", "Uttar Pradesh", "Jharkhand", "West Bengal"]
  }
];

const amenities = [
  {
    title: "Plush Berths",
    description: "Comfortable side-berths and main berths with improved cushioning and fire-retardant upholstery.",
    icon: "fa-solid fa-bed"
  },
  {
    title: "Charging Facilities",
    description: "Multiple mobile and laptop charging points provided for every passenger, along with USB slots in newer coaches.",
    icon: "fa-solid fa-plug"
  },
  {
    title: "Passenger Info System",
    description: "GPS-based display boards showing train speed, next station, and expected time of arrival.",
    icon: "fa-solid fa-tv"
  },
  {
    title: "Catering",
    description: "Optional catering services with well-maintained pantry cars and tea/coffee vending machines on board.",
    icon: "fa-solid fa-utensils"
  },
  {
    title: "Reading Lights",
    description: "Individual LED reading lights provided for every berth to ensure convenience without disturbing others.",
    icon: "fa-regular fa-lightbulb"
  },
  {
    title: "Safety Features",
    description: "Extensive CCTV surveillance in aisles and vestibules, plus smoke and fire detection systems.",
    icon: "fa-solid fa-shield-halved"
  }
];

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderAmenities();
  renderRoutes();
});

function renderAmenities() {
  const container = document.querySelector('.amenities-grid');
  if (!container) return;

  container.innerHTML = amenities.map(item => `
    <div class="card">
      <i class="${item.icon}" style="font-size: 2rem; color: var(--humsafar-orange); margin-bottom: 15px;"></i>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `).join('');
}

function renderRoutes() {
  const container = document.getElementById('routes-container');
  if (!container) return;

  container.innerHTML = routes.map(route => `
    <div class="route-card">
      <div>
        <div class="origin-dest">${route.origin} <i class="fa-solid fa-arrow-right" style="color: var(--primary-gold); margin: 0 10px;"></i> ${route.destination}</div>
        <div class="stations"><strong>Via:</strong> ${route.importantStations.join(', ')}</div>
      </div>
      <div>
        <span style="background: var(--humsafar-blue); padding: 5px 10px; border-radius: 4px; font-size: 0.8rem;">
          ${route.regions.join(' &middot; ')}
        </span>
      </div>
    </div>
  `).join('');
}

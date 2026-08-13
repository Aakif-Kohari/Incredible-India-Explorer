// Duronto Express Data
const durontoServices = [
  {
    name: "Sealdah - Bikaner Duronto Express",
    origin: "Sealdah",
    destination: "Bikaner",
    majorStations: ["Dhanbad", "Kanpur Central", "New Delhi", "Jaipur"],
    description: "One of the prominent Duronto services connecting Eastern India to Rajasthan."
  },
  {
    name: "Mumbai CSMT - Howrah Duronto Express",
    origin: "Mumbai CSMT",
    destination: "Howrah",
    majorStations: ["Bhusaval", "Nagpur", "Raipur", "Tatanagar"],
    description: "A crucial high-speed link between the financial capital and the cultural capital."
  },
  {
    name: "Yesvantpur - Delhi Sarai Rohilla Duronto Express",
    origin: "Yesvantpur",
    destination: "Delhi Sarai Rohilla",
    majorStations: ["Secunderabad", "Balharshah", "Jhansi"],
    description: "A fast connection bridging South India and the National Capital."
  },
  {
    name: "Pune - Hazrat Nizamuddin Duronto Express",
    origin: "Pune",
    destination: "Hazrat Nizamuddin",
    majorStations: ["Lonavala", "Vasai Road", "Vadodara", "Ratlam", "Kota"],
    description: "A premier service linking Pune with New Delhi efficiently."
  }
];

const routes = [
  {
    origin: "Sealdah",
    destination: "New Delhi",
    importantStations: ["Dhanbad", "Kanpur Central"],
    regions: ["West Bengal", "Delhi"]
  },
  {
    origin: "Mumbai Central",
    destination: "New Delhi",
    importantStations: ["Vadodara", "Ratlam", "Kota"],
    regions: ["Maharashtra", "Delhi"]
  },
  {
    origin: "Chennai Central",
    destination: "Hazrat Nizamuddin",
    importantStations: ["Vijayawada", "Balharshah", "Jhansi"],
    regions: ["Tamil Nadu", "Delhi"]
  },
  {
    origin: "Ernakulam",
    destination: "Lokmanya Tilak Terminus",
    importantStations: ["Kozhikode", "Mangaluru", "Madgaon", "Ratnagiri"],
    regions: ["Kerala", "Maharashtra"]
  }
];

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderRoutes();
});

function renderServices() {
  const container = document.getElementById('services-container');
  if (!container) return;

  container.innerHTML = durontoServices.map(service => `
    <div class="card">
      <i class="fa-solid fa-train icon-feature"></i>
      <h3>${service.name}</h3>
      <p style="margin-bottom: 10px;"><strong>${service.origin} <i class="fa-solid fa-arrow-right"></i> ${service.destination}</strong></p>
      <p style="font-size: 0.9rem; color: #ccc;"><strong>Major Stations:</strong> ${service.majorStations.join(', ')}</p>
      <p style="margin-top: 10px;">${service.description}</p>
    </div>
  `).join('');
}

function renderRoutes() {
  const container = document.getElementById('routes-container');
  if (!container) return;

  container.innerHTML = routes.map(route => `
    <div class="route-card">
      <div>
        <div class="origin-dest">${route.origin} <i class="fa-solid fa-arrow-right" style="color: var(--duronto-yellow); margin: 0 10px;"></i> ${route.destination}</div>
        <div class="stations"><strong>Via:</strong> ${route.importantStations.join(', ')}</div>
      </div>
      <div>
        <span style="background: var(--duronto-green); color: var(--duronto-bg); padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
          ${route.regions.join(' &middot; ')}
        </span>
      </div>
    </div>
  `).join('');
}

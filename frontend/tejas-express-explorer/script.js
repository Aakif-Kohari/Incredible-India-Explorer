// Tejas Express Data
const tejasServices = [
  {
    name: "Mumbai CSMT - Karmali Tejas Express",
    origin: "Mumbai CSMT",
    destination: "Karmali (Goa)",
    majorStations: ["Dadar", "Thane", "Panvel", "Ratnagiri", "Kudal"],
    description: "The first ever Tejas Express, connecting Mumbai to the popular tourist destination of Goa."
  },
  {
    name: "New Delhi - Chandigarh Tejas Express",
    origin: "New Delhi",
    destination: "Chandigarh",
    majorStations: ["Ambala Cantonment"],
    description: "A fast and luxurious connection between the National Capital and Chandigarh."
  },
  {
    name: "Lucknow - New Delhi Tejas Express",
    origin: "Lucknow NE",
    destination: "New Delhi",
    majorStations: ["Kanpur Central", "Ghaziabad"],
    description: "The first train in India fully operated by IRCTC, offering premium services to passengers."
  },
  {
    name: "Ahmedabad - Mumbai Central Tejas Express",
    origin: "Ahmedabad",
    destination: "Mumbai Central",
    majorStations: ["Nadiad", "Vadodara", "Bharuch", "Surat", "Vapi", "Borivali"],
    description: "The second IRCTC-operated train, connecting two major business hubs in Western India."
  }
];

const routes = [
  {
    origin: "Mumbai CSMT",
    destination: "Karmali",
    importantStations: ["Panvel", "Ratnagiri"],
    regions: ["Maharashtra", "Goa"]
  },
  {
    origin: "New Delhi",
    destination: "Chandigarh",
    importantStations: ["Ambala Cantt"],
    regions: ["Delhi", "Haryana", "Chandigarh"]
  },
  {
    origin: "Lucknow NE",
    destination: "New Delhi",
    importantStations: ["Kanpur Central", "Ghaziabad"],
    regions: ["Uttar Pradesh", "Delhi"]
  },
  {
    origin: "Ahmedabad",
    destination: "Mumbai Central",
    importantStations: ["Vadodara", "Surat"],
    regions: ["Gujarat", "Maharashtra"]
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

  container.innerHTML = tejasServices.map(service => `
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
        <div class="origin-dest">${route.origin} <i class="fa-solid fa-arrow-right" style="color: var(--tejas-yellow); margin: 0 10px;"></i> ${route.destination}</div>
        <div class="stations"><strong>Via:</strong> ${route.importantStations.join(', ')}</div>
      </div>
      <div>
        <span style="background: var(--tejas-orange); color: #fff; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
          ${route.regions.join(' &middot; ')}
        </span>
      </div>
    </div>
  `).join('');
}

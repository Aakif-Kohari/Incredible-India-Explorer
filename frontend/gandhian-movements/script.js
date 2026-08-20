/**
 * Gandhian Movements - Data Hub & Map Interactions
 */

// 1. Data Array for Landing Page Integration
const gandhianMovementsData = [
  {
    title: "Individual Satyagraha",
    year: "1940 – 1941",
    leader: "Mahatma Gandhi, Vinoba Bhave, Jawaharlal Nehru",
    organization: "Indian National Congress",
    image: "satyagraha-hero.jpg", 
    description: "A limited, symbolic protest affirming the right to free speech against India's forced participation in WWII, designed to avoid mass violence.",
    link: "individual-satyagraha.html"
  }
];

// 2. Leaflet Interactive Map Logic
let map;

function initMap() {
  const mapContainer = document.getElementById('satyagraha-map');
  if (!mapContainer) return;

  const isLight = document.body.classList.contains('light-theme');
  const tileUrl = isLight 
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' 
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  // Center map on central/northern India
  map = L.map('satyagraha-map').setView([23.5937, 78.9629], 5);

  L.tileLayer(tileUrl, {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Markers Data (Historical proximity coordinates)
  const raidLocations = [
    { name: "Paunar Ashram (Wardha)", coords: [20.7453, 78.6022], desc: "Vinoba Bhave inaugurates the movement on Oct 17, 1940." },
    { name: "Allahabad / Gorakhpur", coords: [25.4358, 81.8463], desc: "Region where Nehru was arrested." },
    { name: "Delhi", coords: [28.6139, 77.2090], desc: "The destination of the 'Delhi Chalo' marchers." }
  ];

  raidLocations.forEach(loc => {
    const marker = L.circleMarker(loc.coords, {
      radius: 8,
      fillColor: '#556b2f', // Olive green theme color
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map);
    
    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);
  });
}

// 3. Theme Toggle & Boot Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Map
  initMap();

  // Handle Theme Toggle
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const isCurrentlyLight = document.body.classList.contains('light-theme');
    toggle.textContent = isCurrentlyLight ? '🌙' : '☀️';

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggle.textContent = isLight ? '🌙' : '☀️';

      // Dynamically update Leaflet map tiles
      if (map) {
        const newTileUrl = isLight 
          ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' 
          : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        
        map.eachLayer((layer) => {
          if (layer instanceof L.TileLayer) map.removeLayer(layer);
        });
        
        L.tileLayer(newTileUrl, {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);
      }
    });
  }
});

/**
 * Revolutionary Movements - Data Hub & Map Interactions
 */

// 1. Data Array for Landing Page Integration
const revolutionaryMovementsData = [
  {
    title: "Chittagong Armoury Raid",
    year: "1930",
    leader: "Surya Sen (Masterda)",
    organization: "Indian Republican Army",
    image: "chittagong-hero.jpg", 
    description: "A meticulously planned armed uprising in Bengal aimed at capturing British armouries and destroying communication networks to establish a provisional independent government.",
    link: "chittagong-raid.html"
  }
];

// 2. Leaflet Interactive Map Logic
let map;

function initMap() {
  const mapContainer = document.getElementById('chittagong-map');
  if (!mapContainer) return;

  const isLight = document.body.classList.contains('light-theme');
  const tileUrl = isLight 
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' 
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  // Center map approximately on historical Chittagong
  map = L.map('chittagong-map').setView([22.3569, 91.7832], 13);

  L.tileLayer(tileUrl, {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Markers Data (Approximate historical proximity coordinates for Chittagong)
  const raidLocations = [
    { name: "Police Armoury", coords: [22.3480, 91.8000], desc: "Captured by Ananta Singh & Ganesh Ghosh." },
    { name: "Auxiliary Forces Armoury", coords: [22.3550, 91.8200], desc: "Captured by Lokenath Bal's group." },
    { name: "Telegraph Office", coords: [22.3350, 91.8300], desc: "Destroyed to cut off communications." },
    { name: "European Club", coords: [22.3400, 91.8100], desc: "Target of assault (found empty)." },
    { name: "Jalalabad Hills", coords: [22.4000, 91.8000], desc: "Site of the brutal gunfight on April 22." }
  ];

  raidLocations.forEach(loc => {
    const marker = L.circleMarker(loc.coords, {
      radius: 7,
      fillColor: '#d32f2f',
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

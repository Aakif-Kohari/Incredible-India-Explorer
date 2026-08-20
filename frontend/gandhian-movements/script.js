/**
 * Quit India Movement - Map & Data Hub Interactions
 */

// 1. Data Array for Landing Page Integration
const gandhianMovementsData = [
  {
    title: "Quit India Movement",
    year: "1942",
    leader: "Mahatma Gandhi, Aruna Asaf Ali, Jayaprakash Narayan",
    organization: "Indian National Congress",
    image: "quit-india-hero.jpg", 
    description: "The definitive 'Do or Die' mass civil disobedience campaign that sparked underground resistance and established parallel governments across India.",
    link: "quit-india.html"
  }
];

// 2. Leaflet Interactive Map Logic
let map;

function initMap() {
  const mapContainer = document.getElementById('quit-india-map');
  if (!mapContainer) return; // Exit if map container isn't found

  const isLight = document.body.classList.contains('light-theme');
  const tileUrl = isLight 
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' 
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  // Center map on central India
  map = L.map('quit-india-map').setView([21.1458, 79.0882], 5);

  L.tileLayer(tileUrl, {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Markers Data (Parallel Governments & Hotspots)
  const locations = [
    { name: "Bombay (Gowalia Tank)", coords: [18.9619, 72.8093], desc: "Birthplace of the Quit India resolution. Aruna Asaf Ali hoisted the flag here." },
    { name: "Ballia (Uttar Pradesh)", coords: [25.7583, 84.1483], desc: "First Parallel Government established by Chittu Pandey." },
    { name: "Tamluk (Bengal)", coords: [22.2965, 87.9254], desc: "The 'Jatiya Sarkar' formed. 73-year-old Matangini Hazra was martyred here." },
    { name: "Satara (Maharashtra)", coords: [17.6805, 74.0183], desc: "The 'Prati Sarkar' led by Nana Patil; the longest-lasting parallel government." }
  ];

  locations.forEach(loc => {
    const marker = L.circleMarker(loc.coords, {
      radius: 8,
      fillColor: '#556b2f', // Khadi Olive Green
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
  initMap();

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const isCurrentlyLight = document.body.classList.contains('light-theme');
    toggle.textContent = isCurrentlyLight ? '🌙' : '☀️';

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggle.textContent = isLight ? '🌙' : '☀️';

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

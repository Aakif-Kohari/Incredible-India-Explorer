/**
 * Trains of India Interactive Map Implementation
 * Uses Leaflet.js for lightweight rendering.
 */

// 1. Extensible Data Structure
const trainData = [
  {
    id: 'maharajas-express',
    name: 'Maharajas\' Express',
    category: 'luxury',
    region: 'north',
    origin: 'Delhi',
    destination: 'Mumbai',
    stations: ['Delhi', 'Agra', 'Ranthambore', 'Jaipur', 'Bikaner', 'Jodhpur', 'Udaipur', 'Mumbai'],
    description: 'Experience India\'s rich cultural heritage in unparalleled luxury aboard one of the most expensive and luxurious train rides in the world.',
    link: '../trains/maharajas-express.html',
    coordinates: [[28.6139, 77.2090], [27.1767, 78.0081], [26.0173, 76.5026], [26.9124, 75.7873], [28.0229, 73.3119], [26.2389, 73.0243], [24.5854, 73.7125], [19.0760, 72.8777]],
    color: '#d4af37' // Gold
  },
  {
    id: 'darjeeling-himalayan',
    name: 'Darjeeling Himalayan Railway',
    category: 'heritage',
    region: 'east',
    origin: 'New Jalpaiguri',
    destination: 'Darjeeling',
    stations: ['New Jalpaiguri', 'Siliguri', 'Kurseong', 'Ghum', 'Darjeeling'],
    description: 'A UNESCO World Heritage site, this narrow-gauge "Toy Train" winds its way through the breathtaking Himalayan foothills of West Bengal.',
    link: '../trains/darjeeling-himalayan.html',
    coordinates: [[26.6833, 88.4357], [26.7124, 88.4320], [26.8824, 88.2798], [27.0093, 88.2464], [27.0360, 88.2627]],
    color: '#2e8b57' // Sea Green
  },
  {
    id: 'vande-bharat-varanasi',
    name: 'Vande Bharat Express (NDLS-BSB)',
    category: 'premium',
    region: 'north',
    origin: 'New Delhi',
    destination: 'Varanasi',
    stations: ['New Delhi', 'Kanpur Central', 'Prayagraj Jn', 'Varanasi'],
    description: 'India\'s first semi-high-speed, engine-less train providing a swift, world-class travel experience between the capital and the holy city of Varanasi.',
    link: '../trains/vande-bharat.html',
    coordinates: [[28.6429, 77.2191], [26.4499, 80.3319], [25.4358, 81.8463], [25.3176, 82.9739]],
    color: '#c41e3a' // Crimson
  },
  {
    id: 'golden-chariot',
    name: 'The Golden Chariot',
    category: 'luxury',
    region: 'south',
    origin: 'Bengaluru',
    destination: 'Bengaluru (Round Trip)',
    stations: ['Bengaluru', 'Bandipur', 'Mysuru', 'Hampi', 'Badami', 'Goa'],
    description: 'A spectacular journey across the southern peninsula traversing historical empires, wildlife sanctuaries, and golden beaches.',
    link: '../trains/golden-chariot.html',
    coordinates: [[12.9716, 77.5946], [11.6667, 76.6280], [12.2958, 76.6394], [15.3350, 76.4600], [15.9189, 75.6761], [15.2993, 74.1240], [12.9716, 77.5946]],
    color: '#d4af37'
  }
];

// 2. Initialize Leaflet Map
let map;
let routeLayers = [];

function initMap() {
  // Check theme for map tile URL
  const isLight = document.body.classList.contains('light-theme');
  const tileUrl = isLight 
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' 
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  map = L.map('india-train-map', {
    center: [21.5937, 78.9629], // Center of India
    zoom: 5,
    minZoom: 4,
    maxZoom: 10
  });

  L.tileLayer(tileUrl, {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  renderRoutes(trainData);
  renderAccessibleList(trainData);
}

// 3. Render Routes on Map
function renderRoutes(data) {
  // Clear existing layers
  routeLayers.forEach(layer => map.removeLayer(layer));
  routeLayers = [];

  data.forEach(train => {
    // Create Polyline
    const routeLine = L.polyline(train.coordinates, {
      color: train.color,
      weight: 4,
      opacity: 0.8,
      className: 'route-path'
    }).addTo(map);

    // Hover tooltip
    routeLine.bindTooltip(`<strong>${train.name}</strong><br>${train.origin} ➔ ${train.destination}`);

    // Click event to populate panel
    routeLine.on('click', () => {
      selectRoute(train);
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
    });

    routeLayers.push(routeLine);

    // Create Station Markers
    train.coordinates.forEach((coord, index) => {
      const stationName = train.stations[index] || 'Station';
      const isEndpoint = index === 0 || index === train.coordinates.length - 1;
      
      const marker = L.circleMarker(coord, {
        radius: isEndpoint ? 6 : 4,
        fillColor: isEndpoint ? '#fff' : train.color,
        color: train.color,
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      }).addTo(map);

      marker.bindTooltip(stationName);
      marker.on('click', () => {
        selectRoute(train);
      });
      routeLayers.push(marker);
    });
  });
}

// 4. Update Info Panel
function selectRoute(train) {
  document.getElementById('info-placeholder').classList.add('hidden');
  const content = document.getElementById('info-content');
  content.classList.remove('hidden');

  document.getElementById('panel-title').textContent = train.name;
  document.getElementById('panel-category').textContent = train.category.toUpperCase();
  document.getElementById('panel-category').style.color = train.color;
  document.getElementById('panel-category').style.border = `1px solid ${train.color}`;
  
  document.getElementById('panel-origin').textContent = train.origin;
  document.getElementById('panel-destination').textContent = train.destination;
  document.getElementById('panel-desc').textContent = train.description;
  document.getElementById('panel-link').href = train.link;

  const stationsList = document.getElementById('panel-stations');
  stationsList.innerHTML = '';
  train.stations.forEach(st => {
    const li = document.createElement('li');
    li.textContent = st;
    stationsList.appendChild(li);
  });
}

// 5. Render Accessible / Mobile List
function renderAccessibleList(data) {
  const container = document.getElementById('accessible-list-container');
  container.innerHTML = '';

  if(data.length === 0) {
    container.innerHTML = '<p>No routes found for the selected filters.</p>';
    return;
  }

  data.forEach(train => {
    const card = document.createElement('div');
    card.className = 'route-card';
    card.innerHTML = `
      <span class="train-category-tag" style="color:${train.color}; border: 1px solid ${train.color}">${train.category}</span>
      <h3>${train.name}</h3>
      <p><strong>Route:</strong> ${train.origin} ➔ ${train.destination}</p>
      <p>${train.description}</p>
      <a href="${train.link}" aria-label="View details for ${train.name}">View Train Details →</a>
    `;
    container.appendChild(card);
  });
}

// 6. Handle Filters
document.getElementById('category-filter').addEventListener('change', filterData);
document.getElementById('region-filter').addEventListener('change', filterData);

function filterData() {
  const category = document.getElementById('category-filter').value;
  const region = document.getElementById('region-filter').value;

  const filtered = trainData.filter(train => {
    const matchCategory = category === 'all' || train.category === category;
    const matchRegion = region === 'all' || train.region === region;
    return matchCategory && matchRegion;
  });

  renderRoutes(filtered);
  renderAccessibleList(filtered);
  
  // Reset view if routes exist
  if(filtered.length > 0) {
    const group = new L.featureGroup(routeLayers);
    map.fitBounds(group.getBounds(), { padding: [30, 30] });
  }
}

// Boot up
document.addEventListener('DOMContentLoaded', initMap);
// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  // Set initial icon based on current theme (set in index.html script)
  const isCurrentlyLight = document.body.classList.contains('light-theme');
  themeToggle.textContent = isCurrentlyLight ? '🌙' : '☀️';

  themeToggle.addEventListener('click', () => {
    // 1. Toggle the CSS class on the body
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    
    // 2. Save preference to localStorage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // 3. Update the button icon
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    
    // 4. Dynamically update the Leaflet map tiles
    if (map) {
      const newTileUrl = isLight 
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' 
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      
      // Remove existing tile layer(s)
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });
      
      // Add the new theme-appropriate tile layer
      L.tileLayer(newTileUrl, {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);
    }
  });
}
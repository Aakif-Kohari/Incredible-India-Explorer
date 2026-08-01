(function() {
  'use strict';

  // Theme toggle logic
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
  }

  themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
  });

  // Data Arrays
  const walkingSafariData = [
    { name: 'Bori Range Trails', emoji: '🚶', desc: 'Guided foot safaris through the Bori Wildlife Sanctuary, led by an armed guard and forest guide.' },
    { name: 'Pug Mark Tracking', emoji: '🐾', desc: 'Learn to identify tiger, leopard, and sloth bear tracks along the forest floor.' },
    { name: 'Dawn Nature Walks', emoji: '🌄', desc: 'Early morning walks through Sal and Teak forest, ideal for spotting Gaur and Chital grazing.' }
  ];

  const canoeSafariData = [
    { name: 'Denwa River Float', emoji: '🛶', desc: 'A silent paddle along the Denwa River, passing sandbanks favored by crocodiles and waterbirds.' },
    { name: 'Madhai Gate Launch', emoji: '⛵', desc: 'Canoe safaris typically begin near Madhai, the main entry point to the core tiger reserve zone.' },
    { name: 'Sunset Canoeing', emoji: '🌅', desc: 'Evening canoe rides offer calm waters and a chance to see animals coming down to drink.' }
  ];

  const floraData = [
    { name: 'Sal Forest', emoji: '🌳', desc: 'Dense stands of Sal trees dominate the lower valleys of the reserve.' },
    { name: 'Teak', emoji: '🌲', desc: 'Widespread teak forest, valued historically for its timber.' },
    { name: 'Bamboo', emoji: '🎋', desc: 'Thick bamboo groves line many of the park\'s streambeds and hillsides.' },
    { name: 'Reni Pani Vines', emoji: '🌿', desc: 'A native climbing vine species found across the moist deciduous slopes.' }
  ];

  const birdData = [
    { name: 'Malabar Pied Hornbill', emoji: '🦅', desc: 'A large hornbill often spotted near the Denwa riverbanks.' },
    { name: 'Crested Serpent Eagle', emoji: '🦅', desc: 'A raptor frequently seen soaring above the forest canopy.' },
    { name: 'Racket-tailed Drongo', emoji: '🐦', desc: 'Known for its distinctive tail feathers and skill at mimicking other birds.' },
    { name: 'Migratory Waterfowl', emoji: '🦆', desc: 'The Tawa Reservoir hosts large numbers of migratory ducks and waders from November to March.' }
  ];

  const mapPoints = [
    { id: 'p1', name: 'Madhai Gate', x: 30, y: 45, desc: 'The main gateway to the reserve, and the starting point for most canoe and jeep safaris.' },
    { id: 'p2', name: 'Bori Wildlife Sanctuary', x: 55, y: 30, desc: 'A core walking-safari zone known for its untouched Sal and bamboo forests.' },
    { id: 'p3', name: 'Denwa Backwaters', x: 40, y: 65, desc: 'Calm backwaters popular for canoe safaris and winter birdwatching.' },
    { id: 'p4', name: 'Tawa Reservoir', x: 70, y: 55, desc: 'A large reservoir fed by the Denwa and Tawa rivers, a hotspot for migratory birds.' },
    { id: 'p5', name: 'Dhoopgarh Peak', x: 65, y: 20, desc: 'The highest point in the Satpura Range, near Pachmarhi, known for sunset views.' }
  ];

  const galleryData = [
    { src: '../../assets/travel_forests.png', caption: 'Dense Sal and Teak forest of the Satpura hills' },
    { src: '../../assets/heroriver.png', caption: 'The Denwa River, home to the park\'s canoe safaris' },
    { src: '../../assets/travel_mountains.png', caption: 'Sandstone peaks of the Satpura Range' },
    { src: '../../assets/travel_hidden.png', caption: 'A quiet forest trail used for walking safaris' }
  ];

  const factsData = [
    'Satpura National Park was established in 1981 and declared a Tiger Reserve in 2000.',
    'Together with the Bori and Pachmarhi sanctuaries, the reserve spans about 2,133 sq. km.',
    '"Satpura" is Sanskrit for "seven mountains" ("Sat" = seven, "Pura" = mountain).',
    'It is one of the few Indian reserves offering jeep, walking, and canoe safaris.'
  ];

  // Render Functions
  function renderCards(containerId, data) {
    const grid = document.getElementById(containerId);
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'data-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `<h3>${item.emoji} ${item.name}</h3><p>${item.desc}</p>`;
      grid.appendChild(card);
    });
  }

  function renderMap() {
    const mapContainer = document.getElementById('park-map');
    const infoPanel = document.getElementById('map-info');

    mapPoints.forEach(point => {
      const dot = document.createElement('button');
      dot.className = 'map-point';
      dot.style.left = point.x + '%';
      dot.style.top = point.y + '%';
      dot.setAttribute('aria-label', `View details for ${point.name}`);
      dot.addEventListener('click', () => {
        infoPanel.innerHTML = `<h3>${point.name}</h3><p>${point.desc}</p>`;
      });
      mapContainer.appendChild(dot);
    });
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    galleryData.forEach(img => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="lazy"><div class="gallery-caption">${img.caption}</div>`;
      grid.appendChild(item);
    });
  }

  function renderFacts() {
    const list = document.getElementById('facts-list');
    factsData.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact;
      list.appendChild(li);
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderCards('walking-safari-grid', walkingSafariData);
    renderCards('canoe-safari-grid', canoeSafariData);
    renderCards('flora-grid', floraData);
    renderCards('bird-grid', birdData);
    renderMap();
    renderGallery();
    renderFacts();
  });
})();
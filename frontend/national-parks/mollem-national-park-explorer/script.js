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
  const floraFaunaData = [
    { name: 'Indian Bison (Gaur)', type: 'fauna', emoji: '🐃', desc: 'The largest extant bovine, commonly spotted in the park.' },
    { name: 'Bengal Tiger', type: 'fauna', emoji: '🐅', desc: 'The apex predator of the Western Ghats, protected within this sanctuary.' },
    { name: 'Teak Trees', type: 'flora', emoji: '🌳', desc: 'Dominant deciduous trees providing canopy cover and timber value.' },
    { name: 'King Cobra', type: 'fauna', emoji: '🐍', desc: 'The world\'s longest venomous snake, inhabiting the dense undergrowth.' },
    { name: 'Wild Pepper', type: 'flora', emoji: '🌿', desc: 'A native climbing plant that thrives in the moist deciduous forests.' },
    { name: 'Slender Loris', type: 'fauna', emoji: '👀', desc: 'A nocturnal primate endemic to the forests of southern India.' }
  ];

  const birdData = [
    { name: 'Malabar Pied Hornbill', emoji: '🦅', desc: 'A striking bird with a large casque, indicator of healthy forest ecosystems.' },
    { name: 'Crested Serpent Eagle', emoji: '🦅', desc: 'Often seen soaring above the canopy, hunting for reptiles.' },
    { name: 'Grey-headed Bulbul', emoji: '🐦', desc: 'A common endemic bird of the Western Ghats with a distinctive grey head.' },
    { name: 'White-bellied Blue Flycatcher', emoji: '🐦', desc: 'A vibrant insectivorous bird found near streams and shaded areas.' }
  ];

  const trekkingData = [
    { name: 'Dudhsagar Falls Trek', difficulty: 'Moderate', desc: 'A scenic trail leading to the base of the majestic four-tiered waterfall.' },
    { name: 'Devil\'s Canyon', difficulty: 'Hard', desc: 'A challenging rocky path offering breathtaking views of the valley.' },
    { name: 'Mollem Temple Trail', difficulty: 'Easy', desc: 'A gentle walk connecting the park entrance to the ancient 12th-century temple.' }
  ];

  const mapPoints = [
    { id: 'p1', name: 'Dudhsagar Falls', x: 30, y: 40, desc: 'One of India\'s tallest waterfalls, forming a sea of milk during monsoon.' },
    { id: 'p2', name: 'Mahadeva Temple', x: 60, y: 30, desc: 'A 12th-century Kadamba architecture temple dedicated to Lord Shiva.' },
    { id: 'p3', name: 'Core Wildlife Zone', x: 50, y: 60, desc: 'Strictly protected area housing tigers, gaurs, and diverse flora.' },
    { id: 'p4', name: 'Eco-Tourism Zone', x: 70, y: 70, desc: 'Designated area for guided nature walks and educational activities.' }
  ];

  const galleryData = [
    { src: '../../assets/hero_banner.png', caption: 'Lush green canopy of the Western Ghats' },
    { src: '../../assets/travel_mountains.png', caption: 'Misty mornings at Dudhsagar Falls' },
    { src: '../../assets/heritage_forts.png', caption: 'Ancient Mahadeva Temple architecture' },
    { src: '../../assets/travel_hidden.png', caption: 'Wildlife grazing in the buffer zone' }
  ];

  const factsData = [
    'Mollem National Park spans over 107 square kilometers.',
    'It is part of the Bhagwan Mahavir Wildlife Sanctuary.',
    'The park is named after the village of Mollem.',
    'Dudhsagar Falls is located on the Mandovi River.'
  ];

  // Render Functions
  function renderFloraFauna(filter = 'all') {
    const grid = document.getElementById('flora-fauna-grid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? floraFaunaData : floraFaunaData.filter(item => item.type === filter);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'data-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `<h3>${item.emoji} ${item.name}</h3><p>${item.desc}</p>`;
      grid.appendChild(card);
    });
  }

  function renderBirds() {
    const grid = document.getElementById('bird-grid');
    birdData.forEach(bird => {
      const card = document.createElement('div');
      card.className = 'data-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `<h3>${bird.emoji} ${bird.name}</h3><p>${bird.desc}</p>`;
      grid.appendChild(card);
    });
  }

  function renderTrekking() {
    const grid = document.getElementById('trekking-grid');
    trekkingData.forEach(trail => {
      const card = document.createElement('div');
      card.className = 'data-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `<h3>${trail.name}</h3><span class="badge" style="margin-bottom:0.5rem;display:inline-block;">${trail.difficulty}</span><p>${trail.desc}</p>`;
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

  // Event Listeners
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderFloraFauna(e.target.dataset.filter);
    });
  });

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderFloraFauna();
    renderBirds();
    renderTrekking();
    renderMap();
    renderGallery();
    renderFacts();
  });
})();

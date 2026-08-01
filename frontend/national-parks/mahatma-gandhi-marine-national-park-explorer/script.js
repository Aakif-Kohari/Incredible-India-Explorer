(function() {
  'use strict';

  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  if (localStorage.getItem('theme') === 'light') body.classList.add('light-theme');
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
  });

  const marineLife = [
    { name: 'Green Sea Turtle', emoji: '🐢', desc: 'Frequently seen grazing on seagrass beds in the shallow lagoons.' },
    { name: 'Dugong', emoji: '🌊', desc: 'The rare "sea cow", a vulnerable marine mammal that feeds on seagrass.' },
    { name: 'Reef Shark', emoji: '🦈', desc: 'Blacktip and whitetip reef sharks patrol the coral boundaries.' },
    { name: 'Clownfish', emoji: '🐠', desc: 'Symbiotic fish living among the protective tentacles of sea anemones.' },
    { name: 'Manta Ray', emoji: '🦇', desc: 'Graceful giants that glide through the water columns near cleaning stations.' }
  ];

  const activities = [
    { name: 'Guided Snorkeling', desc: 'Explore shallow coral reefs with certified naturalist guides.' },
    { name: 'Glass Bottom Boat', desc: 'Ideal for non-swimmers to view coral formations and fish.' },
    { name: 'Mangrove Kayaking', desc: 'Paddle through serene, protected mangrove channels at sunrise.' }
  ];

  const mapPoints = [
    { id: 'm1', name: 'Jolly Buoy Island', x: 35, y: 45, desc: 'Famous for pristine coral reefs and clear waters (seasonal access).' },
    { id: 'm2', name: 'Red Skin Island', x: 65, y: 40, desc: 'Alternative snorkeling spot with vibrant marine life.' },
    { id: 'm3', name: 'Mangrove Channel', x: 50, y: 70, desc: 'Critical nursery habitat for juvenile fish and crustaceans.' }
  ];

  const galleryData = [
    { src: '../../assets/hero_banner.png', caption: 'Vibrant coral reef ecosystems' },
    { src: '../../assets/travel_mountains.png', caption: 'Glass bottom boat viewing' },
    { src: '../../assets/heritage_forts.png', caption: 'Mangrove forest channels' },
    { src: '../../assets/travel_hidden.png', caption: 'Sea turtle swimming in shallow waters' }
  ];

  const factsData = [
    'The park covers an area of 281.5 square kilometers.',
    'It comprises 15 islands and the coastal areas of Wandoor.',
    'Jolly Buoy Island offers some of the best coral viewing in the Andamans.',
    'The park is strictly regulated to prevent coral bleaching and damage.'
  ];

  function renderMarineLife() {
    const grid = document.getElementById('marine-grid');
    marineLife.forEach(item => {
      const card = document.createElement('div');
      card.className = 'data-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `<h3>${item.emoji} ${item.name}</h3><p>${item.desc}</p>`;
      grid.appendChild(card);
    });
  }

  function renderActivities() {
    const grid = document.getElementById('activities-grid');
    activities.forEach(act => {
      const card = document.createElement('div');
      card.className = 'data-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML = `<h3>${act.name}</h3><p>${act.desc}</p>`;
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

  document.addEventListener('DOMContentLoaded', () => {
    renderMarineLife();
    renderActivities();
    renderMap();
    renderGallery();
    renderFacts();
  });
})();

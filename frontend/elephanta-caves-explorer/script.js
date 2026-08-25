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

  // Data
  const historyData = [
    { name: 'Ancient Origins', emoji: '⛏️', desc: 'Most of the caves were carved between the mid-5th and 8th centuries CE, though scholars still debate exact dates and which dynasty — Kalachuri, Chalukya, or Rashtrakuta — sponsored the work.' },
    { name: 'A Portuguese Name', emoji: '🐘', desc: 'In 1534, Portuguese sailors found a large stone elephant statue near the shore and renamed the island "Elephanta." Locally it was, and still is, called Gharapuri.' },
    { name: 'Colonial Damage', emoji: '💥', desc: 'Portuguese soldiers used several of the Shiva reliefs for musket and cannon target practice in the 16th and 17th centuries, defacing many carvings — though the Trimurti was largely spared.' },
    { name: 'Restoration & Recognition', emoji: '🏛️', desc: 'The Indian government restored the main cave in the 1970s, and UNESCO inscribed Elephanta as a World Heritage Site in 1987.' }
  ];

  const islandData = [
    { name: 'Two Hills, Seven Caves', emoji: '⛰️', desc: 'The island has two low hills separated by a narrow valley: five Hindu caves on the western hill, and two smaller Buddhist caves with stupas and water tanks on the eastern hill.' },
    { name: 'Reaching the Island', emoji: '⛴️', desc: 'Visitors take a roughly one-hour ferry from the Gateway of India, followed by a short walk or toy-train ride up to the cave entrance.' },
    { name: 'Long Human Presence', emoji: '🏘️', desc: 'Archaeological evidence suggests people lived on the island for around two millennia — long before the main caves were carved.' }
  ];

  const architectureData = [
    { name: 'Carved from Basalt', emoji: '🪨', desc: 'Cave 1, the Great Cave, was cut directly out of solid basalt rock rather than built up from a foundation, in the western Deccan rock-cut tradition.' },
    { name: 'A Grand Hall', emoji: '🏛️', desc: 'The main hall spans roughly 27 metres square and stretches about 39 metres in a cruciform plan, held up by massive rock-cut pillars.' },
    { name: 'Mandala Layout', emoji: '🧭', desc: 'Key shrines and sculptural panels are arranged around a central linga chapel, following a mandala-like spatial plan.' }
  ];

  const trimurtiData = [
    { name: 'What It Depicts', emoji: '🗿', desc: 'The Trimurti Sadashiva shows Shiva in three visible faces representing his roles as creator, preserver, and destroyer — technically part of a five-faced (Panchamukhi) form, with two faces hidden from view.' },
    { name: 'Scale', emoji: '📏', desc: 'The bust rises about 5.4–6 metres (roughly 18–20 feet) high, carved into the south wall of the main hall.' },
    { name: 'Artistic Importance', emoji: '🎨', desc: 'Widely regarded as one of the finest achievements of ancient Indian sculpture, and the single most iconic image associated with the site.' }
  ];

  const shivaData = [
    { name: 'Ardhanarishvara', emoji: '⚖️', desc: 'A half-male, half-female depiction of Shiva merged with Parvati, symbolizing the unity of masculine and feminine cosmic principles.' },
    { name: 'Nataraja', emoji: '💃', desc: 'Shiva as the cosmic dancer, a form associated with the eternal cycle of creation and destruction.' },
    { name: 'Gangadhara', emoji: '🌊', desc: 'A panel showing Shiva receiving the descent of the river Ganga into his matted hair to soften her fall to earth.' },
    { name: 'Ravananugraha', emoji: '🏔️', desc: 'A dramatic relief of the demon king Ravana attempting to shake Mount Kailasa, with Shiva calmly subduing him.' }
  ];

  const unescoData = [
    'Inscribed as a UNESCO World Heritage Site in 1987 under Criteria (i) and (iii).',
    'Criterion (i) recognizes the large reliefs around the linga chapel as one of the greatest examples of Indian art dedicated to the cult of Shiva.',
    'Criterion (iii) recognizes the caves as the most magnificent achievement in the history of rock-cut architecture in western India.'
  ];

  const factsData = [
    'The stone elephant statue that gave the island its name now stands in Mumbai\'s Jijamata Udyaan (Byculla) zoo and museum.',
    'The famous "Trimurti" is technically a Panchamukhi (five-faced) Shiva — only three of the five faces are visible to visitors.',
    'The island also holds Buddhist stupa mounds dating back as far as the 2nd century BCE, predating the main Hindu caves.',
    'Despite heavy damage from Portuguese-era target practice, the central Trimurti sculpture survived largely intact.'
  ];

  const galleryData = [
    { type: 'image', src: '../../assets/travel_islands.png', alt: 'View of Elephanta Island in Mumbai Harbour, home to the rock-cut Elephanta Caves', caption: 'Elephanta Island, reached by ferry from Mumbai\'s Gateway of India' },
    { type: 'icon', emoji: '🗿', alt: 'Illustration representing the three-faced Trimurti Sadashiva sculpture', caption: 'The monumental Trimurti Sadashiva' },
    { type: 'icon', emoji: '🏛️', alt: 'Illustration representing the rock-cut pillared hall of Cave 1', caption: 'The pillared main hall of Cave 1' },
    { type: 'icon', emoji: '💃', alt: 'Illustration representing the Nataraja relief of Shiva as the cosmic dancer', caption: 'The Nataraja relief, Shiva as cosmic dancer' }
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

  function renderList(containerId, items) {
    const list = document.getElementById(containerId);
    items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    galleryData.forEach(item => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.setAttribute('role', 'listitem');
      if (item.type === 'image') {
        div.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy"><div class="gallery-caption">${item.caption}</div>`;
      } else {
        div.innerHTML = `<div class="gallery-illustration" role="img" aria-label="${item.alt}">${item.emoji}</div><div class="gallery-caption">${item.caption}</div>`;
      }
      grid.appendChild(div);
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderCards('history-grid', historyData);
    renderCards('island-grid', islandData);
    renderCards('architecture-grid', architectureData);
    renderCards('trimurti-grid', trimurtiData);
    renderCards('shiva-grid', shivaData);
    renderList('unesco-list', unescoData);
    renderList('facts-list', factsData);
    renderGallery();
  });
})();
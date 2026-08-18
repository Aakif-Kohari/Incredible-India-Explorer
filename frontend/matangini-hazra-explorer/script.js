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
  const timelineData = [
    { year: '1870', desc: 'Born Matangini Maity in Hogla village near Tamluk, Bengal, to a poor peasant family with no access to formal education.' },
    { year: '1888', desc: 'Widowed by age eighteen after her husband Trilochan Hazra passed away. She devoted herself to social service.' },
    { year: '1905', desc: 'Became deeply inspired by the Nationalist movement and Gandhian ideals spreading through Bengal.' },
    { year: '1930-32', desc: 'Joined the Salt Satyagraha and Civil Disobedience Movement, courting arrest for the first time.' },
    { year: '1933', desc: 'Waved a black flag at the Governor of Bengal during his visit to Tamluk and served six months of rigorous imprisonment.' },
    { year: 'Sep 1942', desc: 'Led roughly 6,000 volunteers, mostly women, toward the Tamluk Police Station during the Quit India Movement and was shot dead on 29 September, becoming the movement\'s first martyr in Midnapore.' }
  ];

  const quitIndiaData = [
    { name: 'The Call to Action', emoji: '📢', desc: 'In August 1942, Congress workers in Midnapore planned to seize local police stations as part of the nationwide Quit India Movement.' },
    { name: 'The Vidyut Bahini', emoji: '🚩', desc: 'At 72, Matangini Hazra led one of five volunteer batches formed by the local Samar Parisad (War Council) to march on Tamluk.' },
    { name: 'The March to Tamluk', emoji: '🚶‍♀️', desc: 'She led thousands toward the Tamluk Police Station carrying the Indian tricolour, defying orders to disband.' },
    { name: 'The Final Moment', emoji: '🕊️', desc: 'Shot multiple times by British Indian police, she continued forward chanting "Vande Mataram" until she fell, flag still in hand.' }
  ];

  const legacyData = [
    'She became the first martyr of the Quit India Movement in Midnapore district.',
    'A statue of Matangini Hazra stands at the Maidan in Kolkata, and another marks the spot in Tamluk where she died.',
    'Hazra Road, a major road in south Kolkata, is named in her memory.',
    'In 2002, India Post issued a commemorative postage stamp marking sixty years of the Quit India Movement.'
  ];

  const galleryData = [
    { emoji: '🚩', caption: 'Leading the Vidyut Bahini toward Tamluk Police Station' },
    { emoji: '🇮🇳', caption: 'Holding the tricolour aloft during the final march' },
    { emoji: '🏛️', caption: 'Her statue at the Maidan, Kolkata' },
    { emoji: '📮', caption: '2002 commemorative postage stamp in her honor' }
  ];

  const referencesData = [
    { title: 'Matangini Hazra — Wikipedia', url: 'https://en.wikipedia.org/wiki/Matangini_Hazra' },
    { title: 'Quit India Movement — Wikipedia', url: 'https://en.wikipedia.org/wiki/Quit_India_Movement' },
    { title: 'Tamluk — Wikipedia', url: 'https://en.wikipedia.org/wiki/Tamluk' }
  ];

  // Render: Interactive Timeline
  function renderTimeline() {
    const rail = document.getElementById('timeline-rail');
    const detail = document.getElementById('timeline-detail');

    timelineData.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.className = 'timeline-year-btn';
      btn.setAttribute('role', 'listitem');
      btn.textContent = item.year;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.timeline-year-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        detail.innerHTML = `<h3>${item.year}</h3><p>${item.desc}</p>`;
      });
      rail.appendChild(btn);
      if (index === timelineData.length - 1) {
        btn.classList.add('active');
        detail.innerHTML = `<h3>${item.year}</h3><p>${item.desc}</p>`;
      }
    });
  }

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

  function renderLegacy() {
    const list = document.getElementById('legacy-list');
    legacyData.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact;
      list.appendChild(li);
    });
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    galleryData.forEach(item => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.setAttribute('role', 'listitem');
      div.innerHTML = `<span class="gallery-emoji">${item.emoji}</span><div class="gallery-caption">${item.caption}</div>`;
      grid.appendChild(div);
    });
  }

  function renderReferences() {
    const list = document.getElementById('references-list');
    referencesData.forEach(ref => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.title}</a>`;
      list.appendChild(li);
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    renderCards('quit-india-grid', quitIndiaData);
    renderLegacy();
    renderGallery();
    renderReferences();
  });
})();
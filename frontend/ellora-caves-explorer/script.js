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
    { name: 'Buddhist Beginnings', emoji: '☸️', desc: 'Work began around the 6th century CE with monasteries and prayer halls (Caves 1–12), built under Kalachuri and early Chalukya-era patronage.' },
    { name: 'The Hindu Resurgence', emoji: '🕉️', desc: 'As Hindu revival gathered pace under the Rashtrakuta dynasty, work shifted to grand Hindu shrines (Caves 13–29), culminating in the Kailasa Temple in the 8th century.' },
    { name: 'The Jain Final Phase', emoji: '🙏', desc: 'Between roughly the 9th and 12th centuries, smaller but intricately detailed Jain caves (Caves 30–34) were added at the northern end of the site.' },
    { name: 'Religious Coexistence', emoji: '🤝', desc: 'Unlike most sacred sites, Ellora shows three religions excavating in the same cliff face over centuries without displacing one another — a rare physical record of religious tolerance in ancient India.' }
  ];

  const buddhistData = [
    { name: 'Viharas & Chaityas', emoji: '🏠', desc: 'The 12 Buddhist caves combine monasteries (viharas) with prayer halls (chaityas), including sleeping cells carved for resident monks.' },
    { name: 'Cave 10 — Vishwakarma', emoji: '⛩️', desc: 'A two-storeyed chaitya hall with a seated Buddha and a lively carved frieze of dancing, music-making figures.' },
    { name: 'Cave 12 — Teen Thal', emoji: '🏛️', desc: 'A striking triple-storeyed monastery, one of the most architecturally ambitious of the Buddhist caves.' }
  ];

  const hinduData = [
    { name: 'Dedicated Mainly to Shiva', emoji: '🔱', desc: 'Most Hindu caves at Ellora honor Shiva, alongside shrines to Vishnu and scenes from the Ramayana and Mahabharata.' },
    { name: 'Cave 15 — Dashavatara', emoji: '🐚', desc: 'Originally begun as a Buddhist cave, later reworked with Shaiva carvings — physical evidence of the site\'s shifting religious currents.' },
    { name: 'Cave 29 — Dhumar Lena', emoji: '🗻', desc: 'A large, dramatic Shiva temple with multiple entrances, echoing the layout of the famous Elephanta cave temple near Mumbai.' }
  ];

  const jainData = [
    { name: 'Tirthankara Imagery', emoji: '🕊️', desc: 'The Jain caves are dedicated to the Tirthankaras — spiritual teachers of Jainism — including Mahavira and Bahubali.' },
    { name: 'Cave 32 — Indra Sabha', emoji: '🪷', desc: 'The finest Jain cave at Ellora, a two-storeyed shrine famous for its detailed carving and a lotus motif on the ceiling.' },
    { name: 'Cave 30 — Chhota Kailash', emoji: '🛕', desc: 'An unfinished cave echoing the Kailasa Temple\'s design in miniature, complete with a carved rock-cut elephant.' }
  ];

  const kailasaData = [
    { name: 'Scale & Dimensions', emoji: '📏', desc: 'The structure rises about 32.6 metres (107 ft) above the court below, and its excavation is estimated to have removed roughly 200,000 tonnes of basalt rock.' },
    { name: 'Top-Down Excavation', emoji: '⬇️', desc: 'Unlike normal construction, Kailasa was carved downward from the top of a single rock outcrop, meaning the architects had to plan the entire structure before the first cut was made.' },
    { name: 'Royal Patronage', emoji: '👑', desc: 'Inscriptions link the temple to the Rashtrakuta king Krishna I (r. 756–773 CE), though the full extent of his role remains debated among historians.' },
    { name: 'Sculptural Program', emoji: '🗿', desc: 'Detailed relief panels depict scenes from the Ramayana and Mahabharata, including the famous carving of the demon king Ravana shaking Mount Kailasa.' }
  ];

  const engineeringData = [
    { name: 'Subtractive Construction', emoji: '⛏️', desc: 'Rather than building up from a foundation, artisans carved away stone from a solid cliff face — a subtractive process with no way to add material back if a mistake was made.' },
    { name: 'Tools of the Trade', emoji: '🔨', desc: 'Craftsmen used iron chisels, hammers, and picks to remove rock in stages, gradually revealing pillars, chambers, and sculpture from the mountain itself.' },
    { name: 'Planning in Advance', emoji: '🧭', desc: 'Especially at the Kailasa Temple, the full three-dimensional design had to be visualized before excavation began, since the finished form could not be corrected once material was removed.' }
  ];

  const unescoData = [
    'Inscribed as a UNESCO World Heritage Site in 1983.',
    'Recognized as a unique artistic and technological achievement and as evidence of the spirit of religious tolerance in ancient India.',
    'Extends over more than 2 km of basalt cliff face in the Charanandri Hills.'
  ];

  const factsData = [
    'Ellora has around 100 caves in total, of which 34 are open to the public.',
    'The word "Ellora" is a short form of the older name "Elapura", and local caves are traditionally called "Lena" or "Leni".',
    'Ellora lies about 30 km from Aurangabad and roughly 100 km from the Ajanta Caves.',
    'The Kailasa Temple originally had a coat of white plaster, designed to resemble the snow-capped peak of Mount Kailash.'
  ];

  const galleryData = [
    { type: 'image', src: '../../assets/kailasa_temple_banner.png', alt: 'The monolithic Kailasa Temple (Cave 16) carved from a single basalt rock at Ellora, Maharashtra', caption: 'The Kailasa Temple, the world\'s largest monolithic rock-cut structure' },
    { type: 'icon', emoji: '☸️', alt: 'Illustration representing a Buddhist chaitya prayer hall at Ellora', caption: 'Buddhist prayer hall, Caves 1–12' },
    { type: 'icon', emoji: '🔱', alt: 'Illustration representing carved Hindu deity reliefs at Ellora', caption: 'Carved Hindu deity reliefs, Caves 13–29' },
    { type: 'icon', emoji: '🪷', alt: 'Illustration representing the Indra Sabha Jain shrine at Ellora', caption: 'The Indra Sabha Jain shrine, Cave 32' }
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
    renderCards('buddhist-grid', buddhistData);
    renderCards('hindu-grid', hinduData);
    renderCards('jain-grid', jainData);
    renderCards('kailasa-grid', kailasaData);
    renderCards('engineering-grid', engineeringData);
    renderList('unesco-list', unescoData);
    renderList('facts-list', factsData);
    renderGallery();
  });
})();
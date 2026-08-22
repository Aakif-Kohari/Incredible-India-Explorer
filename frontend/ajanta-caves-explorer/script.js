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
    { name: 'Early (Hinayana) Phase', emoji: '⛏️', desc: 'Excavation began around the 2nd century BCE under Satavahana-era patronage, producing early prayer halls and monasteries carved into the gorge.' },
    { name: 'Centuries of Silence', emoji: '🌿', desc: 'Work paused for several centuries, and the site saw little new activity until royal patronage returned in the 5th century CE.' },
    { name: 'Golden (Mahayana) Phase', emoji: '🎨', desc: 'Around 460–480 CE, under Vakataka king Harishena and his court, most of the elaborately painted and sculpted caves were excavated.' },
    { name: 'Abandonment & Rediscovery', emoji: '🐅', desc: 'Patronage ended abruptly after Harishena\'s death, leaving several caves unfinished. The site was reclaimed by jungle until a British officer, John Smith, rediscovered it in 1819 during a tiger hunt.' }
  ];

  const buddhistData = [
    { name: 'Hinayana Tradition', emoji: '☸️', desc: 'The earliest caves follow an aniconic style, representing the Buddha through symbols such as the stupa, the Bodhi tree, and the wheel of dharma rather than a human figure.' },
    { name: 'Mahayana Tradition', emoji: '🧘', desc: 'The later caves embrace a fully iconic style, filled with images of the Buddha and Bodhisattvas, alongside vivid narrative murals of the Jataka tales.' }
  ];

  const architectureData = [
    { name: 'Chaitya Halls', emoji: '⛩️', desc: 'Worship halls with a horseshoe-shaped facade and a central stupa at the far end, used for congregational prayer. Caves 9, 10, 19, and 26 are the best-preserved examples.' },
    { name: 'Viharas', emoji: '🏠', desc: 'Residential monasteries with small monks\' cells arranged around a large central hall, used for study, meditation, and daily monastic life. Most of Ajanta\'s 30 caves are viharas.' }
  ];

  const paintingsData = [
    { name: 'Padmapani & Vajrapani', emoji: '🖌️', desc: 'The Bodhisattva figures in Cave 1 are among the most celebrated paintings in Indian art, admired for their serene expression and refined line work.' },
    { name: 'Jataka Narrative Murals', emoji: '📜', desc: 'Extensive wall paintings in caves such as Cave 17 illustrate Jataka tales — stories of the Buddha\'s previous lives — in vivid, crowded compositions.' },
    { name: 'Technique & Materials', emoji: '🎨', desc: 'Painted in tempera on a dry lime-plaster ground using natural mineral and plant pigments, a technique that has preserved color and detail for over 1,500 years.' }
  ];

  const sculpturesData = [
    { name: 'Reclining Buddha, Cave 26', emoji: '🗿', desc: 'A massive relief of the Buddha in Mahaparinirvana (final release), one of the largest and most striking sculptures at the site.' },
    { name: 'Carved Pillars & Capitals', emoji: '🏛️', desc: 'Intricately carved columns and capitals throughout the viharas showcase the evolving decorative vocabulary of ancient Indian stonework.' },
    { name: 'Guardian Figures', emoji: '🛡️', desc: 'Dvarapala (guardian) figures flank many cave entrances, a convention that influenced temple architecture across India for centuries.' }
  ];

  const unescoData = [
    'Inscribed as a UNESCO World Heritage Site in 1983.',
    'Recognized as a masterpiece of human creative genius and for its profound influence on the development of Buddhist art across Asia.',
    'Considered essential evidence for understanding the artistic, religious, and social life of ancient India, given how few painted monuments from this era survive.'
  ];

  const conservationData = [
    { name: 'Managing Authority', emoji: '🏢', desc: 'The Archaeological Survey of India (ASI) manages and protects the site today.' },
    { name: 'Environmental Threats', emoji: '💧', desc: 'Humidity from visitor breath and body heat encourages microbial growth that can damage the ancient paint layers.' },
    { name: 'Protective Measures', emoji: '🚧', desc: 'Visitor numbers are regulated, protective railings and low lighting are used, and cave access is periodically rotated to reduce wear.' }
  ];

  const factsData = [
    'The caves are carved along a horseshoe-shaped gorge above the Waghur River.',
    'Cave 10 contains one of the earliest known Brahmi inscriptions found at the site.',
    'The Ellora Caves, about 100 km away, are often visited together with Ajanta.',
    'Ajanta\'s painting style directly influenced later Buddhist art across Central and East Asia via ancient trade routes.'
  ];

  const galleryData = [
    { type: 'image', src: '../../assets/ajanta_caves.png', alt: 'Rock-cut facade of the Ajanta Caves carved into a horseshoe-shaped cliff above the Waghur River, Maharashtra', caption: 'The rock-cut cave complex above the Waghur River gorge' },
    { type: 'icon', emoji: '🖌️', alt: 'Illustration representing the Padmapani Bodhisattva painting in Cave 1', caption: 'The celebrated Padmapani mural in Cave 1' },
    { type: 'icon', emoji: '⛩️', alt: 'Illustration representing the horseshoe-shaped interior of a chaitya prayer hall', caption: 'Interior of a chaitya hall with its central stupa' },
    { type: 'icon', emoji: '🗿', alt: 'Illustration representing the reclining Buddha relief sculpture in Cave 26', caption: 'The reclining Buddha (Mahaparinirvana) relief in Cave 26' }
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
    renderCards('architecture-grid', architectureData);
    renderCards('paintings-grid', paintingsData);
    renderCards('sculptures-grid', sculpturesData);
    renderList('unesco-list', unescoData);
    renderCards('conservation-grid', conservationData);
    renderList('facts-list', factsData);
    renderGallery();
  });
})();
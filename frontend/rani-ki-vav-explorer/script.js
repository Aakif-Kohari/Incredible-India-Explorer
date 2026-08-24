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
    { name: 'A Queen\'s Memorial', emoji: '👑', desc: 'Queen Udayamati of the Solanki (Chaulukya) dynasty commissioned Rani ki Vav around 1063 CE in memory of her husband, King Bhima I.' },
    { name: 'Buried by the River', emoji: '🌊', desc: 'Sometime in the 13th century, flooding of the Saraswati River buried the stepwell under layers of silt, hiding it for nearly 700 years.' },
    { name: 'Rediscovery & Restoration', emoji: '⛏️', desc: 'The stepwell was fully excavated in the 1940s and restored by the Archaeological Survey of India (ASI) in the 1980s, revealing sculptures in remarkably good condition.' }
  ];

  const timelineData = [
    { year: 'c. 1022–1064', desc: 'Reign of King Bhima I of the Solanki (Chaulukya) dynasty.' },
    { year: '1063 CE', desc: 'Construction of Rani ki Vav begins, commissioned by Queen Udayamati.' },
    { year: 'c. 1083 CE', desc: 'Construction is completed after roughly twenty years.' },
    { year: '13th century', desc: 'Flooding of the Saraswati River buries the stepwell under silt.' },
    { year: '1940s', desc: 'The stepwell is fully excavated and rediscovered.' },
    { year: '1980s', desc: 'The Archaeological Survey of India completes major restoration work.' },
    { year: '2014', desc: 'UNESCO inscribes Rani ki Vav as a World Heritage Site on 22 June.' }
  ];

  const architectureData = [
    { name: 'An Inverted Temple', emoji: '🛕', desc: 'Rani ki Vav is designed as a temple turned upside down, with seven levels of stairs descending into the earth instead of rising toward the sky.' },
    { name: 'Scale', emoji: '📏', desc: 'The stepwell measures roughly 65 metres long, 20 metres wide, and 27 metres deep, oriented east-west and facing east.' },
    { name: 'Four Core Elements', emoji: '🏛️', desc: 'A stepped corridor leads from ground level to an underground reservoir, broken up by multi-storeyed pillared pavilions, with a circular draw well at the rear.' },
    { name: 'What Survives Today', emoji: '🧱', desc: 'Of the original seven storeys, about five remain intact, preserved by the very silt that once buried the site.' }
  ];

  const waterData = [
    { name: 'Answering an Arid Climate', emoji: '☀️', desc: 'Stepwells developed in the dry regions of Gujarat and Rajasthan as a way to reach groundwater that dropped well below the surface for much of the year.' },
    { name: 'From Pit to Monument', emoji: '📈', desc: 'Stepwells evolved over centuries from simple pits dug in sandy soil into elaborate multi-storey works of art and engineering.' },
    { name: 'More Than a Water Source', emoji: '🤝', desc: 'Beyond storing water, stepwells offered shaded gathering spaces and served as sites of social and religious life for local communities.' }
  ];

  const sculpturesData = [
    { name: 'Over 1,500 Carvings', emoji: '🗿', desc: 'More than 500 principal sculptures and over 1,000 minor carvings decorate the walls and pillars of the stepwell.' },
    { name: 'Dashavatara Imagery', emoji: '🕉️', desc: 'Many panels depict the ten avatars of Vishnu (Dashavatara), alongside apsaras, yoginis, and other mythological figures.' },
    { name: 'Echoes of Patola Weaving', emoji: '🧵', desc: 'The stepwell\'s geometric latticework closely resembles the patterns of Patan\'s famous Patola textiles, pointing to a shared local artistic tradition.' }
  ];

  const solankiData = [
    { name: 'A Golden Age', emoji: '🏰', desc: 'The Solanki (Chaulukya) dynasty ruled Gujarat and parts of Rajasthan from roughly the 10th to 13th centuries, a period of great prosperity and artistic achievement.' },
    { name: 'Anahilwad Patan', emoji: '🏙️', desc: 'Patan, then called Anahilwad Patan, was the flourishing Solanki capital, renowned for its wealth, learning, and monumental building projects.' },
    { name: 'Sister Monuments', emoji: '🕌', desc: 'Rani ki Vav shares its Maru-Gurjara architectural style with other Solanki-era landmarks, including the Modhera Sun Temple and the Vimalavasahi Temple at Mount Abu.' }
  ];

  const unescoData = [
    'Inscribed as a UNESCO World Heritage Site on 22 June 2014.',
    'Recognized as an exceptional example of technological development in groundwater resource management within a single architectural component.',
    'Praised for its capacity to break large underground spaces into smaller, aesthetically proportioned volumes.'
  ];

  const factsData = [
    'Rani ki Vav appears on the reverse of India\'s ₹100 banknote, introduced in 2019.',
    'It was named India\'s "Cleanest Iconic Place" at the 2016 Indian Sanitation Conference (INDOSAN).',
    'The flood that buried the stepwell for centuries is also what preserved its sculptures in near-pristine condition.',
    'The stepwell is mentioned in a 14th-century Jain text, the Prabandha-Chintamani, written by the monk Merutunga in 1304.'
  ];

  const galleryData = [
    { emoji: '🛕', alt: 'Illustration representing the inverted-temple design of Rani ki Vav\'s stepped corridor', caption: 'The inverted-temple stepped corridor' },
    { emoji: '🗿', alt: 'Illustration representing sculpted panels of Vishnu\'s avatars along the stepwell walls', caption: 'Sculpted panels depicting Vishnu\'s avatars' },
    { emoji: '🏛️', alt: 'Illustration representing the multi-storeyed pillared pavilions inside the stepwell', caption: 'Multi-storeyed pillared pavilions' },
    { emoji: '💧', alt: 'Illustration representing the circular draw well at the rear of the stepwell', caption: 'The circular draw well at the rear of the structure' }
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

  function renderTimeline() {
    const list = document.getElementById('timeline-list');
    timelineData.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-entry';
      div.setAttribute('role', 'listitem');
      div.innerHTML = `<span class="year">${item.year}</span><span class="desc">${item.desc}</span>`;
      list.appendChild(div);
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
      div.innerHTML = `<div class="gallery-illustration" role="img" aria-label="${item.alt}">${item.emoji}</div><div class="gallery-caption">${item.caption}</div>`;
      grid.appendChild(div);
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderCards('history-grid', historyData);
    renderTimeline();
    renderCards('architecture-grid', architectureData);
    renderCards('water-grid', waterData);
    renderCards('sculptures-grid', sculpturesData);
    renderCards('solanki-grid', solankiData);
    renderList('unesco-list', unescoData);
    renderList('facts-list', factsData);
    renderGallery();
  });
})();
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
    { name: 'A Viceroy\'s Idea', emoji: '👑', desc: 'After Queen Victoria\'s death in 1901, Viceroy Lord Curzon proposed a grand memorial in her honor, to be built through public contributions from across British India.' },
    { name: 'Building the Memorial', emoji: '🏗️', desc: 'Construction was carried out by Martin & Co. of Calcutta, founded by Sir Rajendranath Mukherjee and Thomas Acquin Martin, and took roughly fifteen years to complete.' },
    { name: 'From Memorial to Museum', emoji: '🖼️', desc: 'The building opened to the public in 1921, and its museum and art gallery followed in 1930, transforming the monument into one of India\'s major cultural institutions.' }
  ];

  const timelineData = [
    { year: '1901', desc: 'Queen Victoria dies; Lord Curzon proposes a memorial in her honor.' },
    { year: '1906', desc: 'The Prince of Wales (later King George V) lays the foundation stone on 4 January.' },
    { year: '1910', desc: 'Construction of the main superstructure begins.' },
    { year: '1921', desc: 'The memorial is formally opened to the public on 28 December.' },
    { year: '1930', desc: 'The museum and art gallery are inaugurated inside the building.' },
    { year: '1935', desc: 'Declared an institution of national importance under the Government of India Act.' }
  ];

  const architectureData = [
    { name: 'Indo-Saracenic Style', emoji: '🕌', desc: 'Architect William Emerson blended British civic classicism with Mughal, Egyptian, Venetian, Deccani, and Islamic architectural elements.' },
    { name: 'Scale', emoji: '📐', desc: 'The building measures about 103 by 69 metres and rises to a height of roughly 56 metres (184 feet).' },
    { name: 'The Angel of Victory', emoji: '👼', desc: 'A bronze figure nearly 5 metres tall stands atop the central dome, mounted on ball bearings so it turns gently with the wind.' },
    { name: 'Allegorical Sculptures', emoji: '🗿', desc: 'Figures representing Art, Justice, Charity, Architecture, Learning, Motherhood, and Prudence decorate the exterior around the dome.' }
  ];

  const museumData = [
    { name: 'A National Institution', emoji: '🏛️', desc: 'Declared an institution of national importance in 1935, the Victoria Memorial Hall is today an autonomous body under India\'s Ministry of Culture.' },
    { name: 'Among India\'s Most Visited', emoji: '🎟️', desc: 'It regularly ranks as one of the most-visited museums in India, drawing millions of visitors to its galleries and gardens each year.' },
    { name: 'Ongoing Exhibitions', emoji: '📅', desc: 'Beyond its permanent collection, the museum hosts temporary exhibitions throughout the year, including international collaborations.' }
  ];

  const collectionsData = [
    { name: 'Royal Gallery', emoji: '🖼️', desc: 'Portraits of Queen Victoria and Prince Albert, alongside personal items such as Victoria\'s childhood pianoforte and writing desk.' },
    { name: 'Calcutta Gallery', emoji: '🗺️', desc: 'Traces the city\'s history from its founding through paintings, photographs, maps, and documents, including a life-size diorama of 19th-century Chitpur Road.' },
    { name: 'National Leaders Gallery', emoji: '🇮🇳', desc: 'Honors India\'s freedom fighters, including artefacts connected to Netaji Subhas Chandra Bose and the Indian National Army.' },
    { name: 'Sculpture & Arms Galleries', emoji: '⚔️', desc: 'Displays of sculpture alongside historic weaponry, swords, and armour spanning the collection\'s roughly 28,000 artefacts across 25 galleries.' }
  ];

  const gardensData = [
    { name: 'Landscape Design', emoji: '🌳', desc: 'The roughly 64-acre gardens were designed by Scottish botanist Sir David Prain and Lord Redesdale, with the garden gates and north bridge designed by Vincent Esch.' },
    { name: 'Water Features', emoji: '⛲', desc: 'Lawns, pools, and fountains are joined by a lake used for boating, creating a calm counterpoint to the marble monument at its centre.' },
    { name: 'A Sculpture Trail', emoji: '🗽', desc: 'Statues of Queen Victoria and various colonial-era figures, relocated here after 1947, are scattered throughout the grounds alongside a dedicated French Garden of marble busts.' }
  ];

  const heritageData = [
    'The Victoria Memorial is considered the largest monument built anywhere in the world for a monarch.',
    'It stands as both a reminder of colonial history and a symbol of Kolkata\'s civic identity, blending British and Indian architectural traditions.',
    'Often nicknamed the "Taj of the Raj," it draws a direct visual link to the Taj Mahal through its use of white marble.',
    'Post-independence additions, like the National Leaders Gallery, place India\'s freedom struggle alongside its colonial-era exhibits.'
  ];

  const factsData = [
    'The marble was sourced from the same Makrana quarries in Rajasthan used to build the Taj Mahal.',
    'The bronze Angel of Victory atop the dome rotates with the wind thanks to a ball-bearing mount.',
    'Despite Kolkata\'s strategic importance during World War II, the memorial escaped damage from bombing.',
    'The museum holds the world\'s largest collection of paintings by Thomas and William Daniell.'
  ];

  const galleryData = [
    { type: 'image', src: '../../assets/Victoria_Memorial.png', alt: 'The white marble Victoria Memorial building with its central dome, set against Kolkata\'s Maidan gardens', caption: 'The white marble memorial building on Kolkata\'s Maidan' },
    { type: 'icon', emoji: '👼', alt: 'Illustration representing the bronze Angel of Victory statue atop the central dome', caption: 'The Angel of Victory atop the central dome' },
    { type: 'icon', emoji: '🖼️', alt: 'Illustration representing the Royal Gallery with portraits of Queen Victoria', caption: 'The Royal Gallery\'s portraits and royal memorabilia' },
    { type: 'icon', emoji: '🌳', alt: 'Illustration representing the landscaped gardens surrounding the memorial', caption: 'The 64-acre gardens surrounding the memorial' }
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
    renderTimeline();
    renderCards('architecture-grid', architectureData);
    renderCards('museum-grid', museumData);
    renderCards('collections-grid', collectionsData);
    renderCards('gardens-grid', gardensData);
    renderList('heritage-list', heritageData);
    renderList('facts-list', factsData);
    renderGallery();
  });
})();
const timelineEvents = [
  {
    year: 'c. 320 CE',
    title: 'Chandragupta I establishes the Gupta line',
    description: 'Chandragupta I expanded his kingdom through alliances and established the Gupta imperial dynasty in northern India.'
  },
  {
    year: 'c. 335 CE',
    title: 'Samudragupta begins major conquests',
    description: 'Samudragupta launched campaigns across the subcontinent, creating a network of tributary states and strengthening Gupta prestige.'
  },
  {
    year: 'c. 375 CE',
    title: 'Chandragupta II rules as Vikramaditya',
    description: 'Gupta power reached its peak under Chandragupta II, a magnificent court patronizing poets, scholars, and artists.'
  },
  {
    year: 'c. 415 CE',
    title: 'Kumaragupta I supports learning and pilgrimage',
    description: 'Kumaragupta I patronized Nalanda University and maintained religious and intellectual centers across the empire.'
  },
  {
    year: 'c. 550 CE',
    title: 'Gupta hegemony weakens',
    description: 'Huna invasions, internal feudal divisions, and succession challenges led to the decline of Gupta authority.'
  }
];

const galleryItems = [
  {
    title: 'Ajanta Caves Murals',
    description: 'Gupta-era mural painting at Ajanta reflects refined composition, delicate line work, and devotional storytelling.',
    imageUrl: '../assets/ajanta_caves.png'
  },
  {
    title: 'Gupta Golden Coin',
    description: 'Gupta gold coins show royal portraits and elegant inscriptions, testifying to thriving trade and artistic sensibilities.',
    imageUrl: '../assets/coinhero.jpeg'
  },
  {
    title: 'Classical Sanskrit Literature',
    description: 'The Gupta period provided a royal stage for Kalidasa, whose plays and poetry became models of classical Indian literature.',
    imageUrl: '../assets/ancient_india_illustration.png'
  }
];

function renderTimeline() {
  const timelineList = document.getElementById('timeline-list');
  if (!timelineList) return;

  timelineList.innerHTML = timelineEvents.map(event => `
    <div class="timeline-card">
      <h3>${event.year} — ${event.title}</h3>
      <p>${event.description}</p>
    </div>
  `).join('');
}

function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = galleryItems.map(item => `
    <article class="gallery-card">
      <div class="gallery-image">
        <img src="${item.imageUrl}" alt="${item.title}" />
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderGallery();
});

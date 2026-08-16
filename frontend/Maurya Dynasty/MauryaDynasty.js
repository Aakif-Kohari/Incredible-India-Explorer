const timelineEvents = [
  {
    year: 'c. 321 BCE',
    title: 'Chandragupta Maurya rises to power',
    description: 'After overthrowing the Nanda dynasty, Chandragupta established the Maurya Empire and created a new imperial order.'
  },
  {
    year: 'c. 305 BCE',
    title: 'Confrontation with Seleucus',
    description: 'The Mauryas secured western territories through diplomacy and warfare, gaining influence across the northwest.'
  },
  {
    year: 'c. 298–273 BCE',
    title: 'Bindusara expands the realm',
    description: 'The empire grew further south and consolidated administration through provincial governance.'
  },
  {
    year: 'c. 268–232 BCE',
    title: 'Ashoka transforms the empire',
    description: 'Ashoka embraced Dharma, propagated Buddhism, and issued rock and pillar edicts across the subcontinent.'
  },
  {
    year: 'c. 185 BCE',
    title: 'Decline and succession',
    description: 'After Ashoka, the Maurya Empire weakened and eventually fell to the rise of the Shunga dynasty.'
  }
];

const galleryItems = [
  {
    title: 'Ashoka Pillar',
    description: 'Mauryan pillars symbolized imperial justice, statecraft, and the spread of royal ideals.',
    imageUrl: '../assets/Ashoka.png'
  },
  {
    title: 'Pataliputra City',
    description: 'The capital reflected a planned urban design suited to administration, trade, and military control.',
    imageUrl: '../assets/ancient_india_illustration.png'
  },
  {
    title: 'Mauryan Legacy',
    description: 'The dynasty shaped later political thought through discipline, taxation, and public communication.',
    imageUrl: '../assets/coinhero.jpeg'
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

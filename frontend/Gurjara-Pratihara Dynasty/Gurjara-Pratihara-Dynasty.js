const timelineEvents = [
  {
    year: 'c. 730 CE',
    title: 'Nagabhata I defeats Arab raiders',
    description: 'Nagabhata I secured the western frontier and is credited with defeating an Arab army that threatened Gujarat and Rajasthan.'
  },
  {
    year: 'c. 780 CE',
    title: 'Vatsaraja expands to Kannauj',
    description: 'Vatsaraja pushed eastward, making Kannauj a central power base and contesting influence with the Palas and Rashtrakutas.'
  },
  {
    year: 'c. 836 – 885 CE',
    title: 'Mihira Bhoja reaches the dynasty’s peak',
    description: 'Under Mihira Bhoja, the Gurjara-Pratiharas became the dominant force across northern India and strengthened their military and administrative organization.'
  },
  {
    year: 'c. 885 – 910 CE',
    title: 'Mahendrapala I maintains the legacy',
    description: 'Mahendrapala I preserved the realm through continued patronage of temples and effective frontier defenses.'
  },
  {
    year: 'c. 940 CE',
    title: 'Decline and fragmentation',
    description: 'The dynasty weakened under repeated raids, feudal fragmentation, and the growing power of rival regional kingdoms.'
  }
];

const galleryItems = [
  {
    title: 'Pratihara Temple Sculpture',
    description: 'Rich stone carving and temple detail that inspired later North Indian temple architecture.',
    imageUrl: '../assets/Brihadeeswara_Temple.png'
  },
  {
    title: 'Frontier Fortification',
    description: 'The Pratiharas relied on strong defensive towns to slow invaders and protect trade routes.',
    imageUrl: '../assets/red_fort.png'
  },
  {
    title: 'Kannauj Court',
    description: 'Kannauj became the symbolic seat of Gurjara-Pratihara power and a major cultural center.',
    imageUrl: '../assets/ancient_india_illustration.png'
  }
];

function renderTimeline() {
  const timelineList = document.getElementById('timeline-list');
  if (!timelineList) return;

  timelineList.innerHTML = timelineEvents.map(event => {
    return `
      <div class="timeline-card">
        <h3>${event.year} — ${event.title}</h3>
        <p>${event.description}</p>
      </div>
    `;
  }).join('');
}

function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = galleryItems.map(item => {
    return `
      <article class="gallery-card">
        <div class="gallery-image">
          <img src="${item.imageUrl}" alt="${item.title}" />
        </div>
        <div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderGallery();
});

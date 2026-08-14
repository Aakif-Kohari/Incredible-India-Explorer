const timelineEvents = [
  {
    year: 'c. 958–1003 CE',
    title: 'Queen Didda rises to power',
    description:
      'Queen Didda, a member of the Lohara royal family, became the powerful ruler of Kashmir and played a major role in shaping the succession of the kingdom.'
  },
  {
    year: '1003 CE',
    title: 'Samgrāmarāja establishes Lohara rule',
    description:
      'After Queen Didda’s death, her adopted heir Samgrāmarāja became ruler of Kashmir, marking the beginning of the Lohara Dynasty in Kashmir.'
  },
  {
    year: 'c. 1003–1028 CE',
    title: 'Samgrāmarāja defends Kashmir',
    description:
      'Samgrāmarāja consolidated Lohara authority in Kashmir and successfully resisted attempts by Mahmud of Ghazni to enter the Kashmir Valley.'
  },
  {
    year: 'c. 1028–1063 CE',
    title: 'Ananta continues Lohara rule',
    description:
      'Ananta succeeded the early Lohara rulers and continued the dynasty’s rule over Kashmir during the 11th century.'
  },
  {
    year: 'c. 1063–1089 CE',
    title: 'Kalasha rules Kashmir',
    description:
      'Kalasha, also known as Ranaditya II, succeeded Ananta and continued the Lohara line during a period of political developments in Kashmir.'
  },
  {
    year: 'c. 1089–1101 CE',
    title: 'Reign of Harsha',
    description:
      'Harsha became one of the prominent later rulers of the first Lohara line. His reign is recorded in detail in Kalhaṇa’s Rajatarangini.'
  },
  {
    year: 'c. 1101–1320 CE',
    title: 'Later Lohara rulers',
    description:
      'The Lohara line continued through successive rulers, including Jayasimha, until the dynasty’s rule in Kashmir came to an end in the early 14th century.'
  }
];


const galleryItems = [
  {
    title: 'Queen Didda',
    description:
      'Queen Didda was a powerful ruler of Kashmir and a member of the Lohara royal family. Her succession decisions played an important role in establishing Lohara rule in Kashmir.',
    imageUrl: '/assets/images/queen-lohara.jpg'
  },
  {
    title: 'King Samgrāmarāja',
    description:'Samgrāmarāja consolidated Lohara authority in Kashmir and successfully resisted attempts by Mahmud of Ghazni to enter the Kashmir Valley. ',
      
    imageUrl: '/assets/images/lohara-ananta.jng'
  },
  {
    title: 'Kashmir Heritage',
    description:
      'The monuments and cultural heritage of Kashmir provide a glimpse into the historical landscape of the period associated with the Lohara rulers.',
    imageUrl: '/assets/images/lohara-temple1.jpg'
  }
];


function renderTimeline() {
  const timelineList = document.getElementById('timeline-list');

  if (!timelineList) return;

  timelineList.innerHTML = timelineEvents
    .map(
      event => `
        <div class="timeline-card">
          <h3>${event.year} — ${event.title}</h3>
          <p>${event.description}</p>
        </div>
      `
    )
    .join('');
}


function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');

  if (!galleryGrid) return;

  galleryGrid.innerHTML = galleryItems
    .map(
      item => `
        <article class="gallery-card">
          <div class="gallery-image">
            <img
              src="${item.imageUrl}"
              alt="${item.title}"
            />
          </div>

          <h3>${item.title}</h3>

          <p>${item.description}</p>
        </article>
      `
    )
    .join('');
}


document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderGallery();
});
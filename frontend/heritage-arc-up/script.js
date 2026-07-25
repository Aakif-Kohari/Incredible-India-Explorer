/**
 * Uttar Pradesh Heritage Arc Explorer Engine
 * Handles interactive map city selection, detailed monument display,
 * historical timeline, and travel guide data rendering.
 */

export const HERITAGE_ARC_DATA = {
  agra: {
    id: "agra",
    name: "Agra",
    tagline: "The Imperial Seat of Mughal Splendor",
    themeColor: "#f59e0b",
    badge: "Mughal Architecture & Artistry",
    description: "Nestled along the banks of the Yamuna River, Agra is world-famous as the home of the Taj Mahal. Serving as the imperial capital of the Mughal Empire under Akbar, Jahangir, and Shah Jahan, Agra stands as a testament to architectural genius, marble inlay artistry (Pietra Dura), and grand fortifications.",
    monuments: [
      { name: "Taj Mahal", desc: "UNESCO World Heritage Site and universal symbol of eternal love built by Shah Jahan in white marble." },
      { name: "Agra Fort", desc: "Vast 16th-century red sandstone fortress housing royal palaces like Jahangir Mahal and Khas Mahal." },
      { name: "Fatehpur Sikri", desc: "Akbar's short-lived imperial capital featuring the towering Buland Darwaza and Panch Mahal." },
      { name: "Tomb of Itmad-ud-Daulah", desc: "Known as the 'Baby Taj', this mausoleum pioneered intricate Pietra Dura marble inlay." }
    ],
    cultureFood: [
      { category: "Cuisine", detail: "Agra Petha (traditional ash gourd sweet), Bedai & Aloo Sabzi, and Mughlai Kebabs." },
      { category: "Handicrafts", detail: "Marble inlay work (Parchin Kari), Zardozi embroidery, and leather craft." },
      { category: "Traditions", detail: "Taj Mahotsav (10-day cultural extravaganza held every February near Shilpgram)." }
    ]
  },

  lucknow: {
    id: "lucknow",
    name: "Lucknow",
    tagline: "The City of Nawabs, Tehzeeb & Culinary Art",
    themeColor: "#ec4899",
    badge: "Nawabi Heritage & Literature",
    description: "Situated on the banks of the Gomti River, Lucknow is renowned for its refined etiquette (Tehzeeb), classical music, Urdu literature, elegant Awadhi architecture, and world-class street food.",
    monuments: [
      { name: "Bara Imambara", desc: "Architectural wonder housing the world's largest gravity-defying unsupported vaulted hall and the famous Bhulbhulaiya labyrinth." },
      { name: "Chota Imambara", desc: "The Palace of Lights, adorned with chandeliers, gilded domes, and intricate calligraphic artwork." },
      { name: "Rumi Darwaza", desc: "60-foot monumental gateway built in 1784, inspired by Turkish architecture of Constantinople." },
      { name: "The Residency", desc: "Historic complex preserving preserved ruins from the 1857 Indian War of Independence." }
    ],
    cultureFood: [
      { category: "Cuisine", detail: "Melt-in-mouth Galouti & Tunday Kebabs, Awadhi Biryani, Sheermal, and Tokri Chaat." },
      { category: "Handicrafts", detail: "Exquisite Chikankari shadow-stitch embroidery and Kamdani tinsel work." },
      { category: "Traditions", detail: "Kathak dance heritage of Lucknow Gharana, Gazal soirees, and Lucknow Mahotsav." }
    ]
  },

  varanasi: {
    id: "varanasi",
    name: "Varanasi",
    tagline: "The Eternal City & Spiritual Heart of India",
    themeColor: "#8b5cf6",
    badge: "Ancient Spirituality & Sacred Ganges",
    description: "Continuously inhabited for over 3,000 years, Varanasi (Kashi/Banaras) is the spiritual capital of India. Located on the sacred crescent bend of the River Ganges, it is a living center of philosophy, music, yoga, and ancient rituals.",
    monuments: [
      { name: "Kashi Vishwanath Temple", desc: "Sacred Jyotirlinga shrine dedicated to Lord Shiva, featuring golden spires and the modern Vishwanath Corridor." },
      { name: "Dashashwamedh Ghat", desc: "The oldest and most vibrant ghat, famed for its mesmerizing evening Ganga Aarti ceremony." },
      { name: "Sarnath", desc: "Located 10 km away, where Lord Buddha preached his first sermon after enlightenment; home to Dhamek Stupa." },
      { name: "Manikarnika & Harishchandra Ghats", desc: "Historic ghats central to Hindu death rituals and liberation (Moksha)." }
    ],
    cultureFood: [
      { category: "Cuisine", detail: "Banarasi Paan, Tamatar Chaat, Malaiyyo (winter foam dessert), Kachori Sabzi, and Thandai." },
      { category: "Handicrafts", detail: "Lustrous Banarasi Silk Sarees woven with gold/silver Zari thread, and wooden toys." },
      { category: "Traditions", detail: "Evening Ganga Aarti, Benares Classical Music Gharana (Tabla & Sitar), and Dev Deepawali." }
    ]
  }
};

export const TIMELINE_DATA = [
  {
    era: "Ancient Period (c. 1200 BCE – 6th Century BCE)",
    title: "Spiritual Origins in Kashi & Sarnath",
    description: "Varanasi emerges as a premier seat of Vedic learning. In 528 BCE, Gautama Buddha delivers his first sermon at Sarnath near Varanasi, launching the Wheel of Dhamma."
  },
  {
    era: "Medieval Mughal Era (1526 – 1707 CE)",
    title: "Architectural Zenith in Agra",
    description: "Emperor Akbar builds Fatehpur Sikri and expands Agra Fort. Shah Jahan constructs the magnificent Taj Mahal (1631–1653 CE), establishing Agra as a global landmark of artistic perfection."
  },
  {
    era: "Nawabi Era (1722 – 1856 CE)",
    title: "Cultural Flowering of Lucknow",
    description: "Nawabs of Awadh transfer their capital to Lucknow. Nawab Asaf-ud-Daula builds the Bara Imambara (1784 CE), fostering Chikankari craft, Kathak dance, and Awadhi culinary arts."
  },
  {
    era: "Modern Circuit (2014 – Present)",
    title: "Establishment of the UP Heritage Arc",
    description: "The Government of Uttar Pradesh formally designates the Agra-Lucknow-Varanasi circuit as the 'Heritage Arc' with expressways, Vande Bharat connectivity, and urban corridor revamps."
  }
];

export function renderCityDetails(cityKey) {
  const city = HERITAGE_ARC_DATA[cityKey];
  if (!city) return '';

  const monumentCards = city.monuments.map(m => `
    <div class="monument-card">
      <h4>${m.name}</h4>
      <p>${m.desc}</p>
    </div>
  `).join('');

  const cultureItems = city.cultureFood.map(c => `
    <div class="highlight-box">
      <strong>${c.category}:</strong> ${c.detail}
    </div>
  `).join('');

  return `
    <div class="city-detail-card" id="detail-${city.id}">
      <div class="detail-overview">
        <span class="detail-header-badge" style="background:${city.themeColor}22; color:${city.themeColor}; border:1px solid ${city.themeColor}">
          ${city.badge}
        </span>
        <h2 class="detail-title">${city.name}</h2>
        <p class="detail-tagline">"${city.tagline}"</p>
        <p class="detail-description">${city.description}</p>
        <div class="cultural-highlights">
          <h3>🎭 Cultural & Culinary Highlights</h3>
          ${cultureItems}
        </div>
      </div>
      <div class="detail-monuments">
        <h3>🏛️ Landmark Monuments & Attractions</h3>
        <div class="monument-grid">
          ${monumentCards}
        </div>
      </div>
    </div>
  `;
}

export function renderTimeline() {
  return TIMELINE_DATA.map((item, idx) => {
    const side = idx % 2 === 0 ? 'left' : 'right';
    return `
      <div class="timeline-item ${side}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-era">${item.era}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </div>
    `;
  }).join('');
}

// DOM Controller
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('city-detail-container');
    const timelineContainer = document.getElementById('timeline-container');
    const tabs = document.querySelectorAll('.tab-btn');
    const cityNodes = document.querySelectorAll('.city-node');

    if (timelineContainer) {
      timelineContainer.innerHTML = renderTimeline();
    }

    function selectCity(cityKey) {
      if (detailContainer) {
        detailContainer.innerHTML = renderCityDetails(cityKey);
      }

      tabs.forEach(tab => {
        const isSelected = tab.getAttribute('data-target') === cityKey;
        tab.classList.toggle('active', isSelected);
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      });

      cityNodes.forEach(node => {
        node.classList.toggle('active-node', node.getAttribute('data-city') === cityKey);
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        selectCity(target);
      });
    });

    cityNodes.forEach(node => {
      node.addEventListener('click', () => {
        const target = node.getAttribute('data-city');
        selectCity(target);
      });

      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = node.getAttribute('data-city');
          selectCity(target);
        }
      });
    });

    // Default select Agra
    selectCity('agra');
  });
}

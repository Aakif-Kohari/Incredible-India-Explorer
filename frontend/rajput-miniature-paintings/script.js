/**
 * Rajput Miniature Paintings Explorer JavaScript Logic
 */
(function() {
  'use strict';

  // Palette Data
  const palettes = [
    { name: 'Hinglu (Cinnabar)', hex: '#b91c1c', origin: 'Natural Mercury Sulfide', meaning: 'Passion, Royalty & Divine Energy' },
    { name: 'Lapis Lazuli Blue', hex: '#1d4ed8', origin: 'Crushed Lapis Gemstone', meaning: 'Cosmic Heavens & Lord Krishna' },
    { name: 'Peori (Indian Yellow)', hex: '#eab308', origin: 'Organic Plant & Soil Extract', meaning: 'Saffron Sun, Warmth & Joy' },
    { name: 'Harital (Orpiment)', hex: '#f59e0b', origin: 'Arsenic Trisulfide Mineral', meaning: 'Luminous Gold Highlights' },
    { name: 'Real Gold Leaf', hex: '#fbbf24', origin: 'Hand-beaten Pure Gold Foil', meaning: 'Imperial Crown & Divine Aureole' },
    { name: 'Malachite Green', hex: '#15803d', origin: 'Copper Carbonate Ore', meaning: 'Lush Foliage & Royal Gardens' }
  ];

  // Dynasty Artworks Data
  const rajputArtworks = [
    {
      id: 'bani-thani',
      title: 'Bani Thani (The Indian Mona Lisa)',
      school: 'Kishangarh',
      artist: 'Nihal Chand',
      period: 'c. 1750 CE',
      description: 'The crowning masterpiece of Kishangarh miniature art depicting Vishnupriya (Bani Thani), poetess and singer at the court of Raja Savant Singh. Celebrated for lotus-petal eyes, arched brows, and transparent odhani veil.'
    },
    {
      id: 'mewar-ragamala',
      title: 'Raga Dipaka (Mewar Ragamala)',
      school: 'Mewar',
      artist: 'Sahibdin',
      period: 'c. 1628 CE',
      description: 'A glowing masterpiece from Maharana Jagat Singh I’s atelier. Depicts the nocturnal musical mode where passionate love ignites lamps in the night chamber.'
    },
    {
      id: 'marwar-equestrian',
      title: 'Maharaja Abhai Singh on Horseback',
      school: 'Marwar',
      artist: 'Jodhpur Court Atelier',
      period: 'c. 1735 CE',
      description: 'A heroic Marwari equestrian portrait showing the ruler on a caparisoned stallion with a vibrant yellow background and stylized desert terrain.'
    },
    {
      id: 'bundi-hunting',
      title: 'Tiger Hunt in the Jungle',
      school: 'Bundi',
      artist: 'Kota Master Painter',
      period: 'c. 1770 CE',
      description: 'A thrilling jungle scene depicting royal hunters perched on machans amidst dense tropical foliage, rocky hills, and winding streams.'
    },
    {
      id: 'jaipur-radha-krishna',
      title: 'Radha Krishna in a Pavilion',
      school: 'Jaipur',
      artist: 'Jaipur Suratkhana Masters',
      period: 'c. 1790 CE',
      description: 'Exquisite courtly representation featuring architectural arcades, intricate jali screens, fine gold filigree embroidery, and divine romance.'
    },
    {
      id: 'bikaner-raslila',
      title: 'Raslila under Moonlit Sky',
      school: 'Bikaner',
      artist: 'Usta Ruknuddin',
      period: 'c. 1690 CE',
      description: 'Refined Bikaner miniature showing circular dance of Krishna and Gopis under cloud-draped starry skies with soft pastel tones.'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    initPalette();
    initGallery();
    initBookmark();
  });

  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }

  function initTabs() {
    const tabLinks = document.querySelectorAll('.rajput-tab-link');
    tabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        tabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const targetId = link.getAttribute('href');
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initPalette() {
    const container = document.getElementById('palette-grid');
    if (!container) return;

    palettes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'swatch-card';
      card.innerHTML = `
        <div class="swatch-color" style="background-color: ${item.hex}"></div>
        <div class="swatch-info">
          <h4>${item.name}</h4>
          <span>Origin: ${item.origin}</span>
          <span style="margin-top:0.3rem; color: var(--rajput-gold);">${item.meaning}</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function initGallery() {
    const gallery = document.getElementById('rajput-gallery');
    const filterBtns = document.querySelectorAll('.rajput-filter-btn');
    const modal = document.getElementById('rajput-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    if (!gallery) return;

    function renderCards(filter) {
      gallery.innerHTML = '';
      const list = (filter === 'all') 
        ? rajputArtworks 
        : rajputArtworks.filter(a => a.school.toLowerCase().includes(filter.toLowerCase()));

      list.forEach(art => {
        const card = document.createElement('div');
        card.className = 'rajput-art-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${art.title}`);

        card.innerHTML = `
          <span class="kingdom-badge">${art.school} School</span>
          <h3>${art.title}</h3>
          <span class="rajput-art-school">Artist/Period: ${art.artist} (${art.period})</span>
          <p>${art.description.substring(0, 110)}...</p>
        `;

        card.addEventListener('click', () => openModal(art));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(art);
          }
        });

        gallery.appendChild(card);
      });
    }

    renderCards('all');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards(btn.getAttribute('data-filter'));
      });
    });

    function openModal(art) {
      modalBody.innerHTML = `
        <span class="kingdom-badge">${art.school} School</span>
        <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${art.title}</h2>
        <p style="color: var(--rajput-gold); font-weight: 600; margin-bottom: 1rem;">Artist: ${art.artist} | Period: ${art.period}</p>
        <p style="line-height: 1.6;">${art.description}</p>
      `;
      modal.classList.remove('hidden');
    }

    if (modalClose) {
      modalClose.addEventListener('click', () => modal.classList.add('hidden'));
    }

    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) modal.classList.add('hidden');
    });
  }

  function initBookmark() {
    const bookmarkBtn = document.querySelector('.rajput-bookmark-btn');
    if (!bookmarkBtn) return;

    const id = bookmarkBtn.getAttribute('data-bookmark-id');
    let saved = JSON.parse(localStorage.getItem('user_bookmarks') || '[]');
    let isBookmarked = saved.includes(id);

    updateBtnState();

    bookmarkBtn.addEventListener('click', () => {
      saved = JSON.parse(localStorage.getItem('user_bookmarks') || '[]');
      if (saved.includes(id)) {
        saved = saved.filter(b => b !== id);
        isBookmarked = false;
      } else {
        saved.push(id);
        isBookmarked = true;
      }
      localStorage.setItem('user_bookmarks', JSON.stringify(saved));
      updateBtnState();
    });

    function updateBtnState() {
      if (isBookmarked) {
        bookmarkBtn.textContent = '♥ Saved to Journey';
        bookmarkBtn.style.background = 'var(--rajput-gold)';
        bookmarkBtn.style.color = '#0f172a';
      } else {
        bookmarkBtn.textContent = '♡ Save to Journey';
        bookmarkBtn.style.background = 'transparent';
        bookmarkBtn.style.color = 'var(--rajput-gold)';
      }
    }
  }
})();

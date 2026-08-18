/**
 * Pahari Miniature Art Explorer JavaScript Logic
 */
(function() {
  'use strict';

  // Pahari Artworks Data across Kangra, Basohli, and Guler
  const pahariArtworks = [
    {
      id: 'kangra-gita-govinda',
      title: 'Radha and Krishna in a Grove',
      school: 'Kangra',
      period: 'c. 1780 CE (Sansar Chand Period)',
      artist: 'Manaku Studio',
      description: 'Lyrical masterwork from Jayadeva’s Gita Govinda series showing Radha and Krishna reclining under a flowering Kadamba tree by the Yamuna banks, framed by lush hills.'
    },
    {
      id: 'basohli-rasamanjari',
      title: 'Krishna with Gopis (Rasamanjari)',
      school: 'Basohli',
      period: 'c. 1695 CE (Kripal Pal Period)',
      artist: 'Devidasa of Nurpur',
      description: 'Iconic Basohli folio celebrated for its intense monochrome yellow background, fierce expressive eyes, and real iridescent beetle-wing fragments glued as emerald ornaments.'
    },
    {
      id: 'guler-goverdhan',
      title: 'Raja Goverdhan Chand Listening to Musicians',
      school: 'Guler',
      period: 'c. 1750 CE',
      artist: 'Nainsukh of Guler',
      description: 'Pioneering naturalistic portrait by Nainsukh showing the Guler ruler smoking a hookah while listening to court musicians under a shaded terrace.'
    },
    {
      id: 'kangra-abhisarika',
      title: 'Abhisarika Nayika (Nayan Unmilan)',
      school: 'Kangra',
      period: 'c. 1795 CE',
      artist: 'Kushala (Son of Manaku)',
      description: 'Expressive romantic painting depicting a heroine braving lightning, snakes, and forest shadows to meet her beloved, reflecting peak Kangra emotional lyricism.'
    },
    {
      id: 'basohli-devi',
      title: 'Tantric Devi in Cosmic Glory',
      school: 'Basohli',
      period: 'c. 1670 CE',
      artist: 'Basohli Atelier Masters',
      description: 'Early Basohli masterpiece showcasing vibrant red border frames, bold primitive line power, and intense spiritual symbolism.'
    },
    {
      id: 'guler-bhagavata',
      title: 'Krishna Lifting Mount Govardhan',
      school: 'Guler',
      period: 'c. 1755 CE',
      artist: 'Pandit Seu Family Studio',
      description: 'Soft pastel composition capturing villagers and cattle taking shelter under Govardhan hill with atmospheric Himalayan cloudscapes.'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
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
    const tabLinks = document.querySelectorAll('.pahari-tab-link');
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

  function initGallery() {
    const gallery = document.getElementById('pahari-gallery');
    const filterBtns = document.querySelectorAll('.pahari-filter-btn');
    const modal = document.getElementById('pahari-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    if (!gallery) return;

    function renderCards(filter) {
      gallery.innerHTML = '';
      const list = (filter === 'all')
        ? pahariArtworks
        : pahariArtworks.filter(a => a.school.toLowerCase() === filter.toLowerCase());

      list.forEach(art => {
        const card = document.createElement('div');
        card.className = 'pahari-art-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${art.title}`);

        card.innerHTML = `
          <span class="school-badge">${art.school} School</span>
          <h3>${art.title}</h3>
          <span>${art.artist} (${art.period})</span>
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
        <span class="school-badge">${art.school} School</span>
        <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${art.title}</h2>
        <p style="color: var(--pahari-gold); font-weight: 600; margin-bottom: 1rem;">Artist/Atelier: ${art.artist} | Period: ${art.period}</p>
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
    const bookmarkBtn = document.querySelector('.pahari-bookmark-btn');
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
        bookmarkBtn.style.background = 'var(--pahari-gold)';
        bookmarkBtn.style.color = '#0f172a';
      } else {
        bookmarkBtn.textContent = '♡ Save to Journey';
        bookmarkBtn.style.background = 'transparent';
        bookmarkBtn.style.color = 'var(--pahari-gold)';
      }
    }
  }
})();

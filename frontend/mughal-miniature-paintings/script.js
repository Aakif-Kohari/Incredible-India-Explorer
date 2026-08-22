/**
 * Mughal Miniature Paintings Explorer JavaScript Logic
 */
(function() {
  'use strict';

  // Sample Mughal Masterpieces Data
  const artworks = [
    {
      id: 'akbarnama-fort',
      title: 'Construction of Agra Fort',
      era: 'Akbar Period (c. 1590 CE)',
      patron: 'Emperor Akbar',
      artist: 'Miskina & Sarwan',
      technique: 'Opaque watercolour and gold on paper',
      description: 'A dynamic masterwork from the Akbarnama manuscript depicting stonemasons, architects, and supervisors building the massive red sandstone walls of Agra Fort with intense human activity.'
    },
    {
      id: 'jahangir-falcon',
      title: 'Falcon on a Bird Rest',
      era: 'Jahangir Period (c. 1615 CE)',
      patron: 'Emperor Jahangir',
      artist: 'Ustad Mansur (Nadir-al-Asr)',
      technique: 'Opaque watercolour and gold pigment',
      description: 'A world-famous naturalistic study of a prized peregrine falcon presented to Emperor Jahangir, showcasing exquisite feather detail and scientific observation.'
    },
    {
      id: 'durbar-shah-jahan',
      title: 'Durbar of Shah Jahan',
      era: 'Shah Jahan Period (c. 1650 CE)',
      patron: 'Emperor Shah Jahan',
      artist: 'Bichitr',
      technique: 'Opaque watercolour, gold gilding & pearl dust',
      description: 'A pristine ceremonial court depiction showing Shah Jahan seated on the Peacock Throne, flanked by princes, nobles, and ambassadors with mirror-like symmetry.'
    },
    {
      id: 'hamzanama-giants',
      title: 'Amir Hamza Fights the Giants',
      era: 'Early Akbar Period (c. 1562–1577 CE)',
      patron: 'Emperor Akbar',
      artist: 'Mir Sayyid Ali & Abd al-Samad Studio',
      technique: 'Pigment on cotton cloth scroll backing',
      description: 'Part of the monumental 14-volume Hamzanama project featuring heroic deeds, Persian mythical creatures, and bold Indian color fields.'
    },
    {
      id: 'jahangir-embrace',
      title: 'Allegorical Dream of Jahangir & Shah Abbas',
      era: 'Jahangir Period (c. 1618 CE)',
      patron: 'Emperor Jahangir',
      artist: 'Abul Hasan (Nadir al-Zaman)',
      technique: 'Gold leaf and fine brushwork on manuscript folio',
      description: 'An iconic political allegory portraying Jahangir embracing Persian Shah Abbas while standing atop a globe, surrounded by a radiant golden sun halo.'
    },
    {
      id: 'dharani-flora',
      title: 'Flowering Plant Study (Iris)',
      era: 'Late Jahangir / Early Shah Jahan (c. 1625 CE)',
      patron: 'Imperial Court Atelier',
      artist: 'Muhammad Nadir al-Samarqandi',
      technique: 'Natural mineral pigments with decorative Hashiya border',
      description: 'Refined botanical study illustrating Kashmir flora with gilded floral borders (Hashiya) typical of Mughal court albums (Muraqqa).'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    initGallery();
    initBookmark();
  });

  // Theme Toggle Logic
  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }

  // Tab Navigation Smooth Scroll & Active state
  function initTabs() {
    const tabLinks = document.querySelectorAll('.mughal-tab-link');
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

  // Gallery & Modal Logic
  function initGallery() {
    const galleryContainer = document.getElementById('mughal-gallery');
    const modal = document.getElementById('mughal-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    if (!galleryContainer) return;

    artworks.forEach(art => {
      const card = document.createElement('div');
      card.className = 'art-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${art.title}`);

      card.innerHTML = `
        <div class="art-card-body">
          <span class="art-card-badge">${art.era}</span>
          <h3>${art.title}</h3>
          <span class="art-patron">Patron: ${art.patron}</span>
          <p>${art.description.substring(0, 100)}...</p>
        </div>
      `;

      card.addEventListener('click', () => openModal(art));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(art);
        }
      });

      galleryContainer.appendChild(card);
    });

    function openModal(art) {
      modalBody.innerHTML = `
        <span class="art-card-badge">${art.era}</span>
        <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${art.title}</h2>
        <p style="color: var(--mughal-gold); font-weight: 600; margin-bottom: 1rem;"><strong>Patron:</strong> ${art.patron} | <strong>Artist:</strong> ${art.artist}</p>
        <p style="font-size: 0.9rem; color: var(--mughal-muted); margin-bottom: 1rem;"><strong>Technique:</strong> ${art.technique}</p>
        <p style="line-height: 1.6;">${art.description}</p>
      `;
      modal.classList.remove('hidden');
    }

    if (modalClose) {
      modalClose.addEventListener('click', () => modal.classList.add('hidden'));
    }

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
      }
    });
  }

  // Bookmark Feature
  function initBookmark() {
    const bookmarkBtn = document.querySelector('.mughal-bookmark-btn');
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
        bookmarkBtn.style.background = 'var(--mughal-gold)';
        bookmarkBtn.style.color = '#0f172a';
      } else {
        bookmarkBtn.textContent = '♡ Save to Journey';
        bookmarkBtn.style.background = 'transparent';
        bookmarkBtn.style.color = 'var(--mughal-gold)';
      }
    }
  }
})();

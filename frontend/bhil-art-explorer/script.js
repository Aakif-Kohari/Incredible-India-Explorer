/**
 * Bhil Art Explorer JavaScript Logic
 */
(function() {
  'use strict';

  // Bhil Art Gallery Data
  const bhilArtworks = [
    {
      id: 'bhuri-bai-pithora',
      title: 'Sacred Pithora Procession',
      artist: 'Padma Shri Bhuri Bai of Pitol',
      motif: 'Pithora Sacred Horse & Deities',
      description: 'Landmark canvas work by Bhuri Bai illustrating Baba Pithora, royal horses, peacocks, and village life with thousands of meticulous, bright acrylic dots.'
    },
    {
      id: 'lado-bai-tree',
      title: 'Tree of Life & Forest Birds',
      artist: 'Lado Bai',
      motif: 'Mahua Tree & Peacocks',
      description: 'Vivid tribal artwork depicting a giant Mahua tree teeming with nesting peacocks, squirrels, and wild bees in rhythmic orange, green, and white dot patterns.'
    },
    {
      id: 'subhash-bhil-harvest',
      title: 'Maize Harvest Celebration',
      artist: 'Subhash Bhil',
      motif: 'Maize Crop & Bullocks',
      description: 'Folk visual of Bhil men and women harvesting golden corn (Makka) under the autumn sun with dotted borders framing agricultural tools.'
    },
    {
      id: 'gangu-bai-deities',
      title: 'Sun God & Sacred Animals',
      artist: 'Gangu Bai',
      motif: 'Suraj-Chanda & Tigers',
      description: 'Traditional ritual mural showing the radiant Sun God giving life energy to tigers, deer, and river fish across central India.'
    },
    {
      id: 'bhuri-bai-dancers',
      title: 'Bhagoria Festival Dancers',
      artist: 'Bhuri Bai',
      motif: 'Tribal Dance & Dhol Drums',
      description: 'Energetic celebration scene capturing young Bhil dancers wearing silver jewelry and colorful turbans performing during the annual Bhagoria Haat.'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    initMotifs();
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
    const tabLinks = document.querySelectorAll('.bhil-tab-link');
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

  function initMotifs() {
    const motifCards = document.querySelectorAll('.motif-card');
    const modal = document.getElementById('bhil-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    motifCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;
        const icon = card.querySelector('.motif-icon').textContent;

        modalBody.innerHTML = `
          <div style="font-size: 3rem; text-align: center; margin-bottom: 0.5rem;">${icon}</div>
          <span class="bhil-badge">Tribal Symbolism</span>
          <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${title}</h2>
          <p style="line-height: 1.6; color: var(--bhil-text);">${desc}</p>
        `;
        modal.classList.remove('hidden');
      });
    });

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

  function initGallery() {
    const gallery = document.getElementById('bhil-gallery');
    const modal = document.getElementById('bhil-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    if (!gallery) return;

    bhilArtworks.forEach(art => {
      const card = document.createElement('div');
      card.className = 'bhil-art-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${art.title}`);

      card.innerHTML = `
        <span class="bhil-badge">Bhil Masterpiece</span>
        <h3>${art.title}</h3>
        <span>Artist: ${art.artist}</span>
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

    function openModal(art) {
      modalBody.innerHTML = `
        <span class="bhil-badge">${art.motif}</span>
        <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${art.title}</h2>
        <p style="color: var(--bhil-gold); font-weight: 600; margin-bottom: 1rem;">Master Artist: ${art.artist}</p>
        <p style="line-height: 1.6;">${art.description}</p>
      `;
      modal.classList.remove('hidden');
    }
  }

  function initBookmark() {
    const bookmarkBtn = document.querySelector('.bhil-bookmark-btn');
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
        bookmarkBtn.style.background = 'var(--bhil-gold)';
        bookmarkBtn.style.color = '#0f172a';
      } else {
        bookmarkBtn.textContent = '♡ Save to Journey';
        bookmarkBtn.style.background = 'transparent';
        bookmarkBtn.style.color = 'var(--bhil-gold)';
      }
    }
  }
})();

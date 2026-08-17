/**
 * Aipan Art Visualizer JavaScript Logic
 */
(function() {
  'use strict';

  // Kumaoni Aipan Motifs Data
  const aipanMotifs = [
    {
      id: 'lakshmi-chowki-art',
      title: 'Grand Lakshmi Chowki',
      occasion: 'Diwali Worship & Lakshmi Puja',
      medium: 'Geru base & Biswar rice paste solution',
      description: 'Sacred square floor altar featuring an 8-petaled lotus at the center with stylized footprints of Goddess Lakshmi pointing inward from the four directions.'
    },
    {
      id: 'vasudhara-stream',
      title: 'Vasudhara Door Threshold Stream',
      occasion: 'All Kumaoni Ceremonies',
      medium: 'Unbroken fluid rice paste streams',
      description: 'Odd number of parallel vertical white lines poured continuously over red earth borders surrounding home entrances to invite unceasing prosperity.'
    },
    {
      id: 'saraswati-chowki-art',
      title: 'Saraswati Knowledge Chowki',
      occasion: 'Vidyarambh & Student Rites',
      medium: 'Geometric star-grid rice linework',
      description: 'Ritual floor motif designed for Goddess Saraswati featuring five-pointed stars, inkpot outlines, and sacred manuscript symbols.'
    },
    {
      id: 'shiv-pith-chowki',
      title: 'Shiv Pith Chowki',
      occasion: 'Maha Shivratri & Temple Pujas',
      medium: 'Trishul, Bilva Leaf & Lotus motifs',
      description: 'Dedicated to Lord Shiva, featuring 14-point geometric stars, trident symbols, and sacred Bilva leaves surrounding the central altar.'
    },
    {
      id: 'dhulia-arghya-wedding',
      title: 'Dhulia Arghya Wedding Chowki',
      occasion: 'Kumaoni Marriage Ceremonies',
      medium: 'Sacred bridal floor diagram',
      description: 'Elaborate bridal welcoming motif painted at the threshold where the bridegroom is received with Vedic chants and floral blessings.'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    initPatternModal();
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
    const tabLinks = document.querySelectorAll('.aipan-tab-link');
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

  function initPatternModal() {
    const patternCards = document.querySelectorAll('.pattern-card');
    const modal = document.getElementById('aipan-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    patternCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;
        const icon = card.querySelector('.pattern-icon').textContent;

        modalBody.innerHTML = `
          <div style="font-size: 3rem; text-align: center; margin-bottom: 0.5rem;">${icon}</div>
          <span class="aipan-badge">Sacred Geometry</span>
          <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${title}</h2>
          <p style="line-height: 1.6; color: var(--aipan-text);">${desc}</p>
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
    const gallery = document.getElementById('aipan-gallery');
    const modal = document.getElementById('aipan-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    if (!gallery) return;

    aipanMotifs.forEach(art => {
      const card = document.createElement('div');
      card.className = 'aipan-art-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${art.title}`);

      card.innerHTML = `
        <span class="aipan-badge">Kumaon Ritual</span>
        <h3>${art.title}</h3>
        <span>Occasion: ${art.occasion}</span>
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
        <span class="aipan-badge">${art.occasion}</span>
        <h2 id="modal-title" style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0.5rem 0;">${art.title}</h2>
        <p style="color: var(--aipan-gold); font-weight: 600; margin-bottom: 1rem;">Medium: ${art.medium}</p>
        <p style="line-height: 1.6;">${art.description}</p>
      `;
      modal.classList.remove('hidden');
    }
  }

  function initBookmark() {
    const bookmarkBtn = document.querySelector('.aipan-bookmark-btn');
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
        bookmarkBtn.style.background = 'var(--aipan-gold)';
        bookmarkBtn.style.color = '#0f172a';
      } else {
        bookmarkBtn.textContent = '♡ Save to Journey';
        bookmarkBtn.style.background = 'transparent';
        bookmarkBtn.style.color = 'var(--aipan-gold)';
      }
    }
  }
})();

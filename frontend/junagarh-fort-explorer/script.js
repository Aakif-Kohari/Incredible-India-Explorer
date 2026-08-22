/* ============================================================
   Junagarh Fort Explorer — gallery modal, journey bookmark,
   scroll-to-top. Uses document-level event delegation because
   router.js swaps the contents of #app-root on navigation,
   which would detach listeners bound directly to DOM nodes.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Gallery modal ---------- */
  const modal = document.getElementById('junagarh-modal');
  const modalImage = document.getElementById('junagarh-modal-image');
  const modalTitle = document.getElementById('junagarh-modal-title');
  const modalHeading = document.getElementById('junagarh-modal-heading');
  const modalDescription = document.getElementById('junagarh-modal-description');
  const modalClose = document.getElementById('junagarh-modal-close');
  let lastFocused = null;

  function openModal(item) {
    const title = item.dataset.title || 'Junagarh Fort';
    const desc = item.dataset.desc || '';
    const img = item.querySelector('img');

    modalTitle.textContent = title;
    modalHeading.textContent = 'Junagarh Fort · Bikaner, Rajasthan';
    modalDescription.textContent = desc;
    modalImage.src = img ? img.src : '';
    modalImage.alt = img ? img.alt : title;

    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) {
      lastFocused.focus();
    }
  }

  document.addEventListener('click', function (event) {
    const item = event.target.closest('.junagarh-gallery-item');
    if (item) {
      openModal(item);
      return;
    }
    if (event.target === modalClose || event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (!modal.classList.contains('open')) {
      return;
    }
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  /* ---------- Journey bookmark ---------- */
  function getBookmarkBtn() {
    return document.querySelector('.journey-bookmark-btn[data-bookmark-id="junagarh-fort-main"]');
  }

  function updateBookmarkState() {
    const bookmarkBtn = getBookmarkBtn();
    if (!bookmarkBtn || typeof Journey === 'undefined') {
      return;
    }
    const saved = Journey.isSaved('junagarh-fort-main');
    bookmarkBtn.classList.toggle('saved', saved);
    bookmarkBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    bookmarkBtn.innerHTML = saved ? '♥ Saved to Journey' : '♡ Save to Journey';
  }

  document.addEventListener('click', function (event) {
    const bookmarkBtn = getBookmarkBtn();
    if (!bookmarkBtn || typeof Journey === 'undefined') {
      return;
    }
    if (event.target.closest('[data-bookmark-id="junagarh-fort-main"]')) {
      Journey.toggle({
        id: 'junagarh-fort-main',
        explorerPage: 'frontend/junagarh-fort-explorer/index.html',
        title: 'Junagarh Fort',
        thumbnail: 'https://images.unsplash.com/photo-1652019126778-c0937662c884?w=400&q=80&fm=jpg&fit=crop',
        category: 'heritage'
      });
      updateBookmarkState();
    }
  });

  document.addEventListener('DOMContentLoaded', updateBookmarkState);
  window.addEventListener('load', updateBookmarkState);

  /* ---------- Search index registration ---------- */
  if (typeof Journey !== 'undefined' && Journey.registerSearchItems) {
    Journey.registerSearchItems('frontend/junagarh-fort-explorer/index.html', [{
      id: 'junagarh-fort-main',
      title: 'Junagarh Fort Explorer',
      description: 'Explore Junagarh Fort, Bikaner\'s royal citadel — Raja Rai Singh\'s red sandstone fortress, its fortifications and gates, palaces, courtyards, decorative interiors and architectural influences.',
      link: 'frontend/junagarh-fort-explorer/index.html'
    }]);
  }

  /* ---------- Scroll to top ---------- */
  const scrollTopBtn = document.getElementById('btn-scroll-top');

  window.addEventListener('scroll', function () {
    if (!scrollTopBtn) {
      return;
    }
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
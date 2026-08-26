/* ============================================================
   Mehrangarh Fort Explorer — gallery modal, journey bookmark,
   scroll-to-top. Mirrors the jaisalmer-fort-explorer pattern.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Gallery modal ---------- */
  /* Note: router.js swaps the contents of #app-root on navigation, which
     detaches any listeners bound directly to gallery items. We therefore
     use document-level event delegation so the modal keeps working even
     after the router re-renders the page content. */
  const modal = document.getElementById('mehrangarh-modal');
  const modalImage = document.getElementById('mehrangarh-modal-image');
  const modalTitle = document.getElementById('mehrangarh-modal-title');
  const modalHeading = document.getElementById('mehrangarh-modal-heading');
  const modalDescription = document.getElementById('mehrangarh-modal-description');
  const modalClose = document.getElementById('mehrangarh-modal-close');
  let lastFocused = null;

  function openModal(item) {
    const title = item.dataset.title || 'Mehrangarh Fort';
    const desc = item.dataset.desc || '';
    const img = item.querySelector('img');

    modalTitle.textContent = title;
    modalHeading.textContent = 'Mehrangarh Fort · Jodhpur, Rajasthan';
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
    const item = event.target.closest('.mehrangarh-gallery-item');
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
    return document.querySelector('.journey-bookmark-btn[data-bookmark-id="mehrangarh-fort-main"]');
  }

  function updateBookmarkState() {
    const bookmarkBtn = getBookmarkBtn();
    if (!bookmarkBtn || typeof Journey === 'undefined') {
      return;
    }
    const saved = Journey.isSaved('mehrangarh-fort-main');
    bookmarkBtn.classList.toggle('saved', saved);
    bookmarkBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    bookmarkBtn.innerHTML = saved ? '♥ Saved to Journey' : '♡ Save to Journey';
  }

  document.addEventListener('click', function (event) {
    const bookmarkBtn = getBookmarkBtn();
    if (!bookmarkBtn || typeof Journey === 'undefined') {
      return;
    }
    if (event.target.closest('[data-bookmark-id="mehrangarh-fort-main"]')) {
      Journey.toggle({
        id: 'mehrangarh-fort-main',
        explorerPage: 'frontend/mehrangarh-fort-explorer/index.html',
        title: 'Mehrangarh Fort',
        thumbnail: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=400&q=80&fm=jpg&fit=crop',
        category: 'heritage'
      });
      updateBookmarkState();
    }
  });

  document.addEventListener('DOMContentLoaded', updateBookmarkState);
  window.addEventListener('load', updateBookmarkState);

  /* ---------- Search index registration ---------- */
  if (typeof Journey !== 'undefined' && Journey.registerSearchItems) {
    Journey.registerSearchItems('frontend/mehrangarh-fort-explorer/index.html', [{
      id: 'mehrangarh-fort-main',
      title: 'Mehrangarh Fort Explorer',
      description: 'Explore Mehrangarh Fort, Jodhpur\'s majestic citadel — Rao Jodha\'s hilltop fortress, its defensive walls and gates, royal palaces, museum collections and Marwar\'s royal heritage.',
      link: 'frontend/mehrangarh-fort-explorer/index.html'
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
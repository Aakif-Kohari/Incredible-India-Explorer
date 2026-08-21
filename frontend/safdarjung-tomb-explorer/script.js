/* ============================================================
   Safdarjung's Tomb Explorer — Page Script
   IMPORTANT: Uses document-level event delegation because
   router.js replaces #app-root innerHTML on route swaps,
   which detaches directly-bound listeners.
   ============================================================ */

(function () {
  'use strict';

  /* ---------------- Constants ---------------- */
  var PAGE_TITLE = 'Safdarjung\'s Tomb';
  var EXPLORER_PAGE = 'frontend/safdarjung-tomb-explorer/index.html';
  var THUMBNAIL = 'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?w=640&q=70&fm=jpg&fit=crop';
  var CATEGORY = 'Monument';

  /* ---------------- Journey Registration ---------------- */
  function registerWithJourney() {
    if (typeof Journey !== 'undefined' && Journey && typeof Journey.registerSearchItems === 'function') {
      Journey.registerSearchItems(EXPLORER_PAGE, [
        {
          id: 'safdarjung-tomb-main',
          explorerPage: EXPLORER_PAGE,
          title: PAGE_TITLE,
          thumbnail: THUMBNAIL,
          category: CATEGORY
        }
      ]);
    }
  }

  /* ---------------- Modal ---------------- */
  function getModal() {
    return document.getElementById('safdarjung-modal');
  }

  function openModal(item) {
    var modal = getModal();
    if (!modal) return;

    var title = document.getElementById('safdarjung-modal-title');
    var heading = document.getElementById('safdarjung-modal-heading');
    var desc = document.getElementById('safdarjung-modal-description');
    var img = document.getElementById('safdarjung-modal-image');
    var category = document.getElementById('safdarjung-modal-category');

    if (title) title.textContent = item.title || '';
    if (heading) heading.textContent = item.heading || '';
    if (desc) desc.textContent = item.desc || '';
    if (category) category.textContent = item.category || 'Gallery Highlight';
    if (img) {
      img.src = item.img;
      img.alt = item.title || 'Safdarjung\'s Tomb';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var closeBtn = document.getElementById('safdarjung-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    var modal = getModal();
    if (!modal) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    var lastFocused = modal._lastTrigger;
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  /* ---------------- Bookmark ---------------- */
  function handleBookmarkClick(btn) {
    if (typeof Journey === 'undefined' || !Journey || typeof Journey.toggle !== 'function') {
      return;
    }

    var item = {
      id: 'safdarjung-tomb-main',
      explorerPage: EXPLORER_PAGE,
      title: PAGE_TITLE,
      thumbnail: THUMBNAIL,
      category: CATEGORY
    };

    var isSaved = Journey.toggle(item);
    btn.setAttribute('aria-pressed', String(isSaved));
    btn.textContent = isSaved ? '♥ Saved to Journey' : '♡ Save to Journey';
  }

  function updateBookmarkState(btn) {
    if (typeof Journey === 'undefined' || !Journey) return;
    var isSaved = false;
    if (typeof Journey.isSaved === 'function') {
      isSaved = Journey.isSaved('safdarjung-tomb-main');
    } else if (typeof Journey.getSavedItems === 'function') {
      var saved = Journey.getSavedItems() || [];
      isSaved = saved.some(function (i) { return i && i.id === 'safdarjung-tomb-main'; });
    }
    btn.setAttribute('aria-pressed', String(isSaved));
    btn.textContent = isSaved ? '♥ Saved to Journey' : '♡ Save to Journey';
  }

  /* ---------------- Scroll Top ---------------- */
  function handleScroll() {
    var btn = document.getElementById('btn-scroll-top');
    if (!btn) return;
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------- Document-level Delegation ---------------- */
  document.addEventListener('click', function (event) {
    var target = event.target;

    // Bookmark button
    var bookmarkBtn = target.closest('.safdarjung-bookmark-btn');
    if (bookmarkBtn) {
      event.preventDefault();
      handleBookmarkClick(bookmarkBtn);
      return;
    }

    // Gallery item -> open modal
    var galleryItem = target.closest('.safdarjung-gallery-item');
    if (galleryItem) {
      var imgEl = galleryItem.querySelector('img');
      var titleEl = galleryItem.querySelector('h4');
      var descEl = galleryItem.querySelector('p');
      var modal = getModal();
      if (modal) modal._lastTrigger = galleryItem;
      openModal({
        title: titleEl ? titleEl.textContent : galleryItem.getAttribute('data-title') || '',
        heading: galleryItem.getAttribute('data-title') || '',
        desc: descEl ? descEl.textContent : galleryItem.getAttribute('data-desc') || '',
        category: 'Safdarjung\'s Tomb',
        img: imgEl ? imgEl.src : ''
      });
      return;
    }

    // Modal close button
    if (target.closest('#safdarjung-modal-close')) {
      closeModal();
      return;
    }

    // Click on modal backdrop (outside card)
    var modalEl = getModal();
    if (modalEl && target === modalEl) {
      closeModal();
      return;
    }

    // Scroll top
    if (target.closest('#btn-scroll-top')) {
      scrollToTop();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      var modal = getModal();
      if (modal && modal.classList.contains('open')) {
        closeModal();
      }
    }
  });

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------------- Init ---------------- */
  function init() {
    registerWithJourney();

    var bookmarkBtn = document.querySelector('.safdarjung-bookmark-btn');
    if (bookmarkBtn) {
      updateBookmarkState(bookmarkBtn);
    }

    handleScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

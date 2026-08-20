// ===== Motupalli Port Explorer — Page Script =====

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Gallery Modal ----------
  const modal = document.getElementById('motupalli-modal');
  const modalClose = document.getElementById('motupalli-modal-close');
  const modalImage = document.getElementById('motupalli-modal-image');
  const modalTitle = document.getElementById('motupalli-modal-title');
  const modalCategory = document.getElementById('motupalli-modal-category');
  const modalHeading = document.getElementById('motupalli-modal-heading');
  const modalDescription = document.getElementById('motupalli-modal-description');
  const galleryItems = document.querySelectorAll('.motupalli-gallery-item');

  function openModal(item) {
    const image = item.querySelector('img');
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';

    if (image && modalImage) {
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
    }

    modalTitle.textContent = title;
    modalCategory.textContent = 'Gallery Highlight';
    modalHeading.textContent = 'Motupalli Ancient Port';
    modalDescription.textContent = desc;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      openModal(item);
    });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item);
      }
    });
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (modal && e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ---------- Bookmark Button (Journey integration) ----------
  // NOTE: This assumes journey.js exposes a global `Journey` object with a
  // `Journey.toggle(id, title, thumbnail)` method (per CodeRabbit's review)
  // and, ideally, a `Journey.isSaved(id)` method to read current state.
  // Please share frontend/journey/journey.js so this can be verified/corrected
  // against the real API — method names below are a best-effort guess.
  const bookmarkBtn = document.querySelector('.journey-bookmark-btn[data-bookmark-id="motupalli-port-main"]');

  if (bookmarkBtn) {
    const bookmarkId = bookmarkBtn.getAttribute('data-bookmark-id');
    const bookmarkTitle = 'Motupalli Ancient Port';
    const bookmarkThumbnail = '../assets/motupalli_port_banner.svg';

    function refreshButtonState() {
      let isSaved = false;
      if (typeof Journey !== 'undefined' && typeof Journey.isSaved === 'function') {
        isSaved = Journey.isSaved(bookmarkId);
      }
      bookmarkBtn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
      bookmarkBtn.textContent = isSaved ? '♥ Saved to Journey' : '♡ Save to Journey';
    }

    bookmarkBtn.addEventListener('click', function () {
      if (typeof Journey === 'undefined' || typeof Journey.toggle !== 'function') {
        console.warn('Journey.toggle() not found — journey.js may not be loaded before script.js, or the shared API differs from what was assumed.');
        return;
      }
      Journey.toggle(bookmarkId, bookmarkTitle, bookmarkThumbnail);
      refreshButtonState();
    });

    refreshButtonState();
  }

  // ---------- Scroll to top button ----------
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  if (scrollTopBtn) {
    function syncScrollTopVisibility() {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }

    window.addEventListener('scroll', syncScrollTopVisibility);
    syncScrollTopVisibility();

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
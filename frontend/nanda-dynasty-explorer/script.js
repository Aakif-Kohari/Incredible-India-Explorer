// ===== Nanda Dynasty Explorer — Page Script =====

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Gallery Modal ----------
  const modal = document.getElementById('nanda-modal');
  const modalClose = document.getElementById('nanda-modal-close');
  const modalImage = document.getElementById('nanda-modal-image');
  const modalTitle = document.getElementById('nanda-modal-title');
  const modalCategory = document.getElementById('nanda-modal-category');
  const modalHeading = document.getElementById('nanda-modal-heading');
  const modalDescription = document.getElementById('nanda-modal-description');
  const galleryItems = document.querySelectorAll('.nanda-gallery-item');

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
    modalHeading.textContent = 'Nanda Dynasty';
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
  // NOTE: same assumption as the Motupalli/Kozhikode/Chandela pages — Journey.toggle(id, title, thumbnail)
  // and Journey.isSaved(id) are assumed based on CodeRabbit's review of an earlier PR.
  // Please share frontend/journey/journey.js so this can be verified/corrected.
  const bookmarkBtn = document.querySelector('.journey-bookmark-btn[data-bookmark-id="nanda-dynasty-main"]');

  if (bookmarkBtn) {
    const bookmarkId = bookmarkBtn.getAttribute('data-bookmark-id');
    const bookmarkTitle = 'Nanda Dynasty';
    const bookmarkThumbnail = '../assets/nanda_pataliputra_banner.svg';

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
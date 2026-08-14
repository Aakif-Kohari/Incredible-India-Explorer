// ===== Chandela Dynasty Explorer — Page Script =====

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Gallery Modal ----------
  const modal = document.getElementById('chandela-modal');
  const modalClose = document.getElementById('chandela-modal-close');
  const modalImage = document.getElementById('chandela-modal-image');
  const modalTitle = document.getElementById('chandela-modal-title');
  const modalCategory = document.getElementById('chandela-modal-category');
  const modalHeading = document.getElementById('chandela-modal-heading');
  const modalDescription = document.getElementById('chandela-modal-description');
  const galleryItems = document.querySelectorAll('.chandela-gallery-item');

  let lastFocusedElement = null;

  function getFocusableElements() {
    if (!modal) return [];
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    return Array.prototype.slice.call(modal.querySelectorAll(selectors.join(',')))
      .filter(function (el) {
        return el.offsetParent !== null; // only visible elements
      });
  }

  function handleModalKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      // Shift+Tab: if focus is on first element (or outside), wrap to last
      if (document.activeElement === first || !modal.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: if focus is on last element (or outside), wrap to first
      if (document.activeElement === last || !modal.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal(item) {
    lastFocusedElement = document.activeElement;

    const image = item.querySelector('img');
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';

    if (image && modalImage) {
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
    }

    modalTitle.textContent = title;
    modalCategory.textContent = 'Gallery Highlight';
    modalHeading.textContent = 'Chandela Dynasty';
    modalDescription.textContent = desc;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Move focus into the modal — prefer the close button
    const focusable = getFocusableElements();
    if (modalClose) {
      modalClose.focus();
    } else if (focusable.length > 0) {
      focusable[0].focus();
    }

    modal.addEventListener('keydown', handleModalKeydown);
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    modal.removeEventListener('keydown', handleModalKeydown);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
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

  // ---------- Bookmark Button (Journey integration) ----------
  const bookmarkBtn = document.querySelector('.journey-bookmark-btn[data-bookmark-id="chandela-dynasty-main"]');

  if (bookmarkBtn) {
    const bookmarkId = bookmarkBtn.getAttribute('data-bookmark-id');
    const bookmarkTitle = 'Chandela Dynasty';
    const bookmarkThumbnail = '../assets/chandela_khajuraho_banner.svg';

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
      Journey.toggle({
        id: bookmarkId,
        title: bookmarkTitle,
        thumbnail: bookmarkThumbnail,
        category: 'history'
      });
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
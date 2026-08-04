// ===== Motupalli Port Explorer — Page Script =====

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Gallery Modal ----------
  const modal = document.getElementById('motupalli-modal');
  const modalClose = document.getElementById('motupalli-modal-close');
  const modalTitle = document.getElementById('motupalli-modal-title');
  const modalCategory = document.getElementById('motupalli-modal-category');
  const modalHeading = document.getElementById('motupalli-modal-heading');
  const modalDescription = document.getElementById('motupalli-modal-description');
  const galleryItems = document.querySelectorAll('.motupalli-gallery-item');

  function openModal(item) {
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';

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

  // ---------- Bookmark Button ----------
  const bookmarkBtn = document.querySelector('.journey-bookmark-btn[data-bookmark-id="motupalli-port-main"]');

  if (bookmarkBtn) {
    const bookmarkId = bookmarkBtn.getAttribute('data-bookmark-id');
    const storageKey = 'journey-bookmarks';

    function getBookmarks() {
      try {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
      } catch (e) {
        return [];
      }
    }

    function saveBookmarks(list) {
      localStorage.setItem(storageKey, JSON.stringify(list));
    }

    function refreshButtonState() {
      const bookmarks = getBookmarks();
      const isSaved = bookmarks.includes(bookmarkId);
      bookmarkBtn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
      bookmarkBtn.textContent = isSaved ? '♥ Saved to Journey' : '♡ Save to Journey';
    }

    bookmarkBtn.addEventListener('click', function () {
      let bookmarks = getBookmarks();
      if (bookmarks.includes(bookmarkId)) {
        bookmarks = bookmarks.filter(function (id) { return id !== bookmarkId; });
      } else {
        bookmarks.push(bookmarkId);
      }
      saveBookmarks(bookmarks);
      refreshButtonState();
    });

    refreshButtonState();
  }

  // ---------- Scroll to top button ----------
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
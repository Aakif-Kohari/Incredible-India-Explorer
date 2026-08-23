/**
 * Charminar Heritage Explorer Interactive Engine
 * Handles Journey bookmarking, lightbox modal, scroll-to-top, and keyboard navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Gallery Modal Lightbox
  const modal = document.getElementById('charminar-modal');
  const modalImg = document.getElementById('charminar-modal-img');
  const modalCaption = document.getElementById('charminar-modal-caption');
  const modalOverlay = document.getElementById('charminar-modal-overlay');
  const modalClose = document.getElementById('charminar-modal-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openModal(imgSrc, captionText) {
    if (!modal) return;
    modalImg.src = imgSrc;
    modalImg.alt = captionText;
    modalCaption.textContent = captionText;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || (item.querySelector('figcaption') ? item.querySelector('figcaption').textContent : '');
      if (img) openModal(img.src, caption);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption') || (item.querySelector('figcaption') ? item.querySelector('figcaption').textContent : '');
        if (img) openModal(img.src, caption);
      }
    });
  });

  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Journey Bookmark Integration
  const bookmarkBtn = document.querySelector('.journey-bookmark-btn');
  if (bookmarkBtn) {
    const bookmarkId = bookmarkBtn.getAttribute('data-bookmark-id') || 'charminar-monument-main';
    
    // Check saved state
    try {
      if (window.Journey && typeof window.Journey.has === 'function') {
        if (window.Journey.has(bookmarkId)) {
          bookmarkBtn.classList.add('bookmarked');
          bookmarkBtn.setAttribute('aria-pressed', 'true');
          bookmarkBtn.textContent = '♥ Saved to Journey';
        }
      }
    } catch(e) {}

    bookmarkBtn.addEventListener('click', () => {
      const isBookmarked = bookmarkBtn.classList.toggle('bookmarked');
      bookmarkBtn.setAttribute('aria-pressed', isBookmarked ? 'true' : 'false');
      bookmarkBtn.textContent = isBookmarked ? '♥ Saved to Journey' : '♡ Save to Journey';

      try {
        if (window.Journey && typeof window.Journey.toggle === 'function') {
          window.Journey.toggle({
            id: bookmarkId,
            title: 'Charminar Heritage Landmark',
            category: 'Heritage & Monuments',
            url: window.location.pathname
          });
        }
      } catch(e) {}
    });
  }

  // Scroll To Top
  const scrollBtn = document.getElementById('btn-scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        scrollBtn.style.display = 'block';
      } else {
        scrollBtn.style.display = 'none';
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

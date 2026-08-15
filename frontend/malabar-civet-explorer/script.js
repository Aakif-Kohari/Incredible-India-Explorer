/**
 * Malabar Civet Explorer Script
 */

document.addEventListener('DOMContentLoaded', function () {
  initGalleryLightbox();
  initSmoothScroll();
});

function initGalleryLightbox() {
  const modal = document.getElementById('gallery-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const captionText = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!modal || !modalImg || !captionText) return;

  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || item.querySelector('.gallery-caption')?.textContent || '';

      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || caption;
        captionText.textContent = caption;
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }
}

function initSmoothScroll() {
  const tocLinks = document.querySelectorAll('.toc-nav a');
  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initGalleryLightbox,
    initSmoothScroll
  };
}

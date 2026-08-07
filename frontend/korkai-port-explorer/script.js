/**
 * Korkai Ancient Port Explorer JavaScript
 * Handles interactive gallery modal overlays, theme switching, and bookmark integration.
 */

(function () {
  'use strict';

  function init() {
    setupGalleryModal();
    setupThemeToggle();
  }

  function setupGalleryModal() {
    const modal = document.getElementById('kor-modal');
    const modalClose = document.getElementById('kor-modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalHeading = document.getElementById('modal-heading');
    const modalDesc = document.getElementById('modal-description');
    const galleryItems = document.querySelectorAll('.kor-gallery-item');

    if (!modal || !galleryItems.length) return;

    galleryItems.forEach(item => {
      item.addEventListener('click', function () {
        const title = this.getAttribute('data-title') || '';
        const desc = this.getAttribute('data-desc') || '';
        const caption = this.querySelector('p') ? this.querySelector('p').textContent : 'Korkai Archaeological Artifact';

        if (modalTitle) modalTitle.textContent = title;
        if (modalHeading) modalHeading.textContent = caption;
        if (modalDesc) modalDesc.textContent = desc;

        modal.classList.add('open');
        document.body.classList.add('modal-open');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', function () {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
      });
    }

    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
      }
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
      }
    });
  }

  function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.KorkaiPortExplorer = {
    init
  };
})();
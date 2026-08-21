/**
 * Chhollywood Explorer - Interactive Logic
 * Handles modal popups for gallery items, smooth scrolling, and UI state management.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('chhollywood-modal');
  const modalClose = document.getElementById('chhollywood-modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalHeading = document.getElementById('modal-heading');
  const modalDescription = document.getElementById('modal-description');
  const galleryItems = document.querySelectorAll('.chhollywood-gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const subtitle = item.querySelector('p')?.textContent || '';

      if (modalTitle) modalTitle.textContent = title;
      if (modalHeading) modalHeading.textContent = subtitle;
      if (modalDescription) modalDescription.textContent = desc;

      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

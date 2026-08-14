/**
 * Bodo Cinema Explorer Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Gallery Modal Handler
  const modal = document.getElementById('bodo-modal');
  const modalClose = document.getElementById('bodo-modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalHeading = document.getElementById('modal-heading');
  const modalDescription = document.getElementById('modal-description');
  const galleryItems = document.querySelectorAll('.bodo-gallery-item');

  if (modal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        const overlayP = item.querySelector('.bodo-gallery-overlay p').textContent;

        modalTitle.textContent = title;
        modalHeading.textContent = overlayP;
        modalDescription.textContent = desc;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
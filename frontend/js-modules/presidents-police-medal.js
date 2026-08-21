/**
 * President's Police Medal Explorer JS
 * Handles interactivity, modal lightbox, category filtering, FAQ accordions, and share functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    initShareButton();
    initFaqAccordion();
    initCategoryTabs();
    initGalleryModal();
    initScrollToTop();
});

/**
 * Initialize Web Share API or Clipboard Fallback
 */
function initShareButton() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: "Explore the President's Police Medal - India's premier police honour for gallantry and distinguished service.",
                    url: window.location.href,
                }).catch((error) => console.log('Error sharing:', error));
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('Link copied to clipboard!');
                }).catch(() => {
                    alert('Link copied to clipboard!');
                });
            }
        });
    }
}

/**
 * Toast notification popup helper
 */
function showToast(message) {
    const existing = document.getElementById('ppm-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'ppm-toast';
    toast.className = 'ppm-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Interactive FAQ Accordion
 */
function initFaqAccordion() {
    const accButtons = document.querySelectorAll('.ppm-faq-btn');
    accButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel) {
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            }
        });
    });
}

/**
 * Category Tabs Toggle (PPMG Gallantry vs. PPMDS Distinguished Service)
 */
function initCategoryTabs() {
    const tabBtns = document.querySelectorAll('.ppm-cat-tab');
    const categoryPanels = document.querySelectorAll('.ppm-cat-panel');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.dataset.category;

            tabBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            categoryPanels.forEach((panel) => {
                if (targetCategory === 'all' || panel.dataset.category === targetCategory) {
                    panel.style.display = 'block';
                } else {
                    panel.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Image Gallery Lightbox Modal
 */
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.ppm-gallery-item');
    const modal = document.getElementById('ppm-modal');
    const modalImg = document.getElementById('ppm-modal-img');
    const modalTitle = document.getElementById('ppm-modal-title');
    const modalDesc = document.getElementById('ppm-modal-desc');
    const closeBtn = document.getElementById('ppm-modal-close');

    if (!modal || !galleryItems.length) return;

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || 'President\'s Police Medal';
            const desc = item.getAttribute('data-desc') || 'Official medal insignia & historical archives.';
            const imgSrc = item.getAttribute('data-img') || '';

            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = desc;
            if (modalImg) {
                if (imgSrc) {
                    modalImg.src = imgSrc;
                    modalImg.style.display = 'block';
                } else {
                    modalImg.style.display = 'none';
                }
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('btn-scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

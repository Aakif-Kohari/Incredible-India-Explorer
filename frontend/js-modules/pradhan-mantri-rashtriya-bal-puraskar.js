/**
 * Pradhan Mantri Rashtriya Bal Puraskar Explorer JS
 * Handles interactivity, category filtering, modal lightbox, and share functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    initShareButton();
    initFaqAccordion();
    initCategoryFilterTabs();
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
                    text: "Explore the Pradhan Mantri Rashtriya Bal Puraskar - India's highest civilian honour for children.",
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
    const existing = document.getElementById('pmrbp-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'pmrbp-toast';
    toast.className = 'pmrbp-toast';
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
    const accButtons = document.querySelectorAll('.pmrbp-faq-btn');
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
 * Category Filter Tabs (Innovation, Scholastic, Sports, Arts & Culture, Social Service, Bravery, All)
 */
function initCategoryFilterTabs() {
    const tabBtns = document.querySelectorAll('.pmrbp-category-tab');
    const cards = document.querySelectorAll('.pmrbp-winner-card, .pmrbp-cat-card');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            tabBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach((card) => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Gallery Lightbox Modal
 */
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.pmrbp-gallery-item');
    const modal = document.getElementById('pmrbp-modal');
    const modalImg = document.getElementById('pmrbp-modal-img');
    const modalTitle = document.getElementById('pmrbp-modal-title');
    const modalDesc = document.getElementById('pmrbp-modal-desc');
    const closeBtn = document.getElementById('pmrbp-modal-close');

    if (!modal || !galleryItems.length) return;

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || 'Pradhan Mantri Rashtriya Bal Puraskar';
            const desc = item.getAttribute('data-desc') || 'Child Achievers National Awards Archives.';
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

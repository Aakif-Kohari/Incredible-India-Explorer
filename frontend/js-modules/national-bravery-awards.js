/**
 * National Bravery Awards Explorer JS
 * Handles interactivity, category filtering, modal lightbox, and share functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    initShareButton();
    initFaqAccordion();
    initSubCategoryFilterTabs();
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
                    text: 'Explore the National Bravery Awards - honoring extraordinary acts of courage by children across India.',
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
    const existing = document.getElementById('nba-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'nba-toast';
    toast.className = 'nba-toast';
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
    const accButtons = document.querySelectorAll('.nba-faq-btn');
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
 * Sub-Category Filter Tabs (Bharat, Sanjay Chopra, Geeta Chopra, Bapu Gaidhani, General, All)
 */
function initSubCategoryFilterTabs() {
    const tabBtns = document.querySelectorAll('.nba-category-tab');
    const cards = document.querySelectorAll('.nba-recipient-card, .nba-subcat-card');

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
    const galleryItems = document.querySelectorAll('.nba-gallery-item');
    const modal = document.getElementById('nba-modal');
    const modalImg = document.getElementById('nba-modal-img');
    const modalTitle = document.getElementById('nba-modal-title');
    const modalDesc = document.getElementById('nba-modal-desc');
    const closeBtn = document.getElementById('nba-modal-close');

    if (!modal || !galleryItems.length) return;

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || 'National Bravery Awards';
            const desc = item.getAttribute('data-desc') || 'Child Heroes Archives & Historic Ceremonies.';
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

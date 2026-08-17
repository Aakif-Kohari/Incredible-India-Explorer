/* ==========================================================================
   Bibi Ka Maqbara Explorer - JavaScript
   Handles scroll animations, navigation, gallery interactions, and bookmark functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSectionNavigation();
    initGalleryInteractions();
    initBookmarkFunctionality();
    initParallaxEffect();
});

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/* ==========================================================================
   Section Navigation
   ========================================================================== */
function initSectionNavigation() {
    const sectionNav = document.getElementById('bibi-section-nav');
    const navLinks = document.querySelectorAll('.bibi-section-nav-link');
    const sections = document.querySelectorAll('.bibi-section[id]');

    // Update active nav link on scroll
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-nav-target') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-nav-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

/* ==========================================================================
   Gallery Interactions
   ========================================================================== */
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.bibi-gallery-item');
    
    galleryItems.forEach(item => {
        const image = item.querySelector('.bibi-gallery-image');
        
        image.addEventListener('click', function() {
            const caption = this.querySelector('.bibi-gallery-caption');
            const title = caption.querySelector('h4').textContent;
            const description = caption.querySelector('p').textContent;
            
            // Create modal for larger view
            createImageModal(this.style.backgroundImage, title, description);
        });
    });
}

function createImageModal(backgroundImage, title, description) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.bibi-gallery-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'bibi-gallery-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Image viewer');
    modal.innerHTML = `
        <div class="bibi-modal-backdrop"></div>
        <div class="bibi-modal-content">
            <button class="bibi-modal-close" aria-label="Close modal">×</button>
            <div class="bibi-modal-image" style="background-image: ${backgroundImage}"></div>
            <div class="bibi-modal-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;

    // Add styles
    const styles = `
        .bibi-gallery-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: bibi-modalFadeIn 0.3s ease;
        }
        
        @keyframes bibi-modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .bibi-modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 20, 25, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .bibi-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: var(--bibi-glass);
            border: 1px solid var(--bibi-border);
            border-radius: 16px;
            overflow: hidden;
            backdrop-filter: blur(12px);
            animation: bibi-modalSlideIn 0.3s ease;
        }
        
        @keyframes bibi-modalSlideIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .bibi-modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .bibi-modal-close:hover {
            background: rgba(255, 153, 51, 0.2);
            border-color: var(--bibi-saffron);
        }
        
        .bibi-modal-image {
            width: 100%;
            max-width: 800px;
            max-height: 60vh;
            background-size: cover;
            background-position: center;
        }
        
        .bibi-modal-info {
            padding: 24px;
        }
        
        .bibi-modal-info h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .bibi-modal-info p {
            color: rgba(241, 245, 249, 0.8);
            line-height: 1.6;
            margin: 0;
        }
    `;

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Add modal to body
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.bibi-modal-close');
    const backdrop = modal.querySelector('.bibi-modal-backdrop');

    function closeModal() {
        modal.style.animation = 'bibi-modalFadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
            styleSheet.remove();
        }, 300);
    }

    // Add fade out animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes bibi-modalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/* ==========================================================================
   Bookmark Functionality
   ========================================================================== */
function initBookmarkFunctionality() {
    const bookmarkBtns = document.querySelectorAll('.journey-bookmark-btn');
    
    bookmarkBtns.forEach(btn => {
        const bookmarkId = btn.getAttribute('data-bookmark-id');
        
        // Check if already bookmarked
        const savedBookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
        if (savedBookmarks.includes(bookmarkId)) {
            btn.setAttribute('aria-pressed', 'true');
            btn.innerHTML = '♥ Saved to Journey';
        }
        
        btn.addEventListener('click', function() {
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            const savedBookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
            
            if (isPressed) {
                // Remove bookmark
                const index = savedBookmarks.indexOf(bookmarkId);
                if (index > -1) {
                    savedBookmarks.splice(index, 1);
                }
                this.setAttribute('aria-pressed', 'false');
                this.innerHTML = '♡ Save to Journey';
            } else {
                // Add bookmark
                savedBookmarks.push(bookmarkId);
                this.setAttribute('aria-pressed', 'true');
                this.innerHTML = '♥ Saved to Journey';
                
                // Show success message
                showNotification('Added to your journey!');
            }
            
            localStorage.setItem('journeyBookmarks', JSON.stringify(savedBookmarks));
        });
    });
}

function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.bibi-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'bibi-notification';
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    // Add styles
    const styles = `
        .bibi-notification {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: linear-gradient(135deg, var(--bibi-saffron), var(--bibi-gold));
            color: var(--bibi-night);
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            animation: bibi-notificationSlide 0.3s ease;
            box-shadow: 0 4px 20px rgba(255, 153, 51, 0.3);
        }
        
        @keyframes bibi-notificationSlide {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'bibi-notificationFade 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
            styleSheet.remove();
        }, 300);
    }, 3000);

    // Add fade animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes bibi-notificationFade {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeStyle);
}

/* ==========================================================================
   Parallax Effect for Hero
   ========================================================================== */
function initParallaxEffect() {
    const heroBackdrop = document.querySelector('.bibi-hero-backdrop');
    
    if (heroBackdrop) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < 800) {
                heroBackdrop.style.transform = `scale(1.12) translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}

/* ==========================================================================
   Accessibility Enhancements
   ========================================================================== */

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable parallax for users who prefer reduced motion
    const heroBackdrop = document.querySelector('.bibi-hero-backdrop');
    if (heroBackdrop) {
        window.removeEventListener('scroll', initParallaxEffect);
    }
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Handle Escape key to close any open modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.bibi-gallery-modal');
        if (modal) {
            modal.remove();
        }
    }
});

// Focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/* ==========================================================================
   Performance Optimization
   ========================================================================== */

// Lazy load images when they come into viewport
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();
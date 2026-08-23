/* ==========================================================================
   City Palace Udaipur Explorer - JavaScript
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
    const sectionNav = document.getElementById('udaipur-section-nav');
    const navLinks = document.querySelectorAll('.udaipur-section-nav-link');
    const sections = document.querySelectorAll('.udaipur-section[id]');

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
    const galleryItems = document.querySelectorAll('.udaipur-gallery-item');
    
    galleryItems.forEach(item => {
        const image = item.querySelector('.udaipur-gallery-image');
        
        image.addEventListener('click', function() {
            const caption = this.querySelector('.udaipur-gallery-caption');
            const title = caption.querySelector('h4').textContent;
            const description = caption.querySelector('p').textContent;
            const source = caption.querySelector('small').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                overflow: auto;
                background: #1a2332;
                border-radius: 12px;
                padding: 30px;
                position: relative;
            `;
            
            const modalImage = document.createElement('div');
            modalImage.style.cssText = `
                width: 100%;
                height: 400px;
                background-size: cover;
                background-position: center;
                border-radius: 8px;
                margin-bottom: 20px;
                background-image: ${this.style.backgroundImage};
            `;
            
            const modalTitle = document.createElement('h3');
            modalTitle.textContent = title;
            modalTitle.style.cssText = `
                font-family: 'Playfair Display', serif;
                font-size: 1.5rem;
                color: #f5f5f0;
                margin-bottom: 10px;
            `;
            
            const modalDescription = document.createElement('p');
            modalDescription.textContent = description;
            modalDescription.style.cssText = `
                color: #cbd5e1;
                line-height: 1.6;
                margin-bottom: 8px;
            `;
            
            const modalSource = document.createElement('small');
            modalSource.textContent = source;
            modalSource.style.cssText = `
                color: #64748b;
                display: block;
                margin-bottom: 20px;
            `;
            
            const closeButton = document.createElement('button');
            closeButton.textContent = '×';
            closeButton.style.cssText = `
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 2rem;
                background: none;
                border: none;
                color: #f5f5f0;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            `;
            
            closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modalContent.appendChild(closeButton);
            modalContent.appendChild(modalImage);
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalDescription);
            modalContent.appendChild(modalSource);
            modal.appendChild(modalContent);
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
            
            document.body.appendChild(modal);
        });
    });
}

/* ==========================================================================
   Bookmark Functionality
   ========================================================================== */
function initBookmarkFunctionality() {
    const bookmarkButtons = document.querySelectorAll('.journey-bookmark-btn');
    
    bookmarkButtons.forEach(button => {
        const bookmarkId = button.getAttribute('data-bookmark-id');
        
        // Check if already bookmarked
        const savedBookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
        if (savedBookmarks.includes(bookmarkId)) {
            button.setAttribute('aria-pressed', 'true');
            button.innerHTML = '♥ Saved to Journey';
        }
        
        button.addEventListener('click', function() {
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
            }
            
            localStorage.setItem('journeyBookmarks', JSON.stringify(savedBookmarks));
        });
    });
}

/* ==========================================================================
   Parallax Effect for Hero
   ========================================================================== */
function initParallaxEffect() {
    const heroBackdrop = document.querySelector('.udaipur-hero-backdrop');
    
    if (heroBackdrop) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                heroBackdrop.style.transform = `scale(1.12) translateY(${rate}px)`;
            }
        });
    }
}

/* ==========================================================================
   Add fadeIn animation
   ========================================================================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
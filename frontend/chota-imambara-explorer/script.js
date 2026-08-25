/* ==========================================================================
   Chota Imambara Explorer - JavaScript
   Handles scroll animations, navigation, gallery interactions, and bookmark functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSectionNavigation();
    initGalleryInteractions();
    initParallaxEffect();
});

document.addEventListener('app:route-changed', function() {
    // Re-initialize functionality when route changes
    initScrollAnimations();
    initSectionNavigation();
    initGalleryInteractions();
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
    const sectionNav = document.getElementById('chota-section-nav');
    const navLinks = document.querySelectorAll('.chota-section-nav-link');
    const sections = document.querySelectorAll('.chota-section[id]');

    // Update active nav link on scroll
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const sectionNavHeight = sectionNav ? sectionNav.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight - sectionNavHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hide/show section nav on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (sectionNav) {
            if (currentScroll > lastScroll && currentScroll > 500) {
                sectionNav.style.transform = 'translateY(-100%)';
            } else {
                sectionNav.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
        updateActiveNav();
    });
}

/* ==========================================================================
   Gallery Interactions
   ========================================================================== */
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.chota-gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.chota-gallery-caption');
            
            if (img) {
                createLightbox(img.src, caption);
            }
        });
    });
}

function createLightbox(imageSrc, caption) {
    // Remove existing lightbox if any
    const existingLightbox = document.querySelector('.chota-lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'chota-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Image gallery lightbox');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'chota-lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = imageSrc;
    lightboxImg.alt = caption ? caption.querySelector('h4').textContent : 'Gallery image';
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'chota-lightbox-caption';
    
    if (caption) {
        const title = caption.querySelector('h4');
        const description = caption.querySelector('p');
        const source = caption.querySelector('small');
        
        if (title) {
            const titleElement = document.createElement('h4');
            titleElement.textContent = title.textContent;
            lightboxCaption.appendChild(titleElement);
        }
        
        if (description) {
            const descElement = document.createElement('p');
            descElement.textContent = description.textContent;
            lightboxCaption.appendChild(descElement);
        }
        
        if (source) {
            const sourceElement = document.createElement('small');
            sourceElement.textContent = source.textContent;
            lightboxCaption.appendChild(sourceElement);
        }
    }
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'chota-lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.innerHTML = '✕';
    
    // Assemble lightbox
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(lightboxCaption);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.classList.add('chota-lightbox-closing');
        setTimeout(() => lightbox.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Allow body scroll when closed
    lightbox.addEventListener('transitionend', () => {
        if (!lightbox.classList.contains('chota-lightbox-closing')) {
            document.body.style.overflow = '';
        }
    });
}

/* ==========================================================================
   Parallax Effect for Hero Section
   ========================================================================== */
function initParallaxEffect() {
    const heroSection = document.getElementById('hero');
    const heroImage = document.querySelector('.chota-hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            
            if (scrolled < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

/* ==========================================================================
   Additional Utility Functions
   ========================================================================== */

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('chota-image-loaded');
    });
    
    img.addEventListener('error', function() {
        this.classList.add('chota-image-error');
    });
});

// Accessibility: Handle keyboard navigation for gallery
document.querySelectorAll('.chota-gallery-item').forEach((item, index) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View gallery image ${index + 1}`);
    
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-heavy operations here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);
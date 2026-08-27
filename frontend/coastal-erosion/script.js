// Coastal Erosion Main Script

/**
 * Initialize the coastal erosion profile page
 */
function initCoastalErosionProfile() {
    console.log('Initializing Coastal Erosion Profile...');

    // Render all components
    renderAllComponents();

    // Setup event handlers
    setupEventHandlers();

    // Setup scroll animations
    setupScrollAnimations();

    // Setup theme toggle
    setupThemeToggle();

    // Setup navigation
    setupNavigation();

    console.log('Coastal Erosion Profile initialized successfully');
}

/**
 * Render all page components
 */
function renderAllComponents() {
    // Render region cards
    renderRegionCards(erosionData.regions, 'regions-grid');

    // Render map markers
    renderMapMarkers(erosionData.regions, 'map-markers');

    // Render India outline
    renderIndiaOutline('india-outline');

    // Render case studies
    renderCaseStudies(erosionData.caseStudies, 'case-studies');
}

/**
 * Setup all event handlers
 */
function setupEventHandlers() {
    // Setup modal handlers
    setupModalHandlers();

    // Setup map filter controls
    setupMapFilters();

    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offset = 100; // Account for sticky nav
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

/**
 * Setup scroll-based animations
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content cards and sections
    const animatedElements = document.querySelectorAll('.content-card, .region-card, .strategy-card, .stat-card, .case-study-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Setup theme toggle functionality
 */
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

/**
 * Setup mobile navigation toggle
 */
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);

        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Listen for scroll events to update active nav link
window.addEventListener('scroll', updateActiveNavLink);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoastalErosionProfile);
} else {
    initCoastalErosionProfile();
}

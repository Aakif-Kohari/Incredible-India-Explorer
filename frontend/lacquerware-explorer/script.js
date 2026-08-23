/**
 * script.js
 * Indian Lacquerware Explorer Logic - Expanded & Enhanced
 */

(function () {
  'use strict';

  // ==========================================================================
  // DATASETS
  // ==========================================================================

  const GALLERY_ITEMS = [
    { id: 1, region: 'channapatna', name: 'Traditional Wooden Elephant', desc: 'Hand-turned and lacquered using natural vegetable dyes.', icon: '🐘' },
    { id: 2, region: 'channapatna', name: 'Stacking Rings Toy', desc: 'Classic child-safe toy, GI tagged and eco-friendly.', icon: '💍' },
    { id: 3, region: 'etikoppaka', name: 'Etikoppaka Spinning Top', desc: 'Crafted with 100% natural plant-based dyes from the Varaha river region.', icon: '🌀' },
    { id: 4, region: 'etikoppaka', name: 'Decorative Lac Box', desc: 'Intricate multi-coloured patterns using traditional Tharani techniques.', icon: '📦' },
    { id: 5, region: 'nirmal', name: 'Gold-Leaf Decorative Figure', desc: 'Softwood carving finished with lac and delicate gold-leaf detailing.', icon: '👑' },
    { id: 6, region: 'jaipur', name: 'Meenakari Lac Bangles', desc: 'Encrusted with mirrors and stones, traditionally worn by brides.', icon: '💎' },
    { id: 7, region: 'jaipur', name: 'Bridal Lac Set', desc: 'Deep red lac bangles symbolizing auspiciousness and marital bliss.', icon: '🔴' },
    { id: 8, region: 'nirmal', name: 'Poniki Wood Bowl', desc: 'Lacquered bowl showcasing the unique grain of local softwood.', icon: '🥣' }
  ];

  // ==========================================================================
  // DOM ELEMENTS
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn?.querySelector('.theme-icon');
    
    // Navigation
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Scroll Utilities
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Gallery
    const galleryGrid = document.getElementById('lac-gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Region Tabs
    const regionTabs = document.querySelectorAll('.region-tab-btn');
    const regionPanels = document.querySelectorAll('.region-panel');
    
    // Modal
    const modal = document.getElementById('lac-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    
    // Bookmarks
    const bookmarkBtns = document.querySelectorAll('.journey-bookmark-btn');

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    renderGallery('all');
    setupThemeToggle();
    setupScrollAnimations();
    setupCounters();
    setupRegionTabs();
    setupGalleryFilters();
    setupModal();
    setupBookmarks();
    setupMobileMenu();
    setupBackToTop();
    setupProcessCards();

    // ==========================================================================
    // FUNCTIONS
    // ==========================================================================

    function setupThemeToggle() {
      if (!themeToggleBtn) return;
      
      const updateIcon = (isLight) => {
        if (themeIcon) themeIcon.textContent = isLight ? '🌙' : '☀️';
      };

      const isLight = document.documentElement.classList.contains('light-theme');
      updateIcon(isLight);

      themeToggleBtn.addEventListener('click', function () {
        document.documentElement.classList.toggle('light-theme');
        const newIsLight = document.documentElement.classList.contains('light-theme');
        localStorage.setItem('theme', newIsLight ? 'light' : 'dark');
        updateIcon(newIsLight);
      });
    }

    function setupScrollAnimations() {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
      });
    }

    function setupCounters() {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'), 10);
            animateCounter(target, countTo);
            counterObserver.unobserve(target);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('.stat-num').forEach(counter => {
        counterObserver.observe(counter);
      });
    }

    function animateCounter(element, target) {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + (target === 100 ? '%' : '+');
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 30);
    }

    function setupRegionTabs() {
      regionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active state from all
          regionTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          regionPanels.forEach(p => p.classList.remove('active'));

          // Add active state to clicked
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          const targetId = 'panel-' + tab.getAttribute('data-region');
          document.getElementById(targetId).classList.add('active');
        });
      });
    }

    function renderGallery(filter) {
      if (!galleryGrid) return;
      galleryGrid.innerHTML = '';

      const filteredItems = filter === 'all' 
        ? GALLERY_ITEMS 
        : GALLERY_ITEMS.filter(item => item.region === filter);

      filteredItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item fade-in-up';
        div.style.animationDelay = `${index * 0.1}s`;
        div.innerHTML = `
          <div class="gallery-img">${item.icon}</div>
          <div class="gallery-info">
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
            <span class="gallery-tag">${item.region.charAt(0).toUpperCase() + item.region.slice(1)}</span>
          </div>
        `;
        div.addEventListener('click', () => openModal(item));
        galleryGrid.appendChild(div);
        
        // Trigger animation
        setTimeout(() => div.classList.add('is-visible'), 50 + (index * 100));
      });
    }

    function setupGalleryFilters() {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderGallery(btn.getAttribute('data-filter'));
        });
      });
    }

    function setupModal() {
      if (!modal || !modalClose) return;

      window.openModal = function(item) {
        modalBody.innerHTML = `
          <div style="text-align:center; font-size:4rem; margin-bottom:20px;">${item.icon}</div>
          <h2 id="modal-title" style="margin-bottom:8px;">${item.name}</h2>
          <span class="gallery-tag" style="margin-bottom:20px; display:inline-block;">${item.region.charAt(0).toUpperCase() + item.region.slice(1)}</span>
          <p style="color:var(--text-muted); line-height:1.7;">${item.desc}</p>
          <p style="color:var(--text-muted); line-height:1.7; margin-top:16px;">This piece represents the centuries-old tradition of lac-turnery, crafted by skilled artisans using sustainable, natural materials. Each item is unique, bearing the subtle marks of handcraftsmanship.</p>
        `;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        modalClose.focus();
      };

      const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      };

      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });
    }

    function setupBookmarks() {
      bookmarkBtns.forEach(btn => {
        const id = btn.getAttribute('data-bookmark-id');
        const isBookmarked = localStorage.getItem(`bookmark_${id}`) === 'true';
        
        if (isBookmarked) {
          btn.classList.add('bookmarked');
          btn.setAttribute('aria-pressed', 'true');
          btn.innerHTML = '✅ Saved to Journey';
        }

        btn.addEventListener('click', () => {
          const currentState = btn.getAttribute('aria-pressed') === 'true';
          const newState = !currentState;
          
          btn.setAttribute('aria-pressed', newState);
          localStorage.setItem(`bookmark_${id}`, newState);
          
          if (newState) {
            btn.classList.add('bookmarked');
            btn.innerHTML = '✅ Saved to Journey';
          } else {
            btn.classList.remove('bookmarked');
            btn.innerHTML = '🔖 Save to Journey';
          }
        });
      });
    }

    function setupMobileMenu() {
      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
          const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', !isExpanded);
          navMenu.classList.toggle('active');
        });
      }
    }

    function setupBackToTop() {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTopBtn?.classList.add('visible');
        } else {
          backToTopBtn?.classList.remove('visible');
        }
      });

      backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    function setupProcessCards() {
      const cards = document.querySelectorAll('.process-card');
      cards.forEach(card => {
        const activate = () => {
          cards.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
          });
          card.classList.add('active');
          card.setAttribute('aria-pressed', 'true');
        };
        card.addEventListener('click', activate);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
          }
        });
      });
      
      // Activate first card by default
      if (cards.length > 0) {
        cards[0].classList.add('active');
        cards[0].setAttribute('aria-pressed', 'true');
      }
    }
  });
})();
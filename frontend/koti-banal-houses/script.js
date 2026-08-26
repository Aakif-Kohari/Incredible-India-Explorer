/**
 * Koti Banal Architecture Explorer - Main JavaScript
 * Handles cutaway interactions, theme toggling, bookmarks, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCutawayDiagram();
  initBookmarkSystem();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * 1. Theme Toggle System
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check local storage for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggleBtn.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    
    themeToggleBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/**
 * 2. Interactive Cutaway Diagram
 */
function initCutawayDiagram() {
  const layers = document.querySelectorAll('.cutaway-layer');
  const infoTitle = document.getElementById('info-title');
  const infoDesc = document.getElementById('info-desc');
  const infoPanel = document.getElementById('info-panel');

  // Data dictionary for each structural part
  const cutawayData = {
    plinth: {
      title: "🪨 Massive Stone Plinth",
      desc: "Acts as a solid, broad anchor. It is not rigidly fixed to the ground, allowing the structure to slide slightly during high-magnitude tremors, acting as a primitive base isolator."
    },
    frame: {
      title: "🪵 Timber Frame Cage",
      desc: "The skeleton of the house. Wooden beams are interlocked using traditional joinery (no iron nails). This allows the joints to rotate, flex, and absorb kinetic energy without snapping."
    },
    infill: {
      title: "🧱 Dry Stone Infill",
      desc: "Loose stones packed inside the timber cage. During an earthquake, these stones rub against the wood. This friction dissipates massive amounts of seismic energy, protecting the main structure."
    },
    roof: {
      title: "🏠 Heavy Slate Roof",
      desc: "Provides a low center of gravity. The weight presses down on the timber frame, increasing friction at the joints and stabilizing the structure during lateral shaking."
    }
  };

  layers.forEach(layer => {
    // Mouse click interaction
    layer.addEventListener('click', () => {
      activateLayer(layer);
    });

    // Keyboard accessibility (Enter or Space)
    layer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateLayer(layer);
      }
    });
  });

  function activateLayer(layer) {
    // Remove active class from all layers
    layers.forEach(l => l.classList.remove('active'));
    
    // Add active class to clicked layer
    layer.classList.add('active');
    
    // Get data
    const part = layer.dataset.part;
    const data = cutawayData[part];
    
    // Update info panel with a subtle fade animation
    infoPanel.style.opacity = '0';
    setTimeout(() => {
      infoTitle.textContent = data.title;
      infoDesc.textContent = data.desc;
      infoPanel.style.opacity = '1';
    }, 200);
  }
}

/**
 * 3. Bookmark System (Journey Integration)
 */
function initBookmarkSystem() {
  const bookmarkBtn = document.getElementById('bookmark-btn');
  const pageId = 'koti-banal-architecture';
  
  // Load state
  const bookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
  const isSaved = bookmarks.some(b => b.id === pageId);
  
  if (isSaved) {
    setBookmarkSavedState(bookmarkBtn);
  }

  bookmarkBtn.addEventListener('click', () => {
    const currentBookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
    const isCurrentlySaved = currentBookmarks.some(b => b.id === pageId);

    if (isCurrentlySaved) {
      // Remove
      const updated = currentBookmarks.filter(b => b.id !== pageId);
      localStorage.setItem('journeyBookmarks', JSON.stringify(updated));
      setBookmarkDefaultState(bookmarkBtn);
      showNotification('Removed from your Journey', 'info');
    } else {
      // Add
      const newBookmark = {
        id: pageId,
        title: 'Koti Banal Architecture',
        category: 'Traditional Houses',
        location: 'Uttarkashi, Uttarakhand',
        savedAt: new Date().toISOString()
      };
      currentBookmarks.push(newBookmark);
      localStorage.setItem('journeyBookmarks', JSON.stringify(currentBookmarks));
      setBookmarkSavedState(bookmarkBtn);
      showNotification('Added to your Journey!', 'success');
    }
  });

  function setBookmarkSavedState(btn) {
    btn.textContent = '✅ Saved to My Journey';
    btn.classList.add('saved');
  }

  function setBookmarkDefaultState(btn) {
    btn.textContent = '🔖 Bookmark to My Journey';
    btn.classList.remove('saved');
  }
}

/**
 * 4. Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Observe hero content, cards, and lists
  const elementsToAnimate = document.querySelectorAll(
    '.animate-on-scroll, .seismic-card, .material-list li, .gallery-item'
  );
  
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
}

/**
 * 5. Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Utility: Toast Notification
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  const bgColor = type === 'success' ? '#10b981' : '#3b82f6';
  
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: ${bgColor};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    font-weight: 600;
    z-index: 10000;
    animation: slideUp 0.4s ease forwards;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.4s ease forwards';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// Add notification keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100px); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log('🏔️ Koti Banal Explorer initialized successfully!');
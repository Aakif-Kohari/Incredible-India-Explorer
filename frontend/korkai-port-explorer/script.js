/**
 * Korkai Ancient Port Explorer - Main JavaScript
 * Handles interactivity, modals, bookmarks, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initScrollToTop();
  initModal();
  initGallery();
  initBookmarks();
  initAnimations();
  initSmoothScroll();
});

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Modal System
 */
function initModal() {
  const modal = document.getElementById('kor-modal');
  const closeBtn = document.getElementById('kor-modal-close');
  
  if (!modal || !closeBtn) return;
  
  // Close button click
  closeBtn.addEventListener('click', () => {
    closeModal(modal);
  });
  
  // Click outside modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
  
  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal);
    }
  });
}

function openModal(modal, data) {
  const title = document.getElementById('modal-title');
  const heading = document.getElementById('modal-heading');
  const description = document.getElementById('modal-description');
  const category = document.getElementById('modal-category');
  
  if (title && data.title) title.textContent = data.title;
  if (heading && data.heading) heading.textContent = data.heading;
  if (description && data.description) description.textContent = data.description;
  if (category && data.category) category.textContent = data.category;
  
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Gallery Lightbox
 */
function initGallery() {
  const galleryItems = document.querySelectorAll('.kor-gallery-item');
  const modal = document.getElementById('kor-modal');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.dataset.title || '';
      const desc = item.dataset.desc || '';
      
      const data = {
        category: 'Korkai Gallery',
        title: title,
        heading: '',
        description: desc
      };
      
      if (modal) {
        openModal(modal, data);
      }
    });
  });
}

/**
 * Bookmark System
 */
function initBookmarks() {
  const bookmarkBtn = document.querySelector('.journey-bookmark-btn');
  
  if (!bookmarkBtn) return;
  
  const bookmarkId = bookmarkBtn.dataset.bookmarkId;
  
  // Load saved bookmark state
  loadBookmarkState(bookmarkBtn, bookmarkId);
  
  // Toggle bookmark
  bookmarkBtn.addEventListener('click', async () => {
    const isPressed = bookmarkBtn.getAttribute('aria-pressed') === 'true';
    
    if (isPressed) {
      // Remove bookmark
      await removeBookmark(bookmarkId);
      bookmarkBtn.setAttribute('aria-pressed', 'false');
      bookmarkBtn.innerHTML = '♡ Save to Journey';
      bookmarkBtn.classList.remove('bookmarked');
    } else {
      // Add bookmark
      const bookmarkData = {
        id: bookmarkId,
        title: 'Korkai Ancient Port',
        type: 'port',
        location: 'Thoothukudi, Tamil Nadu',
        description: 'The pearl capital of the Pandya Kingdom',
        image: '../assets/korkai_pearl.png',
        savedAt: new Date().toISOString()
      };
      
      await addBookmark(bookmarkData);
      bookmarkBtn.setAttribute('aria-pressed', 'true');
      bookmarkBtn.innerHTML = '♥ Saved to Journey';
      bookmarkBtn.classList.add('bookmarked');
      
      // Show success message
      showNotification('Added to your Journey!', 'success');
    }
  });
}

function loadBookmarkState(btn, bookmarkId) {
  try {
    const bookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
    const isBookmarked = bookmarks.some(b => b.id === bookmarkId);
    
    if (isBookmarked) {
      btn.setAttribute('aria-pressed', 'true');
      btn.innerHTML = '♥ Saved to Journey';
      btn.classList.add('bookmarked');
    }
  } catch (error) {
    console.error('Error loading bookmark state:', error);
  }
}

async function addBookmark(data) {
  try {
    const bookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
    
    // Check if already exists
    if (!bookmarks.some(b => b.id === data.id)) {
      bookmarks.push(data);
      localStorage.setItem('journeyBookmarks', JSON.stringify(bookmarks));
      
      // If Firebase is available, sync to cloud
      if (window.saveBookmarkToFirebase) {
        await window.saveBookmarkToFirebase(data);
      }
    }
  } catch (error) {
    console.error('Error adding bookmark:', error);
    showNotification('Failed to save bookmark', 'error');
  }
}

async function removeBookmark(bookmarkId) {
  try {
    let bookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
    bookmarks = bookmarks.filter(b => b.id !== bookmarkId);
    localStorage.setItem('journeyBookmarks', JSON.stringify(bookmarks));
    
    // If Firebase is available, sync to cloud
    if (window.removeBookmarkFromFirebase) {
      await window.removeBookmarkFromFirebase(bookmarkId);
    }
    
    showNotification('Removed from Journey', 'info');
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

/**
 * Scroll Animations (Intersection Observer)
 */
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards, timeline steps, and gallery items
  const animatedElements = document.querySelectorAll('.kor-card, .timeline-step, .kor-gallery-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add animate-in styles
  const animateStyle = document.createElement('style');
  animateStyle.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(animateStyle);
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/**
 * Utility: Debounce Function
 */
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

/**
 * Utility: Format Date
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

/**
 * Export functions for global access
 */
window.KorkaiExplorer = {
  openModal,
  closeModal,
  addBookmark,
  removeBookmark,
  showNotification,
  debounce,
  formatDate
};

console.log('🦪 Korkai Ancient Port Explorer initialized successfully!');
/**
 * Tanjore Painting Showcase Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavTabs();
  initBookmark();
});

function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
    });
  }
}

function initNavTabs() {
  const tabs = document.querySelectorAll('.tanjore-tab-link');
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.tanjore-section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${current}`) {
        tab.classList.add('active');
      }
    });
  });
}

function initBookmark() {
  const bookmarkBtn = document.querySelector('.tanjore-bookmark-btn');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      const isBookmarked = bookmarkBtn.getAttribute('aria-pressed') === 'true';
      bookmarkBtn.setAttribute('aria-pressed', !isBookmarked);
      bookmarkBtn.innerHTML = !isBookmarked ? '♥ Saved in Journey' : '♡ Save to Journey';
      bookmarkBtn.style.background = !isBookmarked ? 'var(--tanjore-accent)' : 'transparent';
      bookmarkBtn.style.color = !isBookmarked ? '#0f172a' : 'var(--tanjore-accent)';
    });
  }
}

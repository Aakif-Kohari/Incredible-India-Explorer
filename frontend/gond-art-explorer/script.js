/**
 * Gond Art Explorer Script
 */

const patternData = {
  dots: {
    title: 'Bindi (Dots) Pattern',
    desc: 'Symbolizes life energy, stars, and seeds of creation. Used by Gond artists to create glowing texture across animal bodies.'
  },
  lines: {
    title: 'Rekha (Fine Lines) Pattern',
    desc: 'Represents flow, movement, and life currents. Parrallel lines give rhythm to trees, rivers, and bird feathers.'
  },
  waves: {
    title: 'Lahar (Wavy Curves) Pattern',
    desc: 'Inspired by flowing water streams and wind ripples across grass, bringing motion to nature storytelling.'
  },
  drops: {
    title: 'Beej (Seed Drops) Pattern',
    desc: 'Represents fertility, monsoon raindrops, and forest blossoms. Each droplet anchors sacred animal figures.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavTabs();
  initPatternVisualizer();
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
  const tabs = document.querySelectorAll('.gond-tab-link');
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.gond-section');
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

function initPatternVisualizer() {
  const btns = document.querySelectorAll('.pattern-btn');
  const preview = document.getElementById('pattern-preview');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const patternKey = btn.getAttribute('data-pattern');
      const data = patternData[patternKey];
      if (data && preview) {
        preview.innerHTML = `
          <h4>${data.title}</h4>
          <p>${data.desc}</p>
        `;
      }
    });
  });
}

function initBookmark() {
  const bookmarkBtn = document.querySelector('.gond-bookmark-btn');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      const isBookmarked = bookmarkBtn.getAttribute('aria-pressed') === 'true';
      bookmarkBtn.setAttribute('aria-pressed', !isBookmarked);
      bookmarkBtn.innerHTML = !isBookmarked ? '♥ Saved in Journey' : '♡ Save to Journey';
      bookmarkBtn.style.background = !isBookmarked ? 'var(--gond-accent)' : 'transparent';
      bookmarkBtn.style.color = !isBookmarked ? '#0f172a' : 'var(--gond-accent)';
    });
  }
}

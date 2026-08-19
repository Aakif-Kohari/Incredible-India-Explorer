document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('machili-theme');

  if (storedTheme === 'light') {
    body.classList.add('light-theme');
    if (toggle) toggle.textContent = '🌙';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-theme');
      localStorage.setItem('machili-theme', isLight ? 'light' : 'dark');
      toggle.textContent = isLight ? '🌙' : '☀️';
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
});

/**
 * Freedom Fighters of India - Hub Data & Interactions
 */

const freedomFightersData = [
  {
    name: "Gurbaksh Singh Dhillon",
    era: "20th Century",
    organization: "Indian National Army (INA)",
    region: "Punjab / Burma",
    activeYears: "1942 – 1946",
    image: "dhillon.jpg", // Make sure to save the image with this name
    description: "Prominent INA officer who commanded the Nehru Brigade in Burma. His trial at the Red Fort became a defining moment uniting India against British colonial rule.",
    link: "gurbaksh-dhillon.html"
  }
];

// Theme Toggle Script
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggle.textContent = isLight ? '🌙' : '☀️';
    });
    
    // Set initial icon
    const isCurrentlyLight = document.body.classList.contains('light-theme');
    toggle.textContent = isCurrentlyLight ? '🌙' : '☀️';
  }
});

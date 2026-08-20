const freedomFightersData = [
    {
    name: "Prem Kumar Sahgal",
    era: "20th Century",
    organization: "Indian National Army (INA)",
    region: "Punjab / Burma",
    activeYears: "1942 – 1946",
    image: "sahgal.jpg", 
    description: "Military Secretary to Subhas Chandra Bose and Commander of the 2nd Infantry Regiment. He was a central figure in the historic Red Fort Trials.",
    link: "prem-kumar-sahgal.html"
  }
];

// 2. Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  
  if (toggle) {
    // Set initial icon based on what the inline script in HTML decided
    const isCurrentlyLight = document.body.classList.contains('light-theme');
    toggle.textContent = isCurrentlyLight ? '🌙' : '☀️';

    // Listen for clicks
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggle.textContent = isLight ? '🌙' : '☀️';
    });
  }
});
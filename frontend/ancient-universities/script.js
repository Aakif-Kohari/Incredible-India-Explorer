// script.js - Ancient Universities Logic
// Encapsulated in IIFE to prevent global namespace pollution

(function () {
    'use strict';

    // --- Theme Logic ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }

        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
                themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
                themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
            }
        });
    }

    // --- Smooth Scroll with Offset Logic ---
    // The CSS 'scroll-margin-top' property on .university-article usually handles this, 
    // but we can add a fallback smooth scroll script to ensure it works beautifully everywhere.
    
    const localNavLinks = document.querySelectorAll('.local-nav a');
    
    localNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Check if local-nav is sticky and get its height for offset
                    const nav = document.querySelector('.local-nav');
                    const navHeight = nav ? nav.offsetHeight : 0;
                    
                    // The global navbar might also be sticky, we assume it's ~60px
                    const globalNavHeight = 60;
                    
                    const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - globalNavHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

})();

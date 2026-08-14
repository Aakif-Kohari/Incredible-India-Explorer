(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initTabs();
        initRecipientSearch();
        initScrollTop();
    });

    function initNavigation() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !expanded);
                navMenu.classList.toggle('active');
            });
        }
    }

    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const sections = document.querySelectorAll('.nsm-section');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                sections.forEach(sec => {
                    if (sec.getAttribute('data-tab') === targetTab || sec.id === targetTab) {
                        sec.classList.add('active');
                    } else {
                        sec.classList.remove('active');
                    }
                });
            });
        });
    }

    function initRecipientSearch() {
        const searchInput = document.getElementById('recipient-search');
        const tbody = document.getElementById('recipients-tbody');
        if (!searchInput || !tbody) return;

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const rows = tbody.querySelectorAll('tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    function initScrollTop() {
        const btn = document.getElementById('btn-scroll-top');
        if (btn) {
            btn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
})();

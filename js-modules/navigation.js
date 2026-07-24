function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const exploreDropdown = navMenu?.querySelector('.nav-dropdown .dropdown-menu');
    const currentPath = window.location.pathname;

    if (navbar && navbar.dataset.listenerBound) return;
    if (navbar) navbar.dataset.listenerBound = "true";

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (btnScrollTop) btnScrollTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            if (btnScrollTop) btnScrollTop.classList.remove('visible');
        }
    });

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="frontend/dance/dance.html"]')) {
        const danceLink = document.createElement('a');
        danceLink.href = 'frontend/dance/dance.html';
        danceLink.className = 'dropdown-item';
        danceLink.textContent = 'Dance';
        if (currentPath.includes('frontend/dance/dance.html')) {
            danceLink.classList.add('active');
        }
        exploreDropdown.appendChild(danceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="frontend/sports/sports.html"]')) {
        const sportsLink = document.createElement('a');
        sportsLink.href = 'frontend/sports/sports.html';
        sportsLink.className = 'dropdown-item';
        sportsLink.textContent = 'Sports';
        if (currentPath.includes('frontend/sports/sports.html')) {
            sportsLink.classList.add('active');
        }
        exploreDropdown.appendChild(sportsLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="frontend/science/science.html"]')) {
        const scienceLink = document.createElement('a');
        scienceLink.href = 'frontend/science/science.html';
        scienceLink.className = 'dropdown-item';
        scienceLink.textContent = 'Science';
        if (currentPath.includes('frontend/science/science.html')) {
            scienceLink.classList.add('active');
        }
        exploreDropdown.appendChild(scienceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="frontend/music/music.html"]')) {
        const musicLink = document.createElement('a');
        musicLink.href = 'frontend/music/music.html';
        musicLink.className = 'dropdown-item';
        musicLink.textContent = 'Music';
        if (currentPath.includes('frontend/music/music.html')) {
            musicLink.classList.add('active');
        }
        exploreDropdown.appendChild(musicLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="frontend/literature/literature.html"]')) {
        const literatureLink = document.createElement('a');
        literatureLink.href = 'frontend/literature/literature.html';
        literatureLink.className = 'dropdown-item';
        literatureLink.textContent = 'Literature';
        if (currentPath.includes('frontend/literature/literature.html')) {
            literatureLink.classList.add('active');
        }
        exploreDropdown.appendChild(literatureLink);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            if (navMenu) navMenu.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        if (link.classList.contains('dropdown-toggle')) return;
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('open');
            if (navMenu) navMenu.classList.remove('open');
        });
    });

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const parentDropdown = toggle.closest('.nav-dropdown');
            if (!parentDropdown) return;

            const isOpen = parentDropdown.classList.contains('open');

            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                if (dropdown !== parentDropdown) {
                    dropdown.classList.remove('open');
                    const otherToggle = dropdown.querySelector('.dropdown-toggle');
                    if (otherToggle) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            if (isOpen) {
                parentDropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                parentDropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

if (typeof window !== 'undefined') {
    window.initNavigation = initNavigation;
}

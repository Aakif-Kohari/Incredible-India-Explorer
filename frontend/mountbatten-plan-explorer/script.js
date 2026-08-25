/**
 * Mountbatten Plan Explorer - Interactive Script
 * Handles tab navigation, interactive timeline, before/after partition map,
 * leader-position tabs, theme toggle, and mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initInteractiveTimeline();
    initStakeholderTabs();
    initMapToggle();
    initThemeToggle();
    initMobileMenu();
});

/**
 * Initialize main tab navigation for different sections
 */
function initTabNavigation() {
    const tabs = document.querySelectorAll('.mp-tab');
    const sections = document.querySelectorAll('.mp-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            tab.classList.add('active');
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Initialize the click-to-expand transfer-of-power timeline
 */
function initInteractiveTimeline() {
    const items = document.querySelectorAll('#mp-interactive-timeline .mp-timeline-item');

    items.forEach(item => {
        const toggle = () => {
            const isOpen = item.classList.toggle('open');
            item.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        item.addEventListener('click', toggle);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
}

/**
 * Leader-position tabs (Congress / Muslim League / Sikh / Gandhi)
 */
function initStakeholderTabs() {
    const buttons = document.querySelectorAll('#mp-stakeholder-tabs .mp-stake-btn');
    const panels = document.querySelectorAll('.mp-stake-panel');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = document.getElementById(`stake-${btn.dataset.stake}`);
            if (panel) panel.classList.add('active');
        });
    });
}

/**
 * Before/After Partition map visualization
 */
const MAP_DATA = {
    before: `
        <div class="mp-map-block mp-map-single">
            <h3>British India (Early 1947)</h3>
            <p>One directly-administered territory under a single Viceroy, alongside roughly 565 semi-autonomous princely states owing allegiance to the British Crown. Punjab and Bengal are each undivided provinces.</p>
        </div>
    `,
    after: `
        <div class="mp-map-split">
            <div class="mp-map-block mp-map-pakistan-w">
                <h3>West Pakistan</h3>
                <p>West Punjab, Sindh, NWFP (after referendum), Balochistan.</p>
            </div>
            <div class="mp-map-block mp-map-india">
                <h3>India</h3>
                <p>East Punjab, West Bengal, and the remainder of former British India; princely states accede over 1947–48.</p>
            </div>
            <div class="mp-map-block mp-map-pakistan-e">
                <h3>East Pakistan</h3>
                <p>East Bengal (after the province's vote to partition), plus Sylhet (after referendum).</p>
            </div>
        </div>
    `
};

function initMapToggle() {
    const buttons = document.querySelectorAll('#mp-map-toggle .mp-map-btn');
    const visual = document.getElementById('mp-map-visual');
    if (!buttons.length || !visual) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            visual.innerHTML = MAP_DATA[btn.dataset.map] || '';
        });
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const isLight = body.classList.contains('light-theme');

        if (isLight) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    });
}

/**
 * Update theme toggle icon
 */
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}
/**
 * Cabinet Mission Plan Explorer - Interactive Script
 * Handles tab navigation, interactive timeline, grouping visualization,
 * stakeholder position tabs, theme toggle, and mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initInteractiveTimeline();
    initGroupingVisualization();
    initStakeholderTabs();
    initThemeToggle();
    initMobileMenu();
});

/**
 * Initialize main tab navigation for different sections
 */
function initTabNavigation() {
    const tabs = document.querySelectorAll('.cmp-tab');
    const sections = document.querySelectorAll('.cmp-section');

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
 * Initialize the click-to-expand interactive timeline
 */
function initInteractiveTimeline() {
    const items = document.querySelectorAll('#cmp-interactive-timeline .cmp-timeline-item');

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
 * Geographic grouping visualization data and interaction
 */
const GROUPING_DATA = {
    a: {
        label: 'Section A — Hindu-majority provinces',
        provinces: ['Madras', 'Bombay', 'Central Provinces', 'United Provinces', 'Bihar', 'Orissa']
    },
    b: {
        label: 'Section B — Muslim-majority provinces (west)',
        provinces: ['Punjab', 'North-West Frontier Province (NWFP)', 'Sindh']
    },
    c: {
        label: 'Section C — Muslim-majority provinces (east)',
        provinces: ['Bengal', 'Assam']
    }
};

function initGroupingVisualization() {
    const buttons = document.querySelectorAll('#cmp-grouping-grid .cmp-group-box');
    const detail = document.getElementById('cmp-group-detail');
    if (!buttons.length || !detail) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const group = GROUPING_DATA[btn.dataset.group];
            if (!group) return;

            detail.innerHTML = `
                <strong>${group.label}</strong>
                <ul>
                    ${group.provinces.map(p => `<li>${p}</li>`).join('')}
                </ul>
            `;
        });
    });
}

/**
 * Stakeholder position tabs (Congress / Muslim League / Princely States)
 */
function initStakeholderTabs() {
    const buttons = document.querySelectorAll('#cmp-stakeholder-tabs .cmp-stake-btn');
    const panels = document.querySelectorAll('.cmp-stake-panel');
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
/* ==========================================================================
   Pingala's Binary Concepts Explorer Logic
   Handles tabs, theme, bookmarks, and the Decimal -> Binary/Syllable converter.
   ========================================================================== */

function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    setupBinaryConverter();
    setupScrollAnimations();
    setupJourneyIntegration();
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            contents.forEach(c => { c.classList.remove('active'); c.setAttribute('hidden', ''); });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = document.getElementById(tab.dataset.tab);
            panel.classList.add('active');
            panel.removeAttribute('hidden');
        });
    });
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.textContent = isLight ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
}

function setupBookmark() {
    const btn = document.getElementById('bookmark-btn');
    const id = 'invention-pingala-binary';
    const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
    updateBtn();
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({ id, explorerPage: 'frontend/pingala-binary-concepts/index.html', title: "Pingala's Binary Concepts", thumbnail: 'https://placehold.co/100/3fb950/fff', category: 'inventions' });
            updateBtn();
        }
    });
}

/**
 * Interactive Binary Visualizer.
 * Converts decimal input to modern binary and Pingala's Laghu/Guru syllables.
 */
function setupBinaryConverter() {
    const input = document.getElementById('decimal-input');
    const binOut = document.getElementById('binary-output');
    const sylOut = document.getElementById('syllable-output');

    const updateConversion = () => {
        const val = parseInt(input.value);

        if (isNaN(val) || val < 0 || val > 255) {
            binOut.textContent = '---';
            sylOut.textContent = '---';
            return;
        }

        // Modern Binary (8-bit padded)
        const binStr = val.toString(2).padStart(8, '0');
        binOut.textContent = binStr;

        // Pingala's Syllables
        // Note: Pingala's actual system read bottom-up and was reversed,
        // but for visual mapping: 0 = Laghu (|), 1 = Guru (•)
        const syllables = binStr.split('').map(bit => bit === '0' ? '|' : '•').join(' ');
        sylOut.textContent = syllables;
    };

    input.addEventListener('input', updateConversion);

    // Initial run
    updateConversion();
}

let observer;
function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/pingala-binary-concepts/index.html', [
            { id: 'invention-pingala-binary', title: "Pingala's Binary Concepts", description: 'Ancient foundation of combinatorics and binary systems.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);

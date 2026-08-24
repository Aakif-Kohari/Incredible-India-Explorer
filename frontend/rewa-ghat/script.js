/* ==========================================================================
   REWA GHAT — INTERACTIVE SCRIPT
   Handles interactive exploration tabs (Palace Architecture / Cultural
   Importance / Nearby Ghats) and theme switching logic.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initThemeToggle();
});

/* ---------- 1. Interactive Tabs ---------- */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* ---------- 2. Theme Toggle Support ---------- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const isLight = document.body.classList.contains('light-theme');
    themeBtn.textContent = isLight ? '🌙' : '☀️';

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const nowLight = document.body.classList.contains('light-theme');
        themeBtn.textContent = nowLight ? '🌙' : '☀️';
        localStorage.setItem('theme', nowLight ? 'light' : 'dark');
    });
}
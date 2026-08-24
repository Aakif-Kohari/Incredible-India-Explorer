/**
 * Deodhar Trophy Integration Logic
 * Implements intersection bounds and the sequential Format Evolution horizontal
 * slider mapping historical tournament changes over 5 decades.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Global Scroll Intersection Observer --- */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));


    /* --- 2. Format Evolution Mapping Engine --- */
    const yearHeaders = [
        "1973 - 2015",
        "2015 - 2018",
        "2018 - 2023",
        "2023 - Present"
    ];

    let currentIndex = 0;
    const maxIndex = yearHeaders.length - 1;

    // DOM Attachments
    const prevBtn = document.getElementById('evo-prev');
    const nextBtn = document.getElementById('evo-next');
    const yearDisplay = document.getElementById('evo-year');
    const panes = [
        document.getElementById('pane-1'),
        document.getElementById('pane-2'),
        document.getElementById('pane-3'),
        document.getElementById('pane-4')
    ];
    const dots = document.querySelectorAll('.evo-dot');

    // Core state transitor
    function renderState(newIndex) {
        // Bounds checking safely
        if (newIndex < 0 || newIndex > maxIndex) return;

        currentIndex = newIndex;

        // Decouple all actives
        panes.forEach(p => p && p.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Assign Active Hooks
        if (panes[currentIndex]) {
            // Re-trigger animation via hack
            panes[currentIndex].style.animation = 'none';
            void panes[currentIndex].offsetWidth; // trigger reflow
            panes[currentIndex].style.animation = null;
            panes[currentIndex].classList.add('active');
        }

        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }

        if (yearDisplay) {
            yearDisplay.textContent = yearHeaders[currentIndex];
        }

        // Handle Disables
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === maxIndex;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => renderState(currentIndex - 1));
        nextBtn.addEventListener('click', () => renderState(currentIndex + 1));

        // Initial setup
        renderState(0);

        // Attach Dot pagination logic
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const target = parseInt(e.target.getAttribute('data-target'));
                renderState(target);
            });
        });
    }
});

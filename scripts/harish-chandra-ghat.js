/**
 * Harish Chandra Ghat - Display Logic
 * Encompasses the mythos tab framework and intersection observer timeline behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Intersection Observer for Smooth Revals --- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const triggerElements = document.querySelectorAll('.scroll-trigger');
    triggerElements.forEach(el => scrollObserver.observe(el));


    /* --- 2. Interactive Mythos Storytelling Tabs --- */
    const storyTabs = document.querySelectorAll('.m-tab');
    const storyPanes = document.querySelectorAll('.m-pane');

    storyTabs.forEach(tab => {
        tab.addEventListener('click', () => {

            // Wipe active states visually
            storyTabs.forEach(t => t.classList.remove('active'));
            storyPanes.forEach(p => p.classList.remove('active'));

            // Engage explicit targeted states
            tab.classList.add('active');

            // Map the data-story ID to the DOM element
            const targetId = tab.getAttribute('data-story');
            const targetPane = document.getElementById(targetId);

            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    /* --- 3. Initial Hero Parallax (Optional Enhancement) --- */
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hc-hero');
        if (hero && window.scrollY < window.innerHeight) {
            hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
        }
    });

});

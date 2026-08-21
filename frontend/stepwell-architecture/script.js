// frontend/stepwell-architecture/script.js

(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
        const fadeElements = document.querySelectorAll('.fade-in-on-scroll');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing once it has become visible
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: remove the class if you want it to fade out again when scrolling up
                    // entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            observer.observe(el);
        });
    });

})();

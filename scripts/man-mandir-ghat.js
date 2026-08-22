/**
 * Man Mandir Ghat Interactvity Engine
 * Drives intersection observation, the Astronomical tab switching, and custom Lightbox logic.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Global Scroll Transition Engine --- */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target); // Trigger only once for performance
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));


    /* --- 2. Jantar Mantar Instrument Explorer --- */
    const instrumentBtns = document.querySelectorAll('.ie-btn');
    const instrumentPanes = document.querySelectorAll('.ie-pane');

    instrumentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Decouple all active states
            instrumentBtns.forEach(b => b.classList.remove('active'));
            instrumentPanes.forEach(p => p.classList.remove('active'));

            // Engage selected states
            btn.classList.add('active');

            // Reconcile targeted content pane
            const targetId = btn.getAttribute('data-instrument');
            const targetPane = document.getElementById(targetId);

            // Safe DOM validation
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });


    /* --- 3. Lightbox Gallery Logic --- */
    const galleryItems = document.querySelectorAll('.m-gallery-item');
    const lightboxModal = document.getElementById('gallery-lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImg = document.getElementById('lb-image');
    const lightboxCaption = document.getElementById('lb-caption');

    if (galleryItems && lightboxModal && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Fetch encapsulated data
                const captionText = item.getAttribute('data-caption');

                // For demonstration, we'll clone the background styles of the child placeholder to fake images
                const placeholder = item.querySelector('.placeholder-img');
                const bgColor = placeholder ? placeholder.style.background : '#000';

                // Inject data to Modal
                lightboxCaption.innerText = captionText;
                lightboxImg.style.background = bgColor;

                // Activate
                lightboxModal.classList.add('active');
            });
        });

        // Close on X click
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        // Close on background click
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });

        // Ensure ESC key dismisses the UI gracefully
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                lightboxModal.classList.remove('active');
            }
        });
    }
});

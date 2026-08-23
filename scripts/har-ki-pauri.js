/**
 * Har Ki Pauri Experience - Interaction Script
 * Handles intersection observers, modal logic, and dynamic DOM injection.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-fade').forEach(section => {
        fadeObserver.observe(section);
    });


    // 2. Interactive Ganga Aarti Simulation
    const btnAarti = document.getElementById('btn-aarti-sim');
    const visualizer = document.getElementById('aarti-audio-visualizer');

    if (btnAarti && visualizer) {
        btnAarti.addEventListener('click', () => {
            if (visualizer.classList.contains('hidden')) {
                visualizer.classList.remove('hidden');
                btnAarti.textContent = "Stop Simulation";
                // Randomize bar animation delays to look organic
                const bars = visualizer.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.animationDelay = `${Math.random()}s`;
                });
            } else {
                visualizer.classList.add('hidden');
                btnAarti.textContent = "Experience the Chant";
            }
        });
    }


    // 3. Dynamic Masonry Gallery Generation
    const galleryData = [
        { title: "Brahma Kund at Dawn", color: "linear-gradient(45deg, #f1c40f, #e67e22)" },
        { title: "Evening Ganga Aarti Glow", color: "linear-gradient(45deg, #e74c3c, #8e44ad)" },
        { title: "Pilgrims during Kanwar Yatra", color: "linear-gradient(45deg, #3498db, #2c3e50)" },
        { title: "Malviya Dwip Clock Tower", color: "linear-gradient(45deg, #95a5a6, #7f8c8d)" },
        { title: "Floating Diyas on the River", color: "linear-gradient(45deg, #d35400, #f39c12)" },
        { title: "Historical Bathing Ghats", color: "linear-gradient(45deg, #27ae60, #2ecc71)" },
    ];

    const galleryGrid = document.getElementById('hkp-gallery-grid');
    if (galleryGrid) {
        galleryData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.style.background = item.color;
            div.dataset.index = index;

            const span = document.createElement('span');
            span.textContent = item.title;

            div.appendChild(span);
            galleryGrid.appendChild(div);
        });
    }


    // 4. Modal Lightbox Logic
    const lightbox = document.getElementById('hkp-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    if (lightbox && galleryGrid) {
        // Open lightbox via event delegation
        galleryGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const index = item.dataset.index;
                const data = galleryData[index];

                lightboxImg.style.background = data.color;
                lightboxCaption.textContent = data.title;
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Stop background scroll
            }
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore scroll
        };

        closeBtn.addEventListener('click', closeLightbox);

        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }
});

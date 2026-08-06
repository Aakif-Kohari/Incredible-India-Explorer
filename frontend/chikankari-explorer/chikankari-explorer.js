document.addEventListener('DOMContentLoaded', () => {
    // Gallery Data
    const galleryItems = [
        {
            title: "Tepchi",
            category: "flat",
            description: "A long running or darning stitch worked with six strands on the right side of the fabric, often used to outline motifs.",
            imgSrc: "assets/chikan-1.jpg"
        },
        {
            title: "Bakhiya",
            category: "flat",
            description: "Also known as shadow work, it is done on the reverse side of sheer fabric so its shadow appears on the front.",
            imgSrc: "assets/chikan-2.jpg"
        },
        {
            title: "Murri",
            category: "embossed",
            description: "A knotted stitch resembling a grain of rice, used extensively for creating intricate floral centers.",
            imgSrc: "assets/chikan-3.jpg"
        },
        {
            title: "Phanda",
            category: "embossed",
            description: "A spherical, millet-shaped knot similar to Murri but smaller and rounder, creating a beautiful raised texture.",
            imgSrc: "assets/chikan-4.jpg"
        },
        {
            title: "Jaali",
            category: "jaali",
            description: "A delicate net-like pattern created not by drawing threads out, but by tearing the fabric threads apart with a needle.",
            imgSrc: "assets/chikan-5.jpg"
        }
    ];

    const galleryContainer = document.getElementById('stitch-gallery');
    
    function renderGallery(filter = 'all') {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = '';
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.category === filter) {
                const card = document.createElement('div');
                card.className = 'gallery-card';
                card.tabIndex = 0;
                card.setAttribute('aria-label', `View ${item.title}`);
                card.setAttribute('role', 'button');
                
                card.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.title} stitch" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="animated-placeholder" style="display:none; height: 250px;">Image of ${item.title}</div>
                    <div class="gallery-card-content">
                        <h3>${item.title}</h3>
                        <p style="color: var(--primary-gold); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 8px;">${item.category}</p>
                        <p>${item.description}</p>
                    </div>
                `;
                
                card.addEventListener('click', () => openLightbox(item));
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(item);
                    }
                });

                galleryContainer.appendChild(card);
            }
        });
    }

    // Initialize gallery
    renderGallery();

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.getAttribute('data-filter'));
        });
    });

    // Lightbox Logic
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    function openLightbox(item) {
        modalImg.src = item.imgSrc;
        modalImg.alt = item.title;
        modalCaption.textContent = item.title;
        modal.setAttribute('aria-hidden', 'false');
        if (closeBtn) closeBtn.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', closeLightbox);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    }

    // Scroll reveal logic
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});

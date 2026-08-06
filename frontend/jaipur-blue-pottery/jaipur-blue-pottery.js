document.addEventListener('DOMContentLoaded', () => {
    // Gallery Data
    const galleryItems = [
        {
            title: "Classic Floral Vase",
            category: "vase",
            description: "A tall vase featuring the traditional Persian interlacing floral vines (Arabesque) in cobalt blue.",
            imgSrc: "assets/blue-pottery-1.jpg"
        },
        {
            title: "Turquoise Wall Plate",
            category: "plate",
            description: "A decorative plate with a copper-oxide turquoise base, featuring a central peacock motif.",
            imgSrc: "assets/blue-pottery-2.jpg"
        },
        {
            title: "Geometric Medallion Tile",
            category: "tile",
            description: "Square tile used for architectural accents, highlighting symmetrical geometric patterns.",
            imgSrc: "assets/blue-pottery-3.jpg"
        },
        {
            title: "Miniature Surahi",
            category: "vase",
            description: "A traditional long-necked water flask adorned with delicate blooming lotus patterns.",
            imgSrc: "assets/blue-pottery-4.jpg"
        },
        {
            title: "Avian Motif Plate",
            category: "plate",
            description: "A shallow plate depicting singing birds among flowering branches.",
            imgSrc: "assets/blue-pottery-5.jpg"
        }
    ];

    const galleryContainer = document.getElementById('pottery-gallery');
    
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
                    <img src="${item.imgSrc}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="animated-placeholder" style="display:none; height: 250px;">Image of ${item.title}</div>
                    <div class="gallery-card-content">
                        <h3>${item.title}</h3>
                        <p style="color: #4da6ff; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 8px;">${item.category}</p>
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

    // Scroll reveal logic (for timeline steps and sections)
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

    document.querySelectorAll('.fade-in-section, .timeline-step').forEach(section => {
        observer.observe(section);
    });
});

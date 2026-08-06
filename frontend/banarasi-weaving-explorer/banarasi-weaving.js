document.addEventListener('DOMContentLoaded', () => {
    // Gallery Data
    const galleryItems = [
        {
            title: "Classic Katan Brocade",
            category: "all",
            description: "Pure silk base with heavy gold zari floral motifs, a hallmark of traditional bridal wear.",
            imgSrc: "assets/banarasi-1.jpg"
        },
        {
            title: "Jangla Design",
            category: "jangla",
            description: "Intricate, dense floral and vine patterns spread across the fabric without borders.",
            imgSrc: "assets/banarasi-2.jpg"
        },
        {
            title: "Tanchoi Silk",
            category: "tanchoi",
            description: "Woven using multiple silk threads to create a kaleidoscope of colors without using zari.",
            imgSrc: "assets/banarasi-3.jpg"
        },
        {
            title: "Butidar Pattern",
            category: "butidar",
            description: "Distinctive, standalone floral or geometric motifs (butis) scattered across the fabric.",
            imgSrc: "assets/banarasi-4.jpg"
        }
    ];

    const galleryContainer = document.getElementById('pattern-gallery');
    
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

    // Loom Interactivity
    const loomTooltip = document.getElementById('loom-tooltip-display');
    const loomElements = document.querySelectorAll('[data-tooltip]');
    
    loomElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            loomTooltip.textContent = el.getAttribute('data-tooltip');
        });
        el.addEventListener('mouseleave', () => {
            loomTooltip.textContent = "Hover over the loom parts to learn more.";
        });
    });

    const btnWeave = document.getElementById('btn-weave');
    const shuttle = document.getElementById('shuttle');
    const shuttleTrack = document.querySelector('.shuttle-track');
    const wovenFabric = document.querySelector('.woven-fabric');
    
    let isWeaving = false;
    let fabricHeight = 0;
    
    if (btnWeave && shuttle && wovenFabric && shuttleTrack) {
        btnWeave.addEventListener('click', () => {
            if (isWeaving) return;
            isWeaving = true;
            btnWeave.disabled = true;
            btnWeave.textContent = "Weaving...";
            
            let passes = 0;
            const maxPasses = 4;
            
            function simulatePass() {
                if (passes >= maxPasses) {
                    isWeaving = false;
                    btnWeave.disabled = false;
                    btnWeave.textContent = "Simulate Weaving";
                    // Reset if it gets too high
                    if (fabricHeight > 250) {
                        fabricHeight = 0;
                        wovenFabric.style.height = '0px';
                        shuttleTrack.style.bottom = '0px';
                    }
                    return;
                }
                
                // Move shuttle right or left
                const isGoingRight = passes % 2 === 0;
                shuttle.style.left = isGoingRight ? 'calc(100% - 40px)' : '0';
                
                setTimeout(() => {
                    fabricHeight += 15; // Increase fabric height
                    wovenFabric.style.height = fabricHeight + 'px';
                    shuttleTrack.style.bottom = fabricHeight + 'px';
                    passes++;
                    setTimeout(simulatePass, 300); // slight pause before next pass
                }, 500); // Wait for shuttle transition (0.5s)
            }
            
            simulatePass();
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

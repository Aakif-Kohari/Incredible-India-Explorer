document.addEventListener('DOMContentLoaded', () => {
    // Populate Interactive Gallery
    const galleryContainer = document.getElementById('papier-mache-gallery');
    
    const galleryItems = [
        {
            title: "Kalamdan (Pen Case)",
            description: "A traditional pen case ornately decorated with the Hazara motif, showcasing delicate gold detailing.",
            motif: "Gul-e-Hazara",
            imgSrc: "assets/papier-mache-1.jpg"
        },
        {
            title: "Decorative Vase",
            description: "A large vase painted with Chinar leaves and singing birds, highlighting the natural beauty of Kashmir.",
            motif: "Chinar and Birds",
            imgSrc: "assets/papier-mache-2.jpg"
        },
        {
            title: "Jewelry Box",
            description: "A small, exquisitely detailed jewelry box featuring Persian arabesque patterns in rich blue and gold.",
            motif: "Persian Arabesque",
            imgSrc: "assets/papier-mache-3.jpg"
        },
        {
            title: "Wall Plate",
            description: "A decorative wall plate illustrating a Darbar (royal court) scene surrounded by a border of intricate florals.",
            motif: "Darbar & Florals",
            imgSrc: "assets/papier-mache-4.jpg"
        }
    ];

    if (galleryContainer) {
        galleryItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.tabIndex = 0; // Make it keyboard accessible
            card.setAttribute('aria-label', `Gallery item: ${item.title}`);
            
            // Note: Using placeholders if image fails to load
            card.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="animated-placeholder" style="display:none; height: 200px;">Image of ${item.title}</div>
                <div class="gallery-card-content">
                    <h3>${item.title}</h3>
                    <p style="color: var(--primary-gold); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 8px;">Motif: ${item.motif}</p>
                    <p>${item.description}</p>
                </div>
            `;
            galleryContainer.appendChild(card);
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

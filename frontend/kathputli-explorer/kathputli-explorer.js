document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('kathputli-gallery');
    
    const galleryItems = [
        {
            title: "King Vikramaditya",
            type: "Raja (King)",
            description: "The wise and brave king, often the central figure in many traditional Rajasthani folktales.",
            imgSrc: "assets/kathputli-1.jpg"
        },
        {
            title: "The Court Dancer",
            type: "Anarkali",
            description: "A graceful dancer with a wide, flowing skirt that twirls spectacularly during performances.",
            imgSrc: "assets/kathputli-2.jpg"
        },
        {
            title: "The Musician",
            type: "Folk Performer",
            description: "Plays the dholak or harmonium in the puppet world, mirroring the real-life puppeteers.",
            imgSrc: "assets/kathputli-3.jpg"
        },
        {
            title: "The Snake Charmer",
            type: "Entertainer",
            description: "A classic character bringing humor and village life aesthetics to the royal courts of the story.",
            imgSrc: "assets/kathputli-4.jpg"
        }
    ];

    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    function openLightbox(item) {
        modalImg.src = item.imgSrc;
        modalImg.alt = item.title;
        modalCaption.textContent = `${item.title} - ${item.type}`;
        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (galleryContainer) {
        galleryItems.forEach((item) => {
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
                    <p style="color: var(--primary-gold); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 8px;">${item.type}</p>
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
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', closeLightbox);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLightbox();
            }
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

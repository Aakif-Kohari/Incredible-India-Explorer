(function () {
    'use strict';
    const aquaticData = [
        { icon: '🐟', title: 'Brackish Water Fish', desc: 'Over 40 species of fish, including mullet, pearl spot, and seabass, thrive in the nutrient-rich channels.' },
        { icon: '🦐', title: 'Crustaceans', desc: 'Crabs and prawns are abundant, playing a crucial role in the mangrove food web and local fisheries.' },
        { icon: '🐊', title: 'Estuarine Crocodile', desc: 'The saltwater crocodile is a top predator, occasionally spotted basking on the muddy banks.' },
        { icon: '🐍', title: 'Water Snakes', desc: 'Various species of non-venomous water snakes help control rodent and fish populations.' }
    ];
    const biodiversityData = [
        { icon: '🌳', title: 'Avicennia Marina', desc: 'The most common mangrove species, recognizable by its pencil-like pneumatophores (breathing roots).' },
        { icon: '🦅', title: 'White-bellied Sea Eagle', desc: 'A majestic raptor that soars above the canopy, hunting for fish and crabs.' },
        { icon: '🦦', title: 'Smooth-coated Otter', desc: 'Playful and elusive, these otters are indicators of a healthy aquatic ecosystem.' },
        { icon: '🦋', title: 'Butterflies & Insects', desc: 'The mangrove understory supports a diverse array of pollinators and decomposers.' }
    ];
    const galleryData = [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sundarbans_mangrove.jpg/800px-Sundarbans_mangrove.jpg', caption: 'Dense mangrove canopy with intricate root systems' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pichavaram_Boat_Ride.jpg/800px-Pichavaram_Boat_Ride.jpg', caption: 'Traditional coracle boat navigating the narrow channels' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Mangrove_Roots_Pichavaram.jpg/800px-Mangrove_Roots_Pichavaram.jpg', caption: 'Close-up of pneumatophores emerging from the mud' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Bird_in_Mangrove.jpg/800px-Bird_in_Mangrove.jpg', caption: 'Egret perched on a mangrove branch' }
    ];

    function renderGrid(containerId, data, templateFn) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = data.map(templateFn).join('');
    }

    function initGrids() {
        renderGrid('aquatic-grid', aquaticData, item => `<div class="info-card animate-on-scroll"><div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.desc}</p></div>`);
        renderGrid('biodiversity-grid', biodiversityData, item => `<div class="info-card animate-on-scroll"><div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.desc}</p></div>`);
        renderGrid('gallery-grid', galleryData, (item, index) => `<div class="gallery-item animate-on-scroll" data-index="${index}" role="button" tabindex="0" aria-label="View ${item.caption}"><img src="${item.src}" alt="${item.caption}" loading="lazy" /></div>`);
    }

    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        let currentIndex = 0;
        function open(index) { currentIndex = index; lightboxImg.src = galleryData[index].src; lightboxImg.alt = galleryData[index].caption; lightboxCaption.textContent = galleryData[index].caption; lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; }
        function close() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
        document.getElementById('gallery-grid').addEventListener('click', e => { const item = e.target.closest('.gallery-item'); if (item) open(parseInt(item.dataset.index, 10)); });
        document.getElementById('lightbox-close').addEventListener('click', close);
        document.getElementById('lightbox-next').addEventListener('click', () => { currentIndex = (currentIndex + 1) % galleryData.length; open(currentIndex); });
        document.getElementById('lightbox-prev').addEventListener('click', () => { currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length; open(currentIndex); });
        lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
        document.addEventListener('keydown', e => { if (!lightbox.classList.contains('active')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % galleryData.length; open(currentIndex); } if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length; open(currentIndex); } });
    }

    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; observer.observe(el); });
    }

    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', () => { initGrids(); initLightbox(); initScrollAnimations(); }); } else { initGrids(); initLightbox(); initScrollAnimations(); }
})();

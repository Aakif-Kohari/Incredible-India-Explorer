(function () {
    'use strict';
    const migrationData = [
        { icon: '🦆', title: 'Northern Pintail', desc: 'A graceful duck with a distinctive long, pointed tail, commonly seen in the shallow waters during winter.' },
        { icon: '🦢', title: 'Black-necked Stork', desc: 'A large, striking wader that is a rare and vulnerable visitor to the wetland.' },
        { icon: '🦅', title: 'Pallas\'s Fish Eagle', desc: 'A powerful raptor that hunts for fish in the lake, a prized sighting for birdwatchers.' },
        { icon: '🦉', title: 'Indian Pond Heron', desc: 'A resident bird that is often seen stalking prey along the muddy shores and reed beds.' }
    ];
    const biodiversityData = [
        { icon: '🐟', title: 'Native Fish', desc: 'The lake supports a variety of freshwater fish species that are vital to the local aquatic food web.' },
        { icon: '🌿', title: 'Aquatic Vegetation', desc: 'Dense growths of water hyacinth, lotus, and submerged macrophytes provide cover and breeding grounds.' },
        { icon: '🐢', title: 'Reptiles', desc: 'Various species of turtles and water snakes thrive in the shallow, warm waters of the lake.' },
        { icon: '🦦', title: 'Mammals', desc: 'Smooth-coated otters and fishing cats are occasionally spotted along the lake margins, indicating a healthy ecosystem.' }
    ];
    const galleryData = [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sirpur_Lake_Birds.jpg/800px-Sirpur_Lake_Birds.jpg', caption: 'Migratory waterfowl resting in the shallow waters of Sirpur Lake' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sirpur_Lake_Landscape.jpg/800px-Sirpur_Lake_Landscape.jpg', caption: 'The expansive view of the urban wetland at sunrise' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Black_necked_Stork_Sirpur.jpg/800px-Black_necked_Stork_Sirpur.jpg', caption: 'A rare sighting of the vulnerable Black-necked Stork' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fishing_Village_Sirpur.jpg/800px-Fishing_Village_Sirpur.jpg', caption: 'Local communities dependent on the lake\'s resources' }
    ];

    function renderGrid(containerId, data, templateFn) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = data.map(templateFn).join('');
    }

    function initGrids() {
        renderGrid('migration-grid', migrationData, item => `<div class="info-card animate-on-scroll"><div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.desc}</p></div>`);
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

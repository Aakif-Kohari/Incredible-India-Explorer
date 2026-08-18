(function () {
    'use strict';
    const mangrovesData = [
        { icon: '🌳', title: 'Avicennia officinalis', desc: 'A dominant mangrove species with prominent pneumatophores, adapted to the brackish conditions of the estuary.' },
        { icon: '🌿', title: 'Rhizophora mucronata', desc: 'Characterized by its stilt roots, this species plays a vital role in stabilizing the muddy estuarine banks.' },
        { icon: '🌱', title: 'Excoecaria agallocha', desc: 'Known as the blind-your-eye mangrove, it secretes a toxic latex but provides important habitat structure.' },
        { icon: '🌾', title: 'Salt Marsh Grasses', desc: 'Spartina and other salt-tolerant grasses fringe the mangrove areas, providing feeding grounds for birds.' }
    ];
    const biodiversityData = [
        { icon: '🦅', title: 'White-bellied Sea Eagle', desc: 'A powerful raptor that hunts for fish and crabs in the shallow estuarine waters.' },
        { icon: '🦦', title: 'Smooth-coated Otter', desc: 'These playful mammals are indicators of a healthy aquatic ecosystem, feeding on fish and crustaceans.' },
        { icon: '🐟', title: 'Estuarine Fish', desc: 'Species like mullet, pearl spot, and seabass use the mangrove roots as a safe nursery ground.' },
        { icon: '🦀', title: 'Fiddler Crabs', desc: 'Abundant in the mudflats, these crabs play a crucial role in nutrient cycling and aerating the soil.' }
    ];
    const galleryData = [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sundarbans_mangrove.jpg/800px-Sundarbans_mangrove.jpg', caption: 'Dense mangrove forests lining the estuary banks' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Estuary_River_Meeting_Sea.jpg/800px-Estuary_River_Meeting_Sea.jpg', caption: 'The confluence of the Aghanashini River and the Arabian Sea' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Fishing_Boats_Estuary.jpg/800px-Fishing_Boats_Estuary.jpg', caption: 'Traditional fishing boats navigating the brackish waters' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mudskipper_Mangrove.jpg/800px-Mudskipper_Mangrove.jpg', caption: 'Mudskippers and fiddler crabs on the estuarine mudflats' }
    ];

    function renderGrid(containerId, data, templateFn) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = data.map(templateFn).join('');
    }

    function initGrids() {
        renderGrid('mangroves-grid', mangrovesData, item => `<div class="info-card animate-on-scroll"><div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.desc}</p></div>`);
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

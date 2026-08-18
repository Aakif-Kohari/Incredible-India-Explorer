(function () {
    'use strict';
    const birdsData = [
        { icon: '🦆', title: 'Sarus Crane', desc: 'The state bird of Uttar Pradesh, also found here, standing tall as the world\'s tallest flying bird.' },
        { icon: '🦅', title: 'Pallas\'s Fish Eagle', desc: 'A rare winter visitor that hunts for fish in the shallow waters of the lake.' },
        { icon: '🦢', title: 'Black-tailed Godwit', desc: 'A long-legged wader that probes the mudflats for invertebrates during migration.' },
        { icon: '🦉', title: 'Indian Skimmer', desc: 'A vulnerable species that uniquely feeds by skimming its lower mandible along the water surface.' }
    ];
    const biodiversityData = [
        { icon: '🐟', title: 'Native Fish', desc: 'Over 30 species of fish, including the endangered Gangetic dolphin occasionally visiting connected channels.' },
        { icon: '🌿', title: 'Aquatic Vegetation', desc: 'Dense growths of water hyacinth, lotus, and submerged macrophytes providing cover for aquatic life.' },
        { icon: '🐢', title: 'Reptiles', desc: 'Various species of turtles and water snakes that thrive in the shallow, warm waters.' },
        { icon: '🦦', title: 'Mammals', desc: 'Smooth-coated otters and fishing cats are occasionally spotted along the lake margins.' }
    ];
    const galleryData = [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kanwar_Lake_Birds.jpg/800px-Kanwar_Lake_Birds.jpg', caption: 'Migratory waterfowl resting in the shallow waters' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kanwar_Lake_Landscape.jpg/800px-Kanwar_Lake_Landscape.jpg', caption: 'The expansive crescent shape of the oxbow lake' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sarus_Crane_Kanwar.jpg/800px-Sarus_Crane_Kanwar.jpg', caption: 'Majestic Sarus Cranes foraging in the wetland' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fishing_Village_Kanwar.jpg/800px-Fishing_Village_Kanwar.jpg', caption: 'Local fishing communities dependent on the lake' }
    ];

    function renderGrid(containerId, data, templateFn) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = data.map(templateFn).join('');
    }

    function initGrids() {
        renderGrid('birds-grid', birdsData, item => `<div class="info-card animate-on-scroll"><div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.desc}</p></div>`);
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


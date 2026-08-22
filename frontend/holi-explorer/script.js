document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('holi-map');
    const regionDetails = document.getElementById('region-details');
    const timelineContainer = document.getElementById('holi-timeline');
    const foodGrid = document.getElementById('food-grid');
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    Components.buildMap(mapContainer, holiData.regions, (region) => {
        regionDetails.innerHTML = '';
        regionDetails.appendChild(Utils.createElement('h3', '', region.name));
        regionDetails.appendChild(Utils.createElement('p', '', region.desc));
    });

    Components.buildTimeline(timelineContainer, holiData.timeline);
    Components.buildFoodGrid(foodGrid, holiData.foods);
    Components.buildGallery(galleryGrid, holiData.gallery, (img) => {
        lightboxImg.src = img.src; lightboxImg.alt = img.alt;
        lightbox.classList.add('active'); lightbox.setAttribute('aria-hidden', 'false');
    });

    lightboxClose.addEventListener('click', () => { lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden', 'true'); });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

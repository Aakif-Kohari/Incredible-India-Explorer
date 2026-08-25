document.addEventListener('DOMContentLoaded', () => {

    Components.buildPandals(document.getElementById('pandal-grid'), pujaData.pandals);
    Components.buildMap(document.getElementById('puja-map'), pujaData.regions);
    Components.buildTimeline(document.getElementById('puja-timeline'), pujaData.timeline);
    Components.buildFood(document.getElementById('food-grid'), pujaData.foods);

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

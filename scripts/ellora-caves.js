/**
 * Ellora Caves - Frontend Logic System
 * Drives intersection observers and the dynamic Tri-Faith Cave filtering logic.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Global Scroll Intersection Observer --- */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));


    /* --- 2. Tri-Faith Cave Explorer Database --- */
    const elloraDatabase = [
        { id: 1, type: 'buddhist', name: 'Cave 10: Visvakarma Cave', desc: 'The "Carpenter\'s Cave", notable for its ribbed ceiling resembling wooden beams and a massive stupa.', badge: 'buddha' },
        { id: 2, type: 'buddhist', name: 'Cave 5: Maharwada Cave', desc: 'A massive vihara functioning as an assembly hall with parallel carved stone benches.', badge: 'buddha' },
        { id: 3, type: 'buddhist', name: 'Cave 12: Tin Thal', desc: 'A colossal three-story Buddhist monastery featuring intricate depictions of the Buddha arrayed in meditation.', badge: 'buddha' },
        { id: 4, type: 'hindu', name: 'Cave 15: Dashavatara Cave', desc: 'Notable for its dramatic depictions of Lord Vishnu\'s ten avatars and a massive monolithic pavilion.', badge: 'hindu' },
        { id: 5, type: 'hindu', name: 'Cave 16: Kailasa Temple', desc: 'The largest monolithic bedrock excavation in world history. A pinnacle of ancient Indian rock-cut engineering.', badge: 'hindu' },
        { id: 6, type: 'hindu', name: 'Cave 21: Rameshwar Cave', desc: 'Famous for detailed wall panels mapping the marriage of Shiva and Parvati amidst complex carvings.', badge: 'hindu' },
        { id: 7, type: 'hindu', name: 'Cave 29: Dhumar Lena', desc: 'A sprawling excavation modeled somewhat on Mumbai\'s Elephanta Caves with large linga shrines.', badge: 'hindu' },
        { id: 8, type: 'jain', name: 'Cave 32: Indra Sabha', desc: 'A magnificent two-story structure boasting delicate, intricate carvings representing a celestial assembly hall.', badge: 'jain' },
        { id: 9, type: 'jain', name: 'Cave 33: Jagannath Sabha', desc: 'A complex Jain sanctuary containing finely detailed Tirthankara figures and immense unyielding pillars.', badge: 'jain' },
    ];

    /* --- 3. Rendering Engine --- */
    const container = document.getElementById('cave-collection');
    const filterBtns = document.querySelectorAll('.ce-btn');

    function renderCaves(filterCategory) {
        if (!container) return;

        container.innerHTML = '';

        const filteredData = filterCategory === 'all'
            ? elloraDatabase
            : elloraDatabase.filter(c => c.type === filterCategory);

        filteredData.forEach(cave => {
            const el = document.createElement('div');
            el.className = 'cv-card';
            el.innerHTML = `
                <div class="cv-badge ${cave.badge}">${cave.type} Origin</div>
                <h4>${cave.name}</h4>
                <p>${cave.desc}</p>
            `;
            container.appendChild(el);
        });
    }

    // Initialize Default Render
    renderCaves('all');

    // Attach Listeners
    if (filterBtns && filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Manipulate active UI states
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Re-render payload based on data-filter attribute
                const triggerLogic = btn.getAttribute('data-filter');
                renderCaves(triggerLogic);
            });
        });
    }
});

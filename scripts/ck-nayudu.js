/**
 * C. K. Nayudu Trophy - Frontend Interactive Logic
 * Drives the sequential Player Development Timeline rendering and global intersection observers.
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

    // Globally hook all baseline fade-ins
    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));


    /* --- 2. Interactive Player Development Timeline Engine --- */
    const timelineData = [
        {
            stage: "Cooch Behar Trophy",
            age: "U-19 Boys",
            desc: "The premier multi-day cricket tournament for raw teenage talent. Exceptional performers are identified early by scouts and flagged for progression."
        },
        {
            stage: "C. K. Nayudu Trophy",
            age: "U-23 Men's",
            desc: "The critical incubation phase. Players learn to handle grueling four-day red-ball matches, developing patience, shot selection, and bowling stamina."
        },
        {
            stage: "India A / Emerging Squad",
            age: "Developmental / Fringe",
            desc: "Top Nayudu Trophy scorers and wicket-takers frequently bypass lower domestic matches, earning caps for the India A squad representing the nation internationally."
        },
        {
            stage: "Ranji Trophy & IPL",
            age: "Senior Domestic",
            desc: "The ultimate stepping stone. Players refined by the U-23 structure consistently dominate here through perfected red-ball fundamentals."
        },
        {
            stage: "India National Team",
            age: "Senior Pro",
            desc: "The pinnacle. Test capping marks the successful conclusion of the BCCI's youth pipeline structurally reliant on the Nayudu pathway."
        }
    ];

    const timelineContainer = document.getElementById('dev-timeline');

    if (timelineContainer) {
        // Sequentially inject nodes to support vertical mapping CSS logic
        timelineData.forEach((node, index) => {
            const el = document.createElement('div');
            el.className = 't-node'; // Base node structure

            // Map inner contents securely
            el.innerHTML = `
                <div class="t-marker"></div>
                <div class="t-content">
                    <span class="t-age">${node.age}</span>
                    <h3>${node.stage}</h3>
                    <p>${node.desc}</p>
                </div>
            `;

            timelineContainer.appendChild(el);

            // Attach observer immediately to the dynamic injection
            observer.observe(el);
        });
    }
});

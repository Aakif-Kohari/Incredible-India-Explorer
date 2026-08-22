document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Data for Dynamic Sections
    const timelineData = [
        { year: "c. 1901", title: "Early Life", desc: "Born into a Gond tribal family in the Chandrapur/Adilabad region. Early exposure to the hardships faced by tribal communities under feudal rule." },
        { year: "1920s", title: "Return & Organization", desc: "Returned to the Adilabad forests after working in coal mines. Began organizing Gond communities to resist oppressive taxation and forced labor (Vetti)." },
        { year: "1928 - 1930s", title: "Peak of Resistance", desc: "Led armed resistance against the Nizam's Razakars and local landlords. Successfully established self-governance in several forest villages, rejecting the Nizam's authority." },
        { year: "1940", title: "Martyrdom", desc: "After a prolonged siege by the Nizam's forces, Komaram Bheem was martyred. The exact date remains debated in oral histories, but his sacrifice cemented his status as a legendary icon." }
    ];

    const resistanceData = [
        { icon: "⛓️", title: "Abolition of Vetti", desc: "Fought against the systemic practice of forced, unpaid labor imposed on tribal people by feudal lords and the state administration." },
        { icon: "🏹", title: "Hunting Rights", desc: "Resisted colonial and Nizam-era forest laws that criminalized the traditional Gond practice of hunting and gathering forest produce for survival." },
        { icon: "📜", title: "Debt & Land Grabbing", desc: "Protected tribal communities from exploitative moneylenders (Sahukars) who used deceitful practices to seize ancestral lands." }
    ];

    const legacyData = [
        { icon: "🏙️", title: "Komaram Bheem Asifabad", desc: "The town of Asifabad in Telangana was officially renamed in his honor, serving as a constant reminder of his legacy in the region he fought for." },
        { icon: "🗽", title: "Symbol of Telangana", desc: "His slogan 'Jal, Jangal, Zameen' became a foundational rallying cry for the broader Telangana statehood movement and indigenous rights activism across India." },
        { icon: "🎬", title: "Cultural Immortality", desc: "His life story continues to inspire literature, folk arts (like Gond painting), and modern popular culture, ensuring new generations learn of his bravery." }
    ];

    const galleryData = [
        { title: "Adilabad Forests", desc: "The dense forests that served as the backdrop and sanctuary for the resistance.", color: "#2d5a3f" },
        { title: "Gond Art", desc: "Traditional indigenous art forms that keep the cultural memory alive.", color: "#c05838" },
        { title: "Memorial at Asifabad", desc: "Modern tributes and statues honoring the Gond leader.", color: "#8B4513" },
        { title: "Tribal Heritage", desc: "Representing the dignity and resilience of the Gond community.", color: "#1a3c27" }
    ];

    const referencesData = [
        "Das, Kalpana. <em>Life and Times of Komaram Bheem</em>. Hyderabad: Telangana Sahitya Akademi.",
        "Hardiman, David. <em>The Coming of the Devi: Adivasi Assertion in Western India</em>. (Provides comparative context on tribal resistance).",
        "Telangana State Government Archives: Documentation on the renaming of Asifabad and state commemorative events.",
        "Oral History Projects: Gond tribal narratives collected by regional anthropologists and historians."
    ];

    // 2. Render Functions
    function renderTimeline() {
        const container = document.getElementById('timeline-list');
        container.innerHTML = timelineData.map(item => `
            <div class="timeline-item">
                <span class="timeline-year">${item.year}</span>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            </div>
        `).join('');
    }

    function renderGrids() {
        // Resistance
        document.getElementById('resistance-grid').innerHTML = resistanceData.map(item => `
            <article class="kb-card">
                <span class="kb-card-icon">${item.icon}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </article>
        `).join('');

        // Legacy
        document.getElementById('legacy-grid').innerHTML = legacyData.map(item => `
            <article class="kb-card">
                <span class="kb-card-icon">${item.icon}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </article>
        `).join('');

        // Gallery (Using CSS colors as placeholders for actual images)
        document.getElementById('gallery-grid').innerHTML = galleryData.map(item => `
            <div class="gallery-item">
                <div style="width:100%; height:100%; background-color: ${item.color}; display:flex; align-items:center; justify-content:center; color:white; font-size:3rem;">
                    ${item.icon || '🖼️'}
                </div>
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `).join('');

        // References
        document.getElementById('references-grid').innerHTML = referencesData.map(ref => `<li>${ref}</li>`).join('');
    }

    // 3. Tab Logic for Jal, Jangal, Zameen
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.pillar-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 4. Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(section => {
        observer.observe(section);
    });

    // 5. Scroll to Top Button Logic
    const scrollTopBtn = document.getElementById('btn-scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize
    renderTimeline();
    renderGrids();
});
const sportsLogos = [
    {
        id: "bcci",
        name: "BCCI",
        sport: "Cricket",
        organization: "Board of Control for Cricket in India",
        logoUrl: "/logos/bcci.png",
        founded: "1928",
        symbolism: "Inspired by the Star of India and represents authority and heritage in Indian cricket.",
        history: "The emblem has been associated with Indian cricket administration for decades.",
        evolution: [
            "Historic crest versions",
            "Modern digital adaptation"
        ],
        source: "BCCI Archives"
    },
    {
        id: "hockey-india",
        name: "Hockey India",
        sport: "Hockey",
        organization: "Hockey India",
        logoUrl: "/logos/hockey-india.png",
        founded: "2009",
        symbolism: "Features a stylized hockey player representing speed and modern Indian hockey.",
        history: "Introduced following the establishment of Hockey India.",
        source: "Hockey India"
    },
    {
        id: "pkl",
        name: "Pro Kabaddi League",
        sport: "Kabaddi",
        organization: "PKL",
        logoUrl: "/logos/pkl.png",
        founded: "2014",
        symbolism: "Highlights action, energy, and the traditional roots of kabaddi.",
        history: "Created with the launch of the professional league.",
        source: "PKL Media Guide"
    },
    {
        id: "ioa",
        name: "Indian Olympic Association",
        sport: "Olympic Sports",
        organization: "Indian Olympic Association",
        logoUrl: "/logos/ioa.png",
        founded: "1927",
        symbolism: "Represents India's Olympic movement and national identity.",
        history: "Used for Olympic representation and administration.",
        source: "IOA Archives"
    }
];

const sources = [
    "Board of Control for Cricket in India (BCCI)",
    "Hockey India",
    "Indian Olympic Association (IOA)",
    "Pro Kabaddi League",
    "Sports Authority of India",
    "Official Federation Branding Guidelines"
];

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Render Sources
    const sourcesList = document.getElementById("sources-list");
    sources.forEach(source => {
        const li = document.createElement("li");
        li.textContent = source;
        sourcesList.appendChild(li);
    });

    // 2. Render Gallery
    const gallery = document.getElementById("logo-gallery");
    const sportFilter = document.getElementById("sport-filter");

    function renderGallery(filterSport) {
        gallery.innerHTML = "";
        
        const filtered = sportsLogos.filter(item => {
            return filterSport === "all" || item.sport === filterSport;
        });

        if (filtered.length === 0) {
            gallery.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 2rem;">No logos found for this category.</div>`;
            return;
        }

        filtered.forEach(logo => {
            const card = document.createElement("div");
            card.className = "logo-card";
            
            // Create initials for the fallback placeholder
            const initials = logo.name.split(' ').map(w => w[0]).join('').substring(0, 3);
            
            card.innerHTML = `
                <div class="logo-placeholder">${initials}</div>
                <h3>${logo.organization}</h3>
                <span class="sport-badge">${logo.sport}</span>
            `;
            
            card.addEventListener("click", () => openModal(logo));
            gallery.appendChild(card);
        });
    }

    sportFilter.addEventListener("change", (e) => {
        renderGallery(e.target.value);
    });

    // Initial render
    renderGallery("all");

    // 3. Modal Logic
    const modal = document.getElementById("logo-modal");
    const closeBtn = document.getElementById("close-modal-btn");
    
    function openModal(logo) {
        // Populate modal data
        const modalLogo = document.getElementById("modal-logo");
        const initials = logo.name.split(' ').map(w => w[0]).join('').substring(0, 3);
        modalLogo.innerHTML = `<div class="logo-placeholder">${initials}</div>`;
        
        document.getElementById("modal-org-name").textContent = logo.organization;
        document.getElementById("modal-sport").textContent = logo.sport;
        document.getElementById("modal-founded").textContent = `Founded: ${logo.founded}`;
        
        document.getElementById("modal-history").textContent = logo.history;
        document.getElementById("modal-symbolism").textContent = logo.symbolism;
        
        // Evolution
        const evolutionGroup = document.getElementById("modal-evolution-group");
        const evolutionTimeline = document.getElementById("modal-evolution-timeline");
        evolutionTimeline.innerHTML = "";
        
        if (logo.evolution && logo.evolution.length > 0) {
            logo.evolution.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                evolutionTimeline.appendChild(li);
            });
            evolutionGroup.style.display = "block";
        } else {
            evolutionGroup.style.display = "none";
        }
        
        document.getElementById("modal-source").textContent = logo.source;
        
        // Show modal
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    
    // Close on clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
});

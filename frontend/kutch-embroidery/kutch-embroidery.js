/**
 * Kutch Embroidery Explorer - Interactive Engine
 * Features: Enriched datasets, search/filter functionality, accessible modals, and dynamic rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. ENRICHED DATASETS
    // ==========================================
    
    const regionalStyles = [
        {
            id: 'rabari',
            name: "Rabari",
            icon: "🪞",
            description: "Known for the extensive use of mirrors (abhla) in various shapes (round, triangular, square) and heavily decorated with chain stitches. Commonly uses vibrant colors like red, maroon, and yellow to reflect the desert landscape."
        },
        {
            id: 'ahir',
            name: "Ahir",
            icon: "🐄",
            description: "Characterized by round mirrors surrounded by intricate floral and bird motifs, typically executed in chain stitch and herringbone stitch. The background is often densely filled, leaving very little base fabric visible."
        },
        {
            id: 'jat',
            name: "Jat (Garasia Jat)",
            icon: "📐",
            description: "Features geometric patterns with closely clustered stitches and tiny mirrors. Known for its dense, rigid, and highly structured appearance, primarily found in the embroidery of the Garasia Jat community."
        },
        {
            id: 'mutwa',
            name: "Mutwa",
            icon: "🪡",
            description: "Features extremely fine, delicate stitching with tiny mirrors. Mutwa embroidery includes a variety of intricate styles like Mukko, Kharek, and Suf, renowned for precise, counted-thread needlework."
        },
        {
            id: 'sodha',
            name: "Sodha",
            icon: "🌺",
            description: "Distinguished by its bold use of primary colors (especially red and black) and large, prominent mirrors. The motifs are often larger and less densely packed than in Rabari or Ahir styles."
        },
        {
            id: 'kathi',
            name: "Kathi",
            icon: "🐎",
            description: "Traditionally done by the Kathi community (horse breeders). Characterized by the use of the 'Kathi' stitch, featuring bold geometric designs and a distinctive color palette of red, black, and white."
        }
    ];

    const stitches = [
        {
            id: 'chain',
            name: "Chain Stitch (Sankli)",
            category: "outline",
            region: "Kutch General",
            description: "A series of looped stitches forming a chain-like pattern. It is the foundational stitch extensively used to outline motifs and fill spaces in Ahir and Rabari embroidery."
        },
        {
            id: 'buttonhole',
            name: "Buttonhole Stitch",
            category: "mirror",
            region: "Rabari / Mutwa",
            description: "Commonly used to fix mirrors (abhla) securely onto the fabric, creating a decorative, raised border around the glass that prevents it from falling out."
        },
        {
            id: 'herringbone',
            name: "Herringbone Stitch",
            category: "fill",
            region: "Ahir",
            description: "A crossed, V-shaped stitch used for filling larger areas of motifs, adding rich texture, depth, and a woven appearance to the embroidered patterns."
        },
        {
            id: 'darning',
            name: "Darning Stitch (Suf)",
            category: "fill",
            region: "Suf / Mutwa",
            description: "A counted-thread embroidery technique done from the back of the fabric. It creates precise, reversible geometric and symmetrical designs without the need for outlined patterns."
        },
        {
            id: 'pakko',
            name: "Pakko (Square Chain)",
            category: "fill",
            region: "Kutch General",
            description: "A variation of the chain stitch worked in square or rectangular blocks. It creates a highly durable, raised, and textured surface, often used for filling geometric motifs."
        },
        {
            id: 'ari',
            name: "Ari (Hook) Stitch",
            category: "outline",
            region: "Kutch General",
            description: "Executed using a small hooked needle (ari) from the underside of the fabric, creating a fine, continuous chain stitch that resembles machine embroidery."
        }
    ];

    const motifs = [
        {
            id: 'mor',
            name: "Peacock (Mor)",
            category: "nature",
            significance: "A ubiquitous motif symbolizing beauty, grace, and the onset of the life-giving monsoons. Frequently used as a central focal point in Ahir and Rabari embroidery."
        },
        {
            id: 'popat',
            name: "Parrot (Popat)",
            category: "nature",
            significance: "Symbolizes love, passion, and marital bliss. Often depicted in pairs facing each other, representing harmony and companionship."
        },
        {
            id: 'hathi',
            name: "Elephant (Hathi)",
            category: "animal",
            significance: "Represents strength, royalty, wisdom, and prosperity. Commonly found adorning borders, central panels, and ceremonial garments."
        },
        {
            id: 'keri',
            name: "Mango (Keri) / Paisley",
            category: "nature",
            significance: "An ancient symbol of fertility, abundance, and prosperity. It is widely used across all styles of Kutch embroidery, often filling the corners of shawls and skirts."
        },
        {
            id: 'phool',
            name: "Floral Patterns (Phool)",
            category: "nature",
            significance: "Various flowers (like lotuses and roses) are used to depict the beauty of nature, the blossoming of life, and the vibrant flora of the region."
        },
        {
            id: 'kalpavriksha',
            name: "Tree of Life (Kalpavriksha)",
            category: "mythology",
            significance: "A majestic motif representing the connection between the earth and the heavens, fertility, and eternal life. Often features birds and animals within its branches."
        },
        {
            id: 'machhli',
            name: "Fish (Machhli)",
            category: "animal",
            significance: "Symbolizes good luck, fertility, and protection against the evil eye. Commonly used in bridal embroidery and household textiles."
        }
    ];

    // ==========================================
    // 2. DOM ELEMENTS & STATE
    // ==========================================
    
    const stylesContainer = document.getElementById('regional-styles-container');
    const stitchGallery = document.getElementById('stitch-gallery');
    const motifGallery = document.getElementById('motif-gallery');
    
    // Modal Elements
    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalRegion = document.getElementById('modal-region');
    const modalDesc = document.getElementById('modal-desc');
    const closeModalBtn = document.getElementById('close-modal');

    // Search & Filter Elements
    const stitchSearch = document.getElementById('stitch-search');
    const motifSearch = document.getElementById('motif-search');
    const stitchFilters = document.querySelectorAll('.stitch-filter-btn');
    const motifFilters = document.querySelectorAll('.motif-filter-btn');

    let activeStitchFilter = 'all';
    let activeMotifFilter = 'all';

    // ==========================================
    // 3. RENDERING FUNCTIONS
    // ==========================================

    function renderRegionalStyles() {
        if (!stylesContainer) return;
        stylesContainer.innerHTML = regionalStyles.map(style => `
            <div class="style-row" data-id="${style.id}">
                <div class="style-icon" aria-hidden="true">${style.icon}</div>
                <div class="style-content">
                    <h3>${style.name}</h3>
                    <p>${style.description}</p>
                </div>
            </div>
        `).join('');
    }

    function renderStitches(filterText = '', category = 'all') {
        if (!stitchGallery) return;
        
        const filtered = stitches.filter(stitch => {
            const matchesText = stitch.name.toLowerCase().includes(filterText.toLowerCase()) || 
                                stitch.description.toLowerCase().includes(filterText.toLowerCase());
            const matchesCategory = category === 'all' || stitch.category === category;
            return matchesText && matchesCategory;
        });

        if (filtered.length === 0) {
            stitchGallery.innerHTML = `<p class="empty-state">No stitches found matching your search.</p>`;
            return;
        }

        stitchGallery.innerHTML = filtered.map(stitch => `
            <div class="interactive-card" role="button" tabindex="0" aria-label="View details for ${stitch.name}" data-id="${stitch.id}">
                <h3>${stitch.name}</h3>
                <span class="card-tag">${stitch.region}</span>
                <p class="card-hint">Click to view details</p>
            </div>
        `).join('');

        // Re-attach event listeners
        stitchGallery.querySelectorAll('.interactive-card').forEach(card => {
            card.addEventListener('click', () => {
                const stitch = stitches.find(s => s.id === card.dataset.id);
                if (stitch) openModal(stitch.name, `Region: ${stitch.region}`, stitch.description);
            });
            // Keyboard accessibility for cards
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    function renderMotifs(filterText = '', category = 'all') {
        if (!motifGallery) return;
        
        const filtered = motifs.filter(motif => {
            const matchesText = motif.name.toLowerCase().includes(filterText.toLowerCase()) || 
                                motif.significance.toLowerCase().includes(filterText.toLowerCase());
            const matchesCategory = category === 'all' || motif.category === category;
            return matchesText && matchesCategory;
        });

        if (filtered.length === 0) {
            motifGallery.innerHTML = `<p class="empty-state">No motifs found matching your search.</p>`;
            return;
        }

        motifGallery.innerHTML = filtered.map(motif => `
            <div class="interactive-card" role="button" tabindex="0" aria-label="View significance of ${motif.name}" data-id="${motif.id}">
                <h3>${motif.name}</h3>
                <span class="card-tag">${motif.category.charAt(0).toUpperCase() + motif.category.slice(1)}</span>
                <p class="card-hint">Click to view significance</p>
            </div>
        `).join('');

        // Re-attach event listeners
        motifGallery.querySelectorAll('.interactive-card').forEach(card => {
            card.addEventListener('click', () => {
                const motif = motifs.find(m => m.id === card.dataset.id);
                if (motif) openModal(motif.name, `Symbolism`, motif.significance);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    // ==========================================
    // 4. MODAL LOGIC (with Accessibility)
    // ==========================================

    function openModal(title, subtitle, desc) {
        if (!modal) return;
        modalTitle.textContent = title;
        modalRegion.textContent = subtitle || '';
        modalDesc.textContent = desc;
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Trap focus or at least move focus to modal for screen readers
        if (closeModalBtn) closeModalBtn.focus();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ==========================================
    // 5. EVENT LISTENERS: Search & Filter
    // ==========================================

    // Debounce utility for search performance
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    if (stitchSearch) {
        stitchSearch.addEventListener('input', debounce((e) => {
            renderStitches(e.target.value, activeStitchFilter);
        }, 300));
    }

    if (motifSearch) {
        motifSearch.addEventListener('input', debounce((e) => {
            renderMotifs(e.target.value, activeMotifFilter);
        }, 300));
    }

    stitchFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            stitchFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeStitchFilter = btn.dataset.category;
            renderStitches(stitchSearch ? stitchSearch.value : '', activeStitchFilter);
        });
    });

    motifFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            motifFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMotifFilter = btn.dataset.category;
            renderMotifs(motifSearch ? motifSearch.value : '', activeMotifFilter);
        });
    });

    // ==========================================
    // 6. INITIALIZATION
    // ==========================================
    renderRegionalStyles();
    renderStitches();
    renderMotifs();
    
    console.log('✅ Kutch Embroidery Explorer Engine Initialized Successfully');
});
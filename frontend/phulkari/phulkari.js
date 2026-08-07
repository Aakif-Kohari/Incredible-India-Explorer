document.addEventListener('DOMContentLoaded', () => {
    const patterns = [
        {
            name: "Bagh (Garden)",
            description: "A heavily embroidered piece where the entire base fabric is covered by stitches.",
            significance: "Considered highly auspicious, Baghs were traditionally crafted for special occasions like weddings and births.",
            image: "assets/culture.png"
        },
        {
            name: "Chope",
            description: "Embroidered on the borders using the holbein stitch, making the design appear identical on both sides.",
            significance: "Presented to the bride by her maternal grandmother during the wedding ceremony.",
            image: "assets/travel_hidden.png"
        },
        {
            name: "Sainchi Phulkari",
            description: "Features narrative motifs depicting village life, animals, birds, and people.",
            significance: "Acts as a fabric documentary of the contemporary socio-cultural life of rural Punjab.",
            image: "assets/hero_banner.png"
        },
        {
            name: "Thirma",
            description: "Characterised by white khaddar (handspun cotton) base, heavily embroidered with red or purple thread.",
            significance: "Traditionally worn by older women and widows as a symbol of purity and reverence.",
            image: "assets/heritage_temples.png"
        }
    ];

    const motifs = [
        {
            name: "Wheat Ear (Kanak)",
            description: "A recurring motif representing an ear of wheat.",
            meaning: "Symbolises prosperity, abundance, and the agrarian roots of Punjab.",
            image: "assets/travel_deserts.png"
        },
        {
            name: "Peacock (Mor)",
            description: "Stylised geometric representations of peacocks.",
            meaning: "Represents beauty, joy, and the celebration of life.",
            image: "assets/heritage_forts.png"
        },
        {
            name: "Lotus (Kamal)",
            description: "Floral shapes embroidered with precision.",
            meaning: "A universal symbol of purity and spirituality.",
            image: "assets/travel_mountains.png"
        }
    ];

    const attires = [
        {
            garment: "Phulkari Dupatta",
            description: "A long, brightly embroidered scarf worn over the head or shoulders.",
            context: "An essential accessory in traditional Punjabi suits for festive occasions.",
            image: "assets/culture.png"
        },
        {
            garment: "Kameez (Tunic)",
            description: "Modern adaptations often feature Phulkari work on the neckline or borders of tunics.",
            context: "Brings traditional artistry to contemporary festive and casual wear.",
            image: "assets/travel_hidden.png"
        }
    ];

    const colors = [
        {
            name: "Madder Red (Lal)",
            hex: "#D32F2F",
            description: "The most common and auspicious base color, symbolizing youth, passion, and vitality. Widely used for bridal Phulkaris."
        },
        {
            name: "Golden Yellow (Peela)",
            hex: "#FBC02D",
            description: "Represents the mustard fields (sarson) of Punjab, happiness, and prosperity."
        },
        {
            name: "Emerald Green (Hara)",
            hex: "#388E3C",
            description: "Symbolizes nature, fertility, and the lush agricultural landscape."
        },
        {
            name: "Indigo Blue (Neela)",
            hex: "#1976D2",
            description: "Often used as a contrast color, dyed using natural indigo."
        },
        {
            name: "White (Safed)",
            hex: "#F5F5F5",
            description: "Used as a base color in 'Thirma' Phulkaris, representing purity and peace."
        }
    ];

    // Modal elements
    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.getElementById('close-modal');

    function openModal(title, subtitle, desc) {
        modalTitle.textContent = title;
        modalSubtitle.textContent = subtitle ? `Details: ${subtitle}` : '';
        modalDesc.textContent = desc;
        modal.classList.add('active');
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Render Patterns
    const patternGallery = document.getElementById('pattern-explorer');
    if (patternGallery) {
        patterns.forEach(pattern => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <img src="${pattern.image}" alt="${pattern.name}" class="fabric-image" onerror="this.style.display='none'">
                <h3>${pattern.name}</h3>
                <p style="color: var(--text-light); font-size: 0.95rem; margin-bottom: 10px;">${pattern.description}</p>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto;">Click to view significance</p>
            `;
            card.addEventListener('click', () => {
                openModal(pattern.name, '', pattern.significance);
            });
            patternGallery.appendChild(card);
        });
    }

    // Render Motifs
    const motifGallery = document.getElementById('motif-gallery');
    if (motifGallery) {
        motifs.forEach(motif => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <img src="${motif.image}" alt="${motif.name}" class="fabric-image" onerror="this.style.display='none'">
                <h3>${motif.name}</h3>
                <p style="color: var(--text-light); font-size: 0.95rem; margin-bottom: 10px;">${motif.description}</p>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto;">Click to view meaning</p>
            `;
            card.addEventListener('click', () => {
                openModal(motif.name, '', motif.meaning);
            });
            motifGallery.appendChild(card);
        });
    }

    // Render Attires
    const attireGallery = document.getElementById('attire-showcase');
    if (attireGallery) {
        attires.forEach(attire => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.style.cursor = 'default';
            card.innerHTML = `
                <img src="${attire.image}" alt="${attire.garment}" class="fabric-image" onerror="this.style.display='none'">
                <h3>${attire.garment}</h3>
                <p style="color: var(--text-light); font-size: 0.95rem; margin-bottom: 10px;">${attire.description}</p>
                <p style="color: var(--text-muted); font-size: 0.85rem; font-style: italic; margin-top: auto;">Context: ${attire.context}</p>
            `;
            attireGallery.appendChild(card);
        });
    }

    // Render Color Palette
    const paletteContainer = document.getElementById('color-palette');
    if (paletteContainer) {
        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color.hex;
            swatch.title = color.name;
            swatch.addEventListener('click', () => {
                openModal(color.name, color.hex, color.description);
            });
            paletteContainer.appendChild(swatch);
        });
    }
});

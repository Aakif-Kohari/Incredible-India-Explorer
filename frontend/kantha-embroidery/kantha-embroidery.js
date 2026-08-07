document.addEventListener('DOMContentLoaded', () => {
    const stitches = [
        {
            name: "Running Stitch (Simple Kantha)",
            technique: "Basic running stitch",
            description: "The most common and fundamental Kantha stitch, used to bind layers of fabric together. It provides the characteristic wrinkled and wavy texture of Kantha textiles."
        },
        {
            name: "Lohori Kantha",
            technique: "Thick, closely set stitches",
            description: "Named after 'lohor' (wave), this stitch creates thick, undulating wavy patterns, often used to completely cover the fabric surface, giving it a rich texture."
        },
        {
            name: "Sujni Kantha",
            technique: "Outlined and filled",
            description: "Originating in Bihar and popular in Bengal, Sujni involves outlining motifs with a dark chain stitch and filling them with colorful running stitches."
        },
        {
            name: "Baiton Kantha",
            technique: "Geometric binding",
            description: "Used primarily for book covers or wrapping precious items. It features intricate geometric borders and a central lotus motif."
        }
    ];

    const fabrics = [
        {
            title: "Nakshi Kantha Blanket",
            image: "assets/culture.png", // Using existing asset as placeholder
            description: "A heavily embroidered quilt used as a light blanket in winters.",
            context: "Traditionally crafted as a dowry gift for a daughter, encapsulating memories and blessings in every thread."
        },
        {
            title: "Kantha Saree",
            image: "assets/travel_hidden.png",
            description: "A pure silk or cotton saree adorned with intricate Kantha stitches.",
            context: "A modern evolution of the traditional Kantha, now highly valued as elegant ethnic wear in India."
        },
        {
            title: "Oar (Pillow Cover)",
            image: "assets/heritage_temples.png",
            description: "Small rectangular covers embroidered for pillows and cushions.",
            context: "Often featuring simple geometric designs or floral creepers, used in daily household decor."
        }
    ];

    const patterns = [
        {
            name: "Lotus (Padma)",
            description: "The most common central motif in a Nakshi Kantha, symbolising the universe, purity, and life's blossoming.",
            image: "assets/hero_banner.png"
        },
        {
            name: "Tree of Life",
            description: "A motif representing fertility, growth, and the connection between heaven, earth, and the underworld.",
            image: "assets/travel_mountains.png"
        },
        {
            name: "Kalka (Paisley)",
            description: "A widespread motif shaped like a teardrop or mango, used extensively in the corners and borders of Kantha.",
            image: "assets/heritage_forts.png"
        },
        {
            name: "Fish (Machh)",
            description: "An auspicious symbol in Bengali culture representing prosperity, fertility, and abundance.",
            image: "assets/travel_deserts.png"
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

    // Render Stitches
    const stitchGallery = document.getElementById('stitch-gallery');
    if (stitchGallery) {
        stitches.forEach(stitch => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <div>
                    <h3>${stitch.name}</h3>
                    <p style="color: var(--text-light); font-size: 0.95rem; margin-bottom: 10px;">${stitch.technique}</p>
                </div>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto;">Click to view description</p>
            `;
            card.addEventListener('click', () => {
                openModal(stitch.name, stitch.technique, stitch.description);
            });
            stitchGallery.appendChild(card);
        });
    }

    // Render Fabrics
    const fabricGallery = document.getElementById('fabric-gallery');
    if (fabricGallery) {
        fabrics.forEach(fabric => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.style.cursor = 'default'; // non-interactive, just gallery
            card.innerHTML = `
                <img src="${fabric.image}" alt="${fabric.title}" class="fabric-image" onerror="this.style.display='none'">
                <h3>${fabric.title}</h3>
                <p style="color: var(--text-light); font-size: 0.95rem; margin-bottom: 10px;">${fabric.description}</p>
                <p style="color: var(--text-muted); font-size: 0.85rem; font-style: italic;">${fabric.context}</p>
            `;
            fabricGallery.appendChild(card);
        });
    }

    // Render Patterns
    const patternCollection = document.getElementById('pattern-collection');
    if (patternCollection) {
        patterns.forEach(pattern => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <img src="${pattern.image}" alt="${pattern.name}" class="fabric-image" onerror="this.style.display='none'">
                <h3>${pattern.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto;">Click to view significance</p>
            `;
            card.addEventListener('click', () => {
                openModal(pattern.name, '', pattern.description);
            });
            patternCollection.appendChild(card);
        });
    }
});

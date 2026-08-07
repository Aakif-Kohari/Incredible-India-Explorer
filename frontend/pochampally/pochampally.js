document.addEventListener('DOMContentLoaded', () => {
    // Dyeing Process Data
    const processSteps = [
        {
            title: "Yarn Preparation",
            description: "Cotton or silk yarns are prepared and stretched onto a wooden frame to ensure they are aligned tightly for the tying process.",
            image: "assets/culture.png"
        },
        {
            title: "Yarn Tying / Resist Binding",
            description: "Artisans meticulously tie sections of the yarn with rubber bindings or cotton threads according to a pre-calculated pattern. The tied areas will resist the dye.",
            image: "assets/travel_hidden.png"
        },
        {
            title: "Dyeing",
            description: "The tied bundles of yarn are immersed in a dye bath. The dye colors the exposed parts of the yarn, while the tied parts remain the original color.",
            image: "assets/heritage_temples.png"
        },
        {
            title: "Untying / Revealing",
            description: "Once the dyed yarn is dried, the ties are removed to reveal the un-dyed pattern underneath.",
            image: "assets/travel_mountains.png"
        },
        {
            title: "Repeating for Additional Colors",
            description: "For multi-colored ikats, the tying and dyeing process is repeated multiple times, requiring immense precision.",
            image: "assets/travel_deserts.png"
        },
        {
            title: "Weaving",
            description: "The dyed yarns are carefully arranged on the loom as the warp or weft (or both in double ikat). As weaving progresses, the intricate pattern slowly materializes.",
            image: "assets/hero_banner.png"
        },
        {
            title: "Finished Ikat Textile",
            description: "The final woven textile features the signature feathered edges where the dyed threads overlap, a hallmark of authentic handloom Ikat.",
            image: "assets/heritage_forts.png"
        }
    ];

    let currentStep = 0;
    const processContainer = document.getElementById('process-visualizer');

    function renderProcess() {
        if (!processContainer) return;
        
        let html = '';
        
        // Render Steps
        processSteps.forEach((step, index) => {
            html += `
                <div class="step-container ${index === currentStep ? 'active' : ''}" id="step-${index}">
                    <div class="step-number">${index + 1}</div>
                    <h3 style="color: var(--text-light); margin-bottom: 15px; font-size: 1.6rem;">${step.title}</h3>
                    <img src="${step.image}" alt="${step.title}" class="step-image" onerror="this.style.display='none'">
                    <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; max-width: 600px; margin: 0 auto;">${step.description}</p>
                </div>
            `;
        });

        // Render Controls
        html += `
            <div class="step-controls">
                <button class="btn-step" id="prev-step" ${currentStep === 0 ? 'disabled' : ''}>← Previous</button>
                <div class="progress-dots">
                    ${processSteps.map((_, i) => `<span class="progress-dot ${i === currentStep ? 'active' : ''}"></span>`).join('')}
                </div>
                <button class="btn-step" id="next-step" ${currentStep === processSteps.length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        `;
        
        processContainer.innerHTML = html;

        // Attach event listeners
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    renderProcess();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentStep < processSteps.length - 1) {
                    currentStep++;
                    renderProcess();
                }
            });
        }
    }

    renderProcess();

    // Pattern Data
    const patterns = [
        {
            name: "Chowka (Diamond)",
            description: "The classic geometric diamond shape, often interlocked or overlapping, forming the core identity of Pochampally designs.",
            image: "assets/culture.png"
        },
        {
            name: "Rumaal Design",
            description: "Inspired by the Telia Rumal handkerchiefs, these feature large grid-like structures with intricate motifs inside the squares.",
            image: "assets/travel_hidden.png"
        },
        {
            name: "Elephant Motif",
            description: "Traditional elephant figures rendered in a pixelated ikat style, symbolising royalty and strength.",
            image: "assets/heritage_temples.png"
        },
        {
            name: "Parrot Motif",
            description: "Stylised parrots often adorning the borders of sarees and dupattas, symbolising love and passion.",
            image: "assets/travel_mountains.png"
        }
    ];

    const weavingTechniques = [
        {
            title: "Single Ikat (Warp)",
            description: "Only the warp (vertical) yarns are tie-dyed before weaving. The weft remains a solid color. This produces a pattern that is visible but less complex.",
            image: "assets/travel_deserts.png"
        },
        {
            title: "Single Ikat (Weft)",
            description: "Only the weft (horizontal) yarns are tie-dyed. As the weaver passes the shuttle, the pattern is formed horizontally on the loom.",
            image: "assets/hero_banner.png"
        },
        {
            title: "Double Ikat",
            description: "Both warp and weft yarns are tie-dyed with extreme precision. The pattern only emerges perfectly when the dyed warp and weft intersect accurately during weaving. It requires masterful skill.",
            image: "assets/heritage_forts.png"
        }
    ];

    // Modal elements
    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.getElementById('close-modal');

    function openModal(title, desc) {
        modalTitle.textContent = title;
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
    const patternGallery = document.getElementById('pattern-gallery');
    if (patternGallery) {
        patterns.forEach(pattern => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <img src="${pattern.image}" alt="${pattern.name}" class="fabric-image" onerror="this.style.display='none'">
                <h3>${pattern.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto;">Click to view details</p>
            `;
            card.addEventListener('click', () => {
                openModal(pattern.name, pattern.description);
            });
            patternGallery.appendChild(card);
        });
    }

    // Render Weaving Techniques
    const weavingGallery = document.getElementById('weaving-techniques');
    if (weavingGallery) {
        weavingTechniques.forEach(tech => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.style.cursor = 'default';
            card.innerHTML = `
                <img src="${tech.image}" alt="${tech.title}" class="fabric-image" onerror="this.style.display='none'">
                <h3>${tech.title}</h3>
                <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">${tech.description}</p>
            `;
            weavingGallery.appendChild(card);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Process Data
    const processSteps = [
        {
            title: "Raw Materials",
            description: "Scrap bell metal or a careful mixture of copper and tin is gathered. The exact ratio determines the resonance, durability, and color of the final product.",
            image: "assets/culture.png"
        },
        {
            title: "Melting",
            description: "The metal is placed in graphite crucibles and melted in traditional earthen furnaces reaching extreme temperatures using coal or wood.",
            image: "assets/travel_hidden.png"
        },
        {
            title: "Mould Preparation",
            description: "For casting, clay or sand moulds are prepared. In the lost-wax (Dhokra) technique, a wax model is created, covered in clay, and then the wax is melted out.",
            image: "assets/heritage_temples.png"
        },
        {
            title: "Casting",
            description: "The molten bell metal is carefully poured into the hollow cavity of the mould, where it takes the shape of the negative space.",
            image: "assets/travel_mountains.png"
        },
        {
            title: "Cooling & Beating",
            description: "The metal is left to cool and solidify. In forging techniques (like in Sarthebari), the hot metal is repeatedly beaten into shape with heavy hammers.",
            image: "assets/travel_deserts.png"
        },
        {
            title: "Finishing",
            description: "Once cooled, the mould is broken (if lost-wax) or the item is taken out. Rough edges are filed, and intricate carvings or engravings may be added.",
            image: "assets/hero_banner.png"
        },
        {
            title: "Polishing",
            description: "The final craft is rigorously polished using sand, tamarind water, or modern buffers to achieve its signature golden-bronze gleam.",
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

    // Product Data
    const products = [
        {
            name: "Xorai",
            region: "Assam",
            description: "A traditional offering tray with a stand, often with a lid. It is a symbol of Assamese culture, used to offer betel nuts or prasad.",
            image: "assets/culture.png"
        },
        {
            name: "Dhokra Figurine",
            region: "Chhattisgarh",
            description: "Intricate, rustic figurines made using the lost-wax casting technique. Common themes include tribal deities, horses, and elephants.",
            image: "assets/travel_hidden.png"
        },
        {
            name: "Temple Bell (Ghanta)",
            region: "Odisha",
            description: "Large, resonant bells cast for temples. The specific alloy composition ensures a deep, lingering sound.",
            image: "assets/heritage_temples.png"
        },
        {
            name: "Bata",
            region: "Assam",
            description: "A small, deep bowl used for serving areca nuts and betel leaves to guests.",
            image: "assets/travel_mountains.png"
        }
    ];

    const traditionalUses = [
        {
            title: "Health & Ayurveda",
            description: "Eating and drinking from bell metal utensils is considered highly beneficial in Ayurveda for balancing the doshas and improving digestion.",
            image: "assets/travel_deserts.png"
        },
        {
            title: "Religious Rituals",
            description: "Its resonance makes it the prime material for bells and cymbals used in religious chants and ceremonies across India.",
            image: "assets/hero_banner.png"
        },
        {
            title: "Cultural Gifting",
            description: "In many regions, gifting bell metal utensils (like the Xorai in Assam) to a bride or a distinguished guest is a sign of immense respect.",
            image: "assets/heritage_forts.png"
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
        modalSubtitle.textContent = subtitle ? `Region: ${subtitle}` : '';
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

    // Render Products
    const productGallery = document.getElementById('product-gallery');
    if (productGallery) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.style.display='none'">
                <h3>${product.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: auto;">Click to view details</p>
            `;
            card.addEventListener('click', () => {
                openModal(product.name, product.region, product.description);
            });
            productGallery.appendChild(card);
        });
    }

    // Render Uses
    const usesGallery = document.getElementById('traditional-uses');
    if (usesGallery) {
        traditionalUses.forEach(use => {
            const card = document.createElement('div');
            card.className = 'interactive-card';
            card.style.cursor = 'default';
            card.innerHTML = `
                <img src="${use.image}" alt="${use.title}" class="product-image" onerror="this.style.display='none'">
                <h3>${use.title}</h3>
                <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">${use.description}</p>
            `;
            usesGallery.appendChild(card);
        });
    }
});

(function() {
    'use strict';

    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const regionTitle = document.getElementById('region-title');
    const regionDesc = document.getElementById('region-desc');
    const attireGrid = document.getElementById('attire-grid');
    const textilesGrid = document.getElementById('textiles-grid');
    const techniquesGrid = document.getElementById('techniques-grid');
    
    // Modal Elements
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    let currentFocus = null;

    // Initialize the module
    function init() {
        renderTechniques();
        
        // Setup Tab Listeners
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const regionName = e.target.getAttribute('data-region');
                setActiveTab(e.target);
                renderRegionContent(regionName);
            });
            
            // Keyboard navigation for tabs
            btn.addEventListener('keydown', (e) => {
                const index = Array.from(tabBtns).indexOf(e.target);
                let newIndex;
                
                if (e.key === 'ArrowRight') {
                    newIndex = (index + 1) % tabBtns.length;
                    tabBtns[newIndex].focus();
                } else if (e.key === 'ArrowLeft') {
                    newIndex = (index - 1 + tabBtns.length) % tabBtns.length;
                    tabBtns[newIndex].focus();
                }
            });
        });

        // Setup Modal Listeners
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
                closeModal();
            }
            if (e.key === 'Tab' && modal.getAttribute('aria-hidden') === 'false') {
                trapFocus(e);
            }
        });

        // Initial Render (North India)
        renderRegionContent("North India");
    }

    function setActiveTab(selectedTab) {
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        selectedTab.classList.add('active');
        selectedTab.setAttribute('aria-selected', 'true');
    }

    function renderRegionContent(regionName) {
        const data = regionData[regionName];
        if (!data) return;

        // Update Headers
        regionTitle.textContent = regionName;
        regionDesc.textContent = data.description;

        // Render Attire
        attireGrid.innerHTML = '';
        data.attire.forEach(item => {
            const card = document.createElement('div');
            card.className = 'attire-card';
            card.setAttribute('tabindex', '0');
            card.innerHTML = `
                <div class="card-icon" aria-hidden="true">${item.image}</div>
                <div class="card-category">${item.category} • ${item.state}</div>
                <h4 class="card-title">${item.name}</h4>
                <div class="card-fabric">🧵 ${item.fabric}</div>
                <p class="card-desc">${item.description.substring(0, 80)}...</p>
            `;
            
            // Add event listeners for modal
            card.addEventListener('click', () => openAttireModal(item));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openAttireModal(item);
                }
            });

            attireGrid.appendChild(card);
        });

        // Render Textiles
        textilesGrid.innerHTML = '';
        data.textiles.forEach(textile => {
            const card = document.createElement('div');
            card.className = 'textile-card';
            card.innerHTML = `
                <h4>${textile.name}</h4>
                <p><strong>Region:</strong> ${textile.state}</p>
                <p><strong>Material:</strong> ${textile.material}</p>
                <p><strong>Traits:</strong> ${textile.characteristics}</p>
                <p><strong>Uses:</strong> ${textile.traditionalUses}</p>
            `;
            textilesGrid.appendChild(card);
        });
    }

    function renderTechniques() {
        techniquesGrid.innerHTML = '';
        weavingTechniques.forEach(tech => {
            const item = document.createElement('div');
            item.className = 'technique-item';
            item.innerHTML = `
                <h4>${tech.name}</h4>
                <p>${tech.description}</p>
            `;
            techniquesGrid.appendChild(item);
        });
    }

    function openAttireModal(item) {
        currentFocus = document.activeElement;
        
        modalBody.innerHTML = `
            <div style="text-align: center; font-size: 5rem; margin-bottom: 1rem;">${item.image}</div>
            <h2 id="modal-title">${item.name}</h2>
            <span class="modal-badge">${item.category}</span>
            <span class="modal-badge">${item.state}</span>
            
            <div class="detail-row">
                <div class="detail-label">Fabric</div>
                <div class="detail-value">${item.fabric}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Technique</div>
                <div class="detail-value">${item.technique}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Description</div>
                <div class="detail-value">${item.description}</div>
            </div>
            <div class="detail-row" style="border-bottom: none;">
                <div class="detail-label">Cultural Use</div>
                <div class="detail-value">${item.culturalUse}</div>
            </div>
        `;

        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        if (currentFocus) {
            currentFocus.focus();
        }
    }

    function trapFocus(e) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    // Run initialization
    document.addEventListener('DOMContentLoaded', init);

})();

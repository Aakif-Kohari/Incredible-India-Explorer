import armoryData from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const { artifacts, empires, physics, metallurgy, filters } = armoryData;

  // DOM Elements
  const empireGrid = document.getElementById('empire-grid');
  const physicsGrid = document.getElementById('physics-grid');
  const metallurgyContent = document.getElementById('metallurgy-content');
  const artifactGrid = document.getElementById('artifact-grid');
  const typeFilter = document.getElementById('type-filter');
  const regionFilter = document.getElementById('region-filter');
  const searchInput = document.getElementById('search-input');
  const noResults = document.getElementById('no-results');

  const modalOverlay = document.getElementById('artifact-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBody = document.getElementById('modal-body');

  // --- Render Empires ---
  const renderEmpires = () => {
    empires.forEach(empire => {
      const card = document.createElement('div');
      card.className = 'empire-card';
      
      const highlightsHtml = empire.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('');
      
      card.innerHTML = `
        <h4>${empire.name}</h4>
        <p>${empire.description}</p>
        <div class="empire-highlights">${highlightsHtml}</div>
      `;
      empireGrid.appendChild(card);
    });
  };

  // --- Render Physics ---
  const renderPhysics = () => {
    physics.forEach(item => {
      const card = document.createElement('div');
      card.className = 'physics-card';
      card.innerHTML = `
        <div class="physics-icon" aria-hidden="true">${item.icon}</div>
        <h4 class="physics-title">${item.title}</h4>
        <div class="physics-concept"><i class="fas fa-microscope"></i> ${item.concept}</div>
        <p>${item.description}</p>
      `;
      physicsGrid.appendChild(card);
    });
  };

  // --- Render Metallurgy ---
  const renderMetallurgy = () => {
    const flowHtml = metallurgy.flow.map((step, index) => `
      <div class="flow-step">
        <div class="step-num">${index + 1}</div>
        <div class="step-content">
          <h5>${step.step}</h5>
          <p>${step.detail}</p>
        </div>
      </div>
    `).join('');

    metallurgyContent.innerHTML = `
      <div class="metal-intro">
        <h3><i class="fas fa-fire"></i> ${metallurgy.title}</h3>
        <p>${metallurgy.description}</p>
      </div>
      <div class="flow-diagram">
        ${flowHtml}
      </div>
    `;
  };

  // --- Setup Filters ---
  const setupFilters = () => {
    // Populate Types
    filters.types.forEach(type => {
      const option = document.createElement('option');
      option.value = type === 'All Types' ? 'All' : type;
      option.textContent = type;
      typeFilter.appendChild(option);
    });

    // Populate Regions
    filters.regions.forEach(region => {
      const option = document.createElement('option');
      option.value = region === 'All Regions' ? 'All' : region;
      option.textContent = region;
      regionFilter.appendChild(option);
    });

    typeFilter.addEventListener('change', filterArtifacts);
    regionFilter.addEventListener('change', filterArtifacts);
    searchInput.addEventListener('input', filterArtifacts);
  };

  // --- Render Artifacts ---
  const filterArtifacts = () => {
    const term = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedRegion = regionFilter.value;

    const filtered = artifacts.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(term) || item.material.toLowerCase().includes(term);
      const matchesType = selectedType === 'All' || item.type.includes(selectedType);
      const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion || item.region === 'Pan-India';

      return matchesSearch && matchesType && matchesRegion;
    });

    renderGallery(filtered);
  };

  const renderGallery = (items) => {
    artifactGrid.innerHTML = '';
    
    if (items.length === 0) {
      noResults.style.display = 'block';
      return;
    }
    noResults.style.display = 'none';

    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'artifact-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View details for ${item.name}`);

      card.innerHTML = `
        <div class="artifact-image" aria-hidden="true">${item.icon}</div>
        <div class="artifact-info">
          <h4>${item.name}</h4>
          <div class="artifact-type">${item.type}</div>
          <p>${item.description}</p>
          <div class="artifact-readmore">Inspect Artifact <i class="fas fa-arrow-right"></i></div>
        </div>
      `;

      card.addEventListener('click', () => openModal(item));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(item);
        }
      });

      artifactGrid.appendChild(card);
    });
  };

  // --- Modal Logic ---
  const openModal = (item) => {
    modalBody.innerHTML = `
      <div class="modal-hero" aria-hidden="true">${item.icon}</div>
      <div class="modal-details">
        <h2 class="modal-title">${item.name}</h2>
        
        <div class="modal-meta-grid">
          <div class="meta-item">
            <span class="meta-label">Type</span>
            <span class="meta-value">${item.type}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Region</span>
            <span class="meta-value">${item.region}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Historical Period</span>
            <span class="meta-value">${item.period}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Primary Material</span>
            <span class="meta-value">${item.material}</span>
          </div>
        </div>
        
        <div class="modal-section">
          <h4><i class="fas fa-book"></i> Historical Description</h4>
          <p>${item.description}</p>
        </div>
        
        <div class="modal-section">
          <h4><i class="fas fa-landmark"></i> Cultural Significance & Associations</h4>
          <p>${item.significance}</p>
          <p style="margin-top: 0.5rem; color: var(--armory-brass);"><strong>Associated with:</strong> ${item.associations.join(', ')}</p>
        </div>
        
        <div class="modal-section" style="margin-bottom: 0;">
          <h4><i class="fas fa-atom"></i> Engineering Principle</h4>
          <p>${item.physicsPrinciple}</p>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    closeModalBtn.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Initialization ---
  renderEmpires();
  renderPhysics();
  renderMetallurgy();
  setupFilters();
  filterArtifacts();
});

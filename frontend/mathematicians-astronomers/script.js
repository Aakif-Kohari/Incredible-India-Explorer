import scholarsData from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const { scholars, concepts, filters } = scholarsData;

  // DOM Elements
  const conceptsGrid = document.getElementById('concepts-grid');
  const timelineControls = document.getElementById('timeline-controls');
  const scholarTimeline = document.getElementById('scholar-timeline');
  const noResults = document.getElementById('no-results');
  
  const modalOverlay = document.getElementById('scholar-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBody = document.getElementById('modal-body');

  let activeFilter = 'All';

  // --- Render Concepts ---
  const renderConcepts = () => {
    concepts.forEach(concept => {
      const card = document.createElement('div');
      card.className = 'concept-card';
      
      card.innerHTML = `
        <div class="concept-header">
          <div class="concept-icon" aria-hidden="true">${concept.icon}</div>
          <h4>${concept.title}</h4>
        </div>
        <p class="concept-desc">${concept.description}</p>
        ${concept.visualHtml}
      `;
      conceptsGrid.appendChild(card);
    });
  };

  // --- Render Timeline Controls ---
  const renderControls = () => {
    filters.forEach(filter => {
      const btn = document.createElement('button');
      btn.className = `filter-btn ${filter === activeFilter ? 'active' : ''}`;
      btn.textContent = filter;
      btn.setAttribute('aria-pressed', filter === activeFilter);
      
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        activeFilter = filter;
        filterTimeline();
      });
      
      timelineControls.appendChild(btn);
    });
  };

  // --- Render Timeline ---
  const filterTimeline = () => {
    const items = document.querySelectorAll('.timeline-item');
    let visibleCount = 0;

    items.forEach(item => {
      const fields = JSON.parse(item.dataset.fields);
      if (activeFilter === 'All' || fields.includes(activeFilter)) {
        item.classList.remove('hidden');
        // Reset animation state
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50);
        visibleCount++;
      } else {
        item.classList.add('hidden');
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
      }
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  };

  const initTimeline = () => {
    scholarTimeline.innerHTML = '';
    
    scholars.forEach(scholar => {
      const item = document.createElement('article');
      item.className = 'timeline-item';
      item.dataset.fields = JSON.stringify(scholar.fields);
      
      const fieldsHtml = scholar.fields.map(f => `<span class="field-tag">${f}</span>`).join('');
      
      item.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content" tabindex="0" aria-label="View details for ${scholar.name}">
          <div class="scholar-header">
            <div class="scholar-icon" aria-hidden="true">${scholar.icon}</div>
            <div>
              <h4>${scholar.name}</h4>
            </div>
          </div>
          <div class="scholar-period">
            <i class="far fa-clock"></i> ${scholar.period}
          </div>
          <div class="scholar-fields">${fieldsHtml}</div>
          <div class="scholar-work"><strong>Major Work:</strong> ${scholar.majorWork}</div>
          <p>${scholar.description.substring(0, 100)}...</p>
          <div class="read-more">Read Full Profile <i class="fas fa-arrow-right"></i></div>
        </div>
      `;

      const contentBox = item.querySelector('.timeline-content');
      contentBox.addEventListener('click', () => openModal(scholar));
      contentBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(scholar);
        }
      });

      scholarTimeline.appendChild(item);
    });
    
    // Initial animation state
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });
    
    setTimeout(filterTimeline, 100);
  };

  // --- Modal Logic ---
  const openModal = (scholar) => {
    const listHtml = scholar.contributions.map(c => `<li>${c}</li>`).join('');
    
    modalBody.innerHTML = `
      <div class="modal-header-banner">
        <div class="scholar-icon" aria-hidden="true">${scholar.icon}</div>
        <div class="modal-title-area">
          <h2>${scholar.name}</h2>
          <div class="scholar-period" style="color: #cbd5e1; margin-bottom: 0;">
            <i class="far fa-clock"></i> ${scholar.period} | <i class="fas fa-map-marker-alt"></i> ${scholar.location}
          </div>
        </div>
      </div>
      
      <div class="modal-body-content">
        <div class="modal-section">
          <h4><i class="fas fa-book-open"></i> Historical Significance</h4>
          <p>${scholar.description}</p>
          <p style="margin-top: 0.8rem; color: #93c5fd;"><strong>Notable Work:</strong> ${scholar.majorWork}</p>
        </div>
        
        <div class="modal-section" style="margin-bottom: 0;">
          <h4><i class="fas fa-star"></i> Key Contributions</h4>
          <ul class="contributions-list">
            ${listHtml}
          </ul>
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
  
  // Setup intersection observer for scroll animations
  const setupObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  };

  // --- Initialization ---
  renderConcepts();
  renderControls();
  initTimeline();
  setupObserver();
});

import { streetFoods } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const foodGrid = document.getElementById('food-grid');
  const searchInput = document.getElementById('food-search');
  const regionFilter = document.getElementById('region-filter');
  const categoryBtns = document.querySelectorAll('.cat-btn');
  const noResults = document.getElementById('no-results');
  
  const modalOverlay = document.getElementById('food-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBody = document.getElementById('modal-body');

  let currentCategory = 'All';

  // Render Food Cards
  const renderGallery = (foods) => {
    foodGrid.innerHTML = '';
    
    if (foods.length === 0) {
      noResults.style.display = 'block';
      return;
    }
    
    noResults.style.display = 'none';

    foods.forEach((food) => {
      const card = document.createElement('article');
      card.className = 'food-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View details for ${food.name}`);
      
      // Get an emoji based on category
      let icon = '🥟';
      if (food.category === 'Meals') icon = '🍛';
      if (food.category === 'Spicy') icon = '🌶️';
      if (food.category === 'Sweets') icon = '🍬';

      card.innerHTML = `
        <div class="food-image-placeholder" aria-hidden="true">${icon}</div>
        <div class="food-info">
          <h3>${food.name}</h3>
          <div class="food-meta">
            <span class="food-state"><i class="fas fa-map-marker-alt"></i> ${food.state}</span>
            <span class="food-category">${food.category}</span>
          </div>
          <p class="food-desc">${food.description}</p>
          <div class="read-more">View Details <i class="fas fa-arrow-right"></i></div>
        </div>
      `;

      card.addEventListener('click', () => openModal(food, icon));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(food, icon);
        }
      });

      foodGrid.appendChild(card);
    });
  };

  // Filter Logic
  const filterFoods = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = regionFilter.value;
    
    const filtered = streetFoods.filter(food => {
      // Search matching (name, state, or ingredients)
      const matchesSearch = 
        food.name.toLowerCase().includes(searchTerm) || 
        food.state.toLowerCase().includes(searchTerm) ||
        food.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
        
      // Region matching
      const matchesRegion = selectedRegion === 'All' || food.region === selectedRegion;
      
      // Category matching
      const matchesCategory = currentCategory === 'All' || food.category === currentCategory;

      return matchesSearch && matchesRegion && matchesCategory;
    });

    renderGallery(filtered);
  };

  // Event Listeners for Filters
  searchInput.addEventListener('input', filterFoods);
  regionFilter.addEventListener('change', filterFoods);

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      filterFoods();
    });
  });

  // Modal Logic
  const openModal = (food, icon) => {
    const ingredientsHtml = food.ingredients.map(ing => `<span class="ingredient-chip">${ing}</span>`).join('');
    
    modalBody.innerHTML = `
      <div class="modal-hero" aria-hidden="true">${icon}</div>
      <div class="modal-details">
        <h2 class="modal-title">${food.name}</h2>
        <div class="modal-meta-bar">
          <span><i class="fas fa-map-marker-alt" style="color: var(--food-primary);"></i> ${food.origin}</span>
          <span><i class="fas fa-tag" style="color: var(--food-secondary);"></i> ${food.category}</span>
          <span><i class="fas fa-globe-asia" style="color: #38bdf8;"></i> ${food.region}</span>
        </div>
        
        <div class="modal-section">
          <h4><i class="fas fa-info-circle"></i> About</h4>
          <p>${food.description}</p>
        </div>
        
        <div class="modal-section">
          <h4><i class="fas fa-utensils"></i> Key Ingredients</h4>
          <div class="ingredients-list">
            ${ingredientsHtml}
          </div>
        </div>
        
        <div class="modal-section" style="margin-bottom: 0;">
          <h4><i class="fas fa-book-open"></i> Origin & History</h4>
          <p>${food.history}</p>
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

  // Initial Render
  renderGallery(streetFoods);
});

// Cuisine Cards - Vanilla JS card components for India Cuisine Explorer
import { CUISINE_TYPES, COURSE_TYPES, DIETARY_TYPES } from './cuisineTypes.js';
import { cuisineData, formatRating, getDietaryColor } from './cuisineData.js';

// Create Stat Card
export function createStatCard(value, label, icon = '', color = '#FF6B6B') {
  const card = document.createElement('div');
  card.className = 'cuisine-stat-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${color}22, ${color}11);
    border: 1px solid ${color}33;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
  `;
  card.innerHTML = `
    <div style="font-size: 24px; margin-bottom: 8px;">${icon}</div>
    <div style="font-size: 28px; font-weight: 700; color: ${color};">${value}</div>
    <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">${label}</div>
  `;
  return card;
}

// Create Recipe Card
export function createRecipeCard(recipe, onSelect) {
  const card = document.createElement('div');
  card.className = 'cuisine-recipe-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  `;

  const dietaryBadges = recipe.dietary.map(d => {
    const type = DIETARY_TYPES.find(dt => dt.id === d);
    return `<span style="
      background: ${type?.color || '#666'}33;
      color: ${type?.color || '#ccc'};
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 10px;
      margin-right: 4px;
    ">${type?.name || d}</span>`;
  }).join('');

  card.innerHTML = `
    <div style="
      height: 140px;
      background: linear-gradient(135deg, ${recipe.cuisineColor}44, ${recipe.cuisineColor}22);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 64px;
    ">${recipe.image}</div>
    <div style="padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <h4 style="margin: 0; font-size: 15px; color: #f1f5f9;">${recipe.name}</h4>
        <span style="font-size: 14px;">${recipe.spiceLevelIcon}</span>
      </div>
      <p style="font-size: 12px; color: #94a3b8; margin: 0 0 12px;">${recipe.origin} • ${recipe.courseName}</p>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="font-size: 12px; color: #fbbf24;">★ ${formatRating(recipe.rating)}</span>
        <span style="font-size: 12px; color: #94a3b8;">⏱ ${recipe.prepTime + recipe.cookTime} min</span>
        <span style="font-size: 12px; color: #94a3b8;">🔥 ${recipe.calories} cal</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 4px;">
        ${dietaryBadges}
      </div>
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.borderColor = recipe.cuisineColor;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  });
  if (onSelect) card.addEventListener('click', () => onSelect(recipe));

  return card;
}

// Create Recipe Detail Panel
export function createRecipeDetailPanel(recipe) {
  const panel = document.createElement('div');
  panel.className = 'cuisine-recipe-detail';
  panel.style.cssText = `
    background: rgba(30, 41, 59, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 24px;
    margin-top: 20px;
  `;

  const ingredientList = recipe.ingredients.map(ing => `
    <li style="
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      margin-bottom: 4px;
      font-size: 13px;
      color: #cbd5e1;
      display: flex;
      justify-content: space-between;
    ">
      <span>${ing.name}</span>
      <span style="color: #94a3b8;">${ing.quantity}</span>
    </li>
  `).join('');

  const stepsList = recipe.steps.map((step, i) => `
    <li style="
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      margin-bottom: 8px;
      font-size: 13px;
      color: #cbd5e1;
      display: flex;
      gap: 12px;
    ">
      <span style="
        min-width: 28px;
        height: 28px;
        background: ${recipe.cuisineColor}33;
        color: ${recipe.cuisineColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 12px;
      ">${i + 1}</span>
      <span style="padding-top: 4px;">${step}</span>
    </li>
  `).join('');

  panel.innerHTML = `
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div style="
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, ${recipe.cuisineColor}44, ${recipe.cuisineColor}22);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 56px;
      ">${recipe.image}</div>
      <div style="flex: 1;">
        <h3 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">${recipe.name}</h3>
        <p style="margin: 0 0 12px; color: #94a3b8; font-size: 13px;">${recipe.description}</p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div style="text-align: center;">
            <div style="font-size: 18px; font-weight: 600; color: #fbbf24;">${formatRating(recipe.rating)}</div>
            <div style="font-size: 11px; color: #94a3b8;">Rating</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 18px; font-weight: 600; color: #60a5fa;">${recipe.prepTime + recipe.cookTime}m</div>
            <div style="font-size: 11px; color: #94a3b8;">Total Time</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 18px; font-weight: 600; color: #f87171;">${recipe.calories}</div>
            <div style="font-size: 11px; color: #94a3b8;">Calories</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 18px; font-weight: 600; color: #34d399;">${recipe.servings}</div>
            <div style="font-size: 11px; color: #94a3b8;">Servings</div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">🥄 Ingredients (${recipe.ingredients.length})</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">${ingredientList}</ul>
      </div>
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">📋 Instructions (${recipe.steps.length} steps)</h4>
        <ol style="list-style: none; padding: 0; margin: 0;">${stepsList}</ol>
      </div>
    </div>
  `;
  return panel;
}

// Create Cuisine Region Card
export function createCuisineRegionCard(region) {
  const card = document.createElement('div');
  card.className = 'cuisine-region-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
  `;

  const topDishes = region.topDishes.slice(0, 3).map(d => `
    <span style="
      background: ${region.color}22;
      color: ${region.color};
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
    ">${d}</span>
  `).join('');

  card.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <div style="
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, ${region.color}44, ${region.color}22);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      ">${region.icon}</div>
      <div>
        <h4 style="margin: 0; color: #f1f5f9; font-size: 15px;">${region.name}</h4>
        <p style="margin: 2px 0 0; font-size: 12px; color: #94a3b8;">${region.states.join(', ')}</p>
      </div>
    </div>
    <div style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; margin-bottom: 4px;">
        <span>Spice Level</span>
        <span style="color: ${region.color};">${region.spiceLevelIcon}</span>
      </div>
      <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px;">
        <div style="height: 100%; width: ${region.spiceLevel * 20}%; background: ${region.color}; border-radius: 3px;"></div>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 6px;">${topDishes}</div>
    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
      <div style="font-size: 12px; color: #94a3b8;">
        <span style="color: #60a5fa;">${region.recipeCount} recipes</span> • 
        <span style="color: #34d399;">${region.vegetarianPercentage}% vegetarian</span>
      </div>
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.borderColor = region.color;
    card.style.transform = 'translateY(-2px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    card.style.transform = 'translateY(0)';
  });
  return card;
}

// Create Spice Level Card
export function createSpiceLevelCard(level) {
  const card = document.createElement('div');
  card.className = 'cuisine-spice-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${level.color}22, ${level.color}11);
    border: 1px solid ${level.color}44;
    border-radius: 16px;
    padding: 16px;
    text-align: center;
    transition: transform 0.3s ease;
  `;
  card.innerHTML = `
    <div style="font-size: 32px; margin-bottom: 8px;">${level.icon}</div>
    <h4 style="margin: 0 0 4px; color: ${level.color}; font-size: 14px;">${level.name}</h4>
    <p style="margin: 0; font-size: 12px; color: #94a3b8;">${level.description}</p>
    <div style="margin-top: 12px; font-size: 20px; font-weight: 700; color: ${level.color};">${level.recipeCount}</div>
    <div style="font-size: 11px; color: #94a3b8;">recipes</div>
  `;
  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  return card;
}

// Create Cooking Method Card
export function createCookingMethodCard(method) {
  const card = document.createElement('div');
  card.className = 'cuisine-method-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
  `;
  card.innerHTML = `
    <div style="
      width: 44px;
      height: 44px;
      background: ${method.color}22;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    ">${method.icon}</div>
    <div style="flex: 1;">
      <h5 style="margin: 0; color: #f1f5f9; font-size: 13px;">${method.name}</h5>
      <p style="margin: 2px 0 0; font-size: 11px; color: #94a3b8;">${method.description}</p>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 16px; font-weight: 600; color: ${method.color};">${method.recipeCount}</div>
      <div style="font-size: 10px; color: #94a3b8;">recipes</div>
    </div>
  `;
  card.addEventListener('mouseenter', () => card.style.borderColor = method.color);
  card.addEventListener('mouseleave', () => card.style.borderColor = 'rgba(255, 255, 255, 0.1)');
  return card;
}

// Create Meal Plan Card
export function createMealPlanCard(mealPlan) {
  const card = document.createElement('div');
  card.className = 'cuisine-meal-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
  `;

  const mealItems = mealPlan.meals.map(meal => `
    <div style="
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      margin-bottom: 8px;
    ">
      <span style="font-size: 28px;">${meal.recipe.image}</span>
      <div style="flex: 1;">
        <div style="font-size: 13px; color: #f1f5f9; font-weight: 500;">${meal.recipe.name}</div>
        <div style="font-size: 11px; color: #94a3b8;">${meal.recipe.cuisineName} • ${meal.recipe.calories} cal</div>
      </div>
      <span style="font-size: 12px; color: #60a5fa;">${meal.time}</span>
    </div>
  `).join('');

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h4 style="margin: 0; color: #f1f5f9; font-size: 16px;">${mealPlan.name}</h4>
      <span style="
        background: #34d39922;
        color: #34d399;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
      ">${mealPlan.totalCalories} cal total</span>
    </div>
    ${mealItems}
    <div style="
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.1);
      font-size: 12px;
      color: #94a3b8;
    ">
      <span>🍽 ${mealPlan.meals.length} meals</span>
      <span>🥘 ${mealPlan.cuisines.join(', ')}</span>
    </div>
  `;
  return card;
}

// Create Filter Button Group
export function createFilterButtonGroup(options, onSelect) {
  const container = document.createElement('div');
  container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  `;

  let selectedId = options[0]?.id;

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'cuisine-filter-btn';
    btn.style.cssText = `
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid ${option.color || 'rgba(255,255,255,0.2)'}44;
      background: ${option.id === selectedId ? (option.color || '#60a5fa') + '33' : 'rgba(255,255,255,0.05)'};
      color: ${option.id === selectedId ? (option.color || '#60a5fa') : '#94a3b8'};
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    `;
    btn.innerHTML = `${option.icon || ''} ${option.name}`;
    btn.dataset.id = option.id;

    btn.addEventListener('click', () => {
      selectedId = option.id;
      container.querySelectorAll('.cuisine-filter-btn').forEach(b => {
        b.style.background = 'rgba(255,255,255,0.05)';
        b.style.color = '#94a3b8';
        b.style.borderColor = 'rgba(255,255,255,0.2)44';
      });
      btn.style.background = (option.color || '#60a5fa') + '33';
      btn.style.color = option.color || '#60a5fa';
      btn.style.borderColor = (option.color || '#60a5fa') + '44';
      if (onSelect) onSelect(option.id);
    });

    container.appendChild(btn);
  });

  return container;
}

// Create Search Input
export function createSearchInput(placeholder, onSearch) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: relative;
    margin-bottom: 16px;
  `;
  wrapper.innerHTML = `
    <input type="text" placeholder="${placeholder}" style="
      width: 100%;
      padding: 12px 16px 12px 44px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f1f5f9;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
    " />
    <span style="
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #94a3b8;
    ">🔍</span>
  `;

  const input = wrapper.querySelector('input');
  input.addEventListener('focus', () => input.style.borderColor = '#60a5fa');
  input.addEventListener('blur', () => input.style.borderColor = 'rgba(255, 255, 255, 0.1)');
  input.addEventListener('input', (e) => {
    if (onSearch) onSearch(e.target.value);
  });

  return wrapper;
}

// Create Pagination
export function createPagination(currentPage, totalPages, onPageChange) {
  const container = document.createElement('div');
  container.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
  `;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.style.cssText = `
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid ${i === currentPage ? '#60a5fa' : 'rgba(255,255,255,0.1)'};
      background: ${i === currentPage ? '#60a5fa33' : 'rgba(255,255,255,0.05)'};
      color: ${i === currentPage ? '#60a5fa' : '#94a3b8'};
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s ease;
    `;
    btn.textContent = i;
    btn.addEventListener('click', () => onPageChange(i));
    container.appendChild(btn);
  }

  return container;
}

// Create Nutritional Info Bar
export function createNutritionalBar(recipe) {
  const nutrients = [
    { name: 'Protein', value: recipe.protein, max: 50, color: '#f87171' },
    { name: 'Carbs', value: recipe.carbs, max: 100, color: '#fbbf24' },
    { name: 'Fat', value: recipe.fat, max: 50, color: '#60a5fa' },
    { name: 'Fiber', value: recipe.fiber, max: 20, color: '#34d399' }
  ];

  const container = document.createElement('div');
  container.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
  `;

  container.innerHTML = `
    <h4 style="margin: 0 0 12px; color: #f1f5f9; font-size: 14px;">📊 Nutrition per Serving</h4>
    ${nutrients.map(n => `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; margin-bottom: 4px;">
          <span>${n.name}</span>
          <span style="color: ${n.color};">${n.value}g</span>
        </div>
        <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px;">
          <div style="height: 100%; width: ${(n.value / n.max) * 100}%; background: ${n.color}; border-radius: 3px; transition: width 0.5s ease;"></div>
        </div>
      </div>
    `).join('')}
    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
      <span style="font-size: 20px; font-weight: 700; color: #fbbf24;">${recipe.calories}</span>
      <span style="font-size: 12px; color: #94a3b8;"> calories</span>
    </div>
  `;

  return container;
}

// Create Favorites List
export function createFavoritesList(favorites, onRemove) {
  const container = document.createElement('div');
  container.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
  `;

  if (favorites.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 40px; margin-bottom: 8px;">💝</div>
        <p style="color: #94a3b8; font-size: 13px; margin: 0;">No favorites yet. Click the heart on any recipe to add it here!</p>
      </div>
    `;
    return container;
  }

  container.innerHTML = `
    <h4 style="margin: 0 0 12px; color: #f1f5f9; font-size: 14px;">💝 Your Favorites (${favorites.length})</h4>
    ${favorites.map(recipe => `
      <div style="
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        margin-bottom: 8px;
      ">
        <span style="font-size: 28px;">${recipe.image}</span>
        <div style="flex: 1;">
          <div style="font-size: 13px; color: #f1f5f9;">${recipe.name}</div>
          <div style="font-size: 11px; color: #94a3b8;">${recipe.cuisineName} • ★ ${formatRating(recipe.rating)}</div>
        </div>
        <button class="remove-fav-btn" data-id="${recipe.id}" style="
          background: #f8717133;
          border: none;
          color: #f87171;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
        ">✕</button>
      </div>
    `).join('')}
  `;

  container.querySelectorAll('.remove-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      if (onRemove) onRemove(id);
    });
  });

  return container;
}

// Export all creators
export const CuisineCards = {
  createStatCard,
  createRecipeCard,
  createRecipeDetailPanel,
  createCuisineRegionCard,
  createSpiceLevelCard,
  createCookingMethodCard,
  createMealPlanCard,
  createFilterButtonGroup,
  createSearchInput,
  createPagination,
  createNutritionalBar,
  createFavoritesList
};

export default CuisineCards;
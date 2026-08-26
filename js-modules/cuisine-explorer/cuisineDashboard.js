// Cuisine Dashboard - Main dashboard page for India Cuisine Explorer
import { cuisineData, formatRating, getDietaryColor } from './cuisineData.js';
import { CUISINE_TYPES, SPICE_LEVELS, COOKING_METHODS, COURSE_TYPES } from './cuisineTypes.js';
import {
  createStatCard,
  createRecipeCard,
  createRecipeDetailPanel,
  createCuisineRegionCard,
  createSpiceLevelCard,
  createCookingMethodCard,
  createMealPlanCard,
  createFilterButtonGroup,
  createSearchInput,
  createNutritionalBar,
  createFavoritesList
} from './cuisineCards.js';
import {
  createCuisineTypePieChart,
  createSpiceLevelBarChart,
  createPopularityLineChart,
  createRegionRadarChart,
  createDietaryDonutChart,
  createCookingMethodChart,
  createRatingHeatmap,
  createNutritionGauge
} from './cuisineCharts.js';

export class CuisineExplorerDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found`);
      return;
    }

    this.activeTab = 'overview';
    this.searchQuery = '';
    this.selectedCuisine = 'all';
    this.selectedCourse = 'all';
    this.selectedDietary = 'all';
    this.selectedSpice = 'all';
    this.favorites = new Set();
    this.selectedRecipe = null;
    this.recipesPerPage = 8;
    this.currentPage = 1;

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = '';
    this.container.style.cssText = `
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      min-height: 100vh;
      padding: 24px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #f1f5f9;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
        <div style="font-size: 48px;">🍛</div>
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(90deg, #FF6B6B, #FFB347); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            India Cuisine Explorer
          </h1>
          <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">Discover the rich culinary heritage of India • 28 States • 8 Cuisine Types • 100+ Recipes</p>
        </div>
      </div>
    `;
    this.container.appendChild(header);

    // Tab Navigation
    const tabs = [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'recipes', name: 'Recipes', icon: '🍽' },
      { id: 'regions', name: 'Regional Cuisines', icon: '🗺' },
      { id: 'spice', name: 'Spice Levels', icon: '🌶' },
      { id: 'methods', name: 'Cooking Methods', icon: '👨‍🍳' },
      { id: 'meal-plans', name: 'Meal Plans', icon: '📋' }
    ];

    const tabBar = document.createElement('div');
    tabBar.style.cssText = `
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      padding: 8px;
      background: rgba(30, 41, 59, 0.5);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow-x: auto;
    `;

    tabs.forEach(tab => {
      const btn = document.createElement('button');
      btn.style.cssText = `
        padding: 12px 20px;
        border-radius: 12px;
        border: none;
        background: ${this.activeTab === tab.id ? 'linear-gradient(135deg, #FF6B6B, #FFB347)' : 'transparent'};
        color: ${this.activeTab === tab.id ? '#fff' : '#94a3b8'};
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      btn.innerHTML = `${tab.icon} ${tab.name}`;
      btn.dataset.tab = tab.id;
      btn.addEventListener('click', () => this.switchTab(tab.id));
      tabBar.appendChild(btn);
    });
    this.container.appendChild(tabBar);

    // Main Content
    const content = document.createElement('div');
    content.id = 'cuisine-content';
    content.style.cssText = 'min-height: 500px;';
    this.container.appendChild(content);

    // Render active tab
    this.renderTabContent();
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    this.selectedRecipe = null;
    this.currentPage = 1;
    this.render();
  }

  renderTabContent() {
    const content = document.getElementById('cuisine-content');
    if (!content) return;

    content.innerHTML = '';

    switch (this.activeTab) {
      case 'overview':
        this.renderOverviewTab(content);
        break;
      case 'recipes':
        this.renderRecipesTab(content);
        break;
      case 'regions':
        this.renderRegionsTab(content);
        break;
      case 'spice':
        this.renderSpiceTab(content);
        break;
      case 'methods':
        this.renderMethodsTab(content);
        break;
      case 'meal-plans':
        this.renderMealPlansTab(content);
        break;
    }
  }

  renderOverviewTab(container) {
    const stats = cuisineData.stats;

    // Stats Row
    const statsRow = document.createElement('div');
    statsRow.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    const statCards = [
      { value: stats.totalRecipes, label: 'Total Recipes', icon: '🍽', color: '#FF6B6B' },
      { value: stats.cuisineTypes, label: 'Cuisine Types', icon: '🍛', color: '#4ECDC4' },
      { value: `${stats.avgRating}★`, label: 'Avg Rating', icon: '⭐', color: '#FFB347' },
      { value: `${stats.vegetarianPercentage}%`, label: 'Vegetarian', icon: '🥬', color: '#34d399' },
      { value: stats.regionsCovered, label: 'Regions', icon: '🗺', color: '#60a5fa' },
      { value: stats.cookingMethods, label: 'Cooking Methods', icon: '👨‍🍳', color: '#a78bfa' }
    ];

    statCards.forEach(s => statsRow.appendChild(createStatCard(s.value, s.label, s.icon, s.color)));
    container.appendChild(statsRow);

    // Charts Row
    const chartsRow = document.createElement('div');
    chartsRow.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    `;

    // Cuisine Distribution Pie
    const pieContainer = document.createElement('div');
    pieContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const pieCanvas = document.createElement('canvas');
    pieCanvas.width = 350;
    pieCanvas.height = 280;
    pieContainer.appendChild(pieCanvas);
    chartsRow.appendChild(pieContainer);

    // Spice Level Bar
    const barContainer = document.createElement('div');
    barContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const barCanvas = document.createElement('canvas');
    barCanvas.width = 350;
    barCanvas.height = 280;
    barContainer.appendChild(barCanvas);
    chartsRow.appendChild(barContainer);

    container.appendChild(chartsRow);

    // Top Recipes Section
    const topSection = document.createElement('div');
    topSection.style.cssText = 'margin-bottom: 24px;';
    topSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">🌟 Top Rated Recipes</h3>
    `;

    const recipeGrid = document.createElement('div');
    recipeGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    `;

    const topRecipes = cuisineData.recipes
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    topRecipes.forEach(recipe => {
      recipeGrid.appendChild(createRecipeCard(recipe, (r) => this.showRecipeDetail(r)));
    });
    topSection.appendChild(recipeGrid);
    container.appendChild(topSection);

    // Regional Highlights
    const regionSection = document.createElement('div');
    regionSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">🗺 Regional Highlights</h3>
    `;

    const regionGrid = document.createElement('div');
    regionGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    `;

    cuisineData.cuisineRegions.slice(0, 3).forEach(region => {
      regionGrid.appendChild(createCuisineRegionCard(region));
    });
    regionSection.appendChild(regionGrid);
    container.appendChild(regionSection);

    // Initialize charts after DOM is ready
    setTimeout(() => {
      const cuisineData2 = cuisineData.cuisineTypes.map(ct => ({
        label: ct.name,
        value: ct.recipeCount,
        color: ct.color
      }));
      createCuisineTypePieChart(pieCanvas, cuisineData2);

      const spiceData = cuisineData.spiceLevels.map(sl => ({
        label: sl.name,
        value: sl.recipeCount,
        color: sl.color
      }));
      createSpiceLevelBarChart(barCanvas, spiceData);
    }, 100);
  }

  renderRecipesTab(container) {
    // Filters
    const filtersContainer = document.createElement('div');
    filtersContainer.style.cssText = 'margin-bottom: 20px;';

    // Search
    const searchInput = createSearchInput('Search recipes by name, ingredient, or cuisine...', (q) => {
      this.searchQuery = q.toLowerCase();
      this.currentPage = 1;
      this.renderRecipesGrid(gridContainer);
    });
    filtersContainer.appendChild(searchInput);

    // Filter rows
    const filterRow1 = document.createElement('div');
    filterRow1.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px;';

    const cuisineOptions = [{ id: 'all', name: 'All Cuisines', icon: '🍛' }, ...CUISINE_TYPES.map(ct => ({ id: ct.id, name: ct.name, icon: ct.icon, color: ct.color }))];
    const cuisineFilter = createFilterButtonGroup(cuisineOptions, (id) => {
      this.selectedCuisine = id;
      this.currentPage = 1;
      this.renderRecipesGrid(gridContainer);
    });
    filterRow1.appendChild(cuisineFilter);
    filtersContainer.appendChild(filterRow1);

    const filterRow2 = document.createElement('div');
    filterRow2.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px;';

    const courseOptions = [{ id: 'all', name: 'All Courses', icon: '🍽' }, ...COURSE_TYPES.map(ct => ({ id: ct.id, name: ct.name, icon: ct.icon }))];
    const courseFilter = createFilterButtonGroup(courseOptions, (id) => {
      this.selectedCourse = id;
      this.currentPage = 1;
      this.renderRecipesGrid(gridContainer);
    });
    filterRow2.appendChild(courseFilter);
    filtersContainer.appendChild(filterRow2);

    const filterRow3 = document.createElement('div');
    filterRow3.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';

    const spiceOptions = [{ id: 'all', name: 'All Spice Levels', icon: '🌶' }, ...SPICE_LEVELS.map(sl => ({ id: sl.id, name: sl.name, icon: sl.icon, color: sl.color }))];
    const spiceFilter = createFilterButtonGroup(spiceOptions, (id) => {
      this.selectedSpice = id;
      this.currentPage = 1;
      this.renderRecipesGrid(gridContainer);
    });
    filterRow3.appendChild(spiceFilter);
    filtersContainer.appendChild(filterRow3);

    container.appendChild(filtersContainer);

    // Recipe grid
    const gridContainer = document.createElement('div');
    gridContainer.id = 'recipes-grid';
    gridContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    `;
    container.appendChild(gridContainer);

    // Detail panel
    const detailPanel = document.createElement('div');
    detailPanel.id = 'recipe-detail-panel';
    container.appendChild(detailPanel);

    // Favorites
    const favContainer = document.createElement('div');
    favContainer.id = 'favorites-container';
    favContainer.style.cssText = 'margin-top: 24px;';
    container.appendChild(favContainer);

    this.renderRecipesGrid(gridContainer);
    this.renderFavorites();
  }

  renderRecipesGrid(container) {
    container.innerHTML = '';

    let filtered = cuisineData.recipes;

    // Apply filters
    if (this.selectedCuisine !== 'all') {
      filtered = filtered.filter(r => r.cuisineId === this.selectedCuisine);
    }
    if (this.selectedCourse !== 'all') {
      filtered = filtered.filter(r => r.courseId === this.selectedCourse);
    }
    if (this.selectedSpice !== 'all') {
      filtered = filtered.filter(r => r.spiceLevelId === this.selectedSpice);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(this.searchQuery) ||
        r.cuisineName.toLowerCase().includes(this.searchQuery) ||
        r.ingredients.some(ing => ing.name.toLowerCase().includes(this.searchQuery))
      );
    }

    // Pagination
    const totalPages = Math.ceil(filtered.length / this.recipesPerPage);
    const start = (this.currentPage - 1) * this.recipesPerPage;
    const paginated = filtered.slice(start, start + this.recipesPerPage);

    if (paginated.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <h3 style="color: #94a3b8; font-weight: 500;">No recipes found</h3>
          <p style="color: #64748b; font-size: 14px;">Try adjusting your filters or search query</p>
        </div>
      `;
      return;
    }

    paginated.forEach(recipe => {
      container.appendChild(createRecipeCard(recipe, (r) => this.showRecipeDetail(r)));
    });

    // Pagination controls
    if (totalPages > 1) {
      const pagination = document.createElement('div');
      pagination.style.cssText = `
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 20px;
      `;

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.style.cssText = `
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid ${i === this.currentPage ? '#FF6B6B' : 'rgba(255,255,255,0.1)'};
          background: ${i === this.currentPage ? '#FF6B6B33' : 'rgba(255,255,255,0.05)'};
          color: ${i === this.currentPage ? '#FF6B6B' : '#94a3b8'};
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
        `;
        btn.textContent = i;
        btn.addEventListener('click', () => {
          this.currentPage = i;
          this.renderRecipesGrid(container);
        });
        pagination.appendChild(btn);
      }
      container.appendChild(pagination);
    }
  }

  showRecipeDetail(recipe) {
    this.selectedRecipe = recipe;
    const detailPanel = document.getElementById('recipe-detail-panel');
    if (!detailPanel) return;

    detailPanel.innerHTML = '';
    const panel = createRecipeDetailPanel(recipe);

    // Add favorite button
    const favBtn = document.createElement('button');
    favBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: ${this.favorites.has(recipe.id) ? '#f8717133' : 'rgba(255,255,255,0.1)'};
      color: ${this.favorites.has(recipe.id) ? '#f87171' : '#94a3b8'};
      cursor: pointer;
      font-size: 20px;
      transition: all 0.3s ease;
    `;
    favBtn.innerHTML = this.favorites.has(recipe.id) ? '❤️' : '🤍';
    favBtn.addEventListener('click', () => this.toggleFavorite(recipe.id));
    panel.style.position = 'relative';
    panel.appendChild(favBtn);

    // Nutrition bar
    const nutrition = createNutritionalBar(recipe);
    nutrition.style.marginTop = '16px';
    panel.appendChild(nutrition);

    detailPanel.appendChild(panel);
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleFavorite(recipeId) {
    if (this.favorites.has(recipeId)) {
      this.favorites.delete(recipeId);
    } else {
      this.favorites.add(recipeId);
    }
    if (this.selectedRecipe && this.selectedRecipe.id === recipeId) {
      this.showRecipeDetail(this.selectedRecipe);
    }
    this.renderFavorites();
  }

  renderFavorites() {
    const container = document.getElementById('favorites-container');
    if (!container) return;

    const favRecipes = cuisineData.recipes.filter(r => this.favorites.has(r.id));
    container.innerHTML = '';

    if (favRecipes.length > 0) {
      const favList = createFavoritesList(favRecipes, (id) => this.toggleFavorite(parseInt(id)));
      container.appendChild(favList);
    }
  }

  renderRegionsTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🗺 Regional Cuisines of India</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Explore the diverse culinary traditions from different regions of India</p>
    `;
    container.appendChild(header);

    // Region Radar Chart
    const chartSection = document.createElement('div');
    chartSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
    `;
    const radarCanvas = document.createElement('canvas');
    radarCanvas.width = 400;
    radarCanvas.height = 300;
    chartSection.appendChild(radarCanvas);
    container.appendChild(chartSection);

    // Region cards grid
    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px;
    `;

    cuisineData.cuisineRegions.forEach(region => {
      grid.appendChild(createCuisineRegionCard(region));
    });
    container.appendChild(grid);

    // Initialize radar chart
    setTimeout(() => {
      const radarData = [
        { label: 'Spice', value: 75 },
        { label: 'Variety', value: 85 },
        { label: 'Vegetarian', value: 70 },
        { label: 'Street Food', value: 60 },
        { label: 'Sweets', value: 80 },
        { label: 'Seafood', value: 45 }
      ];
      createRegionRadarChart(radarCanvas, radarData);
    }, 100);
  }

  renderSpiceTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🌶 Spice Levels Guide</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Understanding the heat spectrum of Indian cuisine</p>
    `;
    container.appendChild(header);

    // Spice level cards
    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    cuisineData.spiceLevels.forEach(level => {
      grid.appendChild(createSpiceLevelCard(level));
    });
    container.appendChild(grid);

    // Spice level bar chart
    const chartSection = document.createElement('div');
    chartSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
    `;
    const barCanvas = document.createElement('canvas');
    barCanvas.width = 600;
    barCanvas.height = 300;
    chartSection.appendChild(barCanvas);
    container.appendChild(chartSection);

    // Rating heatmap
    const heatmapSection = document.createElement('div');
    heatmapSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const heatmapCanvas = document.createElement('canvas');
    heatmapCanvas.width = 600;
    heatmapCanvas.height = 250;
    heatmapSection.appendChild(heatmapCanvas);
    container.appendChild(heatmapSection);

    // Initialize charts
    setTimeout(() => {
      const spiceData = cuisineData.spiceLevels.map(sl => ({
        label: sl.name,
        value: sl.recipeCount,
        color: sl.color
      }));
      createSpiceLevelBarChart(barCanvas, spiceData);

      const heatmapData = [
        { label: 'North', values: [4.2, 4.5, 4.3, 4.6, 4.1, 4.4], columnLabels: ['Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme', 'Nuclear'] },
        { label: 'South', values: [3.8, 4.1, 4.4, 4.2, 3.9, 4.0], columnLabels: ['Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme', 'Nuclear'] },
        { label: 'East', values: [4.0, 4.2, 4.1, 4.3, 3.8, 4.0], columnLabels: ['Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme', 'Nuclear'] },
        { label: 'West', values: [3.9, 4.0, 4.2, 4.1, 3.7, 3.9], columnLabels: ['Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme', 'Nuclear'] }
      ];
      createRatingHeatmap(heatmapCanvas, heatmapData);
    }, 100);
  }

  renderMethodsTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">👨‍🍳 Cooking Methods</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Discover traditional and modern cooking techniques used across India</p>
    `;
    container.appendChild(header);

    // Methods chart
    const chartSection = document.createElement('div');
    chartSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
    `;
    const methodCanvas = document.createElement('canvas');
    methodCanvas.width = 600;
    methodCanvas.height = 350;
    chartSection.appendChild(methodCanvas);
    container.appendChild(chartSection);

    // Method cards
    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    cuisineData.cookingMethods.forEach(method => {
      grid.appendChild(createCookingMethodCard(method));
    });
    container.appendChild(grid);

    // Initialize chart
    setTimeout(() => {
      const methodData = cuisineData.cookingMethods.map(m => ({
        label: m.name,
        value: m.recipeCount,
        color: m.color
      }));
      createCookingMethodChart(methodCanvas, methodData);
    }, 100);
  }

  renderMealPlansTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">📋 Meal Plans</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Curated meal plans for different occasions and dietary preferences</p>
    `;
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    `;

    cuisineData.mealPlans.forEach(plan => {
      grid.appendChild(createMealPlanCard(plan));
    });
    container.appendChild(grid);
  }

  attachEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.selectedRecipe) {
        this.selectedRecipe = null;
        const detailPanel = document.getElementById('recipe-detail-panel');
        if (detailPanel) detailPanel.innerHTML = '';
      }
    });
  }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cuisine-explorer');
  if (container) {
    window.cuisineExplorer = new CuisineExplorerDashboard('cuisine-explorer');
  }
});

export default CuisineExplorerDashboard;
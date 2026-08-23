// Festival Dashboard - Main dashboard page for India Festival Calendar
import { FESTIVAL_CATEGORIES, FESTIVAL_SEASONS, CELEBRATION_TYPES, MONTHS } from './festivalTypes.js';
import { festivals, festivalStats, getUpcomingFestivals, getFestivalsByCategory, getFestivalsBySeason } from './festivalData.js';
import {
  createStatCard,
  createFestivalCard,
  createFestivalDetailPanel,
  createUpcomingCard,
  createCalendarMonthCard,
  createSeasonCard,
  createRecipeCard,
  createFilterButtonGroup,
  createSearchInput
} from './festivalCards.js';
import {
  createCategoryPieChart,
  createSeasonBarChart,
  createMonthlyLineChart,
  createCelebrationRadar,
  createRegionBarChart,
  createCalendarHeatmapChart
} from './festivalCharts.js';

export class FestivalCalendarDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found`);
      return;
    }

    this.activeTab = 'overview';
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedSeason = 'all';
    this.selectedFestival = null;

    this.init();
  }

  init() {
    this.render();
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
        <div style="font-size: 48px;">🎉</div>
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(90deg, #FF6B6B, #FFB347); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            India Festival Calendar
          </h1>
          <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">Explore the diverse festivals of India • ${festivals.length} Festivals • 6 Categories • All Seasons</p>
        </div>
      </div>
    `;
    this.container.appendChild(header);

    // Tab Navigation
    const tabs = [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'festivals', name: 'All Festivals', icon: '🎉' },
      { id: 'calendar', name: 'Calendar View', icon: '📅' },
      { id: 'seasons', name: 'By Season', icon: '🌸' },
      { id: 'recipes', name: 'Festival Recipes', icon: '🍽' }
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
    content.id = 'festival-content';
    content.style.cssText = 'min-height: 500px;';
    this.container.appendChild(content);

    this.renderTabContent();
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    this.selectedFestival = null;
    this.render();
  }

  renderTabContent() {
    const content = document.getElementById('festival-content');
    if (!content) return;

    content.innerHTML = '';

    switch (this.activeTab) {
      case 'overview':
        this.renderOverviewTab(content);
        break;
      case 'festivals':
        this.renderFestivalsTab(content);
        break;
      case 'calendar':
        this.renderCalendarTab(content);
        break;
      case 'seasons':
        this.renderSeasonsTab(content);
        break;
      case 'recipes':
        this.renderRecipesTab(content);
        break;
    }
  }

  renderOverviewTab(container) {
    const stats = festivalStats;

    // Stats Row
    const statsRow = document.createElement('div');
    statsRow.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    const statCards = [
      { value: stats.totalFestivals, label: 'Total Festivals', icon: '🎉', color: '#FF6B6B' },
      { value: stats.byCategory.length, label: 'Categories', icon: '📂', color: '#4ECDC4' },
      { value: stats.avgDuration + ' days', label: 'Avg Duration', icon: '⏰', color: '#FFB347' },
      { value: stats.upcomingFestivals.length, label: 'Upcoming', icon: '📅', color: '#34d399' }
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

    // Category Pie
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

    // Season Bar
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

    // Upcoming Festivals
    const upcomingSection = document.createElement('div');
    upcomingSection.style.cssText = 'margin-bottom: 24px;';
    upcomingSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">📅 Upcoming Festivals</h3>
    `;

    const upcomingList = document.createElement('div');
    upcomingList.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 12px;
    `;

    const upcoming = getUpcomingFestivals(4);
    upcoming.forEach(festival => {
      upcomingList.appendChild(createUpcomingCard(festival));
    });
    upcomingSection.appendChild(upcomingList);
    container.appendChild(upcomingSection);

    // Calendar Heatmap
    const heatmapContainer = document.createElement('div');
    heatmapContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
    `;
    const heatmapCanvas = document.createElement('canvas');
    heatmapCanvas.width = 700;
    heatmapCanvas.height = 200;
    heatmapContainer.appendChild(heatmapCanvas);
    container.appendChild(heatmapContainer);

    // Top Recipes
    const recipesSection = document.createElement('div');
    recipesSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">🍽 Popular Festival Recipes</h3>
    `;

    const recipeGrid = document.createElement('div');
    recipeGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
    `;

    const allRecipes = festivals.flatMap(f => f.recipes.map(r => ({ recipe: r, festival: f.name })));
    const uniqueRecipes = [...new Map(allRecipes.map(r => [r.recipe, r])).values()].slice(0, 8);
    uniqueRecipes.forEach(r => {
      recipeGrid.appendChild(createRecipeCard(r.recipe, r.festival));
    });
    recipesSection.appendChild(recipeGrid);
    container.appendChild(recipesSection);

    // Initialize charts
    setTimeout(() => {
      const catData = stats.byCategory.map(c => ({
        label: c.name,
        value: c.count,
        color: c.color
      }));
      createCategoryPieChart(pieCanvas, catData);

      const seasonData = stats.bySeason.map(s => ({
        label: s.name,
        value: s.count,
        color: s.color
      }));
      createSeasonBarChart(barCanvas, seasonData);

      createCalendarHeatmapChart(heatmapCanvas, stats.monthsDistribution);
    }, 100);
  }

  renderFestivalsTab(container) {
    // Filters
    const filtersContainer = document.createElement('div');
    filtersContainer.style.cssText = 'margin-bottom: 20px;';

    const searchInput = createSearchInput('Search festivals by name, category, or recipe...', (q) => {
      this.searchQuery = q.toLowerCase();
      this.renderFestivalsGrid(gridContainer);
    });
    filtersContainer.appendChild(searchInput);

    const filterRow = document.createElement('div');
    filterRow.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px;';

    const categoryOptions = [{ id: 'all', name: 'All Categories', icon: '🎉' }, ...FESTIVAL_CATEGORIES.map(c => ({ id: c.id, name: c.name, icon: c.icon, color: c.color }))];
    const categoryFilter = createFilterButtonGroup(categoryOptions, (id) => {
      this.selectedCategory = id;
      this.renderFestivalsGrid(gridContainer);
    });
    filterRow.appendChild(categoryFilter);

    const seasonOptions = [{ id: 'all', name: 'All Seasons', icon: '🌸' }, ...FESTIVAL_SEASONS.map(s => ({ id: s.id, name: s.name, icon: s.icon, color: s.color }))];
    const seasonFilter = createFilterButtonGroup(seasonOptions, (id) => {
      this.selectedSeason = id;
      this.renderFestivalsGrid(gridContainer);
    });
    filterRow.appendChild(seasonFilter);
    filtersContainer.appendChild(filterRow);

    container.appendChild(filtersContainer);

    // Festival grid
    const gridContainer = document.createElement('div');
    gridContainer.id = 'festivals-grid';
    gridContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    `;
    container.appendChild(gridContainer);

    // Detail panel
    const detailPanel = document.createElement('div');
    detailPanel.id = 'festival-detail-panel';
    container.appendChild(detailPanel);

    this.renderFestivalsGrid(gridContainer);
  }

  renderFestivalsGrid(container) {
    container.innerHTML = '';

    let filtered = festivals;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(f => f.category === this.selectedCategory);
    }
    if (this.selectedSeason !== 'all') {
      filtered = filtered.filter(f => f.season === this.selectedSeason);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(this.searchQuery) ||
        f.englishName.toLowerCase().includes(this.searchQuery) ||
        f.recipes.some(r => r.toLowerCase().includes(this.searchQuery))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <h3 style="color: #94a3b8; font-weight: 500;">No festivals found</h3>
          <p style="color: #64748b; font-size: 14px;">Try adjusting your filters or search query</p>
        </div>
      `;
      return;
    }

    filtered.forEach(festival => {
      container.appendChild(createFestivalCard(festival, (f) => this.showFestivalDetail(f)));
    });
  }

  showFestivalDetail(festival) {
    this.selectedFestival = festival;
    const detailPanel = document.getElementById('festival-detail-panel');
    if (!detailPanel) return;

    detailPanel.innerHTML = '';
    detailPanel.appendChild(createFestivalDetailPanel(festival));
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderCalendarTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">📅 Festival Calendar</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">All festivals organized by month</p>
    `;
    container.appendChild(header);

    // Calendar grid
    const calendarGrid = document.createElement('div');
    calendarGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthNames.forEach((month, i) => {
      const monthFestivals = festivals.filter(f => {
        const d = new Date(f.date);
        return d.getMonth() === i;
      });
      calendarGrid.appendChild(createCalendarMonthCard(month, monthFestivals));
    });
    container.appendChild(calendarGrid);

    // Festival Timeline
    const timelineSection = document.createElement('div');
    timelineSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">📆 Festival Timeline</h3>
    `;

    const sortedFestivals = [...festivals].sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedFestivals.forEach(festival => {
      timelineSection.appendChild(createUpcomingCard(festival));
    });
    container.appendChild(timelineSection);
  }

  renderSeasonsTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🌸 Festivals by Season</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Explore festivals organized by seasons of India</p>
    `;
    container.appendChild(header);

    // Season cards grid
    const seasonGrid = document.createElement('div');
    seasonGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    FESTIVAL_SEASONS.forEach(season => {
      const seasonFestivals = festivals.filter(f => f.season === season.id);
      seasonGrid.appendChild(createSeasonCard(season, seasonFestivals));
    });
    container.appendChild(seasonGrid);

    // Season Detail Sections
    FESTIVAL_SEASONS.forEach(season => {
      const seasonFestivals = festivals.filter(f => f.season === season.id);
      if (seasonFestivals.length === 0) return;

      const section = document.createElement('div');
      section.style.cssText = 'margin-bottom: 24px;';
      section.innerHTML = `
        <h3 style="margin: 0 0 16px; color: ${season.color}; font-size: 18px;">
          ${season.icon} ${season.name} Festivals (${seasonFestivals.length})
        </h3>
        <p style="margin: 0 0 12px; color: #94a3b8; font-size: 13px;">${season.months.join(', ')}</p>
      `;

      const grid = document.createElement('div');
      grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 16px;
      `;

      seasonFestivals.forEach(festival => {
        grid.appendChild(createFestivalCard(festival, (f) => {
          this.activeTab = 'festivals';
          this.render();
          this.showFestivalDetail(f);
        }));
      });

      section.appendChild(grid);
      container.appendChild(section);
    });

    // Celebration Radar Chart
    const chartSection = document.createElement('div');
    chartSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      margin-top: 24px;
    `;
    const radarCanvas = document.createElement('canvas');
    radarCanvas.width = 400;
    radarCanvas.height = 300;
    chartSection.appendChild(radarCanvas);
    container.appendChild(chartSection);

    // Initialize radar chart
    setTimeout(() => {
      const celebrationCounts = CELEBRATION_TYPES.map(ct => ({
        label: ct.name.split(' ')[0],
        value: festivals.filter(f => f.celebrations.includes(ct.id)).length * 15
      }));
      createCelebrationRadar(radarCanvas, celebrationCounts);
    }, 100);
  }

  renderRecipesTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🍽 Festival Recipes</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Traditional dishes prepared during Indian festivals</p>
    `;
    container.appendChild(header);

    // All recipes by festival
    festivals.forEach(festival => {
      const section = document.createElement('div');
      section.style.cssText = 'margin-bottom: 24px;';
      section.innerHTML = `
        <h3 style="margin: 0 0 12px; color: ${festival.color}; font-size: 16px;">
          ${festival.images[0]} ${festival.name} Recipes
        </h3>
        <p style="margin: 0 0 12px; color: #94a3b8; font-size: 12px;">${festival.englishName} • ${festival.month}</p>
      `;

      const recipeGrid = document.createElement('div');
      recipeGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 12px;
      `;

      festival.recipes.forEach(recipe => {
        recipeGrid.appendChild(createRecipeCard(recipe, festival.name));
      });

      section.appendChild(recipeGrid);
      container.appendChild(section);
    });
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('festival-calendar');
  if (container) {
    window.festivalCalendar = new FestivalCalendarDashboard('festival-calendar');
  }
});

export default FestivalCalendarDashboard;
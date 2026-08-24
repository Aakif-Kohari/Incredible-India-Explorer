import {
  HERITAGE_CATEGORIES,
  HISTORICAL_PERIODS,
  REGIONS,
  TRAIL_TYPES,
} from './heritageTrailTypes.js';
import {
  generateHeritageSites,
  generateTrailRoutes,
  generateRegionStats,
  generateTimelineData,
  generateVisitorStats,
} from './heritageTrailData.js';
import {
  createStatCard,
  createSiteCard,
  createTrailCard,
  createRegionCard,
  createPeriodCard,
  createSiteDetailPanel,
} from './heritageTrailCards.js';
import {
  createCategoryBarChart,
  createRegionPieChart,
  createVisitorTrendChart,
  createTopSitesBarChart,
} from './heritageTrailCharts.js';

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'sites', label: 'Heritage Sites', icon: '🏛️' },
  { id: 'trails', label: 'Trail Routes', icon: '🗺️' },
  { id: 'regions', label: 'Regions', icon: '📍' },
  { id: 'timeline', label: 'Timeline', icon: '📜' },
];

let currentTab = 'overview';
let selectedSite = null;
let searchQuery = '';
let categoryFilter = 'all';
let regionFilter = 'all';

/**
 * Creates and renders the Heritage Trail Explorer dashboard.
 */
export function renderHeritageTrailDashboard(container) {
  const sites = generateHeritageSites(25);
  const trails = generateTrailRoutes(sites);
  const regions = generateRegionStats();
  const timeline = generateTimelineData();
  const visitorData = generateVisitorStats(12);

  container.innerHTML = `
    <style>
      .heritage-dashboard { min-height: 100vh; background: var(--bg-primary, #f8fafc); padding: 1.5rem; }
      .heritage-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; }
      .heritage-title { display: flex; align-items: center; gap: 0.75rem; }
      .heritage-title h1 { font-size: 1.5rem; font-weight: 900; color: var(--text-primary, #1e293b); margin: 0; }
      .heritage-title p { font-size: 0.8rem; color: var(--muted, #64748b); margin: 0.25rem 0 0 3.25rem; }
      .heritage-title-icon { width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
      .heritage-tabs { display: flex; gap: 0.25rem; margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem; }
      .heritage-tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; border-radius: 0.75rem; border: 1px solid var(--border-color, #e2e8f0); background: var(--bg-card, #ffffff); color: var(--text-secondary, #64748b); font-size: 0.8rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s ease; }
      .heritage-tab.active { background: #f59e0b; color: #fff; border: none; box-shadow: 0 2px 8px rgba(245,158,11,0.3); }
      .heritage-filter { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
      .heritage-filter input, .heritage-filter select { padding: 0.6rem 1rem; border-radius: 0.75rem; border: 1px solid var(--border-color, #e2e8f0); background: var(--bg-card, #ffffff); font-size: 0.8rem; color: var(--text-primary, #1e293b); outline: none; }
      .heritage-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem; }
      .heritage-grid-full { display: grid; grid-template-columns: 1fr 350px; gap: 1.5rem; align-items: start; }
      .heritage-chart-container { background: var(--bg-card, #ffffff); border: 1px solid var(--border-color, #e2e8f0); border-radius: 1rem; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    </style>
    <div class="heritage-dashboard">
      <div class="heritage-header">
        <div class="heritage-title">
          <div class="heritage-title-icon">🏛️</div>
          <div>
            <h1>Indian Heritage Trail Explorer</h1>
            <p>Discover India's magnificent heritage — temples, forts, monuments, and ancient wonders</p>
          </div>
        </div>
      </div>
      <div class="heritage-tabs" id="heritage-tabs"></div>
      <div id="heritage-content"></div>
    </div>
  `;

  const tabsContainer = container.querySelector('#heritage-tabs');
  const contentContainer = container.querySelector('#heritage-content');

  // Render tabs
  TABS.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = `heritage-tab${tab.id === currentTab ? ' active' : ''}`;
    btn.innerHTML = `${tab.icon} ${tab.label}`;
    btn.addEventListener('click', () => {
      currentTab = tab.id;
      tabsContainer.querySelectorAll('.heritage-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderTab(contentContainer, sites, trails, regions, timeline, visitorData);
    });
    tabsContainer.appendChild(btn);
  });

  renderTab(contentContainer, sites, trails, regions, timeline, visitorData);
}

function renderTab(container, sites, trails, regions, timeline, visitorData) {
  container.innerHTML = '';
  switch (currentTab) {
    case 'overview': renderOverview(container, sites, trails, regions, visitorData); break;
    case 'sites': renderSites(container, sites); break;
    case 'trails': renderTrails(container, trails); break;
    case 'regions': renderRegions(container, regions); break;
    case 'timeline': renderTimeline(container, timeline); break;
  }
}

function renderOverview(container, sites, trails, regions, visitorData) {
  const totalVisitors = sites.reduce((s, site) => s + site.visitors, 0);
  const unescoCount = sites.filter(s => s.unesco === 'world_heritage').length;
  const avgRating = (sites.reduce((s, site) => s + site.rating, 0) / sites.length).toFixed(1);

  const statsGrid = document.createElement('div');
  statsGrid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem';
  statsGrid.appendChild(createStatCard({ icon: '🏛️', label: 'Heritage Sites', value: sites.length, subValue: 'Across all categories', color: '#f59e0b', delay: 0 }));
  statsGrid.appendChild(createStatCard({ icon: '🌍', label: 'UNESCO Sites', value: unescoCount, subValue: 'World Heritage', color: '#6366f1', delay: 0.05 }));
  statsGrid.appendChild(createStatCard({ icon: '👥', label: 'Total Visitors', value: `${(totalVisitors / 1000000).toFixed(1)}M`, subValue: 'Annual visitors', color: '#22c55e', delay: 0.1 }));
  statsGrid.appendChild(createStatCard({ icon: '⭐', label: 'Avg Rating', value: avgRating, subValue: 'Out of 5.0', color: '#8b5cf6', delay: 0.15 }));
  container.appendChild(statsGrid);

  const chartsRow = document.createElement('div');
  chartsRow.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:1.5rem;margin-bottom:1.5rem';

  const chart1 = document.createElement('div');
  chart1.className = 'heritage-chart-container';
  createCategoryBarChart(sites, chart1);
  chartsRow.appendChild(chart1);

  const chart2 = document.createElement('div');
  chart2.className = 'heritage-chart-container';
  createRegionPieChart(regions, chart2);
  chartsRow.appendChild(chart2);
  container.appendChild(chartsRow);

  const chartsRow2 = document.createElement('div');
  chartsRow2.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:1.5rem';

  const chart3 = document.createElement('div');
  chart3.className = 'heritage-chart-container';
  createVisitorTrendChart(visitorData, chart3);
  chartsRow2.appendChild(chart3);

  const chart4 = document.createElement('div');
  chart4.className = 'heritage-chart-container';
  createTopSitesBarChart(sites, chart4);
  chartsRow2.appendChild(chart4);
  container.appendChild(chartsRow2);
}

function renderSites(container, sites) {
  selectedSite = null;
  const filterBar = document.createElement('div');
  filterBar.className = 'heritage-filter';
  filterBar.innerHTML = `
    <input type="text" id="site-search" placeholder="🔍 Search sites, cities, periods..." style="flex:1;min-width:200px;max-width:320px">
    <select id="cat-filter"><option value="all">All Categories</option>${Object.entries(HERITAGE_CATEGORIES).map(([k, v]) => `<option value="${k}">${v.icon} ${v.label}</option>`).join('')}</select>
    <select id="region-filter"><option value="all">All Regions</option>${Object.entries(REGIONS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}</select>
  `;
  container.appendChild(filterBar);

  const mainGrid = document.createElement('div');
  mainGrid.className = 'heritage-grid-full';
  const listPanel = document.createElement('div');
  listPanel.style.display = 'flex';
  listPanel.style.flexDirection = 'column';
  listPanel.style.gap = '0.5rem';
  const detailPanel = document.createElement('div');
  mainGrid.appendChild(listPanel);
  mainGrid.appendChild(detailPanel);
  container.appendChild(mainGrid);

  function renderList() {
    listPanel.innerHTML = '';
    const search = document.getElementById('site-search')?.value?.toLowerCase() || '';
    const catFilter = document.getElementById('cat-filter')?.value || 'all';
    const regFilter = document.getElementById('region-filter')?.value || 'all';

    const filtered = sites.filter(s => {
      if (catFilter !== 'all' && s.category !== catFilter) return false;
      if (regFilter !== 'all' && s.region !== regFilter) return false;
      if (search && !s.name.toLowerCase().includes(search) && !s.city.toLowerCase().includes(search) && !s.period.toLowerCase().includes(search)) return false;
      return true;
    });

    const count = document.createElement('p');
    count.style.cssText = 'font-size:0.85rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0 0 0.25rem';
    count.textContent = `🏛️ ${filtered.length} Heritage Sites`;
    listPanel.appendChild(count);

    filtered.forEach((site, i) => {
      listPanel.appendChild(createSiteCard({ site, delay: i * 0.03, onSelect: (s) => {
        selectedSite = s;
        detailPanel.innerHTML = '';
        detailPanel.appendChild(createSiteDetailPanel({ site: s, onClose: () => { selectedSite = null; detailPanel.innerHTML = ''; } }));
      }}));
    });
  }

  document.getElementById('site-search')?.addEventListener('input', renderList);
  document.getElementById('cat-filter')?.addEventListener('change', renderList);
  document.getElementById('region-filter')?.addEventListener('change', renderList);
  renderList();
}

function renderTrails(container, trails) {
  const grid = document.createElement('div');
  grid.style.cssText = 'display:flex;flex-direction:column;gap:0.75rem';
  const header = document.createElement('p');
  header.style.cssText = 'font-size:0.85rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0 0 0.5rem';
  header.textContent = `🗺️ ${trails.length} Heritage Trail Routes`;
  grid.appendChild(header);
  trails.forEach((trail, i) => grid.appendChild(createTrailCard({ trail, delay: i * 0.05 })));
  container.appendChild(grid);
}

function renderRegions(container, regions) {
  const header = document.createElement('p');
  header.style.cssText = 'font-size:0.85rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0 0 0.5rem';
  header.textContent = '📍 Regional Heritage Distribution';
  container.appendChild(header);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:0.75rem';
  regions.forEach((region, i) => grid.appendChild(createRegionCard({ region, delay: i * 0.05 })));
  container.appendChild(grid);
}

function renderTimeline(container, timeline) {
  const header = document.createElement('p');
  header.style.cssText = 'font-size:0.85rem;font-weight:700;color:var(--text-primary,#1e293b);margin:0 0 0.5rem';
  header.textContent = '📜 Heritage Through the Ages';
  container.appendChild(header);

  const list = document.createElement('div');
  list.style.cssText = 'display:flex;flex-direction:column;gap:0.35rem';
  timeline.forEach((period, i) => list.appendChild(createPeriodCard({ period, delay: i * 0.05 })));
  container.appendChild(list);
}

// Auto-init if container found
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('heritage-trail-dashboard');
    if (el) renderHeritageTrailDashboard(el);
  });
}

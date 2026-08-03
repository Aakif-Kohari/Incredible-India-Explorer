import { missions, launchers, timeline, achievements, timelineCategories } from './data.js';
import { TabNav } from './components/TabNav.js';
import { MissionCard, MissionDetail } from './components/MissionCard.js';
import { LauncherCard } from './components/LauncherCard.js';
import { TimelineView } from './components/TimelineView.js';
import { AchievementGrid } from './components/AchievementGrid.js';

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'chandrayaan', label: 'Chandrayaan' },
    { id: 'mars-solar', label: 'Mars & Solar' },
    { id: 'gaganyaan', label: 'Gaganyaan' },
    { id: 'launchers', label: 'Launchers' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'achievements', label: 'Achievements' }
];

let activeTab = 'overview';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('isro-explorer-app');

    const shell = `
        <div id="isro-tab-nav-root"></div>
        <div id="isro-tab-content-root"></div>
    `;
    appContainer.innerHTML = shell;

    renderTabNav();
    renderContent();

    document.getElementById('isro-tab-nav-root').addEventListener('click', e => {
        const btn = e.target.closest('.isro-tab-btn');
        if (!btn) return;
        activeTab = btn.dataset.tab;
        renderTabNav();
        renderContent();
    });
});

function renderTabNav() {
    document.getElementById('isro-tab-nav-root').innerHTML = TabNav(TABS, activeTab);
}

function renderContent() {
    const root = document.getElementById('isro-tab-content-root');
    root.style.opacity = '0';

    setTimeout(() => {
        root.innerHTML = getTabContent(activeTab);
        attachListeners();
        root.style.opacity = '1';
    }, 150);
}

function getTabContent(tab) {
    switch (tab) {
        case 'overview':
            return renderOverview();
        case 'chandrayaan':
            return renderMissionsTab('chandrayaan');
        case 'mars-solar':
            return renderMissionsTab('mars-solar');
        case 'gaganyaan':
            return renderMissionsTab('gaganyaan');
        case 'launchers':
            return renderLaunchersTab();
        case 'timeline':
            return TimelineView(timeline, timelineCategories);
        case 'achievements':
            return AchievementGrid(achievements);
        default:
            return '';
    }
}

function renderOverview() {
    const totalMissions = missions.length;
    const totalLaunchers = launchers.length;
    const successMissions = missions.filter(m => m.status.includes('Success') || m.status.includes('Operational')).length;

    const overviewMissions = missions.slice(0, 4).map(m => {
        const statusClass = m.status.toLowerCase().includes('success') ? 'success' :
                            m.status.toLowerCase().includes('operational') ? 'operational' :
                            m.status.toLowerCase().includes('planned') ? 'planned' : 'active';
        return `
            <div class="overview-mission-item">
                <span class="om-status ${statusClass}"></span>
                <div>
                    <strong>${m.name}</strong>
                    <span class="om-date">${m.launchDate.split(' ').slice(-2).join(' ')}</span>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="isro-overview">
            <div class="overview-hero">
                <div class="overview-hero-content">
                    <h2>Indian Space Research Organisation</h2>
                    <p>Since 1962, ISRO has transformed India into a space power, achieving milestones that rival the world's most established space agencies — all at a fraction of the cost.</p>
                </div>
                <div class="overview-stats">
                    <div class="overview-stat">
                        <span class="os-number">${totalMissions}</span>
                        <span class="os-label">Missions</span>
                    </div>
                    <div class="overview-stat">
                        <span class="os-number">${successMissions}</span>
                        <span class="os-label">Successful</span>
                    </div>
                    <div class="overview-stat">
                        <span class="os-number">${totalLaunchers}</span>
                        <span class="os-label">Launch Vehicles</span>
                    </div>
                    <div class="overview-stat">
                        <span class="os-number">60+</span>
                        <span class="os-label">Years</span>
                    </div>
                </div>
            </div>

            <div class="overview-highlights">
                <h3>Major Missions</h3>
                <div class="overview-missions-list">${overviewMissions}</div>
            </div>

            <div class="overview-quick-launchers">
                <h3>Launch Vehicles</h3>
                <div class="overview-launcher-badges">
                    ${launchers.map(l => `
                        <div class="olb-item" style="--lb-color: ${l.color}">
                            <span class="olb-name">${l.name}</span>
                            <span class="olb-type">${l.type}</span>
                            <span class="olb-rate">${l.successRate} success</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderMissionsTab(category) {
    const filtered = missions.filter(m => m.category === category);

    if (filtered.length === 0) {
        return `<div class="no-results">No missions found.</div>`;
    }

    const cardsHtml = filtered.map((m, i) => MissionCard(m, i)).join('');

    return `
        <div class="isro-missions-grid">
            ${cardsHtml}
        </div>
    `;
}

function renderLaunchersTab() {
    const cardsHtml = launchers.map(l => LauncherCard(l)).join('');
    return `<div class="isro-launchers-grid">${cardsHtml}</div>`;
}

function attachListeners() {
    document.querySelectorAll('.mission-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            const mission = missions.filter(m => m.category === activeTab)[index];
            if (!mission) return;

            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const card = btn.closest('.isro-mission-card');

            if (isExpanded) {
                const detail = card.querySelector('.mission-detail-panel');
                if (detail) detail.remove();
                btn.setAttribute('aria-expanded', 'false');
                btn.querySelector('span').textContent = 'Explore Mission';
                btn.classList.remove('expanded');
            } else {
                const detailPanel = document.createElement('div');
                detailPanel.className = 'mission-detail-panel';
                detailPanel.innerHTML = MissionDetail(mission);
                card.appendChild(detailPanel);
                btn.setAttribute('aria-expanded', 'true');
                btn.querySelector('span').textContent = 'Collapse';
                btn.classList.add('expanded');
            }
        });
    });
}

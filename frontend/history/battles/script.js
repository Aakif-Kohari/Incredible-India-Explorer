import { battles, commanders, eraInfo } from './data.js';
import { TabNav } from './components/TabNav.js';
import { BattleTimeline } from './components/BattleTimeline.js';
import { BattleCard, BattleDetail } from './components/BattleCard.js';
import { BattleMap } from './components/BattleMap.js';
import { CommandersGallery } from './components/CommandersGallery.js';

const TABS = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'ancient', label: 'Ancient' },
    { id: 'medieval', label: 'Medieval' },
    { id: 'colonial', label: 'Colonial' },
    { id: 'modern', label: 'Modern' },
    { id: 'maps', label: 'Maps' },
    { id: 'commanders', label: 'Commanders' }
];

let activeTab = 'timeline';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('battles-app');

    const shell = `
        <div id="battles-tab-nav-root"></div>
        <div id="battles-tab-content-root"></div>
    `;
    appContainer.innerHTML = shell;

    renderTabNav();
    renderContent();

    document.getElementById('battles-tab-nav-root').addEventListener('click', e => {
        const btn = e.target.closest('.battles-tab-btn');
        if (!btn) return;
        activeTab = btn.dataset.tab;
        renderTabNav();
        renderContent();
    });
});

function renderTabNav() {
    document.getElementById('battles-tab-nav-root').innerHTML = TabNav(TABS, activeTab);
}

function renderContent() {
    const root = document.getElementById('battles-tab-content-root');
    root.style.opacity = '0';

    setTimeout(() => {
        root.innerHTML = getTabContent(activeTab);
        attachListeners();
        root.style.opacity = '1';
    }, 150);
}

function getTabContent(tab) {
    switch (tab) {
        case 'timeline':
            return BattleTimeline(battles, eraInfo);
        case 'ancient':
            return renderEraTab('ancient');
        case 'medieval':
            return renderEraTab('medieval');
        case 'colonial':
            return renderEraTab('colonial');
        case 'modern':
            return renderEraTab('modern');
        case 'maps':
            return BattleMap(battles, eraInfo);
        case 'commanders':
            return CommandersGallery(commanders);
        default:
            return '';
    }
}

function renderEraTab(era) {
    const filtered = battles.filter(b => b.era === era);

    if (filtered.length === 0) {
        return `<div class="no-results">No battles found for this era.</div>`;
    }

    const cardsHtml = filtered.map((b, i) => BattleCard(b, eraInfo, i)).join('');

    return `
        <div class="era-header" style="border-left: 4px solid ${eraInfo[era].color}">
            <h3>${eraInfo[era].label}</h3>
            <p>${eraInfo[era].description}</p>
        </div>
        <div class="battles-grid">
            ${cardsHtml}
        </div>
    `;
}

function attachListeners() {
    document.querySelectorAll('.battle-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            const card = btn.closest('.battle-card');
            const eraTab = activeTab === 'timeline' ? card.dataset.era : activeTab;
            const eraBattles = activeTab === 'timeline' ? battles.filter(b => b.era === eraTab) : battles.filter(b => b.era === eraTab);
            const battle = eraBattles[index];
            if (!battle) return;

            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                const detail = card.querySelector('.battle-detail-panel');
                if (detail) detail.remove();
                btn.setAttribute('aria-expanded', 'false');
                btn.querySelector('span').textContent = 'Full Battle Details';
                btn.classList.remove('expanded');
            } else {
                const detailPanel = document.createElement('div');
                detailPanel.className = 'battle-detail-panel';
                detailPanel.innerHTML = BattleDetail(battle);
                card.appendChild(detailPanel);
                btn.setAttribute('aria-expanded', 'true');
                btn.querySelector('span').textContent = 'Collapse';
                btn.classList.add('expanded');
            }
        });
    });

    document.querySelectorAll('.map-marker').forEach(marker => {
        marker.addEventListener('click', () => {
            const index = parseInt(marker.dataset.index);
            const battle = battles[index];
            if (!battle) return;

            document.querySelectorAll('.map-marker').forEach(m => m.classList.remove('active'));
            marker.classList.add('active');

            let popup = document.getElementById('map-popup');
            if (!popup) {
                popup = document.createElement('div');
                popup.id = 'map-popup';
                popup.className = 'map-popup';
                document.querySelector('.battle-map-container').appendChild(popup);
            }

            const era = eraInfo[battle.era] || { color: '#888' };
            popup.innerHTML = `
                <div class="popup-header" style="border-left: 4px solid ${era.color}">
                    <button class="popup-close" id="popup-close-btn">&times;</button>
                    <span class="popup-era" style="color: ${era.color}">${era.label}</span>
                    <h4>${battle.name}</h4>
                    <p class="popup-date">${battle.date}</p>
                </div>
                <p class="popup-location">${battle.location}</p>
                <p class="popup-summary">${battle.summary.substring(0, 200)}...</p>
                <div class="popup-outcome">
                    <strong>Outcome:</strong> ${battle.outcome}
                </div>
            `;
            popup.classList.add('visible');

            document.getElementById('popup-close-btn').addEventListener('click', () => {
                popup.classList.remove('visible');
                marker.classList.remove('active');
            });
        });
    });
}

import { branches, cds, commands, ranks, uniforms, equipment } from './data.js';
import { TabNav } from './components/TabNav.js';
import { BranchOverview } from './components/BranchOverview.js';
import { CommandGrid } from './components/CommandGrid.js';
import { RankTable } from './components/RankTable.js';
import { UniformShowcase } from './components/UniformShowcase.js';
import { EquipmentGrid } from './components/EquipmentGrid.js';
import { CDSSection } from './components/CDSSection.js';

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'army', label: 'Army' },
    { id: 'navy', label: 'Navy' },
    { id: 'airforce', label: 'Air Force' },
    { id: 'cds', label: 'CDS' },
    { id: 'commands', label: 'Commands' },
    { id: 'ranks', label: 'Ranks' },
    { id: 'uniforms', label: 'Uniforms' },
    { id: 'equipment', label: 'Equipment' }
];

let activeTab = 'overview';
let commandFilter = 'All';
let rankService = 'army';
let equipmentFilter = 'All';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('armed-forces-app');

    const shell = `
        <div id="tab-nav-root"></div>
        <div id="tab-content-root"></div>
    `;
    appContainer.innerHTML = shell;

    renderTabNav();
    renderContent();

    document.getElementById('tab-nav-root').addEventListener('click', e => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        activeTab = btn.dataset.tab;
        renderTabNav();
        renderContent();
    });
});

function renderTabNav() {
    document.getElementById('tab-nav-root').innerHTML = TabNav(TABS, activeTab);
}

function renderContent() {
    const root = document.getElementById('tab-content-root');
    root.style.opacity = '0';

    setTimeout(() => {
        root.innerHTML = getTabContent(activeTab);
        attachTabListeners();
        root.style.opacity = '1';
    }, 150);
}

function getTabContent(tab) {
    switch (tab) {
        case 'overview':
            return BranchOverview(branches);
        case 'army':
        case 'navy':
        case 'airforce':
            return renderBranchDetail(tab);
        case 'cds':
            return CDSSection(cds);
        case 'commands':
            return renderCommandsTab();
        case 'ranks':
            return renderRanksTab();
        case 'uniforms':
            return UniformShowcase(uniforms);
        case 'equipment':
            return renderEquipmentTab();
        default:
            return '';
    }
}

function renderBranchDetail(branchId) {
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return '';

    const factsHtml = branch.keyFacts.map(f => `<li>${f}</li>`).join('');
    const opsHtml = branch.notableOperations.map(o => `<li>${o}</li>`).join('');
    const branchRanks = ranks[branchId] || [];
    const gradeGroups = {};
    branchRanks.forEach(r => {
        if (!gradeGroups[r.grade]) gradeGroups[r.grade] = [];
        gradeGroups[r.grade].push(r);
    });
    const rankSections = Object.entries(gradeGroups).map(([grade, rlist]) => {
        const rows = rlist.map(r => `
            <tr>
                <td>${r.rank}</td>
                <td>${r.abbr}</td>
                <td>${r.payLevel}</td>
                <td>${r.description}</td>
            </tr>
        `).join('');
        return `
            <div class="branch-rank-group">
                <h4>${grade}</h4>
                <table class="rank-table compact">
                    <thead><tr><th>Rank</th><th>Abbr.</th><th>Pay Level</th><th>Description</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }).join('');

    const branchEquipment = equipment.filter(e => e.service === branch.name.split(' ').pop() || e.service === 'All' || e.service.includes(branch.name.split(' ').pop()));
    const equipHtml = branchEquipment.length > 0 ? branchEquipment.map(e => `
        <div class="branch-equip-item">
            <strong>${e.name}</strong> — ${e.type} <span class="equip-origin-badge">${e.origin}</span>
            <p>${e.description}</p>
        </div>
    `).join('') : '<p class="no-results">No specific equipment listed.</p>';

    return `
        <div class="branch-detail" style="--branch-color: ${branch.color}">
            <div class="branch-detail-header" style="background: ${branch.color}">
                <div class="branch-detail-emblem">${branch.name.split(' ').map(w => w[0]).join('')}</div>
                <div>
                    <h2>${branch.name}</h2>
                    <p class="branch-detail-motto">"${branch.motto}"</p>
                </div>
            </div>
            <div class="branch-detail-body">
                <div class="branch-info-grid">
                    <div class="info-card">
                        <span class="info-label">Chief</span>
                        <span class="info-value">${branch.chief}</span>
                        <span class="info-sub">Since ${branch.chiefSince}</span>
                    </div>
                    <div class="info-card">
                        <span class="info-label">Strength</span>
                        <span class="info-value">${branch.strength}</span>
                    </div>
                    <div class="info-card">
                        <span class="info-label">Founded</span>
                        <span class="info-value">${branch.founded}</span>
                    </div>
                    <div class="info-card">
                        <span class="info-label">Headquarters</span>
                        <span class="info-value">${branch.hq}</span>
                    </div>
                </div>

                <p class="branch-full-overview">${branch.overview}</p>

                <div class="branch-section">
                    <h3>Role & Responsibilities</h3>
                    <p>${branch.role}</p>
                </div>

                <div class="branch-section">
                    <h3>Key Facts</h3>
                    <ul class="branch-facts-list">${factsHtml}</ul>
                </div>

                <div class="branch-section">
                    <h3>Notable Operations</h3>
                    <ol class="branch-ops-list">${opsHtml}</ol>
                </div>

                <div class="branch-section">
                    <h3>Rank Structure</h3>
                    ${rankSections}
                </div>

                <div class="branch-section">
                    <h3>Key Equipment</h3>
                    ${equipHtml}
                </div>
            </div>
        </div>
    `;
}

function renderCommandsTab() {
    const serviceFilterHtml = `
        <div class="command-filter-bar">
            <button class="cmd-filter-btn ${commandFilter === 'All' ? 'active' : ''}" data-filter="All">All</button>
            <button class="cmd-filter-btn ${commandFilter === 'Army' ? 'active' : ''}" data-filter="Army">Army</button>
            <button class="cmd-filter-btn ${commandFilter === 'Navy' ? 'active' : ''}" data-filter="Navy">Navy</button>
            <button class="cmd-filter-btn ${commandFilter === 'Air Force' ? 'active' : ''}" data-filter="Air Force">Air Force</button>
        </div>
    `;
    return serviceFilterHtml + CommandGrid(commands, commandFilter);
}

function renderRanksTab() {
    const selectorHtml = `
        <div class="rank-filter-bar">
            <button class="rank-filter-btn ${rankService === 'army' ? 'active' : ''}" data-service="army">Army</button>
            <button class="rank-filter-btn ${rankService === 'navy' ? 'active' : ''}" data-service="navy">Navy</button>
            <button class="rank-filter-btn ${rankService === 'airforce' ? 'active' : ''}" data-service="airforce">Air Force</button>
        </div>
    `;
    return selectorHtml + RankTable(ranks, rankService);
}

function renderEquipmentTab() {
    const categoryFilterHtml = `
        <div class="equipment-filter-bar">
            <button class="equip-filter-btn ${equipmentFilter === 'All' ? 'active' : ''}" data-equip-filter="All">All</button>
        </div>
    `;
    return categoryFilterHtml + EquipmentGrid(equipment, equipmentFilter);
}

function attachTabListeners() {
    document.querySelectorAll('.cmd-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            commandFilter = btn.dataset.filter;
            renderContent();
        });
    });

    document.querySelectorAll('.rank-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            rankService = btn.dataset.service;
            renderContent();
        });
    });

    document.querySelectorAll('.equip-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            equipmentFilter = btn.dataset.equipFilter || btn.dataset.filter;
            renderContent();
        });
    });
}

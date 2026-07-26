import { TabNav } from './components/TabNav.js';
import { DynastyTimeline } from './components/DynastyTimeline.js';
import { DynastyCardsList } from './components/DynastyCard.js';
import { DynastyMap } from './components/DynastyMap.js';
import { Contributions } from './components/Contributions.js';
import { dynasties, eraInfo } from './data.js';

const tabs = [
  { id: 'all', label: 'All Dynasties' },
  { id: 'ancient', label: 'Ancient' },
  { id: 'medieval', label: 'Medieval' },
  { id: 'early-modern', label: 'Early Modern' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'map', label: 'Map' },
  { id: 'contributions', label: 'Contributions' }
];

let activeTab = 'all';

function render() {
  const app = document.getElementById('dynasties-app');
  app.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = `
    <h1>Indian Dynasties Explorer</h1>
    <p>Journey through India's most powerful empires — from the Mauryas to the Mughals — exploring their rulers, territories, art, and enduring contributions to civilization.</p>
  `;
  app.appendChild(header);

  const navContainer = document.createElement('div');
  navContainer.appendChild(TabNav({ tabs, activeTab, onTabChange: (id) => { activeTab = id; render(); } }));
  app.appendChild(navContainer);

  const content = document.createElement('div');
  content.className = 'dynasty-content';
  content.id = `panel-${activeTab}`;

  if (activeTab === 'timeline') {
    content.appendChild(DynastyTimeline());
  } else if (activeTab === 'map') {
    content.appendChild(DynastyMap());
  } else if (activeTab === 'contributions') {
    content.appendChild(Contributions());
  } else {
    const eraInfo2 = activeTab === 'all' ? null : eraInfo[activeTab];
    if (eraInfo2) {
      const badge = document.createElement('div');
      badge.className = 'era-badge';
      badge.innerHTML = `<span class="era-dot" style="background:${eraInfo2.color}"></span> ${eraInfo2.label} — ${eraInfo2.description}`;
      content.appendChild(badge);
    }
    content.appendChild(DynastyCardsList({ era: activeTab }));
  }

  app.appendChild(content);
}

render();

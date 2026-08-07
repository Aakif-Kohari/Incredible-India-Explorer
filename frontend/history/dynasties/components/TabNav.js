export function TabNav({ tabs, activeTab, onTabChange }) {
  const nav = document.createElement('nav');
  nav.className = 'tab-nav';
  nav.setAttribute('role', 'tablist');
  nav.setAttribute('aria-label', 'Dynasty navigation');

  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = `tab-btn${tab.id === activeTab ? ' active' : ''}`;
    btn.textContent = tab.label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', tab.id === activeTab ? 'true' : 'false');
    btn.setAttribute('aria-controls', `panel-${tab.id}`);
    btn.addEventListener('click', () => onTabChange(tab.id));
    nav.appendChild(btn);
  });

  return nav;
}

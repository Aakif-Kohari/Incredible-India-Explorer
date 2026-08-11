export function TabNav(tabs, activeTab) {
    const tabsHtml = tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return `<button class="battles-tab-btn ${isActive ? 'active' : ''}" data-tab="${tab.id}" aria-selected="${isActive}" role="tab">${tab.label}</button>`;
    }).join('');

    return `
        <div class="battles-tab-nav" role="tablist" aria-label="Battles Sections">
            <div class="battles-tab-scroll">
                ${tabsHtml}
            </div>
        </div>
    `;
}

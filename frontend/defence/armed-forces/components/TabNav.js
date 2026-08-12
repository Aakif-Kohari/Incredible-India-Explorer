export function TabNav(tabs, activeTab) {
    const tabsHtml = tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return `<button class="tab-btn ${isActive ? 'active' : ''}" data-tab="${tab.id}" aria-selected="${isActive}" role="tab">${tab.label}</button>`;
    }).join('');

    return `
        <div class="tab-nav" role="tablist" aria-label="Armed Forces Sections">
            <div class="tab-scroll">
                ${tabsHtml}
            </div>
        </div>
    `;
}

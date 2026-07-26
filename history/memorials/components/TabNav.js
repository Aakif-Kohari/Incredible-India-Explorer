export function TabNav(tabs, activeTab) {
  const tabsHtml = tabs
    .map((tab) => {
      const isActive = tab.id === activeTab;
      return `<button class="memorials-tab-btn ${isActive ? "active" : ""}" 
        data-tab="${tab.id}" 
        role="tab" 
        aria-selected="${isActive}"
        tabindex="${isActive ? 0 : -1}">
        ${tab.label}
      </button>`;
    })
    .join("");

  return `<div class="memorials-tab-nav" role="tablist">
    <div class="tab-scroll">${tabsHtml}</div>
  </div>`;
}

export function SearchBar() {
    return `
        <div class="search-container">
            <div class="search-input-wrapper">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                    type="text" 
                    id="pm-search" 
                    placeholder="Search by name, event, reform (e.g., 'Nehru', 'Pokhran', 'RTI')..." 
                    aria-label="Search Prime Ministers of India"
                    autocomplete="off"
                />
                <button id="btn-clear-search" class="btn-clear-search" title="Clear search" style="display: none;" aria-label="Clear search">
                    ✕
                </button>
            </div>
        </div>
    `;
}

export function SearchBar() {
    return `
        <div class="search-container">
            <label for="ministry-search" class="sr-only">Search Ministries</label>
            <input type="text" id="ministry-search" placeholder="Search by ministry name..." aria-label="Search Ministries">
            <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </span>
        </div>
    `;
}

export function SearchBar() {
    return `
        <div class="search-container">
            <label for="gov-search" class="sr-only">Search Governors</label>
            <input type="text" id="gov-search" placeholder="Search by name or appointment year..." aria-label="Search Governors">
            <span class="search-icon">🔍</span>
        </div>
    `;
}

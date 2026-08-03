export function SearchBar() {
    return `
        <div class="search-container">
            <label for="vp-search" class="sr-only">Search Vice Presidents</label>
            <input type="text" id="vp-search" placeholder="Search by name or election year..." aria-label="Search Vice Presidents">
            <span class="search-icon">🔍</span>
        </div>
    `;
}

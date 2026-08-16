export function SearchBar() {
    return `
        <div class="search-container">
            <label for="cec-search" class="sr-only">Search Commissioners</label>
            <input type="text" id="cec-search" placeholder="Search by name or appointment year..." aria-label="Search Commissioners">
            <span class="search-icon">🔍</span>
        </div>
    `;
}

export function SearchBar() {
    return `
        <div class="search-container">
            <label for="pm-search" class="sr-only">Search Prime Ministers</label>
            <input type="text" id="pm-search" placeholder="Search by name (e.g. Narendra)" aria-label="Search Prime Ministers">
            <span class="search-icon">🔍</span>
        </div>
    `;
}

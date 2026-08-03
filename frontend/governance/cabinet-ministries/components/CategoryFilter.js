export function CategoryFilter(categories) {
    const optionsHtml = categories.map(c => `<option value="${c}">${c}</option>`).join('');

    return `
        <div class="filter-container">
            <label for="category-filter" class="sr-only">Filter by Category</label>
            <select id="category-filter" aria-label="Filter by Category">
                <option value="All">All Categories</option>
                ${optionsHtml}
            </select>
        </div>
    `;
}

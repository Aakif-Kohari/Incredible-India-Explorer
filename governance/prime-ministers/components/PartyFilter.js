export function PartyFilter(parties) {
    const optionsHtml = parties.map(party => `<option value="${party}">${party}</option>`).join('');
    
    return `
        <div class="filter-container">
            <label for="party-filter" class="sr-only">Filter by Political Party</label>
            <select id="party-filter" aria-label="Filter by Political Party">
                <option value="All">All Parties</option>
                ${optionsHtml}
            </select>
        </div>
    `;
}

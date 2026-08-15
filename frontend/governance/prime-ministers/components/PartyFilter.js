export function PartyFilter(selectedParty = 'all') {
    const parties = [
        { id: 'all', label: 'All Political Parties' },
        { id: 'INC', label: 'Indian National Congress (INC)' },
        { id: 'BJP', label: 'Bharatiya Janata Party (BJP)' },
        { id: 'Janata Party', label: 'Janata Party / Coalition' },
        { id: 'Janata Dal', label: 'Janata Dal / United Front' }
    ];

    const optionsHtml = parties.map(p => `
        <option value="${p.id}" ${selectedParty === p.id ? 'selected' : ''}>
            ${p.label}
        </option>
    `).join('');

    return `
        <div class="filter-container">
            <label for="party-filter" class="filter-label">
                <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span>Filter Party:</span>
            </label>
            <select id="party-filter" aria-label="Filter Prime Ministers by Political Party">
                ${optionsHtml}
            </select>
        </div>
    `;
}

export function RankTable(ranks, service) {
    const serviceRanks = ranks[service] || [];

    if (serviceRanks.length === 0) {
        return `<div class="no-results">No ranks available for this service.</div>`;
    }

    let currentGrade = '';
    const rowsHtml = serviceRanks.map(rank => {
        let gradeHeader = '';
        if (rank.grade !== currentGrade) {
            currentGrade = rank.grade;
            gradeHeader = `<tr class="grade-header"><td colspan="5">${rank.grade}</td></tr>`;
        }
        return `
            ${gradeHeader}
            <tr>
                <td class="rank-name">${rank.rank}</td>
                <td class="rank-abbr">${rank.abbr}</td>
                <td class="rank-nato">${rank.natoEquivalent}</td>
                <td class="rank-pay">${rank.payLevel}</td>
                <td class="rank-desc">${rank.description}</td>
            </tr>
        `;
    }).join('');

    return `
        <div class="rank-table-wrapper">
            <table class="rank-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Abbreviation</th>
                        <th>NATO Eqvt.</th>
                        <th>Pay Level</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;
}

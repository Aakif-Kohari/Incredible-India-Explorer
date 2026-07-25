export function MinistryDetail(ministry) {
    const responsibilitiesHtml = ministry.responsibilities.map(r => `<li>${r}</li>`).join('');
    const departmentsHtml = ministry.departments.map(d => `<li>${d}</li>`).join('');

    return `
        <div class="ministry-detail-content">
            <div class="detail-section">
                <h4>Responsibilities</h4>
                <ul class="detail-list">${responsibilitiesHtml}</ul>
            </div>
            <div class="detail-section">
                <h4>Departments</h4>
                <ul class="detail-list">${departmentsHtml}</ul>
            </div>
            <div class="detail-section">
                <h4>Organizational Structure</h4>
                <p class="detail-text">${ministry.orgStructure}</p>
            </div>
            <div class="detail-meta">
                <span class="meta-item"><strong>Established:</strong> ${ministry.established}</span>
                <a class="meta-link" href="${ministry.website}" target="_blank" rel="noopener noreferrer">Official Website &rarr;</a>
            </div>
        </div>
    `;
}

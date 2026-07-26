export function CDSSection(cds) {
    const respHtml = cds.responsibilities.map(r => `<li>${r}</li>`).join('');
    const historyHtml = cds.history.map(h => `
        <div class="cds-timeline-item">
            <div class="cds-timeline-year">${h.year}</div>
            <div class="cds-timeline-content">
                <h4>${h.title}</h4>
                <p>${h.detail}</p>
            </div>
        </div>
    `).join('');

    return `
        <div class="cds-section">
            <div class="cds-header">
                <div class="cds-emblem">CDS</div>
                <div>
                    <h3>${cds.title}</h3>
                    <p class="cds-current">${cds.currentHolder} (since ${cds.since})</p>
                </div>
            </div>
            <div class="cds-body">
                <p class="cds-overview">${cds.overview}</p>
                <div class="cds-section-block">
                    <h4>Responsibilities</h4>
                    <ul class="cds-responsibilities">${respHtml}</ul>
                </div>
                <div class="cds-section-block">
                    <h4>Organizational Structure</h4>
                    <p class="cds-org">${cds.organizationalStructure}</p>
                </div>
                <div class="cds-section-block">
                    <h4>History</h4>
                    <div class="cds-timeline">
                        ${historyHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

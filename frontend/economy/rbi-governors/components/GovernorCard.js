export function GovernorCard(gov, index) {
    const reformsHtml = gov.reforms.map(r => `<li>${r}</li>`).join('');
    const monetaryHtml = gov.monetaryPolicy.map(m => `<li>${m}</li>`).join('');
    const achievementsHtml = gov.achievements.map(a => `<li>${a}</li>`).join('');
    const factsHtml = gov.facts.map(f => `<p>💡 ${f}</p>`).join('');

    return `
        <div class="gov-card" id="gov-${index}">
            <div class="gov-card-header">
                <div class="gov-portrait">
                    <img src="${gov.photo}" alt="Portrait of ${gov.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/150';" />
                </div>
                <div class="gov-title">
                    <h3>${gov.name}</h3>
                    <p class="gov-term-label">RBI Governor</p>
                    <p class="gov-meta"><strong>Appointment:</strong> ${gov.appointmentDate}</p>
                    <p class="gov-meta"><strong>Term End:</strong> ${gov.endDate}</p>
                    <p class="gov-meta"><strong>Tenure:</strong> ${gov.tenure}</p>
                </div>
            </div>
            <div class="gov-card-body">
                <div class="gov-section">
                    <h4>Major Banking Reforms</h4>
                    <ul>${reformsHtml}</ul>
                </div>
                <div class="gov-section">
                    <h4>Monetary Policy Contributions</h4>
                    <ul>${monetaryHtml}</ul>
                </div>
                <div class="gov-section">
                    <h4>Key Achievements</h4>
                    <ul>${achievementsHtml}</ul>
                </div>
                <div class="gov-section gov-facts">
                    <h4>Interesting Facts</h4>
                    ${factsHtml}
                </div>
            </div>
        </div>
    `;
}

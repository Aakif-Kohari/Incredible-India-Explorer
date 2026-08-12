export function CommissionerCard(cec, index) {
    const reformsHtml = cec.reforms.map(r => `<li>${r}</li>`).join('');
    const electionsHtml = cec.electionsConducted.map(e => `<li>${e}</li>`).join('');
    const achievementsHtml = cec.achievements.map(a => `<li>${a}</li>`).join('');
    const factsHtml = cec.facts.map(f => `<p>💡 ${f}</p>`).join('');

    return `
        <div class="cec-card" id="cec-${index}">
            <div class="cec-card-header">
                <div class="cec-portrait">
                    <img src="${cec.portrait}" alt="Portrait of ${cec.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/150';" />
                </div>
                <div class="cec-title">
                    <h3>${cec.name}</h3>
                    <p class="cec-term-label">Chief Election Commissioner</p>
                    <p class="cec-meta"><strong>Appointment:</strong> ${cec.appointmentDate}</p>
                    <p class="cec-meta"><strong>Term End:</strong> ${cec.endDate}</p>
                    <p class="cec-meta"><strong>Tenure:</strong> ${cec.tenure}</p>
                </div>
            </div>
            <div class="cec-card-body">
                <div class="cec-section">
                    <h4>Election Reforms</h4>
                    <ul>${reformsHtml}</ul>
                </div>
                <div class="cec-section">
                    <h4>Major Elections Conducted</h4>
                    <ul>${electionsHtml}</ul>
                </div>
                <div class="cec-section">
                    <h4>Key Achievements</h4>
                    <ul>${achievementsHtml}</ul>
                </div>
                <div class="cec-section cec-facts">
                    <h4>Interesting Facts</h4>
                    ${factsHtml}
                </div>
            </div>
        </div>
    `;
}

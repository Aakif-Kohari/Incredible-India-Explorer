export function VicePresidentCard(vp, index) {
    const contributionsHtml = vp.contributions.map(c => `<li>${c}</li>`).join('');
    const factsHtml = vp.interestingFacts.map(f => `<p>💡 ${f}</p>`).join('');

    return `
        <div class="vp-card" id="vp-${index}">
            <div class="vp-card-header">
                <div class="vp-portrait">
                    <img src="${vp.portrait}" alt="Portrait of ${vp.name}" loading="lazy" />
                </div>
                <div class="vp-title">
                    <h3>${vp.name}</h3>
                    <p class="vp-term-label">${index + 1}${getOrdinal(index + 1)} Vice President of India</p>
                    <p class="vp-meta"><strong>Election:</strong> ${vp.electionYear}</p>
                    <p class="vp-meta"><strong>Term:</strong> ${vp.termStart} – ${vp.termEnd}</p>
                </div>
            </div>
            <div class="vp-card-body">
                <div class="vp-section">
                    <h4>Political Background</h4>
                    <p>${vp.politicalBackground}</p>
                </div>
                <div class="vp-section">
                    <h4>Role in Rajya Sabha</h4>
                    <p>${vp.rajyaSabhaRole}</p>
                </div>
                <div class="vp-section">
                    <h4>Major Contributions</h4>
                    <ul>${contributionsHtml}</ul>
                </div>
                <div class="vp-section vp-facts">
                    <h4>Interesting Facts</h4>
                    ${factsHtml}
                </div>
            </div>
        </div>
    `;
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return (s[(v - 20) % 10] || s[v] || s[0]);
}

export function CommandersGallery(commanders) {
    const cardsHtml = commanders.map(cmd => {
        const battlesHtml = cmd.battles.map(b => `<li>${b}</li>`).join('');

        return `
            <div class="commander-card" style="--cmd-color: ${cmd.color}">
                <div class="commander-avatar" style="background: ${cmd.color}">
                    ${cmd.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div class="commander-info">
                    <h4>${cmd.name}</h4>
                    <p class="commander-title">${cmd.title}</p>
                    <span class="commander-era">${cmd.era}</span>
                    <p class="commander-desc">${cmd.description}</p>
                    <div class="commander-battles">
                        <span class="cb-label">Battles:</span>
                        <ul>${battlesHtml}</ul>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `<div class="commanders-grid">${cardsHtml}</div>`;
}

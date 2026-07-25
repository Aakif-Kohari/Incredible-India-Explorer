export function UniformShowcase(uniforms) {
    const cardsHtml = uniforms.map(u => {
        const variantsHtml = u.variants.map(v => `<li>${v}</li>`).join('');

        return `
            <div class="uniform-card">
                <div class="uniform-header" data-service="${u.service}">
                    <span class="uniform-service-badge">${u.service}</span>
                    <h4>${u.name}</h4>
                </div>
                <div class="uniform-body">
                    <p class="uniform-description">${u.description}</p>
                    <div class="uniform-usage">
                        <strong>Usage:</strong> ${u.usage}
                    </div>
                    <div class="uniform-variants">
                        <strong>Variants:</strong>
                        <ul>${variantsHtml}</ul>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="uniform-grid">
            ${cardsHtml}
        </div>
    `;
}

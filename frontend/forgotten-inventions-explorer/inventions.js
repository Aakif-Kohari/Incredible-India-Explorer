document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('inv-grid');
    if (!grid) return;

    grid.innerHTML = INVENTIONS.map(item => `
        <a class="inv-card" href="${item.link}">
            <span class="inv-card-icon">${item.icon}</span>
            <h3>${item.title}</h3>
            <p class="inv-card-era">${item.era}</p>
            <p class="inv-card-summary">${item.summary}</p>
            <span class="inv-card-cta">Explore →</span>
        </a>
    `).join('');
});
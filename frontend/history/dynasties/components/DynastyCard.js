import { dynasties } from '../data.js';

export function DynastyCard({ dynastyId, onExpand }) {
  const d = dynasties.find(x => x.id === dynastyId);
  if (!d) return document.createElement('div');

  const card = document.createElement('div');
  card.className = 'dynasty-card';
  card.style.setProperty('--dynasty-color', d.color);

  card.innerHTML = `
    <div class="dynasty-card-header">
      <div class="dynasty-card-title-row">
        <h3 class="dynasty-card-name">${d.name}</h3>
        <button class="expand-btn" aria-label="Expand details for ${d.name}">+</button>
      </div>
      <span class="dynasty-card-period">${d.period}</span>
      <span class="dynasty-card-capital">Capital: ${d.capital}</span>
    </div>
    <div class="dynasty-card-body">
      <div class="dynasty-card-stats">
        <div class="stat">
          <span class="stat-label">Founder</span>
          <span class="stat-value">${d.founders}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Peak Extent</span>
          <span class="stat-value">${d.peakExtent}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Governance</span>
          <span class="stat-value">${d.governance}</span>
        </div>
      </div>
      <div class="dynasty-card-rulers">
        <h4>Notable Rulers</h4>
        <ul>
          ${d.notableRulers.map(r => `
            <li>
              <strong>${r.name}</strong> <span class="ruler-reign">${r.reign}</span>
              <p class="ruler-achievement">${r.achievement}</p>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="dynasty-card-detail" style="display:none">
        <div class="detail-section">
          <h4>Contributions</h4>
          <ul class="contributions-list">
            ${d.contributions.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
        <div class="detail-section">
          <h4>Art & Architecture</h4>
          <p>${d.art}</p>
        </div>
        <div class="detail-section">
          <h4>Decline</h4>
          <p>${d.decline}</p>
        </div>
      </div>
    </div>
  `;

  const expandBtn = card.querySelector('.expand-btn');
  const detail = card.querySelector('.dynasty-card-detail');
  expandBtn.addEventListener('click', () => {
    const isHidden = detail.style.display === 'none';
    detail.style.display = isHidden ? 'block' : 'none';
    expandBtn.textContent = isHidden ? '−' : '+';
    expandBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  });

  return card;
}

export function DynastyCardsList({ era }) {
  const container = document.createElement('div');
  container.className = 'dynasty-cards-grid';

  const filtered = era === 'all'
    ? dynasties
    : dynasties.filter(d => d.era === era);

  filtered.forEach(d => {
    container.appendChild(DynastyCard({ dynastyId: d.id }));
  });

  return container;
}

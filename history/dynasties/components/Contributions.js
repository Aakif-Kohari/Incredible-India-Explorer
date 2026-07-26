import { dynasties } from '../data.js';

export function Contributions() {
  const container = document.createElement('div');
  container.className = 'contributions-container';

  const categories = {
    'Architecture & Art': [],
    'Science & Literature': [],
    'Governance & Military': [],
    'Culture & Religion': []
  };

  dynasties.forEach(d => {
    d.contributions.forEach(c => {
      const lower = c.toLowerCase();
      if (lower.includes('temple') || lower.includes('architecture') || lower.includes('painting') || lower.includes('sculpture') || lower.includes('bronze') || lower.includes('built') || lower.includes('fort') || lower.includes('taj')) {
        categories['Architecture & Art'].push({ text: c, dynasty: d.name, color: d.color });
      } else if (lower.includes('university') || lower.includes('literature') || lower.includes('zero') || lower.includes('math') || lower.includes('science') || lower.includes('astronomy') || lower.includes('surgery') || lower.includes('language')) {
        categories['Science & Literature'].push({ text: c, dynasty: d.name, color: d.color });
      } else if (lower.includes('admin') || lower.includes('revenue') || lower.includes('military') || lower.includes('naval') || lower.includes('governance') || lower.includes('warfare') || lower.includes('postal')) {
        categories['Governance & Military'].push({ text: c, dynasty: d.name, color: d.color });
      } else {
        categories['Culture & Religion'].push({ text: c, dynasty: d.name, color: d.color });
      }
    });
  });

  container.innerHTML = '<h3 class="section-subtitle">Key Contributions by Category</h3>';

  const grid = document.createElement('div');
  grid.className = 'contributions-grid';

  Object.entries(categories).forEach(([cat, items]) => {
    const card = document.createElement('div');
    card.className = 'contribution-category-card';
    card.innerHTML = `
      <h4>${cat}</h4>
      <ul>
        ${items.map(item => `
          <li>
            <span class="contribution-dynasty" style="color:${item.color}">${item.dynasty}</span>
            ${item.text}
          </li>
        `).join('')}
      </ul>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
  return container;
}

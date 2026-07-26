import { dynasties } from '../data.js';

export function DynastyMap() {
  const container = document.createElement('div');
  container.className = 'dynasty-map-container';

  container.innerHTML = `
    <h3 class="section-subtitle">Dynasty Territories</h3>
    <div class="dynasty-map-wrapper">
      <div class="india-map">
        <svg viewBox="0 0 400 500" class="india-outline">
          <path d="M200,20 L260,50 L300,80 L320,120 L340,160 L350,200 L360,240 L370,280 L360,320 L340,360 L310,400 L280,430 L250,460 L220,480 L200,490 L180,480 L150,460 L120,430 L90,400 L70,360 L50,320 L40,280 L45,240 L55,200 L70,160 L90,120 L120,80 L160,50 Z"
                fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>
        </svg>
        ${dynasties.map(d => `
          <div class="map-marker" style="top:${d.mapPosition.top};left:${d.mapPosition.left};--marker-color:${d.color}"
               data-dynasty="${d.id}" title="${d.name} (${d.period})">
            <span class="marker-dot"></span>
            <span class="marker-label">${d.name.split(' ')[0]}</span>
          </div>
        `).join('')}
      </div>
      <div class="map-legend">
        ${dynasties.map(d => `
          <div class="legend-item" data-dynasty="${d.id}">
            <span class="legend-color" style="background:${d.color}"></span>
            <span class="legend-name">${d.name}</span>
            <span class="legend-period">${d.period}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const markers = container.querySelectorAll('.map-marker');
  markers.forEach(marker => {
    marker.addEventListener('click', () => {
      const id = marker.dataset.dynasty;
      const d = dynasties.find(x => x.id === id);
      if (!d) return;

      const popup = document.createElement('div');
      popup.className = 'map-popup';
      popup.innerHTML = `
        <h4 style="color:${d.color}">${d.name}</h4>
        <p class="popup-period">${d.period}</p>
        <p class="popup-capital">Capital: ${d.capital}</p>
        <p class="popup-territory">Territory: ${d.territory}</p>
      `;
      marker.appendChild(popup);

      const close = () => { popup.remove(); };
      popup.addEventListener('click', (e) => { e.stopPropagation(); close(); });
      setTimeout(() => document.addEventListener('click', close, { once: true }), 10);
    });
  });

  return container;
}

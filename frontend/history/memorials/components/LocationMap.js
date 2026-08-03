export function LocationMap(memorials) {
  const markersHtml = memorials
    .map(
      (m) => `
    <div class="location-marker" data-id="${m.id}" style="left: ${((m.coordinates.lng - 68) / 25) * 100}%; top: ${((36 - m.coordinates.lat) / 16) * 100}%;">
      <div class="location-dot" style="background: ${m.color}"></div>
      <div class="location-label">${m.name}</div>
      <div class="location-tooltip">
        <strong>${m.name}</strong><br/>
        ${m.city}, ${m.state}<br/>
        <small>${m.coordinates.lat.toFixed(2)}°N, ${m.coordinates.lng.toFixed(2)}°E</small>
      </div>
    </div>`
    )
    .join("");

  return `<div class="location-map-container">
    <div class="location-map">
      <div class="map-silhouette">
        <svg viewBox="0 0 300 350" class="india-outline">
          <path d="M150,20 L180,30 L210,50 L230,80 L240,110 L260,130 L270,160 L260,190 L240,210 L250,240 L240,270 L220,290 L200,310 L170,330 L140,340 L110,330 L80,310 L60,280 L50,250 L40,220 L30,190 L40,160 L50,130 L60,100 L80,70 L100,50 L120,30 Z" 
            fill="none" stroke="var(--text-secondary)" stroke-width="1" opacity="0.3"/>
        </svg>
      </div>
      ${markersHtml}
    </div>
    <div class="location-legend">
      <h4>Memorials</h4>
      ${memorials
        .map(
          (m) => `
        <div class="legend-item" data-id="${m.id}">
          <span class="legend-dot" style="background: ${m.color}"></span>
          <span class="legend-name">${m.name}</span>
          <span class="legend-coords">${m.coordinates.lat.toFixed(2)}°N, ${m.coordinates.lng.toFixed(2)}°E</span>
        </div>`
        )
        .join("")}
    </div>
  </div>`;
}

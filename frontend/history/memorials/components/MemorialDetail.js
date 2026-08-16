export function MemorialDetail(memorial) {
  return `<div class="memorial-detail" data-id="${memorial.id}">
    <div class="memorial-detail-header" style="border-top-color: ${memorial.color}">
      <div class="memorial-detail-image">
        <img src="${memorial.image}" alt="${memorial.name}" />
      </div>
      <div class="memorial-detail-info">
        <span class="memorial-detail-year" style="background: ${memorial.color}">${memorial.built}</span>
        <h2 class="memorial-detail-name">${memorial.name}</h2>
        <p class="memorial-detail-location">${memorial.city}, ${memorial.state}</p>
        <p class="memorial-detail-architect"><strong>Architect:</strong> ${memorial.architect}</p>
        <p class="memorial-detail-style"><strong>Style:</strong> ${memorial.architecturalStyle}</p>
      </div>
    </div>
    <div class="memorial-detail-body">
      <div class="memorial-detail-section">
        <h3>Significance</h3>
        <p>${memorial.significance}</p>
      </div>
      <div class="memorial-detail-section">
        <h3>History</h3>
        <p>${memorial.history}</p>
      </div>
      <div class="memorial-detail-visiting">
        <div class="visiting-info">
          <span class="visiting-label">Visiting Hours</span>
          <span class="visiting-value">${memorial.visitingHours}</span>
        </div>
        <div class="visiting-info">
          <span class="visiting-label">Status</span>
          <span class="visiting-value">${memorial.status}</span>
        </div>
      </div>
    </div>
  </div>`;
}

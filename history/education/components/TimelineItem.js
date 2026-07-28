export function TimelineItem(entry, era) {
  const color = era ? era.color : "#FF6B35";

  return `<div class="timeline-item" data-era-id="${entry.eraId}" style="--item-color: ${color}">
    <div class="timeline-dot" style="background: ${color}"></div>
    <div class="timeline-content">
      <span class="timeline-year">${entry.year}</span>
      <h4 class="timeline-title">${era ? era.name : entry.eraId}</h4>
      <p class="timeline-then"><strong>Then:</strong> ${entry.then}</p>
      <p class="timeline-now"><strong>Today's equivalent:</strong> ${entry.now}</p>
    </div>
  </div>`;
}
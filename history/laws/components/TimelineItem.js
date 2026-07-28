export function TimelineItem(entry, law) {
  const color = law ? law.color : "#FF6B35";

  return `<div class="timeline-item" data-law-id="${entry.lawId}" style="--item-color: ${color}">
    <div class="timeline-dot" style="background: ${color}"></div>
    <div class="timeline-content">
      <span class="timeline-year">${entry.year}</span>
      <h4 class="timeline-title">${law ? law.name : entry.lawId}</h4>
      <p class="timeline-event">${entry.event}</p>
    </div>
  </div>`;
}
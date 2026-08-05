import { timelineEvents, dynasties } from '../data.js';

export function DynastyTimeline() {
  const container = document.createElement('div');
  container.className = 'dynasty-timeline-container';

  const sorted = [...timelineEvents].sort((a, b) => a.year - b.year);
  const minYear = sorted[0].year;
  const maxYear = sorted[sorted.length - 1].year;
  const range = maxYear - minYear;

  const timeline = document.createElement('div');
  timeline.className = 'dynasty-timeline';

  sorted.forEach((evt, i) => {
    const pos = ((evt.year - minYear) / range) * 100;
    const dynasty = dynasties.find(d => d.id === evt.dynasty);
    const isLeft = i % 2 === 0;

    const item = document.createElement('div');
    item.className = `timeline-event ${isLeft ? 'left' : 'right'}`;
    item.style.setProperty('--pos', `${pos}%`);

    const yearLabel = evt.year < 0 ? `${Math.abs(evt.year)} BCE` : `${evt.year} CE`;

    item.innerHTML = `
      <div class="timeline-dot" style="background:${dynasty ? dynasty.color : '#666'}"></div>
      <div class="timeline-content">
        <span class="timeline-year" style="color:${dynasty ? dynasty.color : '#666'}">${yearLabel}</span>
        <p class="timeline-text">${evt.event}</p>
        <span class="timeline-dynasty">${dynasty ? dynasty.name : ''}</span>
      </div>
    `;
    timeline.appendChild(item);
  });

  container.innerHTML = '<h3 class="section-subtitle">Chronological Timeline</h3>';
  container.appendChild(timeline);
  return container;
}

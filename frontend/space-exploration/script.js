import { isroTimelineData } from './data.js';

(() => {
  const container = document.getElementById('timeline-container');

  function init() {
    renderTimeline(isroTimelineData);
  }

  function renderTimeline(data) {
    container.innerHTML = '';
    
    data.forEach(item => {
      // Create Article (Timeline Item)
      const article = document.createElement('article');
      article.className = 'timeline-item';
      
      // Create Marker
      const marker = document.createElement('div');
      marker.className = 'timeline-marker';
      marker.setAttribute('aria-hidden', 'true');
      
      // Create Content Card
      const content = document.createElement('div');
      content.className = 'timeline-content';
      content.setAttribute('tabindex', '0'); // Make it focusable for keyboard users
      
      // Year
      const year = document.createElement('div');
      year.className = 'timeline-year';
      year.textContent = item.year;
      
      // Title
      const title = document.createElement('h3');
      title.className = 'timeline-title';
      title.textContent = item.mission;
      
      // Figure (Image)
      const figure = document.createElement('figure');
      figure.className = 'timeline-figure';
      
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = `Illustration or photo of ${item.mission}`;
      img.loading = 'lazy';
      img.onerror = () => {
        img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22200%22%20viewBox%3D%220%200%20400%20200%22%3E%3Crect%20fill%3D%22%231C2541%22%20width%3D%22400%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%23E0E1DD%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%228%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EImage%20Unavailable%3C%2Ftext%3E%3C%2Fsvg%3E';
      };
      
      figure.appendChild(img);
      
      // Details Container
      const details = document.createElement('div');
      details.className = 'timeline-data';
      
      details.innerHTML = `
        <div class="data-row">
          <span class="data-label">Category:</span>
          <span class="data-value">${item.category}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Vehicle:</span>
          <span class="data-value">${item.vehicle}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Objective:</span>
          <span class="data-value">${item.objective}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Outcome:</span>
          <span class="data-value">${item.outcome}</span>
        </div>
      `;
      
      // Description
      const description = document.createElement('p');
      description.textContent = item.description;
      description.style.color = 'var(--color-text-muted)';
      description.style.fontSize = '0.95rem';
      
      // Achievement Highlight
      const achievement = document.createElement('div');
      achievement.className = 'timeline-achievement';
      achievement.innerHTML = `
        <strong>Achievement Highlight</strong>
        <p>${item.achievement}</p>
      `;
      
      // Assembly
      content.appendChild(year);
      content.appendChild(title);
      content.appendChild(figure);
      content.appendChild(details);
      content.appendChild(description);
      content.appendChild(achievement);
      
      article.appendChild(marker);
      article.appendChild(content);
      
      container.appendChild(article);
    });
  }

  // Init Module
  init();

})();

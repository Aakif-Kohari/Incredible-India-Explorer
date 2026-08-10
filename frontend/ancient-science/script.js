import { ancientScienceData } from './data.js';

(() => {
  const grid = document.getElementById('learning-grid');

  function init() {
    renderCards(ancientScienceData);
  }

  function renderCards(data) {
    grid.innerHTML = '';
    
    data.forEach(item => {
      // Container
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('aria-label', `${item.title}. Press Enter or Space to flip.`);

      // Inner Wrapper (3D context)
      const inner = document.createElement('div');
      inner.className = 'flip-card-inner';

      // Front Face
      const front = document.createElement('div');
      front.className = 'flip-card-front';
      front.setAttribute('aria-hidden', 'false');

      const imgContainer = document.createElement('div');
      imgContainer.className = 'card-image';
      
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = `Illustration for ${item.title}`;
      img.loading = 'lazy';
      img.onerror = () => {
        img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22200%22%20viewBox%3D%220%200%20400%20200%22%3E%3Crect%20fill%3D%22%23E6D5B8%22%20width%3D%22400%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%232c3e50%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%228%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EImage%20Unavailable%3C%2Ftext%3E%3C%2Fsvg%3E';
      };
      
      imgContainer.appendChild(img);

      const contentFront = document.createElement('div');
      contentFront.className = 'card-content-front';
      
      contentFront.innerHTML = `
        <span class="card-category">${item.category}</span>
        <h2 class="card-title">${item.title}</h2>
        <p class="card-period">${item.period}</p>
        <span class="card-hint">↻ Tap to Explore</span>
      `;
      
      front.appendChild(imgContainer);
      front.appendChild(contentFront);

      // Back Face
      const back = document.createElement('div');
      back.className = 'flip-card-back';
      back.setAttribute('aria-hidden', 'true');

      const contentBack = document.createElement('div');
      contentBack.className = 'card-content-back';
      
      contentBack.innerHTML = `
        <h3 class="back-title">${item.title}</h3>
        <p class="back-summary">${item.summary}</p>
        <div class="back-meta">
          <h4>Key Contributors</h4>
          <p>${item.contributor}</p>
        </div>
        <div class="back-meta">
          <h4>Impact</h4>
          <p>${item.significance}</p>
        </div>
        ${item.link ? `<div class="back-action" style="margin-top: 10px;"><a href="${item.link}" class="btn-link" style="color: #fbbf24; text-decoration: underline; font-weight: bold;">Launch Dedicated Explorer ➔</a></div>` : ''}
      `;
      
      back.appendChild(contentBack);

      // Assembly
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);

      // Event Listeners for Interaction
      const toggleFlip = () => {
        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-expanded', isFlipped);
        front.setAttribute('aria-hidden', isFlipped);
        back.setAttribute('aria-hidden', !isFlipped);
      };

      // Click/Tap
      card.addEventListener('click', toggleFlip);

      // Keyboard Accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });

      grid.appendChild(card);
    });
  }

  init();

})();

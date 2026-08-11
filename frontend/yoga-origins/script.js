import { ashramData, eightLimbs } from './data.js';

(() => {
  const limbsGrid = document.getElementById('eight-limbs-grid');
  const ashramsList = document.getElementById('ashrams-list');

  function init() {
    renderLimbs();
    renderAshrams();
  }

  function renderLimbs() {
    limbsGrid.innerHTML = '';
    eightLimbs.forEach((limb, index) => {
      const article = document.createElement('article');
      article.className = 'limb-card';
      // tabindex for sequential keyboard reading if desired, though semantic HTML is usually enough for screen readers.
      // We'll leave it as a static card without focus unless interactive, to follow best a11y practices.
      
      article.innerHTML = `
        <h3>
          ${index + 1}. ${limb.name}
          <span class="limb-meaning">(${limb.meaning})</span>
        </h3>
        <p>${limb.description}</p>
      `;
      limbsGrid.appendChild(article);
    });
  }

  function renderAshrams() {
    ashramsList.innerHTML = '';
    ashramData.forEach(ashram => {
      const article = document.createElement('article');
      article.className = 'ashram-card';
      
      const imgDiv = document.createElement('div');
      imgDiv.className = 'ashram-img';
      const img = document.createElement('img');
      img.src = ashram.image;
      img.alt = `Photo of ${ashram.name}`;
      img.loading = 'lazy';
      img.onerror = () => {
        img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22200%22%20viewBox%3D%220%200%20400%20200%22%3E%3Crect%20fill%3D%22%239CAF88%22%20width%3D%22400%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%232A5A5B%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%228%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EImage%20Unavailable%3C%2Ftext%3E%3C%2Fsvg%3E';
      };
      imgDiv.appendChild(img);

      const content = document.createElement('div');
      content.className = 'ashram-content';
      
      content.innerHTML = `
        <h3>${ashram.name}</h3>
        <p class="ashram-meta">${ashram.location}, ${ashram.state} | ${ashram.tradition}</p>
        <p>${ashram.description}</p>
      `;
      
      article.appendChild(imgDiv);
      article.appendChild(content);
      ashramsList.appendChild(article);
    });
  }

  init();
})();

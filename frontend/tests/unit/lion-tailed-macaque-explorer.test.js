/**
 * Unit tests for Lion-tailed Macaque Explorer (#1314)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { initGalleryLightbox, initSmoothScroll } from '../../lion-tailed-macaque-explorer/script.js';

describe('Lion-tailed Macaque Explorer Page (#1314)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="gallery-lightbox" class="lightbox-modal" aria-hidden="true">
        <span class="lightbox-close">&times;</span>
        <img id="lightbox-img" src="" alt="">
        <div id="lightbox-caption"></div>
      </div>
      <div class="gallery-item" data-caption="Test Caption">
        <img src="test.png" alt="Test Alt">
        <div class="gallery-caption">Test Caption</div>
      </div>
      <nav class="toc-nav">
        <a href="#overview">Overview</a>
      </nav>
      <section id="overview"></section>
    `;
  });

  it('exports functions correctly', () => {
    expect(typeof initGalleryLightbox).toBe('function');
    expect(typeof initSmoothScroll).toBe('function');
  });

  it('opens and closes gallery lightbox modal on interaction', () => {
    initGalleryLightbox();
    const modal = document.getElementById('gallery-lightbox');
    const galleryItem = document.querySelector('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    expect(modal.getAttribute('aria-hidden')).toBe('true');

    galleryItem.click();
    expect(modal.getAttribute('aria-hidden')).toBe('false');

    closeBtn.click();
    expect(modal.getAttribute('aria-hidden')).toBe('true');
  });
});

/**
 * Unit tests for Nilgiri Langur Explorer (#1316)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { initGalleryLightbox, initSmoothScroll } from '../../nilgiri-langur-explorer/script.js';

describe('Nilgiri Langur Explorer Page (#1316)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="gallery-lightbox" class="lightbox-modal" aria-hidden="true">
        <span class="lightbox-close">&times;</span>
        <img id="lightbox-img" src="" alt="">
        <div id="lightbox-caption"></div>
      </div>
      <div class="gallery-item" data-caption="Nilgiri Langur Test">
        <img src="test.png" alt="Test Alt">
        <div class="gallery-caption">Nilgiri Langur Test</div>
      </div>
      <nav class="toc-nav">
        <a href="#introduction">Introduction</a>
      </nav>
      <section id="introduction"></section>
    `;
  });

  it('exports functions correctly', () => {
    expect(typeof initGalleryLightbox).toBe('function');
    expect(typeof initSmoothScroll).toBe('function');
  });

  it('opens and closes gallery lightbox modal', () => {
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

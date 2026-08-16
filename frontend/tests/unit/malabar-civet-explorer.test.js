/**
 * Unit tests for Malabar Civet Explorer (#1317)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { initGalleryLightbox, initSmoothScroll } from '../../malabar-civet-explorer/script.js';

describe('Malabar Civet Explorer Page (#1317)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="gallery-lightbox" class="lightbox-modal" aria-hidden="true">
        <span class="lightbox-close">&times;</span>
        <img id="lightbox-img" src="" alt="">
        <div id="lightbox-caption"></div>
      </div>
      <div class="gallery-item" data-caption="Malabar Civet Test">
        <img src="test.png" alt="Test Alt">
        <div class="gallery-caption">Malabar Civet Test</div>
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

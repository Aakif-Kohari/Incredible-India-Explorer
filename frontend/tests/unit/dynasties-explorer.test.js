import { describe, it, expect } from 'vitest';
import { dynasties } from '../../history/dynasties/data.js';

describe('Dynasty explorer integration', () => {
  it('exposes a dedicated Maurya explorer link on the dynasties landing data', () => {
    const maurya = dynasties.find((dynasty) => dynasty.id === 'maurya');

    expect(maurya).toBeDefined();
    expect(maurya.explorerPath).toBe('../Maurya Dynasty/MauryaDynasty.html');
    expect(maurya.explorerLabel).toBe('Open Maurya Explorer');
  });

  it('exposes a dedicated Gupta explorer link on the dynasties landing data', () => {
    const gupta = dynasties.find((dynasty) => dynasty.id === 'gupta');

    expect(gupta).toBeDefined();
    expect(gupta.explorerPath).toBe('../Gupta Dynasty/GuptaDynasty.html');
    expect(gupta.explorerLabel).toBe('Open Gupta Explorer');
  });
});

import { describe, it, expect } from 'vitest';
import { dynasties } from '../../history/dynasties/data.js';

describe('Maurya dynasty explorer integration', () => {
  it('exposes a dedicated Maurya explorer link on the dynasties landing data', () => {
    const maurya = dynasties.find((dynasty) => dynasty.id === 'maurya');

    expect(maurya).toBeDefined();
    expect(maurya.explorerPath).toBe('../Maurya Dynasty/MauryaDynasty.html');
    expect(maurya.explorerLabel).toBe('Open Maurya Explorer');
  });
});

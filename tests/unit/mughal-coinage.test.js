import { describe, it, expect } from 'vitest';
import { dynasties } from '../../frontend/history/dynasties/data.js';

describe('Mughal dynasty explorer integration', () => {
  it('exposes a dedicated Mughal explorer link on the dynasties landing data', () => {
    const mughal = dynasties.find((dynasty) => dynasty.id === 'mughal');

    expect(mughal).toBeDefined();
    expect(mughal.explorerPath).toBe('../mughal-coinage/index.html');
    expect(mughal.explorerLabel).toBe('Open Mughal Coinage Explorer');
  });
});

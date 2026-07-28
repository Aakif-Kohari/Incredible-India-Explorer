import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TranslationClient } from '../../js-modules/i18n-translation-client.js';

function fakeFetch(responseBody, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: async () => responseBody,
  });
}

describe('TranslationClient', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('skips the network call when source and target languages match', async () => {
    const fetchImpl = fakeFetch({ translatedText: 'unused' });
    const client = new TranslationClient({ fetchImpl });

    const result = await client.translate('Hello', 'en', { sourceLang: 'en' });

    expect(result).toEqual({ text: 'Hello', source: 'skip', targetLang: 'en' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('calls the translate endpoint and returns the AI result', async () => {
    const fetchImpl = fakeFetch({ translatedText: 'नमस्ते' });
    const client = new TranslationClient({ fetchImpl });

    const result = await client.translate('Hello', 'hi');

    expect(result).toEqual({ text: 'नमस्ते', source: 'ai', targetLang: 'hi' });
    expect(fetchImpl).toHaveBeenCalledWith(
      '/api/translate',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('caches results so a repeated translation does not hit the network again', async () => {
    const fetchImpl = fakeFetch({ translatedText: 'नमस्ते' });
    const client = new TranslationClient({ fetchImpl });

    await client.translate('Hello', 'hi');
    const second = await client.translate('Hello', 'hi');

    expect(second.source).toBe('cache');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('falls back to the original text if the provider request fails', async () => {
    const fetchImpl = fakeFetch({}, false);
    const client = new TranslationClient({ fetchImpl });

    const result = await client.translate('Hello', 'hi');

    expect(result).toEqual({ text: 'Hello', source: 'error', targetLang: 'hi' });
  });

  it('de-duplicates concurrent requests for the same text and language', async () => {
    const fetchImpl = fakeFetch({ translatedText: 'नमस्ते' });
    const client = new TranslationClient({ fetchImpl });

    const [a, b] = await Promise.all([
      client.translate('Hello', 'hi'),
      client.translate('Hello', 'hi'),
    ]);

    expect(a.text).toBe('नमस्ते');
    expect(b.text).toBe('नमस्ते');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});

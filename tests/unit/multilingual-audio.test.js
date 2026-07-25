import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MultilingualAudioEngine } from '../../js-modules/multilingual-audio-engine.js';

describe('Multilingual Audio Engine', () => {
  let mockSynth;
  let engine;

  beforeEach(() => {
    if (typeof globalThis.SpeechSynthesisUtterance === 'undefined') {
      globalThis.SpeechSynthesisUtterance = class {
        constructor(text) {
          this.text = text;
          this.rate = 1.0;
          this.lang = 'en-IN';
        }
      };
    }

    mockSynth = {
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn().mockReturnValue([])
    };

    engine = new MultilingualAudioEngine({ speechSynth: mockSynth });
  });

  it('should retrieve phonetic transliteration and native script for regional terms', () => {
    const info = engine.getPronunciation('Mekhela Chador');
    expect(info.phonetic).toBe('Meh-kheh-la Cha-dor');
    expect(info.script).toBe('মেখেলা চাদৰ');
    expect(info.lang).toBe('as-IN');
  });

  it('should trigger speech synthesis when speak() is called', () => {
    const success = engine.speak('Pithla Bhakri');
    expect(success).toBe(true);
    expect(mockSynth.speak).toHaveBeenCalledOnce();
  });

  it('should fall back safely when speech synth is unavailable', () => {
    const fallbackEngine = new MultilingualAudioEngine({ speechSynth: null });
    const success = fallbackEngine.speak('Axone');
    expect(success).toBe(false);
  });
});

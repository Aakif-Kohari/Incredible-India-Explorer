import { describe, it, expect, vi } from 'vitest';
import { SpeechSynthesisAdapter } from '../../frontend/js-modules/voice/speech-synthesis-adapter.js';

function fakeSynth(voices) {
  return {
    cancel: vi.fn(),
    speak: vi.fn(),
    getVoices: () => voices,
  };
}

class FakeUtterance {
  constructor(text) {
    this.text = text;
    this.rate = 1;
    this.pitch = 1;
  }
}

describe('SpeechSynthesisAdapter', () => {
  it('returns false and does nothing when synthesis is unavailable', () => {
    const adapter = new SpeechSynthesisAdapter({ synth: null, UtteranceCtor: FakeUtterance });
    expect(adapter.speak('hello')).toBe(false);
  });

  it('finds an exact language match', () => {
    const voices = [{ lang: 'en-US' }, { lang: 'hi-IN' }];
    const adapter = new SpeechSynthesisAdapter({ synth: fakeSynth(voices), UtteranceCtor: FakeUtterance });
    expect(adapter.findVoiceForLanguage('hi-IN')).toBe(voices[1]);
  });

  it('falls back to a base-language match when no exact match exists', () => {
    const voices = [{ lang: 'en-US' }, { lang: 'hi-IN' }];
    const adapter = new SpeechSynthesisAdapter({ synth: fakeSynth(voices), UtteranceCtor: FakeUtterance });
    expect(adapter.findVoiceForLanguage('hi')).toBe(voices[1]);
  });

  it('returns null when no voice matches', () => {
    const adapter = new SpeechSynthesisAdapter({ synth: fakeSynth([{ lang: 'en-US' }]), UtteranceCtor: FakeUtterance });
    expect(adapter.findVoiceForLanguage('ta-IN')).toBeNull();
  });

  it('cancels any in-progress speech before speaking the next utterance', () => {
    const synth = fakeSynth([]);
    const adapter = new SpeechSynthesisAdapter({ synth, UtteranceCtor: FakeUtterance });
    adapter.speak('hello');
    expect(synth.cancel).toHaveBeenCalled();
    expect(synth.speak).toHaveBeenCalled();
  });
});

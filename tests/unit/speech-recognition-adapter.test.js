import { describe, it, expect, vi } from 'vitest';
import { SpeechRecognitionAdapter } from '../../js-modules/voice/speech-recognition-adapter.js';

function FakeRecognition() {
  this.start = vi.fn();
  this.stop = vi.fn(() => {
    if (this.onend) this.onend();
  });
}

describe('SpeechRecognitionAdapter', () => {
  it('reports an error and does not throw when no recognition constructor is available', () => {
    const onError = vi.fn();
    const adapter = new SpeechRecognitionAdapter({ RecognitionCtor: null });
    adapter.onError(onError);
    const started = adapter.start();
    expect(started).toBe(false);
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ error: 'unsupported' }));
  });

  it('starts recognition and forwards final results', () => {
    const onResult = vi.fn();
    const adapter = new SpeechRecognitionAdapter({ RecognitionCtor: FakeRecognition, lang: 'hi-IN' });
    adapter.onResult(onResult);
    adapter.start();

    expect(adapter.recognition.lang).toBe('hi-IN');
    // simulate a single final result entry, matching the SpeechRecognitionEvent shape
    const fakeResultList = Object.assign([{ transcript: 'namaste' }], { isFinal: true });
    adapter.recognition.onresult({ results: [fakeResultList] });
    expect(onResult).toHaveBeenCalledWith({ transcript: 'namaste', isFinal: true });
  });

  it('updates language on an active recognition instance', () => {
    const adapter = new SpeechRecognitionAdapter({ RecognitionCtor: FakeRecognition });
    adapter.start();
    adapter.setLanguage('ta-IN');
    expect(adapter.recognition.lang).toBe('ta-IN');
  });

  it('stop() marks listening false and fires onEnd', () => {
    const onEnd = vi.fn();
    const adapter = new SpeechRecognitionAdapter({ RecognitionCtor: FakeRecognition });
    adapter.onEnd(onEnd);
    adapter.start();
    adapter.stop();
    expect(adapter.listening).toBe(false);
    expect(onEnd).toHaveBeenCalled();
  });
});

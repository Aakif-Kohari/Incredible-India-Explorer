import { describe, it, expect, beforeEach } from 'vitest';
import { VoiceConversationHistory, MAX_TURNS } from '../../frontend/js-modules/voice/voice-conversation-history.js';

function fakeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, v),
  };
}

describe('VoiceConversationHistory', () => {
  let storage;
  let history;

  beforeEach(() => {
    storage = fakeStorage();
    history = new VoiceConversationHistory({ storage });
  });

  it('starts empty', () => {
    expect(history.getTurns()).toEqual([]);
  });

  it('appends a turn with defaults', () => {
    history.append({ speaker: 'user', text: 'hello' });
    const turns = history.getTurns();
    expect(turns).toHaveLength(1);
    expect(turns[0].viaVoice).toBe(false);
    expect(typeof turns[0].timestamp).toBe('number');
  });

  it('persists across instances sharing storage', () => {
    history.append({ speaker: 'assistant', text: 'hi there' });
    const second = new VoiceConversationHistory({ storage });
    expect(second.getTurns()).toHaveLength(1);
  });

  it('bounds the log to MAX_TURNS', () => {
    for (let i = 0; i < MAX_TURNS + 5; i++) history.append({ speaker: 'user', text: `turn ${i}` });
    const turns = history.getTurns();
    expect(turns).toHaveLength(MAX_TURNS);
    expect(turns[0].text).toBe('turn 5');
  });

  it('clear empties the log', () => {
    history.append({ speaker: 'user', text: 'hello' });
    history.clear();
    expect(history.getTurns()).toEqual([]);
  });
});

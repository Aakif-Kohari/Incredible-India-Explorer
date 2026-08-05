import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VoiceAssistantController } from '../../frontend/js-modules/voice/voice-assistant-controller.js';
import { ConversationContext } from '../../frontend/js-modules/voice/conversation-context.js';
import { VoiceConversationHistory } from '../../frontend/js-modules/voice/voice-conversation-history.js';

function fakeStorage() {
  const map = new Map();
  return { getItem: (k) => (map.has(k) ? map.get(k) : null), setItem: (k, v) => map.set(k, v) };
}

const knownEntities = [{ name: 'Kerala', type: 'destination' }, { name: 'Goa', type: 'destination' }];

function makeController(overrides = {}) {
  return new VoiceAssistantController({
    answerQuestion: (text) => `Answer about: ${text}`,
    navigate: vi.fn(),
    bookmark: vi.fn(),
    search: vi.fn(),
    switchLanguage: vi.fn(),
    knownEntities,
    context: new ConversationContext(),
    history: new VoiceConversationHistory({ storage: fakeStorage() }),
    ...overrides,
  });
}

describe('VoiceAssistantController — Q&A fallback', () => {
  it('routes an open-ended question to the existing Q&A engine and extracts the entity', () => {
    const controller = makeController();
    const result = controller.handleTranscript('Tell me about Kerala');
    expect(result.intent).toBe('QA_FALLBACK');
    expect(result.responseText).toContain('Kerala');
    expect(controller.context.getLastEntity()).toEqual({ name: 'Kerala', type: 'destination' });
  });
});

describe('VoiceAssistantController — navigation', () => {
  it('calls navigate() with the resolved path', () => {
    const navigate = vi.fn();
    const controller = makeController({ navigate });
    const result = controller.handleTranscript('take me to the wildlife page');
    expect(navigate).toHaveBeenCalledWith('/frontend/wildlife/wildlife.html');
    expect(result.navigatedTo).toBe('/frontend/wildlife/wildlife.html');
  });
});

describe('VoiceAssistantController — multi-turn context', () => {
  it('resolves "there" to the previously discussed destination for an itinerary request', () => {
    const controller = makeController();
    controller.handleTranscript('Tell me about Kerala');
    const result = controller.handleTranscript('plan a trip there for 4 days');

    expect(result.intent).toBe('ITINERARY');
    expect(result.responseText.toLowerCase()).toContain('kerala');
  });

  it('resolves "it" to the last entity for a bookmark request', () => {
    const bookmark = vi.fn();
    const controller = makeController({ bookmark });
    controller.handleTranscript('Tell me about Goa');
    controller.handleTranscript('bookmark it');
    expect(bookmark).toHaveBeenCalledWith('Goa');
  });

  it('gives an honest response when bookmarking with no known context', () => {
    const controller = makeController();
    const result = controller.handleTranscript('bookmark this');
    expect(result.responseText).toMatch(/not sure which place/i);
  });
});

describe('VoiceAssistantController — search and language switch', () => {
  it('dispatches search with the extracted query', () => {
    const search = vi.fn();
    const controller = makeController({ search });
    controller.handleTranscript('search for houseboats');
    expect(search).toHaveBeenCalledWith('houseboats');
  });

  it('dispatches a language switch', () => {
    const switchLanguage = vi.fn();
    const controller = makeController({ switchLanguage });
    const result = controller.handleTranscript('switch to Hindi');
    expect(switchLanguage).toHaveBeenCalledWith('hi');
    expect(result.responseText).toMatch(/hindi/i);
  });
});

describe('VoiceAssistantController — history and reset', () => {
  it('records both the user and assistant turns', () => {
    const controller = makeController();
    controller.handleTranscript('Tell me about Kerala');
    const turns = controller.history.getTurns();
    expect(turns).toHaveLength(2);
    expect(turns[0].speaker).toBe('user');
    expect(turns[1].speaker).toBe('assistant');
  });

  it('resetConversation clears both context and history', () => {
    const controller = makeController();
    controller.handleTranscript('Tell me about Kerala');
    controller.resetConversation();
    expect(controller.context.getLastEntity()).toBeNull();
    expect(controller.history.getTurns()).toEqual([]);
  });
});

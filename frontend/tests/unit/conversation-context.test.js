import { describe, it, expect } from 'vitest';
import { ConversationContext } from '../../frontend/js-modules/voice/conversation-context.js';

describe('ConversationContext', () => {
  it('leaves text unchanged when there is no known entity yet', () => {
    const ctx = new ConversationContext();
    expect(ctx.resolveReferences('plan a trip there')).toBe('plan a trip there');
  });

  it('substitutes "there" with the last-mentioned entity', () => {
    const ctx = new ConversationContext();
    ctx.remember({ speaker: 'user', text: 'tell me about Kerala', entity: { name: 'Kerala', type: 'destination' } });
    expect(ctx.resolveReferences('plan a trip there for 3 days')).toBe('plan a trip Kerala for 3 days');
  });

  it('substitutes "it" and "that place" as well', () => {
    const ctx = new ConversationContext();
    ctx.remember({ speaker: 'user', text: 'x', entity: { name: 'Goa' } });
    expect(ctx.resolveReferences('bookmark it')).toBe('bookmark Goa');
    expect(ctx.resolveReferences('save that place')).toBe('save Goa');
  });

  it('keeps a bounded turn history', () => {
    const ctx = new ConversationContext({ maxTurns: 3 });
    for (let i = 0; i < 5; i++) ctx.remember({ speaker: 'user', text: `turn ${i}` });
    const history = ctx.getHistory();
    expect(history).toHaveLength(3);
    expect(history[0].text).toBe('turn 2');
  });

  it('reset clears entity and history', () => {
    const ctx = new ConversationContext();
    ctx.remember({ speaker: 'user', text: 'x', entity: { name: 'Goa' } });
    ctx.reset();
    expect(ctx.getLastEntity()).toBeNull();
    expect(ctx.getHistory()).toEqual([]);
  });
});

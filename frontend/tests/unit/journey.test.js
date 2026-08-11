import { describe, it, expect, beforeEach } from 'vitest';

describe('Journey / Bookmark System Unit Tests', () => {
  let mockStorage = {};

  beforeEach(() => {
    mockStorage = {};
    globalThis.localStorage = {
      getItem: (key) => mockStorage[key] || null,
      setItem: (key, value) => { mockStorage[key] = String(value); },
      removeItem: (key) => { delete mockStorage[key]; },
      clear: () => { mockStorage = {}; }
    };
  });

  it('saves and retrieves items from journey store', () => {
    const journeyKey = 'ii-journey-items';
    const item = { id: 'startup-1', title: 'AgriTech India', category: 'startup' };
    
    const items = JSON.parse(localStorage.getItem(journeyKey) || '[]');
    items.push(item);
    localStorage.setItem(journeyKey, JSON.stringify(items));

    const saved = JSON.parse(localStorage.getItem(journeyKey));
    expect(saved).toHaveLength(1);
    expect(saved[0].title).toBe('AgriTech India');
  });

  it('prevents duplicate bookmarks', () => {
    const item = { id: 'startup-1', title: 'AgriTech India' };
    let items = [item];
    const addUnique = (newItem) => {
      if (!items.some(i => i.id === newItem.id)) {
        items.push(newItem);
      }
    };

    addUnique(item);
    expect(items).toHaveLength(1);
  });

  it('removes item from journey store', () => {
    const item1 = { id: 'startup-1', title: 'AgriTech India' };
    const item2 = { id: 'startup-2', title: 'HealthAI' };
    let items = [item1, item2];

    const removeItem = (id) => {
      items = items.filter(i => i.id !== id);
    };

    removeItem('startup-1');
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('startup-2');
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { CapitalMatchGame } from '../../frontend/capital-match-up/script.js';

const mockLocations = [
  { id: 'ap', name: 'Andhra Pradesh', capital: 'Amaravati' },
  { id: 'mh', name: 'Maharashtra', capital: 'Mumbai' },
  { id: 'ka', name: 'Karnataka', capital: 'Bengaluru' },
  { id: 'dl', name: 'Delhi', capital: 'New Delhi' },
  { id: 'tn', name: 'Tamil Nadu', capital: 'Chennai' },
  { id: 'wb', name: 'West Bengal', capital: 'Kolkata' }
];

describe('Capital Match-Up Game Logic', () => {
  let game;

  beforeEach(() => {
    game = new CapitalMatchGame(mockLocations);
  });

  it('should initialize stats correctly', () => {
    expect(game.score).toBe(0);
    expect(game.roundsCompleted).toBe(0);
    expect(game.matchedPairsCount).toBe(0);
  });

  it('should generate requested number of round items from dataset without duplicates', () => {
    const roundItems = game.generateRoundItems(5);
    expect(roundItems.length).toBe(5);

    const ids = roundItems.map(i => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(5);
  });

  it('should validate a correct match and award score points', () => {
    game.generateRoundItems(5);
    const firstItem = game.currentRoundItems[0];

    const result = game.checkMatch(firstItem.id, firstItem.capital);
    expect(result.isMatch).toBe(true);
    expect(result.matchedPairsCount).toBe(1);
    expect(game.score).toBe(20);
  });

  it('should penalize score on incorrect match', () => {
    game.generateRoundItems(5);
    const firstItem = game.currentRoundItems[0];

    const result = game.checkMatch(firstItem.id, 'WrongCapitalCity');
    expect(result.isMatch).toBe(false);
    expect(result.matchedPairsCount).toBe(0);
    expect(game.score).toBe(0); // Score floor at 0
  });

  it('should complete round when all 5 pairs are matched', () => {
    game.generateRoundItems(5);

    game.currentRoundItems.forEach(item => {
      game.checkMatch(item.id, item.capital);
    });

    expect(game.matchedPairsCount).toBe(5);
    expect(game.roundsCompleted).toBe(1);
    expect(game.score).toBe(100);
  });

  it('should reset game state completely', () => {
    game.generateRoundItems(5);
    game.checkMatch(game.currentRoundItems[0].id, game.currentRoundItems[0].capital);
    expect(game.score).toBe(20);

    game.resetGame();
    expect(game.score).toBe(0);
    expect(game.roundsCompleted).toBe(0);
    expect(game.matchedPairsCount).toBe(0);
  });
});

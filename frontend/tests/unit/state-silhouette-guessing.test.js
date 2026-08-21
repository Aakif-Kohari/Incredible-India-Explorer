import { describe, it, expect, beforeEach } from 'vitest';
import { SilhouetteGame } from '../../frontend/state-silhouette-guessing/script.js';

const mockLocations = [
  { id: 'mh', name: 'Maharashtra', capital: 'Mumbai', path: 'M 10 10 L 20 20 Z' },
  { id: 'dl', name: 'Delhi', capital: 'New Delhi', path: 'M 30 30 L 40 40 Z' },
  { id: 'tn', name: 'Tamil Nadu', capital: 'Chennai', path: 'M 50 50 L 60 60 Z' },
  { id: 'rj', name: 'Rajasthan', capital: 'Jaipur', path: 'M 70 70 L 80 80 Z' },
  { id: 'ka', name: 'Karnataka', capital: 'Bengaluru', path: 'M 90 90 L 100 100 Z' }
];

describe('State Silhouette Guessing Game Logic', () => {
  let game;

  beforeEach(() => {
    localStorage.clear();
    game = new SilhouetteGame(mockLocations);
  });

  it('should initialize game stats properly', () => {
    expect(game.score).toBe(0);
    expect(game.streak).toBe(0);
    expect(game.bestStreak).toBe(0);
    expect(game.played).toBe(0);
  });

  it('should select a random target state and 4 options', () => {
    const round = game.startNewRound();
    expect(round.target).toBeDefined();
    expect(mockLocations).toContainEqual(round.target);
    expect(round.options.length).toBe(4);
    expect(round.options).toContainEqual(round.target);
  });

  it('should accurately validate correct user guess and update streak/score', () => {
    game.startNewRound();
    const targetName = game.currentTarget.name;

    const result = game.checkAnswer(targetName);
    expect(result.isCorrect).toBe(true);
    expect(game.score).toBe(10);
    expect(game.streak).toBe(1);
    expect(game.bestStreak).toBe(1);
  });

  it('should reset streak on incorrect answer', () => {
    game.startNewRound();
    game.checkAnswer(game.currentTarget.name); // streak = 1

    game.startNewRound();
    const wrongAnswer = 'NonExistentState';
    const result = game.checkAnswer(wrongAnswer);

    expect(result.isCorrect).toBe(false);
    expect(game.streak).toBe(0);
    expect(game.bestStreak).toBe(1); // best streak remains 1
  });

  it('should award fewer points when hint is used', () => {
    game.startNewRound();
    const hint = game.getHint();
    expect(hint).toContain('Capital City:');

    const result = game.checkAnswer(game.currentTarget.name);
    expect(result.isCorrect).toBe(true);
    expect(game.score).toBe(5); // 5 points instead of 10
  });

  it('should reset stats correctly', () => {
    game.startNewRound();
    game.checkAnswer(game.currentTarget.name);
    expect(game.score).toBe(10);

    game.resetStats();
    expect(game.score).toBe(0);
    expect(game.streak).toBe(0);
    expect(game.bestStreak).toBe(0);
  });
});

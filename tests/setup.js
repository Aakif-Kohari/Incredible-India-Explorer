/**
 * tests/setup.js
 * Vitest setup file — loads data.js globals (mapData, quizQuestions)
 * into global scope so tests can access them without modifying the source.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load data.js and extract its global declarations
const dataCode = readFileSync(resolve(__dirname, '../data.js'), 'utf-8');

// Execute data.js in a scope that returns its global constants
const getGlobals = new Function(
  dataCode + '\nreturn { mapData, quizQuestions };',
);
const globals = getGlobals();

// Make globals available in test environment
globalThis.mapData = globals.mapData;
globalThis.quizQuestions = globals.quizQuestions;

// Ensure reliable localStorage implementation for Node 22+ test environments
class MemoryStorage {
  constructor() {
    this._store = new Map();
  }
  getItem(key) {
    return this._store.has(String(key)) ? this._store.get(String(key)) : null;
  }
  setItem(key, value) {
    const k = String(key);
    const v = String(value);
    this._store.set(k, v);
    this[k] = v;
  }
  removeItem(key) {
    const k = String(key);
    this._store.delete(k);
    delete this[k];
  }
  clear() {
    this._store.forEach((_, key) => {
      delete this[key];
    });
    this._store.clear();
  }
  key(index) {
    return Array.from(this._store.keys())[index] || null;
  }
  get length() {
    return this._store.size;
  }
}

if (typeof Storage === 'undefined' || !globalThis.localStorage || typeof globalThis.localStorage.clear !== 'function') {
  globalThis.Storage = MemoryStorage;
  const memoryStorage = new MemoryStorage();
  Object.defineProperty(globalThis, 'localStorage', {
    value: memoryStorage,
    writable: true,
    configurable: true,
  });
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'localStorage', {
      value: memoryStorage,
      writable: true,
      configurable: true,
    });
  }
} else if (typeof Storage !== 'undefined' && globalThis.localStorage && !(globalThis.localStorage instanceof Storage)) {
  // Fix prototype chain so Storage.prototype spies intercept localStorage methods
  Object.setPrototypeOf(globalThis.localStorage, Storage.prototype);
  if (typeof window !== 'undefined' && window.localStorage) {
    Object.setPrototypeOf(window.localStorage, Storage.prototype);
  }
}


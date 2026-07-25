/**
 * Temple Architect Challenge Game Engine
 */

(function () {
  'use strict';

  const STYLES = [
    {
      id: 'nagara',
      styleName: 'Nagara Architecture (Northern Style)',
      temple: 'Sun Temple, Konark',
      region: 'Odisha / Northern & Eastern India',
      clue: 'Beehive-shaped curving spire (Shikhara), Kalasha & Amalaka crowning disk.',
      parts: {
        top: 'Amalaka & Kalasha Crown Disk',
        middle: 'Curving Shikhara Spire',
        base: 'Jagamohana Assembly Hall & Platform'
      }
    },
    {
      id: 'dravidian',
      styleName: 'Dravidian Architecture (Southern Style)',
      temple: 'Brihadisvara Temple, Thanjavur',
      region: 'Tamil Nadu / Southern India',
      clue: 'Pyramidal stepped tower (Vimana), crowned with a single stone Shikhara and massive Gopuram gateways.',
      parts: {
        top: 'Octagonal Single-Stone Shikhara',
        middle: 'Stepped Pyramidal Vimana Tower',
        base: 'Ornate Multi-Tiered Gopuram Gateway'
      }
    },
    {
      id: 'vesara',
      styleName: 'Vesara Architecture (Hybrid Style)',
      temple: 'Chennakeshava Temple, Belur',
      region: 'Karnataka / Central Deccan',
      clue: 'Combines Nagara and Dravidian elements featuring star-shaped (stellate) ground plans and carved lathe-turned pillars.',
      parts: {
        top: 'Stellate Kalasa Finial',
        middle: 'Hybrid Tiered Vimana Shrine',
        base: 'Star-Shaped Jagati Platform & Pillars'
      }
    }
  ];

  const PARTS_PALETTE = [
    { id: 'p1', name: 'Amalaka & Kalasha Crown Disk', type: 'top', style: 'nagara' },
    { id: 'p2', name: 'Curving Shikhara Spire', type: 'middle', style: 'nagara' },
    { id: 'p3', name: 'Jagamohana Assembly Hall & Platform', type: 'base', style: 'nagara' },
    { id: 'p4', name: 'Octagonal Single-Stone Shikhara', type: 'top', style: 'dravidian' },
    { id: 'p5', name: 'Stepped Pyramidal Vimana Tower', type: 'middle', style: 'dravidian' },
    { id: 'p6', name: 'Ornate Multi-Tiered Gopuram Gateway', type: 'base', style: 'dravidian' },
    { id: 'p7', name: 'Stellate Kalasa Finial', type: 'top', style: 'vesara' },
    { id: 'p8', name: 'Hybrid Tiered Vimana Shrine', type: 'middle', style: 'vesara' },
    { id: 'p9', name: 'Star-Shaped Jagati Platform & Pillars', type: 'base', style: 'vesara' }
  ];

  const state = {
    currentLevel: 0,
    score: 0,
    assembly: { top: null, middle: null, base: null }
  };

  function init() {
    if (!document.getElementById('temple-name')) return;
    loadChallenge(state.currentLevel);
    bindEvents();
  }

  function bindEvents() {
    document.getElementById('btn-check-solution').addEventListener('click', verifyArchitecture);
    document.getElementById('btn-reset-assembly').addEventListener('click', resetAssembly);
  }

  function loadChallenge(levelIndex) {
    const current = STYLES[levelIndex];
    document.getElementById('temple-name').textContent = current.temple;
    document.getElementById('clue-region').textContent = current.region;
    document.getElementById('clue-style').textContent = current.styleName;
    document.getElementById('clue-desc').textContent = current.clue;
    document.getElementById('style-val').textContent = current.styleName;
    document.getElementById('level-val').textContent = `Level ${levelIndex + 1} / ${STYLES.length}`;

    resetAssembly();
    renderPalette();
  }

  function renderPalette() {
    const grid = document.getElementById('parts-grid');
    grid.innerHTML = '';

    // Shuffle palette for puzzle mode
    const shuffled = [...PARTS_PALETTE].sort(() => 0.5 - Math.random());

    shuffled.forEach(part => {
      const card = document.createElement('div');
      card.className = 'part-card';
      card.innerHTML = `
        <span class="slot-label">[${part.type.toUpperCase()}]</span>
        <p><strong>${part.name}</strong></p>
      `;
      card.addEventListener('click', () => selectPart(part));
      grid.appendChild(card);
    });
  }

  function selectPart(part) {
    state.assembly[part.type] = part;

    const slotEl = document.getElementById(`slot-${part.type}`);
    const contentEl = document.getElementById(`content-${part.type}`);

    slotEl.classList.add('filled');
    contentEl.textContent = part.name;
  }

  function verifyArchitecture() {
    const current = STYLES[state.currentLevel];
    const { top, middle, base } = state.assembly;

    if (!top || !middle || !base) {
      alert('Please select all 3 architectural components (Crown, Spire/Tower, and Base/Gateway) before verifying!');
      return;
    }

    if (top.name === current.parts.top && middle.name === current.parts.middle && base.name === current.parts.base) {
      state.score += 250;
      document.getElementById('score-val').textContent = `${state.score} pts`;

      if (state.currentLevel + 1 < STYLES.length) {
        alert(`🏛️ Masterpiece Recreated!\nYour architectural assembly for ${current.temple} (${current.styleName}) is 100% accurate!\nAdvancing to next level...`);
        state.currentLevel++;
        loadChallenge(state.currentLevel);
      } else {
        alert(`🏆 CONGRATULATIONS!\nYou have completed all levels and unlocked the title of Master Temple Architect of India! Final Score: ${state.score} pts.`);
      }
    } else {
      alert('❌ Architectural Mismatch!\nSome components do not belong to this temple style. Read the architectural clues carefully and try again.');
    }
  }

  function resetAssembly() {
    state.assembly = { top: null, middle: null, base: null };
    ['top', 'middle', 'base'].forEach(type => {
      const slotEl = document.getElementById(`slot-${type}`);
      const contentEl = document.getElementById(`content-${type}`);
      if (slotEl && contentEl) {
        slotEl.classList.remove('filled');
        contentEl.textContent = 'Empty';
      }
    });
  }

  if (typeof window !== 'undefined') {
    window.TempleArchitect = { state, STYLES, PARTS_PALETTE, verifyArchitecture, resetAssembly };
    document.addEventListener('DOMContentLoaded', init);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STYLES, PARTS_PALETTE };
  }
})();

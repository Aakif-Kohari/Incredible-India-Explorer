/**
 * Metro Master Strategy Game - Core Engine
 */

(function () {
  'use strict';

  // Game state
  const state = {
    budget: 1000,
    score: 0,
    difficulty: 1,
    unlockedCityCount: 2,
    selectedNode: null,
    lines: [],
    selectedLineColor: '#e11d48'
  };

  // Indian Cities Dataset with fixed positions on container grid (%)
  const CITIES = [
    { id: 'delhi', name: 'Delhi NCR', x: 42, y: 25, status: 'unlocked', icon: '🏛️', pop: '30M' },
    { id: 'mumbai', name: 'Mumbai', x: 22, y: 62, status: 'unlocked', icon: '🌊', pop: '21M' },
    { id: 'bengaluru', name: 'Bengaluru', x: 40, y: 78, status: 'locked', icon: '💻', pop: '13M' },
    { id: 'kolkata', name: 'Kolkata', x: 78, y: 48, status: 'locked', icon: '🌉', pop: '15M' },
    { id: 'chennai', name: 'Chennai', x: 52, y: 82, status: 'locked', icon: '🏖️', pop: '11M' },
    { id: 'hyderabad', name: 'Hyderabad', x: 44, y: 64, status: 'locked', icon: '🏰', pop: '10M' },
    { id: 'kochi', name: 'Kochi', x: 35, y: 90, status: 'locked', icon: '🌴', pop: '3M' },
    { id: 'ahmedabad', name: 'Ahmedabad', x: 24, y: 44, status: 'locked', icon: '🧵', pop: '8M' }
  ];

  // DOM Elements
  let nodesContainer, svgCanvas, budgetEl, scoreEl, citiesCountEl, linesCountEl, lineColorSelect, selectionInfoEl;

  function init() {
    nodesContainer = document.getElementById('city-nodes-container');
    svgCanvas = document.getElementById('network-svg');
    budgetEl = document.getElementById('budget-display');
    scoreEl = document.getElementById('score-display');
    citiesCountEl = document.getElementById('cities-count');
    linesCountEl = document.getElementById('lines-count');
    lineColorSelect = document.getElementById('line-color');
    selectionInfoEl = document.getElementById('selection-info');

    if (!nodesContainer) return;

    renderNodes();
    bindEvents();
    updateUI();
  }

  function bindEvents() {
    lineColorSelect.addEventListener('change', function (e) {
      state.selectedLineColor = e.target.value;
    });

    document.getElementById('btn-simulate').addEventListener('click', runSimulation);
    document.getElementById('btn-clear').addEventListener('click', clearRoutes);
    document.getElementById('btn-unlock-city').addEventListener('click', unlockNextCity);
  }

  function renderNodes() {
    nodesContainer.innerHTML = '';
    CITIES.forEach(city => {
      const node = document.createElement('div');
      node.className = `city-node ${city.status}`;
      node.style.left = `${city.x}%`;
      node.style.top = `${city.y}%`;
      node.setAttribute('data-id', city.id);
      node.setAttribute('tabindex', '0');
      node.setAttribute('aria-label', `${city.name} station (${city.status})`);

      node.innerHTML = `
        <span>${city.icon}</span>
        <div class="node-label">${city.name}</div>
      `;

      node.addEventListener('click', () => handleNodeClick(city));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNodeClick(city);
        }
      });

      nodesContainer.appendChild(node);
    });
  }

  function handleNodeClick(city) {
    if (city.status === 'locked') {
      selectionInfoEl.innerHTML = `<p class="placeholder-text">🔒 <strong>${city.name}</strong> is currently locked. Click "Unlock Next City" to expand network reach.</p>`;
      return;
    }

    if (!state.selectedNode) {
      state.selectedNode = city;
      highlightSelectedNode(city.id);
      selectionInfoEl.innerHTML = `<p>Selected origin: <strong>${city.name}</strong> (${city.pop} pop). Click another unlocked city to construct a line.</p>`;
    } else if (state.selectedNode.id === city.id) {
      // Deselect
      state.selectedNode = null;
      renderNodes();
      selectionInfoEl.innerHTML = `<p class="placeholder-text">Selection cleared.</p>`;
    } else {
      // Connect line
      const origin = state.selectedNode;
      const target = city;
      const cost = calculateCost(origin, target);

      if (state.budget < cost) {
        alert(`Insufficient budget! Constructing line from ${origin.name} to ${target.name} requires ₹${cost} Cr.`);
        return;
      }

      state.budget -= cost;
      state.lines.push({
        id: `${origin.id}-${target.id}`,
        from: origin,
        to: target,
        color: state.selectedLineColor,
        cost: cost
      });

      state.selectedNode = null;
      renderNodes();
      renderSVG();
      updateUI();
      selectionInfoEl.innerHTML = `<p class="placeholder-text">✅ Constructed metro line connecting <strong>${origin.name}</strong> and <strong>${target.name}</strong> for ₹${cost} Cr!</p>`;
    }
  }

  function calculateCost(c1, c2) {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.round(dist * 6);
  }

  function highlightSelectedNode(id) {
    const nodes = nodesContainer.querySelectorAll('.city-node');
    nodes.forEach(node => {
      if (node.getAttribute('data-id') === id) {
        node.classList.add('selected');
      }
    });
  }

  function renderSVG() {
    svgCanvas.innerHTML = '';
    state.lines.forEach(line => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      path.setAttribute('x1', `${line.from.x}%`);
      path.setAttribute('y1', `${line.from.y}%`);
      path.setAttribute('x2', `${line.to.x}%`);
      path.setAttribute('y2', `${line.to.y}%`);
      path.setAttribute('stroke', line.color);
      path.setAttribute('stroke-width', '5');
      path.setAttribute('stroke-linecap', 'round');
      svgCanvas.appendChild(path);
    });
  }

  function unlockNextCity() {
    const cost = 300;
    const lockedCity = CITIES.find(c => c.status === 'locked');
    if (!lockedCity) {
      alert('All major Indian cities are already unlocked!');
      return;
    }

    if (state.budget < cost) {
      alert(`Insufficient funds! Unlocking a new city costs ₹${cost} Cr.`);
      return;
    }

    state.budget -= cost;
    lockedCity.status = 'unlocked';
    state.unlockedCityCount++;
    renderNodes();
    updateUI();
    selectionInfoEl.innerHTML = `<p class="placeholder-text">🎉 Unlocked city: <strong>${lockedCity.name}</strong>!</p>`;
  }

  function runSimulation() {
    if (state.lines.length === 0) {
      alert('Build at least one metro line before running the transit simulation!');
      return;
    }

    const totalLines = state.lines.length;
    const efficiency = Math.min(100, Math.round((totalLines / state.unlockedCityCount) * 85));
    const addedScore = efficiency * 10 + totalLines * 50;

    state.score += addedScore;
    state.budget += Math.round(efficiency * 3); // Farebox revenue return
    updateUI();

    // Check objectives
    if (state.lines.length >= 1) {
      document.getElementById('obj-connect').classList.add('completed');
    }
    if (efficiency >= 70) {
      document.getElementById('obj-efficiency').classList.add('completed');
    }
    if (state.budget >= 0) {
      document.getElementById('obj-budget').classList.add('completed');
    }

    alert(`🚆 Simulation Complete!\n• Passengers Served: ${totalLines * 1.5} Million\n• Efficiency Rating: ${efficiency}%\n• Revenue Earned: ₹${Math.round(efficiency * 3)} Cr`);
  }

  function clearRoutes() {
    state.lines = [];
    state.selectedNode = null;
    renderNodes();
    renderSVG();
    updateUI();
    selectionInfoEl.innerHTML = `<p class="placeholder-text">Routes cleared. Click two cities to redesign your network.</p>`;
  }

  function updateUI() {
    budgetEl.textContent = `₹${state.budget} Cr`;
    scoreEl.textContent = `${state.score} pts`;
    citiesCountEl.textContent = `${state.unlockedCityCount} / ${CITIES.length}`;
    linesCountEl.textContent = state.lines.length;
  }

  // Export module logic for unit testing
  if (typeof window !== 'undefined') {
    window.MetroMaster = {
      state,
      CITIES,
      calculateCost,
      unlockNextCity,
      runSimulation,
      clearRoutes
    };

    document.addEventListener('DOMContentLoaded', init);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CITIES, calculateCost };
  }
})();

import { pilgrimageCircuits } from './data.js';

(() => {
  const circuitList = document.getElementById('circuit-list');
  const routesLayer = document.getElementById('routes-layer');
  const markersLayer = document.getElementById('markers-layer');
  const btnReplay = document.getElementById('btn-replay');
  
  // Info Panel elements
  const locationDetails = document.getElementById('location-details');
  const journeyTimeline = document.getElementById('journey-timeline');
  const journeyList = document.getElementById('journey-list');
  const introText = document.querySelector('.panel-intro');

  let currentCircuit = null;

  function init() {
    renderCircuitNav();
    // Select first circuit by default
    if (pilgrimageCircuits.length > 0) {
      selectCircuit(pilgrimageCircuits[0].id);
    }

    btnReplay.addEventListener('click', () => {
      if (currentCircuit) {
        animateRoute(currentCircuit);
      }
    });
  }

  function renderCircuitNav() {
    circuitList.innerHTML = '';
    pilgrimageCircuits.forEach(circuit => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'circuit-btn';
      btn.id = `btn-${circuit.id}`;
      btn.textContent = circuit.name;
      btn.setAttribute('aria-pressed', 'false');
      
      btn.addEventListener('click', () => {
        selectCircuit(circuit.id);
      });
      
      li.appendChild(btn);
      circuitList.appendChild(li);
    });
  }

  function selectCircuit(id) {
    // Update active button
    document.querySelectorAll('.circuit-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    
    const activeBtn = document.getElementById(`btn-${id}`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.setAttribute('aria-pressed', 'true');
    }

    // Find circuit data
    currentCircuit = pilgrimageCircuits.find(c => c.id === id);
    if (!currentCircuit) return;

    // Reset UI
    introText.classList.add('hidden');
    locationDetails.classList.add('hidden');
    
    renderMapData(currentCircuit);
    renderJourneyTimeline(currentCircuit);
    animateRoute(currentCircuit);
  }

  function renderMapData(circuit) {
    routesLayer.innerHTML = '';
    markersLayer.innerHTML = '';

    // Create Path
    if (circuit.locations.length > 1) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      let d = `M ${circuit.locations[0].x} ${circuit.locations[0].y} `;
      for (let i = 1; i < circuit.locations.length; i++) {
        d += `L ${circuit.locations[i].x} ${circuit.locations[i].y} `;
      }
      
      path.setAttribute('d', d);
      path.setAttribute('stroke', circuit.color);
      path.className = 'route-path';
      path.id = 'active-route-path';
      
      routesLayer.appendChild(path);
    }

    // Create Markers
    circuit.locations.forEach((loc, index) => {
      // Group for marker and label
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute('cx', loc.x);
      circle.setAttribute('cy', loc.y);
      circle.setAttribute('r', '1.5');
      circle.setAttribute('fill', circuit.color);
      circle.className = 'location-marker';
      circle.setAttribute('tabindex', '0');
      circle.setAttribute('role', 'button');
      circle.setAttribute('aria-label', `${loc.name} pilgrimage location`);
      circle.dataset.id = loc.id;
      
      // Label
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute('x', loc.x);
      text.setAttribute('y', loc.y - 2.5);
      text.textContent = loc.name;
      text.className = 'marker-label';

      g.appendChild(circle);
      g.appendChild(text);
      
      // Interactions
      circle.addEventListener('click', () => showLocationDetails(loc, circuit));
      circle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showLocationDetails(loc, circuit);
        }
      });
      
      markersLayer.appendChild(g);
    });
  }

  function animateRoute(circuit) {
    const path = document.getElementById('active-route-path');
    if (!path) return;

    // Remove animation class to trigger reflow
    path.classList.remove('route-animate');
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
    } else {
      // Calculate length and setup animation
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      
      // Trigger reflow
      void path.offsetWidth;
      
      path.classList.add('route-animate');
    }
  }

  function renderJourneyTimeline(circuit) {
    journeyTimeline.classList.remove('hidden');
    journeyList.innerHTML = '';
    
    circuit.locations.forEach(loc => {
      const li = document.createElement('li');
      li.className = 'journey-item';
      li.textContent = loc.name;
      li.id = `journey-${loc.id}`;
      li.setAttribute('tabindex', '0');
      
      li.addEventListener('click', () => showLocationDetails(loc, circuit));
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showLocationDetails(loc, circuit);
        }
      });
      
      journeyList.appendChild(li);
    });
  }

  function showLocationDetails(loc, circuit) {
    locationDetails.classList.remove('hidden');
    
    document.getElementById('loc-name').textContent = loc.name;
    document.getElementById('loc-circuit').textContent = circuit.name;
    document.getElementById('loc-state').textContent = loc.state;
    document.getElementById('loc-tradition').textContent = loc.tradition;
    document.getElementById('loc-significance').textContent = loc.significance;
    document.getElementById('loc-info').textContent = loc.info;
    
    const img = document.getElementById('loc-image');
    // Using a placeholder fallback since actual assets might not exist
    img.src = `assets/${loc.id}.jpg`;
    img.alt = `Photo of ${loc.name}`;
    img.onerror = () => {
      img.src = `data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22200%22%20viewBox%3D%220%200%20400%20200%22%3E%3Crect%20fill%3D%22%23F4E8D1%22%20width%3D%22400%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%23264653%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%228%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E${loc.name}%20Unavailable%3C%2Ftext%3E%3C%2Fsvg%3E`;
    };

    // Highlight active journey item
    document.querySelectorAll('.journey-item').forEach(i => i.classList.remove('active'));
    const activeItem = document.getElementById(`journey-${loc.id}`);
    if (activeItem) {
      activeItem.classList.add('active');
    }

    // Highlight map marker
    document.querySelectorAll('.location-marker').forEach(m => {
      m.setAttribute('r', '1.5');
      m.setAttribute('fill', circuit.color);
    });
    
    const activeMarker = document.querySelector(`.location-marker[data-id="${loc.id}"]`);
    if (activeMarker) {
      activeMarker.setAttribute('r', '2.5');
      activeMarker.setAttribute('fill', '#264653'); // Highlight color
    }
  }

  // Run
  init();

})();

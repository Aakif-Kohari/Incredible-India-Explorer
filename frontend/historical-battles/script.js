import { battles } from './data.js';

(() => {
  const markersLayer = document.getElementById('markers-layer');
  const timelineContainer = document.getElementById('timeline');
  
  // Dialog Elements
  const dialogBackdrop = document.getElementById('battle-dialog-backdrop');
  const dialog = document.getElementById('battle-dialog');
  const closeBtn = document.getElementById('dialog-close');
  
  // Focus Trap state
  let lastFocusedElement = null;

  function init() {
    // Sort battles chronologically just in case
    const sortedBattles = [...battles].sort((a, b) => a.year - b.year);
    
    renderMarkers(sortedBattles);
    renderTimeline(sortedBattles);
    
    setupDialogEvents();
  }

  function renderMarkers(data) {
    markersLayer.innerHTML = '';
    data.forEach(battle => {
      const marker = document.createElement('button');
      marker.className = 'marker';
      marker.id = `marker-${battle.id}`;
      // Map x/y percentages to absolute positioning
      marker.style.left = `${battle.x}%`;
      marker.style.top = `${battle.y}%`;
      marker.setAttribute('aria-label', `${battle.name}, ${battle.year}`);
      
      marker.addEventListener('click', () => {
        openDialog(battle);
        highlightActive(battle.id);
      });
      
      markersLayer.appendChild(marker);
    });
  }

  function renderTimeline(data) {
    timelineContainer.innerHTML = '';
    data.forEach(battle => {
      const entry = document.createElement('div');
      entry.className = 'timeline-entry';
      entry.id = `timeline-${battle.id}`;
      entry.setAttribute('tabindex', '0');
      entry.setAttribute('role', 'button');
      entry.setAttribute('aria-label', `View details for ${battle.name}`);
      
      const year = document.createElement('div');
      year.className = 'timeline-year';
      year.textContent = battle.year;
      
      const name = document.createElement('div');
      name.className = 'timeline-name';
      name.textContent = battle.name;
      
      entry.appendChild(year);
      entry.appendChild(name);
      
      entry.addEventListener('click', () => {
        highlightActive(battle.id);
        openDialog(battle);
      });
      
      entry.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          highlightActive(battle.id);
          openDialog(battle);
        }
      });
      
      timelineContainer.appendChild(entry);
    });
  }

  function highlightActive(id) {
    document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.timeline-entry').forEach(t => t.classList.remove('active'));
    
    const marker = document.getElementById(`marker-${id}`);
    const timelineEntry = document.getElementById(`timeline-${id}`);
    
    if (marker) marker.classList.add('active');
    if (timelineEntry) {
      timelineEntry.classList.add('active');
      // Scroll timeline if needed
      timelineEntry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // --- Dialog and Focus Trap Logic ---
  
  function openDialog(battle) {
    lastFocusedElement = document.activeElement;
    
    // Populate Data
    document.getElementById('dialog-title').textContent = battle.name;
    document.getElementById('dialog-year').textContent = battle.year;
    document.getElementById('dialog-location').textContent = battle.state;
    document.getElementById('dialog-opponents').textContent = battle.opponents;
    document.getElementById('dialog-outcome').textContent = battle.outcome;
    document.getElementById('dialog-significance').textContent = battle.significance;
    
    document.getElementById('dialog-background').textContent = battle.background;
    document.getElementById('dialog-commanders').textContent = battle.commanders;
    document.getElementById('dialog-strategy').textContent = battle.strategy;
    document.getElementById('dialog-political').textContent = battle.politicalImpact;
    document.getElementById('dialog-longterm').textContent = battle.longTerm;
    
    const img = document.getElementById('dialog-image');
    img.src = battle.image;
    img.alt = `Illustration or map of ${battle.name}`;
    img.onerror = () => {
      // Fallback SVG
      img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22200%22%20viewBox%3D%220%200%20400%20200%22%3E%3Crect%20fill%3D%22%23E6D5B8%22%20width%3D%22400%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%232E3B4E%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%228%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EImage%20Unavailable%3C%2Ftext%3E%3C%2Fsvg%3E';
    };

    // Show Dialog
    dialogBackdrop.classList.remove('hidden');
    dialogBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Focus the close button
    closeBtn.focus();
  }

  function closeDialog() {
    dialogBackdrop.classList.add('hidden');
    dialogBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Restore focus
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function setupDialogEvents() {
    closeBtn.addEventListener('click', closeDialog);
    
    dialogBackdrop.addEventListener('click', (e) => {
      if (e.target === dialogBackdrop) {
        closeDialog();
      }
    });
    
    // Focus Trap
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDialog();
        return;
      }
      
      if (e.key === 'Tab') {
        // Find all focusable elements
        const focusableElements = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), summary');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // Run
  init();

})();

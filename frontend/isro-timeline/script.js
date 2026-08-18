import { isroMissions } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const timelineEventsContainer = document.getElementById('timeline-events');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('mission-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBody = document.getElementById('modal-body');

  // Utility to format status class
  const getStatusClass = (status) => {
    const s = status.toLowerCase();
    if (s.includes('completed')) return 'status-completed';
    if (s.includes('active')) return 'status-active';
    if (s.includes('planned')) return 'status-planned';
    return '';
  };

  // Render Timeline
  const renderTimeline = (filterCategory = 'all') => {
    timelineEventsContainer.innerHTML = '';
    
    // Filter logic
    const filteredMissions = isroMissions.filter(mission => {
      if (filterCategory === 'all') return true;
      return mission.category === filterCategory;
    });

    if (filteredMissions.length === 0) {
      timelineEventsContainer.innerHTML = '<p style="text-align: center; color: var(--space-muted);">No missions found for this category.</p>';
      return;
    }

    filteredMissions.forEach((mission, index) => {
      const eventEl = document.createElement('article');
      eventEl.className = 'timeline-event';
      
      // Delay animation slightly based on index
      eventEl.style.animationDelay = `${index * 0.1}s`;

      eventEl.innerHTML = `
        <div class="event-card" data-index="${isroMissions.indexOf(mission)}" tabindex="0" role="button" aria-label="View details for ${mission.name}">
          <span class="event-year">${mission.launchDate}</span>
          <h3>${mission.name}</h3>
          <div class="event-type">
            <i class="fas fa-rocket"></i> ${mission.launchVehicle} &nbsp;&bull;&nbsp; 
            <i class="fas fa-tag"></i> ${mission.category}
          </div>
          <p class="event-summary">${mission.objective}</p>
        </div>
      `;

      // Event listener for opening modal
      const card = eventEl.querySelector('.event-card');
      card.addEventListener('click', () => openModal(mission));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(mission);
        }
      });

      timelineEventsContainer.appendChild(eventEl);
    });
  };

  // Open Modal
  const openModal = (mission) => {
    modalBody.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${mission.name}</h2>
        <div class="modal-meta">
          <span><i class="fas fa-calendar"></i> ${mission.launchDate}</span>
          <span><i class="fas fa-rocket"></i> ${mission.launchVehicle}</span>
          <span><i class="fas fa-tag"></i> ${mission.category}</span>
        </div>
      </div>
      <div class="modal-grid">
        <div class="modal-info-block">
          <h4><i class="fas fa-bullseye" style="color: #facc15;"></i> Mission Objective</h4>
          <p>${mission.objective}</p>
        </div>
        <div class="modal-info-block">
          <h4><i class="fas fa-trophy" style="color: #4ade80;"></i> Major Achievement</h4>
          <p>${mission.achievement}</p>
        </div>
        <div class="modal-info-block">
          <h4><i class="fas fa-star" style="color: #38bdf8;"></i> Historical Significance</h4>
          <p>${mission.significance}</p>
        </div>
      </div>
      <span class="status-badge ${getStatusClass(mission.status)}">Status: ${mission.status}</span>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    closeModalBtn.focus();
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close Modal
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked
      e.target.classList.add('active');
      
      const category = e.target.getAttribute('data-filter');
      renderTimeline(category);
    });
  });

  // Initial Render
  renderTimeline('all');
});

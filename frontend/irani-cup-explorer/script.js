/**
 * Irani Cup Explorer Interactive Engine
 * Handles timeline rendering, search filtering, and category toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
  const iraniWinnersData = [
    {
      year: '2024–25',
      winner: 'Mumbai',
      runnerUp: 'Rest of India',
      type: 'Ranji',
      margin: 'Won on 1st innings lead (Mumbai 537 & 329/8d; ROI 416)',
      venue: 'BRSABV Ekana Stadium, Lucknow',
      starPlayer: 'Sarfaraz Khan (222*), Tanush Kotian (114), Mukesh Kumar (5 wkts)'
    },
    {
      year: '2023–24',
      winner: 'Rest of India',
      runnerUp: 'Saurashtra',
      type: 'ROI',
      margin: 'Rest of India won by 175 runs',
      venue: 'Saurashtra Cricket Association Stadium, Rajkot',
      starPlayer: 'Sai Sudharsan (72), Saurabh Kumar (4 wkts)'
    },
    {
      year: '2022–23',
      winner: 'Rest of India',
      runnerUp: 'Madhya Pradesh',
      type: 'ROI',
      margin: 'Rest of India won by 238 runs',
      venue: 'Captain Roop Singh Stadium, Gwalior',
      starPlayer: 'Yashasvi Jaiswal (213 & 144), Abhimanyu Easwaran (154)'
    },
    {
      year: '2019–20',
      winner: 'Vidarbha',
      runnerUp: 'Rest of India',
      type: 'Ranji',
      margin: 'Won on 1st innings lead (Vidarbha 425 & 269/5; ROI 398)',
      venue: 'VCA Stadium, Nagpur',
      starPlayer: 'Akshay Karnewar (102), Hanuma Vihari (114)'
    },
    {
      year: '2018–19',
      winner: 'Vidarbha',
      runnerUp: 'Rest of India',
      type: 'Ranji',
      margin: 'Won on 1st innings lead (Vidarbha 800/7d; ROI 390)',
      venue: 'VCA Stadium, Nagpur',
      starPlayer: 'Wasim Jaffer (286), Faiz Fazal (89), Rajneesh Gurbani (4 wkts)'
    },
    {
      year: '2015–16',
      winner: 'Rest of India',
      runnerUp: 'Mumbai',
      type: 'ROI',
      margin: 'Rest of India won by 4 wickets (Chased 480)',
      venue: 'Brabourne Stadium, Mumbai',
      starPlayer: 'F yard (140), Karun Nair (92), Sheldon Jackson (59*)'
    },
    {
      year: '2014–15',
      winner: 'Karnataka',
      runnerUp: 'Rest of India',
      type: 'Ranji',
      margin: 'Karnataka won by 245 runs',
      venue: 'M. Chinnaswamy Stadium, Bengaluru',
      starPlayer: 'KL Rahul (131), Vinay Kumar (6 wkts)'
    },
    {
      year: '1997–98',
      winner: 'Mumbai',
      runnerUp: 'Rest of India',
      type: 'Ranji',
      margin: 'Mumbai won by 54 runs',
      venue: 'Wankhede Stadium, Mumbai',
      starPlayer: 'Sachin Tendulkar (128), Sanjay Manjrekar'
    },
    {
      year: '1989–90',
      winner: 'Rest of India',
      runnerUp: 'Delhi',
      type: 'ROI',
      margin: 'Rest of India won on 1st innings lead',
      venue: 'Wankhede Stadium, Mumbai',
      starPlayer: 'Sachin Tendulkar (103* at age 16), Gursharan Singh (100)'
    },
    {
      year: '1977–78',
      winner: 'Rest of India',
      runnerUp: 'Bombay',
      type: 'ROI',
      margin: 'Rest of India won by 9 wickets',
      venue: 'M. Chinnaswamy Stadium, Bengaluru',
      starPlayer: 'Gundappa Viswanath (247), Bishan Singh Bedi (5 wkts)'
    },
    {
      year: '1959–60',
      winner: 'Bombay',
      runnerUp: 'Rest of India',
      type: 'Ranji',
      margin: 'Bombay won on 1st innings lead (Inaugural Edition)',
      venue: 'Karnail Singh Stadium, New Delhi',
      starPlayer: 'Polly Umrigar (102 & 252), Madhav Apte'
    }
  ];

  const timelineContainer = document.getElementById('timelineContainer');
  const searchInput = document.getElementById('timelineSearch');
  const filterChips = document.querySelectorAll('.filter-chip');

  let currentFilter = 'all';
  let searchQuery = '';

  function renderTimeline() {
    if (!timelineContainer) return;

    const filtered = iraniWinnersData.filter(item => {
      const matchesSearch = item.year.toLowerCase().includes(searchQuery) ||
                            item.winner.toLowerCase().includes(searchQuery) ||
                            item.runnerUp.toLowerCase().includes(searchQuery) ||
                            item.venue.toLowerCase().includes(searchQuery) ||
                            item.starPlayer.toLowerCase().includes(searchQuery);

      if (!matchesSearch) return false;

      if (currentFilter === 'all') return true;
      if (currentFilter === 'ROI') return item.type === 'ROI';
      if (currentFilter === 'Ranji') return item.type === 'Ranji';
      if (currentFilter === 'Mumbai') return item.winner === 'Mumbai' || item.winner === 'Bombay';
      if (currentFilter === 'Rest') return item.winner.includes('Rest of India');

      return true;
    });

    timelineContainer.innerHTML = '';

    if (filtered.length === 0) {
      timelineContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--irani-text-muted);">
          No match records found matching your filter criteria.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="item-year">${item.year}</div>
        <div class="item-winner-group">
          <span class="winner-label">🏆 Champion</span>
          <span class="winner-name">${item.winner}</span>
        </div>
        <div class="item-matchup">
          <div><strong>vs:</strong> ${item.runnerUp}</div>
          <div style="font-size: 0.82rem; margin-top: 4px; color: var(--irani-accent);">⭐ ${item.starPlayer}</div>
        </div>
        <div class="item-details">
          <span class="item-margin">${item.margin}</span>
          <span class="item-venue">📍 ${item.venue}</span>
        </div>
      `;
      timelineContainer.appendChild(el);
    });
  }

  // Filter chips listeners
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderTimeline();
    });
  });

  // Search listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTimeline();
    });
  }

  // Initial render
  renderTimeline();
});

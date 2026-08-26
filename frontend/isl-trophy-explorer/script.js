/**
 * ISL Trophy Explorer Interactive Engine
 * Handles season timeline rendering, club directory, search and filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const seasonsData = [
    {
      season: '2023–24',
      cupWinner: 'Mumbai City FC',
      shieldWinner: 'Mohun Bagan SG',
      runnerUp: 'Mohun Bagan SG',
      score: 'Mumbai City 3–1 Mohun Bagan SG',
      venue: 'Salt Lake Stadium, Kolkata',
      goldenBoot: 'Dimitrios Diamantakos (Kerala Blasters)',
      goals: '13 Goals'
    },
    {
      season: '2022–23',
      cupWinner: 'ATK Mohun Bagan',
      shieldWinner: 'Mumbai City FC',
      runnerUp: 'Bengaluru FC',
      score: 'ATKMB 2–2 BFC (4–3 on pens)',
      venue: 'Fatorda Stadium, Goa',
      goldenBoot: 'Diego Maurício (Odisha FC)',
      goals: '12 Goals'
    },
    {
      season: '2021–22',
      cupWinner: 'Hyderabad FC',
      shieldWinner: 'Jamshedpur FC',
      runnerUp: 'Kerala Blasters FC',
      score: 'HFC 1–1 KBFC (3–1 on pens)',
      venue: 'Fatorda Stadium, Goa',
      goldenBoot: 'Bartholomew Ogbeche (Hyderabad FC)',
      goals: '18 Goals'
    },
    {
      season: '2020–21',
      cupWinner: 'Mumbai City FC',
      shieldWinner: 'Mumbai City FC',
      runnerUp: 'ATK Mohun Bagan',
      score: 'Mumbai City 2–1 ATK Mohun Bagan',
      venue: 'Fatorda Stadium, Goa',
      goldenBoot: 'Igor Angulo (FC Goa) & Roy Krishna (ATKMB)',
      goals: '14 Goals'
    },
    {
      season: '2019–20',
      cupWinner: 'ATK',
      shieldWinner: 'FC Goa',
      runnerUp: 'Chennaiyin FC',
      score: 'ATK 3–1 Chennaiyin FC',
      venue: 'Fatorda Stadium, Goa',
      goldenBoot: 'Nerijus Valskis (Chennaiyin FC)',
      goals: '15 Goals'
    },
    {
      season: '2018–19',
      cupWinner: 'Bengaluru FC',
      shieldWinner: 'Bengaluru FC (League Topper)',
      runnerUp: 'FC Goa',
      score: 'Bengaluru FC 1–0 FC Goa (AET)',
      venue: 'Mumbai Football Arena, Mumbai',
      goldenBoot: 'Ferran Corominas (FC Goa)',
      goals: '16 Goals'
    },
    {
      season: '2017–18',
      cupWinner: 'Chennaiyin FC',
      shieldWinner: 'Bengaluru FC (League Topper)',
      runnerUp: 'Bengaluru FC',
      score: 'Chennaiyin FC 3–2 Bengaluru FC',
      venue: 'Kanteerava Stadium, Bengaluru',
      goldenBoot: 'Ferran Corominas (FC Goa)',
      goals: '18 Goals'
    },
    {
      season: '2016',
      cupWinner: 'Atlético de Kolkata',
      shieldWinner: 'Mumbai City FC (League Topper)',
      runnerUp: 'Kerala Blasters FC',
      score: 'ATK 1–1 KBFC (4–3 on pens)',
      venue: 'Jawaharlal Nehru Stadium, Kochi',
      goldenBoot: 'Marcelinho (Delhi Dynamos)',
      goals: '10 Goals'
    },
    {
      season: '2015',
      cupWinner: 'Chennaiyin FC',
      shieldWinner: 'FC Goa (League Topper)',
      runnerUp: 'FC Goa',
      score: 'Chennaiyin FC 3–2 FC Goa',
      venue: 'Fatorda Stadium, Goa',
      goldenBoot: 'Stiven Mendoza (Chennaiyin FC)',
      goals: '13 Goals'
    },
    {
      season: '2014',
      cupWinner: 'Atlético de Kolkata',
      shieldWinner: 'Chennaiyin FC (League Topper)',
      runnerUp: 'Kerala Blasters FC',
      score: 'ATK 1–0 Kerala Blasters (Inaugural Final)',
      venue: 'DY Patil Stadium, Navi Mumbai',
      goldenBoot: 'Elano Blumer (Chennaiyin FC)',
      goals: '8 Goals'
    }
  ];

  const clubsData = [
    { name: 'Mohun Bagan Super Giant', city: 'Kolkata, West Bengal', honours: '🏆 4 ISL Cups &middot; 1 Shield', stadium: 'Salt Lake Stadium (85,000)' },
    { name: 'Mumbai City FC', city: 'Mumbai, Maharashtra', honours: '🏆 2 ISL Cups &middot; 2 Shields', stadium: 'Mumbai Football Arena (8,000)' },
    { name: 'Chennaiyin FC', city: 'Chennai, Tamil Nadu', honours: '🏆 2 ISL Cups', stadium: 'Jawaharlal Nehru Stadium (40,000)' },
    { name: 'Bengaluru FC', city: 'Bengaluru, Karnataka', honours: '🏆 1 ISL Cup &middot; 1 Shield', stadium: 'Sree Kanteerava Stadium (25,000)' },
    { name: 'Hyderabad FC', city: 'Hyderabad, Telangana', honours: '🏆 1 ISL Cup', stadium: 'G.M.C. Balayogi Stadium (30,000)' },
    { name: 'FC Goa', city: 'Margao, Goa', honours: '🏆 1 ISL League Shield', stadium: 'Fatorda Stadium (19,000)' },
    { name: 'Kerala Blasters FC', city: 'Kochi, Kerala', honours: '🥈 3x ISL Finalists', stadium: 'Jawaharlal Nehru Stadium (40,000)' },
    { name: 'East Bengal FC', city: 'Kolkata, West Bengal', honours: '🏆 Super Cup Champions', stadium: 'Salt Lake Stadium (85,000)' },
    { name: 'Odisha FC', city: 'Bhubaneswar, Odisha', honours: '🏆 Super Cup Champions', stadium: 'Kalinga Stadium (15,000)' },
    { name: 'Jamshedpur FC', city: 'Jamshedpur, Jharkhand', honours: '🏆 1 ISL League Shield', stadium: 'JRD Tata Sports Complex (24,000)' },
    { name: 'NorthEast United FC', city: 'Guwahati, Assam', honours: '🏆 Durand Cup Champions', stadium: 'Indira Gandhi Athletic Stadium (25,000)' },
    { name: 'Punjab FC', city: 'Mohali, Punjab', honours: '🏆 I-League Champions (Promoted)', stadium: 'Jawaharlal Nehru Stadium, Delhi' }
  ];

  const timelineContainer = document.getElementById('timelineContainer');
  const searchInput = document.getElementById('timelineSearch');
  const filterChips = document.querySelectorAll('.filter-chip');
  const clubsGrid = document.getElementById('clubsGrid');

  let currentFilter = 'all';
  let searchQuery = '';

  function renderTimeline() {
    if (!timelineContainer) return;

    const filtered = seasonsData.filter(item => {
      const matchesSearch = item.season.toLowerCase().includes(searchQuery) ||
                            item.cupWinner.toLowerCase().includes(searchQuery) ||
                            item.shieldWinner.toLowerCase().includes(searchQuery) ||
                            item.runnerUp.toLowerCase().includes(searchQuery) ||
                            item.venue.toLowerCase().includes(searchQuery) ||
                            item.goldenBoot.toLowerCase().includes(searchQuery);

      if (!matchesSearch) return false;

      if (currentFilter === 'all') return true;
      if (currentFilter === 'ATK') return item.cupWinner.includes('ATK') || item.cupWinner.includes('Mohun Bagan');
      if (currentFilter === 'Mumbai') return item.cupWinner.includes('Mumbai');
      if (currentFilter === 'Chennaiyin') return item.cupWinner.includes('Chennaiyin');
      if (currentFilter === 'Bengaluru') return item.cupWinner.includes('Bengaluru');
      if (currentFilter === 'Hyderabad') return item.cupWinner.includes('Hyderabad');

      return true;
    });

    timelineContainer.innerHTML = '';

    if (filtered.length === 0) {
      timelineContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--isl-text-muted);">
          No season records found matching your filter criteria.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'season-card';
      el.innerHTML = `
        <div class="season-year">${item.season}</div>
        <div class="season-champ-box">
          <span class="champ-tag">🏆 ISL Cup Champion</span>
          <span class="champ-title">${item.cupWinner}</span>
          <span class="shield-title">🛡️ Shield: ${item.shieldWinner}</span>
        </div>
        <div class="season-match-info">
          <div><strong>Runner-up:</strong> ${item.runnerUp}</div>
          <span class="final-score">${item.score}</span>
          <div class="final-venue">📍 ${item.venue}</div>
        </div>
        <div class="season-awards-info">
          <div class="boot-badge">👟 Golden Boot</div>
          <div style="font-weight: 600; font-size: 0.9rem;">${item.goldenBoot}</div>
          <div class="boot-goals">${item.goals}</div>
        </div>
      `;
      timelineContainer.appendChild(el);
    });
  }

  function renderClubs() {
    if (!clubsGrid) return;
    clubsGrid.innerHTML = '';
    clubsData.forEach(club => {
      const card = document.createElement('div');
      card.className = 'club-card';
      card.innerHTML = `
        <div class="club-city">${club.city}</div>
        <div class="club-name">${club.name}</div>
        <div class="club-honours">${club.honours}</div>
        <div class="club-stadium">🏟️ ${club.stadium}</div>
      `;
      clubsGrid.appendChild(card);
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

  renderTimeline();
  renderClubs();
});

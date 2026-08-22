/**
 * Syed Mushtaq Ali Trophy Interactive Engine
 * Handles H2H tournament simulator, champions data table, and team comparison.
 */

document.addEventListener('DOMContentLoaded', () => {
  const teamsData = [
    { id: 'tamil-nadu', name: 'Tamil Nadu', titles: 3, finals: 4, winPct: 68.4, highTotal: '228/4', keyPlayer: 'Dinesh Karthik / Shahrukh Khan' },
    { id: 'mumbai', name: 'Mumbai', titles: 2, finals: 3, winPct: 66.2, highTotal: '258/4', keyPlayer: 'Shreyas Iyer / Ajinkya Rahane' },
    { id: 'karnataka', name: 'Karnataka', titles: 2, finals: 3, winPct: 65.8, highTotal: '250/3', keyPlayer: 'Manish Pandey / Devdutt Padikkal' },
    { id: 'punjab', name: 'Punjab', titles: 2, finals: 4, winPct: 64.5, highTotal: '275/6', keyPlayer: 'Abhishek Sharma / Mandeep Singh' },
    { id: 'baroda', name: 'Baroda', titles: 2, finals: 4, winPct: 62.1, highTotal: '221/3', keyPlayer: 'Krunal Pandya / Deepak Hooda' },
    { id: 'gujarat', name: 'Gujarat', titles: 2, finals: 2, winPct: 61.7, highTotal: '216/5', keyPlayer: 'Priyank Panchal / Urvil Patel' },
    { id: 'delhi', name: 'Delhi', titles: 1, finals: 2, winPct: 60.5, highTotal: '236/4', keyPlayer: 'Rishabh Pant / Nitish Rana' },
    { id: 'rajasthan', name: 'Rajasthan', titles: 1, finals: 2, winPct: 58.2, highTotal: '219/6', keyPlayer: 'Deepak Chahar / Rahul Chahar' },
    { id: 'bengal', name: 'Bengal', titles: 1, finals: 2, winPct: 57.8, highTotal: '212/5', keyPlayer: 'Wriddhiman Saha / Abhimanyu Easwaran' },
    { id: 'uttar-pradesh', name: 'Uttar Pradesh', titles: 1, finals: 2, winPct: 56.4, highTotal: '215/4', keyPlayer: 'Suresh Raina / Rinku Singh' }
  ];

  const championsData = [
    { season: '2024–25', champion: 'Mumbai', runnerUp: 'Madhya Pradesh', margin: 'Mumbai won by 5 wickets', venue: 'M. Chinnaswamy Stadium, Bengaluru', captain: 'Shreyas Iyer' },
    { season: '2023–24', champion: 'Punjab', runnerUp: 'Baroda', margin: 'Punjab won by 20 runs', venue: 'Inderjit Singh Bindra Stadium, Mohali', captain: 'Mandeep Singh' },
    { season: '2022–23', champion: 'Mumbai', runnerUp: 'Himachal Pradesh', margin: 'Mumbai won by 3 wickets', venue: 'Eden Gardens, Kolkata', captain: 'Ajinkya Rahane' },
    { season: '2021–22', champion: 'Tamil Nadu', runnerUp: 'Karnataka', margin: 'Tamil Nadu won by 4 wickets', venue: 'Arun Jaitley Stadium, Delhi', captain: 'Vijay Shankar' },
    { season: '2020–21', champion: 'Tamil Nadu', runnerUp: 'Baroda', margin: 'Tamil Nadu won by 7 wickets', venue: 'Narendra Modi Stadium, Ahmedabad', captain: 'Dinesh Karthik' },
    { season: '2019–20', champion: 'Karnataka', runnerUp: 'Tamil Nadu', margin: 'Karnataka won by 1 run', venue: 'Lalabhai Contractor Stadium, Surat', captain: 'Manish Pandey' },
    { season: '2018–19', champion: 'Karnataka', runnerUp: 'Maharashtra', margin: 'Karnataka won by 8 wickets', venue: 'Holkar Stadium, Indore', captain: 'Manish Pandey' },
    { season: '2017–18', champion: 'Delhi', runnerUp: 'Rajasthan', margin: 'Delhi won by 41 runs', venue: 'Eden Gardens, Kolkata', captain: 'Pradeep Sangwan' },
    { season: '2016–17', champion: 'East Zone', runnerUp: 'Central Zone', margin: 'Zonal Format Winner', venue: 'Wankhede Stadium, Mumbai', captain: 'Manoj Tiwary' },
    { season: '2015–16', champion: 'Uttar Pradesh', runnerUp: 'Baroda', margin: 'UP won by 38 runs', venue: 'Wankhede Stadium, Mumbai', captain: 'Suresh Raina' },
    { season: '2014–15', champion: 'Gujarat', runnerUp: 'Punjab', margin: 'Gujarat won by 2 wickets', venue: 'Rajiv Gandhi Intl Stadium, Hyderabad', captain: 'Smit Patel' },
    { season: '2013–14', champion: 'Baroda', runnerUp: 'Uttar Pradesh', margin: 'Baroda won by 3 runs', venue: 'Wankhede Stadium, Mumbai', captain: 'Aditya Waghmode' },
    { season: '2012–13', champion: 'Gujarat', runnerUp: 'Punjab', margin: 'Gujarat won by 31 runs', venue: 'Holkar Stadium, Indore', captain: 'Parthiv Patel' },
    { season: '2011–12', champion: 'Baroda', runnerUp: 'Punjab', margin: 'Baroda won by 8 runs', venue: 'Brabourne Stadium, Mumbai', captain: 'Pinal Shah' },
    { season: '2009–10', champion: 'Maharashtra', runnerUp: 'Hyderabad', margin: 'Maharashtra won by 19 runs', venue: 'Holkar Stadium, Indore', captain: 'Rohit Motwani' },
    { season: '2006–07', champion: 'Tamil Nadu', runnerUp: 'Punjab', margin: 'Tamil Nadu won by 2 wickets (Inaugural)', venue: 'Brabourne Stadium, Mumbai', captain: 'Dinesh Karthik' }
  ];

  // Populate Team Selectors
  const selectA = document.getElementById('teamSelectA');
  const selectB = document.getElementById('teamSelectB');
  const h2hDisplay = document.getElementById('h2hDisplay');

  function initSelectors() {
    if (!selectA || !selectB) return;

    teamsData.forEach((team, idx) => {
      const optA = document.createElement('option');
      optA.value = team.id;
      optA.textContent = team.name;
      if (idx === 0) optA.selected = true;
      selectA.appendChild(optA);

      const optB = document.createElement('option');
      optB.value = team.id;
      optB.textContent = team.name;
      if (idx === 1) optB.selected = true;
      selectB.appendChild(optB);
    });

    selectA.addEventListener('change', renderH2H);
    selectB.addEventListener('change', renderH2H);
  }

  function renderH2H() {
    if (!h2hDisplay || !selectA || !selectB) return;

    const teamA = teamsData.find(t => t.id === selectA.value) || teamsData[0];
    const teamB = teamsData.find(t => t.id === selectB.value) || teamsData[1];

    // Calculate simulated H2H ratio based on win percentage weight
    const totalWeight = teamA.winPct + teamB.winPct;
    const winsA = Math.round((teamA.winPct / totalWeight) * 12);
    const winsB = 12 - winsA;

    h2hDisplay.innerHTML = `
      <div class="h2h-team-side">
        <div class="side-team-name">${teamA.name}</div>
        <span class="side-titles-badge">🏆 ${teamA.titles} Titles &middot; ${teamA.finals} Finals</span>
        <div class="stat-row"><span class="stat-label">Win %:</span><span class="stat-val">${teamA.winPct}%</span></div>
        <div class="stat-row"><span class="stat-label">Highest Total:</span><span class="stat-val">${teamA.highTotal}</span></div>
        <div class="stat-row"><span class="stat-label">Key Star:</span><span class="stat-val">${teamA.keyPlayer}</span></div>
      </div>

      <div class="h2h-center-summary">
        <div class="h2h-score-lead">${winsA} - ${winsB}</div>
        <div class="h2h-matches-label">Head-to-Head (12 Meetings)</div>
      </div>

      <div class="h2h-team-side">
        <div class="side-team-name">${teamB.name}</div>
        <span class="side-titles-badge">🏆 ${teamB.titles} Titles &middot; ${teamB.finals} Finals</span>
        <div class="stat-row"><span class="stat-label">Win %:</span><span class="stat-val">${teamB.winPct}%</span></div>
        <div class="stat-row"><span class="stat-label">Highest Total:</span><span class="stat-val">${teamB.highTotal}</span></div>
        <div class="stat-row"><span class="stat-label">Key Star:</span><span class="stat-val">${teamB.keyPlayer}</span></div>
      </div>
    `;
  }

  // Populate Champions Table
  const tableBody = document.getElementById('championsTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    championsData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${item.season}</strong></td>
        <td><span class="champ-name">🏆 ${item.champion}</span></td>
        <td>${item.runnerUp}</td>
        <td><div>${item.margin}</div><small style="color: var(--smat-text-muted);">${item.venue}</small></td>
        <td>${item.captain}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  initSelectors();
  renderH2H();
});

/**
 * Indian Election Simulator - Interactive Gameplay Engine
 */

(function () {
  'use strict';

  const CONSTITUENCIES = [
    { id: 'delhi-north', name: 'Chandni Chowk (Delhi)', voters: '1.5M', state: 'Delhi' },
    { id: 'mumbai-south', name: 'Mumbai South (Maharashtra)', voters: '1.6M', state: 'Maharashtra' },
    { id: 'varanasi', name: 'Varanasi (Uttar Pradesh)', voters: '1.8M', state: 'Uttar Pradesh' },
    { id: 'wayanad', name: 'Wayanad (Kerala)', voters: '1.3M', state: 'Kerala' },
    { id: 'kolkata-south', name: 'Kolkata South (West Bengal)', voters: '1.7M', state: 'West Bengal' }
  ];

  const PARTIES = [
    { id: 'p1', name: 'Progressive Alliance Party', symbol: '🐘', color: '#ff9933', candidate: 'Rajesh Kumar' },
    { id: 'p2', name: 'National Democratic Front', symbol: '🪷', color: '#2563eb', candidate: 'Priya Sharma' },
    { id: 'p3', name: 'People’s Unity Congress', symbol: '✋', color: '#16a34a', candidate: 'Amitav Ghosh' },
    { id: 'p4', name: 'Independent Forward', symbol: '🚴', color: '#ca8a04', candidate: 'Suresh Patil' }
  ];

  const state = {
    currentStep: 1,
    selectedConstituency: CONSTITUENCIES[0],
    votes: { p1: 0, p2: 0, p3: 0, p4: 0 },
    userVoted: false
  };

  let constituencyGrid, partyContainer, evmList, vvpatWin, stepperTabs;

  function init() {
    const constituencyEl = document.getElementById('constituency-grid');
    if (!constituencyEl) return;

    constituencyGrid = constituencyEl;
    partyContainer = document.getElementById('party-manifestos');
    evmList = document.getElementById('evm-candidate-list');
    vvpatWin = document.getElementById('vvpat-window');
    stepperTabs = document.querySelectorAll('.step');

    renderConstituencies();
    renderParties();
    renderEVM();
    bindEvents();
  }

  function bindEvents() {
    document.getElementById('btn-goto-evm').addEventListener('click', () => switchStep(3));
    document.getElementById('btn-restart-election').addEventListener('click', restartElection);
  }

  function renderConstituencies() {
    constituencyGrid.innerHTML = '';
    CONSTITUENCIES.forEach(c => {
      const card = document.createElement('div');
      card.className = `constituency-card ${c.id === state.selectedConstituency.id ? 'selected' : ''}`;
      card.innerHTML = `
        <h3>${c.name}</h3>
        <p>State: <strong>${c.state}</strong></p>
        <p>Eligible Voters: ${c.voters}</p>
      `;
      card.addEventListener('click', () => {
        state.selectedConstituency = c;
        renderConstituencies();
        switchStep(2);
      });
      constituencyGrid.appendChild(card);
    });
  }

  function renderParties() {
    partyContainer.innerHTML = '';
    PARTIES.forEach(p => {
      const card = document.createElement('div');
      card.className = 'party-card';
      card.innerHTML = `
        <div class="party-symbol">${p.symbol}</div>
        <h3>${p.name}</h3>
        <p>Candidate: <strong>${p.candidate}</strong></p>
      `;
      partyContainer.appendChild(card);
    });
  }

  function renderEVM() {
    evmList.innerHTML = '';
    PARTIES.forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = 'candidate-row';
      row.innerHTML = `
        <span><strong>${idx + 1}.</strong> ${p.candidate} (${p.symbol})</span>
        <button class="vote-btn" data-id="${p.id}">VOTE [BLUE BUTTON]</button>
      `;
      row.querySelector('.vote-btn').addEventListener('click', () => castVote(p));
      evmList.appendChild(row);
    });
  }

  function castVote(party) {
    if (state.userVoted) return;

    state.userVoted = true;
    state.votes[party.id]++;

    // Simulate VVPAT confirmation slip
    vvpatWin.innerHTML = `
      <div style="color: #00ff00;">
        <p>[ VVPAT SLIP PRINTED ]</p>
        <p>Serial No: #0${Math.floor(Math.random() * 900 + 100)}</p>
        <p>Candidate: <strong>${party.candidate}</strong></p>
        <p>Symbol: ${party.symbol}</p>
      </div>
    `;

    setTimeout(() => {
      simulateMockVotes();
      switchStep(4);
      renderResults();
    }, 2500);
  }

  function simulateMockVotes() {
    // Generate random voting numbers for mock election realism
    PARTIES.forEach(p => {
      state.votes[p.id] += Math.floor(Math.random() * 500) + 100;
    });
  }

  function renderResults() {
    const chartEl = document.getElementById('results-chart');
    const winnerEl = document.getElementById('winner-announcement');
    chartEl.innerHTML = '';

    let totalVotes = 0;
    let winningParty = PARTIES[0];
    let maxVotes = -1;

    PARTIES.forEach(p => {
      const voteCount = state.votes[p.id];
      totalVotes += voteCount;
      if (voteCount > maxVotes) {
        maxVotes = voteCount;
        winningParty = p;
      }
    });

    PARTIES.forEach(p => {
      const voteCount = state.votes[p.id];
      const pct = Math.round((voteCount / totalVotes) * 100);
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <span style="width: 140px;">${p.name} (${p.symbol})</span>
        <div class="bar-fill" style="width: ${pct * 3}px; background-color: ${p.color};"></div>
        <span>${voteCount} votes (${pct}%)</span>
      `;
      chartEl.appendChild(row);
    });

    winnerEl.innerHTML = `
      <h3 style="color: #22c55e;">🎉 ELECTION RESULT DECLARED!</h3>
      <p>Winner for <strong>${state.selectedConstituency.name}</strong>: <strong>${winningParty.candidate}</strong> (${winningParty.name} ${winningParty.symbol}) with <strong>${maxVotes} votes</strong>!</p>
    `;
  }

  function switchStep(stepNum) {
    state.currentStep = stepNum;

    stepperTabs.forEach((tab, index) => {
      if (index + 1 === stepNum) tab.classList.add('active');
      else tab.classList.remove('active');
    });

    document.querySelectorAll('.stage-section').forEach((sec, idx) => {
      if (idx + 1 === stepNum) sec.classList.add('active');
      else sec.classList.remove('active');
    });
  }

  function restartElection() {
    state.votes = { p1: 0, p2: 0, p3: 0, p4: 0 };
    state.userVoted = false;
    vvpatWin.innerHTML = '<span class="vvpat-placeholder">VVPAT Slip will display here for 7 seconds after voting.</span>';
    switchStep(1);
  }

  if (typeof window !== 'undefined') {
    window.ElectionSimulator = { state, CONSTITUENCIES, PARTIES, switchStep, restartElection };
    document.addEventListener('DOMContentLoaded', init);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONSTITUENCIES, PARTIES };
  }
})();

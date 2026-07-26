/**
 * Capital Match-Up Game Logic
 * Reuses mapData.locations dataset to create round-based drag & drop
 * and tap-to-select matching pairs between states and their capitals.
 */

export class CapitalMatchGame {
  constructor(locationsData) {
    this.locations = locationsData || [];
    this.score = 0;
    this.roundsCompleted = 0;
    this.matchedPairsCount = 0;
    this.currentRoundItems = [];
    this.selectedState = null;
    this.selectedCapital = null;
    this.startTime = null;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
  }

  generateRoundItems(count = 5) {
    if (!this.locations.length) return [];
    const shuffled = [...this.locations].sort(() => 0.5 - Math.random());
    this.currentRoundItems = shuffled.slice(0, Math.min(count, shuffled.length));
    this.matchedPairsCount = 0;
    this.selectedState = null;
    this.selectedCapital = null;
    return this.currentRoundItems;
  }

  getShuffledStates() {
    return [...this.currentRoundItems].sort(() => 0.5 - Math.random());
  }

  getShuffledCapitals() {
    return [...this.currentRoundItems].sort(() => 0.5 - Math.random());
  }

  checkMatch(stateId, capitalCity) {
    const item = this.currentRoundItems.find(i => i.id === stateId);
    if (!item) return false;

    const isMatch = item.capital.trim().toLowerCase() === capitalCity.trim().toLowerCase();

    if (isMatch) {
      this.matchedPairsCount += 1;
      this.score += 20;
    } else {
      this.score = Math.max(0, this.score - 5);
    }

    const isRoundComplete = this.matchedPairsCount === this.currentRoundItems.length;
    if (isRoundComplete) {
      this.roundsCompleted += 1;
    }

    return {
      isMatch,
      matchedPairsCount: this.matchedPairsCount,
      totalPairs: this.currentRoundItems.length,
      isRoundComplete,
      score: this.score
    };
  }

  resetGame() {
    this.score = 0;
    this.roundsCompleted = 0;
    this.matchedPairsCount = 0;
    this.selectedState = null;
    this.selectedCapital = null;
    this.elapsedSeconds = 0;
  }
}

// DOM Setup
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const locations = window.mapData ? window.mapData.locations : [];
    const game = new CapitalMatchGame(locations);

    const scoreEl = document.getElementById('score-display');
    const timerEl = document.getElementById('timer-display');
    const pairsEl = document.getElementById('pairs-display');
    const roundsEl = document.getElementById('rounds-display');
    const statesCol = document.getElementById('states-column');
    const capitalsCol = document.getElementById('capitals-column');
    const modalEl = document.getElementById('round-modal');
    const modalTimeEl = document.getElementById('modal-time');
    const modalScoreEl = document.getElementById('modal-score');
    const modalContinueBtn = document.getElementById('btn-modal-continue');
    const newRoundBtn = document.getElementById('btn-new-round');
    const resetGameBtn = document.getElementById('btn-reset-game');

    let timerId = null;

    function startTimer() {
      stopTimer();
      game.elapsedSeconds = 0;
      updateTimerDisplay();
      timerId = setInterval(() => {
        game.elapsedSeconds += 1;
        updateTimerDisplay();
      }, 1000);
    }

    function stopTimer() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    }

    function updateTimerDisplay() {
      const mins = Math.floor(game.elapsedSeconds / 60).toString().padStart(2, '0');
      const secs = (game.elapsedSeconds % 60).toString().padStart(2, '0');
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }

    function updateStatsUI() {
      if (scoreEl) scoreEl.textContent = game.score;
      if (pairsEl) pairsEl.textContent = `${game.matchedPairsCount} / ${game.currentRoundItems.length}`;
      if (roundsEl) roundsEl.textContent = game.roundsCompleted;
    }

    function setupRound() {
      if (modalEl) modalEl.classList.add('hidden');
      game.generateRoundItems(5);
      updateStatsUI();
      startTimer();

      const states = game.getShuffledStates();
      const capitals = game.getShuffledCapitals();

      if (statesCol) {
        statesCol.innerHTML = states.map(s => `
          <div class="match-card state-card" draggable="true" data-id="${s.id}" data-name="${s.name}" tabindex="0">
            <span>🚩 ${s.name}</span>
          </div>
        `).join('');
      }

      if (capitalsCol) {
        capitalsCol.innerHTML = capitals.map(c => `
          <div class="match-card capital-card" data-capital="${c.capital}" tabindex="0">
            <span>🏙️ ${c.capital}</span>
          </div>
        `).join('');
      }

      attachEventListeners();
    }

    function attachEventListeners() {
      const stateCards = statesCol ? statesCol.querySelectorAll('.state-card') : [];
      const capitalCards = capitalsCol ? capitalsCol.querySelectorAll('.capital-card') : [];

      // Drag & Drop
      stateCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', card.getAttribute('data-id'));
          card.classList.add('selected');
        });
        card.addEventListener('dragend', () => {
          card.classList.remove('selected');
        });

        // Click selection (Tap to select)
        card.addEventListener('click', () => {
          stateCards.forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          game.selectedState = card.getAttribute('data-id');
          tryPairing();
        });
      });

      capitalCards.forEach(card => {
        card.addEventListener('dragover', (e) => {
          e.preventDefault();
        });

        card.addEventListener('drop', (e) => {
          e.preventDefault();
          const stateId = e.dataTransfer.getData('text/plain');
          const capitalCity = card.getAttribute('data-capital');
          evaluatePairing(stateId, capitalCity, card);
        });

        card.addEventListener('click', () => {
          if (!game.selectedState) return;
          const capitalCity = card.getAttribute('data-capital');
          evaluatePairing(game.selectedState, capitalCity, card);
        });
      });
    }

    function tryPairing() {
      // Used for click-to-select mode when both are active
    }

    function evaluatePairing(stateId, capitalCity, capitalCardEl) {
      const stateCardEl = statesCol ? statesCol.querySelector(`.state-card[data-id="${stateId}"]`) : null;
      if (!stateCardEl || stateCardEl.classList.contains('matched')) return;

      const res = game.checkMatch(stateId, capitalCity);
      updateStatsUI();

      if (res.isMatch) {
        stateCardEl.classList.remove('selected');
        stateCardEl.classList.add('matched');
        capitalCardEl.classList.add('matched');
        stateCardEl.setAttribute('draggable', 'false');
        game.selectedState = null;

        if (res.isRoundComplete) {
          stopTimer();
          setTimeout(() => {
            if (modalEl) {
              if (modalTimeEl) modalTimeEl.textContent = `${game.elapsedSeconds}s`;
              if (modalScoreEl) modalScoreEl.textContent = `${game.score} pts`;
              modalEl.classList.remove('hidden');
            }
          }, 400);
        }
      } else {
        stateCardEl.classList.add('incorrect-shake');
        capitalCardEl.classList.add('incorrect-shake');
        setTimeout(() => {
          stateCardEl.classList.remove('incorrect-shake');
          capitalCardEl.classList.remove('incorrect-shake');
          stateCardEl.classList.remove('selected');
          game.selectedState = null;
        }, 500);
      }
    }

    if (modalContinueBtn) {
      modalContinueBtn.addEventListener('click', setupRound);
    }

    if (newRoundBtn) {
      newRoundBtn.addEventListener('click', setupRound);
    }

    if (resetGameBtn) {
      resetGameBtn.addEventListener('click', () => {
        game.resetGame();
        setupRound();
      });
    }

    // Init first round
    setupRound();
  });
}

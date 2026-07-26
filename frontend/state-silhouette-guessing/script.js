/**
 * State Silhouette Guessing Game Engine
 * Manages random state selection, multiple-choice vs text mode,
 * local storage streak tracking, and interactive feedback.
 */

export class SilhouetteGame {
  constructor(locationsData) {
    this.locations = locationsData || [];
    this.currentMode = 'mc'; // 'mc' or 'text'
    this.score = 0;
    this.streak = 0;
    this.bestStreak = parseInt(localStorage.getItem('silhouette_best_streak') || '0', 10);
    this.played = 0;
    this.currentTarget = null;
    this.currentOptions = [];
    this.isAnswered = false;
    this.usedHint = false;
  }

  getRandomTarget() {
    if (!this.locations.length) return null;
    const randomIndex = Math.floor(Math.random() * this.locations.length);
    return this.locations[randomIndex];
  }

  generateOptions(target) {
    if (!target || !this.locations.length) return [];

    const distractors = this.locations
      .filter(loc => loc.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());
    return options;
  }

  startNewRound() {
    this.isAnswered = false;
    this.usedHint = false;
    this.currentTarget = this.getRandomTarget();
    this.currentOptions = this.generateOptions(this.currentTarget);
    return {
      target: this.currentTarget,
      options: this.currentOptions
    };
  }

  checkAnswer(userGuess) {
    if (!this.currentTarget || this.isAnswered) return null;

    this.isAnswered = true;
    this.played += 1;

    const normalizedGuess = String(userGuess).trim().toLowerCase();
    const normalizedTarget = this.currentTarget.name.trim().toLowerCase();

    const isCorrect = normalizedGuess === normalizedTarget;

    if (isCorrect) {
      const points = this.usedHint ? 5 : 10;
      this.score += points;
      this.streak += 1;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
        localStorage.setItem('silhouette_best_streak', this.bestStreak.toString());
      }
    } else {
      this.streak = 0;
    }

    return {
      isCorrect,
      targetName: this.currentTarget.name,
      capital: this.currentTarget.capital,
      score: this.score,
      streak: this.streak,
      bestStreak: this.bestStreak,
      played: this.played
    };
  }

  getHint() {
    if (!this.currentTarget || this.usedHint) return null;
    this.usedHint = true;
    return `Capital City: ${this.currentTarget.capital}`;
  }

  resetStats() {
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.played = 0;
    localStorage.removeItem('silhouette_best_streak');
  }
}

// DOM Setup
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const locations = window.mapData ? window.mapData.locations : [];
    const game = new SilhouetteGame(locations);

    const scoreEl = document.getElementById('score-display');
    const streakEl = document.getElementById('streak-display');
    const bestStreakEl = document.getElementById('best-streak-display');
    const playedEl = document.getElementById('played-display');
    const svgPathEl = document.getElementById('silhouette-path');
    const optionsContainer = document.getElementById('options-container');
    const textInputContainer = document.getElementById('text-input-container');
    const textInput = document.getElementById('guess-text-input');
    const submitBtn = document.getElementById('btn-submit-guess');
    const hintBanner = document.getElementById('hint-banner');
    const feedbackBox = document.getElementById('feedback-box');
    const nextActionContainer = document.getElementById('next-action-container');
    const nextBtn = document.getElementById('btn-next-question');
    const hintBtn = document.getElementById('btn-hint');
    const resetBtn = document.getElementById('btn-reset');
    const modeMcBtn = document.getElementById('btn-mode-mc');
    const modeTextBtn = document.getElementById('btn-mode-text');

    function updateUIStats() {
      if (scoreEl) scoreEl.textContent = game.score;
      if (streakEl) streakEl.textContent = `🔥 ${game.streak}`;
      if (bestStreakEl) bestStreakEl.textContent = `🏆 ${game.bestStreak}`;
      if (playedEl) playedEl.textContent = game.played;
    }

    function renderRound() {
      const round = game.startNewRound();
      if (!round.target) return;

      if (svgPathEl) {
        svgPathEl.setAttribute('d', round.target.path);
      }

      if (hintBanner) {
        hintBanner.classList.add('hidden');
        hintBanner.textContent = '';
      }

      if (feedbackBox) {
        feedbackBox.classList.add('hidden');
        feedbackBox.className = 'feedback-box hidden';
      }

      if (nextActionContainer) {
        nextActionContainer.classList.add('hidden');
      }

      if (game.currentMode === 'mc') {
        if (optionsContainer) {
          optionsContainer.classList.remove('hidden');
          optionsContainer.innerHTML = round.options.map(opt => `
            <button class="option-btn" data-name="${opt.name}">${opt.name}</button>
          `).join('');

          const optionBtns = optionsContainer.querySelectorAll('.option-btn');
          optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              handleAnswer(btn.getAttribute('data-name'), btn);
            });
          });
        }
        if (textInputContainer) textInputContainer.classList.add('hidden');
      } else {
        if (optionsContainer) optionsContainer.classList.add('hidden');
        if (textInputContainer) {
          textInputContainer.classList.remove('hidden');
          if (textInput) textInput.value = '';
        }
      }
    }

    function handleAnswer(userGuess, targetBtn = null) {
      const result = game.checkAnswer(userGuess);
      if (!result) return;

      updateUIStats();

      if (feedbackBox) {
        feedbackBox.classList.remove('hidden');
        if (result.isCorrect) {
          feedbackBox.className = 'feedback-box correct';
          feedbackBox.textContent = `🎉 Correct! That is ${result.targetName} (Capital: ${result.capital}).`;
          if (targetBtn) targetBtn.classList.add('correct');
        } else {
          feedbackBox.className = 'feedback-box incorrect';
          feedbackBox.textContent = `❌ Incorrect! That outline belongs to ${result.targetName} (Capital: ${result.capital}).`;
          if (targetBtn) targetBtn.classList.add('incorrect');
        }
      }

      // Disable further option clicks
      if (optionsContainer) {
        optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
          btn.disabled = true;
          if (btn.getAttribute('data-name') === result.targetName) {
            btn.classList.add('correct');
          }
        });
      }

      if (nextActionContainer) nextActionContainer.classList.remove('hidden');
    }

    if (submitBtn && textInput) {
      submitBtn.addEventListener('click', () => {
        handleAnswer(textInput.value);
      });
      textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAnswer(textInput.value);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', renderRound);
    }

    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        const hint = game.getHint();
        if (hint && hintBanner) {
          hintBanner.classList.remove('hidden');
          hintBanner.textContent = `💡 Hint: ${hint}`;
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        game.resetStats();
        updateUIStats();
        renderRound();
      });
    }

    if (modeMcBtn && modeTextBtn) {
      modeMcBtn.addEventListener('click', () => {
        game.currentMode = 'mc';
        modeMcBtn.classList.add('active');
        modeTextBtn.classList.remove('active');
        renderRound();
      });

      modeTextBtn.addEventListener('click', () => {
        game.currentMode = 'text';
        modeTextBtn.classList.add('active');
        modeMcBtn.classList.remove('active');
        renderRound();
      });
    }

    // Init first round
    updateUIStats();
    renderRound();
  });
}

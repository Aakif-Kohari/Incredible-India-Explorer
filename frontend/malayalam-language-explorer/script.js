/**
 * Malayalam Language Explorer Interactive Engine
 * Handles Audio Speech Synthesis, Web Audio fallback, and Vocabulary Grid Rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { native: 'നന്ദി', translit: 'Nandi', meaning: 'Thank you', ipa: '[n̪ɐn̪d̪i]' },
    { native: 'സുഖമാണോ?', translit: 'Sukhamaano?', meaning: 'How are you?', ipa: '[sukʰɐmaːɳoː]' },
    { native: 'അതെ', translit: 'Athe', meaning: 'Yes', ipa: '[ɐd̪e]' },
    { native: 'അല്ല / ഇല്ല', translit: 'Alla / Illa', meaning: 'No / Not', ipa: '[ɐlːɐ] / [ilːɐ]' },
    { native: 'വെള്ളം', translit: 'Vellam', meaning: 'Water', ipa: '[ʋeɭːɐm]' },
    { native: 'ഭക്ഷണം / ചോറ്', translit: 'Bhakshanam / Choru', meaning: 'Food / Rice', ipa: '[bʱɐkʂɐɳɐm]' },
    { native: 'വീട്', translit: 'Veedu', meaning: 'House / Home', ipa: '[ʋiːɖɨ̆]' },
    { native: 'സ്നേഹം', translit: 'Sneham', meaning: 'Love / Affection', ipa: '[sneːhɐm]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('malayalam-greeting-audio-btn');
  let voices = [];
  let currentUtterance = null;
  let activePlayingBtn = null;

  // Initialize Speech Synthesis Voices
  function loadVoices() {
    if ('speechSynthesis' in window) {
      voices = window.speechSynthesis.getVoices();
    }
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }

  // Web Audio Fallback for harmonic pitch tone
  function playAudioTone(freq = 440, duration = 0.3) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      console.warn('Web Audio synthesis not supported', err);
    }
  }

  // Speech Pronunciation Function
  function speakText(text, btnElement, translit = '') {
    if (!('speechSynthesis' in window)) {
      playAudioTone(520, 0.4);
      return;
    }

    if (window.speechSynthesis.speaking && activePlayingBtn === btnElement) {
      window.speechSynthesis.cancel();
      resetButtonState(btnElement);
      return;
    }

    window.speechSynthesis.cancel();
    if (activePlayingBtn && activePlayingBtn !== btnElement) {
      resetButtonState(activePlayingBtn);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ml-IN';

    // Locate best available Malayalam voice or fallback to Indian English/Regional
    const mlVoice = voices.find(v => v.lang.startsWith('ml') || v.lang === 'ml_IN') ||
                    voices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('hi'));
    if (mlVoice) {
      utterance.voice = mlVoice;
    }

    utterance.rate = 0.9;
    window.currentUtterance = utterance;

    utterance.onstart = () => {
      activePlayingBtn = btnElement;
      btnElement.classList.add('playing');
      const textSpan = btnElement.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Playing...';
      else btnElement.textContent = '⏸ Stop';
    };

    utterance.onend = () => {
      resetButtonState(btnElement);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        playAudioTone(480, 0.35);
      }
      resetButtonState(btnElement);
    };

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);
  }

  function resetButtonState(btn) {
    if (!btn) return;
    btn.classList.remove('playing');
    const textSpan = btn.querySelector('.btn-text');
    if (textSpan) {
      textSpan.textContent = 'Listen to Audio Pronunciation';
    } else if (btn.classList.contains('vocab-play-btn')) {
      btn.innerHTML = '🔊 Listen';
    }
    if (activePlayingBtn === btn) {
      activePlayingBtn = null;
    }
  }

  // Bind Greeting Audio Button
  if (greetingBtn) {
    greetingBtn.addEventListener('click', () => {
      speakText('നമസ്കാരം', greetingBtn, 'Namaskaram');
    });
  }

  // Populate Vocabulary Grid
  if (vocabGrid) {
    vocabularyData.forEach(item => {
      const card = document.createElement('article');
      card.className = 'vocab-card';
      card.innerHTML = `
        <div class="vocab-native">${item.native}</div>
        <div class="vocab-translit">${item.translit}</div>
        <div class="vocab-meaning">Meaning: <strong>${item.meaning}</strong></div>
        <button class="vocab-play-btn" aria-label="Listen to pronunciation of ${item.translit}">
          🔊 Listen
        </button>
      `;

      const playBtn = card.querySelector('.vocab-play-btn');
      playBtn.addEventListener('click', () => {
        speakText(item.native, playBtn, item.translit);
      });

      vocabGrid.appendChild(card);
    });
  }
});

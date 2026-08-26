/**
 * Sanskrit Language Explorer Interactive Engine
 * Handles Speech Synthesis audio pronunciation, Web Audio synthesis fallback, and Vocabulary Grid.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { native: 'धन्यवादः', translit: 'Dhanyavādaḥ', meaning: 'Thank you', ipa: '[d̪ʱɐnjɐʋaːd̪ɐh]' },
    { native: 'कथम् अस्ति?', translit: 'Katham asti?', meaning: 'How are you?', ipa: '[kɐt̪ʰɐm ɐst̪i]' },
    { native: 'आम्', translit: 'Ām', meaning: 'Yes', ipa: '[aːm]' },
    { native: 'न / नहि', translit: 'Na / Nahi', meaning: 'No / Not', ipa: '[nɐ] / [nɐhi]' },
    { native: 'जलम्', translit: 'Jalam', meaning: 'Water', ipa: '[dʒɐlɐm]' },
    { native: 'गृहम्', translit: 'Gṛham', meaning: 'House / Home', ipa: '[ɡr̩hɐm]' },
    { native: 'शान्तिः', translit: 'Śāntiḥ', meaning: 'Peace / Serenity', ipa: '[ɕaːnt̪ih]' },
    { native: 'सत्यम्', translit: 'Satyam', meaning: 'Truth', ipa: '[sɐt̪jɐm]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('sanskrit-greeting-audio-btn');
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
  function playAudioTone(freq = 432, duration = 0.35) {
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
      playAudioTone(432, 0.4);
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
    utterance.lang = 'sa-IN';

    // Locate best available Sanskrit/Hindi/Indian English voice
    const saVoice = voices.find(v => v.lang.startsWith('sa') || v.lang === 'sa_IN') ||
                    voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('en-IN'));
    if (saVoice) {
      utterance.voice = saVoice;
    }

    utterance.rate = 0.85;
    window.currentUtterance = utterance;

    utterance.onstart = () => {
      activePlayingBtn = btnElement;
      btnElement.classList.add('playing');
      const textSpan = btnElement.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Chanting / Playing...';
      else btnElement.textContent = '⏸ Stop';
    };

    utterance.onend = () => {
      resetButtonState(btnElement);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        playAudioTone(432, 0.35);
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
      speakText('नमस्ते नमो नमः', greetingBtn, 'Namaste Namo Namah');
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

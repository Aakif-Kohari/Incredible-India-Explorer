/**
 * Hindi Language Explorer Interactive Engine
 * Handles Speech Synthesis audio pronunciation, Web Audio synthesis fallback, and Vocabulary Grid.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { native: 'धन्यवाद', translit: 'Dhanyavaad', meaning: 'Thank you', ipa: '[d̪ʱənjəʋaːd̪]' },
    { native: 'आप कैसे हैं?', translit: 'Aap kaise hain?', meaning: 'How are you? (formal)', ipa: '[aːp kɛːseː hɛ̃ː]' },
    { native: 'कृपया', translit: 'Kripya', meaning: 'Please', ipa: '[krɪpjaː]' },
    { native: 'हाँ', translit: 'Haan', meaning: 'Yes', ipa: '[hãː]' },
    { native: 'नहीं', translit: 'Nahin', meaning: 'No', ipa: '[nəhĩː]' },
    { native: 'मित्र / दोस्त', translit: 'Mitra / Dost', meaning: 'Friend', ipa: '[mɪtrə / d̪oːst̪]' },
    { native: 'जल / पानी', translit: 'Jal / Paani', meaning: 'Water', ipa: '[dʒəl / paːniː]' },
    { native: 'सुप्रभात', translit: 'Suprabhat', meaning: 'Good morning', ipa: '[sʊprəbʱaːt̪]' },
    { native: 'अलविदा / फिर मिलेंगे', translit: 'Alvida / Phir Milenge', meaning: 'Goodbye / See you again', ipa: '[əlvɪd̪aː]' },
    { native: 'प्रेम / प्यार', translit: 'Prem / Pyaar', meaning: 'Love', ipa: '[preːm / pjaːr]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('hindi-greeting-audio-btn');
  let voices = [];
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

  // Web Audio Fallback for pitch tone
  function playAudioTone(freq = 480, duration = 0.3) {
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
    utterance.lang = 'hi-IN';

    // Locate best available Hindi voice
    const hiVoice = voices.find(v => v.lang === 'hi-IN' || v.lang.startsWith('hi')) ||
                    voices.find(v => v.lang.startsWith('en-IN'));
    if (hiVoice) {
      utterance.voice = hiVoice;
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
      speakText('नमस्ते', greetingBtn, 'Namaste');
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

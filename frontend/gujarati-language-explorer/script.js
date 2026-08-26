/**
 * Gujarati Language Explorer Interactive Engine
 * Handles Speech Synthesis audio pronunciation, Web Audio synthesis fallback, and Vocabulary Grid.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { native: 'આભાર / ધન્યવાદ', translit: 'Aabhar / Dhanyavaad', meaning: 'Thank you', ipa: '[aːbʱaːr]' },
    { native: 'તમે કેમ છો?', translit: 'Tame kem chho?', meaning: 'How are you? (formal)', ipa: '[t̪əmeː kɛm tʃʰoː]' },
    { native: 'મજામાં', translit: 'Majama', meaning: 'I am fine / In joy', ipa: '[mədʒaːmãː]' },
    { native: 'કૃપા કરીને', translit: 'Krupa karine', meaning: 'Please', ipa: '[kruːpaː kərɪneː]' },
    { native: 'હા', translit: 'Haa', meaning: 'Yes', ipa: '[haː]' },
    { native: 'ના', translit: 'Naa', meaning: 'No', ipa: '[naː]' },
    { native: 'મિત્ર / દોસ્ત', translit: 'Mitra / Dost', meaning: 'Friend', ipa: '[mɪtrə]' },
    { native: 'પાણી / જળ', translit: 'Paani / Jal', meaning: 'Water', ipa: '[paːɳiː]' },
    { native: 'ઘર', translit: 'Ghar', meaning: 'House / Home', ipa: '[ɡʱər]' },
    { native: 'પ્રેમ', translit: 'Prem', meaning: 'Love', ipa: '[preːm]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('gujarati-greeting-audio-btn');
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
  function playAudioTone(freq = 490, duration = 0.3) {
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
      playAudioTone(500, 0.4);
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
    utterance.lang = 'gu-IN';

    // Locate best available Gujarati voice
    const guVoice = voices.find(v => v.lang === 'gu-IN' || v.lang.startsWith('gu')) ||
                    voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('en-IN'));
    if (guVoice) {
      utterance.voice = guVoice;
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
        playAudioTone(490, 0.35);
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
      speakText('નમસ્તે', greetingBtn, 'Namaste');
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

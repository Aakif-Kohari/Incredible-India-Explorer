/**
 * Sindhi Language Explorer Interactive Engine
 * Handles Dual-Script Representation, Speech Synthesis audio pronunciation, Web Audio synthesis fallback, and Vocabulary Grid.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { persoArabic: 'مهرباني', devanagari: 'मेहरबानी', translit: 'Meharbani', meaning: 'Thank you', ipa: '[meːhəɾbaːniː]' },
    { persoArabic: 'توهان ڪيئن آهيو؟', devanagari: 'तव्हां कीअं आहियो?', translit: 'Tawhan kian ahyo?', meaning: 'How are you?', ipa: '[təʋɦãː kiːə̃ː aːhjoː]' },
    { persoArabic: 'ها', devanagari: 'हा', translit: 'Haa', meaning: 'Yes', ipa: '[haː]' },
    { persoArabic: 'نه', devanagari: 'न', translit: 'Na', meaning: 'No', ipa: '[nə]' },
    { persoArabic: 'پاڻي', devanagari: 'पाणी', translit: 'Paani', meaning: 'Water', ipa: '[paːɳiː]' },
    { persoArabic: 'مَنِي / ماني', devanagari: 'मानी', translit: 'Maani', meaning: 'Bread / Meal', ipa: '[maːniː]' },
    { persoArabic: 'گھر', devanagari: 'घर', translit: 'Ghar', meaning: 'House / Home', ipa: '[ɡʱəɾʊ]' },
    { persoArabic: 'پيار', devanagari: 'प्यार', translit: 'Pyaar', meaning: 'Love / Affection', ipa: '[pjaːɾʊ]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('sindhi-greeting-audio-btn');
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
  function playAudioTone(freq = 460, duration = 0.3) {
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
      playAudioTone(490, 0.4);
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
    utterance.lang = 'sd-IN';

    // Locate best available Sindhi/Urdu/Hindi/Gujarati voice
    const sdVoice = voices.find(v => v.lang.startsWith('sd') || v.lang === 'sd_IN') ||
                    voices.find(v => v.lang.startsWith('ur') || v.lang.startsWith('hi') || v.lang.startsWith('gu'));
    if (sdVoice) {
      utterance.voice = sdVoice;
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
      speakText('जय झूलेलाल', greetingBtn, 'Jai Jhulelal');
    });
  }

  // Populate Vocabulary Grid
  if (vocabGrid) {
    vocabularyData.forEach(item => {
      const card = document.createElement('article');
      card.className = 'vocab-card';
      card.innerHTML = `
        <div class="vocab-dual-scripts">
          <div class="vocab-perso-arabic">${item.persoArabic}</div>
          <div class="vocab-devanagari">${item.devanagari}</div>
        </div>
        <div class="vocab-translit">${item.translit}</div>
        <div class="vocab-meaning">Meaning: <strong>${item.meaning}</strong></div>
        <button class="vocab-play-btn" aria-label="Listen to pronunciation of ${item.translit}">
          🔊 Listen
        </button>
      `;

      const playBtn = card.querySelector('.vocab-play-btn');
      playBtn.addEventListener('click', () => {
        speakText(item.devanagari, playBtn, item.translit);
      });

      vocabGrid.appendChild(card);
    });
  }
});

/**
 * Telugu Language Explorer Interactive Engine
 * Handles Speech Synthesis audio pronunciation, Web Audio synthesis fallback, and Vocabulary Grid.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { native: 'ధన్యవాదాలు', translit: 'Dhanyavaadaalu', meaning: 'Thank you', ipa: '[d̪ʱənjəʋaːd̪aːlu]' },
    { native: 'మీరు ఎలా ఉన్నారు?', translit: 'Meeru ela unnaaru?', meaning: 'How are you? (formal)', ipa: '[miːru ɛlaː unnaːru]' },
    { native: 'దయచేసి', translit: 'Dayachesi', meaning: 'Please', ipa: '[d̪əjətʃeːsi]' },
    { native: 'అవును', translit: 'Avunu', meaning: 'Yes', ipa: '[əʋunu]' },
    { native: 'కాదు / లేదు', translit: 'Kaadu / Ledu', meaning: 'No / Not there', ipa: '[kaːd̪u / leːd̪u]' },
    { native: 'మిత్రుడు / స్నేహితుడు', translit: 'Mitrudu / Snehithudu', meaning: 'Friend', ipa: '[mit̪ruɖu]' },
    { native: 'నీళ్ళు / జలం', translit: 'Neellu / Jalam', meaning: 'Water', ipa: '[niːɭːu]' },
    { native: 'అన్నం', translit: 'Annam', meaning: 'Cooked rice / Food', ipa: '[ənnəm]' },
    { native: 'ఇల్లు', translit: 'Illu', meaning: 'House / Home', ipa: '[illu]' },
    { native: 'ప్రేమ', translit: 'Prema', meaning: 'Love', ipa: '[preːmə]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('telugu-greeting-audio-btn');
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
  function playAudioTone(freq = 520, duration = 0.3) {
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
    utterance.lang = 'te-IN';

    // Locate best available Telugu / South-Asian voice
    const teVoice = voices.find(v => v.lang === 'te-IN' || v.lang.startsWith('te')) ||
                    voices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('kn') || v.lang.startsWith('ta'));
    if (teVoice) {
      utterance.voice = teVoice;
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
        playAudioTone(500, 0.35);
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
      speakText('నమస్కారం', greetingBtn, 'Namaskaram');
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

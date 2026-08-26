/**
 * Assamese Language Explorer Interactive Engine
 * Handles Speech Synthesis audio pronunciation, Web Audio synthesis fallback, and Vocabulary Grid.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { native: 'ধন্যবাদ', translit: 'Dhonyobad', meaning: 'Thank you', ipa: '[dʱɔnːɔbad]' },
    { native: 'আপোনাৰ খবৰ কি?', translit: 'Apunar khobor ki?', meaning: 'How are you?', ipa: '[aponaɹ kʰɔbɔɹ ki]' },
    { native: 'হয়', translit: 'Hoy', meaning: 'Yes', ipa: '[hɔe̯]' },
    { native: 'নহয়', translit: 'Nohoy', meaning: 'No', ipa: '[nɔhɔe̯]' },
    { native: 'পানী', translit: 'Paani', meaning: 'Water', ipa: '[pani]' },
    { native: 'ভাত', translit: 'Bhaat', meaning: 'Rice / Food', ipa: '[bʱat]' },
    { native: 'ঘৰ', translit: 'Ghor', meaning: 'House / Home', ipa: '[ɡʱɔɹ]' },
    { native: 'মৰম', translit: 'Morom', meaning: 'Love / Affection', ipa: '[mɔɹɔm]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('assamese-greeting-audio-btn');
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

  // Web Audio Fallback for pitch tone
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
    utterance.lang = 'as-IN';

    // Locate best available Assamese/Bengali/Regional voice
    const asVoice = voices.find(v => v.lang.startsWith('as') || v.lang === 'as_IN') ||
                    voices.find(v => v.lang.startsWith('bn') || v.lang.startsWith('en-IN') || v.lang.startsWith('hi'));
    if (asVoice) {
      utterance.voice = asVoice;
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
      speakText('নমস্কাৰ', greetingBtn, 'Namaskar');
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

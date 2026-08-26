/**
 * Maithili Language Explorer Interactive Engine
 * Handles Devanagari/Tirhuta representation, Speech Synthesis audio pronunciation,
 * Web Audio harmonic fallback, and dynamic vocabulary cards.
 */

document.addEventListener('DOMContentLoaded', () => {
  const vocabularyData = [
    { devanagari: 'धन्यवाद / नीक लागल', tirhuta: '𑒡𑒢𑓂𑒨𑒫𑒰𑒠', translit: 'Dhanyavaad / Neek Lagal', meaning: 'Thank you / Felt good', ipa: '[d̪ʱənjəʋaːd̪]' },
    { devanagari: 'अहाँ केहन छी?', tirhuta: '𑒁𑒯𑒰𑒁 𑒏𑒹𑒯𑒢 𑒕𑒲?', translit: 'Ahan kehan chhi?', meaning: 'How are you? (Formal/Respectful)', ipa: '[əɦãː keːɦən cʰiː]' },
    { devanagari: 'हम ठीक छी', tirhuta: '𑒯𑒧 𑒚𑒲𑒏 𑒕𑒲', translit: 'Ham theek chhi', meaning: 'I am fine', ipa: '[ɦəm tʰiːk cʰiː]' },
    { devanagari: 'हँ', tirhuta: '𑒯𑒁𑒿', translit: 'Han', meaning: 'Yes', ipa: '[ɦə̃]' },
    { devanagari: 'नहि', tirhuta: '𑒢𑒯𑒱', translit: 'Nahi', meaning: 'No', ipa: '[nəɦiː]' },
    { devanagari: 'पानि / जल', tirhuta: '𑒣𑒰𑒢𑒱', translit: 'Paani / Jal', meaning: 'Water', ipa: '[paːniː]' },
    { devanagari: 'भोजन / भात', tirhuta: '𑒦𑒼𑒖𑒢 / 𑒦𑒰𑒞', translit: 'Bhojan / Bhaat', meaning: 'Food / Rice / Meal', ipa: '[bʱoːdʒən]' },
    { devanagari: 'घर / डेरा', tirhuta: '𑒒𑒩', translit: 'Ghar / Dera', meaning: 'Home / Residence', ipa: '[ɡʱəɾᵊ]' },
    { devanagari: 'नेह / प्रीति', tirhuta: '𑒢𑒹𑒯', translit: 'Neh / Preeti', meaning: 'Love / Affection', ipa: '[neːɦᵊ]' },
    { devanagari: 'शुभ प्रभात', tirhuta: '𑒬𑒳𑒦 𑒣𑓂𑒩𑒦𑒰𑒞', translit: 'Shubh Prabhaat', meaning: 'Good morning', ipa: '[ʃʊbʱᵊ pɾəbʱaːt̪]' }
  ];

  const vocabGrid = document.getElementById('vocab-grid');
  const greetingBtn = document.getElementById('maithili-greeting-audio-btn');
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
  function playAudioTone(freq = 480, duration = 0.35) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
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
  function speakText(text, btnElement, fallbackPitch = 480) {
    if (!('speechSynthesis' in window)) {
      playAudioTone(fallbackPitch, 0.4);
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
    utterance.lang = 'hi-IN'; // Closest native phonetic match in standard Web Speech API

    // Locate best available Hindi/Bihari/Indian voice
    const inVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('mai') || v.lang === 'hi_IN' || v.lang.includes('India'));
    if (inVoice) {
      utterance.voice = inVoice;
    }

    utterance.rate = 0.88;
    window.currentUtterance = utterance;

    utterance.onstart = () => {
      activePlayingBtn = btnElement;
      btnElement.classList.add('playing');
      const textSpan = btnElement.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Playing...';
      else btnElement.textContent = '⏸';
    };

    utterance.onend = () => {
      resetButtonState(btnElement);
    };

    utterance.onerror = () => {
      resetButtonState(btnElement);
      playAudioTone(fallbackPitch, 0.4);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      playAudioTone(fallbackPitch, 0.4);
      resetButtonState(btnElement);
    }
  }

  function resetButtonState(btnElement) {
    if (!btnElement) return;
    btnElement.classList.remove('playing');
    const textSpan = btnElement.querySelector('.btn-text');
    if (textSpan) textSpan.textContent = 'Listen Pronunciation';
    else if (btnElement.classList.contains('vocab-audio-btn')) btnElement.textContent = '🔊';
    activePlayingBtn = null;
  }

  // Bind Greeting Audio Button
  if (greetingBtn) {
    greetingBtn.addEventListener('click', () => {
      speakText('प्रणाम, गोड़ लागै छी', greetingBtn, 520);
    });
  }

  // Render Vocabulary Cards
  if (vocabGrid) {
    vocabGrid.innerHTML = '';
    vocabularyData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.innerHTML = `
        <div class="vocab-top">
          <div class="vocab-devanagari">${item.devanagari}</div>
          <div class="vocab-tirhuta">${item.tirhuta}</div>
          <div class="vocab-translit">${item.translit}</div>
          <div class="vocab-meaning">${item.meaning}</div>
        </div>
        <div class="vocab-bottom">
          <span class="vocab-ipa">${item.ipa}</span>
          <button class="vocab-audio-btn" aria-label="Listen pronunciation of ${item.translit}" data-index="${index}">
            🔊
          </button>
        </div>
      `;

      const audioBtn = card.querySelector('.vocab-audio-btn');
      audioBtn.addEventListener('click', () => {
        speakText(item.devanagari, audioBtn, 440 + index * 20);
      });

      vocabGrid.appendChild(card);
    });
  }
});

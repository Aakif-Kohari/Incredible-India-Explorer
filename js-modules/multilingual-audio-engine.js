/**
 * js-modules/multilingual-audio-engine.js
 * Sitewide Multilingual Audio Pronunciation & Voice Guide Engine
 * Supports Indian English, Hindi, Tamil, Bengali, Marathi, Telugu voice profiles with Web Audio fallback.
 */

(function (global) {
  'use strict';

  class MultilingualAudioEngine {
    constructor(options = {}) {
      this.synth = options.speechSynth || (typeof window !== 'undefined' ? window.speechSynthesis : null);
      this.voices = [];
      this.currentLang = options.lang || 'en-IN';
      this.playbackRate = 1.0;
      this.isPlaying = false;

      // Cultural Pronunciation Index with IPA / Phonetic Transliterations & Scripts
      this.pronunciationDictionary = {
        'Mekhela Chador': { phonetic: 'Meh-kheh-la Cha-dor', script: 'মেখেলা চাদৰ', lang: 'as-IN' },
        'Pithla Bhakri': { phonetic: 'Pith-la Bhak-ri', script: 'पिठला भाकरी', lang: 'mr-IN' },
        'Axone': { phonetic: 'Ah-khoo-nee', script: 'Axone', lang: 'nag-IN' },
        'Shad Suk Mynsiem': { phonetic: 'Shahd Sook Min-seem', script: 'Shad Suk Mynsiem', lang: 'kha-IN' },
        'Thukpa': { phonetic: 'Thook-pah', script: 'थुकपा', lang: 'hi-IN' },
        'Kanchipuram': { phonetic: 'Kahn-chi-poo-ram', script: 'காஞ்சிபுரம்', lang: 'ta-IN' },
        'Taj Mahal': { phonetic: 'Taaj Muh-hahl', script: 'ताज महल', lang: 'hi-IN' },
        'Charminar': { phonetic: 'Chaar-mi-naar', script: 'चारमीनार', lang: 'hi-IN' }
      };

      this.initVoices();
    }

    initVoices() {
      if (this.synth && typeof this.synth.addEventListener === 'function') {
        this.synth.addEventListener('voiceschanged', () => {
          this.voices = this.synth.getVoices();
        });
      }
    }

    getPronunciation(term) {
      if (!term) return { phonetic: '', script: '', lang: 'en-IN' };
      return this.pronunciationDictionary[term] || { phonetic: term, script: term, lang: 'en-IN' };
    }

    speak(term) {
      const info = this.getPronunciation(term);
      const textToSpeak = info.phonetic || term;

      if (!this.synth) {
        // Fall back to Web Audio Beep / Pitch Synthesizer simulator if TTS is missing
        this.playWebAudioFallback();
        return false;
      }

      this.synth.cancel();
      const utterance = new (global.SpeechSynthesisUtterance || window.SpeechSynthesisUtterance)(textToSpeak);
      utterance.rate = this.playbackRate;
      utterance.lang = info.lang || this.currentLang;

      utterance.onstart = () => { this.isPlaying = true; };
      utterance.onend = () => { this.isPlaying = false; };
      utterance.onerror = () => {
        this.isPlaying = false;
        this.playWebAudioFallback();
      };

      this.synth.speak(utterance);
      return true;
    }

    playWebAudioFallback() {
      if (typeof window === 'undefined' || !window.AudioContext) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {
        // Silent catch for audio context limitations
      }
    }

    // Auto-decorate card headers & regional tags across explorer modules
    attachAudioButtons(container = document) {
      const targets = container.querySelectorAll('.cultural-term, .card-title, [data-audio-term]');
      targets.forEach(el => {
        if (el.querySelector('.audio-btn-icon')) return; // Avoid duplication

        const term = el.getAttribute('data-audio-term') || el.innerText.trim();
        const btn = document.createElement('button');
        btn.className = 'audio-btn-icon';
        btn.setAttribute('aria-label', `Listen to regional pronunciation of ${term}`);
        btn.setAttribute('title', `Listen pronunciation: ${term}`);
        btn.innerHTML = ' 🔊';
        btn.style.cursor = 'pointer';
        btn.style.background = 'none';
        btn.style.border = 'none';
        btn.style.fontSize = '1rem';

        const triggerSpeech = (e) => {
          e.stopPropagation();
          this.speak(term);
        };

        btn.addEventListener('click', triggerSpeech);
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerSpeech(e);
          }
        });

        el.appendChild(btn);
      });
    }
  }

  global.MultilingualAudioEngine = MultilingualAudioEngine;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MultilingualAudioEngine };
  }
})(typeof window !== 'undefined' ? window : globalThis);

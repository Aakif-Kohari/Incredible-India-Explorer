/**
 * chatbot-voice.test.js
 * Unit tests for Bharat AI Guide voice input and multilingual speech recognition.
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Bharat AI Guide Voice Input & Multilingual Support', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="fab-guide" id="fab-guide"></button>
      <div class="guide-chat-window" id="guide-chat-window">
        <button id="btn-close-chat"></button>
        <div id="chat-messages"></div>
        <div class="chat-input-area">
          <select id="chat-lang-select" class="chat-lang-select">
            <option value="en-IN">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="ta-IN">Tamil</option>
            <option value="bn-IN">Bengali</option>
            <option value="mr-IN">Marathi</option>
            <option value="te-IN">Telugu</option>
          </select>
          <input type="text" id="chat-input" placeholder="Type or speak...">
          <button id="btn-mic" class="btn-mic">🎤</button>
          <button id="btn-send-msg" class="btn-send">➤</button>
        </div>
      </div>
    `;
    delete window.SpeechRecognition;
    delete window.webkitSpeechRecognition;
  });

  it('contains regional language options in language selector dropdown', () => {
    const langSelect = document.getElementById('chat-lang-select');
    expect(langSelect).not.toBeNull();
    const options = Array.from(langSelect.options).map(opt => opt.value);
    expect(options).toEqual(['en-IN', 'hi-IN', 'ta-IN', 'bn-IN', 'mr-IN', 'te-IN']);
  });

  it('displays fallback message when Web Speech API is not supported', async () => {
    const { initBharatGuide } = await import('../../frontend/js-modules/initBharatGuide.js');
    initBharatGuide();

    const btnMic = document.getElementById('btn-mic');
    btnMic.click();

    const chatMessages = document.getElementById('chat-messages');
    expect(chatMessages.textContent).toContain('Voice recognition is not supported in your browser');
  });

  it('starts recognition with selected language when Web Speech API is available', async () => {
    let started = false;
    let selectedLang = '';

    class MockSpeechRecognition {
      constructor() {
        this.lang = 'en-IN';
      }
      start() {
        started = true;
        selectedLang = this.lang;
        if (typeof this.onstart === 'function') this.onstart();
      }
      stop() {
        started = false;
        if (typeof this.onend === 'function') this.onend();
      }
    }

    window.SpeechRecognition = MockSpeechRecognition;

    const { initBharatGuide } = await import('../../frontend/js-modules/initBharatGuide.js');
    initBharatGuide();

    const langSelect = document.getElementById('chat-lang-select');
    langSelect.value = 'hi-IN';

    const btnMic = document.getElementById('btn-mic');
    btnMic.click();

    expect(started).toBe(true);
    expect(selectedLang).toBe('hi-IN');
    expect(btnMic.classList.contains('listening')).toBe(true);
  });
});

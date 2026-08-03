/* Issue #1027 — Voice Assistant widget.
 *
 * Mounts defensively into the EXISTING chat window DOM (#guide-chat-window,
 * #chat-messages, #chat-input) that app.js / initBharatGuide.js already
 * render — the same "find the element, do nothing if absent" convention
 * used by js-modules/language-switcher.js (#771). This file does not
 * modify app.js or initBharatGuide.js; it only adds a mic button and a
 * language <select> next to the existing send button, and appends
 * messages to the same #chat-messages list using the same `.message` /
 * `.message-content` classes the existing chatbot uses, so voice turns
 * look identical to typed ones.
 */

import { SpeechRecognitionAdapter } from './speech-recognition-adapter.js';
import { SpeechSynthesisAdapter } from './speech-synthesis-adapter.js';
import { VoiceAssistantController } from './voice-assistant-controller.js';
import { VOICE_LANGUAGES } from './intent-parser.js';

const BCP47_BY_CODE = {
  en: 'en-US', hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN',
  mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', ur: 'ur-IN',
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function init() {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSendMsg = document.getElementById('btn-send-msg');
  if (!chatMessages || !chatInput || !btnSendMsg || !btnSendMsg.parentElement) return; // chat widget isn't on this page

  if (btnSendMsg.dataset.voiceWired === 'true') return; // idempotency guard, same pattern as initBharatGuide.js
  btnSendMsg.dataset.voiceWired = 'true';

  // --- Build mic button + language select ---
  const micBtn = document.createElement('button');
  micBtn.type = 'button';
  micBtn.className = 'voice-mic-btn';
  micBtn.setAttribute('aria-label', 'Speak your question');
  micBtn.textContent = '🎤';

  const langSelect = document.createElement('select');
  langSelect.className = 'voice-lang-select';
  langSelect.setAttribute('aria-label', 'Voice assistant language');
  Object.entries(VOICE_LANGUAGES).forEach(([name, code]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    langSelect.appendChild(opt);
  });

  if (!SpeechRecognitionAdapter.isSupported()) {
    micBtn.disabled = true;
    micBtn.title = 'Voice input is not supported in this browser.';
  }

  btnSendMsg.parentElement.insertBefore(langSelect, btnSendMsg);
  btnSendMsg.parentElement.insertBefore(micBtn, btnSendMsg);

  // --- Wire adapters + controller ---
  const recognition = new SpeechRecognitionAdapter({ lang: BCP47_BY_CODE.en });
  const synthesis = new SpeechSynthesisAdapter();

  // Reuses the app's existing global Q&A engine and router — see
  // docs/VOICE_ASSISTANT.md for exactly what each of these depends on.
  const controller = new VoiceAssistantController({
    answerQuestion: (text) =>
      typeof window.findBestResponse === 'function'
        ? window.findBestResponse(text, window.location.pathname)
        : "I'm not sure how to help with that yet.",
    navigate: (path) => {
      if (window.appRouter && typeof window.appRouter.handleRoute === 'function') {
        window.appRouter.handleRoute(path);
      }
    },
    bookmark: (entityName) => {
      // Thin, additive hook — does not modify Journey itself. If Journey
      // isn't present (page doesn't have it wired), this silently no-ops.
      if (entityName && window.Journey && typeof window.Journey.saveToJourney === 'function') {
        window.Journey.saveToJourney({ id: entityName.toLowerCase().replace(/\s+/g, '-'), title: entityName });
      }
    },
    search: (query) => {
      if (window.Journey && typeof window.Journey.search === 'function') {
        window.Journey.search(query);
      }
    },
    switchLanguage: (code) => {
      recognition.setLanguage(BCP47_BY_CODE[code] || 'en-US');
      langSelect.value = code;
      // If the #771 i18n engine is present on this page, switch the whole
      // UI's language too, not just the voice assistant's.
      if (window.I18n && typeof window.I18n.setLanguage === 'function') {
        window.I18n.setLanguage(code);
      }
    },
    knownEntities: (window.mapData && window.mapData.locations) || [],
  });

  function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    const content = escapeHTML(text);
    msgDiv.innerHTML = `<div class="message-content">${content}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleFinalTranscript(transcript) {
    appendMessage(transcript, 'user-message');
    const { responseText } = controller.handleTranscript(transcript, { viaVoice: true });
    appendMessage(responseText, 'bot-message');
    synthesis.speak(responseText, { lang: langSelect.value ? BCP47_BY_CODE[langSelect.value] : 'en-US' });
  }

  recognition.onResult(({ transcript, isFinal }) => {
    chatInput.value = transcript; // live preview, mirrors typing
    if (isFinal) {
      chatInput.value = '';
      handleFinalTranscript(transcript);
    }
  });
  recognition.onError(({ message }) => {
    micBtn.classList.remove('voice-mic-btn--listening');
    appendMessage(`🎤 ${message}`, 'bot-message');
  });
  recognition.onEnd(() => micBtn.classList.remove('voice-mic-btn--listening'));

  langSelect.addEventListener('change', () => {
    recognition.setLanguage(BCP47_BY_CODE[langSelect.value] || 'en-US');
  });

  micBtn.addEventListener('click', () => {
    if (recognition.listening) {
      recognition.stop();
      micBtn.classList.remove('voice-mic-btn--listening');
    } else {
      recognition.start();
      micBtn.classList.add('voice-mic-btn--listening');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-run when the chat window is (re)rendered by the SPA router, same
// event initBharatGuide.js/#864's dashboard rely on.
if (typeof window !== 'undefined' && window.AppEventBus) {
  window.AppEventBus.on('page:changed', () => init());
}

/**
 * voice-assistant-controller.js
 * Issue #1027 — AI-Powered Voice Travel Assistant.
 *
 * The orchestration layer: takes a transcript (from voice or typed text),
 * resolves pronoun references against ConversationContext, parses intent,
 * and either dispatches an action (navigate/bookmark/search/plan
 * itinerary/switch language) via injected callbacks, or falls through to
 * the existing Q&A engine for open-ended conversation. Records every turn
 * to VoiceConversationHistory and updates context so follow-ups work.
 *
 * All side effects (navigation, bookmarking, calling the existing Q&A
 * engine, speaking a response) are injected dependencies rather than
 * direct DOM/global calls — this is what makes the controller unit
 * testable without a browser, and is a deliberate choice not to monkey-
 * patch the shipped chatbot in app.js / initBharatGuide.js. See
 * docs/VOICE_ASSISTANT.md for how the widget wires real implementations.
 */

import { INTENTS, parseIntent, NAVIGATION_ROUTES } from './intent-parser.js';
import { ConversationContext } from './conversation-context.js';
import { VoiceConversationHistory } from './voice-conversation-history.js';

function defaultEntityExtractor(text, knownEntities) {
  if (!text || !knownEntities || !knownEntities.length) return null;
  const lower = text.toLowerCase();
  const match = knownEntities.find((e) => e.name && lower.includes(e.name.toLowerCase()));
  return match ? { name: match.name, type: match.type || 'destination' } : null;
}

export class VoiceAssistantController {
  /**
   * @param {object} deps
   * @param {(text:string)=>string} deps.answerQuestion existing Q&A engine, e.g. window.findBestResponse
   * @param {(path:string)=>void} [deps.navigate] e.g. window.appRouter.handleRoute
   * @param {(entityName:string|null)=>void} [deps.bookmark] e.g. hook into Journey.saveToJourney
   * @param {(query:string)=>void} [deps.search] e.g. hook into the search index
   * @param {(destination:string|null, days:number|null)=>string} [deps.planItinerary] returns a confirmation string
   * @param {(languageCode:string)=>void} [deps.switchLanguage] e.g. I18nEngine#setLanguage or a TTS language change
   * @param {Array<{name:string,type?:string}>} [deps.knownEntities] used to extract "what was just discussed" from Q&A turns, e.g. mapData.locations
   * @param {ConversationContext} [deps.context]
   * @param {VoiceConversationHistory} [deps.history]
   */
  constructor(deps) {
    this.answerQuestion = deps.answerQuestion;
    this.navigate = deps.navigate || (() => {});
    this.bookmark = deps.bookmark || (() => {});
    this.search = deps.search || (() => {});
    this.planItinerary = deps.planItinerary || ((destination) => `Noted — I'll help you plan a trip${destination ? ` to ${destination}` : ''} once the trip planner is open.`);
    this.switchLanguage = deps.switchLanguage || (() => {});
    this.knownEntities = deps.knownEntities || [];
    this.extractEntity = deps.extractEntity || defaultEntityExtractor;

    this.context = deps.context || new ConversationContext();
    this.history = deps.history || new VoiceConversationHistory();
  }

  /**
   * @param {string} rawTranscript
   * @param {object} [meta]
   * @param {boolean} [meta.viaVoice]
   * @returns {{intent:string, responseText:string, navigatedTo?:string}}
   */
  handleTranscript(rawTranscript, meta = {}) {
    const viaVoice = Boolean(meta.viaVoice);
    const resolvedText = this.context.resolveReferences(rawTranscript);
    const { intent, slots } = parseIntent(resolvedText, rawTranscript);

    this.history.append({ speaker: 'user', text: rawTranscript, intent, viaVoice });

    let responseText;
    let navigatedTo;
    let entity = null;

    switch (intent) {
      case INTENTS.NAVIGATE: {
        const path = slots.target ? slots.target.path : NAVIGATION_ROUTES.home;
        this.navigate(path);
        navigatedTo = path;
        responseText = `Sure, taking you to ${slots.target ? slots.target.key : 'the home page'}.`;
        break;
      }

      case INTENTS.BOOKMARK: {
        const target = this.context.getLastEntity();
        this.bookmark(target ? target.name : null);
        responseText = target
          ? `Saved ${target.name} to your journey.`
          : `I'll bookmark that, but I'm not sure which place you mean yet — try mentioning a destination first.`;
        entity = target;
        break;
      }

      case INTENTS.SEARCH: {
        this.search(slots.query);
        responseText = `Here's what I found for "${slots.query}".`;
        entity = { name: slots.query, type: 'search-query' };
        break;
      }

      case INTENTS.ITINERARY: {
        const destination = slots.destination || (this.context.getLastEntity() || {}).name || null;
        responseText = this.planItinerary(destination, slots.days);
        if (destination) entity = { name: destination, type: 'destination' };
        break;
      }

      case INTENTS.LANGUAGE_SWITCH: {
        if (slots.language) {
          this.switchLanguage(slots.language.code);
          responseText = `Switched to ${slots.language.name}.`;
        } else {
          responseText = `Sorry, I didn't catch which language you'd like to switch to.`;
        }
        break;
      }

      case INTENTS.QA_FALLBACK:
      default: {
        responseText = this.answerQuestion ? this.answerQuestion(resolvedText) : "I'm not sure how to help with that yet.";
        entity = this.extractEntity(resolvedText, this.knownEntities) || this.extractEntity(responseText, this.knownEntities);
        break;
      }
    }

    this.context.remember({ speaker: 'user', text: rawTranscript, intent, entity });
    this.history.append({ speaker: 'assistant', text: responseText, intent, viaVoice: false });

    return { intent, responseText, navigatedTo, entity };
  }

  resetConversation() {
    this.context.reset();
    this.history.clear();
  }
}

export default VoiceAssistantController;

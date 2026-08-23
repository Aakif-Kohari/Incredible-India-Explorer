# AI-Powered Voice Travel Assistant with Multilingual Conversational Support

Resolves #1027.

Adds voice input/output and lightweight command understanding on top of
the site's existing **Bharat AI** chatbot (`chatbot-data.js` +
`initBharatGuide()` in `app.js`), rather than building a second, competing
assistant. That chatbot already does keyword-based Q&A with per-page
context (`contextualData`) and even has a `speakResponse()` stub that
calls the browser's speech synthesis — but hardcoded to the default
(effectively English) voice, with no speech *input* at all, and no memory
between turns. This PR fills in exactly those three gaps.

## Why extend Bharat AI instead of replacing it

`findBestResponse()` in `chatbot-data.js` is a solid, fast, offline
keyword-matching Q&A engine with real content (monuments, food, festivals,
wildlife, history) and page-aware context switching. Voice input is a new
*modality* for reaching that same engine, not a reason to rewrite it. The
only genuinely new capability this PR adds on the conversational side is
**actionable commands** (navigate, bookmark, search, plan a trip, switch
language) — the existing engine only ever returns an answer string, it
never *does* anything, so a small intent layer sits in front of it to
catch those cases and falls through to `findBestResponse()` for everything
else (which is most voice input — most travelers will just ask questions).

## Files added

| File | Purpose |
| ---- | ------- |
| `js-modules/voice/speech-recognition-adapter.js` | Wraps `SpeechRecognition`/`webkitSpeechRecognition`: feature detection, language switching, start/stop, a simple `onResult`/`onError`/`onEnd` callback API. Constructor is injectable for testing. |
| `js-modules/voice/speech-synthesis-adapter.js` | Multilingual replacement for the existing `speakResponse()`: picks the best-matching installed voice for a BCP-47 language tag instead of always using the default (English) voice. |
| `js-modules/voice/intent-parser.js` | Pure, offline, rule-based NLU: NAVIGATE / BOOKMARK / SEARCH / ITINERARY / LANGUAGE_SWITCH / QA_FALLBACK. This is the part of the feature that genuinely works with no network and no AI call. |
| `js-modules/voice/conversation-context.js` | Short-term memory: last-mentioned destination + bounded turn history, so "plan a trip **there**" resolves to whatever place was last discussed. |
| `js-modules/voice/voice-conversation-history.js` | Persists a bounded (200-turn) conversation log across reloads — the "Conversation history" acceptance criterion. Same storage-injectable convention as `InteractionTracker` (#864). |
| `js-modules/voice/voice-assistant-controller.js` | Orchestrator: resolves references, parses intent, dispatches an injected action callback or falls through to the existing Q&A engine, records history/context. All side effects are injected dependencies — nothing here calls the DOM or a global directly, which is what makes it unit-testable and is why it doesn't need to monkey-patch `app.js`. |
| `js-modules/voice/voice-assistant-widget.js` + `.css` | The only file that touches the DOM: mounts a mic button and language `<select>` into the *existing* `#guide-chat-window` chat UI, wires the adapters + controller to it, and appends messages using the exact same `.message`/`.message-content` markup `app.js` already uses — voice turns look identical to typed ones. |
| `tests/unit/*.test.js` (6 files) | 36 Vitest cases covering intent parsing, reference resolution, history persistence, controller action-dispatch, and both adapters (with injected fakes standing in for the real Speech APIs, which jsdom doesn't implement). |

All 36 tests pass locally via `npm run test:unit`.

## How a voice turn flows

```
🎤 mic button click
   │
   ▼
SpeechRecognitionAdapter (STT)
   │  final transcript
   ▼
VoiceAssistantController.handleTranscript(transcript)
   │
   ├─ ConversationContext.resolveReferences()   // "there" -> "Kerala"
   ├─ parseIntent(resolved, raw)                // NAVIGATE | BOOKMARK | SEARCH | ITINERARY | LANGUAGE_SWITCH | QA_FALLBACK
   │
   ├─ actionable intent  → injected callback (navigate/bookmark/search/switchLanguage)
   └─ QA_FALLBACK        → window.findBestResponse(text)   // existing Bharat AI engine
   │
   ├─ ConversationContext.remember()            // updates last-mentioned entity
   ├─ VoiceConversationHistory.append()          // persists both turns
   ▼
appendMessage() into #chat-messages  +  SpeechSynthesisAdapter.speak(response)
```

## Integration points (what to add where)

Same philosophy as the #771 and #864 PRs: **no existing shipped file is
modified.** `voice-assistant-widget.js` is additive — include it once:

```html
<link rel="stylesheet" href="js-modules/voice/voice-assistant-widget.css">
<script type="module" src="js-modules/voice/voice-assistant-widget.js"></script>
```

It finds the chat window's existing DOM elements (`#chat-messages`,
`#chat-input`, `#btn-send-msg`) — the same ones `initBharatGuide()` already
renders — and does nothing if they're absent (defensive mounting, same
convention as `js-modules/language-switcher.js`). It optionally wires
itself to two other features *if present on the page*, without requiring
either:

- **`window.Journey`** (bookmarks) — if `Journey.saveToJourney`/`.search`
  exist, voice bookmark/search commands call them. If Journey isn't
  loaded, those commands simply no-op with an honest spoken response.
- **`window.I18n`** (#771's i18n engine) — if present, a voice "switch to
  Hindi" command also switches the whole page's UI language via
  `I18n.setLanguage()`, not just the assistant's recognition/synthesis
  language. If #771 hasn't merged yet, voice language switching still
  works for the assistant itself.

## Acceptance criteria mapping

- **"Users can interact with the application entirely through voice"** —
  mic button drives the same `sendMessage`-equivalent flow as typing, plus
  NAVIGATE/BOOKMARK/SEARCH/ITINERARY commands the typed chat doesn't have.
- **"Voice commands accurately identify supported destinations and travel
  queries"** — `intent-parser.js`'s 8 unit tests cover each intent type;
  entity extraction reuses `mapData.locations` (the real state/UT dataset)
  rather than a separate hand-maintained list.
- **"Maintains conversational context across multiple interactions"** —
  `ConversationContext` + the "resolves 'there'/'it' to last entity"
  controller tests demonstrate this directly.
- **"Users can switch languages during a conversation"** — `LANGUAGE_SWITCH`
  intent + `SpeechRecognitionAdapter.setLanguage()` +
  `SpeechSynthesisAdapter.findVoiceForLanguage()`, tested independently.
- **"Voice responses generated within acceptable response times"** — the
  intent parser and context resolution are synchronous, in-memory, O(1)-ish
  operations; the only latency is the existing `findBestResponse()` call
  (already fast/offline) or the browser's own STT/TTS engines, which this
  PR doesn't add latency on top of.
- **"Comprehensive unit and integration tests"** — 36 Vitest cases, listed
  above.
- **Documentation** — this file.

## Scope and trade-offs (read before extending)

- **Offline support**: the *intent parsing and command dispatch* are fully
  offline (no network, no AI call) — this satisfies "Offline voice command
  support for basic operations" for navigation/bookmark/search/itinerary
  commands. Speech recognition **itself** is a browser feature outside
  this codebase's control: Chrome/Edge's implementation is cloud-backed
  (requires network) even though the code calling it is offline-capable;
  there is no standards-track fully-offline `SpeechRecognition` API today.
  This is stated plainly rather than glossed over.
- **Browser support is uneven** — `SpeechRecognitionAdapter.isSupported()`
  and `SpeechSynthesisAdapter.isSupported()` exist specifically so the
  widget can degrade gracefully (mic button disabled with an explanatory
  tooltip) on Firefox and other browsers without `SpeechRecognition`.
- **"Large Language Model integration" / "Backend conversational APIs"**
  — not included in this PR. The existing keyword-based `findBestResponse`
  handles the large majority of FAQ-style travel questions correctly and
  for free; routing every voice query through a paid LLM API by default
  would add cost and latency for little benefit on-topic. If genuinely
  open-ended conversation becomes a priority, the natural extension point
  is `VoiceAssistantController`'s `answerQuestion` dependency — swap it (or
  chain it: try `findBestResponse` first, fall back to an
  `api/voice-assistant.js` serverless function mirroring `api/translate.js`
  from #771) without touching the parsing/context/history layers.
- **"Response caching for frequently asked questions"** — `findBestResponse`
  is already a synchronous, in-memory lookup with no network round-trip,
  so there's nothing to cache yet. This becomes relevant once/if an LLM
  backend is added per the point above.
- **Multilingual TTS coverage** — depends on which voices the visitor's OS
  has installed; `findVoiceForLanguage()` falls back to the browser's
  default voice (rather than erroring) when no matching voice exists for a
  requested language.

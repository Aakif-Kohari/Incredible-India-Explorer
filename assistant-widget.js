(function () {
  const root = document.getElementById("travel-assistant");
  if (!root) return;

  root.innerHTML = `
    <div class="ta-widget">
      <div class="ta-header">Travel Assistant</div>
      <div class="ta-messages" id="ta-messages"></div>
      <form id="ta-form" class="ta-form">
        <input id="ta-input" type="text" placeholder="Ask about places, food, or plans..." autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    </div>`;

  const messagesEl = document.getElementById("ta-messages");
  const formEl = document.getElementById("ta-form");
  const inputEl = document.getElementById("ta-input");

  function appendMessage(role, text) {
    const div = document.createElement("div");
    div.className = `ta-msg ta-msg-${role}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Replay prior history on load so a page refresh doesn't lose context
  const session = ContextManager.getSession();
  session.history.forEach((h) => appendMessage(h.role, h.text));
  if (!session.history.length) {
    appendMessage("assistant", "Hi! Ask me about places to visit, food, or what to do if it rains.");
  }

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = inputEl.value.trim();
    if (!message) return;
    inputEl.value = "";

    appendMessage("user", message);
    ContextManager.addMessage("user", message);

    const { reply, suggestions } = getAssistantReply(message, ContextManager.getSession());
    appendMessage("assistant", reply);
    ContextManager.addMessage("assistant", reply);
    ContextManager.setLastRecommendations(suggestions.map((s) => s.id));
  });
})();
function buildReply(intent, results) {
  if (intent.type === "greeting") {
    return "Hi! Ask me things like 'what can I visit near my hotel' or 'suggest budget-friendly places in Jaipur'.";
  }

  if (!results.length) {
    return "I couldn't find a match for that yet — try naming a city, e.g. 'places to visit in Agra'.";
  }

  const lines = results.map((d) => `• ${d.name} — ${d.description} (~₹${d.avgCost})`);
  const intro = intent.weather === "rain"
    ? "Since it's rainy, here are indoor-friendly options:"
    : intent.budgetFriendly
      ? "Here are some budget-friendly picks:"
      : "Here's what I'd suggest:";

  return `${intro}\n${lines.join("\n")}`;
}

function getAssistantReply(message, session) {
  const intent = parseIntent(message);
  const results = intent.type === "greeting" ? [] : recommend({ intent, session });
  const reply = buildReply(intent, results);
  return { reply, suggestions: results, intent };
}
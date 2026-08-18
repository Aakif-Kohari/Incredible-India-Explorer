function parseIntent(message) {
  const text = message.toLowerCase();

  const intent = {
    type: "recommendation",
    near: /near|close to|around|nearby/.test(text),
    budgetFriendly: /budget|cheap|affordable|low.cost/.test(text),
    weather: null,
    city: null,
    tags: []
  };

  if (/rain|rainy|storm/.test(text)) intent.weather = "rain";
  else if (/sunny|clear/.test(text)) intent.weather = "clear";

  if (/food|eat|cuisine|dish|restaurant/.test(text)) intent.tags.push("food");
  if (/tomorrow|next day/.test(text)) intent.timeframe = "tomorrow";
  if (/today/.test(text)) intent.timeframe = "today";

  const cityMatch = text.match(/in ([a-z\s]+?)(\?|$|\.|,)/);
  if (cityMatch) intent.city = cityMatch[1].trim();

  if (/^(hi|hello|hey)\b/.test(text)) intent.type = "greeting";
  if (/tip|advice|suggest.*tip/.test(text)) intent.type = "tip";

  return intent;
}

document.addEventListener("DOMContentLoaded", () => {
  const stops = [{"id": "pataliputra", "name": "Pataliputra", "modern": "Patna region, Bihar", "x": 76, "y": 62, "chapter": "Gangetic starting point", "goods": "Textiles, ideas, administrative knowledge", "fact": "Pataliputra was a major political and commercial centre in the Gangetic plains, connected to long-distance northern routes.", "note": "Presented as an eastern narrative anchor rather than one fixed Silk Road terminus."}, {"id": "varanasi", "name": "Varanasi", "modern": "Uttar Pradesh", "x": 68, "y": 57, "chapter": "Textile and learning hub", "goods": "Fine cloth, craft goods, religious learning", "fact": "Varanasi was an important urban and sacred centre linked with trade, craft traditions, and pilgrimage movement.", "note": "Represents the movement of goods and knowledge through the middle Ganga corridor."}, {"id": "mathura", "name": "Mathura", "modern": "Uttar Pradesh", "x": 49, "y": 45, "chapter": "Cultural exchange node", "goods": "Sculpture, devotional ideas, craft objects", "fact": "Mathura was a major cultural and artistic centre, especially significant for Buddhist, Jain, and Hindu traditions.", "note": "Used here to show how religious and artistic ideas moved with merchants and travellers."}, {"id": "taxila", "name": "Taxila", "modern": "Gandhara region", "x": 31, "y": 28, "chapter": "Northwestern gateway", "goods": "Horses, manuscripts, precious goods, Buddhist learning", "fact": "Taxila stood near routes connecting the Indian subcontinent with Central Asia, making it a key gateway for trade and learning.", "note": "A historically important northwestern route hub across different centuries."}, {"id": "purushapura", "name": "Purushapura", "modern": "Peshawar region", "x": 24, "y": 25, "chapter": "Gandhara crossroads", "goods": "Gandharan art, coins, luxury goods", "fact": "The Gandhara region connected South Asian, Iranian, Hellenistic, and Central Asian cultural worlds.", "note": "Highlights exchange rather than a single rigid path."}, {"id": "ladakh", "name": "Ladakh passes", "modern": "Western Himalaya", "x": 39, "y": 16, "chapter": "High Himalayan corridor", "goods": "Wool, salt, horses, pashmina-linked trade", "fact": "High Himalayan routes such as those through Ladakh helped connect India with Central Asia and the Tarim Basin.", "note": "Route conditions varied by season, power, and political control."}, {"id": "kashgar", "name": "Kashgar", "modern": "Xinjiang region", "x": 12, "y": 12, "chapter": "Central Asian marketplace", "goods": "Silk, horses, jade, carpets, manuscripts", "fact": "Kashgar was one of the great Central Asian caravan crossroads linking routes toward China, Persia, and South Asia.", "note": "Included to show where Indian-connected routes met the wider Silk Roads network."}];
  const routeLine = document.getElementById("route-line");
  const routeLineShadow = document.getElementById("route-line-shadow");
  const pinLayer = document.getElementById("pin-layer");
  const caravan = document.getElementById("caravan");
  const caption = document.getElementById("map-caption");
  const stepsContainer = document.getElementById("story-steps");
  const scrolly = document.getElementById("silk-story");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function createStory() {
    stepsContainer.innerHTML = stops.map((stop, index) => `
      <article class="story-card" data-index="${index}">
        <span>Stop ${index + 1} · ${escapeHtml(stop.chapter)}</span>
        <h2>${escapeHtml(stop.name)}</h2>
        <p><strong>Modern reference:</strong> ${escapeHtml(stop.modern)}</p>
        <p>${escapeHtml(stop.fact)}</p>
        <p>${escapeHtml(stop.note)}</p>
        <div class="goods-chip">Goods & exchange: ${escapeHtml(stop.goods)}</div>
      </article>
    `).join("");
  }

  function createPins() {
    pinLayer.innerHTML = stops.map((stop, index) => `
      <div class="route-pin" data-pin="${index}" style="left:${stop.x}%; top:${stop.y}%">
        ${index + 1}. ${escapeHtml(stop.name)}
      </div>
    `).join("");
  }

  function interpolatePoint(progress) {
    const maxSegment = stops.length - 1;
    const scaled = Math.min(maxSegment, Math.max(0, progress * maxSegment));
    const segment = Math.min(maxSegment - 1, Math.floor(scaled));
    const local = scaled - segment;
    const from = stops[segment];
    const to = stops[segment + 1] || from;

    return {
      x: from.x + ((to.x - from.x) * local),
      y: from.y + ((to.y - from.y) * local),
      activeIndex: Math.round(scaled),
    };
  }

  function visiblePolyline(progress) {
    const point = interpolatePoint(progress);
    const scaled = progress * (stops.length - 1);
    const whole = Math.floor(scaled);
    const visible = stops.slice(0, whole + 1).map((stop) => `${stop.x},${stop.y}`);
    visible.push(`${point.x},${point.y}`);
    return visible.join(" ");
  }

  function updateRoute() {
    const rect = scrolly.getBoundingClientRect();
    const viewport = window.innerHeight;
    const total = rect.height - viewport;
    const raw = total <= 0 ? 0 : (0 - rect.top) / total;
    const progress = Math.min(1, Math.max(0, raw));
    const point = interpolatePoint(progress);
    const polyline = visiblePolyline(progress);

    routeLine.setAttribute("points", polyline);
    routeLineShadow.setAttribute("points", polyline);
    caravan.style.left = `${point.x}%`;
    caravan.style.top = `${point.y}%`;

    document.querySelectorAll(".route-pin").forEach((pin, index) => {
      pin.classList.toggle("visited", index <= point.activeIndex);
      pin.classList.toggle("active", index === point.activeIndex);
    });

    document.querySelectorAll(".story-card").forEach((card, index) => {
      card.classList.toggle("active", index === point.activeIndex);
    });

    const active = stops[point.activeIndex] || stops[0];
    caption.textContent = `${active.name}: ${active.chapter}`;
  }

  function init() {
    createStory();
    createPins();
    caravan.style.left = `${stops[0].x}%`;
    caravan.style.top = `${stops[0].y}%`;
    updateRoute();
  }

  window.addEventListener("scroll", updateRoute, { passive: true });
  window.addEventListener("resize", updateRoute);
  init();

  window.SilkRouteScrollytelling = {
    stops: () => [...stops],
    updateRoute,
  };
});

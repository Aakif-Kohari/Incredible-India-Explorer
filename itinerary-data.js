/**
 * itinerary-data.js
 * ------------------------------------------------------------------
 * Static dataset powering the AI-Powered Personalized Itinerary
 * Generator (see /docs/itinerary-generator.md for architecture).
 *
 * This mirrors the pattern already used by chatbot-data.js in this
 * repo: a plain data file with no build step, loaded via a <script>
 * tag before itinerary-engine.js.
 *
 * Each destination has a list of attractions tagged by `interests`
 * (must match the checkboxes in itinerary.html), a `costTier`
 * (0 = free, 1 = budget, 2 = mid-range, 3 = luxury/premium), rough
 * lat/lng for nearest-neighbour sequencing, opening hours in 24h
 * time, and an average visit duration in minutes.
 * ------------------------------------------------------------------
 */
(function (root) {
  "use strict";

  const DESTINATIONS = [
    {
      id: "delhi",
      name: "Delhi",
      state: "Delhi",
      tagline: "Mughal grandeur meets modern India",
      center: { lat: 28.6139, lng: 77.209 },
      image: "assets/travel_hidden.png",
      attractions: [
        { id: "delhi-red-fort", name: "Red Fort", interests: ["heritage", "culture"], lat: 28.6562, lng: 77.241, visitMinutes: 120, openHour: 9.5, closeHour: 16.5, costTier: 1, description: "17th-century Mughal fortress and UNESCO World Heritage Site." },
        { id: "delhi-qutub-minar", name: "Qutub Minar", interests: ["heritage"], lat: 28.5245, lng: 77.1855, visitMinutes: 90, openHour: 7, closeHour: 17, costTier: 1, description: "Towering 12th-century minaret surrounded by ancient ruins." },
        { id: "delhi-humayun-tomb", name: "Humayun's Tomb", interests: ["heritage", "culture"], lat: 28.5933, lng: 77.2507, visitMinutes: 90, openHour: 6, closeHour: 18, costTier: 1, description: "Garden tomb that inspired the Taj Mahal's design." },
        { id: "delhi-chandni-chowk", name: "Chandni Chowk", interests: ["cuisine", "shopping", "culture"], lat: 28.6506, lng: 77.2303, visitMinutes: 120, openHour: 10, closeHour: 21, costTier: 0, description: "Chaotic, delicious old-city market lanes." },
        { id: "delhi-lotus-temple", name: "Lotus Temple", interests: ["spiritual"], lat: 28.5535, lng: 77.2588, visitMinutes: 60, openHour: 9, closeHour: 17.5, costTier: 0, description: "Lotus-shaped Baha'i House of Worship open to all faiths." },
        { id: "delhi-akshardham", name: "Akshardham Temple", interests: ["spiritual", "culture"], lat: 28.6127, lng: 77.2773, visitMinutes: 150, openHour: 9.5, closeHour: 18.5, costTier: 0, description: "Sprawling modern temple complex with exhibitions and gardens." }
      ]
    },
    {
      id: "agra",
      name: "Agra",
      state: "Uttar Pradesh",
      tagline: "Home of the Taj Mahal",
      center: { lat: 27.1767, lng: 78.0081 },
      image: "assets/travel_hidden.png",
      attractions: [
        { id: "agra-taj-mahal", name: "Taj Mahal", interests: ["heritage", "culture"], lat: 27.1751, lng: 78.0421, visitMinutes: 150, openHour: 6, closeHour: 18.5, costTier: 2, description: "The iconic marble mausoleum, best seen at sunrise." },
        { id: "agra-fort", name: "Agra Fort", interests: ["heritage"], lat: 27.18, lng: 78.0211, visitMinutes: 100, openHour: 6, closeHour: 18, costTier: 1, description: "Red sandstone Mughal fortress on the Yamuna river." },
        { id: "agra-fatehpur-sikri", name: "Fatehpur Sikri", interests: ["heritage", "spiritual"], lat: 27.0937, lng: 77.6607, visitMinutes: 120, openHour: 6, closeHour: 18, costTier: 1, description: "Abandoned Mughal capital city, remarkably intact." },
        { id: "agra-mehtab-bagh", name: "Mehtab Bagh", interests: ["nature", "heritage"], lat: 27.1836, lng: 78.043, visitMinutes: 60, openHour: 6, closeHour: 19, costTier: 0, description: "Garden with the best sunset view of the Taj across the river." }
      ]
    },
    {
      id: "jaipur",
      name: "Jaipur",
      state: "Rajasthan",
      tagline: "The Pink City",
      center: { lat: 26.9124, lng: 75.7873 },
      image: "assets/travel_deserts.png",
      attractions: [
        { id: "jaipur-amber-fort", name: "Amber Fort", interests: ["heritage", "adventure"], lat: 26.9855, lng: 75.8513, visitMinutes: 150, openHour: 8, closeHour: 17.5, costTier: 1, description: "Hilltop fort-palace with elephant rides and mirrored halls." },
        { id: "jaipur-hawa-mahal", name: "Hawa Mahal", interests: ["heritage", "culture"], lat: 26.9239, lng: 75.8267, visitMinutes: 45, openHour: 9, closeHour: 16.5, costTier: 0, description: "Honeycomb 'Palace of Winds' facade in the old city." },
        { id: "jaipur-city-palace", name: "City Palace", interests: ["heritage", "culture"], lat: 26.9258, lng: 75.8237, visitMinutes: 100, openHour: 9.5, closeHour: 17, costTier: 1, description: "Royal residence blending Rajput and Mughal architecture." },
        { id: "jaipur-jal-mahal", name: "Jal Mahal", interests: ["nature", "heritage"], lat: 26.9539, lng: 75.8462, visitMinutes: 30, openHour: 0, closeHour: 24, costTier: 0, description: "Palace floating on Man Sagar Lake, viewed from the shore." },
        { id: "jaipur-johari-bazaar", name: "Johari Bazaar", interests: ["shopping", "cuisine"], lat: 26.9196, lng: 75.8259, visitMinutes: 90, openHour: 10.5, closeHour: 21, costTier: 1, description: "Famed jewellery and textile market." },
        { id: "jaipur-nahargarh", name: "Nahargarh Fort", interests: ["heritage", "nature"], lat: 26.9376, lng: 75.8155, visitMinutes: 90, openHour: 10, closeHour: 17.5, costTier: 0, description: "Ridge-top fort with panoramic sunset views of the city." }
      ]
    },
    {
      id: "goa",
      name: "Goa",
      state: "Goa",
      tagline: "Sun, sand and Portuguese heritage",
      center: { lat: 15.2993, lng: 74.124 },
      image: "assets/travel_beaches.png",
      attractions: [
        { id: "goa-baga", name: "Baga Beach", interests: ["relaxation", "adventure"], lat: 15.5553, lng: 73.7517, visitMinutes: 150, openHour: 0, closeHour: 24, costTier: 1, description: "Lively beach with water sports and beach shacks." },
        { id: "goa-basilica", name: "Basilica of Bom Jesus", interests: ["heritage", "spiritual"], lat: 15.5009, lng: 73.9116, visitMinutes: 60, openHour: 9, closeHour: 18.5, costTier: 0, description: "UNESCO-listed baroque church in Old Goa." },
        { id: "goa-fort-aguada", name: "Fort Aguada", interests: ["heritage", "nature"], lat: 15.4925, lng: 73.7738, visitMinutes: 75, openHour: 9.5, closeHour: 18, costTier: 0, description: "17th-century Portuguese fort overlooking the Arabian Sea." },
        { id: "goa-anjuna-market", name: "Anjuna Flea Market", interests: ["shopping", "culture"], lat: 15.5734, lng: 73.7407, visitMinutes: 120, openHour: 8, closeHour: 20, costTier: 1, description: "Wednesday flea market of textiles, spices and trinkets." },
        { id: "goa-dudhsagar", name: "Dudhsagar Falls", interests: ["nature", "adventure"], lat: 15.3144, lng: 74.3144, visitMinutes: 180, openHour: 8, closeHour: 16, costTier: 2, description: "Four-tiered waterfall reached by jeep safari." }
      ]
    },
    {
      id: "lakshadweep",
      name: "Lakshadweep",
      state: "Lakshadweep",
      tagline: "Pristine coral atolls and turquoise waters",
      center: { lat: 11.1667, lng: 72.5 },
      image: "assets/travel_islands.png",
      attractions: [
        { id: "bangaram-beach", name: "Bangaram Beach", interests: ["relaxation", "marine-life"], lat: 11.1667, lng: 72.5, visitMinutes: 120, openHour: 6, closeHour: 18, costTier: 1, description: "Pristine uninhabited island with golden sands, clear lagoons, and vibrant coral reefs. Part of the Lakshadweep archipelago, ideal for snorkeling, diving, and serene beach walks." },
        { id: "kalpenti-island", name: "Kalpetti Island", interests: ["relaxation", "marine-life"], lat: 11.2, lng: 72.6, visitMinutes: 90, openHour: 6, closeHour: 17, costTier: 1, description: "Secluded island with powder-soft sands and excellent opportunities for kayaking and spotting marine life." },
        { id: "minicoy-island", name: "Minicoy Island", interests: ["culture", "adventure"], lat: 10.245, lng: 73.0157, visitMinutes: 150, openHour: 6, closeHour: 18, costTier: 2, description: "The southernmost island of Lakshadweep featuring traditional Laccadive culture, ancient mosques, and lagoons perfect for water sports." }
      ]
    },
    {
      id: "kerala",
      name: "Kochi & Munnar",
      state: "Kerala",
      tagline: "Backwaters and tea-hills",
      center: { lat: 9.9312, lng: 76.2673 },
      image: "assets/travel_forests.png",
      attractions: [
        { id: "kerala-fort-kochi", name: "Fort Kochi", interests: ["heritage", "culture"], lat: 9.9658, lng: 76.2422, visitMinutes: 120, openHour: 0, closeHour: 24, costTier: 0, description: "Chinese fishing nets, colonial streets and art cafes." },
        { id: "kerala-backwaters", name: "Alleppey Backwaters Cruise", interests: ["nature", "relaxation"], lat: 9.4981, lng: 76.3388, visitMinutes: 240, openHour: 9, closeHour: 17, costTier: 2, description: "Houseboat cruise through palm-fringed canals." },
        { id: "kerala-munnar-tea", name: "Munnar Tea Gardens", interests: ["nature", "relaxation"], lat: 10.0889, lng: 77.0595, visitMinutes: 150, openHour: 8, closeHour: 17.5, costTier: 1, description: "Rolling emerald tea estates in the Western Ghats." },
        { id: "kerala-eravikulam", name: "Eravikulam National Park", interests: ["wildlife", "nature"], lat: 10.1631, lng: 77.0508, visitMinutes: 120, openHour: 8, closeHour: 16, costTier: 1, description: "Home to the endangered Nilgiri Tahr." },
        { id: "kerala-jew-town", name: "Jew Town & Spice Market", interests: ["shopping", "cuisine", "culture"], lat: 9.9578, lng: 76.259, visitMinutes: 90, openHour: 10, closeHour: 19, costTier: 1, description: "Historic spice trading lanes and antique shops." }
      ]
    },
    {
      id: "ladakh",
      name: "Leh-Ladakh",
      state: "Ladakh",
      tagline: "High-altitude desert and monasteries",
      center: { lat: 34.1526, lng: 77.5771 },
      image: "assets/travel_mountains.png",
      attractions: [
        { id: "ladakh-pangong", name: "Pangong Lake", interests: ["nature", "adventure"], lat: 33.7592, lng: 78.6733, visitMinutes: 180, openHour: 6, closeHour: 18, costTier: 2, description: "High-altitude lake that shifts colour through the day." },
        { id: "ladakh-thiksey", name: "Thiksey Monastery", interests: ["spiritual", "heritage"], lat: 33.8438, lng: 77.6606, visitMinutes: 90, openHour: 7, closeHour: 19, costTier: 0, description: "Twelve-storey monastery resembling Lhasa's Potala Palace." },
        { id: "ladakh-leh-palace", name: "Leh Palace", interests: ["heritage"], lat: 34.1642, lng: 77.5847, visitMinutes: 60, openHour: 7, closeHour: 16, costTier: 0, description: "Former royal palace overlooking Leh town." },
        { id: "ladakh-nubra", name: "Nubra Valley", interests: ["nature", "adventure"], lat: 34.6803, lng: 77.5619, visitMinutes: 240, openHour: 7, closeHour: 17, costTier: 2, description: "Cold desert valley with double-humped camels." },
        { id: "ladakh-market", name: "Leh Main Bazaar", interests: ["shopping", "cuisine"], lat: 34.1656, lng: 77.5847, visitMinutes: 90, openHour: 10, closeHour: 21, costTier: 1, description: "Tibetan handicrafts, pashmina and local cafes." }
      ]
    },
    {
      id: "varanasi",
      name: "Varanasi",
      state: "Uttar Pradesh",
      tagline: "India's spiritual capital",
      center: { lat: 25.3176, lng: 82.9739 },
      image: "assets/travel_hidden.png",
      attractions: [
        { id: "varanasi-ganga-aarti", name: "Ganga Aarti at Dashashwamedh Ghat", interests: ["spiritual", "culture"], lat: 25.3109, lng: 83.0107, visitMinutes: 75, openHour: 18.5, closeHour: 20, costTier: 0, description: "Nightly fire ceremony on the river banks." },
        { id: "varanasi-kashi-vishwanath", name: "Kashi Vishwanath Temple", interests: ["spiritual"], lat: 25.311, lng: 83.0107, visitMinutes: 60, openHour: 3, closeHour: 23, costTier: 0, description: "One of the twelve Jyotirlinga shrines to Shiva." },
        { id: "varanasi-boat-ride", name: "Sunrise Boat Ride", interests: ["spiritual", "nature"], lat: 25.3057, lng: 83.0104, visitMinutes: 90, openHour: 5.5, closeHour: 7.5, costTier: 1, description: "Rowboat past the ghats as the city wakes up." },
        { id: "varanasi-sarnath", name: "Sarnath", interests: ["heritage", "spiritual"], lat: 25.3811, lng: 83.0243, visitMinutes: 100, openHour: 6, closeHour: 18, costTier: 1, description: "Where the Buddha gave his first sermon." }
      ]
    },
    {
      id: "hampi",
      name: "Hampi",
      state: "Karnataka",
      tagline: "Ruins of the Vijayanagara Empire",
      center: { lat: 15.335, lng: 76.46 },
      image: "assets/travel_hidden.png",
      attractions: [
        { id: "hampi-virupaksha", name: "Virupaksha Temple", interests: ["heritage", "spiritual"], lat: 15.335, lng: 76.4601, visitMinutes: 75, openHour: 5.5, closeHour: 21.5, costTier: 0, description: "Active 7th-century temple at the heart of the ruins." },
        { id: "hampi-vittala", name: "Vittala Temple & Stone Chariot", interests: ["heritage", "culture"], lat: 15.3406, lng: 76.4746, visitMinutes: 90, openHour: 8.5, closeHour: 17.5, costTier: 1, description: "Iconic stone chariot and musical pillars." },
        { id: "hampi-matanga", name: "Matanga Hill", interests: ["nature", "adventure"], lat: 15.3363, lng: 76.4676, visitMinutes: 90, openHour: 6, closeHour: 18, costTier: 0, description: "Boulder-strewn sunrise/sunset viewpoint over the ruins." },
        { id: "hampi-bazaar", name: "Hampi Bazaar", interests: ["shopping", "culture", "cuisine"], lat: 15.335, lng: 76.4614, visitMinutes: 60, openHour: 8, closeHour: 21, costTier: 0, description: "Ruined market street below Virupaksha Temple." }
      ]
    }
  ];

  const INTERESTS = [
    { id: "heritage", label: "Heritage & Monuments" },
    { id: "nature", label: "Nature & Scenery" },
    { id: "adventure", label: "Adventure" },
    { id: "spiritual", label: "Spiritual" },
    { id: "culture", label: "Culture & Art" },
    { id: "cuisine", label: "Food & Cuisine" },
    { id: "relaxation", label: "Relaxation" },
    { id: "shopping", label: "Shopping" },
    { id: "wildlife", label: "Wildlife" }
  ];

  const BUDGETS = [
    { id: "budget", label: "Budget", maxTier: 1 },
    { id: "mid", label: "Mid-range", maxTier: 2 },
    { id: "luxury", label: "Luxury", maxTier: 3 }
  ];

  const api = { DESTINATIONS, INTERESTS, BUDGETS };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.ItineraryData = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
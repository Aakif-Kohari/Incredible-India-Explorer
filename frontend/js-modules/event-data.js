/**
 * event-data.js
 * Curated dataset of recurring Indian festivals and events used by the
 * Smart Event Discovery & Festival Recommendation Engine
 * (js-modules/event-recommendation-engine.js + frontend/event-discovery).
 *
 * Like trip-data.js and festivalsData (data.js), this is a rule-based,
 * client-side-only dataset — no backend event aggregation service exists
 * yet, so dates are expressed as an approximate recurring month window
 * (startMonth/endMonth, 1-12) rather than exact calendar dates, matching
 * the granularity already used by the "period" field on festivalsData.
 *
 * `destinationId` cross-references trip-data.js's `tripDestinations` ids
 * where the event maps cleanly onto an existing planner destination; it's
 * null when the event's location doesn't have a dedicated destination
 * entry yet (still searchable by state).
 *
 * `category` is one of the six interest categories called out in the
 * feature request: Culture, Music, Food, Adventure, Religious, Sports.
 * `tags` add finer-grained keywords used for secondary interest matching.
 */
(function (root) {
  "use strict";

  const events = [
    {
      id: "pushkar-camel-fair",
      name: "Pushkar Camel Fair",
      category: "Culture",
      tags: ["fair", "camel", "folk", "shopping"],
      destinationId: "jaisalmer",
      state: "Rajasthan",
      location: "Pushkar",
      startMonth: 10,
      endMonth: 11,
      durationDays: 5,
      popularity: 8,
      description:
        "One of the world's largest camel and livestock fairs, with folk music, camel races, and a lively bazaar on the shores of Pushkar Lake.",
      image: "assets/dances/kalbelia.png"
    },
    {
      id: "rann-utsav",
      name: "Rann Utsav",
      category: "Culture",
      tags: ["desert", "folk", "handicrafts", "music"],
      destinationId: "rann-of-kutch",
      state: "Gujarat",
      location: "Rann of Kutch",
      startMonth: 11,
      endMonth: 2,
      durationDays: 90,
      popularity: 8,
      description:
        "A months-long desert carnival on the white salt flats of Kutch, with folk performances, handicraft stalls, and moonlit camping.",
      image: "assets/festival_default.png"
    },
    {
      id: "navratri-garba-nights",
      name: "Navratri Garba Nights",
      category: "Music",
      tags: ["dance", "religious", "folk"],
      destinationId: null,
      state: "Gujarat",
      location: "Ahmedabad",
      startMonth: 9,
      endMonth: 10,
      durationDays: 9,
      popularity: 9,
      description:
        "Nine nights of Garba and Dandiya Raas performed in colourful traditional dress, honouring Goddess Durga.",
      image: "assets/dances/garba.png"
    },
    {
      id: "durga-puja-kolkata",
      name: "Durga Puja",
      category: "Religious",
      tags: ["pandal", "art", "culture"],
      destinationId: "kolkata",
      state: "West Bengal",
      location: "Kolkata",
      startMonth: 9,
      endMonth: 10,
      durationDays: 5,
      popularity: 9,
      description:
        "Kolkata's grandest festival: elaborately themed pandals across the city house artistic idols of Goddess Durga.",
      image: "assets/festival_default.png"
    },
    {
      id: "diwali-celebrations",
      name: "Diwali Celebrations",
      category: "Religious",
      tags: ["lights", "fireworks", "family"],
      destinationId: "delhi",
      state: "Delhi",
      location: "Pan-India",
      startMonth: 10,
      endMonth: 11,
      durationDays: 1,
      popularity: 10,
      description: "The Festival of Lights, celebrated nationwide with diyas, rangoli, sweets, and fireworks.",
      image: "assets/diwali.png"
    },
    {
      id: "holi-braj",
      name: "Holi in Braj (Mathura & Vrindavan)",
      category: "Culture",
      tags: ["colors", "spring", "music"],
      destinationId: "agra",
      state: "Uttar Pradesh",
      location: "Mathura & Vrindavan",
      startMonth: 3,
      endMonth: 3,
      durationDays: 2,
      popularity: 9,
      description:
        "The most exuberant Holi celebrations in India, including the famous Lathmar Holi, near Krishna's birthplace.",
      image: "assets/holi.png"
    },
    {
      id: "hemis-festival",
      name: "Hemis Festival",
      category: "Religious",
      tags: ["monastery", "masked-dance", "buddhist"],
      destinationId: "leh",
      state: "Ladakh",
      location: "Hemis Monastery",
      startMonth: 6,
      endMonth: 7,
      durationDays: 2,
      popularity: 7,
      description:
        "A vibrant Buddhist festival at Hemis Monastery featuring masked Cham dances performed by monks.",
      image: "assets/Hemis_Monastery.png"
    },
    {
      id: "sunburn-festival",
      name: "Sunburn Festival",
      category: "Music",
      tags: ["edm", "nightlife", "beach"],
      destinationId: "goa",
      state: "Goa",
      location: "Goa",
      startMonth: 12,
      endMonth: 12,
      durationDays: 3,
      popularity: 8,
      description: "Asia's largest electronic dance music festival, held on Goa's beaches every December.",
      image: "assets/festival_default.png"
    },
    {
      id: "goa-carnival",
      name: "Goa Carnival",
      category: "Culture",
      tags: ["parade", "music", "food"],
      destinationId: "goa",
      state: "Goa",
      location: "Panaji",
      startMonth: 2,
      endMonth: 2,
      durationDays: 4,
      popularity: 7,
      description: "A Portuguese-legacy street carnival with colourful parades, floats, and live music.",
      image: "assets/Basilica_of_Bom_Jesus.png"
    },
    {
      id: "international-kite-festival",
      name: "International Kite Festival",
      category: "Adventure",
      tags: ["kites", "sky", "family"],
      destinationId: null,
      state: "Gujarat",
      location: "Ahmedabad",
      startMonth: 1,
      endMonth: 1,
      durationDays: 2,
      popularity: 6,
      description:
        "Held around Uttarayan (Makar Sankranti), the skies over Ahmedabad fill with thousands of kites from around the world.",
      image: "assets/festival_default.png"
    },
    {
      id: "khajuraho-dance-festival",
      name: "Khajuraho Dance Festival",
      category: "Music",
      tags: ["classical-dance", "temple", "art"],
      destinationId: "khajuraho",
      state: "Madhya Pradesh",
      location: "Khajuraho",
      startMonth: 2,
      endMonth: 2,
      durationDays: 7,
      popularity: 6,
      description:
        "A week of classical Indian dance performed against the backdrop of Khajuraho's UNESCO-listed temples.",
      image: "assets/dances/kathak.jpg"
    },
    {
      id: "hornbill-festival",
      name: "Hornbill Festival",
      category: "Culture",
      tags: ["tribal", "music", "food"],
      destinationId: null,
      state: "Nagaland",
      location: "Kisama Heritage Village",
      startMonth: 12,
      endMonth: 12,
      durationDays: 10,
      popularity: 7,
      description:
        "A celebration of Nagaland's tribal heritage, with traditional music, dance, food, and crafts from all Naga tribes.",
      image: "assets/festival_default.png"
    },
    {
      id: "thrissur-pooram",
      name: "Thrissur Pooram",
      category: "Religious",
      tags: ["elephants", "temple", "fireworks"],
      destinationId: "periyar",
      state: "Kerala",
      location: "Thrissur",
      startMonth: 4,
      endMonth: 5,
      durationDays: 1,
      popularity: 7,
      description:
        "Kerala's most spectacular temple festival, famous for its parade of caparisoned elephants and fireworks finale.",
      image: "assets/festival_default.png"
    },
    {
      id: "onam-boat-race",
      name: "Onam Snake Boat Race",
      category: "Sports",
      tags: ["boat-race", "harvest", "water"],
      destinationId: "alleppey",
      state: "Kerala",
      location: "Alleppey backwaters",
      startMonth: 8,
      endMonth: 9,
      durationDays: 1,
      popularity: 8,
      description:
        "Long snake boats (chundan vallam) race on Alleppey's backwaters as part of Kerala's grand Onam harvest celebrations.",
      image: "assets/festival_default.png"
    },
    {
      id: "bihu-festival",
      name: "Bihu Festival",
      category: "Culture",
      tags: ["harvest", "dance", "music"],
      destinationId: "kaziranga",
      state: "Assam",
      location: "Assam",
      startMonth: 4,
      endMonth: 4,
      durationDays: 3,
      popularity: 6,
      description: "Assam's spring harvest and New Year festival, marked by Bihu dance, dhol music, and pitha sweets.",
      image: "assets/bihu.png"
    },
    {
      id: "pongal-harvest-festival",
      name: "Pongal Harvest Festival",
      category: "Food",
      tags: ["harvest", "cattle", "sweets"],
      destinationId: "madurai",
      state: "Tamil Nadu",
      location: "Tamil Nadu",
      startMonth: 1,
      endMonth: 1,
      durationDays: 4,
      popularity: 8,
      description:
        "A four-day harvest festival where sweet rice pudding is ceremonially boiled over, shared with family and cattle.",
      image: "assets/pongal.png"
    },
    {
      id: "eid-celebrations",
      name: "Eid Celebrations",
      category: "Religious",
      tags: ["prayer", "food", "community"],
      destinationId: "hyderabad",
      state: "Telangana",
      location: "Charminar, Hyderabad",
      startMonth: 4,
      endMonth: 4,
      durationDays: 1,
      popularity: 7,
      description:
        "Eid-ul-Fitr prayers and feasting around Hyderabad's historic Charminar, with sheer khurma and Eidi gift-giving.",
      image: "assets/eid.png"
    },
    {
      id: "chhau-dance-festival",
      name: "Chhau Dance Festival",
      category: "Music",
      tags: ["mask-dance", "folk", "art"],
      destinationId: null,
      state: "Odisha",
      location: "Odisha / Jharkhand / West Bengal border belt",
      startMonth: 4,
      endMonth: 4,
      durationDays: 3,
      popularity: 5,
      description:
        "A vigorous, semi-classical masked dance form performed at spring festivals across eastern India.",
      image: "assets/dances/chhau.png"
    },
    {
      id: "baisakhi-festival",
      name: "Baisakhi Festival",
      category: "Religious",
      tags: ["harvest", "bhangra", "sikh", "music"],
      destinationId: "amritsar",
      state: "Punjab",
      location: "Amritsar",
      startMonth: 4,
      endMonth: 4,
      durationDays: 1,
      popularity: 8,
      description:
        "A Sikh harvest festival marked by prayers at the Golden Temple and energetic Bhangra performances in the fields.",
      image: "assets/dances/bhangra.png"
    },
    {
      id: "margazhi-music-season",
      name: "Margazhi Music & Dance Season",
      category: "Music",
      tags: ["carnatic", "classical", "dance"],
      destinationId: "chennai",
      state: "Tamil Nadu",
      location: "Chennai",
      startMonth: 12,
      endMonth: 1,
      durationDays: 30,
      popularity: 7,
      description:
        "Chennai's month-long Carnatic music and Bharatanatyam season, with hundreds of performances across the city's sabhas.",
      image: "assets/dances/bharatanatyam.png"
    },
    {
      id: "leh-ladakh-marathon",
      name: "Leh Ladakh Marathon",
      category: "Sports",
      tags: ["marathon", "adventure", "running", "mountains"],
      destinationId: "leh",
      state: "Ladakh",
      location: "Leh",
      startMonth: 9,
      endMonth: 9,
      durationDays: 1,
      popularity: 6,
      description:
        "One of the world's highest marathons, run at over 3,500 m altitude through the Ladakh Himalayas.",
      image: "assets/explorer-images/pangong-lake.png"
    }
  ];

  const api = { events };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.eventData = api;
  }
})(typeof window !== "undefined" ? window : globalThis);

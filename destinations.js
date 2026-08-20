const DESTINATIONS = [
  {
    id: "taj-mahal", name: "Taj Mahal", city: "Agra",
    tags: ["heritage", "monument", "unesco", "romantic"],
    indoorOutdoor: "outdoor", bestWeather: ["clear", "clouds"],
    avgCost: 1100, openHours: "6:00 AM - 6:30 PM (closed Fridays)",
    nearBy: ["agra-fort", "mehtab-bagh"],
    description: "Iconic white marble mausoleum, one of the New Seven Wonders of the World."
  },
  {
    id: "agra-fort", name: "Agra Fort", city: "Agra",
    tags: ["heritage", "monument", "unesco"],
    indoorOutdoor: "outdoor", bestWeather: ["clear", "clouds"],
    avgCost: 650, openHours: "6:00 AM - 6:00 PM",
    nearBy: ["taj-mahal"],
    description: "Red sandstone Mughal fort overlooking the Yamuna river."
  },
  {
    id: "mehtab-bagh", name: "Mehtab Bagh", city: "Agra",
    tags: ["garden", "sunset", "budget-friendly"],
    indoorOutdoor: "outdoor", bestWeather: ["clear", "clouds"],
    avgCost: 300, openHours: "6:00 AM - 7:00 PM",
    nearBy: ["taj-mahal"],
    description: "Charbagh garden with a classic sunset view of the Taj Mahal."
  },
  {
    id: "city-palace-jaipur", name: "City Palace", city: "Jaipur",
    tags: ["heritage", "museum", "indoor-friendly"],
    indoorOutdoor: "mixed", bestWeather: ["any"],
    avgCost: 700, openHours: "9:30 AM - 5:00 PM",
    nearBy: ["hawa-mahal", "jantar-mantar"],
    description: "Royal palace complex with museums, courtyards, and covered galleries."
  },
  {
    id: "hawa-mahal", name: "Hawa Mahal", city: "Jaipur",
    tags: ["heritage", "monument", "photography"],
    indoorOutdoor: "outdoor", bestWeather: ["clear", "clouds"],
    avgCost: 200, openHours: "9:00 AM - 4:30 PM",
    nearBy: ["city-palace-jaipur"],
    description: "Pink sandstone 'Palace of Winds' with intricate latticed windows."
  },
  {
    id: "albert-hall-museum", name: "Albert Hall Museum", city: "Jaipur",
    tags: ["museum", "indoor-friendly", "rainy-day"],
    indoorOutdoor: "indoor", bestWeather: ["any"],
    avgCost: 150, openHours: "9:00 AM - 5:00 PM",
    nearBy: ["city-palace-jaipur"],
    description: "Oldest museum in Rajasthan, great indoor option on a rainy day."
  },
  {
    id: "aga-khan-palace", name: "Aga Khan Palace", city: "Pune",
    tags: ["heritage", "monument", "freedom-struggle", "historical", "museum"],
    indoorOutdoor: "mixed", bestWeather: ["clear", "clouds"],
    avgCost: 100, openHours: "9:00 AM - 6:00 PM",
    nearBy: [],
    description: "Historic palace where Mahatma Gandhi was imprisoned during the Quit India Movement. Now a national monument and museum dedicated to the freedom struggle."
  },
  {
    id: "agonda-beach", name: "Agonda Beach", city: "Canacona, South Goa",
    tags: ["beach", "nature", "turtle-nesting", "relaxation", "coastal", "goa"],
    indoorOutdoor: "outdoor", bestWeather: ["clear", "clouds"],
    avgCost: 500, openHours: "24 Hours (Protected turtle nesting sanctuary)",
    nearBy: ["palolem-beach", "cola-beach", "cabo-de-rama-fort"],
    description: "Pristine 3km golden beach in South Goa, famed as a protected Olive Ridley sea turtle nesting sanctuary with calm Arabian Sea waters and tranquil shalas."
  },
  {
    id: "vagator-beach", name: "Vagator Beach", city: "Bardez, North Goa",
    tags: ["beach", "cliffs", "fort", "sunset", "coastal", "goa", "culture"],
    indoorOutdoor: "outdoor", bestWeather: ["clear", "clouds"],
    avgCost: 500, openHours: "24 Hours",
    nearBy: ["chapora-fort", "anjuna-beach", "ozran-beach"],
    description: "Iconic North Goa beach featuring dramatic red laterite cliffs, Chapora Fort overlook, Ozran Shiva face rock sculpture, and vibrant sunset culture."
  }
];
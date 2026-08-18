/**
 * landmark-data.js
 * Curated reference database for the Landmark Identification feature
 * (js-modules/landmark-recognition-engine.js + frontend/landmark-identifier).
 *
 * Each entry's `hash` is a precomputed 64-bit perceptual average-hash (aHash)
 * of the reference photo in /assets, generated with an 8x8 grayscale
 * downscale + mean threshold. The in-browser recognizer computes the same
 * kind of hash for an uploaded photo (see landmark-identifier/script.js)
 * and ranks reference entries by Hamming distance.
 *
 * This is a lightweight, fully client-side "MVP" recognizer intentionally
 * chosen because the site has no backend/model-serving infrastructure
 * (static HTML/JS + Firebase auth only, see api/firebase-config.js). It
 * gives real (if approximate) image matching today, and the matching logic
 * is isolated behind LandmarkRecognitionEngine.identify() so a real
 * CV/embedding backend (TensorFlow.js MobileNet, ONNX, or a hosted
 * inference API) can be dropped in later without touching the UI layer.
 */
(function (root) {
  "use strict";

  const landmarks = [
    {
      id: "taj_mahal",
      name: "Taj Mahal",
      aliases: ["taj", "tajmahal"],
      image: "assets/Taj_Mahal.png",
      hash: "1111111011111111111111110001100000000000111001100000000000000000",
      state: "Uttar Pradesh",
      city: "Agra",
      category: "Mausoleum",
      built: "1632–1653, Mughal Emperor Shah Jahan",
      description:
        "An ivory-white marble mausoleum built by Shah Jahan in memory of his wife Mumtaz Mahal. A UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
      significance:
        "Widely regarded as the finest example of Mughal architecture, blending Persian, Islamic, and Indian styles.",
      bestTimeToVisit: "October–March",
      nearbyAttractions: ["Agra Fort", "Fatehpur Sikri", "Mehtab Bagh"]
    },
    {
      id: "hawa_mahal",
      name: "Hawa Mahal",
      aliases: ["palace of winds"],
      image: "assets/Hawa_Mahal.png",
      hash: "0011111101111110011111101111111111011110110111000000000000111100",
      state: "Rajasthan",
      city: "Jaipur",
      category: "Palace",
      built: "1799, Maharaja Sawai Pratap Singh",
      description:
        "A five-story pink sandstone palace with 953 small windows (jharokhas), built so royal women could observe street life unseen.",
      significance:
        "An icon of the Pink City and a defining example of Rajput architecture.",
      bestTimeToVisit: "October–March",
      nearbyAttractions: ["Amber Fort", "City Palace, Jaipur", "Jantar Mantar"]
    },
    {
      id: "golden_temple",
      name: "Golden Temple (Harmandir Sahib)",
      aliases: ["harmandir sahib", "darbar sahib"],
      image: "assets/Golden_Temple.png",
      hash: "0001111111111111111111111100011100000000010000111100011100000100",
      state: "Punjab",
      city: "Amritsar",
      category: "Sikh Gurdwara",
      built: "1604, Guru Arjan (rebuilt in marble and gold in the 19th century)",
      description:
        "The holiest Gurdwara of Sikhism, its sanctum plated in gold and set within a sacred pool, the Amrit Sarovar.",
      significance:
        "Famous for its Langar, the world's largest free community kitchen, serving all visitors regardless of faith.",
      bestTimeToVisit: "October–March",
      nearbyAttractions: ["Jallianwala Bagh", "Wagah Border ceremony"]
    },
    {
      id: "meenakshi_temple",
      name: "Meenakshi Amman Temple",
      aliases: ["meenakshi temple"],
      image: "assets/Meenakshi_Temple.png",
      hash: "0001111111001111110011110000000100100000000000001000001101001111",
      state: "Tamil Nadu",
      city: "Madurai",
      category: "Hindu Temple",
      built: "Rebuilt 14th–17th century, Nayak dynasty",
      description:
        "A vast temple complex dedicated to Goddess Meenakshi, famed for its towering, sculpture-covered gopurams (gateway towers).",
      significance:
        "One of the largest temple complexes in India and a masterpiece of Dravidian temple architecture.",
      bestTimeToVisit: "October–March",
      nearbyAttractions: ["Thirumalai Nayakkar Mahal", "Vaigai River"]
    },
    {
      id: "konark_sun_temple",
      name: "Konark Sun Temple",
      aliases: ["sun temple", "black pagoda"],
      image: "assets/Konark_Sun_Temple.png",
      hash: "0111111100111111011011111110011111000111000000000000000001000000",
      state: "Odisha",
      city: "Konark",
      category: "Hindu Temple",
      built: "13th century, King Narasimhadeva I",
      description:
        "Designed as a colossal stone chariot of the sun god Surya, with 24 intricately carved wheels drawn by seven horses.",
      significance: "A UNESCO World Heritage Site celebrated for its architecture and stone carving.",
      bestTimeToVisit: "October–February",
      nearbyAttractions: ["Puri Jagannath Temple", "Chandrabhaga Beach"]
    },
    {
      id: "mysore_palace",
      name: "Mysore Palace",
      aliases: ["amba vilas palace"],
      image: "assets/Mysore_Palace.png",
      hash: "0000000010111100101111111011111111111111111100000000000000000000",
      state: "Karnataka",
      city: "Mysuru",
      category: "Palace",
      built: "1912, Wadiyar dynasty",
      description:
        "The official residence of the Wadiyar dynasty, known for its Indo-Saracenic architecture and spectacular evening illumination.",
      significance: "One of India's most visited monuments, especially famous during Mysuru Dasara.",
      bestTimeToVisit: "October (Dasara) or November–February",
      nearbyAttractions: ["Chamundi Hills", "Brindavan Gardens"]
    },
    {
      id: "victoria_memorial",
      name: "Victoria Memorial",
      aliases: ["victoria memorial hall"],
      image: "assets/Victoria_Memorial.png",
      hash: "1111111111111111111111110111111100111100000000000000000000000000",
      state: "West Bengal",
      city: "Kolkata",
      category: "Monument & Museum",
      built: "1906–1921, British colonial era",
      description:
        "A grand white marble monument built in memory of Queen Victoria, now housing a museum on colonial-era Kolkata.",
      significance: "One of Kolkata's most recognisable landmarks and a large public museum.",
      bestTimeToVisit: "October–March",
      nearbyAttractions: ["Indian Museum", "Howrah Bridge", "Eden Gardens"]
    },
    {
      id: "brihadeeswara_temple",
      name: "Brihadeeswara Temple",
      aliases: ["big temple", "thanjavur temple"],
      image: "assets/Brihadeeswara_Temple.png",
      hash: "1111111111101111111011101110111010100110000001100000000000000000",
      state: "Tamil Nadu",
      city: "Thanjavur",
      category: "Hindu Temple",
      built: "1010 CE, Raja Raja Chola I",
      description:
        "A masterpiece of Chola architecture dedicated to Lord Shiva, topped by one of the tallest temple towers (vimana) in India, carved from a single granite block.",
      significance: "A UNESCO World Heritage Site and one of the Great Living Chola Temples.",
      bestTimeToVisit: "November–February",
      nearbyAttractions: ["Thanjavur Royal Palace", "Saraswathi Mahal Library"]
    },
    {
      id: "basilica_bom_jesus",
      name: "Basilica of Bom Jesus",
      aliases: ["bom jesus", "bom jesus basilica"],
      image: "assets/Basilica_of_Bom_Jesus.png",
      hash: "1111111111111111110110111011000100000001000000011000000000000011",
      state: "Goa",
      city: "Old Goa",
      category: "Church",
      built: "1594–1605, Portuguese colonial era",
      description:
        "A baroque church holding the mortal remains of St. Francis Xavier, one of the finest examples of baroque architecture in India.",
      significance: "A UNESCO World Heritage Site and one of Goa's most visited pilgrimage sites.",
      bestTimeToVisit: "November–February",
      nearbyAttractions: ["Se Cathedral", "Fort Aguada"]
    },
    {
      id: "hemis_monastery",
      name: "Hemis Monastery",
      aliases: ["hemis gompa"],
      image: "assets/Hemis_Monastery.png",
      hash: "1111111111111000011000100001110000001100000011000000000001000000",
      state: "Ladakh",
      city: "Hemis",
      category: "Buddhist Monastery",
      built: "1630, Stagsang Raspa Nawang Gyatso",
      description:
        "The largest and wealthiest monastery in Ladakh, renowned for its annual Hemis Festival with masked Cham dances.",
      significance: "A major centre of the Drukpa Kagyu lineage of Tibetan Buddhism.",
      bestTimeToVisit: "May–September",
      nearbyAttractions: ["Leh Palace", "Pangong Lake", "Thiksey Monastery"]
    },
    {
      id: "jama_masjid",
      name: "Jama Masjid",
      aliases: ["jama masjid delhi", "masjid-i jahan-numa"],
      image: "assets/Jama_Masjid.png",
      hash: "0011111111111111111111110000001100000000000000010110111000000000",
      state: "Delhi",
      city: "Delhi",
      category: "Mosque",
      built: "1650–1656, Mughal Emperor Shah Jahan",
      description:
        "One of the largest mosques in India, built of red sandstone and white marble, with a courtyard that can hold tens of thousands of worshippers.",
      significance: "The principal mosque of Old Delhi and a major example of Mughal architecture.",
      bestTimeToVisit: "October–March",
      nearbyAttractions: ["Red Fort", "Chandni Chowk"]
    },
    {
      id: "kedarnath",
      name: "Kedarnath Temple",
      aliases: ["kedarnath"],
      image: "assets/Kedarnath.png",
      hash: "1111111111111111000110000001111000000010000001100000000000001000",
      state: "Uttarakhand",
      city: "Kedarnath",
      category: "Hindu Temple",
      built: "Ancient origins; current structure c. 8th century, attributed to Adi Shankaracharya",
      description:
        "A remote Himalayan temple dedicated to Shiva, set at over 3,500 m and accessible only by foot or pony/helicopter for part of the year.",
      significance: "One of the twelve Jyotirlingas and part of the Char Dham pilgrimage circuit.",
      bestTimeToVisit: "May–June, September–October",
      nearbyAttractions: ["Vasuki Tal", "Bhairav Temple", "Gaurikund"]
    },
    {
      id: "ajanta_caves",
      name: "Ajanta Caves",
      aliases: ["ajanta"],
      image: "assets/ajanta_caves.png",
      hash: "1111100011111000111100001101000010010000110100111101001110000111",
      state: "Maharashtra",
      city: "Aurangabad district",
      category: "Rock-cut Caves",
      built: "2nd century BCE – 6th century CE",
      description:
        "A series of 30 rock-cut Buddhist cave monuments featuring some of the finest surviving examples of ancient Indian painting and sculpture.",
      significance: "A UNESCO World Heritage Site, along with the nearby Ellora Caves.",
      bestTimeToVisit: "November–March",
      nearbyAttractions: ["Ellora Caves", "Bibi Ka Maqbara"]
    },
    {
      id: "red_fort",
      name: "Red Fort (Lal Qila)",
      aliases: ["lal qila"],
      image: "assets/red_fort.png",
      hash: "1111111111111111111111111011110110000001100000010000000000000000",
      state: "Delhi",
      city: "Delhi",
      category: "Fort",
      built: "1638–1648, Mughal Emperor Shah Jahan",
      description:
        "A massive red sandstone fort that served as the main residence of Mughal emperors for nearly 200 years.",
      significance:
        "A UNESCO World Heritage Site; the Prime Minister of India hoists the national flag here every Independence Day.",
      bestTimeToVisit: "October–March",
      nearbyAttractions: ["Jama Masjid", "Chandni Chowk", "Raj Ghat"]
    }
  ];

  const api = { landmarks };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.landmarkData = api;
  }
})(typeof window !== "undefined" ? window : globalThis);

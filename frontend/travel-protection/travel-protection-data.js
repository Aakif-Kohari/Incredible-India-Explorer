/**
 * Smart Travel Protection
 * Destination risk metadata and preparation information.
 *
 * Risk values:
 * 1 = Low
 * 2 = Moderate
 * 3 = High
 */

const TRAVEL_PROTECTION_DESTINATIONS = {
  delhi: {
    name: "Delhi",
    region: "North India",
    description:
      "A major cultural and transport hub with extensive public transportation and busy urban areas.",

    risks: {
      weather: {
        level: 2,
        description:
          "Extreme summer heat and occasional poor air quality can affect outdoor activities."
      },
      health: {
        level: 2,
        description:
          "Travelers should take normal urban health precautions and stay hydrated during hot periods."
      },
      transportation: {
        level: 2,
        description:
          "Traffic congestion and occasional transport delays can affect schedules."
      },
      safety: {
        level: 2,
        description:
          "Use established transport options, protect valuables and remain aware in crowded areas."
      }
    },

    seasonalRisks: {
      summer: 3,
      monsoon: 2,
      winter: 2,
      spring: 1,
      autumn: 1
    }
  },

  goa: {
    name: "Goa",
    region: "West India",
    description:
      "A popular coastal destination known for beaches, heritage sites and outdoor activities.",

    risks: {
      weather: {
        level: 2,
        description:
          "Monsoon conditions may bring heavy rainfall, rough seas and changes to outdoor activities."
      },
      health: {
        level: 1,
        description:
          "Stay hydrated and follow normal food, water and sun-safety precautions."
      },
      transportation: {
        level: 2,
        description:
          "Road conditions and local transport availability can vary during heavy rain."
      },
      safety: {
        level: 2,
        description:
          "Take care around beaches, water activities and unfamiliar roads, especially at night."
      }
    },

    seasonalRisks: {
      summer: 2,
      monsoon: 3,
      winter: 1,
      spring: 2,
      autumn: 2
    }
  },

  kerala: {
    name: "Kerala",
    region: "South India",
    description:
      "A scenic destination featuring backwaters, beaches, forests and hill regions.",

    risks: {
      weather: {
        level: 2,
        description:
          "Heavy monsoon rainfall can affect roads, outdoor activities and some tourist areas."
      },
      health: {
        level: 2,
        description:
          "Carry essential medication and follow food, water and insect-bite precautions."
      },
      transportation: {
        level: 2,
        description:
          "Rainfall and road conditions can occasionally cause delays."
      },
      safety: {
        level: 1,
        description:
          "Use normal travel precautions and follow local guidance around water and hill areas."
      }
    },

    seasonalRisks: {
      summer: 2,
      monsoon: 3,
      winter: 1,
      spring: 2,
      autumn: 2
    }
  },

  rajasthan: {
    name: "Rajasthan",
    region: "North-West India",
    description:
      "A large desert and heritage region with forts, palaces and long-distance road journeys.",

    risks: {
      weather: {
        level: 3,
        description:
          "Very high temperatures can occur during summer, while desert nights may become cold."
      },
      health: {
        level: 2,
        description:
          "Hydration, sun protection and appropriate medication planning are especially important."
      },
      transportation: {
        level: 2,
        description:
          "Long travel distances and road journeys require careful schedule planning."
      },
      safety: {
        level: 1,
        description:
          "Follow normal precautions and use reputable transport and accommodation providers."
      }
    },

    seasonalRisks: {
      summer: 3,
      monsoon: 2,
      winter: 1,
      spring: 2,
      autumn: 1
    }
  },

  himachal: {
    name: "Himachal Pradesh",
    region: "North India",
    description:
      "A mountainous destination known for hill stations, trekking and adventure activities.",

    risks: {
      weather: {
        level: 3,
        description:
          "Mountain weather can change quickly, with snow, heavy rain or landslide-related disruption possible."
      },
      health: {
        level: 2,
        description:
          "Altitude, cold weather and strenuous activities may require additional preparation."
      },
      transportation: {
        level: 3,
        description:
          "Mountain roads can be affected by weather and temporary closures."
      },
      safety: {
        level: 2,
        description:
          "Follow local advisories and use qualified operators for adventure activities."
      }
    },

    seasonalRisks: {
      summer: 2,
      monsoon: 3,
      winter: 3,
      spring: 2,
      autumn: 2
    }
  },

  uttarakhand: {
    name: "Uttarakhand",
    region: "North India",
    description:
      "A Himalayan destination featuring pilgrimage sites, valleys, forests and trekking routes.",

    risks: {
      weather: {
        level: 3,
        description:
          "Mountain weather can change rapidly and heavy rainfall may affect travel routes."
      },
      health: {
        level: 2,
        description:
          "Prepare for altitude, changing temperatures and physically demanding journeys."
      },
      transportation: {
        level: 3,
        description:
          "Road travel can be affected by weather, terrain and temporary route restrictions."
      },
      safety: {
        level: 2,
        description:
          "Follow local advisories and avoid entering restricted or unsafe terrain."
      }
    },

    seasonalRisks: {
      summer: 2,
      monsoon: 3,
      winter: 3,
      spring: 2,
      autumn: 2
    }
  },

  tamilnadu: {
    name: "Tamil Nadu",
    region: "South India",
    description:
      "A culturally rich state with temples, coastal destinations and major cities.",

    risks: {
      weather: {
        level: 2,
        description:
          "High temperatures and seasonal heavy rainfall may affect outdoor plans."
      },
      health: {
        level: 1,
        description:
          "Maintain hydration and normal food, water and sun-safety precautions."
      },
      transportation: {
        level: 2,
        description:
          "Urban traffic and weather-related delays can affect journeys."
      },
      safety: {
        level: 1,
        description:
          "Normal travel precautions are recommended, particularly in crowded locations."
      }
    },

    seasonalRisks: {
      summer: 2,
      monsoon: 2,
      winter: 1,
      spring: 2,
      autumn: 2
    }
  },

  mumbai: {
    name: "Mumbai",
    region: "West India",
    description:
      "A major coastal metropolis with extensive transport networks and busy urban areas.",

    risks: {
      weather: {
        level: 2,
        description:
          "Heavy monsoon rainfall can cause temporary flooding and transport delays."
      },
      health: {
        level: 2,
        description:
          "Stay hydrated and take normal urban health precautions."
      },
      transportation: {
        level: 3,
        description:
          "Traffic, heavy rain and high passenger volumes can cause significant delays."
      },
      safety: {
        level: 2,
        description:
          "Protect valuables and use trusted transport options in crowded areas."
      }
    },

    seasonalRisks: {
      summer: 2,
      monsoon: 3,
      winter: 1,
      spring: 2,
      autumn: 2
    }
  }
};


const RISK_LEVELS = {
  1: {
    label: "Low",
    className: "low"
  },

  2: {
    label: "Moderate",
    className: "moderate"
  },

  3: {
    label: "High",
    className: "high"
  }
};


const TRIP_TYPE_RECOMMENDATIONS = {
  leisure: [
    {
      category: "Planning",
      title: "Keep flexible travel plans",
      description:
        "Avoid scheduling important activities too tightly together so you have room for unexpected delays."
    },
    {
      category: "Documents",
      title: "Back up your travel documents",
      description:
        "Keep digital copies of your identity documents, tickets and accommodation details."
    }
  ],

  adventure: [
    {
      category: "Adventure",
      title: "Check activity coverage",
      description:
        "If you purchase travel protection, check whether your planned adventure activities are covered and review exclusions."
    },
    {
      category: "Safety",
      title: "Share your itinerary",
      description:
        "Share important route and activity information with a trusted person before heading into remote areas."
    }
  ],

  family: [
    {
      category: "Family",
      title: "Prepare a family emergency kit",
      description:
        "Carry essential medication, identification, emergency contacts and age-appropriate necessities."
    },
    {
      category: "Documents",
      title: "Keep children's documents accessible",
      description:
        "Keep copies of identification and relevant travel documents for every family member."
    }
  ],

  business: [
    {
      category: "Business",
      title: "Protect important work documents",
      description:
        "Maintain secure digital backups of essential work files and travel documents."
    },
    {
      category: "Disruption",
      title: "Plan for schedule changes",
      description:
        "Allow buffer time around important meetings and consider flexible booking options."
    }
  ],

  solo: [
    {
      category: "Safety",
      title: "Share your emergency contact",
      description:
        "Keep a trusted contact informed about your accommodation and major travel plans."
    },
    {
      category: "Planning",
      title: "Keep backup payment options",
      description:
        "Carry more than one secure payment method in case a card or device becomes unavailable."
    }
  ]
};


const BASE_CHECKLIST = [
  {
    id: "documents",
    title: "Save digital copies of important documents",
    category: "Documents"
  },
  {
    id: "booking",
    title: "Save tickets and accommodation confirmations",
    category: "Documents"
  },
  {
    id: "contacts",
    title: "Save emergency and trusted contacts",
    category: "Emergency"
  },
  {
    id: "medical",
    title: "Pack essential medication and prescriptions",
    category: "Health"
  },
  {
    id: "payment",
    title: "Prepare backup payment methods",
    category: "Money"
  },
  {
    id: "policy",
    title: "Review any travel protection or insurance policy",
    category: "Protection"
  },
  {
    id: "cancellation",
    title: "Check cancellation and refund conditions",
    category: "Protection"
  },
  {
    id: "baggage",
    title: "Record baggage details and keep valuables accessible",
    category: "Baggage"
  },
  {
    id: "weather",
    title: "Check the latest destination weather conditions",
    category: "Weather"
  },
  {
    id: "advisories",
    title: "Check official local travel advisories",
    category: "Safety"
  }
];


if (typeof module !== "undefined") {
  module.exports = {
    TRAVEL_PROTECTION_DESTINATIONS,
    RISK_LEVELS,
    TRIP_TYPE_RECOMMENDATIONS,
    BASE_CHECKLIST
  };
}
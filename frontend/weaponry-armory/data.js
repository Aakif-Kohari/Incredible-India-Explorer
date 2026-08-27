const armoryData = {
  artifacts: [
    {
      name: "Urumi",
      type: "Flexible Sword",
      region: "South India",
      period: "Ancient / Medieval",
      associations: ["Cholas", "Cheras", "Kalaripayattu traditions"],
      material: "Flexible Steel, Brass, Wood",
      description: "A flexible, whip-like sword originating from the Indian subcontinent. It features one or more metal bands attached to a single handle. The Urumi is treated as both a steel whip and a sword.",
      significance: "An important example of South Indian martial arts (Kalaripayattu). Its flexible design required extraordinary skill to wield without injuring the wielder.",
      physicsPrinciple: "Flexibility & Elastic Deformation",
      icon: "〰️"
    },
    {
      name: "Katar",
      type: "Push Dagger",
      region: "North & Central India",
      period: "Medieval / Early Modern",
      associations: ["Rajputs", "Mughals", "Marathas"],
      material: "Steel (often Wootz), Gold inlay (Koftgari)",
      description: "A distinctive push-dagger characterized by its H-shaped horizontal hand grip. The blade sits above the user's knuckles.",
      significance: "A status symbol among Rajput and Mughal nobility, often highly decorated. It represents India's unique contribution to dagger design.",
      physicsPrinciple: "Force Transfer & Ergonomics",
      icon: "🗡️"
    },
    {
      name: "Chakram",
      type: "Projectile Weapon",
      region: "North India",
      period: "Ancient to Modern",
      associations: ["Sikh martial traditions", "Akali Nihangs"],
      material: "Steel, Brass",
      description: "A circular throwing weapon with a sharpened outer edge. It ranges in size and was traditionally worn on the arms or turbans.",
      significance: "Deeply rooted in Indian mythology and later became the signature weapon of the Sikh Nihangs.",
      physicsPrinciple: "Rotational Motion & Aerodynamics",
      icon: "⭕"
    },
    {
      name: "Talwar",
      type: "Curved Sword",
      region: "North & Central India",
      period: "Medieval",
      associations: ["Rajputs", "Mughals", "Marathas"],
      material: "Crucible Steel (Wootz), Iron, Brass",
      description: "The traditional curved sword of the Indian subcontinent. It features a characteristic hilt with a disc pommel that secures the wrist.",
      significance: "The most ubiquitous sword type in Indian history, serving as both a primary cavalry weapon and a ceremonial object.",
      physicsPrinciple: "Center of Mass & Edge Geometry",
      icon: "⚔️"
    },
    {
      name: "Bhuj",
      type: "Polearm / Axe-Dagger",
      region: "Western India (Gujarat / Sindh)",
      period: "Early Modern",
      associations: ["Kutch region", "Rajputs"],
      material: "Steel, Brass, Wood, Silver",
      description: "Often called an 'elephant knife', it has a short, heavy blade mounted on a metal-reinforced haft, usually concealing a small dagger in the handle.",
      significance: "Showcases the regional craftsmanship of Kutch, known for exquisite silver chasing and heavy, practical designs.",
      physicsPrinciple: "Leverage & Momentum",
      icon: "🪓"
    },
    {
      name: "Khanda",
      type: "Straight Sword",
      region: "North & West India",
      period: "Ancient / Medieval",
      associations: ["Rajputs", "Sikhs", "Marathas"],
      material: "Steel",
      description: "A double-edged straight sword with a widening, blunt tip. It usually features a basket hilt.",
      significance: "Revered in Sikhism and Rajput traditions, it symbolizes divine knowledge and martial prowess.",
      physicsPrinciple: "Impact Distribution",
      icon: "🗡️"
    },
    {
      name: "Bichwa",
      type: "Dagger",
      region: "Central & Western India",
      period: "Medieval",
      associations: ["Marathas", "Deccan Sultanates"],
      material: "Steel, Brass",
      description: "A loop-hilted dagger with a double-curved blade, translating to 'scorpion sting'.",
      significance: "Designed for close-quarters stealth and often concealed. Commonly associated with Maratha infantry.",
      physicsPrinciple: "Concealment & Curvature",
      icon: "🦂"
    },
    {
      name: "Dhal",
      type: "Shield",
      region: "Pan-India",
      period: "Ancient to Colonial",
      associations: ["All Major Indian Empires"],
      material: "Rhinoceros Hide, Buffalo Leather, Steel, Brass",
      description: "A traditional circular shield, often convex, adorned with four metal bosses (phool) that secure the handles on the reverse.",
      significance: "The primary defensive tool across the subcontinent, showcasing remarkable leather-hardening techniques and metalwork.",
      physicsPrinciple: "Force Distribution & Curvature",
      icon: "🛡️"
    },
    {
      name: "Composite Bow",
      type: "Ranged Weapon",
      region: "North & Central India",
      period: "Ancient to Early Modern",
      associations: ["Mughals", "Rajputs"],
      material: "Horn, Wood, Sinew, Lacquer",
      description: "A highly engineered bow made by laminating different materials to maximize energy storage and release.",
      significance: "Crucial for cavalry archers. The Indian variants (often crab-bows) were heavily lacquered to protect the hide glue from the monsoon humidity.",
      physicsPrinciple: "Elastic Potential Energy",
      icon: "🏹"
    },
    {
      name: "Bhala",
      type: "Spear",
      region: "Pan-India",
      period: "Ancient to Modern",
      associations: ["Marathas", "Rajputs", "Cholas"],
      material: "Wood, Bamboo, Steel",
      description: "A traditional spear, ranging from lightweight throwing javelins to heavy cavalry lances.",
      significance: "The backbone weapon of historical infantry and cavalry formations across the subcontinent.",
      physicsPrinciple: "Kinetic Energy & Penetration",
      icon: "🖊️"
    },
    {
      name: "Dandpatta",
      type: "Gauntlet Sword",
      region: "Western & Central India",
      period: "Medieval",
      associations: ["Marathas", "Mughals"],
      material: "Flexible Steel, Brass, Iron",
      description: "A straight, double-edged, flexible blade attached to a metal gauntlet that protects the hand and forearm.",
      significance: "A highly specialized infantry weapon, famously utilized by Maratha warriors to break enemy cavalry lines.",
      physicsPrinciple: "Extension & Wrist Mechanics",
      icon: "🤺"
    },
    {
      name: "Zirh Bakhtar",
      type: "Chainmail / Armor",
      region: "North India",
      period: "Medieval",
      associations: ["Mughals", "Rajputs"],
      material: "Riveted Iron/Steel Rings",
      description: "A shirt of interlocking metal rings, often combined with solid steel plates (mail-and-plate armor) for vital areas.",
      significance: "Provided a balance of protection and flexibility in the intense heat of the Indian subcontinent.",
      physicsPrinciple: "Kinetic Energy Dissipation",
      icon: "🥋"
    }
  ],
  empires: [
    {
      name: "Rajput Weaponry",
      description: "Rajput martial culture placed immense significance on weaponry, treating swords (like the Talwar and Khanda) as sacred objects. Their armory featured highly decorated hilts, Wootz steel blades, and intricate gold inlay (Koftgari).",
      highlights: ["Talwar", "Katar", "Spear", "Dhal", "Khanda"]
    },
    {
      name: "Maratha Weaponry",
      description: "Maratha military strategy relied heavily on speed, mobility, and guerrilla tactics. Their weapons, such as the Dandpatta (gauntlet sword) and Bichwa (scorpion dagger), were designed for rapid cavalry engagements and close-quarters combat.",
      highlights: ["Talwar", "Bhala", "Dandpatta", "Bichwa"]
    },
    {
      name: "Mughal Weaponry",
      description: "Mughal armories blended Central Asian/Persian influences with indigenous Indian craftsmanship. They were renowned for exquisite decorative arts, jade hilts, composite bows, and early matchlock firearms.",
      highlights: ["Talwar", "Katar", "Composite Bows", "Matchlocks", "Chainmail"]
    },
    {
      name: "Chola & South Indian Traditions",
      description: "South Indian martial traditions, such as Kalaripayattu, utilized unique weapons adapted to the environment. The metallurgy here was advanced, producing exceptional crucible steel, and gave rise to highly specialized weapons like the flexible Urumi.",
      highlights: ["Urumi", "Spears", "Bows", "Shields"]
    }
  ],
  physics: [
    {
      title: "Flexibility (Urumi)",
      concept: "Elastic Deformation",
      description: "Unlike rigid swords, the Urumi relies on elastic deformation. The thin steel blade can bend significantly without permanent distortion (plastic deformation). This flexibility allows it to store and release energy, creating a whip-like motion that can bypass conventional blocks.",
      icon: "〰️"
    },
    {
      title: "Rotational Motion (Chakram)",
      concept: "Angular Momentum",
      description: "When thrown, the Chakram relies on angular momentum to maintain stability in flight (gyroscopic stability). By spinning rapidly, it resists external forces (like wind) that would otherwise alter its trajectory, ensuring an aerodynamic and accurate flight path.",
      icon: "⭕"
    },
    {
      title: "Balance (Sword Design)",
      concept: "Center of Mass",
      description: "The handling of a sword depends on its center of mass and moment of inertia. Indian swords like the Talwar often have a balance point closer to the hilt for agility, while the disc-pommel restricts wrist movement, encouraging powerful, drawing cuts originating from the shoulder.",
      icon: "⚖️"
    },
    {
      title: "Force Distribution (Shields)",
      concept: "Impact Absorption",
      description: "The convex curvature of the traditional Indian Dhal shield serves a specific physical purpose: it deflects incoming strikes by altering the angle of impact, forcing blades to glance off rather than absorb the full kinetic energy perpendicularly.",
      icon: "🛡️"
    }
  ],
  metallurgy: {
    title: "Wootz Steel: India's Metallurgical Marvel",
    description: "Wootz steel, originating in South India around the 6th century BCE, is a pioneering high-carbon crucible steel. It was highly sought after globally (famously exported to the Middle East to forge Damascus steel blades).",
    flow: [
      { step: "Raw Materials", detail: "Iron ore, carbon sources (wood/leaves), and glass." },
      { step: "Crucible Firing", detail: "Sealed in a clay crucible and heated in a charcoal furnace." },
      { step: "Crucible Steel", detail: "The carbon diffuses into the iron matrix, creating a high-carbon alloy (1-2% carbon)." },
      { step: "Controlled Cooling", detail: "Extremely slow cooling allows the formation of distinct carbide bands." },
      { step: "Forging", detail: "Forged at strict temperature ranges to preserve the carbide structures." },
      { step: "Distinct Microstructure", detail: "Results in a blade with a characteristic 'watered' or 'damask' surface pattern and exceptional sharpness/durability." }
    ]
  },
  filters: {
    regions: ["All Regions", "North India", "South India", "East India", "West India", "Central India", "Pan-India", "North & Central India", "Western & Central India", "North & West India"],
    types: ["All Types", "Sword", "Dagger", "Polearm", "Projectile", "Ranged", "Shield", "Armor"],
    materials: ["All Materials", "Steel", "Wood", "Leather", "Brass", "Bronze"]
  }
};

export default armoryData;

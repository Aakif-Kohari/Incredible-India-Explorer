// Indian Heritage Crafts Workshop — Data Module

const CRAFT_TRADITIONS = [
  { id: "pottery", name: "Indian Pottery & Ceramics", icon: "🏺", origin: "Pan-India (Indus Valley)", period: "3300 BCE", description: "One of India's oldest crafts. From terracotta figurines of Harappa to blue pottery of Jaipur and black pottery of Nizamabad — each region has evolved distinctive ceramic traditions.", techniques: ["Wheel throwing", "Coil building", "Slab construction", "Glazing", "Kiln firing"], subtypes: [
    { name: "Blue Pottery (Jaipur)", desc: "Persian-influenced blue-glazed pottery using quartz and stone ash instead of clay. Intricate floral and geometric patterns in cobalt blue.", gi: "Yes", difficulty: "Advanced" },
    { name: "Terracotta (Bankura)", desc: "Red clay pottery with rustic charm. The Bankura horse is an iconic symbol of Indian folk art.", gi: "Yes", difficulty: "Beginner" },
    { name: "Black Pottery (Nizamabad)", desc: "Lustrous black pottery with silver engravings. Made using a unique polishing technique with soapstone.", gi: "Yes", difficulty: "Advanced" },
    { name: "Puneri Pottery", desc: "Simple, functional terracotta pots with characteristic red color. Used for water storage and cooking.", gi: "No", difficulty: "Beginner" },
  ], regions: ["Jaipur", "Bankura", "Nizamabad", "Pune", "Manipur"], color: "#c2854a" },
  { id: "woodwork", name: "Wood Carving & Furniture", icon: "🪵", origin: "Pan-India", period: "Ancient (Mauryan period)", description: "From intricate Kashmir walnut wood carving to rosewood furniture of Karnataka, Indian woodcraft transforms timber into art, furniture, and spiritual objects.", techniques: ["Relief carving", "Inlay work", "Lacquer work", "Turning", "Jointing"], subtypes: [
    { name: "Kashmir Walnut Wood Carving", desc: "Exquisite floral and vine patterns carved into rich, dark walnut wood. Boxes, furniture, and decorative panels.", gi: "Yes", difficulty: "Master" },
    { name: "Saharanpur Wood Carving", desc: "Intricate jali (lattice) screens and furniture using teak and sheesham. Mughal-influenced floral motifs.", gi: "Yes", difficulty: "Advanced" },
    { name: "Sandalwood Carving (Mysore)", desc: "Fragrant sandalwood carved into miniature sculptures, deities, and decorative items. Highly aromatic and valuable.", gi: "Yes", difficulty: "Master" },
    { name: "Sheesham Furniture (Punjab)", desc: "Durable rosewood furniture with traditional Punjabi designs. Heavy, ornate, built to last generations.", gi: "No", difficulty: "Intermediate" },
  ], regions: ["Kashmir", "Saharanpur", "Mysore", "Punjab", "Rajasthan"], color: "#8b6914" },
  { id: "metalwork", name: "Metalwork & Brassware", icon: "⚙️", origin: "Pan-India (Taxila, Varanasi)", period: "3000 BCE", description: "India's metalworking heritage spans from Bronze Age Indus Valley bronzes to Bidriware of Karnataka and Bell Metal of Assam. Each tradition uses unique alloys and finishing techniques.", techniques: ["Casting (lost wax)", "Hammering", "Engraving", "Repoussé", "Bidri inlay"], subtypes: [
    { name: "Bidriware (Bidar)", desc: "Zinc alloy inlaid with silver, creating stark contrast. Hookahs, bowls, and jewelry with Mughal-era geometric and floral patterns.", gi: "Yes", difficulty: "Master" },
    { name: "Bell Metal (Assam)", desc: "High-tin bronze alloy producing a bell-like ring. Used for Bhortaal cymbals, betel nut cutters, and ritual objects.", gi: "Yes", difficulty: "Advanced" },
    { name: "Dhokra Art (Chhattisgarh)", desc: "4,000-year-old lost-wax casting (cire perdue). Tribal figurines, horses, elephants with characteristic rough texture.", gi: "No", difficulty: "Advanced" },
    { name: "Brass Ware (Moradabad)", desc: "The 'Brass City' produces plates, bowls, lamps, and decorative items. Hand-hammered, engraved, and polished.", gi: "Yes", difficulty: "Intermediate" },
  ], regions: ["Bidar", "Assam", "Chhattisgarh", "Moradabad", "Varanasi"], color: "#d4a017" },
  { id: "stonework", name: "Stone Carving & Sculpture", icon: "🗿", origin: "Pan-India", period: "3rd Century BCE (Mauryan)", description: "From Mauryan polished pillars to Hoysala temple carvings and marble inlay of Agra — Indian stone carving has created some of the world's most intricate architectural details.", techniques: ["Relief carving", "Inlay (Pietra Dura)", "Polishing", "Stone mosaic", "Sculpting"], subtypes: [
    { name: "Pietra Dura (Agra)", desc: "Semi-precious stone inlay on marble — the technique used in the Taj Mahal. Precisely cut lapis lazuli, jasper, and malachite set into marble.", gi: "No", difficulty: "Master" },
    { name: "Hoysala Sculpture (Karnataka)", desc: "Soapstone carvings of extraordinary detail. Temple walls covered with thousands of figures, each with unique expressions.", gi: "No", difficulty: "Master" },
    { name: "Marble Carving (Rajasthan)", desc: "White Makrana marble carved into lattices (jalis), statues, and decorative elements. Used in palaces and temples.", gi: "No", difficulty: "Advanced" },
  ], regions: ["Agra", "Halebidu", "Makrana", "Madurai"], color: "#7c7c7c" },
  { id: "bamboo", name: "Bamboo & Cane Crafts", icon: "🎋", origin: "Northeast India", period: "Ancient", description: "India's bamboo crafts span from Assamese 'Jaapi' hats to Manipuri mats and Tripura's intricate cane furniture. Bamboo is called the 'green gold' of India's northeast.", techniques: ["Splitting", "Weaving", "Bending", "Lacquering", "Dyeing"], subtypes: [
    { name: "Jaapi (Assam)", desc: "Traditional conical hat woven from bamboo and tokou palm leaves. Decorated with colorful borders, symbol of Assamese culture.", gi: "No", difficulty: "Intermediate" },
    { name: "Manipuri Mats", desc: "Finely woven bamboo mats with intricate geometric patterns. Used as flooring, wall decoration, and ritual items.", gi: "No", difficulty: "Intermediate" },
    { name: "Cane Furniture (Tripura)", desc: "Elegant furniture woven from cane and rattan. Lightweight, durable, and naturally beautiful.", gi: "No", difficulty: "Beginner" },
  ], regions: ["Assam", "Manipur", "Tripura", "Mizoram", "Nagaland"], color: "#6b8e23" },
  { id: "leather", name: "Leather Crafts & Juttis", icon: "👞", origin: "Rajasthan & Punjab", period: "Medieval", description: "From colorful Rajasthani juttis to Amritsar's mojari and Kolhapuri chappals — Indian leather craft combines functionality with vibrant embellishment.", techniques: ["Tanning (vegetable)", "Embossing", "Stitching", "Dyeing", "Embroidery"], subtypes: [
    { name: "Kolhapuri Chappal (Maharashtra)", desc: "Hand-stitched T-strap leather sandals. Vegetable-tanned, naturally brown, becoming more comfortable with wear. Iconic and timeless.", gi: "Yes", difficulty: "Intermediate" },
    { name: "Rajasthani Jutti (Jodhpur)", desc: "Colorful embroidered leather shoes with curled tips. Mirror work, thread work, and beadwork create festive designs.", gi: "No", difficulty: "Intermediate" },
    { name: "Mojari (Punjab)", desc: "Traditional Punjabi leather footwear with intricate embroidery. Worn at weddings and festivals.", gi: "No", difficulty: "Intermediate" },
  ], regions: ["Kolhapur", "Jodhpur", "Amritsar", "Jaipur"], color: "#8b4513" },
];

const TOOLS_AND_MATERIALS = [
  { name: "Charkha (Spinning Wheel)", craft: "Textiles", description: "Hand-operated spinning wheel used to spin cotton, silk, or wool fibers into yarn. Mahatma Gandhi popularized it as a symbol of self-reliance.", icon: "🪡", region: "Pan-India" },
  { name: "Pit Loom", craft: "Textiles", description: "Traditional loom set in a pit where the weaver sits at ground level. Used for Banarasi, Chanderi, and many other handloom fabrics.", icon: "🧵", region: "North India" },
  { name: "Kalam (Pen)", craft: "Painting", description: "Bamboo pen used for Kalamkari painting on fabric. The tip is sharpened and dipped in natural dyes for freehand drawing.", icon: "✒️", region: "Andhra Pradesh" },
  { name: "Aari Needle", craft: "Embroidery", description: "Fine hooked needle used for chain-stitch embroidery. Creates the characteristic Kashmiri aari work and Lucknow chikankari.", icon: "🪡", region: "Kashmir, UP" },
  { name: "Lacquer Stick", craft: "Woodwork", description: "Colored lacquer rods heated and applied to wood surfaces. Used in Kashmiri woodwork and lac bangle making.", icon: "🔴", region: "Kashmir, Rajasthan" },
  { name: "Lost Wax (Cire Perdue)", craft: "Metalwork", description: "4,000-year-old casting technique. A wax model is coated in clay, heated to melt wax out, then molten metal is poured in. Each piece is unique.", icon: "🔥", region: "Chhattisgarh, Kerala" },
  { name: "Natural Dye Kit", craft: "Dyeing", description: "Indigo (blue), madder (red), turmeric (yellow), pomegranate (green), iron rust (black). Traditional dyes used for centuries in Indian textiles.", icon: "🎨", region: "Pan-India" },
  { name: "Stone Chisel Set", craft: "Sculpture", description: "Hand-forged steel chisels of various shapes for stone carving. From fine detail work to rough shaping.", icon: "🔨", region: "Pan-India" },
];

const CRAFT_AWARDS = [
  { name: "Shilp Guru", description: "National award for master craftsmen. Recognizes exceptional skill and contribution to traditional crafts.", icon: "🏆" },
  { name: "National Merit Certificate", description: "Awarded to outstanding artisans for excellence in traditional craftsmanship.", icon: "📜" },
  { name: "State Handicrafts Award", description: "State-level recognition for artisans who preserve and innovate traditional craft forms.", icon: "🏅" },
  { name: "GI Geographical Indication", description: "Legal protection ensuring authenticity. Only crafts from specific regions with traditional methods qualify.", icon: "🏷️" },
];

const CRAFT_STATS = [
  { value: "7M+", label: "Artisans & Craftspersons", icon: "👥", color: "#f59e0b" },
  { value: "350+", label: "Distinct Craft Forms", icon: "🎨", color: "#ef4444" },
  { value: "₹1.2L Cr", label: "Annual Handicraft Exports", icon: "🌍", color: "#22c55e" },
  { value: "28", label: "GI-Tagged Crafts", icon: "🏷️", color: "#06b6d4" },
  { value: "200+", label: "Craft Clusters Across India", icon: "📍", color: "#a855f7" },
  { value: "5,000+ Yrs", label: "Oldest Craft Traditions", icon: "⏳", color: "#ec4899" },
];

const WORKSHOP_TIPS = [
  { title: "Support Artisan Clusters", icon: "🏘️", body: "Visit craft clusters like Moradabad (brass), Saharanpur (wood), Puri (pattachitra), or Bagru (block printing) to buy directly from artisans. Fair prices, authentic crafts, and cultural immersion.", color: "#22c55e" },
  { title: "Learn the Craft", icon: "📚", body: "Many organizations offer workshops: Crafts Museum (Delhi), Kalagram (Chandigarh), Dastkari Haat (Delhi). Learn block printing in Jaipur, pottery in Khurja, or woodwork in Saharanpur.", color: "#06b6d4" },
  { title: "Check GI Tags", icon: "🏷️", body: "Geographical Indication tags guarantee authenticity and origin. Look for GI labels when buying — it ensures you're getting genuine, traditionally-made products and supporting the right communities.", color: "#f59e0b" },
  { title: "Preserve Knowledge", icon: "📖", body: "Many craft traditions face extinction. Support documentation projects, craft schools, and apprenticeship programs. Organizations like Dastkari, Craft Council, and TRIFED work to preserve heritage.", color: "#a855f7" },
  { title: "Sustainable Choices", icon: "♻️", body: "Handcrafted items are inherently sustainable: locally sourced materials, zero electricity, hand-powered, biodegradable, and supporting livelihoods. Each purchase is an act of conservation.", color: "#22c55e" },
  { title: "Modern Applications", icon: "💡", body: "Indian crafts are adapting to modern markets: Bidriware jewelry, Dhokra home décor, Kalamkari fashion, Pottery ceramics. Supporting innovation keeps traditions alive while making them commercially viable.", color: "#ec4899" },
];

// Indian Spices Glossary Logic

(function() {
  const spices = [
    {
      id: "saffron",
      name: "Saffron (Kesar)",
      icon: "🏵️",
      origin: "Kashmir (Pampore region)",
      culinary: "Used to flavor and color biryanis, sweets (like Kheer and Rasmalai), and rich curries.",
      history: "Known as 'Red Gold', it has been traded since ancient times. It was highly valued by ancient Greeks, Romans, and later the Mughals who cultivated it extensively in Kashmir.",
      medicinal: "Rich in antioxidants. Traditionally used to improve mood, treat respiratory ailments, and promote glowing skin."
    },
    {
      id: "cardamom",
      name: "Cardamom (Elaichi)",
      icon: "🌱",
      origin: "Western Ghats, Kerala (Cardamom Hills)",
      culinary: "The 'Queen of Spices' is essential in Masala Chai, garam masala, and various Indian sweets and savory dishes.",
      history: "Traded along the ancient spice routes to the Middle East and Europe. The Vikings encountered it in Constantinople and brought it to Scandinavia.",
      medicinal: "Acts as a digestive aid, breath freshener, and has anti-inflammatory properties."
    },
    {
      id: "turmeric",
      name: "Turmeric (Haldi)",
      icon: "🫚",
      origin: "Southern and Eastern India",
      culinary: "Provides the distinct yellow color in Indian curries. Essential in almost all dal and vegetable preparations.",
      history: "Used in India for over 4,000 years. It reached China by 700 AD, East Africa by 800 AD, and West Africa by 1200 AD. Marco Polo described it in 1280.",
      medicinal: "Contains Curcumin, a powerful anti-inflammatory and antioxidant. Used in Ayurvedic medicine for wounds, skin conditions, and joint pain."
    },
    {
      id: "clove",
      name: "Clove (Laung)",
      icon: "🤎",
      origin: "Kerala and Tamil Nadu (Originally from Maluku Islands)",
      culinary: "Used whole in rice dishes (Pulao/Biryani) and ground in garam masala. Adds intense warmth and sweetness.",
      history: "One of the most highly prized spices in the medieval world. The search for cloves and nutmeg drove the European Age of Discovery.",
      medicinal: "Contains Eugenol, a natural anesthetic. Traditionally used for toothaches, oral health, and digestion."
    },
    {
      id: "black-pepper",
      name: "Black Pepper (Kali Mirch)",
      icon: "⚫",
      origin: "Malabar Coast (Kerala)",
      culinary: "The 'King of Spices' adds pungent heat to curries, marinades, and is a key ingredient in garam masala.",
      history: "Known as 'Black Gold'. It was so valuable it was used as currency. The desire to monopolize its trade led Vasco da Gama to discover the sea route to India in 1498.",
      medicinal: "Contains Piperine, which enhances nutrient absorption (especially curcumin). Also acts as a digestive stimulant."
    },
    {
      id: "cumin",
      name: "Cumin (Jeera)",
      icon: "🌾",
      origin: "Gujarat and Rajasthan",
      culinary: "Roasted and ground, or used whole in 'tadka' (tempering). Fundamental to Indian cooking, providing an earthy, warm flavor.",
      history: "Cultivated in India, Egypt, and the Middle East since antiquity. The ancient Greeks kept cumin at the dining table much like we keep pepper today.",
      medicinal: "Promotes digestion, provides iron, and may improve blood cholesterol."
    },
    {
      id: "coriander",
      name: "Coriander (Dhania)",
      icon: "🌿",
      origin: "Rajasthan, Madhya Pradesh",
      culinary: "The seeds provide a citrusy, nutty flavor. It is the base of most Indian curry powders and masalas.",
      history: "One of the oldest known spices, found in the tomb of Tutankhamun. Traded extensively across the ancient world.",
      medicinal: "Known for cooling properties. Aids digestion, manages blood sugar, and has antimicrobial effects."
    },
    {
      id: "cinnamon",
      name: "Cinnamon / Cassia (Dalchini)",
      icon: "🪵",
      origin: "Western Ghats (Cassia bark)",
      culinary: "Used in whole form to flavor rice dishes and ground in dessert preparations and complex curries.",
      history: "Highly prized in ancient Egypt and Rome. Arab traders kept its source a secret for centuries, claiming it was guarded by giant birds.",
      medicinal: "Helps regulate blood sugar, possesses strong antioxidant properties, and fights inflammation."
    },
    {
      id: "fenugreek",
      name: "Fenugreek (Methi)",
      icon: "🌰",
      origin: "Rajasthan, Gujarat",
      culinary: "Seeds add a complex bitterness to curries and pickles. Leaves (fresh or dried 'Kasuri Methi') are used as an herb.",
      history: "Used heavily in ancient Egyptian embalming and incense. It has been a staple in Indian cooking and medicine for millennia.",
      medicinal: "Traditionally used to enhance milk production in nursing mothers and to regulate blood sugar levels."
    },
    {
      id: "mustard-seeds",
      name: "Mustard Seeds (Rai/Sarson)",
      icon: "🟡",
      origin: "Northern and Eastern India",
      culinary: "Essential in South Indian tempering (tadka) and Bengali fish curries. The oil is also a primary cooking medium in North/East India.",
      history: "Cultivated in the Indus Valley Civilization as early as 1800 BC. The Romans were the first to experiment with making a paste (mustard as a condiment).",
      medicinal: "Rich in selenium and magnesium. Used topically as an oil for massage to relieve muscle pain."
    },
    {
      id: "nutmeg",
      name: "Nutmeg & Mace (Jaiphal / Javitri)",
      icon: "🥜",
      origin: "Kerala (Originally from Banda Islands)",
      culinary: "Used sparingly in rich Mughlai curries, biryanis, and traditional sweets for a warm, sweet, and complex flavor.",
      history: "A single seed produces two spices: Nutmeg (seed) and Mace (aril). The Dutch waged wars to control the global monopoly of these spices in the 17th century.",
      medicinal: "Used in small doses as a sleep aid, pain reliever, and digestive stimulant in Ayurveda."
    },
    {
      id: "asafoetida",
      name: "Asafoetida (Hing)",
      icon: "🪨",
      origin: "Imported primarily from Afghanistan/Iran, heavily used in India",
      culinary: "Used in tiny pinches in hot oil (tadka) to flavor dals and vegetable dishes. It mimics the savory flavor of onions and garlic.",
      history: "Brought to India by the Mughals. Known in the West as 'Devil's Dung' due to its pungent raw smell, but it transforms completely when cooked.",
      medicinal: "An essential digestive aid in Indian cooking, particularly for legume and lentil dishes. Helps prevent bloating and flatulence."
    }
  ];

  const spiceGrid = document.getElementById('spiceGrid');
  const modal = document.getElementById('spiceModal');
  const closeModalBtn = document.getElementById('closeModal');

  // Modal Elements
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalOrigin = document.getElementById('modalOrigin');
  const modalCulinary = document.getElementById('modalCulinary');
  const modalHistory = document.getElementById('modalHistory');
  const modalMedicinal = document.getElementById('modalMedicinal');

  // Generate Grid
  spices.forEach((spice, index) => {
    const card = document.createElement('div');
    card.className = 'spice-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Learn about ${spice.name}`);
    
    card.innerHTML = `
      <div class="spice-icon">${spice.icon}</div>
      <h2 class="spice-title">${spice.name}</h2>
    `;

    // Interaction
    card.addEventListener('click', () => openModal(spice));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(spice);
      }
    });

    spiceGrid.appendChild(card);
  });

  // Modal Logic
  function openModal(spice) {
    modalIcon.textContent = spice.icon;
    modalTitle.textContent = spice.name;
    modalOrigin.textContent = spice.origin;
    modalCulinary.textContent = spice.culinary;
    modalHistory.textContent = spice.history;
    modalMedicinal.textContent = spice.medicinal;

    modal.setAttribute('aria-hidden', 'false');
    closeModalBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  closeModalBtn.addEventListener('click', closeModal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

})();

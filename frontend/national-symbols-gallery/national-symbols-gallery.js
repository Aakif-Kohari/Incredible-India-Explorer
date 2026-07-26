/* ==========================================================================
   NATIONAL SYMBOLS INTERACTIVE GALLERY
   Renders India's 10 national symbols with history, significance,
   and interesting facts, with category filtering and search.
   ========================================================================== */

const nationalSymbols = [
  {
    id: "flag",
    icon: "🇮🇳",
    category: "identity",
    type: "National Flag",
    title: "The Tricolour (Tiranga)",
    name: "Saffron, White and Green with the Ashoka Chakra",
    history: "Adopted by the Constituent Assembly on 22 July 1947, just weeks before independence, the current design evolved from earlier versions used during the freedom movement, replacing the charkha (spinning wheel) with the Ashoka Chakra.",
    significance: "Saffron represents courage and sacrifice, white represents truth and peace, and green represents faith and prosperity. The navy-blue Ashoka Chakra with 24 spokes represents the eternal wheel of law (dharma).",
    facts: [
      "Since a 30 December 2021 amendment to the Flag Code, the flag may also be machine-made from polyester and other materials, in addition to hand-spun khadi.",
      "The Ashoka Chakra is adapted from the abacus of the Lion Capital of Ashoka at Sarnath.",
      "The flag's height-to-width ratio is fixed at 2:3."
    ]
  },
  {
    id: "anthem",
    icon: "🎼",
    category: "identity",
    type: "National Anthem",
    title: "Jana Gana Mana",
    name: "Written by Rabindranath Tagore",
    history: "Originally composed in Bengali by Rabindranath Tagore in 1911, it was first sung publicly in Calcutta and later adopted as India's national anthem by the Constituent Assembly on 24 January 1950.",
    significance: "The anthem invokes unity across India's diverse regions, peoples, and religions, praising the 'dispenser of India's destiny' and celebrating the nation's geographic and cultural breadth.",
    facts: [
      "Tagore is the only person to have written the national anthems of two countries — India and Bangladesh.",
      "The full anthem has five stanzas; only the first is used as the official national anthem.",
      "Playing time for the full official version is approximately 52 seconds."
    ]
  },
  {
    id: "song",
    icon: "🎵",
    category: "identity",
    type: "National Song",
    title: "Vande Mataram",
    name: "Written by Bankim Chandra Chattopadhyay",
    history: "Composed in Sanskrit and Bengali by Bankim Chandra Chattopadhyay, it first appeared in his 1882 novel Anandamath and became a rallying cry during India's independence movement.",
    significance: "The song personifies India as a mother goddess, and became deeply associated with the freedom struggle, inspiring generations of nationalist leaders and revolutionaries.",
    facts: [
      "It was given equal status with the national anthem by the Constituent Assembly in January 1950.",
      "Its singing at Congress sessions dates back to the early 20th century.",
      "Only the first two stanzas are typically sung on official occasions."
    ]
  },
  {
    id: "animal",
    icon: "🐅",
    category: "wildlife",
    type: "National Animal",
    title: "Royal Bengal Tiger",
    name: "Panthera tigris tigris",
    history: "The tiger replaced the lion as India's national animal in 1973, the same year 'Project Tiger' was launched to protect the species from declining numbers due to poaching and habitat loss.",
    significance: "The tiger symbolises strength, power, and grace, and is central to India's efforts in wildlife conservation and maintaining ecological balance in forest ecosystems.",
    facts: [
      "India is home to over 70% of the world's wild tiger population.",
      "Project Tiger began with 9 reserves in 1973 and has since expanded to over 50.",
      "A tiger's stripe pattern is unique to each individual, much like a human fingerprint."
    ]
  },
  {
    id: "bird",
    icon: "🦚",
    category: "wildlife",
    type: "National Bird",
    title: "Indian Peacock",
    name: "Pavo cristatus",
    history: "Declared the national bird of India in 1963, the peacock has long held cultural and religious significance across Indian art, mythology, and royal iconography.",
    significance: "The peacock represents beauty, grace, and pride, and is associated with several Hindu deities, including as the mount (vahana) of Lord Kartikeya.",
    facts: [
      "Only the male peacock has the iconic, colourful train of feathers; females (peahens) are duller in colour.",
      "The peacock's courtship dance involves fanning out over 200 feathers.",
      "It is protected under the Wildlife Protection Act of India."
    ]
  },
  {
    id: "flower",
    icon: "🪷",
    category: "nature",
    type: "National Flower",
    title: "Lotus",
    name: "Nelumbo nucifera",
    history: "The lotus has been a central motif in Indian art, architecture, and scripture for millennia, appearing in ancient Vedic texts long before its formal designation as the national flower.",
    significance: "Rising clean from muddy waters, the lotus symbolises purity, spiritual enlightenment, and resilience, and is closely associated with several Hindu and Buddhist deities.",
    facts: [
      "The lotus can remain dormant as a seed for centuries and still germinate.",
      "It is the state flower of several Indian states in addition to being the national flower.",
      "Lotus motifs appear throughout classical Indian temple carvings and architecture."
    ]
  },
  {
    id: "tree",
    icon: "🌳",
    category: "nature",
    type: "National Tree",
    title: "Banyan Tree",
    name: "Ficus benghalensis",
    history: "Recognised as India's national tree for its vast, ancient presence across the subcontinent, the banyan has long served as a natural meeting place and shelter in villages across India.",
    significance: "The banyan's ability to expand indefinitely through aerial prop roots symbolises immortality and unity, and the tree is traditionally regarded as sacred in Indian culture.",
    facts: [
      "A single banyan tree can eventually cover several acres through its spreading prop roots.",
      "The Great Banyan Tree in Kolkata's Botanical Garden is among the widest-canopied trees in the world.",
      "Village council meetings ('panchayats') were traditionally held in the shade of banyan trees."
    ]
  },
  {
    id: "river",
    icon: "🌊",
    category: "nature",
    type: "National River",
    title: "Ganga",
    name: "The Ganges",
    history: "Declared India's national river in 2008, the Ganga has been central to Indian civilisation for over 2,500 years, flowing from the Himalayas through the Gangetic plains to the Bay of Bengal.",
    significance: "Revered as a goddess in Hindu tradition, the Ganga sustains hundreds of millions of people through agriculture and drinking water while serving as a major site of pilgrimage and ritual.",
    facts: [
      "The Ganga basin supports roughly 40% of India's population.",
      "The National Mission for Clean Ganga ('Namami Gange') was launched in 2014 for its conservation.",
      "It is one of the most sediment-rich rivers in the world."
    ]
  },
  {
    id: "heritage-animal",
    icon: "🐘",
    category: "wildlife",
    type: "National Heritage Animal",
    title: "Indian Elephant",
    name: "Elephas maximus indicus",
    history: "Declared India's national heritage animal in 2010, the elephant has been part of Indian religious, cultural, and royal life for thousands of years, from temple processions to war and labour.",
    significance: "The elephant symbolises wisdom, strength, and royalty, and is associated with Lord Ganesha, one of the most widely worshipped deities in Hinduism.",
    facts: [
      "India is home to more than half of the world's Asian elephant population.",
      "Project Elephant was launched in 1992 to protect elephants and their migratory corridors.",
      "Elephants have played ceremonial roles in Indian temple festivals for centuries."
    ]
  },
  {
    id: "aquatic",
    icon: "🐬",
    category: "wildlife",
    type: "National Aquatic Animal",
    title: "Ganges River Dolphin",
    name: "Platanista gangetica",
    history: "Declared the national aquatic animal in 2009, this freshwater dolphin has inhabited the Ganga-Brahmaputra river systems for millions of years and is considered a key indicator of river health.",
    significance: "Known locally as 'Susu', the dolphin represents the ecological wellbeing of the Ganga and is featured on the emblem of the National Mission for Clean Ganga.",
    facts: [
      "The Ganges River Dolphin is functionally blind and navigates using echolocation.",
      "It is classified as endangered, with population estimates in the low thousands.",
      "Unlike marine dolphins, it cannot survive in salt water."
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("symbols-grid");
  const noResults = document.getElementById("no-results");
  const chips = document.querySelectorAll(".btn-chip");
  const searchInput = document.getElementById("symbol-search");

  const modal = document.getElementById("symbols-modal");
  const modalCard = document.querySelector(".symbols-modal-card");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalIcon = document.getElementById("modal-icon-preview");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-symbol-title");
  const modalName = document.getElementById("modal-symbol-name");
  const modalHistory = document.getElementById("modal-history");
  const modalSignificance = document.getElementById("modal-significance");
  const modalFacts = document.getElementById("modal-facts");

  let activeCategory = "all";
  let searchTerm = "";
  let modalFocusTrap = null;
  let lastFocusedCard = null;

  function renderSymbols() {
    if (!grid) return;
    grid.innerHTML = nationalSymbols
      .map(
        (symbol) => `
        <article class="symbol-card" data-symbol-id="${symbol.id}" data-category="${symbol.category}" tabindex="0" role="button" aria-label="Learn about ${symbol.title}">
          <div class="symbol-icon">${symbol.icon}</div>
          <span class="symbol-type">${symbol.type}</span>
          <h3>${symbol.title}</h3>
          <p>${symbol.significance.slice(0, 80)}${symbol.significance.length > 80 ? "…" : ""}</p>
        </article>`
      )
      .join("");

    document.querySelectorAll(".symbol-card").forEach((card) => {
      card.addEventListener("click", () => openSymbolModal(card.dataset.symbolId));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openSymbolModal(card.dataset.symbolId);
        }
      });
    });

    applyFilters();
  }

  function applyFilters() {
    let visibleCount = 0;
    document.querySelectorAll(".symbol-card").forEach((card) => {
      const symbol = nationalSymbols.find((s) => s.id === card.dataset.symbolId);
      const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
      const matchesSearch =
        !searchTerm ||
        symbol.title.toLowerCase().includes(searchTerm) ||
        symbol.type.toLowerCase().includes(searchTerm) ||
        symbol.name.toLowerCase().includes(searchTerm);

      const visible = matchesCategory && matchesSearch;
      card.classList.toggle("hidden-by-filter", !visible);
      if (visible) visibleCount++;
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.dataset.category;
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  function openSymbolModal(symbolId) {
    const symbol = nationalSymbols.find((s) => s.id === symbolId);
    if (!symbol || !modal) return;

    lastFocusedCard = document.activeElement;

    modalIcon.textContent = symbol.icon;
    modalCategory.textContent = symbol.type;
    modalTitle.textContent = symbol.title;
    modalName.textContent = symbol.name;
    modalHistory.textContent = symbol.history;
    modalSignificance.textContent = symbol.significance;
    modalFacts.innerHTML = symbol.facts
      .map((fact) => `<div class="modal-fact-item">${fact}</div>`)
      .join("");

    if (modalCard) modalCard.scrollTop = 0;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    if (typeof window.setupFocusTrap === "function" && modalCard) {
      modalFocusTrap = window.setupFocusTrap(modalCard);
    }
    modalCloseBtn?.focus();
  }

  function closeSymbolModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";

    if (modalFocusTrap) {
      modalFocusTrap.deactivate();
      modalFocusTrap = null;
    }
    if (lastFocusedCard && typeof lastFocusedCard.focus === "function") {
      lastFocusedCard.focus();
    }
  }

  modalCloseBtn?.addEventListener("click", closeSymbolModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeSymbolModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("open")) closeSymbolModal();
  });

  renderSymbols();
});
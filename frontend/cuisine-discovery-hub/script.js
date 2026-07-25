// ---------- Dish Data (20+ authentic UP dishes) ----------
const allDishes = [
  { name: "Tunday Kabab", icon: "🍢", region: "awadh", type: "main", description: "Melt-in-the-mouth minced meat kebabs from Lucknow, blended with a secret mix of over a hundred spices.", ingredients: ["Minced meat", "Raw papaya", "Spice blend", "Ghee"], fact: "Legend says these kebabs were created for a Nawab who had lost his teeth and could no longer chew tough meat." },
  { name: "Bedai", icon: "🥟", region: "braj", type: "snack", description: "A puffy, deep-fried bread stuffed with spiced lentils, served as a classic breakfast in Agra and Mathura.", ingredients: ["Wheat flour", "Urad dal", "Fennel", "Ghee"], fact: "Bedai is almost always paired with a spicy potato-pumpkin curry for a hearty breakfast combo." },
  { name: "Kachori", icon: "🥠", region: "braj", type: "snack", description: "Crispy, deep-fried pastries filled with spiced lentil or moong dal stuffing, popular across UP as a morning snack.", ingredients: ["Refined flour", "Moong dal", "Asafoetida", "Spices"], fact: "Kachori is often enjoyed with a tangy aloo sabzi and a drizzle of tamarind chutney." },
  { name: "Tehri", icon: "🍚", region: "awadh", type: "main", description: "A fragrant vegetable rice dish flavoured with whole spices, considered the vegetarian cousin of biryani.", ingredients: ["Basmati rice", "Mixed vegetables", "Whole spices", "Ghee"], fact: "Tehri is a favourite at large family feasts and community gatherings across the state." },
  { name: "Peda", icon: "🍬", region: "braj", type: "sweet", description: "A soft, semi-solid milk-based sweet from Mathura, delicately flavoured with cardamom.", ingredients: ["Khoya", "Sugar", "Cardamom"], fact: "Mathura's peda is closely tied to the region's association with Lord Krishna and dairy farming traditions." },
  { name: "Petha", icon: "🍡", region: "braj", type: "sweet", description: "A translucent, chewy candy made from ash gourd, famously associated with the city of Agra.", ingredients: ["Ash gourd", "Sugar syrup", "Lime water"], fact: "Petha comes in dozens of flavours today, including kesar, angoori, and paan." },
  { name: "Malaiyo", icon: "🍮", region: "purvanchal", type: "sweet", description: "An airy, cloud-like dessert made from whipped milk foam, traditionally prepared only in winter mornings in Varanasi.", ingredients: ["Milk", "Sugar", "Saffron", "Dew"], fact: "Malaiyo is traditionally made overnight, using the winter dew to help the milk froth up naturally." },
  { name: "Kulfi Falooda", icon: "🍨", region: "awadh", type: "sweet", description: "A rich, dense frozen dessert served with vermicelli noodles and rose syrup for a refreshing finish.", ingredients: ["Milk", "Vermicelli", "Rose syrup", "Nuts"], fact: "Unlike regular ice cream, kulfi is not churned, giving it a dense, creamy texture." },
  { name: "Galouti Kebab", icon: "🍖", region: "awadh", type: "main", description: "Ultra-soft minced meat kebabs from Lucknow's royal kitchens, designed to dissolve on the tongue.", ingredients: ["Minced mutton", "Raw papaya", "Over 20 spices"], fact: "Galouti means 'to melt', and the kebab lives up to its name with its buttery-soft texture." },
  { name: "Lucknowi Biryani", icon: "🍛", region: "awadh", type: "main", description: "A royal, aromatic rice and meat dish cooked using the slow dum pukht method for maximum flavour.", ingredients: ["Basmati rice", "Marinated meat", "Saffron", "Fried onions"], fact: "The dum pukht technique seals the pot completely, letting the dish cook in its own steam." },
  { name: "Baati Chokha", icon: "🍞", region: "purvanchal", type: "main", description: "Roasted wheat dough balls served with a smoky, spiced mash of vegetables, popular in eastern UP.", ingredients: ["Wheat flour", "Potato", "Brinjal", "Mustard oil"], fact: "Baati is traditionally roasted over hot coals or cow dung cakes for an authentic smoky flavour." },
  { name: "Litti Chokha", icon: "🥔", region: "purvanchal", type: "main", description: "Baked wheat balls stuffed with roasted gram flour, served alongside mashed spiced vegetables.", ingredients: ["Wheat flour", "Sattu", "Potato", "Ghee"], fact: "Litti is a rustic dish deeply loved across the eastern belt of Uttar Pradesh and neighbouring Bihar." },
  { name: "Banarasi Chaat", icon: "🥙", region: "purvanchal", type: "snack", description: "A tangy, spicy street food mix of crisp fritters, potatoes, and chutneys, famous in the lanes of Varanasi.", ingredients: ["Potato", "Chickpeas", "Tamarind chutney", "Yogurt"], fact: "Varanasi's chaat culture is centuries old, with some shops running in the same family for generations." },
  { name: "Aloo Tikki", icon: "🥘", region: "awadh", type: "snack", description: "Crispy shallow-fried potato patties topped with curd, chutneys, and spices — a beloved street snack.", ingredients: ["Potato", "Spices", "Curd", "Tamarind chutney"], fact: "Aloo Tikki is one of the most widely loved street snacks across all of North India." },
  { name: "Nargisi Kofta", icon: "🥚", region: "awadh", type: "main", description: "A festive dish of hard-boiled eggs wrapped in spiced minced meat, deep-fried and simmered in rich gravy.", ingredients: ["Egg", "Minced mutton", "Onion gravy", "Dry fruits"], fact: "This dish is traditionally prepared during Ramzan and festive Iftar spreads." },
  { name: "Kadhi Pakora", icon: "🥣", region: "bundelkhand", type: "main", description: "A tangy yogurt-based curry with gram flour fritters, typically served with steamed rice.", ingredients: ["Gram flour", "Yogurt", "Onion", "Spices"], fact: "Kadhi Pakora is a comfort-food staple served at homes and mid-sized eateries across the state." },
  { name: "Allahabadi Tehri", icon: "🍲", region: "purvanchal", type: "main", description: "A hearty vegetable pulao style dish from Prayagraj, made with a mix of seasonal vegetables and whole spices.", ingredients: ["Rice", "Seasonal vegetables", "Whole spices"], fact: "It's commonly prepared for big family feasts and festive occasions in the Prayagraj region." },
  { name: "Ghugni", icon: "🫘", region: "purvanchal", type: "snack", description: "A spiced curry made from dried peas or chickpeas, enjoyed as a filling evening snack.", ingredients: ["Dried peas", "Onion", "Spices", "Coriander"], fact: "Ghugni is also popular in neighbouring Bihar and West Bengal, each region adding its own twist." },
  { name: "Balushahi", icon: "🍩", region: "awadh", type: "sweet", description: "A flaky, glazed sweet with a crisp outer layer and soft, layered interior, similar to a doughnut.", ingredients: ["Refined flour", "Ghee", "Sugar syrup", "Yogurt"], fact: "Balushahi is a festive favourite, especially during Diwali and wedding celebrations." },
  { name: "Gajar Ka Halwa", icon: "🥕", region: "braj", type: "sweet", description: "A rich, slow-cooked dessert made from grated carrots simmered in milk and sweetened with sugar.", ingredients: ["Carrot", "Milk", "Sugar", "Dry fruits"], fact: "Gajar Ka Halwa is especially popular in North India during the winter carrot season." },
  { name: "Thandai", icon: "🥤", region: "braj", type: "drink", description: "A chilled, spiced milk drink made with a blend of nuts, seeds, and aromatic spices, especially popular in Mathura.", ingredients: ["Milk", "Almonds", "Fennel seeds", "Cardamom"], fact: "Thandai is traditionally associated with the festival of Holi and Lord Shiva's celebrations." },
  { name: "Dum Aloo", icon: "🥔", region: "bundelkhand", type: "main", description: "Baby potatoes slow-cooked in a rich, spiced gravy using the traditional dum method for deep flavour.", ingredients: ["Baby potatoes", "Yogurt", "Onion-tomato gravy", "Spices"], fact: "The 'dum' technique involves slow-cooking in a sealed pot, letting flavours develop gradually." }
];

// ---------- State ----------
let activeRegion = "all";
let activeType = "all";
let searchQuery = "";

// ---------- DOM References ----------
const dishGrid = document.getElementById("dishGrid");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const regionFilters = document.getElementById("regionFilters");
const typeFilters = document.getElementById("typeFilters");

const dishModalOverlay = document.getElementById("dishModalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalIcon = document.getElementById("modalIcon");
const modalRegionTag = document.getElementById("modalRegionTag");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");
const modalFact = document.getElementById("modalFact");

const regionLabels = {
  awadh: "Awadh",
  braj: "Braj",
  purvanchal: "Purvanchal",
  bundelkhand: "Bundelkhand"
};

// ---------- Render Dishes ----------
function renderDishes() {
  const filtered = allDishes.filter(dish => {
    const matchesRegion = activeRegion === "all" || dish.region === activeRegion;
    const matchesType = activeType === "all" || dish.type === activeType;
    const matchesSearch =
      searchQuery === "" ||
      dish.name.toLowerCase().includes(searchQuery) ||
      dish.description.toLowerCase().includes(searchQuery) ||
      dish.ingredients.some(ing => ing.toLowerCase().includes(searchQuery));
    return matchesRegion && matchesType && matchesSearch;
  });

  resultsCount.textContent = `Showing ${filtered.length} dish${filtered.length !== 1 ? "es" : ""}`;

  if (filtered.length === 0) {
    dishGrid.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");
  dishGrid.innerHTML = "";

  filtered.forEach(dish => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "dish-card";
    card.innerHTML = `
      <span class="dish-card-icon">${dish.icon}</span>
      <span class="dish-card-region">${regionLabels[dish.region]}</span>
      <h3 class="dish-card-name">${dish.name}</h3>
      <p class="dish-card-desc">${dish.description}</p>
      <div class="dish-card-type">${dish.type.charAt(0).toUpperCase() + dish.type.slice(1)}</div>
    `;
    card.addEventListener("click", () => openModal(dish));
    dishGrid.appendChild(card);
  });
}

// ---------- Modal ----------
function openModal(dish) {
  modalIcon.textContent = dish.icon;
  modalRegionTag.textContent = regionLabels[dish.region];
  modalTitle.textContent = dish.name;
  modalDescription.textContent = dish.description;
  modalFact.textContent = dish.fact;

  modalIngredients.innerHTML = "";
  dish.ingredients.forEach(ing => {
    const tag = document.createElement("span");
    tag.className = "ingredient-tag";
    tag.textContent = ing;
    modalIngredients.appendChild(tag);
  });

  dishModalOverlay.classList.add("active");
}

function closeModal() {
  dishModalOverlay.classList.remove("active");
}

modalCloseBtn.addEventListener("click", closeModal);
dishModalOverlay.addEventListener("click", (e) => {
  if (e.target === dishModalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------- Filters ----------
regionFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-chip");
  if (!btn) return;
  regionFilters.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeRegion = btn.dataset.region;
  renderDishes();
});

typeFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-chip");
  if (!btn) return;
  typeFilters.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeType = btn.dataset.type;
  renderDishes();
});

// ---------- Search ----------
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderDishes();
});

// ---------- Init ----------
renderDishes();
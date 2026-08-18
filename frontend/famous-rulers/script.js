/**
 * Famous Rulers of India - Explorer Interactivity
 */

// Structured Data for Rulers
const rulersData = [
  {
    name: "Chandragupta Maurya",
    era: "Ancient",
    dynasty: "Maurya",
    region: "Pan-Indian",
    reign: "c. 321 – 297 BCE",
    image: "ruler-ashoka..jpg",
    description: "Founder of the Mauryan Empire and unifier of ancient India. Mentored by Chanakya, he overthrew Nanda rule, repelled Seleucus I Nicator, and established a centralized subcontinental state.",
    link: "../chandragupta-maurya-explorer/index.html"
  },
  {
    name: "Harshavardhana",
    era: "Ancient",
    dynasty: "Pushyabhuti",
    region: "North India",
    reign: "c. 606 – 647 CE",
    image: "ruler-harshvardhana.jpeg", 
    description: "Unified the thrones of Thanesar and Kannauj, creating an expansive hegemony across northern plains. Celebrated as an accomplished playwright and noble patron of scholar Xuanzang.",
    link: "harshavardhana.html" 
  },
  {
    name: "Ashoka the Great",
    era: "Ancient",
    dynasty: "Maurya",
    region: "Pan-Indian",
    reign: "c. 268 – 232 BCE",
    image: "ruler-ashoka..jpg",
    description: "Expanded the Mauryan Empire across the subcontinent before renouncing war after Kalinga. Spread messages of Dhamma (Buddhism) through his famous rock and pillar edicts.",
    link: "../ashoka-the-great-explorer/index.html"
  },
  {
    name: "Samudragupta",
    era: "Ancient",
    dynasty: "Gupta",
    region: "North India",
    reign: "c. 335 – 375 CE",
    image: "../assets/samudragupta_veena_coin.jpg",
    description: "A brilliant military tactician and patron of the arts. His reign laid the foundation for the 'Golden Age of India', and he was known for his poetry and musical skills.",
    link: "../samudragupta-explorer/index.html"
  },
  {
    name: "Chandragupta II Vikramaditya",
    era: "Ancient",
    dynasty: "Gupta",
    region: "Pan-Indian",
    reign: "c. 375 – 415 CE",
    image: "../assets/gupta_gold_coin.jpg",
    description: "Vanquished the Western Kshatrapas, extended Gupta rule from coast to coast, ushered in classical India's Golden Age, and commissioned the Mehrauli Iron Pillar.",
    link: "../chandragupta-ii-explorer/index.html"
  },
  {
    name: "Rajaraja Chola I",
    era: "Early Medieval",
    dynasty: "Chola",
    region: "South India",
    reign: "985 – 1014 CE",
    image: "ruler-rajaraja.jpg", // Note: Add this image to your folder!
    description: "Transformed the Chola dynasty into a formidable maritime empire. He commissioned the monumental Brihadisvara Temple at Thanjavur, a UNESCO World Heritage site.",
    link: "../ruler/rajaraja-chola.html"
  },
  {
    name: "Krishnadevaraya",
    era: "Medieval",
    dynasty: "Vijayanagara",
    region: "South India",
    reign: "1509 – 1529 CE",
    image: "ruler-krishnadevaraya..jpg",
    description: "The greatest emperor of the Vijayanagara Empire. A military genius and a celebrated scholar, his reign saw exceptional architectural and literary achievements.",
    link: "../ruler/krishnadevaraya.html"
  },
  {
    name: "Akbar",
    era: "Medieval",
    dynasty: "Mughal",
    region: "Pan-Indian",
    reign: "1556 – 1605 CE",
    image: "ruler-akbar..jpg",
    description: "Vastly expanded the Mughal Empire while pioneering policies of religious tolerance (Din-i-Ilahi) and establishing a robust centralized administrative system.",
    link: "../ruler/akbar.html"
  },
  {
    name: "Chhatrapati Shivaji Maharaj",
    era: "Early Modern",
    dynasty: "Maratha",
    region: "West India",
    reign: "1674 – 1680 CE",
    image: "ruler-shivaji..webp",
    description: "Carved an independent Maratha kingdom using innovative guerrilla warfare tactics and built a powerful navy and string of coastal forts to defend his territory.",
    link: "../ruler/shivaji.html"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('rulers-grid');
  const searchInput = document.getElementById('search-ruler');
  const filterDynasty = document.getElementById('filter-dynasty');
  const filterRegion = document.getElementById('filter-region');
  const btnReset = document.getElementById('reset-filters');
  const eraCards = document.querySelectorAll('.era-card');

  // Render Function
  function renderRulers(data) {
    grid.innerHTML = '';
    if(data.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color: var(--rulers-text-muted);">No rulers found matching your criteria.</p>';
      return;
    }
    
    data.forEach(ruler => {
      const card = document.createElement('article');
      card.className = 'ruler-card';
      card.innerHTML = `
        <img src="${ruler.image}" alt="Historical representation of ${ruler.name}" class="ruler-img" loading="lazy">
        <div class="ruler-info">
          <div class="ruler-tags">
            <span class="ruler-tag">${ruler.dynasty}</span>
            <span class="ruler-tag">${ruler.region}</span>
          </div>
          <h3>${ruler.name}</h3>
          <span class="ruler-reign">${ruler.reign}</span>
          <p class="ruler-desc">${ruler.description}</p>
          <a href="${ruler.link}" class="btn-outline" aria-label="Explore history of ${ruler.name}">Explore →</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // Filter Logic
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const dynasty = filterDynasty.value;
    const region = filterRegion.value;
    // Note: Era is tracked globally or handled purely via button clicks for this basic setup.
    // For simplicity, we apply a temporary era filter if active, otherwise check standard dropdowns.
    
    const filtered = rulersData.filter(ruler => {
      const matchSearch = ruler.name.toLowerCase().includes(searchTerm) || ruler.dynasty.toLowerCase().includes(searchTerm);
      const matchDynasty = dynasty === 'all' || ruler.dynasty === dynasty;
      const matchRegion = region === 'all' || ruler.region === region;
      
      return matchSearch && matchDynasty && matchRegion;
    });

    renderRulers(filtered);
  }

  // Event Listeners
  searchInput.addEventListener('input', applyFilters);
  filterDynasty.addEventListener('change', applyFilters);
  filterRegion.addEventListener('change', applyFilters);

  btnReset.addEventListener('click', () => {
    searchInput.value = '';
    filterDynasty.value = 'all';
    filterRegion.value = 'all';
    renderRulers(rulersData);
  });

  eraCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetEra = card.getAttribute('data-era');
      const filtered = rulersData.filter(ruler => ruler.era === targetEra);
      renderRulers(filtered);
      
      // Scroll to grid
      document.getElementById('explore-rulers').scrollIntoView({ behavior: 'smooth' });
      
      // Reset dropdowns visually
      searchInput.value = '';
      filterDynasty.value = 'all';
      filterRegion.value = 'all';
    });
  });

  // Initial Load
  renderRulers(rulersData);
});

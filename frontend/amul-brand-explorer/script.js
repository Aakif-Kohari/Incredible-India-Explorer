/**
 * Amul Brand Explorer Interactive Engine
 * Handles milestone timeline rendering, product catalog, search and category filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const milestonesData = [
    {
      year: '1946',
      title: 'Farmers Strike & Kaira Cooperative Founded',
      desc: 'Farmers of Kaira refuse to supply milk to Polson. Under Sardar Patel and Tribhuvandas Patel, Kaira District Co-operative Union is registered on Dec 14.',
      impact: 'Birth of Cooperative Dairy in India',
      category: 'founding'
    },
    {
      year: '1949',
      title: 'Dr. Verghese Kurien Arrives in Anand',
      desc: 'Young government-bonded engineer Verghese Kurien arrives in Anand, choosing to dedicate his life to empowering dairy farmers.',
      impact: 'Leadership Vision Established',
      category: 'founding'
    },
    {
      year: '1955',
      title: 'Invention of Buffalo Milk Powder & Butter',
      desc: 'H. M. Dalaya and Dr. Kurien break global skepticism by successfully producing milk powder and butter from buffalo milk at commercial scale.',
      impact: 'Global Dairy Technology Breakthrough',
      category: 'innovation'
    },
    {
      year: '1957',
      title: 'The Name "Amul" is Adopted',
      desc: 'The brand name "Amul" (derived from Sanskrit "Amulya" - priceless and standing for Anand Milk Union Limited) is officially chosen.',
      impact: 'Iconic Brand Identity Born',
      category: 'founding'
    },
    {
      year: '1965',
      title: 'Establishment of NDDB by Prime Minister Shastri',
      desc: 'PM Lal Bahadur Shastri stays overnight in an Anand village and directs the creation of NDDB to replicate the Anand Pattern nationwide.',
      impact: 'National Policy Transformation',
      category: 'founding'
    },
    {
      year: '1966',
      title: 'The Iconic "Amul Girl" Campaign Launches',
      desc: 'Sylvester da Cunha and Eustace Fernandes design the polka-dotted Amul Girl and coined "Utterly Butterly Delicious".',
      impact: 'Longest Running Ad Campaign in History',
      category: 'innovation'
    },
    {
      year: '1970',
      title: 'Launch of Operation Flood (White Revolution)',
      desc: 'World\'s biggest agricultural development program begins, linking 180+ milk unions across India to urban markets.',
      impact: 'India becomes #1 Milk Producer in the World',
      category: 'founding'
    },
    {
      year: '1973',
      title: 'GCMMF Apex Federation Formed',
      desc: 'Gujarat Co-operative Milk Marketing Federation is established to consolidate marketing and distribution for all Gujarat district milk unions.',
      impact: 'Single Unified Apex Marketing Body',
      category: 'founding'
    },
    {
      year: '1996',
      title: 'Launch of Amul Ice Cream',
      desc: 'Amul enters the ice cream market with pure 100% dairy cream formulation, rapidly becoming the #1 ice cream brand in India.',
      impact: 'Category Leadership Reached',
      category: 'innovation'
    },
    {
      year: '2006',
      title: 'Launch of Amul Kool & Packaged Beverages',
      desc: 'Flavoured milk, buttermilk (Chhaas), and lassi introduced in aseptic Tetra Paks and PET bottles across India.',
      impact: 'Beverage Segment Revolution',
      category: 'innovation'
    },
    {
      year: '2024',
      title: 'Global Expansion & US Fresh Milk Launch',
      desc: 'GCMMF launches Amul fresh milk in the United States in partnership with Michigan Milk Producers Association, reaching the Indian diaspora.',
      impact: 'First Indian Dairy Brand on US Shelves',
      category: 'global'
    },
    {
      year: '2026',
      title: '₹72,000+ Crore ($9B USD) Global Powerhouse',
      desc: 'Amul stands as the undisputed global dairy titan procuring 30+ million liters of milk daily from 3.6 million farmer members.',
      impact: 'World\'s #1 Liquid Milk Brand',
      category: 'global'
    }
  ];

  const productsData = [
    { icon: '🧈', title: 'Amul Butter & Ghee', desc: 'The golden standard of Indian breakfast tables and cooking, made from fresh pure cream.', items: 'Pasteurized Butter, Garlic Butter, Cow Ghee, Sagar Ghee' },
    { icon: '🥛', title: 'Fresh Milk & Dahi', desc: 'Processed at automated mega-dairies and delivered fresh before sunrise every morning.', items: 'Amul Gold, Taaza, Cow Milk, Masti Dahi, Probiotic Dahi' },
    { icon: '🧀', title: 'Cheese & Paneer', desc: 'India\'s favourite cheese slices, cubes, and soft malai paneer crafted with vegetarian rennet.', items: 'Processed Cheese, Mozzarella, Malai Paneer, Cheese Spreads' },
    { icon: '🍦', title: 'Amul Ice Cream & Kulfi', desc: 'Crafted with 100% Real Milk cream without vegetable oil adulteration.', items: 'Vanilla, Belgian Chocolate, Cassata, Rajbhog, Matka Kulfi' },
    { icon: '🍫', title: 'Chocolates & Sweets', desc: 'Rich cocoa treats and authentic Indian ethnic dairy sweets with unmatched shelf-life.', items: 'Dark Chocolate (55%–99%), Mithai Mate, Gulab Jamun, Rasgulla' },
    { icon: '🥤', title: 'Beverages & Amul Kool', desc: 'Refreshing traditional and modern cold dairy drinks rich in natural calcium and protein.', items: 'Amul Kool, Buttermilk (Chhaas), Lassi, Protein Shakes' }
  ];

  const timelineContainer = document.getElementById('timelineContainer');
  const searchInput = document.getElementById('timelineSearch');
  const filterChips = document.querySelectorAll('.filter-chip');
  const productsGrid = document.getElementById('productsGrid');

  let currentFilter = 'all';
  let searchQuery = '';

  function renderTimeline() {
    if (!timelineContainer) return;

    const filtered = milestonesData.filter(item => {
      const matchesSearch = item.year.toLowerCase().includes(searchQuery) ||
                            item.title.toLowerCase().includes(searchQuery) ||
                            item.desc.toLowerCase().includes(searchQuery) ||
                            item.impact.toLowerCase().includes(searchQuery);

      if (!matchesSearch) return false;

      if (currentFilter === 'all') return true;
      return item.category === currentFilter;
    });

    timelineContainer.innerHTML = '';

    if (filtered.length === 0) {
      timelineContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--amul-text-muted);">
          No milestone records found matching your filter criteria.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'milestone-entry';
      el.innerHTML = `
        <div class="milestone-year">${item.year}</div>
        <div class="milestone-title-group">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        <div class="milestone-impact">✨ ${item.impact}</div>
      `;
      timelineContainer.appendChild(el);
    });
  }

  function renderProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    productsData.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-icon">${prod.icon}</div>
        <h3>${prod.title}</h3>
        <p class="product-desc">${prod.desc}</p>
        <div class="product-items">${prod.items}</div>
      `;
      productsGrid.appendChild(card);
    });
  }

  // Filter chips listeners
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderTimeline();
    });
  });

  // Search listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTimeline();
    });
  }

  renderTimeline();
  renderProducts();
});

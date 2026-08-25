/**
 * MTR Foods Brand Explorer Interactive Engine
 * Handles milestone timeline rendering, product catalog, search and category filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
    const milestonesData = [
        {
            year: '1924',
            title: 'Brahmin Coffee Club Opens in Bangalore',
            desc: 'Three brothers — Parameshwara, Ganappayya and Yagnanarayana Maiya — from Parampalli near Udupi open a small eatery near Lalbagh Road, Bangalore, serving coffee, idlis and dosas.',
            impact: 'Birth of a Bengaluru Food Institution',
            category: 'founding'
        },
        {
            year: 'Early 1940s',
            title: 'Rava Idli is Invented During WWII Rice Shortage',
            desc: 'Japan\'s occupation of Burma cuts off rice imports to South India. Yagnanarayana Maiya improvises, substituting semolina (rava) for rice to keep serving idlis — creating the now-iconic Rava Idli.',
            impact: 'A Wartime Innovation Becomes a National Breakfast Staple',
            category: 'traditional',
        },
        {
            year: '1950s',
            title: 'Chandrahara Dessert Debuts',
            desc: 'A layered dessert inspired by French puff pastry is introduced as a Sunday-only special, later renamed "Chandrahara" after a film playing at a nearby cinema.',
            impact: 'Signature Dessert Enters MTR Folklore',
            category: 'traditional'
        },
        {
            year: '1960',
            title: 'Restaurant Renamed "Mavalli Tiffin Rooms"',
            desc: 'The eatery relocates and is rechristened Mavalli Tiffin Rooms (MTR) at its now-iconic Lalbagh Road address, cementing its identity for generations to come.',
            impact: 'The "MTR" Name is Born',
            category: 'founding'
        },
        {
            year: '1975',
            title: 'Emergency-Era Closure Sparks a Pivot',
            desc: 'The Food Control Act, introduced during India\'s Emergency, makes restaurant operations unviable. To save employee jobs, the family starts selling spice blends and roasted flour mixes packaged for home cooking.',
            impact: 'The Accidental Birth of MTR Foods',
            category: 'packaging'
        },
        {
            year: '1981',
            title: 'Mavalli Tiffin Rooms Restaurant Reopens',
            desc: 'With the Emergency-era restrictions lifted, the original restaurant reopens its doors, while the packaged foods venture launched in 1975 continues to grow alongside it as a separate business.',
            impact: 'Restaurant and Packaged Foods Businesses Diverge',
            category: 'founding'
        },
        {
            year: '1983',
            title: 'MTR Foods Ltd. Formally Established',
            desc: 'Sadananda Maiya, of the founding family, formalises the packaged spice and instant-mix venture into MTR Foods Ltd, distinct from the restaurant business.',
            impact: 'A Dedicated Packaged-Food Company is Born',
            category: 'expansion'
        },
        {
            year: '1984',
            title: 'Expansion into Tamil Nadu & Andhra Pradesh',
            desc: 'MTR Foods pushes beyond Karnataka into neighbouring southern states, broadening its regional footprint for instant mixes and spice blends.',
            impact: 'First Steps Toward a Regional Brand',
            category: 'expansion'
        },
        {
            year: '1994',
            title: 'Reorganisation & Nationwide Distribution',
            desc: 'The Maiya family business is formally split — Harishchandra Maiya takes over the restaurant, while Sadananda Maiya leads MTR Foods into a nationwide distribution network across India.',
            impact: 'MTR Foods Goes National',
            category: 'expansion'
        },
        {
            year: '1998',
            title: 'Retort Pouch Technology & Softy Ice Cream',
            desc: 'MTR Foods introduces retort-pouch packaging for shelf-stable ready-to-eat curries and rice, and launches its Softy soft-serve ice cream cone.',
            impact: 'Modern Shelf-Stable Packaging Arrives',
            category: 'packaging'
        },
        {
            year: '2002',
            title: 'Super Shop Restaurant Chain & National Scale',
            desc: 'MTR debuts its "Super Shop" restaurant chain while its packaged foods division reaches an estimated $26 million in annual sales, cementing its place among India\'s leading packaged food makers.',
            impact: 'A True Pan-India Packaged Food Player',
            category: 'expansion'
        },
        {
            year: '2007',
            title: 'Orkla Group Acquires MTR Foods',
            desc: 'Norwegian consumer goods conglomerate Orkla Group acquires MTR Foods for approximately $80 million, while the original restaurant remains separately family-owned.',
            impact: 'Global Ownership, Local Heritage',
            category: 'expansion'
        },
        {
            year: '2000s–2020s',
            title: 'HACCP Certification & Global Export Reach',
            desc: 'MTR Foods becomes the first Indian company to receive HACCP food-safety certification, and its packaged mixes, pickles and ready-to-eat meals reach shelves across the Gulf, the United States and the United Kingdom.',
            impact: 'India\'s Home Kitchen, Delivered Worldwide',
            category: 'expansion'
        },
        {
            year: '2024',
            title: 'Mavalli Tiffin Rooms Celebrates a Century',
            desc: 'A hundred years after three brothers opened a small coffee club near Lalbagh, MTR marks its centenary as both a beloved Bengaluru restaurant and a household packaged-food name across India and the diaspora.',
            impact: '100 Years of "Good Food, Consistently"',
            category: 'traditional'
        }
    ];

    const productsData = [
        { icon: '🥣', title: 'Breakfast & Instant Mixes', desc: 'The heart of MTR Foods\' packaged range — instant mixes that recreate restaurant-style South Indian breakfasts at home.', items: 'Rava Idli Mix, Dosa Mix, Upma Mix, Vermicelli (Semiya)' },
        { icon: '🍛', title: 'Ready-to-Eat & Ready-to-Cook Meals', desc: 'Retort-pouch packaged curries, rice dishes and gravies that bring MTR\'s restaurant recipes to shelf-stable convenience.', items: 'Bisibelebath, Puliyogare, Paneer Butter Masala, Sambar & Rasam' },
        { icon: '🧂', title: 'Spice Blends & Masalas', desc: 'The very first packaged product line, born from the 1975 restaurant closure, capturing MTR\'s signature spice profiles.', items: 'Sambar Powder, Rasam Powder, Garam Masala, Chutney Powders' },
        { icon: '🥒', title: 'Pickles & Papads', desc: 'Traditional accompaniments made using time-tested family recipes, packaged for everyday home dining.', items: 'Mango Pickle, Lime Pickle, Mixed Vegetable Pickle, Papads' },
        { icon: '🍨', title: 'Ice Creams & Desserts', desc: 'From the restaurant\'s legendary Chandrahara to a modern packaged dessert and ice-cream lineup launched from 1998 onward.', items: 'Softy Cones, Ice Cream Cups & Tubs, Sweets Mixes, Gulab Jamun Mix' },
        { icon: '🥤', title: 'Beverage Mixes', desc: 'Instant beverage powders bringing South Indian filter coffee and traditional drink flavours to packaged convenience.', items: 'Instant Filter Coffee Mix, Rasam/Buttermilk Mixes, Health Drink Mixes' }
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
        <div style="text-align: center; padding: 40px; color: var(--mtr-text-muted);">
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
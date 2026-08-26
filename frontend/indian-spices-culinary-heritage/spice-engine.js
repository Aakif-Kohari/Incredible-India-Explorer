/* ==========================================================================
   SPICE ENGINE — Core Business Logic for Indian Spices & Culinary Heritage
   ========================================================================== */

class Spice {
    constructor(name, flavor, origin, description, uses, tags) {
        this.name = name; this.flavor = flavor; this.origin = origin;
        this.description = description; this.uses = uses || []; this.tags = tags || [];
        this.type = 'spice';
    }
}

class Cuisine {
    constructor(name, vegType, region, description, signature, tags) {
        this.name = name; this.vegType = vegType; this.region = region;
        this.description = description; this.signature = signature || [];
        this.tags = tags || []; this.type = 'cuisine';
    }
}

class CulinaryTechnique {
    constructor(name, method, region, description, steps, tags) {
        this.name = name; this.method = method; this.region = region;
        this.description = description; this.steps = steps || []; this.tags = tags || [];
        this.type = 'technique';
    }
}

const SPICES = [
    new Spice('Turmeric', 'earthy', 'Tamil Nadu', 'The golden spice of India, used for over 4,000 years. Known for its anti-inflammatory properties and vivid yellow color.', ['Curry', 'Rice', 'Milk'], ['Ayurveda', 'Golden']),
    new Spice('Cardamom', 'sweet', 'Kerala', 'The Queen of Spices, with a complex sweet-menthol flavor. Used in chai, desserts, and biryanis.', ['Chai', 'Desserts', 'Biryani'], ['Kerala', 'Premium']),
    new Spice('Red Chili', 'pungent', 'Andhra Pradesh', 'India is the world\'s largest producer of chilies. The Guntur variety is among the hottest in the world.', ['Curry', 'Pickles', 'Chutney'], ['Andhra', 'Fiery']),
    new Spice('Cumin', 'warm', 'Rajasthan', 'An earthy, warm spice essential to tadka (tempering). Cumin seeds are the backbone of Indian spice blends.', ['Tadka', 'Jeera Rice', 'Dosa'], ['Essential', 'Tempering']),
    new Spice('Coriander', 'citrus', 'Rajasthan', 'Fresh leaves and dried seeds serve different roles — leaves add freshness, seeds add warm citrus depth.', ['Chutney', 'Curry', 'Garnish'], ['Dual-use', 'Fresh']),
    new Spice('Black Pepper', 'pungent', 'Kerala', 'The King of Spices that launched the spice trade. Known as "black gold" in ancient times.', ['Seasoning', 'Pickle', 'Medicine'], ['Kerala', 'Trade History']),
    new Spice('Saffron', 'sweet', 'Kashmir', 'The world\'s most expensive spice by weight. Each crocus flower yields only three stigmas.', ['Biryani', 'Kheer', 'Tea'], ['Kashmir', 'Premium']),
    new Spice('Mustard Seed', 'pungent', 'Rajasthan', 'Tiny seeds that pop with intense heat when tempered in oil. Essential to Bengali and Rajasthani cooking.', ['Tadka', 'Pickles', 'Fish'], ['Tempering', 'Bengali']),
    new Spice('Fenugreek', 'bitter', 'Rajasthan', 'Leaves (methi) and seeds both used. Bitter-sweet flavor that enhances curry depth.', ['Curry', 'Methi Paratha', 'Pickles'], ['Bitter', 'Methi']),
    new Spice('Asafoetida', 'pungent', 'Iran/Gujarat', 'Known as "hing," this pungent resin transforms when cooked, adding umami depth to vegetarian dishes.', ['Tadka', 'Sambar', 'Rasam'], ['Umami', 'Hing']),
    new Spice('Cloves', 'warm', 'Kerala', 'Intensely aromatic flower buds used in biryani, chai, and garam masala. Also used in traditional medicine.', ['Biryani', 'Chai', 'Masala'], ['Kerala', 'Aromatic']),
    new Spice('Cinnamon', 'sweet', 'Sri Lanka/Kerala', 'True cinnamon (Ceylon) from Kerala is delicate and sweet, unlike the more common cassia variety.', ['Garam Masala', 'Desserts', 'Tea'], ['Garam Masala', 'Sweet']),
];

const CUISINES = [
    new Cuisine('Punjabi', 'mixed', 'Punjab', 'Rich, buttery, and robust. Known for tandoori cooking, creamy curries, and generous use of dairy products.', ['Butter Chicken', 'Dal Makhani', 'Naan'], ['Tandoori', 'Dairy']),
    new Cuisine('Kerala', 'non-veg', 'Kerala', 'Coconut-rich and spicy, using curry leaves, mustard seeds, and fresh seafood. Famous for its Sadya feast.', ['Fish Moilee', 'Appam', 'Puttu'], ['Coconut', 'Seafood']),
    new Cuisine('Bengali', 'non-veg', 'West Bengal', 'Subtle, fish-centric cuisine with mustard oil, panch phoron spice blend, and delicate sweetness.', ['Macher Jhol', 'Rasgulla', 'Mishti Doi'], ['Fish', 'Mustard']),
    new Cuisine('Rajasthani', 'veg', 'Rajasthan', 'Desert-adapted cuisine using dried ingredients, ghee, and limited water. Known for Dal Bati Churma.', ['Dal Bati', 'Ker Sangri', 'Gatte'], ['Desert', 'Ghee']),
    new Cuisine('Chettinad', 'non-veg', 'Tamil Nadu', 'Fiery and complex non-veg cuisine using freshly ground spice blends with star anise and kalpasi.', ['Chicken Chettinad', 'Kola Urundai', 'Idiyappam'], ['Fiery', 'Spice Blends']),
    new Cuisine('Hyderabadi', 'mixed', 'Telangana', 'A blend of Mughlai and Telugu flavors. Famous for its slow-cooked dum biryani and haleem.', ['Dum Biryani', 'Haleem', 'Double Ka Meetha'], ['Mughlai', 'Biryani']),
    new Cuisine('Goan', 'non-veg', 'Goa', 'Influenced by Portuguese cuisine, featuring vinegar-based curries, seafood, and coconut-forward preparations.', ['Vindaloo', 'Xacuti', 'Bebinca'], ['Portuguese', 'Vinegar']),
    new Cuisine('Kashmiri', 'mixed', 'Kashmir', 'Aromatic Wazwan feast cuisine with dried fruits, saffron, and yogurt-based gravies.', ['Rogan Josh', 'Dum Aloo', 'Kahwa'], ['Wazwan', 'Saffron']),
    new Cuisine('Maharashtrian', 'mixed', 'Maharashtra', 'Varied from coastal seafood to interior sweets. Known for balanced flavors and moderate spice.', ['Vada Pav', 'Misal Pav', 'Puran Poli'], ['Street Food', 'Balanced']),
    new Cuisine('Assamese', 'mixed', 'Assam', 'Simple, lightly spiced cuisine using bamboo shoots, fermented fish, and minimal oil.', ['Duck Curry', 'Pitha', 'Khar'], ['Fermented', 'Bamboo']),
];

const TECHNIQUES = [
    new CulinaryTechnique('Tadka (Tempering)', 'cooking', 'Pan India',
        'The art of blooming whole spices in hot oil or ghee to release their essential oils. This technique is the foundation of Indian cooking.', ['Heat oil/ghee', 'Add whole spices', 'Listen for crackling', 'Pour over dish'], ['Tempering', 'Foundation']),
    new CulinaryTechnique('Tandoor Roasting', 'cooking', 'Punjab',
        'Cooking in a cylindrical clay oven (tandoor) at temperatures exceeding 480°C. Creates the signature charred, smoky flavor.', ['Prepare clay tandoor', 'Heat to 480°C', 'Skewer ingredients', 'Roast with radiant heat'], ['Tandoori', 'Clay Oven']),
    new CulinaryTechnique('Dum Pukht', 'cooking', 'Hyderabad',
        'A slow-cooking technique where sealed pots trap steam, allowing flavors to meld. Used for biryani and rich curries.', ['Layer ingredients', 'Seal with dough', 'Cook on low heat', 'Steam infuses flavors'], ['Biryani', 'Slow Cooking']),
    new CulinaryTechnique('Pickle Making (Achar)', 'preservation', 'Pan India',
        'Sun-curing vegetables and fruits in oil, salt, and spices. Each region has unique pickle recipes that last for months or years.', ['Cut ingredients', 'Add salt and spices', 'Pack in oil', 'Sun-cure for days'], ['Preservation', 'Sun-drying']),
    new CulinaryTechnique('Fermentation', 'preparation', 'South India',
        'Natural fermentation of rice and lentil batters overnight, creating sourdough-like textures for dosa and idli.', ['Soak grains', 'Grind to batter', 'Ferment overnight', 'Cook on hot griddle'], ['Fermentation', 'South Indian']),
    new CulinaryTechnique('Ghee Clarification', 'preparation', 'Pan India',
        'Slowly simmering butter to remove milk solids, creating pure clarified butter with a nutty flavor and high smoke point.', ['Simmer butter on low', 'Skim foam', 'Strain through cheesecloth', 'Store in sealed jar'], ['Ghee', 'Clarified Butter']),
    new CulinaryTechnique('Wok Cooking (Kadhai)', 'cooking', 'Pan India',
        'High-heat stir-frying in a round-bottomed kadhai. Quick cooking preserves texture and nutritional value.', ['Heat kadhai', 'Add oil at smoking point', 'Quick stir-fry ingredients', 'Finish with spices'], ['Quick Cooking', 'Kadhai']),
    new CulinaryTechnique('Smoking (Dhungar)', 'preparation', 'North India',
        'The technique of infusing smoky flavor by placing a hot coal in the dish and drizzling ghee over it, then sealing.', ['Heat charcoal', 'Place in dish', 'Drizzle ghee', 'Seal and wait 2 minutes'], ['Smoky', 'Coal']),
    new CulinaryTechnique('Sun-Drying (Sukhana)', 'preservation', 'Rajasthan',
        'Drying spices, herbs, and vegetables in the harsh desert sun for long-term preservation. Essential in water-scarce regions.', ['Slice thinly', 'Spread on trays', 'Sun-dry for days', 'Store in airtight containers'], ['Desert', 'Preservation']),
    new CulinaryTechnique('Bhunao (Sautéing)', 'cooking', 'Pan India',
        'Continuous sautéing of onions, tomatoes, and spices until oil separates, creating deep caramelized flavors.', ['Heat oil', 'Add onions and sauté', 'Add tomatoes and spices', 'Cook until oil separates'], ['Caramelization', 'Foundation']),
];

const TIMELINE = [
    { year: '3000 BCE', text: 'Evidence of spice use in Indus Valley — turmeric, ginger, and garlic.' },
    { year: '1500 BCE', text: 'Ayurvedic texts describe medicinal properties of 70+ Indian spices.' },
    { year: '500 BCE', text: 'Spice trade routes connect India to Mesopotamia, Egypt, and Rome.' },
    { year: '300 CE', text: 'Silk Road accelerates spice trade — pepper becomes more valuable than gold.' },
    { year: '1000 CE', text: 'Mughal cuisine merges Central Asian and Indian culinary traditions.' },
    { year: '1498', text: 'Vasco da Gama reaches Kerala, triggering European spice trade wars.' },
    { year: '1800s', text: 'British Raj formalizes tea cultivation in Assam and Darjeeling.' },
    { year: '2000s', text: 'Indian cuisine gains global recognition; spice exports reach $4 billion.' },
];

class SpiceEngine {
    constructor(config = {}) {
        this.spices = config.spices || SPICES;
        this.cuisines = config.cuisines || CUISINES;
        this.techniques = config.techniques || TECHNIQUES;
        this.state = { searchQuery: '', categoryFilter: 'all', spiceFlavorFilter: 'all',
            cuisineVegFilter: 'all', techniqueMethodFilter: 'all', sortBy: 'name-asc' };
    }

    getSpices() { return [...this.spices]; }
    getCuisines() { return [...this.cuisines]; }
    getTechniques() { return [...this.techniques]; }
    getAllItems() { return [...this.spices, ...this.cuisines, ...this.techniques]; }

    getStats() {
        const regions = new Set();
        this.spices.forEach(s => regions.add(s.origin));
        this.cuisines.forEach(c => regions.add(c.region));
        this.techniques.forEach(t => regions.add(t.region));
        return { spices: this.spices.length, cuisines: this.cuisines.length,
            techniques: this.techniques.length, regions: regions.size };
    }

    matchesSearch(item, query) {
        if (!query || query.trim() === '') return true;
        const terms = query.toLowerCase().trim().split(/\s+/);
        const text = [item.name, item.description, item.origin || '', item.region || '',
            item.flavor || '', item.vegType || '', item.method || '',
            item.significance || '', ...(item.uses || []), ...(item.signature || []),
            ...(item.steps || []), ...(item.tags || [])].join(' ').toLowerCase();
        return terms.every(term => text.includes(term));
    }

    searchItems(items, query) { return items.filter(item => this.matchesSearch(item, query)); }

    filterSpicesByFlavor(flavor) { return flavor === 'all' ? this.spices : this.spices.filter(s => s.flavor === flavor); }
    filterCuisinesByVegType(vegType) { return vegType === 'all' ? this.cuisines : this.cuisines.filter(c => c.vegType === vegType); }
    filterTechniquesByMethod(method) { return method === 'all' ? this.techniques : this.techniques.filter(t => t.method === method); }

    sortItems(items, sortBy = this.state.sortBy) {
        const sorted = [...items];
        switch (sortBy) {
            case 'name-asc': return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc': return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'origin': return sorted.sort((a, b) => (a.origin || a.region || '').localeCompare(b.origin || b.region || ''));
            default: return sorted;
        }
    }

    getFilteredSpices() { return this.sortItems(this.searchItems(this.filterSpicesByFlavor(this.state.spiceFlavorFilter), this.state.searchQuery)); }
    getFilteredCuisines() { return this.sortItems(this.searchItems(this.filterCuisinesByVegType(this.state.cuisineVegFilter), this.state.searchQuery)); }
    getFilteredTechniques() { return this.sortItems(this.searchItems(this.filterTechniquesByMethod(this.state.techniqueMethodFilter), this.state.searchQuery)); }

    getFlavorDistribution() {
        const counts = {}; this.spices.forEach(s => { counts[s.flavor] = (counts[s.flavor] || 0) + 1; });
        return Object.entries(counts).map(([flavor, count]) => ({ flavor, count })).sort((a, b) => b.count - a.count);
    }

    getRegionSpread() {
        const counts = {};
        this.spices.forEach(s => { counts[s.origin] = (counts[s.origin] || 0) + 1; });
        this.cuisines.forEach(c => { counts[c.region] = (counts[c.region] || 0) + 1; });
        return Object.entries(counts).map(([region, count]) => ({ region, count }))
            .sort((a, b) => b.count - a.count).slice(0, 8);
    }

    getMethodBreakdown() {
        const counts = {}; this.techniques.forEach(t => { counts[t.method] = (counts[t.method] || 0) + 1; });
        return Object.entries(counts).map(([method, count]) => ({ method, count })).sort((a, b) => b.count - a.count);
    }

    getTimeline() { return TIMELINE; }

    setSearchQuery(q) { this.state.searchQuery = q; }
    setCategoryFilter(f) { this.state.categoryFilter = f; }
    setSpiceFlavorFilter(f) { this.state.spiceFlavorFilter = f; }
    setCuisineVegFilter(f) { this.state.cuisineVegFilter = f; }
    setTechniqueMethodFilter(f) { this.state.techniqueMethodFilter = f; }
    setSortBy(s) { this.state.sortBy = s; }
    resetFilters() { this.state = { searchQuery: '', categoryFilter: 'all', spiceFlavorFilter: 'all',
        cuisineVegFilter: 'all', techniqueMethodFilter: 'all', sortBy: 'name-asc' }; }

    getBadgeClass(v) {
        const m = { warm: 'badge-warm', sweet: 'badge-sweet', earthy: 'badge-earthy', citrus: 'badge-citrus',
            pungent: 'badge-pungent', veg: 'badge-veg', 'non-veg': 'badge-non-veg', mixed: 'badge-mixed',
            cooking: 'badge-cooking', preservation: 'badge-preservation', preparation: 'badge-preparation' };
        return m[v] || 'badge-warm';
    }

    getChartColor(i) { return ['saffron', 'green', 'gold', 'blue'][i % 4]; }
    getFlavorDotColor(f) { return { warm: '#fb923c', sweet: '#facc15', earthy: '#a78bfa', citrus: '#38bdf8', pungent: '#fb7185', bitter: '#facc15' }[f] || '#94a3b8'; }
    getMethodDotColor(m) { return { cooking: '#ff9933', preservation: '#4ade80', preparation: '#38bdf8' }[m] || '#94a3b8'; }
}

/* --- Renderers --- */

function renderSpiceCard(s) {
    const b = engine.getBadgeClass(s.flavor);
    const tags = s.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    const uses = s.uses.map(u => `<span class="card-tag">✨ ${u}</span>`).join('');
    return `<article class="spc-card" role="listitem" tabindex="0" aria-label="${s.name} — ${s.flavor} spice">
        <div class="card-header"><h3 class="card-title">🌶️ ${s.name}</h3><span class="card-badge ${b}">${s.flavor}</span></div>
        <p class="card-description">${s.description}</p>
        <div class="card-tags"><span class="card-tag">📍 ${s.origin}</span>${uses}${tags}</div>
    </article>`;
}

function renderCuisineCard(c) {
    const b = engine.getBadgeClass(c.vegType);
    const tags = c.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    const sig = c.signature.map(s => `<span class="card-tag">🍽️ ${s}</span>`).join('');
    return `<article class="spc-card" role="listitem" tabindex="0" aria-label="${c.name} cuisine">
        <div class="card-header"><h3 class="card-title">🍛 ${c.name}</h3><span class="card-badge ${b}">${c.vegType}</span></div>
        <p class="card-description">${c.description}</p>
        <div class="card-tags"><span class="card-tag">📍 ${c.region}</span>${sig}${tags}</div>
    </article>`;
}

function renderTechniqueCard(t) {
    const b = engine.getBadgeClass(t.method);
    const tags = t.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('');
    const steps = t.steps.map(s => `<span class="card-tag">📋 ${s}</span>`).join('');
    return `<article class="tech-card" role="listitem" tabindex="0" aria-label="${t.name} — ${t.method}">
        <div class="tech-header"><h3 class="tech-name">👨‍🍳 ${t.name}</h3><span class="card-badge ${b}">${t.method}</span></div>
        <p class="tech-meta">📍 ${t.region} &nbsp; ⭐ ${t.method}</p>
        <p class="tech-desc">${t.description}</p>
        <div class="card-tags">${steps}${tags}</div>
    </article>`;
}

function renderFlavorChart(d) { return d.map(i => `<div class="flavor-row"><span class="flavor-dot" style="background:${engine.getFlavorDotColor(i.flavor)}"></span><span class="flavor-name">${i.flavor.charAt(0).toUpperCase()+i.flavor.slice(1)}</span><span class="flavor-count">${i.count}</span></div>`).join(''); }
function renderRegionChart(d) { const mx = Math.max(...d.map(x=>x.count)); return d.map((i,idx) => `<div class="chart-bar-row"><span class="chart-bar-label">${i.region}</span><div class="chart-bar-track"><div class="chart-bar-fill ${engine.getChartColor(idx)}" style="width:${(i.count/mx*100).toFixed(0)}%"></div></div><span class="chart-bar-value">${i.count}</span></div>`).join(''); }
function renderMethodChart(d) { return d.map(i => `<div class="method-row"><span class="method-dot" style="background:${engine.getMethodDotColor(i.method)}"></span><span class="method-name">${i.method.charAt(0).toUpperCase()+i.method.slice(1)}</span><span class="method-count">${i.count}</span></div>`).join(''); }
function renderTimeline(d) { return d.map(i => `<div class="timeline-entry"><span class="timeline-dot"></span><div class="timeline-info"><span class="timeline-year">${i.year}</span><p class="timeline-text">${i.text}</p></div></div>`).join(''); }

/* --- UI Orchestrator --- */

function renderAll() {
    const s = engine.getFilteredSpices(), c = engine.getFilteredCuisines(), t = engine.getFilteredTechniques();
    const sg = document.getElementById('spice-grid'), se = document.getElementById('spice-empty');
    const cg = document.getElementById('cuisine-grid'), ce = document.getElementById('cuisine-empty');
    const tg = document.getElementById('technique-grid'), te = document.getElementById('technique-empty');
    if (sg) { sg.innerHTML = s.map(renderSpiceCard).join(''); if (se) se.hidden = s.length > 0; }
    if (cg) { cg.innerHTML = c.map(renderCuisineCard).join(''); if (ce) ce.hidden = c.length > 0; }
    if (tg) { tg.innerHTML = t.map(renderTechniqueCard).join(''); if (te) te.hidden = t.length > 0; }
    const stats = engine.getStats();
    const sf = document.getElementById('stat-spices'), sc2 = document.getElementById('stat-cuisines');
    const st = document.getElementById('stat-techniques'), sr = document.getElementById('stat-regions');
    if (sf) sf.textContent = stats.spices; if (sc2) sc2.textContent = stats.cuisines;
    if (st) st.textContent = stats.techniques; if (sr) sr.textContent = stats.regions;
    const fc = document.getElementById('flavor-chart'), rc = document.getElementById('region-chart');
    const mc = document.getElementById('method-chart'), tl = document.getElementById('timeline-chart');
    if (fc) fc.innerHTML = renderFlavorChart(engine.getFlavorDistribution());
    if (rc) rc.innerHTML = renderRegionChart(engine.getRegionSpread());
    if (mc) mc.innerHTML = renderMethodChart(engine.getMethodBreakdown());
    if (tl) tl.innerHTML = renderTimeline(engine.getTimeline());
}

function wireEventHandlers() {
    const si = document.getElementById('global-search');
    if (si) si.addEventListener('input', e => { engine.setSearchQuery(e.target.value); renderAll(); });
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-filter]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setCategoryFilter(btn.dataset.filter);
            const f = btn.dataset.filter;
            document.getElementById('spices').style.display = (f === 'all' || f === 'spice') ? '' : 'none';
            document.getElementById('cuisines').style.display = (f === 'all' || f === 'cuisine') ? '' : 'none';
            document.getElementById('techniques').style.display = (f === 'all' || f === 'technique') ? '' : 'none';
        });
    });
    const ss = document.getElementById('sort-select');
    if (ss) ss.addEventListener('change', e => { engine.setSortBy(e.target.value); renderAll(); });
    document.querySelectorAll('.sub-filter[data-flavor]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-flavor]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setSpiceFlavorFilter(btn.dataset.flavor); renderAll();
        });
    });
    document.querySelectorAll('.sub-filter[data-vegtype]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-vegtype]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setCuisineVegFilter(btn.dataset.vegtype); renderAll();
        });
    });
    document.querySelectorAll('.sub-filter[data-method]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-method]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setTechniqueMethodFilter(btn.dataset.method); renderAll();
        });
    });
    const mt = document.getElementById('menu-toggle'), nm = document.getElementById('nav-menu');
    if (mt && nm) mt.addEventListener('click', () => nm.classList.toggle('open'));
    window.addEventListener('scroll', () => { const nb = document.getElementById('navbar'); if (nb) nb.classList.toggle('scrolled', window.scrollY > 50); });
}

const engine = new SpiceEngine();
function initEngine() { wireEventHandlers(); renderAll(); }
if (typeof document !== 'undefined') { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initEngine); else initEngine(); }

export { Spice, Cuisine, CulinaryTechnique, SpiceEngine, SPICES, CUISINES, TECHNIQUES, TIMELINE,
    renderSpiceCard, renderCuisineCard, renderTechniqueCard, renderFlavorChart, renderRegionChart,
    renderMethodChart, renderTimeline, engine };

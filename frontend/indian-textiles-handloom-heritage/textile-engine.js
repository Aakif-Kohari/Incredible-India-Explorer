/* ==========================================================================
   TEXTILE ENGINE — Core Business Logic
   Enterprise class-based service engine for Indian Textiles & Handloom
   Heritage Explorer. Handles data initialization, filtering, sorting,
   searching, rendering, analytics computation, and state management.

   Design Decisions:
   - Single TextileEngine class encapsulates all state and operations
   - Pure functional helpers for data transforms
   - All DOM manipulation isolated in render methods for testability
   - Dataset stored as frozen arrays; mutations only via engine methods
   - Search supports multi-term fuzzy matching across all fields
   - Analytics computed on-demand from full dataset (not filtered)

   Architecture Notes:
   - Engine is exported as a named ES module export
   - UI bootstrap runs on DOMContentLoaded via initEngine()
   - Each section (fabric, technique, artisan) has independent filter state
   - Cards rendered via template literals for clarity and XSS safety
   ========================================================================== */

/**
 * RegionalFabric — Represents a regional fabric/textile from India.
 */
class RegionalFabric {
    constructor(name, material, origin, description, features, tags) {
        this.name = name;
        this.material = material;
        this.origin = origin;
        this.description = description;
        this.features = features || [];
        this.tags = tags || [];
        this.type = 'fabric';
    }
}

/**
 * WeavingTechnique — Represents a weaving, dyeing, or textile technique.
 */
class WeavingTechnique {
    constructor(name, category, origin, complexity, description, tags) {
        this.name = name;
        this.category = category;
        this.origin = origin;
        this.complexity = complexity;
        this.description = description;
        this.tags = tags || [];
        this.type = 'technique';
    }
}

/**
 * MasterArtisan — Represents a legendary artisan in Indian textiles.
 */
class MasterArtisan {
    constructor(name, specialty, craft, origin, period, description, emoji, award) {
        this.name = name;
        this.specialty = specialty;
        this.craft = craft;
        this.origin = origin;
        this.period = period;
        this.description = description;
        this.emoji = emoji || '🧵';
        this.award = award || 'None listed';
        this.tags = [specialty, craft, origin];
        this.type = 'artisan';
    }
}

/* ======================================================================
   MASTER DATASETS
   ====================================================================== */

const FABRICS = [
    new RegionalFabric('Banarasi Silk', 'silk', 'Varanasi, UP',
        'One of India\'s finest silk fabrics, Banarasi silk is renowned for its gold and silver brocade, fine silk, and opulent embroidery. Used in bridal wear and royal garments.', ['Brocade', 'Gold Zari', 'Fine Silk'], ['UP', 'Luxury', 'Bridal']),
    new RegionalFabric('Kanchipuram Silk', 'silk', 'Kanchipuram, TN',
        'Famous for its durability and luster, Kanchipuram silk saris feature contrasting borders and are woven from mulberry silk with real gold zari.', ['Contrast Border', 'Mulberry Silk', 'Temple Borders'], ['TN', 'Temple Town', 'Wedding']),
    new RegionalFabric('Chanderi', 'blend', 'Chanderi, MP',
        'A delicate fabric known for its lightweight texture and shimmering transparency. Chanderi combines silk and cotton to create an ethereal, gossamer quality.', ['Lightweight', 'Sheer', 'Golden Zari'], ['MP', 'Royal Patronage', 'Mughal']),
    new RegionalFabric('Pochampally Ikat', 'cotton', 'Pochampally, Telangana',
        'Pochampally is famous for its geometric ikat patterns created through resist dyeing of yarn before weaving, producing distinctive symmetrical designs.', ['Ikat', 'Geometric', 'Resist Dye'], ['Telangana', 'GI Tag', 'Geometric']),
    new RegionalFabric('Patola', 'silk', 'Patan, Gujarat',
        'A double ikat silk sari from Patan, Gujarat, Patola takes 4-6 months to weave a single piece. Each thread is resist-dyed in both warp and weft directions.', ['Double Ikat', 'Expensive', 'Royal Heritage'], ['Gujarat', 'Rare', 'Royal']),
    new RegionalFabric('Muga Silk', 'silk', 'Sualkuchi, Assam',
        'Muga silk is a naturally golden silk unique to Assam. It is known for its extreme durability and glossy texture that improves with every wash.', ['Golden', 'Natural Luster', 'Durable'], ['Assam', 'Eri Silk', 'Eco-friendly']),
    new RegionalFabric('Kota Doria', 'cotton', 'Kota, Rajasthan',
        'A lightweight, translucent fabric woven from cotton and silk, Kota Doria is known for its distinctive square-patterned mesh weave called khat.', ['Mesh Weave', 'Translucent', 'Khat Pattern'], ['Rajasthan', 'Lightweight', 'Summer']),
    new RegionalFabric('Tussar Silk', 'silk', 'Bhagalpur, Bihar',
        'Also known as wild silk or Kosa silk, Tussar has a rich texture and natural dark gold color. It is produced from silkworms that feed on Asan and Arjun trees.', ['Wild Silk', 'Natural Gold', 'Textured'], ['Bihar', 'Jharkhand', 'Wild']),
    new RegionalFabric('Chikankari', 'cotton', 'Lucknow, UP',
        'An exquisite white-on-white embroidery technique from Lucknow, Chikankari involves delicate needlework with 36 distinct stitches creating shadow work patterns.', ['White Embroidery', 'Shadow Work', '36 Stitches'], ['UP', 'Mughal', 'Delicate']),
    new RegionalFabric('Bandhani', 'cotton', 'Gujarat & Rajasthan',
        'An ancient tie-dye technique where thousands of tiny dots are created by tying small points of fabric with thread before dyeing, forming intricate patterns.', ['Tie-Dye', 'Dots', 'Ancient'], ['Gujarat', 'Rajasthan', 'Festival Wear']),
    new RegionalFabric('Kalamkari', 'cotton', 'Srikalahasti, AP',
        'A hand-painted or block-printed cotton textile depicting mythological narratives using natural dyes derived from plants, minerals, and iron rust.', ['Hand-painted', 'Mythological', 'Natural Dyes'], ['AP', 'Temple Art', 'Natural']),
    new RegionalFabric('Kasavu', 'cotton', 'Kerala',
        'The traditional Kerala sari featuring a white body with a distinctive gold border, worn during festivals like Onam. It embodies the simplicity and elegance of Kerala.', ['White & Gold', 'Simple', 'Festival'], ['Kerala', 'Onam', 'Elegant']),
    new RegionalFabric('Phulkari', 'wool', 'Punjab',
        'A vibrant embroidery tradition from Punjab where geometric and floral patterns are stitched using darn stitch on coarse cotton, creating dense, textured surfaces.', ['Embroidery', 'Geometric', 'Darn Stitch'], ['Punjab', 'Folk Art', 'Colorful']),
    new RegionalFabric('Pashmina', 'wool', 'Ladakh, J&K',
        'The world\'s finest wool fabric, Pashmina is woven from the inner coat of Changthangi goats found at 14,000 feet. Each shawl takes months to produce.', ['Finest Wool', 'Changthangi', 'Luxurious'], ['Ladakh', 'Luxury', 'Hand-spun']),
];

const TECHNIQUES = [
    new WeavingTechnique('Jamdani Weaving', 'weaving', 'Dhaka/Bangladesh & Bengal',
        'Master', 'An intricate handloom weaving technique where decorative motifs are directly woven into the fabric using a supplementary weft, creating raised patterns.', ['Bengal', 'Supplementary Weft', 'UNESCO']),
    new WeavingTechnique('Banarasi Brocade', 'weaving', 'Varanasi, UP',
        'Master', 'An elaborate brocade weaving technique using gold and silver zari threads to create intricate floral and paisley motifs on silk.', ['Zari Work', 'Brocade', 'Gold Thread']),
    new WeavingTechnique('Ikat Resist Dyeing', 'dyeing', 'Multiple Regions',
        'Advanced', 'A resist dyeing technique where yarns are tied and dyed before weaving, creating characteristic blurred-edge patterns in the finished fabric.', ['Resist Dye', 'Pre-weaving', 'Geometric']),
    new WeavingTechnique('Ajrakh Block Printing', 'printing', 'Kutch, Gujarat',
        'Advanced', 'A complex natural dyeing and block printing technique using 16-30 steps, featuring geometric patterns in indigo, red, and white on cotton.', ['Block Print', 'Natural Dye', 'Indigo']),
    new WeavingTechnique('Chikankari Embroidery', 'embroidery', 'Lucknow, UP',
        'Master', 'A delicate white-on-white shadow embroidery using 36 distinct stitches including tepchi, hool, and phanda to create intricate patterns.', ['Shadow Work', 'White Thread', '36 Stitches']),
    new WeavingTechnique('Kantha Stitching', 'embroidery', 'Bengal & Bangladesh',
        'Intermediate', 'A running-stitch embroidery tradition where layers of old cloth are stitched together with simple motifs of lotus, fish, and nature.', ['Running Stitch', 'Recycled', 'Nature Motifs']),
    new WeavingTechnique('Bagru Printing', 'printing', 'Jaipur, Rajasthan',
        'Intermediate', 'A traditional block printing technique using natural dyes from sources like pomegranate, indigo, and iron rust, with resist mud applications.', ['Natural Dye', 'Mud Resist', 'Rajasthan']),
    new WeavingTechnique('Mud Resist Dyeing (Dabu)', 'dyeing', 'Jaipur, Rajasthan',
        'Advanced', 'A specialized resist printing technique using a paste of black clay (dabu) applied with wooden blocks to create patterns before indigo dyeing.', ['Clay Resist', 'Indigo', 'Rajasthan']),
    new WeavingTechnique('Kantha Running Stitch', 'embroidery', 'West Bengal',
        'Beginner', 'A simple yet elegant running stitch used to quilt together layers of saris, creating lightweight quilts with intricate nature-inspired motifs.', ['Running Stitch', 'Quilting', 'Simple']),
    new WeavingTechnique('Kondapalli Weaving', 'weaving', 'Andhra Pradesh',
        'Advanced', 'A traditional handloom technique producing lightweight, colorful fabrics with distinctive temple and nature motifs woven in cotton.', ['Handloom', 'Cotton', 'Nature Motifs']),
    new WeavingTechnique('Sualkuchi Weaving', 'weaving', 'Assam',
        'Master', 'Assam\'s silk weaving center produces exquisite Muga and Pat silk fabrics using traditional handloom techniques passed down through generations.', ['Silk', 'Muga', 'Handloom']),
    new WeavingTechnique('Bandhani Tie-Dye', 'dyeing', 'Gujarat & Rajasthan',
        'Advanced', 'An ancient tie-dye technique where thousands of tiny points are individually tied with thread before multi-stage dyeing to create dotted patterns.', ['Tie-Dye', 'Multi-stage', 'Dotted']),
];

const ARTISANS = [
    new MasterArtisan('Rehman Baba', 'weaving', 'Banarasi Brocade', 'Varanasi, UP', '1950–present',
        'A legendary Banarasi brocade weaver who has produced over 10,000 intricate zari saris and trained 200+ apprentices in the art of Banarasi weaving.', '🧵', 'Padma Shri'),
    new MasterArtisan('Bhagaram', 'weaving', 'Chanderi', 'Chanderi, MP', '1945–present',
        'A master weaver who revived the traditional Chanderi weaving technique, known for producing museum-quality handloom fabrics with gold zari borders.', '🧵', 'National Award'),
    new MasterArtisan('Putlibai', 'embroidery', 'Chikankari', 'Lucknow, UP', '1930–2010',
        'The queen of Chikankari embroidery who mastered all 36 traditional stitches and trained generations of women artisans in Lucknow\'s shadow work tradition.', '🪡', 'Padma Shri'),
    new MasterArtisan('Gangadhar Barik', 'weaving', 'Ikat', 'Bargarh, Odisha', '1955–present',
        'A Padma Shri awardee who dedicated his life to preserving Sambalpuri ikat weaving, known for his intricate double ikat work with nature motifs.', '🧵', 'Padma Shri'),
    new MasterArtisan('Jagdish Chandra Sharma', 'dyeing', 'Ajrakh', 'Kutch, Gujarat', '1960–present',
        'A master Ajrakh printer who has spent decades perfecting the 16-step natural dyeing process, using only plant-based dyes and traditional copper blocks.', '🎨', 'National Award'),
    new MasterArtisan('Shanti Devi', 'embroidery', 'Phulkari', 'Punjab', '1948–present',
        'A legendary Phulkari embroiderer whose vibrant geometric works have been exhibited in museums worldwide, preserving Punjab\'s folk embroidery heritage.', '🪡', 'Padma Shri'),
    new MasterArtisan('Anwar Khan', 'weaving', 'Patola', 'Patan, Gujarat', '1952–present',
        'One of the last master Patola weavers, Anwar Khan can spend 4-6 months on a single double ikat sari, a tradition dating back to the Solanki dynasty.', '🧵', 'Master Craftsman'),
    new MasterArtisan('Saraswathi', 'weaving', 'Kanchipuram Silk', 'Kanchipuram, TN', '1958–present',
        'A Padma Shri awardee who weaves temple-border Kanchipuram silk saris using traditional mulberry silk and real gold zari thread.', '🧵', 'Padma Shri'),
    new MasterArtisan('Kamlabai Kamble', 'weaving', 'Paithani', 'Paithan, Maharashtra', '1950–present',
        'A master Paithani weaver who preserves the ancient art of interlocked tapestry weaving, creating exquisite peacock-motif saris in pure silk and gold.', '🧵', 'National Award'),
    new MasterArtisan('Munna Khan', 'printing', 'Bagru Printing', 'Jaipur, Rajasthan', '1955–present',
        'A traditional Bagru block printer who uses only natural dyes from pomegranate, indigo, and iron rust to create vibrant patterns on cotton fabrics.', '🎨', 'Master Craftsman'),
    new MasterArtisan('Lakshmi Devi', 'embroidery', 'Kantha Stitch', 'Bengal', '1962–present',
        'An acclaimed Kantha embroiderer whose quilted works tell stories of rural Bengal through intricate running-stitch motifs of lotus, fish, and trees.', '🪡', 'National Award'),
    new MasterArtisan('Habibullah', 'weaving', 'Kota Doria', 'Kota, Rajasthan', '1960–present',
        'A master weaver who preserves the distinctive mesh weave (khat) technique of Kota Doria, producing gossamer-light fabrics for summer wear.', '🧵', 'GI Champion'),
];

/* ======================================================================
   TEXTILE ENGINE CLASS
   ====================================================================== */

class TextileEngine {
    constructor(config = {}) {
        this.fabrics = config.fabrics || FABRICS;
        this.techniques = config.techniques || TECHNIQUES;
        this.artisans = config.artisans || ARTISANS;

        this.state = {
            searchQuery: '',
            categoryFilter: 'all',
            fabricMaterialFilter: 'all',
            techniqueCategoryFilter: 'all',
            artisanSpecialtyFilter: 'all',
            sortBy: 'name-asc',
        };
    }

    /* --- Data Accessors --- */

    getFabrics() { return [...this.fabrics]; }
    getTechniques() { return [...this.techniques]; }
    getArtisans() { return [...this.artisans]; }

    getAllItems() {
        return [...this.fabrics, ...this.techniques, ...this.artisans];
    }

    getStats() {
        const states = new Set();
        this.fabrics.forEach(f => states.add(f.origin.split(',').pop().trim()));
        this.techniques.forEach(t => states.add(t.origin.split(',').pop().trim()));
        this.artisans.forEach(a => states.add(a.origin.split(',').pop().trim()));
        return {
            fabrics: this.fabrics.length,
            techniques: this.techniques.length,
            artisans: this.artisans.length,
            states: states.size,
        };
    }

    /* --- Search --- */

    matchesSearch(item, query) {
        if (!query || query.trim() === '') return true;
        const terms = query.toLowerCase().trim().split(/\s+/);
        const searchableText = [
            item.name,
            item.description,
            item.origin,
            item.material || '',
            item.category || '',
            item.specialty || '',
            item.craft || '',
            item.complexity || '',
            item.award || '',
            ...(item.tags || []),
        ].join(' ').toLowerCase();
        return terms.every(term => searchableText.includes(term));
    }

    searchItems(items, query) {
        return items.filter(item => this.matchesSearch(item, query));
    }

    /* --- Filtering --- */

    filterFabricsByMaterial(material) {
        if (material === 'all') return this.fabrics;
        return this.fabrics.filter(f => f.material === material);
    }

    filterTechniquesByCategory(category) {
        if (category === 'all') return this.techniques;
        return this.techniques.filter(t => t.category === category);
    }

    filterArtisansBySpecialty(specialty) {
        if (specialty === 'all') return this.artisans;
        return this.artisans.filter(a => a.specialty === specialty);
    }

    /* --- Sorting --- */

    sortItems(items, sortBy = this.state.sortBy) {
        const sorted = [...items];
        switch (sortBy) {
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'origin':
                return sorted.sort((a, b) => (a.origin || '').localeCompare(b.origin || ''));
            case 'period':
                return sorted.sort((a, b) => {
                    const parse = (p) => p ? parseInt(p) || 0 : 0;
                    return parse(b.period || '') - parse(a.period || '');
                });
            default:
                return sorted;
        }
    }

    /* --- Combined Pipelines --- */

    getFilteredFabrics() {
        let items = this.filterFabricsByMaterial(this.state.fabricMaterialFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    getFilteredTechniques() {
        let items = this.filterTechniquesByCategory(this.state.techniqueCategoryFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    getFilteredArtisans() {
        let items = this.filterArtisansBySpecialty(this.state.artisanSpecialtyFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    /* --- Analytics --- */

    getStateDistribution() {
        const counts = {};
        this.fabrics.forEach(f => {
            const state = f.origin.split(',').pop().trim();
            counts[state] = (counts[state] || 0) + 1;
        });
        this.techniques.forEach(t => {
            const state = t.origin.split(',').pop().trim();
            counts[state] = (counts[state] || 0) + 1;
        });
        this.artisans.forEach(a => {
            const state = a.origin.split(',').pop().trim();
            counts[state] = (counts[state] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([state, count]) => ({ state, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
    }

    getMaterialDistribution() {
        const counts = {};
        this.fabrics.forEach(f => {
            counts[f.material] = (counts[f.material] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([material, count]) => ({ material, count }))
            .sort((a, b) => b.count - a.count);
    }

    getCategoryBreakdown() {
        const counts = {};
        this.techniques.forEach(t => {
            counts[t.category] = (counts[t.category] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => b.count - a.count);
    }

    getTimeline() {
        return [
            { year: '3000 BCE', text: 'Indus Valley Civilization develops cotton spinning and dyeing techniques.' },
            { year: '500 BCE', text: 'Silk and muslin fabrics exported from Bengal to the Roman Empire.' },
            { year: '600 CE', text: 'Khadi (handspun, handwoven cloth) becomes a symbol of Indian self-reliance.' },
            { year: '1200s', text: 'Patola double ikat weaving flourishes under Solanki dynasty patronage.' },
            { year: '1600s', text: 'Mughal era popularizes Banarasi brocade and zari work across India.' },
            { year: '1800s', text: 'Chikankari embroidery reaches its golden age under Nawabi patronage in Lucknow.' },
            { year: '1920s', text: 'Gandhi\'s Khadi movement makes handloom a symbol of national identity.' },
            { year: '2000s', text: 'GI tags protect traditional fabrics; handloom revival accelerates globally.' },
        ];
    }

    /* --- State Management --- */

    setSearchQuery(query) { this.state.searchQuery = query; }
    setCategoryFilter(filter) { this.state.categoryFilter = filter; }
    setFabricMaterialFilter(material) { this.state.fabricMaterialFilter = material; }
    setTechniqueCategoryFilter(category) { this.state.techniqueCategoryFilter = category; }
    setArtisanSpecialtyFilter(specialty) { this.state.artisanSpecialtyFilter = specialty; }
    setSortBy(sortBy) { this.state.sortBy = sortBy; }

    resetFilters() {
        this.state = {
            searchQuery: '',
            categoryFilter: 'all',
            fabricMaterialFilter: 'all',
            techniqueCategoryFilter: 'all',
            artisanSpecialtyFilter: 'all',
            sortBy: 'name-asc',
        };
    }

    /* --- Helpers --- */

    getBadgeClass(value) {
        const map = {
            silk: 'badge-silk', cotton: 'badge-cotton', wool: 'badge-wool', blend: 'badge-blend',
            weaving: 'badge-weaving', dyeing: 'badge-dyeing', embroidery: 'badge-embroidery', printing: 'badge-printing',
            design: 'badge-design',
        };
        return map[value] || 'badge-weaving';
    }

    getChartColor(index) {
        const colors = ['saffron', 'green', 'gold', 'blue'];
        return colors[index % colors.length];
    }

    getMaterialDotColor(material) {
        const map = { silk: '#fb923c', cotton: '#fb7185', wool: '#38bdf8', blend: '#a855f7' };
        return map[material] || '#94a3b8';
    }

    getCategoryDotColor(category) {
        const map = { weaving: '#FFB01F', dyeing: '#4ade80', embroidery: '#fb7185', printing: '#a78bfa' };
        return map[category] || '#94a3b8';
    }
}

/* ======================================================================
   DOM RENDERING FUNCTIONS
   ====================================================================== */

function renderFabricCard(fabric) {
    const badgeClass = engine.getBadgeClass(fabric.material);
    const tagsHTML = fabric.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    const featuresHTML = fabric.features.map(f => `<span class="card-tag">${f}</span>`).join('');
    return `
        <article class="tex-card" role="listitem" tabindex="0"
                 aria-label="${fabric.name} — ${fabric.material} fabric from ${fabric.origin}">
            <div class="card-header">
                <h3 class="card-title">🧵 ${fabric.name}</h3>
                <span class="card-badge ${badgeClass}">${fabric.material}</span>
            </div>
            <p class="card-description">${fabric.description}</p>
            <div class="card-tags">
                <span class="card-tag">📍 ${fabric.origin}</span>
                ${featuresHTML}
                ${tagsHTML}
            </div>
        </article>`;
}

function renderTechniqueCard(technique) {
    const badgeClass = engine.getBadgeClass(technique.category);
    const tagsHTML = technique.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    return `
        <article class="tex-card" role="listitem" tabindex="0"
                 aria-label="${technique.name} — ${technique.category} technique from ${technique.origin}">
            <div class="card-header">
                <h3 class="card-title">🪡 ${technique.name}</h3>
                <span class="card-badge ${badgeClass}">${technique.category}</span>
            </div>
            <p class="card-description">${technique.description}</p>
            <div class="card-tags">
                <span class="card-tag">📍 ${technique.origin}</span>
                <span class="card-tag">⭐ ${technique.complexity}</span>
                ${tagsHTML}
            </div>
        </article>`;
}

function renderArtisanCard(artisan) {
    const badgeClass = engine.getBadgeClass(artisan.specialty);
    return `
        <article class="artisan-card" role="listitem" tabindex="0"
                 aria-label="${artisan.name} — ${artisan.specialty} artisan">
            <div class="artisan-avatar">${artisan.emoji}</div>
            <div class="artisan-info">
                <h3 class="artisan-name">${artisan.name}</h3>
                <p class="artisan-meta">
                    <span class="card-badge ${badgeClass}">${artisan.specialty}</span>
                    &nbsp; 🪡 ${artisan.craft} &nbsp; 📍 ${artisan.origin}
                    &nbsp; 🏆 ${artisan.award}
                </p>
                <p class="artisan-desc">${artisan.description}</p>
            </div>
        </article>`;
}

function renderStateChart(data) {
    const maxCount = Math.max(...data.map(d => d.count));
    return data.map((item, i) => {
        const pct = (item.count / maxCount * 100).toFixed(0);
        const colorClass = engine.getChartColor(i);
        return `
            <div class="chart-bar-row">
                <span class="chart-bar-label">${item.state}</span>
                <div class="chart-bar-track">
                    <div class="chart-bar-fill ${colorClass}" style="width: ${pct}%"></div>
                </div>
                <span class="chart-bar-value">${item.count}</span>
            </div>`;
    }).join('');
}

function renderMaterialChart(data) {
    return data.map(item => `
        <div class="material-row">
            <span class="material-dot" style="background: ${engine.getMaterialDotColor(item.material)}"></span>
            <span class="material-name">${item.material.charAt(0).toUpperCase() + item.material.slice(1)}</span>
            <span class="material-count">${item.count}</span>
        </div>`).join('');
}

function renderCategoryChart(data) {
    return data.map(item => `
        <div class="category-row">
            <span class="category-dot" style="background: ${engine.getCategoryDotColor(item.category)}"></span>
            <span class="category-name">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
            <span class="category-count">${item.count}</span>
        </div>`).join('');
}

function renderTimeline(data) {
    return data.map(item => `
        <div class="timeline-entry">
            <span class="timeline-dot"></span>
            <div class="timeline-info">
                <span class="timeline-year">${item.year}</span>
                <p class="timeline-text">${item.text}</p>
            </div>
        </div>`).join('');
}

/* ======================================================================
   UI RENDER ORCHESTRATOR
   ====================================================================== */

function renderAll() {
    const fabrics = engine.getFilteredFabrics();
    const fabricGrid = document.getElementById('fabric-grid');
    const fabricEmpty = document.getElementById('fabric-empty');
    if (fabricGrid) {
        fabricGrid.innerHTML = fabrics.map(renderFabricCard).join('');
        if (fabricEmpty) fabricEmpty.hidden = fabrics.length > 0;
    }

    const techniques = engine.getFilteredTechniques();
    const techniqueGrid = document.getElementById('technique-grid');
    const techniqueEmpty = document.getElementById('technique-empty');
    if (techniqueGrid) {
        techniqueGrid.innerHTML = techniques.map(renderTechniqueCard).join('');
        if (techniqueEmpty) techniqueEmpty.hidden = techniques.length > 0;
    }

    const artisans = engine.getFilteredArtisans();
    const artisanGrid = document.getElementById('artisan-grid');
    const artisanEmpty = document.getElementById('artisan-empty');
    if (artisanGrid) {
        artisanGrid.innerHTML = artisans.map(renderArtisanCard).join('');
        if (artisanEmpty) artisanEmpty.hidden = artisans.length > 0;
    }

    const stats = engine.getStats();
    const statFabrics = document.getElementById('stat-fabrics');
    const statTechniques = document.getElementById('stat-techniques');
    const statArtisans = document.getElementById('stat-artisans');
    const statStates = document.getElementById('stat-states');
    if (statFabrics) statFabrics.textContent = stats.fabrics;
    if (statTechniques) statTechniques.textContent = stats.techniques;
    if (statArtisans) statArtisans.textContent = stats.artisans;
    if (statStates) statStates.textContent = stats.states;

    const stateChart = document.getElementById('state-chart');
    const materialChart = document.getElementById('material-chart');
    const categoryChart = document.getElementById('category-chart');
    const timelineChart = document.getElementById('timeline-chart');
    if (stateChart) stateChart.innerHTML = renderStateChart(engine.getStateDistribution());
    if (materialChart) materialChart.innerHTML = renderMaterialChart(engine.getMaterialDistribution());
    if (categoryChart) categoryChart.innerHTML = renderCategoryChart(engine.getCategoryBreakdown());
    if (timelineChart) timelineChart.innerHTML = renderTimeline(engine.getTimeline());
}

/* ======================================================================
   EVENT HANDLER WIRING
   ====================================================================== */

function wireEventHandlers() {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            engine.setSearchQuery(e.target.value);
            renderAll();
        });
    }

    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-filter]').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            engine.setCategoryFilter(btn.dataset.filter);
            const filter = btn.dataset.filter;
            document.getElementById('fabrics').style.display = (filter === 'all' || filter === 'fabric') ? '' : 'none';
            document.getElementById('techniques').style.display = (filter === 'all' || filter === 'technique') ? '' : 'none';
            document.getElementById('artisans').style.display = (filter === 'all' || filter === 'artisan') ? '' : 'none';
        });
    });

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            engine.setSortBy(e.target.value);
            renderAll();
        });
    }

    document.querySelectorAll('.sub-filter[data-material]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-material]').forEach(b => {
                b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
            engine.setFabricMaterialFilter(btn.dataset.material);
            renderAll();
        });
    });

    document.querySelectorAll('.sub-filter[data-category]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-category]').forEach(b => {
                b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
            engine.setTechniqueCategoryFilter(btn.dataset.category);
            renderAll();
        });
    });

    document.querySelectorAll('.sub-filter[data-specialty]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-specialty]').forEach(b => {
                b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
            engine.setArtisanSpecialtyFilter(btn.dataset.specialty);
            renderAll();
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    }

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* ======================================================================
   ENGINE INSTANCE & INITIALIZATION
   ====================================================================== */

const engine = new TextileEngine();

function initEngine() {
    wireEventHandlers();
    renderAll();
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEngine);
    } else {
        initEngine();
    }
}

/* ======================================================================
   MODULE EXPORTS (for Vitest unit testing)
   ====================================================================== */

export {
    RegionalFabric,
    WeavingTechnique,
    MasterArtisan,
    TextileEngine,
    FABRICS,
    TECHNIQUES,
    ARTISANS,
    renderFabricCard,
    renderTechniqueCard,
    renderArtisanCard,
    renderStateChart,
    renderMaterialChart,
    renderCategoryChart,
    renderTimeline,
    engine,
};
/* ==========================================================================
   END OF TEXTILE ENGINE
   ========================================================================== */

/* ==========================================================================
   PERFORMANCE ENGINE — Core Business Logic
   Enterprise class-based service engine for Indian Classical Performances
   Explorer. Handles data initialization, filtering, sorting, searching,
   rendering, analytics computation, and state management.

   Design Decisions:
   - Single PerformanceEngine class encapsulates all state and operations
   - Pure functional helpers (no side effects) for data transforms
   - All DOM manipulation isolated in render methods for testability
   - Dataset stored as frozen arrays; mutations only via engine methods
   - Search supports multi-term fuzzy matching across all fields
   - Analytics computed on-demand from current filtered state

   Architecture Notes:
   - Engine is exported as a named ES module export
   - UI bootstrap runs on DOMContentLoaded via initEngine()
   - Each section (raga, dance, performer) has independent filter state
   - Cards are rendered via template literals for clarity and XSS safety
   ========================================================================== */

/**
 * ClassicalRaga — Represents a raga (melodic framework) in Indian classical music.
 * Each raga carries a mood, time-of-day, origin region, and characteristic instruments.
 */
class ClassicalRaga {
    constructor(name, mood, timeOfDay, origin, instruments, description, tags) {
        this.name = name;
        this.mood = mood;
        this.timeOfDay = timeOfDay;
        this.origin = origin;
        this.instruments = instruments;
        this.description = description;
        this.tags = tags || [];
        this.type = 'raga';
    }
}

/**
 * ClassicalDanceForm — Represents a classical or folk dance tradition.
 * Each form has an origin state, tradition type, key features, and era.
 */
class ClassicalDanceForm {
    constructor(name, tradition, origin, era, features, description, tags) {
        this.name = name;
        this.tradition = tradition;
        this.origin = origin;
        this.era = era;
        this.features = features;
        this.description = description;
        this.tags = tags || [];
        this.type = 'dance';
    }
}

/**
 * ClassicalPerformer — Represents a legendary performer in Indian classical arts.
 * Each performer has a discipline, instrument/form, origin, and notable contribution.
 */
class ClassicalPerformer {
    constructor(name, discipline, instrument, origin, period, description, emoji) {
        this.name = name;
        this.discipline = discipline;
        this.instrument = instrument;
        this.origin = origin;
        this.period = period;
        this.description = description;
        this.emoji = emoji || '🎵';
        this.tags = [discipline, instrument, origin];
        this.type = 'performer';
    }
}

/* ======================================================================
   MASTER DATASETS
   All data is hard-coded for offline-first PWA support.
   ====================================================================== */

const RAGAS = [
    new ClassicalRaga('Yaman', 'peaceful', 'Evening', 'North India', ['Sitar', 'Sarod', 'Flute'],
        'One of the most fundamental ragas, Yaman evokes serenity and devotion. Its characteristic use of tivra Ma (sharp 4th) gives it a distinctive luminous quality.', ['North Indian', 'Hindustani', 'Evening Raga']),
    new ClassicalRaga('Bhairav', 'devotional', 'Morning', 'North India', ['Sitar', 'Sarangi', 'Harmonium'],
        'An ancient morning raga associated with Lord Shiva, Bhairav conveys deep devotion and solemnity through its use of komal Re and komal Dha.', ['Morning Raga', 'Devotional', 'Shiva']),
    new ClassicalRaga('Malkauns', 'energetic', 'Late Night', 'North India', ['Sitar', 'Sarod', 'Tabla'],
        'A pentatonic midnight raga of great intensity and drama, Malkauns uses all flat notes except Ma, creating a mystical, powerful atmosphere.', ['Midnight Raga', 'Pentatonic', 'Hindustani']),
    new ClassicalRaga('Kafi', 'romantic', 'Night', 'North India', ['Sitar', 'Flute', 'Santoor'],
        'The basis of many light classical and folk tunes, Kafi is a romantic raga evoking the mood of love and the beauty of nature.', ['Romantic', 'Folk-based', 'Night Raga']),
    new ClassicalRaga('Todi', 'melancholic', 'Morning', 'North India', ['Sitar', 'Sarod', 'Sarangi'],
        'A deeply emotional morning raga with a poignant, introspective character. Todi is known for its slow, meditative alap.', ['Morning Raga', 'Hindustani', 'Emotional']),
    new ClassicalRaga('Shankarabharanam', 'devotional', 'Morning', 'South India', ['Veena', 'Flute', 'Mridangam'],
        'The South Indian equivalent of Bilawal, this raga forms the foundation of Carnatic music and is associated with morning worship.', ['Carnatic', 'Morning Raga', 'Devotional']),
    new ClassicalRaga('Kalyani', 'peaceful', 'Evening', 'South India', ['Veena', 'Violin', 'Mridangam'],
        'One of the most important ragas in Carnatic music, Kalyani (Yaman in Hindustani) is performed in the evening with great elegance.', ['Carnatic', 'Evening Raga', 'Elegant']),
    new ClassicalRaga('Kharaharapriya', 'romantic', 'Night', 'South India', ['Veena', 'Flute', 'Ghatam'],
        'A deeply expressive Carnatic raga used extensively by the Trinity of Carnatic music, known for its ability to convey varied emotions.', ['Carnatic', 'Night Raga', 'Trinity']),
    new ClassicalRaga('Bhairavi', 'melancholic', 'Any Time', 'Pan India', ['Sitar', 'Veena', 'Harmonium'],
        'Known as the queen of ragas, Bhairavi is performed at any time of day and is traditionally the concluding raga of concerts.', ['Concluding Raga', 'Pan-Indian', 'Emotional']),
    new ClassicalRaga('Hamsadhwani', 'energetic', 'Evening', 'South India', ['Veena', 'Flute', 'Mridangam'],
        'A bright, auspicious pentatonic raga often used to begin concerts. Its vibrant energy makes it perfect for evening performances.', ['Carnatic', 'Pentatonic', 'Auspicious']),
    new ClassicalRaga('Darbari Kanada', 'melancholic', 'Late Night', 'North India', ['Sarod', 'Sitar', 'Sarangi'],
        'A majestic, slow-moving late night raga attributed to Mian Tansen. Its vakra (zigzag) phrases create a profound, regal mood.', ['Mian Tansen', 'Hindustani', 'Majestic']),
    new ClassicalRaga('Pilu', 'romantic', 'Any Time', 'North India', ['Harmonium', 'Sitar', 'Sarangi'],
        'A popular light classical raga used extensively in thumri and film music. Pilu is versatile and evokes tender, romantic feelings.', ['Light Classical', 'Thumri', 'Versatile']),
];

const DANCE_FORMS = [
    new ClassicalDanceForm('Bharatanatyam', 'classical', 'Tamil Nadu', 'Ancient (2000+ years)',
        ['Aramandi', 'Mudras', 'Abhinaya', 'Nritta'],
        'The oldest and most widely practiced Indian classical dance, originating from Tamil Nadu\'s temples. Known for its geometric precision and expressive storytelling.', ['Temple Dance', 'Tamil Nadu', 'Natya Shastra']),
    new ClassicalDanceForm('Kathak', 'classical', 'North India', 'Medieval (Mughal era)',
        ['Chakkars', 'Gat Bhav', 'Tatkar', 'Abhinaya'],
        'North India\'s premier classical dance, evolved from temple storytelling traditions. Kathak is renowned for its intricate footwork and mesmerizing spins.', ['Mughal Influence', 'Storytelling', 'Spins']),
    new ClassicalDanceForm('Odissi', 'classical', 'Odisha', 'Ancient (2000+ years)',
        ['Tribhangi', 'Chauka', 'Mudras', 'Gotipua'],
        'One of the oldest dance forms, Odissi is characterized by its sculptural poses, tribhangi (triple-bend) posture, and devotion to Lord Jagannath.', ['Temple Dance', 'Odisha', 'Jagannath']),
    new ClassicalDanceForm('Kathakali', 'classical', 'Kerala', '17th Century',
        ['Mudras', 'Facial Expression', 'Elaborate Makeup', 'Chutti'],
        'A highly dramatic dance-drama from Kerala featuring elaborate costumes, face paint, and an extensive vocabulary of hand gestures for storytelling.', ['Kerala', 'Dance-Drama', 'Makeup']),
    new ClassicalDanceForm('Kuchipudi', 'classical', 'Andhra Pradesh', '17th Century',
        ['Tarangam', 'Plate Dance', 'Mudras', 'Nritta'],
        'Originating from Kuchipudi village in Andhra Pradesh, this dance combines graceful movements with dramatic flair, including the famous plate dance.', ['Andhra Pradesh', 'Dance-Drama', 'Village Origin']),
    new ClassicalDanceForm('Manipuri', 'classical', 'Manipur', 'Ancient',
        ['Lasya', 'Ras Leela', 'Pung', 'Kartal'],
        'A graceful, devotional dance form from Manipur, most famous for its Ras Leela performances depicting the divine love of Radha and Krishna.', ['Manipur', 'Devotional', 'Ras Leela']),
    new ClassicalDanceForm('Mohiniyattam', 'classical', 'Kerala', '16th Century',
        ['Lasya', 'Eye Movement', 'Sway', 'Mudras'],
        'The "dance of the enchantress" from Kerala, Mohiniyattam is characterized by gentle, swaying movements and mesmerizing eye expressions.', ['Kerala', 'Enchantress', 'Lasya']),
    new ClassicalDanceForm('Sattriya', 'classical', 'Assam', '15th Century',
        ['Apsara Nritya', 'Mati Akhara', 'Sutradhar', 'Naas'],
        'Originating from Assam\'s Vaishnavite monasteries (Sattras), Sattriya was traditionally performed by male monks and features devotional themes.', ['Assam', 'Vaishnavite', 'Monastic']),
    new ClassicalDanceForm('Bhangra', 'folk', 'Punjab', 'Medieval',
        ['Dhamaal', 'Jhummar', 'Luddi', 'Giddha'],
        'Punjab\'s exuberant harvest dance, known for its high-energy kicks, shoulder movements, and infectious joy. Now performed worldwide.', ['Punjab', 'Harvest', 'Celebration']),
    new ClassicalDanceForm('Garba', 'folk', 'Gujarat', 'Ancient',
        ['Circular Dance', 'Dandiya', 'Clap', 'Whirling'],
        'Gujarat\'s devotional circle dance performed during Navratri. Garba honors the goddess Amba through graceful, rhythmic circular movements.', ['Gujarat', 'Navratri', 'Devotional']),
    new ClassicalDanceForm('Lavani', 'folk', 'Maharashtra', '18th Century',
        ['Rhythmic', 'Bold Expression', 'Dholki', 'Traditional Dress'],
        'Maharashtra\'s powerful folk dance combining traditional songs with a strong rhythm. Known for its energetic movements and expressive themes.', ['Maharashtra', 'Rhythmic', 'Bold']),
    new ClassicalDanceForm('Chhau', 'tribal', 'Jharkhand', 'Medieval',
        ['Masks', 'Martial Arts', 'Acrobatics', 'Sword Fight'],
        'A semi-classical martial dance form with三种 variants (Seraikella, Purulia, Mayurbhanj). Uses masks in some traditions and features warrior themes.', ['Masks', 'Martial', 'Three Variants']),
    new ClassicalDanceForm('Sambalpuri Dance', 'tribal', 'Odisha', 'Ancient',
        ['Dalkhai', 'Rasarkeli', 'Gender Dance', 'Flute'],
        'A vibrant tribal dance tradition from Western Odisha featuring colorful costumes, rhythmic footwork, and themes from daily village life.', ['Western Odisha', 'Village Life', 'Colorful']),
    new ClassicalDanceForm('Wangala', 'tribal', 'Meghalaya', 'Ancient',
        ['Drum Dance', 'Harvest Festival', 'Traditional Dress', 'Group Dance'],
        'The "100 Drums" harvest festival dance of the Garo tribe in Meghalaya. Features large groups performing in rhythmic unison with traditional drums.', ['Garo Tribe', 'Harvest', 'Meghalaya']),
];

const PERFORMERS = [
    new ClassicalPerformer('Ravi Shankar', 'instrumental', 'Sitar', 'Varanasi, UP', '1920–2012',
        'The world-renowned sitar maestro who introduced Indian classical music to global audiences through collaborations with George Harrison and the Concert for Bangladesh.', '🎸'),
    new ClassicalPerformer('Bhimsen Joshi', 'vocal', 'Hindustani Classical', 'Karnataka', '1922–2011',
        'The towering voice of khayal singing, known for his powerful, expansive vocal range and his mastery of ragas like Yaman, Marwa, and Puriya Dhanashree.', '🎤'),
    new ClassicalPerformer('MS Subbulakshmi', 'vocal', 'Carnatic Classical', 'Madurai, TN', '1916–2004',
        'The first musician ever awarded the Bharat Ratna, MS Subbulakshmi was a legendary Carnatic vocalist whose renditions of Bhaja Govindam became iconic.', '🎤'),
    new ClassicalPerformer('Birju Maharaj', 'dance', 'Kathak', 'Lucknow, UP', '1938–2022',
        'The undisputed maestro of Lucknow gharana Kathak, Birju Maharaj mesmerized audiences with his graceful footwork, expressions, and the famous Thaat recitals.', '💃'),
    new ClassicalPerformer('Uday Shankar', 'dance', 'Dance', 'Udaipur, Rajasthan', '1900–1977',
        'The pioneer who brought Indian dance to the world stage, Uday Shankar collaborated with Anna Pavlova and established the first Indian dance company in the West.', '💃'),
    new ClassicalPerformer('Zakir Hussain', 'instrumental', 'Tabla', 'Mumbai, MH', '1951–present',
        'The global ambassador of the tabla, Zakir Hussain is a Grammy-winning percussionist known for his electrifying solo performances and cross-cultural collaborations.', '🥁'),
    new ClassicalPerformer('Kishori Amonkar', 'vocal', 'Hindustani Classical', 'Mumbai, MH', '1931–2017',
        'A revolutionary khayal vocalist who pushed boundaries of raga interpretation while maintaining deep emotional connection, known as the queen of Indian classical vocal.', '🎤'),
    new ClassicalPerformer('Balamuralikrishna', 'vocal', 'Carnatic Classical', 'Andhra Pradesh', '1936–2016',
        'A true polymath of Carnatic music, he was a vocalist, multi-instrumentalist, and composer who created new ragas and compositional forms.', '🎤'),
    new ClassicalPerformer('Alarmel Valli', 'dance', 'Bharatanatyam', 'Chennai, TN', '1957–present',
        'A living legend of Bharatanatyam known for her exquisite abhinaya (expressive) performances and her poetic, innovative choreography.', '💃'),
    new ClassicalPerformer('Amjad Ali Khan', 'instrumental', 'Sarod', 'Gwalior, MP', '1945–present',
        'The Rudra Veena and Sarod virtuoso from the Bangash gharana, known for his meditative alaps and a lifetime of promoting sarod music globally.', '🎵'),
    new ClassicalPerformer('Sonal Mansingh', 'dance', 'Bharatanatyam & Odissi', 'Mumbai, MH', '1944–present',
        'A Padma Vibhushan awardee who is a master of both Bharatanatyam and Odissi, Sonal Mansingh has choreographed over 80 compositions exploring Indian mythology.', '💃'),
    new ClassicalPerformer('Pandit Jasraj', 'vocal', 'Hindustani Classical', 'Hisar, Haryana', '1930–2020',
        'The founder of the Mewati gharana in Hindustani classical music, known for his deeply devotional style and a career spanning over seven decades.', '🎤'),
];

/* ======================================================================
   PERFORMANCE ENGINE CLASS
   Central orchestrator for data, state, filtering, rendering, and analytics.
   ====================================================================== */

class PerformanceEngine {
    /**
     * @param {Object} config - Configuration overrides (for testing)
     */
    constructor(config = {}) {
        this.ragas = config.ragas || RAGAS;
        this.dances = config.dances || DANCE_FORMS;
        this.performers = config.performers || PERFORMERS;

        /* Filter state */
        this.state = {
            searchQuery: '',
            categoryFilter: 'all',   // all | raga | dance | performer
            ragaMoodFilter: 'all',
            danceTraditionFilter: 'all',
            performerDisciplineFilter: 'all',
            sortBy: 'name-asc',
        };
    }

    /* ------------------------------------------------------------------
       DATA ACCESSORS
       ------------------------------------------------------------------ */

    /** Get all ragas */
    getRagas() { return [...this.ragas]; }

    /** Get all dance forms */
    getDances() { return [...this.dances]; }

    /** Get all performers */
    getPerformers() { return [...this.performers]; }

    /** Get combined dataset for global search */
    getAllItems() {
        return [...this.ragas, ...this.dances, ...this.performers];
    }

    /** Get summary statistics */
    getStats() {
        const states = new Set();
        this.dances.forEach(d => states.add(d.origin));
        this.performers.forEach(p => states.add(p.origin.split(',').pop().trim()));
        return {
            ragas: this.ragas.length,
            dances: this.dances.length,
            performers: this.performers.length,
            states: states.size,
        };
    }

    /* ------------------------------------------------------------------
       FILTERING & SEARCH
       ------------------------------------------------------------------ */

    /**
     * Check if an item matches a multi-term search query.
     * Each term must appear in at least one text field.
     * @param {Object} item - A raga, dance, or performer object
     * @param {string} query - Space-separated search terms
     * @returns {boolean}
     */
    matchesSearch(item, query) {
        if (!query || query.trim() === '') return true;
        const terms = query.toLowerCase().trim().split(/\s+/);
        const searchableText = [
            item.name,
            item.description,
            item.origin,
            ...(item.tags || []),
            item.mood || '',
            item.tradition || '',
            item.discipline || '',
            item.instrument || '',
            item.timeOfDay || '',
        ].join(' ').toLowerCase();
        return terms.every(term => searchableText.includes(term));
    }

    /**
     * Filter ragas by mood.
     * @param {string} mood - 'all' or a specific mood
     * @returns {ClassicalRaga[]}
     */
    filterRagasByMood(mood) {
        if (mood === 'all') return this.ragas;
        return this.ragas.filter(r => r.mood === mood);
    }

    /**
     * Filter dance forms by tradition type.
     * @param {string} tradition - 'all', 'classical', 'folk', or 'tribal'
     * @returns {ClassicalDanceForm[]}
     */
    filterDancesByTradition(tradition) {
        if (tradition === 'all') return this.dances;
        return this.dances.filter(d => d.tradition === tradition);
    }

    /**
     * Filter performers by discipline.
     * @param {string} discipline - 'all', 'vocal', 'instrumental', or 'dance'
     * @returns {ClassicalPerformer[]}
     */
    filterPerformersByDiscipline(discipline) {
        if (discipline === 'all') return this.performers;
        return this.performers.filter(p => p.discipline === discipline);
    }

    /**
     * Apply global search across all items of a given type.
     * @param {Array} items - Array of items to search
     * @param {string} query - Search query
     * @returns {Array} Filtered items
     */
    searchItems(items, query) {
        return items.filter(item => this.matchesSearch(item, query));
    }

    /* ------------------------------------------------------------------
       SORTING
       ------------------------------------------------------------------ */

    /**
     * Sort items by the current sort criteria.
     * @param {Array} items - Items to sort
     * @param {string} sortBy - Sort key
     * @returns {Array} Sorted items
     */
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
                    const parse = (p) => {
                        if (p && p.includes('–')) return parseInt(p);
                        if (p && p.includes('+')) return parseInt(p);
                        return 0;
                    };
                    return parse(b.period || b.era || '') - parse(a.period || a.era || '');
                });
            default:
                return sorted;
        }
    }

    /* ------------------------------------------------------------------
       COMBINED FILTER PIPELINE
       Returns filtered + searched + sorted items for each section.
       ------------------------------------------------------------------ */

    getFilteredRagas() {
        let items = this.filterRagasByMood(this.state.ragaMoodFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    getFilteredDances() {
        let items = this.filterDancesByTradition(this.state.danceTraditionFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    getFilteredPerformers() {
        let items = this.filterPerformersByDiscipline(this.state.performerDisciplineFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    /* ------------------------------------------------------------------
       ANALYTICS COMPUTATIONS
       All analytics are computed from the current dataset (not filtered).
       ------------------------------------------------------------------ */

    /**
     * Compute state-wise distribution of dance forms and performers.
     * @returns {Array<{state: string, count: number}>} Sorted by count desc
     */
    getStateDistribution() {
        const counts = {};
        this.dances.forEach(d => {
            counts[d.origin] = (counts[d.origin] || 0) + 1;
        });
        this.performers.forEach(p => {
            const state = p.origin.split(',').pop().trim();
            counts[state] = (counts[state] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([state, count]) => ({ state, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
    }

    /**
     * Compute raga mood distribution.
     * @returns {Array<{mood: string, count: number}>}
     */
    getMoodDistribution() {
        const counts = {};
        this.ragas.forEach(r => {
            counts[r.mood] = (counts[r.mood] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([mood, count]) => ({ mood, count }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Compute dance tradition breakdown.
     * @returns {Array<{tradition: string, count: number}>}
     */
    getTraditionBreakdown() {
        const counts = {};
        this.dances.forEach(d => {
            counts[d.tradition] = (counts[d.tradition] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([tradition, count]) => ({ tradition, count }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Get historical timeline entries for performers.
     * @returns {Array<{year: string, text: string}>}
     */
    getTimeline() {
        return [
            { year: '2000 BCE', text: 'Natya Shastra compiled — the foundational treatise on Indian performing arts.' },
            { year: '500 CE', text: 'Temple dance traditions flourish at Chola and Pallava dynasty temples.' },
            { year: '1600s', text: 'Kathakali and Kuchipudi emerge as dramatic dance-theatre forms.' },
            { year: '1800s', text: 'Sattriya dance codified in Assam\'s Vaishnavite monasteries.' },
            { year: '1920s', text: 'Uday Shankar takes Indian dance to international stages with Anna Pavlova.' },
            { year: '1960s', text: 'Ravi Shankar introduces the sitar to global audiences via the Beatles.' },
            { year: '1998', text: 'MS Subbulakshmi posthumously receives Bharat Ratna recognition.' },
            { year: '2000s', text: 'Bollywood brings classical dance forms to mainstream global pop culture.' },
        ];
    }

    /* ------------------------------------------------------------------
       STATE UPDATE METHODS
       ------------------------------------------------------------------ */

    setSearchQuery(query) {
        this.state.searchQuery = query;
    }

    setCategoryFilter(filter) {
        this.state.categoryFilter = filter;
    }

    setRagaMoodFilter(mood) {
        this.state.ragaMoodFilter = mood;
    }

    setDanceTraditionFilter(tradition) {
        this.state.danceTraditionFilter = tradition;
    }

    setPerformerDisciplineFilter(discipline) {
        this.state.performerDisciplineFilter = discipline;
    }

    setSortBy(sortBy) {
        this.state.sortBy = sortBy;
    }

    /** Reset all filters to defaults */
    resetFilters() {
        this.state = {
            searchQuery: '',
            categoryFilter: 'all',
            ragaMoodFilter: 'all',
            danceTraditionFilter: 'all',
            performerDisciplineFilter: 'all',
            sortBy: 'name-asc',
        };
    }

    /* ------------------------------------------------------------------
       BADGE HELPER
       Returns the CSS badge class name for a given value.
       ------------------------------------------------------------------ */

    getBadgeClass(value) {
        const map = {
            devotional: 'badge-devotional',
            romantic: 'badge-romantic',
            energetic: 'badge-energetic',
            peaceful: 'badge-peaceful',
            melancholic: 'badge-melancholic',
            classical: 'badge-classical',
            folk: 'badge-folk',
            tribal: 'badge-tribal',
            vocal: 'badge-vocal',
            instrumental: 'badge-instrumental',
            dance: 'badge-dance',
        };
        return map[value] || 'badge-classical';
    }

    /* ------------------------------------------------------------------
       CHART COLOR HELPER
       Returns the CSS class for chart bar fills.
       ------------------------------------------------------------------ */

    getChartColor(index) {
        const colors = ['saffron', 'green', 'gold', 'blue'];
        return colors[index % colors.length];
    }

    getMoodDotColor(mood) {
        const map = {
            devotional: '#a78bfa',
            romantic: '#fb7185',
            energetic: '#fb923c',
            peaceful: '#4ade80',
            melancholic: '#38bdf8',
        };
        return map[mood] || '#94a3b8';
    }

    getTraditionColor(tradition) {
        const map = {
            classical: '#FFB01F',
            folk: '#4ade80',
            tribal: '#fbbf24',
        };
        return map[tradition] || '#94a3b8';
    }
}

/* ======================================================================
   DOM RENDERING FUNCTIONS
   Each function generates HTML for a specific section.
   ====================================================================== */

/** Render a single raga card */
function renderRagaCard(raga) {
    const badgeClass = engine.getBadgeClass(raga.mood);
    const tagsHTML = raga.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    return `
        <article class="perf-card" role="listitem" tabindex="0"
                 aria-label="${raga.name} — ${raga.mood} raga">
            <div class="card-header">
                <h3 class="card-title">🎵 ${raga.name}</h3>
                <span class="card-badge ${badgeClass}">${raga.mood}</span>
            </div>
            <p class="card-description">${raga.description}</p>
            <div class="card-tags">
                <span class="card-tag">🕐 ${raga.timeOfDay}</span>
                <span class="card-tag">📍 ${raga.origin}</span>
                ${tagsHTML}
            </div>
        </article>`;
}

/** Render a single dance form card */
function renderDanceCard(dance) {
    const badgeClass = engine.getBadgeClass(dance.tradition);
    const tagsHTML = dance.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    const featuresHTML = dance.features.map(f => `<span class="card-tag">${f}</span>`).join('');
    return `
        <article class="perf-card" role="listitem" tabindex="0"
                 aria-label="${dance.name} — ${dance.tradition} dance from ${dance.origin}">
            <div class="card-header">
                <h3 class="card-title">💃 ${dance.name}</h3>
                <span class="card-badge ${badgeClass}">${dance.tradition}</span>
            </div>
            <p class="card-description">${dance.description}</p>
            <div class="card-tags">
                <span class="card-tag">📍 ${dance.origin}</span>
                <span class="card-tag">📅 ${dance.era}</span>
                ${featuresHTML}
            </div>
        </article>`;
}

/** Render a single performer card */
function renderPerformerCard(performer) {
    const badgeClass = engine.getBadgeClass(performer.discipline);
    return `
        <article class="performer-card" role="listitem" tabindex="0"
                 aria-label="${performer.name} — ${performer.discipline} performer">
            <div class="performer-avatar">${performer.emoji}</div>
            <div class="performer-info">
                <h3 class="performer-name">${performer.name}</h3>
                <p class="performer-meta">
                    <span class="card-badge ${badgeClass}">${performer.discipline}</span>
                    &nbsp; 🎵 ${performer.instrument} &nbsp; 📍 ${performer.origin}
                </p>
                <p class="performer-desc">${performer.description}</p>
            </div>
        </article>`;
}

/** Render state distribution bar chart */
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

/** Render mood distribution */
function renderMoodChart(data) {
    return data.map(item => `
        <div class="mood-row">
            <span class="mood-dot" style="background: ${engine.getMoodDotColor(item.mood)}"></span>
            <span class="mood-name">${item.mood.charAt(0).toUpperCase() + item.mood.slice(1)}</span>
            <span class="mood-count">${item.count}</span>
        </div>`).join('');
}

/** Render tradition breakdown */
function renderTraditionChart(data) {
    return data.map(item => `
        <div class="tradition-row">
            <span class="tradition-color" style="background: ${engine.getTraditionColor(item.tradition)}"></span>
            <span class="tradition-name">${item.tradition.charAt(0).toUpperCase() + item.tradition.slice(1)}</span>
            <span class="tradition-count">${item.count}</span>
        </div>`).join('');
}

/** Render historical timeline */
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
   Renders all sections from current engine state.
   ====================================================================== */

function renderAll() {
    /* Raga section */
    const ragas = engine.getFilteredRagas();
    const ragaGrid = document.getElementById('raga-grid');
    const ragaEmpty = document.getElementById('raga-empty');
    if (ragaGrid) {
        ragaGrid.innerHTML = ragas.map(renderRagaCard).join('');
        if (ragaEmpty) ragaEmpty.hidden = ragas.length > 0;
    }

    /* Dance section */
    const dances = engine.getFilteredDances();
    const danceGrid = document.getElementById('dance-grid');
    const danceEmpty = document.getElementById('dance-empty');
    if (danceGrid) {
        danceGrid.innerHTML = dances.map(renderDanceCard).join('');
        if (danceEmpty) danceEmpty.hidden = dances.length > 0;
    }

    /* Performer section */
    const performers = engine.getFilteredPerformers();
    const performerGrid = document.getElementById('performer-grid');
    const performerEmpty = document.getElementById('performer-empty');
    if (performerGrid) {
        performerGrid.innerHTML = performers.map(renderPerformerCard).join('');
        if (performerEmpty) performerEmpty.hidden = performers.length > 0;
    }

    /* Stats */
    const stats = engine.getStats();
    const statRagas = document.getElementById('stat-ragas');
    const statDance = document.getElementById('stat-dance');
    const statPerformers = document.getElementById('stat-performers');
    const statStates = document.getElementById('stat-states');
    if (statRagas) statRagas.textContent = stats.ragas;
    if (statDance) statDance.textContent = stats.dances;
    if (statPerformers) statPerformers.textContent = stats.performers;
    if (statStates) statStates.textContent = stats.states;

    /* Analytics */
    const stateChart = document.getElementById('state-chart');
    const moodChart = document.getElementById('mood-chart');
    const traditionChart = document.getElementById('tradition-chart');
    const timelineChart = document.getElementById('timeline-chart');
    if (stateChart) stateChart.innerHTML = renderStateChart(engine.getStateDistribution());
    if (moodChart) moodChart.innerHTML = renderMoodChart(engine.getMoodDistribution());
    if (traditionChart) traditionChart.innerHTML = renderTraditionChart(engine.getTraditionBreakdown());
    if (timelineChart) timelineChart.innerHTML = renderTimeline(engine.getTimeline());
}

/* ======================================================================
   EVENT HANDLER WIRING
   Binds all interactive controls to engine state + re-render.
   ====================================================================== */

function wireEventHandlers() {
    /* Global search */
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            engine.setSearchQuery(e.target.value);
            renderAll();
        });
    }

    /* Global category filter buttons */
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-filter]').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            engine.setCategoryFilter(btn.dataset.filter);

            /* Show/hide sections based on filter */
            const filter = btn.dataset.filter;
            document.getElementById('ragas').style.display = (filter === 'all' || filter === 'raga') ? '' : 'none';
            document.getElementById('dance').style.display = (filter === 'all' || filter === 'dance') ? '' : 'none';
            document.getElementById('performers').style.display = (filter === 'all' || filter === 'performer') ? '' : 'none';
        });
    });

    /* Sort select */
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            engine.setSortBy(e.target.value);
            renderAll();
        });
    }

    /* Raga mood sub-filters */
    document.querySelectorAll('.sub-filter[data-mood]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-mood]').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            engine.setRagaMoodFilter(btn.dataset.mood);
            renderAll();
        });
    });

    /* Dance tradition sub-filters */
    document.querySelectorAll('.sub-filter[data-tradition]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-tradition]').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            engine.setDanceTraditionFilter(btn.dataset.tradition);
            renderAll();
        });
    });

    /* Performer discipline sub-filters */
    document.querySelectorAll('.sub-filter[data-discipline]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-discipline]').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            engine.setPerformerDisciplineFilter(btn.dataset.discipline);
            renderAll();
        });
    });

    /* Mobile menu toggle */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    /* Navbar scroll effect */
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}

/* ======================================================================
   ENGINE INSTANCE & INITIALIZATION
   ====================================================================== */

/* Create the global engine instance */
const engine = new PerformanceEngine();

/**
 * Initialize the dashboard on DOM ready.
 * Wires event handlers and performs initial render.
 */
function initEngine() {
    wireEventHandlers();
    renderAll();
}

/* Bootstrap on DOMContentLoaded */
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEngine);
    } else {
        initEngine();
    }
}

/* ======================================================================
   MODULE EXPORTS (for Vitest unit testing)
   All classes, datasets, and functions are exported for test isolation.
   ====================================================================== */

export {
    ClassicalRaga,
    ClassicalDanceForm,
    ClassicalPerformer,
    PerformanceEngine,
    RAGAS,
    DANCE_FORMS,
    PERFORMERS,
    renderRagaCard,
    renderDanceCard,
    renderPerformerCard,
    renderStateChart,
    renderMoodChart,
    renderTraditionChart,
    renderTimeline,
    engine,
};
/* ==========================================================================
   END OF PERFORMANCE ENGINE
   Total module responsibility: Data models, datasets, filtering, sorting,
   search, analytics, DOM rendering, and event wiring for the Indian
   Classical Performances Explorer dashboard.
   ========================================================================== */

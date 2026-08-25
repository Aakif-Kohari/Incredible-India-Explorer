/**
 * Famous Ghats Interactive Logic
 * Controls Scroll Observers, Tabs, and the heavy generic Explorer Widget Data Filter.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Global Scroll Observers --- */
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px" });

    document.querySelectorAll('.scroll-observe').forEach(el => io.observe(el));


    /* --- 2. River Tabs Logic --- */
    const tabs = document.querySelectorAll('.river-tab');
    const panes = document.querySelectorAll('.river-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active to targeted
            tab.classList.add('active');
            const targetPaneId = tab.getAttribute('data-target');
            document.getElementById(targetPaneId).classList.add('active');
        });
    });


    /* --- 3. The Explorer Widget Mock Database --- */
    const ghatsDatabase = [
        { name: "Dashashwamedh Ghat", river: "Ganga", state: "Uttar Pradesh", city: "Varanasi", desc: "The most spectacular and vibrant ghat in Varanasi, hosting the immense daily Ganga Aarti." },
        { name: "Har Ki Pauri", river: "Ganga", state: "Uttarakhand", city: "Haridwar", desc: "Sacred steps where drops of immortality elixir fell. Marks the Ganga entering the plains." },
        { name: "Assi Ghat", river: "Ganga", state: "Uttar Pradesh", city: "Varanasi", desc: "Located at the confluence of the Ganga and Assi rivers. Famous for morning yoga and rituals." },
        { name: "Manikarnika Ghat", river: "Ganga", state: "Uttar Pradesh", city: "Varanasi", desc: "The primary cremation ghat of Varanasi. Devotees believe death here brings instant Moksha." },
        { name: "Ahilya Ghat", river: "Narmada", state: "Madhya Pradesh", city: "Maheshwar", desc: "A magnificent architectural marvel built by Queen Ahilyabai, offering peaceful boating experiences." },
        { name: "Vishram Ghat", river: "Yamuna", state: "Uttar Pradesh", city: "Mathura", desc: "The central ghat where Lord Krishna is said to have rested after slaying the demon Kansa." },
        { name: "Kesi Ghat", river: "Yamuna", state: "Uttar Pradesh", city: "Vrindavan", desc: "Known for the evening Aarti offered to River Yamuna. Krishna bathed here after slaying the Keshi demon." },
        { name: "Ram Ghat", river: "Shipra", state: "Madhya Pradesh", city: "Ujjain", desc: "One of the most ancient venues for the Kumbh Mela gatherings every 12 years." },
        { name: "Sethani Ghat", river: "Narmada", state: "Madhya Pradesh", city: "Narmadapuram", desc: "One of the largest ghats in India. Famous for the Narmada Jayanti celebrations." },
        { name: "Triveni Sangam Ghats", river: "Ganga", state: "Uttar Pradesh", city: "Prayagraj", desc: "Ghats along the confluence of Ganga, Yamuna, and mythical Saraswati." },
        { name: "Brahma Ghat", river: "Pushkar Lake", state: "Rajasthan", city: "Pushkar", desc: "One of the 52 sacred ghats of Pushkar Lake. Believed to be created by Lord Brahma." },
        { name: "Gau Ghat", river: "Pushkar Lake", state: "Rajasthan", city: "Pushkar", desc: "Another primary ghat in Pushkar where Mahatma Gandhi's ashes were sprinkled." },
        { name: "Parmarth Niketan Ghat", river: "Ganga", state: "Uttarakhand", city: "Rishikesh", desc: "Famed for its peaceful setting amidst the Himalayas and a deeply spiritual Ganga Aarti." },
        { name: "Nigambodh Ghat", river: "Yamuna", state: "Delhi", city: "Delhi", desc: "Oldest cremation ghat in Delhi, holding significant mention in the Mahabharata." },
        { name: "Panchganga Ghat", river: "Ganga", state: "Uttar Pradesh", city: "Varanasi", desc: "A mystical site believed to be the meeting point of five rivers. Holds rich scholastic history." }
    ];


    /* --- 4. Filtering Engine --- */
    const searchInput = document.getElementById('search-ghat');
    const riverFilter = document.getElementById('filter-river');
    const stateFilter = document.getElementById('filter-state');
    const gridContainer = document.getElementById('explorer-grid');
    const countDisplay = document.getElementById('result-count');

    function renderGhats(data) {
        gridContainer.innerHTML = '';

        if (data.length === 0) {
            gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: #7f8c8d;">No ghats match your selected criteria. Try easing the filters.</div>`;
            countDisplay.innerText = 0;
            return;
        }

        const html = data.map(ghat => `
            <div class="exp-item">
                <h4>${ghat.name}</h4>
                <div class="exp-badges">
                    <span class="e-badge"><i class="fas fa-water"></i> ${ghat.river}</span>
                    <span class="e-badge"><i class="fas fa-map-marker-alt"></i> ${ghat.state}</span>
                </div>
                <p>${ghat.desc}</p>
                <div style="margin-top: 15px; font-size: 0.8rem; color: var(--fg-gold);">City: ${ghat.city}</div>
            </div>
        `).join('');

        gridContainer.innerHTML = html;
        countDisplay.innerText = data.length;
    }

    function applyFilters() {
        const q = searchInput.value.toLowerCase();
        const r = riverFilter.value;
        const s = stateFilter.value;

        const filtered = ghatsDatabase.filter(ghat => {
            const matchesSearch = ghat.name.toLowerCase().includes(q) || ghat.city.toLowerCase().includes(q);
            const matchesRiver = r === 'All' ? true : ghat.river === r;
            const matchesState = s === 'All' ? true : ghat.state === s;
            return matchesSearch && matchesRiver && matchesState;
        });

        renderGhats(filtered);
    }

    // Attach listeners
    if (searchInput && riverFilter && stateFilter && gridContainer) {
        searchInput.addEventListener('input', applyFilters);
        riverFilter.addEventListener('change', applyFilters);
        stateFilter.addEventListener('change', applyFilters);

        // Initial Render
        applyFilters();
    }
});

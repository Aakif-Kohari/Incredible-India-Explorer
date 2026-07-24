/**
 * State Evolution Timeline Explorer
 * Handles interactive timeline slider, filtering, and dynamic state rendering.
 */

(function () {
    'use strict';

    const HISTORICAL_MILESTONES = {
        1947: {
            title: "1947: Independence & Integration of Princely States",
            desc: "India gained independence, inheriting over 565 princely states integrated through the diplomatic efforts of Sardar Vallabhbhai Patel."
        },
        1950: {
            title: "1950: Republic of India & Part A/B/C/D States",
            desc: "The Constitution came into force classifying states into Part A (former provinces), Part B (former princely states), Part C (commissioner provinces), and Part D (Andaman & Nicobar)."
        },
        1956: {
            title: "1956: States Reorganisation Act",
            desc: "State boundaries were systematically redrawn along linguistic lines, creating 14 states and 6 union territories."
        },
        1960: {
            title: "1960: Bifurcation of Bombay State",
            desc: "Bombay State was divided into Maharashtra (Marathi-speaking) and Gujarat (Gujarati-speaking)."
        },
        1963: {
            title: "1963: Statehood for Nagaland",
            desc: "Nagaland was created as the 16th state of India out of the Naga Hills-Tuensang Area."
        },
        1966: {
            title: "1966: Punjab Reorganisation",
            desc: "Punjab was reorganized into Haryana (Hindi-speaking), Punjab (Punjabi-speaking), and the Union Territory of Chandigarh."
        },
        1971: {
            title: "1971: Statehood for Himachal Pradesh",
            desc: "Himachal Pradesh was elevated from a Union Territory to become the 18th State of India."
        },
        1972: {
            title: "1972: Northeast Reorganisation",
            desc: "Meghalaya, Manipur, and Tripura attained full statehood, transforming the political map of Northeast India."
        },
        1975: {
            title: "1975: Admission of Sikkim",
            desc: "Sikkim joined the Indian Union as the 22nd state following a referendum abolishing the monarchy."
        },
        1987: {
            title: "1987: Statehood for Goa, Mizoram & Arunachal Pradesh",
            desc: "Goa (separated from Daman & Diu), Mizoram, and Arunachal Pradesh achieved full statehood."
        },
        2000: {
            title: "2000: Formation of Chhattisgarh, Uttarakhand & Jharkhand",
            desc: "Three new states were created: Chhattisgarh (from MP), Uttarakhand (from UP), and Jharkhand (from Bihar)."
        },
        2014: {
            title: "2014: Formation of Telangana",
            desc: "Telangana was carved out of Andhra Pradesh as India's 29th state with Hyderabad as shared capital."
        },
        2019: {
            title: "2019: Jammu & Kashmir Reorganisation",
            desc: "Jammu & Kashmir was reorganized into two Union Territories: Jammu & Kashmir, and Ladakh."
        },
        2020: {
            title: "2020: Merger of Dadra & Nagar Haveli and Daman & Diu",
            desc: "The two Union Territories were merged into a single UT named Dadra and Nagar Haveli and Daman and Diu."
        },
        2024: {
            title: "2024: Present Political Map of India",
            desc: "India comprises 28 States and 8 Union Territories with modern digital governance and administrative infrastructure."
        }
    };

    const STATE_EVOLUTION_DATA = [
        {
            id: 'andhra-pradesh',
            name: 'Andhra Pradesh',
            region: 'South',
            establishedYear: 1953,
            formerNames: ['Andhra State', 'Madras Presidency (part)'],
            capitals: ['Kurnool (1953-1956)', 'Hyderabad (1956-2014)', 'Amaravati (Present)'],
            history: 'First state created on linguistic basis in 1953. Merged with Telangana region in 1956, and later bifurcated in 2014.',
            fact: 'Potti Sreeramulu fasted unto death demanding a separate Andhra state, leading to linguistic reorganisation across India.'
        },
        {
            id: 'maharashtra',
            name: 'Maharashtra',
            region: 'West',
            establishedYear: 1960,
            formerNames: ['Bombay State', 'Central Provinces & Berar (part)'],
            capitals: ['Mumbai (Capital)', 'Nagpur (Winter Capital)'],
            history: 'Created on May 1, 1960, following the Samyukta Maharashtra movement separating Marathi and Gujarati regions.',
            fact: 'May 1 is celebrated every year as Maharashtra Din (Maharashtra Day).'
        },
        {
            id: 'gujarat',
            name: 'Gujarat',
            region: 'West',
            establishedYear: 1960,
            formerNames: ['Bombay State', 'Saurashtra State', 'Kutch State'],
            capitals: ['Ahmedabad (1960-1970)', 'Gandhinagar (Present)'],
            history: 'Carved out of the bilingual Bombay State on May 1, 1960, incorporating Saurashtra and Kutch.',
            fact: 'Gujarat has the longest coastline among all Indian states (1,600 km).'
        },
        {
            id: 'karnataka',
            name: 'Karnataka',
            region: 'South',
            establishedYear: 1956,
            formerNames: ['Mysore State (renamed Karnataka in 1973)'],
            capitals: ['Bengaluru'],
            history: 'Formed in 1956 by unifying Kannada-speaking areas of Mysore, Bombay, Hyderabad, and Madras states. Renamed Karnataka in 1973.',
            fact: 'D. Devaraj Urs officially renamed Mysore State to Karnataka on November 1, 1973.'
        },
        {
            id: 'tamil-nadu',
            name: 'Tamil Nadu',
            region: 'South',
            establishedYear: 1956,
            formerNames: ['Madras State (renamed Tamil Nadu in 1969)'],
            capitals: ['Chennai (formerly Madras)'],
            history: 'Reorganised as Madras State in 1956 and officially renamed Tamil Nadu in 1969 under Chief Minister C.N. Annadurai.',
            fact: 'The name Tamil Nadu translates literally to "Tamil Country".'
        },
        {
            id: 'punjab',
            name: 'Punjab',
            region: 'North',
            establishedYear: 1947,
            formerNames: ['East Punjab', 'PEPSU (Patiala & East Punjab States Union)'],
            capitals: ['Shimla (1947-1953)', 'Chandigarh (Present)'],
            history: 'Partitioned in 1947. PEPSU merged in 1956. Reorganised again in 1966 creating Haryana and Himachal Pradesh areas.',
            fact: 'Chandigarh serves as the shared capital of both Punjab and Haryana.'
        },
        {
            id: 'haryana',
            name: 'Haryana',
            region: 'North',
            establishedYear: 1966,
            formerNames: ['Punjab (part)'],
            capitals: ['Chandigarh'],
            history: 'Carved out of Punjab on November 1, 1966, on the recommendation of the Shah Commission for Hindi-speaking areas.',
            fact: 'Haryana completely surrounds National Capital Territory of Delhi on three sides.'
        },
        {
            id: 'nagaland',
            name: 'Nagaland',
            region: 'Northeast',
            establishedYear: 1963,
            formerNames: ['Naga Hills-Tuensang Area'],
            capitals: ['Kohima'],
            history: 'Established as the 16th state of India on December 1, 1963.',
            fact: 'Nagaland is home to 16 major tribes, each celebrating distinct traditional festivals.'
        },
        {
            id: 'sikkim',
            name: 'Sikkim',
            region: 'Northeast',
            establishedYear: 1975,
            formerNames: ['Kingdom of Sikkim (Chogyal Monarchy)'],
            capitals: ['Gangtok'],
            history: 'Became an Associate State in 1974 and fully integrated as the 22nd State of India on May 16, 1975.',
            fact: 'Sikkim is India\'s first 100% organic state.'
        },
        {
            id: 'telangana',
            name: 'Telangana',
            region: 'South',
            establishedYear: 2014,
            formerNames: ['Hyderabad State', 'Andhra Pradesh (part)'],
            capitals: ['Hyderabad'],
            history: 'Carved out of Andhra Pradesh on June 2, 2014, as the 29th State of India following decades of statehood agitation.',
            fact: 'June 2 is celebrated as Telangana Formation Day.'
        },
        {
            id: 'jharkhand',
            name: 'Jharkhand',
            region: 'East',
            establishedYear: 2000,
            formerNames: ['Bihar (part)'],
            capitals: ['Ranchi'],
            history: 'Formed on November 15, 2000 (birth anniversary of tribal leader Birsa Munda) by carving out southern Bihar.',
            fact: 'Rich in mineral wealth, Jharkhand accounts for over 40% of India\'s mineral resources.'
        },
        {
            id: 'uttarakhand',
            name: 'Uttarakhand',
            region: 'North',
            establishedYear: 2000,
            formerNames: ['Uttaranchal (renamed Uttarakhand in 2007)'],
            capitals: ['Dehradun (Winter)', 'Gairsain (Summer)'],
            history: 'Carved out of northwestern Uttar Pradesh on November 9, 2000. Renamed Uttarakhand in 2007.',
            fact: 'Known as the "Land of the Gods" (Devbhumi) due to numerous Hindu pilgrimage sites.'
        },
        {
            id: 'chhattisgarh',
            name: 'Chhattisgarh',
            region: 'Central',
            establishedYear: 2000,
            formerNames: ['Madhya Pradesh (part)'],
            capitals: ['Raipur'],
            history: 'Formed on November 1, 2000, by partitioning 16 southeastern Chhattisgarhi-speaking districts of Madhya Pradesh.',
            fact: 'Named "Chhattisgarh" because the region historically contained 36 ancient forts (chhattis garh).'
        },
        {
            id: 'jammu-kashmir-ut',
            name: 'Jammu & Kashmir (UT)',
            region: 'North',
            establishedYear: 2019,
            formerNames: ['State of Jammu and Kashmir'],
            capitals: ['Srinagar (Summer)', 'Jammu (Winter)'],
            history: 'Reorganised into a Union Territory with a legislature under the J&K Reorganisation Act on October 31, 2019.',
            fact: 'October 31 (National Unity Day) was chosen for the reorganisation in honor of Sardar Patel.'
        }
    ];

    function init() {
        const slider = document.getElementById('year-slider');
        const yearDisplay = document.getElementById('current-year-display');
        const searchInput = document.getElementById('evo-search-input');
        const regionFilter = document.getElementById('evo-region-filter');
        const milestoneBox = document.getElementById('milestone-box');
        const grid = document.getElementById('evo-grid');

        if (!slider || !grid) return;

        function updateMilestone(year) {
            // Find closest milestone year <= selected year
            const years = Object.keys(HISTORICAL_MILESTONES).map(Number).sort((a, b) => b - a);
            const activeYear = years.find(y => y <= year) || 1947;
            const m = HISTORICAL_MILESTONES[activeYear];

            if (milestoneBox && m) {
                milestoneBox.innerHTML = `
                    <h2>${m.title}</h2>
                    <p>${m.desc}</p>
                `;
            }
        }

        function renderCards() {
            const currentYear = parseInt(slider.value, 10);
            const query = (searchInput?.value || '').trim().toLowerCase();
            const region = regionFilter?.value || 'all';

            const filtered = STATE_EVOLUTION_DATA.filter(item => {
                const matchesYear = item.establishedYear <= currentYear;
                const matchesRegion = region === 'all' || item.region === region;
                const matchesQuery = !query ||
                    item.name.toLowerCase().includes(query) ||
                    item.formerNames.some(fn => fn.toLowerCase().includes(query)) ||
                    item.capitals.some(c => c.toLowerCase().includes(query)) ||
                    item.history.toLowerCase().includes(query);

                return matchesYear && matchesRegion && matchesQuery;
            });

            if (filtered.length === 0) {
                grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--evo-text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom:10px;"></i>
                    <p>No states found matching year ${currentYear} and selected filters.</p>
                </div>`;
                return;
            }

            grid.innerHTML = filtered.map(item => `
                <div class="evo-card" data-id="${item.id}">
                    <div class="evo-card-header">
                        <h3>${item.name}</h3>
                        <span class="evo-tag">${item.region} • Est. ${item.establishedYear}</span>
                    </div>
                    <div class="evo-details">
                        <p><strong><i class="fa-solid fa-landmark"></i> Capital:</strong> ${item.capitals.join(' → ')}</p>
                        <p><strong><i class="fa-solid fa-clock-rotate-left"></i> Former Names/Units:</strong> ${item.formerNames.join(', ')}</p>
                        <p><strong><i class="fa-solid fa-book"></i> Evolution:</strong> ${item.history}</p>
                    </div>
                    <div class="evo-fact">
                        <i class="fa-solid fa-lightbulb" style="color:var(--evo-gold);"></i> ${item.fact}
                    </div>
                </div>
            `).join('');
        }

        slider.addEventListener('input', () => {
            const year = slider.value;
            if (yearDisplay) yearDisplay.textContent = year;
            updateMilestone(year);
            renderCards();
        });

        document.querySelectorAll('.slider-milestones span').forEach(span => {
            span.addEventListener('click', () => {
                const year = span.dataset.year;
                slider.value = year;
                if (yearDisplay) yearDisplay.textContent = year;
                updateMilestone(year);
                renderCards();
            });
        });

        searchInput?.addEventListener('input', renderCards);
        regionFilter?.addEventListener('change', renderCards);

        updateMilestone(parseInt(slider.value, 10));
        renderCards();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

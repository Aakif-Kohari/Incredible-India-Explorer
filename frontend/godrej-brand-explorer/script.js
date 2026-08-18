/* ==========================================================================
   Godrej Brand Evolution Explorer - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Data Store Definitions
    // ----------------------------------------------------------------------

    const timelineData = [
        {
            year: 1897,
            era: 'founding',
            title: 'Unpickable Lever Lock Invention',
            category: 'Industrial & Security',
            summary: 'Ardeshir Godrej patented India\'s first unpickable lever lock mechanism in a small Lalbaug shed in Bombay.',
            details: 'Frustrated by high burglary rates in Bombay and refusing to compromise on ethics in his legal career, Ardeshir Godrej turned to engineering. He designed double-acting lever locks that made picking impossible, laying the groundwork for Godrej\'s legacy of unshakeable trust.'
        },
        {
            year: 1902,
            era: 'founding',
            title: 'First Indian Fire-Proof Safes',
            category: 'Security & Safes',
            summary: 'Godrej created India\'s first indigenous fire-resistant safes, adopted by major banks and merchants across the subcontinent.',
            details: 'Tested rigorously against extreme heat and heavy physical impact, Godrej Safes quickly became essential equipment for Indian shopkeepers, jewelers, and financial institutions.'
        },
        {
            year: 1918,
            era: 'founding',
            title: 'World\'s First 100% Vegetable Soap (Vatni)',
            category: 'Consumer Products',
            summary: 'Ardeshir Godrej introduced Vatni soap, breaking global reliance on animal tallow in soap manufacturing.',
            details: 'Until 1918, all commercial soaps worldwide contained animal fat. Godrej perfected vegetable oil saponification. Short for "Vande Mataram", Vatni won endorsements from Rabindranath Tagore and Mahatma Gandhi as a triumph of Swadeshi purity.'
        },
        {
            year: 1944,
            era: 'founding',
            title: 'The Great Bombay Docks Explosion',
            category: 'Heritage & Trust',
            summary: 'During a massive explosion at Bombay Docks, valuables in Godrej Safes survived intact amidst total devastation.',
            details: 'A freighter laden with explosives exploded at Bombay harbor, setting the Fort area ablaze. When the rubble cleared, currency notes, gold bullion, and documents inside Godrej Fire-Proof Safes were found completely undamaged.'
        },
        {
            year: 1951,
            era: 'nation-building',
            title: '1.7 Million Ballot Boxes for First Indian Elections',
            category: 'Democratic Heritage',
            summary: 'Godrej manufactured 1.7 million tamper-proof steel ballot boxes for Independent India\'s first historic General Election.',
            details: 'In less than 4 months, Pirojsha Godrej\'s Vikhroli factory produced over 15,000 ballot boxes daily. Every single vote cast in India\'s maiden democratic election was safely sealed in a Godrej steel ballot box.'
        },
        {
            year: 1952,
            era: 'nation-building',
            title: 'First Indigenous Refrigerator & Cinthol Soap',
            category: 'Consumer Durables & Personal Care',
            summary: 'Godrej launched India\'s first homegrown refrigerator and introduced Cinthol deodorizing soap.',
            details: '1952 marked Godrej\'s entry into modern domestic appliances with a 9-cubic-foot electric refrigerator, alongside Cinthol—India\'s iconic active freshness soap featuring G-11 hexachlorophene.'
        },
        {
            year: 1955,
            era: 'nation-building',
            title: 'India\'s First Indigenous Typewriter (Godrej M-9)',
            category: 'Office Automation',
            summary: 'Prime Minister Jawaharlal Nehru inaugurated Godrej\'s first typewriter factory, establishing Indian office self-reliance.',
            details: 'The Godrej M-9 typewriter freed Indian government offices and businesses from importing Western typewriters, symbolising post-independence industrial sovereignty.'
        },
        {
            year: 1958,
            era: 'nation-building',
            title: 'The Legendary Godrej Storwel Steel Almirah',
            category: 'Household Icon',
            summary: 'Launch of the Storwel steel wardrobe, which became the quintessential Indian wedding gift and household storage staple.',
            details: 'With its distinct olive green paint, three-way locking mechanism, and unyielding steel construction, the Storwel became a rite of passage for every newly wed Indian couple for decades.'
        },
        {
            year: 1974,
            era: 'consumer-boom',
            title: 'Hair Colour Innovation (Godrej Liquid Dye)',
            category: 'Personal Care',
            summary: 'Godrej democratized hair care across India with affordable liquid and powder hair dye solutions.',
            details: 'Prior to Godrej, hair color products were expensive imports. Godrej Expert democratized hair care with safe, easy-to-use liquid and powder formulations.'
        },
        {
            year: 1985,
            era: 'consumer-boom',
            title: 'Goodknight & HIT Mosquito Protection',
            category: 'Home Care',
            summary: 'Godrej introduced Goodknight electric mat mosquito repellents and HIT pest control sprays across Indian households.',
            details: 'Goodknight transformed mosquito defense in tropical India from smoky coils to silent electric vaporizers, protecting millions of families from malaria and dengue.'
        },
        {
            year: 1994,
            era: 'consumer-boom',
            title: 'Aerospace Division & ISRO Rocket Engines',
            category: 'Aerospace & Defense',
            summary: 'Godrej Aerospace began manufacturing liquid propulsion Vikas engines for ISRO\'s satellite launch vehicles.',
            details: 'Godrej Precision Engineering became ISRO\'s trusted partner, constructing thrusters, Vikas liquid engines, and payload components for PSLV, GSLV, Chandrayaan, and Mangalyaan missions.'
        },
        {
            year: 2008,
            era: 'future',
            title: 'Masterbrand Transformation & Tri-Color Logo',
            category: 'Brand Identity',
            summary: 'Godrej unveiled its modern vibrant logo featuring Ruby Red, Sapphire Blue, and Emerald Green gradient paths.',
            details: 'Partnering with Landor Associates, Godrej refreshed its 111-year identity while preserving Ardeshir\'s authentic signature geometry, expressing consumer care, engineering precision, and sustainability.'
        },
        {
            year: 2020,
            era: 'future',
            title: 'Eco-Friendly R290 Refrigerants & Green Buildings',
            category: 'Sustainability',
            summary: 'Godrej pioneered 100% CFC/HCFC-free appliances and eco-friendly R290 green refrigerants with zero ozone depletion.',
            details: 'Leading environmental stewardship, Godrej Appliances became the world\'s first manufacturer to mass-produce air conditioners using natural R290 refrigerant with ultra-low global warming potential.'
        }
    ];

    const productsData = [
        {
            name: 'Godrej Nav-Tal Padlock',
            sector: 'industrial',
            sectorTag: 'Security & Hardware',
            year: '1897',
            icon: '🔒',
            summary: 'The original brass lever lock that secured millions of Indian homes, gates, and bank vaults.',
            spec: 'Brass levers • Anti-pick dual cylinder • Weatherproof casing'
        },
        {
            name: 'Cinthol Fresh Soap',
            sector: 'consumer',
            sectorTag: 'Personal Care',
            year: '1952',
            icon: '🧼',
            summary: 'Iconic bath soap formulated for active confidence, deodorizing protection, and refreshing skin feel.',
            spec: 'Deodorant protection • Active freshness • 100% Veg formula'
        },
        {
            name: 'Godrej Storwel Almirah',
            sector: 'durables',
            sectorTag: 'Furniture & Storage',
            year: '1958',
            icon: '🚪',
            summary: 'Heavy-gauge steel wardrobe featuring multi-lever unpickable locking and internal secret lockers.',
            spec: 'CRCA Steel • Anti-rust phosphate treatment • Secret locker'
        },
        {
            name: 'Goodknight Liquid Vaporizer',
            sector: 'consumer',
            sectorTag: 'Home Hygiene',
            year: '1985',
            icon: '🔌',
            summary: 'India\'s leading electric mosquito repellent system offering dual-mode protection against mosquitoes.',
            spec: 'Dual mode switch • Transfluthrin active formula • Child safe'
        },
        {
            name: 'ISRO Vikas Rocket Engine',
            sector: 'industrial',
            sectorTag: 'Aerospace & Defense',
            year: '1994',
            icon: '🚀',
            summary: 'Liquid propulsion engines manufactured by Godrej Aerospace powering ISRO\'s PSLV & GSLV rockets.',
            spec: 'High-thrust liquid engine • Precision alloy fabrication • Lunar & Mars spaceflight'
        },
        {
            name: 'Godrej Eon Frost-Free Refrigerator',
            sector: 'durables',
            sectorTag: 'Appliances',
            year: '1952 / Modern',
            icon: '🧊',
            summary: 'Energy-efficient refrigerator with Nano Shield disinfection and eco-friendly R290 green cooling.',
            spec: 'R290 Eco-refrigerant • Inverter compressor • 99.9% Food safety'
        },
        {
            name: 'Godrej Expert Rich Crème Hair Colour',
            sector: 'consumer',
            sectorTag: 'Personal Care',
            year: '1974 / Modern',
            icon: '💇‍♀️',
            summary: 'Ammonia-free cream hair color enriched with aloe vera and milk protein for vibrant gray coverage.',
            spec: 'No Ammonia • Aloe vera extract • Pre-measured sachet'
        },
        {
            name: 'Godrej Ezee Liquid Detergent',
            sector: 'consumer',
            sectorTag: 'Home Care',
            year: '1983',
            icon: '🧴',
            summary: 'pH-neutral delicate fabric detergent designed to keep woolen sweaters and silks soft and bright.',
            spec: 'pH Neutral formula • Micro-conditioners • Woolmark certified'
        },
        {
            name: 'Godrej Forklift & Automated Storage (AVRS)',
            sector: 'industrial',
            sectorTag: 'Material Handling',
            year: '1963 / Modern',
            icon: '🚜',
            summary: 'Electric forklift trucks and automated warehouse storage robotics for modern Indian supply chains.',
            spec: 'Li-ion battery power • 10-ton load capacity • Warehouse automation'
        }
    ];

    const adsData = [
        {
            title: 'Vatni Swadeshi Soap Campaign',
            category: 'vatni',
            decade: '1920s',
            icon: '🧼',
            slogan: '"I know of no honest reason why Godrej\'s soaps should not replace foreign soaps."',
            details: 'Endorsed by Rabindranath Tagore, Vatni promoted 100% vegetable oil purity during the height of the Swadeshi boycott of British goods.'
        },
        {
            title: 'Cinthol - Vinod Khanna "Alive and Awesome"',
            category: 'cinthol',
            decade: '1970s',
            icon: '🐎',
            slogan: '"Alive and Awesome with Cinthol!"',
            details: 'Featuring Bollywood superstar Vinod Khanna galloping on a horse across rugged shores, this ad redefined Indian masculinity and outdoor vitality.'
        },
        {
            title: 'Godrej Storwel - The Wedding Legacy',
            category: 'storwel',
            decade: '1980s',
            icon: '💒',
            slogan: '"Tough as Steel, Safe as Gold."',
            details: 'Highlighted how a Godrej Storwel almirah was passed down across three generations of brides as an unshakeable fortress of family love and security.'
        },
        {
            title: 'Goodknight - "Firr... Dhuan / Chain Se So Jao"',
            category: 'goodknight',
            decade: '1990s',
            icon: '🌙',
            slogan: '"Machhar Bhagao, Chain Se So Jao."',
            details: 'Replaced smoky mosquito coils with silent, smoke-free electric mat protection, giving Indian children peaceful, mosquito-free nights.'
        },
        {
            title: 'Ezee Liquid Detergent - Woolen Care',
            category: 'ezee',
            decade: '1990s',
            icon: '🧥',
            slogan: '"Woolens Ko Rakhe Naya Jaisa."',
            details: 'Showcased winter fashion care in North India, protecting precious hand-knitted cardigans and Pashmina shawls from harsh chemical detergents.'
        }
    ];

    const hotspotDetails = {
        almirah: {
            title: 'The Olive Green Storwel Almirah',
            era: '1958–Present',
            text: 'Found in millions of Indian bedrooms! Equipped with a distinct 3-way lever key that made a satisfying "clack" sound, the Storwel housed ancestral jewelry, heavy silk sarees, degree certificates, and secret internal key-locked lockers.',
            trivia: '💡 Nostalgic Fact: In traditional Indian weddings from the 1960s to 1990s, giving a Godrej Storwel to newly weds was considered the ultimate gift of lifelong stability!'
        },
        safe: {
            title: 'Godrej Fire-Resistant Safe & Locker',
            era: '1902–Present',
            text: 'Used by shopkeepers, bankers, and patriarchs across India. Manufactured with double steel walls packed with fire-resistant compound, Godrej Safes survived historical disasters including the 1944 Bombay Docks inferno.',
            trivia: '💡 Trust Record: During the 1944 Bombay Docks explosion, currency inside Godrej Safes remained unscathed while surrounding buildings were reduced to ash!'
        },
        fridge: {
            title: '1952 Godrej Refrigerator',
            era: '1952–Present',
            text: 'India\'s first indigenous refrigerator! In the 1980s and 90s, Godrej refrigerators with colorful floral door patterns were the heart of Indian kitchens—making homemade ice pops, storing milk, and chilling Rasna syrup.',
            trivia: '💡 Green Pioneer: Today, Godrej is a global leader in using 100% CFC-free R290 green refrigerants with zero ozone layer impact.'
        },
        goodknight: {
            title: 'Goodknight Mosquito Vaporizer',
            era: '1985–Present',
            text: 'Plugged into bedside wall sockets across India every single night! Goodknight replaced smelly coils with electric heat-activated mats and liquid vaporizers, ending the nightly fight against mosquitoes.',
            trivia: '💡 Household Savior: Goodknight protected generations of Indian school children from malaria and dengue during monsoon season.'
        },
        cinthol: {
            title: 'Cinthol Deodorant Soap',
            era: '1952–Present',
            text: 'The iconic red, green, and lime soap bar known for its signature invigorating fragrance. Associated with outdoor sports, army endurance, and freshness in hot Indian summers.',
            trivia: '💡 Celebrity Heritage: Advertised by Bollywood legend Vinod Khanna and cricketer Kapil Dev as the symbol of confidence and outdoor fitness.'
        }
    };

    const quizQuestions = [
        {
            question: 'What was the world\'s first soap made entirely from 100% vegetable oils, launched by Godrej in 1918?',
            options: ['Cinthol', 'Vatni (Vande Mataram)', 'Godrej No. 1', 'FairGlow'],
            answer: 1,
            explanation: 'Vatni (short for Vande Mataram) was invented by Ardeshir Godrej in 1918 as the world\'s first soap manufactured without animal tallow, endorsed by Rabindranath Tagore.'
        },
        {
            question: 'How many steel ballot boxes did Godrej manufacture for Independent India\'s first General Elections in 1951-52?',
            options: ['50,000', '500,000', '1.7 Million', '5 Million'],
            answer: 2,
            explanation: 'Godrej produced 1.7 million tamper-proof steel ballot boxes in less than 4 months, ensuring every vote in independent India\'s first democratic election was safely sealed.'
        },
        {
            question: 'In 1897, what was Ardeshir Godrej\'s very first patented invention in Lalbaug, Bombay?',
            options: ['Typewriter', 'Unpickable Lever Lock', 'Steel Almirah', 'Fire Safe'],
            answer: 1,
            explanation: 'Ardeshir Godrej started in a small shed in Lalbaug by patenting India\'s first unpickable lever lock to combat rising burglary rates.'
        },
        {
            question: 'Which ISRO liquid rocket engine is manufactured by Godrej Aerospace for PSLV & GSLV missions?',
            options: ['Vikas Engine', 'Cryo Sat', 'Agni Rocket', 'Aryabhata Thruster'],
            answer: 0,
            explanation: 'Godrej Aerospace manufactures the Vikas liquid propulsion engine, powering ISRO\'s PSLV, GSLV, Chandrayaan, and Mangalyaan space missions.'
        },
        {
            question: 'What do the three colors in Godrej\'s 2008 refreshed masterbrand logo represent?',
            options: ['Gold, Silver, Bronze', 'Ruby Red, Sapphire Blue, Emerald Green', 'Orange, White, Green', 'Yellow, Magenta, Cyan'],
            answer: 1,
            explanation: 'The logo features Ruby Red (Consumer care), Sapphire Blue (Engineering & Security), and Emerald Green (Sustainability & Green growth).'
        }
    ];

    // ----------------------------------------------------------------------
    // 2. Render Functions
    // ----------------------------------------------------------------------

    // Render Timeline Items
    const renderTimeline = (filterEra = 'all') => {
        const timelineTree = document.getElementById('timeline-tree');
        if (!timelineTree) return;

        timelineTree.innerHTML = '';
        const filtered = filterEra === 'all' ? timelineData : timelineData.filter(item => item.era === filterEra);

        filtered.forEach((item, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const itemEl = document.createElement('div');
            itemEl.className = `timeline-item ${side} animate-on-scroll`;
            itemEl.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content-card" data-index="${timelineData.indexOf(item)}">
                    <span class="timeline-year">${item.year}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <span class="timeline-tag">${item.category}</span>
                </div>
            `;
            timelineTree.appendChild(itemEl);
        });

        // Attach click handler for modal
        document.querySelectorAll('.timeline-content-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = card.getAttribute('data-index');
                const data = timelineData[index];
                openModal(`
                    <span class="era-badge">${data.year} • ${data.category}</span>
                    <h2 style="font-size: 1.8rem; margin: 0.75rem 0; color: var(--godrej-blue);">${data.title}</h2>
                    <p style="font-size: 1.05rem; line-height: 1.7; color: var(--godrej-text-muted); margin-bottom: 1.5rem;">${data.details}</p>
                    <div style="background: rgba(0,85,165,0.08); padding: 1rem; border-radius: 12px; font-weight: 600; color: var(--godrej-text-main);">
                        🏛️ Historical Impact: Milestone in India's industrial & consumer independence.
                    </div>
                `);
            });
        });
    };

    // Render Products Grid
    const renderProducts = (filterSector = 'all') => {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        productsGrid.innerHTML = '';
        const filtered = filterSector === 'all' ? productsData : productsData.filter(item => item.sector === filterSector);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card animate-on-scroll';
            card.innerHTML = `
                <div class="product-img-header">
                    <span class="product-sector-tag tag-${item.sector}">${item.sectorTag}</span>
                    <span class="product-icon">${item.icon}</span>
                    <span class="product-launch-badge">Est. ${item.year}</span>
                </div>
                <div class="product-body">
                    <h3>${item.name}</h3>
                    <p>${item.summary}</p>
                    <div class="product-footer-spec">⚡ ${item.spec}</div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    };

    // Render Advertising Gallery
    const renderAds = (filterCat = 'all') => {
        const adGrid = document.getElementById('ad-gallery-grid');
        if (!adGrid) return;

        adGrid.innerHTML = '';
        const filtered = filterCat === 'all' ? adsData : adsData.filter(item => item.category === filterCat);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'ad-card animate-on-scroll';
            card.innerHTML = `
                <div class="ad-img-box">
                    <span class="ad-decade-tag">${item.decade}</span>
                    <span class="ad-icon">${item.icon}</span>
                    <div class="ad-slogan-snippet">${item.slogan}</div>
                </div>
                <div class="ad-card-body">
                    <h3>${item.title}</h3>
                    <p>${item.details}</p>
                    <button class="ad-audio-sim-btn" data-slogan="${item.slogan}">🔊 Hear Slogan Story</button>
                </div>
            `;
            adGrid.appendChild(card);
        });

        document.querySelectorAll('.ad-audio-sim-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const slogan = btn.getAttribute('data-slogan');
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(slogan);
                    utterance.rate = 0.95;
                    utterance.pitch = 1.0;
                    window.speechSynthesis.speak(utterance);
                } else {
                    alert(`Slogan: ${slogan}`);
                }
            });
        });
    };

    // Render Logo Evolution Section
    const logoData = {
        '1897': {
            graphicHTML: '<div class="logo-graphic-1897">GODREJ</div>',
            title: '1897: Ardeshir\'s Monogram Signature',
            desc: 'The original hand-drawn cursive monochrome mark stamped into brass locks and fire safes in Lalbaug. It signified unpickable security and Swadeshi pride.'
        },
        '1950': {
            graphicHTML: '<div class="logo-graphic-1950">Godrej</div>',
            title: '1950s–2007: Iconic Cursive Script Logo',
            desc: 'The famed red slant script seen on Storwel almirahs, refrigerators, typewriters, and ballot boxes in virtually every Indian home for over half a century.'
        },
        '2008': {
            graphicHTML: '<div class="logo-graphic-2008"><span class="logo-text-modern">Godrej</span></div>',
            title: '2008–Present: Modern Vibrant Masterbrand',
            desc: 'Designed by Landor Associates, preserving Ardeshir\'s classic signature contours while adding Ruby Red, Sapphire Blue, and Emerald Green gradients representing diversity, precision, and sustainability.'
        }
    };

    const renderLogoEra = (eraKey = '1897') => {
        const logoDisplayCard = document.getElementById('logo-display-card');
        if (!logoDisplayCard) return;

        const info = logoData[eraKey];
        logoDisplayCard.innerHTML = `
            <div class="logo-visual-box">
                ${info.graphicHTML}
            </div>
            <div class="logo-details-text">
                <h3>${info.title}</h3>
                <p>${info.desc}</p>
            </div>
        `;
    };

    // ----------------------------------------------------------------------
    // 3. Interactive Handlers & Controls
    // ----------------------------------------------------------------------

    // Timeline Era Filter Handler
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTimeline(btn.getAttribute('data-era'));
        });
    });

    // Sector Tab Handler
    document.querySelectorAll('.sector-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.sector-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(tab.getAttribute('data-sector'));
        });
    });

    // Ad Filter Handler
    document.querySelectorAll('.ad-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.ad-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderAds(btn.getAttribute('data-adcat'));
        });
    });

    // Logo Era Buttons Handler
    document.querySelectorAll('.logo-era-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.logo-era-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLogoEra(btn.getAttribute('data-logo'));
        });
    });

    // Room Hotspot Interaction Handler
    document.querySelectorAll('.room-hotspot').forEach(spotBtn => {
        spotBtn.addEventListener('click', () => {
            const spotKey = spotBtn.getAttribute('data-spot');
            const info = hotspotDetails[spotKey];
            const detailPanel = document.getElementById('hotspot-detail-panel');
            if (info && detailPanel) {
                detailPanel.innerHTML = `
                    <div class="hotspot-content animate-on-scroll">
                        <span class="era-badge">${info.era}</span>
                        <h3>${info.title}</h3>
                        <p>${info.text}</p>
                        <div class="hotspot-trivia-box">
                            ${info.trivia}
                        </div>
                    </div>
                `;
            }
        });
    });

    // Nostalgia Checklist Handler
    const updateNostalgiaScore = () => {
        const checkedCount = document.querySelectorAll('.nostalgia-check:checked').length;
        const total = document.querySelectorAll('.nostalgia-check').length;
        const percentage = Math.round((checkedCount / total) * 100);

        const scorePercentage = document.getElementById('score-percentage');
        const scoreVerdict = document.getElementById('score-verdict');

        if (scorePercentage && scoreVerdict) {
            scorePercentage.textContent = `${percentage}%`;
            if (percentage === 0) {
                scoreVerdict.textContent = 'Select items above to measure your Godrej Household Nostalgia Index!';
            } else if (percentage <= 33) {
                scoreVerdict.textContent = '🌱 Casual Observer: Godrej has entered your home in subtle ways!';
            } else if (percentage <= 80) {
                scoreVerdict.textContent = '🏡 Classic Indian Household: Godrej is an indispensable part of your daily family memory!';
            } else {
                scoreVerdict.textContent = '🏆 True Swadeshi Legend: Your home is a living museum of Godrej trust & craftsmanship!';
            }
        }
    };

    document.querySelectorAll('.nostalgia-check').forEach(check => {
        check.addEventListener('change', updateNostalgiaScore);
    });

    // Global Search Functionality
    const searchInput = document.getElementById('global-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchSummary = document.getElementById('search-results-summary');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length > 0) {
                clearSearchBtn.style.display = 'block';

                // Filter products
                const matchingProducts = productsData.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    p.summary.toLowerCase().includes(query) ||
                    p.spec.toLowerCase().includes(query)
                );

                // Filter timeline
                const matchingTimeline = timelineData.filter(t =>
                    t.title.toLowerCase().includes(query) ||
                    t.summary.toLowerCase().includes(query) ||
                    t.details.toLowerCase().includes(query)
                );

                searchSummary.textContent = `Found ${matchingTimeline.length} milestones and ${matchingProducts.length} product matches for "${query}"`;

                // Update products grid
                const productsGrid = document.getElementById('products-grid');
                if (productsGrid) {
                    productsGrid.innerHTML = '';
                    matchingProducts.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'product-card';
                        card.innerHTML = `
                            <div class="product-img-header">
                                <span class="product-sector-tag tag-${item.sector}">${item.sectorTag}</span>
                                <span class="product-icon">${item.icon}</span>
                                <span class="product-launch-badge">Est. ${item.year}</span>
                            </div>
                            <div class="product-body">
                                <h3>${item.name}</h3>
                                <p>${item.summary}</p>
                                <div class="product-footer-spec">⚡ ${item.spec}</div>
                            </div>
                        `;
                        productsGrid.appendChild(card);
                    });
                }
            } else {
                clearSearchBtn.style.display = 'none';
                searchSummary.textContent = '';
                renderProducts();
            }
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            searchSummary.textContent = '';
            renderProducts();
        });
    }

    // ----------------------------------------------------------------------
    // 4. Interactive Quiz Engine
    // ----------------------------------------------------------------------

    let currentQuestionIndex = 0;
    let quizScore = 0;
    let quizAnswered = false;

    const renderQuestion = () => {
        const stepEl = document.getElementById('quiz-step');
        const scoreLiveEl = document.getElementById('quiz-score-live');
        const progressFill = document.getElementById('quiz-progress-fill');
        const questionBox = document.getElementById('quiz-question-box');
        const optionsList = document.getElementById('quiz-options-list');
        const feedbackBox = document.getElementById('quiz-feedback-box');
        const nextBtn = document.getElementById('quiz-next-btn');
        const restartBtn = document.getElementById('quiz-restart-btn');

        if (!questionBox || !optionsList) return;

        quizAnswered = false;
        feedbackBox.style.display = 'none';
        nextBtn.style.display = 'none';
        restartBtn.style.display = 'none';

        const q = quizQuestions[currentQuestionIndex];
        stepEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
        scoreLiveEl.textContent = `Score: ${quizScore}`;
        progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

        questionBox.innerHTML = `<h3>${q.question}</h3>`;
        optionsList.innerHTML = '';

        q.options.forEach((optText, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = `${String.fromCharCode(65 + optIdx)}. ${optText}`;
            btn.addEventListener('click', () => selectAnswer(optIdx));
            optionsList.appendChild(btn);
        });
    };

    const selectAnswer = (selectedIndex) => {
        if (quizAnswered) return;
        quizAnswered = true;

        const q = quizQuestions[currentQuestionIndex];
        const optionBtns = document.querySelectorAll('.quiz-option-btn');
        const feedbackBox = document.getElementById('quiz-feedback-box');
        const nextBtn = document.getElementById('quiz-next-btn');

        optionBtns.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.answer) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex) {
                btn.classList.add('wrong');
            }
        });

        if (selectedIndex === q.answer) {
            quizScore += 20;
            feedbackBox.className = 'quiz-feedback-box success';
            feedbackBox.innerHTML = `✅ Correct! ${q.explanation}`;
        } else {
            feedbackBox.className = 'quiz-feedback-box error';
            feedbackBox.innerHTML = `❌ Incorrect. ${q.explanation}`;
        }

        feedbackBox.style.display = 'block';

        if (currentQuestionIndex < quizQuestions.length - 1) {
            nextBtn.style.display = 'inline-flex';
        } else {
            showQuizFinalResult();
        }
        document.getElementById('quiz-score-live').textContent = `Score: ${quizScore}`;
    };

    const showQuizFinalResult = () => {
        const questionBox = document.getElementById('quiz-question-box');
        const optionsList = document.getElementById('quiz-options-list');
        const restartBtn = document.getElementById('quiz-restart-btn');
        const nextBtn = document.getElementById('quiz-next-btn');

        nextBtn.style.display = 'none';
        questionBox.innerHTML = `
            <div style="text-align: center; padding: 2rem 0;">
                <h3 style="font-size: 2rem; color: var(--godrej-blue);">🎉 Quiz Completed!</h3>
                <div style="font-size: 3.5rem; font-weight: 800; color: var(--godrej-red); margin: 1rem 0;">${quizScore} / 100</div>
                <p style="font-size: 1.1rem; color: var(--godrej-text-muted);">
                    ${quizScore >= 80 ? '🌟 Godrej Historian Expert! You know India\'s industrial story inside out.' : '👍 Great effort! Rediscover Godrej\'s legacy above to score 100% next time.'}
                </p>
            </div>
        `;
        optionsList.innerHTML = '';
        restartBtn.style.display = 'inline-flex';
    };

    document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        }
    });

    document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
        currentQuestionIndex = 0;
        quizScore = 0;
        renderQuestion();
    });

    // ----------------------------------------------------------------------
    // 5. Modal Lightbox System
    // ----------------------------------------------------------------------

    const modalOverlay = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const openModal = (htmlContent) => {
        if (!modalOverlay || !modalBody) return;
        modalBody.innerHTML = htmlContent;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
    };

    modalCloseBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // ----------------------------------------------------------------------
    // 6. Theme Toggle & Bookmark System
    // ----------------------------------------------------------------------

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('godrej-theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('godrej-theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('godrej-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });

    const bookmarkBtn = document.getElementById('bookmark-btn');
    bookmarkBtn?.addEventListener('click', () => {
        const bookmarked = localStorage.getItem('godrej-bookmarked');
        if (bookmarked) {
            localStorage.removeItem('godrej-bookmarked');
            bookmarkBtn.textContent = '🔖 Bookmark Story';
            alert('Bookmark removed from your saved journeys.');
        } else {
            localStorage.setItem('godrej-bookmarked', 'true');
            bookmarkBtn.textContent = '✅ Bookmarked!';
            alert('Journey bookmarked! You can return to Godrej Evolution anytime.');
        }
    });

    // ----------------------------------------------------------------------
    // 7. Initial Page Execution
    // ----------------------------------------------------------------------

    renderTimeline();
    renderProducts();
    renderAds();
    renderLogoEra('1897');
    renderQuestion();
});

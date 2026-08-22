/* ==========================================================================
   Interactive Festival Explorer - JavaScript Data & Interaction Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Master Festival Dataset
    // ----------------------------------------------------------------------

    const festivalData = [
        {
            id: 'diwali',
            name: 'Diwali (Deepavali)',
            category: 'light-color',
            categoryTag: '🪔 Light & Devotion',
            region: 'all',
            regionTag: 'All India',
            state: 'Maharashtra',
            month: 'oct',
            monthName: 'October / November (Kartik)',
            ritu: 'sharad',
            rituName: 'Sharad / Hemant',
            featured: true,
            icon: '🪔',
            shortDesc: 'The Festival of Lights celebrating the victory of light over darkness and good over evil.',
            delicacy: 'Kaju Katli, Besan Ladoo, Karanji & Diwali Faral',
            details: 'Diwali is celebrated across India with thousands of terracotta diyas, vibrant rangoli patterns, firework displays, and family reunions. In Hinduism, it marks Lord Rama\'s return to Ayodhya after 14 years of exile. In Jainism, it marks Lord Mahavira\'s Nirvana.',
            rituals: 'Dhanteras gold buying, Lakshmi Puja at dusk, lighting earthen lamps, sharing sweets & dry fruits.'
        },
        {
            id: 'durga-puja',
            name: 'Durga Puja (Sharadotsav)',
            category: 'light-color',
            categoryTag: '🪔 Light & Devotion',
            region: 'east',
            regionTag: 'East India',
            state: 'West Bengal',
            month: 'sep',
            monthName: 'September / October (Ashwin)',
            ritu: 'sharad',
            rituName: 'Sharad (Autumn)',
            featured: true,
            icon: '🌺',
            shortDesc: 'UNESCO Intangible Cultural Heritage celebrating Goddess Durga\'s victory over Mahishasura.',
            delicacy: 'Bhog Khichuri, Rosogolla, Mishti Doi & Sandesh',
            details: 'West Bengal and Kolkata transform into an open-air art gallery with thousands of intricately themed pandals. Highlights include the beat of Dhak drums, Dhunuchi Naach (fire incense dance), and Sindoor Khela on Vijayadashami.',
            rituals: 'Bodhon, Mahashtami Anjali, Dhunuchi Naach, Sandhi Puja, Idol Immersion (Bisarjan).'
        },
        {
            id: 'onam',
            name: 'Onam Harvest Festival',
            category: 'harvest',
            categoryTag: '🌾 Harvest & Agricultural',
            region: 'south',
            regionTag: 'South India',
            state: 'Kerala',
            month: 'aug',
            monthName: 'August / September (Chingam)',
            ritu: 'varsha',
            rituName: 'Varsha / Sharad',
            featured: true,
            icon: '🚣‍♂️',
            shortDesc: 'Kerala\'s state harvest festival welcoming mythical King Mahabali with boat races and floral carpets.',
            delicacy: 'Onam Sadya (26-item traditional feast on banana leaf) & Palada Payasam',
            details: 'Spanning 10 days, Onam showcases Kerala\'s rich heritage. Highlights include Pookkalam (intricate flower carpets), Vallam Kali (snake boat races on Pamba river), Pulikali (tiger dance), and Kathakali performances.',
            rituals: 'Pookkalam laying, Vallam Kali races, Pulikali folk dance, Onam Sadya grand feast.'
        },
        {
            id: 'pongal',
            name: 'Pongal / Makar Sankranti',
            category: 'harvest',
            categoryTag: '🌾 Harvest & Agricultural',
            region: 'south',
            regionTag: 'South & Pan-India',
            state: 'Tamil Nadu',
            month: 'jan',
            monthName: 'January (Thai / Pausha)',
            ritu: 'shishir',
            rituName: 'Shishir (Winter)',
            featured: true,
            icon: '🌾',
            shortDesc: 'Solar harvest celebration honoring Sun God Surya and cattle for bountiful rice crops.',
            delicacy: 'Sweet & Ven Pongal cooked in earthenware pots with fresh sugarcane',
            details: 'As the sun transitions into Capricorn (Makara), Tamil Nadu celebrates 4 days of Pongal (Bhogi, Surya Pongal, Mattu Pongal, Kaanum Pongal). Earthen pots boil over with milk and new rice, accompanied by cries of "Pongalo Pongal!".',
            rituals: 'Boiling sweet Pongal in outdoor clay pots, decorating cattle (Mattu Pongal), kite flying.'
        },
        {
            id: 'ganesh-chaturthi',
            name: 'Ganesh Chaturthi (Ganeshotsav)',
            category: 'light-color',
            categoryTag: '🪔 Devotion & Art',
            region: 'west',
            regionTag: 'West India',
            state: 'Maharashtra',
            month: 'aug',
            monthName: 'August / September (Bhadrapada)',
            ritu: 'varsha',
            rituName: 'Varsha (Monsoon)',
            featured: true,
            icon: '🐘',
            shortDesc: 'Grand 10-day festival honoring Lord Ganesha with public pandals, dhol-tasha, and eco-idols.',
            delicacy: 'Ukadiche Modak (steamed rice dumpling with jaggery & coconut) & Puran Poli',
            details: 'Pioneered as a public community festival by Lokmanya Tilak during the Indian freedom movement. Millions throng to Lalbaugcha Raja and local mandals amidst thundering Dhol-Tasha music before Anant Chaturdashi immersion.',
            rituals: 'Prana Pratishtha, offering 21 Modaks & Durva grass, Dhol-Tasha processions, Visarjan.'
        },
        {
            id: 'bihu',
            name: 'Bhogali & Rongali Bihu',
            category: 'harvest',
            categoryTag: '🌾 Harvest & New Year',
            region: 'northeast',
            regionTag: 'North-East India',
            state: 'Assam',
            month: 'apr',
            monthName: 'January & April (Bohag / Magh)',
            ritu: 'vasant',
            rituName: 'Vasant (Spring) & Shishir',
            featured: true,
            icon: '🦏',
            shortDesc: 'Assam\'s premier festival celebrating seasonal agriculture, Bihu dance, and communal feasts.',
            delicacy: 'Pitha (rice cakes), Laroo (sesame/coconut sweet balls) & Jolpan',
            details: 'Rongali Bihu marks the Assamese New Year in spring with energetic Bihu dances performed in traditional Muga silk attire with Pepa (buffalo horn pipes). Bhogali Bihu in January is a feast of bonfire Meji structures.',
            rituals: 'Lighting Meji bonfires, Bihu dance with Pepa flutes, offering Pitha and Laroo sweets.'
        },
        {
            id: 'holi',
            name: 'Holi - Festival of Colors',
            category: 'light-color',
            categoryTag: '🎨 Colors & Joy',
            region: 'north',
            regionTag: 'North & Central India',
            state: 'Uttar Pradesh',
            month: 'mar',
            monthName: 'March (Phalguna)',
            ritu: 'vasant',
            rituName: 'Vasant (Spring)',
            featured: true,
            icon: '🎨',
            shortDesc: 'Vibrant spring celebration of colors, love, and the victory of Prahlad over Holika.',
            delicacy: 'Thandai (saffron-almond drink), Gujiya, Malpua & Dahi Bhalla',
            details: 'Holi begins with Holika Dahan bonfires on full moon night. Next morning (Dhulandi), people playfully splash herbal Gulal colors and water. Lathmar Holi in Barsana and Braj Holi in Mathura attract travelers worldwide.',
            rituals: 'Holika Dahan bonfire, playing with organic Gulal, drinking refreshing Thandai.'
        },
        {
            id: 'ratha-yatra',
            name: 'Puri Ratha Yatra',
            category: 'chariot',
            categoryTag: '🛕 Temple & Rath Yatra',
            region: 'east',
            regionTag: 'East India',
            state: 'Odisha',
            month: 'jun',
            monthName: 'June / July (Ashadha)',
            ritu: 'greeshma',
            rituName: 'Greeshma / Varsha',
            featured: true,
            icon: '🛕',
            shortDesc: 'World-famous chariot festival where Lord Jagannath travels in massive wooden raths.',
            delicacy: 'Mahaprasad (56 Bhog of Jagannath Temple), Khaja & Chhena Poda',
            details: 'Lord Jagannath, Balabhadra, and Subhadra emerge from the Puri temple to visit Gundicha Temple on 45-foot tall wooden chariots pulled by millions of devoted pilgrims.',
            rituals: 'Chhera Pahanra (sweeping by Puri King), pulling chariot ropes, 9-day stay at Gundicha Temple.'
        },
        {
            id: 'chhath-puja',
            name: 'Chhath Puja',
            category: 'light-color',
            categoryTag: '🌅 Sun Worship & Purity',
            region: 'east',
            regionTag: 'East & Central India',
            state: 'Bihar',
            month: 'oct',
            monthName: 'October / November (Kartik)',
            ritu: 'sharad',
            rituName: 'Sharad / Hemant',
            featured: true,
            icon: '🌅',
            shortDesc: 'Ancient 4-day Vedic festival worshipping Sun God Surya and Chhathi Maiya along riverbanks.',
            delicacy: 'Thekua (wheat & jaggery ghee cookies) & Rasiya (jaggery kheer)',
            details: 'One of India\'s most austere festivals involving 36 hours of waterless fasting (Nirjala). Devotees (Vratins) offer Arghya (sacred water offerings) to the setting and rising sun while standing waist-deep in rivers.',
            rituals: 'Nahay Khay, Kharna, Sandhya Arghya (setting sun), Usha Arghya (rising sun).'
        },
        {
            id: 'hornbill',
            name: 'Hornbill Festival',
            category: 'tribal',
            categoryTag: '🏹 Tribal & Indigenous Heritage',
            region: 'northeast',
            regionTag: 'North-East India',
            state: 'Nagaland',
            month: 'dec',
            monthName: 'December 1 to 10',
            ritu: 'shishir',
            rituName: 'Shishir (Winter)',
            featured: true,
            icon: '🦅',
            shortDesc: 'The "Festival of Festivals" bringing together 17 Naga tribes at Kisama Heritage Village.',
            delicacy: 'Smoked pork with Axone (fermented soybean), bamboo shoot delicacies & local rice brews',
            details: 'Named after the sacred Indian Hornbill bird, this 10-day extravaganza showcases Naga warrior folk dances, indigenous archery, chili-eating contests, rock concerts, and tribal crafts.',
            rituals: 'Naga tribal dances, indigenous sports, Hornbill National Rock Contest, craft displays.'
        },
        {
            id: 'pushkar-fair',
            name: 'Pushkar Camel Fair',
            category: 'cultural',
            categoryTag: '💃 Folk, Dance & Music',
            region: 'west',
            regionTag: 'West India',
            state: 'Rajasthan',
            month: 'nov',
            monthName: 'November (Kartik Purnima)',
            ritu: 'hemant',
            rituName: 'Hemant (Pre-Winter)',
            featured: true,
            icon: '🐪',
            shortDesc: 'One of the world\'s largest livestock fairs blending desert folk culture and sacred lake dips.',
            delicacy: 'Dal Baati Churma, Malpua & Rabri',
            details: 'Thousands of decorated camels, horses, and cattle gather on Pushkar desert dunes alongside folk musicians, Kalbelia dancers, turban tying competitions, and holy dips in Pushkar Lake.',
            rituals: 'Holy dip in Pushkar Lake, camel beauty pageants, folk dance performances, hot air ballooning.'
        },
        {
            id: 'hemis-festival',
            name: 'Hemis Monastery Festival',
            category: 'cultural',
            categoryTag: '💃 Folk & Monastery Heritage',
            region: 'north',
            regionTag: 'North India',
            state: 'Jammu & Kashmir / Ladakh',
            month: 'jun',
            monthName: 'June / July (Tse-Chu)',
            ritu: 'greeshma',
            rituName: 'Greeshma (Summer)',
            featured: true,
            icon: '🏔️',
            shortDesc: 'Sacred Buddhist Cham dance festival celebrating Guru Padmasambhava at Hemis Monastery.',
            delicacy: 'Butter Tea (Gur Gur Chai), Thukpa noodle soup & Skyu',
            details: 'Set in high-altitude Himalayan Ladakh, monks wear vibrant silk robes and terrifying sacred masks (Cham) to perform rhythmic dances representing victory of Dharma over negative forces.',
            rituals: 'Unfurling of ancient Thangka tapestry, sacred Cham masked dance by Lamas, brass horn music.'
        },
        {
            id: 'navratri-garba',
            name: 'Navratri & Garba',
            category: 'cultural',
            categoryTag: '💃 Folk, Dance & Music',
            region: 'west',
            regionTag: 'West India',
            state: 'Gujarat',
            month: 'sep',
            monthName: 'September / October (Ashwin)',
            ritu: 'sharad',
            rituName: 'Sharad (Autumn)',
            featured: false,
            icon: '💃',
            shortDesc: '9 nights of ecstatic Garba and Dandiya Raas dance celebrating Goddess Amba.',
            delicacy: 'Fafda Jalebi, Sabudana Khichdi & Farali Chevdo',
            details: 'The world\'s longest dance festival! Millions dress in Chaniya Cholis and Kediyus to swirl around the sacred Garbo lamp in rhythmic circles accompanied by live folk bands.',
            rituals: 'Garba circles around Garbo lamp, Dandiya Raas stick dance, 9 forms of Navdurga worship.'
        },
        {
            id: 'lathmar-holi',
            name: 'Lathmar Holi Barsana',
            category: 'cultural',
            categoryTag: '💃 Folk & Color Tradition',
            region: 'north',
            regionTag: 'North India',
            state: 'Uttar Pradesh',
            month: 'mar',
            monthName: 'March (Phalguna)',
            ritu: 'vasant',
            rituName: 'Vasant (Spring)',
            featured: false,
            icon: '🛡️',
            shortDesc: 'Unique Braj tradition where women playfully beat men with wooden sticks in Radha\'s village.',
            delicacy: 'Thandai with Kesari Milk, Peda & Gujiya',
            details: 'Re-enacting Lord Krishna\'s playful visits to Radha\'s village in Barsana. Men from Nandgaon come with shields to protect themselves while Barsana women hit them with long sticks amidst color clouds.',
            rituals: 'Shield defense against wooden sticks, singing Braj folk songs, splashing Tesu flower colors.'
        },
        {
            id: 'ugadi',
            name: 'Ugadi / Gudi Padwa',
            category: 'new-year',
            categoryTag: '🌅 New Year & Solar Transit',
            region: 'south',
            regionTag: 'South & West India',
            state: 'Karnataka',
            month: 'mar',
            monthName: 'March / April (Chaitra)',
            ritu: 'vasant',
            rituName: 'Vasant (Spring)',
            featured: false,
            icon: '🌱',
            shortDesc: 'Deccan New Year marked by hoisting Gudi flags and tasting the 6-flavor Bevubella recipe.',
            delicacy: 'Bevu-Bella (Neem & Jaggery mix), Holige / Puran Poli & Mango Rice',
            details: 'Celebrated in Karnataka, AP, Telangana (Ugadi) and Maharashtra (Gudi Padwa). Bevubella combines 6 tastes (sweet, sour, bitter, salty, pungent, astringent) symbolizing life\'s mixed experiences.',
            rituals: 'Hoisting silk Gudi flag on doorway, eating Neem-Jaggery mix, reading Panchanga almanac.'
        },
        {
            id: 'thrissur-pooram',
            name: 'Thrissur Pooram',
            category: 'chariot',
            categoryTag: '🛕 Temple & Elephant Festival',
            region: 'south',
            regionTag: 'South India',
            state: 'Kerala',
            month: 'apr',
            monthName: 'April / May (Medam)',
            ritu: 'vasant',
            rituName: 'Vasant / Greeshma',
            featured: false,
            icon: '🐘',
            shortDesc: 'The "Pooram of all Poorams" featuring 30 caparisoned elephants and Kudamattam umbrella exchanges.',
            delicacy: 'Neyyappam, Unniyappam & Kerala Temple Sadya',
            details: 'Held at Vadakkunnathan Temple grounds. Two temple groups (Paramekkavu & Thiruvambadi) engage in friendly competition exchanging vibrant sequined silk umbrellas (Kudamattam) atop 30 caparisoned elephants accompanied by Panchavadyam drum symphonies.',
            rituals: 'Panchavadyam drum ensemble, Kudamattam umbrella display, Vedikettu pyrotechnics.'
        },
        {
            id: 'lohri',
            name: 'Lohri Harvest Festival',
            category: 'harvest',
            categoryTag: '🌾 Harvest & Agricultural',
            region: 'north',
            regionTag: 'North India',
            state: 'Punjab',
            month: 'jan',
            monthName: 'January (Pausha)',
            ritu: 'shishir',
            rituName: 'Shishir (Winter)',
            featured: false,
            icon: '🔥',
            shortDesc: 'Punjabi winter solstice harvest festival celebrated around glowing bonfires with Bhangra.',
            delicacy: 'Makki di Roti, Sarson da Saag, Til-Rewri & Gajak',
            details: 'Marks the passing of winter solstice and harvesting of Rabi winter crops. Families circle the bonfire throwing sesame seeds, popcorn, and jaggery while singing tales of folk hero Dulla Bhatti.',
            rituals: 'Lighting Lohri bonfire, offering popcorn & sesame to fire, energetic Bhangra & Gidda dance.'
        },
        {
            id: 'losar',
            name: 'Losar Tibetan New Year',
            category: 'new-year',
            categoryTag: '🌅 New Year Celebration',
            region: 'north',
            regionTag: 'North & North-East',
            state: 'Jammu & Kashmir / Ladakh',
            month: 'feb',
            monthName: 'February / March',
            ritu: 'shishir',
            rituName: 'Shishir / Vasant',
            featured: false,
            icon: '❄️',
            shortDesc: 'Buddhist New Year in Ladakh and Sikkim with prayer flags, torchlight processions, and feasts.',
            delicacy: 'Khapse (sweet fried pastries), Guthuk soup & Butter Tea',
            details: 'Ladakh celebrates Losar with Metho torchlight parades to ward off evil spirits, stringing fresh 5-color prayer flags across stupas, and visiting family elders with barley beer (Chang).',
            rituals: 'Metho torch parade, hoisting prayer flags, offering Khapse & barley offerings.'
        }
    ];

    // ----------------------------------------------------------------------
    // 2. State & Filter Control Variables
    // ----------------------------------------------------------------------

    let selectedRegion = 'all';
    let selectedMonth = 'all';
    let selectedCategory = 'all';
    let selectedState = 'all';
    let searchQuery = '';

    // Region Information Summaries
    const regionSummaries = {
        all: {
            title: '🌏 All India Festival Mosaic',
            desc: 'Explore over 50 major festivals celebrated across India\'s 28 States and 8 Union Territories—from Himalayan monastic dances to coastal boat races.'
        },
        north: {
            title: '🏔️ North India Celebrations',
            desc: 'Characterized by bonfire harvests (Lohri), vibrant spring color explosions (Holi), Himalayan Buddhist monastic dances (Hemis, Losar), and Ramlila pageantry.'
        },
        south: {
            title: '🌴 South India Celebrations',
            desc: 'Known for grand floral carpets & snake boat races (Onam), solar harvest boiling pots (Pongal), caparisoned elephant temple pageants (Thrissur Pooram), and Ugadi new year feasts.'
        },
        east: {
            title: '🎨 East India Celebrations',
            desc: 'Famous for UNESCO heritage pandal art (Durga Puja), massive wooden chariot processions (Puri Ratha Yatra), and riverbank Sun God worship (Chhath Puja).'
        },
        west: {
            title: '🪔 West India Celebrations',
            desc: 'Renowned for 10-day community Ganesha immersion (Ganesh Chaturthi), world\'s longest Garba dance nights (Navratri), and desert camel carnivals (Pushkar Fair).'
        },
        central: {
            title: '🛕 Central India Celebrations',
            desc: 'Features classical Indian dance extravaganzas against temple backdrops (Khajuraho Dance Fest), tribal Haat fairs (Bhagoria), and Lokrang folk arts.'
        },
        northeast: {
            title: '𦦏 North-East India Celebrations',
            desc: 'Highlighting Assamese agricultural spring dances (Bihu), warrior tribal gatherings (Hornbill Festival in Nagaland), and Manipuri dance carnivals.'
        }
    };

    // ----------------------------------------------------------------------
    // 3. Filter Engine
    // ----------------------------------------------------------------------

    const filterFestivals = () => {
        return festivalData.filter(item => {
            // Region Filter
            const matchRegion = (selectedRegion === 'all') || (item.region === selectedRegion) || (item.region === 'all');
            
            // Month Filter
            const matchMonth = (selectedMonth === 'all') || (item.month.includes(selectedMonth));

            // Category Filter
            const matchCategory = (selectedCategory === 'all') || (item.category === selectedCategory);

            // State Filter
            const matchState = (selectedState === 'all') || (item.state.toLowerCase() === selectedState.toLowerCase());

            // Search Query Filter
            const q = searchQuery.toLowerCase().trim();
            const matchSearch = (q === '') || (
                item.name.toLowerCase().includes(q) ||
                item.state.toLowerCase().includes(q) ||
                item.delicacy.toLowerCase().includes(q) ||
                item.shortDesc.toLowerCase().includes(q) ||
                item.details.toLowerCase().includes(q)
            );

            return matchRegion && matchMonth && matchCategory && matchState && matchSearch;
        });
    };

    // ----------------------------------------------------------------------
    // 4. Render Functions
    // ----------------------------------------------------------------------

    // Render Featured Cards (First 6 Featured items)
    const renderFeatured = () => {
        const featuredGrid = document.getElementById('featured-grid');
        if (!featuredGrid) return;

        featuredGrid.innerHTML = '';
        const featuredItems = festivalData.filter(item => item.featured);

        featuredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'festival-card animate-on-scroll';
            card.innerHTML = `
                <div class="card-header-visual">
                    <span class="card-month-badge">${item.monthName}</span>
                    <span class="card-region-badge">${item.regionTag}</span>
                    <span class="card-icon">${item.icon}</span>
                </div>
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <div class="card-state-tag">📍 ${item.state} • ${item.categoryTag}</div>
                    <p class="card-desc">${item.shortDesc}</p>
                    <div class="card-delicacy-box">😋 Delicacy: ${item.delicacy}</div>
                    <button class="btn-card-details" data-id="${item.id}">📖 Read Complete Story</button>
                </div>
            `;
            featuredGrid.appendChild(card);
        });
    };

    // Render Main Directory Grid
    const renderDirectory = () => {
        const directoryGrid = document.getElementById('festivals-grid');
        const countText = document.getElementById('directory-count');
        if (!directoryGrid) return;

        const filtered = filterFestivals();
        directoryGrid.innerHTML = '';

        if (countText) {
            countText.textContent = `Showing ${filtered.length} celebration(s) matching your current filters.`;
        }

        if (filtered.length === 0) {
            directoryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--festive-light-card); border-radius: 24px; border: 1px solid var(--festive-border-light);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="font-size: 1.5rem; color: var(--festive-crimson);">No Festivals Found</h3>
                    <p style="color: var(--festive-text-muted);">Try adjusting your search query, region, month, or category filter to discover celebrations!</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'festival-card animate-on-scroll';
            card.innerHTML = `
                <div class="card-header-visual">
                    <span class="card-month-badge">${item.monthName}</span>
                    <span class="card-region-badge">${item.regionTag}</span>
                    <span class="card-icon">${item.icon}</span>
                </div>
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <div class="card-state-tag">📍 ${item.state} • ${item.categoryTag}</div>
                    <p class="card-desc">${item.shortDesc}</p>
                    <div class="card-delicacy-box">😋 Delicacy: ${item.delicacy}</div>
                    <button class="btn-card-details" data-id="${item.id}">📖 Read Complete Story</button>
                </div>
            `;
            directoryGrid.appendChild(card);
        });

        // Attach click handlers to details buttons
        document.querySelectorAll('.btn-card-details').forEach(btn => {
            btn.addEventListener('click', () => {
                const festId = btn.getAttribute('data-id');
                const festData = festivalData.find(f => f.id === festId);
                if (festData) {
                    openModal(`
                        <div style="text-align: center; margin-bottom: 1.5rem;">
                            <div style="font-size: 4rem; margin-bottom: 0.5rem;">${festData.icon}</div>
                            <span class="section-tagline">${festData.monthName} • ${festData.rituName}</span>
                            <h2 style="font-size: 2rem; margin: 0.5rem 0; color: var(--festive-crimson);">${festData.name}</h2>
                            <div style="font-weight: 700; color: var(--festive-purple);">📍 ${festData.state} (${festData.regionTag})</div>
                        </div>

                        <div style="margin-bottom: 1.5rem; line-height: 1.7; font-size: 1.05rem; color: var(--festive-text-muted);">
                            <p>${festData.details}</p>
                        </div>

                        <div style="background: rgba(245,158,11,0.1); border-left: 4px solid var(--festive-marigold); padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.5rem; color: var(--festive-text-main);">🙏 Key Rituals & Traditions:</h4>
                            <p style="font-size: 0.95rem; color: var(--festive-text-muted);">${festData.rituals}</p>
                        </div>

                        <div style="background: rgba(13,148,136,0.1); border-left: 4px solid var(--festive-peacock); padding: 1.25rem; border-radius: 12px;">
                            <h4 style="margin-bottom: 0.5rem; color: var(--festive-text-main);">🍲 Special Culinary Delicacies:</h4>
                            <p style="font-size: 0.95rem; color: var(--festive-text-muted);">${festData.delicacy}</p>
                        </div>
                    `);
                }
            });
        });
    };

    // ----------------------------------------------------------------------
    // 5. Event Handlers & Map Integrations
    // ----------------------------------------------------------------------

    // Map Path Clicks
    document.querySelectorAll('.region-path').forEach(path => {
        path.addEventListener('click', () => {
            const regKey = path.getAttribute('data-region');
            selectedRegion = regKey;

            // Highlight corresponding button
            document.querySelectorAll('.region-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-region') === regKey);
            });

            // Update Region Summary Box
            const summary = regionSummaries[regKey] || regionSummaries['all'];
            document.getElementById('region-title').textContent = summary.title;
            document.getElementById('region-desc').textContent = summary.desc;

            renderDirectory();
        });
    });

    // Region Buttons Click
    document.querySelectorAll('.region-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const regKey = btn.getAttribute('data-region');
            selectedRegion = regKey;

            document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const summary = regionSummaries[regKey] || regionSummaries['all'];
            document.getElementById('region-title').textContent = summary.title;
            document.getElementById('region-desc').textContent = summary.desc;

            renderDirectory();
        });
    });

    // Month Buttons Click
    document.querySelectorAll('.month-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedMonth = btn.getAttribute('data-month');
            document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDirectory();
        });
    });

    // Category Tabs Click
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            selectedCategory = tab.getAttribute('data-cat');
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderDirectory();
        });
    });

    // State Select Dropdown Change
    const stateSelect = document.getElementById('state-select');
    stateSelect?.addEventListener('change', (e) => {
        selectedState = e.target.value;
        renderDirectory();
    });

    // Search Input
    const searchInput = document.getElementById('festival-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchSummary = document.getElementById('search-results-summary');

    searchInput?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchQuery.trim().length > 0) {
            clearSearchBtn.style.display = 'block';
            searchSummary.textContent = `Live searching for "${searchQuery}"...`;
        } else {
            clearSearchBtn.style.display = 'none';
            searchSummary.textContent = '';
        }
        renderDirectory();
    });

    clearSearchBtn?.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        searchSummary.textContent = '';
        renderDirectory();
    });

    // ----------------------------------------------------------------------
    // 6. Modal Lightbox Handler
    // ----------------------------------------------------------------------

    const modalOverlay = document.getElementById('festival-modal');
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
    // 7. Theme Toggle & Page Init
    // ----------------------------------------------------------------------

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('festival-theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('festival-theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('festival-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });

    // Initialize Page Views
    renderFeatured();
    renderDirectory();
});

/* ==========================================================================
   Eid Celebrations Across India - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Master Data Definitions
    // ----------------------------------------------------------------------

    const chandraatData = [
        {
            title: '🌿 Henna / Mehndi Stalls',
            category: 'mehndi',
            icon: '🖐️',
            location: 'Jama Masjid Delhi, Charminar Hyderabad, Aminabad Lucknow',
            desc: 'On Chand Raat, girls and women gather at brightly lit night stalls to adorn their hands with intricate Henna floral and peacock motifs that last throughout the festive week.',
            details: 'Master henna artists work swiftly under glowing lanterns until 3 AM, creating traditional Indian and Arabic lace patterns.'
        },
        {
            title: '🌸 Attar & Natural Perfume Shops',
            category: 'attar',
            icon: '🧴',
            location: 'Chowk Lucknow, Ballimaran Delhi, Pathergatti Hyderabad',
            desc: 'Aromatic shops selling pure, alcohol-free essential oils extracted from Kannauj roses, Sambac jasmine, Vetiver (Khus), and aged Assam Oudh.',
            details: 'Elders and youth purchase small crystal bottles (itardans) of fragrant oil to dab onto prayer garments for Eid morning.'
        },
        {
            title: '✨ Glass Bangles & Jewellery',
            category: 'bangles',
            icon: '💎',
            location: 'Laad Bazaar Hyderabad, Bhendi Bazaar Mumbai, Chitpur Kolkata',
            desc: 'Shops lined with millions of glittering glass bangles, velvet bangles, silver Jhumkas, and Passa hair pins matching Eid outfits.',
            details: 'The chiming sound of glass bangles reverberates through night markets as families complete their festive wardrobe.'
        },
        {
            title: '🍢 Midnight Food Walks',
            category: 'foodwalk',
            icon: '🍡',
            location: 'Matia Mahal Delhi, Zakaria Street Kolkata, Mohammed Ali Road Mumbai',
            desc: 'Night markets turn into culinary paradises serving sizzling Seekh Kebabs, Nalli Nihari, Mutton Haleem, Shahi Tukda, and hot Jalebis till dawn.',
            details: 'Thousands walk through neon-lit streets enjoying pre-Eid street food feasts with friends and family.'
        }
    ];

    const mosqueData = [
        {
            name: 'Jama Masjid',
            city: 'Old Delhi',
            icon: '🕌',
            capacity: '25,000+ Worshippers',
            desc: 'Built by Mughal Emperor Shah Jahan in 1656. On Eid morning, its red sandstone courtyard and staircase overflow with thousands of worshippers in crisp white attire.',
            details: 'The sight of tens of thousands bowing simultaneously in prayer before the majestic domes of Jama Masjid is an iconic image of Indian Eid.'
        },
        {
            name: 'Mecca Masjid',
            city: 'Hyderabad',
            icon: '🕌',
            capacity: '20,000+ Worshippers',
            desc: 'Located adjacent to Charminar, constructed with bricks made from soil brought directly from Mecca. Hosts grand morning prayers.',
            details: 'Surrounded by historic arches, the congregants fill the vast granite courtyard under warm sunshine, followed by grand greetings near Charminar.'
        },
        {
            name: 'Taj-ul-Masajid',
            city: 'Bhopal',
            icon: '🕌',
            capacity: '175,000+ Worshippers',
            desc: 'One of the largest mosques in Asia ("Crown of Mosques"), featuring towering pink minarets, marble domes, and a massive courtyard.',
            details: 'People travel from across Madhya Pradesh to offer Eid prayers in its tranquil pink sandstone marble corridors.'
        },
        {
            name: 'Hazratbal Shrine & Eidgah',
            city: 'Srinagar, Kashmir',
            icon: '🏔️',
            capacity: '50,000+ Worshippers',
            desc: 'Situated on the banks of Dal Lake, housing the revered relic Moi-e-Muqaddas. Thousands gather for morning prayers overlooking snowpeaks.',
            details: 'Devotees recite sweet Kashmiri Naat prayers, followed by family picnics along the shores of Dal Lake and Nishat Bagh.'
        },
        {
            name: 'Tipu Sultan Mosque & Nakhoda Mosque',
            city: 'Kolkata',
            icon: '🕌',
            capacity: '15,000+ Worshippers',
            desc: 'Historic architectural jewels in Central Kolkata where people of all walks of life join in peaceful harmony.',
            details: 'Kolkata\'s Chitpur and Esplanade areas echo with joyful chants before families head out for Kolkata Biryani feasts.'
        }
    ];

    const regionalData = [
        {
            region: 'north',
            title: 'Mughal Heritage & Nawabi Warmth',
            state: 'Delhi, Uttar Pradesh & Punjab',
            icon: '🕌',
            desc: 'Old Delhi and Lucknow represent the pinnacle of North Indian Eid traditions. Families wear Chikankari Kurtas, relish Kimami Sewai, and host grand evening poetry Qawwali sessions.',
            highlights: 'Jama Masjid prayers, Aminabad night shopping, Lucknawi Galouti Kebab dawats, Ganga-Jamuni Tehzeeb.'
        },
        {
            region: 'south',
            title: 'Malabar Melodies & Hyderabadi Haleem',
            state: 'Hyderabad, Kerala (Malabar) & Tamil Nadu',
            icon: '🌴',
            desc: 'Hyderabad shines around Charminar with slow-cooked Haleem and Dum Biryani. In Malabar (Calicut/Kannur), Eid is celebrated with Mappila folk songs and Malabar Pathiri feasts.',
            highlights: 'Charminar illuminations, Malabar Mutton Biryani, Mappila Pattukal music, tender coconut payasam.'
        },
        {
            region: 'east',
            title: 'Bengali Harmony & Sweets Trail',
            state: 'West Bengal & Bihar',
            icon: '🎨',
            desc: 'Zakaria Street in Kolkata lights up for night food walks. Families share Lachha Sewai, Kolkata Biryani with boiled egg and potato, and traditional sweet Rosogollas.',
            highlights: 'Zakaria Street street food, Chhath-Eid cultural exchange in Bihar, Bhog Khichuri cross-celebrations.'
        },
        {
            region: 'west',
            title: 'Bohri Mohalla & Coastal Flavors',
            state: 'Mumbai & Gujarat',
            icon: '🏙️',
            desc: 'Mohammed Ali Road and Bohri Mohalla in Mumbai host India\'s most famous night food festival. In Gujarat, families prepare sweet Kheer and exchange dry fruits.',
            highlights: 'Mohammed Ali Road Malpua Rabri stalls, Bohri thal community dining, Surat sweet bazaars.'
        },
        {
            region: 'kashmir',
            title: 'Valley Harmony & Wazwan Feasts',
            state: 'Kashmir Valley',
            icon: '🏔️',
            desc: 'High in the Himalayas, Kashmiri families dress in embroidered Pherans, offer prayers at Hazratbal Shrine by Dal Lake, and serve 36-course royal Wazwan feasts.',
            highlights: 'Hazratbal Dal Lake prayers, Kashmiri Kehwa tea with almonds, Wazwan Rista & Gushtaba delicacies.'
        }
    ];

    const foodsData = [
        {
            name: 'Sheer Khurma',
            category: 'sweets',
            icon: '🥣',
            origin: 'Pan-India Classic',
            desc: 'The undisputed sweet hero of Eid! Fine roasted vermicelli slow-cooked in full-cream milk with saffron, dates, green cardamom, almonds, pistachios, and chironji.',
            details: 'Every Indian home has its secret family Sheer Khurma recipe served warm or chilled to every guest who walks through the door.'
        },
        {
            name: 'Meethi / Kimami Sewai',
            category: 'sweets',
            icon: '🍮',
            origin: 'Lucknow & Uttar Pradesh',
            desc: 'Fine dry vermicelli slow-cooked in thick aromatic sugar syrup infused with khoya, mawa, saffron, and topped with edible silver leaf (Vark).',
            details: 'A rich, decadent Awadhi delicacy with a dark golden glaze and deep caramel cardamom aroma.'
        },
        {
            name: 'Hyderabadi Dum Biryani & Haleem',
            category: 'biryani',
            icon: '🍲',
            origin: 'Hyderabad, Telangana',
            desc: 'Aromatic basmati rice layered with marinated mutton, fried onions (birishta), mint, and saffron cooked on dum. Paired with rich lentils & meat Haleem.',
            details: 'Slow-cooked for hours in massive copper handis over wood fires near Charminar.'
        },
        {
            name: 'Lucknawi Galouti Kebab & Paratha',
            category: 'kebabs',
            icon: '🍢',
            origin: 'Lucknow, UP',
            desc: 'Melt-in-the-mouth minced lamb kebabs infused with over 160 secret Awadhi spices, served with flaky Mughlai Ulta Tawa Parathas.',
            details: 'Created originally for the Nawabs of Awadh, symbolizing the finest royal culinary refinement.'
        },
        {
            name: 'Malabar Mutton Biryani & Pathiri',
            category: 'biryani',
            icon: '🍛',
            origin: 'Kozhikode (Calicut), Kerala',
            desc: 'Fragrant short-grain Kaima rice biryani cooked with Malabar spices, ghee, cashews, raisins, served alongside wafer-thin rice pancakes (Pathiri).',
            details: 'Celebrated across the Malabar coast of Kerala, offering a subtle, aromatic spice profile.'
        },
        {
            name: 'Nalli Nihari & Khamiri Roti',
            category: 'kebabs',
            icon: '🍖',
            origin: 'Old Delhi & Bhopal',
            desc: 'Overnight slow-cooked shank meat stew with rich bone marrow and aromatic whole spices, eaten with yeast-leavened fluffy tandoori Khamiri bread.',
            details: 'A comforting morning feast enjoyed after Eid prayers in Old Delhi\'s Ballimaran and Matia Mahal.'
        },
        {
            name: 'Shahi Tukda & Malpua with Rabri',
            category: 'sweets',
            icon: '🍨',
            origin: 'Delhi, Mumbai & Hyderabad',
            desc: 'Golden deep-fried bread slices soaked in saffron sugar syrup and covered in thick rabri cream, nuts, and silver leaf.',
            details: 'Popular street food dessert sold in high piles during Chand Raat food walks.'
        }
    ];

    const citiesData = [
        {
            name: 'Old Delhi (Shahjahanabad)',
            icon: '🕌',
            state: 'Delhi',
            highlights: 'Jama Masjid morning prayers, Matia Mahal food street, Chandni Chowk henna bazaars.',
            desc: 'The historic heart of Mughal India. Streets glow with green fairy lights and aroma of Nihari, Kebabs, and Sheer Khurma.'
        },
        {
            name: 'Lucknow (City of Nawabs)',
            icon: '🏰',
            state: 'Uttar Pradesh',
            highlights: 'Aminabad & Chowk night shopping, Chikankari Kurtas, Bara Imambara, Galouti Kebabs.',
            desc: 'Famous for royal Awadhi etiquette (Pehle Aap), Kimami Sewai, and exquisite handcrafted embroidery.'
        },
        {
            name: 'Hyderabad (City of Pearls)',
            icon: '💎',
            state: 'Telangana',
            highlights: 'Charminar illuminations, Mecca Masjid, Laad Bazaar bangles, Hyderabadi Haleem.',
            desc: 'The night sky around Charminar turns into a glowing wonderland of bangles, perfumes, and biryani feasts.'
        },
        {
            name: 'Mumbai',
            icon: '🏙️',
            state: 'Maharashtra',
            highlights: 'Mohammed Ali Road food trail, Minara Masjid, Bohri Mohalla, Marine Drive walk.',
            desc: 'Home to India\'s most famous midnight food walk, attracting food lovers of all faiths for Malpua, Nalli Nihari, and Firni.'
        },
        {
            name: 'Kolkata',
            icon: '🎨',
            state: 'West Bengal',
            highlights: 'Zakaria Street, Chitpur night markets, Tipu Sultan Mosque, Kolkata Biryani.',
            desc: 'Blends Bengali sweetness with Mughlai culinary heritage along the vibrant illuminated streets of Central Kolkata.'
        },
        {
            name: 'Srinagar',
            icon: '🏔️',
            state: 'Jammu & Kashmir',
            highlights: 'Hazratbal Shrine on Dal Lake, Lal Chowk bazaars, Kashmiri Wazwan feast.',
            desc: 'Serene mountain morning prayers overlooking Dal Lake, followed by 36-course Wazwan family banquets.'
        },
        {
            name: 'Kozhikode (Calicut)',
            icon: '🌴',
            state: 'Kerala',
            highlights: 'Kuttichira heritage mosques, Malabar Mutton Biryani, Beach road food stalls.',
            desc: 'Famous for coastal Mappila hospitality, fragrant Kaima rice biryani, and traditional Mappila folk songs.'
        },
        {
            name: 'Bhopal',
            icon: '🏰',
            state: 'Madhya Pradesh',
            highlights: 'Taj-ul-Masajid prayers, Old City bazaars, Bhopali Pasanda kebabs.',
            desc: 'Offers serene grand congregation at one of Asia\'s largest pink sandstone mosques.'
        }
    ];

    const quizQuestions = [
        {
            question: 'What is the signature sweet dish prepared in almost every Indian home on Eid al-Fitr?',
            options: ['Rasgulla', 'Sheer Khurma', 'Jalebi', 'Gajar Ka Halwa'],
            answer: 1,
            explanation: 'Sheer Khurma (vermicelli cooked in full-cream milk with dates, saffron, and dry fruits) is the iconic sweet served to every visitor on Eid.'
        },
        {
            question: 'What is the mandatory charitable donation given to the needy before Eid morning prayers called?',
            options: ['Eidi', 'Zakat al-Fitr', 'Attar', 'Mehndi'],
            answer: 1,
            explanation: 'Zakat al-Fitr is the mandatory charity given before Eid prayers to ensure underprivileged members of society can celebrate with food and dignity.'
        },
        {
            question: 'Which iconic historic landmark in Hyderabad is illuminated with glowing lights for Chand Raat night bazaars?',
            options: ['Bara Imambara', 'Charminar', 'Gateway of India', 'Victoria Memorial'],
            answer: 1,
            explanation: 'Charminar and surrounding Madina Circle / Laad Bazaar in Hyderabad light up with millions of bangles, Haleem stalls, and festive crowds.'
        },
        {
            question: 'Which city in Uttar Pradesh is famous worldwide for Chikankari embroidery worn on Eid and pure Attar perfumes?',
            options: ['Agra', 'Lucknow', 'Varanasi', 'Kanpur'],
            answer: 1,
            explanation: 'Lucknow is the cultural capital of Chikankari hand-embroidery and Awadhi royal gastronomy, while nearby Kannauj distills pure attars.'
        },
        {
            question: 'What is the traditional gift of pocket money or silver coins given by elders to children on Eid morning called?',
            options: ['Eidi', 'Namaz', 'Ghusl', 'Dawat'],
            answer: 0,
            explanation: 'Eidi is the beloved tradition where elders distribute crisp banknotes, silver coins, or gifts to children after morning prayers.'
        }
    ];

    // ----------------------------------------------------------------------
    // 2. Render Functions
    // ----------------------------------------------------------------------

    // Render Chand Raat Section
    const renderChandraat = (filter = 'all') => {
        const grid = document.getElementById('chandraat-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const filtered = filter === 'all' ? chandraatData : chandraatData.filter(i => i.category === filter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'chandraat-card animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.title}</h3>
                    <div class="card-subtitle">📍 ${item.location}</div>
                    <p>${item.desc}</p>
                    <button class="btn-card-action" data-title="${item.title}" data-details="${item.details}">📖 Discover Traditions</button>
                </div>
            `;
            grid.appendChild(card);
        });

        attachCardModalListeners();
    };

    // Render Mosques Grid
    const renderMosques = () => {
        const grid = document.getElementById('mosques-grid');
        if (!grid) return;

        grid.innerHTML = '';
        mosqueData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'chandraat-card animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-badge-top">${item.capacity}</span>
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.name}</h3>
                    <div class="card-subtitle">📍 ${item.city}</div>
                    <p>${item.desc}</p>
                    <button class="btn-card-action" data-title="${item.name} (${item.city})" data-details="${item.details}">🏛️ View Landmark Story</button>
                </div>
            `;
            grid.appendChild(card);
        });

        attachCardModalListeners();
    };

    // Render Regional Cards Grid
    const renderRegional = (filter = 'all') => {
        const grid = document.getElementById('regional-cards-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const filtered = filter === 'all' ? regionalData : regionalData.filter(i => i.region === filter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'reg-card animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.title}</h3>
                    <div class="card-subtitle">📍 ${item.state}</div>
                    <p>${item.desc}</p>
                    <div style="background: rgba(6,95,70,0.08); padding: 0.75rem; border-radius: 12px; font-size: 0.82rem; font-weight: 600; color: var(--eid-emerald);">
                        ✨ Highlights: ${item.highlights}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    // Render Foods Grid
    const renderFoods = (filter = 'all') => {
        const grid = document.getElementById('foods-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const filtered = filter === 'all' ? foodsData : foodsData.filter(i => i.category === filter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'food-card animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.name}</h3>
                    <div class="card-subtitle">📍 ${item.origin}</div>
                    <p>${item.desc}</p>
                    <button class="btn-card-action" data-title="${item.name}" data-details="${item.details}">🍲 View Recipe Story</button>
                </div>
            `;
            grid.appendChild(card);
        });

        attachCardModalListeners();
    };

    // Render Cities Grid
    const renderCities = () => {
        const grid = document.getElementById('cities-grid');
        if (!grid) return;

        grid.innerHTML = '';
        citiesData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'city-card animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.name}</h3>
                    <div class="card-subtitle">📍 ${item.state}</div>
                    <p>${item.desc}</p>
                    <div style="background: rgba(217,119,6,0.08); padding: 0.75rem; border-radius: 12px; font-size: 0.82rem; font-weight: 600; color: var(--eid-gold);">
                        🕌 Night Bazaars & Spots: ${item.highlights}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    // Helper for Modal Click Attachment
    const attachCardModalListeners = () => {
        document.querySelectorAll('.btn-card-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                const details = btn.getAttribute('data-details');
                if (title && details) {
                    openModal(`
                        <div style="text-align: center; margin-bottom: 1.5rem;">
                            <span class="section-tagline">Cultural Spotlight</span>
                            <h2 style="font-size: 1.8rem; margin: 0.5rem 0; color: var(--eid-emerald);">${title}</h2>
                        </div>
                        <div style="font-size: 1.05rem; line-height: 1.7; color: var(--eid-text-muted); margin-bottom: 1.5rem;">
                            <p>${details}</p>
                        </div>
                        <div style="background: rgba(16,185,129,0.1); border-left: 4px solid var(--eid-emerald-light); padding: 1rem; border-radius: 12px; font-weight: 600; color: var(--eid-text-main);">
                            🌙 Syncretic Heritage: Celebrating India's rich culture of shared warmth and hospitality.
                        </div>
                    `);
                }
            });
        });
    };

    // ----------------------------------------------------------------------
    // 3. Global Search & Tab Filter Handlers
    // ----------------------------------------------------------------------

    // Chand Raat Tabs
    document.querySelectorAll('.chandraat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.chandraat-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderChandraat(tab.getAttribute('data-bazaar'));
        });
    });

    // Region Tabs
    document.querySelectorAll('.reg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.reg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRegional(btn.getAttribute('data-reg'));
        });
    });

    // Food Filters
    document.querySelectorAll('.food-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.food-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFoods(btn.getAttribute('data-foodcat'));
        });
    });

    // Global Live Search
    const searchInput = document.getElementById('eid-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchSummary = document.getElementById('search-results-summary');

    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length > 0) {
            clearSearchBtn.style.display = 'block';

            // Filter foods matching query
            const matchingFoods = foodsData.filter(f =>
                f.name.toLowerCase().includes(query) ||
                f.desc.toLowerCase().includes(query) ||
                f.origin.toLowerCase().includes(query)
            );

            // Filter cities matching query
            const matchingCities = citiesData.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.desc.toLowerCase().includes(query) ||
                c.highlights.toLowerCase().includes(query)
            );

            searchSummary.textContent = `Found ${matchingFoods.length} food dishes and ${matchingCities.length} city hubs for "${query}"`;

            // Update foods grid live
            const foodsGrid = document.getElementById('foods-grid');
            if (foodsGrid) {
                foodsGrid.innerHTML = '';
                matchingFoods.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'food-card';
                    card.innerHTML = `
                        <div class="card-img-header">
                            <span class="card-icon-lg">${item.icon}</span>
                        </div>
                        <div class="card-body-content">
                            <h3>${item.name}</h3>
                            <div class="card-subtitle">📍 ${item.origin}</div>
                            <p>${item.desc}</p>
                            <button class="btn-card-action" data-title="${item.name}" data-details="${item.details}">🍲 View Recipe Story</button>
                        </div>
                    `;
                    foodsGrid.appendChild(card);
                });
                attachCardModalListeners();
            }
        } else {
            clearSearchBtn.style.display = 'none';
            searchSummary.textContent = '';
            renderFoods();
        }
    });

    clearSearchBtn?.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchSummary.textContent = '';
        renderFoods();
    });

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
                <h3 style="font-size: 2rem; color: var(--eid-emerald);">🎉 Quiz Completed!</h3>
                <div style="font-size: 3.5rem; font-weight: 800; color: var(--eid-gold); margin: 1rem 0;">${quizScore} / 100</div>
                <p style="font-size: 1.1rem; color: var(--eid-text-muted);">
                    ${quizScore >= 80 ? '🌟 Eid Cultural Scholar! You know India\'s syncretic festive heritage beautifully.' : '👍 Great effort! Explore the Eid traditions above to score 100% next time.'}
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
    // 6. Theme Toggle & Execution Init
    // ----------------------------------------------------------------------

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('eid-theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('eid-theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('eid-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });

    // Page Init Execution
    renderChandraat();
    renderMosques();
    renderRegional();
    renderFoods();
    renderCities();
    renderQuestion();
});

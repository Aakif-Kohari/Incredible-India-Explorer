/* ==========================================================================
   India's Festival of Lights (Diwali) - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Master Data Definitions
    // ----------------------------------------------------------------------

    const rangoliData = [
        {
            name: 'Powder Colored Rangoli',
            region: 'Pan-India Classic',
            icon: '🎨',
            desc: 'Created using finely ground quartz powder, colored chalk, and organic dyes. Features lotus flowers, peacocks, lamps, and geometric symmetry.',
            details: 'Drawn outside home entrances every evening of Diwali to invite Goddess Lakshmi. Earthen oil lamps are placed at the center of the design.'
        },
        {
            name: 'Kolam (Rice Flour Art)',
            region: 'Tamil Nadu & South India',
            icon: '⚪',
            desc: 'Drawn pre-dawn using wet or dry rice powder paste. Features intricate grid-based loops (Sikku Kolam) drawn by hand.',
            details: 'Rice powder serves a dual purpose as a sacred art offering and food for ants and small birds, symbolizing living in harmony with nature.'
        },
        {
            name: 'Alpana (Rice Paste Art)',
            region: 'West Bengal & East India',
            icon: '🖌️',
            desc: 'Hand-painted floor art using a paste of diluted rice flour (Pithe) and water, drawn using fingers or a small piece of cloth.',
            details: 'Features sacred footprints of Goddess Lakshmi, paddy sheaves, lotus motifs, and fish symbols drawn on Kali Puja and Diwali.'
        },
        {
            name: 'Mandana Art',
            region: 'Rajasthan & Madhya Pradesh',
            icon: '🔴',
            desc: 'Traditional wall and floor art painted with red clay (Rati) as the base and white chalk (Rabdudi) for intricate geometric tribal motifs.',
            details: 'Drawings include peacocks, five-pointed stars, and sacred pots (Kalash) to ward off evil and celebrate auspicious festivities.'
        },
        {
            name: 'Sanskar Bharti Rangoli',
            region: 'Maharashtra',
            icon: '🌀',
            desc: 'Large circular mandala-like rangoli designs created using 3 to 5 fingers simultaneously to draw continuous flowing white powder lines.',
            details: 'Often covers entire courtyard floors during Diwali mornings and Pahat music concerts, filled with vibrant shaded powder colors.'
        },
        {
            name: 'Flower Petal Rangoli (Pookkalam style)',
            region: 'Kerala & Modern India',
            icon: '🌸',
            desc: 'Crafted entirely using fresh marigold, rose, jasmine, and chrysanthemum flower petals arranged in concentric circles.',
            details: 'Fragrant and eco-friendly, topped with floating diyas in brass Urlis filled with water.'
        }
    ];

    const regionalData = [
        {
            region: 'north',
            title: 'Ayodhya Deepotsav & Varanasi Dev Deepawali',
            state: 'Uttar Pradesh, Delhi & Punjab',
            icon: '🪔',
            desc: 'North India celebrates Lord Rama\'s return to Ayodhya with millions of lamps. Varanasi celebrates Dev Deepawali 15 days later on Kartik Purnima when gods descend to the Ganga ghats.',
            highlights: 'Ayodhya Saryu riverbank Guinness record lights, Golden Temple Bandi Chhor Divas, Varanasi Ganga Aarti.'
        },
        {
            region: 'west',
            title: 'Maharashtrian Faral & Gujarati New Year',
            state: 'Maharashtra, Gujarat & Goa',
            icon: '🏰',
            desc: 'In Maharashtra, families relish homemade Diwali Faral (Chakli, Karanji) and kids build mud forts (Killas). Gujarat celebrates Chopda Pujan & Bestu Varas (New Year). Goa burns Narakasura effigies.',
            highlights: 'Diwali Faral, Shivaji Park Diwali Pahat musical dawns, Gujarati Chopda Pujan ledgers, Goa Narakasura effigies.'
        },
        {
            region: 'south',
            title: 'Pre-Dawn Abhyanga Snan & Deepavali',
            state: 'Tamil Nadu, Karnataka, AP & Kerala',
            icon: '🌴',
            desc: 'Deepavali is celebrated primarily on Naraka Chaturdashi morning. Families wake before dawn for sesame oil bath (Abhyanga Snan) with Utane, burst crackers in new silk clothes, and eat medicinal Lehyam paste.',
            highlights: 'Pre-dawn herbal oil bath, Deepavali Lehyam, Kolam floor art, new silk Veshti & Sarees.'
        },
        {
            region: 'east',
            title: 'Kolkata Kali Puja & Badabadua Daka',
            state: 'West Bengal & Odisha',
            icon: '🌺',
            desc: 'On Diwali night, Bengal celebrates Kali Puja worshipping Goddess Kali with red hibiscus flowers. In Odisha, families burn jute sticks (Badabadua Daka) calling upon ancestors to descend in light.',
            highlights: 'Kalighat & Dakshineswar Kali Puja pandals, Kosha Mangsho feast, Odisha Badabadua Daka jute flame ritual.'
        }
    ];

    const sweetsData = [
        {
            name: 'Kaju Katli',
            category: 'sweet',
            icon: '💎',
            origin: 'Pan-India Classic',
            desc: 'Diamond-shaped fudge made from ground cashew nuts, sugar, cardamom, and topped with edible silver leaf (Vark).',
            details: 'The premier luxury sweet gifted during Diwali corporate and family visits.'
        },
        {
            name: 'Besan & Motichoor Ladoo',
            category: 'sweet',
            icon: '🟡',
            origin: 'North & Central India',
            desc: 'Spherical golden sweets made from ghee-roasted gram flour (Besan) or tiny fried chickpea flour pearls (Motichoor) infused with saffron.',
            details: 'Offered to Lord Ganesha during Lakshmi-Ganesha Puja.'
        },
        {
            name: 'Chakli & Chivda (Diwali Faral)',
            category: 'faral',
            icon: '🥨',
            origin: 'Maharashtra',
            desc: 'Spiced, crunchy spiral savory made from roasted rice flour, spices, and sesame seeds, paired with flattened rice Chivda.',
            details: 'The centerpiece savory snack of Maharashtra\'s traditional Diwali Faral platter.'
        },
        {
            name: 'Karanji / Gujiya',
            category: 'faral',
            icon: '🥟',
            origin: 'Maharashtra & North India',
            desc: 'Golden fried crescent pastry stuffed with roasted grated coconut, jaggery/sugar, cardamom, nutmeg, and dry fruits.',
            details: 'Known as Karanji in the West and Gujiya in the North.'
        },
        {
            name: 'Adhirasam & Murukku',
            category: 'south',
            icon: '🌾',
            origin: 'Tamil Nadu & South India',
            desc: 'Traditional Deepavali fried donut made from fermented raw rice flour and jaggery syrup, accompanied by crunchy spiral Murukku.',
            details: 'Prepared days in advance for South Indian Deepavali breakfasts.'
        },
        {
            name: 'Gulab Jamun & Rasgulla',
            category: 'sweet',
            icon: '🍨',
            origin: 'Pan-India Favorites',
            desc: 'Soft khoya milk solids fried and soaked in warm rose-saffron syrup, alongside spongy chenna Rasgullas.',
            details: 'Served warm after Diwali family dinner feasts.'
        }
    ];

    const citiesData = [
        {
            name: 'Ayodhya',
            icon: '🪔',
            state: 'Uttar Pradesh',
            highlights: 'Saryu Riverbank Deepotsav, 2 million+ earthen lamps, laser light show.',
            desc: 'Sets Guinness World Records every year as the entire banks of River Saryu glow with millions of handmade diyas.'
        },
        {
            name: 'Varanasi (Kashi)',
            icon: '🕉️',
            state: 'Uttar Pradesh',
            highlights: 'Dev Deepawali on Kartik Purnima, 84 Ganga Ghats illuminations, Maha Aarti.',
            desc: 'Celebrated 15 days after Diwali when gods are believed to descend to bathe in the holy Ganges.'
        },
        {
            name: 'Amritsar',
            icon: '🪯',
            state: 'Punjab',
            highlights: 'Golden Temple Bandi Chhor Divas lights, fireworks, Sarovar reflections.',
            desc: 'The Golden Temple glows like a floating jewel in celebration of Guru Hargobind Ji\'s release from captivity.'
        },
        {
            name: 'Jaipur (Pink City)',
            icon: '🏰',
            state: 'Rajasthan',
            highlights: 'Johari Bazaar market lighting competition, Nahargarh Fort views.',
            desc: 'Entire heritage bazaars are decorated with millions of lights in a famous city-wide illumination competition.'
        },
        {
            name: 'Mumbai & Pune',
            icon: '🏙️',
            state: 'Maharashtra',
            highlights: 'Shivaji Park Diwali Pahat musical dawns, Marine Drive lights, Killa mud fort building.',
            desc: 'Combines morning classical music concerts at sunrise with evening coastal illuminations.'
        },
        {
            name: 'Kolkata',
            icon: '🌺',
            state: 'West Bengal',
            highlights: 'Kalighat & Dakshineswar Kali Puja pandals, electric light gates.',
            desc: 'Celebrates Kali Puja on Diwali night with magnificent illuminated pandals across the city.'
        },
        {
            name: 'Madurai & Chennai',
            icon: '🌴',
            state: 'Tamil Nadu',
            highlights: 'Meenakshi Temple Deepavali morning, T. Nagar shopping, pre-dawn crackers.',
            desc: 'Wakes up before dawn for herbal oil baths and morning silk attire celebrations.'
        }
    ];

    const quizQuestions = [
        {
            question: 'What does the word "Deepavali" literally translate to in Sanskrit?',
            options: ['Festival of Flowers', 'Row of Lights', 'Dance of Joy', 'Harvest Feast'],
            answer: 1,
            explanation: '"Deepavali" comes from Sanskrit words "Deepa" (lamp) and "Avali" (row), meaning a "Row of Lights".'
        },
        {
            question: 'In Maharashtra, what is the traditional collection of homemade sweet and savory snacks served on Diwali called?',
            options: ['Thali', 'Diwali Faral', 'Sadya', 'Wazwan'],
            answer: 1,
            explanation: 'Diwali Faral is the traditional Maharashtrian snack collection including Chakli, Karanji, Shankarapali, Chivda, and Besan Ladoo.'
        },
        {
            question: 'Which city holds the Guinness World Record for lighting over 2 million earthen diyas on the banks of River Saryu?',
            options: ['Jaipur', 'Varanasi', 'Ayodhya', 'Amritsar'],
            answer: 2,
            explanation: 'Ayodhya hosts the annual Deepotsav festival, illuminating the Saryu river ghats with over 2 million clay oil lamps.'
        },
        {
            question: 'In South India, what morning ritual takes place before dawn on Deepavali day?',
            options: ['Kite flying', 'Abhyanga Snan (Sesame Oil Bath)', 'Fasting', 'Boat racing'],
            answer: 1,
            explanation: 'Abhyanga Snan is the traditional pre-dawn sesame oil bath taken with herbal Utane powder before wearing new silk clothes.'
        },
        {
            question: 'What festival do Sikhs celebrate on Diwali day, commemorating Guru Hargobind Ji\'s release from Gwalior Fort?',
            options: ['Baisakhi', 'Bandi Chhor Divas', 'Hola Mohalla', 'Gurpurab'],
            answer: 1,
            explanation: 'Bandi Chhor Divas ("Day of Liberation") commemorates the release of Guru Hargobind Ji and 52 kings from Gwalior Fort in 1619.'
        }
    ];

    // ----------------------------------------------------------------------
    // 2. Render Functions
    // ----------------------------------------------------------------------

    const renderRangoli = () => {
        const grid = document.getElementById('rangoli-grid');
        if (!grid) return;

        grid.innerHTML = '';
        rangoliData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-item animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.name}</h3>
                    <div class="card-subtitle">📍 ${item.region}</div>
                    <p>${item.desc}</p>
                    <button class="btn-card-action" data-title="${item.name}" data-details="${item.details}">🎨 View Art Details</button>
                </div>
            `;
            grid.appendChild(card);
        });

        attachCardModalListeners();
    };

    const renderRegional = (filter = 'all') => {
        const grid = document.getElementById('regional-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const filtered = filter === 'all' ? regionalData : regionalData.filter(i => i.region === filter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-item animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.title}</h3>
                    <div class="card-subtitle">📍 ${item.state}</div>
                    <p>${item.desc}</p>
                    <div style="background: rgba(245,158,11,0.08); padding: 0.75rem; border-radius: 12px; font-size: 0.82rem; font-weight: 600; color: var(--diwali-amber);">
                        ✨ Highlights: ${item.highlights}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    const renderSweets = (filter = 'all') => {
        const grid = document.getElementById('sweets-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const filtered = filter === 'all' ? sweetsData : sweetsData.filter(i => i.category === filter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-item animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.name}</h3>
                    <div class="card-subtitle">📍 ${item.origin}</div>
                    <p>${item.desc}</p>
                    <button class="btn-card-action" data-title="${item.name}" data-details="${item.details}">🍬 View Recipe Details</button>
                </div>
            `;
            grid.appendChild(card);
        });

        attachCardModalListeners();
    };

    const renderCities = () => {
        const grid = document.getElementById('cities-grid');
        if (!grid) return;

        grid.innerHTML = '';
        citiesData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-item animate-on-scroll';
            card.innerHTML = `
                <div class="card-img-header">
                    <span class="card-icon-lg">${item.icon}</span>
                </div>
                <div class="card-body-content">
                    <h3>${item.name}</h3>
                    <div class="card-subtitle">📍 ${item.state}</div>
                    <p>${item.desc}</p>
                    <div style="background: rgba(220,38,38,0.08); padding: 0.75rem; border-radius: 12px; font-size: 0.82rem; font-weight: 600; color: var(--diwali-crimson);">
                        🪔 Lighting Highlights: ${item.highlights}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    const attachCardModalListeners = () => {
        document.querySelectorAll('.btn-card-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                const details = btn.getAttribute('data-details');
                if (title && details) {
                    openModal(`
                        <div style="text-align: center; margin-bottom: 1.5rem;">
                            <span class="section-tagline">Diwali Cultural Spotlight</span>
                            <h2 style="font-size: 1.8rem; margin: 0.5rem 0; color: var(--diwali-gold);">${title}</h2>
                        </div>
                        <div style="font-size: 1.05rem; line-height: 1.7; color: var(--diwali-text-muted); margin-bottom: 1.5rem;">
                            <p>${details}</p>
                        </div>
                        <div style="background: rgba(245,158,11,0.1); border-left: 4px solid var(--diwali-gold); padding: 1rem; border-radius: 12px; font-weight: 600; color: var(--diwali-text-main);">
                            🪔 Festival of Lights: Expressing victory of light over darkness and knowledge over ignorance.
                        </div>
                    `);
                }
            });
        });
    };

    // ----------------------------------------------------------------------
    // 3. Tab & Search Filtering Handlers
    // ----------------------------------------------------------------------

    // Region Tabs
    document.querySelectorAll('.reg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.reg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRegional(btn.getAttribute('data-region'));
        });
    });

    // Sweet Tabs
    document.querySelectorAll('.sweet-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sweet-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSweets(btn.getAttribute('data-sweetcat'));
        });
    });

    // Global Search
    const searchInput = document.getElementById('diwali-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchSummary = document.getElementById('search-results-summary');

    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length > 0) {
            clearSearchBtn.style.display = 'block';

            const matchingSweets = sweetsData.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.desc.toLowerCase().includes(query) ||
                s.origin.toLowerCase().includes(query)
            );

            const matchingCities = citiesData.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.desc.toLowerCase().includes(query)
            );

            searchSummary.textContent = `Found ${matchingSweets.length} sweets/snacks and ${matchingCities.length} city hotspots for "${query}"`;

            const sweetsGrid = document.getElementById('sweets-grid');
            if (sweetsGrid) {
                sweetsGrid.innerHTML = '';
                matchingSweets.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card-item';
                    card.innerHTML = `
                        <div class="card-img-header">
                            <span class="card-icon-lg">${item.icon}</span>
                        </div>
                        <div class="card-body-content">
                            <h3>${item.name}</h3>
                            <div class="card-subtitle">📍 ${item.origin}</div>
                            <p>${item.desc}</p>
                            <button class="btn-card-action" data-title="${item.name}" data-details="${item.details}">🍬 View Recipe Details</button>
                        </div>
                    `;
                    sweetsGrid.appendChild(card);
                });
                attachCardModalListeners();
            }
        } else {
            clearSearchBtn.style.display = 'none';
            searchSummary.textContent = '';
            renderSweets();
        }
    });

    clearSearchBtn?.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchSummary.textContent = '';
        renderSweets();
    });

    // ----------------------------------------------------------------------
    // 4. Educational Quiz Engine
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
                <h3 style="font-size: 2rem; color: var(--diwali-gold);">🎉 Quiz Completed!</h3>
                <div style="font-size: 3.5rem; font-weight: 800; color: var(--diwali-crimson); margin: 1rem 0;">${quizScore} / 100</div>
                <p style="font-size: 1.1rem; color: var(--diwali-text-muted);">
                    ${quizScore >= 80 ? '🌟 Diwali Cultural Master! You know India\'s Festival of Lights inside out.' : '👍 Great effort! Explore the Diwali traditions above to score 100% next time.'}
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
    // 6. Theme Toggle & Page Execution
    // ----------------------------------------------------------------------

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('diwali-theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('diwali-theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('diwali-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });

    // Page Init Execution
    renderRangoli();
    renderRegional();
    renderSweets();
    renderCities();
    renderQuestion();
});

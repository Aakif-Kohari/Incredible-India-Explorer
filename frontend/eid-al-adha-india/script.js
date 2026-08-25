/* ==========================================================================
   Eid al-Adha Across India - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Master Data Definitions
    // ----------------------------------------------------------------------

    const eidgahData = [
        {
            name: 'Jama Masjid & Eidgah Grounds',
            city: 'Old Delhi',
            icon: '🕌',
            capacity: '30,000+ Worshippers',
            desc: 'The historic 17th-century Mughal red sandstone mosque and nearby open Eidgah grounds fill with thousands of congregants in white kurtas.',
            details: 'After prayers, families head to Matia Mahal and Chitli Qabar for fresh hot Khamiri roti, Nihari, and sweet Seviyan.'
        },
        {
            name: 'Mecca Masjid & Eidgah Mir Alam',
            city: 'Hyderabad',
            icon: '🕌',
            capacity: '25,000+ Worshippers',
            desc: 'Mir Alam Eidgah in Hyderabad hosts one of South India\'s largest open-air Eidgah congregations.',
            details: 'Thousands bow together under the morning sky before returning home to prepare Hyderabadi Mutton Biryani and spicy Marag broth.'
        },
        {
            name: 'Taj-ul-Masajid',
            city: 'Bhopal',
            icon: '🕌',
            capacity: '175,000+ Worshippers',
            desc: 'One of Asia\'s largest pink marble and sandstone mosques, hosting magnificent congregational prayers.',
            details: 'Devotees gather in the vast pink courtyard before distributing Qurbani food shares to neighborhood families and orphanages.'
        },
        {
            name: 'Aali Masjid & Srinagar Eidgah',
            city: 'Srinagar, Kashmir',
            icon: '🏔️',
            capacity: '50,000+ Worshippers',
            desc: 'The historic 15th-century wood-and-stone Aali Masjid inside Srinagar\'s historic Eidgah ground.',
            details: 'Surrounded by chinar trees and Himalayan peaks, Kashmiris recite traditional morning Takbeers before family Wazwan feasts.'
        },
        {
            name: 'Nakhoda Mosque & Park Circus Eidgah',
            city: 'Kolkata',
            icon: '🕌',
            capacity: '20,000+ Worshippers',
            desc: 'Kolkata\'s grandest red sandstone mosque in Chitpur where communities gather in total harmony.',
            details: 'Followed by sharing Mutton Rezala and Kolkata Biryani with friends across the city.'
        }
    ];

    const regionalData = [
        {
            region: 'north',
            title: 'Mughal Traditions & Awadhi Feasts',
            state: 'Delhi, Uttar Pradesh & Bihar',
            icon: '🕌',
            desc: 'North India observes traditional Qurbani 3-part charity distribution. Families prepare Awadhi Mutton Rezala, Shami Kebabs, and host evening family gatherings.',
            highlights: 'Jama Masjid prayers, Aminabad food walks, 1/3 needy food distribution, family dasterkhan feasts.'
        },
        {
            region: 'south',
            title: 'Hyderabadi Marag & Malabar Neychoru',
            state: 'Hyderabad, Kerala (Malabar) & Tamil Nadu',
            icon: '🌴',
            desc: 'In Hyderabad, tender Mutton Marag soup and Biryani dominate the menu. In Malabar (Calicut), Ghee Rice (Neychoru) is served with aromatic Mutton Korma.',
            highlights: 'Mir Alam Eidgah prayers, Hyderabadi Marag broth, Malabar Ghee Rice (Neychoru), tender coconut payasam.'
        },
        {
            region: 'east',
            title: 'Kolkata Mutton Rezala & Harmony',
            state: 'West Bengal & Odisha',
            icon: '🎨',
            desc: 'Kolkata households prepare rich Mutton Rezala in white cashew yogurt gravy alongside potato-infused Kolkata Dum Biryani.',
            highlights: 'Zakaria Street food stalls, Kolkata Biryani with boiled eggs, sharing food with non-Muslim neighbors.'
        },
        {
            region: 'west',
            title: 'Bohri Mohalla Feasts & Community Aid',
            state: 'Mumbai & Gujarat',
            icon: '🏙️',
            desc: 'Mumbai\'s Bohri Mohalla and Bhendi Bazaar showcase community thal dining, featuring slow-cooked mutton gravies, Seekh kebabs, and Phirni.',
            highlights: 'Bohri Mohalla community thals, Surat meat kebabs, charitable aid drives across city shelters.'
        },
        {
            region: 'kashmir',
            title: 'Himalayan Prayers & Kashmiri Wazwan',
            state: 'Kashmir Valley',
            icon: '🏔️',
            desc: 'Kashmiris wear traditional embroidered Pherans for Eidgah prayers, followed by family preparation of multi-course Wazwan delicacies like Rista and Gushtaba.',
            highlights: 'Srinagar Eidgah congregation, Kashmiri Kehwa green tea with almonds, Wazwan Rista & Rogan Josh.'
        }
    ];

    const foodsData = [
        {
            name: 'Mutton Dum Biryani',
            category: 'biryani',
            icon: '🍚',
            origin: 'Pan-India Classic',
            desc: 'Fragrant basmati rice layered with spiced tender mutton, fried onions, saffron, and mint, cooked under tight sealed dough (dum).',
            details: 'The centerpiece dish on Eid al-Adha dining dasterkhans across Indian households.'
        },
        {
            name: 'Lucknawi Mutton Rezala',
            category: 'gravy',
            icon: '🍲',
            origin: 'Lucknow, UP & Bengal',
            desc: 'Royal Mughal tender mutton cooked in a rich, white velvety gravy of yogurt, cashew nut paste, poppy seeds, and green cardamom.',
            details: 'A delicate Awadhi royal dish eaten with soft butter naan or roomali roti.'
        },
        {
            name: 'Hyderabadi Mutton Marag',
            category: 'gravy',
            icon: '🥣',
            origin: 'Hyderabad, Telangana',
            desc: 'A rich, thin mutton bone broth soup cooked with tender meat, cashew paste, mint, black pepper, and green chilies.',
            details: 'Served warm as a flavorful starter at Hyderabadi Eid lunches with Naan.'
        },
        {
            name: 'Bhuna Gosht & Shami Kebabs',
            category: 'kebabs',
            icon: '🍢',
            origin: 'North & Central India',
            desc: 'Pan-roasted spiced mutton tossed in caramelized onion gravy alongside smooth, pan-fried minced meat Shami Kebabs.',
            details: 'Served with fresh coriander-mint chutney and onion rings.'
        },
        {
            name: 'Malabar Neychoru (Ghee Rice) & Mutton Korma',
            category: 'biryani',
            icon: '🍛',
            origin: 'Calicut (Kozhikode), Kerala',
            desc: 'Aromatic short-grain Kaima rice cooked in pure desi ghee with whole spices, served alongside rich Malabar mutton gravy.',
            details: 'A signature coastal Kerala Eid lunch served on banana leaves.'
        },
        {
            name: 'Nalli Nihari & Khamiri Roti',
            category: 'gravy',
            icon: '🍖',
            origin: 'Old Delhi & Bhopal',
            desc: 'Overnight slow-cooked shank meat stew with rich bone marrow and aromatic spices, eaten with fluffy tandoori Khamiri bread.',
            details: 'Enjoyed by family members after morning Eidgah prayers.'
        },
        {
            name: 'Seviyan Kheer & Matka Phirni',
            category: 'sweets',
            icon: '🍨',
            origin: 'Pan-India Desserts',
            desc: 'Roasted vermicelli kheer topped with crushed pistachios, almonds, and ground rice Phirni served chilled in unglazed clay pots (matkas).',
            details: 'A refreshing sweet conclusion to heavy savory Eid lunches.'
        }
    ];

    const citiesData = [
        {
            name: 'Old Delhi (Shahjahanabad)',
            icon: '🕌',
            state: 'Delhi',
            highlights: 'Jama Masjid prayers, Matia Mahal food street, 3-part charity distribution drives.',
            desc: 'The historic heart of Mughal India. Streets echo with Takbeer chants before families gather for Biryani and Nihari feasts.'
        },
        {
            name: 'Lucknow (Awadh)',
            icon: '🏰',
            state: 'Uttar Pradesh',
            highlights: 'Tile Wali Masjid, Aminabad food stalls, Lucknawi Rezala & Galouti Kebabs.',
            desc: 'Renowned for royal culinary perfection, Nawabi hospitality, and sharing Eid dishes with neighbors of all faiths.'
        },
        {
            name: 'Hyderabad',
            icon: '💎',
            state: 'Telangana',
            highlights: 'Mir Alam Eidgah, Mecca Masjid, Hyderabadi Mutton Biryani & Marag soup.',
            desc: 'Hosts vast open-air Eidgah congregations followed by world-famous biryani lunches.'
        },
        {
            name: 'Mumbai',
            icon: '🏙️',
            state: 'Maharashtra',
            highlights: 'Bohri Mohalla community thals, Minara Masjid, Bhendi Bazaar street food.',
            desc: 'Blends coastal Maharashtrian warmth with Bohri community dining and philanthropic distribution.'
        },
        {
            name: 'Kolkata',
            icon: '🎨',
            state: 'West Bengal',
            highlights: 'Nakhoda Mosque, Park Circus Eidgah, Kolkata Biryani & Rezala.',
            desc: 'Celebrated with interfaith harmony and sweet Bengali hospitality.'
        },
        {
            name: 'Srinagar',
            icon: '🏔️',
            state: 'Jammu & Kashmir',
            highlights: 'Hazratbal Shrine, Aali Masjid, 36-course Kashmiri Wazwan.',
            desc: 'Tranquil Himalayan morning prayers along Dal Lake followed by Wazwan family banquets.'
        },
        {
            name: 'Kozhikode (Calicut)',
            icon: '🌴',
            state: 'Kerala',
            highlights: 'Kuttichira heritage mosques, Malabar Neychoru ghee rice & Mutton Korma.',
            desc: 'Famous for coastal Malabar warmth and banana-leaf ghee rice feasts.'
        },
        {
            name: 'Bhopal',
            icon: '🏰',
            state: 'Madhya Pradesh',
            highlights: 'Taj-ul-Masajid, Bhopali Mutton Pasanda, Old City bazaars.',
            desc: 'Home to Asia\'s largest pink sandstone mosque courtyard.'
        }
    ];

    const quizQuestions = [
        {
            question: 'What is the mandatory 3-part rule for distributing Qurbani food on Eid al-Adha?',
            options: [
                '1/3 for Needy, 1/3 for Relatives & Neighbors, 1/3 for Household',
                'All 100% kept for family',
                '50% for pets, 50% for shops',
                '1/2 for hotel, 1/2 for school'
            ],
            answer: 0,
            explanation: 'Islamic values mandate dividing food into 3 equal shares: 1/3 for the destitute & poor, 1/3 for relatives & neighbors of all faiths, and 1/3 for the family.'
        },
        {
            question: 'Eid al-Adha coincides with the culmination of which major annual Islamic pilgrimage?',
            options: ['Umrah', 'Hajj in Mecca', 'Ziyarat', 'Urs'],
            answer: 1,
            explanation: 'Eid al-Adha takes place on the 10th day of Dhu al-Hijjah, coinciding with the completion of the annual Hajj pilgrimage in Mecca.'
        },
        {
            question: 'Which aromatic Hyderabadi mutton bone broth soup cooked with cashews & mint is served at Eid al-Adha lunches?',
            options: ['Sambar', 'Hyderabadi Marag', 'Rasam', 'Thukpa'],
            answer: 1,
            explanation: 'Hyderabadi Marag is a rich, peppery tender mutton soup made with bone-in meat, cashew paste, and mint, served warm with Naan.'
        },
        {
            question: 'Which white velvety royalAwadhi mutton curry cooked in yogurt & cashew paste is famous in Lucknow & Kolkata on Eid?',
            options: ['Chicken Butter Masala', 'Mutton Rezala', 'Vindaloo', 'Laal Maas'],
            answer: 1,
            explanation: 'Mutton Rezala is a royal Awadhi dish cooked in a fragrant white gravy of yogurt, cashew paste, poppy seeds, and green cardamom.'
        },
        {
            question: 'Which Kashmiri multi-course royal banquet featuring Rista and Gushtaba is prepared on Eid in Srinagar?',
            options: ['Sadya', 'Wazwan', 'Thali', 'Pithas'],
            answer: 1,
            explanation: 'Kashmiri Wazwan is a legendary 36-course banquet of slow-cooked meat dishes served on giant copper platters (Trami).'
        }
    ];

    // ----------------------------------------------------------------------
    // 2. Render Functions
    // ----------------------------------------------------------------------

    const renderEidgahs = () => {
        const grid = document.getElementById('eidgahs-grid');
        if (!grid) return;

        grid.innerHTML = '';
        eidgahData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-item animate-on-scroll';
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
                    <div style="background: rgba(4,120,87,0.08); padding: 0.75rem; border-radius: 12px; font-size: 0.82rem; font-weight: 600; color: var(--adha-green);">
                        ✨ Highlights: ${item.highlights}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    const renderFoods = (filter = 'all') => {
        const grid = document.getElementById('foods-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const filtered = filter === 'all' ? foodsData : foodsData.filter(i => i.category === filter);

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
                    <button class="btn-card-action" data-title="${item.name}" data-details="${item.details}">🍲 View Recipe Story</button>
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
                    <div style="background: rgba(217,119,6,0.08); padding: 0.75rem; border-radius: 12px; font-size: 0.82rem; font-weight: 600; color: var(--adha-gold);">
                        🕌 Key Eid Landmarks: ${item.highlights}
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
                            <span class="section-tagline">Cultural Spotlight</span>
                            <h2 style="font-size: 1.8rem; margin: 0.5rem 0; color: var(--adha-green);">${title}</h2>
                        </div>
                        <div style="font-size: 1.05rem; line-height: 1.7; color: var(--adha-text-muted); margin-bottom: 1.5rem;">
                            <p>${details}</p>
                        </div>
                        <div style="background: rgba(16,185,129,0.1); border-left: 4px solid var(--adha-emerald-light); padding: 1rem; border-radius: 12px; font-weight: 600; color: var(--adha-text-main);">
                            🌙 Values of Sacrifice: Emphasizing food security, community charity, and interfaith brotherhood.
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
    document.querySelectorAll('.reg-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.reg-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRegional(btn.getAttribute('data-region'));
        });
    });

    // Food Tabs
    document.querySelectorAll('.food-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.food-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFoods(btn.getAttribute('data-foodtype'));
        });
    });

    // Global Search
    const searchInput = document.getElementById('adha-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchSummary = document.getElementById('search-results-summary');

    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length > 0) {
            clearSearchBtn.style.display = 'block';

            const matchingFoods = foodsData.filter(f =>
                f.name.toLowerCase().includes(query) ||
                f.desc.toLowerCase().includes(query) ||
                f.origin.toLowerCase().includes(query)
            );

            const matchingCities = citiesData.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.desc.toLowerCase().includes(query)
            );

            searchSummary.textContent = `Found ${matchingFoods.length} food dishes and ${matchingCities.length} city hubs for "${query}"`;

            const foodsGrid = document.getElementById('foods-grid');
            if (foodsGrid) {
                foodsGrid.innerHTML = '';
                matchingFoods.forEach(item => {
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
                <h3 style="font-size: 2rem; color: var(--adha-green);">🎉 Quiz Completed!</h3>
                <div style="font-size: 3.5rem; font-weight: 800; color: var(--adha-gold); margin: 1rem 0;">${quizScore} / 100</div>
                <p style="font-size: 1.1rem; color: var(--adha-text-muted);">
                    ${quizScore >= 80 ? '🌟 Eid al-Adha Scholar! You understand the spiritual values and subcontinental heritage.' : '👍 Great effort! Rediscover the spiritual values above to score 100% next time.'}
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
    // 6. Theme Toggle & Init Execution
    // ----------------------------------------------------------------------

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('adha-theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('adha-theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('adha-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });

    // Page Init Execution
    renderEidgahs();
    renderRegional();
    renderFoods();
    renderCities();
    renderQuestion();
});

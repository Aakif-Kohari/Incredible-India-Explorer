(() => {
    'use strict';

    const timelineData = [
        {
            year: 1984,
            date: '19 January 1984',
            title: 'Hero Honda Motors is incorporated',
            type: 'company',
            text: "Hero MotoCorp's corporate story begins with the incorporation of Hero Honda Motors Ltd.",
            tags: ['origin', 'company']
        },
        {
            year: 1985,
            date: '13 April 1985',
            title: 'CD100 production begins',
            type: 'motorcycle',
            text: "The first motorcycle, CD100, enters production. Hero's annual report describes its four-stroke engine and value-focused efficiency as key differentiators.",
            tags: ['CD100', 'first motorcycle']
        },
        {
            year: 1985,
            date: '27 May 1985',
            title: 'Official CD100 line-off ceremony',
            type: 'milestone',
            text: 'The product timeline records the official line-off ceremony for the CD100, marking an early manufacturing milestone.',
            tags: ['CD100', 'factory']
        },
        {
            year: 1989,
            date: '21 April 1989',
            title: 'Sleek joins the product story',
            type: 'motorcycle',
            text: "Sleek appears in the company's historical product timeline as the portfolio begins to broaden.",
            tags: ['Sleek', 'product']
        },
        {
            year: 1991,
            date: '20 November 1991',
            title: 'CD100 SS introduced',
            type: 'motorcycle',
            text: 'The CD100 family evolves with the CD100 SS, continuing the commuter-focused product line.',
            tags: ['CD100 SS', 'commuter']
        },
        {
            year: 1994,
            date: '19 January 1994',
            title: 'Splendor launched',
            type: 'motorcycle',
            text: "Splendor enters the timeline and eventually becomes one of the most recognisable names in India's commuter motorcycle market.",
            tags: ['Splendor', 'icon']
        },
        {
            year: 1997,
            date: '23 January 1997',
            title: 'Street arrives',
            type: 'motorcycle',
            text: 'Street is added to the portfolio, reflecting continued experimentation with product formats.',
            tags: ['Street', 'product']
        },
        {
            year: 1999,
            date: '11 February 1999',
            title: 'CBZ makes its debut',
            type: 'motorcycle',
            text: 'CBZ marks an important move toward the performance-oriented end of the motorcycle portfolio.',
            tags: ['CBZ', 'premium']
        },
        {
            year: 2001,
            date: '2001',
            title: 'Passion expands the commuter range',
            type: 'motorcycle',
            text: "Passion becomes part of Hero's long-running commuter story and grows into a familiar Indian motorcycle name.",
            tags: ['Passion', 'commuter']
        },
        {
            year: 2003,
            date: '2003',
            title: 'Karizma launches',
            type: 'motorcycle',
            text: 'Karizma gives Hero a stronger performance and premium identity while expanding the range beyond utility commuting.',
            tags: ['Karizma', 'premium']
        },
        {
            year: 2004,
            date: '2004',
            title: 'Pleasure and a broader scooter strategy',
            type: 'scooter',
            text: "Pleasure becomes a prominent part of Hero's scooter story and broadens the audience beyond motorcycle commuters.",
            tags: ['Pleasure', 'scooter']
        },
        {
            year: 2010,
            date: '2010',
            title: 'Hero and Honda separate',
            type: 'company',
            text: "The former Hero Honda partnership separates, setting the stage for Hero's independent brand and product strategy.",
            tags: ['separation', 'strategy']
        },
        {
            year: 2011,
            date: '9 August 2011',
            title: 'Hero MotoCorp identity unveiled',
            type: 'company',
            text: "Hero unveils its new corporate identity at London's O2 Arena after the separation from Honda.",
            tags: ['Hero MotoCorp', 'brand']
        },
        {
            year: 2014,
            date: '2014',
            title: 'Neemrana manufacturing facility established',
            type: 'manufacturing',
            text: "The Neemrana facility in Rajasthan becomes part of Hero's expanding Indian manufacturing footprint.",
            tags: ['Neemrana', 'Rajasthan']
        },
        {
            year: 2016,
            date: '2016',
            title: 'Centre for Innovation & Technology',
            type: 'rnd',
            text: "Hero's Jaipur R&D ecosystem becomes a central part of its product development capabilities.",
            tags: ['CIT', 'R&D', 'Jaipur']
        },
        {
            year: 2019,
            date: '2019',
            title: 'Hero Tech Center Germany',
            type: 'rnd',
            text: "The Munich-based Hero Tech Center adds an international R&D dimension to the company's technology network.",
            tags: ['Germany', 'R&D']
        },
        {
            year: 2020,
            date: '2020',
            title: 'Xpulse and Xtreme strengthen premium positioning',
            type: 'motorcycle',
            text: 'Xpulse and Xtreme families represent a broader premium and lifestyle-oriented portfolio.',
            tags: ['Xpulse', 'Xtreme', 'premium']
        },
        {
            year: 2021,
            date: '2021',
            title: '100 million milestone era',
            type: 'milestone',
            text: "Hero's 100-million two-wheeler milestone becomes a marker of the scale reached by the brand's manufacturing and retail ecosystem.",
            tags: ['100 million', 'scale']
        },
        {
            year: 2022,
            date: '2022',
            title: 'Xpulse 200 4V and XTEC era',
            type: 'motorcycle',
            text: 'Newer Xpulse, Splendor XTEC and other products bring updated technology to established families.',
            tags: ['Xpulse', 'XTEC', 'technology']
        },
        {
            year: 2023,
            date: '2023',
            title: 'Xoom joins the scooter portfolio',
            type: 'scooter',
            text: "Xoom adds another contemporary scooter name to Hero's expanding product portfolio.",
            tags: ['Xoom', 'scooter']
        },
        {
            year: 2024,
            date: '2024',
            title: 'Global footprint continues to expand',
            type: 'global',
            text: 'Hero continues to operate manufacturing and R&D capabilities across India and international locations.',
            tags: ['global', 'manufacturing']
        },
        {
            year: 2025,
            date: '2025',
            title: 'Next-generation portfolio',
            type: 'motorcycle',
            text: 'The portfolio continues to evolve with newer platforms, larger-capacity motorcycles, scooters and alternative-fuel initiatives.',
            tags: ['future', 'portfolio']
        }
    ];

    const models = [
        {
            name: 'CD100',
            year: 1985,
            type: 'motorcycle',
            era: 'origin',
            description:
                "The first motorcycle in Hero's documented product timeline; its four-stroke engine helped establish the efficiency-focused commuter proposition.",
            facts: ['First motorcycle', '4-stroke', '1985']
        },
        {
            name: 'Splendor',
            year: 1994,
            type: 'motorcycle',
            era: 'icon',
            description:
                'An enduring commuter name whose later generations kept reliability, efficiency and affordability at the centre of the proposition.',
            facts: ['Launched 1994', 'Commuter', 'Iconic']
        },
        {
            name: 'Passion',
            year: 2001,
            type: 'motorcycle',
            era: 'commuter',
            description: 'A long-running commuter family that helped Hero broaden the practical motorcycle portfolio.',
            facts: ['Since 2001', 'Commuter', 'Family']
        },
        {
            name: 'Karizma',
            year: 2003,
            type: 'premium',
            era: 'performance',
            description:
                'A landmark performance-oriented model that helped move Hero into a more premium motorcycle conversation.',
            facts: ['Since 2003', 'Performance', 'Premium']
        },
        {
            name: 'Pleasure',
            year: 2004,
            type: 'scooter',
            era: 'scooter',
            description:
                "A prominent scooter name in Hero's portfolio, helping broaden mobility choices for urban riders.",
            facts: ['Since 2004', 'Scooter', 'Urban']
        },
        {
            name: 'Glamour',
            year: 2005,
            type: 'motorcycle',
            era: 'commuter',
            description:
                'A 125cc-oriented commuter family that added style and features to the practical side of the portfolio.',
            facts: ['125cc class', 'Commuter', 'Family']
        },
        {
            name: 'Xpulse 200',
            year: 2019,
            type: 'premium',
            era: 'adventure',
            description:
                "An adventure-oriented family that represents Hero's move into lifestyle and recreational motorcycling.",
            facts: ['Adventure', '200cc class', 'Premium']
        },
        {
            name: 'Xtreme 160R',
            year: 2020,
            type: 'premium',
            era: 'performance',
            description:
                "A modern performance-oriented motorcycle family positioned beyond Hero's traditional commuter core.",
            facts: ['160cc class', 'Performance', 'Modern']
        },
        {
            name: 'Splendor+ XTEC',
            year: 2022,
            type: 'motorcycle',
            era: 'technology',
            description:
                'The Splendor proposition updated with connected and digital features for contemporary commuters.',
            facts: ['97.2cc', 'XTEC', 'Connected']
        },
        {
            name: 'Xoom',
            year: 2023,
            type: 'scooter',
            era: 'scooter',
            description: "A newer scooter name that demonstrates Hero's continued investment in the scooter segment.",
            facts: ['Scooter', '2023', 'New generation']
        },
        {
            name: 'Karizma XMR',
            year: 2023,
            type: 'premium',
            era: 'performance',
            description:
                'A modern continuation of the Karizma name, bringing the legacy into a contemporary premium motorcycle form.',
            facts: ['210cc class', 'Premium', 'Karizma']
        },
        {
            name: 'Xpulse 200 4V',
            year: 2022,
            type: 'premium',
            era: 'adventure',
            description:
                'A newer Xpulse generation that builds on the adventure-oriented identity with updated hardware and technology.',
            facts: ['199.6cc', '4-valve', 'Adventure']
        }
    ];

    const plants = [
        {
            name: 'Dharuhera',
            location: 'Haryana',
            established: 1984,
            capacity: '2.1M',
            note: "First manufacturing plant; pivotal to Hero's production legacy."
        },
        {
            name: 'Gurugram',
            location: 'Haryana',
            established: 1997,
            capacity: '2.1M',
            note: 'Advanced manufacturing and automation within the Haryana footprint.'
        },
        {
            name: 'Haridwar',
            location: 'Uttarakhand',
            established: 2008,
            capacity: '2.7M',
            note: 'Large-scale facility with sustainability and solar initiatives.'
        },
        {
            name: 'Neemrana',
            location: 'Rajasthan',
            established: 2014,
            capacity: '0.8M',
            note: 'Known as the Garden Factory and home to the Global Parts Centre.'
        },
        {
            name: 'Halol',
            location: 'Gujarat',
            established: 2015,
            capacity: '1.2M',
            note: "Part of Hero's western India manufacturing footprint."
        },
        {
            name: 'Chittoor',
            location: 'Andhra Pradesh',
            established: 2018,
            capacity: '0.4M',
            note: 'Southern India manufacturing presence supporting the wider network.'
        }
    ];

    const questions = [
        {
            question: "Which model was Hero's first motorcycle in the documented product timeline?",
            answers: ['Splendor', 'CD100', 'Karizma', 'Passion'],
            correct: 'CD100'
        },
        {
            question: 'In which year was Splendor launched?',
            answers: ['1985', '1991', '1994', '2001'],
            correct: '1994'
        },
        {
            question: "Which model represents Hero's adventure-oriented portfolio?",
            answers: ['Pleasure', 'Xpulse 200', 'Glamour', 'Street'],
            correct: 'Xpulse 200'
        },
        {
            question: "Where is Hero MotoCorp's Centre for Innovation & Technology located?",
            answers: ['Jaipur', 'Mumbai', 'Pune', 'Chennai'],
            correct: 'Jaipur'
        },
        {
            question: 'Which facility is listed with the highest India annual capacity in the FY2024–25 report?',
            answers: ['Neemrana', 'Haridwar', 'Chittoor', 'Halol'],
            correct: 'Haridwar'
        }
    ];

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const timelineList = $('#timelineList');
    const detailTitle = $('#detailTitle');
    const detailDate = $('#detailDate');
    const detailBody = $('#detailBody');
    const detailTags = $('#detailTags');
    const timelineSearch = $('#timelineSearch');
    const eraFilter = $('#eraFilter');
    const modelGrid = $('#modelGrid');
    const modelCount = $('#modelCount');
    const dialog = $('#modelDialog');
    const dialogContent = $('#dialogContent');

    function eraForYear(year) {
        if (year < 1990) return '1980s';
        if (year < 2000) return '1990s';
        if (year < 2010) return '2000s';
        if (year < 2020) return '2010s';
        return '2020s';
    }

    function renderTimeline() {
        const search = timelineSearch.value.trim().toLowerCase();
        const era = eraFilter.value;
        const visible = timelineData.filter(item => {
            const matchesEra = era === 'all' || eraForYear(item.year) === era;
            const haystack = `${item.year} ${item.title} ${item.text} ${item.tags.join(' ')}`.toLowerCase();
            return matchesEra && (!search || haystack.includes(search));
        });
        timelineList.innerHTML = '';
        if (!visible.length) {
            timelineList.innerHTML =
                '<div class="timeline-item"><div class="timeline-year">—</div><div><h3>No milestones found</h3><p>Try a different year, model or keyword.</p></div></div>';
            return;
        }
        visible.forEach((item, index) => {
            const article = document.createElement('article');
            article.className = 'timeline-item';
            article.dataset.year = item.year;
            article.innerHTML = `<div class="timeline-year">${item.year}</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div><span class="timeline-arrow">›</span>`;
            article.addEventListener('click', () => selectTimeline(item, article));
            timelineList.appendChild(article);
            if (index === 0) selectTimeline(item, article);
        });
    }

    function selectTimeline(item, element) {
        $$('.timeline-item', timelineList).forEach(node => node.classList.remove('active'));
        if (element) element.classList.add('active');
        detailTitle.textContent = item.title;
        detailDate.textContent = item.date;
        detailBody.textContent = item.text;
        detailTags.innerHTML = item.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
    }

    function renderModels(type = 'all') {
        const filtered = type === 'all' ? models : models.filter(model => model.type === type);
        modelCount.textContent = `${filtered.length} models shown`;
        modelGrid.innerHTML = filtered
            .map(
                model => `
      <article class="model-card">
        <div class="model-visual" aria-hidden="true"></div>
        <div class="model-info"><div class="model-meta"><span>${escapeHtml(model.type)}</span><span>${model.year}</span></div><h3>${escapeHtml(model.name)}</h3><p>${escapeHtml(model.description)}</p></div>
        <button class="button secondary model-open" type="button" data-model="${escapeHtml(model.name)}">Open model story</button>
      </article>`
            )
            .join('');
        $$('.model-open', modelGrid).forEach(button =>
            button.addEventListener('click', () => openModel(button.dataset.model))
        );
    }

    function openModel(name) {
        const model = models.find(item => item.name === name);
        if (!model) return;
        dialogContent.innerHTML = `<p class="dialog-kicker">${escapeHtml(model.type)} · ${model.year}</p><h2>${escapeHtml(model.name)}</h2><p class="dialog-copy">${escapeHtml(model.description)}</p><div class="dialog-facts">${model.facts.map(fact => `<div><strong>Fact</strong>${escapeHtml(fact)}</div>`).join('')}</div>`;
        if (typeof dialog.showModal === 'function') dialog.showModal();
    }

    function escapeHtml(value) {
        return String(value).replace(
            /[&<>'"]/g,
            char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]
        );
    }

    function setupFilters() {
        $$('.filter').forEach(button =>
            button.addEventListener('click', () => {
                $$('.filter').forEach(item => item.classList.remove('active'));
                button.classList.add('active');
                renderModels(button.dataset.type);
            })
        );
    }

    function setupTheme() {
        const toggle = $('#themeToggle');
        const saved = localStorage.getItem('iie-hero-theme');
        if (saved === 'light') document.body.classList.add('light');
        updateThemeLabel();
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light');
            localStorage.setItem('iie-hero-theme', document.body.classList.contains('light') ? 'light' : 'dark');
            toggle.setAttribute('aria-pressed', String(document.body.classList.contains('light')));
            updateThemeLabel();
        });
    }

    function updateThemeLabel() {
        $('#themeToggle').textContent = document.body.classList.contains('light') ? 'Dark mode' : 'Light mode';
    }

    function setupRandomModel() {
        $('#randomModel').addEventListener('click', () => {
            const model = models[Math.floor(Math.random() * models.length)];
            document.querySelector('#models').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => openModel(model.name), 350);
        });
    }

    function setupDialog() {
        $('#dialogClose').addEventListener('click', () => dialog.close());
        dialog.addEventListener('click', event => {
            if (event.target === dialog) dialog.close();
        });
    }

    function renderPlants() {
        $('#plantGrid').innerHTML = plants
            .map(
                plant =>
                    `<article class="plant"><h3>${escapeHtml(plant.name)}</h3><div class="location">${escapeHtml(plant.location)} · Estd. ${plant.established}</div><div class="capacity">${escapeHtml(plant.capacity)} <small>annual capacity</small></div><p>${escapeHtml(plant.note)}</p></article>`
            )
            .join('');
    }

    let quizIndex = 0;
    let quizLocked = false;

    function renderQuiz() {
        const quiz = questions[quizIndex];
        quizLocked = false;
        $('#quizQuestion').textContent = quiz.question;
        $('#quizResult').textContent = '';
        $('#quizOptions').innerHTML = quiz.answers
            .map(answer => `<button type="button" data-answer="${escapeHtml(answer)}">${escapeHtml(answer)}</button>`)
            .join('');
        $$('#quizOptions button').forEach(button =>
            button.addEventListener('click', () => answerQuiz(button.dataset.answer))
        );
    }

    function answerQuiz(answer) {
        if (quizLocked) return;
        quizLocked = true;
        const correct = questions[quizIndex].correct;
        const result = $('#quizResult');
        if (answer === correct) result.textContent = 'Correct — nice memory!';
        else result.textContent = `Not quite. The answer is ${correct}.`;
    }

    function setupQuiz() {
        renderQuiz();
        $('#nextQuestion').addEventListener('click', () => {
            quizIndex = (quizIndex + 1) % questions.length;
            renderQuiz();
        });
    }

    function setupSearch() {
        timelineSearch.addEventListener('input', renderTimeline);
        eraFilter.addEventListener('change', renderTimeline);
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', event => {
            if (event.key === '/' && document.activeElement !== timelineSearch) {
                event.preventDefault();
                timelineSearch.focus();
            }
            if (event.key === 'Escape' && dialog.open) dialog.close();
        });
    }

    function setupReveal() {
        const targets = $$('.section, .stats, .model-card, .plant, .evolution-track article');
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );
        targets.forEach(target => {
            target.style.opacity = '0';
            target.style.transform = 'translateY(12px)';
            target.style.transition = 'opacity .55s ease, transform .55s ease';
            observer.observe(target);
        });
    }

    function init() {
        renderTimeline();
        renderModels();
        renderPlants();
        setupFilters();
        setupTheme();
        setupRandomModel();
        setupDialog();
        setupQuiz();
        setupSearch();
        setupKeyboardShortcuts();
        setupReveal();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

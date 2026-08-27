(() => {
    'use strict';

    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const timelineSearch = document.getElementById('timelineSearch');
    const timelineFilters = document.getElementById('timelineFilters');
    const timelineItems = [...document.querySelectorAll('.timeline-item')];
    const timelineEmpty = document.getElementById('timelineEmpty');
    const productControls = document.getElementById('productControls');
    const productCards = [...document.querySelectorAll('.product-card')];
    const modal = document.getElementById('detailModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalKicker = document.getElementById('modalKicker');
    const modalDescription = document.getElementById('modalDescription');
    const modalFacts = document.getElementById('modalFacts');
    const randomButton = document.getElementById('openRandomMilestone');

    const productStories = {
        xl100: {
            kicker: 'UTILITY • HERITAGE',
            title: 'TVS XL100',
            description:
                'The XL100 carries the practical moped idea into a modern four-stroke product. Its story is less about peak performance and more about utility, simplicity and dependable everyday transport.',
            facts: [
                ['Heritage', 'Continuation of the TVS XL utility line'],
                ['Engine', '99.7 cc four-stroke platform'],
                ['Character', 'Multi-utility and practical'],
                ['Story', 'Modern expression of a long moped legacy']
            ]
        },
        jupiter: {
            kicker: 'SCOOTER • EVERYDAY',
            title: 'TVS Jupiter',
            description:
                "Jupiter represents the everyday scooter side of the TVS portfolio. Its development reflects the company's focus on convenient urban mobility, practicality and a broad customer base.",
            facts: [
                ['Launch', '2013'],
                ['Category', 'Family scooter'],
                ['Focus', 'Everyday urban mobility'],
                ['Evolution', 'Expanded through multiple generations']
            ]
        },
        ntorq: {
            kicker: 'SCOOTER • CONNECTED',
            title: 'TVS NTORQ',
            description:
                'NTORQ brought a sportier, connected character to the scooter portfolio. It shows how TVS combined digital features with a more performance-oriented scooter identity.',
            facts: [
                ['Launch', '2018'],
                ['Category', 'Sporty connected scooter'],
                ['Theme', 'Technology plus everyday mobility'],
                ['Position', 'Youthful and performance-led']
            ]
        },
        radeon: {
            kicker: 'MOTORCYCLE • COMMUTER',
            title: 'TVS Radeon',
            description:
                'Radeon extends the commuter motorcycle portfolio with a product designed around accessible everyday riding, comfort and utility.',
            facts: [
                ['Launch', '2018'],
                ['Category', 'Commuter motorcycle'],
                ['Focus', 'Practical everyday riding'],
                ['Portfolio role', 'Broadens TVS commuter choice']
            ]
        },
        rtr: {
            kicker: 'MOTORCYCLE • PERFORMANCE',
            title: 'TVS Apache RTR',
            description:
                "The Apache RTR family is a central expression of TVS Racing's track-to-road philosophy. Performance development, rider feedback and race engineering influence the street-bike experience.",
            facts: [
                ['Family', 'Apache performance range'],
                ['Origin', 'Apache story begins in 2005'],
                ['Philosophy', 'Track to road'],
                ['Character', 'Street performance']
            ]
        },
        rr310: {
            kicker: 'MOTORCYCLE • TRACK-INSPIRED',
            title: 'TVS Apache RR 310',
            description:
                "The RR 310 raises the Apache family into premium fully-faired performance territory. It also provides a road-going platform closely connected to TVS's race development ecosystem.",
            facts: [
                ['Launch', '2017'],
                ['Category', 'Premium fully-faired motorcycle'],
                ['Theme', 'Race-derived performance'],
                ['Racing', 'Used as a basis for competition development']
            ]
        }
    };

    let activeTimelineFilter = 'all';
    let activeProductFilter = 'all';

    const savedTheme = window.localStorage.getItem('tvs-explorer-theme');

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }

    function updateThemeLabel() {
        const isLight = body.classList.contains('light-theme');
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
        window.localStorage.setItem('tvs-explorer-theme', theme);
        updateThemeLabel();
    });

    updateThemeLabel();

    function normalise(value) {
        return value.toLowerCase().trim();
    }

    function itemMatchesFilter(item) {
        if (activeTimelineFilter === 'all') {
            return true;
        }

        return item.dataset.category.split(' ').includes(activeTimelineFilter);
    }

    function itemMatchesSearch(item) {
        const query = normalise(timelineSearch.value);

        if (!query) {
            return true;
        }

        const searchableText = normalise(`${item.dataset.search} ${item.textContent}`);

        return searchableText.includes(query);
    }

    function refreshTimeline() {
        let visibleCount = 0;

        timelineItems.forEach(item => {
            const visible = itemMatchesFilter(item) && itemMatchesSearch(item);

            item.hidden = !visible;

            if (!visible) {
                item.classList.remove('open');
                const trigger = item.querySelector('.timeline-trigger');
                trigger.setAttribute('aria-expanded', 'false');
            }

            if (visible) {
                visibleCount += 1;
            }
        });

        timelineEmpty.hidden = visibleCount !== 0;
    }

    timelineFilters.addEventListener('click', event => {
        const button = event.target.closest('[data-filter]');

        if (!button) {
            return;
        }

        activeTimelineFilter = button.dataset.filter;

        timelineFilters.querySelectorAll('[data-filter]').forEach(filterButton => {
            filterButton.classList.toggle('active', filterButton === button);
        });

        refreshTimeline();
    });

    timelineSearch.addEventListener('input', refreshTimeline);

    timelineItems.forEach(item => {
        const trigger = item.querySelector('.timeline-trigger');

        trigger.addEventListener('click', () => {
            const willOpen = !item.classList.contains('open');

            timelineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.timeline-trigger').setAttribute('aria-expanded', 'false');
                }
            });

            item.classList.toggle('open', willOpen);
            trigger.setAttribute('aria-expanded', String(willOpen));
        });
    });

    function refreshProducts() {
        productCards.forEach(card => {
            const category = card.dataset.productCategory.split(' ');
            const visible = activeProductFilter === 'all' || category.includes(activeProductFilter);

            card.classList.toggle('hidden', !visible);
        });
    }

    productControls.addEventListener('click', event => {
        const button = event.target.closest('[data-product-filter]');

        if (!button) {
            return;
        }

        activeProductFilter = button.dataset.productFilter;

        productControls.querySelectorAll('[data-product-filter]').forEach(filterButton => {
            filterButton.classList.toggle('active', filterButton === button);
        });

        refreshProducts();
    });

    function openProductModal(productId) {
        const story = productStories[productId];

        if (!story) {
            return;
        }

        modalKicker.textContent = story.kicker;
        modalTitle.textContent = story.title;
        modalDescription.textContent = story.description;
        modalFacts.innerHTML = '';

        story.facts.forEach(([label, value]) => {
            const fact = document.createElement('div');
            fact.className = 'modal-fact';

            const factLabel = document.createElement('strong');
            factLabel.textContent = label;

            const factValue = document.createElement('span');
            factValue.textContent = value;

            fact.append(factLabel, factValue);
            modalFacts.appendChild(fact);
        });

        modal.hidden = false;
        body.classList.add('modal-open');
        modalClose.focus();
    }

    function closeModal() {
        modal.hidden = true;
        body.classList.remove('modal-open');
    }

    document.querySelectorAll('.product-detail-button').forEach(button => {
        button.addEventListener('click', () => {
            openProductModal(button.dataset.product);
        });
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    function chooseRandomMilestone() {
        const visibleItems = timelineItems.filter(item => !item.hidden);

        if (!visibleItems.length) {
            activeTimelineFilter = 'all';
            timelineSearch.value = '';
            timelineFilters.querySelectorAll('[data-filter]').forEach(button => {
                button.classList.toggle('active', button.dataset.filter === 'all');
            });
            refreshTimeline();
            return;
        }

        const chosen = visibleItems[Math.floor(Math.random() * visibleItems.length)];

        timelineItems.forEach(item => {
            item.classList.remove('open');
            item.querySelector('.timeline-trigger').setAttribute('aria-expanded', 'false');
        });

        chosen.classList.add('open');
        chosen.querySelector('.timeline-trigger').setAttribute('aria-expanded', 'true');

        chosen.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    randomButton.addEventListener('click', chooseRandomMilestone);

    const sections = [...document.querySelectorAll('main section[id]')];
    const navigationLinks = [...document.querySelectorAll('.main-nav a')];

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) {
                    return;
                }

                navigationLinks.forEach(link => {
                    const active = link.getAttribute('href') === `#${visible.target.id}`;
                    link.toggleAttribute('aria-current', active);
                });
            },
            {
                rootMargin: '-35% 0px -55% 0px',
                threshold: [0.05, 0.2, 0.5]
            }
        );

        sections.forEach(section => observer.observe(section));
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const id = link.getAttribute('href');

            if (id === '#') {
                return;
            }

            const target = document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });

    refreshTimeline();
    refreshProducts();
})();

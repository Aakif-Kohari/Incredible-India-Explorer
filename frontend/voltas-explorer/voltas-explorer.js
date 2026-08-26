const timelineData = [
    {
        year: 1954,
        era: '1950s',
        title: 'Voltas is established',
        category: 'Origin',
        description:
            'Voltas is established through a collaboration involving Tata Sons and Volkart Brothers, creating an Indian engineering business at a time of rapid industrial development.',
        tags: ['origin', 'engineering', 'Tata Group']
    },
    {
        year: 1958,
        era: '1950s',
        title: 'Thermal engineering becomes a core capability',
        category: 'Engineering',
        description:
            "The company's early identity is closely tied to engineering and thermal systems, creating the technical base for later air-conditioning and refrigeration work.",
        tags: ['thermal', 'engineering']
    },
    {
        year: 1970,
        era: '1970s',
        title: 'Cooling moves deeper into commercial life',
        category: 'Cooling',
        description:
            "Air-conditioning and refrigeration applications become increasingly important across commercial and institutional environments as India's built environment expands.",
        tags: ['HVAC', 'commercial', 'refrigeration']
    },
    {
        year: 1978,
        era: '1970s',
        title: 'HVAC project capability expands',
        category: 'Engineering',
        description:
            'Building-services work links cooling equipment with larger electro-mechanical systems, making engineering delivery as important as individual machines.',
        tags: ['HVAC', 'projects', 'electro-mechanical']
    },
    {
        year: 1990,
        era: '1990s',
        title: 'Consumer cooling becomes a defining identity',
        category: 'Product',
        description:
            'Voltas becomes strongly associated with air-conditioning and practical climate-control products as room cooling becomes more visible in Indian homes and businesses.',
        tags: ['air conditioning', 'consumer', 'comfort']
    },
    {
        year: 1995,
        era: '1990s',
        title: 'Service becomes part of the product experience',
        category: 'Service',
        description:
            'The cooling business increasingly depends on installation, maintenance and lifecycle support, connecting engineering expertise with everyday customer experience.',
        tags: ['service', 'maintenance', 'customer']
    },
    {
        year: 2001,
        era: '2000s',
        title: 'Cooling portfolio broadens',
        category: 'Product',
        description:
            'Voltas continues developing cooling and refrigeration offerings while retaining project and engineering capabilities for commercial and industrial applications.',
        tags: ['refrigeration', 'air conditioning', 'projects']
    },
    {
        year: 2008,
        era: '2000s',
        title: 'International engineering work remains important',
        category: 'Engineering',
        description:
            "Engineering and project capabilities support work in multiple markets, demonstrating how the company's heritage extends beyond consumer appliances.",
        tags: ['international', 'EPC', 'engineering']
    },
    {
        year: 2010,
        era: '2010s',
        title: 'Energy efficiency changes the cooling conversation',
        category: 'Technology',
        description:
            'Efficiency becomes a central product consideration as consumers and businesses increasingly evaluate cooling equipment through energy use as well as comfort.',
        tags: ['efficiency', 'energy', 'technology']
    },
    {
        year: 2015,
        era: '2010s',
        title: 'Voltas Beko enters the appliance story',
        category: 'Partnership',
        description:
            'The Voltas Beko joint venture expands the broader consumer-appliance portfolio and connects Voltas with a wider home-appliance ecosystem.',
        tags: ['Voltas Beko', 'appliances', 'partnership']
    },
    {
        year: 2019,
        era: '2010s',
        title: 'Connected and inverter-led cooling grows',
        category: 'Technology',
        description:
            'Modern room air-conditioner categories increasingly emphasize inverter operation, efficiency, controls and comfort management.',
        tags: ['inverter', 'smart', 'efficiency']
    },
    {
        year: 2020,
        era: '2020s',
        title: 'Climate comfort becomes a resilience issue',
        category: 'Context',
        description:
            'Changing heat patterns and indoor-air expectations make cooling technology part of a wider conversation about comfort, productivity and resilience.',
        tags: ['climate', 'comfort', 'resilience']
    },
    {
        year: 2022,
        era: '2020s',
        title: 'Efficiency and refrigerant choices matter more',
        category: 'Technology',
        description:
            'Cooling products increasingly balance performance with energy efficiency, refrigerant considerations and long-term operating cost.',
        tags: ['refrigerants', 'efficiency', 'sustainability']
    },
    {
        year: 2024,
        era: '2020s',
        title: 'The cooling portfolio serves multiple environments',
        category: 'Product',
        description:
            'The modern portfolio spans residential comfort, commercial cooling and broader engineering requirements, preserving the link between consumer products and technical heritage.',
        tags: ['residential', 'commercial', 'engineering']
    }
];

const productData = [
    {
        category: 'air-conditioning',
        icon: 'AC',
        title: 'Room air conditioners',
        description:
            'Cooling solutions for residential and small commercial spaces, including modern inverter-oriented categories.',
        note: 'Comfort · efficiency · control'
    },
    {
        category: 'air-conditioning',
        icon: 'HV',
        title: 'Commercial HVAC',
        description:
            'Air-conditioning systems and engineering services for buildings, institutions and commercial environments.',
        note: 'Buildings · systems · lifecycle'
    },
    {
        category: 'refrigeration',
        icon: 'RF',
        title: 'Refrigeration systems',
        description:
            'Cooling technologies designed for applications where temperature management and reliable operation are essential.',
        note: 'Thermal control · reliability'
    },
    {
        category: 'air-cooling',
        icon: 'CL',
        title: 'Air coolers',
        description:
            'Air-cooling products suited to situations where evaporative cooling is an appropriate alternative to compressor-based AC.',
        note: 'Airflow · practical cooling'
    },
    {
        category: 'engineering',
        icon: 'EP',
        title: 'Engineering projects',
        description:
            'Electro-mechanical and project capabilities that connect HVAC with wider building and industrial systems.',
        note: 'EPC · integration · delivery'
    },
    {
        category: 'engineering',
        icon: 'SV',
        title: 'Service support',
        description:
            'Installation, maintenance and lifecycle services that keep cooling systems operating effectively.',
        note: 'Installation · maintenance'
    },
    {
        category: 'refrigeration',
        icon: 'TC',
        title: 'Thermal systems',
        description:
            "Thermal engineering is part of the company's long-running technical heritage and supports diverse cooling applications.",
        note: 'Thermal science · engineering'
    },
    {
        category: 'air-conditioning',
        icon: 'IN',
        title: 'Inverter cooling',
        description:
            'Modern air-conditioning categories that modulate capacity to improve comfort and support more efficient operation.',
        note: 'Variable capacity · efficiency'
    }
];

export function normalizeText(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase();
}

export function filterTimeline(items, era = 'all', search = '') {
    const normalizedSearch = normalizeText(search);

    return items.filter(item => {
        const eraMatch = era === 'all' || item.era === era;
        const haystack = normalizeText(
            [item.year, item.era, item.title, item.category, item.description, ...(item.tags || [])].join(' ')
        );

        return eraMatch && (!normalizedSearch || haystack.includes(normalizedSearch));
    });
}

export function filterProducts(items, category = 'all') {
    return items.filter(item => category === 'all' || item.category === category);
}

function createTimelineItem(item, index) {
    const li = document.createElement('li');
    li.className = 'timeline-item';
    li.dataset.index = String(index);

    const year = document.createElement('div');
    year.className = 'timeline-year';
    year.textContent = item.year;

    const marker = document.createElement('span');
    marker.className = 'timeline-marker';
    marker.setAttribute('aria-hidden', 'true');

    const content = document.createElement('article');
    content.className = 'timeline-content';

    const heading = document.createElement('h3');
    heading.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    const tags = document.createElement('div');
    tags.className = 'timeline-tags';

    item.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'timeline-tag';
        tagElement.textContent = tag;
        tags.appendChild(tagElement);
    });

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'timeline-open';
    button.textContent = 'Open milestone →';
    button.dataset.timelineIndex = String(index);

    content.append(heading, description, tags, button);
    li.append(year, marker, content);

    return li;
}

function renderTimeline(items) {
    const list = document.querySelector('#timeline-list');
    const status = document.querySelector('#timeline-status');

    if (!list || !status) {
        return;
    }

    list.replaceChildren();

    if (!items.length) {
        const empty = document.createElement('li');
        empty.className = 'timeline-empty';
        empty.textContent = 'No milestones match this filter. Try another era or search term.';
        list.appendChild(empty);
        status.textContent = 'No timeline milestones found.';
        return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const originalIndex = timelineData.indexOf(item);
        fragment.appendChild(createTimelineItem(item, originalIndex));
    });

    list.appendChild(fragment);
    status.textContent = `${items.length} timeline milestone${items.length === 1 ? '' : 's'} shown.`;
}

function createProductCard(item) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.category = item.category;

    const icon = document.createElement('span');
    icon.className = 'product-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = item.icon;

    const title = document.createElement('h3');
    title.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    const note = document.createElement('small');
    note.textContent = item.note;

    article.append(icon, title, description, note);
    return article;
}

export function renderProducts(items, container) {
    if (!container) {
        return;
    }

    container.replaceChildren();

    const fragment = document.createDocumentFragment();
    items.forEach(item => fragment.appendChild(createProductCard(item)));
    container.appendChild(fragment);
}

function updatePressedButtons(selector, activeValue, dataKey) {
    document.querySelectorAll(selector).forEach(button => {
        const isActive = button.dataset[dataKey] === activeValue;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function setupTimelineFilters() {
    const search = document.querySelector('#timeline-search');
    let selectedEra = 'all';

    const update = () => {
        renderTimeline(filterTimeline(timelineData, selectedEra, search?.value || ''));
    };

    document.querySelectorAll('[data-era]').forEach(button => {
        button.addEventListener('click', () => {
            selectedEra = button.dataset.era || 'all';
            updatePressedButtons('#timeline-filters [data-era]', selectedEra, 'era');
            update();
        });
    });

    search?.addEventListener('input', update);
    update();
}

function setupProductFilters() {
    const grid = document.querySelector('#product-grid');
    let selectedCategory = 'all';

    const update = () => {
        renderProducts(filterProducts(productData, selectedCategory), grid);
    };

    document.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', () => {
            selectedCategory = button.dataset.category || 'all';
            updatePressedButtons('.product-controls [data-category]', selectedCategory, 'category');
            update();
        });
    });

    update();
}

function setupTimelineDialog() {
    const dialog = document.querySelector('#timeline-dialog');
    const title = document.querySelector('#dialog-title');
    const description = document.querySelector('#dialog-description');
    const era = document.querySelector('#dialog-era');
    const category = document.querySelector('#dialog-category');
    const year = document.querySelector('#dialog-year');
    const close = document.querySelector('#dialog-close');

    if (!dialog || !title || !description || !era || !category || !year) {
        return;
    }

    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const button = target.closest('[data-timeline-index]');
        if (!button) {
            return;
        }

        const index = Number(button.dataset.timelineIndex);
        const item = timelineData[index];

        if (!item) {
            return;
        }

        title.textContent = item.title;
        description.textContent = item.description;
        era.textContent = `${item.era} / ${item.category}`;
        category.textContent = item.tags.join(' · ');
        year.textContent = String(item.year);

        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            dialog.setAttribute('open', '');
        }
    });

    close?.addEventListener('click', () => {
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }
    });

    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            if (typeof dialog.close === 'function') {
                dialog.close();
            }
        }
    });
}

function setupGuidedTour() {
    const button = document.querySelector('#start-tour');
    if (!button) {
        return;
    }

    const sections = ['#overview', '#timeline', '#products', '#engineering', '#sources'];

    let current = 0;

    button.addEventListener('click', () => {
        const target = document.querySelector(sections[current]);

        if (target) {
            target.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start'
            });
        }

        current = (current + 1) % sections.length;
        button.textContent = current === 0 ? 'Restart guided tour' : 'Next section →';
    });
}

export function initVoltasExplorer() {
    setupTimelineFilters();
    setupProductFilters();
    setupTimelineDialog();
    setupGuidedTour();
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVoltasExplorer, {
            once: true
        });
    } else {
        initVoltasExplorer();
    }
}

export { productData, timelineData };

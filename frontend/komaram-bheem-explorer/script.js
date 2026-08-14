(() => {
    const timeline = [
        [
            'Early life',
            "Komaram Bheem's early years were rooted in the Gond communities of the Adilabad region, where forests and land were central to everyday life."
        ],
        [
            'Growing resistance',
            'Experiences of exploitation and restrictions affecting tribal livelihoods helped shape a wider resistance to outside control.'
        ],
        [
            'Leadership',
            'Bheem emerged as a local leader and organised resistance around community dignity, customary rights and access to natural resources.'
        ],
        [
            'Forest and land struggle',
            'The movement is remembered for challenging systems that interfered with traditional relationships with forests, cultivation and land.'
        ],
        [
            'Martyrdom',
            'Bheem was killed during the conflict. Accounts differ on precise details, so this explorer avoids presenting disputed specifics as settled fact.'
        ],
        [
            'Enduring legacy',
            'His memory continues through public commemorations, cultural works and discussions of tribal rights in Telangana.'
        ]
    ];
    const resistance = [
        [
            '🌳',
            'Forest access',
            'Forests provided food, fuel, materials and cultural meaning. Restrictions could directly affect community livelihoods.'
        ],
        [
            '🌾',
            'Land and cultivation',
            'Land was tied to household security and customary use. Resistance included opposition to coercive control and displacement.'
        ],
        [
            '⚖️',
            'Community dignity',
            'The struggle is remembered as a demand for respect, self-determination and fair treatment of tribal communities.'
        ],
        [
            '🛡️',
            'Collective resistance',
            "Bheem's leadership became a symbol of organising communities around shared interests rather than isolated grievances."
        ],
        [
            '💧',
            'Water and livelihood',
            'Water is part of the broader natural-resource framework represented by the phrase Jal, Jangal, Zameen.'
        ],
        [
            '📚',
            'Historical memory',
            'Later commemorations have made Bheem an important figure in the public history of tribal resistance.'
        ]
    ];
    const pillars = [
        [
            'jal',
            '💧',
            'Jal',
            'Water',
            'Water sustains households, agriculture, livestock and community life. In the three-part expression, Jal represents access to and stewardship of essential natural resources.'
        ],
        [
            'jangal',
            '🌳',
            'Jangal',
            'Forest',
            'Forests were central to food, materials, medicine, culture and livelihood. Jangal expresses the demand to preserve community relationships with forest resources.'
        ],
        [
            'zameen',
            '🌾',
            'Zameen',
            'Land',
            'Land represents home, cultivation, livelihood and continuity. Zameen captures the demand for security and recognition of customary relationships with ancestral land.'
        ]
    ];
    const legacy = [
        [
            '🗿',
            'Public remembrance',
            "Memorials, statues and commemorative spaces keep Bheem's story visible in Telangana."
        ],
        [
            '🎭',
            'Popular culture',
            'His life has been represented in literature, theatre, cinema and other cultural forms, bringing the story to new audiences.'
        ],
        [
            '🌱',
            'Tribal rights discourse',
            'His name is frequently connected with conversations about community control over natural resources and dignity.'
        ],
        [
            '🧭',
            'Regional identity',
            "Komaram Bheem remains an important figure in the historical and cultural identity of Telangana's tribal communities."
        ]
    ];
    const references = [
        [
            'Government of Telangana',
            'Use official Telangana cultural, tribal welfare and district resources for current commemorative information.'
        ],
        [
            'Tribal Research Institute / academic sources',
            'Consult institutional research on Gond communities, tribal movements and the Hyderabad State period.'
        ],
        [
            'Ministry of Tribal Affairs, Government of India',
            'Useful starting point for national context on tribal rights, communities and policy history.'
        ],
        [
            'Archives and scholarly histories',
            'Cross-check dates, locations and event details against archival or peer-reviewed historical sources before extending the timeline.'
        ]
    ];
    const gallery = [
        ['🌳', 'Forest landscape', 'Visual metaphor for the forest communities central to the story.'],
        ['💧', 'Water and community', 'The water dimension of the three-part rights framework.'],
        ['🌾', 'Land and livelihood', 'The land dimension of the struggle and community continuity.'],
        ['🛡️', 'Resistance and memory', 'A symbolic visual for collective resistance and remembrance.']
    ];

    const renderCards = (id, items) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = items
            .map(
                ([icon, title, text]) =>
                    `<article class="kb-card"><div class="icon" aria-hidden="true">${icon}</div><h3>${title}</h3><p>${text}</p></article>`
            )
            .join('');
    };
    const timelineEl = document.getElementById('timeline-list');
    if (timelineEl)
        timelineEl.innerHTML = timeline
            .map(
                ([year, text], i) =>
                    `<article class="kb-event"><time>Chapter ${i + 1}</time><h3>${year}</h3><p>${text}</p></article>`
            )
            .join('');
    renderCards('resistance-grid', resistance);
    renderCards('legacy-grid', legacy);
    renderCards('references-grid', references);

    const galleryEl = document.getElementById('gallery-grid');
    if (galleryEl)
        galleryEl.innerHTML = gallery
            .map(
                ([icon, title, text]) =>
                    `<article class="kb-gallery-card"><div class="visual" aria-hidden="true">${icon}</div><div><h3>${title}</h3><p>${text}</p></div></article>`
            )
            .join('');

    const pillarsEl = document.getElementById('pillars');
    const detailEl = document.getElementById('pillar-detail');
    const showPillar = key => {
        const p = pillars.find(x => x[0] === key) || pillars[0];
        document
            .querySelectorAll('.kb-pillar')
            .forEach(btn => btn.classList.toggle('active', btn.dataset.key === p[0]));
        detailEl.innerHTML = `<h3>${p[1]} ${p[2]} — ${p[3]}</h3><p>${p[4]}</p>`;
    };
    if (pillarsEl) {
        pillarsEl.innerHTML = pillars
            .map(
                p =>
                    `<button class="kb-pillar" type="button" data-key="${p[0]}" aria-label="Explore ${p[2]}"><strong>${p[1]}</strong><span>${p[2]} · ${p[3]}</span></button>`
            )
            .join('');
        pillarsEl
            .querySelectorAll('.kb-pillar')
            .forEach(btn => btn.addEventListener('click', () => showPillar(btn.dataset.key)));
        showPillar('jal');
    }

    const menu = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-menu');
    if (menu && nav) menu.addEventListener('click', () => nav.classList.toggle('active'));

    document.querySelectorAll('.kb-section-nav a').forEach(a =>
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        })
    );
})();

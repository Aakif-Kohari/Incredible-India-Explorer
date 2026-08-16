(() => {
    const steps = [
        [
            '01',
            'Prepare the pigment',
            'Castor oil and pigments are worked into a thick, elastic paste suitable for drawing.'
        ],
        [
            '02',
            'Condition the paste',
            'The material is cooled and handled until it reaches a dense workable consistency.'
        ],
        [
            '03',
            'Draw with a stylus',
            'An artisan places and pulls the paste across cloth to create fine lines, dots and forms.'
        ],
        [
            '04',
            'Build the composition',
            'Floral and geometric elements are arranged into balanced and often mirrored patterns.'
        ]
    ];
    const gallery = [
        ['✦', 'Flowing line', 'Notice how a single raised line bends into petals, leaves and ornamental curves.'],
        ['❋', 'Floral field', 'Look for repeated flowers, leaves and vines that create rhythm across the textile.'],
        ['◈', 'Symmetry', 'Many compositions use half-patterns and mirrored forms to create visual balance.'],
        [
            '●',
            'Pigment texture',
            'The dense paste gives the painted line a tactile quality unlike ordinary flat printing.'
        ],
        ['✺', 'Colour contrast', 'Bright pigments can be placed against dark cloth so motifs become highly visible.'],
        ['⌘', 'Craft detail', 'Fine points, joins and controlled curves reveal the precision required.']
    ];
    const motifs = [
        ['🌺', 'Flowers', 'Petals and stylised floral clusters create a central visual vocabulary.'],
        ['🌿', 'Leaves and vines', 'Curving stems connect elements into a continuous decorative field.'],
        ['🦚', 'Peacock forms', 'Bird imagery, including the peacock, appears in decorative Rogan compositions.'],
        ['☀️', 'Tree of Life', 'Branching forms and symmetrical growth are associated with celebrated Rogan designs.'],
        ['◈', 'Geometric rhythm', 'Dots, diamonds, borders and repeated shapes give compositions structure.'],
        ['🌀', 'Free-flowing ornament', 'The medium allows artisans to create elegant curves directly on fabric.']
    ];
    const refs = [
        [
            'Ministry of Textiles — Handicrafts',
            'Government information on Indian handicrafts and traditional craft traditions.',
            'https://handicrafts.nic.in/'
        ],
        [
            'Gujarat Tourism',
            'Regional cultural and tourism information about Gujarat crafts and heritage.',
            'https://www.gujarattourism.com/'
        ],
        [
            'Indian Culture Portal',
            'Government-supported cultural collections and heritage resources.',
            'https://indianculture.gov.in/'
        ],
        [
            'Crafts Council of India',
            'Resources and advocacy relating to Indian craft traditions and artisans.',
            'https://www.craftscouncilofindia.in/'
        ]
    ];
    document.getElementById('steps').innerHTML = steps
        .map(x => `<article class="card"><span class="eyebrow">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`)
        .join('');
    document.getElementById('gallery-grid').innerHTML = gallery
        .map(
            (x, i) =>
                `<button class="gallery-item" type="button" data-index="${i}"><div class="gallery-art">${x[0]}</div><strong>${x[1]}</strong><p>${x[2]}</p></button>`
        )
        .join('');
    const detail = document.getElementById('gallery-detail');
    document.querySelectorAll('.gallery-item').forEach(b =>
        b.addEventListener('click', () => {
            const x = gallery[Number(b.dataset.index)];
            detail.innerHTML = `<h3>${x[0]} ${x[1]}</h3><p>${x[2]}</p><p class="muted">Visual study selected. Add an approved historical photograph or artwork asset when repository-approved media is available.</p>`;
            detail.classList.add('active');
        })
    );
    document.getElementById('motif-grid').innerHTML = motifs
        .map(
            x =>
                `<article class="card"><div style="font-size:2rem">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`
        )
        .join('');
    document.getElementById('references-list').innerHTML = refs
        .map(
            x =>
                `<article class="reference"><h3>${x[0]}</h3><p>${x[1]}</p><a href="${x[2]}" target="_blank" rel="noopener noreferrer">Open source ↗</a></article>`
        )
        .join('');
    const menu = document.getElementById('menu-toggle'),
        nav = document.getElementById('nav-menu');
    if (menu && nav) menu.onclick = () => nav.classList.toggle('active');
    document.querySelectorAll('.section-nav a').forEach(
        a =>
            (a.onclick = e => {
                const t = document.querySelector(a.getAttribute('href'));
                if (t) {
                    e.preventDefault();
                    t.scrollIntoView({ behavior: 'smooth' });
                }
            })
    );
    if (window.Journey?.registerSearchItems)
        window.Journey.registerSearchItems('rogan-art-explorer/index.html', [
            {
                id: 'rogan-art',
                title: 'Rogan Art',
                description: "Explore Gujarat's Rogan art, technique, motifs and artisan heritage.",
                link: 'rogan-art-explorer/index.html'
            }
        ]);
})();

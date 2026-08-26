(() => {
    const gallery = [
        [
            'Mughal court scene',
            'Mughal painting is known for close observation, portraiture, court scenes, refined linework and influences from Persian painting.',
            '✦'
        ],
        [
            'Rajasthani devotional scene',
            'Rajasthani schools encompass several regional traditions, often featuring bold colour, expressive figures, landscapes and devotional or literary subjects.',
            '❋'
        ],
        [
            'Pahari romance',
            'Pahari painting developed in Himalayan hill courts and is celebrated for lyrical landscapes, poetry, romance and devotional narratives.',
            '◈'
        ],
        [
            'Deccani court painting',
            'Deccani traditions developed in the courts of the Deccan, often using rich colour, atmospheric settings, elaborate dress and distinctive stylisation.',
            '✺'
        ],
        [
            'Manuscript folio',
            'Miniature paintings frequently appeared within illustrated manuscripts, where image and text worked together to tell literary or religious stories.',
            '❖'
        ],
        [
            'Nature study',
            'Animals, birds and plants could become subjects in their own right, encouraging detailed observation and delicate rendering.',
            '❈'
        ]
    ];
    const schools = [
        [
            'Mughal',
            'North Indian imperial and courtly tradition',
            'Fine naturalistic observation, portraits, court scenes and manuscript illustration; Persian and local influences meet in many works.'
        ],
        [
            'Rajasthani',
            'Regional courts of Rajasthan',
            'A broad family of styles including Mewar, Marwar, Bundi, Kota and others; often vibrant and strongly expressive.'
        ],
        [
            'Pahari',
            'Himalayan hill states',
            'Romantic landscapes, devotional stories, poetry and lyrical figures; associated with several hill-court traditions.'
        ],
        [
            'Deccani',
            'Deccan courts',
            'Distinctive palettes, elongated figures, lavish costume and atmospheric settings shaped by regional and international influences.'
        ]
    ];
    const materials = [
        [
            '📜',
            'Paper & prepared surfaces',
            'Fine paper and manuscript folios provided a stable surface for detailed miniature work.'
        ],
        [
            '🖌️',
            'Fine brushes',
            'Very small brushes allow controlled lines and tiny details, including facial features, textiles and ornament.'
        ],
        [
            '🎨',
            'Mineral & organic pigments',
            'Traditional palettes could draw on mineral, earth and plant-derived colourants, with careful grinding and preparation.'
        ],
        [
            '🥚',
            'Binders & burnishing',
            'Pigments were mixed with suitable binders; surfaces could be smoothed or burnished to create a refined finish.'
        ],
        [
            '✨',
            'Gold & ornament',
            'Gold and other metallic details were used in many courtly and manuscript traditions to emphasise ornament and status.'
        ],
        [
            '🔍',
            'Magnifying attention',
            'The small scale of the artwork makes close observation part of the experience: borders, patterns and tiny figures reward slow looking.'
        ]
    ];
    const refs = [
        [
            'National Museum, New Delhi',
            'Collections and educational resources relating to Indian painting traditions.',
            'https://nationalmuseumindia.gov.in/'
        ],
        [
            'Indian Culture Portal',
            'Government-supported cultural collections and resources on Indian art and heritage.',
            'https://indianculture.gov.in/'
        ],
        [
            'Ministry of Culture, Government of India',
            'National cultural institutions and heritage information.',
            'https://www.indiaculture.gov.in/'
        ],
        [
            'Victoria and Albert Museum',
            'Museum resources on South Asian painting and the history of Indian art.',
            'https://www.vam.ac.uk/'
        ]
    ];
    document.getElementById('gallery-grid').innerHTML = gallery
        .map(
            (x, i) =>
                `<button class="gallery-card" data-i="${i}" type="button"><div class="art-placeholder">${x[2]}</div><h3>${x[0]}</h3><p>${x[1]}</p></button>`
        )
        .join('');
    document.getElementById('school-grid').innerHTML = schools
        .map(x => `<article class="card"><h3>${x[0]}</h3><p><strong>${x[1]}</strong></p><p>${x[2]}</p></article>`)
        .join('');
    document.getElementById('material-grid').innerHTML = materials
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
    const viewer = document.getElementById('viewer'),
        art = document.getElementById('artwork'),
        title = document.getElementById('viewer-title'),
        text = document.getElementById('viewer-text'),
        value = document.getElementById('zoom-value');
    let zoom = 1;
    function render() {
        art.querySelector('.artwork-shape').style.transform = `scale(${zoom})`;
        value.textContent = Math.round(zoom * 100) + '%';
    }
    document.querySelectorAll('.gallery-card').forEach(
        b =>
            (b.onclick = () => {
                const x = gallery[+b.dataset.i];
                title.textContent = x[0];
                text.textContent = x[1];
                art.innerHTML = `<div class="artwork-shape">${x[2]}</div>`;
                zoom = 1;
                render();
                viewer.classList.add('active');
                viewer.setAttribute('aria-hidden', 'false');
            })
    );
    function close() {
        viewer.classList.remove('active');
        viewer.setAttribute('aria-hidden', 'true');
    }
    document.getElementById('viewer-close').onclick = close;
    document.getElementById('zoom-in').onclick = () => {
        zoom = Math.min(2.5, zoom + 0.25);
        render();
    };
    document.getElementById('zoom-out').onclick = () => {
        zoom = Math.max(0.5, zoom - 0.25);
        render();
    };
    document.getElementById('zoom-reset').onclick = () => {
        zoom = 1;
        render();
    };
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
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
        window.Journey.registerSearchItems('indian-miniature-paintings-explorer/index.html', [
            {
                id: 'indian-miniature-paintings',
                title: 'Indian Miniature Paintings',
                description: 'Explore miniature painting schools, materials and zoomable artwork studies.',
                link: 'indian-miniature-paintings-explorer/index.html'
            }
        ]);
})();

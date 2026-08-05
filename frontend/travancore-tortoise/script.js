document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            [
                'Scientific Name',
                'Indotestudo travancorica',
                'Accepted scientific name used for the Travancore Tortoise.'
            ],
            ['Common Name', 'Travancore Tortoise', 'A vulnerable endemic reptile of the Western Ghats.'],
            ['Classification', 'Reptile · Testudines · Testudinidae', 'A tortoise species in the family Testudinidae.'],
            ['Distribution', 'Western Ghats, India', 'Endemic to the Western Ghats of south-western India.'],
            [
                'Habitat',
                'Deciduous and evergreen forests',
                'Known from forest habitats across parts of the Western Ghats.'
            ],
            [
                'Conservation Status',
                'Vulnerable',
                'The issue frames the species as vulnerable and conservation-focused.'
            ]
        ],
        introduction: [
            [
                'Western Ghats endemic',
                'The Travancore Tortoise is a forest tortoise found in the Western Ghats of south-western India.'
            ],
            [
                'Forest-floor reptile',
                'It is strongly connected with leaf litter, fallen fruits, fungi, grasses and sheltered forest-floor habitats.'
            ],
            [
                'Conservation value',
                "Because the species is endemic and vulnerable, protecting its habitat is important for India's reptile diversity."
            ],
            [
                'Explorer focus',
                'This page combines verified identity, distribution, habitat, diet, behaviour, reproduction, threats, gallery and references.'
            ]
        ],
        classification: [
            ['Kingdom', 'Animalia'],
            ['Class', 'Reptilia'],
            ['Order', 'Testudines'],
            ['Family', 'Testudinidae'],
            ['Genus', 'Indotestudo'],
            ['Species', 'Indotestudo travancorica']
        ],
        physical: [
            ['Medium-sized tortoise', 'Conservation sources describe it as a medium-sized tortoise species.'],
            [
                'Protective shell',
                'A domed shell protects the animal and helps it blend into forest-floor surroundings.'
            ],
            [
                'Earth-toned camouflage',
                'Brown, black and yellowish patterns help the tortoise stay hidden in leaf litter.'
            ],
            ['Strong limbs', 'Sturdy limbs help it move through uneven forest ground, slopes and vegetation.']
        ],
        distribution: [
            ['Western Ghats range', 'The species is endemic to the Western Ghats in south-western India.'],
            [
                'State context',
                'Its range is discussed across Western Ghats states such as Kerala, Tamil Nadu and Karnataka.'
            ],
            ['Palghat Gap context', 'Specialist-group sources note distribution discontinuity around the Palghat Gap.'],
            [
                'Survey need',
                'Distribution knowledge improves through protected-area surveys and local ecological observations.'
            ]
        ],
        habitat: [
            ['Deciduous forest', 'The tortoise inhabits deciduous forest habitats in parts of the Western Ghats.'],
            ['Evergreen forest', 'Evergreen and semi-evergreen forest areas also form part of its habitat story.'],
            [
                'Forest-floor cover',
                'Leaf litter, ground vegetation and moist shaded patches help provide cover and food.'
            ],
            ['Habitat quality', 'Healthy forest structure supports feeding, shelter, movement and reproduction.']
        ],
        diet: [
            ['Plant matter', 'The diet includes leaves, fallen fruits, grasses and other plant material.'],
            ['Fungi', 'Mushrooms and fungi are often discussed in diet summaries for the species.'],
            ['Forest-floor feeding', 'It feeds close to the ground and depends on seasonal forest-floor resources.'],
            [
                'Seed dispersal role',
                'By consuming fruits and moving through forest patches, tortoises can support nutrient cycling and seed movement.'
            ]
        ],
        behaviour: [
            [
                'Secretive movement',
                'The tortoise is a quiet forest-floor species and may be difficult to notice in leaf litter.'
            ],
            ['Slow foraging', 'It moves slowly while searching for food across shaded ground habitats.'],
            ['Seasonal activity', 'Activity can be influenced by rainfall, humidity and food availability.'],
            ['Camouflage strategy', 'Remaining still among leaves and soil helps it avoid detection.']
        ],
        reproduction: [
            ['Ground nesting', 'Reproduction is linked with safe ground nesting sites in suitable forest habitat.'],
            ['Egg-laying reptile', 'As a tortoise, it reproduces by laying eggs.'],
            [
                'Habitat sensitivity',
                'Nesting success depends on undisturbed ground conditions and suitable microhabitats.'
            ],
            [
                'Conservation concern',
                'Disturbance, hunting and habitat loss can affect breeding success and recruitment.'
            ]
        ],
        conservation: [
            [
                'Vulnerable species',
                'The issue asks to present the Travancore Tortoise as a vulnerable endemic reptile.'
            ],
            ['Protected-area value', 'Protected forests in the Western Ghats are important for its survival.'],
            [
                'Research priority',
                'Surveys and ecological studies help refine population, diet and distribution knowledge.'
            ],
            [
                'Community awareness',
                'Reducing hunting pressure and habitat disturbance depends on local awareness and enforcement.'
            ]
        ],
        threats: [
            [
                'Habitat degradation',
                'Forest loss and degradation reduce suitable shelter, feeding and nesting habitat.'
            ],
            ['Hunting pressure', 'Specialist sources identify hunting as a major threat for the species.'],
            ['Fragmentation', 'Fragmented habitat makes movement and long-term population stability harder.'],
            ['Low detectability', 'A secretive forest-floor species can be difficult to survey and protect.']
        ],
        points: [
            [
                'range',
                'Western Ghats range',
                38,
                35,
                'Distribution',
                'The species is endemic to the Western Ghats of south-western India.'
            ],
            [
                'forest',
                'Forest-floor habitat',
                55,
                48,
                'Habitat',
                'Deciduous and evergreen forest floors provide cover, food and movement routes.'
            ],
            [
                'food',
                'Fallen fruit and fungi patch',
                42,
                64,
                'Diet',
                'Leaves, fruits, grasses and fungi are central to the diet story.'
            ],
            [
                'movement',
                'Camouflage trail',
                64,
                34,
                'Behaviour',
                'Slow movement and camouflage help the tortoise remain hidden.'
            ],
            [
                'nest',
                'Ground nesting site',
                70,
                64,
                'Reproduction',
                'Safe ground conditions support egg laying and hatchling survival.'
            ],
            [
                'threat',
                'Disturbance edge',
                50,
                78,
                'Threats',
                'Habitat degradation, fragmentation and hunting pressure threaten populations.'
            ]
        ],
        gallery: [
            [
                'Western Ghats forest',
                '../../assets/travel_mountains.png',
                'A placeholder visual for the Western Ghats landscape.'
            ],
            [
                'Leaf-litter habitat',
                '../../assets/travel_hidden.png',
                "Forest-floor cover is central to the species' habitat story."
            ],
            [
                'Endemic reptile learning',
                '../../assets/hero_banner.png',
                'Educational placeholder for endemic fauna storytelling.'
            ],
            [
                'Protected forest context',
                '../../assets/heritage_monuments.png',
                'The explorer uses project assets for visual consistency.'
            ]
        ],
        interesting: [
            ['Endemic reptile', 'The Travancore Tortoise is found only in the Western Ghats region of India.'],
            [
                'Forest-floor specialist',
                'Its earthy shell colours help it blend into leaves, soil and shaded forest ground.'
            ],
            ['Food recycler', 'Its diet links it with forest-floor nutrient cycling and possible seed movement.'],
            [
                'Conservation clue',
                'Finding this tortoise can indicate the presence of healthy forest-floor microhabitats.'
            ]
        ],
        references: [
            [
                'Tortoise and Freshwater Turtle Specialist Group',
                'Species summary, distribution and conservation context for Indotestudo travancorica.'
            ],
            [
                'Cambridge Oryx study',
                'Occurrence and vulnerability of Travancore Tortoise in protected areas in south India.'
            ],
            [
                'Wildlife Institute of India reports',
                'Ecology, diet, population density, threats and Western Ghats survey context.'
            ],
            ['India Biodiversity Portal', 'Species identity and biodiversity record context.']
        ],
        faqs: [
            ['What is the scientific name of the Travancore Tortoise?', 'Indotestudo travancorica.'],
            ['Where is the Travancore Tortoise found?', 'It is endemic to the Western Ghats of south-western India.'],
            [
                'What habitat does it use?',
                'It inhabits deciduous and evergreen forest habitats, especially forest-floor microhabitats.'
            ],
            [
                'What does it eat?',
                'It feeds on plant matter such as leaves and fruits, and can also consume fungi and other forest-floor resources.'
            ],
            [
                'What does this explorer cover?',
                'Introduction, scientific name, classification, physical characteristics, distribution, habitat, diet, behaviour, reproduction, conservation status, threats, interesting facts, gallery and references.'
            ]
        ]
    };
    const esc = v =>
        String(v)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    const $ = id => document.getElementById(id);
    function card(item, i) {
        return `<article class="info-card"><span>0${i + 1}</span><h3>${esc(item[0])}</h3><p>${esc(item[1])}</p></article>`;
    }
    $('facts-grid').innerHTML = DATA.facts
        .map(
            f =>
                `<article class="fact-card"><span>${esc(f[0])}</span><strong>${esc(f[1])}</strong><p>${esc(f[2])}</p></article>`
        )
        .join('');
    [
        'introduction',
        'classification',
        'physical',
        'distribution',
        'habitat',
        'diet',
        'behaviour',
        'reproduction',
        'conservation',
        'threats'
    ].forEach(key => {
        $(`${key}-grid`).innerHTML = DATA[key].map(card).join('');
    });
    $('interesting-grid').innerHTML = DATA.interesting.map(card).join('');
    $('references-grid').innerHTML = DATA.references.map(card).join('');
    $('faq-list').innerHTML = DATA.faqs
        .map(f => `<details class="faq-item"><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`)
        .join('');
    function selectPoint(id) {
        const p = DATA.points.find(x => x[0] === id) || DATA.points[0];
        document
            .querySelectorAll('.map-pin')
            .forEach(pin => pin.classList.toggle('active', pin.dataset.point === p[0]));
        $('map-info').innerHTML = `<span>${esc(p[4])}</span><h3>${esc(p[1])}</h3><p>${esc(p[5])}</p>`;
    }
    $('map-pins').innerHTML = DATA.points
        .map(
            (p, i) =>
                `<button class="map-pin" type="button" data-point="${esc(p[0])}" style="left:${p[2]}%;top:${p[3]}%" aria-label="${esc(p[1])}">${i + 1}</button>`
        )
        .join('');
    document.querySelectorAll('.map-pin').forEach(p => p.addEventListener('click', () => selectPoint(p.dataset.point)));
    $('gallery-grid').innerHTML = DATA.gallery
        .map(
            g =>
                `<article class="gallery-card"><img src="${esc(g[1])}" alt="${esc(g[0])}" onerror="this.src='../../assets/hero_banner.png'"><div><h3>${esc(g[0])}</h3><p>${esc(g[2])}</p></div></article>`
        )
        .join('');
    selectPoint(DATA.points[0][0]);
    window.TravancoreTortoiseExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

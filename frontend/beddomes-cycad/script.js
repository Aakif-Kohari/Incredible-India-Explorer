document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            ['Scientific Name', 'Cycas beddomei', 'The accepted botanical name highlighted for this rare cycad.'],
            ['Common Name', "Beddome's Cycad", 'A rare endemic cycad species native to the Eastern Ghats of India.'],
            [
                'Taxonomic Classification',
                'Plant · Cycadales · Cycadaceae',
                'A gymnosperm species belonging to the cycad family.'
            ],
            [
                'Distribution',
                'Eastern Ghats, India',
                'Associated with dry hill slopes and rocky habitats in the Eastern Ghats.'
            ],
            [
                'Habitat',
                'Dry deciduous and rocky scrub slopes',
                'The explorer focuses on open, rocky and seasonally dry habitats.'
            ],
            [
                'Conservation Status',
                'Endangered',
                'The page treats the species as highly conservation-sensitive and threatened.'
            ]
        ],
        introduction: [
            [
                'Ancient plant lineage',
                "Cycads are ancient seed plants, and Beddome's Cycad represents a rare living link to older plant lineages."
            ],
            [
                'Eastern Ghats endemic',
                'This species is native to the Eastern Ghats of India and has a restricted natural range.'
            ],
            [
                'Botanical value',
                'Its rarity, specialised habitat and slow growth make it important for plant conservation education.'
            ],
            [
                'Explorer focus',
                'This page presents identity, taxonomy, distribution, habitat, morphology, ecological importance, conservation status, threats, measures, gallery and references.'
            ]
        ],
        classification: [
            ['Kingdom', 'Plantae'],
            ['Division', 'Cycadophyta'],
            ['Class', 'Cycadopsida'],
            ['Order', 'Cycadales'],
            ['Family', 'Cycadaceae'],
            ['Genus', 'Cycas'],
            ['Species', 'Cycas beddomei']
        ],
        distribution: [
            ['Eastern Ghats range', 'The species is associated with the Eastern Ghats of southern India.'],
            [
                'Restricted populations',
                'Small and scattered populations make distribution mapping important for conservation planning.'
            ],
            [
                'Rocky hill slopes',
                'The distribution story is closely connected with open rocky slopes and scrubby hill habitats.'
            ],
            [
                'Survey priority',
                'Updated field surveys are needed to track population health, regeneration and habitat pressure.'
            ]
        ],
        habitat: [
            ['Dry deciduous habitat', "Beddome's Cycad is linked with dry deciduous forest and scrub landscapes."],
            ['Rocky terrain', 'Rocky hill slopes and exposed ground provide key habitat context.'],
            ['Open sunlight', 'Cycads often need suitable light conditions and space for slow growth.'],
            [
                'Habitat quality',
                'Protection from fire, grazing pressure and illegal collection helps maintain habitat quality.'
            ]
        ],
        morphology: [
            ['Crown of leaves', 'The plant has a crown-like arrangement of stiff, pinnate leaves.'],
            ['Trunk form', 'A short trunk or stem supports the leaf crown and reproductive structures.'],
            ['Cone-bearing plant', 'As a cycad, it produces cone-like reproductive structures instead of flowers.'],
            ['Slow growth', 'Slow growth makes population recovery difficult when adult plants are removed.']
        ],
        ecology: [
            ['Ancient seed plant', "Cycads add evolutionary diversity to India's plant heritage."],
            [
                'Habitat specialist',
                'Its presence highlights the ecological value of dry rocky slopes and scrub habitats.'
            ],
            ['Pollination context', 'Cycad reproduction is connected with specialised ecological interactions.'],
            ['Genetic importance', 'Small endemic populations can hold valuable genetic diversity.']
        ],
        conservation: [
            [
                'Endangered focus',
                "The explorer presents Beddome's Cycad as a threatened endemic plant requiring active conservation."
            ],
            ['In-situ protection', 'Protecting plants in their natural habitat is essential for long-term survival.'],
            [
                'Ex-situ support',
                'Botanical gardens, seed banks and research collections can support conservation learning.'
            ],
            ['Monitoring', 'Population monitoring helps detect regeneration gaps and illegal removal pressure.']
        ],
        threats: [
            ['Illegal collection', 'Rare cycads are vulnerable to ornamental plant collection and trade pressure.'],
            ['Habitat loss', 'Land conversion, quarrying or slope disturbance can damage small populations.'],
            ['Fire and grazing', 'Frequent fires and grazing can affect young plants and habitat structure.'],
            ['Low regeneration', 'Slow growth and limited recruitment increase extinction risk for small populations.']
        ],
        measures: [
            [
                'Protect natural sites',
                'Known populations should be protected from collection, fire and habitat disturbance.'
            ],
            ['Strengthen awareness', 'Local awareness helps reduce removal of rare plants from the wild.'],
            [
                'Research regeneration',
                'Studies on recruitment, pollination and seedling survival can guide conservation action.'
            ],
            [
                'Botanical safeguards',
                'Ex-situ conservation through botanical gardens and seed collections can support backup populations.'
            ]
        ],
        points: [
            [
                'range',
                'Eastern Ghats range',
                38,
                35,
                'Distribution Map',
                'The species is native to the Eastern Ghats of India.'
            ],
            [
                'rock',
                'Rocky hill habitat',
                55,
                48,
                'Habitat',
                'Rocky slopes and dry scrub habitats are central to its ecology.'
            ],
            [
                'leaf',
                'Leaf crown feature',
                42,
                64,
                'Morphological Features',
                'A crown of stiff leaves gives cycads their recognisable form.'
            ],
            [
                'cone',
                'Cone-bearing plant',
                64,
                34,
                'Ecological Importance',
                'Cycads are ancient cone-bearing seed plants.'
            ],
            [
                'threat',
                'Collection pressure edge',
                70,
                64,
                'Threats',
                'Illegal collection and habitat disturbance threaten wild plants.'
            ],
            [
                'action',
                'Conservation action zone',
                50,
                78,
                'Conservation Measures',
                'Site protection, monitoring and awareness support recovery.'
            ]
        ],
        gallery: [
            [
                'Eastern Ghats hills',
                '../../assets/travel_mountains.png',
                'A placeholder visual for the Eastern Ghats landscape.'
            ],
            [
                'Rocky scrub habitat',
                '../../assets/travel_hidden.png',
                'Rocky and dry habitats are central to the species story.'
            ],
            [
                'Rare endemic plant',
                '../../assets/hero_banner.png',
                'Educational placeholder for rare endemic flora storytelling.'
            ],
            [
                'Conservation context',
                '../../assets/heritage_monuments.png',
                'The explorer uses project assets for visual consistency.'
            ]
        ],
        interesting: [
            ['Ancient lineage', 'Cycads are sometimes called living fossils because their lineage is very old.'],
            ['Not a palm', "Although it may look palm-like, Beddome's Cycad is a gymnosperm, not a palm."],
            ['Slow recovery', 'Slow-growing rare plants can take many years to recover after disturbance.'],
            ['Habitat lesson', 'This species shows why dry rocky slopes are also important biodiversity habitats.']
        ],
        references: [
            ['Botanical Survey resources', 'Botanical identity, Indian distribution and conservation context.'],
            ['IUCN-linked references', 'Conservation status and threat context for Cycas beddomei.'],
            ['Cycad conservation literature', 'Taxonomy, morphology and threat information for rare cycads.'],
            ['Eastern Ghats biodiversity studies', 'Habitat and endemic plant conservation context.']
        ],
        faqs: [
            ["What is the scientific name of Beddome's Cycad?", 'Cycas beddomei.'],
            ['Where is it found?', 'It is native to the Eastern Ghats of India.'],
            [
                'Is it a flowering plant?',
                'No. It is a gymnosperm and produces cone-like reproductive structures instead of flowers.'
            ],
            [
                'Why is it threatened?',
                'Its small range, slow growth, habitat disturbance and illegal collection pressure make it vulnerable.'
            ],
            [
                'What does this explorer cover?',
                'Introduction, scientific name, taxonomy, distribution map, habitat, morphological features, ecological importance, conservation status, threats, conservation measures, facts, gallery and references.'
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
        'distribution',
        'habitat',
        'morphology',
        'ecology',
        'conservation',
        'threats',
        'measures'
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
    window.BeddomesCycadExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            ['Scientific Name', 'Eumyias albicaudatus', 'Accepted scientific name used for the Nilgiri Flycatcher.'],
            ['Common Name', 'Nilgiri Flycatcher', 'A Western Ghats endemic flycatcher.'],
            ['Taxonomy', 'Bird · Passeriformes · Muscicapidae', 'A passerine bird in the Old World flycatcher family.'],
            ['Distribution', 'Western Ghats, India', 'The species is endemic to the Western Ghats.'],
            [
                'Habitat',
                'Forest and plantation landscapes',
                "State of India's Birds lists it as resident with forest and plantation habitat specialisation."
            ],
            [
                'Conservation Status',
                'Least Concern',
                'Recent references list the species as Least Concern, while habitat quality remains important.'
            ]
        ],
        overview: [
            [
                'Western Ghats endemic',
                "The Nilgiri Flycatcher is an endemic bird of the Western Ghats, making it important for India's biodiversity story."
            ],
            [
                'Montane forest identity',
                'It is closely associated with hill forests, shola edges, plantations and shaded high-elevation landscapes.'
            ],
            [
                'Blue-toned flycatcher',
                'The species is recognised by its blue-toned appearance, subtle markings and active flycatching behaviour.'
            ],
            [
                'Explorer goal',
                'This page combines verified identity, taxonomy, distribution, habitat, behaviour, diet, breeding, conservation, threats, gallery and references.'
            ]
        ],
        taxonomy: [
            ['Kingdom', 'Animalia'],
            ['Class', 'Aves'],
            ['Order', 'Passeriformes'],
            ['Family', 'Muscicapidae'],
            ['Genus', 'Eumyias'],
            ['Species', 'Eumyias albicaudatus']
        ],
        distribution: [
            ['Endemic range', "The bird is endemic to India's Western Ghats."],
            [
                'Range size context',
                "State of India's Birds provides a distribution range estimate for the species and treats it as a resident bird."
            ],
            [
                'Ghats states',
                'The species story is linked with hill landscapes across Kerala, Tamil Nadu and nearby Western Ghats areas.'
            ],
            ['Monitoring value', 'Range and trend information should be updated with trusted bird-monitoring sources.']
        ],
        habitat: [
            ['Hill forest', 'The Nilgiri Flycatcher is associated with forested hill landscapes and shaded habitat.'],
            [
                'Plantation edges',
                'It can be discussed in forest and plantation habitat contexts where suitable cover remains.'
            ],
            [
                'Moist evergreen influence',
                'Moist forest structure, canopy shade and understory quality shape habitat suitability.'
            ],
            ['Habitat quality', 'Protecting forest patches, native trees and connected habitat supports the species.']
        ],
        behaviour: [
            [
                'Active flycatching',
                'The species catches insects by quick flights from perches, typical of flycatchers.'
            ],
            ['Resident presence', 'It is treated as resident in Indian bird-status references.'],
            ['Forest movement', 'It moves through shaded vegetation, perches and forest edges while foraging.'],
            ['Detection clues', 'Sightings, calls and repeated perch use can help birdwatchers identify it.']
        ],
        diet: [
            ['Insect-focused diet', 'As a flycatcher, the diet is presented around insects and small arthropods.'],
            ['Perch hunting', 'It often hunts from perches by making short flights after prey.'],
            ['Habitat link', 'Healthy forest and plantation edges support insect availability.'],
            ['Seasonal variation', 'Food availability can vary with rainfall, vegetation and elevation.']
        ],
        breeding: [
            ['Forest breeding context', 'Breeding is linked with sheltered hill-forest habitat.'],
            ['Nest placement', 'Flycatchers typically use protected nest sites, so habitat structure matters.'],
            ['Seasonal cycle', 'Breeding timing should be described cautiously because local conditions can vary.'],
            ['Disturbance risk', 'Forest disturbance near nesting areas can reduce breeding success.']
        ],
        conservation: [
            ['Least Concern', 'The species is generally listed as Least Concern in recent conservation references.'],
            [
                'Endemic responsibility',
                'Because it is Western Ghats endemic, habitat conservation remains important even without a high-threat category.'
            ],
            ['Forest dependency', 'Habitat loss and fragmentation can still reduce local population health.'],
            [
                'Citizen science value',
                'Birdwatcher observations and long-term monitoring improve conservation understanding.'
            ]
        ],
        threats: [
            ['Habitat degradation', 'Forest degradation can reduce cover, food and breeding resources.'],
            ['Fragmentation', 'Disconnected hill-forest patches can affect movement and long-term resilience.'],
            ['Plantation pressure', 'Changes in shaded plantations and native vegetation can alter habitat quality.'],
            [
                'Climate sensitivity',
                'High-elevation and montane forest species can be sensitive to climate and land-use changes.'
            ]
        ],
        points: [
            ['range', 'Western Ghats range', 38, 36, 'Distribution', 'The species is endemic to the Western Ghats.'],
            [
                'forest',
                'Hill forest habitat',
                55,
                44,
                'Habitat',
                'Shaded forest and plantation edges shape habitat suitability.'
            ],
            [
                'perch',
                'Flycatching perch',
                64,
                58,
                'Behaviour',
                'Short flights from perches help the bird catch insects.'
            ],
            ['food', 'Insect-rich edge', 43, 65, 'Diet', 'Insect availability supports foraging success.'],
            ['nest', 'Breeding shelter', 70, 32, 'Breeding', 'Protected forest structure supports nesting.'],
            [
                'threat',
                'Fragmentation edge',
                50,
                78,
                'Threats',
                'Habitat degradation and fragmentation can affect local populations.'
            ]
        ],
        gallery: [
            [
                'Western Ghats habitat',
                '../../assets/travel_mountains.png',
                'Placeholder visual for the Western Ghats hill landscape.'
            ],
            [
                'Forest shade',
                '../../assets/travel_hidden.png',
                'Shaded forest and plantation habitat support flycatcher ecology.'
            ],
            [
                'Endemic bird learning',
                '../../assets/hero_banner.png',
                'Educational placeholder for endemic fauna storytelling.'
            ],
            [
                'Conservation context',
                '../../assets/heritage_monuments.png',
                'The explorer uses project assets for visual consistency.'
            ]
        ],
        interesting: [
            ['Endemic identity', 'The Nilgiri Flycatcher is a Western Ghats endemic bird.'],
            ['Resident species', "State of India's Birds treats it as resident."],
            ['Forest and plantation specialist', 'The species is associated with forest and plantation habitats.'],
            [
                'Tiny habitat signal',
                'Small forest birds can help students understand habitat quality and endemic biodiversity.'
            ]
        ],
        references: [
            ['BirdLife DataZone', 'Species factsheet and IUCN Red List category context.'],
            [
                "State of India's Birds",
                'Resident status, habitat specialisation, endemicity and distribution range information.'
            ],
            ['Western Ghats bird studies', 'Context for montane and rainforest bird communities.'],
            ['Bird identification references', 'Scientific name, taxonomy and field-identification context.']
        ],
        faqs: [
            ['What is the scientific name of the Nilgiri Flycatcher?', 'Eumyias albicaudatus.'],
            ['Where is the Nilgiri Flycatcher found?', 'It is endemic to the Western Ghats of India.'],
            [
                'What habitat does it use?',
                'It is associated with forest and plantation landscapes, especially shaded hill habitats.'
            ],
            ['What does it eat?', 'It mainly feeds on insects and small arthropods caught by flycatching behaviour.'],
            [
                'What does this explorer cover?',
                'Overview, scientific name, taxonomy, distribution, habitat, behaviour, diet, breeding, conservation status, threats, facts, gallery and references.'
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
        'overview',
        'taxonomy',
        'distribution',
        'habitat',
        'behaviour',
        'diet',
        'breeding',
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
    window.NilgiriFlycatcherExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

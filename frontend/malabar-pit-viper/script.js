document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            [
                'Scientific Name',
                'Craspedocephalus malabaricus',
                'Scientific name required by the issue for the Malabar Pit Viper.'
            ],
            ['Common Name', 'Malabar Pit Viper', 'An endemic venomous snake of the Western Ghats.'],
            ['Taxonomic Classification', 'Reptile · Squamata · Viperidae', 'A pit viper species in the viper family.'],
            [
                'Distribution',
                'Western Ghats, India',
                'Associated with the wet forested hill landscapes of the Western Ghats.'
            ],
            [
                'Habitat',
                'Moist forests and streamside vegetation',
                'Often discussed with shaded, humid forest and near-stream microhabitats.'
            ],
            [
                'Conservation Focus',
                'Habitat-sensitive endemic',
                'The explorer frames conservation through habitat protection and awareness.'
            ]
        ],
        introduction: [
            [
                'Western Ghats endemic',
                "The Malabar Pit Viper is an endemic venomous snake of the Western Ghats and an important part of India's reptile diversity."
            ],
            [
                'Camouflage specialist',
                'Its colour variation and stillness help it blend into leaves, branches, rocks and wet forest edges.'
            ],
            [
                'Ecological importance',
                'As a predator, it helps maintain balance in forest food webs by feeding on small animals.'
            ],
            [
                'Explorer focus',
                'This page presents identity, taxonomy, distribution, habitat, physical traits, behaviour, diet, reproduction, venom information, ecological role, threats, gallery and references.'
            ]
        ],
        classification: [
            ['Kingdom', 'Animalia'],
            ['Class', 'Reptilia'],
            ['Order', 'Squamata'],
            ['Family', 'Viperidae'],
            ['Genus', 'Craspedocephalus'],
            ['Species', 'Craspedocephalus malabaricus']
        ],
        distribution: [
            ['Western Ghats range', 'The species is associated with the Western Ghats of south-western India.'],
            ['Endemic value', 'Because the snake is endemic, local habitat protection is especially important.'],
            [
                'Wet hill landscapes',
                'Distribution learning should highlight wet forests, hill slopes and streamside vegetation.'
            ],
            [
                'Survey need',
                'Reliable distribution information improves through local records, field surveys and careful documentation.'
            ]
        ],
        habitat: [
            ['Moist forest', 'Humid forest patches support shelter, prey and ambush sites.'],
            [
                'Streamside vegetation',
                'Vegetation near streams, rocks and damp forest edges is important in many natural-history descriptions.'
            ],
            [
                'Leaf litter and branches',
                'The snake may use low vegetation, branches, rocks and leaf-litter edges for camouflage.'
            ],
            ['Microhabitat quality', 'Moisture, shade and low disturbance support suitable microhabitats.']
        ],
        physical: [
            [
                'Colour variation',
                'The species is known for colour variation, which supports camouflage in different forest backgrounds.'
            ],
            ['Pit viper head', 'A triangular head and heat-sensing pit-viper features support ambush predation.'],
            ['Camouflaged body', 'Patterns and colours help it disappear among leaves, moss, rocks and branches.'],
            ['Moderate build', 'Its body form supports slow movement, coiling and ambush behaviour.']
        ],
        behaviour: [
            ['Ambush predator', 'The snake often relies on stillness and camouflage before striking prey.'],
            ['Nocturnal tendency', 'Activity is commonly associated with low-light and night conditions.'],
            ['Slow movement', 'Careful, slow movement helps maintain concealment in forest habitats.'],
            [
                'Defensive caution',
                'Like all venomous snakes, it should be observed only from a safe distance and never handled.'
            ]
        ],
        diet: [
            ['Small vertebrates', 'Diet summaries commonly include frogs, lizards and small animals.'],
            ['Forest prey link', 'Healthy moist forest habitats support amphibians and reptiles that can form prey.'],
            [
                'Ambush feeding',
                'The snake waits near likely prey routes rather than actively chasing over long distances.'
            ],
            ['Food-web role', 'By controlling small-animal populations, it contributes to ecological balance.']
        ],
        reproduction: [
            ['Reptile breeding context', 'Reproduction depends on suitable forest conditions and safe microhabitats.'],
            [
                'Live-bearing context',
                'Pit vipers are commonly discussed as giving birth to live young, so the page presents reproduction cautiously.'
            ],
            [
                'Seasonal influence',
                'Rainfall, humidity and prey availability can influence activity and breeding observations.'
            ],
            [
                'Habitat sensitivity',
                'Disturbance around shelter and breeding microhabitats can affect survival of young.'
            ]
        ],
        venom: [
            ['Venomous species', 'The Malabar Pit Viper is venomous and should not be handled.'],
            ['Medical caution', 'Any snakebite should be treated as urgent and handled by medical professionals.'],
            ['Educational framing', 'The venom section is for awareness, not for handling or risk-taking.'],
            ['Respectful distance', 'Safe observation and snake-rescue protocols protect both people and wildlife.']
        ],
        ecology: [
            ['Predator role', 'The species helps regulate prey populations in wet forest ecosystems.'],
            ['Biodiversity indicator', 'Its presence can reflect intact moist forest and prey-rich microhabitats.'],
            [
                'Prey-predator balance',
                'Snakes are important middle predators that connect amphibians, reptiles, birds and mammals in food webs.'
            ],
            [
                'Awareness value',
                'Learning about venomous wildlife can reduce fear-based killing and promote coexistence.'
            ]
        ],
        conservation: [
            [
                'Endemic conservation',
                'Protecting Western Ghats habitats directly supports endemic reptiles like this species.'
            ],
            ['Habitat continuity', 'Connected forest patches help maintain prey, shelter and movement opportunities.'],
            ['Awareness and rescue', 'Public education and trained snake-rescue responses reduce conflict.'],
            [
                'Reference-based learning',
                'Reliable species pages should update conservation details from trusted herpetology and biodiversity sources.'
            ]
        ],
        threats: [
            ['Habitat loss', 'Forest loss and degradation reduce shelter, prey and movement routes.'],
            ['Human conflict', 'Fear of venomous snakes can lead to unnecessary killing.'],
            ['Road mortality', 'Roads through forested areas can increase accidental deaths.'],
            [
                'Microhabitat disturbance',
                'Disturbance of streamside vegetation, rocks and leaf litter can reduce suitable habitat.'
            ]
        ],
        points: [
            [
                'range',
                'Western Ghats range',
                38,
                35,
                'Distribution',
                'The species is associated with Western Ghats hill forests.'
            ],
            [
                'stream',
                'Streamside vegetation',
                55,
                48,
                'Habitat',
                'Humid streamside habitat provides shade, prey and ambush cover.'
            ],
            [
                'camouflage',
                'Camouflage perch',
                42,
                64,
                'Physical Characteristics',
                'Colour variation and stillness help the snake blend with forest backgrounds.'
            ],
            ['hunt', 'Ambush zone', 64, 34, 'Behaviour', 'The snake relies on ambush behaviour and careful movement.'],
            [
                'venom',
                'Safety awareness point',
                70,
                64,
                'Venom Information',
                'Venomous snakes should be observed only from a safe distance.'
            ],
            [
                'role',
                'Food-web link',
                50,
                78,
                'Ecological Role',
                'As a predator, the snake supports forest food-web balance.'
            ]
        ],
        gallery: [
            [
                'Western Ghats forest',
                '../../assets/travel_mountains.png',
                'A placeholder visual for the Western Ghats landscape.'
            ],
            [
                'Moist forest habitat',
                '../../assets/travel_hidden.png',
                'Shaded, humid forests are central to the species story.'
            ],
            [
                'Endemic reptile learning',
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
            ['Camouflage expert', 'Its colours can help it blend into mossy rocks, leaves and branches.'],
            ['Important predator', 'The species helps maintain ecological balance by feeding on small animals.'],
            [
                'Observe safely',
                'The safest way to appreciate venomous snakes is through distance, photography and expert guidance.'
            ],
            [
                'Western Ghats story',
                'This snake helps students understand why the Western Ghats are a major biodiversity hotspot.'
            ]
        ],
        references: [
            [
                'Herpetology references',
                'Scientific name, taxonomy and natural-history context for Craspedocephalus malabaricus.'
            ],
            ['India Biodiversity Portal', 'Species record and Western Ghats biodiversity context.'],
            ['Western Ghats conservation literature', 'Habitat, endemicity and ecosystem context.'],
            ['Snake awareness resources', 'Safe-observation and snakebite-awareness context.']
        ],
        faqs: [
            ['What is the scientific name of the Malabar Pit Viper?', 'Craspedocephalus malabaricus.'],
            ['Where is it found?', 'It is associated with the Western Ghats of India.'],
            [
                'Is the Malabar Pit Viper venomous?',
                'Yes. It is venomous and should only be observed from a safe distance.'
            ],
            ['What does it eat?', 'It feeds on small animals such as frogs, lizards and other forest prey.'],
            [
                'What does this explorer cover?',
                'Introduction, scientific name, taxonomy, distribution, habitat, physical characteristics, behaviour, diet, reproduction, venom information, ecological role, conservation status, threats, facts, gallery and references.'
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
        'physical',
        'behaviour',
        'diet',
        'reproduction',
        'venom',
        'ecology',
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
    window.MalabarPitViperExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

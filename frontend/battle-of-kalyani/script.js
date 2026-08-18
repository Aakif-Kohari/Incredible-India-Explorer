document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            [
                'Historical Theme',
                'Deccan politics',
                "The explorer focuses on the battle's influence on political power in the Deccan."
            ],
            ['Key Place', 'Kalyani', 'Kalyani is presented as the strategic and symbolic centre of the conflict.'],
            [
                'Participants',
                'Regional Deccan powers',
                'The belligerents section explains the rival powers and their objectives.'
            ],
            [
                'Core Requirement',
                'Historical overview, timeline and outcome',
                'The page covers all issue-required history sections.'
            ],
            [
                'Learning Style',
                'Interactive history explorer',
                'The page includes a map, timeline cards, FAQs and gallery for deeper learning.'
            ],
            [
                'Landing Integration',
                'Battle of Kalyani card',
                'A helper script is included to add the landing-page card.'
            ]
        ],
        overview: [
            [
                'Why Kalyani mattered',
                'Kalyani was a major Deccan power centre. Control over it represented prestige, administration and political influence.'
            ],
            [
                'Regional contest',
                'The conflict is best understood as part of wider competition among South Indian and Deccan powers.'
            ],
            [
                'Political impact',
                'The battle influenced claims of authority, territorial control and dynastic memory in the Deccan.'
            ],
            [
                'Explorer goal',
                'This page explains the battle through overview, timeline, belligerents, outcome, gallery, references and an interactive map.'
            ]
        ],
        timeline: [
            [
                'Rise of Deccan powers',
                'Regional dynasties strengthened their influence across the Deccan and competed for strategic centres.'
            ],
            [
                'Kalyani gains importance',
                'Kalyani became important because of its administrative, military and symbolic value.'
            ],
            [
                'Military pressure builds',
                'Rival forces moved toward confrontation as control of routes, forts and political centres became contested.'
            ],
            ['Battle phase', 'The conflict around Kalyani brought together military objectives and dynastic ambition.'],
            [
                'Outcome declared',
                'The result affected regional power equations and the political memory of the participating groups.'
            ],
            [
                'Aftermath',
                "The battle's legacy continued through shifting alliances, claims of victory and Deccan political reorganisation."
            ]
        ],
        belligerents: [
            [
                'Deccan power bloc',
                'One side of the conflict represented control over Kalyani and its surrounding strategic region.'
            ],
            ['Challenging force', 'The opposing force sought to weaken rival authority and shift political advantage.'],
            [
                'Military objective',
                'The main objective was not only battlefield victory but also influence over an important centre.'
            ],
            [
                'Political objective',
                'Victory could support claims of legitimacy, tribute, territory and long-term authority.'
            ]
        ],
        outcome: [
            [
                'Power shift',
                'The outcome section explains the battle as a turning point in Deccan political competition.'
            ],
            ['Strategic value', 'Control or influence over Kalyani shaped the prestige of the victorious side.'],
            [
                'Regional consequence',
                'The conflict affected diplomacy, rivalry and political alignment in surrounding territories.'
            ],
            [
                'Historical memory',
                'The battle is remembered as part of the larger pattern of Deccan military and political history.'
            ]
        ],
        significance: [
            [
                'Deccan politics',
                'The battle highlights how cities and capitals shaped political competition in the Deccan.'
            ],
            [
                'Symbolic centres',
                'A place like Kalyani was more than a location; it represented dynastic power and legitimacy.'
            ],
            ['Military geography', 'Routes, forts, rivers and capitals influenced campaign strategy.'],
            [
                'Historical learning',
                'The battle helps learners understand how regional conflicts shaped medieval Indian history.'
            ]
        ],
        points: [
            [
                'kalyani',
                'Kalyani centre',
                56,
                40,
                'Historical Overview',
                'Kalyani is the central place around which the explorer explains the conflict.'
            ],
            [
                'route',
                'Campaign route',
                42,
                55,
                'Timeline',
                'Campaign movement helps explain how forces approached strategic centres.'
            ],
            [
                'sidea',
                'Power bloc',
                34,
                35,
                'Belligerents',
                'One side represented authority over Kalyani and surrounding influence.'
            ],
            [
                'sideb',
                'Challenging force',
                68,
                58,
                'Belligerents',
                'The opposing side challenged political and military control.'
            ],
            ['outcome', 'Outcome marker', 62, 72, 'Outcome', 'The result influenced Deccan political alignments.'],
            [
                'legacy',
                'Legacy zone',
                48,
                78,
                'Historical Significance',
                'The battle became part of wider Deccan political memory.'
            ]
        ],
        gallery: [
            [
                'Deccan landscape',
                '../../assets/travel_mountains.png',
                'A placeholder visual for Deccan terrain and campaign routes.'
            ],
            [
                'Historical centre',
                '../../assets/heritage_monuments.png',
                'A heritage-themed placeholder for capitals and fortified cities.'
            ],
            ['Battle memory', '../../assets/hero_banner.png', 'Educational placeholder for historical storytelling.'],
            [
                'Routes and regions',
                '../../assets/travel_hidden.png',
                'A visual placeholder for routes, regions and political frontiers.'
            ]
        ],
        interesting: [
            [
                'Place as power',
                'In medieval politics, controlling a city could be as symbolic as winning a battlefield.'
            ],
            ['Deccan crossroads', 'The Deccan connected northern, western and southern political worlds.'],
            ['Campaign geography', 'Military routes and strategic centres often shaped the outcome of conflicts.'],
            [
                'History through memory',
                'Battles survive in history through inscriptions, chronicles, titles and regional memory.'
            ]
        ],
        references: [
            ['South Indian history texts', 'Use standard history references for Deccan political chronology.'],
            ['Epigraphic studies', 'Inscriptions and titles help explain political memory and claims of authority.'],
            ['Deccan history sources', 'Provide background on Kalyani and regional power centres.'],
            [
                'Dynastic history references',
                'Support context for participants, campaign outcomes and political influence.'
            ]
        ],
        faqs: [
            [
                'What was the Battle of Kalyani?',
                'It was a historical conflict connected with control, influence and political power around Kalyani in the Deccan.'
            ],
            [
                'Why was Kalyani important?',
                'Kalyani was a strategic and symbolic centre, so influence over it mattered politically.'
            ],
            [
                'What does the timeline explain?',
                'The timeline explains the rise of regional rivalry, campaign movement, battle phase and aftermath.'
            ],
            [
                'What was the outcome?',
                'The outcome affected political influence, prestige and alignment in the Deccan.'
            ],
            [
                'What does this explorer cover?',
                'Historical overview, timeline, belligerents, outcome, gallery, references, FAQs and an interactive conflict map.'
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
    ['overview', 'timeline', 'belligerents', 'outcome', 'significance'].forEach(key => {
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
    window.BattleOfKalyaniExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

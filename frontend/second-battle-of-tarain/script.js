document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            [
                'Battle',
                'Second Battle of Tarain',
                'A major 1192 CE battle between Prithviraj Chauhan and Muhammad Ghori.'
            ],
            [
                'Year',
                '1192 CE',
                'The issue asks for the Second Battle of Tarain, a turning point in medieval Indian history.'
            ],
            ['Location', 'Tarain / Taraori region', 'Associated with Tarain near present-day Taraori in Haryana.'],
            [
                'Commanders',
                'Prithviraj Chauhan and Muhammad Ghori',
                'The commanders section is presented through battle context and formations.'
            ],
            [
                'Outcome',
                'Ghurid victory',
                "The battle ended with Muhammad Ghori's victory over Prithviraj Chauhan's forces."
            ],
            [
                'Long-term Impact',
                'Shift in north Indian politics',
                'The battle had major long-term consequences for medieval Indian history.'
            ]
        ],
        overview: [
            [
                'A decisive second encounter',
                'The Second Battle of Tarain followed the First Battle of Tarain and reversed the earlier result.'
            ],
            [
                'Why it mattered',
                'The battle is widely remembered as one of the major turning points in medieval north Indian political history.'
            ],
            ['Rival forces', "Prithviraj Chauhan's Rajput forces faced Muhammad Ghori's returning Ghurid army."],
            [
                'Explorer focus',
                'This page explains the battle through historical overview, timeline, formations, outcome, long-term impact, map, gallery and references.'
            ]
        ],
        timeline: [
            [
                '1191 CE first battle',
                "Prithviraj Chauhan's forces defeated Muhammad Ghori in the First Battle of Tarain."
            ],
            ['Ghurid preparation', 'Muhammad Ghori reorganised and prepared for a renewed campaign into north India.'],
            ['Return to Tarain', 'The Ghurid army returned to confront the Rajput forces near Tarain in 1192 CE.'],
            ['Battle formations', 'Different tactical styles and battlefield formations shaped the second encounter.'],
            ['Ghurid victory', "Muhammad Ghori's forces defeated Prithviraj Chauhan's army."],
            [
                'Aftermath',
                'The outcome changed the political direction of north India and opened space for new power structures.'
            ]
        ],
        formations: [
            [
                'Rajput battle line',
                'The Rajput side relied on traditional battlefield strength, close combat and heavy force concentration.'
            ],
            [
                'Ghurid cavalry mobility',
                'The Ghurid side used mobile cavalry, coordinated movement and mounted archery-style tactics.'
            ],
            [
                'Feigned retreat context',
                'Medieval accounts often discuss tactical deception and cavalry manoeuvres as important in the Ghurid victory.'
            ],
            [
                'Tactical contrast',
                'The battle is a strong lesson in how battlefield adaptation can change the result of a repeated conflict.'
            ]
        ],
        outcome: [
            ['Ghurid victory', "The immediate outcome was victory for Muhammad Ghori's forces."],
            [
                'Prithviraj defeated',
                "Prithviraj Chauhan's defeat became a major moment in north Indian political memory."
            ],
            ['Power transition', 'The result weakened Rajput control in the region and strengthened Ghurid influence.'],
            [
                'Aftermath of Tarain',
                'The second battle is studied as a turning point because its effects extended beyond the battlefield.'
            ]
        ],
        impact: [
            ['Political transformation', 'The battle contributed to major changes in north Indian power structures.'],
            [
                'Foundation for later rule',
                'The Ghurid success created conditions that helped later Turkic and Delhi-based political formations emerge.'
            ],
            [
                'Historical memory',
                'The battle became central to narratives about Prithviraj Chauhan, Muhammad Ghori and medieval India.'
            ],
            [
                'Military learning',
                'The contrast between the two Tarain battles highlights preparation, tactics and adaptation.'
            ]
        ],
        points: [
            [
                'first',
                'First Battle memory',
                34,
                68,
                'Timeline',
                'The 1191 result formed the background for the second encounter.'
            ],
            ['return', 'Ghurid return route', 46, 45, 'Timeline', 'Muhammad Ghori returned with renewed preparation.'],
            ['tarain', 'Tarain battlefield', 58, 37, 'Battle Site', 'The 1192 battle took place near Tarain.'],
            [
                'rajput',
                'Rajput line',
                48,
                58,
                'Battle Formations',
                'Rajput forces relied on heavy battlefield strength and close combat.'
            ],
            [
                'ghurid',
                'Ghurid cavalry manoeuvre',
                69,
                50,
                'Battle Formations',
                'Ghurid cavalry mobility and tactical adaptation shaped the battle.'
            ],
            [
                'legacy',
                'Long-term impact',
                57,
                76,
                'Long-term Impact',
                'The result changed north Indian political history.'
            ]
        ],
        gallery: [
            [
                'Tarain battlefield memory',
                '../../assets/hero_banner.png',
                'Educational placeholder for battle storytelling.'
            ],
            ['Campaign routes', '../../assets/travel_mountains.png', 'A placeholder visual for routes and terrain.'],
            [
                'Medieval heritage',
                '../../assets/heritage_monuments.png',
                'A heritage-themed placeholder for medieval political centres.'
            ],
            [
                'Battle formations',
                '../../assets/travel_hidden.png',
                'A visual placeholder for movement, tactics and formations.'
            ]
        ],
        interesting: [
            [
                'Back-to-back battles',
                'The First and Second Battles of Tarain happened in successive years, 1191 and 1192 CE.'
            ],
            ['Reversal of outcome', 'The second battle reversed the result of the first encounter.'],
            [
                'Tactics changed history',
                'The battle is often remembered for the role of cavalry tactics and adaptation.'
            ],
            [
                'Long historical shadow',
                'Its impact continued far beyond the battlefield because it affected political power in north India.'
            ]
        ],
        references: [
            [
                'Medieval Indian history texts',
                'Use standard academic references for the 1192 CE battle and its political context.'
            ],
            ['Tarain battle studies', 'Support timeline, tactical contrast and outcome details.'],
            ['Prithviraj Chauhan references', 'Provide context for Rajput leadership and historical memory.'],
            ['Ghurid campaign sources', "Provide background on Muhammad Ghori's return and long-term impact."]
        ],
        faqs: [
            [
                'What was the Second Battle of Tarain?',
                'It was a 1192 CE battle between Prithviraj Chauhan and Muhammad Ghori near Tarain.'
            ],
            ['Who won the Second Battle of Tarain?', "Muhammad Ghori's forces won the second battle."],
            [
                'Why is it important?',
                'It is considered a major turning point in medieval Indian history because it changed north Indian political power.'
            ],
            [
                'How was it different from the first battle?',
                'The first battle in 1191 ended in Rajput victory, while the second battle in 1192 ended in Ghurid victory.'
            ],
            [
                'What does this explorer cover?',
                'Historical overview, timeline, battle formations, outcome, long-term impact, gallery, references, FAQs and an interactive map.'
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
    ['overview', 'timeline', 'formations', 'outcome', 'impact'].forEach(key => {
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
    window.SecondBattleOfTarainExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

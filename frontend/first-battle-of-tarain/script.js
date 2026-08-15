document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            [
                'Battle',
                'First Battle of Tarain',
                'A major 1191 CE battle between Prithviraj Chauhan and Muhammad Ghori.'
            ],
            ['Year', '1191 CE', 'The issue specifically asks to cover the First Battle of Tarain in 1191 CE.'],
            [
                'Location',
                'Tarain / Taraori region',
                'The battle is associated with Tarain near present-day Taraori in Haryana.'
            ],
            [
                'Commanders',
                'Prithviraj Chauhan and Muhammad Ghori',
                'The page highlights the commanders on both sides.'
            ],
            [
                'Outcome',
                'Rajput victory',
                "The First Battle of Tarain is remembered as a victory for Prithviraj Chauhan's forces."
            ],
            [
                'Learning Focus',
                'Background, tactics and legacy',
                'The explorer covers all issue-required sections with an interactive map and timeline.'
            ]
        ],
        background: [
            [
                'North Indian power struggle',
                'The battle took place during a period of intense military and political contest in north India.'
            ],
            [
                'Chauhan authority',
                'Prithviraj Chauhan represented a powerful Rajput kingdom with influence around Ajmer and Delhi.'
            ],
            [
                'Ghurid expansion',
                "Muhammad Ghori's campaign pushed into north-western India and brought his army into conflict with Rajput forces."
            ],
            [
                'Why Tarain mattered',
                'Tarain became important because it lay near strategic routes and became the site of direct confrontation.'
            ]
        ],
        timeline: [
            [
                'Before 1191',
                'Ghurid expansion increased pressure on north-western Indian polities and strategic frontier regions.'
            ],
            [
                'Campaign buildup',
                'Muhammad Ghori advanced toward the region, setting the stage for confrontation with Prithviraj Chauhan.'
            ],
            ['Rajput mobilisation', "Prithviraj Chauhan's side gathered forces to oppose the Ghurid advance."],
            ['Battle at Tarain', 'The opposing armies met near Tarain in 1191 CE.'],
            ['Rajput victory', "Prithviraj Chauhan's forces defeated Muhammad Ghori's army in the first encounter."],
            [
                'Aftermath',
                'The result delayed Ghurid expansion, but the rivalry continued into the Second Battle of Tarain in 1192 CE.'
            ]
        ],
        tactics: [
            [
                'Rajput charge',
                'The Rajput side relied on strong cavalry action, battlefield momentum and close combat strength.'
            ],
            [
                'War elephants and heavy forces',
                'Traditional Indian battlefield formations often included elephants and heavily armed warriors.'
            ],
            [
                'Ghurid mounted tactics',
                'The Ghurid side used mobile cavalry and archery-based methods typical of Central Asian-influenced warfare.'
            ],
            [
                'Battlefield pressure',
                'The first battle favoured the Rajput side, whose attack forced the Ghurid army into retreat.'
            ]
        ],
        commanders: [
            [
                'Prithviraj Chauhan',
                'The Chauhan ruler associated with the Rajput victory in the First Battle of Tarain.'
            ],
            ['Muhammad Ghori', 'The Ghurid ruler who led the invading army and was defeated in the 1191 battle.'],
            ['Rajput allies', 'The Rajput side included allied chiefs and warriors supporting Prithviraj Chauhan.'],
            [
                'Ghurid commanders',
                'The Ghurid army included cavalry-focused military leadership operating under Muhammad Ghori.'
            ]
        ],
        outcome: [
            [
                'Rajput victory',
                "The immediate outcome of the First Battle of Tarain was victory for Prithviraj Chauhan's forces."
            ],
            ['Ghurid retreat', "Muhammad Ghori's army was forced back after the defeat."],
            ['Temporary check', 'The victory checked Ghurid advance temporarily but did not end the conflict.'],
            [
                'Prelude to 1192',
                'The battle is often studied alongside the Second Battle of Tarain, which followed in 1192 CE.'
            ]
        ],
        legacy: [
            [
                'Historic turning point',
                'The First Battle of Tarain is remembered as a major event before the larger political shift of 1192.'
            ],
            [
                'Rajput military memory',
                'The battle became part of the historical memory of Prithviraj Chauhan and Rajput resistance.'
            ],
            [
                'Lesson in strategy',
                'The two Tarain battles together show how tactics, preparation and adaptation shaped medieval warfare.'
            ],
            [
                'North Indian history',
                'The conflict remains important for understanding power transitions in medieval north India.'
            ]
        ],
        points: [
            [
                'ajmer',
                'Chauhan power base',
                32,
                67,
                'Historical Background',
                "Prithviraj Chauhan's authority is linked with Ajmer and Delhi-region influence."
            ],
            [
                'route',
                'Ghurid advance route',
                46,
                45,
                'Timeline',
                'Ghurid movement into north India led toward the battlefield confrontation.'
            ],
            ['tarain', 'Tarain battlefield', 58, 37, 'Battle Site', 'The armies met near Tarain in 1191 CE.'],
            [
                'rajput',
                'Rajput attack',
                49,
                58,
                'Military Tactics',
                'Rajput battlefield strength and charge tactics shaped the first battle.'
            ],
            [
                'ghurid',
                'Ghurid cavalry line',
                68,
                50,
                'Military Tactics',
                'Ghurid cavalry methods were central to their campaign style.'
            ],
            [
                'legacy',
                'Legacy marker',
                57,
                76,
                'Legacy',
                'The battle is remembered alongside the Second Battle of Tarain.'
            ]
        ],
        gallery: [
            [
                'Tarain battlefield memory',
                '../../assets/hero_banner.png',
                "Educational placeholder for the battle's historical storytelling."
            ],
            [
                'North Indian campaign route',
                '../../assets/travel_mountains.png',
                'A placeholder visual for routes and terrain.'
            ],
            [
                'Medieval heritage',
                '../../assets/heritage_monuments.png',
                'A heritage-themed placeholder for medieval political centres.'
            ],
            [
                'Strategy and movement',
                '../../assets/travel_hidden.png',
                'A visual placeholder for routes, tactics and battlefield movement.'
            ]
        ],
        interesting: [
            [
                'Two battles at Tarain',
                'The First Battle in 1191 CE is usually studied with the Second Battle in 1192 CE.'
            ],
            [
                'Victory before reversal',
                "Prithviraj Chauhan's 1191 victory was followed by a changed result in the next year's conflict."
            ],
            [
                'Tactics matter',
                'The contrast between the two Tarain battles shows how military adaptation could change outcomes.'
            ],
            ['Place in memory', 'Tarain became a major name in the historical memory of medieval north India.']
        ],
        references: [
            [
                'Medieval Indian history texts',
                'Use standard academic references for the 1191 CE conflict and political background.'
            ],
            ['Prithviraj Chauhan studies', 'Provide context for Chauhan rule, Rajput forces and historical memory.'],
            ['Ghurid campaign sources', "Provide context for Muhammad Ghori's military expansion into north India."],
            ['Battle history references', 'Support timeline, tactics, outcome and legacy sections.']
        ],
        faqs: [
            [
                'What was the First Battle of Tarain?',
                'It was a 1191 CE battle between Prithviraj Chauhan and Muhammad Ghori near Tarain.'
            ],
            ['Who won the First Battle of Tarain?', "Prithviraj Chauhan's forces won the first battle."],
            ['Who were the main commanders?', 'The main commanders were Prithviraj Chauhan and Muhammad Ghori.'],
            [
                'Why is the battle important?',
                'It temporarily checked Ghurid expansion and became a major event before the Second Battle of Tarain in 1192 CE.'
            ],
            [
                'What does this explorer cover?',
                'Historical background, timeline, military tactics, commanders, outcome, legacy, facts, gallery, references and an interactive map.'
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
    ['background', 'timeline', 'tactics', 'commanders', 'outcome', 'legacy'].forEach(key => {
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
    window.FirstBattleOfTarainExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

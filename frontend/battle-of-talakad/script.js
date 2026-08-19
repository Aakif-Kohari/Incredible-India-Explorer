document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            [
                'Conflict',
                'Battle of Talakad',
                'A major early-12th-century conflict connected with Hoysala expansion in southern Karnataka.'
            ],
            ['Date', 'c. 1116 CE', 'Usually placed in the reign of Hoysala ruler Vishnuvardhana.'],
            ['Location', 'Talakad, Karnataka', 'A historic town on the banks of the Kaveri River.'],
            ['Main Belligerents', 'Hoysalas and Cholas', 'The issue asks for participating kingdoms and belligerents.'],
            [
                'Outcome',
                'Hoysala victory',
                'The victory helped the Hoysalas expand in Gangavadi and reduce Chola power in the Mysore region.'
            ],
            [
                'Historical Significance',
                'Rise of Hoysala power',
                'The conflict is remembered as a turning point in Hoysala political emergence.'
            ]
        ],
        overview: [
            [
                'Context',
                'Talakad was a strategically important centre in the Kaveri region and part of the contest for control over Gangavadi.'
            ],
            [
                'Hoysala ambition',
                'Vishnuvardhana used military campaigns to challenge Chola authority and strengthen Hoysala power.'
            ],
            [
                'Chola position',
                'The Cholas had influence in the region through earlier campaigns and local administration.'
            ],
            [
                'Resulting shift',
                'The Hoysala success at Talakad helped change the balance of power in southern Karnataka.'
            ]
        ],
        timeline: [
            [
                'Before 11th century',
                'Talakad was associated with the Western Gangas and later became contested by larger powers.'
            ],
            ['Early 11th century', 'Chola expansion brought parts of Gangavadi and Talakad under Chola influence.'],
            ['c. 1116 CE', 'Vishnuvardhana’s Hoysala forces fought for Talakad and the surrounding region.'],
            [
                'After the battle',
                'Hoysala control expanded, and Vishnuvardhana gained the title Talakadugonda, meaning conqueror of Talakad.'
            ],
            [
                'Long-term impact',
                'The Hoysalas became a major force in Karnataka and developed important temple and political centres.'
            ]
        ],
        belligerents: [
            [
                'Hoysala Kingdom',
                'Led by Vishnuvardhana, the Hoysalas sought to expand beyond their earlier feudatory status.'
            ],
            [
                'Chola authority',
                'The Cholas represented the older imperial presence in Gangavadi and the Mysore region.'
            ],
            [
                'Regional commanders',
                'Local generals, governors and feudatories likely shaped the practical military campaign.'
            ],
            [
                'Strategic region',
                'The Kaveri belt made Talakad valuable for movement, revenue and political legitimacy.'
            ]
        ],
        outcome: [
            ['Hoysala success', 'The battle is remembered as a decisive Hoysala success against Chola influence.'],
            ['Territorial gain', 'Talakad and parts of Gangavadi came under stronger Hoysala control.'],
            ['Title and memory', 'Vishnuvardhana became associated with the title Talakadugonda after the victory.'],
            ['Dynastic rise', 'The result supported the Hoysalas’ rise as a major south Indian power.']
        ],
        significance: [
            [
                'Karnataka history',
                'The conflict is important for understanding medieval Karnataka and the rise of the Hoysalas.'
            ],
            ['South Indian politics', 'It shows how regional kingdoms challenged larger imperial powers.'],
            [
                'Cultural legacy',
                'Hoysala expansion later supported temple-building, art and architectural achievements.'
            ],
            [
                'Talakad memory',
                'The town remains historically layered, with associations from the Gangas, Cholas, Hoysalas and later dynasties.'
            ]
        ],
        points: [
            [
                'talakad',
                'Talakad on the Kaveri',
                38,
                37,
                'Location',
                'Talakad’s riverine position made it strategically valuable.'
            ],
            [
                'hoysala',
                'Hoysala advance',
                55,
                45,
                'Belligerents',
                'Hoysala forces pushed into the contested Gangavadi region.'
            ],
            [
                'chola',
                'Chola authority zone',
                66,
                35,
                'Belligerents',
                'The Cholas represented earlier imperial influence in the region.'
            ],
            [
                'battle',
                'Main conflict point',
                48,
                62,
                'Timeline',
                'The confrontation is commonly placed around 1116 CE.'
            ],
            [
                'outcome',
                'Hoysala victory marker',
                63,
                68,
                'Outcome',
                'The victory strengthened Hoysala power in southern Karnataka.'
            ],
            [
                'legacy',
                'Historical legacy',
                42,
                78,
                'Historical Significance',
                'The battle became part of the story of Hoysala emergence.'
            ]
        ],
        gallery: [
            [
                'Talakad river landscape',
                '../../assets/travel_rivers.png',
                'A placeholder visual for the Kaveri-side setting.'
            ],
            ['Medieval Karnataka', '../../assets/heritage_monuments.png', 'A heritage visual for dynastic history.'],
            [
                'Hoysala legacy',
                '../../assets/heritage_temples.png',
                'Temple heritage helps explain later Hoysala cultural importance.'
            ],
            [
                'Historic routes',
                '../../assets/travel_hidden.png',
                'A placeholder for movement routes and regional campaigns.'
            ]
        ],
        interesting: [
            [
                'Title Talakadugonda',
                'Vishnuvardhana is associated with the title conqueror of Talakad after this victory.'
            ],
            [
                'Regional turning point',
                'The conflict shows how a rising regional kingdom could weaken imperial control.'
            ],
            ['Kaveri strategy', 'River towns like Talakad mattered for trade, revenue and military movement.'],
            ['Layered town', 'Talakad carries memories of multiple dynasties, not only one battle.']
        ],
        references: [
            [
                'Political history of medieval Karnataka',
                'Background on Hoysala conflict with the Cholas and the Battle of Talakad.'
            ],
            ['Hoysala Kingdom history', 'Context for Vishnuvardhana and the title Talakadugonda.'],
            ['Medieval South Indian history sources', 'Broader Chola, Ganga and Hoysala political context.'],
            ['Talakad heritage references', 'Historical background on Talakad as a dynastic and sacred centre.']
        ],
        faqs: [
            ['When was the Battle of Talakad fought?', 'It is commonly placed around 1116 CE.'],
            [
                'Who fought in the Battle of Talakad?',
                'The main conflict was between the rising Hoysalas and Chola authority in the region.'
            ],
            ['Who won the battle?', 'The Hoysalas are remembered as the victors.'],
            [
                'Why was it important?',
                'It helped the Hoysalas expand in Gangavadi and strengthened their political rise.'
            ],
            [
                'What does this explorer cover?',
                'Historical overview, timeline, belligerents, outcome, references, facts, gallery, FAQs and landing-page integration.'
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
    window.BattleOfTalakadExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

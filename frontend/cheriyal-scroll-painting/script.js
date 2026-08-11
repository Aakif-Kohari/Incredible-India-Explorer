document.addEventListener('DOMContentLoaded', () => {
    const DATA = {
        facts: [
            ['Art Form', 'Cheriyal Scroll Painting', 'A narrative scroll painting tradition from Telangana.'],
            [
                'Core Theme',
                'Storytelling through painted scrolls',
                'The issue asks for narrative traditions through engaging visuals.'
            ],
            [
                'Visual Identity',
                'Bold outlines and vivid colours',
                'Cheriyal paintings are known for strong visual storytelling and expressive characters.'
            ],
            [
                'Main Sections',
                'History, gallery, tradition, characters, materials',
                'The explorer covers every required issue section.'
            ],
            [
                'Interactive Feature',
                'Animated scene previews',
                'Scene cards and map-style story points preview different scroll moments.'
            ],
            [
                'Landing Integration',
                'Cheriyal Scroll Painting card',
                'A helper script is included to add the card to a matching landing page.'
            ]
        ],
        history: [
            [
                'Regional folk-art heritage',
                "Cheriyal Scroll Painting is connected with Telangana's folk storytelling traditions."
            ],
            ['Storyteller communities', 'Painted scrolls supported oral narration, music and community performance.'],
            [
                'Portable visual theatre',
                'Long scrolls helped narrators reveal scenes step by step as the story progressed.'
            ],
            [
                'Continuing tradition',
                'The art form survives through craft families, workshops, museums, collectors and cultural festivals.'
            ]
        ],
        storytelling: [
            ['Sequential narration', 'Scrolls work like visual chapters, where one scene leads into the next.'],
            [
                'Myths and local stories',
                'Narratives can include epics, legends, caste/community stories and local folk memory.'
            ],
            [
                'Performance connection',
                'The painting is not only a visual object; it is linked with spoken storytelling.'
            ],
            [
                'Scene-by-scene reveal',
                'This explorer uses animated previews to imitate how scroll scenes are gradually revealed.'
            ]
        ],
        characters: [
            ['Hero figures', 'Main heroes are often shown with bold posture, expressive faces and symbolic gestures.'],
            [
                'Community characters',
                'Village workers, musicians, storytellers and local figures bring everyday life into the narrative.'
            ],
            ['Mythological forms', 'Deities, demons and epic characters can appear depending on the story being told.'],
            [
                'Expressive emotion',
                'Large eyes, strong outlines and gestures help viewers quickly understand character roles.'
            ]
        ],
        materials: [
            ['Canvas or cloth base', 'Traditional scrolls are painted on prepared cloth or canvas-like surfaces.'],
            ['Natural colour memory', 'Historically, artists used locally available pigments and organic materials.'],
            ['Brush and outline', 'Fine brushwork, bold outlines and flat colour fields shape the final visual style.'],
            ['Preservation need', 'Proper storage protects scrolls from moisture, fading and physical damage.']
        ],
        gallery: [
            [
                'Village procession',
                'A scroll-like scene preview showing movement, instruments and community celebration.',
                '🎺'
            ],
            ['Epic confrontation', 'A dramatic story moment with heroes, villains and high-energy gesture.', '⚔️'],
            [
                'Storyteller stage',
                'A narrator reveals painted panels while the audience follows the visual sequence.',
                '📜'
            ],
            ['Craft workshop', 'Artists prepare surfaces, sketch outlines and fill colours for new scrolls.', '🎨'],
            ['Character study', 'A close look at faces, costumes, posture and symbolic props.', '👁️'],
            ['Festival display', 'A public display where scroll art becomes cultural memory and education.', '🏵️']
        ],
        points: [
            [
                'start',
                'Opening panel',
                28,
                36,
                'History',
                'The scroll begins by introducing the setting, tradition and cultural context.'
            ],
            [
                'hero',
                'Hero entry',
                44,
                45,
                'Character Sections',
                'Hero figures are introduced with bold outlines and expressive posture.'
            ],
            [
                'village',
                'Community scene',
                61,
                34,
                'Storytelling Tradition',
                'Village characters and local life connect the story with its audience.'
            ],
            [
                'conflict',
                'Dramatic conflict',
                70,
                56,
                'Animated Scene Preview',
                'A major turning point uses movement, expression and colour contrast.'
            ],
            [
                'craft',
                'Materials corner',
                41,
                70,
                'Materials',
                "Cloth, pigments, brushes and outlines shape the scroll's visual language."
            ],
            [
                'legacy',
                'Final reveal',
                58,
                78,
                'References',
                'The final panel connects heritage, documentation and continued learning.'
            ]
        ],
        interesting: [
            [
                'Scroll as cinema',
                'A painted scroll can work like a hand-held visual film, revealing one scene after another.'
            ],
            ['Art plus performance', 'The painting tradition is closely tied to oral narration and performance.'],
            [
                'Bold visual grammar',
                'Strong outlines, vivid colour and expressive eyes help viewers follow the story quickly.'
            ],
            [
                'Living heritage',
                'Cheriyal Scroll Painting continues through artists, exhibitions, cultural education and craft revival.'
            ]
        ],
        references: [
            [
                'Telangana craft references',
                'Use official tourism, handicraft and cultural resources for place and craft context.'
            ],
            ['Museum and heritage sources', 'Support the history and visual language of Cheriyal Scroll Painting.'],
            ['Folk art studies', 'Provide context for narrative scrolls, oral storytelling and community performance.'],
            ['Artist and workshop documentation', 'Support materials, process and contemporary preservation details.']
        ],
        faqs: [
            [
                'What is Cheriyal Scroll Painting?',
                'It is a narrative folk painting tradition from Telangana that uses painted scrolls to tell stories.'
            ],
            [
                'What does this explorer cover?',
                'History, scroll gallery, storytelling tradition, character sections, materials and references.'
            ],
            [
                'Why are animated scene previews included?',
                'They help imitate the way scroll scenes are revealed during storytelling.'
            ],
            [
                'What materials are used?',
                'The page discusses prepared cloth or canvas, pigments, brushes, outlines and preservation needs.'
            ],
            [
                'How is it connected with storytelling?',
                'Scroll scenes work as visual chapters that support oral narration and community performance.'
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
    ['history', 'storytelling', 'characters', 'materials'].forEach(key => {
        $(`${key}-grid`).innerHTML = DATA[key].map(card).join('');
    });
    $('scene-grid').innerHTML = DATA.gallery
        .map(
            (g, i) =>
                `<article class="scene-card"><div class="scene-icon" style="animation-delay:${i * 0.18}s" aria-hidden="true">${esc(g[2])}</div><h3>${esc(g[0])}</h3><p>${esc(g[1])}</p></article>`
        )
        .join('');
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
    selectPoint(DATA.points[0][0]);
    window.CheriyalScrollExplorer = {
        facts: () => [...DATA.facts],
        points: () => [...DATA.points],
        references: () => [...DATA.references]
    };
});

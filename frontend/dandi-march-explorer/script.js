(() => {
    const stops = [
        [
            'Sabarmati Ashram',
            '12 Mar 1930',
            'The march begins with Gandhi and the selected group of satyagrahis setting out from Sabarmati Ashram.',
            '0%',
            12,
            72
        ],
        [
            'Aslali',
            '12 Mar',
            "The first day's halt established the rhythm of walking, meetings and public engagement.",
            '12%',
            24,
            64
        ],
        [
            'Nadiad',
            '15 Mar',
            'A major town in the route region where public interest and meetings helped connect the march to wider communities.',
            '24%',
            37,
            58
        ],
        [
            'Anand',
            '16 Mar',
            'The march passed through the Kheda region, drawing crowds and attention to the salt campaign.',
            '36%',
            48,
            51
        ],
        [
            'Borsad',
            '18 Mar',
            'A key locality in the wider Gujarat political landscape, included here as a route orientation point.',
            '50%',
            59,
            45
        ],
        [
            'Ankleshwar region',
            'Late Mar',
            'The march moved southward through Gujarat, with meetings and growing public participation.',
            '66%',
            70,
            39
        ],
        [
            'Navsari',
            '4 Apr',
            'The final stretch brought the march close to the coast and its intended destination.',
            '84%',
            80,
            32
        ],
        [
            'Dandi',
            '5 Apr',
            'The marchers reached Dandi on 5 April; the salt-law violation followed on 6 April.',
            '100%',
            90,
            25
        ]
    ];
    const pinBox = document.getElementById('route-pins'),
        panel = document.getElementById('stop-panel'),
        fill = document.getElementById('progress-fill'),
        pct = document.getElementById('progress-text');
    pinBox.innerHTML = stops
        .map(
            (s, i) =>
                `<button class="route-pin" style="left:${s[4]}%;top:${s[5]}%" data-i="${i}" aria-label="${s[0]}">${i + 1}</button>`
        )
        .join('');
    function select(i) {
        const s = stops[i];
        panel.innerHTML = `<span class="eyebrow">Stop ${i + 1} of ${stops.length}</span><h3>${s[0]}</h3><p><strong>${s[1]}</strong></p><p>${s[2]}</p>`;
        fill.style.width = s[3];
        pct.textContent = s[3];
    }
    document.querySelectorAll('.route-pin').forEach(b => (b.onclick = () => select(+b.dataset.i)));
    select(0);
    const timeline = [
        [
            '12 March 1930',
            'Sabarmati departure',
            'Gandhi and the marchers leave Sabarmati Ashram, turning the salt issue into a visible national campaign.'
        ],
        [
            '12–17 March',
            'Early route and meetings',
            'The march moves through villages and towns while public meetings explain the salt laws and the strategy of non-violent resistance.'
        ],
        [
            '18–27 March',
            'Southward across Gujarat',
            'Participation and attention grow as the march continues south through Gujarat.'
        ],
        [
            'Late March',
            'Civil disobedience gains momentum',
            'The route becomes a platform for speeches, local organization and preparation for salt-law defiance.'
        ],
        ['4 April', 'Final approach', 'The march reaches Navsari and the coastal stretch toward Dandi.'],
        ['5 April', 'Arrival at Dandi', 'Gandhi and the marchers reach Dandi.'],
        [
            '6 April 1930',
            'Salt-law violation',
            'Gandhi makes salt from seawater at Dandi, beginning a new phase of widespread civil disobedience.'
        ]
    ];
    document.getElementById('timeline-list').innerHTML = timeline
        .map(
            x =>
                `<article class="timeline-item"><span class="timeline-dot"></span><time>${x[0]}</time><h3>${x[1]}</h3><p>${x[2]}</p></article>`
        )
        .join('');
    const participants = [
        [
            '🕊️',
            'M. K. Gandhi',
            'Led the march and selected salt as a direct, widely understandable challenge to colonial authority.'
        ],
        [
            '🥁',
            '78 initial satyagrahis',
            "The original group accompanied Gandhi from Sabarmati and helped establish the march's disciplined non-violent character."
        ],
        [
            '🤝',
            'Local communities',
            'Villagers and townspeople hosted meetings, gathered along the route and helped turn the march into a public movement.'
        ],
        [
            '📣',
            'Congress volunteers',
            'Volunteers supported communication, organization and the spread of civil-disobedience activity.'
        ],
        [
            '🌊',
            'Salt workers & protesters',
            'Salt-law resistance expanded beyond Dandi as people challenged restrictions and made or collected salt in different regions.'
        ],
        [
            '📰',
            'International press',
            'Reports and photographs helped carry the story of the march and subsequent repression to audiences beyond India.'
        ]
    ];
    document.getElementById('participants-grid').innerHTML = participants
        .map(x => `<article class="card"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`)
        .join('');
    const refs = [
        [
            'Gandhi Heritage Portal',
            'Digitized writings and historical material relating to Gandhi and the Salt March.',
            'https://www.gandhiheritageportal.org/'
        ],
        [
            'National Archives of India',
            "Government archival resources for India's modern history.",
            'https://www.nationalarchives.nic.in/'
        ],
        [
            'Encyclopaedia Britannica',
            "Background on Gandhi, the Salt March and India's independence movement.",
            'https://www.britannica.com/event/Salt-March'
        ],
        [
            'National Gandhi Museum',
            'Museum collections and educational material related to Gandhi and the freedom movement.',
            'https://www.gandhimuseum.org/'
        ]
    ];
    document.getElementById('refs').innerHTML = refs
        .map(
            x =>
                `<article class="reference"><h3>${x[0]}</h3><p>${x[1]}</p><a href="${x[2]}" target="_blank" rel="noopener noreferrer">Open source ↗</a></article>`
        )
        .join('');
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
        window.Journey.registerSearchItems('dandi-march-explorer/index.html', [
            {
                id: 'dandi-march',
                title: 'Dandi March',
                description:
                    "Trace Gandhi's 1930 Salt March from Sabarmati Ashram to Dandi with an interactive route and timeline.",
                link: 'dandi-march-explorer/index.html'
            }
        ]);
})();

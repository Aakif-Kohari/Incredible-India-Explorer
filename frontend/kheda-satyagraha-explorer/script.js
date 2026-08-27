(() => {
    const places = {
        Nadiad: [
            'Nadiad',
            "A major town in Kheda district and an important point for understanding the movement's regional organization and communications."
        ],
        Kheda: [
            'Kheda',
            'The district headquarters gives the movement its name and anchors the administrative geography of the revenue dispute.'
        ],
        Borsad: [
            'Borsad',
            'A prominent locality in the wider Kheda region; use the marker as a regional orientation point rather than a claim that every event occurred here.'
        ],
        Kapadvanj: [
            'Kapadvanj',
            'A town in Kheda district included to show the wider geography in which agrarian grievances and political organization were discussed.'
        ]
    };
    const timeline = [
        [
            'Early 1918',
            'Agricultural distress becomes acute',
            "Poor harvest conditions and crop failure intensified cultivators' difficulty in meeting land-revenue obligations."
        ],
        [
            'March 1918',
            'Public organization',
            'Local leaders and volunteers worked to organize cultivators around demands for revenue relief and disciplined non-payment.'
        ],
        [
            'Spring 1918',
            "Gandhi and Patel's involvement",
            'M. K. Gandhi supported the satyagraha while Vallabhbhai Patel played a major role in local organization and leadership.'
        ],
        [
            'Spring–Summer 1918',
            'Refusal of revenue payments',
            "Participating cultivators were encouraged to maintain a collective, non-violent refusal under the campaign's conditions."
        ],
        [
            '1918',
            'Government response',
            'Officials continued collection efforts while the dispute moved through administrative pressure, negotiation and changing collection arrangements.'
        ],
        [
            'Later in 1918',
            'Concessions and settlement',
            "The campaign ended with revenue relief/collection accommodations that became associated with the movement's immediate outcome."
        ],
        [
            'After 1918',
            'Historical significance',
            'Kheda became an important example of satyagraha applied to an agrarian issue and strengthened experience in organized non-violent politics.'
        ]
    ];
    const leaders = [
        [
            '🕊️',
            'M. K. Gandhi',
            "Provided the satyagraha framework and supported the campaign around the cultivators' revenue grievance."
        ],
        [
            '✦',
            'Vallabhbhai Patel',
            'A key organizer and leader in the local campaign, helping translate the broader strategy into disciplined village-level action.'
        ],
        [
            '🤝',
            'Local cultivators',
            'The movement depended on collective participation, pledges, communication and willingness to withstand pressure.'
        ],
        [
            '📣',
            'Volunteers and organizers',
            "They carried messages, helped coordinate meetings and supported the campaign's discipline across the district."
        ],
        [
            '🏛️',
            'Colonial administration',
            'Revenue officials and the provincial government formed the institutional side of the dispute and responded through collection, pressure and negotiation.'
        ],
        [
            '🌾',
            'Agrarian communities',
            "The campaign's central social base was cultivators facing the economic consequences of poor agricultural conditions."
        ]
    ];
    document.getElementById('timeline-list').innerHTML = timeline
        .map(
            x =>
                `<article class="timeline-item"><span class="timeline-dot"></span><time>${x[0]}</time><h3>${x[1]}</h3><p>${x[2]}</p></article>`
        )
        .join('');
    document.getElementById('leaders-grid').innerHTML = leaders
        .map(x => `<article class="card"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`)
        .join('');
    const info = document.getElementById('place-info');
    document.querySelectorAll('.pin').forEach(b =>
        b.addEventListener('click', () => {
            const x = places[b.dataset.place];
            info.innerHTML = `<span class="eyebrow">Selected location</span><h3>${x[0]}</h3><p>${x[1]}</p>`;
        })
    );
    const refs = [
        [
            'Gandhi Heritage Portal',
            'Digitized writings and historical material relating to Gandhi and the freedom movement.',
            'https://www.gandhiheritageportal.org/'
        ],
        [
            'National Archives of India',
            "Government archival resources for India's modern history and colonial records.",
            'https://www.nationalarchives.nic.in/'
        ],
        [
            'Encyclopaedia Britannica',
            'Background reference for the Kheda campaign and Indian independence movement.',
            'https://www.britannica.com/'
        ],
        ['Gujarat Government', 'State-level cultural and historical resources.', 'https://gujaratindia.gov.in/']
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
        window.Journey.registerSearchItems('kheda-satyagraha-explorer/index.html', [
            {
                id: 'kheda-satyagraha',
                title: 'Kheda Satyagraha',
                description: 'Explore the 1918 Kheda Satyagraha, its causes, leaders, geography, timeline and outcome.',
                link: 'kheda-satyagraha-explorer/index.html'
            }
        ]);
})();

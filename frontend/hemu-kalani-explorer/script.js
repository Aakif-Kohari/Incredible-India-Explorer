(() => {
    const timeline = [
        ['1923', 'Birth in Sukkur', 'Hemu Kalani was born in Sukkur, Sindh, on 23 March 1923.'],
        [
            'Early 1940s',
            'Joins the freedom movement',
            'As a young man, he became involved in anti-colonial activity during a period of growing resistance.'
        ],
        [
            '1942',
            'Plan to disrupt military transport',
            'He and his companions attempted to remove railway fastenings to derail a train reported to be carrying British troops and supplies.'
        ],
        [
            '1942',
            'Arrest',
            'The operation was discovered before the plan could be completed, and Hemu Kalani was arrested by colonial authorities.'
        ],
        ['1943', 'Trial and sentence', 'He was tried by the colonial administration and sentenced to death.'],
        [
            '21 January 1943',
            'Execution',
            'Hemu Kalani was executed at a young age and became remembered as a martyr of the freedom struggle.'
        ],
        [
            'Today',
            'Commemoration',
            "His contribution is remembered through public commemorations, educational material and accounts of India's freedom movement."
        ]
    ];
    const activities = [
        [
            '🚆',
            'Disrupting military movement',
            'The central episode associated with Hemu Kalani is the attempt to interfere with a railway line used for British military transport.'
        ],
        [
            '🤝',
            'Collective action',
            'The planned operation involved companions and reflects the wider networks through which young people participated in resistance.'
        ],
        [
            '✊',
            'Youth participation',
            'His story illustrates the role played by young Indians in challenging colonial authority during the freedom movement.'
        ],
        [
            '⚖️',
            'Facing colonial prosecution',
            'After his arrest, the colonial justice system treated the attempted sabotage as a serious offence and imposed a death sentence.'
        ],
        [
            '🕯️',
            'Sacrifice',
            'His execution at a young age transformed his story into one of courage and sacrifice remembered in the freedom struggle.'
        ],
        [
            '📚',
            'Historical memory',
            'The explorer connects the event with the importance of preserving regional stories that may receive less attention in broad national narratives.'
        ]
    ];
    const legacy = [
        ['🏛️', 'Public remembrance', "Memorials and public references preserve Hemu Kalani's name and contribution."],
        [
            '🎓',
            'Educational legacy',
            'His story appears in freedom-struggle material that highlights youth participation and sacrifice.'
        ],
        [
            '🌏',
            'Sindhi heritage',
            'His memory is also significant within the historical heritage of the Sindhi community.'
        ],
        [
            '🇮🇳',
            'A freedom fighter remembered',
            "He remains an example of the many regional participants whose actions contributed to India's larger anti-colonial movement."
        ]
    ];
    const refs = [
        [
            'Government of India — Azadi Ka Amrit Mahotsav',
            'Official freedom-struggle resources and commemorative material.',
            'https://amritmahotsav.nic.in/'
        ],
        [
            'Indian Culture Portal',
            'Government-supported cultural resources and historical collections.',
            'https://indianculture.gov.in/'
        ],
        [
            'National Archives of India',
            "Primary-source and archival context for India's modern history.",
            'https://nationalarchives.nic.in/'
        ]
    ];
    document.getElementById('timeline-list').innerHTML = timeline
        .map(x => `<article class="event"><time>${x[0]}</time><h3>${x[1]}</h3><p>${x[2]}</p></article>`)
        .join('');
    const cards = (id, data) =>
        (document.getElementById(id).innerHTML = data
            .map(x => `<article class="card"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`)
            .join(''));
    cards('activity-grid', activities);
    cards('legacy-grid', legacy);
    document.getElementById('references-list').innerHTML = refs
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
        window.Journey.registerSearchItems('hemu-kalani-explorer/index.html', [
            {
                id: 'hemu-kalani',
                title: 'Hemu Kalani',
                description: "Explore Hemu Kalani's courageous resistance against colonial rule.",
                link: 'hemu-kalani-explorer/index.html'
            }
        ]);
})();

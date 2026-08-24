(() => {
    const timeline = [
        [
            'c. 1812',
            "The Government of India's Unsung Heroes profile gives about 1812 as Peer Ali Khan's birth year while noting that his birthplace is not firmly established."
        ],
        [
            'Before 1857',
            'Peer Ali lived in Patna and worked as a bookseller. Later official material and contemporary accounts connect his work and correspondence with anti-colonial organising.'
        ],
        [
            'July 1857',
            'Peer Ali played a leading role in organising the rising in Patna. Contemporary records describe meetings, correspondence and preparations involving his circle.'
        ],
        [
            '3–4 July 1857',
            'The Patna uprising was suppressed and Peer Ali was captured after resisting arrest. Sources differ on some details of the fighting and arrests.'
        ],
        [
            'July 1857',
            'Peer Ali was tried and sentenced to death by the colonial authorities. The Bihar State Archives catalogue preserves papers connected with the government case against him.'
        ],
        [
            '7 July 1857',
            "Peer Ali Khan was executed in Patna. The Government of India's commemorative profile records his execution as punishment for participation in the 1857 struggle."
        ],
        [
            'Today',
            'His name survives in Patna through public commemorations including a park and a road, while archival material continues to document his place in the 1857 uprising.'
        ]
    ];
    const revolt = [
        [
            '📚',
            'A bookseller as organiser',
            'His book trade placed him within an information network. Official and contemporary accounts associate his Patna residence and correspondence with the resistance.'
        ],
        [
            '📜',
            'Communication and mobilisation',
            'The surviving record describes letters, contacts and preparations that linked people in Patna with the wider climate of rebellion.'
        ],
        [
            '⚔️',
            'The July Patna rising',
            'Peer Ali is identified by the Government of India as a leading organiser of the July 1857 rising in Patna district.'
        ],
        [
            '🏛️',
            'A colonial prosecution',
            'After the uprising was suppressed, colonial authorities arrested and prosecuted Peer Ali and other participants.'
        ],
        [
            '🕯️',
            'Sacrifice',
            "He was sentenced to capital punishment and executed in July 1857, becoming one of the remembered martyrs of Bihar's resistance."
        ],
        [
            '🔎',
            'Recovering a forgotten story',
            "Modern commemorations and digitised archives have helped bring Peer Ali's contribution back into public historical memory."
        ]
    ];
    const legacy = [
        [
            '🌳',
            'Peer Ali Park',
            "A park near the Patna District Magistrate's residence was named Shaheed Peer Ali Khan Park by the Bihar government."
        ],
        [
            '🛣️',
            'A Patna road',
            "A road near Patna Airport also carries his name, providing a visible reminder of his place in the city's history."
        ],
        [
            '🗂️',
            'Archival record',
            'Bihar State Archives lists papers relating to the government case against Peer Ali Khan and other defendants in the 1857 revolt.'
        ],
        [
            '📖',
            'Unsung hero',
            "The Government of India's Amrit Mahotsav project profiles Peer Ali as an unsung freedom fighter and records his role in the Patna uprising."
        ]
    ];
    const refs = [
        [
            '🇮🇳',
            'Government of India — Amrit Mahotsav',
            "Official Unsung Heroes profile for Peer Ali Khan, including his occupation, role in Patna's July 1857 rising, execution and commemorations.",
            'https://amritmahotsav.nic.in/unsung-heroes-detail.htm?328='
        ],
        [
            '🏛️',
            'Bihar State Archives',
            "The archive's Independence Day collection lists the government case papers concerning Peer Ali Khan and other defendants.",
            'https://archives.bihar.gov.in/independenceday/'
        ],
        [
            '📜',
            "William Tayler's contemporary account",
            "The colonial commissioner's narrative records the Patna outbreak, Peer Ali's capture and prosecution. It is a primary source and should be read with its colonial perspective in mind.",
            'https://archives.peoplesdemocracy.in/2007/0909/09092007_1857.html'
        ],
        [
            '📰',
            'Times of India — Patna history',
            "A later historical feature discusses Peer Ali's role, arrest, execution and commemoration in Patna.",
            'https://timesofindia.indiatimes.com/city/patna/peer-ali-the-lost-hero-of-1857-revolt/articleshow/112536464.cms'
        ]
    ];

    const cards = (id, data) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = data
            .map(
                ([icon, title, text]) =>
                    `<article class="peer-card"><div class="icon" aria-hidden="true">${icon}</div><h3>${title}</h3><p>${text}</p></article>`
            )
            .join('');
    };
    const tl = document.getElementById('timeline-list');
    if (tl)
        tl.innerHTML = timeline
            .map(
                ([date, title], i) =>
                    `<article class="peer-event"><time>${date}</time><h3>${title}</h3><p>${['The date is approximate where the surviving official source says so.', 'Patna became the centre of his public and clandestine activity.', 'His contribution belongs to the local organisation of the wider 1857 uprising.', 'The exact sequence of individual arrests is reported differently in later accounts.', 'The Bihar State Archives catalogue confirms the existence of case papers.', "The Government of India's official commemorative profile records his execution in July 1857.", 'His memory continues through public places and archival preservation.'][i]}</p></article>`
            )
            .join('');
    cards('revolt-grid', revolt);
    cards('legacy-grid', legacy);

    const refsEl = document.getElementById('reference-list');
    if (refsEl)
        refsEl.innerHTML = refs
            .map(
                ([icon, title, text, url]) =>
                    `<article class="peer-reference"><div class="ref-icon" aria-hidden="true">${icon}</div><div><h3>${title}</h3><p>${text}</p><a href="${url}" target="_blank" rel="noopener noreferrer">Open source ↗</a></div></article>`
            )
            .join('');

    const menu = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-menu');
    if (menu && nav) menu.addEventListener('click', () => nav.classList.toggle('active'));
    document.querySelectorAll('.peer-section-nav a').forEach(a =>
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        })
    );

    if (window.Journey?.registerSearchItems) {
        window.Journey.registerSearchItems('peer-ali-khan-explorer/index.html', [
            {
                id: 'peer-ali-khan-story',
                title: 'Peer Ali Khan',
                description: "Explore Peer Ali Khan's contribution to the Revolt of 1857 in Patna.",
                link: 'peer-ali-khan-explorer/index.html'
            }
        ]);
    }
    if (window.Journey?.toggle) {
        document.querySelectorAll('.peer-card').forEach((card, i) => {
            const title = card.querySelector('h3')?.textContent || 'Peer Ali Khan';
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'peer-save';
            btn.textContent = '☆ Save';
            btn.setAttribute('aria-label', `Save ${title} to My Journey`);
            btn.addEventListener('click', () =>
                window.Journey.toggle({
                    id: `peer-ali-khan-${i}`,
                    explorerPage: 'peer-ali-khan-explorer/index.html',
                    title,
                    thumbnail: 'assets/peer-ali-khan-placeholder.svg',
                    category: 'Freedom Fighters'
                })
            );
            card.appendChild(btn);
        });
    }
})();

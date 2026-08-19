// Tribal Resistance Movements Explorer
// Data-driven interactive map, filters, timeline, leader cards, and comparison.

(function () {
  'use strict';

  const REGIONS = [
    { key: 'jharkhand-bengal', label: 'Jharkhand–Bengal', color: '#f59e0b' },
    { key: 'andhra-eastern-ghats', label: 'Andhra–Eastern Ghats', color: '#ec4899' },
    { key: 'rajasthan-gujarat', label: 'Rajasthan–Gujarat', color: '#8b5cf6' },
    { key: 'chhattisgarh', label: 'Chhattisgarh', color: '#10b981' },
    { key: 'northeast', label: 'Northeast India', color: '#38bdf8' },
    { key: 'meghalaya', label: 'Meghalaya', color: '#f472b6' },
    { key: 'maharashtra', label: 'Maharashtra', color: '#fb923c' }
  ];

  const ERAS = [
    { key: 'era1', label: '1810s–1830s' },
    { key: 'era2', label: '1850s–1900s' },
    { key: 'era3', label: '1910s–1920s' },
    { key: 'era4', label: '1930s–1940s' }
  ];

  const MOVEMENTS = [
    {
      id: 'khasi-uprising',
      name: 'Khasi Uprising',
      leaders: ['U Tirot Sing'],
      years: '1829–1833',
      startYear: 1829,
      era: 'era1',
      region: 'meghalaya',
      regionLabel: 'Khasi Hills, Meghalaya',
      x: 428, y: 140,
      causes: [
        'British plan to build a road through Khasi territory linking Assam with Sylhet',
        'Perceived breach of an earlier agreement respecting Khasi self-rule',
        'Loss of control over regional trade routes'
      ],
      summary: 'One of the earliest organised tribal revolts against the East India Company, led by the Syiem (chief) of Nongkhlaw against British road-building and encroachment on Khasi autonomy.',
      outcome: 'U Tirot Sing waged a four-year guerrilla resistance before being captured in 1833; he died in captivity in Dhaka. He is commemorated as an early anti-colonial resistance leader.',
      sources: [
        'Gazetteer of the Khasi and Jaintia Hills',
        'Verrier Elwin, "India\u2019s North-East Frontier in the Nineteenth Century"'
      ]
    },
    {
      id: 'kol-rebellion',
      name: 'Kol Rebellion (Kol Vidroha)',
      leaders: ['Buddhu Bhagat', 'Joa Bhagat'],
      years: '1831–1832',
      startYear: 1831,
      era: 'era1',
      region: 'jharkhand-bengal',
      regionLabel: 'Chotanagpur, Jharkhand',
      x: 300, y: 262,
      causes: [
        'Transfer of tribal land to outsider contractors, moneylenders and revenue farmers',
        'Erosion of customary land rights held by Kol chiefs',
        'Harsh new revenue and rent demands'
      ],
      summary: 'Kol cultivators of Chotanagpur rose up against the settlement of non-tribal landlords and moneylenders on land traditionally held under tribal tenure.',
      outcome: 'Put down militarily after heavy loss of life; prompted the colonial government to create separate administrative arrangements for Chotanagpur.',
      sources: [
        'K.S. Singh, "Colonial Transformation of Tribal Society in Middle India"',
        'S.C. Roy, "The Mundas and Their Country"'
      ]
    },
    {
      id: 'bhil-resistance',
      name: 'Bhil Resistance & Bhagat Movement',
      leaders: ['Govind Guru', 'Tantya Bhil'],
      years: '1818–1922 (multiple phases)',
      startYear: 1818,
      era: 'era1',
      region: 'rajasthan-gujarat',
      regionLabel: 'Banswara–Dungarpur–Vagad belt, Rajasthan–Gujarat–MP border',
      x: 168, y: 300,
      causes: [
        'Loss of forest and grazing land after the 1818 uprisings',
        'Exploitative revenue settlements and exactions by feudal chiefs',
        'The Bhagat reform movement\u2019s opposition to liquor and forced levies',
        'Large peaceful gathering fired upon at Mangarh Hill in 1913'
      ],
      summary: 'A long tradition of Bhil resistance beginning with the 1818 uprisings and continuing through Govind Guru\u2019s Bhagat reform-and-resistance movement, which combined social reform with opposition to colonial and feudal exploitation.',
      outcome: 'Colonial and state forces killed well over a thousand Bhils gathered at Mangarh Hill on 17 November 1913; the Bhagat movement nonetheless continued as a long-running reform tradition.',
      sources: [
        'Govind Guru: Adivasi Freedom Fighter (Government of Rajasthan archives)',
        'Sundar, Nandini, "Subalterns and Sovereigns"'
      ]
    },
    {
      id: 'santhal-hul',
      name: 'Santhal Hul (Santhal Rebellion)',
      leaders: ['Sidhu Murmu', 'Kanhu Murmu', 'Chand Murmu', 'Bhairav Murmu'],
      years: '1855–1856',
      startYear: 1855,
      era: 'era2',
      region: 'jharkhand-bengal',
      regionLabel: 'Santhal Parganas, Jharkhand–Bengal border',
      x: 345, y: 258,
      causes: [
        'Exploitation by moneylenders (mahajans) and outsider zamindars',
        'Oppressive land revenue and rent demands under the Permanent Settlement',
        'Corrupt police and lower courts offering no redress',
        'Loss of traditional communal land rights'
      ],
      summary: 'Sidhu and Kanhu Murmu gathered thousands of Santhals at Bhognadih to declare Hul (rebellion), attacking symbols of moneylender and colonial authority across the Santhal Parganas.',
      outcome: 'Suppressed by colonial troops with heavy casualties; led directly to the creation of the Santhal Parganas as a separate, protected administrative district in 1855–56.',
      sources: [
        'Kumkum Chatterjee, "Communities, Kings and Chiefs"',
        'National Archives of India, Santhal Parganas records'
      ]
    },
    {
      id: 'koya-resistance',
      name: 'Koya Resistance (Rampa Fituris)',
      leaders: ['Tomma Sora', 'Raja Anantayyar'],
      years: '1879–1880 & 1922–1924',
      startYear: 1879,
      era: 'era2',
      region: 'andhra-eastern-ghats',
      regionLabel: 'Godavari Agency, Andhra–Telangana border',
      x: 300, y: 372,
      causes: [
        'Forest laws restricting podu (shifting cultivation)',
        'Exploitation by non-tribal traders and moneylenders (sahukars)',
        'Forced, unpaid labour demanded for road and infrastructure works',
        'Loss of self-governance under the Muttadar revenue system'
      ],
      summary: 'Koya cultivators of the Godavari Agency rose twice against colonial forest and revenue policy — first in the 1879–80 Rampa Fituri, and again as core participants alongside the Konda Reddis in the 1922–24 Rampa Rebellion.',
      outcome: 'The 1879–80 revolt was suppressed by Madras armed police; Koya grievances fed directly into the larger Rampa Rebellion of 1922 four decades later.',
      sources: [
        'David Arnold, "Rebellious Hillmen: The Gudem-Rampa Risings"',
        'Andhra Pradesh State Archives, Godavari Agency records'
      ]
    },
    {
      id: 'munda-ulgulan',
      name: 'Munda Ulgulan',
      leaders: ['Birsa Munda'],
      years: '1899–1900',
      startYear: 1899,
      era: 'era2',
      region: 'jharkhand-bengal',
      regionLabel: 'Chotanagpur Plateau, Jharkhand',
      x: 315, y: 288,
      causes: [
        'Loss of khuntkatti (communal land) rights to outsider landlords and moneylenders (dikus)',
        'Forced, unpaid labour (beth begari) demanded by landlords and missionaries',
        'Erosion of traditional Munda self-governance',
        'Religious and cultural interference by missionaries and the state'
      ],
      summary: 'Birsa Munda led the Ulgulan ("Great Tumult"), combining a religious revival with armed resistance against landlords, moneylenders and the colonial state across the Chotanagpur Plateau.',
      outcome: 'Birsa Munda was captured and died in jail in June 1900; the rebellion directly led to the Chotanagpur Tenancy Act of 1908, which protected tribal land from alienation.',
      sources: [
        'K.S. Singh, "Birsa Munda and His Movement 1874–1901"',
        'Chotanagpur Tenancy Act, 1908 (Government of India)'
      ]
    },
    {
      id: 'bastar-bhumkal',
      name: 'Bastar Bhumkal',
      leaders: ['Gunda Dhur'],
      years: '1910',
      startYear: 1910,
      era: 'era3',
      region: 'chhattisgarh',
      regionLabel: 'Bastar, Chhattisgarh',
      x: 258, y: 338,
      causes: [
        'Reservation of forests, restricting shifting cultivation and grazing',
        'Sharply increased begar (forced labour) demands',
        'Exploitation by outside traders, contractors and court officials'
      ],
      summary: 'Known as the Bhumkal ("earthquake"), Gunda Dhur led Gonds and Muria and Maria Adivasis of Bastar in a coordinated uprising against forest reservation and forced-labour policy.',
      outcome: 'Suppressed by force within months, but the scale of the revolt forced a review of forest and revenue policy in Bastar State.',
      sources: [
        'Nandini Sundar, "Subalterns and Sovereigns: An Anthropological History of Bastar"',
        'Bastar State Gazetteer'
      ]
    },
    {
      id: 'tana-bhagat',
      name: 'Tana Bhagat Movement',
      leaders: ['Jatra Bhagat', 'Turia Bhagat'],
      years: '1914–1920s',
      startYear: 1914,
      era: 'era3',
      region: 'jharkhand-bengal',
      regionLabel: 'Chotanagpur Plateau, Jharkhand (Oraon areas)',
      x: 288, y: 300,
      causes: [
        'Continuing exploitation by landlords and moneylenders after the Ulgulan',
        'Desire among the Oraon for religious and social reform',
        'Refusal to pay begar (forced labour) and disputed rents',
        'Growing links with the wider non-cooperation movement'
      ],
      summary: 'Jatra Bhagat founded a religious reform movement among the Oraon that evolved into an organised, largely non-violent campaign of non-cooperation and rent refusal against landlords and the colonial state.',
      outcome: 'The movement shifted toward non-violent resistance; many Tana Bhagats later joined Gandhi\u2019s non-cooperation and civil disobedience campaigns.',
      sources: [
        'Kumar Suresh Singh, "Tribal Movements in India" (Vol. I)',
        'Sangeeta Dasgupta, "Reordering a World: The Tana Bhagat Movement"'
      ]
    },
    {
      id: 'rampa-rebellion',
      name: 'Rampa Rebellion',
      leaders: ['Alluri Sitarama Raju'],
      years: '1922–1924',
      startYear: 1922,
      era: 'era3',
      region: 'andhra-eastern-ghats',
      regionLabel: 'Godavari Agency, Eastern Ghats, Andhra',
      x: 292, y: 398,
      causes: [
        'Madras Forest Act (1882) restricting podu (shifting cultivation)',
        'Curtailment of traditional forest-produce rights',
        'Forced, unpaid labour (vetti) demanded for road construction',
        'Excise and toddy-tapping restrictions'
      ],
      summary: 'Alluri Sitarama Raju led Koya and Konda Reddi Adivasis in a guerrilla campaign against Madras Forest Act restrictions and colonial administration in the Eastern Ghats.',
      outcome: 'Raju was captured and executed in May 1924; the rebellion became a defining symbol of armed tribal resistance and inspired a dedicated explorer elsewhere on this site.',
      link: { href: '../rampa-rebellion-explorer/index.html', label: 'Open the dedicated Rampa Rebellion Explorer →' },
      sources: [
        'David Arnold, "Rebellious Hillmen: The Gudem-Rampa Risings, 1839–1924"',
        'Madras Forest Act, 1882 (Government of Madras)'
      ]
    },
    {
      id: 'rani-gaidinliu',
      name: 'Rani Gaidinliu\u2019s Heraka Movement',
      leaders: ['Rani Gaidinliu', 'Haipou Jadonang'],
      years: '1930s–1947',
      startYear: 1931,
      era: 'era4',
      region: 'northeast',
      regionLabel: 'Zeliangrong areas, Manipur–Nagaland–Assam border',
      x: 452, y: 200,
      causes: [
        'Colonial interference in Zeliangrong tribal self-rule',
        'The Heraka religious reform movement\u2019s call for cultural revival',
        'Opposition to British administrative control and taxation',
        'Suppression that followed Jadonang\u2019s execution in 1931'
      ],
      summary: 'Rani Gaidinliu continued Haipou Jadonang\u2019s Heraka religious and political revival movement, organising Zeliangrong resistance to colonial rule across the Manipur–Nagaland–Assam border areas while still in her teens.',
      outcome: 'Captured in 1932 and imprisoned for 14 years, Gaidinliu was released in 1947 and later honoured by independent India as a freedom fighter.',
      sources: [
        'Gangmumei Kamei, "Rani Gaidinliu"',
        'Government of India, Padma Bhushan citation (1972)'
      ]
    },
    {
      id: 'warli-revolt',
      name: 'Warli Revolt',
      leaders: ['Godavari Parulekar', 'Shamrao Parulekar'],
      years: '1945–1947',
      startYear: 1945,
      era: 'era4',
      region: 'maharashtra',
      regionLabel: 'Thane–Palghar (Warli belt), Maharashtra',
      x: 192, y: 400,
      causes: [
        'Bonded labour (veth begar) demanded by landlords',
        'Extremely low, often unpaid, wages for forest and agricultural labour',
        'Organising support of the Kisan Sabha for tribal land and labour rights'
      ],
      summary: 'Warli Adivasis, organised with the Kisan Sabha, launched a mass movement against bonded labour and landlord exploitation in the forests of Thane district, led by Godavari and Shamrao Parulekar.',
      outcome: 'One of the last major pre-independence tribal uprisings; it fed directly into post-independence bonded-labour abolition and land-reform legislation.',
      sources: [
        'Godavari Parulekar, "Adivasis Revolt: The Story of the Warli Peasants in Struggle"',
        'Bonded Labour System (Abolition) Act, 1976 (Government of India)'
      ]
    }
  ];

  const state = {
    region: 'all',
    era: 'all',
    compareMode: false,
    compareSelection: [],
    activeId: null
  };

  const byId = (id) => MOVEMENTS.find((m) => m.id === id);

  function visibleMovements() {
    return MOVEMENTS.filter((m) => {
      const regionOk = state.region === 'all' || m.region === state.region;
      const eraOk = state.era === 'all' || m.era === state.era;
      return regionOk && eraOk;
    });
  }

  function regionMeta(key) {
    return REGIONS.find((r) => r.key === key);
  }

  // ---------- Filters ----------
  function renderFilters() {
    const regionWrap = document.getElementById('region-filters');
    const eraWrap = document.getElementById('era-filters');

    const regionChips = ['<button class="chip-btn filter-chip active" data-region="all" type="button">All regions</button>']
      .concat(REGIONS.map((r) => `<button class="chip-btn filter-chip" data-region="${r.key}" type="button" style="--chip-color:${r.color}">${r.label}</button>`));
    regionWrap.innerHTML = regionChips.join('');

    const eraChips = ['<button class="chip-btn filter-chip active" data-era="all" type="button">All periods</button>']
      .concat(ERAS.map((e) => `<button class="chip-btn filter-chip" data-era="${e.key}" type="button">${e.label}</button>`));
    eraWrap.innerHTML = eraChips.join('');

    regionWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-region]');
      if (!btn) return;
      state.region = btn.dataset.region;
      [...regionWrap.children].forEach((c) => c.classList.toggle('active', c === btn));
      refresh();
    });

    eraWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-era]');
      if (!btn) return;
      state.era = btn.dataset.era;
      [...eraWrap.children].forEach((c) => c.classList.toggle('active', c === btn));
      refresh();
    });

    document.getElementById('clear-filters-btn').addEventListener('click', () => {
      state.region = 'all';
      state.era = 'all';
      renderFilters();
      refresh();
    });

    document.getElementById('compare-mode-btn').addEventListener('click', (e) => {
      state.compareMode = !state.compareMode;
      state.compareSelection = [];
      e.currentTarget.classList.toggle('active', state.compareMode);
      e.currentTarget.setAttribute('aria-pressed', String(state.compareMode));
      document.getElementById('comparison-section').hidden = true;
      refresh();
    });

    document.getElementById('close-comparison-btn').addEventListener('click', () => {
      document.getElementById('comparison-section').hidden = true;
    });
  }

  // ---------- Legend ----------
  function renderLegend() {
    const legend = document.getElementById('map-legend');
    legend.innerHTML = REGIONS.map((r) => `
      <span class="legend-item"><span class="legend-dot" style="background:${r.color}"></span>${r.label}</span>
    `).join('');
  }

  // ---------- Map ----------
  function renderMap() {
    const layer = document.getElementById('markers-layer');
    const visible = visibleMovements();
    const visibleIds = new Set(visible.map((m) => m.id));

    layer.innerHTML = MOVEMENTS.map((m) => {
      const meta = regionMeta(m.region);
      const dim = visibleIds.has(m.id) ? '' : 'dimmed';
      const active = state.activeId === m.id ? 'active-marker' : '';
      const selected = state.compareSelection.includes(m.id) ? 'compare-selected' : '';
      return `
        <g class="map-marker ${dim} ${active} ${selected}" data-id="${m.id}" transform="translate(${m.x}, ${m.y})" tabindex="0" role="button" aria-label="${m.name}">
          <circle r="9" fill="${meta.color}" filter="url(#marker-glow)" />
          <circle r="9" fill="${meta.color}" opacity="0.35" class="pulse-ring" />
          <text y="-14" text-anchor="middle" class="marker-label">${m.name}</text>
        </g>
      `;
    }).join('');

    layer.querySelectorAll('.map-marker').forEach((g) => {
      g.addEventListener('click', () => handleSelect(g.dataset.id));
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(g.dataset.id);
        }
      });
    });
  }

  // ---------- Timeline ----------
  function renderTimeline() {
    const wrap = document.getElementById('timeline-list');
    const sorted = [...MOVEMENTS].sort((a, b) => a.startYear - b.startYear);
    const visible = visibleMovements();
    const visibleIds = new Set(visible.map((m) => m.id));

    wrap.innerHTML = sorted.map((m) => {
      const meta = regionMeta(m.region);
      const dim = visibleIds.has(m.id) ? '' : 'dimmed';
      return `
        <button class="timeline-entry ${dim}" data-id="${m.id}" type="button" style="--dot-color:${meta.color}">
          <span class="timeline-dot"></span>
          <span class="timeline-year">${m.years}</span>
          <span class="timeline-name">${m.name}</span>
        </button>
      `;
    }).join('');

    wrap.querySelectorAll('.timeline-entry').forEach((btn) => {
      btn.addEventListener('click', () => handleSelect(btn.dataset.id));
    });
  }

  // ---------- Cards ----------
  function renderCards() {
    const wrap = document.getElementById('movement-cards');
    const visible = visibleMovements();

    if (visible.length === 0) {
      wrap.innerHTML = '<p class="no-results">No movements match the selected filters.</p>';
      return;
    }

    wrap.innerHTML = visible.map((m) => {
      const meta = regionMeta(m.region);
      const checked = state.compareSelection.includes(m.id) ? 'checked' : '';
      const compareControl = state.compareMode
        ? `<label class="compare-check" onclick="event.stopPropagation()">
             <input type="checkbox" data-compare-id="${m.id}" ${checked} /> Compare
           </label>`
        : '';
      return `
        <article class="movement-card" data-id="${m.id}" tabindex="0" style="--card-accent:${meta.color}">
          <div class="movement-card-top">
            <span class="region-badge" style="background:${meta.color}22;color:${meta.color}">${meta.label}</span>
            <span class="years-badge">${m.years}</span>
          </div>
          <h3>${m.name}</h3>
          <p class="leader-line">👤 ${m.leaders.join(', ')}</p>
          <p class="card-summary">${m.summary}</p>
          ${compareControl}
        </article>
      `;
    }).join('');

    wrap.querySelectorAll('.movement-card').forEach((card) => {
      card.addEventListener('click', () => handleSelect(card.dataset.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(card.dataset.id);
        }
      });
    });

    wrap.querySelectorAll('[data-compare-id]').forEach((cb) => {
      cb.addEventListener('change', (e) => {
        toggleCompare(e.target.dataset.compareId, e.target.checked);
      });
    });
  }

  // ---------- Detail panel ----------
  function renderDetail(id) {
    const section = document.getElementById('detail-section');
    const m = byId(id);
    if (!m) {
      section.innerHTML = '<p class="detail-placeholder">Select a movement from the map, timeline, or cards below to see its leaders, causes, outcome, and sources.</p>';
      return;
    }
    const meta = regionMeta(m.region);

    section.innerHTML = `
      <div class="detail-card" style="--card-accent:${meta.color}">
        <div class="detail-header">
          <div>
            <span class="region-badge" style="background:${meta.color}22;color:${meta.color}">${m.regionLabel}</span>
            <h2>${m.name}</h2>
            <p class="timeframe">${m.years}</p>
          </div>
        </div>

        <div class="leader-cards">
          ${m.leaders.map((l) => `<div class="leader-card"><span class="leader-icon">👤</span><span>${l}</span></div>`).join('')}
        </div>

        <p class="detail-summary">${m.summary}</p>

        <div class="detail-grid">
          <div class="detail-block">
            <h3>Causes &amp; Grievances</h3>
            <ul>${m.causes.map((c) => `<li>${c}</li>`).join('')}</ul>
          </div>
          <div class="detail-block">
            <h3>Outcome</h3>
            <p>${m.outcome}</p>
          </div>
        </div>

        <div class="detail-block sources-block">
          <h3>Sources</h3>
          <ul>${m.sources.map((s) => `<li>${s}</li>`).join('')}</ul>
        </div>

        ${m.link ? `<a class="detail-link" href="${m.link.href}">${m.link.label}</a>` : ''}
      </div>
    `;
  }

  // ---------- Comparison ----------
  function toggleCompare(id, checked) {
    if (checked) {
      if (state.compareSelection.length >= 2) {
        state.compareSelection.shift();
      }
      state.compareSelection.push(id);
    } else {
      state.compareSelection = state.compareSelection.filter((x) => x !== id);
    }
    renderCards();
    renderMap();
    if (state.compareSelection.length === 2) {
      renderComparison();
    } else {
      document.getElementById('comparison-section').hidden = true;
    }
  }

  function renderComparison() {
    const [aId, bId] = state.compareSelection;
    const a = byId(aId);
    const b = byId(bId);
    if (!a || !b) return;

    const rows = [
      ['Region', a.regionLabel, b.regionLabel],
      ['Years', a.years, b.years],
      ['Leaders', a.leaders.join(', '), b.leaders.join(', ')],
      ['Causes', a.causes.join('; '), b.causes.join('; ')],
      ['Outcome', a.outcome, b.outcome]
    ];

    const wrap = document.getElementById('comparison-table-wrap');
    wrap.innerHTML = `
      <table class="comparison-table">
        <thead>
          <tr><th>Aspect</th><th>${a.name}</th><th>${b.name}</th></tr>
        </thead>
        <tbody>
          ${rows.map(([label, av, bv]) => `<tr><th>${label}</th><td>${av}</td><td>${bv}</td></tr>`).join('')}
        </tbody>
      </table>
    `;
    document.getElementById('comparison-section').hidden = false;
  }

  // ---------- Selection ----------
  function handleSelect(id) {
    state.activeId = id;
    renderDetail(id);
    renderMap();
    document.getElementById('detail-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function refresh() {
    renderMap();
    renderTimeline();
    renderCards();
  }

  function init() {
    renderFilters();
    renderLegend();
    renderMap();
    renderTimeline();
    renderCards();
    renderDetail(null);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
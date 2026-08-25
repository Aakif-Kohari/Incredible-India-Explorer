const TIMELINE = [
    {
        year: 1672,
        era: 'presidency',
        title: 'English-style coinage begins at Bombay',
        tag: 'East India Company',
        text: 'The East India Company began striking English-style coins at Bombay, alongside the older Mughal-pattern currency used for commerce.'
    },
    {
        year: 1717,
        era: 'presidency',
        title: 'Bombay receives Mughal-style minting authority',
        tag: 'Bombay Presidency',
        text: 'The Company obtained permission from the Mughal emperor Farrukhsiyar to coin Mughal money at Bombay, helping establish a durable local minting tradition.'
    },
    {
        year: 1835,
        era: 'presidency',
        title: 'Uniform Coinage Act unifies the Presidencies',
        tag: 'Major reform',
        text: 'The Presidency systems gave way to a uniform Company coinage. The silver rupee was standardised at 180 troy grains and 11/12 fine.'
    },
    {
        year: 1840,
        era: 'presidency',
        title: 'Victoria replaces William IV on the uniform series',
        tag: 'Design change',
        text: 'Victoria portrait types replaced William IV, while the Company legend remained on the reverse of the early series.'
    },
    {
        year: 1858,
        era: 'crown',
        title: 'Authority passes from Company to Crown',
        tag: 'Political change',
        text: 'After the 1857 uprising, the Government of India Act transferred administration to the British Crown.'
    },
    {
        year: 1862,
        era: 'crown',
        title: 'First British Crown coinage for India',
        tag: 'Crown series',
        text: 'Crown issues removed EAST INDIA COMPANY from the reverse and introduced the new imperial design family.'
    },
    {
        year: 1877,
        era: 'crown',
        title: 'VICTORIA EMPRESS appears on the coinage',
        tag: 'Design change',
        text: 'Queen Victoria was proclaimed Empress of India; from 1 January 1877 the title VICTORIA EMPRESS replaced VICTORIA QUEEN on coins.'
    },
    {
        year: 1893,
        era: 'reform',
        title: 'Free coinage of silver is closed',
        tag: 'Monetary reform',
        text: 'India closed the free coinage of silver at government mints, a major step in the monetary transition that ultimately linked the rupee more closely to sterling.'
    },
    {
        year: 1906,
        era: 'reform',
        title: 'Indian Coinage Act sets mint and standard framework',
        tag: 'Legislation',
        text: 'The Indian Coinage Act formalised the framework for mints, denominations and standards; the rupee standard remained 180 grains and 916.66 silver.'
    },
    {
        year: 1917,
        era: 'reform',
        title: 'Silver shortage changes the small-coin system',
        tag: 'World War I',
        text: 'Wartime silver scarcity encouraged paper one-rupee currency and the use of cupro-nickel for smaller silver denominations.'
    },
    {
        year: 1940,
        era: 'reform',
        title: 'Quaternary silver alloy introduced',
        tag: 'World War II',
        text: 'The rupee standard was reduced to a quaternary silver alloy as wartime conditions made the traditional silver content difficult to sustain.'
    },
    {
        year: 1943,
        era: 'reform',
        title: 'Lahore and overseas production expand supply',
        tag: 'Mint network',
        text: 'Lahore began minting British India coins, while Pretoria also produced selected wartime issues.'
    },
    {
        year: 1947,
        era: 'crown',
        title: 'Nickel replaces wartime silver alloys; independence follows',
        tag: 'Transition',
        text: 'Pure nickel coins replaced the quaternary alloy for some issues. On 15 August 1947 India became independent while the existing coinage continued temporarily.'
    }
];

const PRESIDENCIES = [
    {
        id: 'bengal',
        name: 'Bengal / Calcutta',
        period: '18th century–1835',
        mint: 'Calcutta',
        metals: 'Gold, silver, copper',
        tradition: 'Mughal-pattern rupees and later milled Company coinage',
        note: 'Bengal coinage retained Mughal conventions for a long period. The Calcutta Mint became the principal producer of the 1835 uniform series.'
    },
    {
        id: 'bombay',
        name: 'Bombay',
        period: '1672–1835 as a distinct tradition',
        mint: 'Bombay',
        metals: 'Gold, silver, copper',
        tradition: 'Mughal-style rupees and English-pattern issues',
        note: 'Bombay was the earliest English-style mint in the Company network and received permission to strike Mughal rupees in 1717.'
    },
    {
        id: 'madras',
        name: 'Madras',
        period: '17th century–1835',
        mint: 'Madras',
        metals: 'Gold, silver, copper',
        tradition: 'Pagoda, fanam and Mughal-pattern issues',
        note: 'Madras developed a distinctive southern metrology and designs, including the gold pagoda tradition, before uniform coinage.'
    }
];

const MINTS = [
    {
        id: 'bombay',
        name: 'Bombay',
        x: 260,
        y: 280,
        period: '1835–1947',
        role: 'Major Indian mint; gold and silver under the uniform series and extensive later production.',
        presidency: 'Bombay'
    },
    {
        id: 'calcutta',
        name: 'Calcutta',
        x: 450,
        y: 160,
        period: '1835–1947',
        role: 'Major eastern mint; produced the uniform series in all metals and later Crown issues.',
        presidency: 'Bengal'
    },
    {
        id: 'madras',
        name: 'Madras',
        x: 380,
        y: 355,
        period: '1835–1862',
        role: 'Produced selected uniform coinage; the historic Presidency mint closed after the early Crown period.',
        presidency: 'Madras'
    },
    {
        id: 'lahore',
        name: 'Lahore',
        x: 205,
        y: 125,
        period: '1943–1947',
        role: 'Wartime mint producing British India issues during the final years of the Raj.',
        presidency: 'Punjab'
    },
    {
        id: 'pretoria',
        name: 'Pretoria',
        x: 92,
        y: 405,
        period: '1943–1944',
        role: 'Overseas production site for selected wartime British India issues.',
        presidency: 'Overseas'
    },
    {
        id: 'birmingham',
        name: 'Birmingham',
        x: 150,
        y: 70,
        period: '1857–1860',
        role: 'Selected contract production for India, including issues from Birmingham makers.',
        presidency: 'Overseas'
    }
];

const COINS = [
    {
        id: 'william-rupee',
        name: 'William IV — 1 Rupee',
        year: '1835',
        ruler: 'William IV',
        authority: 'East India Company',
        denom: '1 Rupee',
        metal: 'Silver',
        weight: '180 grains ≈ 11.66 g',
        mint: 'Bombay / Calcutta / Madras',
        obverse: 'William IV effigy',
        reverse: 'EAST INDIA COMPANY · ONE RUPEE; English and Persian value',
        design: 'Uniform Company coinage; royal effigy with bilingual denomination.'
    },
    {
        id: 'victoria-rupee',
        name: 'Victoria — 1 Rupee',
        year: '1840',
        ruler: 'Victoria',
        authority: 'East India Company',
        denom: '1 Rupee',
        metal: 'Silver',
        weight: '180 grains ≈ 11.66 g',
        mint: 'Bombay / Calcutta / Madras',
        obverse: 'Victoria Queen portrait',
        reverse: 'EAST INDIA COMPANY · ONE RUPEE; bilingual value',
        design: 'Victoria replaced William IV while the Company authority remained visible.'
    },
    {
        id: 'victoria-empress',
        name: 'Victoria — 1 Rupee, Empress',
        year: '1877',
        ruler: 'Victoria',
        authority: 'British Crown',
        denom: '1 Rupee',
        metal: 'Silver',
        weight: '180 grains ≈ 11.66 g',
        mint: 'Bombay / Calcutta',
        obverse: 'VICTORIA EMPRESS portrait',
        reverse: 'ONE RUPEE and bilingual value within ornamental border',
        design: 'The imperial title marks the shift from Queen to Empress of India.'
    },
    {
        id: 'edward-rupee',
        name: 'Edward VII — 1 Rupee',
        year: '1903',
        ruler: 'Edward VII',
        authority: 'British Crown',
        denom: '1 Rupee',
        metal: 'Silver',
        weight: '180 grains ≈ 11.66 g',
        mint: 'Bombay / Calcutta',
        obverse: 'Bare-head Edward VII portrait',
        reverse: 'ONE RUPEE and denomination legends',
        design: 'New monarch portrait while the rupee standard and imperial framework continued.'
    },
    {
        id: 'george-v-anna',
        name: 'George V — 1 Anna',
        year: '1912',
        ruler: 'George V',
        authority: 'British Crown',
        denom: '1 Anna',
        metal: 'Copper / cupro-nickel later',
        weight: 'Varied by issue',
        mint: 'Bombay / Calcutta',
        obverse: 'Crowned George V portrait',
        reverse: 'ONE ANNA with ornamental design',
        design: 'Small denomination used changing metals as silver shortages intensified.'
    },
    {
        id: 'george-vi-rupee',
        name: 'George VI — 1 Rupee',
        year: '1940',
        ruler: 'George VI',
        authority: 'British Crown',
        denom: '1 Rupee',
        metal: 'Quaternary silver',
        weight: 'Reduced silver standard',
        mint: 'Bombay / Calcutta / Lahore',
        obverse: 'GEORGE VI KING EMPEROR',
        reverse: 'ONE RUPEE and date within wartime design',
        design: 'Wartime alloy change preserved the rupee denomination while reducing silver content.'
    }
];

const DENOMS = [
    {
        id: 'pie',
        name: '1/12 Anna (Pie)',
        value: '1/192 rupee',
        metal: 'Copper',
        weight: 'Issue dependent',
        purpose: 'Smallest common copper denomination in the British India series.'
    },
    {
        id: 'halfanna',
        name: '1/2 Anna',
        value: '1/32 rupee',
        metal: 'Copper; later cupro-nickel issues in the small-denomination family',
        weight: '200 grains in early copper issues',
        purpose: 'Two pice; important everyday copper denomination.'
    },
    {
        id: 'anna',
        name: '1 Anna',
        value: '1/16 rupee',
        metal: 'Copper / cupro-nickel',
        weight: 'Issue dependent',
        purpose: 'Four pice; widely used small denomination.'
    },
    {
        id: 'twoanna',
        name: '2 Annas',
        value: '1/8 rupee',
        metal: 'Silver in early series',
        weight: '22.5 grains in early silver',
        purpose: 'Fractional silver denomination introduced in the uniform era.'
    },
    {
        id: 'quarter',
        name: '1/4 Rupee (4 Annas)',
        value: '1/4 rupee',
        metal: 'Silver',
        weight: '45 grains',
        purpose: 'Quarter rupee, one of the core silver denominations.'
    },
    {
        id: 'half',
        name: '1/2 Rupee (8 Annas)',
        value: '1/2 rupee',
        metal: 'Silver',
        weight: '90 grains',
        purpose: 'Half rupee silver denomination.'
    },
    {
        id: 'rupee',
        name: '1 Rupee',
        value: '1 rupee = 16 annas',
        metal: 'Silver; quaternary silver; nickel in late transition',
        weight: '180 grains under the classic standard',
        purpose: 'Principal unit and anchor of British India coinage.'
    },
    {
        id: 'mohur',
        name: '1 Mohur',
        value: '15 rupees equivalent',
        metal: 'Gold',
        weight: '11.66 g at .917 fine in 1835 issues',
        purpose: 'Gold bullion denomination equivalent to fifteen silver rupees.'
    }
];

const DESIGNS = [
    {
        year: '1835',
        era: 'Company uniform coinage',
        ruler: 'William IV',
        caption:
            'The 1835 uniform rupee places William IV on the obverse. The reverse combines EAST INDIA COMPANY, ONE RUPEE and the value in Persian, making the new all-India standard legible across linguistic traditions.',
        color: '#c8c6bd'
    },
    {
        year: '1840',
        era: 'Victoria Queen',
        ruler: 'Queen Victoria',
        caption:
            'Victoria replaces William IV. Early Victoria issues retain the East India Company reverse legend, showing continuity of Company authority despite the new royal portrait.',
        color: '#c8c6bd'
    },
    {
        year: '1877',
        era: 'Victoria Empress',
        ruler: 'Queen Victoria',
        caption:
            'VICTORIA EMPRESS signals imperial status. The 1877 title change is one of the clearest design markers of the Crown era.',
        color: '#c8c6bd'
    },
    {
        year: '1910',
        era: 'George V',
        ruler: 'George V',
        caption:
            'George V introduces a new crowned royal portrait. The core rupee standard remains familiar, but wartime pressures soon affect the composition of smaller denominations.',
        color: '#c8c6bd'
    },
    {
        year: '1940',
        era: 'George VI wartime issue',
        ruler: 'George VI',
        caption:
            'Wartime quaternary silver reduces the silver content while retaining the rupee denomination and the KING EMPEROR inscription.',
        color: '#aaa89f'
    }
];

function $(id) {
    return document.getElementById(id);
}
function escapeHTML(value) {
    return String(value).replace(
        /[&<>"']/g,
        c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
    );
}

function coinSVG(coin, { large = false } = {}) {
    const year = coin.year;
    const portrait = coin.ruler.includes('William')
        ? 'WILLIAM IV'
        : coin.ruler.includes('Victoria')
          ? year === '1877'
              ? 'VICTORIA'
              : 'VICTORIA QUEEN'
          : coin.ruler.toUpperCase();
    const fill = coin.metal.toLowerCase().includes('gold')
        ? '#d2aa52'
        : coin.metal.toLowerCase().includes('copper')
          ? '#b8794d'
          : coin.metal.toLowerCase().includes('nickel')
            ? '#b8bdba'
            : '#c8c6bd';
    return `<svg viewBox="0 0 260 260" role="img" aria-label="${escapeHTML(coin.name)}"><defs><radialGradient id="coin-${coin.id}"><stop offset="0" stop-color="#f8f6ef"/><stop offset=".72" stop-color="${fill}"/><stop offset="1" stop-color="#716e68"/></radialGradient></defs><circle cx="130" cy="130" r="112" fill="url(#coin-${coin.id})" stroke="#77736b" stroke-width="6"/><circle cx="130" cy="130" r="96" fill="none" stroke="#817d74" stroke-width="2" stroke-dasharray="2 5"/><circle cx="130" cy="130" r="72" fill="none" stroke="#aaa59a" stroke-width="1"/><text x="130" y="108" text-anchor="middle" font-size="16" font-weight="700" fill="#433f39">${portrait}</text><text x="130" y="134" text-anchor="middle" font-size="12" font-weight="700" fill="#433f39">${coin.denom.toUpperCase()}</text><text x="130" y="155" text-anchor="middle" font-size="9" fill="#433f39">${year} · INDIA</text><text x="130" y="183" text-anchor="middle" font-size="8" fill="#433f39">✦ ✦ ✦</text></svg>`;
}

function renderTimeline(filter = 'all') {
    const list = $('timeline-list');
    list.innerHTML = '';
    TIMELINE.filter(x => filter === 'all' || x.era === filter).forEach(item => {
        const el = document.createElement('article');
        el.className = 'timeline-item';
        el.innerHTML = `<div class="timeline-card"><div class="timeline-meta"><span class="timeline-year">${item.year}</span><span class="tag">${escapeHTML(item.tag)}</span></div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div>`;
        list.appendChild(el);
    });
}
function renderPresidencies() {
    const buttons = $('presidency-buttons'),
        detail = $('presidency-detail');
    PRESIDENCIES.forEach((p, i) => {
        const b = document.createElement('button');
        b.className = 'selector-btn' + (i === 0 ? ' active' : '');
        b.textContent = p.name;
        b.addEventListener('click', () => {
            document.querySelectorAll('.selector-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            detail.innerHTML = `<h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.note)}</p><div class="detail-list"><div><strong>Period</strong><span>${escapeHTML(p.period)}</span></div><div><strong>Principal mint</strong><span>${escapeHTML(p.mint)}</span></div><div><strong>Metals</strong><span>${escapeHTML(p.metals)}</span></div><div><strong>Tradition</strong><span>${escapeHTML(p.tradition)}</span></div></div>`;
            focusMint(p.mint.toLowerCase());
        });
        buttons.appendChild(b);
        if (i === 0) b.click();
    });
}
function renderMints() {
    const group = $('mint-nodes');
    MINTS.forEach(m => {
        const g = document.createElement('g');
        g.innerHTML = `<circle class="mint-node" data-id="${m.id}" cx="${m.x}" cy="${m.y}" r="7" tabindex="0"/><text class="mint-label" x="${m.x + 11}" y="${m.y + 4}">${escapeHTML(m.name)}</text>`;
        const circle = g.querySelector('circle');
        circle.addEventListener('click', () => selectMint(m));
        circle.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') selectMint(m);
        });
        group.appendChild(g);
    });
}
function focusMint(name) {
    const m = MINTS.find(x => x.name.toLowerCase().includes(name));
    if (m) selectMint(m);
}
function selectMint(m) {
    document.querySelectorAll('.mint-node').forEach(x => x.classList.toggle('active', x.dataset.id === m.id));
    $('mint-note').innerHTML =
        `<strong>${escapeHTML(m.name)}</strong> · ${escapeHTML(m.period)}<br>${escapeHTML(m.role)}`;
}
function renderCoins() {
    const select = $('coin-select');
    COINS.forEach(c => select.add(new Option(`${c.year} · ${c.name}`, c.id)));
    select.addEventListener('change', () => showCoin(COINS.find(c => c.id === select.value)));
    showCoin(COINS[0]);
}
function showCoin(c) {
    $('coin-large').innerHTML = coinSVG(c, { large: true });
    $('coin-info').innerHTML =
        `<h3>${escapeHTML(c.name)}</h3><p>${escapeHTML(c.design)}</p><div class="info-grid"><div><strong>Authority</strong><span>${escapeHTML(c.authority)}</span></div><div><strong>Ruler</strong><span>${escapeHTML(c.ruler)}</span></div><div><strong>Denomination</strong><span>${escapeHTML(c.denom)}</span></div><div><strong>Metal</strong><span>${escapeHTML(c.metal)}</span></div><div><strong>Weight</strong><span>${escapeHTML(c.weight)}</span></div><div><strong>Mint(s)</strong><span>${escapeHTML(c.mint)}</span></div><div><strong>Obverse</strong><span>${escapeHTML(c.obverse)}</span></div><div><strong>Reverse / inscription</strong><span>${escapeHTML(c.reverse)}</span></div></div>`;
}
function renderCompare() {
    const a = $('denom-a'),
        b = $('denom-b');
    DENOMS.forEach(d => {
        a.add(new Option(d.name, d.id));
        b.add(new Option(d.name, d.id));
    });
    b.selectedIndex = 6;
    const update = () => {
        showDenom(a.value, 'compare-a');
        showDenom(b.value, 'compare-b');
    };
    a.addEventListener('change', update);
    b.addEventListener('change', update);
    update();
}
function showDenom(id, target) {
    const d = DENOMS.find(x => x.id === id);
    $(target).innerHTML =
        `<h3>${escapeHTML(d.name)}</h3><table><tr><td>Value</td><td>${escapeHTML(d.value)}</td></tr><tr><td>Metal</td><td>${escapeHTML(d.metal)}</td></tr><tr><td>Weight</td><td>${escapeHTML(d.weight)}</td></tr><tr><td>Role</td><td>${escapeHTML(d.purpose)}</td></tr></table>`;
}
function renderDesign() {
    const input = $('design-slider');
    const update = () => {
        const d = DESIGNS[Number(input.value)];
        $('design-year').textContent = d.year;
        $('design-era').textContent = d.era;
        $('design-coin-a').innerHTML = coinSVG({
            id: `design-${d.year}`,
            name: `${d.ruler} rupee`,
            year: d.year,
            ruler: d.ruler,
            denom: 'ONE RUPEE',
            metal: 'Silver',
            design: d.caption
        });
        $('design-caption').textContent = d.caption;
    };
    input.addEventListener('input', update);
    update();
}
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    renderPresidencies();
    renderMints();
    renderCoins();
    renderCompare();
    renderDesign();
    document.querySelectorAll('.era-btn').forEach(b =>
        b.addEventListener('click', () => {
            document.querySelectorAll('.era-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            renderTimeline(b.dataset.era);
        })
    );
    const toggle = $('theme-toggle');
    if (toggle) toggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
});

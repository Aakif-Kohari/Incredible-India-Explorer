// Delhi Sultanate Coin Timeline Logic

const rulers = [
    {
        id: 'iltutmish',
        name: 'Iltutmish',
        reign: '1211 – 1236 CE',
        metal: 'silver',
        denom: 'Tanka',
        script: 'Arabic',
        obverseText: 'Al-Sultan',
        reverseText: 'Iltutmish',
        arabic: 'السلطان الأعظم',
        translit: 'Al-Sultan Al-Azam',
        translation: 'The Supreme Sultan',
        mints: [{ name: 'Delhi', x: 200, y: 100 }, { name: 'Lahore', x: 150, y: 60 }],
        context: 'Introduced the silver Tanka and copper Jital, which became the standard coinage of the Sultanate.',
        color: '#e6e6e6' // Silver
    },
    {
        id: 'balban',
        name: 'Ghiyas ud din Balban',
        reign: '1266 – 1287 CE',
        metal: 'silver',
        denom: 'Tanka',
        script: 'Arabic, Nagari',
        obverseText: 'Balban',
        reverseText: 'Sultan',
        arabic: 'غياث الدنيا والدين',
        translit: 'Ghiyas ud-Dunya wa ud-Din',
        translation: 'The Helper of the World and Religion',
        mints: [{ name: 'Delhi', x: 200, y: 100 }],
        context: 'Maintained the monetary standard of Iltutmish; bilingual coins with Nagari script were common for local acceptance.',
        color: '#e6e6e6' // Silver
    },
    {
        id: 'alauddin',
        name: 'Alauddin Khalji',
        reign: '1296 – 1316 CE',
        metal: 'gold',
        denom: 'Gold Tanka',
        script: 'Arabic',
        obverseText: 'Sikandar',
        reverseText: 'Al-Sani',
        arabic: 'سكندر الثاني',
        translit: 'Sikandar al-Sani',
        translation: 'The Second Alexander',
        mints: [{ name: 'Delhi', x: 200, y: 100 }, { name: 'Deogir', x: 180, y: 180 }],
        context: 'Enriched the treasury via Deccan campaigns, leading to an abundance of gold Tankas. Coins proclaimed him the Second Alexander.',
        color: '#d4af37' // Gold
    },
    {
        id: 'muhammad',
        name: 'Muhammad bin Tughlaq',
        reign: '1324 – 1351 CE',
        metal: 'copper',
        denom: 'Token Currency (Tanka)',
        script: 'Arabic',
        obverseText: 'Token',
        reverseText: 'Tughlaq',
        arabic: 'من أطاع السلطان فقد أطاع الرحمن',
        translit: 'Man ata\'a al-Sultan faqad ata\'a al-Rahman',
        translation: 'He who obeys the Sultan obeys the Merciful',
        mints: [{ name: 'Delhi', x: 200, y: 100 }, { name: 'Daulatabad', x: 180, y: 180 }],
        context: 'Famous for his failed experiment introducing copper and brass token currency intended to pass at the value of silver.',
        color: '#b87333' // Copper
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initFilters();
    initCompare();
    
    // Select first by default
    selectRuler(rulers[0]);
});

function initCarousel() {
    const carousel = document.getElementById('ruler-carousel');
    rulers.forEach(ruler => {
        const card = document.createElement('div');
        card.className = `ruler-card metal-${ruler.metal}`;
        card.dataset.id = ruler.id;
        card.innerHTML = `<div class="ruler-name">${ruler.name}</div><div class="ruler-dates">${ruler.reign}</div>`;
        card.addEventListener('click', () => {
            document.querySelectorAll('.ruler-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectRuler(ruler);
        });
        carousel.appendChild(card);
    });
    carousel.firstChild.classList.add('selected');
}

function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const metal = btn.dataset.metal;
            document.querySelectorAll('.ruler-card').forEach(card => {
                if (metal === 'all' || card.classList.contains(`metal-${metal}`)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function selectRuler(ruler) {
    // Update Details
    document.getElementById('det-ruler').textContent = ruler.name;
    document.getElementById('det-reign').textContent = ruler.reign;
    document.getElementById('det-denom').textContent = ruler.denom;
    document.getElementById('det-metal').textContent = ruler.metal.charAt(0).toUpperCase() + ruler.metal.slice(1);
    document.getElementById('det-script').textContent = ruler.script;
    
    // Update SVG Coin
    const svgs = document.querySelectorAll('.coin-svg circle');
    svgs.forEach(c => c.setAttribute('fill', ruler.color));
    document.getElementById('svg-obverse-text').textContent = ruler.obverseText;
    document.getElementById('svg-reverse-text').textContent = ruler.reverseText;
    
    // Update Script Decoder
    document.getElementById('decoder-arabic').textContent = ruler.arabic;
    document.getElementById('decoder-translit').textContent = ruler.translit;
    document.getElementById('decoder-translation').textContent = `"${ruler.translation}"`;
    
    // Update Map
    const mintNodes = document.getElementById('mint-nodes');
    mintNodes.innerHTML = '';
    const mintNames = [];
    ruler.mints.forEach(mint => {
        mintNames.push(mint.name);
        mintNodes.innerHTML += `
            <circle cx="${mint.x}" cy="${mint.y}" r="5" class="mint-node"></circle>
            <text x="${mint.x + 10}" y="${mint.y + 5}" class="mint-label">${mint.name}</text>
        `;
    });
    document.getElementById('mint-desc').innerHTML = `<strong>Active Mints:</strong> ${mintNames.join(', ')}<br><br>${ruler.context}`;
}

function initCompare() {
    const select1 = document.getElementById('compare-1');
    const select2 = document.getElementById('compare-2');
    
    rulers.forEach(r => {
        select1.add(new Option(r.name, r.id));
        select2.add(new Option(r.name, r.id));
    });
    
    if (rulers.length > 1) select2.selectedIndex = 1;
    
    const updateStats = (select, targetId) => {
        const ruler = rulers.find(r => r.id === select.value);
        if (ruler) {
            document.getElementById(targetId).innerHTML = `
                <p><strong>Reign:</strong> ${ruler.reign}</p>
                <p><strong>Metal:</strong> <span style="color:${ruler.color}">${ruler.metal.toUpperCase()}</span></p>
                <p><strong>Denomination:</strong> ${ruler.denom}</p>
            `;
        }
    };
    
    select1.addEventListener('change', () => updateStats(select1, 'compare-stats-1'));
    select2.addEventListener('change', () => updateStats(select2, 'compare-stats-2'));
    
    updateStats(select1, 'compare-stats-1');
    updateStats(select2, 'compare-stats-2');
}

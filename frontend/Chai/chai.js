(() => {
    const prep = {
        masala: [
            'Masala chai',
            'There is no fixed spice recipe; ginger, cardamom, cinnamon, cloves, pepper and other local preferences may be used.'
        ],
        cutting: [
            'Cutting chai',
            'A small serving associated with Mumbai tea-stall culture and enjoyed as a quick refreshment.'
        ],
        noon: [
            'Kashmiri noon chai',
            'A distinctive pink tea traditionally made with green tea, milk, salt and baking soda; household recipes vary.'
        ],
        sulaimani: [
            'Sulaimani tea',
            'A light, often spiced black tea popular in parts of Kerala and the Malabar coast.'
        ]
    };
    const regions = {
        assam: [
            'Assam',
            "One of India's best-known tea-growing areas, associated with robust black teas from the Brahmaputra valley.",
            'Lowland and river-valley tea country',
            'Strong, full-bodied black tea',
            "Tea is central to Assam's plantation history, livelihoods and regional identity."
        ],
        darjeeling: [
            'Darjeeling',
            'A Himalayan tea-growing area famous for distinctive teas cultivated on slopes around Darjeeling.',
            'Cool Himalayan foothills and mountain slopes',
            'Fragrant, delicate black tea',
            "Tea estates connect Darjeeling's landscape, tourism, labour history and regional identity."
        ],
        dooars: [
            'Dooars & Terai',
            'Tea-growing areas at the Himalayan foothills of northern West Bengal.',
            'Foothills, plains, forests and river-fed terrain',
            'Bright, brisk black tea',
            'Tea gardens are a visible part of the foothill landscape and plantation communities.'
        ],
        kangra: [
            'Kangra',
            'A smaller tea-growing region in Himachal Pradesh around the Kangra valley.',
            'Himalayan valley landscapes',
            'Aromatic green and black tea',
            "Tea cultivation forms part of Kangra's agricultural heritage."
        ],
        sikkim: [
            'Sikkim',
            'An eastern Himalayan tea-growing region, with Temi Tea Garden as its best-known estate.',
            'Eastern Himalayan hills',
            'Aromatic, high-grown tea',
            "Tea tourism and Temi connect cultivation with Sikkim's mountain landscape."
        ],
        nilgiri: [
            'Nilgiri',
            'A major southern tea-growing area in the blue mountains of Tamil Nadu.',
            'High-elevation southern hills',
            'Bright, fragrant black tea',
            'Tea estates shape the Nilgiri landscape and agricultural economy.'
        ],
        munnar: [
            'Munnar',
            "A high-elevation tea landscape in Kerala and one of South India's best-known tea destinations.",
            'High ranges and misty mountain slopes',
            'Aromatic high-grown black tea',
            "Tea plantations are integral to Munnar's landscape, tourism and plantation heritage."
        ]
    };
    function prepSet(k) {
        document.querySelectorAll('[data-prep]').forEach(b => b.classList.toggle('active', b.dataset.prep === k));
        document.getElementById('prep-detail').innerHTML = `<strong>${prep[k][0]}</strong><span>${prep[k][1]}</span>`;
    }
    function regionSet(k) {
        let r = regions[k];
        if (!r) return;
        document.querySelectorAll('[data-region]').forEach(b => b.classList.toggle('active', b.dataset.region === k));
        document.getElementById('region-title').textContent = r[0];
        document.getElementById('region-description').textContent = r[1];
        document.getElementById('region-landscape').textContent = r[2];
        document.getElementById('region-tea').textContent = r[3];
        document.getElementById('region-culture').textContent = r[4];
    }
    document.querySelectorAll('[data-prep]').forEach(b => b.addEventListener('click', () => prepSet(b.dataset.prep)));
    document
        .querySelectorAll('[data-region]')
        .forEach(b => b.addEventListener('click', () => regionSet(b.dataset.region)));
    prepSet('masala');
    regionSet('assam');
})();

document.addEventListener('DOMContentLoaded', () => {
    const bookmarkBtn = document.querySelector('.journey-bookmark-btn');
    const bookmarkId = 'imphal-kohima-campaign-page';
    const pageTitle = 'Imphal–Kohima Campaign Explorer';
    const pageCategory = 'Military Resistance';
    const pageThumbnail = '';

    function updateBookmarkState() {
        if (!bookmarkBtn || !window.Journey) return;
        const saved = window.Journey.isSaved(bookmarkId);
        bookmarkBtn.classList.toggle('is-saved', saved);
        bookmarkBtn.setAttribute('aria-pressed', String(saved));
        bookmarkBtn.innerHTML = saved ? '♥ Saved to Journey' : '♡ Save to Journey';
    }

    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            if (!window.Journey) return;
            window.Journey.toggle({
                id: bookmarkId,
                explorerPage: 'frontend/imphal-kohima-campaign-explorer/index.html',
                title: pageTitle,
                thumbnail: pageThumbnail,
                category: pageCategory
            });
            updateBookmarkState();
        });
    }

    updateBookmarkState();

    if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
        window.Journey.registerSearchItems('frontend/imphal-kohima-campaign-explorer/index.html', [
            {
                id: 'imphal-kohima-campaign-page',
                title: 'Imphal–Kohima Campaign Explorer',
                description: "Map the INA's 1944 march toward India's northeastern frontier alongside the Japanese 15th Army.",
                link: 'frontend/imphal-kohima-campaign-explorer/index.html'
            },
            {
                id: 'imphal-kohima-imphal',
                title: 'Siege of Imphal',
                description: 'The 1944 encirclement of Imphal, supplied by air through the monsoon siege.',
                link: 'frontend/imphal-kohima-campaign-explorer/index.html#imphal'
            },
            {
                id: 'imphal-kohima-kohima',
                title: 'Battle of Kohima',
                description: "Close-quarters fighting on Kohima's Garrison Hill, a turning point of the Burma Campaign.",
                link: 'frontend/imphal-kohima-campaign-explorer/index.html#kohima'
            },
            {
                id: 'imphal-kohima-timeline',
                title: 'Imphal–Kohima Campaign Timeline',
                description: 'Month-by-month timeline of Operation U-Go, March–July 1944.',
                link: 'frontend/imphal-kohima-campaign-explorer/index.html#timeline'
            }
        ]);
    }

    // --- Interactive campaign map ---
    const mapNodes = document.querySelectorAll('#ikc-map-svg .ikc-node');
    const detailPanel = document.getElementById('ikc-map-detail');

    const nodeInfo = {
        rangoon: {
            title: 'Rangoon',
            text: 'Rangoon (Yangon) served as the launch point and rear base for Japanese and INA forces preparing the 1944 offensive toward India.'
        },
        mandalay: {
            title: 'Mandalay',
            text: 'Mandalay was a key staging and supply hub in central Burma along the route north toward the Chindwin River.'
        },
        chindwin: {
            title: 'Chindwin River Crossing',
            text: 'Japanese and INA columns crossed the Chindwin River near Homalin and Sittaung in March 1944, the first major obstacle on the road to India.'
        },
        tamu: {
            title: 'Tamu',
            text: 'Tamu, just inside the Indian frontier, was a key waypoint where advancing columns entered Manipur territory.'
        },
        ukhrul: {
            title: 'Ukhrul',
            text: 'Japanese forces used the route through Ukhrul to swing north of Imphal, aiming to cut the Kohima road and encircle the garrison.'
        },
        imphal: {
            title: 'Imphal',
            text: 'Imphal, Manipur\u2019s administrative and supply centre, was the campaign\u2019s central objective. It was encircled from March to June 1944 and held out on air-supplied rations.'
        },
        moirang: {
            title: 'Moirang',
            text: 'Near Moirang, by Loktak Lake, the INA raised the Indian tricolour on mainland Indian soil for the first time in April 1944.'
        },
        kohima: {
            title: 'Kohima',
            text: 'At Kohima, some of the war\u2019s fiercest close-quarters fighting took place around Garrison Hill, halting the Japanese advance toward Dimapur.'
        },
        dimapur: {
            title: 'Dimapur',
            text: 'Dimapur\u2019s railhead was the Allied supply and reinforcement base whose capture would have opened the Brahmaputra valley to the advancing forces.'
        }
    };

    function showNodeDetail(key) {
        const info = nodeInfo[key];
        if (!info || !detailPanel) return;
        detailPanel.innerHTML = `<h3>${info.title}</h3><p>${info.text}</p>`;
        mapNodes.forEach((n) => n.classList.toggle('is-active', n.dataset.node === key));
    }

    mapNodes.forEach((node) => {
        node.addEventListener('click', () => showNodeDetail(node.dataset.node));
        node.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' || e.key === ' ') showNodeDetail(node.dataset.node);
        });
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
    });
});
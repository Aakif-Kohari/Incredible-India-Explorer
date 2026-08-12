document.addEventListener('DOMContentLoaded', () => {
    const bookmarkBtn = document.querySelector('.journey-bookmark-btn');
    const bookmarkId = 'lahore-congress-session-page';
    const pageTitle = 'Lahore Congress Session & Purna Swaraj Explorer';
    const pageCategory = 'Freedom Struggle';
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
                explorerPage: 'frontend/lahore-congress-session-explorer/index.html',
                title: pageTitle,
                thumbnail: pageThumbnail,
                category: pageCategory
            });
            updateBookmarkState();
        });
    }

    updateBookmarkState();

    if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
        window.Journey.registerSearchItems('frontend/lahore-congress-session-explorer/index.html', [
            {
                id: 'lahore-congress-session-page',
                title: 'Lahore Congress Session & Purna Swaraj Explorer',
                description: "The December 1929 Lahore session, Nehru's presidency, and the Purna Swaraj declaration of complete independence.",
                link: 'frontend/lahore-congress-session-explorer/index.html'
            },
            {
                id: 'lahore-purna-swaraj',
                title: 'Purna Swaraj Declaration',
                description: 'The Congress resolution declaring complete independence, adopted at midnight on 31 December 1929.',
                link: 'frontend/lahore-congress-session-explorer/index.html#purna-swaraj'
            },
            {
                id: 'lahore-jan-26',
                title: '26 January 1930 Independence Day Observance',
                description: 'Nationwide public meetings pledging Purna Swaraj, later echoed by Republic Day in 1950.',
                link: 'frontend/lahore-congress-session-explorer/index.html#jan-26'
            },
            {
                id: 'lahore-timeline',
                title: 'Lahore Congress Session Timeline',
                description: 'From the 1928 Calcutta ultimatum to the 1930 Salt March and Civil Disobedience Movement.',
                link: 'frontend/lahore-congress-session-explorer/index.html#timeline'
            }
        ]);
    }

    // --- Interactive session map ---
    const mapNodes = document.querySelectorAll('#lcs-map-svg .lcs-node');
    const detailPanel = document.getElementById('lcs-map-detail');

    const nodeInfo = {
        'ravi-bank': {
            title: 'Session Pandal, Ravi Bank',
            text: 'The Lahore session was held in a large pandal on the banks of the River Ravi, where the Congress met from 29 to 31 December 1929.'
        },
        'lahore-city': {
            title: 'Lahore',
            text: 'Lahore hosted the pivotal 1929 Congress session that formally adopted Purna Swaraj as the movement\u2019s goal.'
        },
        tricolour: {
            title: 'Midnight Flag Hoisting',
            text: 'At midnight on 31 December 1929, Jawaharlal Nehru hoisted the tricolour flag of independence before the assembled crowd, marking the Purna Swaraj resolution.'
        },
        delhi: {
            title: 'Delhi',
            text: 'Delhi was among the cities that observed 26 January 1930 as Independence Day with public meetings and the independence pledge.'
        },
        bombay: {
            title: 'Bombay',
            text: 'Large crowds in Bombay took part in the 26 January 1930 Independence Day observance called for by the Lahore session.'
        },
        calcutta: {
            title: 'Calcutta',
            text: 'Calcutta, host of the 1928 session that set the original Dominion Status ultimatum, also observed the 1930 Independence Day pledge.'
        },
        madras: {
            title: 'Madras',
            text: 'Madras was one of many cities where local Congress committees organised meetings on 26 January 1930 in support of Purna Swaraj.'
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
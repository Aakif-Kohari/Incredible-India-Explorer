document.addEventListener('DOMContentLoaded', () => {
    const bookmarkBtn = document.querySelector('.journey-bookmark-btn');
    const bookmarkId = 'ina-red-fort-trials-page';
    const pageTitle = 'INA Red Fort Trials Explorer';
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
                explorerPage: 'frontend/ina-red-fort-trials-explorer/index.html',
                title: pageTitle,
                thumbnail: pageThumbnail,
                category: pageCategory
            });
            updateBookmarkState();
        });
    }

    updateBookmarkState();

    if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
        window.Journey.registerSearchItems('frontend/ina-red-fort-trials-explorer/index.html', [
            {
                id: 'ina-red-fort-trials-page',
                title: 'INA Red Fort Trials Explorer',
                description: 'The 1945-46 court-martial of Shah Nawaz Khan, Prem Kumar Sahgal, and Gurbaksh Singh Dhillon at the Red Fort.',
                link: 'frontend/ina-red-fort-trials-explorer/index.html'
            },
            {
                id: 'ina-red-fort-trials-officers',
                title: 'Red Fort Trials Defendants',
                description: 'Profiles of Shah Nawaz Khan, Prem Kumar Sahgal, and Gurbaksh Singh Dhillon.',
                link: 'frontend/ina-red-fort-trials-explorer/index.html#officers'
            },
            {
                id: 'ina-red-fort-trials-defence',
                title: 'INA Defence Committee',
                description: 'The Congress-organised defence team, including Bhulabhai Desai and Jawaharlal Nehru.',
                link: 'frontend/ina-red-fort-trials-explorer/index.html#defence-team'
            },
            {
                id: 'ina-red-fort-trials-timeline',
                title: 'Red Fort Trials Timeline',
                description: 'Timeline of the trials from the end of WWII through the officers\u2019 release in January 1946.',
                link: 'frontend/ina-red-fort-trials-explorer/index.html#timeline'
            }
        ]);
    }

    // --- Interactive Red Fort map ---
    const mapNodes = document.querySelectorAll('#rft-map-svg .rft-node');
    const detailPanel = document.getElementById('rft-map-detail');

    const nodeInfo = {
        'diwan-i-aam': {
            title: 'Diwan-i-Aam (Courtroom)',
            text: 'The Red Fort\u2019s Hall of Public Audience was converted into the courtroom where the joint court-martial of Shah Nawaz Khan, Prem Kumar Sahgal, and Gurbaksh Singh Dhillon opened on 5 November 1945.'
        },
        'lahori-gate': {
            title: 'Lahori Gate',
            text: 'The Red Fort\u2019s main gate became a focal point for crowds following news of the trial as it unfolded day by day.'
        },
        'fort-walls': {
            title: 'Fort Perimeter',
            text: 'Security around the Red Fort was tightened through the trial as public interest and crowds grew.'
        },
        'chandni-chowk': {
            title: 'Chandni Chowk',
            text: 'Delhi\u2019s historic market district saw processions, strikes, and public meetings in solidarity with the accused officers.'
        },
        'india-gate': {
            title: 'Central Delhi',
            text: 'Public meetings and demonstrations spread across central Delhi as the trial drew national attention.'
        },
        calcutta: {
            title: 'Calcutta',
            text: 'Student strikes and mass rallies in Calcutta were among the largest INA solidarity protests outside Delhi.'
        },
        bombay: {
            title: 'Bombay',
            text: 'Workers and students in Bombay joined hartals and demonstrations in support of the INA officers, part of the unrest that fed into the RIN Mutiny weeks later.'
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
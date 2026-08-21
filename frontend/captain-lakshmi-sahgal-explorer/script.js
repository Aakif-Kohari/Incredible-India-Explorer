document.addEventListener('DOMContentLoaded', () => {
    const bookmarkBtn = document.querySelector('.journey-bookmark-btn');
    const bookmarkId = 'lakshmi-sahgal-page';
    const pageTitle = 'Captain Lakshmi Sahgal Explorer';
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
                explorerPage: 'frontend/captain-lakshmi-sahgal-explorer/index.html',
                title: pageTitle,
                thumbnail: pageThumbnail,
                category: pageCategory
            });
            updateBookmarkState();
        });
    }

    updateBookmarkState();

    if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
        window.Journey.registerSearchItems('frontend/captain-lakshmi-sahgal-explorer/index.html', [
            {
                id: 'lakshmi-sahgal-page',
                title: 'Captain Lakshmi Sahgal Explorer',
                description: 'Explore Captain Lakshmi Sahgal’s leadership of the INA and the all-women Rani of Jhansi Regiment.',
                link: 'frontend/captain-lakshmi-sahgal-explorer/index.html'
            },
            {
                id: 'lakshmi-sahgal-regiment',
                title: 'Rani of Jhansi Regiment',
                description: 'Learn about the INA’s first all-women combat unit commanded by Captain Lakshmi Sahgal.',
                link: 'frontend/captain-lakshmi-sahgal-explorer/index.html#regiment'
            },
            {
                id: 'lakshmi-sahgal-ina-leadership',
                title: 'INA Women’s Leadership',
                description: 'Discover how Captain Lakshmi Sahgal led women volunteers in the Indian National Army and Azad Hind government.',
                link: 'frontend/captain-lakshmi-sahgal-explorer/index.html#ina-leadership'
            }
        ]);
    }
});

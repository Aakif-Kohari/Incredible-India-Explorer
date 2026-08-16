/* ==========================================================================
   IE STORAGE UTILITY
   Centralizes all localStorage reads and writes into a single, versioned
   JSON object to prevent quota exhaustion and scattered keys.
   ========================================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'iie_storage';
    const VERSION = 1;

    // Default structure
    const DEFAULT_DATA = {
        version: VERSION,
        theme: 'dark',
        bookmarks: [] // Stores only IDs
    };

    let cache = null;

    function load() {
        if (cache) return cache;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                cache = JSON.parse(JSON.stringify(DEFAULT_DATA));
                return cache;
            }
            cache = JSON.parse(raw);
            // Ensure essential properties exist
            if (!cache.bookmarks) cache.bookmarks = [];
            if (!cache.theme) cache.theme = 'dark';
            return cache;
        } catch (e) {
            console.error('IIE Storage Parse Error', e);
            cache = JSON.parse(JSON.stringify(DEFAULT_DATA));
            return cache;
        }
    }

    function save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            cache = data;
            return true;
        } catch (e) {
            console.error('IIE Storage Save Error (Quota?)', e);
            return false;
        }
    }

    // -- Theme --
    function getTheme() {
        return load().theme || 'dark';
    }

    function setTheme(theme) {
        const data = load();
        data.theme = theme;
        return save(data);
    }

    // -- Bookmarks --
    function getBookmarks() {
        return load().bookmarks || [];
    }

    function isBookmarked(id) {
        return getBookmarks().includes(id);
    }

    function addBookmark(id) {
        const data = load();
        if (!data.bookmarks.includes(id)) {
            data.bookmarks.push(id);
            save(data);
        }
        return data.bookmarks;
    }

    function removeBookmark(id) {
        const data = load();
        data.bookmarks = data.bookmarks.filter(b => b !== id);
        save(data);
        return data.bookmarks;
    }

    function toggleBookmark(id) {
        if (isBookmarked(id)) {
            removeBookmark(id);
            return false;
        }
        addBookmark(id);
        return true;
    }

    // -- Migration --
    // Run once by app.js on startup to move old data into new schema
    function migrate() {
        const data = load();
        let needsSave = false;

        // 1. Migrate old 'theme' key
        const oldTheme = localStorage.getItem('theme');
        if (oldTheme) {
            data.theme = oldTheme;
            localStorage.removeItem('theme');
            needsSave = true;
        }

        // 2. Migrate old 'startup-favorites'
        const oldStartup = localStorage.getItem('startup-favorites');
        if (oldStartup) {
            try {
                const ids = JSON.parse(oldStartup);
                if (Array.isArray(ids)) {
                    ids.forEach(id => {
                        const jId = `startup-${id}`;
                        if (!data.bookmarks.includes(jId)) data.bookmarks.push(jId);
                    });
                }
            } catch (e) {}
            localStorage.removeItem('startup-favorites');
            needsSave = true;
        }

        // 3. Migrate old 'india-explorer-journey'
        const oldJourney = localStorage.getItem('india-explorer-journey');
        if (oldJourney) {
            try {
                const items = JSON.parse(oldJourney);
                if (Array.isArray(items)) {
                    items.forEach(item => {
                        if (item && item.id && !data.bookmarks.includes(item.id)) {
                            data.bookmarks.push(item.id);
                        }
                    });
                }
            } catch (e) {}
            localStorage.removeItem('india-explorer-journey');
            needsSave = true;
        }

        if (needsSave) {
            save(data);
        }
    }

    window.IIEStorage = {
        load,
        save,
        getTheme,
        setTheme,
        getBookmarks,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        migrate
    };
})();

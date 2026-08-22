/* ==========================================================================
   USER BOOKMARKS STORAGE UTILITY
   Persistent localStorage management for My Journey bookmarks.
   ========================================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'user_bookmarks';
    const VERSION = 1;

    // Default structure
    const DEFAULT_DATA = {
        version: VERSION,
        bookmarks: []
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
            return cache;
        } catch (e) {
            console.error('User Bookmarks Storage Parse Error', e);
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
            console.error('User Bookmarks Storage Save Error (Quota?)', e);
            return false;
        }
    }

    // -- Public API --

    function getBookmarks() {
        return load().bookmarks || [];
    }

    function getBookmark(id) {
        const bookmarks = getBookmarks();
        return bookmarks.find(b => b.id === id) || null;
    }

    function isBookmarked(id) {
        return getBookmarks().some(b => b.id === id);
    }

    function addBookmark(bookmark) {
        const data = load();
        const id = bookmark.id;

        // Duplicate prevention
        if (data.bookmarks.some(b => b.id === id)) {
            return data.bookmarks;
        }

        // Assign default region if not provided
        if (!bookmark.region) {
            const typeMap = {
                state: 'South India',
                food: 'Various',
                festival: 'Various',
                monument: 'Various',
                dance: 'Various',
                craft: 'Various'
            };
            bookmark.region = typeMap[bookmark.type] || 'India';
        }

        data.bookmarks.push(bookmark);
        save(data);
        return data.bookmarks;
    }

    function removeBookmark(id) {
        const data = load();
        data.bookmarks = data.bookmarks.filter(b => b.id !== id);
        save(data);
        return data.bookmarks;
    }

    function toggleBookmark(bookmark) {
        const id = bookmark.id;

        if (isBookmarked(id)) {
            removeBookmark(id);
            return { added: false, bookmarks: getBookmarks() };
        }

        addBookmark(bookmark);
        return { added: true, bookmarks: getBookmarks() };
    }

    function clearAll() {
        const data = { version: VERSION, bookmarks: [] };
        save(data);
        return [];
    }

    function countByType() {
        const bookmarks = getBookmarks();
        const counts = {};
        bookmarks.forEach(b => {
            counts[b.type] = (counts[b.type] || 0) + 1;
        });
        return counts;
    }

    function countByRegion() {
        const bookmarks = getBookmarks();
        const counts = {};
        bookmarks.forEach(b => {
            counts[b.region] = (counts[b.region] || 0) + 1;
        });
        return counts;
    }

    // Expose API
    window.UserBookmarks = {
        load,
        save,
        getBookmarks,
        getBookmark,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        clearAll,
        countByType,
        countByRegion
    };
})();
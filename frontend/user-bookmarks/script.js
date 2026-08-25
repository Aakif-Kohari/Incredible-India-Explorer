/* ==========================================================================
   USER BOOKMARKS / MY JOURNE SCRIPT
   Efficient bookmark persistence, filtering, sorting, and UI updates.
   Uses event delegation, in-memory state, and localStorage.
   ========================================================================== */

import { UserBookmarks } from './storage.js';

/* ---- State ---- */
let allBookmarks = [];
let currentFilter = 'all';
let currentSort = 'recently-added';
const PREVIOUS_SORT_KEY = 'user-bookmarks-sort';

/* ---- DOM Elements ---- */
const bookmarksGrid = document.getElementById('bookmarks-grid');
const emptyState = document.getElementById('empty-state');
const exploreCta = document.getElementById('explore-cta');
const filterBtns = document.querySelectorAll('.filter-btn');
const summaryNumbers = {
    states: document.getElementById('states-count'),
    foods: document.getElementById('foods-count'),
    festivals: document.getElementById('festivals-count'),
    experiences: document.getElementById('experiences-count')
};

/* ---- Init ---- */
function init() {
    loadBookmarks();
    applySort();
    renderBookmarks();
    setupEventListeners();
    updateSummary();
    restoreLastSort();
    listenForStorageChanges();
}

/* ---- Load Bookmarks from Storage ---- */
function loadBookmarks() {
    allBookmarks = UserBookmarks.getBookmarks();
}

/* ---- Save Bookmark ---- */
function saveBookmark(bookmark) {
    const result = UserBookmarks.addBookmark(bookmark);
    allBookmarks = result;
    persistBookmarks();
    renderBookmarks();
    updateSummary();
    showToast(`${bookmark.title} saved to My Journey`);
}

/* ---- Remove Bookmark ---- */
function removeBookmark(id) {
    const result = UserBookmarks.removeBookmark(id);
    allBookmarks = result;
    persistBookmarks();
    renderBookmarks();
    updateSummary();
    showToast('Removed from My Journey');
}

/* ---- Persist to localStorage ---- */
function persistBookmarks() {
    UserBookmarks.save({ version: 1, bookmarks: allBookmarks });
}

/* ---- Render Bookmark Cards ---- */
function renderBookmarks() {
    // Apply filter and sort
    let filtered = filterBookmarks(allBookmarks);
    filtered = sortBookmarks(filtered);

    if (filtered.length === 0) {
        bookmarksGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    bookmarksGrid.innerHTML = '';

    filtered.forEach(bookmark => {
        const card = createBookmarkCard(bookmark);
        bookmarksGrid.appendChild(card);
    });
}

/* ---- Create Single Bookmark Card ---- */
function createBookmarkCard(bookmark) {
    const card = document.createElement('div');
    card.className = `bookmark-card${bookmark.isSaved ? ' bookmarked' : ''}`;

    // Set aria attributes for accessibility
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View ${bookmark.title} bookmark`);
    card.setAttribute('data-id', bookmark.id);

    // Handle keyboard activation
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleBookmarkUI(bookmark.id);
        }
    });

    card.addEventListener('click', () => toggleBookmarkUI(bookmark.id));

    // Determine image based on type
    const imageMap = {
        state: 'https://images.unsplash.com/photo-1566194723128-2a98a6a9e5b3?w=400&h=300&fit=crop',
        food: 'https://images.unsplash.com/photo-1507349672310-5f2f40c5d3d5?w=400&h=300&fit=crop',
        festival: 'https://images.unsplash.com/photo-1522071820081-002f1ba3ae9e?w=400&h=300&fit=crop',
        monument: 'https://images.unsplash.com/photo-1561015414-5b21e3bbae0e?w=400&h=300&fit=crop',
        dance: 'https://images.unsplash.com/photo-1550997139-da64d9a0ba44?w=400&h=300&fit=crop',
        craft: 'https://images.unsplash.com/photo-1596467356562-e4e0c58fdd02?w=400&h=300&fit=crop'
    };

    const categoryLabels = {
        state: 'State',
        food: 'Food',
        festival: 'Festival',
        monument: 'Heritage',
        dance: 'Culture',
        craft: 'Craft'
    };

    const regionMap = {
        state: bookmark.region || 'India',
        food: bookmark.region || 'Various',
        festival: bookmark.region || 'Pan-India',
        monument: bookmark.region || 'India',
        dance: bookmark.region || 'India',
        craft: bookmark.region || 'India'
    };

    const typeLabel = categoryLabels[bookmark.type] || 'Experience';

    card.innerHTML = `
        <img class="bookmark-image" src="${imageMap[bookmark.type] || imageMap.food}" alt="${bookmark.title}" loading="lazy">
        <div class="bookmark-content">
            <h3 class="bookmark-title">${bookmark.title}</h3>
            <span class="bookmark-category">${typeLabel}</span>
            <p class="bookmark-region">${regionMap[bookmark.type]}</p>
            <p class="bookmark-description">${bookmark.description || 'Explore this cultural treasure across India.'}</p>
        </div>
        <button class="remove-bookmark" aria-label="Remove ${bookmark.title} from My Journey" title="Remove">
            ✕
        </button>
    `;

    // Add remove bookmark handler
    const removeBtn = card.querySelector('.remove-bookmark');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeBookmark(bookmark.id);
    });

    return card;
}

/* ---- Filter Bookmarks ---- */
function filterBookmarks(bookmarks) {
    if (currentFilter === 'all') return bookmarks;

    return bookmarks.filter(bookmark => {
        const typeMap = {
            state: bookmark.type === 'state',
            food: bookmark.type === 'food',
            festival: bookmark.type === 'festival',
            heritage: bookmark.type === 'monument',
            culture: bookmark.type === 'dance'
        };
        return typeMap[currentFilter] || false;
    });
}

/* ---- Sort Bookmarks ---- */
function sortBookmarks(bookmarks) {
    if (currentSort === 'recently-added') {
        return [...bookmarks].sort((a, b) => b.id.localeCompare(a.id));
    } else if (currentSort === 'alphabetical') {
        return [...bookmarks].sort((a, b) => a.title.localeCompare(b.title));
    } else if (currentSort === 'category') {
        const order = { state: 0, food: 1, festival: 2, monument: 3, dance: 4, craft: 5 };
        return [...bookmarks].sort((a, b) => (order[a.type] || 6) - (order[b.type] || 6));
    }
    return bookmarks;
}

/* ---- Update Sorting Preference ---- */
function setSort(sortType) {
    currentSort = sortType;
    localStorage.setItem(PREVIOUS_SORT_KEY, sortType);
    applySort();
    renderBookmarks();
    updateFilterButtons();
}

/* ---- Apply Sort (update UI) ---- */
function applySort() {
    const sortBtns = document.querySelectorAll('.sort-btn');
    sortBtns.forEach(btn => btn.classList.remove('active'));
    const activeSortBtn = document.querySelector(`.sort-btn[data-sort="${currentSort}"]`);
    if (activeSortBtn) activeSortBtn.classList.add('active');
}

/* ---- Update Filter Buttons Visual ---- */
function updateFilterButtons() {
    filterBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-filter') === currentFilter));
}

/* ---- Toggle Bookmark UI ---- */
function toggleBookmarkUI(id) {
    const bookmark = allBookmarks.find(b => b.id === id);
    if (!bookmark) return;

    if (bookmark.isSaved) {
        removeBookmark(id);
    } else {
        saveBookmark(bookmark);
    }

    // Re-render with updated state
    renderBookmarks();
    updateSummary();
}

/* ---- Update Summary Counts ---- */
function updateSummary() {
    const counts = UserBookmarks.countByType();

    summaryNumbers.states.textContent = counts.state || 0;
    summaryNumbers.foods.textContent = counts.food || 0;
    summaryNumbers.festivals.textContent = counts.festival || 0;
    summaryNumbers.experiences.textContent = counts.craft || 0 || 0; // fallback
}

/* ---- Setup Event Listeners ---- */
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.getAttribute('data-filter');
            localStorage.setItem('user-bookmarks-filter', currentFilter);
            updateFilterButtons();
            renderBookmarks();
        });
    });

    // Sort buttons
    const sortContainer = document.getElementById('sort-container');
    if (sortContainer) {
        const sortBtns = sortContainer.querySelectorAll('.sort-btn');
        sortBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const sortType = btn.getAttribute('data-sort');
                setSort(sortType);
            });
        });
    }

    // CTA link
    if (exploreCta) {
        exploreCta.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/';
        });
    }

    // Keyboard accessibility: Enter/Space on filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}

/* ---- Listen for Storage Changes (cross-page sync) ---- */
function listenForStorageChanges() {
    window.addEventListener('storage', (e) => {
        if (e.key === 'user_bookmarks') {
            loadBookmarks();
            renderBookmarks();
            updateSummary();
        }
    });
}

/* ---- Toast Notification ---- */
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--dark);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 0.875rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ---- Reduced Motion ---- */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-speed', '0s');
}

init();
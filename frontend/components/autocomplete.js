/**
 * Global Search Autocomplete - Reusable Component
 * Accessible, keyboard-navigable, real-time search suggestions.
 *
 * Usage:
 *   createAutocomplete({
 *     input: document.getElementById('search-input'),
 *     data: SEARCH_DATA,
 *     onSelect: (item) => { window.location.href = item.url; }
 *   });
 */

(function (global) {
    'use strict';

    /* ------------------------------------------------------- Configuration */
    const DEFAULTS = {
        maxResults: 5,
        debounceMs: 200,
        minQueryLength: 1
    };

    /* ------------------------------------------------------- Utility Functions */

    /**
     * Normalize string for accent-insensitive matching
     */
    function normalize(str) {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Highlight matching text in a string
     */
    function highlightMatch(text, query) {
        if (!query) return escapeHtml(text);
        const normalizedText = normalize(text);
        const normalizedQuery = normalize(query);
        const idx = normalizedText.indexOf(normalizedQuery);
        if (idx === -1) return escapeHtml(text);

        const before = text.substring(0, idx);
        const match = text.substring(idx, idx + query.length);
        const after = text.substring(idx + query.length);
        return escapeHtml(before) +
            '<span class="ac-highlight">' + escapeHtml(match) + '</span>' +
            escapeHtml(after);
    }

    /**
     * Rank and score a match
     * Returns: -1 (no match), 0 (substring), 1 (word match), 2 (prefix match)
     */
    function scoreMatch(text, query) {
        const nText = normalize(text);
        const nQuery = normalize(query);
        if (nText.startsWith(nQuery)) return 2; // prefix
        if (nText.split(/\s+/).some(word => word === nQuery)) return 1; // exact word
        if (nText.includes(nQuery)) return 0; // substring
        return -1;
    }

    /**
     * Debounce function
     */
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    /* ------------------------------------------------------- Component Factory */

    function createAutocomplete(config) {
        const {
            input,
            data,
            onSelect,
            maxResults = DEFAULTS.maxResults,
            debounceMs = DEFAULTS.debounceMs,
            minQueryLength = DEFAULTS.minQueryLength
        } = config;

        if (!input || !data) {
            console.error('Autocomplete: input and data are required');
            return;
        }

        // State
        let state = {
            isOpen: false,
            activeIndex: -1,
            results: [],
            query: ''
        };

        // Unique IDs for accessibility
        const listId = 'ac-list-' + Math.random().toString(36).slice(2, 9);
        const liveRegionId = 'ac-live-' + Math.random().toString(36).slice(2, 9);

        /* ------------------------------------------------------- DOM Setup */

        // Wrap the input
        const wrapper = document.createElement('div');
        wrapper.className = 'ac-wrapper';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        // Search icon
        const searchIcon = document.createElement('span');
        searchIcon.className = 'ac-search-icon';
        searchIcon.setAttribute('aria-hidden', 'true');
        searchIcon.textContent = '🔍';
        wrapper.insertBefore(searchIcon, input);

        // Clear button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'ac-clear-btn';
        clearBtn.type = 'button';
        clearBtn.setAttribute('aria-label', 'Clear search');
        clearBtn.textContent = '✕';
        clearBtn.tabIndex = -1;
        wrapper.appendChild(clearBtn);

        // Configure input for accessibility
        input.setAttribute('role', 'combobox');
        input.setAttribute('aria-autocomplete', 'list');
        input.setAttribute('aria-expanded', 'false');
        input.setAttribute('aria-controls', listId);
        input.setAttribute('aria-haspopup', 'listbox');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');

        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'ac-dropdown';
        dropdown.id = listId;
        dropdown.setAttribute('role', 'listbox');
        wrapper.appendChild(dropdown);

        // Create live region for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.className = 'ac-live-region';
        liveRegion.id = liveRegionId;
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.setAttribute('role', 'status');
        wrapper.appendChild(liveRegion);

        /* ------------------------------------------------------- Rendering */

        function render() {
            const { isOpen, results, activeIndex, query } = state;

            // Update input state
            wrapper.classList.toggle('has-value', input.value.length > 0);
            input.setAttribute('aria-expanded', String(isOpen));
            dropdown.classList.toggle('is-open', isOpen);

            if (!isOpen) {
                dropdown.innerHTML = '';
                return;
            }

            if (results.length === 0) {
                dropdown.innerHTML = `
                    <div class="ac-empty">
                        <div class="ac-empty-icon">🔍</div>
                        <div class="ac-empty-title">No matching results</div>
                        <div class="ac-empty-subtitle">Try searching for a state,<br>food, monument, or festival.</div>
                    </div>
                `;
                announce('No search results found.');
                return;
            }

            const optionsHtml = results.map((item, idx) => {
                const isActive = idx === activeIndex;
                const categoryMeta = (typeof CATEGORY_META !== 'undefined' && CATEGORY_META[item.category]) ||
                    { icon: '📄', color: '#6366f1' };
                const optionId = listId + '-option-' + idx;

                return `
                    <li class="ac-option ${isActive ? 'is-active' : ''}"
                        id="${optionId}"
                        role="option"
                        aria-selected="${isActive}"
                        data-index="${idx}">
                        <div class="ac-option-icon" style="background: ${categoryMeta.color}20;">
                            <span aria-hidden="true">${categoryMeta.icon}</span>
                        </div>
                        <div class="ac-option-content">
                            <div class="ac-option-title">${highlightMatch(item.title, query)}</div>
                            <div class="ac-option-meta">
                                <span class="ac-category-badge" style="background: ${categoryMeta.color};">
                                    ${escapeHtml(item.category)}
                                </span>
                                ${item.subtitle ? `<span>•</span><span>${escapeHtml(item.subtitle)}</span>` : ''}
                            </div>
                        </div>
                    </li>
                `;
            }).join('');

            dropdown.innerHTML = `
                <ul class="ac-list" role="presentation">
                    ${optionsHtml}
                </ul>
                <div class="ac-footer">
                    <kbd>↑</kbd><kbd>↓</kbd> navigate &nbsp;•&nbsp;
                    <kbd>Enter</kbd> select &nbsp;•&nbsp;
                    <kbd>Esc</kbd> close
                </div>
            `;

            // Update active descendant for ARIA
            if (activeIndex >= 0) {
                const activeId = listId + '-option-' + activeIndex;
                input.setAttribute('aria-activedescendant', activeId);
            } else {
                input.removeAttribute('aria-activedescendant');
            }

            // Bind click handlers on options
            dropdown.querySelectorAll('.ac-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    const idx = parseInt(opt.dataset.index, 10);
                    selectOption(idx);
                });
                opt.addEventListener('mouseenter', () => {
                    setActiveIndex(parseInt(opt.dataset.index, 10));
                });
            });

            // Announce results count
            announce(`${results.length} search result${results.length === 1 ? '' : 's'} available.`);
        }

        /* ------------------------------------------------------- Accessibility Announcements */

        function announce(message) {
            liveRegion.textContent = '';
            setTimeout(() => { liveRegion.textContent = message; }, 50);
        }

        /* ------------------------------------------------------- Search Logic */

        function performSearch(query) {
            state.query = query;
            const normalizedQuery = normalize(query);

            if (normalizedQuery.length < minQueryLength) {
                state.results = [];
                state.isOpen = false;
                state.activeIndex = -1;
                render();
                return;
            }

            // Score and filter results
            const scored = data
                .map(item => {
                    const titleScore = scoreMatch(item.title, query);
                    const subtitleScore = item.subtitle ? scoreMatch(item.subtitle, query) : -1;
                    const categoryScore = scoreMatch(item.category, query);
                    const bestScore = Math.max(titleScore, subtitleScore, categoryScore);
                    return { item, score: bestScore };
                })
                .filter(({ score }) => score >= 0)
                .sort((a, b) => {
                    if (b.score !== a.score) return b.score - a.score;
                    return a.item.title.localeCompare(b.item.title);
                })
                .slice(0, maxResults)
                .map(({ item }) => item);

            state.results = scored;
            state.isOpen = scored.length > 0 || query.length >= minQueryLength;
            state.activeIndex = -1;
            render();
        }

        /* ------------------------------------------------------- Selection Logic */

        function selectOption(idx) {
            const item = state.results[idx];
            if (!item) return;

            input.value = item.title;
            closeDropdown();

            if (typeof onSelect === 'function') {
                onSelect(item);
            } else if (item.url) {
                window.location.href = item.url;
            }

            announce(`Selected ${item.title}, ${item.category}.`);
        }

        function setActiveIndex(idx) {
            if (idx < -1) idx = state.results.length - 1;
            if (idx >= state.results.length) idx = -1;
            state.activeIndex = idx;
            render();

            // Announce highlighted option
            if (idx >= 0 && state.results[idx]) {
                const item = state.results[idx];
                announce(`${item.title}, ${item.category}, ${idx + 1} of ${state.results.length}.`);
            }
        }

        function openDropdown() {
            if (state.results.length === 0 && input.value.length >= minQueryLength) {
                performSearch(input.value);
            }
            state.isOpen = true;
            render();
        }

        function closeDropdown() {
            state.isOpen = false;
            state.activeIndex = -1;
            render();
        }

        /* ------------------------------------------------------- Event Handlers */

        const debouncedSearch = debounce((query) => {
            performSearch(query);
        }, debounceMs);

        input.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });

        input.addEventListener('focus', () => {
            if (input.value.length >= minQueryLength) {
                openDropdown();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (!state.isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
                openDropdown();
                e.preventDefault();
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setActiveIndex(state.activeIndex + 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setActiveIndex(state.activeIndex - 1);
                    break;
                case 'Enter':
                    if (state.isOpen && state.activeIndex >= 0) {
                        e.preventDefault();
                        selectOption(state.activeIndex);
                    }
                    break;
                case 'Escape':
                    if (state.isOpen) {
                        e.preventDefault();
                        closeDropdown();
                        input.focus();
                    }
                    break;
                case 'Tab':
                    if (state.isOpen) {
                        closeDropdown();
                    }
                    break;
            }
        });

        clearBtn.addEventListener('click', () => {
            input.value = '';
            state.results = [];
            state.isOpen = false;
            state.activeIndex = -1;
            render();
            input.focus();
            announce('Search cleared.');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target) && state.isOpen) {
                closeDropdown();
            }
        });

        // Close on blur (with small delay to allow click events)
        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (document.activeElement !== input && !wrapper.contains(document.activeElement)) {
                    closeDropdown();
                }
            }, 150);
        });

        // Initial render
        render();

        /* ------------------------------------------------------- Public API */
        return {
            open: openDropdown,
            close: closeDropdown,
            clear: () => {
                input.value = '';
                state.results = [];
                state.isOpen = false;
                state.activeIndex = -1;
                render();
            },
            setValue: (value) => {
                input.value = value;
                performSearch(value);
            },
            destroy: () => {
                wrapper.parentNode.insertBefore(input, wrapper);
                wrapper.remove();
            }
        };
    }

    // Expose globally
    global.createAutocomplete = createAutocomplete;

})(typeof window !== 'undefined' ? window : this);

/* ------------------------------------------------------- Auto-Initialize on Homepage */
(function () {
    'use strict';

    function initGlobalSearch() {
        // Look for the main search input
        const searchInput = document.querySelector('#global-search-input, .global-search-input, [data-autocomplete]');
        if (!searchInput || typeof SEARCH_DATA === 'undefined') return;

        createAutocomplete({
            input: searchInput,
            data: SEARCH_DATA,
            onSelect: (item) => {
                if (item.url) {
                    // Resolve relative paths properly
                    let url = item.url;
                    if (!url.startsWith('/') && !url.startsWith('http')) {
                        url = '../../' + url;
                    }
                    window.location.href = url;
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobalSearch);
    } else {
        initGlobalSearch();
    }
})();

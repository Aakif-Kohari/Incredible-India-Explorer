/**
 * UNESCO Heritage Explorer
 * heritage.js
 */

(function () {
    "use strict";

    const data = Array.isArray(window.HERITAGE_DATA)
        ? window.HERITAGE_DATA
        : [];

    const state = {
        search: "",
        stateFilter: "all",
        categoryFilter: "all",
        bookmarks: loadBookmarks()
    };

    const elements = {
        grid: document.getElementById("heritage-grid"),
        search: document.getElementById("heritage-search"),
        stateFilter: document.getElementById("state-filter"),
        categoryFilter: document.getElementById("category-filter"),
        randomButton: document.getElementById("random-heritage"),
        bookmarksButton: document.getElementById("show-bookmarks"),
        resultCount: document.getElementById("result-count"),
        totalCount: document.getElementById("total-count"),
        emptyState: document.getElementById("empty-state"),
        modal: document.getElementById("heritage-modal"),
        modalBody: document.getElementById("modal-body"),
        closeModal: document.getElementById("close-modal"),
        toast: document.getElementById("heritage-toast")
    };

    let showingBookmarksOnly = false;

    function loadBookmarks() {
        try {
            const saved = localStorage.getItem(
                "iie_unesco_heritage_bookmarks"
            );

            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn("Unable to load heritage bookmarks:", error);
            return [];
        }
    }

    function saveBookmarks() {
        try {
            localStorage.setItem(
                "iie_unesco_heritage_bookmarks",
                JSON.stringify(state.bookmarks)
            );
        } catch (error) {
            console.warn("Unable to save heritage bookmarks:", error);
        }
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function populateFilters() {
        const states = [...new Set(data.map(item => item.state))]
            .sort();

        const categories = [...new Set(data.map(item => item.category))]
            .sort();

        if (elements.stateFilter) {
            elements.stateFilter.innerHTML =
                `<option value="all">All States</option>` +
                states
                    .map(
                        stateName =>
                            `<option value="${escapeHTML(stateName)}">${escapeHTML(stateName)}</option>`
                    )
                    .join("");
        }

        if (elements.categoryFilter) {
            elements.categoryFilter.innerHTML =
                `<option value="all">All Categories</option>` +
                categories
                    .map(
                        category =>
                            `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`
                    )
                    .join("");
        }

        if (elements.totalCount) {
            elements.totalCount.textContent = data.length;
        }
    }

    function getFilteredData() {
        const searchTerm = state.search.trim().toLowerCase();

        return data.filter(item => {
            const matchesSearch =
                !searchTerm ||
                [
                    item.name,
                    item.state,
                    item.location,
                    item.category,
                    item.period,
                    item.description,
                    item.significance
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesState =
                state.stateFilter === "all" ||
                item.state === state.stateFilter;

            const matchesCategory =
                state.categoryFilter === "all" ||
                item.category === state.categoryFilter;

            const matchesBookmark =
                !showingBookmarksOnly ||
                state.bookmarks.includes(item.id);

            return (
                matchesSearch &&
                matchesState &&
                matchesCategory &&
                matchesBookmark
            );
        });
    }

    function renderCards() {
        const filtered = getFilteredData();

        if (elements.resultCount) {
            elements.resultCount.textContent = filtered.length;
        }

        if (!elements.grid) return;

        if (!filtered.length) {
            elements.grid.innerHTML = "";

            if (elements.emptyState) {
                elements.emptyState.classList.add("visible");
            }

            return;
        }

        if (elements.emptyState) {
            elements.emptyState.classList.remove("visible");
        }

        elements.grid.innerHTML = filtered
            .map(createCard)
            .join("");

        attachCardListeners();
    }

    function createCard(item) {
        const bookmarked = state.bookmarks.includes(item.id);

        return `
            <article class="heritage-card">
                <div class="card-image">
                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >

                    <span class="card-category">
                        ${escapeHTML(item.category)}
                    </span>

                    <button
                        class="bookmark-btn ${bookmarked ? "active" : ""}"
                        data-bookmark="${escapeHTML(item.id)}"
                        aria-label="${bookmarked ? "Remove bookmark" : "Bookmark"} ${escapeHTML(item.name)}"
                        title="${bookmarked ? "Remove bookmark" : "Bookmark"}"
                    >
                        ${bookmarked ? "★" : "☆"}
                    </button>
                </div>

                <div class="card-content">
                    <h3>${escapeHTML(item.name)}</h3>

                    <div class="card-location">
                        📍 ${escapeHTML(item.location)}
                    </div>

                    <p class="card-description">
                        ${escapeHTML(item.description)}
                    </p>

                    <div class="card-meta">
                        <div class="meta-item">
                            <span class="meta-label">UNESCO Year</span>
                            <span class="meta-value">${escapeHTML(item.year)}</span>
                        </div>

                        <div class="meta-item">
                            <span class="meta-label">Period</span>
                            <span class="meta-value">${escapeHTML(item.period)}</span>
                        </div>
                    </div>

                    <button
                        class="view-details"
                        data-details="${escapeHTML(item.id)}"
                    >
                        Explore Heritage →
                    </button>
                </div>
            </article>
        `;
    }

    function attachCardListeners() {
        document
            .querySelectorAll("[data-bookmark]")
            .forEach(button => {
                button.addEventListener("click", event => {
                    event.stopPropagation();

                    toggleBookmark(
                        button.getAttribute("data-bookmark")
                    );
                });
            });

        document
            .querySelectorAll("[data-details]")
            .forEach(button => {
                button.addEventListener("click", () => {
                    openDetails(
                        button.getAttribute("data-details")
                    );
                });
            });
    }

    function toggleBookmark(id) {
        const index = state.bookmarks.indexOf(id);

        if (index >= 0) {
            state.bookmarks.splice(index, 1);
            showToast("Removed from favourites");
        } else {
            state.bookmarks.push(id);
            showToast("Added to favourites");
        }

        saveBookmarks();
        renderCards();
    }

    function openDetails(id) {
        const item = data.find(site => site.id === id);

        if (!item || !elements.modal || !elements.modalBody) {
            return;
        }

        elements.modalBody.innerHTML = `
            <img
                class="modal-image"
                src="${escapeHTML(item.image)}"
                alt="${escapeHTML(item.name)}"
                onerror="this.style.display='none';"
            >

            <div class="modal-body">
                <div class="modal-top">
                    <div>
                        <h2>${escapeHTML(item.name)}</h2>
                        <div class="modal-location">
                            📍 ${escapeHTML(item.location)}
                        </div>
                    </div>

                    <button
                        class="close-modal"
                        id="dynamic-close-modal"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div class="detail-grid">
                    <div class="detail-box">
                        <strong>State / Region</strong>
                        ${escapeHTML(item.state)}
                    </div>

                    <div class="detail-box">
                        <strong>Category</strong>
                        ${escapeHTML(item.category)}
                    </div>

                    <div class="detail-box">
                        <strong>UNESCO Inscription</strong>
                        ${escapeHTML(item.year)}
                    </div>

                    <div class="detail-box">
                        <strong>Historical Period</strong>
                        ${escapeHTML(item.period)}
                    </div>

                    <div class="detail-box">
                        <strong>Recommended Duration</strong>
                        ${escapeHTML(item.duration)}
                    </div>

                    <div class="detail-box">
                        <strong>Bookmark Status</strong>
                        ${state.bookmarks.includes(item.id)
                            ? "★ Saved"
                            : "☆ Not saved"}
                    </div>
                </div>

                <div class="modal-section">
                    <h3>About the Site</h3>
                    <p>${escapeHTML(item.description)}</p>
                </div>

                <div class="modal-section">
                    <h3>Cultural Significance</h3>
                    <p>${escapeHTML(item.significance)}</p>
                </div>

                <div class="modal-section">
                    <h3>Nearby Attractions</h3>
                    <ul class="nearby-list">
                        ${item.nearby
                            .map(
                                place =>
                                    `<li>${escapeHTML(place)}</li>`
                            )
                            .join("")}
                    </ul>
                </div>
            </div>
        `;

        elements.modal.classList.add("open");
        elements.modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const dynamicClose =
            document.getElementById("dynamic-close-modal");

        if (dynamicClose) {
            dynamicClose.addEventListener("click", closeModal);
        }
    }

    function closeModal() {
        if (!elements.modal) return;

        elements.modal.classList.remove("open");
        elements.modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function showToast(message) {
        if (!elements.toast) return;

        elements.toast.textContent = message;
        elements.toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            elements.toast.classList.remove("show");
        }, 2200);
    }

    function showRandomHeritage() {
        const available = getFilteredData();

        if (!available.length) {
            showToast("No heritage sites match the current filters.");
            return;
        }

        const random =
            available[Math.floor(Math.random() * available.length)];

        openDetails(random.id);
    }

    function toggleBookmarksView() {
        showingBookmarksOnly = !showingBookmarksOnly;

        if (elements.bookmarksButton) {
            elements.bookmarksButton.textContent =
                showingBookmarksOnly
                    ? "Show All Sites"
                    : "★ My Favourites";
        }

        renderCards();
    }

    function resetFilters() {
        state.search = "";
        state.stateFilter = "all";
        state.categoryFilter = "all";
        showingBookmarksOnly = false;

        if (elements.search) {
            elements.search.value = "";
        }

        if (elements.stateFilter) {
            elements.stateFilter.value = "all";
        }

        if (elements.categoryFilter) {
            elements.categoryFilter.value = "all";
        }

        if (elements.bookmarksButton) {
            elements.bookmarksButton.textContent = "★ My Favourites";
        }

        renderCards();
    }

    function setupEvents() {
        if (elements.search) {
            elements.search.addEventListener("input", event => {
                state.search = event.target.value;
                renderCards();
            });
        }

        if (elements.stateFilter) {
            elements.stateFilter.addEventListener("change", event => {
                state.stateFilter = event.target.value;
                renderCards();
            });
        }

        if (elements.categoryFilter) {
            elements.categoryFilter.addEventListener("change", event => {
                state.categoryFilter = event.target.value;
                renderCards();
            });
        }

        if (elements.randomButton) {
            elements.randomButton.addEventListener(
                "click",
                showRandomHeritage
            );
        }

        if (elements.bookmarksButton) {
            elements.bookmarksButton.addEventListener(
                "click",
                toggleBookmarksView
            );
        }

        if (elements.closeModal) {
            elements.closeModal.addEventListener(
                "click",
                closeModal
            );
        }

        if (elements.modal) {
            elements.modal.addEventListener("click", event => {
                if (event.target === elements.modal) {
                    closeModal();
                }
            });
        }

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeModal();
            }
        });

        const resetButton =
            document.getElementById("reset-filters");

        if (resetButton) {
            resetButton.addEventListener(
                "click",
                resetFilters
            );
        }
    }

    function init() {
        if (!data.length) {
            console.error(
                "HERITAGE_DATA is missing or empty."
            );
            return;
        }

        populateFilters();
        setupEvents();
        renderCards();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
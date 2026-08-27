// zoho.js — Zoho: India's Software Product Journey Explorer logic

(function () {
    let selectedCategory = null;

    function renderStats() {
        const grid = document.getElementById("stats-grid");
        if (!grid) return;
        grid.innerHTML = ZOHO_STATS.map(
            (s) => `
            <div class="stat-item">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join("");
    }

    function renderOrigin() {
        document.getElementById("origin-intro").textContent = ZOHO_ORIGIN.intro;
        const grid = document.getElementById("origin-facts-grid");
        grid.innerHTML = ZOHO_ORIGIN.facts
            .map(
                (f) => `
            <div class="origin-fact-item">
                <div class="origin-fact-title">${f.title}</div>
                <div class="origin-fact-detail">${f.detail}</div>
            </div>`
            )
            .join("");
    }

    function renderFounder() {
        const f = ZOHO_FOUNDER;
        document.getElementById("founder-name").textContent = f.name;
        document.getElementById("founder-role").textContent = f.role;
        document.getElementById("founder-bio").textContent = f.bio;
        document.getElementById("founder-philosophy").textContent = f.philosophy;
    }

    function renderEcosystemCategories() {
        const grid = document.getElementById("ecosystem-categories");
        if (!grid) return;
        grid.innerHTML = ZOHO_PRODUCT_ECOSYSTEM.map(
            (c) => `
            <div class="ecosystem-category-card${c.category === selectedCategory ? " selected" : ""}"
                 data-category="${c.category}" style="--cat-color: ${c.color};">
                <div class="ecosystem-category-icon">${c.icon}</div>
                <div class="ecosystem-category-name">${c.category}</div>
                <div class="ecosystem-category-count">${c.products.length} products</div>
            </div>`
        ).join("");

        grid.querySelectorAll(".ecosystem-category-card").forEach((card) => {
            card.addEventListener("click", () => selectCategory(card.dataset.category));
        });
    }

    function selectCategory(category) {
        selectedCategory = category;
        renderEcosystemCategories();
        renderProductsPanel();
    }

    function renderProductsPanel() {
        const panel = document.getElementById("ecosystem-products-panel");
        const cat = ZOHO_PRODUCT_ECOSYSTEM.find((c) => c.category === selectedCategory);

        if (!cat) {
            panel.innerHTML = `<p class="ecosystem-panel-placeholder">Select a category above to explore its products.</p>`;
            return;
        }

        panel.innerHTML = `
            <div class="ecosystem-panel-title">${cat.icon} ${cat.category}</div>
            <div class="ecosystem-product-grid">
                ${cat.products
                    .map(
                        (p) => `
                    <div class="ecosystem-product-item" style="--cat-color: ${cat.color};">
                        <div class="ecosystem-product-name">${p.name}</div>
                        <div class="ecosystem-product-desc">${p.desc}</div>
                    </div>`
                    )
                    .join("")}
            </div>
        `;
    }

    function renderTimeline() {
        const el = document.getElementById("zoho-timeline");
        if (!el) return;
        el.innerHTML = ZOHO_MILESTONES.map(
            (m) => `
            <div class="timeline-item">
                <div class="timeline-year">${m.year}</div>
                <div class="timeline-title">${m.title}</div>
                <div class="timeline-desc">${m.desc}</div>
            </div>`
        ).join("");
    }

    function renderGlobal() {
        document.getElementById("global-intro").textContent = ZOHO_GLOBAL.intro;
        const grid = document.getElementById("global-facts-grid");
        grid.innerHTML = ZOHO_GLOBAL.facts
            .map(
                (f) => `
            <div class="global-fact-item">
                <div class="global-fact-title">${f.title}</div>
                <div class="global-fact-detail">${f.detail}</div>
            </div>`
            )
            .join("");
    }

    function renderPhilosophy() {
        const grid = document.getElementById("philosophy-grid");
        if (!grid) return;
        grid.innerHTML = ZOHO_PHILOSOPHY.map(
            (p) => `
            <div class="philosophy-item">
                <div class="philosophy-title">${p.title}</div>
                <div class="philosophy-desc">${p.desc}</div>
            </div>`
        ).join("");
    }

    function renderReferences() {
        const el = document.getElementById("references-list");
        if (!el) return;
        el.innerHTML = ZOHO_REFERENCES.map(
            (r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.text}</a></li>`
        ).join("");
    }

    function bindThemeToggle() {
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-theme");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            btn.textContent = isLight ? "🌙" : "☀️";
        });
        if (document.body.classList.contains("light-theme")) {
            btn.textContent = "🌙";
        }
    }

    function init() {
        renderStats();
        renderOrigin();
        renderFounder();
        renderEcosystemCategories();
        renderProductsPanel();
        renderTimeline();
        renderGlobal();
        renderPhilosophy();
        renderReferences();
        bindThemeToggle();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
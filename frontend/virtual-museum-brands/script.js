document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const searchInput = document.getElementById("search-input");
    const categoryFilters = document.getElementById("category-filters");
    const featuredGrid = document.getElementById("featured-grid");
    const exhibitsGrid = document.getElementById("exhibits-grid");
    const noResults = document.getElementById("no-results");
    const mapGroup = document.getElementById("map-paths");
    const tooltip = document.getElementById("map-tooltip");
    const btnClearMap = document.getElementById("all-india-btn");
    const stateDisplay = document.getElementById("current-state-display");
    
    // Compare Elements
    const compareSelect1 = document.getElementById("compare-select-1");
    const compareSelect2 = document.getElementById("compare-select-2");
    const compareContainer = document.getElementById("compare-table-container");
    const compareTbody = document.getElementById("compare-tbody");
    
    // Global Timeline
    const globalTimeline = document.getElementById("global-timeline");
    
    // Modal Overlay
    const overlay = document.getElementById("exhibit-overlay");
    const closeExhibitBtn = document.getElementById("close-exhibit");
    const exhibitInner = document.getElementById("exhibit-inner");

    // State
    let activeCategory = "all";
    let activeState = null;
    let searchQuery = "";

    // Initialization
    function init() {
        renderCategoryFilters();
        renderMap();
        populateCompareSelects();
        renderGlobalTimeline();
        
        applyFiltersAndRender();

        // Event Listeners
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            applyFiltersAndRender();
        });

        btnClearMap.addEventListener("click", () => {
            selectState(null);
        });

        compareSelect1.addEventListener("change", renderComparison);
        compareSelect2.addEventListener("change", renderComparison);
        
        closeExhibitBtn.addEventListener("click", () => {
            overlay.classList.add("hidden");
            // Also update URL to remove hash without jumping
            history.pushState("", document.title, window.location.pathname + window.location.search);
        });

        // Close modal on outside click
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.add("hidden");
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        });

        // Routing via Hash
        handleHashRoute();
        window.addEventListener("hashchange", handleHashRoute);
    }

    function handleHashRoute() {
        const hash = window.location.hash;
        if (hash.startsWith("#brand-")) {
            const id = hash.replace("#brand-", "");
            const brand = brandsData.find(b => b.id === id);
            if (brand) openExhibit(brand);
        } else {
            overlay.classList.add("hidden");
        }
    }

    // Render Filters
    function renderCategoryFilters() {
        categories.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "cat-btn";
            btn.setAttribute("data-cat", cat.id);
            btn.innerHTML = `${cat.icon} ${cat.name}`;
            
            btn.addEventListener("click", () => {
                document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeCategory = cat.id;
                applyFiltersAndRender();
            });
            categoryFilters.appendChild(btn);
        });
        
        // All button handler
        document.querySelector(".cat-btn[data-cat='all']").addEventListener("click", function() {
            document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            activeCategory = "all";
            applyFiltersAndRender();
        });
    }

    // Render Map
    function renderMap() {
        if (typeof indiaMapData === 'undefined') return;

        const statesWithBrands = new Set(brandsData.map(b => b.origin.state));

        Object.keys(indiaMapData).forEach(stateKey => {
            const stateName = indiaMapData[stateKey].name;
            const pathData = indiaMapData[stateKey].path;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathData);
            path.setAttribute("id", `state-${stateKey}`);
            
            if (statesWithBrands.has(stateName)) {
                path.classList.add("has-brand");
            }

            path.addEventListener("mouseenter", (e) => {
                tooltip.textContent = stateName;
                tooltip.classList.remove("hidden");
            });

            path.addEventListener("mousemove", (e) => {
                tooltip.style.left = `${e.pageX}px`;
                tooltip.style.top = `${e.pageY - 15}px`;
            });

            path.addEventListener("mouseleave", () => {
                tooltip.classList.add("hidden");
            });

            path.addEventListener("click", () => {
                selectState(stateName, stateKey);
            });

            mapGroup.appendChild(path);
        });
    }

    function selectState(stateName, stateKey = null) {
        activeState = stateName;
        
        // Update Map UI
        const paths = mapGroup.querySelectorAll("path");
        paths.forEach(p => p.classList.remove("selected"));
        if (stateKey) {
            const selectedPath = document.getElementById(`state-${stateKey}`);
            if (selectedPath) selectedPath.classList.add("selected");
        }

        stateDisplay.textContent = `Showing: ${stateName || "All India"}`;
        applyFiltersAndRender();
    }

    // Apply Filters & Render Grids
    function applyFiltersAndRender() {
        const filteredBrands = brandsData.filter(brand => {
            const matchesCat = activeCategory === "all" || brand.category === activeCategory;
            const matchesState = !activeState || brand.origin.state === activeState;
            const matchesSearch = 
                brand.name.toLowerCase().includes(searchQuery) ||
                brand.founder.toLowerCase().includes(searchQuery) ||
                brand.industry.toLowerCase().includes(searchQuery) ||
                brand.origin.city.toLowerCase().includes(searchQuery) ||
                brand.origin.state.toLowerCase().includes(searchQuery) ||
                brand.products.some(p => p.toLowerCase().includes(searchQuery));
                
            return matchesCat && matchesState && matchesSearch;
        });

        renderFeaturedGrid(filteredBrands);
        renderExhibitsGrid(filteredBrands);
    }

    function renderFeaturedGrid(filteredBrands) {
        featuredGrid.innerHTML = "";
        const featured = filteredBrands.filter(b => b.featured);
        
        if (featured.length === 0) {
            featuredGrid.innerHTML = "<p>No featured exhibits match the current filters.</p>";
            return;
        }

        featured.forEach(brand => {
            const catInfo = categories.find(c => c.id === brand.category);
            const card = document.createElement("div");
            card.className = "featured-card";
            card.innerHTML = `
                <h3 class="fc-title">${brand.name}</h3>
                <div class="fc-meta">
                    <span>📍 ${brand.origin.city}, ${brand.origin.state}</span>
                    <span>📅 ${brand.foundingYear}</span>
                    <span>👤 ${brand.founder}</span>
                </div>
                <p class="fc-desc">${brand.description}</p>
            `;
            card.addEventListener("click", () => navigateToBrand(brand.id));
            featuredGrid.appendChild(card);
        });
    }

    function renderExhibitsGrid(filteredBrands) {
        exhibitsGrid.innerHTML = "";
        
        if (filteredBrands.length === 0) {
            noResults.classList.remove("hidden");
            return;
        }
        noResults.classList.add("hidden");

        filteredBrands.forEach(brand => {
            const catInfo = categories.find(c => c.id === brand.category);
            const card = document.createElement("div");
            card.className = "exhibit-card";
            card.innerHTML = `
                <div class="ec-cat">${catInfo ? catInfo.icon : '🏛️'}</div>
                <h3 class="ec-title">${brand.name}</h3>
                <div class="ec-meta">
                    <span>${brand.industry}</span>
                    <span>📍 ${brand.origin.city}</span>
                    <span>📅 ${brand.foundingYear}</span>
                </div>
                <p class="ec-desc">${brand.description}</p>
            `;
            card.addEventListener("click", () => navigateToBrand(brand.id));
            exhibitsGrid.appendChild(card);
        });
    }

    // Global Timeline
    function renderGlobalTimeline() {
        globalTimeline.innerHTML = "";
        // Sort brands by founding year
        const sortedBrands = [...brandsData].sort((a, b) => a.foundingYear - b.foundingYear);
        
        sortedBrands.forEach(brand => {
            const item = document.createElement("div");
            item.className = "gt-item";
            item.innerHTML = `
                <div class="gt-year">${brand.foundingYear}</div>
                <div class="gt-brand">${brand.name}</div>
            `;
            item.addEventListener("click", () => navigateToBrand(brand.id));
            globalTimeline.appendChild(item);
        });
    }

    // Comparison Logic
    function populateCompareSelects() {
        brandsData.sort((a, b) => a.name.localeCompare(b.name)).forEach(brand => {
            const opt1 = new Option(brand.name, brand.id);
            const opt2 = new Option(brand.name, brand.id);
            compareSelect1.add(opt1);
            compareSelect2.add(opt2);
        });
    }

    function renderComparison() {
        const id1 = compareSelect1.value;
        const id2 = compareSelect2.value;

        if (!id1 || !id2) {
            compareContainer.classList.add("hidden");
            return;
        }

        const b1 = brandsData.find(b => b.id === id1);
        const b2 = brandsData.find(b => b.id === id2);

        document.getElementById("compare-head-1").textContent = b1.name;
        document.getElementById("compare-head-2").textContent = b2.name;

        compareTbody.innerHTML = `
            <tr>
                <td><strong>Founding Year</strong></td>
                <td>${b1.foundingYear}</td>
                <td>${b2.foundingYear}</td>
            </tr>
            <tr>
                <td><strong>Origin</strong></td>
                <td>${b1.origin.city}, ${b1.origin.state}</td>
                <td>${b2.origin.city}, ${b2.origin.state}</td>
            </tr>
            <tr>
                <td><strong>Founder</strong></td>
                <td>${b1.founder}</td>
                <td>${b2.founder}</td>
            </tr>
            <tr>
                <td><strong>Industry</strong></td>
                <td>${b1.industry}</td>
                <td>${b2.industry}</td>
            </tr>
            <tr>
                <td><strong>Products</strong></td>
                <td>${b1.products.join(", ")}</td>
                <td>${b2.products.join(", ")}</td>
            </tr>
            <tr>
                <td><strong>Status</strong></td>
                <td>${b1.currentStatus}</td>
                <td>${b2.currentStatus}</td>
            </tr>
        `;
        
        compareContainer.classList.remove("hidden");
    }

    // Exhibit Overlay
    function navigateToBrand(brandId) {
        window.location.hash = `brand-${brandId}`;
    }

    function openExhibit(brand) {
        const catInfo = categories.find(c => c.id === brand.category);
        
        let timelineHtml = brand.timeline.map(t => `
            <div class="eht-item">
                <div class="eht-year">${t.year}</div>
                <strong>${t.title}</strong>
                <p>${t.description}</p>
            </div>
        `).join("");

        let evolutionHtml = brand.evolution.map(e => `
            <div class="eht-item">
                <div class="eht-year">${e.year}</div>
                <strong>${e.title}</strong>
                <p>${e.description}</p>
            </div>
        `).join("");

        let productsHtml = brand.products.map(p => `<span class="product-tag">${p}</span>`).join("");
        
        let sourcesHtml = brand.sources.map(s => `<li><a href="${s.url}" target="_blank">${s.title}</a> (${s.type})</li>`).join("");
        let imageCreditsHtml = brand.imageCredits.map(ic => `<li><strong>${ic.description}:</strong> ${ic.source} (License: ${ic.license})</li>`).join("");

        exhibitInner.innerHTML = `
            <div class="eh-hero">
                <span class="badge" style="margin-bottom: 1rem;">${catInfo ? catInfo.icon + ' ' + catInfo.name : brand.category}</span>
                <h2 class="eh-title">${brand.name}</h2>
                <div class="eh-meta-grid">
                    <div class="eh-meta-item"><strong>Founded</strong><span>${brand.foundingYear}</span></div>
                    <div class="eh-meta-item"><strong>Origin</strong><span>${brand.origin.city}, ${brand.origin.state}</span></div>
                    <div class="eh-meta-item"><strong>Founder</strong><span>${brand.founder}</span></div>
                    <div class="eh-meta-item"><strong>Industry</strong><span>${brand.industry}</span></div>
                </div>
            </div>
            
            <div class="eh-section">
                <h3>📜 About the Brand</h3>
                <p class="eh-text">${brand.description}</p>
            </div>

            <div class="eh-section">
                <h3>🛒 Key Products & Services</h3>
                <div class="eh-products">${productsHtml}</div>
            </div>

            <div class="eh-section" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
                <div>
                    <h3>⏳ Historical Timeline</h3>
                    <div class="eh-timeline">${timelineHtml}</div>
                </div>
                <div>
                    <h3>🎨 Brand Evolution</h3>
                    <div class="eh-timeline">${evolutionHtml}</div>
                </div>
            </div>

            <div class="eh-section">
                <h3>📈 Current Status</h3>
                <p class="eh-text">${brand.currentStatus}</p>
            </div>

            <div class="eh-section eh-sources">
                <h3 style="font-size: 1.2rem; color: #475569;">Sources & Image Credits</h3>
                <ul>
                    ${sourcesHtml}
                    ${imageCreditsHtml}
                </ul>
            </div>
        `;
        
        overlay.classList.remove("hidden");
    }

    // Run
    init();
});

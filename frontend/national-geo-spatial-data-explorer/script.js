document.addEventListener('DOMContentLoaded', () => {
    // Dataset Collection (Validated unique metadata IDs matching registry)
    const geospatialDatasets = [
        {
            id: "GIS-IND-101",
            title: "Cartosat-3 High Resolution Topography",
            category: "topography",
            agency: "ISRO NRSC",
            format: "GeoTIFF / DEM",
            resolution: "0.35 Meters",
            description: "High precision Panchromatic and Multi-spectral elevation mesh covering Himalayan passes, Western Ghats ranges, and coastal terrain.",
            downloads: 14200
        },
        {
            id: "GIS-IND-102",
            title: "National Hydrological Basin Matrix",
            category: "hydrology",
            agency: "Central Water Commission",
            format: "ESRI Vector Shapefile",
            resolution: "1:50,000 Scale",
            description: "Complete stream network, river catchments, and watershed boundary polygons for Ganga, Brahmaputra, Godavari, and Narmada basins.",
            downloads: 9800
        },
        {
            id: "GIS-IND-103",
            title: "National Forest Canopy Density Map",
            category: "vegetation",
            agency: "Forest Survey of India (FSI)",
            format: "GeoPackage / Raster",
            resolution: "24 Meters",
            description: "Biennial forest cover assessment classifying Very Dense Forest (VDF), Moderately Dense Forest (MDF), and Mangrove wetlands.",
            downloads: 18500
        },
        {
            id: "GIS-IND-104",
            title: "Urban Sprawl & PM GatiShakti Corridor",
            category: "urban",
            agency: "Survey of India (SoI)",
            format: "GeoJSON Vector",
            resolution: "Sub-meter Vector",
            description: "National expressway spatial alignment, multi-modal logistics parks, railway freight corridors, and metro expansion zones.",
            downloads: 22100
        },
        {
            id: "GIS-IND-105",
            title: "Alluvial Soil & Agro-Ecological Zones",
            category: "vegetation",
            agency: "ICAR-NBSS & LUP",
            format: "KML / GeoTIFF",
            resolution: "250 Meters",
            description: "Mapping of 20 agro-ecological sub-regions, soil salinity indices, organic carbon distribution, and crop suitability zones.",
            downloads: 7400
        },
        {
            id: "GIS-IND-106",
            title: "Coastal Vulnerability & Mangrove Radar",
            category: "hydrology",
            agency: "INCOIS / MoES",
            format: "NetCDF / HDF5",
            resolution: "50 Meters",
            description: "Storm surge inundation vectors, shoreline change rate polygons, and sea-level rise vulnerability index along India's 7,516 km coastline.",
            downloads: 11300
        }
    ];

    // DOM References
    const cardsContainer = document.getElementById('layer-cards-container');
    const searchInput = document.getElementById('layer-search');
    const categoryButtons = document.querySelectorAll('.filter-btn');
    const activeCounter = document.getElementById('active-count');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const runSimBtn = document.getElementById('run-simulation-btn');
    const simResultBox = document.getElementById('sim-result');

    // Theme Toggle Handler
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // Render Cards Function
    function renderCards(data) {
        cardsContainer.innerHTML = '';
        if (data.length === 0) {
            cardsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="font-size: 1.1rem; font-weight: 600;">No Geospatial Datasets Match Your Query</p>
                    <p style="font-size: 0.85rem;">Try adjusting your keyword filter or select "All Layers".</p>
                </div>
            `;
            activeCounter.textContent = "Showing 0 Datasets";
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'layer-card';
            card.innerHTML = `
                <div>
                    <span class="card-tag">${item.category}</span>
                    <h4 class="card-title">${item.title}</h4>
                    <p class="card-desc">${item.description}</p>
                </div>
                <div>
                    <div class="card-meta">
                        <div class="meta-row">
                            <span class="meta-label">Nodal Agency:</span>
                            <span class="meta-value">${item.agency}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Format:</span>
                            <span class="meta-value">${item.format}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Spatial Resolution:</span>
                            <span class="meta-value">${item.resolution}</span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-query" onclick="alert('Querying Bhuvan WMS Service for ${item.title} (${item.id})... Remote layer active.')">
                            <i class="fa-solid fa-eye"></i> Preview GIS Layer
                        </button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        activeCounter.textContent = `Showing ${data.length} Datasets`;
    }

    // Filter Handler
    let activeCategory = 'all';
    let searchQuery = '';

    function filterData() {
        const filtered = geospatialDatasets.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery) ||
                                  item.description.toLowerCase().includes(searchQuery) ||
                                  item.agency.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
        renderCards(filtered);
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            filterData();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterData();
    });

    // Run Simulator Handler
    runSimBtn.addEventListener('click', () => {
        const region = document.getElementById('sim-region').value;
        const domain = document.getElementById('sim-domain').value;

        document.getElementById('sim-title').textContent = `Simulated Query Result: ${domain} across ${region}`;
        document.getElementById('res-area').textContent = `${(Math.floor(Math.random() * 10000) + 5000).toLocaleString()} sq km`;
        document.getElementById('res-density').textContent = `${(Math.random() * 30 + 65).toFixed(1)}% Estimated Index`;
        document.getElementById('res-description').textContent = `[Simulation Output] Telemetry processing generated for ${region}. Synthetic Cartosat model indicates consistent spatial canopy integrity and minimal erosion vectors.`;

        simResultBox.classList.remove('hidden');
    });

    // Initial Render
    renderCards(geospatialDatasets);
});

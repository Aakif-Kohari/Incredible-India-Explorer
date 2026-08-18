document.addEventListener('DOMContentLoaded', () => {
    // Green Hydrogen & Electrolyser Projects Collection
    const hydrogenProjects = [
        {
            id: "NGHM-H2-01",
            name: "Deendayal Kandla Port Green H2 Mega Hub",
            type: "port",
            location: "Kandla, Gujarat",
            capacity: "1 Million Metric Tons / Year",
            developer: "L&T / Reliance / Adani Total",
            incentive: "SIGHT Component II (Hub Incentive)",
            description: "Deepwater green hydrogen hub featuring dedicated offshore wind power integration, desalinated seawater feedstock, and green ammonia export docks.",
            status: "Land Allocation Phase"
        },
        {
            id: "NGHM-H2-02",
            name: "Paradip Port Green Ammonia Bunkering Terminal",
            type: "hub",
            location: "Paradip, Odisha",
            capacity: "1.2 MMT Green Ammonia / Year",
            developer: "ACME Group / IFFCO / IOCL",
            incentive: "SIGHT Green Ammonia Export Scheme",
            description: "World-scale green ammonia synthesis plant converting atmospheric nitrogen and green H2 into zero-carbon maritime fuel and agricultural fertilizers.",
            status: "FEED Phase"
        },
        {
            id: "NGHM-H2-03",
            name: "Ohmium & Reliance Alkaline Electrolyser Gigafactory",
            type: "electrolyser",
            location: "Bengaluru & Jamnagar",
            capacity: "2,000 MW Electrolysers / Year",
            promoter: "Ohmium International / Reliance New Energy",
            incentive: "SIGHT Component I (Electrolyser Manufacturing)",
            description: "Indigenously manufactured hyper-efficient pressurized alkaline water electrolyser stacks operating under high-current density.",
            status: "Commercial Production Active"
        },
        {
            id: "NGHM-H2-04",
            name: "V.O. Chidambaranar Port Green H2 Hub",
            type: "port",
            location: "Tuticorin, Tamil Nadu",
            capacity: "500,000 Tons H2 / Year",
            developer: "VOCPT / NTPC Green Energy",
            incentive: "MNRE Pilot Green Ports Program",
            description: "Southern green maritime hub supporting hydrogen-fueled tugboats, coastal ferries, and international green ammonia shipping corridors.",
            status: "Under Construction"
        },
        {
            id: "NGHM-H2-05",
            name: "Indian Railways Hydrogen Fuel Cell Train Hub",
            type: "mobility",
            location: "Jind, Haryana",
            capacity: "35 H2 Fuel Cell Trains",
            developer: "Indian Railways / Medha Servo",
            incentive: "MNRE Transport Pilot Project",
            description: "Decarbonizing heritage narrow-gauge and branch railway lines using 1.2 MW hydrogen fuel cell engines and 350-bar refuelling stations.",
            status: "Trial Phase"
        },
        {
            id: "NGHM-H2-06",
            name: "Gopalpur Green Hydrogen & Steel Complex",
            type: "hub",
            location: "Gopalpur, Odisha",
            capacity: "600,000 Tons H2 / Year",
            developer: "Avaada Group / Tata Steel",
            incentive: "SIGHT Direct Reduction Iron (DRI) Scheme",
            description: "Integration of green hydrogen into Direct Reduced Iron (DRI) steelmaking furnaces to replace metallurgical coking coal.",
            status: "Land Lease Approved"
        }
    ];

    // DOM Elements
    const cardsContainer = document.getElementById('h2-cards-container');
    const searchInput = document.getElementById('h2-search');
    const categoryButtons = document.querySelectorAll('.filter-btn');
    const activeCounter = document.getElementById('active-count');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const runCalcBtn = document.getElementById('run-calc-btn');
    const calcResultBox = document.getElementById('calc-result');

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
                    <i class="fa-solid fa-atom" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="font-size: 1.1rem; font-weight: 600;">No Green Hydrogen Projects Match Your Query</p>
                    <p style="font-size: 0.85rem;">Try adjusting keyword filters or select "All Infrastructure".</p>
                </div>
            `;
            activeCounter.textContent = "Showing 0 Projects";
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'h2-card';
            card.innerHTML = `
                <div>
                    <span class="card-tag">${item.type}</span>
                    <h4 class="card-title">${item.name}</h4>
                    <p class="card-desc">${item.description}</p>
                </div>
                <div>
                    <div class="card-meta">
                        <div class="meta-row">
                            <span class="meta-label">Location:</span>
                            <span class="meta-value">${item.location}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Output Capacity:</span>
                            <span class="meta-value" style="color: var(--primary-color);">${item.capacity}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">Scheme Incentive:</span>
                            <span class="meta-value">${item.incentive}</span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-query" onclick="alert('Accessing MNRE NGHM Telemetry Portal for ${item.name} (${item.id})... Target compliance active.')">
                            <i class="fa-solid fa-circle-nodes"></i> View NGHM Project Dossier
                        </button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        activeCounter.textContent = `Showing ${data.length} Hydrogen Projects`;
    }

    // Filter Logic
    let activeType = 'all';
    let searchQuery = '';

    function filterData() {
        const filtered = hydrogenProjects.filter(item => {
            const matchesType = activeType === 'all' || item.type === activeType;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                                  item.location.toLowerCase().includes(searchQuery) ||
                                  item.description.toLowerCase().includes(searchQuery);
            return matchesType && matchesSearch;
        });
        renderCards(filtered);
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeType = btn.getAttribute('data-type');
            filterData();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterData();
    });

    // Electrolyser Calculation Logic
    runCalcBtn.addEventListener('click', () => {
        const capacityMw = parseFloat(document.getElementById('calc-capacity').value) || 500;
        const tech = document.getElementById('calc-tech').value;

        // Specific Power Consumption (kWh / kg H2) & SIGHT Base Subsidy (₹/kg H2)
        let spc = 55; // Alkaline
        let sightSubsidyBase = 30; // ₹30/kg Year 1 average

        if (tech === "pem") {
            spc = 58;
            sightSubsidyBase = 30;
        } else if (tech === "soec") {
            spc = 42; // High efficiency heat integration
            sightSubsidyBase = 30;
        } else if (tech === "aem") {
            spc = 52;
            sightSubsidyBase = 30;
        }

        // Annual H2 = (Capacity MW * 1000 kW * 8760 hours * 0.9 capacity factor) / spc
        const annualKgH2 = (capacityMw * 1000 * 8760 * 0.9) / spc;
        const annualMetricTons = (annualKgH2 / 1000).toFixed(0);
        const dedicatedRePower = (capacityMw * 2.3).toFixed(0); // RE over-provisioning factor
        const totalSubsidyCrore = ((annualKgH2 * sightSubsidyBase) / 10000000).toFixed(1);

        document.getElementById('calc-title').textContent = `Yield Calculated: ${capacityMw} MW ${tech.toUpperCase()} Plant`;
        document.getElementById('res-h2').textContent = `${Number(annualMetricTons).toLocaleString()} Metric Tons Green H2 / Year`;
        document.getElementById('res-power').textContent = `${Number(dedicatedRePower).toLocaleString()} MW Dedicated RE Capacity`;
        document.getElementById('res-subsidy').textContent = `₹${totalSubsidyCrore} Crore (SIGHT Year-1 Subsidy)`;

        calcResultBox.classList.remove('hidden');
    });

    // Initial Execution
    renderCards(hydrogenProjects);
});

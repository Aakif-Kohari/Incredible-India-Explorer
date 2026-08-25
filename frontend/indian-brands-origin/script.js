// Indian Brands Data
const indianBrands = [
    {
        state: "Maharashtra",
        city: "Mumbai",
        brand: "Tata Group",
        industry: "Conglomerate",
        foundingYear: 1868,
        shortHistory: "Founded by Jamsetji Tata in Mumbai as a trading company, it has grown into one of the largest and most respected conglomerates in the world, spanning steel, automotive, software, and consumer goods."
    },
    {
        state: "Maharashtra",
        city: "Mumbai",
        brand: "Reliance Industries",
        industry: "Conglomerate",
        foundingYear: 1958,
        shortHistory: "Founded by Dhirubhai Ambani in Mumbai originally as a commodities trading business, it is now India's largest public company, dominating telecom, retail, and petrochemicals."
    },
    {
        state: "Maharashtra",
        city: "Mumbai",
        brand: "Godrej Group",
        industry: "Consumer Goods & Real Estate",
        foundingYear: 1897,
        shortHistory: "Founded by Ardeshir Godrej and Pirojsha Burjorji Godrej, it started with the manufacturing of locks and evolved into real estate, appliances, and FMCG."
    },
    {
        state: "Gujarat",
        city: "Anand",
        brand: "Amul",
        industry: "Dairy",
        foundingYear: 1946,
        shortHistory: "Spearheaded by Tribhuvandas Patel and Dr. Verghese Kurien under the Gujarat Co-operative Milk Marketing Federation, it sparked India's White Revolution, making India the world's largest milk producer."
    },
    {
        state: "Gujarat",
        city: "Ahmedabad",
        brand: "Nirma",
        industry: "FMCG",
        foundingYear: 1969,
        shortHistory: "Started by Karsanbhai Patel who made and sold detergent powder door-to-door on his bicycle, it successfully challenged multinational monopolies in the Indian detergent market."
    },
    {
        state: "Karnataka",
        city: "Bengaluru",
        brand: "Infosys",
        industry: "Information Technology",
        foundingYear: 1981,
        shortHistory: "Founded in Pune but headquartered and heavily associated with Bengaluru, it was started by N.R. Narayana Murthy and six others with an initial capital of just $250."
    },
    {
        state: "Karnataka",
        city: "Bengaluru",
        brand: "Wipro",
        industry: "Information Technology",
        foundingYear: 1945,
        shortHistory: "Originally founded by Mohamed Premji in Amalner, Maharashtra as Western India Palm Refined Oil Limited, it was pivoted by Azim Premji from vegetable oils to IT in Bengaluru."
    },
    {
        state: "Karnataka",
        city: "Bengaluru",
        brand: "Biocon",
        industry: "Biopharmaceuticals",
        foundingYear: 1978,
        shortHistory: "Founded by Kiran Mazumdar-Shaw out of a garage in Bengaluru, it became the first Indian company to manufacture and export enzymes to the US and Europe."
    },
    {
        state: "Tamil Nadu",
        city: "Chennai",
        brand: "TVS Motor Company",
        industry: "Automotive",
        foundingYear: 1978,
        shortHistory: "Part of the TVS Group founded by T.V. Sundaram Iyengar, it introduced India's first two-seater moped and has grown into one of the largest two-wheeler manufacturers globally."
    },
    {
        state: "Tamil Nadu",
        city: "Chennai",
        brand: "MRF (Madras Rubber Factory)",
        industry: "Tyre Manufacturing",
        foundingYear: 1946,
        shortHistory: "Started by K. M. Mammen Mappillai as a toy balloon manufacturing unit in Madras, it transitioned to tread rubber and is now India's largest tyre manufacturer."
    },
    {
        state: "Delhi",
        city: "New Delhi",
        brand: "Maruti Suzuki",
        industry: "Automotive",
        foundingYear: 1981,
        shortHistory: "Established by the Government of India as Maruti Udyog Limited (later partnering with Suzuki), it revolutionized personal transport in India with the iconic Maruti 800."
    },
    {
        state: "Delhi",
        city: "New Delhi",
        brand: "Bharti Airtel",
        industry: "Telecommunications",
        foundingYear: 1995,
        shortHistory: "Founded by Sunil Bharti Mittal, it started as a push-button phone manufacturer and evolved into one of the world's leading providers of telecommunication services."
    },
    {
        state: "West Bengal",
        city: "Kolkata",
        brand: "ITC Limited",
        industry: "Conglomerate",
        foundingYear: 1910,
        shortHistory: "Established originally as the Imperial Tobacco Company of India Limited, it has diversified broadly into FMCG, hotels, packaging, paperboards, and agri-business."
    },
    {
        state: "West Bengal",
        city: "Kolkata",
        brand: "Britannia Industries",
        industry: "Food & Beverage",
        foundingYear: 1892,
        shortHistory: "Founded in Kolkata with an initial investment of ₹295, it is one of India's oldest existing companies and a market leader in the biscuit industry."
    },
    {
        state: "Uttar Pradesh",
        city: "Noida",
        brand: "HCL Technologies",
        industry: "Information Technology",
        foundingYear: 1976,
        shortHistory: "Founded by Shiv Nadar and associates in a Delhi barsati (roof room), the company effectively created India's IT hardware industry before moving into global software services."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const mapGroup = document.getElementById("map-paths");
    const tooltip = document.getElementById("map-tooltip");
    const brandsGrid = document.getElementById("brands-grid");
    const stateDisplay = document.getElementById("current-state-display");
    const allIndiaBtn = document.getElementById("all-india-btn");
    
    let selectedState = null;

    // Check if map data is available (from india-map-data.js)
    if (typeof indiaMapData === 'undefined') {
        brandsGrid.innerHTML = `<div class="empty-state">Error: India Map Data not loaded. Please ensure india-map-data.js is available.</div>`;
        return;
    }

    // Determine states that have brands
    const statesWithBrands = new Set(indianBrands.map(b => b.state));

    // Render Map
    Object.keys(indiaMapData).forEach(stateKey => {
        const stateName = indiaMapData[stateKey].name;
        const pathData = indiaMapData[stateKey].path;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("id", `state-${stateKey}`);
        path.setAttribute("data-name", stateName);
        
        if (statesWithBrands.has(stateName)) {
            path.classList.add("has-data");
        }

        // Interactivity
        path.addEventListener("mouseenter", (e) => {
            tooltip.textContent = stateName;
            tooltip.classList.remove("hidden");
        });

        path.addEventListener("mousemove", (e) => {
            // Need bounding client rect of svg to position correctly
            const svgRect = document.getElementById("india-map").getBoundingClientRect();
            // simple tracking relative to the mouse
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

    // Render Brands
    function renderBrands(stateFilter) {
        brandsGrid.innerHTML = "";
        
        const filtered = stateFilter 
            ? indianBrands.filter(b => b.state === stateFilter)
            : indianBrands;

        if (filtered.length === 0) {
            brandsGrid.innerHTML = `<div class="empty-state">No prominent brands listed for ${stateFilter} in this archive.</div>`;
            return;
        }

        filtered.forEach(brand => {
            const card = document.createElement("div");
            card.className = "brand-card";
            
            card.innerHTML = `
                <div class="brand-header">
                    <div>
                        <h3 class="brand-name">${brand.brand}</h3>
                        <div class="brand-location">📍 ${brand.city}, ${brand.state}</div>
                    </div>
                    <div class="brand-year">Est. ${brand.foundingYear}</div>
                </div>
                <div class="brand-details">
                    <div class="detail-group">
                        <h4>Industry</h4>
                        <p>${brand.industry}</p>
                    </div>
                    <div class="detail-group">
                        <h4>Origin City</h4>
                        <p>${brand.city}</p>
                    </div>
                </div>
                <p class="brand-history">${brand.shortHistory}</p>
            `;
            brandsGrid.appendChild(card);
        });
    }

    function selectState(stateName, stateKey) {
        selectedState = stateName;
        
        // Update Map UI
        const paths = mapGroup.querySelectorAll("path");
        paths.forEach(p => p.classList.remove("selected"));
        if (stateKey) {
            const selectedPath = document.getElementById(`state-${stateKey}`);
            if (selectedPath) selectedPath.classList.add("selected");
        }

        // Update Text
        stateDisplay.textContent = `Showing: ${stateName || "All India"}`;
        
        // Re-render cards
        renderBrands(selectedState);
    }

    allIndiaBtn.addEventListener("click", () => {
        selectState(null, null);
    });

    // Initial render
    renderBrands(null);
});

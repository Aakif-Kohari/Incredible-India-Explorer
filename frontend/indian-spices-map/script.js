(function () {
    "use strict";

    // Spice Data grouped by region ID
    const spiceData = {
        "kerala": [
            {
                name: "Black Pepper",
                region: "Kerala",
                significance: "Historically important to Kerala's spice trade and often associated with the region.",
                uses: ["Cooking", "Traditional preparations", "Spice trade"]
            },
            {
                name: "Cardamom",
                region: "Kerala",
                significance: "Known for its cultivation in the Western Ghats and importance in Indian cuisine and trade.",
                uses: ["Sweets and desserts", "Masala chai", "Savory dishes"]
            }
        ],
        "telangana-andhra": [
            {
                name: "Turmeric",
                region: "Telangana / Andhra Pradesh",
                significance: "Widely cultivated in India and important in Indian cuisine and cultural practices.",
                uses: ["Cooking and curries", "Traditional medicine", "Religious ceremonies"]
            }
        ]
    };

    // DOM Elements
    const mapRegions = document.querySelectorAll(".spices-region");
    const emptyState = document.getElementById("empty-state");
    const spiceDetailsContainer = document.getElementById("spice-details");

    /**
     * Initializes the Interactive Spices Map
     */
    function initializeSpicesMap() {
        if (!mapRegions.length || !emptyState || !spiceDetailsContainer) {
            console.error("Indian Spices Map: Required DOM elements are missing.");
            return;
        }

        // Add event listeners to all interactive regions
        mapRegions.forEach(region => {
            region.addEventListener("click", () => selectRegion(region));
            region.addEventListener("keydown", (e) => handleRegionKeydown(e, region));
        });
    }

    /**
     * Handles the selection of a map region
     * @param {HTMLElement} selectedRegion - The region element that was selected
     */
    function selectRegion(selectedRegion) {
        try {
            // Remove active class from all regions
            mapRegions.forEach(r => r.classList.remove("active"));
            
            // Add active class to selected region
            selectedRegion.classList.add("active");

            const regionId = selectedRegion.id;
            updateSpicePanel(regionId);
        } catch (error) {
            console.error("Indian Spices Map: Error selecting region", error);
        }
    }

    /**
     * Handles keyboard interactions for accessibility
     * @param {KeyboardEvent} e - The keyboard event
     * @param {HTMLElement} region - The region element
     */
    function handleRegionKeydown(e, region) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // Prevent page scroll on Space
            selectRegion(region);
        }
    }

    /**
     * Updates the information panel with spice data
     * @param {string} regionId - The ID of the selected region
     */
    function updateSpicePanel(regionId) {
        const spices = spiceData[regionId];

        if (!spices || spices.length === 0) {
            // Handle missing data gracefully
            spiceDetailsContainer.innerHTML = "";
            spiceDetailsContainer.classList.add("hidden");
            emptyState.classList.remove("hidden");
            emptyState.innerHTML = "<h3>No Spices Found</h3><p>We do not have spice data for this region yet.</p>";
            return;
        }

        // Hide empty state and show details container
        emptyState.classList.add("hidden");
        spiceDetailsContainer.classList.remove("hidden");

        // Build HTML for all spices in the region
        let htmlContent = "";
        
        spices.forEach(spice => {
            const usesListHtml = spice.uses.map(use => `<li>${use}</li>`).join("");
            
            htmlContent += `
                <article class="spice-card">
                    <h2>${spice.name}</h2>
                    <div class="spice-region">Region: ${spice.region}</div>
                    
                    <h3 class="spice-section-title">Significance</h3>
                    <p>${spice.significance}</p>
                    
                    <h3 class="spice-section-title">Common Uses</h3>
                    <ul class="spice-uses-list">
                        ${usesListHtml}
                    </ul>
                </article>
            `;
        });

        spiceDetailsContainer.innerHTML = htmlContent;
    }

    // Initialize when DOM is fully loaded
    document.addEventListener("DOMContentLoaded", initializeSpicesMap);

})();

(function () {
    "use strict";

    // Dataset of Traditional Indian Attire
    const attireData = {
        "jammu-kashmir": {
            state: "Jammu & Kashmir",
            attire: "Phiran",
            image: "../../assets/images/attire/phiran.webp",
            description: "A traditional Kashmiri garment commonly associated with the region's cultural heritage. It is a long, loose gown worn to provide protection against the cold winter.",
            occasions: "Daily wear in winter, cultural festivals",
            material: "Wool (for winters) or Cotton (for summers)",
            alt: "Traditional Kashmiri phiran"
        },
        "punjab": {
            state: "Punjab",
            attire: "Patiala Suit & Kurta Pyjama",
            image: "../../assets/images/attire/punjab-attire.webp",
            description: "The traditional Patiala suit for women features a loose, pleated trouser. Men typically wear a Kurta with Muktsari Pyjamas, often paired with a vibrant Turban.",
            occasions: "Baisakhi, Lohri, weddings, and daily wear",
            material: "Cotton, silk, and phulkari embroidery",
            alt: "Traditional Punjabi Patiala suit and Kurta"
        },
        "rajasthan": {
            state: "Rajasthan",
            attire: "Ghagra Choli",
            image: "../../assets/images/attire/rajasthan-attire.webp",
            description: "A vibrant combination of a long skirt (Ghagra), blouse (Choli), and a draped dupatta (Odhni). Known for its bright colors, mirror work, and intricate embroidery.",
            occasions: "Teej, Gangaur, weddings, and folk performances",
            material: "Cotton, silk, georgette with Zari and Gota Patti work",
            alt: "Traditional Rajasthani Ghagra Choli"
        },
        "gujarat": {
            state: "Gujarat",
            attire: "Chaniya Choli",
            image: "../../assets/images/attire/gujarat-attire.webp",
            description: "Similar to the Ghagra Choli but distinctly Gujarati. It features a beautifully embroidered skirt and blouse, often decorated with bandhani prints and mirror work.",
            occasions: "Navratri (Garba), weddings, and regional festivals",
            material: "Cotton and silk blends with extensive mirror work",
            alt: "Traditional Gujarati Chaniya Choli"
        },
        "maharashtra": {
            state: "Maharashtra",
            attire: "Nauvari Saree",
            image: "../../assets/images/attire/nauvari.webp",
            description: "The Nauvari (nine-yard) saree is a traditional Maharashtrian style of saree known for its distinctive draping, tucked at the back to allow freedom of movement.",
            occasions: "Festivals, ceremonies, and traditional weddings",
            material: "Cotton and silk (often Paithani weave)",
            alt: "Traditional Maharashtrian Nauvari Saree"
        },
        "west-bengal": {
            state: "West Bengal",
            attire: "Traditional Bengali Saree (Garad / Tant)",
            image: "../../assets/images/attire/bengal-attire.webp",
            description: "Known for the quintessential red border on a white or off-white base (Garad). Typically draped in the distinct Bengali style with pleats folded inwards.",
            occasions: "Durga Puja, religious ceremonies, and cultural events",
            material: "Crisp cotton (Tant) or silk (Garad/Korial)",
            alt: "Traditional Bengali Saree"
        },
        "kerala": {
            state: "Kerala",
            attire: "Kasavu Saree / Mundu",
            image: "../../assets/images/attire/kasavu.webp",
            description: "A traditional Kerala attire known for its simple, elegant white or off-white appearance with a distinct gold (Kasavu) border.",
            occasions: "Onam, Vishu, weddings, and temple visits",
            material: "Handloom cotton with zari (gold thread)",
            alt: "Traditional Kerala Kasavu Saree and Mundu"
        },
        "tamil-nadu": {
            state: "Tamil Nadu",
            attire: "Kanchipuram Saree / Veshti",
            image: "../../assets/images/attire/kanchipuram.webp",
            description: "Women traditionally wear the heavily silk-woven Kanchipuram sarees, while men wear a white unstitched cloth called a Veshti paired with a shirt or Angavastram.",
            occasions: "Pongal, weddings, classical dance performances",
            material: "Pure mulberry silk, cotton",
            alt: "Traditional Tamil Nadu Kanchipuram Saree and Veshti"
        },
        "assam": {
            state: "Assam",
            attire: "Mekhela Chador",
            image: "../../assets/images/attire/mekhela.webp",
            description: "A two-piece traditional garment draped like a saree. The bottom portion is the Mekhela, folded into pleats, and the top is the Chador.",
            occasions: "Bihu, weddings, and traditional gatherings",
            material: "Muga silk (golden silk native to Assam), Pat, and Eri silk",
            alt: "Traditional Assamese Mekhela Chador"
        },
        "himachal-pradesh": {
            state: "Himachal Pradesh",
            attire: "Traditional Himachali Attire",
            image: "../../assets/images/attire/himachal-attire.webp",
            description: "Features warm, layered clothing. Women wear long kurtas with salwars and distinctive headscarves (Dhatu). Men wear kurtas with the iconic Himachali Topi.",
            occasions: "Kullu Dussehra, winter festivals, daily wear",
            material: "Handwoven wool, pashmina, and thick cotton",
            alt: "Traditional Himachali clothing and caps"
        }
    };

    // DOM Elements
    const stateSelect = document.getElementById("attire-state");
    const attireImage = document.getElementById("attire-image");
    const attireFallback = document.getElementById("attire-fallback");
    const attireContent = document.getElementById("attire-content");
    const attireEmptyState = document.getElementById("attire-empty-state");
    
    const nameEl = document.getElementById("attire-name");
    const regionEl = document.getElementById("attire-region-text");
    const descEl = document.getElementById("attire-description");
    const occasionsEl = document.getElementById("attire-occasions");
    const materialEl = document.getElementById("attire-material");

    /**
     * Initializes the Traditional Attire Explorer
     */
    function initializeAttireExplorer() {
        if (!stateSelect || !attireContent) {
            console.error("Traditional Attire Explorer: Required DOM elements are missing.");
            return;
        }

        stateSelect.addEventListener("change", handleStateSelection);
        
        // Custom error handler for images to show fallback UI
        attireImage.addEventListener("error", function() {
            this.classList.add("hidden");
            attireFallback.classList.add("active");
        });
        
        attireImage.addEventListener("load", function() {
            this.classList.remove("hidden");
            attireFallback.classList.remove("active");
        });
    }

    /**
     * Handles state selection change
     */
    function handleStateSelection() {
        const selectedValue = stateSelect.value;
        if (!selectedValue) return;

        updateAttire(selectedValue);
    }

    /**
     * Updates the UI with the selected attire data
     * @param {string} stateKey - The key of the selected state in the data object
     */
    function updateAttire(stateKey) {
        const data = attireData[stateKey];

        if (!data) {
            console.error(`No attire data found for state: ${stateKey}`);
            return;
        }

        try {
            // Update Image
            // We set hidden first to ensure the onload/onerror handles revealing it
            attireImage.classList.add("hidden");
            attireFallback.classList.remove("active");
            
            attireImage.src = data.image;
            attireImage.alt = data.alt;

            // Update Text Content
            nameEl.textContent = data.attire;
            regionEl.textContent = data.state;
            descEl.textContent = data.description;
            occasionsEl.textContent = data.occasions;
            materialEl.textContent = data.material;

            // Show Content Panel
            attireEmptyState.classList.add("hidden");
            attireContent.classList.remove("hidden");
            
        } catch (error) {
            console.error("Error updating attire data:", error);
        }
    }

    // Initialize when DOM is fully loaded
    document.addEventListener("DOMContentLoaded", initializeAttireExplorer);

})();

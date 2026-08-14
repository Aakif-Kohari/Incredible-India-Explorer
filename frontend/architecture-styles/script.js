(function () {
    "use strict";

    // Structured data for Architecture Styles
    const architectureStyles = [
        {
            id: "nagara",
            name: "Nagara Architecture",
            region: "Northern India",
            period: "Medieval period (5th century CE onwards)",
            description: "A major North Indian temple architecture tradition characterized by curvilinear towers (shikhara) and regionally varied temple plans. The structure often emphasizes vertical lines and is typically built on a raised stone platform.",
            features: [
                "Curvilinear shikhara (tower over the sanctum)",
                "Sanctum-centered planning (Garbhagriha)",
                "Detailed exterior ornamentation",
                "Vertical emphasis",
                "Built on a raised platform (Jagati)",
                "Amalaka and Kalasha placed at the top"
            ],
            examples: [
                "Kandariya Mahadeva Temple, Khajuraho",
                "Lingaraja Temple, Bhubaneswar",
                "Sun Temple, Modhera"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Nagara temple architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "dravidian",
            name: "Dravidian Architecture",
            region: "Southern India",
            period: "7th to 16th century CE (Pallava, Chola, Pandya, Vijayanagara periods)",
            description: "A prominent style of Hindu temple architecture in South India. It is easily recognizable by its pyramid-shaped towers (Vimana) and massive, elaborately carved gateway towers (Gopurams).",
            features: [
                "Pyramid-shaped Vimana over the main shrine",
                "Massive entrance gateways called Gopurams",
                "Large temple complexes with boundary walls",
                "Pillared halls (Mandapas) with intricate carvings",
                "Presence of a temple tank (Kalyani)",
                "Dwarapalas (guardians) at the entrance"
            ],
            examples: [
                "Brihadisvara Temple, Thanjavur",
                "Meenakshi Amman Temple, Madurai",
                "Shore Temple, Mahabalipuram"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Dravidian temple architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "vesara",
            name: "Vesara Architecture",
            region: "Deccan & Central India",
            period: "11th to 13th century CE (Chalukya, Rashtrakuta, Hoysala)",
            description: "A hybrid style that combines features of both Nagara and Dravidian architecture. Often found in the Deccan region, it features a star-shaped plan and heavily ornate pillars.",
            features: [
                "Blend of Nagara and Dravidian elements",
                "Reduced height of the Vimana compared to Dravidian style",
                "Star-shaped (stellate) ground plan in later Hoysala examples",
                "Intricately carved lathe-turned pillars",
                "Richly decorated wall panels and moldings"
            ],
            examples: [
                "Chennakeshava Temple, Belur",
                "Hoysaleswara Temple, Halebidu",
                "Durga Temple, Aihole"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Vesara architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "indo-islamic",
            name: "Indo-Islamic Architecture",
            region: "Indian Subcontinent",
            period: "12th to 18th century CE (Delhi Sultanate, Mughal Empire)",
            description: "A synthesis of Indian and Islamic architectural elements. It brought new structural techniques to India, such as the true arch and the dome, replacing the traditional trabeate (post-and-lintel) system.",
            features: [
                "Use of true arches, vaults, and domes",
                "Minarets and large courtyards",
                "Extensive use of mortar",
                "Decorative elements like calligraphy, geometric patterns, and arabesque (no human figures)",
                "Jali (lattice) work for ventilation and light",
                "Charbagh (four-part) garden layout in Mughal architecture"
            ],
            examples: [
                "Taj Mahal, Agra",
                "Qutub Minar, Delhi",
                "Jama Masjid, Delhi",
                "Humayun's Tomb, Delhi"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Indo-Islamic architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "rajput",
            name: "Rajput Architecture",
            region: "Rajasthan & Central India",
            period: "8th to 18th century CE",
            description: "A prominent regional style known for its majestic forts and opulent palaces. It effectively blends indigenous structural features with Mughal architectural elements.",
            features: [
                "Massive hill forts with impregnable walls",
                "Ornate palaces (Mahals) and courtyards",
                "Use of Jharokhas (overhanging enclosed balconies)",
                "Chhatris (elevated, dome-shaped pavilions)",
                "Elaborate mirror work and frescoes",
                "Stepwells (Baoris) for water conservation"
            ],
            examples: [
                "Amber Fort, Jaipur",
                "Mehrangarh Fort, Jodhpur",
                "City Palace, Udaipur",
                "Hawa Mahal, Jaipur"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Rajput architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "buddhist",
            name: "Buddhist Architecture",
            region: "Across India",
            period: "3rd century BCE to 12th century CE",
            description: "Originating during the Mauryan period, it revolves around the life and teachings of Buddha. Key structures include Stupas for relics, Chaityas (prayer halls), and Viharas (monasteries).",
            features: [
                "Stupas (hemispherical mounds containing relics)",
                "Chaityas (prayer halls with a stupa at one end)",
                "Viharas (monasteries for monks)",
                "Elaborately carved Toranas (gateways)",
                "Rock-cut cave architecture",
                "Ashokan pillars with animal capitals"
            ],
            examples: [
                "Sanchi Stupa, Madhya Pradesh",
                "Ajanta & Ellora Caves, Maharashtra",
                "Mahabodhi Temple, Bodh Gaya"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Buddhist architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "kalinga",
            name: "Kalinga Architecture",
            region: "Odisha (Eastern India)",
            period: "7th to 13th century CE",
            description: "A distinct sub-style of Nagara architecture found in the ancient Kalinga region. It is classified into three types: Rekha Deula (sanctum), Pidha Deula (hall), and Khakhara Deula.",
            features: [
                "Rekha Deula: Tall, curvilinear tower over the sanctum",
                "Pidha Deula: Square hall with a pyramid-shaped roof",
                "Deul (sanctum) and Jagamohana (assembly hall) combination",
                "Intricate exterior carvings contrasting with plain interiors",
                "Distinctive boundary walls"
            ],
            examples: [
                "Jagannath Temple, Puri",
                "Konark Sun Temple, Konark",
                "Mukteshvara Temple, Bhubaneswar"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Kalinga architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "kerala",
            name: "Kerala Architecture",
            region: "Kerala (South-Western India)",
            period: "8th century CE onwards",
            description: "Adapted to the region's heavy rainfall and tropical climate, this style is characterized by steeply pitched roofs, extensive use of wood, and integration with the surrounding natural environment.",
            features: [
                "Steeply pitched roofs covered with clay tiles or thatch",
                "Extensive use of timber (teak, rosewood) with elaborate carvings",
                "Nalukettu (traditional courtyard house) layout",
                "Open verandas for ventilation",
                "Temples feature circular, square, or rectangular bases",
                "Gable windows to let out smoke and heat"
            ],
            examples: [
                "Padmanabhapuram Palace, Kanyakumari (historical Kerala style)",
                "Vadakkunnathan Temple, Thrissur",
                "Thirunelli Temple, Wayanad"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of Kerala architecture",
            imageCredit: "Representative Image"
        },
        {
            id: "shekhawati-haveli",
            name: "Shekhawati Havelis",
            region: "Rajasthan (Shekhawati Region)",
            period: "18th to 20th Century",
            description: "Traditional courtyard mansions of Marwari merchants, renowned for their intricate fresco paintings, jharokhas, and passive desert-climate adaptations.",
            features: [
                "Extensive fresco paintings covering interior and exterior walls",
                "Internal courtyards (chowks) serving as cooling shafts and family centers",
                "Jharokhas (overhanging enclosed balconies) for ventilation and privacy",
                "Constructed from local stone, lime plaster, and robust timber",
                "Massive wooden entrance doors (torana) with intricate carvings",
                "Designed for passive cooling in extreme desert climates"
            ],
            examples: [
                "Nawalgarh Havelis",
                "Mandawa Havelis",
                "Fatehpur Havelis"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of a Shekhawati Haveli",
            imageCredit: "Representative Image",
            exploreUrl: "../shekhawati-haveli-explorer/index.html"},
 {
            id: "pol-houses",
            name: "Pol Houses",
            region: "Ahmedabad (Gujarat)",
            period: "Traditional / Vernacular Architecture",
            description: "A traditional, community-oriented housing cluster found in Ahmedabad, known for intricately carved wooden facades and shared courtyard spaces.",
            features: [
                "Clustered housing forming a secure neighborhood",
                "Intricately carved wooden facades, brackets, and columns",
                "Central open-to-sky courtyards (chowks) for ventilation",
                "Chabutras (bird-feeding towers) placed in community squares",
                "Narrow, shaded streets serving as pedestrian zones and social spaces",
                "Heavy wooden main entrance gates (Pratoli)"
            ],
            examples: [
                "Old City of Ahmedabad (UNESCO World Heritage City)"
            ],
            image: "../../assets/images/placeholder.jpg",
            imageAlt: "Example of an Ahmedabad Pol",
            imageCredit: "Representative Image",
            exploreUrl: "../pol-houses-explorer/index.html"
        }
    ];

    // DOM Elements
    const elements = {
        styleList: document.getElementById("arch-style-list"),
        title: document.getElementById("arch-title"),
        region: document.getElementById("arch-region"),
        period: document.getElementById("arch-period"),
        description: document.getElementById("arch-description"),
        featuresList: document.getElementById("arch-features"),
        examplesList: document.getElementById("arch-examples"),
        image: document.getElementById("arch-image"),
        imageCredit: document.getElementById("arch-credit")
    };

    /**
     * Initialize the Architecture Styles Guide
     */
    function initializeArchitectureGuide() {
        if (!elements.styleList) return;

        // Render the sidebar buttons
        architectureStyles.forEach((style, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "arch-style-button";
            button.dataset.style = style.id;
            button.textContent = style.name;
            button.setAttribute("aria-selected", "false");
            button.setAttribute("role", "tab");
            
            // Allow keyboard navigation
            button.addEventListener("click", () => selectArchitectureStyle(style.id));
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectArchitectureStyle(style.id);
                }
            });

            elements.styleList.appendChild(button);
        });

        // Load the first style by default
        if (architectureStyles.length > 0) {
            selectArchitectureStyle(architectureStyles[0].id);
        }
    }

    /**
     * Handle style selection
     * @param {string} styleId 
     */
    function selectArchitectureStyle(styleId) {
        const selectedStyle = architectureStyles.find(s => s.id === styleId);
        if (!selectedStyle) return;

        // Update active states on buttons
        const buttons = elements.styleList.querySelectorAll(".arch-style-button");
        buttons.forEach(btn => {
            if (btn.dataset.style === styleId) {
                btn.classList.add("active");
                btn.setAttribute("aria-selected", "true");
                btn.setAttribute("aria-current", "true");
            } else {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
                btn.removeAttribute("aria-current");
            }
        });

        renderArchitectureStyle(selectedStyle);
    }

    /**
     * Render the selected architecture style into the DOM
     * @param {Object} style 
     */
    function renderArchitectureStyle(style) {
        try {
            // Update Text Content
            elements.title.textContent = style.name;
            elements.region.textContent = style.region;
            elements.period.textContent = style.period;
            elements.description.textContent = style.description;

            // Update Features List
            elements.featuresList.innerHTML = "";
            style.features.forEach(feature => {
                const li = document.createElement("li");
                li.textContent = feature;
                elements.featuresList.appendChild(li);
            });

            // Update Examples List
            elements.examplesList.innerHTML = "";
            style.examples.forEach(example => {
                const li = document.createElement("li");
                li.textContent = example;
                elements.examplesList.appendChild(li);
            });

            // Update Image
            elements.image.src = style.image;
            elements.image.alt = style.imageAlt;
            elements.imageCredit.textContent = "Image: " + style.imageCredit;
            
        } catch (error) {
            console.error("Error rendering architecture style:", error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeArchitectureGuide);
    } else {
        initializeArchitectureGuide();
    }

})();

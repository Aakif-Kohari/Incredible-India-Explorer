const brandEvolutionData = [
    {
        id: "air-india",
        name: "Air India",
        industry: "Aviation",
        timeline: [
            {
                year: 1946,
                title: "The Centaur & The Maharaja",
                description: "Air India adopted the Centaur logo (a stylized archer with a bow in a circle) representing speed and precision. The iconic 'Maharaja' mascot was also created by Bobby Kooka and Umesh Rao, becoming the face of the airline's hospitality.",
                logoPlaceholder: "Centaur with Bow & Arrow",
                slogan: "Your Palace in the Sky",
                source: "Air India Archives & Tata Group",
                sourceType: "official"
            },
            {
                year: 2007,
                title: "Merger with Indian Airlines",
                description: "Following the merger with Indian Airlines, the logo was updated to feature the Flying Swan with the Konark Chakra inside it, painted on the tail of the aircraft.",
                logoPlaceholder: "Flying Swan with Konark Chakra",
                source: "Ministry of Civil Aviation Archives",
                sourceType: "official"
            },
            {
                year: 2023,
                title: "The Vista Rebrand",
                description: "After returning to the Tata Group, Air India unveiled its new identity 'The Vista'. The new logo features a gold window frame design, signifying limitless possibilities, replacing the traditional swan.",
                logoPlaceholder: "Gold 'Vista' Window Frame",
                slogan: "New India's New Airline",
                source: "Tata Sons Official Press Release",
                sourceType: "official"
            }
        ]
    },
    {
        id: "parle-g",
        name: "Parle-G",
        industry: "FMCG (Food)",
        timeline: [
            {
                year: 1939,
                title: "Parle Gluco Launch",
                description: "Originally launched as Parle Gluco. The packaging was simple and targeted British-era consumers, offering an affordable alternative to imported British biscuits.",
                logoPlaceholder: "Text: Parle Gluco",
                packaging: "Simple wax paper wrapper",
                source: "Parle Products Heritage",
                sourceType: "official"
            },
            {
                year: 1960,
                title: "The Parle Girl Illustration",
                description: "To combat counterfeit 'Gluco' brands, Parle commissioned an illustration by Everest Brand Solutions' Maganlal Daiya. The iconic illustration of the young girl was introduced on the yellowish-wax paper packaging.",
                logoPlaceholder: "Illustration of Young Girl",
                packaging: "Yellow and White Wrapper with Red Text",
                slogan: "Swad Bhare, Shakti Bhare",
                source: "Economic Times Brand History",
                sourceType: "news"
            },
            {
                year: 1982,
                title: "Renamed to Parle-G",
                description: "The brand was officially renamed from Parle Gluco to Parle-G (where G originally stood for Glucose, and later popularized as 'Genius'). The packaging retained the iconic girl but modernized the typography.",
                logoPlaceholder: "Bold 'Parle-G' with Girl",
                packaging: "Plastic wrapper, retaining classic yellow/white/red",
                slogan: "G mane Genius",
                source: "Parle Products Archives",
                sourceType: "official"
            }
        ]
    },
    {
        id: "sbi",
        name: "State Bank of India (SBI)",
        industry: "Banking",
        timeline: [
            {
                year: 1955,
                title: "The Banyan Tree Logo",
                description: "Upon nationalization, the Imperial Bank of India became SBI. Its first logo was a banyan tree, representing deep roots, stability, and growth. However, it was later critiqued because nothing grows under a banyan tree.",
                logoPlaceholder: "Banyan Tree Illustration",
                source: "SBI History Archive",
                sourceType: "official"
            },
            {
                year: 1971,
                title: "The Keyhole Symbol",
                description: "Designed by Shekhar Kamat at the National Institute of Design (NID). The iconic blue circle with a small notch at the bottom was inspired by Kankaria Lake in Ahmedabad. It represents a keyhole (safety/security) and the large blue circle represents the bank's vast reach, while the white circle is the common man at the center.",
                logoPlaceholder: "Blue Circle with Keyhole Notch",
                slogan: "The Banker to Every Indian",
                source: "National Institute of Design Archives",
                sourceType: "archive"
            },
            {
                year: 2017,
                title: "Modernized Monogram",
                description: "Following the merger of its associate banks, SBI modernized the logo slightly, making the blue lighter and the typography more contemporary, but retaining the iconic 1971 symbol.",
                logoPlaceholder: "Lighter Blue Keyhole Symbol",
                source: "SBI Corporate Presentation",
                sourceType: "official"
            }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const brandSelect = document.getElementById("brand-select");
    const timelineTrack = document.getElementById("timeline-track");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    
    // State
    let currentBrand = null;
    let currentMilestoneIndex = 0;

    // Initialize Select Dropdown
    brandEvolutionData.forEach((brand, index) => {
        const option = document.createElement("option");
        option.value = brand.id;
        option.textContent = brand.name;
        brandSelect.appendChild(option);
    });

    // Event Listeners
    brandSelect.addEventListener("change", (e) => {
        loadBrand(e.target.value);
    });

    btnPrev.addEventListener("click", () => {
        if (currentMilestoneIndex > 0) {
            loadMilestone(currentMilestoneIndex - 1);
        }
    });

    btnNext.addEventListener("click", () => {
        if (currentBrand && currentMilestoneIndex < currentBrand.timeline.length - 1) {
            loadMilestone(currentMilestoneIndex + 1);
        }
    });

    // Functions
    function loadBrand(brandId) {
        currentBrand = brandEvolutionData.find(b => b.id === brandId);
        if (!currentBrand) return;
        
        currentMilestoneIndex = 0; // Reset to first milestone
        buildTimelineTrack();
        loadMilestone(currentMilestoneIndex);
        updateComparison();
    }

    function buildTimelineTrack() {
        timelineTrack.innerHTML = "";
        currentBrand.timeline.forEach((milestone, index) => {
            const dot = document.createElement("div");
            dot.className = "timeline-dot";
            dot.setAttribute("data-year", milestone.year);
            dot.addEventListener("click", () => loadMilestone(index));
            timelineTrack.appendChild(dot);
        });
    }

    function loadMilestone(index) {
        currentMilestoneIndex = index;
        const milestone = currentBrand.timeline[index];
        
        // Update track active state
        const dots = timelineTrack.querySelectorAll(".timeline-dot");
        dots.forEach((dot, i) => {
            if (i === index) dot.classList.add("active");
            else dot.classList.remove("active");
        });
        
        // Update Buttons
        btnPrev.disabled = (index === 0);
        btnNext.disabled = (index === currentBrand.timeline.length - 1);

        // Update UI
        document.getElementById("milestone-year").textContent = milestone.year;
        document.getElementById("milestone-title").textContent = milestone.title;
        document.getElementById("milestone-description").textContent = milestone.description;
        
        document.getElementById("visual-text").textContent = milestone.logoPlaceholder;
        document.getElementById("visual-caption").textContent = milestone.packaging ? `Packaging: ${milestone.packaging}` : `Identity Style`;
        
        const sloganBox = document.getElementById("slogan-box");
        if (milestone.slogan) {
            document.getElementById("milestone-slogan").textContent = milestone.slogan;
            sloganBox.classList.remove("hidden");
        } else {
            sloganBox.classList.add("hidden");
        }
        
        document.getElementById("milestone-source").textContent = milestone.source;
        document.getElementById("milestone-source-type").textContent = milestone.sourceType;
        
        updateComparison();
    }

    function updateComparison() {
        // Compare the first milestone with the current milestone (or last milestone if current is first)
        const earlyMilestone = currentBrand.timeline[0];
        const newMilestone = currentMilestoneIndex === 0 
            ? currentBrand.timeline[currentBrand.timeline.length - 1] 
            : currentBrand.timeline[currentMilestoneIndex];

        document.getElementById("compare-early-text").textContent = earlyMilestone.logoPlaceholder;
        document.getElementById("compare-early-year").textContent = earlyMilestone.year;
        document.getElementById("compare-early-desc").textContent = earlyMilestone.title;

        document.getElementById("compare-new-text").textContent = newMilestone.logoPlaceholder;
        document.getElementById("compare-new-year").textContent = newMilestone.year;
        document.getElementById("compare-new-desc").textContent = newMilestone.title;
    }

    // Load Initial Data
    if (brandEvolutionData.length > 0) {
        loadBrand(brandEvolutionData[0].id);
    }
});

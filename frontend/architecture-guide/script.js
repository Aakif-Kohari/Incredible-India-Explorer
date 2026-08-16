import architectureData from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const styleButtons = document.querySelectorAll('.style-btn');
    const svgContainer = document.getElementById('svg-container');
    const defaultMessage = document.querySelector('.default-message');
    const detailsContent = document.getElementById('details-content');
    const themeBtn = document.getElementById('theme-toggle');

    // Details Elements
    const detailName = document.getElementById('detail-name');
    const detailStyle = document.getElementById('detail-style');
    const detailDesc = document.getElementById('detail-desc');
    const detailFunction = document.getElementById('detail-function');
    const detailExamples = document.getElementById('detail-examples');

    let currentStyleId = 'dravidian'; // Default

    // --- Core Logic ---

    // Load SVG and setup hotspots for a given style
    function loadStyle(styleId) {
        const styleData = architectureData[styleId];
        if (!styleData) return;

        currentStyleId = styleId;

        // Update active button
        styleButtons.forEach(btn => {
            if (btn.getAttribute('data-style') === styleId) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        // Inject SVG markup
        svgContainer.innerHTML = styleData.svg;

        // Reset info panel
        resetInfoPanel();

        // Attach event listeners to new hotspots
        setupHotspots(styleData);
    }

    // Setup interactions for hotspots
    function setupHotspots(styleData) {
        // We now select the visual/group element that handles interaction
        // The actual click/focus will happen on .hotspot-group
        const hotspots = document.querySelectorAll('.hotspot-group');
        
        hotspots.forEach(hotspot => {
            // Assign aria-label and role dynamically from data if not already set,
            // but we'll set it in the SVG directly in data.js to be cleaner.
            
            const handleActivation = () => {
                // Remove active class from all visual circles
                document.querySelectorAll('.hotspot-visual').forEach(h => h.classList.remove('active'));
                
                // Add active to current visual circle
                const visual = hotspot.querySelector('.hotspot-visual');
                if (visual) visual.classList.add('active');

                // Get feature data
                const featureId = hotspot.id;
                const feature = styleData.features.find(f => f.id === featureId);
                
                if (feature) {
                    showFeatureDetails(feature, styleData.title);
                }
            };

            // Click event
            hotspot.addEventListener('click', handleActivation);

            // Keyboard support (Enter or Space)
            hotspot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleActivation();
                }
            });
        });
    }

    // Display feature data in the info panel
    function showFeatureDetails(feature, styleTitle) {
        // Hide default message, show details
        if(defaultMessage) defaultMessage.style.display = 'none';
        if(detailsContent) detailsContent.style.display = 'block';

        // Populate data
        if(detailName) detailName.textContent = feature.name;
        if(detailStyle) detailStyle.textContent = styleTitle;
        if(detailDesc) detailDesc.textContent = feature.description;
        if(detailFunction) detailFunction.textContent = feature.function;

        // Render examples
        if(detailExamples) {
            detailExamples.innerHTML = '';
            feature.examples.forEach(ex => {
                const li = document.createElement('li');
                li.textContent = ex;
                detailExamples.appendChild(li);
            });
        }
    }

    function resetInfoPanel() {
        if(defaultMessage) defaultMessage.style.display = 'block';
        if(detailsContent) detailsContent.style.display = 'none';
    }

    // --- Initialization ---

    // Event listeners for style buttons
    styleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const styleId = e.currentTarget.getAttribute('data-style');
            loadStyle(styleId);
        });
    });

    // Load initial style
    loadStyle(currentStyleId);

});

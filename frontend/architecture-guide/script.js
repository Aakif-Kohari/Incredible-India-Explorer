import architectureData from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const styleBtns = document.querySelectorAll('.style-btn');
    const svgContainer = document.getElementById('svg-container');
    const infoTitle = document.getElementById('info-title');
    const infoBadge = document.getElementById('info-badge');
    const infoDescription = document.getElementById('info-description');
    const infoDetails = document.getElementById('info-details');
    const infoFunction = document.getElementById('info-function');
    const infoExamples = document.getElementById('info-examples');

    // Load initial SVG
    loadSVG('dravidian');

    styleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            styleBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const selectedStyle = btn.getAttribute('data-style');
            loadSVG(selectedStyle);
            resetInfoPanel(selectedStyle);
        });
    });

    function loadSVG(styleName) {
        svgContainer.innerHTML = '<div class="loading-state">Loading diagram...</div>';
        
        fetch(`assets/${styleName}.svg`)
            .then(response => {
                if (!response.ok) throw new Error('SVG not found');
                return response.text();
            })
            .then(svgText => {
                svgContainer.innerHTML = svgText;
                setupHotspots(styleName);
            })
            .catch(error => {
                console.error('Error loading SVG:', error);
                svgContainer.innerHTML = `<div class="loading-state">Diagram unavailable.</div>`;
            });
    }

    function setupHotspots(styleName) {
        const hotspots = svgContainer.querySelectorAll('.hotspot');
        const styleData = architectureData[styleName];

        if (!styleData) return;

        hotspots.forEach(hotspot => {
            const featureId = hotspot.getAttribute('id');
            // Add attributes for accessibility
            hotspot.setAttribute('tabindex', '0');
            hotspot.setAttribute('role', 'button');
            
            const featureData = styleData.features.find(f => f.id === featureId);
            if (featureData) {
                hotspot.setAttribute('aria-label', `${featureData.name} architectural feature`);
            }

            // Click event
            hotspot.addEventListener('click', () => {
                updateInfoPanel(styleData, featureId);
                setActiveHotspot(hotspots, hotspot);
            });

            // Keyboard event (Enter/Space)
            hotspot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateInfoPanel(styleData, featureId);
                    setActiveHotspot(hotspots, hotspot);
                }
            });
        });
    }

    function setActiveHotspot(allHotspots, activeHotspot) {
        allHotspots.forEach(h => h.classList.remove('active'));
        activeHotspot.classList.add('active');
    }

    function resetInfoPanel(styleName) {
        const styleData = architectureData[styleName];
        if (!styleData) return;

        infoTitle.textContent = styleData.name;
        infoBadge.textContent = "Architectural Style";
        infoDescription.textContent = styleData.description;
        infoDetails.classList.add('hidden');
    }

    function updateInfoPanel(styleData, featureId) {
        const featureData = styleData.features.find(f => f.id === featureId);
        
        if (!featureData) return;

        infoTitle.textContent = featureData.name;
        infoBadge.textContent = styleData.name;
        infoDescription.textContent = featureData.description;
        
        infoFunction.textContent = featureData.function;
        
        infoExamples.innerHTML = '';
        featureData.examples.forEach(ex => {
            const li = document.createElement('li');
            li.textContent = ex;
            infoExamples.appendChild(li);
        });

        infoDetails.classList.remove('hidden');
    }
});
// script.js - Architectural Styles Guide Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    // Ensure data exists
    if (!window.architectureData) {
        console.error("Architecture data not found!");
        return;
    }

    const data = window.architectureData;

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

    // --- Theme Logic ---
    if (themeBtn) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }

        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
                themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
                themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
            }
        });
    }

    // --- Core Logic ---

    // Load SVG and setup hotspots for a given style
    function loadStyle(styleId) {
        const styleData = data[styleId];
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
        const hotspots = document.querySelectorAll('.hotspot');
        
        hotspots.forEach(hotspot => {
            const handleActivation = () => {
                // Remove active class from all
                hotspots.forEach(h => h.classList.remove('active'));
                
                // Add active to current
                hotspot.classList.add('active');

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
        defaultMessage.style.display = 'none';
        detailsContent.style.display = 'block';

        // Populate data
        detailName.textContent = feature.name;
        detailStyle.textContent = styleTitle;
        detailDesc.textContent = feature.description;
        detailFunction.textContent = feature.function;

        // Render examples
        detailExamples.innerHTML = '';
        feature.examples.forEach(ex => {
            const li = document.createElement('li');
            li.textContent = ex;
            detailExamples.appendChild(li);
        });

        // Announce to screen readers (optional but good practice for aria-live)
        // Re-assigning text content triggers the polite read in most screen readers.
    }

    function resetInfoPanel() {
        defaultMessage.style.display = 'block';
        detailsContent.style.display = 'none';
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

})();

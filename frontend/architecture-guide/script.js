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

document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.pol-feature');
    const panelTitle = document.getElementById('panel-title');
    const panelDesc = document.getElementById('panel-desc');

    const defaultTitle = 'Explore the Neighborhood';
    const defaultDesc = 'Click or tap on the highlighted sections of the map to learn about the community and architectural features of an Ahmedabad Pol.';

    function handleFeatureSelection(feature) {
        if (!feature.dataset.title) return; // Skip if no data

        // Remove active class from all
        features.forEach(f => {
            f.classList.remove('active');
            f.setAttribute('aria-expanded', 'false');
        });

        // Add active class to selected
        feature.classList.add('active');
        feature.setAttribute('aria-expanded', 'true');

        // Update panel
        panelTitle.textContent = feature.dataset.title;
        panelDesc.textContent = feature.dataset.desc;
    }

    features.forEach(feature => {
        feature.addEventListener('click', () => {
            handleFeatureSelection(feature);
        });

        feature.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFeatureSelection(feature);
            }
        });
    });

    // Reset when clicking outside the svg
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.pol-diagram-container')) {
            features.forEach(f => {
                f.classList.remove('active');
                f.setAttribute('aria-expanded', 'false');
            });
            panelTitle.textContent = defaultTitle;
            panelDesc.textContent = defaultDesc;
        }
    });
});

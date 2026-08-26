document.addEventListener('DOMContentLoaded', () => {
    const mapBtns = document.querySelectorAll('.map-btn');
    const mapPanels = document.querySelectorAll('.map-panel');

    mapBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            mapBtns.forEach(b => b.classList.remove('active'));
            mapPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding panel
            const targetId = btn.getAttribute('data-region');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });

        // Keyboard accessibility
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
});

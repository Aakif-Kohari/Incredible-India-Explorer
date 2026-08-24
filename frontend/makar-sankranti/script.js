document.addEventListener('DOMContentLoaded', () => {
    // Setup tabs for all interactive explorers (Food Explorer, Map Explorer)
    const setupTabs = (containerSelector) => {
        const containers = document.querySelectorAll(containerSelector);
        
        containers.forEach(container => {
            const btns = container.querySelectorAll('.tab-btn, .map-zone');
            const panels = container.querySelectorAll('.tab-panel');

            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active from all within this container
                    btns.forEach(b => b.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));

                    // Add active to clicked
                    btn.classList.add('active');
                    const targetId = btn.getAttribute('data-target');
                    const targetPanel = container.querySelector(`#${targetId}`);
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
    };

    setupTabs('.explorer-container');
});

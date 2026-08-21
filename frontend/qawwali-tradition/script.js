document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.instrument-btn');
    const panels = document.querySelectorAll('.instrument-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding panel
            const targetId = tab.getAttribute('data-instrument');
            document.getElementById(targetId).classList.add('active');
        });

        // Add keyboard support (Enter/Space)
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });
});

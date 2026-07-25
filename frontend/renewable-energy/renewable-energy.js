document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch data
    let capacityData = [];
    try {
        const response = await fetch('data/renewableCapacity.json');
        if (!response.ok) throw new Error('Network response was not ok');
        capacityData = await response.json();
    } catch (error) {
        console.error('Failed to fetch renewable capacity data:', error);
        // Fallback data if fetch fails
        capacityData = [
            { "year": 2019, "solarGW": 34.6, "windGW": 37.5 },
            { "year": 2020, "solarGW": 39.1, "windGW": 38.6 },
            { "year": 2021, "solarGW": 49.3, "windGW": 40.1 },
            { "year": 2022, "solarGW": 63.3, "windGW": 41.9 },
            { "year": 2023, "solarGW": 73.3, "windGW": 44.7 }
        ];
    }

    // Update data date in disclaimer
    document.getElementById('data-date').textContent = 'December 2023';

    // 2. Initialize Chart.js
    const ctx = document.getElementById('renewableChart').getContext('2d');
    
    // Check theme for text color
    const isDark = !document.body.classList.contains('light-theme');
    const textColor = isDark ? '#f0f0f0' : '#333';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const years = capacityData.map(d => d.year);
    const solarData = capacityData.map(d => d.solarGW);
    const windData = capacityData.map(d => d.windGW);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Solar Capacity (GW)',
                    data: solarData,
                    borderColor: '#FDB813',
                    backgroundColor: 'rgba(253, 184, 19, 0.5)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Wind Capacity (GW)',
                    data: windData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.5)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' GW';
                        }
                    }
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Year',
                        color: textColor
                    },
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Capacity (GW)',
                        color: textColor
                    },
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // 3. Setup Intersection Observer for SVG Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'solar-growth') {
                    document.getElementById('animated-sun').classList.add('sun-active');
                } else if (entry.target.id === 'wind-growth') {
                    document.getElementById('animated-turbine').classList.add('turbine-active');
                }
            } else {
                // Optional: remove class to replay animation when scrolled out and back in
                if (entry.target.id === 'solar-growth') {
                    document.getElementById('animated-sun').classList.remove('sun-active');
                } else if (entry.target.id === 'wind-growth') {
                    document.getElementById('animated-turbine').classList.remove('turbine-active');
                }
            }
        });
    }, observerOptions);

    // Observe the sections containing the SVGs
    observer.observe(document.getElementById('solar-growth'));
    observer.observe(document.getElementById('wind-growth'));
});

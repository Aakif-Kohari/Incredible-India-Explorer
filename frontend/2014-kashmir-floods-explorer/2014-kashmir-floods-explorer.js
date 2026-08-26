// 2014 Kashmir Floods Explorer Script

document.addEventListener('DOMContentLoaded', function() {

    // Initialize Leaflet map if container exists
    var map = null;
    var mapContainer = document.getElementById('map-container');
    
    if (mapContainer) {
        map = L.map('map-container').setView([34.0833, 74.7167], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        
        // Add flood markers
        addFloodMarkers(map);
    }
    
    function addFloodMarkers(map) {
        // Flood severity markers for key locations
        var floodData = [
            { 
                lat: 34.0833, lng: 74.7167, 
                title: 'Srinagar - Flood Epicenter',
                description: 'Srinagar was the worst affected city with 80% area submerged. Jhelum River peaked at 7.3 feet above danger level.',
                severity: 'critical'
            },
            { 
                lat: 34.2, lng: 75.35, 
                title: 'Baramulla',
                description: 'Major flooding in Baramulla district. Key bridge connections destroyed, isolating many villages.',
                severity: 'severe'
            },
            { 
                lat: 33.75, lng: 75.1, 
                title: 'Anantnag',
                description: 'Agricultural heartland severely affected. Paddy fields destroyed, massive crop loss reported.',
                severity: 'severe'
            },
            { 
                lat: 33.85, lng: 74.5, 
                title: 'Pulwama',
                description: 'Widespread flooding of residential areas. Water levels receded slowly, leaving sediment deposits.',
                severity: 'moderate'
            },
            { 
                lat: 34.5, lng: 74.0, 
                title: 'Sopore',
                description: 'Old city area extensively flooded. Dal Lake water quality affected by flood runoff.',
                severity: 'severe'
            }
        ];
        
        floodData.forEach(function(markerData) {
            var color = getSeverityColor(markerData.severity);
            var icon = getSeverityIcon(markerData.severity);
            
            var marker = L.marker([markerData.lat, markerData.lng], { icon: L.icon({ iconUrl: '', iconAnchor: [0, 0] }) })
                .addTo(map)
                .bindPopup('<b>' + markerData.title + '</b><br>' + markerData.description);
            
            // Add circle to show flood extent approximate
            var circle = L.circle([markerData.lat, markerData.lng], {
                radius: getRadiusForSeverity(markerData.severity),
                color: color,
                fillColor: color,
                fillOpacity: 0.15
            }).addTo(map);
        });
    }
    
    function getSeverityColor(severity) {
        var colors = {
            'critical': '#E74C3C',
            'severe': '#E67E22', 
            'moderate': '#F1C40F'
        };
        return colors[severity] || '#7F8C8D';
    }
    
    function getSeverityIcon(severity) {
        var icons = {
            'critical': 'fa-exclamation-triangle',
            'severe': 'fa-tree',
            'moderate': 'fa-water'
        };
        return icons[severity] || 'fa-info-circle';
    }
    
    function getRadiusForSeverity(severity) {
        var radii = {
            'critical': 8000,
            'severe': 5000,
            'moderate': 3000
        };
        return radii[severity] || 2000;
    }
    
    // Theme toggle
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
            this.textContent = isDark ? '☀️' : '🌙';
        });
    }
    
    // Scroll reveal observation
    var fadeInSections = document.querySelectorAll('.fade-in-section');
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeInSections.forEach(function(section) {
        observer.observe(section);
    });
});
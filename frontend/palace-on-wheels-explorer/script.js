const routeStops = [
    {
        name: 'New Delhi',
        city: 'Safdarjung Railway Station',
        lat: 28.5796,
        lng: 77.1932,
        note: 'Ceremonial welcome and departure.'
    },
    {
        name: 'Jaipur',
        city: 'The Pink City',
        lat: 26.9124,
        lng: 75.7873,
        note: 'Hawa Mahal, City Palace and royal architecture.'
    },
    {
        name: 'Sawai Madhopur',
        city: 'Gateway to Ranthambore',
        lat: 26.037,
        lng: 76.329,
        note: 'Ranthambore National Park and wildlife.'
    },
    {
        name: 'Chittorgarh',
        city: 'Fort city',
        lat: 24.8887,
        lng: 74.6269,
        note: 'Chittorgarh Fort and Rajput history.'
    },
    {
        name: 'Udaipur',
        city: 'City of Lakes',
        lat: 24.5854,
        lng: 73.7125,
        note: 'Lake Pichola and palace-city landscapes.'
    },
    {
        name: 'Jaisalmer',
        city: 'Golden City',
        lat: 26.9157,
        lng: 70.9083,
        note: 'Jaisalmer Fort, desert and camel safari.'
    },
    { name: 'Jodhpur', city: 'Blue City', lat: 26.2389, lng: 73.0243, note: 'Mehrangarh Fort and old-city heritage.' },
    {
        name: 'Bharatpur',
        city: 'Bird country',
        lat: 27.1767,
        lng: 77.3533,
        note: 'Keoladeo National Park and wetland heritage.'
    },
    { name: 'Agra', city: 'Mughal heritage', lat: 27.1767, lng: 78.0081, note: 'Taj Mahal and Agra Fort.' },
    { name: 'New Delhi', city: 'Return', lat: 28.5796, lng: 77.1932, note: 'Disembark at Safdarjung Railway Station.' }
];

const destinations = [
    ['Jaipur', 'Pink City', 'Hawa Mahal, City Palace, Jantar Mantar'],
    ['Sawai Madhopur', 'Wild Rajasthan', 'Ranthambore National Park'],
    ['Chittorgarh', 'Rajput stronghold', 'Chittorgarh Fort and Vijay Stambh'],
    ['Udaipur', 'City of Lakes', 'Lake Pichola and palace heritage'],
    ['Jaisalmer', 'Thar Desert', 'Jaisalmer Fort and camel safari'],
    ['Jodhpur', 'Blue City', 'Mehrangarh Fort and old-city streets'],
    ['Bharatpur', 'Bird sanctuary', 'Keoladeo National Park'],
    ['Agra', 'Mughal masterpiece', 'Taj Mahal and Agra Fort']
];

document.addEventListener('DOMContentLoaded', () => {
    const routeList = document.getElementById('route-list');
    const destinationGrid = document.getElementById('destination-grid');

    routeStops.forEach((stop, index) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'route-stop' + (index === 0 ? ' active' : '');
        item.dataset.index = index;
        item.innerHTML = `<span class="route-number">${index + 1}</span><span><h3>${stop.name}</h3><p>${stop.city} · ${stop.note}</p></span>`;
        routeList.appendChild(item);
    });

    destinations.forEach((destination, index) => {
        const card = document.createElement('article');
        card.className = 'destination-card';
        card.innerHTML = `<span class="stop-no">STOP ${index + 1}</span><h3>${destination[0]}</h3><p><strong>${destination[1]}</strong><br>${destination[2]}</p>`;
        destinationGrid.appendChild(card);
    });

    const mapElement = document.getElementById('route-map');
    if (window.L && mapElement) {
        const map = L.map(mapElement, { scrollWheelZoom: false }).setView([26.5, 75.8], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        const latLngs = [];
        routeStops.forEach((stop, index) => {
            const marker = L.marker([stop.lat, stop.lng])
                .addTo(map)
                .bindPopup(`<strong>${index + 1}. ${stop.name}</strong><br>${stop.note}`);
            latLngs.push([stop.lat, stop.lng]);
            const buttons = routeList.querySelectorAll('.route-stop');
            buttons[index].addEventListener('click', () => {
                buttons.forEach(button => button.classList.remove('active'));
                buttons[index].classList.add('active');
                map.flyTo([stop.lat, stop.lng], index === 0 || index === routeStops.length - 1 ? 6 : 7, {
                    duration: 0.7
                });
                marker.openPopup();
            });
        });
        L.polyline(latLngs, { color: '#d9aa54', weight: 3, opacity: 0.9, dashArray: '7 7' }).addTo(map);
        map.fitBounds(latLngs, { padding: [30, 30] });
    }
});

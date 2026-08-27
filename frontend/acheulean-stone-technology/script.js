/**
 * script.js
 * Interactive map for the Acheulean Stone Technology in India page.
 * Renders clickable site markers on a stylised India outline, each
 * showing a short popup summary of that Acheulean site on click.
 */

const ACHEULEAN_SITES = [
    {
        id: 'attirampakkam',
        name: 'Attirampakkam',
        state: 'Tamil Nadu',
        color: '#dc2626',
        top: '78%',
        left: '52%',
        summary: 'A long, well-dated Acheulean sequence on the Kortallayar river used to trace changes in tool technology over time.'
    },
    {
        id: 'hunsgi-isampur',
        name: 'Hunsgi–Isampur',
        state: 'Karnataka',
        color: '#ea580c',
        top: '62%',
        left: '38%',
        summary: 'A cluster of Deccan plateau localities; Isampur is notable as an early stone tool workshop site.'
    },
    {
        id: 'bhimbetka',
        name: 'Bhimbetka Area',
        state: 'Madhya Pradesh',
        color: '#65a30d',
        top: '46%',
        left: '46%',
        summary: 'Rock shelters and surrounding terrain preserving evidence of long prehistoric occupation, including Acheulean tools.'
    },
    {
        id: 'chirki-nevasa',
        name: 'Chirki-Nevasa',
        state: 'Maharashtra',
        color: '#0891b2',
        top: '52%',
        left: '32%',
        summary: 'A Godavari valley locality yielding large Acheulean handaxe and cleaver assemblages.'
    },
    {
        id: 'didwana',
        name: 'Didwana',
        state: 'Rajasthan',
        color: '#7c3aed',
        top: '30%',
        left: '34%',
        summary: 'Thar Desert dune sections preserving Acheulean tools within a dated stratigraphic sequence.'
    },
    {
        id: 'paisra',
        name: 'Paisra',
        state: 'Bihar',
        color: '#c026d3',
        top: '34%',
        left: '62%',
        summary: 'A Kharagpur hills site with an in-situ Acheulean occupation surface and possible hut feature.'
    }
];

function closeOpenPopup() {
    const existing = document.querySelector('.map-popup');
    if (existing) existing.remove();
}

function showPopup(marker, site) {
    closeOpenPopup();
    const popup = document.createElement('div');
    popup.className = 'map-popup';
    popup.innerHTML = `
        <h4>${site.name}</h4>
        <p>${site.state}</p>
        <p>${site.summary}</p>
    `;
    marker.appendChild(popup);
    setTimeout(() => document.addEventListener('click', closeOpenPopup, { once: true }), 10);
}

function renderAcheuleanMap() {
    const mapContainer = document.getElementById('acheulean-map');
    const legendContainer = document.getElementById('acheulean-legend');
    if (!mapContainer || !legendContainer) return;

    ACHEULEAN_SITES.forEach(site => {
        const marker = document.createElement('button');
        marker.type = 'button';
        marker.className = 'map-marker';
        marker.style.top = site.top;
        marker.style.left = site.left;
        marker.style.setProperty('--marker-color', site.color);
        marker.setAttribute('aria-label', `${site.name}, ${site.state}`);
        marker.innerHTML = `
            <span class="marker-dot"></span>
            <span class="marker-label">${site.name}</span>
        `;
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            showPopup(marker, site);
        });
        mapContainer.appendChild(marker);

        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <span class="legend-color" style="background:${site.color}"></span>
            <span class="legend-name">${site.name}, ${site.state}</span>
        `;
        legendItem.addEventListener('click', () => showPopup(marker, site));
        legendContainer.appendChild(legendItem);
    });
}

document.addEventListener('DOMContentLoaded', renderAcheuleanMap);
import unescoData from './data.js';

(() => {
    const gridContainer = document.getElementById('unesco-grid');
    const sortSelect = document.getElementById('sort-select');
    const sortAnnouncement = document.getElementById('sort-announcement');

    // State
    let currentData = [...unescoData];

    // Initialization
    function init() {
        renderSites(currentData);
        sortSelect.addEventListener('change', handleSort);
    }

    // Render Function
    function renderSites(data) {
        gridContainer.innerHTML = ''; // Clear current
        
        data.forEach(site => {
            const card = document.createElement('article');
            card.classList.add('site-card');
            card.setAttribute('tabindex', '0'); // Make accessible

            // Create Image
            const img = document.createElement('img');
            img.classList.add('site-image');
            img.src = site.image;
            img.alt = `${site.name} UNESCO World Heritage Site in ${site.state}`;
            img.loading = 'lazy'; // performance
            // Fallback for missing images
            img.onerror = function() {
                this.onerror = null;
                this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22225%22%20viewBox%3D%220%200%20400%20225%22%3E%3Crect%20fill%3D%22%23ddd%22%20width%3D%22400%22%20height%3D%22225%22%2F%3E%3Ctext%20fill%3D%22%23777%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20dy%3D%227%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EImage%20Unavailable%3C%2Ftext%3E%3C%2Fsvg%3E';
            };

            // Create Content Container
            const content = document.createElement('div');
            content.classList.add('site-content');

            // Header (Title & Badge)
            const header = document.createElement('div');
            header.classList.add('site-header');

            const title = document.createElement('h2');
            title.classList.add('site-title');
            title.textContent = site.name;

            const badge = document.createElement('span');
            badge.classList.add('badge', `badge-${site.type.toLowerCase()}`);
            badge.textContent = site.type;

            header.appendChild(title);
            header.appendChild(badge);

            // Meta Info (State & Year)
            const meta = document.createElement('div');
            meta.classList.add('site-meta');
            
            const stateSpan = document.createElement('span');
            stateSpan.textContent = `📍 ${site.state}`;
            
            const yearSpan = document.createElement('span');
            yearSpan.textContent = `📅 ${site.year}`;
            
            meta.appendChild(stateSpan);
            meta.appendChild(yearSpan);

            // Description
            const desc = document.createElement('p');
            desc.classList.add('site-description');
            desc.textContent = site.description;

            // Assembly
            content.appendChild(header);
            content.appendChild(meta);
            content.appendChild(desc);

            card.appendChild(img);
            card.appendChild(content);

            gridContainer.appendChild(card);
        });
    }

    // Sorting Logic
    function handleSort(event) {
        const sortMode = event.target.value;
        let sortedData = [...unescoData];

        switch (sortMode) {
            case 'year-asc':
                sortedData.sort((a, b) => a.year - b.year);
                break;
            case 'year-desc':
                sortedData.sort((a, b) => b.year - a.year);
                break;
            case 'name-asc':
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedData.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'type':
                const typeOrder = { "Cultural": 1, "Natural": 2, "Mixed": 3 };
                sortedData.sort((a, b) => {
                    if (typeOrder[a.type] !== typeOrder[b.type]) {
                        return typeOrder[a.type] - typeOrder[b.type];
                    }
                    // Secondary sort by name if types are the same
                    return a.name.localeCompare(b.name);
                });
                break;
            default:
                sortedData.sort((a, b) => a.year - b.year); // default
        }

        renderSites(sortedData);
        
        // Announce sorting change to screen readers
        const selectedLabel = event.target.options[event.target.selectedIndex].textContent;
        announceSort(selectedLabel);
    }

    // ARIA Live Region Announcer
    function announceSort(label) {
        if (!sortAnnouncement) return;
        
        // Clear first to ensure the screen reader detects the change even if the text is similar
        sortAnnouncement.textContent = '';
        
        requestAnimationFrame(() => {
            sortAnnouncement.textContent = `UNESCO sites sorted by ${label}.`;
        });
    }

    // Start
    init();

})();

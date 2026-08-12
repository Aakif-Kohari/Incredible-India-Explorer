(function() {
    const heritageData = [
        {id:1, name:"Taj Mahal", state:"Uttar Pradesh", category:"cultural", image:"../assets/Taj_Mahal.png", description:"Symbol of love and Mughal architecture.", details:"UNESCO World Heritage Site built by Shah Jahan."},
        {id:2, name:"Red Fort", state:"Delhi", category:"cultural", image:"../assets/red_fort.png", description:"Historic fort and seat of Mughal power.", details:"Symbol of India's independence."},
        {id:3, name:"Ajanta Caves", state:"Maharashtra", category:"cultural", image:"../assets/ajanta_caves.png", description:"Ancient Buddhist rock-cut caves with paintings.", details:"UNESCO site from 2nd century BCE."},
        {id:4, name:"Great Himalayan National Park", state:"Himachal Pradesh", category:"natural", image:"https://picsum.photos/id/1016/600/400", description:"Biodiversity hotspot in the Himalayas.", details:"Home to rare wildlife."}
    ];

    function renderHeritage(filtered) {
        const grid = document.getElementById('heritage-grid');
        grid.innerHTML = '';
        filtered.forEach(site => {
            const card = document.createElement('div');
            card.className = 'heritage-card';
            card.innerHTML = `
                <img src="${site.image}" alt="${site.name}">
                <div style="padding:20px;">
                    <span class="category-badge ${site.category}">${site.category.toUpperCase()}</span>
                    <h3>${site.name}</h3>
                    <p>${site.state}</p>
                    <p>${site.description}</p>
                </div>
            `;
            card.onclick = () => showModal(site);
            grid.appendChild(card);
        });
    }

    function filterHeritage() {
        const search = document.getElementById('heritage-search').value.toLowerCase();
        const state = document.getElementById('state-filter').value;
        const cat = document.getElementById('category-filter').value;
        const filtered = heritageData.filter(s => 
            (!search || s.name.toLowerCase().includes(search)) &&
            (!state || s.state === state) &&
            (!cat || s.category === cat)
        );
        renderHeritage(filtered);
    }

    // Expose showModal/closeModal globally for inline onclick handlers
    window.showModal = function(site) {
        document.getElementById('modal-image').style.backgroundImage = \`url('\${site.image}')\`;
        document.getElementById('modal-title').textContent = site.name;
        document.getElementById('modal-state').textContent = site.state;
        document.getElementById('modal-description').innerHTML = \`<p>\${site.details}</p><p>\${site.description}</p>\`;
        document.getElementById('heritage-modal').style.display = 'flex';
    };

    window.closeModal = function() {
        document.getElementById('heritage-modal').style.display = 'none';
    };

    // Init
    document.addEventListener('DOMContentLoaded', () => {
        const states = [...new Set(heritageData.map(h => h.state))];
        const select = document.getElementById('state-filter');
        states.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s;
            select.appendChild(opt);
        });
        renderHeritage(heritageData);

        document.getElementById('heritage-search').addEventListener('input', filterHeritage);
        document.getElementById('state-filter').addEventListener('change', filterHeritage);
        document.getElementById('category-filter').addEventListener('change', filterHeritage);
    });
})();

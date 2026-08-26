document.addEventListener('DOMContentLoaded', () => {
    // Render Timeline
    const timelineContainer = document.getElementById('timeline-container');
    cinemaData.eras.forEach((era, index) => {
        const alignment = index % 2 === 0 ? 'left' : 'right';
        const item = document.createElement('div');
        item.className = `timeline-item ${alignment}`;
        item.innerHTML = `
            <div class="timeline-content">
                <h3>${era.title}</h3>
                <span class="years">${era.years}</span>
                <p>${era.description}</p>
            </div>
        `;
        timelineContainer.appendChild(item);
    });

    // Populate Era Filter
    const eraFilter = document.getElementById('era-filter');
    cinemaData.eras.forEach(era => {
        const option = document.createElement('option');
        option.value = era.id;
        option.textContent = era.title;
        eraFilter.appendChild(option);
    });

    // Render Film Grid
    const filmGrid = document.getElementById('film-grid');
    const langFilter = document.getElementById('lang-filter');
    
    function renderFilms(filmsToRender) {
        filmGrid.innerHTML = '';
        if(filmsToRender.length === 0) {
            filmGrid.innerHTML = '<p>No films found matching your criteria.</p>';
            return;
        }
        filmsToRender.forEach(film => {
            const card = document.createElement('div');
            card.className = 'film-card';
            card.onclick = () => openModal(film);
            card.innerHTML = `
                <img src="${film.image}" alt="${film.title} Poster" class="film-img" onerror="this.src='assets/placeholder.jpg';">
                <div class="film-info">
                    <h3>${film.title}</h3>
                    <div class="meta">${film.year} • ${film.language}</div>
                    <p>${film.director}</p>
                </div>
            `;
            filmGrid.appendChild(card);
        });
    }

    renderFilms(cinemaData.films);

    // Filter Logic
    function applyFilters() {
        const selectedEra = eraFilter.value;
        const selectedLang = langFilter.value;

        const filtered = cinemaData.films.filter(film => {
            const eraMatch = selectedEra === 'all' || film.era === selectedEra;
            // Exact language match or generic "Hindi", "Telugu" logic
            let langMatch = false;
            if (selectedLang === 'all') {
                langMatch = true;
            } else if (selectedLang === 'Silent') {
                langMatch = film.language.includes('Silent');
            } else {
                langMatch = film.language === selectedLang;
            }
            return eraMatch && langMatch;
        });
        renderFilms(filtered);
    }

    eraFilter.addEventListener('change', applyFilters);
    langFilter.addEventListener('change', applyFilters);

    // Render Regional Cinema
    const regionalGrid = document.getElementById('regional-grid');
    cinemaData.regionalIndustries.forEach(industry => {
        const card = document.createElement('div');
        card.className = 'regional-card';
        card.innerHTML = `
            <h3>${industry.name}</h3>
            <span class="alias">${industry.alias}</span>
            <p>${industry.description}</p>
        `;
        regionalGrid.appendChild(card);
    });

    // Render Filmmakers
    const filmmakerGrid = document.getElementById('filmmaker-grid');
    cinemaData.filmmakers.forEach(maker => {
        const card = document.createElement('div');
        card.className = 'filmmaker-card';
        card.innerHTML = `
            <h3>${maker.name}</h3>
            <p><strong>Industry:</strong> ${maker.industry}</p>
            <p><strong>Active:</strong> ${maker.active}</p>
            <p>${maker.contribution}</p>
            <p><strong>Notable Films:</strong> <i>${maker.notable}</i></p>
        `;
        filmmakerGrid.appendChild(card);
    });

    // Modal Logic
    const modal = document.getElementById('film-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    function openModal(film) {
        modalBody.innerHTML = `
            <img src="${film.image}" alt="${film.title} Poster" class="modal-img" onerror="this.src='assets/placeholder.jpg';">
            <div class="modal-info">
                <h2>${film.title} (${film.year})</h2>
                <p><strong>Language/Industry:</strong> ${film.language} / ${film.industry}</p>
                <p><strong>Director:</strong> ${film.director}</p>
                <p><strong>Genre:</strong> ${film.genre}</p>
                <br>
                <p>${film.description}</p>
                <p><strong>Significance:</strong> ${film.significance}</p>
            </div>
        `;
        modal.style.display = 'block';
    }

    closeModal.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Fact Rotator
    window.showRandomFact = () => {
        const factElement = document.getElementById('random-fact');
        const randomIndex = Math.floor(Math.random() * cinemaData.facts.length);
        factElement.textContent = cinemaData.facts[randomIndex];
    };
});

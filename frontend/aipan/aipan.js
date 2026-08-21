(() => {
    const cards = [...document.querySelectorAll('.motif-card')];
    const filters = [...document.querySelectorAll('.filter-btn')];
    const occasionCards = [...document.querySelectorAll('.occasion-card')];
    const detail = document.getElementById('motif-detail');
    const occasionNote = document.getElementById('occasion-note');

    const descriptions = {
        'Lakshmi Yantra': 'A geometric ritual form associated with Lakshmi worship and auspicious observances.',
        'Nav Durga Chowki':
            'A traditional chowki associated with Nav Durga worship; documented descriptions include nine symbolic dots.',
        'Saraswati Chowki': 'A ceremonial design associated with Saraswati and learning-related occasions.',
        'Jyoti Patta': 'A traditional symbolic arrangement included among documented Aipan forms for ritual contexts.',
        Vasudhara: 'A border-like pattern used around ritual spaces, entrances, steps, and worship areas.',
        'Swastik motif': 'An auspicious geometric symbol found within the traditional Aipan motif vocabulary.'
    };

    function setFilter(category) {
        filters.forEach(button => {
            button.classList.toggle('active', button.dataset.category === category);
        });

        cards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            card.hidden = category !== 'all' && !categories.includes(category);
        });
    }

    filters.forEach(button => {
        button.addEventListener('click', () => setFilter(button.dataset.category));
    });

    cards.forEach(card => {
        const openDetail = () => {
            const title = card.querySelector('h3')?.textContent?.trim();
            const tag = card.querySelector('.motif-tag')?.textContent?.trim();
            if (!title || !detail) return;
            detail.innerHTML = `
                <span class="detail-label">${tag || 'Motif'}</span>
                <h3>${title}</h3>
                <p>${descriptions[title] || 'A documented Aipan motif with ritual and cultural context.'}</p>
            `;
        };

        card.addEventListener('click', openDetail);
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openDetail();
            }
        });
    });

    const occasionMessages = {
        festivals:
            'Festival designs can vary by ritual. Sources document Aipan for observances including Diwali, Shivaratri, and Sankranti.',
        life: 'Aipan is also documented for life-cycle ceremonies including birth, sacred-thread ceremonies, marriage, and other family rites.',
        worship:
            'Thresholds, puja rooms, deity seats, and other ritual spaces are important settings for Aipan designs.'
    };

    occasionCards.forEach(button => {
        button.addEventListener('click', () => {
            occasionCards.forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.filter;
            occasionNote.textContent = occasionMessages[category];
            setFilter(category);
            document.getElementById('motifs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();

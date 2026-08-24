/**
 * Namaste & Regional Greetings Interactive Explorer Engine
 * Handles filtering by geographical zone, modal popups,
 * and keyboard accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.dataset.listenerBound = 'true';
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // 3. Indian Regional Greetings Comprehensive Dataset
    const greetingsData = [
        {
            id: 'vanakkam',
            title: 'Vanakkam',
            script: 'வணக்கம்',
            region: 'south',
            state: 'Tamil Nadu & Puducherry',
            language: 'Tamil',
            phonetic: '/ vuh-nuhk-kuhm /',
            summary: 'Bowing with reverence, humility, and love.',
            meaning: 'Derived from the classical Tamil root "Vanangu" (to bow down or show deep humility). It expresses unconditional hospitality and cordial goodwill.',
            context: 'Spoken while joining hands at heart level. Used universally during social visits, cultural events, and professional salutations across Tamil Nadu.'
        },
        {
            id: 'namaskara',
            title: 'Namaskara',
            script: 'ನಮಸ್ಕಾರ',
            region: 'south',
            state: 'Karnataka',
            language: 'Kannada',
            phonetic: '/ nuh-muhs-kah-ruh /',
            summary: 'The classical Kannada greeting of universal respect.',
            meaning: 'Rooted in Sanskrit "Namas", reflecting the acknowledgment of divine consciousness and goodwill in the other person.',
            context: 'Customarily spoken when welcoming guests into homes, beginning assembly discourses, and addressing elders.'
        },
        {
            id: 'namaskaram-telugu',
            title: 'Namaskaramulu',
            script: 'నమస్కారములు',
            region: 'south',
            state: 'Andhra Pradesh & Telangana',
            language: 'Telugu',
            phonetic: '/ nuh-muhs-kah-ruh-moo-loo /',
            summary: 'Formal salutations of deep reverence and courtesy.',
            meaning: 'Represents offering respectful obeisance to family elders, teachers, and honored guests.',
            context: 'Commonly spoken with folded palms (Muggu threshold greeting) and during auspicious family gatherings.'
        },
        {
            id: 'namaskaram-malayalam',
            title: 'Namaskaram',
            script: 'നമസ്കാരം',
            region: 'south',
            state: 'Kerala',
            language: 'Malayalam',
            phonetic: '/ nuh-muhs-kah-ruhm /',
            summary: 'The universal and warm salutation of God\'s Own Country.',
            meaning: 'Spiritual greeting acknowledging mutual respect and peace between people.',
            context: 'Heard throughout daily Kerala life, boat races, Onam festivals, and Ayurvedic ashrams.'
        },
        {
            id: 'sat-sri-akaal',
            title: 'Sat Sri Akaal',
            script: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
            region: 'north',
            state: 'Punjab & Chandigarh',
            language: 'Punjabi',
            phonetic: '/ suht sree uh-kahl /',
            summary: '"True is the Timeless Supreme Lord"',
            meaning: 'Derived from Gurbani: "Sat" (Truth), "Sri" (Revered), "Akaal" (The Timeless Divine). It affirms the eternal sovereignty of truth.',
            context: 'The traditional greeting and battle cry of the Sikh and Punjabi community, spoken with hands joined gracefully over the chest.'
        },
        {
            id: 'pranam',
            title: 'Pranam / Namaste',
            script: 'प्रणाम / नमस्ते',
            region: 'north',
            state: 'Uttar Pradesh, Bihar & MP',
            language: 'Hindi & Sanskrit',
            phonetic: '/ pruh-nahm / nuh-muhs-tay /',
            summary: 'Bowing to inner divinity and elder wisdom.',
            meaning: 'Pranam is the act of bowing down in profound humility, seeking blessings from parents, grandparents, and gurus.',
            context: 'Essential cultural etiquette in North India; younger members touch elder feet (Charan Sparsh) followed by Pranam.'
        },
        {
            id: 'nomoshkar',
            title: 'Nomoshkar',
            script: 'নমস্কার',
            region: 'east',
            state: 'West Bengal & Tripura',
            language: 'Bengali',
            phonetic: '/ noh-mohsh-kahr /',
            summary: 'Melodic, cordial greeting of Bengal\'s literary tradition.',
            meaning: 'The Bengali phonological rendering of Namaskar, imbued with profound cultural warmth and intellectual courtesy.',
            context: 'Spoken across Rabindra Sangeet evenings, Durga Puja festivals, and daily neighborhood addas.'
        },
        {
            id: 'nomoskar-assamese',
            title: 'Nomoskar',
            script: 'নমস্কাৰ',
            region: 'east',
            state: 'Assam & Brahmaputra Valley',
            language: 'Assamese',
            phonetic: '/ noh-mohs-kahr /',
            summary: 'Graceful greeting paired with the sacred Gamosa.',
            meaning: 'Reverential salutation expressing peace and welcome in Assamese culture.',
            context: 'Often accompanied by gifting the traditional red-and-white woven Gamosa during Bihu festivals and formal felicitations.'
        },
        {
            id: 'khamma-ghani',
            title: 'Khamma Ghani',
            script: 'खम्मा घणी',
            region: 'west',
            state: 'Rajasthan',
            language: 'Rajasthani / Marwari',
            phonetic: '/ khuhm-mah ghuh-nee /',
            summary: '"May you receive abundant grace and blessings!"',
            meaning: 'A royal and heartwarming Rajasthani greeting asking forgiveness for shortcomings and praying for abundant joy ("Ghani Khamma").',
            context: 'Spoken with hands folded and a gracious head bow across Rajasthani heritage forts, havelis, and desert communities.'
        },
        {
            id: 'kem-cho',
            title: 'Kem Cho / Jai Shri Krishna',
            script: 'કેમ છો / જય શ્રી કૃષ્ણ',
            region: 'west',
            state: 'Gujarat',
            language: 'Gujarati',
            phonetic: '/ kaym chhoh /',
            summary: '"How are you?" — Friendly inquiry & divine blessing.',
            meaning: 'The universally affectionate inquiry into one\'s well-being, traditionally responded to with "Majama!" (I am in joy/peace!).',
            context: 'The heartbeat of Gujarati hospitality across businesses, family festivities, and vibrant Navratri Garba grounds.'
        },
        {
            id: 'julley',
            title: 'Julley',
            script: 'ཇུ་ལེགས།',
            region: 'north',
            state: 'Ladakh & Spiti',
            language: 'Ladakhi / Bhoti',
            phonetic: '/ joo-lay /',
            summary: 'Hello, Welcome, Thank you, and Goodbye!',
            meaning: 'A magical multi-purpose Himalayan greeting conveying friendship, deep gratitude, and warmth in the high mountain valleys.',
            context: 'Smiled by monastics, trekkers, and villagers across ancient monasteries and mountain passes.'
        },
        {
            id: 'adaab',
            title: 'Adaab / Adaab Arz',
            script: 'آداب عرض ہے',
            region: 'north',
            state: 'Lucknow, Delhi & Kashmir',
            language: 'Urdu',
            phonetic: '/ uh-dahb uhrz hai /',
            summary: '"I offer my deepest respects and etiquette."',
            meaning: 'From Arabic root "Adab", signifying refinement, manners, and cultured respect.',
            context: 'Executed with a graceful upward wave of the right palm to the forehead accompanied by a gentle bow.'
        }
    ];

    const cardsGrid = document.getElementById('greeting-cards-grid');
    const filterBtns = document.querySelectorAll('.region-filter-btn');
    const modal = document.getElementById('greeting-modal');
    const modalCloseBtn = document.getElementById('btn-close-greeting-modal');

    const modalTitle = document.getElementById('modal-greeting-title');
    const modalPhonetic = document.getElementById('modal-phonetic');
    const modalRegion = document.getElementById('modal-region-badge');
    const modalScript = document.getElementById('modal-script');
    const modalMeaning = document.getElementById('modal-meaning');
    const modalContext = document.getElementById('modal-context');

    function renderCards(filter = 'all') {
        if (!cardsGrid) return;
        cardsGrid.innerHTML = '';

        const filtered = filter === 'all'
            ? greetingsData
            : greetingsData.filter(g => g.region === filter);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'interactive-greeting-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Learn about greeting: ${item.title}`);
            card.innerHTML = `
                <span class="card-badge">${item.state}</span>
                <h3>${item.title}</h3>
                <div class="card-phonetic">${item.phonetic}</div>
                <p class="card-summary">${item.summary}</p>
                <button class="btn-card-learn">Explore Meaning ›</button>
            `;

            const openHandler = () => openGreetingModal(item);
            card.addEventListener('click', openHandler);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openHandler();
                }
            });

            cardsGrid.appendChild(card);
        });
    }

    function openGreetingModal(item) {
        if (!modal) return;
        modalTitle.textContent = `${item.title} (${item.language})`;
        modalPhonetic.textContent = item.phonetic;
        modalRegion.textContent = item.state;
        modalScript.textContent = item.script;
        modalMeaning.textContent = item.meaning;
        modalContext.textContent = item.context;

        modal.hidden = false;
        if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeModal() {
        if (modal) modal.hidden = true;
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) {
            closeModal();
        }
    });

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const region = btn.getAttribute('data-region');
            renderCards(region);
        });
    });

    // Initial render
    renderCards('all');
});

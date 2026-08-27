/**
 * Meitei (Manipuri) Linguistic UI Logic
 * Intersects visibility and dynamically renders the Flashcard Array
 * bounding English <-> Meitei Mayek (ꯃꯤꯇꯩꯂꯣꯟ) translations via DOM manipulation.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Global Scroll Intersection Matrix */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));

    /* 2. Audio Bindings */
    const attachTTS = (id) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                // Synthesizes the click visual hook for TTS routing
                const cache = btn.innerHTML;
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Playing Audio...`;
                setTimeout(() => { btn.innerHTML = cache; }, 1500);
            });
        }
    }
    attachTTS('play-meitei');
    attachTTS('play-khurumjari');

    /* 3. Flashcard Data Layer (Triple Script Bindings: En -> Mayek -> Bengali) */
    const vocabularyList = [
        { id: 1, type: 'family', en: 'Mother', mayek: 'ꯏꯃꯥ', beng: 'ইমা', ph: 'Ima' },
        { id: 2, type: 'family', en: 'Father', mayek: 'ꯏꯄꯥ', beng: 'ইপা', ph: 'Ipa' },
        { id: 3, type: 'nature', en: 'Water', mayek: 'ꯏꯁꯤꯡ', beng: 'ঈশিং', ph: 'Ishing' },
        { id: 4, type: 'nature', en: 'Fire', mayek: 'ꯃꯩ', beng: 'মৈ', ph: 'Mei' },
        { id: 5, type: 'nature', en: 'Earth', mayek: 'ꯂꯩꯕꯥꯛ', beng: 'লৈবাক', ph: 'Leibak' },
        { id: 6, type: 'common', en: 'To Eat', mayek: 'ꯆꯥꯕꯥ', beng: 'চাবা', ph: 'Chaba' },
        { id: 7, type: 'common', en: 'To Go', mayek: 'ꯆꯠꯄꯥ', beng: 'চৎপা', ph: 'Chatpa' },
        { id: 8, type: 'common', en: 'To Come', mayek: 'ꯂꯥꯛꯄꯥ', beng: 'লাকপা', ph: 'Lakpa' },
        { id: 9, type: 'nature', en: 'Sun', mayek: 'ꯅꯨꯃꯤꯠ', beng: 'নুমিৎ', ph: 'Numit' },
        { id: 10, type: 'nature', en: 'Moon', mayek: 'ꯊꯥ', beng: 'থা', ph: 'Tha' }
    ];

    const container = document.getElementById('flashcard-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Memory Allocation builder reconstructing DOM blocks
    function renderFlashcards(filterType) {
        if (!container) return;
        container.innerHTML = '';

        const dataset = filterType === 'all' ? vocabularyList : vocabularyList.filter(item => item.type === filterType);

        dataset.forEach(word => {
            const block = document.createElement('div');
            block.className = 'ml-card';
            block.setAttribute('data-id', word.id);

            // Build absolute geometry blocks injecting payload data
            block.innerHTML = `
                <div class="ml-inner">
                    <!-- English Face -->
                    <div class="ml-front">
                        <div class="ml-f-word">${word.en}</div>
                        <div class="ml-action"><i class="fas fa-sync-alt"></i> Reveal Translation</div>
                    </div>
                    <!-- Tibetan-Sino Payload Face (Meitei / Bengali fallsack) -->
                    <div class="ml-back">
                        <div class="ml-b-script-indig meitei-script">${word.mayek}</div>
                        <div class="ml-b-script-beng bengali-script">${word.beng}</div>
                        <div class="ml-b-pronounce">[ ${word.ph} ]</div>
                    </div>
                </div>
            `;

            // Attach hardware-flip listeners
            block.addEventListener('click', () => {
                block.classList.toggle('is-flipped');
            });

            container.appendChild(block);
        });
    }

    // Filter Logic Hooks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Strip active bounds
            filterBtns.forEach(b => b.classList.remove('active'));
            // Assert new bounds
            e.target.classList.add('active');

            const reqType = e.target.getAttribute('data-category');
            renderFlashcards(reqType);
        });
    });

    // Invoke Boot Process globally allocating cards
    renderFlashcards('all');

});

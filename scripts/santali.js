/**
 * Santali Linguistic UI Logic
 * Intersects visibility and dynamically renders the Flashcard Array
 * bounded to English <-> Ol Chiki (ᱥᱟᱱᱛᱟᱲᱤ) translations.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Global Scroll Logic */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-fade-in').forEach(el => observer.observe(el));

    /* 2. Global Pronunciation Hooks (Simulation) */
    const attachTTS = (id) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                // In production, maps to Native SpeechSynthesis API evaluating regional packs
                const root = btn.innerHTML;
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Playing Audio...`;
                setTimeout(() => { btn.innerHTML = root; }, 1500);
            });
        }
    }
    attachTTS('play-santhal');
    attachTTS('play-johar');

    /* 3. Flashcard Linguistic Engine Array */
    const vocabularyList = [
        { id: 1, type: 'family', en: 'Mother', chiki: 'ᱟᱭᱳ', ph: 'Ayó' },
        { id: 2, type: 'family', en: 'Father', chiki: 'ᱵᱟᱵᱟ', ph: 'Baba' },
        { id: 3, type: 'nature', en: 'Water', chiki: 'ᱫᱟᱜ', ph: 'Dak' },
        { id: 4, type: 'nature', en: 'Fire', chiki: 'ᱥᱮᱸᱜᱮᱞ', ph: 'Sengel' },
        { id: 5, type: 'nature', en: 'Tree', chiki: 'ᱫᱟᱨᱮ', ph: 'Dare' },
        { id: 6, type: 'numbers', en: 'One', chiki: 'ᱢᱤᱫ', ph: 'Mit' },
        { id: 7, type: 'numbers', en: 'Two', chiki: 'ᱵᱟᱨ', ph: 'Bar' },
        { id: 8, type: 'numbers', en: 'Three', chiki: 'ᱯᱮ', ph: 'Pe' },
        { id: 9, type: 'nature', en: 'Sun', chiki: 'ᱥᱤᱧᱪᱟᱸᱫᱚ', ph: 'Sin Cando' },
        { id: 10, type: 'nature', en: 'Moon', chiki: 'ᱧᱤᱫᱟᱹᱪᱟᱸᱫᱚ', ph: 'Nida Cando' }
    ];

    const container = document.getElementById('flashcard-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Builder Function
    function renderFlashcards(filterType) {
        if (!container) return;
        container.innerHTML = '';

        const targetData = filterType === 'all' ? vocabularyList : vocabularyList.filter(item => item.type === filterType);

        targetData.forEach(word => {
            const block = document.createElement('div');
            block.className = 'ol-card';
            block.setAttribute('data-id', word.id);

            // Generate the Complex Flip Geometry
            block.innerHTML = `
                <div class="ol-inner">
                    <!-- Front (English) -->
                    <div class="ol-front">
                        <div class="ol-f-word">${word.en}</div>
                        <div class="ol-action"><i class="fas fa-sync-alt"></i> Click to Reveal</div>
                    </div>
                    <!-- Back (Ol Chiki) -->
                    <div class="ol-back">
                        <div class="ol-b-script ol-chiki">${word.chiki}</div>
                        <div class="ol-b-pronounce">[ ${word.ph} ]</div>
                    </div>
                </div>
            `;

            // Assign Flip Mutation Listner
            block.addEventListener('click', () => {
                block.classList.toggle('is-flipped');
            });

            container.appendChild(block);
        });
    }

    // Filter Logic Hooks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const reqType = e.target.getAttribute('data-category');
            renderFlashcards(reqType);
        });
    });

    // Boot execution
    renderFlashcards('all');

});

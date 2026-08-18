/**
 * Chaul Ancient Port Explorer Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initQuiz();
    initGalleryModal();
    initScrollTop();
    registerJourneyItems();
});

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });
}

function initQuiz() {
    const form = document.getElementById('chaul-quiz-form');
    const resultDiv = document.getElementById('quiz-result');
    const correctAnswers = { q1: '2', q2: '2' };
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let score = 0;
            const formData = new FormData(form);
            for (let [question, answer] of formData.entries()) {
                if (correctAnswers[question] === answer) score++;
            }
            const total = Object.keys(correctAnswers).length;
            resultDiv.textContent = score === total ? `🎉 Perfect! ${score}/${total}` : `You scored ${score}/${total}`;
            resultDiv.style.color = score === total ? 'green' : 'orange';
        });
    }
}

function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.modal-close');
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            modalTitle.textContent = item.getAttribute('data-title');
            modalDesc.textContent = item.getAttribute('data-desc');
            modal.classList.add('active');
        });
    });
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
}

function initScrollTop() {
    const btn = document.getElementById('btn-scroll-top');
    if (btn) {
        window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300));
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

function registerJourneyItems() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('chaul-port-explorer/index.html', [
            { id: 'chaul-overview', title: 'Chaul Historical Background', description: 'History of the Konkan port.', link: 'chaul-port-explorer/index.html#overview' },
            { id: 'chaul-fort', title: 'Revdanda Fort', description: 'The Portuguese coastal stronghold.', link: 'chaul-port-explorer/index.html#monuments' }
        ]);
    }
}

/** Battle of Koppam Logic */
document.addEventListener('DOMContentLoaded', () => {
    initTabs(); initQuiz(); initGalleryModal(); initScrollTop(); registerJourneyItems();
});

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => { t.classList.remove('active'); });
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });
}

function initQuiz() {
    const form = document.getElementById('koppam-quiz-form');
    const resultDiv = document.getElementById('quiz-result');
    const correctAnswers = { q1: '2', q2: '1' };
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
        window.Journey.registerSearchItems('battle-koppam/index.html', [
            { id: 'koppam-battle', title: 'Battle of Koppam', description: 'Chola vs Chalukya conflict.', link: 'battle-koppam/index.html#overview' },
            { id: 'koppam-strategy', title: 'Battle Strategy', description: 'Tactics and key events at Koppam.', link: 'battle-koppam/index.html#strategy' }
        ]);
    }
}

/**
 * Khambhat Ancient Port Explorer Interactive Logic
 * Handles tab switching, quiz validation, gallery modals, and Journey integration
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initQuiz();
    initGalleryModal();
    initScrollTop();
    registerJourneyItems();
});

/**
 * Initialize tab switching functionality
 */
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Show corresponding content
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * Initialize the interactive quiz logic
 */
function initQuiz() {
    const form = document.getElementById('khambhat-quiz-form');
    const resultDiv = document.getElementById('quiz-result');
    const correctAnswers = { q1: '2', q2: '1' };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let score = 0;
            const formData = new FormData(form);

            for (let [question, answer] of formData.entries()) {
                if (correctAnswers[question] === answer) {
                    score++;
                }
            }

            const totalQuestions = Object.keys(correctAnswers).length;
            if (score === totalQuestions) {
                resultDiv.textContent = `🎉 Perfect! You scored ${score}/${totalQuestions}. You are a Khambhat expert!`;
                resultDiv.style.color = 'green';
            } else {
                resultDiv.textContent = `You scored ${score}/${totalQuestions}. Keep exploring!`;
                resultDiv.style.color = 'orange';
            }
        });
    }
}

/**
 * Initialize Gallery Modal popups
 */
function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');

            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/**
 * Initialize Scroll to Top button visibility
 */
function initScrollTop() {
    const btn = document.getElementById('btn-scroll-top');
    if (btn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Register items with the cross-explorer Journey search index
 */
function registerJourneyItems() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('khambhat-port-explorer/index.html', [
            {
                id: 'khambhat-overview',
                title: 'Khambhat Historical Overview',
                description: 'Learn about the history of Cambay port.',
                link: 'khambhat-port-explorer/index.html#overview'
            },
            {
                id: 'khambhat-archaeology',
                title: 'Khambhat Underwater Archaeology',
                description: 'Discover the submerged ruins of the Gulf of Khambhat.',
                link: 'khambhat-port-explorer/index.html#archaeology'
            },
            {
                id: 'khambhat-exports',
                title: 'Agate & Carnelian Industry',
                description: 'The famous gemstone exports of Khambhat.',
                link: 'khambhat-port-explorer/index.html#exports'
            }
        ]);
    }
}


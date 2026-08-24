// Samudragupta Profile Page JavaScript

function runInit() {
    const safeExec = (fn, name) => {
        try { fn(); } catch (e) { console.error(`Error in ${name}:`, e); }
    };
    safeExec(initQuizWidget, 'initQuizWidget');
    safeExec(initThemeToggle, 'initThemeToggle');
    safeExec(initImageLightbox, 'initImageLightbox');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
} else {
    runInit();
}

// 1. Interactive Quiz Widget Logic
function initQuizWidget() {
    const optionsBox = document.getElementById('quiz-options-box');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (!optionsBox || !feedbackBox) return;

    const explanation = "Correct! Samudragupta was famously portrayed playing the Veena on his gold dinar coins, reflecting his title Kaviraja ('King of Poets').";

    const buttons = optionsBox.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.disabled = true);
            const isCorrect = btn.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                btn.classList.add('correct-ans');
                feedbackBox.style.color = '#10b981';
                feedbackBox.innerHTML = `✅ ${explanation}`;
            } else {
                btn.classList.add('wrong-ans');
                feedbackBox.style.color = '#ef4444';
                feedbackBox.innerHTML = `❌ Incorrect. The correct answer is <strong>Veena</strong>.`;
            }
        });
    });
}

// 2. Dark/Light Theme Toggle Logic
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        const themeStr = isLight ? 'light' : 'dark';
        
        try {
            const storage = JSON.parse(localStorage.getItem('iie_storage') || '{}');
            storage.theme = themeStr;
            localStorage.setItem('iie_storage', JSON.stringify(storage));
        } catch(e) {}
        localStorage.setItem('theme', themeStr);
        
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

// 3. Interactive Image Lightbox Modal Logic
function initImageLightbox() {
    const modal = document.getElementById('img-modal-lightbox');
    const modalTarget = document.getElementById('img-modal-target');
    const modalCaption = document.getElementById('img-modal-caption');
    const closeBtn = document.getElementById('img-modal-close');
    const triggers = document.querySelectorAll('.interactive-img-trigger');

    if (!modal || !modalTarget || !modalCaption || !triggers.length) return;

    function openModal(imgSrc, captionText) {
        modalTarget.src = imgSrc;
        modalCaption.textContent = captionText || '';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modalTarget.src = '';
        document.body.style.overflow = '';
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const fullImg = trigger.getAttribute('data-fullimg') || trigger.querySelector('img').src;
            const caption = trigger.getAttribute('data-caption') || trigger.querySelector('.img-caption')?.textContent || '';
            openModal(fullImg, caption);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

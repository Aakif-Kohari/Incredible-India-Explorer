function initRotatingText() {
    const rotators = document.querySelectorAll('.rotating-text-wrapper');
    rotators.forEach(wrapper => {
        if (wrapper.dataset.intervalId) {
            clearInterval(parseInt(wrapper.dataset.intervalId, 10));
        }

        const wordsStr = wrapper.getAttribute('data-words');
        if (!wordsStr) return;

        const words = wordsStr.split(',').map(w => w.trim());
        if (words.length === 0) return;

        let currentIndex = 0;
        wrapper.innerHTML = `<span class="rotating-text">${words[0]}</span>`;

        const intervalId = setInterval(() => {
            const currentSpan = wrapper.querySelector('.rotating-text');
            if (currentSpan) {
                currentSpan.style.animation = 'slideOutFade 0.5s ease-in forwards';
            }

            setTimeout(() => {
                const innerSpan = wrapper.querySelector('.rotating-text');
                if (!innerSpan) return;
                currentIndex = (currentIndex + 1) % words.length;
                wrapper.innerHTML = `<span class="rotating-text">${words[currentIndex]}</span>`;
            }, 500);
        }, 3500);

        wrapper.dataset.intervalId = intervalId.toString();
    });
}

function initScrollEffects() {
    const fadeSections = document.querySelectorAll('.fade-in-section, .story-step');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.scroll-section');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

if (typeof window !== 'undefined') {
    window.initRotatingText = initRotatingText;
    window.initScrollEffects = initScrollEffects;
}

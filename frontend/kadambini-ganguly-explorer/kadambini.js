document.addEventListener('DOMContentLoaded', () => {
    const data = window.KADAMBINI_DATA || (typeof KADAMBINI_DATA !== 'undefined' ? KADAMBINI_DATA : null);

    function renderQuickFacts() {
        const list = document.getElementById('quick-facts-list');
        if (!list || !data) return;
        const facts = data.quickFacts;
        const rows = [
            ['Lifespan', facts.lifespan],
            ['Birthplace', facts.birthplace],
            ['Fields', facts.primaryFields.join(', ')],
            ...facts.firsts.map((f, i) => [i === 0 ? 'Firsts' : '', f]),
            ['Spouse', facts.spouse],
        ];
        rows.forEach(([label, value]) => {
            const li = document.createElement('li');
            li.className = 'kg-fact-item';
            if (label) {
                const strong = document.createElement('strong');
                strong.textContent = label;
                li.appendChild(strong);
            }
            const span = document.createElement('span');
            span.textContent = value;
            li.appendChild(span);
            list.appendChild(li);
        });
    }

    function renderMilestones() {
        const grid = document.getElementById('milestones-container');
        if (!grid || !data) return;
        data.milestones.forEach(item => {
            const el = document.createElement('div');
            el.className = 'kg-milestone-card';
            el.tabIndex = 0;
            const h3 = document.createElement('h3');
            h3.textContent = item.title;
            const p = document.createElement('p');
            p.textContent = item.desc;
            el.append(h3, p);
            grid.appendChild(el);
        });
    }

    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container || !data) return;
        data.timelineEvents.forEach(item => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
            el.tabIndex = 0;
            el.innerHTML = `
                <div class="timeline-year"></div>
                <div class="timeline-content">
                    <h3></h3>
                    <p></p>
                </div>
            `;
            el.querySelector('.timeline-year').textContent = item.year;
            el.querySelector('h3').textContent = item.title;
            el.querySelector('p').textContent = item.description;
            container.appendChild(el);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
    }

    function renderLegacy() {
        const box = document.getElementById('legacy-content');
        if (!box || !data) return;
        const p = document.createElement('p');
        p.textContent = data.legacyText;
        box.appendChild(p);
    }

    function renderSources() {
        const list = document.getElementById('references-container');
        if (!list || !data) return;
        data.sources.forEach(src => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = src.link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = src.text;
            li.appendChild(a);
            list.appendChild(li);
        });
    }

    function initSubnav() {
        const buttons = document.querySelectorAll('.kg-nav-btn[data-target]');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = document.getElementById(btn.dataset.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initQuiz() {
        const section = document.getElementById('quiz-body');
        if (!section || !data) return;
        let score = 0;
        let answered = 0;

        function renderQuestion(q, index) {
            section.innerHTML = '';
            const card = document.createElement('div');
            card.className = 'kg-quiz-card';

            const progress = document.createElement('div');
            progress.className = 'kg-quiz-progress';
            progress.textContent = `Question ${index + 1} of ${data.quizQuestions.length}`;
            card.appendChild(progress);

            const h3 = document.createElement('h3');
            h3.textContent = q.question;
            card.appendChild(h3);

            const optionsBox = document.createElement('div');
            optionsBox.className = 'kg-quiz-options';

            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'kg-quiz-option';
                btn.textContent = opt;
                btn.addEventListener('click', () => {
                    answered += 1;
                    const correct = i === q.answerIndex;
                    if (correct) score += 1;
                    optionsBox.querySelectorAll('.kg-quiz-option').forEach((b, bi) => {
                        b.disabled = true;
                        if (bi === q.answerIndex) b.classList.add('correct');
                        else if (bi === i && !correct) b.classList.add('wrong');
                    });
                    const explain = document.createElement('p');
                    explain.className = 'kg-quiz-explanation';
                    explain.textContent = (correct ? '\u2705 Correct. ' : '\u274C Not quite. ') + q.explanation;
                    card.appendChild(explain);

                    const next = document.createElement('button');
                    next.type = 'button';
                    next.className = 'kg-quiz-next';
                    next.textContent = index + 1 < data.quizQuestions.length ? 'Next Question \u2192' : 'See My Score \u2192';
                    next.addEventListener('click', () => {
                        if (index + 1 < data.quizQuestions.length) {
                            renderQuestion(data.quizQuestions[index + 1], index + 1);
                        } else {
                            renderResult();
                        }
                    });
                    card.appendChild(next);
                });
                optionsBox.appendChild(btn);
            });

            card.appendChild(optionsBox);
            section.appendChild(card);
        }

        function renderResult() {
            section.innerHTML = '';
            const card = document.createElement('div');
            card.className = 'kg-quiz-card kg-quiz-result';
            const h3 = document.createElement('h3');
            h3.textContent = `You scored ${score} out of ${data.quizQuestions.length}!`;
            const p = document.createElement('p');
            p.textContent = score === data.quizQuestions.length
                ? 'Perfect! You know the story of Kadambini Ganguly inside out.'
                : 'Every pioneer\u2019s story has more to discover \u2014 scroll back through her life above.';
            const restart = document.createElement('button');
            restart.type = 'button';
            restart.className = 'kg-quiz-next';
            restart.textContent = '\u21bb Try Again';
            restart.addEventListener('click', () => {
                score = 0;
                answered = 0;
                renderQuestion(data.quizQuestions[0], 0);
            });
            card.append(h3, p, restart);
            section.appendChild(card);
        }

        if (data.quizQuestions.length) {
            renderQuestion(data.quizQuestions[0], 0);
        }
    }

    function initMap() {
        const mapEl = document.getElementById('kg-map');
        if (!mapEl || !data || typeof L === 'undefined') return;

        const map = L.map(mapEl, { scrollWheelZoom: false }).setView(data.mapCenter, data.mapZoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
        }).addTo(map);

        data.mapLocations.forEach(loc => {
            L.circleMarker(loc.coords, {
                radius: 9,
                color: '#ff9933',
                weight: 3,
                fillColor: '#138808',
                fillOpacity: 0.85,
            }).addTo(map).bindPopup(`<strong>${loc.name}</strong><br>${loc.blurb}`);
        });
    }

    renderQuickFacts();
    renderMilestones();
    renderTimeline();
    renderLegacy();
    renderSources();
    initSubnav();
    initQuiz();
    initMap();
});

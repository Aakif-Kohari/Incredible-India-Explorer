// Indian Mathematics & Scientific Heritage — Script Module

document.addEventListener('DOMContentLoaded', () => {
    // ─── Tab Switching ────────────────────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
            const target = document.getElementById('tab-' + btn.dataset.tab);
            if (target) target.style.display = 'block';
        });
    });

    renderMath();
    renderAstronomy();
    renderScientists();
    renderTexts();
    renderTimeline();
    renderStats();
    renderInsights();

    // ─── Mathematical Discoveries ────────────────────────────────────
    function renderMath() {
        const grid = document.getElementById('math-grid');
        const chart = document.getElementById('impact-chart');
        if (grid) {
            grid.innerHTML = MATHEMATICAL_CONTRIBUTIONS.map(m => `
                <div class="discovery-card" style="--card-color: ${m.color};">
                    <div class="name" style="color: ${m.color};">${m.name}</div>
                    <div class="meta">🧑‍🔬 ${m.discoverer} · 📅 ${m.period}</div>
                    <div class="desc">${m.description}</div>
                    <div class="impact">💡 ${m.impact}</div>
                    <div style="margin-top: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">
                            <span>Global Impact</span>
                            <span style="color: ${m.color};">${m.significance}%</span>
                        </div>
                        <div style="height: 8px; border-radius: 4px; background: var(--border); overflow: hidden;">
                            <div style="height: 100%; width: ${m.significance}%; border-radius: 4px; background: ${m.color}; transition: width 0.6s;"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        if (chart) {
            chart.innerHTML = MATHEMATICAL_CONTRIBUTIONS
                .sort((a, b) => b.significance - a.significance)
                .map(m => `
                    <div class="impact-bar">
                        <div class="label">${m.name}</div>
                        <div class="track">
                            <div class="fill" style="width: ${m.significance}%; background: ${m.color};">${m.significance}%</div>
                        </div>
                    </div>
                `).join('');
        }
    }

    // ─── Astronomy ───────────────────────────────────────────────────
    function renderAstronomy() {
        const container = document.getElementById('astronomy-cards');
        if (!container) return;
        container.innerHTML = ASTRONOMICAL_ACHIEVEMENTS.map(a => `
            <div class="astro-card" style="--astro-color: ${a.color};">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <div class="name" style="color: ${a.color};">${a.name}</div>
                        <div class="meta">🧑‍🔬 ${a.discoverer} · 📅 ${a.period}</div>
                    </div>
                    <span style="padding: 4px 12px; border-radius: 16px; font-size: 0.7rem; font-weight: 600; background: ${a.color}20; color: ${a.color}; border: 1px solid ${a.color}40;">${a.accuracy}% accurate</span>
                </div>
                <div class="desc">${a.description}</div>
                <div class="accuracy">
                    <span style="font-size: 0.7rem; color: var(--text-secondary); width: 60px;">Accuracy:</span>
                    <div class="accuracy-track">
                        <div class="accuracy-fill" style="width: ${a.accuracy}%; background: ${a.color};"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ─── Scientists ──────────────────────────────────────────────────
    function renderScientists() {
        const container = document.getElementById('scientists-list');
        if (!container) return;
        container.innerHTML = SCIENTISTS.map(s => `
            <div class="scientist-card">
                <div class="avatar" style="background: linear-gradient(135deg, ${s.color}, ${s.color}88);">${s.name.charAt(0)}</div>
                <div class="info">
                    <div class="name" style="color: ${s.color};">${s.name}</div>
                    <div class="era">${s.era} · ${s.field}</div>
                    <div class="contribution">${s.contribution}</div>
                    <div style="margin-top: 6px;"><span style="padding: 3px 10px; border-radius: 16px; font-size: 0.7rem; font-weight: 600; background: ${s.color}20; color: ${s.color}; border: 1px solid ${s.color}40;">${s.notable}</span></div>
                </div>
            </div>
        `).join('');
    }

    // ─── Ancient Texts ───────────────────────────────────────────────
    function renderTexts() {
        const container = document.getElementById('texts-list');
        if (!container) return;
        container.innerHTML = SANSKRIT_TEXTS.map(t => `
            <div class="text-card">
                <div class="title">${t.title}</div>
                <div class="meta">✍️ ${t.author} · 📅 ${t.period}</div>
                <div class="desc">${t.content}</div>
                <div class="significance">⭐ ${t.significance}</div>
            </div>
        `).join('');
    }

    // ─── Timeline ────────────────────────────────────────────────────
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;
        const events = [
            { year: "800 BCE", event: "Sulba Sutras — Pythagorean Theorem", desc: "Baudhayana states the right-angle theorem 1,000 years before Pythagoras. Methods for √2 and altar geometry.", color: "#f59e0b" },
            { year: "500 BCE", event: "Vedic Mathematics & Large Numbers", desc: "Yajurveda names powers of 10 up to trillion. Pingala develops binary-like combinatorics.", color: "#22c55e" },
            { year: "300 BCE", event: "Brahmi Numerals Emerge", desc: "The ancestors of our 0-9 digits appear in Ashoka's inscriptions at Brahmagiri.", color: "#06b6d4" },
            { year: "499 CE", event: "Aryabhata's Aryabhatiya", desc: "π = 3.1416, sine tables, Earth rotates on axis, algebraic equations, trigonometry.", color: "#f59e0b" },
            { year: "550 CE", event: "Varahamihira's Pancha-Siddhantika", desc: "Compiled five astronomical systems. Eclipse prediction, precession of equinoxes.", color: "#ef4444" },
            { year: "628 CE", event: "Brahmagupta's Brahmasphutasiddhanta", desc: "Zero as a number, negative numbers, quadratic equations, gravitational attraction.", color: "#8b5cf6" },
            { year: "850 CE", event: "Indian Numerals Reach Baghdad", desc: "Al-Khwarizmi uses Indian numeral system. Writes 'On the Calculation with Hindu Numerals'.", color: "#f97316" },
            { year: "1150 CE", event: "Bhaskara II's Lilavati & Bījagaṇita", desc: "World's first illustrated math textbook. Pell's equation, cyclic numbers, advanced algebra.", color: "#06b6d4" },
            { year: "1350 CE", event: "Madhava's Infinite Series", desc: "π, sine, cosine as infinite series — 250 years before Newton/Leibniz calculus.", color: "#a855f7" },
            { year: "1501 CE", event: "Nilakantha's Tantrasaṅgraha", desc: "Refined planetary models. Kerala School's masterwork combining astronomy and calculus.", color: "#3b82f6" },
            { year: "1887 CE", event: "Ramanujan's Mathematical Genius", desc: "3,900+ results. Partition function, mock theta functions, Ramanujan primes.", color: "#ec4899" },
            { year: "1930 CE", event: "C.V. Raman — Nobel Prize", desc: "Raman Effect discovered. First Asian Nobel in Science. Pioneered Indian physics.", color: "#eab308" },
        ];
        container.innerHTML = `
            <div class="card">
                <div class="timeline">
                    ${events.map(e => `
                        <div class="timeline-item">
                            <div class="year">${e.year}</div>
                            <div class="event" style="color: ${e.color};">${e.event}</div>
                            <div class="desc">${e.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ─── Stats ───────────────────────────────────────────────────────
    function renderStats() {
        const grid = document.getElementById('stats-grid');
        if (!grid) return;
        grid.innerHTML = SCIENCE_STATS.map(s => `
            <div class="stat-card">
                <div style="font-size: 1.5rem; margin-bottom: 8px;">${s.icon}</div>
                <div class="value" style="color: ${s.color};">${s.value}</div>
                <div class="label">${s.label}</div>
            </div>
        `).join('');
    }

    // ─── Insights ────────────────────────────────────────────────────
    function renderInsights() {
        const container = document.getElementById('insights-container');
        if (!container) return;
        const insights = [
            { icon: "0️⃣", title: "Zero — The Greatest Invention", color: "#f0c040", body: "Zero is arguably humanity's most important intellectual achievement. Without it: no binary, no computers, no calculus, no modern science. India didn't just invent a number — it invented the concept that 'nothing' is 'something.' When Europeans first encountered zero through Arabic translations, many refused to accept it. The Church called it 'diabolical.' Yet zero became the foundation of all modern mathematics." },
            { icon: "🔢", title: "The Numeral Conspiracy", color: "#4080f0", body: "Our digits 0-9 are Indian. The word 'algorithm' comes from Al-Khwarizmi, who wrote about Hindu numerals. The word 'algebra' comes from his Arabic book 'al-Kitab al-Mukhtasar.' Europe called them 'Arabic numerals' — a misnomer that persists today. Every time you write a number, you write in an Indian language." },
            { icon: "📐", title: "The Kerala Calculus", color: "#a060f0", body: "The Kerala School of Mathematics (1350–1600 CE) developed calculus 250 years before Newton and Leibniz. Madhava's infinite series for π and trigonometric functions, Nilakantha's refined planetary models — this was a complete mathematical revolution that remained largely unknown to Europe until the 20th century." },
            { icon: "🌍", title: "Why Was It Forgotten?", color: "#ef4060", body: "Indian mathematical knowledge was transmitted to the Islamic Golden Age (8th–14th century), then to Europe. But as colonial powers dominated narrative, Indian contributions were minimized or attributed to others. The word 'Hindu' was removed from 'Hindu-Arabic numerals.' Modern scholarship is restoring the credit." },
            { icon: "🧑‍🔬", title: "Ramanujan — Pure Intuition", color: "#ec4080", body: "Srinivasa Ramanujan (1887–1920) had almost no formal training. He independently rediscovered 1,000 years of Western mathematics and discovered thousands of new results. His notebooks, filled with formulas he couldn't prove, continue to yield discoveries a century later. 'An equation has no meaning for me unless it expresses a thought of God.'" },
            { icon: "💡", title: "The Living Legacy", color: "#40c080", body: "India's scientific tradition continues: ISRO's Mars Orbiter Mission reached Mars on first attempt (2014) at $74M — less than the budget film Gravity. India produces the world's most STEM graduates. The ancient spirit of inquiry that gave the world zero continues to push boundaries." },
        ];
        container.innerHTML = insights.map(i => `
            <div class="insight-card" style="--insight-color: ${i.color};">
                <div class="title"><span style="font-size: 1.2rem;">${i.icon}</span> <span style="color: ${i.color};">${i.title}</span></div>
                <div class="body">${i.body}</div>
            </div>
        `).join('');
    }
});

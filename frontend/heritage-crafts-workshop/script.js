// Indian Heritage Crafts Workshop — Script Module

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

    renderCrafts();
    renderTools();
    renderAwards();
    renderWorkshop();
    renderStats();
    renderInsights();

    // ─── Crafts with Filter ──────────────────────────────────────────
    function renderCrafts(filter = 'all') {
        const container = document.getElementById('crafts-container');
        if (!container) return;

        let filtered = CRAFT_TRADITIONS;
        if (filter === 'gi') filtered = CRAFT_TRADITIONS.filter(c => c.subtypes.some(s => s.gi === 'Yes'));
        if (filter === 'master') filtered = CRAFT_TRADITIONS.filter(c => c.subtypes.some(s => s.difficulty === 'Master'));
        if (filter === 'beginner') filtered = CRAFT_TRADITIONS.filter(c => c.subtypes.some(s => s.difficulty === 'Beginner'));

        container.innerHTML = filtered.map(craft => `
            <div class="craft-section" style="--craft-color: ${craft.color};">
                <div class="header">
                    <div>
                        <div class="name" style="color: ${craft.color};">${craft.icon} ${craft.name}</div>
                        <div class="origin">📍 ${craft.regions.join(' · ')} · 📅 ${craft.period}</div>
                    </div>
                </div>
                <div class="desc">${craft.description}</div>
                <div style="margin-bottom: 12px;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;"><strong>Techniques:</strong></div>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        ${craft.techniques.map(t => `<span class="badge" style="background: ${craft.color}15; color: ${craft.color}; border-color: ${craft.color}30;">${t}</span>`).join('')}
                    </div>
                </div>
                <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 12px;">Sub-Traditions:</div>
                ${craft.subtypes.map(st => `
                    <div class="subtype-card" style="--subtype-color: ${craft.color};">
                        <div class="name" style="color: ${craft.color};">${st.name}</div>
                        <div class="desc">${st.desc}</div>
                        <div class="meta">
                            ${st.gi === 'Yes' ? '<span class="badge badge-gi">GI Tagged</span>' : ''}
                            <span class="badge badge-${st.difficulty.toLowerCase()}">${st.difficulty}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCrafts(btn.dataset.filter);
        });
    });

    // ─── Tools ──────────────────────────────────────────────────────
    function renderTools() {
        const grid = document.getElementById('tools-grid');
        if (!grid) return;
        grid.innerHTML = TOOLS_AND_MATERIALS.map(t => `
            <div class="tool-card">
                <div class="icon">${t.icon}</div>
                <div class="name">${t.name}</div>
                <div class="craft">${t.craft} · ${t.region}</div>
                <div class="desc">${t.description}</div>
            </div>
        `).join('');
    }

    // ─── Awards ─────────────────────────────────────────────────────
    function renderAwards() {
        const grid = document.getElementById('awards-grid');
        if (!grid) return;
        grid.innerHTML = CRAFT_AWARDS.map(a => `
            <div class="award-card">
                <div class="icon">${a.icon}</div>
                <div class="name">${a.name}</div>
                <div class="desc">${a.description}</div>
            </div>
        `).join('');
    }

    // ─── Workshop Guide ─────────────────────────────────────────────
    function renderWorkshop() {
        const grid = document.getElementById('workshop-grid');
        if (!grid) return;
        grid.innerHTML = WORKSHOP_TIPS.map(w => `
            <div class="insight-card" style="--insight-color: ${w.color};">
                <div class="title"><span style="font-size: 1.2rem;">${w.icon}</span> <span style="color: ${w.color};">${w.title}</span></div>
                <div class="body">${w.body}</div>
            </div>
        `).join('');
    }

    // ─── Stats ──────────────────────────────────────────────────────
    function renderStats() {
        const grid = document.getElementById('stats-grid');
        if (!grid) return;
        grid.innerHTML = CRAFT_STATS.map(s => `
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
            { icon: "🏺", title: "5,000 Years of Making", color: "#d4920a", body: "India's craft heritage dates back to the Indus Valley Civilization (3300 BCE). The Dancing Girl of Mohenjo-daro — a 10cm bronze figurine made using lost-wax casting — proves that sophisticated metalworking existed 4,500 years ago. The same technique (Dhokra) is still practiced in Chhattisgarh today." },
            { icon: "🧬", title: "Living DNA of Civilization", color: "#c47840", body: "Indian crafts are not museum pieces — they are living traditions. The Kolhapuri chappal is worn daily. The Jaapi hat is part of Assamese identity. When a Dhokra artisan in Bastar casts a figure using the same technique as Harappan craftsmen, they carry forward an unbroken 4,500-year lineage of knowledge." },
            { icon: "🌍", title: "Global Influence", color: "#22c55e", body: "Indian crafts have shaped global art: Indian block printing inspired European textiles, Kalamkari influenced Southeast Asian batik, Bidriware was collected by European royalty, and Indian brass work influenced metalwork from Benin to Japan. India's craft DNA is woven into world culture." },
            { icon: "⚠️", title: "Endangered Traditions", color: "#ef4444", body: "Many Indian crafts face extinction: Dhokra lost-wax has fewer than 2,000 practitioners, Kalamkari only 3,000 families remain, Patola silk has just 300 families. Industrialization, cheap imports, and youth migration threaten these irreplaceable knowledge systems. Each craft lost is a library burned." },
            { icon: "💡", title: "The Revival Movement", color: "#06b6d4", body: "A renaissance is underway: GI tags protect traditional crafts, e-commerce platforms connect artisans to global markets, design schools collaborate with craft communities, and social enterprises like Dastkari, Good Earth, and Suta are making crafts commercially viable while preserving authenticity." },
            { icon: "🤝", title: "Craft as Community", color: "#a855f7", body: "In India, craft is not just work — it's identity. The Kalamkari painter, the Dhokra caster, the Pattachitra scroll painter — these artisans carry their community's stories, beliefs, and knowledge in their hands. Supporting craft means supporting the social fabric of India's most vulnerable communities." },
        ];
        container.innerHTML = insights.map(i => `
            <div class="insight-card" style="--insight-color: ${i.color};">
                <div class="title"><span style="font-size: 1.2rem;">${i.icon}</span> <span style="color: ${i.color};">${i.title}</span></div>
                <div class="body">${i.body}</div>
            </div>
        `).join('');
    }
});

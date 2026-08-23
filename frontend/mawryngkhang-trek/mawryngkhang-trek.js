document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initData();
    initCalculator();
    initLightbox();
});

function initTabs() {
    const tabBtns = document.querySelectorAll('.maw-tab-btn');
    const tabContents = document.querySelectorAll('.maw-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));

            // Set new active classes
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function initData() {
    // Render Highlights
    const hlGrid = document.getElementById('highlightsGrid');
    if (hlGrid && typeof MAW_TREK_HIGHLIGHTS !== 'undefined') {
        MAW_TREK_HIGHLIGHTS.forEach(hl => {
            const card = document.createElement('div');
            card.className = 'maw-hl-card';
            card.innerHTML = `<h4>${hl.title}</h4><p>${hl.desc}</p>`;
            hlGrid.appendChild(card);
        });
    }

    // Render Steps
    const stepsCont = document.getElementById('trekStepsContainer');
    if (stepsCont && typeof MAW_TREK_STEPS !== 'undefined') {
        MAW_TREK_STEPS.forEach(st => {
            const card = document.createElement('div');
            card.className = 'maw-step-card';
            card.innerHTML = `<h3>${st.step}</h3><p>${st.desc}</p>`;
            stepsCont.appendChild(card);
        });
    }

    // Render Checklist
    const chkGrid = document.getElementById('checklistGrid');
    if (chkGrid && typeof MAW_TREK_CHECKLIST !== 'undefined') {
        MAW_TREK_CHECKLIST.forEach(chk => {
            const label = document.createElement('label');
            label.className = 'maw-chk-item';
            
            const saved = localStorage.getItem(`maw_chk_${chk.id}`);
            
            label.innerHTML = `
                <input type="checkbox" id="${chk.id}" ${saved === 'true' ? 'checked' : ''}>
                <span>${chk.label}</span>
            `;
            
            if (saved === 'true') {
                label.classList.add('checked');
            }

            label.querySelector('input').addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                localStorage.setItem(`maw_chk_${chk.id}`, isChecked);
                if (isChecked) {
                    label.classList.add('checked');
                } else {
                    label.classList.remove('checked');
                }
            });

            chkGrid.appendChild(label);
        });
    }

    // Render Gallery
    const galGrid = document.getElementById('galleryGrid');
    if (galGrid && typeof MAW_TREK_GALLERY !== 'undefined') {
        MAW_TREK_GALLERY.forEach((item, index) => {
            const fig = document.createElement('figure');
            fig.className = 'maw-gallery-item';
            fig.setAttribute('tabindex', '0');
            fig.setAttribute('role', 'button');
            
            // Generate a placeholder colored div instead of real image to avoid broken links
            fig.innerHTML = `
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #059669, #047857); display: flex; align-items: center; justify-content: center; font-size: 4rem;">${item.emoji}</div>
                <figcaption>${item.title}</figcaption>
            `;
            
            fig.addEventListener('click', () => openLightbox(index));
            fig.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
            galGrid.appendChild(fig);
        });
    }
}

function initCalculator() {
    const calcBtns = document.querySelectorAll('.maw-calc-btn');
    if (!calcBtns.length) return;

    const data = {
        fast: { asc: "1.0 hr", desc: "45 mins", water: "1.0 Liter", start: "7:00 AM" },
        moderate: { asc: "1.5 hrs", desc: "1.0 hr", water: "1.5 Liters", start: "8:00 AM" },
        leisurely: { asc: "2.5 hrs", desc: "1.5 hrs", water: "2.0 Liters", start: "9:00 AM (Allows photo stops)" }
    };

    calcBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            calcBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const pace = btn.getAttribute('data-pace');
            const res = data[pace];
            
            document.getElementById('calcAscent').textContent = res.asc;
            document.getElementById('calcDescent').textContent = res.desc;
            document.getElementById('calcWater').textContent = res.water;
            document.getElementById('calcStart').textContent = res.start;
        });
    });
}

function initLightbox() {
    const closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

function openLightbox(index) {
    const lb = document.getElementById('lightbox');
    if (!lb || typeof MAW_TREK_GALLERY === 'undefined') return;
    
    const item = MAW_TREK_GALLERY[index];
    document.getElementById('lightboxEmoji').textContent = item.emoji;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxCaption').textContent = item.caption;
    
    lb.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }
}

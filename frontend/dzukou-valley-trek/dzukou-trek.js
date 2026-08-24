document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initData();
    initLightbox();
});

function initTabs() {
    const tabBtns = document.querySelectorAll('.dzukou-tab-btn');
    const tabContents = document.querySelectorAll('.dzukou-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));

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
    if (hlGrid && typeof DZUKOU_TREK_HIGHLIGHTS !== 'undefined') {
        DZUKOU_TREK_HIGHLIGHTS.forEach(hl => {
            const card = document.createElement('div');
            card.className = 'dzukou-hl-card';
            card.innerHTML = `<h4>${hl.title}</h4><p>${hl.desc}</p>`;
            hlGrid.appendChild(card);
        });
    }

    // Render Attractions
    const attrGrid = document.getElementById('attractionsGrid');
    if (attrGrid && typeof DZUKOU_TREK_ATTRACTIONS !== 'undefined') {
        DZUKOU_TREK_ATTRACTIONS.forEach(attr => {
            const card = document.createElement('div');
            card.className = 'dzukou-attraction-card';
            card.innerHTML = `
                <div class="dzukou-emoji-icon">${attr.emoji}</div>
                <div>
                    <h4>${attr.title}</h4>
                    <p>${attr.desc}</p>
                </div>
            `;
            attrGrid.appendChild(card);
        });
    }

    // Render Nature
    const natGrid = document.getElementById('natureGrid');
    if (natGrid && typeof DZUKOU_TREK_NATURE !== 'undefined') {
        DZUKOU_TREK_NATURE.forEach(nat => {
            const card = document.createElement('div');
            card.className = 'dzukou-hl-card';
            card.innerHTML = `<h4>${nat.title}</h4><p>${nat.desc}</p>`;
            natGrid.appendChild(card);
        });
    }

    // Render Steps
    const stepsCont = document.getElementById('trekStepsContainer');
    if (stepsCont && typeof DZUKOU_TREK_STEPS !== 'undefined') {
        DZUKOU_TREK_STEPS.forEach(st => {
            const card = document.createElement('div');
            card.className = 'dzukou-step-card';
            card.innerHTML = `<h3>${st.step}</h3><p>${st.desc}</p>`;
            stepsCont.appendChild(card);
        });
    }

    // Render Checklist
    const chkGrid = document.getElementById('checklistGrid');
    if (chkGrid && typeof DZUKOU_TREK_CHECKLIST !== 'undefined') {
        DZUKOU_TREK_CHECKLIST.forEach(chk => {
            const label = document.createElement('label');
            label.className = 'dzukou-chk-item';
            
            const saved = localStorage.getItem(`dzukou_chk_${chk.id}`);
            
            label.innerHTML = `
                <input type="checkbox" id="${chk.id}" ${saved === 'true' ? 'checked' : ''}>
                <span>${chk.label}</span>
            `;
            
            if (saved === 'true') {
                label.classList.add('checked');
            }

            label.querySelector('input').addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                localStorage.setItem(`dzukou_chk_${chk.id}`, isChecked);
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
    if (galGrid && typeof DZUKOU_TREK_GALLERY !== 'undefined') {
        DZUKOU_TREK_GALLERY.forEach((item, index) => {
            const fig = document.createElement('figure');
            fig.className = 'dzukou-gallery-item';
            fig.setAttribute('tabindex', '0');
            fig.setAttribute('role', 'button');
            
            fig.innerHTML = `
                <div style="width: 100%; height: 250px; background: linear-gradient(45deg, #15803d, #166534); display: flex; align-items: center; justify-content: center; font-size: 4rem;">${item.emoji}</div>
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
    if (!lb || typeof DZUKOU_TREK_GALLERY === 'undefined') return;
    
    const item = DZUKOU_TREK_GALLERY[index];
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

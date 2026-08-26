/**
 * Dashashwamedh Ghat Profile Interactive Features
 * Handles Timeline Rendering, Lightbox Gallery,
 * Theme Switching, and Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    // NOTE: Match this to the site-wide IIEStorage / theme persistence
    // pattern used elsewhere in the codebase before merging.
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // 3. Timeline Data & Render
    const timelineEvents = [
        {
            year: 'Ancient',
            title: 'Known as Rudrasaras',
            desc: 'The site carries an earlier scriptural name, Rudrasaras, before becoming known as Dashashwamedh Ghat.'
        },
        {
            year: 'Legendary Era',
            title: "Brahma's Ten-Horse Sacrifice",
            desc: 'According to legend, Lord Brahma performs the Dashashwamedh Yajna here to welcome Lord Shiva to Kashi, giving the ghat its name.'
        },
        {
            year: '1748',
            title: 'Rebuilt by Baji Rao I',
            desc: 'The Maratha Peshwa Baji Rao I rebuilds the ghat in its present form, part of a wider era of Maratha ghat patronage in Varanasi.'
        },
        {
            year: '19th–20th c.',
            title: 'Repeated Renovations',
            desc: 'The ghat undergoes multiple repairs and remodelling over the following centuries as it grows into Varanasi\u2019s busiest riverfront.'
        },
        {
            year: '2019',
            title: 'Most Recent Renovation',
            desc: 'A major renovation refreshes the ghat\u2019s infrastructure, supporting the crowds that gather nightly for the Ganga Aarti.'
        },
        {
            year: 'Present Day',
            title: 'Nightly Ganga Aarti',
            desc: 'Seven priests perform the synchronized evening Aarti every day of the year, drawing hundreds of devotees and visitors.'
        }
    ];

    const timelineTrack = document.getElementById('dashashwamedh-timeline');
    if (timelineTrack) {
        timelineTrack.innerHTML = timelineEvents.map(ev => `
            <div class="timeline-item">
                <span class="timeline-year">${ev.year}</span>
                <h4>${ev.title}</h4>
                <p>${ev.desc}</p>
            </div>
        `).join('');
    }

    // 4. Gallery Lightbox Modal
    const galleryItems = document.querySelectorAll('.gallery-card-item');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalAttr = document.getElementById('lightbox-attr');
    const closeBtn = document.getElementById('lightbox-close-btn');

    galleryItems.forEach(item => {
        const openLightbox = () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');
            const attr = item.querySelector('.attribution-tag');

            if (img && modal && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt || '';
                modalTitle.textContent = title ? title.textContent : 'Dashashwamedh Ghat Visual';
                modalDesc.textContent = desc ? desc.textContent : '';
                modalAttr.textContent = attr ? attr.textContent : '';
                modal.hidden = false;
                if (closeBtn) closeBtn.focus();
            }
        };

        item.addEventListener('click', openLightbox);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });
    });

    const closeModal = () => {
        if (modal) modal.hidden = true;
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) {
            closeModal();
        }
    });
});
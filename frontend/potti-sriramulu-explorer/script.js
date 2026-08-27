/**
 * Potti Sriramulu Explorer Page
 * Handles Timeline Rendering, Theme Toggle, and Mobile Menu.
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
            year: '1901',
            title: 'Born in Madras',
            desc: 'Potti Sriramulu is born on 16 October 1901 into a Telugu-speaking family in Madras.'
        },
        {
            year: '1930',
            title: 'Salt Satyagraha',
            desc: 'Joins the Civil Disobedience Movement, courting arrest as part of the Salt Satyagraha.'
        },
        {
            year: '1930s',
            title: 'Anti-Untouchability Work',
            desc: 'Dedicates years to temple-entry movements and social reform among Dalit communities, inspired by Gandhian ideals.'
        },
        {
            year: '1942',
            title: 'Quit India Movement',
            desc: 'Participates in the Quit India Movement and is imprisoned by British colonial authorities.'
        },
        {
            year: '19 Oct 1952',
            title: 'Fast Unto Death Begins',
            desc: 'Begins an indefinite fast at Bezwada (Vijayawada), demanding a separate Telugu-speaking state.'
        },
        {
            year: '15 Dec 1952',
            title: 'Death After 58 Days',
            desc: 'Potti Sriramulu dies after 58 days of fasting, triggering widespread protests across Telugu-speaking districts.'
        },
        {
            year: '1 Oct 1953',
            title: 'Andhra State Formed',
            desc: 'The Indian government creates Andhra State, the first state formed purely on linguistic lines.'
        },
        {
            year: '1956',
            title: 'States Reorganisation Act',
            desc: "Andhra's formation becomes the precedent for the nationwide States Reorganisation Act, redrawing India's internal map along linguistic lines."
        }
    ];

    const timelineTrack = document.getElementById('potti-timeline');
    if (timelineTrack) {
        timelineTrack.innerHTML = timelineEvents.map(ev => `
            <div class="timeline-item">
                <span class="timeline-year">${ev.year}</span>
                <h4>${ev.title}</h4>
                <p>${ev.desc}</p>
            </div>
        `).join('');
    }
});